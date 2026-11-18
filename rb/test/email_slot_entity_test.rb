# EmailSlot entity test

require "minitest/autorun"
require "json"
require_relative "../Gandi_sdk"
require_relative "runner"

class EmailSlotEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = GandiSDK.test(nil, nil)
    ent = testsdk.EmailSlot(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = GandiConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = GandiSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.EmailSlot(nil).list({ "domain" => 1 }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = email_slot_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "list", "load", "remove"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "email_slot." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live] && ENV["VOXGIG_GETONLY_GUARD"] == "TRUE"
      puts "LIVE STEP {\"id\":\"email_slot.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /email/slots/{domain}\"}"
      puts "LIVE STEP {\"id\":\"email_slot.remove.3\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /email/slots/{domain}/{slot_id}\"}"
      puts "LIVE STEP {\"id\":\"email_slot.list.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}"
    if setup[:live]
      ["domain01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via GANDI_TEST_EMAIL_SLOT_ENTID")
        end
      end
    end
    client = setup[:client]
    if setup[:live]
      _live_id = setup[:synthetic_only] ? nil : setup[:idmap]["email_slot01"]
      Runner.live_pace
      Runner.live_existing(setup, LIVE_STRICT, "email_slot", "id", _live_id) do
        client.EmailSlot(nil).list({"domain" => setup[:idmap]["domain01"]}, nil)
      end
    end

    # Bootstrap entity data from existing test data.
    email_slot_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.email_slot")))
    email_slot_ref01_data = nil
    if email_slot_ref01_data_raw.length > 0
      email_slot_ref01_data = Helpers.to_map(email_slot_ref01_data_raw[0][1])
    end

    Runner.live_pace if setup[:live]
    # LIST
    email_slot_ref01_ent = client.EmailSlot(nil)
    email_slot_ref01_match = {
      "domain" => setup[:idmap]["domain01"],
    }

    email_slot_ref01_list_result = email_slot_ref01_ent.list(email_slot_ref01_match, nil)
    assert email_slot_ref01_list_result.is_a?(Array)

    Runner.live_pace if setup[:live]
    # LOAD
    email_slot_ref01_match_dt0 = {
      "id" => email_slot_ref01_data["id"],
    }
    email_slot_ref01_match_dt0["domain"] = setup[:idmap]["domain"] || setup[:idmap]["domain01"]
    email_slot_ref01_data_dt0_loaded = email_slot_ref01_ent.load(email_slot_ref01_match_dt0, nil)
    email_slot_ref01_data_dt0_load_result = Helpers.to_map(email_slot_ref01_data_dt0_loaded.respond_to?(:data_get) ? email_slot_ref01_data_dt0_loaded.data_get : email_slot_ref01_data_dt0_loaded)
    assert !email_slot_ref01_data_dt0_load_result.nil?
    assert Runner.live_same_id(email_slot_ref01_data_dt0_load_result["id"], email_slot_ref01_data["id"])

      return
    end

    if setup[:live]
      ["domain01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via GANDI_TEST_EMAIL_SLOT_ENTID")
        end
      end
    end
    client = setup[:client]

    Runner.live_pace if setup[:live]
    # CREATE
    email_slot_ref01_ent = client.EmailSlot(nil)
    email_slot_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.email_slot"), "email_slot_ref01"))
    email_slot_ref01_data["domain"] = setup[:idmap]["domain01"]

    email_slot_ref01_data_result = email_slot_ref01_ent.create(email_slot_ref01_data, nil)
    email_slot_ref01_data = Helpers.to_map(email_slot_ref01_data_result.respond_to?(:data_get) ? email_slot_ref01_data_result.data_get : email_slot_ref01_data_result)
    assert !email_slot_ref01_data.nil?
    assert !email_slot_ref01_data["id"].nil?

    Runner.live_pace if setup[:live]
    # LIST
    email_slot_ref01_match = {
      "domain" => setup[:idmap]["domain01"],
    }

    email_slot_ref01_list_result = email_slot_ref01_ent.list(email_slot_ref01_match, nil)
    assert email_slot_ref01_list_result.is_a?(Array)

    found_item = Vs.select(
      Runner.entity_list_to_data(email_slot_ref01_list_result),
      { "id" => email_slot_ref01_data["id"] })
    assert !Vs.isempty(found_item)

    Runner.live_pace if setup[:live]
    # LOAD
    email_slot_ref01_match_dt0 = {
      "id" => email_slot_ref01_data["id"],
    }
    email_slot_ref01_match_dt0["domain"] = setup[:idmap]["domain"] || setup[:idmap]["domain01"]
    email_slot_ref01_data_dt0_loaded = email_slot_ref01_ent.load(email_slot_ref01_match_dt0, nil)
    email_slot_ref01_data_dt0_load_result = Helpers.to_map(email_slot_ref01_data_dt0_loaded.respond_to?(:data_get) ? email_slot_ref01_data_dt0_loaded.data_get : email_slot_ref01_data_dt0_loaded)
    assert !email_slot_ref01_data_dt0_load_result.nil?
    assert Runner.live_same_id(email_slot_ref01_data_dt0_load_result["id"], email_slot_ref01_data["id"])

    Runner.live_pace if setup[:live]
    # REMOVE
    email_slot_ref01_match_rm0 = {
      "id" => email_slot_ref01_data["id"],
    }
    email_slot_ref01_match_rm0["domain"] = setup[:idmap]["domain"] || setup[:idmap]["domain01"]
    email_slot_ref01_ent.remove(email_slot_ref01_match_rm0, nil)

    Runner.live_pace if setup[:live]
    # LIST
    email_slot_ref01_match_rt0 = {
      "domain" => setup[:idmap]["domain01"],
    }

    email_slot_ref01_list_rt0_result = email_slot_ref01_ent.list(email_slot_ref01_match_rt0, nil)
    assert email_slot_ref01_list_rt0_result.is_a?(Array)

    not_found_item = Vs.select(
      Runner.entity_list_to_data(email_slot_ref01_list_rt0_result),
      { "id" => email_slot_ref01_data["id"] })
    assert Vs.isempty(not_found_item)

  end
end

def email_slot_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "email_slot", "EmailSlotTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = GandiSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["email_slot01", "email_slot02", "email_slot03", "domain01"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["GANDI_TEST_EMAIL_SLOT_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "GANDI_TEST_EMAIL_SLOT_ENTID" => idmap,
    "GANDI_TEST_LIVE" => "FALSE",
    "GANDI_TEST_EXPLAIN" => "FALSE",
    "GANDI_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["GANDI_TEST_EMAIL_SLOT_ENTID"])
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
