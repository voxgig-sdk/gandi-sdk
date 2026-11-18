# Gandi Golang SDK Reference

Complete API reference for the Gandi Golang SDK.


## GandiSDK

### Constructor

```go
func NewGandiSDK(options map[string]any) *GandiSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["apikey"]` | `string` | API key for authentication. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *GandiSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *GandiSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `AccessToken(data map[string]any) GandiEntityBase`

Create a new `AccessToken` entity instance. Pass `nil` for no initial data.

#### `AcmeAccount(data map[string]any) GandiEntityBase`

Create a new `AcmeAccount` entity instance. Pass `nil` for no initial data.

#### `AcmeDomain(data map[string]any) GandiEntityBase`

Create a new `AcmeDomain` entity instance. Pass `nil` for no initial data.

#### `AcmePrice(data map[string]any) GandiEntityBase`

Create a new `AcmePrice` entity instance. Pass `nil` for no initial data.

#### `AcmeSubscription(data map[string]any) GandiEntityBase`

Create a new `AcmeSubscription` entity instance. Pass `nil` for no initial data.

#### `BillingInfo(data map[string]any) GandiEntityBase`

Create a new `BillingInfo` entity instance. Pass `nil` for no initial data.

#### `BillingPrice(data map[string]any) GandiEntityBase`

Create a new `BillingPrice` entity instance. Pass `nil` for no initial data.

#### `CertificateDcv(data map[string]any) GandiEntityBase`

Create a new `CertificateDcv` entity instance. Pass `nil` for no initial data.

#### `CertificatePackage(data map[string]any) GandiEntityBase`

Create a new `CertificatePackage` entity instance. Pass `nil` for no initial data.

#### `CertificatePem(data map[string]any) GandiEntityBase`

Create a new `CertificatePem` entity instance. Pass `nil` for no initial data.

#### `CertificateRenewal(data map[string]any) GandiEntityBase`

Create a new `CertificateRenewal` entity instance. Pass `nil` for no initial data.

#### `CertificateTag(data map[string]any) GandiEntityBase`

Create a new `CertificateTag` entity instance. Pass `nil` for no initial data.

#### `Comment(data map[string]any) GandiEntityBase`

Create a new `Comment` entity instance. Pass `nil` for no initial data.

#### `Domain(data map[string]any) GandiEntityBase`

Create a new `Domain` entity instance. Pass `nil` for no initial data.

#### `DomainAvailability(data map[string]any) GandiEntityBase`

Create a new `DomainAvailability` entity instance. Pass `nil` for no initial data.

#### `DomainChangeOwner(data map[string]any) GandiEntityBase`

Create a new `DomainChangeOwner` entity instance. Pass `nil` for no initial data.

#### `DomainClaim(data map[string]any) GandiEntityBase`

Create a new `DomainClaim` entity instance. Pass `nil` for no initial data.

#### `DomainContact(data map[string]any) GandiEntityBase`

Create a new `DomainContact` entity instance. Pass `nil` for no initial data.

#### `DomainDnskey(data map[string]any) GandiEntityBase`

Create a new `DomainDnskey` entity instance. Pass `nil` for no initial data.

#### `DomainDnssec(data map[string]any) GandiEntityBase`

Create a new `DomainDnssec` entity instance. Pass `nil` for no initial data.

#### `DomainHost(data map[string]any) GandiEntityBase`

Create a new `DomainHost` entity instance. Pass `nil` for no initial data.

#### `DomainLivedns(data map[string]any) GandiEntityBase`

Create a new `DomainLivedns` entity instance. Pass `nil` for no initial data.

#### `DomainNameserver(data map[string]any) GandiEntityBase`

Create a new `DomainNameserver` entity instance. Pass `nil` for no initial data.

#### `DomainTag(data map[string]any) GandiEntityBase`

Create a new `DomainTag` entity instance. Pass `nil` for no initial data.

#### `DomainTransfer(data map[string]any) GandiEntityBase`

Create a new `DomainTransfer` entity instance. Pass `nil` for no initial data.

#### `DomainWebredir(data map[string]any) GandiEntityBase`

Create a new `DomainWebredir` entity instance. Pass `nil` for no initial data.

#### `EmailForward(data map[string]any) GandiEntityBase`

Create a new `EmailForward` entity instance. Pass `nil` for no initial data.

#### `EmailMailbox(data map[string]any) GandiEntityBase`

Create a new `EmailMailbox` entity instance. Pass `nil` for no initial data.

#### `EmailMigration(data map[string]any) GandiEntityBase`

Create a new `EmailMigration` entity instance. Pass `nil` for no initial data.

#### `EmailOffer(data map[string]any) GandiEntityBase`

Create a new `EmailOffer` entity instance. Pass `nil` for no initial data.

#### `EmailSlot(data map[string]any) GandiEntityBase`

Create a new `EmailSlot` entity instance. Pass `nil` for no initial data.

#### `HostingApplication(data map[string]any) GandiEntityBase`

Create a new `HostingApplication` entity instance. Pass `nil` for no initial data.

#### `HostingInstance(data map[string]any) GandiEntityBase`

Create a new `HostingInstance` entity instance. Pass `nil` for no initial data.

#### `HostingVhost(data map[string]any) GandiEntityBase`

Create a new `HostingVhost` entity instance. Pass `nil` for no initial data.

#### `IssuedCertificate(data map[string]any) GandiEntityBase`

Create a new `IssuedCertificate` entity instance. Pass `nil` for no initial data.

#### `LinkedZone(data map[string]any) GandiEntityBase`

Create a new `LinkedZone` entity instance. Pass `nil` for no initial data.

#### `LinkedZoneDeployment(data map[string]any) GandiEntityBase`

Create a new `LinkedZoneDeployment` entity instance. Pass `nil` for no initial data.

#### `LinkedZoneDomain(data map[string]any) GandiEntityBase`

Create a new `LinkedZoneDomain` entity instance. Pass `nil` for no initial data.

#### `LinkedZoneTask(data map[string]any) GandiEntityBase`

Create a new `LinkedZoneTask` entity instance. Pass `nil` for no initial data.

#### `LivednsAxfrSlave(data map[string]any) GandiEntityBase`

Create a new `LivednsAxfrSlave` entity instance. Pass `nil` for no initial data.

#### `LivednsAxfrTsig(data map[string]any) GandiEntityBase`

Create a new `LivednsAxfrTsig` entity instance. Pass `nil` for no initial data.

#### `LivednsDomain(data map[string]any) GandiEntityBase`

Create a new `LivednsDomain` entity instance. Pass `nil` for no initial data.

#### `LivednsKey(data map[string]any) GandiEntityBase`

Create a new `LivednsKey` entity instance. Pass `nil` for no initial data.

#### `LivednsNameserver(data map[string]any) GandiEntityBase`

Create a new `LivednsNameserver` entity instance. Pass `nil` for no initial data.

#### `LivednsRecord(data map[string]any) GandiEntityBase`

Create a new `LivednsRecord` entity instance. Pass `nil` for no initial data.

#### `LivednsRrtype(data map[string]any) GandiEntityBase`

Create a new `LivednsRrtype` entity instance. Pass `nil` for no initial data.

#### `LivednsSnapshot(data map[string]any) GandiEntityBase`

Create a new `LivednsSnapshot` entity instance. Pass `nil` for no initial data.

#### `LivednsTsigKey(data map[string]any) GandiEntityBase`

