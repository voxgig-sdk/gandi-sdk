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
(0, node_test_1.describe)('DomainWebredirEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when GANDI_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('GANDI_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.GandiSDK.test();
        const ent = testsdk.DomainWebredir();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.GandiSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.DomainWebredir().list({ "domain": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.GANDI_TEST_LIVE;
        for (const op of ['create', 'list', 'update', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'domain_webredir.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "cert_status": { "a": true, "h": "Cert Status", "n": "cert_status", "r": false, "t": "`$STRING`", "key$": "cert_status", "index$": 0 }, "cert_uuid": { "a": true, "h": "Cert Uuid", "n": "cert_uuid", "r": false, "t": "`$STRING`", "key$": "cert_uuid", "index$": 1 }, "created_at": { "a": true, "h": "Created At", "n": "created_at", "r": false, "t": "`$STRING`", "key$": "created_at", "index$": 2 }, "host": { "a": true, "h": "Host", "n": "host", "r": true, "t": "`$STRING`", "key$": "host", "index$": 3 }, "message": { "a": true, "h": "Message", "n": "message", "r": true, "t": "`$STRING`", "key$": "message", "index$": 4 }, "override": { "a": true, "h": "Override", "n": "override", "op": { "update": { "req": false, "type": "`$BOOLEAN`" } }, "r": true, "t": "`$BOOLEAN`", "key$": "override", "index$": 5 }, "protocol": { "a": true, "h": "Protocol", "n": "protocol", "op": { "create": { "req": true, "type": "`$STRING`" } }, "r": false, "t": "`$STRING`", "key$": "protocol", "index$": 6 }, "type": { "a": true, "h": "Type", "n": "type", "op": { "update": { "req": false, "type": "`$STRING`" } }, "r": true, "t": "`$STRING`", "key$": "type", "index$": 7 }, "updated_at": { "a": true, "h": "Updated At", "n": "updated_at", "r": false, "t": "`$STRING`", "key$": "updated_at", "index$": 8 }, "url": { "a": true, "h": "Url", "n": "url", "op": { "update": { "req": false, "type": "`$STRING`" } }, "r": true, "t": "`$STRING`", "key$": "url", "index$": 9 } }, "name": "domain_webredir", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["host", "override", "protocol", "type", "url"], "co": { "id": "POST /domain/domains/{domain}/webredirs", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "domain", "or": "domain", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "ex": 1, "explode": true, "k": "query", "n": "page", "or": "page", "r": false, "style": "form", "t": "`$INTEGER`", "index$": 0 }, { "a": true, "explode": true, "k": "query", "n": "per_page", "or": "per_page", "r": false, "style": "form", "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/domain/domains/{domain}/webredirs", "q": { "exist": ["domain"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "domain" }, { "lit": "domains" }, { "var": "domain" }, { "lit": "webredirs" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /domain/domains/{domain}/webredirs", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "domain", "or": "domain", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "ex": 1, "explode": true, "k": "query", "n": "page", "or": "page", "r": false, "style": "form", "t": "`$INTEGER`", "index$": 0 }, { "a": true, "explode": true, "k": "query", "n": "per_page", "or": "per_page", "r": false, "style": "form", "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/domain/domains/{domain}/webredirs", "q": { "exist": ["domain"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "domain" }, { "lit": "domains" }, { "var": "domain" }, { "lit": "webredirs" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /domain/domains/{domain}/webredirs/{host}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "domain", "or": "domain", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "host", "or": "host", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/domain/domains/{domain}/webredirs/{host}", "q": { "exist": ["domain", "host"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "domain" }, { "lit": "domains" }, { "var": "domain" }, { "lit": "webredirs" }, { "var": "host" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /domain/domains/{domain}/webredirs/{host}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "domain", "or": "domain", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "host", "or": "host", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "DELETE", "o": "/domain/domains/{domain}/webredirs/{host}", "q": { "exist": ["domain", "host"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "domain" }, { "lit": "domains" }, { "var": "domain" }, { "lit": "webredirs" }, { "var": "host" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "bf": ["override", "protocol", "type", "url"], "co": { "id": "PATCH /domain/domains/{domain}/webredirs/{host}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "domain", "or": "domain", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "host", "or": "host", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "PATCH", "o": "/domain/domains/{domain}/webredirs/{host}", "q": { "exist": ["domain", "host"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "domain" }, { "lit": "domains" }, { "var": "domain" }, { "lit": "webredirs" }, { "var": "host" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [["$.main.kit.entity.domain"], ["$.main.kit.entity.domain"]] }, "key$": "domain_webredir", "name__orig": "domain_webredir", "Name": "DomainWebredir", "name_": "domain_webredir", "name-": "domain-webredir", "NAME": "DOMAIN_WEBREDIR", "index$": 25 }, { "active": true, "entity": "domain_webredir", "key$": "BasicDomainWebredirFlow", "kind": "basic", "name": "BasicDomainWebredirFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "domain_webredir_ref01" }, "m": { "domain": "domain01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": { "domain": "domain01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "domain_webredir_ref01" } }], "index$": 1 }, { "a": true, "d": { "domain": "domain01" }, "i": { "ref": "domain_webredir_ref01", "srcdatavar": "domain_webredir_ref01_data", "suffix": "_up0", "textfield": "cert_status" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-domain_webredir_ref01" } }], "v": [], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "domain_webredir_ref01", "srcdatavar": "domain_webredir_ref01_data", "suffix": "_dt0" }, "m": { "domain": "domain01", "id": "domain_webredir01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-domain_webredir_ref01" } }], "index$": 3 }, { "a": true, "d": {}, "i": { "ref": "domain_webredir_ref01", "suffix": "_rm0" }, "m": { "domain": "domain01", "id": "domain_webredir01" }, "o": "remove", "s": [], "v": [], "index$": 4 }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": { "domain": "domain01" }, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "domain_webredir_ref01" } }], "index$": 5 }] }, 'DomainWebredir', { "POST /domain/domains/{domain}/webredirs": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "host": { "type": "string", "key$": "host" }, "override": { "type": "boolean", "key$": "override" }, "protocol": { "type": "string", "enum": ["http", "https", "httpsonly"], "key$": "protocol" }, "type": { "type": "string", "enum": ["cloak", "http301", "http302"], "key$": "type" }, "url": { "type": "string", "key$": "url" } }, "required": ["host", "override", "protocol", "type", "url"] } } } }, "parameters": [{ "name": "domain", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "page", "in": "query", "schema": { "type": "integer", "default": 1, "minimum": 1 }, "index$": 1 }, { "name": "per_page", "in": "query", "schema": { "type": "integer", "minimum": 1 }, "index$": 2 }] }, "GET /domain/domains/{domain}/webredirs": { "protocol": "http", "parameters": [{ "name": "domain", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "page", "in": "query", "schema": { "type": "integer", "default": 1, "minimum": 1 }, "index$": 1 }, { "name": "per_page", "in": "query", "schema": { "type": "integer", "minimum": 1 }, "index$": 2 }] }, "GET /domain/domains/{domain}/webredirs/{host}": { "protocol": "http", "parameters": [{ "name": "domain", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "host", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "DELETE /domain/domains/{domain}/webredirs/{host}": { "protocol": "http", "parameters": [{ "name": "domain", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "host", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "PATCH /domain/domains/{domain}/webredirs/{host}": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "override": { "type": "boolean", "key$": "override" }, "protocol": { "type": "string", "enum": ["http", "https", "httpsonly"], "key$": "protocol" }, "type": { "type": "string", "enum": ["cloak", "http301", "http302"], "key$": "type" }, "url": { "type": "string", "key$": "url" } } } } } }, "parameters": [{ "name": "domain", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "host", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "domain_webredir.create.0": "GET-only live run: needs POST /domain/domains/{domain}/webredirs", "domain_webredir.update.2": "GET-only live run: needs PATCH /domain/domains/{domain}/webredirs/{host}", "domain_webredir.remove.4": "GET-only live run: needs DELETE /domain/domains/{domain}/webredirs/{host}" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const domain_webredir_ref01_ent = client.DomainWebredir();
        let domain_webredir_ref01_data = setup.data.new.domain_webredir['domain_webredir_ref01'];
        domain_webredir_ref01_data['domain'] = setup.idmap['domain01'];
        domain_webredir_ref01_data = (await domain_webredir_ref01_ent.create(domain_webredir_ref01_data)).data();
        (0, node_assert_1.default)(null != domain_webredir_ref01_data);
        // LIST
        const domain_webredir_ref01_match = {};
        domain_webredir_ref01_match['domain'] = setup.idmap['domain01'];
        const domain_webredir_ref01_list = (await domain_webredir_ref01_ent.list(domain_webredir_ref01_match)).map((e) => e.data());
        // UPDATE
        const domain_webredir_ref01_data_up0 = {};
        domain_webredir_ref01_data_up0['domain'] = setup.idmap['domain'] ?? setup.idmap['domain01'];
        const domain_webredir_ref01_markdef_up0 = { name: 'cert_status', value: 'Mark01-domain_webredir_ref01_' + setup.now };
        domain_webredir_ref01_data_up0[domain_webredir_ref01_markdef_up0.name] = domain_webredir_ref01_markdef_up0.value;
        const domain_webredir_ref01_resdata_up0 = (await domain_webredir_ref01_ent.update(domain_webredir_ref01_data_up0)).data();
        (0, node_assert_1.default)(null != domain_webredir_ref01_resdata_up0);
        (0, node_assert_1.default)(domain_webredir_ref01_resdata_up0[domain_webredir_ref01_markdef_up0.name] === domain_webredir_ref01_markdef_up0.value);
        // LIST
        const domain_webredir_ref01_match_rt0 = {};
        domain_webredir_ref01_match_rt0['domain'] = setup.idmap['domain01'];
        const domain_webredir_ref01_list_rt0 = (await domain_webredir_ref01_ent.list(domain_webredir_ref01_match_rt0)).map((e) => e.data());
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/domain_webredir/DomainWebredirTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.GandiSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['domain_webredir01', 'domain_webredir02', 'domain_webredir03', 'domain01', 'domain02', 'domain03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'GANDI_TEST_DOMAIN_WEBREDIR_ENTID': idmap,
        'GANDI_TEST_LIVE': 'FALSE',
        'GANDI_TEST_EXPLAIN': 'FALSE',
        'GANDI_APIKEY': '',
    });
    idmap = env['GANDI_TEST_DOMAIN_WEBREDIR_ENTID'];
    const live = 'TRUE' === env.GANDI_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['GANDI_TEST_DOMAIN_WEBREDIR_ENTID'];
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
//# sourceMappingURL=DomainWebredirEntity.test.js.map