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
const organization_customerEntityLiveStrict = true


func TestOrganizationCustomerEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.OrganizationCustomer(nil)
		if ent == nil {
			t.Fatal("expected non-nil OrganizationCustomerEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.OrganizationCustomer(nil).List(map[string]any{"org_id": 1}, nil)
		if sdkerr, ok := err.(*core.GandiError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := organization_customerBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "organization_customer." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"organization_customer.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /organization/organizations/{org_id}/customers\"}")
			t.Log("LIVE STEP {\"id\":\"organization_customer.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PATCH /organization/organizations/{org_id}/customers/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"organization_customer.remove.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /organization/organizations/{org_id}/customers/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"organization_customer.list.5\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}")
		if setup.live {
			for _, _liveKey := range []string{"org01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, organization_customerEntityLiveStrict, "Live entity test blocked: needs %s via GANDI_TEST_ORGANIZATION_CUSTOMER_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client
		if setup.live {
			var _liveId any
			if !setup.syntheticOnly {
				_liveId = setup.idmap["organization_customer01"]
			}
			livePace()
			liveExisting(t, organization_customerEntityLiveStrict, setup.data, "organization_customer", "id", _liveId,
				func() (any, error) {
					return client.OrganizationCustomer(nil).List(map[string]any{"org_id": setup.idmap["org01"]}, nil)
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		organizationCustomerRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.organization_customer")))
		var organizationCustomerRef01Data map[string]any
		if len(organizationCustomerRef01DataRaw) > 0 {
			organizationCustomerRef01Data = core.ToMapAny(organizationCustomerRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = organizationCustomerRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		organizationCustomerRef01Ent := client.OrganizationCustomer(nil)
		organizationCustomerRef01Match := map[string]any{
			"org_id": setup.idmap["org01"],
		}

		organizationCustomerRef01ListResult, err := organizationCustomerRef01Ent.List(organizationCustomerRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, organizationCustomerRef01ListOk := organizationCustomerRef01ListResult.([]any)
		if !organizationCustomerRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", organizationCustomerRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// LOAD
		organizationCustomerRef01MatchDt0 := map[string]any{
			"id": organizationCustomerRef01Data["id"],
		}
		if v := setup.idmap["org_id"]; v != nil {
			organizationCustomerRef01MatchDt0["org_id"] = v
		} else {
			organizationCustomerRef01MatchDt0["org_id"] = setup.idmap["org01"]
		}
		organizationCustomerRef01DataDt0Loaded, err := organizationCustomerRef01Ent.Load(organizationCustomerRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		organizationCustomerRef01DataDt0LoadResult := core.ToMapAny(entityData(organizationCustomerRef01DataDt0Loaded))
		if organizationCustomerRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(organizationCustomerRef01DataDt0LoadResult["id"], organizationCustomerRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"org01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, organization_customerEntityLiveStrict, "Live entity test blocked: needs %s via GANDI_TEST_ORGANIZATION_CUSTOMER_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		organizationCustomerRef01Ent := client.OrganizationCustomer(nil)
		organizationCustomerRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "organization_customer"}), "organization_customer_ref01"))
		organizationCustomerRef01Data["org_id"] = setup.idmap["org01"]

		organizationCustomerRef01DataResult, err := organizationCustomerRef01Ent.Create(organizationCustomerRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		organizationCustomerRef01Data = core.ToMapAny(entityData(organizationCustomerRef01DataResult))
		if organizationCustomerRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if organizationCustomerRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LIST
		organizationCustomerRef01Match := map[string]any{
			"org_id": setup.idmap["org01"],
		}

		organizationCustomerRef01ListResult, err := organizationCustomerRef01Ent.List(organizationCustomerRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		organizationCustomerRef01List, organizationCustomerRef01ListOk := organizationCustomerRef01ListResult.([]any)
		if !organizationCustomerRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", organizationCustomerRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(organizationCustomerRef01List), map[string]any{"id": organizationCustomerRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		organizationCustomerRef01DataUp0Up := map[string]any{
			"id": organizationCustomerRef01Data["id"],
			"org_id": setup.idmap["org_id"],
		}

		organizationCustomerRef01MarkdefUp0Name := "city"
		organizationCustomerRef01MarkdefUp0Value := fmt.Sprintf("Mark01-organization_customer_ref01_%d", setup.now)
		organizationCustomerRef01DataUp0Up[organizationCustomerRef01MarkdefUp0Name] = organizationCustomerRef01MarkdefUp0Value

		organizationCustomerRef01ResdataUp0Result, err := organizationCustomerRef01Ent.Update(organizationCustomerRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		organizationCustomerRef01ResdataUp0 := core.ToMapAny(entityData(organizationCustomerRef01ResdataUp0Result))
		if organizationCustomerRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !liveSameId(organizationCustomerRef01ResdataUp0["id"], organizationCustomerRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}
		if organizationCustomerRef01ResdataUp0[organizationCustomerRef01MarkdefUp0Name] != organizationCustomerRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", organizationCustomerRef01MarkdefUp0Name, organizationCustomerRef01ResdataUp0[organizationCustomerRef01MarkdefUp0Name])
		}

		if setup.live {
			livePace()
		}
		// LOAD
		organizationCustomerRef01MatchDt0 := map[string]any{
			"id": organizationCustomerRef01Data["id"],
		}
		if v := setup.idmap["org_id"]; v != nil {
			organizationCustomerRef01MatchDt0["org_id"] = v
		} else {
			organizationCustomerRef01MatchDt0["org_id"] = setup.idmap["org01"]
		}
		organizationCustomerRef01DataDt0Loaded, err := organizationCustomerRef01Ent.Load(organizationCustomerRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		organizationCustomerRef01DataDt0LoadResult := core.ToMapAny(entityData(organizationCustomerRef01DataDt0Loaded))
		if organizationCustomerRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(organizationCustomerRef01DataDt0LoadResult["id"], organizationCustomerRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		if setup.live {
			livePace()
		}
		// REMOVE
		organizationCustomerRef01MatchRm0 := map[string]any{
			"id": organizationCustomerRef01Data["id"],
		}
		if v := setup.idmap["org_id"]; v != nil {
			organizationCustomerRef01MatchRm0["org_id"] = v
		} else {
			organizationCustomerRef01MatchRm0["org_id"] = setup.idmap["org01"]
		}
		_, err = organizationCustomerRef01Ent.Remove(organizationCustomerRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		if setup.live {
			livePace()
		}
		// LIST
		organizationCustomerRef01MatchRt0 := map[string]any{
			"org_id": setup.idmap["org01"],
		}

		organizationCustomerRef01ListRt0Result, err := organizationCustomerRef01Ent.List(organizationCustomerRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		organizationCustomerRef01ListRt0, organizationCustomerRef01ListRt0Ok := organizationCustomerRef01ListRt0Result.([]any)
		if !organizationCustomerRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", organizationCustomerRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(organizationCustomerRef01ListRt0), map[string]any{"id": organizationCustomerRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func organization_customerBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "organization_customer", "OrganizationCustomerTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read organization_customer test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse organization_customer test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"organization_customer01", "organization_customer02", "organization_customer03", "organization01", "organization02", "organization03", "org01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("GANDI_TEST_ORGANIZATION_CUSTOMER_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"GANDI_TEST_ORGANIZATION_CUSTOMER_ENTID": idmap,
		"GANDI_TEST_LIVE":      "FALSE",
		"GANDI_TEST_EXPLAIN":   "FALSE",
		"GANDI_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["GANDI_TEST_ORGANIZATION_CUSTOMER_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}
	// Add org_id alias for update test.
	if idmapResolved["org_id"] == nil {
		idmapResolved["org_id"] = idmapResolved["org01"]
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
