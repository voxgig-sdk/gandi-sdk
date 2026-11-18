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
(0, node_test_1.describe)('AcmeSubscriptionEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when GANDI_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('GANDI_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.GandiSDK.test();
        const ent = testsdk.AcmeSubscription();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('acme_subscription hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.GandiSDK.test(offline).AcmeSubscription().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.GandiSDK.test(offline).AcmeSubscription()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.GandiSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.AcmeSubscription().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.GandiSDK.test().AcmeSubscription().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.GandiSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.AcmeSubscription().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.AcmeSubscription().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.GandiSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.AcmeSubscription().list({ "created_at": 1, "ends_at": "x", "name": "x", "provider": "x", "sharing_id": "x", "status": "x", "validation_type": "x", "year": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.GANDI_TEST_LIVE;
        for (const op of ['create', 'list', 'update', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'acme_subscription.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "country": { "a": true, "h": "Country", "n": "country", "r": true, "t": "`$STRING`", "key$": "country", "index$": 0 }, "created_at": { "a": true, "h": "Created At", "n": "created_at", "r": true, "t": "`$STRING`", "key$": "created_at", "index$": 1 }, "currency": { "a": true, "h": "Currency", "n": "currency", "r": true, "t": "`$STRING`", "key$": "currency", "index$": 2 }, "domains": { "a": true, "h": "Domains", "n": "domains", "r": true, "t": "`$ARRAY`", "key$": "domains", "index$": 3 }, "duration": { "a": true, "h": "Duration", "n": "duration", "r": true, "t": "`$INTEGER`", "key$": "duration", "index$": 4 }, "eab_hmac": { "a": true, "h": "Eab Hmac", "n": "eab_hmac", "r": true, "t": "`$STRING`", "key$": "eab_hmac", "index$": 5 }, "eab_id": { "a": true, "h": "Eab Id", "n": "eab_id", "r": true, "t": "`$STRING`", "key$": "eab_id", "index$": 6 }, "ends_at": { "a": true, "h": "Ends At", "n": "ends_at", "r": true, "t": "`$STRING`", "key$": "ends_at", "index$": 7 }, "grid": { "a": true, "h": "Grid", "n": "grid", "r": true, "t": "`$STRING`", "key$": "grid", "index$": 8 }, "message": { "a": true, "h": "Message", "n": "message", "r": true, "t": "`$STRING`", "key$": "message", "index$": 9 }, "name": { "a": true, "h": "Name", "n": "name", "r": true, "t": "`$STRING`", "key$": "name", "index$": 10 }, "provider": { "a": true, "h": "Provider", "n": "provider", "r": true, "t": "`$STRING`", "key$": "provider", "index$": 11 }, "server_url": { "a": true, "h": "Server Url", "n": "server_url", "r": true, "t": "`$STRING`", "key$": "server_url", "index$": 12 }, "status": { "a": true, "h": "Status", "n": "status", "r": true, "t": "`$STRING`", "key$": "status", "index$": 13 }, "subscription_id": { "a": true, "h": "Subscription Id", "n": "subscription_id", "r": true, "t": "`$STRING`", "key$": "subscription_id", "index$": 14 }, "validation_type": { "a": true, "h": "Validation Type", "n": "validation_type", "r": true, "t": "`$STRING`", "key$": "validation_type", "index$": 15 }, "years": { "a": true, "h": "Years", "n": "years", "r": true, "t": "`$STRING`", "key$": "years", "index$": 16 } }, "name": "acme_subscription", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["country", "currency", "domains", "duration", "grid", "name", "provider", "validation_type"], "co": { "id": "POST /acme/subscriptions", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "explode": true, "k": "query", "n": "sharing_id", "or": "sharing_id", "r": true, "style": "form", "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/acme/subscriptions", "q": { "exist": ["sharing_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "acme" }, { "lit": "subscriptions" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /acme/subscriptions", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "explode": true, "k": "query", "n": "created_at", "or": "created_at", "r": true, "style": "form", "t": "`$STRING`", "index$": 0 }, { "a": true, "explode": true, "k": "query", "n": "ends_at", "or": "ends_at", "r": true, "style": "form", "t": "`$STRING`", "index$": 1 }, { "a": true, "explode": true, "k": "query", "n": "name", "or": "name", "r": true, "style": "form", "t": "`$STRING`", "index$": 2 }, { "a": true, "explode": true, "k": "query", "n": "provider", "or": "provider", "r": true, "style": "form", "t": "`$STRING`", "index$": 3 }, { "a": true, "explode": true, "k": "query", "n": "sharing_id", "or": "sharing_id", "r": true, "style": "form", "t": "`$STRING`", "index$": 4 }, { "a": true, "explode": true, "k": "query", "n": "status", "or": "status", "r": true, "style": "form", "t": "`$STRING`", "index$": 5 }, { "a": true, "explode": true, "k": "query", "n": "validation_type", "or": "validation_type", "r": true, "style": "form", "t": "`$STRING`", "index$": 6 }, { "a": true, "explode": true, "k": "query", "n": "year", "or": "years", "r": true, "style": "form", "t": "`$STRING`", "index$": 7 }] }, "k": "http", "m": "GET", "o": "/acme/subscriptions", "q": { "exist": ["created_at", "ends_at", "name", "provider", "sharing_id", "status", "validation_type", "year"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "acme" }, { "lit": "subscriptions" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /acme/subscriptions/{subscription_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "subscription_id", "or": "subscription_id", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "explode": true, "k": "query", "n": "sharing_id", "or": "sharing_id", "r": true, "style": "form", "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/acme/subscriptions/{subscription_id}", "q": { "exist": ["sharing_id", "subscription_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "acme" }, { "lit": "subscriptions" }, { "var": "subscription_id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /acme/subscriptions/{subscription_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "subscription_id", "or": "subscription_id", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "explode": true, "k": "query", "n": "sharing_id", "or": "sharing_id", "r": true, "style": "form", "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/acme/subscriptions/{subscription_id}", "q": { "exist": ["sharing_id", "subscription_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "acme" }, { "lit": "subscriptions" }, { "var": "subscription_id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "bf": ["name"], "co": { "id": "PATCH /acme/subscriptions/{subscription_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "subscription_id", "or": "subscription_id", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "explode": true, "k": "query", "n": "sharing_id", "or": "sharing_id", "r": true, "style": "form", "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PATCH", "o": "/acme/subscriptions/{subscription_id}", "q": { "exist": ["sharing_id", "subscription_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "acme" }, { "lit": "subscriptions" }, { "var": "subscription_id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "bf": ["country", "currency", "domains_to_add", "domains_to_delete", "grid", "provider", "validation_type"], "co": { "id": "PATCH /acme/subscriptions/{subscription_id}/domains", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "subscription_id", "or": "subscription_id", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "explode": true, "k": "query", "n": "sharing_id", "or": "sharing_id", "r": true, "style": "form", "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PATCH", "o": "/acme/subscriptions/{subscription_id}/domains", "q": { "$action": "domains", "exist": ["sharing_id", "subscription_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "acme" }, { "lit": "subscriptions" }, { "var": "subscription_id" }, { "lit": "domains" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "update" } }, "relations": { "ancestors": [] }, "key$": "acme_subscription", "name__orig": "acme_subscription", "Name": "AcmeSubscription", "name_": "acme_subscription", "name-": "acme-subscription", "NAME": "ACME_SUBSCRIPTION", "index$": 4 }, { "active": true, "entity": "acme_subscription", "key$": "BasicAcmeSubscriptionFlow", "kind": "basic", "name": "BasicAcmeSubscriptionFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "acme_subscription_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "acme_subscription_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "acme_subscription_ref01", "srcdatavar": "acme_subscription_ref01_data", "suffix": "_up0", "textfield": "country" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-acme_subscription_ref01" } }], "v": [], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "acme_subscription_ref01", "srcdatavar": "acme_subscription_ref01_data", "suffix": "_dt0" }, "m": { "id": "acme_subscription01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-acme_subscription_ref01" } }], "index$": 3 }, { "a": true, "d": {}, "i": { "ref": "acme_subscription_ref01", "suffix": "_rm0" }, "m": { "id": "acme_subscription01" }, "o": "remove", "s": [], "v": [], "index$": 4 }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "acme_subscription_ref01" } }], "index$": 5 }] }, 'AcmeSubscription', { "POST /acme/subscriptions": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "country": { "type": "string", "key$": "country" }, "currency": { "type": "string", "default": "EUR", "key$": "currency" }, "domains": { "type": "array", "items": { "type": "string" }, "minItems": 1, "key$": "domains" }, "duration": { "type": "integer", "default": 1, "key$": "duration" }, "grid": { "type": "string", "default": "A", "key$": "grid" }, "name": { "type": "string", "default": "FIXME", "minLength": 1, "maxLength": 200, "key$": "name" }, "provider": { "type": "string", "enum": ["sectigo", "digicert"], "key$": "provider" }, "validation_type": { "type": "string", "enum": ["dv", "ov"], "key$": "validation_type" } }, "required": ["country", "currency", "domains", "duration", "grid", "name", "provider", "validation_type"] } } } }, "parameters": [{ "name": "sharing_id", "in": "query", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "GET /acme/subscriptions": { "protocol": "http", "parameters": [{ "name": "created_at", "in": "query", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "ends_at", "in": "query", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "name", "in": "query", "required": true, "schema": { "type": "string" }, "index$": 2 }, { "name": "provider", "in": "query", "required": true, "schema": { "type": "string" }, "index$": 3 }, { "name": "sharing_id", "in": "query", "required": true, "schema": { "type": "string" }, "index$": 4 }, { "name": "status", "in": "query", "required": true, "schema": { "type": "string" }, "index$": 5 }, { "name": "validation_type", "in": "query", "required": true, "schema": { "type": "string" }, "index$": 6 }, { "name": "years", "in": "query", "required": true, "schema": { "type": "string" }, "index$": 7 }] }, "GET /acme/subscriptions/{subscription_id}": { "protocol": "http", "parameters": [{ "name": "subscription_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "sharing_id", "in": "query", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "DELETE /acme/subscriptions/{subscription_id}": { "protocol": "http", "parameters": [{ "name": "subscription_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "sharing_id", "in": "query", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "PATCH /acme/subscriptions/{subscription_id}": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "name": { "type": "string", "minLength": 1, "maxLength": 200, "key$": "name" } }, "required": ["name"] } } } }, "parameters": [{ "name": "subscription_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "sharing_id", "in": "query", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "PATCH /acme/subscriptions/{subscription_id}/domains": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "country": { "type": "string" }, "currency": { "type": "string", "default": "EUR" }, "domains_to_add": { "type": "array", "items": { "type": "string" } }, "domains_to_delete": { "type": "array", "items": { "type": "string" } }, "grid": { "type": "string", "default": "A" }, "provider": { "type": "string", "default": "sectigo" }, "validation_type": { "type": "string", "default": "dv" } }, "required": ["country", "currency", "domains_to_add", "domains_to_delete", "grid", "provider", "validation_type"] } } } }, "parameters": [{ "name": "subscription_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "sharing_id", "in": "query", "required": true, "schema": { "type": "string" }, "index$": 1 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "acme_subscription.create.0": "GET-only live run: needs POST /acme/subscriptions", "acme_subscription.update.2": "GET-only live run: needs PATCH /acme/subscriptions/{subscription_id}", "acme_subscription.remove.4": "GET-only live run: needs DELETE /acme/subscriptions/{subscription_id}" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const acme_subscription_ref01_ent = client.AcmeSubscription();
        let acme_subscription_ref01_data = setup.data.new.acme_subscription['acme_subscription_ref01'];
        acme_subscription_ref01_data = (await acme_subscription_ref01_ent.create(acme_subscription_ref01_data)).data();
        (0, node_assert_1.default)(null != acme_subscription_ref01_data);
        // LIST
        const acme_subscription_ref01_match = {};
        const acme_subscription_ref01_list = (await acme_subscription_ref01_ent.list(acme_subscription_ref01_match)).map((e) => e.data());
        // UPDATE
        const acme_subscription_ref01_data_up0 = {};
        const acme_subscription_ref01_markdef_up0 = { name: 'country', value: 'Mark01-acme_subscription_ref01_' + setup.now };
        acme_subscription_ref01_data_up0[acme_subscription_ref01_markdef_up0.name] = acme_subscription_ref01_markdef_up0.value;
        const acme_subscription_ref01_resdata_up0 = (await acme_subscription_ref01_ent.update(acme_subscription_ref01_data_up0)).data();
        (0, node_assert_1.default)(null != acme_subscription_ref01_resdata_up0);
        (0, node_assert_1.default)(acme_subscription_ref01_resdata_up0[acme_subscription_ref01_markdef_up0.name] === acme_subscription_ref01_markdef_up0.value);
        // LIST
        const acme_subscription_ref01_match_rt0 = {};
        const acme_subscription_ref01_list_rt0 = (await acme_subscription_ref01_ent.list(acme_subscription_ref01_match_rt0)).map((e) => e.data());
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/acme_subscription/AcmeSubscriptionTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.GandiSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['acme_subscription01', 'acme_subscription02', 'acme_subscription03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'GANDI_TEST_ACME_SUBSCRIPTION_ENTID': idmap,
        'GANDI_TEST_LIVE': 'FALSE',
        'GANDI_TEST_EXPLAIN': 'FALSE',
        'GANDI_APIKEY': '',
    });
    idmap = env['GANDI_TEST_ACME_SUBSCRIPTION_ENTID'];
    const live = 'TRUE' === env.GANDI_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['GANDI_TEST_ACME_SUBSCRIPTION_ENTID'];
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
//# sourceMappingURL=AcmeSubscriptionEntity.test.js.map