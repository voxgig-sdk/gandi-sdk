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
const domain_dnskeyEntityLiveStrict = true


func TestDomainDnskeyEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.DomainDnskey(nil)
		if ent == nil {
			t.Fatal("expected non-nil DomainDnskeyEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.DomainDnskey(nil).List(map[string]any{"domain": 1}, nil)
		if sdkerr, ok := err.(*core.GandiError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := domain_dnskeyBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "domain_dnskey." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"domain_dnskey.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /domain/domains/{domain}/dnskeys\"}")
			t.Log("LIVE STEP {\"id\":\"domain_dnskey.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /domain/domains/{domain}/dnskeys\"}")
			t.Log("LIVE STEP {\"id\":\"domain_dnskey.remove.3\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /domain/domains/{domain}/dnskeys/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"domain_dnskey.list.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}")
		if setup.live {
			for _, _liveKey := range []string{"domain01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, domain_dnskeyEntityLiveStrict, "Live entity test blocked: needs %s via GANDI_TEST_DOMAIN_DNSKEY_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		// Bootstrap entity data from existing test data (no create step in flow).
		domainDnskeyRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.domain_dnskey")))
		var domainDnskeyRef01Data map[string]any
		if len(domainDnskeyRef01DataRaw) > 0 {
			domainDnskeyRef01Data = core.ToMapAny(domainDnskeyRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = domainDnskeyRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		domainDnskeyRef01Ent := client.DomainDnskey(nil)
		domainDnskeyRef01Match := map[string]any{
			"domain": setup.idmap["domain01"],
		}

		domainDnskeyRef01ListResult, err := domainDnskeyRef01Ent.List(domainDnskeyRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, domainDnskeyRef01ListOk := domainDnskeyRef01ListResult.([]any)
		if !domainDnskeyRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", domainDnskeyRef01ListResult)
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"domain01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, domain_dnskeyEntityLiveStrict, "Live entity test blocked: needs %s via GANDI_TEST_DOMAIN_DNSKEY_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		domainDnskeyRef01Ent := client.DomainDnskey(nil)
		domainDnskeyRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "domain_dnskey"}), "domain_dnskey_ref01"))
		domainDnskeyRef01Data["domain"] = setup.idmap["domain01"]

		domainDnskeyRef01DataResult, err := domainDnskeyRef01Ent.Create(domainDnskeyRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		domainDnskeyRef01Data = core.ToMapAny(entityData(domainDnskeyRef01DataResult))
		if domainDnskeyRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if domainDnskeyRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LIST
		domainDnskeyRef01Match := map[string]any{
			"domain": setup.idmap["domain01"],
		}

		domainDnskeyRef01ListResult, err := domainDnskeyRef01Ent.List(domainDnskeyRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		domainDnskeyRef01List, domainDnskeyRef01ListOk := domainDnskeyRef01ListResult.([]any)
		if !domainDnskeyRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", domainDnskeyRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(domainDnskeyRef01List), map[string]any{"id": domainDnskeyRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		domainDnskeyRef01DataUp0Up := map[string]any{
			"id": domainDnskeyRef01Data["id"],
		}

		domainDnskeyRef01MarkdefUp0Name := "digest"
		domainDnskeyRef01MarkdefUp0Value := fmt.Sprintf("Mark01-domain_dnskey_ref01_%d", setup.now)
		domainDnskeyRef01DataUp0Up[domainDnskeyRef01MarkdefUp0Name] = domainDnskeyRef01MarkdefUp0Value

		domainDnskeyRef01ResdataUp0Result, err := domainDnskeyRef01Ent.Update(domainDnskeyRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		domainDnskeyRef01ResdataUp0 := core.ToMapAny(entityData(domainDnskeyRef01ResdataUp0Result))
		if domainDnskeyRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !liveSameId(domainDnskeyRef01ResdataUp0["id"], domainDnskeyRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}
		if domainDnskeyRef01ResdataUp0[domainDnskeyRef01MarkdefUp0Name] != domainDnskeyRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", domainDnskeyRef01MarkdefUp0Name, domainDnskeyRef01ResdataUp0[domainDnskeyRef01MarkdefUp0Name])
		}

		if setup.live {
			livePace()
		}
		// REMOVE
		domainDnskeyRef01MatchRm0 := map[string]any{
			"id": domainDnskeyRef01Data["id"],
		}
		if v := setup.idmap["domain"]; v != nil {
			domainDnskeyRef01MatchRm0["domain"] = v
		} else {
			domainDnskeyRef01MatchRm0["domain"] = setup.idmap["domain01"]
		}
		_, err = domainDnskeyRef01Ent.Remove(domainDnskeyRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		if setup.live {
			livePace()
		}
		// LIST
		domainDnskeyRef01MatchRt0 := map[string]any{
			"domain": setup.idmap["domain01"],
		}

		domainDnskeyRef01ListRt0Result, err := domainDnskeyRef01Ent.List(domainDnskeyRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		domainDnskeyRef01ListRt0, domainDnskeyRef01ListRt0Ok := domainDnskeyRef01ListRt0Result.([]any)
		if !domainDnskeyRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", domainDnskeyRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(domainDnskeyRef01ListRt0), map[string]any{"id": domainDnskeyRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func domain_dnskeyBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "domain_dnskey", "DomainDnskeyTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read domain_dnskey test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse domain_dnskey test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"domain_dnskey01", "domain_dnskey02", "domain_dnskey03", "domain01", "domain02", "domain03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("GANDI_TEST_DOMAIN_DNSKEY_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"GANDI_TEST_DOMAIN_DNSKEY_ENTID": idmap,
		"GANDI_TEST_LIVE":      "FALSE",
		"GANDI_TEST_EXPLAIN":   "FALSE",
		"GANDI_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["GANDI_TEST_DOMAIN_DNSKEY_ENTID"])
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
