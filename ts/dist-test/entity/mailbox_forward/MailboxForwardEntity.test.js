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
(0, node_test_1.describe)('MailboxForwardEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when GANDI_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('GANDI_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.GandiSDK.test();
        const ent = testsdk.MailboxForward();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('mailbox_forward hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.GandiSDK.test(offline).MailboxForward().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.GandiSDK.test(offline).MailboxForward()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.GandiSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.MailboxForward().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.GandiSDK.test().MailboxForward().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.GandiSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.MailboxForward().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.MailboxForward().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.GandiSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.MailboxForward().list({ "page": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.GANDI_TEST_LIVE;
        for (const op of ['create', 'list', 'update', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'mailbox_forward.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "destinations": { "a": true, "h": "Destinations", "n": "destinations", "r": true, "t": "`$ARRAY`", "key$": "destinations", "index$": 0 }, "message": { "a": true, "h": "Message", "n": "message", "r": true, "t": "`$STRING`", "key$": "message", "index$": 1 }, "source": { "a": true, "h": "Source", "n": "source", "r": true, "t": "`$STRING`", "key$": "source", "index$": 2 } }, "name": "mailbox_forward", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["destinations", "source"], "co": { "id": "POST /mailbox/forwards", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/mailbox/forwards", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "mailbox" }, { "lit": "forwards" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /mailbox/forwards", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": 1, "explode": true, "k": "query", "n": "page", "or": "page", "r": false, "style": "form", "t": "`$INTEGER`", "index$": 0 }, { "a": true, "explode": true, "k": "query", "n": "per_page", "or": "per_page", "r": false, "style": "form", "t": "`$INTEGER`", "index$": 1 }, { "a": true, "explode": true, "k": "query", "n": "search", "or": "search", "r": false, "style": "form", "t": "`$STRING`", "index$": 2 }, { "a": true, "explode": true, "k": "query", "n": "sharing_id", "or": "sharing_id", "r": false, "style": "form", "t": "`$STRING`", "index$": 3 }, { "a": true, "ex": "source", "explode": true, "k": "query", "n": "sort_by", "or": "sort_by", "r": false, "style": "form", "t": "`$STRING`", "index$": 4 }] }, "k": "http", "m": "GET", "o": "/mailbox/forwards", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "mailbox" }, { "lit": "forwards" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /mailbox/forwards/{source}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "source", "or": "source", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/mailbox/forwards/{source}", "q": { "exist": ["source"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "mailbox" }, { "lit": "forwards" }, { "var": "source" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "bf": ["destinations"], "co": { "id": "PUT /mailbox/forwards/{source}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "source", "or": "source", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PUT", "o": "/mailbox/forwards/{source}", "q": { "exist": ["source"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "mailbox" }, { "lit": "forwards" }, { "var": "source" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [] }, "key$": "mailbox_forward", "name__orig": "mailbox_forward", "Name": "MailboxForward", "name_": "mailbox_forward", "name-": "mailbox-forward", "NAME": "MAILBOX_FORWARD", "index$": 51 }, { "active": true, "entity": "mailbox_forward", "key$": "BasicMailboxForwardFlow", "kind": "basic", "name": "BasicMailboxForwardFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "mailbox_forward_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "mailbox_forward_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "mailbox_forward_ref01", "srcdatavar": "mailbox_forward_ref01_data", "suffix": "_up0", "textfield": "message" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-mailbox_forward_ref01" } }], "v": [], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "mailbox_forward_ref01", "suffix": "_rm0" }, "m": { "id": "mailbox_forward01" }, "o": "remove", "s": [], "v": [], "index$": 3 }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "mailbox_forward_ref01" } }], "index$": 4 }] }, 'MailboxForward', { "POST /mailbox/forwards": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "destinations": { "type": "array", "items": { "type": "string" }, "key$": "destinations" }, "source": { "type": "string", "key$": "source" } }, "required": ["destinations", "source"] } } } }, "parameters": [] }, "GET /mailbox/forwards": { "protocol": "http", "parameters": [{ "name": "page", "in": "query", "schema": { "type": "integer", "default": 1, "minimum": 1 }, "index$": 0 }, { "name": "per_page", "in": "query", "schema": { "type": "integer", "minimum": 1 }, "index$": 1 }, { "name": "search", "in": "query", "schema": { "type": "string" }, "index$": 2 }, { "name": "sharing_id", "in": "query", "schema": { "type": "string" }, "index$": 3 }, { "name": "sort_by", "in": "query", "schema": { "type": "string", "enum": ["source", "-source"], "default": "source" }, "index$": 4 }] }, "DELETE /mailbox/forwards/{source}": { "protocol": "http", "parameters": [{ "name": "source", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "PUT /mailbox/forwards/{source}": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "destinations": { "type": "array", "items": { "type": "string" }, "key$": "destinations" } }, "required": ["destinations"] } } } }, "parameters": [{ "name": "source", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "mailbox_forward.create.0": "GET-only live run: needs POST /mailbox/forwards", "mailbox_forward.update.2": "GET-only live run: needs PUT /mailbox/forwards/{source}", "mailbox_forward.remove.3": "GET-only live run: needs DELETE /mailbox/forwards/{source}" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const mailbox_forward_ref01_ent = client.MailboxForward();
        let mailbox_forward_ref01_data = setup.data.new.mailbox_forward['mailbox_forward_ref01'];
        mailbox_forward_ref01_data = (await mailbox_forward_ref01_ent.create(mailbox_forward_ref01_data)).data();
        (0, node_assert_1.default)(null != mailbox_forward_ref01_data);
        // LIST
        const mailbox_forward_ref01_match = {};
        const mailbox_forward_ref01_list = (await mailbox_forward_ref01_ent.list(mailbox_forward_ref01_match)).map((e) => e.data());
        // UPDATE
        const mailbox_forward_ref01_data_up0 = {};
        const mailbox_forward_ref01_markdef_up0 = { name: 'message', value: 'Mark01-mailbox_forward_ref01_' + setup.now };
        mailbox_forward_ref01_data_up0[mailbox_forward_ref01_markdef_up0.name] = mailbox_forward_ref01_markdef_up0.value;
        const mailbox_forward_ref01_resdata_up0 = (await mailbox_forward_ref01_ent.update(mailbox_forward_ref01_data_up0)).data();
        (0, node_assert_1.default)(null != mailbox_forward_ref01_resdata_up0);
        (0, node_assert_1.default)(mailbox_forward_ref01_resdata_up0[mailbox_forward_ref01_markdef_up0.name] === mailbox_forward_ref01_markdef_up0.value);
        // LIST
        const mailbox_forward_ref01_match_rt0 = {};
        const mailbox_forward_ref01_list_rt0 = (await mailbox_forward_ref01_ent.list(mailbox_forward_ref01_match_rt0)).map((e) => e.data());
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/mailbox_forward/MailboxForwardTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.GandiSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['mailbox_forward01', 'mailbox_forward02', 'mailbox_forward03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'GANDI_TEST_MAILBOX_FORWARD_ENTID': idmap,
        'GANDI_TEST_LIVE': 'FALSE',
        'GANDI_TEST_EXPLAIN': 'FALSE',
        'GANDI_APIKEY': '',
    });
    idmap = env['GANDI_TEST_MAILBOX_FORWARD_ENTID'];
    const live = 'TRUE' === env.GANDI_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['GANDI_TEST_MAILBOX_FORWARD_ENTID'];
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
//# sourceMappingURL=MailboxForwardEntity.test.js.map