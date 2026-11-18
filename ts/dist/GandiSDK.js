"use strict";
// Gandi Ts SDK
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SDK = exports.GandiSDK = exports.GandiEntityBase = exports.BaseFeature = exports.sekreto = exports.config = exports.stdutil = void 0;
const AccessTokenEntity_1 = require("./entity/AccessTokenEntity");
const AcmeAccountEntity_1 = require("./entity/AcmeAccountEntity");
const AcmeDomainEntity_1 = require("./entity/AcmeDomainEntity");
const AcmePriceEntity_1 = require("./entity/AcmePriceEntity");
const AcmeSubscriptionEntity_1 = require("./entity/AcmeSubscriptionEntity");
const BillingInfoEntity_1 = require("./entity/BillingInfoEntity");
const BillingPriceEntity_1 = require("./entity/BillingPriceEntity");
const CertificateDcvEntity_1 = require("./entity/CertificateDcvEntity");
const CertificatePackageEntity_1 = require("./entity/CertificatePackageEntity");
const CertificatePemEntity_1 = require("./entity/CertificatePemEntity");
const CertificateRenewalEntity_1 = require("./entity/CertificateRenewalEntity");
const CertificateTagEntity_1 = require("./entity/CertificateTagEntity");
const CommentEntity_1 = require("./entity/CommentEntity");
const DomainEntity_1 = require("./entity/DomainEntity");
const DomainAvailabilityEntity_1 = require("./entity/DomainAvailabilityEntity");
const DomainChangeOwnerEntity_1 = require("./entity/DomainChangeOwnerEntity");
const DomainClaimEntity_1 = require("./entity/DomainClaimEntity");
const DomainContactEntity_1 = require("./entity/DomainContactEntity");
const DomainDnskeyEntity_1 = require("./entity/DomainDnskeyEntity");
const DomainDnssecEntity_1 = require("./entity/DomainDnssecEntity");
const DomainHostEntity_1 = require("./entity/DomainHostEntity");
const DomainLivednsEntity_1 = require("./entity/DomainLivednsEntity");
const DomainNameserverEntity_1 = require("./entity/DomainNameserverEntity");
const DomainTagEntity_1 = require("./entity/DomainTagEntity");
const DomainTransferEntity_1 = require("./entity/DomainTransferEntity");
const DomainWebredirEntity_1 = require("./entity/DomainWebredirEntity");
const EmailForwardEntity_1 = require("./entity/EmailForwardEntity");
const EmailMailboxEntity_1 = require("./entity/EmailMailboxEntity");
const EmailMigrationEntity_1 = require("./entity/EmailMigrationEntity");
const EmailOfferEntity_1 = require("./entity/EmailOfferEntity");
const EmailSlotEntity_1 = require("./entity/EmailSlotEntity");
const HostingApplicationEntity_1 = require("./entity/HostingApplicationEntity");
const HostingInstanceEntity_1 = require("./entity/HostingInstanceEntity");
const HostingVhostEntity_1 = require("./entity/HostingVhostEntity");
const IssuedCertificateEntity_1 = require("./entity/IssuedCertificateEntity");
const LinkedZoneEntity_1 = require("./entity/LinkedZoneEntity");
const LinkedZoneDeploymentEntity_1 = require("./entity/LinkedZoneDeploymentEntity");
const LinkedZoneDomainEntity_1 = require("./entity/LinkedZoneDomainEntity");
const LinkedZoneTaskEntity_1 = require("./entity/LinkedZoneTaskEntity");
const LivednsAxfrSlaveEntity_1 = require("./entity/LivednsAxfrSlaveEntity");
const LivednsAxfrTsigEntity_1 = require("./entity/LivednsAxfrTsigEntity");
const LivednsDomainEntity_1 = require("./entity/LivednsDomainEntity");
const LivednsKeyEntity_1 = require("./entity/LivednsKeyEntity");
const LivednsNameserverEntity_1 = require("./entity/LivednsNameserverEntity");
const LivednsRecordEntity_1 = require("./entity/LivednsRecordEntity");
const LivednsRrtypeEntity_1 = require("./entity/LivednsRrtypeEntity");
const LivednsSnapshotEntity_1 = require("./entity/LivednsSnapshotEntity");
const LivednsTsigKeyEntity_1 = require("./entity/LivednsTsigKeyEntity");
const LivednsZoneEntity_1 = require("./entity/LivednsZoneEntity");
const MailboxEntity_1 = require("./entity/MailboxEntity");
const MailboxDomainEntity_1 = require("./entity/MailboxDomainEntity");
const MailboxForwardEntity_1 = require("./entity/MailboxForwardEntity");
const MailboxProductEntity_1 = require("./entity/MailboxProductEntity");
const MailboxQuotaEntity_1 = require("./entity/MailboxQuotaEntity");
const MailboxSlotEntity_1 = require("./entity/MailboxSlotEntity");
const OrganizationEntity_1 = require("./entity/OrganizationEntity");
const OrganizationCustomerEntity_1 = require("./entity/OrganizationCustomerEntity");
const TemplateEntity_1 = require("./entity/TemplateEntity");
const TemplateDispatchEntity_1 = require("./entity/TemplateDispatchEntity");
const TldEntity_1 = require("./entity/TldEntity");
const UserEntity_1 = require("./entity/UserEntity");
const node_util_1 = require("node:util");
const Config_1 = require("./Config");
Object.defineProperty(exports, "config", { enumerable: true, get: function () { return Config_1.config; } });
const GandiEntityBase_1 = require("./GandiEntityBase");
Object.defineProperty(exports, "GandiEntityBase", { enumerable: true, get: function () { return GandiEntityBase_1.GandiEntityBase; } });
const Utility_1 = require("./utility/Utility");
const ResultBodyUtility_1 = require("./utility/ResultBodyUtility");
const MakeRequestUtility_1 = require("./utility/MakeRequestUtility");
const PrepareMethodUtility_1 = require("./utility/PrepareMethodUtility");
const BaseFeature_1 = require("./feature/base/BaseFeature");
Object.defineProperty(exports, "BaseFeature", { enumerable: true, get: function () { return BaseFeature_1.BaseFeature; } });
const sekreto = __importStar(require("./feature/secrets/sekreto"));
exports.sekreto = sekreto;
const stdutil = new Utility_1.Utility();
exports.stdutil = stdutil;
class GandiSDK {
    _mode = 'live';
    _options;
    _utility = new Utility_1.Utility();
    _features;
    _rootctx;
    _secrets;
    constructor(options) {
        this._rootctx = this._utility.makeContext({
            client: this,
            utility: this._utility,
            config: Config_1.config,
            options,
            shared: new WeakMap()
        });
        this._options = this._utility.makeOptions(this._rootctx);
        for (const key of ['_options', '_rootctx', '_features']) {
            Object.defineProperty(this, key, {
                value: this[key], enumerable: false, writable: true, configurable: true
            });
        }
        const struct = this._utility.struct;
        const getpath = struct.getpath;
        if (true === getpath(this._options.feature, 'test.active')) {
            this._mode = 'test';
        }
        this._rootctx.options = this._options;
        this._features = [];
        const featureAdd = this._utility.featureAdd;
        const featureInit = this._utility.featureInit;
        // Add features in the resolved order (makeOptions puts an explicit
        // array order first, else defaults to test-first). Ordering matters:
        // the `test` feature installs the base mock transport and the transport
        // features (retry/cache/netsim/proxy/ratelimit) wrap whatever is current,
        // so `test` must be added before them to sit at the base of the chain.
        const extend = this._options.extend || [];
        const featureorder = getpath(this._options, '__derived__.featureorder') || [];
        for (const fname of featureorder) {
            const fopts = this._options.feature[fname] || {};
            if (fopts.active) {
                // An active name with no generated class is legal when an
                // extend-supplied instance carries that name (station's adopt
                // path): the instance is added below, positioned by its own
                // __after__ entry, so skip it here rather than fail construction.
                if (!this._rootctx.config.hasFeature(fname) &&
                    extend.some((f) => fname === f.name)) {
                    continue;
                }
                featureAdd(this._rootctx, this._rootctx.config.makeFeature(fname));
            }
        }
        for (let f of extend) {
            featureAdd(this._rootctx, f);
        }
        for (let f of this._features) {
            featureInit(this._rootctx, f);
        }
        const featureHook = this._utility.featureHook;
        featureHook(this._rootctx, 'PostConstruct');
    }
    options() {
        return this._utility.struct.clone(this._options);
    }
    utility() {
        return this._utility.struct.clone(this._utility);
    }
    secrets() {
        return this._secrets && this._secrets.sekreto();
    }
    async prepare(fetchargs) {
        const utility = this._utility;
        const struct = utility.struct;
        const clone = struct.clone;
        const { makeContext, makeFetchDef, prepareHeaders, prepareAuth, } = utility;
        fetchargs = fetchargs || {};
        let ctx = makeContext({
            opname: 'prepare',
            ctrl: fetchargs.ctrl || {},
        }, this._rootctx);
        const options = this._options;
        const method = String(fetchargs.method || 'GET').toUpperCase();
        if (!(0, PrepareMethodUtility_1.allowed)(options.allow.method, method)) {
            return ctx.error('spec_method_allow', 'Method "' + method +
                '" not allowed by SDK option allow.method value: "' + options.allow.method + '"');
        }
        const spec = {
            base: options.base,
            prefix: options.prefix,
            suffix: options.suffix,
            path: fetchargs.path || '',
            method,
            params: fetchargs.params || {},
            query: fetchargs.query || {},
            headers: prepareHeaders(ctx),
            body: fetchargs.body,
            step: 'start',
        };
        ctx.spec = spec;
        if (fetchargs.headers) {
            const uheaders = fetchargs.headers;
            for (let key in uheaders) {
                spec.headers[key] = uheaders[key];
            }
        }
        // A raw request has no point to declare its response type, so it asks
        // for the JSON it reads: an API that negotiates on Accept otherwise
        // answers in its own default format. A caller's own accept wins.
        if (!Object.keys(spec.headers).some((key) => 'accept' === key.toLowerCase())) {
            spec.headers.accept = 'application/json';
        }
        if (null != this._secrets) {
            try {
                await this._secrets.resolve();
            }
            catch (err) {
                return err instanceof Error ? err : new Error(String(err));
            }
        }
        const authResult = prepareAuth(ctx);
        if (authResult instanceof Error) {
            return authResult;
        }
        return makeFetchDef(ctx);
    }
    // Raw endpoint access is operator-controllable, like every entity op.
    // Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
    // either one reaches the same endpoint.
    async direct(fetchargs) {
        if (!(0, PrepareMethodUtility_1.allowed)(this._options.allow.op, 'direct')) {
            return {
                ok: false,
                err: new Error('GandiSDK: direct: operation not allowed by' +
                    ' SDK option allow.op value: "' + this._options.allow.op + '"'),
            };
        }
        return this._rawRequest(fetchargs);
    }
    // Ungated request path shared by direct() and graphql(), each of which
    // checks its own allow.op token first. Private, rather than a flag on
    // fetchargs: a caller-supplied marker would let anyone opt straight back
    // out of the gate by passing it.
    async _rawRequest(fetchargs) {
        const utility = this._utility;
        const fetcher = utility.fetcher;
        const makeContext = utility.makeContext;
        const fetchdef = await this.prepare(fetchargs);
        if (fetchdef instanceof Error) {
            return { ok: false, err: utility.clean(this._rootctx, fetchdef) };
        }
        let ctx = makeContext({
            opname: 'direct',
            ctrl: (fetchargs || {}).ctrl || {},
        }, this._rootctx);
        try {
            if (true === fetchdef.signal?.aborted) {
                throw fetchdef.signal.reason;
            }
            const fetched = await fetcher(ctx, fetchdef.url, fetchdef);
            if (null == fetched) {
                return { ok: false, err: ctx.error('direct_no_response', 'response: undefined') };
            }
            else if (fetched instanceof Error) {
                return { ok: false, err: utility.clean(ctx, (0, MakeRequestUtility_1.abortError)(ctx, fetched)) };
            }
            const status = fetched.status;
            // No body responses (204 No Content, 304 Not Modified) and explicit
            // zero content-length must skip JSON parsing — fetched.json() would
            // throw `Unexpected end of JSON input` on an empty body.
            const headers = fetched.headers;
            const contentLength = headers && 'function' === typeof headers.get
                ? headers.get('content-length')
                : (headers || {})['content-length'];
            const noBody = 204 === status || 304 === status || '0' === String(contentLength);
            let json = undefined;
            let err = undefined;
            if (!noBody) {
                let text = undefined;
                try {
                    const raw = fetched;
                    if ('function' === typeof raw.text) {
                        text = await raw.text();
                        json = '' === text.trim() ? undefined : JSON.parse(text);
                    }
                    else {
                        json = 'function' === typeof fetched.json ? await fetched.json() : fetched.json;
                    }
                }
                catch (parseErr) {
                    if ('SyntaxError' !== parseErr?.name) {
                        throw parseErr;
                    }
                    err = (0, ResultBodyUtility_1.unreadableBody)(ctx, {
                        status, headers, text: text ?? parseErr.text, sent: fetchdef.headers,
                        failed: 200 <= status && status < 300 ? undefined :
                            ctx.error('request_status', 'request: ' + status + ': ' + fetched.statusText),
                    });
                }
            }
            return {
                ok: null == err && status >= 200 && status < 300,
                status,
                headers: fetched.headers,
                data: json,
                ...(null == err ? {} : { err: utility.clean(ctx, err) }),
            };
        }
        catch (err) {
            return { ok: false, err: utility.clean(ctx, (0, MakeRequestUtility_1.abortError)(ctx, err)) };
        }
    }
    async graphql(query, variables, ctrl) {
        const options = this._options;
        if (!(0, PrepareMethodUtility_1.allowed)(options.allow.op, 'graphql')) {
            return {
                ok: false,
                err: new Error('GandiSDK: graphql: operation not allowed by' +
                    ' SDK option allow.op value: "' + options.allow.op + '"'),
            };
        }
        const res = await this._rawRequest({
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: { query, variables: variables || {} },
            ctrl,
        });
        // Errors are read BEFORE any status check: a GraphQL parse or validation
        // failure comes back as HTTP 400 carrying the standard { errors: [...] }
        // body, and the raw path represents a non-2xx as { ok: false } with no
        // err — so returning early on status would discard the server's own
        // diagnostics, which are the only useful part of that response.
        const errors = null == res.data ? undefined : res.data.errors;
        if (null != errors && Array.isArray(errors) && 0 < errors.length) {
            const first = errors[0] || {};
            const err = new Error('GandiSDK: graphql: ' +
                (first.message || 'graphql error'));
            err.graphql = errors;
            return { ok: false, status: res.status, headers: res.headers, err, data: res.data };
        }
        return res;
    }
    // Entity access: `client.AccessToken().list()` / `client.AccessToken().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AccessToken(entopts) {
        const self = this;
        return new AccessTokenEntity_1.AccessTokenEntity(self, entopts);
    }
    // Entity access: `client.AcmeAccount().list()` / `client.AcmeAccount().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AcmeAccount(entopts) {
        const self = this;
        return new AcmeAccountEntity_1.AcmeAccountEntity(self, entopts);
    }
    // Entity access: `client.AcmeDomain().list()` / `client.AcmeDomain().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AcmeDomain(entopts) {
        const self = this;
        return new AcmeDomainEntity_1.AcmeDomainEntity(self, entopts);
    }
    // Entity access: `client.AcmePrice().list()` / `client.AcmePrice().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AcmePrice(entopts) {
        const self = this;
        return new AcmePriceEntity_1.AcmePriceEntity(self, entopts);
    }
    // Entity access: `client.AcmeSubscription().list()` / `client.AcmeSubscription().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AcmeSubscription(entopts) {
        const self = this;
        return new AcmeSubscriptionEntity_1.AcmeSubscriptionEntity(self, entopts);
    }
    // Entity access: `client.BillingInfo().list()` / `client.BillingInfo().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    BillingInfo(entopts) {
        const self = this;
        return new BillingInfoEntity_1.BillingInfoEntity(self, entopts);
    }
    // Entity access: `client.BillingPrice().list()` / `client.BillingPrice().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    BillingPrice(entopts) {
        const self = this;
        return new BillingPriceEntity_1.BillingPriceEntity(self, entopts);
    }
    // Entity access: `client.CertificateDcv().list()` / `client.CertificateDcv().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    CertificateDcv(entopts) {
        const self = this;
        return new CertificateDcvEntity_1.CertificateDcvEntity(self, entopts);
    }
    // Entity access: `client.CertificatePackage().list()` / `client.CertificatePackage().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    CertificatePackage(entopts) {
        const self = this;
        return new CertificatePackageEntity_1.CertificatePackageEntity(self, entopts);
    }
    // Entity access: `client.CertificatePem().list()` / `client.CertificatePem().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    CertificatePem(entopts) {
        const self = this;
        return new CertificatePemEntity_1.CertificatePemEntity(self, entopts);
    }
    // Entity access: `client.CertificateRenewal().list()` / `client.CertificateRenewal().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    CertificateRenewal(entopts) {
        const self = this;
        return new CertificateRenewalEntity_1.CertificateRenewalEntity(self, entopts);
    }
    // Entity access: `client.CertificateTag().list()` / `client.CertificateTag().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    CertificateTag(entopts) {
        const self = this;
        return new CertificateTagEntity_1.CertificateTagEntity(self, entopts);
    }
    // Entity access: `client.Comment().list()` / `client.Comment().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Comment(entopts) {
        const self = this;
        return new CommentEntity_1.CommentEntity(self, entopts);
    }
    // Entity access: `client.Domain().list()` / `client.Domain().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Domain(entopts) {
        const self = this;
        return new DomainEntity_1.DomainEntity(self, entopts);
    }
    // Entity access: `client.DomainAvailability().list()` / `client.DomainAvailability().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    DomainAvailability(entopts) {
        const self = this;
        return new DomainAvailabilityEntity_1.DomainAvailabilityEntity(self, entopts);
    }
    // Entity access: `client.DomainChangeOwner().list()` / `client.DomainChangeOwner().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    DomainChangeOwner(entopts) {
        const self = this;
        return new DomainChangeOwnerEntity_1.DomainChangeOwnerEntity(self, entopts);
    }
    // Entity access: `client.DomainClaim().list()` / `client.DomainClaim().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    DomainClaim(entopts) {
        const self = this;
        return new DomainClaimEntity_1.DomainClaimEntity(self, entopts);
    }
    // Entity access: `client.DomainContact().list()` / `client.DomainContact().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    DomainContact(entopts) {
        const self = this;
        return new DomainContactEntity_1.DomainContactEntity(self, entopts);
    }
    // Entity access: `client.DomainDnskey().list()` / `client.DomainDnskey().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    DomainDnskey(entopts) {
        const self = this;
        return new DomainDnskeyEntity_1.DomainDnskeyEntity(self, entopts);
    }
    // Entity access: `client.DomainDnssec().list()` / `client.DomainDnssec().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    DomainDnssec(entopts) {
        const self = this;
        return new DomainDnssecEntity_1.DomainDnssecEntity(self, entopts);
    }
    // Entity access: `client.DomainHost().list()` / `client.DomainHost().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    DomainHost(entopts) {
        const self = this;
        return new DomainHostEntity_1.DomainHostEntity(self, entopts);
    }
    // Entity access: `client.DomainLivedns().list()` / `client.DomainLivedns().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    DomainLivedns(entopts) {
        const self = this;
        return new DomainLivednsEntity_1.DomainLivednsEntity(self, entopts);
    }
    // Entity access: `client.DomainNameserver().list()` / `client.DomainNameserver().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    DomainNameserver(entopts) {
        const self = this;
        return new DomainNameserverEntity_1.DomainNameserverEntity(self, entopts);
    }
    // Entity access: `client.DomainTag().list()` / `client.DomainTag().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    DomainTag(entopts) {
        const self = this;
        return new DomainTagEntity_1.DomainTagEntity(self, entopts);
    }
    // Entity access: `client.DomainTransfer().list()` / `client.DomainTransfer().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    DomainTransfer(entopts) {
        const self = this;
        return new DomainTransferEntity_1.DomainTransferEntity(self, entopts);
    }
    // Entity access: `client.DomainWebredir().list()` / `client.DomainWebredir().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    DomainWebredir(entopts) {
        const self = this;
        return new DomainWebredirEntity_1.DomainWebredirEntity(self, entopts);
    }
    // Entity access: `client.EmailForward().list()` / `client.EmailForward().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    EmailForward(entopts) {
        const self = this;
        return new EmailForwardEntity_1.EmailForwardEntity(self, entopts);
    }
    // Entity access: `client.EmailMailbox().list()` / `client.EmailMailbox().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    EmailMailbox(entopts) {
        const self = this;
        return new EmailMailboxEntity_1.EmailMailboxEntity(self, entopts);
    }
    // Entity access: `client.EmailMigration().list()` / `client.EmailMigration().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    EmailMigration(entopts) {
        const self = this;
        return new EmailMigrationEntity_1.EmailMigrationEntity(self, entopts);
    }
    // Entity access: `client.EmailOffer().list()` / `client.EmailOffer().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    EmailOffer(entopts) {
        const self = this;
        return new EmailOfferEntity_1.EmailOfferEntity(self, entopts);
    }
    // Entity access: `client.EmailSlot().list()` / `client.EmailSlot().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    EmailSlot(entopts) {
        const self = this;
        return new EmailSlotEntity_1.EmailSlotEntity(self, entopts);
    }
    // Entity access: `client.HostingApplication().list()` / `client.HostingApplication().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    HostingApplication(entopts) {
        const self = this;
        return new HostingApplicationEntity_1.HostingApplicationEntity(self, entopts);
    }
    // Entity access: `client.HostingInstance().list()` / `client.HostingInstance().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    HostingInstance(entopts) {
        const self = this;
        return new HostingInstanceEntity_1.HostingInstanceEntity(self, entopts);
    }
    // Entity access: `client.HostingVhost().list()` / `client.HostingVhost().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    HostingVhost(entopts) {
        const self = this;
        return new HostingVhostEntity_1.HostingVhostEntity(self, entopts);
    }
    // Entity access: `client.IssuedCertificate().list()` / `client.IssuedCertificate().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    IssuedCertificate(entopts) {
        const self = this;
        return new IssuedCertificateEntity_1.IssuedCertificateEntity(self, entopts);
    }
    // Entity access: `client.LinkedZone().list()` / `client.LinkedZone().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    LinkedZone(entopts) {
        const self = this;
        return new LinkedZoneEntity_1.LinkedZoneEntity(self, entopts);
    }
    // Entity access: `client.LinkedZoneDeployment().list()` / `client.LinkedZoneDeployment().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    LinkedZoneDeployment(entopts) {
        const self = this;
        return new LinkedZoneDeploymentEntity_1.LinkedZoneDeploymentEntity(self, entopts);
    }
    // Entity access: `client.LinkedZoneDomain().list()` / `client.LinkedZoneDomain().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    LinkedZoneDomain(entopts) {
        const self = this;
        return new LinkedZoneDomainEntity_1.LinkedZoneDomainEntity(self, entopts);
    }
    // Entity access: `client.LinkedZoneTask().list()` / `client.LinkedZoneTask().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    LinkedZoneTask(entopts) {
        const self = this;
        return new LinkedZoneTaskEntity_1.LinkedZoneTaskEntity(self, entopts);
    }
    // Entity access: `client.LivednsAxfrSlave().list()` / `client.LivednsAxfrSlave().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    LivednsAxfrSlave(entopts) {
        const self = this;
        return new LivednsAxfrSlaveEntity_1.LivednsAxfrSlaveEntity(self, entopts);
    }
    // Entity access: `client.LivednsAxfrTsig().list()` / `client.LivednsAxfrTsig().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    LivednsAxfrTsig(entopts) {
        const self = this;
        return new LivednsAxfrTsigEntity_1.LivednsAxfrTsigEntity(self, entopts);
    }
    // Entity access: `client.LivednsDomain().list()` / `client.LivednsDomain().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    LivednsDomain(entopts) {
        const self = this;
        return new LivednsDomainEntity_1.LivednsDomainEntity(self, entopts);
    }
    // Entity access: `client.LivednsKey().list()` / `client.LivednsKey().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    LivednsKey(entopts) {
        const self = this;
        return new LivednsKeyEntity_1.LivednsKeyEntity(self, entopts);
    }
    // Entity access: `client.LivednsNameserver().list()` / `client.LivednsNameserver().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    LivednsNameserver(entopts) {
        const self = this;
        return new LivednsNameserverEntity_1.LivednsNameserverEntity(self, entopts);
    }
    // Entity access: `client.LivednsRecord().list()` / `client.LivednsRecord().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    LivednsRecord(entopts) {
        const self = this;
        return new LivednsRecordEntity_1.LivednsRecordEntity(self, entopts);
    }
    // Entity access: `client.LivednsRrtype().list()` / `client.LivednsRrtype().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    LivednsRrtype(entopts) {
        const self = this;
        return new LivednsRrtypeEntity_1.LivednsRrtypeEntity(self, entopts);
    }
    // Entity access: `client.LivednsSnapshot().list()` / `client.LivednsSnapshot().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    LivednsSnapshot(entopts) {
        const self = this;
        return new LivednsSnapshotEntity_1.LivednsSnapshotEntity(self, entopts);
    }
    // Entity access: `client.LivednsTsigKey().list()` / `client.LivednsTsigKey().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    LivednsTsigKey(entopts) {
        const self = this;
        return new LivednsTsigKeyEntity_1.LivednsTsigKeyEntity(self, entopts);
    }
    // Entity access: `client.LivednsZone().list()` / `client.LivednsZone().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    LivednsZone(entopts) {
        const self = this;
        return new LivednsZoneEntity_1.LivednsZoneEntity(self, entopts);
    }
    // Entity access: `client.Mailbox().list()` / `client.Mailbox().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Mailbox(entopts) {
        const self = this;
        return new MailboxEntity_1.MailboxEntity(self, entopts);
    }
    // Entity access: `client.MailboxDomain().list()` / `client.MailboxDomain().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    MailboxDomain(entopts) {
        const self = this;
        return new MailboxDomainEntity_1.MailboxDomainEntity(self, entopts);
    }
    // Entity access: `client.MailboxForward().list()` / `client.MailboxForward().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    MailboxForward(entopts) {
        const self = this;
        return new MailboxForwardEntity_1.MailboxForwardEntity(self, entopts);
    }
    // Entity access: `client.MailboxProduct().list()` / `client.MailboxProduct().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    MailboxProduct(entopts) {
        const self = this;
        return new MailboxProductEntity_1.MailboxProductEntity(self, entopts);
    }
    // Entity access: `client.MailboxQuota().list()` / `client.MailboxQuota().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    MailboxQuota(entopts) {
        const self = this;
        return new MailboxQuotaEntity_1.MailboxQuotaEntity(self, entopts);
    }
    // Entity access: `client.MailboxSlot().list()` / `client.MailboxSlot().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    MailboxSlot(entopts) {
        const self = this;
        return new MailboxSlotEntity_1.MailboxSlotEntity(self, entopts);
    }
    // Entity access: `client.Organization().list()` / `client.Organization().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Organization(entopts) {
        const self = this;
        return new OrganizationEntity_1.OrganizationEntity(self, entopts);
    }
    // Entity access: `client.OrganizationCustomer().list()` / `client.OrganizationCustomer().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    OrganizationCustomer(entopts) {
        const self = this;
        return new OrganizationCustomerEntity_1.OrganizationCustomerEntity(self, entopts);
    }
    // Entity access: `client.Template().list()` / `client.Template().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Template(entopts) {
        const self = this;
        return new TemplateEntity_1.TemplateEntity(self, entopts);
    }
    // Entity access: `client.TemplateDispatch().list()` / `client.TemplateDispatch().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    TemplateDispatch(entopts) {
        const self = this;
        return new TemplateDispatchEntity_1.TemplateDispatchEntity(self, entopts);
    }
    // Entity access: `client.Tld().list()` / `client.Tld().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Tld(entopts) {
        const self = this;
        return new TldEntity_1.TldEntity(self, entopts);
    }
    // Entity access: `client.User().list()` / `client.User().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    User(entopts) {
        const self = this;
        return new UserEntity_1.UserEntity(self, entopts);
    }
    static test(testoptsarg, sdkoptsarg) {
        const struct = stdutil.struct;
        const setpath = struct.setpath;
        const getdef = struct.getdef;
        const clone = struct.clone;
        const setprop = struct.setprop;
        const sdkopts = getdef(clone(sdkoptsarg), {});
        const testopts = getdef(clone(testoptsarg), {});
        setprop(testopts, 'active', true);
        setpath(sdkopts, 'feature.test', testopts);
        const testsdk = new GandiSDK(sdkopts);
        testsdk._mode = 'test';
        return testsdk;
    }
    tester(testopts, sdkopts) {
        return GandiSDK.test(testopts, sdkopts);
    }
    toJSON() {
        return { name: 'Gandi' };
    }
    toString() {
        return 'Gandi ' + this._utility.struct.jsonify(this.toJSON());
    }
    [node_util_1.inspect.custom]() {
        return this.toString();
    }
}
exports.GandiSDK = GandiSDK;
const SDK = GandiSDK;
exports.SDK = SDK;
//# sourceMappingURL=GandiSDK.js.map