<?php
declare(strict_types=1);

// HostingInstance entity test

require_once __DIR__ . '/../gandi_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class HostingInstanceEntityTestFailHook extends GandiBaseFeature
{
    public int $unexpected = 0;

    public function __construct()
    {
        parent::__construct();
        $this->name = 'failhook';
    }

    public function init(GandiContext $ctx, array $options): void
    {
    }

    public function PreSpec(GandiContext $ctx): void
    {
        throw new \RuntimeException('hosting_instance hook failed');
    }

    public function PreUnexpected(GandiContext $ctx): void
    {
        $this->unexpected++;
    }
}

class HostingInstanceEntityTest extends TestCase
{
    // main.kit.test.live.strict is true (the default is true): a live
    // request that fails, or a live test missing an input it needs,
    // fails the test.
    // An account with no record for a test to read skips it either way.
    private const LIVE_STRICT = true;

    public function test_create_instance(): void
    {
        $testsdk = GandiSDK::test(null, null);
        $ent = $testsdk->HostingInstance(null);
        $this->assertNotNull($ent);
    }

    // Feature #4: the entity stream(action, ...) method runs the op pipeline
    // and yields result items. With the streaming feature active it yields the
    // feature's incremental output; otherwise it falls back to the materialised
    // list so stream always yields.
    public function test_stream(): void
    {
        $seed = [
            "entity" => [
                "hosting_instance" => [
                    "s1" => ["id" => "s1"],
                    "s2" => ["id" => "s2"],
                    "s3" => ["id" => "s3"],
                ],
            ],
        ];

        // Fallback: streaming inactive -> yields the materialised list items.
        $base = GandiSDK::test($seed, null);
        $seen = iterator_to_array($base->HostingInstance(null)->stream("list", null, null), false);
        $this->assertCount(3, $seen);

        // Inbound: streaming active -> yields each item from the feature.
        $cfg = GandiConfig::shared_config();
        if (isset($cfg["feature"]) && is_array($cfg["feature"]) && isset($cfg["feature"]["streaming"])) {
            $sdk = GandiSDK::test($seed, ["feature" => ["streaming" => ["active" => true]]]);
            $got = [];
            foreach ($sdk->HostingInstance(null)->stream("list", null, null) as $item) {
                if (is_array($item) && array_is_list($item)) {
                    foreach ($item as $sub) {
                        $got[] = $sub;
                    }
                } else {
                    $got[] = $item;
                }
            }
            $this->assertCount(3, $got);
        }
    }

    public function test_stream_error(): void
    {
        $offline = ["net" => ["offline" => true]];
        $streamerr = null;
        try {
            iterator_to_array(GandiSDK::test($offline, null)->HostingInstance(null)
                ->stream("list", null, null), false);
        } catch (\Throwable $e) {
            $streamerr = $e;
        }
        $this->assertNotNull($streamerr, 'the stream should raise the transport failure');
        $this->assertStringContainsString('offline', $streamerr->getMessage());

        iterator_to_array(GandiSDK::test($offline, null)->HostingInstance(null)
            ->stream("list", null, ["ctrl" => ["throw" => false]]), false);

        $cfg = GandiConfig::shared_config();
        if (isset($cfg["feature"]["rbac"])) {
            $denied = GandiSDK::test(null, ["feature" => ["rbac" => ["active" => true, "deny" => true]]]);
            $denyerr = null;
            try {
                iterator_to_array($denied->HostingInstance(null)->stream("list", null, null), false);
            } catch (\Throwable $e) {
                $denyerr = $e;
            }
            $this->assertSame('rbac_denied', $denyerr->sdk_code ?? null);
        }
    }

    public function test_stream_ctrl(): void
    {
        $ctrl = ["explain" => []];
        iterator_to_array(GandiSDK::test(null, null)->HostingInstance(null)
            ->stream("list", null, ["ctrl" => $ctrl]), false);
        $this->assertSame(["explain"], array_keys($ctrl));
    }

    public function test_unexpected(): void
    {
        $hook = new HostingInstanceEntityTestFailHook();
        $client = new GandiSDK(["feature" => ["test" => ["active" => true]], "extend" => [$hook]]);

        $err = null;
        try {
            $client->HostingInstance(null)->list(null, null);
        } catch (\Throwable $e) {
            $err = $e;
        }
        $this->assertNotNull($err, 'the throwing hook should fail the operation');
        $this->assertStringContainsString('hook failed', $err->getMessage());
        $this->assertGreaterThan(0, $hook->unexpected, 'PreUnexpected did not fire');

        $fired = $hook->unexpected;
        $this->assertNull($client->HostingInstance(null)->list(null, ["throw" => false]));
        $this->assertGreaterThan($fired, $hook->unexpected, 'PreUnexpected did not fire');
    }

