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
        "entity": "acme",
        "accessor": "Acme",
        "op": "create",
        "method": "POST",
        "path": "/acme/quote",
        "action": "quote",
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
        "entity": "acme",
        "accessor": "Acme",
        "op": "create",
        "method": "POST",
        "path": "/acme/subscriptions",
        "action": "subscription",
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
        "entity": "acme",
        "accessor": "Acme",
        "op": "list",
        "method": "GET",
        "path": "/acme/catalog",
        "action": "catalog",
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
        "entity": "acme",
        "accessor": "Acme",
        "op": "list",
        "method": "GET",
        "path": "/acme/subscriptions",
        "action": "subscription",
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
        "entity": "acme",
        "accessor": "Acme",
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
        "entity": "acme",
        "accessor": "Acme",
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
        "entity": "acme",
        "accessor": "Acme",
        "op": "load",
        "method": "GET",
        "path": "/acme/subscriptions/{subscription_id}/accounts/{account_id}",
        "args": [
            {
                "name": "account_id",
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
        "entity": "acme",
        "accessor": "Acme",
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
        "entity": "acme",
        "accessor": "Acme",
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
        "entity": "acme",
        "accessor": "Acme",
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
        "entity": "billing",
        "accessor": "Billing",
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
            "prices_at": "v1"
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
        "entity": "billing",
        "accessor": "Billing",
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
        "entity": "billing",
        "accessor": "Billing",
        "op": "load",
        "method": "GET",
        "path": "/billing/info",
        "action": "info",
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
        "entity": "certificate",
        "accessor": "Certificate",
        "op": "create",
        "method": "POST",
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
        "entity": "certificate",
        "accessor": "Certificate",
        "op": "create",
        "method": "POST",
        "path": "/certificate/dcv_params",
        "action": "dcv_param",
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
        "entity": "certificate",
        "accessor": "Certificate",
        "op": "create",
        "method": "POST",
        "path": "/certificate/issued-certs",
        "action": "issued_cert",
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
        "entity": "certificate",
        "accessor": "Certificate",
        "op": "list",
        "method": "GET",
        "path": "/certificate/issued-certs/{id}/tags",
        "args": [
            {
                "name": "issued_cert_id",
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
        "entity": "certificate",
        "accessor": "Certificate",
        "op": "list",
        "method": "GET",
        "path": "/certificate/issued-certs",
        "action": "issued_cert",
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
        "entity": "certificate",
        "accessor": "Certificate",
        "op": "list",
        "method": "GET",
        "path": "/certificate/packages",
        "action": "package",
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
        "entity": "certificate",
        "accessor": "Certificate",
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
        "entity": "certificate",
        "accessor": "Certificate",
        "op": "load",
        "method": "GET",
        "path": "/certificate/issued-certs/{id}/crt",
        "args": [
            {
                "name": "issued_cert_id",
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
        "entity": "certificate",
        "accessor": "Certificate",
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
        "entity": "certificate",
        "accessor": "Certificate",
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
        "entity": "certificate",
        "accessor": "Certificate",
        "op": "patch",
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
        "entity": "certificate",
        "accessor": "Certificate",
        "op": "patch",
        "method": "PATCH",
        "path": "/certificate/issued-certs/{id}/dcv",
        "action": "dcv",
        "args": [
            {
                "name": "issued_cert_id",
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
        "entity": "certificate",
        "accessor": "Certificate",
        "op": "patch",
        "method": "PATCH",
        "path": "/certificate/issued-certs/{id}/tags",
        "args": [
            {
                "name": "issued_cert_id",
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
        "entity": "certificate",
        "accessor": "Certificate",
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
        "entity": "certificate",
        "accessor": "Certificate",
        "op": "remove",
        "method": "DELETE",
        "path": "/certificate/issued-certs/{id}/tags",
        "args": [
            {
                "name": "issued_cert_id",
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
        "entity": "certificate",
        "accessor": "Certificate",
        "op": "update",
        "method": "PUT",
        "path": "/certificate/issued-certs/{id}/dcv",
        "action": "dcv",
        "args": [
            {
                "name": "issued_cert_id",
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
        "entity": "certificate",
        "accessor": "Certificate",
        "op": "update",
        "method": "PUT",
        "path": "/certificate/issued-certs/{id}/tags",
        "args": [
            {
                "name": "issued_cert_id",
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
                "name": "id",
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
        "entity": "domain",
        "accessor": "Domain",
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
        "entity": "domain",
        "accessor": "Domain",
        "op": "create",
        "method": "POST",
        "path": "/domain/transferin/{domain}/available",
        "action": "available",
        "args": [
            {
                "name": "id",
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
        "entity": "domain",
        "accessor": "Domain",
        "op": "create",
        "method": "POST",
        "path": "/domain/domains/{domain}/claims",
        "action": "claim",
        "args": [
            {
                "name": "id",
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
        "op": "create",
        "method": "POST",
        "path": "/domain/domains/{domain}/dnskeys",
        "action": "dnskey",
        "args": [
            {
                "name": "id",
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
        "path": "/domain/domains/{domain}/hosts",
        "action": "host",
        "args": [
            {
                "name": "id",
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
        "entity": "domain",
        "accessor": "Domain",
        "op": "create",
        "method": "POST",
        "path": "/domain/domains/{domain}/livedns",
        "action": "livedn",
        "args": [
            {
                "name": "id",
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
        "path": "/domain/domains/{domain}/livedns/dnssec",
        "args": [
            {
                "name": "id",
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
        "entity": "domain",
        "accessor": "Domain",
        "op": "create",
        "method": "POST",
        "path": "/domain/domains/{domain}/renew",
        "action": "renew",
        "args": [
            {
                "name": "id",
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
                "name": "id",
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
        "path": "/domain/domains/{domain}/tags",
        "action": "tag",
        "args": [
            {
                "name": "id",
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
        "op": "create",
        "method": "POST",
        "path": "/domain/domains/{domain}/transferout",
        "action": "transferout",
        "args": [
            {
                "name": "id",
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
        "path": "/domain/domains/{domain}/webredirs",
        "action": "webredir",
        "args": [
            {
                "name": "id",
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
        "op": "create",
        "method": "POST",
        "path": "/domain/transferin",
        "action": "transferin",
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
        "path": "/domain/check",
        "action": "check",
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
        "entity": "domain",
        "accessor": "Domain",
        "op": "list",
        "method": "GET",
        "path": "/domain/domains/{domain}/claims",
        "action": "claim",
        "args": [
            {
                "name": "id",
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
        "entity": "domain",
        "accessor": "Domain",
        "op": "list",
        "method": "GET",
        "path": "/domain/domains/{domain}/dnskeys",
        "action": "dnskey",
        "args": [
            {
                "name": "id",
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
        "entity": "domain",
        "accessor": "Domain",
        "op": "list",
        "method": "GET",
        "path": "/domain/domains/{domain}/hosts",
        "action": "host",
        "args": [
            {
                "name": "id",
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
        "entity": "domain",
        "accessor": "Domain",
        "op": "list",
        "method": "GET",
        "path": "/domain/domains/{domain}/livedns",
        "action": "livedn",
        "args": [
            {
                "name": "id",
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
        "entity": "domain",
        "accessor": "Domain",
        "op": "list",
        "method": "GET",
        "path": "/domain/domains/{domain}/nameservers",
        "action": "nameserver",
        "args": [
            {
                "name": "id",
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
        "entity": "domain",
        "accessor": "Domain",
        "op": "list",
        "method": "GET",
        "path": "/domain/domains/{domain}/renew",
        "action": "renew",
        "args": [
            {
                "name": "id",
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
        "op": "list",
        "method": "GET",
        "path": "/domain/domains/{domain}/restore",
        "action": "restore",
        "args": [
            {
                "name": "id",
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
        "op": "list",
        "method": "GET",
        "path": "/domain/domains/{domain}/tags",
        "action": "tag",
        "args": [
            {
                "name": "id",
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
        "entity": "domain",
        "accessor": "Domain",
        "op": "list",
        "method": "GET",
        "path": "/domain/domains/{domain}/webredirs",
        "action": "webredir",
        "args": [
            {
                "name": "id",
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
        "op": "list",
        "method": "GET",
        "path": "/domain/tlds",
        "action": "tld",
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
        "entity": "domain",
        "accessor": "Domain",
        "op": "load",
        "method": "GET",
        "path": "/domain/domains/{domain}/webredirs/{host}",
        "args": [
            {
                "name": "host",
                "wire": "host",
                "value": "p1"
            },
            {
                "name": "id",
                "wire": "domain",
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
        "entity": "domain",
        "accessor": "Domain",
        "op": "load",
        "method": "GET",
        "path": "/domain/domains/{domain}/hosts/{name}",
        "args": [
            {
                "name": "id",
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
        "entity": "domain",
        "accessor": "Domain",
        "op": "load",
        "method": "GET",
        "path": "/domain/domains/{domain}/contacts",
        "action": "contact",
        "args": [
            {
                "name": "id",
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
        "entity": "domain",
        "accessor": "Domain",
        "op": "load",
        "method": "GET",
        "path": "/domain/domains/{domain}/createstatus",
        "action": "createstatus",
        "args": [
            {
                "name": "id",
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
        "entity": "domain",
        "accessor": "Domain",
        "op": "patch",
        "method": "PATCH",
        "path": "/domain/domains/{domain}/webredirs/{host}",
        "args": [
            {
                "name": "host",
                "wire": "host",
                "value": "p1"
            },
            {
                "name": "id",
                "wire": "domain",
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
        "entity": "domain",
        "accessor": "Domain",
        "op": "patch",
        "method": "PATCH",
        "path": "/domain/domains/{domain}/autorenew",
        "action": "autorenew",
        "args": [
            {
                "name": "id",
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
        "op": "patch",
        "method": "PATCH",
        "path": "/domain/domains/{domain}/contacts",
        "action": "contact",
        "args": [
            {
                "name": "id",
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
        "op": "patch",
        "method": "PATCH",
        "path": "/domain/domains/{domain}/reachability",
        "action": "reachability",
        "args": [
            {
                "name": "id",
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
        "op": "patch",
        "method": "PATCH",
        "path": "/domain/domains/{domain}/status",
        "action": "status",
        "args": [
            {
                "name": "id",
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
        "op": "patch",
        "method": "PATCH",
        "path": "/domain/domains/{domain}/tags",
        "action": "tag",
        "args": [
            {
                "name": "id",
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
        "entity": "domain",
        "accessor": "Domain",
        "op": "remove",
        "method": "DELETE",
        "path": "/domain/domains/{domain}/webredirs/{host}",
        "args": [
            {
                "name": "host",
                "wire": "host",
                "value": "p1"
            },
            {
                "name": "id",
                "wire": "domain",
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
        "entity": "domain",
        "accessor": "Domain",
        "op": "remove",
        "method": "DELETE",
        "path": "/domain/domains/{domain}/hosts/{name}",
        "args": [
            {
                "name": "id",
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
        "entity": "domain",
        "accessor": "Domain",
        "op": "remove",
        "method": "DELETE",
        "path": "/domain/domains/{domain}/tags",
        "action": "tag",
        "args": [
            {
                "name": "id",
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
        "entity": "domain",
        "accessor": "Domain",
        "op": "update",
        "method": "PUT",
        "path": "/domain/domains/{domain}/hosts/{name}",
        "args": [
            {
                "name": "id",
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
        "entity": "domain",
        "accessor": "Domain",
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
        "entity": "domain",
        "accessor": "Domain",
        "op": "update",
        "method": "PUT",
        "path": "/domain/domains/{domain}/contacts/owner",
        "args": [
            {
                "name": "id",
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
        "entity": "domain",
        "accessor": "Domain",
        "op": "update",
        "method": "PUT",
        "path": "/domain/domains/{domain}/dnskeys",
        "action": "dnskey",
        "args": [
            {
                "name": "id",
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
        "path": "/domain/domains/{domain}/nameservers",
        "action": "nameserver",
        "args": [
            {
                "name": "id",
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
        "path": "/domain/domains/{domain}/tags",
        "action": "tag",
        "args": [
            {
                "name": "id",
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
        "entity": "email",
        "accessor": "Email",
        "op": "create",
        "method": "POST",
        "path": "/email/mailboxes/{domain}/{email}/renew",
        "action": "renew",
        "args": [
            {
                "name": "domain",
                "wire": "domain",
                "value": "p1"
            },
            {
                "name": "email",
                "wire": "email",
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
        "entity": "email",
        "accessor": "Email",
        "op": "create",
        "method": "POST",
        "path": "/email/mailboxes/{domain}/renew",
        "action": "renew",
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
        "entity": "email",
        "accessor": "Email",
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
                "name": "mailbox_id",
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
        "entity": "email",
        "accessor": "Email",
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
                "name": "slot_id",
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
        "entity": "email",
        "accessor": "Email",
        "op": "patch",
        "method": "PATCH",
        "path": "/email/mailboxes/{domain}/{mailbox_id}",
        "args": [
            {
                "name": "domain",
                "wire": "domain",
                "value": "p1"
            },
            {
                "name": "mailbox_id",
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
        "entity": "email",
        "accessor": "Email",
        "op": "patch",
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
        "entity": "email",
        "accessor": "Email",
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
                "name": "slot_id",
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
        "entity": "email",
        "accessor": "Email",
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
        "entity": "email",
        "accessor": "Email",
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
        "entity": "linked_zone",
        "accessor": "LinkedZone",
        "op": "create",
        "method": "POST",
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
        "status": 202,
        "sample": {
            "message": "x"
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
        "op": "load",
        "method": "GET",
        "path": "/linkedzone/domains/{domain}",
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
        "op": "load",
        "method": "GET",
        "path": "/linkedzone/tasks/{task_id}",
        "args": [
            {
                "name": "task_id",
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
        "entity": "linked_zone",
        "accessor": "LinkedZone",
        "op": "update",
        "method": "PATCH",
        "path": "/linkedzone/zones/{zone_id}/link/domains",
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
        "entity": "linked_zone",
        "accessor": "LinkedZone",
        "op": "update",
        "method": "PATCH",
        "path": "/linkedzone/unlink/domains",
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
        "entity": "live_dn",
        "accessor": "LiveDn",
        "op": "create",
        "method": "POST",
        "path": "/livedns/domains/{fqdn}/records/{rrset_name}",
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
        "entity": "live_dn",
        "accessor": "LiveDn",
        "op": "list",
        "method": "GET",
        "path": "/livedns/domains/{fqdn}/records/{rrset_name}",
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
        "entity": "live_dn",
        "accessor": "LiveDn",
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
        "entity": "live_dn",
        "accessor": "LiveDn",
        "op": "load",
        "method": "GET",
        "path": "/livedns/axfr/tsig/{id}/config/{software}",
        "args": [
            {
                "name": "software",
                "wire": "software",
                "value": "p1"
            },
            {
                "name": "tsig_id",
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
        "entity": "live_dn",
        "accessor": "LiveDn",
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
        "entity": "live_dn",
        "accessor": "LiveDn",
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
        "entity": "live_dn",
        "accessor": "LiveDn",
        "op": "patch",
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
        "entity": "live_dn",
        "accessor": "LiveDn",
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
        "entity": "live_dn",
        "accessor": "LiveDn",
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
        "entity": "live_dn",
        "accessor": "LiveDn",
        "op": "remove",
        "method": "DELETE",
        "path": "/livedns/domains/{fqdn}/records/{rrset_name}",
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
        "entity": "live_dn",
        "accessor": "LiveDn",
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
        "entity": "live_dn",
        "accessor": "LiveDn",
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
        "entity": "live_dn",
        "accessor": "LiveDn",
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
        "entity": "live_dn",
        "accessor": "LiveDn",
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
        "entity": "live_dn",
        "accessor": "LiveDn",
        "op": "update",
        "method": "PUT",
        "path": "/livedns/domains/{fqdn}/records/{rrset_name}",
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
        "entity": "live_dn",
        "accessor": "LiveDn",
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
                "name": "email",
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
        "entity": "mailbox",
        "accessor": "Mailbox",
        "op": "create",
        "method": "POST",
        "path": "/mailbox/forwards",
        "action": "forward",
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
        "op": "create",
        "method": "POST",
        "path": "/mailbox/products",
        "action": "product",
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
        "path": "/mailbox/domains",
        "action": "domain",
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
        "entity": "mailbox",
        "accessor": "Mailbox",
        "op": "list",
        "method": "GET",
        "path": "/mailbox/forwards",
        "action": "forward",
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
        "op": "list",
        "method": "GET",
        "path": "/mailbox/products",
        "action": "product",
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
        "entity": "mailbox",
        "accessor": "Mailbox",
        "op": "list",
        "method": "GET",
        "path": "/mailbox/quotas",
        "action": "quota",
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
        "entity": "mailbox",
        "accessor": "Mailbox",
        "op": "list",
        "method": "GET",
        "path": "/mailbox/slots",
        "action": "slot",
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
        "entity": "mailbox",
        "accessor": "Mailbox",
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
        "entity": "mailbox",
        "accessor": "Mailbox",
        "op": "load",
        "method": "GET",
        "path": "/mailbox/mailboxes/{email}",
        "args": [
            {
                "name": "id",
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
        "op": "load",
        "method": "GET",
        "path": "/mailbox/slots/{slot_id}",
        "args": [
            {
                "name": "slot_id",
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
        "entity": "mailbox",
        "accessor": "Mailbox",
        "op": "patch",
        "method": "PATCH",
        "path": "/mailbox/mailboxes/{email}",
        "args": [
            {
                "name": "id",
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
        "entity": "mailbox",
        "accessor": "Mailbox",
        "op": "remove",
        "method": "DELETE",
        "path": "/mailbox/mailboxes/{email}",
        "args": [
            {
                "name": "id",
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
        "entity": "mailbox",
        "accessor": "Mailbox",
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
        "entity": "nt",
        "accessor": "Nt",
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
        "path": "/organization/organizations/{org_id}/customers",
        "action": "customer",
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
            "id": "x",
            "message": "x"
        },
        "idField": "id"
    },
    {
        "entity": "organization",
        "accessor": "Organization",
        "op": "create",
        "method": "POST",
        "path": "/organization/access-tokens",
        "action": "access_token",
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
        "path": "/organization/organizations/{org_id}/customers",
        "action": "customer",
        "args": [
            {
                "name": "id",
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
        "op": "load",
        "method": "GET",
        "path": "/organization/user-info",
        "action": "user_info",
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
    },
    {
        "entity": "organization",
        "accessor": "Organization",
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
        "entity": "template",
        "accessor": "Template",
        "op": "create",
        "method": "POST",
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
        "entity": "web_hosting",
        "accessor": "WebHosting",
        "op": "create",
        "method": "POST",
        "path": "/simplehosting/instances/{instance_id}/action",
        "action": "action",
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
            "message": "x"
        },
        "idField": "id"
    },
    {
        "entity": "web_hosting",
        "accessor": "WebHosting",
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
        "entity": "web_hosting",
        "accessor": "WebHosting",
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
        "entity": "web_hosting",
        "accessor": "WebHosting",
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
        "entity": "web_hosting",
        "accessor": "WebHosting",
        "op": "load",
        "method": "GET",
        "path": "/simplehosting/instances/{instance_id}/vhosts/{vhost_fqdn}",
        "args": [
            {
                "name": "instance_id",
                "wire": "instance_id",
                "value": "p1"
            },
            {
                "name": "vhost_fqdn",
                "wire": "vhost_fqdn",
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
        "entity": "web_hosting",
        "accessor": "WebHosting",
        "op": "load",
        "method": "GET",
        "path": "/simplehosting/applications/{application_name}",
        "args": [
            {
                "name": "application_name",
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
        "entity": "web_hosting",
        "accessor": "WebHosting",
        "op": "remove",
        "method": "DELETE",
        "path": "/simplehosting/instances/{instance_id}/vhosts/{vhost_fqdn}",
        "args": [
            {
                "name": "instance_id",
                "wire": "instance_id",
                "value": "p1"
            },
            {
                "name": "vhost_fqdn",
                "wire": "vhost_fqdn",
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
        "entity": "web_hosting",
        "accessor": "WebHosting",
        "op": "remove",
        "method": "DELETE",
        "path": "/simplehosting/instances/{instance_id}/vhosts/{vhost_fqdn}/cache",
        "action": "cache",
        "args": [
            {
                "name": "instance_id",
                "wire": "instance_id",
                "value": "p1"
            },
            {
                "name": "vhost_fqdn",
                "wire": "vhost_fqdn",
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
        "entity": "web_hosting",
        "accessor": "WebHosting",
        "op": "remove",
        "method": "DELETE",
        "path": "/simplehosting/instances/{instance_id}",
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
        "entity": "web_hosting",
        "accessor": "WebHosting",
        "op": "update",
        "method": "PATCH",
        "path": "/simplehosting/instances/{instance_id}/vhosts/{vhost_fqdn}",
        "args": [
            {
                "name": "instance_id",
                "wire": "instance_id",
                "value": "p1"
            },
            {
                "name": "vhost_fqdn",
                "wire": "vhost_fqdn",
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
        "entity": "web_hosting",
        "accessor": "WebHosting",
        "op": "update",
        "method": "PATCH",
        "path": "/simplehosting/instances/{instance_id}",
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
            "message": "x"
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