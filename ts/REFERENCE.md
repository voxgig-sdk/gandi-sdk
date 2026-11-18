# Gandi TypeScript SDK Reference

Complete API reference for the Gandi TypeScript SDK.


## GandiSDK

### Constructor

```ts
new GandiSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `GandiSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = GandiSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `GandiSDK` instance in test mode.


### Instance Methods

#### `AccessToken(data?: object)`

Create a new `AccessToken` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AccessTokenEntity` instance.

#### `AcmeAccount(data?: object)`

Create a new `AcmeAccount` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AcmeAccountEntity` instance.

#### `AcmeDomain(data?: object)`

Create a new `AcmeDomain` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AcmeDomainEntity` instance.

#### `AcmePrice(data?: object)`

Create a new `AcmePrice` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AcmePriceEntity` instance.

#### `AcmeSubscription(data?: object)`

Create a new `AcmeSubscription` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AcmeSubscriptionEntity` instance.

#### `BillingInfo(data?: object)`

Create a new `BillingInfo` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BillingInfoEntity` instance.

#### `BillingPrice(data?: object)`

Create a new `BillingPrice` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BillingPriceEntity` instance.

#### `CertificateDcv(data?: object)`

Create a new `CertificateDcv` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CertificateDcvEntity` instance.

#### `CertificatePackage(data?: object)`

Create a new `CertificatePackage` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CertificatePackageEntity` instance.

#### `CertificatePem(data?: object)`

Create a new `CertificatePem` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CertificatePemEntity` instance.

#### `CertificateRenewal(data?: object)`

Create a new `CertificateRenewal` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CertificateRenewalEntity` instance.

#### `CertificateTag(data?: object)`

Create a new `CertificateTag` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CertificateTagEntity` instance.

#### `Comment(data?: object)`

Create a new `Comment` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CommentEntity` instance.

#### `Domain(data?: object)`

Create a new `Domain` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DomainEntity` instance.

#### `DomainAvailability(data?: object)`

Create a new `DomainAvailability` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DomainAvailabilityEntity` instance.

#### `DomainChangeOwner(data?: object)`

Create a new `DomainChangeOwner` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DomainChangeOwnerEntity` instance.

#### `DomainClaim(data?: object)`

Create a new `DomainClaim` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DomainClaimEntity` instance.

#### `DomainContact(data?: object)`

Create a new `DomainContact` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DomainContactEntity` instance.

#### `DomainDnskey(data?: object)`

Create a new `DomainDnskey` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DomainDnskeyEntity` instance.

#### `DomainDnssec(data?: object)`

Create a new `DomainDnssec` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DomainDnssecEntity` instance.

#### `DomainHost(data?: object)`

Create a new `DomainHost` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DomainHostEntity` instance.

#### `DomainLivedns(data?: object)`

Create a new `DomainLivedns` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DomainLivednsEntity` instance.

#### `DomainNameserver(data?: object)`

Create a new `DomainNameserver` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DomainNameserverEntity` instance.

#### `DomainTag(data?: object)`

Create a new `DomainTag` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DomainTagEntity` instance.

#### `DomainTransfer(data?: object)`

Create a new `DomainTransfer` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DomainTransferEntity` instance.

#### `DomainWebredir(data?: object)`

Create a new `DomainWebredir` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DomainWebredirEntity` instance.

#### `EmailForward(data?: object)`

Create a new `EmailForward` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `EmailForwardEntity` instance.

#### `EmailMailbox(data?: object)`

Create a new `EmailMailbox` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `EmailMailboxEntity` instance.

#### `EmailMigration(data?: object)`

Create a new `EmailMigration` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `EmailMigrationEntity` instance.

#### `EmailOffer(data?: object)`

Create a new `EmailOffer` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `EmailOfferEntity` instance.

#### `EmailSlot(data?: object)`

Create a new `EmailSlot` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `EmailSlotEntity` instance.

#### `HostingApplication(data?: object)`

Create a new `HostingApplication` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `HostingApplicationEntity` instance.

#### `HostingInstance(data?: object)`

Create a new `HostingInstance` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `HostingInstanceEntity` instance.

#### `HostingVhost(data?: object)`

Create a new `HostingVhost` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `HostingVhostEntity` instance.

#### `IssuedCertificate(data?: object)`

Create a new `IssuedCertificate` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `IssuedCertificateEntity` instance.

#### `LinkedZone(data?: object)`

Create a new `LinkedZone` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `LinkedZoneEntity` instance.

#### `LinkedZoneDeployment(data?: object)`

Create a new `LinkedZoneDeployment` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `LinkedZoneDeploymentEntity` instance.

#### `LinkedZoneDomain(data?: object)`

Create a new `LinkedZoneDomain` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `LinkedZoneDomainEntity` instance.

#### `LinkedZoneTask(data?: object)`

Create a new `LinkedZoneTask` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `LinkedZoneTaskEntity` instance.

#### `LivednsAxfrSlave(data?: object)`

Create a new `LivednsAxfrSlave` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `LivednsAxfrSlaveEntity` instance.

#### `LivednsAxfrTsig(data?: object)`

Create a new `LivednsAxfrTsig` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `LivednsAxfrTsigEntity` instance.

#### `LivednsDomain(data?: object)`

Create a new `LivednsDomain` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `LivednsDomainEntity` instance.

#### `LivednsKey(data?: object)`

Create a new `LivednsKey` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `LivednsKeyEntity` instance.

#### `LivednsNameserver(data?: object)`

Create a new `LivednsNameserver` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `LivednsNameserverEntity` instance.

#### `LivednsRecord(data?: object)`

Create a new `LivednsRecord` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `LivednsRecordEntity` instance.

#### `LivednsRrtype(data?: object)`

Create a new `LivednsRrtype` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `LivednsRrtypeEntity` instance.

#### `LivednsSnapshot(data?: object)`

Create a new `LivednsSnapshot` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `LivednsSnapshotEntity` instance.

#### `LivednsTsigKey(data?: object)`

Create a new `LivednsTsigKey` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `LivednsTsigKeyEntity` instance.

#### `LivednsZone(data?: object)`

Create a new `LivednsZone` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `LivednsZoneEntity` instance.

#### `Mailbox(data?: object)`

Create a new `Mailbox` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `MailboxEntity` instance.

#### `MailboxDomain(data?: object)`

Create a new `MailboxDomain` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `MailboxDomainEntity` instance.

#### `MailboxForward(data?: object)`

Create a new `MailboxForward` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `MailboxForwardEntity` instance.

#### `MailboxProduct(data?: object)`

Create a new `MailboxProduct` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `MailboxProductEntity` instance.

#### `MailboxQuota(data?: object)`

Create a new `MailboxQuota` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `MailboxQuotaEntity` instance.

#### `MailboxSlot(data?: object)`

Create a new `MailboxSlot` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `MailboxSlotEntity` instance.

#### `Organization(data?: object)`

Create a new `Organization` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `OrganizationEntity` instance.

#### `OrganizationCustomer(data?: object)`

Create a new `OrganizationCustomer` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `OrganizationCustomerEntity` instance.

#### `Template(data?: object)`

Create a new `Template` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `TemplateEntity` instance.

#### `TemplateDispatch(data?: object)`

Create a new `TemplateDispatch` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `TemplateDispatchEntity` instance.

#### `Tld(data?: object)`

Create a new `Tld` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `TldEntity` instance.

#### `User(data?: object)`

Create a new `User` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `UserEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |
| `fetchargs.ctrl.signal` | `AbortSignal` | Aborts the request in flight: `ok` is then `false` and `err.code` is `request_aborted`. |

**Returns:** `Promise<{ ok, status, headers, data }>`. On a failure
`ok` is `false` and `err` holds the error.

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `GandiSDK.test()`.

**Returns:** `GandiSDK` instance in test mode.

#### Cancelling a call

Every entity operation takes an optional `ctrl` object after its match or
data, and an `AbortSignal` in `ctrl.signal` cancels the request in flight.
The operation then rejects with an error whose `code` is
`request_aborted` and whose `cause` is the signal's reason. A request
whose signal has already aborted is not sent. `stream()` takes the signal
as `callopts.signal`, and ends when it aborts.


---

## AccessTokenEntity

```ts
const access_token = client.AccessToken()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `access_token` | `string` | Yes |  |
| `entities` | `any[]` | Yes |  |
| `expires_at` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `scopes` | `any[]` | Yes |  |

### Field Usage by Operation

