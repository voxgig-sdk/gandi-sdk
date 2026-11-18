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
(0, node_test_1.describe)('CertificateTagEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when GANDI_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('GANDI_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.GandiSDK.test();
        const ent = testsdk.CertificateTag();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.GandiSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.CertificateTag().list({ "certificate_id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.GANDI_TEST_LIVE;
        for (const op of ['create', 'list', 'update', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'certificate_tag.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "add": { "a": true, "h": "Add", "n": "add", "r": true, "t": "`$ARRAY`", "key$": "add", "index$": 0 }, "message": { "a": true, "h": "Message", "n": "message", "r": true, "t": "`$STRING`", "key$": "message", "index$": 1 }, "remove": { "a": true, "h": "Remove", "n": "remove", "r": true, "t": "`$ARRAY`", "key$": "remove", "index$": 2 }, "tag": { "a": true, "h": "Tag", "n": "tag", "r": true, "t": "`$STRING`", "key$": "tag", "index$": 3 }, "tags": { "a": true, "h": "Tags", "n": "tags", "r": true, "t": "`$ARRAY`", "key$": "tags", "index$": 4 } }, "name": "certificate_tag", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["tag"], "co": { "id": "POST /certificate/issued-certs/{id}/tags", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "certificate_id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/certificate/issued-certs/{id}/tags", "q": { "exist": ["certificate_id"] }, "r": { "param": { "id": "certificate_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "certificate" }, { "lit": "issued-certs" }, { "var": "certificate_id" }, { "lit": "tags" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /certificate/issued-certs/{id}/tags", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "certificate_id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/certificate/issued-certs/{id}/tags", "q": { "exist": ["certificate_id"] }, "r": { "param": { "id": "certificate_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "certificate" }, { "lit": "issued-certs" }, { "var": "certificate_id" }, { "lit": "tags" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "patch": { "input": "data", "name": "patch", "points": [{ "a": true, "bf": ["add", "remove"], "co": { "id": "PATCH /certificate/issued-certs/{id}/tags", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "certificate_id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PATCH", "o": "/certificate/issued-certs/{id}/tags", "q": { "exist": ["certificate_id"] }, "r": { "param": { "id": "certificate_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "certificate" }, { "lit": "issued-certs" }, { "var": "certificate_id" }, { "lit": "tags" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "patch" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /certificate/issued-certs/{id}/tags", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "certificate_id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/certificate/issued-certs/{id}/tags", "q": { "exist": ["certificate_id"] }, "r": { "param": { "id": "certificate_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "certificate" }, { "lit": "issued-certs" }, { "var": "certificate_id" }, { "lit": "tags" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "bf": ["tags"], "co": { "id": "PUT /certificate/issued-certs/{id}/tags", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "certificate_id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PUT", "o": "/certificate/issued-certs/{id}/tags", "q": { "exist": ["certificate_id"] }, "r": { "param": { "id": "certificate_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "certificate" }, { "lit": "issued-certs" }, { "var": "certificate_id" }, { "lit": "tags" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [] }, "key$": "certificate_tag", "name__orig": "certificate_tag", "Name": "CertificateTag", "name_": "certificate_tag", "name-": "certificate-tag", "NAME": "CERTIFICATE_TAG", "index$": 11 }, { "active": true, "entity": "certificate_tag", "key$": "BasicCertificateTagFlow", "kind": "basic", "name": "BasicCertificateTagFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "certificate_tag_ref01" }, "m": { "certificate_id": "certificate01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": { "certificate_id": "certificate01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "certificate_tag_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "certificate_tag_ref01", "srcdatavar": "certificate_tag_ref01_data", "suffix": "_up0", "textfield": "message" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-certificate_tag_ref01" } }], "v": [], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "certificate_tag_ref01", "suffix": "_rm0" }, "m": { "id": "certificate_tag01" }, "o": "remove", "s": [], "v": [], "index$": 3 }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": { "certificate_id": "certificate01" }, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "certificate_tag_ref01" } }], "index$": 4 }] }, 'CertificateTag', { "POST /certificate/issued-certs/{id}/tags": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "tag": { "type": "string", "key$": "tag" } }, "required": ["tag"] } } } }, "parameters": [{ "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "GET /certificate/issued-certs/{id}/tags": { "protocol": "http", "parameters": [{ "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "PATCH /certificate/issued-certs/{id}/tags": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "add": { "type": "array", "items": { "type": "string" }, "key$": "add" }, "remove": { "type": "array", "items": { "type": "string" }, "key$": "remove" } }, "required": ["add", "remove"] } } } }, "parameters": [{ "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "DELETE /certificate/issued-certs/{id}/tags": { "protocol": "http", "parameters": [{ "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "PUT /certificate/issued-certs/{id}/tags": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "tags": { "type": "array", "items": { "type": "string" }, "key$": "tags" } }, "required": ["tags"] } } } }, "parameters": [{ "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "certificate_tag.create.0": "GET-only live run: needs POST /certificate/issued-certs/{id}/tags", "certificate_tag.update.2": "GET-only live run: needs PUT /certificate/issued-certs/{id}/tags", "certificate_tag.remove.3": "GET-only live run: needs DELETE /certificate/issued-certs/{id}/tags" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const certificate_tag_ref01_ent = client.CertificateTag();
        let certificate_tag_ref01_data = setup.data.new.certificate_tag['certificate_tag_ref01'];
        certificate_tag_ref01_data['certificate_id'] = setup.idmap['certificate01'];
        certificate_tag_ref01_data = (await certificate_tag_ref01_ent.create(certificate_tag_ref01_data)).data();
        (0, node_assert_1.default)(null != certificate_tag_ref01_data);
        // LIST
        const certificate_tag_ref01_match = {};
        certificate_tag_ref01_match['certificate_id'] = setup.idmap['certificate01'];
        const certificate_tag_ref01_list = (await certificate_tag_ref01_ent.list(certificate_tag_ref01_match)).map((e) => e.data());
        // UPDATE
        const certificate_tag_ref01_data_up0 = {};
        const certificate_tag_ref01_markdef_up0 = { name: 'message', value: 'Mark01-certificate_tag_ref01_' + setup.now };
        certificate_tag_ref01_data_up0[certificate_tag_ref01_markdef_up0.name] = certificate_tag_ref01_markdef_up0.value;
        const certificate_tag_ref01_resdata_up0 = (await certificate_tag_ref01_ent.update(certificate_tag_ref01_data_up0)).data();
        (0, node_assert_1.default)(null != certificate_tag_ref01_resdata_up0);
        (0, node_assert_1.default)(certificate_tag_ref01_resdata_up0[certificate_tag_ref01_markdef_up0.name] === certificate_tag_ref01_markdef_up0.value);
        // LIST
        const certificate_tag_ref01_match_rt0 = {};
        certificate_tag_ref01_match_rt0['certificate_id'] = setup.idmap['certificate01'];
        const certificate_tag_ref01_list_rt0 = (await certificate_tag_ref01_ent.list(certificate_tag_ref01_match_rt0)).map((e) => e.data());
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/certificate_tag/CertificateTagTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.GandiSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['certificate_tag01', 'certificate_tag02', 'certificate_tag03', 'certificate01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'GANDI_TEST_CERTIFICATE_TAG_ENTID': idmap,
        'GANDI_TEST_LIVE': 'FALSE',
        'GANDI_TEST_EXPLAIN': 'FALSE',
        'GANDI_APIKEY': '',
    });
    idmap = env['GANDI_TEST_CERTIFICATE_TAG_ENTID'];
    const live = 'TRUE' === env.GANDI_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['GANDI_TEST_CERTIFICATE_TAG_ENTID'];
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
//# sourceMappingURL=CertificateTagEntity.test.js.map