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
const linked_zoneEntityLiveStrict = true


type linked_zoneFailHook struct {
	sdk.BaseFeature
	unexpected int
}

func (f *linked_zoneFailHook) PreSpec(ctx *sdk.Context) {
	panic("linked_zone hook failed")
}

func (f *linked_zoneFailHook) PreUnexpected(ctx *sdk.Context) {
	f.unexpected++
}

func TestLinkedZoneEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.LinkedZone(nil)
		if ent == nil {
			t.Fatal("expected non-nil LinkedZoneEntity")
		}
	})

	// Feature #4: the entity Stream(action, ...) method runs the op pipeline and
	// returns a channel over result items. With the streaming feature active it
	// yields the feature's incremental output; otherwise it falls back to the
	// materialised list so Stream always yields.
	t.Run("stream", func(t *testing.T) {
		seed := map[string]any{
			"entity": map[string]any{
				"linked_zone": map[string]any{
					"s1": map[string]any{"id": "s1"},
					"s2": map[string]any{"id": "s2"},
					"s3": map[string]any{"id": "s3"},
				},
			},
		}

		// Fallback: streaming inactive -> yields the materialised list items.
		base := sdk.TestSDK(seed, nil)
		var seen []any
		for si := range base.LinkedZone(nil).Stream("list", nil, nil) {
			if si.Err != nil {
				t.Fatalf("stream failed: %v", si.Err)
			}
			seen = append(seen, si.Item)
		}
		if len(seen) != 3 {
			t.Fatalf("expected 3 streamed items, got %d", len(seen))
		}

		// Inbound: streaming active -> yields each item from the feature iterator.
		hasStreaming := false
		if fm, ok := core.SharedConfig()["feature"].(map[string]any); ok {
			_, hasStreaming = fm["streaming"]
		}
		if hasStreaming {
			streamSdk := sdk.TestSDK(seed, map[string]any{
				"feature": map[string]any{"streaming": map[string]any{"active": true}},
			})
			var got []any
			for si := range streamSdk.LinkedZone(nil).Stream("list", nil, nil) {
				if si.Err != nil {
					t.Fatalf("stream failed: %v", si.Err)
				}
				if sub, ok := si.Item.([]any); ok {
					got = append(got, sub...)
				} else {
					got = append(got, si.Item)
				}
			}
			if len(got) != 3 {
				t.Fatalf("expected 3 items via streaming feature, got %d", len(got))
			}
		}
	})

	t.Run("stream-error", func(t *testing.T) {
		offline := map[string]any{"net": map[string]any{"offline": true}}
		var streamerr error
		for si := range sdk.TestSDK(offline, nil).LinkedZone(nil).Stream("list", nil, nil) {
			if si.Err != nil {
				streamerr = si.Err
			}
		}
		if nil == streamerr || !strings.Contains(streamerr.Error(), "offline") {
			t.Fatalf("expected the transport failure as a stream value, got %v", streamerr)
		}

		quiet := map[string]any{"ctrl": map[string]any{"throw": false}}
		for si := range sdk.TestSDK(offline, nil).LinkedZone(nil).Stream("list", nil, quiet) {
			if si.Err != nil {
				t.Fatalf("throw false: expected no error value, got %v", si.Err)
			}
		}

		if fhHasFeature("rbac") {
			denied := sdk.TestSDK(nil, map[string]any{
				"feature": map[string]any{"rbac": map[string]any{"active": true, "deny": true}},
			})
			var denyerr error
			for si := range denied.LinkedZone(nil).Stream("list", nil, nil) {
				if si.Err != nil {
					denyerr = si.Err
				}
			}
			if sdkerr, ok := denyerr.(*core.GandiError); !ok || "rbac_denied" != sdkerr.Code {
				t.Fatalf("expected the rbac denial as a stream value, got %v", denyerr)
			}
		}
	})

	t.Run("stream-ctrl", func(t *testing.T) {
		explain := map[string]any{}
		ctrl := map[string]any{"explain": explain}
		for range sdk.TestSDK(nil, nil).LinkedZone(nil).Stream("list", nil, map[string]any{"ctrl": ctrl}) {
		}
		if _, has := ctrl["stream"]; has || 1 != len(ctrl) {
			t.Fatalf("the stream changed the caller's ctrl")
		}
		if 0 == len(explain) {
			t.Fatalf("the caller's explain record was not filled")
		}
	})

	t.Run("unexpected", func(t *testing.T) {
		hook := &linked_zoneFailHook{
			BaseFeature: sdk.BaseFeature{Version: "0.0.1", Name: "failhook", Active: true}}
		client := sdk.TestSDK(nil, map[string]any{"extend": []any{hook}})

		_, err := client.LinkedZone(nil).List(nil, nil)
		if nil == err || !strings.Contains(err.Error(), "hook failed") {
			t.Fatalf("expected the hook's failure, got %v", err)
		}
		if 0 == hook.unexpected {
			t.Fatalf("PreUnexpected did not fire")
		}

		fired := hook.unexpected
		if _, err := client.LinkedZone(nil).List(nil, map[string]any{"throw": false}); nil != err {
			t.Fatalf("throw false: expected no error, got %v", err)
		}
		if fired == hook.unexpected {
			t.Fatalf("throw false: PreUnexpected did not fire")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.LinkedZone(nil).List(map[string]any{"page": "x"}, nil)
		if sdkerr, ok := err.(*core.GandiError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := linked_zoneBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "linked_zone." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"linked_zone.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /linkedzone/zones\"}")
			t.Log("LIVE STEP {\"id\":\"linked_zone.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PATCH /linkedzone/zones/{zone_id}\"}")
			t.Log("LIVE STEP {\"id\":\"linked_zone.remove.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /linkedzone/zones/{zone_id}\"}")
			t.Log("LIVE STEP {\"id\":\"linked_zone.list.5\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}")
		client := setup.client
		_ = client
		if setup.live {
			var _liveId any
			if !setup.syntheticOnly {
				_liveId = setup.idmap["linked_zone01"]
			}
			livePace()
			liveExisting(t, linked_zoneEntityLiveStrict, setup.data, "linked_zone", "id", _liveId,
				func() (any, error) {
					return client.LinkedZone(nil).List(map[string]any{}, nil)
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		linkedZoneRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.linked_zone")))
		var linkedZoneRef01Data map[string]any
		if len(linkedZoneRef01DataRaw) > 0 {
			linkedZoneRef01Data = core.ToMapAny(linkedZoneRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = linkedZoneRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		linkedZoneRef01Ent := client.LinkedZone(nil)
		linkedZoneRef01Match := map[string]any{}

		linkedZoneRef01ListResult, err := linkedZoneRef01Ent.List(linkedZoneRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, linkedZoneRef01ListOk := linkedZoneRef01ListResult.([]any)
		if !linkedZoneRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", linkedZoneRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// LOAD
		linkedZoneRef01MatchDt0 := map[string]any{
			"id": linkedZoneRef01Data["id"],
		}
		linkedZoneRef01DataDt0Loaded, err := linkedZoneRef01Ent.Load(linkedZoneRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		linkedZoneRef01DataDt0LoadResult := core.ToMapAny(entityData(linkedZoneRef01DataDt0Loaded))
		if linkedZoneRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(linkedZoneRef01DataDt0LoadResult["id"], linkedZoneRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		return
		}

		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		linkedZoneRef01Ent := client.LinkedZone(nil)
		linkedZoneRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "linked_zone"}), "linked_zone_ref01"))

		linkedZoneRef01DataResult, err := linkedZoneRef01Ent.Create(linkedZoneRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		linkedZoneRef01Data = core.ToMapAny(entityData(linkedZoneRef01DataResult))
		if linkedZoneRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if linkedZoneRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LIST
		linkedZoneRef01Match := map[string]any{}

		linkedZoneRef01ListResult, err := linkedZoneRef01Ent.List(linkedZoneRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		linkedZoneRef01List, linkedZoneRef01ListOk := linkedZoneRef01ListResult.([]any)
		if !linkedZoneRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", linkedZoneRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(linkedZoneRef01List), map[string]any{"id": linkedZoneRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		linkedZoneRef01DataUp0Up := map[string]any{
			"id": linkedZoneRef01Data["id"],
		}

		linkedZoneRef01MarkdefUp0Name := "created_at"
		linkedZoneRef01MarkdefUp0Value := fmt.Sprintf("Mark01-linked_zone_ref01_%d", setup.now)
		linkedZoneRef01DataUp0Up[linkedZoneRef01MarkdefUp0Name] = linkedZoneRef01MarkdefUp0Value

		linkedZoneRef01ResdataUp0Result, err := linkedZoneRef01Ent.Update(linkedZoneRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		linkedZoneRef01ResdataUp0 := core.ToMapAny(entityData(linkedZoneRef01ResdataUp0Result))
		if linkedZoneRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !liveSameId(linkedZoneRef01ResdataUp0["id"], linkedZoneRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}
		if linkedZoneRef01ResdataUp0[linkedZoneRef01MarkdefUp0Name] != linkedZoneRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", linkedZoneRef01MarkdefUp0Name, linkedZoneRef01ResdataUp0[linkedZoneRef01MarkdefUp0Name])
		}

		if setup.live {
			livePace()
		}
		// LOAD
		linkedZoneRef01MatchDt0 := map[string]any{
			"id": linkedZoneRef01Data["id"],
		}
		linkedZoneRef01DataDt0Loaded, err := linkedZoneRef01Ent.Load(linkedZoneRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		linkedZoneRef01DataDt0LoadResult := core.ToMapAny(entityData(linkedZoneRef01DataDt0Loaded))
		if linkedZoneRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(linkedZoneRef01DataDt0LoadResult["id"], linkedZoneRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		if setup.live {
			livePace()
		}
		// REMOVE
		linkedZoneRef01MatchRm0 := map[string]any{
			"id": linkedZoneRef01Data["id"],
		}
		_, err = linkedZoneRef01Ent.Remove(linkedZoneRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		if setup.live {
			livePace()
		}
		// LIST
		linkedZoneRef01MatchRt0 := map[string]any{}

		linkedZoneRef01ListRt0Result, err := linkedZoneRef01Ent.List(linkedZoneRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		linkedZoneRef01ListRt0, linkedZoneRef01ListRt0Ok := linkedZoneRef01ListRt0Result.([]any)
		if !linkedZoneRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", linkedZoneRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(linkedZoneRef01ListRt0), map[string]any{"id": linkedZoneRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func linked_zoneBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "linked_zone", "LinkedZoneTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read linked_zone test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse linked_zone test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"linked_zone01", "linked_zone02", "linked_zone03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("GANDI_TEST_LINKED_ZONE_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"GANDI_TEST_LINKED_ZONE_ENTID": idmap,
		"GANDI_TEST_LIVE":      "FALSE",
		"GANDI_TEST_EXPLAIN":   "FALSE",
		"GANDI_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["GANDI_TEST_LINKED_ZONE_ENTID"])
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