| Field | create |
| --- | --- |
| `access_token` | - |
| `entities` | - |
| `expires_at` | Yes |
| `id` | - |
| `name` | Yes |
| `scopes` | - |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.AccessToken().create({
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AccessTokenEntity` instance with the same client and
options.

#### `client()`

Return the parent `GandiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AcmeAccountEntity

```ts
const acme_account = client.AcmeAccount()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | Yes |  |
| `deleted_at` | `string` | Yes |  |
| `external_id` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `ip` | `string` | Yes |  |
| `last_activity` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `subscription_id` | `string` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.AcmeAccount().list({ subscription_id: "example", sharing_id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.AcmeAccount().load({ id: 'acme_account_id', subscription_id: 'subscription_id', sharing_id: 'sharing_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AcmeAccountEntity` instance with the same client and
options.

#### `client()`

Return the parent `GandiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AcmeDomainEntity

```ts
const acme_domain = client.AcmeDomain()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | Yes |  |
| `deleted_at` | `string` | Yes |  |
| `hostname` | `string` | Yes |  |
| `hostname_ulabel` | `string` | Yes |  |
| `is_wildcard` | `boolean` | Yes |  |
| `status` | `string` | Yes |  |
| `subscription_id` | `string` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.AcmeDomain().list({ subscription_id: "example", domain: "example", sharing_id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.AcmeDomain().load({ domain_id: 1, subscription_id: 'subscription_id', sharing_id: 'sharing_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AcmeDomainEntity` instance with the same client and
options.

#### `client()`

Return the parent `GandiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AcmePriceEntity

```ts
const acme_price = client.AcmePrice()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `country` | `string` | Yes |  |
| `currency` | `string` | Yes |  |
| `domains` | `any[]` | Yes |  |
| `duration` | `string` | Yes |  |
| `duration_unit` | `string` | Yes |  |
| `grid` | `string` | Yes |  |
| `max_duration` | `number` | Yes |  |
| `min_duration` | `number` | Yes |  |
| `price_after_taxes` | `string` | Yes |  |
| `price_before_taxes` | `string` | Yes |  |
| `process` | `string` | Yes |  |
| `product` | `Record<string, any>` | Yes |  |
| `provider` | `string` | Yes |  |
| `tax_rate` | `string` | Yes |  |
| `taxes` | `any[]` | Yes |  |
| `validation_type` | `string` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.AcmePrice().create({
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.AcmePrice().list({ country: "example", currency: "example", duration: "example", grid: "example", process: "example", provider: "example", sharing_id: "example", validation_type: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AcmePriceEntity` instance with the same client and
options.

#### `client()`

Return the parent `GandiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AcmeSubscriptionEntity

```ts
const acme_subscription = client.AcmeSubscription()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `country` | `string` | Yes |  |
| `created_at` | `string` | Yes |  |
| `currency` | `string` | Yes |  |
| `domains` | `any[]` | Yes |  |
| `duration` | `number` | Yes |  |
| `eab_hmac` | `string` | Yes |  |
| `eab_id` | `string` | Yes |  |
| `ends_at` | `string` | Yes |  |
| `grid` | `string` | Yes |  |
| `message` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `provider` | `string` | Yes |  |
| `server_url` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `subscription_id` | `string` | Yes |  |
| `validation_type` | `string` | Yes |  |
| `years` | `string` | Yes |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `domains` | `/acme/subscriptions/{subscription_id}/domains` | `client.AcmeSubscription().update({ $action: 'domains', ... })` |

An action returns that action's OWN response, which is not necessarily a
AcmeSubscription record — check the API definition for its shape.

```ts
const result = await client.AcmeSubscription().update({
  $action: 'domains',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.AcmeSubscription().create({
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.AcmeSubscription().list({ created_at: "example", ends_at: "example", name: "example", provider: "example", sharing_id: "example", status: "example", validation_type: "example", year: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.AcmeSubscription().load({ subscription_id: 'subscription_id', sharing_id: 'sharing_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.AcmeSubscription().remove({ subscription_id: 'subscription_id', sharing_id: 'sharing_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.AcmeSubscription().update({
  subscription_id: 'subscription_id',
  sharing_id: 'sharing_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AcmeSubscriptionEntity` instance with the same client and
options.

#### `client()`

Return the parent `GandiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## BillingInfoEntity

```ts
const billing_info = client.BillingInfo()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `annual_balance` | `number` | Yes |  |
| `grid` | `string` | Yes |  |
| `outstanding_amount` | `number` | Yes |  |
| `prepaid` | `Record<string, any>` | Yes |  |
| `prepaid_monthly_invoice` | `boolean` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.BillingInfo().load({ sharing_id: 'sharing_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BillingInfoEntity` instance with the same client and
options.

#### `client()`

Return the parent `GandiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## BillingPriceEntity

```ts
const billing_price = client.BillingPrice()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `currency` | `string` | Yes |  |
| `grid` | `string` | Yes |  |
| `products` | `any[]` | Yes |  |
| `taxes` | `any[]` | Yes |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.BillingPrice().load({ type: 'type', name: [], process: [] })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BillingPriceEntity` instance with the same client and
options.

#### `client()`

Return the parent `GandiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CertificateDcvEntity

```ts
const certificate_dcv = client.CertificateDcv()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `message` | `string` | Yes |  |
| `method` | `string` | Yes |  |

### Operations

#### `patch(data: object, ctrl?: object)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Resolves to the patched entity.

```ts
const result = await client.CertificateDcv().patch({
  certificate_id: 'certificate_id',
  // Only the fields to change
})
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.CertificateDcv().update({
  certificate_id: 'certificate_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CertificateDcvEntity` instance with the same client and
options.

#### `client()`

Return the parent `GandiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CertificatePackageEntity

```ts
const certificate_package = client.CertificatePackage()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `category` | `Record<string, any>` | Yes |  |
| `href` | `string` | Yes |  |
| `max_domains` | `number` | Yes |  |
| `min_domains` | `number` | Yes |  |
| `name` | `string` | Yes |  |
| `provider` | `string` | Yes |  |
| `sgc` | `boolean` | Yes |  |
| `trustlogo` | `boolean` | Yes |  |
| `warranty` | `number` | Yes |  |
| `wildcard` | `boolean` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.CertificatePackage().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.CertificatePackage().load({ name: 'name' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CertificatePackageEntity` instance with the same client and
options.

#### `client()`

Return the parent `GandiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CertificatePemEntity

```ts
const certificate_pem = client.CertificatePem()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.CertificatePem().load({ type: 'type' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CertificatePemEntity` instance with the same client and
options.

#### `client()`

Return the parent `GandiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CertificateRenewalEntity

```ts
const certificate_renewal = client.CertificateRenewal()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `csr` | `string` | No |  |
| `dcv_method` | `string` | No |  |
| `duration` | `number` | No |  |
| `errors` | `any[]` | No |  |
| `status` | `string` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.CertificateRenewal().create({
  certificate_id: 'example_certificate_id',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CertificateRenewalEntity` instance with the same client and
options.

#### `client()`

Return the parent `GandiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CertificateTagEntity

```ts
const certificate_tag = client.CertificateTag()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `add` | `any[]` | Yes |  |
| `message` | `string` | Yes |  |
| `remove` | `any[]` | Yes |  |
| `tag` | `string` | Yes |  |
| `tags` | `any[]` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.CertificateTag().create({
  certificate_id: 'example_certificate_id',
  tag: 'example_tag',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.CertificateTag().list({ certificate_id: "example" })
```

#### `patch(data: object, ctrl?: object)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Resolves to the patched entity.

```ts
const result = await client.CertificateTag().patch({
  certificate_id: 'certificate_id',
  // Only the fields to change
})
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.CertificateTag().remove({ certificate_id: 'certificate_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.CertificateTag().update({
  certificate_id: 'certificate_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CertificateTagEntity` instance with the same client and
options.

#### `client()`

Return the parent `GandiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CommentEntity

```ts
const comment = client.Comment()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `content` | `string` | Yes |  |
| `created_at` | `string` | No |  |
| `errors` | `any[]` | No |  |
| `id` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `updated_at` | `string` | No |  |
| `user` | `Record<string, any>` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Comment().create({
  entity_id: 'example_entity_id',
  content: 'example_content',
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Comment().load({ entity_id: 'entity_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.Comment().remove({ entity_id: 'entity_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CommentEntity` instance with the same client and
options.

#### `client()`

Return the parent `GandiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DomainEntity

```ts
const domain = client.Domain()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `admin` | `Record<string, any>` | Yes |  |
| `authinfo` | `string` | No |  |
| `autorenew` | `Record<string, any>` | Yes |  |
| `bill` | `Record<string, any>` | Yes |  |
| `can_tld_lock` | `boolean` | Yes |  |
| `claims` | `string` | No |  |
| `contacts` | `Record<string, any>` | Yes |  |
| `currency` | `string` | No |  |
| `dates` | `Record<string, any>` | Yes |  |
| `domain_owner` | `string` | Yes |  |
| `duration` | `number` | No |  |
| `enforce_premium` | `boolean` | No |  |
| `errors` | `any[]` | No |  |
| `extra_parameters` | `Record<string, any>` | No |  |
| `fqdn` | `string` | Yes |  |
| `fqdn_unicode` | `string` | Yes |  |
| `href` | `string` | Yes |  |
| `id` | `string` | No |  |
| `lang` | `string` | No |  |
| `mailbox_optin` | `boolean` | No |  |
| `nameserver` | `Record<string, any>` | Yes |  |
| `nameservers` | `any[]` | Yes |  |
| `nameservers_ips` | `Record<string, any>` | No |  |
| `orga_owner` | `string` | Yes |  |
| `owner` | `Record<string, any>` | Yes |  |
| `price` | `number` | No |  |
| `reachability` | `string` | Yes |  |
| `resellee_id` | `string` | No |  |
| `services` | `any[]` | Yes |  |
| `sharing_id` | `string` | No |  |
| `sharing_space` | `Record<string, any>` | Yes |  |
| `smd` | `string` | No |  |
| `status` | `any[]` | Yes |  |
| `tags` | `any[]` | No |  |
| `tech` | `Record<string, any>` | Yes |  |
| `template_id` | `string` | No |  |
| `tld` | `string` | Yes |  |
| `tld_period` | `string` | No |  |
| `trustee_roles` | `any[]` | No |  |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `admin` | - | - | - | - | - |
| `authinfo` | - | - | - | - | - |
| `autorenew` | - | - | - | - | - |
| `bill` | - | - | - | - | - |
| `can_tld_lock` | - | - | - | - | - |
| `claims` | - | - | - | - | - |
| `contacts` | - | - | - | - | - |
| `currency` | - | - | - | - | - |
| `dates` | - | - | - | - | - |
| `domain_owner` | - | - | - | - | - |
| `duration` | - | - | - | - | - |
| `enforce_premium` | - | - | - | - | - |
| `errors` | - | - | - | - | - |
| `extra_parameters` | - | - | - | - | - |
| `fqdn` | - | - | - | - | - |
| `fqdn_unicode` | - | - | - | - | - |
| `href` | - | - | - | - | - |
| `id` | - | Yes | - | - | - |
| `lang` | - | - | - | - | - |
| `mailbox_optin` | - | - | - | - | - |
| `nameserver` | - | - | - | - | - |
| `nameservers` | - | - | Yes | - | - |
| `nameservers_ips` | - | - | - | - | - |
| `orga_owner` | - | - | - | - | - |
| `owner` | - | - | - | - | - |
| `price` | - | - | - | - | - |
| `reachability` | - | - | - | - | - |
| `resellee_id` | - | - | - | - | - |
| `services` | - | - | - | - | - |
| `sharing_id` | - | - | - | - | - |
| `sharing_space` | - | - | - | - | - |
| `smd` | - | - | - | - | - |
| `status` | - | - | - | - | - |
| `tags` | - | - | - | - | - |
| `tech` | - | - | - | - | - |
| `template_id` | - | - | - | - | - |
| `tld` | - | - | - | - | - |
| `tld_period` | - | - | - | - | - |
| `trustee_roles` | - | - | - | - | - |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `renew` | `/domain/domains/{domain}/renew` | `client.Domain().create({ $action: 'renew', ... })` |
| `restore` | `/domain/domains/{domain}/restore` | `client.Domain().create({ $action: 'restore', ... })` |
| `transferout` | `/domain/domains/{domain}/transferout` | `client.Domain().create({ $action: 'transferout', ... })` |
| `createstatus` | `/domain/domains/{domain}/createstatus` | `client.Domain().load({ $action: 'createstatus', ... })` |
| `renew` | `/domain/domains/{domain}/renew` | `client.Domain().load({ $action: 'renew', ... })` |
| `restore` | `/domain/domains/{domain}/restore` | `client.Domain().load({ $action: 'restore', ... })` |
| `authinfo` | `/domain/domains/{domain}/authinfo` | `client.Domain().update({ $action: 'authinfo', ... })` |
| `autorenew` | `/domain/domains/{domain}/autorenew` | `client.Domain().update({ $action: 'autorenew', ... })` |
| `reachability` | `/domain/domains/{domain}/reachability` | `client.Domain().update({ $action: 'reachability', ... })` |
| `status` | `/domain/domains/{domain}/status` | `client.Domain().update({ $action: 'status', ... })` |

An action returns that action's OWN response, which is not necessarily a
Domain record — check the API definition for its shape.

```ts
const result = await client.Domain().create({
  $action: 'renew',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Domain().create({
  admin: {},
  bill: {},
  fqdn: 'example_fqdn',
  owner: {},
  tech: {},
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Domain().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Domain().load({ fqdn: 'fqdn' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.Domain().remove({ fqdn: 'fqdn' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DomainEntity` instance with the same client and
options.

#### `client()`

Return the parent `GandiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DomainAvailabilityEntity

```ts
const domain_availability = client.DomainAvailability()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `currency` | `string` | Yes |  |
| `grid` | `string` | Yes |  |
| `products` | `any[]` | Yes |  |
| `taxes` | `any[]` | Yes |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.DomainAvailability().load({ name: 'name' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DomainAvailabilityEntity` instance with the same client and
options.

#### `client()`

Return the parent `GandiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DomainChangeOwnerEntity

```ts
const domain_change_owner = client.DomainChangeOwner()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `admin` | `Record<string, any>` | Yes |  |
| `bill` | `Record<string, any>` | Yes |  |
| `created_at` | `string` | Yes |  |
| `date_start` | `string` | No |  |
| `errors` | `any[]` | No |  |
| `errortype` | `string` | No |  |
| `errortype_label` | `string` | No |  |
| `foa` | `any[]` | No |  |
| `inner_step` | `string` | No |  |
| `owner` | `Record<string, any>` | Yes |  |
| `params` | `Record<string, any>` | Yes |  |
| `status` | `string` | Yes |  |
| `step` | `string` | Yes |  |
| `step_nb` | `number` | Yes |  |
| `tech` | `Record<string, any>` | Yes |  |
| `updated_at` | `string` | Yes |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `foa` | `/domain/changeowner/{domain}/foa` | `client.DomainChangeOwner().create({ $action: 'foa', ... })` |

An action returns that action's OWN response, which is not necessarily a
DomainChangeOwner record — check the API definition for its shape.

```ts
const result = await client.DomainChangeOwner().create({
  $action: 'foa',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.DomainChangeOwner().create({
  domain: 'example_domain',
  admin: {},
  bill: {},
  owner: {},
  tech: {},
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.DomainChangeOwner().load({ domain: 'domain' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DomainChangeOwnerEntity` instance with the same client and
options.

#### `client()`

Return the parent `GandiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DomainClaimEntity

```ts
const domain_claim = client.DomainClaim()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `claims` | `any[]` | Yes |  |
| `created_at` | `string` | Yes |  |
| `expires_at` | `string` | Yes |  |
| `fqdn` | `string` | Yes |  |
| `fqdn_alabel` | `string` | Yes |  |
| `fqdn_ulabel` | `string` | Yes |  |
| `notice_id` | `string` | Yes |  |
| `status` | `string` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.DomainClaim().create({
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

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.DomainClaim().load({ domain: 'domain' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DomainClaimEntity` instance with the same client and
options.

#### `client()`

Return the parent `GandiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DomainContactEntity

```ts
const domain_contact = client.DomainContact()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `admin` | `Record<string, any>` | Yes |  |
| `bill` | `Record<string, any>` | Yes |  |
| `message` | `string` | Yes |  |
| `owner` | `Record<string, any>` | Yes |  |
| `tech` | `Record<string, any>` | Yes |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `owner` | `/domain/domains/{domain}/contacts/owner` | `client.DomainContact().update({ $action: 'owner', ... })` |

An action returns that action's OWN response, which is not necessarily a
DomainContact record — check the API definition for its shape.

```ts
const result = await client.DomainContact().update({
  $action: 'owner',
  /* ...the action's own arguments */
})
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.DomainContact().load({ domain: 'domain' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.DomainContact().update({
  domain: 'domain',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DomainContactEntity` instance with the same client and
options.

#### `client()`

Return the parent `GandiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DomainDnskeyEntity

```ts
const domain_dnskey = client.DomainDnskey()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `algorithm` | `number` | Yes |  |
| `digest` | `string` | Yes |  |
| `digest_type` | `number` | Yes |  |
| `href` | `string` | Yes |  |
| `id` | `number` | Yes |  |
| `keys` | `any[]` | Yes |  |
| `keytag` | `number` | Yes |  |
| `message` | `string` | Yes |  |
| `public_key` | `string` | Yes |  |
| `type` | `string` | Yes |  |

### Field Usage by Operation

| Field | list | create | update | remove |
| --- | --- | --- | --- | --- |
| `algorithm` | - | - | - | - |
| `digest` | - | - | - | - |
| `digest_type` | - | - | - | - |
| `href` | - | - | - | - |
| `id` | - | - | - | - |
| `keys` | - | - | - | - |
| `keytag` | - | - | - | - |
| `message` | - | - | - | - |
| `public_key` | Yes | - | - | - |
| `type` | - | - | - | - |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.DomainDnskey().create({
  domain: 'example_domain',
  algorithm: 1,
  public_key: 'example_public_key',
  type: 'example_type',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.DomainDnskey().list({ domain: "example" })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.DomainDnskey().remove({ id: 'domain_dnskey_id', domain: 'domain' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.DomainDnskey().update({
  domain: 'domain',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DomainDnskeyEntity` instance with the same client and
options.

#### `client()`

Return the parent `GandiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DomainDnssecEntity

```ts
const domain_dnssec = client.DomainDnssec()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `error` | `string` | No |  |
| `state` | `string` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.DomainDnssec().create({
  domain: 'example_domain',
  state: 'example_state',
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.DomainDnssec().load({ domain: 'domain' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.DomainDnssec().remove({ domain: 'domain' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DomainDnssecEntity` instance with the same client and
options.

#### `client()`

Return the parent `GandiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DomainHostEntity

```ts
const domain_host = client.DomainHost()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `fqdn` | `string` | Yes |  |
| `fqdn_unicode` | `string` | Yes |  |
| `href` | `string` | Yes |  |
| `ips` | `any[]` | Yes |  |
| `message` | `string` | Yes |  |
| `name` | `string` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.DomainHost().create({
  domain: 'example_domain',
  ips: [],
  name: 'example_name',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.DomainHost().list({ domain: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.DomainHost().load({ domain: 'domain', name: 'name' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.DomainHost().remove({ domain: 'domain', name: 'name' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.DomainHost().update({
  domain: 'domain',
  name: 'name',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DomainHostEntity` instance with the same client and
options.

#### `client()`

Return the parent `GandiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DomainLivednsEntity

```ts
const domain_livedns = client.DomainLivedns()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `current` | `string` | Yes |  |
| `dnssec_available` | `boolean` | No |  |
| `livednssec_available` | `boolean` | No |  |
| `message` | `string` | Yes |  |
| `nameservers` | `any[]` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.DomainLivedns().create({
  domain: 'example_domain',
  current: 'example_current',
  message: 'example_message',
  nameservers: [],
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.DomainLivedns().load({ domain: 'domain' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DomainLivednsEntity` instance with the same client and
options.

#### `client()`

Return the parent `GandiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DomainNameserverEntity

```ts
const domain_nameserver = client.DomainNameserver()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `message` | `string` | Yes |  |
| `nameservers` | `any[]` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.DomainNameserver().list({ domain: "example" })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.DomainNameserver().update({
  domain: 'domain',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DomainNameserverEntity` instance with the same client and
options.

#### `client()`

Return the parent `GandiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DomainTagEntity

```ts
const domain_tag = client.DomainTag()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `add` | `any[]` | Yes |  |
| `message` | `string` | Yes |  |
| `remove` | `any[]` | Yes |  |
| `tag` | `string` | Yes |  |
| `tags` | `any[]` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.DomainTag().create({
  domain: 'example_domain',
  tag: 'example_tag',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.DomainTag().list({ domain: "example" })
```

#### `patch(data: object, ctrl?: object)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Resolves to the patched entity.

```ts
const result = await client.DomainTag().patch({
  domain: 'domain',
  // Only the fields to change
})
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.DomainTag().remove({ domain: 'domain' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.DomainTag().update({
  domain: 'domain',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DomainTagEntity` instance with the same client and
options.

#### `client()`

Return the parent `GandiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DomainTransferEntity

```ts
const domain_transfer = client.DomainTransfer()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `admin` | `Record<string, any>` | Yes |  |
| `authinfo` | `string` | No |  |
| `bill` | `Record<string, any>` | Yes |  |
| `change_owner` | `boolean` | No |  |
| `created_at` | `string` | Yes |  |
| `currency` | `string` | No |  |
| `duration` | `number` | No |  |
| `enforce_premium` | `boolean` | No |  |
| `errors` | `any[]` | No |  |
| `errortype` | `string` | No |  |
| `errortype_label` | `string` | No |  |
| `extra_parameters` | `Record<string, any>` | No |  |
| `foa` | `any[]` | No |  |
| `fqdn` | `string` | Yes |  |
| `inner_step` | `string` | No |  |
| `mailbox_optin` | `boolean` | No |  |
| `message` | `string` | Yes |  |
| `nameservers` | `any[]` | No |  |
| `nameservers_ips` | `Record<string, any>` | No |  |
| `owner` | `Record<string, any>` | Yes |  |
| `owner_contact` | `string` | Yes |  |
| `params` | `Record<string, any>` | Yes |  |
| `price` | `number` | No |  |
| `regac_at` | `string` | No |  |
| `resellee_id` | `string` | No |  |
| `start_at` | `string` | No |  |
| `status` | `string` | Yes |  |
| `step` | `string` | Yes |  |
| `step_nb` | `number` | Yes |  |
| `tech` | `Record<string, any>` | Yes |  |
| `template_id` | `string` | No |  |
| `transfer_link` | `string` | No |  |
| `transfer_procedure` | `string` | No |  |
| `updated_at` | `string` | Yes |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `available` | `/domain/transferin/{domain}/available` | `client.DomainTransfer().create({ $action: 'available', ... })` |
| `foa` | `/domain/transferin/{domain}/foa` | `client.DomainTransfer().create({ $action: 'foa', ... })` |
| `authinfo` | `/domain/transferin/{domain}/authinfo` | `client.DomainTransfer().update({ $action: 'authinfo', ... })` |

An action returns that action's OWN response, which is not necessarily a
DomainTransfer record — check the API definition for its shape.

```ts
const result = await client.DomainTransfer().create({
  $action: 'available',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.DomainTransfer().create({
  admin: {},
  bill: {},
  fqdn: 'example_fqdn',
  owner: {},
  tech: {},
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.DomainTransfer().load({ domain: 'domain' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.DomainTransfer().update({
  domain: 'domain',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DomainTransferEntity` instance with the same client and
options.

#### `client()`

Return the parent `GandiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DomainWebredirEntity

```ts
const domain_webredir = client.DomainWebredir()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cert_status` | `string` | No |  |
| `cert_uuid` | `string` | No |  |
| `created_at` | `string` | No |  |
| `host` | `string` | Yes |  |
| `message` | `string` | Yes |  |
| `override` | `boolean` | Yes |  |
| `protocol` | `string` | No |  |
| `type` | `string` | Yes |  |
| `updated_at` | `string` | No |  |
| `url` | `string` | Yes |  |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `cert_status` | - | - | - | - | - |
| `cert_uuid` | - | - | - | - | - |
| `created_at` | - | - | - | - | - |
| `host` | - | - | - | - | - |
| `message` | - | - | - | - | - |
| `override` | - | - | - | Yes | - |
| `protocol` | - | - | Yes | - | - |
| `type` | - | - | - | Yes | - |
| `updated_at` | - | - | - | - | - |
| `url` | - | - | - | Yes | - |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.DomainWebredir().create({
  domain: 'example_domain',
  host: 'example_host',
  override: true,
  protocol: 'example_protocol',
  type: 'example_type',
  url: 'example_url',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.DomainWebredir().list({ domain: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.DomainWebredir().load({ domain: 'domain', host: 'host' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.DomainWebredir().remove({ domain: 'domain', host: 'host' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.DomainWebredir().update({
  domain: 'domain',
  host: 'host',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DomainWebredirEntity` instance with the same client and
options.

#### `client()`

Return the parent `GandiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## EmailForwardEntity

```ts
const email_forward = client.EmailForward()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `destinations` | `any[]` | Yes |  |
| `href` | `string` | Yes |  |
| `id` | `string` | No |  |
| `message` | `string` | Yes |  |
| `source` | `string` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.EmailForward().create({
  domain: 'example_domain',
  destinations: [],
  source: 'example_source',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.EmailForward().list({ domain: "example" })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.EmailForward().remove({ domain: 'domain', source: 'source' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.EmailForward().update({
  domain: 'domain',
  source: 'source',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `EmailForwardEntity` instance with the same client and
options.

#### `client()`

Return the parent `GandiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## EmailMailboxEntity

```ts
const email_mailbox = client.EmailMailbox()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | `string` | Yes |  |
| `alias_count` | `number` | No |  |
| `aliases` | `any[]` | Yes |  |
| `antispam` | `boolean` | Yes |  |
| `autorenew` | `Record<string, any>` | Yes |  |
| `domain` | `string` | Yes |  |
| `errors` | `any[]` | No |  |
| `expires_at` | `string` | Yes |  |
| `fallback_email` | `string` | No |  |
| `href` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `login` | `string` | Yes |  |
| `mailbox_type` | `string` | Yes |  |
| `message` | `string` | Yes |  |
| `password` | `string` | Yes |  |
| `quota_used` | `number` | Yes |  |
| `responder` | `Record<string, any>` | No |  |
| `status` | `string` | Yes |  |
| `to_convert` | `boolean` | Yes |  |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `address` | - | - | - | - | - |
| `alias_count` | - | Yes | - | - | - |
| `aliases` | - | - | Yes | Yes | - |
| `antispam` | - | - | Yes | Yes | - |
| `autorenew` | - | - | - | - | - |
| `domain` | - | - | - | - | - |
| `errors` | - | - | - | - | - |
| `expires_at` | - | - | - | - | - |
| `fallback_email` | - | - | - | - | - |
| `href` | - | - | - | - | - |
| `id` | - | - | - | - | - |
| `login` | - | - | - | Yes | - |
| `mailbox_type` | - | - | - | Yes | - |
| `message` | - | - | - | - | - |
| `password` | - | - | - | Yes | - |
| `quota_used` | - | - | - | - | - |
| `responder` | - | - | - | - | - |
| `status` | - | - | - | - | - |
| `to_convert` | - | - | - | - | - |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `renew` | `/email/mailboxes/{domain}/{email}/renew` | `client.EmailMailbox().create({ $action: 'renew', ... })` |
| `renew_all` | `/email/mailboxes/{domain}/renew` | `client.EmailMailbox().create({ $action: 'renew_all', ... })` |
| `purge` | `/email/mailboxes/{domain}/{mailbox_id}/contents` | `client.EmailMailbox().remove({ $action: 'purge', ... })` |

An action returns that action's OWN response, which is not necessarily a
EmailMailbox record — check the API definition for its shape.

```ts
const result = await client.EmailMailbox().create({
  $action: 'renew',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.EmailMailbox().create({
  domain: 'example_domain',
  login: 'example_login',
  mailbox_type: 'example_mailbox_type',
  password: 'example_password',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.EmailMailbox().list({ domain: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.EmailMailbox().load({ id: 'email_mailbox_id', domain: 'domain' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.EmailMailbox().remove({ id: 'email_mailbox_id', domain: 'domain' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.EmailMailbox().update({
  id: 'email_mailbox_id',
  domain: 'domain',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `EmailMailboxEntity` instance with the same client and
options.

#### `client()`

Return the parent `GandiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## EmailMigrationEntity

```ts
const email_migration = client.EmailMigration()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `available` | `boolean` | Yes |  |
| `currency` | `string` | Yes |  |
| `forward_count` | `number` | Yes |  |
| `free_mailboxes` | `number` | Yes |  |
| `included_mailboxes` | `number` | Yes |  |
| `info` | `any[]` | Yes |  |
| `message` | `string` | Yes |  |
| `packmail` | `boolean` | Yes |  |
| `price_v1` | `number` | Yes |  |
| `price_v2` | `number` | Yes |  |
| `quota_v1` | `number` | Yes |  |
| `token` | `string` | Yes |  |
| `usage_v1` | `number` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.EmailMigration().create({
  domain: 'example_domain',
  token: 'example_token',
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.EmailMigration().load({ domain: 'domain' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `EmailMigrationEntity` instance with the same client and
options.

#### `client()`

Return the parent `GandiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## EmailOfferEntity

```ts
const email_offer = client.EmailOffer()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `antispam` | `string` | Yes |  |
| `dkim` | `string` | Yes |  |
| `message` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `version` | `number` | Yes |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.EmailOffer().load({ domain: 'domain' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.EmailOffer().update({
  domain: 'domain',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `EmailOfferEntity` instance with the same client and
options.

#### `client()`

Return the parent `GandiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## EmailSlotEntity

```ts
const email_slot = client.EmailSlot()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `autorenew` | `boolean` | No |  |
| `capacity` | `number` | Yes |  |
| `created_at` | `string` | Yes |  |
| `duration` | `number` | Yes |  |
| `gandi_id` | `number` | Yes |  |
| `href` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `mailbox_type` | `string` | Yes |  |
| `refund_amount` | `number` | No |  |
| `refund_currency` | `string` | No |  |
| `refundable` | `boolean` | Yes |  |
| `status` | `string` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.EmailSlot().create({
  domain: 'example_domain',
  duration: 1,
  mailbox_type: 'example_mailbox_type',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.EmailSlot().list({ domain: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.EmailSlot().load({ id: 1, domain: 'domain' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.EmailSlot().remove({ id: 1, domain: 'domain' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `EmailSlotEntity` instance with the same client and
options.

#### `client()`

Return the parent `GandiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## HostingApplicationEntity

```ts
const hosting_application = client.HostingApplication()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `string` | Yes |  |
| `name_label` | `string` | Yes |  |
| `requirements` | `any[]` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.HostingApplication().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.HostingApplication().load({ name: 'name' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `HostingApplicationEntity` instance with the same client and
options.

#### `client()`

Return the parent `GandiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## HostingInstanceEntity

```ts
const hosting_instance = client.HostingInstance()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `access_information` | `Record<string, any>` | Yes |  |
| `authentication` | `Record<string, any>` | Yes |  |
| `autorenew` | `Record<string, any>` | Yes |  |
| `available_upgrade` | `boolean` | Yes |  |
| `booster` | `Record<string, any>` | No |  |
| `booster_options` | `Record<string, any>` | No |  |
| `compatible_applications` | `any[]` | No |  |
| `console` | `Record<string, any>` | Yes |  |
| `cpu` | `number` | Yes |  |
| `created_at` | `string` | Yes |  |
| `database` | `Record<string, any>` | Yes |  |
| `datacenter` | `Record<string, any>` | Yes |  |
| `domain` | `string` | No |  |
| `duration` | `number` | No |  |
| `duration_unit` | `string` | No |  |
| `errors` | `any[]` | No |  |
| `expire_at` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `language` | `Record<string, any>` | Yes |  |
| `language_id` | `string` | No |  |
| `location` | `string` | Yes |  |
| `message` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `password` | `string` | No |  |
| `password_updated_at` | `string` | No |  |
| `ram` | `Record<string, any>` | Yes |  |
| `sharing_space` | `Record<string, any>` | Yes |  |
| `size` | `string` | Yes |  |
| `snapshot_enabled` | `boolean` | Yes |  |
| `status` | `string` | Yes |  |
| `storage` | `Record<string, any>` | Yes |  |
| `storage_additional_size` | `number` | No |  |
| `subscription_cancelled` | `boolean` | No |  |
| `type` | `Record<string, any>` | Yes |  |
| `upgrade_to` | `any[]` | No |  |
| `vhosts` | `any[]` | Yes |  |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `access_information` | - | - | - | - | - |
| `authentication` | - | - | - | - | - |
| `autorenew` | - | - | Yes | - | - |
| `available_upgrade` | - | - | - | - | - |
| `booster` | - | - | - | - | - |
| `booster_options` | - | - | - | - | - |
| `compatible_applications` | - | - | - | - | - |
| `console` | - | - | - | - | - |
| `cpu` | - | - | - | - | - |
| `created_at` | - | - | - | - | - |
| `database` | - | - | - | - | - |
| `datacenter` | - | - | - | - | - |
| `domain` | - | - | Yes | - | - |
| `duration` | - | - | - | - | - |
| `duration_unit` | - | - | - | - | - |
| `errors` | - | - | - | - | - |
| `expire_at` | - | - | - | - | - |
| `id` | - | - | - | - | - |
| `language` | - | - | - | - | - |
| `language_id` | - | - | - | - | - |
| `location` | - | - | - | - | - |
| `message` | - | - | - | - | - |
| `name` | - | - | Yes | Yes | - |
| `password` | - | - | - | - | - |
| `password_updated_at` | - | - | - | - | - |
| `ram` | - | - | - | - | - |
| `sharing_space` | - | - | - | - | - |
| `size` | - | - | - | Yes | - |
| `snapshot_enabled` | - | - | Yes | Yes | - |
| `status` | - | - | - | - | - |
| `storage` | - | - | - | - | - |
| `storage_additional_size` | - | - | - | - | - |
| `subscription_cancelled` | - | - | - | - | - |
| `type` | - | - | - | - | - |
| `upgrade_to` | - | - | - | - | - |
| `vhosts` | - | - | Yes | - | - |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `action` | `/simplehosting/instances/{instance_id}/action` | `client.HostingInstance().create({ $action: 'action', ... })` |
| `usage` | `/simplehosting/instances/{instance_id}/usage` | `client.HostingInstance().load({ $action: 'usage', ... })` |

An action returns that action's OWN response, which is not necessarily a
HostingInstance record — check the API definition for its shape.

```ts
const result = await client.HostingInstance().create({
  $action: 'action',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.HostingInstance().create({
  authentication: {},
  domain: 'example_domain',
  location: 'example_location',
  size: 'example_size',
  type: {},
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.HostingInstance().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.HostingInstance().load({ id: 'hosting_instance_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.HostingInstance().remove({ id: 'hosting_instance_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.HostingInstance().update({
  id: 'hosting_instance_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `HostingInstanceEntity` instance with the same client and
options.

#### `client()`

Return the parent `GandiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## HostingVhostEntity

```ts
const hosting_vhost = client.HostingVhost()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `application` | `Record<string, any>` | Yes |  |
| `created_at` | `string` | Yes |  |
| `deployment` | `Record<string, any>` | Yes |  |
| `fqdn` | `string` | Yes |  |
| `https_strategy` | `string` | No |  |
| `is_a_test_vhost` | `boolean` | Yes |  |
| `linked_dns_zone` | `Record<string, any>` | Yes |  |
| `status` | `string` | Yes |  |
| `tls_validated_at` | `string` | No |  |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `application` | - | - | - | - | - |
| `created_at` | - | - | - | - | - |
| `deployment` | - | - | - | - | - |
| `fqdn` | - | - | - | - | - |
| `https_strategy` | - | - | Yes | - | - |
| `is_a_test_vhost` | - | - | - | - | - |
| `linked_dns_zone` | - | - | - | - | - |
| `status` | - | - | - | - | - |
| `tls_validated_at` | - | - | - | - | - |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `cache` | `/simplehosting/instances/{instance_id}/vhosts/{vhost_fqdn}/cache` | `client.HostingVhost().remove({ $action: 'cache', ... })` |

An action returns that action's OWN response, which is not necessarily a
HostingVhost record — check the API definition for its shape.

```ts
const result = await client.HostingVhost().remove({
  $action: 'cache',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.HostingVhost().create({
  instance_id: 'example_instance_id',
  application: {},
  fqdn: 'example_fqdn',
  linked_dns_zone: {},
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.HostingVhost().list({ instance_id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.HostingVhost().load({ fqdn: 'fqdn', instance_id: 'instance_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.HostingVhost().remove({ fqdn: 'fqdn', instance_id: 'instance_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.HostingVhost().update({
  fqdn: 'fqdn',
  instance_id: 'instance_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `HostingVhostEntity` instance with the same client and
options.

#### `client()`

Return the parent `GandiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## IssuedCertificateEntity

```ts
const issued_certificate = client.IssuedCertificate()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `altnames` | `any[]` | Yes |  |
| `altnames_unicode` | `any[]` | Yes |  |
| `apex_only` | `boolean` | No |  |
| `assumed_name` | `string` | No |  |
| `business_category` | `string` | No |  |
| `card_pay_trustlogo` | `boolean` | No |  |
| `cert` | `string` | No |  |
| `cn` | `string` | Yes |  |
| `cn_unicode` | `string` | Yes |  |
| `contact` | `Record<string, any>` | Yes |  |
| `csr` | `string` | No |  |
| `dates` | `Record<string, any>` | Yes |  |
| `dcv_method` | `string` | No |  |
| `duration` | `number` | No |  |
| `error_msg` | `string` | No |  |
| `errors` | `any[]` | No |  |
| `href` | `string` | No |  |
| `id` | `string` | Yes |  |
| `ida` | `Record<string, any>` | No |  |
| `intermediate` | `string` | No |  |
| `joi` | `Record<string, any>` | No |  |
| `middleman` | `Record<string, any>` | No |  |
| `owner` | `string` | No |  |
| `package` | `Record<string, any>` | Yes |  |
| `provider` | `string` | Yes |  |
| `reissuable` | `boolean` | No |  |
| `renewable` | `boolean` | No |  |
| `resellee_id` | `string` | No |  |
| `sha_version` | `number` | No |  |
| `sharing_id` | `string` | No |  |
| `software` | `number` | Yes |  |
| `state` | `string` | No |  |
| `state_detail` | `string` | No |  |
| `status` | `string` | Yes |  |
| `step_nb` | `number` | No |  |
| `stored` | `boolean` | No |  |
| `tags` | `any[]` | No |  |
| `trustlogo` | `boolean` | No |  |
| `trustlogo_token` | `Record<string, any>` | No |  |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `altnames` | - | - | Yes | Yes | - |
| `altnames_unicode` | - | - | - | - | - |
| `apex_only` | - | - | - | - | - |
| `assumed_name` | - | - | - | - | - |
| `business_category` | - | - | - | - | - |
| `card_pay_trustlogo` | - | - | - | - | - |
| `cert` | - | - | - | - | - |
| `cn` | - | - | Yes | - | - |
| `cn_unicode` | - | - | - | - | - |
| `contact` | - | - | - | - | - |
| `csr` | - | - | - | - | - |
| `dates` | - | - | - | - | - |
| `dcv_method` | - | - | - | - | - |
| `duration` | - | - | - | - | - |
| `error_msg` | - | - | - | - | - |
| `errors` | - | - | - | - | - |
| `href` | - | - | - | - | - |
| `id` | - | - | - | - | - |
| `ida` | - | - | - | - | - |
| `intermediate` | - | - | - | - | - |
| `joi` | - | - | - | - | - |
| `middleman` | - | - | - | - | - |
| `owner` | - | - | - | - | - |
| `package` | - | - | - | - | - |
| `provider` | - | - | - | - | - |
| `reissuable` | - | - | - | - | - |
| `renewable` | - | - | - | - | - |
| `resellee_id` | - | - | - | - | - |
| `sha_version` | - | - | - | - | - |
| `sharing_id` | - | - | - | - | - |
| `software` | - | - | - | - | - |
| `state` | - | - | - | - | - |
| `state_detail` | - | - | - | - | - |
| `status` | - | - | - | - | - |
| `step_nb` | - | - | - | - | - |
| `stored` | - | - | - | - | - |
| `tags` | - | - | - | - | - |
| `trustlogo` | - | - | - | - | - |
| `trustlogo_token` | - | - | - | - | - |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `dcv_params` | `/certificate/issued-certs/{id}/dcv_params` | `client.IssuedCertificate().create({ $action: 'dcv_params', ... })` |
| `dcv_params` | `/certificate/dcv_params` | `client.IssuedCertificate().create({ $action: 'dcv_params', ... })` |
| `crt` | `/certificate/issued-certs/{id}/crt` | `client.IssuedCertificate().load({ $action: 'crt', ... })` |

An action returns that action's OWN response, which is not necessarily a
IssuedCertificate record — check the API definition for its shape.

```ts
const result = await client.IssuedCertificate().create({
  $action: 'dcv_params',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.IssuedCertificate().create({
  package: {},
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.IssuedCertificate().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.IssuedCertificate().load({ id: 'issued_certificate_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.IssuedCertificate().remove({ id: 'issued_certificate_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.IssuedCertificate().update({
  id: 'issued_certificate_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `IssuedCertificateEntity` instance with the same client and
options.

#### `client()`

Return the parent `GandiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## LinkedZoneEntity

```ts
const linked_zone = client.LinkedZone()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | Yes |  |
| `default_records` | `boolean` | Yes |  |
| `domain_count` | `number` | Yes |  |
| `domains` | `any[]` | No |  |
| `id` | `string` | Yes |  |
| `message` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `record_list` | `any[]` | No |  |
| `record_text` | `string` | No |  |
| `records` | `any[]` | No |  |
| `sharing_space` | `Record<string, any>` | Yes |  |
| `status` | `string` | Yes |  |
| `updated_at` | `string` | No |  |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `created_at` | - | - | - | - | - |
| `default_records` | - | - | Yes | Yes | - |
| `domain_count` | - | - | - | - | - |
| `domains` | - | - | - | - | - |
| `id` | - | - | - | - | - |
| `message` | - | - | - | - | - |
| `name` | - | - | - | Yes | - |
| `record_list` | - | - | - | - | - |
| `record_text` | - | - | - | - | - |
| `records` | - | - | - | - | - |
| `sharing_space` | - | - | - | - | - |
| `status` | - | - | - | - | - |
| `updated_at` | - | - | - | - | - |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.LinkedZone().create({
  name: 'example_name',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.LinkedZone().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.LinkedZone().load({ id: 'linked_zone_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.LinkedZone().remove({ id: 'linked_zone_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.LinkedZone().update({
  id: 'linked_zone_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `LinkedZoneEntity` instance with the same client and
options.

#### `client()`

Return the parent `GandiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## LinkedZoneDeploymentEntity

```ts
const linked_zone_deployment = client.LinkedZoneDeployment()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deploy` | `boolean` | Yes |  |
| `message` | `string` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.LinkedZoneDeployment().create({
  zone_id: 'example_zone_id',
  deploy: true,
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `LinkedZoneDeploymentEntity` instance with the same client and
options.

#### `client()`

Return the parent `GandiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## LinkedZoneDomainEntity

```ts
const linked_zone_domain = client.LinkedZoneDomain()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deployed` | `boolean` | Yes |  |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `owner` | `string` | Yes |  |
| `zone` | `Record<string, any>` | Yes |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `link` | `/linkedzone/zones/{zone_id}/link/domains` | `client.LinkedZoneDomain().update({ $action: 'link', ... })` |
| `unlink` | `/linkedzone/unlink/domains` | `client.LinkedZoneDomain().update({ $action: 'unlink', ... })` |

An action returns that action's OWN response, which is not necessarily a
LinkedZoneDomain record — check the API definition for its shape.

```ts
const result = await client.LinkedZoneDomain().update({
  $action: 'link',
  /* ...the action's own arguments */
})
```

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.LinkedZoneDomain().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.LinkedZoneDomain().load({ name: 'name' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `LinkedZoneDomainEntity` instance with the same client and
options.

#### `client()`

Return the parent `GandiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## LinkedZoneTaskEntity

```ts
const linked_zone_task = client.LinkedZoneTask()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | Yes |  |
| `ending_at` | `string` | No |  |
| `id` | `string` | Yes |  |
| `result` | `Record<string, any>` | Yes |  |
| `status` | `string` | Yes |  |
| `type` | `string` | Yes |  |
| `updated_at` | `string` | No |  |
| `zone_id` | `string` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.LinkedZoneTask().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.LinkedZoneTask().load({ id: 'linked_zone_task_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `LinkedZoneTaskEntity` instance with the same client and
options.

#### `client()`

Return the parent `GandiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## LivednsAxfrSlaveEntity

```ts
const livedns_axfr_slave = client.LivednsAxfrSlave()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `message` | `string` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.LivednsAxfrSlave().list({ fqdn: "example" })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.LivednsAxfrSlave().remove({ fqdn: 'fqdn', ip: 'ip' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.LivednsAxfrSlave().update({
  fqdn: 'fqdn',
  ip: 'ip',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `LivednsAxfrSlaveEntity` instance with the same client and
options.

#### `client()`

Return the parent `GandiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## LivednsAxfrTsigEntity

```ts
const livedns_axfr_tsig = client.LivednsAxfrTsig()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `href` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `key_name` | `string` | Yes |  |
| `message` | `string` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.LivednsAxfrTsig().list({ fqdn: "example" })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.LivednsAxfrTsig().remove({ id: 'livedns_axfr_tsig_id', fqdn: 'fqdn' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.LivednsAxfrTsig().update({
  id: 'livedns_axfr_tsig_id',
  fqdn: 'fqdn',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `LivednsAxfrTsigEntity` instance with the same client and
options.

#### `client()`

Return the parent `GandiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## LivednsDomainEntity

```ts
const livedns_domain = client.LivednsDomain()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `automatic_snapshots` | `boolean` | Yes |  |
| `domain_href` | `string` | Yes |  |
| `domain_keys_href` | `string` | Yes |  |
| `domain_records_href` | `string` | Yes |  |
| `fqdn` | `string` | Yes |  |
| `message` | `string` | Yes |  |
| `zone` | `Record<string, any>` | No |  |

### Field Usage by Operation

| Field | load | list | create | update |
| --- | --- | --- | --- | --- |
| `automatic_snapshots` | - | - | - | Yes |
| `domain_href` | - | - | - | - |
| `domain_keys_href` | - | - | - | - |
| `domain_records_href` | - | - | - | - |
| `fqdn` | - | - | - | - |
| `message` | - | - | - | - |
| `zone` | - | - | - | - |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.LivednsDomain().create({
  fqdn: 'example_fqdn',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.LivednsDomain().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.LivednsDomain().load({ fqdn: 'fqdn' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.LivednsDomain().update({
  fqdn: 'fqdn',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `LivednsDomainEntity` instance with the same client and
options.

#### `client()`

Return the parent `GandiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## LivednsKeyEntity

```ts
const livedns_key = client.LivednsKey()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `algorithm` | `number` | Yes |  |
| `algorithm_name` | `string` | Yes |  |
| `deleted` | `boolean` | Yes |  |
| `ds` | `string` | Yes |  |
| `fingerprint` | `string` | Yes |  |
| `flags` | `number` | Yes |  |
| `fqdn` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `key_href` | `string` | Yes |  |
| `message` | `string` | Yes |  |
| `public_key` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `tag` | `number` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.LivednsKey().create({
  fqdn: 'example_fqdn',
  flags: 1,
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.LivednsKey().list({ fqdn: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.LivednsKey().load({ id: 'livedns_key_id', fqdn: 'fqdn' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.LivednsKey().remove({ id: 'livedns_key_id', fqdn: 'fqdn' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.LivednsKey().update({
  id: 'livedns_key_id',
  fqdn: 'fqdn',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `LivednsKeyEntity` instance with the same client and
options.

#### `client()`

Return the parent `GandiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## LivednsNameserverEntity

```ts
const livedns_nameserver = client.LivednsNameserver()
```

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `generic` | `/livedns/nameservers/{fqdn}` | `client.LivednsNameserver().list({ $action: 'generic', ... })` |

An action returns that action's OWN response, which is not necessarily a
LivednsNameserver record — check the API definition for its shape.

```ts
const result = await client.LivednsNameserver().list({
  $action: 'generic',
  /* ...the action's own arguments */
})
```

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.LivednsNameserver().list({ fqdn: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `LivednsNameserverEntity` instance with the same client and
options.

#### `client()`

Return the parent `GandiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## LivednsRecordEntity

```ts
const livedns_record = client.LivednsRecord()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `add_rrset_values` | `any[]` | No |  |
| `id` | `string` | No |  |
| `message` | `string` | Yes |  |
| `remove_rrset_values` | `any[]` | No |  |
| `rrset_href` | `string` | Yes |  |
| `rrset_name` | `string` | Yes |  |
| `rrset_ttl` | `number` | No |  |
| `rrset_type` | `string` | Yes |  |
| `rrset_values` | `any[]` | Yes |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `name` | `/livedns/domains/{fqdn}/records/{rrset_name}` | `client.LivednsRecord().create({ $action: 'name', ... })` |
| `verification` | `/livedns/domains/{fqdn}/verification/{rrset_name}/{rrset_type}` | `client.LivednsRecord().create({ $action: 'verification', ... })` |
| `name` | `/livedns/domains/{fqdn}/records/{rrset_name}` | `client.LivednsRecord().list({ $action: 'name', ... })` |
| `name` | `/livedns/domains/{fqdn}/records/{rrset_name}` | `client.LivednsRecord().remove({ $action: 'name', ... })` |
| `name` | `/livedns/domains/{fqdn}/records/{rrset_name}` | `client.LivednsRecord().update({ $action: 'name', ... })` |

An action returns that action's OWN response, which is not necessarily a
LivednsRecord record — check the API definition for its shape.

```ts
const result = await client.LivednsRecord().create({
  $action: 'name',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.LivednsRecord().create({
  fqdn: 'example_fqdn',
  rrset_values: [],
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.LivednsRecord().list({ fqdn: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.LivednsRecord().load({ fqdn: 'fqdn', rrset_name: 'rrset_name', rrset_type: 'rrset_type' })
```

#### `patch(data: object, ctrl?: object)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Resolves to the patched entity.

```ts
const result = await client.LivednsRecord().patch({
  fqdn: 'fqdn',
  rrset_name: 'rrset_name',
  rrset_type: 'rrset_type',
  // Only the fields to change
})
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.LivednsRecord().remove({ fqdn: 'fqdn', rrset_name: 'rrset_name', rrset_type: 'rrset_type' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.LivednsRecord().update({
  fqdn: 'fqdn',
  rrset_name: 'rrset_name',
  rrset_type: 'rrset_type',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `LivednsRecordEntity` instance with the same client and
options.

#### `client()`

Return the parent `GandiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## LivednsRrtypeEntity

```ts
const livedns_rrtype = client.LivednsRrtype()
```

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.LivednsRrtype().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `LivednsRrtypeEntity` instance with the same client and
options.

#### `client()`

Return the parent `GandiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## LivednsSnapshotEntity

```ts
const livedns_snapshot = client.LivednsSnapshot()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `automatic` | `boolean` | Yes |  |
| `created_at` | `string` | Yes |  |
| `href` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `message` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `zone_data` | `any[]` | Yes |  |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `automatic` | - | - | - | - | - |
| `created_at` | - | - | - | - | - |
| `href` | - | - | - | - | - |
| `id` | - | - | - | - | - |
| `message` | - | - | - | - | - |
| `name` | - | - | Yes | - | - |
| `zone_data` | - | - | - | - | - |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.LivednsSnapshot().create({
  fqdn: 'example_fqdn',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.LivednsSnapshot().list({ fqdn: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.LivednsSnapshot().load({ id: 'livedns_snapshot_id', fqdn: 'fqdn' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.LivednsSnapshot().remove({ id: 'livedns_snapshot_id', fqdn: 'fqdn' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.LivednsSnapshot().update({
  id: 'livedns_snapshot_id',
  fqdn: 'fqdn',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `LivednsSnapshotEntity` instance with the same client and
options.

#### `client()`

Return the parent `GandiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## LivednsTsigKeyEntity

```ts
const livedns_tsig_key = client.LivednsTsigKey()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `config_samples` | `Record<string, any>` | Yes |  |
| `href` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `key_name` | `string` | Yes |  |
| `secret` | `string` | Yes |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `config` | `/livedns/axfr/tsig/{id}/config/{software}` | `client.LivednsTsigKey().load({ $action: 'config', ... })` |

An action returns that action's OWN response, which is not necessarily a
LivednsTsigKey record — check the API definition for its shape.

```ts
const result = await client.LivednsTsigKey().load({
  $action: 'config',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.LivednsTsigKey().create({
  config_samples: {},
  href: 'example_href',
  id: 'example_id',
  key_name: 'example_key_name',
  secret: 'example_secret',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.LivednsTsigKey().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.LivednsTsigKey().load({ id: 'livedns_tsig_key_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `LivednsTsigKeyEntity` instance with the same client and
options.

#### `client()`

Return the parent `GandiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## LivednsZoneEntity

```ts
const livedns_zone = client.LivednsZone()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `items` | `any[]` | Yes |  |
| `message` | `string` | Yes |  |
| `remove_apex_ns` | `boolean` | No |  |

### Operations

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.LivednsZone().remove({ fqdn: 'fqdn' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.LivednsZone().update({
  fqdn: 'fqdn',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `LivednsZoneEntity` instance with the same client and
options.

#### `client()`

Return the parent `GandiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## MailboxEntity

```ts
const mailbox = client.Mailbox()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | `string` | Yes |  |
| `aliases` | `any[]` | No |  |
| `antispam` | `boolean` | Yes |  |
| `autorenew` | `Record<string, any>` | Yes |  |
| `config` | `Record<string, any>` | Yes |  |
| `config_name` | `string` | Yes |  |
| `created_at` | `string` | Yes |  |
| `data_access` | `boolean` | Yes |  |
| `domain_part` | `string` | Yes |  |
| `duration_month` | `number` | No |  |
| `email` | `string` | Yes |  |
| `expires_at` | `string` | Yes |  |
| `internal_domain` | `boolean` | Yes |  |
| `issues` | `any[]` | No |  |
| `last_paid_duration` | `number` | Yes |  |
| `local_part` | `string` | Yes |  |
| `message` | `string` | Yes |  |
| `owner` | `Record<string, any>` | Yes |  |
| `password` | `string` | Yes |  |
| `quota` | `number` | Yes |  |
| `quota_used` | `number` | Yes |  |
| `responder` | `Record<string, any>` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `uuid` | `string` | Yes |  |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `address` | - | - | - | - | - |
| `aliases` | - | - | - | - | - |
| `antispam` | - | - | - | Yes | - |
| `autorenew` | - | - | - | - | - |
| `config` | - | - | - | - | - |
| `config_name` | - | - | - | Yes | - |
| `created_at` | - | - | - | - | - |
| `data_access` | - | - | - | - | - |
| `domain_part` | - | - | - | - | - |
| `duration_month` | - | - | - | - | - |
| `email` | - | - | - | - | - |
| `expires_at` | - | - | - | - | - |
| `internal_domain` | - | - | - | - | - |
| `issues` | - | - | - | - | - |
| `last_paid_duration` | - | - | - | - | - |
| `local_part` | - | - | - | - | - |
| `message` | - | - | - | - | - |
| `owner` | - | - | - | - | - |
| `password` | - | - | - | Yes | - |
| `quota` | - | - | - | - | - |
| `quota_used` | - | - | - | - | - |
| `responder` | - | - | - | - | - |
| `updated_at` | - | - | - | - | - |
| `uuid` | - | - | - | - | - |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `renew` | `/mailbox/mailboxes/{email}/renew` | `client.Mailbox().create({ $action: 'renew', ... })` |

An action returns that action's OWN response, which is not necessarily a
Mailbox record — check the API definition for its shape.

```ts
const result = await client.Mailbox().create({
  $action: 'renew',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Mailbox().create({
  config_name: 'example_config_name',
  email: 'example_email',
  password: 'example_password',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Mailbox().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Mailbox().load({ address: 'address' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.Mailbox().remove({ address: 'address' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.Mailbox().update({
  address: 'address',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `MailboxEntity` instance with the same client and
options.

#### `client()`

Return the parent `GandiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## MailboxDomainEntity

```ts
const mailbox_domain = client.MailboxDomain()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `antispam` | `boolean` | Yes |  |
| `configuration` | `any[]` | Yes |  |
| `date_last_validation` | `string` | No |  |
| `dkim` | `boolean` | Yes |  |
| `fqdns` | `any[]` | Yes |  |
| `internal` | `boolean` | Yes |  |
| `is_livedns` | `boolean` | Yes |  |
| `mx` | `boolean` | Yes |  |
| `owner` | `Record<string, any>` | Yes |  |
| `spf` | `boolean` | Yes |  |
| `txt` | `boolean` | Yes |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `validate` | `/mailbox/domains/{domain}/validate` | `client.MailboxDomain().create({ $action: 'validate', ... })` |

An action returns that action's OWN response, which is not necessarily a
MailboxDomain record — check the API definition for its shape.

```ts
const result = await client.MailboxDomain().create({
  $action: 'validate',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.MailboxDomain().create({
  domain: 'example_domain',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.MailboxDomain().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.MailboxDomain().load({ domain: 'domain' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `MailboxDomainEntity` instance with the same client and
options.

#### `client()`

Return the parent `GandiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## MailboxForwardEntity

```ts
const mailbox_forward = client.MailboxForward()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `destinations` | `any[]` | Yes |  |
| `message` | `string` | Yes |  |
| `source` | `string` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.MailboxForward().create({
  destinations: [],
  source: 'example_source',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.MailboxForward().list()
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.MailboxForward().remove({ source: 'source' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.MailboxForward().update({
  source: 'source',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `MailboxForwardEntity` instance with the same client and
options.

#### `client()`

Return the parent `GandiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## MailboxProductEntity

```ts
const mailbox_product = client.MailboxProduct()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `autorenew` | `boolean` | No |  |
| `config` | `any[]` | Yes |  |
| `config_name` | `string` | Yes |  |
| `description` | `string` | Yes |  |
| `duration_month` | `number` | Yes |  |
| `label` | `string` | Yes |  |
| `message` | `string` | Yes |  |
| `prices` | `any[]` | Yes |  |
| `quantity` | `number` | Yes |  |
| `taxes` | `any[]` | Yes |  |
| `uuid` | `string` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.MailboxProduct().create({
  config_name: 'example_config_name',
  duration_month: 1,
  quantity: 1,
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.MailboxProduct().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `MailboxProductEntity` instance with the same client and
options.

#### `client()`

Return the parent `GandiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## MailboxQuotaEntity

```ts
const mailbox_quota = client.MailboxQuota()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `annually` | `Record<string, any>` | Yes |  |
| `config_name` | `string` | Yes |  |
| `label` | `string` | Yes |  |
| `monthly` | `Record<string, any>` | Yes |  |
| `quota` | `string` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.MailboxQuota().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `MailboxQuotaEntity` instance with the same client and
options.

#### `client()`

Return the parent `GandiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## MailboxSlotEntity

```ts
const mailbox_slot = client.MailboxSlot()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `autorenew` | `Record<string, any>` | Yes |  |
| `config` | `Record<string, any>` | Yes |  |
| `expires_at` | `string` | No |  |
| `last_paid_duration` | `number` | No |  |
| `refund_info` | `Record<string, any>` | Yes |  |
| `refundable` | `boolean` | Yes |  |
| `uuid` | `string` | Yes |  |
| `webhosting_pack` | `boolean` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.MailboxSlot().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.MailboxSlot().load({ uuid: 'uuid' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `MailboxSlotEntity` instance with the same client and
options.

#### `client()`

Return the parent `GandiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## OrganizationEntity

```ts
const organization = client.Organization()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `city` | `string` | Yes |  |
| `corporate` | `boolean` | Yes |  |
| `country` | `string` | Yes |  |
| `email` | `string` | Yes |  |
| `fax` | `string` | No |  |
| `firstname` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `lang` | `string` | No |  |
| `lastname` | `string` | Yes |  |
| `message` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `orgname` | `string` | No |  |
| `phone` | `string` | No |  |
| `reference` | `string` | No |  |
| `reseller` | `boolean` | Yes |  |
| `siren` | `string` | No |  |
| `state` | `string` | No |  |
| `streetaddr` | `string` | Yes |  |
| `streetaddr2` | `string` | No |  |
| `type` | `string` | Yes |  |
| `vat_number` | `string` | No |  |
| `zip` | `string` | Yes |  |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `city` | - | - | - | Yes | - |
| `corporate` | - | Yes | - | - | - |
| `country` | - | - | Yes | Yes | - |
| `email` | - | Yes | - | Yes | - |
| `fax` | - | - | - | - | - |
| `firstname` | - | Yes | - | Yes | - |
| `id` | - | - | - | - | - |
| `lang` | - | - | - | - | - |
| `lastname` | - | Yes | - | Yes | - |
| `message` | - | - | - | - | - |
| `name` | - | - | - | Yes | - |
| `orgname` | - | - | Yes | - | - |
| `phone` | - | - | Yes | - | - |
| `reference` | - | - | - | - | - |
| `reseller` | - | Yes | Yes | Yes | - |
| `siren` | - | - | - | - | - |
| `state` | - | - | - | - | - |
| `streetaddr` | - | - | - | Yes | - |
| `streetaddr2` | - | - | - | - | - |
| `type` | - | Yes | - | - | - |
| `vat_number` | - | - | - | - | - |
| `zip` | - | - | Yes | Yes | - |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `action` | `/organization/organizations/{org_id}/action` | `client.Organization().create({ $action: 'action', ... })` |

An action returns that action's OWN response, which is not necessarily a
Organization record — check the API definition for its shape.

```ts
const result = await client.Organization().create({
  $action: 'action',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Organization().create({
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Organization().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Organization().load({ id: 'organization_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.Organization().remove({ id: 'organization_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.Organization().update({
  id: 'organization_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `OrganizationEntity` instance with the same client and
options.

#### `client()`

Return the parent `GandiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## OrganizationCustomerEntity

```ts
const organization_customer = client.OrganizationCustomer()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `city` | `string` | Yes |  |
| `country` | `string` | Yes |  |
| `email` | `string` | Yes |  |
| `fax` | `string` | No |  |
| `firstname` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `lang` | `string` | No |  |
| `lastname` | `string` | Yes |  |
| `message` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `orgname` | `string` | No |  |
| `phone` | `string` | No |  |
| `reference` | `string` | No |  |
| `siren` | `string` | No |  |
| `state` | `string` | No |  |
| `streetaddr` | `string` | Yes |  |
| `streetaddr2` | `string` | No |  |
| `sync_contact_email` | `string` | No |  |
| `type` | `string` | Yes |  |
| `vat_number` | `string` | No |  |
| `zip` | `string` | No |  |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `city` | - | - | - | Yes | - |
| `country` | - | - | - | Yes | - |
| `email` | - | - | - | Yes | - |
| `fax` | - | - | - | - | - |
| `firstname` | - | - | - | Yes | - |
| `id` | - | - | - | - | - |
| `lang` | - | - | - | - | - |
| `lastname` | - | - | - | Yes | - |
| `message` | - | - | - | - | - |
| `name` | - | - | - | - | - |
| `orgname` | - | - | - | - | - |
| `phone` | - | - | Yes | - | - |
| `reference` | - | - | - | - | - |
| `siren` | - | - | - | - | - |
| `state` | - | - | - | - | - |
| `streetaddr` | - | - | - | Yes | - |
| `streetaddr2` | - | - | - | - | - |
| `sync_contact_email` | - | - | - | - | - |
| `type` | - | - | - | - | - |
| `vat_number` | - | - | - | - | - |
| `zip` | - | - | - | - | - |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.OrganizationCustomer().create({
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.OrganizationCustomer().list({ org_id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.OrganizationCustomer().load({ id: 'organization_customer_id', org_id: 'org_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.OrganizationCustomer().remove({ id: 'organization_customer_id', org_id: 'org_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.OrganizationCustomer().update({
  id: 'organization_customer_id',
  org_id: 'org_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `OrganizationCustomerEntity` instance with the same client and
options.

#### `client()`

Return the parent `GandiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## TemplateEntity

```ts
const template = client.Template()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | Yes |  |
| `editable` | `boolean` | Yes |  |
| `href` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `namespaces` | `any[]` | Yes |  |
| `orgname` | `string` | Yes |  |
| `payload` | `Record<string, any>` | Yes |  |
| `sharing_space` | `Record<string, any>` | Yes |  |
| `variables` | `any[]` | Yes |  |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `description` | - | - | Yes | Yes | - |
| `editable` | - | - | - | - | - |
| `href` | - | - | - | - | - |
| `id` | - | - | - | - | - |
| `name` | - | - | - | Yes | - |
| `namespaces` | - | - | - | - | - |
| `orgname` | - | - | - | - | - |
| `payload` | - | - | - | Yes | - |
| `sharing_space` | - | - | - | - | - |
| `variables` | - | - | - | - | - |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Template().create({
  name: 'example_name',
  payload: {},
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Template().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Template().load({ id: 'template_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.Template().remove({ id: 'template_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.Template().update({
  id: 'template_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `TemplateEntity` instance with the same client and
options.

#### `client()`

Return the parent `GandiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## TemplateDispatchEntity

```ts
const template_dispatch = client.TemplateDispatch()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attempt` | `number` | Yes |  |
| `created_at` | `string` | Yes |  |
| `dispatch_href` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `message` | `string` | Yes |  |
| `object_id` | `string` | Yes |  |
| `object_type` | `string` | Yes |  |
| `payload` | `Record<string, any>` | Yes |  |
| `sharing_id` | `string` | Yes |  |
| `state` | `number` | Yes |  |
| `state_msg` | `string` | No |  |
| `target` | `Record<string, any>` | Yes |  |
| `target_id` | `string` | Yes |  |
| `target_type` | `string` | Yes |  |
| `task_history` | `any[]` | Yes |  |
| `task_status` | `Record<string, any>` | Yes |  |
| `task_updated_at` | `string` | No |  |
| `template_id` | `string` | No |  |
| `template_name` | `string` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.TemplateDispatch().create({
  template_id: 'example_template_id',
  object_id: 'example_object_id',
  object_type: 'example_object_type',
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.TemplateDispatch().load({ id: 'template_dispatch_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `TemplateDispatchEntity` instance with the same client and
options.

#### `client()`

Return the parent `GandiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## TldEntity

```ts
const tld = client.Tld()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `authinfo_for_transfer` | `boolean` | Yes |  |
| `category` | `string` | Yes |  |
| `change_owner` | `boolean` | Yes |  |
| `corporate` | `boolean` | Yes |  |
| `ext_trade` | `boolean` | Yes |  |
| `full_tld` | `string` | Yes |  |
| `href` | `string` | Yes |  |
| `lock` | `boolean` | Yes |  |
| `name` | `string` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Tld().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Tld().load({ name: 'name' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `TldEntity` instance with the same client and
options.

#### `client()`

Return the parent `GandiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## UserEntity

```ts
const user = client.User()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `city` | `string` | Yes |  |
| `country` | `string` | No |  |
| `email` | `string` | Yes |  |
| `fax` | `string` | No |  |
| `firstname` | `string` | No |  |
| `id` | `string` | Yes |  |
| `lang` | `string` | Yes |  |
| `lastname` | `string` | No |  |
| `name` | `string` | Yes |  |
| `phone` | `string` | No |  |
| `state` | `string` | No |  |
| `streetaddr` | `string` | No |  |
| `streetaddr2` | `string` | No |  |
| `username` | `string` | Yes |  |
| `zip` | `string` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.User().load({ id: 'user_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `UserEntity` instance with the same client and
options.

#### `client()`

Return the parent `GandiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `debug` | 0.0.1 | Debug capture |
| `idempotency` | 0.0.1 | Idempotency |
| `metrics` | 0.0.1 | Metrics |
| `paging` | 0.0.1 | Paging |
| `ratelimit` | 0.0.1 | Rate limiting |
| `retry` | 0.0.1 | Retry |
| `secrets` | 0.1.0 | Secrets |
| `test` | 0.0.1 | Test transport |
| `timeout` | 0.0.1 | Timeout |


Features are activated via the `feature` option:

```ts
const client = new GandiSDK({
  feature: {
    debug: { active: true },
    idempotency: { active: true },
    metrics: { active: true },
    paging: { active: true },
    ratelimit: { active: true },
    retry: { active: true },
    secrets: { active: true },
    test: { active: true },
    timeout: { active: true },
  }
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### Ordering

`ratelimit`, `retry`, `secrets`, `timeout` wrap the transport. Each
wraps whatever is already installed, so **activation order is nesting order**:
a feature activated later sits OUTSIDE one activated earlier, and sees the call
first.

That decides behaviour, not just sequence: a feature that short-circuits the
call, such as a cache serving a hit, stops every feature nested inside it from
ever seeing that call.

`debug`, `idempotency`, `metrics`, `paging`, `test` attach to pipeline hooks
rather than the transport, so their order does not affect what they observe.

#### `debug`

Debug capture.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `max` | `100` |
| `redact` | `['authorization', 'cookie', 'set-cookie', 'api-key', 'apikey', 'x-api-key', 'idempotency-key']` |

| Option | Type |
|---|---|
| `now` | function |
| `onEntry` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.debug.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Inactive by default: leaving it out costs nothing at runtime.

#### `idempotency`

Idempotency.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `header` | `'Idempotency-Key'` |
| `methods` | `['POST', 'PUT', 'PATCH', 'DELETE']` |
| `ops` | `['create', 'update', 'remove']` |

| Option | Type |
|---|---|
| `keygen` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.idempotency.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Inactive by default: leaving it out costs nothing at runtime.

#### `metrics`

Metrics.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `now` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.metrics.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Inactive by default: leaving it out costs nothing at runtime.

#### `paging`

Paging.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `afterVar` | `'after'` |
| `cursorParam` | `'cursor'` |
| `firstVar` | `'first'` |
| `limitParam` | `'limit'` |
| `pageParam` | `'page'` |
| `startPage` | `1` |

| Option | Type |
|---|---|
| `limit` | number |
| `ops` | list |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.paging.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Inactive by default: leaving it out costs nothing at runtime.

#### `ratelimit`

Rate limiting.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

| Option | Type |
|---|---|
| `now` | function |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.ratelimit.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `retry`

Retry.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

| Option | Type |
|---|---|
| `jitter` | boolean |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.retry.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `secrets`

Secrets.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `cache` | `true` |
| `exchange` | `{active: false, method: 'POST', path: 'auth/token', refresh: '', request: 'refresh_token', response: 'access_token', retries: 1, statuses: [401]}` |
| `name` | `'apikey'` |
| `providers` | `[]` |

**Usage**

Set `feature.secrets.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `test`

Test transport.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `entity` | map |
| `net` | map |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

#### `timeout`

Timeout.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

| Option | Type |
|---|---|
| `clearTimer` | function |
| `now` | function |
| `setTimer` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.timeout.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

