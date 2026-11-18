# Gandi Python SDK

Gandi API client, generated from an OpenAPI definition constructed from Gandi's API documentation.

The Python SDK for the Gandi API — an entity-oriented client following Pythonic conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.AccessToken()` — each
carrying a small, uniform set of operations (`list`, `load`, `create`, `update`, `patch`, `remove`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/gandi-sdk/tags)) or
from a source checkout:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
import os
from gandi_sdk import GandiSDK

client = GandiSDK({
    "apikey": os.environ.get("GANDI_APIKEY"),
})
```

### 3. Load an acmedomain

AcmeDomain is nested under domain, so provide the `domain_id`.
`load()` returns the ENTITY — call data_get() for the record — and raises on error.

```python
try:
    acmedomain = client.AcmeDomain().load({"domain_id": 1, "subscription_id": "example_subscription_id", "sharing_id": "example_sharing_id"})
    print(acmedomain.data_get())
except Exception as err:
    print(f"load failed: {err}")
```

### 4. Create, update, and remove

```python
# Create — returns the ENTITY (call data_get() for the record)
created = client.AccessToken().create({"expires_at": "example_expires_at", "name": "example_name"})

```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    livednsdomains = client.LivednsDomain().list()
    print([item.data_get() for item in livednsdomains])
except Exception as err:
    print(f"list failed: {err}")
```

`direct()` does **not** raise — it returns the result envelope. Branch
on `ok`; on failure `status` holds the HTTP status (for error responses)
and `err` holds a transport error, so read both defensively:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example_id"},
})

if not result["ok"]:
    print("request failed:", result.get("status"), result.get("err"))
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    # A non-2xx response carries status + data (the error body); a
    # transport-level failure carries err instead. Only one is present, so
    # read both with .get() rather than indexing a key that may be absent.
    print(result.get("status"), result.get("err"))
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = GandiSDK.test()

# Entity ops return the entity, and list one per record; they raise on error.
livednsdomain = client.LivednsDomain().list()
# data_get() on an entity reads its mock response record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = GandiSDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
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
cd py && pytest test/
```


## Reference

### GandiSDK

```python
from gandi_sdk import GandiSDK

client = GandiSDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `str` | API key for authentication. |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = GandiSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### GandiSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
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
| `list` | `(reqmatch, ctrl) -> list` | List entities matching the criteria, one per record. Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity, and return it. Raises on error. |
| `update` | `(reqdata, ctrl) -> any` | Update an existing entity, and return it. Raises on error. |
| `patch` | `(reqdata, ctrl) -> any` | Change part of an existing entity, and return it. Raises on error. |
| `remove` | `(reqmatch, ctrl) -> any` | Remove an entity, and return it marked as deleted. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the entity, and `list` a `list` of entities, one
per record; an entity's `data_get()` reads its record (a `dict`). They raise
on error, so wrap calls in `try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

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

Operations: Create, List, Load, Remove, Update.

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

Create an instance: `access_token = client.AccessToken()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `access_token` | `str` |  |
| `entities` | `list` |  |
| `expires_at` | `str` |  |
| `id` | `str` |  |
| `name` | `str` |  |
| `scopes` | `list` |  |

#### Example: Create

```python
access_token = client.AccessToken().create({
})
```


### AcmeAccount

Create an instance: `acme_account = client.AcmeAccount()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `str` |  |
| `deleted_at` | `str` |  |
| `external_id` | `str` |  |
| `id` | `str` |  |
| `ip` | `str` |  |
| `last_activity` | `str` |  |
| `status` | `str` |  |
| `subscription_id` | `str` |  |

#### Example: Load

```python
acme_account = client.AcmeAccount().load({"id": "acme_account_id", "subscription_id": "subscription_id", "sharing_id": "sharing_id"})
```

#### Example: List

```python
acme_accounts = client.AcmeAccount().list({"subscription_id": "example", "sharing_id": "example"})
```


### AcmeDomain

Create an instance: `acme_domain = client.AcmeDomain()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `str` |  |
| `deleted_at` | `str` |  |
| `hostname` | `str` |  |
| `hostname_ulabel` | `str` |  |
| `is_wildcard` | `bool` |  |
| `status` | `str` |  |
| `subscription_id` | `str` |  |

#### Example: Load

```python
acme_domain = client.AcmeDomain().load({"domain_id": 1, "subscription_id": "subscription_id", "sharing_id": "sharing_id"})
```

#### Example: List

```python
acme_domains = client.AcmeDomain().list({"subscription_id": "example", "domain": "example", "sharing_id": "example"})
```


### AcmePrice

Create an instance: `acme_price = client.AcmePrice()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `country` | `str` |  |
| `currency` | `str` |  |
| `domains` | `list` |  |
| `duration` | `str` |  |
| `duration_unit` | `str` |  |
| `grid` | `str` |  |
| `max_duration` | `int` |  |
| `min_duration` | `int` |  |
| `price_after_taxes` | `str` |  |
| `price_before_taxes` | `str` |  |
| `process` | `str` |  |
| `product` | `dict` |  |
| `provider` | `str` |  |
| `tax_rate` | `str` |  |
| `taxes` | `list` |  |
| `validation_type` | `str` |  |

#### Example: List

```python
acme_prices = client.AcmePrice().list({"country": "example", "currency": "example", "duration": "example", "grid": "example", "process": "example", "provider": "example", "sharing_id": "example", "validation_type": "example"})
```

#### Example: Create

```python
acme_price = client.AcmePrice().create({
    "sharing_id": "example_sharing_id",  # str
    "country": "example_country",  # str
    "currency": "example_currency",  # str
    "domains": [],  # list
    "duration": "example_duration",  # str
    "grid": "example_grid",  # str
    "process": "example_process",  # str
    "provider": "example_provider",  # str
    "validation_type": "example_validation_type",  # str
})
```


### AcmeSubscription

