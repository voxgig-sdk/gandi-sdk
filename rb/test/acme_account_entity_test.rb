# AcmeAccount entity test

require "minitest/autorun"
require "json"
require_relative "../Gandi_sdk"
require_relative "runner"

class AcmeAccountEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = GandiSDK.test(nil, nil)
    ent = testsdk.AcmeAccount(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = GandiConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = GandiSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.AcmeAccount(nil).list({ "subscription_id" => 1, "sharing_id" => "x" }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = acme_account_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "acme_account." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live]
      ["subscription01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via GANDI_TEST_ACME_ACCOUNT_ENTID")
        end
      end
    end
    client = setup[:client]
    if setup[:live]
      _live_id = setup[:synthetic_only] ? nil : setup[:idmap]["acme_account01"]
      Runner.live_pace
      Runner.live_existing(setup, LIVE_STRICT, "acme_account", "id", _live_id) do
        client.AcmeAccount(nil).list({"subscription_id" => setup[:idmap]["subscription01"]}, nil)
      end
    end

    # Bootstrap entity data from existing test data.
    acme_account_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.acme_account")))
    acme_account_ref01_data = nil
    if acme_account_ref01_data_raw.length > 0
      acme_account_ref01_data = Helpers.to_map(acme_account_ref01_data_raw[0][1])
    end

    Runner.live_pace if setup[:live]
    # LIST
    acme_account_ref01_ent = client.AcmeAccount(nil)
    acme_account_ref01_match = {
      "subscription_id" => setup[:idmap]["subscription01"],
    }

    acme_account_ref01_list_result = acme_account_ref01_ent.list(acme_account_ref01_match, nil)
    assert acme_account_ref01_list_result.is_a?(Array)

    Runner.live_pace if setup[:live]
    # LOAD
    acme_account_ref01_match_dt0 = {
      "id" => acme_account_ref01_data["id"],
    }
    acme_account_ref01_match_dt0["subscription_id"] = [String, Numeric, TrueClass, FalseClass].any? { |c| acme_account_ref01_data["subscription_id"].is_a?(c) } ? acme_account_ref01_data["subscription_id"] : (setup[:idmap]["subscription_id"] || setup[:idmap]["subscription01"])
    acme_account_ref01_data_dt0_loaded = acme_account_ref01_ent.load(acme_account_ref01_match_dt0, nil)
    acme_account_ref01_data_dt0_load_result = Helpers.to_map(acme_account_ref01_data_dt0_loaded.respond_to?(:data_get) ? acme_account_ref01_data_dt0_loaded.data_get : acme_account_ref01_data_dt0_loaded)
    assert !acme_account_ref01_data_dt0_load_result.nil?
    assert Runner.live_same_id(acme_account_ref01_data_dt0_load_result["id"], acme_account_ref01_data["id"])

  end
end

def acme_account_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "acme_account", "AcmeAccountTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = GandiSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["acme_account01", "acme_account02", "acme_account03", "subscription01"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["GANDI_TEST_ACME_ACCOUNT_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "GANDI_TEST_ACME_ACCOUNT_ENTID" => idmap,
    "GANDI_TEST_LIVE" => "FALSE",
    "GANDI_TEST_EXPLAIN" => "FALSE",
    "GANDI_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["GANDI_TEST_ACME_ACCOUNT_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["GANDI_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      # FIRST, so the generated fields below win: sdk-test-control.json's
      # test.client.options adds to the live client, it does not redirect it.
      Runner.live_client_options,
      {
        "apikey" => env["GANDI_APIKEY"],
      },
      extra || {},
    ])
    client = GandiSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["GANDI_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["GANDI_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
