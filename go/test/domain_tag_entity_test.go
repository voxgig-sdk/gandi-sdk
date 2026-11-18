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
const domain_tagEntityLiveStrict = true


func TestDomainTagEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.DomainTag(nil)
		if ent == nil {
			t.Fatal("expected non-nil DomainTagEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.DomainTag(nil).List(map[string]any{"domain": 1}, nil)
		if sdkerr, ok := err.(*core.GandiError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := domain_tagBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "domain_tag." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"domain_tag.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /domain/domains/{domain}/tags\"}")
			t.Log("LIVE STEP {\"id\":\"domain_tag.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /domain/domains/{domain}/tags\"}")
			t.Log("LIVE STEP {\"id\":\"domain_tag.remove.3\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /domain/domains/{domain}/tags\"}")
		if setup.live {
			for _, _liveKey := range []string{"domain01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, domain_tagEntityLiveStrict, "Live entity test blocked: needs %s via GANDI_TEST_DOMAIN_TAG_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		// Bootstrap entity data from existing test data (no create step in flow).
		domainTagRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.domain_tag")))
		var domainTagRef01Data map[string]any
		if len(domainTagRef01DataRaw) > 0 {
			domainTagRef01Data = core.ToMapAny(domainTagRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = domainTagRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		domainTagRef01Ent := client.DomainTag(nil)
		domainTagRef01Match := map[string]any{
			"domain": setup.idmap["domain01"],
		}

		domainTagRef01ListResult, err := domainTagRef01Ent.List(domainTagRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, domainTagRef01ListOk := domainTagRef01ListResult.([]any)
		if !domainTagRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", domainTagRef01ListResult)
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"domain01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, domain_tagEntityLiveStrict, "Live entity test blocked: needs %s via GANDI_TEST_DOMAIN_TAG_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		domainTagRef01Ent := client.DomainTag(nil)
		domainTagRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "domain_tag"}), "domain_tag_ref01"))
		domainTagRef01Data["domain"] = setup.idmap["domain01"]

		domainTagRef01DataResult, err := domainTagRef01Ent.Create(domainTagRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		domainTagRef01Data = core.ToMapAny(entityData(domainTagRef01DataResult))
		if domainTagRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

		if setup.live {
			livePace()
		}
		// LIST
		domainTagRef01Match := map[string]any{
			"domain": setup.idmap["domain01"],
		}

		domainTagRef01ListResult, err := domainTagRef01Ent.List(domainTagRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, domainTagRef01ListOk := domainTagRef01ListResult.([]any)
		if !domainTagRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", domainTagRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		domainTagRef01DataUp0Up := map[string]any{
		}

		domainTagRef01MarkdefUp0Name := "message"
		domainTagRef01MarkdefUp0Value := fmt.Sprintf("Mark01-domain_tag_ref01_%d", setup.now)
		domainTagRef01DataUp0Up[domainTagRef01MarkdefUp0Name] = domainTagRef01MarkdefUp0Value

		domainTagRef01ResdataUp0Result, err := domainTagRef01Ent.Update(domainTagRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		domainTagRef01ResdataUp0 := core.ToMapAny(entityData(domainTagRef01ResdataUp0Result))
		if domainTagRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if domainTagRef01ResdataUp0[domainTagRef01MarkdefUp0Name] != domainTagRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", domainTagRef01MarkdefUp0Name, domainTagRef01ResdataUp0[domainTagRef01MarkdefUp0Name])
		}

		if setup.live {
			livePace()
		}

		if setup.live {
			livePace()
		}
		// LIST
		domainTagRef01MatchRt0 := map[string]any{
			"domain": setup.idmap["domain01"],
		}

		domainTagRef01ListRt0Result, err := domainTagRef01Ent.List(domainTagRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, domainTagRef01ListRt0Ok := domainTagRef01ListRt0Result.([]any)
		if !domainTagRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", domainTagRef01ListRt0Result)
		}

	})
}

func domain_tagBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "domain_tag", "DomainTagTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read domain_tag test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse domain_tag test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"domain_tag01", "domain_tag02", "domain_tag03", "domain01", "domain02", "domain03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("GANDI_TEST_DOMAIN_TAG_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"GANDI_TEST_DOMAIN_TAG_ENTID": idmap,
		"GANDI_TEST_LIVE":      "FALSE",
		"GANDI_TEST_EXPLAIN":   "FALSE",
		"GANDI_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["GANDI_TEST_DOMAIN_TAG_ENTID"])
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
