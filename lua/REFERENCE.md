# Gandi Lua SDK Reference

Complete API reference for the Gandi Lua SDK.


## GandiSDK

### Constructor

```lua
local sdk = require("gandi_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `AccessToken(data)`

Create a new `AccessToken` entity instance. Pass `nil` for no initial data.

#### `AcmeAccount(data)`

Create a new `AcmeAccount` entity instance. Pass `nil` for no initial data.

#### `AcmeDomain(data)`

Create a new `AcmeDomain` entity instance. Pass `nil` for no initial data.

#### `AcmePrice(data)`

Create a new `AcmePrice` entity instance. Pass `nil` for no initial data.

#### `AcmeSubscription(data)`

Create a new `AcmeSubscription` entity instance. Pass `nil` for no initial data.

#### `BillingInfo(data)`

Create a new `BillingInfo` entity instance. Pass `nil` for no initial data.

#### `BillingPrice(data)`

Create a new `BillingPrice` entity instance. Pass `nil` for no initial data.

#### `CertificateDcv(data)`

Create a new `CertificateDcv` entity instance. Pass `nil` for no initial data.

#### `CertificatePackage(data)`

Create a new `CertificatePackage` entity instance. Pass `nil` for no initial data.

#### `CertificatePem(data)`

Create a new `CertificatePem` entity instance. Pass `nil` for no initial data.

#### `CertificateRenewal(data)`

Create a new `CertificateRenewal` entity instance. Pass `nil` for no initial data.

#### `CertificateTag(data)`

Create a new `CertificateTag` entity instance. Pass `nil` for no initial data.

#### `Comment(data)`

Create a new `Comment` entity instance. Pass `nil` for no initial data.

#### `Domain(data)`

Create a new `Domain` entity instance. Pass `nil` for no initial data.

#### `DomainAvailability(data)`

Create a new `DomainAvailability` entity instance. Pass `nil` for no initial data.

#### `DomainChangeOwner(data)`

Create a new `DomainChangeOwner` entity instance. Pass `nil` for no initial data.

#### `DomainClaim(data)`

Create a new `DomainClaim` entity instance. Pass `nil` for no initial data.

#### `DomainContact(data)`

Create a new `DomainContact` entity instance. Pass `nil` for no initial data.

#### `DomainDnskey(data)`

Create a new `DomainDnskey` entity instance. Pass `nil` for no initial data.

#### `DomainDnssec(data)`

Create a new `DomainDnssec` entity instance. Pass `nil` for no initial data.

#### `DomainHost(data)`

Create a new `DomainHost` entity instance. Pass `nil` for no initial data.

#### `DomainLivedns(data)`

Create a new `DomainLivedns` entity instance. Pass `nil` for no initial data.

#### `DomainNameserver(data)`

Create a new `DomainNameserver` entity instance. Pass `nil` for no initial data.

#### `DomainTag(data)`

Create a new `DomainTag` entity instance. Pass `nil` for no initial data.

#### `DomainTransfer(data)`

Create a new `DomainTransfer` entity instance. Pass `nil` for no initial data.

#### `DomainWebredir(data)`

Create a new `DomainWebredir` entity instance. Pass `nil` for no initial data.

#### `EmailForward(data)`

Create a new `EmailForward` entity instance. Pass `nil` for no initial data.

#### `EmailMailbox(data)`

Create a new `EmailMailbox` entity instance. Pass `nil` for no initial data.

#### `EmailMigration(data)`

Create a new `EmailMigration` entity instance. Pass `nil` for no initial data.

#### `EmailOffer(data)`

Create a new `EmailOffer` entity instance. Pass `nil` for no initial data.

#### `EmailSlot(data)`

Create a new `EmailSlot` entity instance. Pass `nil` for no initial data.

#### `HostingApplication(data)`

Create a new `HostingApplication` entity instance. Pass `nil` for no initial data.

#### `HostingInstance(data)`

Create a new `HostingInstance` entity instance. Pass `nil` for no initial data.

#### `HostingVhost(data)`

Create a new `HostingVhost` entity instance. Pass `nil` for no initial data.

#### `IssuedCertificate(data)`

Create a new `IssuedCertificate` entity instance. Pass `nil` for no initial data.

#### `LinkedZone(data)`

Create a new `LinkedZone` entity instance. Pass `nil` for no initial data.

#### `LinkedZoneDeployment(data)`

Create a new `LinkedZoneDeployment` entity instance. Pass `nil` for no initial data.

#### `LinkedZoneDomain(data)`

Create a new `LinkedZoneDomain` entity instance. Pass `nil` for no initial data.

#### `LinkedZoneTask(data)`

Create a new `LinkedZoneTask` entity instance. Pass `nil` for no initial data.

#### `LivednsAxfrSlave(data)`

Create a new `LivednsAxfrSlave` entity instance. Pass `nil` for no initial data.

#### `LivednsAxfrTsig(data)`

Create a new `LivednsAxfrTsig` entity instance. Pass `nil` for no initial data.

#### `LivednsDomain(data)`

Create a new `LivednsDomain` entity instance. Pass `nil` for no initial data.

#### `LivednsKey(data)`

Create a new `LivednsKey` entity instance. Pass `nil` for no initial data.

#### `LivednsNameserver(data)`

Create a new `LivednsNameserver` entity instance. Pass `nil` for no initial data.

#### `LivednsRecord(data)`

Create a new `LivednsRecord` entity instance. Pass `nil` for no initial data.

#### `LivednsRrtype(data)`

Create a new `LivednsRrtype` entity instance. Pass `nil` for no initial data.

#### `LivednsSnapshot(data)`

Create a new `LivednsSnapshot` entity instance. Pass `nil` for no initial data.

#### `LivednsTsigKey(data)`

Create a new `LivednsTsigKey` entity instance. Pass `nil` for no initial data.

#### `LivednsZone(data)`

Create a new `LivednsZone` entity instance. Pass `nil` for no initial data.

#### `Mailbox(data)`

Create a new `Mailbox` entity instance. Pass `nil` for no initial data.

#### `MailboxDomain(data)`

Create a new `MailboxDomain` entity instance. Pass `nil` for no initial data.

#### `MailboxForward(data)`

Create a new `MailboxForward` entity instance. Pass `nil` for no initial data.

#### `MailboxProduct(data)`

Create a new `MailboxProduct` entity instance. Pass `nil` for no initial data.

#### `MailboxQuota(data)`

Create a new `MailboxQuota` entity instance. Pass `nil` for no initial data.

#### `MailboxSlot(data)`

Create a new `MailboxSlot` entity instance. Pass `nil` for no initial data.

#### `Organization(data)`

Create a new `Organization` entity instance. Pass `nil` for no initial data.

#### `OrganizationCustomer(data)`

Create a new `OrganizationCustomer` entity instance. Pass `nil` for no initial data.

#### `Template(data)`

Create a new `Template` entity instance. Pass `nil` for no initial data.

#### `TemplateDispatch(data)`

Create a new `TemplateDispatch` entity instance. Pass `nil` for no initial data.

#### `Tld(data)`

Create a new `Tld` entity instance. Pass `nil` for no initial data.

#### `User(data)`

Create a new `User` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## AccessTokenEntity

```lua
local access_token = client:AccessToken(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `access_token` | `string` | Yes |  |
| `entities` | `table` | Yes |  |
| `expires_at` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `scopes` | `table` | Yes |  |

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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:AccessToken():create({
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AccessTokenEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AcmeAccountEntity

```lua
local acme_account = client:AcmeAccount(nil)
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

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:AcmeAccount():list({ subscription_id = "example", sharing_id = "example" })
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:AcmeAccount():load({ id = "acme_account_id", subscription_id = "subscription_id", sharing_id = "sharing_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AcmeAccountEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AcmeDomainEntity

```lua
local acme_domain = client:AcmeDomain(nil)
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

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:AcmeDomain():list({ subscription_id = "example", domain = "example", sharing_id = "example" })
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:AcmeDomain():load({ domain_id = 1, subscription_id = "subscription_id", sharing_id = "sharing_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AcmeDomainEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AcmePriceEntity

```lua
local acme_price = client:AcmePrice(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `country` | `string` | Yes |  |
| `currency` | `string` | Yes |  |
| `domains` | `table` | Yes |  |
| `duration` | `string` | Yes |  |
| `duration_unit` | `string` | Yes |  |
| `grid` | `string` | Yes |  |
| `max_duration` | `number` | Yes |  |
| `min_duration` | `number` | Yes |  |
| `price_after_taxes` | `string` | Yes |  |
| `price_before_taxes` | `string` | Yes |  |
| `process` | `string` | Yes |  |
| `product` | `table` | Yes |  |
| `provider` | `string` | Yes |  |
| `tax_rate` | `string` | Yes |  |
| `taxes` | `table` | Yes |  |
| `validation_type` | `string` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:AcmePrice():create({
  sharing_id = --[[ string ]],
  country = --[[ string ]],
  currency = --[[ string ]],
  domains = --[[ table ]],
  duration = --[[ string ]],
  grid = --[[ string ]],
  process = --[[ string ]],
  provider = --[[ string ]],
  validation_type = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:AcmePrice():list({ country = "example", currency = "example", duration = "example", grid = "example", process = "example", provider = "example", sharing_id = "example", validation_type = "example" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AcmePriceEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AcmeSubscriptionEntity

```lua
local acme_subscription = client:AcmeSubscription(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `country` | `string` | Yes |  |
| `created_at` | `string` | Yes |  |
| `currency` | `string` | Yes |  |
| `domains` | `table` | Yes |  |
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

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:AcmeSubscription():create({
  sharing_id = --[[ string ]],
  country = --[[ string ]],
  currency = --[[ string ]],
  domains = --[[ table ]],
  duration = --[[ number ]],
  grid = --[[ string ]],
  name = --[[ string ]],
  provider = --[[ string ]],
  validation_type = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:AcmeSubscription():list({ created_at = "example", ends_at = "example", name = "example", provider = "example", sharing_id = "example", status = "example", validation_type = "example", year = "example" })
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:AcmeSubscription():load({ subscription_id = "subscription_id", sharing_id = "sharing_id" })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

```lua
local result, err = client:AcmeSubscription():remove({ subscription_id = "subscription_id", sharing_id = "sharing_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:AcmeSubscription():update({
  subscription_id = "subscription_id",
  sharing_id = "sharing_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AcmeSubscriptionEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## BillingInfoEntity

```lua
local billing_info = client:BillingInfo(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `annual_balance` | `number` | Yes |  |
| `grid` | `string` | Yes |  |
| `outstanding_amount` | `number` | Yes |  |
| `prepaid` | `table` | Yes |  |
| `prepaid_monthly_invoice` | `boolean` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:BillingInfo():load({ sharing_id = "sharing_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BillingInfoEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## BillingPriceEntity

```lua
local billing_price = client:BillingPrice(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `currency` | `string` | Yes |  |
| `grid` | `string` | Yes |  |
| `products` | `table` | Yes |  |
| `taxes` | `table` | Yes |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:BillingPrice():load({ type = "type", name = {}, process = {} })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BillingPriceEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CertificateDcvEntity

```lua
local certificate_dcv = client:CertificateDcv(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `message` | `string` | Yes |  |
| `method` | `string` | Yes |  |

### Operations

#### `patch(reqdata, ctrl) -> any, err`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity, or `nil` and an error on failure.

```lua
local result, err = client:CertificateDcv():patch({
  certificate_id = "certificate_id",
  -- Only the fields to change
})
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:CertificateDcv():update({
  certificate_id = "certificate_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CertificateDcvEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CertificatePackageEntity

```lua
local certificate_package = client:CertificatePackage(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `category` | `table` | Yes |  |
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

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:CertificatePackage():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:CertificatePackage():load({ name = "name" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CertificatePackageEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CertificatePemEntity

```lua
local certificate_pem = client:CertificatePem(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:CertificatePem():load({ type = "type" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CertificatePemEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CertificateRenewalEntity

```lua
local certificate_renewal = client:CertificateRenewal(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `csr` | `string` | No |  |
| `dcv_method` | `string` | No |  |
| `duration` | `number` | No |  |
| `errors` | `table` | No |  |
| `status` | `string` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:CertificateRenewal():create({
  certificate_id = --[[ string ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CertificateRenewalEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CertificateTagEntity

```lua
local certificate_tag = client:CertificateTag(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `add` | `table` | Yes |  |
| `message` | `string` | Yes |  |
| `remove` | `table` | Yes |  |
| `tag` | `string` | Yes |  |
| `tags` | `table` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:CertificateTag():create({
  certificate_id = --[[ string ]],
  tag = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:CertificateTag():list({ certificate_id = "example" })
```

#### `patch(reqdata, ctrl) -> any, err`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity, or `nil` and an error on failure.

```lua
local result, err = client:CertificateTag():patch({
  certificate_id = "certificate_id",
  -- Only the fields to change
})
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

```lua
local result, err = client:CertificateTag():remove({ certificate_id = "certificate_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:CertificateTag():update({
  certificate_id = "certificate_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CertificateTagEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CommentEntity

```lua
local comment = client:Comment(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `content` | `string` | Yes |  |
| `created_at` | `string` | No |  |
| `errors` | `table` | No |  |
| `id` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `updated_at` | `string` | No |  |
| `user` | `table` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:Comment():create({
  entity_id = --[[ string ]],
  content = --[[ string ]],
})
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:Comment():load({ entity_id = "entity_id" })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

```lua
local result, err = client:Comment():remove({ entity_id = "entity_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CommentEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## DomainEntity

```lua
local domain = client:Domain(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `admin` | `table` | Yes |  |
| `authinfo` | `string` | No |  |
| `autorenew` | `table` | Yes |  |
| `bill` | `table` | Yes |  |
| `can_tld_lock` | `boolean` | Yes |  |
| `claims` | `string` | No |  |
| `contacts` | `table` | Yes |  |
| `currency` | `string` | No |  |
| `dates` | `table` | Yes |  |
| `domain_owner` | `string` | Yes |  |
| `duration` | `number` | No |  |
| `enforce_premium` | `boolean` | No |  |
| `errors` | `table` | No |  |
| `extra_parameters` | `table` | No |  |
| `fqdn` | `string` | Yes |  |
| `fqdn_unicode` | `string` | Yes |  |
| `href` | `string` | Yes |  |
| `id` | `string` | No |  |
| `lang` | `string` | No |  |
| `mailbox_optin` | `boolean` | No |  |
| `nameserver` | `table` | Yes |  |
| `nameservers` | `table` | Yes |  |
| `nameservers_ips` | `table` | No |  |
| `orga_owner` | `string` | Yes |  |
| `owner` | `table` | Yes |  |
| `price` | `number` | No |  |
| `reachability` | `string` | Yes |  |
| `resellee_id` | `string` | No |  |
| `services` | `table` | Yes |  |
| `sharing_id` | `string` | No |  |
| `sharing_space` | `table` | Yes |  |
| `smd` | `string` | No |  |
| `status` | `table` | Yes |  |
| `tags` | `table` | No |  |
| `tech` | `table` | Yes |  |
| `template_id` | `string` | No |  |
| `tld` | `string` | Yes |  |
| `tld_period` | `string` | No |  |
| `trustee_roles` | `table` | No |  |

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

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:Domain():create({
  admin = --[[ table ]],
  bill = --[[ table ]],
  fqdn = --[[ string ]],
  owner = --[[ table ]],
  tech = --[[ table ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Domain():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:Domain():load({ fqdn = "fqdn" })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

```lua
local result, err = client:Domain():remove({ fqdn = "fqdn" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DomainEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## DomainAvailabilityEntity

```lua
local domain_availability = client:DomainAvailability(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `currency` | `string` | Yes |  |
| `grid` | `string` | Yes |  |
| `products` | `table` | Yes |  |
| `taxes` | `table` | Yes |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:DomainAvailability():load({ name = "name" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DomainAvailabilityEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## DomainChangeOwnerEntity

```lua
local domain_change_owner = client:DomainChangeOwner(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `admin` | `table` | Yes |  |
| `bill` | `table` | Yes |  |
| `created_at` | `string` | Yes |  |
| `date_start` | `string` | No |  |
| `errors` | `table` | No |  |
| `errortype` | `string` | No |  |
| `errortype_label` | `string` | No |  |
| `foa` | `table` | No |  |
| `inner_step` | `string` | No |  |
| `owner` | `table` | Yes |  |
| `params` | `table` | Yes |  |
| `status` | `string` | Yes |  |
| `step` | `string` | Yes |  |
| `step_nb` | `number` | Yes |  |
| `tech` | `table` | Yes |  |
| `updated_at` | `string` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:DomainChangeOwner():create({
  domain = --[[ string ]],
  admin = --[[ table ]],
  bill = --[[ table ]],
  owner = --[[ table ]],
  tech = --[[ table ]],
})
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:DomainChangeOwner():load({ domain = "domain" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DomainChangeOwnerEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## DomainClaimEntity

```lua
local domain_claim = client:DomainClaim(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `claims` | `table` | Yes |  |
| `created_at` | `string` | Yes |  |
| `expires_at` | `string` | Yes |  |
| `fqdn` | `string` | Yes |  |
| `fqdn_alabel` | `string` | Yes |  |
| `fqdn_ulabel` | `string` | Yes |  |
| `notice_id` | `string` | Yes |  |
| `status` | `string` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:DomainClaim():create({
  domain = --[[ string ]],
  claims = --[[ table ]],
  created_at = --[[ string ]],
  expires_at = --[[ string ]],
  fqdn = --[[ string ]],
  fqdn_alabel = --[[ string ]],
  fqdn_ulabel = --[[ string ]],
  notice_id = --[[ string ]],
  status = --[[ string ]],
})
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:DomainClaim():load({ domain = "domain" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DomainClaimEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## DomainContactEntity

```lua
local domain_contact = client:DomainContact(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `admin` | `table` | Yes |  |
| `bill` | `table` | Yes |  |
| `message` | `string` | Yes |  |
| `owner` | `table` | Yes |  |
| `tech` | `table` | Yes |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:DomainContact():load({ domain = "domain" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:DomainContact():update({
  domain = "domain",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DomainContactEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## DomainDnskeyEntity

```lua
local domain_dnskey = client:DomainDnskey(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `algorithm` | `number` | Yes |  |
| `digest` | `string` | Yes |  |
| `digest_type` | `number` | Yes |  |
| `href` | `string` | Yes |  |
| `id` | `number` | Yes |  |
| `keys` | `table` | Yes |  |
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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:DomainDnskey():create({
  domain = --[[ string ]],
  algorithm = --[[ number ]],
  public_key = --[[ string ]],
  type = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:DomainDnskey():list({ domain = "example" })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

```lua
local result, err = client:DomainDnskey():remove({ id = "domain_dnskey_id", domain = "domain" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:DomainDnskey():update({
  domain = "domain",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DomainDnskeyEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## DomainDnssecEntity

```lua
local domain_dnssec = client:DomainDnssec(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `error` | `string` | No |  |
| `state` | `string` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:DomainDnssec():create({
  domain = --[[ string ]],
  state = --[[ string ]],
})
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:DomainDnssec():load({ domain = "domain" })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

```lua
local result, err = client:DomainDnssec():remove({ domain = "domain" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DomainDnssecEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## DomainHostEntity

```lua
local domain_host = client:DomainHost(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `fqdn` | `string` | Yes |  |
| `fqdn_unicode` | `string` | Yes |  |
| `href` | `string` | Yes |  |
| `ips` | `table` | Yes |  |
| `message` | `string` | Yes |  |
| `name` | `string` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:DomainHost():create({
  domain = --[[ string ]],
  ips = --[[ table ]],
  name = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:DomainHost():list({ domain = "example" })
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:DomainHost():load({ domain = "domain", name = "name" })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

```lua
local result, err = client:DomainHost():remove({ domain = "domain", name = "name" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:DomainHost():update({
  domain = "domain",
  name = "name",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DomainHostEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## DomainLivednsEntity

```lua
local domain_livedns = client:DomainLivedns(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `current` | `string` | Yes |  |
| `dnssec_available` | `boolean` | No |  |
| `livednssec_available` | `boolean` | No |  |
| `message` | `string` | Yes |  |
| `nameservers` | `table` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:DomainLivedns():create({
  domain = --[[ string ]],
  current = --[[ string ]],
  message = --[[ string ]],
  nameservers = --[[ table ]],
})
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:DomainLivedns():load({ domain = "domain" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DomainLivednsEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## DomainNameserverEntity

```lua
local domain_nameserver = client:DomainNameserver(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `message` | `string` | Yes |  |
| `nameservers` | `table` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:DomainNameserver():list({ domain = "example" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:DomainNameserver():update({
  domain = "domain",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DomainNameserverEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## DomainTagEntity

```lua
local domain_tag = client:DomainTag(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `add` | `table` | Yes |  |
| `message` | `string` | Yes |  |
| `remove` | `table` | Yes |  |
| `tag` | `string` | Yes |  |
| `tags` | `table` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:DomainTag():create({
  domain = --[[ string ]],
  tag = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:DomainTag():list({ domain = "example" })
```

#### `patch(reqdata, ctrl) -> any, err`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity, or `nil` and an error on failure.

```lua
local result, err = client:DomainTag():patch({
  domain = "domain",
  -- Only the fields to change
})
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

```lua
local result, err = client:DomainTag():remove({ domain = "domain" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:DomainTag():update({
  domain = "domain",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DomainTagEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## DomainTransferEntity

```lua
local domain_transfer = client:DomainTransfer(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `admin` | `table` | Yes |  |
| `authinfo` | `string` | No |  |
| `bill` | `table` | Yes |  |
| `change_owner` | `boolean` | No |  |
| `created_at` | `string` | Yes |  |
| `currency` | `string` | No |  |
| `duration` | `number` | No |  |
| `enforce_premium` | `boolean` | No |  |
| `errors` | `table` | No |  |
| `errortype` | `string` | No |  |
| `errortype_label` | `string` | No |  |
| `extra_parameters` | `table` | No |  |
| `foa` | `table` | No |  |
| `fqdn` | `string` | Yes |  |
| `inner_step` | `string` | No |  |
| `mailbox_optin` | `boolean` | No |  |
| `message` | `string` | Yes |  |
| `nameservers` | `table` | No |  |
| `nameservers_ips` | `table` | No |  |
| `owner` | `table` | Yes |  |
| `owner_contact` | `string` | Yes |  |
| `params` | `table` | Yes |  |
| `price` | `number` | No |  |
| `regac_at` | `string` | No |  |
| `resellee_id` | `string` | No |  |
| `start_at` | `string` | No |  |
| `status` | `string` | Yes |  |
| `step` | `string` | Yes |  |
| `step_nb` | `number` | Yes |  |
| `tech` | `table` | Yes |  |
| `template_id` | `string` | No |  |
| `transfer_link` | `string` | No |  |
| `transfer_procedure` | `string` | No |  |
| `updated_at` | `string` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:DomainTransfer():create({
  admin = --[[ table ]],
  bill = --[[ table ]],
  fqdn = --[[ string ]],
  owner = --[[ table ]],
  tech = --[[ table ]],
})
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:DomainTransfer():load({ domain = "domain" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:DomainTransfer():update({
  domain = "domain",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DomainTransferEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## DomainWebredirEntity

```lua
local domain_webredir = client:DomainWebredir(nil)
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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:DomainWebredir():create({
  domain = --[[ string ]],
  host = --[[ string ]],
  override = --[[ boolean ]],
  protocol = --[[ string ]],
  type = --[[ string ]],
  url = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:DomainWebredir():list({ domain = "example" })
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:DomainWebredir():load({ domain = "domain", host = "host" })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

```lua
local result, err = client:DomainWebredir():remove({ domain = "domain", host = "host" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:DomainWebredir():update({
  domain = "domain",
  host = "host",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DomainWebredirEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## EmailForwardEntity

```lua
local email_forward = client:EmailForward(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `destinations` | `table` | Yes |  |
| `href` | `string` | Yes |  |
| `id` | `string` | No |  |
| `message` | `string` | Yes |  |
| `source` | `string` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:EmailForward():create({
  domain = --[[ string ]],
  destinations = --[[ table ]],
  source = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:EmailForward():list({ domain = "example" })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

```lua
local result, err = client:EmailForward():remove({ domain = "domain", source = "source" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:EmailForward():update({
  domain = "domain",
  source = "source",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EmailForwardEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## EmailMailboxEntity

```lua
local email_mailbox = client:EmailMailbox(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | `string` | Yes |  |
| `alias_count` | `number` | No |  |
| `aliases` | `table` | Yes |  |
| `antispam` | `boolean` | Yes |  |
| `autorenew` | `table` | Yes |  |
| `domain` | `string` | Yes |  |
| `errors` | `table` | No |  |
| `expires_at` | `string` | Yes |  |
| `fallback_email` | `string` | No |  |
| `href` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `login` | `string` | Yes |  |
| `mailbox_type` | `string` | Yes |  |
| `message` | `string` | Yes |  |
| `password` | `string` | Yes |  |
| `quota_used` | `number` | Yes |  |
| `responder` | `table` | No |  |
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

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:EmailMailbox():create({
  domain = --[[ string ]],
  login = --[[ string ]],
  mailbox_type = --[[ string ]],
  password = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:EmailMailbox():list({ domain = "example" })
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:EmailMailbox():load({ id = "email_mailbox_id", domain = "domain" })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

```lua
local result, err = client:EmailMailbox():remove({ id = "email_mailbox_id", domain = "domain" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:EmailMailbox():update({
  id = "email_mailbox_id",
  domain = "domain",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EmailMailboxEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## EmailMigrationEntity

```lua
local email_migration = client:EmailMigration(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `available` | `boolean` | Yes |  |
| `currency` | `string` | Yes |  |
| `forward_count` | `number` | Yes |  |
| `free_mailboxes` | `number` | Yes |  |
| `included_mailboxes` | `number` | Yes |  |
| `info` | `table` | Yes |  |
| `message` | `string` | Yes |  |
| `packmail` | `boolean` | Yes |  |
| `price_v1` | `number` | Yes |  |
| `price_v2` | `number` | Yes |  |
| `quota_v1` | `number` | Yes |  |
| `token` | `string` | Yes |  |
| `usage_v1` | `number` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:EmailMigration():create({
  domain = --[[ string ]],
  token = --[[ string ]],
})
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:EmailMigration():load({ domain = "domain" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EmailMigrationEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## EmailOfferEntity

```lua
local email_offer = client:EmailOffer(nil)
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

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:EmailOffer():load({ domain = "domain" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:EmailOffer():update({
  domain = "domain",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EmailOfferEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## EmailSlotEntity

```lua
local email_slot = client:EmailSlot(nil)
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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:EmailSlot():create({
  domain = --[[ string ]],
  duration = --[[ number ]],
  mailbox_type = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:EmailSlot():list({ domain = "example" })
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:EmailSlot():load({ id = 1, domain = "domain" })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

```lua
local result, err = client:EmailSlot():remove({ id = 1, domain = "domain" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EmailSlotEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## HostingApplicationEntity

```lua
local hosting_application = client:HostingApplication(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `string` | Yes |  |
| `name_label` | `string` | Yes |  |
| `requirements` | `table` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:HostingApplication():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:HostingApplication():load({ name = "name" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `HostingApplicationEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## HostingInstanceEntity

```lua
local hosting_instance = client:HostingInstance(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `access_information` | `table` | Yes |  |
| `authentication` | `table` | Yes |  |
| `autorenew` | `table` | Yes |  |
| `available_upgrade` | `boolean` | Yes |  |
| `booster` | `table` | No |  |
| `booster_options` | `table` | No |  |
| `compatible_applications` | `table` | No |  |
| `console` | `table` | Yes |  |
| `cpu` | `number` | Yes |  |
| `created_at` | `string` | Yes |  |
| `database` | `table` | Yes |  |
| `datacenter` | `table` | Yes |  |
| `domain` | `string` | No |  |
| `duration` | `number` | No |  |
| `duration_unit` | `string` | No |  |
| `errors` | `table` | No |  |
| `expire_at` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `language` | `table` | Yes |  |
| `language_id` | `string` | No |  |
| `location` | `string` | Yes |  |
| `message` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `password` | `string` | No |  |
| `password_updated_at` | `string` | No |  |
| `ram` | `table` | Yes |  |
| `sharing_space` | `table` | Yes |  |
| `size` | `string` | Yes |  |
| `snapshot_enabled` | `boolean` | Yes |  |
| `status` | `string` | Yes |  |
| `storage` | `table` | Yes |  |
| `storage_additional_size` | `number` | No |  |
| `subscription_cancelled` | `boolean` | No |  |
| `type` | `table` | Yes |  |
| `upgrade_to` | `table` | No |  |
| `vhosts` | `table` | Yes |  |

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

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:HostingInstance():create({
  authentication = --[[ table ]],
  domain = --[[ string ]],
  location = --[[ string ]],
  size = --[[ string ]],
  type = --[[ table ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:HostingInstance():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:HostingInstance():load({ id = "hosting_instance_id" })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

```lua
local result, err = client:HostingInstance():remove({ id = "hosting_instance_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:HostingInstance():update({
  id = "hosting_instance_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `HostingInstanceEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## HostingVhostEntity

```lua
local hosting_vhost = client:HostingVhost(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `application` | `table` | Yes |  |
| `created_at` | `string` | Yes |  |
| `deployment` | `table` | Yes |  |
| `fqdn` | `string` | Yes |  |
| `https_strategy` | `string` | No |  |
| `is_a_test_vhost` | `boolean` | Yes |  |
| `linked_dns_zone` | `table` | Yes |  |
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

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:HostingVhost():create({
  instance_id = --[[ string ]],
  application = --[[ table ]],
  fqdn = --[[ string ]],
  linked_dns_zone = --[[ table ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:HostingVhost():list({ instance_id = "example" })
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:HostingVhost():load({ fqdn = "fqdn", instance_id = "instance_id" })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

```lua
local result, err = client:HostingVhost():remove({ fqdn = "fqdn", instance_id = "instance_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:HostingVhost():update({
  fqdn = "fqdn",
  instance_id = "instance_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `HostingVhostEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## IssuedCertificateEntity

```lua
local issued_certificate = client:IssuedCertificate(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `altnames` | `table` | Yes |  |
| `altnames_unicode` | `table` | Yes |  |
| `apex_only` | `boolean` | No |  |
| `assumed_name` | `string` | No |  |
| `business_category` | `string` | No |  |
| `card_pay_trustlogo` | `boolean` | No |  |
| `cert` | `string` | No |  |
| `cn` | `string` | Yes |  |
| `cn_unicode` | `string` | Yes |  |
| `contact` | `table` | Yes |  |
| `csr` | `string` | No |  |
| `dates` | `table` | Yes |  |
| `dcv_method` | `string` | No |  |
| `duration` | `number` | No |  |
| `error_msg` | `string` | No |  |
| `errors` | `table` | No |  |
| `href` | `string` | No |  |
| `id` | `string` | Yes |  |
| `ida` | `table` | No |  |
| `intermediate` | `string` | No |  |
| `joi` | `table` | No |  |
| `middleman` | `table` | No |  |
| `owner` | `string` | No |  |
| `package` | `table` | Yes |  |
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
| `tags` | `table` | No |  |
| `trustlogo` | `boolean` | No |  |
| `trustlogo_token` | `table` | No |  |

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

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:IssuedCertificate():create({
  package = --[[ table ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:IssuedCertificate():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:IssuedCertificate():load({ id = "issued_certificate_id" })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

```lua
local result, err = client:IssuedCertificate():remove({ id = "issued_certificate_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:IssuedCertificate():update({
  id = "issued_certificate_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `IssuedCertificateEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## LinkedZoneEntity

```lua
local linked_zone = client:LinkedZone(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | Yes |  |
| `default_records` | `boolean` | Yes |  |
| `domain_count` | `number` | Yes |  |
| `domains` | `table` | No |  |
| `id` | `string` | Yes |  |
| `message` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `record_list` | `table` | No |  |
| `record_text` | `string` | No |  |
| `records` | `table` | No |  |
| `sharing_space` | `table` | Yes |  |
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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:LinkedZone():create({
  name = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:LinkedZone():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:LinkedZone():load({ id = "linked_zone_id" })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

```lua
local result, err = client:LinkedZone():remove({ id = "linked_zone_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:LinkedZone():update({
  id = "linked_zone_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LinkedZoneEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## LinkedZoneDeploymentEntity

```lua
local linked_zone_deployment = client:LinkedZoneDeployment(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deploy` | `boolean` | Yes |  |
| `message` | `string` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:LinkedZoneDeployment():create({
  zone_id = --[[ string ]],
  deploy = --[[ boolean ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LinkedZoneDeploymentEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## LinkedZoneDomainEntity

```lua
local linked_zone_domain = client:LinkedZoneDomain(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deployed` | `boolean` | Yes |  |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `owner` | `string` | Yes |  |
| `zone` | `table` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:LinkedZoneDomain():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:LinkedZoneDomain():load({ name = "name" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LinkedZoneDomainEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## LinkedZoneTaskEntity

```lua
local linked_zone_task = client:LinkedZoneTask(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | Yes |  |
| `ending_at` | `string` | No |  |
| `id` | `string` | Yes |  |
| `result` | `table` | Yes |  |
| `status` | `string` | Yes |  |
| `type` | `string` | Yes |  |
| `updated_at` | `string` | No |  |
| `zone_id` | `string` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:LinkedZoneTask():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:LinkedZoneTask():load({ id = "linked_zone_task_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LinkedZoneTaskEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## LivednsAxfrSlaveEntity

```lua
local livedns_axfr_slave = client:LivednsAxfrSlave(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `message` | `string` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:LivednsAxfrSlave():list({ fqdn = "example" })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

```lua
local result, err = client:LivednsAxfrSlave():remove({ fqdn = "fqdn", ip = "ip" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:LivednsAxfrSlave():update({
  fqdn = "fqdn",
  ip = "ip",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LivednsAxfrSlaveEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## LivednsAxfrTsigEntity

```lua
local livedns_axfr_tsig = client:LivednsAxfrTsig(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `href` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `key_name` | `string` | Yes |  |
| `message` | `string` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:LivednsAxfrTsig():list({ fqdn = "example" })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

```lua
local result, err = client:LivednsAxfrTsig():remove({ id = "livedns_axfr_tsig_id", fqdn = "fqdn" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:LivednsAxfrTsig():update({
  id = "livedns_axfr_tsig_id",
  fqdn = "fqdn",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LivednsAxfrTsigEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## LivednsDomainEntity

```lua
local livedns_domain = client:LivednsDomain(nil)
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
| `zone` | `table` | No |  |

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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:LivednsDomain():create({
  fqdn = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:LivednsDomain():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:LivednsDomain():load({ fqdn = "fqdn" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:LivednsDomain():update({
  fqdn = "fqdn",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LivednsDomainEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## LivednsKeyEntity

```lua
local livedns_key = client:LivednsKey(nil)
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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:LivednsKey():create({
  fqdn = --[[ string ]],
  flags = --[[ number ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:LivednsKey():list({ fqdn = "example" })
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:LivednsKey():load({ id = "livedns_key_id", fqdn = "fqdn" })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

```lua
local result, err = client:LivednsKey():remove({ id = "livedns_key_id", fqdn = "fqdn" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:LivednsKey():update({
  id = "livedns_key_id",
  fqdn = "fqdn",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LivednsKeyEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## LivednsNameserverEntity

```lua
local livedns_nameserver = client:LivednsNameserver(nil)
```

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:LivednsNameserver():list({ fqdn = "example" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LivednsNameserverEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## LivednsRecordEntity

```lua
local livedns_record = client:LivednsRecord(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `add_rrset_values` | `table` | No |  |
| `id` | `string` | No |  |
| `message` | `string` | Yes |  |
| `remove_rrset_values` | `table` | No |  |
| `rrset_href` | `string` | Yes |  |
| `rrset_name` | `string` | Yes |  |
| `rrset_ttl` | `number` | No |  |
| `rrset_type` | `string` | Yes |  |
| `rrset_values` | `table` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:LivednsRecord():create({
  fqdn = --[[ string ]],
  rrset_values = --[[ table ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:LivednsRecord():list({ fqdn = "example" })
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:LivednsRecord():load({ fqdn = "fqdn", rrset_name = "rrset_name", rrset_type = "rrset_type" })
```

#### `patch(reqdata, ctrl) -> any, err`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity, or `nil` and an error on failure.

```lua
local result, err = client:LivednsRecord():patch({
  fqdn = "fqdn",
  rrset_name = "rrset_name",
  rrset_type = "rrset_type",
  -- Only the fields to change
})
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

```lua
local result, err = client:LivednsRecord():remove({ fqdn = "fqdn", rrset_name = "rrset_name", rrset_type = "rrset_type" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:LivednsRecord():update({
  fqdn = "fqdn",
  rrset_name = "rrset_name",
  rrset_type = "rrset_type",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LivednsRecordEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## LivednsRrtypeEntity

```lua
local livedns_rrtype = client:LivednsRrtype(nil)
```

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:LivednsRrtype():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LivednsRrtypeEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## LivednsSnapshotEntity

```lua
local livedns_snapshot = client:LivednsSnapshot(nil)
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
| `zone_data` | `table` | Yes |  |

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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:LivednsSnapshot():create({
  fqdn = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:LivednsSnapshot():list({ fqdn = "example" })
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:LivednsSnapshot():load({ id = "livedns_snapshot_id", fqdn = "fqdn" })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

```lua
local result, err = client:LivednsSnapshot():remove({ id = "livedns_snapshot_id", fqdn = "fqdn" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:LivednsSnapshot():update({
  id = "livedns_snapshot_id",
  fqdn = "fqdn",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LivednsSnapshotEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## LivednsTsigKeyEntity

```lua
local livedns_tsig_key = client:LivednsTsigKey(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `config_samples` | `table` | Yes |  |
| `href` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `key_name` | `string` | Yes |  |
| `secret` | `string` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:LivednsTsigKey():create({
  config_samples = --[[ table ]],
  href = --[[ string ]],
  id = --[[ string ]],
  key_name = --[[ string ]],
  secret = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:LivednsTsigKey():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:LivednsTsigKey():load({ id = "livedns_tsig_key_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LivednsTsigKeyEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## LivednsZoneEntity

```lua
local livedns_zone = client:LivednsZone(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `items` | `table` | Yes |  |
| `message` | `string` | Yes |  |
| `remove_apex_ns` | `boolean` | No |  |

### Operations

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

```lua
local result, err = client:LivednsZone():remove({ fqdn = "fqdn" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:LivednsZone():update({
  fqdn = "fqdn",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LivednsZoneEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## MailboxEntity

```lua
local mailbox = client:Mailbox(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | `string` | Yes |  |
| `aliases` | `table` | No |  |
| `antispam` | `boolean` | Yes |  |
| `autorenew` | `table` | Yes |  |
| `config` | `table` | Yes |  |
| `config_name` | `string` | Yes |  |
| `created_at` | `string` | Yes |  |
| `data_access` | `boolean` | Yes |  |
| `domain_part` | `string` | Yes |  |
| `duration_month` | `number` | No |  |
| `email` | `string` | Yes |  |
| `expires_at` | `string` | Yes |  |
| `internal_domain` | `boolean` | Yes |  |
| `issues` | `table` | No |  |
| `last_paid_duration` | `number` | Yes |  |
| `local_part` | `string` | Yes |  |
| `message` | `string` | Yes |  |
| `owner` | `table` | Yes |  |
| `password` | `string` | Yes |  |
| `quota` | `number` | Yes |  |
| `quota_used` | `number` | Yes |  |
| `responder` | `table` | Yes |  |
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

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:Mailbox():create({
  config_name = --[[ string ]],
  email = --[[ string ]],
  password = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Mailbox():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:Mailbox():load({ address = "address" })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

```lua
local result, err = client:Mailbox():remove({ address = "address" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:Mailbox():update({
  address = "address",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MailboxEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## MailboxDomainEntity

```lua
local mailbox_domain = client:MailboxDomain(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `antispam` | `boolean` | Yes |  |
| `configuration` | `table` | Yes |  |
| `date_last_validation` | `string` | No |  |
| `dkim` | `boolean` | Yes |  |
| `fqdns` | `table` | Yes |  |
| `internal` | `boolean` | Yes |  |
| `is_livedns` | `boolean` | Yes |  |
| `mx` | `boolean` | Yes |  |
| `owner` | `table` | Yes |  |
| `spf` | `boolean` | Yes |  |
| `txt` | `boolean` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:MailboxDomain():create({
  domain = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:MailboxDomain():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:MailboxDomain():load({ domain = "domain" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MailboxDomainEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## MailboxForwardEntity

```lua
local mailbox_forward = client:MailboxForward(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `destinations` | `table` | Yes |  |
| `message` | `string` | Yes |  |
| `source` | `string` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:MailboxForward():create({
  destinations = --[[ table ]],
  source = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:MailboxForward():list()
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

```lua
local result, err = client:MailboxForward():remove({ source = "source" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:MailboxForward():update({
  source = "source",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MailboxForwardEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## MailboxProductEntity

```lua
local mailbox_product = client:MailboxProduct(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `autorenew` | `boolean` | No |  |
| `config` | `table` | Yes |  |
| `config_name` | `string` | Yes |  |
| `description` | `string` | Yes |  |
| `duration_month` | `number` | Yes |  |
| `label` | `string` | Yes |  |
| `message` | `string` | Yes |  |
| `prices` | `table` | Yes |  |
| `quantity` | `number` | Yes |  |
| `taxes` | `table` | Yes |  |
| `uuid` | `string` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:MailboxProduct():create({
  config_name = --[[ string ]],
  duration_month = --[[ number ]],
  quantity = --[[ number ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:MailboxProduct():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MailboxProductEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## MailboxQuotaEntity

```lua
local mailbox_quota = client:MailboxQuota(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `annually` | `table` | Yes |  |
| `config_name` | `string` | Yes |  |
| `label` | `string` | Yes |  |
| `monthly` | `table` | Yes |  |
| `quota` | `string` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:MailboxQuota():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MailboxQuotaEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## MailboxSlotEntity

```lua
local mailbox_slot = client:MailboxSlot(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `autorenew` | `table` | Yes |  |
| `config` | `table` | Yes |  |
| `expires_at` | `string` | No |  |
| `last_paid_duration` | `number` | No |  |
| `refund_info` | `table` | Yes |  |
| `refundable` | `boolean` | Yes |  |
| `uuid` | `string` | Yes |  |
| `webhosting_pack` | `boolean` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:MailboxSlot():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:MailboxSlot():load({ uuid = "uuid" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MailboxSlotEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## OrganizationEntity

```lua
local organization = client:Organization(nil)
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

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:Organization():create({
  city = --[[ string ]],
  email = --[[ string ]],
  firstname = --[[ string ]],
  lastname = --[[ string ]],
  name = --[[ string ]],
  orgname = --[[ string ]],
  phone = --[[ string ]],
  streetaddr = --[[ string ]],
  type = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Organization():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:Organization():load({ id = "organization_id" })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

```lua
local result, err = client:Organization():remove({ id = "organization_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:Organization():update({
  id = "organization_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `OrganizationEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## OrganizationCustomerEntity

```lua
local organization_customer = client:OrganizationCustomer(nil)
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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:OrganizationCustomer():create({
  org_id = --[[ string ]],
  city = --[[ string ]],
  country = --[[ string ]],
  email = --[[ string ]],
  firstname = --[[ string ]],
  lastname = --[[ string ]],
  phone = --[[ string ]],
  streetaddr = --[[ string ]],
  type = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:OrganizationCustomer():list({ org_id = "example" })
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:OrganizationCustomer():load({ id = "organization_customer_id", org_id = "org_id" })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

```lua
local result, err = client:OrganizationCustomer():remove({ id = "organization_customer_id", org_id = "org_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:OrganizationCustomer():update({
  id = "organization_customer_id",
  org_id = "org_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `OrganizationCustomerEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## TemplateEntity

```lua
local template = client:Template(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | Yes |  |
| `editable` | `boolean` | Yes |  |
| `href` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `namespaces` | `table` | Yes |  |
| `orgname` | `string` | Yes |  |
| `payload` | `table` | Yes |  |
| `sharing_space` | `table` | Yes |  |
| `variables` | `table` | Yes |  |

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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:Template():create({
  name = --[[ string ]],
  payload = --[[ table ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Template():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:Template():load({ id = "template_id" })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

```lua
local result, err = client:Template():remove({ id = "template_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:Template():update({
  id = "template_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TemplateEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## TemplateDispatchEntity

```lua
local template_dispatch = client:TemplateDispatch(nil)
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
| `payload` | `table` | Yes |  |
| `sharing_id` | `string` | Yes |  |
| `state` | `number` | Yes |  |
| `state_msg` | `string` | No |  |
| `target` | `table` | Yes |  |
| `target_id` | `string` | Yes |  |
| `target_type` | `string` | Yes |  |
| `task_history` | `table` | Yes |  |
| `task_status` | `table` | Yes |  |
| `task_updated_at` | `string` | No |  |
| `template_id` | `string` | No |  |
| `template_name` | `string` | No |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:TemplateDispatch():create({
  template_id = --[[ string ]],
  object_id = --[[ string ]],
  object_type = --[[ string ]],
})
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:TemplateDispatch():load({ id = "template_dispatch_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TemplateDispatchEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## TldEntity

```lua
local tld = client:Tld(nil)
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

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Tld():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:Tld():load({ name = "name" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TldEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## UserEntity

```lua
local user = client:User(nil)
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

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:User():load({ id = "user_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `UserEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


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

```lua
local client = sdk.new({
  feature = {
    debug = { active = true },
    idempotency = { active = true },
    metrics = { active = true },
    paging = { active = true },
    ratelimit = { active = true },
    retry = { active = true },
    secrets = { active = true },
    test = { active = true },
    timeout = { active = true },
  },
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

