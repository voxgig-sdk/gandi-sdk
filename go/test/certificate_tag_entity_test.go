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
const certificate_tagEntityLiveStrict = true


func TestCertificateTagEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.CertificateTag(nil)
		if ent == nil {
			t.Fatal("expected non-nil CertificateTagEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.CertificateTag(nil).List(map[string]any{"certificate_id": 1}, nil)
		if sdkerr, ok := err.(*core.GandiError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := certificate_tagBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "certificate_tag." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"certificate_tag.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /certificate/issued-certs/{id}/tags\"}")
			t.Log("LIVE STEP {\"id\":\"certificate_tag.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /certificate/issued-certs/{id}/tags\"}")
			t.Log("LIVE STEP {\"id\":\"certificate_tag.remove.3\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /certificate/issued-certs/{id}/tags\"}")
		if setup.live {
			for _, _liveKey := range []string{"certificate01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, certificate_tagEntityLiveStrict, "Live entity test blocked: needs %s via GANDI_TEST_CERTIFICATE_TAG_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		// Bootstrap entity data from existing test data (no create step in flow).
		certificateTagRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.certificate_tag")))
		var certificateTagRef01Data map[string]any
		if len(certificateTagRef01DataRaw) > 0 {
			certificateTagRef01Data = core.ToMapAny(certificateTagRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = certificateTagRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		certificateTagRef01Ent := client.CertificateTag(nil)
		certificateTagRef01Match := map[string]any{
			"certificate_id": setup.idmap["certificate01"],
		}

		certificateTagRef01ListResult, err := certificateTagRef01Ent.List(certificateTagRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, certificateTagRef01ListOk := certificateTagRef01ListResult.([]any)
		if !certificateTagRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", certificateTagRef01ListResult)
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"certificate01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, certificate_tagEntityLiveStrict, "Live entity test blocked: needs %s via GANDI_TEST_CERTIFICATE_TAG_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		certificateTagRef01Ent := client.CertificateTag(nil)
		certificateTagRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "certificate_tag"}), "certificate_tag_ref01"))
		certificateTagRef01Data["certificate_id"] = setup.idmap["certificate01"]

		certificateTagRef01DataResult, err := certificateTagRef01Ent.Create(certificateTagRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		certificateTagRef01Data = core.ToMapAny(entityData(certificateTagRef01DataResult))
		if certificateTagRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

		if setup.live {
			livePace()
		}
		// LIST
		certificateTagRef01Match := map[string]any{
			"certificate_id": setup.idmap["certificate01"],
		}

		certificateTagRef01ListResult, err := certificateTagRef01Ent.List(certificateTagRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, certificateTagRef01ListOk := certificateTagRef01ListResult.([]any)
		if !certificateTagRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", certificateTagRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		certificateTagRef01DataUp0Up := map[string]any{
		}

		certificateTagRef01MarkdefUp0Name := "message"
		certificateTagRef01MarkdefUp0Value := fmt.Sprintf("Mark01-certificate_tag_ref01_%d", setup.now)
		certificateTagRef01DataUp0Up[certificateTagRef01MarkdefUp0Name] = certificateTagRef01MarkdefUp0Value

		certificateTagRef01ResdataUp0Result, err := certificateTagRef01Ent.Update(certificateTagRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		certificateTagRef01ResdataUp0 := core.ToMapAny(entityData(certificateTagRef01ResdataUp0Result))
		if certificateTagRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if certificateTagRef01ResdataUp0[certificateTagRef01MarkdefUp0Name] != certificateTagRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", certificateTagRef01MarkdefUp0Name, certificateTagRef01ResdataUp0[certificateTagRef01MarkdefUp0Name])
		}

		if setup.live {
			livePace()
		}

		if setup.live {
			livePace()
		}
		// LIST
		certificateTagRef01MatchRt0 := map[string]any{
			"certificate_id": setup.idmap["certificate01"],
		}

		certificateTagRef01ListRt0Result, err := certificateTagRef01Ent.List(certificateTagRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, certificateTagRef01ListRt0Ok := certificateTagRef01ListRt0Result.([]any)
		if !certificateTagRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", certificateTagRef01ListRt0Result)
		}

	})
}

func certificate_tagBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "certificate_tag", "CertificateTagTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read certificate_tag test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse certificate_tag test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"certificate_tag01", "certificate_tag02", "certificate_tag03", "certificate01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("GANDI_TEST_CERTIFICATE_TAG_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"GANDI_TEST_CERTIFICATE_TAG_ENTID": idmap,
		"GANDI_TEST_LIVE":      "FALSE",
		"GANDI_TEST_EXPLAIN":   "FALSE",
		"GANDI_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["GANDI_TEST_CERTIFICATE_TAG_ENTID"])
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