Create a new `LivednsTsigKey` entity instance. Pass `nil` for no initial data.

#### `Mailbox(data map[string]any) GandiEntityBase`

Create a new `Mailbox` entity instance. Pass `nil` for no initial data.

#### `MailboxDomain(data map[string]any) GandiEntityBase`

Create a new `MailboxDomain` entity instance. Pass `nil` for no initial data.

#### `MailboxForward(data map[string]any) GandiEntityBase`

Create a new `MailboxForward` entity instance. Pass `nil` for no initial data.

#### `MailboxProduct(data map[string]any) GandiEntityBase`

Create a new `MailboxProduct` entity instance. Pass `nil` for no initial data.

#### `MailboxQuota(data map[string]any) GandiEntityBase`

Create a new `MailboxQuota` entity instance. Pass `nil` for no initial data.

#### `MailboxSlot(data map[string]any) GandiEntityBase`

Create a new `MailboxSlot` entity instance. Pass `nil` for no initial data.

#### `Organization(data map[string]any) GandiEntityBase`

Create a new `Organization` entity instance. Pass `nil` for no initial data.

#### `OrganizationCustomer(data map[string]any) GandiEntityBase`

Create a new `OrganizationCustomer` entity instance. Pass `nil` for no initial data.

#### `Template(data map[string]any) GandiEntityBase`

Create a new `Template` entity instance. Pass `nil` for no initial data.

#### `TemplateDispatch(data map[string]any) GandiEntityBase`

Create a new `TemplateDispatch` entity instance. Pass `nil` for no initial data.

#### `Tld(data map[string]any) GandiEntityBase`

Create a new `Tld` entity instance. Pass `nil` for no initial data.

#### `User(data map[string]any) GandiEntityBase`

Create a new `User` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## AccessTokenEntity

