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
(0, node_test_1.describe)('DomainDnskeyEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when GANDI_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('GANDI_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.GandiSDK.test();
        const ent = testsdk.DomainDnskey();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.GandiSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.DomainDnskey().list({ "domain": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.GANDI_TEST_LIVE;
        for (const op of ['create', 'list', 'update', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'domain_dnskey.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "algorithm": { "a": true, "h": "Algorithm", "n": "algorithm", "r": true, "t": "`$INTEGER`", "key$": "algorithm", "index$": 0 }, "digest": { "a": true, "h": "Digest", "n": "digest", "r": true, "t": "`$STRING`", "key$": "digest", "index$": 1 }, "digest_type": { "a": true, "h": "Digest Type", "n": "digest_type", "r": true, "t": "`$INTEGER`", "key$": "digest_type", "index$": 2 }, "href": { "a": true, "h": "Href", "n": "href", "r": true, "t": "`$STRING`", "key$": "href", "index$": 3 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "t": "`$INTEGER`", "key$": "id", "index$": 4 }, "keys": { "a": true, "h": "Keys", "n": "keys", "r": true, "t": "`$ARRAY`", "key$": "keys", "index$": 5 }, "keytag": { "a": true, "h": "Keytag", "n": "keytag", "r": true, "t": "`$INTEGER`", "key$": "keytag", "index$": 6 }, "message": { "a": true, "h": "Message", "n": "message", "r": true, "t": "`$STRING`", "key$": "message", "index$": 7 }, "public_key": { "a": true, "h": "Public Key", "n": "public_key", "op": { "list": { "req": false, "type": "`$STRING`" } }, "r": true, "t": "`$STRING`", "key$": "public_key", "index$": 8 }, "type": { "a": true, "h": "Type", "n": "type", "r": true, "t": "`$STRING`", "key$": "type", "index$": 9 } }, "id": { "field": "id", "name": "id" }, "name": "domain_dnskey", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["algorithm", "public_key", "type"], "co": { "id": "POST /domain/domains/{domain}/dnskeys", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "domain", "or": "domain", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/domain/domains/{domain}/dnskeys", "q": { "exist": ["domain"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "domain" }, { "lit": "domains" }, { "var": "domain" }, { "lit": "dnskeys" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /domain/domains/{domain}/dnskeys", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "domain", "or": "domain", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "ex": 1, "explode": true, "k": "query", "n": "page", "or": "page", "r": false, "style": "form", "t": "`$INTEGER`", "index$": 0 }, { "a": true, "explode": true, "k": "query", "n": "per_page", "or": "per_page", "r": false, "style": "form", "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/domain/domains/{domain}/dnskeys", "q": { "exist": ["domain"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "domain" }, { "lit": "domains" }, { "var": "domain" }, { "lit": "dnskeys" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /domain/domains/{domain}/dnskeys/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "domain", "or": "domain", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "DELETE", "o": "/domain/domains/{domain}/dnskeys/{id}", "q": { "exist": ["domain", "id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "domain" }, { "lit": "domains" }, { "var": "domain" }, { "lit": "dnskeys" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "bf": ["keys"], "co": { "id": "PUT /domain/domains/{domain}/dnskeys", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "domain", "or": "domain", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PUT", "o": "/domain/domains/{domain}/dnskeys", "q": { "exist": ["domain"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "domain" }, { "lit": "domains" }, { "var": "domain" }, { "lit": "dnskeys" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [["$.main.kit.entity.domain"]] }, "key$": "domain_dnskey", "name__orig": "domain_dnskey", "Name": "DomainDnskey", "name_": "domain_dnskey", "name-": "domain-dnskey", "NAME": "DOMAIN_DNSKEY", "index$": 18 }, { "active": true, "entity": "domain_dnskey", "key$": "BasicDomainDnskeyFlow", "kind": "basic", "name": "BasicDomainDnskeyFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "domain_dnskey_ref01" }, "m": { "domain": "domain01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": { "domain": "domain01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "domain_dnskey_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "domain_dnskey_ref01", "srcdatavar": "domain_dnskey_ref01_data", "suffix": "_up0", "textfield": "digest" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-domain_dnskey_ref01" } }], "v": [], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "domain_dnskey_ref01", "suffix": "_rm0" }, "m": { "domain": "domain01", "id": "domain_dnskey01" }, "o": "remove", "s": [], "v": [], "index$": 3 }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": { "domain": "domain01" }, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "domain_dnskey_ref01" } }], "index$": 4 }] }, 'DomainDnskey', { "POST /domain/domains/{domain}/dnskeys": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "algorithm": { "type": "integer", "minimum": 0, "maximum": 255, "key$": "algorithm" }, "public_key": { "type": "string", "key$": "public_key" }, "type": { "type": "string", "enum": ["none", "zsk", "ksk"], "key$": "type" } }, "required": ["algorithm", "public_key", "type"] } } } }, "parameters": [{ "name": "domain", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "GET /domain/domains/{domain}/dnskeys": { "protocol": "http", "parameters": [{ "name": "domain", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "page", "in": "query", "schema": { "type": "integer", "default": 1, "minimum": 1 }, "index$": 1 }, { "name": "per_page", "in": "query", "schema": { "type": "integer", "minimum": 1 }, "index$": 2 }] }, "DELETE /domain/domains/{domain}/dnskeys/{id}": { "protocol": "http", "parameters": [{ "name": "domain", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "PUT /domain/domains/{domain}/dnskeys": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "keys": { "type": "array", "items": { "type": "object", "properties": { "algorithm": { "type": "integer", "minimum": 0, "maximum": 255 }, "public_key": { "type": "string" }, "type": { "type": "string", "enum": [] } }, "required": ["algorithm", "public_key", "type"] }, "key$": "keys" } }, "required": ["keys"] } } } }, "parameters": [{ "name": "domain", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "domain_dnskey.create.0": "GET-only live run: needs POST /domain/domains/{domain}/dnskeys", "domain_dnskey.update.2": "GET-only live run: needs PUT /domain/domains/{domain}/dnskeys", "domain_dnskey.remove.3": "GET-only live run: needs DELETE /domain/domains/{domain}/dnskeys/{id}", "domain_dnskey.list.4": "GET-only live run: checks a removal this run does not make" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const domain_dnskey_ref01_ent = client.DomainDnskey();
        let domain_dnskey_ref01_data = setup.data.new.domain_dnskey['domain_dnskey_ref01'];
        domain_dnskey_ref01_data['domain'] = setup.idmap['domain01'];
        domain_dnskey_ref01_data = (await domain_dnskey_ref01_ent.create(domain_dnskey_ref01_data)).data();
        (0, node_assert_1.default)(null != domain_dnskey_ref01_data.id);
        // LIST
        const domain_dnskey_ref01_match = {};
        domain_dnskey_ref01_match['domain'] = setup.idmap['domain01'];
        const domain_dnskey_ref01_list = (await domain_dnskey_ref01_ent.list(domain_dnskey_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(domain_dnskey_ref01_list, { id: domain_dnskey_ref01_data.id })));
        // UPDATE
        const domain_dnskey_ref01_data_up0 = {};
        domain_dnskey_ref01_data_up0.id = domain_dnskey_ref01_data.id;
        const domain_dnskey_ref01_markdef_up0 = { name: 'digest', value: 'Mark01-domain_dnskey_ref01_' + setup.now };
        domain_dnskey_ref01_data_up0[domain_dnskey_ref01_markdef_up0.name] = domain_dnskey_ref01_markdef_up0.value;
        const domain_dnskey_ref01_resdata_up0 = (await domain_dnskey_ref01_ent.update(domain_dnskey_ref01_data_up0)).data();
        (0, node_assert_1.default)(domain_dnskey_ref01_resdata_up0.id === domain_dnskey_ref01_data_up0.id);
        (0, node_assert_1.default)(domain_dnskey_ref01_resdata_up0[domain_dnskey_ref01_markdef_up0.name] === domain_dnskey_ref01_markdef_up0.value);
        // REMOVE
        const domain_dnskey_ref01_match_rm0 = { id: domain_dnskey_ref01_data.id };
        domain_dnskey_ref01_match_rm0['domain'] = setup.idmap['domain'] ?? setup.idmap['domain01'];
        await domain_dnskey_ref01_ent.remove(domain_dnskey_ref01_match_rm0);
        // LIST
        const domain_dnskey_ref01_match_rt0 = {};
        domain_dnskey_ref01_match_rt0['domain'] = setup.idmap['domain01'];
        const domain_dnskey_ref01_list_rt0 = (await domain_dnskey_ref01_ent.list(domain_dnskey_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(domain_dnskey_ref01_list_rt0, { id: domain_dnskey_ref01_data.id })));
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/domain_dnskey/DomainDnskeyTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.GandiSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['domain_dnskey01', 'domain_dnskey02', 'domain_dnskey03', 'domain01', 'domain02', 'domain03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'GANDI_TEST_DOMAIN_DNSKEY_ENTID': idmap,
        'GANDI_TEST_LIVE': 'FALSE',
        'GANDI_TEST_EXPLAIN': 'FALSE',
        'GANDI_APIKEY': '',
    });
    idmap = env['GANDI_TEST_DOMAIN_DNSKEY_ENTID'];
    const live = 'TRUE' === env.GANDI_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['GANDI_TEST_DOMAIN_DNSKEY_ENTID'];
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
//# sourceMappingURL=DomainDnskeyEntity.test.js.map