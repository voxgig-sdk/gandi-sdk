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
(0, node_test_1.describe)('LivednsDomainEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when GANDI_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('GANDI_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.GandiSDK.test();
        const ent = testsdk.LivednsDomain();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('livedns_domain hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.GandiSDK.test(offline).LivednsDomain().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.GandiSDK.test(offline).LivednsDomain()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.GandiSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.LivednsDomain().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.GandiSDK.test().LivednsDomain().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.GandiSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.LivednsDomain().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.LivednsDomain().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.GandiSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.LivednsDomain().list({ "page": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.GANDI_TEST_LIVE;
        for (const op of ['create', 'list', 'update', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'livedns_domain.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "automatic_snapshots": { "a": true, "h": "Automatic Snapshots", "n": "automatic_snapshots", "op": { "update": { "req": false, "type": "`$BOOLEAN`" } }, "r": true, "t": "`$BOOLEAN`", "key$": "automatic_snapshots", "index$": 0 }, "domain_href": { "a": true, "h": "Domain Href", "n": "domain_href", "r": true, "t": "`$STRING`", "key$": "domain_href", "index$": 1 }, "domain_keys_href": { "a": true, "h": "Domain Keys Href", "n": "domain_keys_href", "r": true, "t": "`$STRING`", "key$": "domain_keys_href", "index$": 2 }, "domain_records_href": { "a": true, "h": "Domain Records Href", "n": "domain_records_href", "r": true, "t": "`$STRING`", "key$": "domain_records_href", "index$": 3 }, "fqdn": { "a": true, "h": "Fqdn", "n": "fqdn", "r": true, "t": "`$STRING`", "key$": "fqdn", "index$": 4 }, "message": { "a": true, "h": "Message", "n": "message", "r": true, "t": "`$STRING`", "key$": "message", "index$": 5 }, "zone": { "a": true, "h": "Zone", "n": "zone", "r": false, "t": "`$OBJECT`", "key$": "zone", "index$": 6 } }, "name": "livedns_domain", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["fqdn", "zone"], "co": { "id": "POST /livedns/domains", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "explode": true, "k": "query", "n": "sharing_id", "or": "sharing_id", "r": false, "style": "form", "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/livedns/domains", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "livedns" }, { "lit": "domains" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /livedns/domains", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": 1, "explode": true, "k": "query", "n": "page", "or": "page", "r": false, "style": "form", "t": "`$INTEGER`", "index$": 0 }, { "a": true, "explode": true, "k": "query", "n": "per_page", "or": "per_page", "r": false, "style": "form", "t": "`$INTEGER`", "index$": 1 }, { "a": true, "explode": true, "k": "query", "n": "sharing_id", "or": "sharing_id", "r": false, "style": "form", "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/livedns/domains", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "livedns" }, { "lit": "domains" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /livedns/domains/{fqdn}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "fqdn", "or": "fqdn", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/livedns/domains/{fqdn}", "q": { "exist": ["fqdn"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "livedns" }, { "lit": "domains" }, { "var": "fqdn" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "bf": ["automatic_snapshots"], "co": { "id": "PATCH /livedns/domains/{fqdn}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "fqdn", "or": "fqdn", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PATCH", "o": "/livedns/domains/{fqdn}", "q": { "exist": ["fqdn"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "livedns" }, { "lit": "domains" }, { "var": "fqdn" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [["$.main.kit.entity.domain"]] }, "key$": "livedns_domain", "name__orig": "livedns_domain", "Name": "LivednsDomain", "name_": "livedns_domain", "name-": "livedns-domain", "NAME": "LIVEDNS_DOMAIN", "index$": 41 }, { "active": true, "entity": "livedns_domain", "key$": "BasicLivednsDomainFlow", "kind": "basic", "name": "BasicLivednsDomainFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "livedns_domain_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "livedns_domain_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "livedns_domain_ref01", "srcdatavar": "livedns_domain_ref01_data", "suffix": "_up0", "textfield": "domain_href" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-livedns_domain_ref01" } }], "v": [], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "livedns_domain_ref01", "srcdatavar": "livedns_domain_ref01_data", "suffix": "_dt0" }, "m": { "id": "livedns_domain01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-livedns_domain_ref01" } }], "index$": 3 }] }, 'LivednsDomain', { "POST /livedns/domains": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "fqdn": { "type": "string", "key$": "fqdn" }, "zone": { "type": "object", "properties": { "items": { "type": "array", "items": { "type": "object", "properties": {}, "required": [] } }, "ttl": { "type": "integer", "minimum": 300, "maximum": 2592000 } }, "key$": "zone" } }, "required": ["fqdn"] } } } }, "parameters": [{ "name": "sharing_id", "in": "query", "schema": { "type": "string" }, "index$": 0 }] }, "GET /livedns/domains": { "protocol": "http", "parameters": [{ "name": "page", "in": "query", "schema": { "type": "integer", "default": 1, "minimum": 1 }, "index$": 0 }, { "name": "per_page", "in": "query", "schema": { "type": "integer", "minimum": 1 }, "index$": 1 }, { "name": "sharing_id", "in": "query", "schema": { "type": "string" }, "index$": 2 }] }, "GET /livedns/domains/{fqdn}": { "protocol": "http", "parameters": [{ "name": "fqdn", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "PATCH /livedns/domains/{fqdn}": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "automatic_snapshots": { "type": "boolean", "key$": "automatic_snapshots" } } } } } }, "parameters": [{ "name": "fqdn", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "livedns_domain.create.0": "GET-only live run: needs POST /livedns/domains", "livedns_domain.update.2": "GET-only live run: needs PATCH /livedns/domains/{fqdn}" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const livedns_domain_ref01_ent = client.LivednsDomain();
        let livedns_domain_ref01_data = setup.data.new.livedns_domain['livedns_domain_ref01'];
        livedns_domain_ref01_data = (await livedns_domain_ref01_ent.create(livedns_domain_ref01_data)).data();
        (0, node_assert_1.default)(null != livedns_domain_ref01_data);
        // LIST
        const livedns_domain_ref01_match = {};
        const livedns_domain_ref01_list = (await livedns_domain_ref01_ent.list(livedns_domain_ref01_match)).map((e) => e.data());
        // UPDATE
        const livedns_domain_ref01_data_up0 = {};
        const livedns_domain_ref01_markdef_up0 = { name: 'domain_href', value: 'Mark01-livedns_domain_ref01_' + setup.now };
        livedns_domain_ref01_data_up0[livedns_domain_ref01_markdef_up0.name] = livedns_domain_ref01_markdef_up0.value;
        const livedns_domain_ref01_resdata_up0 = (await livedns_domain_ref01_ent.update(livedns_domain_ref01_data_up0)).data();
        (0, node_assert_1.default)(null != livedns_domain_ref01_resdata_up0);
        (0, node_assert_1.default)(livedns_domain_ref01_resdata_up0[livedns_domain_ref01_markdef_up0.name] === livedns_domain_ref01_markdef_up0.value);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/livedns_domain/LivednsDomainTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.GandiSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['livedns_domain01', 'livedns_domain02', 'livedns_domain03', 'domain01', 'domain02', 'domain03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'GANDI_TEST_LIVEDNS_DOMAIN_ENTID': idmap,
        'GANDI_TEST_LIVE': 'FALSE',
        'GANDI_TEST_EXPLAIN': 'FALSE',
        'GANDI_APIKEY': '',
    });
    idmap = env['GANDI_TEST_LIVEDNS_DOMAIN_ENTID'];
    const live = 'TRUE' === env.GANDI_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['GANDI_TEST_LIVEDNS_DOMAIN_ENTID'];
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
//# sourceMappingURL=LivednsDomainEntity.test.js.map