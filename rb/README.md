# Gandi Ruby SDK

Gandi API client, generated from an OpenAPI definition constructed from Gandi's API documentation.

The Ruby SDK for the Gandi API — an entity-oriented client using idiomatic Ruby conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.AccessToken` — with named operations (`list`/`load`/`create`/`update`/`patch`/`remove`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to RubyGems. Install it from the
GitHub release tag (`rb/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/gandi-sdk/tags)), or
from a clone:

```bash
git clone https://github.com/voxgig-sdk/gandi-sdk
```

Then add it to your `Gemfile` by path, and run `bundle install`:

```ruby
gem "voxgig-sdk-gandi-sdk", path: "./gandi-sdk/rb"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ruby
require_relative "Gandi_sdk"

client = GandiSDK.new({
  "apikey" => ENV["GANDI_APIKEY"],
})
```

### 3. Load an acmedomain

AcmeDomain is nested under domain, so provide the `domain_id`.

```ruby
begin
  # load returns the ENTITY — call data_get for the AcmeDomain record (raises on error).
  acmedomain = client.AcmeDomain.load({ "domain_id" => 1, "subscription_id" => "example_subscription_id", "sharing_id" => "example_sharing_id" })
  puts acmedomain.data_get
rescue => err
  warn "load failed: #{err}"
end
```

### 4. Create, update, and remove

```ruby
# create returns the ENTITY — call data_get for the created AccessToken record.
created = client.AccessToken.create({ "expires_at" => "example_expires_at", "name" => "example_name" })

```


## Error handling

Entity operations raise on failure, so rescue them:

```ruby
begin
  livednsdomains = client.LivednsDomain.list()
rescue => err
  warn "list failed: #{err}"
end
```

`direct` does **not** raise — it returns the result hash. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example_id" },
})

warn "request failed: #{result["err"] || "HTTP #{result["status"]}"}" unless result["ok"]
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})

if result["ok"]
  puts result["status"]  # 200
  puts result["data"]    # response body
else
  # On an HTTP error status there is no err (only a transport failure sets
  # it), so fall back to the status code.
  warn(result["err"] || "HTTP #{result["status"]}")
end
```

### Prepare a request without sending it

```ruby
begin
  fetchdef = client.prepare({
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => { "id" => "example" },
  })
  puts fetchdef["url"]
  puts fetchdef["method"]
  puts fetchdef["headers"]
rescue => err
  warn "prepare failed: #{err}"
end
```

### Use test mode

Create a mock client for unit testing — no server required:

```ruby
client = GandiSDK.test

# list returns an Array of LivednsDomain entities, one per mock record (raises on
# error); data_get reads each record.
livednsdomains = client.LivednsDomain.list()
livednsdomains.each { |item| puts item.data_get }
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```ruby
mock_fetch = ->(url, init) {
  return {
    "status" => 200,
    "statusText" => "OK",
    "headers" => {},
    "json" => ->() { { "id" => "mock01" } },
  }, nil
}

client = GandiSDK.new({
  "base" => "http://localhost:8080",
  "system" => {
    "fetch" => mock_fetch,
  },
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
cd rb && ruby -Itest -e "Dir['test/*_test.rb'].each { |f| require_relative f }"
```


## Reference

### GandiSDK

```ruby
require_relative "Gandi_sdk"
client = GandiSDK.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `String` | API key for authentication. |
| `base` | `String` | Base URL of the API server. |
| `prefix` | `String` | URL path prefix prepended to all requests. |
| `suffix` | `String` | URL path suffix appended to all requests. |
| `feature` | `Hash` | Feature activation flags. |
| `extend` | `Hash` | Additional Feature instances to load. |
| `system` | `Hash` | System overrides (e.g. custom `fetch` lambda). |

### test

```ruby
client = GandiSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### GandiSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> Hash` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> Hash` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> Hash` | Build and send an HTTP request. Returns a result hash (`result["ok"]`); does not raise. |
| `AccessToken` | `(data) -> AccessTokenEntity` | Create an AccessToken entity instance. |
| `AcmeAccount` | `(data) -> AcmeAccountEntity` | Create an AcmeAccount entity instance. |
| `AcmeDomain` | `(data) -> AcmeDomainEntity` | Create an AcmeDomain entity instance. |
| `AcmePrice` | `(data) -> AcmePriceEntity` | Create an AcmePrice entity instance. |
| `AcmeSubscription` | `(data) -> AcmeSubscriptionEntity` | Create an AcmeSubscription entity instance. |
| `BillingInfo` | `(data) -> BillingInfoEntity` | Create a BillingInfo entity instance. |
| `BillingPrice` | `(data) -> BillingPriceEntity` | Create a BillingPrice entity instance. |
| `CertificateDcv` | `(data) -> CertificateDcvEntity` | Create a CertificateDcv entity instance. |
| `CertificatePackage` | `(data) -> CertificatePackageEntity` | Create a CertificatePackage entity instance. |
| `CertificatePem` | `(data) -> CertificatePemEntity` | Create a CertificatePem entity instance. |
| `CertificateRenewal` | `(data) -> CertificateRenewalEntity` | Create a CertificateRenewal entity instance. |
| `CertificateTag` | `(data) -> CertificateTagEntity` | Create a CertificateTag entity instance. |
| `Comment` | `(data) -> CommentEntity` | Create a Comment entity instance. |
| `Domain` | `(data) -> DomainEntity` | Create a Domain entity instance. |
| `DomainAvailability` | `(data) -> DomainAvailabilityEntity` | Create a DomainAvailability entity instance. |
| `DomainChangeOwner` | `(data) -> DomainChangeOwnerEntity` | Create a DomainChangeOwner entity instance. |
| `DomainClaim` | `(data) -> DomainClaimEntity` | Create a DomainClaim entity instance. |
| `DomainContact` | `(data) -> DomainContactEntity` | Create a DomainContact entity instance. |
| `DomainDnskey` | `(data) -> DomainDnskeyEntity` | Create a DomainDnskey entity instance. |
| `DomainDnssec` | `(data) -> DomainDnssecEntity` | Create a DomainDnssec entity instance. |
| `DomainHost` | `(data) -> DomainHostEntity` | Create a DomainHost entity instance. |
| `DomainLivedns` | `(data) -> DomainLivednsEntity` | Create a DomainLivedns entity instance. |
| `DomainNameserver` | `(data) -> DomainNameserverEntity` | Create a DomainNameserver entity instance. |
| `DomainTag` | `(data) -> DomainTagEntity` | Create a DomainTag entity instance. |
| `DomainTransfer` | `(data) -> DomainTransferEntity` | Create a DomainTransfer entity instance. |
| `DomainWebredir` | `(data) -> DomainWebredirEntity` | Create a DomainWebredir entity instance. |
| `EmailForward` | `(data) -> EmailForwardEntity` | Create an EmailForward entity instance. |
| `EmailMailbox` | `(data) -> EmailMailboxEntity` | Create an EmailMailbox entity instance. |
| `EmailMigration` | `(data) -> EmailMigrationEntity` | Create an EmailMigration entity instance. |
| `EmailOffer` | `(data) -> EmailOfferEntity` | Create an EmailOffer entity instance. |
| `EmailSlot` | `(data) -> EmailSlotEntity` | Create an EmailSlot entity instance. |
| `HostingApplication` | `(data) -> HostingApplicationEntity` | Create a HostingApplication entity instance. |
| `HostingInstance` | `(data) -> HostingInstanceEntity` | Create a HostingInstance entity instance. |
| `HostingVhost` | `(data) -> HostingVhostEntity` | Create a HostingVhost entity instance. |
| `IssuedCertificate` | `(data) -> IssuedCertificateEntity` | Create an IssuedCertificate entity instance. |
| `LinkedZone` | `(data) -> LinkedZoneEntity` | Create a LinkedZone entity instance. |
| `LinkedZoneDeployment` | `(data) -> LinkedZoneDeploymentEntity` | Create a LinkedZoneDeployment entity instance. |
| `LinkedZoneDomain` | `(data) -> LinkedZoneDomainEntity` | Create a LinkedZoneDomain entity instance. |
| `LinkedZoneTask` | `(data) -> LinkedZoneTaskEntity` | Create a LinkedZoneTask entity instance. |
| `LivednsAxfrSlave` | `(data) -> LivednsAxfrSlaveEntity` | Create a LivednsAxfrSlave entity instance. |
| `LivednsAxfrTsig` | `(data) -> LivednsAxfrTsigEntity` | Create a LivednsAxfrTsig entity instance. |
| `LivednsDomain` | `(data) -> LivednsDomainEntity` | Create a LivednsDomain entity instance. |
| `LivednsKey` | `(data) -> LivednsKeyEntity` | Create a LivednsKey entity instance. |
| `LivednsNameserver` | `(data) -> LivednsNameserverEntity` | Create a LivednsNameserver entity instance. |
| `LivednsRecord` | `(data) -> LivednsRecordEntity` | Create a LivednsRecord entity instance. |
| `LivednsRrtype` | `(data) -> LivednsRrtypeEntity` | Create a LivednsRrtype entity instance. |
| `LivednsSnapshot` | `(data) -> LivednsSnapshotEntity` | Create a LivednsSnapshot entity instance. |
| `LivednsTsigKey` | `(data) -> LivednsTsigKeyEntity` | Create a LivednsTsigKey entity instance. |
| `LivednsZone` | `(data) -> LivednsZoneEntity` | Create a LivednsZone entity instance. |
| `Mailbox` | `(data) -> MailboxEntity` | Create a Mailbox entity instance. |
| `MailboxDomain` | `(data) -> MailboxDomainEntity` | Create a MailboxDomain entity instance. |
| `MailboxForward` | `(data) -> MailboxForwardEntity` | Create a MailboxForward entity instance. |
| `MailboxProduct` | `(data) -> MailboxProductEntity` | Create a MailboxProduct entity instance. |
| `MailboxQuota` | `(data) -> MailboxQuotaEntity` | Create a MailboxQuota entity instance. |
| `MailboxSlot` | `(data) -> MailboxSlotEntity` | Create a MailboxSlot entity instance. |
| `Organization` | `(data) -> OrganizationEntity` | Create an Organization entity instance. |
| `OrganizationCustomer` | `(data) -> OrganizationCustomerEntity` | Create an OrganizationCustomer entity instance. |
| `Template` | `(data) -> TemplateEntity` | Create a Template entity instance. |
| `TemplateDispatch` | `(data) -> TemplateDispatchEntity` | Create a TemplateDispatch entity instance. |
| `Tld` | `(data) -> TldEntity` | Create a Tld entity instance. |
| `User` | `(data) -> UserEntity` | Create an User entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria, and return it. Raises on error. |
| `list` | `(reqmatch = nil, ctrl) -> Array` | List entities matching the criteria (call with no argument to list all), one per record. Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity, and return it. Raises on error. |
| `update` | `(reqdata, ctrl) -> any` | Update an existing entity, and return it. Raises on error. |
| `patch` | `(reqdata, ctrl) -> any` | Change part of an existing entity, and return it. Raises on error. |
| `remove` | `(reqmatch, ctrl) -> any` | Remove an entity, and return it marked as deleted. Raises on error. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return the entity, and `list` an `Array` of entities, one
per record; an entity's `data_get` reads its record. On failure they raise a
`GandiError` (a `StandardError` subclass), so wrap calls in
`begin`/`rescue` where you need to handle errors.

