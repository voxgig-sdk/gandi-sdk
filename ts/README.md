# Gandi TypeScript SDK

Gandi API client, generated from an OpenAPI definition constructed from Gandi's API documentation.

The TypeScript SDK for the Gandi API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.AccessToken()` — each with a small set of operations (`list`, `load`, `create`, `update`, `patch`, `remove`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/gandi-sdk/tags)), or from a
clone, which carries the compiled `dist/`:

```bash
git clone https://github.com/voxgig-sdk/gandi-sdk
npm install ./gandi-sdk/ts
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { GandiSDK } from '@voxgig-sdk/gandi-sdk'

const client = new GandiSDK({
  apikey: process.env.GANDI_APIKEY,
})
```

### 3. Load an acmedomain

AcmeDomain is nested under domain, so provide the `domain_id`.
`load()` returns the entity and throws on failure; `.data()` reads its record:

```ts
try {
  const acmedomain = await client.AcmeDomain().load({
    domain_id: 1,
    subscription_id: 'example_subscription_id',
    sharing_id: 'example_sharing_id',
  })
  console.log(acmedomain.data())
} catch (err) {
  console.error('load failed:', err)
}
```

### 4. Create, update, and remove

```ts
// Create — returns the created AccessToken ENTITY (.data() for the record)
const created = await client.AccessToken().create({
  expires_at: 'example_expires_at',
  name: 'example_name',
})

```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const livednsdomains = await client.LivednsDomain().list()
  console.log(livednsdomains.map((item) => item.data()))
} catch (err) {
  console.error('list failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
result envelope. Branch on `ok`; on failure `status` holds the HTTP status
(for error responses) and `err` holds the error:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (!result.ok) {
  console.error('request failed:', result.status, result.err)
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = GandiSDK.test()

const livednsdomains = await client.LivednsDomain().list()
// livednsdomains is an array of LivednsDomain entities, one per mock record
console.log(livednsdomains.map((livednsdomain) => livednsdomain.data()))
```

You can also use the instance method:

```ts
const client = new GandiSDK({ apikey: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.LivednsDomain()

// First call runs the operation and stores its result
await entity.list()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new GandiSDK({
  apikey: '...',
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
GANDI_TEST_LIVE=TRUE
GANDI_APIKEY=<your-key>
```

Then run:

```bash
cd ts && npm test
```

Live entity tests continue independent operations after errors and attempt
supported cleanup. Their final result reports failures and missing prerequisites
after the remaining work completes. The model and test inputs determine which
API operations the generated scenarios cover.


## Reference

### GandiSDK

#### Constructor

