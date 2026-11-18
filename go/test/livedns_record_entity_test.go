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
const livedns_recordEntityLiveStrict = true


func TestLivednsRecordEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.LivednsRecord(nil)
		if ent == nil {
			t.Fatal("expected non-nil LivednsRecordEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.LivednsRecord(nil).List(map[string]any{"fqdn": 1}, nil)
		if sdkerr, ok := err.(*core.GandiError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := livedns_recordBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "livedns_record." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"livedns_record.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /livedns/domains/{fqdn}/records/{rrset_name}/{rrset_type}\"}")
			t.Log("LIVE STEP {\"id\":\"livedns_record.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /livedns/domains/{fqdn}/records/{rrset_name}/{rrset_type}\"}")
			t.Log("LIVE STEP {\"id\":\"livedns_record.remove.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /livedns/domains/{fqdn}/records/{rrset_name}/{rrset_type}\"}")
			t.Log("LIVE STEP {\"id\":\"livedns_record.list.5\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}")
		if setup.live {
			for _, _liveKey := range []string{"fqdn01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, livedns_recordEntityLiveStrict, "Live entity test blocked: needs %s via GANDI_TEST_LIVEDNS_RECORD_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client
		if setup.live {
			var _liveId any
			if !setup.syntheticOnly {
				_liveId = setup.idmap["livedns_record01"]
			}
			livePace()
			liveExisting(t, livedns_recordEntityLiveStrict, setup.data, "livedns_record", "id", _liveId,
				func() (any, error) {
					return client.LivednsRecord(nil).List(map[string]any{"fqdn": setup.idmap["fqdn01"]}, nil)
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		livednsRecordRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.livedns_record")))
		var livednsRecordRef01Data map[string]any
		if len(livednsRecordRef01DataRaw) > 0 {
			livednsRecordRef01Data = core.ToMapAny(livednsRecordRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = livednsRecordRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		livednsRecordRef01Ent := client.LivednsRecord(nil)
		livednsRecordRef01Match := map[string]any{
			"fqdn": setup.idmap["fqdn01"],
		}

		livednsRecordRef01ListResult, err := livednsRecordRef01Ent.List(livednsRecordRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, livednsRecordRef01ListOk := livednsRecordRef01ListResult.([]any)
		if !livednsRecordRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", livednsRecordRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// LOAD
		livednsRecordRef01MatchDt0 := map[string]any{
			"id": livednsRecordRef01Data["id"],
		}
		if v := setup.idmap["fqdn"]; v != nil {
			livednsRecordRef01MatchDt0["fqdn"] = v
		} else {
			livednsRecordRef01MatchDt0["fqdn"] = setup.idmap["fqdn01"]
		}
		if v := setup.idmap["rrset_name"]; v != nil {
			livednsRecordRef01MatchDt0["rrset_name"] = v
		} else {
			livednsRecordRef01MatchDt0["rrset_name"] = setup.idmap["rrset_name01"]
		}
		livednsRecordRef01DataDt0Loaded, err := livednsRecordRef01Ent.Load(livednsRecordRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		livednsRecordRef01DataDt0LoadResult := core.ToMapAny(entityData(livednsRecordRef01DataDt0Loaded))
		if livednsRecordRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !setup.live && !liveSameId(livednsRecordRef01DataDt0LoadResult["id"], livednsRecordRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"fqdn01", "rrset_name01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, livedns_recordEntityLiveStrict, "Live entity test blocked: needs %s via GANDI_TEST_LIVEDNS_RECORD_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		livednsRecordRef01Ent := client.LivednsRecord(nil)
		livednsRecordRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "livedns_record"}), "livedns_record_ref01"))
		livednsRecordRef01Data["fqdn"] = setup.idmap["fqdn01"]
		livednsRecordRef01Data["rrset_name"] = setup.idmap["rrset_name01"]

		livednsRecordRef01DataResult, err := livednsRecordRef01Ent.Create(livednsRecordRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		livednsRecordRef01Data = core.ToMapAny(entityData(livednsRecordRef01DataResult))
		if livednsRecordRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if livednsRecordRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LIST
		livednsRecordRef01Match := map[string]any{
			"fqdn": setup.idmap["fqdn01"],
		}

		livednsRecordRef01ListResult, err := livednsRecordRef01Ent.List(livednsRecordRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		livednsRecordRef01List, livednsRecordRef01ListOk := livednsRecordRef01ListResult.([]any)
		if !livednsRecordRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", livednsRecordRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(livednsRecordRef01List), map[string]any{"id": livednsRecordRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		livednsRecordRef01DataUp0Up := map[string]any{
			"id": livednsRecordRef01Data["id"],
			"fqdn": setup.idmap["fqdn"],
		}

		livednsRecordRef01MarkdefUp0Name := "message"
		livednsRecordRef01MarkdefUp0Value := fmt.Sprintf("Mark01-livedns_record_ref01_%d", setup.now)
		livednsRecordRef01DataUp0Up[livednsRecordRef01MarkdefUp0Name] = livednsRecordRef01MarkdefUp0Value

		livednsRecordRef01ResdataUp0Result, err := livednsRecordRef01Ent.Update(livednsRecordRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		livednsRecordRef01ResdataUp0 := core.ToMapAny(entityData(livednsRecordRef01ResdataUp0Result))
		if livednsRecordRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !setup.live && !liveSameId(livednsRecordRef01ResdataUp0["id"], livednsRecordRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}
		if livednsRecordRef01ResdataUp0[livednsRecordRef01MarkdefUp0Name] != livednsRecordRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", livednsRecordRef01MarkdefUp0Name, livednsRecordRef01ResdataUp0[livednsRecordRef01MarkdefUp0Name])
		}

		if setup.live {
			livePace()
		}
		// LOAD
		livednsRecordRef01MatchDt0 := map[string]any{
			"id": livednsRecordRef01Data["id"],
		}
		if v := setup.idmap["fqdn"]; v != nil {
			livednsRecordRef01MatchDt0["fqdn"] = v
		} else {
			livednsRecordRef01MatchDt0["fqdn"] = setup.idmap["fqdn01"]
		}
		if v := setup.idmap["rrset_name"]; v != nil {
			livednsRecordRef01MatchDt0["rrset_name"] = v
		} else {
			livednsRecordRef01MatchDt0["rrset_name"] = setup.idmap["rrset_name01"]
		}
		livednsRecordRef01DataDt0Loaded, err := livednsRecordRef01Ent.Load(livednsRecordRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		livednsRecordRef01DataDt0LoadResult := core.ToMapAny(entityData(livednsRecordRef01DataDt0Loaded))
		if livednsRecordRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !setup.live && !liveSameId(livednsRecordRef01DataDt0LoadResult["id"], livednsRecordRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		if setup.live {
			livePace()
		}
		// REMOVE
		livednsRecordRef01MatchRm0 := map[string]any{
			"id": livednsRecordRef01Data["id"],
		}
		if v := setup.idmap["fqdn"]; v != nil {
			livednsRecordRef01MatchRm0["fqdn"] = v
		} else {
			livednsRecordRef01MatchRm0["fqdn"] = setup.idmap["fqdn01"]
		}
		_, err = livednsRecordRef01Ent.Remove(livednsRecordRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		if setup.live {
			livePace()
		}
		// LIST
		livednsRecordRef01MatchRt0 := map[string]any{
			"fqdn": setup.idmap["fqdn01"],
		}

		livednsRecordRef01ListRt0Result, err := livednsRecordRef01Ent.List(livednsRecordRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		livednsRecordRef01ListRt0, livednsRecordRef01ListRt0Ok := livednsRecordRef01ListRt0Result.([]any)
		if !livednsRecordRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", livednsRecordRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(livednsRecordRef01ListRt0), map[string]any{"id": livednsRecordRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func livedns_recordBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "livedns_record", "LivednsRecordTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read livedns_record test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse livedns_record test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"livedns_record01", "livedns_record02", "livedns_record03", "domain01", "domain02", "domain03", "fqdn01", "rrset_name01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("GANDI_TEST_LIVEDNS_RECORD_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"GANDI_TEST_LIVEDNS_RECORD_ENTID": idmap,
		"GANDI_TEST_LIVE":      "FALSE",
		"GANDI_TEST_EXPLAIN":   "FALSE",
		"GANDI_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["GANDI_TEST_LIVEDNS_RECORD_ENTID"])
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
