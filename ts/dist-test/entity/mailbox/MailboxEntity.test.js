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
(0, node_test_1.describe)('MailboxEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when GANDI_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('GANDI_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.GandiSDK.test();
        const ent = testsdk.Mailbox();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('mailbox hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.GandiSDK.test(offline).Mailbox().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.GandiSDK.test(offline).Mailbox()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.GandiSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.Mailbox().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.GandiSDK.test().Mailbox().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.GandiSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.Mailbox().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.Mailbox().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.GandiSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Mailbox().list({ "address": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.GANDI_TEST_LIVE;
        for (const op of ['create', 'list', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'mailbox.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "address": { "a": true, "h": "Address", "n": "address", "r": true, "t": "`$STRING`", "key$": "address", "index$": 0 }, "aliases": { "a": true, "h": "Aliases", "n": "aliases", "r": false, "t": "`$ARRAY`", "key$": "aliases", "index$": 1 }, "antispam": { "a": true, "h": "Antispam", "n": "antispam", "op": { "patch": { "req": false, "type": "`$BOOLEAN`" } }, "r": true, "t": "`$BOOLEAN`", "key$": "antispam", "index$": 2 }, "autorenew": { "a": true, "h": "Autorenew", "n": "autorenew", "r": true, "t": "`$OBJECT`", "key$": "autorenew", "index$": 3 }, "config": { "a": true, "h": "Config", "n": "config", "r": true, "t": "`$OBJECT`", "key$": "config", "index$": 4 }, "config_name": { "a": true, "h": "Config Name", "n": "config_name", "op": { "patch": { "req": false, "type": "`$STRING`" } }, "r": true, "t": "`$STRING`", "key$": "config_name", "index$": 5 }, "configuration": { "a": true, "h": "Configuration", "n": "configuration", "r": true, "t": "`$ARRAY`", "key$": "configuration", "index$": 6 }, "created_at": { "a": true, "fo": "date-time", "h": "Created At", "n": "created_at", "r": true, "t": "`$STRING`", "key$": "created_at", "index$": 7 }, "data_access": { "a": true, "h": "Data Access", "n": "data_access", "r": true, "t": "`$BOOLEAN`", "key$": "data_access", "index$": 8 }, "date_last_validation": { "a": true, "fo": "date-time", "h": "Date Last Validation", "n": "date_last_validation", "r": false, "t": "`$STRING`", "key$": "date_last_validation", "index$": 9 }, "destinations": { "a": true, "h": "Destinations", "n": "destinations", "r": true, "t": "`$ARRAY`", "key$": "destinations", "index$": 10 }, "dkim": { "a": true, "h": "Dkim", "n": "dkim", "r": true, "t": "`$BOOLEAN`", "key$": "dkim", "index$": 11 }, "domain_part": { "a": true, "h": "Domain Part", "n": "domain_part", "r": true, "t": "`$STRING`", "key$": "domain_part", "index$": 12 }, "duration_month": { "a": true, "h": "Duration Month", "n": "duration_month", "r": false, "t": "`$INTEGER`", "key$": "duration_month", "index$": 13 }, "email": { "a": true, "h": "Email", "n": "email", "r": true, "t": "`$STRING`", "key$": "email", "index$": 14 }, "expires_at": { "a": true, "fo": "date-time", "h": "Expires At", "n": "expires_at", "op": { "load": { "req": false, "type": "`$STRING`" } }, "r": true, "t": "`$STRING`", "key$": "expires_at", "index$": 15 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "syn": true, "t": "`$STRING`", "key$": "id", "index$": 16 }, "internal": { "a": true, "h": "Internal", "n": "internal", "r": true, "t": "`$BOOLEAN`", "key$": "internal", "index$": 17 }, "internal_domain": { "a": true, "h": "Internal Domain", "n": "internal_domain", "r": true, "t": "`$BOOLEAN`", "key$": "internal_domain", "index$": 18 }, "is_livedns": { "a": true, "h": "Is Livedns", "n": "is_livedns", "r": true, "t": "`$BOOLEAN`", "key$": "is_livedns", "index$": 19 }, "issues": { "a": true, "h": "Issues", "n": "issues", "r": false, "t": "`$ARRAY`", "key$": "issues", "index$": 20 }, "last_paid_duration": { "a": true, "h": "Last Paid Duration", "n": "last_paid_duration", "op": { "load": { "req": false, "type": "`$INTEGER`" } }, "r": true, "t": "`$INTEGER`", "key$": "last_paid_duration", "index$": 21 }, "local_part": { "a": true, "h": "Local Part", "n": "local_part", "r": true, "t": "`$STRING`", "key$": "local_part", "index$": 22 }, "message": { "a": true, "h": "Message", "n": "message", "r": true, "t": "`$STRING`", "key$": "message", "index$": 23 }, "mx": { "a": true, "h": "Mx", "n": "mx", "r": true, "t": "`$BOOLEAN`", "key$": "mx", "index$": 24 }, "owner": { "a": true, "h": "Owner", "n": "owner", "r": true, "t": "`$OBJECT`", "key$": "owner", "index$": 25 }, "password": { "a": true, "h": "Password", "n": "password", "op": { "patch": { "req": false, "type": "`$STRING`" } }, "r": true, "t": "`$STRING`", "key$": "password", "index$": 26 }, "quota": { "a": true, "h": "Quota", "n": "quota", "r": true, "t": "`$INTEGER`", "key$": "quota", "index$": 27 }, "quota_used": { "a": true, "h": "Quota Used", "n": "quota_used", "r": true, "t": "`$INTEGER`", "key$": "quota_used", "index$": 28 }, "refund_info": { "a": true, "h": "Refund Info", "n": "refund_info", "r": true, "t": "`$OBJECT`", "key$": "refund_info", "index$": 29 }, "refundable": { "a": true, "h": "Refundable", "n": "refundable", "r": true, "t": "`$BOOLEAN`", "key$": "refundable", "index$": 30 }, "responder": { "a": true, "h": "Responder", "n": "responder", "r": true, "t": "`$OBJECT`", "key$": "responder", "index$": 31 }, "spf": { "a": true, "h": "Spf", "n": "spf", "r": true, "t": "`$BOOLEAN`", "key$": "spf", "index$": 32 }, "txt": { "a": true, "h": "Txt", "n": "txt", "r": true, "t": "`$BOOLEAN`", "key$": "txt", "index$": 33 }, "updated_at": { "a": true, "fo": "date-time", "h": "Updated At", "n": "updated_at", "r": true, "t": "`$STRING`", "key$": "updated_at", "index$": 34 }, "uuid": { "a": true, "h": "Uuid", "n": "uuid", "r": true, "t": "`$STRING`", "key$": "uuid", "index$": 35 }, "webhosting_pack": { "a": true, "h": "Webhosting Pack", "n": "webhosting_pack", "r": true, "t": "`$BOOLEAN`", "key$": "webhosting_pack", "index$": 36 } }, "id": { "field": "id", "name": "id" }, "name": "mailbox", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["duration"], "co": { "id": "POST /mailbox/mailboxes/{email}/renew", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "explode": false, "k": "header", "n": "dry_run", "or": "Dry-Run", "r": false, "style": "simple", "t": "`$INTEGER`", "index$": 0 }], "params": [{ "a": true, "k": "param", "n": "email", "or": "email", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "explode": true, "k": "query", "n": "sharing_id", "or": "sharing_id", "r": false, "style": "form", "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/mailbox/mailboxes/{email}/renew", "q": { "$action": "renew", "exist": ["email"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "mailbox" }, { "lit": "mailboxes" }, { "var": "email" }, { "lit": "renew" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "bf": ["records_to_validate"], "co": { "id": "POST /mailbox/domains/{domain}/validate", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "domain", "or": "domain", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/mailbox/domains/{domain}/validate", "q": { "$action": "validate", "exist": ["domain"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "mailbox" }, { "lit": "domains" }, { "var": "domain" }, { "lit": "validate" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "a": true, "bf": ["destinations", "source"], "co": { "id": "POST /mailbox/forwards", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/mailbox/forwards", "q": { "$action": "forward" }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "mailbox" }, { "lit": "forwards" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }, { "a": true, "bf": ["aliases", "config_name", "duration_month", "email", "password"], "co": { "id": "POST /mailbox/mailboxes", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "explode": true, "k": "query", "n": "sharing_id", "or": "sharing_id", "r": false, "style": "form", "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/mailbox/mailboxes", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "mailbox" }, { "lit": "mailboxes" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 3 }, { "a": true, "bf": ["autorenew", "config_name", "duration_month", "quantity"], "co": { "id": "POST /mailbox/products", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "explode": true, "k": "query", "n": "sharing_id", "or": "sharing_id", "r": false, "style": "form", "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/mailbox/products", "q": { "$action": "product" }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "mailbox" }, { "lit": "products" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 4 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /mailbox/domains", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": 1, "explode": true, "k": "query", "n": "page", "or": "page", "r": false, "style": "form", "t": "`$INTEGER`", "index$": 0 }, { "a": true, "explode": true, "k": "query", "n": "per_page", "or": "per_page", "r": false, "style": "form", "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/mailbox/domains", "q": { "$action": "domain" }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "mailbox" }, { "lit": "domains" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /mailbox/forwards", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": 1, "explode": true, "k": "query", "n": "page", "or": "page", "r": false, "style": "form", "t": "`$INTEGER`", "index$": 0 }, { "a": true, "explode": true, "k": "query", "n": "per_page", "or": "per_page", "r": false, "style": "form", "t": "`$INTEGER`", "index$": 1 }, { "a": true, "explode": true, "k": "query", "n": "search", "or": "search", "r": false, "style": "form", "t": "`$STRING`", "index$": 2 }, { "a": true, "explode": true, "k": "query", "n": "sharing_id", "or": "sharing_id", "r": false, "style": "form", "t": "`$STRING`", "index$": 3 }, { "a": true, "ex": "source", "explode": true, "k": "query", "n": "sort_by", "or": "sort_by", "r": false, "style": "form", "t": "`$STRING`", "index$": 4 }] }, "k": "http", "m": "GET", "o": "/mailbox/forwards", "q": { "$action": "forward" }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "mailbox" }, { "lit": "forwards" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "a": true, "co": { "id": "GET /mailbox/mailboxes", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "explode": true, "k": "query", "n": "address", "or": "address", "r": false, "style": "form", "t": "`$STRING`", "index$": 0 }, { "a": true, "explode": true, "k": "query", "n": "domain_part", "or": "domain_part", "r": false, "style": "form", "t": "`$STRING`", "index$": 1 }, { "a": true, "explode": true, "k": "query", "n": "local_part", "or": "local_part", "r": false, "style": "form", "t": "`$STRING`", "index$": 2 }, { "a": true, "ex": 1, "explode": true, "k": "query", "n": "page", "or": "page", "r": false, "style": "form", "t": "`$INTEGER`", "index$": 3 }, { "a": true, "explode": true, "k": "query", "n": "per_page", "or": "per_page", "r": false, "style": "form", "t": "`$INTEGER`", "index$": 4 }, { "a": true, "explode": true, "k": "query", "n": "search", "or": "search", "r": false, "style": "form", "t": "`$STRING`", "index$": 5 }, { "a": true, "explode": true, "k": "query", "n": "sharing_id", "or": "sharing_id", "r": false, "style": "form", "t": "`$STRING`", "index$": 6 }, { "a": true, "ex": "id", "explode": true, "k": "query", "n": "sort_by", "or": "sort_by", "r": false, "style": "form", "t": "`$STRING`", "index$": 7 }] }, "k": "http", "m": "GET", "o": "/mailbox/mailboxes", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "mailbox" }, { "lit": "mailboxes" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }, { "a": true, "co": { "id": "GET /mailbox/products", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "explode": true, "k": "query", "n": "sharing_id", "or": "sharing_id", "r": false, "style": "form", "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/mailbox/products", "q": { "$action": "product" }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "mailbox" }, { "lit": "products" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 3 }, { "a": true, "co": { "id": "GET /mailbox/quotas", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "explode": true, "k": "query", "n": "sharing_id", "or": "sharing_id", "r": false, "style": "form", "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/mailbox/quotas", "q": { "$action": "quota" }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "mailbox" }, { "lit": "quotas" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 4 }, { "a": true, "co": { "id": "GET /mailbox/slots", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "explode": true, "k": "query", "n": "config_name", "or": "config_name", "r": false, "style": "form", "t": "`$STRING`", "index$": 0 }, { "a": true, "explode": true, "k": "query", "n": "expires_at_gte", "or": "expires_at_gte", "r": false, "style": "form", "t": "`$STRING`", "index$": 1 }, { "a": true, "explode": true, "k": "query", "n": "expires_at_lte", "or": "expires_at_lte", "r": false, "style": "form", "t": "`$STRING`", "index$": 2 }, { "a": true, "explode": true, "k": "query", "n": "last_paid_duration", "or": "last_paid_duration", "r": false, "style": "form", "t": "`$INTEGER`", "index$": 3 }, { "a": true, "ex": 1, "explode": true, "k": "query", "n": "page", "or": "page", "r": false, "style": "form", "t": "`$INTEGER`", "index$": 4 }, { "a": true, "explode": true, "k": "query", "n": "per_page", "or": "per_page", "r": false, "style": "form", "t": "`$INTEGER`", "index$": 5 }, { "a": true, "explode": true, "k": "query", "n": "refundable", "or": "refundable", "r": false, "style": "form", "t": "`$STRING`", "index$": 6 }, { "a": true, "explode": true, "k": "query", "n": "sharing_id", "or": "sharing_id", "r": false, "style": "form", "t": "`$STRING`", "index$": 7 }, { "a": true, "ex": "refund_expires_at", "explode": true, "k": "query", "n": "sort_by", "or": "sort_by", "r": false, "style": "form", "t": "`$STRING`", "index$": 8 }, { "a": true, "explode": true, "k": "query", "n": "webhosting_pack", "or": "webhosting_pack", "r": false, "style": "form", "t": "`$BOOLEAN`", "index$": 9 }] }, "k": "http", "m": "GET", "o": "/mailbox/slots", "q": { "$action": "slot" }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "mailbox" }, { "lit": "slots" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 5 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /mailbox/domains/{domain}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "domain", "or": "domain", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/mailbox/domains/{domain}", "q": { "exist": ["domain"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "mailbox" }, { "lit": "domains" }, { "var": "domain" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /mailbox/mailboxes/{email}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "email", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "explode": true, "k": "query", "n": "sharing_id", "or": "sharing_id", "r": false, "style": "form", "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/mailbox/mailboxes/{email}", "q": { "exist": ["id"] }, "r": { "param": { "email": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "mailbox" }, { "lit": "mailboxes" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "a": true, "co": { "id": "GET /mailbox/slots/{slot_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "slot_id", "or": "slot_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/mailbox/slots/{slot_id}", "q": { "exist": ["slot_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "mailbox" }, { "lit": "slots" }, { "var": "slot_id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }], "key$": "load" }, "patch": { "input": "data", "name": "patch", "points": [{ "a": true, "bf": ["aliases", "antispam", "autorenew", "config_name", "password", "responder"], "co": { "id": "PATCH /mailbox/mailboxes/{email}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "email", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PATCH", "o": "/mailbox/mailboxes/{email}", "q": { "exist": ["id"] }, "r": { "param": { "email": "id" } }, "s": [{ "lit": "mailbox" }, { "lit": "mailboxes" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "patch" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /mailbox/mailboxes/{email}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "email", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "explode": true, "k": "query", "n": "sharing_id", "or": "sharing_id", "r": false, "style": "form", "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/mailbox/mailboxes/{email}", "q": { "exist": ["id"] }, "r": { "param": { "email": "id" } }, "s": [{ "lit": "mailbox" }, { "lit": "mailboxes" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "DELETE /mailbox/forwards/{source}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "source", "or": "source", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/mailbox/forwards/{source}", "q": { "exist": ["source"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "mailbox" }, { "lit": "forwards" }, { "var": "source" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "bf": ["destinations"], "co": { "id": "PUT /mailbox/forwards/{source}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "source", "or": "source", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PUT", "o": "/mailbox/forwards/{source}", "q": { "exist": ["source"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "mailbox" }, { "lit": "forwards" }, { "var": "source" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [["$.main.kit.entity.domain"]] }, "key$": "mailbox", "name__orig": "mailbox", "Name": "Mailbox", "name_": "mailbox", "name-": "mailbox", "NAME": "MAILBOX", "index$": 8 }, { "active": true, "entity": "mailbox", "key$": "BasicMailboxFlow", "kind": "basic", "name": "BasicMailboxFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "mailbox_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "mailbox_ref01" } }], "index$": 1 }, { "a": false, "d": {}, "i": { "ref": "mailbox_ref01", "srcdatavar": "mailbox_ref01_data", "suffix": "_up0", "textfield": "address" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-mailbox_ref01" } }], "v": [], "unreachable": true }, { "a": true, "d": {}, "i": { "ref": "mailbox_ref01", "srcdatavar": "mailbox_ref01_data", "suffix": "_dt0" }, "m": { "id": "mailbox01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-mailbox_ref01" } }], "index$": 2, "route": "GET /mailbox/mailboxes/{email}", "record": {} }, { "a": true, "d": {}, "i": { "ref": "mailbox_ref01", "suffix": "_rm0" }, "m": { "id": "mailbox01" }, "o": "remove", "s": [], "v": [], "index$": 3 }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "mailbox_ref01" } }], "index$": 4 }] }, 'Mailbox', { "POST /mailbox/mailboxes/{email}/renew": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "duration": { "type": "integer" } }, "required": ["duration"] } } } }, "parameters": [{ "name": "email", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "sharing_id", "in": "query", "schema": { "type": "string" }, "index$": 1 }, { "name": "Dry-Run", "in": "header", "schema": { "type": "integer" }, "index$": 2 }] }, "POST /mailbox/domains/{domain}/validate": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "records_to_validate": { "type": "array", "items": { "type": "string" } } }, "required": ["records_to_validate"] } } } }, "parameters": [{ "name": "domain", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "POST /mailbox/forwards": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "destinations": { "type": "array", "items": { "type": "string" } }, "source": { "type": "string" } }, "required": ["destinations", "source"] } } } }, "parameters": [] }, "POST /mailbox/mailboxes": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "config_name": { "type": "string", "key$": "config_name" }, "email": { "type": "string", "key$": "email" }, "password": { "type": "string", "minLength": 8, "maxLength": 200, "key$": "password" }, "aliases": { "type": "array", "items": { "type": "string" }, "key$": "aliases" }, "duration_month": { "type": "integer", "enum": [1, 12], "key$": "duration_month" } }, "required": ["config_name", "email", "password"] } } } }, "parameters": [{ "name": "sharing_id", "in": "query", "schema": { "type": "string" }, "index$": 0 }] }, "POST /mailbox/products": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "config_name": { "type": "string", "enum": ["standard", "premium"] }, "duration_month": { "type": "integer", "enum": [1, 12] }, "quantity": { "type": "integer" }, "autorenew": { "type": "boolean", "default": false } }, "required": ["config_name", "duration_month", "quantity"] } } } }, "parameters": [{ "name": "sharing_id", "in": "query", "schema": { "type": "string" }, "index$": 0 }] }, "GET /mailbox/domains": { "protocol": "http", "parameters": [{ "name": "page", "in": "query", "schema": { "type": "integer", "default": 1, "minimum": 1 }, "index$": 0 }, { "name": "per_page", "in": "query", "schema": { "type": "integer", "minimum": 1 }, "index$": 1 }] }, "GET /mailbox/forwards": { "protocol": "http", "parameters": [{ "name": "page", "in": "query", "schema": { "type": "integer", "default": 1, "minimum": 1 }, "index$": 0 }, { "name": "per_page", "in": "query", "schema": { "type": "integer", "minimum": 1 }, "index$": 1 }, { "name": "search", "in": "query", "schema": { "type": "string" }, "index$": 2 }, { "name": "sharing_id", "in": "query", "schema": { "type": "string" }, "index$": 3 }, { "name": "sort_by", "in": "query", "schema": { "type": "string", "enum": ["source", "-source"], "default": "source" }, "index$": 4 }] }, "GET /mailbox/mailboxes": { "protocol": "http", "parameters": [{ "name": "address", "in": "query", "schema": { "type": "string" }, "index$": 0 }, { "name": "domain_part", "in": "query", "schema": { "type": "string" }, "index$": 1 }, { "name": "local_part", "in": "query", "schema": { "type": "string" }, "index$": 2 }, { "name": "page", "in": "query", "schema": { "type": "integer", "default": 1, "minimum": 1 }, "index$": 3 }, { "name": "per_page", "in": "query", "schema": { "type": "integer", "minimum": 1 }, "index$": 4 }, { "name": "search", "in": "query", "schema": { "type": "string" }, "index$": 5 }, { "name": "sharing_id", "in": "query", "schema": { "type": "string" }, "index$": 6 }, { "name": "sort_by", "in": "query", "schema": { "type": "string", "enum": ["id", "-id", "local_part", "-local_part", "config_name", "-config_name", "expire_at", "-expire_at", "quota", "-quota", "autorenew", "-autorenew"], "default": "id" }, "index$": 7 }] }, "GET /mailbox/products": { "protocol": "http", "parameters": [{ "name": "sharing_id", "in": "query", "schema": { "type": "string" }, "index$": 0 }] }, "GET /mailbox/quotas": { "protocol": "http", "parameters": [{ "name": "sharing_id", "in": "query", "schema": { "type": "string" }, "index$": 0 }] }, "GET /mailbox/slots": { "protocol": "http", "parameters": [{ "name": "config_name", "in": "query", "schema": { "type": "string" }, "index$": 0 }, { "name": "expires_at_gte", "in": "query", "schema": { "type": "string", "format": "date-time" }, "index$": 1 }, { "name": "expires_at_lte", "in": "query", "schema": { "type": "string", "format": "date-time" }, "index$": 2 }, { "name": "last_paid_duration", "in": "query", "schema": { "type": "integer", "enum": [1, 12] }, "index$": 3 }, { "name": "page", "in": "query", "schema": { "type": "integer", "default": 1, "minimum": 1 }, "index$": 4 }, { "name": "per_page", "in": "query", "schema": { "type": "integer", "minimum": 1 }, "index$": 5 }, { "name": "refundable", "in": "query", "schema": { "type": "string", "enum": ["true", "false"] }, "index$": 6 }, { "name": "sharing_id", "in": "query", "schema": { "type": "string" }, "index$": 7 }, { "name": "sort_by", "in": "query", "schema": { "type": "string", "enum": ["refund_expires_at", "-refund_expires_at"], "default": "refund_expires_at" }, "index$": 8 }, { "name": "webhosting_pack", "in": "query", "schema": { "type": "boolean" }, "index$": 9 }] }, "GET /mailbox/domains/{domain}": { "protocol": "http", "parameters": [{ "name": "domain", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "GET /mailbox/mailboxes/{email}": { "protocol": "http", "parameters": [{ "name": "email", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "sharing_id", "in": "query", "schema": { "type": "string" }, "index$": 1 }] }, "GET /mailbox/slots/{slot_id}": { "protocol": "http", "parameters": [{ "name": "slot_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "PATCH /mailbox/mailboxes/{email}": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "aliases": { "type": "array", "items": { "type": "string" }, "key$": "aliases" }, "antispam": { "type": "boolean", "default": true, "key$": "antispam" }, "autorenew": { "type": "object", "properties": { "activated": { "type": "boolean" }, "duration": { "type": "integer", "enum": [1, 12] } }, "required": ["activated", "duration"], "key$": "autorenew" }, "config_name": { "type": "string", "enum": ["standard", "premium"], "key$": "config_name" }, "password": { "type": "string", "minLength": 8, "maxLength": 200, "key$": "password" }, "responder": { "type": "object", "properties": { "activated": { "type": "boolean", "default": false }, "ends_at": { "type": "string", "format": "date-time" }, "message": { "type": "string" }, "starts_at": { "type": "string", "format": "date-time" } }, "required": ["activated"], "key$": "responder" } } } } } }, "parameters": [{ "name": "email", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "DELETE /mailbox/mailboxes/{email}": { "protocol": "http", "parameters": [{ "name": "email", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "sharing_id", "in": "query", "schema": { "type": "string" }, "index$": 1 }] }, "DELETE /mailbox/forwards/{source}": { "protocol": "http", "parameters": [{ "name": "source", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "PUT /mailbox/forwards/{source}": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "destinations": { "type": "array", "items": { "type": "string" }, "key$": "destinations" } }, "required": ["destinations"] } } } }, "parameters": [{ "name": "source", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "mailbox.create.0": "GET-only live run: needs POST /mailbox/mailboxes/{email}/renew", "mailbox.update.2": "GET-only live run: needs PUT /mailbox/forwards/{source}", "mailbox.remove.4": "GET-only live run: needs DELETE /mailbox/mailboxes/{email}", "mailbox.list.5": "GET-only live run: checks a removal this run does not make" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const mailbox_ref01_ent = client.Mailbox();
        let mailbox_ref01_data = setup.data.new.mailbox['mailbox_ref01'];
        mailbox_ref01_data = (await mailbox_ref01_ent.create(mailbox_ref01_data)).data();
        (0, node_assert_1.default)(null != mailbox_ref01_data.id);
        // LIST
        const mailbox_ref01_match = {};
        const mailbox_ref01_list = (await mailbox_ref01_ent.list(mailbox_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(mailbox_ref01_list, { id: mailbox_ref01_data.id })));
        // LOAD
        const mailbox_ref01_match_dt0 = {};
        mailbox_ref01_match_dt0.id = mailbox_ref01_data.id;
        const mailbox_ref01_data_dt0 = (await mailbox_ref01_ent.load(mailbox_ref01_match_dt0)).data();
        (0, node_assert_1.default)(mailbox_ref01_data_dt0.id === mailbox_ref01_data.id);
        // REMOVE
        const mailbox_ref01_match_rm0 = { id: mailbox_ref01_data.id };
        await mailbox_ref01_ent.remove(mailbox_ref01_match_rm0);
        // LIST
        const mailbox_ref01_match_rt0 = {};
        const mailbox_ref01_list_rt0 = (await mailbox_ref01_ent.list(mailbox_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(mailbox_ref01_list_rt0, { id: mailbox_ref01_data.id })));
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/mailbox/MailboxTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.GandiSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['mailbox01', 'mailbox02', 'mailbox03', 'domain01', 'domain02', 'domain03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'GANDI_TEST_MAILBOX_ENTID': idmap,
        'GANDI_TEST_LIVE': 'FALSE',
        'GANDI_TEST_EXPLAIN': 'FALSE',
        'GANDI_APIKEY': '',
    });
    idmap = env['GANDI_TEST_MAILBOX_ENTID'];
    const live = 'TRUE' === env.GANDI_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['GANDI_TEST_MAILBOX_ENTID'];
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
//# sourceMappingURL=MailboxEntity.test.js.map