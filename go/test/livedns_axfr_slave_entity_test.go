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
const livedns_axfr_slaveEntityLiveStrict = true


func TestLivednsAxfrSlaveEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.LivednsAxfrSlave(nil)
		if ent == nil {
			t.Fatal("expected non-nil LivednsAxfrSlaveEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.LivednsAxfrSlave(nil).List(map[string]any{"fqdn": 1}, nil)
		if sdkerr, ok := err.(*core.GandiError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := livedns_axfr_slaveBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "livedns_axfr_slave." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"livedns_axfr_slave.update.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /livedns/domains/{fqdn}/axfr/slaves/{ip}\"}")
		if setup.live {
			for _, _liveKey := range []string{"fqdn01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, livedns_axfr_slaveEntityLiveStrict, "Live entity test blocked: needs %s via GANDI_TEST_LIVEDNS_AXFR_SLAVE_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		// Bootstrap entity data from existing test data (no create step in flow).
		livednsAxfrSlaveRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.livedns_axfr_slave")))
		var livednsAxfrSlaveRef01Data map[string]any
		if len(livednsAxfrSlaveRef01DataRaw) > 0 {
			livednsAxfrSlaveRef01Data = core.ToMapAny(livednsAxfrSlaveRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = livednsAxfrSlaveRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		livednsAxfrSlaveRef01Ent := client.LivednsAxfrSlave(nil)
		livednsAxfrSlaveRef01Match := map[string]any{
			"fqdn": setup.idmap["fqdn01"],
		}

		livednsAxfrSlaveRef01ListResult, err := livednsAxfrSlaveRef01Ent.List(livednsAxfrSlaveRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, livednsAxfrSlaveRef01ListOk := livednsAxfrSlaveRef01ListResult.([]any)
		if !livednsAxfrSlaveRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", livednsAxfrSlaveRef01ListResult)
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"fqdn01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, livedns_axfr_slaveEntityLiveStrict, "Live entity test blocked: needs %s via GANDI_TEST_LIVEDNS_AXFR_SLAVE_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		// Bootstrap entity data from existing test data (no create step in flow).
		livednsAxfrSlaveRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.livedns_axfr_slave")))
		var livednsAxfrSlaveRef01Data map[string]any
		if len(livednsAxfrSlaveRef01DataRaw) > 0 {
			livednsAxfrSlaveRef01Data = core.ToMapAny(livednsAxfrSlaveRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = livednsAxfrSlaveRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		livednsAxfrSlaveRef01Ent := client.LivednsAxfrSlave(nil)
		livednsAxfrSlaveRef01Match := map[string]any{
			"fqdn": setup.idmap["fqdn01"],
		}

		livednsAxfrSlaveRef01ListResult, err := livednsAxfrSlaveRef01Ent.List(livednsAxfrSlaveRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, livednsAxfrSlaveRef01ListOk := livednsAxfrSlaveRef01ListResult.([]any)
		if !livednsAxfrSlaveRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", livednsAxfrSlaveRef01ListResult)
		}

	})
}

func livedns_axfr_slaveBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "livedns_axfr_slave", "LivednsAxfrSlaveTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read livedns_axfr_slave test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse livedns_axfr_slave test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"livedns_axfr_slave01", "livedns_axfr_slave02", "livedns_axfr_slave03", "domain01", "domain02", "domain03", "fqdn01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("GANDI_TEST_LIVEDNS_AXFR_SLAVE_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"GANDI_TEST_LIVEDNS_AXFR_SLAVE_ENTID": idmap,
		"GANDI_TEST_LIVE":      "FALSE",
		"GANDI_TEST_EXPLAIN":   "FALSE",
		"GANDI_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["GANDI_TEST_LIVEDNS_AXFR_SLAVE_ENTID"])
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
