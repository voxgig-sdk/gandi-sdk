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
(0, node_test_1.describe)('HostingInstanceEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when GANDI_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('GANDI_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.GandiSDK.test();
        const ent = testsdk.HostingInstance();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('hosting_instance hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.GandiSDK.test(offline).HostingInstance().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.GandiSDK.test(offline).HostingInstance()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.GandiSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.HostingInstance().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.GandiSDK.test().HostingInstance().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.GandiSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.HostingInstance().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.HostingInstance().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.GandiSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.HostingInstance().list({ "fqdn": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.GANDI_TEST_LIVE;
        for (const op of ['create', 'list', 'update', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'hosting_instance.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "access_information": { "a": true, "h": "Access Information", "n": "access_information", "r": true, "t": "`$OBJECT`", "key$": "access_information", "index$": 0 }, "authentication": { "a": true, "h": "Authentication", "n": "authentication", "r": true, "t": "`$OBJECT`", "key$": "authentication", "index$": 1 }, "autorenew": { "a": true, "h": "Autorenew", "n": "autorenew", "op": { "create": { "req": false, "type": "`$BOOLEAN`" } }, "r": true, "t": "`$OBJECT`", "key$": "autorenew", "index$": 2 }, "available_upgrade": { "a": true, "h": "Available Upgrade", "n": "available_upgrade", "r": true, "t": "`$BOOLEAN`", "key$": "available_upgrade", "index$": 3 }, "booster": { "a": true, "h": "Booster", "n": "booster", "r": false, "t": "`$OBJECT`", "key$": "booster", "index$": 4 }, "booster_options": { "a": true, "h": "Booster Options", "n": "booster_options", "r": false, "t": "`$OBJECT`", "key$": "booster_options", "index$": 5 }, "compatible_applications": { "a": true, "h": "Compatible Applications", "n": "compatible_applications", "r": false, "t": "`$ARRAY`", "key$": "compatible_applications", "index$": 6 }, "console": { "a": true, "h": "Console", "n": "console", "r": true, "t": "`$OBJECT`", "key$": "console", "index$": 7 }, "cpu": { "a": true, "h": "Cpu", "n": "cpu", "r": true, "t": "`$INTEGER`", "key$": "cpu", "index$": 8 }, "created_at": { "a": true, "fo": "date-time", "h": "Created At", "n": "created_at", "r": true, "t": "`$STRING`", "key$": "created_at", "index$": 9 }, "database": { "a": true, "h": "Database", "n": "database", "r": true, "t": "`$OBJECT`", "key$": "database", "index$": 10 }, "datacenter": { "a": true, "h": "Datacenter", "n": "datacenter", "r": true, "t": "`$OBJECT`", "key$": "datacenter", "index$": 11 }, "domain": { "a": true, "h": "Domain", "n": "domain", "op": { "create": { "req": true, "type": "`$OBJECT`" } }, "r": false, "t": "`$STRING`", "key$": "domain", "index$": 12 }, "duration": { "a": true, "h": "Duration", "n": "duration", "r": false, "t": "`$INTEGER`", "key$": "duration", "index$": 13 }, "duration_unit": { "a": true, "h": "Duration Unit", "n": "duration_unit", "r": false, "t": "`$STRING`", "key$": "duration_unit", "index$": 14 }, "errors": { "a": true, "h": "Errors", "n": "errors", "r": false, "t": "`$ARRAY`", "key$": "errors", "index$": 15 }, "expire_at": { "a": true, "fo": "date-time", "h": "Expire At", "n": "expire_at", "r": true, "t": "`$STRING`", "key$": "expire_at", "index$": 16 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "t": "`$STRING`", "key$": "id", "index$": 17 }, "language": { "a": true, "h": "Language", "n": "language", "r": true, "t": "`$OBJECT`", "key$": "language", "index$": 18 }, "language_id": { "a": true, "h": "Language Id", "n": "language_id", "r": false, "t": "`$STRING`", "key$": "language_id", "index$": 19 }, "location": { "a": true, "h": "Location", "n": "location", "r": true, "t": "`$STRING`", "key$": "location", "index$": 20 }, "message": { "a": true, "h": "Message", "n": "message", "r": true, "t": "`$STRING`", "key$": "message", "index$": 21 }, "name": { "a": true, "h": "Name", "n": "name", "op": { "create": { "req": false, "type": "`$STRING`" }, "update": { "req": false, "type": "`$STRING`" } }, "r": true, "t": "`$STRING`", "key$": "name", "index$": 22 }, "password": { "a": true, "h": "Password", "n": "password", "r": false, "t": "`$STRING`", "key$": "password", "index$": 23 }, "password_updated_at": { "a": true, "fo": "date-time", "h": "Password Updated At", "n": "password_updated_at", "r": false, "t": "`$STRING`", "key$": "password_updated_at", "index$": 24 }, "ram": { "a": true, "h": "Ram", "n": "ram", "r": true, "t": "`$OBJECT`", "key$": "ram", "index$": 25 }, "sharing_space": { "a": true, "h": "Sharing Space", "n": "sharing_space", "r": true, "t": "`$OBJECT`", "key$": "sharing_space", "index$": 26 }, "size": { "a": true, "h": "Size", "n": "size", "op": { "update": { "req": false, "type": "`$STRING`" } }, "r": true, "t": "`$STRING`", "key$": "size", "index$": 27 }, "snapshot_enabled": { "a": true, "h": "Snapshot Enabled", "n": "snapshot_enabled", "op": { "create": { "req": false, "type": "`$BOOLEAN`" }, "update": { "req": false, "type": "`$BOOLEAN`" } }, "r": true, "t": "`$BOOLEAN`", "key$": "snapshot_enabled", "index$": 28 }, "status": { "a": true, "h": "Status", "n": "status", "r": true, "t": "`$STRING`", "key$": "status", "index$": 29 }, "storage": { "a": true, "h": "Storage", "n": "storage", "r": true, "t": "`$OBJECT`", "key$": "storage", "index$": 30 }, "storage_additional_size": { "a": true, "h": "Storage Additional Size", "n": "storage_additional_size", "r": false, "t": "`$INTEGER`", "key$": "storage_additional_size", "index$": 31 }, "subscription_cancelled": { "a": true, "h": "Subscription Cancelled", "n": "subscription_cancelled", "r": false, "t": "`$BOOLEAN`", "key$": "subscription_cancelled", "index$": 32 }, "type": { "a": true, "h": "Type", "n": "type", "r": true, "t": "`$OBJECT`", "key$": "type", "index$": 33 }, "upgrade_to": { "a": true, "h": "Upgrade To", "n": "upgrade_to", "r": false, "t": "`$ARRAY`", "key$": "upgrade_to", "index$": 34 }, "vhosts": { "a": true, "h": "Vhosts", "n": "vhosts", "op": { "create": { "req": false, "type": "`$ARRAY`" } }, "r": true, "t": "`$ARRAY`", "key$": "vhosts", "index$": 35 } }, "id": { "field": "id", "name": "id" }, "name": "hosting_instance", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["action"], "co": { "id": "POST /simplehosting/instances/{instance_id}/action", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "instance_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/simplehosting/instances/{instance_id}/action", "q": { "$action": "action", "exist": ["id"] }, "r": { "param": { "instance_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "simplehosting" }, { "lit": "instances" }, { "var": "id" }, { "lit": "action" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "bf": ["authentication", "autorenew", "domain", "duration", "duration_unit", "location", "name", "size", "snapshot_enabled", "storage_additional_size", "type", "vhosts"], "co": { "id": "POST /simplehosting/instances", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "explode": false, "k": "header", "n": "dry_run", "or": "Dry-Run", "r": false, "style": "simple", "t": "`$INTEGER`", "index$": 0 }], "query": [{ "a": true, "explode": true, "k": "query", "n": "sharing_id", "or": "sharing_id", "r": false, "style": "form", "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/simplehosting/instances", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "simplehosting" }, { "lit": "instances" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /simplehosting/instances", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "explode": true, "k": "query", "n": "fqdn", "or": "fqdn", "r": false, "style": "form", "t": "`$STRING`", "index$": 0 }, { "a": true, "explode": true, "k": "query", "n": "name", "or": "name", "r": false, "style": "form", "t": "`$STRING`", "index$": 1 }, { "a": true, "ex": 1, "explode": true, "k": "query", "n": "page", "or": "page", "r": false, "style": "form", "t": "`$INTEGER`", "index$": 2 }, { "a": true, "explode": true, "k": "query", "n": "per_page", "or": "per_page", "r": false, "style": "form", "t": "`$INTEGER`", "index$": 3 }, { "a": true, "explode": true, "k": "query", "n": "sharing_id", "or": "sharing_id", "r": false, "style": "form", "t": "`$STRING`", "index$": 4 }, { "a": true, "explode": true, "k": "query", "n": "size", "or": "size", "r": false, "style": "form", "t": "`$STRING`", "index$": 5 }, { "a": true, "ex": "-created_at", "explode": true, "k": "query", "n": "sort_by", "or": "sort_by", "r": false, "style": "form", "t": "`$STRING`", "index$": 6 }, { "a": true, "explode": true, "k": "query", "n": "status", "or": "status", "r": false, "style": "form", "t": "`$STRING`", "index$": 7 }] }, "k": "http", "m": "GET", "o": "/simplehosting/instances", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "simplehosting" }, { "lit": "instances" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /simplehosting/instances/{instance_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "instance_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/simplehosting/instances/{instance_id}", "q": { "exist": ["id"] }, "r": { "param": { "instance_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "simplehosting" }, { "lit": "instances" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /simplehosting/instances/{instance_id}/usage", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "instance_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/simplehosting/instances/{instance_id}/usage", "q": { "$action": "usage", "exist": ["id"] }, "r": { "param": { "instance_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "simplehosting" }, { "lit": "instances" }, { "var": "id" }, { "lit": "usage" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /simplehosting/instances/{instance_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "instance_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/simplehosting/instances/{instance_id}", "q": { "exist": ["id"] }, "r": { "param": { "instance_id": "id" } }, "s": [{ "lit": "simplehosting" }, { "lit": "instances" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "bf": ["booster", "booster_options", "language_id", "name", "password", "size", "snapshot_enabled", "storage_additional_size"], "co": { "id": "PATCH /simplehosting/instances/{instance_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "instance_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PATCH", "o": "/simplehosting/instances/{instance_id}", "q": { "exist": ["id"] }, "r": { "param": { "instance_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "simplehosting" }, { "lit": "instances" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [] }, "key$": "hosting_instance", "name__orig": "hosting_instance", "Name": "HostingInstance", "name_": "hosting_instance", "name-": "hosting-instance", "NAME": "HOSTING_INSTANCE", "index$": 32 }, { "active": true, "entity": "hosting_instance", "key$": "BasicHostingInstanceFlow", "kind": "basic", "name": "BasicHostingInstanceFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "hosting_instance_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "hosting_instance_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "hosting_instance_ref01", "srcdatavar": "hosting_instance_ref01_data", "suffix": "_up0", "textfield": "created_at" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-hosting_instance_ref01" } }], "v": [], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "hosting_instance_ref01", "srcdatavar": "hosting_instance_ref01_data", "suffix": "_dt0" }, "m": { "id": "hosting_instance01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-hosting_instance_ref01" } }], "index$": 3, "route": "GET /simplehosting/instances/{instance_id}", "record": {} }, { "a": true, "d": {}, "i": { "ref": "hosting_instance_ref01", "suffix": "_rm0" }, "m": { "id": "hosting_instance01" }, "o": "remove", "s": [], "v": [], "index$": 4 }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "hosting_instance_ref01" } }], "index$": 5 }] }, 'HostingInstance', { "POST /simplehosting/instances/{instance_id}/action": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "action": { "type": "string", "enum": ["restart", "console", "reset_database_password"] } }, "required": ["action"] } } } }, "parameters": [{ "name": "instance_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "POST /simplehosting/instances": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "location": { "type": "string", "enum": ["FR", "LU"], "key$": "location" }, "size": { "type": "string", "enum": ["starter", "advanced", "pro", "business"], "key$": "size" }, "type": { "type": "object", "properties": { "database": { "type": "object", "properties": { "name": {}, "version": {} }, "required": ["name"] }, "language": { "type": "object", "properties": { "name": {}, "version": {} }, "required": ["name"] } }, "required": ["database", "language"], "key$": "type" }, "authentication": { "type": "object", "properties": { "password": { "type": "string" }, "keys": { "type": "array", "items": { "type": "string" } }, "ssh_keys": { "type": "array", "items": { "type": "string" } } }, "required": ["password"], "key$": "authentication" }, "autorenew": { "type": "boolean", "key$": "autorenew" }, "domain": { "type": "object", "properties": { "fqdn": { "type": "string" }, "owner": { "type": "object", "properties": { "country": {}, "email": {}, "family": {}, "given": {}, "streetaddr": {}, "type": {}, "brand_number": {}, "city": {}, "data_obfuscated": {}, "extra_parameters": {}, "fax": {}, "jo_announce_number": {}, "jo_announce_page": {}, "jo_declaration_date": {}, "jo_publication_date": {}, "lang": {}, "mail_obfuscated": {}, "mobile": {}, "orgname": {}, "phone": {}, "siren": {}, "state": {}, "validation": {}, "zip": {} }, "required": ["country", "email", "family", "given", "streetaddr", "type"] }, "admin": { "type": "object", "properties": { "country": {}, "email": {}, "family": {}, "given": {}, "streetaddr": {}, "type": {}, "brand_number": {}, "city": {}, "data_obfuscated": {}, "extra_parameters": {}, "fax": {}, "jo_announce_number": {}, "jo_announce_page": {}, "jo_declaration_date": {}, "jo_publication_date": {}, "lang": {}, "mail_obfuscated": {}, "mobile": {}, "orgname": {}, "phone": {}, "siren": {}, "state": {}, "validation": {}, "zip": {} }, "required": ["country", "email", "family", "given", "streetaddr", "type"] }, "bill": { "type": "object", "properties": { "country": {}, "email": {}, "family": {}, "given": {}, "streetaddr": {}, "type": {}, "brand_number": {}, "city": {}, "data_obfuscated": {}, "extra_parameters": {}, "fax": {}, "jo_announce_number": {}, "jo_announce_page": {}, "jo_declaration_date": {}, "jo_publication_date": {}, "lang": {}, "mail_obfuscated": {}, "mobile": {}, "orgname": {}, "phone": {}, "siren": {}, "state": {}, "validation": {}, "zip": {} }, "required": ["country", "email", "family", "given", "streetaddr", "type"] }, "extra_parameters": { "type": "object" }, "lang": { "type": "string" }, "tech": { "type": "object", "properties": { "country": {}, "email": {}, "family": {}, "given": {}, "streetaddr": {}, "type": {}, "brand_number": {}, "city": {}, "data_obfuscated": {}, "extra_parameters": {}, "fax": {}, "jo_announce_number": {}, "jo_announce_page": {}, "jo_declaration_date": {}, "jo_publication_date": {}, "lang": {}, "mail_obfuscated": {}, "mobile": {}, "orgname": {}, "phone": {}, "siren": {}, "state": {}, "validation": {}, "zip": {} }, "required": ["country", "email", "family", "given", "streetaddr", "type"] } }, "required": ["fqdn", "owner"], "key$": "domain" }, "duration": { "type": "integer", "default": 1, "minimum": 1, "key$": "duration" }, "duration_unit": { "type": "string", "enum": ["m"], "default": "m", "key$": "duration_unit" }, "name": { "type": "string", "key$": "name" }, "snapshot_enabled": { "type": "boolean", "default": false, "key$": "snapshot_enabled" }, "storage_additional_size": { "type": "integer", "default": 0, "minimum": 0, "maximum": 1004, "key$": "storage_additional_size" }, "vhosts": { "type": "array", "items": { "type": "object", "properties": { "fqdn": { "type": "string" }, "application": { "type": "object", "properties": {}, "required": [] }, "https_strategy": { "type": "string", "enum": [], "default": "allow_HTTP_and_HTTPS" }, "linked_dns_zone": { "type": "object", "properties": {} }, "with_free_ssl": { "type": "boolean", "default": false } }, "required": ["fqdn"] }, "key$": "vhosts" } }, "required": ["location", "size", "type"] } } } }, "parameters": [{ "name": "sharing_id", "in": "query", "schema": { "type": "string" }, "index$": 0 }, { "name": "Dry-Run", "in": "header", "schema": { "type": "integer" }, "index$": 1 }] }, "GET /simplehosting/instances": { "protocol": "http", "parameters": [{ "name": "fqdn", "in": "query", "schema": { "type": "string" }, "index$": 0 }, { "name": "name", "in": "query", "schema": { "type": "string" }, "index$": 1 }, { "name": "page", "in": "query", "schema": { "type": "integer", "default": 1, "minimum": 1 }, "index$": 2 }, { "name": "per_page", "in": "query", "schema": { "type": "integer", "minimum": 1 }, "index$": 3 }, { "name": "sharing_id", "in": "query", "schema": { "type": "string" }, "index$": 4 }, { "name": "size", "in": "query", "schema": { "type": "string", "enum": ["s", "s+", "m", "l", "xl", "xxl", "starter", "advanced", "pro", "business"] }, "index$": 5 }, { "name": "sort_by", "in": "query", "schema": { "type": "string", "default": "-created_at" }, "index$": 6 }, { "name": "status", "in": "query", "schema": { "type": "string", "enum": ["waiting_bill", "being_created", "active", "paused", "locked", "being_deleted"] }, "index$": 7 }] }, "GET /simplehosting/instances/{instance_id}": { "protocol": "http", "parameters": [{ "name": "instance_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "GET /simplehosting/instances/{instance_id}/usage": { "protocol": "http", "parameters": [{ "name": "instance_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "DELETE /simplehosting/instances/{instance_id}": { "protocol": "http", "parameters": [{ "name": "instance_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "PATCH /simplehosting/instances/{instance_id}": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "booster": { "type": "boolean", "key$": "booster" }, "booster_options": { "type": "object", "properties": { "size": { "type": "string", "enum": ["s", "s+", "m", "l", "xl", "xxl", "starter", "advanced", "pro", "business", "boosted"] } }, "key$": "booster_options" }, "language_id": { "type": "string", "key$": "language_id" }, "name": { "type": "string", "key$": "name" }, "password": { "type": "string", "key$": "password" }, "size": { "type": "string", "enum": ["s+", "m", "l", "xxl"], "key$": "size" }, "snapshot_enabled": { "type": "boolean", "key$": "snapshot_enabled" }, "storage_additional_size": { "type": "integer", "key$": "storage_additional_size" } } } } } }, "parameters": [{ "name": "instance_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "hosting_instance.create.0": "GET-only live run: needs POST /simplehosting/instances/{instance_id}/action", "hosting_instance.update.2": "GET-only live run: needs PATCH /simplehosting/instances/{instance_id}", "hosting_instance.remove.4": "GET-only live run: needs DELETE /simplehosting/instances/{instance_id}", "hosting_instance.list.5": "GET-only live run: checks a removal this run does not make" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const hosting_instance_ref01_ent = client.HostingInstance();
        let hosting_instance_ref01_data = setup.data.new.hosting_instance['hosting_instance_ref01'];
        hosting_instance_ref01_data = (await hosting_instance_ref01_ent.create(hosting_instance_ref01_data)).data();
        (0, node_assert_1.default)(null != hosting_instance_ref01_data.id);
        // LIST
        const hosting_instance_ref01_match = {};
        const hosting_instance_ref01_list = (await hosting_instance_ref01_ent.list(hosting_instance_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(hosting_instance_ref01_list, { id: hosting_instance_ref01_data.id })));
        // UPDATE
        const hosting_instance_ref01_data_up0 = {};
        hosting_instance_ref01_data_up0.id = hosting_instance_ref01_data.id;
        const hosting_instance_ref01_markdef_up0 = { name: 'created_at', value: 'Mark01-hosting_instance_ref01_' + setup.now };
        hosting_instance_ref01_data_up0[hosting_instance_ref01_markdef_up0.name] = hosting_instance_ref01_markdef_up0.value;
        const hosting_instance_ref01_resdata_up0 = (await hosting_instance_ref01_ent.update(hosting_instance_ref01_data_up0)).data();
        (0, node_assert_1.default)(hosting_instance_ref01_resdata_up0.id === hosting_instance_ref01_data_up0.id);
        (0, node_assert_1.default)(hosting_instance_ref01_resdata_up0[hosting_instance_ref01_markdef_up0.name] === hosting_instance_ref01_markdef_up0.value);
        // LOAD
        const hosting_instance_ref01_match_dt0 = {};
        hosting_instance_ref01_match_dt0.id = hosting_instance_ref01_data.id;
        const hosting_instance_ref01_data_dt0 = (await hosting_instance_ref01_ent.load(hosting_instance_ref01_match_dt0)).data();
        (0, node_assert_1.default)(hosting_instance_ref01_data_dt0.id === hosting_instance_ref01_data.id);
        // REMOVE
        const hosting_instance_ref01_match_rm0 = { id: hosting_instance_ref01_data.id };
        await hosting_instance_ref01_ent.remove(hosting_instance_ref01_match_rm0);
        // LIST
        const hosting_instance_ref01_match_rt0 = {};
        const hosting_instance_ref01_list_rt0 = (await hosting_instance_ref01_ent.list(hosting_instance_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(hosting_instance_ref01_list_rt0, { id: hosting_instance_ref01_data.id })));
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/hosting_instance/HostingInstanceTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.GandiSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['hosting_instance01', 'hosting_instance02', 'hosting_instance03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'GANDI_TEST_HOSTING_INSTANCE_ENTID': idmap,
        'GANDI_TEST_LIVE': 'FALSE',
        'GANDI_TEST_EXPLAIN': 'FALSE',
        'GANDI_APIKEY': '',
    });
    idmap = env['GANDI_TEST_HOSTING_INSTANCE_ENTID'];
    const live = 'TRUE' === env.GANDI_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['GANDI_TEST_HOSTING_INSTANCE_ENTID'];
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
//# sourceMappingURL=HostingInstanceEntity.test.js.map