# LivednsRecord direct test

require "minitest/autorun"
require "json"
require_relative "../Gandi_sdk"
require_relative "runner"

class LivednsRecordDirectTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def live_ok(result)
    status = Helpers.to_int(result["status"])
    result["err"].nil? && result["ok"] && status >= 200 && status < 300
  end

  def test_direct_list_livedns_record
    setup = livedns_record_direct_setup([
      { "id" => "direct01" },
      { "id" => "direct02" },
    ])
    _should_skip, _reason = Runner.is_control_skipped("direct", "direct-list-livedns_record", setup[:live] ? "live" : "unit")
    if _should_skip
      skip(_reason || "skipped via sdk-test-control.json")
      return
    end
    if setup[:live]
      ["fqdn01", "rrset_name01"].each do |_live_key|
        if setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live test blocked: needs #{_live_key} via GANDI_TEST_LIVEDNS_RECORD_ENTID")
        end
      end
    end
    Runner.live_pace if setup[:live]
    client = setup[:client]

    params = {}
    query = {}
    params["fqdn"] = setup[:live] ? setup[:idmap]["fqdn01"] : "direct01"
    params["rrset_name"] = setup[:live] ? setup[:idmap]["rrset_name01"] : "direct02"

    result = client.direct({
      "path" => "livedns/domains/{fqdn}/records/{rrset_name}",
      "method" => "GET",
      "params" => params,
      "query" => query,
    })
    if setup[:live]
      unless live_ok(result)
        Runner.live_miss(LIVE_STRICT, "Live list failed: " + Runner.live_describe(result))
      end
      if Runner.live_list(result["data"]).nil?
        Runner.live_miss(LIVE_STRICT, "Live list returned no list: " + Runner.live_describe(result))
      end
      assert Runner.live_list(result["data"]).is_a?(Array)
    else
      assert_nil result["err"]
      assert result["ok"]
      assert_equal 200, Helpers.to_int(result["status"])
      assert result["data"].is_a?(Array)
      assert_equal 2, result["data"].length
      assert_equal 1, setup[:calls].length
    end
  end

  def test_direct_load_livedns_record
    setup = livedns_record_direct_setup({ "id" => "direct01" })
    _should_skip, _reason = Runner.is_control_skipped("direct", "direct-load-livedns_record", setup[:live] ? "live" : "unit")
    if _should_skip
      skip(_reason || "skipped via sdk-test-control.json")
      return
    end
    if setup[:live]
      ["fqdn01", "rrset_name01"].each do |_live_key|
        if setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live test blocked: needs #{_live_key} via GANDI_TEST_LIVEDNS_RECORD_ENTID")
        end
      end
    end
    Runner.live_pace if setup[:live]
    client = setup[:client]

    params = {}
    query = {}
    if setup[:live]
      list_result = client.direct({
        "path" => "livedns/domains/{fqdn}/records/{rrset_name}",
        "method" => "GET",
        "params" => {"fqdn" => setup[:idmap]["fqdn01"], "rrset_name" => setup[:idmap]["rrset_name01"]},
      })
      unless live_ok(list_result)
        Runner.live_miss(LIVE_STRICT, "Live list discovery failed: " + Runner.live_describe(list_result))
      end
      records = Runner.live_list(list_result["data"])
      if records.nil?
        Runner.live_miss(LIVE_STRICT, "Live list discovery returned no list: " + Runner.live_describe(list_result))
      end
      if records.empty?
        Runner.live_empty("The account has no livedns_record record to load")
      end
      first = records[0].is_a?(Hash) ? records[0] : {}
      found = first["rrset_type"]
      if found.nil?
        Runner.live_miss(LIVE_STRICT, "Live load blocked: discovery returned no usable identity")
      end
      params["rrset_type"] = found
      params["fqdn"] = setup[:idmap]["fqdn01"]
      params["rrset_name"] = setup[:idmap]["rrset_name01"]
    else
      params["fqdn"] = "direct01"
      params["rrset_name"] = "direct02"
      params["rrset_type"] = "direct03"
    end

    result = client.direct({
      "path" => "livedns/domains/{fqdn}/records/{rrset_name}/{rrset_type}",
      "method" => "GET",
      "params" => params,
      "query" => query,
    })
    if setup[:live]
      unless live_ok(result)
        Runner.live_miss(LIVE_STRICT, "Live load failed: " + Runner.live_describe(result))
      end
      if result["data"].nil?
        Runner.live_miss(LIVE_STRICT, "Live load returned no data: " + Runner.live_describe(result))
      end
      assert !result["data"].nil?
    else
      assert_nil result["err"]
      assert result["ok"]
      assert_equal 200, Helpers.to_int(result["status"])
      assert !result["data"].nil?
      if result["data"].is_a?(Hash)
        assert_equal "direct01", result["data"]["id"]
      end
      assert_equal 1, setup[:calls].length
    end
  end

end


def livedns_record_direct_setup(mockres)
  Runner.load_env_local

  calls = []

  env = Runner.env_override({
    "GANDI_TEST_LIVEDNS_RECORD_ENTID" => {},
    "GANDI_TEST_LIVE" => "FALSE",
    "GANDI_APIKEY" => "",
  })

  live = env["GANDI_TEST_LIVE"] == "TRUE"

  if live
    # Merged so the generated fields win: sdk-test-control.json's
    # test.client.options adds to the live client, it does not redirect it.
    merged_opts = Runner.live_client_options.merge({
      "apikey" => env["GANDI_APIKEY"],
    })
    client = GandiSDK.new(merged_opts)
    idmap = env["GANDI_TEST_LIVEDNS_RECORD_ENTID"]
    # A path parameter's example stands in for an id *_ENTID does not give.
    idmap = { "rrset_type01" => "A" }
      .merge(idmap.is_a?(Hash) ? idmap : {})
    return {
      client: client,
      calls: calls,
      live: true,
      idmap: idmap.is_a?(Hash) ? idmap : {},
    }
  end

  mock_fetch = ->(url, init) {
    calls.push({ "url" => url, "init" => init })
    return {
      "status" => 200,
      "statusText" => "OK",
      "headers" => {},
      "json" => ->() {
        if !mockres.nil?
          return mockres
        end
        return { "id" => "direct01" }
      },
      "body" => "mock",
    }, nil
  }

  client = GandiSDK.new({
    "base" => "http://localhost:8080",
    "system" => {
      "fetch" => mock_fetch,
    },
  })

  {
    client: client,
    calls: calls,
    live: false,
    idmap: {},
  }
end
