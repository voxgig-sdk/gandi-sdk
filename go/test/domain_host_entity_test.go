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
const domain_hostEntityLiveStrict = true


func TestDomainHostEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.DomainHost(nil)
		if ent == nil {
			t.Fatal("expected non-nil DomainHostEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.DomainHost(nil).List(map[string]any{"domain": 1}, nil)
		if sdkerr, ok := err.(*core.GandiError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := domain_hostBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "domain_host." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"domain_host.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /domain/domains/{domain}/hosts\"}")
			t.Log("LIVE STEP {\"id\":\"domain_host.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /domain/domains/{domain}/hosts/{name}\"}")
			t.Log("LIVE STEP {\"id\":\"domain_host.remove.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /domain/domains/{domain}/hosts/{name}\"}")
		if setup.live {
			for _, _liveKey := range []string{"domain01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, domain_hostEntityLiveStrict, "Live entity test blocked: needs %s via GANDI_TEST_DOMAIN_HOST_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		// Bootstrap entity data from existing test data (no create step in flow).
		domainHostRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.domain_host")))
		var domainHostRef01Data map[string]any
		if len(domainHostRef01DataRaw) > 0 {
			domainHostRef01Data = core.ToMapAny(domainHostRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = domainHostRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		domainHostRef01Ent := client.DomainHost(nil)
		domainHostRef01Match := map[string]any{
			"domain": setup.idmap["domain01"],
		}

		domainHostRef01ListResult, err := domainHostRef01Ent.List(domainHostRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, domainHostRef01ListOk := domainHostRef01ListResult.([]any)
		if !domainHostRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", domainHostRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// LOAD
		domainHostRef01MatchDt0 := map[string]any{}
		if v := setup.idmap["domain"]; v != nil {
			domainHostRef01MatchDt0["domain"] = v
		} else {
			domainHostRef01MatchDt0["domain"] = setup.idmap["domain01"]
		}
		domainHostRef01DataDt0Loaded, err := domainHostRef01Ent.Load(domainHostRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if domainHostRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"domain01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, domain_hostEntityLiveStrict, "Live entity test blocked: needs %s via GANDI_TEST_DOMAIN_HOST_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		domainHostRef01Ent := client.DomainHost(nil)
		domainHostRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "domain_host"}), "domain_host_ref01"))
		domainHostRef01Data["domain"] = setup.idmap["domain01"]

		domainHostRef01DataResult, err := domainHostRef01Ent.Create(domainHostRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		domainHostRef01Data = core.ToMapAny(entityData(domainHostRef01DataResult))
		if domainHostRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

		if setup.live {
			livePace()
		}
		// LIST
		domainHostRef01Match := map[string]any{
			"domain": setup.idmap["domain01"],
		}

		domainHostRef01ListResult, err := domainHostRef01Ent.List(domainHostRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, domainHostRef01ListOk := domainHostRef01ListResult.([]any)
		if !domainHostRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", domainHostRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		domainHostRef01DataUp0Up := map[string]any{
			"domain": setup.idmap["domain"],
		}

		domainHostRef01MarkdefUp0Name := "fqdn"
		domainHostRef01MarkdefUp0Value := fmt.Sprintf("Mark01-domain_host_ref01_%d", setup.now)
		domainHostRef01DataUp0Up[domainHostRef01MarkdefUp0Name] = domainHostRef01MarkdefUp0Value

		domainHostRef01ResdataUp0Result, err := domainHostRef01Ent.Update(domainHostRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		domainHostRef01ResdataUp0 := core.ToMapAny(entityData(domainHostRef01ResdataUp0Result))
		if domainHostRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if domainHostRef01ResdataUp0[domainHostRef01MarkdefUp0Name] != domainHostRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", domainHostRef01MarkdefUp0Name, domainHostRef01ResdataUp0[domainHostRef01MarkdefUp0Name])
		}

		if setup.live {
			livePace()
		}
		// LOAD
		domainHostRef01MatchDt0 := map[string]any{}
		if v := setup.idmap["domain"]; v != nil {
			domainHostRef01MatchDt0["domain"] = v
		} else {
			domainHostRef01MatchDt0["domain"] = setup.idmap["domain01"]
		}
		domainHostRef01DataDt0Loaded, err := domainHostRef01Ent.Load(domainHostRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if domainHostRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

		if setup.live {
			livePace()
		}

		if setup.live {
			livePace()
		}
		// LIST
		domainHostRef01MatchRt0 := map[string]any{
			"domain": setup.idmap["domain01"],
		}

		domainHostRef01ListRt0Result, err := domainHostRef01Ent.List(domainHostRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, domainHostRef01ListRt0Ok := domainHostRef01ListRt0Result.([]any)
		if !domainHostRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", domainHostRef01ListRt0Result)
		}

	})
}

func domain_hostBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "domain_host", "DomainHostTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read domain_host test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse domain_host test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"domain_host01", "domain_host02", "domain_host03", "domain01", "domain02", "domain03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("GANDI_TEST_DOMAIN_HOST_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"GANDI_TEST_DOMAIN_HOST_ENTID": idmap,
		"GANDI_TEST_LIVE":      "FALSE",
		"GANDI_TEST_EXPLAIN":   "FALSE",
		"GANDI_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["GANDI_TEST_DOMAIN_HOST_ENTID"])
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
