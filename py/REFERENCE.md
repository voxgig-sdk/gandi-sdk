# Gandi Python SDK Reference

Complete API reference for the Gandi Python SDK.


## GandiSDK

### Constructor

```python
from gandi_sdk import GandiSDK

client = GandiSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["apikey"]` | `str` | API key for authentication. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `GandiSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = GandiSDK.test()
```


### Instance Methods

#### `AccessToken(data=None)`

Create a new `AccessTokenEntity` instance. Pass `None` for no initial data.

#### `AcmeAccount(data=None)`

Create a new `AcmeAccountEntity` instance. Pass `None` for no initial data.

#### `AcmeDomain(data=None)`

Create a new `AcmeDomainEntity` instance. Pass `None` for no initial data.

#### `AcmePrice(data=None)`

Create a new `AcmePriceEntity` instance. Pass `None` for no initial data.

#### `AcmeSubscription(data=None)`

Create a new `AcmeSubscriptionEntity` instance. Pass `None` for no initial data.

#### `BillingInfo(data=None)`

Create a new `BillingInfoEntity` instance. Pass `None` for no initial data.

#### `BillingPrice(data=None)`

Create a new `BillingPriceEntity` instance. Pass `None` for no initial data.

#### `CertificateDcv(data=None)`

Create a new `CertificateDcvEntity` instance. Pass `None` for no initial data.

#### `CertificatePackage(data=None)`

Create a new `CertificatePackageEntity` instance. Pass `None` for no initial data.

#### `CertificatePem(data=None)`

Create a new `CertificatePemEntity` instance. Pass `None` for no initial data.

#### `CertificateRenewal(data=None)`

Create a new `CertificateRenewalEntity` instance. Pass `None` for no initial data.

#### `CertificateTag(data=None)`

Create a new `CertificateTagEntity` instance. Pass `None` for no initial data.

#### `Comment(data=None)`

Create a new `CommentEntity` instance. Pass `None` for no initial data.

#### `Domain(data=None)`

Create a new `DomainEntity` instance. Pass `None` for no initial data.

#### `DomainAvailability(data=None)`

Create a new `DomainAvailabilityEntity` instance. Pass `None` for no initial data.

#### `DomainChangeOwner(data=None)`

Create a new `DomainChangeOwnerEntity` instance. Pass `None` for no initial data.

#### `DomainClaim(data=None)`

Create a new `DomainClaimEntity` instance. Pass `None` for no initial data.

#### `DomainContact(data=None)`

Create a new `DomainContactEntity` instance. Pass `None` for no initial data.

#### `DomainDnskey(data=None)`

Create a new `DomainDnskeyEntity` instance. Pass `None` for no initial data.

#### `DomainDnssec(data=None)`

Create a new `DomainDnssecEntity` instance. Pass `None` for no initial data.

#### `DomainHost(data=None)`

Create a new `DomainHostEntity` instance. Pass `None` for no initial data.

#### `DomainLivedns(data=None)`

Create a new `DomainLivednsEntity` instance. Pass `None` for no initial data.

#### `DomainNameserver(data=None)`

Create a new `DomainNameserverEntity` instance. Pass `None` for no initial data.

#### `DomainTag(data=None)`

Create a new `DomainTagEntity` instance. Pass `None` for no initial data.

#### `DomainTransfer(data=None)`

Create a new `DomainTransferEntity` instance. Pass `None` for no initial data.

#### `DomainWebredir(data=None)`

Create a new `DomainWebredirEntity` instance. Pass `None` for no initial data.

#### `EmailForward(data=None)`

Create a new `EmailForwardEntity` instance. Pass `None` for no initial data.

#### `EmailMailbox(data=None)`

Create a new `EmailMailboxEntity` instance. Pass `None` for no initial data.

#### `EmailMigration(data=None)`

Create a new `EmailMigrationEntity` instance. Pass `None` for no initial data.

#### `EmailOffer(data=None)`

Create a new `EmailOfferEntity` instance. Pass `None` for no initial data.

#### `EmailSlot(data=None)`

Create a new `EmailSlotEntity` instance. Pass `None` for no initial data.

#### `HostingApplication(data=None)`

Create a new `HostingApplicationEntity` instance. Pass `None` for no initial data.

#### `HostingInstance(data=None)`

Create a new `HostingInstanceEntity` instance. Pass `None` for no initial data.

#### `HostingVhost(data=None)`

Create a new `HostingVhostEntity` instance. Pass `None` for no initial data.

#### `IssuedCertificate(data=None)`

Create a new `IssuedCertificateEntity` instance. Pass `None` for no initial data.

#### `LinkedZone(data=None)`

Create a new `LinkedZoneEntity` instance. Pass `None` for no initial data.

#### `LinkedZoneDeployment(data=None)`

Create a new `LinkedZoneDeploymentEntity` instance. Pass `None` for no initial data.

#### `LinkedZoneDomain(data=None)`

Create a new `LinkedZoneDomainEntity` instance. Pass `None` for no initial data.

#### `LinkedZoneTask(data=None)`

Create a new `LinkedZoneTaskEntity` instance. Pass `None` for no initial data.

#### `LivednsAxfrSlave(data=None)`

Create a new `LivednsAxfrSlaveEntity` instance. Pass `None` for no initial data.

#### `LivednsAxfrTsig(data=None)`

Create a new `LivednsAxfrTsigEntity` instance. Pass `None` for no initial data.

#### `LivednsDomain(data=None)`

Create a new `LivednsDomainEntity` instance. Pass `None` for no initial data.

#### `LivednsKey(data=None)`

Create a new `LivednsKeyEntity` instance. Pass `None` for no initial data.

#### `LivednsNameserver(data=None)`

Create a new `LivednsNameserverEntity` instance. Pass `None` for no initial data.

#### `LivednsRecord(data=None)`

Create a new `LivednsRecordEntity` instance. Pass `None` for no initial data.

#### `LivednsRrtype(data=None)`

Create a new `LivednsRrtypeEntity` instance. Pass `None` for no initial data.

#### `LivednsSnapshot(data=None)`

Create a new `LivednsSnapshotEntity` instance. Pass `None` for no initial data.

#### `LivednsTsigKey(data=None)`

Create a new `LivednsTsigKeyEntity` instance. Pass `None` for no initial data.

#### `LivednsZone(data=None)`

Create a new `LivednsZoneEntity` instance. Pass `None` for no initial data.

#### `Mailbox(data=None)`

Create a new `MailboxEntity` instance. Pass `None` for no initial data.

#### `MailboxDomain(data=None)`

Create a new `MailboxDomainEntity` instance. Pass `None` for no initial data.

#### `MailboxForward(data=None)`

Create a new `MailboxForwardEntity` instance. Pass `None` for no initial data.

#### `MailboxProduct(data=None)`

Create a new `MailboxProductEntity` instance. Pass `None` for no initial data.

#### `MailboxQuota(data=None)`

Create a new `MailboxQuotaEntity` instance. Pass `None` for no initial data.

#### `MailboxSlot(data=None)`

Create a new `MailboxSlotEntity` instance. Pass `None` for no initial data.

#### `Organization(data=None)`

Create a new `OrganizationEntity` instance. Pass `None` for no initial data.

#### `OrganizationCustomer(data=None)`

Create a new `OrganizationCustomerEntity` instance. Pass `None` for no initial data.

#### `Template(data=None)`

Create a new `TemplateEntity` instance. Pass `None` for no initial data.

#### `TemplateDispatch(data=None)`

Create a new `TemplateDispatchEntity` instance. Pass `None` for no initial data.

#### `Tld(data=None)`

Create a new `TldEntity` instance. Pass `None` for no initial data.

#### `User(data=None)`

Create a new `UserEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## AccessTokenEntity

```python
access_token = client.AccessToken()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `access_token` | `str` | Yes |  |
| `entities` | `list` | Yes |  |
| `expires_at` | `str` | Yes |  |
| `id` | `str` | Yes |  |
| `name` | `str` | Yes |  |
| `scopes` | `list` | Yes |  |

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

#### `create(reqdata, ctrl=None) -> AccessTokenEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.AccessToken().create({
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AccessTokenEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AcmeAccountEntity

```python
acme_account = client.AcmeAccount()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `str` | Yes |  |
| `deleted_at` | `str` | Yes |  |
| `external_id` | `str` | Yes |  |
| `id` | `str` | Yes |  |
| `ip` | `str` | Yes |  |
| `last_activity` | `str` | Yes |  |
| `status` | `str` | Yes |  |
| `subscription_id` | `str` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[AcmeAccountEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.AcmeAccount().list({"subscription_id": "example", "sharing_id": "example"})
for acme_account in results:
    print(acme_account.data_get())
```