Create an instance: `acme_subscription = client.AcmeSubscription()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `country` | `str` |  |
| `created_at` | `str` |  |
| `currency` | `str` |  |
| `domains` | `list` |  |
| `duration` | `int` |  |
| `eab_hmac` | `str` |  |
| `eab_id` | `str` |  |
| `ends_at` | `str` |  |
| `grid` | `str` |  |
| `message` | `str` |  |
| `name` | `str` |  |
| `provider` | `str` |  |
| `server_url` | `str` |  |
| `status` | `str` |  |
| `subscription_id` | `str` |  |
| `validation_type` | `str` |  |
| `years` | `str` |  |

#### Example: Load

```python
acme_subscription = client.AcmeSubscription().load({"subscription_id": "subscription_id", "sharing_id": "sharing_id"})
```

#### Example: List

```python
acme_subscriptions = client.AcmeSubscription().list({"created_at": "example", "ends_at": "example", "name": "example", "provider": "example", "sharing_id": "example", "status": "example", "validation_type": "example", "year": "example"})
```

#### Example: Create

```python
acme_subscription = client.AcmeSubscription().create({
    "sharing_id": "example_sharing_id",  # str
    "country": "example_country",  # str
    "currency": "example_currency",  # str
    "domains": [],  # list
    "duration": 1,  # int
    "grid": "example_grid",  # str
    "name": "example_name",  # str
    "provider": "example_provider",  # str
    "validation_type": "example_validation_type",  # str
})
```


### BillingInfo

Create an instance: `billing_info = client.BillingInfo()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `annual_balance` | `float` |  |
| `grid` | `str` |  |
| `outstanding_amount` | `float` |  |
| `prepaid` | `dict` |  |
| `prepaid_monthly_invoice` | `bool` |  |

#### Example: Load

```python
billing_info = client.BillingInfo().load({"sharing_id": "sharing_id"})
```


### BillingPrice

Create an instance: `billing_price = client.BillingPrice()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `currency` | `str` |  |
| `grid` | `str` |  |
| `products` | `list` |  |
| `taxes` | `list` |  |

#### Example: Load

```python
billing_price = client.BillingPrice().load({"type": "type", "name": [], "process": []})
```


### CertificateDcv

Create an instance: `certificate_dcv = client.CertificateDcv()`

#### Operations

| Method | Description |
| --- | --- |
| `patch(data)` | Change part of an existing entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `message` | `str` |  |
| `method` | `str` |  |


### CertificatePackage

Create an instance: `certificate_package = client.CertificatePackage()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `category` | `dict` |  |
| `href` | `str` |  |
| `max_domains` | `int` |  |
| `min_domains` | `int` |  |
| `name` | `str` |  |
| `provider` | `str` |  |
| `sgc` | `bool` |  |
| `trustlogo` | `bool` |  |
| `warranty` | `int` |  |
| `wildcard` | `bool` |  |

#### Example: Load

```python
certificate_package = client.CertificatePackage().load({"name": "name"})
```

#### Example: List

```python
certificate_packages = client.CertificatePackage().list()
```


### CertificatePem

Create an instance: `certificate_pem = client.CertificatePem()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```python
certificate_pem = client.CertificatePem().load({"type": "type"})
```


### CertificateRenewal

Create an instance: `certificate_renewal = client.CertificateRenewal()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `csr` | `str` |  |
| `dcv_method` | `str` |  |
| `duration` | `int` |  |
| `errors` | `list` |  |
| `status` | `str` |  |

#### Example: Create

```python
certificate_renewal = client.CertificateRenewal().create({
    "certificate_id": "example_certificate_id",  # str
})
```


### CertificateTag

Create an instance: `certificate_tag = client.CertificateTag()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `patch(data)` | Change part of an existing entity. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `add` | `list` |  |
| `message` | `str` |  |
| `remove` | `list` |  |
| `tag` | `str` |  |
| `tags` | `list` |  |

#### Example: List

```python
certificate_tags = client.CertificateTag().list({"certificate_id": "example"})
```

#### Example: Create

```python
certificate_tag = client.CertificateTag().create({
    "certificate_id": "example_certificate_id",  # str
    "tag": "example_tag",  # str
})
```


### Comment

Create an instance: `comment = client.Comment()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `content` | `str` |  |
| `created_at` | `str` |  |
| `errors` | `list` |  |
| `id` | `str` |  |
| `status` | `str` |  |
| `updated_at` | `str` |  |
| `user` | `dict` |  |

#### Example: Load

```python
comment = client.Comment().load({"entity_id": "entity_id"})
```

#### Example: Create

```python
comment = client.Comment().create({
    "entity_id": "example_entity_id",  # str
    "content": "example_content",  # str
})
```


### Domain

Create an instance: `domain = client.Domain()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `admin` | `dict` |  |
| `authinfo` | `str` |  |
| `autorenew` | `dict` |  |
| `bill` | `dict` |  |
| `can_tld_lock` | `bool` |  |
| `claims` | `str` |  |
| `contacts` | `dict` |  |
| `currency` | `str` |  |
| `dates` | `dict` |  |
| `domain_owner` | `str` |  |
| `duration` | `int` |  |
| `enforce_premium` | `bool` |  |
| `errors` | `list` |  |
| `extra_parameters` | `dict` |  |
| `fqdn` | `str` |  |
| `fqdn_unicode` | `str` |  |
| `href` | `str` |  |
| `id` | `str` |  |
| `lang` | `str` |  |
| `mailbox_optin` | `bool` |  |
| `nameserver` | `dict` |  |
| `nameservers` | `list` |  |
| `nameservers_ips` | `dict` |  |
| `orga_owner` | `str` |  |
| `owner` | `dict` |  |
| `price` | `float` |  |
| `reachability` | `str` |  |
| `resellee_id` | `str` |  |
| `services` | `list` |  |
| `sharing_id` | `str` |  |
| `sharing_space` | `dict` |  |
| `smd` | `str` |  |
| `status` | `list` |  |
| `tags` | `list` |  |
| `tech` | `dict` |  |
| `template_id` | `str` |  |
| `tld` | `str` |  |
| `tld_period` | `str` |  |
| `trustee_roles` | `list` |  |

#### Example: Load

```python
domain = client.Domain().load({"fqdn": "fqdn"})
```

#### Example: List

```python
domains = client.Domain().list()
```

#### Example: Create

```python
domain = client.Domain().create({
    "admin": {},  # dict
    "bill": {},  # dict
    "fqdn": "example_fqdn",  # str
    "owner": {},  # dict
    "tech": {},  # dict
})
```


### DomainAvailability

Create an instance: `domain_availability = client.DomainAvailability()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `currency` | `str` |  |
| `grid` | `str` |  |
| `products` | `list` |  |
| `taxes` | `list` |  |

