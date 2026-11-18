package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/gandi-sdk/go"
	"github.com/voxgig-sdk/gandi-sdk/go/core"

	vs "github.com/voxgig-sdk/gandi-sdk/go/utility/struct"
)

// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const acme_accountEntityLiveStrict = true


func TestAcmeAccountEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.AcmeAccount(nil)
		if ent == nil {
			t.Fatal("expected non-nil AcmeAccountEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.AcmeAccount(nil).List(map[string]any{"subscription_id": 1, "sharing_id": "x"}, nil)
		if sdkerr, ok := err.(*core.GandiError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := acme_accountBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "acme_account." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live {
			for _, _liveKey := range []string{"subscription01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, acme_accountEntityLiveStrict, "Live entity test blocked: needs %s via GANDI_TEST_ACME_ACCOUNT_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client
		if setup.live {
			var _liveId any
			if !setup.syntheticOnly {
				_liveId = setup.idmap["acme_account01"]
			}
			livePace()
			liveExisting(t, acme_accountEntityLiveStrict, setup.data, "acme_account", "id", _liveId,
				func() (any, error) {
					return client.AcmeAccount(nil).List(map[string]any{"subscription_id": setup.idmap["subscription01"]}, nil)
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		acmeAccountRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.acme_account")))
		var acmeAccountRef01Data map[string]any
		if len(acmeAccountRef01DataRaw) > 0 {
			acmeAccountRef01Data = core.ToMapAny(acmeAccountRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = acmeAccountRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		acmeAccountRef01Ent := client.AcmeAccount(nil)
		acmeAccountRef01Match := map[string]any{
			"subscription_id": setup.idmap["subscription01"],
		}

		acmeAccountRef01ListResult, err := acmeAccountRef01Ent.List(acmeAccountRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, acmeAccountRef01ListOk := acmeAccountRef01ListResult.([]any)
		if !acmeAccountRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", acmeAccountRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// LOAD
		acmeAccountRef01MatchDt0 := map[string]any{
			"id": acmeAccountRef01Data["id"],
		}
		switch v := acmeAccountRef01Data["subscription_id"].(type) {
		case string, bool, float64, int, int64:
			acmeAccountRef01MatchDt0["subscription_id"] = v
		default:
			if v := setup.idmap["subscription_id"]; v != nil {
				acmeAccountRef01MatchDt0["subscription_id"] = v
			} else {
				acmeAccountRef01MatchDt0["subscription_id"] = setup.idmap["subscription01"]
			}
		}
		acmeAccountRef01DataDt0Loaded, err := acmeAccountRef01Ent.Load(acmeAccountRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		acmeAccountRef01DataDt0LoadResult := core.ToMapAny(entityData(acmeAccountRef01DataDt0Loaded))
		if acmeAccountRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(acmeAccountRef01DataDt0LoadResult["id"], acmeAccountRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

	})
}

func acme_accountBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "acme_account", "AcmeAccountTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read acme_account test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse acme_account test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"acme_account01", "acme_account02", "acme_account03", "subscription01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("GANDI_TEST_ACME_ACCOUNT_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"GANDI_TEST_ACME_ACCOUNT_ENTID": idmap,
		"GANDI_TEST_LIVE":      "FALSE",
		"GANDI_TEST_EXPLAIN":   "FALSE",
		"GANDI_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["GANDI_TEST_ACME_ACCOUNT_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["GANDI_TEST_LIVE"] == "TRUE" {
		// An empty map, not a nil one: Merge returns nil when its last entry
		// is nil, and BasicSetup is normally called with no extras - so a
		// bare nil silently discarded the apikey and server values below.
		extraOpts := extra
		if extraOpts == nil {
			extraOpts = map[string]any{}
		}

		mergedOpts := vs.Merge([]any{
			// liveClientOptions() FIRST, so the generated fields below win:
			// sdk-test-control.json's test.client.options adds to the live
			// client, it does not redirect it.
			liveClientOptions(),
			map[string]any{
				"apikey": env["GANDI_APIKEY"],
			},
			extraOpts,
		})
		client = sdk.NewGandiSDK(core.ToMapAny(mergedOpts))
	}

	live := env["GANDI_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["GANDI_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
