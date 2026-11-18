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
const issued_certificateEntityLiveStrict = true


type issued_certificateFailHook struct {
	sdk.BaseFeature
	unexpected int
}

func (f *issued_certificateFailHook) PreSpec(ctx *sdk.Context) {
	panic("issued_certificate hook failed")
}

func (f *issued_certificateFailHook) PreUnexpected(ctx *sdk.Context) {
	f.unexpected++
}

func TestIssuedCertificateEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.IssuedCertificate(nil)
		if ent == nil {
			t.Fatal("expected non-nil IssuedCertificateEntity")
		}
	})

	// Feature #4: the entity Stream(action, ...) method runs the op pipeline and
	// returns a channel over result items. With the streaming feature active it
	// yields the feature's incremental output; otherwise it falls back to the
	// materialised list so Stream always yields.
	t.Run("stream", func(t *testing.T) {
		seed := map[string]any{
			"entity": map[string]any{
				"issued_certificate": map[string]any{
					"s1": map[string]any{"id": "s1"},
					"s2": map[string]any{"id": "s2"},
					"s3": map[string]any{"id": "s3"},
				},
			},
		}

		// Fallback: streaming inactive -> yields the materialised list items.
		base := sdk.TestSDK(seed, nil)
		var seen []any
		for si := range base.IssuedCertificate(nil).Stream("list", nil, nil) {
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
			for si := range streamSdk.IssuedCertificate(nil).Stream("list", nil, nil) {
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
		for si := range sdk.TestSDK(offline, nil).IssuedCertificate(nil).Stream("list", nil, nil) {
			if si.Err != nil {
				streamerr = si.Err
			}
		}
		if nil == streamerr || !strings.Contains(streamerr.Error(), "offline") {
			t.Fatalf("expected the transport failure as a stream value, got %v", streamerr)
		}

		quiet := map[string]any{"ctrl": map[string]any{"throw": false}}
		for si := range sdk.TestSDK(offline, nil).IssuedCertificate(nil).Stream("list", nil, quiet) {
			if si.Err != nil {
				t.Fatalf("throw false: expected no error value, got %v", si.Err)
			}
		}

		if fhHasFeature("rbac") {
			denied := sdk.TestSDK(nil, map[string]any{
				"feature": map[string]any{"rbac": map[string]any{"active": true, "deny": true}},
			})
			var denyerr error
			for si := range denied.IssuedCertificate(nil).Stream("list", nil, nil) {
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
		for range sdk.TestSDK(nil, nil).IssuedCertificate(nil).Stream("list", nil, map[string]any{"ctrl": ctrl}) {
		}
		if _, has := ctrl["stream"]; has || 1 != len(ctrl) {
			t.Fatalf("the stream changed the caller's ctrl")
		}
		if 0 == len(explain) {
			t.Fatalf("the caller's explain record was not filled")
		}
	})

	t.Run("unexpected", func(t *testing.T) {
		hook := &issued_certificateFailHook{
			BaseFeature: sdk.BaseFeature{Version: "0.0.1", Name: "failhook", Active: true}}
		client := sdk.TestSDK(nil, map[string]any{"extend": []any{hook}})

		_, err := client.IssuedCertificate(nil).List(nil, nil)
		if nil == err || !strings.Contains(err.Error(), "hook failed") {
			t.Fatalf("expected the hook's failure, got %v", err)
		}
		if 0 == hook.unexpected {
			t.Fatalf("PreUnexpected did not fire")
		}

		fired := hook.unexpected
		if _, err := client.IssuedCertificate(nil).List(nil, map[string]any{"throw": false}); nil != err {
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
		_, err := client.IssuedCertificate(nil).List(map[string]any{"cn": 1}, nil)
		if sdkerr, ok := err.(*core.GandiError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := issued_certificateBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "issued_certificate." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"issued_certificate.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /certificate/issued-certs/{id}/dcv_params\"}")
			t.Log("LIVE STEP {\"id\":\"issued_certificate.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PATCH /certificate/issued-certs/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"issued_certificate.remove.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /certificate/issued-certs/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"issued_certificate.list.5\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}")
		client := setup.client
		_ = client
		if setup.live {
			var _liveId any
			if !setup.syntheticOnly {
				_liveId = setup.idmap["issued_certificate01"]
			}
			livePace()
			liveExisting(t, issued_certificateEntityLiveStrict, setup.data, "issued_certificate", "id", _liveId,
				func() (any, error) {
					return client.IssuedCertificate(nil).List(map[string]any{}, nil)
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		issuedCertificateRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.issued_certificate")))
		var issuedCertificateRef01Data map[string]any
		if len(issuedCertificateRef01DataRaw) > 0 {
			issuedCertificateRef01Data = core.ToMapAny(issuedCertificateRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = issuedCertificateRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		issuedCertificateRef01Ent := client.IssuedCertificate(nil)
		issuedCertificateRef01Match := map[string]any{}

		issuedCertificateRef01ListResult, err := issuedCertificateRef01Ent.List(issuedCertificateRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, issuedCertificateRef01ListOk := issuedCertificateRef01ListResult.([]any)
		if !issuedCertificateRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", issuedCertificateRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// LOAD
		issuedCertificateRef01MatchDt0 := map[string]any{
			"id": issuedCertificateRef01Data["id"],
		}
		issuedCertificateRef01DataDt0Loaded, err := issuedCertificateRef01Ent.Load(issuedCertificateRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		issuedCertificateRef01DataDt0LoadResult := core.ToMapAny(entityData(issuedCertificateRef01DataDt0Loaded))
		if issuedCertificateRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(issuedCertificateRef01DataDt0LoadResult["id"], issuedCertificateRef01Data["id"]) {
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
		issuedCertificateRef01Ent := client.IssuedCertificate(nil)
		issuedCertificateRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "issued_certificate"}), "issued_certificate_ref01"))

		issuedCertificateRef01DataResult, err := issuedCertificateRef01Ent.Create(issuedCertificateRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		issuedCertificateRef01Data = core.ToMapAny(entityData(issuedCertificateRef01DataResult))
		if issuedCertificateRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if issuedCertificateRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LIST
		issuedCertificateRef01Match := map[string]any{}

		issuedCertificateRef01ListResult, err := issuedCertificateRef01Ent.List(issuedCertificateRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		issuedCertificateRef01List, issuedCertificateRef01ListOk := issuedCertificateRef01ListResult.([]any)
		if !issuedCertificateRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", issuedCertificateRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(issuedCertificateRef01List), map[string]any{"id": issuedCertificateRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		issuedCertificateRef01DataUp0Up := map[string]any{
			"id": issuedCertificateRef01Data["id"],
		}

		issuedCertificateRef01MarkdefUp0Name := "assumed_name"
		issuedCertificateRef01MarkdefUp0Value := fmt.Sprintf("Mark01-issued_certificate_ref01_%d", setup.now)
		issuedCertificateRef01DataUp0Up[issuedCertificateRef01MarkdefUp0Name] = issuedCertificateRef01MarkdefUp0Value

		issuedCertificateRef01ResdataUp0Result, err := issuedCertificateRef01Ent.Update(issuedCertificateRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		issuedCertificateRef01ResdataUp0 := core.ToMapAny(entityData(issuedCertificateRef01ResdataUp0Result))
		if issuedCertificateRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !liveSameId(issuedCertificateRef01ResdataUp0["id"], issuedCertificateRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}
		if issuedCertificateRef01ResdataUp0[issuedCertificateRef01MarkdefUp0Name] != issuedCertificateRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", issuedCertificateRef01MarkdefUp0Name, issuedCertificateRef01ResdataUp0[issuedCertificateRef01MarkdefUp0Name])
		}

		if setup.live {
			livePace()
		}
		// LOAD
		issuedCertificateRef01MatchDt0 := map[string]any{
			"id": issuedCertificateRef01Data["id"],
		}
		issuedCertificateRef01DataDt0Loaded, err := issuedCertificateRef01Ent.Load(issuedCertificateRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		issuedCertificateRef01DataDt0LoadResult := core.ToMapAny(entityData(issuedCertificateRef01DataDt0Loaded))
		if issuedCertificateRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(issuedCertificateRef01DataDt0LoadResult["id"], issuedCertificateRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		if setup.live {
			livePace()
		}
		// REMOVE
		issuedCertificateRef01MatchRm0 := map[string]any{
			"id": issuedCertificateRef01Data["id"],
		}
		_, err = issuedCertificateRef01Ent.Remove(issuedCertificateRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		if setup.live {
			livePace()
		}
		// LIST
		issuedCertificateRef01MatchRt0 := map[string]any{}

		issuedCertificateRef01ListRt0Result, err := issuedCertificateRef01Ent.List(issuedCertificateRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		issuedCertificateRef01ListRt0, issuedCertificateRef01ListRt0Ok := issuedCertificateRef01ListRt0Result.([]any)
		if !issuedCertificateRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", issuedCertificateRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(issuedCertificateRef01ListRt0), map[string]any{"id": issuedCertificateRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func issued_certificateBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "issued_certificate", "IssuedCertificateTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read issued_certificate test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse issued_certificate test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"issued_certificate01", "issued_certificate02", "issued_certificate03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("GANDI_TEST_ISSUED_CERTIFICATE_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"GANDI_TEST_ISSUED_CERTIFICATE_ENTID": idmap,
		"GANDI_TEST_LIVE":      "FALSE",
		"GANDI_TEST_EXPLAIN":   "FALSE",
		"GANDI_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["GANDI_TEST_ISSUED_CERTIFICATE_ENTID"])
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