```ts
new GandiSDK(options?: {
  apikey?: string
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `AccessToken(data?)` | `AccessTokenEntity` | Create an AccessToken entity instance. |
| `AcmeAccount(data?)` | `AcmeAccountEntity` | Create an AcmeAccount entity instance. |
| `AcmeDomain(data?)` | `AcmeDomainEntity` | Create an AcmeDomain entity instance. |
| `AcmePrice(data?)` | `AcmePriceEntity` | Create an AcmePrice entity instance. |
| `AcmeSubscription(data?)` | `AcmeSubscriptionEntity` | Create an AcmeSubscription entity instance. |
| `BillingInfo(data?)` | `BillingInfoEntity` | Create a BillingInfo entity instance. |
| `BillingPrice(data?)` | `BillingPriceEntity` | Create a BillingPrice entity instance. |
| `CertificateDcv(data?)` | `CertificateDcvEntity` | Create a CertificateDcv entity instance. |
| `CertificatePackage(data?)` | `CertificatePackageEntity` | Create a CertificatePackage entity instance. |
| `CertificatePem(data?)` | `CertificatePemEntity` | Create a CertificatePem entity instance. |
| `CertificateRenewal(data?)` | `CertificateRenewalEntity` | Create a CertificateRenewal entity instance. |
| `CertificateTag(data?)` | `CertificateTagEntity` | Create a CertificateTag entity instance. |
| `Comment(data?)` | `CommentEntity` | Create a Comment entity instance. |
| `Domain(data?)` | `DomainEntity` | Create a Domain entity instance. |
| `DomainAvailability(data?)` | `DomainAvailabilityEntity` | Create a DomainAvailability entity instance. |
| `DomainChangeOwner(data?)` | `DomainChangeOwnerEntity` | Create a DomainChangeOwner entity instance. |
| `DomainClaim(data?)` | `DomainClaimEntity` | Create a DomainClaim entity instance. |
| `DomainContact(data?)` | `DomainContactEntity` | Create a DomainContact entity instance. |
| `DomainDnskey(data?)` | `DomainDnskeyEntity` | Create a DomainDnskey entity instance. |
| `DomainDnssec(data?)` | `DomainDnssecEntity` | Create a DomainDnssec entity instance. |
| `DomainHost(data?)` | `DomainHostEntity` | Create a DomainHost entity instance. |
| `DomainLivedns(data?)` | `DomainLivednsEntity` | Create a DomainLivedns entity instance. |
| `DomainNameserver(data?)` | `DomainNameserverEntity` | Create a DomainNameserver entity instance. |
| `DomainTag(data?)` | `DomainTagEntity` | Create a DomainTag entity instance. |
| `DomainTransfer(data?)` | `DomainTransferEntity` | Create a DomainTransfer entity instance. |
| `DomainWebredir(data?)` | `DomainWebredirEntity` | Create a DomainWebredir entity instance. |
| `EmailForward(data?)` | `EmailForwardEntity` | Create an EmailForward entity instance. |
| `EmailMailbox(data?)` | `EmailMailboxEntity` | Create an EmailMailbox entity instance. |
| `EmailMigration(data?)` | `EmailMigrationEntity` | Create an EmailMigration entity instance. |
| `EmailOffer(data?)` | `EmailOfferEntity` | Create an EmailOffer entity instance. |
| `EmailSlot(data?)` | `EmailSlotEntity` | Create an EmailSlot entity instance. |
| `HostingApplication(data?)` | `HostingApplicationEntity` | Create a HostingApplication entity instance. |
| `HostingInstance(data?)` | `HostingInstanceEntity` | Create a HostingInstance entity instance. |
| `HostingVhost(data?)` | `HostingVhostEntity` | Create a HostingVhost entity instance. |
| `IssuedCertificate(data?)` | `IssuedCertificateEntity` | Create an IssuedCertificate entity instance. |
| `LinkedZone(data?)` | `LinkedZoneEntity` | Create a LinkedZone entity instance. |
| `LinkedZoneDeployment(data?)` | `LinkedZoneDeploymentEntity` | Create a LinkedZoneDeployment entity instance. |
| `LinkedZoneDomain(data?)` | `LinkedZoneDomainEntity` | Create a LinkedZoneDomain entity instance. |
| `LinkedZoneTask(data?)` | `LinkedZoneTaskEntity` | Create a LinkedZoneTask entity instance. |
| `LivednsAxfrSlave(data?)` | `LivednsAxfrSlaveEntity` | Create a LivednsAxfrSlave entity instance. |
| `LivednsAxfrTsig(data?)` | `LivednsAxfrTsigEntity` | Create a LivednsAxfrTsig entity instance. |
| `LivednsDomain(data?)` | `LivednsDomainEntity` | Create a LivednsDomain entity instance. |
| `LivednsKey(data?)` | `LivednsKeyEntity` | Create a LivednsKey entity instance. |
| `LivednsNameserver(data?)` | `LivednsNameserverEntity` | Create a LivednsNameserver entity instance. |
| `LivednsRecord(data?)` | `LivednsRecordEntity` | Create a LivednsRecord entity instance. |
| `LivednsRrtype(data?)` | `LivednsRrtypeEntity` | Create a LivednsRrtype entity instance. |
| `LivednsSnapshot(data?)` | `LivednsSnapshotEntity` | Create a LivednsSnapshot entity instance. |
| `LivednsTsigKey(data?)` | `LivednsTsigKeyEntity` | Create a LivednsTsigKey entity instance. |
| `LivednsZone(data?)` | `LivednsZoneEntity` | Create a LivednsZone entity instance. |
| `Mailbox(data?)` | `MailboxEntity` | Create a Mailbox entity instance. |
| `MailboxDomain(data?)` | `MailboxDomainEntity` | Create a MailboxDomain entity instance. |
| `MailboxForward(data?)` | `MailboxForwardEntity` | Create a MailboxForward entity instance. |
| `MailboxProduct(data?)` | `MailboxProductEntity` | Create a MailboxProduct entity instance. |
| `MailboxQuota(data?)` | `MailboxQuotaEntity` | Create a MailboxQuota entity instance. |
| `MailboxSlot(data?)` | `MailboxSlotEntity` | Create a MailboxSlot entity instance. |
| `Organization(data?)` | `OrganizationEntity` | Create an Organization entity instance. |
| `OrganizationCustomer(data?)` | `OrganizationCustomerEntity` | Create an OrganizationCustomer entity instance. |
| `Template(data?)` | `TemplateEntity` | Create a Template entity instance. |
| `TemplateDispatch(data?)` | `TemplateDispatchEntity` | Create a TemplateDispatch entity instance. |
| `Tld(data?)` | `TldEntity` | Create a Tld entity instance. |
| `User(data?)` | `UserEntity` | Create an User entity instance. |
| `tester(testopts?, sdkopts?)` | `GandiSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `GandiSDK.test(testopts?, sdkopts?)` | `GandiSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria, and return it. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria, one per record. |
| `create` | `create(reqdata?, ctrl?): Promise<Entity>` | Create a new entity, and return it. |
| `update` | `update(reqdata?, ctrl?): Promise<Entity>` | Update an existing entity, and return it. |
| `patch` | `patch(reqdata?, ctrl?): Promise<Entity>` | Change part of an existing entity, and return it. |
| `remove` | `remove(reqmatch?, ctrl?): Promise<Entity>` | Remove an entity, and return it marked as deleted. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): GandiSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity itself — there is no result
envelope, and an entity's `data()` reads its record:

- `load`, `create`, `update` and `patch` resolve to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).
- `remove` resolves to the entity, marked as deleted.

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### AccessToken

| Field | Description |
| --- | --- |
| `access_token` |  |
| `entities` |  |
| `expires_at` |  |
| `id` |  |
| `name` |  |
| `scopes` |  |

Operations: create.

API path: `/organization/access-tokens`

#### AcmeAccount

| Field | Description |
| --- | --- |
| `created_at` |  |
| `deleted_at` |  |
| `external_id` |  |
| `id` |  |
| `ip` |  |
| `last_activity` |  |
| `status` |  |
| `subscription_id` |  |

Operations: list, load.

API path: `/acme/subscriptions/{subscription_id}/accounts`

#### AcmeDomain

| Field | Description |
| --- | --- |
| `created_at` |  |
| `deleted_at` |  |
| `hostname` |  |
| `hostname_ulabel` |  |
| `is_wildcard` |  |
| `status` |  |
| `subscription_id` |  |

Operations: list, load.

API path: `/acme/subscriptions/{subscription_id}/domains`

#### AcmePrice

| Field | Description |
| --- | --- |
| `country` |  |
| `currency` |  |
| `domains` |  |
| `duration` |  |
| `duration_unit` |  |
| `grid` |  |
| `max_duration` |  |
| `min_duration` |  |
| `price_after_taxes` |  |
| `price_before_taxes` |  |
| `process` |  |
| `product` |  |
| `provider` |  |
| `tax_rate` |  |
| `taxes` |  |
| `validation_type` |  |

Operations: create, list.

API path: `/acme/quote`

#### AcmeSubscription

| Field | Description |
| --- | --- |
| `country` |  |
| `created_at` |  |
| `currency` |  |
| `domains` |  |
| `duration` |  |
| `eab_hmac` |  |
| `eab_id` |  |
| `ends_at` |  |
| `grid` |  |
| `message` |  |
| `name` |  |
| `provider` |  |
| `server_url` |  |
| `status` |  |
| `subscription_id` |  |
| `validation_type` |  |
| `years` |  |

Operations: create, list, load, remove, update.

API path: `/acme/subscriptions`

#### BillingInfo

| Field | Description |
| --- | --- |
| `annual_balance` |  |
| `grid` |  |
| `outstanding_amount` |  |
| `prepaid` |  |
| `prepaid_monthly_invoice` |  |

Operations: load.

API path: `/billing/info/{sharing_id}`

#### BillingPrice

| Field | Description |
| --- | --- |
| `currency` |  |
| `grid` |  |
| `products` |  |
| `taxes` |  |

Operations: load.

API path: `/billing/price/{type}`

#### CertificateDcv

| Field | Description |
| --- | --- |
| `message` |  |
| `method` |  |

Operations: patch, update.

API path: `/certificate/issued-certs/{id}/dcv`

#### CertificatePackage

| Field | Description |
| --- | --- |
| `category` |  |
| `href` |  |
| `max_domains` |  |
| `min_domains` |  |
| `name` |  |
| `provider` |  |
| `sgc` |  |
| `trustlogo` |  |
| `warranty` |  |
| `wildcard` |  |

Operations: list, load.

API path: `/certificate/packages`

#### CertificatePem

| Field | Description |
| --- | --- |

Operations: load.

API path: `/certificate/pem/-/{filename}`

#### CertificateRenewal

| Field | Description |
| --- | --- |
| `csr` |  |
| `dcv_method` |  |
| `duration` |  |
| `errors` |  |
| `status` |  |

Operations: create.

API path: `/certificate/issued-certs/{id}`

#### CertificateTag

| Field | Description |
| --- | --- |
| `add` |  |
| `message` |  |
| `remove` |  |
| `tag` |  |
| `tags` |  |

Operations: create, list, patch, remove, update.

API path: `/certificate/issued-certs/{id}/tags`

#### Comment

| Field | Description |
| --- | --- |
| `content` |  |
| `created_at` |  |
| `errors` |  |
| `id` |  |
| `status` |  |
| `updated_at` |  |
| `user` |  |

Operations: create, load, remove.

API path: `/comment/comments/{id}`

#### Domain

| Field | Description |
| --- | --- |
| `admin` |  |
| `authinfo` |  |
| `autorenew` |  |
| `bill` |  |
| `can_tld_lock` |  |
| `claims` |  |
| `contacts` |  |
| `currency` |  |
| `dates` |  |
| `domain_owner` |  |
| `duration` |  |
| `enforce_premium` |  |
| `errors` |  |
| `extra_parameters` |  |
| `fqdn` |  |
| `fqdn_unicode` |  |
| `href` |  |
| `id` |  |
| `lang` |  |
| `mailbox_optin` |  |
| `nameserver` |  |
| `nameservers` |  |
| `nameservers_ips` |  |
| `orga_owner` |  |
| `owner` |  |
| `price` |  |
| `reachability` |  |
| `resellee_id` |  |
| `services` |  |
| `sharing_id` |  |
| `sharing_space` |  |
| `smd` |  |
| `status` |  |
| `tags` |  |
| `tech` |  |
| `template_id` |  |
| `tld` |  |
| `tld_period` |  |
| `trustee_roles` |  |

Operations: create, list, load, remove, update.

API path: `/domain/domains/{domain}/renew`

#### DomainAvailability

| Field | Description |
| --- | --- |
| `currency` |  |
| `grid` |  |
| `products` |  |
| `taxes` |  |

Operations: load.

API path: `/domain/check`

#### DomainChangeOwner

| Field | Description |
| --- | --- |
| `admin` |  |
| `bill` |  |
| `created_at` |  |
| `date_start` |  |
| `errors` |  |
| `errortype` |  |
| `errortype_label` |  |
| `foa` |  |
| `inner_step` |  |
| `owner` |  |
| `params` |  |
| `status` |  |
| `step` |  |
| `step_nb` |  |
| `tech` |  |
| `updated_at` |  |

Operations: create, load.

API path: `/domain/changeowner/{domain}`

#### DomainClaim

| Field | Description |
| --- | --- |
| `claims` |  |
| `created_at` |  |
| `expires_at` |  |
| `fqdn` |  |
| `fqdn_alabel` |  |
| `fqdn_ulabel` |  |
| `notice_id` |  |
| `status` |  |

Operations: create, load.

API path: `/domain/domains/{domain}/claims`

#### DomainContact

| Field | Description |
| --- | --- |
| `admin` |  |
| `bill` |  |
| `message` |  |
| `owner` |  |
| `tech` |  |

Operations: load, update.

API path: `/domain/domains/{domain}/contacts`

#### DomainDnskey

| Field | Description |
| --- | --- |
| `algorithm` |  |
| `digest` |  |
| `digest_type` |  |
| `href` |  |
| `id` |  |
| `keys` |  |
| `keytag` |  |
| `message` |  |
| `public_key` |  |
| `type` |  |

Operations: create, list, remove, update.

API path: `/domain/domains/{domain}/dnskeys`

#### DomainDnssec

| Field | Description |
| --- | --- |
| `error` |  |
| `state` |  |

Operations: create, load, remove.

API path: `/domain/domains/{domain}/livedns/dnssec`

#### DomainHost

| Field | Description |
| --- | --- |
| `fqdn` |  |
| `fqdn_unicode` |  |
| `href` |  |
| `ips` |  |
| `message` |  |
| `name` |  |

Operations: create, list, load, remove, update.

API path: `/domain/domains/{domain}/hosts`

#### DomainLivedns

| Field | Description |
| --- | --- |
| `current` |  |
| `dnssec_available` |  |
| `livednssec_available` |  |
| `message` |  |
| `nameservers` |  |

Operations: create, load.

API path: `/domain/domains/{domain}/livedns`

#### DomainNameserver

| Field | Description |
| --- | --- |
| `message` |  |
| `nameservers` |  |

Operations: list, update.

API path: `/domain/domains/{domain}/nameservers`

#### DomainTag

| Field | Description |
| --- | --- |
| `add` |  |
| `message` |  |
| `remove` |  |
| `tag` |  |
| `tags` |  |

Operations: create, list, patch, remove, update.

API path: `/domain/domains/{domain}/tags`

#### DomainTransfer

| Field | Description |
| --- | --- |
| `admin` |  |
| `authinfo` |  |
| `bill` |  |
| `change_owner` |  |
| `created_at` |  |
| `currency` |  |
| `duration` |  |
| `enforce_premium` |  |
| `errors` |  |
| `errortype` |  |
| `errortype_label` |  |
| `extra_parameters` |  |
| `foa` |  |
| `fqdn` |  |
| `inner_step` |  |
| `mailbox_optin` |  |
| `message` |  |
| `nameservers` |  |
| `nameservers_ips` |  |
| `owner` |  |
| `owner_contact` |  |
| `params` |  |
| `price` |  |
| `regac_at` |  |
| `resellee_id` |  |
| `start_at` |  |
| `status` |  |
| `step` |  |
| `step_nb` |  |
| `tech` |  |
| `template_id` |  |
| `transfer_link` |  |
| `transfer_procedure` |  |
| `updated_at` |  |

Operations: create, load, update.

API path: `/domain/transferin/{domain}/available`

#### DomainWebredir

| Field | Description |
| --- | --- |
| `cert_status` |  |
| `cert_uuid` |  |
| `created_at` |  |
| `host` |  |
| `message` |  |
| `override` |  |
| `protocol` |  |
| `type` |  |
| `updated_at` |  |
| `url` |  |

Operations: create, list, load, remove, update.

API path: `/domain/domains/{domain}/webredirs`

#### EmailForward

| Field | Description |
| --- | --- |
| `destinations` |  |
| `href` |  |
| `id` |  |
| `message` |  |
| `source` |  |

Operations: create, list, remove, update.

API path: `/email/forwards/{domain}`

#### EmailMailbox

| Field | Description |
| --- | --- |
| `address` |  |
| `alias_count` |  |
| `aliases` |  |
| `antispam` |  |
| `autorenew` |  |
| `domain` |  |
| `errors` |  |
| `expires_at` |  |
| `fallback_email` |  |
| `href` |  |
| `id` |  |
| `login` |  |
| `mailbox_type` |  |
| `message` |  |
| `password` |  |
| `quota_used` |  |
| `responder` |  |
| `status` |  |
| `to_convert` |  |

Operations: create, list, load, remove, update.

API path: `/email/mailboxes/{domain}/{email}/renew`

#### EmailMigration

| Field | Description |
| --- | --- |
| `available` |  |
| `currency` |  |
| `forward_count` |  |
| `free_mailboxes` |  |
| `included_mailboxes` |  |
| `info` |  |
| `message` |  |
| `packmail` |  |
| `price_v1` |  |
| `price_v2` |  |
| `quota_v1` |  |
| `token` |  |
| `usage_v1` |  |

Operations: create, load.

API path: `/email/migration/{domain}`

#### EmailOffer

| Field | Description |
| --- | --- |
| `antispam` |  |
| `dkim` |  |
| `message` |  |
| `status` |  |
| `version` |  |

Operations: load, update.

API path: `/email/offers/{domain}`

#### EmailSlot

| Field | Description |
| --- | --- |
| `autorenew` |  |
| `capacity` |  |
| `created_at` |  |
| `duration` |  |
| `gandi_id` |  |
| `href` |  |
| `id` |  |
| `mailbox_type` |  |
| `refund_amount` |  |
| `refund_currency` |  |
| `refundable` |  |
| `status` |  |

Operations: create, list, load, remove.

API path: `/email/slots/{domain}`

#### HostingApplication

| Field | Description |
| --- | --- |
| `name` |  |
| `name_label` |  |
| `requirements` |  |

Operations: list, load.

API path: `/simplehosting/applications`

#### HostingInstance

| Field | Description |
| --- | --- |
| `access_information` |  |
| `authentication` |  |
| `autorenew` |  |
| `available_upgrade` |  |
| `booster` |  |
| `booster_options` |  |
| `compatible_applications` |  |
| `console` |  |
| `cpu` |  |
| `created_at` |  |
| `database` |  |
| `datacenter` |  |
| `domain` |  |
| `duration` |  |
| `duration_unit` |  |
| `errors` |  |
| `expire_at` |  |
| `id` |  |
| `language` |  |
| `language_id` |  |
| `location` |  |
| `message` |  |
| `name` |  |
| `password` |  |
| `password_updated_at` |  |
| `ram` |  |
| `sharing_space` |  |
| `size` |  |
| `snapshot_enabled` |  |
| `status` |  |
| `storage` |  |
| `storage_additional_size` |  |
| `subscription_cancelled` |  |
| `type` |  |
| `upgrade_to` |  |
| `vhosts` |  |

Operations: create, list, load, remove, update.

API path: `/simplehosting/instances/{instance_id}/action`

#### HostingVhost

| Field | Description |
| --- | --- |
| `application` |  |
| `created_at` |  |
| `deployment` |  |
| `fqdn` |  |
| `https_strategy` |  |
| `is_a_test_vhost` |  |
| `linked_dns_zone` |  |
| `status` |  |
| `tls_validated_at` |  |

Operations: create, list, load, remove, update.

API path: `/simplehosting/instances/{instance_id}/vhosts`

#### IssuedCertificate

| Field | Description |
| --- | --- |
| `altnames` |  |
| `altnames_unicode` |  |
| `apex_only` |  |
| `assumed_name` |  |
| `business_category` |  |
| `card_pay_trustlogo` |  |
| `cert` |  |
| `cn` |  |
| `cn_unicode` |  |
| `contact` |  |
| `csr` |  |
| `dates` |  |
| `dcv_method` |  |
| `duration` |  |
| `error_msg` |  |
| `errors` |  |
| `href` |  |
| `id` |  |
| `ida` |  |
| `intermediate` |  |
| `joi` |  |
| `middleman` |  |
| `owner` |  |
| `package` |  |
| `provider` |  |
| `reissuable` |  |
| `renewable` |  |
| `resellee_id` |  |
| `sha_version` |  |
| `sharing_id` |  |
| `software` |  |
| `state` |  |
| `state_detail` |  |
| `status` |  |
| `step_nb` |  |
| `stored` |  |
| `tags` |  |
| `trustlogo` |  |
| `trustlogo_token` |  |

Operations: create, list, load, remove, update.

API path: `/certificate/issued-certs/{id}/dcv_params`

#### LinkedZone

| Field | Description |
| --- | --- |
| `created_at` |  |
| `default_records` |  |
| `domain_count` |  |
| `domains` |  |
| `id` |  |
| `message` |  |
| `name` |  |
| `record_list` |  |
| `record_text` |  |
| `records` |  |
| `sharing_space` |  |
| `status` |  |
| `updated_at` |  |

Operations: create, list, load, remove, update.

API path: `/linkedzone/zones`

#### LinkedZoneDeployment

| Field | Description |
| --- | --- |
| `deploy` |  |
| `message` |  |

Operations: create.

API path: `/linkedzone/zones/{zone_id}`

#### LinkedZoneDomain

| Field | Description |
| --- | --- |
| `deployed` |  |
| `id` |  |
| `name` |  |
| `owner` |  |
| `zone` |  |

Operations: list, load, update.

API path: `/linkedzone/domains`

#### LinkedZoneTask

| Field | Description |
| --- | --- |
| `created_at` |  |
| `ending_at` |  |
| `id` |  |
| `result` |  |
| `status` |  |
| `type` |  |
| `updated_at` |  |
| `zone_id` |  |

Operations: list, load.

API path: `/linkedzone/tasks`

#### LivednsAxfrSlave

| Field | Description |
| --- | --- |
| `message` |  |

Operations: list, remove, update.

API path: `/livedns/domains/{fqdn}/axfr/slaves`

#### LivednsAxfrTsig

| Field | Description |
| --- | --- |
| `href` |  |
| `id` |  |
| `key_name` |  |
| `message` |  |

Operations: list, remove, update.

API path: `/livedns/domains/{fqdn}/axfr/tsig`

#### LivednsDomain

| Field | Description |
| --- | --- |
| `automatic_snapshots` |  |
| `domain_href` |  |
| `domain_keys_href` |  |
| `domain_records_href` |  |
| `fqdn` |  |
| `message` |  |
| `zone` |  |

Operations: create, list, load, update.

API path: `/livedns/domains`

#### LivednsKey

| Field | Description |
| --- | --- |
| `algorithm` |  |
| `algorithm_name` |  |
| `deleted` |  |
| `ds` |  |
| `fingerprint` |  |
| `flags` |  |
| `fqdn` |  |
| `id` |  |
| `key_href` |  |
| `message` |  |
| `public_key` |  |
| `status` |  |
| `tag` |  |

Operations: create, list, load, remove, update.

API path: `/livedns/domains/{fqdn}/keys`

#### LivednsNameserver

| Field | Description |
| --- | --- |

Operations: list.

API path: `/livedns/domains/{fqdn}/nameservers`

#### LivednsRecord

| Field | Description |
| --- | --- |
| `add_rrset_values` |  |
| `id` |  |
| `message` |  |
| `remove_rrset_values` |  |
| `rrset_href` |  |
| `rrset_name` |  |
| `rrset_ttl` |  |
| `rrset_type` |  |
| `rrset_values` |  |

Operations: create, list, load, patch, remove, update.

API path: `/livedns/domains/{fqdn}/records/{rrset_name}/{rrset_type}`

#### LivednsRrtype

| Field | Description |
| --- | --- |

Operations: list.

API path: `/livedns/dns/rrtypes`

#### LivednsSnapshot

| Field | Description |
| --- | --- |
| `automatic` |  |
| `created_at` |  |
| `href` |  |
| `id` |  |
| `message` |  |
| `name` |  |
| `zone_data` |  |

Operations: create, list, load, remove, update.

API path: `/livedns/domains/{fqdn}/snapshots`

#### LivednsTsigKey

| Field | Description |
| --- | --- |
| `config_samples` |  |
| `href` |  |
| `id` |  |
| `key_name` |  |
| `secret` |  |

Operations: create, list, load.

API path: `/livedns/axfr/tsig`

#### LivednsZone

| Field | Description |
| --- | --- |
| `items` |  |
| `message` |  |
| `remove_apex_ns` |  |

Operations: remove, update.

API path: `/livedns/domains/{fqdn}/records`

#### Mailbox

| Field | Description |
| --- | --- |
| `address` |  |
| `aliases` |  |
| `antispam` |  |
| `autorenew` |  |
| `config` |  |
| `config_name` |  |
| `created_at` |  |
| `data_access` |  |
| `domain_part` |  |
| `duration_month` |  |
| `email` |  |
| `expires_at` |  |
| `internal_domain` |  |
| `issues` |  |
| `last_paid_duration` |  |
| `local_part` |  |
| `message` |  |
| `owner` |  |
| `password` |  |
| `quota` |  |
| `quota_used` |  |
| `responder` |  |
| `updated_at` |  |
| `uuid` |  |

Operations: create, list, load, remove, update.

API path: `/mailbox/mailboxes/{email}/renew`

#### MailboxDomain

| Field | Description |
| --- | --- |
| `antispam` |  |
| `configuration` |  |
| `date_last_validation` |  |
| `dkim` |  |
| `fqdns` |  |
| `internal` |  |
| `is_livedns` |  |
| `mx` |  |
| `owner` |  |
| `spf` |  |
| `txt` |  |

Operations: create, list, load.

API path: `/mailbox/domains/{domain}/validate`

#### MailboxForward

| Field | Description |
| --- | --- |
| `destinations` |  |
| `message` |  |
| `source` |  |

Operations: create, list, remove, update.

API path: `/mailbox/forwards`

#### MailboxProduct

| Field | Description |
| --- | --- |
| `autorenew` |  |
| `config` |  |
| `config_name` |  |
| `description` |  |
| `duration_month` |  |
| `label` |  |
| `message` |  |
| `prices` |  |
| `quantity` |  |
| `taxes` |  |
| `uuid` |  |

Operations: create, list.

API path: `/mailbox/products`

#### MailboxQuota

| Field | Description |
| --- | --- |
| `annually` |  |
| `config_name` |  |
| `label` |  |
| `monthly` |  |
| `quota` |  |

Operations: list.

API path: `/mailbox/quotas`

#### MailboxSlot

| Field | Description |
| --- | --- |
| `autorenew` |  |
| `config` |  |
| `expires_at` |  |
| `last_paid_duration` |  |
| `refund_info` |  |
| `refundable` |  |
| `uuid` |  |
| `webhosting_pack` |  |

Operations: list, load.

API path: `/mailbox/slots`

#### Organization

| Field | Description |
| --- | --- |
| `city` |  |
| `corporate` |  |
| `country` |  |
| `email` |  |
| `fax` |  |
| `firstname` |  |
| `id` |  |
| `lang` |  |
| `lastname` |  |
| `message` |  |
| `name` |  |
| `orgname` |  |
| `phone` |  |
| `reference` |  |
| `reseller` |  |
| `siren` |  |
| `state` |  |
| `streetaddr` |  |
| `streetaddr2` |  |
| `type` |  |
| `vat_number` |  |
| `zip` |  |

Operations: create, list, load, remove, update.

API path: `/organization/organizations/{org_id}/action`

#### OrganizationCustomer

| Field | Description |
| --- | --- |
| `city` |  |
| `country` |  |
| `email` |  |
| `fax` |  |
| `firstname` |  |
| `id` |  |
| `lang` |  |
| `lastname` |  |
| `message` |  |
| `name` |  |
| `orgname` |  |
| `phone` |  |
| `reference` |  |
| `siren` |  |
| `state` |  |
| `streetaddr` |  |
| `streetaddr2` |  |
| `sync_contact_email` |  |
| `type` |  |
| `vat_number` |  |
| `zip` |  |

Operations: create, list, load, remove, update.

API path: `/organization/organizations/{org_id}/customers`

#### Template

| Field | Description |
| --- | --- |
| `description` |  |
| `editable` |  |
| `href` |  |
| `id` |  |
| `name` |  |
| `namespaces` |  |
| `orgname` |  |
| `payload` |  |
| `sharing_space` |  |
| `variables` |  |

Operations: create, list, load, remove, update.

API path: `/template/templates`

#### TemplateDispatch

| Field | Description |
| --- | --- |
| `attempt` |  |
| `created_at` |  |
| `dispatch_href` |  |
| `id` |  |
| `message` |  |
| `object_id` |  |
| `object_type` |  |
| `payload` |  |
| `sharing_id` |  |
| `state` |  |
| `state_msg` |  |
| `target` |  |
| `target_id` |  |
| `target_type` |  |
| `task_history` |  |
| `task_status` |  |
| `task_updated_at` |  |
| `template_id` |  |
| `template_name` |  |

Operations: create, load.

API path: `/template/templates/{id}`

#### Tld

| Field | Description |
| --- | --- |
| `authinfo_for_transfer` |  |
| `category` |  |
| `change_owner` |  |
| `corporate` |  |
| `ext_trade` |  |
| `full_tld` |  |
| `href` |  |
| `lock` |  |
| `name` |  |

Operations: list, load.

API path: `/domain/tlds`

#### User

| Field | Description |
| --- | --- |
| `city` |  |
| `country` |  |
| `email` |  |
| `fax` |  |
| `firstname` |  |
| `id` |  |
| `lang` |  |
| `lastname` |  |
| `name` |  |
| `phone` |  |
| `state` |  |
| `streetaddr` |  |
| `streetaddr2` |  |
| `username` |  |
| `zip` |  |

Operations: load.

API path: `/organization/user-info`



## Entities


### AccessToken

Create an instance: `const access_token = client.AccessToken()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `access_token` | `string` |  |
| `entities` | `any[]` |  |
| `expires_at` | `string` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `scopes` | `any[]` |  |