```go
accessToken := client.AccessToken(nil)
fmt.Println(accessToken.GetName()) // "access_token"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `access_token` | `string` | Yes |  |
| `entities` | `[]any` | Yes |  |
| `expires_at` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `scopes` | `[]any` | Yes |  |

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

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.AccessToken(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AccessTokenEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AcmeAccountEntity

```go
acmeAccount := client.AcmeAccount(nil)
fmt.Println(acmeAccount.GetName()) // "acme_account"
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.AcmeAccount(nil).List(map[string]any{"subscription_id": "example", "sharing_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.AcmeAccount(nil).Load(map[string]any{"id": "acme_account_id", "subscription_id": "subscription_id", "sharing_id": "sharing_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AcmeAccountEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AcmeDomainEntity

```go
acmeDomain := client.AcmeDomain(nil)
fmt.Println(acmeDomain.GetName()) // "acme_domain"
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.AcmeDomain(nil).List(map[string]any{"subscription_id": "example", "domain": "example", "sharing_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.AcmeDomain(nil).Load(map[string]any{"domain_id": 1, "subscription_id": "subscription_id", "sharing_id": "sharing_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AcmeDomainEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AcmePriceEntity

```go
acmePrice := client.AcmePrice(nil)
fmt.Println(acmePrice.GetName()) // "acme_price"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `country` | `string` | Yes |  |
| `currency` | `string` | Yes |  |
| `domains` | `[]any` | Yes |  |
| `duration` | `string` | Yes |  |
| `duration_unit` | `string` | Yes |  |
| `grid` | `string` | Yes |  |
| `max_duration` | `int` | Yes |  |
| `min_duration` | `int` | Yes |  |
| `price_after_taxes` | `string` | Yes |  |
| `price_before_taxes` | `string` | Yes |  |
| `process` | `string` | Yes |  |
| `product` | `map[string]any` | Yes |  |
| `provider` | `string` | Yes |  |
| `tax_rate` | `string` | Yes |  |
| `taxes` | `[]any` | Yes |  |
| `validation_type` | `string` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.AcmePrice(nil).List(map[string]any{"country": "example", "currency": "example", "duration": "example", "grid": "example", "process": "example", "provider": "example", "sharing_id": "example", "validation_type": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.AcmePrice(nil).Create(map[string]any{
    "sharing_id": "example_sharing_id",
    "country": "example_country",
    "currency": "example_currency",
    "domains": []any{},
    "duration": "example_duration",
    "grid": "example_grid",
    "process": "example_process",
    "provider": "example_provider",
    "validation_type": "example_validation_type",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AcmePriceEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AcmeSubscriptionEntity

```go
acmeSubscription := client.AcmeSubscription(nil)
fmt.Println(acmeSubscription.GetName()) // "acme_subscription"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `country` | `string` | Yes |  |
| `created_at` | `string` | Yes |  |
| `currency` | `string` | Yes |  |
| `domains` | `[]any` | Yes |  |
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.AcmeSubscription(nil).List(map[string]any{"created_at": "example", "ends_at": "example", "name": "example", "provider": "example", "sharing_id": "example", "status": "example", "validation_type": "example", "year": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.AcmeSubscription(nil).Load(map[string]any{"subscription_id": "subscription_id", "sharing_id": "sharing_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.AcmeSubscription(nil).Create(map[string]any{
    "sharing_id": "example_sharing_id",
    "country": "example_country",
    "currency": "example_currency",
    "domains": []any{},
    "duration": 1,
    "grid": "example_grid",
    "name": "example_name",
    "provider": "example_provider",
    "validation_type": "example_validation_type",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.AcmeSubscription(nil).Update(map[string]any{
    "subscription_id": "subscription_id",
    "sharing_id": "sharing_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.AcmeSubscription(nil).Remove(map[string]any{"subscription_id": "subscription_id", "sharing_id": "sharing_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AcmeSubscriptionEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## BillingInfoEntity

```go
billingInfo := client.BillingInfo(nil)
fmt.Println(billingInfo.GetName()) // "billing_info"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `annual_balance` | `float64` | Yes |  |
| `grid` | `string` | Yes |  |
| `outstanding_amount` | `float64` | Yes |  |
| `prepaid` | `map[string]any` | Yes |  |
| `prepaid_monthly_invoice` | `bool` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.BillingInfo(nil).Load(map[string]any{"sharing_id": "sharing_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `BillingInfoEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## BillingPriceEntity

```go
billingPrice := client.BillingPrice(nil)
fmt.Println(billingPrice.GetName()) // "billing_price"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `currency` | `string` | Yes |  |
| `grid` | `string` | Yes |  |
| `products` | `[]any` | Yes |  |
| `taxes` | `[]any` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.BillingPrice(nil).Load(map[string]any{"type": "type", "name": []any{}, "process": []any{}}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `BillingPriceEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## CertificateDcvEntity

```go
certificateDcv := client.CertificateDcv(nil)
fmt.Println(certificateDcv.GetName()) // "certificate_dcv"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `message` | `string` | Yes |  |
| `method` | `string` | Yes |  |

### Operations

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.CertificateDcv(nil).Update(map[string]any{
    "certificate_id": "certificate_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Patch(reqdata, ctrl map[string]any) (any, error)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity; `err` is non-nil on failure.

```go
result, err := client.CertificateDcv(nil).Patch(map[string]any{
    "certificate_id": "certificate_id",
    // Only the fields to change
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CertificateDcvEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## CertificatePackageEntity

```go
certificatePackage := client.CertificatePackage(nil)
fmt.Println(certificatePackage.GetName()) // "certificate_package"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `category` | `map[string]any` | Yes |  |
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.CertificatePackage(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.CertificatePackage(nil).Load(map[string]any{"name": "name"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CertificatePackageEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## CertificatePemEntity

```go
certificatePem := client.CertificatePem(nil)
fmt.Println(certificatePem.GetName()) // "certificate_pem"
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.CertificatePem(nil).Load(map[string]any{"type": "type"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CertificatePemEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## CertificateRenewalEntity

```go
certificateRenewal := client.CertificateRenewal(nil)
fmt.Println(certificateRenewal.GetName()) // "certificate_renewal"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `csr` | `string` | No |  |
| `dcv_method` | `string` | No |  |
| `duration` | `int` | No |  |
| `errors` | `[]any` | No |  |
| `status` | `string` | Yes |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.CertificateRenewal(nil).Create(map[string]any{
    "certificate_id": "example_certificate_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CertificateRenewalEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## CertificateTagEntity

```go
certificateTag := client.CertificateTag(nil)
fmt.Println(certificateTag.GetName()) // "certificate_tag"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `add` | `[]any` | Yes |  |
| `message` | `string` | Yes |  |
| `remove` | `[]any` | Yes |  |
| `tag` | `string` | Yes |  |
| `tags` | `[]any` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.CertificateTag(nil).List(map[string]any{"certificate_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.CertificateTag(nil).Create(map[string]any{
    "certificate_id": "example_certificate_id",
    "tag": "example_tag",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.CertificateTag(nil).Update(map[string]any{
    "certificate_id": "certificate_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Patch(reqdata, ctrl map[string]any) (any, error)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity; `err` is non-nil on failure.

```go
result, err := client.CertificateTag(nil).Patch(map[string]any{
    "certificate_id": "certificate_id",
    // Only the fields to change
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.CertificateTag(nil).Remove(map[string]any{"certificate_id": "certificate_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CertificateTagEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## CommentEntity

```go
comment := client.Comment(nil)
fmt.Println(comment.GetName()) // "comment"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `content` | `string` | Yes |  |
| `created_at` | `string` | No |  |
| `errors` | `[]any` | No |  |
| `id` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `updated_at` | `string` | No |  |
| `user` | `map[string]any` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Comment(nil).Load(map[string]any{"entity_id": "entity_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.Comment(nil).Create(map[string]any{
    "entity_id": "example_entity_id",
    "content": "example_content",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.Comment(nil).Remove(map[string]any{"entity_id": "entity_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CommentEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## DomainEntity

```go
domain := client.Domain(nil)
fmt.Println(domain.GetName()) // "domain"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `admin` | `map[string]any` | Yes |  |
| `authinfo` | `string` | No |  |
| `autorenew` | `map[string]any` | Yes |  |
| `bill` | `map[string]any` | Yes |  |
| `can_tld_lock` | `bool` | Yes |  |
| `claims` | `string` | No |  |
| `contacts` | `map[string]any` | Yes |  |
| `currency` | `string` | No |  |
| `dates` | `map[string]any` | Yes |  |
| `domain_owner` | `string` | Yes |  |
| `duration` | `int` | No |  |
| `enforce_premium` | `bool` | No |  |
| `errors` | `[]any` | No |  |
| `extra_parameters` | `map[string]any` | No |  |
| `fqdn` | `string` | Yes |  |
| `fqdn_unicode` | `string` | Yes |  |
| `href` | `string` | Yes |  |
| `id` | `string` | No |  |
| `lang` | `string` | No |  |
| `mailbox_optin` | `bool` | No |  |
| `nameserver` | `map[string]any` | Yes |  |
| `nameservers` | `[]any` | Yes |  |
| `nameservers_ips` | `map[string]any` | No |  |
| `orga_owner` | `string` | Yes |  |
| `owner` | `map[string]any` | Yes |  |
| `price` | `float64` | No |  |
| `reachability` | `string` | Yes |  |
| `resellee_id` | `string` | No |  |
| `services` | `[]any` | Yes |  |
| `sharing_id` | `string` | No |  |
| `sharing_space` | `map[string]any` | Yes |  |
| `smd` | `string` | No |  |
| `status` | `[]any` | Yes |  |
| `tags` | `[]any` | No |  |
| `tech` | `map[string]any` | Yes |  |
| `template_id` | `string` | No |  |
| `tld` | `string` | Yes |  |
| `tld_period` | `string` | No |  |
| `trustee_roles` | `[]any` | No |  |

### Field Usage by Operation

| Field | load | list | create | remove |
| --- | --- | --- | --- | --- |
| `admin` | - | - | - | - |
| `authinfo` | - | - | - | - |
| `autorenew` | - | - | - | - |
| `bill` | - | - | - | - |
| `can_tld_lock` | - | - | - | - |
| `claims` | - | - | - | - |
| `contacts` | - | - | - | - |
| `currency` | - | - | - | - |
| `dates` | - | - | - | - |
| `domain_owner` | - | - | - | - |
| `duration` | - | - | - | - |
| `enforce_premium` | - | - | - | - |
| `errors` | - | - | - | - |
| `extra_parameters` | - | - | - | - |
| `fqdn` | - | - | - | - |
| `fqdn_unicode` | - | - | - | - |
| `href` | - | - | - | - |
| `id` | - | Yes | - | - |
| `lang` | - | - | - | - |
| `mailbox_optin` | - | - | - | - |
| `nameserver` | - | - | - | - |
| `nameservers` | - | - | Yes | - |
| `nameservers_ips` | - | - | - | - |
| `orga_owner` | - | - | - | - |
| `owner` | - | - | - | - |
| `price` | - | - | - | - |
| `reachability` | - | - | - | - |
| `resellee_id` | - | - | - | - |
| `services` | - | - | - | - |
| `sharing_id` | - | - | - | - |
| `sharing_space` | - | - | - | - |
| `smd` | - | - | - | - |
| `status` | - | - | - | - |
| `tags` | - | - | - | - |
| `tech` | - | - | - | - |
| `template_id` | - | - | - | - |
| `tld` | - | - | - | - |
| `tld_period` | - | - | - | - |
| `trustee_roles` | - | - | - | - |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Domain(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Domain(nil).Load(map[string]any{"fqdn": "fqdn"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.Domain(nil).Create(map[string]any{
    "admin": map[string]any{},
    "bill": map[string]any{},
    "fqdn": "example_fqdn",
    "owner": map[string]any{},
    "tech": map[string]any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.Domain(nil).Remove(map[string]any{"fqdn": "fqdn"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `DomainEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## DomainAvailabilityEntity

```go
domainAvailability := client.DomainAvailability(nil)
fmt.Println(domainAvailability.GetName()) // "domain_availability"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `currency` | `string` | Yes |  |
| `grid` | `string` | Yes |  |
| `products` | `[]any` | Yes |  |
| `taxes` | `[]any` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.DomainAvailability(nil).Load(map[string]any{"name": "name"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `DomainAvailabilityEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## DomainChangeOwnerEntity

```go
domainChangeOwner := client.DomainChangeOwner(nil)
fmt.Println(domainChangeOwner.GetName()) // "domain_change_owner"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `admin` | `map[string]any` | Yes |  |
| `bill` | `map[string]any` | Yes |  |
| `created_at` | `string` | Yes |  |
| `date_start` | `string` | No |  |
| `errors` | `[]any` | No |  |
| `errortype` | `string` | No |  |
| `errortype_label` | `string` | No |  |
| `foa` | `[]any` | No |  |
| `inner_step` | `string` | No |  |
| `owner` | `map[string]any` | Yes |  |
| `params` | `map[string]any` | Yes |  |
| `status` | `string` | Yes |  |
| `step` | `string` | Yes |  |
| `step_nb` | `int` | Yes |  |
| `tech` | `map[string]any` | Yes |  |
| `updated_at` | `string` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.DomainChangeOwner(nil).Load(map[string]any{"domain": "domain"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.DomainChangeOwner(nil).Create(map[string]any{
    "domain": "example_domain",
    "admin": map[string]any{},
    "bill": map[string]any{},
    "owner": map[string]any{},
    "tech": map[string]any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `DomainChangeOwnerEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## DomainClaimEntity

```go
domainClaim := client.DomainClaim(nil)
fmt.Println(domainClaim.GetName()) // "domain_claim"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `claims` | `[]any` | Yes |  |
| `created_at` | `string` | Yes |  |
| `expires_at` | `string` | Yes |  |
| `fqdn` | `string` | Yes |  |
| `fqdn_alabel` | `string` | Yes |  |
| `fqdn_ulabel` | `string` | Yes |  |
| `notice_id` | `string` | Yes |  |
| `status` | `string` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.DomainClaim(nil).Load(map[string]any{"domain": "domain"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.DomainClaim(nil).Create(map[string]any{
    "domain": "example_domain",
    "claims": []any{},
    "created_at": "example_created_at",
    "expires_at": "example_expires_at",
    "fqdn": "example_fqdn",
    "fqdn_alabel": "example_fqdn_alabel",
    "fqdn_ulabel": "example_fqdn_ulabel",
    "notice_id": "example_notice_id",
    "status": "example_status",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `DomainClaimEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## DomainContactEntity

```go
domainContact := client.DomainContact(nil)
fmt.Println(domainContact.GetName()) // "domain_contact"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `admin` | `map[string]any` | Yes |  |
| `bill` | `map[string]any` | Yes |  |
| `message` | `string` | Yes |  |
| `owner` | `map[string]any` | Yes |  |
| `tech` | `map[string]any` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.DomainContact(nil).Load(map[string]any{"domain": "domain"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.DomainContact(nil).Update(map[string]any{
    "domain": "domain",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `DomainContactEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## DomainDnskeyEntity

```go
domainDnskey := client.DomainDnskey(nil)
fmt.Println(domainDnskey.GetName()) // "domain_dnskey"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `algorithm` | `int` | Yes |  |
| `digest` | `string` | Yes |  |
| `digest_type` | `int` | Yes |  |
| `href` | `string` | Yes |  |
| `id` | `int` | Yes |  |
| `keys` | `[]any` | Yes |  |
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.DomainDnskey(nil).List(map[string]any{"domain": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.DomainDnskey(nil).Create(map[string]any{
    "domain": "example_domain",
    "algorithm": 1,
    "public_key": "example_public_key",
    "type": "example_type",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.DomainDnskey(nil).Update(map[string]any{
    "domain": "domain",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.DomainDnskey(nil).Remove(map[string]any{"id": "domain_dnskey_id", "domain": "domain"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `DomainDnskeyEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## DomainDnssecEntity

```go
domainDnssec := client.DomainDnssec(nil)
fmt.Println(domainDnssec.GetName()) // "domain_dnssec"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `error` | `string` | No |  |
| `state` | `string` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.DomainDnssec(nil).Load(map[string]any{"domain": "domain"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.DomainDnssec(nil).Create(map[string]any{
    "domain": "example_domain",
    "state": "example_state",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.DomainDnssec(nil).Remove(map[string]any{"domain": "domain"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `DomainDnssecEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## DomainHostEntity

```go
domainHost := client.DomainHost(nil)
fmt.Println(domainHost.GetName()) // "domain_host"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `fqdn` | `string` | Yes |  |
| `fqdn_unicode` | `string` | Yes |  |
| `href` | `string` | Yes |  |
| `ips` | `[]any` | Yes |  |
| `message` | `string` | Yes |  |
| `name` | `string` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.DomainHost(nil).List(map[string]any{"domain": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.DomainHost(nil).Load(map[string]any{"domain": "domain", "name": "name"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.DomainHost(nil).Create(map[string]any{
    "domain": "example_domain",
    "ips": []any{},
    "name": "example_name",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.DomainHost(nil).Update(map[string]any{
    "domain": "domain",
    "name": "name",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.DomainHost(nil).Remove(map[string]any{"domain": "domain", "name": "name"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `DomainHostEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## DomainLivednsEntity

```go
domainLivedns := client.DomainLivedns(nil)
fmt.Println(domainLivedns.GetName()) // "domain_livedns"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `current` | `string` | Yes |  |
| `dnssec_available` | `bool` | No |  |
| `livednssec_available` | `bool` | No |  |
| `message` | `string` | Yes |  |
| `nameservers` | `[]any` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.DomainLivedns(nil).Load(map[string]any{"domain": "domain"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.DomainLivedns(nil).Create(map[string]any{
    "domain": "example_domain",
    "current": "example_current",
    "message": "example_message",
    "nameservers": []any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `DomainLivednsEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## DomainNameserverEntity

```go
domainNameserver := client.DomainNameserver(nil)
fmt.Println(domainNameserver.GetName()) // "domain_nameserver"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `message` | `string` | Yes |  |
| `nameservers` | `[]any` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.DomainNameserver(nil).List(map[string]any{"domain": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.DomainNameserver(nil).Update(map[string]any{
    "domain": "domain",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `DomainNameserverEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## DomainTagEntity

```go
domainTag := client.DomainTag(nil)
fmt.Println(domainTag.GetName()) // "domain_tag"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `add` | `[]any` | Yes |  |
| `message` | `string` | Yes |  |
| `remove` | `[]any` | Yes |  |
| `tag` | `string` | Yes |  |
| `tags` | `[]any` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.DomainTag(nil).List(map[string]any{"domain": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.DomainTag(nil).Create(map[string]any{
    "domain": "example_domain",
    "tag": "example_tag",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.DomainTag(nil).Update(map[string]any{
    "domain": "domain",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Patch(reqdata, ctrl map[string]any) (any, error)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity; `err` is non-nil on failure.

```go
result, err := client.DomainTag(nil).Patch(map[string]any{
    "domain": "domain",
    // Only the fields to change
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.DomainTag(nil).Remove(map[string]any{"domain": "domain"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `DomainTagEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## DomainTransferEntity

```go
domainTransfer := client.DomainTransfer(nil)
fmt.Println(domainTransfer.GetName()) // "domain_transfer"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `admin` | `map[string]any` | Yes |  |
| `authinfo` | `string` | No |  |
| `bill` | `map[string]any` | Yes |  |
| `change_owner` | `bool` | No |  |
| `created_at` | `string` | Yes |  |
| `currency` | `string` | No |  |
| `duration` | `int` | No |  |
| `enforce_premium` | `bool` | No |  |
| `errors` | `[]any` | No |  |
| `errortype` | `string` | No |  |
| `errortype_label` | `string` | No |  |
| `extra_parameters` | `map[string]any` | No |  |
| `foa` | `[]any` | No |  |
| `fqdn` | `string` | Yes |  |
| `inner_step` | `string` | No |  |
| `mailbox_optin` | `bool` | No |  |
| `message` | `string` | Yes |  |
| `nameservers` | `[]any` | No |  |
| `nameservers_ips` | `map[string]any` | No |  |
| `owner` | `map[string]any` | Yes |  |
| `owner_contact` | `string` | Yes |  |
| `params` | `map[string]any` | Yes |  |
| `price` | `float64` | No |  |
| `regac_at` | `string` | No |  |
| `resellee_id` | `string` | No |  |
| `start_at` | `string` | No |  |
| `status` | `string` | Yes |  |
| `step` | `string` | Yes |  |
| `step_nb` | `int` | Yes |  |
| `tech` | `map[string]any` | Yes |  |
| `template_id` | `string` | No |  |
| `transfer_link` | `string` | No |  |
| `transfer_procedure` | `string` | No |  |
| `updated_at` | `string` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.DomainTransfer(nil).Load(map[string]any{"domain": "domain"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.DomainTransfer(nil).Create(map[string]any{
    "admin": map[string]any{},
    "bill": map[string]any{},
    "fqdn": "example_fqdn",
    "owner": map[string]any{},
    "tech": map[string]any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.DomainTransfer(nil).Update(map[string]any{
    "domain": "domain",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `DomainTransferEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## DomainWebredirEntity

```go
domainWebredir := client.DomainWebredir(nil)
fmt.Println(domainWebredir.GetName()) // "domain_webredir"
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.DomainWebredir(nil).List(map[string]any{"domain": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.DomainWebredir(nil).Load(map[string]any{"domain": "domain", "host": "host"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.DomainWebredir(nil).Create(map[string]any{
    "domain": "example_domain",
    "host": "example_host",
    "override": true,
    "protocol": "example_protocol",
    "type": "example_type",
    "url": "example_url",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.DomainWebredir(nil).Update(map[string]any{
    "domain": "domain",
    "host": "host",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.DomainWebredir(nil).Remove(map[string]any{"domain": "domain", "host": "host"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `DomainWebredirEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## EmailForwardEntity

```go
emailForward := client.EmailForward(nil)
fmt.Println(emailForward.GetName()) // "email_forward"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `destinations` | `[]any` | Yes |  |
| `href` | `string` | Yes |  |
| `id` | `string` | No |  |
| `message` | `string` | Yes |  |
| `source` | `string` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.EmailForward(nil).List(map[string]any{"domain": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.EmailForward(nil).Create(map[string]any{
    "domain": "example_domain",
    "destinations": []any{},
    "source": "example_source",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.EmailForward(nil).Update(map[string]any{
    "domain": "domain",
    "source": "source",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.EmailForward(nil).Remove(map[string]any{"domain": "domain", "source": "source"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `EmailForwardEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## EmailMailboxEntity

```go
emailMailbox := client.EmailMailbox(nil)
fmt.Println(emailMailbox.GetName()) // "email_mailbox"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | `string` | Yes |  |
| `alias_count` | `int` | No |  |
| `aliases` | `[]any` | Yes |  |
| `antispam` | `bool` | Yes |  |
| `autorenew` | `map[string]any` | Yes |  |
| `domain` | `string` | Yes |  |
| `errors` | `[]any` | No |  |
| `expires_at` | `string` | Yes |  |
| `fallback_email` | `string` | No |  |
| `href` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `login` | `string` | Yes |  |
| `mailbox_type` | `string` | Yes |  |
| `message` | `string` | Yes |  |
| `password` | `string` | Yes |  |
| `quota_used` | `int` | Yes |  |
| `responder` | `map[string]any` | No |  |
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.EmailMailbox(nil).List(map[string]any{"domain": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.EmailMailbox(nil).Load(map[string]any{"id": "email_mailbox_id", "domain": "domain"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.EmailMailbox(nil).Create(map[string]any{
    "domain": "example_domain",
    "login": "example_login",
    "mailbox_type": "example_mailbox_type",
    "password": "example_password",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.EmailMailbox(nil).Update(map[string]any{
    "id": "email_mailbox_id",
    "domain": "domain",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.EmailMailbox(nil).Remove(map[string]any{"id": "email_mailbox_id", "domain": "domain"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `EmailMailboxEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## EmailMigrationEntity

```go
emailMigration := client.EmailMigration(nil)
fmt.Println(emailMigration.GetName()) // "email_migration"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `available` | `bool` | Yes |  |
| `currency` | `string` | Yes |  |
| `forward_count` | `int` | Yes |  |
| `free_mailboxes` | `int` | Yes |  |
| `included_mailboxes` | `int` | Yes |  |
| `info` | `[]any` | Yes |  |
| `message` | `string` | Yes |  |
| `packmail` | `bool` | Yes |  |
| `price_v1` | `float64` | Yes |  |
| `price_v2` | `float64` | Yes |  |
| `quota_v1` | `float64` | Yes |  |
| `token` | `string` | Yes |  |
| `usage_v1` | `float64` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.EmailMigration(nil).Load(map[string]any{"domain": "domain"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.EmailMigration(nil).Create(map[string]any{
    "domain": "example_domain",
    "token": "example_token",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `EmailMigrationEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## EmailOfferEntity

```go
emailOffer := client.EmailOffer(nil)
fmt.Println(emailOffer.GetName()) // "email_offer"
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

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.EmailOffer(nil).Load(map[string]any{"domain": "domain"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.EmailOffer(nil).Update(map[string]any{
    "domain": "domain",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `EmailOfferEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## EmailSlotEntity

```go
emailSlot := client.EmailSlot(nil)
fmt.Println(emailSlot.GetName()) // "email_slot"
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
| `refund_amount` | `float64` | No |  |
| `refund_currency` | `string` | No |  |
| `refundable` | `bool` | Yes |  |
| `status` | `string` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.EmailSlot(nil).List(map[string]any{"domain": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.EmailSlot(nil).Load(map[string]any{"id": 1, "domain": "domain"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.EmailSlot(nil).Create(map[string]any{
    "domain": "example_domain",
    "duration": 1,
    "mailbox_type": "example_mailbox_type",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.EmailSlot(nil).Remove(map[string]any{"id": 1, "domain": "domain"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `EmailSlotEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## HostingApplicationEntity

```go
hostingApplication := client.HostingApplication(nil)
fmt.Println(hostingApplication.GetName()) // "hosting_application"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `string` | Yes |  |
| `name_label` | `string` | Yes |  |
| `requirements` | `[]any` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.HostingApplication(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.HostingApplication(nil).Load(map[string]any{"name": "name"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `HostingApplicationEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## HostingInstanceEntity

```go
hostingInstance := client.HostingInstance(nil)
fmt.Println(hostingInstance.GetName()) // "hosting_instance"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `access_information` | `map[string]any` | Yes |  |
| `authentication` | `map[string]any` | Yes |  |
| `autorenew` | `map[string]any` | Yes |  |
| `available_upgrade` | `bool` | Yes |  |
| `booster` | `map[string]any` | No |  |
| `booster_options` | `map[string]any` | No |  |
| `compatible_applications` | `[]any` | No |  |
| `console` | `map[string]any` | Yes |  |
| `cpu` | `int` | Yes |  |
| `created_at` | `string` | Yes |  |
| `database` | `map[string]any` | Yes |  |
| `datacenter` | `map[string]any` | Yes |  |
| `domain` | `string` | No |  |
| `duration` | `int` | No |  |
| `duration_unit` | `string` | No |  |
| `errors` | `[]any` | No |  |
| `expire_at` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `language` | `map[string]any` | Yes |  |
| `language_id` | `string` | No |  |
| `location` | `string` | Yes |  |
| `message` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `password` | `string` | No |  |
| `password_updated_at` | `string` | No |  |
| `ram` | `map[string]any` | Yes |  |
| `sharing_space` | `map[string]any` | Yes |  |
| `size` | `string` | Yes |  |
| `snapshot_enabled` | `bool` | Yes |  |
| `status` | `string` | Yes |  |
| `storage` | `map[string]any` | Yes |  |
| `storage_additional_size` | `int` | No |  |
| `subscription_cancelled` | `bool` | No |  |
| `type` | `map[string]any` | Yes |  |
| `upgrade_to` | `[]any` | No |  |
| `vhosts` | `[]any` | Yes |  |

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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.HostingInstance(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.HostingInstance(nil).Load(map[string]any{"id": "hosting_instance_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.HostingInstance(nil).Create(map[string]any{
    "authentication": map[string]any{},
    "domain": "example_domain",
    "location": "example_location",
    "size": "example_size",
    "type": map[string]any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.HostingInstance(nil).Update(map[string]any{
    "id": "hosting_instance_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.HostingInstance(nil).Remove(map[string]any{"id": "hosting_instance_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `HostingInstanceEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## HostingVhostEntity

```go
hostingVhost := client.HostingVhost(nil)
fmt.Println(hostingVhost.GetName()) // "hosting_vhost"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `application` | `map[string]any` | Yes |  |
| `created_at` | `string` | Yes |  |
| `deployment` | `map[string]any` | Yes |  |
| `fqdn` | `string` | Yes |  |
| `https_strategy` | `string` | No |  |
| `is_a_test_vhost` | `bool` | Yes |  |
| `linked_dns_zone` | `map[string]any` | Yes |  |
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.HostingVhost(nil).List(map[string]any{"instance_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.HostingVhost(nil).Load(map[string]any{"fqdn": "fqdn", "instance_id": "instance_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.HostingVhost(nil).Create(map[string]any{
    "instance_id": "example_instance_id",
    "application": map[string]any{},
    "fqdn": "example_fqdn",
    "linked_dns_zone": map[string]any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.HostingVhost(nil).Update(map[string]any{
    "fqdn": "fqdn",
    "instance_id": "instance_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.HostingVhost(nil).Remove(map[string]any{"fqdn": "fqdn", "instance_id": "instance_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `HostingVhostEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## IssuedCertificateEntity

```go
issuedCertificate := client.IssuedCertificate(nil)
fmt.Println(issuedCertificate.GetName()) // "issued_certificate"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `altnames` | `[]any` | Yes |  |
| `altnames_unicode` | `[]any` | Yes |  |
| `apex_only` | `bool` | No |  |
| `assumed_name` | `string` | No |  |
| `business_category` | `string` | No |  |
| `card_pay_trustlogo` | `bool` | No |  |
| `cert` | `string` | No |  |
| `cn` | `string` | Yes |  |
| `cn_unicode` | `string` | Yes |  |
| `contact` | `map[string]any` | Yes |  |
| `csr` | `string` | No |  |
| `dates` | `map[string]any` | Yes |  |
| `dcv_method` | `string` | No |  |
| `duration` | `int` | No |  |
| `error_msg` | `string` | No |  |
| `errors` | `[]any` | No |  |
| `href` | `string` | No |  |
| `id` | `string` | Yes |  |
| `ida` | `map[string]any` | No |  |
| `intermediate` | `string` | No |  |
| `joi` | `map[string]any` | No |  |
| `middleman` | `map[string]any` | No |  |
| `owner` | `string` | No |  |
| `package` | `map[string]any` | Yes |  |
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
| `tags` | `[]any` | No |  |
| `trustlogo` | `bool` | No |  |
| `trustlogo_token` | `map[string]any` | No |  |

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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.IssuedCertificate(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.IssuedCertificate(nil).Load(map[string]any{"id": "issued_certificate_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.IssuedCertificate(nil).Create(map[string]any{
    "package": map[string]any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.IssuedCertificate(nil).Update(map[string]any{
    "id": "issued_certificate_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.IssuedCertificate(nil).Remove(map[string]any{"id": "issued_certificate_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `IssuedCertificateEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## LinkedZoneEntity

```go
linkedZone := client.LinkedZone(nil)
fmt.Println(linkedZone.GetName()) // "linked_zone"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | Yes |  |
| `default_records` | `bool` | Yes |  |
| `domain_count` | `int` | Yes |  |
| `domains` | `[]any` | No |  |
| `id` | `string` | Yes |  |
| `message` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `record_list` | `[]any` | No |  |
| `record_text` | `string` | No |  |
| `records` | `[]any` | No |  |
| `sharing_space` | `map[string]any` | Yes |  |
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.LinkedZone(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.LinkedZone(nil).Load(map[string]any{"id": "linked_zone_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.LinkedZone(nil).Create(map[string]any{
    "name": "example_name",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.LinkedZone(nil).Update(map[string]any{
    "id": "linked_zone_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.LinkedZone(nil).Remove(map[string]any{"id": "linked_zone_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `LinkedZoneEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## LinkedZoneDeploymentEntity

```go
linkedZoneDeployment := client.LinkedZoneDeployment(nil)
fmt.Println(linkedZoneDeployment.GetName()) // "linked_zone_deployment"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deploy` | `bool` | Yes |  |
| `message` | `string` | Yes |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.LinkedZoneDeployment(nil).Create(map[string]any{
    "zone_id": "example_zone_id",
    "deploy": true,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `LinkedZoneDeploymentEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## LinkedZoneDomainEntity

```go
linkedZoneDomain := client.LinkedZoneDomain(nil)
fmt.Println(linkedZoneDomain.GetName()) // "linked_zone_domain"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deployed` | `bool` | Yes |  |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `owner` | `string` | Yes |  |
| `zone` | `map[string]any` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.LinkedZoneDomain(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.LinkedZoneDomain(nil).Load(map[string]any{"name": "name"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `LinkedZoneDomainEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## LinkedZoneTaskEntity

```go
linkedZoneTask := client.LinkedZoneTask(nil)
fmt.Println(linkedZoneTask.GetName()) // "linked_zone_task"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | Yes |  |
| `ending_at` | `string` | No |  |
| `id` | `string` | Yes |  |
| `result` | `map[string]any` | Yes |  |
| `status` | `string` | Yes |  |
| `type` | `string` | Yes |  |
| `updated_at` | `string` | No |  |
| `zone_id` | `string` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.LinkedZoneTask(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.LinkedZoneTask(nil).Load(map[string]any{"id": "linked_zone_task_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `LinkedZoneTaskEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## LivednsAxfrSlaveEntity

```go
livednsAxfrSlave := client.LivednsAxfrSlave(nil)
fmt.Println(livednsAxfrSlave.GetName()) // "livedns_axfr_slave"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `message` | `string` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.LivednsAxfrSlave(nil).List(map[string]any{"fqdn": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.LivednsAxfrSlave(nil).Update(map[string]any{
    "fqdn": "fqdn",
    "ip": "ip",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.LivednsAxfrSlave(nil).Remove(map[string]any{"fqdn": "fqdn", "ip": "ip"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `LivednsAxfrSlaveEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## LivednsAxfrTsigEntity

```go
livednsAxfrTsig := client.LivednsAxfrTsig(nil)
fmt.Println(livednsAxfrTsig.GetName()) // "livedns_axfr_tsig"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `href` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `key_name` | `string` | Yes |  |
| `message` | `string` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.LivednsAxfrTsig(nil).List(map[string]any{"fqdn": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.LivednsAxfrTsig(nil).Update(map[string]any{
    "id": "livedns_axfr_tsig_id",
    "fqdn": "fqdn",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.LivednsAxfrTsig(nil).Remove(map[string]any{"id": "livedns_axfr_tsig_id", "fqdn": "fqdn"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `LivednsAxfrTsigEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## LivednsDomainEntity

```go
livednsDomain := client.LivednsDomain(nil)
fmt.Println(livednsDomain.GetName()) // "livedns_domain"
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
| `zone` | `map[string]any` | No |  |

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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.LivednsDomain(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.LivednsDomain(nil).Load(map[string]any{"fqdn": "fqdn"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.LivednsDomain(nil).Create(map[string]any{
    "fqdn": "example_fqdn",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.LivednsDomain(nil).Update(map[string]any{
    "fqdn": "fqdn",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.LivednsDomain(nil).Remove(map[string]any{"fqdn": "fqdn"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `LivednsDomainEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## LivednsKeyEntity

```go
livednsKey := client.LivednsKey(nil)
fmt.Println(livednsKey.GetName()) // "livedns_key"
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.LivednsKey(nil).List(map[string]any{"fqdn": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.LivednsKey(nil).Load(map[string]any{"id": "livedns_key_id", "fqdn": "fqdn"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.LivednsKey(nil).Create(map[string]any{
    "fqdn": "example_fqdn",
    "flags": 1,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.LivednsKey(nil).Update(map[string]any{
    "id": "livedns_key_id",
    "fqdn": "fqdn",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.LivednsKey(nil).Remove(map[string]any{"id": "livedns_key_id", "fqdn": "fqdn"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `LivednsKeyEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## LivednsNameserverEntity

```go
livednsNameserver := client.LivednsNameserver(nil)
fmt.Println(livednsNameserver.GetName()) // "livedns_nameserver"
```

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.LivednsNameserver(nil).List(map[string]any{"fqdn": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `LivednsNameserverEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## LivednsRecordEntity

```go
livednsRecord := client.LivednsRecord(nil)
fmt.Println(livednsRecord.GetName()) // "livedns_record"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `add_rrset_values` | `[]any` | No |  |
| `id` | `string` | No |  |
| `message` | `string` | Yes |  |
| `remove_rrset_values` | `[]any` | No |  |
| `rrset_href` | `string` | Yes |  |
| `rrset_name` | `string` | Yes |  |
| `rrset_ttl` | `int` | No |  |
| `rrset_type` | `string` | Yes |  |
| `rrset_values` | `[]any` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.LivednsRecord(nil).List(map[string]any{"fqdn": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.LivednsRecord(nil).Load(map[string]any{"fqdn": "fqdn", "rrset_name": "rrset_name", "rrset_type": "rrset_type"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.LivednsRecord(nil).Create(map[string]any{
    "fqdn": "example_fqdn",
    "rrset_values": []any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.LivednsRecord(nil).Update(map[string]any{
    "fqdn": "fqdn",
    "rrset_name": "rrset_name",
    "rrset_type": "rrset_type",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Patch(reqdata, ctrl map[string]any) (any, error)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity; `err` is non-nil on failure.

```go
result, err := client.LivednsRecord(nil).Patch(map[string]any{
    "fqdn": "fqdn",
    "rrset_name": "rrset_name",
    "rrset_type": "rrset_type",
    // Only the fields to change
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.LivednsRecord(nil).Remove(map[string]any{"fqdn": "fqdn", "rrset_name": "rrset_name", "rrset_type": "rrset_type"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `LivednsRecordEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## LivednsRrtypeEntity

```go
livednsRrtype := client.LivednsRrtype(nil)
fmt.Println(livednsRrtype.GetName()) // "livedns_rrtype"
```

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.LivednsRrtype(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `LivednsRrtypeEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## LivednsSnapshotEntity

```go
livednsSnapshot := client.LivednsSnapshot(nil)
fmt.Println(livednsSnapshot.GetName()) // "livedns_snapshot"
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
| `zone_data` | `[]any` | Yes |  |

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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.LivednsSnapshot(nil).List(map[string]any{"fqdn": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.LivednsSnapshot(nil).Load(map[string]any{"id": "livedns_snapshot_id", "fqdn": "fqdn"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.LivednsSnapshot(nil).Create(map[string]any{
    "fqdn": "example_fqdn",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.LivednsSnapshot(nil).Update(map[string]any{
    "id": "livedns_snapshot_id",
    "fqdn": "fqdn",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.LivednsSnapshot(nil).Remove(map[string]any{"id": "livedns_snapshot_id", "fqdn": "fqdn"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `LivednsSnapshotEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## LivednsTsigKeyEntity

```go
livednsTsigKey := client.LivednsTsigKey(nil)
fmt.Println(livednsTsigKey.GetName()) // "livedns_tsig_key"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `config_samples` | `map[string]any` | Yes |  |
| `href` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `key_name` | `string` | Yes |  |
| `secret` | `string` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.LivednsTsigKey(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.LivednsTsigKey(nil).Load(map[string]any{"id": "livedns_tsig_key_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.LivednsTsigKey(nil).Create(map[string]any{
    "config_samples": map[string]any{},
    "href": "example_href",
    "id": "example_id",
    "key_name": "example_key_name",
    "secret": "example_secret",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `LivednsTsigKeyEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## MailboxEntity

```go
mailbox := client.Mailbox(nil)
fmt.Println(mailbox.GetName()) // "mailbox"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | `string` | Yes |  |
| `aliases` | `[]any` | No |  |
| `antispam` | `bool` | Yes |  |
| `autorenew` | `map[string]any` | Yes |  |
| `config` | `map[string]any` | Yes |  |
| `config_name` | `string` | Yes |  |
| `created_at` | `string` | Yes |  |
| `data_access` | `bool` | Yes |  |
| `domain_part` | `string` | Yes |  |
| `duration_month` | `int` | No |  |
| `email` | `string` | Yes |  |
| `expires_at` | `string` | Yes |  |
| `internal_domain` | `bool` | Yes |  |
| `issues` | `[]any` | No |  |
| `last_paid_duration` | `int` | Yes |  |
| `local_part` | `string` | Yes |  |
| `message` | `string` | Yes |  |
| `owner` | `map[string]any` | Yes |  |
| `password` | `string` | Yes |  |
| `quota` | `int` | Yes |  |
| `quota_used` | `int` | Yes |  |
| `responder` | `map[string]any` | Yes |  |
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Mailbox(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Mailbox(nil).Load(map[string]any{"address": "address"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.Mailbox(nil).Create(map[string]any{
    "config_name": "example_config_name",
    "email": "example_email",
    "password": "example_password",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.Mailbox(nil).Update(map[string]any{
    "address": "address",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.Mailbox(nil).Remove(map[string]any{"address": "address"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `MailboxEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## MailboxDomainEntity

```go
mailboxDomain := client.MailboxDomain(nil)
fmt.Println(mailboxDomain.GetName()) // "mailbox_domain"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `antispam` | `bool` | Yes |  |
| `configuration` | `[]any` | Yes |  |
| `date_last_validation` | `string` | No |  |
| `dkim` | `bool` | Yes |  |
| `fqdns` | `[]any` | Yes |  |
| `internal` | `bool` | Yes |  |
| `is_livedns` | `bool` | Yes |  |
| `mx` | `bool` | Yes |  |
| `owner` | `map[string]any` | Yes |  |
| `spf` | `bool` | Yes |  |
| `txt` | `bool` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.MailboxDomain(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.MailboxDomain(nil).Load(map[string]any{"domain": "domain"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.MailboxDomain(nil).Create(map[string]any{
    "domain": "example_domain",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `MailboxDomainEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## MailboxForwardEntity

```go
mailboxForward := client.MailboxForward(nil)
fmt.Println(mailboxForward.GetName()) // "mailbox_forward"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `destinations` | `[]any` | Yes |  |
| `message` | `string` | Yes |  |
| `source` | `string` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.MailboxForward(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.MailboxForward(nil).Create(map[string]any{
    "destinations": []any{},
    "source": "example_source",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.MailboxForward(nil).Update(map[string]any{
    "source": "source",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.MailboxForward(nil).Remove(map[string]any{"source": "source"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `MailboxForwardEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## MailboxProductEntity

```go
mailboxProduct := client.MailboxProduct(nil)
fmt.Println(mailboxProduct.GetName()) // "mailbox_product"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `autorenew` | `bool` | No |  |
| `config` | `[]any` | Yes |  |
| `config_name` | `string` | Yes |  |
| `description` | `string` | Yes |  |
| `duration_month` | `int` | Yes |  |
| `label` | `string` | Yes |  |
| `message` | `string` | Yes |  |
| `prices` | `[]any` | Yes |  |
| `quantity` | `int` | Yes |  |
| `taxes` | `[]any` | Yes |  |
| `uuid` | `string` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.MailboxProduct(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.MailboxProduct(nil).Create(map[string]any{
    "config_name": "example_config_name",
    "duration_month": 1,
    "quantity": 1,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `MailboxProductEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## MailboxQuotaEntity

```go
mailboxQuota := client.MailboxQuota(nil)
fmt.Println(mailboxQuota.GetName()) // "mailbox_quota"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `annually` | `map[string]any` | Yes |  |
| `config_name` | `string` | Yes |  |
| `label` | `string` | Yes |  |
| `monthly` | `map[string]any` | Yes |  |
| `quota` | `string` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.MailboxQuota(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `MailboxQuotaEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## MailboxSlotEntity

```go
mailboxSlot := client.MailboxSlot(nil)
fmt.Println(mailboxSlot.GetName()) // "mailbox_slot"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `autorenew` | `map[string]any` | Yes |  |
| `config` | `map[string]any` | Yes |  |
| `expires_at` | `string` | No |  |
| `last_paid_duration` | `int` | No |  |
| `refund_info` | `map[string]any` | Yes |  |
| `refundable` | `bool` | Yes |  |
| `uuid` | `string` | Yes |  |
| `webhosting_pack` | `bool` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.MailboxSlot(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.MailboxSlot(nil).Load(map[string]any{"uuid": "uuid"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `MailboxSlotEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## OrganizationEntity

```go
organization := client.Organization(nil)
fmt.Println(organization.GetName()) // "organization"
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Organization(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Organization(nil).Load(map[string]any{"id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.Organization(nil).Create(map[string]any{
    "city": "example_city",
    "email": "example_email",
    "firstname": "example_firstname",
    "lastname": "example_lastname",
    "name": "example_name",
    "orgname": "example_orgname",
    "phone": "example_phone",
    "streetaddr": "example_streetaddr",
    "type": "example_type",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.Organization(nil).Update(map[string]any{
    "id": "organization_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.Organization(nil).Remove(map[string]any{"id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `OrganizationEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## OrganizationCustomerEntity

```go
organizationCustomer := client.OrganizationCustomer(nil)
fmt.Println(organizationCustomer.GetName()) // "organization_customer"
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.OrganizationCustomer(nil).List(map[string]any{"org_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.OrganizationCustomer(nil).Load(map[string]any{"id": "organization_customer_id", "org_id": "org_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.OrganizationCustomer(nil).Create(map[string]any{
    "org_id": "example_org_id",
    "city": "example_city",
    "country": "example_country",
    "email": "example_email",
    "firstname": "example_firstname",
    "lastname": "example_lastname",
    "phone": "example_phone",
    "streetaddr": "example_streetaddr",
    "type": "example_type",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.OrganizationCustomer(nil).Update(map[string]any{
    "id": "organization_customer_id",
    "org_id": "org_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.OrganizationCustomer(nil).Remove(map[string]any{"id": "organization_customer_id", "org_id": "org_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `OrganizationCustomerEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## TemplateEntity

```go
template := client.Template(nil)
fmt.Println(template.GetName()) // "template"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | Yes |  |
| `editable` | `bool` | Yes |  |
| `href` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `namespaces` | `[]any` | Yes |  |
| `orgname` | `string` | Yes |  |
| `payload` | `map[string]any` | Yes |  |
| `sharing_space` | `map[string]any` | Yes |  |
| `variables` | `[]any` | Yes |  |

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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Template(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Template(nil).Load(map[string]any{"id": "template_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.Template(nil).Create(map[string]any{
    "name": "example_name",
    "payload": map[string]any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.Template(nil).Update(map[string]any{
    "id": "template_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.Template(nil).Remove(map[string]any{"id": "template_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `TemplateEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## TemplateDispatchEntity

```go
templateDispatch := client.TemplateDispatch(nil)
fmt.Println(templateDispatch.GetName()) // "template_dispatch"
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
| `payload` | `map[string]any` | Yes |  |
| `sharing_id` | `string` | Yes |  |
| `state` | `int` | Yes |  |
| `state_msg` | `string` | No |  |
| `target` | `map[string]any` | Yes |  |
| `target_id` | `string` | Yes |  |
| `target_type` | `string` | Yes |  |
| `task_history` | `[]any` | Yes |  |
| `task_status` | `map[string]any` | Yes |  |
| `task_updated_at` | `string` | No |  |
| `template_id` | `string` | No |  |
| `template_name` | `string` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.TemplateDispatch(nil).Load(map[string]any{"id": "template_dispatch_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.TemplateDispatch(nil).Create(map[string]any{
    "template_id": "example_template_id",
    "object_id": "example_object_id",
    "object_type": "example_object_type",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `TemplateDispatchEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## TldEntity

```go
tld := client.Tld(nil)
fmt.Println(tld.GetName()) // "tld"
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Tld(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Tld(nil).Load(map[string]any{"name": "name"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `TldEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## UserEntity

```go
user := client.User(nil)
fmt.Println(user.GetName()) // "user"
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

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.User(nil).Load(map[string]any{"id": "user_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `UserEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

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

```go
client := sdk.NewGandiSDK(map[string]any{
    "feature": map[string]any{
        "debug": map[string]any{"active": true},
        "idempotency": map[string]any{"active": true},
        "metrics": map[string]any{"active": true},
        "paging": map[string]any{"active": true},
        "ratelimit": map[string]any{"active": true},
        "retry": map[string]any{"active": true},
        "secrets": map[string]any{"active": true},
        "test": map[string]any{"active": true},
        "timeout": map[string]any{"active": true},
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

