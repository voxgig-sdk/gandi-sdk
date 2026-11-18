-- Gandi SDK

local json = require("dkjson")
local vs = require("utility.struct.struct")
local Utility = require("core.utility_type")
local Spec = require("core.spec")
local helpers = require("core.helpers")
local unreadable_body = require("utility.unreadable_body")

-- Load utility registration (populates Utility._registrar)
require("utility.register")

-- Typed-model annotations (LuaLS ---@class); empty at runtime.
require("gandi_types")

-- Load features
local BaseFeature = require("feature.base_feature")
local features_factory = require("features")


local GandiSDK = {}

-- The options and the root context both hold the credential. They live in
-- a side table rather than in the client, so a dump or an encoder walking
-- the client's fields never reaches them; `sdk.options` still reads and
-- writes through the metamethods, and options_map() is the documented way
-- to read the credential back.
local HIDDEN = { options = true, _rootctx = true }
local SLOTS = setmetatable({}, { __mode = "k" })

GandiSDK.__index = function(self, key)
  local member = rawget(GandiSDK, key)
  if member ~= nil then
    return member
  end
  if HIDDEN[key] then
    local slots = SLOTS[self]
    return slots ~= nil and slots[key] or nil
  end
  return nil
end

GandiSDK.__newindex = function(self, key, val)
  if HIDDEN[key] then
    local slots = SLOTS[self]
    if slots == nil then
      slots = {}
      SLOTS[self] = slots
    end
    slots[key] = val
  else
    rawset(self, key, val)
  end
end

-- The client's own record: what a serialiser or clean's snapshot sees in
-- place of the client, so neither reaches the options through it.
function GandiSDK:to_record()
  return { sdk = "Gandi", mode = self.mode }
end

GandiSDK.__tostring = function(self)
  return "GandiSDK mode=" .. tostring(self.mode)
end

GandiSDK.__tojson = function(self)
  return json.encode(self:to_record())
end


local function _make_feature(name)
  local factory = features_factory[name]
  if factory ~= nil then
    return factory()
  end
  return features_factory.base()
end

GandiSDK._make_feature = _make_feature


function GandiSDK.new(options)
  local self = setmetatable({}, GandiSDK)
  self.mode = "live"
  self.features = {}
  self.options = nil

  local utility = Utility.new()
  self._utility = utility

  local config = require("config_shared")()

  self._rootctx = utility.make_context({
    client = self,
    utility = utility,
    config = config,
    options = options or {},
    shared = {},
  }, nil)

  self.options = utility.make_options(self._rootctx)

  if vs.getpath(self.options, "feature.test.active") == true then
    self.mode = "test"
  end

  self._rootctx.options = self.options

  -- Add features in the resolved order (make_options puts an explicit list
  -- order first, else defaults to test-first). Ordering matters: the `test`
  -- feature installs the base mock transport and the transport features
  -- (retry/cache/netsim/proxy/ratelimit) wrap whatever is current, so `test`
  -- must be added before them to sit at the base of the chain.
  local feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
  if feature_opts ~= nil then
    local featureorder = vs.getpath(self.options, "__derived__.featureorder")
    if type(featureorder) == "table" then
      for _, fname in ipairs(featureorder) do
        local fopts = helpers.to_map(feature_opts[fname])
        if fopts ~= nil and fopts["active"] == true then
          utility.feature_add(self._rootctx, _make_feature(fname))
        end
      end
    end
  end

  -- Add extension features.
  local extend = vs.getprop(self.options, "extend")
  if type(extend) == "table" then
    for _, f in ipairs(extend) do
      if type(f) == "table" and type(f.get_name) == "function" then
        utility.feature_add(self._rootctx, f)
      end
    end
  end

  -- CONSUMED, not kept. `extend` holds feature INSTANCES, and every shipped
  -- feature's init stores `self.client = ctx.client` - so leaving the list
  -- in self.options makes the options map CYCLIC (client.options.extend[1]
  -- .client == client), and options_map()'s vs.clone, which has no cycle
  -- guard, blew the stack on the first prepare_auth of any client built with
  -- an extend feature. The instances live on self.features from here on,
  -- which is the only place anything reads them; the SAME table is
  -- self._rootctx.options, so the root context loses the key too.
  self.options["extend"] = nil

  -- Initialize features.
  for _, f in ipairs(self.features) do
    utility.feature_init(self._rootctx, f)
  end

  utility.feature_hook(self._rootctx, "PostConstruct")

    -- feature: debug
  -- feature: idempotency
  -- feature: metrics
  -- feature: paging
  -- feature: ratelimit
  -- feature: retry
  -- feature: secrets
  -- feature: test
  -- feature: timeout


  return self