#### Example: Load

```python
domain_availability = client.DomainAvailability().load({"name": "name"})
```


### DomainChangeOwner

Create an instance: `domain_change_owner = client.DomainChangeOwner()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `admin` | `dict` |  |
| `bill` | `dict` |  |
| `created_at` | `str` |  |
| `date_start` | `str` |  |
| `errors` | `list` |  |
| `errortype` | `str` |  |
| `errortype_label` | `str` |  |
| `foa` | `list` |  |
| `inner_step` | `str` |  |
| `owner` | `dict` |  |
| `params` | `dict` |  |
| `status` | `str` |  |
| `step` | `str` |  |
| `step_nb` | `int` |  |
| `tech` | `dict` |  |
| `updated_at` | `str` |  |

#### Example: Load

```python
domain_change_owner = client.DomainChangeOwner().load({"domain": "domain"})
```

#### Example: Create

```python
domain_change_owner = client.DomainChangeOwner().create({
    "domain": "example_domain",  # str
    "admin": {},  # dict
    "bill": {},  # dict
    "owner": {},  # dict
    "tech": {},  # dict
})
```


### DomainClaim

Create an instance: `domain_claim = client.DomainClaim()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `claims` | `list` |  |
| `created_at` | `str` |  |
| `expires_at` | `str` |  |
| `fqdn` | `str` |  |
| `fqdn_alabel` | `str` |  |
| `fqdn_ulabel` | `str` |  |
| `notice_id` | `str` |  |
| `status` | `str` |  |

#### Example: Load

```python
domain_claim = client.DomainClaim().load({"domain": "domain"})
```

#### Example: Create

```python
domain_claim = client.DomainClaim().create({
    "domain": "example_domain",  # str
    "claims": [],  # list
    "created_at": "example_created_at",  # str
    "expires_at": "example_expires_at",  # str
    "fqdn": "example_fqdn",  # str
    "fqdn_alabel": "example_fqdn_alabel",  # str
    "fqdn_ulabel": "example_fqdn_ulabel",  # str
    "notice_id": "example_notice_id",  # str
    "status": "example_status",  # str
})
```


### DomainContact

Create an instance: `domain_contact = client.DomainContact()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `admin` | `dict` |  |
| `bill` | `dict` |  |
| `message` | `str` |  |
| `owner` | `dict` |  |
| `tech` | `dict` |  |

#### Example: Load

```python
domain_contact = client.DomainContact().load({"domain": "domain"})
```


### DomainDnskey

Create an instance: `domain_dnskey = client.DomainDnskey()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `algorithm` | `int` |  |
| `digest` | `str` |  |
| `digest_type` | `int` |  |
| `href` | `str` |  |
| `id` | `int` |  |
| `keys` | `list` |  |
| `keytag` | `int` |  |
| `message` | `str` |  |
| `public_key` | `str` |  |
| `type` | `str` |  |

#### Example: List

```python
domain_dnskeys = client.DomainDnskey().list({"domain": "example"})
```

#### Example: Create

```python
domain_dnskey = client.DomainDnskey().create({
    "domain": "example_domain",  # str
    "algorithm": 1,  # int
    "public_key": "example_public_key",  # str
    "type": "example_type",  # str
})
```


### DomainDnssec

Create an instance: `domain_dnssec = client.DomainDnssec()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `error` | `str` |  |
| `state` | `str` |  |

#### Example: Load

```python
domain_dnssec = client.DomainDnssec().load({"domain": "domain"})
```

#### Example: Create

```python
domain_dnssec = client.DomainDnssec().create({
    "domain": "example_domain",  # str
    "state": "example_state",  # str
})
```


### DomainHost

Create an instance: `domain_host = client.DomainHost()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `fqdn` | `str` |  |
| `fqdn_unicode` | `str` |  |
| `href` | `str` |  |
| `ips` | `list` |  |
| `message` | `str` |  |
| `name` | `str` |  |

#### Example: Load

```python
domain_host = client.DomainHost().load({"domain": "domain", "name": "name"})
```

#### Example: List

```python
domain_hosts = client.DomainHost().list({"domain": "example"})
```

#### Example: Create

```python
domain_host = client.DomainHost().create({
    "domain": "example_domain",  # str
    "ips": [],  # list
    "name": "example_name",  # str
})
```


### DomainLivedns

Create an instance: `domain_livedns = client.DomainLivedns()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `current` | `str` |  |
| `dnssec_available` | `bool` |  |
| `livednssec_available` | `bool` |  |
| `message` | `str` |  |
| `nameservers` | `list` |  |

#### Example: Load

```python
domain_livedns = client.DomainLivedns().load({"domain": "domain"})
```

#### Example: Create

```python
domain_livedns = client.DomainLivedns().create({
    "domain": "example_domain",  # str
    "current": "example_current",  # str
    "message": "example_message",  # str
    "nameservers": [],  # list
})
```


### DomainNameserver

Create an instance: `domain_nameserver = client.DomainNameserver()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `message` | `str` |  |
| `nameservers` | `list` |  |

#### Example: List

