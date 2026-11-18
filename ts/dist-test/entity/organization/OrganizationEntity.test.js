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
(0, node_test_1.describe)('OrganizationEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when GANDI_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('GANDI_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.GandiSDK.test();
        const ent = testsdk.Organization();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('organization hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.GandiSDK.test(offline).Organization().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.GandiSDK.test(offline).Organization()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.GandiSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.Organization().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.GandiSDK.test().Organization().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.GandiSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.Organization().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.Organization().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.GandiSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Organization().list({ "name": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.GANDI_TEST_LIVE;
        for (const op of ['create', 'list', 'update', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'organization.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "city": { "a": true, "h": "City", "n": "city", "op": { "update": { "req": false, "type": "`$STRING`" } }, "r": true, "t": "`$STRING`", "key$": "city", "index$": 0 }, "corporate": { "a": true, "h": "Corporate", "n": "corporate", "op": { "list": { "req": false, "type": "`$BOOLEAN`" } }, "r": true, "t": "`$BOOLEAN`", "key$": "corporate", "index$": 1 }, "country": { "a": true, "h": "Country", "n": "country", "op": { "create": { "req": false, "type": "`$STRING`" }, "update": { "req": false, "type": "`$STRING`" } }, "r": true, "t": "`$STRING`", "key$": "country", "index$": 2 }, "email": { "a": true, "h": "Email", "n": "email", "op": { "list": { "req": false, "type": "`$STRING`" }, "update": { "req": false, "type": "`$STRING`" } }, "r": true, "t": "`$STRING`", "key$": "email", "index$": 3 }, "fax": { "a": true, "h": "Fax", "n": "fax", "r": false, "t": "`$STRING`", "key$": "fax", "index$": 4 }, "firstname": { "a": true, "h": "Firstname", "n": "firstname", "op": { "list": { "req": false, "type": "`$STRING`" }, "update": { "req": false, "type": "`$STRING`" } }, "r": true, "t": "`$STRING`", "key$": "firstname", "index$": 5 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "t": "`$STRING`", "key$": "id", "index$": 6 }, "lang": { "a": true, "h": "Lang", "n": "lang", "r": false, "t": "`$STRING`", "key$": "lang", "index$": 7 }, "lastname": { "a": true, "h": "Lastname", "n": "lastname", "op": { "list": { "req": false, "type": "`$STRING`" }, "update": { "req": false, "type": "`$STRING`" } }, "r": true, "t": "`$STRING`", "key$": "lastname", "index$": 8 }, "message": { "a": true, "h": "Message", "n": "message", "r": true, "t": "`$STRING`", "key$": "message", "index$": 9 }, "name": { "a": true, "h": "Name", "n": "name", "op": { "update": { "req": false, "type": "`$STRING`" } }, "r": true, "t": "`$STRING`", "key$": "name", "index$": 10 }, "orgname": { "a": true, "h": "Orgname", "n": "orgname", "op": { "create": { "req": true, "type": "`$STRING`" } }, "r": false, "t": "`$STRING`", "key$": "orgname", "index$": 11 }, "phone": { "a": true, "h": "Phone", "n": "phone", "op": { "create": { "req": true, "type": "`$STRING`" } }, "r": false, "t": "`$STRING`", "key$": "phone", "index$": 12 }, "reference": { "a": true, "h": "Reference", "n": "reference", "r": false, "t": "`$STRING`", "key$": "reference", "index$": 13 }, "reseller": { "a": true, "h": "Reseller", "n": "reseller", "op": { "create": { "req": false, "type": "`$BOOLEAN`" }, "list": { "req": false, "type": "`$BOOLEAN`" }, "update": { "req": false, "type": "`$BOOLEAN`" } }, "r": true, "t": "`$BOOLEAN`", "key$": "reseller", "index$": 14 }, "siren": { "a": true, "h": "Siren", "n": "siren", "r": false, "t": "`$STRING`", "key$": "siren", "index$": 15 }, "state": { "a": true, "h": "State", "n": "state", "r": false, "t": "`$STRING`", "key$": "state", "index$": 16 }, "streetaddr": { "a": true, "h": "Streetaddr", "n": "streetaddr", "op": { "update": { "req": false, "type": "`$STRING`" } }, "r": true, "t": "`$STRING`", "key$": "streetaddr", "index$": 17 }, "streetaddr2": { "a": true, "h": "Streetaddr2", "n": "streetaddr2", "r": false, "t": "`$STRING`", "key$": "streetaddr2", "index$": 18 }, "type": { "a": true, "h": "Type", "n": "type", "op": { "list": { "req": false, "type": "`$STRING`" } }, "r": true, "t": "`$STRING`", "key$": "type", "index$": 19 }, "vat_number": { "a": true, "h": "Vat Number", "n": "vat_number", "r": false, "t": "`$STRING`", "key$": "vat_number", "index$": 20 }, "zip": { "a": true, "h": "Zip", "n": "zip", "op": { "create": { "req": false, "type": "`$STRING`" }, "update": { "req": false, "type": "`$STRING`" } }, "r": true, "t": "`$STRING`", "key$": "zip", "index$": 21 } }, "id": { "field": "id", "name": "id" }, "name": "organization", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["action", "params"], "co": { "id": "POST /organization/organizations/{org_id}/action", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "org_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/organization/organizations/{org_id}/action", "q": { "$action": "action", "exist": ["id"] }, "r": { "param": { "org_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "organization" }, { "lit": "organizations" }, { "var": "id" }, { "lit": "action" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "bf": ["city", "country", "email", "fax", "firstname", "lang", "lastname", "name", "orgname", "phone", "reference", "reseller", "siren", "state", "streetaddr", "streetaddr2", "type", "vat_number", "zip"], "co": { "id": "POST /organization/organizations", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/organization/organizations", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "organization" }, { "lit": "organizations" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /organization/organizations", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "explode": true, "k": "query", "n": "name", "or": "name", "r": false, "style": "form", "t": "`$STRING`", "index$": 0 }, { "a": true, "explode": true, "k": "query", "n": "permission", "or": "permission", "r": false, "style": "form", "t": "`$STRING`", "index$": 1 }, { "a": true, "ex": "name", "explode": true, "k": "query", "n": "sort_by", "or": "sort_by", "r": false, "style": "form", "t": "`$STRING`", "index$": 2 }, { "a": true, "explode": true, "k": "query", "n": "type", "or": "type", "r": false, "style": "form", "t": "`$STRING`", "index$": 3 }, { "a": true, "explode": true, "k": "query", "n": "~name", "or": "~name", "r": false, "style": "form", "t": "`$STRING`", "index$": 4 }] }, "k": "http", "m": "GET", "o": "/organization/organizations", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "organization" }, { "lit": "organizations" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /organization/organizations/{org_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "org_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/organization/organizations/{org_id}", "q": { "exist": ["id"] }, "r": { "param": { "org_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "organization" }, { "lit": "organizations" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /organization/organizations/{org_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "org_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/organization/organizations/{org_id}", "q": { "exist": ["id"] }, "r": { "param": { "org_id": "id" } }, "s": [{ "lit": "organization" }, { "lit": "organizations" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "bf": ["city", "country", "email", "fax", "firstname", "lang", "lastname", "name", "phone", "reference", "reseller", "siren", "state", "streetaddr", "streetaddr2", "vat_number", "zip"], "co": { "id": "PATCH /organization/organizations/{org_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "org_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PATCH", "o": "/organization/organizations/{org_id}", "q": { "exist": ["id"] }, "r": { "param": { "org_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "organization" }, { "lit": "organizations" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [] }, "key$": "organization", "name__orig": "organization", "Name": "Organization", "name_": "organization", "name-": "organization", "NAME": "ORGANIZATION", "index$": 55 }, { "active": true, "entity": "organization", "key$": "BasicOrganizationFlow", "kind": "basic", "name": "BasicOrganizationFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "organization_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "organization_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "organization_ref01", "srcdatavar": "organization_ref01_data", "suffix": "_up0", "textfield": "city" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-organization_ref01" } }], "v": [], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "organization_ref01", "srcdatavar": "organization_ref01_data", "suffix": "_dt0" }, "m": { "id": "organization01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-organization_ref01" } }], "index$": 3, "route": "GET /organization/organizations/{org_id}", "record": {} }, { "a": true, "d": {}, "i": { "ref": "organization_ref01", "suffix": "_rm0" }, "m": { "id": "organization01" }, "o": "remove", "s": [], "v": [], "index$": 4 }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "organization_ref01" } }], "index$": 5 }] }, 'Organization', { "POST /organization/organizations/{org_id}/action": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "action": { "type": "string", "enum": ["release_resellee"] }, "params": { "type": "object", "properties": { "id": { "type": "string" } }, "required": ["id"] } }, "required": ["action", "params"] } } } }, "parameters": [{ "name": "org_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "POST /organization/organizations": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "city": { "type": "string", "key$": "city" }, "email": { "type": "string", "key$": "email" }, "firstname": { "type": "string", "key$": "firstname" }, "lastname": { "type": "string", "key$": "lastname" }, "name": { "type": "string", "key$": "name" }, "orgname": { "type": "string", "key$": "orgname" }, "phone": { "type": "string", "key$": "phone" }, "streetaddr": { "type": "string", "key$": "streetaddr" }, "type": { "type": "string", "enum": ["company", "association", "publicbody"], "key$": "type" }, "country": { "type": "string", "key$": "country" }, "fax": { "type": "string", "key$": "fax" }, "lang": { "type": "string", "key$": "lang" }, "reference": { "type": "string", "key$": "reference" }, "reseller": { "type": "boolean", "key$": "reseller" }, "siren": { "type": "string", "key$": "siren" }, "state": { "type": "string", "key$": "state" }, "streetaddr2": { "type": "string", "key$": "streetaddr2" }, "vat_number": { "type": "string", "key$": "vat_number" }, "zip": { "type": "string", "key$": "zip" } }, "required": ["city", "email", "firstname", "lastname", "name", "orgname", "phone", "streetaddr", "type"] } } } }, "parameters": [] }, "GET /organization/organizations": { "protocol": "http", "parameters": [{ "name": "~name", "in": "query", "schema": { "type": "string" }, "index$": 0 }, { "name": "name", "in": "query", "schema": { "type": "string" }, "index$": 1 }, { "name": "permission", "in": "query", "schema": { "type": "string" }, "index$": 2 }, { "name": "sort_by", "in": "query", "schema": { "type": "string", "enum": ["name", "type", "id"], "default": "name" }, "index$": 3 }, { "name": "type", "in": "query", "schema": { "type": "string", "enum": ["individual", "company", "association", "publicbody"] }, "index$": 4 }] }, "GET /organization/organizations/{org_id}": { "protocol": "http", "parameters": [{ "name": "org_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "DELETE /organization/organizations/{org_id}": { "protocol": "http", "parameters": [{ "name": "org_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "PATCH /organization/organizations/{org_id}": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "city": { "type": "string", "key$": "city" }, "country": { "type": "string", "key$": "country" }, "email": { "type": "string", "key$": "email" }, "fax": { "type": "string", "key$": "fax" }, "firstname": { "type": "string", "key$": "firstname" }, "lang": { "type": "string", "enum": ["en", "es", "fr", "ja", "zh-hans", "zh-hant"], "key$": "lang" }, "lastname": { "type": "string", "key$": "lastname" }, "name": { "type": "string", "key$": "name" }, "phone": { "type": "string", "key$": "phone" }, "reference": { "type": "string", "key$": "reference" }, "reseller": { "type": "boolean", "key$": "reseller" }, "siren": { "type": "string", "key$": "siren" }, "state": { "type": "string", "key$": "state" }, "streetaddr": { "type": "string", "key$": "streetaddr" }, "streetaddr2": { "type": "string", "key$": "streetaddr2" }, "vat_number": { "type": "string", "key$": "vat_number" }, "zip": { "type": "string", "key$": "zip" } } } } } }, "parameters": [{ "name": "org_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "organization.create.0": "GET-only live run: needs POST /organization/organizations/{org_id}/action", "organization.update.2": "GET-only live run: needs PATCH /organization/organizations/{org_id}", "organization.remove.4": "GET-only live run: needs DELETE /organization/organizations/{org_id}", "organization.list.5": "GET-only live run: checks a removal this run does not make" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const organization_ref01_ent = client.Organization();
        let organization_ref01_data = setup.data.new.organization['organization_ref01'];
        organization_ref01_data = (await organization_ref01_ent.create(organization_ref01_data)).data();
        (0, node_assert_1.default)(null != organization_ref01_data.id);
        // LIST
        const organization_ref01_match = {};
        const organization_ref01_list = (await organization_ref01_ent.list(organization_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(organization_ref01_list, { id: organization_ref01_data.id })));
        // UPDATE
        const organization_ref01_data_up0 = {};
        organization_ref01_data_up0.id = organization_ref01_data.id;
        const organization_ref01_markdef_up0 = { name: 'city', value: 'Mark01-organization_ref01_' + setup.now };
        organization_ref01_data_up0[organization_ref01_markdef_up0.name] = organization_ref01_markdef_up0.value;
        const organization_ref01_resdata_up0 = (await organization_ref01_ent.update(organization_ref01_data_up0)).data();
        (0, node_assert_1.default)(organization_ref01_resdata_up0.id === organization_ref01_data_up0.id);
        (0, node_assert_1.default)(organization_ref01_resdata_up0[organization_ref01_markdef_up0.name] === organization_ref01_markdef_up0.value);
        // LOAD
        const organization_ref01_match_dt0 = {};
        organization_ref01_match_dt0.id = organization_ref01_data.id;
        const organization_ref01_data_dt0 = (await organization_ref01_ent.load(organization_ref01_match_dt0)).data();
        (0, node_assert_1.default)(organization_ref01_data_dt0.id === organization_ref01_data.id);
        // REMOVE
        const organization_ref01_match_rm0 = { id: organization_ref01_data.id };
        await organization_ref01_ent.remove(organization_ref01_match_rm0);
        // LIST
        const organization_ref01_match_rt0 = {};
        const organization_ref01_list_rt0 = (await organization_ref01_ent.list(organization_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(organization_ref01_list_rt0, { id: organization_ref01_data.id })));
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/organization/OrganizationTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.GandiSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['organization01', 'organization02', 'organization03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'GANDI_TEST_ORGANIZATION_ENTID': idmap,
        'GANDI_TEST_LIVE': 'FALSE',
        'GANDI_TEST_EXPLAIN': 'FALSE',
        'GANDI_APIKEY': '',
    });
    idmap = env['GANDI_TEST_ORGANIZATION_ENTID'];
    const live = 'TRUE' === env.GANDI_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['GANDI_TEST_ORGANIZATION_ENTID'];
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
//# sourceMappingURL=OrganizationEntity.test.js.map