<?php
declare(strict_types=1);

// MailboxForward entity test

require_once __DIR__ . '/../gandi_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class MailboxForwardEntityTestFailHook extends GandiBaseFeature
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
        throw new \RuntimeException('mailbox_forward hook failed');
    }

    public function PreUnexpected(GandiContext $ctx): void
    {
        $this->unexpected++;
    }
}

class MailboxForwardEntityTest extends TestCase
{
    // main.kit.test.live.strict is true (the default is true): a live
    // request that fails, or a live test missing an input it needs,
    // fails the test.
    // An account with no record for a test to read skips it either way.
    private const LIVE_STRICT = true;

    public function test_create_instance(): void
    {
        $testsdk = GandiSDK::test(null, null);
        $ent = $testsdk->MailboxForward(null);
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
                "mailbox_forward" => [
                    "s1" => ["id" => "s1"],
                    "s2" => ["id" => "s2"],
                    "s3" => ["id" => "s3"],
                ],
            ],
        ];

        // Fallback: streaming inactive -> yields the materialised list items.
        $base = GandiSDK::test($seed, null);
        $seen = iterator_to_array($base->MailboxForward(null)->stream("list", null, null), false);
        $this->assertCount(3, $seen);

        // Inbound: streaming active -> yields each item from the feature.
        $cfg = GandiConfig::shared_config();
        if (isset($cfg["feature"]) && is_array($cfg["feature"]) && isset($cfg["feature"]["streaming"])) {
            $sdk = GandiSDK::test($seed, ["feature" => ["streaming" => ["active" => true]]]);
            $got = [];
            foreach ($sdk->MailboxForward(null)->stream("list", null, null) as $item) {
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
            iterator_to_array(GandiSDK::test($offline, null)->MailboxForward(null)
                ->stream("list", null, null), false);
        } catch (\Throwable $e) {
            $streamerr = $e;
        }
        $this->assertNotNull($streamerr, 'the stream should raise the transport failure');
        $this->assertStringContainsString('offline', $streamerr->getMessage());

        iterator_to_array(GandiSDK::test($offline, null)->MailboxForward(null)
            ->stream("list", null, ["ctrl" => ["throw" => false]]), false);

        $cfg = GandiConfig::shared_config();
        if (isset($cfg["feature"]["rbac"])) {
            $denied = GandiSDK::test(null, ["feature" => ["rbac" => ["active" => true, "deny" => true]]]);
            $denyerr = null;
            try {
                iterator_to_array($denied->MailboxForward(null)->stream("list", null, null), false);
            } catch (\Throwable $e) {
                $denyerr = $e;
            }
            $this->assertSame('rbac_denied', $denyerr->sdk_code ?? null);
        }
    }

    public function test_stream_ctrl(): void
    {
        $ctrl = ["explain" => []];
        iterator_to_array(GandiSDK::test(null, null)->MailboxForward(null)
            ->stream("list", null, ["ctrl" => $ctrl]), false);
        $this->assertSame(["explain"], array_keys($ctrl));
    }

    public function test_unexpected(): void
    {
        $hook = new MailboxForwardEntityTestFailHook();
        $client = new GandiSDK(["feature" => ["test" => ["active" => true]], "extend" => [$hook]]);

        $err = null;
        try {
            $client->MailboxForward(null)->list(null, null);
        } catch (\Throwable $e) {
            $err = $e;
        }
        $this->assertNotNull($err, 'the throwing hook should fail the operation');
        $this->assertStringContainsString('hook failed', $err->getMessage());
        $this->assertGreaterThan(0, $hook->unexpected, 'PreUnexpected did not fire');

        $fired = $hook->unexpected;
        $this->assertNull($client->MailboxForward(null)->list(null, ["throw" => false]));
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
                throw new \RuntimeException('mailbox_forward transport failed');
            }],
        ]);

        $err = null;
        try {
            $client->MailboxForward(null)->list(null, null);
        } catch (\Throwable $e) {
            $err = $e;
        }
        $this->assertInstanceOf(GandiError::class, $err);
        $this->assertStringContainsString('transport failed', $err->getMessage());

        $client->MailboxForward(null)->list(null, ["throw" => false]);
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
            $client->MailboxForward(null)->list(["page" => 'x'], null);
        } catch (\Throwable $e) {
            $err = $e;
        }
        $this->assertSame('validate_failed', $err->sdk_code ?? null);
    }

    public function test_basic_flow(): void
    {
        $setup = mailbox_forward_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create", "list", "update", "remove"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "mailbox_forward." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        if (!empty($setup["live"]) && getenv('VOXGIG_GETONLY_GUARD') === "TRUE") {
            fwrite(STDOUT, 'LIVE STEP {"id":"mailbox_forward.create.0","state":"excluded","attempted":false,"reason":"GET-only live run: needs POST /mailbox/forwards"}' . "\n");
            fwrite(STDOUT, 'LIVE STEP {"id":"mailbox_forward.update.2","state":"excluded","attempted":false,"reason":"GET-only live run: needs PUT /mailbox/forwards/{source}"}' . "\n");
            fwrite(STDOUT, 'LIVE STEP {"id":"mailbox_forward.remove.3","state":"excluded","attempted":false,"reason":"GET-only live run: needs DELETE /mailbox/forwards/{source}"}' . "\n");
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $mailbox_forward_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.mailbox_forward")));
        $mailbox_forward_ref01_data = null;
        if (count($mailbox_forward_ref01_data_raw) > 0) {
            $mailbox_forward_ref01_data = Helpers::to_map($mailbox_forward_ref01_data_raw[0][1]);
        }

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // LIST
        $mailbox_forward_ref01_ent = $client->MailboxForward(null);
        $mailbox_forward_ref01_match = [];

        $mailbox_forward_ref01_list_result = $mailbox_forward_ref01_ent->list($mailbox_forward_ref01_match, null);
        $this->assertIsArray($mailbox_forward_ref01_list_result);

            return;
        }

        $client = $setup["client"];

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // CREATE
        $mailbox_forward_ref01_ent = $client->MailboxForward(null);
        $mailbox_forward_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.mailbox_forward"), "mailbox_forward_ref01"));

        $mailbox_forward_ref01_data_result = $mailbox_forward_ref01_ent->create($mailbox_forward_ref01_data, null);
        $mailbox_forward_ref01_data = Helpers::to_map(is_object($mailbox_forward_ref01_data_result) && method_exists($mailbox_forward_ref01_data_result, 'data_get') ? $mailbox_forward_ref01_data_result->data_get() : $mailbox_forward_ref01_data_result);
        $this->assertNotNull($mailbox_forward_ref01_data);

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // LIST
        $mailbox_forward_ref01_match = [];

        $mailbox_forward_ref01_list_result = $mailbox_forward_ref01_ent->list($mailbox_forward_ref01_match, null);
        $this->assertIsArray($mailbox_forward_ref01_list_result);

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // UPDATE
        $mailbox_forward_ref01_data_up0_up = [
        ];

        $mailbox_forward_ref01_markdef_up0_name = "message";
        $mailbox_forward_ref01_markdef_up0_value = "Mark01-mailbox_forward_ref01_" . $setup["now"];
        $mailbox_forward_ref01_data_up0_up[$mailbox_forward_ref01_markdef_up0_name] = $mailbox_forward_ref01_markdef_up0_value;

        $mailbox_forward_ref01_resdata_up0_result = $mailbox_forward_ref01_ent->update($mailbox_forward_ref01_data_up0_up, null);
        $mailbox_forward_ref01_resdata_up0 = Helpers::to_map(is_object($mailbox_forward_ref01_resdata_up0_result) && method_exists($mailbox_forward_ref01_resdata_up0_result, 'data_get') ? $mailbox_forward_ref01_resdata_up0_result->data_get() : $mailbox_forward_ref01_resdata_up0_result);
        $this->assertNotNull($mailbox_forward_ref01_resdata_up0);
        $this->assertEquals($mailbox_forward_ref01_resdata_up0[$mailbox_forward_ref01_markdef_up0_name], $mailbox_forward_ref01_markdef_up0_value);

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // LIST
        $mailbox_forward_ref01_match_rt0 = [];

        $mailbox_forward_ref01_list_rt0_result = $mailbox_forward_ref01_ent->list($mailbox_forward_ref01_match_rt0, null);
        $this->assertIsArray($mailbox_forward_ref01_list_rt0_result);

    }
}

function mailbox_forward_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/mailbox_forward/MailboxForwardTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = GandiSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["mailbox_forward01", "mailbox_forward02", "mailbox_forward03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Whether *_ENTID supplied the idmap, read before env_override consumes
    // it: without it, the ids a live flow binds are the fixture's synthetic ones.
    $entid_env_raw = getenv("GANDI_TEST_MAILBOX_FORWARD_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "GANDI_TEST_MAILBOX_FORWARD_ENTID" => $idmap,
        "GANDI_TEST_LIVE" => "FALSE",
        "GANDI_TEST_EXPLAIN" => "FALSE",
        "GANDI_APIKEY" => "",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["GANDI_TEST_MAILBOX_FORWARD_ENTID"]);
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
