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
const livedns_tsig_keyEntityLiveStrict = true


type livedns_tsig_keyFailHook struct {
	sdk.BaseFeature
	unexpected int
}

func (f *livedns_tsig_keyFailHook) PreSpec(ctx *sdk.Context) {
	panic("livedns_tsig_key hook failed")
}

func (f *livedns_tsig_keyFailHook) PreUnexpected(ctx *sdk.Context) {
	f.unexpected++
}

func TestLivednsTsigKeyEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.LivednsTsigKey(nil)
		if ent == nil {
			t.Fatal("expected non-nil LivednsTsigKeyEntity")
		}
	})

	// Feature #4: the entity Stream(action, ...) method runs the op pipeline and
	// returns a channel over result items. With the streaming feature active it
	// yields the feature's incremental output; otherwise it falls back to the
	// materialised list so Stream always yields.
	t.Run("stream", func(t *testing.T) {
		seed := map[string]any{
			"entity": map[string]any{
				"livedns_tsig_key": map[string]any{
					"s1": map[string]any{"id": "s1"},
					"s2": map[string]any{"id": "s2"},
					"s3": map[string]any{"id": "s3"},
				},
			},
		}

		// Fallback: streaming inactive -> yields the materialised list items.
		base := sdk.TestSDK(seed, nil)
		var seen []any
		for si := range base.LivednsTsigKey(nil).Stream("list", nil, nil) {
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
			for si := range streamSdk.LivednsTsigKey(nil).Stream("list", nil, nil) {
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
		for si := range sdk.TestSDK(offline, nil).LivednsTsigKey(nil).Stream("list", nil, nil) {
			if si.Err != nil {
				streamerr = si.Err
			}
		}
		if nil == streamerr || !strings.Contains(streamerr.Error(), "offline") {
			t.Fatalf("expected the transport failure as a stream value, got %v", streamerr)
		}

		quiet := map[string]any{"ctrl": map[string]any{"throw": false}}
		for si := range sdk.TestSDK(offline, nil).LivednsTsigKey(nil).Stream("list", nil, quiet) {
			if si.Err != nil {
				t.Fatalf("throw false: expected no error value, got %v", si.Err)
			}
		}

		if fhHasFeature("rbac") {
			denied := sdk.TestSDK(nil, map[string]any{
				"feature": map[string]any{"rbac": map[string]any{"active": true, "deny": true}},
			})
			var denyerr error
			for si := range denied.LivednsTsigKey(nil).Stream("list", nil, nil) {
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
		for range sdk.TestSDK(nil, nil).LivednsTsigKey(nil).Stream("list", nil, map[string]any{"ctrl": ctrl}) {
		}
		if _, has := ctrl["stream"]; has || 1 != len(ctrl) {
			t.Fatalf("the stream changed the caller's ctrl")
		}
		if 0 == len(explain) {
			t.Fatalf("the caller's explain record was not filled")
		}
	})

	t.Run("unexpected", func(t *testing.T) {
		hook := &livedns_tsig_keyFailHook{
			BaseFeature: sdk.BaseFeature{Version: "0.0.1", Name: "failhook", Active: true}}
		client := sdk.TestSDK(nil, map[string]any{"extend": []any{hook}})

		_, err := client.LivednsTsigKey(nil).List(nil, nil)
		if nil == err || !strings.Contains(err.Error(), "hook failed") {
			t.Fatalf("expected the hook's failure, got %v", err)
		}
		if 0 == hook.unexpected {
			t.Fatalf("PreUnexpected did not fire")
		}

		fired := hook.unexpected
		if _, err := client.LivednsTsigKey(nil).List(nil, map[string]any{"throw": false}); nil != err {
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
		_, err := client.LivednsTsigKey(nil).List(map[string]any{"sharing_id": 1}, nil)
		if sdkerr, ok := err.(*core.GandiError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := livedns_tsig_keyBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "livedns_tsig_key." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"livedns_tsig_key.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /livedns/axfr/tsig\"}")
		client := setup.client
		_ = client
		if setup.live {
			var _liveId any
			if !setup.syntheticOnly {
				_liveId = setup.idmap["livedns_tsig_key01"]
			}
			livePace()
			liveExisting(t, livedns_tsig_keyEntityLiveStrict, setup.data, "livedns_tsig_key", "id", _liveId,
				func() (any, error) {
					return client.LivednsTsigKey(nil).List(map[string]any{}, nil)
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		livednsTsigKeyRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.livedns_tsig_key")))
		var livednsTsigKeyRef01Data map[string]any
		if len(livednsTsigKeyRef01DataRaw) > 0 {
			livednsTsigKeyRef01Data = core.ToMapAny(livednsTsigKeyRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = livednsTsigKeyRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		livednsTsigKeyRef01Ent := client.LivednsTsigKey(nil)
		livednsTsigKeyRef01Match := map[string]any{}

		livednsTsigKeyRef01ListResult, err := livednsTsigKeyRef01Ent.List(livednsTsigKeyRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, livednsTsigKeyRef01ListOk := livednsTsigKeyRef01ListResult.([]any)
		if !livednsTsigKeyRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", livednsTsigKeyRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// LOAD
		livednsTsigKeyRef01MatchDt0 := map[string]any{
			"id": livednsTsigKeyRef01Data["id"],
		}
		livednsTsigKeyRef01DataDt0Loaded, err := livednsTsigKeyRef01Ent.Load(livednsTsigKeyRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		livednsTsigKeyRef01DataDt0LoadResult := core.ToMapAny(entityData(livednsTsigKeyRef01DataDt0Loaded))
		if livednsTsigKeyRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(livednsTsigKeyRef01DataDt0LoadResult["id"], livednsTsigKeyRef01Data["id"]) {
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
		livednsTsigKeyRef01Ent := client.LivednsTsigKey(nil)
		livednsTsigKeyRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "livedns_tsig_key"}), "livedns_tsig_key_ref01"))

		livednsTsigKeyRef01DataResult, err := livednsTsigKeyRef01Ent.Create(livednsTsigKeyRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		livednsTsigKeyRef01Data = core.ToMapAny(entityData(livednsTsigKeyRef01DataResult))
		if livednsTsigKeyRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if livednsTsigKeyRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LIST
		livednsTsigKeyRef01Match := map[string]any{}

		livednsTsigKeyRef01ListResult, err := livednsTsigKeyRef01Ent.List(livednsTsigKeyRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		livednsTsigKeyRef01List, livednsTsigKeyRef01ListOk := livednsTsigKeyRef01ListResult.([]any)
		if !livednsTsigKeyRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", livednsTsigKeyRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(livednsTsigKeyRef01List), map[string]any{"id": livednsTsigKeyRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		if setup.live {
			livePace()
		}
		// LOAD
		livednsTsigKeyRef01MatchDt0 := map[string]any{
			"id": livednsTsigKeyRef01Data["id"],
		}
		livednsTsigKeyRef01DataDt0Loaded, err := livednsTsigKeyRef01Ent.Load(livednsTsigKeyRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		livednsTsigKeyRef01DataDt0LoadResult := core.ToMapAny(entityData(livednsTsigKeyRef01DataDt0Loaded))
		if livednsTsigKeyRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(livednsTsigKeyRef01DataDt0LoadResult["id"], livednsTsigKeyRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

	})
}

func livedns_tsig_keyBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "livedns_tsig_key", "LivednsTsigKeyTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read livedns_tsig_key test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse livedns_tsig_key test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"livedns_tsig_key01", "livedns_tsig_key02", "livedns_tsig_key03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("GANDI_TEST_LIVEDNS_TSIG_KEY_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"GANDI_TEST_LIVEDNS_TSIG_KEY_ENTID": idmap,
		"GANDI_TEST_LIVE":      "FALSE",
		"GANDI_TEST_EXPLAIN":   "FALSE",
		"GANDI_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["GANDI_TEST_LIVEDNS_TSIG_KEY_ENTID"])
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
