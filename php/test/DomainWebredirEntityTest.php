<?php
declare(strict_types=1);

// DomainWebredir entity test

require_once __DIR__ . '/../gandi_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class DomainWebredirEntityTest extends TestCase
{
    // main.kit.test.live.strict is true (the default is true): a live
    // request that fails, or a live test missing an input it needs,
    // fails the test.
    // An account with no record for a test to read skips it either way.
    private const LIVE_STRICT = true;

    public function test_create_instance(): void
    {
        $testsdk = GandiSDK::test(null, null);
        $ent = $testsdk->DomainWebredir(null);
        $this->assertNotNull($ent);
    }

    public function test_validate(): void
    {
        $cfg = GandiConfig::shared_config();
        if (!isset($cfg["feature"]["validate"])) {
            $this->markTestSkipped('feature not present in this SDK: validate');
        }
        $client = GandiSDK::test(null, ["feature" => ["validate" => ["active" => true]]]);
        $err = null;
        try {
            $client->DomainWebredir(null)->list(["domain" => 1], null);
        } catch (\Throwable $e) {
            $err = $e;
        }
        $this->assertSame('validate_failed', $err->sdk_code ?? null);
    }

    public function test_basic_flow(): void
    {
        $setup = domain_webredir_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create", "list", "update", "load", "remove"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "domain_webredir." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        if (!empty($setup["live"]) && getenv('VOXGIG_GETONLY_GUARD') === "TRUE") {
            fwrite(STDOUT, 'LIVE STEP {"id":"domain_webredir.create.0","state":"excluded","attempted":false,"reason":"GET-only live run: needs POST /domain/domains/{domain}/webredirs"}' . "\n");
            fwrite(STDOUT, 'LIVE STEP {"id":"domain_webredir.update.2","state":"excluded","attempted":false,"reason":"GET-only live run: needs PATCH /domain/domains/{domain}/webredirs/{host}"}' . "\n");
            fwrite(STDOUT, 'LIVE STEP {"id":"domain_webredir.remove.4","state":"excluded","attempted":false,"reason":"GET-only live run: needs DELETE /domain/domains/{domain}/webredirs/{host}"}' . "\n");
        if (!empty($setup["live"])) {
            foreach (["domain01"] as $_liveKey) {
                if (!empty($setup["synthetic_only"]) || null === ($setup["idmap"][$_liveKey] ?? null)) {
                    Runner::live_miss(self::LIVE_STRICT, "Live entity test blocked: needs " . $_liveKey . " via GANDI_TEST_DOMAIN_WEBREDIR_ENTID");
                }
            }
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $domain_webredir_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.domain_webredir")));
        $domain_webredir_ref01_data = null;
        if (count($domain_webredir_ref01_data_raw) > 0) {
            $domain_webredir_ref01_data = Helpers::to_map($domain_webredir_ref01_data_raw[0][1]);
        }

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // LIST
        $domain_webredir_ref01_ent = $client->DomainWebredir(null);
        $domain_webredir_ref01_match = [
            "domain" => $setup["idmap"]["domain01"],
        ];

        $domain_webredir_ref01_list_result = $domain_webredir_ref01_ent->list($domain_webredir_ref01_match, null);
        $this->assertIsArray($domain_webredir_ref01_list_result);

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // LOAD
        $domain_webredir_ref01_match_dt0 = [];
        $domain_webredir_ref01_match_dt0["domain"] = $setup["idmap"]["domain"] ?? $setup["idmap"]["domain01"] ?? null;
        $domain_webredir_ref01_data_dt0_loaded = $domain_webredir_ref01_ent->load($domain_webredir_ref01_match_dt0, null);
        $this->assertNotNull($domain_webredir_ref01_data_dt0_loaded);

            return;
        }

        if (!empty($setup["live"])) {
            foreach (["domain01"] as $_liveKey) {
                if (!empty($setup["synthetic_only"]) || null === ($setup["idmap"][$_liveKey] ?? null)) {
                    Runner::live_miss(self::LIVE_STRICT, "Live entity test blocked: needs " . $_liveKey . " via GANDI_TEST_DOMAIN_WEBREDIR_ENTID");
                }
            }
        }
        $client = $setup["client"];

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // CREATE
        $domain_webredir_ref01_ent = $client->DomainWebredir(null);
        $domain_webredir_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.domain_webredir"), "domain_webredir_ref01"));
        $domain_webredir_ref01_data["domain"] = $setup["idmap"]["domain01"];

        $domain_webredir_ref01_data_result = $domain_webredir_ref01_ent->create($domain_webredir_ref01_data, null);
        $domain_webredir_ref01_data = Helpers::to_map(is_object($domain_webredir_ref01_data_result) && method_exists($domain_webredir_ref01_data_result, 'data_get') ? $domain_webredir_ref01_data_result->data_get() : $domain_webredir_ref01_data_result);
        $this->assertNotNull($domain_webredir_ref01_data);

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // LIST
        $domain_webredir_ref01_match = [
            "domain" => $setup["idmap"]["domain01"],
        ];

        $domain_webredir_ref01_list_result = $domain_webredir_ref01_ent->list($domain_webredir_ref01_match, null);
        $this->assertIsArray($domain_webredir_ref01_list_result);

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // UPDATE
        $domain_webredir_ref01_data_up0_up = [
            "domain" => $setup["idmap"]["domain"],
        ];

        $domain_webredir_ref01_markdef_up0_name = "cert_status";
        $domain_webredir_ref01_markdef_up0_value = "Mark01-domain_webredir_ref01_" . $setup["now"];
        $domain_webredir_ref01_data_up0_up[$domain_webredir_ref01_markdef_up0_name] = $domain_webredir_ref01_markdef_up0_value;

        $domain_webredir_ref01_resdata_up0_result = $domain_webredir_ref01_ent->update($domain_webredir_ref01_data_up0_up, null);
        $domain_webredir_ref01_resdata_up0 = Helpers::to_map(is_object($domain_webredir_ref01_resdata_up0_result) && method_exists($domain_webredir_ref01_resdata_up0_result, 'data_get') ? $domain_webredir_ref01_resdata_up0_result->data_get() : $domain_webredir_ref01_resdata_up0_result);
        $this->assertNotNull($domain_webredir_ref01_resdata_up0);
        $this->assertEquals($domain_webredir_ref01_resdata_up0[$domain_webredir_ref01_markdef_up0_name], $domain_webredir_ref01_markdef_up0_value);

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // LOAD
        $domain_webredir_ref01_match_dt0 = [];
        $domain_webredir_ref01_match_dt0["domain"] = $setup["idmap"]["domain"] ?? $setup["idmap"]["domain01"] ?? null;
        $domain_webredir_ref01_data_dt0_loaded = $domain_webredir_ref01_ent->load($domain_webredir_ref01_match_dt0, null);
        $this->assertNotNull($domain_webredir_ref01_data_dt0_loaded);

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // LIST
        $domain_webredir_ref01_match_rt0 = [
            "domain" => $setup["idmap"]["domain01"],
        ];

        $domain_webredir_ref01_list_rt0_result = $domain_webredir_ref01_ent->list($domain_webredir_ref01_match_rt0, null);
        $this->assertIsArray($domain_webredir_ref01_list_rt0_result);

    }
}

