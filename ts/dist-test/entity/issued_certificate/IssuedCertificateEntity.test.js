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
(0, node_test_1.describe)('IssuedCertificateEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when GANDI_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('GANDI_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.GandiSDK.test();
        const ent = testsdk.IssuedCertificate();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('issued_certificate hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.GandiSDK.test(offline).IssuedCertificate().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.GandiSDK.test(offline).IssuedCertificate()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.GandiSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.IssuedCertificate().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.GandiSDK.test().IssuedCertificate().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.GandiSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.IssuedCertificate().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.IssuedCertificate().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.GandiSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.IssuedCertificate().list({ "cn": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.GANDI_TEST_LIVE;
        for (const op of ['create', 'list', 'update', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'issued_certificate.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "altnames": { "a": true, "h": "Altnames", "n": "altnames", "op": { "create": { "req": false, "type": "`$ARRAY`" }, "update": { "req": false, "type": "`$ARRAY`" } }, "r": true, "t": "`$ARRAY`", "key$": "altnames", "index$": 0 }, "altnames_unicode": { "a": true, "h": "Altnames Unicode", "n": "altnames_unicode", "r": true, "t": "`$ARRAY`", "key$": "altnames_unicode", "index$": 1 }, "apex_only": { "a": true, "h": "Apex Only", "n": "apex_only", "r": false, "t": "`$BOOLEAN`", "key$": "apex_only", "index$": 2 }, "assumed_name": { "a": true, "h": "Assumed Name", "n": "assumed_name", "r": false, "t": "`$STRING`", "key$": "assumed_name", "index$": 3 }, "business_category": { "a": true, "h": "Business Category", "n": "business_category", "r": false, "t": "`$STRING`", "key$": "business_category", "index$": 4 }, "card_pay_trustlogo": { "a": true, "h": "Card Pay Trustlogo", "n": "card_pay_trustlogo", "r": false, "t": "`$BOOLEAN`", "key$": "card_pay_trustlogo", "index$": 5 }, "cert": { "a": true, "h": "Cert", "n": "cert", "r": false, "t": "`$STRING`", "key$": "cert", "index$": 6 }, "cn": { "a": true, "h": "Cn", "n": "cn", "op": { "create": { "req": false, "type": "`$STRING`" } }, "r": true, "t": "`$STRING`", "key$": "cn", "index$": 7 }, "cn_unicode": { "a": true, "h": "Cn Unicode", "n": "cn_unicode", "r": true, "t": "`$STRING`", "key$": "cn_unicode", "index$": 8 }, "contact": { "a": true, "h": "Contact", "n": "contact", "r": true, "t": "`$OBJECT`", "key$": "contact", "index$": 9 }, "csr": { "a": true, "h": "Csr", "n": "csr", "r": false, "t": "`$STRING`", "key$": "csr", "index$": 10 }, "dates": { "a": true, "h": "Dates", "n": "dates", "r": true, "t": "`$OBJECT`", "key$": "dates", "index$": 11 }, "dcv_method": { "a": true, "h": "Dcv Method", "n": "dcv_method", "r": false, "t": "`$STRING`", "key$": "dcv_method", "index$": 12 }, "duration": { "a": true, "h": "Duration", "n": "duration", "r": false, "t": "`$INTEGER`", "key$": "duration", "index$": 13 }, "error_msg": { "a": true, "h": "Error Msg", "n": "error_msg", "r": false, "t": "`$STRING`", "key$": "error_msg", "index$": 14 }, "errors": { "a": true, "h": "Errors", "n": "errors", "r": false, "t": "`$ARRAY`", "key$": "errors", "index$": 15 }, "href": { "a": true, "h": "Href", "n": "href", "r": false, "t": "`$STRING`", "key$": "href", "index$": 16 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "t": "`$STRING`", "key$": "id", "index$": 17 }, "ida": { "a": true, "h": "Ida", "n": "ida", "r": false, "t": "`$OBJECT`", "key$": "ida", "index$": 18 }, "intermediate": { "a": true, "h": "Intermediate", "n": "intermediate", "r": false, "t": "`$STRING`", "key$": "intermediate", "index$": 19 }, "joi": { "a": true, "h": "Joi", "n": "joi", "r": false, "t": "`$OBJECT`", "key$": "joi", "index$": 20 }, "middleman": { "a": true, "h": "Middleman", "n": "middleman", "r": false, "t": "`$OBJECT`", "key$": "middleman", "index$": 21 }, "owner": { "a": true, "h": "Owner", "n": "owner", "r": false, "t": "`$STRING`", "key$": "owner", "index$": 22 }, "package": { "a": true, "h": "Package", "n": "package", "r": true, "t": "`$OBJECT`", "key$": "package", "index$": 23 }, "provider": { "a": true, "h": "Provider", "n": "provider", "r": true, "t": "`$STRING`", "key$": "provider", "index$": 24 }, "reissuable": { "a": true, "h": "Reissuable", "n": "reissuable", "r": false, "t": "`$BOOLEAN`", "key$": "reissuable", "index$": 25 }, "renewable": { "a": true, "h": "Renewable", "n": "renewable", "r": false, "t": "`$BOOLEAN`", "key$": "renewable", "index$": 26 }, "resellee_id": { "a": true, "h": "Resellee Id", "n": "resellee_id", "r": false, "t": "`$STRING`", "key$": "resellee_id", "index$": 27 }, "sha_version": { "a": true, "h": "Sha Version", "n": "sha_version", "r": false, "t": "`$INTEGER`", "key$": "sha_version", "index$": 28 }, "sharing_id": { "a": true, "h": "Sharing Id", "n": "sharing_id", "r": false, "t": "`$STRING`", "key$": "sharing_id", "index$": 29 }, "software": { "a": true, "h": "Software", "n": "software", "r": true, "t": "`$INTEGER`", "key$": "software", "index$": 30 }, "state": { "a": true, "h": "State", "n": "state", "r": false, "t": "`$STRING`", "key$": "state", "index$": 31 }, "state_detail": { "a": true, "h": "State Detail", "n": "state_detail", "r": false, "t": "`$STRING`", "key$": "state_detail", "index$": 32 }, "status": { "a": true, "h": "Status", "n": "status", "r": true, "t": "`$STRING`", "key$": "status", "index$": 33 }, "step_nb": { "a": true, "h": "Step Nb", "n": "step_nb", "r": false, "t": "`$INTEGER`", "key$": "step_nb", "index$": 34 }, "stored": { "a": true, "h": "Stored", "n": "stored", "r": false, "t": "`$BOOLEAN`", "key$": "stored", "index$": 35 }, "tags": { "a": true, "h": "Tags", "n": "tags", "r": false, "t": "`$ARRAY`", "key$": "tags", "index$": 36 }, "trustlogo": { "a": true, "h": "Trustlogo", "n": "trustlogo", "r": false, "t": "`$BOOLEAN`", "key$": "trustlogo", "index$": 37 }, "trustlogo_token": { "a": true, "h": "Trustlogo Token", "n": "trustlogo_token", "r": false, "t": "`$OBJECT`", "key$": "trustlogo_token", "index$": 38 } }, "id": { "field": "id", "name": "id" }, "name": "issued_certificate", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["csr", "dcv_method", "package"], "co": { "id": "POST /certificate/issued-certs/{id}/dcv_params", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/certificate/issued-certs/{id}/dcv_params", "q": { "$action": "dcv_params", "exist": ["id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "certificate" }, { "lit": "issued-certs" }, { "var": "id" }, { "lit": "dcv_params" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "bf": ["altnames", "csr", "dcv_method", "package"], "co": { "id": "POST /certificate/dcv_params", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/certificate/dcv_params", "q": { "$action": "dcv_params" }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "certificate" }, { "lit": "dcv_params" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "a": true, "bf": ["altnames", "apex_only", "cn", "csr", "dcv_method", "duration", "package", "resellee_id"], "co": { "id": "POST /certificate/issued-certs", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "explode": false, "k": "header", "n": "dry_run", "or": "Dry-Run", "r": false, "style": "simple", "t": "`$INTEGER`", "index$": 0 }], "query": [{ "a": true, "explode": true, "k": "query", "n": "sharing_id", "or": "sharing_id", "r": false, "style": "form", "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/certificate/issued-certs", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "certificate" }, { "lit": "issued-certs" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /certificate/issued-certs", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "explode": true, "k": "query", "n": "cn", "or": "cn", "r": false, "style": "form", "t": "`$STRING`", "index$": 0 }, { "a": true, "explode": true, "k": "query", "n": "cn_eq", "or": "cn__eq", "r": false, "style": "form", "t": "`$STRING`", "index$": 1 }, { "a": true, "explode": true, "k": "query", "n": "covered_cn", "or": "covered_cn", "r": false, "style": "form", "t": "`$STRING`", "index$": 2 }, { "a": true, "explode": true, "k": "query", "n": "package", "or": "package", "r": false, "style": "form", "t": "`$STRING`", "index$": 3 }, { "a": true, "ex": 1, "explode": true, "k": "query", "n": "page", "or": "page", "r": false, "style": "form", "t": "`$INTEGER`", "index$": 4 }, { "a": true, "explode": true, "k": "query", "n": "per_page", "or": "per_page", "r": false, "style": "form", "t": "`$INTEGER`", "index$": 5 }, { "a": true, "explode": true, "k": "query", "n": "sharing_id", "or": "sharing_id", "r": false, "style": "form", "t": "`$STRING`", "index$": 6 }, { "a": true, "ex": "ends_at", "explode": true, "k": "query", "n": "sort_by", "or": "sort_by", "r": false, "style": "form", "t": "`$STRING`", "index$": 7 }, { "a": true, "explode": true, "k": "query", "n": "status", "or": "status", "r": false, "style": "form", "t": "`$STRING`", "index$": 8 }] }, "k": "http", "m": "GET", "o": "/certificate/issued-certs", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "certificate" }, { "lit": "issued-certs" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /certificate/issued-certs/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/certificate/issued-certs/{id}", "q": { "exist": ["id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "certificate" }, { "lit": "issued-certs" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /certificate/issued-certs/{id}/crt", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/certificate/issued-certs/{id}/crt", "q": { "$action": "crt", "exist": ["id"] }, "r": {}, "rs": { "kind": "raw", "media": "text/plain" }, "s": [{ "lit": "certificate" }, { "lit": "issued-certs" }, { "var": "id" }, { "lit": "crt" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /certificate/issued-certs/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "explode": true, "k": "query", "n": "sharing_id", "or": "sharing_id", "r": false, "style": "form", "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/certificate/issued-certs/{id}", "q": { "exist": ["id"] }, "r": {}, "s": [{ "lit": "certificate" }, { "lit": "issued-certs" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "bf": ["altnames", "csr", "dcv_method"], "co": { "id": "PATCH /certificate/issued-certs/{id}", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "explode": false, "k": "header", "n": "dry_run", "or": "Dry-Run", "r": false, "style": "simple", "t": "`$INTEGER`", "index$": 0 }], "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "explode": true, "k": "query", "n": "sharing_id", "or": "sharing_id", "r": false, "style": "form", "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PATCH", "o": "/certificate/issued-certs/{id}", "q": { "exist": ["id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "certificate" }, { "lit": "issued-certs" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [] }, "key$": "issued_certificate", "name__orig": "issued_certificate", "Name": "IssuedCertificate", "name_": "issued_certificate", "name-": "issued-certificate", "NAME": "ISSUED_CERTIFICATE", "index$": 34 }, { "active": true, "entity": "issued_certificate", "key$": "BasicIssuedCertificateFlow", "kind": "basic", "name": "BasicIssuedCertificateFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "issued_certificate_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "issued_certificate_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "issued_certificate_ref01", "srcdatavar": "issued_certificate_ref01_data", "suffix": "_up0", "textfield": "assumed_name" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-issued_certificate_ref01" } }], "v": [], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "issued_certificate_ref01", "srcdatavar": "issued_certificate_ref01_data", "suffix": "_dt0" }, "m": { "id": "issued_certificate01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-issued_certificate_ref01" } }], "index$": 3, "route": "GET /certificate/issued-certs/{id}", "record": {} }, { "a": true, "d": {}, "i": { "ref": "issued_certificate_ref01", "suffix": "_rm0" }, "m": { "id": "issued_certificate01" }, "o": "remove", "s": [], "v": [], "index$": 4 }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "issued_certificate_ref01" } }], "index$": 5 }] }, 'IssuedCertificate', { "POST /certificate/issued-certs/{id}/dcv_params": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "csr": { "type": "string" }, "dcv_method": { "type": "string", "enum": ["email", "dns", "file", "http", "https"] }, "package": { "type": "string" } } } } } }, "parameters": [{ "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "POST /certificate/dcv_params": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "altnames": { "type": "array", "items": { "type": "string" } }, "csr": { "type": "string" }, "dcv_method": { "type": "string", "enum": ["email", "dns", "file", "http", "https"] }, "package": { "type": "string" } } } } } }, "parameters": [] }, "POST /certificate/issued-certs": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "package": { "type": "string", "key$": "package" }, "altnames": { "type": "array", "items": { "type": "string" }, "key$": "altnames" }, "apex_only": { "type": "boolean", "key$": "apex_only" }, "cn": { "type": "string", "maxLength": 64, "key$": "cn" }, "csr": { "type": "string", "key$": "csr" }, "dcv_method": { "type": "string", "enum": ["email", "dns", "file", "http", "https"], "key$": "dcv_method" }, "duration": { "type": "integer", "default": 1, "minimum": 1, "key$": "duration" }, "resellee_id": { "type": "string", "key$": "resellee_id" } }, "required": ["package"] } } } }, "parameters": [{ "name": "sharing_id", "in": "query", "schema": { "type": "string" }, "index$": 0 }, { "name": "Dry-Run", "in": "header", "schema": { "type": "integer" }, "index$": 1 }] }, "GET /certificate/issued-certs": { "protocol": "http", "parameters": [{ "name": "cn", "in": "query", "schema": { "type": "string" }, "index$": 0 }, { "name": "cn__eq", "in": "query", "schema": { "type": "string" }, "index$": 1 }, { "name": "covered_cn", "in": "query", "schema": { "type": "string" }, "index$": 2 }, { "name": "package", "in": "query", "schema": { "type": "string" }, "index$": 3 }, { "name": "page", "in": "query", "schema": { "type": "integer", "default": 1, "minimum": 1 }, "index$": 4 }, { "name": "per_page", "in": "query", "schema": { "type": "integer", "minimum": 1 }, "index$": 5 }, { "name": "sharing_id", "in": "query", "schema": { "type": "string" }, "index$": 6 }, { "name": "sort_by", "in": "query", "schema": { "type": "string", "enum": ["created_at", "-created_at", "updated_at", "-updated_at", "started_at", "-started_at", "ends_at", "-ends_at", "subscription_ends_at", "-subscription_ends_at"], "default": "ends_at" }, "index$": 7 }, { "name": "status", "in": "query", "schema": { "type": "string", "enum": ["pending", "valid", "revoked", "replaced", "replaced_rev", "expired"] }, "index$": 8 }] }, "GET /certificate/issued-certs/{id}": { "protocol": "http", "parameters": [{ "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "GET /certificate/issued-certs/{id}/crt": { "protocol": "http", "parameters": [{ "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "DELETE /certificate/issued-certs/{id}": { "protocol": "http", "parameters": [{ "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "sharing_id", "in": "query", "schema": { "type": "string" }, "index$": 1 }] }, "PATCH /certificate/issued-certs/{id}": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "altnames": { "type": "array", "items": { "type": "string" }, "key$": "altnames" }, "csr": { "type": "string", "key$": "csr" }, "dcv_method": { "type": "string", "key$": "dcv_method" } } } } } }, "parameters": [{ "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "sharing_id", "in": "query", "schema": { "type": "string" }, "index$": 1 }, { "name": "Dry-Run", "in": "header", "schema": { "type": "integer" }, "index$": 2 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "issued_certificate.create.0": "GET-only live run: needs POST /certificate/issued-certs/{id}/dcv_params", "issued_certificate.update.2": "GET-only live run: needs PATCH /certificate/issued-certs/{id}", "issued_certificate.remove.4": "GET-only live run: needs DELETE /certificate/issued-certs/{id}", "issued_certificate.list.5": "GET-only live run: checks a removal this run does not make" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const issued_certificate_ref01_ent = client.IssuedCertificate();
        let issued_certificate_ref01_data = setup.data.new.issued_certificate['issued_certificate_ref01'];
        issued_certificate_ref01_data = (await issued_certificate_ref01_ent.create(issued_certificate_ref01_data)).data();
        (0, node_assert_1.default)(null != issued_certificate_ref01_data.id);
        // LIST
        const issued_certificate_ref01_match = {};
        const issued_certificate_ref01_list = (await issued_certificate_ref01_ent.list(issued_certificate_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(issued_certificate_ref01_list, { id: issued_certificate_ref01_data.id })));
        // UPDATE
        const issued_certificate_ref01_data_up0 = {};
        issued_certificate_ref01_data_up0.id = issued_certificate_ref01_data.id;
        const issued_certificate_ref01_markdef_up0 = { name: 'assumed_name', value: 'Mark01-issued_certificate_ref01_' + setup.now };
        issued_certificate_ref01_data_up0[issued_certificate_ref01_markdef_up0.name] = issued_certificate_ref01_markdef_up0.value;
        const issued_certificate_ref01_resdata_up0 = (await issued_certificate_ref01_ent.update(issued_certificate_ref01_data_up0)).data();
        (0, node_assert_1.default)(issued_certificate_ref01_resdata_up0.id === issued_certificate_ref01_data_up0.id);
        (0, node_assert_1.default)(issued_certificate_ref01_resdata_up0[issued_certificate_ref01_markdef_up0.name] === issued_certificate_ref01_markdef_up0.value);
        // LOAD
        const issued_certificate_ref01_match_dt0 = {};
        issued_certificate_ref01_match_dt0.id = issued_certificate_ref01_data.id;
        const issued_certificate_ref01_data_dt0 = (await issued_certificate_ref01_ent.load(issued_certificate_ref01_match_dt0)).data();
        (0, node_assert_1.default)(issued_certificate_ref01_data_dt0.id === issued_certificate_ref01_data.id);
        // REMOVE
        const issued_certificate_ref01_match_rm0 = { id: issued_certificate_ref01_data.id };
        await issued_certificate_ref01_ent.remove(issued_certificate_ref01_match_rm0);
        // LIST
        const issued_certificate_ref01_match_rt0 = {};
        const issued_certificate_ref01_list_rt0 = (await issued_certificate_ref01_ent.list(issued_certificate_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(issued_certificate_ref01_list_rt0, { id: issued_certificate_ref01_data.id })));
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/issued_certificate/IssuedCertificateTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.GandiSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['issued_certificate01', 'issued_certificate02', 'issued_certificate03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'GANDI_TEST_ISSUED_CERTIFICATE_ENTID': idmap,
        'GANDI_TEST_LIVE': 'FALSE',
        'GANDI_TEST_EXPLAIN': 'FALSE',
        'GANDI_APIKEY': '',
    });
    idmap = env['GANDI_TEST_ISSUED_CERTIFICATE_ENTID'];
    const live = 'TRUE' === env.GANDI_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['GANDI_TEST_ISSUED_CERTIFICATE_ENTID'];
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
//# sourceMappingURL=IssuedCertificateEntity.test.js.map