```python
domain_nameservers = client.DomainNameserver().list({"domain": "example"})
```


### DomainTag

Create an instance: `domain_tag = client.DomainTag()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `patch(data)` | Change part of an existing entity. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `add` | `list` |  |
| `message` | `str` |  |
| `remove` | `list` |  |
| `tag` | `str` |  |
| `tags` | `list` |  |

#### Example: List

```python
domain_tags = client.DomainTag().list({"domain": "example"})
```

#### Example: Create

```python
domain_tag = client.DomainTag().create({
    "domain": "example_domain",  # str
    "tag": "example_tag",  # str
})
```


### DomainTransfer

Create an instance: `domain_transfer = client.DomainTransfer()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `admin` | `dict` |  |
| `authinfo` | `str` |  |
| `bill` | `dict` |  |
| `change_owner` | `bool` |  |
| `created_at` | `str` |  |
| `currency` | `str` |  |
| `duration` | `int` |  |
| `enforce_premium` | `bool` |  |
| `errors` | `list` |  |
| `errortype` | `str` |  |
| `errortype_label` | `str` |  |
| `extra_parameters` | `dict` |  |
| `foa` | `list` |  |
| `fqdn` | `str` |  |
| `inner_step` | `str` |  |
| `mailbox_optin` | `bool` |  |
| `message` | `str` |  |
| `nameservers` | `list` |  |
| `nameservers_ips` | `dict` |  |
| `owner` | `dict` |  |
| `owner_contact` | `str` |  |
| `params` | `dict` |  |
| `price` | `float` |  |
| `regac_at` | `str` |  |
| `resellee_id` | `str` |  |
| `start_at` | `str` |  |
| `status` | `str` |  |
| `step` | `str` |  |
| `step_nb` | `int` |  |
| `tech` | `dict` |  |
| `template_id` | `str` |  |
| `transfer_link` | `str` |  |
| `transfer_procedure` | `str` |  |
| `updated_at` | `str` |  |

#### Example: Load

```python
domain_transfer = client.DomainTransfer().load({"domain": "domain"})
```

#### Example: Create

```python
domain_transfer = client.DomainTransfer().create({
    "admin": {},  # dict
    "bill": {},  # dict
    "fqdn": "example_fqdn",  # str
    "owner": {},  # dict
    "tech": {},  # dict
})
```


### DomainWebredir

Create an instance: `domain_webredir = client.DomainWebredir()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cert_status` | `str` |  |
| `cert_uuid` | `str` |  |
| `created_at` | `str` |  |
| `host` | `str` |  |
| `message` | `str` |  |
| `override` | `bool` |  |
| `protocol` | `str` |  |
| `type` | `str` |  |
| `updated_at` | `str` |  |
| `url` | `str` |  |

#### Example: Load

```python
domain_webredir = client.DomainWebredir().load({"domain": "domain", "host": "host"})
```

#### Example: List

```python
domain_webredirs = client.DomainWebredir().list({"domain": "example"})
```

#### Example: Create

```python
domain_webredir = client.DomainWebredir().create({
    "domain": "example_domain",  # str
    "host": "example_host",  # str
    "override": True,  # bool
    "protocol": "example_protocol",  # str
    "type": "example_type",  # str
    "url": "example_url",  # str
})
```


### EmailForward

Create an instance: `email_forward = client.EmailForward()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `destinations` | `list` |  |
| `href` | `str` |  |
| `id` | `str` |  |
| `message` | `str` |  |
| `source` | `str` |  |

#### Example: List

```python
email_forwards = client.EmailForward().list({"domain": "example"})
```

#### Example: Create

```python
email_forward = client.EmailForward().create({
    "domain": "example_domain",  # str
    "destinations": [],  # list
    "source": "example_source",  # str
})
```


### EmailMailbox

Create an instance: `email_mailbox = client.EmailMailbox()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `address` | `str` |  |
| `alias_count` | `int` |  |
| `aliases` | `list` |  |
| `antispam` | `bool` |  |
| `autorenew` | `dict` |  |
| `domain` | `str` |  |
| `errors` | `list` |  |
| `expires_at` | `str` |  |
| `fallback_email` | `str` |  |
| `href` | `str` |  |
| `id` | `str` |  |
| `login` | `str` |  |
| `mailbox_type` | `str` |  |
| `message` | `str` |  |
| `password` | `str` |  |
| `quota_used` | `int` |  |
| `responder` | `dict` |  |
| `status` | `str` |  |
| `to_convert` | `bool` |  |

#### Example: Load

```python
email_mailbox = client.EmailMailbox().load({"id": "email_mailbox_id", "domain": "domain"})
```

#### Example: List

```python
email_mailboxs = client.EmailMailbox().list({"domain": "example"})
```

#### Example: Create

```python
email_mailbox = client.EmailMailbox().create({
    "domain": "example_domain",  # str
    "login": "example_login",  # str
    "mailbox_type": "example_mailbox_type",  # str
    "password": "example_password",  # str
})
```


### EmailMigration

Create an instance: `email_migration = client.EmailMigration()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `available` | `bool` |  |
| `currency` | `str` |  |
| `forward_count` | `int` |  |
| `free_mailboxes` | `int` |  |
| `included_mailboxes` | `int` |  |
| `info` | `list` |  |
| `message` | `str` |  |
| `packmail` | `bool` |  |
| `price_v1` | `float` |  |
| `price_v2` | `float` |  |
| `quota_v1` | `float` |  |
| `token` | `str` |  |
| `usage_v1` | `float` |  |

#### Example: Load

```python
email_migration = client.EmailMigration().load({"domain": "domain"})
```

#### Example: Create

```python
email_migration = client.EmailMigration().create({
    "domain": "example_domain",  # str
    "token": "example_token",  # str
})
```


### EmailOffer

Create an instance: `email_offer = client.EmailOffer()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `antispam` | `str` |  |
| `dkim` | `str` |  |
| `message` | `str` |  |
| `status` | `str` |  |
| `version` | `int` |  |

