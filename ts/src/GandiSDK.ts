// Gandi Ts SDK

import { AccessTokenEntity } from './entity/AccessTokenEntity'
import { AcmeAccountEntity } from './entity/AcmeAccountEntity'
import { AcmeDomainEntity } from './entity/AcmeDomainEntity'
import { AcmePriceEntity } from './entity/AcmePriceEntity'
import { AcmeSubscriptionEntity } from './entity/AcmeSubscriptionEntity'
import { BillingInfoEntity } from './entity/BillingInfoEntity'
import { BillingPriceEntity } from './entity/BillingPriceEntity'
import { CertificateDcvEntity } from './entity/CertificateDcvEntity'
import { CertificatePackageEntity } from './entity/CertificatePackageEntity'
import { CertificatePemEntity } from './entity/CertificatePemEntity'
import { CertificateRenewalEntity } from './entity/CertificateRenewalEntity'
import { CertificateTagEntity } from './entity/CertificateTagEntity'
import { CommentEntity } from './entity/CommentEntity'
import { DomainEntity } from './entity/DomainEntity'
import { DomainAvailabilityEntity } from './entity/DomainAvailabilityEntity'
import { DomainChangeOwnerEntity } from './entity/DomainChangeOwnerEntity'
import { DomainClaimEntity } from './entity/DomainClaimEntity'
import { DomainContactEntity } from './entity/DomainContactEntity'
import { DomainDnskeyEntity } from './entity/DomainDnskeyEntity'
import { DomainDnssecEntity } from './entity/DomainDnssecEntity'
import { DomainHostEntity } from './entity/DomainHostEntity'
import { DomainLivednsEntity } from './entity/DomainLivednsEntity'
import { DomainNameserverEntity } from './entity/DomainNameserverEntity'
import { DomainTagEntity } from './entity/DomainTagEntity'
import { DomainTransferEntity } from './entity/DomainTransferEntity'
import { DomainWebredirEntity } from './entity/DomainWebredirEntity'
import { EmailForwardEntity } from './entity/EmailForwardEntity'
import { EmailMailboxEntity } from './entity/EmailMailboxEntity'
import { EmailMigrationEntity } from './entity/EmailMigrationEntity'
import { EmailOfferEntity } from './entity/EmailOfferEntity'
import { EmailSlotEntity } from './entity/EmailSlotEntity'
import { HostingApplicationEntity } from './entity/HostingApplicationEntity'
import { HostingInstanceEntity } from './entity/HostingInstanceEntity'
import { HostingVhostEntity } from './entity/HostingVhostEntity'
import { IssuedCertificateEntity } from './entity/IssuedCertificateEntity'
import { LinkedZoneEntity } from './entity/LinkedZoneEntity'
import { LinkedZoneDeploymentEntity } from './entity/LinkedZoneDeploymentEntity'
import { LinkedZoneDomainEntity } from './entity/LinkedZoneDomainEntity'
import { LinkedZoneTaskEntity } from './entity/LinkedZoneTaskEntity'
import { LivednsAxfrSlaveEntity } from './entity/LivednsAxfrSlaveEntity'
import { LivednsAxfrTsigEntity } from './entity/LivednsAxfrTsigEntity'
import { LivednsDomainEntity } from './entity/LivednsDomainEntity'
import { LivednsKeyEntity } from './entity/LivednsKeyEntity'
import { LivednsNameserverEntity } from './entity/LivednsNameserverEntity'
import { LivednsRecordEntity } from './entity/LivednsRecordEntity'
import { LivednsRrtypeEntity } from './entity/LivednsRrtypeEntity'
import { LivednsSnapshotEntity } from './entity/LivednsSnapshotEntity'
import { LivednsTsigKeyEntity } from './entity/LivednsTsigKeyEntity'
import { MailboxEntity } from './entity/MailboxEntity'
import { MailboxDomainEntity } from './entity/MailboxDomainEntity'
import { MailboxForwardEntity } from './entity/MailboxForwardEntity'
import { MailboxProductEntity } from './entity/MailboxProductEntity'
import { MailboxQuotaEntity } from './entity/MailboxQuotaEntity'
import { MailboxSlotEntity } from './entity/MailboxSlotEntity'
import { OrganizationEntity } from './entity/OrganizationEntity'
import { OrganizationCustomerEntity } from './entity/OrganizationCustomerEntity'
import { TemplateEntity } from './entity/TemplateEntity'
import { TemplateDispatchEntity } from './entity/TemplateDispatchEntity'
import { TldEntity } from './entity/TldEntity'
import { UserEntity } from './entity/UserEntity'

