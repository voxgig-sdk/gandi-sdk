"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "access_token",
        "accessor": "AccessToken",
        "op": "create",
        "method": "POST",
        "path": "/organization/access-tokens",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "access_token": "x",
            "entities": [
                {
                    "id": "x",
                    "name": "x",
                    "type": "x"
                }
            ],
            "expires_at": "2026-01-01T00:00:00Z",
            "id": "x",
            "name": "x",
            "scopes": [
                "x"
            ]
        },
        "idField": "id"
    },
    {
        "entity": "acme_account",
        "accessor": "AcmeAccount",
        "op": "list",
        "method": "GET",
        "path": "/acme/subscriptions/{subscription_id}/accounts",
        "args": [
            {
                "name": "subscription_id",
                "wire": "subscription_id",
                "value": "p1"
            }
        ],
        "select": {
            "sharing_id": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "sharing_id"
        ],
        "queryArgs": [
            {
                "name": "sharing_id",
                "wire": "sharing_id"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "created_at": "x",
                "deleted_at": "x",
                "external_id": "x",
                "id": "x",
                "ip": "x",
                "last_activity": "x",
                "status": "x",
                "subscription_id": "x"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "acme_account",
        "accessor": "AcmeAccount",
        "op": "load",
        "method": "GET",
        "path": "/acme/subscriptions/{subscription_id}/accounts/{account_id}",
        "args": [
            {
                "name": "id",
                "wire": "account_id",
                "value": "p1"
            },
            {
                "name": "subscription_id",
                "wire": "subscription_id",
                "value": "p2"
            }
        ],
        "select": {
            "sharing_id": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "sharing_id"
        ],
        "queryArgs": [
            {
                "name": "sharing_id",
                "wire": "sharing_id"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "created_at": "x",
            "deleted_at": "x",
            "external_id": "x",
            "id": "x",
            "ip": "x",
            "last_activity": "x",
            "status": "x",
            "subscription_id": "x"
        },
        "idField": "id"
    },
    {
        "entity": "acme_domain",
        "accessor": "AcmeDomain",
        "op": "list",
        "method": "GET",
        "path": "/acme/subscriptions/{subscription_id}/domains",
        "args": [
            {
                "name": "subscription_id",
                "wire": "subscription_id",
                "value": "p1"
            }
        ],
        "select": {
            "domain": "v1",
            "sharing_id": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "domain",
            "sharing_id"
        ],
        "queryArgs": [
            {
                "name": "domain",
                "wire": "domain"
            },
            {
                "name": "sharing_id",
                "wire": "sharing_id"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "created_at": "x",
                "deleted_at": "x",
                "hostname": "x",
                "hostname_ulabel": "x",
                "is_wildcard": "x",
                "status": "x",
                "subscription_id": "x"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "acme_domain",
        "accessor": "AcmeDomain",
        "op": "load",
        "method": "GET",
        "path": "/acme/subscriptions/{subscription_id}/domains/{domain_id}",
        "args": [
            {
                "name": "domain_id",
                "wire": "domain_id",
                "value": "p1"
            },
            {
                "name": "subscription_id",
                "wire": "subscription_id",
                "value": "p2"
            }
        ],
        "select": {
            "sharing_id": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "sharing_id"
        ],
        "queryArgs": [
            {
                "name": "sharing_id",
                "wire": "sharing_id"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "created_at": "x",
            "deleted_at": "x",
            "hostname": "x",
            "hostname_ulabel": "x",
            "is_wildcard": "x",
            "status": "x",
            "subscription_id": "x"
        },
        "idField": "id"
    },
    {
        "entity": "acme_price",
        "accessor": "AcmePrice",
        "op": "create",
        "method": "POST",
        "path": "/acme/quote",
        "args": [],
        "select": {
            "sharing_id": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "sharing_id"
        ],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "currency": "x",
                "duration_unit": "x",
                "grid": "A",
                "max_duration": 1,
                "min_duration": 1,
                "price_after_taxes": "x",
                "price_before_taxes": "x",
                "process": "add_fqdn",
                "product": {
                    "name": "x",
                    "params": {
                        "provider": "sectigo",
                        "validation_type": "dv"
                    }
                },
                "quantity": 1,
                "tax_rate": "x",
                "taxes": [
                    {
                        "label": "x",
                        "name": "x",
                        "rate": "x",
                        "type": "x"
                    }
                ]
            }
        ],
        "idField": "id"
    },
    {
        "entity": "acme_price",
        "accessor": "AcmePrice",
        "op": "list",
        "method": "GET",
        "path": "/acme/catalog",
        "args": [],
        "select": {
            "country": "v1",
            "currency": "v1",
            "duration": "v1",
            "grid": "v1",
            "process": "v1",
            "provider": "v1",
            "sharing_id": "v1",
            "validation_type": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "country",
            "currency",
            "duration",
            "grid",
            "process",
            "provider",
            "sharing_id",
            "validation_type"
        ],
        "queryArgs": [
            {
                "name": "country",
                "wire": "country"
            },
            {
                "name": "currency",
                "wire": "currency"
            },
            {
                "name": "duration",
                "wire": "duration"
            },
            {
                "name": "grid",
                "wire": "grid"
            },
            {
                "name": "process",
                "wire": "process"
            },
            {
                "name": "provider",
                "wire": "provider"
            },
            {
                "name": "sharing_id",
                "wire": "sharing_id"
            },
            {
                "name": "validation_type",
                "wire": "validation_type"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "currency": "x",
                "duration_unit": "x",
                "grid": "A",
                "max_duration": 1,
                "min_duration": 1,
                "price_after_taxes": "x",
                "price_before_taxes": "x",
                "process": "add_fqdn",
                "product": {
                    "name": "x",
                    "params": {
                        "provider": "sectigo",
                        "validation_type": "dv"
                    }
                },
                "tax_rate": "x",
                "taxes": [
                    {
                        "label": "x",
                        "name": "x",
                        "rate": "x",
                        "type": "x"
                    }
                ]
            }
        ],
        "idField": "id"
    },
    {
        "entity": "acme_subscription",
        "accessor": "AcmeSubscription",
        "op": "create",
        "method": "POST",
        "path": "/acme/subscriptions",
        "args": [],
        "select": {
            "sharing_id": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "sharing_id"
        ],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "message": "x"
        },
        "idField": "id"
    },
    {
        "entity": "acme_subscription",
        "accessor": "AcmeSubscription",
        "op": "list",
        "method": "GET",
        "path": "/acme/subscriptions",
        "args": [],
        "select": {
            "created_at": "v1",
            "ends_at": "v1",
            "name": "v1",
            "provider": "v1",
            "sharing_id": "v1",
            "status": "v1",
            "validation_type": "v1",
            "year": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "created_at",
            "ends_at",
            "name",
            "provider",
            "sharing_id",
            "status",
            "validation_type",
            "years"
        ],
        "queryArgs": [
            {
                "name": "created_at",
                "wire": "created_at"
            },
            {
                "name": "ends_at",
                "wire": "ends_at"
            },
            {
                "name": "name",
                "wire": "name"
            },
            {
                "name": "provider",
                "wire": "provider"
            },
            {
                "name": "sharing_id",
                "wire": "sharing_id"
            },
            {
                "name": "status",
                "wire": "status"
            },
            {
                "name": "validation_type",
                "wire": "validation_type"
            },
            {
                "name": "year",
                "wire": "years"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "created_at": "x",
                "eab_hmac": "x",
                "eab_id": "x",
                "ends_at": "x",
                "name": "x",
                "provider": "x",
                "server_url": "x",
                "status": "x",
                "subscription_id": "x",
                "validation_type": "x",
                "years": "x"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "acme_subscription",
        "accessor": "AcmeSubscription",
        "op": "load",
        "method": "GET",
        "path": "/acme/subscriptions/{subscription_id}",
        "args": [
            {
                "name": "subscription_id",
                "wire": "subscription_id",
                "value": "p1"
            }
        ],
        "select": {
            "sharing_id": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "sharing_id"
        ],
        "queryArgs": [
            {
                "name": "sharing_id",
                "wire": "sharing_id"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "created_at": "x",
            "eab_hmac": "x",
            "eab_id": "x",
            "ends_at": "x",
            "name": "x",
            "provider": "x",
            "server_url": "x",
            "status": "x",
            "subscription_id": "x",
            "validation_type": "x",
            "years": "x"
        },
        "idField": "id"
    },
    {
        "entity": "acme_subscription",
        "accessor": "AcmeSubscription",
        "op": "remove",
        "method": "DELETE",
        "path": "/acme/subscriptions/{subscription_id}",
        "args": [
            {
                "name": "subscription_id",
                "wire": "subscription_id",
                "value": "p1"
            }
        ],
        "select": {
            "sharing_id": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "sharing_id"
        ],
        "queryArgs": [
            {
                "name": "sharing_id",
                "wire": "sharing_id"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": "x",
        "idField": "id"
    },
    {
        "entity": "acme_subscription",
        "accessor": "AcmeSubscription",
        "op": "update",
        "method": "PATCH",
        "path": "/acme/subscriptions/{subscription_id}",
        "args": [
            {
                "name": "subscription_id",
                "wire": "subscription_id",
                "value": "p1"
            }
        ],
        "select": {
            "sharing_id": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "sharing_id"
        ],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "message": "x"
        },
        "idField": "id"
    },
    {
        "entity": "acme_subscription",
        "accessor": "AcmeSubscription",
        "op": "update",
        "method": "PATCH",
        "path": "/acme/subscriptions/{subscription_id}/domains",
        "action": "domains",
        "args": [
            {
                "name": "subscription_id",
                "wire": "subscription_id",
                "value": "p1"
            }
        ],
        "select": {
            "sharing_id": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "sharing_id"
        ],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "message": "x"
        },
        "idField": "id"
    },
    {
        "entity": "billing_info",
        "accessor": "BillingInfo",
        "op": "load",
        "method": "GET",
        "path": "/billing/info/{sharing_id}",
        "args": [
            {
                "name": "sharing_id",
                "wire": "sharing_id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "annual_balance": 1,
            "grid": "x",
            "outstanding_amount": 1,
            "prepaid": {
                "amount": 1,
                "created_at": "2026-01-01T00:00:00Z",
                "currency": "x",
                "updated_at": "2026-01-01T00:00:00Z",
                "warning_threshold": 1
            },
            "prepaid_monthly_invoice": true
        },
        "idField": "id"
    },
    {
        "entity": "billing_info",
        "accessor": "BillingInfo",
        "op": "load",
        "method": "GET",
        "path": "/billing/info",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "annual_balance": 1,
            "grid": "x",
            "outstanding_amount": 1,
            "prepaid": {
                "amount": 1,
                "created_at": "2026-01-01T00:00:00Z",
                "currency": "x",
                "updated_at": "2026-01-01T00:00:00Z",
                "warning_threshold": 1
            },
            "prepaid_monthly_invoice": true
        },
        "idField": "id"
    },
    {
        "entity": "billing_price",
        "accessor": "BillingPrice",
        "op": "load",
        "method": "GET",
        "path": "/billing/price/{type}",
        "args": [
            {
                "name": "type",
                "wire": "type",
                "value": "p1"
            }
        ],
        "select": {
            "name": "v1",
            "process": "v1",
            "active_phase": "v1",
            "country": "v1",
            "currency": "v1",
            "discount": "v1",
            "duration_unit": "v1",
            "extension": "v1",
            "feature": "v1",
            "grid": "v1",
            "lang": "v1",
            "max_duration": "v1",
            "page": 1,
            "per_page": "v1",
            "prices_at": "v1",
            "sharing_id": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "name",
            "processes",
            "active_phase",
            "country",
            "currency",
            "discounts",
            "duration_unit",
            "extension",
            "features",
            "grid",
            "lang",
            "max_duration",
            "page",
            "per_page",
            "prices_at",
            "sharing_id"
        ],
        "queryArgs": [
            {
                "name": "active_phase",
                "wire": "active_phase"
            },
            {
                "name": "country",
                "wire": "country"
            },
            {
                "name": "currency",
                "wire": "currency"
            },
            {
                "name": "discount",
                "wire": "discounts"
            },
            {
                "name": "duration_unit",
                "wire": "duration_unit"
            },
            {
                "name": "extension",
                "wire": "extension"
            },
            {
                "name": "feature",
                "wire": "features"
            },
            {
                "name": "grid",
                "wire": "grid"
            },
            {
                "name": "lang",
                "wire": "lang"
            },
            {
                "name": "max_duration",
                "wire": "max_duration"
            },
            {
                "name": "name",
                "wire": "name"
            },
            {
                "name": "page",
                "wire": "page"
            },
            {
                "name": "per_page",
                "wire": "per_page"
            },
            {
                "name": "prices_at",
                "wire": "prices_at"
            },
            {
                "name": "process",
                "wire": "processes"
            },
            {
                "name": "sharing_id",
                "wire": "sharing_id"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "currency": "x",
            "grid": "x",
            "products": [
                {
                    "name": "x",
                    "phases": [
                        {
                            "name": "x",
                            "starts_at": "2026-01-01T00:00:00Z",
                            "ends_at": "2026-01-01T00:00:00Z"
                        }
                    ],
                    "prices": [
                        {
                            "discount": true,
                            "duration_unit": "x",
                            "features": [
                                {}
                            ],
                            "max_duration": 1,
                            "min_duration": 1,
                            "options": {
                                "addresses": "x",
                                "addresses_label": "x",
                                "commitment": true,
                                "cores": 1,
                                "duration_change": "x",
                                "duration_change_label": "x",
                                "extension": "x",
                                "force_registration_display": true,
                                "memory": 1,
                                "name_label": "x",
                                "offer": "x",
                                "offer_label": "x",
                                "phase": "x",
                                "sgc": true,
                                "sgc_label": "x",
                                "size": "x",
                                "size_label": "x",
                                "trial": true,
                                "value": "x",
                                "warranty": "x",
                                "warranty_label": "x"
                            },
                            "price_after_taxes": 1,
                            "price_before_taxes": 1,
                            "normal_price_after_taxes": 1,
                            "normal_price_before_taxes": 1,
                            "type": "x"
                        }
                    ],
                    "process": "x",
                    "status": "x",
                    "taxes": [
                        {
                            "name": "x",
                            "rate": 1,
                            "type": "x",
                            "name_label": "x"
                        }
                    ]
                }
            ],
            "taxes": [
                {
                    "name": "x",
                    "rate": 1,
                    "type": "x",
                    "name_label": "x"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "certificate_dcv",
        "accessor": "CertificateDcv",
        "op": "patch",
        "method": "PATCH",
        "path": "/certificate/issued-certs/{id}/dcv",
        "args": [
            {
                "name": "certificate_id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {
            "sharing_id": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "sharing_id"
        ],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 201,
        "sample": {
            "message": "x"
        },
        "idField": "id"
    },
    {
        "entity": "certificate_dcv",
        "accessor": "CertificateDcv",
        "op": "update",
        "method": "PUT",
        "path": "/certificate/issued-certs/{id}/dcv",
        "args": [
            {
                "name": "certificate_id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {
            "sharing_id": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "sharing_id"
        ],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 202,
        "sample": {
            "message": "x"
        },
        "idField": "id"
    },
    {
        "entity": "certificate_package",
        "accessor": "CertificatePackage",
        "op": "list",
        "method": "GET",
        "path": "/certificate/packages",
        "args": [],
        "select": {
            "category": "v1",
            "max_domain": "v1",
            "min_domain": "v1",
            "page": 1,
            "per_page": "v1",
            "trustlogo": "v1",
            "warranty": "v1",
            "wildcard": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "category",
            "max_domains",
            "min_domains",
            "page",
            "per_page",
            "trustlogo",
            "warranty",
            "wildcard"
        ],
        "queryArgs": [
            {
                "name": "category",
                "wire": "category"
            },
            {
                "name": "max_domain",
                "wire": "max_domains"
            },
            {
                "name": "min_domain",
                "wire": "min_domains"
            },
            {
                "name": "page",
                "wire": "page"
            },
            {
                "name": "per_page",
                "wire": "per_page"
            },
            {
                "name": "trustlogo",
                "wire": "trustlogo"
            },
            {
                "name": "warranty",
                "wire": "warranty"
            },
            {
                "name": "wildcard",
                "wire": "wildcard"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "category": {
                    "name": "x"
                },
                "href": "x",
                "max_domains": 1,
                "min_domains": 1,
                "name": "x",
                "provider": "x",
                "sgc": true,
                "trustlogo": true,
                "warranty": 1,
                "wildcard": true
            }
        ],
        "idField": "id"
    },
    {
        "entity": "certificate_package",
        "accessor": "CertificatePackage",
        "op": "load",
        "method": "GET",
        "path": "/certificate/packages/{name}",
        "args": [
            {
                "name": "name",
                "wire": "name",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "category": {
                "name": "x"
            },
            "href": "x",
            "max_domains": 1,
            "min_domains": 1,
            "name": "x",
            "provider": "x",
            "sgc": true,
            "trustlogo": true,
            "warranty": 1,
            "wildcard": true
        },
        "idField": "id"
    },
    {
        "entity": "certificate_pem",
        "accessor": "CertificatePem",
        "op": "load",
        "method": "GET",
        "path": "/certificate/pem/-/{filename}",
        "args": [
            {
                "name": "filename",
                "wire": "filename",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "text/plain"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "certificate_pem",
        "accessor": "CertificatePem",
        "op": "load",
        "method": "GET",
        "path": "/certificate/pem/{type}",
        "args": [
            {
                "name": "type",
                "wire": "type",
                "value": "p1"
            }
        ],
        "select": {
            "provider": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "text/plain"
        ],
        "query": [
            "provider"
        ],
        "queryArgs": [
            {
                "name": "provider",
                "wire": "provider"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "certificate_renewal",
        "accessor": "CertificateRenewal",
        "op": "create",
        "method": "POST",
        "path": "/certificate/issued-certs/{id}",
        "args": [
            {
                "name": "certificate_id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {
            "sharing_id": "v1"
        },
        "headers": [
            {
                "name": "dry_run",
                "wire": "Dry-Run",
                "value": "h1"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "sharing_id"
        ],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "status": "success",
            "errors": [
                {
                    "description": "x",
                    "location": "header",
                    "name": "x"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "certificate_tag",
        "accessor": "CertificateTag",
        "op": "create",
        "method": "POST",
        "path": "/certificate/issued-certs/{id}/tags",
        "args": [
            {
                "name": "certificate_id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 201,
        "sample": {
            "message": "x"
        },
        "idField": "id"
    },
    {
        "entity": "certificate_tag",
        "accessor": "CertificateTag",
        "op": "list",
        "method": "GET",
        "path": "/certificate/issued-certs/{id}/tags",
        "args": [
            {
                "name": "certificate_id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            "x"
        ],
        "idField": "id"
    },
    {
        "entity": "certificate_tag",
        "accessor": "CertificateTag",
        "op": "patch",
        "method": "PATCH",
        "path": "/certificate/issued-certs/{id}/tags",
        "args": [
            {
                "name": "certificate_id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 201,
        "sample": {
            "message": "x"
        },
        "idField": "id"
    },
    {
        "entity": "certificate_tag",
        "accessor": "CertificateTag",
        "op": "remove",
        "method": "DELETE",
        "path": "/certificate/issued-certs/{id}/tags",
        "args": [
            {
                "name": "certificate_id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "message": "x"
        },
        "idField": "id"
    },
    {
        "entity": "certificate_tag",
        "accessor": "CertificateTag",
        "op": "update",
        "method": "PUT",
        "path": "/certificate/issued-certs/{id}/tags",
        "args": [
            {
                "name": "certificate_id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 201,
        "sample": {
            "message": "x"
        },
        "idField": "id"
    },
    {
        "entity": "comment",
        "accessor": "Comment",
        "op": "create",
        "method": "POST",
        "path": "/comment/comments/{id}",
        "args": [
            {
                "name": "entity_id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "dry_run",
                "wire": "Dry-Run",
                "value": "h1"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "status": "success",
            "errors": [
                {
                    "description": "x",
                    "location": "header",
                    "name": "x"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "comment",
        "accessor": "Comment",
        "op": "load",
        "method": "GET",
        "path": "/comment/comments/{id}",
        "args": [
            {
                "name": "entity_id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "content": "x",
            "id": "x",
            "created_at": "2026-01-01T00:00:00Z",
            "updated_at": "2026-01-01T00:00:00Z",
            "user": {
                "id": "x",
                "name": "x",
                "sharing_id": "x"
            }
        },
        "idField": "id"
    },
    {
        "entity": "comment",
        "accessor": "Comment",
        "op": "remove",
        "method": "DELETE",
        "path": "/comment/comments/{id}",
        "args": [
            {
                "name": "entity_id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "domain",
        "accessor": "Domain",
        "op": "create",
        "method": "POST",
        "path": "/domain/domains/{domain}/renew",
        "action": "renew",
        "args": [
            {
                "name": "fqdn",
                "wire": "domain",
                "value": "p1"
            }
        ],
        "select": {
            "sharing_id": "v1"
        },
        "headers": [
            {
                "name": "dry_run",
                "wire": "Dry-Run",
                "value": "h1"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "sharing_id"
        ],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "status": "success",
            "errors": [
                {
                    "description": "x",
                    "location": "header",
                    "name": "x"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "domain",
        "accessor": "Domain",
        "op": "create",
        "method": "POST",
        "path": "/domain/domains/{domain}/restore",
        "action": "restore",
        "args": [
            {
                "name": "fqdn",
                "wire": "domain",
                "value": "p1"
            }
        ],
        "select": {
            "sharing_id": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "sharing_id"
        ],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 202,
        "sample": {
            "message": "x"
        },
        "idField": "id"
    },
    {
        "entity": "domain",
        "accessor": "Domain",
        "op": "create",
        "method": "POST",
        "path": "/domain/domains/{domain}/transferout",
        "action": "transferout",
        "args": [
            {
                "name": "fqdn",
                "wire": "domain",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 202,
        "sample": {
            "message": "x"
        },
        "idField": "id"
    },
    {
        "entity": "domain",
        "accessor": "Domain",
        "op": "create",
        "method": "POST",
        "path": "/domain/domains",
        "args": [],
        "select": {
            "sharing_id": "v1"
        },
        "headers": [
            {
                "name": "dry_run",
                "wire": "Dry-Run",
                "value": "h1"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "sharing_id"
        ],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "status": "success",
            "errors": [
                {
                    "description": "x",
                    "location": "header",
                    "name": "x"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "domain",
        "accessor": "Domain",
        "op": "list",
        "method": "GET",
        "path": "/domain/domains",
        "args": [],
        "select": {
            "fqdn": "v1",
            "nameserver": "v1",
            "page": 1,
            "per_page": "v1",
            "resellee_id": "v1",
            "sharing_id": "v1",
            "sort_by": "fqdn",
            "tld": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "fqdn",
            "nameserver",
            "page",
            "per_page",
            "resellee_id",
            "sharing_id",
            "sort_by",
            "tld"
        ],
        "queryArgs": [
            {
                "name": "fqdn",
                "wire": "fqdn"
            },
            {
                "name": "nameserver",
                "wire": "nameserver"
            },
            {
                "name": "page",
                "wire": "page"
            },
            {
                "name": "per_page",
                "wire": "per_page"
            },
            {
                "name": "resellee_id",
                "wire": "resellee_id"
            },
            {
                "name": "sharing_id",
                "wire": "sharing_id"
            },
            {
                "name": "sort_by",
                "wire": "sort_by"
            },
            {
                "name": "tld",
                "wire": "tld"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "autorenew": true,
                "dates": {
                    "registry_created_at": "2026-01-01T00:00:00Z",
                    "updated_at": "2026-01-01T00:00:00Z",
                    "authinfo_expires_at": "2026-01-01T00:00:00Z",
                    "created_at": "2026-01-01T00:00:00Z",
                    "deletes_at": "2026-01-01T00:00:00Z",
                    "hold_begins_at": "2026-01-01T00:00:00Z",
                    "hold_ends_at": "2026-01-01T00:00:00Z",
                    "pending_delete_ends_at": "2026-01-01T00:00:00Z",
                    "registry_ends_at": "2026-01-01T00:00:00Z",
                    "renew_begins_at": "2026-01-01T00:00:00Z",
                    "restore_ends_at": "2026-01-01T00:00:00Z"
                },
                "domain_owner": "x",
                "fqdn": "x",
                "fqdn_unicode": "x",
                "href": "x",
                "id": "x",
                "nameserver": {
                    "current": "x",
                    "hosts": [
                        "x"
                    ]
                },
                "orga_owner": "x",
                "owner": "x",
                "status": [
                    "clientHold"
                ],
                "tld": "x",
                "sharing_id": "x",
                "tags": [
                    "x"
                ]
            }
        ],
        "idField": "id"
    },
    {
        "entity": "domain",
        "accessor": "Domain",
        "op": "load",
        "method": "GET",
        "path": "/domain/domains/{domain}",
        "args": [
            {
                "name": "fqdn",
                "wire": "domain",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "autorenew": {
                "href": "x",
                "dates": [
                    "2026-01-01T00:00:00Z"
                ],
                "duration": 1,
                "enabled": true,
                "org_id": "x"
            },
            "can_tld_lock": true,
            "contacts": {
                "admin": {
                    "country": "x",
                    "email": "x",
                    "family": "x",
                    "given": "x",
                    "same_as_owner": true,
                    "streetaddr": "x",
                    "type": "individual",
                    "brand_number": "x",
                    "city": "x",
                    "data_obfuscated": true,
                    "extra_parameters": {},
                    "fax": "x",
                    "jo_announce_number": "x",
                    "jo_announce_page": "x",
                    "jo_declaration_date": "x",
                    "jo_publication_date": "x",
                    "mail_obfuscated": true,
                    "mobile": "x",
                    "orgname": "x",
                    "phone": "x",
                    "reachability": "pending",
                    "sharing_id": "x",
                    "siren": "x",
                    "state": "x",
                    "validation": "pending",
                    "zip": "x"
                },
                "bill": {
                    "country": "x",
                    "email": "x",
                    "family": "x",
                    "given": "x",
                    "same_as_owner": true,
                    "streetaddr": "x",
                    "type": "individual",
                    "brand_number": "x",
                    "city": "x",
                    "data_obfuscated": true,
                    "extra_parameters": {},
                    "fax": "x",
                    "jo_announce_number": "x",
                    "jo_announce_page": "x",
                    "jo_declaration_date": "x",
                    "jo_publication_date": "x",
                    "mail_obfuscated": true,
                    "mobile": "x",
                    "orgname": "x",
                    "phone": "x",
                    "reachability": "pending",
                    "sharing_id": "x",
                    "siren": "x",
                    "state": "x",
                    "validation": "pending",
                    "zip": "x"
                },
                "owner": {
                    "country": "x",
                    "email": "x",
                    "family": "x",
                    "given": "x",
                    "streetaddr": "x",
                    "type": "individual",
                    "brand_number": "x",
                    "city": "x",
                    "data_obfuscated": true,
                    "extra_parameters": {},
                    "fax": "x",
                    "jo_announce_number": "x",
                    "jo_announce_page": "x",
                    "jo_declaration_date": "x",
                    "jo_publication_date": "x",
                    "mail_obfuscated": true,
                    "mobile": "x",
                    "orgname": "x",
                    "phone": "x",
                    "reachability": "pending",
                    "sharing_id": "x",
                    "siren": "x",
                    "state": "x",
                    "validation": "pending",
                    "zip": "x"
                },
                "tech": {
                    "country": "x",
                    "email": "x",
                    "family": "x",
                    "given": "x",
                    "same_as_owner": true,
                    "streetaddr": "x",
                    "type": "individual",
                    "brand_number": "x",
                    "city": "x",
                    "data_obfuscated": true,
                    "extra_parameters": {},
                    "fax": "x",
                    "jo_announce_number": "x",
                    "jo_announce_page": "x",
                    "jo_declaration_date": "x",
                    "jo_publication_date": "x",
                    "mail_obfuscated": true,
                    "mobile": "x",
                    "orgname": "x",
                    "phone": "x",
                    "reachability": "pending",
                    "sharing_id": "x",
                    "siren": "x",
                    "state": "x",
                    "validation": "pending",
                    "zip": "x"
                }
            },
            "dates": {
                "registry_created_at": "2026-01-01T00:00:00Z",
                "updated_at": "2026-01-01T00:00:00Z",
                "authinfo_expires_at": "2026-01-01T00:00:00Z",
                "created_at": "2026-01-01T00:00:00Z",
                "deletes_at": "2026-01-01T00:00:00Z",
                "hold_begins_at": "2026-01-01T00:00:00Z",
                "hold_ends_at": "2026-01-01T00:00:00Z",
                "pending_delete_ends_at": "2026-01-01T00:00:00Z",
                "registry_ends_at": "2026-01-01T00:00:00Z",
                "renew_begins_at": "2026-01-01T00:00:00Z",
                "restore_ends_at": "2026-01-01T00:00:00Z"
            },
            "fqdn": "x",
            "fqdn_unicode": "x",
            "href": "x",
            "nameservers": [
                "x"
            ],
            "reachability": "pending",
            "services": [
                "gandidns"
            ],
            "sharing_space": {
                "id": "x",
                "name": "x",
                "type": "x",
                "reseller": true,
                "sharing_space": {
                    "id": "x",
                    "name": "x"
                }
            },
            "status": [
                "clientHold"
            ],
            "tld": "x",
            "authinfo": "x",
            "id": "x",
            "sharing_id": "x",
            "tags": [
                "x"
            ],
            "trustee_roles": [
                {
                    "allow_transferout": true,
                    "editable": true,
                    "name": "owner"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "domain",
        "accessor": "Domain",
        "op": "load",
        "method": "GET",
        "path": "/domain/domains/{domain}/createstatus",
        "action": "createstatus",
        "args": [
            {
                "name": "fqdn",
                "wire": "domain",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "step": "BILL",
            "step_nb": 1,
            "errortype": "x",
            "errortype_label": "x"
        },
        "idField": "id"
    },
    {
        "entity": "domain",
        "accessor": "Domain",
        "op": "load",
        "method": "GET",
        "path": "/domain/domains/{domain}/renew",
        "action": "renew",
        "args": [
            {
                "name": "fqdn",
                "wire": "domain",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "begins_at": "x",
            "durations": [
                1
            ],
            "maximum": 1,
            "minimum": 1,
            "prohibited": true,
            "ends_at": "x",
            "in_renew_period": true
        },
        "idField": "id"
    },
    {
        "entity": "domain",
        "accessor": "Domain",
        "op": "load",
        "method": "GET",
        "path": "/domain/domains/{domain}/restore",
        "action": "restore",
        "args": [
            {
                "name": "fqdn",
                "wire": "domain",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "restorable": true,
            "contracts": [
                {
                    "id": "x",
                    "name": "x",
                    "href": "x",
                    "registry_contract_href": "x"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "domain",
        "accessor": "Domain",
        "op": "remove",
        "method": "DELETE",
        "path": "/domain/domains/{domain}",
        "args": [
            {
                "name": "fqdn",
                "wire": "domain",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 202,
        "sample": {
            "message": "x"
        },
        "idField": "id"
    },
    {
        "entity": "domain",
        "accessor": "Domain",
        "op": "update",
        "method": "PUT",
        "path": "/domain/domains/{domain}/authinfo",
        "action": "authinfo",
        "args": [
            {
                "name": "fqdn",
                "wire": "domain",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 201,
        "sample": {
            "message": "x"
        },
        "idField": "id"
    },
    {
        "entity": "domain",
        "accessor": "Domain",
        "op": "update",
        "method": "PATCH",
        "path": "/domain/domains/{domain}/autorenew",
        "action": "autorenew",
        "args": [
            {
                "name": "fqdn",
                "wire": "domain",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 201,
        "sample": {
            "message": "x"
        },
        "idField": "id"
    },
    {
        "entity": "domain",
        "accessor": "Domain",
        "op": "update",
        "method": "PATCH",
        "path": "/domain/domains/{domain}/reachability",
        "action": "reachability",
        "args": [
            {
                "name": "fqdn",
                "wire": "domain",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "domain",
        "accessor": "Domain",
        "op": "update",
        "method": "PATCH",
        "path": "/domain/domains/{domain}/status",
        "action": "status",
        "args": [
            {
                "name": "fqdn",
                "wire": "domain",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 202,
        "sample": {
            "message": "x"
        },
        "idField": "id"
    },
    {
        "entity": "domain_availability",
        "accessor": "DomainAvailability",
        "op": "load",
        "method": "GET",
        "path": "/domain/check",
        "args": [],
        "select": {
            "name": "v1",
            "country": "v1",
            "currency": "v1",
            "duration_unit": "v1",
            "extension": "v1",
            "grid": "v1",
            "lang": "v1",
            "max_duration": "v1",
            "period": "v1",
            "process": "v1",
            "sharing_id": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "name",
            "country",
            "currency",
            "duration_unit",
            "extension",
            "grid",
            "lang",
            "max_duration",
            "period",
            "processes",
            "sharing_id"
        ],
        "queryArgs": [
            {
                "name": "country",
                "wire": "country"
            },
            {
                "name": "currency",
                "wire": "currency"
            },
            {
                "name": "duration_unit",
                "wire": "duration_unit"
            },
            {
                "name": "extension",
                "wire": "extension"
            },
            {
                "name": "grid",
                "wire": "grid"
            },
            {
                "name": "lang",
                "wire": "lang"
            },
            {
                "name": "max_duration",
                "wire": "max_duration"
            },
            {
                "name": "name",
                "wire": "name"
            },
            {
                "name": "period",
                "wire": "period"
            },
            {
                "name": "process",
                "wire": "processes"
            },
            {
                "name": "sharing_id",
                "wire": "sharing_id"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "currency": "x",
            "grid": "x",
            "products": [
                {
                    "name": "x",
                    "prices": [
                        {
                            "duration_unit": "x",
                            "max_duration": 1,
                            "min_duration": 1,
                            "price_after_taxes": 1,
                            "price_before_taxes": 1,
                            "discount": true,
                            "normal_price_after_taxes": 1,
                            "normal_price_before_taxes": 1,
                            "options": {
                                "period": "x"
                            },
                            "type": "x"
                        }
                    ],
                    "status": "x",
                    "taxes": [
                        {
                            "name": "x",
                            "rate": 1,
                            "type": "x"
                        }
                    ],
                    "periods": [
                        {
                            "name": "x",
                            "starts_at": "2026-01-01T00:00:00Z",
                            "ends_at": "2026-01-01T00:00:00Z"
                        }
                    ],
                    "process": "x"
                }
            ],
            "taxes": [
                {
                    "name": "x",
                    "rate": 1,
                    "type": "x"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "domain_change_owner",
        "accessor": "DomainChangeOwner",
        "op": "create",
        "method": "POST",
        "path": "/domain/changeowner/{domain}",
        "args": [
            {
                "name": "domain",
                "wire": "domain",
                "value": "p1"
            }
        ],
        "select": {
            "sharing_id": "v1"
        },
        "headers": [
            {
                "name": "dry_run",
                "wire": "Dry-Run",
                "value": "h1"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "sharing_id"
        ],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "status": "success",
            "errors": [
                {
                    "description": "x",
                    "location": "header",
                    "name": "x"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "domain_change_owner",
        "accessor": "DomainChangeOwner",
        "op": "create",
        "method": "POST",
        "path": "/domain/changeowner/{domain}/foa",
        "action": "foa",
        "args": [
            {
                "name": "domain",
                "wire": "domain",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 202,
        "sample": {
            "message": "x"
        },
        "idField": "id"
    },
    {
        "entity": "domain_change_owner",
        "accessor": "DomainChangeOwner",
        "op": "load",
        "method": "GET",
        "path": "/domain/changeowner/{domain}",
        "args": [
            {
                "name": "domain",
                "wire": "domain",
                "value": "p1"
            }
        ],
        "select": {
            "sharing_id": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "sharing_id"
        ],
        "queryArgs": [
            {
                "name": "sharing_id",
                "wire": "sharing_id"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "created_at": "2026-01-01T00:00:00Z",
            "params": {
                "answer_new_owner": "x",
                "answer_old_owner": "x",
                "inner_step": "x",
                "new_owner_email": "x",
                "old_admin_email": "x",
                "old_owner_email": "x"
            },
            "step": "x",
            "step_nb": 1,
            "updated_at": "2026-01-01T00:00:00Z",
            "date_start": "x",
            "errortype": "x",
            "errortype_label": "x",
            "foa": [
                {
                    "answer": "x",
                    "email": "x"
                }
            ],
            "inner_step": "x"
        },
        "idField": "id"
    },
    {
        "entity": "domain_claim",
        "accessor": "DomainClaim",
        "op": "create",
        "method": "POST",
        "path": "/domain/domains/{domain}/claims",
        "args": [
            {
                "name": "domain",
                "wire": "domain",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 201,
        "sample": {
            "message": "x"
        },
        "idField": "id"
    },
    {
        "entity": "domain_claim",
        "accessor": "DomainClaim",
        "op": "load",
        "method": "GET",
        "path": "/domain/domains/{domain}/claims",
        "args": [
            {
                "name": "domain",
                "wire": "domain",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "claims": [
                {
                    "contacts": [
                        {
                            "cc": "x",
                            "city": "x",
                            "email": "x",
                            "fax": "x",
                            "name": "x",
                            "org": "x",
                            "pc": "x",
                            "phone": "x",
                            "sp": "x",
                            "street": "x"
                        }
                    ],
                    "goods_and_services": "x",
                    "holders": [
                        {
                            "cc": "x",
                            "city": "x",
                            "email": "x",
                            "fax": "x",
                            "name": "x",
                            "org": "x",
                            "pc": "x",
                            "phone": "x",
                            "sp": "x",
                            "street": "x"
                        }
                    ],
                    "jurisdiction_classes": [
                        1
                    ],
                    "jurisdiction_country": "x",
                    "mark_name": "x"
                }
            ],
            "created_at": "x",
            "expires_at": "x",
            "fqdn": "x",
            "fqdn_alabel": "x",
            "fqdn_ulabel": "x",
            "notice_id": "x",
            "status": "new"
        },
        "idField": "id"
    },
    {
        "entity": "domain_contact",
        "accessor": "DomainContact",
        "op": "load",
        "method": "GET",
        "path": "/domain/domains/{domain}/contacts",
        "args": [
            {
                "name": "domain",
                "wire": "domain",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "admin": {
                "country": "x",
                "email": "x",
                "family": "x",
                "given": "x",
                "same_as_owner": true,
                "streetaddr": "x",
                "type": "individual",
                "brand_number": "x",
                "city": "x",
                "data_obfuscated": true,
                "extra_parameters": {},
                "fax": "x",
                "jo_announce_number": "x",
                "jo_announce_page": "x",
                "jo_declaration_date": "x",
                "jo_publication_date": "x",
                "mail_obfuscated": true,
                "mobile": "x",
                "orgname": "x",
                "phone": "x",
                "reachability": "pending",
                "sharing_id": "x",
                "siren": "x",
                "state": "x",
                "validation": "pending",
                "zip": "x"
            },
            "bill": {
                "country": "x",
                "email": "x",
                "family": "x",
                "given": "x",
                "same_as_owner": true,
                "streetaddr": "x",
                "type": "individual",
                "brand_number": "x",
                "city": "x",
                "data_obfuscated": true,
                "extra_parameters": {},
                "fax": "x",
                "jo_announce_number": "x",
                "jo_announce_page": "x",
                "jo_declaration_date": "x",
                "jo_publication_date": "x",
                "mail_obfuscated": true,
                "mobile": "x",
                "orgname": "x",
                "phone": "x",
                "reachability": "pending",
                "sharing_id": "x",
                "siren": "x",
                "state": "x",
                "validation": "pending",
                "zip": "x"
            },
            "owner": {
                "country": "x",
                "email": "x",
                "family": "x",
                "given": "x",
                "streetaddr": "x",
                "type": "individual",
                "brand_number": "x",
                "city": "x",
                "data_obfuscated": true,
                "extra_parameters": {},
                "fax": "x",
                "jo_announce_number": "x",
                "jo_announce_page": "x",
                "jo_declaration_date": "x",
                "jo_publication_date": "x",
                "mail_obfuscated": true,
                "mobile": "x",
                "orgname": "x",
                "phone": "x",
                "reachability": "pending",
                "sharing_id": "x",
                "siren": "x",
                "state": "x",
                "validation": "pending",
                "zip": "x"
            },
            "tech": {
                "country": "x",
                "email": "x",
                "family": "x",
                "given": "x",
                "same_as_owner": true,
                "streetaddr": "x",
                "type": "individual",
                "brand_number": "x",
                "city": "x",
                "data_obfuscated": true,
                "extra_parameters": {},
                "fax": "x",
                "jo_announce_number": "x",
                "jo_announce_page": "x",
                "jo_declaration_date": "x",
                "jo_publication_date": "x",
                "mail_obfuscated": true,
                "mobile": "x",
                "orgname": "x",
                "phone": "x",
                "reachability": "pending",
                "sharing_id": "x",
                "siren": "x",
                "state": "x",
                "validation": "pending",
                "zip": "x"
            }
        },
        "idField": "id"
    },
    {
        "entity": "domain_contact",
        "accessor": "DomainContact",
        "op": "update",
        "method": "PATCH",
        "path": "/domain/domains/{domain}/contacts",
        "args": [
            {
                "name": "domain",
                "wire": "domain",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 202,
        "sample": {
            "message": "x"
        },
        "idField": "id"
    },
    {
        "entity": "domain_contact",
        "accessor": "DomainContact",
        "op": "update",
        "method": "PUT",
        "path": "/domain/domains/{domain}/contacts/owner",
        "action": "owner",
        "args": [
            {
                "name": "domain",
                "wire": "domain",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "dry_run",
                "wire": "Dry-Run",
                "value": "h1"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "status": "success",
            "errors": [
                {
                    "description": "x",
                    "location": "header",
                    "name": "x"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "domain_dnskey",
        "accessor": "DomainDnskey",
        "op": "create",
        "method": "POST",
        "path": "/domain/domains/{domain}/dnskeys",
        "args": [
            {
                "name": "domain",
                "wire": "domain",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 202,
        "sample": {
            "message": "x"
        },
        "idField": "id"
    },
    {
        "entity": "domain_dnskey",
        "accessor": "DomainDnskey",
        "op": "list",
        "method": "GET",
        "path": "/domain/domains/{domain}/dnskeys",
        "args": [
            {
                "name": "domain",
                "wire": "domain",
                "value": "p1"
            }
        ],
        "select": {
            "page": 1,
            "per_page": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "page",
            "per_page"
        ],
        "queryArgs": [
            {
                "name": "page",
                "wire": "page"
            },
            {
                "name": "per_page",
                "wire": "per_page"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "algorithm": 1,
                "digest": "x",
                "digest_type": 1,
                "href": "x",
                "id": 1,
                "keytag": 1,
                "type": "none",
                "public_key": "x"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "domain_dnskey",
        "accessor": "DomainDnskey",
        "op": "remove",
        "method": "DELETE",
        "path": "/domain/domains/{domain}/dnskeys/{id}",
        "args": [
            {
                "name": "domain",
                "wire": "domain",
                "value": "p1"
            },
            {
                "name": "id",
                "wire": "id",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 202,
        "sample": {
            "message": "x"
        },
        "idField": "id"
    },
    {
        "entity": "domain_dnskey",
        "accessor": "DomainDnskey",
        "op": "update",
        "method": "PUT",
        "path": "/domain/domains/{domain}/dnskeys",
        "args": [
            {
                "name": "domain",
                "wire": "domain",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 202,
        "sample": {
            "message": "x"
        },
        "idField": "id"
    },
    {
        "entity": "domain_dnssec",
        "accessor": "DomainDnssec",
        "op": "create",
        "method": "POST",
        "path": "/domain/domains/{domain}/livedns/dnssec",
        "args": [
            {
                "name": "domain",
                "wire": "domain",
                "value": "p1"
            }
        ],
        "select": {
            "sharing_id": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "sharing_id"
        ],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 202,
        "sample": {
            "state": "activating"
        },
        "idField": "id"
    },
    {
        "entity": "domain_dnssec",
        "accessor": "DomainDnssec",
        "op": "load",
        "method": "GET",
        "path": "/domain/domains/{domain}/livedns/dnssec",
        "args": [
            {
                "name": "domain",
                "wire": "domain",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "state": "activation_error",
            "error": "x"
        },
        "idField": "id"
    },
    {
        "entity": "domain_dnssec",
        "accessor": "DomainDnssec",
        "op": "remove",
        "method": "DELETE",
        "path": "/domain/domains/{domain}/livedns/dnssec",
        "args": [
            {
                "name": "domain",
                "wire": "domain",
                "value": "p1"
            }
        ],
        "select": {
            "sharing_id": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "sharing_id"
        ],
        "queryArgs": [
            {
                "name": "sharing_id",
                "wire": "sharing_id"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 202,
        "sample": {
            "state": "deactivating"
        },
        "idField": "id"
    },
    {
        "entity": "domain_host",
        "accessor": "DomainHost",
        "op": "create",
        "method": "POST",
        "path": "/domain/domains/{domain}/hosts",
        "args": [
            {
                "name": "domain",
                "wire": "domain",
                "value": "p1"
            }
        ],
        "select": {
            "page": 1,
            "per_page": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "page",
            "per_page"
        ],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "domain_host",
        "accessor": "DomainHost",
        "op": "list",
        "method": "GET",
        "path": "/domain/domains/{domain}/hosts",
        "args": [
            {
                "name": "domain",
                "wire": "domain",
                "value": "p1"
            }
        ],
        "select": {
            "page": 1,
            "per_page": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "page",
            "per_page"
        ],
        "queryArgs": [
            {
                "name": "page",
                "wire": "page"
            },
            {
                "name": "per_page",
                "wire": "per_page"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "fqdn": "x",
                "fqdn_unicode": "x",
                "href": "x",
                "ips": [
                    "x"
                ],
                "name": "x"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "domain_host",
        "accessor": "DomainHost",
        "op": "load",
        "method": "GET",
        "path": "/domain/domains/{domain}/hosts/{name}",
        "args": [
            {
                "name": "domain",
                "wire": "domain",
                "value": "p1"
            },
            {
                "name": "name",
                "wire": "name",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "fqdn": "x",
            "fqdn_unicode": "x",
            "href": "x",
            "ips": [
                "x"
            ],
            "name": "x"
        },
        "idField": "id"
    },
    {
        "entity": "domain_host",
        "accessor": "DomainHost",
        "op": "remove",
        "method": "DELETE",
        "path": "/domain/domains/{domain}/hosts/{name}",
        "args": [
            {
                "name": "domain",
                "wire": "domain",
                "value": "p1"
            },
            {
                "name": "name",
                "wire": "name",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 202,
        "sample": {
            "message": "x"
        },
        "idField": "id"
    },
    {
        "entity": "domain_host",
        "accessor": "DomainHost",
        "op": "update",
        "method": "PUT",
        "path": "/domain/domains/{domain}/hosts/{name}",
        "args": [
            {
                "name": "domain",
                "wire": "domain",
                "value": "p1"
            },
            {
                "name": "name",
                "wire": "name",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 202,
        "sample": {
            "message": "x"
        },
        "idField": "id"
    },
    {
        "entity": "domain_livedns",
        "accessor": "DomainLivedns",
        "op": "create",
        "method": "POST",
        "path": "/domain/domains/{domain}/livedns",
        "args": [
            {
                "name": "domain",
                "wire": "domain",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 202,
        "sample": {
            "message": "x"
        },
        "idField": "id"
    },
    {
        "entity": "domain_livedns",
        "accessor": "DomainLivedns",
        "op": "load",
        "method": "GET",
        "path": "/domain/domains/{domain}/livedns",
        "args": [
            {
                "name": "domain",
                "wire": "domain",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "current": "classic",
            "nameservers": [
                "x"
            ],
            "dnssec_available": true,
            "livednssec_available": true
        },
        "idField": "id"
    },
    {
        "entity": "domain_nameserver",
        "accessor": "DomainNameserver",
        "op": "list",
        "method": "GET",
        "path": "/domain/domains/{domain}/nameservers",
        "args": [
            {
                "name": "domain",
                "wire": "domain",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            "x"
        ],
        "idField": "id"
    },
    {
        "entity": "domain_nameserver",
        "accessor": "DomainNameserver",
        "op": "update",
        "method": "PUT",
        "path": "/domain/domains/{domain}/nameservers",
        "args": [
            {
                "name": "domain",
                "wire": "domain",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 202,
        "sample": {
            "message": "x"
        },
        "idField": "id"
    },
    {
        "entity": "domain_tag",
        "accessor": "DomainTag",
        "op": "create",
        "method": "POST",
        "path": "/domain/domains/{domain}/tags",
        "args": [
            {
                "name": "domain",
                "wire": "domain",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 201,
        "sample": {
            "message": "x"
        },
        "idField": "id"
    },
    {
        "entity": "domain_tag",
        "accessor": "DomainTag",
        "op": "list",
        "method": "GET",
        "path": "/domain/domains/{domain}/tags",
        "args": [
            {
                "name": "domain",
                "wire": "domain",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            "x"
        ],
        "idField": "id"
    },
    {
        "entity": "domain_tag",
        "accessor": "DomainTag",
        "op": "patch",
        "method": "PATCH",
        "path": "/domain/domains/{domain}/tags",
        "args": [
            {
                "name": "domain",
                "wire": "domain",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 201,
        "sample": {
            "message": "x"
        },
        "idField": "id"
    },
    {
        "entity": "domain_tag",
        "accessor": "DomainTag",
        "op": "remove",
        "method": "DELETE",
        "path": "/domain/domains/{domain}/tags",
        "args": [
            {
                "name": "domain",
                "wire": "domain",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "message": "x"
        },
        "idField": "id"
    },
    {
        "entity": "domain_tag",
        "accessor": "DomainTag",
        "op": "update",
        "method": "PUT",
        "path": "/domain/domains/{domain}/tags",
        "args": [
            {
                "name": "domain",
                "wire": "domain",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 201,
        "sample": {
            "message": "x"
        },
        "idField": "id"
    },
    {
        "entity": "domain_transfer",
        "accessor": "DomainTransfer",
        "op": "create",
        "method": "POST",
        "path": "/domain/transferin/{domain}/available",
        "action": "available",
        "args": [
            {
                "name": "domain",
                "wire": "domain",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "available": true,
            "fqdn": "x",
            "fqdn_alabel": "x",
            "fqdn_ulabel": "x",
            "corporate": true,
            "durations": [
                1
            ],
            "internal": true,
            "maximum_duration": 1,
            "minimum_duration": 1,
            "msg": "x"
        },
        "idField": "id"
    },
    {
        "entity": "domain_transfer",
        "accessor": "DomainTransfer",
        "op": "create",
        "method": "POST",
        "path": "/domain/transferin/{domain}/foa",
        "action": "foa",
        "args": [
            {
                "name": "domain",
                "wire": "domain",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 202,
        "sample": {
            "message": "x"
        },
        "idField": "id"
    },
    {
        "entity": "domain_transfer",
        "accessor": "DomainTransfer",
        "op": "create",
        "method": "POST",
        "path": "/domain/transferin",
        "args": [],
        "select": {
            "sharing_id": "v1"
        },
        "headers": [
            {
                "name": "dry_run",
                "wire": "Dry-Run",
                "value": "h1"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "sharing_id"
        ],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "status": "success",
            "errors": [
                {
                    "description": "x",
                    "location": "header",
                    "name": "x"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "domain_transfer",
        "accessor": "DomainTransfer",
        "op": "load",
        "method": "GET",
        "path": "/domain/transferin/{domain}",
        "args": [
            {
                "name": "domain",
                "wire": "domain",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "created_at": "x",
            "owner_contact": "x",
            "params": {
                "domain": "x",
                "duration": 1,
                "reseller": "x",
                "tld": "x",
                "version": 1
            },
            "step": "x",
            "step_nb": 1,
            "updated_at": "x",
            "errortype": "x",
            "errortype_label": "x",
            "foa": [
                {
                    "answer": "x",
                    "email": "x"
                }
            ],
            "inner_step": "x",
            "regac_at": "x",
            "start_at": "x",
            "transfer_link": "x",
            "transfer_procedure": "x"
        },
        "idField": "id"
    },
    {
        "entity": "domain_transfer",
        "accessor": "DomainTransfer",
        "op": "update",
        "method": "PUT",
        "path": "/domain/transferin/{domain}",
        "args": [
            {
                "name": "domain",
                "wire": "domain",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 202,
        "sample": {
            "message": "x"
        },
        "idField": "id"
    },
    {
        "entity": "domain_transfer",
        "accessor": "DomainTransfer",
        "op": "update",
        "method": "PUT",
        "path": "/domain/transferin/{domain}/authinfo",
        "action": "authinfo",
        "args": [
            {
                "name": "domain",
                "wire": "domain",
                "value": "p1"
            }
        ],
        "select": {
            "sharing_id": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "sharing_id"
        ],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 202,
        "sample": {
            "message": "x"
        },
        "idField": "id"
    },
    {
        "entity": "domain_webredir",
        "accessor": "DomainWebredir",
        "op": "create",
        "method": "POST",
        "path": "/domain/domains/{domain}/webredirs",
        "args": [
            {
                "name": "domain",
                "wire": "domain",
                "value": "p1"
            }
        ],
        "select": {
            "page": 1,
            "per_page": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "page",
            "per_page"
        ],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "domain_webredir",
        "accessor": "DomainWebredir",
        "op": "list",
        "method": "GET",
        "path": "/domain/domains/{domain}/webredirs",
        "args": [
            {
                "name": "domain",
                "wire": "domain",
                "value": "p1"
            }
        ],
        "select": {
            "page": 1,
            "per_page": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "page",
            "per_page"
        ],
        "queryArgs": [
            {
                "name": "page",
                "wire": "page"
            },
            {
                "name": "per_page",
                "wire": "per_page"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "host": "x",
                "type": "cloak",
                "url": "x",
                "cert_status": "x",
                "cert_uuid": "x",
                "created_at": "x",
                "protocol": "http",
                "updated_at": "x"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "domain_webredir",
        "accessor": "DomainWebredir",
        "op": "load",
        "method": "GET",
        "path": "/domain/domains/{domain}/webredirs/{host}",
        "args": [
            {
                "name": "domain",
                "wire": "domain",
                "value": "p1"
            },
            {
                "name": "host",
                "wire": "host",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "host": "x",
            "type": "cloak",
            "url": "x",
            "cert_status": "x",
            "cert_uuid": "x",
            "created_at": "x",
            "protocol": "http",
            "updated_at": "x"
        },
        "idField": "id"
    },
    {
        "entity": "domain_webredir",
        "accessor": "DomainWebredir",
        "op": "remove",
        "method": "DELETE",
        "path": "/domain/domains/{domain}/webredirs/{host}",
        "args": [
            {
                "name": "domain",
                "wire": "domain",
                "value": "p1"
            },
            {
                "name": "host",
                "wire": "host",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "message": "x"
        },
        "idField": "id"
    },
    {
        "entity": "domain_webredir",
        "accessor": "DomainWebredir",
        "op": "update",
        "method": "PATCH",
        "path": "/domain/domains/{domain}/webredirs/{host}",
        "args": [
            {
                "name": "domain",
                "wire": "domain",
                "value": "p1"
            },
            {
                "name": "host",
                "wire": "host",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "message": "x"
        },
        "idField": "id"
    },
    {
        "entity": "email_forward",
        "accessor": "EmailForward",
        "op": "create",
        "method": "POST",
        "path": "/email/forwards/{domain}",
        "args": [
            {
                "name": "domain",
                "wire": "domain",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 201,
        "sample": {
            "message": "x"
        },
        "idField": "id"
    },
    {
        "entity": "email_forward",
        "accessor": "EmailForward",
        "op": "list",
        "method": "GET",
        "path": "/email/forwards/{domain}",
        "args": [
            {
                "name": "domain",
                "wire": "domain",
                "value": "p1"
            }
        ],
        "select": {
            "destination": "v1",
            "page": 1,
            "per_page": "v1",
            "sort_by": "source",
            "source": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "destination",
            "page",
            "per_page",
            "sort_by",
            "source"
        ],
        "queryArgs": [
            {
                "name": "destination",
                "wire": "destination"
            },
            {
                "name": "page",
                "wire": "page"
            },
            {
                "name": "per_page",
                "wire": "per_page"
            },
            {
                "name": "sort_by",
                "wire": "sort_by"
            },
            {
                "name": "source",
                "wire": "source"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "destinations": [
                    "x"
                ],
                "href": "x",
                "source": "x"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "email_forward",
        "accessor": "EmailForward",
        "op": "remove",
        "method": "DELETE",
        "path": "/email/forwards/{domain}/{source}",
        "args": [
            {
                "name": "domain",
                "wire": "domain",
                "value": "p1"
            },
            {
                "name": "source",
                "wire": "source",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 202,
        "sample": {
            "message": "x"
        },
        "idField": "id"
    },
    {
        "entity": "email_forward",
        "accessor": "EmailForward",
        "op": "update",
        "method": "PUT",
        "path": "/email/forwards/{domain}/{source}",
        "args": [
            {
                "name": "domain",
                "wire": "domain",
                "value": "p1"
            },
            {
                "name": "source",
                "wire": "source",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 202,
        "sample": {
            "message": "x"
        },
        "idField": "id"
    },
    {
        "entity": "email_mailbox",
        "accessor": "EmailMailbox",
        "op": "create",
        "method": "POST",
        "path": "/email/mailboxes/{domain}/{email}/renew",
        "action": "renew",
        "args": [
            {
                "name": "address",
                "wire": "email",
                "value": "p1"
            },
            {
                "name": "domain",
                "wire": "domain",
                "value": "p2"
            }
        ],
        "select": {
            "sharing_id": "v1"
        },
        "headers": [
            {
                "name": "dry_run",
                "wire": "Dry-Run",
                "value": "h1"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "sharing_id"
        ],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "status": "success",
            "errors": [
                {
                    "description": "x",
                    "location": "header",
                    "name": "x"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "email_mailbox",
        "accessor": "EmailMailbox",
        "op": "create",
        "method": "POST",
        "path": "/email/mailboxes/{domain}",
        "args": [
            {
                "name": "domain",
                "wire": "domain",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "dry_run",
                "wire": "Dry-Run",
                "value": "h1"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "status": "success",
            "errors": [
                {
                    "description": "x",
                    "location": "header",
                    "name": "x"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "email_mailbox",
        "accessor": "EmailMailbox",
        "op": "create",
        "method": "POST",
        "path": "/email/mailboxes/{domain}/renew",
        "action": "renew_all",
        "args": [
            {
                "name": "domain",
                "wire": "domain",
                "value": "p1"
            }
        ],
        "select": {
            "sharing_id": "v1"
        },
        "headers": [
            {
                "name": "dry_run",
                "wire": "Dry-Run",
                "value": "h1"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "sharing_id"
        ],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "status": "success",
            "errors": [
                {
                    "description": "x",
                    "location": "header",
                    "name": "x"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "email_mailbox",
        "accessor": "EmailMailbox",
        "op": "list",
        "method": "GET",
        "path": "/email/mailboxes/{domain}",
        "args": [
            {
                "name": "domain",
                "wire": "domain",
                "value": "p1"
            }
        ],
        "select": {
            "<created_at": "v1",
            "antispam": "v1",
            "login": "v1",
            "mailbox_type": "v1",
            "page": 1,
            "per_page": "v1",
            "~login": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "<created_at",
            "~login",
            "antispam",
            "login",
            "mailbox_type",
            "page",
            "per_page"
        ],
        "queryArgs": [
            {
                "name": "<created_at",
                "wire": "<created_at"
            },
            {
                "name": "antispam",
                "wire": "antispam"
            },
            {
                "name": "login",
                "wire": "login"
            },
            {
                "name": "mailbox_type",
                "wire": "mailbox_type"
            },
            {
                "name": "page",
                "wire": "page"
            },
            {
                "name": "per_page",
                "wire": "per_page"
            },
            {
                "name": "~login",
                "wire": "~login"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "address": "x",
                "alias_count": 1,
                "antispam": true,
                "autorenew": {
                    "duration": 1,
                    "duration_type": "x",
                    "enabled": true,
                    "sharing_id": "x"
                },
                "domain": "x",
                "expires_at": "2026-01-01T00:00:00Z",
                "href": "x",
                "id": "x",
                "login": "x",
                "mailbox_type": "standard",
                "quota_used": 1,
                "to_convert": true
            }
        ],
        "idField": "id"
    },
    {
        "entity": "email_mailbox",
        "accessor": "EmailMailbox",
        "op": "load",
        "method": "GET",
        "path": "/email/mailboxes/{domain}/{mailbox_id}",
        "args": [
            {
                "name": "domain",
                "wire": "domain",
                "value": "p1"
            },
            {
                "name": "id",
                "wire": "mailbox_id",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "address": "x",
            "aliases": [
                "x"
            ],
            "antispam": true,
            "autorenew": {
                "duration": 1,
                "duration_type": "x",
                "enabled": true,
                "sharing_id": "x"
            },
            "domain": "x",
            "expires_at": "2026-01-01T00:00:00Z",
            "href": "x",
            "id": "x",
            "login": "x",
            "mailbox_type": "standard",
            "quota_used": 1,
            "alias_count": 1,
            "fallback_email": "x",
            "responder": {
                "enabled": true,
                "ends_at": "2026-01-01T00:00:00Z",
                "message": "x",
                "starts_at": "2026-01-01T00:00:00Z"
            }
        },
        "idField": "id"
    },
    {
        "entity": "email_mailbox",
        "accessor": "EmailMailbox",
        "op": "remove",
        "method": "DELETE",
        "path": "/email/mailboxes/{domain}/{mailbox_id}",
        "args": [
            {
                "name": "domain",
                "wire": "domain",
                "value": "p1"
            },
            {
                "name": "id",
                "wire": "mailbox_id",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 202,
        "sample": {
            "message": "x"
        },
        "idField": "id"
    },
    {
        "entity": "email_mailbox",
        "accessor": "EmailMailbox",
        "op": "remove",
        "method": "DELETE",
        "path": "/email/mailboxes/{domain}/{mailbox_id}/contents",
        "action": "purge",
        "args": [
            {
                "name": "domain",
                "wire": "domain",
                "value": "p1"
            },
            {
                "name": "id",
                "wire": "mailbox_id",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 202,
        "sample": {
            "message": "x"
        },
        "idField": "id"
    },
    {
        "entity": "email_mailbox",
        "accessor": "EmailMailbox",
        "op": "update",
        "method": "PATCH",
        "path": "/email/mailboxes/{domain}/{mailbox_id}",
        "args": [
            {
                "name": "domain",
                "wire": "domain",
                "value": "p1"
            },
            {
                "name": "id",
                "wire": "mailbox_id",
                "value": "p2"
            }
        ],
        "select": {
            "sharing_id": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "sharing_id"
        ],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 202,
        "sample": {
            "message": "x"
        },
        "idField": "id"
    },
    {
        "entity": "email_migration",
        "accessor": "EmailMigration",
        "op": "create",
        "method": "POST",
        "path": "/email/migration/{domain}",
        "args": [
            {
                "name": "domain",
                "wire": "domain",
                "value": "p1"
            }
        ],
        "select": {
            "sharing_id": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "sharing_id"
        ],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 202,
        "sample": {
            "message": "x"
        },
        "idField": "id"
    },
    {
        "entity": "email_migration",
        "accessor": "EmailMigration",
        "op": "load",
        "method": "GET",
        "path": "/email/migration/{domain}",
        "args": [
            {
                "name": "domain",
                "wire": "domain",
                "value": "p1"
            }
        ],
        "select": {
            "sharing_id": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "sharing_id"
        ],
        "queryArgs": [
            {
                "name": "sharing_id",
                "wire": "sharing_id"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "available": true,
            "currency": "x",
            "forward_count": 1,
            "free_mailboxes": 1,
            "included_mailboxes": 1,
            "info": [
                {
                    "login": "x",
                    "offer_v2": "x",
                    "price_v2": 1,
                    "price_v2_m": 1,
                    "quota": 1,
                    "quota_v2": 1,
                    "usage": 1
                }
            ],
            "packmail": true,
            "price_v1": 1,
            "price_v2": 1,
            "quota_v1": 1,
            "token": "x",
            "usage_v1": 1
        },
        "idField": "id"
    },
    {
        "entity": "email_offer",
        "accessor": "EmailOffer",
        "op": "load",
        "method": "GET",
        "path": "/email/offers/{domain}",
        "args": [
            {
                "name": "domain",
                "wire": "domain",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "antispam": "active",
            "dkim": "active",
            "status": "active",
            "version": 1
        },
        "idField": "id"
    },
    {
        "entity": "email_offer",
        "accessor": "EmailOffer",
        "op": "update",
        "method": "PATCH",
        "path": "/email/offers/{domain}",
        "args": [
            {
                "name": "domain",
                "wire": "domain",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 202,
        "sample": {
            "message": "x"
        },
        "idField": "id"
    },
    {
        "entity": "email_slot",
        "accessor": "EmailSlot",
        "op": "create",
        "method": "POST",
        "path": "/email/slots/{domain}",
        "args": [
            {
                "name": "domain",
                "wire": "domain",
                "value": "p1"
            }
        ],
        "select": {
            "sharing_id": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "sharing_id"
        ],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "email_slot",
        "accessor": "EmailSlot",
        "op": "list",
        "method": "GET",
        "path": "/email/slots/{domain}",
        "args": [
            {
                "name": "domain",
                "wire": "domain",
                "value": "p1"
            }
        ],
        "select": {
            "display_not_expired_and_inactive": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "display_not_expired_and_inactive"
        ],
        "queryArgs": [
            {
                "name": "display_not_expired_and_inactive",
                "wire": "display_not_expired_and_inactive"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "capacity": 1,
                "created_at": "2026-01-01T00:00:00Z",
                "href": "x",
                "id": 1,
                "mailbox_type": "x",
                "refundable": true,
                "status": "x"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "email_slot",
        "accessor": "EmailSlot",
        "op": "load",
        "method": "GET",
        "path": "/email/slots/{domain}/{slot_id}",
        "args": [
            {
                "name": "domain",
                "wire": "domain",
                "value": "p1"
            },
            {
                "name": "id",
                "wire": "slot_id",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "capacity": 1,
            "created_at": "2026-01-01T00:00:00Z",
            "href": "x",
            "id": 1,
            "mailbox_type": "x",
            "refundable": true,
            "status": "x",
            "refund_amount": 1,
            "refund_currency": "x"
        },
        "idField": "id"
    },
    {
        "entity": "email_slot",
        "accessor": "EmailSlot",
        "op": "remove",
        "method": "DELETE",
        "path": "/email/slots/{domain}/{slot_id}",
        "args": [
            {
                "name": "domain",
                "wire": "domain",
                "value": "p1"
            },
            {
                "name": "id",
                "wire": "slot_id",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 202,
        "sample": {
            "message": "x"
        },
        "idField": "id"
    },
    {
        "entity": "hosting_application",
        "accessor": "HostingApplication",
        "op": "list",
        "method": "GET",
        "path": "/simplehosting/applications",
        "args": [],
        "select": {
            "database": "v1",
            "language": "v1",
            "name": "v1",
            "page": 1,
            "per_page": "v1",
            "sharing_id": "v1",
            "sort_by": "-created_at"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "database",
            "language",
            "name",
            "page",
            "per_page",
            "sharing_id",
            "sort_by"
        ],
        "queryArgs": [
            {
                "name": "database",
                "wire": "database"
            },
            {
                "name": "language",
                "wire": "language"
            },
            {
                "name": "name",
                "wire": "name"
            },
            {
                "name": "page",
                "wire": "page"
            },
            {
                "name": "per_page",
                "wire": "per_page"
            },
            {
                "name": "sharing_id",
                "wire": "sharing_id"
            },
            {
                "name": "sort_by",
                "wire": "sort_by"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "name": "x",
                "name_label": "x",
                "requirements": [
                    {
                        "database": {
                            "name": "x",
                            "status": "x",
                            "version": "x"
                        },
                        "instance_minimum_size": "x",
                        "language": {
                            "name": "x",
                            "single_application": true,
                            "status": "x",
                            "version": "x"
                        }
                    }
                ]
            }
        ],
        "idField": "id"
    },
    {
        "entity": "hosting_application",
        "accessor": "HostingApplication",
        "op": "load",
        "method": "GET",
        "path": "/simplehosting/applications/{application_name}",
        "args": [
            {
                "name": "name",
                "wire": "application_name",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "name": "x",
            "name_label": "x",
            "requirements": [
                {
                    "database": {
                        "name": "x",
                        "status": "x",
                        "version": "x"
                    },
                    "instance_minimum_size": "x",
                    "language": {
                        "name": "x",
                        "single_application": true,
                        "status": "x",
                        "version": "x"
                    }
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "hosting_instance",
        "accessor": "HostingInstance",
        "op": "create",
        "method": "POST",
        "path": "/simplehosting/instances/{instance_id}/action",
        "action": "action",
        "args": [
            {
                "name": "id",
                "wire": "instance_id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 202,
        "sample": {
            "message": "x"
        },
        "idField": "id"
    },
    {
        "entity": "hosting_instance",
        "accessor": "HostingInstance",
        "op": "create",
        "method": "POST",
        "path": "/simplehosting/instances",
        "args": [],
        "select": {
            "sharing_id": "v1"
        },
        "headers": [
            {
                "name": "dry_run",
                "wire": "Dry-Run",
                "value": "h1"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "sharing_id"
        ],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "status": "success",
            "errors": [
                {
                    "description": "x",
                    "location": "header",
                    "name": "x"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "hosting_instance",
        "accessor": "HostingInstance",
        "op": "list",
        "method": "GET",
        "path": "/simplehosting/instances",
        "args": [],
        "select": {
            "fqdn": "v1",
            "name": "v1",
            "page": 1,
            "per_page": "v1",
            "sharing_id": "v1",
            "size": "v1",
            "sort_by": "-created_at",
            "status": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "fqdn",
            "name",
            "page",
            "per_page",
            "sharing_id",
            "size",
            "sort_by",
            "status"
        ],
        "queryArgs": [
            {
                "name": "fqdn",
                "wire": "fqdn"
            },
            {
                "name": "name",
                "wire": "name"
            },
            {
                "name": "page",
                "wire": "page"
            },
            {
                "name": "per_page",
                "wire": "per_page"
            },
            {
                "name": "sharing_id",
                "wire": "sharing_id"
            },
            {
                "name": "size",
                "wire": "size"
            },
            {
                "name": "sort_by",
                "wire": "sort_by"
            },
            {
                "name": "status",
                "wire": "status"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "available_upgrade": true,
                "created_at": "2026-01-01T00:00:00Z",
                "database": {
                    "name": "x",
                    "status": "x",
                    "version": "x"
                },
                "datacenter": {
                    "code": "FR-SD3",
                    "name": "x",
                    "region": "FR"
                },
                "expire_at": "2026-01-01T00:00:00Z",
                "id": "x",
                "language": {
                    "name": "x",
                    "single_application": true,
                    "status": "x",
                    "version": "x"
                },
                "name": "x",
                "sharing_space": {
                    "id": "x",
                    "name": "x"
                },
                "size": "s",
                "snapshot_enabled": true,
                "status": "waiting_bill",
                "storage": {
                    "additional": {
                        "unit": "MB",
                        "value": 1
                    },
                    "base": {
                        "unit": "MB",
                        "value": 1
                    },
                    "total": {
                        "unit": "MB",
                        "value": 1
                    }
                },
                "autorenew": {
                    "duration": 1,
                    "duration_type": "m"
                },
                "domain": "x",
                "password_updated_at": "2026-01-01T00:00:00Z",
                "subscription_cancelled": true
            }
        ],
        "idField": "id"
    },
    {
        "entity": "hosting_instance",
        "accessor": "HostingInstance",
        "op": "load",
        "method": "GET",
        "path": "/simplehosting/instances/{instance_id}",
        "args": [
            {
                "name": "id",
                "wire": "instance_id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "access_information": {
                "admin_url": "x",
                "database": {
                    "admins": [
                        {
                            "type": "phpMyAdmin",
                            "url": "x",
                            "username": "x"
                        }
                    ],
                    "host": "x",
                    "port": 1,
                    "socket": "x"
                },
                "sftp": {
                    "server": "x",
                    "url": "x"
                },
                "user": "x"
            },
            "available_upgrade": true,
            "console": {
                "enabled": true,
                "url": "x"
            },
            "cpu": 1,
            "created_at": "2026-01-01T00:00:00Z",
            "database": {
                "name": "x",
                "status": "x",
                "version": "x"
            },
            "datacenter": {
                "code": "FR-SD3",
                "name": "x",
                "region": "FR"
            },
            "expire_at": "2026-01-01T00:00:00Z",
            "id": "x",
            "language": {
                "name": "x",
                "single_application": true,
                "status": "x",
                "version": "x"
            },
            "name": "x",
            "ram": {
                "unit": "MB",
                "value": 1
            },
            "sharing_space": {
                "id": "x",
                "name": "x"
            },
            "size": "s",
            "snapshot_enabled": true,
            "status": "waiting_bill",
            "storage": {
                "additional": {
                    "unit": "MB",
                    "value": 1
                },
                "base": {
                    "unit": "MB",
                    "value": 1
                },
                "total": {
                    "unit": "MB",
                    "value": 1
                }
            },
            "vhosts": [
                {
                    "fqdn": "x",
                    "href": "x"
                }
            ],
            "autorenew": {
                "duration": 1,
                "duration_type": "m"
            },
            "booster": {
                "current": {
                    "cpu_override": 1,
                    "created_at": "2026-01-01T00:00:00Z",
                    "expires_at": "2026-01-01T00:00:00Z",
                    "ram_override": {
                        "unit": "MB",
                        "value": 1
                    },
                    "size_override": "s",
                    "status": "being_created"
                },
                "next": {
                    "available": true,
                    "cooldown_days": 1,
                    "default_cpu_override": 1,
                    "default_ram_override": {
                        "unit": "MB",
                        "value": 1
                    },
                    "duration_days": 1,
                    "available_at": "2026-01-01T00:00:00Z"
                }
            },
            "compatible_applications": [
                {
                    "name": "x",
                    "parameters": {}
                }
            ],
            "domain": "x",
            "password_updated_at": "2026-01-01T00:00:00Z",
            "subscription_cancelled": true,
            "upgrade_to": [
                {
                    "name": "x",
                    "status": "x",
                    "type": "x",
                    "version": "x"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "hosting_instance",
        "accessor": "HostingInstance",
        "op": "load",
        "method": "GET",
        "path": "/simplehosting/instances/{instance_id}/usage",
        "action": "usage",
        "args": [
            {
                "name": "id",
                "wire": "instance_id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "disk_size_bytes": 1,
            "disk_used_bytes": 1
        },
        "idField": "id"
    },
    {
        "entity": "hosting_instance",
        "accessor": "HostingInstance",
        "op": "remove",
        "method": "DELETE",
        "path": "/simplehosting/instances/{instance_id}",
        "args": [
            {
                "name": "id",
                "wire": "instance_id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "hosting_instance",
        "accessor": "HostingInstance",
        "op": "update",
        "method": "PATCH",
        "path": "/simplehosting/instances/{instance_id}",
        "args": [
            {
                "name": "id",
                "wire": "instance_id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 202,
        "sample": {
            "message": "x"
        },
        "idField": "id"
    },
    {
        "entity": "hosting_vhost",
        "accessor": "HostingVhost",
        "op": "create",
        "method": "POST",
        "path": "/simplehosting/instances/{instance_id}/vhosts",
        "args": [
            {
                "name": "instance_id",
                "wire": "instance_id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 202,
        "sample": {
            "fqdn": "x",
            "https_strategy": "HTTP_only",
            "linked_dns_zone": {
                "allow_alteration": true,
                "last_checked_status": "altered"
            },
            "status": "being_created"
        },
        "idField": "id"
    },
    {
        "entity": "hosting_vhost",
        "accessor": "HostingVhost",
        "op": "list",
        "method": "GET",
        "path": "/simplehosting/instances/{instance_id}/vhosts",
        "args": [
            {
                "name": "instance_id",
                "wire": "instance_id",
                "value": "p1"
            }
        ],
        "select": {
            "fqdn": "v1",
            "page": 1,
            "per_page": "v1",
            "sort_by": "-created_at",
            "status": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "fqdn",
            "page",
            "per_page",
            "sort_by",
            "status"
        ],
        "queryArgs": [
            {
                "name": "fqdn",
                "wire": "fqdn"
            },
            {
                "name": "page",
                "wire": "page"
            },
            {
                "name": "per_page",
                "wire": "per_page"
            },
            {
                "name": "sort_by",
                "wire": "sort_by"
            },
            {
                "name": "status",
                "wire": "status"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "created_at": "2026-01-01T00:00:00Z",
                "fqdn": "x",
                "is_a_test_vhost": true,
                "linked_dns_zone": {
                    "allow_alteration": true,
                    "last_checked_status": "altered",
                    "last_checked_at": "2026-01-01T00:00:00Z"
                },
                "status": "being_created",
                "application": {
                    "name": "x",
                    "parameters": {}
                },
                "https_strategy": "HTTP_only",
                "tls_validated_at": "2026-01-01T00:00:00Z"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "hosting_vhost",
        "accessor": "HostingVhost",
        "op": "load",
        "method": "GET",
        "path": "/simplehosting/instances/{instance_id}/vhosts/{vhost_fqdn}",
        "args": [
            {
                "name": "fqdn",
                "wire": "vhost_fqdn",
                "value": "p1"
            },
            {
                "name": "instance_id",
                "wire": "instance_id",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "created_at": "2026-01-01T00:00:00Z",
            "fqdn": "x",
            "is_a_test_vhost": true,
            "linked_dns_zone": {
                "allow_alteration": true,
                "cname": "x",
                "domain": "x",
                "ipv4": "x",
                "ipv6": "x",
                "is_alterable": true,
                "is_root": true,
                "key": "x",
                "last_checked_status": "altered",
                "txt": "x",
                "last_checked_at": "2026-01-01T00:00:00Z"
            },
            "status": "being_created",
            "application": {
                "name": "x",
                "status": "error",
                "parameters": {}
            },
            "deployment": {
                "git": {
                    "deploy_command": "x",
                    "remote_command": "x",
                    "url": "x"
                },
                "sftp": {
                    "directory": "x",
                    "document_root": "x",
                    "server": "x",
                    "url": "x"
                }
            },
            "https_strategy": "HTTP_only",
            "tls_validated_at": "2026-01-01T00:00:00Z"
        },
        "idField": "id"
    },
    {
        "entity": "hosting_vhost",
        "accessor": "HostingVhost",
        "op": "remove",
        "method": "DELETE",
        "path": "/simplehosting/instances/{instance_id}/vhosts/{vhost_fqdn}",
        "args": [
            {
                "name": "fqdn",
                "wire": "vhost_fqdn",
                "value": "p1"
            },
            {
                "name": "instance_id",
                "wire": "instance_id",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "hosting_vhost",
        "accessor": "HostingVhost",
        "op": "remove",
        "method": "DELETE",
        "path": "/simplehosting/instances/{instance_id}/vhosts/{vhost_fqdn}/cache",
        "action": "cache",
        "args": [
            {
                "name": "fqdn",
                "wire": "vhost_fqdn",
                "value": "p1"
            },
            {
                "name": "instance_id",
                "wire": "instance_id",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "hosting_vhost",
        "accessor": "HostingVhost",
        "op": "update",
        "method": "PATCH",
        "path": "/simplehosting/instances/{instance_id}/vhosts/{vhost_fqdn}",
        "args": [
            {
                "name": "fqdn",
                "wire": "vhost_fqdn",
                "value": "p1"
            },
            {
                "name": "instance_id",
                "wire": "instance_id",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "fqdn": "x",
            "https_strategy": "HTTP_only",
            "linked_dns_zone": {
                "allow_alteration": true,
                "last_checked_status": "altered"
            },
            "status": "being_created"
        },
        "idField": "id"
    },
    {
        "entity": "issued_certificate",
        "accessor": "IssuedCertificate",
        "op": "create",
        "method": "POST",
        "path": "/certificate/issued-certs/{id}/dcv_params",
        "action": "dcv_params",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "altnames": [
                "x"
            ],
            "dcv_method": "email",
            "fqdns": [
                "x"
            ],
            "md5": "x",
            "sha256": "x",
            "dns_records": [
                "x"
            ],
            "messages": [
                "x"
            ],
            "raw_messages": [
                [
                    "x"
                ]
            ],
            "unique_value": "x"
        },
        "idField": "id"
    },
    {
        "entity": "issued_certificate",
        "accessor": "IssuedCertificate",
        "op": "create",
        "method": "POST",
        "path": "/certificate/dcv_params",
        "action": "dcv_params",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "altnames": [
                "x"
            ],
            "dcv_method": "email",
            "fqdns": [
                "x"
            ],
            "md5": "x",
            "sha256": "x",
            "dns_records": [
                "x"
            ],
            "messages": [
                "x"
            ],
            "raw_messages": [
                [
                    "x"
                ]
            ]
        },
        "idField": "id"
    },
    {
        "entity": "issued_certificate",
        "accessor": "IssuedCertificate",
        "op": "create",
        "method": "POST",
        "path": "/certificate/issued-certs",
        "args": [],
        "select": {
            "sharing_id": "v1"
        },
        "headers": [
            {
                "name": "dry_run",
                "wire": "Dry-Run",
                "value": "h1"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "sharing_id"
        ],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "status": "success",
            "errors": [
                {
                    "description": "x",
                    "location": "header",
                    "name": "x"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "issued_certificate",
        "accessor": "IssuedCertificate",
        "op": "list",
        "method": "GET",
        "path": "/certificate/issued-certs",
        "args": [],
        "select": {
            "cn": "v1",
            "cn_eq": "v1",
            "covered_cn": "v1",
            "package": "v1",
            "page": 1,
            "per_page": "v1",
            "sharing_id": "v1",
            "sort_by": "ends_at",
            "status": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "cn",
            "cn__eq",
            "covered_cn",
            "package",
            "page",
            "per_page",
            "sharing_id",
            "sort_by",
            "status"
        ],
        "queryArgs": [
            {
                "name": "cn",
                "wire": "cn"
            },
            {
                "name": "cn_eq",
                "wire": "cn__eq"
            },
            {
                "name": "covered_cn",
                "wire": "covered_cn"
            },
            {
                "name": "package",
                "wire": "package"
            },
            {
                "name": "page",
                "wire": "page"
            },
            {
                "name": "per_page",
                "wire": "per_page"
            },
            {
                "name": "sharing_id",
                "wire": "sharing_id"
            },
            {
                "name": "sort_by",
                "wire": "sort_by"
            },
            {
                "name": "status",
                "wire": "status"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "altnames": [
                    "x"
                ],
                "altnames_unicode": [
                    "x"
                ],
                "cn": "x",
                "cn_unicode": "x",
                "contact": {
                    "city": "x",
                    "country": "x",
                    "email": "x",
                    "family": "x",
                    "given": "x",
                    "orgname": "x",
                    "state": "x",
                    "streetaddr": "x",
                    "zip": "x"
                },
                "dates": {
                    "created_at": "2026-01-01T00:00:00Z",
                    "ends_at": "2026-01-01T00:00:00Z",
                    "started_at": "2026-01-01T00:00:00Z",
                    "subscription_ends_at": "2026-01-01T00:00:00Z",
                    "updated_at": "2026-01-01T00:00:00Z"
                },
                "id": "x",
                "package": {
                    "href": "x",
                    "max_domains": 1,
                    "name": "x",
                    "name_label": "x",
                    "type": "x",
                    "type_label": "x",
                    "wildcard": true
                },
                "provider": "x",
                "software": 1,
                "status": "pending",
                "assumed_name": "x",
                "business_category": "x",
                "card_pay_trustlogo": true,
                "cert": "x",
                "csr": "x",
                "dcv_method": "email",
                "error_msg": "x",
                "href": "x",
                "ida": {
                    "email": "x",
                    "fax": "x",
                    "tel": "x"
                },
                "intermediate": "x",
                "joi": {
                    "country": "x",
                    "locality": "x",
                    "state": "x"
                },
                "middleman": {
                    "city": "x",
                    "country": "x",
                    "email": "x",
                    "family": "x",
                    "given": "x",
                    "orgname": "x",
                    "state": "x",
                    "streetaddr": "x",
                    "zip": "x"
                },
                "owner": "x",
                "reissuable": true,
                "renewable": true,
                "sha_version": 1,
                "sharing_id": "x",
                "state": "x",
                "state_detail": "x",
                "step_nb": 0,
                "stored": true,
                "tags": [
                    "x"
                ],
                "trustlogo": true,
                "trustlogo_token": {}
            }
        ],
        "idField": "id"
    },
    {
        "entity": "issued_certificate",
        "accessor": "IssuedCertificate",
        "op": "load",
        "method": "GET",
        "path": "/certificate/issued-certs/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "altnames": [
                "x"
            ],
            "altnames_unicode": [
                "x"
            ],
            "cn": "x",
            "cn_unicode": "x",
            "contact": {
                "city": "x",
                "country": "x",
                "email": "x",
                "family": "x",
                "given": "x",
                "orgname": "x",
                "state": "x",
                "streetaddr": "x",
                "zip": "x"
            },
            "dates": {
                "created_at": "2026-01-01T00:00:00Z",
                "ends_at": "2026-01-01T00:00:00Z",
                "started_at": "2026-01-01T00:00:00Z",
                "subscription_ends_at": "2026-01-01T00:00:00Z",
                "updated_at": "2026-01-01T00:00:00Z"
            },
            "id": "x",
            "package": {
                "href": "x",
                "max_domains": 1,
                "name": "x",
                "name_label": "x",
                "type": "x",
                "type_label": "x",
                "wildcard": true
            },
            "provider": "x",
            "software": 1,
            "status": "pending",
            "assumed_name": "x",
            "business_category": "x",
            "card_pay_trustlogo": true,
            "cert": "x",
            "csr": "x",
            "dcv_method": "email",
            "error_msg": "x",
            "href": "x",
            "ida": {
                "email": "x",
                "fax": "x",
                "tel": "x"
            },
            "intermediate": "x",
            "joi": {
                "country": "x",
                "locality": "x",
                "state": "x"
            },
            "middleman": {
                "city": "x",
                "country": "x",
                "email": "x",
                "family": "x",
                "given": "x",
                "orgname": "x",
                "state": "x",
                "streetaddr": "x",
                "zip": "x"
            },
            "owner": "x",
            "reissuable": true,
            "renewable": true,
            "sha_version": 1,
            "sharing_id": "x",
            "state": "x",
            "state_detail": "x",
            "step_nb": 0,
            "stored": true,
            "tags": [
                "x"
            ],
            "trustlogo": true,
            "trustlogo_token": {}
        },
        "idField": "id"
    },
    {
        "entity": "issued_certificate",
        "accessor": "IssuedCertificate",
        "op": "load",
        "method": "GET",
        "path": "/certificate/issued-certs/{id}/crt",
        "action": "crt",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "text/plain"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "issued_certificate",
        "accessor": "IssuedCertificate",
        "op": "remove",
        "method": "DELETE",
        "path": "/certificate/issued-certs/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {
            "sharing_id": "v1"
        },
        "headers": [],
        "cookies": [],
        "query": [
            "sharing_id"
        ],
        "queryArgs": [
            {
                "name": "sharing_id",
                "wire": "sharing_id"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "issued_certificate",
        "accessor": "IssuedCertificate",
        "op": "update",
        "method": "PATCH",
        "path": "/certificate/issued-certs/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {
            "sharing_id": "v1"
        },
        "headers": [
            {
                "name": "dry_run",
                "wire": "Dry-Run",
                "value": "h1"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "sharing_id"
        ],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "status": "success",
            "errors": [
                {
                    "description": "x",
                    "location": "header",
                    "name": "x"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "linked_zone",
        "accessor": "LinkedZone",
        "op": "create",
        "method": "POST",
        "path": "/linkedzone/zones",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 201,
        "sample": {
            "message": "x"
        },
        "idField": "id"
    },
    {
        "entity": "linked_zone",
        "accessor": "LinkedZone",
        "op": "list",
        "method": "GET",
        "path": "/linkedzone/zones",
        "args": [],
        "select": {
            "page": 1,
            "per_page": "v1",
            "sharing_id": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "page",
            "per_page",
            "sharing_id"
        ],
        "queryArgs": [
            {
                "name": "page",
                "wire": "page"
            },
            {
                "name": "per_page",
                "wire": "per_page"
            },
            {
                "name": "sharing_id",
                "wire": "sharing_id"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "created_at": "2026-01-01T00:00:00Z",
                "default_records": true,
                "domain_count": 1,
                "id": "x",
                "name": "x",
                "sharing_space": {
                    "id": "x",
                    "name": "x"
                },
                "status": "BEING_DEACTIVATED",
                "domains": [
                    "x"
                ],
                "record_text": "x",
                "records": [
                    {
                        "name": "x",
                        "ttl": 1,
                        "type": "A",
                        "values": [
                            "x"
                        ]
                    }
                ],
                "updated_at": "2026-01-01T00:00:00Z"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "linked_zone",
        "accessor": "LinkedZone",
        "op": "load",
        "method": "GET",
        "path": "/linkedzone/zones/{zone_id}",
        "args": [
            {
                "name": "id",
                "wire": "zone_id",
                "value": "p1"
            }
        ],
        "select": {
            "sharing_id": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "sharing_id"
        ],
        "queryArgs": [
            {
                "name": "sharing_id",
                "wire": "sharing_id"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "created_at": "2026-01-01T00:00:00Z",
            "default_records": true,
            "domain_count": 1,
            "id": "x",
            "name": "x",
            "sharing_space": {
                "id": "x",
                "name": "x"
            },
            "status": "BEING_DEACTIVATED",
            "domains": [
                "x"
            ],
            "record_text": "x",
            "records": [
                {
                    "name": "x",
                    "ttl": 1,
                    "type": "A",
                    "values": [
                        "x"
                    ]
                }
            ],
            "updated_at": "2026-01-01T00:00:00Z"
        },
        "idField": "id"
    },
    {
        "entity": "linked_zone",
        "accessor": "LinkedZone",
        "op": "remove",
        "method": "DELETE",
        "path": "/linkedzone/zones/{zone_id}",
        "args": [
            {
                "name": "id",
                "wire": "zone_id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "linked_zone",
        "accessor": "LinkedZone",
        "op": "update",
        "method": "PATCH",
        "path": "/linkedzone/zones/{zone_id}",
        "args": [
            {
                "name": "id",
                "wire": "zone_id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "message": "x"
        },
        "idField": "id"
    },
    {
        "entity": "linked_zone_deployment",
        "accessor": "LinkedZoneDeployment",
        "op": "create",
        "method": "POST",
        "path": "/linkedzone/zones/{zone_id}",
        "args": [
            {
                "name": "zone_id",
                "wire": "zone_id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 202,
        "sample": {
            "message": "x"
        },
        "idField": "id"
    },
    {
        "entity": "linked_zone_domain",
        "accessor": "LinkedZoneDomain",
        "op": "list",
        "method": "GET",
        "path": "/linkedzone/domains",
        "args": [],
        "select": {
            "name": "v1",
            "page": 1,
            "per_page": "v1",
            "sharing_id": "v1",
            "zone_id": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "name",
            "page",
            "per_page",
            "sharing_id",
            "zone_id"
        ],
        "queryArgs": [
            {
                "name": "name",
                "wire": "name"
            },
            {
                "name": "page",
                "wire": "page"
            },
            {
                "name": "per_page",
                "wire": "per_page"
            },
            {
                "name": "sharing_id",
                "wire": "sharing_id"
            },
            {
                "name": "zone_id",
                "wire": "zone_id"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "deployed": true,
                "id": "x",
                "name": "x",
                "owner": "x",
                "zone": {
                    "id": "x",
                    "name": "x",
                    "status": "BEING_DEACTIVATED"
                }
            }
        ],
        "idField": "id"
    },
    {
        "entity": "linked_zone_domain",
        "accessor": "LinkedZoneDomain",
        "op": "load",
        "method": "GET",
        "path": "/linkedzone/domains/{domain}",
        "args": [
            {
                "name": "name",
                "wire": "domain",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "deployed": true,
            "id": "x",
            "name": "x",
            "owner": "x",
            "zone": {
                "id": "x",
                "name": "x",
                "status": "BEING_DEACTIVATED"
            }
        },
        "idField": "id"
    },
    {
        "entity": "linked_zone_domain",
        "accessor": "LinkedZoneDomain",
        "op": "update",
        "method": "PATCH",
        "path": "/linkedzone/zones/{zone_id}/link/domains",
        "action": "link",
        "args": [
            {
                "name": "zone_id",
                "wire": "zone_id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "errored": [
                {
                    "domain": "x",
                    "message": "x",
                    "type": "DATABASE_ERROR"
                }
            ],
            "succeeded": [
                "x"
            ]
        },
        "idField": "id"
    },
    {
        "entity": "linked_zone_domain",
        "accessor": "LinkedZoneDomain",
        "op": "update",
        "method": "PATCH",
        "path": "/linkedzone/unlink/domains",
        "action": "unlink",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "errored": [
                {
                    "domain": "x",
                    "message": "x",
                    "type": "DATABASE_ERROR"
                }
            ],
            "succeeded": [
                "x"
            ]
        },
        "idField": "id"
    },
    {
        "entity": "linked_zone_task",
        "accessor": "LinkedZoneTask",
        "op": "list",
        "method": "GET",
        "path": "/linkedzone/tasks",
        "args": [],
        "select": {
            "page": 1,
            "per_page": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "page",
            "per_page"
        ],
        "queryArgs": [
            {
                "name": "page",
                "wire": "page"
            },
            {
                "name": "per_page",
                "wire": "per_page"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "created_at": "2026-01-01T00:00:00Z",
                "id": "x",
                "result": {
                    "errored": [
                        {
                            "domain": "x",
                            "message": "x",
                            "type": "DATABASE_ERROR"
                        }
                    ],
                    "succeeded": [
                        "x"
                    ]
                },
                "status": "FINISHED",
                "type": "DEACTIVATE_ZONE",
                "zone_id": "x",
                "ending_at": "2026-01-01T00:00:00Z",
                "updated_at": "2026-01-01T00:00:00Z"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "linked_zone_task",
        "accessor": "LinkedZoneTask",
        "op": "load",
        "method": "GET",
        "path": "/linkedzone/tasks/{task_id}",
        "args": [
            {
                "name": "id",
                "wire": "task_id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "created_at": "2026-01-01T00:00:00Z",
            "id": "x",
            "result": {
                "errored": [
                    {
                        "domain": "x",
                        "message": "x",
                        "type": "DATABASE_ERROR"
                    }
                ],
                "succeeded": [
                    "x"
                ]
            },
            "status": "FINISHED",
            "type": "DEACTIVATE_ZONE",
            "zone_id": "x",
            "ending_at": "2026-01-01T00:00:00Z",
            "updated_at": "2026-01-01T00:00:00Z"
        },
        "idField": "id"
    },
    {
        "entity": "livedns_axfr_slave",
        "accessor": "LivednsAxfrSlave",
        "op": "list",
        "method": "GET",
        "path": "/livedns/domains/{fqdn}/axfr/slaves",
        "args": [
            {
                "name": "fqdn",
                "wire": "fqdn",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            "x"
        ],
        "idField": "id"
    },
    {
        "entity": "livedns_axfr_slave",
        "accessor": "LivednsAxfrSlave",
        "op": "remove",
        "method": "DELETE",
        "path": "/livedns/domains/{fqdn}/axfr/slaves/{ip}",
        "args": [
            {
                "name": "fqdn",
                "wire": "fqdn",
                "value": "p1"
            },
            {
                "name": "ip",
                "wire": "ip",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 202,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "livedns_axfr_slave",
        "accessor": "LivednsAxfrSlave",
        "op": "update",
        "method": "PUT",
        "path": "/livedns/domains/{fqdn}/axfr/slaves/{ip}",
        "args": [
            {
                "name": "fqdn",
                "wire": "fqdn",
                "value": "p1"
            },
            {
                "name": "ip",
                "wire": "ip",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 201,
        "sample": {
            "message": "x"
        },
        "idField": "id"
    },
    {
        "entity": "livedns_axfr_tsig",
        "accessor": "LivednsAxfrTsig",
        "op": "list",
        "method": "GET",
        "path": "/livedns/domains/{fqdn}/axfr/tsig",
        "args": [
            {
                "name": "fqdn",
                "wire": "fqdn",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "href": "x",
                "id": "x",
                "key_name": "x"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "livedns_axfr_tsig",
        "accessor": "LivednsAxfrTsig",
        "op": "remove",
        "method": "DELETE",
        "path": "/livedns/domains/{fqdn}/axfr/tsig/{id}",
        "args": [
            {
                "name": "fqdn",
                "wire": "fqdn",
                "value": "p1"
            },
            {
                "name": "id",
                "wire": "id",
                "value": "p2"
            }
        ],
        "select": {
            "sharing_id": "v1"
        },
        "headers": [],
        "cookies": [],
        "query": [
            "sharing_id"
        ],
        "queryArgs": [
            {
                "name": "sharing_id",
                "wire": "sharing_id"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 202,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "livedns_axfr_tsig",
        "accessor": "LivednsAxfrTsig",
        "op": "update",
        "method": "PUT",
        "path": "/livedns/domains/{fqdn}/axfr/tsig/{id}",
        "args": [
            {
                "name": "fqdn",
                "wire": "fqdn",
                "value": "p1"
            },
            {
                "name": "id",
                "wire": "id",
                "value": "p2"
            }
        ],
        "select": {
            "sharing_id": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "sharing_id"
        ],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 201,
        "sample": {
            "message": "x"
        },
        "idField": "id"
    },
    {
        "entity": "livedns_domain",
        "accessor": "LivednsDomain",
        "op": "create",
        "method": "POST",
        "path": "/livedns/domains",
        "args": [],
        "select": {
            "sharing_id": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "sharing_id"
        ],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 201,
        "sample": {
            "message": "x"
        },
        "idField": "id"
    },
    {
        "entity": "livedns_domain",
        "accessor": "LivednsDomain",
        "op": "list",
        "method": "GET",
        "path": "/livedns/domains",
        "args": [],
        "select": {
            "page": 1,
            "per_page": "v1",
            "sharing_id": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "page",
            "per_page",
            "sharing_id"
        ],
        "queryArgs": [
            {
                "name": "page",
                "wire": "page"
            },
            {
                "name": "per_page",
                "wire": "per_page"
            },
            {
                "name": "sharing_id",
                "wire": "sharing_id"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "domain_href": "x",
                "domain_records_href": "x",
                "fqdn": "x"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "livedns_domain",
        "accessor": "LivednsDomain",
        "op": "load",
        "method": "GET",
        "path": "/livedns/domains/{fqdn}",
        "args": [
            {
                "name": "fqdn",
                "wire": "fqdn",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "automatic_snapshots": true,
            "domain_href": "x",
            "domain_keys_href": "x",
            "domain_records_href": "x",
            "fqdn": "x"
        },
        "idField": "id"
    },
    {
        "entity": "livedns_domain",
        "accessor": "LivednsDomain",
        "op": "update",
        "method": "PATCH",
        "path": "/livedns/domains/{fqdn}",
        "args": [
            {
                "name": "fqdn",
                "wire": "fqdn",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "message": "x"
        },
        "idField": "id"
    },
    {
        "entity": "livedns_key",
        "accessor": "LivednsKey",
        "op": "create",
        "method": "POST",
        "path": "/livedns/domains/{fqdn}/keys",
        "args": [
            {
                "name": "fqdn",
                "wire": "fqdn",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 201,
        "sample": {
            "message": "x"
        },
        "idField": "id"
    },
    {
        "entity": "livedns_key",
        "accessor": "LivednsKey",
        "op": "list",
        "method": "GET",
        "path": "/livedns/domains/{fqdn}/keys",
        "args": [
            {
                "name": "fqdn",
                "wire": "fqdn",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "algorithm": 1,
                "algorithm_name": "x",
                "deleted": true,
                "ds": "x",
                "flags": 256,
                "fqdn": "x",
                "id": "x",
                "key_href": "x",
                "status": "x"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "livedns_key",
        "accessor": "LivednsKey",
        "op": "load",
        "method": "GET",
        "path": "/livedns/domains/{fqdn}/keys/{id}",
        "args": [
            {
                "name": "fqdn",
                "wire": "fqdn",
                "value": "p1"
            },
            {
                "name": "id",
                "wire": "id",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "algorithm": 1,
            "algorithm_name": "x",
            "deleted": true,
            "ds": "x",
            "fingerprint": "x",
            "flags": 256,
            "fqdn": "x",
            "id": "x",
            "key_href": "x",
            "public_key": "x",
            "status": "x",
            "tag": 1
        },
        "idField": "id"
    },
    {
        "entity": "livedns_key",
        "accessor": "LivednsKey",
        "op": "remove",
        "method": "DELETE",
        "path": "/livedns/domains/{fqdn}/keys/{id}",
        "args": [
            {
                "name": "fqdn",
                "wire": "fqdn",
                "value": "p1"
            },
            {
                "name": "id",
                "wire": "id",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "livedns_key",
        "accessor": "LivednsKey",
        "op": "update",
        "method": "PATCH",
        "path": "/livedns/domains/{fqdn}/keys/{id}",
        "args": [
            {
                "name": "fqdn",
                "wire": "fqdn",
                "value": "p1"
            },
            {
                "name": "id",
                "wire": "id",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "message": "x"
        },
        "idField": "id"
    },
    {
        "entity": "livedns_nameserver",
        "accessor": "LivednsNameserver",
        "op": "list",
        "method": "GET",
        "path": "/livedns/domains/{fqdn}/nameservers",
        "args": [
            {
                "name": "fqdn",
                "wire": "fqdn",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            "x"
        ],
        "idField": "id"
    },
    {
        "entity": "livedns_nameserver",
        "accessor": "LivednsNameserver",
        "op": "list",
        "method": "GET",
        "path": "/livedns/nameservers/{fqdn}",
        "action": "generic",
        "args": [
            {
                "name": "fqdn",
                "wire": "fqdn",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            "x"
        ],
        "idField": "id"
    },
    {
        "entity": "livedns_record",
        "accessor": "LivednsRecord",
        "op": "create",
        "method": "POST",
        "path": "/livedns/domains/{fqdn}/records/{rrset_name}/{rrset_type}",
        "args": [
            {
                "name": "fqdn",
                "wire": "fqdn",
                "value": "p1"
            },
            {
                "name": "rrset_name",
                "wire": "rrset_name",
                "value": "p2"
            },
            {
                "name": "rrset_type",
                "wire": "rrset_type",
                "value": "p3"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "message": "x"
        },
        "idField": "id"
    },
    {
        "entity": "livedns_record",
        "accessor": "LivednsRecord",
        "op": "create",
        "method": "POST",
        "path": "/livedns/domains/{fqdn}/verification/{rrset_name}/{rrset_type}",
        "action": "verification",
        "args": [
            {
                "name": "fqdn",
                "wire": "fqdn",
                "value": "p1"
            },
            {
                "name": "rrset_name",
                "wire": "rrset_name",
                "value": "p2"
            },
            {
                "name": "rrset_type",
                "wire": "rrset_type",
                "value": "p3"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "rrset_name": "x",
            "rrset_ttl": 1,
            "rrset_type": "x",
            "rrset_values": [
                "x"
            ]
        },
        "idField": "id"
    },
    {
        "entity": "livedns_record",
        "accessor": "LivednsRecord",
        "op": "create",
        "method": "POST",
        "path": "/livedns/domains/{fqdn}/records/{rrset_name}",
        "action": "name",
        "args": [
            {
                "name": "fqdn",
                "wire": "fqdn",
                "value": "p1"
            },
            {
                "name": "rrset_name",
                "wire": "rrset_name",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "message": "x"
        },
        "idField": "id"
    },
    {
        "entity": "livedns_record",
        "accessor": "LivednsRecord",
        "op": "create",
        "method": "POST",
        "path": "/livedns/domains/{fqdn}/records",
        "args": [
            {
                "name": "fqdn",
                "wire": "fqdn",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "message": "x"
        },
        "idField": "id"
    },
    {
        "entity": "livedns_record",
        "accessor": "LivednsRecord",
        "op": "list",
        "method": "GET",
        "path": "/livedns/domains/{fqdn}/records/{rrset_name}",
        "action": "name",
        "args": [
            {
                "name": "fqdn",
                "wire": "fqdn",
                "value": "p1"
            },
            {
                "name": "rrset_name",
                "wire": "rrset_name",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "rrset_href": "x",
                "rrset_name": "x",
                "rrset_type": "A",
                "rrset_values": [
                    "x"
                ],
                "rrset_ttl": 1
            }
        ],
        "idField": "id"
    },
    {
        "entity": "livedns_record",
        "accessor": "LivednsRecord",
        "op": "list",
        "method": "GET",
        "path": "/livedns/domains/{fqdn}/records",
        "args": [
            {
                "name": "fqdn",
                "wire": "fqdn",
                "value": "p1"
            }
        ],
        "select": {
            "page": 1,
            "per_page": "v1",
            "rrset_type": "v1",
            "sort_by": "rrset_name"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "page",
            "per_page",
            "rrset_type",
            "sort_by"
        ],
        "queryArgs": [
            {
                "name": "page",
                "wire": "page"
            },
            {
                "name": "per_page",
                "wire": "per_page"
            },
            {
                "name": "rrset_type",
                "wire": "rrset_type"
            },
            {
                "name": "sort_by",
                "wire": "sort_by"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "rrset_href": "x",
                "rrset_name": "x",
                "rrset_type": "A",
                "rrset_values": [
                    "x"
                ],
                "rrset_ttl": 1
            }
        ],
        "idField": "id"
    },
    {
        "entity": "livedns_record",
        "accessor": "LivednsRecord",
        "op": "load",
        "method": "GET",
        "path": "/livedns/domains/{fqdn}/records/{rrset_name}/{rrset_type}",
        "args": [
            {
                "name": "fqdn",
                "wire": "fqdn",
                "value": "p1"
            },
            {
                "name": "rrset_name",
                "wire": "rrset_name",
                "value": "p2"
            },
            {
                "name": "rrset_type",
                "wire": "rrset_type",
                "value": "p3"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "rrset_href": "x",
            "rrset_name": "x",
            "rrset_type": "A",
            "rrset_values": [
                "x"
            ],
            "rrset_ttl": 1
        },
        "idField": "id"
    },
    {
        "entity": "livedns_record",
        "accessor": "LivednsRecord",
        "op": "patch",
        "method": "PATCH",
        "path": "/livedns/domains/{fqdn}/records/{rrset_name}/{rrset_type}",
        "args": [
            {
                "name": "fqdn",
                "wire": "fqdn",
                "value": "p1"
            },
            {
                "name": "rrset_name",
                "wire": "rrset_name",
                "value": "p2"
            },
            {
                "name": "rrset_type",
                "wire": "rrset_type",
                "value": "p3"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "rrset_href": "x",
            "rrset_name": "x",
            "rrset_type": "A",
            "rrset_values": [
                "x"
            ],
            "rrset_ttl": 1
        },
        "idField": "id"
    },
    {
        "entity": "livedns_record",
        "accessor": "LivednsRecord",
        "op": "remove",
        "method": "DELETE",
        "path": "/livedns/domains/{fqdn}/records/{rrset_name}/{rrset_type}",
        "args": [
            {
                "name": "fqdn",
                "wire": "fqdn",
                "value": "p1"
            },
            {
                "name": "rrset_name",
                "wire": "rrset_name",
                "value": "p2"
            },
            {
                "name": "rrset_type",
                "wire": "rrset_type",
                "value": "p3"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "livedns_record",
        "accessor": "LivednsRecord",
        "op": "remove",
        "method": "DELETE",
        "path": "/livedns/domains/{fqdn}/records/{rrset_name}",
        "action": "name",
        "args": [
            {
                "name": "fqdn",
                "wire": "fqdn",
                "value": "p1"
            },
            {
                "name": "rrset_name",
                "wire": "rrset_name",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "livedns_record",
        "accessor": "LivednsRecord",
        "op": "update",
        "method": "PUT",
        "path": "/livedns/domains/{fqdn}/records/{rrset_name}/{rrset_type}",
        "args": [
            {
                "name": "fqdn",
                "wire": "fqdn",
                "value": "p1"
            },
            {
                "name": "rrset_name",
                "wire": "rrset_name",
                "value": "p2"
            },
            {
                "name": "rrset_type",
                "wire": "rrset_type",
                "value": "p3"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 201,
        "sample": {
            "message": "x"
        },
        "idField": "id"
    },
    {
        "entity": "livedns_record",
        "accessor": "LivednsRecord",
        "op": "update",
        "method": "PUT",
        "path": "/livedns/domains/{fqdn}/records/{rrset_name}",
        "action": "name",
        "args": [
            {
                "name": "fqdn",
                "wire": "fqdn",
                "value": "p1"
            },
            {
                "name": "rrset_name",
                "wire": "rrset_name",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 201,
        "sample": {
            "message": "x"
        },
        "idField": "id"
    },
    {
        "entity": "livedns_rrtype",
        "accessor": "LivednsRrtype",
        "op": "list",
        "method": "GET",
        "path": "/livedns/dns/rrtypes",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            "x"
        ],
        "idField": "id"
    },
    {
        "entity": "livedns_snapshot",
        "accessor": "LivednsSnapshot",
        "op": "create",
        "method": "POST",
        "path": "/livedns/domains/{fqdn}/snapshots",
        "args": [
            {
                "name": "fqdn",
                "wire": "fqdn",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 201,
        "sample": {
            "id": "x",
            "message": "x"
        },
        "idField": "id"
    },
    {
        "entity": "livedns_snapshot",
        "accessor": "LivednsSnapshot",
        "op": "list",
        "method": "GET",
        "path": "/livedns/domains/{fqdn}/snapshots",
        "args": [
            {
                "name": "fqdn",
                "wire": "fqdn",
                "value": "p1"
            }
        ],
        "select": {
            "automatic": "v1",
            "page": 1,
            "per_page": "v1",
            "sort_by": "date_created"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "automatic",
            "page",
            "per_page",
            "sort_by"
        ],
        "queryArgs": [
            {
                "name": "automatic",
                "wire": "automatic"
            },
            {
                "name": "page",
                "wire": "page"
            },
            {
                "name": "per_page",
                "wire": "per_page"
            },
            {
                "name": "sort_by",
                "wire": "sort_by"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "automatic": true,
                "created_at": "x",
                "href": "x",
                "id": "x",
                "name": "x"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "livedns_snapshot",
        "accessor": "LivednsSnapshot",
        "op": "load",
        "method": "GET",
        "path": "/livedns/domains/{fqdn}/snapshots/{id}",
        "args": [
            {
                "name": "fqdn",
                "wire": "fqdn",
                "value": "p1"
            },
            {
                "name": "id",
                "wire": "id",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "automatic": true,
            "created_at": "x",
            "href": "x",
            "id": "x",
            "name": "x",
            "zone_data": [
                {
                    "rrset_name": "x",
                    "rrset_type": "A",
                    "rrset_values": [
                        "x"
                    ],
                    "rrset_ttl": 1
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "livedns_snapshot",
        "accessor": "LivednsSnapshot",
        "op": "remove",
        "method": "DELETE",
        "path": "/livedns/domains/{fqdn}/snapshots/{id}",
        "args": [
            {
                "name": "fqdn",
                "wire": "fqdn",
                "value": "p1"
            },
            {
                "name": "id",
                "wire": "id",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "livedns_snapshot",
        "accessor": "LivednsSnapshot",
        "op": "update",
        "method": "PATCH",
        "path": "/livedns/domains/{fqdn}/snapshots/{id}",
        "args": [
            {
                "name": "fqdn",
                "wire": "fqdn",
                "value": "p1"
            },
            {
                "name": "id",
                "wire": "id",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 202,
        "sample": {
            "message": "x"
        },
        "idField": "id"
    },
    {
        "entity": "livedns_tsig_key",
        "accessor": "LivednsTsigKey",
        "op": "create",
        "method": "POST",
        "path": "/livedns/axfr/tsig",
        "args": [],
        "select": {
            "sharing_id": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "sharing_id"
        ],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 201,
        "sample": {
            "href": "x",
            "id": "x",
            "key_name": "x"
        },
        "idField": "id"
    },
    {
        "entity": "livedns_tsig_key",
        "accessor": "LivednsTsigKey",
        "op": "list",
        "method": "GET",
        "path": "/livedns/axfr/tsig",
        "args": [],
        "select": {
            "sharing_id": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "sharing_id"
        ],
        "queryArgs": [
            {
                "name": "sharing_id",
                "wire": "sharing_id"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "href": "x",
                "id": "x",
                "key_name": "x",
                "secret": "x"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "livedns_tsig_key",
        "accessor": "LivednsTsigKey",
        "op": "load",
        "method": "GET",
        "path": "/livedns/axfr/tsig/{id}/config/{software}",
        "action": "config",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            },
            {
                "name": "software",
                "wire": "software",
                "value": "p2"
            }
        ],
        "select": {
            "sharing_id": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "sharing_id"
        ],
        "queryArgs": [
            {
                "name": "sharing_id",
                "wire": "sharing_id"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": "x",
        "idField": "id"
    },
    {
        "entity": "livedns_tsig_key",
        "accessor": "LivednsTsigKey",
        "op": "load",
        "method": "GET",
        "path": "/livedns/axfr/tsig/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {
            "sharing_id": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "sharing_id"
        ],
        "queryArgs": [
            {
                "name": "sharing_id",
                "wire": "sharing_id"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "config_samples": {
                "bind": "x",
                "knot": "x",
                "nsd": "x",
                "powerdns": "x"
            },
            "href": "x",
            "id": "x",
            "key_name": "x",
            "secret": "x"
        },
        "idField": "id"
    },
    {
        "entity": "livedns_zone",
        "accessor": "LivednsZone",
        "op": "remove",
        "method": "DELETE",
        "path": "/livedns/domains/{fqdn}/records",
        "args": [
            {
                "name": "fqdn",
                "wire": "fqdn",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "livedns_zone",
        "accessor": "LivednsZone",
        "op": "update",
        "method": "PUT",
        "path": "/livedns/domains/{fqdn}/records",
        "args": [
            {
                "name": "fqdn",
                "wire": "fqdn",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 201,
        "sample": {
            "message": "x"
        },
        "idField": "id"
    },
    {
        "entity": "mailbox",
        "accessor": "Mailbox",
        "op": "create",
        "method": "POST",
        "path": "/mailbox/mailboxes/{email}/renew",
        "action": "renew",
        "args": [
            {
                "name": "address",
                "wire": "email",
                "value": "p1"
            }
        ],
        "select": {
            "sharing_id": "v1"
        },
        "headers": [
            {
                "name": "dry_run",
                "wire": "Dry-Run",
                "value": "h1"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "sharing_id"
        ],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "status": "success",
            "errors": [
                {
                    "description": "x",
                    "location": "header",
                    "name": "x"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "mailbox",
        "accessor": "Mailbox",
        "op": "create",
        "method": "POST",
        "path": "/mailbox/mailboxes",
        "args": [],
        "select": {
            "sharing_id": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "sharing_id"
        ],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 202,
        "sample": {
            "message": "x"
        },
        "idField": "id"
    },
    {
        "entity": "mailbox",
        "accessor": "Mailbox",
        "op": "list",
        "method": "GET",
        "path": "/mailbox/mailboxes",
        "args": [],
        "select": {
            "address": "v1",
            "domain_part": "v1",
            "local_part": "v1",
            "page": 1,
            "per_page": "v1",
            "search": "v1",
            "sharing_id": "v1",
            "sort_by": "id"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "address",
            "domain_part",
            "local_part",
            "page",
            "per_page",
            "search",
            "sharing_id",
            "sort_by"
        ],
        "queryArgs": [
            {
                "name": "address",
                "wire": "address"
            },
            {
                "name": "domain_part",
                "wire": "domain_part"
            },
            {
                "name": "local_part",
                "wire": "local_part"
            },
            {
                "name": "page",
                "wire": "page"
            },
            {
                "name": "per_page",
                "wire": "per_page"
            },
            {
                "name": "search",
                "wire": "search"
            },
            {
                "name": "sharing_id",
                "wire": "sharing_id"
            },
            {
                "name": "sort_by",
                "wire": "sort_by"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "address": "x",
                "antispam": true,
                "config": {
                    "label": "x",
                    "name": "x",
                    "quota_kb": 1,
                    "uuid": "x"
                },
                "created_at": "2026-01-01T00:00:00Z",
                "data_access": true,
                "domain_part": "x",
                "expires_at": "2026-01-01T00:00:00Z",
                "internal_domain": true,
                "last_paid_duration": 1,
                "local_part": "x",
                "owner": {
                    "id": "x",
                    "name": "x"
                },
                "quota": 1,
                "quota_used": 1,
                "updated_at": "2026-01-01T00:00:00Z",
                "uuid": "x",
                "autorenew": {
                    "duration": 1,
                    "duration_type": "m",
                    "sharing_id": "x"
                },
                "issues": [
                    "x"
                ],
                "responder": {
                    "ends_at": "2026-01-01T00:00:00Z",
                    "message": "x",
                    "starts_at": "2026-01-01T00:00:00Z"
                }
            }
        ],
        "idField": "id"
    },
    {
        "entity": "mailbox",
        "accessor": "Mailbox",
        "op": "load",
        "method": "GET",
        "path": "/mailbox/mailboxes/{email}",
        "args": [
            {
                "name": "address",
                "wire": "email",
                "value": "p1"
            }
        ],
        "select": {
            "sharing_id": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "sharing_id"
        ],
        "queryArgs": [
            {
                "name": "sharing_id",
                "wire": "sharing_id"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "address": "x",
            "antispam": true,
            "config": {
                "label": "x",
                "name": "x",
                "quota_kb": 1,
                "uuid": "x"
            },
            "created_at": "2026-01-01T00:00:00Z",
            "data_access": true,
            "domain_part": "x",
            "expires_at": "2026-01-01T00:00:00Z",
            "internal_domain": true,
            "last_paid_duration": 1,
            "local_part": "x",
            "owner": {
                "id": "x",
                "name": "x"
            },
            "quota": 1,
            "quota_used": 1,
            "updated_at": "2026-01-01T00:00:00Z",
            "uuid": "x",
            "aliases": [
                "x"
            ],
            "autorenew": {
                "duration": 1,
                "duration_type": "m",
                "sharing_id": "x"
            },
            "issues": [],
            "responder": {
                "ends_at": "2026-01-01T00:00:00Z",
                "message": "x",
                "starts_at": "2026-01-01T00:00:00Z"
            }
        },
        "idField": "id"
    },
    {
        "entity": "mailbox",
        "accessor": "Mailbox",
        "op": "remove",
        "method": "DELETE",
        "path": "/mailbox/mailboxes/{email}",
        "args": [
            {
                "name": "address",
                "wire": "email",
                "value": "p1"
            }
        ],
        "select": {
            "sharing_id": "v1"
        },
        "headers": [],
        "cookies": [],
        "query": [
            "sharing_id"
        ],
        "queryArgs": [
            {
                "name": "sharing_id",
                "wire": "sharing_id"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "mailbox",
        "accessor": "Mailbox",
        "op": "update",
        "method": "PATCH",
        "path": "/mailbox/mailboxes/{email}",
        "args": [
            {
                "name": "address",
                "wire": "email",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "mailbox_domain",
        "accessor": "MailboxDomain",
        "op": "create",
        "method": "POST",
        "path": "/mailbox/domains/{domain}/validate",
        "action": "validate",
        "args": [
            {
                "name": "domain",
                "wire": "domain",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 202,
        "sample": {
            "message": "x"
        },
        "idField": "id"
    },
    {
        "entity": "mailbox_domain",
        "accessor": "MailboxDomain",
        "op": "list",
        "method": "GET",
        "path": "/mailbox/domains",
        "args": [],
        "select": {
            "page": 1,
            "per_page": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "page",
            "per_page"
        ],
        "queryArgs": [
            {
                "name": "page",
                "wire": "page"
            },
            {
                "name": "per_page",
                "wire": "per_page"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "fqdns": [],
                "owner": {
                    "id": "x",
                    "name": "x"
                }
            }
        ],
        "idField": "id"
    },
    {
        "entity": "mailbox_domain",
        "accessor": "MailboxDomain",
        "op": "load",
        "method": "GET",
        "path": "/mailbox/domains/{domain}",
        "args": [
            {
                "name": "domain",
                "wire": "domain",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "antispam": true,
            "configuration": [
                {
                    "key": "x",
                    "values": [
                        "x"
                    ]
                }
            ],
            "dkim": true,
            "internal": true,
            "is_livedns": true,
            "mx": true,
            "spf": true,
            "txt": true,
            "date_last_validation": "2026-01-01T00:00:00Z"
        },
        "idField": "id"
    },
    {
        "entity": "mailbox_forward",
        "accessor": "MailboxForward",
        "op": "create",
        "method": "POST",
        "path": "/mailbox/forwards",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 201,
        "sample": {
            "message": "x"
        },
        "idField": "id"
    },
    {
        "entity": "mailbox_forward",
        "accessor": "MailboxForward",
        "op": "list",
        "method": "GET",
        "path": "/mailbox/forwards",
        "args": [],
        "select": {
            "page": 1,
            "per_page": "v1",
            "search": "v1",
            "sharing_id": "v1",
            "sort_by": "source"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "page",
            "per_page",
            "search",
            "sharing_id",
            "sort_by"
        ],
        "queryArgs": [
            {
                "name": "page",
                "wire": "page"
            },
            {
                "name": "per_page",
                "wire": "per_page"
            },
            {
                "name": "search",
                "wire": "search"
            },
            {
                "name": "sharing_id",
                "wire": "sharing_id"
            },
            {
                "name": "sort_by",
                "wire": "sort_by"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "destinations": "x",
                "source": "x"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "mailbox_forward",
        "accessor": "MailboxForward",
        "op": "remove",
        "method": "DELETE",
        "path": "/mailbox/forwards/{source}",
        "args": [
            {
                "name": "source",
                "wire": "source",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "message": "x"
        },
        "idField": "id"
    },
    {
        "entity": "mailbox_forward",
        "accessor": "MailboxForward",
        "op": "update",
        "method": "PUT",
        "path": "/mailbox/forwards/{source}",
        "args": [
            {
                "name": "source",
                "wire": "source",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 201,
        "sample": {
            "message": "x"
        },
        "idField": "id"
    },
    {
        "entity": "mailbox_product",
        "accessor": "MailboxProduct",
        "op": "create",
        "method": "POST",
        "path": "/mailbox/products",
        "args": [],
        "select": {
            "sharing_id": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "sharing_id"
        ],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 202,
        "sample": {
            "message": "x"
        },
        "idField": "id"
    },
    {
        "entity": "mailbox_product",
        "accessor": "MailboxProduct",
        "op": "list",
        "method": "GET",
        "path": "/mailbox/products",
        "args": [],
        "select": {
            "sharing_id": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "sharing_id"
        ],
        "queryArgs": [
            {
                "name": "sharing_id",
                "wire": "sharing_id"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "config": [
                    {
                        "label": "x",
                        "name": "x",
                        "uuid": "x"
                    }
                ],
                "config_name": "x",
                "description": "x",
                "label": "x",
                "prices": [
                    {
                        "currency": "x",
                        "duration_unit": "x",
                        "max_duration": 1,
                        "min_duration": 1,
                        "normal_price_after_taxes": 1,
                        "normal_price_before_taxes": 1,
                        "price_after_taxes": 1,
                        "price_before_taxes": 1
                    }
                ],
                "taxes": [
                    {
                        "name": "x",
                        "name_label": "x",
                        "rate": 1,
                        "type": "x"
                    }
                ],
                "uuid": "x"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "mailbox_quota",
        "accessor": "MailboxQuota",
        "op": "list",
        "method": "GET",
        "path": "/mailbox/quotas",
        "args": [],
        "select": {
            "sharing_id": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "sharing_id"
        ],
        "queryArgs": [
            {
                "name": "sharing_id",
                "wire": "sharing_id"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "annually": {
                    "available": 1,
                    "total": 1,
                    "used": 1
                },
                "config_name": "x",
                "label": "x",
                "monthly": {
                    "available": 1,
                    "total": 1,
                    "used": 1
                },
                "quota": "x"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "mailbox_slot",
        "accessor": "MailboxSlot",
        "op": "list",
        "method": "GET",
        "path": "/mailbox/slots",
        "args": [],
        "select": {
            "config_name": "v1",
            "expires_at_gte": "v1",
            "expires_at_lte": "v1",
            "last_paid_duration": "v1",
            "page": 1,
            "per_page": "v1",
            "refundable": "v1",
            "sharing_id": "v1",
            "sort_by": "refund_expires_at",
            "webhosting_pack": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "config_name",
            "expires_at_gte",
            "expires_at_lte",
            "last_paid_duration",
            "page",
            "per_page",
            "refundable",
            "sharing_id",
            "sort_by",
            "webhosting_pack"
        ],
        "queryArgs": [
            {
                "name": "config_name",
                "wire": "config_name"
            },
            {
                "name": "expires_at_gte",
                "wire": "expires_at_gte"
            },
            {
                "name": "expires_at_lte",
                "wire": "expires_at_lte"
            },
            {
                "name": "last_paid_duration",
                "wire": "last_paid_duration"
            },
            {
                "name": "page",
                "wire": "page"
            },
            {
                "name": "per_page",
                "wire": "per_page"
            },
            {
                "name": "refundable",
                "wire": "refundable"
            },
            {
                "name": "sharing_id",
                "wire": "sharing_id"
            },
            {
                "name": "sort_by",
                "wire": "sort_by"
            },
            {
                "name": "webhosting_pack",
                "wire": "webhosting_pack"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "config": {
                    "label": "x",
                    "name": "x",
                    "uuid": "x"
                },
                "refund_info": {
                    "currency": "x",
                    "price": 1,
                    "refund_expires_at": "2026-01-01T00:00:00Z"
                },
                "refundable": true,
                "uuid": "x",
                "webhosting_pack": true,
                "autorenew": {
                    "duration_month": 1,
                    "sharing_id": "x"
                },
                "expires_at": "2026-01-01T00:00:00Z",
                "last_paid_duration": 1
            }
        ],
        "idField": "id"
    },
    {
        "entity": "mailbox_slot",
        "accessor": "MailboxSlot",
        "op": "load",
        "method": "GET",
        "path": "/mailbox/slots/{slot_id}",
        "args": [
            {
                "name": "uuid",
                "wire": "slot_id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "config": {
                "label": "x",
                "name": "x",
                "uuid": "x"
            },
            "refund_info": {
                "currency": "x",
                "price": 1,
                "refund_expires_at": "2026-01-01T00:00:00Z"
            },
            "refundable": true,
            "uuid": "x",
            "webhosting_pack": true,
            "autorenew": {
                "duration_month": 1,
                "sharing_id": "x"
            },
            "expires_at": "2026-01-01T00:00:00Z",
            "last_paid_duration": 1
        },
        "idField": "id"
    },
    {
        "entity": "organization",
        "accessor": "Organization",
        "op": "create",
        "method": "POST",
        "path": "/organization/organizations/{org_id}/action",
        "action": "action",
        "args": [
            {
                "name": "id",
                "wire": "org_id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 201,
        "sample": {
            "message": "x"
        },
        "idField": "id"
    },
    {
        "entity": "organization",
        "accessor": "Organization",
        "op": "create",
        "method": "POST",
        "path": "/organization/organizations",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 201,
        "sample": {
            "id": "x",
            "message": "x"
        },
        "idField": "id"
    },
    {
        "entity": "organization",
        "accessor": "Organization",
        "op": "list",
        "method": "GET",
        "path": "/organization/organizations",
        "args": [],
        "select": {
            "name": "v1",
            "permission": "v1",
            "sort_by": "name",
            "type": "v1",
            "~name": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "~name",
            "name",
            "permission",
            "sort_by",
            "type"
        ],
        "queryArgs": [
            {
                "name": "name",
                "wire": "name"
            },
            {
                "name": "permission",
                "wire": "permission"
            },
            {
                "name": "sort_by",
                "wire": "sort_by"
            },
            {
                "name": "type",
                "wire": "type"
            },
            {
                "name": "~name",
                "wire": "~name"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "id": "x",
                "name": "x",
                "corporate": true,
                "email": "x",
                "firstname": "x",
                "lastname": "x",
                "orgname": "x",
                "reseller": true,
                "siren": "x",
                "type": "x",
                "vat_number": "x"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "organization",
        "accessor": "Organization",
        "op": "load",
        "method": "GET",
        "path": "/organization/organizations/{org_id}",
        "args": [
            {
                "name": "id",
                "wire": "org_id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "city": "x",
            "corporate": true,
            "country": "x",
            "email": "x",
            "firstname": "x",
            "id": "x",
            "lastname": "x",
            "name": "x",
            "reseller": true,
            "streetaddr": "x",
            "type": "individual",
            "zip": "x",
            "fax": "x",
            "lang": "x",
            "orgname": "x",
            "phone": "x",
            "reference": "x",
            "state": "x",
            "streetaddr2": "x",
            "vat_number": "x"
        },
        "idField": "id"
    },
    {
        "entity": "organization",
        "accessor": "Organization",
        "op": "remove",
        "method": "DELETE",
        "path": "/organization/organizations/{org_id}",
        "args": [
            {
                "name": "id",
                "wire": "org_id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "organization",
        "accessor": "Organization",
        "op": "update",
        "method": "PATCH",
        "path": "/organization/organizations/{org_id}",
        "args": [
            {
                "name": "id",
                "wire": "org_id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 202,
        "sample": {
            "message": "x"
        },
        "idField": "id"
    },
    {
        "entity": "organization_customer",
        "accessor": "OrganizationCustomer",
        "op": "create",
        "method": "POST",
        "path": "/organization/organizations/{org_id}/customers",
        "args": [
            {
                "name": "org_id",
                "wire": "org_id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 201,
        "sample": {
            "id": "x",
            "message": "x"
        },
        "idField": "id"
    },
    {
        "entity": "organization_customer",
        "accessor": "OrganizationCustomer",
        "op": "list",
        "method": "GET",
        "path": "/organization/organizations/{org_id}/customers",
        "args": [
            {
                "name": "org_id",
                "wire": "org_id",
                "value": "p1"
            }
        ],
        "select": {
            "name": "v1",
            "page": 1,
            "per_page": "v1",
            "permission": "v1",
            "sort_by": "name"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "name",
            "page",
            "per_page",
            "permission",
            "sort_by"
        ],
        "queryArgs": [
            {
                "name": "name",
                "wire": "name"
            },
            {
                "name": "page",
                "wire": "page"
            },
            {
                "name": "per_page",
                "wire": "per_page"
            },
            {
                "name": "permission",
                "wire": "permission"
            },
            {
                "name": "sort_by",
                "wire": "sort_by"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "email": "x",
                "firstname": "x",
                "id": "x",
                "lastname": "x",
                "name": "x",
                "type": "individual",
                "orgname": "x"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "organization_customer",
        "accessor": "OrganizationCustomer",
        "op": "load",
        "method": "GET",
        "path": "/organization/organizations/{org_id}/customers/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            },
            {
                "name": "org_id",
                "wire": "org_id",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "city": "x",
            "country": "x",
            "email": "x",
            "firstname": "x",
            "id": "x",
            "lastname": "x",
            "name": "x",
            "streetaddr": "x",
            "type": "individual",
            "fax": "x",
            "orgname": "x",
            "phone": "x",
            "reference": "x",
            "state": "x",
            "streetaddr2": "x",
            "zip": "x"
        },
        "idField": "id"
    },
    {
        "entity": "organization_customer",
        "accessor": "OrganizationCustomer",
        "op": "remove",
        "method": "DELETE",
        "path": "/organization/organizations/{org_id}/customers/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            },
            {
                "name": "org_id",
                "wire": "org_id",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "organization_customer",
        "accessor": "OrganizationCustomer",
        "op": "update",
        "method": "PATCH",
        "path": "/organization/organizations/{org_id}/customers/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            },
            {
                "name": "org_id",
                "wire": "org_id",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 202,
        "sample": {
            "message": "x"
        },
        "idField": "id"
    },
    {
        "entity": "template",
        "accessor": "Template",
        "op": "create",
        "method": "POST",
        "path": "/template/templates",
        "args": [],
        "select": {
            "sharing_id": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "sharing_id"
        ],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 201,
        "sample": {
            "message": "x"
        },
        "idField": "id"
    },
    {
        "entity": "template",
        "accessor": "Template",
        "op": "list",
        "method": "GET",
        "path": "/template/templates",
        "args": [],
        "select": {
            "page": 1,
            "per_page": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "page",
            "per_page"
        ],
        "queryArgs": [
            {
                "name": "page",
                "wire": "page"
            },
            {
                "name": "per_page",
                "wire": "per_page"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "description": "x",
                "editable": true,
                "href": "x",
                "id": "x",
                "name": "x",
                "namespaces": [
                    "x"
                ],
                "orgname": "x",
                "sharing_space": {
                    "id": "x",
                    "name": "x",
                    "reseller": true,
                    "sharing_space": {
                        "id": "x",
                        "name": "x"
                    },
                    "type": "x"
                }
            }
        ],
        "idField": "id"
    },
    {
        "entity": "template",
        "accessor": "Template",
        "op": "load",
        "method": "GET",
        "path": "/template/templates/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "description": "x",
            "editable": true,
            "href": "x",
            "id": "x",
            "name": "x",
            "namespaces": [
                "x"
            ],
            "orgname": "x",
            "payload": {
                "dns:records": {
                    "default": true,
                    "records": [
                        {
                            "name": "x",
                            "type": "A",
                            "values": [
                                "x"
                            ],
                            "ttl": 1
                        }
                    ]
                },
                "domain:mailboxes": {
                    "values": [
                        {
                            "login": "x"
                        }
                    ]
                },
                "domain:nameservers": {
                    "addresses": [
                        "x"
                    ],
                    "service": "custom"
                },
                "domain:webredirs": {
                    "values": [
                        {
                            "type": "cloak",
                            "url": "x",
                            "host": "x",
                            "override": true,
                            "protocol": "http"
                        }
                    ]
                }
            },
            "variables": [
                "x"
            ],
            "sharing_space": {
                "id": "x",
                "name": "x",
                "reseller": true,
                "sharing_space": {
                    "id": "x",
                    "name": "x"
                },
                "type": "x"
            }
        },
        "idField": "id"
    },
    {
        "entity": "template",
        "accessor": "Template",
        "op": "remove",
        "method": "DELETE",
        "path": "/template/templates/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "template",
        "accessor": "Template",
        "op": "update",
        "method": "PATCH",
        "path": "/template/templates/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "template_dispatch",
        "accessor": "TemplateDispatch",
        "op": "create",
        "method": "POST",
        "path": "/template/templates/{id}",
        "args": [
            {
                "name": "template_id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 202,
        "sample": {
            "dispatch_href": "x",
            "message": "x",
            "payload": {
                "dns:records": {
                    "default": true,
                    "records": [
                        {
                            "name": "x",
                            "type": "A",
                            "values": [
                                "x"
                            ],
                            "ttl": 1
                        }
                    ]
                },
                "domain:mailboxes": {
                    "values": [
                        {
                            "login": "x"
                        }
                    ]
                },
                "domain:nameservers": {
                    "addresses": [
                        "x"
                    ],
                    "service": "custom"
                },
                "domain:webredirs": {
                    "values": [
                        {
                            "type": "cloak",
                            "url": "x",
                            "host": "x",
                            "override": true,
                            "protocol": "http"
                        }
                    ]
                }
            },
            "target_id": "x",
            "target_type": "domain"
        },
        "idField": "id"
    },
    {
        "entity": "template_dispatch",
        "accessor": "TemplateDispatch",
        "op": "load",
        "method": "GET",
        "path": "/template/dispatch/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "attempt": 1,
            "created_at": "x",
            "id": "x",
            "payload": {
                "dns:records": {
                    "default": true,
                    "records": [
                        {
                            "name": "x",
                            "type": "A",
                            "values": [
                                "x"
                            ],
                            "ttl": 1
                        }
                    ]
                },
                "domain:mailboxes": {
                    "values": [
                        {
                            "login": "x"
                        }
                    ]
                },
                "domain:nameservers": {
                    "addresses": [
                        "x"
                    ],
                    "service": "custom"
                },
                "domain:webredirs": {
                    "values": [
                        {
                            "type": "cloak",
                            "url": "x",
                            "host": "x",
                            "override": true,
                            "protocol": "http"
                        }
                    ]
                }
            },
            "sharing_id": "x",
            "state": 0,
            "target": {
                "name": "x",
                "type": "x"
            },
            "target_id": "x",
            "task_history": [
                {
                    "date": "x",
                    "message": "x",
                    "namespace": "x",
                    "status": 0
                }
            ],
            "task_status": {},
            "state_msg": "x",
            "task_updated_at": "x",
            "template_id": "x",
            "template_name": "x"
        },
        "idField": "id"
    },
    {
        "entity": "tld",
        "accessor": "Tld",
        "op": "list",
        "method": "GET",
        "path": "/domain/tlds",
        "args": [],
        "select": {
            "category": "v1",
            "page": 1,
            "per_page": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "category",
            "page",
            "per_page"
        ],
        "queryArgs": [
            {
                "name": "category",
                "wire": "category"
            },
            {
                "name": "page",
                "wire": "page"
            },
            {
                "name": "per_page",
                "wire": "per_page"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "href": "x",
                "name": "x"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "tld",
        "accessor": "Tld",
        "op": "load",
        "method": "GET",
        "path": "/domain/tlds/{name}",
        "args": [
            {
                "name": "name",
                "wire": "name",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "authinfo_for_transfer": true,
            "category": "ccTLD",
            "change_owner": true,
            "corporate": true,
            "ext_trade": true,
            "full_tld": "x",
            "href": "x",
            "lock": true,
            "name": "x"
        },
        "idField": "id"
    },
    {
        "entity": "user",
        "accessor": "User",
        "op": "load",
        "method": "GET",
        "path": "/organization/user-info",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "city": "x",
            "email": "x",
            "id": "x",
            "lang": "x",
            "name": "x",
            "username": "x",
            "country": "x",
            "fax": "x",
            "firstname": "x",
            "lastname": "x",
            "phone": "x",
            "state": "x",
            "streetaddr": "x",
            "streetaddr2": "x",
            "zip": "x"
        },
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map