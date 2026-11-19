# Gandi PHP SDK Reference

Complete API reference for the Gandi PHP SDK.


## GandiSDK

### Constructor

```php
require_once __DIR__ . '/gandi_sdk.php';

$client = new GandiSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["apikey"]` | `string` | API key for authentication. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `GandiSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = GandiSDK::test();
```


### Instance Methods

#### `AccessToken($data = null)`

Create a new `AccessTokenEntity` instance. Pass `null` for no initial data.

#### `AcmeAccount($data = null)`

Create a new `AcmeAccountEntity` instance. Pass `null` for no initial data.

#### `AcmeDomain($data = null)`

Create a new `AcmeDomainEntity` instance. Pass `null` for no initial data.

#### `AcmePrice($data = null)`

Create a new `AcmePriceEntity` instance. Pass `null` for no initial data.

#### `AcmeSubscription($data = null)`

Create a new `AcmeSubscriptionEntity` instance. Pass `null` for no initial data.

#### `BillingInfo($data = null)`

Create a new `BillingInfoEntity` instance. Pass `null` for no initial data.

#### `BillingPrice($data = null)`

Create a new `BillingPriceEntity` instance. Pass `null` for no initial data.

#### `CertificateDcv($data = null)`

Create a new `CertificateDcvEntity` instance. Pass `null` for no initial data.

#### `CertificatePackage($data = null)`

Create a new `CertificatePackageEntity` instance. Pass `null` for no initial data.

#### `CertificatePem($data = null)`

Create a new `CertificatePemEntity` instance. Pass `null` for no initial data.

#### `CertificateRenewal($data = null)`

Create a new `CertificateRenewalEntity` instance. Pass `null` for no initial data.

#### `CertificateTag($data = null)`

Create a new `CertificateTagEntity` instance. Pass `null` for no initial data.

#### `Comment($data = null)`

Create a new `CommentEntity` instance. Pass `null` for no initial data.

#### `Domain($data = null)`

Create a new `DomainEntity` instance. Pass `null` for no initial data.

#### `DomainAvailability($data = null)`

Create a new `DomainAvailabilityEntity` instance. Pass `null` for no initial data.

#### `DomainChangeOwner($data = null)`

Create a new `DomainChangeOwnerEntity` instance. Pass `null` for no initial data.

#### `DomainClaim($data = null)`

Create a new `DomainClaimEntity` instance. Pass `null` for no initial data.

#### `DomainContact($data = null)`

Create a new `DomainContactEntity` instance. Pass `null` for no initial data.

#### `DomainDnskey($data = null)`

Create a new `DomainDnskeyEntity` instance. Pass `null` for no initial data.

#### `DomainDnssec($data = null)`

Create a new `DomainDnssecEntity` instance. Pass `null` for no initial data.

#### `DomainHost($data = null)`

Create a new `DomainHostEntity` instance. Pass `null` for no initial data.

#### `DomainLivedns($data = null)`

Create a new `DomainLivednsEntity` instance. Pass `null` for no initial data.

#### `DomainNameserver($data = null)`

Create a new `DomainNameserverEntity` instance. Pass `null` for no initial data.

#### `DomainTag($data = null)`

Create a new `DomainTagEntity` instance. Pass `null` for no initial data.

#### `DomainTransfer($data = null)`

Create a new `DomainTransferEntity` instance. Pass `null` for no initial data.

#### `DomainWebredir($data = null)`

Create a new `DomainWebredirEntity` instance. Pass `null` for no initial data.

#### `EmailForward($data = null)`

Create a new `EmailForwardEntity` instance. Pass `null` for no initial data.

#### `EmailMailbox($data = null)`

Create a new `EmailMailboxEntity` instance. Pass `null` for no initial data.

#### `EmailMigration($data = null)`

Create a new `EmailMigrationEntity` instance. Pass `null` for no initial data.

#### `EmailOffer($data = null)`

Create a new `EmailOfferEntity` instance. Pass `null` for no initial data.

#### `EmailSlot($data = null)`

Create a new `EmailSlotEntity` instance. Pass `null` for no initial data.

#### `HostingApplication($data = null)`

Create a new `HostingApplicationEntity` instance. Pass `null` for no initial data.

#### `HostingInstance($data = null)`

Create a new `HostingInstanceEntity` instance. Pass `null` for no initial data.

#### `HostingVhost($data = null)`

Create a new `HostingVhostEntity` instance. Pass `null` for no initial data.

#### `IssuedCertificate($data = null)`

Create a new `IssuedCertificateEntity` instance. Pass `null` for no initial data.

#### `LinkedZone($data = null)`

Create a new `LinkedZoneEntity` instance. Pass `null` for no initial data.

#### `LinkedZoneDeployment($data = null)`

Create a new `LinkedZoneDeploymentEntity` instance. Pass `null` for no initial data.

#### `LinkedZoneDomain($data = null)`

Create a new `LinkedZoneDomainEntity` instance. Pass `null` for no initial data.

#### `LinkedZoneTask($data = null)`

Create a new `LinkedZoneTaskEntity` instance. Pass `null` for no initial data.

#### `LivednsAxfrSlave($data = null)`

Create a new `LivednsAxfrSlaveEntity` instance. Pass `null` for no initial data.

#### `LivednsAxfrTsig($data = null)`

Create a new `LivednsAxfrTsigEntity` instance. Pass `null` for no initial data.

#### `LivednsDomain($data = null)`

Create a new `LivednsDomainEntity` instance. Pass `null` for no initial data.

#### `LivednsKey($data = null)`

Create a new `LivednsKeyEntity` instance. Pass `null` for no initial data.

#### `LivednsNameserver($data = null)`

Create a new `LivednsNameserverEntity` instance. Pass `null` for no initial data.

#### `LivednsRecord($data = null)`

Create a new `LivednsRecordEntity` instance. Pass `null` for no initial data.

#### `LivednsRrtype($data = null)`

Create a new `LivednsRrtypeEntity` instance. Pass `null` for no initial data.

#### `LivednsSnapshot($data = null)`

Create a new `LivednsSnapshotEntity` instance. Pass `null` for no initial data.

#### `LivednsTsigKey($data = null)`

Create a new `LivednsTsigKeyEntity` instance. Pass `null` for no initial data.

#### `LivednsZone($data = null)`

Create a new `LivednsZoneEntity` instance. Pass `null` for no initial data.

#### `Mailbox($data = null)`

Create a new `MailboxEntity` instance. Pass `null` for no initial data.

#### `MailboxDomain($data = null)`

Create a new `MailboxDomainEntity` instance. Pass `null` for no initial data.

#### `MailboxForward($data = null)`

Create a new `MailboxForwardEntity` instance. Pass `null` for no initial data.

#### `MailboxProduct($data = null)`

Create a new `MailboxProductEntity` instance. Pass `null` for no initial data.

