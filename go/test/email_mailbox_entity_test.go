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
const email_mailboxEntityLiveStrict = true


func TestEmailMailboxEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.EmailMailbox(nil)
		if ent == nil {
			t.Fatal("expected non-nil EmailMailboxEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.EmailMailbox(nil).List(map[string]any{"domain": 1}, nil)
		if sdkerr, ok := err.(*core.GandiError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := email_mailboxBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "email_mailbox." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"email_mailbox.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /email/mailboxes/{domain}/{email}/renew\"}")
			t.Log("LIVE STEP {\"id\":\"email_mailbox.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PATCH /email/mailboxes/{domain}/{mailbox_id}\"}")
			t.Log("LIVE STEP {\"id\":\"email_mailbox.remove.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /email/mailboxes/{domain}/{mailbox_id}\"}")
			t.Log("LIVE STEP {\"id\":\"email_mailbox.list.5\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}")
		if setup.live {
			for _, _liveKey := range []string{"domain01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, email_mailboxEntityLiveStrict, "Live entity test blocked: needs %s via GANDI_TEST_EMAIL_MAILBOX_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client
		if setup.live {
			var _liveId any
			if !setup.syntheticOnly {
				_liveId = setup.idmap["email_mailbox01"]
			}
			livePace()
			liveExisting(t, email_mailboxEntityLiveStrict, setup.data, "email_mailbox", "id", _liveId,
				func() (any, error) {
					return client.EmailMailbox(nil).List(map[string]any{"domain": setup.idmap["domain01"]}, nil)
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		emailMailboxRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.email_mailbox")))
		var emailMailboxRef01Data map[string]any
		if len(emailMailboxRef01DataRaw) > 0 {
			emailMailboxRef01Data = core.ToMapAny(emailMailboxRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = emailMailboxRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		emailMailboxRef01Ent := client.EmailMailbox(nil)
		emailMailboxRef01Match := map[string]any{
			"domain": setup.idmap["domain01"],
		}

		emailMailboxRef01ListResult, err := emailMailboxRef01Ent.List(emailMailboxRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, emailMailboxRef01ListOk := emailMailboxRef01ListResult.([]any)
		if !emailMailboxRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", emailMailboxRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// LOAD
		emailMailboxRef01MatchDt0 := map[string]any{
			"id": emailMailboxRef01Data["id"],
		}
		switch v := emailMailboxRef01Data["domain"].(type) {
		case string, bool, float64, int, int64:
			emailMailboxRef01MatchDt0["domain"] = v
		default:
			if v := setup.idmap["domain"]; v != nil {
				emailMailboxRef01MatchDt0["domain"] = v
			} else {
				emailMailboxRef01MatchDt0["domain"] = setup.idmap["domain01"]
			}
		}
		emailMailboxRef01DataDt0Loaded, err := emailMailboxRef01Ent.Load(emailMailboxRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		emailMailboxRef01DataDt0LoadResult := core.ToMapAny(entityData(emailMailboxRef01DataDt0Loaded))
		if emailMailboxRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(emailMailboxRef01DataDt0LoadResult["id"], emailMailboxRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"domain01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, email_mailboxEntityLiveStrict, "Live entity test blocked: needs %s via GANDI_TEST_EMAIL_MAILBOX_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		emailMailboxRef01Ent := client.EmailMailbox(nil)
		emailMailboxRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "email_mailbox"}), "email_mailbox_ref01"))
		emailMailboxRef01Data["domain"] = setup.idmap["domain01"]

		emailMailboxRef01DataResult, err := emailMailboxRef01Ent.Create(emailMailboxRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		emailMailboxRef01Data = core.ToMapAny(entityData(emailMailboxRef01DataResult))
		if emailMailboxRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if emailMailboxRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LIST
		emailMailboxRef01Match := map[string]any{
			"domain": setup.idmap["domain01"],
		}

		emailMailboxRef01ListResult, err := emailMailboxRef01Ent.List(emailMailboxRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		emailMailboxRef01List, emailMailboxRef01ListOk := emailMailboxRef01ListResult.([]any)
		if !emailMailboxRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", emailMailboxRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(emailMailboxRef01List), map[string]any{"id": emailMailboxRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		emailMailboxRef01DataUp0Up := map[string]any{
			"id": emailMailboxRef01Data["id"],
			"domain": setup.idmap["domain"],
		}

		emailMailboxRef01MarkdefUp0Name := "address"
		emailMailboxRef01MarkdefUp0Value := fmt.Sprintf("Mark01-email_mailbox_ref01_%d", setup.now)
		emailMailboxRef01DataUp0Up[emailMailboxRef01MarkdefUp0Name] = emailMailboxRef01MarkdefUp0Value

		emailMailboxRef01ResdataUp0Result, err := emailMailboxRef01Ent.Update(emailMailboxRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		emailMailboxRef01ResdataUp0 := core.ToMapAny(entityData(emailMailboxRef01ResdataUp0Result))
		if emailMailboxRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !liveSameId(emailMailboxRef01ResdataUp0["id"], emailMailboxRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}
		if emailMailboxRef01ResdataUp0[emailMailboxRef01MarkdefUp0Name] != emailMailboxRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", emailMailboxRef01MarkdefUp0Name, emailMailboxRef01ResdataUp0[emailMailboxRef01MarkdefUp0Name])
		}

		if setup.live {
			livePace()
		}
		// LOAD
		emailMailboxRef01MatchDt0 := map[string]any{
			"id": emailMailboxRef01Data["id"],
		}
		switch v := emailMailboxRef01Data["domain"].(type) {
		case string, bool, float64, int, int64:
			emailMailboxRef01MatchDt0["domain"] = v
		default:
			if v := setup.idmap["domain"]; v != nil {
				emailMailboxRef01MatchDt0["domain"] = v
			} else {
				emailMailboxRef01MatchDt0["domain"] = setup.idmap["domain01"]
			}
		}
		emailMailboxRef01DataDt0Loaded, err := emailMailboxRef01Ent.Load(emailMailboxRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		emailMailboxRef01DataDt0LoadResult := core.ToMapAny(entityData(emailMailboxRef01DataDt0Loaded))
		if emailMailboxRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(emailMailboxRef01DataDt0LoadResult["id"], emailMailboxRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		if setup.live {
			livePace()
		}
		// REMOVE
		emailMailboxRef01MatchRm0 := map[string]any{
			"id": emailMailboxRef01Data["id"],
		}
		if v := setup.idmap["domain"]; v != nil {
			emailMailboxRef01MatchRm0["domain"] = v
		} else {
			emailMailboxRef01MatchRm0["domain"] = setup.idmap["domain01"]
		}
		_, err = emailMailboxRef01Ent.Remove(emailMailboxRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		if setup.live {
			livePace()
		}
		// LIST
		emailMailboxRef01MatchRt0 := map[string]any{
			"domain": setup.idmap["domain01"],
		}

		emailMailboxRef01ListRt0Result, err := emailMailboxRef01Ent.List(emailMailboxRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		emailMailboxRef01ListRt0, emailMailboxRef01ListRt0Ok := emailMailboxRef01ListRt0Result.([]any)
		if !emailMailboxRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", emailMailboxRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(emailMailboxRef01ListRt0), map[string]any{"id": emailMailboxRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func email_mailboxBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "email_mailbox", "EmailMailboxTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read email_mailbox test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse email_mailbox test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"email_mailbox01", "email_mailbox02", "email_mailbox03", "mailbox01", "mailbox02", "mailbox03", "domain01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("GANDI_TEST_EMAIL_MAILBOX_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"GANDI_TEST_EMAIL_MAILBOX_ENTID": idmap,
		"GANDI_TEST_LIVE":      "FALSE",
		"GANDI_TEST_EXPLAIN":   "FALSE",
		"GANDI_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["GANDI_TEST_EMAIL_MAILBOX_ENTID"])
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
