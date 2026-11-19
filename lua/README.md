# Gandi Lua SDK

Gandi API client, generated from an OpenAPI definition constructed from Gandi's API documentation.

The Lua SDK for the Gandi API — an entity-oriented client using Lua conventions.

It exposes the API as capitalised, semantic **Entities** — e.g. `client:AccessToken()` — each with the same small set of operations (`list`, `load`, `create`, `update`, `patch`, `remove`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to LuaRocks. Install it from the
GitHub release tag (`lua/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/gandi-sdk/tags)),
or add the source directory to your `LUA_PATH`:

```bash
export LUA_PATH="path/to/lua/?.lua;path/to/lua/?/init.lua;;"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```lua
local sdk = require("gandi_sdk")

local client = sdk.new({
  apikey = os.getenv("GANDI_APIKEY"),
})
```

### 3. Load an acmedomain

AcmeDomain is nested under domain, so provide the `domain_id`.

`load` returns the entity; `data_get()` reads its record.

```lua
local acmedomain, err = client:AcmeDomain():load({ domain_id = 1, subscription_id = "example_subscription_id", sharing_id = "example_sharing_id" })
if err then error(err) end
for k, val in pairs(acmedomain:data_get()) do print(k, val) end
```

### 4. Create, update, and remove

```lua
-- Create
local created, err = client:AccessToken():create({ expires_at = "example_expires_at", name = "example_name" })
if err then error(err) end

```


## Error handling

Entity operations return `(value, err)`. Check `err` before using
the value:

```lua
local livednsdomains, err = client:LivednsDomain():list()
if err then error(err) end
```

`direct` follows the same `(value, err)` convention:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example_id" },
})
if err then error(err) end
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
if err then error(err) end

if result["ok"] then
  print(result["status"])  -- 200
  print(result["data"])    -- response body
end
```

### Prepare a request without sending it

```lua
local fetchdef, err = client:prepare({
  path = "/api/resource/{id}",
  method = "DELETE",
  params = { id = "example" },
})
if err then error(err) end

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```lua
local client = sdk.test()

local result, err = client:LivednsDomain():list()
-- result is an array of entities, one per mock record; err is set on failure
```

### Verify the server over HTTPS

An `https://` request goes through LuaSocket and LuaSec, and the SDK checks
the server itself before any of the request is sent: its certificate against
the system's trust store, and its name against the host (an address against
the certificate's addresses). Nothing turns that off. `SSL_CERT_FILE` or
`SSL_CERT_DIR` names the trust store, as for OpenSSL; with neither set and no
system store found, an `https://` request fails rather than going unverified.
`GANDI_CA_BUNDLE` names a PEM file of roots added to the store,
for a local service with its own certificate authority or a self-signed
certificate. A different policy is a custom fetch function, described next.

### Use a custom fetch function

Replace the HTTP transport with your own function:

```lua
local function mock_fetch(url, init)
  return {
    status = 200,
    statusText = "OK",
    headers = {},
    json = function()
      return { id = "mock01" }
    end,
  }, nil
end

local client = sdk.new({
  base = "http://localhost:8080",
  system = {
    fetch = mock_fetch,
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
cd lua && busted test/
```


## Reference

### GandiSDK

```lua
local sdk = require("gandi_sdk")
local client = sdk.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `table` | Feature activation flags. |
| `extend` | `table` | Additional Feature instances to load. |
| `system` | `table` | System overrides (e.g. custom `fetch` function). |

### test

```lua
local client = sdk.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### GandiSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> table` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> table, err` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> table, err` | Build and send an HTTP request. |
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
| `load` | `(reqmatch, ctrl) -> any, err` | Load a single entity by match criteria, and return it. |
| `list` | `(reqmatch, ctrl) -> any, err` | List entities matching the criteria, one per record. |
| `create` | `(reqdata, ctrl) -> any, err` | Create a new entity, and return it. |
| `update` | `(reqdata, ctrl) -> any, err` | Update an existing entity, and return it. |
| `patch` | `(reqdata, ctrl) -> any, err` | Change part of an existing entity, and return it. |
| `remove` | `(reqmatch, ctrl) -> any, err` | Remove an entity, and return it marked as deleted. |
| `data_get` | `() -> table` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> table` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> string` | Return the entity name. |

### Result shape

Entity operations return `(value, err)`. The `value` is the entity
itself — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `load` / `create` / `update` / `patch` / `remove` | the entity, whose `data_get()` reads its record (a `table`) |
| `list` | an array (`table`) of entities, one per record |

Check `err` first (it is non-`nil` on failure), then use `value`:

    local acme_account, err = client:AcmeAccount():load({ id = "example_id", subscription_id = "example", sharing_id = "example" })
    if err then error(err) end
    -- acme_account is the loaded entity

Only `direct()` returns a response envelope — a `table` with `ok`,
`status`, `headers`, and `data` keys.

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

