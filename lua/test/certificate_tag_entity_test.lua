-- CertificateTag entity test

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


describe("CertificateTagEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:CertificateTag(nil)
    assert.is_not_nil(ent)
  end)

  it("should refuse an invalid request", function()
    local config = require("config_shared")()
    if type(config.feature) ~= "table" or config.feature.validate == nil then
      pending("feature not present in this SDK: validate")
      return
    end
    local client = sdk.test(nil, { feature = { validate = { active = true } } })
    local _, err = client:CertificateTag(nil):list({ ["certificate_id"] = 1 }, nil)
    assert.are.equal("validate_failed", type(err) == "table" and err.code or nil)
  end)

  it("should run basic flow", function()
    local setup = certificate_tag_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"create", "list", "update", "remove"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "certificate_tag." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    if setup.live and os.getenv("VOXGIG_GETONLY_GUARD") == "TRUE" then
      print("LIVE STEP {\"id\":\"certificate_tag.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /certificate/issued-certs/{id}/tags\"}")
      print("LIVE STEP {\"id\":\"certificate_tag.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /certificate/issued-certs/{id}/tags\"}")
      print("LIVE STEP {\"id\":\"certificate_tag.remove.3\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /certificate/issued-certs/{id}/tags\"}")
    if setup.live then
      for _, _live_key in ipairs({"certificate01"}) do
        if setup.synthetic_only or setup.idmap[_live_key] == nil then
          runner.live_miss(pending, LIVE_STRICT, "Live entity test blocked: needs " .. _live_key .. " via GANDI_TEST_CERTIFICATE_TAG_ENTID")
        end
      end
    end
    local client = setup.client

    -- Bootstrap entity data from existing test data.
    local certificate_tag_ref01_data_raw = vs.items(helpers.to_map(
      vs.getpath(setup.data, "existing.certificate_tag")))
    local certificate_tag_ref01_data = nil
    if #certificate_tag_ref01_data_raw > 0 then
      certificate_tag_ref01_data = helpers.to_map(certificate_tag_ref01_data_raw[1][2])
    end

    if setup.live then
      runner.live_pace()
    end
    -- LIST
    local certificate_tag_ref01_ent = client:CertificateTag(nil)
    local certificate_tag_ref01_match = {
      ["certificate_id"] = setup.idmap["certificate01"],
    }

    local certificate_tag_ref01_list_result, err = certificate_tag_ref01_ent:list(certificate_tag_ref01_match, nil)
    assert.is_nil(err)
    assert.is_table(certificate_tag_ref01_list_result)

      return
    end

    if setup.live then
      for _, _live_key in ipairs({"certificate01"}) do
        if setup.synthetic_only or setup.idmap[_live_key] == nil then
          runner.live_miss(pending, LIVE_STRICT, "Live entity test blocked: needs " .. _live_key .. " via GANDI_TEST_CERTIFICATE_TAG_ENTID")
        end
      end
    end
    local client = setup.client

    if setup.live then
      runner.live_pace()
    end
    -- CREATE
    local certificate_tag_ref01_ent = client:CertificateTag(nil)
    local certificate_tag_ref01_data = helpers.to_map(vs.getprop(
      vs.getpath(setup.data, "new.certificate_tag"), "certificate_tag_ref01"))
    certificate_tag_ref01_data["certificate_id"] = setup.idmap["certificate01"]

    local certificate_tag_ref01_data_result, err = certificate_tag_ref01_ent:create(certificate_tag_ref01_data, nil)
    assert.is_nil(err)
    certificate_tag_ref01_data = helpers.to_map(type(certificate_tag_ref01_data_result) == 'table' and certificate_tag_ref01_data_result.data_get and certificate_tag_ref01_data_result:data_get() or certificate_tag_ref01_data_result)
    assert.is_not_nil(certificate_tag_ref01_data)

    if setup.live then
      runner.live_pace()
    end
    -- LIST
    local certificate_tag_ref01_match = {
      ["certificate_id"] = setup.idmap["certificate01"],
    }

    local certificate_tag_ref01_list_result, err = certificate_tag_ref01_ent:list(certificate_tag_ref01_match, nil)
    assert.is_nil(err)
    assert.is_table(certificate_tag_ref01_list_result)

    if setup.live then
      runner.live_pace()
    end
    -- UPDATE
    local certificate_tag_ref01_data_up0_up = {
    }

    local certificate_tag_ref01_markdef_up0_name = "message"
    local certificate_tag_ref01_markdef_up0_value = "Mark01-certificate_tag_ref01_" .. tostring(setup.now)
    certificate_tag_ref01_data_up0_up[certificate_tag_ref01_markdef_up0_name] = certificate_tag_ref01_markdef_up0_value

    local certificate_tag_ref01_resdata_up0_result, err = certificate_tag_ref01_ent:update(certificate_tag_ref01_data_up0_up, nil)
    assert.is_nil(err)
    local certificate_tag_ref01_resdata_up0 = helpers.to_map(type(certificate_tag_ref01_resdata_up0_result) == 'table' and certificate_tag_ref01_resdata_up0_result.data_get and certificate_tag_ref01_resdata_up0_result:data_get() or certificate_tag_ref01_resdata_up0_result)
    assert.is_not_nil(certificate_tag_ref01_resdata_up0)
    assert.are.equal(certificate_tag_ref01_resdata_up0[certificate_tag_ref01_markdef_up0_name], certificate_tag_ref01_markdef_up0_value)

    if setup.live then
      runner.live_pace()
    end

    if setup.live then
      runner.live_pace()
    end
    -- LIST
    local certificate_tag_ref01_match_rt0 = {
      ["certificate_id"] = setup.idmap["certificate01"],
    }

    local certificate_tag_ref01_list_rt0_result, err = certificate_tag_ref01_ent:list(certificate_tag_ref01_match_rt0, nil)
    assert.is_nil(err)
    assert.is_table(certificate_tag_ref01_list_rt0_result)

  end)
end)

function certificate_tag_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/certificate_tag/CertificateTagTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read certificate_tag test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "certificate_tag01", "certificate_tag02", "certificate_tag03", "certificate01" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Whether *_ENTID supplied the idmap, read before env_override consumes
  -- it: without it, the ids a live flow binds are the fixture's synthetic ones.
  local entid_env_raw = os.getenv("GANDI_TEST_CERTIFICATE_TAG_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["GANDI_TEST_CERTIFICATE_TAG_ENTID"] = idmap,
    ["GANDI_TEST_LIVE"] = "FALSE",
    ["GANDI_TEST_EXPLAIN"] = "FALSE",
    ["GANDI_APIKEY"] = "",
  })

  local idmap_resolved = helpers.to_map(
    env["GANDI_TEST_CERTIFICATE_TAG_ENTID"])
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