end


function GandiSDK:options_map()
  local out = vs.clone(self.options)
  if type(out) == "table" then
    return out
  end
  return {}
end


function GandiSDK:get_utility()
  return Utility.copy(self._utility)
end


function GandiSDK:get_root_ctx()
  return self._rootctx
end


function GandiSDK:prepare(fetchargs)
  local utility = self._utility

  fetchargs = fetchargs or {}

  local ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl")) or {}

  local ctx = utility.make_context({
    opname = "prepare",
    ctrl = ctrl,
  }, self._rootctx)

  local options = self.options

  local path = vs.getprop(fetchargs, "path") or ""
  if type(path) ~= "string" then path = "" end

  local method = vs.getprop(fetchargs, "method") or "GET"
  if type(method) ~= "string" or method == "" then method = "GET" end
  method = string.upper(method)

  local allow_method = vs.getpath(options, "allow.method")
  if not helpers.allowed(allow_method, method) then
    return nil, ctx:make_error("spec_method_allow",
      'Method "' .. method ..
      '" not allowed by SDK option allow.method value: "' .. tostring(allow_method or "") .. '"')
  end

  local params = helpers.to_map(vs.getprop(fetchargs, "params")) or {}
  local query = helpers.to_map(vs.getprop(fetchargs, "query")) or {}

  local headers = utility.prepare_headers(ctx)

  local base = vs.getprop(options, "base") or ""
  if type(base) ~= "string" then base = "" end
  local prefix = vs.getprop(options, "prefix") or ""
  if type(prefix) ~= "string" then prefix = "" end
  local suffix = vs.getprop(options, "suffix") or ""
  if type(suffix) ~= "string" then suffix = "" end

  ctx.spec = Spec.new({
    base = base,
    prefix = prefix,
    suffix = suffix,
    path = path,
    method = method,
    params = params,
    query = query,
    headers = headers,
    body = vs.getprop(fetchargs, "body"),
    step = "start",
  })

  -- Merge user-provided headers.
  local uh = vs.getprop(fetchargs, "headers")
  if type(uh) == "table" then
    for k, v in pairs(uh) do
      ctx.spec.headers[k] = v
    end
  end

  -- A raw request has no point to declare its response type, so it asks
  -- for the JSON it reads: an API that negotiates on Accept otherwise
  -- answers in its own default format. A caller's own accept wins.
  local has_accept = false
  for k, _ in pairs(ctx.spec.headers) do
    if string.lower(tostring(k)) == "accept" then
      has_accept = true
      break
    end
  end
  if not has_accept then
    ctx.spec.headers["accept"] = "application/json"
  end

  local _, err = utility.prepare_auth(ctx)
  if err ~= nil then
    return nil, err
  end

  return utility.make_fetch_def(ctx)
end


-- Raw endpoint access is operator-controllable, like every entity op.
-- Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
-- either one reaches the same endpoint.
function GandiSDK:direct(fetchargs)
  if not self:_op_allowed("direct") then
    return self:_op_denied("direct"), nil
  end

  return self:_raw_request(fetchargs)
end


-- Is this raw-access op permitted by the SDK's allow.op option?
function GandiSDK:_op_allowed(op)
  return helpers.allowed(vs.getpath(self.options, "allow.op"), op)
end


