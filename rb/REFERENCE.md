# Gandi Ruby SDK Reference

Complete API reference for the Gandi Ruby SDK.


## GandiSDK

### Constructor

```ruby
require_relative 'Gandi_sdk'

client = GandiSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["apikey"]` | `String` | API key for authentication. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `GandiSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = GandiSDK.test
```


### Instance Methods

#### `AccessToken(data = nil)`

Create a new `AccessToken` entity instance. Pass `nil` for no initial data.

#### `AcmeAccount(data = nil)`

Create a new `AcmeAccount` entity instance. Pass `nil` for no initial data.

#### `AcmeDomain(data = nil)`

Create a new `AcmeDomain` entity instance. Pass `nil` for no initial data.

#### `AcmePrice(data = nil)`

Create a new `AcmePrice` entity instance. Pass `nil` for no initial data.

#### `AcmeSubscription(data = nil)`

Create a new `AcmeSubscription` entity instance. Pass `nil` for no initial data.

#### `BillingInfo(data = nil)`

Create a new `BillingInfo` entity instance. Pass `nil` for no initial data.

#### `BillingPrice(data = nil)`

Create a new `BillingPrice` entity instance. Pass `nil` for no initial data.

#### `CertificateDcv(data = nil)`

Create a new `CertificateDcv` entity instance. Pass `nil` for no initial data.

#### `CertificatePackage(data = nil)`

Create a new `CertificatePackage` entity instance. Pass `nil` for no initial data.

#### `CertificatePem(data = nil)`

Create a new `CertificatePem` entity instance. Pass `nil` for no initial data.

#### `CertificateRenewal(data = nil)`

Create a new `CertificateRenewal` entity instance. Pass `nil` for no initial data.

#### `CertificateTag(data = nil)`

Create a new `CertificateTag` entity instance. Pass `nil` for no initial data.

#### `Comment(data = nil)`

Create a new `Comment` entity instance. Pass `nil` for no initial data.

#### `Domain(data = nil)`

Create a new `Domain` entity instance. Pass `nil` for no initial data.

#### `DomainAvailability(data = nil)`

Create a new `DomainAvailability` entity instance. Pass `nil` for no initial data.

#### `DomainChangeOwner(data = nil)`

Create a new `DomainChangeOwner` entity instance. Pass `nil` for no initial data.

#### `DomainClaim(data = nil)`

Create a new `DomainClaim` entity instance. Pass `nil` for no initial data.

#### `DomainContact(data = nil)`

Create a new `DomainContact` entity instance. Pass `nil` for no initial data.

#### `DomainDnskey(data = nil)`

Create a new `DomainDnskey` entity instance. Pass `nil` for no initial data.

#### `DomainDnssec(data = nil)`

Create a new `DomainDnssec` entity instance. Pass `nil` for no initial data.

#### `DomainHost(data = nil)`

Create a new `DomainHost` entity instance. Pass `nil` for no initial data.

#### `DomainLivedns(data = nil)`

Create a new `DomainLivedns` entity instance. Pass `nil` for no initial data.

#### `DomainNameserver(data = nil)`

Create a new `DomainNameserver` entity instance. Pass `nil` for no initial data.

#### `DomainTag(data = nil)`

Create a new `DomainTag` entity instance. Pass `nil` for no initial data.

#### `DomainTransfer(data = nil)`

Create a new `DomainTransfer` entity instance. Pass `nil` for no initial data.

#### `DomainWebredir(data = nil)`

Create a new `DomainWebredir` entity instance. Pass `nil` for no initial data.

#### `EmailForward(data = nil)`

Create a new `EmailForward` entity instance. Pass `nil` for no initial data.

#### `EmailMailbox(data = nil)`

Create a new `EmailMailbox` entity instance. Pass `nil` for no initial data.

#### `EmailMigration(data = nil)`

Create a new `EmailMigration` entity instance. Pass `nil` for no initial data.

#### `EmailOffer(data = nil)`

Create a new `EmailOffer` entity instance. Pass `nil` for no initial data.

#### `EmailSlot(data = nil)`

Create a new `EmailSlot` entity instance. Pass `nil` for no initial data.

#### `HostingApplication(data = nil)`

Create a new `HostingApplication` entity instance. Pass `nil` for no initial data.

#### `HostingInstance(data = nil)`

Create a new `HostingInstance` entity instance. Pass `nil` for no initial data.

#### `HostingVhost(data = nil)`

Create a new `HostingVhost` entity instance. Pass `nil` for no initial data.

#### `IssuedCertificate(data = nil)`

Create a new `IssuedCertificate` entity instance. Pass `nil` for no initial data.

#### `LinkedZone(data = nil)`

Create a new `LinkedZone` entity instance. Pass `nil` for no initial data.

#### `LinkedZoneDeployment(data = nil)`

Create a new `LinkedZoneDeployment` entity instance. Pass `nil` for no initial data.

#### `LinkedZoneDomain(data = nil)`

Create a new `LinkedZoneDomain` entity instance. Pass `nil` for no initial data.

#### `LinkedZoneTask(data = nil)`

Create a new `LinkedZoneTask` entity instance. Pass `nil` for no initial data.

#### `LivednsAxfrSlave(data = nil)`

Create a new `LivednsAxfrSlave` entity instance. Pass `nil` for no initial data.

#### `LivednsAxfrTsig(data = nil)`

Create a new `LivednsAxfrTsig` entity instance. Pass `nil` for no initial data.

#### `LivednsDomain(data = nil)`

Create a new `LivednsDomain` entity instance. Pass `nil` for no initial data.

#### `LivednsKey(data = nil)`

Create a new `LivednsKey` entity instance. Pass `nil` for no initial data.

#### `LivednsNameserver(data = nil)`

Create a new `LivednsNameserver` entity instance. Pass `nil` for no initial data.

#### `LivednsRecord(data = nil)`

Create a new `LivednsRecord` entity instance. Pass `nil` for no initial data.

#### `LivednsRrtype(data = nil)`

Create a new `LivednsRrtype` entity instance. Pass `nil` for no initial data.

#### `LivednsSnapshot(data = nil)`

Create a new `LivednsSnapshot` entity instance. Pass `nil` for no initial data.

#### `LivednsTsigKey(data = nil)`

Create a new `LivednsTsigKey` entity instance. Pass `nil` for no initial data.

#### `Mailbox(data = nil)`

Create a new `Mailbox` entity instance. Pass `nil` for no initial data.

#### `MailboxDomain(data = nil)`

Create a new `MailboxDomain` entity instance. Pass `nil` for no initial data.

#### `MailboxForward(data = nil)`

Create a new `MailboxForward` entity instance. Pass `nil` for no initial data.

#### `MailboxProduct(data = nil)`

Create a new `MailboxProduct` entity instance. Pass `nil` for no initial data.

#### `MailboxQuota(data = nil)`

Create a new `MailboxQuota` entity instance. Pass `nil` for no initial data.

#### `MailboxSlot(data = nil)`

Create a new `MailboxSlot` entity instance. Pass `nil` for no initial data.

#### `Organization(data = nil)`

Create a new `Organization` entity instance. Pass `nil` for no initial data.

#### `OrganizationCustomer(data = nil)`

Create a new `OrganizationCustomer` entity instance. Pass `nil` for no initial data.

#### `Template(data = nil)`