export type * from './GandiTypes'


import { inspect } from 'node:util'

import type { Context, Feature } from './types'

import { config } from './Config'
import { GandiEntityBase } from './GandiEntityBase'
import { Utility } from './utility/Utility'
import { unreadableBody } from './utility/ResultBodyUtility'
import { abortError } from './utility/MakeRequestUtility'
import { allowed } from './utility/PrepareMethodUtility'


import { BaseFeature } from './feature/base/BaseFeature'
import * as sekreto from './feature/secrets/sekreto'



const stdutil = new Utility()


// A request's outcome: ok is false alone on an error with no response, so a
// caller narrowing on it reaches the status and the data.
type DirectResult =
  | { ok: false, err: any, status?: undefined, headers?: undefined, data?: undefined }
  | { ok: boolean, status: number, headers: any, data: any, err?: any }


class GandiSDK {
  _mode: string = 'live'
  _options: any
  _utility = new Utility()
  _features: Feature[]
  _rootctx: Context
  _secrets?: any


  constructor(options?: any) {

    this._rootctx = this._utility.makeContext({
      client: this,
      utility: this._utility,
      config,
      options,
      shared: new WeakMap()
    })

    this._options = this._utility.makeOptions(this._rootctx)

    for (const key of ['_options', '_rootctx', '_features']) {
      Object.defineProperty(this, key, {
        value: (this as any)[key], enumerable: false, writable: true, configurable: true
      })
    }

    const struct = this._utility.struct
    const getpath = struct.getpath

    if (true === getpath(this._options.feature, 'test.active')) {
      this._mode = 'test'
    }

    this._rootctx.options = this._options

    this._features = []

    const featureAdd = this._utility.featureAdd
    const featureInit = this._utility.featureInit

    // Add features in the resolved order (makeOptions puts an explicit
    // array order first, else defaults to test-first). Ordering matters:
    // the `test` feature installs the base mock transport and the transport
    // features (retry/cache/netsim/proxy/ratelimit) wrap whatever is current,
    // so `test` must be added before them to sit at the base of the chain.
    const extend = this._options.extend || []

    const featureorder = getpath(this._options, '__derived__.featureorder') || []
    for (const fname of featureorder) {
      const fopts = this._options.feature[fname] || {}
      if (fopts.active) {
        // An active name with no generated class is legal when an
        // extend-supplied instance carries that name (station's adopt
        // path): the instance is added below, positioned by its own
        // __after__ entry, so skip it here rather than fail construction.
        if (!this._rootctx.config.hasFeature(fname) &&
          extend.some((f: any) => fname === f.name)) {
          continue
        }
        featureAdd(this._rootctx, this._rootctx.config.makeFeature(fname))
      }
    }

    for (let f of extend) {
      featureAdd(this._rootctx, f)
    }

    for (let f of this._features) {
      featureInit(this._rootctx, f)
    }

    const featureHook = this._utility.featureHook
    featureHook(this._rootctx, 'PostConstruct')
  }


  options() {
    return this._utility.struct.clone(this._options)
  }


  utility() {
    return this._utility.struct.clone(this._utility)
  }

  
secrets() {
  return this._secrets && this._secrets.sekreto()
}