function GandiSDK:_op_denied(op)
  local allow = vs.getpath(self.options, "allow.op")
  if type(allow) ~= "string" then allow = "" end
  return {
    ok = false,
    err = "GandiSDK: " .. op .. ": operation not allowed by" ..
      " SDK option allow.op value: \"" .. allow .. "\"",
  }
end


-- Ungated request path shared by direct and graphql, each of which checks its
-- own allow.op token first. Private, rather than a flag on fetchargs: a
-- caller-supplied marker would let anyone opt straight back out of the gate
-- by passing it.
function GandiSDK:_raw_request(fetchargs)
  local utility = self._utility

  local fetchdef, err = self:prepare(fetchargs)
  if err ~= nil then
    return { ok = false, err = err }, nil
  end

  fetchargs = fetchargs or {}
  local ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl")) or {}

  local ctx = utility.make_context({
    opname = "direct",
    ctrl = ctrl,
  }, self._rootctx)

  local url = fetchdef["url"] or ""
  local fetched, fetch_err = utility.fetcher(ctx, url, fetchdef)

  if fetch_err ~= nil then
    return { ok = false, err = utility.clean(ctx, fetch_err) }, nil
  end

  if fetched == nil then
    return {
      ok = false,
      err = ctx:make_error("direct_no_response", "response: undefined"),
    }, nil
  end

  if type(fetched) == "table" then
    local status = helpers.to_int(vs.getprop(fetched, "status"))
    local headers = vs.getprop(fetched, "headers") or {}

    -- No-body responses (204, 304) and explicit zero content-length
    -- must skip JSON parsing — calling json() on an empty body errors.
    local content_length = nil
    if type(headers) == "table" then
      content_length = headers["content-length"]
    end
    local no_body = status == 204 or status == 304 or tostring(content_length) == "0"

    local json_data = nil
    local body_err = nil
    if not no_body then
      local jf = vs.getprop(fetched, "json")
      if type(jf) == "function" then
        local ok, result = pcall(jf)
        if ok then
          json_data = result
        end
        -- Non-JSON body: json_data stays nil, status/headers preserved.
      end
      if vs.getprop(fetched, "unreadable") == true then
        local failed = nil
        if status < 200 or status >= 300 then
          failed = ctx:make_error("request_status",
            "request: " .. tostring(status) .. ": " .. tostring(vs.getprop(fetched, "statusText")))
        end
        body_err = unreadable_body(ctx, status, headers, vs.getprop(fetched, "body"),
          fetchdef["headers"], failed)
      end
    end

    local out = {
      ok = body_err == nil and status >= 200 and status < 300,
      status = status,
      headers = headers,
      data = json_data,
    }
    if body_err ~= nil then
      out.err = utility.clean(ctx, body_err)
    end
    return out, nil
  end

  return {
    ok = false,
    err = ctx:make_error("direct_invalid", "invalid response type"),
  }, nil
end


-- Raw GraphQL access: the pressure valve that makes the generated surface's
-- deliberate omissions (per-call selection sets, typed filter builders,
-- batching, subscriptions) livable — the whole schema stays reachable.
--
-- Thin wrapper over the same prepare/fetch path direct uses, with the one
-- thing raw direct cannot do for GraphQL: a GraphQL failure rides HTTP 200 as
-- a top-level `errors` array, so status alone would report a failed query as
-- ok.
--
-- NOTE: like direct, this bypasses the feature pipeline — no retry, ratelimit
-- or paging features apply.
function GandiSDK:graphql(query, variables, ctrl)
  if not self:_op_allowed("graphql") then
    return self:_op_denied("graphql"), nil
  end

  local res, err = self:_raw_request({
    method = "POST",
    headers = { ["content-type"] = "application/json" },
    body = {
      query = query,
      variables = type(variables) == "table" and variables or {},
    },
    ctrl = type(ctrl) == "table" and ctrl or {},
  })

  if err ~= nil or type(res) ~= "table" then
    return res, err
  end

  -- Errors are read BEFORE any status check: a GraphQL parse or validation
  -- failure comes back as HTTP 400 carrying the standard { errors = {...} }
  -- body, and the raw path represents a non-2xx as ok=false with no err — so
  -- returning early on status would discard the server's own diagnostics,
  -- which are the only useful part of that response.
  local errors = vs.getpath(res, "data.errors")

  if type(errors) == "table" and 0 < #errors then
    local msg = vs.getprop(errors[1], "message")
    if type(msg) ~= "string" or msg == "" then
      msg = "graphql error"
    end
    res.ok = false
    res.err = "GandiSDK: graphql: " .. msg
    res.graphql = errors
  end

  return res, nil
