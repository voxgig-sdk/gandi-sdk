# Gandi SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "Gandi",
            "slug": "gandi",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "debug": {
        "options": {
          "active": False,
          "max": 100,
          "redact": [
            "authorization",
            "cookie",
            "set-cookie",
            "api-key",
            "apikey",
            "x-api-key",
            "idempotency-key",
          ],
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "onEntry": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "none",
      },
            "idempotency": {
        "options": {
          "active": False,
          "header": "Idempotency-Key",
          "methods": [
            "POST",
            "PUT",
            "PATCH",
            "DELETE",
          ],
          "ops": [
            "create",
            "update",
            "remove",
          ],
        },
        "optspec": {
          "keygen": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "none",
      },
            "metrics": {
        "options": {
          "active": False,
        },
        "optspec": {
          "now": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "none",
      },
            "paging": {
        "options": {
          "active": False,
          "afterVar": "after",
          "cursorParam": "cursor",
          "firstVar": "first",
          "limitParam": "limit",
          "pageParam": "page",
          "startPage": 1,
        },
        "optspec": {
          "limit": "`$NUMBER`",
          "ops": "`$LIST`",
        },
        "strict": False,
        "transport": "none",
      },
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
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
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "secrets": {
        "options": {
          "active": False,
          "cache": True,
          "exchange": {
            "active": False,
            "method": "POST",
            "path": "auth/token",
            "refresh": "",
            "request": "refresh_token",
            "response": "access_token",
            "retries": 1,
            "statuses": [
              401,
            ],
          },
          "name": "apikey",
          "providers": [],
        },
        "optspec": {},
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "now": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://api.gandi.net/v5",
            "auth": {
                "prefix": "Bearer",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "access_token": {},
                "acme_account": {},
                "acme_domain": {},
                "acme_price": {},
                "acme_subscription": {},
                "billing_info": {},
                "billing_price": {},
                "certificate_dcv": {},
                "certificate_package": {},
                "certificate_pem": {},
                "certificate_renewal": {},
                "certificate_tag": {},
                "comment": {},
                "domain": {},
                "domain_availability": {},
                "domain_change_owner": {},
                "domain_claim": {},
                "domain_contact": {},
                "domain_dnskey": {},
                "domain_dnssec": {},
                "domain_host": {},
                "domain_livedns": {},
                "domain_nameserver": {},
                "domain_tag": {},
                "domain_transfer": {},
                "domain_webredir": {},
                "email_forward": {},
                "email_mailbox": {},
                "email_migration": {},
                "email_offer": {},
                "email_slot": {},
                "hosting_application": {},
                "hosting_instance": {},
                "hosting_vhost": {},
                "issued_certificate": {},
                "linked_zone": {},
                "linked_zone_deployment": {},
                "linked_zone_domain": {},
                "linked_zone_task": {},
                "livedns_axfr_slave": {},
                "livedns_axfr_tsig": {},
                "livedns_domain": {},
                "livedns_key": {},
                "livedns_nameserver": {},
                "livedns_record": {},
                "livedns_rrtype": {},
                "livedns_snapshot": {},
                "livedns_tsig_key": {},
                "livedns_zone": {},
                "mailbox": {},
                "mailbox_domain": {},
                "mailbox_forward": {},
                "mailbox_product": {},
                "mailbox_quota": {},
                "mailbox_slot": {},
                "organization": {},
                "organization_customer": {},
                "template": {},
                "template_dispatch": {},
                "tld": {},
                "user": {},
            },
        },
        "entity": {
      "access_token": {
        "fields": [
          {
            "name": "access_token",
            "title": "Access Token",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "entities",
            "title": "Entities",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "expires_at",
            "title": "Expires At",
            "type": "`$STRING`",
            "req": True,
            "op": {
              "create": {
                "type": "`$STRING`",
              },
            },
            "format": "date-time",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "req": True,
            "op": {
              "create": {
                "type": "`$STRING`",
              },
            },
          },
          {
            "name": "scopes",
            "title": "Scopes",
            "type": "`$ARRAY`",
            "req": True,
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "access_token",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/organization/access-tokens",
                "segments": [
                  {
                    "lit": "organization",
                  },
                  {
                    "lit": "access-tokens",
                  },
                ],
                "parts": [
                  "organization",
                  "access-tokens",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "acme_account": {
        "fields": [
          {
            "name": "created_at",
            "title": "Created At",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "deleted_at",
            "title": "Deleted At",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "external_id",
            "title": "External Id",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "ip",
            "title": "Ip",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "last_activity",
            "title": "Last Activity",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "status",
            "title": "Status",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "subscription_id",
            "title": "Subscription Id",
            "type": "`$STRING`",
            "req": True,
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "acme_account",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/acme/subscriptions/{subscription_id}/accounts",
                "segments": [
                  {
                    "lit": "acme",
                  },
                  {
                    "lit": "subscriptions",
                  },
                  {
                    "var": "subscription_id",
                  },
                  {
                    "lit": "accounts",
                  },
                ],
                "parts": [
                  "acme",
                  "subscriptions",
                  "{subscription_id}",
                  "accounts",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "subscription_id",
                      "orig": "subscription_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "sharing_id",
                      "orig": "sharing_id",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "sharing_id",
                    "subscription_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
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
                    "lit": "acme",
                  },
                  {
                    "lit": "subscriptions",
                  },
                  {
                    "var": "subscription_id",
                  },
                  {
                    "lit": "accounts",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "acme",
                  "subscriptions",
                  "{subscription_id}",
                  "accounts",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "account_id": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "account_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "subscription_id",
                      "orig": "subscription_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "sharing_id",
                      "orig": "sharing_id",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                    "sharing_id",
                    "subscription_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "acme_domain": {
        "fields": [
          {
            "name": "created_at",
            "title": "Created At",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "deleted_at",
            "title": "Deleted At",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "hostname",
            "title": "Hostname",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "hostname_ulabel",
            "title": "Hostname Ulabel",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "is_wildcard",
            "title": "Is Wildcard",
            "type": "`$BOOLEAN`",
            "req": True,
          },
          {
            "name": "status",
            "title": "Status",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "subscription_id",
            "title": "Subscription Id",
            "type": "`$STRING`",
            "req": True,
          },
        ],
        "name": "acme_domain",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/acme/subscriptions/{subscription_id}/domains",
                "segments": [
                  {
                    "lit": "acme",
                  },
                  {
                    "lit": "subscriptions",
                  },
                  {
                    "var": "subscription_id",
                  },
                  {
                    "lit": "domains",
                  },
                ],
                "parts": [
                  "acme",
                  "subscriptions",
                  "{subscription_id}",
                  "domains",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "subscription_id",
                      "orig": "subscription_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "domain",
                      "orig": "domain",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                    },
                    {
                      "name": "sharing_id",
                      "orig": "sharing_id",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "domain",
                    "sharing_id",
                    "subscription_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/acme/subscriptions/{subscription_id}/domains/{domain_id}",
                "segments": [
                  {
                    "lit": "acme",
                  },
                  {
                    "lit": "subscriptions",
                  },
                  {
                    "var": "subscription_id",
                  },
                  {
                    "lit": "domains",
                  },
                  {
                    "var": "domain_id",
                  },
                ],
                "parts": [
                  "acme",
                  "subscriptions",
                  "{subscription_id}",
                  "domains",
                  "{domain_id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "domain_id",
                      "orig": "domain_id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "subscription_id",
                      "orig": "subscription_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "sharing_id",
                      "orig": "sharing_id",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "domain_id",
                    "sharing_id",
                    "subscription_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.domain",
            ],
          ],
        },
      },
      "acme_price": {
        "fields": [
          {
            "name": "country",
            "title": "Country",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "currency",
            "title": "Currency",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "domains",
            "title": "Domains",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "duration",
            "title": "Duration",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "duration_unit",
            "title": "Duration Unit",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "grid",
            "title": "Grid",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "max_duration",
            "title": "Max Duration",
            "type": "`$INTEGER`",
            "req": True,
          },
          {
            "name": "min_duration",
            "title": "Min Duration",
            "type": "`$INTEGER`",
            "req": True,
          },
          {
            "name": "price_after_taxes",
            "title": "Price After Taxes",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "price_before_taxes",
            "title": "Price Before Taxes",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "process",
            "title": "Process",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "product",
            "title": "Product",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "provider",
            "title": "Provider",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "tax_rate",
            "title": "Tax Rate",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "taxes",
            "title": "Taxes",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "validation_type",
            "title": "Validation Type",
            "type": "`$STRING`",
            "req": True,
          },
        ],
        "name": "acme_price",
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
                    "lit": "acme",
                  },
                  {
                    "lit": "quote",
                  },
                ],
                "parts": [
                  "acme",
                  "quote",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "sharing_id",
                      "orig": "sharing_id",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "sharing_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
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
                    "lit": "acme",
                  },
                  {
                    "lit": "catalog",
                  },
                ],
                "parts": [
                  "acme",
                  "catalog",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "country",
                      "orig": "country",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                      "field": True,
                    },
                    {
                      "name": "currency",
                      "orig": "currency",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                      "field": True,
                    },
                    {
                      "name": "duration",
                      "orig": "duration",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                      "field": True,
                    },
                    {
                      "name": "grid",
                      "orig": "grid",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                      "field": True,
                    },
                    {
                      "name": "process",
                      "orig": "process",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                      "field": True,
                    },
                    {
                      "name": "provider",
                      "orig": "provider",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                      "field": True,
                    },
                    {
                      "name": "sharing_id",
                      "orig": "sharing_id",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                    },
                    {
                      "name": "validation_type",
                      "orig": "validation_type",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                      "field": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "country",
                    "currency",
                    "duration",
                    "grid",
                    "process",
                    "provider",
                    "sharing_id",
                    "validation_type",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "acme_subscription": {
        "fields": [
          {
            "name": "country",
            "title": "Country",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "created_at",
            "title": "Created At",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "currency",
            "title": "Currency",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "domains",
            "title": "Domains",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "duration",
            "title": "Duration",
            "type": "`$INTEGER`",
            "req": True,
          },
          {
            "name": "eab_hmac",
            "title": "Eab Hmac",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "eab_id",
            "title": "Eab Id",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "ends_at",
            "title": "Ends At",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "grid",
            "title": "Grid",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "message",
            "title": "Message",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "provider",
            "title": "Provider",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "server_url",
            "title": "Server Url",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "status",
            "title": "Status",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "subscription_id",
            "title": "Subscription Id",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "validation_type",
            "title": "Validation Type",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "years",
            "title": "Years",
            "type": "`$STRING`",
            "req": True,
          },
        ],
        "name": "acme_subscription",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/acme/subscriptions",
                "segments": [
                  {
                    "lit": "acme",
                  },
                  {
                    "lit": "subscriptions",
                  },
                ],
                "parts": [
                  "acme",
                  "subscriptions",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "sharing_id",
                      "orig": "sharing_id",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "sharing_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/acme/subscriptions",
                "segments": [
                  {
                    "lit": "acme",
                  },
                  {
                    "lit": "subscriptions",
                  },
                ],
                "parts": [
                  "acme",
                  "subscriptions",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "created_at",
                      "orig": "created_at",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                      "field": True,
                    },
                    {
                      "name": "ends_at",
                      "orig": "ends_at",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                      "field": True,
                    },
                    {
                      "name": "name",
                      "orig": "name",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                      "field": True,
                    },
                    {
                      "name": "provider",
                      "orig": "provider",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                      "field": True,
                    },
                    {
                      "name": "sharing_id",
                      "orig": "sharing_id",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                    },
                    {
                      "name": "status",
                      "orig": "status",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                      "field": True,
                    },
                    {
                      "name": "validation_type",
                      "orig": "validation_type",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                      "field": True,
                    },
                    {
                      "name": "year",
                      "orig": "years",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "created_at",
                    "ends_at",
                    "name",
                    "provider",
                    "sharing_id",
                    "status",
                    "validation_type",
                    "year",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/acme/subscriptions/{subscription_id}",
                "segments": [
                  {
                    "lit": "acme",
                  },
                  {
                    "lit": "subscriptions",
                  },
                  {
                    "var": "subscription_id",
                  },
                ],
                "parts": [
                  "acme",
                  "subscriptions",
                  "{subscription_id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "subscription_id",
                      "orig": "subscription_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "sharing_id",
                      "orig": "sharing_id",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "sharing_id",
                    "subscription_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
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
                    "lit": "acme",
                  },
                  {
                    "lit": "subscriptions",
                  },
                  {
                    "var": "subscription_id",
                  },
                ],
                "parts": [
                  "acme",
                  "subscriptions",
                  "{subscription_id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "subscription_id",
                      "orig": "subscription_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "sharing_id",
                      "orig": "sharing_id",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "sharing_id",
                    "subscription_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
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
                    "lit": "acme",
                  },
                  {
                    "lit": "subscriptions",
                  },
                  {
                    "var": "subscription_id",
                  },
                ],
                "parts": [
                  "acme",
                  "subscriptions",
                  "{subscription_id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "subscription_id",
                      "orig": "subscription_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "sharing_id",
                      "orig": "sharing_id",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "sharing_id",
                    "subscription_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "PATCH",
                "orig": "/acme/subscriptions/{subscription_id}/domains",
                "segments": [
                  {
                    "lit": "acme",
                  },
                  {
                    "lit": "subscriptions",
                  },
                  {
                    "var": "subscription_id",
                  },
                  {
                    "lit": "domains",
                  },
                ],
                "parts": [
                  "acme",
                  "subscriptions",
                  "{subscription_id}",
                  "domains",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "subscription_id",
                      "orig": "subscription_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "sharing_id",
                      "orig": "sharing_id",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "$action": "domains",
                  "exist": [
                    "sharing_id",
                    "subscription_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "billing_info": {
        "fields": [
          {
            "name": "annual_balance",
            "title": "Annual Balance",
            "type": "`$NUMBER`",
            "req": True,
          },
          {
            "name": "grid",
            "title": "Grid",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "outstanding_amount",
            "title": "Outstanding Amount",
            "type": "`$NUMBER`",
            "req": True,
          },
          {
            "name": "prepaid",
            "title": "Prepaid",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "prepaid_monthly_invoice",
            "title": "Prepaid Monthly Invoice",
            "type": "`$BOOLEAN`",
          },
        ],
        "name": "billing_info",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/billing/info/{sharing_id}",
                "segments": [
                  {
                    "lit": "billing",
                  },
                  {
                    "lit": "info",
                  },
                  {
                    "var": "sharing_id",
                  },
                ],
                "parts": [
                  "billing",
                  "info",
                  "{sharing_id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "sharing_id",
                      "orig": "sharing_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "sharing_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/billing/info",
                "segments": [
                  {
                    "lit": "billing",
                  },
                  {
                    "lit": "info",
                  },
                ],
                "parts": [
                  "billing",
                  "info",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "billing_price": {
        "fields": [
          {
            "name": "currency",
            "title": "Currency",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "grid",
            "title": "Grid",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "products",
            "title": "Products",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "taxes",
            "title": "Taxes",
            "type": "`$ARRAY`",
            "req": True,
          },
        ],
        "name": "billing_price",
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
                    "lit": "billing",
                  },
                  {
                    "lit": "price",
                  },
                  {
                    "var": "type",
                  },
                ],
                "parts": [
                  "billing",
                  "price",
                  "{type}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "type",
                      "orig": "type",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "active_phase",
                      "orig": "active_phase",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "country",
                      "orig": "country",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "currency",
                      "orig": "currency",
                      "type": "`$STRING`",
                      "kind": "query",
                      "field": True,
                    },
                    {
                      "name": "discount",
                      "orig": "discounts",
                      "type": "`$ARRAY`",
                      "kind": "query",
                    },
                    {
                      "name": "duration_unit",
                      "orig": "duration_unit",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "extension",
                      "orig": "extension",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "feature",
                      "orig": "features",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "grid",
                      "orig": "grid",
                      "type": "`$STRING`",
                      "kind": "query",
                      "field": True,
                    },
                    {
                      "name": "lang",
                      "orig": "lang",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "max_duration",
                      "orig": "max_duration",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "name",
                      "orig": "name",
                      "type": "`$ARRAY`",
                      "kind": "query",
                      "reqd": True,
                    },
                    {
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 1,
                    },
                    {
                      "name": "per_page",
                      "orig": "per_page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "prices_at",
                      "orig": "prices_at",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "process",
                      "orig": "processes",
                      "type": "`$ARRAY`",
                      "kind": "query",
                      "reqd": True,
                    },
                    {
                      "name": "sharing_id",
                      "orig": "sharing_id",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "name",
                    "process",
                    "type",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "certificate_dcv": {
        "fields": [
          {
            "name": "message",
            "title": "Message",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "method",
            "title": "Method",
            "type": "`$STRING`",
            "req": True,
          },
        ],
        "name": "certificate_dcv",
        "op": {
          "patch": {
            "input": "data",
            "name": "patch",
            "points": [
              {
                "kind": "http",
                "method": "PATCH",
                "orig": "/certificate/issued-certs/{id}/dcv",
                "segments": [
                  {
                    "lit": "certificate",
                  },
                  {
                    "lit": "issued-certs",
                  },
                  {
                    "var": "certificate_id",
                  },
                  {
                    "lit": "dcv",
                  },
                ],
                "parts": [
                  "certificate",
                  "issued-certs",
                  "{certificate_id}",
                  "dcv",
                ],
                "rename": {
                  "param": {
                    "id": "certificate_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "certificate_id",
                      "orig": "id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "sharing_id",
                      "orig": "sharing_id",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "certificate_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
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
                    "lit": "certificate",
                  },
                  {
                    "lit": "issued-certs",
                  },
                  {
                    "var": "certificate_id",
                  },
                  {
                    "lit": "dcv",
                  },
                ],
                "parts": [
                  "certificate",
                  "issued-certs",
                  "{certificate_id}",
                  "dcv",
                ],
                "rename": {
                  "param": {
                    "id": "certificate_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "certificate_id",
                      "orig": "id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "sharing_id",
                      "orig": "sharing_id",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "certificate_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "certificate_package": {
        "fields": [
          {
            "name": "category",
            "title": "Category",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "href",
            "title": "Href",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "max_domains",
            "title": "Max Domains",
            "type": "`$INTEGER`",
            "req": True,
          },
          {
            "name": "min_domains",
            "title": "Min Domains",
            "type": "`$INTEGER`",
            "req": True,
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "provider",
            "title": "Provider",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "sgc",
            "title": "Sgc",
            "type": "`$BOOLEAN`",
            "req": True,
          },
          {
            "name": "trustlogo",
            "title": "Trustlogo",
            "type": "`$BOOLEAN`",
            "req": True,
          },
          {
            "name": "warranty",
            "title": "Warranty",
            "type": "`$INTEGER`",
            "req": True,
          },
          {
            "name": "wildcard",
            "title": "Wildcard",
            "type": "`$BOOLEAN`",
            "req": True,
          },
        ],
        "name": "certificate_package",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/certificate/packages",
                "segments": [
                  {
                    "lit": "certificate",
                  },
                  {
                    "lit": "packages",
                  },
                ],
                "parts": [
                  "certificate",
                  "packages",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "category",
                      "orig": "category",
                      "type": "`$STRING`",
                      "kind": "query",
                      "field": True,
                    },
                    {
                      "name": "max_domain",
                      "orig": "max_domains",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "min_domain",
                      "orig": "min_domains",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 1,
                    },
                    {
                      "name": "per_page",
                      "orig": "per_page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "trustlogo",
                      "orig": "trustlogo",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                      "field": True,
                    },
                    {
                      "name": "warranty",
                      "orig": "warranty",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "field": True,
                    },
                    {
                      "name": "wildcard",
                      "orig": "wildcard",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                      "field": True,
                    },
                  ],
                },
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/certificate/packages/{name}",
                "segments": [
                  {
                    "lit": "certificate",
                  },
                  {
                    "lit": "packages",
                  },
                  {
                    "var": "name",
                  },
                ],
                "parts": [
                  "certificate",
                  "packages",
                  "{name}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "name",
                      "orig": "name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "name",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "certificate_pem": {
        "fields": [],
        "name": "certificate_pem",
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
                    "lit": "certificate",
                  },
                  {
                    "lit": "pem",
                  },
                  {
                    "lit": "-",
                  },
                  {
                    "var": "filename",
                  },
                ],
                "parts": [
                  "certificate",
                  "pem",
                  "-",
                  "{filename}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "filename",
                      "orig": "filename",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "filename",
                  ],
                },
                "response": {
                  "kind": "raw",
                  "media": "text/plain",
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/certificate/pem/{type}",
                "segments": [
                  {
                    "lit": "certificate",
                  },
                  {
                    "lit": "pem",
                  },
                  {
                    "var": "type",
                  },
                ],
                "parts": [
                  "certificate",
                  "pem",
                  "{type}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "type",
                      "orig": "type",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "provider",
                      "orig": "provider",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "type",
                  ],
                },
                "response": {
                  "kind": "raw",
                  "media": "text/plain",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "certificate_renewal": {
        "fields": [
          {
            "name": "csr",
            "title": "Csr",
            "type": "`$STRING`",
          },
          {
            "name": "dcv_method",
            "title": "Dcv Method",
            "type": "`$STRING`",
          },
          {
            "name": "duration",
            "title": "Duration",
            "type": "`$INTEGER`",
          },
          {
            "name": "errors",
            "title": "Errors",
            "type": "`$ARRAY`",
          },
          {
            "name": "status",
            "title": "Status",
            "type": "`$STRING`",
            "req": True,
          },
        ],
        "name": "certificate_renewal",
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
                    "lit": "certificate",
                  },
                  {
                    "lit": "issued-certs",
                  },
                  {
                    "var": "certificate_id",
                  },
                ],
                "parts": [
                  "certificate",
                  "issued-certs",
                  "{certificate_id}",
                ],
                "rename": {
                  "param": {
                    "id": "certificate_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "header": [
                    {
                      "name": "dry_run",
                      "orig": "Dry-Run",
                      "type": "`$INTEGER`",
                      "kind": "header",
                    },
                  ],
                  "params": [
                    {
                      "name": "certificate_id",
                      "orig": "id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "sharing_id",
                      "orig": "sharing_id",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "certificate_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "certificate_tag": {
        "fields": [
          {
            "name": "add",
            "title": "Add",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "message",
            "title": "Message",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "remove",
            "title": "Remove",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "tag",
            "title": "Tag",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "tags",
            "title": "Tags",
            "type": "`$ARRAY`",
            "req": True,
          },
        ],
        "name": "certificate_tag",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/certificate/issued-certs/{id}/tags",
                "segments": [
                  {
                    "lit": "certificate",
                  },
                  {
                    "lit": "issued-certs",
                  },
                  {
                    "var": "certificate_id",
                  },
                  {
                    "lit": "tags",
                  },
                ],
                "parts": [
                  "certificate",
                  "issued-certs",
                  "{certificate_id}",
                  "tags",
                ],
                "rename": {
                  "param": {
                    "id": "certificate_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "certificate_id",
                      "orig": "id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "certificate_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
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
                    "lit": "certificate",
                  },
                  {
                    "lit": "issued-certs",
                  },
                  {
                    "var": "certificate_id",
                  },
                  {
                    "lit": "tags",
                  },
                ],
                "parts": [
                  "certificate",
                  "issued-certs",
                  "{certificate_id}",
                  "tags",
                ],
                "rename": {
                  "param": {
                    "id": "certificate_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "certificate_id",
                      "orig": "id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "certificate_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "patch": {
            "input": "data",
            "name": "patch",
            "points": [
              {
                "kind": "http",
                "method": "PATCH",
                "orig": "/certificate/issued-certs/{id}/tags",
                "segments": [
                  {
                    "lit": "certificate",
                  },
                  {
                    "lit": "issued-certs",
                  },
                  {
                    "var": "certificate_id",
                  },
                  {
                    "lit": "tags",
                  },
                ],
                "parts": [
                  "certificate",
                  "issued-certs",
                  "{certificate_id}",
                  "tags",
                ],
                "rename": {
                  "param": {
                    "id": "certificate_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "certificate_id",
                      "orig": "id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "certificate_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/certificate/issued-certs/{id}/tags",
                "segments": [
                  {
                    "lit": "certificate",
                  },
                  {
                    "lit": "issued-certs",
                  },
                  {
                    "var": "certificate_id",
                  },
                  {
                    "lit": "tags",
                  },
                ],
                "parts": [
                  "certificate",
                  "issued-certs",
                  "{certificate_id}",
                  "tags",
                ],
                "rename": {
                  "param": {
                    "id": "certificate_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "certificate_id",
                      "orig": "id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "certificate_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "kind": "http",
                "method": "PUT",
                "orig": "/certificate/issued-certs/{id}/tags",
                "segments": [
                  {
                    "lit": "certificate",
                  },
                  {
                    "lit": "issued-certs",
                  },
                  {
                    "var": "certificate_id",
                  },
                  {
                    "lit": "tags",
                  },
                ],
                "parts": [
                  "certificate",
                  "issued-certs",
                  "{certificate_id}",
                  "tags",
                ],
                "rename": {
                  "param": {
                    "id": "certificate_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "certificate_id",
                      "orig": "id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "certificate_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "comment": {
        "fields": [
          {
            "name": "content",
            "title": "Content",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "created_at",
            "title": "Created At",
            "type": "`$STRING`",
            "format": "date-time",
          },
          {
            "name": "errors",
            "title": "Errors",
            "type": "`$ARRAY`",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "status",
            "title": "Status",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "updated_at",
            "title": "Updated At",
            "type": "`$STRING`",
            "format": "date-time",
          },
          {
            "name": "user",
            "title": "User",
            "type": "`$OBJECT`",
            "req": True,
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
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
                    "lit": "comment",
                  },
                  {
                    "lit": "comments",
                  },
                  {
                    "var": "entity_id",
                  },
                ],
                "parts": [
                  "comment",
                  "comments",
                  "{entity_id}",
                ],
                "rename": {
                  "param": {
                    "id": "entity_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "header": [
                    {
                      "name": "dry_run",
                      "orig": "Dry-Run",
                      "type": "`$INTEGER`",
                      "kind": "header",
                    },
                  ],
                  "params": [
                    {
                      "name": "entity_id",
                      "orig": "id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "entity_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
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
                    "lit": "comment",
                  },
                  {
                    "lit": "comments",
                  },
                  {
                    "var": "entity_id",
                  },
                ],
                "parts": [
                  "comment",
                  "comments",
                  "{entity_id}",
                ],
                "rename": {
                  "param": {
                    "id": "entity_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "entity_id",
                      "orig": "id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "entity_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
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
                    "lit": "comment",
                  },
                  {
                    "lit": "comments",
                  },
                  {
                    "var": "entity_id",
                  },
                ],
                "parts": [
                  "comment",
                  "comments",
                  "{entity_id}",
                ],
                "rename": {
                  "param": {
                    "id": "entity_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "entity_id",
                      "orig": "id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "entity_id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "domain": {
        "fields": [
          {
            "name": "admin",
            "title": "Admin",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "authinfo",
            "title": "Authinfo",
            "type": "`$STRING`",
          },
          {
            "name": "autorenew",
            "title": "Autorenew",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "bill",
            "title": "Bill",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "can_tld_lock",
            "title": "Can Tld Lock",
            "type": "`$BOOLEAN`",
            "req": True,
          },
          {
            "name": "claims",
            "title": "Claims",
            "type": "`$STRING`",
          },
          {
            "name": "contacts",
            "title": "Contacts",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "currency",
            "title": "Currency",
            "type": "`$STRING`",
          },
          {
            "name": "dates",
            "title": "Dates",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "domain_owner",
            "title": "Domain Owner",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "duration",
            "title": "Duration",
            "type": "`$INTEGER`",
          },
          {
            "name": "enforce_premium",
            "title": "Enforce Premium",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "errors",
            "title": "Errors",
            "type": "`$ARRAY`",
          },
          {
            "name": "extra_parameters",
            "title": "Extra Parameters",
            "type": "`$OBJECT`",
          },
          {
            "name": "fqdn",
            "title": "Fqdn",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "fqdn_unicode",
            "title": "Fqdn Unicode",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "href",
            "title": "Href",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "op": {
              "list": {
                "req": True,
                "type": "`$STRING`",
              },
            },
          },
          {
            "name": "lang",
            "title": "Lang",
            "type": "`$STRING`",
          },
          {
            "name": "mailbox_optin",
            "title": "Mailbox Optin",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "nameserver",
            "title": "Nameserver",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "nameservers",
            "title": "Nameservers",
            "type": "`$ARRAY`",
            "req": True,
            "op": {
              "create": {
                "type": "`$ARRAY`",
              },
            },
          },
          {
            "name": "nameservers_ips",
            "title": "Nameservers Ips",
            "type": "`$OBJECT`",
          },
          {
            "name": "orga_owner",
            "title": "Orga Owner",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "owner",
            "title": "Owner",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "price",
            "title": "Price",
            "type": "`$NUMBER`",
          },
          {
            "name": "reachability",
            "title": "Reachability",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "resellee_id",
            "title": "Resellee Id",
            "type": "`$STRING`",
          },
          {
            "name": "services",
            "title": "Services",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "sharing_id",
            "title": "Sharing Id",
            "type": "`$STRING`",
          },
          {
            "name": "sharing_space",
            "title": "Sharing Space",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "smd",
            "title": "Smd",
            "type": "`$STRING`",
          },
          {
            "name": "status",
            "title": "Status",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "tags",
            "title": "Tags",
            "type": "`$ARRAY`",
          },
          {
            "name": "tech",
            "title": "Tech",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "template_id",
            "title": "Template Id",
            "type": "`$STRING`",
          },
          {
            "name": "tld",
            "title": "Tld",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "tld_period",
            "title": "Tld Period",
            "type": "`$STRING`",
          },
          {
            "name": "trustee_roles",
            "title": "Trustee Roles",
            "type": "`$ARRAY`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
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
                "orig": "/domain/domains/{domain}/renew",
                "segments": [
                  {
                    "lit": "domain",
                  },
                  {
                    "lit": "domains",
                  },
                  {
                    "var": "fqdn",
                  },
                  {
                    "lit": "renew",
                  },
                ],
                "parts": [
                  "domain",
                  "domains",
                  "{fqdn}",
                  "renew",
                ],
                "rename": {
                  "param": {
                    "domain": "fqdn",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "header": [
                    {
                      "name": "dry_run",
                      "orig": "Dry-Run",
                      "type": "`$INTEGER`",
                      "kind": "header",
                    },
                  ],
                  "params": [
                    {
                      "name": "fqdn",
                      "orig": "domain",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "sharing_id",
                      "orig": "sharing_id",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "$action": "renew",
                  "exist": [
                    "fqdn",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "POST",
                "orig": "/domain/domains/{domain}/restore",
                "segments": [
                  {
                    "lit": "domain",
                  },
                  {
                    "lit": "domains",
                  },
                  {
                    "var": "fqdn",
                  },
                  {
                    "lit": "restore",
                  },
                ],
                "parts": [
                  "domain",
                  "domains",
                  "{fqdn}",
                  "restore",
                ],
                "rename": {
                  "param": {
                    "domain": "fqdn",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "fqdn",
                      "orig": "domain",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "sharing_id",
                      "orig": "sharing_id",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "$action": "restore",
                  "exist": [
                    "fqdn",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "POST",
                "orig": "/domain/domains/{domain}/transferout",
                "segments": [
                  {
                    "lit": "domain",
                  },
                  {
                    "lit": "domains",
                  },
                  {
                    "var": "fqdn",
                  },
                  {
                    "lit": "transferout",
                  },
                ],
                "parts": [
                  "domain",
                  "domains",
                  "{fqdn}",
                  "transferout",
                ],
                "rename": {
                  "param": {
                    "domain": "fqdn",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "fqdn",
                      "orig": "domain",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "$action": "transferout",
                  "exist": [
                    "fqdn",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "POST",
                "orig": "/domain/domains",
                "segments": [
                  {
                    "lit": "domain",
                  },
                  {
                    "lit": "domains",
                  },
                ],
                "parts": [
                  "domain",
                  "domains",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "header": [
                    {
                      "name": "dry_run",
                      "orig": "Dry-Run",
                      "type": "`$INTEGER`",
                      "kind": "header",
                    },
                  ],
                  "query": [
                    {
                      "name": "sharing_id",
                      "orig": "sharing_id",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/domain/domains",
                "segments": [
                  {
                    "lit": "domain",
                  },
                  {
                    "lit": "domains",
                  },
                ],
                "parts": [
                  "domain",
                  "domains",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "fqdn",
                      "orig": "fqdn",
                      "type": "`$STRING`",
                      "kind": "query",
                      "field": True,
                    },
                    {
                      "name": "nameserver",
                      "orig": "nameserver",
                      "type": "`$STRING`",
                      "kind": "query",
                      "field": True,
                    },
                    {
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 1,
                    },
                    {
                      "name": "per_page",
                      "orig": "per_page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "resellee_id",
                      "orig": "resellee_id",
                      "type": "`$STRING`",
                      "kind": "query",
                      "field": True,
                    },
                    {
                      "name": "sharing_id",
                      "orig": "sharing_id",
                      "type": "`$STRING`",
                      "kind": "query",
                      "field": True,
                    },
                    {
                      "name": "sort_by",
                      "orig": "sort_by",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "fqdn",
                    },
                    {
                      "name": "tld",
                      "orig": "tld",
                      "type": "`$STRING`",
                      "kind": "query",
                      "field": True,
                    },
                  ],
                },
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/domain/domains/{domain}",
                "segments": [
                  {
                    "lit": "domain",
                  },
                  {
                    "lit": "domains",
                  },
                  {
                    "var": "fqdn",
                  },
                ],
                "parts": [
                  "domain",
                  "domains",
                  "{fqdn}",
                ],
                "rename": {
                  "param": {
                    "domain": "fqdn",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "fqdn",
                      "orig": "domain",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "fqdn",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/domain/domains/{domain}/createstatus",
                "segments": [
                  {
                    "lit": "domain",
                  },
                  {
                    "lit": "domains",
                  },
                  {
                    "var": "fqdn",
                  },
                  {
                    "lit": "createstatus",
                  },
                ],
                "parts": [
                  "domain",
                  "domains",
                  "{fqdn}",
                  "createstatus",
                ],
                "rename": {
                  "param": {
                    "domain": "fqdn",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "fqdn",
                      "orig": "domain",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "$action": "createstatus",
                  "exist": [
                    "fqdn",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/domain/domains/{domain}/renew",
                "segments": [
                  {
                    "lit": "domain",
                  },
                  {
                    "lit": "domains",
                  },
                  {
                    "var": "fqdn",
                  },
                  {
                    "lit": "renew",
                  },
                ],
                "parts": [
                  "domain",
                  "domains",
                  "{fqdn}",
                  "renew",
                ],
                "rename": {
                  "param": {
                    "domain": "fqdn",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "fqdn",
                      "orig": "domain",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "$action": "renew",
                  "exist": [
                    "fqdn",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/domain/domains/{domain}/restore",
                "segments": [
                  {
                    "lit": "domain",
                  },
                  {
                    "lit": "domains",
                  },
                  {
                    "var": "fqdn",
                  },
                  {
                    "lit": "restore",
                  },
                ],
                "parts": [
                  "domain",
                  "domains",
                  "{fqdn}",
                  "restore",
                ],
                "rename": {
                  "param": {
                    "domain": "fqdn",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "fqdn",
                      "orig": "domain",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "$action": "restore",
                  "exist": [
                    "fqdn",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/domain/domains/{domain}",
                "segments": [
                  {
                    "lit": "domain",
                  },
                  {
                    "lit": "domains",
                  },
                  {
                    "var": "fqdn",
                  },
                ],
                "parts": [
                  "domain",
                  "domains",
                  "{fqdn}",
                ],
                "rename": {
                  "param": {
                    "domain": "fqdn",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "fqdn",
                      "orig": "domain",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "fqdn",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "kind": "http",
                "method": "PUT",
                "orig": "/domain/domains/{domain}/authinfo",
                "segments": [
                  {
                    "lit": "domain",
                  },
                  {
                    "lit": "domains",
                  },
                  {
                    "var": "fqdn",
                  },
                  {
                    "lit": "authinfo",
                  },
                ],
                "parts": [
                  "domain",
                  "domains",
                  "{fqdn}",
                  "authinfo",
                ],
                "rename": {
                  "param": {
                    "domain": "fqdn",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "fqdn",
                      "orig": "domain",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "$action": "authinfo",
                  "exist": [
                    "fqdn",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "PATCH",
                "orig": "/domain/domains/{domain}/autorenew",
                "segments": [
                  {
                    "lit": "domain",
                  },
                  {
                    "lit": "domains",
                  },
                  {
                    "var": "fqdn",
                  },
                  {
                    "lit": "autorenew",
                  },
                ],
                "parts": [
                  "domain",
                  "domains",
                  "{fqdn}",
                  "autorenew",
                ],
                "rename": {
                  "param": {
                    "domain": "fqdn",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "fqdn",
                      "orig": "domain",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "$action": "autorenew",
                  "exist": [
                    "fqdn",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "PATCH",
                "orig": "/domain/domains/{domain}/reachability",
                "segments": [
                  {
                    "lit": "domain",
                  },
                  {
                    "lit": "domains",
                  },
                  {
                    "var": "fqdn",
                  },
                  {
                    "lit": "reachability",
                  },
                ],
                "parts": [
                  "domain",
                  "domains",
                  "{fqdn}",
                  "reachability",
                ],
                "rename": {
                  "param": {
                    "domain": "fqdn",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "fqdn",
                      "orig": "domain",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "$action": "reachability",
                  "exist": [
                    "fqdn",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "PATCH",
                "orig": "/domain/domains/{domain}/status",
                "segments": [
                  {
                    "lit": "domain",
                  },
                  {
                    "lit": "domains",
                  },
                  {
                    "var": "fqdn",
                  },
                  {
                    "lit": "status",
                  },
                ],
                "parts": [
                  "domain",
                  "domains",
                  "{fqdn}",
                  "status",
                ],
                "rename": {
                  "param": {
                    "domain": "fqdn",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "fqdn",
                      "orig": "domain",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "$action": "status",
                  "exist": [
                    "fqdn",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "domain_availability": {
        "fields": [
          {
            "name": "currency",
            "title": "Currency",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "grid",
            "title": "Grid",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "products",
            "title": "Products",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "taxes",
            "title": "Taxes",
            "type": "`$ARRAY`",
            "req": True,
          },
        ],
        "name": "domain_availability",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/domain/check",
                "segments": [
                  {
                    "lit": "domain",
                  },
                  {
                    "lit": "check",
                  },
                ],
                "parts": [
                  "domain",
                  "check",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "country",
                      "orig": "country",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "currency",
                      "orig": "currency",
                      "type": "`$STRING`",
                      "kind": "query",
                      "field": True,
                    },
                    {
                      "name": "duration_unit",
                      "orig": "duration_unit",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "extension",
                      "orig": "extension",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "grid",
                      "orig": "grid",
                      "type": "`$STRING`",
                      "kind": "query",
                      "field": True,
                    },
                    {
                      "name": "lang",
                      "orig": "lang",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "max_duration",
                      "orig": "max_duration",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "name",
                      "orig": "name",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                    },
                    {
                      "name": "period",
                      "orig": "period",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "process",
                      "orig": "processes",
                      "type": "`$ARRAY`",
                      "kind": "query",
                      "example": [
                        "create",
                      ],
                    },
                    {
                      "name": "sharing_id",
                      "orig": "sharing_id",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "name",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "domain_change_owner": {
        "fields": [
          {
            "name": "admin",
            "title": "Admin",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "bill",
            "title": "Bill",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "created_at",
            "title": "Created At",
            "type": "`$STRING`",
            "req": True,
            "format": "date-time",
          },
          {
            "name": "date_start",
            "title": "Date Start",
            "type": "`$STRING`",
          },
          {
            "name": "errors",
            "title": "Errors",
            "type": "`$ARRAY`",
          },
          {
            "name": "errortype",
            "title": "Errortype",
            "type": "`$STRING`",
          },
          {
            "name": "errortype_label",
            "title": "Errortype Label",
            "type": "`$STRING`",
          },
          {
            "name": "foa",
            "title": "Foa",
            "type": "`$ARRAY`",
          },
          {
            "name": "inner_step",
            "title": "Inner Step",
            "type": "`$STRING`",
          },
          {
            "name": "owner",
            "title": "Owner",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "params",
            "title": "Params",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "status",
            "title": "Status",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "step",
            "title": "Step",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "step_nb",
            "title": "Step Nb",
            "type": "`$INTEGER`",
            "req": True,
          },
          {
            "name": "tech",
            "title": "Tech",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "updated_at",
            "title": "Updated At",
            "type": "`$STRING`",
            "req": True,
            "format": "date-time",
          },
        ],
        "name": "domain_change_owner",
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
                    "lit": "domain",
                  },
                  {
                    "lit": "changeowner",
                  },
                  {
                    "var": "domain",
                  },
                ],
                "parts": [
                  "domain",
                  "changeowner",
                  "{domain}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "header": [
                    {
                      "name": "dry_run",
                      "orig": "Dry-Run",
                      "type": "`$INTEGER`",
                      "kind": "header",
                    },
                  ],
                  "params": [
                    {
                      "name": "domain",
                      "orig": "domain",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "sharing_id",
                      "orig": "sharing_id",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "domain",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "POST",
                "orig": "/domain/changeowner/{domain}/foa",
                "segments": [
                  {
                    "lit": "domain",
                  },
                  {
                    "lit": "changeowner",
                  },
                  {
                    "var": "domain",
                  },
                  {
                    "lit": "foa",
                  },
                ],
                "parts": [
                  "domain",
                  "changeowner",
                  "{domain}",
                  "foa",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "domain",
                      "orig": "domain",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "$action": "foa",
                  "exist": [
                    "domain",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/domain/changeowner/{domain}",
                "segments": [
                  {
                    "lit": "domain",
                  },
                  {
                    "lit": "changeowner",
                  },
                  {
                    "var": "domain",
                  },
                ],
                "parts": [
                  "domain",
                  "changeowner",
                  "{domain}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "domain",
                      "orig": "domain",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "sharing_id",
                      "orig": "sharing_id",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "domain",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "domain_claim": {
        "fields": [
          {
            "name": "claims",
            "title": "Claims",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "created_at",
            "title": "Created At",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "expires_at",
            "title": "Expires At",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "fqdn",
            "title": "Fqdn",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "fqdn_alabel",
            "title": "Fqdn Alabel",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "fqdn_ulabel",
            "title": "Fqdn Ulabel",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "notice_id",
            "title": "Notice Id",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "status",
            "title": "Status",
            "type": "`$STRING`",
            "req": True,
          },
        ],
        "name": "domain_claim",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/domain/domains/{domain}/claims",
                "segments": [
                  {
                    "lit": "domain",
                  },
                  {
                    "lit": "domains",
                  },
                  {
                    "var": "domain",
                  },
                  {
                    "lit": "claims",
                  },
                ],
                "parts": [
                  "domain",
                  "domains",
                  "{domain}",
                  "claims",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "domain",
                      "orig": "domain",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "domain",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/domain/domains/{domain}/claims",
                "segments": [
                  {
                    "lit": "domain",
                  },
                  {
                    "lit": "domains",
                  },
                  {
                    "var": "domain",
                  },
                  {
                    "lit": "claims",
                  },
                ],
                "parts": [
                  "domain",
                  "domains",
                  "{domain}",
                  "claims",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "domain",
                      "orig": "domain",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "domain",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.domain",
            ],
          ],
        },
      },
      "domain_contact": {
        "fields": [
          {
            "name": "admin",
            "title": "Admin",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "bill",
            "title": "Bill",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "message",
            "title": "Message",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "owner",
            "title": "Owner",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "tech",
            "title": "Tech",
            "type": "`$OBJECT`",
            "req": True,
          },
        ],
        "name": "domain_contact",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/domain/domains/{domain}/contacts",
                "segments": [
                  {
                    "lit": "domain",
                  },
                  {
                    "lit": "domains",
                  },
                  {
                    "var": "domain",
                  },
                  {
                    "lit": "contacts",
                  },
                ],
                "parts": [
                  "domain",
                  "domains",
                  "{domain}",
                  "contacts",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "domain",
                      "orig": "domain",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "domain",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "kind": "http",
                "method": "PATCH",
                "orig": "/domain/domains/{domain}/contacts",
                "segments": [
                  {
                    "lit": "domain",
                  },
                  {
                    "lit": "domains",
                  },
                  {
                    "var": "domain",
                  },
                  {
                    "lit": "contacts",
                  },
                ],
                "parts": [
                  "domain",
                  "domains",
                  "{domain}",
                  "contacts",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "domain",
                      "orig": "domain",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "domain",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "PUT",
                "orig": "/domain/domains/{domain}/contacts/owner",
                "segments": [
                  {
                    "lit": "domain",
                  },
                  {
                    "lit": "domains",
                  },
                  {
                    "var": "domain",
                  },
                  {
                    "lit": "contacts",
                  },
                  {
                    "lit": "owner",
                  },
                ],
                "parts": [
                  "domain",
                  "domains",
                  "{domain}",
                  "contacts",
                  "owner",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "header": [
                    {
                      "name": "dry_run",
                      "orig": "Dry-Run",
                      "type": "`$INTEGER`",
                      "kind": "header",
                    },
                  ],
                  "params": [
                    {
                      "name": "domain",
                      "orig": "domain",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "$action": "owner",
                  "exist": [
                    "domain",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.domain",
            ],
          ],
        },
      },
      "domain_dnskey": {
        "fields": [
          {
            "name": "algorithm",
            "title": "Algorithm",
            "type": "`$INTEGER`",
            "req": True,
          },
          {
            "name": "digest",
            "title": "Digest",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "digest_type",
            "title": "Digest Type",
            "type": "`$INTEGER`",
            "req": True,
          },
          {
            "name": "href",
            "title": "Href",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$INTEGER`",
            "req": True,
          },
          {
            "name": "keys",
            "title": "Keys",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "keytag",
            "title": "Keytag",
            "type": "`$INTEGER`",
            "req": True,
          },
          {
            "name": "message",
            "title": "Message",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "public_key",
            "title": "Public Key",
            "type": "`$STRING`",
            "req": True,
            "op": {
              "list": {
                "type": "`$STRING`",
              },
            },
          },
          {
            "name": "type",
            "title": "Type",
            "type": "`$STRING`",
            "req": True,
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "domain_dnskey",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/domain/domains/{domain}/dnskeys",
                "segments": [
                  {
                    "lit": "domain",
                  },
                  {
                    "lit": "domains",
                  },
                  {
                    "var": "domain",
                  },
                  {
                    "lit": "dnskeys",
                  },
                ],
                "parts": [
                  "domain",
                  "domains",
                  "{domain}",
                  "dnskeys",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "domain",
                      "orig": "domain",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "domain",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/domain/domains/{domain}/dnskeys",
                "segments": [
                  {
                    "lit": "domain",
                  },
                  {
                    "lit": "domains",
                  },
                  {
                    "var": "domain",
                  },
                  {
                    "lit": "dnskeys",
                  },
                ],
                "parts": [
                  "domain",
                  "domains",
                  "{domain}",
                  "dnskeys",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "domain",
                      "orig": "domain",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 1,
                    },
                    {
                      "name": "per_page",
                      "orig": "per_page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "domain",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
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
                    "lit": "domain",
                  },
                  {
                    "lit": "domains",
                  },
                  {
                    "var": "domain",
                  },
                  {
                    "lit": "dnskeys",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "domain",
                  "domains",
                  "{domain}",
                  "dnskeys",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "domain",
                      "orig": "domain",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "domain",
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "kind": "http",
                "method": "PUT",
                "orig": "/domain/domains/{domain}/dnskeys",
                "segments": [
                  {
                    "lit": "domain",
                  },
                  {
                    "lit": "domains",
                  },
                  {
                    "var": "domain",
                  },
                  {
                    "lit": "dnskeys",
                  },
                ],
                "parts": [
                  "domain",
                  "domains",
                  "{domain}",
                  "dnskeys",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "domain",
                      "orig": "domain",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "domain",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.domain",
            ],
          ],
        },
      },
      "domain_dnssec": {
        "fields": [
          {
            "name": "error",
            "title": "Error",
            "type": "`$STRING`",
          },
          {
            "name": "state",
            "title": "State",
            "type": "`$STRING`",
            "req": True,
          },
        ],
        "name": "domain_dnssec",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/domain/domains/{domain}/livedns/dnssec",
                "segments": [
                  {
                    "lit": "domain",
                  },
                  {
                    "lit": "domains",
                  },
                  {
                    "var": "domain",
                  },
                  {
                    "lit": "livedns",
                  },
                  {
                    "lit": "dnssec",
                  },
                ],
                "parts": [
                  "domain",
                  "domains",
                  "{domain}",
                  "livedns",
                  "dnssec",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "domain",
                      "orig": "domain",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "sharing_id",
                      "orig": "sharing_id",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "domain",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/domain/domains/{domain}/livedns/dnssec",
                "segments": [
                  {
                    "lit": "domain",
                  },
                  {
                    "lit": "domains",
                  },
                  {
                    "var": "domain",
                  },
                  {
                    "lit": "livedns",
                  },
                  {
                    "lit": "dnssec",
                  },
                ],
                "parts": [
                  "domain",
                  "domains",
                  "{domain}",
                  "livedns",
                  "dnssec",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "domain",
                      "orig": "domain",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "domain",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/domain/domains/{domain}/livedns/dnssec",
                "segments": [
                  {
                    "lit": "domain",
                  },
                  {
                    "lit": "domains",
                  },
                  {
                    "var": "domain",
                  },
                  {
                    "lit": "livedns",
                  },
                  {
                    "lit": "dnssec",
                  },
                ],
                "parts": [
                  "domain",
                  "domains",
                  "{domain}",
                  "livedns",
                  "dnssec",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "domain",
                      "orig": "domain",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "sharing_id",
                      "orig": "sharing_id",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "domain",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.domain",
            ],
          ],
        },
      },
      "domain_host": {
        "fields": [
          {
            "name": "fqdn",
            "title": "Fqdn",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "fqdn_unicode",
            "title": "Fqdn Unicode",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "href",
            "title": "Href",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "ips",
            "title": "Ips",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "message",
            "title": "Message",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "req": True,
          },
        ],
        "name": "domain_host",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/domain/domains/{domain}/hosts",
                "segments": [
                  {
                    "lit": "domain",
                  },
                  {
                    "lit": "domains",
                  },
                  {
                    "var": "domain",
                  },
                  {
                    "lit": "hosts",
                  },
                ],
                "parts": [
                  "domain",
                  "domains",
                  "{domain}",
                  "hosts",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "domain",
                      "orig": "domain",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 1,
                    },
                    {
                      "name": "per_page",
                      "orig": "per_page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "domain",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/domain/domains/{domain}/hosts",
                "segments": [
                  {
                    "lit": "domain",
                  },
                  {
                    "lit": "domains",
                  },
                  {
                    "var": "domain",
                  },
                  {
                    "lit": "hosts",
                  },
                ],
                "parts": [
                  "domain",
                  "domains",
                  "{domain}",
                  "hosts",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "domain",
                      "orig": "domain",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 1,
                    },
                    {
                      "name": "per_page",
                      "orig": "per_page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "domain",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/domain/domains/{domain}/hosts/{name}",
                "segments": [
                  {
                    "lit": "domain",
                  },
                  {
                    "lit": "domains",
                  },
                  {
                    "var": "domain",
                  },
                  {
                    "lit": "hosts",
                  },
                  {
                    "var": "name",
                  },
                ],
                "parts": [
                  "domain",
                  "domains",
                  "{domain}",
                  "hosts",
                  "{name}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "domain",
                      "orig": "domain",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "name",
                      "orig": "name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "domain",
                    "name",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/domain/domains/{domain}/hosts/{name}",
                "segments": [
                  {
                    "lit": "domain",
                  },
                  {
                    "lit": "domains",
                  },
                  {
                    "var": "domain",
                  },
                  {
                    "lit": "hosts",
                  },
                  {
                    "var": "name",
                  },
                ],
                "parts": [
                  "domain",
                  "domains",
                  "{domain}",
                  "hosts",
                  "{name}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "domain",
                      "orig": "domain",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "name",
                      "orig": "name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "domain",
                    "name",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
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
                    "lit": "domain",
                  },
                  {
                    "lit": "domains",
                  },
                  {
                    "var": "domain",
                  },
                  {
                    "lit": "hosts",
                  },
                  {
                    "var": "name",
                  },
                ],
                "parts": [
                  "domain",
                  "domains",
                  "{domain}",
                  "hosts",
                  "{name}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "domain",
                      "orig": "domain",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "name",
                      "orig": "name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "domain",
                    "name",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.domain",
            ],
            [
              "$.main.kit.entity.domain",
            ],
          ],
        },
      },
      "domain_livedns": {
        "fields": [
          {
            "name": "current",
            "title": "Current",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "dnssec_available",
            "title": "Dnssec Available",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "livednssec_available",
            "title": "Livednssec Available",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "message",
            "title": "Message",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "nameservers",
            "title": "Nameservers",
            "type": "`$ARRAY`",
            "req": True,
          },
        ],
        "name": "domain_livedns",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/domain/domains/{domain}/livedns",
                "segments": [
                  {
                    "lit": "domain",
                  },
                  {
                    "lit": "domains",
                  },
                  {
                    "var": "domain",
                  },
                  {
                    "lit": "livedns",
                  },
                ],
                "parts": [
                  "domain",
                  "domains",
                  "{domain}",
                  "livedns",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "domain",
                      "orig": "domain",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "domain",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/domain/domains/{domain}/livedns",
                "segments": [
                  {
                    "lit": "domain",
                  },
                  {
                    "lit": "domains",
                  },
                  {
                    "var": "domain",
                  },
                  {
                    "lit": "livedns",
                  },
                ],
                "parts": [
                  "domain",
                  "domains",
                  "{domain}",
                  "livedns",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "domain",
                      "orig": "domain",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "domain",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.domain",
            ],
          ],
        },
      },
      "domain_nameserver": {
        "fields": [
          {
            "name": "message",
            "title": "Message",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "nameservers",
            "title": "Nameservers",
            "type": "`$ARRAY`",
            "req": True,
          },
        ],
        "name": "domain_nameserver",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/domain/domains/{domain}/nameservers",
                "segments": [
                  {
                    "lit": "domain",
                  },
                  {
                    "lit": "domains",
                  },
                  {
                    "var": "domain",
                  },
                  {
                    "lit": "nameservers",
                  },
                ],
                "parts": [
                  "domain",
                  "domains",
                  "{domain}",
                  "nameservers",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "domain",
                      "orig": "domain",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "domain",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "kind": "http",
                "method": "PUT",
                "orig": "/domain/domains/{domain}/nameservers",
                "segments": [
                  {
                    "lit": "domain",
                  },
                  {
                    "lit": "domains",
                  },
                  {
                    "var": "domain",
                  },
                  {
                    "lit": "nameservers",
                  },
                ],
                "parts": [
                  "domain",
                  "domains",
                  "{domain}",
                  "nameservers",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "domain",
                      "orig": "domain",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "domain",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.domain",
            ],
          ],
        },
      },
      "domain_tag": {
        "fields": [
          {
            "name": "add",
            "title": "Add",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "message",
            "title": "Message",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "remove",
            "title": "Remove",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "tag",
            "title": "Tag",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "tags",
            "title": "Tags",
            "type": "`$ARRAY`",
            "req": True,
          },
        ],
        "name": "domain_tag",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/domain/domains/{domain}/tags",
                "segments": [
                  {
                    "lit": "domain",
                  },
                  {
                    "lit": "domains",
                  },
                  {
                    "var": "domain",
                  },
                  {
                    "lit": "tags",
                  },
                ],
                "parts": [
                  "domain",
                  "domains",
                  "{domain}",
                  "tags",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "domain",
                      "orig": "domain",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "domain",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/domain/domains/{domain}/tags",
                "segments": [
                  {
                    "lit": "domain",
                  },
                  {
                    "lit": "domains",
                  },
                  {
                    "var": "domain",
                  },
                  {
                    "lit": "tags",
                  },
                ],
                "parts": [
                  "domain",
                  "domains",
                  "{domain}",
                  "tags",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "domain",
                      "orig": "domain",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "domain",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "patch": {
            "input": "data",
            "name": "patch",
            "points": [
              {
                "kind": "http",
                "method": "PATCH",
                "orig": "/domain/domains/{domain}/tags",
                "segments": [
                  {
                    "lit": "domain",
                  },
                  {
                    "lit": "domains",
                  },
                  {
                    "var": "domain",
                  },
                  {
                    "lit": "tags",
                  },
                ],
                "parts": [
                  "domain",
                  "domains",
                  "{domain}",
                  "tags",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "domain",
                      "orig": "domain",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "domain",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/domain/domains/{domain}/tags",
                "segments": [
                  {
                    "lit": "domain",
                  },
                  {
                    "lit": "domains",
                  },
                  {
                    "var": "domain",
                  },
                  {
                    "lit": "tags",
                  },
                ],
                "parts": [
                  "domain",
                  "domains",
                  "{domain}",
                  "tags",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "domain",
                      "orig": "domain",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "domain",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "kind": "http",
                "method": "PUT",
                "orig": "/domain/domains/{domain}/tags",
                "segments": [
                  {
                    "lit": "domain",
                  },
                  {
                    "lit": "domains",
                  },
                  {
                    "var": "domain",
                  },
                  {
                    "lit": "tags",
                  },
                ],
                "parts": [
                  "domain",
                  "domains",
                  "{domain}",
                  "tags",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "domain",
                      "orig": "domain",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "domain",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.domain",
            ],
          ],
        },
      },
      "domain_transfer": {
        "fields": [
          {
            "name": "admin",
            "title": "Admin",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "authinfo",
            "title": "Authinfo",
            "type": "`$STRING`",
          },
          {
            "name": "bill",
            "title": "Bill",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "change_owner",
            "title": "Change Owner",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "created_at",
            "title": "Created At",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "currency",
            "title": "Currency",
            "type": "`$STRING`",
          },
          {
            "name": "duration",
            "title": "Duration",
            "type": "`$INTEGER`",
          },
          {
            "name": "enforce_premium",
            "title": "Enforce Premium",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "errors",
            "title": "Errors",
            "type": "`$ARRAY`",
          },
          {
            "name": "errortype",
            "title": "Errortype",
            "type": "`$STRING`",
          },
          {
            "name": "errortype_label",
            "title": "Errortype Label",
            "type": "`$STRING`",
          },
          {
            "name": "extra_parameters",
            "title": "Extra Parameters",
            "type": "`$OBJECT`",
          },
          {
            "name": "foa",
            "title": "Foa",
            "type": "`$ARRAY`",
          },
          {
            "name": "fqdn",
            "title": "Fqdn",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "inner_step",
            "title": "Inner Step",
            "type": "`$STRING`",
          },
          {
            "name": "mailbox_optin",
            "title": "Mailbox Optin",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "message",
            "title": "Message",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "nameservers",
            "title": "Nameservers",
            "type": "`$ARRAY`",
          },
          {
            "name": "nameservers_ips",
            "title": "Nameservers Ips",
            "type": "`$OBJECT`",
          },
          {
            "name": "owner",
            "title": "Owner",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "owner_contact",
            "title": "Owner Contact",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "params",
            "title": "Params",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "price",
            "title": "Price",
            "type": "`$NUMBER`",
          },
          {
            "name": "regac_at",
            "title": "Regac At",
            "type": "`$STRING`",
          },
          {
            "name": "resellee_id",
            "title": "Resellee Id",
            "type": "`$STRING`",
          },
          {
            "name": "start_at",
            "title": "Start At",
            "type": "`$STRING`",
          },
          {
            "name": "status",
            "title": "Status",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "step",
            "title": "Step",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "step_nb",
            "title": "Step Nb",
            "type": "`$INTEGER`",
            "req": True,
          },
          {
            "name": "tech",
            "title": "Tech",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "template_id",
            "title": "Template Id",
            "type": "`$STRING`",
          },
          {
            "name": "transfer_link",
            "title": "Transfer Link",
            "type": "`$STRING`",
          },
          {
            "name": "transfer_procedure",
            "title": "Transfer Procedure",
            "type": "`$STRING`",
          },
          {
            "name": "updated_at",
            "title": "Updated At",
            "type": "`$STRING`",
            "req": True,
          },
        ],
        "name": "domain_transfer",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/domain/transferin/{domain}/available",
                "segments": [
                  {
                    "lit": "domain",
                  },
                  {
                    "lit": "transferin",
                  },
                  {
                    "var": "domain",
                  },
                  {
                    "lit": "available",
                  },
                ],
                "parts": [
                  "domain",
                  "transferin",
                  "{domain}",
                  "available",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "domain",
                      "orig": "domain",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "$action": "available",
                  "exist": [
                    "domain",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "POST",
                "orig": "/domain/transferin/{domain}/foa",
                "segments": [
                  {
                    "lit": "domain",
                  },
                  {
                    "lit": "transferin",
                  },
                  {
                    "var": "domain",
                  },
                  {
                    "lit": "foa",
                  },
                ],
                "parts": [
                  "domain",
                  "transferin",
                  "{domain}",
                  "foa",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "domain",
                      "orig": "domain",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "$action": "foa",
                  "exist": [
                    "domain",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "POST",
                "orig": "/domain/transferin",
                "segments": [
                  {
                    "lit": "domain",
                  },
                  {
                    "lit": "transferin",
                  },
                ],
                "parts": [
                  "domain",
                  "transferin",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "header": [
                    {
                      "name": "dry_run",
                      "orig": "Dry-Run",
                      "type": "`$INTEGER`",
                      "kind": "header",
                    },
                  ],
                  "query": [
                    {
                      "name": "sharing_id",
                      "orig": "sharing_id",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/domain/transferin/{domain}",
                "segments": [
                  {
                    "lit": "domain",
                  },
                  {
                    "lit": "transferin",
                  },
                  {
                    "var": "domain",
                  },
                ],
                "parts": [
                  "domain",
                  "transferin",
                  "{domain}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "domain",
                      "orig": "domain",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "domain",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "kind": "http",
                "method": "PUT",
                "orig": "/domain/transferin/{domain}",
                "segments": [
                  {
                    "lit": "domain",
                  },
                  {
                    "lit": "transferin",
                  },
                  {
                    "var": "domain",
                  },
                ],
                "parts": [
                  "domain",
                  "transferin",
                  "{domain}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "domain",
                      "orig": "domain",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "domain",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "PUT",
                "orig": "/domain/transferin/{domain}/authinfo",
                "segments": [
                  {
                    "lit": "domain",
                  },
                  {
                    "lit": "transferin",
                  },
                  {
                    "var": "domain",
                  },
                  {
                    "lit": "authinfo",
                  },
                ],
                "parts": [
                  "domain",
                  "transferin",
                  "{domain}",
                  "authinfo",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "domain",
                      "orig": "domain",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "sharing_id",
                      "orig": "sharing_id",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "$action": "authinfo",
                  "exist": [
                    "domain",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "domain_webredir": {
        "fields": [
          {
            "name": "cert_status",
            "title": "Cert Status",
            "type": "`$STRING`",
          },
          {
            "name": "cert_uuid",
            "title": "Cert Uuid",
            "type": "`$STRING`",
          },
          {
            "name": "created_at",
            "title": "Created At",
            "type": "`$STRING`",
          },
          {
            "name": "host",
            "title": "Host",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "message",
            "title": "Message",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "override",
            "title": "Override",
            "type": "`$BOOLEAN`",
            "req": True,
            "op": {
              "update": {
                "type": "`$BOOLEAN`",
              },
            },
          },
          {
            "name": "protocol",
            "title": "Protocol",
            "type": "`$STRING`",
            "op": {
              "create": {
                "req": True,
                "type": "`$STRING`",
              },
            },
          },
          {
            "name": "type",
            "title": "Type",
            "type": "`$STRING`",
            "req": True,
            "op": {
              "update": {
                "type": "`$STRING`",
              },
            },
          },
          {
            "name": "updated_at",
            "title": "Updated At",
            "type": "`$STRING`",
          },
          {
            "name": "url",
            "title": "Url",
            "type": "`$STRING`",
            "req": True,
            "op": {
              "update": {
                "type": "`$STRING`",
              },
            },
          },
        ],
        "name": "domain_webredir",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/domain/domains/{domain}/webredirs",
                "segments": [
                  {
                    "lit": "domain",
                  },
                  {
                    "lit": "domains",
                  },
                  {
                    "var": "domain",
                  },
                  {
                    "lit": "webredirs",
                  },
                ],
                "parts": [
                  "domain",
                  "domains",
                  "{domain}",
                  "webredirs",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "domain",
                      "orig": "domain",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 1,
                    },
                    {
                      "name": "per_page",
                      "orig": "per_page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "domain",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/domain/domains/{domain}/webredirs",
                "segments": [
                  {
                    "lit": "domain",
                  },
                  {
                    "lit": "domains",
                  },
                  {
                    "var": "domain",
                  },
                  {
                    "lit": "webredirs",
                  },
                ],
                "parts": [
                  "domain",
                  "domains",
                  "{domain}",
                  "webredirs",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "domain",
                      "orig": "domain",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 1,
                    },
                    {
                      "name": "per_page",
                      "orig": "per_page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "domain",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
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
                    "lit": "domain",
                  },
                  {
                    "lit": "domains",
                  },
                  {
                    "var": "domain",
                  },
                  {
                    "lit": "webredirs",
                  },
                  {
                    "var": "host",
                  },
                ],
                "parts": [
                  "domain",
                  "domains",
                  "{domain}",
                  "webredirs",
                  "{host}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "domain",
                      "orig": "domain",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "host",
                      "orig": "host",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "domain",
                    "host",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/domain/domains/{domain}/webredirs/{host}",
                "segments": [
                  {
                    "lit": "domain",
                  },
                  {
                    "lit": "domains",
                  },
                  {
                    "var": "domain",
                  },
                  {
                    "lit": "webredirs",
                  },
                  {
                    "var": "host",
                  },
                ],
                "parts": [
                  "domain",
                  "domains",
                  "{domain}",
                  "webredirs",
                  "{host}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "domain",
                      "orig": "domain",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "host",
                      "orig": "host",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "domain",
                    "host",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "kind": "http",
                "method": "PATCH",
                "orig": "/domain/domains/{domain}/webredirs/{host}",
                "segments": [
                  {
                    "lit": "domain",
                  },
                  {
                    "lit": "domains",
                  },
                  {
                    "var": "domain",
                  },
                  {
                    "lit": "webredirs",
                  },
                  {
                    "var": "host",
                  },
                ],
                "parts": [
                  "domain",
                  "domains",
                  "{domain}",
                  "webredirs",
                  "{host}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "domain",
                      "orig": "domain",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "host",
                      "orig": "host",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "domain",
                    "host",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.domain",
            ],
            [
              "$.main.kit.entity.domain",
            ],
          ],
        },
      },
      "email_forward": {
        "fields": [
          {
            "name": "destinations",
            "title": "Destinations",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "href",
            "title": "Href",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
          {
            "name": "message",
            "title": "Message",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "source",
            "title": "Source",
            "type": "`$STRING`",
            "req": True,
          },
        ],
        "id": {
          "field": "id",
          "from": {
            "source": "source",
          },
          "name": "id",
          "parts": [
            "domain",
            "source",
          ],
          "sep": "/",
        },
        "name": "email_forward",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/email/forwards/{domain}",
                "segments": [
                  {
                    "lit": "email",
                  },
                  {
                    "lit": "forwards",
                  },
                  {
                    "var": "domain",
                  },
                ],
                "parts": [
                  "email",
                  "forwards",
                  "{domain}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "domain",
                      "orig": "domain",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "domain",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
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
                    "lit": "email",
                  },
                  {
                    "lit": "forwards",
                  },
                  {
                    "var": "domain",
                  },
                ],
                "parts": [
                  "email",
                  "forwards",
                  "{domain}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "domain",
                      "orig": "domain",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "destination",
                      "orig": "destination",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 1,
                    },
                    {
                      "name": "per_page",
                      "orig": "per_page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "sort_by",
                      "orig": "sort_by",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "source",
                    },
                    {
                      "name": "source",
                      "orig": "source",
                      "type": "`$STRING`",
                      "kind": "query",
                      "field": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "domain",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/email/forwards/{domain}/{source}",
                "segments": [
                  {
                    "lit": "email",
                  },
                  {
                    "lit": "forwards",
                  },
                  {
                    "var": "domain",
                  },
                  {
                    "var": "source",
                  },
                ],
                "parts": [
                  "email",
                  "forwards",
                  "{domain}",
                  "{source}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "domain",
                      "orig": "domain",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "source",
                      "orig": "source",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "domain",
                    "source",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
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
                    "lit": "email",
                  },
                  {
                    "lit": "forwards",
                  },
                  {
                    "var": "domain",
                  },
                  {
                    "var": "source",
                  },
                ],
                "parts": [
                  "email",
                  "forwards",
                  "{domain}",
                  "{source}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "domain",
                      "orig": "domain",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "source",
                      "orig": "source",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "domain",
                    "source",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "email_mailbox": {
        "fields": [
          {
            "name": "address",
            "title": "Address",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "alias_count",
            "title": "Alias Count",
            "type": "`$INTEGER`",
            "op": {
              "list": {
                "req": True,
                "type": "`$INTEGER`",
              },
            },
          },
          {
            "name": "aliases",
            "title": "Aliases",
            "type": "`$ARRAY`",
            "req": True,
            "op": {
              "create": {
                "type": "`$ARRAY`",
              },
              "update": {
                "type": "`$ARRAY`",
              },
            },
          },
          {
            "name": "antispam",
            "title": "Antispam",
            "type": "`$BOOLEAN`",
            "req": True,
            "op": {
              "create": {
                "type": "`$BOOLEAN`",
              },
              "update": {
                "type": "`$BOOLEAN`",
              },
            },
          },
          {
            "name": "autorenew",
            "title": "Autorenew",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "domain",
            "title": "Domain",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "errors",
            "title": "Errors",
            "type": "`$ARRAY`",
          },
          {
            "name": "expires_at",
            "title": "Expires At",
            "type": "`$STRING`",
            "req": True,
            "format": "date-time",
          },
          {
            "name": "fallback_email",
            "title": "Fallback Email",
            "type": "`$STRING`",
          },
          {
            "name": "href",
            "title": "Href",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "login",
            "title": "Login",
            "type": "`$STRING`",
            "req": True,
            "op": {
              "update": {
                "type": "`$STRING`",
              },
            },
          },
          {
            "name": "mailbox_type",
            "title": "Mailbox Type",
            "type": "`$STRING`",
            "req": True,
            "op": {
              "update": {
                "type": "`$STRING`",
              },
            },
          },
          {
            "name": "message",
            "title": "Message",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "password",
            "title": "Password",
            "type": "`$STRING`",
            "req": True,
            "op": {
              "update": {
                "type": "`$STRING`",
              },
            },
          },
          {
            "name": "quota_used",
            "title": "Quota Used",
            "type": "`$INTEGER`",
            "req": True,
          },
          {
            "name": "responder",
            "title": "Responder",
            "type": "`$OBJECT`",
          },
          {
            "name": "status",
            "title": "Status",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "to_convert",
            "title": "To Convert",
            "type": "`$BOOLEAN`",
            "req": True,
          },
        ],
        "id": {
          "field": "id",
          "from": {
            "domain": "domain",
            "id": "id",
          },
          "name": "id",
          "parts": [
            "domain",
            "id",
          ],
          "sep": "/",
        },
        "name": "email_mailbox",
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
                    "lit": "email",
                  },
                  {
                    "lit": "mailboxes",
                  },
                  {
                    "var": "domain",
                  },
                  {
                    "var": "address",
                  },
                  {
                    "lit": "renew",
                  },
                ],
                "parts": [
                  "email",
                  "mailboxes",
                  "{domain}",
                  "{address}",
                  "renew",
                ],
                "rename": {
                  "param": {
                    "email": "address",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "header": [
                    {
                      "name": "dry_run",
                      "orig": "Dry-Run",
                      "type": "`$INTEGER`",
                      "kind": "header",
                    },
                  ],
                  "params": [
                    {
                      "name": "address",
                      "orig": "email",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "domain",
                      "orig": "domain",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "sharing_id",
                      "orig": "sharing_id",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "$action": "renew",
                  "exist": [
                    "address",
                    "domain",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "POST",
                "orig": "/email/mailboxes/{domain}",
                "segments": [
                  {
                    "lit": "email",
                  },
                  {
                    "lit": "mailboxes",
                  },
                  {
                    "var": "domain",
                  },
                ],
                "parts": [
                  "email",
                  "mailboxes",
                  "{domain}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "header": [
                    {
                      "name": "dry_run",
                      "orig": "Dry-Run",
                      "type": "`$INTEGER`",
                      "kind": "header",
                    },
                  ],
                  "params": [
                    {
                      "name": "domain",
                      "orig": "domain",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "domain",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "POST",
                "orig": "/email/mailboxes/{domain}/renew",
                "segments": [
                  {
                    "lit": "email",
                  },
                  {
                    "lit": "mailboxes",
                  },
                  {
                    "var": "domain",
                  },
                  {
                    "lit": "renew",
                  },
                ],
                "parts": [
                  "email",
                  "mailboxes",
                  "{domain}",
                  "renew",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "header": [
                    {
                      "name": "dry_run",
                      "orig": "Dry-Run",
                      "type": "`$INTEGER`",
                      "kind": "header",
                    },
                  ],
                  "params": [
                    {
                      "name": "domain",
                      "orig": "domain",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "sharing_id",
                      "orig": "sharing_id",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "$action": "renew_all",
                  "exist": [
                    "domain",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/email/mailboxes/{domain}",
                "segments": [
                  {
                    "lit": "email",
                  },
                  {
                    "lit": "mailboxes",
                  },
                  {
                    "var": "domain",
                  },
                ],
                "parts": [
                  "email",
                  "mailboxes",
                  "{domain}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "domain",
                      "orig": "domain",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "<created_at",
                      "orig": "<created_at",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "antispam",
                      "orig": "antispam",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                      "field": True,
                    },
                    {
                      "name": "login",
                      "orig": "login",
                      "type": "`$STRING`",
                      "kind": "query",
                      "field": True,
                    },
                    {
                      "name": "mailbox_type",
                      "orig": "mailbox_type",
                      "type": "`$STRING`",
                      "kind": "query",
                      "field": True,
                    },
                    {
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 1,
                    },
                    {
                      "name": "per_page",
                      "orig": "per_page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "~login",
                      "orig": "~login",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "domain",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
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
                    "lit": "email",
                  },
                  {
                    "lit": "mailboxes",
                  },
                  {
                    "var": "domain",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "email",
                  "mailboxes",
                  "{domain}",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "mailbox_id": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "domain",
                      "orig": "domain",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "id",
                      "orig": "mailbox_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "domain",
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
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
                    "lit": "email",
                  },
                  {
                    "lit": "mailboxes",
                  },
                  {
                    "var": "domain",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "email",
                  "mailboxes",
                  "{domain}",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "mailbox_id": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "domain",
                      "orig": "domain",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "id",
                      "orig": "mailbox_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "domain",
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/email/mailboxes/{domain}/{mailbox_id}/contents",
                "segments": [
                  {
                    "lit": "email",
                  },
                  {
                    "lit": "mailboxes",
                  },
                  {
                    "var": "domain",
                  },
                  {
                    "var": "id",
                  },
                  {
                    "lit": "contents",
                  },
                ],
                "parts": [
                  "email",
                  "mailboxes",
                  "{domain}",
                  "{id}",
                  "contents",
                ],
                "rename": {
                  "param": {
                    "mailbox_id": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "domain",
                      "orig": "domain",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "id",
                      "orig": "mailbox_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "$action": "purge",
                  "exist": [
                    "domain",
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "kind": "http",
                "method": "PATCH",
                "orig": "/email/mailboxes/{domain}/{mailbox_id}",
                "segments": [
                  {
                    "lit": "email",
                  },
                  {
                    "lit": "mailboxes",
                  },
                  {
                    "var": "domain",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "email",
                  "mailboxes",
                  "{domain}",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "mailbox_id": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "domain",
                      "orig": "domain",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "id",
                      "orig": "mailbox_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "sharing_id",
                      "orig": "sharing_id",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "domain",
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.mailbox",
            ],
          ],
        },
      },
      "email_migration": {
        "fields": [
          {
            "name": "available",
            "title": "Available",
            "type": "`$BOOLEAN`",
            "req": True,
          },
          {
            "name": "currency",
            "title": "Currency",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "forward_count",
            "title": "Forward Count",
            "type": "`$INTEGER`",
            "req": True,
          },
          {
            "name": "free_mailboxes",
            "title": "Free Mailboxes",
            "type": "`$INTEGER`",
            "req": True,
          },
          {
            "name": "included_mailboxes",
            "title": "Included Mailboxes",
            "type": "`$INTEGER`",
            "req": True,
          },
          {
            "name": "info",
            "title": "Info",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "message",
            "title": "Message",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "packmail",
            "title": "Packmail",
            "type": "`$BOOLEAN`",
            "req": True,
          },
          {
            "name": "price_v1",
            "title": "Price V1",
            "type": "`$NUMBER`",
            "req": True,
          },
          {
            "name": "price_v2",
            "title": "Price V2",
            "type": "`$NUMBER`",
            "req": True,
          },
          {
            "name": "quota_v1",
            "title": "Quota V1",
            "type": "`$NUMBER`",
            "req": True,
          },
          {
            "name": "token",
            "title": "Token",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "usage_v1",
            "title": "Usage V1",
            "type": "`$NUMBER`",
            "req": True,
          },
        ],
        "name": "email_migration",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/email/migration/{domain}",
                "segments": [
                  {
                    "lit": "email",
                  },
                  {
                    "lit": "migration",
                  },
                  {
                    "var": "domain",
                  },
                ],
                "parts": [
                  "email",
                  "migration",
                  "{domain}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "domain",
                      "orig": "domain",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "sharing_id",
                      "orig": "sharing_id",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "domain",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/email/migration/{domain}",
                "segments": [
                  {
                    "lit": "email",
                  },
                  {
                    "lit": "migration",
                  },
                  {
                    "var": "domain",
                  },
                ],
                "parts": [
                  "email",
                  "migration",
                  "{domain}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "domain",
                      "orig": "domain",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "sharing_id",
                      "orig": "sharing_id",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "domain",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "email_offer": {
        "fields": [
          {
            "name": "antispam",
            "title": "Antispam",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "dkim",
            "title": "Dkim",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "message",
            "title": "Message",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "status",
            "title": "Status",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "version",
            "title": "Version",
            "type": "`$INTEGER`",
            "req": True,
          },
        ],
        "name": "email_offer",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/email/offers/{domain}",
                "segments": [
                  {
                    "lit": "email",
                  },
                  {
                    "lit": "offers",
                  },
                  {
                    "var": "domain",
                  },
                ],
                "parts": [
                  "email",
                  "offers",
                  "{domain}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "domain",
                      "orig": "domain",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "domain",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "kind": "http",
                "method": "PATCH",
                "orig": "/email/offers/{domain}",
                "segments": [
                  {
                    "lit": "email",
                  },
                  {
                    "lit": "offers",
                  },
                  {
                    "var": "domain",
                  },
                ],
                "parts": [
                  "email",
                  "offers",
                  "{domain}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "domain",
                      "orig": "domain",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "domain",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "email_slot": {
        "fields": [
          {
            "name": "autorenew",
            "title": "Autorenew",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "capacity",
            "title": "Capacity",
            "type": "`$INTEGER`",
            "req": True,
          },
          {
            "name": "created_at",
            "title": "Created At",
            "type": "`$STRING`",
            "req": True,
            "format": "date-time",
          },
          {
            "name": "duration",
            "title": "Duration",
            "type": "`$INTEGER`",
            "req": True,
          },
          {
            "name": "gandi_id",
            "title": "Gandi Id",
            "type": "`$INTEGER`",
            "req": True,
          },
          {
            "name": "href",
            "title": "Href",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "mailbox_type",
            "title": "Mailbox Type",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "refund_amount",
            "title": "Refund Amount",
            "type": "`$NUMBER`",
          },
          {
            "name": "refund_currency",
            "title": "Refund Currency",
            "type": "`$STRING`",
          },
          {
            "name": "refundable",
            "title": "Refundable",
            "type": "`$BOOLEAN`",
            "req": True,
          },
          {
            "name": "status",
            "title": "Status",
            "type": "`$STRING`",
            "req": True,
          },
        ],
        "id": {
          "field": "id",
          "from": {
            "id": "id",
          },
          "name": "id",
          "parts": [
            "domain",
            "id",
          ],
          "sep": "/",
        },
        "name": "email_slot",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/email/slots/{domain}",
                "segments": [
                  {
                    "lit": "email",
                  },
                  {
                    "lit": "slots",
                  },
                  {
                    "var": "domain",
                  },
                ],
                "parts": [
                  "email",
                  "slots",
                  "{domain}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "domain",
                      "orig": "domain",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "sharing_id",
                      "orig": "sharing_id",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "domain",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/email/slots/{domain}",
                "segments": [
                  {
                    "lit": "email",
                  },
                  {
                    "lit": "slots",
                  },
                  {
                    "var": "domain",
                  },
                ],
                "parts": [
                  "email",
                  "slots",
                  "{domain}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "domain",
                      "orig": "domain",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "display_not_expired_and_inactive",
                      "orig": "display_not_expired_and_inactive",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                      "example": False,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "domain",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/email/slots/{domain}/{slot_id}",
                "segments": [
                  {
                    "lit": "email",
                  },
                  {
                    "lit": "slots",
                  },
                  {
                    "var": "domain",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "email",
                  "slots",
                  "{domain}",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "slot_id": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "domain",
                      "orig": "domain",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "id",
                      "orig": "slot_id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "domain",
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/email/slots/{domain}/{slot_id}",
                "segments": [
                  {
                    "lit": "email",
                  },
                  {
                    "lit": "slots",
                  },
                  {
                    "var": "domain",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "email",
                  "slots",
                  "{domain}",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "slot_id": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "domain",
                      "orig": "domain",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "id",
                      "orig": "slot_id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "domain",
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "hosting_application": {
        "fields": [
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "name_label",
            "title": "Name Label",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "requirements",
            "title": "Requirements",
            "type": "`$ARRAY`",
            "req": True,
          },
        ],
        "name": "hosting_application",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/simplehosting/applications",
                "segments": [
                  {
                    "lit": "simplehosting",
                  },
                  {
                    "lit": "applications",
                  },
                ],
                "parts": [
                  "simplehosting",
                  "applications",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "database",
                      "orig": "database",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "language",
                      "orig": "language",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "name",
                      "orig": "name",
                      "type": "`$STRING`",
                      "kind": "query",
                      "field": True,
                    },
                    {
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 1,
                    },
                    {
                      "name": "per_page",
                      "orig": "per_page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "sharing_id",
                      "orig": "sharing_id",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "sort_by",
                      "orig": "sort_by",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "-created_at",
                    },
                  ],
                },
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/simplehosting/applications/{application_name}",
                "segments": [
                  {
                    "lit": "simplehosting",
                  },
                  {
                    "lit": "applications",
                  },
                  {
                    "var": "name",
                  },
                ],
                "parts": [
                  "simplehosting",
                  "applications",
                  "{name}",
                ],
                "rename": {
                  "param": {
                    "application_name": "name",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "name",
                      "orig": "application_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "name",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "hosting_instance": {
        "fields": [
          {
            "name": "access_information",
            "title": "Access Information",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "authentication",
            "title": "Authentication",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "autorenew",
            "title": "Autorenew",
            "type": "`$OBJECT`",
            "req": True,
            "op": {
              "create": {
                "type": "`$BOOLEAN`",
              },
            },
          },
          {
            "name": "available_upgrade",
            "title": "Available Upgrade",
            "type": "`$BOOLEAN`",
            "req": True,
          },
          {
            "name": "booster",
            "title": "Booster",
            "type": "`$OBJECT`",
          },
          {
            "name": "booster_options",
            "title": "Booster Options",
            "type": "`$OBJECT`",
          },
          {
            "name": "compatible_applications",
            "title": "Compatible Applications",
            "type": "`$ARRAY`",
          },
          {
            "name": "console",
            "title": "Console",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "cpu",
            "title": "Cpu",
            "type": "`$INTEGER`",
            "req": True,
          },
          {
            "name": "created_at",
            "title": "Created At",
            "type": "`$STRING`",
            "req": True,
            "format": "date-time",
          },
          {
            "name": "database",
            "title": "Database",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "datacenter",
            "title": "Datacenter",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "domain",
            "title": "Domain",
            "type": "`$STRING`",
            "op": {
              "create": {
                "req": True,
                "type": "`$OBJECT`",
              },
            },
          },
          {
            "name": "duration",
            "title": "Duration",
            "type": "`$INTEGER`",
          },
          {
            "name": "duration_unit",
            "title": "Duration Unit",
            "type": "`$STRING`",
          },
          {
            "name": "errors",
            "title": "Errors",
            "type": "`$ARRAY`",
          },
          {
            "name": "expire_at",
            "title": "Expire At",
            "type": "`$STRING`",
            "req": True,
            "format": "date-time",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "language",
            "title": "Language",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "language_id",
            "title": "Language Id",
            "type": "`$STRING`",
          },
          {
            "name": "location",
            "title": "Location",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "message",
            "title": "Message",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "req": True,
            "op": {
              "create": {
                "type": "`$STRING`",
              },
              "update": {
                "type": "`$STRING`",
              },
            },
          },
          {
            "name": "password",
            "title": "Password",
            "type": "`$STRING`",
          },
          {
            "name": "password_updated_at",
            "title": "Password Updated At",
            "type": "`$STRING`",
            "format": "date-time",
          },
          {
            "name": "ram",
            "title": "Ram",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "sharing_space",
            "title": "Sharing Space",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "size",
            "title": "Size",
            "type": "`$STRING`",
            "req": True,
            "op": {
              "update": {
                "type": "`$STRING`",
              },
            },
          },
          {
            "name": "snapshot_enabled",
            "title": "Snapshot Enabled",
            "type": "`$BOOLEAN`",
            "req": True,
            "op": {
              "create": {
                "type": "`$BOOLEAN`",
              },
              "update": {
                "type": "`$BOOLEAN`",
              },
            },
          },
          {
            "name": "status",
            "title": "Status",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "storage",
            "title": "Storage",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "storage_additional_size",
            "title": "Storage Additional Size",
            "type": "`$INTEGER`",
          },
          {
            "name": "subscription_cancelled",
            "title": "Subscription Cancelled",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "type",
            "title": "Type",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "upgrade_to",
            "title": "Upgrade To",
            "type": "`$ARRAY`",
          },
          {
            "name": "vhosts",
            "title": "Vhosts",
            "type": "`$ARRAY`",
            "req": True,
            "op": {
              "create": {
                "type": "`$ARRAY`",
              },
            },
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "hosting_instance",
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
                    "lit": "simplehosting",
                  },
                  {
                    "lit": "instances",
                  },
                  {
                    "var": "id",
                  },
                  {
                    "lit": "action",
                  },
                ],
                "parts": [
                  "simplehosting",
                  "instances",
                  "{id}",
                  "action",
                ],
                "rename": {
                  "param": {
                    "instance_id": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "instance_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "$action": "action",
                  "exist": [
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "POST",
                "orig": "/simplehosting/instances",
                "segments": [
                  {
                    "lit": "simplehosting",
                  },
                  {
                    "lit": "instances",
                  },
                ],
                "parts": [
                  "simplehosting",
                  "instances",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "header": [
                    {
                      "name": "dry_run",
                      "orig": "Dry-Run",
                      "type": "`$INTEGER`",
                      "kind": "header",
                    },
                  ],
                  "query": [
                    {
                      "name": "sharing_id",
                      "orig": "sharing_id",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/simplehosting/instances",
                "segments": [
                  {
                    "lit": "simplehosting",
                  },
                  {
                    "lit": "instances",
                  },
                ],
                "parts": [
                  "simplehosting",
                  "instances",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "fqdn",
                      "orig": "fqdn",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "name",
                      "orig": "name",
                      "type": "`$STRING`",
                      "kind": "query",
                      "field": True,
                    },
                    {
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 1,
                    },
                    {
                      "name": "per_page",
                      "orig": "per_page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "sharing_id",
                      "orig": "sharing_id",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "size",
                      "orig": "size",
                      "type": "`$STRING`",
                      "kind": "query",
                      "field": True,
                    },
                    {
                      "name": "sort_by",
                      "orig": "sort_by",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "-created_at",
                    },
                    {
                      "name": "status",
                      "orig": "status",
                      "type": "`$STRING`",
                      "kind": "query",
                      "field": True,
                    },
                  ],
                },
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/simplehosting/instances/{instance_id}",
                "segments": [
                  {
                    "lit": "simplehosting",
                  },
                  {
                    "lit": "instances",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "simplehosting",
                  "instances",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "instance_id": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "instance_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/simplehosting/instances/{instance_id}/usage",
                "segments": [
                  {
                    "lit": "simplehosting",
                  },
                  {
                    "lit": "instances",
                  },
                  {
                    "var": "id",
                  },
                  {
                    "lit": "usage",
                  },
                ],
                "parts": [
                  "simplehosting",
                  "instances",
                  "{id}",
                  "usage",
                ],
                "rename": {
                  "param": {
                    "instance_id": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "instance_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "$action": "usage",
                  "exist": [
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/simplehosting/instances/{instance_id}",
                "segments": [
                  {
                    "lit": "simplehosting",
                  },
                  {
                    "lit": "instances",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "simplehosting",
                  "instances",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "instance_id": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "instance_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "kind": "http",
                "method": "PATCH",
                "orig": "/simplehosting/instances/{instance_id}",
                "segments": [
                  {
                    "lit": "simplehosting",
                  },
                  {
                    "lit": "instances",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "simplehosting",
                  "instances",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "instance_id": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "instance_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "hosting_vhost": {
        "fields": [
          {
            "name": "application",
            "title": "Application",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "created_at",
            "title": "Created At",
            "type": "`$STRING`",
            "req": True,
            "format": "date-time",
          },
          {
            "name": "deployment",
            "title": "Deployment",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "fqdn",
            "title": "Fqdn",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "https_strategy",
            "title": "Https Strategy",
            "type": "`$STRING`",
            "op": {
              "create": {
                "req": True,
                "type": "`$STRING`",
              },
            },
          },
          {
            "name": "is_a_test_vhost",
            "title": "Is A Test Vhost",
            "type": "`$BOOLEAN`",
            "req": True,
          },
          {
            "name": "linked_dns_zone",
            "title": "Linked Dns Zone",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "status",
            "title": "Status",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "tls_validated_at",
            "title": "Tls Validated At",
            "type": "`$STRING`",
            "format": "date-time",
          },
        ],
        "name": "hosting_vhost",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/simplehosting/instances/{instance_id}/vhosts",
                "segments": [
                  {
                    "lit": "simplehosting",
                  },
                  {
                    "lit": "instances",
                  },
                  {
                    "var": "instance_id",
                  },
                  {
                    "lit": "vhosts",
                  },
                ],
                "parts": [
                  "simplehosting",
                  "instances",
                  "{instance_id}",
                  "vhosts",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "instance_id",
                      "orig": "instance_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "instance_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
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
                    "lit": "simplehosting",
                  },
                  {
                    "lit": "instances",
                  },
                  {
                    "var": "instance_id",
                  },
                  {
                    "lit": "vhosts",
                  },
                ],
                "parts": [
                  "simplehosting",
                  "instances",
                  "{instance_id}",
                  "vhosts",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "instance_id",
                      "orig": "instance_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "fqdn",
                      "orig": "fqdn",
                      "type": "`$STRING`",
                      "kind": "query",
                      "field": True,
                    },
                    {
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 1,
                    },
                    {
                      "name": "per_page",
                      "orig": "per_page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "sort_by",
                      "orig": "sort_by",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "-created_at",
                    },
                    {
                      "name": "status",
                      "orig": "status",
                      "type": "`$STRING`",
                      "kind": "query",
                      "field": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "instance_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
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
                    "lit": "simplehosting",
                  },
                  {
                    "lit": "instances",
                  },
                  {
                    "var": "instance_id",
                  },
                  {
                    "lit": "vhosts",
                  },
                  {
                    "var": "fqdn",
                  },
                ],
                "parts": [
                  "simplehosting",
                  "instances",
                  "{instance_id}",
                  "vhosts",
                  "{fqdn}",
                ],
                "rename": {
                  "param": {
                    "vhost_fqdn": "fqdn",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "fqdn",
                      "orig": "vhost_fqdn",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "instance_id",
                      "orig": "instance_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "fqdn",
                    "instance_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
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
                    "lit": "simplehosting",
                  },
                  {
                    "lit": "instances",
                  },
                  {
                    "var": "instance_id",
                  },
                  {
                    "lit": "vhosts",
                  },
                  {
                    "var": "fqdn",
                  },
                ],
                "parts": [
                  "simplehosting",
                  "instances",
                  "{instance_id}",
                  "vhosts",
                  "{fqdn}",
                ],
                "rename": {
                  "param": {
                    "vhost_fqdn": "fqdn",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "fqdn",
                      "orig": "vhost_fqdn",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "instance_id",
                      "orig": "instance_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "fqdn",
                    "instance_id",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/simplehosting/instances/{instance_id}/vhosts/{vhost_fqdn}/cache",
                "segments": [
                  {
                    "lit": "simplehosting",
                  },
                  {
                    "lit": "instances",
                  },
                  {
                    "var": "instance_id",
                  },
                  {
                    "lit": "vhosts",
                  },
                  {
                    "var": "fqdn",
                  },
                  {
                    "lit": "cache",
                  },
                ],
                "parts": [
                  "simplehosting",
                  "instances",
                  "{instance_id}",
                  "vhosts",
                  "{fqdn}",
                  "cache",
                ],
                "rename": {
                  "param": {
                    "vhost_fqdn": "fqdn",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "fqdn",
                      "orig": "vhost_fqdn",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "instance_id",
                      "orig": "instance_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "$action": "cache",
                  "exist": [
                    "fqdn",
                    "instance_id",
                  ],
                },
              },
            ],
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
                    "lit": "simplehosting",
                  },
                  {
                    "lit": "instances",
                  },
                  {
                    "var": "instance_id",
                  },
                  {
                    "lit": "vhosts",
                  },
                  {
                    "var": "fqdn",
                  },
                ],
                "parts": [
                  "simplehosting",
                  "instances",
                  "{instance_id}",
                  "vhosts",
                  "{fqdn}",
                ],
                "rename": {
                  "param": {
                    "vhost_fqdn": "fqdn",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "fqdn",
                      "orig": "vhost_fqdn",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "instance_id",
                      "orig": "instance_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "fqdn",
                    "instance_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "issued_certificate": {
        "fields": [
          {
            "name": "altnames",
            "title": "Altnames",
            "type": "`$ARRAY`",
            "req": True,
            "op": {
              "create": {
                "type": "`$ARRAY`",
              },
              "update": {
                "type": "`$ARRAY`",
              },
            },
          },
          {
            "name": "altnames_unicode",
            "title": "Altnames Unicode",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "apex_only",
            "title": "Apex Only",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "assumed_name",
            "title": "Assumed Name",
            "type": "`$STRING`",
          },
          {
            "name": "business_category",
            "title": "Business Category",
            "type": "`$STRING`",
          },
          {
            "name": "card_pay_trustlogo",
            "title": "Card Pay Trustlogo",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "cert",
            "title": "Cert",
            "type": "`$STRING`",
          },
          {
            "name": "cn",
            "title": "Cn",
            "type": "`$STRING`",
            "req": True,
            "op": {
              "create": {
                "type": "`$STRING`",
              },
            },
          },
          {
            "name": "cn_unicode",
            "title": "Cn Unicode",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "contact",
            "title": "Contact",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "csr",
            "title": "Csr",
            "type": "`$STRING`",
          },
          {
            "name": "dates",
            "title": "Dates",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "dcv_method",
            "title": "Dcv Method",
            "type": "`$STRING`",
          },
          {
            "name": "duration",
            "title": "Duration",
            "type": "`$INTEGER`",
          },
          {
            "name": "error_msg",
            "title": "Error Msg",
            "type": "`$STRING`",
          },
          {
            "name": "errors",
            "title": "Errors",
            "type": "`$ARRAY`",
          },
          {
            "name": "href",
            "title": "Href",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "ida",
            "title": "Ida",
            "type": "`$OBJECT`",
          },
          {
            "name": "intermediate",
            "title": "Intermediate",
            "type": "`$STRING`",
          },
          {
            "name": "joi",
            "title": "Joi",
            "type": "`$OBJECT`",
          },
          {
            "name": "middleman",
            "title": "Middleman",
            "type": "`$OBJECT`",
          },
          {
            "name": "owner",
            "title": "Owner",
            "type": "`$STRING`",
          },
          {
            "name": "package",
            "title": "Package",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "provider",
            "title": "Provider",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "reissuable",
            "title": "Reissuable",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "renewable",
            "title": "Renewable",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "resellee_id",
            "title": "Resellee Id",
            "type": "`$STRING`",
          },
          {
            "name": "sha_version",
            "title": "Sha Version",
            "type": "`$INTEGER`",
          },
          {
            "name": "sharing_id",
            "title": "Sharing Id",
            "type": "`$STRING`",
          },
          {
            "name": "software",
            "title": "Software",
            "type": "`$INTEGER`",
            "req": True,
          },
          {
            "name": "state",
            "title": "State",
            "type": "`$STRING`",
          },
          {
            "name": "state_detail",
            "title": "State Detail",
            "type": "`$STRING`",
          },
          {
            "name": "status",
            "title": "Status",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "step_nb",
            "title": "Step Nb",
            "type": "`$INTEGER`",
          },
          {
            "name": "stored",
            "title": "Stored",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "tags",
            "title": "Tags",
            "type": "`$ARRAY`",
          },
          {
            "name": "trustlogo",
            "title": "Trustlogo",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "trustlogo_token",
            "title": "Trustlogo Token",
            "type": "`$OBJECT`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "issued_certificate",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/certificate/issued-certs/{id}/dcv_params",
                "segments": [
                  {
                    "lit": "certificate",
                  },
                  {
                    "lit": "issued-certs",
                  },
                  {
                    "var": "id",
                  },
                  {
                    "lit": "dcv_params",
                  },
                ],
                "parts": [
                  "certificate",
                  "issued-certs",
                  "{id}",
                  "dcv_params",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "$action": "dcv_params",
                  "exist": [
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "POST",
                "orig": "/certificate/dcv_params",
                "segments": [
                  {
                    "lit": "certificate",
                  },
                  {
                    "lit": "dcv_params",
                  },
                ],
                "parts": [
                  "certificate",
                  "dcv_params",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {
                  "$action": "dcv_params",
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "POST",
                "orig": "/certificate/issued-certs",
                "segments": [
                  {
                    "lit": "certificate",
                  },
                  {
                    "lit": "issued-certs",
                  },
                ],
                "parts": [
                  "certificate",
                  "issued-certs",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "header": [
                    {
                      "name": "dry_run",
                      "orig": "Dry-Run",
                      "type": "`$INTEGER`",
                      "kind": "header",
                    },
                  ],
                  "query": [
                    {
                      "name": "sharing_id",
                      "orig": "sharing_id",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/certificate/issued-certs",
                "segments": [
                  {
                    "lit": "certificate",
                  },
                  {
                    "lit": "issued-certs",
                  },
                ],
                "parts": [
                  "certificate",
                  "issued-certs",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "cn",
                      "orig": "cn",
                      "type": "`$STRING`",
                      "kind": "query",
                      "field": True,
                    },
                    {
                      "name": "cn_eq",
                      "orig": "cn__eq",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "covered_cn",
                      "orig": "covered_cn",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "package",
                      "orig": "package",
                      "type": "`$STRING`",
                      "kind": "query",
                      "field": True,
                    },
                    {
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 1,
                    },
                    {
                      "name": "per_page",
                      "orig": "per_page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "sharing_id",
                      "orig": "sharing_id",
                      "type": "`$STRING`",
                      "kind": "query",
                      "field": True,
                    },
                    {
                      "name": "sort_by",
                      "orig": "sort_by",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "ends_at",
                    },
                    {
                      "name": "status",
                      "orig": "status",
                      "type": "`$STRING`",
                      "kind": "query",
                      "field": True,
                    },
                  ],
                },
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
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
                    "lit": "certificate",
                  },
                  {
                    "lit": "issued-certs",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "certificate",
                  "issued-certs",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/certificate/issued-certs/{id}/crt",
                "segments": [
                  {
                    "lit": "certificate",
                  },
                  {
                    "lit": "issued-certs",
                  },
                  {
                    "var": "id",
                  },
                  {
                    "lit": "crt",
                  },
                ],
                "parts": [
                  "certificate",
                  "issued-certs",
                  "{id}",
                  "crt",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "$action": "crt",
                  "exist": [
                    "id",
                  ],
                },
                "response": {
                  "kind": "raw",
                  "media": "text/plain",
                },
              },
            ],
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
                    "lit": "certificate",
                  },
                  {
                    "lit": "issued-certs",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "certificate",
                  "issued-certs",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "sharing_id",
                      "orig": "sharing_id",
                      "type": "`$STRING`",
                      "kind": "query",
                      "field": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "kind": "http",
                "method": "PATCH",
                "orig": "/certificate/issued-certs/{id}",
                "segments": [
                  {
                    "lit": "certificate",
                  },
                  {
                    "lit": "issued-certs",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "certificate",
                  "issued-certs",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "header": [
                    {
                      "name": "dry_run",
                      "orig": "Dry-Run",
                      "type": "`$INTEGER`",
                      "kind": "header",
                    },
                  ],
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "sharing_id",
                      "orig": "sharing_id",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "linked_zone": {
        "fields": [
          {
            "name": "created_at",
            "title": "Created At",
            "type": "`$STRING`",
            "req": True,
            "format": "date-time",
          },
          {
            "name": "default_records",
            "title": "Default Records",
            "type": "`$BOOLEAN`",
            "req": True,
            "op": {
              "create": {
                "type": "`$BOOLEAN`",
              },
              "update": {
                "type": "`$BOOLEAN`",
              },
            },
          },
          {
            "name": "domain_count",
            "title": "Domain Count",
            "type": "`$INTEGER`",
            "req": True,
          },
          {
            "name": "domains",
            "title": "Domains",
            "type": "`$ARRAY`",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "message",
            "title": "Message",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "req": True,
            "op": {
              "update": {
                "type": "`$STRING`",
              },
            },
          },
          {
            "name": "record_list",
            "title": "Record List",
            "type": "`$ARRAY`",
          },
          {
            "name": "record_text",
            "title": "Record Text",
            "type": "`$STRING`",
          },
          {
            "name": "records",
            "title": "Records",
            "type": "`$ARRAY`",
          },
          {
            "name": "sharing_space",
            "title": "Sharing Space",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "status",
            "title": "Status",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "updated_at",
            "title": "Updated At",
            "type": "`$STRING`",
            "format": "date-time",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
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
                "orig": "/linkedzone/zones",
                "segments": [
                  {
                    "lit": "linkedzone",
                  },
                  {
                    "lit": "zones",
                  },
                ],
                "parts": [
                  "linkedzone",
                  "zones",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/linkedzone/zones",
                "segments": [
                  {
                    "lit": "linkedzone",
                  },
                  {
                    "lit": "zones",
                  },
                ],
                "parts": [
                  "linkedzone",
                  "zones",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 1,
                    },
                    {
                      "name": "per_page",
                      "orig": "per_page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "sharing_id",
                      "orig": "sharing_id",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/linkedzone/zones/{zone_id}",
                "segments": [
                  {
                    "lit": "linkedzone",
                  },
                  {
                    "lit": "zones",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "linkedzone",
                  "zones",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "zone_id": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "zone_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "sharing_id",
                      "orig": "sharing_id",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
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
                    "lit": "linkedzone",
                  },
                  {
                    "lit": "zones",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "linkedzone",
                  "zones",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "zone_id": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "zone_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
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
                    "lit": "linkedzone",
                  },
                  {
                    "lit": "zones",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "linkedzone",
                  "zones",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "zone_id": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "zone_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "linked_zone_deployment": {
        "fields": [
          {
            "name": "deploy",
            "title": "Deploy",
            "type": "`$BOOLEAN`",
            "req": True,
          },
          {
            "name": "message",
            "title": "Message",
            "type": "`$STRING`",
            "req": True,
          },
        ],
        "name": "linked_zone_deployment",
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
                    "lit": "linkedzone",
                  },
                  {
                    "lit": "zones",
                  },
                  {
                    "var": "zone_id",
                  },
                ],
                "parts": [
                  "linkedzone",
                  "zones",
                  "{zone_id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "zone_id",
                      "orig": "zone_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "zone_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "linked_zone_domain": {
        "fields": [
          {
            "name": "deployed",
            "title": "Deployed",
            "type": "`$BOOLEAN`",
            "req": True,
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "owner",
            "title": "Owner",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "zone",
            "title": "Zone",
            "type": "`$OBJECT`",
            "req": True,
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "linked_zone_domain",
        "op": {
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
                    "lit": "linkedzone",
                  },
                  {
                    "lit": "domains",
                  },
                ],
                "parts": [
                  "linkedzone",
                  "domains",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "name",
                      "orig": "name",
                      "type": "`$STRING`",
                      "kind": "query",
                      "field": True,
                    },
                    {
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 1,
                    },
                    {
                      "name": "per_page",
                      "orig": "per_page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "sharing_id",
                      "orig": "sharing_id",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "zone_id",
                      "orig": "zone_id",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
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
                    "lit": "linkedzone",
                  },
                  {
                    "lit": "domains",
                  },
                  {
                    "var": "name",
                  },
                ],
                "parts": [
                  "linkedzone",
                  "domains",
                  "{name}",
                ],
                "rename": {
                  "param": {
                    "domain": "name",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "name",
                      "orig": "domain",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "name",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "kind": "http",
                "method": "PATCH",
                "orig": "/linkedzone/zones/{zone_id}/link/domains",
                "segments": [
                  {
                    "lit": "linkedzone",
                  },
                  {
                    "lit": "zones",
                  },
                  {
                    "var": "zone_id",
                  },
                  {
                    "lit": "link",
                  },
                  {
                    "lit": "domains",
                  },
                ],
                "parts": [
                  "linkedzone",
                  "zones",
                  "{zone_id}",
                  "link",
                  "domains",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "zone_id",
                      "orig": "zone_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "$action": "link",
                  "exist": [
                    "zone_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "PATCH",
                "orig": "/linkedzone/unlink/domains",
                "segments": [
                  {
                    "lit": "linkedzone",
                  },
                  {
                    "lit": "unlink",
                  },
                  {
                    "lit": "domains",
                  },
                ],
                "parts": [
                  "linkedzone",
                  "unlink",
                  "domains",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {
                  "$action": "unlink",
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.domain",
            ],
          ],
        },
      },
      "linked_zone_task": {
        "fields": [
          {
            "name": "created_at",
            "title": "Created At",
            "type": "`$STRING`",
            "req": True,
            "format": "date-time",
          },
          {
            "name": "ending_at",
            "title": "Ending At",
            "type": "`$STRING`",
            "format": "date-time",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "result",
            "title": "Result",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "status",
            "title": "Status",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "type",
            "title": "Type",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "updated_at",
            "title": "Updated At",
            "type": "`$STRING`",
            "format": "date-time",
          },
          {
            "name": "zone_id",
            "title": "Zone Id",
            "type": "`$STRING`",
            "req": True,
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "linked_zone_task",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/linkedzone/tasks",
                "segments": [
                  {
                    "lit": "linkedzone",
                  },
                  {
                    "lit": "tasks",
                  },
                ],
                "parts": [
                  "linkedzone",
                  "tasks",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 1,
                    },
                    {
                      "name": "per_page",
                      "orig": "per_page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/linkedzone/tasks/{task_id}",
                "segments": [
                  {
                    "lit": "linkedzone",
                  },
                  {
                    "lit": "tasks",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "linkedzone",
                  "tasks",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "task_id": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "task_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "livedns_axfr_slave": {
        "fields": [
          {
            "name": "message",
            "title": "Message",
            "type": "`$STRING`",
            "req": True,
          },
        ],
        "name": "livedns_axfr_slave",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/livedns/domains/{fqdn}/axfr/slaves",
                "segments": [
                  {
                    "lit": "livedns",
                  },
                  {
                    "lit": "domains",
                  },
                  {
                    "var": "fqdn",
                  },
                  {
                    "lit": "axfr",
                  },
                  {
                    "lit": "slaves",
                  },
                ],
                "parts": [
                  "livedns",
                  "domains",
                  "{fqdn}",
                  "axfr",
                  "slaves",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "fqdn",
                      "orig": "fqdn",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "fqdn",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/livedns/domains/{fqdn}/axfr/slaves/{ip}",
                "segments": [
                  {
                    "lit": "livedns",
                  },
                  {
                    "lit": "domains",
                  },
                  {
                    "var": "fqdn",
                  },
                  {
                    "lit": "axfr",
                  },
                  {
                    "lit": "slaves",
                  },
                  {
                    "var": "ip",
                  },
                ],
                "parts": [
                  "livedns",
                  "domains",
                  "{fqdn}",
                  "axfr",
                  "slaves",
                  "{ip}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "fqdn",
                      "orig": "fqdn",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "ip",
                      "orig": "ip",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "fqdn",
                    "ip",
                  ],
                },
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "kind": "http",
                "method": "PUT",
                "orig": "/livedns/domains/{fqdn}/axfr/slaves/{ip}",
                "segments": [
                  {
                    "lit": "livedns",
                  },
                  {
                    "lit": "domains",
                  },
                  {
                    "var": "fqdn",
                  },
                  {
                    "lit": "axfr",
                  },
                  {
                    "lit": "slaves",
                  },
                  {
                    "var": "ip",
                  },
                ],
                "parts": [
                  "livedns",
                  "domains",
                  "{fqdn}",
                  "axfr",
                  "slaves",
                  "{ip}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "fqdn",
                      "orig": "fqdn",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "ip",
                      "orig": "ip",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "fqdn",
                    "ip",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.domain",
            ],
            [
              "$.main.kit.entity.domain",
            ],
          ],
        },
      },
      "livedns_axfr_tsig": {
        "fields": [
          {
            "name": "href",
            "title": "Href",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "key_name",
            "title": "Key Name",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "message",
            "title": "Message",
            "type": "`$STRING`",
            "req": True,
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "livedns_axfr_tsig",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/livedns/domains/{fqdn}/axfr/tsig",
                "segments": [
                  {
                    "lit": "livedns",
                  },
                  {
                    "lit": "domains",
                  },
                  {
                    "var": "fqdn",
                  },
                  {
                    "lit": "axfr",
                  },
                  {
                    "lit": "tsig",
                  },
                ],
                "parts": [
                  "livedns",
                  "domains",
                  "{fqdn}",
                  "axfr",
                  "tsig",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "fqdn",
                      "orig": "fqdn",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "fqdn",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/livedns/domains/{fqdn}/axfr/tsig/{id}",
                "segments": [
                  {
                    "lit": "livedns",
                  },
                  {
                    "lit": "domains",
                  },
                  {
                    "var": "fqdn",
                  },
                  {
                    "lit": "axfr",
                  },
                  {
                    "lit": "tsig",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "livedns",
                  "domains",
                  "{fqdn}",
                  "axfr",
                  "tsig",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "fqdn",
                      "orig": "fqdn",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "sharing_id",
                      "orig": "sharing_id",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "fqdn",
                    "id",
                  ],
                },
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "kind": "http",
                "method": "PUT",
                "orig": "/livedns/domains/{fqdn}/axfr/tsig/{id}",
                "segments": [
                  {
                    "lit": "livedns",
                  },
                  {
                    "lit": "domains",
                  },
                  {
                    "var": "fqdn",
                  },
                  {
                    "lit": "axfr",
                  },
                  {
                    "lit": "tsig",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "livedns",
                  "domains",
                  "{fqdn}",
                  "axfr",
                  "tsig",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "fqdn",
                      "orig": "fqdn",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "sharing_id",
                      "orig": "sharing_id",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "fqdn",
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.domain",
            ],
          ],
        },
      },
      "livedns_domain": {
        "fields": [
          {
            "name": "automatic_snapshots",
            "title": "Automatic Snapshots",
            "type": "`$BOOLEAN`",
            "req": True,
            "op": {
              "update": {
                "type": "`$BOOLEAN`",
              },
            },
          },
          {
            "name": "domain_href",
            "title": "Domain Href",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "domain_keys_href",
            "title": "Domain Keys Href",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "domain_records_href",
            "title": "Domain Records Href",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "fqdn",
            "title": "Fqdn",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "message",
            "title": "Message",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "zone",
            "title": "Zone",
            "type": "`$OBJECT`",
          },
        ],
        "name": "livedns_domain",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/livedns/domains",
                "segments": [
                  {
                    "lit": "livedns",
                  },
                  {
                    "lit": "domains",
                  },
                ],
                "parts": [
                  "livedns",
                  "domains",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "sharing_id",
                      "orig": "sharing_id",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/livedns/domains",
                "segments": [
                  {
                    "lit": "livedns",
                  },
                  {
                    "lit": "domains",
                  },
                ],
                "parts": [
                  "livedns",
                  "domains",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 1,
                    },
                    {
                      "name": "per_page",
                      "orig": "per_page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "sharing_id",
                      "orig": "sharing_id",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/livedns/domains/{fqdn}",
                "segments": [
                  {
                    "lit": "livedns",
                  },
                  {
                    "lit": "domains",
                  },
                  {
                    "var": "fqdn",
                  },
                ],
                "parts": [
                  "livedns",
                  "domains",
                  "{fqdn}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "fqdn",
                      "orig": "fqdn",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "fqdn",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "kind": "http",
                "method": "PATCH",
                "orig": "/livedns/domains/{fqdn}",
                "segments": [
                  {
                    "lit": "livedns",
                  },
                  {
                    "lit": "domains",
                  },
                  {
                    "var": "fqdn",
                  },
                ],
                "parts": [
                  "livedns",
                  "domains",
                  "{fqdn}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "fqdn",
                      "orig": "fqdn",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "fqdn",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.domain",
            ],
          ],
        },
      },
      "livedns_key": {
        "fields": [
          {
            "name": "algorithm",
            "title": "Algorithm",
            "type": "`$INTEGER`",
            "req": True,
          },
          {
            "name": "algorithm_name",
            "title": "Algorithm Name",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "deleted",
            "title": "Deleted",
            "type": "`$BOOLEAN`",
            "req": True,
          },
          {
            "name": "ds",
            "title": "Ds",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "fingerprint",
            "title": "Fingerprint",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "flags",
            "title": "Flags",
            "type": "`$INTEGER`",
            "req": True,
          },
          {
            "name": "fqdn",
            "title": "Fqdn",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "key_href",
            "title": "Key Href",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "message",
            "title": "Message",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "public_key",
            "title": "Public Key",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "status",
            "title": "Status",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "tag",
            "title": "Tag",
            "type": "`$INTEGER`",
            "req": True,
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "livedns_key",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/livedns/domains/{fqdn}/keys",
                "segments": [
                  {
                    "lit": "livedns",
                  },
                  {
                    "lit": "domains",
                  },
                  {
                    "var": "fqdn",
                  },
                  {
                    "lit": "keys",
                  },
                ],
                "parts": [
                  "livedns",
                  "domains",
                  "{fqdn}",
                  "keys",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "fqdn",
                      "orig": "fqdn",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "fqdn",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/livedns/domains/{fqdn}/keys",
                "segments": [
                  {
                    "lit": "livedns",
                  },
                  {
                    "lit": "domains",
                  },
                  {
                    "var": "fqdn",
                  },
                  {
                    "lit": "keys",
                  },
                ],
                "parts": [
                  "livedns",
                  "domains",
                  "{fqdn}",
                  "keys",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "fqdn",
                      "orig": "fqdn",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "fqdn",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/livedns/domains/{fqdn}/keys/{id}",
                "segments": [
                  {
                    "lit": "livedns",
                  },
                  {
                    "lit": "domains",
                  },
                  {
                    "var": "fqdn",
                  },
                  {
                    "lit": "keys",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "livedns",
                  "domains",
                  "{fqdn}",
                  "keys",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "fqdn",
                      "orig": "fqdn",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "fqdn",
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/livedns/domains/{fqdn}/keys/{id}",
                "segments": [
                  {
                    "lit": "livedns",
                  },
                  {
                    "lit": "domains",
                  },
                  {
                    "var": "fqdn",
                  },
                  {
                    "lit": "keys",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "livedns",
                  "domains",
                  "{fqdn}",
                  "keys",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "fqdn",
                      "orig": "fqdn",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "fqdn",
                    "id",
                  ],
                },
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "kind": "http",
                "method": "PATCH",
                "orig": "/livedns/domains/{fqdn}/keys/{id}",
                "segments": [
                  {
                    "lit": "livedns",
                  },
                  {
                    "lit": "domains",
                  },
                  {
                    "var": "fqdn",
                  },
                  {
                    "lit": "keys",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "livedns",
                  "domains",
                  "{fqdn}",
                  "keys",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "fqdn",
                      "orig": "fqdn",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "fqdn",
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.domain",
            ],
          ],
        },
      },
      "livedns_nameserver": {
        "fields": [],
        "name": "livedns_nameserver",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/livedns/domains/{fqdn}/nameservers",
                "segments": [
                  {
                    "lit": "livedns",
                  },
                  {
                    "lit": "domains",
                  },
                  {
                    "var": "fqdn",
                  },
                  {
                    "lit": "nameservers",
                  },
                ],
                "parts": [
                  "livedns",
                  "domains",
                  "{fqdn}",
                  "nameservers",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "fqdn",
                      "orig": "fqdn",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "fqdn",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/livedns/nameservers/{fqdn}",
                "segments": [
                  {
                    "lit": "livedns",
                  },
                  {
                    "lit": "nameservers",
                  },
                  {
                    "var": "fqdn",
                  },
                ],
                "parts": [
                  "livedns",
                  "nameservers",
                  "{fqdn}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "fqdn",
                      "orig": "fqdn",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "$action": "generic",
                  "exist": [
                    "fqdn",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.domain",
            ],
          ],
        },
      },
      "livedns_record": {
        "fields": [
          {
            "name": "add_rrset_values",
            "title": "Add Rrset Values",
            "type": "`$ARRAY`",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
          {
            "name": "message",
            "title": "Message",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "remove_rrset_values",
            "title": "Remove Rrset Values",
            "type": "`$ARRAY`",
          },
          {
            "name": "rrset_href",
            "title": "Rrset Href",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "rrset_name",
            "title": "Rrset Name",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "rrset_ttl",
            "title": "Rrset Ttl",
            "type": "`$INTEGER`",
          },
          {
            "name": "rrset_type",
            "title": "Rrset Type",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "rrset_values",
            "title": "Rrset Values",
            "type": "`$ARRAY`",
            "req": True,
          },
        ],
        "id": {
          "field": "id",
          "from": {
            "rrset_name": "rrset_name",
            "rrset_type": "rrset_type",
          },
          "name": "id",
          "parts": [
            "rrset_name",
            "rrset_type",
          ],
          "sep": "/",
        },
        "name": "livedns_record",
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
                    "lit": "livedns",
                  },
                  {
                    "lit": "domains",
                  },
                  {
                    "var": "fqdn",
                  },
                  {
                    "lit": "records",
                  },
                  {
                    "var": "rrset_name",
                  },
                  {
                    "var": "rrset_type",
                  },
                ],
                "parts": [
                  "livedns",
                  "domains",
                  "{fqdn}",
                  "records",
                  "{rrset_name}",
                  "{rrset_type}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "fqdn",
                      "orig": "fqdn",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "rrset_name",
                      "orig": "rrset_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "rrset_type",
                      "orig": "rrset_type",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "fqdn",
                    "rrset_name",
                    "rrset_type",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "POST",
                "orig": "/livedns/domains/{fqdn}/verification/{rrset_name}/{rrset_type}",
                "segments": [
                  {
                    "lit": "livedns",
                  },
                  {
                    "lit": "domains",
                  },
                  {
                    "var": "fqdn",
                  },
                  {
                    "lit": "verification",
                  },
                  {
                    "var": "rrset_name",
                  },
                  {
                    "var": "rrset_type",
                  },
                ],
                "parts": [
                  "livedns",
                  "domains",
                  "{fqdn}",
                  "verification",
                  "{rrset_name}",
                  "{rrset_type}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "fqdn",
                      "orig": "fqdn",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "rrset_name",
                      "orig": "rrset_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "rrset_type",
                      "orig": "rrset_type",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "$action": "verification",
                  "exist": [
                    "fqdn",
                    "rrset_name",
                    "rrset_type",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "POST",
                "orig": "/livedns/domains/{fqdn}/records/{rrset_name}",
                "segments": [
                  {
                    "lit": "livedns",
                  },
                  {
                    "lit": "domains",
                  },
                  {
                    "var": "fqdn",
                  },
                  {
                    "lit": "records",
                  },
                  {
                    "var": "rrset_name",
                  },
                ],
                "parts": [
                  "livedns",
                  "domains",
                  "{fqdn}",
                  "records",
                  "{rrset_name}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "fqdn",
                      "orig": "fqdn",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "rrset_name",
                      "orig": "rrset_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "$action": "name",
                  "exist": [
                    "fqdn",
                    "rrset_name",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "POST",
                "orig": "/livedns/domains/{fqdn}/records",
                "segments": [
                  {
                    "lit": "livedns",
                  },
                  {
                    "lit": "domains",
                  },
                  {
                    "var": "fqdn",
                  },
                  {
                    "lit": "records",
                  },
                ],
                "parts": [
                  "livedns",
                  "domains",
                  "{fqdn}",
                  "records",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "fqdn",
                      "orig": "fqdn",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "fqdn",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
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
                    "lit": "livedns",
                  },
                  {
                    "lit": "domains",
                  },
                  {
                    "var": "fqdn",
                  },
                  {
                    "lit": "records",
                  },
                  {
                    "var": "rrset_name",
                  },
                ],
                "parts": [
                  "livedns",
                  "domains",
                  "{fqdn}",
                  "records",
                  "{rrset_name}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "fqdn",
                      "orig": "fqdn",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "rrset_name",
                      "orig": "rrset_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "$action": "name",
                  "exist": [
                    "fqdn",
                    "rrset_name",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/livedns/domains/{fqdn}/records",
                "segments": [
                  {
                    "lit": "livedns",
                  },
                  {
                    "lit": "domains",
                  },
                  {
                    "var": "fqdn",
                  },
                  {
                    "lit": "records",
                  },
                ],
                "parts": [
                  "livedns",
                  "domains",
                  "{fqdn}",
                  "records",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "fqdn",
                      "orig": "fqdn",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 1,
                    },
                    {
                      "name": "per_page",
                      "orig": "per_page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "rrset_type",
                      "orig": "rrset_type",
                      "type": "`$STRING`",
                      "kind": "query",
                      "field": True,
                    },
                    {
                      "name": "sort_by",
                      "orig": "sort_by",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "rrset_name",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "fqdn",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
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
                    "lit": "livedns",
                  },
                  {
                    "lit": "domains",
                  },
                  {
                    "var": "fqdn",
                  },
                  {
                    "lit": "records",
                  },
                  {
                    "var": "rrset_name",
                  },
                  {
                    "var": "rrset_type",
                  },
                ],
                "parts": [
                  "livedns",
                  "domains",
                  "{fqdn}",
                  "records",
                  "{rrset_name}",
                  "{rrset_type}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "fqdn",
                      "orig": "fqdn",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "rrset_name",
                      "orig": "rrset_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "rrset_type",
                      "orig": "rrset_type",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "fqdn",
                    "rrset_name",
                    "rrset_type",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
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
                    "lit": "livedns",
                  },
                  {
                    "lit": "domains",
                  },
                  {
                    "var": "fqdn",
                  },
                  {
                    "lit": "records",
                  },
                  {
                    "var": "rrset_name",
                  },
                  {
                    "var": "rrset_type",
                  },
                ],
                "parts": [
                  "livedns",
                  "domains",
                  "{fqdn}",
                  "records",
                  "{rrset_name}",
                  "{rrset_type}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "fqdn",
                      "orig": "fqdn",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "rrset_name",
                      "orig": "rrset_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "rrset_type",
                      "orig": "rrset_type",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "fqdn",
                    "rrset_name",
                    "rrset_type",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
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
                    "lit": "livedns",
                  },
                  {
                    "lit": "domains",
                  },
                  {
                    "var": "fqdn",
                  },
                  {
                    "lit": "records",
                  },
                  {
                    "var": "rrset_name",
                  },
                  {
                    "var": "rrset_type",
                  },
                ],
                "parts": [
                  "livedns",
                  "domains",
                  "{fqdn}",
                  "records",
                  "{rrset_name}",
                  "{rrset_type}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "fqdn",
                      "orig": "fqdn",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "rrset_name",
                      "orig": "rrset_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "rrset_type",
                      "orig": "rrset_type",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "fqdn",
                    "rrset_name",
                    "rrset_type",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/livedns/domains/{fqdn}/records/{rrset_name}",
                "segments": [
                  {
                    "lit": "livedns",
                  },
                  {
                    "lit": "domains",
                  },
                  {
                    "var": "fqdn",
                  },
                  {
                    "lit": "records",
                  },
                  {
                    "var": "rrset_name",
                  },
                ],
                "parts": [
                  "livedns",
                  "domains",
                  "{fqdn}",
                  "records",
                  "{rrset_name}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "fqdn",
                      "orig": "fqdn",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "rrset_name",
                      "orig": "rrset_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "$action": "name",
                  "exist": [
                    "fqdn",
                    "rrset_name",
                  ],
                },
              },
            ],
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
                    "lit": "livedns",
                  },
                  {
                    "lit": "domains",
                  },
                  {
                    "var": "fqdn",
                  },
                  {
                    "lit": "records",
                  },
                  {
                    "var": "rrset_name",
                  },
                  {
                    "var": "rrset_type",
                  },
                ],
                "parts": [
                  "livedns",
                  "domains",
                  "{fqdn}",
                  "records",
                  "{rrset_name}",
                  "{rrset_type}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "fqdn",
                      "orig": "fqdn",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "rrset_name",
                      "orig": "rrset_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "rrset_type",
                      "orig": "rrset_type",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "fqdn",
                    "rrset_name",
                    "rrset_type",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "PUT",
                "orig": "/livedns/domains/{fqdn}/records/{rrset_name}",
                "segments": [
                  {
                    "lit": "livedns",
                  },
                  {
                    "lit": "domains",
                  },
                  {
                    "var": "fqdn",
                  },
                  {
                    "lit": "records",
                  },
                  {
                    "var": "rrset_name",
                  },
                ],
                "parts": [
                  "livedns",
                  "domains",
                  "{fqdn}",
                  "records",
                  "{rrset_name}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "fqdn",
                      "orig": "fqdn",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "rrset_name",
                      "orig": "rrset_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "$action": "name",
                  "exist": [
                    "fqdn",
                    "rrset_name",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.domain",
            ],
            [
              "$.main.kit.entity.domain",
            ],
            [
              "$.main.kit.entity.domain",
            ],
          ],
        },
      },
      "livedns_rrtype": {
        "fields": [],
        "name": "livedns_rrtype",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/livedns/dns/rrtypes",
                "segments": [
                  {
                    "lit": "livedns",
                  },
                  {
                    "lit": "dns",
                  },
                  {
                    "lit": "rrtypes",
                  },
                ],
                "parts": [
                  "livedns",
                  "dns",
                  "rrtypes",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "livedns_snapshot": {
        "fields": [
          {
            "name": "automatic",
            "title": "Automatic",
            "type": "`$BOOLEAN`",
            "req": True,
          },
          {
            "name": "created_at",
            "title": "Created At",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "href",
            "title": "Href",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "message",
            "title": "Message",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "req": True,
            "op": {
              "create": {
                "type": "`$STRING`",
              },
            },
          },
          {
            "name": "zone_data",
            "title": "Zone Data",
            "type": "`$ARRAY`",
            "req": True,
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "livedns_snapshot",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/livedns/domains/{fqdn}/snapshots",
                "segments": [
                  {
                    "lit": "livedns",
                  },
                  {
                    "lit": "domains",
                  },
                  {
                    "var": "fqdn",
                  },
                  {
                    "lit": "snapshots",
                  },
                ],
                "parts": [
                  "livedns",
                  "domains",
                  "{fqdn}",
                  "snapshots",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "fqdn",
                      "orig": "fqdn",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "fqdn",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/livedns/domains/{fqdn}/snapshots",
                "segments": [
                  {
                    "lit": "livedns",
                  },
                  {
                    "lit": "domains",
                  },
                  {
                    "var": "fqdn",
                  },
                  {
                    "lit": "snapshots",
                  },
                ],
                "parts": [
                  "livedns",
                  "domains",
                  "{fqdn}",
                  "snapshots",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "fqdn",
                      "orig": "fqdn",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "automatic",
                      "orig": "automatic",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                      "field": True,
                    },
                    {
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 1,
                    },
                    {
                      "name": "per_page",
                      "orig": "per_page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "sort_by",
                      "orig": "sort_by",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "date_created",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "fqdn",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/livedns/domains/{fqdn}/snapshots/{id}",
                "segments": [
                  {
                    "lit": "livedns",
                  },
                  {
                    "lit": "domains",
                  },
                  {
                    "var": "fqdn",
                  },
                  {
                    "lit": "snapshots",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "livedns",
                  "domains",
                  "{fqdn}",
                  "snapshots",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "fqdn",
                      "orig": "fqdn",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "fqdn",
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/livedns/domains/{fqdn}/snapshots/{id}",
                "segments": [
                  {
                    "lit": "livedns",
                  },
                  {
                    "lit": "domains",
                  },
                  {
                    "var": "fqdn",
                  },
                  {
                    "lit": "snapshots",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "livedns",
                  "domains",
                  "{fqdn}",
                  "snapshots",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "fqdn",
                      "orig": "fqdn",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "fqdn",
                    "id",
                  ],
                },
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "kind": "http",
                "method": "PATCH",
                "orig": "/livedns/domains/{fqdn}/snapshots/{id}",
                "segments": [
                  {
                    "lit": "livedns",
                  },
                  {
                    "lit": "domains",
                  },
                  {
                    "var": "fqdn",
                  },
                  {
                    "lit": "snapshots",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "livedns",
                  "domains",
                  "{fqdn}",
                  "snapshots",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "fqdn",
                      "orig": "fqdn",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "fqdn",
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.domain",
            ],
          ],
        },
      },
      "livedns_tsig_key": {
        "fields": [
          {
            "name": "config_samples",
            "title": "Config Samples",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "href",
            "title": "Href",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "key_name",
            "title": "Key Name",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "secret",
            "title": "Secret",
            "type": "`$STRING`",
            "req": True,
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "livedns_tsig_key",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/livedns/axfr/tsig",
                "segments": [
                  {
                    "lit": "livedns",
                  },
                  {
                    "lit": "axfr",
                  },
                  {
                    "lit": "tsig",
                  },
                ],
                "parts": [
                  "livedns",
                  "axfr",
                  "tsig",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "sharing_id",
                      "orig": "sharing_id",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/livedns/axfr/tsig",
                "segments": [
                  {
                    "lit": "livedns",
                  },
                  {
                    "lit": "axfr",
                  },
                  {
                    "lit": "tsig",
                  },
                ],
                "parts": [
                  "livedns",
                  "axfr",
                  "tsig",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "sharing_id",
                      "orig": "sharing_id",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/livedns/axfr/tsig/{id}/config/{software}",
                "segments": [
                  {
                    "lit": "livedns",
                  },
                  {
                    "lit": "axfr",
                  },
                  {
                    "lit": "tsig",
                  },
                  {
                    "var": "id",
                  },
                  {
                    "lit": "config",
                  },
                  {
                    "var": "software",
                  },
                ],
                "parts": [
                  "livedns",
                  "axfr",
                  "tsig",
                  "{id}",
                  "config",
                  "{software}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "software",
                      "orig": "software",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "sharing_id",
                      "orig": "sharing_id",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "$action": "config",
                  "exist": [
                    "id",
                    "software",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/livedns/axfr/tsig/{id}",
                "segments": [
                  {
                    "lit": "livedns",
                  },
                  {
                    "lit": "axfr",
                  },
                  {
                    "lit": "tsig",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "livedns",
                  "axfr",
                  "tsig",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "sharing_id",
                      "orig": "sharing_id",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "livedns_zone": {
        "fields": [
          {
            "name": "items",
            "title": "Items",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "message",
            "title": "Message",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "remove_apex_ns",
            "title": "Remove Apex Ns",
            "type": "`$BOOLEAN`",
          },
        ],
        "name": "livedns_zone",
        "op": {
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/livedns/domains/{fqdn}/records",
                "segments": [
                  {
                    "lit": "livedns",
                  },
                  {
                    "lit": "domains",
                  },
                  {
                    "var": "fqdn",
                  },
                  {
                    "lit": "records",
                  },
                ],
                "parts": [
                  "livedns",
                  "domains",
                  "{fqdn}",
                  "records",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "fqdn",
                      "orig": "fqdn",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "fqdn",
                  ],
                },
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "kind": "http",
                "method": "PUT",
                "orig": "/livedns/domains/{fqdn}/records",
                "segments": [
                  {
                    "lit": "livedns",
                  },
                  {
                    "lit": "domains",
                  },
                  {
                    "var": "fqdn",
                  },
                  {
                    "lit": "records",
                  },
                ],
                "parts": [
                  "livedns",
                  "domains",
                  "{fqdn}",
                  "records",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "fqdn",
                      "orig": "fqdn",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "fqdn",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.domain",
            ],
          ],
        },
      },
      "mailbox": {
        "fields": [
          {
            "name": "address",
            "title": "Address",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "aliases",
            "title": "Aliases",
            "type": "`$ARRAY`",
          },
          {
            "name": "antispam",
            "title": "Antispam",
            "type": "`$BOOLEAN`",
            "req": True,
            "op": {
              "update": {
                "type": "`$BOOLEAN`",
              },
            },
          },
          {
            "name": "autorenew",
            "title": "Autorenew",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "config",
            "title": "Config",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "config_name",
            "title": "Config Name",
            "type": "`$STRING`",
            "req": True,
            "op": {
              "update": {
                "type": "`$STRING`",
              },
            },
          },
          {
            "name": "created_at",
            "title": "Created At",
            "type": "`$STRING`",
            "req": True,
            "format": "date-time",
          },
          {
            "name": "data_access",
            "title": "Data Access",
            "type": "`$BOOLEAN`",
            "req": True,
          },
          {
            "name": "domain_part",
            "title": "Domain Part",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "duration_month",
            "title": "Duration Month",
            "type": "`$INTEGER`",
          },
          {
            "name": "email",
            "title": "Email",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "expires_at",
            "title": "Expires At",
            "type": "`$STRING`",
            "req": True,
            "format": "date-time",
          },
          {
            "name": "internal_domain",
            "title": "Internal Domain",
            "type": "`$BOOLEAN`",
            "req": True,
          },
          {
            "name": "issues",
            "title": "Issues",
            "type": "`$ARRAY`",
          },
          {
            "name": "last_paid_duration",
            "title": "Last Paid Duration",
            "type": "`$INTEGER`",
            "req": True,
          },
          {
            "name": "local_part",
            "title": "Local Part",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "message",
            "title": "Message",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "owner",
            "title": "Owner",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "password",
            "title": "Password",
            "type": "`$STRING`",
            "req": True,
            "op": {
              "update": {
                "type": "`$STRING`",
              },
            },
          },
          {
            "name": "quota",
            "title": "Quota",
            "type": "`$INTEGER`",
            "req": True,
          },
          {
            "name": "quota_used",
            "title": "Quota Used",
            "type": "`$INTEGER`",
            "req": True,
          },
          {
            "name": "responder",
            "title": "Responder",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "updated_at",
            "title": "Updated At",
            "type": "`$STRING`",
            "req": True,
            "format": "date-time",
          },
          {
            "name": "uuid",
            "title": "Uuid",
            "type": "`$STRING`",
            "req": True,
          },
        ],
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
                    "lit": "mailbox",
                  },
                  {
                    "lit": "mailboxes",
                  },
                  {
                    "var": "address",
                  },
                  {
                    "lit": "renew",
                  },
                ],
                "parts": [
                  "mailbox",
                  "mailboxes",
                  "{address}",
                  "renew",
                ],
                "rename": {
                  "param": {
                    "email": "address",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "header": [
                    {
                      "name": "dry_run",
                      "orig": "Dry-Run",
                      "type": "`$INTEGER`",
                      "kind": "header",
                    },
                  ],
                  "params": [
                    {
                      "name": "address",
                      "orig": "email",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "sharing_id",
                      "orig": "sharing_id",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "$action": "renew",
                  "exist": [
                    "address",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "POST",
                "orig": "/mailbox/mailboxes",
                "segments": [
                  {
                    "lit": "mailbox",
                  },
                  {
                    "lit": "mailboxes",
                  },
                ],
                "parts": [
                  "mailbox",
                  "mailboxes",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "sharing_id",
                      "orig": "sharing_id",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/mailbox/mailboxes",
                "segments": [
                  {
                    "lit": "mailbox",
                  },
                  {
                    "lit": "mailboxes",
                  },
                ],
                "parts": [
                  "mailbox",
                  "mailboxes",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "address",
                      "orig": "address",
                      "type": "`$STRING`",
                      "kind": "query",
                      "field": True,
                    },
                    {
                      "name": "domain_part",
                      "orig": "domain_part",
                      "type": "`$STRING`",
                      "kind": "query",
                      "field": True,
                    },
                    {
                      "name": "local_part",
                      "orig": "local_part",
                      "type": "`$STRING`",
                      "kind": "query",
                      "field": True,
                    },
                    {
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 1,
                    },
                    {
                      "name": "per_page",
                      "orig": "per_page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "search",
                      "orig": "search",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "sharing_id",
                      "orig": "sharing_id",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "sort_by",
                      "orig": "sort_by",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "id",
                    },
                  ],
                },
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/mailbox/mailboxes/{email}",
                "segments": [
                  {
                    "lit": "mailbox",
                  },
                  {
                    "lit": "mailboxes",
                  },
                  {
                    "var": "address",
                  },
                ],
                "parts": [
                  "mailbox",
                  "mailboxes",
                  "{address}",
                ],
                "rename": {
                  "param": {
                    "email": "address",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "address",
                      "orig": "email",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "sharing_id",
                      "orig": "sharing_id",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "address",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
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
                    "lit": "mailbox",
                  },
                  {
                    "lit": "mailboxes",
                  },
                  {
                    "var": "address",
                  },
                ],
                "parts": [
                  "mailbox",
                  "mailboxes",
                  "{address}",
                ],
                "rename": {
                  "param": {
                    "email": "address",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "address",
                      "orig": "email",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "sharing_id",
                      "orig": "sharing_id",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "address",
                  ],
                },
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "kind": "http",
                "method": "PATCH",
                "orig": "/mailbox/mailboxes/{email}",
                "segments": [
                  {
                    "lit": "mailbox",
                  },
                  {
                    "lit": "mailboxes",
                  },
                  {
                    "var": "address",
                  },
                ],
                "parts": [
                  "mailbox",
                  "mailboxes",
                  "{address}",
                ],
                "rename": {
                  "param": {
                    "email": "address",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "address",
                      "orig": "email",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "address",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "mailbox_domain": {
        "fields": [
          {
            "name": "antispam",
            "title": "Antispam",
            "type": "`$BOOLEAN`",
            "req": True,
          },
          {
            "name": "configuration",
            "title": "Configuration",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "date_last_validation",
            "title": "Date Last Validation",
            "type": "`$STRING`",
            "format": "date-time",
          },
          {
            "name": "dkim",
            "title": "Dkim",
            "type": "`$BOOLEAN`",
            "req": True,
          },
          {
            "name": "fqdns",
            "title": "Fqdns",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "internal",
            "title": "Internal",
            "type": "`$BOOLEAN`",
            "req": True,
          },
          {
            "name": "is_livedns",
            "title": "Is Livedns",
            "type": "`$BOOLEAN`",
            "req": True,
          },
          {
            "name": "mx",
            "title": "Mx",
            "type": "`$BOOLEAN`",
            "req": True,
          },
          {
            "name": "owner",
            "title": "Owner",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "spf",
            "title": "Spf",
            "type": "`$BOOLEAN`",
            "req": True,
          },
          {
            "name": "txt",
            "title": "Txt",
            "type": "`$BOOLEAN`",
            "req": True,
          },
        ],
        "name": "mailbox_domain",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/mailbox/domains/{domain}/validate",
                "segments": [
                  {
                    "lit": "mailbox",
                  },
                  {
                    "lit": "domains",
                  },
                  {
                    "var": "domain",
                  },
                  {
                    "lit": "validate",
                  },
                ],
                "parts": [
                  "mailbox",
                  "domains",
                  "{domain}",
                  "validate",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "domain",
                      "orig": "domain",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "$action": "validate",
                  "exist": [
                    "domain",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
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
                    "lit": "mailbox",
                  },
                  {
                    "lit": "domains",
                  },
                ],
                "parts": [
                  "mailbox",
                  "domains",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 1,
                    },
                    {
                      "name": "per_page",
                      "orig": "per_page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
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
                    "lit": "mailbox",
                  },
                  {
                    "lit": "domains",
                  },
                  {
                    "var": "domain",
                  },
                ],
                "parts": [
                  "mailbox",
                  "domains",
                  "{domain}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "domain",
                      "orig": "domain",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "domain",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.domain",
            ],
          ],
        },
      },
      "mailbox_forward": {
        "fields": [
          {
            "name": "destinations",
            "title": "Destinations",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "message",
            "title": "Message",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "source",
            "title": "Source",
            "type": "`$STRING`",
            "req": True,
          },
        ],
        "name": "mailbox_forward",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/mailbox/forwards",
                "segments": [
                  {
                    "lit": "mailbox",
                  },
                  {
                    "lit": "forwards",
                  },
                ],
                "parts": [
                  "mailbox",
                  "forwards",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/mailbox/forwards",
                "segments": [
                  {
                    "lit": "mailbox",
                  },
                  {
                    "lit": "forwards",
                  },
                ],
                "parts": [
                  "mailbox",
                  "forwards",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 1,
                    },
                    {
                      "name": "per_page",
                      "orig": "per_page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "search",
                      "orig": "search",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "sharing_id",
                      "orig": "sharing_id",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "sort_by",
                      "orig": "sort_by",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "source",
                    },
                  ],
                },
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/mailbox/forwards/{source}",
                "segments": [
                  {
                    "lit": "mailbox",
                  },
                  {
                    "lit": "forwards",
                  },
                  {
                    "var": "source",
                  },
                ],
                "parts": [
                  "mailbox",
                  "forwards",
                  "{source}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "source",
                      "orig": "source",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "source",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
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
                    "lit": "mailbox",
                  },
                  {
                    "lit": "forwards",
                  },
                  {
                    "var": "source",
                  },
                ],
                "parts": [
                  "mailbox",
                  "forwards",
                  "{source}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "source",
                      "orig": "source",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "source",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "mailbox_product": {
        "fields": [
          {
            "name": "autorenew",
            "title": "Autorenew",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "config",
            "title": "Config",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "config_name",
            "title": "Config Name",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "description",
            "title": "Description",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "duration_month",
            "title": "Duration Month",
            "type": "`$INTEGER`",
            "req": True,
          },
          {
            "name": "label",
            "title": "Label",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "message",
            "title": "Message",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "prices",
            "title": "Prices",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "quantity",
            "title": "Quantity",
            "type": "`$INTEGER`",
            "req": True,
          },
          {
            "name": "taxes",
            "title": "Taxes",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "uuid",
            "title": "Uuid",
            "type": "`$STRING`",
            "req": True,
          },
        ],
        "name": "mailbox_product",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/mailbox/products",
                "segments": [
                  {
                    "lit": "mailbox",
                  },
                  {
                    "lit": "products",
                  },
                ],
                "parts": [
                  "mailbox",
                  "products",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "sharing_id",
                      "orig": "sharing_id",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/mailbox/products",
                "segments": [
                  {
                    "lit": "mailbox",
                  },
                  {
                    "lit": "products",
                  },
                ],
                "parts": [
                  "mailbox",
                  "products",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "sharing_id",
                      "orig": "sharing_id",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "mailbox_quota": {
        "fields": [
          {
            "name": "annually",
            "title": "Annually",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "config_name",
            "title": "Config Name",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "label",
            "title": "Label",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "monthly",
            "title": "Monthly",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "quota",
            "title": "Quota",
            "type": "`$STRING`",
            "req": True,
          },
        ],
        "name": "mailbox_quota",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/mailbox/quotas",
                "segments": [
                  {
                    "lit": "mailbox",
                  },
                  {
                    "lit": "quotas",
                  },
                ],
                "parts": [
                  "mailbox",
                  "quotas",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "sharing_id",
                      "orig": "sharing_id",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "mailbox_slot": {
        "fields": [
          {
            "name": "autorenew",
            "title": "Autorenew",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "config",
            "title": "Config",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "expires_at",
            "title": "Expires At",
            "type": "`$STRING`",
            "format": "date-time",
          },
          {
            "name": "last_paid_duration",
            "title": "Last Paid Duration",
            "type": "`$INTEGER`",
          },
          {
            "name": "refund_info",
            "title": "Refund Info",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "refundable",
            "title": "Refundable",
            "type": "`$BOOLEAN`",
            "req": True,
          },
          {
            "name": "uuid",
            "title": "Uuid",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "webhosting_pack",
            "title": "Webhosting Pack",
            "type": "`$BOOLEAN`",
            "req": True,
          },
        ],
        "name": "mailbox_slot",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/mailbox/slots",
                "segments": [
                  {
                    "lit": "mailbox",
                  },
                  {
                    "lit": "slots",
                  },
                ],
                "parts": [
                  "mailbox",
                  "slots",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "config_name",
                      "orig": "config_name",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "expires_at_gte",
                      "orig": "expires_at_gte",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "expires_at_lte",
                      "orig": "expires_at_lte",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "last_paid_duration",
                      "orig": "last_paid_duration",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "field": True,
                    },
                    {
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 1,
                    },
                    {
                      "name": "per_page",
                      "orig": "per_page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "refundable",
                      "orig": "refundable",
                      "type": "`$STRING`",
                      "kind": "query",
                      "field": True,
                    },
                    {
                      "name": "sharing_id",
                      "orig": "sharing_id",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "sort_by",
                      "orig": "sort_by",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "refund_expires_at",
                    },
                    {
                      "name": "webhosting_pack",
                      "orig": "webhosting_pack",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                      "field": True,
                    },
                  ],
                },
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/mailbox/slots/{slot_id}",
                "segments": [
                  {
                    "lit": "mailbox",
                  },
                  {
                    "lit": "slots",
                  },
                  {
                    "var": "uuid",
                  },
                ],
                "parts": [
                  "mailbox",
                  "slots",
                  "{uuid}",
                ],
                "rename": {
                  "param": {
                    "slot_id": "uuid",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "uuid",
                      "orig": "slot_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "uuid",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "organization": {
        "fields": [
          {
            "name": "city",
            "title": "City",
            "type": "`$STRING`",
            "req": True,
            "op": {
              "update": {
                "type": "`$STRING`",
              },
            },
          },
          {
            "name": "corporate",
            "title": "Corporate",
            "type": "`$BOOLEAN`",
            "req": True,
            "op": {
              "list": {
                "type": "`$BOOLEAN`",
              },
            },
          },
          {
            "name": "country",
            "title": "Country",
            "type": "`$STRING`",
            "req": True,
            "op": {
              "create": {
                "type": "`$STRING`",
              },
              "update": {
                "type": "`$STRING`",
              },
            },
          },
          {
            "name": "email",
            "title": "Email",
            "type": "`$STRING`",
            "req": True,
            "op": {
              "list": {
                "type": "`$STRING`",
              },
              "update": {
                "type": "`$STRING`",
              },
            },
          },
          {
            "name": "fax",
            "title": "Fax",
            "type": "`$STRING`",
          },
          {
            "name": "firstname",
            "title": "Firstname",
            "type": "`$STRING`",
            "req": True,
            "op": {
              "list": {
                "type": "`$STRING`",
              },
              "update": {
                "type": "`$STRING`",
              },
            },
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "lang",
            "title": "Lang",
            "type": "`$STRING`",
          },
          {
            "name": "lastname",
            "title": "Lastname",
            "type": "`$STRING`",
            "req": True,
            "op": {
              "list": {
                "type": "`$STRING`",
              },
              "update": {
                "type": "`$STRING`",
              },
            },
          },
          {
            "name": "message",
            "title": "Message",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "req": True,
            "op": {
              "update": {
                "type": "`$STRING`",
              },
            },
          },
          {
            "name": "orgname",
            "title": "Orgname",
            "type": "`$STRING`",
            "op": {
              "create": {
                "req": True,
                "type": "`$STRING`",
              },
            },
          },
          {
            "name": "phone",
            "title": "Phone",
            "type": "`$STRING`",
            "op": {
              "create": {
                "req": True,
                "type": "`$STRING`",
              },
            },
          },
          {
            "name": "reference",
            "title": "Reference",
            "type": "`$STRING`",
          },
          {
            "name": "reseller",
            "title": "Reseller",
            "type": "`$BOOLEAN`",
            "req": True,
            "op": {
              "create": {
                "type": "`$BOOLEAN`",
              },
              "list": {
                "type": "`$BOOLEAN`",
              },
              "update": {
                "type": "`$BOOLEAN`",
              },
            },
          },
          {
            "name": "siren",
            "title": "Siren",
            "type": "`$STRING`",
          },
          {
            "name": "state",
            "title": "State",
            "type": "`$STRING`",
          },
          {
            "name": "streetaddr",
            "title": "Streetaddr",
            "type": "`$STRING`",
            "req": True,
            "op": {
              "update": {
                "type": "`$STRING`",
              },
            },
          },
          {
            "name": "streetaddr2",
            "title": "Streetaddr2",
            "type": "`$STRING`",
          },
          {
            "name": "type",
            "title": "Type",
            "type": "`$STRING`",
            "req": True,
            "op": {
              "list": {
                "type": "`$STRING`",
              },
            },
          },
          {
            "name": "vat_number",
            "title": "Vat Number",
            "type": "`$STRING`",
          },
          {
            "name": "zip",
            "title": "Zip",
            "type": "`$STRING`",
            "req": True,
            "op": {
              "create": {
                "type": "`$STRING`",
              },
              "update": {
                "type": "`$STRING`",
              },
            },
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
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
                    "lit": "organization",
                  },
                  {
                    "lit": "organizations",
                  },
                  {
                    "var": "id",
                  },
                  {
                    "lit": "action",
                  },
                ],
                "parts": [
                  "organization",
                  "organizations",
                  "{id}",
                  "action",
                ],
                "rename": {
                  "param": {
                    "org_id": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "org_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "$action": "action",
                  "exist": [
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "POST",
                "orig": "/organization/organizations",
                "segments": [
                  {
                    "lit": "organization",
                  },
                  {
                    "lit": "organizations",
                  },
                ],
                "parts": [
                  "organization",
                  "organizations",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/organization/organizations",
                "segments": [
                  {
                    "lit": "organization",
                  },
                  {
                    "lit": "organizations",
                  },
                ],
                "parts": [
                  "organization",
                  "organizations",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "name",
                      "orig": "name",
                      "type": "`$STRING`",
                      "kind": "query",
                      "field": True,
                    },
                    {
                      "name": "permission",
                      "orig": "permission",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "sort_by",
                      "orig": "sort_by",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "name",
                    },
                    {
                      "name": "type",
                      "orig": "type",
                      "type": "`$STRING`",
                      "kind": "query",
                      "field": True,
                    },
                    {
                      "name": "~name",
                      "orig": "~name",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/organization/organizations/{org_id}",
                "segments": [
                  {
                    "lit": "organization",
                  },
                  {
                    "lit": "organizations",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "organization",
                  "organizations",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "org_id": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "org_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/organization/organizations/{org_id}",
                "segments": [
                  {
                    "lit": "organization",
                  },
                  {
                    "lit": "organizations",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "organization",
                  "organizations",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "org_id": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "org_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "kind": "http",
                "method": "PATCH",
                "orig": "/organization/organizations/{org_id}",
                "segments": [
                  {
                    "lit": "organization",
                  },
                  {
                    "lit": "organizations",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "organization",
                  "organizations",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "org_id": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "org_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "organization_customer": {
        "fields": [
          {
            "name": "city",
            "title": "City",
            "type": "`$STRING`",
            "req": True,
            "op": {
              "update": {
                "type": "`$STRING`",
              },
            },
          },
          {
            "name": "country",
            "title": "Country",
            "type": "`$STRING`",
            "req": True,
            "op": {
              "update": {
                "type": "`$STRING`",
              },
            },
          },
          {
            "name": "email",
            "title": "Email",
            "type": "`$STRING`",
            "req": True,
            "op": {
              "update": {
                "type": "`$STRING`",
              },
            },
          },
          {
            "name": "fax",
            "title": "Fax",
            "type": "`$STRING`",
          },
          {
            "name": "firstname",
            "title": "Firstname",
            "type": "`$STRING`",
            "req": True,
            "op": {
              "update": {
                "type": "`$STRING`",
              },
            },
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "lang",
            "title": "Lang",
            "type": "`$STRING`",
          },
          {
            "name": "lastname",
            "title": "Lastname",
            "type": "`$STRING`",
            "req": True,
            "op": {
              "update": {
                "type": "`$STRING`",
              },
            },
          },
          {
            "name": "message",
            "title": "Message",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "orgname",
            "title": "Orgname",
            "type": "`$STRING`",
          },
          {
            "name": "phone",
            "title": "Phone",
            "type": "`$STRING`",
            "op": {
              "create": {
                "req": True,
                "type": "`$STRING`",
              },
            },
          },
          {
            "name": "reference",
            "title": "Reference",
            "type": "`$STRING`",
          },
          {
            "name": "siren",
            "title": "Siren",
            "type": "`$STRING`",
          },
          {
            "name": "state",
            "title": "State",
            "type": "`$STRING`",
          },
          {
            "name": "streetaddr",
            "title": "Streetaddr",
            "type": "`$STRING`",
            "req": True,
            "op": {
              "update": {
                "type": "`$STRING`",
              },
            },
          },
          {
            "name": "streetaddr2",
            "title": "Streetaddr2",
            "type": "`$STRING`",
          },
          {
            "name": "sync_contact_email",
            "title": "Sync Contact Email",
            "type": "`$STRING`",
          },
          {
            "name": "type",
            "title": "Type",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "vat_number",
            "title": "Vat Number",
            "type": "`$STRING`",
          },
          {
            "name": "zip",
            "title": "Zip",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "organization_customer",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/organization/organizations/{org_id}/customers",
                "segments": [
                  {
                    "lit": "organization",
                  },
                  {
                    "lit": "organizations",
                  },
                  {
                    "var": "org_id",
                  },
                  {
                    "lit": "customers",
                  },
                ],
                "parts": [
                  "organization",
                  "organizations",
                  "{org_id}",
                  "customers",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "org_id",
                      "orig": "org_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "org_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
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
                    "lit": "organization",
                  },
                  {
                    "lit": "organizations",
                  },
                  {
                    "var": "org_id",
                  },
                  {
                    "lit": "customers",
                  },
                ],
                "parts": [
                  "organization",
                  "organizations",
                  "{org_id}",
                  "customers",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "org_id",
                      "orig": "org_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "name",
                      "orig": "name",
                      "type": "`$STRING`",
                      "kind": "query",
                      "field": True,
                    },
                    {
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 1,
                    },
                    {
                      "name": "per_page",
                      "orig": "per_page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "permission",
                      "orig": "permission",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "sort_by",
                      "orig": "sort_by",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "name",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "org_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
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
                    "lit": "organization",
                  },
                  {
                    "lit": "organizations",
                  },
                  {
                    "var": "org_id",
                  },
                  {
                    "lit": "customers",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "organization",
                  "organizations",
                  "{org_id}",
                  "customers",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "org_id",
                      "orig": "org_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                    "org_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
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
                    "lit": "organization",
                  },
                  {
                    "lit": "organizations",
                  },
                  {
                    "var": "org_id",
                  },
                  {
                    "lit": "customers",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "organization",
                  "organizations",
                  "{org_id}",
                  "customers",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "org_id",
                      "orig": "org_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                    "org_id",
                  ],
                },
              },
            ],
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
                    "lit": "organization",
                  },
                  {
                    "lit": "organizations",
                  },
                  {
                    "var": "org_id",
                  },
                  {
                    "lit": "customers",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "organization",
                  "organizations",
                  "{org_id}",
                  "customers",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "org_id",
                      "orig": "org_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                    "org_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.organization",
            ],
          ],
        },
      },
      "template": {
        "fields": [
          {
            "name": "description",
            "title": "Description",
            "type": "`$STRING`",
            "req": True,
            "op": {
              "create": {
                "type": "`$STRING`",
              },
              "update": {
                "type": "`$STRING`",
              },
            },
          },
          {
            "name": "editable",
            "title": "Editable",
            "type": "`$BOOLEAN`",
            "req": True,
          },
          {
            "name": "href",
            "title": "Href",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "req": True,
            "op": {
              "update": {
                "type": "`$STRING`",
              },
            },
          },
          {
            "name": "namespaces",
            "title": "Namespaces",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "orgname",
            "title": "Orgname",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "payload",
            "title": "Payload",
            "type": "`$OBJECT`",
            "req": True,
            "op": {
              "update": {
                "type": "`$OBJECT`",
              },
            },
          },
          {
            "name": "sharing_space",
            "title": "Sharing Space",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "variables",
            "title": "Variables",
            "type": "`$ARRAY`",
            "req": True,
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
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
                "orig": "/template/templates",
                "segments": [
                  {
                    "lit": "template",
                  },
                  {
                    "lit": "templates",
                  },
                ],
                "parts": [
                  "template",
                  "templates",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "sharing_id",
                      "orig": "sharing_id",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
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
                    "lit": "template",
                  },
                  {
                    "lit": "templates",
                  },
                ],
                "parts": [
                  "template",
                  "templates",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 1,
                    },
                    {
                      "name": "per_page",
                      "orig": "per_page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/template/templates/{id}",
                "segments": [
                  {
                    "lit": "template",
                  },
                  {
                    "lit": "templates",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "template",
                  "templates",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
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
                    "lit": "template",
                  },
                  {
                    "lit": "templates",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "template",
                  "templates",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
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
                    "lit": "template",
                  },
                  {
                    "lit": "templates",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "template",
                  "templates",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "template_dispatch": {
        "fields": [
          {
            "name": "attempt",
            "title": "Attempt",
            "type": "`$INTEGER`",
            "req": True,
          },
          {
            "name": "created_at",
            "title": "Created At",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "dispatch_href",
            "title": "Dispatch Href",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "message",
            "title": "Message",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "object_id",
            "title": "Object Id",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "object_type",
            "title": "Object Type",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "payload",
            "title": "Payload",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "sharing_id",
            "title": "Sharing Id",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "state",
            "title": "State",
            "type": "`$INTEGER`",
            "req": True,
          },
          {
            "name": "state_msg",
            "title": "State Msg",
            "type": "`$STRING`",
          },
          {
            "name": "target",
            "title": "Target",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "target_id",
            "title": "Target Id",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "target_type",
            "title": "Target Type",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "task_history",
            "title": "Task History",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "task_status",
            "title": "Task Status",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "task_updated_at",
            "title": "Task Updated At",
            "type": "`$STRING`",
          },
          {
            "name": "template_id",
            "title": "Template Id",
            "type": "`$STRING`",
          },
          {
            "name": "template_name",
            "title": "Template Name",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "template_dispatch",
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
                    "lit": "template",
                  },
                  {
                    "lit": "templates",
                  },
                  {
                    "var": "template_id",
                  },
                ],
                "parts": [
                  "template",
                  "templates",
                  "{template_id}",
                ],
                "rename": {
                  "param": {
                    "id": "template_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "template_id",
                      "orig": "id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "template_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
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
                    "lit": "template",
                  },
                  {
                    "lit": "dispatch",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "template",
                  "dispatch",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.template",
            ],
          ],
        },
      },
      "tld": {
        "fields": [
          {
            "name": "authinfo_for_transfer",
            "title": "Authinfo For Transfer",
            "type": "`$BOOLEAN`",
            "req": True,
          },
          {
            "name": "category",
            "title": "Category",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "change_owner",
            "title": "Change Owner",
            "type": "`$BOOLEAN`",
            "req": True,
          },
          {
            "name": "corporate",
            "title": "Corporate",
            "type": "`$BOOLEAN`",
            "req": True,
          },
          {
            "name": "ext_trade",
            "title": "Ext Trade",
            "type": "`$BOOLEAN`",
            "req": True,
          },
          {
            "name": "full_tld",
            "title": "Full Tld",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "href",
            "title": "Href",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "lock",
            "title": "Lock",
            "type": "`$BOOLEAN`",
            "req": True,
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "req": True,
          },
        ],
        "name": "tld",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/domain/tlds",
                "segments": [
                  {
                    "lit": "domain",
                  },
                  {
                    "lit": "tlds",
                  },
                ],
                "parts": [
                  "domain",
                  "tlds",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "category",
                      "orig": "category",
                      "type": "`$STRING`",
                      "kind": "query",
                      "field": True,
                    },
                    {
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 1,
                    },
                    {
                      "name": "per_page",
                      "orig": "per_page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/domain/tlds/{name}",
                "segments": [
                  {
                    "lit": "domain",
                  },
                  {
                    "lit": "tlds",
                  },
                  {
                    "var": "name",
                  },
                ],
                "parts": [
                  "domain",
                  "tlds",
                  "{name}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "name",
                      "orig": "name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "name",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "user": {
        "fields": [
          {
            "name": "city",
            "title": "City",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "country",
            "title": "Country",
            "type": "`$STRING`",
          },
          {
            "name": "email",
            "title": "Email",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "fax",
            "title": "Fax",
            "type": "`$STRING`",
          },
          {
            "name": "firstname",
            "title": "Firstname",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "lang",
            "title": "Lang",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "lastname",
            "title": "Lastname",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "phone",
            "title": "Phone",
            "type": "`$STRING`",
          },
          {
            "name": "state",
            "title": "State",
            "type": "`$STRING`",
          },
          {
            "name": "streetaddr",
            "title": "Streetaddr",
            "type": "`$STRING`",
          },
          {
            "name": "streetaddr2",
            "title": "Streetaddr2",
            "type": "`$STRING`",
          },
          {
            "name": "username",
            "title": "Username",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "zip",
            "title": "Zip",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "user",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/organization/user-info",
                "segments": [
                  {
                    "lit": "organization",
                  },
                  {
                    "lit": "user-info",
                  },
                ],
                "parts": [
                  "organization",
                  "user-info",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