The `direct` escape hatch is the exception: it never raises and instead
returns a result `Hash` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `Integer` | HTTP status code. |
| `headers` | `Hash` | Response headers. |
| `data` | `any` | Parsed JSON response body. |
| `err` | `Error` | Present when `ok` is `false`. |

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

Create an instance: `access_token = client.AccessToken`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `access_token` | `String` |  |
| `entities` | `Array` |  |
| `expires_at` | `String` |  |
| `id` | `String` |  |
| `name` | `String` |  |
| `scopes` | `Array` |  |

#### Example: Create

```ruby
access_token = client.AccessToken.create({
})
```


### AcmeAccount

Create an instance: `acme_account = client.AcmeAccount`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `String` |  |
| `deleted_at` | `String` |  |
| `external_id` | `String` |  |
| `id` | `String` |  |
| `ip` | `String` |  |
| `last_activity` | `String` |  |
| `status` | `String` |  |
| `subscription_id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the AcmeAccount record (raises on error).
acme_account = client.AcmeAccount.load({ "id" => "acme_account_id", "subscription_id" => "subscription_id", "sharing_id" => "sharing_id" })
```

#### Example: List

```ruby
# list returns an Array of AcmeAccount entities, one per record (raises on error).
acme_accounts = client.AcmeAccount.list({ "subscription_id" => "example", "sharing_id" => "example" })
acme_accounts.each { |item| puts item.data_get }
```


### AcmeDomain

Create an instance: `acme_domain = client.AcmeDomain`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `String` |  |
| `deleted_at` | `String` |  |
| `hostname` | `String` |  |
| `hostname_ulabel` | `String` |  |
| `is_wildcard` | `Boolean` |  |
| `status` | `String` |  |
| `subscription_id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the AcmeDomain record (raises on error).
acme_domain = client.AcmeDomain.load({ "domain_id" => 1, "subscription_id" => "subscription_id", "sharing_id" => "sharing_id" })
```

#### Example: List

```ruby
# list returns an Array of AcmeDomain entities, one per record (raises on error).
acme_domains = client.AcmeDomain.list({ "subscription_id" => "example", "domain" => "example", "sharing_id" => "example" })
acme_domains.each { |item| puts item.data_get }
```


### AcmePrice

Create an instance: `acme_price = client.AcmePrice`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `country` | `String` |  |
| `currency` | `String` |  |
| `domains` | `Array` |  |
| `duration` | `String` |  |
| `duration_unit` | `String` |  |
| `grid` | `String` |  |
| `max_duration` | `Integer` |  |
| `min_duration` | `Integer` |  |
| `price_after_taxes` | `String` |  |
| `price_before_taxes` | `String` |  |
| `process` | `String` |  |
| `product` | `Hash` |  |
| `provider` | `String` |  |
| `tax_rate` | `String` |  |
| `taxes` | `Array` |  |
| `validation_type` | `String` |  |

#### Example: List