#### `MailboxQuota($data = null)`

Create a new `MailboxQuotaEntity` instance. Pass `null` for no initial data.

#### `MailboxSlot($data = null)`

Create a new `MailboxSlotEntity` instance. Pass `null` for no initial data.

#### `Organization($data = null)`

Create a new `OrganizationEntity` instance. Pass `null` for no initial data.

#### `OrganizationCustomer($data = null)`

Create a new `OrganizationCustomerEntity` instance. Pass `null` for no initial data.

#### `Template($data = null)`

Create a new `TemplateEntity` instance. Pass `null` for no initial data.

#### `TemplateDispatch($data = null)`

Create a new `TemplateDispatchEntity` instance. Pass `null` for no initial data.

#### `Tld($data = null)`

Create a new `TldEntity` instance. Pass `null` for no initial data.

#### `User($data = null)`

Create a new `UserEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): GandiUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## AccessTokenEntity

```php
$access_token = $client->AccessToken();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `access_token` | `string` | Yes |  |
| `entities` | `array` | Yes |  |
| `expires_at` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `scopes` | `array` | Yes |  |

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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->AccessToken()->create([
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AccessTokenEntity`

Create a new `AccessTokenEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AcmeAccountEntity

```php
$acme_account = $client->AcmeAccount();
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

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->AcmeAccount()->list(["subscription_id" => "example", "sharing_id" => "example"]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->AcmeAccount()->load(["id" => "acme_account_id", "subscription_id" => "subscription_id", "sharing_id" => "sharing_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AcmeAccountEntity`

Create a new `AcmeAccountEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AcmeDomainEntity

```php
$acme_domain = $client->AcmeDomain();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | Yes |  |
| `deleted_at` | `string` | Yes |  |
| `hostname` | `string` | Yes |  |
| `hostname_ulabel` | `string` | Yes |  |
| `is_wildcard` | `bool` | Yes |  |
| `status` | `string` | Yes |  |
| `subscription_id` | `string` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->AcmeDomain()->list(["subscription_id" => "example", "domain" => "example", "sharing_id" => "example"]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->AcmeDomain()->load(["domain_id" => 1, "subscription_id" => "subscription_id", "sharing_id" => "sharing_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AcmeDomainEntity`

Create a new `AcmeDomainEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AcmePriceEntity

```php
$acme_price = $client->AcmePrice();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `country` | `string` | Yes |  |
| `currency` | `string` | Yes |  |
| `domains` | `array` | Yes |  |
| `duration` | `string` | Yes |  |
| `duration_unit` | `string` | Yes |  |
| `grid` | `string` | Yes |  |
| `max_duration` | `int` | Yes |  |
| `min_duration` | `int` | Yes |  |
| `price_after_taxes` | `string` | Yes |  |
| `price_before_taxes` | `string` | Yes |  |
| `process` | `string` | Yes |  |
| `product` | `array` | Yes |  |
| `provider` | `string` | Yes |  |
| `tax_rate` | `string` | Yes |  |
| `taxes` | `array` | Yes |  |
| `validation_type` | `string` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->AcmePrice()->create([
  "sharing_id" => null, // string
  "country" => null, // string
  "currency" => null, // string
  "domains" => null, // array
  "duration" => null, // string
  "grid" => null, // string
  "process" => null, // string
  "provider" => null, // string
  "validation_type" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->AcmePrice()->list(["country" => "example", "currency" => "example", "duration" => "example", "grid" => "example", "process" => "example", "provider" => "example", "sharing_id" => "example", "validation_type" => "example"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AcmePriceEntity`

Create a new `AcmePriceEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AcmeSubscriptionEntity

```php
$acme_subscription = $client->AcmeSubscription();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `country` | `string` | Yes |  |
| `created_at` | `string` | Yes |  |
| `currency` | `string` | Yes |  |
| `domains` | `array` | Yes |  |
| `duration` | `int` | Yes |  |
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->AcmeSubscription()->create([
  "sharing_id" => null, // string
  "country" => null, // string
  "currency" => null, // string
  "domains" => null, // array
  "duration" => null, // int
  "grid" => null, // string
  "name" => null, // string
  "provider" => null, // string
  "validation_type" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->AcmeSubscription()->list(["created_at" => "example", "ends_at" => "example", "name" => "example", "provider" => "example", "sharing_id" => "example", "status" => "example", "validation_type" => "example", "year" => "example"]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->AcmeSubscription()->load(["subscription_id" => "subscription_id", "sharing_id" => "sharing_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and throws on error.

```php
$result = $client->AcmeSubscription()->remove(["subscription_id" => "subscription_id", "sharing_id" => "sharing_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->AcmeSubscription()->update([
  "subscription_id" => "subscription_id",
  "sharing_id" => "sharing_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AcmeSubscriptionEntity`

Create a new `AcmeSubscriptionEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## BillingInfoEntity

```php
$billing_info = $client->BillingInfo();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `annual_balance` | `float` | Yes |  |
| `grid` | `string` | Yes |  |
| `outstanding_amount` | `float` | Yes |  |
| `prepaid` | `array` | Yes |  |
| `prepaid_monthly_invoice` | `bool` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->BillingInfo()->load(["sharing_id" => "sharing_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): BillingInfoEntity`

Create a new `BillingInfoEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## BillingPriceEntity

```php
$billing_price = $client->BillingPrice();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `currency` | `string` | Yes |  |
| `grid` | `string` | Yes |  |
| `products` | `array` | Yes |  |
| `taxes` | `array` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->BillingPrice()->load(["type" => "type", "name" => [], "process" => []]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): BillingPriceEntity`

Create a new `BillingPriceEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CertificateDcvEntity

```php
$certificate_dcv = $client->CertificateDcv();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `message` | `string` | Yes |  |
| `method` | `string` | Yes |  |

### Operations

#### `patch(array $reqdata, ?array $ctrl = null): mixed`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and throws on error.

```php
$result = $client->CertificateDcv()->patch([
  "certificate_id" => "certificate_id",
  // Only the fields to change
]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->CertificateDcv()->update([
  "certificate_id" => "certificate_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CertificateDcvEntity`

Create a new `CertificateDcvEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CertificatePackageEntity

```php
$certificate_package = $client->CertificatePackage();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `category` | `array` | Yes |  |
| `href` | `string` | Yes |  |
| `max_domains` | `int` | Yes |  |
| `min_domains` | `int` | Yes |  |
| `name` | `string` | Yes |  |
| `provider` | `string` | Yes |  |
| `sgc` | `bool` | Yes |  |
| `trustlogo` | `bool` | Yes |  |
| `warranty` | `int` | Yes |  |
| `wildcard` | `bool` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->CertificatePackage()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->CertificatePackage()->load(["name" => "name"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CertificatePackageEntity`

Create a new `CertificatePackageEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CertificatePemEntity

```php
$certificate_pem = $client->CertificatePem();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->CertificatePem()->load(["type" => "type"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CertificatePemEntity`

Create a new `CertificatePemEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CertificateRenewalEntity

```php
$certificate_renewal = $client->CertificateRenewal();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `csr` | `string` | No |  |
| `dcv_method` | `string` | No |  |
| `duration` | `int` | No |  |
| `errors` | `array` | No |  |
| `status` | `string` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->CertificateRenewal()->create([
  "certificate_id" => null, // string
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CertificateRenewalEntity`

Create a new `CertificateRenewalEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CertificateTagEntity

```php
$certificate_tag = $client->CertificateTag();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `add` | `array` | Yes |  |
| `message` | `string` | Yes |  |
| `remove` | `array` | Yes |  |
| `tag` | `string` | Yes |  |
| `tags` | `array` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->CertificateTag()->create([
  "certificate_id" => null, // string
  "tag" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->CertificateTag()->list(["certificate_id" => "example"]);
```

#### `patch(array $reqdata, ?array $ctrl = null): mixed`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and throws on error.

```php
$result = $client->CertificateTag()->patch([
  "certificate_id" => "certificate_id",
  // Only the fields to change
]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and throws on error.

```php
$result = $client->CertificateTag()->remove(["certificate_id" => "certificate_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->CertificateTag()->update([
  "certificate_id" => "certificate_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CertificateTagEntity`

Create a new `CertificateTagEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CommentEntity

```php
$comment = $client->Comment();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `content` | `string` | Yes |  |
| `created_at` | `string` | No |  |
| `errors` | `array` | No |  |
| `id` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `updated_at` | `string` | No |  |
| `user` | `array` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->Comment()->create([
  "entity_id" => null, // string
  "content" => null, // string
]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Comment()->load(["entity_id" => "entity_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and throws on error.

```php
$result = $client->Comment()->remove(["entity_id" => "entity_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CommentEntity`

Create a new `CommentEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## DomainEntity

```php
$domain = $client->Domain();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `admin` | `array` | Yes |  |
| `authinfo` | `string` | No |  |
| `autorenew` | `array` | Yes |  |
| `bill` | `array` | Yes |  |
| `can_tld_lock` | `bool` | Yes |  |
| `claims` | `string` | No |  |
| `contacts` | `array` | Yes |  |
| `currency` | `string` | No |  |
| `dates` | `array` | Yes |  |
| `domain_owner` | `string` | Yes |  |
| `duration` | `int` | No |  |
| `enforce_premium` | `bool` | No |  |
| `errors` | `array` | No |  |
| `extra_parameters` | `array` | No |  |
| `fqdn` | `string` | Yes |  |
| `fqdn_unicode` | `string` | Yes |  |
| `href` | `string` | Yes |  |
| `id` | `string` | No |  |
| `lang` | `string` | No |  |
| `mailbox_optin` | `bool` | No |  |
| `nameserver` | `array` | Yes |  |
| `nameservers` | `array` | Yes |  |
| `nameservers_ips` | `array` | No |  |
| `orga_owner` | `string` | Yes |  |
| `owner` | `array` | Yes |  |
| `price` | `float` | No |  |
| `reachability` | `string` | Yes |  |
| `resellee_id` | `string` | No |  |
| `services` | `array` | Yes |  |
| `sharing_id` | `string` | No |  |
| `sharing_space` | `array` | Yes |  |
| `smd` | `string` | No |  |
| `status` | `array` | Yes |  |
| `tags` | `array` | No |  |
| `tech` | `array` | Yes |  |
| `template_id` | `string` | No |  |
| `tld` | `string` | Yes |  |
| `tld_period` | `string` | No |  |
| `trustee_roles` | `array` | No |  |

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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->Domain()->create([
  "admin" => null, // array
  "bill" => null, // array
  "fqdn" => null, // string
  "owner" => null, // array
  "tech" => null, // array
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Domain()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Domain()->load(["fqdn" => "fqdn"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and throws on error.

```php
$result = $client->Domain()->remove(["fqdn" => "fqdn"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): DomainEntity`

Create a new `DomainEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## DomainAvailabilityEntity

```php
$domain_availability = $client->DomainAvailability();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `currency` | `string` | Yes |  |
| `grid` | `string` | Yes |  |
| `products` | `array` | Yes |  |
| `taxes` | `array` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->DomainAvailability()->load(["name" => "name"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): DomainAvailabilityEntity`

Create a new `DomainAvailabilityEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## DomainChangeOwnerEntity

```php
$domain_change_owner = $client->DomainChangeOwner();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `admin` | `array` | Yes |  |
| `bill` | `array` | Yes |  |
| `created_at` | `string` | Yes |  |
| `date_start` | `string` | No |  |
| `errors` | `array` | No |  |
| `errortype` | `string` | No |  |
| `errortype_label` | `string` | No |  |
| `foa` | `array` | No |  |
| `inner_step` | `string` | No |  |
| `owner` | `array` | Yes |  |
| `params` | `array` | Yes |  |
| `status` | `string` | Yes |  |
| `step` | `string` | Yes |  |
| `step_nb` | `int` | Yes |  |
| `tech` | `array` | Yes |  |
| `updated_at` | `string` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->DomainChangeOwner()->create([
  "domain" => null, // string
  "admin" => null, // array
  "bill" => null, // array
  "owner" => null, // array
  "tech" => null, // array
]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->DomainChangeOwner()->load(["domain" => "domain"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): DomainChangeOwnerEntity`

Create a new `DomainChangeOwnerEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## DomainClaimEntity

```php
$domain_claim = $client->DomainClaim();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `claims` | `array` | Yes |  |
| `created_at` | `string` | Yes |  |
| `expires_at` | `string` | Yes |  |
| `fqdn` | `string` | Yes |  |
| `fqdn_alabel` | `string` | Yes |  |
| `fqdn_ulabel` | `string` | Yes |  |
| `notice_id` | `string` | Yes |  |
| `status` | `string` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->DomainClaim()->create([
  "domain" => null, // string
  "claims" => null, // array
  "created_at" => null, // string
  "expires_at" => null, // string
  "fqdn" => null, // string
  "fqdn_alabel" => null, // string
  "fqdn_ulabel" => null, // string
  "notice_id" => null, // string
  "status" => null, // string
]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->DomainClaim()->load(["domain" => "domain"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): DomainClaimEntity`

Create a new `DomainClaimEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## DomainContactEntity

```php
$domain_contact = $client->DomainContact();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `admin` | `array` | Yes |  |
| `bill` | `array` | Yes |  |
| `message` | `string` | Yes |  |
| `owner` | `array` | Yes |  |
| `tech` | `array` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->DomainContact()->load(["domain" => "domain"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->DomainContact()->update([
  "domain" => "domain",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): DomainContactEntity`

Create a new `DomainContactEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## DomainDnskeyEntity

```php
$domain_dnskey = $client->DomainDnskey();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `algorithm` | `int` | Yes |  |
| `digest` | `string` | Yes |  |
| `digest_type` | `int` | Yes |  |
| `href` | `string` | Yes |  |
| `id` | `int` | Yes |  |
| `keys` | `array` | Yes |  |
| `keytag` | `int` | Yes |  |
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->DomainDnskey()->create([
  "domain" => null, // string
  "algorithm" => null, // int
  "public_key" => null, // string
  "type" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->DomainDnskey()->list(["domain" => "example"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and throws on error.

```php
$result = $client->DomainDnskey()->remove(["id" => "domain_dnskey_id", "domain" => "domain"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->DomainDnskey()->update([
  "domain" => "domain",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): DomainDnskeyEntity`

Create a new `DomainDnskeyEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## DomainDnssecEntity

```php
$domain_dnssec = $client->DomainDnssec();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `error` | `string` | No |  |
| `state` | `string` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->DomainDnssec()->create([
  "domain" => null, // string
  "state" => null, // string
]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->DomainDnssec()->load(["domain" => "domain"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and throws on error.

```php
$result = $client->DomainDnssec()->remove(["domain" => "domain"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): DomainDnssecEntity`

Create a new `DomainDnssecEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## DomainHostEntity

```php
$domain_host = $client->DomainHost();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `fqdn` | `string` | Yes |  |
| `fqdn_unicode` | `string` | Yes |  |
| `href` | `string` | Yes |  |
| `ips` | `array` | Yes |  |
| `message` | `string` | Yes |  |
| `name` | `string` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->DomainHost()->create([
  "domain" => null, // string
  "ips" => null, // array
  "name" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->DomainHost()->list(["domain" => "example"]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->DomainHost()->load(["domain" => "domain", "name" => "name"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and throws on error.

```php
$result = $client->DomainHost()->remove(["domain" => "domain", "name" => "name"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->DomainHost()->update([
  "domain" => "domain",
  "name" => "name",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): DomainHostEntity`

Create a new `DomainHostEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## DomainLivednsEntity

```php
$domain_livedns = $client->DomainLivedns();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `current` | `string` | Yes |  |
| `dnssec_available` | `bool` | No |  |
| `livednssec_available` | `bool` | No |  |
| `message` | `string` | Yes |  |
| `nameservers` | `array` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->DomainLivedns()->create([
  "domain" => null, // string
  "current" => null, // string
  "message" => null, // string
  "nameservers" => null, // array
]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->DomainLivedns()->load(["domain" => "domain"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): DomainLivednsEntity`

Create a new `DomainLivednsEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## DomainNameserverEntity

```php
$domain_nameserver = $client->DomainNameserver();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `message` | `string` | Yes |  |
| `nameservers` | `array` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->DomainNameserver()->list(["domain" => "example"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->DomainNameserver()->update([
  "domain" => "domain",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): DomainNameserverEntity`

Create a new `DomainNameserverEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## DomainTagEntity

```php
$domain_tag = $client->DomainTag();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `add` | `array` | Yes |  |
| `message` | `string` | Yes |  |
| `remove` | `array` | Yes |  |
| `tag` | `string` | Yes |  |
| `tags` | `array` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->DomainTag()->create([
  "domain" => null, // string
  "tag" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->DomainTag()->list(["domain" => "example"]);
```

#### `patch(array $reqdata, ?array $ctrl = null): mixed`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and throws on error.

```php
$result = $client->DomainTag()->patch([
  "domain" => "domain",
  // Only the fields to change
]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and throws on error.

```php
$result = $client->DomainTag()->remove(["domain" => "domain"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->DomainTag()->update([
  "domain" => "domain",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): DomainTagEntity`

Create a new `DomainTagEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## DomainTransferEntity

```php
$domain_transfer = $client->DomainTransfer();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `admin` | `array` | Yes |  |
| `authinfo` | `string` | No |  |
| `bill` | `array` | Yes |  |
| `change_owner` | `bool` | No |  |
| `created_at` | `string` | Yes |  |
| `currency` | `string` | No |  |
| `duration` | `int` | No |  |
| `enforce_premium` | `bool` | No |  |
| `errors` | `array` | No |  |
| `errortype` | `string` | No |  |
| `errortype_label` | `string` | No |  |
| `extra_parameters` | `array` | No |  |
| `foa` | `array` | No |  |
| `fqdn` | `string` | Yes |  |
| `inner_step` | `string` | No |  |
| `mailbox_optin` | `bool` | No |  |
| `message` | `string` | Yes |  |
| `nameservers` | `array` | No |  |
| `nameservers_ips` | `array` | No |  |
| `owner` | `array` | Yes |  |
| `owner_contact` | `string` | Yes |  |
| `params` | `array` | Yes |  |
| `price` | `float` | No |  |
| `regac_at` | `string` | No |  |
| `resellee_id` | `string` | No |  |
| `start_at` | `string` | No |  |
| `status` | `string` | Yes |  |
| `step` | `string` | Yes |  |
| `step_nb` | `int` | Yes |  |
| `tech` | `array` | Yes |  |
| `template_id` | `string` | No |  |
| `transfer_link` | `string` | No |  |
| `transfer_procedure` | `string` | No |  |
| `updated_at` | `string` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->DomainTransfer()->create([
  "admin" => null, // array
  "bill" => null, // array
  "fqdn" => null, // string
  "owner" => null, // array
  "tech" => null, // array
]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->DomainTransfer()->load(["domain" => "domain"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->DomainTransfer()->update([
  "domain" => "domain",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): DomainTransferEntity`

Create a new `DomainTransferEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## DomainWebredirEntity

```php
$domain_webredir = $client->DomainWebredir();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cert_status` | `string` | No |  |
| `cert_uuid` | `string` | No |  |
| `created_at` | `string` | No |  |
| `host` | `string` | Yes |  |
| `message` | `string` | Yes |  |
| `override` | `bool` | Yes |  |
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->DomainWebredir()->create([
  "domain" => null, // string
  "host" => null, // string
  "override" => null, // bool
  "protocol" => null, // string
  "type" => null, // string
  "url" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->DomainWebredir()->list(["domain" => "example"]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->DomainWebredir()->load(["domain" => "domain", "host" => "host"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and throws on error.

```php
$result = $client->DomainWebredir()->remove(["domain" => "domain", "host" => "host"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->DomainWebredir()->update([
  "domain" => "domain",
  "host" => "host",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): DomainWebredirEntity`

Create a new `DomainWebredirEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## EmailForwardEntity

```php
$email_forward = $client->EmailForward();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `destinations` | `array` | Yes |  |
| `href` | `string` | Yes |  |
| `id` | `string` | No |  |
| `message` | `string` | Yes |  |
| `source` | `string` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->EmailForward()->create([
  "domain" => null, // string
  "destinations" => null, // array
  "source" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->EmailForward()->list(["domain" => "example"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and throws on error.

```php
$result = $client->EmailForward()->remove(["domain" => "domain", "source" => "source"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->EmailForward()->update([
  "domain" => "domain",
  "source" => "source",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): EmailForwardEntity`

Create a new `EmailForwardEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## EmailMailboxEntity

```php
$email_mailbox = $client->EmailMailbox();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | `string` | Yes |  |
| `alias_count` | `int` | No |  |
| `aliases` | `array` | Yes |  |
| `antispam` | `bool` | Yes |  |
| `autorenew` | `array` | Yes |  |
| `domain` | `string` | Yes |  |
| `errors` | `array` | No |  |
| `expires_at` | `string` | Yes |  |
| `fallback_email` | `string` | No |  |
| `href` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `login` | `string` | Yes |  |
| `mailbox_type` | `string` | Yes |  |
| `message` | `string` | Yes |  |
| `password` | `string` | Yes |  |
| `quota_used` | `int` | Yes |  |
| `responder` | `array` | No |  |
| `status` | `string` | Yes |  |
| `to_convert` | `bool` | Yes |  |

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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->EmailMailbox()->create([
  "domain" => null, // string
  "login" => null, // string
  "mailbox_type" => null, // string
  "password" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->EmailMailbox()->list(["domain" => "example"]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->EmailMailbox()->load(["id" => "email_mailbox_id", "domain" => "domain"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and throws on error.

```php
$result = $client->EmailMailbox()->remove(["id" => "email_mailbox_id", "domain" => "domain"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->EmailMailbox()->update([
  "id" => "email_mailbox_id",
  "domain" => "domain",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): EmailMailboxEntity`

Create a new `EmailMailboxEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## EmailMigrationEntity

```php
$email_migration = $client->EmailMigration();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `available` | `bool` | Yes |  |
| `currency` | `string` | Yes |  |
| `forward_count` | `int` | Yes |  |
| `free_mailboxes` | `int` | Yes |  |
| `included_mailboxes` | `int` | Yes |  |
| `info` | `array` | Yes |  |
| `message` | `string` | Yes |  |
| `packmail` | `bool` | Yes |  |
| `price_v1` | `float` | Yes |  |
| `price_v2` | `float` | Yes |  |
| `quota_v1` | `float` | Yes |  |
| `token` | `string` | Yes |  |
| `usage_v1` | `float` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->EmailMigration()->create([
  "domain" => null, // string
  "token" => null, // string
]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->EmailMigration()->load(["domain" => "domain"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): EmailMigrationEntity`

Create a new `EmailMigrationEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## EmailOfferEntity

```php
$email_offer = $client->EmailOffer();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `antispam` | `string` | Yes |  |
| `dkim` | `string` | Yes |  |
| `message` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `version` | `int` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->EmailOffer()->load(["domain" => "domain"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->EmailOffer()->update([
  "domain" => "domain",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): EmailOfferEntity`

Create a new `EmailOfferEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## EmailSlotEntity

```php
$email_slot = $client->EmailSlot();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `autorenew` | `bool` | No |  |
| `capacity` | `int` | Yes |  |
| `created_at` | `string` | Yes |  |
| `duration` | `int` | Yes |  |
| `gandi_id` | `int` | Yes |  |
| `href` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `mailbox_type` | `string` | Yes |  |
| `refund_amount` | `float` | No |  |
| `refund_currency` | `string` | No |  |
| `refundable` | `bool` | Yes |  |
| `status` | `string` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->EmailSlot()->create([
  "domain" => null, // string
  "duration" => null, // int
  "mailbox_type" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->EmailSlot()->list(["domain" => "example"]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->EmailSlot()->load(["id" => 1, "domain" => "domain"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and throws on error.

```php
$result = $client->EmailSlot()->remove(["id" => 1, "domain" => "domain"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): EmailSlotEntity`

Create a new `EmailSlotEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## HostingApplicationEntity

```php
$hosting_application = $client->HostingApplication();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `string` | Yes |  |
| `name_label` | `string` | Yes |  |
| `requirements` | `array` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->HostingApplication()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->HostingApplication()->load(["name" => "name"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): HostingApplicationEntity`

Create a new `HostingApplicationEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## HostingInstanceEntity

```php
$hosting_instance = $client->HostingInstance();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `access_information` | `array` | Yes |  |
| `authentication` | `array` | Yes |  |
| `autorenew` | `array` | Yes |  |
| `available_upgrade` | `bool` | Yes |  |
| `booster` | `array` | No |  |
| `booster_options` | `array` | No |  |
| `compatible_applications` | `array` | No |  |
| `console` | `array` | Yes |  |
| `cpu` | `int` | Yes |  |
| `created_at` | `string` | Yes |  |
| `database` | `array` | Yes |  |
| `datacenter` | `array` | Yes |  |
| `domain` | `string` | No |  |
| `duration` | `int` | No |  |
| `duration_unit` | `string` | No |  |
| `errors` | `array` | No |  |
| `expire_at` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `language` | `array` | Yes |  |
| `language_id` | `string` | No |  |
| `location` | `string` | Yes |  |
| `message` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `password` | `string` | No |  |
| `password_updated_at` | `string` | No |  |
| `ram` | `array` | Yes |  |
| `sharing_space` | `array` | Yes |  |
| `size` | `string` | Yes |  |
| `snapshot_enabled` | `bool` | Yes |  |
| `status` | `string` | Yes |  |
| `storage` | `array` | Yes |  |
| `storage_additional_size` | `int` | No |  |
| `subscription_cancelled` | `bool` | No |  |
| `type` | `array` | Yes |  |
| `upgrade_to` | `array` | No |  |
| `vhosts` | `array` | Yes |  |

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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->HostingInstance()->create([
  "authentication" => null, // array
  "domain" => null, // string
  "location" => null, // string
  "size" => null, // string
  "type" => null, // array
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->HostingInstance()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->HostingInstance()->load(["id" => "hosting_instance_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and throws on error.

```php
$result = $client->HostingInstance()->remove(["id" => "hosting_instance_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->HostingInstance()->update([
  "id" => "hosting_instance_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): HostingInstanceEntity`

Create a new `HostingInstanceEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## HostingVhostEntity

```php
$hosting_vhost = $client->HostingVhost();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `application` | `array` | Yes |  |
| `created_at` | `string` | Yes |  |
| `deployment` | `array` | Yes |  |
| `fqdn` | `string` | Yes |  |
| `https_strategy` | `string` | No |  |
| `is_a_test_vhost` | `bool` | Yes |  |
| `linked_dns_zone` | `array` | Yes |  |
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->HostingVhost()->create([
  "instance_id" => null, // string
  "application" => null, // array
  "fqdn" => null, // string
  "linked_dns_zone" => null, // array
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->HostingVhost()->list(["instance_id" => "example"]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->HostingVhost()->load(["fqdn" => "fqdn", "instance_id" => "instance_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and throws on error.

```php
$result = $client->HostingVhost()->remove(["fqdn" => "fqdn", "instance_id" => "instance_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->HostingVhost()->update([
  "fqdn" => "fqdn",
  "instance_id" => "instance_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): HostingVhostEntity`

Create a new `HostingVhostEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## IssuedCertificateEntity

```php
$issued_certificate = $client->IssuedCertificate();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `altnames` | `array` | Yes |  |
| `altnames_unicode` | `array` | Yes |  |
| `apex_only` | `bool` | No |  |
| `assumed_name` | `string` | No |  |
| `business_category` | `string` | No |  |
| `card_pay_trustlogo` | `bool` | No |  |
| `cert` | `string` | No |  |
| `cn` | `string` | Yes |  |
| `cn_unicode` | `string` | Yes |  |
| `contact` | `array` | Yes |  |
| `csr` | `string` | No |  |
| `dates` | `array` | Yes |  |
| `dcv_method` | `string` | No |  |
| `duration` | `int` | No |  |
| `error_msg` | `string` | No |  |
| `errors` | `array` | No |  |
| `href` | `string` | No |  |
| `id` | `string` | Yes |  |
| `ida` | `array` | No |  |
| `intermediate` | `string` | No |  |
| `joi` | `array` | No |  |
| `middleman` | `array` | No |  |
| `owner` | `string` | No |  |
| `package` | `array` | Yes |  |
| `provider` | `string` | Yes |  |
| `reissuable` | `bool` | No |  |
| `renewable` | `bool` | No |  |
| `resellee_id` | `string` | No |  |
| `sha_version` | `int` | No |  |
| `sharing_id` | `string` | No |  |
| `software` | `int` | Yes |  |
| `state` | `string` | No |  |
| `state_detail` | `string` | No |  |
| `status` | `string` | Yes |  |
| `step_nb` | `int` | No |  |
| `stored` | `bool` | No |  |
| `tags` | `array` | No |  |
| `trustlogo` | `bool` | No |  |
| `trustlogo_token` | `array` | No |  |

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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->IssuedCertificate()->create([
  "package" => null, // array
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->IssuedCertificate()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->IssuedCertificate()->load(["id" => "issued_certificate_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and throws on error.

```php
$result = $client->IssuedCertificate()->remove(["id" => "issued_certificate_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->IssuedCertificate()->update([
  "id" => "issued_certificate_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): IssuedCertificateEntity`

Create a new `IssuedCertificateEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## LinkedZoneEntity

```php
$linked_zone = $client->LinkedZone();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | Yes |  |
| `default_records` | `bool` | Yes |  |
| `domain_count` | `int` | Yes |  |
| `domains` | `array` | No |  |
| `id` | `string` | Yes |  |
| `message` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `record_list` | `array` | No |  |
| `record_text` | `string` | No |  |
| `records` | `array` | No |  |
| `sharing_space` | `array` | Yes |  |
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->LinkedZone()->create([
  "name" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->LinkedZone()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->LinkedZone()->load(["id" => "linked_zone_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and throws on error.

```php
$result = $client->LinkedZone()->remove(["id" => "linked_zone_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->LinkedZone()->update([
  "id" => "linked_zone_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): LinkedZoneEntity`

Create a new `LinkedZoneEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## LinkedZoneDeploymentEntity

```php
$linked_zone_deployment = $client->LinkedZoneDeployment();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deploy` | `bool` | Yes |  |
| `message` | `string` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->LinkedZoneDeployment()->create([
  "zone_id" => null, // string
  "deploy" => null, // bool
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): LinkedZoneDeploymentEntity`

Create a new `LinkedZoneDeploymentEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## LinkedZoneDomainEntity

```php
$linked_zone_domain = $client->LinkedZoneDomain();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deployed` | `bool` | Yes |  |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `owner` | `string` | Yes |  |
| `zone` | `array` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->LinkedZoneDomain()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->LinkedZoneDomain()->load(["name" => "name"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): LinkedZoneDomainEntity`

Create a new `LinkedZoneDomainEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## LinkedZoneTaskEntity

```php
$linked_zone_task = $client->LinkedZoneTask();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | Yes |  |
| `ending_at` | `string` | No |  |
| `id` | `string` | Yes |  |
| `result` | `array` | Yes |  |
| `status` | `string` | Yes |  |
| `type` | `string` | Yes |  |
| `updated_at` | `string` | No |  |
| `zone_id` | `string` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->LinkedZoneTask()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->LinkedZoneTask()->load(["id" => "linked_zone_task_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): LinkedZoneTaskEntity`

Create a new `LinkedZoneTaskEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## LivednsAxfrSlaveEntity

```php
$livedns_axfr_slave = $client->LivednsAxfrSlave();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `message` | `string` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->LivednsAxfrSlave()->list(["fqdn" => "example"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and throws on error.

```php
$result = $client->LivednsAxfrSlave()->remove(["fqdn" => "fqdn", "ip" => "ip"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->LivednsAxfrSlave()->update([
  "fqdn" => "fqdn",
  "ip" => "ip",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): LivednsAxfrSlaveEntity`

Create a new `LivednsAxfrSlaveEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## LivednsAxfrTsigEntity

```php
$livedns_axfr_tsig = $client->LivednsAxfrTsig();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `href` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `key_name` | `string` | Yes |  |
| `message` | `string` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->LivednsAxfrTsig()->list(["fqdn" => "example"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and throws on error.

```php
$result = $client->LivednsAxfrTsig()->remove(["id" => "livedns_axfr_tsig_id", "fqdn" => "fqdn"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->LivednsAxfrTsig()->update([
  "id" => "livedns_axfr_tsig_id",
  "fqdn" => "fqdn",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): LivednsAxfrTsigEntity`

Create a new `LivednsAxfrTsigEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## LivednsDomainEntity

```php
$livedns_domain = $client->LivednsDomain();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `automatic_snapshots` | `bool` | Yes |  |
| `domain_href` | `string` | Yes |  |
| `domain_keys_href` | `string` | Yes |  |
| `domain_records_href` | `string` | Yes |  |
| `fqdn` | `string` | Yes |  |
| `message` | `string` | Yes |  |
| `zone` | `array` | No |  |

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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->LivednsDomain()->create([
  "fqdn" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->LivednsDomain()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->LivednsDomain()->load(["fqdn" => "fqdn"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->LivednsDomain()->update([
  "fqdn" => "fqdn",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): LivednsDomainEntity`

Create a new `LivednsDomainEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## LivednsKeyEntity

```php
$livedns_key = $client->LivednsKey();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `algorithm` | `int` | Yes |  |
| `algorithm_name` | `string` | Yes |  |
| `deleted` | `bool` | Yes |  |
| `ds` | `string` | Yes |  |
| `fingerprint` | `string` | Yes |  |
| `flags` | `int` | Yes |  |
| `fqdn` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `key_href` | `string` | Yes |  |
| `message` | `string` | Yes |  |
| `public_key` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `tag` | `int` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->LivednsKey()->create([
  "fqdn" => null, // string
  "flags" => null, // int
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->LivednsKey()->list(["fqdn" => "example"]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->LivednsKey()->load(["id" => "livedns_key_id", "fqdn" => "fqdn"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and throws on error.

```php
$result = $client->LivednsKey()->remove(["id" => "livedns_key_id", "fqdn" => "fqdn"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->LivednsKey()->update([
  "id" => "livedns_key_id",
  "fqdn" => "fqdn",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): LivednsKeyEntity`

Create a new `LivednsKeyEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## LivednsNameserverEntity

```php
$livedns_nameserver = $client->LivednsNameserver();
```

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->LivednsNameserver()->list(["fqdn" => "example"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): LivednsNameserverEntity`

Create a new `LivednsNameserverEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## LivednsRecordEntity

```php
$livedns_record = $client->LivednsRecord();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `add_rrset_values` | `array` | No |  |
| `id` | `string` | No |  |
| `message` | `string` | Yes |  |
| `remove_rrset_values` | `array` | No |  |
| `rrset_href` | `string` | Yes |  |
| `rrset_name` | `string` | Yes |  |
| `rrset_ttl` | `int` | No |  |
| `rrset_type` | `string` | Yes |  |
| `rrset_values` | `array` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->LivednsRecord()->create([
  "fqdn" => null, // string
  "rrset_values" => null, // array
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->LivednsRecord()->list(["fqdn" => "example"]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->LivednsRecord()->load(["fqdn" => "fqdn", "rrset_name" => "rrset_name", "rrset_type" => "rrset_type"]);
```

#### `patch(array $reqdata, ?array $ctrl = null): mixed`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and throws on error.

```php
$result = $client->LivednsRecord()->patch([
  "fqdn" => "fqdn",
  "rrset_name" => "rrset_name",
  "rrset_type" => "rrset_type",
  // Only the fields to change
]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and throws on error.

```php
$result = $client->LivednsRecord()->remove(["fqdn" => "fqdn", "rrset_name" => "rrset_name", "rrset_type" => "rrset_type"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->LivednsRecord()->update([
  "fqdn" => "fqdn",
  "rrset_name" => "rrset_name",
  "rrset_type" => "rrset_type",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): LivednsRecordEntity`

Create a new `LivednsRecordEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## LivednsRrtypeEntity

```php
$livedns_rrtype = $client->LivednsRrtype();
```

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->LivednsRrtype()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): LivednsRrtypeEntity`

Create a new `LivednsRrtypeEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## LivednsSnapshotEntity

```php
$livedns_snapshot = $client->LivednsSnapshot();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `automatic` | `bool` | Yes |  |
| `created_at` | `string` | Yes |  |
| `href` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `message` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `zone_data` | `array` | Yes |  |

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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->LivednsSnapshot()->create([
  "fqdn" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->LivednsSnapshot()->list(["fqdn" => "example"]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->LivednsSnapshot()->load(["id" => "livedns_snapshot_id", "fqdn" => "fqdn"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and throws on error.

```php
$result = $client->LivednsSnapshot()->remove(["id" => "livedns_snapshot_id", "fqdn" => "fqdn"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->LivednsSnapshot()->update([
  "id" => "livedns_snapshot_id",
  "fqdn" => "fqdn",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): LivednsSnapshotEntity`

Create a new `LivednsSnapshotEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## LivednsTsigKeyEntity

```php
$livedns_tsig_key = $client->LivednsTsigKey();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `config_samples` | `array` | Yes |  |
| `href` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `key_name` | `string` | Yes |  |
| `secret` | `string` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->LivednsTsigKey()->create([
  "config_samples" => null, // array
  "href" => null, // string
  "id" => null, // string
  "key_name" => null, // string
  "secret" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->LivednsTsigKey()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->LivednsTsigKey()->load(["id" => "livedns_tsig_key_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): LivednsTsigKeyEntity`

Create a new `LivednsTsigKeyEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## LivednsZoneEntity

```php
$livedns_zone = $client->LivednsZone();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `items` | `array` | Yes |  |
| `message` | `string` | Yes |  |
| `remove_apex_ns` | `bool` | No |  |

### Operations

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and throws on error.

```php
$result = $client->LivednsZone()->remove(["fqdn" => "fqdn"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->LivednsZone()->update([
  "fqdn" => "fqdn",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): LivednsZoneEntity`

Create a new `LivednsZoneEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## MailboxEntity

```php
$mailbox = $client->Mailbox();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | `string` | Yes |  |
| `aliases` | `array` | No |  |
| `antispam` | `bool` | Yes |  |
| `autorenew` | `array` | Yes |  |
| `config` | `array` | Yes |  |
| `config_name` | `string` | Yes |  |
| `created_at` | `string` | Yes |  |
| `data_access` | `bool` | Yes |  |
| `domain_part` | `string` | Yes |  |
| `duration_month` | `int` | No |  |
| `email` | `string` | Yes |  |
| `expires_at` | `string` | Yes |  |
| `internal_domain` | `bool` | Yes |  |
| `issues` | `array` | No |  |
| `last_paid_duration` | `int` | Yes |  |
| `local_part` | `string` | Yes |  |
| `message` | `string` | Yes |  |
| `owner` | `array` | Yes |  |
| `password` | `string` | Yes |  |
| `quota` | `int` | Yes |  |
| `quota_used` | `int` | Yes |  |
| `responder` | `array` | Yes |  |
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->Mailbox()->create([
  "config_name" => null, // string
  "email" => null, // string
  "password" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Mailbox()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Mailbox()->load(["address" => "address"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and throws on error.

```php
$result = $client->Mailbox()->remove(["address" => "address"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->Mailbox()->update([
  "address" => "address",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): MailboxEntity`

Create a new `MailboxEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## MailboxDomainEntity

```php
$mailbox_domain = $client->MailboxDomain();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `antispam` | `bool` | Yes |  |
| `configuration` | `array` | Yes |  |
| `date_last_validation` | `string` | No |  |
| `dkim` | `bool` | Yes |  |
| `fqdns` | `array` | Yes |  |
| `internal` | `bool` | Yes |  |
| `is_livedns` | `bool` | Yes |  |
| `mx` | `bool` | Yes |  |
| `owner` | `array` | Yes |  |
| `spf` | `bool` | Yes |  |
| `txt` | `bool` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->MailboxDomain()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->MailboxDomain()->load(["domain" => "domain"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): MailboxDomainEntity`

Create a new `MailboxDomainEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## MailboxForwardEntity

```php
$mailbox_forward = $client->MailboxForward();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `destinations` | `array` | Yes |  |
| `message` | `string` | Yes |  |
| `source` | `string` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->MailboxForward()->create([
  "destinations" => null, // array
  "source" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->MailboxForward()->list();
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and throws on error.

```php
$result = $client->MailboxForward()->remove(["source" => "source"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->MailboxForward()->update([
  "source" => "source",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): MailboxForwardEntity`

Create a new `MailboxForwardEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## MailboxProductEntity

```php
$mailbox_product = $client->MailboxProduct();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `autorenew` | `bool` | No |  |
| `config` | `array` | Yes |  |
| `config_name` | `string` | Yes |  |
| `description` | `string` | Yes |  |
| `duration_month` | `int` | Yes |  |
| `label` | `string` | Yes |  |
| `message` | `string` | Yes |  |
| `prices` | `array` | Yes |  |
| `quantity` | `int` | Yes |  |
| `taxes` | `array` | Yes |  |
| `uuid` | `string` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->MailboxProduct()->create([
  "config_name" => null, // string
  "duration_month" => null, // int
  "quantity" => null, // int
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->MailboxProduct()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): MailboxProductEntity`

Create a new `MailboxProductEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## MailboxQuotaEntity

```php
$mailbox_quota = $client->MailboxQuota();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `annually` | `array` | Yes |  |
| `config_name` | `string` | Yes |  |
| `label` | `string` | Yes |  |
| `monthly` | `array` | Yes |  |
| `quota` | `string` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->MailboxQuota()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): MailboxQuotaEntity`

Create a new `MailboxQuotaEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## MailboxSlotEntity

```php
$mailbox_slot = $client->MailboxSlot();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `autorenew` | `array` | Yes |  |
| `config` | `array` | Yes |  |
| `expires_at` | `string` | No |  |
| `last_paid_duration` | `int` | No |  |
| `refund_info` | `array` | Yes |  |
| `refundable` | `bool` | Yes |  |
| `uuid` | `string` | Yes |  |
| `webhosting_pack` | `bool` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->MailboxSlot()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->MailboxSlot()->load(["uuid" => "uuid"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): MailboxSlotEntity`

Create a new `MailboxSlotEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## OrganizationEntity

```php
$organization = $client->Organization();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `city` | `string` | Yes |  |
| `corporate` | `bool` | Yes |  |
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
| `reseller` | `bool` | Yes |  |
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->Organization()->create([
  "city" => null, // string
  "email" => null, // string
  "firstname" => null, // string
  "lastname" => null, // string
  "name" => null, // string
  "orgname" => null, // string
  "phone" => null, // string
  "streetaddr" => null, // string
  "type" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Organization()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Organization()->load(["id" => "organization_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and throws on error.

```php
$result = $client->Organization()->remove(["id" => "organization_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->Organization()->update([
  "id" => "organization_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): OrganizationEntity`

Create a new `OrganizationEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## OrganizationCustomerEntity

```php
$organization_customer = $client->OrganizationCustomer();
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->OrganizationCustomer()->create([
  "org_id" => null, // string
  "city" => null, // string
  "country" => null, // string
  "email" => null, // string
  "firstname" => null, // string
  "lastname" => null, // string
  "phone" => null, // string
  "streetaddr" => null, // string
  "type" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->OrganizationCustomer()->list(["org_id" => "example"]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->OrganizationCustomer()->load(["id" => "organization_customer_id", "org_id" => "org_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and throws on error.

```php
$result = $client->OrganizationCustomer()->remove(["id" => "organization_customer_id", "org_id" => "org_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->OrganizationCustomer()->update([
  "id" => "organization_customer_id",
  "org_id" => "org_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): OrganizationCustomerEntity`

Create a new `OrganizationCustomerEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## TemplateEntity

```php
$template = $client->Template();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | Yes |  |
| `editable` | `bool` | Yes |  |
| `href` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `namespaces` | `array` | Yes |  |
| `orgname` | `string` | Yes |  |
| `payload` | `array` | Yes |  |
| `sharing_space` | `array` | Yes |  |
| `variables` | `array` | Yes |  |

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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->Template()->create([
  "name" => null, // string
  "payload" => null, // array
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Template()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Template()->load(["id" => "template_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and throws on error.

```php
$result = $client->Template()->remove(["id" => "template_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->Template()->update([
  "id" => "template_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): TemplateEntity`

Create a new `TemplateEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## TemplateDispatchEntity

```php
$template_dispatch = $client->TemplateDispatch();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attempt` | `int` | Yes |  |
| `created_at` | `string` | Yes |  |
| `dispatch_href` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `message` | `string` | Yes |  |
| `object_id` | `string` | Yes |  |
| `object_type` | `string` | Yes |  |
| `payload` | `array` | Yes |  |
| `sharing_id` | `string` | Yes |  |
| `state` | `int` | Yes |  |
| `state_msg` | `string` | No |  |
| `target` | `array` | Yes |  |
| `target_id` | `string` | Yes |  |
| `target_type` | `string` | Yes |  |
| `task_history` | `array` | Yes |  |
| `task_status` | `array` | Yes |  |
| `task_updated_at` | `string` | No |  |
| `template_id` | `string` | No |  |
| `template_name` | `string` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->TemplateDispatch()->create([
  "template_id" => null, // string
  "object_id" => null, // string
  "object_type" => null, // string
]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->TemplateDispatch()->load(["id" => "template_dispatch_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): TemplateDispatchEntity`

Create a new `TemplateDispatchEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## TldEntity

```php
$tld = $client->Tld();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `authinfo_for_transfer` | `bool` | Yes |  |
| `category` | `string` | Yes |  |
| `change_owner` | `bool` | Yes |  |
| `corporate` | `bool` | Yes |  |
| `ext_trade` | `bool` | Yes |  |
| `full_tld` | `string` | Yes |  |
| `href` | `string` | Yes |  |
| `lock` | `bool` | Yes |  |
| `name` | `string` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Tld()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Tld()->load(["name" => "name"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): TldEntity`

Create a new `TldEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## UserEntity

```php
$user = $client->User();
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

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->User()->load(["id" => "user_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): UserEntity`

Create a new `UserEntity` instance with the same client and
options.

#### `get_name(): string`

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

```php
$client = new GandiSDK([
  "feature" => [
    "debug" => ["active" => true],
    "idempotency" => ["active" => true],
    "metrics" => ["active" => true],
    "paging" => ["active" => true],
    "ratelimit" => ["active" => true],
    "retry" => ["active" => true],
    "secrets" => ["active" => true],
    "test" => ["active" => true],
    "timeout" => ["active" => true],
  ],
]);
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