  async prepare(fetchargs?: any) {
    const utility = this._utility
    const struct = utility.struct
    const clone = struct.clone

    const {
      makeContext,
      makeFetchDef,
      prepareHeaders,
      prepareAuth,
    } = utility

    fetchargs = fetchargs || {}

    let ctx: Context = makeContext({
      opname: 'prepare',
      ctrl: fetchargs.ctrl || {},
    }, this._rootctx)

    const options = this._options
    const method = String(fetchargs.method || 'GET').toUpperCase()

    if (!allowed(options.allow.method, method)) {
      return ctx.error('spec_method_allow', 'Method "' + method +
        '" not allowed by SDK option allow.method value: "' + options.allow.method + '"')
    }

    const spec: any = {
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
    }

    ctx.spec = spec

    if (fetchargs.headers) {
      const uheaders = fetchargs.headers
      for (let key in uheaders) {
        spec.headers[key] = uheaders[key]
      }
    }

    // A raw request has no point to declare its response type, so it asks
    // for the JSON it reads: an API that negotiates on Accept otherwise
    // answers in its own default format. A caller's own accept wins.
    if (!Object.keys(spec.headers).some((key) => 'accept' === key.toLowerCase())) {
      spec.headers.accept = 'application/json'
    }

    
if (null != this._secrets) {
  try {
    await this._secrets.resolve()
  }
  catch (err: any) {
    return err instanceof Error ? err : new Error(String(err))
  }
}


    const authResult = prepareAuth(ctx)
    if (authResult instanceof Error) {
      return authResult
    }

    return makeFetchDef(ctx)
  }


  // Raw endpoint access is operator-controllable, like every entity op.
  // Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
  // either one reaches the same endpoint.
  async direct(fetchargs?: any): Promise<DirectResult> {
    if (!allowed(this._options.allow.op, 'direct')) {
      return {
        ok: false,
        err: new Error('GandiSDK: direct: operation not allowed by' +
          ' SDK option allow.op value: "' + this._options.allow.op + '"'),
      }
    }

    return this._rawRequest(fetchargs)
  }


  // Ungated request path shared by direct() and graphql(), each of which
  // checks its own allow.op token first. Private, rather than a flag on
  // fetchargs: a caller-supplied marker would let anyone opt straight back
  // out of the gate by passing it.
  async _rawRequest(fetchargs?: any): Promise<DirectResult> {
    const utility = this._utility

    const fetcher = utility.fetcher
    const makeContext = utility.makeContext

    const fetchdef = await this.prepare(fetchargs)
    if (fetchdef instanceof Error) {
      return { ok: false, err: utility.clean(this._rootctx, fetchdef) }
    }

    let ctx: Context = makeContext({
      opname: 'direct',
      ctrl: (fetchargs || {}).ctrl || {},
    }, this._rootctx)

    try {
      if (true === fetchdef.signal?.aborted) {
        throw fetchdef.signal.reason
      }

      const fetched = await fetcher(ctx, fetchdef.url, fetchdef)

      if (null == fetched) {
        return { ok: false, err: ctx.error('direct_no_response', 'response: undefined') }
      }
      else if (fetched instanceof Error) {
        return { ok: false, err: utility.clean(ctx, abortError(ctx, fetched)) }
      }

      const status = fetched.status

      // No body responses (204 No Content, 304 Not Modified) and explicit
      // zero content-length must skip JSON parsing — fetched.json() would
      // throw `Unexpected end of JSON input` on an empty body.
      const headers = fetched.headers
      const contentLength = headers && 'function' === typeof headers.get
        ? headers.get('content-length')
        : (headers || {})['content-length']
      const noBody = 204 === status || 304 === status || '0' === String(contentLength)

      let json: any = undefined
      let err: any = undefined
      if (!noBody) {
        let text: any = undefined
        try {
          const raw: any = fetched
          if ('function' === typeof raw.text) {
            text = await raw.text()
            json = '' === text.trim() ? undefined : JSON.parse(text)
          }
          else {
            json = 'function' === typeof fetched.json ? await fetched.json() : fetched.json
          }
        }
        catch (parseErr: any) {
          if ('SyntaxError' !== parseErr?.name) {
            throw parseErr
          }
          err = unreadableBody(ctx, {
            status, headers, text: text ?? parseErr.text, sent: fetchdef.headers,
            failed: 200 <= status && status < 300 ? undefined :
              ctx.error('request_status', 'request: ' + status + ': ' + fetched.statusText),
          })
        }
      }

      return {
        ok: null == err && status >= 200 && status < 300,
        status,
        headers: fetched.headers,
        data: json,
        ...(null == err ? {} : { err: utility.clean(ctx, err) }),
      }
    }
    catch (err: any) {
      return { ok: false, err: utility.clean(ctx, abortError(ctx, err)) }
    }
  }



