"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const DebugFeature_1 = require("./feature/debug/DebugFeature");
const IdempotencyFeature_1 = require("./feature/idempotency/IdempotencyFeature");
const MetricsFeature_1 = require("./feature/metrics/MetricsFeature");
const PagingFeature_1 = require("./feature/paging/PagingFeature");
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const SecretsFeature_1 = require("./feature/secrets/SecretsFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    debug: DebugFeature_1.DebugFeature,
    idempotency: IdempotencyFeature_1.IdempotencyFeature,
    metrics: MetricsFeature_1.MetricsFeature,
    paging: PagingFeature_1.PagingFeature,
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    secrets: SecretsFeature_1.SecretsFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'Gandi',
        slug: "gandi",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        debug: {
            "options": {
                "active": false,
                "max": 100,
                "redact": [
                    "authorization",
                    "cookie",
                    "set-cookie",
                    "api-key",
                    "apikey",
                    "x-api-key",
                    "idempotency-key"
                ]
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "onEntry": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "none"
        },
        idempotency: {
            "options": {
                "active": false,
                "header": "Idempotency-Key",
                "methods": [
                    "POST",
                    "PUT",
                    "PATCH",
                    "DELETE"
                ],
                "ops": [
                    "create",
                    "update",
                    "remove"
                ]
            },
            "optspec": {
                "keygen": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "none"
        },
        metrics: {
            "options": {
                "active": false
            },
            "optspec": {
                "now": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "none"
        },
        paging: {
            "options": {
                "active": false,
                "afterVar": "after",
                "cursorParam": "cursor",
                "firstVar": "first",
                "limitParam": "limit",
                "pageParam": "page",
                "startPage": 1
            },
            "optspec": {
                "limit": "`$NUMBER`",
                "ops": "`$LIST`"
            },
            "strict": false,
            "transport": "none"
        },
        ratelimit: {
            "options": {
                "active": false,
                "burst": 5,
                "rate": 5
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        retry: {
            "options": {
                "active": false,
                "factor": 2,
                "maxDelay": 2000,
                "minDelay": 50,
                "retries": 2,
                "statuses": [
                    408,
                    425,
                    429,
                    500,
                    502,
                    503,
                    504
                ]
            },
            "optspec": {
                "jitter": "`$BOOLEAN`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        secrets: {
            "options": {
                "active": false,
                "cache": true,
                "exchange": {
                    "active": false,
                    "method": "POST",
                    "path": "auth/token",
                    "refresh": "",
                    "request": "refresh_token",
                    "response": "access_token",
                    "retries": 1,
                    "statuses": [
                        401
                    ]
                },
                "name": "apikey",
                "providers": []
            },
            "optspec": {},
            "strict": false,
            "transport": "wrap"
        },
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
        timeout: {
            "options": {
                "active": false,
                "ms": 30000
            },
            "optspec": {
                "clearTimer": "`$FUNCTION`",
                "now": "`$FUNCTION`",
                "setTimer": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
    };
    options = {
        base: "https://api.gandi.net/v5",
        auth: {
            prefix: 'Bearer',
        },
        headers: {
            "content-type": "application/json"
        },
        entity: {
            acme: {},
            billing: {},
            certificate: {},
            comment: {},
            domain: {},
            email: {},
            linked_zone: {},
            live_dn: {},
            mailbox: {},
            nt: {},
            organization: {},
            template: {},
            web_hosting: {},
        }
    };
    entity = {
        "acme": {
            "fields": [
                {
                    "name": "country",
                    "title": "Country",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "created_at",
                    "title": "Created At",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "currency",
                    "title": "Currency",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "deleted_at",
                    "title": "Deleted At",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "domains_to_add",
                    "title": "Domains To Add",
                    "type": "`$ARRAY`",
                    "req": true
                },
                {
                    "name": "domains_to_delete",
                    "title": "Domains To Delete",
                    "type": "`$ARRAY`",
                    "req": true
                },
                {
                    "name": "eab_hmac",
                    "title": "Eab Hmac",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "eab_id",
                    "title": "Eab Id",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "ends_at",
                    "title": "Ends At",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "external_id",
                    "title": "External Id",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "grid",
                    "title": "Grid",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "hostname",
                    "title": "Hostname",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "hostname_ulabel",
                    "title": "Hostname Ulabel",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "ip",
                    "title": "Ip",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "is_wildcard",
                    "title": "Is Wildcard",
                    "type": "`$BOOLEAN`",
                    "req": true
                },
                {
                    "name": "last_activity",
                    "title": "Last Activity",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "message",
                    "title": "Message",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "name",
                    "title": "Name",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "provider",
                    "title": "Provider",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "server_url",
                    "title": "Server Url",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "status",
                    "title": "Status",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "subscription_id",
                    "title": "Subscription Id",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "validation_type",
                    "title": "Validation Type",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "years",
                    "title": "Years",
                    "type": "`$STRING`",
                    "req": true
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "acme",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/acme/quote",
                            "segments": [
                                {
                                    "lit": "acme"
                                },
                                {
                                    "lit": "quote"
                                }
                            ],
                            "parts": [
                                "acme",
                                "quote"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "sharing_id",
                                        "orig": "sharing_id",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "quote",
                                "exist": [
                                    "sharing_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/acme/subscriptions",
                            "segments": [
                                {
                                    "lit": "acme"
                                },
                                {
                                    "lit": "subscriptions"
                                }
                            ],
                            "parts": [
                                "acme",
                                "subscriptions"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "sharing_id",
                                        "orig": "sharing_id",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "subscription",
                                "exist": [
                                    "sharing_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/acme/catalog",
                            "segments": [
                                {
                                    "lit": "acme"
                                },
                                {
                                    "lit": "catalog"
                                }
                            ],
                            "parts": [
                                "acme",
                                "catalog"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "country",
                                        "orig": "country",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true,
                                        "field": true
                                    },
                                    {
                                        "name": "currency",
                                        "orig": "currency",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true,
                                        "field": true
                                    },
                                    {
                                        "name": "duration",
                                        "orig": "duration",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true
                                    },
                                    {
                                        "name": "grid",
                                        "orig": "grid",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true,
                                        "field": true
                                    },
                                    {
                                        "name": "process",
                                        "orig": "process",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true
                                    },
                                    {
                                        "name": "provider",
                                        "orig": "provider",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true,
                                        "field": true
                                    },
                                    {
                                        "name": "sharing_id",
                                        "orig": "sharing_id",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true
                                    },
                                    {
                                        "name": "validation_type",
                                        "orig": "validation_type",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true,
                                        "field": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "catalog",
                                "exist": [
                                    "country",
                                    "currency",
                                    "duration",
                                    "grid",
                                    "process",
                                    "provider",
                                    "sharing_id",
                                    "validation_type"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/acme/subscriptions",
                            "segments": [
                                {
                                    "lit": "acme"
                                },
                                {
                                    "lit": "subscriptions"
                                }
                            ],
                            "parts": [
                                "acme",
                                "subscriptions"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "created_at",
                                        "orig": "created_at",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true,
                                        "field": true
                                    },
                                    {
                                        "name": "ends_at",
                                        "orig": "ends_at",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true,
                                        "field": true
                                    },
                                    {
                                        "name": "name",
                                        "orig": "name",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true,
                                        "field": true
                                    },
                                    {
                                        "name": "provider",
                                        "orig": "provider",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true,
                                        "field": true
                                    },
                                    {
                                        "name": "sharing_id",
                                        "orig": "sharing_id",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true
                                    },
                                    {
                                        "name": "status",
                                        "orig": "status",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true,
                                        "field": true
                                    },
                                    {
                                        "name": "validation_type",
                                        "orig": "validation_type",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true,
                                        "field": true
                                    },
                                    {
                                        "name": "year",
                                        "orig": "years",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "subscription",
                                "exist": [
                                    "created_at",
                                    "ends_at",
                                    "name",
                                    "provider",
                                    "sharing_id",
                                    "status",
                                    "validation_type",
                                    "year"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/acme/subscriptions/{subscription_id}/domains",
                            "segments": [
                                {
                                    "lit": "acme"
                                },
                                {
                                    "lit": "subscriptions"
                                },
                                {
                                    "var": "subscription_id"
                                },
                                {
                                    "lit": "domains"
                                }
                            ],
                            "parts": [
                                "acme",
                                "subscriptions",
                                "{subscription_id}",
                                "domains"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "subscription_id",
                                        "orig": "subscription_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "domain",
                                        "orig": "domain",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true
                                    },
                                    {
                                        "name": "sharing_id",
                                        "orig": "sharing_id",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "domain",
                                    "sharing_id",
                                    "subscription_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/acme/subscriptions/{subscription_id}/accounts",
                            "segments": [
                                {
                                    "lit": "acme"
                                },
                                {
                                    "lit": "subscriptions"
                                },
                                {
                                    "var": "subscription_id"
                                },
                                {
                                    "lit": "accounts"
                                }
                            ],
                            "parts": [
                                "acme",
                                "subscriptions",
                                "{subscription_id}",
                                "accounts"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "subscription_id",
                                        "orig": "subscription_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "sharing_id",
                                        "orig": "sharing_id",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "sharing_id",
                                    "subscription_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/acme/subscriptions/{subscription_id}/accounts/{account_id}",
                            "segments": [
                                {
                                    "lit": "acme"
                                },
                                {
                                    "lit": "subscriptions"
                                },
                                {
                                    "var": "subscription_id"
                                },
                                {
                                    "lit": "accounts"
                                },
                                {
                                    "var": "account_id"
                                }
                            ],
                            "parts": [
                                "acme",
                                "subscriptions",
                                "{subscription_id}",
                                "accounts",
                                "{account_id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "account_id",
                                        "orig": "account_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "subscription_id",
                                        "orig": "subscription_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "sharing_id",
                                        "orig": "sharing_id",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "account_id",
                                    "sharing_id",
                                    "subscription_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/acme/subscriptions/{subscription_id}/domains/{domain_id}",
                            "segments": [
                                {
                                    "lit": "acme"
                                },
                                {
                                    "lit": "subscriptions"
                                },
                                {
                                    "var": "subscription_id"
                                },
                                {
                                    "lit": "domains"
                                },
                                {
                                    "var": "domain_id"
                                }
                            ],
                            "parts": [
                                "acme",
                                "subscriptions",
                                "{subscription_id}",
                                "domains",
                                "{domain_id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "domain_id",
                                        "orig": "domain_id",
                                        "type": "`$INTEGER`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "subscription_id",
                                        "orig": "subscription_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "sharing_id",
                                        "orig": "sharing_id",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "domain_id",
                                    "sharing_id",
                                    "subscription_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/acme/subscriptions/{subscription_id}",
                            "segments": [
                                {
                                    "lit": "acme"
                                },
                                {
                                    "lit": "subscriptions"
                                },
                                {
                                    "var": "subscription_id"
                                }
                            ],
                            "parts": [
                                "acme",
                                "subscriptions",
                                "{subscription_id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "subscription_id",
                                        "orig": "subscription_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "sharing_id",
                                        "orig": "sharing_id",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "sharing_id",
                                    "subscription_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/acme/subscriptions/{subscription_id}",
                            "segments": [
                                {
                                    "lit": "acme"
                                },
                                {
                                    "lit": "subscriptions"
                                },
                                {
                                    "var": "subscription_id"
                                }
                            ],
                            "parts": [
                                "acme",
                                "subscriptions",
                                "{subscription_id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "subscription_id",
                                        "orig": "subscription_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "sharing_id",
                                        "orig": "sharing_id",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "sharing_id",
                                    "subscription_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "update": {
                    "input": "data",
                    "name": "update",
                    "points": [
                        {
                            "kind": "http",
                            "method": "PATCH",
                            "orig": "/acme/subscriptions/{subscription_id}",
                            "segments": [
                                {
                                    "lit": "acme"
                                },
                                {
                                    "lit": "subscriptions"
                                },
                                {
                                    "var": "subscription_id"
                                }
                            ],
                            "parts": [
                                "acme",
                                "subscriptions",
                                "{subscription_id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "subscription_id",
                                        "orig": "subscription_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "sharing_id",
                                        "orig": "sharing_id",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "sharing_id",
                                    "subscription_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "PATCH",
                            "orig": "/acme/subscriptions/{subscription_id}/domains",
                            "segments": [
                                {
                                    "lit": "acme"
                                },
                                {
                                    "lit": "subscriptions"
                                },
                                {
                                    "var": "subscription_id"
                                },
                                {
                                    "lit": "domains"
                                }
                            ],
                            "parts": [
                                "acme",
                                "subscriptions",
                                "{subscription_id}",
                                "domains"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "subscription_id",
                                        "orig": "subscription_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "sharing_id",
                                        "orig": "sharing_id",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "sharing_id",
                                    "subscription_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "$.main.kit.entity.domain"
                    ]
                ]
            }
        },
        "billing": {
            "fields": [
                {
                    "name": "annual_balance",
                    "title": "Annual Balance",
                    "type": "`$NUMBER`",
                    "req": true
                },
                {
                    "name": "currency",
                    "title": "Currency",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "grid",
                    "title": "Grid",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "outstanding_amount",
                    "title": "Outstanding Amount",
                    "type": "`$NUMBER`",
                    "req": true
                },
                {
                    "name": "prepaid",
                    "title": "Prepaid",
                    "type": "`$OBJECT`",
                    "req": true
                },
                {
                    "name": "prepaid_monthly_invoice",
                    "title": "Prepaid Monthly Invoice",
                    "type": "`$BOOLEAN`"
                },
                {
                    "name": "products",
                    "title": "Products",
                    "type": "`$ARRAY`",
                    "req": true
                },
                {
                    "name": "taxes",
                    "title": "Taxes",
                    "type": "`$ARRAY`",
                    "req": true
                }
            ],
            "name": "billing",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/billing/price/{type}",
                            "segments": [
                                {
                                    "lit": "billing"
                                },
                                {
                                    "lit": "price"
                                },
                                {
                                    "var": "type"
                                }
                            ],
                            "parts": [
                                "billing",
                                "price",
                                "{type}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "type",
                                        "orig": "type",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "active_phase",
                                        "orig": "active_phase",
                                        "type": "`$BOOLEAN`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "country",
                                        "orig": "country",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "currency",
                                        "orig": "currency",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "field": true
                                    },
                                    {
                                        "name": "discount",
                                        "orig": "discounts",
                                        "type": "`$ARRAY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "duration_unit",
                                        "orig": "duration_unit",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "extension",
                                        "orig": "extension",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "feature",
                                        "orig": "features",
                                        "type": "`$BOOLEAN`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "grid",
                                        "orig": "grid",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "field": true
                                    },
                                    {
                                        "name": "lang",
                                        "orig": "lang",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "max_duration",
                                        "orig": "max_duration",
                                        "type": "`$INTEGER`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "name",
                                        "orig": "name",
                                        "type": "`$ARRAY`",
                                        "kind": "query",
                                        "reqd": true
                                    },
                                    {
                                        "name": "page",
                                        "orig": "page",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 1
                                    },
                                    {
                                        "name": "per_page",
                                        "orig": "per_page",
                                        "type": "`$INTEGER`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "prices_at",
                                        "orig": "prices_at",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "process",
                                        "orig": "processes",
                                        "type": "`$ARRAY`",
                                        "kind": "query",
                                        "reqd": true
                                    },
                                    {
                                        "name": "sharing_id",
                                        "orig": "sharing_id",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "name",
                                    "process",
                                    "type"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/billing/info/{sharing_id}",
                            "segments": [
                                {
                                    "lit": "billing"
                                },
                                {
                                    "lit": "info"
                                },
                                {
                                    "var": "sharing_id"
                                }
                            ],
                            "parts": [
                                "billing",
                                "info",
                                "{sharing_id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "sharing_id",
                                        "orig": "sharing_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "sharing_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/billing/info",
                            "segments": [
                                {
                                    "lit": "billing"
                                },
                                {
                                    "lit": "info"
                                }
                            ],
                            "parts": [
                                "billing",
                                "info"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {
                                "$action": "info"
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "certificate": {
            "fields": [
                {
                    "name": "add",
                    "title": "Add",
                    "type": "`$ARRAY`",
                    "req": true
                },
                {
                    "name": "altnames",
                    "title": "Altnames",
                    "type": "`$ARRAY`",
                    "req": true,
                    "op": {
                        "patch": {
                            "type": "`$ARRAY`"
                        }
                    }
                },
                {
                    "name": "altnames_unicode",
                    "title": "Altnames Unicode",
                    "type": "`$ARRAY`",
                    "req": true
                },
                {
                    "name": "assumed_name",
                    "title": "Assumed Name",
                    "type": "`$STRING`"
                },
                {
                    "name": "business_category",
                    "title": "Business Category",
                    "type": "`$STRING`"
                },
                {
                    "name": "card_pay_trustlogo",
                    "title": "Card Pay Trustlogo",
                    "type": "`$BOOLEAN`"
                },
                {
                    "name": "category",
                    "title": "Category",
                    "type": "`$OBJECT`",
                    "req": true
                },
                {
                    "name": "cert",
                    "title": "Cert",
                    "type": "`$STRING`"
                },
                {
                    "name": "cn",
                    "title": "Cn",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "cn_unicode",
                    "title": "Cn Unicode",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "contact",
                    "title": "Contact",
                    "type": "`$OBJECT`",
                    "req": true
                },
                {
                    "name": "csr",
                    "title": "Csr",
                    "type": "`$STRING`"
                },
                {
                    "name": "dates",
                    "title": "Dates",
                    "type": "`$OBJECT`",
                    "req": true
                },
                {
                    "name": "dcv_method",
                    "title": "Dcv Method",
                    "type": "`$STRING`"
                },
                {
                    "name": "dns_records",
                    "title": "Dns Records",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "duration",
                    "title": "Duration",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "error_msg",
                    "title": "Error Msg",
                    "type": "`$STRING`"
                },
                {
                    "name": "errors",
                    "title": "Errors",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "fqdns",
                    "title": "Fqdns",
                    "type": "`$ARRAY`",
                    "req": true
                },
                {
                    "name": "href",
                    "title": "Href",
                    "type": "`$STRING`",
                    "op": {
                        "load": {
                            "req": true,
                            "type": "`$STRING`"
                        }
                    }
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "ida",
                    "title": "Ida",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "intermediate",
                    "title": "Intermediate",
                    "type": "`$STRING`"
                },
                {
                    "name": "joi",
                    "title": "Joi",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "max_domains",
                    "title": "Max Domains",
                    "type": "`$INTEGER`",
                    "req": true
                },
                {
                    "name": "md5",
                    "title": "Md5",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "message",
                    "title": "Message",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "messages",
                    "title": "Messages",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "middleman",
                    "title": "Middleman",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "min_domains",
                    "title": "Min Domains",
                    "type": "`$INTEGER`",
                    "req": true
                },
                {
                    "name": "name",
                    "title": "Name",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "owner",
                    "title": "Owner",
                    "type": "`$STRING`"
                },
                {
                    "name": "package",
                    "title": "Package",
                    "type": "`$OBJECT`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        }
                    }
                },
                {
                    "name": "provider",
                    "title": "Provider",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "raw_messages",
                    "title": "Raw Messages",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "reissuable",
                    "title": "Reissuable",
                    "type": "`$BOOLEAN`"
                },
                {
                    "name": "remove",
                    "title": "Remove",
                    "type": "`$ARRAY`",
                    "req": true
                },
                {
                    "name": "renewable",
                    "title": "Renewable",
                    "type": "`$BOOLEAN`"
                },
                {
                    "name": "sgc",
                    "title": "Sgc",
                    "type": "`$BOOLEAN`",
                    "req": true
                },
                {
                    "name": "sha256",
                    "title": "Sha256",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "sha_version",
                    "title": "Sha Version",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "sharing_id",
                    "title": "Sharing Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "software",
                    "title": "Software",
                    "type": "`$INTEGER`",
                    "req": true
                },
                {
                    "name": "state",
                    "title": "State",
                    "type": "`$STRING`"
                },
                {
                    "name": "state_detail",
                    "title": "State Detail",
                    "type": "`$STRING`"
                },
                {
                    "name": "status",
                    "title": "Status",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "step_nb",
                    "title": "Step Nb",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "stored",
                    "title": "Stored",
                    "type": "`$BOOLEAN`"
                },
                {
                    "name": "tag",
                    "title": "Tag",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "tags",
                    "title": "Tags",
                    "type": "`$ARRAY`",
                    "op": {
                        "update": {
                            "req": true,
                            "type": "`$ARRAY`"
                        }
                    }
                },
                {
                    "name": "trustlogo",
                    "title": "Trustlogo",
                    "type": "`$BOOLEAN`",
                    "op": {
                        "load": {
                            "req": true,
                            "type": "`$BOOLEAN`"
                        }
                    }
                },
                {
                    "name": "trustlogo_token",
                    "title": "Trustlogo Token",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "unique_value",
                    "title": "Unique Value",
                    "type": "`$STRING`"
                },
                {
                    "name": "warranty",
                    "title": "Warranty",
                    "type": "`$INTEGER`",
                    "req": true
                },
                {
                    "name": "wildcard",
                    "title": "Wildcard",
                    "type": "`$BOOLEAN`",
                    "req": true
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "certificate",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/certificate/issued-certs/{id}",
                            "segments": [
                                {
                                    "lit": "certificate"
                                },
                                {
                                    "lit": "issued-certs"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "certificate",
                                "issued-certs",
                                "{id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "dry_run",
                                        "orig": "Dry-Run",
                                        "type": "`$INTEGER`",
                                        "kind": "header"
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "sharing_id",
                                        "orig": "sharing_id",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/certificate/issued-certs/{id}/dcv_params",
                            "segments": [
                                {
                                    "lit": "certificate"
                                },
                                {
                                    "lit": "issued-certs"
                                },
                                {
                                    "var": "issued_cert_id"
                                },
                                {
                                    "lit": "dcv_params"
                                }
                            ],
                            "parts": [
                                "certificate",
                                "issued-certs",
                                "{issued_cert_id}",
                                "dcv_params"
                            ],
                            "rename": {
                                "param": {
                                    "id": "issued_cert_id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "issued_cert_id",
                                        "orig": "id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "issued_cert_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/certificate/issued-certs/{id}/tags",
                            "segments": [
                                {
                                    "lit": "certificate"
                                },
                                {
                                    "lit": "issued-certs"
                                },
                                {
                                    "var": "issued_cert_id"
                                },
                                {
                                    "lit": "tags"
                                }
                            ],
                            "parts": [
                                "certificate",
                                "issued-certs",
                                "{issued_cert_id}",
                                "tags"
                            ],
                            "rename": {
                                "param": {
                                    "id": "issued_cert_id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "issued_cert_id",
                                        "orig": "id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "issued_cert_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/certificate/dcv_params",
                            "segments": [
                                {
                                    "lit": "certificate"
                                },
                                {
                                    "lit": "dcv_params"
                                }
                            ],
                            "parts": [
                                "certificate",
                                "dcv_params"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {
                                "$action": "dcv_param"
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/certificate/issued-certs",
                            "segments": [
                                {
                                    "lit": "certificate"
                                },
                                {
                                    "lit": "issued-certs"
                                }
                            ],
                            "parts": [
                                "certificate",
                                "issued-certs"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "dry_run",
                                        "orig": "Dry-Run",
                                        "type": "`$INTEGER`",
                                        "kind": "header"
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "sharing_id",
                                        "orig": "sharing_id",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "$action": "issued_cert"
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/certificate/issued-certs/{id}/tags",
                            "segments": [
                                {
                                    "lit": "certificate"
                                },
                                {
                                    "lit": "issued-certs"
                                },
                                {
                                    "var": "issued_cert_id"
                                },
                                {
                                    "lit": "tags"
                                }
                            ],
                            "parts": [
                                "certificate",
                                "issued-certs",
                                "{issued_cert_id}",
                                "tags"
                            ],
                            "rename": {
                                "param": {
                                    "id": "issued_cert_id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "issued_cert_id",
                                        "orig": "id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "issued_cert_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/certificate/issued-certs",
                            "segments": [
                                {
                                    "lit": "certificate"
                                },
                                {
                                    "lit": "issued-certs"
                                }
                            ],
                            "parts": [
                                "certificate",
                                "issued-certs"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "cn",
                                        "orig": "cn",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "field": true
                                    },
                                    {
                                        "name": "cn_eq",
                                        "orig": "cn__eq",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "covered_cn",
                                        "orig": "covered_cn",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "package",
                                        "orig": "package",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "field": true
                                    },
                                    {
                                        "name": "page",
                                        "orig": "page",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 1
                                    },
                                    {
                                        "name": "per_page",
                                        "orig": "per_page",
                                        "type": "`$INTEGER`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "sharing_id",
                                        "orig": "sharing_id",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "field": true
                                    },
                                    {
                                        "name": "sort_by",
                                        "orig": "sort_by",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "ends_at"
                                    },
                                    {
                                        "name": "status",
                                        "orig": "status",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "field": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "issued_cert"
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/certificate/packages",
                            "segments": [
                                {
                                    "lit": "certificate"
                                },
                                {
                                    "lit": "packages"
                                }
                            ],
                            "parts": [
                                "certificate",
                                "packages"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "category",
                                        "orig": "category",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "field": true
                                    },
                                    {
                                        "name": "max_domain",
                                        "orig": "max_domains",
                                        "type": "`$INTEGER`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "min_domain",
                                        "orig": "min_domains",
                                        "type": "`$INTEGER`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "page",
                                        "orig": "page",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 1
                                    },
                                    {
                                        "name": "per_page",
                                        "orig": "per_page",
                                        "type": "`$INTEGER`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "trustlogo",
                                        "orig": "trustlogo",
                                        "type": "`$BOOLEAN`",
                                        "kind": "query",
                                        "field": true
                                    },
                                    {
                                        "name": "warranty",
                                        "orig": "warranty",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "field": true
                                    },
                                    {
                                        "name": "wildcard",
                                        "orig": "wildcard",
                                        "type": "`$BOOLEAN`",
                                        "kind": "query",
                                        "field": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "package"
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/certificate/issued-certs/{id}",
                            "segments": [
                                {
                                    "lit": "certificate"
                                },
                                {
                                    "lit": "issued-certs"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "certificate",
                                "issued-certs",
                                "{id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/certificate/issued-certs/{id}/crt",
                            "segments": [
                                {
                                    "lit": "certificate"
                                },
                                {
                                    "lit": "issued-certs"
                                },
                                {
                                    "var": "issued_cert_id"
                                },
                                {
                                    "lit": "crt"
                                }
                            ],
                            "parts": [
                                "certificate",
                                "issued-certs",
                                "{issued_cert_id}",
                                "crt"
                            ],
                            "rename": {
                                "param": {
                                    "id": "issued_cert_id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "issued_cert_id",
                                        "orig": "id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "issued_cert_id"
                                ]
                            },
                            "response": {
                                "kind": "raw",
                                "media": "text/plain"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/certificate/packages/{name}",
                            "segments": [
                                {
                                    "lit": "certificate"
                                },
                                {
                                    "lit": "packages"
                                },
                                {
                                    "var": "name"
                                }
                            ],
                            "parts": [
                                "certificate",
                                "packages",
                                "{name}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "name",
                                        "orig": "name",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "name"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/certificate/pem/{type}",
                            "segments": [
                                {
                                    "lit": "certificate"
                                },
                                {
                                    "lit": "pem"
                                },
                                {
                                    "var": "type"
                                }
                            ],
                            "parts": [
                                "certificate",
                                "pem",
                                "{type}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "type",
                                        "orig": "type",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "provider",
                                        "orig": "provider",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "field": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "type"
                                ]
                            },
                            "response": {
                                "kind": "raw",
                                "media": "text/plain"
                            }
                        }
                    ]
                },
                "patch": {
                    "input": "data",
                    "name": "patch",
                    "points": [
                        {
                            "kind": "http",
                            "method": "PATCH",
                            "orig": "/certificate/issued-certs/{id}",
                            "segments": [
                                {
                                    "lit": "certificate"
                                },
                                {
                                    "lit": "issued-certs"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "certificate",
                                "issued-certs",
                                "{id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "dry_run",
                                        "orig": "Dry-Run",
                                        "type": "`$INTEGER`",
                                        "kind": "header"
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "sharing_id",
                                        "orig": "sharing_id",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "PATCH",
                            "orig": "/certificate/issued-certs/{id}/dcv",
                            "segments": [
                                {
                                    "lit": "certificate"
                                },
                                {
                                    "lit": "issued-certs"
                                },
                                {
                                    "var": "issued_cert_id"
                                },
                                {
                                    "lit": "dcv"
                                }
                            ],
                            "parts": [
                                "certificate",
                                "issued-certs",
                                "{issued_cert_id}",
                                "dcv"
                            ],
                            "rename": {
                                "param": {
                                    "id": "issued_cert_id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "issued_cert_id",
                                        "orig": "id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "sharing_id",
                                        "orig": "sharing_id",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "$action": "dcv",
                                "exist": [
                                    "issued_cert_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "PATCH",
                            "orig": "/certificate/issued-certs/{id}/tags",
                            "segments": [
                                {
                                    "lit": "certificate"
                                },
                                {
                                    "lit": "issued-certs"
                                },
                                {
                                    "var": "issued_cert_id"
                                },
                                {
                                    "lit": "tags"
                                }
                            ],
                            "parts": [
                                "certificate",
                                "issued-certs",
                                "{issued_cert_id}",
                                "tags"
                            ],
                            "rename": {
                                "param": {
                                    "id": "issued_cert_id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "issued_cert_id",
                                        "orig": "id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "issued_cert_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/certificate/issued-certs/{id}",
                            "segments": [
                                {
                                    "lit": "certificate"
                                },
                                {
                                    "lit": "issued-certs"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "certificate",
                                "issued-certs",
                                "{id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "sharing_id",
                                        "orig": "sharing_id",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "field": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/certificate/issued-certs/{id}/tags",
                            "segments": [
                                {
                                    "lit": "certificate"
                                },
                                {
                                    "lit": "issued-certs"
                                },
                                {
                                    "var": "issued_cert_id"
                                },
                                {
                                    "lit": "tags"
                                }
                            ],
                            "parts": [
                                "certificate",
                                "issued-certs",
                                "{issued_cert_id}",
                                "tags"
                            ],
                            "rename": {
                                "param": {
                                    "id": "issued_cert_id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "issued_cert_id",
                                        "orig": "id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "issued_cert_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "update": {
                    "input": "data",
                    "name": "update",
                    "points": [
                        {
                            "kind": "http",
                            "method": "PUT",
                            "orig": "/certificate/issued-certs/{id}/dcv",
                            "segments": [
                                {
                                    "lit": "certificate"
                                },
                                {
                                    "lit": "issued-certs"
                                },
                                {
                                    "var": "issued_cert_id"
                                },
                                {
                                    "lit": "dcv"
                                }
                            ],
                            "parts": [
                                "certificate",
                                "issued-certs",
                                "{issued_cert_id}",
                                "dcv"
                            ],
                            "rename": {
                                "param": {
                                    "id": "issued_cert_id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "issued_cert_id",
                                        "orig": "id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "sharing_id",
                                        "orig": "sharing_id",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "field": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "dcv",
                                "exist": [
                                    "issued_cert_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "PUT",
                            "orig": "/certificate/issued-certs/{id}/tags",
                            "segments": [
                                {
                                    "lit": "certificate"
                                },
                                {
                                    "lit": "issued-certs"
                                },
                                {
                                    "var": "issued_cert_id"
                                },
                                {
                                    "lit": "tags"
                                }
                            ],
                            "parts": [
                                "certificate",
                                "issued-certs",
                                "{issued_cert_id}",
                                "tags"
                            ],
                            "rename": {
                                "param": {
                                    "id": "issued_cert_id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "issued_cert_id",
                                        "orig": "id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "issued_cert_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "comment": {
            "fields": [
                {
                    "name": "content",
                    "title": "Content",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "created_at",
                    "title": "Created At",
                    "type": "`$STRING`",
                    "format": "date-time"
                },
                {
                    "name": "errors",
                    "title": "Errors",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "status",
                    "title": "Status",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "updated_at",
                    "title": "Updated At",
                    "type": "`$STRING`",
                    "format": "date-time"
                },
                {
                    "name": "user",
                    "title": "User",
                    "type": "`$OBJECT`",
                    "req": true
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "comment",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/comment/comments/{id}",
                            "segments": [
                                {
                                    "lit": "comment"
                                },
                                {
                                    "lit": "comments"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "comment",
                                "comments",
                                "{id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "dry_run",
                                        "orig": "Dry-Run",
                                        "type": "`$INTEGER`",
                                        "kind": "header"
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/comment/comments/{id}",
                            "segments": [
                                {
                                    "lit": "comment"
                                },
                                {
                                    "lit": "comments"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "comment",
                                "comments",
                                "{id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/comment/comments/{id}",
                            "segments": [
                                {
                                    "lit": "comment"
                                },
                                {
                                    "lit": "comments"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "comment",
                                "comments",
                                "{id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "domain": {
            "fields": [
                {
                    "name": "admin",
                    "title": "Admin",
                    "type": "`$OBJECT`",
                    "req": true
                },
                {
                    "name": "authinfo",
                    "title": "Authinfo",
                    "type": "`$STRING`"
                },
                {
                    "name": "authinfo_for_transfer",
                    "title": "Authinfo For Transfer",
                    "type": "`$BOOLEAN`",
                    "req": true
                },
                {
                    "name": "autorenew",
                    "title": "Autorenew",
                    "type": "`$OBJECT`",
                    "req": true
                },
                {
                    "name": "bill",
                    "title": "Bill",
                    "type": "`$OBJECT`",
                    "req": true
                },
                {
                    "name": "brand_number",
                    "title": "Brand Number",
                    "type": "`$STRING`"
                },
                {
                    "name": "can_tld_lock",
                    "title": "Can Tld Lock",
                    "type": "`$BOOLEAN`",
                    "req": true
                },
                {
                    "name": "category",
                    "title": "Category",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "cert_status",
                    "title": "Cert Status",
                    "type": "`$STRING`"
                },
                {
                    "name": "cert_uuid",
                    "title": "Cert Uuid",
                    "type": "`$STRING`"
                },
                {
                    "name": "change_owner",
                    "title": "Change Owner",
                    "type": "`$BOOLEAN`",
                    "req": true
                },
                {
                    "name": "city",
                    "title": "City",
                    "type": "`$STRING`"
                },
                {
                    "name": "claims",
                    "title": "Claims",
                    "type": "`$STRING`"
                },
                {
                    "name": "contacts",
                    "title": "Contacts",
                    "type": "`$OBJECT`",
                    "req": true
                },
                {
                    "name": "corporate",
                    "title": "Corporate",
                    "type": "`$BOOLEAN`",
                    "req": true
                },
                {
                    "name": "country",
                    "title": "Country",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "created_at",
                    "title": "Created At",
                    "type": "`$STRING`",
                    "op": {
                        "load": {
                            "req": true,
                            "type": "`$STRING`"
                        }
                    },
                    "format": "date-time"
                },
                {
                    "name": "currency",
                    "title": "Currency",
                    "type": "`$STRING`"
                },
                {
                    "name": "data_obfuscated",
                    "title": "Data Obfuscated",
                    "type": "`$BOOLEAN`"
                },
                {
                    "name": "date_start",
                    "title": "Date Start",
                    "type": "`$STRING`"
                },
                {
                    "name": "dates",
                    "title": "Dates",
                    "type": "`$OBJECT`",
                    "req": true
                },
                {
                    "name": "domain_owner",
                    "title": "Domain Owner",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "duration",
                    "title": "Duration",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "email",
                    "title": "Email",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "enforce_premium",
                    "title": "Enforce Premium",
                    "type": "`$BOOLEAN`"
                },
                {
                    "name": "error",
                    "title": "Error",
                    "type": "`$STRING`"
                },
                {
                    "name": "errors",
                    "title": "Errors",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "errortype",
                    "title": "Errortype",
                    "type": "`$STRING`"
                },
                {
                    "name": "errortype_label",
                    "title": "Errortype Label",
                    "type": "`$STRING`"
                },
                {
                    "name": "ext_trade",
                    "title": "Ext Trade",
                    "type": "`$BOOLEAN`",
                    "req": true
                },
                {
                    "name": "extra_parameters",
                    "title": "Extra Parameters",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "family",
                    "title": "Family",
                    "type": "`$STRING`"
                },
                {
                    "name": "fax",
                    "title": "Fax",
                    "type": "`$STRING`"
                },
                {
                    "name": "foa",
                    "title": "Foa",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "fqdn",
                    "title": "Fqdn",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "fqdn_unicode",
                    "title": "Fqdn Unicode",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "full_tld",
                    "title": "Full Tld",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "given",
                    "title": "Given",
                    "type": "`$STRING`"
                },
                {
                    "name": "host",
                    "title": "Host",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "href",
                    "title": "Href",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "icann_contract_accept",
                    "title": "Icann Contract Accept",
                    "type": "`$BOOLEAN`"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`",
                    "op": {
                        "list": {
                            "req": true,
                            "type": "`$STRING`"
                        }
                    }
                },
                {
                    "name": "inner_step",
                    "title": "Inner Step",
                    "type": "`$STRING`"
                },
                {
                    "name": "ips",
                    "title": "Ips",
                    "type": "`$ARRAY`",
                    "req": true
                },
                {
                    "name": "jo_announce_number",
                    "title": "Jo Announce Number",
                    "type": "`$STRING`"
                },
                {
                    "name": "jo_announce_page",
                    "title": "Jo Announce Page",
                    "type": "`$STRING`"
                },
                {
                    "name": "jo_declaration_date",
                    "title": "Jo Declaration Date",
                    "type": "`$STRING`"
                },
                {
                    "name": "jo_publication_date",
                    "title": "Jo Publication Date",
                    "type": "`$STRING`"
                },
                {
                    "name": "lang",
                    "title": "Lang",
                    "type": "`$STRING`"
                },
                {
                    "name": "lock",
                    "title": "Lock",
                    "type": "`$BOOLEAN`",
                    "req": true
                },
                {
                    "name": "mail_obfuscated",
                    "title": "Mail Obfuscated",
                    "type": "`$BOOLEAN`"
                },
                {
                    "name": "mailbox_optin",
                    "title": "Mailbox Optin",
                    "type": "`$BOOLEAN`"
                },
                {
                    "name": "message",
                    "title": "Message",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "mobile",
                    "title": "Mobile",
                    "type": "`$STRING`"
                },
                {
                    "name": "name",
                    "title": "Name",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "nameserver",
                    "title": "Nameserver",
                    "type": "`$OBJECT`",
                    "req": true
                },
                {
                    "name": "nameservers",
                    "title": "Nameservers",
                    "type": "`$ARRAY`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$ARRAY`"
                        }
                    }
                },
                {
                    "name": "nameservers_ips",
                    "title": "Nameservers Ips",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "orga_owner",
                    "title": "Orga Owner",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "override",
                    "title": "Override",
                    "type": "`$BOOLEAN`"
                },
                {
                    "name": "owner",
                    "title": "Owner",
                    "type": "`$OBJECT`",
                    "req": true
                },
                {
                    "name": "owner_contact",
                    "title": "Owner Contact",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "params",
                    "title": "Params",
                    "type": "`$OBJECT`",
                    "req": true
                },
                {
                    "name": "phone",
                    "title": "Phone",
                    "type": "`$STRING`"
                },
                {
                    "name": "price",
                    "title": "Price",
                    "type": "`$NUMBER`"
                },
                {
                    "name": "protocol",
                    "title": "Protocol",
                    "type": "`$STRING`"
                },
                {
                    "name": "reachability",
                    "title": "Reachability",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "regac_at",
                    "title": "Regac At",
                    "type": "`$STRING`"
                },
                {
                    "name": "resellee_id",
                    "title": "Resellee Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "services",
                    "title": "Services",
                    "type": "`$ARRAY`",
                    "req": true
                },
                {
                    "name": "sharing_id",
                    "title": "Sharing Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "sharing_space",
                    "title": "Sharing Space",
                    "type": "`$OBJECT`",
                    "req": true
                },
                {
                    "name": "siren",
                    "title": "Siren",
                    "type": "`$STRING`"
                },
                {
                    "name": "smd",
                    "title": "Smd",
                    "type": "`$STRING`"
                },
                {
                    "name": "start_at",
                    "title": "Start At",
                    "type": "`$STRING`"
                },
                {
                    "name": "state",
                    "title": "State",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "update": {
                            "type": "`$STRING`"
                        }
                    }
                },
                {
                    "name": "status",
                    "title": "Status",
                    "type": "`$ARRAY`",
                    "req": true
                },
                {
                    "name": "step",
                    "title": "Step",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "step_nb",
                    "title": "Step Nb",
                    "type": "`$INTEGER`",
                    "req": true
                },
                {
                    "name": "streetaddr",
                    "title": "Streetaddr",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "tags",
                    "title": "Tags",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "tech",
                    "title": "Tech",
                    "type": "`$OBJECT`",
                    "req": true
                },
                {
                    "name": "template_id",
                    "title": "Template Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "tld",
                    "title": "Tld",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "tld_period",
                    "title": "Tld Period",
                    "type": "`$STRING`"
                },
                {
                    "name": "transfer_link",
                    "title": "Transfer Link",
                    "type": "`$STRING`"
                },
                {
                    "name": "transfer_procedure",
                    "title": "Transfer Procedure",
                    "type": "`$STRING`"
                },
                {
                    "name": "trustee_roles",
                    "title": "Trustee Roles",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "type",
                    "title": "Type",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "patch": {
                            "type": "`$STRING`"
                        }
                    }
                },
                {
                    "name": "updated_at",
                    "title": "Updated At",
                    "type": "`$STRING`",
                    "op": {
                        "load": {
                            "req": true,
                            "type": "`$STRING`"
                        }
                    },
                    "format": "date-time"
                },
                {
                    "name": "url",
                    "title": "Url",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "patch": {
                            "type": "`$STRING`"
                        }
                    }
                },
                {
                    "name": "validation",
                    "title": "Validation",
                    "type": "`$STRING`"
                },
                {
                    "name": "zip",
                    "title": "Zip",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "domain",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/domain/changeowner/{domain}",
                            "segments": [
                                {
                                    "lit": "domain"
                                },
                                {
                                    "lit": "changeowner"
                                },
                                {
                                    "var": "domain"
                                }
                            ],
                            "parts": [
                                "domain",
                                "changeowner",
                                "{domain}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "dry_run",
                                        "orig": "Dry-Run",
                                        "type": "`$INTEGER`",
                                        "kind": "header"
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "domain",
                                        "orig": "domain",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "sharing_id",
                                        "orig": "sharing_id",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "domain"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/domain/transferin/{domain}/available",
                            "segments": [
                                {
                                    "lit": "domain"
                                },
                                {
                                    "lit": "transferin"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "available"
                                }
                            ],
                            "parts": [
                                "domain",
                                "transferin",
                                "{id}",
                                "available"
                            ],
                            "rename": {
                                "param": {
                                    "domain": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "domain",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "available",
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/domain/domains/{domain}/claims",
                            "segments": [
                                {
                                    "lit": "domain"
                                },
                                {
                                    "lit": "domains"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "claims"
                                }
                            ],
                            "parts": [
                                "domain",
                                "domains",
                                "{id}",
                                "claims"
                            ],
                            "rename": {
                                "param": {
                                    "domain": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "domain",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "claim",
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/domain/domains/{domain}/dnskeys",
                            "segments": [
                                {
                                    "lit": "domain"
                                },
                                {
                                    "lit": "domains"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "dnskeys"
                                }
                            ],
                            "parts": [
                                "domain",
                                "domains",
                                "{id}",
                                "dnskeys"
                            ],
                            "rename": {
                                "param": {
                                    "domain": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "domain",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "dnskey",
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/domain/changeowner/{domain}/foa",
                            "segments": [
                                {
                                    "lit": "domain"
                                },
                                {
                                    "lit": "changeowner"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "foa"
                                }
                            ],
                            "parts": [
                                "domain",
                                "changeowner",
                                "{id}",
                                "foa"
                            ],
                            "rename": {
                                "param": {
                                    "domain": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "domain",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "foa",
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/domain/domains/{domain}/hosts",
                            "segments": [
                                {
                                    "lit": "domain"
                                },
                                {
                                    "lit": "domains"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "hosts"
                                }
                            ],
                            "parts": [
                                "domain",
                                "domains",
                                "{id}",
                                "hosts"
                            ],
                            "rename": {
                                "param": {
                                    "domain": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "domain",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "page",
                                        "orig": "page",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 1
                                    },
                                    {
                                        "name": "per_page",
                                        "orig": "per_page",
                                        "type": "`$INTEGER`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "$action": "host",
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/domain/domains/{domain}/livedns",
                            "segments": [
                                {
                                    "lit": "domain"
                                },
                                {
                                    "lit": "domains"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "livedns"
                                }
                            ],
                            "parts": [
                                "domain",
                                "domains",
                                "{id}",
                                "livedns"
                            ],
                            "rename": {
                                "param": {
                                    "domain": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "domain",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "livedn",
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/domain/domains/{domain}/livedns/dnssec",
                            "segments": [
                                {
                                    "lit": "domain"
                                },
                                {
                                    "lit": "domains"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "livedns"
                                },
                                {
                                    "lit": "dnssec"
                                }
                            ],
                            "parts": [
                                "domain",
                                "domains",
                                "{id}",
                                "livedns",
                                "dnssec"
                            ],
                            "rename": {
                                "param": {
                                    "domain": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "domain",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "sharing_id",
                                        "orig": "sharing_id",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "field": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/domain/transferin/{domain}/foa",
                            "segments": [
                                {
                                    "lit": "domain"
                                },
                                {
                                    "lit": "transferin"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "foa"
                                }
                            ],
                            "parts": [
                                "domain",
                                "transferin",
                                "{id}",
                                "foa"
                            ],
                            "rename": {
                                "param": {
                                    "domain": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "domain",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "foa",
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/domain/domains/{domain}/renew",
                            "segments": [
                                {
                                    "lit": "domain"
                                },
                                {
                                    "lit": "domains"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "renew"
                                }
                            ],
                            "parts": [
                                "domain",
                                "domains",
                                "{id}",
                                "renew"
                            ],
                            "rename": {
                                "param": {
                                    "domain": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "dry_run",
                                        "orig": "Dry-Run",
                                        "type": "`$INTEGER`",
                                        "kind": "header"
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "domain",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "sharing_id",
                                        "orig": "sharing_id",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "$action": "renew",
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/domain/domains/{domain}/restore",
                            "segments": [
                                {
                                    "lit": "domain"
                                },
                                {
                                    "lit": "domains"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "restore"
                                }
                            ],
                            "parts": [
                                "domain",
                                "domains",
                                "{id}",
                                "restore"
                            ],
                            "rename": {
                                "param": {
                                    "domain": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "domain",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "sharing_id",
                                        "orig": "sharing_id",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "$action": "restore",
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/domain/domains/{domain}/tags",
                            "segments": [
                                {
                                    "lit": "domain"
                                },
                                {
                                    "lit": "domains"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "tags"
                                }
                            ],
                            "parts": [
                                "domain",
                                "domains",
                                "{id}",
                                "tags"
                            ],
                            "rename": {
                                "param": {
                                    "domain": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "domain",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "tag",
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/domain/domains/{domain}/transferout",
                            "segments": [
                                {
                                    "lit": "domain"
                                },
                                {
                                    "lit": "domains"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "transferout"
                                }
                            ],
                            "parts": [
                                "domain",
                                "domains",
                                "{id}",
                                "transferout"
                            ],
                            "rename": {
                                "param": {
                                    "domain": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "domain",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "transferout",
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/domain/domains/{domain}/webredirs",
                            "segments": [
                                {
                                    "lit": "domain"
                                },
                                {
                                    "lit": "domains"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "webredirs"
                                }
                            ],
                            "parts": [
                                "domain",
                                "domains",
                                "{id}",
                                "webredirs"
                            ],
                            "rename": {
                                "param": {
                                    "domain": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "domain",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "page",
                                        "orig": "page",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 1
                                    },
                                    {
                                        "name": "per_page",
                                        "orig": "per_page",
                                        "type": "`$INTEGER`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "$action": "webredir",
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/domain/domains",
                            "segments": [
                                {
                                    "lit": "domain"
                                },
                                {
                                    "lit": "domains"
                                }
                            ],
                            "parts": [
                                "domain",
                                "domains"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "dry_run",
                                        "orig": "Dry-Run",
                                        "type": "`$INTEGER`",
                                        "kind": "header"
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "sharing_id",
                                        "orig": "sharing_id",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/domain/transferin",
                            "segments": [
                                {
                                    "lit": "domain"
                                },
                                {
                                    "lit": "transferin"
                                }
                            ],
                            "parts": [
                                "domain",
                                "transferin"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "dry_run",
                                        "orig": "Dry-Run",
                                        "type": "`$INTEGER`",
                                        "kind": "header"
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "sharing_id",
                                        "orig": "sharing_id",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "$action": "transferin"
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/domain/check",
                            "segments": [
                                {
                                    "lit": "domain"
                                },
                                {
                                    "lit": "check"
                                }
                            ],
                            "parts": [
                                "domain",
                                "check"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.products`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "country",
                                        "orig": "country",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "field": true
                                    },
                                    {
                                        "name": "currency",
                                        "orig": "currency",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "field": true
                                    },
                                    {
                                        "name": "duration_unit",
                                        "orig": "duration_unit",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "extension",
                                        "orig": "extension",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "grid",
                                        "orig": "grid",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "lang",
                                        "orig": "lang",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "field": true
                                    },
                                    {
                                        "name": "max_duration",
                                        "orig": "max_duration",
                                        "type": "`$INTEGER`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "name",
                                        "orig": "name",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true,
                                        "field": true
                                    },
                                    {
                                        "name": "period",
                                        "orig": "period",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "process",
                                        "orig": "processes",
                                        "type": "`$ARRAY`",
                                        "kind": "query",
                                        "example": [
                                            "create"
                                        ]
                                    },
                                    {
                                        "name": "sharing_id",
                                        "orig": "sharing_id",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "field": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "check",
                                "exist": [
                                    "name"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/domain/domains/{domain}/claims",
                            "segments": [
                                {
                                    "lit": "domain"
                                },
                                {
                                    "lit": "domains"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "claims"
                                }
                            ],
                            "parts": [
                                "domain",
                                "domains",
                                "{id}",
                                "claims"
                            ],
                            "rename": {
                                "param": {
                                    "domain": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.claims`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "domain",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "claim",
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/domain/domains/{domain}/dnskeys",
                            "segments": [
                                {
                                    "lit": "domain"
                                },
                                {
                                    "lit": "domains"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "dnskeys"
                                }
                            ],
                            "parts": [
                                "domain",
                                "domains",
                                "{id}",
                                "dnskeys"
                            ],
                            "rename": {
                                "param": {
                                    "domain": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "domain",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "page",
                                        "orig": "page",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 1
                                    },
                                    {
                                        "name": "per_page",
                                        "orig": "per_page",
                                        "type": "`$INTEGER`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "$action": "dnskey",
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/domain/domains/{domain}/hosts",
                            "segments": [
                                {
                                    "lit": "domain"
                                },
                                {
                                    "lit": "domains"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "hosts"
                                }
                            ],
                            "parts": [
                                "domain",
                                "domains",
                                "{id}",
                                "hosts"
                            ],
                            "rename": {
                                "param": {
                                    "domain": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "domain",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "page",
                                        "orig": "page",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 1
                                    },
                                    {
                                        "name": "per_page",
                                        "orig": "per_page",
                                        "type": "`$INTEGER`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "$action": "host",
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/domain/domains/{domain}/livedns",
                            "segments": [
                                {
                                    "lit": "domain"
                                },
                                {
                                    "lit": "domains"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "livedns"
                                }
                            ],
                            "parts": [
                                "domain",
                                "domains",
                                "{id}",
                                "livedns"
                            ],
                            "rename": {
                                "param": {
                                    "domain": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.nameservers`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "domain",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "livedn",
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/domain/domains/{domain}/nameservers",
                            "segments": [
                                {
                                    "lit": "domain"
                                },
                                {
                                    "lit": "domains"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "nameservers"
                                }
                            ],
                            "parts": [
                                "domain",
                                "domains",
                                "{id}",
                                "nameservers"
                            ],
                            "rename": {
                                "param": {
                                    "domain": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "domain",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "nameserver",
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/domain/domains/{domain}/renew",
                            "segments": [
                                {
                                    "lit": "domain"
                                },
                                {
                                    "lit": "domains"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "renew"
                                }
                            ],
                            "parts": [
                                "domain",
                                "domains",
                                "{id}",
                                "renew"
                            ],
                            "rename": {
                                "param": {
                                    "domain": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.durations`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "domain",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "renew",
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/domain/domains/{domain}/restore",
                            "segments": [
                                {
                                    "lit": "domain"
                                },
                                {
                                    "lit": "domains"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "restore"
                                }
                            ],
                            "parts": [
                                "domain",
                                "domains",
                                "{id}",
                                "restore"
                            ],
                            "rename": {
                                "param": {
                                    "domain": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.contracts`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "domain",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "restore",
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/domain/domains/{domain}/tags",
                            "segments": [
                                {
                                    "lit": "domain"
                                },
                                {
                                    "lit": "domains"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "tags"
                                }
                            ],
                            "parts": [
                                "domain",
                                "domains",
                                "{id}",
                                "tags"
                            ],
                            "rename": {
                                "param": {
                                    "domain": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "domain",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "tag",
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/domain/domains/{domain}/webredirs",
                            "segments": [
                                {
                                    "lit": "domain"
                                },
                                {
                                    "lit": "domains"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "webredirs"
                                }
                            ],
                            "parts": [
                                "domain",
                                "domains",
                                "{id}",
                                "webredirs"
                            ],
                            "rename": {
                                "param": {
                                    "domain": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "domain",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "page",
                                        "orig": "page",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 1
                                    },
                                    {
                                        "name": "per_page",
                                        "orig": "per_page",
                                        "type": "`$INTEGER`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "$action": "webredir",
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/domain/domains",
                            "segments": [
                                {
                                    "lit": "domain"
                                },
                                {
                                    "lit": "domains"
                                }
                            ],
                            "parts": [
                                "domain",
                                "domains"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "fqdn",
                                        "orig": "fqdn",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "field": true
                                    },
                                    {
                                        "name": "nameserver",
                                        "orig": "nameserver",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "field": true
                                    },
                                    {
                                        "name": "page",
                                        "orig": "page",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 1
                                    },
                                    {
                                        "name": "per_page",
                                        "orig": "per_page",
                                        "type": "`$INTEGER`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "resellee_id",
                                        "orig": "resellee_id",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "field": true
                                    },
                                    {
                                        "name": "sharing_id",
                                        "orig": "sharing_id",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "field": true
                                    },
                                    {
                                        "name": "sort_by",
                                        "orig": "sort_by",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "fqdn"
                                    },
                                    {
                                        "name": "tld",
                                        "orig": "tld",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "field": true
                                    }
                                ]
                            },
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/domain/tlds",
                            "segments": [
                                {
                                    "lit": "domain"
                                },
                                {
                                    "lit": "tlds"
                                }
                            ],
                            "parts": [
                                "domain",
                                "tlds"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "category",
                                        "orig": "category",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "field": true
                                    },
                                    {
                                        "name": "page",
                                        "orig": "page",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 1
                                    },
                                    {
                                        "name": "per_page",
                                        "orig": "per_page",
                                        "type": "`$INTEGER`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "$action": "tld"
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/domain/domains/{domain}/webredirs/{host}",
                            "segments": [
                                {
                                    "lit": "domain"
                                },
                                {
                                    "lit": "domains"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "webredirs"
                                },
                                {
                                    "var": "host"
                                }
                            ],
                            "parts": [
                                "domain",
                                "domains",
                                "{id}",
                                "webredirs",
                                "{host}"
                            ],
                            "rename": {
                                "param": {
                                    "domain": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "host",
                                        "orig": "host",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "id",
                                        "orig": "domain",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "host",
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/domain/domains/{domain}/hosts/{name}",
                            "segments": [
                                {
                                    "lit": "domain"
                                },
                                {
                                    "lit": "domains"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "hosts"
                                },
                                {
                                    "var": "name"
                                }
                            ],
                            "parts": [
                                "domain",
                                "domains",
                                "{id}",
                                "hosts",
                                "{name}"
                            ],
                            "rename": {
                                "param": {
                                    "domain": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "domain",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "name",
                                        "orig": "name",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id",
                                    "name"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/domain/changeowner/{domain}",
                            "segments": [
                                {
                                    "lit": "domain"
                                },
                                {
                                    "lit": "changeowner"
                                },
                                {
                                    "var": "domain"
                                }
                            ],
                            "parts": [
                                "domain",
                                "changeowner",
                                "{domain}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "domain",
                                        "orig": "domain",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "sharing_id",
                                        "orig": "sharing_id",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "field": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "domain"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/domain/transferin/{domain}",
                            "segments": [
                                {
                                    "lit": "domain"
                                },
                                {
                                    "lit": "transferin"
                                },
                                {
                                    "var": "domain"
                                }
                            ],
                            "parts": [
                                "domain",
                                "transferin",
                                "{domain}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "domain",
                                        "orig": "domain",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "domain"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/domain/domains/{domain}",
                            "segments": [
                                {
                                    "lit": "domain"
                                },
                                {
                                    "lit": "domains"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "domain",
                                "domains",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "domain": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "domain",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/domain/domains/{domain}/contacts",
                            "segments": [
                                {
                                    "lit": "domain"
                                },
                                {
                                    "lit": "domains"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "contacts"
                                }
                            ],
                            "parts": [
                                "domain",
                                "domains",
                                "{id}",
                                "contacts"
                            ],
                            "rename": {
                                "param": {
                                    "domain": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "domain",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "contact",
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/domain/domains/{domain}/createstatus",
                            "segments": [
                                {
                                    "lit": "domain"
                                },
                                {
                                    "lit": "domains"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "createstatus"
                                }
                            ],
                            "parts": [
                                "domain",
                                "domains",
                                "{id}",
                                "createstatus"
                            ],
                            "rename": {
                                "param": {
                                    "domain": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "domain",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "createstatus",
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/domain/domains/{domain}/livedns/dnssec",
                            "segments": [
                                {
                                    "lit": "domain"
                                },
                                {
                                    "lit": "domains"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "livedns"
                                },
                                {
                                    "lit": "dnssec"
                                }
                            ],
                            "parts": [
                                "domain",
                                "domains",
                                "{id}",
                                "livedns",
                                "dnssec"
                            ],
                            "rename": {
                                "param": {
                                    "domain": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "domain",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/domain/tlds/{name}",
                            "segments": [
                                {
                                    "lit": "domain"
                                },
                                {
                                    "lit": "tlds"
                                },
                                {
                                    "var": "name"
                                }
                            ],
                            "parts": [
                                "domain",
                                "tlds",
                                "{name}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "name",
                                        "orig": "name",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "name"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "patch": {
                    "input": "data",
                    "name": "patch",
                    "points": [
                        {
                            "kind": "http",
                            "method": "PATCH",
                            "orig": "/domain/domains/{domain}/webredirs/{host}",
                            "segments": [
                                {
                                    "lit": "domain"
                                },
                                {
                                    "lit": "domains"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "webredirs"
                                },
                                {
                                    "var": "host"
                                }
                            ],
                            "parts": [
                                "domain",
                                "domains",
                                "{id}",
                                "webredirs",
                                "{host}"
                            ],
                            "rename": {
                                "param": {
                                    "domain": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "host",
                                        "orig": "host",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "id",
                                        "orig": "domain",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "host",
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "PATCH",
                            "orig": "/domain/domains/{domain}/autorenew",
                            "segments": [
                                {
                                    "lit": "domain"
                                },
                                {
                                    "lit": "domains"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "autorenew"
                                }
                            ],
                            "parts": [
                                "domain",
                                "domains",
                                "{id}",
                                "autorenew"
                            ],
                            "rename": {
                                "param": {
                                    "domain": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "domain",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "autorenew",
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "PATCH",
                            "orig": "/domain/domains/{domain}/contacts",
                            "segments": [
                                {
                                    "lit": "domain"
                                },
                                {
                                    "lit": "domains"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "contacts"
                                }
                            ],
                            "parts": [
                                "domain",
                                "domains",
                                "{id}",
                                "contacts"
                            ],
                            "rename": {
                                "param": {
                                    "domain": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "domain",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "contact",
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "PATCH",
                            "orig": "/domain/domains/{domain}/reachability",
                            "segments": [
                                {
                                    "lit": "domain"
                                },
                                {
                                    "lit": "domains"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "reachability"
                                }
                            ],
                            "parts": [
                                "domain",
                                "domains",
                                "{id}",
                                "reachability"
                            ],
                            "rename": {
                                "param": {
                                    "domain": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "domain",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "reachability",
                                "exist": [
                                    "id"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "PATCH",
                            "orig": "/domain/domains/{domain}/status",
                            "segments": [
                                {
                                    "lit": "domain"
                                },
                                {
                                    "lit": "domains"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "status"
                                }
                            ],
                            "parts": [
                                "domain",
                                "domains",
                                "{id}",
                                "status"
                            ],
                            "rename": {
                                "param": {
                                    "domain": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "domain",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "status",
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "PATCH",
                            "orig": "/domain/domains/{domain}/tags",
                            "segments": [
                                {
                                    "lit": "domain"
                                },
                                {
                                    "lit": "domains"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "tags"
                                }
                            ],
                            "parts": [
                                "domain",
                                "domains",
                                "{id}",
                                "tags"
                            ],
                            "rename": {
                                "param": {
                                    "domain": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "domain",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "tag",
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/domain/domains/{domain}/dnskeys/{id}",
                            "segments": [
                                {
                                    "lit": "domain"
                                },
                                {
                                    "lit": "domains"
                                },
                                {
                                    "var": "domain"
                                },
                                {
                                    "lit": "dnskeys"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "domain",
                                "domains",
                                "{domain}",
                                "dnskeys",
                                "{id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "domain",
                                        "orig": "domain",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "id",
                                        "orig": "id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "domain",
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/domain/domains/{domain}/webredirs/{host}",
                            "segments": [
                                {
                                    "lit": "domain"
                                },
                                {
                                    "lit": "domains"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "webredirs"
                                },
                                {
                                    "var": "host"
                                }
                            ],
                            "parts": [
                                "domain",
                                "domains",
                                "{id}",
                                "webredirs",
                                "{host}"
                            ],
                            "rename": {
                                "param": {
                                    "domain": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "host",
                                        "orig": "host",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "id",
                                        "orig": "domain",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "host",
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/domain/domains/{domain}/hosts/{name}",
                            "segments": [
                                {
                                    "lit": "domain"
                                },
                                {
                                    "lit": "domains"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "hosts"
                                },
                                {
                                    "var": "name"
                                }
                            ],
                            "parts": [
                                "domain",
                                "domains",
                                "{id}",
                                "hosts",
                                "{name}"
                            ],
                            "rename": {
                                "param": {
                                    "domain": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "domain",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "name",
                                        "orig": "name",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id",
                                    "name"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/domain/domains/{domain}",
                            "segments": [
                                {
                                    "lit": "domain"
                                },
                                {
                                    "lit": "domains"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "domain",
                                "domains",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "domain": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "domain",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/domain/domains/{domain}/livedns/dnssec",
                            "segments": [
                                {
                                    "lit": "domain"
                                },
                                {
                                    "lit": "domains"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "livedns"
                                },
                                {
                                    "lit": "dnssec"
                                }
                            ],
                            "parts": [
                                "domain",
                                "domains",
                                "{id}",
                                "livedns",
                                "dnssec"
                            ],
                            "rename": {
                                "param": {
                                    "domain": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "domain",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "sharing_id",
                                        "orig": "sharing_id",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "field": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/domain/domains/{domain}/tags",
                            "segments": [
                                {
                                    "lit": "domain"
                                },
                                {
                                    "lit": "domains"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "tags"
                                }
                            ],
                            "parts": [
                                "domain",
                                "domains",
                                "{id}",
                                "tags"
                            ],
                            "rename": {
                                "param": {
                                    "domain": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "domain",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "tag",
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "update": {
                    "input": "data",
                    "name": "update",
                    "points": [
                        {
                            "kind": "http",
                            "method": "PUT",
                            "orig": "/domain/domains/{domain}/hosts/{name}",
                            "segments": [
                                {
                                    "lit": "domain"
                                },
                                {
                                    "lit": "domains"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "hosts"
                                },
                                {
                                    "var": "name"
                                }
                            ],
                            "parts": [
                                "domain",
                                "domains",
                                "{id}",
                                "hosts",
                                "{name}"
                            ],
                            "rename": {
                                "param": {
                                    "domain": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "domain",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "name",
                                        "orig": "name",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id",
                                    "name"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "PUT",
                            "orig": "/domain/transferin/{domain}",
                            "segments": [
                                {
                                    "lit": "domain"
                                },
                                {
                                    "lit": "transferin"
                                },
                                {
                                    "var": "domain"
                                }
                            ],
                            "parts": [
                                "domain",
                                "transferin",
                                "{domain}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "domain",
                                        "orig": "domain",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "domain"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "PUT",
                            "orig": "/domain/domains/{domain}/authinfo",
                            "segments": [
                                {
                                    "lit": "domain"
                                },
                                {
                                    "lit": "domains"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "authinfo"
                                }
                            ],
                            "parts": [
                                "domain",
                                "domains",
                                "{id}",
                                "authinfo"
                            ],
                            "rename": {
                                "param": {
                                    "domain": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "domain",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "authinfo",
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "PUT",
                            "orig": "/domain/domains/{domain}/contacts/owner",
                            "segments": [
                                {
                                    "lit": "domain"
                                },
                                {
                                    "lit": "domains"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "contacts"
                                },
                                {
                                    "lit": "owner"
                                }
                            ],
                            "parts": [
                                "domain",
                                "domains",
                                "{id}",
                                "contacts",
                                "owner"
                            ],
                            "rename": {
                                "param": {
                                    "domain": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "dry_run",
                                        "orig": "Dry-Run",
                                        "type": "`$INTEGER`",
                                        "kind": "header"
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "domain",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "PUT",
                            "orig": "/domain/transferin/{domain}/authinfo",
                            "segments": [
                                {
                                    "lit": "domain"
                                },
                                {
                                    "lit": "transferin"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "authinfo"
                                }
                            ],
                            "parts": [
                                "domain",
                                "transferin",
                                "{id}",
                                "authinfo"
                            ],
                            "rename": {
                                "param": {
                                    "domain": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "domain",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "sharing_id",
                                        "orig": "sharing_id",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "$action": "authinfo",
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "PUT",
                            "orig": "/domain/domains/{domain}/dnskeys",
                            "segments": [
                                {
                                    "lit": "domain"
                                },
                                {
                                    "lit": "domains"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "dnskeys"
                                }
                            ],
                            "parts": [
                                "domain",
                                "domains",
                                "{id}",
                                "dnskeys"
                            ],
                            "rename": {
                                "param": {
                                    "domain": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "domain",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "dnskey",
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "PUT",
                            "orig": "/domain/domains/{domain}/nameservers",
                            "segments": [
                                {
                                    "lit": "domain"
                                },
                                {
                                    "lit": "domains"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "nameservers"
                                }
                            ],
                            "parts": [
                                "domain",
                                "domains",
                                "{id}",
                                "nameservers"
                            ],
                            "rename": {
                                "param": {
                                    "domain": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "domain",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "nameserver",
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "PUT",
                            "orig": "/domain/domains/{domain}/tags",
                            "segments": [
                                {
                                    "lit": "domain"
                                },
                                {
                                    "lit": "domains"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "tags"
                                }
                            ],
                            "parts": [
                                "domain",
                                "domains",
                                "{id}",
                                "tags"
                            ],
                            "rename": {
                                "param": {
                                    "domain": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "domain",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "tag",
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "email": {
            "fields": [
                {
                    "name": "address",
                    "title": "Address",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "alias_count",
                    "title": "Alias Count",
                    "type": "`$INTEGER`",
                    "op": {
                        "list": {
                            "req": true,
                            "type": "`$INTEGER`"
                        }
                    }
                },
                {
                    "name": "aliases",
                    "title": "Aliases",
                    "type": "`$ARRAY`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$ARRAY`"
                        },
                        "patch": {
                            "type": "`$ARRAY`"
                        }
                    }
                },
                {
                    "name": "antispam",
                    "title": "Antispam",
                    "type": "`$BOOLEAN`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$BOOLEAN`"
                        },
                        "patch": {
                            "type": "`$BOOLEAN`"
                        }
                    }
                },
                {
                    "name": "autorenew",
                    "title": "Autorenew",
                    "type": "`$OBJECT`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$BOOLEAN`"
                        }
                    }
                },
                {
                    "name": "available",
                    "title": "Available",
                    "type": "`$BOOLEAN`",
                    "req": true
                },
                {
                    "name": "capacity",
                    "title": "Capacity",
                    "type": "`$INTEGER`",
                    "req": true
                },
                {
                    "name": "created_at",
                    "title": "Created At",
                    "type": "`$STRING`",
                    "req": true,
                    "format": "date-time"
                },
                {
                    "name": "currency",
                    "title": "Currency",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "destinations",
                    "title": "Destinations",
                    "type": "`$ARRAY`",
                    "req": true
                },
                {
                    "name": "dkim",
                    "title": "Dkim",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "domain",
                    "title": "Domain",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "duration",
                    "title": "Duration",
                    "type": "`$INTEGER`",
                    "req": true
                },
                {
                    "name": "errors",
                    "title": "Errors",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "expires_at",
                    "title": "Expires At",
                    "type": "`$STRING`",
                    "req": true,
                    "format": "date-time"
                },
                {
                    "name": "fallback_email",
                    "title": "Fallback Email",
                    "type": "`$STRING`"
                },
                {
                    "name": "forward_count",
                    "title": "Forward Count",
                    "type": "`$INTEGER`",
                    "req": true
                },
                {
                    "name": "free_mailboxes",
                    "title": "Free Mailboxes",
                    "type": "`$INTEGER`",
                    "req": true
                },
                {
                    "name": "href",
                    "title": "Href",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "included_mailboxes",
                    "title": "Included Mailboxes",
                    "type": "`$INTEGER`",
                    "req": true
                },
                {
                    "name": "info",
                    "title": "Info",
                    "type": "`$ARRAY`",
                    "req": true
                },
                {
                    "name": "login",
                    "title": "Login",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "patch": {
                            "type": "`$STRING`"
                        }
                    }
                },
                {
                    "name": "mailbox_type",
                    "title": "Mailbox Type",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "patch": {
                            "type": "`$STRING`"
                        }
                    }
                },
                {
                    "name": "message",
                    "title": "Message",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "packmail",
                    "title": "Packmail",
                    "type": "`$BOOLEAN`",
                    "req": true
                },
                {
                    "name": "password",
                    "title": "Password",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "patch": {
                            "type": "`$STRING`"
                        }
                    }
                },
                {
                    "name": "price_v1",
                    "title": "Price V1",
                    "type": "`$NUMBER`",
                    "req": true
                },
                {
                    "name": "price_v2",
                    "title": "Price V2",
                    "type": "`$NUMBER`",
                    "req": true
                },
                {
                    "name": "quota_used",
                    "title": "Quota Used",
                    "type": "`$INTEGER`",
                    "req": true
                },
                {
                    "name": "quota_v1",
                    "title": "Quota V1",
                    "type": "`$NUMBER`",
                    "req": true
                },
                {
                    "name": "refund_amount",
                    "title": "Refund Amount",
                    "type": "`$NUMBER`"
                },
                {
                    "name": "refund_currency",
                    "title": "Refund Currency",
                    "type": "`$STRING`"
                },
                {
                    "name": "refundable",
                    "title": "Refundable",
                    "type": "`$BOOLEAN`",
                    "req": true
                },
                {
                    "name": "responder",
                    "title": "Responder",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "source",
                    "title": "Source",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "status",
                    "title": "Status",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "to_convert",
                    "title": "To Convert",
                    "type": "`$BOOLEAN`",
                    "req": true
                },
                {
                    "name": "token",
                    "title": "Token",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "usage_v1",
                    "title": "Usage V1",
                    "type": "`$NUMBER`",
                    "req": true
                },
                {
                    "name": "version",
                    "title": "Version",
                    "type": "`$INTEGER`",
                    "req": true
                }
            ],
            "id": {
                "field": "id",
                "from": {
                    "domain": "domain"
                },
                "name": "id",
                "parts": [
                    "domain",
                    "mailbox_id"
                ],
                "sep": "/"
            },
            "name": "email",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/email/mailboxes/{domain}/{email}/renew",
                            "segments": [
                                {
                                    "lit": "email"
                                },
                                {
                                    "lit": "mailboxes"
                                },
                                {
                                    "var": "domain"
                                },
                                {
                                    "var": "email"
                                },
                                {
                                    "lit": "renew"
                                }
                            ],
                            "parts": [
                                "email",
                                "mailboxes",
                                "{domain}",
                                "{email}",
                                "renew"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "dry_run",
                                        "orig": "Dry-Run",
                                        "type": "`$INTEGER`",
                                        "kind": "header"
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "domain",
                                        "orig": "domain",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "email",
                                        "orig": "email",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "sharing_id",
                                        "orig": "sharing_id",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "$action": "renew",
                                "exist": [
                                    "domain",
                                    "email"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/email/forwards/{domain}",
                            "segments": [
                                {
                                    "lit": "email"
                                },
                                {
                                    "lit": "forwards"
                                },
                                {
                                    "var": "domain"
                                }
                            ],
                            "parts": [
                                "email",
                                "forwards",
                                "{domain}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "domain",
                                        "orig": "domain",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "domain"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/email/mailboxes/{domain}",
                            "segments": [
                                {
                                    "lit": "email"
                                },
                                {
                                    "lit": "mailboxes"
                                },
                                {
                                    "var": "domain"
                                }
                            ],
                            "parts": [
                                "email",
                                "mailboxes",
                                "{domain}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "dry_run",
                                        "orig": "Dry-Run",
                                        "type": "`$INTEGER`",
                                        "kind": "header"
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "domain",
                                        "orig": "domain",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "domain"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/email/mailboxes/{domain}/renew",
                            "segments": [
                                {
                                    "lit": "email"
                                },
                                {
                                    "lit": "mailboxes"
                                },
                                {
                                    "var": "domain"
                                },
                                {
                                    "lit": "renew"
                                }
                            ],
                            "parts": [
                                "email",
                                "mailboxes",
                                "{domain}",
                                "renew"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "dry_run",
                                        "orig": "Dry-Run",
                                        "type": "`$INTEGER`",
                                        "kind": "header"
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "domain",
                                        "orig": "domain",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "sharing_id",
                                        "orig": "sharing_id",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "$action": "renew",
                                "exist": [
                                    "domain"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/email/migration/{domain}",
                            "segments": [
                                {
                                    "lit": "email"
                                },
                                {
                                    "lit": "migration"
                                },
                                {
                                    "var": "domain"
                                }
                            ],
                            "parts": [
                                "email",
                                "migration",
                                "{domain}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "domain",
                                        "orig": "domain",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "sharing_id",
                                        "orig": "sharing_id",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "domain"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/email/slots/{domain}",
                            "segments": [
                                {
                                    "lit": "email"
                                },
                                {
                                    "lit": "slots"
                                },
                                {
                                    "var": "domain"
                                }
                            ],
                            "parts": [
                                "email",
                                "slots",
                                "{domain}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "domain",
                                        "orig": "domain",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "sharing_id",
                                        "orig": "sharing_id",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "domain"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/email/forwards/{domain}",
                            "segments": [
                                {
                                    "lit": "email"
                                },
                                {
                                    "lit": "forwards"
                                },
                                {
                                    "var": "domain"
                                }
                            ],
                            "parts": [
                                "email",
                                "forwards",
                                "{domain}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "domain",
                                        "orig": "domain",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "destination",
                                        "orig": "destination",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "page",
                                        "orig": "page",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 1
                                    },
                                    {
                                        "name": "per_page",
                                        "orig": "per_page",
                                        "type": "`$INTEGER`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "sort_by",
                                        "orig": "sort_by",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "source"
                                    },
                                    {
                                        "name": "source",
                                        "orig": "source",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "field": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "domain"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/email/mailboxes/{domain}",
                            "segments": [
                                {
                                    "lit": "email"
                                },
                                {
                                    "lit": "mailboxes"
                                },
                                {
                                    "var": "domain"
                                }
                            ],
                            "parts": [
                                "email",
                                "mailboxes",
                                "{domain}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "domain",
                                        "orig": "domain",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "<created_at",
                                        "orig": "<created_at",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "antispam",
                                        "orig": "antispam",
                                        "type": "`$BOOLEAN`",
                                        "kind": "query",
                                        "field": true
                                    },
                                    {
                                        "name": "login",
                                        "orig": "login",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "field": true
                                    },
                                    {
                                        "name": "mailbox_type",
                                        "orig": "mailbox_type",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "field": true
                                    },
                                    {
                                        "name": "page",
                                        "orig": "page",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 1
                                    },
                                    {
                                        "name": "per_page",
                                        "orig": "per_page",
                                        "type": "`$INTEGER`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "~login",
                                        "orig": "~login",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "domain"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/email/slots/{domain}",
                            "segments": [
                                {
                                    "lit": "email"
                                },
                                {
                                    "lit": "slots"
                                },
                                {
                                    "var": "domain"
                                }
                            ],
                            "parts": [
                                "email",
                                "slots",
                                "{domain}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "domain",
                                        "orig": "domain",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "display_not_expired_and_inactive",
                                        "orig": "display_not_expired_and_inactive",
                                        "type": "`$BOOLEAN`",
                                        "kind": "query",
                                        "example": false
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "domain"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/email/mailboxes/{domain}/{mailbox_id}",
                            "segments": [
                                {
                                    "lit": "email"
                                },
                                {
                                    "lit": "mailboxes"
                                },
                                {
                                    "var": "domain"
                                },
                                {
                                    "var": "mailbox_id"
                                }
                            ],
                            "parts": [
                                "email",
                                "mailboxes",
                                "{domain}",
                                "{mailbox_id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "domain",
                                        "orig": "domain",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "mailbox_id",
                                        "orig": "mailbox_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "domain",
                                    "mailbox_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/email/slots/{domain}/{slot_id}",
                            "segments": [
                                {
                                    "lit": "email"
                                },
                                {
                                    "lit": "slots"
                                },
                                {
                                    "var": "domain"
                                },
                                {
                                    "var": "slot_id"
                                }
                            ],
                            "parts": [
                                "email",
                                "slots",
                                "{domain}",
                                "{slot_id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "domain",
                                        "orig": "domain",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "slot_id",
                                        "orig": "slot_id",
                                        "type": "`$INTEGER`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "domain",
                                    "slot_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/email/migration/{domain}",
                            "segments": [
                                {
                                    "lit": "email"
                                },
                                {
                                    "lit": "migration"
                                },
                                {
                                    "var": "domain"
                                }
                            ],
                            "parts": [
                                "email",
                                "migration",
                                "{domain}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "domain",
                                        "orig": "domain",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "sharing_id",
                                        "orig": "sharing_id",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "domain"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/email/offers/{domain}",
                            "segments": [
                                {
                                    "lit": "email"
                                },
                                {
                                    "lit": "offers"
                                },
                                {
                                    "var": "domain"
                                }
                            ],
                            "parts": [
                                "email",
                                "offers",
                                "{domain}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "domain",
                                        "orig": "domain",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "domain"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "patch": {
                    "input": "data",
                    "name": "patch",
                    "points": [
                        {
                            "kind": "http",
                            "method": "PATCH",
                            "orig": "/email/mailboxes/{domain}/{mailbox_id}",
                            "segments": [
                                {
                                    "lit": "email"
                                },
                                {
                                    "lit": "mailboxes"
                                },
                                {
                                    "var": "domain"
                                },
                                {
                                    "var": "mailbox_id"
                                }
                            ],
                            "parts": [
                                "email",
                                "mailboxes",
                                "{domain}",
                                "{mailbox_id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "domain",
                                        "orig": "domain",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "mailbox_id",
                                        "orig": "mailbox_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "sharing_id",
                                        "orig": "sharing_id",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "domain",
                                    "mailbox_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "PATCH",
                            "orig": "/email/offers/{domain}",
                            "segments": [
                                {
                                    "lit": "email"
                                },
                                {
                                    "lit": "offers"
                                },
                                {
                                    "var": "domain"
                                }
                            ],
                            "parts": [
                                "email",
                                "offers",
                                "{domain}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "domain",
                                        "orig": "domain",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "domain"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/email/mailboxes/{domain}/{mailbox_id}",
                            "segments": [
                                {
                                    "lit": "email"
                                },
                                {
                                    "lit": "mailboxes"
                                },
                                {
                                    "var": "domain"
                                },
                                {
                                    "var": "mailbox_id"
                                }
                            ],
                            "parts": [
                                "email",
                                "mailboxes",
                                "{domain}",
                                "{mailbox_id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "domain",
                                        "orig": "domain",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "mailbox_id",
                                        "orig": "mailbox_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "domain",
                                    "mailbox_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/email/mailboxes/{domain}/{mailbox_id}/contents",
                            "segments": [
                                {
                                    "lit": "email"
                                },
                                {
                                    "lit": "mailboxes"
                                },
                                {
                                    "var": "domain"
                                },
                                {
                                    "var": "mailbox_id"
                                },
                                {
                                    "lit": "contents"
                                }
                            ],
                            "parts": [
                                "email",
                                "mailboxes",
                                "{domain}",
                                "{mailbox_id}",
                                "contents"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "domain",
                                        "orig": "domain",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "mailbox_id",
                                        "orig": "mailbox_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "domain",
                                    "mailbox_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/email/slots/{domain}/{slot_id}",
                            "segments": [
                                {
                                    "lit": "email"
                                },
                                {
                                    "lit": "slots"
                                },
                                {
                                    "var": "domain"
                                },
                                {
                                    "var": "slot_id"
                                }
                            ],
                            "parts": [
                                "email",
                                "slots",
                                "{domain}",
                                "{slot_id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "domain",
                                        "orig": "domain",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "slot_id",
                                        "orig": "slot_id",
                                        "type": "`$INTEGER`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "domain",
                                    "slot_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/email/forwards/{domain}/{source}",
                            "segments": [
                                {
                                    "lit": "email"
                                },
                                {
                                    "lit": "forwards"
                                },
                                {
                                    "var": "domain"
                                },
                                {
                                    "var": "source"
                                }
                            ],
                            "parts": [
                                "email",
                                "forwards",
                                "{domain}",
                                "{source}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "domain",
                                        "orig": "domain",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "source",
                                        "orig": "source",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "domain",
                                    "source"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "update": {
                    "input": "data",
                    "name": "update",
                    "points": [
                        {
                            "kind": "http",
                            "method": "PUT",
                            "orig": "/email/forwards/{domain}/{source}",
                            "segments": [
                                {
                                    "lit": "email"
                                },
                                {
                                    "lit": "forwards"
                                },
                                {
                                    "var": "domain"
                                },
                                {
                                    "var": "source"
                                }
                            ],
                            "parts": [
                                "email",
                                "forwards",
                                "{domain}",
                                "{source}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "domain",
                                        "orig": "domain",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "source",
                                        "orig": "source",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "domain",
                                    "source"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "$.main.kit.entity.mailbox"
                    ]
                ]
            }
        },
        "linked_zone": {
            "fields": [
                {
                    "name": "created_at",
                    "title": "Created At",
                    "type": "`$STRING`",
                    "req": true,
                    "format": "date-time"
                },
                {
                    "name": "default_records",
                    "title": "Default Records",
                    "type": "`$BOOLEAN`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$BOOLEAN`"
                        },
                        "update": {
                            "type": "`$BOOLEAN`"
                        }
                    }
                },
                {
                    "name": "deploy",
                    "title": "Deploy",
                    "type": "`$BOOLEAN`",
                    "req": true
                },
                {
                    "name": "deployed",
                    "title": "Deployed",
                    "type": "`$BOOLEAN`",
                    "req": true
                },
                {
                    "name": "domain_count",
                    "title": "Domain Count",
                    "type": "`$INTEGER`",
                    "req": true
                },
                {
                    "name": "domains",
                    "title": "Domains",
                    "type": "`$ARRAY`",
                    "op": {
                        "update": {
                            "req": true,
                            "type": "`$ARRAY`"
                        }
                    }
                },
                {
                    "name": "ending_at",
                    "title": "Ending At",
                    "type": "`$STRING`",
                    "format": "date-time"
                },
                {
                    "name": "errored",
                    "title": "Errored",
                    "type": "`$ARRAY`",
                    "req": true
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "message",
                    "title": "Message",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "name",
                    "title": "Name",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "update": {
                            "type": "`$STRING`"
                        }
                    }
                },
                {
                    "name": "owner",
                    "title": "Owner",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "record_list",
                    "title": "Record List",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "record_text",
                    "title": "Record Text",
                    "type": "`$STRING`"
                },
                {
                    "name": "records",
                    "title": "Records",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "result",
                    "title": "Result",
                    "type": "`$OBJECT`",
                    "req": true
                },
                {
                    "name": "sharing_space",
                    "title": "Sharing Space",
                    "type": "`$OBJECT`",
                    "req": true
                },
                {
                    "name": "status",
                    "title": "Status",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "succeeded",
                    "title": "Succeeded",
                    "type": "`$ARRAY`",
                    "req": true
                },
                {
                    "name": "type",
                    "title": "Type",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "updated_at",
                    "title": "Updated At",
                    "type": "`$STRING`",
                    "format": "date-time"
                },
                {
                    "name": "zone",
                    "title": "Zone",
                    "type": "`$OBJECT`",
                    "req": true
                },
                {
                    "name": "zone_id",
                    "title": "Zone Id",
                    "type": "`$STRING`",
                    "req": true
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "linked_zone",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/linkedzone/zones/{zone_id}",
                            "segments": [
                                {
                                    "lit": "linkedzone"
                                },
                                {
                                    "lit": "zones"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "linkedzone",
                                "zones",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "zone_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "zone_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/linkedzone/zones",
                            "segments": [
                                {
                                    "lit": "linkedzone"
                                },
                                {
                                    "lit": "zones"
                                }
                            ],
                            "parts": [
                                "linkedzone",
                                "zones"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/linkedzone/domains",
                            "segments": [
                                {
                                    "lit": "linkedzone"
                                },
                                {
                                    "lit": "domains"
                                }
                            ],
                            "parts": [
                                "linkedzone",
                                "domains"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "name",
                                        "orig": "name",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "field": true
                                    },
                                    {
                                        "name": "page",
                                        "orig": "page",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 1
                                    },
                                    {
                                        "name": "per_page",
                                        "orig": "per_page",
                                        "type": "`$INTEGER`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "sharing_id",
                                        "orig": "sharing_id",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "zone_id",
                                        "orig": "zone_id",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "field": true
                                    }
                                ]
                            },
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/linkedzone/tasks",
                            "segments": [
                                {
                                    "lit": "linkedzone"
                                },
                                {
                                    "lit": "tasks"
                                }
                            ],
                            "parts": [
                                "linkedzone",
                                "tasks"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "page",
                                        "orig": "page",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 1
                                    },
                                    {
                                        "name": "per_page",
                                        "orig": "per_page",
                                        "type": "`$INTEGER`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/linkedzone/zones",
                            "segments": [
                                {
                                    "lit": "linkedzone"
                                },
                                {
                                    "lit": "zones"
                                }
                            ],
                            "parts": [
                                "linkedzone",
                                "zones"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "page",
                                        "orig": "page",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 1
                                    },
                                    {
                                        "name": "per_page",
                                        "orig": "per_page",
                                        "type": "`$INTEGER`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "sharing_id",
                                        "orig": "sharing_id",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/linkedzone/domains/{domain}",
                            "segments": [
                                {
                                    "lit": "linkedzone"
                                },
                                {
                                    "lit": "domains"
                                },
                                {
                                    "var": "domain"
                                }
                            ],
                            "parts": [
                                "linkedzone",
                                "domains",
                                "{domain}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "domain",
                                        "orig": "domain",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "domain"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/linkedzone/zones/{zone_id}",
                            "segments": [
                                {
                                    "lit": "linkedzone"
                                },
                                {
                                    "lit": "zones"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "linkedzone",
                                "zones",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "zone_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "zone_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "sharing_id",
                                        "orig": "sharing_id",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/linkedzone/tasks/{task_id}",
                            "segments": [
                                {
                                    "lit": "linkedzone"
                                },
                                {
                                    "lit": "tasks"
                                },
                                {
                                    "var": "task_id"
                                }
                            ],
                            "parts": [
                                "linkedzone",
                                "tasks",
                                "{task_id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "task_id",
                                        "orig": "task_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "task_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/linkedzone/zones/{zone_id}",
                            "segments": [
                                {
                                    "lit": "linkedzone"
                                },
                                {
                                    "lit": "zones"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "linkedzone",
                                "zones",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "zone_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "zone_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                },
                "update": {
                    "input": "data",
                    "name": "update",
                    "points": [
                        {
                            "kind": "http",
                            "method": "PATCH",
                            "orig": "/linkedzone/zones/{zone_id}",
                            "segments": [
                                {
                                    "lit": "linkedzone"
                                },
                                {
                                    "lit": "zones"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "linkedzone",
                                "zones",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "zone_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "zone_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "PATCH",
                            "orig": "/linkedzone/zones/{zone_id}/link/domains",
                            "segments": [
                                {
                                    "lit": "linkedzone"
                                },
                                {
                                    "lit": "zones"
                                },
                                {
                                    "var": "zone_id"
                                },
                                {
                                    "lit": "link"
                                },
                                {
                                    "lit": "domains"
                                }
                            ],
                            "parts": [
                                "linkedzone",
                                "zones",
                                "{zone_id}",
                                "link",
                                "domains"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "zone_id",
                                        "orig": "zone_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "zone_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "PATCH",
                            "orig": "/linkedzone/unlink/domains",
                            "segments": [
                                {
                                    "lit": "linkedzone"
                                },
                                {
                                    "lit": "unlink"
                                },
                                {
                                    "lit": "domains"
                                }
                            ],
                            "parts": [
                                "linkedzone",
                                "unlink",
                                "domains"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "$.main.kit.entity.domain"
                    ]
                ]
            }
        },
        "live_dn": {
            "fields": [
                {
                    "name": "add_rrset_values",
                    "title": "Add Rrset Values",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "algorithm",
                    "title": "Algorithm",
                    "type": "`$INTEGER`",
                    "req": true
                },
                {
                    "name": "algorithm_name",
                    "title": "Algorithm Name",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "automatic",
                    "title": "Automatic",
                    "type": "`$BOOLEAN`",
                    "req": true
                },
                {
                    "name": "automatic_snapshots",
                    "title": "Automatic Snapshots",
                    "type": "`$BOOLEAN`",
                    "req": true,
                    "op": {
                        "patch": {
                            "type": "`$BOOLEAN`"
                        }
                    }
                },
                {
                    "name": "config_samples",
                    "title": "Config Samples",
                    "type": "`$OBJECT`",
                    "req": true
                },
                {
                    "name": "created_at",
                    "title": "Created At",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "deleted",
                    "title": "Deleted",
                    "type": "`$BOOLEAN`",
                    "req": true
                },
                {
                    "name": "domain_href",
                    "title": "Domain Href",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "domain_keys_href",
                    "title": "Domain Keys Href",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "domain_records_href",
                    "title": "Domain Records Href",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "ds",
                    "title": "Ds",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "fingerprint",
                    "title": "Fingerprint",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "flags",
                    "title": "Flags",
                    "type": "`$INTEGER`",
                    "req": true
                },
                {
                    "name": "fqdn",
                    "title": "Fqdn",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "href",
                    "title": "Href",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "items",
                    "title": "Items",
                    "type": "`$ARRAY`",
                    "req": true
                },
                {
                    "name": "key_href",
                    "title": "Key Href",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "key_name",
                    "title": "Key Name",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "message",
                    "title": "Message",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "name",
                    "title": "Name",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        }
                    }
                },
                {
                    "name": "public_key",
                    "title": "Public Key",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "remove_apex_ns",
                    "title": "Remove Apex Ns",
                    "type": "`$BOOLEAN`"
                },
                {
                    "name": "remove_rrset_values",
                    "title": "Remove Rrset Values",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "rrset_href",
                    "title": "Rrset Href",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "rrset_name",
                    "title": "Rrset Name",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "rrset_ttl",
                    "title": "Rrset Ttl",
                    "type": "`$INTEGER`",
                    "op": {
                        "create": {
                            "req": true,
                            "type": "`$INTEGER`"
                        }
                    }
                },
                {
                    "name": "rrset_type",
                    "title": "Rrset Type",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "rrset_values",
                    "title": "Rrset Values",
                    "type": "`$ARRAY`",
                    "req": true
                },
                {
                    "name": "secret",
                    "title": "Secret",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "status",
                    "title": "Status",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "tag",
                    "title": "Tag",
                    "type": "`$INTEGER`",
                    "req": true
                },
                {
                    "name": "zone",
                    "title": "Zone",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "zone_data",
                    "title": "Zone Data",
                    "type": "`$ARRAY`",
                    "req": true
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "live_dn",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/livedns/domains/{fqdn}/records/{rrset_name}/{rrset_type}",
                            "segments": [
                                {
                                    "lit": "livedns"
                                },
                                {
                                    "lit": "domains"
                                },
                                {
                                    "var": "fqdn"
                                },
                                {
                                    "lit": "records"
                                },
                                {
                                    "var": "rrset_name"
                                },
                                {
                                    "var": "rrset_type"
                                }
                            ],
                            "parts": [
                                "livedns",
                                "domains",
                                "{fqdn}",
                                "records",
                                "{rrset_name}",
                                "{rrset_type}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "fqdn",
                                        "orig": "fqdn",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "rrset_name",
                                        "orig": "rrset_name",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "rrset_type",
                                        "orig": "rrset_type",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "fqdn",
                                    "rrset_name",
                                    "rrset_type"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/livedns/domains/{fqdn}/verification/{rrset_name}/{rrset_type}",
                            "segments": [
                                {
                                    "lit": "livedns"
                                },
                                {
                                    "lit": "domains"
                                },
                                {
                                    "var": "fqdn"
                                },
                                {
                                    "lit": "verification"
                                },
                                {
                                    "var": "rrset_name"
                                },
                                {
                                    "var": "rrset_type"
                                }
                            ],
                            "parts": [
                                "livedns",
                                "domains",
                                "{fqdn}",
                                "verification",
                                "{rrset_name}",
                                "{rrset_type}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "fqdn",
                                        "orig": "fqdn",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "rrset_name",
                                        "orig": "rrset_name",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "rrset_type",
                                        "orig": "rrset_type",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "fqdn",
                                    "rrset_name",
                                    "rrset_type"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/livedns/domains/{fqdn}/records/{rrset_name}",
                            "segments": [
                                {
                                    "lit": "livedns"
                                },
                                {
                                    "lit": "domains"
                                },
                                {
                                    "var": "fqdn"
                                },
                                {
                                    "lit": "records"
                                },
                                {
                                    "var": "rrset_name"
                                }
                            ],
                            "parts": [
                                "livedns",
                                "domains",
                                "{fqdn}",
                                "records",
                                "{rrset_name}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "fqdn",
                                        "orig": "fqdn",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "rrset_name",
                                        "orig": "rrset_name",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "fqdn",
                                    "rrset_name"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/livedns/domains/{fqdn}/keys",
                            "segments": [
                                {
                                    "lit": "livedns"
                                },
                                {
                                    "lit": "domains"
                                },
                                {
                                    "var": "fqdn"
                                },
                                {
                                    "lit": "keys"
                                }
                            ],
                            "parts": [
                                "livedns",
                                "domains",
                                "{fqdn}",
                                "keys"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "fqdn",
                                        "orig": "fqdn",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "fqdn"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/livedns/domains/{fqdn}/records",
                            "segments": [
                                {
                                    "lit": "livedns"
                                },
                                {
                                    "lit": "domains"
                                },
                                {
                                    "var": "fqdn"
                                },
                                {
                                    "lit": "records"
                                }
                            ],
                            "parts": [
                                "livedns",
                                "domains",
                                "{fqdn}",
                                "records"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "fqdn",
                                        "orig": "fqdn",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "fqdn"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/livedns/domains/{fqdn}/snapshots",
                            "segments": [
                                {
                                    "lit": "livedns"
                                },
                                {
                                    "lit": "domains"
                                },
                                {
                                    "var": "fqdn"
                                },
                                {
                                    "lit": "snapshots"
                                }
                            ],
                            "parts": [
                                "livedns",
                                "domains",
                                "{fqdn}",
                                "snapshots"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "fqdn",
                                        "orig": "fqdn",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "fqdn"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/livedns/axfr/tsig",
                            "segments": [
                                {
                                    "lit": "livedns"
                                },
                                {
                                    "lit": "axfr"
                                },
                                {
                                    "lit": "tsig"
                                }
                            ],
                            "parts": [
                                "livedns",
                                "axfr",
                                "tsig"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "sharing_id",
                                        "orig": "sharing_id",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/livedns/domains",
                            "segments": [
                                {
                                    "lit": "livedns"
                                },
                                {
                                    "lit": "domains"
                                }
                            ],
                            "parts": [
                                "livedns",
                                "domains"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "sharing_id",
                                        "orig": "sharing_id",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/livedns/domains/{fqdn}/records/{rrset_name}",
                            "segments": [
                                {
                                    "lit": "livedns"
                                },
                                {
                                    "lit": "domains"
                                },
                                {
                                    "var": "fqdn"
                                },
                                {
                                    "lit": "records"
                                },
                                {
                                    "var": "rrset_name"
                                }
                            ],
                            "parts": [
                                "livedns",
                                "domains",
                                "{fqdn}",
                                "records",
                                "{rrset_name}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "fqdn",
                                        "orig": "fqdn",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "rrset_name",
                                        "orig": "rrset_name",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "fqdn",
                                    "rrset_name"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/livedns/domains/{fqdn}/axfr/slaves",
                            "segments": [
                                {
                                    "lit": "livedns"
                                },
                                {
                                    "lit": "domains"
                                },
                                {
                                    "var": "fqdn"
                                },
                                {
                                    "lit": "axfr"
                                },
                                {
                                    "lit": "slaves"
                                }
                            ],
                            "parts": [
                                "livedns",
                                "domains",
                                "{fqdn}",
                                "axfr",
                                "slaves"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "fqdn",
                                        "orig": "fqdn",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "fqdn"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/livedns/domains/{fqdn}/axfr/tsig",
                            "segments": [
                                {
                                    "lit": "livedns"
                                },
                                {
                                    "lit": "domains"
                                },
                                {
                                    "var": "fqdn"
                                },
                                {
                                    "lit": "axfr"
                                },
                                {
                                    "lit": "tsig"
                                }
                            ],
                            "parts": [
                                "livedns",
                                "domains",
                                "{fqdn}",
                                "axfr",
                                "tsig"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "fqdn",
                                        "orig": "fqdn",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "fqdn"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/livedns/domains/{fqdn}/keys",
                            "segments": [
                                {
                                    "lit": "livedns"
                                },
                                {
                                    "lit": "domains"
                                },
                                {
                                    "var": "fqdn"
                                },
                                {
                                    "lit": "keys"
                                }
                            ],
                            "parts": [
                                "livedns",
                                "domains",
                                "{fqdn}",
                                "keys"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "fqdn",
                                        "orig": "fqdn",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "fqdn"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/livedns/domains/{fqdn}/nameservers",
                            "segments": [
                                {
                                    "lit": "livedns"
                                },
                                {
                                    "lit": "domains"
                                },
                                {
                                    "var": "fqdn"
                                },
                                {
                                    "lit": "nameservers"
                                }
                            ],
                            "parts": [
                                "livedns",
                                "domains",
                                "{fqdn}",
                                "nameservers"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "fqdn",
                                        "orig": "fqdn",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "fqdn"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/livedns/domains/{fqdn}/records",
                            "segments": [
                                {
                                    "lit": "livedns"
                                },
                                {
                                    "lit": "domains"
                                },
                                {
                                    "var": "fqdn"
                                },
                                {
                                    "lit": "records"
                                }
                            ],
                            "parts": [
                                "livedns",
                                "domains",
                                "{fqdn}",
                                "records"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "fqdn",
                                        "orig": "fqdn",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "page",
                                        "orig": "page",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 1
                                    },
                                    {
                                        "name": "per_page",
                                        "orig": "per_page",
                                        "type": "`$INTEGER`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "rrset_type",
                                        "orig": "rrset_type",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "field": true
                                    },
                                    {
                                        "name": "sort_by",
                                        "orig": "sort_by",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "rrset_name"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "fqdn"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/livedns/domains/{fqdn}/snapshots",
                            "segments": [
                                {
                                    "lit": "livedns"
                                },
                                {
                                    "lit": "domains"
                                },
                                {
                                    "var": "fqdn"
                                },
                                {
                                    "lit": "snapshots"
                                }
                            ],
                            "parts": [
                                "livedns",
                                "domains",
                                "{fqdn}",
                                "snapshots"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "fqdn",
                                        "orig": "fqdn",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "automatic",
                                        "orig": "automatic",
                                        "type": "`$BOOLEAN`",
                                        "kind": "query",
                                        "field": true
                                    },
                                    {
                                        "name": "page",
                                        "orig": "page",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 1
                                    },
                                    {
                                        "name": "per_page",
                                        "orig": "per_page",
                                        "type": "`$INTEGER`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "sort_by",
                                        "orig": "sort_by",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "date_created"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "fqdn"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/livedns/axfr/tsig",
                            "segments": [
                                {
                                    "lit": "livedns"
                                },
                                {
                                    "lit": "axfr"
                                },
                                {
                                    "lit": "tsig"
                                }
                            ],
                            "parts": [
                                "livedns",
                                "axfr",
                                "tsig"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "sharing_id",
                                        "orig": "sharing_id",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/livedns/dns/rrtypes",
                            "segments": [
                                {
                                    "lit": "livedns"
                                },
                                {
                                    "lit": "dns"
                                },
                                {
                                    "lit": "rrtypes"
                                }
                            ],
                            "parts": [
                                "livedns",
                                "dns",
                                "rrtypes"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/livedns/domains",
                            "segments": [
                                {
                                    "lit": "livedns"
                                },
                                {
                                    "lit": "domains"
                                }
                            ],
                            "parts": [
                                "livedns",
                                "domains"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "page",
                                        "orig": "page",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 1
                                    },
                                    {
                                        "name": "per_page",
                                        "orig": "per_page",
                                        "type": "`$INTEGER`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "sharing_id",
                                        "orig": "sharing_id",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/livedns/domains/{fqdn}/records/{rrset_name}/{rrset_type}",
                            "segments": [
                                {
                                    "lit": "livedns"
                                },
                                {
                                    "lit": "domains"
                                },
                                {
                                    "var": "fqdn"
                                },
                                {
                                    "lit": "records"
                                },
                                {
                                    "var": "rrset_name"
                                },
                                {
                                    "var": "rrset_type"
                                }
                            ],
                            "parts": [
                                "livedns",
                                "domains",
                                "{fqdn}",
                                "records",
                                "{rrset_name}",
                                "{rrset_type}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "fqdn",
                                        "orig": "fqdn",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "rrset_name",
                                        "orig": "rrset_name",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "rrset_type",
                                        "orig": "rrset_type",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "fqdn",
                                    "rrset_name",
                                    "rrset_type"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/livedns/domains/{fqdn}/keys/{id}",
                            "segments": [
                                {
                                    "lit": "livedns"
                                },
                                {
                                    "lit": "domains"
                                },
                                {
                                    "var": "fqdn"
                                },
                                {
                                    "lit": "keys"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "livedns",
                                "domains",
                                "{fqdn}",
                                "keys",
                                "{id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "fqdn",
                                        "orig": "fqdn",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "id",
                                        "orig": "id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "fqdn",
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/livedns/domains/{fqdn}/snapshots/{id}",
                            "segments": [
                                {
                                    "lit": "livedns"
                                },
                                {
                                    "lit": "domains"
                                },
                                {
                                    "var": "fqdn"
                                },
                                {
                                    "lit": "snapshots"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "livedns",
                                "domains",
                                "{fqdn}",
                                "snapshots",
                                "{id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "fqdn",
                                        "orig": "fqdn",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "id",
                                        "orig": "id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "fqdn",
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/livedns/axfr/tsig/{id}/config/{software}",
                            "segments": [
                                {
                                    "lit": "livedns"
                                },
                                {
                                    "lit": "axfr"
                                },
                                {
                                    "lit": "tsig"
                                },
                                {
                                    "var": "tsig_id"
                                },
                                {
                                    "lit": "config"
                                },
                                {
                                    "var": "software"
                                }
                            ],
                            "parts": [
                                "livedns",
                                "axfr",
                                "tsig",
                                "{tsig_id}",
                                "config",
                                "{software}"
                            ],
                            "rename": {
                                "param": {
                                    "id": "tsig_id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "software",
                                        "orig": "software",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "tsig_id",
                                        "orig": "id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "sharing_id",
                                        "orig": "sharing_id",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "software",
                                    "tsig_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/livedns/domains/{fqdn}",
                            "segments": [
                                {
                                    "lit": "livedns"
                                },
                                {
                                    "lit": "domains"
                                },
                                {
                                    "var": "fqdn"
                                }
                            ],
                            "parts": [
                                "livedns",
                                "domains",
                                "{fqdn}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "fqdn",
                                        "orig": "fqdn",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "fqdn"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/livedns/nameservers/{fqdn}",
                            "segments": [
                                {
                                    "lit": "livedns"
                                },
                                {
                                    "lit": "nameservers"
                                },
                                {
                                    "var": "fqdn"
                                }
                            ],
                            "parts": [
                                "livedns",
                                "nameservers",
                                "{fqdn}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "fqdn",
                                        "orig": "fqdn",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "fqdn"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/livedns/axfr/tsig/{id}",
                            "segments": [
                                {
                                    "lit": "livedns"
                                },
                                {
                                    "lit": "axfr"
                                },
                                {
                                    "lit": "tsig"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "livedns",
                                "axfr",
                                "tsig",
                                "{id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "sharing_id",
                                        "orig": "sharing_id",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "patch": {
                    "input": "data",
                    "name": "patch",
                    "points": [
                        {
                            "kind": "http",
                            "method": "PATCH",
                            "orig": "/livedns/domains/{fqdn}/records/{rrset_name}/{rrset_type}",
                            "segments": [
                                {
                                    "lit": "livedns"
                                },
                                {
                                    "lit": "domains"
                                },
                                {
                                    "var": "fqdn"
                                },
                                {
                                    "lit": "records"
                                },
                                {
                                    "var": "rrset_name"
                                },
                                {
                                    "var": "rrset_type"
                                }
                            ],
                            "parts": [
                                "livedns",
                                "domains",
                                "{fqdn}",
                                "records",
                                "{rrset_name}",
                                "{rrset_type}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "fqdn",
                                        "orig": "fqdn",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "rrset_name",
                                        "orig": "rrset_name",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "rrset_type",
                                        "orig": "rrset_type",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "fqdn",
                                    "rrset_name",
                                    "rrset_type"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "PATCH",
                            "orig": "/livedns/domains/{fqdn}/keys/{id}",
                            "segments": [
                                {
                                    "lit": "livedns"
                                },
                                {
                                    "lit": "domains"
                                },
                                {
                                    "var": "fqdn"
                                },
                                {
                                    "lit": "keys"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "livedns",
                                "domains",
                                "{fqdn}",
                                "keys",
                                "{id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "fqdn",
                                        "orig": "fqdn",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "id",
                                        "orig": "id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "fqdn",
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "PATCH",
                            "orig": "/livedns/domains/{fqdn}/snapshots/{id}",
                            "segments": [
                                {
                                    "lit": "livedns"
                                },
                                {
                                    "lit": "domains"
                                },
                                {
                                    "var": "fqdn"
                                },
                                {
                                    "lit": "snapshots"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "livedns",
                                "domains",
                                "{fqdn}",
                                "snapshots",
                                "{id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "fqdn",
                                        "orig": "fqdn",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "id",
                                        "orig": "id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "fqdn",
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "PATCH",
                            "orig": "/livedns/domains/{fqdn}",
                            "segments": [
                                {
                                    "lit": "livedns"
                                },
                                {
                                    "lit": "domains"
                                },
                                {
                                    "var": "fqdn"
                                }
                            ],
                            "parts": [
                                "livedns",
                                "domains",
                                "{fqdn}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "fqdn",
                                        "orig": "fqdn",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "fqdn"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/livedns/domains/{fqdn}/records/{rrset_name}/{rrset_type}",
                            "segments": [
                                {
                                    "lit": "livedns"
                                },
                                {
                                    "lit": "domains"
                                },
                                {
                                    "var": "fqdn"
                                },
                                {
                                    "lit": "records"
                                },
                                {
                                    "var": "rrset_name"
                                },
                                {
                                    "var": "rrset_type"
                                }
                            ],
                            "parts": [
                                "livedns",
                                "domains",
                                "{fqdn}",
                                "records",
                                "{rrset_name}",
                                "{rrset_type}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "fqdn",
                                        "orig": "fqdn",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "rrset_name",
                                        "orig": "rrset_name",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "rrset_type",
                                        "orig": "rrset_type",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "fqdn",
                                    "rrset_name",
                                    "rrset_type"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/livedns/domains/{fqdn}/axfr/tsig/{id}",
                            "segments": [
                                {
                                    "lit": "livedns"
                                },
                                {
                                    "lit": "domains"
                                },
                                {
                                    "var": "fqdn"
                                },
                                {
                                    "lit": "axfr"
                                },
                                {
                                    "lit": "tsig"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "livedns",
                                "domains",
                                "{fqdn}",
                                "axfr",
                                "tsig",
                                "{id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "fqdn",
                                        "orig": "fqdn",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "id",
                                        "orig": "id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "sharing_id",
                                        "orig": "sharing_id",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "fqdn",
                                    "id"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/livedns/domains/{fqdn}/keys/{id}",
                            "segments": [
                                {
                                    "lit": "livedns"
                                },
                                {
                                    "lit": "domains"
                                },
                                {
                                    "var": "fqdn"
                                },
                                {
                                    "lit": "keys"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "livedns",
                                "domains",
                                "{fqdn}",
                                "keys",
                                "{id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "fqdn",
                                        "orig": "fqdn",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "id",
                                        "orig": "id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "fqdn",
                                    "id"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/livedns/domains/{fqdn}/snapshots/{id}",
                            "segments": [
                                {
                                    "lit": "livedns"
                                },
                                {
                                    "lit": "domains"
                                },
                                {
                                    "var": "fqdn"
                                },
                                {
                                    "lit": "snapshots"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "livedns",
                                "domains",
                                "{fqdn}",
                                "snapshots",
                                "{id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "fqdn",
                                        "orig": "fqdn",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "id",
                                        "orig": "id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "fqdn",
                                    "id"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/livedns/domains/{fqdn}/axfr/slaves/{ip}",
                            "segments": [
                                {
                                    "lit": "livedns"
                                },
                                {
                                    "lit": "domains"
                                },
                                {
                                    "var": "fqdn"
                                },
                                {
                                    "lit": "axfr"
                                },
                                {
                                    "lit": "slaves"
                                },
                                {
                                    "var": "ip"
                                }
                            ],
                            "parts": [
                                "livedns",
                                "domains",
                                "{fqdn}",
                                "axfr",
                                "slaves",
                                "{ip}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "fqdn",
                                        "orig": "fqdn",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "ip",
                                        "orig": "ip",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "fqdn",
                                    "ip"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/livedns/domains/{fqdn}/records/{rrset_name}",
                            "segments": [
                                {
                                    "lit": "livedns"
                                },
                                {
                                    "lit": "domains"
                                },
                                {
                                    "var": "fqdn"
                                },
                                {
                                    "lit": "records"
                                },
                                {
                                    "var": "rrset_name"
                                }
                            ],
                            "parts": [
                                "livedns",
                                "domains",
                                "{fqdn}",
                                "records",
                                "{rrset_name}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "fqdn",
                                        "orig": "fqdn",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "rrset_name",
                                        "orig": "rrset_name",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "fqdn",
                                    "rrset_name"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/livedns/domains/{fqdn}/records",
                            "segments": [
                                {
                                    "lit": "livedns"
                                },
                                {
                                    "lit": "domains"
                                },
                                {
                                    "var": "fqdn"
                                },
                                {
                                    "lit": "records"
                                }
                            ],
                            "parts": [
                                "livedns",
                                "domains",
                                "{fqdn}",
                                "records"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "fqdn",
                                        "orig": "fqdn",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "fqdn"
                                ]
                            }
                        }
                    ]
                },
                "update": {
                    "input": "data",
                    "name": "update",
                    "points": [
                        {
                            "kind": "http",
                            "method": "PUT",
                            "orig": "/livedns/domains/{fqdn}/records/{rrset_name}/{rrset_type}",
                            "segments": [
                                {
                                    "lit": "livedns"
                                },
                                {
                                    "lit": "domains"
                                },
                                {
                                    "var": "fqdn"
                                },
                                {
                                    "lit": "records"
                                },
                                {
                                    "var": "rrset_name"
                                },
                                {
                                    "var": "rrset_type"
                                }
                            ],
                            "parts": [
                                "livedns",
                                "domains",
                                "{fqdn}",
                                "records",
                                "{rrset_name}",
                                "{rrset_type}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "fqdn",
                                        "orig": "fqdn",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "rrset_name",
                                        "orig": "rrset_name",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "rrset_type",
                                        "orig": "rrset_type",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "fqdn",
                                    "rrset_name",
                                    "rrset_type"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "PUT",
                            "orig": "/livedns/domains/{fqdn}/axfr/tsig/{id}",
                            "segments": [
                                {
                                    "lit": "livedns"
                                },
                                {
                                    "lit": "domains"
                                },
                                {
                                    "var": "fqdn"
                                },
                                {
                                    "lit": "axfr"
                                },
                                {
                                    "lit": "tsig"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "livedns",
                                "domains",
                                "{fqdn}",
                                "axfr",
                                "tsig",
                                "{id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "fqdn",
                                        "orig": "fqdn",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "id",
                                        "orig": "id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "sharing_id",
                                        "orig": "sharing_id",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "fqdn",
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "PUT",
                            "orig": "/livedns/domains/{fqdn}/axfr/slaves/{ip}",
                            "segments": [
                                {
                                    "lit": "livedns"
                                },
                                {
                                    "lit": "domains"
                                },
                                {
                                    "var": "fqdn"
                                },
                                {
                                    "lit": "axfr"
                                },
                                {
                                    "lit": "slaves"
                                },
                                {
                                    "var": "ip"
                                }
                            ],
                            "parts": [
                                "livedns",
                                "domains",
                                "{fqdn}",
                                "axfr",
                                "slaves",
                                "{ip}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "fqdn",
                                        "orig": "fqdn",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "ip",
                                        "orig": "ip",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "fqdn",
                                    "ip"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "PUT",
                            "orig": "/livedns/domains/{fqdn}/records/{rrset_name}",
                            "segments": [
                                {
                                    "lit": "livedns"
                                },
                                {
                                    "lit": "domains"
                                },
                                {
                                    "var": "fqdn"
                                },
                                {
                                    "lit": "records"
                                },
                                {
                                    "var": "rrset_name"
                                }
                            ],
                            "parts": [
                                "livedns",
                                "domains",
                                "{fqdn}",
                                "records",
                                "{rrset_name}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "fqdn",
                                        "orig": "fqdn",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "rrset_name",
                                        "orig": "rrset_name",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "fqdn",
                                    "rrset_name"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "PUT",
                            "orig": "/livedns/domains/{fqdn}/records",
                            "segments": [
                                {
                                    "lit": "livedns"
                                },
                                {
                                    "lit": "domains"
                                },
                                {
                                    "var": "fqdn"
                                },
                                {
                                    "lit": "records"
                                }
                            ],
                            "parts": [
                                "livedns",
                                "domains",
                                "{fqdn}",
                                "records"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "fqdn",
                                        "orig": "fqdn",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "fqdn"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "$.main.kit.entity.domain"
                    ],
                    [
                        "$.main.kit.entity.domain"
                    ],
                    [
                        "$.main.kit.entity.domain"
                    ],
                    [
                        "$.main.kit.entity.domain"
                    ]
                ]
            }
        },
        "mailbox": {
            "fields": [
                {
                    "name": "address",
                    "title": "Address",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "aliases",
                    "title": "Aliases",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "antispam",
                    "title": "Antispam",
                    "type": "`$BOOLEAN`",
                    "req": true,
                    "op": {
                        "patch": {
                            "type": "`$BOOLEAN`"
                        }
                    }
                },
                {
                    "name": "autorenew",
                    "title": "Autorenew",
                    "type": "`$OBJECT`",
                    "req": true
                },
                {
                    "name": "config",
                    "title": "Config",
                    "type": "`$OBJECT`",
                    "req": true
                },
                {
                    "name": "config_name",
                    "title": "Config Name",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "patch": {
                            "type": "`$STRING`"
                        }
                    }
                },
                {
                    "name": "configuration",
                    "title": "Configuration",
                    "type": "`$ARRAY`",
                    "req": true
                },
                {
                    "name": "created_at",
                    "title": "Created At",
                    "type": "`$STRING`",
                    "req": true,
                    "format": "date-time"
                },
                {
                    "name": "data_access",
                    "title": "Data Access",
                    "type": "`$BOOLEAN`",
                    "req": true
                },
                {
                    "name": "date_last_validation",
                    "title": "Date Last Validation",
                    "type": "`$STRING`",
                    "format": "date-time"
                },
                {
                    "name": "destinations",
                    "title": "Destinations",
                    "type": "`$ARRAY`",
                    "req": true
                },
                {
                    "name": "dkim",
                    "title": "Dkim",
                    "type": "`$BOOLEAN`",
                    "req": true
                },
                {
                    "name": "domain_part",
                    "title": "Domain Part",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "duration_month",
                    "title": "Duration Month",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "email",
                    "title": "Email",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "expires_at",
                    "title": "Expires At",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "load": {
                            "type": "`$STRING`"
                        }
                    },
                    "format": "date-time"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "internal",
                    "title": "Internal",
                    "type": "`$BOOLEAN`",
                    "req": true
                },
                {
                    "name": "internal_domain",
                    "title": "Internal Domain",
                    "type": "`$BOOLEAN`",
                    "req": true
                },
                {
                    "name": "is_livedns",
                    "title": "Is Livedns",
                    "type": "`$BOOLEAN`",
                    "req": true
                },
                {
                    "name": "issues",
                    "title": "Issues",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "last_paid_duration",
                    "title": "Last Paid Duration",
                    "type": "`$INTEGER`",
                    "req": true,
                    "op": {
                        "load": {
                            "type": "`$INTEGER`"
                        }
                    }
                },
                {
                    "name": "local_part",
                    "title": "Local Part",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "message",
                    "title": "Message",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "mx",
                    "title": "Mx",
                    "type": "`$BOOLEAN`",
                    "req": true
                },
                {
                    "name": "owner",
                    "title": "Owner",
                    "type": "`$OBJECT`",
                    "req": true
                },
                {
                    "name": "password",
                    "title": "Password",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "patch": {
                            "type": "`$STRING`"
                        }
                    }
                },
                {
                    "name": "quota",
                    "title": "Quota",
                    "type": "`$INTEGER`",
                    "req": true
                },
                {
                    "name": "quota_used",
                    "title": "Quota Used",
                    "type": "`$INTEGER`",
                    "req": true
                },
                {
                    "name": "refund_info",
                    "title": "Refund Info",
                    "type": "`$OBJECT`",
                    "req": true
                },
                {
                    "name": "refundable",
                    "title": "Refundable",
                    "type": "`$BOOLEAN`",
                    "req": true
                },
                {
                    "name": "responder",
                    "title": "Responder",
                    "type": "`$OBJECT`",
                    "req": true
                },
                {
                    "name": "spf",
                    "title": "Spf",
                    "type": "`$BOOLEAN`",
                    "req": true
                },
                {
                    "name": "txt",
                    "title": "Txt",
                    "type": "`$BOOLEAN`",
                    "req": true
                },
                {
                    "name": "updated_at",
                    "title": "Updated At",
                    "type": "`$STRING`",
                    "req": true,
                    "format": "date-time"
                },
                {
                    "name": "uuid",
                    "title": "Uuid",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "webhosting_pack",
                    "title": "Webhosting Pack",
                    "type": "`$BOOLEAN`",
                    "req": true
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "mailbox",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/mailbox/mailboxes/{email}/renew",
                            "segments": [
                                {
                                    "lit": "mailbox"
                                },
                                {
                                    "lit": "mailboxes"
                                },
                                {
                                    "var": "email"
                                },
                                {
                                    "lit": "renew"
                                }
                            ],
                            "parts": [
                                "mailbox",
                                "mailboxes",
                                "{email}",
                                "renew"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "dry_run",
                                        "orig": "Dry-Run",
                                        "type": "`$INTEGER`",
                                        "kind": "header"
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "email",
                                        "orig": "email",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "sharing_id",
                                        "orig": "sharing_id",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "$action": "renew",
                                "exist": [
                                    "email"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/mailbox/domains/{domain}/validate",
                            "segments": [
                                {
                                    "lit": "mailbox"
                                },
                                {
                                    "lit": "domains"
                                },
                                {
                                    "var": "domain"
                                },
                                {
                                    "lit": "validate"
                                }
                            ],
                            "parts": [
                                "mailbox",
                                "domains",
                                "{domain}",
                                "validate"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "domain",
                                        "orig": "domain",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "validate",
                                "exist": [
                                    "domain"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/mailbox/forwards",
                            "segments": [
                                {
                                    "lit": "mailbox"
                                },
                                {
                                    "lit": "forwards"
                                }
                            ],
                            "parts": [
                                "mailbox",
                                "forwards"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {
                                "$action": "forward"
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/mailbox/mailboxes",
                            "segments": [
                                {
                                    "lit": "mailbox"
                                },
                                {
                                    "lit": "mailboxes"
                                }
                            ],
                            "parts": [
                                "mailbox",
                                "mailboxes"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "sharing_id",
                                        "orig": "sharing_id",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/mailbox/products",
                            "segments": [
                                {
                                    "lit": "mailbox"
                                },
                                {
                                    "lit": "products"
                                }
                            ],
                            "parts": [
                                "mailbox",
                                "products"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "sharing_id",
                                        "orig": "sharing_id",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "$action": "product"
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/mailbox/domains",
                            "segments": [
                                {
                                    "lit": "mailbox"
                                },
                                {
                                    "lit": "domains"
                                }
                            ],
                            "parts": [
                                "mailbox",
                                "domains"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "page",
                                        "orig": "page",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 1
                                    },
                                    {
                                        "name": "per_page",
                                        "orig": "per_page",
                                        "type": "`$INTEGER`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "$action": "domain"
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/mailbox/forwards",
                            "segments": [
                                {
                                    "lit": "mailbox"
                                },
                                {
                                    "lit": "forwards"
                                }
                            ],
                            "parts": [
                                "mailbox",
                                "forwards"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "page",
                                        "orig": "page",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 1
                                    },
                                    {
                                        "name": "per_page",
                                        "orig": "per_page",
                                        "type": "`$INTEGER`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "search",
                                        "orig": "search",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "sharing_id",
                                        "orig": "sharing_id",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "sort_by",
                                        "orig": "sort_by",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "source"
                                    }
                                ]
                            },
                            "select": {
                                "$action": "forward"
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/mailbox/mailboxes",
                            "segments": [
                                {
                                    "lit": "mailbox"
                                },
                                {
                                    "lit": "mailboxes"
                                }
                            ],
                            "parts": [
                                "mailbox",
                                "mailboxes"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "address",
                                        "orig": "address",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "field": true
                                    },
                                    {
                                        "name": "domain_part",
                                        "orig": "domain_part",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "field": true
                                    },
                                    {
                                        "name": "local_part",
                                        "orig": "local_part",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "field": true
                                    },
                                    {
                                        "name": "page",
                                        "orig": "page",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 1
                                    },
                                    {
                                        "name": "per_page",
                                        "orig": "per_page",
                                        "type": "`$INTEGER`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "search",
                                        "orig": "search",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "sharing_id",
                                        "orig": "sharing_id",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "sort_by",
                                        "orig": "sort_by",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "id"
                                    }
                                ]
                            },
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/mailbox/products",
                            "segments": [
                                {
                                    "lit": "mailbox"
                                },
                                {
                                    "lit": "products"
                                }
                            ],
                            "parts": [
                                "mailbox",
                                "products"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "sharing_id",
                                        "orig": "sharing_id",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "$action": "product"
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/mailbox/quotas",
                            "segments": [
                                {
                                    "lit": "mailbox"
                                },
                                {
                                    "lit": "quotas"
                                }
                            ],
                            "parts": [
                                "mailbox",
                                "quotas"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "sharing_id",
                                        "orig": "sharing_id",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "$action": "quota"
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/mailbox/slots",
                            "segments": [
                                {
                                    "lit": "mailbox"
                                },
                                {
                                    "lit": "slots"
                                }
                            ],
                            "parts": [
                                "mailbox",
                                "slots"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "config_name",
                                        "orig": "config_name",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "field": true
                                    },
                                    {
                                        "name": "expires_at_gte",
                                        "orig": "expires_at_gte",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "expires_at_lte",
                                        "orig": "expires_at_lte",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "last_paid_duration",
                                        "orig": "last_paid_duration",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "field": true
                                    },
                                    {
                                        "name": "page",
                                        "orig": "page",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 1
                                    },
                                    {
                                        "name": "per_page",
                                        "orig": "per_page",
                                        "type": "`$INTEGER`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "refundable",
                                        "orig": "refundable",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "field": true
                                    },
                                    {
                                        "name": "sharing_id",
                                        "orig": "sharing_id",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "sort_by",
                                        "orig": "sort_by",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "refund_expires_at"
                                    },
                                    {
                                        "name": "webhosting_pack",
                                        "orig": "webhosting_pack",
                                        "type": "`$BOOLEAN`",
                                        "kind": "query",
                                        "field": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "slot"
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/mailbox/domains/{domain}",
                            "segments": [
                                {
                                    "lit": "mailbox"
                                },
                                {
                                    "lit": "domains"
                                },
                                {
                                    "var": "domain"
                                }
                            ],
                            "parts": [
                                "mailbox",
                                "domains",
                                "{domain}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "domain",
                                        "orig": "domain",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "domain"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/mailbox/mailboxes/{email}",
                            "segments": [
                                {
                                    "lit": "mailbox"
                                },
                                {
                                    "lit": "mailboxes"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "mailbox",
                                "mailboxes",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "email": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "email",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "sharing_id",
                                        "orig": "sharing_id",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/mailbox/slots/{slot_id}",
                            "segments": [
                                {
                                    "lit": "mailbox"
                                },
                                {
                                    "lit": "slots"
                                },
                                {
                                    "var": "slot_id"
                                }
                            ],
                            "parts": [
                                "mailbox",
                                "slots",
                                "{slot_id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "slot_id",
                                        "orig": "slot_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "slot_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "patch": {
                    "input": "data",
                    "name": "patch",
                    "points": [
                        {
                            "kind": "http",
                            "method": "PATCH",
                            "orig": "/mailbox/mailboxes/{email}",
                            "segments": [
                                {
                                    "lit": "mailbox"
                                },
                                {
                                    "lit": "mailboxes"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "mailbox",
                                "mailboxes",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "email": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "email",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                },
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/mailbox/mailboxes/{email}",
                            "segments": [
                                {
                                    "lit": "mailbox"
                                },
                                {
                                    "lit": "mailboxes"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "mailbox",
                                "mailboxes",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "email": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "email",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "sharing_id",
                                        "orig": "sharing_id",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/mailbox/forwards/{source}",
                            "segments": [
                                {
                                    "lit": "mailbox"
                                },
                                {
                                    "lit": "forwards"
                                },
                                {
                                    "var": "source"
                                }
                            ],
                            "parts": [
                                "mailbox",
                                "forwards",
                                "{source}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "source",
                                        "orig": "source",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "source"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "update": {
                    "input": "data",
                    "name": "update",
                    "points": [
                        {
                            "kind": "http",
                            "method": "PUT",
                            "orig": "/mailbox/forwards/{source}",
                            "segments": [
                                {
                                    "lit": "mailbox"
                                },
                                {
                                    "lit": "forwards"
                                },
                                {
                                    "var": "source"
                                }
                            ],
                            "parts": [
                                "mailbox",
                                "forwards",
                                "{source}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "source",
                                        "orig": "source",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "source"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "$.main.kit.entity.domain"
                    ]
                ]
            }
        },
        "nt": {
            "fields": [],
            "name": "nt",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/certificate/pem/-/{filename}",
                            "segments": [
                                {
                                    "lit": "certificate"
                                },
                                {
                                    "lit": "pem"
                                },
                                {
                                    "lit": "-"
                                },
                                {
                                    "var": "filename"
                                }
                            ],
                            "parts": [
                                "certificate",
                                "pem",
                                "-",
                                "{filename}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "filename",
                                        "orig": "filename",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "filename"
                                ]
                            },
                            "response": {
                                "kind": "raw",
                                "media": "text/plain"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "organization": {
            "fields": [
                {
                    "name": "city",
                    "title": "City",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "update": {
                            "type": "`$STRING`"
                        }
                    }
                },
                {
                    "name": "corporate",
                    "title": "Corporate",
                    "type": "`$BOOLEAN`",
                    "req": true,
                    "op": {
                        "list": {
                            "type": "`$BOOLEAN`"
                        }
                    }
                },
                {
                    "name": "country",
                    "title": "Country",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        },
                        "update": {
                            "type": "`$STRING`"
                        }
                    }
                },
                {
                    "name": "email",
                    "title": "Email",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "list": {
                            "type": "`$STRING`"
                        },
                        "update": {
                            "type": "`$STRING`"
                        }
                    }
                },
                {
                    "name": "fax",
                    "title": "Fax",
                    "type": "`$STRING`"
                },
                {
                    "name": "firstname",
                    "title": "Firstname",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "list": {
                            "type": "`$STRING`"
                        },
                        "update": {
                            "type": "`$STRING`"
                        }
                    }
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "lang",
                    "title": "Lang",
                    "type": "`$STRING`"
                },
                {
                    "name": "lastname",
                    "title": "Lastname",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "list": {
                            "type": "`$STRING`"
                        },
                        "update": {
                            "type": "`$STRING`"
                        }
                    }
                },
                {
                    "name": "message",
                    "title": "Message",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "name",
                    "title": "Name",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "update": {
                            "type": "`$STRING`"
                        }
                    }
                },
                {
                    "name": "orgname",
                    "title": "Orgname",
                    "type": "`$STRING`",
                    "op": {
                        "create": {
                            "req": true,
                            "type": "`$STRING`"
                        }
                    }
                },
                {
                    "name": "phone",
                    "title": "Phone",
                    "type": "`$STRING`",
                    "op": {
                        "create": {
                            "req": true,
                            "type": "`$STRING`"
                        }
                    }
                },
                {
                    "name": "reference",
                    "title": "Reference",
                    "type": "`$STRING`"
                },
                {
                    "name": "reseller",
                    "title": "Reseller",
                    "type": "`$BOOLEAN`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$BOOLEAN`"
                        },
                        "list": {
                            "type": "`$BOOLEAN`"
                        },
                        "update": {
                            "type": "`$BOOLEAN`"
                        }
                    }
                },
                {
                    "name": "siren",
                    "title": "Siren",
                    "type": "`$STRING`"
                },
                {
                    "name": "state",
                    "title": "State",
                    "type": "`$STRING`"
                },
                {
                    "name": "streetaddr",
                    "title": "Streetaddr",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "update": {
                            "type": "`$STRING`"
                        }
                    }
                },
                {
                    "name": "streetaddr2",
                    "title": "Streetaddr2",
                    "type": "`$STRING`"
                },
                {
                    "name": "sync_contact_email",
                    "title": "Sync Contact Email",
                    "type": "`$STRING`"
                },
                {
                    "name": "type",
                    "title": "Type",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "list": {
                            "type": "`$STRING`"
                        }
                    }
                },
                {
                    "name": "vat_number",
                    "title": "Vat Number",
                    "type": "`$STRING`"
                },
                {
                    "name": "zip",
                    "title": "Zip",
                    "type": "`$STRING`",
                    "op": {
                        "load": {
                            "req": true,
                            "type": "`$STRING`"
                        }
                    }
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "organization",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/organization/organizations/{org_id}/action",
                            "segments": [
                                {
                                    "lit": "organization"
                                },
                                {
                                    "lit": "organizations"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "action"
                                }
                            ],
                            "parts": [
                                "organization",
                                "organizations",
                                "{id}",
                                "action"
                            ],
                            "rename": {
                                "param": {
                                    "org_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "org_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "action",
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/organization/organizations/{org_id}/customers",
                            "segments": [
                                {
                                    "lit": "organization"
                                },
                                {
                                    "lit": "organizations"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "customers"
                                }
                            ],
                            "parts": [
                                "organization",
                                "organizations",
                                "{id}",
                                "customers"
                            ],
                            "rename": {
                                "param": {
                                    "org_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "org_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "customer",
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/organization/access-tokens",
                            "segments": [
                                {
                                    "lit": "organization"
                                },
                                {
                                    "lit": "access-tokens"
                                }
                            ],
                            "parts": [
                                "organization",
                                "access-tokens"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {
                                "$action": "access_token"
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/organization/organizations",
                            "segments": [
                                {
                                    "lit": "organization"
                                },
                                {
                                    "lit": "organizations"
                                }
                            ],
                            "parts": [
                                "organization",
                                "organizations"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/organization/organizations/{org_id}/customers",
                            "segments": [
                                {
                                    "lit": "organization"
                                },
                                {
                                    "lit": "organizations"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "customers"
                                }
                            ],
                            "parts": [
                                "organization",
                                "organizations",
                                "{id}",
                                "customers"
                            ],
                            "rename": {
                                "param": {
                                    "org_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "org_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "name",
                                        "orig": "name",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "field": true
                                    },
                                    {
                                        "name": "page",
                                        "orig": "page",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 1
                                    },
                                    {
                                        "name": "per_page",
                                        "orig": "per_page",
                                        "type": "`$INTEGER`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "permission",
                                        "orig": "permission",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "sort_by",
                                        "orig": "sort_by",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "name"
                                    }
                                ]
                            },
                            "select": {
                                "$action": "customer",
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/organization/organizations",
                            "segments": [
                                {
                                    "lit": "organization"
                                },
                                {
                                    "lit": "organizations"
                                }
                            ],
                            "parts": [
                                "organization",
                                "organizations"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "name",
                                        "orig": "name",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "field": true
                                    },
                                    {
                                        "name": "permission",
                                        "orig": "permission",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "sort_by",
                                        "orig": "sort_by",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "name"
                                    },
                                    {
                                        "name": "type",
                                        "orig": "type",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "field": true
                                    },
                                    {
                                        "name": "~name",
                                        "orig": "~name",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/organization/organizations/{org_id}/customers/{id}",
                            "segments": [
                                {
                                    "lit": "organization"
                                },
                                {
                                    "lit": "organizations"
                                },
                                {
                                    "var": "org_id"
                                },
                                {
                                    "lit": "customers"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "organization",
                                "organizations",
                                "{org_id}",
                                "customers",
                                "{id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "org_id",
                                        "orig": "org_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id",
                                    "org_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/organization/organizations/{org_id}",
                            "segments": [
                                {
                                    "lit": "organization"
                                },
                                {
                                    "lit": "organizations"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "organization",
                                "organizations",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "org_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "org_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/organization/user-info",
                            "segments": [
                                {
                                    "lit": "organization"
                                },
                                {
                                    "lit": "user-info"
                                }
                            ],
                            "parts": [
                                "organization",
                                "user-info"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {
                                "$action": "user_info"
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/organization/organizations/{org_id}/customers/{id}",
                            "segments": [
                                {
                                    "lit": "organization"
                                },
                                {
                                    "lit": "organizations"
                                },
                                {
                                    "var": "org_id"
                                },
                                {
                                    "lit": "customers"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "organization",
                                "organizations",
                                "{org_id}",
                                "customers",
                                "{id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "org_id",
                                        "orig": "org_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id",
                                    "org_id"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/organization/organizations/{org_id}",
                            "segments": [
                                {
                                    "lit": "organization"
                                },
                                {
                                    "lit": "organizations"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "organization",
                                "organizations",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "org_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "org_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                },
                "update": {
                    "input": "data",
                    "name": "update",
                    "points": [
                        {
                            "kind": "http",
                            "method": "PATCH",
                            "orig": "/organization/organizations/{org_id}/customers/{id}",
                            "segments": [
                                {
                                    "lit": "organization"
                                },
                                {
                                    "lit": "organizations"
                                },
                                {
                                    "var": "org_id"
                                },
                                {
                                    "lit": "customers"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "organization",
                                "organizations",
                                "{org_id}",
                                "customers",
                                "{id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "org_id",
                                        "orig": "org_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id",
                                    "org_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "PATCH",
                            "orig": "/organization/organizations/{org_id}",
                            "segments": [
                                {
                                    "lit": "organization"
                                },
                                {
                                    "lit": "organizations"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "organization",
                                "organizations",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "org_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "org_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "template": {
            "fields": [
                {
                    "name": "attempt",
                    "title": "Attempt",
                    "type": "`$INTEGER`",
                    "req": true
                },
                {
                    "name": "created_at",
                    "title": "Created At",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "description",
                    "title": "Description",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        },
                        "update": {
                            "type": "`$STRING`"
                        }
                    }
                },
                {
                    "name": "dispatch_href",
                    "title": "Dispatch Href",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "editable",
                    "title": "Editable",
                    "type": "`$BOOLEAN`",
                    "req": true
                },
                {
                    "name": "href",
                    "title": "Href",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "message",
                    "title": "Message",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "name",
                    "title": "Name",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "update": {
                            "type": "`$STRING`"
                        }
                    }
                },
                {
                    "name": "namespaces",
                    "title": "Namespaces",
                    "type": "`$ARRAY`",
                    "req": true
                },
                {
                    "name": "object_id",
                    "title": "Object Id",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "object_type",
                    "title": "Object Type",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "orgname",
                    "title": "Orgname",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "payload",
                    "title": "Payload",
                    "type": "`$OBJECT`",
                    "req": true,
                    "op": {
                        "update": {
                            "type": "`$OBJECT`"
                        }
                    }
                },
                {
                    "name": "sharing_id",
                    "title": "Sharing Id",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "sharing_space",
                    "title": "Sharing Space",
                    "type": "`$OBJECT`",
                    "req": true
                },
                {
                    "name": "state",
                    "title": "State",
                    "type": "`$INTEGER`",
                    "req": true
                },
                {
                    "name": "state_msg",
                    "title": "State Msg",
                    "type": "`$STRING`"
                },
                {
                    "name": "target",
                    "title": "Target",
                    "type": "`$OBJECT`",
                    "req": true
                },
                {
                    "name": "target_id",
                    "title": "Target Id",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "target_type",
                    "title": "Target Type",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "task_history",
                    "title": "Task History",
                    "type": "`$ARRAY`",
                    "req": true
                },
                {
                    "name": "task_status",
                    "title": "Task Status",
                    "type": "`$OBJECT`",
                    "req": true
                },
                {
                    "name": "task_updated_at",
                    "title": "Task Updated At",
                    "type": "`$STRING`"
                },
                {
                    "name": "template_id",
                    "title": "Template Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "template_name",
                    "title": "Template Name",
                    "type": "`$STRING`"
                },
                {
                    "name": "variables",
                    "title": "Variables",
                    "type": "`$ARRAY`",
                    "req": true
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "template",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/template/templates/{id}",
                            "segments": [
                                {
                                    "lit": "template"
                                },
                                {
                                    "lit": "templates"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "template",
                                "templates",
                                "{id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/template/templates",
                            "segments": [
                                {
                                    "lit": "template"
                                },
                                {
                                    "lit": "templates"
                                }
                            ],
                            "parts": [
                                "template",
                                "templates"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "sharing_id",
                                        "orig": "sharing_id",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/template/templates",
                            "segments": [
                                {
                                    "lit": "template"
                                },
                                {
                                    "lit": "templates"
                                }
                            ],
                            "parts": [
                                "template",
                                "templates"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "page",
                                        "orig": "page",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 1
                                    },
                                    {
                                        "name": "per_page",
                                        "orig": "per_page",
                                        "type": "`$INTEGER`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/template/dispatch/{id}",
                            "segments": [
                                {
                                    "lit": "template"
                                },
                                {
                                    "lit": "dispatch"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "template",
                                "dispatch",
                                "{id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/template/templates/{id}",
                            "segments": [
                                {
                                    "lit": "template"
                                },
                                {
                                    "lit": "templates"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "template",
                                "templates",
                                "{id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/template/templates/{id}",
                            "segments": [
                                {
                                    "lit": "template"
                                },
                                {
                                    "lit": "templates"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "template",
                                "templates",
                                "{id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                },
                "update": {
                    "input": "data",
                    "name": "update",
                    "points": [
                        {
                            "kind": "http",
                            "method": "PATCH",
                            "orig": "/template/templates/{id}",
                            "segments": [
                                {
                                    "lit": "template"
                                },
                                {
                                    "lit": "templates"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "template",
                                "templates",
                                "{id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "web_hosting": {
            "fields": [
                {
                    "name": "access_information",
                    "title": "Access Information",
                    "type": "`$OBJECT`",
                    "req": true
                },
                {
                    "name": "application",
                    "title": "Application",
                    "type": "`$OBJECT`",
                    "req": true
                },
                {
                    "name": "authentication",
                    "title": "Authentication",
                    "type": "`$OBJECT`",
                    "req": true
                },
                {
                    "name": "autorenew",
                    "title": "Autorenew",
                    "type": "`$OBJECT`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$BOOLEAN`"
                        }
                    }
                },
                {
                    "name": "available_upgrade",
                    "title": "Available Upgrade",
                    "type": "`$BOOLEAN`",
                    "req": true
                },
                {
                    "name": "booster",
                    "title": "Booster",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "booster_options",
                    "title": "Booster Options",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "compatible_applications",
                    "title": "Compatible Applications",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "console",
                    "title": "Console",
                    "type": "`$OBJECT`",
                    "req": true
                },
                {
                    "name": "cpu",
                    "title": "Cpu",
                    "type": "`$INTEGER`",
                    "req": true
                },
                {
                    "name": "created_at",
                    "title": "Created At",
                    "type": "`$STRING`",
                    "req": true,
                    "format": "date-time"
                },
                {
                    "name": "database",
                    "title": "Database",
                    "type": "`$OBJECT`",
                    "req": true
                },
                {
                    "name": "datacenter",
                    "title": "Datacenter",
                    "type": "`$OBJECT`",
                    "req": true
                },
                {
                    "name": "deployment",
                    "title": "Deployment",
                    "type": "`$OBJECT`",
                    "req": true
                },
                {
                    "name": "disk_size_bytes",
                    "title": "Disk Size Bytes",
                    "type": "`$INTEGER`",
                    "req": true
                },
                {
                    "name": "disk_used_bytes",
                    "title": "Disk Used Bytes",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "domain",
                    "title": "Domain",
                    "type": "`$STRING`",
                    "op": {
                        "create": {
                            "req": true,
                            "type": "`$OBJECT`"
                        }
                    }
                },
                {
                    "name": "duration",
                    "title": "Duration",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "duration_unit",
                    "title": "Duration Unit",
                    "type": "`$STRING`"
                },
                {
                    "name": "errors",
                    "title": "Errors",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "expire_at",
                    "title": "Expire At",
                    "type": "`$STRING`",
                    "req": true,
                    "format": "date-time"
                },
                {
                    "name": "fqdn",
                    "title": "Fqdn",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "https_strategy",
                    "title": "Https Strategy",
                    "type": "`$STRING`",
                    "op": {
                        "create": {
                            "req": true,
                            "type": "`$STRING`"
                        }
                    }
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "is_a_test_vhost",
                    "title": "Is A Test Vhost",
                    "type": "`$BOOLEAN`",
                    "req": true
                },
                {
                    "name": "language",
                    "title": "Language",
                    "type": "`$OBJECT`",
                    "req": true
                },
                {
                    "name": "language_id",
                    "title": "Language Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "linked_dns_zone",
                    "title": "Linked Dns Zone",
                    "type": "`$OBJECT`",
                    "req": true
                },
                {
                    "name": "location",
                    "title": "Location",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "message",
                    "title": "Message",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "name",
                    "title": "Name",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        },
                        "update": {
                            "type": "`$STRING`"
                        }
                    }
                },
                {
                    "name": "name_label",
                    "title": "Name Label",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "password",
                    "title": "Password",
                    "type": "`$STRING`"
                },
                {
                    "name": "password_updated_at",
                    "title": "Password Updated At",
                    "type": "`$STRING`",
                    "format": "date-time"
                },
                {
                    "name": "ram",
                    "title": "Ram",
                    "type": "`$OBJECT`",
                    "req": true
                },
                {
                    "name": "requirements",
                    "title": "Requirements",
                    "type": "`$ARRAY`",
                    "req": true
                },
                {
                    "name": "sharing_space",
                    "title": "Sharing Space",
                    "type": "`$OBJECT`",
                    "req": true
                },
                {
                    "name": "size",
                    "title": "Size",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "update": {
                            "type": "`$STRING`"
                        }
                    }
                },
                {
                    "name": "snapshot_enabled",
                    "title": "Snapshot Enabled",
                    "type": "`$BOOLEAN`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$BOOLEAN`"
                        },
                        "update": {
                            "type": "`$BOOLEAN`"
                        }
                    }
                },
                {
                    "name": "status",
                    "title": "Status",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "storage",
                    "title": "Storage",
                    "type": "`$OBJECT`",
                    "req": true
                },
                {
                    "name": "storage_additional_size",
                    "title": "Storage Additional Size",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "subscription_cancelled",
                    "title": "Subscription Cancelled",
                    "type": "`$BOOLEAN`"
                },
                {
                    "name": "tls_validated_at",
                    "title": "Tls Validated At",
                    "type": "`$STRING`",
                    "format": "date-time"
                },
                {
                    "name": "type",
                    "title": "Type",
                    "type": "`$OBJECT`",
                    "req": true
                },
                {
                    "name": "upgrade_to",
                    "title": "Upgrade To",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "vhosts",
                    "title": "Vhosts",
                    "type": "`$ARRAY`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$ARRAY`"
                        }
                    }
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "web_hosting",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/simplehosting/instances/{instance_id}/action",
                            "segments": [
                                {
                                    "lit": "simplehosting"
                                },
                                {
                                    "lit": "instances"
                                },
                                {
                                    "var": "instance_id"
                                },
                                {
                                    "lit": "action"
                                }
                            ],
                            "parts": [
                                "simplehosting",
                                "instances",
                                "{instance_id}",
                                "action"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "instance_id",
                                        "orig": "instance_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "action",
                                "exist": [
                                    "instance_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/simplehosting/instances/{instance_id}/vhosts",
                            "segments": [
                                {
                                    "lit": "simplehosting"
                                },
                                {
                                    "lit": "instances"
                                },
                                {
                                    "var": "instance_id"
                                },
                                {
                                    "lit": "vhosts"
                                }
                            ],
                            "parts": [
                                "simplehosting",
                                "instances",
                                "{instance_id}",
                                "vhosts"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "instance_id",
                                        "orig": "instance_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "instance_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/simplehosting/instances",
                            "segments": [
                                {
                                    "lit": "simplehosting"
                                },
                                {
                                    "lit": "instances"
                                }
                            ],
                            "parts": [
                                "simplehosting",
                                "instances"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "dry_run",
                                        "orig": "Dry-Run",
                                        "type": "`$INTEGER`",
                                        "kind": "header"
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "sharing_id",
                                        "orig": "sharing_id",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/simplehosting/instances/{instance_id}/vhosts",
                            "segments": [
                                {
                                    "lit": "simplehosting"
                                },
                                {
                                    "lit": "instances"
                                },
                                {
                                    "var": "instance_id"
                                },
                                {
                                    "lit": "vhosts"
                                }
                            ],
                            "parts": [
                                "simplehosting",
                                "instances",
                                "{instance_id}",
                                "vhosts"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "instance_id",
                                        "orig": "instance_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "fqdn",
                                        "orig": "fqdn",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "field": true
                                    },
                                    {
                                        "name": "page",
                                        "orig": "page",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 1
                                    },
                                    {
                                        "name": "per_page",
                                        "orig": "per_page",
                                        "type": "`$INTEGER`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "sort_by",
                                        "orig": "sort_by",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "-created_at"
                                    },
                                    {
                                        "name": "status",
                                        "orig": "status",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "field": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "instance_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/simplehosting/applications",
                            "segments": [
                                {
                                    "lit": "simplehosting"
                                },
                                {
                                    "lit": "applications"
                                }
                            ],
                            "parts": [
                                "simplehosting",
                                "applications"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "database",
                                        "orig": "database",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "field": true
                                    },
                                    {
                                        "name": "language",
                                        "orig": "language",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "field": true
                                    },
                                    {
                                        "name": "name",
                                        "orig": "name",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "field": true
                                    },
                                    {
                                        "name": "page",
                                        "orig": "page",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 1
                                    },
                                    {
                                        "name": "per_page",
                                        "orig": "per_page",
                                        "type": "`$INTEGER`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "sharing_id",
                                        "orig": "sharing_id",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "sort_by",
                                        "orig": "sort_by",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "-created_at"
                                    }
                                ]
                            },
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/simplehosting/instances",
                            "segments": [
                                {
                                    "lit": "simplehosting"
                                },
                                {
                                    "lit": "instances"
                                }
                            ],
                            "parts": [
                                "simplehosting",
                                "instances"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "fqdn",
                                        "orig": "fqdn",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "field": true
                                    },
                                    {
                                        "name": "name",
                                        "orig": "name",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "field": true
                                    },
                                    {
                                        "name": "page",
                                        "orig": "page",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 1
                                    },
                                    {
                                        "name": "per_page",
                                        "orig": "per_page",
                                        "type": "`$INTEGER`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "sharing_id",
                                        "orig": "sharing_id",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "size",
                                        "orig": "size",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "field": true
                                    },
                                    {
                                        "name": "sort_by",
                                        "orig": "sort_by",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "-created_at"
                                    },
                                    {
                                        "name": "status",
                                        "orig": "status",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "field": true
                                    }
                                ]
                            },
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/simplehosting/instances/{instance_id}/vhosts/{vhost_fqdn}",
                            "segments": [
                                {
                                    "lit": "simplehosting"
                                },
                                {
                                    "lit": "instances"
                                },
                                {
                                    "var": "instance_id"
                                },
                                {
                                    "lit": "vhosts"
                                },
                                {
                                    "var": "vhost_fqdn"
                                }
                            ],
                            "parts": [
                                "simplehosting",
                                "instances",
                                "{instance_id}",
                                "vhosts",
                                "{vhost_fqdn}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "instance_id",
                                        "orig": "instance_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "vhost_fqdn",
                                        "orig": "vhost_fqdn",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "instance_id",
                                    "vhost_fqdn"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/simplehosting/applications/{application_name}",
                            "segments": [
                                {
                                    "lit": "simplehosting"
                                },
                                {
                                    "lit": "applications"
                                },
                                {
                                    "var": "application_name"
                                }
                            ],
                            "parts": [
                                "simplehosting",
                                "applications",
                                "{application_name}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "application_name",
                                        "orig": "application_name",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "application_name"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/simplehosting/instances/{instance_id}",
                            "segments": [
                                {
                                    "lit": "simplehosting"
                                },
                                {
                                    "lit": "instances"
                                },
                                {
                                    "var": "instance_id"
                                }
                            ],
                            "parts": [
                                "simplehosting",
                                "instances",
                                "{instance_id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "instance_id",
                                        "orig": "instance_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "instance_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/simplehosting/instances/{instance_id}/usage",
                            "segments": [
                                {
                                    "lit": "simplehosting"
                                },
                                {
                                    "lit": "instances"
                                },
                                {
                                    "var": "instance_id"
                                },
                                {
                                    "lit": "usage"
                                }
                            ],
                            "parts": [
                                "simplehosting",
                                "instances",
                                "{instance_id}",
                                "usage"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "instance_id",
                                        "orig": "instance_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "instance_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/simplehosting/instances/{instance_id}/vhosts/{vhost_fqdn}",
                            "segments": [
                                {
                                    "lit": "simplehosting"
                                },
                                {
                                    "lit": "instances"
                                },
                                {
                                    "var": "instance_id"
                                },
                                {
                                    "lit": "vhosts"
                                },
                                {
                                    "var": "vhost_fqdn"
                                }
                            ],
                            "parts": [
                                "simplehosting",
                                "instances",
                                "{instance_id}",
                                "vhosts",
                                "{vhost_fqdn}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "instance_id",
                                        "orig": "instance_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "vhost_fqdn",
                                        "orig": "vhost_fqdn",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "instance_id",
                                    "vhost_fqdn"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/simplehosting/instances/{instance_id}/vhosts/{vhost_fqdn}/cache",
                            "segments": [
                                {
                                    "lit": "simplehosting"
                                },
                                {
                                    "lit": "instances"
                                },
                                {
                                    "var": "instance_id"
                                },
                                {
                                    "lit": "vhosts"
                                },
                                {
                                    "var": "vhost_fqdn"
                                },
                                {
                                    "lit": "cache"
                                }
                            ],
                            "parts": [
                                "simplehosting",
                                "instances",
                                "{instance_id}",
                                "vhosts",
                                "{vhost_fqdn}",
                                "cache"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "instance_id",
                                        "orig": "instance_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "vhost_fqdn",
                                        "orig": "vhost_fqdn",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "cache",
                                "exist": [
                                    "instance_id",
                                    "vhost_fqdn"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/simplehosting/instances/{instance_id}",
                            "segments": [
                                {
                                    "lit": "simplehosting"
                                },
                                {
                                    "lit": "instances"
                                },
                                {
                                    "var": "instance_id"
                                }
                            ],
                            "parts": [
                                "simplehosting",
                                "instances",
                                "{instance_id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "instance_id",
                                        "orig": "instance_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "instance_id"
                                ]
                            }
                        }
                    ]
                },
                "update": {
                    "input": "data",
                    "name": "update",
                    "points": [
                        {
                            "kind": "http",
                            "method": "PATCH",
                            "orig": "/simplehosting/instances/{instance_id}/vhosts/{vhost_fqdn}",
                            "segments": [
                                {
                                    "lit": "simplehosting"
                                },
                                {
                                    "lit": "instances"
                                },
                                {
                                    "var": "instance_id"
                                },
                                {
                                    "lit": "vhosts"
                                },
                                {
                                    "var": "vhost_fqdn"
                                }
                            ],
                            "parts": [
                                "simplehosting",
                                "instances",
                                "{instance_id}",
                                "vhosts",
                                "{vhost_fqdn}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "instance_id",
                                        "orig": "instance_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "vhost_fqdn",
                                        "orig": "vhost_fqdn",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "instance_id",
                                    "vhost_fqdn"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "PATCH",
                            "orig": "/simplehosting/instances/{instance_id}",
                            "segments": [
                                {
                                    "lit": "simplehosting"
                                },
                                {
                                    "lit": "instances"
                                },
                                {
                                    "var": "instance_id"
                                }
                            ],
                            "parts": [
                                "simplehosting",
                                "instances",
                                "{instance_id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "instance_id",
                                        "orig": "instance_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "instance_id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map