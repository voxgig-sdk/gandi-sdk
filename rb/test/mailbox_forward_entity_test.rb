# MailboxForward entity test

require "minitest/autorun"
require "json"
require_relative "../Gandi_sdk"
require_relative "runner"

class MailboxForwardEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = GandiSDK.test(nil, nil)
    ent = testsdk.MailboxForward(nil)
    assert !ent.nil?
  end

  def test_list_entities
    seed = {
      "entity" => {
        "mailbox_forward" => {
          "l1" => { "id" => "l1" },
          "l2" => { "id" => "l2" },
        },
      },
    }
    items = GandiSDK.test(seed, nil).MailboxForward(nil).list(nil, nil)
    # list resolves to one entity per record; data_get reads the record.
    assert_equal 2, items.length
    items.each do |item|
      assert item.respond_to?(:data_get)
      assert item.data_get.is_a?(Hash)
    end
  end

  # Feature #4: the entity stream(action, ...) method runs the op pipeline and
  # returns an Enumerator over result items. With the streaming feature active
  # it yields the feature's incremental output; otherwise it falls back to the
  # materialised list so stream always yields.
  def test_stream
    seed = {
      "entity" => {
        "mailbox_forward" => {
          "s1" => { "id" => "s1" },
          "s2" => { "id" => "s2" },
          "s3" => { "id" => "s3" },
        },
      },
    }

    # Fallback: streaming inactive -> yields the materialised list items.
    base = GandiSDK.test(seed, nil)
    seen = base.MailboxForward(nil).stream("list", nil, nil).to_a
    assert_equal 3, seen.length

    # Inbound: streaming active -> yields each item from the feature.
    cfg = GandiConfig.shared_config
    if cfg["feature"].is_a?(Hash) && cfg["feature"].key?("streaming")
      sdk = GandiSDK.test(seed, { "feature" => { "streaming" => { "active" => true } } })
      got = []
      sdk.MailboxForward(nil).stream("list", nil, nil).each do |item|
        if item.is_a?(Array)
          got.concat(item)
        else
          got << item
        end
      end
      assert_equal 3, got.length
    end
  end

  class FailHook < GandiBaseFeature
    attr_reader :unexpected

    def initialize
      super()
      @name = "failhook"
      @unexpected = 0
    end

    def PreSpec(ctx)
      raise "mailbox_forward hook failed"
    end

    def PreUnexpected(ctx)
      @unexpected += 1
    end
  end

  def test_stream_error
    offline = { "net" => { "offline" => true } }
    err = assert_raises(StandardError) do
      GandiSDK.test(offline, nil).MailboxForward(nil).stream("list", nil, nil).to_a
    end
    assert_match(/offline/, err.message)

    GandiSDK.test(offline, nil).MailboxForward(nil)
      .stream("list", nil, { "ctrl" => { "throw" => false } }).to_a

    cfg = GandiConfig.shared_config
    if cfg["feature"].is_a?(Hash) && cfg["feature"].key?("rbac")
      denied = GandiSDK.test(nil, { "feature" => { "rbac" => { "active" => true, "deny" => true } } })
      err = assert_raises(StandardError) do
        denied.MailboxForward(nil).stream("list", nil, nil).to_a
      end
      assert_equal "rbac_denied", err.code
    end
  end

  def test_stream_ctrl
    explain = {}
    ctrl = { "explain" => explain }
    GandiSDK.test(nil, nil).MailboxForward(nil).stream("list", nil, { "ctrl" => ctrl }).to_a
    assert_equal ["explain"], ctrl.keys
    assert_same explain, ctrl["explain"]
    refute_empty explain
  end

  def test_unexpected
    hook = FailHook.new
    client = GandiSDK.new({ "feature" => { "test" => { "active" => true } }, "extend" => [hook] })

    err = assert_raises(StandardError) do
      client.MailboxForward(nil).list(nil, nil)
    end
    assert_match(/hook failed/, err.message)
    assert_operator hook.unexpected, :>, 0

    fired = hook.unexpected
    assert_nil client.MailboxForward(nil).list(nil, { "throw" => false })
    assert_operator hook.unexpected, :>, fired
  end

  def test_validate
    cfg = GandiConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = GandiSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.MailboxForward(nil).list({ "page" => "x" }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = mailbox_forward_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "list", "update", "remove"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "mailbox_forward." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live] && ENV["VOXGIG_GETONLY_GUARD"] == "TRUE"
      puts "LIVE STEP {\"id\":\"mailbox_forward.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /mailbox/forwards\"}"
      puts "LIVE STEP {\"id\":\"mailbox_forward.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /mailbox/forwards/{source}\"}"
      puts "LIVE STEP {\"id\":\"mailbox_forward.remove.3\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /mailbox/forwards/{source}\"}"
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    mailbox_forward_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.mailbox_forward")))
    mailbox_forward_ref01_data = nil
    if mailbox_forward_ref01_data_raw.length > 0
      mailbox_forward_ref01_data = Helpers.to_map(mailbox_forward_ref01_data_raw[0][1])
    end

    Runner.live_pace if setup[:live]
    # LIST
    mailbox_forward_ref01_ent = client.MailboxForward(nil)
    mailbox_forward_ref01_match = {}

    mailbox_forward_ref01_list_result = mailbox_forward_ref01_ent.list(mailbox_forward_ref01_match, nil)
    assert mailbox_forward_ref01_list_result.is_a?(Array)

      return
    end

    client = setup[:client]

    Runner.live_pace if setup[:live]
    # CREATE
    mailbox_forward_ref01_ent = client.MailboxForward(nil)
    mailbox_forward_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.mailbox_forward"), "mailbox_forward_ref01"))

    mailbox_forward_ref01_data_result = mailbox_forward_ref01_ent.create(mailbox_forward_ref01_data, nil)
    mailbox_forward_ref01_data = Helpers.to_map(mailbox_forward_ref01_data_result.respond_to?(:data_get) ? mailbox_forward_ref01_data_result.data_get : mailbox_forward_ref01_data_result)
    assert !mailbox_forward_ref01_data.nil?

    Runner.live_pace if setup[:live]
    # LIST
    mailbox_forward_ref01_match = {}

    mailbox_forward_ref01_list_result = mailbox_forward_ref01_ent.list(mailbox_forward_ref01_match, nil)
    assert mailbox_forward_ref01_list_result.is_a?(Array)

    Runner.live_pace if setup[:live]
    # UPDATE
    mailbox_forward_ref01_data_up0_up = {
    }

    mailbox_forward_ref01_markdef_up0_name = "message"
    mailbox_forward_ref01_markdef_up0_value = "Mark01-mailbox_forward_ref01_#{setup[:now]}"
    mailbox_forward_ref01_data_up0_up[mailbox_forward_ref01_markdef_up0_name] = mailbox_forward_ref01_markdef_up0_value

    mailbox_forward_ref01_resdata_up0_result = mailbox_forward_ref01_ent.update(mailbox_forward_ref01_data_up0_up, nil)
    mailbox_forward_ref01_resdata_up0 = Helpers.to_map(mailbox_forward_ref01_resdata_up0_result.respond_to?(:data_get) ? mailbox_forward_ref01_resdata_up0_result.data_get : mailbox_forward_ref01_resdata_up0_result)
    assert !mailbox_forward_ref01_resdata_up0.nil?
    assert_equal mailbox_forward_ref01_resdata_up0[mailbox_forward_ref01_markdef_up0_name], mailbox_forward_ref01_markdef_up0_value

    Runner.live_pace if setup[:live]

    Runner.live_pace if setup[:live]
    # LIST
    mailbox_forward_ref01_match_rt0 = {}

    mailbox_forward_ref01_list_rt0_result = mailbox_forward_ref01_ent.list(mailbox_forward_ref01_match_rt0, nil)
    assert mailbox_forward_ref01_list_rt0_result.is_a?(Array)

  end
end

def mailbox_forward_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "mailbox_forward", "MailboxForwardTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = GandiSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["mailbox_forward01", "mailbox_forward02", "mailbox_forward03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["GANDI_TEST_MAILBOX_FORWARD_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "GANDI_TEST_MAILBOX_FORWARD_ENTID" => idmap,
    "GANDI_TEST_LIVE" => "FALSE",
    "GANDI_TEST_EXPLAIN" => "FALSE",
    "GANDI_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["GANDI_TEST_MAILBOX_FORWARD_ENTID"])
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