function domain_webredir_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/domain_webredir/DomainWebredirTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = GandiSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["domain_webredir01", "domain_webredir02", "domain_webredir03", "domain01", "domain02", "domain03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Whether *_ENTID supplied the idmap, read before env_override consumes
    // it: without it, the ids a live flow binds are the fixture's synthetic ones.
    $entid_env_raw = getenv("GANDI_TEST_DOMAIN_WEBREDIR_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "GANDI_TEST_DOMAIN_WEBREDIR_ENTID" => $idmap,
        "GANDI_TEST_LIVE" => "FALSE",
        "GANDI_TEST_EXPLAIN" => "FALSE",
        "GANDI_APIKEY" => "",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["GANDI_TEST_DOMAIN_WEBREDIR_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }
    if (!isset($idmap_resolved["domain"])) {
        $idmap_resolved["domain"] = $idmap_resolved["domain01"];
    }

    if ($env["GANDI_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            Runner::live_client_options(),
            [
                "apikey" => $env["GANDI_APIKEY"],
            ],
            // ismap, not a plain "?? []" default: an empty PHP array is a
            // LIST, and a non-map later entry REPLACES the accumulated map in
            // merge - so the no-extras call discarded live_client_options()
            // and the apikey/server map above it.
            Vs::ismap($extra) ? $extra : new \stdClass(),
        ]);
        // "?? []" because merge legitimately answers with a stdClass when every
        // contributing entry is an EMPTY map - an SDK with no apikey and no
        // server variables generates an empty middle entry, so that is the
        // common case, not the edge one. to_map returns null for a non-array by
        // design, and the constructor takes a non-nullable array, so without the
        // fallback every such SDK died on "must be of type array, null given"
        // the moment live mode was switched on. Offline mode never reaches this
        // branch, which is why the offline suite stayed green.
        $client = new GandiSDK(Helpers::to_map($merged_opts) ?? []);
    }

    $live = $env["GANDI_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["GANDI_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