Create an instance: `local access_token = client:AccessToken(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `access_token` | `string` |  |
| `entities` | `table` |  |
| `expires_at` | `string` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `scopes` | `table` |  |

#### Example: Create

```lua
local access_token, err = client:AccessToken():create({
})
```


### AcmeAccount

Create an instance: `local acme_account = client:AcmeAccount(nil)`

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

```lua
local acme_account, err = client:AcmeAccount():load({ id = "acme_account_id", subscription_id = "subscription_id", sharing_id = "sharing_id" })
```

#### Example: List

```lua
local acme_accounts, err = client:AcmeAccount():list({ subscription_id = "example", sharing_id = "example" })
```


### AcmeDomain

Create an instance: `local acme_domain = client:AcmeDomain(nil)`

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

```lua
local acme_domain, err = client:AcmeDomain():load({ domain_id = 1, subscription_id = "subscription_id", sharing_id = "sharing_id" })
```

#### Example: List

```lua
local acme_domains, err = client:AcmeDomain():list({ subscription_id = "example", domain = "example", sharing_id = "example" })
```


### AcmePrice

Create an instance: `local acme_price = client:AcmePrice(nil)`

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
| `domains` | `table` |  |
| `duration` | `string` |  |
| `duration_unit` | `string` |  |
| `grid` | `string` |  |
| `max_duration` | `number` |  |
| `min_duration` | `number` |  |
| `price_after_taxes` | `string` |  |
| `price_before_taxes` | `string` |  |
| `process` | `string` |  |
| `product` | `table` |  |
| `provider` | `string` |  |
| `tax_rate` | `string` |  |
| `taxes` | `table` |  |
| `validation_type` | `string` |  |

#### Example: List

```lua
local acme_prices, err = client:AcmePrice():list({ country = "example", currency = "example", duration = "example", grid = "example", process = "example", provider = "example", sharing_id = "example", validation_type = "example" })
```

#### Example: Create

```lua
local acme_price, err = client:AcmePrice():create({
  sharing_id = "example_sharing_id", -- string
  country = "example_country", -- string
  currency = "example_currency", -- string
  domains = {}, -- table
  duration = "example_duration", -- string
  grid = "example_grid", -- string
  process = "example_process", -- string
  provider = "example_provider", -- string
  validation_type = "example_validation_type", -- string
})
```


### AcmeSubscription

Create an instance: `local acme_subscription = client:AcmeSubscription(nil)`

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
| `domains` | `table` |  |
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

```lua
local acme_subscription, err = client:AcmeSubscription():load({ subscription_id = "subscription_id", sharing_id = "sharing_id" })
```

#### Example: List

```lua
local acme_subscriptions, err = client:AcmeSubscription():list({ created_at = "example", ends_at = "example", name = "example", provider = "example", sharing_id = "example", status = "example", validation_type = "example", year = "example" })
```

#### Example: Create

```lua
local acme_subscription, err = client:AcmeSubscription():create({
  sharing_id = "example_sharing_id", -- string
  country = "example_country", -- string
  currency = "example_currency", -- string
  domains = {}, -- table
  duration = 1, -- number
  grid = "example_grid", -- string
  name = "example_name", -- string
  provider = "example_provider", -- string
  validation_type = "example_validation_type", -- string
})
```


### BillingInfo

Create an instance: `local billing_info = client:BillingInfo(nil)`

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
| `prepaid` | `table` |  |
| `prepaid_monthly_invoice` | `boolean` |  |

#### Example: Load

```lua
local billing_info, err = client:BillingInfo():load({ sharing_id = "sharing_id" })
```


### BillingPrice

Create an instance: `local billing_price = client:BillingPrice(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `currency` | `string` |  |
| `grid` | `string` |  |
| `products` | `table` |  |
| `taxes` | `table` |  |

#### Example: Load

```lua
local billing_price, err = client:BillingPrice():load({ type = "type", name = {}, process = {} })
```


### CertificateDcv

Create an instance: `local certificate_dcv = client:CertificateDcv(nil)`

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

Create an instance: `local certificate_package = client:CertificatePackage(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `category` | `table` |  |
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

```lua
local certificate_package, err = client:CertificatePackage():load({ name = "name" })
```

#### Example: List

```lua
local certificate_packages, err = client:CertificatePackage():list()
```


### CertificatePem

Create an instance: `local certificate_pem = client:CertificatePem(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local certificate_pem, err = client:CertificatePem():load({ type = "type" })
```


### CertificateRenewal

Create an instance: `local certificate_renewal = client:CertificateRenewal(nil)`

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
| `errors` | `table` |  |
| `status` | `string` |  |

#### Example: Create

```lua
local certificate_renewal, err = client:CertificateRenewal():create({
  certificate_id = "example_certificate_id", -- string
})
```


### CertificateTag

Create an instance: `local certificate_tag = client:CertificateTag(nil)`

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
| `add` | `table` |  |
| `message` | `string` |  |
| `remove` | `table` |  |
| `tag` | `string` |  |
| `tags` | `table` |  |

#### Example: List

```lua
local certificate_tags, err = client:CertificateTag():list({ certificate_id = "example" })
```

#### Example: Create

```lua
local certificate_tag, err = client:CertificateTag():create({
  certificate_id = "example_certificate_id", -- string
  tag = "example_tag", -- string
})
```


### Comment

Create an instance: `local comment = client:Comment(nil)`

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
| `errors` | `table` |  |
| `id` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |
| `user` | `table` |  |

#### Example: Load

```lua
local comment, err = client:Comment():load({ entity_id = "entity_id" })
```

#### Example: Create

```lua
local comment, err = client:Comment():create({
  entity_id = "example_entity_id", -- string
  content = "example_content", -- string
})
```


### Domain

Create an instance: `local domain = client:Domain(nil)`

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
| `admin` | `table` |  |
| `authinfo` | `string` |  |
| `autorenew` | `table` |  |
| `bill` | `table` |  |
| `can_tld_lock` | `boolean` |  |
| `claims` | `string` |  |
| `contacts` | `table` |  |
| `currency` | `string` |  |
| `dates` | `table` |  |
| `domain_owner` | `string` |  |
| `duration` | `number` |  |
| `enforce_premium` | `boolean` |  |
| `errors` | `table` |  |
| `extra_parameters` | `table` |  |
| `fqdn` | `string` |  |
| `fqdn_unicode` | `string` |  |
| `href` | `string` |  |
| `id` | `string` |  |
| `lang` | `string` |  |
| `mailbox_optin` | `boolean` |  |
| `nameserver` | `table` |  |
| `nameservers` | `table` |  |
| `nameservers_ips` | `table` |  |
| `orga_owner` | `string` |  |
| `owner` | `table` |  |
| `price` | `number` |  |
| `reachability` | `string` |  |
| `resellee_id` | `string` |  |
| `services` | `table` |  |
| `sharing_id` | `string` |  |
| `sharing_space` | `table` |  |
| `smd` | `string` |  |
| `status` | `table` |  |
| `tags` | `table` |  |
| `tech` | `table` |  |
| `template_id` | `string` |  |
| `tld` | `string` |  |
| `tld_period` | `string` |  |
| `trustee_roles` | `table` |  |

#### Example: Load

```lua
local domain, err = client:Domain():load({ fqdn = "fqdn" })
```

#### Example: List

```lua
local domains, err = client:Domain():list()
```

#### Example: Create

```lua
local domain, err = client:Domain():create({
  admin = {}, -- table
  bill = {}, -- table
  fqdn = "example_fqdn", -- string
  owner = {}, -- table
  tech = {}, -- table
})
```


### DomainAvailability

Create an instance: `local domain_availability = client:DomainAvailability(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `currency` | `string` |  |
| `grid` | `string` |  |
| `products` | `table` |  |
| `taxes` | `table` |  |

#### Example: Load

```lua
local domain_availability, err = client:DomainAvailability():load({ name = "name" })
```


### DomainChangeOwner

Create an instance: `local domain_change_owner = client:DomainChangeOwner(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `admin` | `table` |  |
| `bill` | `table` |  |
| `created_at` | `string` |  |
| `date_start` | `string` |  |
| `errors` | `table` |  |
| `errortype` | `string` |  |
| `errortype_label` | `string` |  |
| `foa` | `table` |  |
| `inner_step` | `string` |  |
| `owner` | `table` |  |
| `params` | `table` |  |
| `status` | `string` |  |
| `step` | `string` |  |
| `step_nb` | `number` |  |
| `tech` | `table` |  |
| `updated_at` | `string` |  |

#### Example: Load

```lua
local domain_change_owner, err = client:DomainChangeOwner():load({ domain = "domain" })
```

#### Example: Create

```lua
local domain_change_owner, err = client:DomainChangeOwner():create({
  domain = "example_domain", -- string
  admin = {}, -- table
  bill = {}, -- table
  owner = {}, -- table
  tech = {}, -- table
})
```


### DomainClaim

Create an instance: `local domain_claim = client:DomainClaim(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `claims` | `table` |  |
| `created_at` | `string` |  |
| `expires_at` | `string` |  |
| `fqdn` | `string` |  |
| `fqdn_alabel` | `string` |  |
| `fqdn_ulabel` | `string` |  |
| `notice_id` | `string` |  |
| `status` | `string` |  |

#### Example: Load

```lua
local domain_claim, err = client:DomainClaim():load({ domain = "domain" })
```

#### Example: Create

```lua
local domain_claim, err = client:DomainClaim():create({
  domain = "example_domain", -- string
  claims = {}, -- table
  created_at = "example_created_at", -- string
  expires_at = "example_expires_at", -- string
  fqdn = "example_fqdn", -- string
  fqdn_alabel = "example_fqdn_alabel", -- string
  fqdn_ulabel = "example_fqdn_ulabel", -- string
  notice_id = "example_notice_id", -- string
  status = "example_status", -- string
})
```


### DomainContact

Create an instance: `local domain_contact = client:DomainContact(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `admin` | `table` |  |
| `bill` | `table` |  |
| `message` | `string` |  |
| `owner` | `table` |  |
| `tech` | `table` |  |

#### Example: Load

```lua
local domain_contact, err = client:DomainContact():load({ domain = "domain" })
```


### DomainDnskey

Create an instance: `local domain_dnskey = client:DomainDnskey(nil)`

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
| `keys` | `table` |  |
| `keytag` | `number` |  |
| `message` | `string` |  |
| `public_key` | `string` |  |
| `type` | `string` |  |

#### Example: List

```lua
local domain_dnskeys, err = client:DomainDnskey():list({ domain = "example" })
```

#### Example: Create

```lua
local domain_dnskey, err = client:DomainDnskey():create({
  domain = "example_domain", -- string
  algorithm = 1, -- number
  public_key = "example_public_key", -- string
  type = "example_type", -- string
})
```


### DomainDnssec

Create an instance: `local domain_dnssec = client:DomainDnssec(nil)`

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

```lua
local domain_dnssec, err = client:DomainDnssec():load({ domain = "domain" })
```

#### Example: Create

```lua
local domain_dnssec, err = client:DomainDnssec():create({
  domain = "example_domain", -- string
  state = "example_state", -- string
})
```


### DomainHost

Create an instance: `local domain_host = client:DomainHost(nil)`

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
| `ips` | `table` |  |
| `message` | `string` |  |
| `name` | `string` |  |

#### Example: Load

```lua
local domain_host, err = client:DomainHost():load({ domain = "domain", name = "name" })
```

#### Example: List

```lua
local domain_hosts, err = client:DomainHost():list({ domain = "example" })
```

#### Example: Create

```lua
local domain_host, err = client:DomainHost():create({
  domain = "example_domain", -- string
  ips = {}, -- table
  name = "example_name", -- string
})
```


### DomainLivedns

Create an instance: `local domain_livedns = client:DomainLivedns(nil)`

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
| `nameservers` | `table` |  |

#### Example: Load

```lua
local domain_livedns, err = client:DomainLivedns():load({ domain = "domain" })
```

#### Example: Create

```lua
local domain_livedns, err = client:DomainLivedns():create({
  domain = "example_domain", -- string
  current = "example_current", -- string
  message = "example_message", -- string
  nameservers = {}, -- table
})
```


### DomainNameserver

Create an instance: `local domain_nameserver = client:DomainNameserver(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `message` | `string` |  |
| `nameservers` | `table` |  |

#### Example: List

```lua
local domain_nameservers, err = client:DomainNameserver():list({ domain = "example" })
```


### DomainTag

Create an instance: `local domain_tag = client:DomainTag(nil)`

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
| `add` | `table` |  |
| `message` | `string` |  |
| `remove` | `table` |  |
| `tag` | `string` |  |
| `tags` | `table` |  |

#### Example: List

```lua
local domain_tags, err = client:DomainTag():list({ domain = "example" })
```

#### Example: Create

```lua
local domain_tag, err = client:DomainTag():create({
  domain = "example_domain", -- string
  tag = "example_tag", -- string
})
```


### DomainTransfer

Create an instance: `local domain_transfer = client:DomainTransfer(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `admin` | `table` |  |
| `authinfo` | `string` |  |
| `bill` | `table` |  |
| `change_owner` | `boolean` |  |
| `created_at` | `string` |  |
| `currency` | `string` |  |
| `duration` | `number` |  |
| `enforce_premium` | `boolean` |  |
| `errors` | `table` |  |
| `errortype` | `string` |  |
| `errortype_label` | `string` |  |
| `extra_parameters` | `table` |  |
| `foa` | `table` |  |
| `fqdn` | `string` |  |
| `inner_step` | `string` |  |
| `mailbox_optin` | `boolean` |  |
| `message` | `string` |  |
| `nameservers` | `table` |  |
| `nameservers_ips` | `table` |  |
| `owner` | `table` |  |
| `owner_contact` | `string` |  |
| `params` | `table` |  |
| `price` | `number` |  |
| `regac_at` | `string` |  |
| `resellee_id` | `string` |  |
| `start_at` | `string` |  |
| `status` | `string` |  |
| `step` | `string` |  |
| `step_nb` | `number` |  |
| `tech` | `table` |  |
| `template_id` | `string` |  |
| `transfer_link` | `string` |  |
| `transfer_procedure` | `string` |  |
| `updated_at` | `string` |  |

#### Example: Load

```lua
local domain_transfer, err = client:DomainTransfer():load({ domain = "domain" })
```

#### Example: Create

```lua
local domain_transfer, err = client:DomainTransfer():create({
  admin = {}, -- table
  bill = {}, -- table
  fqdn = "example_fqdn", -- string
  owner = {}, -- table
  tech = {}, -- table
})
```


### DomainWebredir

Create an instance: `local domain_webredir = client:DomainWebredir(nil)`

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

```lua
local domain_webredir, err = client:DomainWebredir():load({ domain = "domain", host = "host" })
```

#### Example: List

```lua
local domain_webredirs, err = client:DomainWebredir():list({ domain = "example" })
```

#### Example: Create

```lua
local domain_webredir, err = client:DomainWebredir():create({
  domain = "example_domain", -- string
  host = "example_host", -- string
  override = true, -- boolean
  protocol = "example_protocol", -- string
  type = "example_type", -- string
  url = "example_url", -- string
})
```


### EmailForward

Create an instance: `local email_forward = client:EmailForward(nil)`

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
| `destinations` | `table` |  |
| `href` | `string` |  |
| `id` | `string` |  |
| `message` | `string` |  |
| `source` | `string` |  |

#### Example: List

```lua
local email_forwards, err = client:EmailForward():list({ domain = "example" })
```

#### Example: Create

```lua
local email_forward, err = client:EmailForward():create({
  domain = "example_domain", -- string
  destinations = {}, -- table
  source = "example_source", -- string
})
```


### EmailMailbox

Create an instance: `local email_mailbox = client:EmailMailbox(nil)`

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
| `aliases` | `table` |  |
| `antispam` | `boolean` |  |
| `autorenew` | `table` |  |
| `domain` | `string` |  |
| `errors` | `table` |  |
| `expires_at` | `string` |  |
| `fallback_email` | `string` |  |
| `href` | `string` |  |
| `id` | `string` |  |
| `login` | `string` |  |
| `mailbox_type` | `string` |  |
| `message` | `string` |  |
| `password` | `string` |  |
| `quota_used` | `number` |  |
| `responder` | `table` |  |
| `status` | `string` |  |
| `to_convert` | `boolean` |  |

#### Example: Load

```lua
local email_mailbox, err = client:EmailMailbox():load({ id = "email_mailbox_id", domain = "domain" })
```

#### Example: List

```lua
local email_mailboxs, err = client:EmailMailbox():list({ domain = "example" })
```

#### Example: Create

```lua
local email_mailbox, err = client:EmailMailbox():create({
  domain = "example_domain", -- string
  login = "example_login", -- string
  mailbox_type = "example_mailbox_type", -- string
  password = "example_password", -- string
})
```


### EmailMigration

Create an instance: `local email_migration = client:EmailMigration(nil)`

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
| `info` | `table` |  |
| `message` | `string` |  |
| `packmail` | `boolean` |  |
| `price_v1` | `number` |  |
| `price_v2` | `number` |  |
| `quota_v1` | `number` |  |
| `token` | `string` |  |
| `usage_v1` | `number` |  |

#### Example: Load

```lua
local email_migration, err = client:EmailMigration():load({ domain = "domain" })
```

#### Example: Create

```lua
local email_migration, err = client:EmailMigration():create({
  domain = "example_domain", -- string
  token = "example_token", -- string
})
```


### EmailOffer

Create an instance: `local email_offer = client:EmailOffer(nil)`

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

```lua
local email_offer, err = client:EmailOffer():load({ domain = "domain" })
```


### EmailSlot

Create an instance: `local email_slot = client:EmailSlot(nil)`

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

```lua
local email_slot, err = client:EmailSlot():load({ id = 1, domain = "domain" })
```

#### Example: List

```lua
local email_slots, err = client:EmailSlot():list({ domain = "example" })
```

#### Example: Create

```lua
local email_slot, err = client:EmailSlot():create({
  domain = "example_domain", -- string
  duration = 1, -- number
  mailbox_type = "example_mailbox_type", -- string
})
```


### HostingApplication

Create an instance: `local hosting_application = client:HostingApplication(nil)`

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
| `requirements` | `table` |  |

#### Example: Load

```lua
local hosting_application, err = client:HostingApplication():load({ name = "name" })
```

#### Example: List

```lua
local hosting_applications, err = client:HostingApplication():list()
```


### HostingInstance

Create an instance: `local hosting_instance = client:HostingInstance(nil)`

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
| `access_information` | `table` |  |
| `authentication` | `table` |  |
| `autorenew` | `table` |  |
| `available_upgrade` | `boolean` |  |
| `booster` | `table` |  |
| `booster_options` | `table` |  |
| `compatible_applications` | `table` |  |
| `console` | `table` |  |
| `cpu` | `number` |  |
| `created_at` | `string` |  |
| `database` | `table` |  |
| `datacenter` | `table` |  |
| `domain` | `string` |  |
| `duration` | `number` |  |
| `duration_unit` | `string` |  |
| `errors` | `table` |  |
| `expire_at` | `string` |  |
| `id` | `string` |  |
| `language` | `table` |  |
| `language_id` | `string` |  |
| `location` | `string` |  |
| `message` | `string` |  |
| `name` | `string` |  |
| `password` | `string` |  |
| `password_updated_at` | `string` |  |
| `ram` | `table` |  |
| `sharing_space` | `table` |  |
| `size` | `string` |  |
| `snapshot_enabled` | `boolean` |  |
| `status` | `string` |  |
| `storage` | `table` |  |
| `storage_additional_size` | `number` |  |
| `subscription_cancelled` | `boolean` |  |
| `type` | `table` |  |
| `upgrade_to` | `table` |  |
| `vhosts` | `table` |  |

#### Example: Load

```lua
local hosting_instance, err = client:HostingInstance():load({ id = "hosting_instance_id" })
```

#### Example: List

```lua
local hosting_instances, err = client:HostingInstance():list()
```

#### Example: Create

```lua
local hosting_instance, err = client:HostingInstance():create({
  authentication = {}, -- table
  domain = "example_domain", -- string
  location = "example_location", -- string
  size = "example_size", -- string
  type = {}, -- table
})
```


### HostingVhost

Create an instance: `local hosting_vhost = client:HostingVhost(nil)`

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
| `application` | `table` |  |
| `created_at` | `string` |  |
| `deployment` | `table` |  |
| `fqdn` | `string` |  |
| `https_strategy` | `string` |  |
| `is_a_test_vhost` | `boolean` |  |
| `linked_dns_zone` | `table` |  |
| `status` | `string` |  |
| `tls_validated_at` | `string` |  |

#### Example: Load

```lua
local hosting_vhost, err = client:HostingVhost():load({ fqdn = "fqdn", instance_id = "instance_id" })
```

#### Example: List

```lua
local hosting_vhosts, err = client:HostingVhost():list({ instance_id = "example" })
```

#### Example: Create

```lua
local hosting_vhost, err = client:HostingVhost():create({
  instance_id = "example_instance_id", -- string
  application = {}, -- table
  fqdn = "example_fqdn", -- string
  linked_dns_zone = {}, -- table
})
```


### IssuedCertificate

Create an instance: `local issued_certificate = client:IssuedCertificate(nil)`

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
| `altnames` | `table` |  |
| `altnames_unicode` | `table` |  |
| `apex_only` | `boolean` |  |
| `assumed_name` | `string` |  |
| `business_category` | `string` |  |
| `card_pay_trustlogo` | `boolean` |  |
| `cert` | `string` |  |
| `cn` | `string` |  |
| `cn_unicode` | `string` |  |
| `contact` | `table` |  |
| `csr` | `string` |  |
| `dates` | `table` |  |
| `dcv_method` | `string` |  |
| `duration` | `number` |  |
| `error_msg` | `string` |  |
| `errors` | `table` |  |
| `href` | `string` |  |
| `id` | `string` |  |
| `ida` | `table` |  |
| `intermediate` | `string` |  |
| `joi` | `table` |  |
| `middleman` | `table` |  |
| `owner` | `string` |  |
| `package` | `table` |  |
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
| `tags` | `table` |  |
| `trustlogo` | `boolean` |  |
| `trustlogo_token` | `table` |  |

#### Example: Load

```lua
local issued_certificate, err = client:IssuedCertificate():load({ id = "issued_certificate_id" })
```

#### Example: List

```lua
local issued_certificates, err = client:IssuedCertificate():list()
```

#### Example: Create

```lua
local issued_certificate, err = client:IssuedCertificate():create({
  package = {}, -- table
})
```


### LinkedZone

Create an instance: `local linked_zone = client:LinkedZone(nil)`

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
| `domains` | `table` |  |
| `id` | `string` |  |
| `message` | `string` |  |
| `name` | `string` |  |
| `record_list` | `table` |  |
| `record_text` | `string` |  |
| `records` | `table` |  |
| `sharing_space` | `table` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |

#### Example: Load

```lua
local linked_zone, err = client:LinkedZone():load({ id = "linked_zone_id" })
```

#### Example: List

```lua
local linked_zones, err = client:LinkedZone():list()
```

#### Example: Create

```lua
local linked_zone, err = client:LinkedZone():create({
  name = "example_name", -- string
})
```


### LinkedZoneDeployment

Create an instance: `local linked_zone_deployment = client:LinkedZoneDeployment(nil)`

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

```lua
local linked_zone_deployment, err = client:LinkedZoneDeployment():create({
  zone_id = "example_zone_id", -- string
  deploy = true, -- boolean
})
```


### LinkedZoneDomain

Create an instance: `local linked_zone_domain = client:LinkedZoneDomain(nil)`

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
| `zone` | `table` |  |

#### Example: Load

```lua
local linked_zone_domain, err = client:LinkedZoneDomain():load({ name = "name" })
```

#### Example: List

```lua
local linked_zone_domains, err = client:LinkedZoneDomain():list()
```


### LinkedZoneTask

Create an instance: `local linked_zone_task = client:LinkedZoneTask(nil)`

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
| `result` | `table` |  |
| `status` | `string` |  |
| `type` | `string` |  |
| `updated_at` | `string` |  |
| `zone_id` | `string` |  |

#### Example: Load

```lua
local linked_zone_task, err = client:LinkedZoneTask():load({ id = "linked_zone_task_id" })
```

#### Example: List

```lua
local linked_zone_tasks, err = client:LinkedZoneTask():list()
```


### LivednsAxfrSlave

Create an instance: `local livedns_axfr_slave = client:LivednsAxfrSlave(nil)`

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

```lua
local livedns_axfr_slaves, err = client:LivednsAxfrSlave():list({ fqdn = "example" })
```


### LivednsAxfrTsig

Create an instance: `local livedns_axfr_tsig = client:LivednsAxfrTsig(nil)`

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

```lua
local livedns_axfr_tsigs, err = client:LivednsAxfrTsig():list({ fqdn = "example" })
```


### LivednsDomain

Create an instance: `local livedns_domain = client:LivednsDomain(nil)`

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
| `zone` | `table` |  |

#### Example: Load

```lua
local livedns_domain, err = client:LivednsDomain():load({ fqdn = "fqdn" })
```

#### Example: List

```lua
local livedns_domains, err = client:LivednsDomain():list()
```

#### Example: Create

```lua
local livedns_domain, err = client:LivednsDomain():create({
  fqdn = "example_fqdn", -- string
})
```


### LivednsKey

Create an instance: `local livedns_key = client:LivednsKey(nil)`

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

```lua
local livedns_key, err = client:LivednsKey():load({ id = "livedns_key_id", fqdn = "fqdn" })
```

#### Example: List

```lua
local livedns_keys, err = client:LivednsKey():list({ fqdn = "example" })
```

#### Example: Create

```lua
local livedns_key, err = client:LivednsKey():create({
  fqdn = "example_fqdn", -- string
  flags = 1, -- number
})
```


### LivednsNameserver

Create an instance: `local livedns_nameserver = client:LivednsNameserver(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Example: List

```lua
local livedns_nameservers, err = client:LivednsNameserver():list({ fqdn = "example" })
```


### LivednsRecord

Create an instance: `local livedns_record = client:LivednsRecord(nil)`

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
| `add_rrset_values` | `table` |  |
| `id` | `string` |  |
| `message` | `string` |  |
| `remove_rrset_values` | `table` |  |
| `rrset_href` | `string` |  |
| `rrset_name` | `string` |  |
| `rrset_ttl` | `number` |  |
| `rrset_type` | `string` |  |
| `rrset_values` | `table` |  |

#### Example: Load

```lua
local livedns_record, err = client:LivednsRecord():load({ fqdn = "fqdn", rrset_name = "rrset_name", rrset_type = "rrset_type" })
```

#### Example: List

```lua
local livedns_records, err = client:LivednsRecord():list({ fqdn = "example" })
```

#### Example: Create

```lua
local livedns_record, err = client:LivednsRecord():create({
  fqdn = "example_fqdn", -- string
  rrset_values = {}, -- table
})
```


### LivednsRrtype

Create an instance: `local livedns_rrtype = client:LivednsRrtype(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Example: List

```lua
local livedns_rrtypes, err = client:LivednsRrtype():list()
```


### LivednsSnapshot

Create an instance: `local livedns_snapshot = client:LivednsSnapshot(nil)`

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
| `zone_data` | `table` |  |

#### Example: Load

```lua
local livedns_snapshot, err = client:LivednsSnapshot():load({ id = "livedns_snapshot_id", fqdn = "fqdn" })
```

#### Example: List

```lua
local livedns_snapshots, err = client:LivednsSnapshot():list({ fqdn = "example" })
```

#### Example: Create

```lua
local livedns_snapshot, err = client:LivednsSnapshot():create({
  fqdn = "example_fqdn", -- string
})
```


### LivednsTsigKey

Create an instance: `local livedns_tsig_key = client:LivednsTsigKey(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `config_samples` | `table` |  |
| `href` | `string` |  |
| `id` | `string` |  |
| `key_name` | `string` |  |
| `secret` | `string` |  |

#### Example: Load

```lua
local livedns_tsig_key, err = client:LivednsTsigKey():load({ id = "livedns_tsig_key_id" })
```

#### Example: List

```lua
local livedns_tsig_keys, err = client:LivednsTsigKey():list()
```

#### Example: Create

```lua
local livedns_tsig_key, err = client:LivednsTsigKey():create({
  config_samples = {}, -- table
  href = "example_href", -- string
  id = "example_id", -- string
  key_name = "example_key_name", -- string
  secret = "example_secret", -- string
})
```


### LivednsZone

Create an instance: `local livedns_zone = client:LivednsZone(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `items` | `table` |  |
| `message` | `string` |  |
| `remove_apex_ns` | `boolean` |  |


### Mailbox

Create an instance: `local mailbox = client:Mailbox(nil)`

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
| `aliases` | `table` |  |
| `antispam` | `boolean` |  |
| `autorenew` | `table` |  |
| `config` | `table` |  |
| `config_name` | `string` |  |
| `created_at` | `string` |  |
| `data_access` | `boolean` |  |
| `domain_part` | `string` |  |
| `duration_month` | `number` |  |
| `email` | `string` |  |
| `expires_at` | `string` |  |
| `internal_domain` | `boolean` |  |
| `issues` | `table` |  |
| `last_paid_duration` | `number` |  |
| `local_part` | `string` |  |
| `message` | `string` |  |
| `owner` | `table` |  |
| `password` | `string` |  |
| `quota` | `number` |  |
| `quota_used` | `number` |  |
| `responder` | `table` |  |
| `updated_at` | `string` |  |
| `uuid` | `string` |  |

#### Example: Load

```lua
local mailbox, err = client:Mailbox():load({ address = "address" })
```

#### Example: List

```lua
local mailboxs, err = client:Mailbox():list()
```

#### Example: Create

```lua
local mailbox, err = client:Mailbox():create({
  config_name = "example_config_name", -- string
  email = "example_email", -- string
  password = "example_password", -- string
})
```


### MailboxDomain

Create an instance: `local mailbox_domain = client:MailboxDomain(nil)`

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
| `configuration` | `table` |  |
| `date_last_validation` | `string` |  |
| `dkim` | `boolean` |  |
| `fqdns` | `table` |  |
| `internal` | `boolean` |  |
| `is_livedns` | `boolean` |  |
| `mx` | `boolean` |  |
| `owner` | `table` |  |
| `spf` | `boolean` |  |
| `txt` | `boolean` |  |

#### Example: Load

```lua
local mailbox_domain, err = client:MailboxDomain():load({ domain = "domain" })
```

#### Example: List

```lua
local mailbox_domains, err = client:MailboxDomain():list()
```


### MailboxForward

Create an instance: `local mailbox_forward = client:MailboxForward(nil)`

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
| `destinations` | `table` |  |
| `message` | `string` |  |
| `source` | `string` |  |

#### Example: List

```lua
local mailbox_forwards, err = client:MailboxForward():list()
```

#### Example: Create

```lua
local mailbox_forward, err = client:MailboxForward():create({
  destinations = {}, -- table
  source = "example_source", -- string
})
```


### MailboxProduct

Create an instance: `local mailbox_product = client:MailboxProduct(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `autorenew` | `boolean` |  |
| `config` | `table` |  |
| `config_name` | `string` |  |
| `description` | `string` |  |
| `duration_month` | `number` |  |
| `label` | `string` |  |
| `message` | `string` |  |
| `prices` | `table` |  |
| `quantity` | `number` |  |
| `taxes` | `table` |  |
| `uuid` | `string` |  |

#### Example: List

```lua
local mailbox_products, err = client:MailboxProduct():list()
```

#### Example: Create

```lua
local mailbox_product, err = client:MailboxProduct():create({
  config_name = "example_config_name", -- string
  duration_month = 1, -- number
  quantity = 1, -- number
})
```


### MailboxQuota

Create an instance: `local mailbox_quota = client:MailboxQuota(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `annually` | `table` |  |
| `config_name` | `string` |  |
| `label` | `string` |  |
| `monthly` | `table` |  |
| `quota` | `string` |  |

#### Example: List

```lua
local mailbox_quotas, err = client:MailboxQuota():list()
```


### MailboxSlot

Create an instance: `local mailbox_slot = client:MailboxSlot(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `autorenew` | `table` |  |
| `config` | `table` |  |
| `expires_at` | `string` |  |
| `last_paid_duration` | `number` |  |
| `refund_info` | `table` |  |
| `refundable` | `boolean` |  |
| `uuid` | `string` |  |
| `webhosting_pack` | `boolean` |  |

#### Example: Load

```lua
local mailbox_slot, err = client:MailboxSlot():load({ uuid = "uuid" })
```

#### Example: List

```lua
local mailbox_slots, err = client:MailboxSlot():list()
```


### Organization

Create an instance: `local organization = client:Organization(nil)`

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

```lua
local organization, err = client:Organization():load({ id = "organization_id" })
```

#### Example: List

```lua
local organizations, err = client:Organization():list()
```

#### Example: Create

```lua
local organization, err = client:Organization():create({
  city = "example_city", -- string
  email = "example_email", -- string
  firstname = "example_firstname", -- string
  lastname = "example_lastname", -- string
  name = "example_name", -- string
  orgname = "example_orgname", -- string
  phone = "example_phone", -- string
  streetaddr = "example_streetaddr", -- string
  type = "example_type", -- string
})
```


### OrganizationCustomer

Create an instance: `local organization_customer = client:OrganizationCustomer(nil)`

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

```lua
local organization_customer, err = client:OrganizationCustomer():load({ id = "organization_customer_id", org_id = "org_id" })
```

#### Example: List

```lua
local organization_customers, err = client:OrganizationCustomer():list({ org_id = "example" })
```

#### Example: Create

```lua
local organization_customer, err = client:OrganizationCustomer():create({
  org_id = "example_org_id", -- string
  city = "example_city", -- string
  country = "example_country", -- string
  email = "example_email", -- string
  firstname = "example_firstname", -- string
  lastname = "example_lastname", -- string
  phone = "example_phone", -- string
  streetaddr = "example_streetaddr", -- string
  type = "example_type", -- string
})
```


### Template

Create an instance: `local template = client:Template(nil)`

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
| `namespaces` | `table` |  |
| `orgname` | `string` |  |
| `payload` | `table` |  |
| `sharing_space` | `table` |  |
| `variables` | `table` |  |

#### Example: Load

```lua
local template, err = client:Template():load({ id = "template_id" })
```

#### Example: List

```lua
local templates, err = client:Template():list()
```

#### Example: Create

```lua
local template, err = client:Template():create({
  name = "example_name", -- string
  payload = {}, -- table
})
```


### TemplateDispatch

Create an instance: `local template_dispatch = client:TemplateDispatch(nil)`

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
| `payload` | `table` |  |
| `sharing_id` | `string` |  |
| `state` | `number` |  |
| `state_msg` | `string` |  |
| `target` | `table` |  |
| `target_id` | `string` |  |
| `target_type` | `string` |  |
| `task_history` | `table` |  |
| `task_status` | `table` |  |
| `task_updated_at` | `string` |  |
| `template_id` | `string` |  |
| `template_name` | `string` |  |

#### Example: Load

```lua
local template_dispatch, err = client:TemplateDispatch():load({ id = "template_dispatch_id" })
```

#### Example: Create

```lua
local template_dispatch, err = client:TemplateDispatch():create({
  template_id = "example_template_id", -- string
  object_id = "example_object_id", -- string
  object_type = "example_object_type", -- string
})
```


### Tld

Create an instance: `local tld = client:Tld(nil)`

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

```lua
local tld, err = client:Tld():load({ name = "name" })
```

#### Example: List

```lua
local tlds, err = client:Tld():list()
```


### User

Create an instance: `local user = client:User(nil)`

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

```lua
local user, err = client:User():load({ id = "user_id" })
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

Features are the extension mechanism. A feature is a Lua table
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

### Data as tables

The Lua SDK uses plain Lua tables throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a table.

### Module structure

```
lua/
├── gandi_sdk.lua    -- Main SDK module
├── config.lua               -- Configuration
├── schema.lua               -- Generated option + entity specs
├── features.lua             -- Feature factory
├── core/                    -- Core types and context
├── entity/                  -- Entity implementations
├── feature/                 -- Built-in features (Base, Test, Log)
├── utility/                 -- Utility functions and struct library
└── test/                    -- Test suites
```

The main module (`gandi_sdk`) exports the SDK constructor
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```lua
local livednsdomain = client:LivednsDomain()
livednsdomain:list()

-- livednsdomain:data_get() now returns the livednsdomain data from the last list
-- livednsdomain:match_get() returns the last match criteria
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