#### `load(reqmatch, ctrl=None) -> AcmeAccountEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.AcmeAccount().load({"id": "acme_account_id", "subscription_id": "subscription_id", "sharing_id": "sharing_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AcmeAccountEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AcmeDomainEntity

```python
acme_domain = client.AcmeDomain()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `str` | Yes |  |
| `deleted_at` | `str` | Yes |  |
| `hostname` | `str` | Yes |  |
| `hostname_ulabel` | `str` | Yes |  |
| `is_wildcard` | `bool` | Yes |  |
| `status` | `str` | Yes |  |
| `subscription_id` | `str` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[AcmeDomainEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.AcmeDomain().list({"subscription_id": "example", "domain": "example", "sharing_id": "example"})
for acme_domain in results:
    print(acme_domain.data_get())
```

#### `load(reqmatch, ctrl=None) -> AcmeDomainEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.AcmeDomain().load({"domain_id": 1, "subscription_id": "subscription_id", "sharing_id": "sharing_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AcmeDomainEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AcmePriceEntity

```python
acme_price = client.AcmePrice()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `country` | `str` | Yes |  |
| `currency` | `str` | Yes |  |
| `domains` | `list` | Yes |  |
| `duration` | `str` | Yes |  |
| `duration_unit` | `str` | Yes |  |
| `grid` | `str` | Yes |  |
| `max_duration` | `int` | Yes |  |
| `min_duration` | `int` | Yes |  |
| `price_after_taxes` | `str` | Yes |  |
| `price_before_taxes` | `str` | Yes |  |
| `process` | `str` | Yes |  |
| `product` | `dict` | Yes |  |
| `provider` | `str` | Yes |  |
| `tax_rate` | `str` | Yes |  |
| `taxes` | `list` | Yes |  |
| `validation_type` | `str` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> AcmePriceEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.AcmePrice().create({
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

#### `list(reqmatch=None, ctrl=None) -> list[AcmePriceEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.AcmePrice().list({"country": "example", "currency": "example", "duration": "example", "grid": "example", "process": "example", "provider": "example", "sharing_id": "example", "validation_type": "example"})
for acme_price in results:
    print(acme_price.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AcmePriceEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AcmeSubscriptionEntity

```python
acme_subscription = client.AcmeSubscription()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `country` | `str` | Yes |  |
| `created_at` | `str` | Yes |  |
| `currency` | `str` | Yes |  |
| `domains` | `list` | Yes |  |
| `duration` | `int` | Yes |  |
| `eab_hmac` | `str` | Yes |  |
| `eab_id` | `str` | Yes |  |
| `ends_at` | `str` | Yes |  |
| `grid` | `str` | Yes |  |
| `message` | `str` | Yes |  |
| `name` | `str` | Yes |  |
| `provider` | `str` | Yes |  |
| `server_url` | `str` | Yes |  |
| `status` | `str` | Yes |  |
| `subscription_id` | `str` | Yes |  |
| `validation_type` | `str` | Yes |  |
| `years` | `str` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> AcmeSubscriptionEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.AcmeSubscription().create({
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

#### `list(reqmatch=None, ctrl=None) -> list[AcmeSubscriptionEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.AcmeSubscription().list({"created_at": "example", "ends_at": "example", "name": "example", "provider": "example", "sharing_id": "example", "status": "example", "validation_type": "example", "year": "example"})
for acme_subscription in results:
    print(acme_subscription.data_get())
```

#### `load(reqmatch, ctrl=None) -> AcmeSubscriptionEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.AcmeSubscription().load({"subscription_id": "subscription_id", "sharing_id": "sharing_id"})
```

#### `remove(reqmatch, ctrl=None) -> AcmeSubscriptionEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.AcmeSubscription().remove({"subscription_id": "subscription_id", "sharing_id": "sharing_id"})
```

#### `update(reqdata, ctrl=None) -> AcmeSubscriptionEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.AcmeSubscription().update({
    "subscription_id": "subscription_id",
    "sharing_id": "sharing_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AcmeSubscriptionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## BillingInfoEntity

```python
billing_info = client.BillingInfo()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `annual_balance` | `float` | Yes |  |
| `grid` | `str` | Yes |  |
| `outstanding_amount` | `float` | Yes |  |
| `prepaid` | `dict` | Yes |  |
| `prepaid_monthly_invoice` | `bool` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> BillingInfoEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.BillingInfo().load({"sharing_id": "sharing_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BillingInfoEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## BillingPriceEntity

```python
billing_price = client.BillingPrice()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `currency` | `str` | Yes |  |
| `grid` | `str` | Yes |  |
| `products` | `list` | Yes |  |
| `taxes` | `list` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> BillingPriceEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.BillingPrice().load({"type": "type", "name": [], "process": []})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BillingPriceEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CertificateDcvEntity

```python
certificate_dcv = client.CertificateDcv()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `message` | `str` | Yes |  |
| `method` | `str` | Yes |  |

### Operations

#### `patch(reqdata, ctrl=None) -> CertificateDcvEntity`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and raises on error.

```python
result = client.CertificateDcv().patch({
    "certificate_id": "certificate_id",
    # Only the fields to change
})
```

#### `update(reqdata, ctrl=None) -> CertificateDcvEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.CertificateDcv().update({
    "certificate_id": "certificate_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CertificateDcvEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CertificatePackageEntity

```python
certificate_package = client.CertificatePackage()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `category` | `dict` | Yes |  |
| `href` | `str` | Yes |  |
| `max_domains` | `int` | Yes |  |
| `min_domains` | `int` | Yes |  |
| `name` | `str` | Yes |  |
| `provider` | `str` | Yes |  |
| `sgc` | `bool` | Yes |  |
| `trustlogo` | `bool` | Yes |  |
| `warranty` | `int` | Yes |  |
| `wildcard` | `bool` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[CertificatePackageEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.CertificatePackage().list()
for certificate_package in results:
    print(certificate_package.data_get())
```

#### `load(reqmatch, ctrl=None) -> CertificatePackageEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.CertificatePackage().load({"name": "name"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CertificatePackageEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CertificatePemEntity

```python
certificate_pem = client.CertificatePem()
```

### Operations

#### `load(reqmatch, ctrl=None) -> CertificatePemEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.CertificatePem().load({"type": "type"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CertificatePemEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CertificateRenewalEntity

```python
certificate_renewal = client.CertificateRenewal()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `csr` | `str` | No |  |
| `dcv_method` | `str` | No |  |
| `duration` | `int` | No |  |
| `errors` | `list` | No |  |
| `status` | `str` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> CertificateRenewalEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.CertificateRenewal().create({
    "certificate_id": "example_certificate_id",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CertificateRenewalEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CertificateTagEntity

```python
certificate_tag = client.CertificateTag()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `add` | `list` | Yes |  |
| `message` | `str` | Yes |  |
| `remove` | `list` | Yes |  |
| `tag` | `str` | Yes |  |
| `tags` | `list` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> CertificateTagEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.CertificateTag().create({
    "certificate_id": "example_certificate_id",  # str
    "tag": "example_tag",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[CertificateTagEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.CertificateTag().list({"certificate_id": "example"})
for certificate_tag in results:
    print(certificate_tag.data_get())
```

#### `patch(reqdata, ctrl=None) -> CertificateTagEntity`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and raises on error.

```python
result = client.CertificateTag().patch({
    "certificate_id": "certificate_id",
    # Only the fields to change
})
```

#### `remove(reqmatch, ctrl=None) -> CertificateTagEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.CertificateTag().remove({"certificate_id": "certificate_id"})
```

#### `update(reqdata, ctrl=None) -> CertificateTagEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.CertificateTag().update({
    "certificate_id": "certificate_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CertificateTagEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CommentEntity

```python
comment = client.Comment()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `content` | `str` | Yes |  |
| `created_at` | `str` | No |  |
| `errors` | `list` | No |  |
| `id` | `str` | Yes |  |
| `status` | `str` | Yes |  |
| `updated_at` | `str` | No |  |
| `user` | `dict` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> CommentEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Comment().create({
    "entity_id": "example_entity_id",  # str
    "content": "example_content",  # str
})
```

#### `load(reqmatch, ctrl=None) -> CommentEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Comment().load({"entity_id": "entity_id"})
```

#### `remove(reqmatch, ctrl=None) -> CommentEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.Comment().remove({"entity_id": "entity_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CommentEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DomainEntity

```python
domain = client.Domain()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `admin` | `dict` | Yes |  |
| `authinfo` | `str` | No |  |
| `autorenew` | `dict` | Yes |  |
| `bill` | `dict` | Yes |  |
| `can_tld_lock` | `bool` | Yes |  |
| `claims` | `str` | No |  |
| `contacts` | `dict` | Yes |  |
| `currency` | `str` | No |  |
| `dates` | `dict` | Yes |  |
| `domain_owner` | `str` | Yes |  |
| `duration` | `int` | No |  |
| `enforce_premium` | `bool` | No |  |
| `errors` | `list` | No |  |
| `extra_parameters` | `dict` | No |  |
| `fqdn` | `str` | Yes |  |
| `fqdn_unicode` | `str` | Yes |  |
| `href` | `str` | Yes |  |
| `id` | `str` | No |  |
| `lang` | `str` | No |  |
| `mailbox_optin` | `bool` | No |  |
| `nameserver` | `dict` | Yes |  |
| `nameservers` | `list` | Yes |  |
| `nameservers_ips` | `dict` | No |  |
| `orga_owner` | `str` | Yes |  |
| `owner` | `dict` | Yes |  |
| `price` | `float` | No |  |
| `reachability` | `str` | Yes |  |
| `resellee_id` | `str` | No |  |
| `services` | `list` | Yes |  |
| `sharing_id` | `str` | No |  |
| `sharing_space` | `dict` | Yes |  |
| `smd` | `str` | No |  |
| `status` | `list` | Yes |  |
| `tags` | `list` | No |  |
| `tech` | `dict` | Yes |  |
| `template_id` | `str` | No |  |
| `tld` | `str` | Yes |  |
| `tld_period` | `str` | No |  |
| `trustee_roles` | `list` | No |  |

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

#### `create(reqdata, ctrl=None) -> DomainEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Domain().create({
    "admin": {},  # dict
    "bill": {},  # dict
    "fqdn": "example_fqdn",  # str
    "owner": {},  # dict
    "tech": {},  # dict
})
```

#### `list(reqmatch=None, ctrl=None) -> list[DomainEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Domain().list()
for domain in results:
    print(domain.data_get())
```

#### `load(reqmatch, ctrl=None) -> DomainEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Domain().load({"fqdn": "fqdn"})
```

#### `remove(reqmatch, ctrl=None) -> DomainEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.Domain().remove({"fqdn": "fqdn"})
```

#### `update(reqdata, ctrl=None) -> DomainEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DomainEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DomainAvailabilityEntity

```python
domain_availability = client.DomainAvailability()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `currency` | `str` | Yes |  |
| `grid` | `str` | Yes |  |
| `products` | `list` | Yes |  |
| `taxes` | `list` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> DomainAvailabilityEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.DomainAvailability().load({"name": "name"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DomainAvailabilityEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DomainChangeOwnerEntity

```python
domain_change_owner = client.DomainChangeOwner()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `admin` | `dict` | Yes |  |
| `bill` | `dict` | Yes |  |
| `created_at` | `str` | Yes |  |
| `date_start` | `str` | No |  |
| `errors` | `list` | No |  |
| `errortype` | `str` | No |  |
| `errortype_label` | `str` | No |  |
| `foa` | `list` | No |  |
| `inner_step` | `str` | No |  |
| `owner` | `dict` | Yes |  |
| `params` | `dict` | Yes |  |
| `status` | `str` | Yes |  |
| `step` | `str` | Yes |  |
| `step_nb` | `int` | Yes |  |
| `tech` | `dict` | Yes |  |
| `updated_at` | `str` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> DomainChangeOwnerEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.DomainChangeOwner().create({
    "domain": "example_domain",  # str
    "admin": {},  # dict
    "bill": {},  # dict
    "owner": {},  # dict
    "tech": {},  # dict
})
```

#### `load(reqmatch, ctrl=None) -> DomainChangeOwnerEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.DomainChangeOwner().load({"domain": "domain"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DomainChangeOwnerEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DomainClaimEntity

```python
domain_claim = client.DomainClaim()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `claims` | `list` | Yes |  |
| `created_at` | `str` | Yes |  |
| `expires_at` | `str` | Yes |  |
| `fqdn` | `str` | Yes |  |
| `fqdn_alabel` | `str` | Yes |  |
| `fqdn_ulabel` | `str` | Yes |  |
| `notice_id` | `str` | Yes |  |
| `status` | `str` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> DomainClaimEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.DomainClaim().create({
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

#### `load(reqmatch, ctrl=None) -> DomainClaimEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.DomainClaim().load({"domain": "domain"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DomainClaimEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DomainContactEntity

```python
domain_contact = client.DomainContact()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `admin` | `dict` | Yes |  |
| `bill` | `dict` | Yes |  |
| `message` | `str` | Yes |  |
| `owner` | `dict` | Yes |  |
| `tech` | `dict` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> DomainContactEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.DomainContact().load({"domain": "domain"})
```

#### `update(reqdata, ctrl=None) -> DomainContactEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.DomainContact().update({
    "domain": "domain",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DomainContactEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DomainDnskeyEntity

```python
domain_dnskey = client.DomainDnskey()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `algorithm` | `int` | Yes |  |
| `digest` | `str` | Yes |  |
| `digest_type` | `int` | Yes |  |
| `href` | `str` | Yes |  |
| `id` | `int` | Yes |  |
| `keys` | `list` | Yes |  |
| `keytag` | `int` | Yes |  |
| `message` | `str` | Yes |  |
| `public_key` | `str` | Yes |  |
| `type` | `str` | Yes |  |

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

#### `create(reqdata, ctrl=None) -> DomainDnskeyEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.DomainDnskey().create({
    "domain": "example_domain",  # str
    "algorithm": 1,  # int
    "public_key": "example_public_key",  # str
    "type": "example_type",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[DomainDnskeyEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.DomainDnskey().list({"domain": "example"})
for domain_dnskey in results:
    print(domain_dnskey.data_get())
```

#### `remove(reqmatch, ctrl=None) -> DomainDnskeyEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.DomainDnskey().remove({"id": "domain_dnskey_id", "domain": "domain"})
```

#### `update(reqdata, ctrl=None) -> DomainDnskeyEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.DomainDnskey().update({
    "domain": "domain",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DomainDnskeyEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DomainDnssecEntity

```python
domain_dnssec = client.DomainDnssec()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `error` | `str` | No |  |
| `state` | `str` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> DomainDnssecEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.DomainDnssec().create({
    "domain": "example_domain",  # str
    "state": "example_state",  # str
})
```

#### `load(reqmatch, ctrl=None) -> DomainDnssecEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.DomainDnssec().load({"domain": "domain"})
```

#### `remove(reqmatch, ctrl=None) -> DomainDnssecEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.DomainDnssec().remove({"domain": "domain"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DomainDnssecEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DomainHostEntity

```python
domain_host = client.DomainHost()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `fqdn` | `str` | Yes |  |
| `fqdn_unicode` | `str` | Yes |  |
| `href` | `str` | Yes |  |
| `ips` | `list` | Yes |  |
| `message` | `str` | Yes |  |
| `name` | `str` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> DomainHostEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.DomainHost().create({
    "domain": "example_domain",  # str
    "ips": [],  # list
    "name": "example_name",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[DomainHostEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.DomainHost().list({"domain": "example"})
for domain_host in results:
    print(domain_host.data_get())
```

#### `load(reqmatch, ctrl=None) -> DomainHostEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.DomainHost().load({"domain": "domain", "name": "name"})
```

#### `remove(reqmatch, ctrl=None) -> DomainHostEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.DomainHost().remove({"domain": "domain", "name": "name"})
```

#### `update(reqdata, ctrl=None) -> DomainHostEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.DomainHost().update({
    "domain": "domain",
    "name": "name",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DomainHostEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DomainLivednsEntity

```python
domain_livedns = client.DomainLivedns()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `current` | `str` | Yes |  |
| `dnssec_available` | `bool` | No |  |
| `livednssec_available` | `bool` | No |  |
| `message` | `str` | Yes |  |
| `nameservers` | `list` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> DomainLivednsEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.DomainLivedns().create({
    "domain": "example_domain",  # str
    "current": "example_current",  # str
    "message": "example_message",  # str
    "nameservers": [],  # list
})
```

#### `load(reqmatch, ctrl=None) -> DomainLivednsEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.DomainLivedns().load({"domain": "domain"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DomainLivednsEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DomainNameserverEntity

```python
domain_nameserver = client.DomainNameserver()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `message` | `str` | Yes |  |
| `nameservers` | `list` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[DomainNameserverEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.DomainNameserver().list({"domain": "example"})
for domain_nameserver in results:
    print(domain_nameserver.data_get())
```

#### `update(reqdata, ctrl=None) -> DomainNameserverEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.DomainNameserver().update({
    "domain": "domain",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DomainNameserverEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DomainTagEntity

```python
domain_tag = client.DomainTag()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `add` | `list` | Yes |  |
| `message` | `str` | Yes |  |
| `remove` | `list` | Yes |  |
| `tag` | `str` | Yes |  |
| `tags` | `list` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> DomainTagEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.DomainTag().create({
    "domain": "example_domain",  # str
    "tag": "example_tag",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[DomainTagEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.DomainTag().list({"domain": "example"})
for domain_tag in results:
    print(domain_tag.data_get())
```

#### `patch(reqdata, ctrl=None) -> DomainTagEntity`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and raises on error.

```python
result = client.DomainTag().patch({
    "domain": "domain",
    # Only the fields to change
})
```

#### `remove(reqmatch, ctrl=None) -> DomainTagEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.DomainTag().remove({"domain": "domain"})
```

#### `update(reqdata, ctrl=None) -> DomainTagEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.DomainTag().update({
    "domain": "domain",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DomainTagEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DomainTransferEntity

```python
domain_transfer = client.DomainTransfer()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `admin` | `dict` | Yes |  |
| `authinfo` | `str` | No |  |
| `bill` | `dict` | Yes |  |
| `change_owner` | `bool` | No |  |
| `created_at` | `str` | Yes |  |
| `currency` | `str` | No |  |
| `duration` | `int` | No |  |
| `enforce_premium` | `bool` | No |  |
| `errors` | `list` | No |  |
| `errortype` | `str` | No |  |
| `errortype_label` | `str` | No |  |
| `extra_parameters` | `dict` | No |  |
| `foa` | `list` | No |  |
| `fqdn` | `str` | Yes |  |
| `inner_step` | `str` | No |  |
| `mailbox_optin` | `bool` | No |  |
| `message` | `str` | Yes |  |
| `nameservers` | `list` | No |  |
| `nameservers_ips` | `dict` | No |  |
| `owner` | `dict` | Yes |  |
| `owner_contact` | `str` | Yes |  |
| `params` | `dict` | Yes |  |
| `price` | `float` | No |  |
| `regac_at` | `str` | No |  |
| `resellee_id` | `str` | No |  |
| `start_at` | `str` | No |  |
| `status` | `str` | Yes |  |
| `step` | `str` | Yes |  |
| `step_nb` | `int` | Yes |  |
| `tech` | `dict` | Yes |  |
| `template_id` | `str` | No |  |
| `transfer_link` | `str` | No |  |
| `transfer_procedure` | `str` | No |  |
| `updated_at` | `str` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> DomainTransferEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.DomainTransfer().create({
    "admin": {},  # dict
    "bill": {},  # dict
    "fqdn": "example_fqdn",  # str
    "owner": {},  # dict
    "tech": {},  # dict
})
```

#### `load(reqmatch, ctrl=None) -> DomainTransferEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.DomainTransfer().load({"domain": "domain"})
```

#### `update(reqdata, ctrl=None) -> DomainTransferEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.DomainTransfer().update({
    "domain": "domain",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DomainTransferEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DomainWebredirEntity

```python
domain_webredir = client.DomainWebredir()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cert_status` | `str` | No |  |
| `cert_uuid` | `str` | No |  |
| `created_at` | `str` | No |  |
| `host` | `str` | Yes |  |
| `message` | `str` | Yes |  |
| `override` | `bool` | Yes |  |
| `protocol` | `str` | No |  |
| `type` | `str` | Yes |  |
| `updated_at` | `str` | No |  |
| `url` | `str` | Yes |  |

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

#### `create(reqdata, ctrl=None) -> DomainWebredirEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.DomainWebredir().create({
    "domain": "example_domain",  # str
    "host": "example_host",  # str
    "override": True,  # bool
    "protocol": "example_protocol",  # str
    "type": "example_type",  # str
    "url": "example_url",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[DomainWebredirEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.DomainWebredir().list({"domain": "example"})
for domain_webredir in results:
    print(domain_webredir.data_get())
```

#### `load(reqmatch, ctrl=None) -> DomainWebredirEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.DomainWebredir().load({"domain": "domain", "host": "host"})
```

#### `remove(reqmatch, ctrl=None) -> DomainWebredirEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.DomainWebredir().remove({"domain": "domain", "host": "host"})
```

#### `update(reqdata, ctrl=None) -> DomainWebredirEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.DomainWebredir().update({
    "domain": "domain",
    "host": "host",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DomainWebredirEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## EmailForwardEntity

```python
email_forward = client.EmailForward()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `destinations` | `list` | Yes |  |
| `href` | `str` | Yes |  |
| `id` | `str` | No |  |
| `message` | `str` | Yes |  |
| `source` | `str` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> EmailForwardEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.EmailForward().create({
    "domain": "example_domain",  # str
    "destinations": [],  # list
    "source": "example_source",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[EmailForwardEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.EmailForward().list({"domain": "example"})
for email_forward in results:
    print(email_forward.data_get())
```

#### `remove(reqmatch, ctrl=None) -> EmailForwardEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.EmailForward().remove({"domain": "domain", "source": "source"})
```

#### `update(reqdata, ctrl=None) -> EmailForwardEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.EmailForward().update({
    "domain": "domain",
    "source": "source",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EmailForwardEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## EmailMailboxEntity

```python
email_mailbox = client.EmailMailbox()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | `str` | Yes |  |
| `alias_count` | `int` | No |  |
| `aliases` | `list` | Yes |  |
| `antispam` | `bool` | Yes |  |
| `autorenew` | `dict` | Yes |  |
| `domain` | `str` | Yes |  |
| `errors` | `list` | No |  |
| `expires_at` | `str` | Yes |  |
| `fallback_email` | `str` | No |  |
| `href` | `str` | Yes |  |
| `id` | `str` | Yes |  |
| `login` | `str` | Yes |  |
| `mailbox_type` | `str` | Yes |  |
| `message` | `str` | Yes |  |
| `password` | `str` | Yes |  |
| `quota_used` | `int` | Yes |  |
| `responder` | `dict` | No |  |
| `status` | `str` | Yes |  |
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

#### `create(reqdata, ctrl=None) -> EmailMailboxEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.EmailMailbox().create({
    "domain": "example_domain",  # str
    "login": "example_login",  # str
    "mailbox_type": "example_mailbox_type",  # str
    "password": "example_password",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[EmailMailboxEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.EmailMailbox().list({"domain": "example"})
for email_mailbox in results:
    print(email_mailbox.data_get())
```

#### `load(reqmatch, ctrl=None) -> EmailMailboxEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.EmailMailbox().load({"id": "email_mailbox_id", "domain": "domain"})
```

#### `remove(reqmatch, ctrl=None) -> EmailMailboxEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.EmailMailbox().remove({"id": "email_mailbox_id", "domain": "domain"})
```

#### `update(reqdata, ctrl=None) -> EmailMailboxEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.EmailMailbox().update({
    "id": "email_mailbox_id",
    "domain": "domain",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EmailMailboxEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## EmailMigrationEntity

```python
email_migration = client.EmailMigration()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `available` | `bool` | Yes |  |
| `currency` | `str` | Yes |  |
| `forward_count` | `int` | Yes |  |
| `free_mailboxes` | `int` | Yes |  |
| `included_mailboxes` | `int` | Yes |  |
| `info` | `list` | Yes |  |
| `message` | `str` | Yes |  |
| `packmail` | `bool` | Yes |  |
| `price_v1` | `float` | Yes |  |
| `price_v2` | `float` | Yes |  |
| `quota_v1` | `float` | Yes |  |
| `token` | `str` | Yes |  |
| `usage_v1` | `float` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> EmailMigrationEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.EmailMigration().create({
    "domain": "example_domain",  # str
    "token": "example_token",  # str
})
```

#### `load(reqmatch, ctrl=None) -> EmailMigrationEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.EmailMigration().load({"domain": "domain"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EmailMigrationEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## EmailOfferEntity

```python
email_offer = client.EmailOffer()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `antispam` | `str` | Yes |  |
| `dkim` | `str` | Yes |  |
| `message` | `str` | Yes |  |
| `status` | `str` | Yes |  |
| `version` | `int` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> EmailOfferEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.EmailOffer().load({"domain": "domain"})
```

#### `update(reqdata, ctrl=None) -> EmailOfferEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.EmailOffer().update({
    "domain": "domain",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EmailOfferEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## EmailSlotEntity

```python
email_slot = client.EmailSlot()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `autorenew` | `bool` | No |  |
| `capacity` | `int` | Yes |  |
| `created_at` | `str` | Yes |  |
| `duration` | `int` | Yes |  |
| `gandi_id` | `int` | Yes |  |
| `href` | `str` | Yes |  |
| `id` | `str` | Yes |  |
| `mailbox_type` | `str` | Yes |  |
| `refund_amount` | `float` | No |  |
| `refund_currency` | `str` | No |  |
| `refundable` | `bool` | Yes |  |
| `status` | `str` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> EmailSlotEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.EmailSlot().create({
    "domain": "example_domain",  # str
    "duration": 1,  # int
    "mailbox_type": "example_mailbox_type",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[EmailSlotEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.EmailSlot().list({"domain": "example"})
for email_slot in results:
    print(email_slot.data_get())
```

#### `load(reqmatch, ctrl=None) -> EmailSlotEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.EmailSlot().load({"id": 1, "domain": "domain"})
```

#### `remove(reqmatch, ctrl=None) -> EmailSlotEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.EmailSlot().remove({"id": 1, "domain": "domain"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EmailSlotEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## HostingApplicationEntity

```python
hosting_application = client.HostingApplication()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `str` | Yes |  |
| `name_label` | `str` | Yes |  |
| `requirements` | `list` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[HostingApplicationEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.HostingApplication().list()
for hosting_application in results:
    print(hosting_application.data_get())
```

#### `load(reqmatch, ctrl=None) -> HostingApplicationEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.HostingApplication().load({"name": "name"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `HostingApplicationEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## HostingInstanceEntity

```python
hosting_instance = client.HostingInstance()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `access_information` | `dict` | Yes |  |
| `authentication` | `dict` | Yes |  |
| `autorenew` | `dict` | Yes |  |
| `available_upgrade` | `bool` | Yes |  |
| `booster` | `dict` | No |  |
| `booster_options` | `dict` | No |  |
| `compatible_applications` | `list` | No |  |
| `console` | `dict` | Yes |  |
| `cpu` | `int` | Yes |  |
| `created_at` | `str` | Yes |  |
| `database` | `dict` | Yes |  |
| `datacenter` | `dict` | Yes |  |
| `domain` | `str` | No |  |
| `duration` | `int` | No |  |
| `duration_unit` | `str` | No |  |
| `errors` | `list` | No |  |
| `expire_at` | `str` | Yes |  |
| `id` | `str` | Yes |  |
| `language` | `dict` | Yes |  |
| `language_id` | `str` | No |  |
| `location` | `str` | Yes |  |
| `message` | `str` | Yes |  |
| `name` | `str` | Yes |  |
| `password` | `str` | No |  |
| `password_updated_at` | `str` | No |  |
| `ram` | `dict` | Yes |  |
| `sharing_space` | `dict` | Yes |  |
| `size` | `str` | Yes |  |
| `snapshot_enabled` | `bool` | Yes |  |
| `status` | `str` | Yes |  |
| `storage` | `dict` | Yes |  |
| `storage_additional_size` | `int` | No |  |
| `subscription_cancelled` | `bool` | No |  |
| `type` | `dict` | Yes |  |
| `upgrade_to` | `list` | No |  |
| `vhosts` | `list` | Yes |  |

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

#### `create(reqdata, ctrl=None) -> HostingInstanceEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.HostingInstance().create({
    "authentication": {},  # dict
    "domain": "example_domain",  # str
    "location": "example_location",  # str
    "size": "example_size",  # str
    "type": {},  # dict
})
```

#### `list(reqmatch=None, ctrl=None) -> list[HostingInstanceEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.HostingInstance().list()
for hosting_instance in results:
    print(hosting_instance.data_get())
```

#### `load(reqmatch, ctrl=None) -> HostingInstanceEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.HostingInstance().load({"id": "hosting_instance_id"})
```

#### `remove(reqmatch, ctrl=None) -> HostingInstanceEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.HostingInstance().remove({"id": "hosting_instance_id"})
```

#### `update(reqdata, ctrl=None) -> HostingInstanceEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.HostingInstance().update({
    "id": "hosting_instance_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `HostingInstanceEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## HostingVhostEntity

```python
hosting_vhost = client.HostingVhost()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `application` | `dict` | Yes |  |
| `created_at` | `str` | Yes |  |
| `deployment` | `dict` | Yes |  |
| `fqdn` | `str` | Yes |  |
| `https_strategy` | `str` | No |  |
| `is_a_test_vhost` | `bool` | Yes |  |
| `linked_dns_zone` | `dict` | Yes |  |
| `status` | `str` | Yes |  |
| `tls_validated_at` | `str` | No |  |

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

#### `create(reqdata, ctrl=None) -> HostingVhostEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.HostingVhost().create({
    "instance_id": "example_instance_id",  # str
    "application": {},  # dict
    "fqdn": "example_fqdn",  # str
    "linked_dns_zone": {},  # dict
})
```

#### `list(reqmatch=None, ctrl=None) -> list[HostingVhostEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.HostingVhost().list({"instance_id": "example"})
for hosting_vhost in results:
    print(hosting_vhost.data_get())
```

#### `load(reqmatch, ctrl=None) -> HostingVhostEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.HostingVhost().load({"fqdn": "fqdn", "instance_id": "instance_id"})
```

#### `remove(reqmatch, ctrl=None) -> HostingVhostEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.HostingVhost().remove({"fqdn": "fqdn", "instance_id": "instance_id"})
```

#### `update(reqdata, ctrl=None) -> HostingVhostEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.HostingVhost().update({
    "fqdn": "fqdn",
    "instance_id": "instance_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `HostingVhostEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## IssuedCertificateEntity

```python
issued_certificate = client.IssuedCertificate()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `altnames` | `list` | Yes |  |
| `altnames_unicode` | `list` | Yes |  |
| `apex_only` | `bool` | No |  |
| `assumed_name` | `str` | No |  |
| `business_category` | `str` | No |  |
| `card_pay_trustlogo` | `bool` | No |  |
| `cert` | `str` | No |  |
| `cn` | `str` | Yes |  |
| `cn_unicode` | `str` | Yes |  |
| `contact` | `dict` | Yes |  |
| `csr` | `str` | No |  |
| `dates` | `dict` | Yes |  |
| `dcv_method` | `str` | No |  |
| `duration` | `int` | No |  |
| `error_msg` | `str` | No |  |
| `errors` | `list` | No |  |
| `href` | `str` | No |  |
| `id` | `str` | Yes |  |
| `ida` | `dict` | No |  |
| `intermediate` | `str` | No |  |
| `joi` | `dict` | No |  |
| `middleman` | `dict` | No |  |
| `owner` | `str` | No |  |
| `package` | `dict` | Yes |  |
| `provider` | `str` | Yes |  |
| `reissuable` | `bool` | No |  |
| `renewable` | `bool` | No |  |
| `resellee_id` | `str` | No |  |
| `sha_version` | `int` | No |  |
| `sharing_id` | `str` | No |  |
| `software` | `int` | Yes |  |
| `state` | `str` | No |  |
| `state_detail` | `str` | No |  |
| `status` | `str` | Yes |  |
| `step_nb` | `int` | No |  |
| `stored` | `bool` | No |  |
| `tags` | `list` | No |  |
| `trustlogo` | `bool` | No |  |
| `trustlogo_token` | `dict` | No |  |

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

#### `create(reqdata, ctrl=None) -> IssuedCertificateEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.IssuedCertificate().create({
    "package": {},  # dict
})
```

#### `list(reqmatch=None, ctrl=None) -> list[IssuedCertificateEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.IssuedCertificate().list()
for issued_certificate in results:
    print(issued_certificate.data_get())
```

#### `load(reqmatch, ctrl=None) -> IssuedCertificateEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.IssuedCertificate().load({"id": "issued_certificate_id"})
```

#### `remove(reqmatch, ctrl=None) -> IssuedCertificateEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.IssuedCertificate().remove({"id": "issued_certificate_id"})
```

#### `update(reqdata, ctrl=None) -> IssuedCertificateEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.IssuedCertificate().update({
    "id": "issued_certificate_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `IssuedCertificateEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## LinkedZoneEntity

```python
linked_zone = client.LinkedZone()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `str` | Yes |  |
| `default_records` | `bool` | Yes |  |
| `domain_count` | `int` | Yes |  |
| `domains` | `list` | No |  |
| `id` | `str` | Yes |  |
| `message` | `str` | Yes |  |
| `name` | `str` | Yes |  |
| `record_list` | `list` | No |  |
| `record_text` | `str` | No |  |
| `records` | `list` | No |  |
| `sharing_space` | `dict` | Yes |  |
| `status` | `str` | Yes |  |
| `updated_at` | `str` | No |  |

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

#### `create(reqdata, ctrl=None) -> LinkedZoneEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.LinkedZone().create({
    "name": "example_name",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[LinkedZoneEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.LinkedZone().list()
for linked_zone in results:
    print(linked_zone.data_get())
```

#### `load(reqmatch, ctrl=None) -> LinkedZoneEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.LinkedZone().load({"id": "linked_zone_id"})
```

#### `remove(reqmatch, ctrl=None) -> LinkedZoneEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.LinkedZone().remove({"id": "linked_zone_id"})
```

#### `update(reqdata, ctrl=None) -> LinkedZoneEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.LinkedZone().update({
    "id": "linked_zone_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LinkedZoneEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## LinkedZoneDeploymentEntity

```python
linked_zone_deployment = client.LinkedZoneDeployment()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deploy` | `bool` | Yes |  |
| `message` | `str` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> LinkedZoneDeploymentEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.LinkedZoneDeployment().create({
    "zone_id": "example_zone_id",  # str
    "deploy": True,  # bool
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LinkedZoneDeploymentEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## LinkedZoneDomainEntity

```python
linked_zone_domain = client.LinkedZoneDomain()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deployed` | `bool` | Yes |  |
| `id` | `str` | Yes |  |
| `name` | `str` | Yes |  |
| `owner` | `str` | Yes |  |
| `zone` | `dict` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[LinkedZoneDomainEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.LinkedZoneDomain().list()
for linked_zone_domain in results:
    print(linked_zone_domain.data_get())
```

#### `load(reqmatch, ctrl=None) -> LinkedZoneDomainEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.LinkedZoneDomain().load({"name": "name"})
```

#### `update(reqdata, ctrl=None) -> LinkedZoneDomainEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LinkedZoneDomainEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## LinkedZoneTaskEntity

```python
linked_zone_task = client.LinkedZoneTask()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `str` | Yes |  |
| `ending_at` | `str` | No |  |
| `id` | `str` | Yes |  |
| `result` | `dict` | Yes |  |
| `status` | `str` | Yes |  |
| `type` | `str` | Yes |  |
| `updated_at` | `str` | No |  |
| `zone_id` | `str` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[LinkedZoneTaskEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.LinkedZoneTask().list()
for linked_zone_task in results:
    print(linked_zone_task.data_get())
```

#### `load(reqmatch, ctrl=None) -> LinkedZoneTaskEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.LinkedZoneTask().load({"id": "linked_zone_task_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LinkedZoneTaskEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## LivednsAxfrSlaveEntity

```python
livedns_axfr_slave = client.LivednsAxfrSlave()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `message` | `str` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[LivednsAxfrSlaveEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.LivednsAxfrSlave().list({"fqdn": "example"})
for livedns_axfr_slave in results:
    print(livedns_axfr_slave.data_get())
```

#### `remove(reqmatch, ctrl=None) -> LivednsAxfrSlaveEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.LivednsAxfrSlave().remove({"fqdn": "fqdn", "ip": "ip"})
```

#### `update(reqdata, ctrl=None) -> LivednsAxfrSlaveEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.LivednsAxfrSlave().update({
    "fqdn": "fqdn",
    "ip": "ip",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LivednsAxfrSlaveEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## LivednsAxfrTsigEntity

```python
livedns_axfr_tsig = client.LivednsAxfrTsig()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `href` | `str` | Yes |  |
| `id` | `str` | Yes |  |
| `key_name` | `str` | Yes |  |
| `message` | `str` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[LivednsAxfrTsigEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.LivednsAxfrTsig().list({"fqdn": "example"})
for livedns_axfr_tsig in results:
    print(livedns_axfr_tsig.data_get())
```

#### `remove(reqmatch, ctrl=None) -> LivednsAxfrTsigEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.LivednsAxfrTsig().remove({"id": "livedns_axfr_tsig_id", "fqdn": "fqdn"})
```

#### `update(reqdata, ctrl=None) -> LivednsAxfrTsigEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.LivednsAxfrTsig().update({
    "id": "livedns_axfr_tsig_id",
    "fqdn": "fqdn",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LivednsAxfrTsigEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## LivednsDomainEntity

```python
livedns_domain = client.LivednsDomain()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `automatic_snapshots` | `bool` | Yes |  |
| `domain_href` | `str` | Yes |  |
| `domain_keys_href` | `str` | Yes |  |
| `domain_records_href` | `str` | Yes |  |
| `fqdn` | `str` | Yes |  |
| `message` | `str` | Yes |  |
| `zone` | `dict` | No |  |

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

#### `create(reqdata, ctrl=None) -> LivednsDomainEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.LivednsDomain().create({
    "fqdn": "example_fqdn",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[LivednsDomainEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.LivednsDomain().list()
for livedns_domain in results:
    print(livedns_domain.data_get())
```

#### `load(reqmatch, ctrl=None) -> LivednsDomainEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.LivednsDomain().load({"fqdn": "fqdn"})
```

#### `update(reqdata, ctrl=None) -> LivednsDomainEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.LivednsDomain().update({
    "fqdn": "fqdn",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LivednsDomainEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## LivednsKeyEntity

```python
livedns_key = client.LivednsKey()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `algorithm` | `int` | Yes |  |
| `algorithm_name` | `str` | Yes |  |
| `deleted` | `bool` | Yes |  |
| `ds` | `str` | Yes |  |
| `fingerprint` | `str` | Yes |  |
| `flags` | `int` | Yes |  |
| `fqdn` | `str` | Yes |  |
| `id` | `str` | Yes |  |
| `key_href` | `str` | Yes |  |
| `message` | `str` | Yes |  |
| `public_key` | `str` | Yes |  |
| `status` | `str` | Yes |  |
| `tag` | `int` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> LivednsKeyEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.LivednsKey().create({
    "fqdn": "example_fqdn",  # str
    "flags": 1,  # int
})
```

#### `list(reqmatch=None, ctrl=None) -> list[LivednsKeyEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.LivednsKey().list({"fqdn": "example"})
for livedns_key in results:
    print(livedns_key.data_get())
```

#### `load(reqmatch, ctrl=None) -> LivednsKeyEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.LivednsKey().load({"id": "livedns_key_id", "fqdn": "fqdn"})
```

#### `remove(reqmatch, ctrl=None) -> LivednsKeyEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.LivednsKey().remove({"id": "livedns_key_id", "fqdn": "fqdn"})
```

#### `update(reqdata, ctrl=None) -> LivednsKeyEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.LivednsKey().update({
    "id": "livedns_key_id",
    "fqdn": "fqdn",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LivednsKeyEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## LivednsNameserverEntity

```python
livedns_nameserver = client.LivednsNameserver()
```

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[LivednsNameserverEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.LivednsNameserver().list({"fqdn": "example"})
for livedns_nameserver in results:
    print(livedns_nameserver.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LivednsNameserverEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## LivednsRecordEntity

```python
livedns_record = client.LivednsRecord()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `add_rrset_values` | `list` | No |  |
| `id` | `str` | No |  |
| `message` | `str` | Yes |  |
| `remove_rrset_values` | `list` | No |  |
| `rrset_href` | `str` | Yes |  |
| `rrset_name` | `str` | Yes |  |
| `rrset_ttl` | `int` | No |  |
| `rrset_type` | `str` | Yes |  |
| `rrset_values` | `list` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> LivednsRecordEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.LivednsRecord().create({
    "fqdn": "example_fqdn",  # str
    "rrset_values": [],  # list
})
```

#### `list(reqmatch=None, ctrl=None) -> list[LivednsRecordEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.LivednsRecord().list({"fqdn": "example"})
for livedns_record in results:
    print(livedns_record.data_get())
```

#### `load(reqmatch, ctrl=None) -> LivednsRecordEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.LivednsRecord().load({"fqdn": "fqdn", "rrset_name": "rrset_name", "rrset_type": "rrset_type"})
```

#### `patch(reqdata, ctrl=None) -> LivednsRecordEntity`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity and raises on error.

```python
result = client.LivednsRecord().patch({
    "fqdn": "fqdn",
    "rrset_name": "rrset_name",
    "rrset_type": "rrset_type",
    # Only the fields to change
})
```

#### `remove(reqmatch, ctrl=None) -> LivednsRecordEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.LivednsRecord().remove({"fqdn": "fqdn", "rrset_name": "rrset_name", "rrset_type": "rrset_type"})
```

#### `update(reqdata, ctrl=None) -> LivednsRecordEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.LivednsRecord().update({
    "fqdn": "fqdn",
    "rrset_name": "rrset_name",
    "rrset_type": "rrset_type",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LivednsRecordEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## LivednsRrtypeEntity

```python
livedns_rrtype = client.LivednsRrtype()
```

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[LivednsRrtypeEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.LivednsRrtype().list()
for livedns_rrtype in results:
    print(livedns_rrtype.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LivednsRrtypeEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## LivednsSnapshotEntity

```python
livedns_snapshot = client.LivednsSnapshot()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `automatic` | `bool` | Yes |  |
| `created_at` | `str` | Yes |  |
| `href` | `str` | Yes |  |
| `id` | `str` | Yes |  |
| `message` | `str` | Yes |  |
| `name` | `str` | Yes |  |
| `zone_data` | `list` | Yes |  |

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

#### `create(reqdata, ctrl=None) -> LivednsSnapshotEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.LivednsSnapshot().create({
    "fqdn": "example_fqdn",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[LivednsSnapshotEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.LivednsSnapshot().list({"fqdn": "example"})
for livedns_snapshot in results:
    print(livedns_snapshot.data_get())
```

#### `load(reqmatch, ctrl=None) -> LivednsSnapshotEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.LivednsSnapshot().load({"id": "livedns_snapshot_id", "fqdn": "fqdn"})
```

#### `remove(reqmatch, ctrl=None) -> LivednsSnapshotEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.LivednsSnapshot().remove({"id": "livedns_snapshot_id", "fqdn": "fqdn"})
```

#### `update(reqdata, ctrl=None) -> LivednsSnapshotEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.LivednsSnapshot().update({
    "id": "livedns_snapshot_id",
    "fqdn": "fqdn",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LivednsSnapshotEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## LivednsTsigKeyEntity

```python
livedns_tsig_key = client.LivednsTsigKey()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `config_samples` | `dict` | Yes |  |
| `href` | `str` | Yes |  |
| `id` | `str` | Yes |  |
| `key_name` | `str` | Yes |  |
| `secret` | `str` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> LivednsTsigKeyEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.LivednsTsigKey().create({
    "config_samples": {},  # dict
    "href": "example_href",  # str
    "id": "example_id",  # str
    "key_name": "example_key_name",  # str
    "secret": "example_secret",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[LivednsTsigKeyEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.LivednsTsigKey().list()
for livedns_tsig_key in results:
    print(livedns_tsig_key.data_get())
```

#### `load(reqmatch, ctrl=None) -> LivednsTsigKeyEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.LivednsTsigKey().load({"id": "livedns_tsig_key_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LivednsTsigKeyEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## LivednsZoneEntity

```python
livedns_zone = client.LivednsZone()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `items` | `list` | Yes |  |
| `message` | `str` | Yes |  |
| `remove_apex_ns` | `bool` | No |  |

### Operations

#### `remove(reqmatch, ctrl=None) -> LivednsZoneEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.LivednsZone().remove({"fqdn": "fqdn"})
```

#### `update(reqdata, ctrl=None) -> LivednsZoneEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.LivednsZone().update({
    "fqdn": "fqdn",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LivednsZoneEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## MailboxEntity

```python
mailbox = client.Mailbox()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | `str` | Yes |  |
| `aliases` | `list` | No |  |
| `antispam` | `bool` | Yes |  |
| `autorenew` | `dict` | Yes |  |
| `config` | `dict` | Yes |  |
| `config_name` | `str` | Yes |  |
| `created_at` | `str` | Yes |  |
| `data_access` | `bool` | Yes |  |
| `domain_part` | `str` | Yes |  |
| `duration_month` | `int` | No |  |
| `email` | `str` | Yes |  |
| `expires_at` | `str` | Yes |  |
| `internal_domain` | `bool` | Yes |  |
| `issues` | `list` | No |  |
| `last_paid_duration` | `int` | Yes |  |
| `local_part` | `str` | Yes |  |
| `message` | `str` | Yes |  |
| `owner` | `dict` | Yes |  |
| `password` | `str` | Yes |  |
| `quota` | `int` | Yes |  |
| `quota_used` | `int` | Yes |  |
| `responder` | `dict` | Yes |  |
| `updated_at` | `str` | Yes |  |
| `uuid` | `str` | Yes |  |

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

#### `create(reqdata, ctrl=None) -> MailboxEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Mailbox().create({
    "config_name": "example_config_name",  # str
    "email": "example_email",  # str
    "password": "example_password",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[MailboxEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Mailbox().list()
for mailbox in results:
    print(mailbox.data_get())
```

#### `load(reqmatch, ctrl=None) -> MailboxEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Mailbox().load({"address": "address"})
```

#### `remove(reqmatch, ctrl=None) -> MailboxEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.Mailbox().remove({"address": "address"})
```

#### `update(reqdata, ctrl=None) -> MailboxEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.Mailbox().update({
    "address": "address",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MailboxEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## MailboxDomainEntity

```python
mailbox_domain = client.MailboxDomain()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `antispam` | `bool` | Yes |  |
| `configuration` | `list` | Yes |  |
| `date_last_validation` | `str` | No |  |
| `dkim` | `bool` | Yes |  |
| `fqdns` | `list` | Yes |  |
| `internal` | `bool` | Yes |  |
| `is_livedns` | `bool` | Yes |  |
| `mx` | `bool` | Yes |  |
| `owner` | `dict` | Yes |  |
| `spf` | `bool` | Yes |  |
| `txt` | `bool` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> MailboxDomainEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.MailboxDomain().create({
    "domain": "example_domain",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[MailboxDomainEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.MailboxDomain().list()
for mailbox_domain in results:
    print(mailbox_domain.data_get())
```

#### `load(reqmatch, ctrl=None) -> MailboxDomainEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.MailboxDomain().load({"domain": "domain"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MailboxDomainEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## MailboxForwardEntity

```python
mailbox_forward = client.MailboxForward()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `destinations` | `list` | Yes |  |
| `message` | `str` | Yes |  |
| `source` | `str` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> MailboxForwardEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.MailboxForward().create({
    "destinations": [],  # list
    "source": "example_source",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[MailboxForwardEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.MailboxForward().list()
for mailbox_forward in results:
    print(mailbox_forward.data_get())
```

#### `remove(reqmatch, ctrl=None) -> MailboxForwardEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.MailboxForward().remove({"source": "source"})
```

#### `update(reqdata, ctrl=None) -> MailboxForwardEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.MailboxForward().update({
    "source": "source",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MailboxForwardEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## MailboxProductEntity

```python
mailbox_product = client.MailboxProduct()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `autorenew` | `bool` | No |  |
| `config` | `list` | Yes |  |
| `config_name` | `str` | Yes |  |
| `description` | `str` | Yes |  |
| `duration_month` | `int` | Yes |  |
| `label` | `str` | Yes |  |
| `message` | `str` | Yes |  |
| `prices` | `list` | Yes |  |
| `quantity` | `int` | Yes |  |
| `taxes` | `list` | Yes |  |
| `uuid` | `str` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> MailboxProductEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.MailboxProduct().create({
    "config_name": "example_config_name",  # str
    "duration_month": 1,  # int
    "quantity": 1,  # int
})
```

#### `list(reqmatch=None, ctrl=None) -> list[MailboxProductEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.MailboxProduct().list()
for mailbox_product in results:
    print(mailbox_product.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MailboxProductEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## MailboxQuotaEntity

```python
mailbox_quota = client.MailboxQuota()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `annually` | `dict` | Yes |  |
| `config_name` | `str` | Yes |  |
| `label` | `str` | Yes |  |
| `monthly` | `dict` | Yes |  |
| `quota` | `str` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[MailboxQuotaEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.MailboxQuota().list()
for mailbox_quota in results:
    print(mailbox_quota.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MailboxQuotaEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## MailboxSlotEntity

```python
mailbox_slot = client.MailboxSlot()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `autorenew` | `dict` | Yes |  |
| `config` | `dict` | Yes |  |
| `expires_at` | `str` | No |  |
| `last_paid_duration` | `int` | No |  |
| `refund_info` | `dict` | Yes |  |
| `refundable` | `bool` | Yes |  |
| `uuid` | `str` | Yes |  |
| `webhosting_pack` | `bool` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[MailboxSlotEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.MailboxSlot().list()
for mailbox_slot in results:
    print(mailbox_slot.data_get())
```

#### `load(reqmatch, ctrl=None) -> MailboxSlotEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.MailboxSlot().load({"uuid": "uuid"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MailboxSlotEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## OrganizationEntity

```python
organization = client.Organization()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `city` | `str` | Yes |  |
| `corporate` | `bool` | Yes |  |
| `country` | `str` | Yes |  |
| `email` | `str` | Yes |  |
| `fax` | `str` | No |  |
| `firstname` | `str` | Yes |  |
| `id` | `str` | Yes |  |
| `lang` | `str` | No |  |
| `lastname` | `str` | Yes |  |
| `message` | `str` | Yes |  |
| `name` | `str` | Yes |  |
| `orgname` | `str` | No |  |
| `phone` | `str` | No |  |
| `reference` | `str` | No |  |
| `reseller` | `bool` | Yes |  |
| `siren` | `str` | No |  |
| `state` | `str` | No |  |
| `streetaddr` | `str` | Yes |  |
| `streetaddr2` | `str` | No |  |
| `type` | `str` | Yes |  |
| `vat_number` | `str` | No |  |
| `zip` | `str` | Yes |  |

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

#### `create(reqdata, ctrl=None) -> OrganizationEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Organization().create({
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

#### `list(reqmatch=None, ctrl=None) -> list[OrganizationEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Organization().list()
for organization in results:
    print(organization.data_get())
```

#### `load(reqmatch, ctrl=None) -> OrganizationEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Organization().load({"id": "organization_id"})
```

#### `remove(reqmatch, ctrl=None) -> OrganizationEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.Organization().remove({"id": "organization_id"})
```

#### `update(reqdata, ctrl=None) -> OrganizationEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.Organization().update({
    "id": "organization_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `OrganizationEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## OrganizationCustomerEntity

```python
organization_customer = client.OrganizationCustomer()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `city` | `str` | Yes |  |
| `country` | `str` | Yes |  |
| `email` | `str` | Yes |  |
| `fax` | `str` | No |  |
| `firstname` | `str` | Yes |  |
| `id` | `str` | Yes |  |
| `lang` | `str` | No |  |
| `lastname` | `str` | Yes |  |
| `message` | `str` | Yes |  |
| `name` | `str` | Yes |  |
| `orgname` | `str` | No |  |
| `phone` | `str` | No |  |
| `reference` | `str` | No |  |
| `siren` | `str` | No |  |
| `state` | `str` | No |  |
| `streetaddr` | `str` | Yes |  |
| `streetaddr2` | `str` | No |  |
| `sync_contact_email` | `str` | No |  |
| `type` | `str` | Yes |  |
| `vat_number` | `str` | No |  |
| `zip` | `str` | No |  |

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

#### `create(reqdata, ctrl=None) -> OrganizationCustomerEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.OrganizationCustomer().create({
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

#### `list(reqmatch=None, ctrl=None) -> list[OrganizationCustomerEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.OrganizationCustomer().list({"org_id": "example"})
for organization_customer in results:
    print(organization_customer.data_get())
```

#### `load(reqmatch, ctrl=None) -> OrganizationCustomerEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.OrganizationCustomer().load({"id": "organization_customer_id", "org_id": "org_id"})
```

#### `remove(reqmatch, ctrl=None) -> OrganizationCustomerEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.OrganizationCustomer().remove({"id": "organization_customer_id", "org_id": "org_id"})
```

#### `update(reqdata, ctrl=None) -> OrganizationCustomerEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.OrganizationCustomer().update({
    "id": "organization_customer_id",
    "org_id": "org_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `OrganizationCustomerEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## TemplateEntity

```python
template = client.Template()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `str` | Yes |  |
| `editable` | `bool` | Yes |  |
| `href` | `str` | Yes |  |
| `id` | `str` | Yes |  |
| `name` | `str` | Yes |  |
| `namespaces` | `list` | Yes |  |
| `orgname` | `str` | Yes |  |
| `payload` | `dict` | Yes |  |
| `sharing_space` | `dict` | Yes |  |
| `variables` | `list` | Yes |  |

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

#### `create(reqdata, ctrl=None) -> TemplateEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Template().create({
    "name": "example_name",  # str
    "payload": {},  # dict
})
```

#### `list(reqmatch=None, ctrl=None) -> list[TemplateEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Template().list()
for template in results:
    print(template.data_get())
```

#### `load(reqmatch, ctrl=None) -> TemplateEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Template().load({"id": "template_id"})
```

#### `remove(reqmatch, ctrl=None) -> TemplateEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.Template().remove({"id": "template_id"})
```

#### `update(reqdata, ctrl=None) -> TemplateEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.Template().update({
    "id": "template_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TemplateEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## TemplateDispatchEntity

```python
template_dispatch = client.TemplateDispatch()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attempt` | `int` | Yes |  |
| `created_at` | `str` | Yes |  |
| `dispatch_href` | `str` | Yes |  |
| `id` | `str` | Yes |  |
| `message` | `str` | Yes |  |
| `object_id` | `str` | Yes |  |
| `object_type` | `str` | Yes |  |
| `payload` | `dict` | Yes |  |
| `sharing_id` | `str` | Yes |  |
| `state` | `int` | Yes |  |
| `state_msg` | `str` | No |  |
| `target` | `dict` | Yes |  |
| `target_id` | `str` | Yes |  |
| `target_type` | `str` | Yes |  |
| `task_history` | `list` | Yes |  |
| `task_status` | `dict` | Yes |  |
| `task_updated_at` | `str` | No |  |
| `template_id` | `str` | No |  |
| `template_name` | `str` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> TemplateDispatchEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.TemplateDispatch().create({
    "template_id": "example_template_id",  # str
    "object_id": "example_object_id",  # str
    "object_type": "example_object_type",  # str
})
```

#### `load(reqmatch, ctrl=None) -> TemplateDispatchEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.TemplateDispatch().load({"id": "template_dispatch_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TemplateDispatchEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## TldEntity

```python
tld = client.Tld()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `authinfo_for_transfer` | `bool` | Yes |  |
| `category` | `str` | Yes |  |
| `change_owner` | `bool` | Yes |  |
| `corporate` | `bool` | Yes |  |
| `ext_trade` | `bool` | Yes |  |
| `full_tld` | `str` | Yes |  |
| `href` | `str` | Yes |  |
| `lock` | `bool` | Yes |  |
| `name` | `str` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[TldEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Tld().list()
for tld in results:
    print(tld.data_get())
```

#### `load(reqmatch, ctrl=None) -> TldEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Tld().load({"name": "name"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TldEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## UserEntity

```python
user = client.User()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `city` | `str` | Yes |  |
| `country` | `str` | No |  |
| `email` | `str` | Yes |  |
| `fax` | `str` | No |  |
| `firstname` | `str` | No |  |
| `id` | `str` | Yes |  |
| `lang` | `str` | Yes |  |
| `lastname` | `str` | No |  |
| `name` | `str` | Yes |  |
| `phone` | `str` | No |  |
| `state` | `str` | No |  |
| `streetaddr` | `str` | No |  |
| `streetaddr2` | `str` | No |  |
| `username` | `str` | Yes |  |
| `zip` | `str` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> UserEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.User().load({"id": "user_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `UserEntity` instance with the same options.

#### `get_name() -> str`

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

```python
client = GandiSDK({
    "feature": {
        "debug": {"active": True},
        "idempotency": {"active": True},
        "metrics": {"active": True},
        "paging": {"active": True},
        "ratelimit": {"active": True},
        "retry": {"active": True},
        "secrets": {"active": True},
        "test": {"active": True},
        "timeout": {"active": True},
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