#### Example: Load

```python
email_offer = client.EmailOffer().load({"domain": "domain"})
```


### EmailSlot

Create an instance: `email_slot = client.EmailSlot()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `autorenew` | `bool` |  |
| `capacity` | `int` |  |
| `created_at` | `str` |  |
| `duration` | `int` |  |
| `gandi_id` | `int` |  |
| `href` | `str` |  |
| `id` | `str` |  |
| `mailbox_type` | `str` |  |
| `refund_amount` | `float` |  |
| `refund_currency` | `str` |  |
| `refundable` | `bool` |  |
| `status` | `str` |  |

#### Example: Load

```python
email_slot = client.EmailSlot().load({"id": 1, "domain": "domain"})
```

#### Example: List

```python
email_slots = client.EmailSlot().list({"domain": "example"})
```

#### Example: Create

```python
email_slot = client.EmailSlot().create({
    "domain": "example_domain",  # str
    "duration": 1,  # int
    "mailbox_type": "example_mailbox_type",  # str
})
```


### HostingApplication

Create an instance: `hosting_application = client.HostingApplication()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `name` | `str` |  |
| `name_label` | `str` |  |
| `requirements` | `list` |  |

#### Example: Load

```python
hosting_application = client.HostingApplication().load({"name": "name"})
```

#### Example: List

```python
hosting_applications = client.HostingApplication().list()
```


### HostingInstance

Create an instance: `hosting_instance = client.HostingInstance()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `access_information` | `dict` |  |
| `authentication` | `dict` |  |
| `autorenew` | `dict` |  |
| `available_upgrade` | `bool` |  |
| `booster` | `dict` |  |
| `booster_options` | `dict` |  |
| `compatible_applications` | `list` |  |
| `console` | `dict` |  |
| `cpu` | `int` |  |
| `created_at` | `str` |  |
| `database` | `dict` |  |
| `datacenter` | `dict` |  |
| `domain` | `str` |  |
| `duration` | `int` |  |
| `duration_unit` | `str` |  |
| `errors` | `list` |  |
| `expire_at` | `str` |  |
| `id` | `str` |  |
| `language` | `dict` |  |
| `language_id` | `str` |  |
| `location` | `str` |  |
| `message` | `str` |  |
| `name` | `str` |  |
| `password` | `str` |  |
| `password_updated_at` | `str` |  |
| `ram` | `dict` |  |
| `sharing_space` | `dict` |  |
| `size` | `str` |  |
| `snapshot_enabled` | `bool` |  |
| `status` | `str` |  |
| `storage` | `dict` |  |
| `storage_additional_size` | `int` |  |
| `subscription_cancelled` | `bool` |  |
| `type` | `dict` |  |
| `upgrade_to` | `list` |  |
| `vhosts` | `list` |  |

#### Example: Load

```python
hosting_instance = client.HostingInstance().load({"id": "hosting_instance_id"})
```

#### Example: List

```python
hosting_instances = client.HostingInstance().list()
```

#### Example: Create

```python
hosting_instance = client.HostingInstance().create({
    "authentication": {},  # dict
    "domain": "example_domain",  # str
    "location": "example_location",  # str
    "size": "example_size",  # str
    "type": {},  # dict
})
```


### HostingVhost

Create an instance: `hosting_vhost = client.HostingVhost()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `application` | `dict` |  |
| `created_at` | `str` |  |
| `deployment` | `dict` |  |
| `fqdn` | `str` |  |
| `https_strategy` | `str` |  |
| `is_a_test_vhost` | `bool` |  |
| `linked_dns_zone` | `dict` |  |
| `status` | `str` |  |
| `tls_validated_at` | `str` |  |

#### Example: Load

```python
hosting_vhost = client.HostingVhost().load({"fqdn": "fqdn", "instance_id": "instance_id"})
```

#### Example: List

```python
hosting_vhosts = client.HostingVhost().list({"instance_id": "example"})
```

#### Example: Create

```python
hosting_vhost = client.HostingVhost().create({
    "instance_id": "example_instance_id",  # str
    "application": {},  # dict
    "fqdn": "example_fqdn",  # str
    "linked_dns_zone": {},  # dict
})
```


### IssuedCertificate

Create an instance: `issued_certificate = client.IssuedCertificate()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `altnames` | `list` |  |
| `altnames_unicode` | `list` |  |
| `apex_only` | `bool` |  |
| `assumed_name` | `str` |  |
| `business_category` | `str` |  |
| `card_pay_trustlogo` | `bool` |  |
| `cert` | `str` |  |
| `cn` | `str` |  |
| `cn_unicode` | `str` |  |
| `contact` | `dict` |  |
| `csr` | `str` |  |
| `dates` | `dict` |  |
| `dcv_method` | `str` |  |
| `duration` | `int` |  |
| `error_msg` | `str` |  |
| `errors` | `list` |  |
| `href` | `str` |  |
| `id` | `str` |  |
| `ida` | `dict` |  |
| `intermediate` | `str` |  |
| `joi` | `dict` |  |
| `middleman` | `dict` |  |
| `owner` | `str` |  |
| `package` | `dict` |  |
| `provider` | `str` |  |
| `reissuable` | `bool` |  |
| `renewable` | `bool` |  |
| `resellee_id` | `str` |  |
| `sha_version` | `int` |  |
| `sharing_id` | `str` |  |
| `software` | `int` |  |
| `state` | `str` |  |
| `state_detail` | `str` |  |
| `status` | `str` |  |
| `step_nb` | `int` |  |
| `stored` | `bool` |  |
| `tags` | `list` |  |
| `trustlogo` | `bool` |  |
| `trustlogo_token` | `dict` |  |

#### Example: Load

```python
issued_certificate = client.IssuedCertificate().load({"id": "issued_certificate_id"})
```

#### Example: List

```python
issued_certificates = client.IssuedCertificate().list()
```

#### Example: Create

```python
issued_certificate = client.IssuedCertificate().create({
    "package": {},  # dict
})
```


### LinkedZone

Create an instance: `linked_zone = client.LinkedZone()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `str` |  |
| `default_records` | `bool` |  |
| `domain_count` | `int` |  |
| `domains` | `list` |  |
| `id` | `str` |  |
| `message` | `str` |  |
| `name` | `str` |  |
| `record_list` | `list` |  |
| `record_text` | `str` |  |
| `records` | `list` |  |
| `sharing_space` | `dict` |  |
| `status` | `str` |  |
| `updated_at` | `str` |  |