#### Example: Create

```ts
const access_token = await client.AccessToken().create({
})
```


### AcmeAccount

Create an instance: `const acme_account = client.AcmeAccount()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` |  |
| `deleted_at` | `string` |  |
| `external_id` | `string` |  |
| `id` | `string` |  |
| `ip` | `string` |  |
| `last_activity` | `string` |  |
| `status` | `string` |  |
| `subscription_id` | `string` |  |

#### Example: Load

```ts
const acme_account = await client.AcmeAccount().load({ id: 'acme_account_id', subscription_id: 'subscription_id', sharing_id: 'sharing_id' })
```

#### Example: List

```ts
const acme_accounts = await client.AcmeAccount().list({ subscription_id: "example", sharing_id: "example" })
```


### AcmeDomain

Create an instance: `const acme_domain = client.AcmeDomain()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` |  |
| `deleted_at` | `string` |  |
| `hostname` | `string` |  |
| `hostname_ulabel` | `string` |  |
| `is_wildcard` | `boolean` |  |
| `status` | `string` |  |
| `subscription_id` | `string` |  |

#### Example: Load

```ts
const acme_domain = await client.AcmeDomain().load({ domain_id: 1, subscription_id: 'subscription_id', sharing_id: 'sharing_id' })
```

#### Example: List

