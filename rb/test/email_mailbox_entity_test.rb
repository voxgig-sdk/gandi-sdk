# EmailMailbox entity test

require "minitest/autorun"
require "json"
require_relative "../Gandi_sdk"
require_relative "runner"

class EmailMailboxEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = GandiSDK.test(nil, nil)
    ent = testsdk.EmailMailbox(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = GandiConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = GandiSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.EmailMailbox(nil).list({ "domain" => 1 }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = email_mailbox_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "list", "update", "load", "remove"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "email_mailbox." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live] && ENV["VOXGIG_GETONLY_GUARD"] == "TRUE"
      puts "LIVE STEP {\"id\":\"email_mailbox.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /email/mailboxes/{domain}/{email}/renew\"}"
      puts "LIVE STEP {\"id\":\"email_mailbox.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PATCH /email/mailboxes/{domain}/{mailbox_id}\"}"
      puts "LIVE STEP {\"id\":\"email_mailbox.remove.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /email/mailboxes/{domain}/{mailbox_id}\"}"
      puts "LIVE STEP {\"id\":\"email_mailbox.list.5\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}"
    if setup[:live]
      ["domain01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via GANDI_TEST_EMAIL_MAILBOX_ENTID")
        end
      end
    end
    client = setup[:client]
    if setup[:live]
      _live_id = setup[:synthetic_only] ? nil : setup[:idmap]["email_mailbox01"]
      Runner.live_pace
      Runner.live_existing(setup, LIVE_STRICT, "email_mailbox", "id", _live_id) do
        client.EmailMailbox(nil).list({"domain" => setup[:idmap]["domain01"]}, nil)
      end
    end

    # Bootstrap entity data from existing test data.
    email_mailbox_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.email_mailbox")))
    email_mailbox_ref01_data = nil
    if email_mailbox_ref01_data_raw.length > 0
      email_mailbox_ref01_data = Helpers.to_map(email_mailbox_ref01_data_raw[0][1])
    end

    Runner.live_pace if setup[:live]
    # LIST
    email_mailbox_ref01_ent = client.EmailMailbox(nil)
    email_mailbox_ref01_match = {
      "domain" => setup[:idmap]["domain01"],
    }

    email_mailbox_ref01_list_result = email_mailbox_ref01_ent.list(email_mailbox_ref01_match, nil)
    assert email_mailbox_ref01_list_result.is_a?(Array)

    Runner.live_pace if setup[:live]
    # LOAD
    email_mailbox_ref01_match_dt0 = {
      "id" => email_mailbox_ref01_data["id"],
    }
    email_mailbox_ref01_match_dt0["domain"] = [String, Numeric, TrueClass, FalseClass].any? { |c| email_mailbox_ref01_data["domain"].is_a?(c) } ? email_mailbox_ref01_data["domain"] : (setup[:idmap]["domain"] || setup[:idmap]["domain01"])
    email_mailbox_ref01_data_dt0_loaded = email_mailbox_ref01_ent.load(email_mailbox_ref01_match_dt0, nil)
    email_mailbox_ref01_data_dt0_load_result = Helpers.to_map(email_mailbox_ref01_data_dt0_loaded.respond_to?(:data_get) ? email_mailbox_ref01_data_dt0_loaded.data_get : email_mailbox_ref01_data_dt0_loaded)
    assert !email_mailbox_ref01_data_dt0_load_result.nil?
    assert Runner.live_same_id(email_mailbox_ref01_data_dt0_load_result["id"], email_mailbox_ref01_data["id"])

      return
    end

    if setup[:live]
      ["domain01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via GANDI_TEST_EMAIL_MAILBOX_ENTID")
        end
      end
    end
    client = setup[:client]

    Runner.live_pace if setup[:live]
    # CREATE
    email_mailbox_ref01_ent = client.EmailMailbox(nil)
    email_mailbox_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.email_mailbox"), "email_mailbox_ref01"))
    email_mailbox_ref01_data["domain"] = setup[:idmap]["domain01"]

    email_mailbox_ref01_data_result = email_mailbox_ref01_ent.create(email_mailbox_ref01_data, nil)
    email_mailbox_ref01_data = Helpers.to_map(email_mailbox_ref01_data_result.respond_to?(:data_get) ? email_mailbox_ref01_data_result.data_get : email_mailbox_ref01_data_result)
    assert !email_mailbox_ref01_data.nil?
    assert !email_mailbox_ref01_data["id"].nil?

    Runner.live_pace if setup[:live]
    # LIST
    email_mailbox_ref01_match = {
      "domain" => setup[:idmap]["domain01"],
    }

    email_mailbox_ref01_list_result = email_mailbox_ref01_ent.list(email_mailbox_ref01_match, nil)
    assert email_mailbox_ref01_list_result.is_a?(Array)

    found_item = Vs.select(
      Runner.entity_list_to_data(email_mailbox_ref01_list_result),
      { "id" => email_mailbox_ref01_data["id"] })
    assert !Vs.isempty(found_item)

    Runner.live_pace if setup[:live]
    # UPDATE
    email_mailbox_ref01_data_up0_up = {
      "id" => email_mailbox_ref01_data["id"],
      "domain" => setup[:idmap]["domain"],
    }

    email_mailbox_ref01_markdef_up0_name = "address"
    email_mailbox_ref01_markdef_up0_value = "Mark01-email_mailbox_ref01_#{setup[:now]}"
    email_mailbox_ref01_data_up0_up[email_mailbox_ref01_markdef_up0_name] = email_mailbox_ref01_markdef_up0_value

    email_mailbox_ref01_resdata_up0_result = email_mailbox_ref01_ent.update(email_mailbox_ref01_data_up0_up, nil)
    email_mailbox_ref01_resdata_up0 = Helpers.to_map(email_mailbox_ref01_resdata_up0_result.respond_to?(:data_get) ? email_mailbox_ref01_resdata_up0_result.data_get : email_mailbox_ref01_resdata_up0_result)
    assert !email_mailbox_ref01_resdata_up0.nil?
    assert Runner.live_same_id(email_mailbox_ref01_resdata_up0["id"], email_mailbox_ref01_data_up0_up["id"])
    assert_equal email_mailbox_ref01_resdata_up0[email_mailbox_ref01_markdef_up0_name], email_mailbox_ref01_markdef_up0_value

    Runner.live_pace if setup[:live]
    # LOAD
    email_mailbox_ref01_match_dt0 = {
      "id" => email_mailbox_ref01_data["id"],
    }
    email_mailbox_ref01_match_dt0["domain"] = [String, Numeric, TrueClass, FalseClass].any? { |c| email_mailbox_ref01_data["domain"].is_a?(c) } ? email_mailbox_ref01_data["domain"] : (setup[:idmap]["domain"] || setup[:idmap]["domain01"])
    email_mailbox_ref01_data_dt0_loaded = email_mailbox_ref01_ent.load(email_mailbox_ref01_match_dt0, nil)
    email_mailbox_ref01_data_dt0_load_result = Helpers.to_map(email_mailbox_ref01_data_dt0_loaded.respond_to?(:data_get) ? email_mailbox_ref01_data_dt0_loaded.data_get : email_mailbox_ref01_data_dt0_loaded)
    assert !email_mailbox_ref01_data_dt0_load_result.nil?
    assert Runner.live_same_id(email_mailbox_ref01_data_dt0_load_result["id"], email_mailbox_ref01_data["id"])

    Runner.live_pace if setup[:live]
    # REMOVE
    email_mailbox_ref01_match_rm0 = {
      "id" => email_mailbox_ref01_data["id"],
    }
    email_mailbox_ref01_match_rm0["domain"] = setup[:idmap]["domain"] || setup[:idmap]["domain01"]
    email_mailbox_ref01_ent.remove(email_mailbox_ref01_match_rm0, nil)

    Runner.live_pace if setup[:live]
    # LIST
    email_mailbox_ref01_match_rt0 = {
      "domain" => setup[:idmap]["domain01"],
    }

    email_mailbox_ref01_list_rt0_result = email_mailbox_ref01_ent.list(email_mailbox_ref01_match_rt0, nil)
    assert email_mailbox_ref01_list_rt0_result.is_a?(Array)

    not_found_item = Vs.select(
      Runner.entity_list_to_data(email_mailbox_ref01_list_rt0_result),
      { "id" => email_mailbox_ref01_data["id"] })
    assert Vs.isempty(not_found_item)

  end
end

def email_mailbox_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "email_mailbox", "EmailMailboxTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = GandiSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["email_mailbox01", "email_mailbox02", "email_mailbox03", "mailbox01", "mailbox02", "mailbox03", "domain01"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["GANDI_TEST_EMAIL_MAILBOX_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "GANDI_TEST_EMAIL_MAILBOX_ENTID" => idmap,
    "GANDI_TEST_LIVE" => "FALSE",
    "GANDI_TEST_EXPLAIN" => "FALSE",
    "GANDI_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["GANDI_TEST_EMAIL_MAILBOX_ENTID"])
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