#### Example: Load

```python
linked_zone = client.LinkedZone().load({"id": "linked_zone_id"})
```

#### Example: List

```python
linked_zones = client.LinkedZone().list()
```

#### Example: Create

```python
linked_zone = client.LinkedZone().create({
    "name": "example_name",  # str
})
```


### LinkedZoneDeployment

Create an instance: `linked_zone_deployment = client.LinkedZoneDeployment()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deploy` | `bool` |  |
| `message` | `str` |  |

#### Example: Create

```python
linked_zone_deployment = client.LinkedZoneDeployment().create({
    "zone_id": "example_zone_id",  # str
    "deploy": True,  # bool
})
```


### LinkedZoneDomain

Create an instance: `linked_zone_domain = client.LinkedZoneDomain()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deployed` | `bool` |  |
| `id` | `str` |  |
| `name` | `str` |  |
| `owner` | `str` |  |
| `zone` | `dict` |  |

#### Example: Load

```python
linked_zone_domain = client.LinkedZoneDomain().load({"name": "name"})
```

#### Example: List

```python
linked_zone_domains = client.LinkedZoneDomain().list()
```


### LinkedZoneTask

Create an instance: `linked_zone_task = client.LinkedZoneTask()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `str` |  |
| `ending_at` | `str` |  |
| `id` | `str` |  |
| `result` | `dict` |  |
| `status` | `str` |  |
| `type` | `str` |  |
| `updated_at` | `str` |  |
| `zone_id` | `str` |  |

#### Example: Load

```python
linked_zone_task = client.LinkedZoneTask().load({"id": "linked_zone_task_id"})
```

#### Example: List

```python
linked_zone_tasks = client.LinkedZoneTask().list()
```


### LivednsAxfrSlave

Create an instance: `livedns_axfr_slave = client.LivednsAxfrSlave()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `message` | `str` |  |

#### Example: List

```python
livedns_axfr_slaves = client.LivednsAxfrSlave().list({"fqdn": "example"})
```


### LivednsAxfrTsig

Create an instance: `livedns_axfr_tsig = client.LivednsAxfrTsig()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `href` | `str` |  |
| `id` | `str` |  |
| `key_name` | `str` |  |
| `message` | `str` |  |

#### Example: List

```python
livedns_axfr_tsigs = client.LivednsAxfrTsig().list({"fqdn": "example"})
```


### LivednsDomain

Create an instance: `livedns_domain = client.LivednsDomain()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `automatic_snapshots` | `bool` |  |
| `domain_href` | `str` |  |
| `domain_keys_href` | `str` |  |
| `domain_records_href` | `str` |  |
| `fqdn` | `str` |  |
| `message` | `str` |  |
| `zone` | `dict` |  |

#### Example: Load

```python
livedns_domain = client.LivednsDomain().load({"fqdn": "fqdn"})
```

#### Example: List

```python
livedns_domains = client.LivednsDomain().list()
```

#### Example: Create

```python
livedns_domain = client.LivednsDomain().create({
    "fqdn": "example_fqdn",  # str
})
```


### LivednsKey

Create an instance: `livedns_key = client.LivednsKey()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `algorithm` | `int` |  |
| `algorithm_name` | `str` |  |
| `deleted` | `bool` |  |
| `ds` | `str` |  |
| `fingerprint` | `str` |  |
| `flags` | `int` |  |
| `fqdn` | `str` |  |
| `id` | `str` |  |
| `key_href` | `str` |  |
| `message` | `str` |  |
| `public_key` | `str` |  |
| `status` | `str` |  |
| `tag` | `int` |  |

#### Example: Load

```python
livedns_key = client.LivednsKey().load({"id": "livedns_key_id", "fqdn": "fqdn"})
```

#### Example: List

```python
livedns_keys = client.LivednsKey().list({"fqdn": "example"})
```

#### Example: Create

```python
livedns_key = client.LivednsKey().create({
    "fqdn": "example_fqdn",  # str
    "flags": 1,  # int
})
```


### LivednsNameserver

Create an instance: `livedns_nameserver = client.LivednsNameserver()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Example: List

```python
livedns_nameservers = client.LivednsNameserver().list({"fqdn": "example"})
```


### LivednsRecord

Create an instance: `livedns_record = client.LivednsRecord()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `patch(data)` | Change part of an existing entity. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `add_rrset_values` | `list` |  |
| `id` | `str` |  |
| `message` | `str` |  |
| `remove_rrset_values` | `list` |  |
| `rrset_href` | `str` |  |
| `rrset_name` | `str` |  |
| `rrset_ttl` | `int` |  |
| `rrset_type` | `str` |  |
| `rrset_values` | `list` |  |

#### Example: Load

```python
livedns_record = client.LivednsRecord().load({"fqdn": "fqdn", "rrset_name": "rrset_name", "rrset_type": "rrset_type"})
```

#### Example: List

```python
livedns_records = client.LivednsRecord().list({"fqdn": "example"})
```

#### Example: Create

```python
livedns_record = client.LivednsRecord().create({
    "fqdn": "example_fqdn",  # str
    "rrset_values": [],  # list
})
```


### LivednsRrtype

Create an instance: `livedns_rrtype = client.LivednsRrtype()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Example: List

