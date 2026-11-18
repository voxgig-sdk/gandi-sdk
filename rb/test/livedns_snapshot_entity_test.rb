# LivednsSnapshot entity test

require "minitest/autorun"
require "json"
require_relative "../Gandi_sdk"
require_relative "runner"

class LivednsSnapshotEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = GandiSDK.test(nil, nil)
    ent = testsdk.LivednsSnapshot(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = GandiConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = GandiSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.LivednsSnapshot(nil).list({ "fqdn" => 1 }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = livedns_snapshot_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "list", "update", "load", "remove"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "livedns_snapshot." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live] && ENV["VOXGIG_GETONLY_GUARD"] == "TRUE"
      puts "LIVE STEP {\"id\":\"livedns_snapshot.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /livedns/domains/{fqdn}/snapshots\"}"
      puts "LIVE STEP {\"id\":\"livedns_snapshot.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PATCH /livedns/domains/{fqdn}/snapshots/{id}\"}"
      puts "LIVE STEP {\"id\":\"livedns_snapshot.remove.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /livedns/domains/{fqdn}/snapshots/{id}\"}"
      puts "LIVE STEP {\"id\":\"livedns_snapshot.list.5\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}"
    if setup[:live]
      ["fqdn01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via GANDI_TEST_LIVEDNS_SNAPSHOT_ENTID")
        end
      end
    end
    client = setup[:client]
    if setup[:live]
      _live_id = setup[:synthetic_only] ? nil : setup[:idmap]["livedns_snapshot01"]
      Runner.live_pace
      Runner.live_existing(setup, LIVE_STRICT, "livedns_snapshot", "id", _live_id) do
        client.LivednsSnapshot(nil).list({"fqdn" => setup[:idmap]["fqdn01"]}, nil)
      end
    end

    # Bootstrap entity data from existing test data.
    livedns_snapshot_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.livedns_snapshot")))
    livedns_snapshot_ref01_data = nil
    if livedns_snapshot_ref01_data_raw.length > 0
      livedns_snapshot_ref01_data = Helpers.to_map(livedns_snapshot_ref01_data_raw[0][1])
    end

    Runner.live_pace if setup[:live]
    # LIST
    livedns_snapshot_ref01_ent = client.LivednsSnapshot(nil)
    livedns_snapshot_ref01_match = {
      "fqdn" => setup[:idmap]["fqdn01"],
    }

    livedns_snapshot_ref01_list_result = livedns_snapshot_ref01_ent.list(livedns_snapshot_ref01_match, nil)
    assert livedns_snapshot_ref01_list_result.is_a?(Array)

    Runner.live_pace if setup[:live]
    # LOAD
    livedns_snapshot_ref01_match_dt0 = {
      "id" => livedns_snapshot_ref01_data["id"],
    }
    livedns_snapshot_ref01_match_dt0["fqdn"] = setup[:idmap]["fqdn"] || setup[:idmap]["fqdn01"]
    livedns_snapshot_ref01_data_dt0_loaded = livedns_snapshot_ref01_ent.load(livedns_snapshot_ref01_match_dt0, nil)
    livedns_snapshot_ref01_data_dt0_load_result = Helpers.to_map(livedns_snapshot_ref01_data_dt0_loaded.respond_to?(:data_get) ? livedns_snapshot_ref01_data_dt0_loaded.data_get : livedns_snapshot_ref01_data_dt0_loaded)
    assert !livedns_snapshot_ref01_data_dt0_load_result.nil?
    assert Runner.live_same_id(livedns_snapshot_ref01_data_dt0_load_result["id"], livedns_snapshot_ref01_data["id"])

      return
    end

    if setup[:live]
      ["fqdn01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via GANDI_TEST_LIVEDNS_SNAPSHOT_ENTID")
        end
      end
    end
    client = setup[:client]

    Runner.live_pace if setup[:live]
    # CREATE
    livedns_snapshot_ref01_ent = client.LivednsSnapshot(nil)
    livedns_snapshot_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.livedns_snapshot"), "livedns_snapshot_ref01"))
    livedns_snapshot_ref01_data["fqdn"] = setup[:idmap]["fqdn01"]

    livedns_snapshot_ref01_data_result = livedns_snapshot_ref01_ent.create(livedns_snapshot_ref01_data, nil)
    livedns_snapshot_ref01_data = Helpers.to_map(livedns_snapshot_ref01_data_result.respond_to?(:data_get) ? livedns_snapshot_ref01_data_result.data_get : livedns_snapshot_ref01_data_result)
    assert !livedns_snapshot_ref01_data.nil?
    assert !livedns_snapshot_ref01_data["id"].nil?

    Runner.live_pace if setup[:live]
    # LIST
    livedns_snapshot_ref01_match = {
      "fqdn" => setup[:idmap]["fqdn01"],
    }

    livedns_snapshot_ref01_list_result = livedns_snapshot_ref01_ent.list(livedns_snapshot_ref01_match, nil)
    assert livedns_snapshot_ref01_list_result.is_a?(Array)

    found_item = Vs.select(
      Runner.entity_list_to_data(livedns_snapshot_ref01_list_result),
      { "id" => livedns_snapshot_ref01_data["id"] })
    assert !Vs.isempty(found_item)

    Runner.live_pace if setup[:live]
    # UPDATE
    livedns_snapshot_ref01_data_up0_up = {
      "id" => livedns_snapshot_ref01_data["id"],
      "fqdn" => setup[:idmap]["fqdn"],
    }

    livedns_snapshot_ref01_markdef_up0_name = "created_at"
    livedns_snapshot_ref01_markdef_up0_value = "Mark01-livedns_snapshot_ref01_#{setup[:now]}"
    livedns_snapshot_ref01_data_up0_up[livedns_snapshot_ref01_markdef_up0_name] = livedns_snapshot_ref01_markdef_up0_value

    livedns_snapshot_ref01_resdata_up0_result = livedns_snapshot_ref01_ent.update(livedns_snapshot_ref01_data_up0_up, nil)
    livedns_snapshot_ref01_resdata_up0 = Helpers.to_map(livedns_snapshot_ref01_resdata_up0_result.respond_to?(:data_get) ? livedns_snapshot_ref01_resdata_up0_result.data_get : livedns_snapshot_ref01_resdata_up0_result)
    assert !livedns_snapshot_ref01_resdata_up0.nil?
    assert Runner.live_same_id(livedns_snapshot_ref01_resdata_up0["id"], livedns_snapshot_ref01_data_up0_up["id"])
    assert_equal livedns_snapshot_ref01_resdata_up0[livedns_snapshot_ref01_markdef_up0_name], livedns_snapshot_ref01_markdef_up0_value

    Runner.live_pace if setup[:live]
    # LOAD
    livedns_snapshot_ref01_match_dt0 = {
      "id" => livedns_snapshot_ref01_data["id"],
    }
    livedns_snapshot_ref01_match_dt0["fqdn"] = setup[:idmap]["fqdn"] || setup[:idmap]["fqdn01"]
    livedns_snapshot_ref01_data_dt0_loaded = livedns_snapshot_ref01_ent.load(livedns_snapshot_ref01_match_dt0, nil)
    livedns_snapshot_ref01_data_dt0_load_result = Helpers.to_map(livedns_snapshot_ref01_data_dt0_loaded.respond_to?(:data_get) ? livedns_snapshot_ref01_data_dt0_loaded.data_get : livedns_snapshot_ref01_data_dt0_loaded)
    assert !livedns_snapshot_ref01_data_dt0_load_result.nil?
    assert Runner.live_same_id(livedns_snapshot_ref01_data_dt0_load_result["id"], livedns_snapshot_ref01_data["id"])

    Runner.live_pace if setup[:live]
    # REMOVE
    livedns_snapshot_ref01_match_rm0 = {
      "id" => livedns_snapshot_ref01_data["id"],
    }
    livedns_snapshot_ref01_match_rm0["fqdn"] = setup[:idmap]["fqdn"] || setup[:idmap]["fqdn01"]
    livedns_snapshot_ref01_ent.remove(livedns_snapshot_ref01_match_rm0, nil)

    Runner.live_pace if setup[:live]
    # LIST
    livedns_snapshot_ref01_match_rt0 = {
      "fqdn" => setup[:idmap]["fqdn01"],
    }

    livedns_snapshot_ref01_list_rt0_result = livedns_snapshot_ref01_ent.list(livedns_snapshot_ref01_match_rt0, nil)
    assert livedns_snapshot_ref01_list_rt0_result.is_a?(Array)

    not_found_item = Vs.select(
      Runner.entity_list_to_data(livedns_snapshot_ref01_list_rt0_result),
      { "id" => livedns_snapshot_ref01_data["id"] })
    assert Vs.isempty(not_found_item)

  end
end

def livedns_snapshot_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "livedns_snapshot", "LivednsSnapshotTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = GandiSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["livedns_snapshot01", "livedns_snapshot02", "livedns_snapshot03", "domain01", "domain02", "domain03", "fqdn01"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["GANDI_TEST_LIVEDNS_SNAPSHOT_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "GANDI_TEST_LIVEDNS_SNAPSHOT_ENTID" => idmap,
    "GANDI_TEST_LIVE" => "FALSE",
    "GANDI_TEST_EXPLAIN" => "FALSE",
    "GANDI_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["GANDI_TEST_LIVEDNS_SNAPSHOT_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end
  if idmap_resolved["fqdn"].nil?
    idmap_resolved["fqdn"] = idmap_resolved["fqdn01"]
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
