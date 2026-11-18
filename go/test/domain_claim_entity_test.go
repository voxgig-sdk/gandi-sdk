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
const domain_claimEntityLiveStrict = true


func TestDomainClaimEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.DomainClaim(nil)
		if ent == nil {
			t.Fatal("expected non-nil DomainClaimEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.DomainClaim(nil).Load(map[string]any{"domain": 1}, nil)
		if sdkerr, ok := err.(*core.GandiError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := domain_claimBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "domain_claim." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"domain_claim.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /domain/domains/{domain}/claims\"}")
		client := setup.client
		_ = client

		// Bootstrap entity data from existing test data (no create step in flow).
		domainClaimRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.domain_claim")))
		var domainClaimRef01Data map[string]any
		if len(domainClaimRef01DataRaw) > 0 {
			domainClaimRef01Data = core.ToMapAny(domainClaimRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = domainClaimRef01Data

		if setup.live {
			livePace()
		}
		// LOAD
		domainClaimRef01Ent := client.DomainClaim(nil)
		domainClaimRef01MatchDt0 := map[string]any{}
		domainClaimRef01DataDt0Loaded, err := domainClaimRef01Ent.Load(domainClaimRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if domainClaimRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"domain01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, domain_claimEntityLiveStrict, "Live entity test blocked: needs %s via GANDI_TEST_DOMAIN_CLAIM_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		domainClaimRef01Ent := client.DomainClaim(nil)
		domainClaimRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "domain_claim"}), "domain_claim_ref01"))
		domainClaimRef01Data["domain"] = setup.idmap["domain01"]

		domainClaimRef01DataResult, err := domainClaimRef01Ent.Create(domainClaimRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		domainClaimRef01Data = core.ToMapAny(entityData(domainClaimRef01DataResult))
		if domainClaimRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

		if setup.live {
			livePace()
		}
		// LOAD
		domainClaimRef01MatchDt0 := map[string]any{}
		domainClaimRef01DataDt0Loaded, err := domainClaimRef01Ent.Load(domainClaimRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if domainClaimRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func domain_claimBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "domain_claim", "DomainClaimTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read domain_claim test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse domain_claim test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"domain_claim01", "domain_claim02", "domain_claim03", "domain01", "domain02", "domain03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("GANDI_TEST_DOMAIN_CLAIM_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"GANDI_TEST_DOMAIN_CLAIM_ENTID": idmap,
		"GANDI_TEST_LIVE":      "FALSE",
		"GANDI_TEST_EXPLAIN":   "FALSE",
		"GANDI_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["GANDI_TEST_DOMAIN_CLAIM_ENTID"])
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
