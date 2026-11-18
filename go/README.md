# Gandi Golang SDK

Gandi API client, generated from an OpenAPI definition constructed from Gandi's API documentation.

The Golang SDK for the Gandi API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.AccessToken(nil)` — each with the same small set of operations (`List`, `Load`, `Create`, `Update`, `Patch`, `Remove`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/gandi-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Tags](https://github.com/voxgig-sdk/gandi-sdk/tags) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/gandi-sdk/go=../gandi-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the entity, and for
`List` a `[]any` of entities, one per record (there is no `{ok, data}`
wrapper), so check `err` and read a record through the entity's
`Data()`.

```go
package main

import (
    "fmt"
    "os"
    sdk "github.com/voxgig-sdk/gandi-sdk/go"
)

func main() {
    client := sdk.NewGandiSDK(map[string]any{
        "apikey": os.Getenv("GANDI_APIKEY"),
    })

    // Create a accessToken.
    created, err := client.AccessToken(nil).Create(map[string]any{"expires_at": "example_expires_at", "name": "example_name"}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(created.(sdk.Entity).Data())
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
livednsdomains, err := client.LivednsDomain(nil).List(nil, nil)
if err != nil {
    // handle err
    return
}
_ = livednsdomains
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

livednsDomains, err := client.LivednsDomain(nil).List(
    nil, nil,
)
if err != nil {
    panic(err)
}
// A []any of entities, one per mock record.
for _, item := range livednsDomains.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewGandiSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
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
cd go && go test ./test/...
```


## Reference

### NewGandiSDK

```go
func NewGandiSDK(options map[string]any) *GandiSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"apikey"` | `string` | API key for authentication. |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *GandiSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### GandiSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `AccessToken` | `(data map[string]any) GandiEntityBase` | Create an AccessToken entity instance. |
| `AcmeAccount` | `(data map[string]any) GandiEntityBase` | Create an AcmeAccount entity instance. |
| `AcmeDomain` | `(data map[string]any) GandiEntityBase` | Create an AcmeDomain entity instance. |
| `AcmePrice` | `(data map[string]any) GandiEntityBase` | Create an AcmePrice entity instance. |
| `AcmeSubscription` | `(data map[string]any) GandiEntityBase` | Create an AcmeSubscription entity instance. |
| `BillingInfo` | `(data map[string]any) GandiEntityBase` | Create a BillingInfo entity instance. |
| `BillingPrice` | `(data map[string]any) GandiEntityBase` | Create a BillingPrice entity instance. |
| `CertificateDcv` | `(data map[string]any) GandiEntityBase` | Create a CertificateDcv entity instance. |
| `CertificatePackage` | `(data map[string]any) GandiEntityBase` | Create a CertificatePackage entity instance. |
| `CertificatePem` | `(data map[string]any) GandiEntityBase` | Create a CertificatePem entity instance. |
| `CertificateRenewal` | `(data map[string]any) GandiEntityBase` | Create a CertificateRenewal entity instance. |
| `CertificateTag` | `(data map[string]any) GandiEntityBase` | Create a CertificateTag entity instance. |
| `Comment` | `(data map[string]any) GandiEntityBase` | Create a Comment entity instance. |
| `Domain` | `(data map[string]any) GandiEntityBase` | Create a Domain entity instance. |
| `DomainAvailability` | `(data map[string]any) GandiEntityBase` | Create a DomainAvailability entity instance. |
| `DomainChangeOwner` | `(data map[string]any) GandiEntityBase` | Create a DomainChangeOwner entity instance. |
| `DomainClaim` | `(data map[string]any) GandiEntityBase` | Create a DomainClaim entity instance. |
| `DomainContact` | `(data map[string]any) GandiEntityBase` | Create a DomainContact entity instance. |
| `DomainDnskey` | `(data map[string]any) GandiEntityBase` | Create a DomainDnskey entity instance. |
| `DomainDnssec` | `(data map[string]any) GandiEntityBase` | Create a DomainDnssec entity instance. |
| `DomainHost` | `(data map[string]any) GandiEntityBase` | Create a DomainHost entity instance. |
| `DomainLivedns` | `(data map[string]any) GandiEntityBase` | Create a DomainLivedns entity instance. |
| `DomainNameserver` | `(data map[string]any) GandiEntityBase` | Create a DomainNameserver entity instance. |
| `DomainTag` | `(data map[string]any) GandiEntityBase` | Create a DomainTag entity instance. |
| `DomainTransfer` | `(data map[string]any) GandiEntityBase` | Create a DomainTransfer entity instance. |
| `DomainWebredir` | `(data map[string]any) GandiEntityBase` | Create a DomainWebredir entity instance. |
| `EmailForward` | `(data map[string]any) GandiEntityBase` | Create an EmailForward entity instance. |
| `EmailMailbox` | `(data map[string]any) GandiEntityBase` | Create an EmailMailbox entity instance. |
| `EmailMigration` | `(data map[string]any) GandiEntityBase` | Create an EmailMigration entity instance. |
| `EmailOffer` | `(data map[string]any) GandiEntityBase` | Create an EmailOffer entity instance. |
| `EmailSlot` | `(data map[string]any) GandiEntityBase` | Create an EmailSlot entity instance. |
| `HostingApplication` | `(data map[string]any) GandiEntityBase` | Create a HostingApplication entity instance. |
| `HostingInstance` | `(data map[string]any) GandiEntityBase` | Create a HostingInstance entity instance. |
| `HostingVhost` | `(data map[string]any) GandiEntityBase` | Create a HostingVhost entity instance. |
| `IssuedCertificate` | `(data map[string]any) GandiEntityBase` | Create an IssuedCertificate entity instance. |
| `LinkedZone` | `(data map[string]any) GandiEntityBase` | Create a LinkedZone entity instance. |
| `LinkedZoneDeployment` | `(data map[string]any) GandiEntityBase` | Create a LinkedZoneDeployment entity instance. |
| `LinkedZoneDomain` | `(data map[string]any) GandiEntityBase` | Create a LinkedZoneDomain entity instance. |
| `LinkedZoneTask` | `(data map[string]any) GandiEntityBase` | Create a LinkedZoneTask entity instance. |
| `LivednsAxfrSlave` | `(data map[string]any) GandiEntityBase` | Create a LivednsAxfrSlave entity instance. |
| `LivednsAxfrTsig` | `(data map[string]any) GandiEntityBase` | Create a LivednsAxfrTsig entity instance. |
| `LivednsDomain` | `(data map[string]any) GandiEntityBase` | Create a LivednsDomain entity instance. |
| `LivednsKey` | `(data map[string]any) GandiEntityBase` | Create a LivednsKey entity instance. |
| `LivednsNameserver` | `(data map[string]any) GandiEntityBase` | Create a LivednsNameserver entity instance. |
| `LivednsRecord` | `(data map[string]any) GandiEntityBase` | Create a LivednsRecord entity instance. |
| `LivednsRrtype` | `(data map[string]any) GandiEntityBase` | Create a LivednsRrtype entity instance. |
| `LivednsSnapshot` | `(data map[string]any) GandiEntityBase` | Create a LivednsSnapshot entity instance. |
| `LivednsTsigKey` | `(data map[string]any) GandiEntityBase` | Create a LivednsTsigKey entity instance. |
| `LivednsZone` | `(data map[string]any) GandiEntityBase` | Create a LivednsZone entity instance. |
| `Mailbox` | `(data map[string]any) GandiEntityBase` | Create a Mailbox entity instance. |
| `MailboxDomain` | `(data map[string]any) GandiEntityBase` | Create a MailboxDomain entity instance. |
| `MailboxForward` | `(data map[string]any) GandiEntityBase` | Create a MailboxForward entity instance. |
| `MailboxProduct` | `(data map[string]any) GandiEntityBase` | Create a MailboxProduct entity instance. |
| `MailboxQuota` | `(data map[string]any) GandiEntityBase` | Create a MailboxQuota entity instance. |
| `MailboxSlot` | `(data map[string]any) GandiEntityBase` | Create a MailboxSlot entity instance. |
| `Organization` | `(data map[string]any) GandiEntityBase` | Create an Organization entity instance. |
| `OrganizationCustomer` | `(data map[string]any) GandiEntityBase` | Create an OrganizationCustomer entity instance. |
| `Template` | `(data map[string]any) GandiEntityBase` | Create a Template entity instance. |
| `TemplateDispatch` | `(data map[string]any) GandiEntityBase` | Create a TemplateDispatch entity instance. |
| `Tld` | `(data map[string]any) GandiEntityBase` | Create a Tld entity instance. |
| `User` | `(data map[string]any) GandiEntityBase` | Create an User entity instance. |

### Entity interface (GandiEntityBase)

All entities implement the `GandiEntityBase` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria, and return it. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria, one per record. |
| `Create` | `(reqdata, ctrl map[string]any) (any, error)` | Create a new entity, and return it. |
| `Update` | `(reqdata, ctrl map[string]any) (any, error)` | Update an existing entity, and return it. |
| `Patch` | `(reqdata, ctrl map[string]any) (any, error)` | Change part of an existing entity, and return it. |
| `Remove` | `(reqmatch, ctrl map[string]any) (any, error)` | Remove an entity, and return it marked as deleted. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the entity
itself — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` / `Create` / `Update` / `Patch` / `Remove` | the entity, whose `Data()` reads its record (`map[string]any`) |
| `List` | a `[]any` of entities, one per record |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    accessToken, err := client.AccessToken(nil).Create(map[string]any{/* fields */}, nil)
    if err != nil { /* handle */ }
    // accessToken is the entity; accessToken.(sdk.Entity).Data() reads its record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### AccessToken

| Field | Description |
| --- | --- |
| `"access_token"` |  |
| `"entities"` |  |
| `"expires_at"` |  |
| `"id"` |  |
| `"name"` |  |
| `"scopes"` |  |

Operations: Create.

API path: `/organization/access-tokens`

#### AcmeAccount

| Field | Description |
| --- | --- |
| `"created_at"` |  |
| `"deleted_at"` |  |
| `"external_id"` |  |
| `"id"` |  |
| `"ip"` |  |
| `"last_activity"` |  |
| `"status"` |  |
| `"subscription_id"` |  |

Operations: List, Load.

API path: `/acme/subscriptions/{subscription_id}/accounts`

#### AcmeDomain

| Field | Description |
| --- | --- |
| `"created_at"` |  |
| `"deleted_at"` |  |
| `"hostname"` |  |
| `"hostname_ulabel"` |  |
| `"is_wildcard"` |  |
| `"status"` |  |
| `"subscription_id"` |  |

Operations: List, Load.

API path: `/acme/subscriptions/{subscription_id}/domains`

#### AcmePrice

| Field | Description |
| --- | --- |
| `"country"` |  |
| `"currency"` |  |
| `"domains"` |  |
| `"duration"` |  |
| `"duration_unit"` |  |
| `"grid"` |  |
| `"max_duration"` |  |
| `"min_duration"` |  |
| `"price_after_taxes"` |  |
| `"price_before_taxes"` |  |
| `"process"` |  |
| `"product"` |  |
| `"provider"` |  |
| `"tax_rate"` |  |
| `"taxes"` |  |
| `"validation_type"` |  |

Operations: Create, List.

API path: `/acme/quote`

#### AcmeSubscription

| Field | Description |
| --- | --- |
| `"country"` |  |
| `"created_at"` |  |
| `"currency"` |  |
| `"domains"` |  |
| `"duration"` |  |
| `"eab_hmac"` |  |
| `"eab_id"` |  |
| `"ends_at"` |  |
| `"grid"` |  |
| `"message"` |  |
| `"name"` |  |
| `"provider"` |  |
| `"server_url"` |  |
| `"status"` |  |
| `"subscription_id"` |  |
| `"validation_type"` |  |
| `"years"` |  |

Operations: Create, List, Load, Remove, Update.

API path: `/acme/subscriptions`

#### BillingInfo

| Field | Description |
| --- | --- |
| `"annual_balance"` |  |
| `"grid"` |  |
| `"outstanding_amount"` |  |
| `"prepaid"` |  |
| `"prepaid_monthly_invoice"` |  |

Operations: Load.

API path: `/billing/info/{sharing_id}`

#### BillingPrice

| Field | Description |
| --- | --- |
| `"currency"` |  |
| `"grid"` |  |
| `"products"` |  |
| `"taxes"` |  |

Operations: Load.

API path: `/billing/price/{type}`

#### CertificateDcv

| Field | Description |
| --- | --- |
| `"message"` |  |
| `"method"` |  |

Operations: Patch, Update.

API path: `/certificate/issued-certs/{id}/dcv`

#### CertificatePackage

| Field | Description |
| --- | --- |
| `"category"` |  |
| `"href"` |  |
| `"max_domains"` |  |
| `"min_domains"` |  |
| `"name"` |  |
| `"provider"` |  |
| `"sgc"` |  |
| `"trustlogo"` |  |
| `"warranty"` |  |
| `"wildcard"` |  |

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
| `"csr"` |  |
| `"dcv_method"` |  |
| `"duration"` |  |
| `"errors"` |  |
| `"status"` |  |

Operations: Create.

API path: `/certificate/issued-certs/{id}`

#### CertificateTag

| Field | Description |
| --- | --- |
| `"add"` |  |
| `"message"` |  |
| `"remove"` |  |
| `"tag"` |  |
| `"tags"` |  |

Operations: Create, List, Patch, Remove, Update.

API path: `/certificate/issued-certs/{id}/tags`

#### Comment

| Field | Description |
| --- | --- |
| `"content"` |  |
| `"created_at"` |  |
| `"errors"` |  |
| `"id"` |  |
| `"status"` |  |
| `"updated_at"` |  |
| `"user"` |  |

Operations: Create, Load, Remove.

API path: `/comment/comments/{id}`

#### Domain

| Field | Description |
| --- | --- |
| `"admin"` |  |
| `"authinfo"` |  |
| `"autorenew"` |  |
| `"bill"` |  |
| `"can_tld_lock"` |  |
| `"claims"` |  |
| `"contacts"` |  |
| `"currency"` |  |
| `"dates"` |  |
| `"domain_owner"` |  |
| `"duration"` |  |
| `"enforce_premium"` |  |
| `"errors"` |  |
| `"extra_parameters"` |  |
| `"fqdn"` |  |
| `"fqdn_unicode"` |  |
| `"href"` |  |
| `"id"` |  |
| `"lang"` |  |
| `"mailbox_optin"` |  |
| `"nameserver"` |  |
| `"nameservers"` |  |
| `"nameservers_ips"` |  |
| `"orga_owner"` |  |
| `"owner"` |  |
| `"price"` |  |
| `"reachability"` |  |
| `"resellee_id"` |  |
| `"services"` |  |
| `"sharing_id"` |  |
| `"sharing_space"` |  |
| `"smd"` |  |
| `"status"` |  |
| `"tags"` |  |
| `"tech"` |  |
| `"template_id"` |  |
| `"tld"` |  |
| `"tld_period"` |  |
| `"trustee_roles"` |  |

Operations: Create, List, Load, Remove, Update.

API path: `/domain/domains/{domain}/renew`

#### DomainAvailability

| Field | Description |
| --- | --- |
| `"currency"` |  |
| `"grid"` |  |
| `"products"` |  |
| `"taxes"` |  |

Operations: Load.

API path: `/domain/check`

#### DomainChangeOwner

| Field | Description |
| --- | --- |
| `"admin"` |  |
| `"bill"` |  |
| `"created_at"` |  |
| `"date_start"` |  |
| `"errors"` |  |
| `"errortype"` |  |
| `"errortype_label"` |  |
| `"foa"` |  |
| `"inner_step"` |  |
| `"owner"` |  |
| `"params"` |  |
| `"status"` |  |
| `"step"` |  |
| `"step_nb"` |  |
| `"tech"` |  |
| `"updated_at"` |  |

Operations: Create, Load.

API path: `/domain/changeowner/{domain}`

#### DomainClaim

| Field | Description |
| --- | --- |
| `"claims"` |  |
| `"created_at"` |  |
| `"expires_at"` |  |
| `"fqdn"` |  |
| `"fqdn_alabel"` |  |
| `"fqdn_ulabel"` |  |
| `"notice_id"` |  |
| `"status"` |  |

Operations: Create, Load.

API path: `/domain/domains/{domain}/claims`

#### DomainContact

| Field | Description |
| --- | --- |
| `"admin"` |  |
| `"bill"` |  |
| `"message"` |  |
| `"owner"` |  |
| `"tech"` |  |

Operations: Load, Update.

API path: `/domain/domains/{domain}/contacts`

#### DomainDnskey

| Field | Description |
| --- | --- |
| `"algorithm"` |  |
| `"digest"` |  |
| `"digest_type"` |  |
| `"href"` |  |
| `"id"` |  |
| `"keys"` |  |
| `"keytag"` |  |
| `"message"` |  |
| `"public_key"` |  |
| `"type"` |  |

Operations: Create, List, Remove, Update.

API path: `/domain/domains/{domain}/dnskeys`

#### DomainDnssec

| Field | Description |
| --- | --- |
| `"error"` |  |
| `"state"` |  |

Operations: Create, Load, Remove.

API path: `/domain/domains/{domain}/livedns/dnssec`

#### DomainHost

| Field | Description |
| --- | --- |
| `"fqdn"` |  |
| `"fqdn_unicode"` |  |
| `"href"` |  |
| `"ips"` |  |
| `"message"` |  |
| `"name"` |  |

Operations: Create, List, Load, Remove, Update.

API path: `/domain/domains/{domain}/hosts`

#### DomainLivedns

| Field | Description |
| --- | --- |
| `"current"` |  |
| `"dnssec_available"` |  |
| `"livednssec_available"` |  |
| `"message"` |  |
| `"nameservers"` |  |

Operations: Create, Load.

API path: `/domain/domains/{domain}/livedns`

#### DomainNameserver

| Field | Description |
| --- | --- |
| `"message"` |  |
| `"nameservers"` |  |

Operations: List, Update.

API path: `/domain/domains/{domain}/nameservers`

#### DomainTag

| Field | Description |
| --- | --- |
| `"add"` |  |
| `"message"` |  |
| `"remove"` |  |
| `"tag"` |  |
| `"tags"` |  |

Operations: Create, List, Patch, Remove, Update.

API path: `/domain/domains/{domain}/tags`

#### DomainTransfer

| Field | Description |
| --- | --- |
| `"admin"` |  |
| `"authinfo"` |  |
| `"bill"` |  |
| `"change_owner"` |  |
| `"created_at"` |  |
| `"currency"` |  |
| `"duration"` |  |
| `"enforce_premium"` |  |
| `"errors"` |  |
| `"errortype"` |  |
| `"errortype_label"` |  |
| `"extra_parameters"` |  |
| `"foa"` |  |
| `"fqdn"` |  |
| `"inner_step"` |  |
| `"mailbox_optin"` |  |
| `"message"` |  |
| `"nameservers"` |  |
| `"nameservers_ips"` |  |
| `"owner"` |  |
| `"owner_contact"` |  |
| `"params"` |  |
| `"price"` |  |
| `"regac_at"` |  |
| `"resellee_id"` |  |
| `"start_at"` |  |
| `"status"` |  |
| `"step"` |  |
| `"step_nb"` |  |
| `"tech"` |  |
| `"template_id"` |  |
| `"transfer_link"` |  |
| `"transfer_procedure"` |  |
| `"updated_at"` |  |

Operations: Create, Load, Update.

API path: `/domain/transferin/{domain}/available`

#### DomainWebredir

| Field | Description |
| --- | --- |
| `"cert_status"` |  |
| `"cert_uuid"` |  |
| `"created_at"` |  |
| `"host"` |  |
| `"message"` |  |
| `"override"` |  |
| `"protocol"` |  |
| `"type"` |  |
| `"updated_at"` |  |
| `"url"` |  |

Operations: Create, List, Load, Remove, Update.

API path: `/domain/domains/{domain}/webredirs`

#### EmailForward

| Field | Description |
| --- | --- |
| `"destinations"` |  |
| `"href"` |  |
| `"id"` |  |
| `"message"` |  |
| `"source"` |  |

Operations: Create, List, Remove, Update.

API path: `/email/forwards/{domain}`

#### EmailMailbox

| Field | Description |
| --- | --- |
| `"address"` |  |
| `"alias_count"` |  |
| `"aliases"` |  |
| `"antispam"` |  |
| `"autorenew"` |  |
| `"domain"` |  |
| `"errors"` |  |
| `"expires_at"` |  |
| `"fallback_email"` |  |
| `"href"` |  |
| `"id"` |  |
| `"login"` |  |
| `"mailbox_type"` |  |
| `"message"` |  |
| `"password"` |  |
| `"quota_used"` |  |
| `"responder"` |  |
| `"status"` |  |
| `"to_convert"` |  |

Operations: Create, List, Load, Remove, Update.

API path: `/email/mailboxes/{domain}/{email}/renew`

#### EmailMigration

| Field | Description |
| --- | --- |
| `"available"` |  |
| `"currency"` |  |
| `"forward_count"` |  |
| `"free_mailboxes"` |  |
| `"included_mailboxes"` |  |
| `"info"` |  |
| `"message"` |  |
| `"packmail"` |  |
| `"price_v1"` |  |
| `"price_v2"` |  |
| `"quota_v1"` |  |
| `"token"` |  |
| `"usage_v1"` |  |

Operations: Create, Load.

API path: `/email/migration/{domain}`

#### EmailOffer

| Field | Description |
| --- | --- |
| `"antispam"` |  |
| `"dkim"` |  |
| `"message"` |  |
| `"status"` |  |
| `"version"` |  |

Operations: Load, Update.

API path: `/email/offers/{domain}`

#### EmailSlot

| Field | Description |
| --- | --- |
| `"autorenew"` |  |
| `"capacity"` |  |
| `"created_at"` |  |
| `"duration"` |  |
| `"gandi_id"` |  |
| `"href"` |  |
| `"id"` |  |
| `"mailbox_type"` |  |
| `"refund_amount"` |  |
| `"refund_currency"` |  |
| `"refundable"` |  |
| `"status"` |  |

Operations: Create, List, Load, Remove.

API path: `/email/slots/{domain}`

#### HostingApplication

| Field | Description |
| --- | --- |
| `"name"` |  |
| `"name_label"` |  |
| `"requirements"` |  |

Operations: List, Load.

API path: `/simplehosting/applications`

#### HostingInstance

| Field | Description |
| --- | --- |
| `"access_information"` |  |
| `"authentication"` |  |
| `"autorenew"` |  |
| `"available_upgrade"` |  |
| `"booster"` |  |
| `"booster_options"` |  |
| `"compatible_applications"` |  |
| `"console"` |  |
| `"cpu"` |  |
| `"created_at"` |  |
| `"database"` |  |
| `"datacenter"` |  |
| `"domain"` |  |
| `"duration"` |  |
| `"duration_unit"` |  |
| `"errors"` |  |
| `"expire_at"` |  |
| `"id"` |  |
| `"language"` |  |
| `"language_id"` |  |
| `"location"` |  |
| `"message"` |  |
| `"name"` |  |
| `"password"` |  |
| `"password_updated_at"` |  |
| `"ram"` |  |
| `"sharing_space"` |  |
| `"size"` |  |
| `"snapshot_enabled"` |  |
| `"status"` |  |
| `"storage"` |  |
| `"storage_additional_size"` |  |
| `"subscription_cancelled"` |  |
| `"type"` |  |
| `"upgrade_to"` |  |
| `"vhosts"` |  |

Operations: Create, List, Load, Remove, Update.

API path: `/simplehosting/instances/{instance_id}/action`

#### HostingVhost

| Field | Description |
| --- | --- |
| `"application"` |  |
| `"created_at"` |  |
| `"deployment"` |  |
| `"fqdn"` |  |
| `"https_strategy"` |  |
| `"is_a_test_vhost"` |  |
| `"linked_dns_zone"` |  |
| `"status"` |  |
| `"tls_validated_at"` |  |

Operations: Create, List, Load, Remove, Update.

API path: `/simplehosting/instances/{instance_id}/vhosts`

#### IssuedCertificate

| Field | Description |
| --- | --- |
| `"altnames"` |  |
| `"altnames_unicode"` |  |
| `"apex_only"` |  |
| `"assumed_name"` |  |
| `"business_category"` |  |
| `"card_pay_trustlogo"` |  |
| `"cert"` |  |
| `"cn"` |  |
| `"cn_unicode"` |  |
| `"contact"` |  |
| `"csr"` |  |
| `"dates"` |  |
| `"dcv_method"` |  |
| `"duration"` |  |
| `"error_msg"` |  |
| `"errors"` |  |
| `"href"` |  |
| `"id"` |  |
| `"ida"` |  |
| `"intermediate"` |  |
| `"joi"` |  |
| `"middleman"` |  |
| `"owner"` |  |
| `"package"` |  |
| `"provider"` |  |
| `"reissuable"` |  |
| `"renewable"` |  |
| `"resellee_id"` |  |
| `"sha_version"` |  |
| `"sharing_id"` |  |
| `"software"` |  |
| `"state"` |  |
| `"state_detail"` |  |
| `"status"` |  |
| `"step_nb"` |  |
| `"stored"` |  |
| `"tags"` |  |
| `"trustlogo"` |  |
| `"trustlogo_token"` |  |

Operations: Create, List, Load, Remove, Update.

API path: `/certificate/issued-certs/{id}/dcv_params`

#### LinkedZone

| Field | Description |
| --- | --- |
| `"created_at"` |  |
| `"default_records"` |  |
| `"domain_count"` |  |
| `"domains"` |  |
| `"id"` |  |
| `"message"` |  |
| `"name"` |  |
| `"record_list"` |  |
| `"record_text"` |  |
| `"records"` |  |
| `"sharing_space"` |  |
| `"status"` |  |
| `"updated_at"` |  |

Operations: Create, List, Load, Remove, Update.

API path: `/linkedzone/zones`

#### LinkedZoneDeployment

| Field | Description |
| --- | --- |
| `"deploy"` |  |
| `"message"` |  |

Operations: Create.

API path: `/linkedzone/zones/{zone_id}`

#### LinkedZoneDomain

| Field | Description |
| --- | --- |
| `"deployed"` |  |
| `"id"` |  |
| `"name"` |  |
| `"owner"` |  |
| `"zone"` |  |

Operations: List, Load, Update.

API path: `/linkedzone/domains`

#### LinkedZoneTask

| Field | Description |
| --- | --- |
| `"created_at"` |  |
| `"ending_at"` |  |
| `"id"` |  |
| `"result"` |  |
| `"status"` |  |
| `"type"` |  |
| `"updated_at"` |  |
| `"zone_id"` |  |

Operations: List, Load.

API path: `/linkedzone/tasks`

#### LivednsAxfrSlave

| Field | Description |
| --- | --- |
| `"message"` |  |

Operations: List, Remove, Update.

API path: `/livedns/domains/{fqdn}/axfr/slaves`

#### LivednsAxfrTsig

| Field | Description |
| --- | --- |
| `"href"` |  |
| `"id"` |  |
| `"key_name"` |  |
| `"message"` |  |

Operations: List, Remove, Update.

API path: `/livedns/domains/{fqdn}/axfr/tsig`

#### LivednsDomain

| Field | Description |
| --- | --- |
| `"automatic_snapshots"` |  |
| `"domain_href"` |  |
| `"domain_keys_href"` |  |
| `"domain_records_href"` |  |
| `"fqdn"` |  |
| `"message"` |  |
| `"zone"` |  |

Operations: Create, List, Load, Update.

API path: `/livedns/domains`

#### LivednsKey

| Field | Description |
| --- | --- |
| `"algorithm"` |  |
| `"algorithm_name"` |  |
| `"deleted"` |  |
| `"ds"` |  |
| `"fingerprint"` |  |
| `"flags"` |  |
| `"fqdn"` |  |
| `"id"` |  |
| `"key_href"` |  |
| `"message"` |  |
| `"public_key"` |  |
| `"status"` |  |
| `"tag"` |  |

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
| `"add_rrset_values"` |  |
| `"id"` |  |
| `"message"` |  |
| `"remove_rrset_values"` |  |
| `"rrset_href"` |  |
| `"rrset_name"` |  |
| `"rrset_ttl"` |  |
| `"rrset_type"` |  |
| `"rrset_values"` |  |

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
| `"automatic"` |  |
| `"created_at"` |  |
| `"href"` |  |
| `"id"` |  |
| `"message"` |  |
| `"name"` |  |
| `"zone_data"` |  |

Operations: Create, List, Load, Remove, Update.

API path: `/livedns/domains/{fqdn}/snapshots`

#### LivednsTsigKey

| Field | Description |
| --- | --- |
| `"config_samples"` |  |
| `"href"` |  |
| `"id"` |  |
| `"key_name"` |  |
| `"secret"` |  |

Operations: Create, List, Load.

API path: `/livedns/axfr/tsig`

#### LivednsZone

| Field | Description |
| --- | --- |
| `"items"` |  |
| `"message"` |  |
| `"remove_apex_ns"` |  |

Operations: Remove, Update.

API path: `/livedns/domains/{fqdn}/records`

#### Mailbox

| Field | Description |
| --- | --- |
| `"address"` |  |
| `"aliases"` |  |
| `"antispam"` |  |
| `"autorenew"` |  |
| `"config"` |  |
| `"config_name"` |  |
| `"created_at"` |  |
| `"data_access"` |  |
| `"domain_part"` |  |
| `"duration_month"` |  |
| `"email"` |  |
| `"expires_at"` |  |
| `"internal_domain"` |  |
| `"issues"` |  |
| `"last_paid_duration"` |  |
| `"local_part"` |  |
| `"message"` |  |
| `"owner"` |  |
| `"password"` |  |
| `"quota"` |  |
| `"quota_used"` |  |
| `"responder"` |  |
| `"updated_at"` |  |
| `"uuid"` |  |

Operations: Create, List, Load, Remove, Update.

API path: `/mailbox/mailboxes/{email}/renew`

#### MailboxDomain

| Field | Description |
| --- | --- |
| `"antispam"` |  |
| `"configuration"` |  |
| `"date_last_validation"` |  |
| `"dkim"` |  |
| `"fqdns"` |  |
| `"internal"` |  |
| `"is_livedns"` |  |
| `"mx"` |  |
| `"owner"` |  |
| `"spf"` |  |
| `"txt"` |  |

Operations: Create, List, Load.

API path: `/mailbox/domains/{domain}/validate`

#### MailboxForward

| Field | Description |
| --- | --- |
| `"destinations"` |  |
| `"message"` |  |
| `"source"` |  |

Operations: Create, List, Remove, Update.

API path: `/mailbox/forwards`

#### MailboxProduct

| Field | Description |
| --- | --- |
| `"autorenew"` |  |
| `"config"` |  |
| `"config_name"` |  |
| `"description"` |  |
| `"duration_month"` |  |
| `"label"` |  |
| `"message"` |  |
| `"prices"` |  |
| `"quantity"` |  |
| `"taxes"` |  |
| `"uuid"` |  |

Operations: Create, List.

API path: `/mailbox/products`

#### MailboxQuota

| Field | Description |
| --- | --- |
| `"annually"` |  |
| `"config_name"` |  |
| `"label"` |  |
| `"monthly"` |  |
| `"quota"` |  |

Operations: List.

API path: `/mailbox/quotas`

#### MailboxSlot

| Field | Description |
| --- | --- |
| `"autorenew"` |  |
| `"config"` |  |
| `"expires_at"` |  |
| `"last_paid_duration"` |  |
| `"refund_info"` |  |
| `"refundable"` |  |
| `"uuid"` |  |
| `"webhosting_pack"` |  |

Operations: List, Load.

API path: `/mailbox/slots`

#### Organization

| Field | Description |
| --- | --- |
| `"city"` |  |
| `"corporate"` |  |
| `"country"` |  |
| `"email"` |  |
| `"fax"` |  |
| `"firstname"` |  |
| `"id"` |  |
| `"lang"` |  |
| `"lastname"` |  |
| `"message"` |  |
| `"name"` |  |
| `"orgname"` |  |
| `"phone"` |  |
| `"reference"` |  |
| `"reseller"` |  |
| `"siren"` |  |
| `"state"` |  |
| `"streetaddr"` |  |
| `"streetaddr2"` |  |
| `"type"` |  |
| `"vat_number"` |  |
| `"zip"` |  |

Operations: Create, List, Load, Remove, Update.

API path: `/organization/organizations/{org_id}/action`

#### OrganizationCustomer

| Field | Description |
| --- | --- |
| `"city"` |  |
| `"country"` |  |
| `"email"` |  |
| `"fax"` |  |
| `"firstname"` |  |
| `"id"` |  |
| `"lang"` |  |
| `"lastname"` |  |
| `"message"` |  |
| `"name"` |  |
| `"orgname"` |  |
| `"phone"` |  |
| `"reference"` |  |
| `"siren"` |  |
| `"state"` |  |
| `"streetaddr"` |  |
| `"streetaddr2"` |  |
| `"sync_contact_email"` |  |
| `"type"` |  |
| `"vat_number"` |  |
| `"zip"` |  |

Operations: Create, List, Load, Remove, Update.

API path: `/organization/organizations/{org_id}/customers`

#### Template

| Field | Description |
| --- | --- |
| `"description"` |  |
| `"editable"` |  |
| `"href"` |  |
| `"id"` |  |
| `"name"` |  |
| `"namespaces"` |  |
| `"orgname"` |  |
| `"payload"` |  |
| `"sharing_space"` |  |
| `"variables"` |  |

Operations: Create, List, Load, Remove, Update.

API path: `/template/templates`

#### TemplateDispatch

| Field | Description |
| --- | --- |
| `"attempt"` |  |
| `"created_at"` |  |
| `"dispatch_href"` |  |
| `"id"` |  |
| `"message"` |  |
| `"object_id"` |  |
| `"object_type"` |  |
| `"payload"` |  |
| `"sharing_id"` |  |
| `"state"` |  |
| `"state_msg"` |  |
| `"target"` |  |
| `"target_id"` |  |
| `"target_type"` |  |
| `"task_history"` |  |
| `"task_status"` |  |
| `"task_updated_at"` |  |
| `"template_id"` |  |
| `"template_name"` |  |

Operations: Create, Load.

API path: `/template/templates/{id}`

#### Tld

| Field | Description |
| --- | --- |
| `"authinfo_for_transfer"` |  |
| `"category"` |  |
| `"change_owner"` |  |
| `"corporate"` |  |
| `"ext_trade"` |  |
| `"full_tld"` |  |
| `"href"` |  |
| `"lock"` |  |
| `"name"` |  |

Operations: List, Load.

API path: `/domain/tlds`

#### User

| Field | Description |
| --- | --- |
| `"city"` |  |
| `"country"` |  |
| `"email"` |  |
| `"fax"` |  |
| `"firstname"` |  |
| `"id"` |  |
| `"lang"` |  |
| `"lastname"` |  |
| `"name"` |  |
| `"phone"` |  |
| `"state"` |  |
| `"streetaddr"` |  |
| `"streetaddr2"` |  |
| `"username"` |  |
| `"zip"` |  |

Operations: Load.

API path: `/organization/user-info`



## Entities


### AccessToken

Create an instance: `accessToken := client.AccessToken(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `access_token` | `string` |  |
| `entities` | `[]any` |  |
| `expires_at` | `string` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `scopes` | `[]any` |  |

#### Example: Create

```go
result, err := client.AccessToken(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### AcmeAccount

Create an instance: `acmeAccount := client.AcmeAccount(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

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

```go
acmeAccount, err := client.AcmeAccount(nil).Load(map[string]any{"id": "acme_account_id", "subscription_id": "subscription_id", "sharing_id": "sharing_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(acmeAccount.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
acmeAccounts, err := client.AcmeAccount(nil).List(map[string]any{"subscription_id": "example", "sharing_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range acmeAccounts.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### AcmeDomain

Create an instance: `acmeDomain := client.AcmeDomain(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

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

```go
acmeDomain, err := client.AcmeDomain(nil).Load(map[string]any{"domain_id": 1, "subscription_id": "subscription_id", "sharing_id": "sharing_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(acmeDomain.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
acmeDomains, err := client.AcmeDomain(nil).List(map[string]any{"subscription_id": "example", "domain": "example", "sharing_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range acmeDomains.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### AcmePrice

Create an instance: `acmePrice := client.AcmePrice(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `country` | `string` |  |
| `currency` | `string` |  |
| `domains` | `[]any` |  |
| `duration` | `string` |  |
| `duration_unit` | `string` |  |
| `grid` | `string` |  |
| `max_duration` | `int` |  |
| `min_duration` | `int` |  |
| `price_after_taxes` | `string` |  |
| `price_before_taxes` | `string` |  |
| `process` | `string` |  |
| `product` | `map[string]any` |  |
| `provider` | `string` |  |
| `tax_rate` | `string` |  |
| `taxes` | `[]any` |  |
| `validation_type` | `string` |  |

#### Example: List

```go
acmePrices, err := client.AcmePrice(nil).List(map[string]any{"country": "example", "currency": "example", "duration": "example", "grid": "example", "process": "example", "provider": "example", "sharing_id": "example", "validation_type": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range acmePrices.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

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
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### AcmeSubscription

Create an instance: `acmeSubscription := client.AcmeSubscription(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `country` | `string` |  |
| `created_at` | `string` |  |
| `currency` | `string` |  |
| `domains` | `[]any` |  |
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

```go
acmeSubscription, err := client.AcmeSubscription(nil).Load(map[string]any{"subscription_id": "subscription_id", "sharing_id": "sharing_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(acmeSubscription.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
acmeSubscriptions, err := client.AcmeSubscription(nil).List(map[string]any{"created_at": "example", "ends_at": "example", "name": "example", "provider": "example", "sharing_id": "example", "status": "example", "validation_type": "example", "year": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range acmeSubscriptions.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

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
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### BillingInfo

Create an instance: `billingInfo := client.BillingInfo(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `annual_balance` | `float64` |  |
| `grid` | `string` |  |
| `outstanding_amount` | `float64` |  |
| `prepaid` | `map[string]any` |  |
| `prepaid_monthly_invoice` | `bool` |  |

#### Example: Load

```go
billingInfo, err := client.BillingInfo(nil).Load(map[string]any{"sharing_id": "sharing_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(billingInfo.(sdk.Entity).Data()) // the loaded entity's record
```


### BillingPrice

Create an instance: `billingPrice := client.BillingPrice(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `currency` | `string` |  |
| `grid` | `string` |  |
| `products` | `[]any` |  |
| `taxes` | `[]any` |  |

#### Example: Load

```go
billingPrice, err := client.BillingPrice(nil).Load(map[string]any{"type": "type", "name": []any{}, "process": []any{}}, nil)
if err != nil {
    panic(err)
}
fmt.Println(billingPrice.(sdk.Entity).Data()) // the loaded entity's record
```


### CertificateDcv

Create an instance: `certificateDcv := client.CertificateDcv(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `message` | `string` |  |
| `method` | `string` |  |


### CertificatePackage

Create an instance: `certificatePackage := client.CertificatePackage(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `category` | `map[string]any` |  |
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

```go
certificatePackage, err := client.CertificatePackage(nil).Load(map[string]any{"name": "name"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(certificatePackage.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
certificatePackages, err := client.CertificatePackage(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range certificatePackages.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### CertificatePem

Create an instance: `certificatePem := client.CertificatePem(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
certificatePem, err := client.CertificatePem(nil).Load(map[string]any{"type": "type"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(certificatePem.(sdk.Entity).Data()) // the loaded entity's record
```


### CertificateRenewal

Create an instance: `certificateRenewal := client.CertificateRenewal(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `csr` | `string` |  |
| `dcv_method` | `string` |  |
| `duration` | `int` |  |
| `errors` | `[]any` |  |
| `status` | `string` |  |

#### Example: Create

```go
result, err := client.CertificateRenewal(nil).Create(map[string]any{
    "certificate_id": "example_certificate_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### CertificateTag

Create an instance: `certificateTag := client.CertificateTag(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `add` | `[]any` |  |
| `message` | `string` |  |
| `remove` | `[]any` |  |
| `tag` | `string` |  |
| `tags` | `[]any` |  |

#### Example: List

```go
certificateTags, err := client.CertificateTag(nil).List(map[string]any{"certificate_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range certificateTags.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.CertificateTag(nil).Create(map[string]any{
    "certificate_id": "example_certificate_id",
    "tag": "example_tag",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### Comment

Create an instance: `comment := client.Comment(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `content` | `string` |  |
| `created_at` | `string` |  |
| `errors` | `[]any` |  |
| `id` | `string` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |
| `user` | `map[string]any` |  |

#### Example: Load

```go
comment, err := client.Comment(nil).Load(map[string]any{"entity_id": "entity_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(comment.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.Comment(nil).Create(map[string]any{
    "entity_id": "example_entity_id",
    "content": "example_content",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### Domain

Create an instance: `domain := client.Domain(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `admin` | `map[string]any` |  |
| `authinfo` | `string` |  |
| `autorenew` | `map[string]any` |  |
| `bill` | `map[string]any` |  |
| `can_tld_lock` | `bool` |  |
| `claims` | `string` |  |
| `contacts` | `map[string]any` |  |
| `currency` | `string` |  |
| `dates` | `map[string]any` |  |
| `domain_owner` | `string` |  |
| `duration` | `int` |  |
| `enforce_premium` | `bool` |  |
| `errors` | `[]any` |  |
| `extra_parameters` | `map[string]any` |  |
| `fqdn` | `string` |  |
| `fqdn_unicode` | `string` |  |
| `href` | `string` |  |
| `id` | `string` |  |
| `lang` | `string` |  |
| `mailbox_optin` | `bool` |  |
| `nameserver` | `map[string]any` |  |
| `nameservers` | `[]any` |  |
| `nameservers_ips` | `map[string]any` |  |
| `orga_owner` | `string` |  |
| `owner` | `map[string]any` |  |
| `price` | `float64` |  |
| `reachability` | `string` |  |
| `resellee_id` | `string` |  |
| `services` | `[]any` |  |
| `sharing_id` | `string` |  |
| `sharing_space` | `map[string]any` |  |
| `smd` | `string` |  |
| `status` | `[]any` |  |
| `tags` | `[]any` |  |
| `tech` | `map[string]any` |  |
| `template_id` | `string` |  |
| `tld` | `string` |  |
| `tld_period` | `string` |  |
| `trustee_roles` | `[]any` |  |

#### Example: Load

```go
domain, err := client.Domain(nil).Load(map[string]any{"fqdn": "fqdn"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(domain.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
domains, err := client.Domain(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range domains.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

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
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### DomainAvailability

Create an instance: `domainAvailability := client.DomainAvailability(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `currency` | `string` |  |
| `grid` | `string` |  |
| `products` | `[]any` |  |
| `taxes` | `[]any` |  |

#### Example: Load

```go
domainAvailability, err := client.DomainAvailability(nil).Load(map[string]any{"name": "name"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(domainAvailability.(sdk.Entity).Data()) // the loaded entity's record
```


### DomainChangeOwner

Create an instance: `domainChangeOwner := client.DomainChangeOwner(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `admin` | `map[string]any` |  |
| `bill` | `map[string]any` |  |
| `created_at` | `string` |  |
| `date_start` | `string` |  |
| `errors` | `[]any` |  |
| `errortype` | `string` |  |
| `errortype_label` | `string` |  |
| `foa` | `[]any` |  |
| `inner_step` | `string` |  |
| `owner` | `map[string]any` |  |
| `params` | `map[string]any` |  |
| `status` | `string` |  |
| `step` | `string` |  |
| `step_nb` | `int` |  |
| `tech` | `map[string]any` |  |
| `updated_at` | `string` |  |

#### Example: Load

```go
domainChangeOwner, err := client.DomainChangeOwner(nil).Load(map[string]any{"domain": "domain"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(domainChangeOwner.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

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
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### DomainClaim

Create an instance: `domainClaim := client.DomainClaim(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `claims` | `[]any` |  |
| `created_at` | `string` |  |
| `expires_at` | `string` |  |
| `fqdn` | `string` |  |
| `fqdn_alabel` | `string` |  |
| `fqdn_ulabel` | `string` |  |
| `notice_id` | `string` |  |
| `status` | `string` |  |

#### Example: Load

```go
domainClaim, err := client.DomainClaim(nil).Load(map[string]any{"domain": "domain"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(domainClaim.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

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
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### DomainContact

Create an instance: `domainContact := client.DomainContact(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `admin` | `map[string]any` |  |
| `bill` | `map[string]any` |  |
| `message` | `string` |  |
| `owner` | `map[string]any` |  |
| `tech` | `map[string]any` |  |

#### Example: Load

```go
domainContact, err := client.DomainContact(nil).Load(map[string]any{"domain": "domain"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(domainContact.(sdk.Entity).Data()) // the loaded entity's record
```


### DomainDnskey

Create an instance: `domainDnskey := client.DomainDnskey(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `algorithm` | `int` |  |
| `digest` | `string` |  |
| `digest_type` | `int` |  |
| `href` | `string` |  |
| `id` | `int` |  |
| `keys` | `[]any` |  |
| `keytag` | `int` |  |
| `message` | `string` |  |
| `public_key` | `string` |  |
| `type` | `string` |  |

#### Example: List

```go
domainDnskeys, err := client.DomainDnskey(nil).List(map[string]any{"domain": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range domainDnskeys.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

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
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### DomainDnssec

Create an instance: `domainDnssec := client.DomainDnssec(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `error` | `string` |  |
| `state` | `string` |  |

#### Example: Load

```go
domainDnssec, err := client.DomainDnssec(nil).Load(map[string]any{"domain": "domain"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(domainDnssec.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.DomainDnssec(nil).Create(map[string]any{
    "domain": "example_domain",
    "state": "example_state",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### DomainHost

Create an instance: `domainHost := client.DomainHost(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `fqdn` | `string` |  |
| `fqdn_unicode` | `string` |  |
| `href` | `string` |  |
| `ips` | `[]any` |  |
| `message` | `string` |  |
| `name` | `string` |  |

#### Example: Load

```go
domainHost, err := client.DomainHost(nil).Load(map[string]any{"domain": "domain", "name": "name"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(domainHost.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
domainHosts, err := client.DomainHost(nil).List(map[string]any{"domain": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range domainHosts.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.DomainHost(nil).Create(map[string]any{
    "domain": "example_domain",
    "ips": []any{},
    "name": "example_name",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### DomainLivedns

Create an instance: `domainLivedns := client.DomainLivedns(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `current` | `string` |  |
| `dnssec_available` | `bool` |  |
| `livednssec_available` | `bool` |  |
| `message` | `string` |  |
| `nameservers` | `[]any` |  |

#### Example: Load

```go
domainLivedns, err := client.DomainLivedns(nil).Load(map[string]any{"domain": "domain"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(domainLivedns.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

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
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### DomainNameserver

Create an instance: `domainNameserver := client.DomainNameserver(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `message` | `string` |  |
| `nameservers` | `[]any` |  |

#### Example: List

```go
domainNameservers, err := client.DomainNameserver(nil).List(map[string]any{"domain": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range domainNameservers.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### DomainTag

Create an instance: `domainTag := client.DomainTag(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `add` | `[]any` |  |
| `message` | `string` |  |
| `remove` | `[]any` |  |
| `tag` | `string` |  |
| `tags` | `[]any` |  |

#### Example: List

```go
domainTags, err := client.DomainTag(nil).List(map[string]any{"domain": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range domainTags.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.DomainTag(nil).Create(map[string]any{
    "domain": "example_domain",
    "tag": "example_tag",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### DomainTransfer

Create an instance: `domainTransfer := client.DomainTransfer(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `admin` | `map[string]any` |  |
| `authinfo` | `string` |  |
| `bill` | `map[string]any` |  |
| `change_owner` | `bool` |  |
| `created_at` | `string` |  |
| `currency` | `string` |  |
| `duration` | `int` |  |
| `enforce_premium` | `bool` |  |
| `errors` | `[]any` |  |
| `errortype` | `string` |  |
| `errortype_label` | `string` |  |
| `extra_parameters` | `map[string]any` |  |
| `foa` | `[]any` |  |
| `fqdn` | `string` |  |
| `inner_step` | `string` |  |
| `mailbox_optin` | `bool` |  |
| `message` | `string` |  |
| `nameservers` | `[]any` |  |
| `nameservers_ips` | `map[string]any` |  |
| `owner` | `map[string]any` |  |
| `owner_contact` | `string` |  |
| `params` | `map[string]any` |  |
| `price` | `float64` |  |
| `regac_at` | `string` |  |
| `resellee_id` | `string` |  |
| `start_at` | `string` |  |
| `status` | `string` |  |
| `step` | `string` |  |
| `step_nb` | `int` |  |
| `tech` | `map[string]any` |  |
| `template_id` | `string` |  |
| `transfer_link` | `string` |  |
| `transfer_procedure` | `string` |  |
| `updated_at` | `string` |  |

#### Example: Load

```go
domainTransfer, err := client.DomainTransfer(nil).Load(map[string]any{"domain": "domain"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(domainTransfer.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

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
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### DomainWebredir

Create an instance: `domainWebredir := client.DomainWebredir(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

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

```go
domainWebredir, err := client.DomainWebredir(nil).Load(map[string]any{"domain": "domain", "host": "host"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(domainWebredir.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
domainWebredirs, err := client.DomainWebredir(nil).List(map[string]any{"domain": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range domainWebredirs.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

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
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### EmailForward

Create an instance: `emailForward := client.EmailForward(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `destinations` | `[]any` |  |
| `href` | `string` |  |
| `id` | `string` |  |
| `message` | `string` |  |
| `source` | `string` |  |

#### Example: List

```go
emailForwards, err := client.EmailForward(nil).List(map[string]any{"domain": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range emailForwards.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.EmailForward(nil).Create(map[string]any{
    "domain": "example_domain",
    "destinations": []any{},
    "source": "example_source",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### EmailMailbox

Create an instance: `emailMailbox := client.EmailMailbox(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `address` | `string` |  |
| `alias_count` | `int` |  |
| `aliases` | `[]any` |  |
| `antispam` | `bool` |  |
| `autorenew` | `map[string]any` |  |
| `domain` | `string` |  |
| `errors` | `[]any` |  |
| `expires_at` | `string` |  |
| `fallback_email` | `string` |  |
| `href` | `string` |  |
| `id` | `string` |  |
| `login` | `string` |  |
| `mailbox_type` | `string` |  |
| `message` | `string` |  |
| `password` | `string` |  |
| `quota_used` | `int` |  |
| `responder` | `map[string]any` |  |
| `status` | `string` |  |
| `to_convert` | `bool` |  |

#### Example: Load

```go
emailMailbox, err := client.EmailMailbox(nil).Load(map[string]any{"id": "email_mailbox_id", "domain": "domain"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(emailMailbox.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
emailMailboxs, err := client.EmailMailbox(nil).List(map[string]any{"domain": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range emailMailboxs.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

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
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### EmailMigration

Create an instance: `emailMigration := client.EmailMigration(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `available` | `bool` |  |
| `currency` | `string` |  |
| `forward_count` | `int` |  |
| `free_mailboxes` | `int` |  |
| `included_mailboxes` | `int` |  |
| `info` | `[]any` |  |
| `message` | `string` |  |
| `packmail` | `bool` |  |
| `price_v1` | `float64` |  |
| `price_v2` | `float64` |  |
| `quota_v1` | `float64` |  |
| `token` | `string` |  |
| `usage_v1` | `float64` |  |

#### Example: Load

```go
emailMigration, err := client.EmailMigration(nil).Load(map[string]any{"domain": "domain"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(emailMigration.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.EmailMigration(nil).Create(map[string]any{
    "domain": "example_domain",
    "token": "example_token",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### EmailOffer

Create an instance: `emailOffer := client.EmailOffer(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `antispam` | `string` |  |
| `dkim` | `string` |  |
| `message` | `string` |  |
| `status` | `string` |  |
| `version` | `int` |  |

#### Example: Load

```go
emailOffer, err := client.EmailOffer(nil).Load(map[string]any{"domain": "domain"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(emailOffer.(sdk.Entity).Data()) // the loaded entity's record
```


### EmailSlot

Create an instance: `emailSlot := client.EmailSlot(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Remove(match, ctrl)` | Remove the matching entity. |

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
| `refund_amount` | `float64` |  |
| `refund_currency` | `string` |  |
| `refundable` | `bool` |  |
| `status` | `string` |  |

#### Example: Load

```go
emailSlot, err := client.EmailSlot(nil).Load(map[string]any{"id": 1, "domain": "domain"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(emailSlot.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
emailSlots, err := client.EmailSlot(nil).List(map[string]any{"domain": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range emailSlots.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.EmailSlot(nil).Create(map[string]any{
    "domain": "example_domain",
    "duration": 1,
    "mailbox_type": "example_mailbox_type",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### HostingApplication

Create an instance: `hostingApplication := client.HostingApplication(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `name` | `string` |  |
| `name_label` | `string` |  |
| `requirements` | `[]any` |  |

#### Example: Load

```go
hostingApplication, err := client.HostingApplication(nil).Load(map[string]any{"name": "name"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(hostingApplication.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
hostingApplications, err := client.HostingApplication(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range hostingApplications.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### HostingInstance

Create an instance: `hostingInstance := client.HostingInstance(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `access_information` | `map[string]any` |  |
| `authentication` | `map[string]any` |  |
| `autorenew` | `map[string]any` |  |
| `available_upgrade` | `bool` |  |
| `booster` | `map[string]any` |  |
| `booster_options` | `map[string]any` |  |
| `compatible_applications` | `[]any` |  |
| `console` | `map[string]any` |  |
| `cpu` | `int` |  |
| `created_at` | `string` |  |
| `database` | `map[string]any` |  |
| `datacenter` | `map[string]any` |  |
| `domain` | `string` |  |
| `duration` | `int` |  |
| `duration_unit` | `string` |  |
| `errors` | `[]any` |  |
| `expire_at` | `string` |  |
| `id` | `string` |  |
| `language` | `map[string]any` |  |
| `language_id` | `string` |  |
| `location` | `string` |  |
| `message` | `string` |  |
| `name` | `string` |  |
| `password` | `string` |  |
| `password_updated_at` | `string` |  |
| `ram` | `map[string]any` |  |
| `sharing_space` | `map[string]any` |  |
| `size` | `string` |  |
| `snapshot_enabled` | `bool` |  |
| `status` | `string` |  |
| `storage` | `map[string]any` |  |
| `storage_additional_size` | `int` |  |
| `subscription_cancelled` | `bool` |  |
| `type` | `map[string]any` |  |
| `upgrade_to` | `[]any` |  |
| `vhosts` | `[]any` |  |

#### Example: Load

```go
hostingInstance, err := client.HostingInstance(nil).Load(map[string]any{"id": "hosting_instance_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(hostingInstance.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
hostingInstances, err := client.HostingInstance(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range hostingInstances.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

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
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### HostingVhost

Create an instance: `hostingVhost := client.HostingVhost(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `application` | `map[string]any` |  |
| `created_at` | `string` |  |
| `deployment` | `map[string]any` |  |
| `fqdn` | `string` |  |
| `https_strategy` | `string` |  |
| `is_a_test_vhost` | `bool` |  |
| `linked_dns_zone` | `map[string]any` |  |
| `status` | `string` |  |
| `tls_validated_at` | `string` |  |

#### Example: Load

```go
hostingVhost, err := client.HostingVhost(nil).Load(map[string]any{"fqdn": "fqdn", "instance_id": "instance_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(hostingVhost.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
hostingVhosts, err := client.HostingVhost(nil).List(map[string]any{"instance_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range hostingVhosts.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

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
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### IssuedCertificate

Create an instance: `issuedCertificate := client.IssuedCertificate(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `altnames` | `[]any` |  |
| `altnames_unicode` | `[]any` |  |
| `apex_only` | `bool` |  |
| `assumed_name` | `string` |  |
| `business_category` | `string` |  |
| `card_pay_trustlogo` | `bool` |  |
| `cert` | `string` |  |
| `cn` | `string` |  |
| `cn_unicode` | `string` |  |
| `contact` | `map[string]any` |  |
| `csr` | `string` |  |
| `dates` | `map[string]any` |  |
| `dcv_method` | `string` |  |
| `duration` | `int` |  |
| `error_msg` | `string` |  |
| `errors` | `[]any` |  |
| `href` | `string` |  |
| `id` | `string` |  |
| `ida` | `map[string]any` |  |
| `intermediate` | `string` |  |
| `joi` | `map[string]any` |  |
| `middleman` | `map[string]any` |  |
| `owner` | `string` |  |
| `package` | `map[string]any` |  |
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
| `tags` | `[]any` |  |
| `trustlogo` | `bool` |  |
| `trustlogo_token` | `map[string]any` |  |

#### Example: Load

```go
issuedCertificate, err := client.IssuedCertificate(nil).Load(map[string]any{"id": "issued_certificate_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(issuedCertificate.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
issuedCertificates, err := client.IssuedCertificate(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range issuedCertificates.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.IssuedCertificate(nil).Create(map[string]any{
    "package": map[string]any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### LinkedZone

Create an instance: `linkedZone := client.LinkedZone(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` |  |
| `default_records` | `bool` |  |
| `domain_count` | `int` |  |
| `domains` | `[]any` |  |
| `id` | `string` |  |
| `message` | `string` |  |
| `name` | `string` |  |
| `record_list` | `[]any` |  |
| `record_text` | `string` |  |
| `records` | `[]any` |  |
| `sharing_space` | `map[string]any` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |

#### Example: Load

```go
linkedZone, err := client.LinkedZone(nil).Load(map[string]any{"id": "linked_zone_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(linkedZone.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
linkedZones, err := client.LinkedZone(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range linkedZones.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.LinkedZone(nil).Create(map[string]any{
    "name": "example_name",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### LinkedZoneDeployment

Create an instance: `linkedZoneDeployment := client.LinkedZoneDeployment(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deploy` | `bool` |  |
| `message` | `string` |  |

#### Example: Create

```go
result, err := client.LinkedZoneDeployment(nil).Create(map[string]any{
    "zone_id": "example_zone_id",
    "deploy": true,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### LinkedZoneDomain

Create an instance: `linkedZoneDomain := client.LinkedZoneDomain(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deployed` | `bool` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `owner` | `string` |  |
| `zone` | `map[string]any` |  |

#### Example: Load

```go
linkedZoneDomain, err := client.LinkedZoneDomain(nil).Load(map[string]any{"name": "name"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(linkedZoneDomain.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
linkedZoneDomains, err := client.LinkedZoneDomain(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range linkedZoneDomains.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### LinkedZoneTask

Create an instance: `linkedZoneTask := client.LinkedZoneTask(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` |  |
| `ending_at` | `string` |  |
| `id` | `string` |  |
| `result` | `map[string]any` |  |
| `status` | `string` |  |
| `type` | `string` |  |
| `updated_at` | `string` |  |
| `zone_id` | `string` |  |

#### Example: Load

```go
linkedZoneTask, err := client.LinkedZoneTask(nil).Load(map[string]any{"id": "linked_zone_task_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(linkedZoneTask.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
linkedZoneTasks, err := client.LinkedZoneTask(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range linkedZoneTasks.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### LivednsAxfrSlave

Create an instance: `livednsAxfrSlave := client.LivednsAxfrSlave(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `message` | `string` |  |

#### Example: List

```go
livednsAxfrSlaves, err := client.LivednsAxfrSlave(nil).List(map[string]any{"fqdn": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range livednsAxfrSlaves.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### LivednsAxfrTsig

Create an instance: `livednsAxfrTsig := client.LivednsAxfrTsig(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `href` | `string` |  |
| `id` | `string` |  |
| `key_name` | `string` |  |
| `message` | `string` |  |

#### Example: List

```go
livednsAxfrTsigs, err := client.LivednsAxfrTsig(nil).List(map[string]any{"fqdn": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range livednsAxfrTsigs.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### LivednsDomain

Create an instance: `livednsDomain := client.LivednsDomain(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `automatic_snapshots` | `bool` |  |
| `domain_href` | `string` |  |
| `domain_keys_href` | `string` |  |
| `domain_records_href` | `string` |  |
| `fqdn` | `string` |  |
| `message` | `string` |  |
| `zone` | `map[string]any` |  |

#### Example: Load

```go
livednsDomain, err := client.LivednsDomain(nil).Load(map[string]any{"fqdn": "fqdn"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(livednsDomain.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
livednsDomains, err := client.LivednsDomain(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range livednsDomains.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.LivednsDomain(nil).Create(map[string]any{
    "fqdn": "example_fqdn",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### LivednsKey

Create an instance: `livednsKey := client.LivednsKey(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

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

```go
livednsKey, err := client.LivednsKey(nil).Load(map[string]any{"id": "livedns_key_id", "fqdn": "fqdn"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(livednsKey.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
livednsKeys, err := client.LivednsKey(nil).List(map[string]any{"fqdn": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range livednsKeys.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.LivednsKey(nil).Create(map[string]any{
    "fqdn": "example_fqdn",
    "flags": 1,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### LivednsNameserver

Create an instance: `livednsNameserver := client.LivednsNameserver(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Example: List

```go
livednsNameservers, err := client.LivednsNameserver(nil).List(map[string]any{"fqdn": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range livednsNameservers.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### LivednsRecord

Create an instance: `livednsRecord := client.LivednsRecord(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Patch(data, ctrl)` | Change part of an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `add_rrset_values` | `[]any` |  |
| `id` | `string` |  |
| `message` | `string` |  |
| `remove_rrset_values` | `[]any` |  |
| `rrset_href` | `string` |  |
| `rrset_name` | `string` |  |
| `rrset_ttl` | `int` |  |
| `rrset_type` | `string` |  |
| `rrset_values` | `[]any` |  |

#### Example: Load

```go
livednsRecord, err := client.LivednsRecord(nil).Load(map[string]any{"fqdn": "fqdn", "rrset_name": "rrset_name", "rrset_type": "rrset_type"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(livednsRecord.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
livednsRecords, err := client.LivednsRecord(nil).List(map[string]any{"fqdn": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range livednsRecords.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.LivednsRecord(nil).Create(map[string]any{
    "fqdn": "example_fqdn",
    "rrset_values": []any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### LivednsRrtype

Create an instance: `livednsRrtype := client.LivednsRrtype(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Example: List

```go
livednsRrtypes, err := client.LivednsRrtype(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range livednsRrtypes.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### LivednsSnapshot

Create an instance: `livednsSnapshot := client.LivednsSnapshot(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `automatic` | `bool` |  |
| `created_at` | `string` |  |
| `href` | `string` |  |
| `id` | `string` |  |
| `message` | `string` |  |
| `name` | `string` |  |
| `zone_data` | `[]any` |  |

#### Example: Load

```go
livednsSnapshot, err := client.LivednsSnapshot(nil).Load(map[string]any{"id": "livedns_snapshot_id", "fqdn": "fqdn"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(livednsSnapshot.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
livednsSnapshots, err := client.LivednsSnapshot(nil).List(map[string]any{"fqdn": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range livednsSnapshots.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.LivednsSnapshot(nil).Create(map[string]any{
    "fqdn": "example_fqdn",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### LivednsTsigKey

Create an instance: `livednsTsigKey := client.LivednsTsigKey(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `config_samples` | `map[string]any` |  |
| `href` | `string` |  |
| `id` | `string` |  |
| `key_name` | `string` |  |
| `secret` | `string` |  |

#### Example: Load

```go
livednsTsigKey, err := client.LivednsTsigKey(nil).Load(map[string]any{"id": "livedns_tsig_key_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(livednsTsigKey.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
livednsTsigKeys, err := client.LivednsTsigKey(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range livednsTsigKeys.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

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
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### LivednsZone

Create an instance: `livednsZone := client.LivednsZone(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `items` | `[]any` |  |
| `message` | `string` |  |
| `remove_apex_ns` | `bool` |  |


### Mailbox

Create an instance: `mailbox := client.Mailbox(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `address` | `string` |  |
| `aliases` | `[]any` |  |
| `antispam` | `bool` |  |
| `autorenew` | `map[string]any` |  |
| `config` | `map[string]any` |  |
| `config_name` | `string` |  |
| `created_at` | `string` |  |
| `data_access` | `bool` |  |
| `domain_part` | `string` |  |
| `duration_month` | `int` |  |
| `email` | `string` |  |
| `expires_at` | `string` |  |
| `internal_domain` | `bool` |  |
| `issues` | `[]any` |  |
| `last_paid_duration` | `int` |  |
| `local_part` | `string` |  |
| `message` | `string` |  |
| `owner` | `map[string]any` |  |
| `password` | `string` |  |
| `quota` | `int` |  |
| `quota_used` | `int` |  |
| `responder` | `map[string]any` |  |
| `updated_at` | `string` |  |
| `uuid` | `string` |  |

#### Example: Load

```go
mailbox, err := client.Mailbox(nil).Load(map[string]any{"address": "address"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(mailbox.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
mailboxs, err := client.Mailbox(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range mailboxs.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.Mailbox(nil).Create(map[string]any{
    "config_name": "example_config_name",
    "email": "example_email",
    "password": "example_password",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### MailboxDomain

Create an instance: `mailboxDomain := client.MailboxDomain(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `antispam` | `bool` |  |
| `configuration` | `[]any` |  |
| `date_last_validation` | `string` |  |
| `dkim` | `bool` |  |
| `fqdns` | `[]any` |  |
| `internal` | `bool` |  |
| `is_livedns` | `bool` |  |
| `mx` | `bool` |  |
| `owner` | `map[string]any` |  |
| `spf` | `bool` |  |
| `txt` | `bool` |  |

#### Example: Load

```go
mailboxDomain, err := client.MailboxDomain(nil).Load(map[string]any{"domain": "domain"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(mailboxDomain.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
mailboxDomains, err := client.MailboxDomain(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range mailboxDomains.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.MailboxDomain(nil).Create(map[string]any{
    "domain": "example_domain",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### MailboxForward

Create an instance: `mailboxForward := client.MailboxForward(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `destinations` | `[]any` |  |
| `message` | `string` |  |
| `source` | `string` |  |

#### Example: List

```go
mailboxForwards, err := client.MailboxForward(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range mailboxForwards.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.MailboxForward(nil).Create(map[string]any{
    "destinations": []any{},
    "source": "example_source",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### MailboxProduct

Create an instance: `mailboxProduct := client.MailboxProduct(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `autorenew` | `bool` |  |
| `config` | `[]any` |  |
| `config_name` | `string` |  |
| `description` | `string` |  |
| `duration_month` | `int` |  |
| `label` | `string` |  |
| `message` | `string` |  |
| `prices` | `[]any` |  |
| `quantity` | `int` |  |
| `taxes` | `[]any` |  |
| `uuid` | `string` |  |

#### Example: List

```go
mailboxProducts, err := client.MailboxProduct(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range mailboxProducts.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.MailboxProduct(nil).Create(map[string]any{
    "config_name": "example_config_name",
    "duration_month": 1,
    "quantity": 1,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### MailboxQuota

Create an instance: `mailboxQuota := client.MailboxQuota(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `annually` | `map[string]any` |  |
| `config_name` | `string` |  |
| `label` | `string` |  |
| `monthly` | `map[string]any` |  |
| `quota` | `string` |  |

#### Example: List

```go
mailboxQuotas, err := client.MailboxQuota(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range mailboxQuotas.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### MailboxSlot

Create an instance: `mailboxSlot := client.MailboxSlot(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `autorenew` | `map[string]any` |  |
| `config` | `map[string]any` |  |
| `expires_at` | `string` |  |
| `last_paid_duration` | `int` |  |
| `refund_info` | `map[string]any` |  |
| `refundable` | `bool` |  |
| `uuid` | `string` |  |
| `webhosting_pack` | `bool` |  |

#### Example: Load

```go
mailboxSlot, err := client.MailboxSlot(nil).Load(map[string]any{"uuid": "uuid"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(mailboxSlot.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
mailboxSlots, err := client.MailboxSlot(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range mailboxSlots.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### Organization

Create an instance: `organization := client.Organization(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

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

```go
organization, err := client.Organization(nil).Load(map[string]any{"id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(organization.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
organizations, err := client.Organization(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range organizations.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

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
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### OrganizationCustomer

Create an instance: `organizationCustomer := client.OrganizationCustomer(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

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

```go
organizationCustomer, err := client.OrganizationCustomer(nil).Load(map[string]any{"id": "organization_customer_id", "org_id": "org_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(organizationCustomer.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
organizationCustomers, err := client.OrganizationCustomer(nil).List(map[string]any{"org_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range organizationCustomers.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

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
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### Template

Create an instance: `template := client.Template(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `string` |  |
| `editable` | `bool` |  |
| `href` | `string` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `namespaces` | `[]any` |  |
| `orgname` | `string` |  |
| `payload` | `map[string]any` |  |
| `sharing_space` | `map[string]any` |  |
| `variables` | `[]any` |  |

#### Example: Load

```go
template, err := client.Template(nil).Load(map[string]any{"id": "template_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(template.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
templates, err := client.Template(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range templates.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.Template(nil).Create(map[string]any{
    "name": "example_name",
    "payload": map[string]any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### TemplateDispatch

Create an instance: `templateDispatch := client.TemplateDispatch(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

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
| `payload` | `map[string]any` |  |
| `sharing_id` | `string` |  |
| `state` | `int` |  |
| `state_msg` | `string` |  |
| `target` | `map[string]any` |  |
| `target_id` | `string` |  |
| `target_type` | `string` |  |
| `task_history` | `[]any` |  |
| `task_status` | `map[string]any` |  |
| `task_updated_at` | `string` |  |
| `template_id` | `string` |  |
| `template_name` | `string` |  |

#### Example: Load

```go
templateDispatch, err := client.TemplateDispatch(nil).Load(map[string]any{"id": "template_dispatch_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(templateDispatch.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.TemplateDispatch(nil).Create(map[string]any{
    "template_id": "example_template_id",
    "object_id": "example_object_id",
    "object_type": "example_object_type",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### Tld

Create an instance: `tld := client.Tld(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

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

```go
tld, err := client.Tld(nil).Load(map[string]any{"name": "name"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(tld.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
tlds, err := client.Tld(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range tlds.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### User

Create an instance: `user := client.User(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

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

```go
user, err := client.User(nil).Load(map[string]any{"id": "user_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(user.(sdk.Entity).Data()) // the loaded entity's record
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

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

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

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

An operation returns the entity, and its `Data()` returns the record. Use
`core.ToMapAny()` to safely cast that record, or data nested in it, to
`map[string]any`: it returns `nil` for anything else, an entity included.

### Package structure

```
github.com/voxgig-sdk/gandi-sdk/go/
├── gandi.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/gandi-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `List`, the entity
stores the returned data and match criteria internally.

```go
livednsdomain := client.LivednsDomain(nil)
livednsdomain.List(nil, nil)

// livednsdomain.Data() now returns the livednsdomain data from the last list
// livednsdomain.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
