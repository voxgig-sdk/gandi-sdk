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
(0, node_test_1.describe)('AcmeDomainEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when GANDI_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('GANDI_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.GandiSDK.test();
        const ent = testsdk.AcmeDomain();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.GandiSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.AcmeDomain().list({ "subscription_id": 1, "domain": "x", "sharing_id": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.GANDI_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'acme_domain.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "created_at": { "a": true, "h": "Created At", "n": "created_at", "r": true, "t": "`$STRING`", "key$": "created_at", "index$": 0 }, "deleted_at": { "a": true, "h": "Deleted At", "n": "deleted_at", "r": true, "t": "`$STRING`", "key$": "deleted_at", "index$": 1 }, "hostname": { "a": true, "h": "Hostname", "n": "hostname", "r": true, "t": "`$STRING`", "key$": "hostname", "index$": 2 }, "hostname_ulabel": { "a": true, "h": "Hostname Ulabel", "n": "hostname_ulabel", "r": true, "t": "`$STRING`", "key$": "hostname_ulabel", "index$": 3 }, "is_wildcard": { "a": true, "h": "Is Wildcard", "n": "is_wildcard", "r": true, "t": "`$BOOLEAN`", "key$": "is_wildcard", "index$": 4 }, "status": { "a": true, "h": "Status", "n": "status", "r": true, "t": "`$STRING`", "key$": "status", "index$": 5 }, "subscription_id": { "a": true, "h": "Subscription Id", "n": "subscription_id", "r": true, "t": "`$STRING`", "key$": "subscription_id", "index$": 6 } }, "name": "acme_domain", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /acme/subscriptions/{subscription_id}/domains", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "subscription_id", "or": "subscription_id", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "explode": true, "k": "query", "n": "domain", "or": "domain", "r": true, "style": "form", "t": "`$STRING`", "index$": 0 }, { "a": true, "explode": true, "k": "query", "n": "sharing_id", "or": "sharing_id", "r": true, "style": "form", "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/acme/subscriptions/{subscription_id}/domains", "q": { "exist": ["domain", "sharing_id", "subscription_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "acme" }, { "lit": "subscriptions" }, { "var": "subscription_id" }, { "lit": "domains" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /acme/subscriptions/{subscription_id}/domains/{domain_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "domain_id", "or": "domain_id", "r": true, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "k": "param", "n": "subscription_id", "or": "subscription_id", "r": true, "t": "`$STRING`", "index$": 1 }], "query": [{ "a": true, "explode": true, "k": "query", "n": "sharing_id", "or": "sharing_id", "r": true, "style": "form", "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/acme/subscriptions/{subscription_id}/domains/{domain_id}", "q": { "exist": ["domain_id", "sharing_id", "subscription_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "acme" }, { "lit": "subscriptions" }, { "var": "subscription_id" }, { "lit": "domains" }, { "var": "domain_id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [["$.main.kit.entity.domain"]] }, "key$": "acme_domain", "name__orig": "acme_domain", "Name": "AcmeDomain", "name_": "acme_domain", "name-": "acme-domain", "NAME": "ACME_DOMAIN", "index$": 2 }, { "active": true, "entity": "acme_domain", "key$": "BasicAcmeDomainFlow", "kind": "basic", "name": "BasicAcmeDomainFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": { "subscription_id": "subscription01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "acme_domain_ref01" } }], "index$": 0 }, { "a": false, "d": {}, "i": { "ref": "acme_domain_ref01", "srcdatavar": "acme_domain_ref01_data", "suffix": "_dt0" }, "m": { "id": "acme_domain01", "subscription_id": "subscription01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-acme_domain_ref01" } }], "unreachable": true }] }, 'AcmeDomain', { "GET /acme/subscriptions/{subscription_id}/domains": { "protocol": "http", "parameters": [{ "name": "subscription_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "domain", "in": "query", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "sharing_id", "in": "query", "required": true, "schema": { "type": "string" }, "index$": 2 }] }, "GET /acme/subscriptions/{subscription_id}/domains/{domain_id}": { "protocol": "http", "parameters": [{ "name": "subscription_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "domain_id", "in": "path", "required": true, "schema": { "type": "integer" }, "index$": 1 }, { "name": "sharing_id", "in": "query", "required": true, "schema": { "type": "string" }, "index$": 2 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let acme_domain_ref01_data = Object.values(setup.data.existing.acme_domain)[0];
        // LIST
        const acme_domain_ref01_ent = client.AcmeDomain();
        const acme_domain_ref01_match = {};
        acme_domain_ref01_match['subscription_id'] = setup.idmap['subscription01'];
        const acme_domain_ref01_list = (await acme_domain_ref01_ent.list(acme_domain_ref01_match)).map((e) => e.data());
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/acme_domain/AcmeDomainTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.GandiSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['acme_domain01', 'acme_domain02', 'acme_domain03', 'domain01', 'domain02', 'domain03', 'subscription01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'GANDI_TEST_ACME_DOMAIN_ENTID': idmap,
        'GANDI_TEST_LIVE': 'FALSE',
        'GANDI_TEST_EXPLAIN': 'FALSE',
        'GANDI_APIKEY': '',
    });
    idmap = env['GANDI_TEST_ACME_DOMAIN_ENTID'];
    const live = 'TRUE' === env.GANDI_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['GANDI_TEST_ACME_DOMAIN_ENTID'];
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
//# sourceMappingURL=AcmeDomainEntity.test.js.map