```ruby
# list returns an Array of AcmePrice entities, one per record (raises on error).
acme_prices = client.AcmePrice.list({ "country" => "example", "currency" => "example", "duration" => "example", "grid" => "example", "process" => "example", "provider" => "example", "sharing_id" => "example", "validation_type" => "example" })
acme_prices.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
acme_price = client.AcmePrice.create({
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


### AcmeSubscription

Create an instance: `acme_subscription = client.AcmeSubscription`

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
| `country` | `String` |  |
| `created_at` | `String` |  |
| `currency` | `String` |  |
| `domains` | `Array` |  |
| `duration` | `Integer` |  |
| `eab_hmac` | `String` |  |
| `eab_id` | `String` |  |
| `ends_at` | `String` |  |
| `grid` | `String` |  |
| `message` | `String` |  |
| `name` | `String` |  |
| `provider` | `String` |  |
| `server_url` | `String` |  |
| `status` | `String` |  |
| `subscription_id` | `String` |  |
| `validation_type` | `String` |  |
| `years` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the AcmeSubscription record (raises on error).
acme_subscription = client.AcmeSubscription.load({ "subscription_id" => "subscription_id", "sharing_id" => "sharing_id" })
```

#### Example: List

```ruby
# list returns an Array of AcmeSubscription entities, one per record (raises on error).
acme_subscriptions = client.AcmeSubscription.list({ "created_at" => "example", "ends_at" => "example", "name" => "example", "provider" => "example", "sharing_id" => "example", "status" => "example", "validation_type" => "example", "year" => "example" })
acme_subscriptions.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
acme_subscription = client.AcmeSubscription.create({
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


### BillingInfo

Create an instance: `billing_info = client.BillingInfo`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `annual_balance` | `Float` |  |
| `grid` | `String` |  |
| `outstanding_amount` | `Float` |  |
| `prepaid` | `Hash` |  |
| `prepaid_monthly_invoice` | `Boolean` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the BillingInfo record (raises on error).
billing_info = client.BillingInfo.load({ "sharing_id" => "sharing_id" })
```


### BillingPrice

Create an instance: `billing_price = client.BillingPrice`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `currency` | `String` |  |
| `grid` | `String` |  |
| `products` | `Array` |  |
| `taxes` | `Array` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the BillingPrice record (raises on error).
billing_price = client.BillingPrice.load({ "type" => "type", "name" => [], "process" => [] })
```


### CertificateDcv

Create an instance: `certificate_dcv = client.CertificateDcv`

#### Operations

| Method | Description |
| --- | --- |
| `patch(data)` | Change part of an existing entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `message` | `String` |  |
| `method` | `String` |  |


### CertificatePackage

Create an instance: `certificate_package = client.CertificatePackage`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `category` | `Hash` |  |
| `href` | `String` |  |
| `max_domains` | `Integer` |  |
| `min_domains` | `Integer` |  |
| `name` | `String` |  |
| `provider` | `String` |  |
| `sgc` | `Boolean` |  |
| `trustlogo` | `Boolean` |  |
| `warranty` | `Integer` |  |
| `wildcard` | `Boolean` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the CertificatePackage record (raises on error).
certificate_package = client.CertificatePackage.load({ "name" => "name" })
```

#### Example: List

```ruby
# list returns an Array of CertificatePackage entities, one per record (raises on error).
certificate_packages = client.CertificatePackage.list
certificate_packages.each { |item| puts item.data_get }
```


### CertificatePem

Create an instance: `certificate_pem = client.CertificatePem`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the CertificatePem record (raises on error).
certificate_pem = client.CertificatePem.load({ "type" => "type" })
```


### CertificateRenewal

Create an instance: `certificate_renewal = client.CertificateRenewal`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `csr` | `String` |  |
| `dcv_method` | `String` |  |
| `duration` | `Integer` |  |
| `errors` | `Array` |  |
| `status` | `String` |  |

#### Example: Create

```ruby
certificate_renewal = client.CertificateRenewal.create({
  "certificate_id" => "example_certificate_id", # String
})
```


### CertificateTag

Create an instance: `certificate_tag = client.CertificateTag`

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
| `add` | `Array` |  |
| `message` | `String` |  |
| `remove` | `Array` |  |
| `tag` | `String` |  |
| `tags` | `Array` |  |

#### Example: List

```ruby
# list returns an Array of CertificateTag entities, one per record (raises on error).
certificate_tags = client.CertificateTag.list({ "certificate_id" => "example" })
certificate_tags.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
certificate_tag = client.CertificateTag.create({
  "certificate_id" => "example_certificate_id", # String
  "tag" => "example_tag", # String
})
```


### Comment

Create an instance: `comment = client.Comment`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `content` | `String` |  |
| `created_at` | `String` |  |
| `errors` | `Array` |  |
| `id` | `String` |  |
| `status` | `String` |  |
| `updated_at` | `String` |  |
| `user` | `Hash` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Comment record (raises on error).
comment = client.Comment.load({ "entity_id" => "entity_id" })
```

#### Example: Create

```ruby
comment = client.Comment.create({
  "entity_id" => "example_entity_id", # String
  "content" => "example_content", # String
})
```


### Domain

Create an instance: `domain = client.Domain`

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
| `admin` | `Hash` |  |
| `authinfo` | `String` |  |
| `autorenew` | `Hash` |  |
| `bill` | `Hash` |  |
| `can_tld_lock` | `Boolean` |  |
| `claims` | `String` |  |
| `contacts` | `Hash` |  |
| `currency` | `String` |  |
| `dates` | `Hash` |  |
| `domain_owner` | `String` |  |
| `duration` | `Integer` |  |
| `enforce_premium` | `Boolean` |  |
| `errors` | `Array` |  |
| `extra_parameters` | `Hash` |  |
| `fqdn` | `String` |  |
| `fqdn_unicode` | `String` |  |
| `href` | `String` |  |
| `id` | `String` |  |
| `lang` | `String` |  |
| `mailbox_optin` | `Boolean` |  |
| `nameserver` | `Hash` |  |
| `nameservers` | `Array` |  |
| `nameservers_ips` | `Hash` |  |
| `orga_owner` | `String` |  |
| `owner` | `Hash` |  |
| `price` | `Float` |  |
| `reachability` | `String` |  |
| `resellee_id` | `String` |  |
| `services` | `Array` |  |
| `sharing_id` | `String` |  |
| `sharing_space` | `Hash` |  |
| `smd` | `String` |  |
| `status` | `Array` |  |
| `tags` | `Array` |  |
| `tech` | `Hash` |  |
| `template_id` | `String` |  |
| `tld` | `String` |  |
| `tld_period` | `String` |  |
| `trustee_roles` | `Array` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Domain record (raises on error).
domain = client.Domain.load({ "fqdn" => "fqdn" })
```

#### Example: List

```ruby
# list returns an Array of Domain entities, one per record (raises on error).
domains = client.Domain.list
domains.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
domain = client.Domain.create({
  "admin" => {}, # Hash
  "bill" => {}, # Hash
  "fqdn" => "example_fqdn", # String
  "owner" => {}, # Hash
  "tech" => {}, # Hash
})
```


### DomainAvailability

Create an instance: `domain_availability = client.DomainAvailability`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `currency` | `String` |  |
| `grid` | `String` |  |
| `products` | `Array` |  |
| `taxes` | `Array` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the DomainAvailability record (raises on error).
domain_availability = client.DomainAvailability.load({ "name" => "name" })
```


### DomainChangeOwner