```ts
const acme_domains = await client.AcmeDomain().list({ subscription_id: "example", domain: "example", sharing_id: "example" })
```


### AcmePrice

Create an instance: `const acme_price = client.AcmePrice()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `country` | `string` |  |
| `currency` | `string` |  |
| `domains` | `any[]` |  |
| `duration` | `string` |  |
| `duration_unit` | `string` |  |
| `grid` | `string` |  |
| `max_duration` | `number` |  |
| `min_duration` | `number` |  |
| `price_after_taxes` | `string` |  |
| `price_before_taxes` | `string` |  |
| `process` | `string` |  |
| `product` | `Record<string, any>` |  |
| `provider` | `string` |  |
| `tax_rate` | `string` |  |
| `taxes` | `any[]` |  |
| `validation_type` | `string` |  |

#### Example: List

```ts
const acme_prices = await client.AcmePrice().list({ country: "example", currency: "example", duration: "example", grid: "example", process: "example", provider: "example", sharing_id: "example", validation_type: "example" })
```

#### Example: Create

```ts
const acme_price = await client.AcmePrice().create({
  sharing_id: 'example_sharing_id',
  country: 'example_country',
  currency: 'example_currency',
  domains: [],
  duration: 'example_duration',
  grid: 'example_grid',
  process: 'example_process',
  provider: 'example_provider',
  validation_type: 'example_validation_type',
})
```


### AcmeSubscription

Create an instance: `const acme_subscription = client.AcmeSubscription()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `country` | `string` |  |
| `created_at` | `string` |  |
| `currency` | `string` |  |
| `domains` | `any[]` |  |
| `duration` | `number` |  |
| `eab_hmac` | `string` |  |
| `eab_id` | `string` |  |
| `ends_at` | `string` |  |
| `grid` | `string` |  |
| `message` | `string` |  |
| `name` | `string` |  |
| `provider` | `string` |  |
| `server_url` | `string` |  |
| `status` | `string` |  |
| `subscription_id` | `string` |  |
| `validation_type` | `string` |  |
| `years` | `string` |  |

#### Example: Load

```ts
const acme_subscription = await client.AcmeSubscription().load({ subscription_id: 'subscription_id', sharing_id: 'sharing_id' })
```

#### Example: List

```ts
const acme_subscriptions = await client.AcmeSubscription().list({ created_at: "example", ends_at: "example", name: "example", provider: "example", sharing_id: "example", status: "example", validation_type: "example", year: "example" })
```

#### Example: Create

```ts
const acme_subscription = await client.AcmeSubscription().create({
  sharing_id: 'example_sharing_id',
  country: 'example_country',
  currency: 'example_currency',
  domains: [],
  duration: 1,
  grid: 'example_grid',
  name: 'example_name',
  provider: 'example_provider',
  validation_type: 'example_validation_type',
})
```


### BillingInfo

Create an instance: `const billing_info = client.BillingInfo()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `annual_balance` | `number` |  |
| `grid` | `string` |  |
| `outstanding_amount` | `number` |  |
| `prepaid` | `Record<string, any>` |  |
| `prepaid_monthly_invoice` | `boolean` |  |

#### Example: Load

```ts
const billing_info = await client.BillingInfo().load({ sharing_id: 'sharing_id' })
```


### BillingPrice

Create an instance: `const billing_price = client.BillingPrice()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `currency` | `string` |  |
| `grid` | `string` |  |
| `products` | `any[]` |  |
| `taxes` | `any[]` |  |

#### Example: Load

```ts
const billing_price = await client.BillingPrice().load({ type: 'type', name: [], process: [] })
```


### CertificateDcv

Create an instance: `const certificate_dcv = client.CertificateDcv()`

#### Operations

| Method | Description |
| --- | --- |
| `patch(data)` | Change part of an existing entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `message` | `string` |  |
| `method` | `string` |  |


### CertificatePackage

Create an instance: `const certificate_package = client.CertificatePackage()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `category` | `Record<string, any>` |  |
| `href` | `string` |  |
| `max_domains` | `number` |  |
| `min_domains` | `number` |  |
| `name` | `string` |  |
| `provider` | `string` |  |
| `sgc` | `boolean` |  |
| `trustlogo` | `boolean` |  |
| `warranty` | `number` |  |
| `wildcard` | `boolean` |  |

#### Example: Load

```ts
const certificate_package = await client.CertificatePackage().load({ name: 'name' })
```

#### Example: List

```ts
const certificate_packages = await client.CertificatePackage().list()
```


### CertificatePem

Create an instance: `const certificate_pem = client.CertificatePem()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const certificate_pem = await client.CertificatePem().load({ type: 'type' })
```


### CertificateRenewal

Create an instance: `const certificate_renewal = client.CertificateRenewal()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `csr` | `string` |  |
| `dcv_method` | `string` |  |
| `duration` | `number` |  |
| `errors` | `any[]` |  |
| `status` | `string` |  |

#### Example: Create

```ts
const certificate_renewal = await client.CertificateRenewal().create({
  certificate_id: 'example_certificate_id',
})
```


### CertificateTag

Create an instance: `const certificate_tag = client.CertificateTag()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `patch(data)` | Change part of an existing entity. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `add` | `any[]` |  |
| `message` | `string` |  |
| `remove` | `any[]` |  |
| `tag` | `string` |  |
| `tags` | `any[]` |  |

#### Example: List

```ts
const certificate_tags = await client.CertificateTag().list({ certificate_id: "example" })
```

#### Example: Create

```ts
const certificate_tag = await client.CertificateTag().create({
  certificate_id: 'example_certificate_id',
  tag: 'example_tag',
})
```


### Comment

Create an instance: `const comment = client.Comment()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `content` | `string` |  |
| `created_at` | `string` |  |
| `errors` | `any[]` |  |
| `id` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |
| `user` | `Record<string, any>` |  |

