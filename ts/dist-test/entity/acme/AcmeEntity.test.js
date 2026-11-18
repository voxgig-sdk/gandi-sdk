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
(0, node_test_1.describe)('AcmeEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when GANDI_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('GANDI_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.GandiSDK.test();
        const ent = testsdk.Acme();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.GandiSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Acme().list({ "subscription_id": 1, "sharing_id": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.GANDI_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'acme.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "country": { "a": true, "h": "Country", "n": "country", "r": true, "t": "`$STRING`", "key$": "country", "index$": 0 }, "created_at": { "a": true, "h": "Created At", "n": "created_at", "r": true, "t": "`$STRING`", "key$": "created_at", "index$": 1 }, "currency": { "a": true, "h": "Currency", "n": "currency", "r": true, "t": "`$STRING`", "key$": "currency", "index$": 2 }, "deleted_at": { "a": true, "h": "Deleted At", "n": "deleted_at", "r": true, "t": "`$STRING`", "key$": "deleted_at", "index$": 3 }, "domains_to_add": { "a": true, "h": "Domains To Add", "n": "domains_to_add", "r": true, "t": "`$ARRAY`", "key$": "domains_to_add", "index$": 4 }, "domains_to_delete": { "a": true, "h": "Domains To Delete", "n": "domains_to_delete", "r": true, "t": "`$ARRAY`", "key$": "domains_to_delete", "index$": 5 }, "eab_hmac": { "a": true, "h": "Eab Hmac", "n": "eab_hmac", "r": true, "t": "`$STRING`", "key$": "eab_hmac", "index$": 6 }, "eab_id": { "a": true, "h": "Eab Id", "n": "eab_id", "r": true, "t": "`$STRING`", "key$": "eab_id", "index$": 7 }, "ends_at": { "a": true, "h": "Ends At", "n": "ends_at", "r": true, "t": "`$STRING`", "key$": "ends_at", "index$": 8 }, "external_id": { "a": true, "h": "External Id", "n": "external_id", "r": true, "t": "`$STRING`", "key$": "external_id", "index$": 9 }, "grid": { "a": true, "h": "Grid", "n": "grid", "r": true, "t": "`$STRING`", "key$": "grid", "index$": 10 }, "hostname": { "a": true, "h": "Hostname", "n": "hostname", "r": true, "t": "`$STRING`", "key$": "hostname", "index$": 11 }, "hostname_ulabel": { "a": true, "h": "Hostname Ulabel", "n": "hostname_ulabel", "r": true, "t": "`$STRING`", "key$": "hostname_ulabel", "index$": 12 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "t": "`$STRING`", "key$": "id", "index$": 13 }, "ip": { "a": true, "h": "Ip", "n": "ip", "r": true, "t": "`$STRING`", "key$": "ip", "index$": 14 }, "is_wildcard": { "a": true, "h": "Is Wildcard", "n": "is_wildcard", "r": true, "t": "`$BOOLEAN`", "key$": "is_wildcard", "index$": 15 }, "last_activity": { "a": true, "h": "Last Activity", "n": "last_activity", "r": true, "t": "`$STRING`", "key$": "last_activity", "index$": 16 }, "message": { "a": true, "h": "Message", "n": "message", "r": true, "t": "`$STRING`", "key$": "message", "index$": 17 }, "name": { "a": true, "h": "Name", "n": "name", "r": true, "t": "`$STRING`", "key$": "name", "index$": 18 }, "provider": { "a": true, "h": "Provider", "n": "provider", "r": true, "t": "`$STRING`", "key$": "provider", "index$": 19 }, "server_url": { "a": true, "h": "Server Url", "n": "server_url", "r": true, "t": "`$STRING`", "key$": "server_url", "index$": 20 }, "status": { "a": true, "h": "Status", "n": "status", "r": true, "t": "`$STRING`", "key$": "status", "index$": 21 }, "subscription_id": { "a": true, "h": "Subscription Id", "n": "subscription_id", "r": true, "t": "`$STRING`", "key$": "subscription_id", "index$": 22 }, "validation_type": { "a": true, "h": "Validation Type", "n": "validation_type", "r": true, "t": "`$STRING`", "key$": "validation_type", "index$": 23 }, "years": { "a": true, "h": "Years", "n": "years", "r": true, "t": "`$STRING`", "key$": "years", "index$": 24 } }, "id": { "field": "id", "name": "id" }, "name": "acme", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["country", "currency", "domains", "duration", "grid", "process", "provider", "validation_type"], "co": { "id": "POST /acme/quote", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "explode": true, "k": "query", "n": "sharing_id", "or": "sharing_id", "r": true, "style": "form", "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/acme/quote", "q": { "$action": "quote", "exist": ["sharing_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "acme" }, { "lit": "quote" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "bf": ["country", "currency", "domains", "duration", "grid", "name", "provider", "validation_type"], "co": { "id": "POST /acme/subscriptions", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "explode": true, "k": "query", "n": "sharing_id", "or": "sharing_id", "r": true, "style": "form", "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/acme/subscriptions", "q": { "$action": "subscription", "exist": ["sharing_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "acme" }, { "lit": "subscriptions" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /acme/catalog", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "explode": true, "k": "query", "n": "country", "or": "country", "r": true, "style": "form", "t": "`$STRING`", "index$": 0 }, { "a": true, "explode": true, "k": "query", "n": "currency", "or": "currency", "r": true, "style": "form", "t": "`$STRING`", "index$": 1 }, { "a": true, "explode": true, "k": "query", "n": "duration", "or": "duration", "r": true, "style": "form", "t": "`$STRING`", "index$": 2 }, { "a": true, "explode": true, "k": "query", "n": "grid", "or": "grid", "r": true, "style": "form", "t": "`$STRING`", "index$": 3 }, { "a": true, "explode": true, "k": "query", "n": "process", "or": "process", "r": true, "style": "form", "t": "`$STRING`", "index$": 4 }, { "a": true, "explode": true, "k": "query", "n": "provider", "or": "provider", "r": true, "style": "form", "t": "`$STRING`", "index$": 5 }, { "a": true, "explode": true, "k": "query", "n": "sharing_id", "or": "sharing_id", "r": true, "style": "form", "t": "`$STRING`", "index$": 6 }, { "a": true, "explode": true, "k": "query", "n": "validation_type", "or": "validation_type", "r": true, "style": "form", "t": "`$STRING`", "index$": 7 }] }, "k": "http", "m": "GET", "o": "/acme/catalog", "q": { "$action": "catalog", "exist": ["country", "currency", "duration", "grid", "process", "provider", "sharing_id", "validation_type"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "acme" }, { "lit": "catalog" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /acme/subscriptions", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "explode": true, "k": "query", "n": "created_at", "or": "created_at", "r": true, "style": "form", "t": "`$STRING`", "index$": 0 }, { "a": true, "explode": true, "k": "query", "n": "ends_at", "or": "ends_at", "r": true, "style": "form", "t": "`$STRING`", "index$": 1 }, { "a": true, "explode": true, "k": "query", "n": "name", "or": "name", "r": true, "style": "form", "t": "`$STRING`", "index$": 2 }, { "a": true, "explode": true, "k": "query", "n": "provider", "or": "provider", "r": true, "style": "form", "t": "`$STRING`", "index$": 3 }, { "a": true, "explode": true, "k": "query", "n": "sharing_id", "or": "sharing_id", "r": true, "style": "form", "t": "`$STRING`", "index$": 4 }, { "a": true, "explode": true, "k": "query", "n": "status", "or": "status", "r": true, "style": "form", "t": "`$STRING`", "index$": 5 }, { "a": true, "explode": true, "k": "query", "n": "validation_type", "or": "validation_type", "r": true, "style": "form", "t": "`$STRING`", "index$": 6 }, { "a": true, "explode": true, "k": "query", "n": "year", "or": "years", "r": true, "style": "form", "t": "`$STRING`", "index$": 7 }] }, "k": "http", "m": "GET", "o": "/acme/subscriptions", "q": { "$action": "subscription", "exist": ["created_at", "ends_at", "name", "provider", "sharing_id", "status", "validation_type", "year"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "acme" }, { "lit": "subscriptions" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "a": true, "co": { "id": "GET /acme/subscriptions/{subscription_id}/domains", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "subscription_id", "or": "subscription_id", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "explode": true, "k": "query", "n": "domain", "or": "domain", "r": true, "style": "form", "t": "`$STRING`", "index$": 0 }, { "a": true, "explode": true, "k": "query", "n": "sharing_id", "or": "sharing_id", "r": true, "style": "form", "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/acme/subscriptions/{subscription_id}/domains", "q": { "exist": ["domain", "sharing_id", "subscription_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "acme" }, { "lit": "subscriptions" }, { "var": "subscription_id" }, { "lit": "domains" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }, { "a": true, "co": { "id": "GET /acme/subscriptions/{subscription_id}/accounts", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "subscription_id", "or": "subscription_id", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "explode": true, "k": "query", "n": "sharing_id", "or": "sharing_id", "r": true, "style": "form", "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/acme/subscriptions/{subscription_id}/accounts", "q": { "exist": ["sharing_id", "subscription_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "acme" }, { "lit": "subscriptions" }, { "var": "subscription_id" }, { "lit": "accounts" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 3 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /acme/subscriptions/{subscription_id}/accounts/{account_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "account_id", "or": "account_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "subscription_id", "or": "subscription_id", "r": true, "t": "`$STRING`", "index$": 1 }], "query": [{ "a": true, "explode": true, "k": "query", "n": "sharing_id", "or": "sharing_id", "r": true, "style": "form", "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/acme/subscriptions/{subscription_id}/accounts/{account_id}", "q": { "exist": ["account_id", "sharing_id", "subscription_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "acme" }, { "lit": "subscriptions" }, { "var": "subscription_id" }, { "lit": "accounts" }, { "var": "account_id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /acme/subscriptions/{subscription_id}/domains/{domain_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "domain_id", "or": "domain_id", "r": true, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "k": "param", "n": "subscription_id", "or": "subscription_id", "r": true, "t": "`$STRING`", "index$": 1 }], "query": [{ "a": true, "explode": true, "k": "query", "n": "sharing_id", "or": "sharing_id", "r": true, "style": "form", "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/acme/subscriptions/{subscription_id}/domains/{domain_id}", "q": { "exist": ["domain_id", "sharing_id", "subscription_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "acme" }, { "lit": "subscriptions" }, { "var": "subscription_id" }, { "lit": "domains" }, { "var": "domain_id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "a": true, "co": { "id": "GET /acme/subscriptions/{subscription_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "subscription_id", "or": "subscription_id", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "explode": true, "k": "query", "n": "sharing_id", "or": "sharing_id", "r": true, "style": "form", "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/acme/subscriptions/{subscription_id}", "q": { "exist": ["sharing_id", "subscription_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "acme" }, { "lit": "subscriptions" }, { "var": "subscription_id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /acme/subscriptions/{subscription_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "subscription_id", "or": "subscription_id", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "explode": true, "k": "query", "n": "sharing_id", "or": "sharing_id", "r": true, "style": "form", "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/acme/subscriptions/{subscription_id}", "q": { "exist": ["sharing_id", "subscription_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "acme" }, { "lit": "subscriptions" }, { "var": "subscription_id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "bf": ["name"], "co": { "id": "PATCH /acme/subscriptions/{subscription_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "subscription_id", "or": "subscription_id", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "explode": true, "k": "query", "n": "sharing_id", "or": "sharing_id", "r": true, "style": "form", "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PATCH", "o": "/acme/subscriptions/{subscription_id}", "q": { "exist": ["sharing_id", "subscription_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "acme" }, { "lit": "subscriptions" }, { "var": "subscription_id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "bf": ["country", "currency", "domains_to_add", "domains_to_delete", "grid", "provider", "validation_type"], "co": { "id": "PATCH /acme/subscriptions/{subscription_id}/domains", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "subscription_id", "or": "subscription_id", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "explode": true, "k": "query", "n": "sharing_id", "or": "sharing_id", "r": true, "style": "form", "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PATCH", "o": "/acme/subscriptions/{subscription_id}/domains", "q": { "exist": ["sharing_id", "subscription_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "acme" }, { "lit": "subscriptions" }, { "var": "subscription_id" }, { "lit": "domains" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "update" } }, "relations": { "ancestors": [["$.main.kit.entity.domain"]] }, "key$": "acme", "name__orig": "acme", "Name": "Acme", "name_": "acme", "name-": "acme", "NAME": "ACME", "index$": 0 }, { "active": true, "entity": "acme", "key$": "BasicAcmeFlow", "kind": "basic", "name": "BasicAcmeFlow", "param": {}, "step": [{ "a": false, "d": {}, "i": { "ref": "acme_ref01" }, "m": { "subscription_id": "subscription01" }, "o": "create", "s": [], "v": [], "unreachable": true }, { "a": true, "d": {}, "i": {}, "m": { "subscription_id": "subscription01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "acme_ref01" } }], "index$": 0 }, { "a": false, "d": {}, "i": { "ref": "acme_ref01", "srcdatavar": "acme_ref01_data", "suffix": "_up0", "textfield": "country" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-acme_ref01" } }], "v": [], "unreachable": true }, { "a": false, "d": {}, "i": { "ref": "acme_ref01", "srcdatavar": "acme_ref01_data", "suffix": "_dt0" }, "m": { "id": "acme01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-acme_ref01" } }], "unreachable": true }, { "a": false, "d": {}, "i": { "ref": "acme_ref01", "suffix": "_rm0" }, "m": { "id": "acme01" }, "o": "remove", "s": [], "v": [], "unreachable": true }, { "a": false, "d": {}, "i": { "suffix": "_rt0" }, "m": { "subscription_id": "subscription01" }, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "acme_ref01" } }], "unreachable": true }] }, 'Acme', { "POST /acme/quote": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "country": { "type": "string" }, "currency": { "type": "string" }, "domains": { "type": "array", "items": { "type": "string" }, "minItems": 1 }, "duration": { "type": "string" }, "grid": { "type": "string" }, "process": { "type": "string" }, "provider": { "type": "string" }, "validation_type": { "type": "string" } }, "required": ["country", "currency", "domains", "duration", "grid", "process", "provider", "validation_type"] } } } }, "parameters": [{ "name": "sharing_id", "in": "query", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "POST /acme/subscriptions": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "country": { "type": "string" }, "currency": { "type": "string", "default": "EUR" }, "domains": { "type": "array", "items": { "type": "string" }, "minItems": 1 }, "duration": { "type": "integer", "default": 1 }, "grid": { "type": "string", "default": "A" }, "name": { "type": "string", "default": "FIXME", "minLength": 1, "maxLength": 200 }, "provider": { "type": "string", "enum": ["sectigo", "digicert"] }, "validation_type": { "type": "string", "enum": ["dv", "ov"] } }, "required": ["country", "currency", "domains", "duration", "grid", "name", "provider", "validation_type"] } } } }, "parameters": [{ "name": "sharing_id", "in": "query", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "GET /acme/catalog": { "protocol": "http", "parameters": [{ "name": "country", "in": "query", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "currency", "in": "query", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "duration", "in": "query", "required": true, "schema": { "type": "string" }, "index$": 2 }, { "name": "grid", "in": "query", "required": true, "schema": { "type": "string" }, "index$": 3 }, { "name": "process", "in": "query", "required": true, "schema": { "type": "string" }, "index$": 4 }, { "name": "provider", "in": "query", "required": true, "schema": { "type": "string" }, "index$": 5 }, { "name": "sharing_id", "in": "query", "required": true, "schema": { "type": "string" }, "index$": 6 }, { "name": "validation_type", "in": "query", "required": true, "schema": { "type": "string" }, "index$": 7 }] }, "GET /acme/subscriptions": { "protocol": "http", "parameters": [{ "name": "created_at", "in": "query", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "ends_at", "in": "query", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "name", "in": "query", "required": true, "schema": { "type": "string" }, "index$": 2 }, { "name": "provider", "in": "query", "required": true, "schema": { "type": "string" }, "index$": 3 }, { "name": "sharing_id", "in": "query", "required": true, "schema": { "type": "string" }, "index$": 4 }, { "name": "status", "in": "query", "required": true, "schema": { "type": "string" }, "index$": 5 }, { "name": "validation_type", "in": "query", "required": true, "schema": { "type": "string" }, "index$": 6 }, { "name": "years", "in": "query", "required": true, "schema": { "type": "string" }, "index$": 7 }] }, "GET /acme/subscriptions/{subscription_id}/domains": { "protocol": "http", "parameters": [{ "name": "subscription_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "domain", "in": "query", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "sharing_id", "in": "query", "required": true, "schema": { "type": "string" }, "index$": 2 }] }, "GET /acme/subscriptions/{subscription_id}/accounts": { "protocol": "http", "parameters": [{ "name": "subscription_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "sharing_id", "in": "query", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "GET /acme/subscriptions/{subscription_id}/accounts/{account_id}": { "protocol": "http", "parameters": [{ "name": "subscription_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "account_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "sharing_id", "in": "query", "required": true, "schema": { "type": "string" }, "index$": 2 }] }, "GET /acme/subscriptions/{subscription_id}/domains/{domain_id}": { "protocol": "http", "parameters": [{ "name": "subscription_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "domain_id", "in": "path", "required": true, "schema": { "type": "integer" }, "index$": 1 }, { "name": "sharing_id", "in": "query", "required": true, "schema": { "type": "string" }, "index$": 2 }] }, "GET /acme/subscriptions/{subscription_id}": { "protocol": "http", "parameters": [{ "name": "subscription_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "sharing_id", "in": "query", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "DELETE /acme/subscriptions/{subscription_id}": { "protocol": "http", "parameters": [{ "name": "subscription_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "sharing_id", "in": "query", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "PATCH /acme/subscriptions/{subscription_id}": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "name": { "type": "string", "minLength": 1, "maxLength": 200, "key$": "name" } }, "required": ["name"] } } } }, "parameters": [{ "name": "subscription_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "sharing_id", "in": "query", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "PATCH /acme/subscriptions/{subscription_id}/domains": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "country": { "type": "string", "key$": "country" }, "currency": { "type": "string", "default": "EUR", "key$": "currency" }, "domains_to_add": { "type": "array", "items": { "type": "string" }, "key$": "domains_to_add" }, "domains_to_delete": { "type": "array", "items": { "type": "string" }, "key$": "domains_to_delete" }, "grid": { "type": "string", "default": "A", "key$": "grid" }, "provider": { "type": "string", "default": "sectigo", "key$": "provider" }, "validation_type": { "type": "string", "default": "dv", "key$": "validation_type" } }, "required": ["country", "currency", "domains_to_add", "domains_to_delete", "grid", "provider", "validation_type"] } } } }, "parameters": [{ "name": "subscription_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "sharing_id", "in": "query", "required": true, "schema": { "type": "string" }, "index$": 1 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "acme.create.0": "GET-only live run: needs POST /acme/quote", "acme.update.2": "GET-only live run: needs PATCH /acme/subscriptions/{subscription_id}", "acme.remove.4": "GET-only live run: needs DELETE /acme/subscriptions/{subscription_id}", "acme.list.5": "GET-only live run: checks a removal this run does not make" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let acme_ref01_data = Object.values(setup.data.existing.acme)[0];
        // LIST
        const acme_ref01_ent = client.Acme();
        const acme_ref01_match = {};
        acme_ref01_match['subscription_id'] = setup.idmap['subscription01'];
        const acme_ref01_list = (await acme_ref01_ent.list(acme_ref01_match)).map((e) => e.data());
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/acme/AcmeTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.GandiSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['acme01', 'acme02', 'acme03', 'domain01', 'domain02', 'domain03', 'subscription01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'GANDI_TEST_ACME_ENTID': idmap,
        'GANDI_TEST_LIVE': 'FALSE',
        'GANDI_TEST_EXPLAIN': 'FALSE',
        'GANDI_APIKEY': '',
    });
    idmap = env['GANDI_TEST_ACME_ENTID'];
    const live = 'TRUE' === env.GANDI_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['GANDI_TEST_ACME_ENTID'];
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
//# sourceMappingURL=AcmeEntity.test.js.map