Create an instance: `domain_change_owner = client.DomainChangeOwner`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `admin` | `Hash` |  |
| `bill` | `Hash` |  |
| `created_at` | `String` |  |
| `date_start` | `String` |  |
| `errors` | `Array` |  |
| `errortype` | `String` |  |
| `errortype_label` | `String` |  |
| `foa` | `Array` |  |
| `inner_step` | `String` |  |
| `owner` | `Hash` |  |
| `params` | `Hash` |  |
| `status` | `String` |  |
| `step` | `String` |  |
| `step_nb` | `Integer` |  |
| `tech` | `Hash` |  |
| `updated_at` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the DomainChangeOwner record (raises on error).
domain_change_owner = client.DomainChangeOwner.load({ "domain" => "domain" })
```

#### Example: Create

```ruby
domain_change_owner = client.DomainChangeOwner.create({
  "domain" => "example_domain", # String
  "admin" => {}, # Hash
  "bill" => {}, # Hash
  "owner" => {}, # Hash
  "tech" => {}, # Hash
})
```


### DomainClaim

Create an instance: `domain_claim = client.DomainClaim`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `claims` | `Array` |  |
| `created_at` | `String` |  |
| `expires_at` | `String` |  |
| `fqdn` | `String` |  |
| `fqdn_alabel` | `String` |  |
| `fqdn_ulabel` | `String` |  |
| `notice_id` | `String` |  |
| `status` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the DomainClaim record (raises on error).
domain_claim = client.DomainClaim.load({ "domain" => "domain" })
```

#### Example: Create

```ruby
domain_claim = client.DomainClaim.create({
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


### DomainContact

Create an instance: `domain_contact = client.DomainContact`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `admin` | `Hash` |  |
| `bill` | `Hash` |  |
| `message` | `String` |  |
| `owner` | `Hash` |  |
| `tech` | `Hash` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the DomainContact record (raises on error).
domain_contact = client.DomainContact.load({ "domain" => "domain" })
```


### DomainDnskey

Create an instance: `domain_dnskey = client.DomainDnskey`

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
| `algorithm` | `Integer` |  |
| `digest` | `String` |  |
| `digest_type` | `Integer` |  |
| `href` | `String` |  |
| `id` | `Integer` |  |
| `keys` | `Array` |  |
| `keytag` | `Integer` |  |
| `message` | `String` |  |
| `public_key` | `String` |  |
| `type` | `String` |  |

#### Example: List

```ruby
# list returns an Array of DomainDnskey entities, one per record (raises on error).
domain_dnskeys = client.DomainDnskey.list({ "domain" => "example" })
domain_dnskeys.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
domain_dnskey = client.DomainDnskey.create({
  "domain" => "example_domain", # String
  "algorithm" => 1, # Integer
  "public_key" => "example_public_key", # String
  "type" => "example_type", # String
})
```


### DomainDnssec

Create an instance: `domain_dnssec = client.DomainDnssec`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `error` | `String` |  |
| `state` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the DomainDnssec record (raises on error).
domain_dnssec = client.DomainDnssec.load({ "domain" => "domain" })
```

#### Example: Create

```ruby
domain_dnssec = client.DomainDnssec.create({
  "domain" => "example_domain", # String
  "state" => "example_state", # String
})
```


### DomainHost

Create an instance: `domain_host = client.DomainHost`

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
| `fqdn` | `String` |  |
| `fqdn_unicode` | `String` |  |
| `href` | `String` |  |
| `ips` | `Array` |  |
| `message` | `String` |  |
| `name` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the DomainHost record (raises on error).
domain_host = client.DomainHost.load({ "domain" => "domain", "name" => "name" })
```

#### Example: List

```ruby
# list returns an Array of DomainHost entities, one per record (raises on error).
domain_hosts = client.DomainHost.list({ "domain" => "example" })
domain_hosts.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
domain_host = client.DomainHost.create({
  "domain" => "example_domain", # String
  "ips" => [], # Array
  "name" => "example_name", # String
})
```


### DomainLivedns

Create an instance: `domain_livedns = client.DomainLivedns`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `current` | `String` |  |
| `dnssec_available` | `Boolean` |  |
| `livednssec_available` | `Boolean` |  |
| `message` | `String` |  |
| `nameservers` | `Array` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the DomainLivedns record (raises on error).
domain_livedns = client.DomainLivedns.load({ "domain" => "domain" })
```

#### Example: Create

```ruby
domain_livedns = client.DomainLivedns.create({
  "domain" => "example_domain", # String
  "current" => "example_current", # String
  "message" => "example_message", # String
  "nameservers" => [], # Array
})
```


### DomainNameserver

Create an instance: `domain_nameserver = client.DomainNameserver`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `message` | `String` |  |
| `nameservers` | `Array` |  |

#### Example: List

```ruby
# list returns an Array of DomainNameserver entities, one per record (raises on error).
domain_nameservers = client.DomainNameserver.list({ "domain" => "example" })
domain_nameservers.each { |item| puts item.data_get }
```


### DomainTag

Create an instance: `domain_tag = client.DomainTag`

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
| `add` | `Array` |  |
| `message` | `String` |  |
| `remove` | `Array` |  |
| `tag` | `String` |  |
| `tags` | `Array` |  |

#### Example: List

```ruby
# list returns an Array of DomainTag entities, one per record (raises on error).
domain_tags = client.DomainTag.list({ "domain" => "example" })
domain_tags.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
domain_tag = client.DomainTag.create({
  "domain" => "example_domain", # String
  "tag" => "example_tag", # String
})
```


### DomainTransfer

Create an instance: `domain_transfer = client.DomainTransfer`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `admin` | `Hash` |  |
| `authinfo` | `String` |  |
| `bill` | `Hash` |  |
| `change_owner` | `Boolean` |  |
| `created_at` | `String` |  |
| `currency` | `String` |  |
| `duration` | `Integer` |  |
| `enforce_premium` | `Boolean` |  |
| `errors` | `Array` |  |
| `errortype` | `String` |  |
| `errortype_label` | `String` |  |
| `extra_parameters` | `Hash` |  |
| `foa` | `Array` |  |
| `fqdn` | `String` |  |
| `inner_step` | `String` |  |
| `mailbox_optin` | `Boolean` |  |
| `message` | `String` |  |
| `nameservers` | `Array` |  |
| `nameservers_ips` | `Hash` |  |
| `owner` | `Hash` |  |
| `owner_contact` | `String` |  |
| `params` | `Hash` |  |
| `price` | `Float` |  |
| `regac_at` | `String` |  |
| `resellee_id` | `String` |  |
| `start_at` | `String` |  |
| `status` | `String` |  |
| `step` | `String` |  |
| `step_nb` | `Integer` |  |
| `tech` | `Hash` |  |
| `template_id` | `String` |  |
| `transfer_link` | `String` |  |
| `transfer_procedure` | `String` |  |
| `updated_at` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the DomainTransfer record (raises on error).
domain_transfer = client.DomainTransfer.load({ "domain" => "domain" })
```

#### Example: Create

```ruby
domain_transfer = client.DomainTransfer.create({
  "admin" => {}, # Hash
  "bill" => {}, # Hash
  "fqdn" => "example_fqdn", # String
  "owner" => {}, # Hash
  "tech" => {}, # Hash
})
```


### DomainWebredir

