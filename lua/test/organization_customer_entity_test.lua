-- OrganizationCustomer entity test

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


describe("OrganizationCustomerEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:OrganizationCustomer(nil)
    assert.is_not_nil(ent)
  end)

  it("should refuse an invalid request", function()
    local config = require("config_shared")()
    if type(config.feature) ~= "table" or config.feature.validate == nil then
      pending("feature not present in this SDK: validate")
      return
    end
    local client = sdk.test(nil, { feature = { validate = { active = true } } })
    local _, err = client:OrganizationCustomer(nil):list({ ["org_id"] = 1 }, nil)
    assert.are.equal("validate_failed", type(err) == "table" and err.code or nil)
  end)

  it("should run basic flow", function()
    local setup = organization_customer_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"create", "list", "update", "load", "remove"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "organization_customer." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    if setup.live and os.getenv("VOXGIG_GETONLY_GUARD") == "TRUE" then
      print("LIVE STEP {\"id\":\"organization_customer.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /organization/organizations/{org_id}/customers\"}")
      print("LIVE STEP {\"id\":\"organization_customer.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PATCH /organization/organizations/{org_id}/customers/{id}\"}")
      print("LIVE STEP {\"id\":\"organization_customer.remove.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /organization/organizations/{org_id}/customers/{id}\"}")
      print("LIVE STEP {\"id\":\"organization_customer.list.5\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}")
    if setup.live then
      for _, _live_key in ipairs({"org01"}) do
        if setup.synthetic_only or setup.idmap[_live_key] == nil then
          runner.live_miss(pending, LIVE_STRICT, "Live entity test blocked: needs " .. _live_key .. " via GANDI_TEST_ORGANIZATION_CUSTOMER_ENTID")
        end
      end
    end
    local client = setup.client
    if setup.live then
      local _live_id = nil
      if not setup.synthetic_only then
        _live_id = setup.idmap["organization_customer01"]
      end
      runner.live_pace()
      runner.live_existing(pending, setup, LIVE_STRICT, "organization_customer", function()
        return client:OrganizationCustomer(nil):list({["org_id"] = setup.idmap["org01"]}, nil)
      end, "id", _live_id)
    end

    -- Bootstrap entity data from existing test data.
    local organization_customer_ref01_data_raw = vs.items(helpers.to_map(
      vs.getpath(setup.data, "existing.organization_customer")))
    local organization_customer_ref01_data = nil
    if #organization_customer_ref01_data_raw > 0 then
      organization_customer_ref01_data = helpers.to_map(organization_customer_ref01_data_raw[1][2])
    end

    if setup.live then
      runner.live_pace()
    end
    -- LIST
    local organization_customer_ref01_ent = client:OrganizationCustomer(nil)
    local organization_customer_ref01_match = {
      ["org_id"] = setup.idmap["org01"],
    }

    local organization_customer_ref01_list_result, err = organization_customer_ref01_ent:list(organization_customer_ref01_match, nil)
    assert.is_nil(err)
    assert.is_table(organization_customer_ref01_list_result)

    if setup.live then
      runner.live_pace()
    end
    -- LOAD
    local organization_customer_ref01_match_dt0 = {
      id = organization_customer_ref01_data["id"],
    }
    organization_customer_ref01_match_dt0["org_id"] = setup.idmap["org_id"] or setup.idmap["org01"]
    local organization_customer_ref01_data_dt0_loaded, err = organization_customer_ref01_ent:load(organization_customer_ref01_match_dt0, nil)
    assert.is_nil(err)
    local organization_customer_ref01_data_dt0_load_result = helpers.to_map(type(organization_customer_ref01_data_dt0_loaded) == 'table' and organization_customer_ref01_data_dt0_loaded.data_get and organization_customer_ref01_data_dt0_loaded:data_get() or organization_customer_ref01_data_dt0_loaded)
    assert.is_not_nil(organization_customer_ref01_data_dt0_load_result)
    assert.is_true(runner.live_same_id(organization_customer_ref01_data_dt0_load_result["id"], organization_customer_ref01_data["id"]))

      return
    end

    if setup.live then
      for _, _live_key in ipairs({"org01"}) do
        if setup.synthetic_only or setup.idmap[_live_key] == nil then
          runner.live_miss(pending, LIVE_STRICT, "Live entity test blocked: needs " .. _live_key .. " via GANDI_TEST_ORGANIZATION_CUSTOMER_ENTID")
        end
      end
    end
    local client = setup.client

    if setup.live then
      runner.live_pace()
    end
    -- CREATE
    local organization_customer_ref01_ent = client:OrganizationCustomer(nil)
    local organization_customer_ref01_data = helpers.to_map(vs.getprop(
      vs.getpath(setup.data, "new.organization_customer"), "organization_customer_ref01"))
    organization_customer_ref01_data["org_id"] = setup.idmap["org01"]

    local organization_customer_ref01_data_result, err = organization_customer_ref01_ent:create(organization_customer_ref01_data, nil)
    assert.is_nil(err)
    organization_customer_ref01_data = helpers.to_map(type(organization_customer_ref01_data_result) == 'table' and organization_customer_ref01_data_result.data_get and organization_customer_ref01_data_result:data_get() or organization_customer_ref01_data_result)
    assert.is_not_nil(organization_customer_ref01_data)
    assert.is_not_nil(organization_customer_ref01_data["id"])

    if setup.live then
      runner.live_pace()
    end
    -- LIST
    local organization_customer_ref01_match = {
      ["org_id"] = setup.idmap["org01"],
    }

    local organization_customer_ref01_list_result, err = organization_customer_ref01_ent:list(organization_customer_ref01_match, nil)
    assert.is_nil(err)
    assert.is_table(organization_customer_ref01_list_result)

    local found_item = vs.select(
      runner.entity_list_to_data(organization_customer_ref01_list_result),
      { id = organization_customer_ref01_data["id"] })
    assert.is_false(vs.isempty(found_item))

    if setup.live then
      runner.live_pace()
    end
    -- UPDATE
    local organization_customer_ref01_data_up0_up = {
      id = organization_customer_ref01_data["id"],
      ["org_id"] = setup.idmap["org_id"],
    }

    local organization_customer_ref01_markdef_up0_name = "city"
    local organization_customer_ref01_markdef_up0_value = "Mark01-organization_customer_ref01_" .. tostring(setup.now)
    organization_customer_ref01_data_up0_up[organization_customer_ref01_markdef_up0_name] = organization_customer_ref01_markdef_up0_value

    local organization_customer_ref01_resdata_up0_result, err = organization_customer_ref01_ent:update(organization_customer_ref01_data_up0_up, nil)
    assert.is_nil(err)
    local organization_customer_ref01_resdata_up0 = helpers.to_map(type(organization_customer_ref01_resdata_up0_result) == 'table' and organization_customer_ref01_resdata_up0_result.data_get and organization_customer_ref01_resdata_up0_result:data_get() or organization_customer_ref01_resdata_up0_result)
    assert.is_not_nil(organization_customer_ref01_resdata_up0)
    assert.is_true(runner.live_same_id(organization_customer_ref01_resdata_up0["id"], organization_customer_ref01_data_up0_up["id"]))
    assert.are.equal(organization_customer_ref01_resdata_up0[organization_customer_ref01_markdef_up0_name], organization_customer_ref01_markdef_up0_value)

    if setup.live then
      runner.live_pace()
    end
    -- LOAD
    local organization_customer_ref01_match_dt0 = {
      id = organization_customer_ref01_data["id"],
    }
    organization_customer_ref01_match_dt0["org_id"] = setup.idmap["org_id"] or setup.idmap["org01"]
    local organization_customer_ref01_data_dt0_loaded, err = organization_customer_ref01_ent:load(organization_customer_ref01_match_dt0, nil)
    assert.is_nil(err)
    local organization_customer_ref01_data_dt0_load_result = helpers.to_map(type(organization_customer_ref01_data_dt0_loaded) == 'table' and organization_customer_ref01_data_dt0_loaded.data_get and organization_customer_ref01_data_dt0_loaded:data_get() or organization_customer_ref01_data_dt0_loaded)
    assert.is_not_nil(organization_customer_ref01_data_dt0_load_result)
    assert.is_true(runner.live_same_id(organization_customer_ref01_data_dt0_load_result["id"], organization_customer_ref01_data["id"]))

    if setup.live then
      runner.live_pace()
    end
    -- REMOVE
    local organization_customer_ref01_match_rm0 = {
      id = organization_customer_ref01_data["id"],
    }
    organization_customer_ref01_match_rm0["org_id"] = setup.idmap["org_id"] or setup.idmap["org01"]
    local _, err = organization_customer_ref01_ent:remove(organization_customer_ref01_match_rm0, nil)
    assert.is_nil(err)

    if setup.live then
      runner.live_pace()
    end
    -- LIST
    local organization_customer_ref01_match_rt0 = {
      ["org_id"] = setup.idmap["org01"],
    }

    local organization_customer_ref01_list_rt0_result, err = organization_customer_ref01_ent:list(organization_customer_ref01_match_rt0, nil)
    assert.is_nil(err)
    assert.is_table(organization_customer_ref01_list_rt0_result)

    local not_found_item = vs.select(
      runner.entity_list_to_data(organization_customer_ref01_list_rt0_result),
      { id = organization_customer_ref01_data["id"] })
    assert.is_true(vs.isempty(not_found_item))

  end)
end)

function organization_customer_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/organization_customer/OrganizationCustomerTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read organization_customer test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "organization_customer01", "organization_customer02", "organization_customer03", "organization01", "organization02", "organization03", "org01" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Whether *_ENTID supplied the idmap, read before env_override consumes
  -- it: without it, the ids a live flow binds are the fixture's synthetic ones.
  local entid_env_raw = os.getenv("GANDI_TEST_ORGANIZATION_CUSTOMER_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["GANDI_TEST_ORGANIZATION_CUSTOMER_ENTID"] = idmap,
    ["GANDI_TEST_LIVE"] = "FALSE",
    ["GANDI_TEST_EXPLAIN"] = "FALSE",
    ["GANDI_APIKEY"] = "",
  })

  local idmap_resolved = helpers.to_map(
    env["GANDI_TEST_ORGANIZATION_CUSTOMER_ENTID"])
  if idmap_resolved == nil then
    idmap_resolved = helpers.to_map(idmap)
  end
  if idmap_resolved["org_id"] == nil then
    idmap_resolved["org_id"] = idmap_resolved["org01"]
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
