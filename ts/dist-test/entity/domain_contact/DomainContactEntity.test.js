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
(0, node_test_1.describe)('DomainContactEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when GANDI_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('GANDI_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.GandiSDK.test();
        const ent = testsdk.DomainContact();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.GandiSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.DomainContact().load({ "domain": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.GANDI_TEST_LIVE;
        for (const op of []) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'domain_contact.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "admin": { "a": true, "h": "Admin", "n": "admin", "r": true, "t": "`$OBJECT`", "key$": "admin", "index$": 0 }, "bill": { "a": true, "h": "Bill", "n": "bill", "r": true, "t": "`$OBJECT`", "key$": "bill", "index$": 1 }, "message": { "a": true, "h": "Message", "n": "message", "r": true, "t": "`$STRING`", "key$": "message", "index$": 2 }, "owner": { "a": true, "h": "Owner", "n": "owner", "r": true, "t": "`$OBJECT`", "key$": "owner", "index$": 3 }, "tech": { "a": true, "h": "Tech", "n": "tech", "r": true, "t": "`$OBJECT`", "key$": "tech", "index$": 4 } }, "name": "domain_contact", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /domain/domains/{domain}/contacts", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "domain", "or": "domain", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/domain/domains/{domain}/contacts", "q": { "exist": ["domain"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "domain" }, { "lit": "domains" }, { "var": "domain" }, { "lit": "contacts" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "bf": ["admin", "bill", "tech"], "co": { "id": "PATCH /domain/domains/{domain}/contacts", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "domain", "or": "domain", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PATCH", "o": "/domain/domains/{domain}/contacts", "q": { "exist": ["domain"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "domain" }, { "lit": "domains" }, { "var": "domain" }, { "lit": "contacts" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "bf": ["brand_number", "city", "country", "data_obfuscated", "email", "extra_parameters", "family", "fax", "given", "icann_contract_accept", "jo_announce_number", "jo_announce_page", "jo_declaration_date", "jo_publication_date", "lang", "mail_obfuscated", "mobile", "phone", "siren", "state", "streetaddr", "validation", "zip"], "co": { "id": "PUT /domain/domains/{domain}/contacts/owner", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "explode": false, "k": "header", "n": "dry_run", "or": "Dry-Run", "r": false, "style": "simple", "t": "`$INTEGER`", "index$": 0 }], "params": [{ "a": true, "k": "param", "n": "domain", "or": "domain", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PUT", "o": "/domain/domains/{domain}/contacts/owner", "q": { "$action": "owner", "exist": ["domain"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "domain" }, { "lit": "domains" }, { "var": "domain" }, { "lit": "contacts" }, { "lit": "owner" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "update" } }, "relations": { "ancestors": [["$.main.kit.entity.domain"]] }, "key$": "domain_contact", "name__orig": "domain_contact", "Name": "DomainContact", "name_": "domain_contact", "name-": "domain-contact", "NAME": "DOMAIN_CONTACT", "index$": 17 }, { "active": true, "entity": "domain_contact", "key$": "BasicDomainContactFlow", "kind": "basic", "name": "BasicDomainContactFlow", "param": {}, "step": [{ "a": false, "d": {}, "i": { "ref": "domain_contact_ref01", "srcdatavar": "domain_contact_ref01_data", "suffix": "_up0", "textfield": "message" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-domain_contact_ref01" } }], "v": [], "unreachable": true }, { "a": false, "d": {}, "i": { "ref": "domain_contact_ref01", "srcdatavar": "domain_contact_ref01_data", "suffix": "_dt0" }, "m": { "id": "domain_contact01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-domain_contact_ref01" } }], "unreachable": true }] }, 'DomainContact', { "GET /domain/domains/{domain}/contacts": { "protocol": "http", "parameters": [{ "name": "domain", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "PATCH /domain/domains/{domain}/contacts": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "admin": { "type": "object", "properties": { "country": { "type": "string" }, "email": { "type": "string" }, "family": { "type": "string" }, "given": { "type": "string" }, "streetaddr": { "type": "string" }, "type": { "type": "string", "enum": ["individual", "company", "association", "publicbody"] }, "brand_number": { "type": "string" }, "city": { "type": "string" }, "data_obfuscated": { "type": "boolean", "default": true }, "extra_parameters": { "type": "object" }, "fax": { "type": "string" }, "icann_contract_accept": { "type": "boolean", "default": false }, "jo_announce_number": { "type": "string" }, "jo_announce_page": { "type": "string" }, "jo_declaration_date": { "type": "string" }, "jo_publication_date": { "type": "string" }, "lang": { "type": "string", "enum": ["en", "es", "fr", "ja", "zh-hans", "zh-hant"] }, "mail_obfuscated": { "type": "boolean" }, "mobile": { "type": "string" }, "orgname": { "type": "string" }, "phone": { "type": "string" }, "siren": { "type": "string" }, "state": { "type": "string" }, "validation": { "type": "string", "enum": ["pending", "done", "failed", "deleted", "none"] }, "zip": { "type": "string" } }, "required": ["country", "email", "family", "given", "streetaddr", "type"], "key$": "admin" }, "bill": { "type": "object", "properties": { "country": { "type": "string" }, "email": { "type": "string" }, "family": { "type": "string" }, "given": { "type": "string" }, "streetaddr": { "type": "string" }, "type": { "type": "string", "enum": ["individual", "company", "association", "publicbody"] }, "brand_number": { "type": "string" }, "city": { "type": "string" }, "data_obfuscated": { "type": "boolean", "default": true }, "extra_parameters": { "type": "object" }, "fax": { "type": "string" }, "icann_contract_accept": { "type": "boolean", "default": false }, "jo_announce_number": { "type": "string" }, "jo_announce_page": { "type": "string" }, "jo_declaration_date": { "type": "string" }, "jo_publication_date": { "type": "string" }, "lang": { "type": "string", "enum": ["en", "es", "fr", "ja", "zh-hans", "zh-hant"] }, "mail_obfuscated": { "type": "boolean" }, "mobile": { "type": "string" }, "orgname": { "type": "string" }, "phone": { "type": "string" }, "siren": { "type": "string" }, "state": { "type": "string" }, "validation": { "type": "string", "enum": ["pending", "done", "failed", "deleted", "none"] }, "zip": { "type": "string" } }, "required": ["country", "email", "family", "given", "streetaddr", "type"], "key$": "bill" }, "tech": { "type": "object", "properties": { "country": { "type": "string" }, "email": { "type": "string" }, "family": { "type": "string" }, "given": { "type": "string" }, "streetaddr": { "type": "string" }, "type": { "type": "string", "enum": ["individual", "company", "association", "publicbody"] }, "brand_number": { "type": "string" }, "city": { "type": "string" }, "data_obfuscated": { "type": "boolean", "default": true }, "extra_parameters": { "type": "object" }, "fax": { "type": "string" }, "icann_contract_accept": { "type": "boolean", "default": false }, "jo_announce_number": { "type": "string" }, "jo_announce_page": { "type": "string" }, "jo_declaration_date": { "type": "string" }, "jo_publication_date": { "type": "string" }, "lang": { "type": "string", "enum": ["en", "es", "fr", "ja", "zh-hans", "zh-hant"] }, "mail_obfuscated": { "type": "boolean" }, "mobile": { "type": "string" }, "orgname": { "type": "string" }, "phone": { "type": "string" }, "siren": { "type": "string" }, "state": { "type": "string" }, "validation": { "type": "string", "enum": ["pending", "done", "failed", "deleted", "none"] }, "zip": { "type": "string" } }, "required": ["country", "email", "family", "given", "streetaddr", "type"], "key$": "tech" } } } } } }, "parameters": [{ "name": "domain", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "PUT /domain/domains/{domain}/contacts/owner": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "country": { "type": "string" }, "email": { "type": "string" }, "streetaddr": { "type": "string" }, "brand_number": { "type": "string" }, "city": { "type": "string" }, "data_obfuscated": { "type": "boolean", "default": true }, "extra_parameters": { "type": "object" }, "family": { "type": "string" }, "fax": { "type": "string" }, "given": { "type": "string" }, "icann_contract_accept": { "type": "boolean", "default": false }, "jo_announce_number": { "type": "string" }, "jo_announce_page": { "type": "string" }, "jo_declaration_date": { "type": "string" }, "jo_publication_date": { "type": "string" }, "lang": { "type": "string", "enum": ["en", "es", "fr", "ja", "zh-hans", "zh-hant"] }, "mail_obfuscated": { "type": "boolean" }, "mobile": { "type": "string" }, "phone": { "type": "string" }, "siren": { "type": "string" }, "state": { "type": "string" }, "validation": { "type": "string", "enum": ["pending", "done", "failed", "deleted", "none"] }, "zip": { "type": "string" } }, "required": ["country", "email", "streetaddr"] } } } }, "parameters": [{ "name": "domain", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "Dry-Run", "in": "header", "schema": { "type": "integer" }, "index$": 1 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "domain_contact.update.0": "GET-only live run: needs PATCH /domain/domains/{domain}/contacts" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let domain_contact_ref01_data = Object.values(setup.data.existing.domain_contact)[0];
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/domain_contact/DomainContactTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.GandiSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['domain_contact01', 'domain_contact02', 'domain_contact03', 'domain01', 'domain02', 'domain03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'GANDI_TEST_DOMAIN_CONTACT_ENTID': idmap,
        'GANDI_TEST_LIVE': 'FALSE',
        'GANDI_TEST_EXPLAIN': 'FALSE',
        'GANDI_APIKEY': '',
    });
    idmap = env['GANDI_TEST_DOMAIN_CONTACT_ENTID'];
    const live = 'TRUE' === env.GANDI_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['GANDI_TEST_DOMAIN_CONTACT_ENTID'];
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
//# sourceMappingURL=DomainContactEntity.test.js.map