Create an instance: `domain_webredir = client.DomainWebredir`

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
| `cert_status` | `String` |  |
| `cert_uuid` | `String` |  |
| `created_at` | `String` |  |
| `host` | `String` |  |
| `message` | `String` |  |
| `override` | `Boolean` |  |
| `protocol` | `String` |  |
| `type` | `String` |  |
| `updated_at` | `String` |  |
| `url` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the DomainWebredir record (raises on error).
domain_webredir = client.DomainWebredir.load({ "domain" => "domain", "host" => "host" })
```

#### Example: List

```ruby
# list returns an Array of DomainWebredir entities, one per record (raises on error).
domain_webredirs = client.DomainWebredir.list({ "domain" => "example" })
domain_webredirs.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
domain_webredir = client.DomainWebredir.create({
  "domain" => "example_domain", # String
  "host" => "example_host", # String
  "override" => true, # Boolean
  "protocol" => "example_protocol", # String
  "type" => "example_type", # String
  "url" => "example_url", # String
})
```


### EmailForward

Create an instance: `email_forward = client.EmailForward`

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
| `destinations` | `Array` |  |
| `href` | `String` |  |
| `id` | `String` |  |
| `message` | `String` |  |
| `source` | `String` |  |

#### Example: List

```ruby
# list returns an Array of EmailForward entities, one per record (raises on error).
email_forwards = client.EmailForward.list({ "domain" => "example" })
email_forwards.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
email_forward = client.EmailForward.create({
  "domain" => "example_domain", # String
  "destinations" => [], # Array
  "source" => "example_source", # String
})
```


### EmailMailbox

Create an instance: `email_mailbox = client.EmailMailbox`

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
| `address` | `String` |  |
| `alias_count` | `Integer` |  |
| `aliases` | `Array` |  |
| `antispam` | `Boolean` |  |
| `autorenew` | `Hash` |  |
| `domain` | `String` |  |
| `errors` | `Array` |  |
| `expires_at` | `String` |  |
| `fallback_email` | `String` |  |
| `href` | `String` |  |
| `id` | `String` |  |
| `login` | `String` |  |
| `mailbox_type` | `String` |  |
| `message` | `String` |  |
| `password` | `String` |  |
| `quota_used` | `Integer` |  |
| `responder` | `Hash` |  |
| `status` | `String` |  |
| `to_convert` | `Boolean` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the EmailMailbox record (raises on error).
email_mailbox = client.EmailMailbox.load({ "id" => "email_mailbox_id", "domain" => "domain" })
```

#### Example: List

```ruby
# list returns an Array of EmailMailbox entities, one per record (raises on error).
email_mailboxs = client.EmailMailbox.list({ "domain" => "example" })
email_mailboxs.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
email_mailbox = client.EmailMailbox.create({
  "domain" => "example_domain", # String
  "login" => "example_login", # String
  "mailbox_type" => "example_mailbox_type", # String
  "password" => "example_password", # String
})
```


### EmailMigration

Create an instance: `email_migration = client.EmailMigration`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `available` | `Boolean` |  |
| `currency` | `String` |  |
| `forward_count` | `Integer` |  |
| `free_mailboxes` | `Integer` |  |
| `included_mailboxes` | `Integer` |  |
| `info` | `Array` |  |
| `message` | `String` |  |
| `packmail` | `Boolean` |  |
| `price_v1` | `Float` |  |
| `price_v2` | `Float` |  |
| `quota_v1` | `Float` |  |
| `token` | `String` |  |
| `usage_v1` | `Float` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the EmailMigration record (raises on error).
email_migration = client.EmailMigration.load({ "domain" => "domain" })
```

#### Example: Create

```ruby
email_migration = client.EmailMigration.create({
  "domain" => "example_domain", # String
  "token" => "example_token", # String
})
```


### EmailOffer

Create an instance: `email_offer = client.EmailOffer`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `antispam` | `String` |  |
| `dkim` | `String` |  |
| `message` | `String` |  |
| `status` | `String` |  |
| `version` | `Integer` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the EmailOffer record (raises on error).
email_offer = client.EmailOffer.load({ "domain" => "domain" })
```


### EmailSlot

Create an instance: `email_slot = client.EmailSlot`

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
| `autorenew` | `Boolean` |  |
| `capacity` | `Integer` |  |
| `created_at` | `String` |  |
| `duration` | `Integer` |  |
| `gandi_id` | `Integer` |  |
| `href` | `String` |  |
| `id` | `String` |  |
| `mailbox_type` | `String` |  |
| `refund_amount` | `Float` |  |
| `refund_currency` | `String` |  |
| `refundable` | `Boolean` |  |
| `status` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the EmailSlot record (raises on error).
email_slot = client.EmailSlot.load({ "id" => 1, "domain" => "domain" })
```

#### Example: List

```ruby
# list returns an Array of EmailSlot entities, one per record (raises on error).
email_slots = client.EmailSlot.list({ "domain" => "example" })
email_slots.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
email_slot = client.EmailSlot.create({
  "domain" => "example_domain", # String
  "duration" => 1, # Integer
  "mailbox_type" => "example_mailbox_type", # String
})
```


### HostingApplication

Create an instance: `hosting_application = client.HostingApplication`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `name` | `String` |  |
| `name_label` | `String` |  |
| `requirements` | `Array` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the HostingApplication record (raises on error).
hosting_application = client.HostingApplication.load({ "name" => "name" })
```

#### Example: List

```ruby
# list returns an Array of HostingApplication entities, one per record (raises on error).
hosting_applications = client.HostingApplication.list
hosting_applications.each { |item| puts item.data_get }
```


### HostingInstance

Create an instance: `hosting_instance = client.HostingInstance`

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
| `access_information` | `Hash` |  |
| `authentication` | `Hash` |  |
| `autorenew` | `Hash` |  |
| `available_upgrade` | `Boolean` |  |
| `booster` | `Hash` |  |
| `booster_options` | `Hash` |  |
| `compatible_applications` | `Array` |  |
| `console` | `Hash` |  |
| `cpu` | `Integer` |  |
| `created_at` | `String` |  |
| `database` | `Hash` |  |
| `datacenter` | `Hash` |  |
| `domain` | `String` |  |
| `duration` | `Integer` |  |
| `duration_unit` | `String` |  |
| `errors` | `Array` |  |
| `expire_at` | `String` |  |
| `id` | `String` |  |
| `language` | `Hash` |  |
| `language_id` | `String` |  |
| `location` | `String` |  |
| `message` | `String` |  |
| `name` | `String` |  |
| `password` | `String` |  |
| `password_updated_at` | `String` |  |
| `ram` | `Hash` |  |
| `sharing_space` | `Hash` |  |
| `size` | `String` |  |
| `snapshot_enabled` | `Boolean` |  |
| `status` | `String` |  |
| `storage` | `Hash` |  |
| `storage_additional_size` | `Integer` |  |
| `subscription_cancelled` | `Boolean` |  |
| `type` | `Hash` |  |
| `upgrade_to` | `Array` |  |
| `vhosts` | `Array` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the HostingInstance record (raises on error).
hosting_instance = client.HostingInstance.load({ "id" => "hosting_instance_id" })
```

#### Example: List

```ruby
# list returns an Array of HostingInstance entities, one per record (raises on error).
hosting_instances = client.HostingInstance.list
hosting_instances.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
hosting_instance = client.HostingInstance.create({
  "authentication" => {}, # Hash
  "domain" => "example_domain", # String
  "location" => "example_location", # String
  "size" => "example_size", # String
  "type" => {}, # Hash
})
```


### HostingVhost

Create an instance: `hosting_vhost = client.HostingVhost`

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
| `application` | `Hash` |  |
| `created_at` | `String` |  |
| `deployment` | `Hash` |  |
| `fqdn` | `String` |  |
| `https_strategy` | `String` |  |
| `is_a_test_vhost` | `Boolean` |  |
| `linked_dns_zone` | `Hash` |  |
| `status` | `String` |  |
| `tls_validated_at` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the HostingVhost record (raises on error).
hosting_vhost = client.HostingVhost.load({ "fqdn" => "fqdn", "instance_id" => "instance_id" })
```

