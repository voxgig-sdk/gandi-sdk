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
(0, node_test_1.describe)('EmailMailboxEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when GANDI_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('GANDI_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.GandiSDK.test();
        const ent = testsdk.EmailMailbox();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.GandiSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.EmailMailbox().list({ "domain": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.GANDI_TEST_LIVE;
        for (const op of ['create', 'list', 'update', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'email_mailbox.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "address": { "a": true, "h": "Address", "n": "address", "r": true, "t": "`$STRING`", "key$": "address", "index$": 0 }, "alias_count": { "a": true, "h": "Alias Count", "n": "alias_count", "op": { "list": { "req": true, "type": "`$INTEGER`" } }, "r": false, "t": "`$INTEGER`", "key$": "alias_count", "index$": 1 }, "aliases": { "a": true, "h": "Aliases", "n": "aliases", "op": { "create": { "req": false, "type": "`$ARRAY`" }, "update": { "req": false, "type": "`$ARRAY`" } }, "r": true, "t": "`$ARRAY`", "key$": "aliases", "index$": 2 }, "antispam": { "a": true, "h": "Antispam", "n": "antispam", "op": { "create": { "req": false, "type": "`$BOOLEAN`" }, "update": { "req": false, "type": "`$BOOLEAN`" } }, "r": true, "t": "`$BOOLEAN`", "key$": "antispam", "index$": 3 }, "autorenew": { "a": true, "h": "Autorenew", "n": "autorenew", "r": true, "t": "`$OBJECT`", "key$": "autorenew", "index$": 4 }, "domain": { "a": true, "h": "Domain", "n": "domain", "r": true, "t": "`$STRING`", "key$": "domain", "index$": 5 }, "errors": { "a": true, "h": "Errors", "n": "errors", "r": false, "t": "`$ARRAY`", "key$": "errors", "index$": 6 }, "expires_at": { "a": true, "fo": "date-time", "h": "Expires At", "n": "expires_at", "r": true, "t": "`$STRING`", "key$": "expires_at", "index$": 7 }, "fallback_email": { "a": true, "h": "Fallback Email", "n": "fallback_email", "r": false, "t": "`$STRING`", "key$": "fallback_email", "index$": 8 }, "href": { "a": true, "h": "Href", "n": "href", "r": true, "t": "`$STRING`", "key$": "href", "index$": 9 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "t": "`$STRING`", "key$": "id", "index$": 10 }, "login": { "a": true, "h": "Login", "n": "login", "op": { "update": { "req": false, "type": "`$STRING`" } }, "r": true, "t": "`$STRING`", "key$": "login", "index$": 11 }, "mailbox_type": { "a": true, "h": "Mailbox Type", "n": "mailbox_type", "op": { "update": { "req": false, "type": "`$STRING`" } }, "r": true, "t": "`$STRING`", "key$": "mailbox_type", "index$": 12 }, "message": { "a": true, "h": "Message", "n": "message", "r": true, "t": "`$STRING`", "key$": "message", "index$": 13 }, "password": { "a": true, "h": "Password", "n": "password", "op": { "update": { "req": false, "type": "`$STRING`" } }, "r": true, "t": "`$STRING`", "key$": "password", "index$": 14 }, "quota_used": { "a": true, "h": "Quota Used", "n": "quota_used", "r": true, "t": "`$INTEGER`", "key$": "quota_used", "index$": 15 }, "responder": { "a": true, "h": "Responder", "n": "responder", "r": false, "t": "`$OBJECT`", "key$": "responder", "index$": 16 }, "status": { "a": true, "h": "Status", "n": "status", "r": true, "t": "`$STRING`", "key$": "status", "index$": 17 }, "to_convert": { "a": true, "h": "To Convert", "n": "to_convert", "r": true, "t": "`$BOOLEAN`", "key$": "to_convert", "index$": 18 } }, "id": { "field": "id", "from": { "domain": "domain", "id": "id" }, "name": "id", "parts": ["domain", "id"], "sep": "/" }, "name": "email_mailbox", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["duration"], "co": { "id": "POST /email/mailboxes/{domain}/{email}/renew", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "explode": false, "k": "header", "n": "dry_run", "or": "Dry-Run", "r": false, "style": "simple", "t": "`$INTEGER`", "index$": 0 }], "params": [{ "a": true, "k": "param", "n": "address", "or": "email", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "domain", "or": "domain", "r": true, "t": "`$STRING`", "index$": 1 }], "query": [{ "a": true, "explode": true, "k": "query", "n": "sharing_id", "or": "sharing_id", "r": false, "style": "form", "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/email/mailboxes/{domain}/{email}/renew", "q": { "$action": "renew", "exist": ["address", "domain"] }, "r": { "param": { "email": "address" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "email" }, { "lit": "mailboxes" }, { "var": "domain" }, { "var": "address" }, { "lit": "renew" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "bf": ["aliases", "antispam", "login", "mailbox_type", "password"], "co": { "id": "POST /email/mailboxes/{domain}", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "explode": false, "k": "header", "n": "dry_run", "or": "Dry-Run", "r": false, "style": "simple", "t": "`$INTEGER`", "index$": 0 }], "params": [{ "a": true, "k": "param", "n": "domain", "or": "domain", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/email/mailboxes/{domain}", "q": { "exist": ["domain"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "email" }, { "lit": "mailboxes" }, { "var": "domain" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "a": true, "bf": false, "co": { "id": "POST /email/mailboxes/{domain}/renew", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "explode": false, "k": "header", "n": "dry_run", "or": "Dry-Run", "r": false, "style": "simple", "t": "`$INTEGER`", "index$": 0 }], "params": [{ "a": true, "k": "param", "n": "domain", "or": "domain", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "explode": true, "k": "query", "n": "sharing_id", "or": "sharing_id", "r": false, "style": "form", "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/email/mailboxes/{domain}/renew", "q": { "$action": "renew_all", "exist": ["domain"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "email" }, { "lit": "mailboxes" }, { "var": "domain" }, { "lit": "renew" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /email/mailboxes/{domain}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "domain", "or": "domain", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "explode": true, "k": "query", "n": "<created_at", "or": "<created_at", "r": false, "style": "form", "t": "`$STRING`", "index$": 0 }, { "a": true, "explode": true, "k": "query", "n": "antispam", "or": "antispam", "r": false, "style": "form", "t": "`$BOOLEAN`", "index$": 1 }, { "a": true, "explode": true, "k": "query", "n": "login", "or": "login", "r": false, "style": "form", "t": "`$STRING`", "index$": 2 }, { "a": true, "explode": true, "k": "query", "n": "mailbox_type", "or": "mailbox_type", "r": false, "style": "form", "t": "`$STRING`", "index$": 3 }, { "a": true, "ex": 1, "explode": true, "k": "query", "n": "page", "or": "page", "r": false, "style": "form", "t": "`$INTEGER`", "index$": 4 }, { "a": true, "explode": true, "k": "query", "n": "per_page", "or": "per_page", "r": false, "style": "form", "t": "`$INTEGER`", "index$": 5 }, { "a": true, "explode": true, "k": "query", "n": "~login", "or": "~login", "r": false, "style": "form", "t": "`$STRING`", "index$": 6 }] }, "k": "http", "m": "GET", "o": "/email/mailboxes/{domain}", "q": { "exist": ["domain"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "email" }, { "lit": "mailboxes" }, { "var": "domain" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /email/mailboxes/{domain}/{mailbox_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "domain", "or": "domain", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "mailbox_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/email/mailboxes/{domain}/{mailbox_id}", "q": { "exist": ["domain", "id"] }, "r": { "param": { "mailbox_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "email" }, { "lit": "mailboxes" }, { "var": "domain" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /email/mailboxes/{domain}/{mailbox_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "domain", "or": "domain", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "mailbox_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "DELETE", "o": "/email/mailboxes/{domain}/{mailbox_id}", "q": { "exist": ["domain", "id"] }, "r": { "param": { "mailbox_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "email" }, { "lit": "mailboxes" }, { "var": "domain" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "DELETE /email/mailboxes/{domain}/{mailbox_id}/contents", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "domain", "or": "domain", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "mailbox_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "DELETE", "o": "/email/mailboxes/{domain}/{mailbox_id}/contents", "q": { "$action": "purge", "exist": ["domain", "id"] }, "r": { "param": { "mailbox_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "email" }, { "lit": "mailboxes" }, { "var": "domain" }, { "var": "id" }, { "lit": "contents" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "bf": ["aliases", "antispam", "autorenew", "login", "mailbox_type", "password", "responder"], "co": { "id": "PATCH /email/mailboxes/{domain}/{mailbox_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "domain", "or": "domain", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "mailbox_id", "r": true, "t": "`$STRING`", "index$": 1 }], "query": [{ "a": true, "explode": true, "k": "query", "n": "sharing_id", "or": "sharing_id", "r": false, "style": "form", "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PATCH", "o": "/email/mailboxes/{domain}/{mailbox_id}", "q": { "exist": ["domain", "id"] }, "r": { "param": { "mailbox_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "email" }, { "lit": "mailboxes" }, { "var": "domain" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [["$.main.kit.entity.mailbox"]] }, "key$": "email_mailbox", "name__orig": "email_mailbox", "Name": "EmailMailbox", "name_": "email_mailbox", "name-": "email-mailbox", "NAME": "EMAIL_MAILBOX", "index$": 27 }, { "active": true, "entity": "email_mailbox", "key$": "BasicEmailMailboxFlow", "kind": "basic", "name": "BasicEmailMailboxFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "email_mailbox_ref01" }, "m": { "domain": "domain01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": { "domain": "domain01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "email_mailbox_ref01" } }], "index$": 1 }, { "a": true, "d": { "domain": "domain01" }, "i": { "ref": "email_mailbox_ref01", "srcdatavar": "email_mailbox_ref01_data", "suffix": "_up0", "textfield": "address" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-email_mailbox_ref01" } }], "v": [], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "email_mailbox_ref01", "srcdatavar": "email_mailbox_ref01_data", "suffix": "_dt0" }, "m": { "domain": "domain01", "id": "email_mailbox01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-email_mailbox_ref01" } }], "index$": 3, "route": "GET /email/mailboxes/{domain}/{mailbox_id}", "record": { "domain": "domain" } }, { "a": true, "d": {}, "i": { "ref": "email_mailbox_ref01", "suffix": "_rm0" }, "m": { "domain": "domain01", "id": "email_mailbox01" }, "o": "remove", "s": [], "v": [], "index$": 4 }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": { "domain": "domain01" }, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "email_mailbox_ref01" } }], "index$": 5 }] }, 'EmailMailbox', { "POST /email/mailboxes/{domain}/{email}/renew": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "duration": { "type": "integer" } }, "required": ["duration"] } } } }, "parameters": [{ "name": "domain", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "email", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "sharing_id", "in": "query", "schema": { "type": "string" }, "index$": 2 }, { "name": "Dry-Run", "in": "header", "schema": { "type": "integer" }, "index$": 3 }] }, "POST /email/mailboxes/{domain}": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "login": { "type": "string", "minLength": 1, "key$": "login" }, "mailbox_type": { "type": "string", "enum": ["standard", "premium", "standard_2023", "premium_2023", "standard_new (deprecated, replaced by standard_2023)", "premium_new (deprecated, replaced by premium_2023)"], "key$": "mailbox_type" }, "password": { "type": "string", "minLength": 8, "maxLength": 200, "key$": "password" }, "aliases": { "type": "array", "items": { "type": "string" }, "key$": "aliases" }, "antispam": { "type": "boolean", "default": true, "key$": "antispam" } }, "required": ["login", "mailbox_type", "password"] } } } }, "parameters": [{ "name": "domain", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "Dry-Run", "in": "header", "schema": { "type": "integer" }, "index$": 1 }] }, "POST /email/mailboxes/{domain}/renew": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": {} } } }, "parameters": [{ "name": "domain", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "sharing_id", "in": "query", "schema": { "type": "string" }, "index$": 1 }, { "name": "Dry-Run", "in": "header", "schema": { "type": "integer" }, "index$": 2 }] }, "GET /email/mailboxes/{domain}": { "protocol": "http", "parameters": [{ "name": "domain", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "<created_at", "in": "query", "schema": { "type": "string", "format": "date-time" }, "index$": 1 }, { "name": "~login", "in": "query", "schema": { "type": "string" }, "index$": 2 }, { "name": "antispam", "in": "query", "schema": { "type": "boolean" }, "index$": 3 }, { "name": "login", "in": "query", "schema": { "type": "string" }, "index$": 4 }, { "name": "mailbox_type", "in": "query", "schema": { "type": "string", "enum": ["standard", "premium", "standard_2023", "premium_2023"] }, "index$": 5 }, { "name": "page", "in": "query", "schema": { "type": "integer", "default": 1, "minimum": 1 }, "index$": 6 }, { "name": "per_page", "in": "query", "schema": { "type": "integer", "minimum": 1 }, "index$": 7 }] }, "GET /email/mailboxes/{domain}/{mailbox_id}": { "protocol": "http", "parameters": [{ "name": "domain", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "mailbox_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "DELETE /email/mailboxes/{domain}/{mailbox_id}": { "protocol": "http", "parameters": [{ "name": "domain", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "mailbox_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "DELETE /email/mailboxes/{domain}/{mailbox_id}/contents": { "protocol": "http", "parameters": [{ "name": "domain", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "mailbox_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "PATCH /email/mailboxes/{domain}/{mailbox_id}": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "aliases": { "type": "array", "items": { "type": "string" }, "key$": "aliases" }, "antispam": { "type": "boolean", "key$": "antispam" }, "autorenew": { "type": "object", "properties": { "activated": { "type": "boolean" }, "duration": { "type": "integer", "enum": [1, 12] } }, "required": ["activated", "duration"], "key$": "autorenew" }, "login": { "type": "string", "key$": "login" }, "mailbox_type": { "type": "string", "enum": ["standard_2023", "premium_2023"], "key$": "mailbox_type" }, "password": { "type": "string", "minLength": 8, "maxLength": 200, "key$": "password" }, "responder": { "type": "object", "properties": { "enabled": { "type": "boolean", "default": false }, "ends_at": { "type": "string", "format": "date-time" }, "message": { "type": "string" }, "starts_at": { "type": "string", "format": "date-time" } }, "key$": "responder" } } } } } }, "parameters": [{ "name": "domain", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "mailbox_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "sharing_id", "in": "query", "schema": { "type": "string" }, "index$": 2 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "email_mailbox.create.0": "GET-only live run: needs POST /email/mailboxes/{domain}/{email}/renew", "email_mailbox.update.2": "GET-only live run: needs PATCH /email/mailboxes/{domain}/{mailbox_id}", "email_mailbox.remove.4": "GET-only live run: needs DELETE /email/mailboxes/{domain}/{mailbox_id}", "email_mailbox.list.5": "GET-only live run: checks a removal this run does not make" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const email_mailbox_ref01_ent = client.EmailMailbox();
        let email_mailbox_ref01_data = setup.data.new.email_mailbox['email_mailbox_ref01'];
        email_mailbox_ref01_data['domain'] = setup.idmap['domain01'];
        email_mailbox_ref01_data = (await email_mailbox_ref01_ent.create(email_mailbox_ref01_data)).data();
        (0, node_assert_1.default)(null != email_mailbox_ref01_data.id);
        // LIST
        const email_mailbox_ref01_match = {};
        email_mailbox_ref01_match['domain'] = setup.idmap['domain01'];
        const email_mailbox_ref01_list = (await email_mailbox_ref01_ent.list(email_mailbox_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(email_mailbox_ref01_list, { id: email_mailbox_ref01_data.id })));
        // UPDATE
        const email_mailbox_ref01_data_up0 = {};
        email_mailbox_ref01_data_up0.id = email_mailbox_ref01_data.id;
        email_mailbox_ref01_data_up0['domain'] = setup.idmap['domain'] ?? setup.idmap['domain01'];
        const email_mailbox_ref01_markdef_up0 = { name: 'address', value: 'Mark01-email_mailbox_ref01_' + setup.now };
        email_mailbox_ref01_data_up0[email_mailbox_ref01_markdef_up0.name] = email_mailbox_ref01_markdef_up0.value;
        const email_mailbox_ref01_resdata_up0 = (await email_mailbox_ref01_ent.update(email_mailbox_ref01_data_up0)).data();
        (0, node_assert_1.default)(email_mailbox_ref01_resdata_up0.id === email_mailbox_ref01_data_up0.id);
        (0, node_assert_1.default)(email_mailbox_ref01_resdata_up0[email_mailbox_ref01_markdef_up0.name] === email_mailbox_ref01_markdef_up0.value);
        // LOAD
        const email_mailbox_ref01_match_dt0 = {};
        email_mailbox_ref01_match_dt0.id = email_mailbox_ref01_data.id;
        email_mailbox_ref01_match_dt0['domain'] = ['string', 'number', 'boolean'].includes(typeof email_mailbox_ref01_data['domain']) ?
            email_mailbox_ref01_data['domain'] : setup.idmap['domain'] ?? setup.idmap['domain01'];
        const email_mailbox_ref01_data_dt0 = (await email_mailbox_ref01_ent.load(email_mailbox_ref01_match_dt0)).data();
        (0, node_assert_1.default)(email_mailbox_ref01_data_dt0.id === email_mailbox_ref01_data.id);
        // REMOVE
        const email_mailbox_ref01_match_rm0 = { id: email_mailbox_ref01_data.id };
        email_mailbox_ref01_match_rm0['domain'] = setup.idmap['domain'] ?? setup.idmap['domain01'];
        await email_mailbox_ref01_ent.remove(email_mailbox_ref01_match_rm0);
        // LIST
        const email_mailbox_ref01_match_rt0 = {};
        email_mailbox_ref01_match_rt0['domain'] = setup.idmap['domain01'];
        const email_mailbox_ref01_list_rt0 = (await email_mailbox_ref01_ent.list(email_mailbox_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(email_mailbox_ref01_list_rt0, { id: email_mailbox_ref01_data.id })));
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/email_mailbox/EmailMailboxTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.GandiSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['email_mailbox01', 'email_mailbox02', 'email_mailbox03', 'mailbox01', 'mailbox02', 'mailbox03', 'domain01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'GANDI_TEST_EMAIL_MAILBOX_ENTID': idmap,
        'GANDI_TEST_LIVE': 'FALSE',
        'GANDI_TEST_EXPLAIN': 'FALSE',
        'GANDI_APIKEY': '',
    });
    idmap = env['GANDI_TEST_EMAIL_MAILBOX_ENTID'];
    const live = 'TRUE' === env.GANDI_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['GANDI_TEST_EMAIL_MAILBOX_ENTID'];
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
//# sourceMappingURL=EmailMailboxEntity.test.js.map