```python
livedns_rrtypes = client.LivednsRrtype().list()
```


### LivednsSnapshot

Create an instance: `livedns_snapshot = client.LivednsSnapshot()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `automatic` | `bool` |  |
| `created_at` | `str` |  |
| `href` | `str` |  |
| `id` | `str` |  |
| `message` | `str` |  |
| `name` | `str` |  |
| `zone_data` | `list` |  |

#### Example: Load

```python
livedns_snapshot = client.LivednsSnapshot().load({"id": "livedns_snapshot_id", "fqdn": "fqdn"})
```

#### Example: List

```python
livedns_snapshots = client.LivednsSnapshot().list({"fqdn": "example"})
```

#### Example: Create

```python
livedns_snapshot = client.LivednsSnapshot().create({
    "fqdn": "example_fqdn",  # str
})
```


### LivednsTsigKey

Create an instance: `livedns_tsig_key = client.LivednsTsigKey()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `config_samples` | `dict` |  |
| `href` | `str` |  |
| `id` | `str` |  |
| `key_name` | `str` |  |
| `secret` | `str` |  |

#### Example: Load

```python
livedns_tsig_key = client.LivednsTsigKey().load({"id": "livedns_tsig_key_id"})
```

#### Example: List

```python
livedns_tsig_keys = client.LivednsTsigKey().list()
```

#### Example: Create

```python
livedns_tsig_key = client.LivednsTsigKey().create({
    "config_samples": {},  # dict
    "href": "example_href",  # str
    "id": "example_id",  # str
    "key_name": "example_key_name",  # str
    "secret": "example_secret",  # str
})
```


### Mailbox

Create an instance: `mailbox = client.Mailbox()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `address` | `str` |  |
| `aliases` | `list` |  |
| `antispam` | `bool` |  |
| `autorenew` | `dict` |  |
| `config` | `dict` |  |
| `config_name` | `str` |  |
| `created_at` | `str` |  |
| `data_access` | `bool` |  |
| `domain_part` | `str` |  |
| `duration_month` | `int` |  |
| `email` | `str` |  |
| `expires_at` | `str` |  |
| `internal_domain` | `bool` |  |
| `issues` | `list` |  |
| `last_paid_duration` | `int` |  |
| `local_part` | `str` |  |
| `message` | `str` |  |
| `owner` | `dict` |  |
| `password` | `str` |  |
| `quota` | `int` |  |
| `quota_used` | `int` |  |
| `responder` | `dict` |  |
| `updated_at` | `str` |  |
| `uuid` | `str` |  |

#### Example: Load

```python
mailbox = client.Mailbox().load({"address": "address"})
```

#### Example: List

```python
mailboxs = client.Mailbox().list()
```

#### Example: Create

```python
mailbox = client.Mailbox().create({
    "config_name": "example_config_name",  # str
    "email": "example_email",  # str
    "password": "example_password",  # str
})
```


### MailboxDomain

Create an instance: `mailbox_domain = client.MailboxDomain()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `antispam` | `bool` |  |
| `configuration` | `list` |  |
| `date_last_validation` | `str` |  |
| `dkim` | `bool` |  |
| `fqdns` | `list` |  |
| `internal` | `bool` |  |
| `is_livedns` | `bool` |  |
| `mx` | `bool` |  |
| `owner` | `dict` |  |
| `spf` | `bool` |  |
| `txt` | `bool` |  |

#### Example: Load

```python
mailbox_domain = client.MailboxDomain().load({"domain": "domain"})
```

#### Example: List

```python
mailbox_domains = client.MailboxDomain().list()
```

#### Example: Create

```python
mailbox_domain = client.MailboxDomain().create({
    "domain": "example_domain",  # str
})
```


### MailboxForward

Create an instance: `mailbox_forward = client.MailboxForward()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `destinations` | `list` |  |
| `message` | `str` |  |
| `source` | `str` |  |

#### Example: List

```python
mailbox_forwards = client.MailboxForward().list()
```

#### Example: Create

```python
mailbox_forward = client.MailboxForward().create({
    "destinations": [],  # list
    "source": "example_source",  # str
})
```


### MailboxProduct

Create an instance: `mailbox_product = client.MailboxProduct()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `autorenew` | `bool` |  |
| `config` | `list` |  |
| `config_name` | `str` |  |
| `description` | `str` |  |
| `duration_month` | `int` |  |
| `label` | `str` |  |
| `message` | `str` |  |
| `prices` | `list` |  |
| `quantity` | `int` |  |
| `taxes` | `list` |  |
| `uuid` | `str` |  |

#### Example: List

```python
mailbox_products = client.MailboxProduct().list()
```

#### Example: Create

```python
mailbox_product = client.MailboxProduct().create({
    "config_name": "example_config_name",  # str
    "duration_month": 1,  # int
    "quantity": 1,  # int
})
```


### MailboxQuota

Create an instance: `mailbox_quota = client.MailboxQuota()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `annually` | `dict` |  |
| `config_name` | `str` |  |
| `label` | `str` |  |
| `monthly` | `dict` |  |
| `quota` | `str` |  |

#### Example: List

```python
mailbox_quotas = client.MailboxQuota().list()
```


### MailboxSlot

Create an instance: `mailbox_slot = client.MailboxSlot()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `autorenew` | `dict` |  |
| `config` | `dict` |  |
| `expires_at` | `str` |  |
| `last_paid_duration` | `int` |  |
| `refund_info` | `dict` |  |
| `refundable` | `bool` |  |
| `uuid` | `str` |  |
| `webhosting_pack` | `bool` |  |

#### Example: Load

```python
mailbox_slot = client.MailboxSlot().load({"uuid": "uuid"})
```

#### Example: List

```python
mailbox_slots = client.MailboxSlot().list()
```


### Organization

