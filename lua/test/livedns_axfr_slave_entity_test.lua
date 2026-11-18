-- LivednsAxfrSlave entity test

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


describe("LivednsAxfrSlaveEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:LivednsAxfrSlave(nil)
    assert.is_not_nil(ent)
  end)

  it("should refuse an invalid request", function()
    local config = require("config_shared")()
    if type(config.feature) ~= "table" or config.feature.validate == nil then
      pending("feature not present in this SDK: validate")
      return
    end
    local client = sdk.test(nil, { feature = { validate = { active = true } } })
    local _, err = client:LivednsAxfrSlave(nil):list({ ["fqdn"] = 1 }, nil)
    assert.are.equal("validate_failed", type(err) == "table" and err.code or nil)
  end)

  it("should run basic flow", function()
    local setup = livedns_axfr_slave_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"list"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "livedns_axfr_slave." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    if setup.live and os.getenv("VOXGIG_GETONLY_GUARD") == "TRUE" then
      print("LIVE STEP {\"id\":\"livedns_axfr_slave.update.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /livedns/domains/{fqdn}/axfr/slaves/{ip}\"}")
    if setup.live then
      for _, _live_key in ipairs({"fqdn01"}) do
        if setup.synthetic_only or setup.idmap[_live_key] == nil then
          runner.live_miss(pending, LIVE_STRICT, "Live entity test blocked: needs " .. _live_key .. " via GANDI_TEST_LIVEDNS_AXFR_SLAVE_ENTID")
        end
      end
    end
    local client = setup.client

    -- Bootstrap entity data from existing test data.
    local livedns_axfr_slave_ref01_data_raw = vs.items(helpers.to_map(
      vs.getpath(setup.data, "existing.livedns_axfr_slave")))
    local livedns_axfr_slave_ref01_data = nil
    if #livedns_axfr_slave_ref01_data_raw > 0 then
      livedns_axfr_slave_ref01_data = helpers.to_map(livedns_axfr_slave_ref01_data_raw[1][2])
    end

    if setup.live then
      runner.live_pace()
    end
    -- LIST
    local livedns_axfr_slave_ref01_ent = client:LivednsAxfrSlave(nil)
    local livedns_axfr_slave_ref01_match = {
      ["fqdn"] = setup.idmap["fqdn01"],
    }

    local livedns_axfr_slave_ref01_list_result, err = livedns_axfr_slave_ref01_ent:list(livedns_axfr_slave_ref01_match, nil)
    assert.is_nil(err)
    assert.is_table(livedns_axfr_slave_ref01_list_result)

      return
    end

    if setup.live then
      for _, _live_key in ipairs({"fqdn01"}) do
        if setup.synthetic_only or setup.idmap[_live_key] == nil then
          runner.live_miss(pending, LIVE_STRICT, "Live entity test blocked: needs " .. _live_key .. " via GANDI_TEST_LIVEDNS_AXFR_SLAVE_ENTID")
        end
      end
    end
    local client = setup.client

    -- Bootstrap entity data from existing test data.
    local livedns_axfr_slave_ref01_data_raw = vs.items(helpers.to_map(
      vs.getpath(setup.data, "existing.livedns_axfr_slave")))
    local livedns_axfr_slave_ref01_data = nil
    if #livedns_axfr_slave_ref01_data_raw > 0 then
      livedns_axfr_slave_ref01_data = helpers.to_map(livedns_axfr_slave_ref01_data_raw[1][2])
    end

    if setup.live then
      runner.live_pace()
    end
    -- LIST
    local livedns_axfr_slave_ref01_ent = client:LivednsAxfrSlave(nil)
    local livedns_axfr_slave_ref01_match = {
      ["fqdn"] = setup.idmap["fqdn01"],
    }

    local livedns_axfr_slave_ref01_list_result, err = livedns_axfr_slave_ref01_ent:list(livedns_axfr_slave_ref01_match, nil)
    assert.is_nil(err)
    assert.is_table(livedns_axfr_slave_ref01_list_result)

  end)
end)

function livedns_axfr_slave_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/livedns_axfr_slave/LivednsAxfrSlaveTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read livedns_axfr_slave test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "livedns_axfr_slave01", "livedns_axfr_slave02", "livedns_axfr_slave03", "domain01", "domain02", "domain03", "fqdn01" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Whether *_ENTID supplied the idmap, read before env_override consumes
  -- it: without it, the ids a live flow binds are the fixture's synthetic ones.
  local entid_env_raw = os.getenv("GANDI_TEST_LIVEDNS_AXFR_SLAVE_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["GANDI_TEST_LIVEDNS_AXFR_SLAVE_ENTID"] = idmap,
    ["GANDI_TEST_LIVE"] = "FALSE",
    ["GANDI_TEST_EXPLAIN"] = "FALSE",
    ["GANDI_APIKEY"] = "",
  })

  local idmap_resolved = helpers.to_map(
    env["GANDI_TEST_LIVEDNS_AXFR_SLAVE_ENTID"])
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
