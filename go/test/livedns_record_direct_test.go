package sdktest

import (
	"encoding/json"
	"os"
	"strings"
	"testing"

	sdk "github.com/voxgig-sdk/gandi-sdk/go"
	"github.com/voxgig-sdk/gandi-sdk/go/core"
)

// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const livedns_recordDirectLiveStrict = true

func TestLivednsRecordDirect(t *testing.T) {
	t.Run("direct-list-livedns_record", func(t *testing.T) {
		setup := livedns_recordDirectSetup([]any{
			map[string]any{"id": "direct01"},
			map[string]any{"id": "direct02"},
		})
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		if _shouldSkip, _reason := isControlSkipped("direct", "direct-list-livedns_record", _mode); _shouldSkip {
			if _reason == "" {
				_reason = "skipped via sdk-test-control.json"
			}
			t.Skip(_reason)
			return
		}
		if setup.live {
			for _, _liveKey := range []string{"fqdn01", "rrset_name01"} {
				if v := setup.idmap[_liveKey]; v == nil {
					liveMiss(t, livedns_recordDirectLiveStrict, "Live test blocked: needs %s via GANDI_TEST_LIVEDNS_RECORD_ENTID", _liveKey)
					return
				}
			}
		}
		if setup.live {
			livePace()
		}
		client := setup.client

		params := map[string]any{}
		query := map[string]any{}
		if setup.live {
			params["fqdn"] = setup.idmap["fqdn01"]
		} else {
			params["fqdn"] = "direct01"
		}
		if setup.live {
			params["rrset_name"] = setup.idmap["rrset_name01"]
		} else {
			params["rrset_name"] = "direct02"
		}

		result, err := client.Direct(map[string]any{
			"path":   "livedns/domains/{fqdn}/records/{rrset_name}",
			"method": "GET",
			"params": params,
			"query":  query,
		})
		if setup.live {
			if err != nil {
				liveMiss(t, livedns_recordDirectLiveStrict, "Live list failed: %v", err)
			}
			if status := core.ToInt(result["status"]); result["ok"] != true || status < 200 || status >= 300 {
				liveMiss(t, livedns_recordDirectLiveStrict, "Live list failed: %s", liveDescribe(result))
			}
			if _, ok := liveList(result["data"]); !ok {
				liveMiss(t, livedns_recordDirectLiveStrict, "Live list returned no list: %s", liveDescribe(result))
			}
		} else {
			if err != nil {
				t.Fatalf("direct failed: %v", err)
			}
			if result["ok"] != true {
				t.Fatalf("expected ok to be true, got %v", result["ok"])
			}
			if core.ToInt(result["status"]) != 200 {
				t.Fatalf("expected status 200, got %v", result["status"])
			}
		}

		if !setup.live {
			if dataList, ok := result["data"].([]any); ok {
				if len(dataList) != 2 {
					t.Fatalf("expected 2 items, got %d", len(dataList))
				}
			} else {
				t.Fatalf("expected data to be an array, got %T", result["data"])
			}

			if len(*setup.calls) != 1 {
				t.Fatalf("expected 1 call, got %d", len(*setup.calls))
			}
			call := (*setup.calls)[0]
			if initMap, ok := call["init"].(map[string]any); ok {
				if initMap["method"] != "GET" {
					t.Fatalf("expected method GET, got %v", initMap["method"])
				}
			}
			if url, ok := call["url"].(string); ok {
				if !strings.Contains(url, "direct01") {
					t.Fatalf("expected url to contain direct01, got %v", url)
				}
				if !strings.Contains(url, "direct02") {
					t.Fatalf("expected url to contain direct02, got %v", url)
				}
			}
		}
	})

	t.Run("direct-load-livedns_record", func(t *testing.T) {
		setup := livedns_recordDirectSetup(map[string]any{"id": "direct01"})
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		if _shouldSkip, _reason := isControlSkipped("direct", "direct-load-livedns_record", _mode); _shouldSkip {
			if _reason == "" {
				_reason = "skipped via sdk-test-control.json"
			}
			t.Skip(_reason)
			return
		}
		if setup.live {
			for _, _liveKey := range []string{"fqdn01", "rrset_name01"} {
				if v := setup.idmap[_liveKey]; v == nil {
					liveMiss(t, livedns_recordDirectLiveStrict, "Live test blocked: needs %s via GANDI_TEST_LIVEDNS_RECORD_ENTID", _liveKey)
					return
				}
			}
		}
		if setup.live {
			livePace()
		}
		client := setup.client

		params := map[string]any{}
		query := map[string]any{}
		if setup.live {
			listParams := map[string]any{}
			listParams["fqdn"] = setup.idmap["fqdn01"]
			listParams["rrset_name"] = setup.idmap["rrset_name01"]
			listResult, listErr := client.Direct(map[string]any{
				"path":   "livedns/domains/{fqdn}/records/{rrset_name}",
				"method": "GET",
				"params": listParams,
			})
			if listErr != nil {
				liveMiss(t, livedns_recordDirectLiveStrict, "Live list discovery failed: %v", listErr)
			}
			if listResult["ok"] != true {
				liveMiss(t, livedns_recordDirectLiveStrict, "Live list discovery failed: %s", liveDescribe(listResult))
			}
			listData, listOk := liveList(listResult["data"])
			if !listOk {
				liveMiss(t, livedns_recordDirectLiveStrict, "Live list discovery returned no list: %s", liveDescribe(listResult))
			}
			if len(listData) == 0 {
				liveEmpty(t, "The account has no livedns_record record to load")
			}
			firstEnt := core.ToMapAny(listData[0])
			if firstEnt["rrset_type"] == nil {
				liveMiss(t, livedns_recordDirectLiveStrict, "Live load blocked: discovery returned no usable identity")
			}
			params["rrset_type"] = firstEnt["rrset_type"]
			params["fqdn"] = setup.idmap["fqdn01"]
			params["rrset_name"] = setup.idmap["rrset_name01"]
		} else {
			params["fqdn"] = "direct01"
			params["rrset_name"] = "direct02"
			params["rrset_type"] = "direct03"
		}

		result, err := client.Direct(map[string]any{
			"path":   "livedns/domains/{fqdn}/records/{rrset_name}/{rrset_type}",
			"method": "GET",
			"params": params,
			"query":  query,
		})
		if setup.live {
			if err != nil {
				liveMiss(t, livedns_recordDirectLiveStrict, "Live load failed: %v", err)
			}
			if status := core.ToInt(result["status"]); result["ok"] != true || status < 200 || status >= 300 {
				liveMiss(t, livedns_recordDirectLiveStrict, "Live load failed: %s", liveDescribe(result))
			}
			if result["data"] == nil {
				liveMiss(t, livedns_recordDirectLiveStrict, "Live load returned no data: %s", liveDescribe(result))
			}
		} else {
			if err != nil {
				t.Fatalf("direct failed: %v", err)
			}
			if result["ok"] != true {
				t.Fatalf("expected ok to be true, got %v", result["ok"])
			}
			if core.ToInt(result["status"]) != 200 {
				t.Fatalf("expected status 200, got %v", result["status"])
			}
			if result["data"] == nil {
				t.Fatal("expected data to be non-nil")
			}
		}

		if !setup.live {
			if dataMap, ok := result["data"].(map[string]any); ok {
				if dataMap["id"] != "direct01" {
					t.Fatalf("expected data.id to be direct01, got %v", dataMap["id"])
				}
			}

			if len(*setup.calls) != 1 {
				t.Fatalf("expected 1 call, got %d", len(*setup.calls))
			}
			call := (*setup.calls)[0]
			if initMap, ok := call["init"].(map[string]any); ok {
				if initMap["method"] != "GET" {
					t.Fatalf("expected method GET, got %v", initMap["method"])
				}
			}
			if url, ok := call["url"].(string); ok {
				if !strings.Contains(url, "direct01") {
					t.Fatalf("expected url to contain direct01, got %v", url)
				}
				if !strings.Contains(url, "direct02") {
					t.Fatalf("expected url to contain direct02, got %v", url)
				}
				if !strings.Contains(url, "direct03") {
					t.Fatalf("expected url to contain direct03, got %v", url)
				}
			}
		}
	})

}

