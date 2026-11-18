"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('MailboxSlotEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when GANDI_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('GANDI_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.GandiSDK.test();
        const ent = testsdk.MailboxSlot();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('mailbox_slot hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.GandiSDK.test(offline).MailboxSlot().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.GandiSDK.test(offline).MailboxSlot()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.GandiSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.MailboxSlot().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.GandiSDK.test().MailboxSlot().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.GandiSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.MailboxSlot().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.MailboxSlot().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.GandiSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.MailboxSlot().list({ "config_name": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.GANDI_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'mailbox_slot.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "autorenew": { "a": true, "h": "Autorenew", "n": "autorenew", "r": true, "t": "`$OBJECT`", "key$": "autorenew", "index$": 0 }, "config": { "a": true, "h": "Config", "n": "config", "r": true, "t": "`$OBJECT`", "key$": "config", "index$": 1 }, "expires_at": { "a": true, "fo": "date-time", "h": "Expires At", "n": "expires_at", "r": false, "t": "`$STRING`", "key$": "expires_at", "index$": 2 }, "last_paid_duration": { "a": true, "h": "Last Paid Duration", "n": "last_paid_duration", "r": false, "t": "`$INTEGER`", "key$": "last_paid_duration", "index$": 3 }, "refund_info": { "a": true, "h": "Refund Info", "n": "refund_info", "r": true, "t": "`$OBJECT`", "key$": "refund_info", "index$": 4 }, "refundable": { "a": true, "h": "Refundable", "n": "refundable", "r": true, "t": "`$BOOLEAN`", "key$": "refundable", "index$": 5 }, "uuid": { "a": true, "h": "Uuid", "n": "uuid", "r": true, "t": "`$STRING`", "key$": "uuid", "index$": 6 }, "webhosting_pack": { "a": true, "h": "Webhosting Pack", "n": "webhosting_pack", "r": true, "t": "`$BOOLEAN`", "key$": "webhosting_pack", "index$": 7 } }, "name": "mailbox_slot", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /mailbox/slots", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "explode": true, "k": "query", "n": "config_name", "or": "config_name", "r": false, "style": "form", "t": "`$STRING`", "index$": 0 }, { "a": true, "explode": true, "k": "query", "n": "expires_at_gte", "or": "expires_at_gte", "r": false, "style": "form", "t": "`$STRING`", "index$": 1 }, { "a": true, "explode": true, "k": "query", "n": "expires_at_lte", "or": "expires_at_lte", "r": false, "style": "form", "t": "`$STRING`", "index$": 2 }, { "a": true, "explode": true, "k": "query", "n": "last_paid_duration", "or": "last_paid_duration", "r": false, "style": "form", "t": "`$INTEGER`", "index$": 3 }, { "a": true, "ex": 1, "explode": true, "k": "query", "n": "page", "or": "page", "r": false, "style": "form", "t": "`$INTEGER`", "index$": 4 }, { "a": true, "explode": true, "k": "query", "n": "per_page", "or": "per_page", "r": false, "style": "form", "t": "`$INTEGER`", "index$": 5 }, { "a": true, "explode": true, "k": "query", "n": "refundable", "or": "refundable", "r": false, "style": "form", "t": "`$STRING`", "index$": 6 }, { "a": true, "explode": true, "k": "query", "n": "sharing_id", "or": "sharing_id", "r": false, "style": "form", "t": "`$STRING`", "index$": 7 }, { "a": true, "ex": "refund_expires_at", "explode": true, "k": "query", "n": "sort_by", "or": "sort_by", "r": false, "style": "form", "t": "`$STRING`", "index$": 8 }, { "a": true, "explode": true, "k": "query", "n": "webhosting_pack", "or": "webhosting_pack", "r": false, "style": "form", "t": "`$BOOLEAN`", "index$": 9 }] }, "k": "http", "m": "GET", "o": "/mailbox/slots", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "mailbox" }, { "lit": "slots" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /mailbox/slots/{slot_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "uuid", "or": "slot_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/mailbox/slots/{slot_id}", "q": { "exist": ["uuid"] }, "r": { "param": { "slot_id": "uuid" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "mailbox" }, { "lit": "slots" }, { "var": "uuid" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "mailbox_slot", "name__orig": "mailbox_slot", "Name": "MailboxSlot", "name_": "mailbox_slot", "name-": "mailbox-slot", "NAME": "MAILBOX_SLOT", "index$": 53 }, { "active": true, "entity": "mailbox_slot", "key$": "BasicMailboxSlotFlow", "kind": "basic", "name": "BasicMailboxSlotFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "mailbox_slot_ref01" } }], "index$": 0 }, { "a": false, "d": {}, "i": { "ref": "mailbox_slot_ref01", "srcdatavar": "mailbox_slot_ref01_data", "suffix": "_dt0" }, "m": { "id": "mailbox_slot01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-mailbox_slot_ref01" } }], "unreachable": true }] }, 'MailboxSlot', { "GET /mailbox/slots": { "protocol": "http", "parameters": [{ "name": "config_name", "in": "query", "schema": { "type": "string" }, "index$": 0 }, { "name": "expires_at_gte", "in": "query", "schema": { "type": "string", "format": "date-time" }, "index$": 1 }, { "name": "expires_at_lte", "in": "query", "schema": { "type": "string", "format": "date-time" }, "index$": 2 }, { "name": "last_paid_duration", "in": "query", "schema": { "type": "integer", "enum": [1, 12] }, "index$": 3 }, { "name": "page", "in": "query", "schema": { "type": "integer", "default": 1, "minimum": 1 }, "index$": 4 }, { "name": "per_page", "in": "query", "schema": { "type": "integer", "minimum": 1 }, "index$": 5 }, { "name": "refundable", "in": "query", "schema": { "type": "string", "enum": ["true", "false"] }, "index$": 6 }, { "name": "sharing_id", "in": "query", "schema": { "type": "string" }, "index$": 7 }, { "name": "sort_by", "in": "query", "schema": { "type": "string", "enum": ["refund_expires_at", "-refund_expires_at"], "default": "refund_expires_at" }, "index$": 8 }, { "name": "webhosting_pack", "in": "query", "schema": { "type": "boolean" }, "index$": 9 }] }, "GET /mailbox/slots/{slot_id}": { "protocol": "http", "parameters": [{ "name": "slot_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let mailbox_slot_ref01_data = Object.values(setup.data.existing.mailbox_slot)[0];
        // LIST
        const mailbox_slot_ref01_ent = client.MailboxSlot();
        const mailbox_slot_ref01_match = {};
        const mailbox_slot_ref01_list = (await mailbox_slot_ref01_ent.list(mailbox_slot_ref01_match)).map((e) => e.data());
    });
});
// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true;
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/mailbox_slot/MailboxSlotTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.GandiSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['mailbox_slot01', 'mailbox_slot02', 'mailbox_slot03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'GANDI_TEST_MAILBOX_SLOT_ENTID': idmap,
        'GANDI_TEST_LIVE': 'FALSE',
        'GANDI_TEST_EXPLAIN': 'FALSE',
        'GANDI_APIKEY': '',
    });
    idmap = env['GANDI_TEST_MAILBOX_SLOT_ENTID'];
    const live = 'TRUE' === env.GANDI_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['GANDI_TEST_MAILBOX_SLOT_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.GandiSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {
                apikey: env.GANDI_APIKEY,
            },
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.GANDI_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=MailboxSlotEntity.test.js.map