  async graphql(query: string, variables?: any, ctrl?: any) {
    const options = this._options

    if (!allowed(options.allow.op, 'graphql')) {
      return {
        ok: false,
        err: new Error('GandiSDK: graphql: operation not allowed by' +
          ' SDK option allow.op value: "' + options.allow.op + '"'),
      }
    }

    const res: any = await this._rawRequest({
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: { query, variables: variables || {} },
      ctrl,
    })

    // Errors are read BEFORE any status check: a GraphQL parse or validation
    // failure comes back as HTTP 400 carrying the standard { errors: [...] }
    // body, and the raw path represents a non-2xx as { ok: false } with no
    // err — so returning early on status would discard the server's own
    // diagnostics, which are the only useful part of that response.
    const errors = null == res.data ? undefined : res.data.errors

    if (null != errors && Array.isArray(errors) && 0 < errors.length) {
      const first = errors[0] || {}
      const err: any = new Error('GandiSDK: graphql: ' +
        (first.message || 'graphql error'))
      err.graphql = errors
      return { ok: false, status: res.status, headers: res.headers, err, data: res.data }
    }

    return res
  }



  // Entity access: `client.AccessToken().list()` / `client.AccessToken().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AccessToken(entopts?: Record<string, any>) {
    const self = this
    return new AccessTokenEntity(self, entopts)
  }


  // Entity access: `client.AcmeAccount().list()` / `client.AcmeAccount().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AcmeAccount(entopts?: Record<string, any>) {
    const self = this
    return new AcmeAccountEntity(self, entopts)
  }


  // Entity access: `client.AcmeDomain().list()` / `client.AcmeDomain().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AcmeDomain(entopts?: Record<string, any>) {
    const self = this
    return new AcmeDomainEntity(self, entopts)
  }


  // Entity access: `client.AcmePrice().list()` / `client.AcmePrice().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AcmePrice(entopts?: Record<string, any>) {
    const self = this
    return new AcmePriceEntity(self, entopts)
  }


  // Entity access: `client.AcmeSubscription().list()` / `client.AcmeSubscription().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AcmeSubscription(entopts?: Record<string, any>) {
    const self = this
    return new AcmeSubscriptionEntity(self, entopts)
  }


  // Entity access: `client.BillingInfo().list()` / `client.BillingInfo().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  BillingInfo(entopts?: Record<string, any>) {
    const self = this
    return new BillingInfoEntity(self, entopts)
  }


  // Entity access: `client.BillingPrice().list()` / `client.BillingPrice().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  BillingPrice(entopts?: Record<string, any>) {
    const self = this
    return new BillingPriceEntity(self, entopts)
  }


  // Entity access: `client.CertificateDcv().list()` / `client.CertificateDcv().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  CertificateDcv(entopts?: Record<string, any>) {
    const self = this
    return new CertificateDcvEntity(self, entopts)
  }


  // Entity access: `client.CertificatePackage().list()` / `client.CertificatePackage().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  CertificatePackage(entopts?: Record<string, any>) {
    const self = this
    return new CertificatePackageEntity(self, entopts)
  }


  // Entity access: `client.CertificatePem().list()` / `client.CertificatePem().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  CertificatePem(entopts?: Record<string, any>) {
    const self = this
    return new CertificatePemEntity(self, entopts)
  }


  // Entity access: `client.CertificateRenewal().list()` / `client.CertificateRenewal().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  CertificateRenewal(entopts?: Record<string, any>) {
    const self = this
    return new CertificateRenewalEntity(self, entopts)
  }


  // Entity access: `client.CertificateTag().list()` / `client.CertificateTag().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  CertificateTag(entopts?: Record<string, any>) {
    const self = this
    return new CertificateTagEntity(self, entopts)
  }


  // Entity access: `client.Comment().list()` / `client.Comment().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Comment(entopts?: Record<string, any>) {
    const self = this
    return new CommentEntity(self, entopts)
  }


  // Entity access: `client.Domain().list()` / `client.Domain().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Domain(entopts?: Record<string, any>) {
    const self = this
    return new DomainEntity(self, entopts)
  }


  // Entity access: `client.DomainAvailability().list()` / `client.DomainAvailability().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  DomainAvailability(entopts?: Record<string, any>) {
    const self = this
    return new DomainAvailabilityEntity(self, entopts)
  }


  // Entity access: `client.DomainChangeOwner().list()` / `client.DomainChangeOwner().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  DomainChangeOwner(entopts?: Record<string, any>) {
    const self = this
    return new DomainChangeOwnerEntity(self, entopts)
  }


  // Entity access: `client.DomainClaim().list()` / `client.DomainClaim().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  DomainClaim(entopts?: Record<string, any>) {
    const self = this
    return new DomainClaimEntity(self, entopts)
  }


  // Entity access: `client.DomainContact().list()` / `client.DomainContact().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  DomainContact(entopts?: Record<string, any>) {
    const self = this
    return new DomainContactEntity(self, entopts)
  }


  // Entity access: `client.DomainDnskey().list()` / `client.DomainDnskey().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  DomainDnskey(entopts?: Record<string, any>) {
    const self = this
    return new DomainDnskeyEntity(self, entopts)
  }


  // Entity access: `client.DomainDnssec().list()` / `client.DomainDnssec().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  DomainDnssec(entopts?: Record<string, any>) {
    const self = this
    return new DomainDnssecEntity(self, entopts)
  }


  // Entity access: `client.DomainHost().list()` / `client.DomainHost().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  DomainHost(entopts?: Record<string, any>) {
    const self = this
    return new DomainHostEntity(self, entopts)
  }


  // Entity access: `client.DomainLivedns().list()` / `client.DomainLivedns().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  DomainLivedns(entopts?: Record<string, any>) {
    const self = this
    return new DomainLivednsEntity(self, entopts)
  }


  // Entity access: `client.DomainNameserver().list()` / `client.DomainNameserver().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  DomainNameserver(entopts?: Record<string, any>) {
    const self = this
    return new DomainNameserverEntity(self, entopts)
  }


  // Entity access: `client.DomainTag().list()` / `client.DomainTag().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  DomainTag(entopts?: Record<string, any>) {
    const self = this
    return new DomainTagEntity(self, entopts)
  }


  // Entity access: `client.DomainTransfer().list()` / `client.DomainTransfer().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  DomainTransfer(entopts?: Record<string, any>) {
    const self = this
    return new DomainTransferEntity(self, entopts)
  }


  // Entity access: `client.DomainWebredir().list()` / `client.DomainWebredir().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  DomainWebredir(entopts?: Record<string, any>) {
    const self = this
    return new DomainWebredirEntity(self, entopts)
  }


  // Entity access: `client.EmailForward().list()` / `client.EmailForward().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  EmailForward(entopts?: Record<string, any>) {
    const self = this
    return new EmailForwardEntity(self, entopts)
  }


  // Entity access: `client.EmailMailbox().list()` / `client.EmailMailbox().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  EmailMailbox(entopts?: Record<string, any>) {
    const self = this
    return new EmailMailboxEntity(self, entopts)
  }


  // Entity access: `client.EmailMigration().list()` / `client.EmailMigration().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  EmailMigration(entopts?: Record<string, any>) {
    const self = this
    return new EmailMigrationEntity(self, entopts)
  }


  // Entity access: `client.EmailOffer().list()` / `client.EmailOffer().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  EmailOffer(entopts?: Record<string, any>) {
    const self = this
    return new EmailOfferEntity(self, entopts)
  }


  // Entity access: `client.EmailSlot().list()` / `client.EmailSlot().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  EmailSlot(entopts?: Record<string, any>) {
    const self = this
    return new EmailSlotEntity(self, entopts)
  }


  // Entity access: `client.HostingApplication().list()` / `client.HostingApplication().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  HostingApplication(entopts?: Record<string, any>) {
    const self = this
    return new HostingApplicationEntity(self, entopts)
  }


  // Entity access: `client.HostingInstance().list()` / `client.HostingInstance().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  HostingInstance(entopts?: Record<string, any>) {
    const self = this
    return new HostingInstanceEntity(self, entopts)
  }


  // Entity access: `client.HostingVhost().list()` / `client.HostingVhost().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  HostingVhost(entopts?: Record<string, any>) {
    const self = this
    return new HostingVhostEntity(self, entopts)
  }


  // Entity access: `client.IssuedCertificate().list()` / `client.IssuedCertificate().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  IssuedCertificate(entopts?: Record<string, any>) {
    const self = this
    return new IssuedCertificateEntity(self, entopts)
  }


  // Entity access: `client.LinkedZone().list()` / `client.LinkedZone().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  LinkedZone(entopts?: Record<string, any>) {
    const self = this
    return new LinkedZoneEntity(self, entopts)
  }


  // Entity access: `client.LinkedZoneDeployment().list()` / `client.LinkedZoneDeployment().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  LinkedZoneDeployment(entopts?: Record<string, any>) {
    const self = this
    return new LinkedZoneDeploymentEntity(self, entopts)
  }


  // Entity access: `client.LinkedZoneDomain().list()` / `client.LinkedZoneDomain().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  LinkedZoneDomain(entopts?: Record<string, any>) {
    const self = this
    return new LinkedZoneDomainEntity(self, entopts)
  }


  // Entity access: `client.LinkedZoneTask().list()` / `client.LinkedZoneTask().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  LinkedZoneTask(entopts?: Record<string, any>) {
    const self = this
    return new LinkedZoneTaskEntity(self, entopts)
  }


  // Entity access: `client.LivednsAxfrSlave().list()` / `client.LivednsAxfrSlave().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  LivednsAxfrSlave(entopts?: Record<string, any>) {
    const self = this
    return new LivednsAxfrSlaveEntity(self, entopts)
  }


  // Entity access: `client.LivednsAxfrTsig().list()` / `client.LivednsAxfrTsig().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  LivednsAxfrTsig(entopts?: Record<string, any>) {
    const self = this
    return new LivednsAxfrTsigEntity(self, entopts)
  }


  // Entity access: `client.LivednsDomain().list()` / `client.LivednsDomain().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  LivednsDomain(entopts?: Record<string, any>) {
    const self = this
    return new LivednsDomainEntity(self, entopts)
  }


  // Entity access: `client.LivednsKey().list()` / `client.LivednsKey().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  LivednsKey(entopts?: Record<string, any>) {
    const self = this
    return new LivednsKeyEntity(self, entopts)
  }


  // Entity access: `client.LivednsNameserver().list()` / `client.LivednsNameserver().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  LivednsNameserver(entopts?: Record<string, any>) {
    const self = this
    return new LivednsNameserverEntity(self, entopts)
  }


  // Entity access: `client.LivednsRecord().list()` / `client.LivednsRecord().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  LivednsRecord(entopts?: Record<string, any>) {
    const self = this
    return new LivednsRecordEntity(self, entopts)
  }


  // Entity access: `client.LivednsRrtype().list()` / `client.LivednsRrtype().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  LivednsRrtype(entopts?: Record<string, any>) {
    const self = this
    return new LivednsRrtypeEntity(self, entopts)
  }


  // Entity access: `client.LivednsSnapshot().list()` / `client.LivednsSnapshot().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  LivednsSnapshot(entopts?: Record<string, any>) {
    const self = this
    return new LivednsSnapshotEntity(self, entopts)
  }


  // Entity access: `client.LivednsTsigKey().list()` / `client.LivednsTsigKey().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  LivednsTsigKey(entopts?: Record<string, any>) {
    const self = this
    return new LivednsTsigKeyEntity(self, entopts)
  }


  // Entity access: `client.Mailbox().list()` / `client.Mailbox().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Mailbox(entopts?: Record<string, any>) {
    const self = this
    return new MailboxEntity(self, entopts)
  }


  // Entity access: `client.MailboxDomain().list()` / `client.MailboxDomain().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  MailboxDomain(entopts?: Record<string, any>) {
    const self = this
    return new MailboxDomainEntity(self, entopts)
  }


  // Entity access: `client.MailboxForward().list()` / `client.MailboxForward().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  MailboxForward(entopts?: Record<string, any>) {
    const self = this
    return new MailboxForwardEntity(self, entopts)
  }


  // Entity access: `client.MailboxProduct().list()` / `client.MailboxProduct().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  MailboxProduct(entopts?: Record<string, any>) {
    const self = this
    return new MailboxProductEntity(self, entopts)
  }


  // Entity access: `client.MailboxQuota().list()` / `client.MailboxQuota().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  MailboxQuota(entopts?: Record<string, any>) {
    const self = this
    return new MailboxQuotaEntity(self, entopts)
  }


  // Entity access: `client.MailboxSlot().list()` / `client.MailboxSlot().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  MailboxSlot(entopts?: Record<string, any>) {
    const self = this
    return new MailboxSlotEntity(self, entopts)
  }


  // Entity access: `client.Organization().list()` / `client.Organization().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Organization(entopts?: Record<string, any>) {
    const self = this
    return new OrganizationEntity(self, entopts)
  }


  // Entity access: `client.OrganizationCustomer().list()` / `client.OrganizationCustomer().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  OrganizationCustomer(entopts?: Record<string, any>) {
    const self = this
    return new OrganizationCustomerEntity(self, entopts)
  }


  // Entity access: `client.Template().list()` / `client.Template().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Template(entopts?: Record<string, any>) {
    const self = this
    return new TemplateEntity(self, entopts)
  }


  // Entity access: `client.TemplateDispatch().list()` / `client.TemplateDispatch().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  TemplateDispatch(entopts?: Record<string, any>) {
    const self = this
    return new TemplateDispatchEntity(self, entopts)
  }


  // Entity access: `client.Tld().list()` / `client.Tld().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Tld(entopts?: Record<string, any>) {
    const self = this
    return new TldEntity(self, entopts)
  }


  // Entity access: `client.User().list()` / `client.User().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  User(entopts?: Record<string, any>) {
    const self = this
    return new UserEntity(self, entopts)
  }




  static test(testoptsarg?: any, sdkoptsarg?: any) {
    const struct = stdutil.struct
    const setpath = struct.setpath
    const getdef = struct.getdef
    const clone = struct.clone
    const setprop = struct.setprop

    const sdkopts = getdef(clone(sdkoptsarg), {})
    const testopts = getdef(clone(testoptsarg), {})
    setprop(testopts, 'active', true)
    setpath(sdkopts, 'feature.test', testopts)

    const testsdk = new GandiSDK(sdkopts)
    testsdk._mode = 'test'

    return testsdk
  }


  tester(testopts?: any, sdkopts?: any) {
    return GandiSDK.test(testopts, sdkopts)
  }


  toJSON() {
    return { name: 'Gandi' }
  }

  toString() {
    return 'Gandi ' + this._utility.struct.jsonify(this.toJSON())
  }

  [inspect.custom]() {
    return this.toString()
  }

}




const SDK = GandiSDK


export {
  stdutil,
  config,
  sekreto,


  BaseFeature,
  GandiEntityBase,

  GandiSDK,
  SDK,
}


export type { DirectResult }