Create an instance: `organization = client.Organization()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `city` | `str` |  |
| `corporate` | `bool` |  |
| `country` | `str` |  |
| `email` | `str` |  |
| `fax` | `str` |  |
| `firstname` | `str` |  |
| `id` | `str` |  |
| `lang` | `str` |  |
| `lastname` | `str` |  |
| `message` | `str` |  |
| `name` | `str` |  |
| `orgname` | `str` |  |
| `phone` | `str` |  |
| `reference` | `str` |  |
| `reseller` | `bool` |  |
| `siren` | `str` |  |
| `state` | `str` |  |
| `streetaddr` | `str` |  |
| `streetaddr2` | `str` |  |
| `type` | `str` |  |
| `vat_number` | `str` |  |
| `zip` | `str` |  |

#### Example: Load

```python
organization = client.Organization().load({"id": "organization_id"})
```

#### Example: List

```python
organizations = client.Organization().list()
```

#### Example: Create

```python
organization = client.Organization().create({
    "city": "example_city",  # str
    "email": "example_email",  # str
    "firstname": "example_firstname",  # str
    "lastname": "example_lastname",  # str
    "name": "example_name",  # str
    "orgname": "example_orgname",  # str
    "phone": "example_phone",  # str
    "streetaddr": "example_streetaddr",  # str
    "type": "example_type",  # str
})
```


### OrganizationCustomer

Create an instance: `organization_customer = client.OrganizationCustomer()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `city` | `str` |  |
| `country` | `str` |  |
| `email` | `str` |  |
| `fax` | `str` |  |
| `firstname` | `str` |  |
| `id` | `str` |  |
| `lang` | `str` |  |
| `lastname` | `str` |  |
| `message` | `str` |  |
| `name` | `str` |  |
| `orgname` | `str` |  |
| `phone` | `str` |  |
| `reference` | `str` |  |
| `siren` | `str` |  |
| `state` | `str` |  |
| `streetaddr` | `str` |  |
| `streetaddr2` | `str` |  |
| `sync_contact_email` | `str` |  |
| `type` | `str` |  |
| `vat_number` | `str` |  |
| `zip` | `str` |  |

#### Example: Load

```python
organization_customer = client.OrganizationCustomer().load({"id": "organization_customer_id", "org_id": "org_id"})
```

#### Example: List

```python
organization_customers = client.OrganizationCustomer().list({"org_id": "example"})
```

#### Example: Create

```python
organization_customer = client.OrganizationCustomer().create({
    "org_id": "example_org_id",  # str
    "city": "example_city",  # str
    "country": "example_country",  # str
    "email": "example_email",  # str
    "firstname": "example_firstname",  # str
    "lastname": "example_lastname",  # str
    "phone": "example_phone",  # str
    "streetaddr": "example_streetaddr",  # str
    "type": "example_type",  # str
})
```


### Template

Create an instance: `template = client.Template()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `str` |  |
| `editable` | `bool` |  |
| `href` | `str` |  |
| `id` | `str` |  |
| `name` | `str` |  |
| `namespaces` | `list` |  |
| `orgname` | `str` |  |
| `payload` | `dict` |  |
| `sharing_space` | `dict` |  |
| `variables` | `list` |  |

#### Example: Load

```python
template = client.Template().load({"id": "template_id"})
```

#### Example: List

```python
templates = client.Template().list()
```

#### Example: Create

```python
template = client.Template().create({
    "name": "example_name",  # str
    "payload": {},  # dict
})
```


### TemplateDispatch

Create an instance: `template_dispatch = client.TemplateDispatch()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attempt` | `int` |  |
| `created_at` | `str` |  |
| `dispatch_href` | `str` |  |
| `id` | `str` |  |
| `message` | `str` |  |
| `object_id` | `str` |  |
| `object_type` | `str` |  |
| `payload` | `dict` |  |
| `sharing_id` | `str` |  |
| `state` | `int` |  |
| `state_msg` | `str` |  |
| `target` | `dict` |  |
| `target_id` | `str` |  |
| `target_type` | `str` |  |
| `task_history` | `list` |  |
| `task_status` | `dict` |  |
| `task_updated_at` | `str` |  |
| `template_id` | `str` |  |
| `template_name` | `str` |  |

#### Example: Load

```python
template_dispatch = client.TemplateDispatch().load({"id": "template_dispatch_id"})
```

#### Example: Create

```python
template_dispatch = client.TemplateDispatch().create({
    "template_id": "example_template_id",  # str
    "object_id": "example_object_id",  # str
    "object_type": "example_object_type",  # str
})
```


### Tld

Create an instance: `tld = client.Tld()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `authinfo_for_transfer` | `bool` |  |
| `category` | `str` |  |
| `change_owner` | `bool` |  |
| `corporate` | `bool` |  |
| `ext_trade` | `bool` |  |
| `full_tld` | `str` |  |
| `href` | `str` |  |
| `lock` | `bool` |  |
| `name` | `str` |  |

#### Example: Load

```python
tld = client.Tld().load({"name": "name"})
```

#### Example: List

```python
tlds = client.Tld().list()
```


### User

Create an instance: `user = client.User()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `city` | `str` |  |
| `country` | `str` |  |
| `email` | `str` |  |
| `fax` | `str` |  |
| `firstname` | `str` |  |
| `id` | `str` |  |
| `lang` | `str` |  |
| `lastname` | `str` |  |
| `name` | `str` |  |
| `phone` | `str` |  |
| `state` | `str` |  |
| `streetaddr` | `str` |  |
| `streetaddr2` | `str` |  |
| `username` | `str` |  |
| `zip` | `str` |  |

#### Example: Load

```python
user = client.User().load({"id": "user_id"})
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

Features are the extension mechanism. A feature is a Python class
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

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── gandi_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── schema.py                    -- Generated option + entity specs
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`gandi_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```python
livednsdomain = client.LivednsDomain()
livednsdomain.list()

# livednsdomain.data_get() now returns the livednsdomain data from the last list
# livednsdomain.match_get() returns the last match criteria
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