#### Example: List

```ruby
# list returns an Array of HostingVhost entities, one per record (raises on error).
hosting_vhosts = client.HostingVhost.list({ "instance_id" => "example" })
hosting_vhosts.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
hosting_vhost = client.HostingVhost.create({
  "instance_id" => "example_instance_id", # String
  "application" => {}, # Hash
  "fqdn" => "example_fqdn", # String
  "linked_dns_zone" => {}, # Hash
})
```


### IssuedCertificate

Create an instance: `issued_certificate = client.IssuedCertificate`

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
| `altnames` | `Array` |  |
| `altnames_unicode` | `Array` |  |
| `apex_only` | `Boolean` |  |
| `assumed_name` | `String` |  |
| `business_category` | `String` |  |
| `card_pay_trustlogo` | `Boolean` |  |
| `cert` | `String` |  |
| `cn` | `String` |  |
| `cn_unicode` | `String` |  |
| `contact` | `Hash` |  |
| `csr` | `String` |  |
| `dates` | `Hash` |  |
| `dcv_method` | `String` |  |
| `duration` | `Integer` |  |
| `error_msg` | `String` |  |
| `errors` | `Array` |  |
| `href` | `String` |  |
| `id` | `String` |  |
| `ida` | `Hash` |  |
| `intermediate` | `String` |  |
| `joi` | `Hash` |  |
| `middleman` | `Hash` |  |
| `owner` | `String` |  |
| `package` | `Hash` |  |
| `provider` | `String` |  |
| `reissuable` | `Boolean` |  |
| `renewable` | `Boolean` |  |
| `resellee_id` | `String` |  |
| `sha_version` | `Integer` |  |
| `sharing_id` | `String` |  |
| `software` | `Integer` |  |
| `state` | `String` |  |
| `state_detail` | `String` |  |
| `status` | `String` |  |
| `step_nb` | `Integer` |  |
| `stored` | `Boolean` |  |
| `tags` | `Array` |  |
| `trustlogo` | `Boolean` |  |
| `trustlogo_token` | `Hash` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the IssuedCertificate record (raises on error).
issued_certificate = client.IssuedCertificate.load({ "id" => "issued_certificate_id" })
```

#### Example: List

```ruby
# list returns an Array of IssuedCertificate entities, one per record (raises on error).
issued_certificates = client.IssuedCertificate.list
issued_certificates.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
issued_certificate = client.IssuedCertificate.create({
  "package" => {}, # Hash
})
```


### LinkedZone

Create an instance: `linked_zone = client.LinkedZone`

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
| `created_at` | `String` |  |
| `default_records` | `Boolean` |  |
| `domain_count` | `Integer` |  |
| `domains` | `Array` |  |
| `id` | `String` |  |
| `message` | `String` |  |
| `name` | `String` |  |
| `record_list` | `Array` |  |
| `record_text` | `String` |  |
| `records` | `Array` |  |
| `sharing_space` | `Hash` |  |
| `status` | `String` |  |
| `updated_at` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the LinkedZone record (raises on error).
linked_zone = client.LinkedZone.load({ "id" => "linked_zone_id" })
```

#### Example: List

```ruby
# list returns an Array of LinkedZone entities, one per record (raises on error).
linked_zones = client.LinkedZone.list
linked_zones.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
linked_zone = client.LinkedZone.create({
  "name" => "example_name", # String
})
```


### LinkedZoneDeployment

Create an instance: `linked_zone_deployment = client.LinkedZoneDeployment`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deploy` | `Boolean` |  |
| `message` | `String` |  |

#### Example: Create

```ruby
linked_zone_deployment = client.LinkedZoneDeployment.create({
  "zone_id" => "example_zone_id", # String
  "deploy" => true, # Boolean
})
```


### LinkedZoneDomain

Create an instance: `linked_zone_domain = client.LinkedZoneDomain`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deployed` | `Boolean` |  |
| `id` | `String` |  |
| `name` | `String` |  |
| `owner` | `String` |  |
| `zone` | `Hash` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the LinkedZoneDomain record (raises on error).
linked_zone_domain = client.LinkedZoneDomain.load({ "name" => "name" })
```

#### Example: List

```ruby
# list returns an Array of LinkedZoneDomain entities, one per record (raises on error).
linked_zone_domains = client.LinkedZoneDomain.list
linked_zone_domains.each { |item| puts item.data_get }
```


### LinkedZoneTask

Create an instance: `linked_zone_task = client.LinkedZoneTask`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `String` |  |
| `ending_at` | `String` |  |
| `id` | `String` |  |
| `result` | `Hash` |  |
| `status` | `String` |  |
| `type` | `String` |  |
| `updated_at` | `String` |  |
| `zone_id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the LinkedZoneTask record (raises on error).
linked_zone_task = client.LinkedZoneTask.load({ "id" => "linked_zone_task_id" })
```

#### Example: List

```ruby
# list returns an Array of LinkedZoneTask entities, one per record (raises on error).
linked_zone_tasks = client.LinkedZoneTask.list
linked_zone_tasks.each { |item| puts item.data_get }
```


### LivednsAxfrSlave

Create an instance: `livedns_axfr_slave = client.LivednsAxfrSlave`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `message` | `String` |  |

#### Example: List

```ruby
# list returns an Array of LivednsAxfrSlave entities, one per record (raises on error).
livedns_axfr_slaves = client.LivednsAxfrSlave.list({ "fqdn" => "example" })
livedns_axfr_slaves.each { |item| puts item.data_get }
```


### LivednsAxfrTsig

Create an instance: `livedns_axfr_tsig = client.LivednsAxfrTsig`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `href` | `String` |  |
| `id` | `String` |  |
| `key_name` | `String` |  |
| `message` | `String` |  |

#### Example: List

```ruby
# list returns an Array of LivednsAxfrTsig entities, one per record (raises on error).
livedns_axfr_tsigs = client.LivednsAxfrTsig.list({ "fqdn" => "example" })
livedns_axfr_tsigs.each { |item| puts item.data_get }
```


### LivednsDomain

Create an instance: `livedns_domain = client.LivednsDomain`

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
| `automatic_snapshots` | `Boolean` |  |
| `domain_href` | `String` |  |
| `domain_keys_href` | `String` |  |
| `domain_records_href` | `String` |  |
| `fqdn` | `String` |  |
| `message` | `String` |  |
| `zone` | `Hash` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the LivednsDomain record (raises on error).
livedns_domain = client.LivednsDomain.load({ "fqdn" => "fqdn" })
```

#### Example: List

```ruby
# list returns an Array of LivednsDomain entities, one per record (raises on error).
livedns_domains = client.LivednsDomain.list
livedns_domains.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
livedns_domain = client.LivednsDomain.create({
  "fqdn" => "example_fqdn", # String
})
```


### LivednsKey

