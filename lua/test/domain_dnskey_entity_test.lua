-- DomainDnskey entity test

local json = require("dkjson")
local vs = require("utility.struct.struct")
local sdk = require("gandi_sdk")
local helpers = require("core.helpers")
local runner = require("test.runner")

local _test_dir = debug.getinfo(1, "S").source:match("^@(.+/)")  or "./"

-- main.kit.test.live.strict is true (the default is true): a live
-- request that fails, or a live test missing an input it needs,
-- fails the test.
-- An account with no record for a test to read skips it either way.
local LIVE_STRICT = true


describe("DomainDnskeyEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:DomainDnskey(nil)
    assert.is_not_nil(ent)
  end)

  it("should refuse an invalid request", function()
    local config = require("config_shared")()
    if type(config.feature) ~= "table" or config.feature.validate == nil then
      pending("feature not present in this SDK: validate")
      return
    end
    local client = sdk.test(nil, { feature = { validate = { active = true } } })
    local _, err = client:DomainDnskey(nil):list({ ["domain"] = 1 }, nil)
    assert.are.equal("validate_failed", type(err) == "table" and err.code or nil)
  end)

  it("should run basic flow", function()
    local setup = domain_dnskey_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"create", "list", "update", "remove"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "domain_dnskey." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    if setup.live and os.getenv("VOXGIG_GETONLY_GUARD") == "TRUE" then
      print("LIVE STEP {\"id\":\"domain_dnskey.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /domain/domains/{domain}/dnskeys\"}")
      print("LIVE STEP {\"id\":\"domain_dnskey.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /domain/domains/{domain}/dnskeys\"}")
      print("LIVE STEP {\"id\":\"domain_dnskey.remove.3\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /domain/domains/{domain}/dnskeys/{id}\"}")
      print("LIVE STEP {\"id\":\"domain_dnskey.list.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}")
    if setup.live then
      for _, _live_key in ipairs({"domain01"}) do
        if setup.synthetic_only or setup.idmap[_live_key] == nil then
          runner.live_miss(pending, LIVE_STRICT, "Live entity test blocked: needs " .. _live_key .. " via GANDI_TEST_DOMAIN_DNSKEY_ENTID")
        end
      end
    end
    local client = setup.client

    -- Bootstrap entity data from existing test data.
    local domain_dnskey_ref01_data_raw = vs.items(helpers.to_map(
      vs.getpath(setup.data, "existing.domain_dnskey")))
    local domain_dnskey_ref01_data = nil
    if #domain_dnskey_ref01_data_raw > 0 then
      domain_dnskey_ref01_data = helpers.to_map(domain_dnskey_ref01_data_raw[1][2])
    end

    if setup.live then
      runner.live_pace()
    end
    -- LIST
    local domain_dnskey_ref01_ent = client:DomainDnskey(nil)
    local domain_dnskey_ref01_match = {
      ["domain"] = setup.idmap["domain01"],
    }

    local domain_dnskey_ref01_list_result, err = domain_dnskey_ref01_ent:list(domain_dnskey_ref01_match, nil)
    assert.is_nil(err)
    assert.is_table(domain_dnskey_ref01_list_result)

      return
    end

    if setup.live then
      for _, _live_key in ipairs({"domain01"}) do
        if setup.synthetic_only or setup.idmap[_live_key] == nil then
          runner.live_miss(pending, LIVE_STRICT, "Live entity test blocked: needs " .. _live_key .. " via GANDI_TEST_DOMAIN_DNSKEY_ENTID")
        end
      end
    end
    local client = setup.client

    if setup.live then
      runner.live_pace()
    end
    -- CREATE
    local domain_dnskey_ref01_ent = client:DomainDnskey(nil)
    local domain_dnskey_ref01_data = helpers.to_map(vs.getprop(
      vs.getpath(setup.data, "new.domain_dnskey"), "domain_dnskey_ref01"))
    domain_dnskey_ref01_data["domain"] = setup.idmap["domain01"]

    local domain_dnskey_ref01_data_result, err = domain_dnskey_ref01_ent:create(domain_dnskey_ref01_data, nil)
    assert.is_nil(err)
    domain_dnskey_ref01_data = helpers.to_map(type(domain_dnskey_ref01_data_result) == 'table' and domain_dnskey_ref01_data_result.data_get and domain_dnskey_ref01_data_result:data_get() or domain_dnskey_ref01_data_result)
    assert.is_not_nil(domain_dnskey_ref01_data)
    assert.is_not_nil(domain_dnskey_ref01_data["id"])

    if setup.live then
      runner.live_pace()
    end
    -- LIST
    local domain_dnskey_ref01_match = {
      ["domain"] = setup.idmap["domain01"],
    }

    local domain_dnskey_ref01_list_result, err = domain_dnskey_ref01_ent:list(domain_dnskey_ref01_match, nil)
    assert.is_nil(err)
    assert.is_table(domain_dnskey_ref01_list_result)

    local found_item = vs.select(
      runner.entity_list_to_data(domain_dnskey_ref01_list_result),
      { id = domain_dnskey_ref01_data["id"] })
    assert.is_false(vs.isempty(found_item))

    if setup.live then
      runner.live_pace()
    end
    -- UPDATE
    local domain_dnskey_ref01_data_up0_up = {
      id = domain_dnskey_ref01_data["id"],
    }

    local domain_dnskey_ref01_markdef_up0_name = "digest"
    local domain_dnskey_ref01_markdef_up0_value = "Mark01-domain_dnskey_ref01_" .. tostring(setup.now)
    domain_dnskey_ref01_data_up0_up[domain_dnskey_ref01_markdef_up0_name] = domain_dnskey_ref01_markdef_up0_value

    local domain_dnskey_ref01_resdata_up0_result, err = domain_dnskey_ref01_ent:update(domain_dnskey_ref01_data_up0_up, nil)
    assert.is_nil(err)
    local domain_dnskey_ref01_resdata_up0 = helpers.to_map(type(domain_dnskey_ref01_resdata_up0_result) == 'table' and domain_dnskey_ref01_resdata_up0_result.data_get and domain_dnskey_ref01_resdata_up0_result:data_get() or domain_dnskey_ref01_resdata_up0_result)
    assert.is_not_nil(domain_dnskey_ref01_resdata_up0)
    assert.is_true(runner.live_same_id(domain_dnskey_ref01_resdata_up0["id"], domain_dnskey_ref01_data_up0_up["id"]))
    assert.are.equal(domain_dnskey_ref01_resdata_up0[domain_dnskey_ref01_markdef_up0_name], domain_dnskey_ref01_markdef_up0_value)

    if setup.live then
      runner.live_pace()
    end
    -- REMOVE
    local domain_dnskey_ref01_match_rm0 = {
      id = domain_dnskey_ref01_data["id"],
    }
    domain_dnskey_ref01_match_rm0["domain"] = setup.idmap["domain"] or setup.idmap["domain01"]
    local _, err = domain_dnskey_ref01_ent:remove(domain_dnskey_ref01_match_rm0, nil)
    assert.is_nil(err)

    if setup.live then
      runner.live_pace()
    end
    -- LIST
    local domain_dnskey_ref01_match_rt0 = {
      ["domain"] = setup.idmap["domain01"],
    }

    local domain_dnskey_ref01_list_rt0_result, err = domain_dnskey_ref01_ent:list(domain_dnskey_ref01_match_rt0, nil)
    assert.is_nil(err)
    assert.is_table(domain_dnskey_ref01_list_rt0_result)

    local not_found_item = vs.select(
      runner.entity_list_to_data(domain_dnskey_ref01_list_rt0_result),
      { id = domain_dnskey_ref01_data["id"] })
    assert.is_true(vs.isempty(not_found_item))

  end)
