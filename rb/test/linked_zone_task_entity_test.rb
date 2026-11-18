# LinkedZoneTask entity test

require "minitest/autorun"
require "json"
require_relative "../Gandi_sdk"
require_relative "runner"

class LinkedZoneTaskEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = GandiSDK.test(nil, nil)
    ent = testsdk.LinkedZoneTask(nil)
    assert !ent.nil?
  end

  def test_list_entities
    seed = {
      "entity" => {
        "linked_zone_task" => {
          "l1" => { "id" => "l1" },
          "l2" => { "id" => "l2" },
        },
      },
    }
    items = GandiSDK.test(seed, nil).LinkedZoneTask(nil).list(nil, nil)
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
        "linked_zone_task" => {
          "s1" => { "id" => "s1" },
          "s2" => { "id" => "s2" },
          "s3" => { "id" => "s3" },
        },
      },
    }

    # Fallback: streaming inactive -> yields the materialised list items.
    base = GandiSDK.test(seed, nil)
    seen = base.LinkedZoneTask(nil).stream("list", nil, nil).to_a
    assert_equal 3, seen.length

    # Inbound: streaming active -> yields each item from the feature.
    cfg = GandiConfig.shared_config
    if cfg["feature"].is_a?(Hash) && cfg["feature"].key?("streaming")
      sdk = GandiSDK.test(seed, { "feature" => { "streaming" => { "active" => true } } })
      got = []
      sdk.LinkedZoneTask(nil).stream("list", nil, nil).each do |item|
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
      raise "linked_zone_task hook failed"
    end

    def PreUnexpected(ctx)
      @unexpected += 1
    end
  end

  def test_stream_error
    offline = { "net" => { "offline" => true } }
    err = assert_raises(StandardError) do
      GandiSDK.test(offline, nil).LinkedZoneTask(nil).stream("list", nil, nil).to_a
    end
    assert_match(/offline/, err.message)

    GandiSDK.test(offline, nil).LinkedZoneTask(nil)
      .stream("list", nil, { "ctrl" => { "throw" => false } }).to_a

    cfg = GandiConfig.shared_config
    if cfg["feature"].is_a?(Hash) && cfg["feature"].key?("rbac")
      denied = GandiSDK.test(nil, { "feature" => { "rbac" => { "active" => true, "deny" => true } } })
      err = assert_raises(StandardError) do
        denied.LinkedZoneTask(nil).stream("list", nil, nil).to_a
      end
      assert_equal "rbac_denied", err.code
    end
  end

  def test_stream_ctrl
    explain = {}
    ctrl = { "explain" => explain }
    GandiSDK.test(nil, nil).LinkedZoneTask(nil).stream("list", nil, { "ctrl" => ctrl }).to_a
    assert_equal ["explain"], ctrl.keys
    assert_same explain, ctrl["explain"]
    refute_empty explain
  end

  def test_unexpected
    hook = FailHook.new
    client = GandiSDK.new({ "feature" => { "test" => { "active" => true } }, "extend" => [hook] })

    err = assert_raises(StandardError) do
      client.LinkedZoneTask(nil).list(nil, nil)
    end
    assert_match(/hook failed/, err.message)
    assert_operator hook.unexpected, :>, 0

    fired = hook.unexpected
    assert_nil client.LinkedZoneTask(nil).list(nil, { "throw" => false })
    assert_operator hook.unexpected, :>, fired
  end

  def test_validate
    cfg = GandiConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = GandiSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.LinkedZoneTask(nil).list({ "page" => "x" }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = linked_zone_task_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "linked_zone_task." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    client = setup[:client]
    if setup[:live]
      _live_id = setup[:synthetic_only] ? nil : setup[:idmap]["linked_zone_task01"]
      Runner.live_pace
      Runner.live_existing(setup, LIVE_STRICT, "linked_zone_task", "id", _live_id) do
        client.LinkedZoneTask(nil).list({}, nil)
      end
    end

    # Bootstrap entity data from existing test data.
    linked_zone_task_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.linked_zone_task")))
    linked_zone_task_ref01_data = nil
    if linked_zone_task_ref01_data_raw.length > 0
      linked_zone_task_ref01_data = Helpers.to_map(linked_zone_task_ref01_data_raw[0][1])
    end

    Runner.live_pace if setup[:live]
    # LIST
    linked_zone_task_ref01_ent = client.LinkedZoneTask(nil)
    linked_zone_task_ref01_match = {}

    linked_zone_task_ref01_list_result = linked_zone_task_ref01_ent.list(linked_zone_task_ref01_match, nil)
    assert linked_zone_task_ref01_list_result.is_a?(Array)

    Runner.live_pace if setup[:live]
    # LOAD
    linked_zone_task_ref01_match_dt0 = {
      "id" => linked_zone_task_ref01_data["id"],
    }
    linked_zone_task_ref01_data_dt0_loaded = linked_zone_task_ref01_ent.load(linked_zone_task_ref01_match_dt0, nil)
    linked_zone_task_ref01_data_dt0_load_result = Helpers.to_map(linked_zone_task_ref01_data_dt0_loaded.respond_to?(:data_get) ? linked_zone_task_ref01_data_dt0_loaded.data_get : linked_zone_task_ref01_data_dt0_loaded)
    assert !linked_zone_task_ref01_data_dt0_load_result.nil?
    assert Runner.live_same_id(linked_zone_task_ref01_data_dt0_load_result["id"], linked_zone_task_ref01_data["id"])

  end
end

def linked_zone_task_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "linked_zone_task", "LinkedZoneTaskTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = GandiSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["linked_zone_task01", "linked_zone_task02", "linked_zone_task03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["GANDI_TEST_LINKED_ZONE_TASK_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "GANDI_TEST_LINKED_ZONE_TASK_ENTID" => idmap,
    "GANDI_TEST_LIVE" => "FALSE",
    "GANDI_TEST_EXPLAIN" => "FALSE",
    "GANDI_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["GANDI_TEST_LINKED_ZONE_TASK_ENTID"])
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
