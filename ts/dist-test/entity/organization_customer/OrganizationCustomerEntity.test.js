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
(0, node_test_1.describe)('OrganizationCustomerEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when GANDI_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('GANDI_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.GandiSDK.test();
        const ent = testsdk.OrganizationCustomer();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.GandiSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.OrganizationCustomer().list({ "org_id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.GANDI_TEST_LIVE;
        for (const op of ['create', 'list', 'update', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'organization_customer.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "city": { "a": true, "h": "City", "n": "city", "op": { "update": { "req": false, "type": "`$STRING`" } }, "r": true, "t": "`$STRING`", "key$": "city", "index$": 0 }, "country": { "a": true, "h": "Country", "n": "country", "op": { "update": { "req": false, "type": "`$STRING`" } }, "r": true, "t": "`$STRING`", "key$": "country", "index$": 1 }, "email": { "a": true, "h": "Email", "n": "email", "op": { "update": { "req": false, "type": "`$STRING`" } }, "r": true, "t": "`$STRING`", "key$": "email", "index$": 2 }, "fax": { "a": true, "h": "Fax", "n": "fax", "r": false, "t": "`$STRING`", "key$": "fax", "index$": 3 }, "firstname": { "a": true, "h": "Firstname", "n": "firstname", "op": { "update": { "req": false, "type": "`$STRING`" } }, "r": true, "t": "`$STRING`", "key$": "firstname", "index$": 4 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "t": "`$STRING`", "key$": "id", "index$": 5 }, "lang": { "a": true, "h": "Lang", "n": "lang", "r": false, "t": "`$STRING`", "key$": "lang", "index$": 6 }, "lastname": { "a": true, "h": "Lastname", "n": "lastname", "op": { "update": { "req": false, "type": "`$STRING`" } }, "r": true, "t": "`$STRING`", "key$": "lastname", "index$": 7 }, "message": { "a": true, "h": "Message", "n": "message", "r": true, "t": "`$STRING`", "key$": "message", "index$": 8 }, "name": { "a": true, "h": "Name", "n": "name", "r": true, "t": "`$STRING`", "key$": "name", "index$": 9 }, "orgname": { "a": true, "h": "Orgname", "n": "orgname", "r": false, "t": "`$STRING`", "key$": "orgname", "index$": 10 }, "phone": { "a": true, "h": "Phone", "n": "phone", "op": { "create": { "req": true, "type": "`$STRING`" } }, "r": false, "t": "`$STRING`", "key$": "phone", "index$": 11 }, "reference": { "a": true, "h": "Reference", "n": "reference", "r": false, "t": "`$STRING`", "key$": "reference", "index$": 12 }, "siren": { "a": true, "h": "Siren", "n": "siren", "r": false, "t": "`$STRING`", "key$": "siren", "index$": 13 }, "state": { "a": true, "h": "State", "n": "state", "r": false, "t": "`$STRING`", "key$": "state", "index$": 14 }, "streetaddr": { "a": true, "h": "Streetaddr", "n": "streetaddr", "op": { "update": { "req": false, "type": "`$STRING`" } }, "r": true, "t": "`$STRING`", "key$": "streetaddr", "index$": 15 }, "streetaddr2": { "a": true, "h": "Streetaddr2", "n": "streetaddr2", "r": false, "t": "`$STRING`", "key$": "streetaddr2", "index$": 16 }, "sync_contact_email": { "a": true, "h": "Sync Contact Email", "n": "sync_contact_email", "r": false, "t": "`$STRING`", "key$": "sync_contact_email", "index$": 17 }, "type": { "a": true, "h": "Type", "n": "type", "r": true, "t": "`$STRING`", "key$": "type", "index$": 18 }, "vat_number": { "a": true, "h": "Vat Number", "n": "vat_number", "r": false, "t": "`$STRING`", "key$": "vat_number", "index$": 19 }, "zip": { "a": true, "h": "Zip", "n": "zip", "r": false, "t": "`$STRING`", "key$": "zip", "index$": 20 } }, "id": { "field": "id", "name": "id" }, "name": "organization_customer", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["city", "country", "email", "fax", "firstname", "lastname", "orgname", "phone", "reference", "state", "streetaddr", "streetaddr2", "type", "zip"], "co": { "id": "POST /organization/organizations/{org_id}/customers", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "org_id", "or": "org_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/organization/organizations/{org_id}/customers", "q": { "exist": ["org_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "organization" }, { "lit": "organizations" }, { "var": "org_id" }, { "lit": "customers" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /organization/organizations/{org_id}/customers", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "org_id", "or": "org_id", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "explode": true, "k": "query", "n": "name", "or": "name", "r": false, "style": "form", "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": 1, "explode": true, "k": "query", "n": "page", "or": "page", "r": false, "style": "form", "t": "`$INTEGER`", "index$": 1 }, { "a": true, "explode": true, "k": "query", "n": "per_page", "or": "per_page", "r": false, "style": "form", "t": "`$INTEGER`", "index$": 2 }, { "a": true, "explode": true, "k": "query", "n": "permission", "or": "permission", "r": false, "style": "form", "t": "`$STRING`", "index$": 3 }, { "a": true, "ex": "name", "explode": true, "k": "query", "n": "sort_by", "or": "sort_by", "r": false, "style": "form", "t": "`$STRING`", "index$": 4 }] }, "k": "http", "m": "GET", "o": "/organization/organizations/{org_id}/customers", "q": { "exist": ["org_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "organization" }, { "lit": "organizations" }, { "var": "org_id" }, { "lit": "customers" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /organization/organizations/{org_id}/customers/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "org_id", "or": "org_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/organization/organizations/{org_id}/customers/{id}", "q": { "exist": ["id", "org_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "organization" }, { "lit": "organizations" }, { "var": "org_id" }, { "lit": "customers" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /organization/organizations/{org_id}/customers/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "org_id", "or": "org_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "DELETE", "o": "/organization/organizations/{org_id}/customers/{id}", "q": { "exist": ["id", "org_id"] }, "r": {}, "s": [{ "lit": "organization" }, { "lit": "organizations" }, { "var": "org_id" }, { "lit": "customers" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "bf": ["city", "country", "email", "fax", "firstname", "lang", "lastname", "phone", "reference", "siren", "state", "streetaddr", "streetaddr2", "sync_contact_email", "vat_number", "zip"], "co": { "id": "PATCH /organization/organizations/{org_id}/customers/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "org_id", "or": "org_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "PATCH", "o": "/organization/organizations/{org_id}/customers/{id}", "q": { "exist": ["id", "org_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "organization" }, { "lit": "organizations" }, { "var": "org_id" }, { "lit": "customers" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [["$.main.kit.entity.organization"]] }, "key$": "organization_customer", "name__orig": "organization_customer", "Name": "OrganizationCustomer", "name_": "organization_customer", "name-": "organization-customer", "NAME": "ORGANIZATION_CUSTOMER", "index$": 55 }, { "active": true, "entity": "organization_customer", "key$": "BasicOrganizationCustomerFlow", "kind": "basic", "name": "BasicOrganizationCustomerFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "organization_customer_ref01" }, "m": { "org_id": "org01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": { "org_id": "org01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "organization_customer_ref01" } }], "index$": 1 }, { "a": true, "d": { "org_id": "org01" }, "i": { "ref": "organization_customer_ref01", "srcdatavar": "organization_customer_ref01_data", "suffix": "_up0", "textfield": "city" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-organization_customer_ref01" } }], "v": [], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "organization_customer_ref01", "srcdatavar": "organization_customer_ref01_data", "suffix": "_dt0" }, "m": { "id": "organization_customer01", "org_id": "org01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-organization_customer_ref01" } }], "index$": 3, "route": "GET /organization/organizations/{org_id}/customers/{id}", "record": {} }, { "a": true, "d": {}, "i": { "ref": "organization_customer_ref01", "suffix": "_rm0" }, "m": { "id": "organization_customer01", "org_id": "org01" }, "o": "remove", "s": [], "v": [], "index$": 4 }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": { "org_id": "org01" }, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "organization_customer_ref01" } }], "index$": 5 }] }, 'OrganizationCustomer', { "POST /organization/organizations/{org_id}/customers": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "city": { "type": "string", "key$": "city" }, "country": { "type": "string", "key$": "country" }, "email": { "type": "string", "key$": "email" }, "firstname": { "type": "string", "key$": "firstname" }, "lastname": { "type": "string", "key$": "lastname" }, "phone": { "type": "string", "key$": "phone" }, "streetaddr": { "type": "string", "key$": "streetaddr" }, "type": { "type": "string", "enum": ["individual", "company", "association", "publicbody"], "key$": "type" }, "fax": { "type": "string", "key$": "fax" }, "orgname": { "type": "string", "key$": "orgname" }, "reference": { "type": "string", "key$": "reference" }, "state": { "type": "string", "key$": "state" }, "streetaddr2": { "type": "string", "key$": "streetaddr2" }, "zip": { "type": "string", "key$": "zip" } }, "required": ["city", "country", "email", "firstname", "lastname", "phone", "streetaddr", "type"] } } } }, "parameters": [{ "name": "org_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "GET /organization/organizations/{org_id}/customers": { "protocol": "http", "parameters": [{ "name": "org_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "name", "in": "query", "schema": { "type": "string" }, "index$": 1 }, { "name": "page", "in": "query", "schema": { "type": "integer", "default": 1, "minimum": 1 }, "index$": 2 }, { "name": "per_page", "in": "query", "schema": { "type": "integer", "minimum": 1 }, "index$": 3 }, { "name": "permission", "in": "query", "schema": { "type": "string" }, "index$": 4 }, { "name": "sort_by", "in": "query", "schema": { "type": "string", "enum": ["name", "type", "id"], "default": "name" }, "index$": 5 }] }, "GET /organization/organizations/{org_id}/customers/{id}": { "protocol": "http", "parameters": [{ "name": "org_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "DELETE /organization/organizations/{org_id}/customers/{id}": { "protocol": "http", "parameters": [{ "name": "org_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "PATCH /organization/organizations/{org_id}/customers/{id}": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "city": { "type": "string", "key$": "city" }, "country": { "type": "string", "key$": "country" }, "email": { "type": "string", "key$": "email" }, "fax": { "type": "string", "key$": "fax" }, "firstname": { "type": "string", "key$": "firstname" }, "lang": { "type": "string", "enum": ["en", "es", "fr", "ja", "zh-hans", "zh-hant"], "key$": "lang" }, "lastname": { "type": "string", "key$": "lastname" }, "phone": { "type": "string", "key$": "phone" }, "reference": { "type": "string", "key$": "reference" }, "siren": { "type": "string", "key$": "siren" }, "state": { "type": "string", "key$": "state" }, "streetaddr": { "type": "string", "key$": "streetaddr" }, "streetaddr2": { "type": "string", "key$": "streetaddr2" }, "sync_contact_email": { "type": "string", "enum": ["never", "match", "always"], "key$": "sync_contact_email" }, "vat_number": { "type": "string", "key$": "vat_number" }, "zip": { "type": "string", "key$": "zip" } } } } } }, "parameters": [{ "name": "org_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "organization_customer.create.0": "GET-only live run: needs POST /organization/organizations/{org_id}/customers", "organization_customer.update.2": "GET-only live run: needs PATCH /organization/organizations/{org_id}/customers/{id}", "organization_customer.remove.4": "GET-only live run: needs DELETE /organization/organizations/{org_id}/customers/{id}", "organization_customer.list.5": "GET-only live run: checks a removal this run does not make" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const organization_customer_ref01_ent = client.OrganizationCustomer();
        let organization_customer_ref01_data = setup.data.new.organization_customer['organization_customer_ref01'];
        organization_customer_ref01_data['org_id'] = setup.idmap['org01'];
        organization_customer_ref01_data = (await organization_customer_ref01_ent.create(organization_customer_ref01_data)).data();
        (0, node_assert_1.default)(null != organization_customer_ref01_data.id);
        // LIST
        const organization_customer_ref01_match = {};
        organization_customer_ref01_match['org_id'] = setup.idmap['org01'];
        const organization_customer_ref01_list = (await organization_customer_ref01_ent.list(organization_customer_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(organization_customer_ref01_list, { id: organization_customer_ref01_data.id })));
        // UPDATE
        const organization_customer_ref01_data_up0 = {};
        organization_customer_ref01_data_up0.id = organization_customer_ref01_data.id;
        organization_customer_ref01_data_up0['org_id'] = setup.idmap['org_id'] ?? setup.idmap['org01'];
        const organization_customer_ref01_markdef_up0 = { name: 'city', value: 'Mark01-organization_customer_ref01_' + setup.now };
        organization_customer_ref01_data_up0[organization_customer_ref01_markdef_up0.name] = organization_customer_ref01_markdef_up0.value;
        const organization_customer_ref01_resdata_up0 = (await organization_customer_ref01_ent.update(organization_customer_ref01_data_up0)).data();
        (0, node_assert_1.default)(organization_customer_ref01_resdata_up0.id === organization_customer_ref01_data_up0.id);
        (0, node_assert_1.default)(organization_customer_ref01_resdata_up0[organization_customer_ref01_markdef_up0.name] === organization_customer_ref01_markdef_up0.value);
        // LOAD
        const organization_customer_ref01_match_dt0 = {};
        organization_customer_ref01_match_dt0.id = organization_customer_ref01_data.id;
        organization_customer_ref01_match_dt0['org_id'] = setup.idmap['org_id'] ?? setup.idmap['org01'];
        const organization_customer_ref01_data_dt0 = (await organization_customer_ref01_ent.load(organization_customer_ref01_match_dt0)).data();
        (0, node_assert_1.default)(organization_customer_ref01_data_dt0.id === organization_customer_ref01_data.id);
        // REMOVE
        const organization_customer_ref01_match_rm0 = { id: organization_customer_ref01_data.id };
        organization_customer_ref01_match_rm0['org_id'] = setup.idmap['org_id'] ?? setup.idmap['org01'];
        await organization_customer_ref01_ent.remove(organization_customer_ref01_match_rm0);
        // LIST
        const organization_customer_ref01_match_rt0 = {};
        organization_customer_ref01_match_rt0['org_id'] = setup.idmap['org01'];
        const organization_customer_ref01_list_rt0 = (await organization_customer_ref01_ent.list(organization_customer_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(organization_customer_ref01_list_rt0, { id: organization_customer_ref01_data.id })));
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/organization_customer/OrganizationCustomerTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.GandiSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['organization_customer01', 'organization_customer02', 'organization_customer03', 'organization01', 'organization02', 'organization03', 'org01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'GANDI_TEST_ORGANIZATION_CUSTOMER_ENTID': idmap,
        'GANDI_TEST_LIVE': 'FALSE',
        'GANDI_TEST_EXPLAIN': 'FALSE',
        'GANDI_APIKEY': '',
    });
    idmap = env['GANDI_TEST_ORGANIZATION_CUSTOMER_ENTID'];
    const live = 'TRUE' === env.GANDI_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['GANDI_TEST_ORGANIZATION_CUSTOMER_ENTID'];
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
//# sourceMappingURL=OrganizationCustomerEntity.test.js.map