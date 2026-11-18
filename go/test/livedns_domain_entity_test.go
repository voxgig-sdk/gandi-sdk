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
const livedns_domainEntityLiveStrict = true


type livedns_domainFailHook struct {
	sdk.BaseFeature
	unexpected int
}

func (f *livedns_domainFailHook) PreSpec(ctx *sdk.Context) {
	panic("livedns_domain hook failed")
}

func (f *livedns_domainFailHook) PreUnexpected(ctx *sdk.Context) {
	f.unexpected++
}

func TestLivednsDomainEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.LivednsDomain(nil)
		if ent == nil {
			t.Fatal("expected non-nil LivednsDomainEntity")
		}
	})

	// Feature #4: the entity Stream(action, ...) method runs the op pipeline and
	// returns a channel over result items. With the streaming feature active it
	// yields the feature's incremental output; otherwise it falls back to the
	// materialised list so Stream always yields.
	t.Run("stream", func(t *testing.T) {
		seed := map[string]any{
			"entity": map[string]any{
				"livedns_domain": map[string]any{
					"s1": map[string]any{"id": "s1"},
					"s2": map[string]any{"id": "s2"},
					"s3": map[string]any{"id": "s3"},
				},
			},
		}

		// Fallback: streaming inactive -> yields the materialised list items.
		base := sdk.TestSDK(seed, nil)
		var seen []any
		for si := range base.LivednsDomain(nil).Stream("list", nil, nil) {
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
			for si := range streamSdk.LivednsDomain(nil).Stream("list", nil, nil) {
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
		for si := range sdk.TestSDK(offline, nil).LivednsDomain(nil).Stream("list", nil, nil) {
			if si.Err != nil {
				streamerr = si.Err
			}
		}
		if nil == streamerr || !strings.Contains(streamerr.Error(), "offline") {
			t.Fatalf("expected the transport failure as a stream value, got %v", streamerr)
		}

		quiet := map[string]any{"ctrl": map[string]any{"throw": false}}
		for si := range sdk.TestSDK(offline, nil).LivednsDomain(nil).Stream("list", nil, quiet) {
			if si.Err != nil {
				t.Fatalf("throw false: expected no error value, got %v", si.Err)
			}
		}

		if fhHasFeature("rbac") {
			denied := sdk.TestSDK(nil, map[string]any{
				"feature": map[string]any{"rbac": map[string]any{"active": true, "deny": true}},
			})
			var denyerr error
			for si := range denied.LivednsDomain(nil).Stream("list", nil, nil) {
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
		for range sdk.TestSDK(nil, nil).LivednsDomain(nil).Stream("list", nil, map[string]any{"ctrl": ctrl}) {
		}
		if _, has := ctrl["stream"]; has || 1 != len(ctrl) {
			t.Fatalf("the stream changed the caller's ctrl")
		}
		if 0 == len(explain) {
			t.Fatalf("the caller's explain record was not filled")
		}
	})

	t.Run("unexpected", func(t *testing.T) {
		hook := &livedns_domainFailHook{
			BaseFeature: sdk.BaseFeature{Version: "0.0.1", Name: "failhook", Active: true}}
		client := sdk.TestSDK(nil, map[string]any{"extend": []any{hook}})

		_, err := client.LivednsDomain(nil).List(nil, nil)
		if nil == err || !strings.Contains(err.Error(), "hook failed") {
			t.Fatalf("expected the hook's failure, got %v", err)
		}
		if 0 == hook.unexpected {
			t.Fatalf("PreUnexpected did not fire")
		}

		fired := hook.unexpected
		if _, err := client.LivednsDomain(nil).List(nil, map[string]any{"throw": false}); nil != err {
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
		_, err := client.LivednsDomain(nil).List(map[string]any{"page": "x"}, nil)
		if sdkerr, ok := err.(*core.GandiError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := livedns_domainBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "livedns_domain." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"livedns_domain.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /livedns/domains\"}")
			t.Log("LIVE STEP {\"id\":\"livedns_domain.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PATCH /livedns/domains/{fqdn}\"}")
			t.Log("LIVE STEP {\"id\":\"livedns_domain.remove.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /livedns/domains/{fqdn}/records\"}")
		client := setup.client
		_ = client

		// Bootstrap entity data from existing test data (no create step in flow).
		livednsDomainRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.livedns_domain")))
		var livednsDomainRef01Data map[string]any
		if len(livednsDomainRef01DataRaw) > 0 {
			livednsDomainRef01Data = core.ToMapAny(livednsDomainRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = livednsDomainRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		livednsDomainRef01Ent := client.LivednsDomain(nil)
		livednsDomainRef01Match := map[string]any{}

		livednsDomainRef01ListResult, err := livednsDomainRef01Ent.List(livednsDomainRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, livednsDomainRef01ListOk := livednsDomainRef01ListResult.([]any)
		if !livednsDomainRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", livednsDomainRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// LOAD
		livednsDomainRef01MatchDt0 := map[string]any{}
		livednsDomainRef01DataDt0Loaded, err := livednsDomainRef01Ent.Load(livednsDomainRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if livednsDomainRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

		return
		}

		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		livednsDomainRef01Ent := client.LivednsDomain(nil)
		livednsDomainRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "livedns_domain"}), "livedns_domain_ref01"))

		livednsDomainRef01DataResult, err := livednsDomainRef01Ent.Create(livednsDomainRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		livednsDomainRef01Data = core.ToMapAny(entityData(livednsDomainRef01DataResult))
		if livednsDomainRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

		if setup.live {
			livePace()
		}
		// LIST
		livednsDomainRef01Match := map[string]any{}

		livednsDomainRef01ListResult, err := livednsDomainRef01Ent.List(livednsDomainRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, livednsDomainRef01ListOk := livednsDomainRef01ListResult.([]any)
		if !livednsDomainRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", livednsDomainRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		livednsDomainRef01DataUp0Up := map[string]any{
		}

		livednsDomainRef01MarkdefUp0Name := "domain_href"
		livednsDomainRef01MarkdefUp0Value := fmt.Sprintf("Mark01-livedns_domain_ref01_%d", setup.now)
		livednsDomainRef01DataUp0Up[livednsDomainRef01MarkdefUp0Name] = livednsDomainRef01MarkdefUp0Value

		livednsDomainRef01ResdataUp0Result, err := livednsDomainRef01Ent.Update(livednsDomainRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		livednsDomainRef01ResdataUp0 := core.ToMapAny(entityData(livednsDomainRef01ResdataUp0Result))
		if livednsDomainRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if livednsDomainRef01ResdataUp0[livednsDomainRef01MarkdefUp0Name] != livednsDomainRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", livednsDomainRef01MarkdefUp0Name, livednsDomainRef01ResdataUp0[livednsDomainRef01MarkdefUp0Name])
		}

		if setup.live {
			livePace()
		}
		// LOAD
		livednsDomainRef01MatchDt0 := map[string]any{}
		livednsDomainRef01DataDt0Loaded, err := livednsDomainRef01Ent.Load(livednsDomainRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if livednsDomainRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

		if setup.live {
			livePace()
		}

		if setup.live {
			livePace()
		}
		// LIST
		livednsDomainRef01MatchRt0 := map[string]any{}

		livednsDomainRef01ListRt0Result, err := livednsDomainRef01Ent.List(livednsDomainRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, livednsDomainRef01ListRt0Ok := livednsDomainRef01ListRt0Result.([]any)
		if !livednsDomainRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", livednsDomainRef01ListRt0Result)
		}

	})
}

func livedns_domainBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "livedns_domain", "LivednsDomainTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read livedns_domain test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse livedns_domain test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"livedns_domain01", "livedns_domain02", "livedns_domain03", "domain01", "domain02", "domain03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("GANDI_TEST_LIVEDNS_DOMAIN_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"GANDI_TEST_LIVEDNS_DOMAIN_ENTID": idmap,
		"GANDI_TEST_LIVE":      "FALSE",
		"GANDI_TEST_EXPLAIN":   "FALSE",
		"GANDI_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["GANDI_TEST_LIVEDNS_DOMAIN_ENTID"])
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
