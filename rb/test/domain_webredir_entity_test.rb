# DomainWebredir entity test

require "minitest/autorun"
require "json"
require_relative "../Gandi_sdk"
require_relative "runner"

class DomainWebredirEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = GandiSDK.test(nil, nil)
    ent = testsdk.DomainWebredir(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = GandiConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = GandiSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.DomainWebredir(nil).list({ "domain" => 1 }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = domain_webredir_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "list", "update", "load", "remove"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "domain_webredir." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live] && ENV["VOXGIG_GETONLY_GUARD"] == "TRUE"
      puts "LIVE STEP {\"id\":\"domain_webredir.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /domain/domains/{domain}/webredirs\"}"
      puts "LIVE STEP {\"id\":\"domain_webredir.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PATCH /domain/domains/{domain}/webredirs/{host}\"}"
      puts "LIVE STEP {\"id\":\"domain_webredir.remove.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /domain/domains/{domain}/webredirs/{host}\"}"
    if setup[:live]
      ["domain01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via GANDI_TEST_DOMAIN_WEBREDIR_ENTID")
        end
      end
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    domain_webredir_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.domain_webredir")))
    domain_webredir_ref01_data = nil
    if domain_webredir_ref01_data_raw.length > 0
      domain_webredir_ref01_data = Helpers.to_map(domain_webredir_ref01_data_raw[0][1])
    end

    Runner.live_pace if setup[:live]
    # LIST
    domain_webredir_ref01_ent = client.DomainWebredir(nil)
    domain_webredir_ref01_match = {
      "domain" => setup[:idmap]["domain01"],
    }

    domain_webredir_ref01_list_result = domain_webredir_ref01_ent.list(domain_webredir_ref01_match, nil)
    assert domain_webredir_ref01_list_result.is_a?(Array)

    Runner.live_pace if setup[:live]
    # LOAD
    domain_webredir_ref01_match_dt0 = {}
    domain_webredir_ref01_match_dt0["domain"] = setup[:idmap]["domain"] || setup[:idmap]["domain01"]
    domain_webredir_ref01_data_dt0_loaded = domain_webredir_ref01_ent.load(domain_webredir_ref01_match_dt0, nil)
    assert !domain_webredir_ref01_data_dt0_loaded.nil?

      return
    end

    if setup[:live]
      ["domain01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via GANDI_TEST_DOMAIN_WEBREDIR_ENTID")
        end
      end
    end
    client = setup[:client]

    Runner.live_pace if setup[:live]
    # CREATE
    domain_webredir_ref01_ent = client.DomainWebredir(nil)
    domain_webredir_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.domain_webredir"), "domain_webredir_ref01"))
    domain_webredir_ref01_data["domain"] = setup[:idmap]["domain01"]

    domain_webredir_ref01_data_result = domain_webredir_ref01_ent.create(domain_webredir_ref01_data, nil)
    domain_webredir_ref01_data = Helpers.to_map(domain_webredir_ref01_data_result.respond_to?(:data_get) ? domain_webredir_ref01_data_result.data_get : domain_webredir_ref01_data_result)
    assert !domain_webredir_ref01_data.nil?

    Runner.live_pace if setup[:live]
    # LIST
    domain_webredir_ref01_match = {
      "domain" => setup[:idmap]["domain01"],
    }

    domain_webredir_ref01_list_result = domain_webredir_ref01_ent.list(domain_webredir_ref01_match, nil)
    assert domain_webredir_ref01_list_result.is_a?(Array)

    Runner.live_pace if setup[:live]
    # UPDATE
    domain_webredir_ref01_data_up0_up = {
      "domain" => setup[:idmap]["domain"],
    }

    domain_webredir_ref01_markdef_up0_name = "cert_status"
    domain_webredir_ref01_markdef_up0_value = "Mark01-domain_webredir_ref01_#{setup[:now]}"
    domain_webredir_ref01_data_up0_up[domain_webredir_ref01_markdef_up0_name] = domain_webredir_ref01_markdef_up0_value

    domain_webredir_ref01_resdata_up0_result = domain_webredir_ref01_ent.update(domain_webredir_ref01_data_up0_up, nil)
    domain_webredir_ref01_resdata_up0 = Helpers.to_map(domain_webredir_ref01_resdata_up0_result.respond_to?(:data_get) ? domain_webredir_ref01_resdata_up0_result.data_get : domain_webredir_ref01_resdata_up0_result)
    assert !domain_webredir_ref01_resdata_up0.nil?
    assert_equal domain_webredir_ref01_resdata_up0[domain_webredir_ref01_markdef_up0_name], domain_webredir_ref01_markdef_up0_value

    Runner.live_pace if setup[:live]
    # LOAD
    domain_webredir_ref01_match_dt0 = {}
    domain_webredir_ref01_match_dt0["domain"] = setup[:idmap]["domain"] || setup[:idmap]["domain01"]
    domain_webredir_ref01_data_dt0_loaded = domain_webredir_ref01_ent.load(domain_webredir_ref01_match_dt0, nil)
    assert !domain_webredir_ref01_data_dt0_loaded.nil?

    Runner.live_pace if setup[:live]

    Runner.live_pace if setup[:live]
    # LIST
    domain_webredir_ref01_match_rt0 = {
      "domain" => setup[:idmap]["domain01"],
    }

    domain_webredir_ref01_list_rt0_result = domain_webredir_ref01_ent.list(domain_webredir_ref01_match_rt0, nil)
    assert domain_webredir_ref01_list_rt0_result.is_a?(Array)

  end
end

def domain_webredir_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "domain_webredir", "DomainWebredirTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = GandiSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["domain_webredir01", "domain_webredir02", "domain_webredir03", "domain01", "domain02", "domain03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["GANDI_TEST_DOMAIN_WEBREDIR_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "GANDI_TEST_DOMAIN_WEBREDIR_ENTID" => idmap,
    "GANDI_TEST_LIVE" => "FALSE",
    "GANDI_TEST_EXPLAIN" => "FALSE",
    "GANDI_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["GANDI_TEST_DOMAIN_WEBREDIR_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end
  if idmap_resolved["domain"].nil?
    idmap_resolved["domain"] = idmap_resolved["domain01"]
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
