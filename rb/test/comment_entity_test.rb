# Comment entity test

require "minitest/autorun"
require "json"
require_relative "../Gandi_sdk"
require_relative "runner"

class CommentEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = GandiSDK.test(nil, nil)
    ent = testsdk.Comment(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = GandiConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = GandiSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.Comment(nil).load({ "entity_id" => 1 }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = comment_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "load", "remove"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "comment." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live] && ENV["VOXGIG_GETONLY_GUARD"] == "TRUE"
      puts "LIVE STEP {\"id\":\"comment.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /comment/comments/{id}\"}"
      puts "LIVE STEP {\"id\":\"comment.load.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: reads a record only comment.create.0 gives\"}"
      puts "LIVE STEP {\"id\":\"comment.remove.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /comment/comments/{id}\"}"
      skip("Live coverage incomplete: comment.create.0 excluded (GET-only live run: needs POST /comment/comments/{id}); comment.load.1 excluded (GET-only live run: reads a record only comment.create.0 gives); comment.remove.2 excluded (GET-only live run: needs DELETE /comment/comments/{id})")
    end

    if setup[:live]
      ["entity01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via GANDI_TEST_COMMENT_ENTID")
        end
      end
    end
    client = setup[:client]

    Runner.live_pace if setup[:live]
    # CREATE
    comment_ref01_ent = client.Comment(nil)
    comment_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.comment"), "comment_ref01"))
    comment_ref01_data["entity_id"] = setup[:idmap]["entity01"]

    comment_ref01_data_result = comment_ref01_ent.create(comment_ref01_data, nil)
    comment_ref01_data = Helpers.to_map(comment_ref01_data_result.respond_to?(:data_get) ? comment_ref01_data_result.data_get : comment_ref01_data_result)
    assert !comment_ref01_data.nil?
    assert !comment_ref01_data["id"].nil?

    Runner.live_pace if setup[:live]
    # LOAD
    comment_ref01_match_dt0 = {
      "id" => comment_ref01_data["id"],
    }
    comment_ref01_data_dt0_loaded = comment_ref01_ent.load(comment_ref01_match_dt0, nil)
    comment_ref01_data_dt0_load_result = Helpers.to_map(comment_ref01_data_dt0_loaded.respond_to?(:data_get) ? comment_ref01_data_dt0_loaded.data_get : comment_ref01_data_dt0_loaded)
    assert !comment_ref01_data_dt0_load_result.nil?
    assert Runner.live_same_id(comment_ref01_data_dt0_load_result["id"], comment_ref01_data["id"])

    Runner.live_pace if setup[:live]
    # REMOVE
    comment_ref01_match_rm0 = {
      "id" => comment_ref01_data["id"],
    }
    comment_ref01_ent.remove(comment_ref01_match_rm0, nil)

  end
end

def comment_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "comment", "CommentTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = GandiSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["comment01", "comment02", "comment03", "entity01"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["GANDI_TEST_COMMENT_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "GANDI_TEST_COMMENT_ENTID" => idmap,
    "GANDI_TEST_LIVE" => "FALSE",
    "GANDI_TEST_EXPLAIN" => "FALSE",
    "GANDI_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["GANDI_TEST_COMMENT_ENTID"])
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