type livedns_recordDirectSetupResult struct {
	client *sdk.GandiSDK
	calls  *[]map[string]any
	live   bool
	idmap  map[string]any
}

func livedns_recordDirectSetup(mockres any) *livedns_recordDirectSetupResult {
	loadEnvLocal()

	calls := &[]map[string]any{}

	env := envOverride(map[string]any{
		"GANDI_TEST_LIVEDNS_RECORD_ENTID": map[string]any{},
		"GANDI_TEST_LIVE":    "FALSE",
		"GANDI_APIKEY":       "",
	})

	live := env["GANDI_TEST_LIVE"] == "TRUE"

	if live {
		// sdk-test-control.json's test.client.options seeds the live
		// client; the generated fields below overwrite anything they name.
		mergedOpts := map[string]any{}
		for k, v := range liveClientOptions() {
			mergedOpts[k] = v
		}
		for k, v := range map[string]any{
			"apikey": env["GANDI_APIKEY"],
		} {
			mergedOpts[k] = v
		}
		client := sdk.NewGandiSDK(mergedOpts)

		idmap := map[string]any{}
		if entidRaw, ok := env["GANDI_TEST_LIVEDNS_RECORD_ENTID"]; ok {
			if entidStr, ok := entidRaw.(string); ok && strings.HasPrefix(entidStr, "{") {
				json.Unmarshal([]byte(entidStr), &idmap)
			} else if entidMap, ok := entidRaw.(map[string]any); ok {
				idmap = entidMap
			}
		}
		// A path parameter's example stands in for an id *_ENTID does not give.
		for k, v := range map[string]any{"rrset_type01": "A"} {
			if idmap[k] == nil {
				idmap[k] = v
			}
		}

		return &livedns_recordDirectSetupResult{client: client, calls: calls, live: true, idmap: idmap}
	}

	mockFetch := func(url string, init map[string]any) (map[string]any, error) {
		*calls = append(*calls, map[string]any{"url": url, "init": init})
		return map[string]any{
			"status":     200,
			"statusText": "OK",
			"headers":    map[string]any{},
			"json": (func() any)(func() any {
				if mockres != nil {
					return mockres
				}
				return map[string]any{"id": "direct01"}
			}),
		}, nil
	}

	client := sdk.NewGandiSDK(map[string]any{
		"base": "http://localhost:8080",
		"system": map[string]any{
			"fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
		},
	})

	return &livedns_recordDirectSetupResult{client: client, calls: calls, live: false, idmap: map[string]any{}}
}

var _ = os.Getenv
var _ = json.Unmarshal