end)

function domain_dnskey_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/domain_dnskey/DomainDnskeyTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read domain_dnskey test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "domain_dnskey01", "domain_dnskey02", "domain_dnskey03", "domain01", "domain02", "domain03" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Whether *_ENTID supplied the idmap, read before env_override consumes
  -- it: without it, the ids a live flow binds are the fixture's synthetic ones.
  local entid_env_raw = os.getenv("GANDI_TEST_DOMAIN_DNSKEY_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["GANDI_TEST_DOMAIN_DNSKEY_ENTID"] = idmap,
    ["GANDI_TEST_LIVE"] = "FALSE",
    ["GANDI_TEST_EXPLAIN"] = "FALSE",
    ["GANDI_APIKEY"] = "",
  })

  local idmap_resolved = helpers.to_map(
    env["GANDI_TEST_DOMAIN_DNSKEY_ENTID"])
  if idmap_resolved == nil then
    idmap_resolved = helpers.to_map(idmap)
  end

  if env["GANDI_TEST_LIVE"] == "TRUE" then
    local merged_opts = vs.merge({
      -- FIRST, so the generated fields below win: sdk-test-control.json's
      -- test.client.options adds to the live client, it does not redirect it.
      runner.live_client_options(),
      {
        apikey = env["GANDI_APIKEY"],
      },
      extra or {},
    })
    client = sdk.new(helpers.to_map(merged_opts))
  end

  local live = env["GANDI_TEST_LIVE"] == "TRUE"
  return {
    client = client,
    data = entity_data,
    idmap = idmap_resolved,
    env = env,
    explain = env["GANDI_TEST_EXPLAIN"] == "TRUE",
    live = live,
    synthetic_only = live and not idmap_overridden,
    now = os.time() * 1000,
  }
end
