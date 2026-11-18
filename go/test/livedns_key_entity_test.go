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
const livedns_keyEntityLiveStrict = true


func TestLivednsKeyEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.LivednsKey(nil)
		if ent == nil {
			t.Fatal("expected non-nil LivednsKeyEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.LivednsKey(nil).List(map[string]any{"fqdn": 1}, nil)
		if sdkerr, ok := err.(*core.GandiError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := livedns_keyBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "livedns_key." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"livedns_key.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /livedns/domains/{fqdn}/keys\"}")
			t.Log("LIVE STEP {\"id\":\"livedns_key.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PATCH /livedns/domains/{fqdn}/keys/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"livedns_key.remove.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /livedns/domains/{fqdn}/keys/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"livedns_key.list.5\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}")
		if setup.live {
			for _, _liveKey := range []string{"fqdn01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, livedns_keyEntityLiveStrict, "Live entity test blocked: needs %s via GANDI_TEST_LIVEDNS_KEY_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client
		if setup.live {
			var _liveId any
			if !setup.syntheticOnly {
				_liveId = setup.idmap["livedns_key01"]
			}
			livePace()
			liveExisting(t, livedns_keyEntityLiveStrict, setup.data, "livedns_key", "id", _liveId,
				func() (any, error) {
					return client.LivednsKey(nil).List(map[string]any{"fqdn": setup.idmap["fqdn01"]}, nil)
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		livednsKeyRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.livedns_key")))
		var livednsKeyRef01Data map[string]any
		if len(livednsKeyRef01DataRaw) > 0 {
			livednsKeyRef01Data = core.ToMapAny(livednsKeyRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = livednsKeyRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		livednsKeyRef01Ent := client.LivednsKey(nil)
		livednsKeyRef01Match := map[string]any{
			"fqdn": setup.idmap["fqdn01"],
		}

		livednsKeyRef01ListResult, err := livednsKeyRef01Ent.List(livednsKeyRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, livednsKeyRef01ListOk := livednsKeyRef01ListResult.([]any)
		if !livednsKeyRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", livednsKeyRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// LOAD
		livednsKeyRef01MatchDt0 := map[string]any{
			"id": livednsKeyRef01Data["id"],
		}
		switch v := livednsKeyRef01Data["fqdn"].(type) {
		case string, bool, float64, int, int64:
			livednsKeyRef01MatchDt0["fqdn"] = v
		default:
			if v := setup.idmap["fqdn"]; v != nil {
				livednsKeyRef01MatchDt0["fqdn"] = v
			} else {
				livednsKeyRef01MatchDt0["fqdn"] = setup.idmap["fqdn01"]
			}
		}
		livednsKeyRef01DataDt0Loaded, err := livednsKeyRef01Ent.Load(livednsKeyRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		livednsKeyRef01DataDt0LoadResult := core.ToMapAny(entityData(livednsKeyRef01DataDt0Loaded))
		if livednsKeyRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(livednsKeyRef01DataDt0LoadResult["id"], livednsKeyRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"fqdn01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, livedns_keyEntityLiveStrict, "Live entity test blocked: needs %s via GANDI_TEST_LIVEDNS_KEY_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		livednsKeyRef01Ent := client.LivednsKey(nil)
		livednsKeyRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "livedns_key"}), "livedns_key_ref01"))
		livednsKeyRef01Data["fqdn"] = setup.idmap["fqdn01"]

		livednsKeyRef01DataResult, err := livednsKeyRef01Ent.Create(livednsKeyRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		livednsKeyRef01Data = core.ToMapAny(entityData(livednsKeyRef01DataResult))
		if livednsKeyRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if livednsKeyRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LIST
		livednsKeyRef01Match := map[string]any{
			"fqdn": setup.idmap["fqdn01"],
		}

		livednsKeyRef01ListResult, err := livednsKeyRef01Ent.List(livednsKeyRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		livednsKeyRef01List, livednsKeyRef01ListOk := livednsKeyRef01ListResult.([]any)
		if !livednsKeyRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", livednsKeyRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(livednsKeyRef01List), map[string]any{"id": livednsKeyRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		livednsKeyRef01DataUp0Up := map[string]any{
			"id": livednsKeyRef01Data["id"],
			"fqdn": setup.idmap["fqdn"],
		}

		livednsKeyRef01MarkdefUp0Name := "algorithm_name"
		livednsKeyRef01MarkdefUp0Value := fmt.Sprintf("Mark01-livedns_key_ref01_%d", setup.now)
		livednsKeyRef01DataUp0Up[livednsKeyRef01MarkdefUp0Name] = livednsKeyRef01MarkdefUp0Value

		livednsKeyRef01ResdataUp0Result, err := livednsKeyRef01Ent.Update(livednsKeyRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		livednsKeyRef01ResdataUp0 := core.ToMapAny(entityData(livednsKeyRef01ResdataUp0Result))
		if livednsKeyRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !liveSameId(livednsKeyRef01ResdataUp0["id"], livednsKeyRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}
		if livednsKeyRef01ResdataUp0[livednsKeyRef01MarkdefUp0Name] != livednsKeyRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", livednsKeyRef01MarkdefUp0Name, livednsKeyRef01ResdataUp0[livednsKeyRef01MarkdefUp0Name])
		}

		if setup.live {
			livePace()
		}
		// LOAD
		livednsKeyRef01MatchDt0 := map[string]any{
			"id": livednsKeyRef01Data["id"],
		}
		switch v := livednsKeyRef01Data["fqdn"].(type) {
		case string, bool, float64, int, int64:
			livednsKeyRef01MatchDt0["fqdn"] = v
		default:
			if v := setup.idmap["fqdn"]; v != nil {
				livednsKeyRef01MatchDt0["fqdn"] = v
			} else {
				livednsKeyRef01MatchDt0["fqdn"] = setup.idmap["fqdn01"]
			}
		}
		livednsKeyRef01DataDt0Loaded, err := livednsKeyRef01Ent.Load(livednsKeyRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		livednsKeyRef01DataDt0LoadResult := core.ToMapAny(entityData(livednsKeyRef01DataDt0Loaded))
		if livednsKeyRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(livednsKeyRef01DataDt0LoadResult["id"], livednsKeyRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		if setup.live {
			livePace()
		}
		// REMOVE
		livednsKeyRef01MatchRm0 := map[string]any{
			"id": livednsKeyRef01Data["id"],
		}
		if v := setup.idmap["fqdn"]; v != nil {
			livednsKeyRef01MatchRm0["fqdn"] = v
		} else {
			livednsKeyRef01MatchRm0["fqdn"] = setup.idmap["fqdn01"]
		}
		_, err = livednsKeyRef01Ent.Remove(livednsKeyRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		if setup.live {
			livePace()
		}
		// LIST
		livednsKeyRef01MatchRt0 := map[string]any{
			"fqdn": setup.idmap["fqdn01"],
		}

		livednsKeyRef01ListRt0Result, err := livednsKeyRef01Ent.List(livednsKeyRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		livednsKeyRef01ListRt0, livednsKeyRef01ListRt0Ok := livednsKeyRef01ListRt0Result.([]any)
		if !livednsKeyRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", livednsKeyRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(livednsKeyRef01ListRt0), map[string]any{"id": livednsKeyRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func livedns_keyBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "livedns_key", "LivednsKeyTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read livedns_key test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse livedns_key test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"livedns_key01", "livedns_key02", "livedns_key03", "domain01", "domain02", "domain03", "fqdn01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("GANDI_TEST_LIVEDNS_KEY_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"GANDI_TEST_LIVEDNS_KEY_ENTID": idmap,
		"GANDI_TEST_LIVE":      "FALSE",
		"GANDI_TEST_EXPLAIN":   "FALSE",
		"GANDI_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["GANDI_TEST_LIVEDNS_KEY_ENTID"])
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
