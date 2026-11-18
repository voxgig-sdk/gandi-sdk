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
(0, node_test_1.describe)('LinkedZoneDomainEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when GANDI_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('GANDI_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.GandiSDK.test();
        const ent = testsdk.LinkedZoneDomain();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('linked_zone_domain hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.GandiSDK.test(offline).LinkedZoneDomain().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.GandiSDK.test(offline).LinkedZoneDomain()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.GandiSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.LinkedZoneDomain().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.GandiSDK.test().LinkedZoneDomain().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.GandiSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.LinkedZoneDomain().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.LinkedZoneDomain().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.GandiSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.LinkedZoneDomain().list({ "name": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.GANDI_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'linked_zone_domain.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "deployed": { "a": true, "h": "Deployed", "n": "deployed", "r": true, "t": "`$BOOLEAN`", "key$": "deployed", "index$": 0 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "t": "`$STRING`", "key$": "id", "index$": 1 }, "name": { "a": true, "h": "Name", "n": "name", "r": true, "t": "`$STRING`", "key$": "name", "index$": 2 }, "owner": { "a": true, "h": "Owner", "n": "owner", "r": true, "t": "`$STRING`", "key$": "owner", "index$": 3 }, "zone": { "a": true, "h": "Zone", "n": "zone", "r": true, "t": "`$OBJECT`", "key$": "zone", "index$": 4 } }, "id": { "field": "id", "name": "id" }, "name": "linked_zone_domain", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /linkedzone/domains", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "explode": true, "k": "query", "n": "name", "or": "name", "r": false, "style": "form", "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": 1, "explode": true, "k": "query", "n": "page", "or": "page", "r": false, "style": "form", "t": "`$INTEGER`", "index$": 1 }, { "a": true, "explode": true, "k": "query", "n": "per_page", "or": "per_page", "r": false, "style": "form", "t": "`$INTEGER`", "index$": 2 }, { "a": true, "explode": true, "k": "query", "n": "sharing_id", "or": "sharing_id", "r": false, "style": "form", "t": "`$STRING`", "index$": 3 }, { "a": true, "explode": true, "k": "query", "n": "zone_id", "or": "zone_id", "r": false, "style": "form", "t": "`$STRING`", "index$": 4 }] }, "k": "http", "m": "GET", "o": "/linkedzone/domains", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "linkedzone" }, { "lit": "domains" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /linkedzone/domains/{domain}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "name", "or": "domain", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/linkedzone/domains/{domain}", "q": { "exist": ["name"] }, "r": { "param": { "domain": "name" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "linkedzone" }, { "lit": "domains" }, { "var": "name" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "bf": ["domains"], "co": { "id": "PATCH /linkedzone/zones/{zone_id}/link/domains", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "zone_id", "or": "zone_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PATCH", "o": "/linkedzone/zones/{zone_id}/link/domains", "q": { "$action": "link", "exist": ["zone_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "linkedzone" }, { "lit": "zones" }, { "var": "zone_id" }, { "lit": "link" }, { "lit": "domains" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "bf": ["domains"], "co": { "id": "PATCH /linkedzone/unlink/domains", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "PATCH", "o": "/linkedzone/unlink/domains", "q": { "$action": "unlink" }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "linkedzone" }, { "lit": "unlink" }, { "lit": "domains" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "update" } }, "relations": { "ancestors": [["$.main.kit.entity.domain"]] }, "key$": "linked_zone_domain", "name__orig": "linked_zone_domain", "Name": "LinkedZoneDomain", "name_": "linked_zone_domain", "name-": "linked-zone-domain", "NAME": "LINKED_ZONE_DOMAIN", "index$": 37 }, { "active": true, "entity": "linked_zone_domain", "key$": "BasicLinkedZoneDomainFlow", "kind": "basic", "name": "BasicLinkedZoneDomainFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "linked_zone_domain_ref01" } }], "index$": 0 }, { "a": false, "d": {}, "i": { "ref": "linked_zone_domain_ref01", "srcdatavar": "linked_zone_domain_ref01_data", "suffix": "_up0", "textfield": "name" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-linked_zone_domain_ref01" } }], "v": [], "unreachable": true }, { "a": false, "d": {}, "i": { "ref": "linked_zone_domain_ref01", "srcdatavar": "linked_zone_domain_ref01_data", "suffix": "_dt0" }, "m": { "id": "linked_zone_domain01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-linked_zone_domain_ref01" } }], "unreachable": true }] }, 'LinkedZoneDomain', { "GET /linkedzone/domains": { "protocol": "http", "parameters": [{ "name": "name", "in": "query", "schema": { "type": "string" }, "index$": 0 }, { "name": "page", "in": "query", "schema": { "type": "integer", "default": 1, "minimum": 1 }, "index$": 1 }, { "name": "per_page", "in": "query", "schema": { "type": "integer", "minimum": 1 }, "index$": 2 }, { "name": "sharing_id", "in": "query", "schema": { "type": "string" }, "index$": 3 }, { "name": "zone_id", "in": "query", "schema": { "type": "string" }, "index$": 4 }] }, "GET /linkedzone/domains/{domain}": { "protocol": "http", "parameters": [{ "name": "domain", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "PATCH /linkedzone/zones/{zone_id}/link/domains": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "domains": { "type": "array", "items": { "type": "string" } } }, "required": ["domains"] } } } }, "parameters": [{ "name": "zone_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "PATCH /linkedzone/unlink/domains": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "domains": { "type": "array", "items": { "type": "string" } } }, "required": ["domains"] } } } }, "parameters": [] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "linked_zone_domain.update.1": "GET-only live run: needs PATCH /linkedzone/zones/{zone_id}/link/domains" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let linked_zone_domain_ref01_data = Object.values(setup.data.existing.linked_zone_domain)[0];
        // LIST
        const linked_zone_domain_ref01_ent = client.LinkedZoneDomain();
        const linked_zone_domain_ref01_match = {};
        const linked_zone_domain_ref01_list = (await linked_zone_domain_ref01_ent.list(linked_zone_domain_ref01_match)).map((e) => e.data());
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/linked_zone_domain/LinkedZoneDomainTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.GandiSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['linked_zone_domain01', 'linked_zone_domain02', 'linked_zone_domain03', 'domain01', 'domain02', 'domain03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'GANDI_TEST_LINKED_ZONE_DOMAIN_ENTID': idmap,
        'GANDI_TEST_LIVE': 'FALSE',
        'GANDI_TEST_EXPLAIN': 'FALSE',
        'GANDI_APIKEY': '',
    });
    idmap = env['GANDI_TEST_LINKED_ZONE_DOMAIN_ENTID'];
    const live = 'TRUE' === env.GANDI_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['GANDI_TEST_LINKED_ZONE_DOMAIN_ENTID'];
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
//# sourceMappingURL=LinkedZoneDomainEntity.test.js.map