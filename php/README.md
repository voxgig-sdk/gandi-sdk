# Gandi PHP SDK

Gandi API client, generated from an OpenAPI definition constructed from Gandi's API documentation.

The PHP SDK for the Gandi API — an entity-oriented client using PHP conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `$client->AccessToken()` — with named operations (`list`/`load`/`create`/`update`/`patch`/`remove`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/gandi-sdk/tags)), or
from a clone as a Composer path repository:

```bash
git clone https://github.com/voxgig-sdk/gandi-sdk
composer config repositories.gandi-sdk path ./gandi-sdk/php
composer require voxgig-sdk/gandi-sdk:@dev
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'gandi_sdk.php';

$client = new GandiSDK([
    "apikey" => getenv("GANDI_APIKEY"),
]);
```

### 3. Load an acmedomain

AcmeDomain is nested under domain, so provide the `domain_id`.

```php
try {
    // load() returns the ENTITY — call data_get() for the AcmeDomain record (throws on error).
    $acmedomain = $client->AcmeDomain()->load(["domain_id" => 1, "subscription_id" => "example_subscription_id", "sharing_id" => "example_sharing_id"]);
    print_r($acmedomain->data_get());
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

### 4. Create, update, and remove

```php
// create() returns the ENTITY — call data_get() for the created AccessToken record.
$created = $client->AccessToken()->create(["expires_at" => "example_expires_at", "name" => "example_name"]);

```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $livednsdomains = $client->LivednsDomain()->list();
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

`direct()` does **not** throw — it returns the result array. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```php
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example_id"],
]);