end



-- Idiomatic facade: client:AccessToken():list() / client:AccessToken():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function GandiSDK:AccessToken(data)
  local EntityMod = require("entity.access_token_entity")
  if data == nil then
    if self._access_token == nil then
      self._access_token = EntityMod.new(self, nil)
    end
    return self._access_token
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AcmeAccount():list() / client:AcmeAccount():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function GandiSDK:AcmeAccount(data)
  local EntityMod = require("entity.acme_account_entity")
  if data == nil then
    if self._acme_account == nil then
      self._acme_account = EntityMod.new(self, nil)
    end
    return self._acme_account
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AcmeDomain():list() / client:AcmeDomain():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function GandiSDK:AcmeDomain(data)
  local EntityMod = require("entity.acme_domain_entity")
  if data == nil then
    if self._acme_domain == nil then
      self._acme_domain = EntityMod.new(self, nil)
    end
    return self._acme_domain
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AcmePrice():list() / client:AcmePrice():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function GandiSDK:AcmePrice(data)
  local EntityMod = require("entity.acme_price_entity")
  if data == nil then
    if self._acme_price == nil then
      self._acme_price = EntityMod.new(self, nil)
    end
    return self._acme_price
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AcmeSubscription():list() / client:AcmeSubscription():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function GandiSDK:AcmeSubscription(data)
  local EntityMod = require("entity.acme_subscription_entity")
  if data == nil then
    if self._acme_subscription == nil then
      self._acme_subscription = EntityMod.new(self, nil)
    end
    return self._acme_subscription
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:BillingInfo():list() / client:BillingInfo():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function GandiSDK:BillingInfo(data)
  local EntityMod = require("entity.billing_info_entity")
  if data == nil then
    if self._billing_info == nil then
      self._billing_info = EntityMod.new(self, nil)
    end
    return self._billing_info
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:BillingPrice():list() / client:BillingPrice():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function GandiSDK:BillingPrice(data)
  local EntityMod = require("entity.billing_price_entity")
  if data == nil then
    if self._billing_price == nil then
      self._billing_price = EntityMod.new(self, nil)
    end
    return self._billing_price
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:CertificateDcv():list() / client:CertificateDcv():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function GandiSDK:CertificateDcv(data)
  local EntityMod = require("entity.certificate_dcv_entity")
  if data == nil then
    if self._certificate_dcv == nil then
      self._certificate_dcv = EntityMod.new(self, nil)
    end
    return self._certificate_dcv
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:CertificatePackage():list() / client:CertificatePackage():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function GandiSDK:CertificatePackage(data)
  local EntityMod = require("entity.certificate_package_entity")
  if data == nil then
    if self._certificate_package == nil then
      self._certificate_package = EntityMod.new(self, nil)
    end
    return self._certificate_package
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:CertificatePem():list() / client:CertificatePem():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function GandiSDK:CertificatePem(data)
  local EntityMod = require("entity.certificate_pem_entity")
  if data == nil then
    if self._certificate_pem == nil then
      self._certificate_pem = EntityMod.new(self, nil)
    end
    return self._certificate_pem
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:CertificateRenewal():list() / client:CertificateRenewal():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function GandiSDK:CertificateRenewal(data)
  local EntityMod = require("entity.certificate_renewal_entity")
  if data == nil then
    if self._certificate_renewal == nil then
      self._certificate_renewal = EntityMod.new(self, nil)
    end
    return self._certificate_renewal
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:CertificateTag():list() / client:CertificateTag():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function GandiSDK:CertificateTag(data)
  local EntityMod = require("entity.certificate_tag_entity")
  if data == nil then
    if self._certificate_tag == nil then
      self._certificate_tag = EntityMod.new(self, nil)
    end
    return self._certificate_tag
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Comment():list() / client:Comment():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function GandiSDK:Comment(data)
  local EntityMod = require("entity.comment_entity")
  if data == nil then
    if self._comment == nil then
      self._comment = EntityMod.new(self, nil)
    end
    return self._comment
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Domain():list() / client:Domain():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function GandiSDK:Domain(data)
  local EntityMod = require("entity.domain_entity")
  if data == nil then
    if self._domain == nil then
      self._domain = EntityMod.new(self, nil)
    end
    return self._domain
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:DomainAvailability():list() / client:DomainAvailability():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function GandiSDK:DomainAvailability(data)
  local EntityMod = require("entity.domain_availability_entity")
  if data == nil then
    if self._domain_availability == nil then
      self._domain_availability = EntityMod.new(self, nil)
    end
    return self._domain_availability
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:DomainChangeOwner():list() / client:DomainChangeOwner():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function GandiSDK:DomainChangeOwner(data)
  local EntityMod = require("entity.domain_change_owner_entity")
  if data == nil then
    if self._domain_change_owner == nil then
      self._domain_change_owner = EntityMod.new(self, nil)
    end
    return self._domain_change_owner
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:DomainClaim():list() / client:DomainClaim():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function GandiSDK:DomainClaim(data)
  local EntityMod = require("entity.domain_claim_entity")
  if data == nil then
    if self._domain_claim == nil then
      self._domain_claim = EntityMod.new(self, nil)
    end
    return self._domain_claim
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:DomainContact():list() / client:DomainContact():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function GandiSDK:DomainContact(data)
  local EntityMod = require("entity.domain_contact_entity")
  if data == nil then
    if self._domain_contact == nil then
      self._domain_contact = EntityMod.new(self, nil)
    end
    return self._domain_contact
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:DomainDnskey():list() / client:DomainDnskey():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function GandiSDK:DomainDnskey(data)
  local EntityMod = require("entity.domain_dnskey_entity")
  if data == nil then
    if self._domain_dnskey == nil then
      self._domain_dnskey = EntityMod.new(self, nil)
    end
    return self._domain_dnskey
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:DomainDnssec():list() / client:DomainDnssec():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function GandiSDK:DomainDnssec(data)
  local EntityMod = require("entity.domain_dnssec_entity")
  if data == nil then
    if self._domain_dnssec == nil then
      self._domain_dnssec = EntityMod.new(self, nil)
    end
    return self._domain_dnssec
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:DomainHost():list() / client:DomainHost():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function GandiSDK:DomainHost(data)
  local EntityMod = require("entity.domain_host_entity")
  if data == nil then
    if self._domain_host == nil then
      self._domain_host = EntityMod.new(self, nil)
    end
    return self._domain_host
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:DomainLivedns():list() / client:DomainLivedns():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function GandiSDK:DomainLivedns(data)
  local EntityMod = require("entity.domain_livedns_entity")
  if data == nil then
    if self._domain_livedns == nil then
      self._domain_livedns = EntityMod.new(self, nil)
    end
    return self._domain_livedns
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:DomainNameserver():list() / client:DomainNameserver():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function GandiSDK:DomainNameserver(data)
  local EntityMod = require("entity.domain_nameserver_entity")
  if data == nil then
    if self._domain_nameserver == nil then
      self._domain_nameserver = EntityMod.new(self, nil)
    end
    return self._domain_nameserver
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:DomainTag():list() / client:DomainTag():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function GandiSDK:DomainTag(data)
  local EntityMod = require("entity.domain_tag_entity")
  if data == nil then
    if self._domain_tag == nil then
      self._domain_tag = EntityMod.new(self, nil)
    end
    return self._domain_tag
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:DomainTransfer():list() / client:DomainTransfer():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function GandiSDK:DomainTransfer(data)
  local EntityMod = require("entity.domain_transfer_entity")
  if data == nil then
    if self._domain_transfer == nil then
      self._domain_transfer = EntityMod.new(self, nil)
    end
    return self._domain_transfer
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:DomainWebredir():list() / client:DomainWebredir():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function GandiSDK:DomainWebredir(data)
  local EntityMod = require("entity.domain_webredir_entity")
  if data == nil then
    if self._domain_webredir == nil then
      self._domain_webredir = EntityMod.new(self, nil)
    end
    return self._domain_webredir
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:EmailForward():list() / client:EmailForward():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function GandiSDK:EmailForward(data)
  local EntityMod = require("entity.email_forward_entity")
  if data == nil then
    if self._email_forward == nil then
      self._email_forward = EntityMod.new(self, nil)
    end
    return self._email_forward
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:EmailMailbox():list() / client:EmailMailbox():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function GandiSDK:EmailMailbox(data)
  local EntityMod = require("entity.email_mailbox_entity")
  if data == nil then
    if self._email_mailbox == nil then
      self._email_mailbox = EntityMod.new(self, nil)
    end
    return self._email_mailbox
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:EmailMigration():list() / client:EmailMigration():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function GandiSDK:EmailMigration(data)
  local EntityMod = require("entity.email_migration_entity")
  if data == nil then
    if self._email_migration == nil then
      self._email_migration = EntityMod.new(self, nil)
    end
    return self._email_migration
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:EmailOffer():list() / client:EmailOffer():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function GandiSDK:EmailOffer(data)
  local EntityMod = require("entity.email_offer_entity")
  if data == nil then
    if self._email_offer == nil then
      self._email_offer = EntityMod.new(self, nil)
    end
    return self._email_offer
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:EmailSlot():list() / client:EmailSlot():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function GandiSDK:EmailSlot(data)
  local EntityMod = require("entity.email_slot_entity")
  if data == nil then
    if self._email_slot == nil then
      self._email_slot = EntityMod.new(self, nil)
    end
    return self._email_slot
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:HostingApplication():list() / client:HostingApplication():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function GandiSDK:HostingApplication(data)
  local EntityMod = require("entity.hosting_application_entity")
  if data == nil then
    if self._hosting_application == nil then
      self._hosting_application = EntityMod.new(self, nil)
    end
    return self._hosting_application
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:HostingInstance():list() / client:HostingInstance():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function GandiSDK:HostingInstance(data)
  local EntityMod = require("entity.hosting_instance_entity")
  if data == nil then
    if self._hosting_instance == nil then
      self._hosting_instance = EntityMod.new(self, nil)
    end
    return self._hosting_instance
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:HostingVhost():list() / client:HostingVhost():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function GandiSDK:HostingVhost(data)
  local EntityMod = require("entity.hosting_vhost_entity")
  if data == nil then
    if self._hosting_vhost == nil then
      self._hosting_vhost = EntityMod.new(self, nil)
    end
    return self._hosting_vhost
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:IssuedCertificate():list() / client:IssuedCertificate():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function GandiSDK:IssuedCertificate(data)
  local EntityMod = require("entity.issued_certificate_entity")
  if data == nil then
    if self._issued_certificate == nil then
      self._issued_certificate = EntityMod.new(self, nil)
    end
    return self._issued_certificate
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:LinkedZone():list() / client:LinkedZone():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function GandiSDK:LinkedZone(data)
  local EntityMod = require("entity.linked_zone_entity")
  if data == nil then
    if self._linked_zone == nil then
      self._linked_zone = EntityMod.new(self, nil)
    end
    return self._linked_zone
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:LinkedZoneDeployment():list() / client:LinkedZoneDeployment():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function GandiSDK:LinkedZoneDeployment(data)
  local EntityMod = require("entity.linked_zone_deployment_entity")
  if data == nil then
    if self._linked_zone_deployment == nil then
      self._linked_zone_deployment = EntityMod.new(self, nil)
    end
    return self._linked_zone_deployment
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:LinkedZoneDomain():list() / client:LinkedZoneDomain():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function GandiSDK:LinkedZoneDomain(data)
  local EntityMod = require("entity.linked_zone_domain_entity")
  if data == nil then
    if self._linked_zone_domain == nil then
      self._linked_zone_domain = EntityMod.new(self, nil)
    end
    return self._linked_zone_domain
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:LinkedZoneTask():list() / client:LinkedZoneTask():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function GandiSDK:LinkedZoneTask(data)
  local EntityMod = require("entity.linked_zone_task_entity")
  if data == nil then
    if self._linked_zone_task == nil then
      self._linked_zone_task = EntityMod.new(self, nil)
    end
    return self._linked_zone_task
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:LivednsAxfrSlave():list() / client:LivednsAxfrSlave():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function GandiSDK:LivednsAxfrSlave(data)
  local EntityMod = require("entity.livedns_axfr_slave_entity")
  if data == nil then
    if self._livedns_axfr_slave == nil then
      self._livedns_axfr_slave = EntityMod.new(self, nil)
    end
    return self._livedns_axfr_slave
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:LivednsAxfrTsig():list() / client:LivednsAxfrTsig():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function GandiSDK:LivednsAxfrTsig(data)
  local EntityMod = require("entity.livedns_axfr_tsig_entity")
  if data == nil then
    if self._livedns_axfr_tsig == nil then
      self._livedns_axfr_tsig = EntityMod.new(self, nil)
    end
    return self._livedns_axfr_tsig
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:LivednsDomain():list() / client:LivednsDomain():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function GandiSDK:LivednsDomain(data)
  local EntityMod = require("entity.livedns_domain_entity")
  if data == nil then
    if self._livedns_domain == nil then
      self._livedns_domain = EntityMod.new(self, nil)
    end
    return self._livedns_domain
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:LivednsKey():list() / client:LivednsKey():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function GandiSDK:LivednsKey(data)
  local EntityMod = require("entity.livedns_key_entity")
  if data == nil then
    if self._livedns_key == nil then
      self._livedns_key = EntityMod.new(self, nil)
    end
    return self._livedns_key
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:LivednsNameserver():list() / client:LivednsNameserver():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function GandiSDK:LivednsNameserver(data)
  local EntityMod = require("entity.livedns_nameserver_entity")
  if data == nil then
    if self._livedns_nameserver == nil then
      self._livedns_nameserver = EntityMod.new(self, nil)
    end
    return self._livedns_nameserver
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:LivednsRecord():list() / client:LivednsRecord():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function GandiSDK:LivednsRecord(data)
  local EntityMod = require("entity.livedns_record_entity")
  if data == nil then
    if self._livedns_record == nil then
      self._livedns_record = EntityMod.new(self, nil)
    end
    return self._livedns_record
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:LivednsRrtype():list() / client:LivednsRrtype():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function GandiSDK:LivednsRrtype(data)
  local EntityMod = require("entity.livedns_rrtype_entity")
  if data == nil then
    if self._livedns_rrtype == nil then
      self._livedns_rrtype = EntityMod.new(self, nil)
    end
    return self._livedns_rrtype
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:LivednsSnapshot():list() / client:LivednsSnapshot():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function GandiSDK:LivednsSnapshot(data)
  local EntityMod = require("entity.livedns_snapshot_entity")
  if data == nil then
    if self._livedns_snapshot == nil then
      self._livedns_snapshot = EntityMod.new(self, nil)
    end
    return self._livedns_snapshot
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:LivednsTsigKey():list() / client:LivednsTsigKey():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function GandiSDK:LivednsTsigKey(data)
  local EntityMod = require("entity.livedns_tsig_key_entity")
  if data == nil then
    if self._livedns_tsig_key == nil then
      self._livedns_tsig_key = EntityMod.new(self, nil)
    end
    return self._livedns_tsig_key
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Mailbox():list() / client:Mailbox():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function GandiSDK:Mailbox(data)
  local EntityMod = require("entity.mailbox_entity")
  if data == nil then
    if self._mailbox == nil then
      self._mailbox = EntityMod.new(self, nil)
    end
    return self._mailbox
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:MailboxDomain():list() / client:MailboxDomain():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function GandiSDK:MailboxDomain(data)
  local EntityMod = require("entity.mailbox_domain_entity")
  if data == nil then
    if self._mailbox_domain == nil then
      self._mailbox_domain = EntityMod.new(self, nil)
    end
    return self._mailbox_domain
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:MailboxForward():list() / client:MailboxForward():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function GandiSDK:MailboxForward(data)
  local EntityMod = require("entity.mailbox_forward_entity")
  if data == nil then
    if self._mailbox_forward == nil then
      self._mailbox_forward = EntityMod.new(self, nil)
    end
    return self._mailbox_forward
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:MailboxProduct():list() / client:MailboxProduct():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function GandiSDK:MailboxProduct(data)
  local EntityMod = require("entity.mailbox_product_entity")
  if data == nil then
    if self._mailbox_product == nil then
      self._mailbox_product = EntityMod.new(self, nil)
    end
    return self._mailbox_product
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:MailboxQuota():list() / client:MailboxQuota():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function GandiSDK:MailboxQuota(data)
  local EntityMod = require("entity.mailbox_quota_entity")
  if data == nil then
    if self._mailbox_quota == nil then
      self._mailbox_quota = EntityMod.new(self, nil)
    end
    return self._mailbox_quota
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:MailboxSlot():list() / client:MailboxSlot():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function GandiSDK:MailboxSlot(data)
  local EntityMod = require("entity.mailbox_slot_entity")
  if data == nil then
    if self._mailbox_slot == nil then
      self._mailbox_slot = EntityMod.new(self, nil)
    end
    return self._mailbox_slot
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Organization():list() / client:Organization():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function GandiSDK:Organization(data)
  local EntityMod = require("entity.organization_entity")
  if data == nil then
    if self._organization == nil then
      self._organization = EntityMod.new(self, nil)
    end
    return self._organization
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:OrganizationCustomer():list() / client:OrganizationCustomer():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function GandiSDK:OrganizationCustomer(data)
  local EntityMod = require("entity.organization_customer_entity")
  if data == nil then
    if self._organization_customer == nil then
      self._organization_customer = EntityMod.new(self, nil)
    end
    return self._organization_customer
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Template():list() / client:Template():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function GandiSDK:Template(data)
  local EntityMod = require("entity.template_entity")
  if data == nil then
    if self._template == nil then
      self._template = EntityMod.new(self, nil)
    end
    return self._template
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:TemplateDispatch():list() / client:TemplateDispatch():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function GandiSDK:TemplateDispatch(data)
  local EntityMod = require("entity.template_dispatch_entity")
  if data == nil then
    if self._template_dispatch == nil then
      self._template_dispatch = EntityMod.new(self, nil)
    end
    return self._template_dispatch
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Tld():list() / client:Tld():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function GandiSDK:Tld(data)
  local EntityMod = require("entity.tld_entity")
  if data == nil then
    if self._tld == nil then
      self._tld = EntityMod.new(self, nil)
    end
    return self._tld
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:User():list() / client:User():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function GandiSDK:User(data)
  local EntityMod = require("entity.user_entity")
  if data == nil then
    if self._user == nil then
      self._user = EntityMod.new(self, nil)
    end
    return self._user
  end
  return EntityMod.new(self, data)
end




function GandiSDK.test(testopts, sdkopts)
  sdkopts = sdkopts or {}
  sdkopts = vs.clone(sdkopts)
  if type(sdkopts) ~= "table" then
    sdkopts = {}
  end

  testopts = testopts or {}
  testopts = vs.clone(testopts)
  if type(testopts) ~= "table" then
    testopts = {}
  end
  testopts["active"] = true

  vs.setpath(sdkopts, "feature.test", testopts)

  local sdk = GandiSDK.new(sdkopts)
  sdk.mode = "test"

  return sdk
end


return GandiSDK
