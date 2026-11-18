<?php
declare(strict_types=1);

// Comment entity test

require_once __DIR__ . '/../gandi_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class CommentEntityTest extends TestCase
{
    // main.kit.test.live.strict is true (the default is true): a live
    // request that fails, or a live test missing an input it needs,
    // fails the test.
    // An account with no record for a test to read skips it either way.
    private const LIVE_STRICT = true;

    public function test_create_instance(): void
    {
        $testsdk = GandiSDK::test(null, null);
        $ent = $testsdk->Comment(null);
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
            $client->Comment(null)->load(["entity_id" => 1], null);
        } catch (\Throwable $e) {
            $err = $e;
        }
        $this->assertSame('validate_failed', $err->sdk_code ?? null);
    }

    public function test_basic_flow(): void
    {
        $setup = comment_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create", "load", "remove"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "comment." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        if (!empty($setup["live"]) && getenv('VOXGIG_GETONLY_GUARD') === "TRUE") {
            fwrite(STDOUT, 'LIVE STEP {"id":"comment.create.0","state":"excluded","attempted":false,"reason":"GET-only live run: needs POST /comment/comments/{id}"}' . "\n");
            fwrite(STDOUT, 'LIVE STEP {"id":"comment.load.1","state":"excluded","attempted":false,"reason":"GET-only live run: reads a record only comment.create.0 gives"}' . "\n");
            fwrite(STDOUT, 'LIVE STEP {"id":"comment.remove.2","state":"excluded","attempted":false,"reason":"GET-only live run: needs DELETE /comment/comments/{id}"}' . "\n");
            $this->markTestSkipped('Live coverage incomplete: comment.create.0 excluded (GET-only live run: needs POST /comment/comments/{id}); comment.load.1 excluded (GET-only live run: reads a record only comment.create.0 gives); comment.remove.2 excluded (GET-only live run: needs DELETE /comment/comments/{id})');
        }

        if (!empty($setup["live"])) {
            foreach (["entity01"] as $_liveKey) {
                if (!empty($setup["synthetic_only"]) || null === ($setup["idmap"][$_liveKey] ?? null)) {
                    Runner::live_miss(self::LIVE_STRICT, "Live entity test blocked: needs " . $_liveKey . " via GANDI_TEST_COMMENT_ENTID");
                }
            }
        }
        $client = $setup["client"];

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // CREATE
        $comment_ref01_ent = $client->Comment(null);
        $comment_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.comment"), "comment_ref01"));
        $comment_ref01_data["entity_id"] = $setup["idmap"]["entity01"];

        $comment_ref01_data_result = $comment_ref01_ent->create($comment_ref01_data, null);
        $comment_ref01_data = Helpers::to_map(is_object($comment_ref01_data_result) && method_exists($comment_ref01_data_result, 'data_get') ? $comment_ref01_data_result->data_get() : $comment_ref01_data_result);
        $this->assertNotNull($comment_ref01_data);
        $this->assertNotNull($comment_ref01_data["id"]);

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // LOAD
        $comment_ref01_match_dt0 = [
            "id" => $comment_ref01_data["id"],
        ];
        $comment_ref01_data_dt0_loaded = $comment_ref01_ent->load($comment_ref01_match_dt0, null);
        $comment_ref01_data_dt0_load_result = Helpers::to_map(is_object($comment_ref01_data_dt0_loaded) && method_exists($comment_ref01_data_dt0_loaded, 'data_get') ? $comment_ref01_data_dt0_loaded->data_get() : $comment_ref01_data_dt0_loaded);
        $this->assertNotNull($comment_ref01_data_dt0_load_result);
        $this->assertTrue(Runner::live_same_id($comment_ref01_data_dt0_load_result["id"] ?? null, $comment_ref01_data["id"]));

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // REMOVE
        $comment_ref01_match_rm0 = [
            "id" => $comment_ref01_data["id"],
        ];
        $comment_ref01_ent->remove($comment_ref01_match_rm0, null);

    }
}

function comment_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/comment/CommentTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = GandiSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["comment01", "comment02", "comment03", "entity01"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Whether *_ENTID supplied the idmap, read before env_override consumes
    // it: without it, the ids a live flow binds are the fixture's synthetic ones.
    $entid_env_raw = getenv("GANDI_TEST_COMMENT_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "GANDI_TEST_COMMENT_ENTID" => $idmap,
        "GANDI_TEST_LIVE" => "FALSE",
        "GANDI_TEST_EXPLAIN" => "FALSE",
        "GANDI_APIKEY" => "",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["GANDI_TEST_COMMENT_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
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