if (! $result["ok"]) {
    $err = $result["err"] ?? null;
    echo "request failed: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    // On an HTTP error status there is no err (only a transport failure sets
    // it), so fall back to the status code.
    $err = $result["err"] ?? null;
    echo "Error: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```php
$client = GandiSDK::test([
    "entity" => ["linked_zone" => ["test01" => ["id" => "test01"]]],
]);

// list() returns entity instances (throws on error);
// call data_get() for the mock record.
$linkedzone = $client->LinkedZone()->list();
print_r(array_map(fn($item) => $item->data_get(), $linkedzone));
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new GandiSDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
GANDI_TEST_LIVE=TRUE
GANDI_APIKEY=<your-key>
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### GandiSDK

```php
require_once 'gandi_sdk.php';
$client = new GandiSDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = GandiSDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### GandiSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `AccessToken` | `($data): AccessTokenEntity` | Create an AccessToken entity instance. |
| `AcmeAccount` | `($data): AcmeAccountEntity` | Create an AcmeAccount entity instance. |
| `AcmeDomain` | `($data): AcmeDomainEntity` | Create an AcmeDomain entity instance. |
| `AcmePrice` | `($data): AcmePriceEntity` | Create an AcmePrice entity instance. |
| `AcmeSubscription` | `($data): AcmeSubscriptionEntity` | Create an AcmeSubscription entity instance. |
| `BillingInfo` | `($data): BillingInfoEntity` | Create a BillingInfo entity instance. |
| `BillingPrice` | `($data): BillingPriceEntity` | Create a BillingPrice entity instance. |
| `CertificateDcv` | `($data): CertificateDcvEntity` | Create a CertificateDcv entity instance. |
| `CertificatePackage` | `($data): CertificatePackageEntity` | Create a CertificatePackage entity instance. |
| `CertificatePem` | `($data): CertificatePemEntity` | Create a CertificatePem entity instance. |
| `CertificateRenewal` | `($data): CertificateRenewalEntity` | Create a CertificateRenewal entity instance. |
| `CertificateTag` | `($data): CertificateTagEntity` | Create a CertificateTag entity instance. |
| `Comment` | `($data): CommentEntity` | Create a Comment entity instance. |
| `Domain` | `($data): DomainEntity` | Create a Domain entity instance. |
| `DomainAvailability` | `($data): DomainAvailabilityEntity` | Create a DomainAvailability entity instance. |
| `DomainChangeOwner` | `($data): DomainChangeOwnerEntity` | Create a DomainChangeOwner entity instance. |
| `DomainClaim` | `($data): DomainClaimEntity` | Create a DomainClaim entity instance. |
| `DomainContact` | `($data): DomainContactEntity` | Create a DomainContact entity instance. |
| `DomainDnskey` | `($data): DomainDnskeyEntity` | Create a DomainDnskey entity instance. |
| `DomainDnssec` | `($data): DomainDnssecEntity` | Create a DomainDnssec entity instance. |
| `DomainHost` | `($data): DomainHostEntity` | Create a DomainHost entity instance. |
| `DomainLivedns` | `($data): DomainLivednsEntity` | Create a DomainLivedns entity instance. |
| `DomainNameserver` | `($data): DomainNameserverEntity` | Create a DomainNameserver entity instance. |
| `DomainTag` | `($data): DomainTagEntity` | Create a DomainTag entity instance. |
| `DomainTransfer` | `($data): DomainTransferEntity` | Create a DomainTransfer entity instance. |
| `DomainWebredir` | `($data): DomainWebredirEntity` | Create a DomainWebredir entity instance. |
| `EmailForward` | `($data): EmailForwardEntity` | Create an EmailForward entity instance. |
| `EmailMailbox` | `($data): EmailMailboxEntity` | Create an EmailMailbox entity instance. |
| `EmailMigration` | `($data): EmailMigrationEntity` | Create an EmailMigration entity instance. |
| `EmailOffer` | `($data): EmailOfferEntity` | Create an EmailOffer entity instance. |
| `EmailSlot` | `($data): EmailSlotEntity` | Create an EmailSlot entity instance. |
| `HostingApplication` | `($data): HostingApplicationEntity` | Create a HostingApplication entity instance. |
| `HostingInstance` | `($data): HostingInstanceEntity` | Create a HostingInstance entity instance. |
| `HostingVhost` | `($data): HostingVhostEntity` | Create a HostingVhost entity instance. |
| `IssuedCertificate` | `($data): IssuedCertificateEntity` | Create an IssuedCertificate entity instance. |
| `LinkedZone` | `($data): LinkedZoneEntity` | Create a LinkedZone entity instance. |
| `LinkedZoneDeployment` | `($data): LinkedZoneDeploymentEntity` | Create a LinkedZoneDeployment entity instance. |
| `LinkedZoneDomain` | `($data): LinkedZoneDomainEntity` | Create a LinkedZoneDomain entity instance. |
| `LinkedZoneTask` | `($data): LinkedZoneTaskEntity` | Create a LinkedZoneTask entity instance. |
| `LivednsAxfrSlave` | `($data): LivednsAxfrSlaveEntity` | Create a LivednsAxfrSlave entity instance. |
| `LivednsAxfrTsig` | `($data): LivednsAxfrTsigEntity` | Create a LivednsAxfrTsig entity instance. |
| `LivednsDomain` | `($data): LivednsDomainEntity` | Create a LivednsDomain entity instance. |
| `LivednsKey` | `($data): LivednsKeyEntity` | Create a LivednsKey entity instance. |
| `LivednsNameserver` | `($data): LivednsNameserverEntity` | Create a LivednsNameserver entity instance. |
| `LivednsRecord` | `($data): LivednsRecordEntity` | Create a LivednsRecord entity instance. |
| `LivednsRrtype` | `($data): LivednsRrtypeEntity` | Create a LivednsRrtype entity instance. |
| `LivednsSnapshot` | `($data): LivednsSnapshotEntity` | Create a LivednsSnapshot entity instance. |
| `LivednsTsigKey` | `($data): LivednsTsigKeyEntity` | Create a LivednsTsigKey entity instance. |
| `LivednsZone` | `($data): LivednsZoneEntity` | Create a LivednsZone entity instance. |
| `Mailbox` | `($data): MailboxEntity` | Create a Mailbox entity instance. |
| `MailboxDomain` | `($data): MailboxDomainEntity` | Create a MailboxDomain entity instance. |
| `MailboxForward` | `($data): MailboxForwardEntity` | Create a MailboxForward entity instance. |
| `MailboxProduct` | `($data): MailboxProductEntity` | Create a MailboxProduct entity instance. |
| `MailboxQuota` | `($data): MailboxQuotaEntity` | Create a MailboxQuota entity instance. |
| `MailboxSlot` | `($data): MailboxSlotEntity` | Create a MailboxSlot entity instance. |
| `Organization` | `($data): OrganizationEntity` | Create an Organization entity instance. |
| `OrganizationCustomer` | `($data): OrganizationCustomerEntity` | Create an OrganizationCustomer entity instance. |
| `Template` | `($data): TemplateEntity` | Create a Template entity instance. |
| `TemplateDispatch` | `($data): TemplateDispatchEntity` | Create a TemplateDispatch entity instance. |
| `Tld` | `($data): TldEntity` | Create a Tld entity instance. |
| `User` | `($data): UserEntity` | Create an User entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): mixed` | Load a single entity by match criteria, and return it. |
| `list` | `(?array $reqmatch = null, $ctrl): mixed` | List entities matching the criteria (call with no argument to list all), one per record. |
| `create` | `($reqdata, $ctrl): mixed` | Create a new entity, and return it. |
| `update` | `($reqdata, $ctrl): mixed` | Update an existing entity, and return it. |
| `patch` | `($reqdata, $ctrl): mixed` | Change part of an existing entity, and return it. |
| `remove` | `($reqmatch, $ctrl): mixed` | Remove an entity, and return it marked as deleted. |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the entity, and `list` an `array` of entities, one
per record; an entity's `data_get()` reads its record (an `array`). They
throw on error, so wrap calls in `try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

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

Operations: Create.

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

Operations: List, Load.

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

Operations: List, Load.

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

Operations: Create, List.

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

Operations: Create, List, Load, Remove, Update.

API path: `/acme/subscriptions`

#### BillingInfo

| Field | Description |
| --- | --- |
| `annual_balance` |  |
| `grid` |  |
| `outstanding_amount` |  |
| `prepaid` |  |
| `prepaid_monthly_invoice` |  |

Operations: Load.

API path: `/billing/info/{sharing_id}`

#### BillingPrice

| Field | Description |
| --- | --- |
| `currency` |  |
| `grid` |  |
| `products` |  |
| `taxes` |  |

Operations: Load.

API path: `/billing/price/{type}`

#### CertificateDcv

| Field | Description |
| --- | --- |
| `message` |  |
| `method` |  |

Operations: Patch, Update.

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

Operations: List, Load.

API path: `/certificate/packages`

#### CertificatePem

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/certificate/pem/-/{filename}`

#### CertificateRenewal

| Field | Description |
| --- | --- |
| `csr` |  |
| `dcv_method` |  |
| `duration` |  |
| `errors` |  |
| `status` |  |

Operations: Create.

API path: `/certificate/issued-certs/{id}`

#### CertificateTag

| Field | Description |
| --- | --- |
| `add` |  |
| `message` |  |
| `remove` |  |
| `tag` |  |
| `tags` |  |

Operations: Create, List, Patch, Remove, Update.

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

Operations: Create, Load, Remove.

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

Operations: Create, List, Load, Remove, Update.

API path: `/domain/domains/{domain}/renew`

#### DomainAvailability

| Field | Description |
| --- | --- |
| `currency` |  |
| `grid` |  |
| `products` |  |
| `taxes` |  |

Operations: Load.

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

Operations: Create, Load.

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

Operations: Create, Load.

API path: `/domain/domains/{domain}/claims`

#### DomainContact

| Field | Description |
| --- | --- |
| `admin` |  |
| `bill` |  |
| `message` |  |
| `owner` |  |
| `tech` |  |

Operations: Load, Update.

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

Operations: Create, List, Remove, Update.

API path: `/domain/domains/{domain}/dnskeys`

#### DomainDnssec

| Field | Description |
| --- | --- |
| `error` |  |
| `state` |  |

Operations: Create, Load, Remove.

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

Operations: Create, List, Load, Remove, Update.

API path: `/domain/domains/{domain}/hosts`

#### DomainLivedns

| Field | Description |
| --- | --- |
| `current` |  |
| `dnssec_available` |  |
| `livednssec_available` |  |
| `message` |  |
| `nameservers` |  |

Operations: Create, Load.

API path: `/domain/domains/{domain}/livedns`

#### DomainNameserver

| Field | Description |
| --- | --- |
| `message` |  |
| `nameservers` |  |

Operations: List, Update.

API path: `/domain/domains/{domain}/nameservers`

#### DomainTag

| Field | Description |
| --- | --- |
| `add` |  |
| `message` |  |
| `remove` |  |
| `tag` |  |
| `tags` |  |

Operations: Create, List, Patch, Remove, Update.

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

Operations: Create, Load, Update.

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

Operations: Create, List, Load, Remove, Update.

API path: `/domain/domains/{domain}/webredirs`

#### EmailForward

| Field | Description |
| --- | --- |
| `destinations` |  |
| `href` |  |
| `id` |  |
| `message` |  |
| `source` |  |

Operations: Create, List, Remove, Update.

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

Operations: Create, List, Load, Remove, Update.

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

Operations: Create, Load.

API path: `/email/migration/{domain}`

#### EmailOffer

| Field | Description |
| --- | --- |
| `antispam` |  |
| `dkim` |  |
| `message` |  |
| `status` |  |
| `version` |  |

Operations: Load, Update.

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

Operations: Create, List, Load, Remove.

API path: `/email/slots/{domain}`

#### HostingApplication

| Field | Description |
| --- | --- |
| `name` |  |
| `name_label` |  |
| `requirements` |  |

Operations: List, Load.

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

Operations: Create, List, Load, Remove, Update.

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

Operations: Create, List, Load, Remove, Update.

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

Operations: Create, List, Load, Remove, Update.

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

Operations: Create, List, Load, Remove, Update.

API path: `/linkedzone/zones`

#### LinkedZoneDeployment

| Field | Description |
| --- | --- |
| `deploy` |  |
| `message` |  |

Operations: Create.

API path: `/linkedzone/zones/{zone_id}`

#### LinkedZoneDomain

| Field | Description |
| --- | --- |
| `deployed` |  |
| `id` |  |
| `name` |  |
| `owner` |  |
| `zone` |  |

Operations: List, Load, Update.

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

Operations: List, Load.

API path: `/linkedzone/tasks`

#### LivednsAxfrSlave

| Field | Description |
| --- | --- |
| `message` |  |

Operations: List, Remove, Update.

API path: `/livedns/domains/{fqdn}/axfr/slaves`

#### LivednsAxfrTsig

| Field | Description |
| --- | --- |
| `href` |  |
| `id` |  |
| `key_name` |  |
| `message` |  |

Operations: List, Remove, Update.

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

Operations: Create, List, Load, Update.

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

Operations: Create, List, Load, Remove, Update.

API path: `/livedns/domains/{fqdn}/keys`

#### LivednsNameserver

| Field | Description |
| --- | --- |

Operations: List.

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

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/livedns/domains/{fqdn}/records/{rrset_name}/{rrset_type}`

#### LivednsRrtype

| Field | Description |
| --- | --- |

Operations: List.

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

Operations: Create, List, Load, Remove, Update.

API path: `/livedns/domains/{fqdn}/snapshots`

#### LivednsTsigKey

| Field | Description |
| --- | --- |
| `config_samples` |  |
| `href` |  |
| `id` |  |
| `key_name` |  |
| `secret` |  |

Operations: Create, List, Load.

API path: `/livedns/axfr/tsig`

#### LivednsZone

| Field | Description |
| --- | --- |
| `items` |  |
| `message` |  |
| `remove_apex_ns` |  |

Operations: Remove, Update.

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

Operations: Create, List, Load, Remove, Update.

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

Operations: Create, List, Load.

API path: `/mailbox/domains/{domain}/validate`

#### MailboxForward

| Field | Description |
| --- | --- |
| `destinations` |  |
| `message` |  |
| `source` |  |

Operations: Create, List, Remove, Update.

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

Operations: Create, List.

API path: `/mailbox/products`

#### MailboxQuota

| Field | Description |
| --- | --- |
| `annually` |  |
| `config_name` |  |
| `label` |  |
| `monthly` |  |
| `quota` |  |

Operations: List.

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

Operations: List, Load.

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

Operations: Create, List, Load, Remove, Update.

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

Operations: Create, List, Load, Remove, Update.

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

Operations: Create, List, Load, Remove, Update.

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

Operations: Create, Load.

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

Operations: List, Load.

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

Operations: Load.

API path: `/organization/user-info`



## Entities


### AccessToken

Create an instance: `$access_token = $client->AccessToken();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `access_token` | `string` |  |
| `entities` | `array` |  |
| `expires_at` | `string` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `scopes` | `array` |  |

#### Example: Create

```php
$access_token = $client->AccessToken()->create([
]);
```


### AcmeAccount

Create an instance: `$acme_account = $client->AcmeAccount();`

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

```php
// load() returns the ENTITY — call data_get() for the AcmeAccount record (throws on error).
$acme_account = $client->AcmeAccount()->load(["id" => "acme_account_id", "subscription_id" => "subscription_id", "sharing_id" => "sharing_id"]);
```

#### Example: List

```php
// list() returns an array of AcmeAccount entities, one per record (throws on error).
$acme_accounts = $client->AcmeAccount()->list(["subscription_id" => "example", "sharing_id" => "example"]);
```


### AcmeDomain

Create an instance: `$acme_domain = $client->AcmeDomain();`

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
| `is_wildcard` | `bool` |  |
| `status` | `string` |  |
| `subscription_id` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the AcmeDomain record (throws on error).
$acme_domain = $client->AcmeDomain()->load(["domain_id" => 1, "subscription_id" => "subscription_id", "sharing_id" => "sharing_id"]);
```

#### Example: List

```php
// list() returns an array of AcmeDomain entities, one per record (throws on error).
$acme_domains = $client->AcmeDomain()->list(["subscription_id" => "example", "domain" => "example", "sharing_id" => "example"]);
```


### AcmePrice

Create an instance: `$acme_price = $client->AcmePrice();`

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
| `domains` | `array` |  |
| `duration` | `string` |  |
| `duration_unit` | `string` |  |
| `grid` | `string` |  |
| `max_duration` | `int` |  |
| `min_duration` | `int` |  |
| `price_after_taxes` | `string` |  |
| `price_before_taxes` | `string` |  |
| `process` | `string` |  |
| `product` | `array` |  |
| `provider` | `string` |  |
| `tax_rate` | `string` |  |
| `taxes` | `array` |  |
| `validation_type` | `string` |  |

#### Example: List

```php
// list() returns an array of AcmePrice entities, one per record (throws on error).
$acme_prices = $client->AcmePrice()->list(["country" => "example", "currency" => "example", "duration" => "example", "grid" => "example", "process" => "example", "provider" => "example", "sharing_id" => "example", "validation_type" => "example"]);
```

#### Example: Create

```php
$acme_price = $client->AcmePrice()->create([
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


### AcmeSubscription

Create an instance: `$acme_subscription = $client->AcmeSubscription();`

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
| `domains` | `array` |  |
| `duration` | `int` |  |
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

```php
// load() returns the ENTITY — call data_get() for the AcmeSubscription record (throws on error).
$acme_subscription = $client->AcmeSubscription()->load(["subscription_id" => "subscription_id", "sharing_id" => "sharing_id"]);
```

#### Example: List

```php
// list() returns an array of AcmeSubscription entities, one per record (throws on error).
$acme_subscriptions = $client->AcmeSubscription()->list(["created_at" => "example", "ends_at" => "example", "name" => "example", "provider" => "example", "sharing_id" => "example", "status" => "example", "validation_type" => "example", "year" => "example"]);
```

#### Example: Create

```php
$acme_subscription = $client->AcmeSubscription()->create([
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


### BillingInfo

Create an instance: `$billing_info = $client->BillingInfo();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `annual_balance` | `float` |  |
| `grid` | `string` |  |
| `outstanding_amount` | `float` |  |
| `prepaid` | `array` |  |
| `prepaid_monthly_invoice` | `bool` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the BillingInfo record (throws on error).
$billing_info = $client->BillingInfo()->load(["sharing_id" => "sharing_id"]);
```


### BillingPrice

Create an instance: `$billing_price = $client->BillingPrice();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `currency` | `string` |  |
| `grid` | `string` |  |
| `products` | `array` |  |
| `taxes` | `array` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the BillingPrice record (throws on error).
$billing_price = $client->BillingPrice()->load(["type" => "type", "name" => [], "process" => []]);
```


### CertificateDcv

Create an instance: `$certificate_dcv = $client->CertificateDcv();`

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

Create an instance: `$certificate_package = $client->CertificatePackage();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `category` | `array` |  |
| `href` | `string` |  |
| `max_domains` | `int` |  |
| `min_domains` | `int` |  |
| `name` | `string` |  |
| `provider` | `string` |  |
| `sgc` | `bool` |  |
| `trustlogo` | `bool` |  |
| `warranty` | `int` |  |
| `wildcard` | `bool` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the CertificatePackage record (throws on error).
$certificate_package = $client->CertificatePackage()->load(["name" => "name"]);
```

#### Example: List

```php
// list() returns an array of CertificatePackage entities, one per record (throws on error).
$certificate_packages = $client->CertificatePackage()->list();
```


### CertificatePem

Create an instance: `$certificate_pem = $client->CertificatePem();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the CertificatePem record (throws on error).
$certificate_pem = $client->CertificatePem()->load(["type" => "type"]);
```


### CertificateRenewal

Create an instance: `$certificate_renewal = $client->CertificateRenewal();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `csr` | `string` |  |
| `dcv_method` | `string` |  |
| `duration` | `int` |  |
| `errors` | `array` |  |
| `status` | `string` |  |

#### Example: Create

```php
$certificate_renewal = $client->CertificateRenewal()->create([
    "certificate_id" => null, // string
]);
```


### CertificateTag

Create an instance: `$certificate_tag = $client->CertificateTag();`

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
| `add` | `array` |  |
| `message` | `string` |  |
| `remove` | `array` |  |
| `tag` | `string` |  |
| `tags` | `array` |  |

#### Example: List

```php
// list() returns an array of CertificateTag entities, one per record (throws on error).
$certificate_tags = $client->CertificateTag()->list(["certificate_id" => "example"]);
```

#### Example: Create

```php
$certificate_tag = $client->CertificateTag()->create([
    "certificate_id" => null, // string
    "tag" => null, // string
]);
```


### Comment

Create an instance: `$comment = $client->Comment();`

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
| `errors` | `array` |  |
| `id` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |
| `user` | `array` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Comment record (throws on error).
$comment = $client->Comment()->load(["entity_id" => "entity_id"]);
```

#### Example: Create

```php
$comment = $client->Comment()->create([
    "entity_id" => null, // string
    "content" => null, // string
]);
```


### Domain

Create an instance: `$domain = $client->Domain();`

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
| `admin` | `array` |  |
| `authinfo` | `string` |  |
| `autorenew` | `array` |  |
| `bill` | `array` |  |
| `can_tld_lock` | `bool` |  |
| `claims` | `string` |  |
| `contacts` | `array` |  |
| `currency` | `string` |  |
| `dates` | `array` |  |
| `domain_owner` | `string` |  |
| `duration` | `int` |  |
| `enforce_premium` | `bool` |  |
| `errors` | `array` |  |
| `extra_parameters` | `array` |  |
| `fqdn` | `string` |  |
| `fqdn_unicode` | `string` |  |
| `href` | `string` |  |
| `id` | `string` |  |
| `lang` | `string` |  |
| `mailbox_optin` | `bool` |  |
| `nameserver` | `array` |  |
| `nameservers` | `array` |  |
| `nameservers_ips` | `array` |  |
| `orga_owner` | `string` |  |
| `owner` | `array` |  |
| `price` | `float` |  |
| `reachability` | `string` |  |
| `resellee_id` | `string` |  |
| `services` | `array` |  |
| `sharing_id` | `string` |  |
| `sharing_space` | `array` |  |
| `smd` | `string` |  |
| `status` | `array` |  |
| `tags` | `array` |  |
| `tech` | `array` |  |
| `template_id` | `string` |  |
| `tld` | `string` |  |
| `tld_period` | `string` |  |
| `trustee_roles` | `array` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Domain record (throws on error).
$domain = $client->Domain()->load(["fqdn" => "fqdn"]);
```

#### Example: List

```php
// list() returns an array of Domain entities, one per record (throws on error).
$domains = $client->Domain()->list();
```

#### Example: Create

```php
$domain = $client->Domain()->create([
    "admin" => null, // array
    "bill" => null, // array
    "fqdn" => null, // string
    "owner" => null, // array
    "tech" => null, // array
]);
```


### DomainAvailability

Create an instance: `$domain_availability = $client->DomainAvailability();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `currency` | `string` |  |
| `grid` | `string` |  |
| `products` | `array` |  |
| `taxes` | `array` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the DomainAvailability record (throws on error).
$domain_availability = $client->DomainAvailability()->load(["name" => "name"]);
```


### DomainChangeOwner

Create an instance: `$domain_change_owner = $client->DomainChangeOwner();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `admin` | `array` |  |
| `bill` | `array` |  |
| `created_at` | `string` |  |
| `date_start` | `string` |  |
| `errors` | `array` |  |
| `errortype` | `string` |  |
| `errortype_label` | `string` |  |
| `foa` | `array` |  |
| `inner_step` | `string` |  |
| `owner` | `array` |  |
| `params` | `array` |  |
| `status` | `string` |  |
| `step` | `string` |  |
| `step_nb` | `int` |  |
| `tech` | `array` |  |
| `updated_at` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the DomainChangeOwner record (throws on error).
$domain_change_owner = $client->DomainChangeOwner()->load(["domain" => "domain"]);
```

#### Example: Create

```php
$domain_change_owner = $client->DomainChangeOwner()->create([
    "domain" => null, // string
    "admin" => null, // array
    "bill" => null, // array
    "owner" => null, // array
    "tech" => null, // array
]);
```


### DomainClaim

Create an instance: `$domain_claim = $client->DomainClaim();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `claims` | `array` |  |
| `created_at` | `string` |  |
| `expires_at` | `string` |  |
| `fqdn` | `string` |  |
| `fqdn_alabel` | `string` |  |
| `fqdn_ulabel` | `string` |  |
| `notice_id` | `string` |  |
| `status` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the DomainClaim record (throws on error).
$domain_claim = $client->DomainClaim()->load(["domain" => "domain"]);
```

#### Example: Create

```php
$domain_claim = $client->DomainClaim()->create([
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


### DomainContact

Create an instance: `$domain_contact = $client->DomainContact();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `admin` | `array` |  |
| `bill` | `array` |  |
| `message` | `string` |  |
| `owner` | `array` |  |
| `tech` | `array` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the DomainContact record (throws on error).
$domain_contact = $client->DomainContact()->load(["domain" => "domain"]);
```


### DomainDnskey

Create an instance: `$domain_dnskey = $client->DomainDnskey();`

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
| `algorithm` | `int` |  |
| `digest` | `string` |  |
| `digest_type` | `int` |  |
| `href` | `string` |  |
| `id` | `int` |  |
| `keys` | `array` |  |
| `keytag` | `int` |  |
| `message` | `string` |  |
| `public_key` | `string` |  |
| `type` | `string` |  |

#### Example: List

```php
// list() returns an array of DomainDnskey entities, one per record (throws on error).
$domain_dnskeys = $client->DomainDnskey()->list(["domain" => "example"]);
```

#### Example: Create

```php
$domain_dnskey = $client->DomainDnskey()->create([
    "domain" => null, // string
    "algorithm" => null, // int
    "public_key" => null, // string
    "type" => null, // string
]);
```


### DomainDnssec

Create an instance: `$domain_dnssec = $client->DomainDnssec();`

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

```php
// load() returns the ENTITY — call data_get() for the DomainDnssec record (throws on error).
$domain_dnssec = $client->DomainDnssec()->load(["domain" => "domain"]);
```

#### Example: Create

```php
$domain_dnssec = $client->DomainDnssec()->create([
    "domain" => null, // string
    "state" => null, // string
]);
```


### DomainHost

Create an instance: `$domain_host = $client->DomainHost();`

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
| `ips` | `array` |  |
| `message` | `string` |  |
| `name` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the DomainHost record (throws on error).
$domain_host = $client->DomainHost()->load(["domain" => "domain", "name" => "name"]);
```

#### Example: List

```php
// list() returns an array of DomainHost entities, one per record (throws on error).
$domain_hosts = $client->DomainHost()->list(["domain" => "example"]);
```

#### Example: Create

```php
$domain_host = $client->DomainHost()->create([
    "domain" => null, // string
    "ips" => null, // array
    "name" => null, // string
]);
```


### DomainLivedns

Create an instance: `$domain_livedns = $client->DomainLivedns();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `current` | `string` |  |
| `dnssec_available` | `bool` |  |
| `livednssec_available` | `bool` |  |
| `message` | `string` |  |
| `nameservers` | `array` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the DomainLivedns record (throws on error).
$domain_livedns = $client->DomainLivedns()->load(["domain" => "domain"]);
```

#### Example: Create

```php
$domain_livedns = $client->DomainLivedns()->create([
    "domain" => null, // string
    "current" => null, // string
    "message" => null, // string
    "nameservers" => null, // array
]);
```


### DomainNameserver

Create an instance: `$domain_nameserver = $client->DomainNameserver();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `message` | `string` |  |
| `nameservers` | `array` |  |

#### Example: List

```php
// list() returns an array of DomainNameserver entities, one per record (throws on error).
$domain_nameservers = $client->DomainNameserver()->list(["domain" => "example"]);
```


### DomainTag

Create an instance: `$domain_tag = $client->DomainTag();`

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
| `add` | `array` |  |
| `message` | `string` |  |
| `remove` | `array` |  |
| `tag` | `string` |  |
| `tags` | `array` |  |

#### Example: List

```php
// list() returns an array of DomainTag entities, one per record (throws on error).
$domain_tags = $client->DomainTag()->list(["domain" => "example"]);
```

#### Example: Create

```php
$domain_tag = $client->DomainTag()->create([
    "domain" => null, // string
    "tag" => null, // string
]);
```


### DomainTransfer

Create an instance: `$domain_transfer = $client->DomainTransfer();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `admin` | `array` |  |
| `authinfo` | `string` |  |
| `bill` | `array` |  |
| `change_owner` | `bool` |  |
| `created_at` | `string` |  |
| `currency` | `string` |  |
| `duration` | `int` |  |
| `enforce_premium` | `bool` |  |
| `errors` | `array` |  |
| `errortype` | `string` |  |
| `errortype_label` | `string` |  |
| `extra_parameters` | `array` |  |
| `foa` | `array` |  |
| `fqdn` | `string` |  |
| `inner_step` | `string` |  |
| `mailbox_optin` | `bool` |  |
| `message` | `string` |  |
| `nameservers` | `array` |  |
| `nameservers_ips` | `array` |  |
| `owner` | `array` |  |
| `owner_contact` | `string` |  |
| `params` | `array` |  |
| `price` | `float` |  |
| `regac_at` | `string` |  |
| `resellee_id` | `string` |  |
| `start_at` | `string` |  |
| `status` | `string` |  |
| `step` | `string` |  |
| `step_nb` | `int` |  |
| `tech` | `array` |  |
| `template_id` | `string` |  |
| `transfer_link` | `string` |  |
| `transfer_procedure` | `string` |  |
| `updated_at` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the DomainTransfer record (throws on error).
$domain_transfer = $client->DomainTransfer()->load(["domain" => "domain"]);
```

#### Example: Create

```php
$domain_transfer = $client->DomainTransfer()->create([
    "admin" => null, // array
    "bill" => null, // array
    "fqdn" => null, // string
    "owner" => null, // array
    "tech" => null, // array
]);
```


### DomainWebredir

Create an instance: `$domain_webredir = $client->DomainWebredir();`

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
| `override` | `bool` |  |
| `protocol` | `string` |  |
| `type` | `string` |  |
| `updated_at` | `string` |  |
| `url` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the DomainWebredir record (throws on error).
$domain_webredir = $client->DomainWebredir()->load(["domain" => "domain", "host" => "host"]);
```

#### Example: List

```php
// list() returns an array of DomainWebredir entities, one per record (throws on error).
$domain_webredirs = $client->DomainWebredir()->list(["domain" => "example"]);
```

#### Example: Create

```php
$domain_webredir = $client->DomainWebredir()->create([
    "domain" => null, // string
    "host" => null, // string
    "override" => null, // bool
    "protocol" => null, // string
    "type" => null, // string
    "url" => null, // string
]);
```


### EmailForward

Create an instance: `$email_forward = $client->EmailForward();`

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
| `destinations` | `array` |  |
| `href` | `string` |  |
| `id` | `string` |  |
| `message` | `string` |  |
| `source` | `string` |  |

#### Example: List

```php
// list() returns an array of EmailForward entities, one per record (throws on error).
$email_forwards = $client->EmailForward()->list(["domain" => "example"]);
```

#### Example: Create

```php
$email_forward = $client->EmailForward()->create([
    "domain" => null, // string
    "destinations" => null, // array
    "source" => null, // string
]);
```


### EmailMailbox

Create an instance: `$email_mailbox = $client->EmailMailbox();`

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
| `alias_count` | `int` |  |
| `aliases` | `array` |  |
| `antispam` | `bool` |  |
| `autorenew` | `array` |  |
| `domain` | `string` |  |
| `errors` | `array` |  |
| `expires_at` | `string` |  |
| `fallback_email` | `string` |  |
| `href` | `string` |  |
| `id` | `string` |  |
| `login` | `string` |  |
| `mailbox_type` | `string` |  |
| `message` | `string` |  |
| `password` | `string` |  |
| `quota_used` | `int` |  |
| `responder` | `array` |  |
| `status` | `string` |  |
| `to_convert` | `bool` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the EmailMailbox record (throws on error).
$email_mailbox = $client->EmailMailbox()->load(["id" => "email_mailbox_id", "domain" => "domain"]);
```

#### Example: List

```php
// list() returns an array of EmailMailbox entities, one per record (throws on error).
$email_mailboxs = $client->EmailMailbox()->list(["domain" => "example"]);
```

#### Example: Create

```php
$email_mailbox = $client->EmailMailbox()->create([
    "domain" => null, // string
    "login" => null, // string
    "mailbox_type" => null, // string
    "password" => null, // string
]);
```


### EmailMigration

Create an instance: `$email_migration = $client->EmailMigration();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `available` | `bool` |  |
| `currency` | `string` |  |
| `forward_count` | `int` |  |
| `free_mailboxes` | `int` |  |
| `included_mailboxes` | `int` |  |
| `info` | `array` |  |
| `message` | `string` |  |
| `packmail` | `bool` |  |
| `price_v1` | `float` |  |
| `price_v2` | `float` |  |
| `quota_v1` | `float` |  |
| `token` | `string` |  |
| `usage_v1` | `float` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the EmailMigration record (throws on error).
$email_migration = $client->EmailMigration()->load(["domain" => "domain"]);
```

#### Example: Create

```php
$email_migration = $client->EmailMigration()->create([
    "domain" => null, // string
    "token" => null, // string
]);
```


### EmailOffer

Create an instance: `$email_offer = $client->EmailOffer();`

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
| `version` | `int` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the EmailOffer record (throws on error).
$email_offer = $client->EmailOffer()->load(["domain" => "domain"]);
```


### EmailSlot

Create an instance: `$email_slot = $client->EmailSlot();`

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
| `autorenew` | `bool` |  |
| `capacity` | `int` |  |
| `created_at` | `string` |  |
| `duration` | `int` |  |
| `gandi_id` | `int` |  |
| `href` | `string` |  |
| `id` | `string` |  |
| `mailbox_type` | `string` |  |
| `refund_amount` | `float` |  |
| `refund_currency` | `string` |  |
| `refundable` | `bool` |  |
| `status` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the EmailSlot record (throws on error).
$email_slot = $client->EmailSlot()->load(["id" => 1, "domain" => "domain"]);
```

#### Example: List

```php
// list() returns an array of EmailSlot entities, one per record (throws on error).
$email_slots = $client->EmailSlot()->list(["domain" => "example"]);
```

#### Example: Create

```php
$email_slot = $client->EmailSlot()->create([
    "domain" => null, // string
    "duration" => null, // int
    "mailbox_type" => null, // string
]);
```


### HostingApplication

Create an instance: `$hosting_application = $client->HostingApplication();`

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
| `requirements` | `array` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the HostingApplication record (throws on error).
$hosting_application = $client->HostingApplication()->load(["name" => "name"]);
```

#### Example: List

```php
// list() returns an array of HostingApplication entities, one per record (throws on error).
$hosting_applications = $client->HostingApplication()->list();
```


### HostingInstance

Create an instance: `$hosting_instance = $client->HostingInstance();`

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
| `access_information` | `array` |  |
| `authentication` | `array` |  |
| `autorenew` | `array` |  |
| `available_upgrade` | `bool` |  |
| `booster` | `array` |  |
| `booster_options` | `array` |  |
| `compatible_applications` | `array` |  |
| `console` | `array` |  |
| `cpu` | `int` |  |
| `created_at` | `string` |  |
| `database` | `array` |  |
| `datacenter` | `array` |  |
| `domain` | `string` |  |
| `duration` | `int` |  |
| `duration_unit` | `string` |  |
| `errors` | `array` |  |
| `expire_at` | `string` |  |
| `id` | `string` |  |
| `language` | `array` |  |
| `language_id` | `string` |  |
| `location` | `string` |  |
| `message` | `string` |  |
| `name` | `string` |  |
| `password` | `string` |  |
| `password_updated_at` | `string` |  |
| `ram` | `array` |  |
| `sharing_space` | `array` |  |
| `size` | `string` |  |
| `snapshot_enabled` | `bool` |  |
| `status` | `string` |  |
| `storage` | `array` |  |
| `storage_additional_size` | `int` |  |
| `subscription_cancelled` | `bool` |  |
| `type` | `array` |  |
| `upgrade_to` | `array` |  |
| `vhosts` | `array` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the HostingInstance record (throws on error).
$hosting_instance = $client->HostingInstance()->load(["id" => "hosting_instance_id"]);
```

#### Example: List

```php
// list() returns an array of HostingInstance entities, one per record (throws on error).
$hosting_instances = $client->HostingInstance()->list();
```

#### Example: Create

```php
$hosting_instance = $client->HostingInstance()->create([
    "authentication" => null, // array
    "domain" => null, // string
    "location" => null, // string
    "size" => null, // string
    "type" => null, // array
]);
```


### HostingVhost

Create an instance: `$hosting_vhost = $client->HostingVhost();`

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
| `application` | `array` |  |
| `created_at` | `string` |  |
| `deployment` | `array` |  |
| `fqdn` | `string` |  |
| `https_strategy` | `string` |  |
| `is_a_test_vhost` | `bool` |  |
| `linked_dns_zone` | `array` |  |
| `status` | `string` |  |
| `tls_validated_at` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the HostingVhost record (throws on error).
$hosting_vhost = $client->HostingVhost()->load(["fqdn" => "fqdn", "instance_id" => "instance_id"]);
```

#### Example: List

```php
// list() returns an array of HostingVhost entities, one per record (throws on error).
$hosting_vhosts = $client->HostingVhost()->list(["instance_id" => "example"]);
```

#### Example: Create

```php
$hosting_vhost = $client->HostingVhost()->create([
    "instance_id" => null, // string
    "application" => null, // array
    "fqdn" => null, // string
    "linked_dns_zone" => null, // array
]);
```


### IssuedCertificate

Create an instance: `$issued_certificate = $client->IssuedCertificate();`

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
| `altnames` | `array` |  |
| `altnames_unicode` | `array` |  |
| `apex_only` | `bool` |  |
| `assumed_name` | `string` |  |
| `business_category` | `string` |  |
| `card_pay_trustlogo` | `bool` |  |
| `cert` | `string` |  |
| `cn` | `string` |  |
| `cn_unicode` | `string` |  |
| `contact` | `array` |  |
| `csr` | `string` |  |
| `dates` | `array` |  |
| `dcv_method` | `string` |  |
| `duration` | `int` |  |
| `error_msg` | `string` |  |
| `errors` | `array` |  |
| `href` | `string` |  |
| `id` | `string` |  |
| `ida` | `array` |  |
| `intermediate` | `string` |  |
| `joi` | `array` |  |
| `middleman` | `array` |  |
| `owner` | `string` |  |
| `package` | `array` |  |
| `provider` | `string` |  |
| `reissuable` | `bool` |  |
| `renewable` | `bool` |  |
| `resellee_id` | `string` |  |
| `sha_version` | `int` |  |
| `sharing_id` | `string` |  |
| `software` | `int` |  |
| `state` | `string` |  |
| `state_detail` | `string` |  |
| `status` | `string` |  |
| `step_nb` | `int` |  |
| `stored` | `bool` |  |
| `tags` | `array` |  |
| `trustlogo` | `bool` |  |
| `trustlogo_token` | `array` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the IssuedCertificate record (throws on error).
$issued_certificate = $client->IssuedCertificate()->load(["id" => "issued_certificate_id"]);
```

#### Example: List

```php
// list() returns an array of IssuedCertificate entities, one per record (throws on error).
$issued_certificates = $client->IssuedCertificate()->list();
```

#### Example: Create

```php
$issued_certificate = $client->IssuedCertificate()->create([
    "package" => null, // array
]);
```


### LinkedZone

Create an instance: `$linked_zone = $client->LinkedZone();`

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
| `default_records` | `bool` |  |
| `domain_count` | `int` |  |
| `domains` | `array` |  |
| `id` | `string` |  |
| `message` | `string` |  |
| `name` | `string` |  |
| `record_list` | `array` |  |
| `record_text` | `string` |  |
| `records` | `array` |  |
| `sharing_space` | `array` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the LinkedZone record (throws on error).
$linked_zone = $client->LinkedZone()->load(["id" => "linked_zone_id"]);
```

#### Example: List

```php
// list() returns an array of LinkedZone entities, one per record (throws on error).
$linked_zones = $client->LinkedZone()->list();
```

#### Example: Create

```php
$linked_zone = $client->LinkedZone()->create([
    "name" => null, // string
]);
```


### LinkedZoneDeployment

Create an instance: `$linked_zone_deployment = $client->LinkedZoneDeployment();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deploy` | `bool` |  |
| `message` | `string` |  |

#### Example: Create

```php
$linked_zone_deployment = $client->LinkedZoneDeployment()->create([
    "zone_id" => null, // string
    "deploy" => null, // bool
]);
```


### LinkedZoneDomain

Create an instance: `$linked_zone_domain = $client->LinkedZoneDomain();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deployed` | `bool` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `owner` | `string` |  |
| `zone` | `array` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the LinkedZoneDomain record (throws on error).
$linked_zone_domain = $client->LinkedZoneDomain()->load(["name" => "name"]);
```

#### Example: List

```php
// list() returns an array of LinkedZoneDomain entities, one per record (throws on error).
$linked_zone_domains = $client->LinkedZoneDomain()->list();
```


### LinkedZoneTask

Create an instance: `$linked_zone_task = $client->LinkedZoneTask();`

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
| `result` | `array` |  |
| `status` | `string` |  |
| `type` | `string` |  |
| `updated_at` | `string` |  |
| `zone_id` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the LinkedZoneTask record (throws on error).
$linked_zone_task = $client->LinkedZoneTask()->load(["id" => "linked_zone_task_id"]);
```

#### Example: List

```php
// list() returns an array of LinkedZoneTask entities, one per record (throws on error).
$linked_zone_tasks = $client->LinkedZoneTask()->list();
```


### LivednsAxfrSlave

Create an instance: `$livedns_axfr_slave = $client->LivednsAxfrSlave();`

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

```php
// list() returns an array of LivednsAxfrSlave entities, one per record (throws on error).
$livedns_axfr_slaves = $client->LivednsAxfrSlave()->list(["fqdn" => "example"]);
```


### LivednsAxfrTsig

Create an instance: `$livedns_axfr_tsig = $client->LivednsAxfrTsig();`

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

```php
// list() returns an array of LivednsAxfrTsig entities, one per record (throws on error).
$livedns_axfr_tsigs = $client->LivednsAxfrTsig()->list(["fqdn" => "example"]);
```


### LivednsDomain

Create an instance: `$livedns_domain = $client->LivednsDomain();`

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
| `automatic_snapshots` | `bool` |  |
| `domain_href` | `string` |  |
| `domain_keys_href` | `string` |  |
| `domain_records_href` | `string` |  |
| `fqdn` | `string` |  |
| `message` | `string` |  |
| `zone` | `array` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the LivednsDomain record (throws on error).
$livedns_domain = $client->LivednsDomain()->load(["fqdn" => "fqdn"]);
```

#### Example: List

```php
// list() returns an array of LivednsDomain entities, one per record (throws on error).
$livedns_domains = $client->LivednsDomain()->list();
```

#### Example: Create

```php
$livedns_domain = $client->LivednsDomain()->create([
    "fqdn" => null, // string
]);
```


### LivednsKey

Create an instance: `$livedns_key = $client->LivednsKey();`

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
| `algorithm` | `int` |  |
| `algorithm_name` | `string` |  |
| `deleted` | `bool` |  |
| `ds` | `string` |  |
| `fingerprint` | `string` |  |
| `flags` | `int` |  |
| `fqdn` | `string` |  |
| `id` | `string` |  |
| `key_href` | `string` |  |
| `message` | `string` |  |
| `public_key` | `string` |  |
| `status` | `string` |  |
| `tag` | `int` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the LivednsKey record (throws on error).
$livedns_key = $client->LivednsKey()->load(["id" => "livedns_key_id", "fqdn" => "fqdn"]);
```

#### Example: List

```php
// list() returns an array of LivednsKey entities, one per record (throws on error).
$livedns_keys = $client->LivednsKey()->list(["fqdn" => "example"]);
```

#### Example: Create

```php
$livedns_key = $client->LivednsKey()->create([
    "fqdn" => null, // string
    "flags" => null, // int
]);
```


### LivednsNameserver

Create an instance: `$livedns_nameserver = $client->LivednsNameserver();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Example: List

```php
// list() returns an array of LivednsNameserver entities, one per record (throws on error).
$livedns_nameservers = $client->LivednsNameserver()->list(["fqdn" => "example"]);
```


### LivednsRecord

Create an instance: `$livedns_record = $client->LivednsRecord();`

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
| `add_rrset_values` | `array` |  |
| `id` | `string` |  |
| `message` | `string` |  |
| `remove_rrset_values` | `array` |  |
| `rrset_href` | `string` |  |
| `rrset_name` | `string` |  |
| `rrset_ttl` | `int` |  |
| `rrset_type` | `string` |  |
| `rrset_values` | `array` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the LivednsRecord record (throws on error).
$livedns_record = $client->LivednsRecord()->load(["fqdn" => "fqdn", "rrset_name" => "rrset_name", "rrset_type" => "rrset_type"]);
```

#### Example: List

```php
// list() returns an array of LivednsRecord entities, one per record (throws on error).
$livedns_records = $client->LivednsRecord()->list(["fqdn" => "example"]);
```

#### Example: Create

```php
$livedns_record = $client->LivednsRecord()->create([
    "fqdn" => null, // string
    "rrset_values" => null, // array
]);
```


### LivednsRrtype

Create an instance: `$livedns_rrtype = $client->LivednsRrtype();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Example: List

```php
// list() returns an array of LivednsRrtype entities, one per record (throws on error).
$livedns_rrtypes = $client->LivednsRrtype()->list();
```


### LivednsSnapshot

Create an instance: `$livedns_snapshot = $client->LivednsSnapshot();`

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
| `automatic` | `bool` |  |
| `created_at` | `string` |  |
| `href` | `string` |  |
| `id` | `string` |  |
| `message` | `string` |  |
| `name` | `string` |  |
| `zone_data` | `array` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the LivednsSnapshot record (throws on error).
$livedns_snapshot = $client->LivednsSnapshot()->load(["id" => "livedns_snapshot_id", "fqdn" => "fqdn"]);
```

#### Example: List

```php
// list() returns an array of LivednsSnapshot entities, one per record (throws on error).
$livedns_snapshots = $client->LivednsSnapshot()->list(["fqdn" => "example"]);
```

#### Example: Create

```php
$livedns_snapshot = $client->LivednsSnapshot()->create([
    "fqdn" => null, // string
]);
```


### LivednsTsigKey

Create an instance: `$livedns_tsig_key = $client->LivednsTsigKey();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `config_samples` | `array` |  |
| `href` | `string` |  |
| `id` | `string` |  |
| `key_name` | `string` |  |
| `secret` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the LivednsTsigKey record (throws on error).
$livedns_tsig_key = $client->LivednsTsigKey()->load(["id" => "livedns_tsig_key_id"]);
```

#### Example: List

```php
// list() returns an array of LivednsTsigKey entities, one per record (throws on error).
$livedns_tsig_keys = $client->LivednsTsigKey()->list();
```

#### Example: Create

```php
$livedns_tsig_key = $client->LivednsTsigKey()->create([
    "config_samples" => null, // array
    "href" => null, // string
    "id" => null, // string
    "key_name" => null, // string
    "secret" => null, // string
]);
```


### LivednsZone

Create an instance: `$livedns_zone = $client->LivednsZone();`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `items` | `array` |  |
| `message` | `string` |  |
| `remove_apex_ns` | `bool` |  |


### Mailbox

Create an instance: `$mailbox = $client->Mailbox();`

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
| `aliases` | `array` |  |
| `antispam` | `bool` |  |
| `autorenew` | `array` |  |
| `config` | `array` |  |
| `config_name` | `string` |  |
| `created_at` | `string` |  |
| `data_access` | `bool` |  |
| `domain_part` | `string` |  |
| `duration_month` | `int` |  |
| `email` | `string` |  |
| `expires_at` | `string` |  |
| `internal_domain` | `bool` |  |
| `issues` | `array` |  |
| `last_paid_duration` | `int` |  |
| `local_part` | `string` |  |
| `message` | `string` |  |
| `owner` | `array` |  |
| `password` | `string` |  |
| `quota` | `int` |  |
| `quota_used` | `int` |  |
| `responder` | `array` |  |
| `updated_at` | `string` |  |
| `uuid` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Mailbox record (throws on error).
$mailbox = $client->Mailbox()->load(["address" => "address"]);
```

#### Example: List

```php
// list() returns an array of Mailbox entities, one per record (throws on error).
$mailboxs = $client->Mailbox()->list();
```

#### Example: Create

```php
$mailbox = $client->Mailbox()->create([
    "config_name" => null, // string
    "email" => null, // string
    "password" => null, // string
]);
```


### MailboxDomain

Create an instance: `$mailbox_domain = $client->MailboxDomain();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `antispam` | `bool` |  |
| `configuration` | `array` |  |
| `date_last_validation` | `string` |  |
| `dkim` | `bool` |  |
| `fqdns` | `array` |  |
| `internal` | `bool` |  |
| `is_livedns` | `bool` |  |
| `mx` | `bool` |  |
| `owner` | `array` |  |
| `spf` | `bool` |  |
| `txt` | `bool` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the MailboxDomain record (throws on error).
$mailbox_domain = $client->MailboxDomain()->load(["domain" => "domain"]);
```

#### Example: List

```php
// list() returns an array of MailboxDomain entities, one per record (throws on error).
$mailbox_domains = $client->MailboxDomain()->list();
```

#### Example: Create

```php
$mailbox_domain = $client->MailboxDomain()->create([
    "domain" => null, // string
]);
```


### MailboxForward

Create an instance: `$mailbox_forward = $client->MailboxForward();`

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
| `destinations` | `array` |  |
| `message` | `string` |  |
| `source` | `string` |  |

#### Example: List

```php
// list() returns an array of MailboxForward entities, one per record (throws on error).
$mailbox_forwards = $client->MailboxForward()->list();
```

#### Example: Create

```php
$mailbox_forward = $client->MailboxForward()->create([
    "destinations" => null, // array
    "source" => null, // string
]);
```


### MailboxProduct

Create an instance: `$mailbox_product = $client->MailboxProduct();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `autorenew` | `bool` |  |
| `config` | `array` |  |
| `config_name` | `string` |  |
| `description` | `string` |  |
| `duration_month` | `int` |  |
| `label` | `string` |  |
| `message` | `string` |  |
| `prices` | `array` |  |
| `quantity` | `int` |  |
| `taxes` | `array` |  |
| `uuid` | `string` |  |

#### Example: List

```php
// list() returns an array of MailboxProduct entities, one per record (throws on error).
$mailbox_products = $client->MailboxProduct()->list();
```

#### Example: Create

```php
$mailbox_product = $client->MailboxProduct()->create([
    "config_name" => null, // string
    "duration_month" => null, // int
    "quantity" => null, // int
]);
```


### MailboxQuota

Create an instance: `$mailbox_quota = $client->MailboxQuota();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `annually` | `array` |  |
| `config_name` | `string` |  |
| `label` | `string` |  |
| `monthly` | `array` |  |
| `quota` | `string` |  |

#### Example: List

```php
// list() returns an array of MailboxQuota entities, one per record (throws on error).
$mailbox_quotas = $client->MailboxQuota()->list();
```


### MailboxSlot

Create an instance: `$mailbox_slot = $client->MailboxSlot();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `autorenew` | `array` |  |
| `config` | `array` |  |
| `expires_at` | `string` |  |
| `last_paid_duration` | `int` |  |
| `refund_info` | `array` |  |
| `refundable` | `bool` |  |
| `uuid` | `string` |  |
| `webhosting_pack` | `bool` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the MailboxSlot record (throws on error).
$mailbox_slot = $client->MailboxSlot()->load(["uuid" => "uuid"]);
```

#### Example: List

```php
// list() returns an array of MailboxSlot entities, one per record (throws on error).
$mailbox_slots = $client->MailboxSlot()->list();
```


### Organization

Create an instance: `$organization = $client->Organization();`

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
| `corporate` | `bool` |  |
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
| `reseller` | `bool` |  |
| `siren` | `string` |  |
| `state` | `string` |  |
| `streetaddr` | `string` |  |
| `streetaddr2` | `string` |  |
| `type` | `string` |  |
| `vat_number` | `string` |  |
| `zip` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Organization record (throws on error).
$organization = $client->Organization()->load(["id" => "organization_id"]);
```

#### Example: List

```php
// list() returns an array of Organization entities, one per record (throws on error).
$organizations = $client->Organization()->list();
```

#### Example: Create

```php
$organization = $client->Organization()->create([
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


### OrganizationCustomer

Create an instance: `$organization_customer = $client->OrganizationCustomer();`

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

```php
// load() returns the ENTITY — call data_get() for the OrganizationCustomer record (throws on error).
$organization_customer = $client->OrganizationCustomer()->load(["id" => "organization_customer_id", "org_id" => "org_id"]);
```

#### Example: List

```php
// list() returns an array of OrganizationCustomer entities, one per record (throws on error).
$organization_customers = $client->OrganizationCustomer()->list(["org_id" => "example"]);
```

#### Example: Create

```php
$organization_customer = $client->OrganizationCustomer()->create([
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


### Template

Create an instance: `$template = $client->Template();`

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
| `editable` | `bool` |  |
| `href` | `string` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `namespaces` | `array` |  |
| `orgname` | `string` |  |
| `payload` | `array` |  |
| `sharing_space` | `array` |  |
| `variables` | `array` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Template record (throws on error).
$template = $client->Template()->load(["id" => "template_id"]);
```

#### Example: List

```php
// list() returns an array of Template entities, one per record (throws on error).
$templates = $client->Template()->list();
```

#### Example: Create

```php
$template = $client->Template()->create([
    "name" => null, // string
    "payload" => null, // array
]);
```


### TemplateDispatch

Create an instance: `$template_dispatch = $client->TemplateDispatch();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attempt` | `int` |  |
| `created_at` | `string` |  |
| `dispatch_href` | `string` |  |
| `id` | `string` |  |
| `message` | `string` |  |
| `object_id` | `string` |  |
| `object_type` | `string` |  |
| `payload` | `array` |  |
| `sharing_id` | `string` |  |
| `state` | `int` |  |
| `state_msg` | `string` |  |
| `target` | `array` |  |
| `target_id` | `string` |  |
| `target_type` | `string` |  |
| `task_history` | `array` |  |
| `task_status` | `array` |  |
| `task_updated_at` | `string` |  |
| `template_id` | `string` |  |
| `template_name` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the TemplateDispatch record (throws on error).
$template_dispatch = $client->TemplateDispatch()->load(["id" => "template_dispatch_id"]);
```

#### Example: Create

```php
$template_dispatch = $client->TemplateDispatch()->create([
    "template_id" => null, // string
    "object_id" => null, // string
    "object_type" => null, // string
]);
```


### Tld

Create an instance: `$tld = $client->Tld();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `authinfo_for_transfer` | `bool` |  |
| `category` | `string` |  |
| `change_owner` | `bool` |  |
| `corporate` | `bool` |  |
| `ext_trade` | `bool` |  |
| `full_tld` | `string` |  |
| `href` | `string` |  |
| `lock` | `bool` |  |
| `name` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Tld record (throws on error).
$tld = $client->Tld()->load(["name" => "name"]);
```

#### Example: List

```php
// list() returns an array of Tld entities, one per record (throws on error).
$tlds = $client->Tld()->list();
```


### User

Create an instance: `$user = $client->User();`

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

```php
// load() returns the ENTITY — call data_get() for the User record (throws on error).
$user = $client->User()->load(["id" => "user_id"]);
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

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

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

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── gandi_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── schema.php                     -- Generated option + entity specs
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`gandi_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```php
$livednsdomain = $client->LivednsDomain();
$livednsdomain->list();

// $livednsdomain->data_get() now returns the livednsdomain data from the last list
// $livednsdomain->match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
