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
(0, node_test_1.describe)('DomainAvailabilityEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when GANDI_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('GANDI_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.GandiSDK.test();
        const ent = testsdk.DomainAvailability();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.GandiSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.DomainAvailability().load({ "country": 1, "name": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.GANDI_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'domain_availability.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "currency": { "a": true, "h": "Currency", "n": "currency", "r": true, "t": "`$STRING`", "key$": "currency", "index$": 0 }, "grid": { "a": true, "h": "Grid", "n": "grid", "r": true, "t": "`$STRING`", "key$": "grid", "index$": 1 }, "products": { "a": true, "h": "Products", "n": "products", "r": true, "t": "`$ARRAY`", "key$": "products", "index$": 2 }, "taxes": { "a": true, "h": "Taxes", "n": "taxes", "r": true, "t": "`$ARRAY`", "key$": "taxes", "index$": 3 } }, "name": "domain_availability", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /domain/check", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "explode": true, "k": "query", "n": "country", "or": "country", "r": false, "style": "form", "t": "`$STRING`", "index$": 0 }, { "a": true, "explode": true, "k": "query", "n": "currency", "or": "currency", "r": false, "style": "form", "t": "`$STRING`", "index$": 1 }, { "a": true, "explode": true, "k": "query", "n": "duration_unit", "or": "duration_unit", "r": false, "style": "form", "t": "`$STRING`", "index$": 2 }, { "a": true, "explode": true, "k": "query", "n": "extension", "or": "extension", "r": false, "style": "form", "t": "`$STRING`", "index$": 3 }, { "a": true, "explode": true, "k": "query", "n": "grid", "or": "grid", "r": false, "style": "form", "t": "`$STRING`", "index$": 4 }, { "a": true, "explode": true, "k": "query", "n": "lang", "or": "lang", "r": false, "style": "form", "t": "`$STRING`", "index$": 5 }, { "a": true, "explode": true, "k": "query", "n": "max_duration", "or": "max_duration", "r": false, "style": "form", "t": "`$INTEGER`", "index$": 6 }, { "a": true, "explode": true, "k": "query", "n": "name", "or": "name", "r": true, "style": "form", "t": "`$STRING`", "index$": 7 }, { "a": true, "explode": true, "k": "query", "n": "period", "or": "period", "r": false, "style": "form", "t": "`$STRING`", "index$": 8 }, { "a": true, "ex": ["create"], "explode": true, "k": "query", "n": "process", "or": "processes", "r": false, "style": "form", "t": "`$ARRAY`", "index$": 9 }, { "a": true, "explode": true, "k": "query", "n": "sharing_id", "or": "sharing_id", "r": false, "style": "form", "t": "`$STRING`", "index$": 10 }] }, "k": "http", "m": "GET", "o": "/domain/check", "q": { "exist": ["name"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "domain" }, { "lit": "check" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "domain_availability", "name__orig": "domain_availability", "Name": "DomainAvailability", "name_": "domain_availability", "name-": "domain-availability", "NAME": "DOMAIN_AVAILABILITY", "index$": 14 }, { "active": true, "entity": "domain_availability", "key$": "BasicDomainAvailabilityFlow", "kind": "basic", "name": "BasicDomainAvailabilityFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "domain_availability_ref01", "srcdatavar": "domain_availability_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-domain_availability_ref01" } }], "index$": 0 }] }, 'DomainAvailability', { "GET /domain/check": { "protocol": "http", "parameters": [{ "name": "name", "in": "query", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "country", "in": "query", "schema": { "type": "string" }, "index$": 1 }, { "name": "currency", "in": "query", "schema": { "type": "string" }, "index$": 2 }, { "name": "duration_unit", "in": "query", "schema": { "type": "string" }, "index$": 3 }, { "name": "extension", "in": "query", "schema": { "type": "string" }, "index$": 4 }, { "name": "grid", "in": "query", "schema": { "type": "string" }, "index$": 5 }, { "name": "lang", "in": "query", "schema": { "type": "string" }, "index$": 6 }, { "name": "max_duration", "in": "query", "schema": { "type": "integer" }, "index$": 7 }, { "name": "period", "in": "query", "schema": { "type": "string" }, "index$": 8 }, { "name": "processes", "in": "query", "schema": { "type": "array", "items": { "type": "string" }, "default": ["create"] }, "index$": 9 }, { "name": "sharing_id", "in": "query", "schema": { "type": "string" }, "index$": 10 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let domain_availability_ref01_data = Object.values(setup.data.existing.domain_availability)[0];
        // LOAD
        const domain_availability_ref01_ent = client.DomainAvailability();
        const domain_availability_ref01_match_dt0 = {};
        const domain_availability_ref01_data_dt0 = (await domain_availability_ref01_ent.load(domain_availability_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != domain_availability_ref01_data_dt0);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/domain_availability/DomainAvailabilityTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.GandiSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['domain_availability01', 'domain_availability02', 'domain_availability03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'GANDI_TEST_DOMAIN_AVAILABILITY_ENTID': idmap,
        'GANDI_TEST_LIVE': 'FALSE',
        'GANDI_TEST_EXPLAIN': 'FALSE',
        'GANDI_APIKEY': '',
    });
    idmap = env['GANDI_TEST_DOMAIN_AVAILABILITY_ENTID'];
    const live = 'TRUE' === env.GANDI_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['GANDI_TEST_DOMAIN_AVAILABILITY_ENTID'];
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
//# sourceMappingURL=DomainAvailabilityEntity.test.js.map