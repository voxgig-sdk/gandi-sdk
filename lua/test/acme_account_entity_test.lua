-- AcmeAccount entity test

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


describe("AcmeAccountEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:AcmeAccount(nil)
    assert.is_not_nil(ent)
  end)

  it("should refuse an invalid request", function()
    local config = require("config_shared")()
    if type(config.feature) ~= "table" or config.feature.validate == nil then
      pending("feature not present in this SDK: validate")
      return
    end
    local client = sdk.test(nil, { feature = { validate = { active = true } } })
    local _, err = client:AcmeAccount(nil):list({ ["subscription_id"] = 1, ["sharing_id"] = "x" }, nil)
    assert.are.equal("validate_failed", type(err) == "table" and err.code or nil)
  end)

  it("should run basic flow", function()
    local setup = acme_account_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"list", "load"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "acme_account." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    if setup.live then
      for _, _live_key in ipairs({"subscription01"}) do
        if setup.synthetic_only or setup.idmap[_live_key] == nil then
          runner.live_miss(pending, LIVE_STRICT, "Live entity test blocked: needs " .. _live_key .. " via GANDI_TEST_ACME_ACCOUNT_ENTID")
        end
      end
    end
    local client = setup.client
    if setup.live then
      local _live_id = nil
      if not setup.synthetic_only then
        _live_id = setup.idmap["acme_account01"]
      end
      runner.live_pace()
      runner.live_existing(pending, setup, LIVE_STRICT, "acme_account", function()
        return client:AcmeAccount(nil):list({["subscription_id"] = setup.idmap["subscription01"]}, nil)
      end, "id", _live_id)
    end

    -- Bootstrap entity data from existing test data.
    local acme_account_ref01_data_raw = vs.items(helpers.to_map(
      vs.getpath(setup.data, "existing.acme_account")))
    local acme_account_ref01_data = nil
    if #acme_account_ref01_data_raw > 0 then
      acme_account_ref01_data = helpers.to_map(acme_account_ref01_data_raw[1][2])
    end

    if setup.live then
      runner.live_pace()
    end
    -- LIST
    local acme_account_ref01_ent = client:AcmeAccount(nil)
    local acme_account_ref01_match = {
      ["subscription_id"] = setup.idmap["subscription01"],
    }

    local acme_account_ref01_list_result, err = acme_account_ref01_ent:list(acme_account_ref01_match, nil)
    assert.is_nil(err)
    assert.is_table(acme_account_ref01_list_result)

    if setup.live then
      runner.live_pace()
    end
    -- LOAD
    local acme_account_ref01_match_dt0 = {
      id = acme_account_ref01_data["id"],
    }
    do
      local own = acme_account_ref01_data["subscription_id"]
      if type(own) == "string" or type(own) == "number" or type(own) == "boolean" then
        acme_account_ref01_match_dt0["subscription_id"] = own
      else
        acme_account_ref01_match_dt0["subscription_id"] = setup.idmap["subscription_id"] or setup.idmap["subscription01"]
      end
    end
    local acme_account_ref01_data_dt0_loaded, err = acme_account_ref01_ent:load(acme_account_ref01_match_dt0, nil)
    assert.is_nil(err)
    local acme_account_ref01_data_dt0_load_result = helpers.to_map(type(acme_account_ref01_data_dt0_loaded) == 'table' and acme_account_ref01_data_dt0_loaded.data_get and acme_account_ref01_data_dt0_loaded:data_get() or acme_account_ref01_data_dt0_loaded)
    assert.is_not_nil(acme_account_ref01_data_dt0_load_result)
    assert.is_true(runner.live_same_id(acme_account_ref01_data_dt0_load_result["id"], acme_account_ref01_data["id"]))

  end)
end)

function acme_account_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/acme_account/AcmeAccountTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read acme_account test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "acme_account01", "acme_account02", "acme_account03", "subscription01" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Whether *_ENTID supplied the idmap, read before env_override consumes
  -- it: without it, the ids a live flow binds are the fixture's synthetic ones.
  local entid_env_raw = os.getenv("GANDI_TEST_ACME_ACCOUNT_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["GANDI_TEST_ACME_ACCOUNT_ENTID"] = idmap,
    ["GANDI_TEST_LIVE"] = "FALSE",
    ["GANDI_TEST_EXPLAIN"] = "FALSE",
    ["GANDI_APIKEY"] = "",
  })

  local idmap_resolved = helpers.to_map(
    env["GANDI_TEST_ACME_ACCOUNT_ENTID"])
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
