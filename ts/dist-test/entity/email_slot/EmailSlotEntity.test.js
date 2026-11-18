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
(0, node_test_1.describe)('EmailSlotEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when GANDI_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('GANDI_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.GandiSDK.test();
        const ent = testsdk.EmailSlot();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.GandiSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.EmailSlot().list({ "domain": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.GANDI_TEST_LIVE;
        for (const op of ['create', 'list', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'email_slot.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": { "gandi_id": "id" } }, "fields": { "autorenew": { "a": true, "h": "Autorenew", "n": "autorenew", "r": false, "t": "`$BOOLEAN`", "key$": "autorenew", "index$": 0 }, "capacity": { "a": true, "h": "Capacity", "n": "capacity", "r": true, "t": "`$INTEGER`", "key$": "capacity", "index$": 1 }, "created_at": { "a": true, "fo": "date-time", "h": "Created At", "n": "created_at", "r": true, "t": "`$STRING`", "key$": "created_at", "index$": 2 }, "duration": { "a": true, "h": "Duration", "n": "duration", "r": true, "t": "`$INTEGER`", "key$": "duration", "index$": 3 }, "gandi_id": { "a": true, "h": "Gandi Id", "n": "gandi_id", "r": true, "t": "`$INTEGER`", "key$": "gandi_id", "index$": 4 }, "href": { "a": true, "h": "Href", "n": "href", "r": true, "t": "`$STRING`", "key$": "href", "index$": 5 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "t": "`$STRING`", "key$": "id", "index$": 6 }, "mailbox_type": { "a": true, "h": "Mailbox Type", "n": "mailbox_type", "r": true, "t": "`$STRING`", "key$": "mailbox_type", "index$": 7 }, "refund_amount": { "a": true, "h": "Refund Amount", "n": "refund_amount", "r": false, "t": "`$NUMBER`", "key$": "refund_amount", "index$": 8 }, "refund_currency": { "a": true, "h": "Refund Currency", "n": "refund_currency", "r": false, "t": "`$STRING`", "key$": "refund_currency", "index$": 9 }, "refundable": { "a": true, "h": "Refundable", "n": "refundable", "r": true, "t": "`$BOOLEAN`", "key$": "refundable", "index$": 10 }, "status": { "a": true, "h": "Status", "n": "status", "r": true, "t": "`$STRING`", "key$": "status", "index$": 11 } }, "id": { "field": "id", "from": { "id": "id" }, "name": "id", "parts": ["domain", "id"], "sep": "/" }, "name": "email_slot", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["autorenew", "duration", "mailbox_type"], "co": { "id": "POST /email/slots/{domain}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "domain", "or": "domain", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "explode": true, "k": "query", "n": "sharing_id", "or": "sharing_id", "r": false, "style": "form", "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/email/slots/{domain}", "q": { "exist": ["domain"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "email" }, { "lit": "slots" }, { "var": "domain" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /email/slots/{domain}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "domain", "or": "domain", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "ex": false, "explode": true, "k": "query", "n": "display_not_expired_and_inactive", "or": "display_not_expired_and_inactive", "r": false, "style": "form", "t": "`$BOOLEAN`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/email/slots/{domain}", "q": { "exist": ["domain"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "email" }, { "lit": "slots" }, { "var": "domain" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /email/slots/{domain}/{slot_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "domain", "or": "domain", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "slot_id", "r": true, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/email/slots/{domain}/{slot_id}", "q": { "exist": ["domain", "id"] }, "r": { "param": { "slot_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "email" }, { "lit": "slots" }, { "var": "domain" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /email/slots/{domain}/{slot_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "domain", "or": "domain", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "slot_id", "r": true, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "DELETE", "o": "/email/slots/{domain}/{slot_id}", "q": { "exist": ["domain", "id"] }, "r": { "param": { "slot_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "email" }, { "lit": "slots" }, { "var": "domain" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" } }, "relations": { "ancestors": [] }, "key$": "email_slot", "name__orig": "email_slot", "Name": "EmailSlot", "name_": "email_slot", "name-": "email-slot", "NAME": "EMAIL_SLOT", "index$": 30 }, { "active": true, "entity": "email_slot", "key$": "BasicEmailSlotFlow", "kind": "basic", "name": "BasicEmailSlotFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "email_slot_ref01" }, "m": { "domain": "domain01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": { "domain": "domain01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "email_slot_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "email_slot_ref01", "srcdatavar": "email_slot_ref01_data", "suffix": "_dt0" }, "m": { "domain": "domain01", "id": "email_slot01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-email_slot_ref01" } }], "index$": 2, "route": "GET /email/slots/{domain}/{slot_id}", "record": {} }, { "a": true, "d": {}, "i": { "ref": "email_slot_ref01", "suffix": "_rm0" }, "m": { "domain": "domain01", "id": "email_slot01" }, "o": "remove", "s": [], "v": [], "index$": 3 }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": { "domain": "domain01" }, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "email_slot_ref01" } }], "index$": 4 }] }, 'EmailSlot', { "POST /email/slots/{domain}": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "duration": { "type": "integer", "key$": "duration" }, "mailbox_type": { "type": "string", "enum": ["standard", "premium", "standard_2023", "premium_2023"], "key$": "mailbox_type" }, "autorenew": { "type": "boolean", "key$": "autorenew" } }, "required": ["duration", "mailbox_type"] } } } }, "parameters": [{ "name": "domain", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "sharing_id", "in": "query", "schema": { "type": "string" }, "index$": 1 }] }, "GET /email/slots/{domain}": { "protocol": "http", "parameters": [{ "name": "domain", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "display_not_expired_and_inactive", "in": "query", "schema": { "type": "boolean", "default": false }, "index$": 1 }] }, "GET /email/slots/{domain}/{slot_id}": { "protocol": "http", "parameters": [{ "name": "domain", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "slot_id", "in": "path", "required": true, "schema": { "type": "integer" }, "index$": 1 }] }, "DELETE /email/slots/{domain}/{slot_id}": { "protocol": "http", "parameters": [{ "name": "domain", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "slot_id", "in": "path", "required": true, "schema": { "type": "integer" }, "index$": 1 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "email_slot.create.0": "GET-only live run: needs POST /email/slots/{domain}", "email_slot.remove.3": "GET-only live run: needs DELETE /email/slots/{domain}/{slot_id}", "email_slot.list.4": "GET-only live run: checks a removal this run does not make" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const email_slot_ref01_ent = client.EmailSlot();
        let email_slot_ref01_data = setup.data.new.email_slot['email_slot_ref01'];
        email_slot_ref01_data['domain'] = setup.idmap['domain01'];
        email_slot_ref01_data = (await email_slot_ref01_ent.create(email_slot_ref01_data)).data();
        (0, node_assert_1.default)(null != email_slot_ref01_data.id);
        // LIST
        const email_slot_ref01_match = {};
        email_slot_ref01_match['domain'] = setup.idmap['domain01'];
        const email_slot_ref01_list = (await email_slot_ref01_ent.list(email_slot_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(email_slot_ref01_list, { id: email_slot_ref01_data.id })));
        // LOAD
        const email_slot_ref01_match_dt0 = {};
        email_slot_ref01_match_dt0.id = email_slot_ref01_data.id;
        email_slot_ref01_match_dt0['domain'] = setup.idmap['domain'] ?? setup.idmap['domain01'];
        const email_slot_ref01_data_dt0 = (await email_slot_ref01_ent.load(email_slot_ref01_match_dt0)).data();
        (0, node_assert_1.default)(email_slot_ref01_data_dt0.id === email_slot_ref01_data.id);
        // REMOVE
        const email_slot_ref01_match_rm0 = { id: email_slot_ref01_data.id };
        email_slot_ref01_match_rm0['domain'] = setup.idmap['domain'] ?? setup.idmap['domain01'];
        await email_slot_ref01_ent.remove(email_slot_ref01_match_rm0);
        // LIST
        const email_slot_ref01_match_rt0 = {};
        email_slot_ref01_match_rt0['domain'] = setup.idmap['domain01'];
        const email_slot_ref01_list_rt0 = (await email_slot_ref01_ent.list(email_slot_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(email_slot_ref01_list_rt0, { id: email_slot_ref01_data.id })));
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/email_slot/EmailSlotTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.GandiSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['email_slot01', 'email_slot02', 'email_slot03', 'domain01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'GANDI_TEST_EMAIL_SLOT_ENTID': idmap,
        'GANDI_TEST_LIVE': 'FALSE',
        'GANDI_TEST_EXPLAIN': 'FALSE',
        'GANDI_APIKEY': '',
    });
    idmap = env['GANDI_TEST_EMAIL_SLOT_ENTID'];
    const live = 'TRUE' === env.GANDI_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['GANDI_TEST_EMAIL_SLOT_ENTID'];
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
//# sourceMappingURL=EmailSlotEntity.test.js.map