#### Example: Load

```ts
const comment = await client.Comment().load({ entity_id: 'entity_id' })
```

#### Example: Create

```ts
const comment = await client.Comment().create({
  entity_id: 'example_entity_id',
  content: 'example_content',
})
```


### Domain

Create an instance: `const domain = client.Domain()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `admin` | `Record<string, any>` |  |
| `authinfo` | `string` |  |
| `autorenew` | `Record<string, any>` |  |
| `bill` | `Record<string, any>` |  |
| `can_tld_lock` | `boolean` |  |
| `claims` | `string` |  |
| `contacts` | `Record<string, any>` |  |
| `currency` | `string` |  |
| `dates` | `Record<string, any>` |  |
| `domain_owner` | `string` |  |
| `duration` | `number` |  |
| `enforce_premium` | `boolean` |  |
| `errors` | `any[]` |  |
| `extra_parameters` | `Record<string, any>` |  |
| `fqdn` | `string` |  |
| `fqdn_unicode` | `string` |  |
| `href` | `string` |  |
| `id` | `string` |  |
| `lang` | `string` |  |
| `mailbox_optin` | `boolean` |  |
| `nameserver` | `Record<string, any>` |  |
| `nameservers` | `any[]` |  |
| `nameservers_ips` | `Record<string, any>` |  |
| `orga_owner` | `string` |  |
| `owner` | `Record<string, any>` |  |
| `price` | `number` |  |
| `reachability` | `string` |  |
| `resellee_id` | `string` |  |
| `services` | `any[]` |  |
| `sharing_id` | `string` |  |
| `sharing_space` | `Record<string, any>` |  |
| `smd` | `string` |  |
| `status` | `any[]` |  |
| `tags` | `any[]` |  |
| `tech` | `Record<string, any>` |  |
| `template_id` | `string` |  |
| `tld` | `string` |  |
| `tld_period` | `string` |  |
| `trustee_roles` | `any[]` |  |

#### Example: Load

```ts
const domain = await client.Domain().load({ fqdn: 'fqdn' })
```

#### Example: List

```ts
const domains = await client.Domain().list()
```

#### Example: Create

```ts
const domain = await client.Domain().create({
  admin: {},
  bill: {},
  fqdn: 'example_fqdn',
  owner: {},
  tech: {},
})
```


### DomainAvailability

Create an instance: `const domain_availability = client.DomainAvailability()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `currency` | `string` |  |
| `grid` | `string` |  |
| `products` | `any[]` |  |
| `taxes` | `any[]` |  |

#### Example: Load

```ts
const domain_availability = await client.DomainAvailability().load({ name: 'name' })
```


### DomainChangeOwner

Create an instance: `const domain_change_owner = client.DomainChangeOwner()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `admin` | `Record<string, any>` |  |
| `bill` | `Record<string, any>` |  |
| `created_at` | `string` |  |
| `date_start` | `string` |  |
| `errors` | `any[]` |  |
| `errortype` | `string` |  |
| `errortype_label` | `string` |  |
| `foa` | `any[]` |  |
| `inner_step` | `string` |  |
| `owner` | `Record<string, any>` |  |
| `params` | `Record<string, any>` |  |
| `status` | `string` |  |
| `step` | `string` |  |
| `step_nb` | `number` |  |
| `tech` | `Record<string, any>` |  |
| `updated_at` | `string` |  |

#### Example: Load

```ts
const domain_change_owner = await client.DomainChangeOwner().load({ domain: 'domain' })
```

#### Example: Create

```ts
const domain_change_owner = await client.DomainChangeOwner().create({
  domain: 'example_domain',
  admin: {},
  bill: {},
  owner: {},
  tech: {},
})
```


### DomainClaim

Create an instance: `const domain_claim = client.DomainClaim()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `claims` | `any[]` |  |
| `created_at` | `string` |  |
| `expires_at` | `string` |  |
| `fqdn` | `string` |  |
| `fqdn_alabel` | `string` |  |
| `fqdn_ulabel` | `string` |  |
| `notice_id` | `string` |  |
| `status` | `string` |  |

#### Example: Load

```ts
const domain_claim = await client.DomainClaim().load({ domain: 'domain' })
```

#### Example: Create

```ts
const domain_claim = await client.DomainClaim().create({
  domain: 'example_domain',
  claims: [],
  created_at: 'example_created_at',
  expires_at: 'example_expires_at',
  fqdn: 'example_fqdn',
  fqdn_alabel: 'example_fqdn_alabel',
  fqdn_ulabel: 'example_fqdn_ulabel',
  notice_id: 'example_notice_id',
  status: 'example_status',
})
```


### DomainContact

Create an instance: `const domain_contact = client.DomainContact()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `admin` | `Record<string, any>` |  |
| `bill` | `Record<string, any>` |  |
| `message` | `string` |  |
| `owner` | `Record<string, any>` |  |
| `tech` | `Record<string, any>` |  |

#### Example: Load

```ts
const domain_contact = await client.DomainContact().load({ domain: 'domain' })
```


### DomainDnskey

Create an instance: `const domain_dnskey = client.DomainDnskey()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `algorithm` | `number` |  |
| `digest` | `string` |  |
| `digest_type` | `number` |  |
| `href` | `string` |  |
| `id` | `number` |  |
| `keys` | `any[]` |  |
| `keytag` | `number` |  |
| `message` | `string` |  |
| `public_key` | `string` |  |
| `type` | `string` |  |

#### Example: List

```ts
const domain_dnskeys = await client.DomainDnskey().list({ domain: "example" })
```

#### Example: Create

```ts
const domain_dnskey = await client.DomainDnskey().create({
  domain: 'example_domain',
  algorithm: 1,
  public_key: 'example_public_key',
  type: 'example_type',
})
```


### DomainDnssec

Create an instance: `const domain_dnssec = client.DomainDnssec()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `error` | `string` |  |
| `state` | `string` |  |

#### Example: Load

```ts
const domain_dnssec = await client.DomainDnssec().load({ domain: 'domain' })
```

#### Example: Create

```ts
const domain_dnssec = await client.DomainDnssec().create({
  domain: 'example_domain',
  state: 'example_state',
})
```


### DomainHost

Create an instance: `const domain_host = client.DomainHost()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `fqdn` | `string` |  |
| `fqdn_unicode` | `string` |  |
| `href` | `string` |  |
| `ips` | `any[]` |  |
| `message` | `string` |  |
| `name` | `string` |  |

#### Example: Load

```ts
const domain_host = await client.DomainHost().load({ domain: 'domain', name: 'name' })
```

#### Example: List

```ts
const domain_hosts = await client.DomainHost().list({ domain: "example" })
```

#### Example: Create

```ts
const domain_host = await client.DomainHost().create({
  domain: 'example_domain',
  ips: [],
  name: 'example_name',
})
```


### DomainLivedns

Create an instance: `const domain_livedns = client.DomainLivedns()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `current` | `string` |  |
| `dnssec_available` | `boolean` |  |
| `livednssec_available` | `boolean` |  |
| `message` | `string` |  |
| `nameservers` | `any[]` |  |

#### Example: Load

```ts
const domain_livedns = await client.DomainLivedns().load({ domain: 'domain' })
```

#### Example: Create

```ts
const domain_livedns = await client.DomainLivedns().create({
  domain: 'example_domain',
  current: 'example_current',
  message: 'example_message',
  nameservers: [],
})
```


### DomainNameserver

Create an instance: `const domain_nameserver = client.DomainNameserver()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `message` | `string` |  |
| `nameservers` | `any[]` |  |

#### Example: List

```ts
const domain_nameservers = await client.DomainNameserver().list({ domain: "example" })
```


### DomainTag

Create an instance: `const domain_tag = client.DomainTag()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `patch(data)` | Change part of an existing entity. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `add` | `any[]` |  |
| `message` | `string` |  |
| `remove` | `any[]` |  |
| `tag` | `string` |  |
| `tags` | `any[]` |  |

#### Example: List

```ts
const domain_tags = await client.DomainTag().list({ domain: "example" })
```

#### Example: Create

```ts
const domain_tag = await client.DomainTag().create({
  domain: 'example_domain',
  tag: 'example_tag',
})
```


### DomainTransfer

Create an instance: `const domain_transfer = client.DomainTransfer()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `admin` | `Record<string, any>` |  |
| `authinfo` | `string` |  |
| `bill` | `Record<string, any>` |  |
| `change_owner` | `boolean` |  |
| `created_at` | `string` |  |
| `currency` | `string` |  |
| `duration` | `number` |  |
| `enforce_premium` | `boolean` |  |
| `errors` | `any[]` |  |
| `errortype` | `string` |  |
| `errortype_label` | `string` |  |
| `extra_parameters` | `Record<string, any>` |  |
| `foa` | `any[]` |  |
| `fqdn` | `string` |  |
| `inner_step` | `string` |  |
| `mailbox_optin` | `boolean` |  |
| `message` | `string` |  |
| `nameservers` | `any[]` |  |
| `nameservers_ips` | `Record<string, any>` |  |
| `owner` | `Record<string, any>` |  |
| `owner_contact` | `string` |  |
| `params` | `Record<string, any>` |  |
| `price` | `number` |  |
| `regac_at` | `string` |  |
| `resellee_id` | `string` |  |
| `start_at` | `string` |  |
| `status` | `string` |  |
| `step` | `string` |  |
| `step_nb` | `number` |  |
| `tech` | `Record<string, any>` |  |
| `template_id` | `string` |  |
| `transfer_link` | `string` |  |
| `transfer_procedure` | `string` |  |
| `updated_at` | `string` |  |

#### Example: Load

```ts
const domain_transfer = await client.DomainTransfer().load({ domain: 'domain' })
```

#### Example: Create

```ts
const domain_transfer = await client.DomainTransfer().create({
  admin: {},
  bill: {},
  fqdn: 'example_fqdn',
  owner: {},
  tech: {},
})
```


### DomainWebredir

