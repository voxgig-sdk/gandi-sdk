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
const hosting_vhostEntityLiveStrict = true


func TestHostingVhostEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.HostingVhost(nil)
		if ent == nil {
			t.Fatal("expected non-nil HostingVhostEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.HostingVhost(nil).List(map[string]any{"instance_id": 1}, nil)
		if sdkerr, ok := err.(*core.GandiError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := hosting_vhostBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "hosting_vhost." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"hosting_vhost.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /simplehosting/instances/{instance_id}/vhosts\"}")
			t.Log("LIVE STEP {\"id\":\"hosting_vhost.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PATCH /simplehosting/instances/{instance_id}/vhosts/{vhost_fqdn}\"}")
			t.Log("LIVE STEP {\"id\":\"hosting_vhost.remove.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /simplehosting/instances/{instance_id}/vhosts/{vhost_fqdn}\"}")
		if setup.live {
			for _, _liveKey := range []string{"instance01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, hosting_vhostEntityLiveStrict, "Live entity test blocked: needs %s via GANDI_TEST_HOSTING_VHOST_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		// Bootstrap entity data from existing test data (no create step in flow).
		hostingVhostRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.hosting_vhost")))
		var hostingVhostRef01Data map[string]any
		if len(hostingVhostRef01DataRaw) > 0 {
			hostingVhostRef01Data = core.ToMapAny(hostingVhostRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = hostingVhostRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		hostingVhostRef01Ent := client.HostingVhost(nil)
		hostingVhostRef01Match := map[string]any{
			"instance_id": setup.idmap["instance01"],
		}

		hostingVhostRef01ListResult, err := hostingVhostRef01Ent.List(hostingVhostRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, hostingVhostRef01ListOk := hostingVhostRef01ListResult.([]any)
		if !hostingVhostRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", hostingVhostRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// LOAD
		hostingVhostRef01MatchDt0 := map[string]any{}
		if v := setup.idmap["instance_id"]; v != nil {
			hostingVhostRef01MatchDt0["instance_id"] = v
		} else {
			hostingVhostRef01MatchDt0["instance_id"] = setup.idmap["instance01"]
		}
		hostingVhostRef01DataDt0Loaded, err := hostingVhostRef01Ent.Load(hostingVhostRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if hostingVhostRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"instance01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, hosting_vhostEntityLiveStrict, "Live entity test blocked: needs %s via GANDI_TEST_HOSTING_VHOST_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		hostingVhostRef01Ent := client.HostingVhost(nil)
		hostingVhostRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "hosting_vhost"}), "hosting_vhost_ref01"))
		hostingVhostRef01Data["instance_id"] = setup.idmap["instance01"]

		hostingVhostRef01DataResult, err := hostingVhostRef01Ent.Create(hostingVhostRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		hostingVhostRef01Data = core.ToMapAny(entityData(hostingVhostRef01DataResult))
		if hostingVhostRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

		if setup.live {
			livePace()
		}
		// LIST
		hostingVhostRef01Match := map[string]any{
			"instance_id": setup.idmap["instance01"],
		}

		hostingVhostRef01ListResult, err := hostingVhostRef01Ent.List(hostingVhostRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, hostingVhostRef01ListOk := hostingVhostRef01ListResult.([]any)
		if !hostingVhostRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", hostingVhostRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		hostingVhostRef01DataUp0Up := map[string]any{
			"instance_id": setup.idmap["instance_id"],
		}

		hostingVhostRef01MarkdefUp0Name := "created_at"
		hostingVhostRef01MarkdefUp0Value := fmt.Sprintf("Mark01-hosting_vhost_ref01_%d", setup.now)
		hostingVhostRef01DataUp0Up[hostingVhostRef01MarkdefUp0Name] = hostingVhostRef01MarkdefUp0Value

		hostingVhostRef01ResdataUp0Result, err := hostingVhostRef01Ent.Update(hostingVhostRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		hostingVhostRef01ResdataUp0 := core.ToMapAny(entityData(hostingVhostRef01ResdataUp0Result))
		if hostingVhostRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if hostingVhostRef01ResdataUp0[hostingVhostRef01MarkdefUp0Name] != hostingVhostRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", hostingVhostRef01MarkdefUp0Name, hostingVhostRef01ResdataUp0[hostingVhostRef01MarkdefUp0Name])
		}

		if setup.live {
			livePace()
		}
		// LOAD
		hostingVhostRef01MatchDt0 := map[string]any{}
		if v := setup.idmap["instance_id"]; v != nil {
			hostingVhostRef01MatchDt0["instance_id"] = v
		} else {
			hostingVhostRef01MatchDt0["instance_id"] = setup.idmap["instance01"]
		}
		hostingVhostRef01DataDt0Loaded, err := hostingVhostRef01Ent.Load(hostingVhostRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if hostingVhostRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

		if setup.live {
			livePace()
		}

		if setup.live {
			livePace()
		}
		// LIST
		hostingVhostRef01MatchRt0 := map[string]any{
			"instance_id": setup.idmap["instance01"],
		}

		hostingVhostRef01ListRt0Result, err := hostingVhostRef01Ent.List(hostingVhostRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, hostingVhostRef01ListRt0Ok := hostingVhostRef01ListRt0Result.([]any)
		if !hostingVhostRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", hostingVhostRef01ListRt0Result)
		}

	})
}

func hosting_vhostBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "hosting_vhost", "HostingVhostTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read hosting_vhost test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse hosting_vhost test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"hosting_vhost01", "hosting_vhost02", "hosting_vhost03", "instance01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("GANDI_TEST_HOSTING_VHOST_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"GANDI_TEST_HOSTING_VHOST_ENTID": idmap,
		"GANDI_TEST_LIVE":      "FALSE",
		"GANDI_TEST_EXPLAIN":   "FALSE",
		"GANDI_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["GANDI_TEST_HOSTING_VHOST_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}
	// Add instance_id alias for update test.
	if idmapResolved["instance_id"] == nil {
		idmapResolved["instance_id"] = idmapResolved["instance01"]
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
