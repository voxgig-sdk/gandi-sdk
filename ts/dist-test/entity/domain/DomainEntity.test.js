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
(0, node_test_1.describe)('DomainEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when GANDI_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('GANDI_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.GandiSDK.test();
        const ent = testsdk.Domain();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('domain hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.GandiSDK.test(offline).Domain().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.GandiSDK.test(offline).Domain()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.GandiSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.Domain().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.GandiSDK.test().Domain().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.GandiSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.Domain().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.Domain().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.GandiSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Domain().list({ "fqdn": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.GANDI_TEST_LIVE;
        for (const op of ['create', 'list', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'domain.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "admin": { "a": true, "h": "Admin", "n": "admin", "r": true, "t": "`$OBJECT`", "key$": "admin", "index$": 0 }, "authinfo": { "a": true, "h": "Authinfo", "n": "authinfo", "r": false, "t": "`$STRING`", "key$": "authinfo", "index$": 1 }, "autorenew": { "a": true, "h": "Autorenew", "n": "autorenew", "r": true, "t": "`$OBJECT`", "key$": "autorenew", "index$": 2 }, "bill": { "a": true, "h": "Bill", "n": "bill", "r": true, "t": "`$OBJECT`", "key$": "bill", "index$": 3 }, "can_tld_lock": { "a": true, "h": "Can Tld Lock", "n": "can_tld_lock", "r": true, "t": "`$BOOLEAN`", "key$": "can_tld_lock", "index$": 4 }, "claims": { "a": true, "h": "Claims", "n": "claims", "r": false, "t": "`$STRING`", "key$": "claims", "index$": 5 }, "contacts": { "a": true, "h": "Contacts", "n": "contacts", "r": true, "t": "`$OBJECT`", "key$": "contacts", "index$": 6 }, "currency": { "a": true, "h": "Currency", "n": "currency", "r": false, "t": "`$STRING`", "key$": "currency", "index$": 7 }, "dates": { "a": true, "h": "Dates", "n": "dates", "r": true, "t": "`$OBJECT`", "key$": "dates", "index$": 8 }, "domain_owner": { "a": true, "h": "Domain Owner", "n": "domain_owner", "r": true, "t": "`$STRING`", "key$": "domain_owner", "index$": 9 }, "duration": { "a": true, "h": "Duration", "n": "duration", "r": false, "t": "`$INTEGER`", "key$": "duration", "index$": 10 }, "enforce_premium": { "a": true, "h": "Enforce Premium", "n": "enforce_premium", "r": false, "t": "`$BOOLEAN`", "key$": "enforce_premium", "index$": 11 }, "errors": { "a": true, "h": "Errors", "n": "errors", "r": false, "t": "`$ARRAY`", "key$": "errors", "index$": 12 }, "extra_parameters": { "a": true, "h": "Extra Parameters", "n": "extra_parameters", "r": false, "t": "`$OBJECT`", "key$": "extra_parameters", "index$": 13 }, "fqdn": { "a": true, "h": "Fqdn", "n": "fqdn", "r": true, "t": "`$STRING`", "key$": "fqdn", "index$": 14 }, "fqdn_unicode": { "a": true, "h": "Fqdn Unicode", "n": "fqdn_unicode", "r": true, "t": "`$STRING`", "key$": "fqdn_unicode", "index$": 15 }, "href": { "a": true, "h": "Href", "n": "href", "r": true, "t": "`$STRING`", "key$": "href", "index$": 16 }, "id": { "a": true, "h": "Id", "n": "id", "op": { "list": { "req": true, "type": "`$STRING`" } }, "r": false, "t": "`$STRING`", "key$": "id", "index$": 17 }, "lang": { "a": true, "h": "Lang", "n": "lang", "r": false, "t": "`$STRING`", "key$": "lang", "index$": 18 }, "mailbox_optin": { "a": true, "h": "Mailbox Optin", "n": "mailbox_optin", "r": false, "t": "`$BOOLEAN`", "key$": "mailbox_optin", "index$": 19 }, "nameserver": { "a": true, "h": "Nameserver", "n": "nameserver", "r": true, "t": "`$OBJECT`", "key$": "nameserver", "index$": 20 }, "nameservers": { "a": true, "h": "Nameservers", "n": "nameservers", "op": { "create": { "req": false, "type": "`$ARRAY`" } }, "r": true, "t": "`$ARRAY`", "key$": "nameservers", "index$": 21 }, "nameservers_ips": { "a": true, "h": "Nameservers Ips", "n": "nameservers_ips", "r": false, "t": "`$OBJECT`", "key$": "nameservers_ips", "index$": 22 }, "orga_owner": { "a": true, "h": "Orga Owner", "n": "orga_owner", "r": true, "t": "`$STRING`", "key$": "orga_owner", "index$": 23 }, "owner": { "a": true, "h": "Owner", "n": "owner", "r": true, "t": "`$OBJECT`", "key$": "owner", "index$": 24 }, "price": { "a": true, "h": "Price", "n": "price", "r": false, "t": "`$NUMBER`", "key$": "price", "index$": 25 }, "reachability": { "a": true, "h": "Reachability", "n": "reachability", "r": true, "t": "`$STRING`", "key$": "reachability", "index$": 26 }, "resellee_id": { "a": true, "h": "Resellee Id", "n": "resellee_id", "r": false, "t": "`$STRING`", "key$": "resellee_id", "index$": 27 }, "services": { "a": true, "h": "Services", "n": "services", "r": true, "t": "`$ARRAY`", "key$": "services", "index$": 28 }, "sharing_id": { "a": true, "h": "Sharing Id", "n": "sharing_id", "r": false, "t": "`$STRING`", "key$": "sharing_id", "index$": 29 }, "sharing_space": { "a": true, "h": "Sharing Space", "n": "sharing_space", "r": true, "t": "`$OBJECT`", "key$": "sharing_space", "index$": 30 }, "smd": { "a": true, "h": "Smd", "n": "smd", "r": false, "t": "`$STRING`", "key$": "smd", "index$": 31 }, "status": { "a": true, "h": "Status", "n": "status", "r": true, "t": "`$ARRAY`", "key$": "status", "index$": 32 }, "tags": { "a": true, "h": "Tags", "n": "tags", "r": false, "t": "`$ARRAY`", "key$": "tags", "index$": 33 }, "tech": { "a": true, "h": "Tech", "n": "tech", "r": true, "t": "`$OBJECT`", "key$": "tech", "index$": 34 }, "template_id": { "a": true, "h": "Template Id", "n": "template_id", "r": false, "t": "`$STRING`", "key$": "template_id", "index$": 35 }, "tld": { "a": true, "h": "Tld", "n": "tld", "r": true, "t": "`$STRING`", "key$": "tld", "index$": 36 }, "tld_period": { "a": true, "h": "Tld Period", "n": "tld_period", "r": false, "t": "`$STRING`", "key$": "tld_period", "index$": 37 }, "trustee_roles": { "a": true, "h": "Trustee Roles", "n": "trustee_roles", "r": false, "t": "`$ARRAY`", "key$": "trustee_roles", "index$": 38 } }, "id": { "field": "id", "name": "id" }, "name": "domain", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["duration"], "co": { "id": "POST /domain/domains/{domain}/renew", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "explode": false, "k": "header", "n": "dry_run", "or": "Dry-Run", "r": false, "style": "simple", "t": "`$INTEGER`", "index$": 0 }], "params": [{ "a": true, "k": "param", "n": "fqdn", "or": "domain", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "explode": true, "k": "query", "n": "sharing_id", "or": "sharing_id", "r": false, "style": "form", "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/domain/domains/{domain}/renew", "q": { "$action": "renew", "exist": ["fqdn"] }, "r": { "param": { "domain": "fqdn" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "domain" }, { "lit": "domains" }, { "var": "fqdn" }, { "lit": "renew" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "bf": false, "co": { "id": "POST /domain/domains/{domain}/restore", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "fqdn", "or": "domain", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "explode": true, "k": "query", "n": "sharing_id", "or": "sharing_id", "r": false, "style": "form", "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/domain/domains/{domain}/restore", "q": { "$action": "restore", "exist": ["fqdn"] }, "r": { "param": { "domain": "fqdn" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "domain" }, { "lit": "domains" }, { "var": "fqdn" }, { "lit": "restore" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "a": true, "bf": ["accept", "authinfo"], "co": { "id": "POST /domain/domains/{domain}/transferout", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "fqdn", "or": "domain", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/domain/domains/{domain}/transferout", "q": { "$action": "transferout", "exist": ["fqdn"] }, "r": { "param": { "domain": "fqdn" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "domain" }, { "lit": "domains" }, { "var": "fqdn" }, { "lit": "transferout" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }, { "a": true, "bf": ["admin", "bill", "claims", "currency", "duration", "enforce_premium", "extra_parameters", "fqdn", "lang", "mailbox_optin", "nameservers", "nameservers_ips", "owner", "price", "resellee_id", "smd", "tech", "template_id", "tld_period"], "co": { "id": "POST /domain/domains", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "explode": false, "k": "header", "n": "dry_run", "or": "Dry-Run", "r": false, "style": "simple", "t": "`$INTEGER`", "index$": 0 }], "query": [{ "a": true, "explode": true, "k": "query", "n": "sharing_id", "or": "sharing_id", "r": false, "style": "form", "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/domain/domains", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "domain" }, { "lit": "domains" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 3 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /domain/domains", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "explode": true, "k": "query", "n": "fqdn", "or": "fqdn", "r": false, "style": "form", "t": "`$STRING`", "index$": 0 }, { "a": true, "explode": true, "k": "query", "n": "nameserver", "or": "nameserver", "r": false, "style": "form", "t": "`$STRING`", "index$": 1 }, { "a": true, "ex": 1, "explode": true, "k": "query", "n": "page", "or": "page", "r": false, "style": "form", "t": "`$INTEGER`", "index$": 2 }, { "a": true, "explode": true, "k": "query", "n": "per_page", "or": "per_page", "r": false, "style": "form", "t": "`$INTEGER`", "index$": 3 }, { "a": true, "explode": true, "k": "query", "n": "resellee_id", "or": "resellee_id", "r": false, "style": "form", "t": "`$STRING`", "index$": 4 }, { "a": true, "explode": true, "k": "query", "n": "sharing_id", "or": "sharing_id", "r": false, "style": "form", "t": "`$STRING`", "index$": 5 }, { "a": true, "ex": "fqdn", "explode": true, "k": "query", "n": "sort_by", "or": "sort_by", "r": false, "style": "form", "t": "`$STRING`", "index$": 6 }, { "a": true, "explode": true, "k": "query", "n": "tld", "or": "tld", "r": false, "style": "form", "t": "`$STRING`", "index$": 7 }] }, "k": "http", "m": "GET", "o": "/domain/domains", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "domain" }, { "lit": "domains" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /domain/domains/{domain}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "fqdn", "or": "domain", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/domain/domains/{domain}", "q": { "exist": ["fqdn"] }, "r": { "param": { "domain": "fqdn" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "domain" }, { "lit": "domains" }, { "var": "fqdn" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /domain/domains/{domain}/createstatus", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "fqdn", "or": "domain", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/domain/domains/{domain}/createstatus", "q": { "$action": "createstatus", "exist": ["fqdn"] }, "r": { "param": { "domain": "fqdn" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "domain" }, { "lit": "domains" }, { "var": "fqdn" }, { "lit": "createstatus" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "a": true, "co": { "id": "GET /domain/domains/{domain}/renew", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "fqdn", "or": "domain", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/domain/domains/{domain}/renew", "q": { "$action": "renew", "exist": ["fqdn"] }, "r": { "param": { "domain": "fqdn" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "domain" }, { "lit": "domains" }, { "var": "fqdn" }, { "lit": "renew" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }, { "a": true, "co": { "id": "GET /domain/domains/{domain}/restore", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "fqdn", "or": "domain", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/domain/domains/{domain}/restore", "q": { "$action": "restore", "exist": ["fqdn"] }, "r": { "param": { "domain": "fqdn" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "domain" }, { "lit": "domains" }, { "var": "fqdn" }, { "lit": "restore" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 3 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /domain/domains/{domain}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "fqdn", "or": "domain", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/domain/domains/{domain}", "q": { "exist": ["fqdn"] }, "r": { "param": { "domain": "fqdn" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "domain" }, { "lit": "domains" }, { "var": "fqdn" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "co": { "id": "PUT /domain/domains/{domain}/authinfo", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "fqdn", "or": "domain", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PUT", "o": "/domain/domains/{domain}/authinfo", "q": { "$action": "authinfo", "exist": ["fqdn"] }, "r": { "param": { "domain": "fqdn" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "domain" }, { "lit": "domains" }, { "var": "fqdn" }, { "lit": "authinfo" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "bf": ["duration", "enabled", "org_id"], "co": { "id": "PATCH /domain/domains/{domain}/autorenew", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "fqdn", "or": "domain", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PATCH", "o": "/domain/domains/{domain}/autorenew", "q": { "$action": "autorenew", "exist": ["fqdn"] }, "r": { "param": { "domain": "fqdn" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "domain" }, { "lit": "domains" }, { "var": "fqdn" }, { "lit": "autorenew" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "a": true, "bf": ["action"], "co": { "id": "PATCH /domain/domains/{domain}/reachability", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "fqdn", "or": "domain", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PATCH", "o": "/domain/domains/{domain}/reachability", "q": { "$action": "reachability", "exist": ["fqdn"] }, "r": { "param": { "domain": "fqdn" } }, "s": [{ "lit": "domain" }, { "lit": "domains" }, { "var": "fqdn" }, { "lit": "reachability" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }, { "a": true, "bf": ["clientTransferProhibited"], "co": { "id": "PATCH /domain/domains/{domain}/status", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "fqdn", "or": "domain", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PATCH", "o": "/domain/domains/{domain}/status", "q": { "$action": "status", "exist": ["fqdn"] }, "r": { "param": { "domain": "fqdn" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "domain" }, { "lit": "domains" }, { "var": "fqdn" }, { "lit": "status" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 3 }], "key$": "update" } }, "relations": { "ancestors": [] }, "key$": "domain", "name__orig": "domain", "Name": "Domain", "name_": "domain", "name-": "domain", "NAME": "DOMAIN", "index$": 13 }, { "active": true, "entity": "domain", "key$": "BasicDomainFlow", "kind": "basic", "name": "BasicDomainFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "domain_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "domain_ref01" } }], "index$": 1 }, { "a": false, "d": {}, "i": { "ref": "domain_ref01", "srcdatavar": "domain_ref01_data", "suffix": "_up0", "textfield": "authinfo" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-domain_ref01" } }], "v": [], "unreachable": true }, { "a": true, "d": {}, "i": { "ref": "domain_ref01", "srcdatavar": "domain_ref01_data", "suffix": "_dt0" }, "m": { "id": "domain01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-domain_ref01" } }], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "domain_ref01", "suffix": "_rm0" }, "m": { "id": "domain01" }, "o": "remove", "s": [], "v": [], "index$": 3 }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "domain_ref01" } }], "index$": 4 }] }, 'Domain', { "POST /domain/domains/{domain}/renew": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "duration": { "type": "integer", "default": 1, "minimum": 1, "maximum": 9 } } } } } }, "parameters": [{ "name": "domain", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "sharing_id", "in": "query", "schema": { "type": "string" }, "index$": 1 }, { "name": "Dry-Run", "in": "header", "schema": { "type": "integer" }, "index$": 2 }] }, "POST /domain/domains/{domain}/restore": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object" } } } }, "parameters": [{ "name": "domain", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "sharing_id", "in": "query", "schema": { "type": "string" }, "index$": 1 }] }, "POST /domain/domains/{domain}/transferout": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "accept": { "type": "boolean" }, "authinfo": { "type": "string" } }, "required": ["accept", "authinfo"] } } } }, "parameters": [{ "name": "domain", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "POST /domain/domains": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "fqdn": { "type": "string", "key$": "fqdn" }, "owner": { "type": "object", "properties": { "country": { "type": "string" }, "email": { "type": "string" }, "family": { "type": "string" }, "given": { "type": "string" }, "streetaddr": { "type": "string" }, "type": { "type": "string", "enum": ["individual", "company", "association", "publicbody"] }, "brand_number": { "type": "string" }, "city": { "type": "string" }, "data_obfuscated": { "type": "boolean", "default": true }, "extra_parameters": { "type": "object" }, "fax": { "type": "string" }, "jo_announce_number": { "type": "string" }, "jo_announce_page": { "type": "string" }, "jo_declaration_date": { "type": "string" }, "jo_publication_date": { "type": "string" }, "lang": { "type": "string", "enum": ["en", "es", "fr", "ja", "zh-hans", "zh-hant"] }, "mail_obfuscated": { "type": "boolean" }, "mobile": { "type": "string" }, "orgname": { "type": "string" }, "phone": { "type": "string" }, "siren": { "type": "string" }, "state": { "type": "string" }, "validation": { "type": "string", "enum": ["pending", "done", "failed", "deleted", "none"] }, "zip": { "type": "string" } }, "required": ["country", "email", "family", "given", "streetaddr", "type"], "key$": "owner" }, "admin": { "type": "object", "properties": { "country": { "type": "string" }, "email": { "type": "string" }, "family": { "type": "string" }, "given": { "type": "string" }, "streetaddr": { "type": "string" }, "type": { "type": "string", "enum": ["individual", "company", "association", "publicbody"] }, "brand_number": { "type": "string" }, "city": { "type": "string" }, "data_obfuscated": { "type": "boolean", "default": true }, "extra_parameters": { "type": "object" }, "fax": { "type": "string" }, "jo_announce_number": { "type": "string" }, "jo_announce_page": { "type": "string" }, "jo_declaration_date": { "type": "string" }, "jo_publication_date": { "type": "string" }, "lang": { "type": "string", "enum": ["en", "es", "fr", "ja", "zh-hans", "zh-hant"] }, "mail_obfuscated": { "type": "boolean" }, "mobile": { "type": "string" }, "orgname": { "type": "string" }, "phone": { "type": "string" }, "siren": { "type": "string" }, "state": { "type": "string" }, "validation": { "type": "string", "enum": ["pending", "done", "failed", "deleted", "none"] }, "zip": { "type": "string" } }, "required": ["country", "email", "family", "given", "streetaddr", "type"], "key$": "admin" }, "bill": { "type": "object", "properties": { "country": { "type": "string" }, "email": { "type": "string" }, "family": { "type": "string" }, "given": { "type": "string" }, "streetaddr": { "type": "string" }, "type": { "type": "string", "enum": ["individual", "company", "association", "publicbody"] }, "brand_number": { "type": "string" }, "city": { "type": "string" }, "data_obfuscated": { "type": "boolean", "default": true }, "extra_parameters": { "type": "object" }, "fax": { "type": "string" }, "jo_announce_number": { "type": "string" }, "jo_announce_page": { "type": "string" }, "jo_declaration_date": { "type": "string" }, "jo_publication_date": { "type": "string" }, "lang": { "type": "string", "enum": ["en", "es", "fr", "ja", "zh-hans", "zh-hant"] }, "mail_obfuscated": { "type": "boolean" }, "mobile": { "type": "string" }, "orgname": { "type": "string" }, "phone": { "type": "string" }, "siren": { "type": "string" }, "state": { "type": "string" }, "validation": { "type": "string", "enum": ["pending", "done", "failed", "deleted", "none"] }, "zip": { "type": "string" } }, "required": ["country", "email", "family", "given", "streetaddr", "type"], "key$": "bill" }, "claims": { "type": "string", "key$": "claims" }, "currency": { "type": "string", "enum": ["EUR", "USD", "GBP", "TWD", "CNY"], "key$": "currency" }, "duration": { "type": "integer", "minimum": 1, "maximum": 10, "key$": "duration" }, "enforce_premium": { "type": "boolean", "key$": "enforce_premium" }, "extra_parameters": { "type": "object", "key$": "extra_parameters" }, "lang": { "type": "string", "key$": "lang" }, "mailbox_optin": { "type": "boolean", "default": true, "key$": "mailbox_optin" }, "nameservers": { "type": "array", "items": { "type": "string" }, "key$": "nameservers" }, "nameservers_ips": { "type": "object", "key$": "nameservers_ips" }, "price": { "type": "number", "key$": "price" }, "resellee_id": { "type": "string", "key$": "resellee_id" }, "smd": { "type": "string", "key$": "smd" }, "tech": { "type": "object", "properties": { "country": { "type": "string" }, "email": { "type": "string" }, "family": { "type": "string" }, "given": { "type": "string" }, "streetaddr": { "type": "string" }, "type": { "type": "string", "enum": ["individual", "company", "association", "publicbody"] }, "brand_number": { "type": "string" }, "city": { "type": "string" }, "data_obfuscated": { "type": "boolean", "default": true }, "extra_parameters": { "type": "object" }, "fax": { "type": "string" }, "jo_announce_number": { "type": "string" }, "jo_announce_page": { "type": "string" }, "jo_declaration_date": { "type": "string" }, "jo_publication_date": { "type": "string" }, "lang": { "type": "string", "enum": ["en", "es", "fr", "ja", "zh-hans", "zh-hant"] }, "mail_obfuscated": { "type": "boolean" }, "mobile": { "type": "string" }, "orgname": { "type": "string" }, "phone": { "type": "string" }, "siren": { "type": "string" }, "state": { "type": "string" }, "validation": { "type": "string", "enum": ["pending", "done", "failed", "deleted", "none"] }, "zip": { "type": "string" } }, "required": ["country", "email", "family", "given", "streetaddr", "type"], "key$": "tech" }, "template_id": { "type": "string", "key$": "template_id" }, "tld_period": { "type": "string", "enum": ["sunrise", "landrush", "eap1", "eap2", "eap3", "eap4", "eap5", "eap6", "eap7", "eap8", "eap9", "golive"], "key$": "tld_period" } }, "required": ["fqdn", "owner"] } } } }, "parameters": [{ "name": "sharing_id", "in": "query", "schema": { "type": "string" }, "index$": 0 }, { "name": "Dry-Run", "in": "header", "schema": { "type": "integer" }, "index$": 1 }] }, "GET /domain/domains": { "protocol": "http", "parameters": [{ "name": "fqdn", "in": "query", "schema": { "type": "string" }, "index$": 0 }, { "name": "nameserver", "in": "query", "schema": { "type": "string", "enum": ["abc", "livedns", "other"] }, "index$": 1 }, { "name": "page", "in": "query", "schema": { "type": "integer", "default": 1, "minimum": 1 }, "index$": 2 }, { "name": "per_page", "in": "query", "schema": { "type": "integer", "minimum": 1 }, "index$": 3 }, { "name": "resellee_id", "in": "query", "schema": { "type": "string" }, "index$": 4 }, { "name": "sharing_id", "in": "query", "schema": { "type": "string" }, "index$": 5 }, { "name": "sort_by", "in": "query", "schema": { "type": "string", "default": "fqdn" }, "index$": 6 }, { "name": "tld", "in": "query", "schema": { "type": "string" }, "index$": 7 }] }, "GET /domain/domains/{domain}": { "protocol": "http", "parameters": [{ "name": "domain", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "GET /domain/domains/{domain}/createstatus": { "protocol": "http", "parameters": [{ "name": "domain", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "GET /domain/domains/{domain}/renew": { "protocol": "http", "parameters": [{ "name": "domain", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "GET /domain/domains/{domain}/restore": { "protocol": "http", "parameters": [{ "name": "domain", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "DELETE /domain/domains/{domain}": { "protocol": "http", "parameters": [{ "name": "domain", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "PUT /domain/domains/{domain}/authinfo": { "protocol": "http", "parameters": [{ "name": "domain", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "PATCH /domain/domains/{domain}/autorenew": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "enabled": { "type": "boolean" }, "duration": { "type": "integer", "default": 1, "minimum": 1, "maximum": 9 }, "org_id": { "type": "string" } }, "required": ["enabled"] } } } }, "parameters": [{ "name": "domain", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "PATCH /domain/domains/{domain}/reachability": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "action": { "type": "string", "enum": ["resend"] } }, "required": ["action"] } } } }, "parameters": [{ "name": "domain", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "PATCH /domain/domains/{domain}/status": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "clientTransferProhibited": { "type": "boolean" } }, "required": ["clientTransferProhibited"] } } } }, "parameters": [{ "name": "domain", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "domain.create.0": "GET-only live run: needs POST /domain/domains/{domain}/renew", "domain.update.2": "GET-only live run: needs PUT /domain/domains/{domain}/authinfo", "domain.remove.4": "GET-only live run: needs DELETE /domain/domains/{domain}", "domain.list.5": "GET-only live run: checks a removal this run does not make" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const domain_ref01_ent = client.Domain();
        let domain_ref01_data = setup.data.new.domain['domain_ref01'];
        domain_ref01_data = (await domain_ref01_ent.create(domain_ref01_data)).data();
        (0, node_assert_1.default)(null != domain_ref01_data.id);
        // LIST
        const domain_ref01_match = {};
        const domain_ref01_list = (await domain_ref01_ent.list(domain_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(domain_ref01_list, { id: domain_ref01_data.id })));
        // LOAD
        const domain_ref01_match_dt0 = {};
        domain_ref01_match_dt0.id = domain_ref01_data.id;
        const domain_ref01_data_dt0 = (await domain_ref01_ent.load(domain_ref01_match_dt0)).data();
        (0, node_assert_1.default)(domain_ref01_data_dt0.id === domain_ref01_data.id);
        // REMOVE
        const domain_ref01_match_rm0 = { id: domain_ref01_data.id };
        await domain_ref01_ent.remove(domain_ref01_match_rm0);
        // LIST
        const domain_ref01_match_rt0 = {};
        const domain_ref01_list_rt0 = (await domain_ref01_ent.list(domain_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(domain_ref01_list_rt0, { id: domain_ref01_data.id })));
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/domain/DomainTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.GandiSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['domain01', 'domain02', 'domain03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'GANDI_TEST_DOMAIN_ENTID': idmap,
        'GANDI_TEST_LIVE': 'FALSE',
        'GANDI_TEST_EXPLAIN': 'FALSE',
        'GANDI_APIKEY': '',
    });
    idmap = env['GANDI_TEST_DOMAIN_ENTID'];
    const live = 'TRUE' === env.GANDI_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['GANDI_TEST_DOMAIN_ENTID'];
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
//# sourceMappingURL=DomainEntity.test.js.map