Create an instance: `const domain_webredir = client.DomainWebredir()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cert_status` | `string` |  |
| `cert_uuid` | `string` |  |
| `created_at` | `string` |  |
| `host` | `string` |  |
| `message` | `string` |  |
| `override` | `boolean` |  |
| `protocol` | `string` |  |
| `type` | `string` |  |
| `updated_at` | `string` |  |
| `url` | `string` |  |

#### Example: Load

```ts
const domain_webredir = await client.DomainWebredir().load({ domain: 'domain', host: 'host' })
```

#### Example: List

```ts
const domain_webredirs = await client.DomainWebredir().list({ domain: "example" })
```

#### Example: Create

```ts
const domain_webredir = await client.DomainWebredir().create({
  domain: 'example_domain',
  host: 'example_host',
  override: true,
  protocol: 'example_protocol',
  type: 'example_type',
  url: 'example_url',
})
```


### EmailForward

Create an instance: `const email_forward = client.EmailForward()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `destinations` | `any[]` |  |
| `href` | `string` |  |
| `id` | `string` |  |
| `message` | `string` |  |
| `source` | `string` |  |

#### Example: List

```ts
const email_forwards = await client.EmailForward().list({ domain: "example" })
```

#### Example: Create

```ts
const email_forward = await client.EmailForward().create({
  domain: 'example_domain',
  destinations: [],
  source: 'example_source',
})
```


### EmailMailbox

Create an instance: `const email_mailbox = client.EmailMailbox()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `address` | `string` |  |
| `alias_count` | `number` |  |
| `aliases` | `any[]` |  |
| `antispam` | `boolean` |  |
| `autorenew` | `Record<string, any>` |  |
| `domain` | `string` |  |
| `errors` | `any[]` |  |
| `expires_at` | `string` |  |
| `fallback_email` | `string` |  |
| `href` | `string` |  |
| `id` | `string` |  |
| `login` | `string` |  |
| `mailbox_type` | `string` |  |
| `message` | `string` |  |
| `password` | `string` |  |
| `quota_used` | `number` |  |
| `responder` | `Record<string, any>` |  |
| `status` | `string` |  |
| `to_convert` | `boolean` |  |

#### Example: Load

```ts
const email_mailbox = await client.EmailMailbox().load({ id: 'email_mailbox_id', domain: 'domain' })
```

#### Example: List

```ts
const email_mailboxs = await client.EmailMailbox().list({ domain: "example" })
```

#### Example: Create

```ts
const email_mailbox = await client.EmailMailbox().create({
  domain: 'example_domain',
  login: 'example_login',
  mailbox_type: 'example_mailbox_type',
  password: 'example_password',
})
```


### EmailMigration

Create an instance: `const email_migration = client.EmailMigration()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `available` | `boolean` |  |
| `currency` | `string` |  |
| `forward_count` | `number` |  |
| `free_mailboxes` | `number` |  |
| `included_mailboxes` | `number` |  |
| `info` | `any[]` |  |
| `message` | `string` |  |
| `packmail` | `boolean` |  |
| `price_v1` | `number` |  |
| `price_v2` | `number` |  |
| `quota_v1` | `number` |  |
| `token` | `string` |  |
| `usage_v1` | `number` |  |

#### Example: Load

```ts
const email_migration = await client.EmailMigration().load({ domain: 'domain' })
```

#### Example: Create

```ts
const email_migration = await client.EmailMigration().create({
  domain: 'example_domain',
  token: 'example_token',
})
```


### EmailOffer

Create an instance: `const email_offer = client.EmailOffer()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `antispam` | `string` |  |
| `dkim` | `string` |  |
| `message` | `string` |  |
| `status` | `string` |  |
| `version` | `number` |  |

#### Example: Load

```ts
const email_offer = await client.EmailOffer().load({ domain: 'domain' })
```


### EmailSlot

Create an instance: `const email_slot = client.EmailSlot()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `autorenew` | `boolean` |  |
| `capacity` | `number` |  |
| `created_at` | `string` |  |
| `duration` | `number` |  |
| `gandi_id` | `number` |  |
| `href` | `string` |  |
| `id` | `string` |  |
| `mailbox_type` | `string` |  |
| `refund_amount` | `number` |  |
| `refund_currency` | `string` |  |
| `refundable` | `boolean` |  |
| `status` | `string` |  |

#### Example: Load

```ts
const email_slot = await client.EmailSlot().load({ id: 1, domain: 'domain' })
```

#### Example: List

```ts
const email_slots = await client.EmailSlot().list({ domain: "example" })
```

#### Example: Create

```ts
const email_slot = await client.EmailSlot().create({
  domain: 'example_domain',
  duration: 1,
  mailbox_type: 'example_mailbox_type',
})
```


### HostingApplication

Create an instance: `const hosting_application = client.HostingApplication()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `name` | `string` |  |
| `name_label` | `string` |  |
| `requirements` | `any[]` |  |

#### Example: Load

```ts
const hosting_application = await client.HostingApplication().load({ name: 'name' })
```

#### Example: List

```ts
const hosting_applications = await client.HostingApplication().list()
```


### HostingInstance

Create an instance: `const hosting_instance = client.HostingInstance()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `access_information` | `Record<string, any>` |  |
| `authentication` | `Record<string, any>` |  |
| `autorenew` | `Record<string, any>` |  |
| `available_upgrade` | `boolean` |  |
| `booster` | `Record<string, any>` |  |
| `booster_options` | `Record<string, any>` |  |
| `compatible_applications` | `any[]` |  |
| `console` | `Record<string, any>` |  |
| `cpu` | `number` |  |
| `created_at` | `string` |  |
| `database` | `Record<string, any>` |  |
| `datacenter` | `Record<string, any>` |  |
| `domain` | `string` |  |
| `duration` | `number` |  |
| `duration_unit` | `string` |  |
| `errors` | `any[]` |  |
| `expire_at` | `string` |  |
| `id` | `string` |  |
| `language` | `Record<string, any>` |  |
| `language_id` | `string` |  |
| `location` | `string` |  |
| `message` | `string` |  |
| `name` | `string` |  |
| `password` | `string` |  |
| `password_updated_at` | `string` |  |
| `ram` | `Record<string, any>` |  |
| `sharing_space` | `Record<string, any>` |  |
| `size` | `string` |  |
| `snapshot_enabled` | `boolean` |  |
| `status` | `string` |  |
| `storage` | `Record<string, any>` |  |
| `storage_additional_size` | `number` |  |
| `subscription_cancelled` | `boolean` |  |
| `type` | `Record<string, any>` |  |
| `upgrade_to` | `any[]` |  |
| `vhosts` | `any[]` |  |

#### Example: Load

```ts
const hosting_instance = await client.HostingInstance().load({ id: 'hosting_instance_id' })
```

#### Example: List

```ts
const hosting_instances = await client.HostingInstance().list()
```

#### Example: Create

```ts
const hosting_instance = await client.HostingInstance().create({
  authentication: {},
  domain: 'example_domain',
  location: 'example_location',
  size: 'example_size',
  type: {},
})
```


### HostingVhost

Create an instance: `const hosting_vhost = client.HostingVhost()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `application` | `Record<string, any>` |  |
| `created_at` | `string` |  |
| `deployment` | `Record<string, any>` |  |
| `fqdn` | `string` |  |
| `https_strategy` | `string` |  |
| `is_a_test_vhost` | `boolean` |  |
| `linked_dns_zone` | `Record<string, any>` |  |
| `status` | `string` |  |
| `tls_validated_at` | `string` |  |

#### Example: Load

```ts
const hosting_vhost = await client.HostingVhost().load({ fqdn: 'fqdn', instance_id: 'instance_id' })
```

#### Example: List

```ts
const hosting_vhosts = await client.HostingVhost().list({ instance_id: "example" })
```

#### Example: Create

```ts
const hosting_vhost = await client.HostingVhost().create({
  instance_id: 'example_instance_id',
  application: {},
  fqdn: 'example_fqdn',
  linked_dns_zone: {},
})
```


### IssuedCertificate

Create an instance: `const issued_certificate = client.IssuedCertificate()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `altnames` | `any[]` |  |
| `altnames_unicode` | `any[]` |  |
| `apex_only` | `boolean` |  |
| `assumed_name` | `string` |  |
| `business_category` | `string` |  |
| `card_pay_trustlogo` | `boolean` |  |
| `cert` | `string` |  |
| `cn` | `string` |  |
| `cn_unicode` | `string` |  |
| `contact` | `Record<string, any>` |  |
| `csr` | `string` |  |
| `dates` | `Record<string, any>` |  |
| `dcv_method` | `string` |  |
| `duration` | `number` |  |
| `error_msg` | `string` |  |
| `errors` | `any[]` |  |
| `href` | `string` |  |
| `id` | `string` |  |
| `ida` | `Record<string, any>` |  |
| `intermediate` | `string` |  |
| `joi` | `Record<string, any>` |  |
| `middleman` | `Record<string, any>` |  |
| `owner` | `string` |  |
| `package` | `Record<string, any>` |  |
| `provider` | `string` |  |
| `reissuable` | `boolean` |  |
| `renewable` | `boolean` |  |
| `resellee_id` | `string` |  |
| `sha_version` | `number` |  |
| `sharing_id` | `string` |  |
| `software` | `number` |  |
| `state` | `string` |  |
| `state_detail` | `string` |  |
| `status` | `string` |  |
| `step_nb` | `number` |  |
| `stored` | `boolean` |  |
| `tags` | `any[]` |  |
| `trustlogo` | `boolean` |  |
| `trustlogo_token` | `Record<string, any>` |  |

#### Example: Load

```ts
const issued_certificate = await client.IssuedCertificate().load({ id: 'issued_certificate_id' })
```

#### Example: List

```ts
const issued_certificates = await client.IssuedCertificate().list()
```

#### Example: Create

```ts
const issued_certificate = await client.IssuedCertificate().create({
  package: {},
})
```


### LinkedZone

Create an instance: `const linked_zone = client.LinkedZone()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` |  |
| `default_records` | `boolean` |  |
| `domain_count` | `number` |  |
| `domains` | `any[]` |  |
| `id` | `string` |  |
| `message` | `string` |  |
| `name` | `string` |  |
| `record_list` | `any[]` |  |
| `record_text` | `string` |  |
| `records` | `any[]` |  |
| `sharing_space` | `Record<string, any>` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |

#### Example: Load

```ts
const linked_zone = await client.LinkedZone().load({ id: 'linked_zone_id' })
```

#### Example: List

```ts
const linked_zones = await client.LinkedZone().list()
```

#### Example: Create

```ts
const linked_zone = await client.LinkedZone().create({
  name: 'example_name',
})
```


### LinkedZoneDeployment

Create an instance: `const linked_zone_deployment = client.LinkedZoneDeployment()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deploy` | `boolean` |  |
| `message` | `string` |  |

#### Example: Create

```ts
const linked_zone_deployment = await client.LinkedZoneDeployment().create({
  zone_id: 'example_zone_id',
  deploy: true,
})
```


### LinkedZoneDomain

Create an instance: `const linked_zone_domain = client.LinkedZoneDomain()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deployed` | `boolean` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `owner` | `string` |  |
| `zone` | `Record<string, any>` |  |

#### Example: Load

```ts
const linked_zone_domain = await client.LinkedZoneDomain().load({ name: 'name' })
```

#### Example: List

```ts
const linked_zone_domains = await client.LinkedZoneDomain().list()
```


### LinkedZoneTask

Create an instance: `const linked_zone_task = client.LinkedZoneTask()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` |  |
| `ending_at` | `string` |  |
| `id` | `string` |  |
| `result` | `Record<string, any>` |  |
| `status` | `string` |  |
| `type` | `string` |  |
| `updated_at` | `string` |  |
| `zone_id` | `string` |  |

#### Example: Load

```ts
const linked_zone_task = await client.LinkedZoneTask().load({ id: 'linked_zone_task_id' })
```

#### Example: List

```ts
const linked_zone_tasks = await client.LinkedZoneTask().list()
```


### LivednsAxfrSlave

Create an instance: `const livedns_axfr_slave = client.LivednsAxfrSlave()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `message` | `string` |  |

