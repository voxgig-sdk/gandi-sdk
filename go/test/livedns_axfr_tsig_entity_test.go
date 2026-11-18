package sdktest

import (
	"encoding/json"
	"fmt"
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
const livedns_axfr_tsigEntityLiveStrict = true


func TestLivednsAxfrTsigEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.LivednsAxfrTsig(nil)
		if ent == nil {
			t.Fatal("expected non-nil LivednsAxfrTsigEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.LivednsAxfrTsig(nil).List(map[string]any{"fqdn": 1}, nil)
		if sdkerr, ok := err.(*core.GandiError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := livedns_axfr_tsigBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list", "update"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "livedns_axfr_tsig." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"livedns_axfr_tsig.update.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /livedns/domains/{fqdn}/axfr/tsig/{id}\"}")
		if setup.live {
			for _, _liveKey := range []string{"fqdn01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, livedns_axfr_tsigEntityLiveStrict, "Live entity test blocked: needs %s via GANDI_TEST_LIVEDNS_AXFR_TSIG_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		// Bootstrap entity data from existing test data (no create step in flow).
		livednsAxfrTsigRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.livedns_axfr_tsig")))
		var livednsAxfrTsigRef01Data map[string]any
		if len(livednsAxfrTsigRef01DataRaw) > 0 {
			livednsAxfrTsigRef01Data = core.ToMapAny(livednsAxfrTsigRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = livednsAxfrTsigRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		livednsAxfrTsigRef01Ent := client.LivednsAxfrTsig(nil)
		livednsAxfrTsigRef01Match := map[string]any{
			"fqdn": setup.idmap["fqdn01"],
		}

		livednsAxfrTsigRef01ListResult, err := livednsAxfrTsigRef01Ent.List(livednsAxfrTsigRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, livednsAxfrTsigRef01ListOk := livednsAxfrTsigRef01ListResult.([]any)
		if !livednsAxfrTsigRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", livednsAxfrTsigRef01ListResult)
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"fqdn01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, livedns_axfr_tsigEntityLiveStrict, "Live entity test blocked: needs %s via GANDI_TEST_LIVEDNS_AXFR_TSIG_ENTID", _liveKey)
				}
			}
		}
		if setup.live {
			liveMiss(t, livedns_axfr_tsigEntityLiveStrict, "Live entity test blocked: %s", "the flow updates a livedns_axfr_tsig record it did not create")
		}
		client := setup.client
		_ = client

		// Bootstrap entity data from existing test data (no create step in flow).
		livednsAxfrTsigRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.livedns_axfr_tsig")))
		var livednsAxfrTsigRef01Data map[string]any
		if len(livednsAxfrTsigRef01DataRaw) > 0 {
			livednsAxfrTsigRef01Data = core.ToMapAny(livednsAxfrTsigRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = livednsAxfrTsigRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		livednsAxfrTsigRef01Ent := client.LivednsAxfrTsig(nil)
		livednsAxfrTsigRef01Match := map[string]any{
			"fqdn": setup.idmap["fqdn01"],
		}

		livednsAxfrTsigRef01ListResult, err := livednsAxfrTsigRef01Ent.List(livednsAxfrTsigRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, livednsAxfrTsigRef01ListOk := livednsAxfrTsigRef01ListResult.([]any)
		if !livednsAxfrTsigRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", livednsAxfrTsigRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		livednsAxfrTsigRef01DataUp0Up := map[string]any{
			"id": livednsAxfrTsigRef01Data["id"],
			"fqdn": setup.idmap["fqdn"],
		}

		livednsAxfrTsigRef01MarkdefUp0Name := "href"
		livednsAxfrTsigRef01MarkdefUp0Value := fmt.Sprintf("Mark01-livedns_axfr_tsig_ref01_%d", setup.now)
		livednsAxfrTsigRef01DataUp0Up[livednsAxfrTsigRef01MarkdefUp0Name] = livednsAxfrTsigRef01MarkdefUp0Value

		livednsAxfrTsigRef01ResdataUp0Result, err := livednsAxfrTsigRef01Ent.Update(livednsAxfrTsigRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		livednsAxfrTsigRef01ResdataUp0 := core.ToMapAny(entityData(livednsAxfrTsigRef01ResdataUp0Result))
		if livednsAxfrTsigRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !liveSameId(livednsAxfrTsigRef01ResdataUp0["id"], livednsAxfrTsigRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}
		if livednsAxfrTsigRef01ResdataUp0[livednsAxfrTsigRef01MarkdefUp0Name] != livednsAxfrTsigRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", livednsAxfrTsigRef01MarkdefUp0Name, livednsAxfrTsigRef01ResdataUp0[livednsAxfrTsigRef01MarkdefUp0Name])
		}

	})
}

func livedns_axfr_tsigBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "livedns_axfr_tsig", "LivednsAxfrTsigTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read livedns_axfr_tsig test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse livedns_axfr_tsig test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"livedns_axfr_tsig01", "livedns_axfr_tsig02", "livedns_axfr_tsig03", "domain01", "domain02", "domain03", "fqdn01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("GANDI_TEST_LIVEDNS_AXFR_TSIG_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"GANDI_TEST_LIVEDNS_AXFR_TSIG_ENTID": idmap,
		"GANDI_TEST_LIVE":      "FALSE",
		"GANDI_TEST_EXPLAIN":   "FALSE",
		"GANDI_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["GANDI_TEST_LIVEDNS_AXFR_TSIG_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}
	// Add fqdn alias for update test.
	if idmapResolved["fqdn"] == nil {
		idmapResolved["fqdn"] = idmapResolved["fqdn01"]
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