Create an instance: `livedns_key = client.LivednsKey`

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
| `algorithm` | `Integer` |  |
| `algorithm_name` | `String` |  |
| `deleted` | `Boolean` |  |
| `ds` | `String` |  |
| `fingerprint` | `String` |  |
| `flags` | `Integer` |  |
| `fqdn` | `String` |  |
| `id` | `String` |  |
| `key_href` | `String` |  |
| `message` | `String` |  |
| `public_key` | `String` |  |
| `status` | `String` |  |
| `tag` | `Integer` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the LivednsKey record (raises on error).
livedns_key = client.LivednsKey.load({ "id" => "livedns_key_id", "fqdn" => "fqdn" })
```

#### Example: List

```ruby
# list returns an Array of LivednsKey entities, one per record (raises on error).
livedns_keys = client.LivednsKey.list({ "fqdn" => "example" })
livedns_keys.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
livedns_key = client.LivednsKey.create({
  "fqdn" => "example_fqdn", # String
  "flags" => 1, # Integer
})
```


### LivednsNameserver

Create an instance: `livedns_nameserver = client.LivednsNameserver`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Example: List

```ruby
# list returns an Array of LivednsNameserver entities, one per record (raises on error).
livedns_nameservers = client.LivednsNameserver.list({ "fqdn" => "example" })
livedns_nameservers.each { |item| puts item.data_get }
```


### LivednsRecord

Create an instance: `livedns_record = client.LivednsRecord`

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
| `add_rrset_values` | `Array` |  |
| `id` | `String` |  |
| `message` | `String` |  |
| `remove_rrset_values` | `Array` |  |
| `rrset_href` | `String` |  |
| `rrset_name` | `String` |  |
| `rrset_ttl` | `Integer` |  |
| `rrset_type` | `String` |  |
| `rrset_values` | `Array` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the LivednsRecord record (raises on error).
livedns_record = client.LivednsRecord.load({ "fqdn" => "fqdn", "rrset_name" => "rrset_name", "rrset_type" => "rrset_type" })
```

#### Example: List

```ruby
# list returns an Array of LivednsRecord entities, one per record (raises on error).
livedns_records = client.LivednsRecord.list({ "fqdn" => "example" })
livedns_records.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
livedns_record = client.LivednsRecord.create({
  "fqdn" => "example_fqdn", # String
  "rrset_values" => [], # Array
})
```


### LivednsRrtype

Create an instance: `livedns_rrtype = client.LivednsRrtype`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Example: List

```ruby
# list returns an Array of LivednsRrtype entities, one per record (raises on error).
livedns_rrtypes = client.LivednsRrtype.list
livedns_rrtypes.each { |item| puts item.data_get }
```


### LivednsSnapshot

Create an instance: `livedns_snapshot = client.LivednsSnapshot`

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
| `automatic` | `Boolean` |  |
| `created_at` | `String` |  |
| `href` | `String` |  |
| `id` | `String` |  |
| `message` | `String` |  |
| `name` | `String` |  |
| `zone_data` | `Array` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the LivednsSnapshot record (raises on error).
livedns_snapshot = client.LivednsSnapshot.load({ "id" => "livedns_snapshot_id", "fqdn" => "fqdn" })
```

#### Example: List

```ruby
# list returns an Array of LivednsSnapshot entities, one per record (raises on error).
livedns_snapshots = client.LivednsSnapshot.list({ "fqdn" => "example" })
livedns_snapshots.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
livedns_snapshot = client.LivednsSnapshot.create({
  "fqdn" => "example_fqdn", # String
})
```


### LivednsTsigKey

Create an instance: `livedns_tsig_key = client.LivednsTsigKey`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `config_samples` | `Hash` |  |
| `href` | `String` |  |
| `id` | `String` |  |
| `key_name` | `String` |  |
| `secret` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the LivednsTsigKey record (raises on error).
livedns_tsig_key = client.LivednsTsigKey.load({ "id" => "livedns_tsig_key_id" })
```

#### Example: List

```ruby
# list returns an Array of LivednsTsigKey entities, one per record (raises on error).
livedns_tsig_keys = client.LivednsTsigKey.list
livedns_tsig_keys.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
livedns_tsig_key = client.LivednsTsigKey.create({
  "config_samples" => {}, # Hash
  "href" => "example_href", # String
  "id" => "example_id", # String
  "key_name" => "example_key_name", # String
  "secret" => "example_secret", # String
})
```


### LivednsZone

Create an instance: `livedns_zone = client.LivednsZone`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `items` | `Array` |  |
| `message` | `String` |  |
| `remove_apex_ns` | `Boolean` |  |


### Mailbox

Create an instance: `mailbox = client.Mailbox`

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
| `address` | `String` |  |
| `aliases` | `Array` |  |
| `antispam` | `Boolean` |  |
| `autorenew` | `Hash` |  |
| `config` | `Hash` |  |
| `config_name` | `String` |  |
| `created_at` | `String` |  |
| `data_access` | `Boolean` |  |
| `domain_part` | `String` |  |
| `duration_month` | `Integer` |  |
| `email` | `String` |  |
| `expires_at` | `String` |  |
| `internal_domain` | `Boolean` |  |
| `issues` | `Array` |  |
| `last_paid_duration` | `Integer` |  |
| `local_part` | `String` |  |
| `message` | `String` |  |
| `owner` | `Hash` |  |
| `password` | `String` |  |
| `quota` | `Integer` |  |
| `quota_used` | `Integer` |  |
| `responder` | `Hash` |  |
| `updated_at` | `String` |  |
| `uuid` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Mailbox record (raises on error).
mailbox = client.Mailbox.load({ "address" => "address" })
```

#### Example: List

```ruby
# list returns an Array of Mailbox entities, one per record (raises on error).
mailboxs = client.Mailbox.list
mailboxs.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
mailbox = client.Mailbox.create({
  "config_name" => "example_config_name", # String
  "email" => "example_email", # String
  "password" => "example_password", # String
})
```


### MailboxDomain

Create an instance: `mailbox_domain = client.MailboxDomain`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `antispam` | `Boolean` |  |
| `configuration` | `Array` |  |
| `date_last_validation` | `String` |  |
| `dkim` | `Boolean` |  |
| `fqdns` | `Array` |  |
| `internal` | `Boolean` |  |
| `is_livedns` | `Boolean` |  |
| `mx` | `Boolean` |  |
| `owner` | `Hash` |  |
| `spf` | `Boolean` |  |
| `txt` | `Boolean` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the MailboxDomain record (raises on error).
mailbox_domain = client.MailboxDomain.load({ "domain" => "domain" })
```

#### Example: List

```ruby
# list returns an Array of MailboxDomain entities, one per record (raises on error).
mailbox_domains = client.MailboxDomain.list
mailbox_domains.each { |item| puts item.data_get }
```


### MailboxForward

Create an instance: `mailbox_forward = client.MailboxForward`

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
| `destinations` | `Array` |  |
| `message` | `String` |  |
| `source` | `String` |  |

#### Example: List

```ruby
# list returns an Array of MailboxForward entities, one per record (raises on error).
mailbox_forwards = client.MailboxForward.list
mailbox_forwards.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
mailbox_forward = client.MailboxForward.create({
  "destinations" => [], # Array
  "source" => "example_source", # String
})
```


### MailboxProduct

Create an instance: `mailbox_product = client.MailboxProduct`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `autorenew` | `Boolean` |  |
| `config` | `Array` |  |
| `config_name` | `String` |  |
| `description` | `String` |  |
| `duration_month` | `Integer` |  |
| `label` | `String` |  |
| `message` | `String` |  |
| `prices` | `Array` |  |
| `quantity` | `Integer` |  |
| `taxes` | `Array` |  |
| `uuid` | `String` |  |

#### Example: List

```ruby
# list returns an Array of MailboxProduct entities, one per record (raises on error).
mailbox_products = client.MailboxProduct.list
mailbox_products.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
mailbox_product = client.MailboxProduct.create({
  "config_name" => "example_config_name", # String
  "duration_month" => 1, # Integer
  "quantity" => 1, # Integer
})
```