#### Example: List

```ts
const livedns_axfr_slaves = await client.LivednsAxfrSlave().list({ fqdn: "example" })
```


### LivednsAxfrTsig

Create an instance: `const livedns_axfr_tsig = client.LivednsAxfrTsig()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `href` | `string` |  |
| `id` | `string` |  |
| `key_name` | `string` |  |
| `message` | `string` |  |

#### Example: List

```ts
const livedns_axfr_tsigs = await client.LivednsAxfrTsig().list({ fqdn: "example" })
```


### LivednsDomain

Create an instance: `const livedns_domain = client.LivednsDomain()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `automatic_snapshots` | `boolean` |  |
| `domain_href` | `string` |  |
| `domain_keys_href` | `string` |  |
| `domain_records_href` | `string` |  |
| `fqdn` | `string` |  |
| `message` | `string` |  |
| `zone` | `Record<string, any>` |  |

#### Example: Load

```ts
const livedns_domain = await client.LivednsDomain().load({ fqdn: 'fqdn' })
```

#### Example: List

```ts
const livedns_domains = await client.LivednsDomain().list()
```

#### Example: Create

```ts
const livedns_domain = await client.LivednsDomain().create({
  fqdn: 'example_fqdn',
})
```


### LivednsKey

Create an instance: `const livedns_key = client.LivednsKey()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `algorithm` | `number` |  |
| `algorithm_name` | `string` |  |
| `deleted` | `boolean` |  |
| `ds` | `string` |  |
| `fingerprint` | `string` |  |
| `flags` | `number` |  |
| `fqdn` | `string` |  |
| `id` | `string` |  |
| `key_href` | `string` |  |
| `message` | `string` |  |
| `public_key` | `string` |  |
| `status` | `string` |  |
| `tag` | `number` |  |

#### Example: Load

```ts
const livedns_key = await client.LivednsKey().load({ id: 'livedns_key_id', fqdn: 'fqdn' })
```

#### Example: List

```ts
const livedns_keys = await client.LivednsKey().list({ fqdn: "example" })
```

#### Example: Create

```ts
const livedns_key = await client.LivednsKey().create({
  fqdn: 'example_fqdn',
  flags: 1,
})
```


### LivednsNameserver

Create an instance: `const livedns_nameserver = client.LivednsNameserver()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Example: List

```ts
const livedns_nameservers = await client.LivednsNameserver().list({ fqdn: "example" })
```


### LivednsRecord

Create an instance: `const livedns_record = client.LivednsRecord()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `patch(data)` | Change part of an existing entity. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `add_rrset_values` | `any[]` |  |
| `id` | `string` |  |
| `message` | `string` |  |
| `remove_rrset_values` | `any[]` |  |
| `rrset_href` | `string` |  |
| `rrset_name` | `string` |  |
| `rrset_ttl` | `number` |  |
| `rrset_type` | `string` |  |
| `rrset_values` | `any[]` |  |

#### Example: Load

```ts
const livedns_record = await client.LivednsRecord().load({ fqdn: 'fqdn', rrset_name: 'rrset_name', rrset_type: 'rrset_type' })
```

#### Example: List

```ts
const livedns_records = await client.LivednsRecord().list({ fqdn: "example" })
```

#### Example: Create

```ts
const livedns_record = await client.LivednsRecord().create({
  fqdn: 'example_fqdn',
  rrset_values: [],
})
```


### LivednsRrtype

Create an instance: `const livedns_rrtype = client.LivednsRrtype()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Example: List

```ts
const livedns_rrtypes = await client.LivednsRrtype().list()
```


### LivednsSnapshot

Create an instance: `const livedns_snapshot = client.LivednsSnapshot()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `automatic` | `boolean` |  |
| `created_at` | `string` |  |
| `href` | `string` |  |
| `id` | `string` |  |
| `message` | `string` |  |
| `name` | `string` |  |
| `zone_data` | `any[]` |  |

#### Example: Load

```ts
const livedns_snapshot = await client.LivednsSnapshot().load({ id: 'livedns_snapshot_id', fqdn: 'fqdn' })
```

#### Example: List

```ts
const livedns_snapshots = await client.LivednsSnapshot().list({ fqdn: "example" })
```

#### Example: Create

```ts
const livedns_snapshot = await client.LivednsSnapshot().create({
  fqdn: 'example_fqdn',
})
```


### LivednsTsigKey

Create an instance: `const livedns_tsig_key = client.LivednsTsigKey()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `config_samples` | `Record<string, any>` |  |
| `href` | `string` |  |
| `id` | `string` |  |
| `key_name` | `string` |  |
| `secret` | `string` |  |

#### Example: Load

```ts
const livedns_tsig_key = await client.LivednsTsigKey().load({ id: 'livedns_tsig_key_id' })
```

#### Example: List

```ts
const livedns_tsig_keys = await client.LivednsTsigKey().list()
```

#### Example: Create

```ts
const livedns_tsig_key = await client.LivednsTsigKey().create({
  config_samples: {},
  href: 'example_href',
  id: 'example_id',
  key_name: 'example_key_name',
  secret: 'example_secret',
})
```


### LivednsZone

Create an instance: `const livedns_zone = client.LivednsZone()`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `items` | `any[]` |  |
| `message` | `string` |  |
| `remove_apex_ns` | `boolean` |  |


### Mailbox

Create an instance: `const mailbox = client.Mailbox()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `address` | `string` |  |
| `aliases` | `any[]` |  |
| `antispam` | `boolean` |  |
| `autorenew` | `Record<string, any>` |  |
| `config` | `Record<string, any>` |  |
| `config_name` | `string` |  |
| `created_at` | `string` |  |
| `data_access` | `boolean` |  |
| `domain_part` | `string` |  |
| `duration_month` | `number` |  |
| `email` | `string` |  |
| `expires_at` | `string` |  |
| `internal_domain` | `boolean` |  |
| `issues` | `any[]` |  |
| `last_paid_duration` | `number` |  |
| `local_part` | `string` |  |
| `message` | `string` |  |
| `owner` | `Record<string, any>` |  |
| `password` | `string` |  |
| `quota` | `number` |  |
| `quota_used` | `number` |  |
| `responder` | `Record<string, any>` |  |
| `updated_at` | `string` |  |
| `uuid` | `string` |  |

#### Example: Load

```ts
const mailbox = await client.Mailbox().load({ address: 'address' })
```

#### Example: List

```ts
const mailboxs = await client.Mailbox().list()
```

#### Example: Create

```ts
const mailbox = await client.Mailbox().create({
  config_name: 'example_config_name',
  email: 'example_email',
  password: 'example_password',
})
```


### MailboxDomain

Create an instance: `const mailbox_domain = client.MailboxDomain()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `antispam` | `boolean` |  |
| `configuration` | `any[]` |  |
| `date_last_validation` | `string` |  |
| `dkim` | `boolean` |  |
| `fqdns` | `any[]` |  |
| `internal` | `boolean` |  |
| `is_livedns` | `boolean` |  |
| `mx` | `boolean` |  |
| `owner` | `Record<string, any>` |  |
| `spf` | `boolean` |  |
| `txt` | `boolean` |  |

#### Example: Load

```ts
const mailbox_domain = await client.MailboxDomain().load({ domain: 'domain' })
```

#### Example: List

```ts
const mailbox_domains = await client.MailboxDomain().list()
```

#### Example: Create

```ts
const mailbox_domain = await client.MailboxDomain().create({
  domain: 'example_domain',
})
```


### MailboxForward

Create an instance: `const mailbox_forward = client.MailboxForward()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `destinations` | `any[]` |  |
| `message` | `string` |  |
| `source` | `string` |  |

#### Example: List

```ts
const mailbox_forwards = await client.MailboxForward().list()
```

#### Example: Create

```ts
const mailbox_forward = await client.MailboxForward().create({
  destinations: [],
  source: 'example_source',
})
```


### MailboxProduct

Create an instance: `const mailbox_product = client.MailboxProduct()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `autorenew` | `boolean` |  |
| `config` | `any[]` |  |
| `config_name` | `string` |  |
| `description` | `string` |  |
| `duration_month` | `number` |  |
| `label` | `string` |  |
| `message` | `string` |  |
| `prices` | `any[]` |  |
| `quantity` | `number` |  |
| `taxes` | `any[]` |  |
| `uuid` | `string` |  |

