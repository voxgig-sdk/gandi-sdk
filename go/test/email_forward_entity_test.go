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
const email_forwardEntityLiveStrict = true


func TestEmailForwardEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.EmailForward(nil)
		if ent == nil {
			t.Fatal("expected non-nil EmailForwardEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.EmailForward(nil).List(map[string]any{"domain": 1}, nil)
		if sdkerr, ok := err.(*core.GandiError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := email_forwardBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "email_forward." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"email_forward.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /email/forwards/{domain}\"}")
			t.Log("LIVE STEP {\"id\":\"email_forward.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /email/forwards/{domain}/{source}\"}")
			t.Log("LIVE STEP {\"id\":\"email_forward.remove.3\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /email/forwards/{domain}/{source}\"}")
			t.Log("LIVE STEP {\"id\":\"email_forward.list.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}")
		if setup.live {
			for _, _liveKey := range []string{"domain01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, email_forwardEntityLiveStrict, "Live entity test blocked: needs %s via GANDI_TEST_EMAIL_FORWARD_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		// Bootstrap entity data from existing test data (no create step in flow).
		emailForwardRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.email_forward")))
		var emailForwardRef01Data map[string]any
		if len(emailForwardRef01DataRaw) > 0 {
			emailForwardRef01Data = core.ToMapAny(emailForwardRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = emailForwardRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		emailForwardRef01Ent := client.EmailForward(nil)
		emailForwardRef01Match := map[string]any{
			"domain": setup.idmap["domain01"],
		}

		emailForwardRef01ListResult, err := emailForwardRef01Ent.List(emailForwardRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, emailForwardRef01ListOk := emailForwardRef01ListResult.([]any)
		if !emailForwardRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", emailForwardRef01ListResult)
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"domain01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, email_forwardEntityLiveStrict, "Live entity test blocked: needs %s via GANDI_TEST_EMAIL_FORWARD_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		emailForwardRef01Ent := client.EmailForward(nil)
		emailForwardRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "email_forward"}), "email_forward_ref01"))
		emailForwardRef01Data["domain"] = setup.idmap["domain01"]

		emailForwardRef01DataResult, err := emailForwardRef01Ent.Create(emailForwardRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		emailForwardRef01Data = core.ToMapAny(entityData(emailForwardRef01DataResult))
		if emailForwardRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if emailForwardRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LIST
		emailForwardRef01Match := map[string]any{
			"domain": setup.idmap["domain01"],
		}

		emailForwardRef01ListResult, err := emailForwardRef01Ent.List(emailForwardRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		emailForwardRef01List, emailForwardRef01ListOk := emailForwardRef01ListResult.([]any)
		if !emailForwardRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", emailForwardRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(emailForwardRef01List), map[string]any{"id": emailForwardRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		emailForwardRef01DataUp0Up := map[string]any{
			"id": emailForwardRef01Data["id"],
			"domain": setup.idmap["domain"],
		}

		emailForwardRef01MarkdefUp0Name := "href"
		emailForwardRef01MarkdefUp0Value := fmt.Sprintf("Mark01-email_forward_ref01_%d", setup.now)
		emailForwardRef01DataUp0Up[emailForwardRef01MarkdefUp0Name] = emailForwardRef01MarkdefUp0Value

		emailForwardRef01ResdataUp0Result, err := emailForwardRef01Ent.Update(emailForwardRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		emailForwardRef01ResdataUp0 := core.ToMapAny(entityData(emailForwardRef01ResdataUp0Result))
		if emailForwardRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !setup.live && !liveSameId(emailForwardRef01ResdataUp0["id"], emailForwardRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}
		if emailForwardRef01ResdataUp0[emailForwardRef01MarkdefUp0Name] != emailForwardRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", emailForwardRef01MarkdefUp0Name, emailForwardRef01ResdataUp0[emailForwardRef01MarkdefUp0Name])
		}

		if setup.live {
			livePace()
		}
		// REMOVE
		emailForwardRef01MatchRm0 := map[string]any{
			"id": emailForwardRef01Data["id"],
		}
		if v := setup.idmap["domain"]; v != nil {
			emailForwardRef01MatchRm0["domain"] = v
		} else {
			emailForwardRef01MatchRm0["domain"] = setup.idmap["domain01"]
		}
		_, err = emailForwardRef01Ent.Remove(emailForwardRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		if setup.live {
			livePace()
		}
		// LIST
		emailForwardRef01MatchRt0 := map[string]any{
			"domain": setup.idmap["domain01"],
		}

		emailForwardRef01ListRt0Result, err := emailForwardRef01Ent.List(emailForwardRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		emailForwardRef01ListRt0, emailForwardRef01ListRt0Ok := emailForwardRef01ListRt0Result.([]any)
		if !emailForwardRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", emailForwardRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(emailForwardRef01ListRt0), map[string]any{"id": emailForwardRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func email_forwardBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "email_forward", "EmailForwardTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read email_forward test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse email_forward test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"email_forward01", "email_forward02", "email_forward03", "domain01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("GANDI_TEST_EMAIL_FORWARD_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"GANDI_TEST_EMAIL_FORWARD_ENTID": idmap,
		"GANDI_TEST_LIVE":      "FALSE",
		"GANDI_TEST_EXPLAIN":   "FALSE",
		"GANDI_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["GANDI_TEST_EMAIL_FORWARD_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}
	// Add domain alias for update test.
	if idmapResolved["domain"] == nil {
		idmapResolved["domain"] = idmapResolved["domain01"]
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
