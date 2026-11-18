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
const acme_subscriptionEntityLiveStrict = true


type acme_subscriptionFailHook struct {
	sdk.BaseFeature
	unexpected int
}

func (f *acme_subscriptionFailHook) PreSpec(ctx *sdk.Context) {
	panic("acme_subscription hook failed")
}

func (f *acme_subscriptionFailHook) PreUnexpected(ctx *sdk.Context) {
	f.unexpected++
}

func TestAcmeSubscriptionEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.AcmeSubscription(nil)
		if ent == nil {
			t.Fatal("expected non-nil AcmeSubscriptionEntity")
		}
	})

	// Feature #4: the entity Stream(action, ...) method runs the op pipeline and
	// returns a channel over result items. With the streaming feature active it
	// yields the feature's incremental output; otherwise it falls back to the
	// materialised list so Stream always yields.
	t.Run("stream", func(t *testing.T) {
		seed := map[string]any{
			"entity": map[string]any{
				"acme_subscription": map[string]any{
					"s1": map[string]any{"id": "s1"},
					"s2": map[string]any{"id": "s2"},
					"s3": map[string]any{"id": "s3"},
				},
			},
		}

		// Fallback: streaming inactive -> yields the materialised list items.
		base := sdk.TestSDK(seed, nil)
		var seen []any
		for si := range base.AcmeSubscription(nil).Stream("list", nil, nil) {
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
			for si := range streamSdk.AcmeSubscription(nil).Stream("list", nil, nil) {
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
		for si := range sdk.TestSDK(offline, nil).AcmeSubscription(nil).Stream("list", nil, nil) {
			if si.Err != nil {
				streamerr = si.Err
			}
		}
		if nil == streamerr || !strings.Contains(streamerr.Error(), "offline") {
			t.Fatalf("expected the transport failure as a stream value, got %v", streamerr)
		}

		quiet := map[string]any{"ctrl": map[string]any{"throw": false}}
		for si := range sdk.TestSDK(offline, nil).AcmeSubscription(nil).Stream("list", nil, quiet) {
			if si.Err != nil {
				t.Fatalf("throw false: expected no error value, got %v", si.Err)
			}
		}

		if fhHasFeature("rbac") {
			denied := sdk.TestSDK(nil, map[string]any{
				"feature": map[string]any{"rbac": map[string]any{"active": true, "deny": true}},
			})
			var denyerr error
			for si := range denied.AcmeSubscription(nil).Stream("list", nil, nil) {
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
		for range sdk.TestSDK(nil, nil).AcmeSubscription(nil).Stream("list", nil, map[string]any{"ctrl": ctrl}) {
		}
		if _, has := ctrl["stream"]; has || 1 != len(ctrl) {
			t.Fatalf("the stream changed the caller's ctrl")
		}
		if 0 == len(explain) {
			t.Fatalf("the caller's explain record was not filled")
		}
	})

	t.Run("unexpected", func(t *testing.T) {
		hook := &acme_subscriptionFailHook{
			BaseFeature: sdk.BaseFeature{Version: "0.0.1", Name: "failhook", Active: true}}
		client := sdk.TestSDK(nil, map[string]any{"extend": []any{hook}})

		_, err := client.AcmeSubscription(nil).List(nil, nil)
		if nil == err || !strings.Contains(err.Error(), "hook failed") {
			t.Fatalf("expected the hook's failure, got %v", err)
		}
		if 0 == hook.unexpected {
			t.Fatalf("PreUnexpected did not fire")
		}

		fired := hook.unexpected
		if _, err := client.AcmeSubscription(nil).List(nil, map[string]any{"throw": false}); nil != err {
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
		_, err := client.AcmeSubscription(nil).List(map[string]any{"created_at": 1, "ends_at": "x", "name": "x", "provider": "x", "sharing_id": "x", "status": "x", "validation_type": "x", "year": "x"}, nil)
		if sdkerr, ok := err.(*core.GandiError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := acme_subscriptionBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "acme_subscription." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"acme_subscription.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /acme/subscriptions\"}")
			t.Log("LIVE STEP {\"id\":\"acme_subscription.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PATCH /acme/subscriptions/{subscription_id}\"}")
			t.Log("LIVE STEP {\"id\":\"acme_subscription.remove.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /acme/subscriptions/{subscription_id}\"}")
		client := setup.client
		_ = client

		// Bootstrap entity data from existing test data (no create step in flow).
		acmeSubscriptionRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.acme_subscription")))
		var acmeSubscriptionRef01Data map[string]any
		if len(acmeSubscriptionRef01DataRaw) > 0 {
			acmeSubscriptionRef01Data = core.ToMapAny(acmeSubscriptionRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = acmeSubscriptionRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		acmeSubscriptionRef01Ent := client.AcmeSubscription(nil)
		acmeSubscriptionRef01Match := map[string]any{}

		acmeSubscriptionRef01ListResult, err := acmeSubscriptionRef01Ent.List(acmeSubscriptionRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, acmeSubscriptionRef01ListOk := acmeSubscriptionRef01ListResult.([]any)
		if !acmeSubscriptionRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", acmeSubscriptionRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// LOAD
		acmeSubscriptionRef01MatchDt0 := map[string]any{}
		acmeSubscriptionRef01DataDt0Loaded, err := acmeSubscriptionRef01Ent.Load(acmeSubscriptionRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if acmeSubscriptionRef01DataDt0Loaded == nil {
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
		acmeSubscriptionRef01Ent := client.AcmeSubscription(nil)
		acmeSubscriptionRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "acme_subscription"}), "acme_subscription_ref01"))

		acmeSubscriptionRef01DataResult, err := acmeSubscriptionRef01Ent.Create(acmeSubscriptionRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		acmeSubscriptionRef01Data = core.ToMapAny(entityData(acmeSubscriptionRef01DataResult))
		if acmeSubscriptionRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

		if setup.live {
			livePace()
		}
		// LIST
		acmeSubscriptionRef01Match := map[string]any{}

		acmeSubscriptionRef01ListResult, err := acmeSubscriptionRef01Ent.List(acmeSubscriptionRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, acmeSubscriptionRef01ListOk := acmeSubscriptionRef01ListResult.([]any)
		if !acmeSubscriptionRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", acmeSubscriptionRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		acmeSubscriptionRef01DataUp0Up := map[string]any{
		}

		acmeSubscriptionRef01MarkdefUp0Name := "country"
		acmeSubscriptionRef01MarkdefUp0Value := fmt.Sprintf("Mark01-acme_subscription_ref01_%d", setup.now)
		acmeSubscriptionRef01DataUp0Up[acmeSubscriptionRef01MarkdefUp0Name] = acmeSubscriptionRef01MarkdefUp0Value

		acmeSubscriptionRef01ResdataUp0Result, err := acmeSubscriptionRef01Ent.Update(acmeSubscriptionRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		acmeSubscriptionRef01ResdataUp0 := core.ToMapAny(entityData(acmeSubscriptionRef01ResdataUp0Result))
		if acmeSubscriptionRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if acmeSubscriptionRef01ResdataUp0[acmeSubscriptionRef01MarkdefUp0Name] != acmeSubscriptionRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", acmeSubscriptionRef01MarkdefUp0Name, acmeSubscriptionRef01ResdataUp0[acmeSubscriptionRef01MarkdefUp0Name])
		}

		if setup.live {
			livePace()
		}
		// LOAD
		acmeSubscriptionRef01MatchDt0 := map[string]any{}
		acmeSubscriptionRef01DataDt0Loaded, err := acmeSubscriptionRef01Ent.Load(acmeSubscriptionRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if acmeSubscriptionRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

		if setup.live {
			livePace()
		}

		if setup.live {
			livePace()
		}
		// LIST
		acmeSubscriptionRef01MatchRt0 := map[string]any{}

		acmeSubscriptionRef01ListRt0Result, err := acmeSubscriptionRef01Ent.List(acmeSubscriptionRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, acmeSubscriptionRef01ListRt0Ok := acmeSubscriptionRef01ListRt0Result.([]any)
		if !acmeSubscriptionRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", acmeSubscriptionRef01ListRt0Result)
		}

	})
}

func acme_subscriptionBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "acme_subscription", "AcmeSubscriptionTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read acme_subscription test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse acme_subscription test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"acme_subscription01", "acme_subscription02", "acme_subscription03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("GANDI_TEST_ACME_SUBSCRIPTION_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"GANDI_TEST_ACME_SUBSCRIPTION_ENTID": idmap,
		"GANDI_TEST_LIVE":      "FALSE",
		"GANDI_TEST_EXPLAIN":   "FALSE",
		"GANDI_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["GANDI_TEST_ACME_SUBSCRIPTION_ENTID"])
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
