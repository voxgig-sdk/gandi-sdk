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
const email_slotEntityLiveStrict = true


func TestEmailSlotEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.EmailSlot(nil)
		if ent == nil {
			t.Fatal("expected non-nil EmailSlotEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.EmailSlot(nil).List(map[string]any{"domain": 1}, nil)
		if sdkerr, ok := err.(*core.GandiError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := email_slotBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "email_slot." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"email_slot.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /email/slots/{domain}\"}")
			t.Log("LIVE STEP {\"id\":\"email_slot.remove.3\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /email/slots/{domain}/{slot_id}\"}")
			t.Log("LIVE STEP {\"id\":\"email_slot.list.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}")
		if setup.live {
			for _, _liveKey := range []string{"domain01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, email_slotEntityLiveStrict, "Live entity test blocked: needs %s via GANDI_TEST_EMAIL_SLOT_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client
		if setup.live {
			var _liveId any
			if !setup.syntheticOnly {
				_liveId = setup.idmap["email_slot01"]
			}
			livePace()
			liveExisting(t, email_slotEntityLiveStrict, setup.data, "email_slot", "id", _liveId,
				func() (any, error) {
					return client.EmailSlot(nil).List(map[string]any{"domain": setup.idmap["domain01"]}, nil)
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		emailSlotRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.email_slot")))
		var emailSlotRef01Data map[string]any
		if len(emailSlotRef01DataRaw) > 0 {
			emailSlotRef01Data = core.ToMapAny(emailSlotRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = emailSlotRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		emailSlotRef01Ent := client.EmailSlot(nil)
		emailSlotRef01Match := map[string]any{
			"domain": setup.idmap["domain01"],
		}

		emailSlotRef01ListResult, err := emailSlotRef01Ent.List(emailSlotRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, emailSlotRef01ListOk := emailSlotRef01ListResult.([]any)
		if !emailSlotRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", emailSlotRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// LOAD
		emailSlotRef01MatchDt0 := map[string]any{
			"id": emailSlotRef01Data["id"],
		}
		if v := setup.idmap["domain"]; v != nil {
			emailSlotRef01MatchDt0["domain"] = v
		} else {
			emailSlotRef01MatchDt0["domain"] = setup.idmap["domain01"]
		}
		emailSlotRef01DataDt0Loaded, err := emailSlotRef01Ent.Load(emailSlotRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		emailSlotRef01DataDt0LoadResult := core.ToMapAny(entityData(emailSlotRef01DataDt0Loaded))
		if emailSlotRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(emailSlotRef01DataDt0LoadResult["id"], emailSlotRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"domain01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, email_slotEntityLiveStrict, "Live entity test blocked: needs %s via GANDI_TEST_EMAIL_SLOT_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		emailSlotRef01Ent := client.EmailSlot(nil)
		emailSlotRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "email_slot"}), "email_slot_ref01"))
		emailSlotRef01Data["domain"] = setup.idmap["domain01"]

		emailSlotRef01DataResult, err := emailSlotRef01Ent.Create(emailSlotRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		emailSlotRef01Data = core.ToMapAny(entityData(emailSlotRef01DataResult))
		if emailSlotRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if emailSlotRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LIST
		emailSlotRef01Match := map[string]any{
			"domain": setup.idmap["domain01"],
		}

		emailSlotRef01ListResult, err := emailSlotRef01Ent.List(emailSlotRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		emailSlotRef01List, emailSlotRef01ListOk := emailSlotRef01ListResult.([]any)
		if !emailSlotRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", emailSlotRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(emailSlotRef01List), map[string]any{"id": emailSlotRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		if setup.live {
			livePace()
		}
		// LOAD
		emailSlotRef01MatchDt0 := map[string]any{
			"id": emailSlotRef01Data["id"],
		}
		if v := setup.idmap["domain"]; v != nil {
			emailSlotRef01MatchDt0["domain"] = v
		} else {
			emailSlotRef01MatchDt0["domain"] = setup.idmap["domain01"]
		}
		emailSlotRef01DataDt0Loaded, err := emailSlotRef01Ent.Load(emailSlotRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		emailSlotRef01DataDt0LoadResult := core.ToMapAny(entityData(emailSlotRef01DataDt0Loaded))
		if emailSlotRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(emailSlotRef01DataDt0LoadResult["id"], emailSlotRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		if setup.live {
			livePace()
		}
		// REMOVE
		emailSlotRef01MatchRm0 := map[string]any{
			"id": emailSlotRef01Data["id"],
		}
		if v := setup.idmap["domain"]; v != nil {
			emailSlotRef01MatchRm0["domain"] = v
		} else {
			emailSlotRef01MatchRm0["domain"] = setup.idmap["domain01"]
		}
		_, err = emailSlotRef01Ent.Remove(emailSlotRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		if setup.live {
			livePace()
		}
		// LIST
		emailSlotRef01MatchRt0 := map[string]any{
			"domain": setup.idmap["domain01"],
		}

		emailSlotRef01ListRt0Result, err := emailSlotRef01Ent.List(emailSlotRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		emailSlotRef01ListRt0, emailSlotRef01ListRt0Ok := emailSlotRef01ListRt0Result.([]any)
		if !emailSlotRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", emailSlotRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(emailSlotRef01ListRt0), map[string]any{"id": emailSlotRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func email_slotBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "email_slot", "EmailSlotTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read email_slot test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse email_slot test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"email_slot01", "email_slot02", "email_slot03", "domain01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("GANDI_TEST_EMAIL_SLOT_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"GANDI_TEST_EMAIL_SLOT_ENTID": idmap,
		"GANDI_TEST_LIVE":      "FALSE",
		"GANDI_TEST_EXPLAIN":   "FALSE",
		"GANDI_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["GANDI_TEST_EMAIL_SLOT_ENTID"])
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