### MailboxQuota

Create an instance: `mailbox_quota = client.MailboxQuota`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `annually` | `Hash` |  |
| `config_name` | `String` |  |
| `label` | `String` |  |
| `monthly` | `Hash` |  |
| `quota` | `String` |  |

#### Example: List

```ruby
# list returns an Array of MailboxQuota entities, one per record (raises on error).
mailbox_quotas = client.MailboxQuota.list
mailbox_quotas.each { |item| puts item.data_get }
```


### MailboxSlot

Create an instance: `mailbox_slot = client.MailboxSlot`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `autorenew` | `Hash` |  |
| `config` | `Hash` |  |
| `expires_at` | `String` |  |
| `last_paid_duration` | `Integer` |  |
| `refund_info` | `Hash` |  |
| `refundable` | `Boolean` |  |
| `uuid` | `String` |  |
| `webhosting_pack` | `Boolean` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the MailboxSlot record (raises on error).
mailbox_slot = client.MailboxSlot.load({ "uuid" => "uuid" })
```

#### Example: List

```ruby
# list returns an Array of MailboxSlot entities, one per record (raises on error).
mailbox_slots = client.MailboxSlot.list
mailbox_slots.each { |item| puts item.data_get }
```


### Organization

Create an instance: `organization = client.Organization`

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
| `city` | `String` |  |
| `corporate` | `Boolean` |  |
| `country` | `String` |  |
| `email` | `String` |  |
| `fax` | `String` |  |
| `firstname` | `String` |  |
| `id` | `String` |  |
| `lang` | `String` |  |
| `lastname` | `String` |  |
| `message` | `String` |  |
| `name` | `String` |  |
| `orgname` | `String` |  |
| `phone` | `String` |  |
| `reference` | `String` |  |
| `reseller` | `Boolean` |  |
| `siren` | `String` |  |
| `state` | `String` |  |
| `streetaddr` | `String` |  |
| `streetaddr2` | `String` |  |
| `type` | `String` |  |
| `vat_number` | `String` |  |
| `zip` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Organization record (raises on error).
organization = client.Organization.load({ "id" => "organization_id" })
```

#### Example: List

```ruby
# list returns an Array of Organization entities, one per record (raises on error).
organizations = client.Organization.list
organizations.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
organization = client.Organization.create({
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


### OrganizationCustomer

Create an instance: `organization_customer = client.OrganizationCustomer`

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
| `city` | `String` |  |
| `country` | `String` |  |
| `email` | `String` |  |
| `fax` | `String` |  |
| `firstname` | `String` |  |
| `id` | `String` |  |
| `lang` | `String` |  |
| `lastname` | `String` |  |
| `message` | `String` |  |
| `name` | `String` |  |
| `orgname` | `String` |  |
| `phone` | `String` |  |
| `reference` | `String` |  |
| `siren` | `String` |  |
| `state` | `String` |  |
| `streetaddr` | `String` |  |
| `streetaddr2` | `String` |  |
| `sync_contact_email` | `String` |  |
| `type` | `String` |  |
| `vat_number` | `String` |  |
| `zip` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the OrganizationCustomer record (raises on error).
organization_customer = client.OrganizationCustomer.load({ "id" => "organization_customer_id", "org_id" => "org_id" })
```

#### Example: List

```ruby
# list returns an Array of OrganizationCustomer entities, one per record (raises on error).
organization_customers = client.OrganizationCustomer.list({ "org_id" => "example" })
organization_customers.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
organization_customer = client.OrganizationCustomer.create({
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


### Template

Create an instance: `template = client.Template`

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
| `description` | `String` |  |
| `editable` | `Boolean` |  |
| `href` | `String` |  |
| `id` | `String` |  |
| `name` | `String` |  |
| `namespaces` | `Array` |  |
| `orgname` | `String` |  |
| `payload` | `Hash` |  |
| `sharing_space` | `Hash` |  |
| `variables` | `Array` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Template record (raises on error).
template = client.Template.load({ "id" => "template_id" })
```

#### Example: List

```ruby
# list returns an Array of Template entities, one per record (raises on error).
templates = client.Template.list
templates.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
template = client.Template.create({
  "name" => "example_name", # String
  "payload" => {}, # Hash
})
```


### TemplateDispatch

Create an instance: `template_dispatch = client.TemplateDispatch`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attempt` | `Integer` |  |
| `created_at` | `String` |  |
| `dispatch_href` | `String` |  |
| `id` | `String` |  |
| `message` | `String` |  |
| `object_id` | `String` |  |
| `object_type` | `String` |  |
| `payload` | `Hash` |  |
| `sharing_id` | `String` |  |
| `state` | `Integer` |  |
| `state_msg` | `String` |  |
| `target` | `Hash` |  |
| `target_id` | `String` |  |
| `target_type` | `String` |  |
| `task_history` | `Array` |  |
| `task_status` | `Hash` |  |
| `task_updated_at` | `String` |  |
| `template_id` | `String` |  |
| `template_name` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the TemplateDispatch record (raises on error).
template_dispatch = client.TemplateDispatch.load({ "id" => "template_dispatch_id" })
```

#### Example: Create

```ruby
template_dispatch = client.TemplateDispatch.create({
  "template_id" => "example_template_id", # String
  "object_id" => "example_object_id", # String
  "object_type" => "example_object_type", # String
})
```


### Tld

Create an instance: `tld = client.Tld`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `authinfo_for_transfer` | `Boolean` |  |
| `category` | `String` |  |
| `change_owner` | `Boolean` |  |
| `corporate` | `Boolean` |  |
| `ext_trade` | `Boolean` |  |
| `full_tld` | `String` |  |
| `href` | `String` |  |
| `lock` | `Boolean` |  |
| `name` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Tld record (raises on error).
tld = client.Tld.load({ "name" => "name" })
```

#### Example: List

```ruby
# list returns an Array of Tld entities, one per record (raises on error).
tlds = client.Tld.list
tlds.each { |item| puts item.data_get }
```


### User

Create an instance: `user = client.User`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `city` | `String` |  |
| `country` | `String` |  |
| `email` | `String` |  |
| `fax` | `String` |  |
| `firstname` | `String` |  |
| `id` | `String` |  |
| `lang` | `String` |  |
| `lastname` | `String` |  |
| `name` | `String` |  |
| `phone` | `String` |  |
| `state` | `String` |  |
| `streetaddr` | `String` |  |
| `streetaddr2` | `String` |  |
| `username` | `String` |  |
| `zip` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the User record (raises on error).
user = client.User.load({ "id" => "user_id" })
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

Features are the extension mechanism. A feature is a Ruby class
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

### Data as hashes

The Ruby SDK uses plain Ruby hashes throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers.to_map()` to safely validate that a value is a hash.

### Module structure

```
rb/
├── Gandi_sdk.rb       -- Main SDK module
├── config.rb                  -- Configuration
├── schema.rb                  -- Generated option + entity specs
├── features.rb                -- Feature factory
├── core/                      -- Core types and context
├── entity/                    -- Entity implementations
├── feature/                   -- Built-in features (Base, Test, Log)
├── utility/                   -- Utility functions and struct library
└── test/                      -- Test suites
```

The main module (`Gandi_sdk`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```ruby
livednsdomain = client.LivednsDomain
livednsdomain.list()

# livednsdomain.data_get now returns the livednsdomain data from the last list
# livednsdomain.match_get returns the last match criteria
```

Call `make` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