Create a new `Template` entity instance. Pass `nil` for no initial data.

#### `TemplateDispatch(data = nil)`

Create a new `TemplateDispatch` entity instance. Pass `nil` for no initial data.

#### `Tld(data = nil)`

Create a new `Tld` entity instance. Pass `nil` for no initial data.

#### `User(data = nil)`

Create a new `User` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## AccessTokenEntity

```ruby
access_token = client.AccessToken
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `access_token` | `String` | Yes |  |
| `entities` | `Array` | Yes |  |
| `expires_at` | `String` | Yes |  |
| `id` | `String` | Yes |  |
| `name` | `String` | Yes |  |
| `scopes` | `Array` | Yes |  |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.AccessToken.create({
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AccessTokenEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AcmeAccountEntity

```ruby
acme_account = client.AcmeAccount
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `String` | Yes |  |
| `deleted_at` | `String` | Yes |  |
| `external_id` | `String` | Yes |  |
| `id` | `String` | Yes |  |
| `ip` | `String` | Yes |  |
| `last_activity` | `String` | Yes |  |
| `status` | `String` | Yes |  |
| `subscription_id` | `String` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.AcmeAccount.list({ "subscription_id" => "example", "sharing_id" => "example" })
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.AcmeAccount.load({ "id" => "acme_account_id", "subscription_id" => "subscription_id", "sharing_id" => "sharing_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AcmeAccountEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AcmeDomainEntity

```ruby
acme_domain = client.AcmeDomain
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `String` | Yes |  |
| `deleted_at` | `String` | Yes |  |
| `hostname` | `String` | Yes |  |
| `hostname_ulabel` | `String` | Yes |  |
| `is_wildcard` | `Boolean` | Yes |  |
| `status` | `String` | Yes |  |
| `subscription_id` | `String` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.AcmeDomain.list({ "subscription_id" => "example", "domain" => "example", "sharing_id" => "example" })
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.AcmeDomain.load({ "domain_id" => 1, "subscription_id" => "subscription_id", "sharing_id" => "sharing_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AcmeDomainEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AcmePriceEntity

```ruby
acme_price = client.AcmePrice
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `country` | `String` | Yes |  |
| `currency` | `String` | Yes |  |
| `domains` | `Array` | Yes |  |
| `duration` | `String` | Yes |  |
| `duration_unit` | `String` | Yes |  |
| `grid` | `String` | Yes |  |
| `max_duration` | `Integer` | Yes |  |
| `min_duration` | `Integer` | Yes |  |
| `price_after_taxes` | `String` | Yes |  |
| `price_before_taxes` | `String` | Yes |  |
| `process` | `String` | Yes |  |
| `product` | `Hash` | Yes |  |
| `provider` | `String` | Yes |  |
| `tax_rate` | `String` | Yes |  |
| `taxes` | `Array` | Yes |  |
| `validation_type` | `String` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.AcmePrice.create({
  "sharing_id" => "example_sharing_id", # String
  "country" => "example_country", # String
  "currency" => "example_currency", # String
  "domains" => [], # Array
  "duration" => "example_duration", # String
  "grid" => "example_grid", # String
  "process" => "example_process", # String
  "provider" => "example_provider", # String
  "validation_type" => "example_validation_type", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.AcmePrice.list({ "country" => "example", "currency" => "example", "duration" => "example", "grid" => "example", "process" => "example", "provider" => "example", "sharing_id" => "example", "validation_type" => "example" })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AcmePriceEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AcmeSubscriptionEntity

```ruby
acme_subscription = client.AcmeSubscription
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `country` | `String` | Yes |  |
| `created_at` | `String` | Yes |  |
| `currency` | `String` | Yes |  |
| `domains` | `Array` | Yes |  |
| `duration` | `Integer` | Yes |  |
| `eab_hmac` | `String` | Yes |  |
| `eab_id` | `String` | Yes |  |
| `ends_at` | `String` | Yes |  |
| `grid` | `String` | Yes |  |
| `message` | `String` | Yes |  |
| `name` | `String` | Yes |  |
| `provider` | `String` | Yes |  |
| `server_url` | `String` | Yes |  |
| `status` | `String` | Yes |  |
| `subscription_id` | `String` | Yes |  |
| `validation_type` | `String` | Yes |  |
| `years` | `String` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.AcmeSubscription.create({
  "sharing_id" => "example_sharing_id", # String
  "country" => "example_country", # String
  "currency" => "example_currency", # String
  "domains" => [], # Array
  "duration" => 1, # Integer
  "grid" => "example_grid", # String
  "name" => "example_name", # String
  "provider" => "example_provider", # String
  "validation_type" => "example_validation_type", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.AcmeSubscription.list({ "created_at" => "example", "ends_at" => "example", "name" => "example", "provider" => "example", "sharing_id" => "example", "status" => "example", "validation_type" => "example", "year" => "example" })
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.AcmeSubscription.load({ "subscription_id" => "subscription_id", "sharing_id" => "sharing_id" })
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.AcmeSubscription.remove({ "subscription_id" => "subscription_id", "sharing_id" => "sharing_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.AcmeSubscription.update({
  "subscription_id" => "subscription_id",
  "sharing_id" => "sharing_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AcmeSubscriptionEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## BillingInfoEntity

```ruby
billing_info = client.BillingInfo
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `annual_balance` | `Float` | Yes |  |
| `grid` | `String` | Yes |  |
| `outstanding_amount` | `Float` | Yes |  |
| `prepaid` | `Hash` | Yes |  |
| `prepaid_monthly_invoice` | `Boolean` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.BillingInfo.load({ "sharing_id" => "sharing_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `BillingInfoEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## BillingPriceEntity

```ruby
billing_price = client.BillingPrice
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `currency` | `String` | Yes |  |
| `grid` | `String` | Yes |  |
| `products` | `Array` | Yes |  |
| `taxes` | `Array` | Yes |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.BillingPrice.load({ "type" => "type", "name" => [], "process" => [] })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `BillingPriceEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CertificateDcvEntity

```ruby
certificate_dcv = client.CertificateDcv
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `message` | `String` | Yes |  |
| `method` | `String` | Yes |  |

### Operations

#### `patch(reqdata, ctrl = nil) -> result`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and raises on error.

```ruby
result = client.CertificateDcv.patch({
  "certificate_id" => "certificate_id",
  # Only the fields to change
})
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.CertificateDcv.update({
  "certificate_id" => "certificate_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CertificateDcvEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CertificatePackageEntity

```ruby
certificate_package = client.CertificatePackage
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `category` | `Hash` | Yes |  |
| `href` | `String` | Yes |  |
| `max_domains` | `Integer` | Yes |  |
| `min_domains` | `Integer` | Yes |  |
| `name` | `String` | Yes |  |
| `provider` | `String` | Yes |  |
| `sgc` | `Boolean` | Yes |  |
| `trustlogo` | `Boolean` | Yes |  |
| `warranty` | `Integer` | Yes |  |
| `wildcard` | `Boolean` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.CertificatePackage.list
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.CertificatePackage.load({ "name" => "name" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CertificatePackageEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CertificatePemEntity

```ruby
certificate_pem = client.CertificatePem
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.CertificatePem.load({ "type" => "type" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CertificatePemEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CertificateRenewalEntity

```ruby
certificate_renewal = client.CertificateRenewal
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `csr` | `String` | No |  |
| `dcv_method` | `String` | No |  |
| `duration` | `Integer` | No |  |
| `errors` | `Array` | No |  |
| `status` | `String` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.CertificateRenewal.create({
  "certificate_id" => "example_certificate_id", # String
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CertificateRenewalEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CertificateTagEntity

```ruby
certificate_tag = client.CertificateTag
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `add` | `Array` | Yes |  |
| `message` | `String` | Yes |  |
| `remove` | `Array` | Yes |  |
| `tag` | `String` | Yes |  |
| `tags` | `Array` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.CertificateTag.create({
  "certificate_id" => "example_certificate_id", # String
  "tag" => "example_tag", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.CertificateTag.list({ "certificate_id" => "example" })
results.each { |item| puts item.data_get }
```

#### `patch(reqdata, ctrl = nil) -> result`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and raises on error.

```ruby
result = client.CertificateTag.patch({
  "certificate_id" => "certificate_id",
  # Only the fields to change
})
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.CertificateTag.remove({ "certificate_id" => "certificate_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.CertificateTag.update({
  "certificate_id" => "certificate_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CertificateTagEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CommentEntity

```ruby
comment = client.Comment
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `content` | `String` | Yes |  |
| `created_at` | `String` | No |  |
| `errors` | `Array` | No |  |
| `id` | `String` | Yes |  |
| `status` | `String` | Yes |  |
| `updated_at` | `String` | No |  |
| `user` | `Hash` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.Comment.create({
  "entity_id" => "example_entity_id", # String
  "content" => "example_content", # String
})
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Comment.load({ "entity_id" => "entity_id" })
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.Comment.remove({ "entity_id" => "entity_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CommentEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## DomainEntity

```ruby
domain = client.Domain
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `admin` | `Hash` | Yes |  |
| `authinfo` | `String` | No |  |
| `autorenew` | `Hash` | Yes |  |
| `bill` | `Hash` | Yes |  |
| `can_tld_lock` | `Boolean` | Yes |  |
| `claims` | `String` | No |  |
| `contacts` | `Hash` | Yes |  |
| `currency` | `String` | No |  |
| `dates` | `Hash` | Yes |  |
| `domain_owner` | `String` | Yes |  |
| `duration` | `Integer` | No |  |
| `enforce_premium` | `Boolean` | No |  |
| `errors` | `Array` | No |  |
| `extra_parameters` | `Hash` | No |  |
| `fqdn` | `String` | Yes |  |
| `fqdn_unicode` | `String` | Yes |  |
| `href` | `String` | Yes |  |
| `id` | `String` | No |  |
| `lang` | `String` | No |  |
| `mailbox_optin` | `Boolean` | No |  |
| `nameserver` | `Hash` | Yes |  |
| `nameservers` | `Array` | Yes |  |
| `nameservers_ips` | `Hash` | No |  |
| `orga_owner` | `String` | Yes |  |
| `owner` | `Hash` | Yes |  |
| `price` | `Float` | No |  |
| `reachability` | `String` | Yes |  |
| `resellee_id` | `String` | No |  |
| `services` | `Array` | Yes |  |
| `sharing_id` | `String` | No |  |
| `sharing_space` | `Hash` | Yes |  |
| `smd` | `String` | No |  |
| `status` | `Array` | Yes |  |
| `tags` | `Array` | No |  |
| `tech` | `Hash` | Yes |  |
| `template_id` | `String` | No |  |
| `tld` | `String` | Yes |  |
| `tld_period` | `String` | No |  |
| `trustee_roles` | `Array` | No |  |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.Domain.create({
  "admin" => {}, # Hash
  "bill" => {}, # Hash
  "fqdn" => "example_fqdn", # String
  "owner" => {}, # Hash
  "tech" => {}, # Hash
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Domain.list
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Domain.load({ "fqdn" => "fqdn" })
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.Domain.remove({ "fqdn" => "fqdn" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `DomainEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## DomainAvailabilityEntity

```ruby
domain_availability = client.DomainAvailability
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `currency` | `String` | Yes |  |
| `grid` | `String` | Yes |  |
| `products` | `Array` | Yes |  |
| `taxes` | `Array` | Yes |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.DomainAvailability.load({ "name" => "name" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `DomainAvailabilityEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## DomainChangeOwnerEntity

```ruby
domain_change_owner = client.DomainChangeOwner
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `admin` | `Hash` | Yes |  |
| `bill` | `Hash` | Yes |  |
| `created_at` | `String` | Yes |  |
| `date_start` | `String` | No |  |
| `errors` | `Array` | No |  |
| `errortype` | `String` | No |  |
| `errortype_label` | `String` | No |  |
| `foa` | `Array` | No |  |
| `inner_step` | `String` | No |  |
| `owner` | `Hash` | Yes |  |
| `params` | `Hash` | Yes |  |
| `status` | `String` | Yes |  |
| `step` | `String` | Yes |  |
| `step_nb` | `Integer` | Yes |  |
| `tech` | `Hash` | Yes |  |
| `updated_at` | `String` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.DomainChangeOwner.create({
  "domain" => "example_domain", # String
  "admin" => {}, # Hash
  "bill" => {}, # Hash
  "owner" => {}, # Hash
  "tech" => {}, # Hash
})
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.DomainChangeOwner.load({ "domain" => "domain" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `DomainChangeOwnerEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## DomainClaimEntity

```ruby
domain_claim = client.DomainClaim
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `claims` | `Array` | Yes |  |
| `created_at` | `String` | Yes |  |
| `expires_at` | `String` | Yes |  |
| `fqdn` | `String` | Yes |  |
| `fqdn_alabel` | `String` | Yes |  |
| `fqdn_ulabel` | `String` | Yes |  |
| `notice_id` | `String` | Yes |  |
| `status` | `String` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.DomainClaim.create({
  "domain" => "example_domain", # String
  "claims" => [], # Array
  "created_at" => "example_created_at", # String
  "expires_at" => "example_expires_at", # String
  "fqdn" => "example_fqdn", # String
  "fqdn_alabel" => "example_fqdn_alabel", # String
  "fqdn_ulabel" => "example_fqdn_ulabel", # String
  "notice_id" => "example_notice_id", # String
  "status" => "example_status", # String
})
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.DomainClaim.load({ "domain" => "domain" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `DomainClaimEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## DomainContactEntity

```ruby
domain_contact = client.DomainContact
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `admin` | `Hash` | Yes |  |
| `bill` | `Hash` | Yes |  |
| `message` | `String` | Yes |  |
| `owner` | `Hash` | Yes |  |
| `tech` | `Hash` | Yes |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.DomainContact.load({ "domain" => "domain" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.DomainContact.update({
  "domain" => "domain",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `DomainContactEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## DomainDnskeyEntity

```ruby
domain_dnskey = client.DomainDnskey
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `algorithm` | `Integer` | Yes |  |
| `digest` | `String` | Yes |  |
| `digest_type` | `Integer` | Yes |  |
| `href` | `String` | Yes |  |
| `id` | `Integer` | Yes |  |
| `keys` | `Array` | Yes |  |
| `keytag` | `Integer` | Yes |  |
| `message` | `String` | Yes |  |
| `public_key` | `String` | Yes |  |
| `type` | `String` | Yes |  |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.DomainDnskey.create({
  "domain" => "example_domain", # String
  "algorithm" => 1, # Integer
  "public_key" => "example_public_key", # String
  "type" => "example_type", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.DomainDnskey.list({ "domain" => "example" })
results.each { |item| puts item.data_get }
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.DomainDnskey.remove({ "id" => "domain_dnskey_id", "domain" => "domain" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.DomainDnskey.update({
  "domain" => "domain",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `DomainDnskeyEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## DomainDnssecEntity

```ruby
domain_dnssec = client.DomainDnssec
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `error` | `String` | No |  |
| `state` | `String` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.DomainDnssec.create({
  "domain" => "example_domain", # String
  "state" => "example_state", # String
})
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.DomainDnssec.load({ "domain" => "domain" })
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.DomainDnssec.remove({ "domain" => "domain" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `DomainDnssecEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## DomainHostEntity

```ruby
domain_host = client.DomainHost
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `fqdn` | `String` | Yes |  |
| `fqdn_unicode` | `String` | Yes |  |
| `href` | `String` | Yes |  |
| `ips` | `Array` | Yes |  |
| `message` | `String` | Yes |  |
| `name` | `String` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.DomainHost.create({
  "domain" => "example_domain", # String
  "ips" => [], # Array
  "name" => "example_name", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.DomainHost.list({ "domain" => "example" })
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.DomainHost.load({ "domain" => "domain", "name" => "name" })
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.DomainHost.remove({ "domain" => "domain", "name" => "name" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.DomainHost.update({
  "domain" => "domain",
  "name" => "name",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `DomainHostEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## DomainLivednsEntity

```ruby
domain_livedns = client.DomainLivedns
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `current` | `String` | Yes |  |
| `dnssec_available` | `Boolean` | No |  |
| `livednssec_available` | `Boolean` | No |  |
| `message` | `String` | Yes |  |
| `nameservers` | `Array` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.DomainLivedns.create({
  "domain" => "example_domain", # String
  "current" => "example_current", # String
  "message" => "example_message", # String
  "nameservers" => [], # Array
})
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.DomainLivedns.load({ "domain" => "domain" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `DomainLivednsEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## DomainNameserverEntity

```ruby
domain_nameserver = client.DomainNameserver
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `message` | `String` | Yes |  |
| `nameservers` | `Array` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.DomainNameserver.list({ "domain" => "example" })
results.each { |item| puts item.data_get }
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.DomainNameserver.update({
  "domain" => "domain",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `DomainNameserverEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## DomainTagEntity

```ruby
domain_tag = client.DomainTag
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `add` | `Array` | Yes |  |
| `message` | `String` | Yes |  |
| `remove` | `Array` | Yes |  |
| `tag` | `String` | Yes |  |
| `tags` | `Array` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.DomainTag.create({
  "domain" => "example_domain", # String
  "tag" => "example_tag", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.DomainTag.list({ "domain" => "example" })
results.each { |item| puts item.data_get }
```

#### `patch(reqdata, ctrl = nil) -> result`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and raises on error.

```ruby
result = client.DomainTag.patch({
  "domain" => "domain",
  # Only the fields to change
})
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.DomainTag.remove({ "domain" => "domain" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.DomainTag.update({
  "domain" => "domain",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `DomainTagEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## DomainTransferEntity

```ruby
domain_transfer = client.DomainTransfer
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `admin` | `Hash` | Yes |  |
| `authinfo` | `String` | No |  |
| `bill` | `Hash` | Yes |  |
| `change_owner` | `Boolean` | No |  |
| `created_at` | `String` | Yes |  |
| `currency` | `String` | No |  |
| `duration` | `Integer` | No |  |
| `enforce_premium` | `Boolean` | No |  |
| `errors` | `Array` | No |  |
| `errortype` | `String` | No |  |
| `errortype_label` | `String` | No |  |
| `extra_parameters` | `Hash` | No |  |
| `foa` | `Array` | No |  |
| `fqdn` | `String` | Yes |  |
| `inner_step` | `String` | No |  |
| `mailbox_optin` | `Boolean` | No |  |
| `message` | `String` | Yes |  |
| `nameservers` | `Array` | No |  |
| `nameservers_ips` | `Hash` | No |  |
| `owner` | `Hash` | Yes |  |
| `owner_contact` | `String` | Yes |  |
| `params` | `Hash` | Yes |  |
| `price` | `Float` | No |  |
| `regac_at` | `String` | No |  |
| `resellee_id` | `String` | No |  |
| `start_at` | `String` | No |  |
| `status` | `String` | Yes |  |
| `step` | `String` | Yes |  |
| `step_nb` | `Integer` | Yes |  |
| `tech` | `Hash` | Yes |  |
| `template_id` | `String` | No |  |
| `transfer_link` | `String` | No |  |
| `transfer_procedure` | `String` | No |  |
| `updated_at` | `String` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.DomainTransfer.create({
  "admin" => {}, # Hash
  "bill" => {}, # Hash
  "fqdn" => "example_fqdn", # String
  "owner" => {}, # Hash
  "tech" => {}, # Hash
})
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.DomainTransfer.load({ "domain" => "domain" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.DomainTransfer.update({
  "domain" => "domain",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `DomainTransferEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## DomainWebredirEntity

```ruby
domain_webredir = client.DomainWebredir
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cert_status` | `String` | No |  |
| `cert_uuid` | `String` | No |  |
| `created_at` | `String` | No |  |
| `host` | `String` | Yes |  |
| `message` | `String` | Yes |  |
| `override` | `Boolean` | Yes |  |
| `protocol` | `String` | No |  |
| `type` | `String` | Yes |  |
| `updated_at` | `String` | No |  |
| `url` | `String` | Yes |  |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.DomainWebredir.create({
  "domain" => "example_domain", # String
  "host" => "example_host", # String
  "override" => true, # Boolean
  "protocol" => "example_protocol", # String
  "type" => "example_type", # String
  "url" => "example_url", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.DomainWebredir.list({ "domain" => "example" })
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.DomainWebredir.load({ "domain" => "domain", "host" => "host" })
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.DomainWebredir.remove({ "domain" => "domain", "host" => "host" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.DomainWebredir.update({
  "domain" => "domain",
  "host" => "host",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `DomainWebredirEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## EmailForwardEntity

```ruby
email_forward = client.EmailForward
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `destinations` | `Array` | Yes |  |
| `href` | `String` | Yes |  |
| `id` | `String` | No |  |
| `message` | `String` | Yes |  |
| `source` | `String` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.EmailForward.create({
  "domain" => "example_domain", # String
  "destinations" => [], # Array
  "source" => "example_source", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.EmailForward.list({ "domain" => "example" })
results.each { |item| puts item.data_get }
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.EmailForward.remove({ "domain" => "domain", "source" => "source" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.EmailForward.update({
  "domain" => "domain",
  "source" => "source",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `EmailForwardEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## EmailMailboxEntity

```ruby
email_mailbox = client.EmailMailbox
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | `String` | Yes |  |
| `alias_count` | `Integer` | No |  |
| `aliases` | `Array` | Yes |  |
| `antispam` | `Boolean` | Yes |  |
| `autorenew` | `Hash` | Yes |  |
| `domain` | `String` | Yes |  |
| `errors` | `Array` | No |  |
| `expires_at` | `String` | Yes |  |
| `fallback_email` | `String` | No |  |
| `href` | `String` | Yes |  |
| `id` | `String` | Yes |  |
| `login` | `String` | Yes |  |
| `mailbox_type` | `String` | Yes |  |
| `message` | `String` | Yes |  |
| `password` | `String` | Yes |  |
| `quota_used` | `Integer` | Yes |  |
| `responder` | `Hash` | No |  |
| `status` | `String` | Yes |  |
| `to_convert` | `Boolean` | Yes |  |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.EmailMailbox.create({
  "domain" => "example_domain", # String
  "login" => "example_login", # String
  "mailbox_type" => "example_mailbox_type", # String
  "password" => "example_password", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.EmailMailbox.list({ "domain" => "example" })
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.EmailMailbox.load({ "id" => "email_mailbox_id", "domain" => "domain" })
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.EmailMailbox.remove({ "id" => "email_mailbox_id", "domain" => "domain" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.EmailMailbox.update({
  "id" => "email_mailbox_id",
  "domain" => "domain",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `EmailMailboxEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## EmailMigrationEntity

```ruby
email_migration = client.EmailMigration
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `available` | `Boolean` | Yes |  |
| `currency` | `String` | Yes |  |
| `forward_count` | `Integer` | Yes |  |
| `free_mailboxes` | `Integer` | Yes |  |
| `included_mailboxes` | `Integer` | Yes |  |
| `info` | `Array` | Yes |  |
| `message` | `String` | Yes |  |
| `packmail` | `Boolean` | Yes |  |
| `price_v1` | `Float` | Yes |  |
| `price_v2` | `Float` | Yes |  |
| `quota_v1` | `Float` | Yes |  |
| `token` | `String` | Yes |  |
| `usage_v1` | `Float` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.EmailMigration.create({
  "domain" => "example_domain", # String
  "token" => "example_token", # String
})
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.EmailMigration.load({ "domain" => "domain" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `EmailMigrationEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## EmailOfferEntity

```ruby
email_offer = client.EmailOffer
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `antispam` | `String` | Yes |  |
| `dkim` | `String` | Yes |  |
| `message` | `String` | Yes |  |
| `status` | `String` | Yes |  |
| `version` | `Integer` | Yes |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.EmailOffer.load({ "domain" => "domain" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.EmailOffer.update({
  "domain" => "domain",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `EmailOfferEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## EmailSlotEntity

```ruby
email_slot = client.EmailSlot
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `autorenew` | `Boolean` | No |  |
| `capacity` | `Integer` | Yes |  |
| `created_at` | `String` | Yes |  |
| `duration` | `Integer` | Yes |  |
| `gandi_id` | `Integer` | Yes |  |
| `href` | `String` | Yes |  |
| `id` | `String` | Yes |  |
| `mailbox_type` | `String` | Yes |  |
| `refund_amount` | `Float` | No |  |
| `refund_currency` | `String` | No |  |
| `refundable` | `Boolean` | Yes |  |
| `status` | `String` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.EmailSlot.create({
  "domain" => "example_domain", # String
  "duration" => 1, # Integer
  "mailbox_type" => "example_mailbox_type", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.EmailSlot.list({ "domain" => "example" })
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.EmailSlot.load({ "id" => 1, "domain" => "domain" })
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.EmailSlot.remove({ "id" => 1, "domain" => "domain" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `EmailSlotEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## HostingApplicationEntity

```ruby
hosting_application = client.HostingApplication
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `String` | Yes |  |
| `name_label` | `String` | Yes |  |
| `requirements` | `Array` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.HostingApplication.list
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.HostingApplication.load({ "name" => "name" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `HostingApplicationEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## HostingInstanceEntity

```ruby
hosting_instance = client.HostingInstance
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `access_information` | `Hash` | Yes |  |
| `authentication` | `Hash` | Yes |  |
| `autorenew` | `Hash` | Yes |  |
| `available_upgrade` | `Boolean` | Yes |  |
| `booster` | `Hash` | No |  |
| `booster_options` | `Hash` | No |  |
| `compatible_applications` | `Array` | No |  |
| `console` | `Hash` | Yes |  |
| `cpu` | `Integer` | Yes |  |
| `created_at` | `String` | Yes |  |
| `database` | `Hash` | Yes |  |
| `datacenter` | `Hash` | Yes |  |
| `domain` | `String` | No |  |
| `duration` | `Integer` | No |  |
| `duration_unit` | `String` | No |  |
| `errors` | `Array` | No |  |
| `expire_at` | `String` | Yes |  |
| `id` | `String` | Yes |  |
| `language` | `Hash` | Yes |  |
| `language_id` | `String` | No |  |
| `location` | `String` | Yes |  |
| `message` | `String` | Yes |  |
| `name` | `String` | Yes |  |
| `password` | `String` | No |  |
| `password_updated_at` | `String` | No |  |
| `ram` | `Hash` | Yes |  |
| `sharing_space` | `Hash` | Yes |  |
| `size` | `String` | Yes |  |
| `snapshot_enabled` | `Boolean` | Yes |  |
| `status` | `String` | Yes |  |
| `storage` | `Hash` | Yes |  |
| `storage_additional_size` | `Integer` | No |  |
| `subscription_cancelled` | `Boolean` | No |  |
| `type` | `Hash` | Yes |  |
| `upgrade_to` | `Array` | No |  |
| `vhosts` | `Array` | Yes |  |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.HostingInstance.create({
  "authentication" => {}, # Hash
  "domain" => "example_domain", # String
  "location" => "example_location", # String
  "size" => "example_size", # String
  "type" => {}, # Hash
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.HostingInstance.list
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.HostingInstance.load({ "id" => "hosting_instance_id" })
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.HostingInstance.remove({ "id" => "hosting_instance_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.HostingInstance.update({
  "id" => "hosting_instance_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `HostingInstanceEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## HostingVhostEntity

```ruby
hosting_vhost = client.HostingVhost
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `application` | `Hash` | Yes |  |
| `created_at` | `String` | Yes |  |
| `deployment` | `Hash` | Yes |  |
| `fqdn` | `String` | Yes |  |
| `https_strategy` | `String` | No |  |
| `is_a_test_vhost` | `Boolean` | Yes |  |
| `linked_dns_zone` | `Hash` | Yes |  |
| `status` | `String` | Yes |  |
| `tls_validated_at` | `String` | No |  |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.HostingVhost.create({
  "instance_id" => "example_instance_id", # String
  "application" => {}, # Hash
  "fqdn" => "example_fqdn", # String
  "linked_dns_zone" => {}, # Hash
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.HostingVhost.list({ "instance_id" => "example" })
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.HostingVhost.load({ "fqdn" => "fqdn", "instance_id" => "instance_id" })
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.HostingVhost.remove({ "fqdn" => "fqdn", "instance_id" => "instance_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.HostingVhost.update({
  "fqdn" => "fqdn",
  "instance_id" => "instance_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `HostingVhostEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## IssuedCertificateEntity

```ruby
issued_certificate = client.IssuedCertificate
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `altnames` | `Array` | Yes |  |
| `altnames_unicode` | `Array` | Yes |  |
| `apex_only` | `Boolean` | No |  |
| `assumed_name` | `String` | No |  |
| `business_category` | `String` | No |  |
| `card_pay_trustlogo` | `Boolean` | No |  |
| `cert` | `String` | No |  |
| `cn` | `String` | Yes |  |
| `cn_unicode` | `String` | Yes |  |
| `contact` | `Hash` | Yes |  |
| `csr` | `String` | No |  |
| `dates` | `Hash` | Yes |  |
| `dcv_method` | `String` | No |  |
| `duration` | `Integer` | No |  |
| `error_msg` | `String` | No |  |
| `errors` | `Array` | No |  |
| `href` | `String` | No |  |
| `id` | `String` | Yes |  |
| `ida` | `Hash` | No |  |
| `intermediate` | `String` | No |  |
| `joi` | `Hash` | No |  |
| `middleman` | `Hash` | No |  |
| `owner` | `String` | No |  |
| `package` | `Hash` | Yes |  |
| `provider` | `String` | Yes |  |
| `reissuable` | `Boolean` | No |  |
| `renewable` | `Boolean` | No |  |
| `resellee_id` | `String` | No |  |
| `sha_version` | `Integer` | No |  |
| `sharing_id` | `String` | No |  |
| `software` | `Integer` | Yes |  |
| `state` | `String` | No |  |
| `state_detail` | `String` | No |  |
| `status` | `String` | Yes |  |
| `step_nb` | `Integer` | No |  |
| `stored` | `Boolean` | No |  |
| `tags` | `Array` | No |  |
| `trustlogo` | `Boolean` | No |  |
| `trustlogo_token` | `Hash` | No |  |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.IssuedCertificate.create({
  "package" => {}, # Hash
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.IssuedCertificate.list
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.IssuedCertificate.load({ "id" => "issued_certificate_id" })
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.IssuedCertificate.remove({ "id" => "issued_certificate_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.IssuedCertificate.update({
  "id" => "issued_certificate_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `IssuedCertificateEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## LinkedZoneEntity

```ruby
linked_zone = client.LinkedZone
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `String` | Yes |  |
| `default_records` | `Boolean` | Yes |  |
| `domain_count` | `Integer` | Yes |  |
| `domains` | `Array` | No |  |
| `id` | `String` | Yes |  |
| `message` | `String` | Yes |  |
| `name` | `String` | Yes |  |
| `record_list` | `Array` | No |  |
| `record_text` | `String` | No |  |
| `records` | `Array` | No |  |
| `sharing_space` | `Hash` | Yes |  |
| `status` | `String` | Yes |  |
| `updated_at` | `String` | No |  |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.LinkedZone.create({
  "name" => "example_name", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.LinkedZone.list
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.LinkedZone.load({ "id" => "linked_zone_id" })
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.LinkedZone.remove({ "id" => "linked_zone_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.LinkedZone.update({
  "id" => "linked_zone_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `LinkedZoneEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## LinkedZoneDeploymentEntity

```ruby
linked_zone_deployment = client.LinkedZoneDeployment
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deploy` | `Boolean` | Yes |  |
| `message` | `String` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.LinkedZoneDeployment.create({
  "zone_id" => "example_zone_id", # String
  "deploy" => true, # Boolean
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `LinkedZoneDeploymentEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## LinkedZoneDomainEntity

```ruby
linked_zone_domain = client.LinkedZoneDomain
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deployed` | `Boolean` | Yes |  |
| `id` | `String` | Yes |  |
| `name` | `String` | Yes |  |
| `owner` | `String` | Yes |  |
| `zone` | `Hash` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.LinkedZoneDomain.list
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.LinkedZoneDomain.load({ "name" => "name" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `LinkedZoneDomainEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## LinkedZoneTaskEntity

```ruby
linked_zone_task = client.LinkedZoneTask
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `String` | Yes |  |
| `ending_at` | `String` | No |  |
| `id` | `String` | Yes |  |
| `result` | `Hash` | Yes |  |
| `status` | `String` | Yes |  |
| `type` | `String` | Yes |  |
| `updated_at` | `String` | No |  |
| `zone_id` | `String` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.LinkedZoneTask.list
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.LinkedZoneTask.load({ "id" => "linked_zone_task_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `LinkedZoneTaskEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## LivednsAxfrSlaveEntity

```ruby
livedns_axfr_slave = client.LivednsAxfrSlave
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `message` | `String` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.LivednsAxfrSlave.list({ "fqdn" => "example" })
results.each { |item| puts item.data_get }
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.LivednsAxfrSlave.remove({ "fqdn" => "fqdn", "ip" => "ip" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.LivednsAxfrSlave.update({
  "fqdn" => "fqdn",
  "ip" => "ip",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `LivednsAxfrSlaveEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## LivednsAxfrTsigEntity

```ruby
livedns_axfr_tsig = client.LivednsAxfrTsig
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `href` | `String` | Yes |  |
| `id` | `String` | Yes |  |
| `key_name` | `String` | Yes |  |
| `message` | `String` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.LivednsAxfrTsig.list({ "fqdn" => "example" })
results.each { |item| puts item.data_get }
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.LivednsAxfrTsig.remove({ "id" => "livedns_axfr_tsig_id", "fqdn" => "fqdn" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.LivednsAxfrTsig.update({
  "id" => "livedns_axfr_tsig_id",
  "fqdn" => "fqdn",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `LivednsAxfrTsigEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## LivednsDomainEntity

```ruby
livedns_domain = client.LivednsDomain
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `automatic_snapshots` | `Boolean` | Yes |  |
| `domain_href` | `String` | Yes |  |
| `domain_keys_href` | `String` | Yes |  |
| `domain_records_href` | `String` | Yes |  |
| `fqdn` | `String` | Yes |  |
| `message` | `String` | Yes |  |
| `zone` | `Hash` | No |  |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `automatic_snapshots` | - | - | - | Yes | - |
| `domain_href` | - | - | - | - | - |
| `domain_keys_href` | - | - | - | - | - |
| `domain_records_href` | - | - | - | - | - |
| `fqdn` | - | - | - | - | - |
| `message` | - | - | - | - | - |
| `zone` | - | - | - | - | - |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.LivednsDomain.create({
  "fqdn" => "example_fqdn", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.LivednsDomain.list
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.LivednsDomain.load({ "fqdn" => "fqdn" })
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.LivednsDomain.remove({ "fqdn" => "fqdn" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.LivednsDomain.update({
  "fqdn" => "fqdn",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `LivednsDomainEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## LivednsKeyEntity

```ruby
livedns_key = client.LivednsKey
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `algorithm` | `Integer` | Yes |  |
| `algorithm_name` | `String` | Yes |  |
| `deleted` | `Boolean` | Yes |  |
| `ds` | `String` | Yes |  |
| `fingerprint` | `String` | Yes |  |
| `flags` | `Integer` | Yes |  |
| `fqdn` | `String` | Yes |  |
| `id` | `String` | Yes |  |
| `key_href` | `String` | Yes |  |
| `message` | `String` | Yes |  |
| `public_key` | `String` | Yes |  |
| `status` | `String` | Yes |  |
| `tag` | `Integer` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.LivednsKey.create({
  "fqdn" => "example_fqdn", # String
  "flags" => 1, # Integer
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.LivednsKey.list({ "fqdn" => "example" })
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.LivednsKey.load({ "id" => "livedns_key_id", "fqdn" => "fqdn" })
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.LivednsKey.remove({ "id" => "livedns_key_id", "fqdn" => "fqdn" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.LivednsKey.update({
  "id" => "livedns_key_id",
  "fqdn" => "fqdn",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `LivednsKeyEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## LivednsNameserverEntity

```ruby
livedns_nameserver = client.LivednsNameserver
```

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.LivednsNameserver.list({ "fqdn" => "example" })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `LivednsNameserverEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## LivednsRecordEntity

```ruby
livedns_record = client.LivednsRecord
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `add_rrset_values` | `Array` | No |  |
| `id` | `String` | No |  |
| `message` | `String` | Yes |  |
| `remove_rrset_values` | `Array` | No |  |
| `rrset_href` | `String` | Yes |  |
| `rrset_name` | `String` | Yes |  |
| `rrset_ttl` | `Integer` | No |  |
| `rrset_type` | `String` | Yes |  |
| `rrset_values` | `Array` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.LivednsRecord.create({
  "fqdn" => "example_fqdn", # String
  "rrset_values" => [], # Array
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.LivednsRecord.list({ "fqdn" => "example" })
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.LivednsRecord.load({ "fqdn" => "fqdn", "rrset_name" => "rrset_name", "rrset_type" => "rrset_type" })
```

#### `patch(reqdata, ctrl = nil) -> result`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and raises on error.

```ruby
result = client.LivednsRecord.patch({
  "fqdn" => "fqdn",
  "rrset_name" => "rrset_name",
  "rrset_type" => "rrset_type",
  # Only the fields to change
})
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.LivednsRecord.remove({ "fqdn" => "fqdn", "rrset_name" => "rrset_name", "rrset_type" => "rrset_type" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.LivednsRecord.update({
  "fqdn" => "fqdn",
  "rrset_name" => "rrset_name",
  "rrset_type" => "rrset_type",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `LivednsRecordEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## LivednsRrtypeEntity

```ruby
livedns_rrtype = client.LivednsRrtype
```

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.LivednsRrtype.list
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `LivednsRrtypeEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## LivednsSnapshotEntity

```ruby
livedns_snapshot = client.LivednsSnapshot
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `automatic` | `Boolean` | Yes |  |
| `created_at` | `String` | Yes |  |
| `href` | `String` | Yes |  |
| `id` | `String` | Yes |  |
| `message` | `String` | Yes |  |
| `name` | `String` | Yes |  |
| `zone_data` | `Array` | Yes |  |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.LivednsSnapshot.create({
  "fqdn" => "example_fqdn", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.LivednsSnapshot.list({ "fqdn" => "example" })
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.LivednsSnapshot.load({ "id" => "livedns_snapshot_id", "fqdn" => "fqdn" })
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.LivednsSnapshot.remove({ "id" => "livedns_snapshot_id", "fqdn" => "fqdn" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.LivednsSnapshot.update({
  "id" => "livedns_snapshot_id",
  "fqdn" => "fqdn",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `LivednsSnapshotEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## LivednsTsigKeyEntity

```ruby
livedns_tsig_key = client.LivednsTsigKey
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `config_samples` | `Hash` | Yes |  |
| `href` | `String` | Yes |  |
| `id` | `String` | Yes |  |
| `key_name` | `String` | Yes |  |
| `secret` | `String` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.LivednsTsigKey.create({
  "config_samples" => {}, # Hash
  "href" => "example_href", # String
  "id" => "example_id", # String
  "key_name" => "example_key_name", # String
  "secret" => "example_secret", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.LivednsTsigKey.list
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.LivednsTsigKey.load({ "id" => "livedns_tsig_key_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `LivednsTsigKeyEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## MailboxEntity

```ruby
mailbox = client.Mailbox
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | `String` | Yes |  |
| `aliases` | `Array` | No |  |
| `antispam` | `Boolean` | Yes |  |
| `autorenew` | `Hash` | Yes |  |
| `config` | `Hash` | Yes |  |
| `config_name` | `String` | Yes |  |
| `created_at` | `String` | Yes |  |
| `data_access` | `Boolean` | Yes |  |
| `domain_part` | `String` | Yes |  |
| `duration_month` | `Integer` | No |  |
| `email` | `String` | Yes |  |
| `expires_at` | `String` | Yes |  |
| `internal_domain` | `Boolean` | Yes |  |
| `issues` | `Array` | No |  |
| `last_paid_duration` | `Integer` | Yes |  |
| `local_part` | `String` | Yes |  |
| `message` | `String` | Yes |  |
| `owner` | `Hash` | Yes |  |
| `password` | `String` | Yes |  |
| `quota` | `Integer` | Yes |  |
| `quota_used` | `Integer` | Yes |  |
| `responder` | `Hash` | Yes |  |
| `updated_at` | `String` | Yes |  |
| `uuid` | `String` | Yes |  |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.Mailbox.create({
  "config_name" => "example_config_name", # String
  "email" => "example_email", # String
  "password" => "example_password", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Mailbox.list
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Mailbox.load({ "address" => "address" })
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.Mailbox.remove({ "address" => "address" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.Mailbox.update({
  "address" => "address",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `MailboxEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## MailboxDomainEntity

```ruby
mailbox_domain = client.MailboxDomain
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `antispam` | `Boolean` | Yes |  |
| `configuration` | `Array` | Yes |  |
| `date_last_validation` | `String` | No |  |
| `dkim` | `Boolean` | Yes |  |
| `fqdns` | `Array` | Yes |  |
| `internal` | `Boolean` | Yes |  |
| `is_livedns` | `Boolean` | Yes |  |
| `mx` | `Boolean` | Yes |  |
| `owner` | `Hash` | Yes |  |
| `spf` | `Boolean` | Yes |  |
| `txt` | `Boolean` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.MailboxDomain.create({
  "domain" => "example_domain", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.MailboxDomain.list
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.MailboxDomain.load({ "domain" => "domain" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `MailboxDomainEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## MailboxForwardEntity

```ruby
mailbox_forward = client.MailboxForward
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `destinations` | `Array` | Yes |  |
| `message` | `String` | Yes |  |
| `source` | `String` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.MailboxForward.create({
  "destinations" => [], # Array
  "source" => "example_source", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.MailboxForward.list
results.each { |item| puts item.data_get }
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.MailboxForward.remove({ "source" => "source" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.MailboxForward.update({
  "source" => "source",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `MailboxForwardEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## MailboxProductEntity

```ruby
mailbox_product = client.MailboxProduct
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `autorenew` | `Boolean` | No |  |
| `config` | `Array` | Yes |  |
| `config_name` | `String` | Yes |  |
| `description` | `String` | Yes |  |
| `duration_month` | `Integer` | Yes |  |
| `label` | `String` | Yes |  |
| `message` | `String` | Yes |  |
| `prices` | `Array` | Yes |  |
| `quantity` | `Integer` | Yes |  |
| `taxes` | `Array` | Yes |  |
| `uuid` | `String` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.MailboxProduct.create({
  "config_name" => "example_config_name", # String
  "duration_month" => 1, # Integer
  "quantity" => 1, # Integer
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.MailboxProduct.list
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `MailboxProductEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## MailboxQuotaEntity

```ruby
mailbox_quota = client.MailboxQuota
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `annually` | `Hash` | Yes |  |
| `config_name` | `String` | Yes |  |
| `label` | `String` | Yes |  |
| `monthly` | `Hash` | Yes |  |
| `quota` | `String` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.MailboxQuota.list
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `MailboxQuotaEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## MailboxSlotEntity

```ruby
mailbox_slot = client.MailboxSlot
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `autorenew` | `Hash` | Yes |  |
| `config` | `Hash` | Yes |  |
| `expires_at` | `String` | No |  |
| `last_paid_duration` | `Integer` | No |  |
| `refund_info` | `Hash` | Yes |  |
| `refundable` | `Boolean` | Yes |  |
| `uuid` | `String` | Yes |  |
| `webhosting_pack` | `Boolean` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.MailboxSlot.list
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.MailboxSlot.load({ "uuid" => "uuid" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `MailboxSlotEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## OrganizationEntity

```ruby
organization = client.Organization
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `city` | `String` | Yes |  |
| `corporate` | `Boolean` | Yes |  |
| `country` | `String` | Yes |  |
| `email` | `String` | Yes |  |
| `fax` | `String` | No |  |
| `firstname` | `String` | Yes |  |
| `id` | `String` | Yes |  |
| `lang` | `String` | No |  |
| `lastname` | `String` | Yes |  |
| `message` | `String` | Yes |  |
| `name` | `String` | Yes |  |
| `orgname` | `String` | No |  |
| `phone` | `String` | No |  |
| `reference` | `String` | No |  |
| `reseller` | `Boolean` | Yes |  |
| `siren` | `String` | No |  |
| `state` | `String` | No |  |
| `streetaddr` | `String` | Yes |  |
| `streetaddr2` | `String` | No |  |
| `type` | `String` | Yes |  |
| `vat_number` | `String` | No |  |
| `zip` | `String` | Yes |  |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.Organization.create({
  "city" => "example_city", # String
  "email" => "example_email", # String
  "firstname" => "example_firstname", # String
  "lastname" => "example_lastname", # String
  "name" => "example_name", # String
  "orgname" => "example_orgname", # String
  "phone" => "example_phone", # String
  "streetaddr" => "example_streetaddr", # String
  "type" => "example_type", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Organization.list
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Organization.load({ "id" => "organization_id" })
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.Organization.remove({ "id" => "organization_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.Organization.update({
  "id" => "organization_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `OrganizationEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## OrganizationCustomerEntity

```ruby
organization_customer = client.OrganizationCustomer
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `city` | `String` | Yes |  |
| `country` | `String` | Yes |  |
| `email` | `String` | Yes |  |
| `fax` | `String` | No |  |
| `firstname` | `String` | Yes |  |
| `id` | `String` | Yes |  |
| `lang` | `String` | No |  |
| `lastname` | `String` | Yes |  |
| `message` | `String` | Yes |  |
| `name` | `String` | Yes |  |
| `orgname` | `String` | No |  |
| `phone` | `String` | No |  |
| `reference` | `String` | No |  |
| `siren` | `String` | No |  |
| `state` | `String` | No |  |
| `streetaddr` | `String` | Yes |  |
| `streetaddr2` | `String` | No |  |
| `sync_contact_email` | `String` | No |  |
| `type` | `String` | Yes |  |
| `vat_number` | `String` | No |  |
| `zip` | `String` | No |  |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.OrganizationCustomer.create({
  "org_id" => "example_org_id", # String
  "city" => "example_city", # String
  "country" => "example_country", # String
  "email" => "example_email", # String
  "firstname" => "example_firstname", # String
  "lastname" => "example_lastname", # String
  "phone" => "example_phone", # String
  "streetaddr" => "example_streetaddr", # String
  "type" => "example_type", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.OrganizationCustomer.list({ "org_id" => "example" })
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.OrganizationCustomer.load({ "id" => "organization_customer_id", "org_id" => "org_id" })
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.OrganizationCustomer.remove({ "id" => "organization_customer_id", "org_id" => "org_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.OrganizationCustomer.update({
  "id" => "organization_customer_id",
  "org_id" => "org_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `OrganizationCustomerEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## TemplateEntity

```ruby
template = client.Template
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `String` | Yes |  |
| `editable` | `Boolean` | Yes |  |
| `href` | `String` | Yes |  |
| `id` | `String` | Yes |  |
| `name` | `String` | Yes |  |
| `namespaces` | `Array` | Yes |  |
| `orgname` | `String` | Yes |  |
| `payload` | `Hash` | Yes |  |
| `sharing_space` | `Hash` | Yes |  |
| `variables` | `Array` | Yes |  |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.Template.create({
  "name" => "example_name", # String
  "payload" => {}, # Hash
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Template.list
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Template.load({ "id" => "template_id" })
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.Template.remove({ "id" => "template_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.Template.update({
  "id" => "template_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `TemplateEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## TemplateDispatchEntity

```ruby
template_dispatch = client.TemplateDispatch
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attempt` | `Integer` | Yes |  |
| `created_at` | `String` | Yes |  |
| `dispatch_href` | `String` | Yes |  |
| `id` | `String` | Yes |  |
| `message` | `String` | Yes |  |
| `object_id` | `String` | Yes |  |
| `object_type` | `String` | Yes |  |
| `payload` | `Hash` | Yes |  |
| `sharing_id` | `String` | Yes |  |
| `state` | `Integer` | Yes |  |
| `state_msg` | `String` | No |  |
| `target` | `Hash` | Yes |  |
| `target_id` | `String` | Yes |  |
| `target_type` | `String` | Yes |  |
| `task_history` | `Array` | Yes |  |
| `task_status` | `Hash` | Yes |  |
| `task_updated_at` | `String` | No |  |
| `template_id` | `String` | No |  |
| `template_name` | `String` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.TemplateDispatch.create({
  "template_id" => "example_template_id", # String
  "object_id" => "example_object_id", # String
  "object_type" => "example_object_type", # String
})
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.TemplateDispatch.load({ "id" => "template_dispatch_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `TemplateDispatchEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## TldEntity

```ruby
tld = client.Tld
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `authinfo_for_transfer` | `Boolean` | Yes |  |
| `category` | `String` | Yes |  |
| `change_owner` | `Boolean` | Yes |  |
| `corporate` | `Boolean` | Yes |  |
| `ext_trade` | `Boolean` | Yes |  |
| `full_tld` | `String` | Yes |  |
| `href` | `String` | Yes |  |
| `lock` | `Boolean` | Yes |  |
| `name` | `String` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Tld.list
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Tld.load({ "name" => "name" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `TldEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## UserEntity

```ruby
user = client.User
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `city` | `String` | Yes |  |
| `country` | `String` | No |  |
| `email` | `String` | Yes |  |
| `fax` | `String` | No |  |
| `firstname` | `String` | No |  |
| `id` | `String` | Yes |  |
| `lang` | `String` | Yes |  |
| `lastname` | `String` | No |  |
| `name` | `String` | Yes |  |
| `phone` | `String` | No |  |
| `state` | `String` | No |  |
| `streetaddr` | `String` | No |  |
| `streetaddr2` | `String` | No |  |
| `username` | `String` | Yes |  |
| `zip` | `String` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.User.load({ "id" => "user_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `UserEntity` instance with the same client and
options.

#### `get_name -> String`

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

```ruby
client = GandiSDK.new({
  "feature" => {
    "debug" => { "active" => true },
    "idempotency" => { "active" => true },
    "metrics" => { "active" => true },
    "paging" => { "active" => true },
    "ratelimit" => { "active" => true },
    "retry" => { "active" => true },
    "secrets" => { "active" => true },
    "test" => { "active" => true },
    "timeout" => { "active" => true },
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