    public function test_cost_commits_a_throwing_transport(): void
    {
        $cfg = GandiConfig::shared_config();
        if (!isset($cfg["feature"]["cost"])) {
            $this->markTestSkipped('feature not present in this SDK: cost');
        }
        $client = new GandiSDK([
            "test" => ["active" => true],
            "feature" => ["cost" => ["active" => true, "unit" => 1]],
            "utility" => ["fetcher" => function ($ctx, $url, $fetchdef) {
                throw new \RuntimeException('hosting_instance transport failed');
            }],
        ]);

        $err = null;
        try {
            $client->HostingInstance(null)->list(null, null);
        } catch (\Throwable $e) {
            $err = $e;
        }
        $this->assertInstanceOf(GandiError::class, $err);
        $this->assertStringContainsString('transport failed', $err->getMessage());

        $client->HostingInstance(null)->list(null, ["throw" => false]);
        $this->assertSame(2, $client->_cost["total"]["calls"]);
        $this->assertSame(2, $client->_cost["total"]["attempts"]);
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
            $client->HostingInstance(null)->list(["fqdn" => 1], null);
        } catch (\Throwable $e) {
            $err = $e;
        }
        $this->assertSame('validate_failed', $err->sdk_code ?? null);
    }

    public function test_basic_flow(): void
    {
        $setup = hosting_instance_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create", "list", "update", "load", "remove"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "hosting_instance." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        if (!empty($setup["live"]) && getenv('VOXGIG_GETONLY_GUARD') === "TRUE") {
            fwrite(STDOUT, 'LIVE STEP {"id":"hosting_instance.create.0","state":"excluded","attempted":false,"reason":"GET-only live run: needs POST /simplehosting/instances/{instance_id}/action"}' . "\n");
            fwrite(STDOUT, 'LIVE STEP {"id":"hosting_instance.update.2","state":"excluded","attempted":false,"reason":"GET-only live run: needs PATCH /simplehosting/instances/{instance_id}"}' . "\n");
            fwrite(STDOUT, 'LIVE STEP {"id":"hosting_instance.remove.4","state":"excluded","attempted":false,"reason":"GET-only live run: needs DELETE /simplehosting/instances/{instance_id}"}' . "\n");
            fwrite(STDOUT, 'LIVE STEP {"id":"hosting_instance.list.5","state":"excluded","attempted":false,"reason":"GET-only live run: checks a removal this run does not make"}' . "\n");
        $client = $setup["client"];
        if (!empty($setup["live"])) {
            $_liveId = empty($setup["synthetic_only"]) ? ($setup["idmap"]["hosting_instance01"] ?? null) : null;
            Runner::live_pace();
            Runner::live_existing($setup, self::LIVE_STRICT, "hosting_instance",
                fn() => $client->HostingInstance(null)->list([], null), "id", $_liveId);
        }

        // Bootstrap entity data from existing test data.
        $hosting_instance_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.hosting_instance")));
        $hosting_instance_ref01_data = null;
        if (count($hosting_instance_ref01_data_raw) > 0) {
            $hosting_instance_ref01_data = Helpers::to_map($hosting_instance_ref01_data_raw[0][1]);
        }

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // LIST
        $hosting_instance_ref01_ent = $client->HostingInstance(null);
        $hosting_instance_ref01_match = [];

        $hosting_instance_ref01_list_result = $hosting_instance_ref01_ent->list($hosting_instance_ref01_match, null);
        $this->assertIsArray($hosting_instance_ref01_list_result);

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // LOAD
        $hosting_instance_ref01_match_dt0 = [
            "id" => $hosting_instance_ref01_data["id"],
        ];
        $hosting_instance_ref01_data_dt0_loaded = $hosting_instance_ref01_ent->load($hosting_instance_ref01_match_dt0, null);
        $hosting_instance_ref01_data_dt0_load_result = Helpers::to_map(is_object($hosting_instance_ref01_data_dt0_loaded) && method_exists($hosting_instance_ref01_data_dt0_loaded, 'data_get') ? $hosting_instance_ref01_data_dt0_loaded->data_get() : $hosting_instance_ref01_data_dt0_loaded);
        $this->assertNotNull($hosting_instance_ref01_data_dt0_load_result);
        $this->assertTrue(Runner::live_same_id($hosting_instance_ref01_data_dt0_load_result["id"] ?? null, $hosting_instance_ref01_data["id"]));

            return;
        }

        $client = $setup["client"];

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // CREATE
        $hosting_instance_ref01_ent = $client->HostingInstance(null);
        $hosting_instance_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.hosting_instance"), "hosting_instance_ref01"));

        $hosting_instance_ref01_data_result = $hosting_instance_ref01_ent->create($hosting_instance_ref01_data, null);
        $hosting_instance_ref01_data = Helpers::to_map(is_object($hosting_instance_ref01_data_result) && method_exists($hosting_instance_ref01_data_result, 'data_get') ? $hosting_instance_ref01_data_result->data_get() : $hosting_instance_ref01_data_result);
        $this->assertNotNull($hosting_instance_ref01_data);
        $this->assertNotNull($hosting_instance_ref01_data["id"]);

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // LIST
        $hosting_instance_ref01_match = [];

        $hosting_instance_ref01_list_result = $hosting_instance_ref01_ent->list($hosting_instance_ref01_match, null);
        $this->assertIsArray($hosting_instance_ref01_list_result);

        $found_item = sdk_select(
            Runner::entity_list_to_data($hosting_instance_ref01_list_result),
            ["id" => $hosting_instance_ref01_data["id"]]);
        $this->assertNotEmpty($found_item);

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // UPDATE
        $hosting_instance_ref01_data_up0_up = [
            "id" => $hosting_instance_ref01_data["id"],
        ];

        $hosting_instance_ref01_markdef_up0_name = "created_at";
        $hosting_instance_ref01_markdef_up0_value = "Mark01-hosting_instance_ref01_" . $setup["now"];
        $hosting_instance_ref01_data_up0_up[$hosting_instance_ref01_markdef_up0_name] = $hosting_instance_ref01_markdef_up0_value;

        $hosting_instance_ref01_resdata_up0_result = $hosting_instance_ref01_ent->update($hosting_instance_ref01_data_up0_up, null);
        $hosting_instance_ref01_resdata_up0 = Helpers::to_map(is_object($hosting_instance_ref01_resdata_up0_result) && method_exists($hosting_instance_ref01_resdata_up0_result, 'data_get') ? $hosting_instance_ref01_resdata_up0_result->data_get() : $hosting_instance_ref01_resdata_up0_result);
        $this->assertNotNull($hosting_instance_ref01_resdata_up0);
        $this->assertTrue(Runner::live_same_id($hosting_instance_ref01_resdata_up0["id"] ?? null, $hosting_instance_ref01_data_up0_up["id"]));
        $this->assertEquals($hosting_instance_ref01_resdata_up0[$hosting_instance_ref01_markdef_up0_name], $hosting_instance_ref01_markdef_up0_value);

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // LOAD
        $hosting_instance_ref01_match_dt0 = [
            "id" => $hosting_instance_ref01_data["id"],
        ];
        $hosting_instance_ref01_data_dt0_loaded = $hosting_instance_ref01_ent->load($hosting_instance_ref01_match_dt0, null);
        $hosting_instance_ref01_data_dt0_load_result = Helpers::to_map(is_object($hosting_instance_ref01_data_dt0_loaded) && method_exists($hosting_instance_ref01_data_dt0_loaded, 'data_get') ? $hosting_instance_ref01_data_dt0_loaded->data_get() : $hosting_instance_ref01_data_dt0_loaded);
        $this->assertNotNull($hosting_instance_ref01_data_dt0_load_result);
        $this->assertTrue(Runner::live_same_id($hosting_instance_ref01_data_dt0_load_result["id"] ?? null, $hosting_instance_ref01_data["id"]));

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // REMOVE
        $hosting_instance_ref01_match_rm0 = [
            "id" => $hosting_instance_ref01_data["id"],
        ];
        $hosting_instance_ref01_ent->remove($hosting_instance_ref01_match_rm0, null);

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // LIST
        $hosting_instance_ref01_match_rt0 = [];

        $hosting_instance_ref01_list_rt0_result = $hosting_instance_ref01_ent->list($hosting_instance_ref01_match_rt0, null);
        $this->assertIsArray($hosting_instance_ref01_list_rt0_result);

        $not_found_item = sdk_select(
            Runner::entity_list_to_data($hosting_instance_ref01_list_rt0_result),
            ["id" => $hosting_instance_ref01_data["id"]]);
        $this->assertEmpty($not_found_item);

    }
}

function hosting_instance_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/hosting_instance/HostingInstanceTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = GandiSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["hosting_instance01", "hosting_instance02", "hosting_instance03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Whether *_ENTID supplied the idmap, read before env_override consumes
    // it: without it, the ids a live flow binds are the fixture's synthetic ones.
    $entid_env_raw = getenv("GANDI_TEST_HOSTING_INSTANCE_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "GANDI_TEST_HOSTING_INSTANCE_ENTID" => $idmap,
        "GANDI_TEST_LIVE" => "FALSE",
        "GANDI_TEST_EXPLAIN" => "FALSE",
        "GANDI_APIKEY" => "",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["GANDI_TEST_HOSTING_INSTANCE_ENTID"]);
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