#### Example: List

```ts
const mailbox_products = await client.MailboxProduct().list()
```

#### Example: Create

```ts
const mailbox_product = await client.MailboxProduct().create({
  config_name: 'example_config_name',
  duration_month: 1,
  quantity: 1,
})
```


### MailboxQuota

Create an instance: `const mailbox_quota = client.MailboxQuota()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `annually` | `Record<string, any>` |  |
| `config_name` | `string` |  |
| `label` | `string` |  |
| `monthly` | `Record<string, any>` |  |
| `quota` | `string` |  |

#### Example: List

```ts
const mailbox_quotas = await client.MailboxQuota().list()
```


### MailboxSlot

Create an instance: `const mailbox_slot = client.MailboxSlot()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `autorenew` | `Record<string, any>` |  |
| `config` | `Record<string, any>` |  |
| `expires_at` | `string` |  |
| `last_paid_duration` | `number` |  |
| `refund_info` | `Record<string, any>` |  |
| `refundable` | `boolean` |  |
| `uuid` | `string` |  |
| `webhosting_pack` | `boolean` |  |

#### Example: Load

```ts
const mailbox_slot = await client.MailboxSlot().load({ uuid: 'uuid' })
```

#### Example: List

```ts
const mailbox_slots = await client.MailboxSlot().list()
```


### Organization

Create an instance: `const organization = client.Organization()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `city` | `string` |  |
| `corporate` | `boolean` |  |
| `country` | `string` |  |
| `email` | `string` |  |
| `fax` | `string` |  |
| `firstname` | `string` |  |
| `id` | `string` |  |
| `lang` | `string` |  |
| `lastname` | `string` |  |
| `message` | `string` |  |
| `name` | `string` |  |
| `orgname` | `string` |  |
| `phone` | `string` |  |
| `reference` | `string` |  |
| `reseller` | `boolean` |  |
| `siren` | `string` |  |
| `state` | `string` |  |
| `streetaddr` | `string` |  |
| `streetaddr2` | `string` |  |
| `type` | `string` |  |
| `vat_number` | `string` |  |
| `zip` | `string` |  |

#### Example: Load

```ts
const organization = await client.Organization().load({ id: 'organization_id' })
```

#### Example: List

```ts
const organizations = await client.Organization().list()
```

#### Example: Create

```ts
const organization = await client.Organization().create({
  city: 'example_city',
  email: 'example_email',
  firstname: 'example_firstname',
  lastname: 'example_lastname',
  name: 'example_name',
  orgname: 'example_orgname',
  phone: 'example_phone',
  streetaddr: 'example_streetaddr',
  type: 'example_type',
})
```


### OrganizationCustomer

Create an instance: `const organization_customer = client.OrganizationCustomer()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `city` | `string` |  |
| `country` | `string` |  |
| `email` | `string` |  |
| `fax` | `string` |  |
| `firstname` | `string` |  |
| `id` | `string` |  |
| `lang` | `string` |  |
| `lastname` | `string` |  |
| `message` | `string` |  |
| `name` | `string` |  |
| `orgname` | `string` |  |
| `phone` | `string` |  |
| `reference` | `string` |  |
| `siren` | `string` |  |
| `state` | `string` |  |
| `streetaddr` | `string` |  |
| `streetaddr2` | `string` |  |
| `sync_contact_email` | `string` |  |
| `type` | `string` |  |
| `vat_number` | `string` |  |
| `zip` | `string` |  |

#### Example: Load

```ts
const organization_customer = await client.OrganizationCustomer().load({ id: 'organization_customer_id', org_id: 'org_id' })
```

#### Example: List

```ts
const organization_customers = await client.OrganizationCustomer().list({ org_id: "example" })
```

#### Example: Create

```ts
const organization_customer = await client.OrganizationCustomer().create({
  org_id: 'example_org_id',
  city: 'example_city',
  country: 'example_country',
  email: 'example_email',
  firstname: 'example_firstname',
  lastname: 'example_lastname',
  phone: 'example_phone',
  streetaddr: 'example_streetaddr',
  type: 'example_type',
})
```


### Template

Create an instance: `const template = client.Template()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `string` |  |
| `editable` | `boolean` |  |
| `href` | `string` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `namespaces` | `any[]` |  |
| `orgname` | `string` |  |
| `payload` | `Record<string, any>` |  |
| `sharing_space` | `Record<string, any>` |  |
| `variables` | `any[]` |  |

#### Example: Load

```ts
const template = await client.Template().load({ id: 'template_id' })
```

#### Example: List

```ts
const templates = await client.Template().list()
```

#### Example: Create

```ts
const template = await client.Template().create({
  name: 'example_name',
  payload: {},
})
```


### TemplateDispatch

Create an instance: `const template_dispatch = client.TemplateDispatch()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attempt` | `number` |  |
| `created_at` | `string` |  |
| `dispatch_href` | `string` |  |
| `id` | `string` |  |
| `message` | `string` |  |
| `object_id` | `string` |  |
| `object_type` | `string` |  |
| `payload` | `Record<string, any>` |  |
| `sharing_id` | `string` |  |
| `state` | `number` |  |
| `state_msg` | `string` |  |
| `target` | `Record<string, any>` |  |
| `target_id` | `string` |  |
| `target_type` | `string` |  |
| `task_history` | `any[]` |  |
| `task_status` | `Record<string, any>` |  |
| `task_updated_at` | `string` |  |
| `template_id` | `string` |  |
| `template_name` | `string` |  |

#### Example: Load

```ts
const template_dispatch = await client.TemplateDispatch().load({ id: 'template_dispatch_id' })
```

#### Example: Create

```ts
const template_dispatch = await client.TemplateDispatch().create({
  template_id: 'example_template_id',
  object_id: 'example_object_id',
  object_type: 'example_object_type',
})
```


### Tld

Create an instance: `const tld = client.Tld()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `authinfo_for_transfer` | `boolean` |  |
| `category` | `string` |  |
| `change_owner` | `boolean` |  |
| `corporate` | `boolean` |  |
| `ext_trade` | `boolean` |  |
| `full_tld` | `string` |  |
| `href` | `string` |  |
| `lock` | `boolean` |  |
| `name` | `string` |  |

#### Example: Load

```ts
const tld = await client.Tld().load({ name: 'name' })
```

#### Example: List

```ts
const tlds = await client.Tld().list()
```


### User

Create an instance: `const user = client.User()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `city` | `string` |  |
| `country` | `string` |  |
| `email` | `string` |  |
| `fax` | `string` |  |
| `firstname` | `string` |  |
| `id` | `string` |  |
| `lang` | `string` |  |
| `lastname` | `string` |  |
| `name` | `string` |  |
| `phone` | `string` |  |
| `state` | `string` |  |
| `streetaddr` | `string` |  |
| `streetaddr2` | `string` |  |
| `username` | `string` |  |
| `zip` | `string` |  |

#### Example: Load

```ts
const user = await client.User().load({ id: 'user_id' })
```

## Features

This SDK ships 9 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`debug`](#debug) | Debug capture |
| [`idempotency`](#idempotency) | Idempotency |
| [`metrics`](#metrics) | Metrics |
| [`paging`](#paging) | Paging |
| [`ratelimit`](#ratelimit) | Rate limiting |
| [`retry`](#retry) | Retry |
| [`secrets`](#secrets) | Secrets |
| [`test`](#test) | Test transport |
| [`timeout`](#timeout) | Timeout |

> **Order matters for `ratelimit`, `retry`, `secrets`, `timeout`.** These wrap the
> transport, so each one wraps whatever is already installed: the order you
> activate them in IS the nesting order. Activating them as an ordered list
> rather than a map is what fixes that order.

### debug

Debug capture.

| Option | Default |
|---|---|
| `active` | `false` |
| `max` | `100` |
| `redact` | `['authorization', 'cookie', 'set-cookie', 'api-key', 'apikey', 'x-api-key', 'idempotency-key']` |

Set `feature.debug.active` to enable it, then override any of the options above.

### idempotency

Idempotency.

| Option | Default |
|---|---|
| `active` | `false` |
| `header` | `'Idempotency-Key'` |
| `methods` | `['POST', 'PUT', 'PATCH', 'DELETE']` |
| `ops` | `['create', 'update', 'remove']` |

Set `feature.idempotency.active` to enable it, then override any of the options above.

### metrics

Metrics.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.metrics.active` to enable it, then override any of the options above.

### paging

Paging.

| Option | Default |
|---|---|
| `active` | `false` |
| `afterVar` | `'after'` |
| `cursorParam` | `'cursor'` |
| `firstVar` | `'first'` |
| `limitParam` | `'limit'` |
| `pageParam` | `'page'` |
| `startPage` | `1` |

Set `feature.paging.active` to enable it, then override any of the options above.

### ratelimit

Rate limiting.

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

Set `feature.ratelimit.active` to enable it, then override any of the options above.

`ratelimit` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### retry

Retry.

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

Set `feature.retry.active` to enable it, then override any of the options above.

`retry` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### secrets

Secrets.

| Option | Default |
|---|---|
| `active` | `false` |
| `cache` | `true` |
| `exchange` | `{active: false, method: 'POST', path: 'auth/token', refresh: '', request: 'refresh_token', response: 'access_token', retries: 1, statuses: [401]}` |
| `name` | `'apikey'` |
| `providers` | `[]` |

Set `feature.secrets.active` to enable it, then override any of the options above.

`secrets` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### test

Test transport.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.

### timeout

Timeout.

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

Set `feature.timeout.active` to enable it, then override any of the options above.

`timeout` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **DebugFeature**: Debug capture
- **IdempotencyFeature**: Idempotency
- **MetricsFeature**: Metrics
- **PagingFeature**: Paging
- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **SecretsFeature**: Secrets
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
gandi/
├── src/
│   ├── GandiSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { GandiSDK } from '@voxgig-sdk/gandi-sdk'
```

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const livednsdomain = client.LivednsDomain()
await livednsdomain.list()

// livednsdomain.data() now returns the livednsdomain data from the last `list`
// livednsdomain.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
