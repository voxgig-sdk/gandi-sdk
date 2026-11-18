package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Gandi",
			"slug": "gandi",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"debug": map[string]any{
				"options": map[string]any{
					"active": false,
					"max": 100,
					"redact": []any{
						"authorization",
						"cookie",
						"set-cookie",
						"api-key",
						"apikey",
						"x-api-key",
						"idempotency-key",
					},
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"onEntry": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "none",
			},
			"idempotency": map[string]any{
				"options": map[string]any{
					"active": false,
					"header": "Idempotency-Key",
					"methods": []any{
						"POST",
						"PUT",
						"PATCH",
						"DELETE",
					},
					"ops": []any{
						"create",
						"update",
						"remove",
					},
				},
				"optspec": map[string]any{
					"keygen": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "none",
			},
			"metrics": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "none",
			},
			"paging": map[string]any{
				"options": map[string]any{
					"active": false,
					"afterVar": "after",
					"cursorParam": "cursor",
					"firstVar": "first",
					"limitParam": "limit",
					"pageParam": "page",
					"startPage": 1,
				},
				"optspec": map[string]any{
					"limit": "`$NUMBER`",
					"ops": "`$LIST`",
				},
				"strict": false,
				"transport": "none",
			},
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"secrets": map[string]any{
				"options": map[string]any{
					"active": false,
					"cache": true,
					"exchange": map[string]any{
						"active": false,
						"method": "POST",
						"path": "auth/token",
						"refresh": "",
						"request": "refresh_token",
						"response": "access_token",
						"retries": 1,
						"statuses": []any{
							401,
						},
					},
					"name": "apikey",
					"providers": []any{},
				},
				"optspec": map[string]any{},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"now": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://api.gandi.net/v5",
			"auth": map[string]any{
				"prefix": "Bearer",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"access_token": map[string]any{},
				"acme_account": map[string]any{},
				"acme_domain": map[string]any{},
				"acme_price": map[string]any{},
				"acme_subscription": map[string]any{},
				"billing_info": map[string]any{},
				"billing_price": map[string]any{},
				"certificate_dcv": map[string]any{},
				"certificate_package": map[string]any{},
				"certificate_pem": map[string]any{},
				"certificate_renewal": map[string]any{},
				"certificate_tag": map[string]any{},
				"comment": map[string]any{},
				"domain": map[string]any{},
				"domain_availability": map[string]any{},
				"domain_change_owner": map[string]any{},
				"domain_claim": map[string]any{},
				"domain_contact": map[string]any{},
				"domain_dnskey": map[string]any{},
				"domain_dnssec": map[string]any{},
				"domain_host": map[string]any{},
				"domain_livedns": map[string]any{},
				"domain_nameserver": map[string]any{},
				"domain_tag": map[string]any{},
				"domain_transfer": map[string]any{},
				"domain_webredir": map[string]any{},
				"email_forward": map[string]any{},
				"email_mailbox": map[string]any{},
				"email_migration": map[string]any{},
				"email_offer": map[string]any{},
				"email_slot": map[string]any{},
				"hosting_application": map[string]any{},
				"hosting_instance": map[string]any{},
				"hosting_vhost": map[string]any{},
				"issued_certificate": map[string]any{},
				"linked_zone": map[string]any{},
				"linked_zone_deployment": map[string]any{},
				"linked_zone_domain": map[string]any{},
				"linked_zone_task": map[string]any{},
				"livedns_axfr_slave": map[string]any{},
				"livedns_axfr_tsig": map[string]any{},
				"livedns_domain": map[string]any{},
				"livedns_key": map[string]any{},
				"livedns_nameserver": map[string]any{},
				"livedns_record": map[string]any{},
				"livedns_rrtype": map[string]any{},
				"livedns_snapshot": map[string]any{},
				"livedns_tsig_key": map[string]any{},
				"livedns_zone": map[string]any{},
				"mailbox": map[string]any{},
				"mailbox_domain": map[string]any{},
				"mailbox_forward": map[string]any{},
				"mailbox_product": map[string]any{},
				"mailbox_quota": map[string]any{},
				"mailbox_slot": map[string]any{},
				"organization": map[string]any{},
				"organization_customer": map[string]any{},
				"template": map[string]any{},
				"template_dispatch": map[string]any{},
				"tld": map[string]any{},
				"user": map[string]any{},
			},
		},
		"entity": map[string]any{
			"access_token": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "access_token",
						"title": "Access Token",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "entities",
						"title": "Entities",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "expires_at",
						"title": "Expires At",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
						},
						"format": "date-time",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
						},
					},
					map[string]any{
						"name": "scopes",
						"title": "Scopes",
						"type": "`$ARRAY`",
						"req": true,
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "access_token",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/organization/access-tokens",
								"segments": []any{
									map[string]any{
										"lit": "organization",
									},
									map[string]any{
										"lit": "access-tokens",
									},
								},
								"parts": []any{
									"organization",
									"access-tokens",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"acme_account": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "created_at",
						"title": "Created At",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "deleted_at",
						"title": "Deleted At",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "external_id",
						"title": "External Id",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "ip",
						"title": "Ip",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "last_activity",
						"title": "Last Activity",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "subscription_id",
						"title": "Subscription Id",
						"type": "`$STRING`",
						"req": true,
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "acme_account",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/acme/subscriptions/{subscription_id}/accounts",
								"segments": []any{
									map[string]any{
										"lit": "acme",
									},
									map[string]any{
										"lit": "subscriptions",
									},
									map[string]any{
										"var": "subscription_id",
									},
									map[string]any{
										"lit": "accounts",
									},
								},
								"parts": []any{
									"acme",
									"subscriptions",
									"{subscription_id}",
									"accounts",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "subscription_id",
											"orig": "subscription_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "sharing_id",
											"orig": "sharing_id",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"sharing_id",
										"subscription_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/acme/subscriptions/{subscription_id}/accounts/{account_id}",
								"segments": []any{
									map[string]any{
										"lit": "acme",
									},
									map[string]any{
										"lit": "subscriptions",
									},
									map[string]any{
										"var": "subscription_id",
									},
									map[string]any{
										"lit": "accounts",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"acme",
									"subscriptions",
									"{subscription_id}",
									"accounts",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"account_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "account_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "subscription_id",
											"orig": "subscription_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "sharing_id",
											"orig": "sharing_id",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"sharing_id",
										"subscription_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"acme_domain": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "created_at",
						"title": "Created At",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "deleted_at",
						"title": "Deleted At",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "hostname",
						"title": "Hostname",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "hostname_ulabel",
						"title": "Hostname Ulabel",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "is_wildcard",
						"title": "Is Wildcard",
						"type": "`$BOOLEAN`",
						"req": true,
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "subscription_id",
						"title": "Subscription Id",
						"type": "`$STRING`",
						"req": true,
					},
				},
				"name": "acme_domain",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/acme/subscriptions/{subscription_id}/domains",
								"segments": []any{
									map[string]any{
										"lit": "acme",
									},
									map[string]any{
										"lit": "subscriptions",
									},
									map[string]any{
										"var": "subscription_id",
									},
									map[string]any{
										"lit": "domains",
									},
								},
								"parts": []any{
									"acme",
									"subscriptions",
									"{subscription_id}",
									"domains",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "subscription_id",
											"orig": "subscription_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "domain",
											"orig": "domain",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "sharing_id",
											"orig": "sharing_id",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"domain",
										"sharing_id",
										"subscription_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/acme/subscriptions/{subscription_id}/domains/{domain_id}",
								"segments": []any{
									map[string]any{
										"lit": "acme",
									},
									map[string]any{
										"lit": "subscriptions",
									},
									map[string]any{
										"var": "subscription_id",
									},
									map[string]any{
										"lit": "domains",
									},
									map[string]any{
										"var": "domain_id",
									},
								},
								"parts": []any{
									"acme",
									"subscriptions",
									"{subscription_id}",
									"domains",
									"{domain_id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "domain_id",
											"orig": "domain_id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "subscription_id",
											"orig": "subscription_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "sharing_id",
											"orig": "sharing_id",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"domain_id",
										"sharing_id",
										"subscription_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.domain",
						},
					},
				},
			},
			"acme_price": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "country",
						"title": "Country",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "currency",
						"title": "Currency",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "domains",
						"title": "Domains",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "duration",
						"title": "Duration",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "duration_unit",
						"title": "Duration Unit",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "grid",
						"title": "Grid",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "max_duration",
						"title": "Max Duration",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "min_duration",
						"title": "Min Duration",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "price_after_taxes",
						"title": "Price After Taxes",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "price_before_taxes",
						"title": "Price Before Taxes",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "process",
						"title": "Process",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "product",
						"title": "Product",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "provider",
						"title": "Provider",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "tax_rate",
						"title": "Tax Rate",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "taxes",
						"title": "Taxes",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "validation_type",
						"title": "Validation Type",
						"type": "`$STRING`",
						"req": true,
					},
				},
				"name": "acme_price",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/acme/quote",
								"segments": []any{
									map[string]any{
										"lit": "acme",
									},
									map[string]any{
										"lit": "quote",
									},
								},
								"parts": []any{
									"acme",
									"quote",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "sharing_id",
											"orig": "sharing_id",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"sharing_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/acme/catalog",
								"segments": []any{
									map[string]any{
										"lit": "acme",
									},
									map[string]any{
										"lit": "catalog",
									},
								},
								"parts": []any{
									"acme",
									"catalog",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "country",
											"orig": "country",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"field": true,
										},
										map[string]any{
											"name": "currency",
											"orig": "currency",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"field": true,
										},
										map[string]any{
											"name": "duration",
											"orig": "duration",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"field": true,
										},
										map[string]any{
											"name": "grid",
											"orig": "grid",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"field": true,
										},
										map[string]any{
											"name": "process",
											"orig": "process",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"field": true,
										},
										map[string]any{
											"name": "provider",
											"orig": "provider",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"field": true,
										},
										map[string]any{
											"name": "sharing_id",
											"orig": "sharing_id",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "validation_type",
											"orig": "validation_type",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"field": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"country",
										"currency",
										"duration",
										"grid",
										"process",
										"provider",
										"sharing_id",
										"validation_type",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"acme_subscription": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "country",
						"title": "Country",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "created_at",
						"title": "Created At",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "currency",
						"title": "Currency",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "domains",
						"title": "Domains",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "duration",
						"title": "Duration",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "eab_hmac",
						"title": "Eab Hmac",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "eab_id",
						"title": "Eab Id",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "ends_at",
						"title": "Ends At",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "grid",
						"title": "Grid",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "message",
						"title": "Message",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "provider",
						"title": "Provider",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "server_url",
						"title": "Server Url",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "subscription_id",
						"title": "Subscription Id",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "validation_type",
						"title": "Validation Type",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "years",
						"title": "Years",
						"type": "`$STRING`",
						"req": true,
					},
				},
				"name": "acme_subscription",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/acme/subscriptions",
								"segments": []any{
									map[string]any{
										"lit": "acme",
									},
									map[string]any{
										"lit": "subscriptions",
									},
								},
								"parts": []any{
									"acme",
									"subscriptions",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "sharing_id",
											"orig": "sharing_id",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"sharing_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/acme/subscriptions",
								"segments": []any{
									map[string]any{
										"lit": "acme",
									},
									map[string]any{
										"lit": "subscriptions",
									},
								},
								"parts": []any{
									"acme",
									"subscriptions",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "created_at",
											"orig": "created_at",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"field": true,
										},
										map[string]any{
											"name": "ends_at",
											"orig": "ends_at",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"field": true,
										},
										map[string]any{
											"name": "name",
											"orig": "name",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"field": true,
										},
										map[string]any{
											"name": "provider",
											"orig": "provider",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"field": true,
										},
										map[string]any{
											"name": "sharing_id",
											"orig": "sharing_id",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "status",
											"orig": "status",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"field": true,
										},
										map[string]any{
											"name": "validation_type",
											"orig": "validation_type",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"field": true,
										},
										map[string]any{
											"name": "year",
											"orig": "years",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"created_at",
										"ends_at",
										"name",
										"provider",
										"sharing_id",
										"status",
										"validation_type",
										"year",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/acme/subscriptions/{subscription_id}",
								"segments": []any{
									map[string]any{
										"lit": "acme",
									},
									map[string]any{
										"lit": "subscriptions",
									},
									map[string]any{
										"var": "subscription_id",
									},
								},
								"parts": []any{
									"acme",
									"subscriptions",
									"{subscription_id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "subscription_id",
											"orig": "subscription_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "sharing_id",
											"orig": "sharing_id",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"sharing_id",
										"subscription_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/acme/subscriptions/{subscription_id}",
								"segments": []any{
									map[string]any{
										"lit": "acme",
									},
									map[string]any{
										"lit": "subscriptions",
									},
									map[string]any{
										"var": "subscription_id",
									},
								},
								"parts": []any{
									"acme",
									"subscriptions",
									"{subscription_id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "subscription_id",
											"orig": "subscription_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "sharing_id",
											"orig": "sharing_id",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"sharing_id",
										"subscription_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PATCH",
								"orig": "/acme/subscriptions/{subscription_id}",
								"segments": []any{
									map[string]any{
										"lit": "acme",
									},
									map[string]any{
										"lit": "subscriptions",
									},
									map[string]any{
										"var": "subscription_id",
									},
								},
								"parts": []any{
									"acme",
									"subscriptions",
									"{subscription_id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "subscription_id",
											"orig": "subscription_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "sharing_id",
											"orig": "sharing_id",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"sharing_id",
										"subscription_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "PATCH",
								"orig": "/acme/subscriptions/{subscription_id}/domains",
								"segments": []any{
									map[string]any{
										"lit": "acme",
									},
									map[string]any{
										"lit": "subscriptions",
									},
									map[string]any{
										"var": "subscription_id",
									},
									map[string]any{
										"lit": "domains",
									},
								},
								"parts": []any{
									"acme",
									"subscriptions",
									"{subscription_id}",
									"domains",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "subscription_id",
											"orig": "subscription_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "sharing_id",
											"orig": "sharing_id",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "domains",
									"exist": []any{
										"sharing_id",
										"subscription_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"billing_info": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "annual_balance",
						"title": "Annual Balance",
						"type": "`$NUMBER`",
						"req": true,
					},
					map[string]any{
						"name": "grid",
						"title": "Grid",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "outstanding_amount",
						"title": "Outstanding Amount",
						"type": "`$NUMBER`",
						"req": true,
					},
					map[string]any{
						"name": "prepaid",
						"title": "Prepaid",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "prepaid_monthly_invoice",
						"title": "Prepaid Monthly Invoice",
						"type": "`$BOOLEAN`",
					},
				},
				"name": "billing_info",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/billing/info/{sharing_id}",
								"segments": []any{
									map[string]any{
										"lit": "billing",
									},
									map[string]any{
										"lit": "info",
									},
									map[string]any{
										"var": "sharing_id",
									},
								},
								"parts": []any{
									"billing",
									"info",
									"{sharing_id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "sharing_id",
											"orig": "sharing_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"sharing_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/billing/info",
								"segments": []any{
									map[string]any{
										"lit": "billing",
									},
									map[string]any{
										"lit": "info",
									},
								},
								"parts": []any{
									"billing",
									"info",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"billing_price": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "currency",
						"title": "Currency",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "grid",
						"title": "Grid",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "products",
						"title": "Products",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "taxes",
						"title": "Taxes",
						"type": "`$ARRAY`",
						"req": true,
					},
				},
				"name": "billing_price",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/billing/price/{type}",
								"segments": []any{
									map[string]any{
										"lit": "billing",
									},
									map[string]any{
										"lit": "price",
									},
									map[string]any{
										"var": "type",
									},
								},
								"parts": []any{
									"billing",
									"price",
									"{type}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "type",
											"orig": "type",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "active_phase",
											"orig": "active_phase",
											"type": "`$BOOLEAN`",
											"kind": "query",
										},
										map[string]any{
											"name": "country",
											"orig": "country",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "currency",
											"orig": "currency",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "discount",
											"orig": "discounts",
											"type": "`$ARRAY`",
											"kind": "query",
										},
										map[string]any{
											"name": "duration_unit",
											"orig": "duration_unit",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "extension",
											"orig": "extension",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "feature",
											"orig": "features",
											"type": "`$BOOLEAN`",
											"kind": "query",
										},
										map[string]any{
											"name": "grid",
											"orig": "grid",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "lang",
											"orig": "lang",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "max_duration",
											"orig": "max_duration",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "name",
											"orig": "name",
											"type": "`$ARRAY`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
										map[string]any{
											"name": "per_page",
											"orig": "per_page",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "prices_at",
											"orig": "prices_at",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "process",
											"orig": "processes",
											"type": "`$ARRAY`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "sharing_id",
											"orig": "sharing_id",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"name",
										"process",
										"type",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"certificate_dcv": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "message",
						"title": "Message",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "method",
						"title": "Method",
						"type": "`$STRING`",
						"req": true,
					},
				},
				"name": "certificate_dcv",
				"op": map[string]any{
					"patch": map[string]any{
						"input": "data",
						"name": "patch",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PATCH",
								"orig": "/certificate/issued-certs/{id}/dcv",
								"segments": []any{
									map[string]any{
										"lit": "certificate",
									},
									map[string]any{
										"lit": "issued-certs",
									},
									map[string]any{
										"var": "certificate_id",
									},
									map[string]any{
										"lit": "dcv",
									},
								},
								"parts": []any{
									"certificate",
									"issued-certs",
									"{certificate_id}",
									"dcv",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"id": "certificate_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "certificate_id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "sharing_id",
											"orig": "sharing_id",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"certificate_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PUT",
								"orig": "/certificate/issued-certs/{id}/dcv",
								"segments": []any{
									map[string]any{
										"lit": "certificate",
									},
									map[string]any{
										"lit": "issued-certs",
									},
									map[string]any{
										"var": "certificate_id",
									},
									map[string]any{
										"lit": "dcv",
									},
								},
								"parts": []any{
									"certificate",
									"issued-certs",
									"{certificate_id}",
									"dcv",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"id": "certificate_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "certificate_id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "sharing_id",
											"orig": "sharing_id",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"certificate_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"certificate_package": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "category",
						"title": "Category",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "href",
						"title": "Href",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "max_domains",
						"title": "Max Domains",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "min_domains",
						"title": "Min Domains",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "provider",
						"title": "Provider",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "sgc",
						"title": "Sgc",
						"type": "`$BOOLEAN`",
						"req": true,
					},
					map[string]any{
						"name": "trustlogo",
						"title": "Trustlogo",
						"type": "`$BOOLEAN`",
						"req": true,
					},
					map[string]any{
						"name": "warranty",
						"title": "Warranty",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "wildcard",
						"title": "Wildcard",
						"type": "`$BOOLEAN`",
						"req": true,
					},
				},
				"name": "certificate_package",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/certificate/packages",
								"segments": []any{
									map[string]any{
										"lit": "certificate",
									},
									map[string]any{
										"lit": "packages",
									},
								},
								"parts": []any{
									"certificate",
									"packages",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "category",
											"orig": "category",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "max_domain",
											"orig": "max_domains",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "min_domain",
											"orig": "min_domains",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
										map[string]any{
											"name": "per_page",
											"orig": "per_page",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "trustlogo",
											"orig": "trustlogo",
											"type": "`$BOOLEAN`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "warranty",
											"orig": "warranty",
											"type": "`$INTEGER`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "wildcard",
											"orig": "wildcard",
											"type": "`$BOOLEAN`",
											"kind": "query",
											"field": true,
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/certificate/packages/{name}",
								"segments": []any{
									map[string]any{
										"lit": "certificate",
									},
									map[string]any{
										"lit": "packages",
									},
									map[string]any{
										"var": "name",
									},
								},
								"parts": []any{
									"certificate",
									"packages",
									"{name}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "name",
											"orig": "name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"name",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"certificate_pem": map[string]any{
				"fields": []any{},
				"name": "certificate_pem",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/certificate/pem/-/{filename}",
								"segments": []any{
									map[string]any{
										"lit": "certificate",
									},
									map[string]any{
										"lit": "pem",
									},
									map[string]any{
										"lit": "-",
									},
									map[string]any{
										"var": "filename",
									},
								},
								"parts": []any{
									"certificate",
									"pem",
									"-",
									"{filename}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "filename",
											"orig": "filename",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"filename",
									},
								},
								"response": map[string]any{
									"kind": "raw",
									"media": "text/plain",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/certificate/pem/{type}",
								"segments": []any{
									map[string]any{
										"lit": "certificate",
									},
									map[string]any{
										"lit": "pem",
									},
									map[string]any{
										"var": "type",
									},
								},
								"parts": []any{
									"certificate",
									"pem",
									"{type}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "type",
											"orig": "type",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "provider",
											"orig": "provider",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"type",
									},
								},
								"response": map[string]any{
									"kind": "raw",
									"media": "text/plain",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"certificate_renewal": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "csr",
						"title": "Csr",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "dcv_method",
						"title": "Dcv Method",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "duration",
						"title": "Duration",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "errors",
						"title": "Errors",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
						"req": true,
					},
				},
				"name": "certificate_renewal",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/certificate/issued-certs/{id}",
								"segments": []any{
									map[string]any{
										"lit": "certificate",
									},
									map[string]any{
										"lit": "issued-certs",
									},
									map[string]any{
										"var": "certificate_id",
									},
								},
								"parts": []any{
									"certificate",
									"issued-certs",
									"{certificate_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"id": "certificate_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"name": "dry_run",
											"orig": "Dry-Run",
											"type": "`$INTEGER`",
											"kind": "header",
										},
									},
									"params": []any{
										map[string]any{
											"name": "certificate_id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "sharing_id",
											"orig": "sharing_id",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"certificate_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"certificate_tag": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "add",
						"title": "Add",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "message",
						"title": "Message",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "remove",
						"title": "Remove",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "tag",
						"title": "Tag",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "tags",
						"title": "Tags",
						"type": "`$ARRAY`",
						"req": true,
					},
				},
				"name": "certificate_tag",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/certificate/issued-certs/{id}/tags",
								"segments": []any{
									map[string]any{
										"lit": "certificate",
									},
									map[string]any{
										"lit": "issued-certs",
									},
									map[string]any{
										"var": "certificate_id",
									},
									map[string]any{
										"lit": "tags",
									},
								},
								"parts": []any{
									"certificate",
									"issued-certs",
									"{certificate_id}",
									"tags",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"id": "certificate_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "certificate_id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"certificate_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/certificate/issued-certs/{id}/tags",
								"segments": []any{
									map[string]any{
										"lit": "certificate",
									},
									map[string]any{
										"lit": "issued-certs",
									},
									map[string]any{
										"var": "certificate_id",
									},
									map[string]any{
										"lit": "tags",
									},
								},
								"parts": []any{
									"certificate",
									"issued-certs",
									"{certificate_id}",
									"tags",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"id": "certificate_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "certificate_id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"certificate_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"patch": map[string]any{
						"input": "data",
						"name": "patch",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PATCH",
								"orig": "/certificate/issued-certs/{id}/tags",
								"segments": []any{
									map[string]any{
										"lit": "certificate",
									},
									map[string]any{
										"lit": "issued-certs",
									},
									map[string]any{
										"var": "certificate_id",
									},
									map[string]any{
										"lit": "tags",
									},
								},
								"parts": []any{
									"certificate",
									"issued-certs",
									"{certificate_id}",
									"tags",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"id": "certificate_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "certificate_id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"certificate_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/certificate/issued-certs/{id}/tags",
								"segments": []any{
									map[string]any{
										"lit": "certificate",
									},
									map[string]any{
										"lit": "issued-certs",
									},
									map[string]any{
										"var": "certificate_id",
									},
									map[string]any{
										"lit": "tags",
									},
								},
								"parts": []any{
									"certificate",
									"issued-certs",
									"{certificate_id}",
									"tags",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"id": "certificate_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "certificate_id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"certificate_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PUT",
								"orig": "/certificate/issued-certs/{id}/tags",
								"segments": []any{
									map[string]any{
										"lit": "certificate",
									},
									map[string]any{
										"lit": "issued-certs",
									},
									map[string]any{
										"var": "certificate_id",
									},
									map[string]any{
										"lit": "tags",
									},
								},
								"parts": []any{
									"certificate",
									"issued-certs",
									"{certificate_id}",
									"tags",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"id": "certificate_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "certificate_id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"certificate_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"comment": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "content",
						"title": "Content",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "created_at",
						"title": "Created At",
						"type": "`$STRING`",
						"format": "date-time",
					},
					map[string]any{
						"name": "errors",
						"title": "Errors",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "updated_at",
						"title": "Updated At",
						"type": "`$STRING`",
						"format": "date-time",
					},
					map[string]any{
						"name": "user",
						"title": "User",
						"type": "`$OBJECT`",
						"req": true,
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "comment",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/comment/comments/{id}",
								"segments": []any{
									map[string]any{
										"lit": "comment",
									},
									map[string]any{
										"lit": "comments",
									},
									map[string]any{
										"var": "entity_id",
									},
								},
								"parts": []any{
									"comment",
									"comments",
									"{entity_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"id": "entity_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"name": "dry_run",
											"orig": "Dry-Run",
											"type": "`$INTEGER`",
											"kind": "header",
										},
									},
									"params": []any{
										map[string]any{
											"name": "entity_id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"entity_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/comment/comments/{id}",
								"segments": []any{
									map[string]any{
										"lit": "comment",
									},
									map[string]any{
										"lit": "comments",
									},
									map[string]any{
										"var": "entity_id",
									},
								},
								"parts": []any{
									"comment",
									"comments",
									"{entity_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"id": "entity_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "entity_id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"entity_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/comment/comments/{id}",
								"segments": []any{
									map[string]any{
										"lit": "comment",
									},
									map[string]any{
										"lit": "comments",
									},
									map[string]any{
										"var": "entity_id",
									},
								},
								"parts": []any{
									"comment",
									"comments",
									"{entity_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"id": "entity_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "entity_id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"entity_id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"domain": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "admin",
						"title": "Admin",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "authinfo",
						"title": "Authinfo",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "autorenew",
						"title": "Autorenew",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "bill",
						"title": "Bill",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "can_tld_lock",
						"title": "Can Tld Lock",
						"type": "`$BOOLEAN`",
						"req": true,
					},
					map[string]any{
						"name": "claims",
						"title": "Claims",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "contacts",
						"title": "Contacts",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "currency",
						"title": "Currency",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "dates",
						"title": "Dates",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "domain_owner",
						"title": "Domain Owner",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "duration",
						"title": "Duration",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "enforce_premium",
						"title": "Enforce Premium",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "errors",
						"title": "Errors",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "extra_parameters",
						"title": "Extra Parameters",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "fqdn",
						"title": "Fqdn",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "fqdn_unicode",
						"title": "Fqdn Unicode",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "href",
						"title": "Href",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"op": map[string]any{
							"list": map[string]any{
								"req": true,
								"type": "`$STRING`",
							},
						},
					},
					map[string]any{
						"name": "lang",
						"title": "Lang",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "mailbox_optin",
						"title": "Mailbox Optin",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "nameserver",
						"title": "Nameserver",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "nameservers",
						"title": "Nameservers",
						"type": "`$ARRAY`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$ARRAY`",
							},
						},
					},
					map[string]any{
						"name": "nameservers_ips",
						"title": "Nameservers Ips",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "orga_owner",
						"title": "Orga Owner",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "owner",
						"title": "Owner",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "price",
						"title": "Price",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "reachability",
						"title": "Reachability",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "resellee_id",
						"title": "Resellee Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "services",
						"title": "Services",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "sharing_id",
						"title": "Sharing Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "sharing_space",
						"title": "Sharing Space",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "smd",
						"title": "Smd",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "tags",
						"title": "Tags",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "tech",
						"title": "Tech",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "template_id",
						"title": "Template Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "tld",
						"title": "Tld",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "tld_period",
						"title": "Tld Period",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "trustee_roles",
						"title": "Trustee Roles",
						"type": "`$ARRAY`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "domain",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/domain/domains/{domain}/renew",
								"segments": []any{
									map[string]any{
										"lit": "domain",
									},
									map[string]any{
										"lit": "domains",
									},
									map[string]any{
										"var": "fqdn",
									},
									map[string]any{
										"lit": "renew",
									},
								},
								"parts": []any{
									"domain",
									"domains",
									"{fqdn}",
									"renew",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"domain": "fqdn",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"name": "dry_run",
											"orig": "Dry-Run",
											"type": "`$INTEGER`",
											"kind": "header",
										},
									},
									"params": []any{
										map[string]any{
											"name": "fqdn",
											"orig": "domain",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "sharing_id",
											"orig": "sharing_id",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"$action": "renew",
									"exist": []any{
										"fqdn",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/domain/domains/{domain}/restore",
								"segments": []any{
									map[string]any{
										"lit": "domain",
									},
									map[string]any{
										"lit": "domains",
									},
									map[string]any{
										"var": "fqdn",
									},
									map[string]any{
										"lit": "restore",
									},
								},
								"parts": []any{
									"domain",
									"domains",
									"{fqdn}",
									"restore",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"domain": "fqdn",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "fqdn",
											"orig": "domain",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "sharing_id",
											"orig": "sharing_id",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"$action": "restore",
									"exist": []any{
										"fqdn",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/domain/domains/{domain}/transferout",
								"segments": []any{
									map[string]any{
										"lit": "domain",
									},
									map[string]any{
										"lit": "domains",
									},
									map[string]any{
										"var": "fqdn",
									},
									map[string]any{
										"lit": "transferout",
									},
								},
								"parts": []any{
									"domain",
									"domains",
									"{fqdn}",
									"transferout",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"domain": "fqdn",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "fqdn",
											"orig": "domain",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "transferout",
									"exist": []any{
										"fqdn",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/domain/domains",
								"segments": []any{
									map[string]any{
										"lit": "domain",
									},
									map[string]any{
										"lit": "domains",
									},
								},
								"parts": []any{
									"domain",
									"domains",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"name": "dry_run",
											"orig": "Dry-Run",
											"type": "`$INTEGER`",
											"kind": "header",
										},
									},
									"query": []any{
										map[string]any{
											"name": "sharing_id",
											"orig": "sharing_id",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/domain/domains",
								"segments": []any{
									map[string]any{
										"lit": "domain",
									},
									map[string]any{
										"lit": "domains",
									},
								},
								"parts": []any{
									"domain",
									"domains",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "fqdn",
											"orig": "fqdn",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "nameserver",
											"orig": "nameserver",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
										map[string]any{
											"name": "per_page",
											"orig": "per_page",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "resellee_id",
											"orig": "resellee_id",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "sharing_id",
											"orig": "sharing_id",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "sort_by",
											"orig": "sort_by",
											"type": "`$STRING`",
											"kind": "query",
											"example": "fqdn",
										},
										map[string]any{
											"name": "tld",
											"orig": "tld",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/domain/domains/{domain}",
								"segments": []any{
									map[string]any{
										"lit": "domain",
									},
									map[string]any{
										"lit": "domains",
									},
									map[string]any{
										"var": "fqdn",
									},
								},
								"parts": []any{
									"domain",
									"domains",
									"{fqdn}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"domain": "fqdn",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "fqdn",
											"orig": "domain",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"fqdn",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/domain/domains/{domain}/createstatus",
								"segments": []any{
									map[string]any{
										"lit": "domain",
									},
									map[string]any{
										"lit": "domains",
									},
									map[string]any{
										"var": "fqdn",
									},
									map[string]any{
										"lit": "createstatus",
									},
								},
								"parts": []any{
									"domain",
									"domains",
									"{fqdn}",
									"createstatus",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"domain": "fqdn",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "fqdn",
											"orig": "domain",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "createstatus",
									"exist": []any{
										"fqdn",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/domain/domains/{domain}/renew",
								"segments": []any{
									map[string]any{
										"lit": "domain",
									},
									map[string]any{
										"lit": "domains",
									},
									map[string]any{
										"var": "fqdn",
									},
									map[string]any{
										"lit": "renew",
									},
								},
								"parts": []any{
									"domain",
									"domains",
									"{fqdn}",
									"renew",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"domain": "fqdn",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "fqdn",
											"orig": "domain",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "renew",
									"exist": []any{
										"fqdn",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/domain/domains/{domain}/restore",
								"segments": []any{
									map[string]any{
										"lit": "domain",
									},
									map[string]any{
										"lit": "domains",
									},
									map[string]any{
										"var": "fqdn",
									},
									map[string]any{
										"lit": "restore",
									},
								},
								"parts": []any{
									"domain",
									"domains",
									"{fqdn}",
									"restore",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"domain": "fqdn",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "fqdn",
											"orig": "domain",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "restore",
									"exist": []any{
										"fqdn",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/domain/domains/{domain}",
								"segments": []any{
									map[string]any{
										"lit": "domain",
									},
									map[string]any{
										"lit": "domains",
									},
									map[string]any{
										"var": "fqdn",
									},
								},
								"parts": []any{
									"domain",
									"domains",
									"{fqdn}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"domain": "fqdn",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "fqdn",
											"orig": "domain",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"fqdn",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PUT",
								"orig": "/domain/domains/{domain}/authinfo",
								"segments": []any{
									map[string]any{
										"lit": "domain",
									},
									map[string]any{
										"lit": "domains",
									},
									map[string]any{
										"var": "fqdn",
									},
									map[string]any{
										"lit": "authinfo",
									},
								},
								"parts": []any{
									"domain",
									"domains",
									"{fqdn}",
									"authinfo",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"domain": "fqdn",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "fqdn",
											"orig": "domain",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "authinfo",
									"exist": []any{
										"fqdn",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "PATCH",
								"orig": "/domain/domains/{domain}/autorenew",
								"segments": []any{
									map[string]any{
										"lit": "domain",
									},
									map[string]any{
										"lit": "domains",
									},
									map[string]any{
										"var": "fqdn",
									},
									map[string]any{
										"lit": "autorenew",
									},
								},
								"parts": []any{
									"domain",
									"domains",
									"{fqdn}",
									"autorenew",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"domain": "fqdn",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "fqdn",
											"orig": "domain",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "autorenew",
									"exist": []any{
										"fqdn",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "PATCH",
								"orig": "/domain/domains/{domain}/reachability",
								"segments": []any{
									map[string]any{
										"lit": "domain",
									},
									map[string]any{
										"lit": "domains",
									},
									map[string]any{
										"var": "fqdn",
									},
									map[string]any{
										"lit": "reachability",
									},
								},
								"parts": []any{
									"domain",
									"domains",
									"{fqdn}",
									"reachability",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"domain": "fqdn",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "fqdn",
											"orig": "domain",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "reachability",
									"exist": []any{
										"fqdn",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "PATCH",
								"orig": "/domain/domains/{domain}/status",
								"segments": []any{
									map[string]any{
										"lit": "domain",
									},
									map[string]any{
										"lit": "domains",
									},
									map[string]any{
										"var": "fqdn",
									},
									map[string]any{
										"lit": "status",
									},
								},
								"parts": []any{
									"domain",
									"domains",
									"{fqdn}",
									"status",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"domain": "fqdn",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "fqdn",
											"orig": "domain",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "status",
									"exist": []any{
										"fqdn",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"domain_availability": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "currency",
						"title": "Currency",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "grid",
						"title": "Grid",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "products",
						"title": "Products",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "taxes",
						"title": "Taxes",
						"type": "`$ARRAY`",
						"req": true,
					},
				},
				"name": "domain_availability",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/domain/check",
								"segments": []any{
									map[string]any{
										"lit": "domain",
									},
									map[string]any{
										"lit": "check",
									},
								},
								"parts": []any{
									"domain",
									"check",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "country",
											"orig": "country",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "currency",
											"orig": "currency",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "duration_unit",
											"orig": "duration_unit",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "extension",
											"orig": "extension",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "grid",
											"orig": "grid",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "lang",
											"orig": "lang",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "max_duration",
											"orig": "max_duration",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "name",
											"orig": "name",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "period",
											"orig": "period",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "process",
											"orig": "processes",
											"type": "`$ARRAY`",
											"kind": "query",
											"example": []any{
												"create",
											},
										},
										map[string]any{
											"name": "sharing_id",
											"orig": "sharing_id",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"name",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"domain_change_owner": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "admin",
						"title": "Admin",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "bill",
						"title": "Bill",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "created_at",
						"title": "Created At",
						"type": "`$STRING`",
						"req": true,
						"format": "date-time",
					},
					map[string]any{
						"name": "date_start",
						"title": "Date Start",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "errors",
						"title": "Errors",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "errortype",
						"title": "Errortype",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "errortype_label",
						"title": "Errortype Label",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "foa",
						"title": "Foa",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "inner_step",
						"title": "Inner Step",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "owner",
						"title": "Owner",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "params",
						"title": "Params",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "step",
						"title": "Step",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "step_nb",
						"title": "Step Nb",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "tech",
						"title": "Tech",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "updated_at",
						"title": "Updated At",
						"type": "`$STRING`",
						"req": true,
						"format": "date-time",
					},
				},
				"name": "domain_change_owner",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/domain/changeowner/{domain}",
								"segments": []any{
									map[string]any{
										"lit": "domain",
									},
									map[string]any{
										"lit": "changeowner",
									},
									map[string]any{
										"var": "domain",
									},
								},
								"parts": []any{
									"domain",
									"changeowner",
									"{domain}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"name": "dry_run",
											"orig": "Dry-Run",
											"type": "`$INTEGER`",
											"kind": "header",
										},
									},
									"params": []any{
										map[string]any{
											"name": "domain",
											"orig": "domain",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "sharing_id",
											"orig": "sharing_id",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"domain",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/domain/changeowner/{domain}/foa",
								"segments": []any{
									map[string]any{
										"lit": "domain",
									},
									map[string]any{
										"lit": "changeowner",
									},
									map[string]any{
										"var": "domain",
									},
									map[string]any{
										"lit": "foa",
									},
								},
								"parts": []any{
									"domain",
									"changeowner",
									"{domain}",
									"foa",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "domain",
											"orig": "domain",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "foa",
									"exist": []any{
										"domain",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/domain/changeowner/{domain}",
								"segments": []any{
									map[string]any{
										"lit": "domain",
									},
									map[string]any{
										"lit": "changeowner",
									},
									map[string]any{
										"var": "domain",
									},
								},
								"parts": []any{
									"domain",
									"changeowner",
									"{domain}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "domain",
											"orig": "domain",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "sharing_id",
											"orig": "sharing_id",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"domain",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"domain_claim": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "claims",
						"title": "Claims",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "created_at",
						"title": "Created At",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "expires_at",
						"title": "Expires At",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "fqdn",
						"title": "Fqdn",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "fqdn_alabel",
						"title": "Fqdn Alabel",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "fqdn_ulabel",
						"title": "Fqdn Ulabel",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "notice_id",
						"title": "Notice Id",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
						"req": true,
					},
				},
				"name": "domain_claim",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/domain/domains/{domain}/claims",
								"segments": []any{
									map[string]any{
										"lit": "domain",
									},
									map[string]any{
										"lit": "domains",
									},
									map[string]any{
										"var": "domain",
									},
									map[string]any{
										"lit": "claims",
									},
								},
								"parts": []any{
									"domain",
									"domains",
									"{domain}",
									"claims",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "domain",
											"orig": "domain",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"domain",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/domain/domains/{domain}/claims",
								"segments": []any{
									map[string]any{
										"lit": "domain",
									},
									map[string]any{
										"lit": "domains",
									},
									map[string]any{
										"var": "domain",
									},
									map[string]any{
										"lit": "claims",
									},
								},
								"parts": []any{
									"domain",
									"domains",
									"{domain}",
									"claims",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "domain",
											"orig": "domain",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"domain",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.domain",
						},
					},
				},
			},
			"domain_contact": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "admin",
						"title": "Admin",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "bill",
						"title": "Bill",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "message",
						"title": "Message",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "owner",
						"title": "Owner",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "tech",
						"title": "Tech",
						"type": "`$OBJECT`",
						"req": true,
					},
				},
				"name": "domain_contact",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/domain/domains/{domain}/contacts",
								"segments": []any{
									map[string]any{
										"lit": "domain",
									},
									map[string]any{
										"lit": "domains",
									},
									map[string]any{
										"var": "domain",
									},
									map[string]any{
										"lit": "contacts",
									},
								},
								"parts": []any{
									"domain",
									"domains",
									"{domain}",
									"contacts",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "domain",
											"orig": "domain",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"domain",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PATCH",
								"orig": "/domain/domains/{domain}/contacts",
								"segments": []any{
									map[string]any{
										"lit": "domain",
									},
									map[string]any{
										"lit": "domains",
									},
									map[string]any{
										"var": "domain",
									},
									map[string]any{
										"lit": "contacts",
									},
								},
								"parts": []any{
									"domain",
									"domains",
									"{domain}",
									"contacts",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "domain",
											"orig": "domain",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"domain",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "PUT",
								"orig": "/domain/domains/{domain}/contacts/owner",
								"segments": []any{
									map[string]any{
										"lit": "domain",
									},
									map[string]any{
										"lit": "domains",
									},
									map[string]any{
										"var": "domain",
									},
									map[string]any{
										"lit": "contacts",
									},
									map[string]any{
										"lit": "owner",
									},
								},
								"parts": []any{
									"domain",
									"domains",
									"{domain}",
									"contacts",
									"owner",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"name": "dry_run",
											"orig": "Dry-Run",
											"type": "`$INTEGER`",
											"kind": "header",
										},
									},
									"params": []any{
										map[string]any{
											"name": "domain",
											"orig": "domain",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "owner",
									"exist": []any{
										"domain",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.domain",
						},
					},
				},
			},
			"domain_dnskey": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "algorithm",
						"title": "Algorithm",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "digest",
						"title": "Digest",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "digest_type",
						"title": "Digest Type",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "href",
						"title": "Href",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "keys",
						"title": "Keys",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "keytag",
						"title": "Keytag",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "message",
						"title": "Message",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "public_key",
						"title": "Public Key",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"list": map[string]any{
								"type": "`$STRING`",
							},
						},
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$STRING`",
						"req": true,
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "domain_dnskey",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/domain/domains/{domain}/dnskeys",
								"segments": []any{
									map[string]any{
										"lit": "domain",
									},
									map[string]any{
										"lit": "domains",
									},
									map[string]any{
										"var": "domain",
									},
									map[string]any{
										"lit": "dnskeys",
									},
								},
								"parts": []any{
									"domain",
									"domains",
									"{domain}",
									"dnskeys",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "domain",
											"orig": "domain",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"domain",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/domain/domains/{domain}/dnskeys",
								"segments": []any{
									map[string]any{
										"lit": "domain",
									},
									map[string]any{
										"lit": "domains",
									},
									map[string]any{
										"var": "domain",
									},
									map[string]any{
										"lit": "dnskeys",
									},
								},
								"parts": []any{
									"domain",
									"domains",
									"{domain}",
									"dnskeys",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "domain",
											"orig": "domain",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
										map[string]any{
											"name": "per_page",
											"orig": "per_page",
											"type": "`$INTEGER`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"domain",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/domain/domains/{domain}/dnskeys/{id}",
								"segments": []any{
									map[string]any{
										"lit": "domain",
									},
									map[string]any{
										"lit": "domains",
									},
									map[string]any{
										"var": "domain",
									},
									map[string]any{
										"lit": "dnskeys",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"domain",
									"domains",
									"{domain}",
									"dnskeys",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "domain",
											"orig": "domain",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"domain",
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PUT",
								"orig": "/domain/domains/{domain}/dnskeys",
								"segments": []any{
									map[string]any{
										"lit": "domain",
									},
									map[string]any{
										"lit": "domains",
									},
									map[string]any{
										"var": "domain",
									},
									map[string]any{
										"lit": "dnskeys",
									},
								},
								"parts": []any{
									"domain",
									"domains",
									"{domain}",
									"dnskeys",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "domain",
											"orig": "domain",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"domain",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.domain",
						},
					},
				},
			},
			"domain_dnssec": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "error",
						"title": "Error",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "state",
						"title": "State",
						"type": "`$STRING`",
						"req": true,
					},
				},
				"name": "domain_dnssec",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/domain/domains/{domain}/livedns/dnssec",
								"segments": []any{
									map[string]any{
										"lit": "domain",
									},
									map[string]any{
										"lit": "domains",
									},
									map[string]any{
										"var": "domain",
									},
									map[string]any{
										"lit": "livedns",
									},
									map[string]any{
										"lit": "dnssec",
									},
								},
								"parts": []any{
									"domain",
									"domains",
									"{domain}",
									"livedns",
									"dnssec",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "domain",
											"orig": "domain",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "sharing_id",
											"orig": "sharing_id",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"domain",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/domain/domains/{domain}/livedns/dnssec",
								"segments": []any{
									map[string]any{
										"lit": "domain",
									},
									map[string]any{
										"lit": "domains",
									},
									map[string]any{
										"var": "domain",
									},
									map[string]any{
										"lit": "livedns",
									},
									map[string]any{
										"lit": "dnssec",
									},
								},
								"parts": []any{
									"domain",
									"domains",
									"{domain}",
									"livedns",
									"dnssec",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "domain",
											"orig": "domain",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"domain",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/domain/domains/{domain}/livedns/dnssec",
								"segments": []any{
									map[string]any{
										"lit": "domain",
									},
									map[string]any{
										"lit": "domains",
									},
									map[string]any{
										"var": "domain",
									},
									map[string]any{
										"lit": "livedns",
									},
									map[string]any{
										"lit": "dnssec",
									},
								},
								"parts": []any{
									"domain",
									"domains",
									"{domain}",
									"livedns",
									"dnssec",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "domain",
											"orig": "domain",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "sharing_id",
											"orig": "sharing_id",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"domain",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.domain",
						},
					},
				},
			},
			"domain_host": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "fqdn",
						"title": "Fqdn",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "fqdn_unicode",
						"title": "Fqdn Unicode",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "href",
						"title": "Href",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "ips",
						"title": "Ips",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "message",
						"title": "Message",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
					},
				},
				"name": "domain_host",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/domain/domains/{domain}/hosts",
								"segments": []any{
									map[string]any{
										"lit": "domain",
									},
									map[string]any{
										"lit": "domains",
									},
									map[string]any{
										"var": "domain",
									},
									map[string]any{
										"lit": "hosts",
									},
								},
								"parts": []any{
									"domain",
									"domains",
									"{domain}",
									"hosts",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "domain",
											"orig": "domain",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
										map[string]any{
											"name": "per_page",
											"orig": "per_page",
											"type": "`$INTEGER`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"domain",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/domain/domains/{domain}/hosts",
								"segments": []any{
									map[string]any{
										"lit": "domain",
									},
									map[string]any{
										"lit": "domains",
									},
									map[string]any{
										"var": "domain",
									},
									map[string]any{
										"lit": "hosts",
									},
								},
								"parts": []any{
									"domain",
									"domains",
									"{domain}",
									"hosts",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "domain",
											"orig": "domain",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
										map[string]any{
											"name": "per_page",
											"orig": "per_page",
											"type": "`$INTEGER`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"domain",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/domain/domains/{domain}/hosts/{name}",
								"segments": []any{
									map[string]any{
										"lit": "domain",
									},
									map[string]any{
										"lit": "domains",
									},
									map[string]any{
										"var": "domain",
									},
									map[string]any{
										"lit": "hosts",
									},
									map[string]any{
										"var": "name",
									},
								},
								"parts": []any{
									"domain",
									"domains",
									"{domain}",
									"hosts",
									"{name}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "domain",
											"orig": "domain",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "name",
											"orig": "name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"domain",
										"name",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/domain/domains/{domain}/hosts/{name}",
								"segments": []any{
									map[string]any{
										"lit": "domain",
									},
									map[string]any{
										"lit": "domains",
									},
									map[string]any{
										"var": "domain",
									},
									map[string]any{
										"lit": "hosts",
									},
									map[string]any{
										"var": "name",
									},
								},
								"parts": []any{
									"domain",
									"domains",
									"{domain}",
									"hosts",
									"{name}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "domain",
											"orig": "domain",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "name",
											"orig": "name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"domain",
										"name",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PUT",
								"orig": "/domain/domains/{domain}/hosts/{name}",
								"segments": []any{
									map[string]any{
										"lit": "domain",
									},
									map[string]any{
										"lit": "domains",
									},
									map[string]any{
										"var": "domain",
									},
									map[string]any{
										"lit": "hosts",
									},
									map[string]any{
										"var": "name",
									},
								},
								"parts": []any{
									"domain",
									"domains",
									"{domain}",
									"hosts",
									"{name}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "domain",
											"orig": "domain",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "name",
											"orig": "name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"domain",
										"name",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.domain",
						},
						[]any{
							"$.main.kit.entity.domain",
						},
					},
				},
			},
			"domain_livedns": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "current",
						"title": "Current",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "dnssec_available",
						"title": "Dnssec Available",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "livednssec_available",
						"title": "Livednssec Available",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "message",
						"title": "Message",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "nameservers",
						"title": "Nameservers",
						"type": "`$ARRAY`",
						"req": true,
					},
				},
				"name": "domain_livedns",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/domain/domains/{domain}/livedns",
								"segments": []any{
									map[string]any{
										"lit": "domain",
									},
									map[string]any{
										"lit": "domains",
									},
									map[string]any{
										"var": "domain",
									},
									map[string]any{
										"lit": "livedns",
									},
								},
								"parts": []any{
									"domain",
									"domains",
									"{domain}",
									"livedns",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "domain",
											"orig": "domain",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"domain",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/domain/domains/{domain}/livedns",
								"segments": []any{
									map[string]any{
										"lit": "domain",
									},
									map[string]any{
										"lit": "domains",
									},
									map[string]any{
										"var": "domain",
									},
									map[string]any{
										"lit": "livedns",
									},
								},
								"parts": []any{
									"domain",
									"domains",
									"{domain}",
									"livedns",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "domain",
											"orig": "domain",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"domain",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.domain",
						},
					},
				},
			},
			"domain_nameserver": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "message",
						"title": "Message",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "nameservers",
						"title": "Nameservers",
						"type": "`$ARRAY`",
						"req": true,
					},
				},
				"name": "domain_nameserver",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/domain/domains/{domain}/nameservers",
								"segments": []any{
									map[string]any{
										"lit": "domain",
									},
									map[string]any{
										"lit": "domains",
									},
									map[string]any{
										"var": "domain",
									},
									map[string]any{
										"lit": "nameservers",
									},
								},
								"parts": []any{
									"domain",
									"domains",
									"{domain}",
									"nameservers",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "domain",
											"orig": "domain",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"domain",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PUT",
								"orig": "/domain/domains/{domain}/nameservers",
								"segments": []any{
									map[string]any{
										"lit": "domain",
									},
									map[string]any{
										"lit": "domains",
									},
									map[string]any{
										"var": "domain",
									},
									map[string]any{
										"lit": "nameservers",
									},
								},
								"parts": []any{
									"domain",
									"domains",
									"{domain}",
									"nameservers",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "domain",
											"orig": "domain",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"domain",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.domain",
						},
					},
				},
			},
			"domain_tag": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "add",
						"title": "Add",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "message",
						"title": "Message",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "remove",
						"title": "Remove",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "tag",
						"title": "Tag",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "tags",
						"title": "Tags",
						"type": "`$ARRAY`",
						"req": true,
					},
				},
				"name": "domain_tag",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/domain/domains/{domain}/tags",
								"segments": []any{
									map[string]any{
										"lit": "domain",
									},
									map[string]any{
										"lit": "domains",
									},
									map[string]any{
										"var": "domain",
									},
									map[string]any{
										"lit": "tags",
									},
								},
								"parts": []any{
									"domain",
									"domains",
									"{domain}",
									"tags",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "domain",
											"orig": "domain",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"domain",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/domain/domains/{domain}/tags",
								"segments": []any{
									map[string]any{
										"lit": "domain",
									},
									map[string]any{
										"lit": "domains",
									},
									map[string]any{
										"var": "domain",
									},
									map[string]any{
										"lit": "tags",
									},
								},
								"parts": []any{
									"domain",
									"domains",
									"{domain}",
									"tags",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "domain",
											"orig": "domain",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"domain",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"patch": map[string]any{
						"input": "data",
						"name": "patch",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PATCH",
								"orig": "/domain/domains/{domain}/tags",
								"segments": []any{
									map[string]any{
										"lit": "domain",
									},
									map[string]any{
										"lit": "domains",
									},
									map[string]any{
										"var": "domain",
									},
									map[string]any{
										"lit": "tags",
									},
								},
								"parts": []any{
									"domain",
									"domains",
									"{domain}",
									"tags",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "domain",
											"orig": "domain",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"domain",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/domain/domains/{domain}/tags",
								"segments": []any{
									map[string]any{
										"lit": "domain",
									},
									map[string]any{
										"lit": "domains",
									},
									map[string]any{
										"var": "domain",
									},
									map[string]any{
										"lit": "tags",
									},
								},
								"parts": []any{
									"domain",
									"domains",
									"{domain}",
									"tags",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "domain",
											"orig": "domain",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"domain",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PUT",
								"orig": "/domain/domains/{domain}/tags",
								"segments": []any{
									map[string]any{
										"lit": "domain",
									},
									map[string]any{
										"lit": "domains",
									},
									map[string]any{
										"var": "domain",
									},
									map[string]any{
										"lit": "tags",
									},
								},
								"parts": []any{
									"domain",
									"domains",
									"{domain}",
									"tags",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "domain",
											"orig": "domain",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"domain",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.domain",
						},
					},
				},
			},
			"domain_transfer": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "admin",
						"title": "Admin",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "authinfo",
						"title": "Authinfo",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "bill",
						"title": "Bill",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "change_owner",
						"title": "Change Owner",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "created_at",
						"title": "Created At",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "currency",
						"title": "Currency",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "duration",
						"title": "Duration",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "enforce_premium",
						"title": "Enforce Premium",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "errors",
						"title": "Errors",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "errortype",
						"title": "Errortype",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "errortype_label",
						"title": "Errortype Label",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "extra_parameters",
						"title": "Extra Parameters",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "foa",
						"title": "Foa",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "fqdn",
						"title": "Fqdn",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "inner_step",
						"title": "Inner Step",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "mailbox_optin",
						"title": "Mailbox Optin",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "message",
						"title": "Message",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "nameservers",
						"title": "Nameservers",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "nameservers_ips",
						"title": "Nameservers Ips",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "owner",
						"title": "Owner",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "owner_contact",
						"title": "Owner Contact",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "params",
						"title": "Params",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "price",
						"title": "Price",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "regac_at",
						"title": "Regac At",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "resellee_id",
						"title": "Resellee Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "start_at",
						"title": "Start At",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "step",
						"title": "Step",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "step_nb",
						"title": "Step Nb",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "tech",
						"title": "Tech",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "template_id",
						"title": "Template Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "transfer_link",
						"title": "Transfer Link",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "transfer_procedure",
						"title": "Transfer Procedure",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "updated_at",
						"title": "Updated At",
						"type": "`$STRING`",
						"req": true,
					},
				},
				"name": "domain_transfer",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/domain/transferin/{domain}/available",
								"segments": []any{
									map[string]any{
										"lit": "domain",
									},
									map[string]any{
										"lit": "transferin",
									},
									map[string]any{
										"var": "domain",
									},
									map[string]any{
										"lit": "available",
									},
								},
								"parts": []any{
									"domain",
									"transferin",
									"{domain}",
									"available",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "domain",
											"orig": "domain",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "available",
									"exist": []any{
										"domain",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/domain/transferin/{domain}/foa",
								"segments": []any{
									map[string]any{
										"lit": "domain",
									},
									map[string]any{
										"lit": "transferin",
									},
									map[string]any{
										"var": "domain",
									},
									map[string]any{
										"lit": "foa",
									},
								},
								"parts": []any{
									"domain",
									"transferin",
									"{domain}",
									"foa",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "domain",
											"orig": "domain",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "foa",
									"exist": []any{
										"domain",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/domain/transferin",
								"segments": []any{
									map[string]any{
										"lit": "domain",
									},
									map[string]any{
										"lit": "transferin",
									},
								},
								"parts": []any{
									"domain",
									"transferin",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"name": "dry_run",
											"orig": "Dry-Run",
											"type": "`$INTEGER`",
											"kind": "header",
										},
									},
									"query": []any{
										map[string]any{
											"name": "sharing_id",
											"orig": "sharing_id",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/domain/transferin/{domain}",
								"segments": []any{
									map[string]any{
										"lit": "domain",
									},
									map[string]any{
										"lit": "transferin",
									},
									map[string]any{
										"var": "domain",
									},
								},
								"parts": []any{
									"domain",
									"transferin",
									"{domain}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "domain",
											"orig": "domain",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"domain",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PUT",
								"orig": "/domain/transferin/{domain}",
								"segments": []any{
									map[string]any{
										"lit": "domain",
									},
									map[string]any{
										"lit": "transferin",
									},
									map[string]any{
										"var": "domain",
									},
								},
								"parts": []any{
									"domain",
									"transferin",
									"{domain}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "domain",
											"orig": "domain",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"domain",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "PUT",
								"orig": "/domain/transferin/{domain}/authinfo",
								"segments": []any{
									map[string]any{
										"lit": "domain",
									},
									map[string]any{
										"lit": "transferin",
									},
									map[string]any{
										"var": "domain",
									},
									map[string]any{
										"lit": "authinfo",
									},
								},
								"parts": []any{
									"domain",
									"transferin",
									"{domain}",
									"authinfo",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "domain",
											"orig": "domain",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "sharing_id",
											"orig": "sharing_id",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"$action": "authinfo",
									"exist": []any{
										"domain",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"domain_webredir": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "cert_status",
						"title": "Cert Status",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "cert_uuid",
						"title": "Cert Uuid",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "created_at",
						"title": "Created At",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "host",
						"title": "Host",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "message",
						"title": "Message",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "override",
						"title": "Override",
						"type": "`$BOOLEAN`",
						"req": true,
						"op": map[string]any{
							"update": map[string]any{
								"type": "`$BOOLEAN`",
							},
						},
					},
					map[string]any{
						"name": "protocol",
						"title": "Protocol",
						"type": "`$STRING`",
						"op": map[string]any{
							"create": map[string]any{
								"req": true,
								"type": "`$STRING`",
							},
						},
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"update": map[string]any{
								"type": "`$STRING`",
							},
						},
					},
					map[string]any{
						"name": "updated_at",
						"title": "Updated At",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "url",
						"title": "Url",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"update": map[string]any{
								"type": "`$STRING`",
							},
						},
					},
				},
				"name": "domain_webredir",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/domain/domains/{domain}/webredirs",
								"segments": []any{
									map[string]any{
										"lit": "domain",
									},
									map[string]any{
										"lit": "domains",
									},
									map[string]any{
										"var": "domain",
									},
									map[string]any{
										"lit": "webredirs",
									},
								},
								"parts": []any{
									"domain",
									"domains",
									"{domain}",
									"webredirs",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "domain",
											"orig": "domain",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
										map[string]any{
											"name": "per_page",
											"orig": "per_page",
											"type": "`$INTEGER`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"domain",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/domain/domains/{domain}/webredirs",
								"segments": []any{
									map[string]any{
										"lit": "domain",
									},
									map[string]any{
										"lit": "domains",
									},
									map[string]any{
										"var": "domain",
									},
									map[string]any{
										"lit": "webredirs",
									},
								},
								"parts": []any{
									"domain",
									"domains",
									"{domain}",
									"webredirs",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "domain",
											"orig": "domain",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
										map[string]any{
											"name": "per_page",
											"orig": "per_page",
											"type": "`$INTEGER`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"domain",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/domain/domains/{domain}/webredirs/{host}",
								"segments": []any{
									map[string]any{
										"lit": "domain",
									},
									map[string]any{
										"lit": "domains",
									},
									map[string]any{
										"var": "domain",
									},
									map[string]any{
										"lit": "webredirs",
									},
									map[string]any{
										"var": "host",
									},
								},
								"parts": []any{
									"domain",
									"domains",
									"{domain}",
									"webredirs",
									"{host}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "domain",
											"orig": "domain",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "host",
											"orig": "host",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"domain",
										"host",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/domain/domains/{domain}/webredirs/{host}",
								"segments": []any{
									map[string]any{
										"lit": "domain",
									},
									map[string]any{
										"lit": "domains",
									},
									map[string]any{
										"var": "domain",
									},
									map[string]any{
										"lit": "webredirs",
									},
									map[string]any{
										"var": "host",
									},
								},
								"parts": []any{
									"domain",
									"domains",
									"{domain}",
									"webredirs",
									"{host}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "domain",
											"orig": "domain",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "host",
											"orig": "host",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"domain",
										"host",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PATCH",
								"orig": "/domain/domains/{domain}/webredirs/{host}",
								"segments": []any{
									map[string]any{
										"lit": "domain",
									},
									map[string]any{
										"lit": "domains",
									},
									map[string]any{
										"var": "domain",
									},
									map[string]any{
										"lit": "webredirs",
									},
									map[string]any{
										"var": "host",
									},
								},
								"parts": []any{
									"domain",
									"domains",
									"{domain}",
									"webredirs",
									"{host}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "domain",
											"orig": "domain",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "host",
											"orig": "host",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"domain",
										"host",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.domain",
						},
						[]any{
							"$.main.kit.entity.domain",
						},
					},
				},
			},
			"email_forward": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "destinations",
						"title": "Destinations",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "href",
						"title": "Href",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "message",
						"title": "Message",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "source",
						"title": "Source",
						"type": "`$STRING`",
						"req": true,
					},
				},
				"id": map[string]any{
					"field": "id",
					"from": map[string]any{
						"source": "source",
					},
					"name": "id",
					"parts": []any{
						"domain",
						"source",
					},
					"sep": "/",
				},
				"name": "email_forward",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/email/forwards/{domain}",
								"segments": []any{
									map[string]any{
										"lit": "email",
									},
									map[string]any{
										"lit": "forwards",
									},
									map[string]any{
										"var": "domain",
									},
								},
								"parts": []any{
									"email",
									"forwards",
									"{domain}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "domain",
											"orig": "domain",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"domain",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/email/forwards/{domain}",
								"segments": []any{
									map[string]any{
										"lit": "email",
									},
									map[string]any{
										"lit": "forwards",
									},
									map[string]any{
										"var": "domain",
									},
								},
								"parts": []any{
									"email",
									"forwards",
									"{domain}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "domain",
											"orig": "domain",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "destination",
											"orig": "destination",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
										map[string]any{
											"name": "per_page",
											"orig": "per_page",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "sort_by",
											"orig": "sort_by",
											"type": "`$STRING`",
											"kind": "query",
											"example": "source",
										},
										map[string]any{
											"name": "source",
											"orig": "source",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"domain",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/email/forwards/{domain}/{source}",
								"segments": []any{
									map[string]any{
										"lit": "email",
									},
									map[string]any{
										"lit": "forwards",
									},
									map[string]any{
										"var": "domain",
									},
									map[string]any{
										"var": "source",
									},
								},
								"parts": []any{
									"email",
									"forwards",
									"{domain}",
									"{source}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "domain",
											"orig": "domain",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "source",
											"orig": "source",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"domain",
										"source",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PUT",
								"orig": "/email/forwards/{domain}/{source}",
								"segments": []any{
									map[string]any{
										"lit": "email",
									},
									map[string]any{
										"lit": "forwards",
									},
									map[string]any{
										"var": "domain",
									},
									map[string]any{
										"var": "source",
									},
								},
								"parts": []any{
									"email",
									"forwards",
									"{domain}",
									"{source}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "domain",
											"orig": "domain",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "source",
											"orig": "source",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"domain",
										"source",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"email_mailbox": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "address",
						"title": "Address",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "alias_count",
						"title": "Alias Count",
						"type": "`$INTEGER`",
						"op": map[string]any{
							"list": map[string]any{
								"req": true,
								"type": "`$INTEGER`",
							},
						},
					},
					map[string]any{
						"name": "aliases",
						"title": "Aliases",
						"type": "`$ARRAY`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$ARRAY`",
							},
							"update": map[string]any{
								"type": "`$ARRAY`",
							},
						},
					},
					map[string]any{
						"name": "antispam",
						"title": "Antispam",
						"type": "`$BOOLEAN`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$BOOLEAN`",
							},
							"update": map[string]any{
								"type": "`$BOOLEAN`",
							},
						},
					},
					map[string]any{
						"name": "autorenew",
						"title": "Autorenew",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "domain",
						"title": "Domain",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "errors",
						"title": "Errors",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "expires_at",
						"title": "Expires At",
						"type": "`$STRING`",
						"req": true,
						"format": "date-time",
					},
					map[string]any{
						"name": "fallback_email",
						"title": "Fallback Email",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "href",
						"title": "Href",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "login",
						"title": "Login",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"update": map[string]any{
								"type": "`$STRING`",
							},
						},
					},
					map[string]any{
						"name": "mailbox_type",
						"title": "Mailbox Type",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"update": map[string]any{
								"type": "`$STRING`",
							},
						},
					},
					map[string]any{
						"name": "message",
						"title": "Message",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "password",
						"title": "Password",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"update": map[string]any{
								"type": "`$STRING`",
							},
						},
					},
					map[string]any{
						"name": "quota_used",
						"title": "Quota Used",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "responder",
						"title": "Responder",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "to_convert",
						"title": "To Convert",
						"type": "`$BOOLEAN`",
						"req": true,
					},
				},
				"id": map[string]any{
					"field": "id",
					"from": map[string]any{
						"domain": "domain",
						"id": "id",
					},
					"name": "id",
					"parts": []any{
						"domain",
						"id",
					},
					"sep": "/",
				},
				"name": "email_mailbox",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/email/mailboxes/{domain}/{email}/renew",
								"segments": []any{
									map[string]any{
										"lit": "email",
									},
									map[string]any{
										"lit": "mailboxes",
									},
									map[string]any{
										"var": "domain",
									},
									map[string]any{
										"var": "address",
									},
									map[string]any{
										"lit": "renew",
									},
								},
								"parts": []any{
									"email",
									"mailboxes",
									"{domain}",
									"{address}",
									"renew",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"email": "address",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"name": "dry_run",
											"orig": "Dry-Run",
											"type": "`$INTEGER`",
											"kind": "header",
										},
									},
									"params": []any{
										map[string]any{
											"name": "address",
											"orig": "email",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "domain",
											"orig": "domain",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "sharing_id",
											"orig": "sharing_id",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"$action": "renew",
									"exist": []any{
										"address",
										"domain",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/email/mailboxes/{domain}",
								"segments": []any{
									map[string]any{
										"lit": "email",
									},
									map[string]any{
										"lit": "mailboxes",
									},
									map[string]any{
										"var": "domain",
									},
								},
								"parts": []any{
									"email",
									"mailboxes",
									"{domain}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"name": "dry_run",
											"orig": "Dry-Run",
											"type": "`$INTEGER`",
											"kind": "header",
										},
									},
									"params": []any{
										map[string]any{
											"name": "domain",
											"orig": "domain",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"domain",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/email/mailboxes/{domain}/renew",
								"segments": []any{
									map[string]any{
										"lit": "email",
									},
									map[string]any{
										"lit": "mailboxes",
									},
									map[string]any{
										"var": "domain",
									},
									map[string]any{
										"lit": "renew",
									},
								},
								"parts": []any{
									"email",
									"mailboxes",
									"{domain}",
									"renew",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"name": "dry_run",
											"orig": "Dry-Run",
											"type": "`$INTEGER`",
											"kind": "header",
										},
									},
									"params": []any{
										map[string]any{
											"name": "domain",
											"orig": "domain",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "sharing_id",
											"orig": "sharing_id",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"$action": "renew_all",
									"exist": []any{
										"domain",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/email/mailboxes/{domain}",
								"segments": []any{
									map[string]any{
										"lit": "email",
									},
									map[string]any{
										"lit": "mailboxes",
									},
									map[string]any{
										"var": "domain",
									},
								},
								"parts": []any{
									"email",
									"mailboxes",
									"{domain}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "domain",
											"orig": "domain",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "<created_at",
											"orig": "<created_at",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "antispam",
											"orig": "antispam",
											"type": "`$BOOLEAN`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "login",
											"orig": "login",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "mailbox_type",
											"orig": "mailbox_type",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
										map[string]any{
											"name": "per_page",
											"orig": "per_page",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "~login",
											"orig": "~login",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"domain",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/email/mailboxes/{domain}/{mailbox_id}",
								"segments": []any{
									map[string]any{
										"lit": "email",
									},
									map[string]any{
										"lit": "mailboxes",
									},
									map[string]any{
										"var": "domain",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"email",
									"mailboxes",
									"{domain}",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"mailbox_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "domain",
											"orig": "domain",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "id",
											"orig": "mailbox_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"domain",
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/email/mailboxes/{domain}/{mailbox_id}",
								"segments": []any{
									map[string]any{
										"lit": "email",
									},
									map[string]any{
										"lit": "mailboxes",
									},
									map[string]any{
										"var": "domain",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"email",
									"mailboxes",
									"{domain}",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"mailbox_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "domain",
											"orig": "domain",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "id",
											"orig": "mailbox_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"domain",
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/email/mailboxes/{domain}/{mailbox_id}/contents",
								"segments": []any{
									map[string]any{
										"lit": "email",
									},
									map[string]any{
										"lit": "mailboxes",
									},
									map[string]any{
										"var": "domain",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "contents",
									},
								},
								"parts": []any{
									"email",
									"mailboxes",
									"{domain}",
									"{id}",
									"contents",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"mailbox_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "domain",
											"orig": "domain",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "id",
											"orig": "mailbox_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "purge",
									"exist": []any{
										"domain",
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PATCH",
								"orig": "/email/mailboxes/{domain}/{mailbox_id}",
								"segments": []any{
									map[string]any{
										"lit": "email",
									},
									map[string]any{
										"lit": "mailboxes",
									},
									map[string]any{
										"var": "domain",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"email",
									"mailboxes",
									"{domain}",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"mailbox_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "domain",
											"orig": "domain",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "id",
											"orig": "mailbox_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "sharing_id",
											"orig": "sharing_id",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"domain",
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.mailbox",
						},
					},
				},
			},
			"email_migration": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "available",
						"title": "Available",
						"type": "`$BOOLEAN`",
						"req": true,
					},
					map[string]any{
						"name": "currency",
						"title": "Currency",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "forward_count",
						"title": "Forward Count",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "free_mailboxes",
						"title": "Free Mailboxes",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "included_mailboxes",
						"title": "Included Mailboxes",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "info",
						"title": "Info",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "message",
						"title": "Message",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "packmail",
						"title": "Packmail",
						"type": "`$BOOLEAN`",
						"req": true,
					},
					map[string]any{
						"name": "price_v1",
						"title": "Price V1",
						"type": "`$NUMBER`",
						"req": true,
					},
					map[string]any{
						"name": "price_v2",
						"title": "Price V2",
						"type": "`$NUMBER`",
						"req": true,
					},
					map[string]any{
						"name": "quota_v1",
						"title": "Quota V1",
						"type": "`$NUMBER`",
						"req": true,
					},
					map[string]any{
						"name": "token",
						"title": "Token",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "usage_v1",
						"title": "Usage V1",
						"type": "`$NUMBER`",
						"req": true,
					},
				},
				"name": "email_migration",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/email/migration/{domain}",
								"segments": []any{
									map[string]any{
										"lit": "email",
									},
									map[string]any{
										"lit": "migration",
									},
									map[string]any{
										"var": "domain",
									},
								},
								"parts": []any{
									"email",
									"migration",
									"{domain}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "domain",
											"orig": "domain",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "sharing_id",
											"orig": "sharing_id",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"domain",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/email/migration/{domain}",
								"segments": []any{
									map[string]any{
										"lit": "email",
									},
									map[string]any{
										"lit": "migration",
									},
									map[string]any{
										"var": "domain",
									},
								},
								"parts": []any{
									"email",
									"migration",
									"{domain}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "domain",
											"orig": "domain",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "sharing_id",
											"orig": "sharing_id",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"domain",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"email_offer": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "antispam",
						"title": "Antispam",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "dkim",
						"title": "Dkim",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "message",
						"title": "Message",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "version",
						"title": "Version",
						"type": "`$INTEGER`",
						"req": true,
					},
				},
				"name": "email_offer",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/email/offers/{domain}",
								"segments": []any{
									map[string]any{
										"lit": "email",
									},
									map[string]any{
										"lit": "offers",
									},
									map[string]any{
										"var": "domain",
									},
								},
								"parts": []any{
									"email",
									"offers",
									"{domain}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "domain",
											"orig": "domain",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"domain",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PATCH",
								"orig": "/email/offers/{domain}",
								"segments": []any{
									map[string]any{
										"lit": "email",
									},
									map[string]any{
										"lit": "offers",
									},
									map[string]any{
										"var": "domain",
									},
								},
								"parts": []any{
									"email",
									"offers",
									"{domain}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "domain",
											"orig": "domain",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"domain",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"email_slot": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "autorenew",
						"title": "Autorenew",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "capacity",
						"title": "Capacity",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "created_at",
						"title": "Created At",
						"type": "`$STRING`",
						"req": true,
						"format": "date-time",
					},
					map[string]any{
						"name": "duration",
						"title": "Duration",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "gandi_id",
						"title": "Gandi Id",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "href",
						"title": "Href",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "mailbox_type",
						"title": "Mailbox Type",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "refund_amount",
						"title": "Refund Amount",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "refund_currency",
						"title": "Refund Currency",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "refundable",
						"title": "Refundable",
						"type": "`$BOOLEAN`",
						"req": true,
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
						"req": true,
					},
				},
				"id": map[string]any{
					"field": "id",
					"from": map[string]any{
						"id": "id",
					},
					"name": "id",
					"parts": []any{
						"domain",
						"id",
					},
					"sep": "/",
				},
				"name": "email_slot",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/email/slots/{domain}",
								"segments": []any{
									map[string]any{
										"lit": "email",
									},
									map[string]any{
										"lit": "slots",
									},
									map[string]any{
										"var": "domain",
									},
								},
								"parts": []any{
									"email",
									"slots",
									"{domain}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "domain",
											"orig": "domain",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "sharing_id",
											"orig": "sharing_id",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"domain",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/email/slots/{domain}",
								"segments": []any{
									map[string]any{
										"lit": "email",
									},
									map[string]any{
										"lit": "slots",
									},
									map[string]any{
										"var": "domain",
									},
								},
								"parts": []any{
									"email",
									"slots",
									"{domain}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "domain",
											"orig": "domain",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "display_not_expired_and_inactive",
											"orig": "display_not_expired_and_inactive",
											"type": "`$BOOLEAN`",
											"kind": "query",
											"example": false,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"domain",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/email/slots/{domain}/{slot_id}",
								"segments": []any{
									map[string]any{
										"lit": "email",
									},
									map[string]any{
										"lit": "slots",
									},
									map[string]any{
										"var": "domain",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"email",
									"slots",
									"{domain}",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"slot_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "domain",
											"orig": "domain",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "id",
											"orig": "slot_id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"domain",
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/email/slots/{domain}/{slot_id}",
								"segments": []any{
									map[string]any{
										"lit": "email",
									},
									map[string]any{
										"lit": "slots",
									},
									map[string]any{
										"var": "domain",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"email",
									"slots",
									"{domain}",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"slot_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "domain",
											"orig": "domain",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "id",
											"orig": "slot_id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"domain",
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"hosting_application": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "name_label",
						"title": "Name Label",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "requirements",
						"title": "Requirements",
						"type": "`$ARRAY`",
						"req": true,
					},
				},
				"name": "hosting_application",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/simplehosting/applications",
								"segments": []any{
									map[string]any{
										"lit": "simplehosting",
									},
									map[string]any{
										"lit": "applications",
									},
								},
								"parts": []any{
									"simplehosting",
									"applications",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "database",
											"orig": "database",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "language",
											"orig": "language",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "name",
											"orig": "name",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
										map[string]any{
											"name": "per_page",
											"orig": "per_page",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "sharing_id",
											"orig": "sharing_id",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "sort_by",
											"orig": "sort_by",
											"type": "`$STRING`",
											"kind": "query",
											"example": "-created_at",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/simplehosting/applications/{application_name}",
								"segments": []any{
									map[string]any{
										"lit": "simplehosting",
									},
									map[string]any{
										"lit": "applications",
									},
									map[string]any{
										"var": "name",
									},
								},
								"parts": []any{
									"simplehosting",
									"applications",
									"{name}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"application_name": "name",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "name",
											"orig": "application_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"name",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"hosting_instance": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "access_information",
						"title": "Access Information",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "authentication",
						"title": "Authentication",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "autorenew",
						"title": "Autorenew",
						"type": "`$OBJECT`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$BOOLEAN`",
							},
						},
					},
					map[string]any{
						"name": "available_upgrade",
						"title": "Available Upgrade",
						"type": "`$BOOLEAN`",
						"req": true,
					},
					map[string]any{
						"name": "booster",
						"title": "Booster",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "booster_options",
						"title": "Booster Options",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "compatible_applications",
						"title": "Compatible Applications",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "console",
						"title": "Console",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "cpu",
						"title": "Cpu",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "created_at",
						"title": "Created At",
						"type": "`$STRING`",
						"req": true,
						"format": "date-time",
					},
					map[string]any{
						"name": "database",
						"title": "Database",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "datacenter",
						"title": "Datacenter",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "domain",
						"title": "Domain",
						"type": "`$STRING`",
						"op": map[string]any{
							"create": map[string]any{
								"req": true,
								"type": "`$OBJECT`",
							},
						},
					},
					map[string]any{
						"name": "duration",
						"title": "Duration",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "duration_unit",
						"title": "Duration Unit",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "errors",
						"title": "Errors",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "expire_at",
						"title": "Expire At",
						"type": "`$STRING`",
						"req": true,
						"format": "date-time",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "language",
						"title": "Language",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "language_id",
						"title": "Language Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "location",
						"title": "Location",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "message",
						"title": "Message",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
							"update": map[string]any{
								"type": "`$STRING`",
							},
						},
					},
					map[string]any{
						"name": "password",
						"title": "Password",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "password_updated_at",
						"title": "Password Updated At",
						"type": "`$STRING`",
						"format": "date-time",
					},
					map[string]any{
						"name": "ram",
						"title": "Ram",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "sharing_space",
						"title": "Sharing Space",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "size",
						"title": "Size",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"update": map[string]any{
								"type": "`$STRING`",
							},
						},
					},
					map[string]any{
						"name": "snapshot_enabled",
						"title": "Snapshot Enabled",
						"type": "`$BOOLEAN`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$BOOLEAN`",
							},
							"update": map[string]any{
								"type": "`$BOOLEAN`",
							},
						},
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "storage",
						"title": "Storage",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "storage_additional_size",
						"title": "Storage Additional Size",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "subscription_cancelled",
						"title": "Subscription Cancelled",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "upgrade_to",
						"title": "Upgrade To",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "vhosts",
						"title": "Vhosts",
						"type": "`$ARRAY`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$ARRAY`",
							},
						},
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "hosting_instance",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/simplehosting/instances/{instance_id}/action",
								"segments": []any{
									map[string]any{
										"lit": "simplehosting",
									},
									map[string]any{
										"lit": "instances",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "action",
									},
								},
								"parts": []any{
									"simplehosting",
									"instances",
									"{id}",
									"action",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"instance_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "instance_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "action",
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/simplehosting/instances",
								"segments": []any{
									map[string]any{
										"lit": "simplehosting",
									},
									map[string]any{
										"lit": "instances",
									},
								},
								"parts": []any{
									"simplehosting",
									"instances",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"name": "dry_run",
											"orig": "Dry-Run",
											"type": "`$INTEGER`",
											"kind": "header",
										},
									},
									"query": []any{
										map[string]any{
											"name": "sharing_id",
											"orig": "sharing_id",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/simplehosting/instances",
								"segments": []any{
									map[string]any{
										"lit": "simplehosting",
									},
									map[string]any{
										"lit": "instances",
									},
								},
								"parts": []any{
									"simplehosting",
									"instances",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "fqdn",
											"orig": "fqdn",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "name",
											"orig": "name",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
										map[string]any{
											"name": "per_page",
											"orig": "per_page",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "sharing_id",
											"orig": "sharing_id",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "size",
											"orig": "size",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "sort_by",
											"orig": "sort_by",
											"type": "`$STRING`",
											"kind": "query",
											"example": "-created_at",
										},
										map[string]any{
											"name": "status",
											"orig": "status",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/simplehosting/instances/{instance_id}",
								"segments": []any{
									map[string]any{
										"lit": "simplehosting",
									},
									map[string]any{
										"lit": "instances",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"simplehosting",
									"instances",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"instance_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "instance_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/simplehosting/instances/{instance_id}/usage",
								"segments": []any{
									map[string]any{
										"lit": "simplehosting",
									},
									map[string]any{
										"lit": "instances",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "usage",
									},
								},
								"parts": []any{
									"simplehosting",
									"instances",
									"{id}",
									"usage",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"instance_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "instance_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "usage",
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/simplehosting/instances/{instance_id}",
								"segments": []any{
									map[string]any{
										"lit": "simplehosting",
									},
									map[string]any{
										"lit": "instances",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"simplehosting",
									"instances",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"instance_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "instance_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PATCH",
								"orig": "/simplehosting/instances/{instance_id}",
								"segments": []any{
									map[string]any{
										"lit": "simplehosting",
									},
									map[string]any{
										"lit": "instances",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"simplehosting",
									"instances",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"instance_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "instance_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"hosting_vhost": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "application",
						"title": "Application",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "created_at",
						"title": "Created At",
						"type": "`$STRING`",
						"req": true,
						"format": "date-time",
					},
					map[string]any{
						"name": "deployment",
						"title": "Deployment",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "fqdn",
						"title": "Fqdn",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "https_strategy",
						"title": "Https Strategy",
						"type": "`$STRING`",
						"op": map[string]any{
							"create": map[string]any{
								"req": true,
								"type": "`$STRING`",
							},
						},
					},
					map[string]any{
						"name": "is_a_test_vhost",
						"title": "Is A Test Vhost",
						"type": "`$BOOLEAN`",
						"req": true,
					},
					map[string]any{
						"name": "linked_dns_zone",
						"title": "Linked Dns Zone",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "tls_validated_at",
						"title": "Tls Validated At",
						"type": "`$STRING`",
						"format": "date-time",
					},
				},
				"name": "hosting_vhost",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/simplehosting/instances/{instance_id}/vhosts",
								"segments": []any{
									map[string]any{
										"lit": "simplehosting",
									},
									map[string]any{
										"lit": "instances",
									},
									map[string]any{
										"var": "instance_id",
									},
									map[string]any{
										"lit": "vhosts",
									},
								},
								"parts": []any{
									"simplehosting",
									"instances",
									"{instance_id}",
									"vhosts",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "instance_id",
											"orig": "instance_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"instance_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/simplehosting/instances/{instance_id}/vhosts",
								"segments": []any{
									map[string]any{
										"lit": "simplehosting",
									},
									map[string]any{
										"lit": "instances",
									},
									map[string]any{
										"var": "instance_id",
									},
									map[string]any{
										"lit": "vhosts",
									},
								},
								"parts": []any{
									"simplehosting",
									"instances",
									"{instance_id}",
									"vhosts",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "instance_id",
											"orig": "instance_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "fqdn",
											"orig": "fqdn",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
										map[string]any{
											"name": "per_page",
											"orig": "per_page",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "sort_by",
											"orig": "sort_by",
											"type": "`$STRING`",
											"kind": "query",
											"example": "-created_at",
										},
										map[string]any{
											"name": "status",
											"orig": "status",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"instance_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/simplehosting/instances/{instance_id}/vhosts/{vhost_fqdn}",
								"segments": []any{
									map[string]any{
										"lit": "simplehosting",
									},
									map[string]any{
										"lit": "instances",
									},
									map[string]any{
										"var": "instance_id",
									},
									map[string]any{
										"lit": "vhosts",
									},
									map[string]any{
										"var": "fqdn",
									},
								},
								"parts": []any{
									"simplehosting",
									"instances",
									"{instance_id}",
									"vhosts",
									"{fqdn}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"vhost_fqdn": "fqdn",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "fqdn",
											"orig": "vhost_fqdn",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "instance_id",
											"orig": "instance_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"fqdn",
										"instance_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/simplehosting/instances/{instance_id}/vhosts/{vhost_fqdn}",
								"segments": []any{
									map[string]any{
										"lit": "simplehosting",
									},
									map[string]any{
										"lit": "instances",
									},
									map[string]any{
										"var": "instance_id",
									},
									map[string]any{
										"lit": "vhosts",
									},
									map[string]any{
										"var": "fqdn",
									},
								},
								"parts": []any{
									"simplehosting",
									"instances",
									"{instance_id}",
									"vhosts",
									"{fqdn}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"vhost_fqdn": "fqdn",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "fqdn",
											"orig": "vhost_fqdn",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "instance_id",
											"orig": "instance_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"fqdn",
										"instance_id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/simplehosting/instances/{instance_id}/vhosts/{vhost_fqdn}/cache",
								"segments": []any{
									map[string]any{
										"lit": "simplehosting",
									},
									map[string]any{
										"lit": "instances",
									},
									map[string]any{
										"var": "instance_id",
									},
									map[string]any{
										"lit": "vhosts",
									},
									map[string]any{
										"var": "fqdn",
									},
									map[string]any{
										"lit": "cache",
									},
								},
								"parts": []any{
									"simplehosting",
									"instances",
									"{instance_id}",
									"vhosts",
									"{fqdn}",
									"cache",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"vhost_fqdn": "fqdn",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "fqdn",
											"orig": "vhost_fqdn",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "instance_id",
											"orig": "instance_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "cache",
									"exist": []any{
										"fqdn",
										"instance_id",
									},
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PATCH",
								"orig": "/simplehosting/instances/{instance_id}/vhosts/{vhost_fqdn}",
								"segments": []any{
									map[string]any{
										"lit": "simplehosting",
									},
									map[string]any{
										"lit": "instances",
									},
									map[string]any{
										"var": "instance_id",
									},
									map[string]any{
										"lit": "vhosts",
									},
									map[string]any{
										"var": "fqdn",
									},
								},
								"parts": []any{
									"simplehosting",
									"instances",
									"{instance_id}",
									"vhosts",
									"{fqdn}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"vhost_fqdn": "fqdn",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "fqdn",
											"orig": "vhost_fqdn",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "instance_id",
											"orig": "instance_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"fqdn",
										"instance_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"issued_certificate": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "altnames",
						"title": "Altnames",
						"type": "`$ARRAY`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$ARRAY`",
							},
							"update": map[string]any{
								"type": "`$ARRAY`",
							},
						},
					},
					map[string]any{
						"name": "altnames_unicode",
						"title": "Altnames Unicode",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "apex_only",
						"title": "Apex Only",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "assumed_name",
						"title": "Assumed Name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "business_category",
						"title": "Business Category",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "card_pay_trustlogo",
						"title": "Card Pay Trustlogo",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "cert",
						"title": "Cert",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "cn",
						"title": "Cn",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
						},
					},
					map[string]any{
						"name": "cn_unicode",
						"title": "Cn Unicode",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "contact",
						"title": "Contact",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "csr",
						"title": "Csr",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "dates",
						"title": "Dates",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "dcv_method",
						"title": "Dcv Method",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "duration",
						"title": "Duration",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "error_msg",
						"title": "Error Msg",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "errors",
						"title": "Errors",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "href",
						"title": "Href",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "ida",
						"title": "Ida",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "intermediate",
						"title": "Intermediate",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "joi",
						"title": "Joi",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "middleman",
						"title": "Middleman",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "owner",
						"title": "Owner",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "package",
						"title": "Package",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "provider",
						"title": "Provider",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "reissuable",
						"title": "Reissuable",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "renewable",
						"title": "Renewable",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "resellee_id",
						"title": "Resellee Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "sha_version",
						"title": "Sha Version",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "sharing_id",
						"title": "Sharing Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "software",
						"title": "Software",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "state",
						"title": "State",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "state_detail",
						"title": "State Detail",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "step_nb",
						"title": "Step Nb",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "stored",
						"title": "Stored",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "tags",
						"title": "Tags",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "trustlogo",
						"title": "Trustlogo",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "trustlogo_token",
						"title": "Trustlogo Token",
						"type": "`$OBJECT`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "issued_certificate",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/certificate/issued-certs/{id}/dcv_params",
								"segments": []any{
									map[string]any{
										"lit": "certificate",
									},
									map[string]any{
										"lit": "issued-certs",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "dcv_params",
									},
								},
								"parts": []any{
									"certificate",
									"issued-certs",
									"{id}",
									"dcv_params",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "dcv_params",
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/certificate/dcv_params",
								"segments": []any{
									map[string]any{
										"lit": "certificate",
									},
									map[string]any{
										"lit": "dcv_params",
									},
								},
								"parts": []any{
									"certificate",
									"dcv_params",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{
									"$action": "dcv_params",
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/certificate/issued-certs",
								"segments": []any{
									map[string]any{
										"lit": "certificate",
									},
									map[string]any{
										"lit": "issued-certs",
									},
								},
								"parts": []any{
									"certificate",
									"issued-certs",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"name": "dry_run",
											"orig": "Dry-Run",
											"type": "`$INTEGER`",
											"kind": "header",
										},
									},
									"query": []any{
										map[string]any{
											"name": "sharing_id",
											"orig": "sharing_id",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/certificate/issued-certs",
								"segments": []any{
									map[string]any{
										"lit": "certificate",
									},
									map[string]any{
										"lit": "issued-certs",
									},
								},
								"parts": []any{
									"certificate",
									"issued-certs",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "cn",
											"orig": "cn",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "cn_eq",
											"orig": "cn__eq",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "covered_cn",
											"orig": "covered_cn",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "package",
											"orig": "package",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
										map[string]any{
											"name": "per_page",
											"orig": "per_page",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "sharing_id",
											"orig": "sharing_id",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "sort_by",
											"orig": "sort_by",
											"type": "`$STRING`",
											"kind": "query",
											"example": "ends_at",
										},
										map[string]any{
											"name": "status",
											"orig": "status",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/certificate/issued-certs/{id}",
								"segments": []any{
									map[string]any{
										"lit": "certificate",
									},
									map[string]any{
										"lit": "issued-certs",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"certificate",
									"issued-certs",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/certificate/issued-certs/{id}/crt",
								"segments": []any{
									map[string]any{
										"lit": "certificate",
									},
									map[string]any{
										"lit": "issued-certs",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "crt",
									},
								},
								"parts": []any{
									"certificate",
									"issued-certs",
									"{id}",
									"crt",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "crt",
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "raw",
									"media": "text/plain",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/certificate/issued-certs/{id}",
								"segments": []any{
									map[string]any{
										"lit": "certificate",
									},
									map[string]any{
										"lit": "issued-certs",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"certificate",
									"issued-certs",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "sharing_id",
											"orig": "sharing_id",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PATCH",
								"orig": "/certificate/issued-certs/{id}",
								"segments": []any{
									map[string]any{
										"lit": "certificate",
									},
									map[string]any{
										"lit": "issued-certs",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"certificate",
									"issued-certs",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"name": "dry_run",
											"orig": "Dry-Run",
											"type": "`$INTEGER`",
											"kind": "header",
										},
									},
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "sharing_id",
											"orig": "sharing_id",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"linked_zone": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "created_at",
						"title": "Created At",
						"type": "`$STRING`",
						"req": true,
						"format": "date-time",
					},
					map[string]any{
						"name": "default_records",
						"title": "Default Records",
						"type": "`$BOOLEAN`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$BOOLEAN`",
							},
							"update": map[string]any{
								"type": "`$BOOLEAN`",
							},
						},
					},
					map[string]any{
						"name": "domain_count",
						"title": "Domain Count",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "domains",
						"title": "Domains",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "message",
						"title": "Message",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"update": map[string]any{
								"type": "`$STRING`",
							},
						},
					},
					map[string]any{
						"name": "record_list",
						"title": "Record List",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "record_text",
						"title": "Record Text",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "records",
						"title": "Records",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "sharing_space",
						"title": "Sharing Space",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "updated_at",
						"title": "Updated At",
						"type": "`$STRING`",
						"format": "date-time",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "linked_zone",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/linkedzone/zones",
								"segments": []any{
									map[string]any{
										"lit": "linkedzone",
									},
									map[string]any{
										"lit": "zones",
									},
								},
								"parts": []any{
									"linkedzone",
									"zones",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/linkedzone/zones",
								"segments": []any{
									map[string]any{
										"lit": "linkedzone",
									},
									map[string]any{
										"lit": "zones",
									},
								},
								"parts": []any{
									"linkedzone",
									"zones",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
										map[string]any{
											"name": "per_page",
											"orig": "per_page",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "sharing_id",
											"orig": "sharing_id",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/linkedzone/zones/{zone_id}",
								"segments": []any{
									map[string]any{
										"lit": "linkedzone",
									},
									map[string]any{
										"lit": "zones",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"linkedzone",
									"zones",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"zone_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "zone_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "sharing_id",
											"orig": "sharing_id",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/linkedzone/zones/{zone_id}",
								"segments": []any{
									map[string]any{
										"lit": "linkedzone",
									},
									map[string]any{
										"lit": "zones",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"linkedzone",
									"zones",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"zone_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "zone_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PATCH",
								"orig": "/linkedzone/zones/{zone_id}",
								"segments": []any{
									map[string]any{
										"lit": "linkedzone",
									},
									map[string]any{
										"lit": "zones",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"linkedzone",
									"zones",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"zone_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "zone_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"linked_zone_deployment": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "deploy",
						"title": "Deploy",
						"type": "`$BOOLEAN`",
						"req": true,
					},
					map[string]any{
						"name": "message",
						"title": "Message",
						"type": "`$STRING`",
						"req": true,
					},
				},
				"name": "linked_zone_deployment",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/linkedzone/zones/{zone_id}",
								"segments": []any{
									map[string]any{
										"lit": "linkedzone",
									},
									map[string]any{
										"lit": "zones",
									},
									map[string]any{
										"var": "zone_id",
									},
								},
								"parts": []any{
									"linkedzone",
									"zones",
									"{zone_id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "zone_id",
											"orig": "zone_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"zone_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"linked_zone_domain": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "deployed",
						"title": "Deployed",
						"type": "`$BOOLEAN`",
						"req": true,
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "owner",
						"title": "Owner",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "zone",
						"title": "Zone",
						"type": "`$OBJECT`",
						"req": true,
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "linked_zone_domain",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/linkedzone/domains",
								"segments": []any{
									map[string]any{
										"lit": "linkedzone",
									},
									map[string]any{
										"lit": "domains",
									},
								},
								"parts": []any{
									"linkedzone",
									"domains",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "name",
											"orig": "name",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
										map[string]any{
											"name": "per_page",
											"orig": "per_page",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "sharing_id",
											"orig": "sharing_id",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "zone_id",
											"orig": "zone_id",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/linkedzone/domains/{domain}",
								"segments": []any{
									map[string]any{
										"lit": "linkedzone",
									},
									map[string]any{
										"lit": "domains",
									},
									map[string]any{
										"var": "name",
									},
								},
								"parts": []any{
									"linkedzone",
									"domains",
									"{name}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"domain": "name",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "name",
											"orig": "domain",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"name",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PATCH",
								"orig": "/linkedzone/zones/{zone_id}/link/domains",
								"segments": []any{
									map[string]any{
										"lit": "linkedzone",
									},
									map[string]any{
										"lit": "zones",
									},
									map[string]any{
										"var": "zone_id",
									},
									map[string]any{
										"lit": "link",
									},
									map[string]any{
										"lit": "domains",
									},
								},
								"parts": []any{
									"linkedzone",
									"zones",
									"{zone_id}",
									"link",
									"domains",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "zone_id",
											"orig": "zone_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "link",
									"exist": []any{
										"zone_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "PATCH",
								"orig": "/linkedzone/unlink/domains",
								"segments": []any{
									map[string]any{
										"lit": "linkedzone",
									},
									map[string]any{
										"lit": "unlink",
									},
									map[string]any{
										"lit": "domains",
									},
								},
								"parts": []any{
									"linkedzone",
									"unlink",
									"domains",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{
									"$action": "unlink",
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.domain",
						},
					},
				},
			},
			"linked_zone_task": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "created_at",
						"title": "Created At",
						"type": "`$STRING`",
						"req": true,
						"format": "date-time",
					},
					map[string]any{
						"name": "ending_at",
						"title": "Ending At",
						"type": "`$STRING`",
						"format": "date-time",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "result",
						"title": "Result",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "updated_at",
						"title": "Updated At",
						"type": "`$STRING`",
						"format": "date-time",
					},
					map[string]any{
						"name": "zone_id",
						"title": "Zone Id",
						"type": "`$STRING`",
						"req": true,
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "linked_zone_task",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/linkedzone/tasks",
								"segments": []any{
									map[string]any{
										"lit": "linkedzone",
									},
									map[string]any{
										"lit": "tasks",
									},
								},
								"parts": []any{
									"linkedzone",
									"tasks",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
										map[string]any{
											"name": "per_page",
											"orig": "per_page",
											"type": "`$INTEGER`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/linkedzone/tasks/{task_id}",
								"segments": []any{
									map[string]any{
										"lit": "linkedzone",
									},
									map[string]any{
										"lit": "tasks",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"linkedzone",
									"tasks",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"task_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "task_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"livedns_axfr_slave": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "message",
						"title": "Message",
						"type": "`$STRING`",
						"req": true,
					},
				},
				"name": "livedns_axfr_slave",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/livedns/domains/{fqdn}/axfr/slaves",
								"segments": []any{
									map[string]any{
										"lit": "livedns",
									},
									map[string]any{
										"lit": "domains",
									},
									map[string]any{
										"var": "fqdn",
									},
									map[string]any{
										"lit": "axfr",
									},
									map[string]any{
										"lit": "slaves",
									},
								},
								"parts": []any{
									"livedns",
									"domains",
									"{fqdn}",
									"axfr",
									"slaves",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "fqdn",
											"orig": "fqdn",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"fqdn",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/livedns/domains/{fqdn}/axfr/slaves/{ip}",
								"segments": []any{
									map[string]any{
										"lit": "livedns",
									},
									map[string]any{
										"lit": "domains",
									},
									map[string]any{
										"var": "fqdn",
									},
									map[string]any{
										"lit": "axfr",
									},
									map[string]any{
										"lit": "slaves",
									},
									map[string]any{
										"var": "ip",
									},
								},
								"parts": []any{
									"livedns",
									"domains",
									"{fqdn}",
									"axfr",
									"slaves",
									"{ip}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "fqdn",
											"orig": "fqdn",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "ip",
											"orig": "ip",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"fqdn",
										"ip",
									},
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PUT",
								"orig": "/livedns/domains/{fqdn}/axfr/slaves/{ip}",
								"segments": []any{
									map[string]any{
										"lit": "livedns",
									},
									map[string]any{
										"lit": "domains",
									},
									map[string]any{
										"var": "fqdn",
									},
									map[string]any{
										"lit": "axfr",
									},
									map[string]any{
										"lit": "slaves",
									},
									map[string]any{
										"var": "ip",
									},
								},
								"parts": []any{
									"livedns",
									"domains",
									"{fqdn}",
									"axfr",
									"slaves",
									"{ip}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "fqdn",
											"orig": "fqdn",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "ip",
											"orig": "ip",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"fqdn",
										"ip",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.domain",
						},
						[]any{
							"$.main.kit.entity.domain",
						},
					},
				},
			},
			"livedns_axfr_tsig": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "href",
						"title": "Href",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "key_name",
						"title": "Key Name",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "message",
						"title": "Message",
						"type": "`$STRING`",
						"req": true,
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "livedns_axfr_tsig",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/livedns/domains/{fqdn}/axfr/tsig",
								"segments": []any{
									map[string]any{
										"lit": "livedns",
									},
									map[string]any{
										"lit": "domains",
									},
									map[string]any{
										"var": "fqdn",
									},
									map[string]any{
										"lit": "axfr",
									},
									map[string]any{
										"lit": "tsig",
									},
								},
								"parts": []any{
									"livedns",
									"domains",
									"{fqdn}",
									"axfr",
									"tsig",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "fqdn",
											"orig": "fqdn",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"fqdn",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/livedns/domains/{fqdn}/axfr/tsig/{id}",
								"segments": []any{
									map[string]any{
										"lit": "livedns",
									},
									map[string]any{
										"lit": "domains",
									},
									map[string]any{
										"var": "fqdn",
									},
									map[string]any{
										"lit": "axfr",
									},
									map[string]any{
										"lit": "tsig",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"livedns",
									"domains",
									"{fqdn}",
									"axfr",
									"tsig",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "fqdn",
											"orig": "fqdn",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "sharing_id",
											"orig": "sharing_id",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"fqdn",
										"id",
									},
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PUT",
								"orig": "/livedns/domains/{fqdn}/axfr/tsig/{id}",
								"segments": []any{
									map[string]any{
										"lit": "livedns",
									},
									map[string]any{
										"lit": "domains",
									},
									map[string]any{
										"var": "fqdn",
									},
									map[string]any{
										"lit": "axfr",
									},
									map[string]any{
										"lit": "tsig",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"livedns",
									"domains",
									"{fqdn}",
									"axfr",
									"tsig",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "fqdn",
											"orig": "fqdn",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "sharing_id",
											"orig": "sharing_id",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"fqdn",
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.domain",
						},
					},
				},
			},
			"livedns_domain": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "automatic_snapshots",
						"title": "Automatic Snapshots",
						"type": "`$BOOLEAN`",
						"req": true,
						"op": map[string]any{
							"update": map[string]any{
								"type": "`$BOOLEAN`",
							},
						},
					},
					map[string]any{
						"name": "domain_href",
						"title": "Domain Href",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "domain_keys_href",
						"title": "Domain Keys Href",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "domain_records_href",
						"title": "Domain Records Href",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "fqdn",
						"title": "Fqdn",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "message",
						"title": "Message",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "zone",
						"title": "Zone",
						"type": "`$OBJECT`",
					},
				},
				"name": "livedns_domain",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/livedns/domains",
								"segments": []any{
									map[string]any{
										"lit": "livedns",
									},
									map[string]any{
										"lit": "domains",
									},
								},
								"parts": []any{
									"livedns",
									"domains",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "sharing_id",
											"orig": "sharing_id",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/livedns/domains",
								"segments": []any{
									map[string]any{
										"lit": "livedns",
									},
									map[string]any{
										"lit": "domains",
									},
								},
								"parts": []any{
									"livedns",
									"domains",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
										map[string]any{
											"name": "per_page",
											"orig": "per_page",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "sharing_id",
											"orig": "sharing_id",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/livedns/domains/{fqdn}",
								"segments": []any{
									map[string]any{
										"lit": "livedns",
									},
									map[string]any{
										"lit": "domains",
									},
									map[string]any{
										"var": "fqdn",
									},
								},
								"parts": []any{
									"livedns",
									"domains",
									"{fqdn}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "fqdn",
											"orig": "fqdn",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"fqdn",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PATCH",
								"orig": "/livedns/domains/{fqdn}",
								"segments": []any{
									map[string]any{
										"lit": "livedns",
									},
									map[string]any{
										"lit": "domains",
									},
									map[string]any{
										"var": "fqdn",
									},
								},
								"parts": []any{
									"livedns",
									"domains",
									"{fqdn}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "fqdn",
											"orig": "fqdn",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"fqdn",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.domain",
						},
					},
				},
			},
			"livedns_key": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "algorithm",
						"title": "Algorithm",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "algorithm_name",
						"title": "Algorithm Name",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "deleted",
						"title": "Deleted",
						"type": "`$BOOLEAN`",
						"req": true,
					},
					map[string]any{
						"name": "ds",
						"title": "Ds",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "fingerprint",
						"title": "Fingerprint",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "flags",
						"title": "Flags",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "fqdn",
						"title": "Fqdn",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "key_href",
						"title": "Key Href",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "message",
						"title": "Message",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "public_key",
						"title": "Public Key",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "tag",
						"title": "Tag",
						"type": "`$INTEGER`",
						"req": true,
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "livedns_key",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/livedns/domains/{fqdn}/keys",
								"segments": []any{
									map[string]any{
										"lit": "livedns",
									},
									map[string]any{
										"lit": "domains",
									},
									map[string]any{
										"var": "fqdn",
									},
									map[string]any{
										"lit": "keys",
									},
								},
								"parts": []any{
									"livedns",
									"domains",
									"{fqdn}",
									"keys",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "fqdn",
											"orig": "fqdn",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"fqdn",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/livedns/domains/{fqdn}/keys",
								"segments": []any{
									map[string]any{
										"lit": "livedns",
									},
									map[string]any{
										"lit": "domains",
									},
									map[string]any{
										"var": "fqdn",
									},
									map[string]any{
										"lit": "keys",
									},
								},
								"parts": []any{
									"livedns",
									"domains",
									"{fqdn}",
									"keys",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "fqdn",
											"orig": "fqdn",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"fqdn",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/livedns/domains/{fqdn}/keys/{id}",
								"segments": []any{
									map[string]any{
										"lit": "livedns",
									},
									map[string]any{
										"lit": "domains",
									},
									map[string]any{
										"var": "fqdn",
									},
									map[string]any{
										"lit": "keys",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"livedns",
									"domains",
									"{fqdn}",
									"keys",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "fqdn",
											"orig": "fqdn",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"fqdn",
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/livedns/domains/{fqdn}/keys/{id}",
								"segments": []any{
									map[string]any{
										"lit": "livedns",
									},
									map[string]any{
										"lit": "domains",
									},
									map[string]any{
										"var": "fqdn",
									},
									map[string]any{
										"lit": "keys",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"livedns",
									"domains",
									"{fqdn}",
									"keys",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "fqdn",
											"orig": "fqdn",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"fqdn",
										"id",
									},
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PATCH",
								"orig": "/livedns/domains/{fqdn}/keys/{id}",
								"segments": []any{
									map[string]any{
										"lit": "livedns",
									},
									map[string]any{
										"lit": "domains",
									},
									map[string]any{
										"var": "fqdn",
									},
									map[string]any{
										"lit": "keys",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"livedns",
									"domains",
									"{fqdn}",
									"keys",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "fqdn",
											"orig": "fqdn",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"fqdn",
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.domain",
						},
					},
				},
			},
			"livedns_nameserver": map[string]any{
				"fields": []any{},
				"name": "livedns_nameserver",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/livedns/domains/{fqdn}/nameservers",
								"segments": []any{
									map[string]any{
										"lit": "livedns",
									},
									map[string]any{
										"lit": "domains",
									},
									map[string]any{
										"var": "fqdn",
									},
									map[string]any{
										"lit": "nameservers",
									},
								},
								"parts": []any{
									"livedns",
									"domains",
									"{fqdn}",
									"nameservers",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "fqdn",
											"orig": "fqdn",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"fqdn",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/livedns/nameservers/{fqdn}",
								"segments": []any{
									map[string]any{
										"lit": "livedns",
									},
									map[string]any{
										"lit": "nameservers",
									},
									map[string]any{
										"var": "fqdn",
									},
								},
								"parts": []any{
									"livedns",
									"nameservers",
									"{fqdn}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "fqdn",
											"orig": "fqdn",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "generic",
									"exist": []any{
										"fqdn",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.domain",
						},
					},
				},
			},
			"livedns_record": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "add_rrset_values",
						"title": "Add Rrset Values",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "message",
						"title": "Message",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "remove_rrset_values",
						"title": "Remove Rrset Values",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "rrset_href",
						"title": "Rrset Href",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "rrset_name",
						"title": "Rrset Name",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "rrset_ttl",
						"title": "Rrset Ttl",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "rrset_type",
						"title": "Rrset Type",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "rrset_values",
						"title": "Rrset Values",
						"type": "`$ARRAY`",
						"req": true,
					},
				},
				"id": map[string]any{
					"field": "id",
					"from": map[string]any{
						"rrset_name": "rrset_name",
						"rrset_type": "rrset_type",
					},
					"name": "id",
					"parts": []any{
						"rrset_name",
						"rrset_type",
					},
					"sep": "/",
				},
				"name": "livedns_record",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/livedns/domains/{fqdn}/records/{rrset_name}/{rrset_type}",
								"segments": []any{
									map[string]any{
										"lit": "livedns",
									},
									map[string]any{
										"lit": "domains",
									},
									map[string]any{
										"var": "fqdn",
									},
									map[string]any{
										"lit": "records",
									},
									map[string]any{
										"var": "rrset_name",
									},
									map[string]any{
										"var": "rrset_type",
									},
								},
								"parts": []any{
									"livedns",
									"domains",
									"{fqdn}",
									"records",
									"{rrset_name}",
									"{rrset_type}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "fqdn",
											"orig": "fqdn",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "rrset_name",
											"orig": "rrset_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "rrset_type",
											"orig": "rrset_type",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"fqdn",
										"rrset_name",
										"rrset_type",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/livedns/domains/{fqdn}/verification/{rrset_name}/{rrset_type}",
								"segments": []any{
									map[string]any{
										"lit": "livedns",
									},
									map[string]any{
										"lit": "domains",
									},
									map[string]any{
										"var": "fqdn",
									},
									map[string]any{
										"lit": "verification",
									},
									map[string]any{
										"var": "rrset_name",
									},
									map[string]any{
										"var": "rrset_type",
									},
								},
								"parts": []any{
									"livedns",
									"domains",
									"{fqdn}",
									"verification",
									"{rrset_name}",
									"{rrset_type}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "fqdn",
											"orig": "fqdn",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "rrset_name",
											"orig": "rrset_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "rrset_type",
											"orig": "rrset_type",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "verification",
									"exist": []any{
										"fqdn",
										"rrset_name",
										"rrset_type",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/livedns/domains/{fqdn}/records/{rrset_name}",
								"segments": []any{
									map[string]any{
										"lit": "livedns",
									},
									map[string]any{
										"lit": "domains",
									},
									map[string]any{
										"var": "fqdn",
									},
									map[string]any{
										"lit": "records",
									},
									map[string]any{
										"var": "rrset_name",
									},
								},
								"parts": []any{
									"livedns",
									"domains",
									"{fqdn}",
									"records",
									"{rrset_name}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "fqdn",
											"orig": "fqdn",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "rrset_name",
											"orig": "rrset_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "name",
									"exist": []any{
										"fqdn",
										"rrset_name",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/livedns/domains/{fqdn}/records",
								"segments": []any{
									map[string]any{
										"lit": "livedns",
									},
									map[string]any{
										"lit": "domains",
									},
									map[string]any{
										"var": "fqdn",
									},
									map[string]any{
										"lit": "records",
									},
								},
								"parts": []any{
									"livedns",
									"domains",
									"{fqdn}",
									"records",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "fqdn",
											"orig": "fqdn",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"fqdn",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/livedns/domains/{fqdn}/records/{rrset_name}",
								"segments": []any{
									map[string]any{
										"lit": "livedns",
									},
									map[string]any{
										"lit": "domains",
									},
									map[string]any{
										"var": "fqdn",
									},
									map[string]any{
										"lit": "records",
									},
									map[string]any{
										"var": "rrset_name",
									},
								},
								"parts": []any{
									"livedns",
									"domains",
									"{fqdn}",
									"records",
									"{rrset_name}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "fqdn",
											"orig": "fqdn",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "rrset_name",
											"orig": "rrset_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "name",
									"exist": []any{
										"fqdn",
										"rrset_name",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/livedns/domains/{fqdn}/records",
								"segments": []any{
									map[string]any{
										"lit": "livedns",
									},
									map[string]any{
										"lit": "domains",
									},
									map[string]any{
										"var": "fqdn",
									},
									map[string]any{
										"lit": "records",
									},
								},
								"parts": []any{
									"livedns",
									"domains",
									"{fqdn}",
									"records",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "fqdn",
											"orig": "fqdn",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
										map[string]any{
											"name": "per_page",
											"orig": "per_page",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "rrset_type",
											"orig": "rrset_type",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "sort_by",
											"orig": "sort_by",
											"type": "`$STRING`",
											"kind": "query",
											"example": "rrset_name",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"fqdn",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/livedns/domains/{fqdn}/records/{rrset_name}/{rrset_type}",
								"segments": []any{
									map[string]any{
										"lit": "livedns",
									},
									map[string]any{
										"lit": "domains",
									},
									map[string]any{
										"var": "fqdn",
									},
									map[string]any{
										"lit": "records",
									},
									map[string]any{
										"var": "rrset_name",
									},
									map[string]any{
										"var": "rrset_type",
									},
								},
								"parts": []any{
									"livedns",
									"domains",
									"{fqdn}",
									"records",
									"{rrset_name}",
									"{rrset_type}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "fqdn",
											"orig": "fqdn",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "rrset_name",
											"orig": "rrset_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "rrset_type",
											"orig": "rrset_type",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"fqdn",
										"rrset_name",
										"rrset_type",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"patch": map[string]any{
						"input": "data",
						"name": "patch",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PATCH",
								"orig": "/livedns/domains/{fqdn}/records/{rrset_name}/{rrset_type}",
								"segments": []any{
									map[string]any{
										"lit": "livedns",
									},
									map[string]any{
										"lit": "domains",
									},
									map[string]any{
										"var": "fqdn",
									},
									map[string]any{
										"lit": "records",
									},
									map[string]any{
										"var": "rrset_name",
									},
									map[string]any{
										"var": "rrset_type",
									},
								},
								"parts": []any{
									"livedns",
									"domains",
									"{fqdn}",
									"records",
									"{rrset_name}",
									"{rrset_type}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "fqdn",
											"orig": "fqdn",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "rrset_name",
											"orig": "rrset_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "rrset_type",
											"orig": "rrset_type",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"fqdn",
										"rrset_name",
										"rrset_type",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/livedns/domains/{fqdn}/records/{rrset_name}/{rrset_type}",
								"segments": []any{
									map[string]any{
										"lit": "livedns",
									},
									map[string]any{
										"lit": "domains",
									},
									map[string]any{
										"var": "fqdn",
									},
									map[string]any{
										"lit": "records",
									},
									map[string]any{
										"var": "rrset_name",
									},
									map[string]any{
										"var": "rrset_type",
									},
								},
								"parts": []any{
									"livedns",
									"domains",
									"{fqdn}",
									"records",
									"{rrset_name}",
									"{rrset_type}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "fqdn",
											"orig": "fqdn",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "rrset_name",
											"orig": "rrset_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "rrset_type",
											"orig": "rrset_type",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"fqdn",
										"rrset_name",
										"rrset_type",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/livedns/domains/{fqdn}/records/{rrset_name}",
								"segments": []any{
									map[string]any{
										"lit": "livedns",
									},
									map[string]any{
										"lit": "domains",
									},
									map[string]any{
										"var": "fqdn",
									},
									map[string]any{
										"lit": "records",
									},
									map[string]any{
										"var": "rrset_name",
									},
								},
								"parts": []any{
									"livedns",
									"domains",
									"{fqdn}",
									"records",
									"{rrset_name}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "fqdn",
											"orig": "fqdn",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "rrset_name",
											"orig": "rrset_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "name",
									"exist": []any{
										"fqdn",
										"rrset_name",
									},
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PUT",
								"orig": "/livedns/domains/{fqdn}/records/{rrset_name}/{rrset_type}",
								"segments": []any{
									map[string]any{
										"lit": "livedns",
									},
									map[string]any{
										"lit": "domains",
									},
									map[string]any{
										"var": "fqdn",
									},
									map[string]any{
										"lit": "records",
									},
									map[string]any{
										"var": "rrset_name",
									},
									map[string]any{
										"var": "rrset_type",
									},
								},
								"parts": []any{
									"livedns",
									"domains",
									"{fqdn}",
									"records",
									"{rrset_name}",
									"{rrset_type}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "fqdn",
											"orig": "fqdn",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "rrset_name",
											"orig": "rrset_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "rrset_type",
											"orig": "rrset_type",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"fqdn",
										"rrset_name",
										"rrset_type",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "PUT",
								"orig": "/livedns/domains/{fqdn}/records/{rrset_name}",
								"segments": []any{
									map[string]any{
										"lit": "livedns",
									},
									map[string]any{
										"lit": "domains",
									},
									map[string]any{
										"var": "fqdn",
									},
									map[string]any{
										"lit": "records",
									},
									map[string]any{
										"var": "rrset_name",
									},
								},
								"parts": []any{
									"livedns",
									"domains",
									"{fqdn}",
									"records",
									"{rrset_name}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "fqdn",
											"orig": "fqdn",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "rrset_name",
											"orig": "rrset_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "name",
									"exist": []any{
										"fqdn",
										"rrset_name",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.domain",
						},
						[]any{
							"$.main.kit.entity.domain",
						},
						[]any{
							"$.main.kit.entity.domain",
						},
					},
				},
			},
			"livedns_rrtype": map[string]any{
				"fields": []any{},
				"name": "livedns_rrtype",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/livedns/dns/rrtypes",
								"segments": []any{
									map[string]any{
										"lit": "livedns",
									},
									map[string]any{
										"lit": "dns",
									},
									map[string]any{
										"lit": "rrtypes",
									},
								},
								"parts": []any{
									"livedns",
									"dns",
									"rrtypes",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"livedns_snapshot": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "automatic",
						"title": "Automatic",
						"type": "`$BOOLEAN`",
						"req": true,
					},
					map[string]any{
						"name": "created_at",
						"title": "Created At",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "href",
						"title": "Href",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "message",
						"title": "Message",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
						},
					},
					map[string]any{
						"name": "zone_data",
						"title": "Zone Data",
						"type": "`$ARRAY`",
						"req": true,
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "livedns_snapshot",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/livedns/domains/{fqdn}/snapshots",
								"segments": []any{
									map[string]any{
										"lit": "livedns",
									},
									map[string]any{
										"lit": "domains",
									},
									map[string]any{
										"var": "fqdn",
									},
									map[string]any{
										"lit": "snapshots",
									},
								},
								"parts": []any{
									"livedns",
									"domains",
									"{fqdn}",
									"snapshots",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "fqdn",
											"orig": "fqdn",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"fqdn",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/livedns/domains/{fqdn}/snapshots",
								"segments": []any{
									map[string]any{
										"lit": "livedns",
									},
									map[string]any{
										"lit": "domains",
									},
									map[string]any{
										"var": "fqdn",
									},
									map[string]any{
										"lit": "snapshots",
									},
								},
								"parts": []any{
									"livedns",
									"domains",
									"{fqdn}",
									"snapshots",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "fqdn",
											"orig": "fqdn",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "automatic",
											"orig": "automatic",
											"type": "`$BOOLEAN`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
										map[string]any{
											"name": "per_page",
											"orig": "per_page",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "sort_by",
											"orig": "sort_by",
											"type": "`$STRING`",
											"kind": "query",
											"example": "date_created",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"fqdn",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/livedns/domains/{fqdn}/snapshots/{id}",
								"segments": []any{
									map[string]any{
										"lit": "livedns",
									},
									map[string]any{
										"lit": "domains",
									},
									map[string]any{
										"var": "fqdn",
									},
									map[string]any{
										"lit": "snapshots",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"livedns",
									"domains",
									"{fqdn}",
									"snapshots",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "fqdn",
											"orig": "fqdn",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"fqdn",
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/livedns/domains/{fqdn}/snapshots/{id}",
								"segments": []any{
									map[string]any{
										"lit": "livedns",
									},
									map[string]any{
										"lit": "domains",
									},
									map[string]any{
										"var": "fqdn",
									},
									map[string]any{
										"lit": "snapshots",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"livedns",
									"domains",
									"{fqdn}",
									"snapshots",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "fqdn",
											"orig": "fqdn",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"fqdn",
										"id",
									},
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PATCH",
								"orig": "/livedns/domains/{fqdn}/snapshots/{id}",
								"segments": []any{
									map[string]any{
										"lit": "livedns",
									},
									map[string]any{
										"lit": "domains",
									},
									map[string]any{
										"var": "fqdn",
									},
									map[string]any{
										"lit": "snapshots",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"livedns",
									"domains",
									"{fqdn}",
									"snapshots",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "fqdn",
											"orig": "fqdn",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"fqdn",
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.domain",
						},
					},
				},
			},
			"livedns_tsig_key": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "config_samples",
						"title": "Config Samples",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "href",
						"title": "Href",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "key_name",
						"title": "Key Name",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "secret",
						"title": "Secret",
						"type": "`$STRING`",
						"req": true,
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "livedns_tsig_key",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/livedns/axfr/tsig",
								"segments": []any{
									map[string]any{
										"lit": "livedns",
									},
									map[string]any{
										"lit": "axfr",
									},
									map[string]any{
										"lit": "tsig",
									},
								},
								"parts": []any{
									"livedns",
									"axfr",
									"tsig",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "sharing_id",
											"orig": "sharing_id",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/livedns/axfr/tsig",
								"segments": []any{
									map[string]any{
										"lit": "livedns",
									},
									map[string]any{
										"lit": "axfr",
									},
									map[string]any{
										"lit": "tsig",
									},
								},
								"parts": []any{
									"livedns",
									"axfr",
									"tsig",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "sharing_id",
											"orig": "sharing_id",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/livedns/axfr/tsig/{id}/config/{software}",
								"segments": []any{
									map[string]any{
										"lit": "livedns",
									},
									map[string]any{
										"lit": "axfr",
									},
									map[string]any{
										"lit": "tsig",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "config",
									},
									map[string]any{
										"var": "software",
									},
								},
								"parts": []any{
									"livedns",
									"axfr",
									"tsig",
									"{id}",
									"config",
									"{software}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "software",
											"orig": "software",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "sharing_id",
											"orig": "sharing_id",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"$action": "config",
									"exist": []any{
										"id",
										"software",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/livedns/axfr/tsig/{id}",
								"segments": []any{
									map[string]any{
										"lit": "livedns",
									},
									map[string]any{
										"lit": "axfr",
									},
									map[string]any{
										"lit": "tsig",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"livedns",
									"axfr",
									"tsig",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "sharing_id",
											"orig": "sharing_id",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"livedns_zone": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "items",
						"title": "Items",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "message",
						"title": "Message",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "remove_apex_ns",
						"title": "Remove Apex Ns",
						"type": "`$BOOLEAN`",
					},
				},
				"name": "livedns_zone",
				"op": map[string]any{
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/livedns/domains/{fqdn}/records",
								"segments": []any{
									map[string]any{
										"lit": "livedns",
									},
									map[string]any{
										"lit": "domains",
									},
									map[string]any{
										"var": "fqdn",
									},
									map[string]any{
										"lit": "records",
									},
								},
								"parts": []any{
									"livedns",
									"domains",
									"{fqdn}",
									"records",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "fqdn",
											"orig": "fqdn",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"fqdn",
									},
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PUT",
								"orig": "/livedns/domains/{fqdn}/records",
								"segments": []any{
									map[string]any{
										"lit": "livedns",
									},
									map[string]any{
										"lit": "domains",
									},
									map[string]any{
										"var": "fqdn",
									},
									map[string]any{
										"lit": "records",
									},
								},
								"parts": []any{
									"livedns",
									"domains",
									"{fqdn}",
									"records",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "fqdn",
											"orig": "fqdn",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"fqdn",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.domain",
						},
					},
				},
			},
			"mailbox": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "address",
						"title": "Address",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "aliases",
						"title": "Aliases",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "antispam",
						"title": "Antispam",
						"type": "`$BOOLEAN`",
						"req": true,
						"op": map[string]any{
							"update": map[string]any{
								"type": "`$BOOLEAN`",
							},
						},
					},
					map[string]any{
						"name": "autorenew",
						"title": "Autorenew",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "config",
						"title": "Config",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "config_name",
						"title": "Config Name",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"update": map[string]any{
								"type": "`$STRING`",
							},
						},
					},
					map[string]any{
						"name": "created_at",
						"title": "Created At",
						"type": "`$STRING`",
						"req": true,
						"format": "date-time",
					},
					map[string]any{
						"name": "data_access",
						"title": "Data Access",
						"type": "`$BOOLEAN`",
						"req": true,
					},
					map[string]any{
						"name": "domain_part",
						"title": "Domain Part",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "duration_month",
						"title": "Duration Month",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "email",
						"title": "Email",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "expires_at",
						"title": "Expires At",
						"type": "`$STRING`",
						"req": true,
						"format": "date-time",
					},
					map[string]any{
						"name": "internal_domain",
						"title": "Internal Domain",
						"type": "`$BOOLEAN`",
						"req": true,
					},
					map[string]any{
						"name": "issues",
						"title": "Issues",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "last_paid_duration",
						"title": "Last Paid Duration",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "local_part",
						"title": "Local Part",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "message",
						"title": "Message",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "owner",
						"title": "Owner",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "password",
						"title": "Password",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"update": map[string]any{
								"type": "`$STRING`",
							},
						},
					},
					map[string]any{
						"name": "quota",
						"title": "Quota",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "quota_used",
						"title": "Quota Used",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "responder",
						"title": "Responder",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "updated_at",
						"title": "Updated At",
						"type": "`$STRING`",
						"req": true,
						"format": "date-time",
					},
					map[string]any{
						"name": "uuid",
						"title": "Uuid",
						"type": "`$STRING`",
						"req": true,
					},
				},
				"name": "mailbox",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/mailbox/mailboxes/{email}/renew",
								"segments": []any{
									map[string]any{
										"lit": "mailbox",
									},
									map[string]any{
										"lit": "mailboxes",
									},
									map[string]any{
										"var": "address",
									},
									map[string]any{
										"lit": "renew",
									},
								},
								"parts": []any{
									"mailbox",
									"mailboxes",
									"{address}",
									"renew",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"email": "address",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"name": "dry_run",
											"orig": "Dry-Run",
											"type": "`$INTEGER`",
											"kind": "header",
										},
									},
									"params": []any{
										map[string]any{
											"name": "address",
											"orig": "email",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "sharing_id",
											"orig": "sharing_id",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"$action": "renew",
									"exist": []any{
										"address",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/mailbox/mailboxes",
								"segments": []any{
									map[string]any{
										"lit": "mailbox",
									},
									map[string]any{
										"lit": "mailboxes",
									},
								},
								"parts": []any{
									"mailbox",
									"mailboxes",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "sharing_id",
											"orig": "sharing_id",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/mailbox/mailboxes",
								"segments": []any{
									map[string]any{
										"lit": "mailbox",
									},
									map[string]any{
										"lit": "mailboxes",
									},
								},
								"parts": []any{
									"mailbox",
									"mailboxes",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "address",
											"orig": "address",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "domain_part",
											"orig": "domain_part",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "local_part",
											"orig": "local_part",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
										map[string]any{
											"name": "per_page",
											"orig": "per_page",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "search",
											"orig": "search",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "sharing_id",
											"orig": "sharing_id",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "sort_by",
											"orig": "sort_by",
											"type": "`$STRING`",
											"kind": "query",
											"example": "id",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/mailbox/mailboxes/{email}",
								"segments": []any{
									map[string]any{
										"lit": "mailbox",
									},
									map[string]any{
										"lit": "mailboxes",
									},
									map[string]any{
										"var": "address",
									},
								},
								"parts": []any{
									"mailbox",
									"mailboxes",
									"{address}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"email": "address",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "address",
											"orig": "email",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "sharing_id",
											"orig": "sharing_id",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"address",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/mailbox/mailboxes/{email}",
								"segments": []any{
									map[string]any{
										"lit": "mailbox",
									},
									map[string]any{
										"lit": "mailboxes",
									},
									map[string]any{
										"var": "address",
									},
								},
								"parts": []any{
									"mailbox",
									"mailboxes",
									"{address}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"email": "address",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "address",
											"orig": "email",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "sharing_id",
											"orig": "sharing_id",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"address",
									},
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PATCH",
								"orig": "/mailbox/mailboxes/{email}",
								"segments": []any{
									map[string]any{
										"lit": "mailbox",
									},
									map[string]any{
										"lit": "mailboxes",
									},
									map[string]any{
										"var": "address",
									},
								},
								"parts": []any{
									"mailbox",
									"mailboxes",
									"{address}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"email": "address",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "address",
											"orig": "email",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"address",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"mailbox_domain": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "antispam",
						"title": "Antispam",
						"type": "`$BOOLEAN`",
						"req": true,
					},
					map[string]any{
						"name": "configuration",
						"title": "Configuration",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "date_last_validation",
						"title": "Date Last Validation",
						"type": "`$STRING`",
						"format": "date-time",
					},
					map[string]any{
						"name": "dkim",
						"title": "Dkim",
						"type": "`$BOOLEAN`",
						"req": true,
					},
					map[string]any{
						"name": "fqdns",
						"title": "Fqdns",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "internal",
						"title": "Internal",
						"type": "`$BOOLEAN`",
						"req": true,
					},
					map[string]any{
						"name": "is_livedns",
						"title": "Is Livedns",
						"type": "`$BOOLEAN`",
						"req": true,
					},
					map[string]any{
						"name": "mx",
						"title": "Mx",
						"type": "`$BOOLEAN`",
						"req": true,
					},
					map[string]any{
						"name": "owner",
						"title": "Owner",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "spf",
						"title": "Spf",
						"type": "`$BOOLEAN`",
						"req": true,
					},
					map[string]any{
						"name": "txt",
						"title": "Txt",
						"type": "`$BOOLEAN`",
						"req": true,
					},
				},
				"name": "mailbox_domain",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/mailbox/domains/{domain}/validate",
								"segments": []any{
									map[string]any{
										"lit": "mailbox",
									},
									map[string]any{
										"lit": "domains",
									},
									map[string]any{
										"var": "domain",
									},
									map[string]any{
										"lit": "validate",
									},
								},
								"parts": []any{
									"mailbox",
									"domains",
									"{domain}",
									"validate",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "domain",
											"orig": "domain",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "validate",
									"exist": []any{
										"domain",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/mailbox/domains",
								"segments": []any{
									map[string]any{
										"lit": "mailbox",
									},
									map[string]any{
										"lit": "domains",
									},
								},
								"parts": []any{
									"mailbox",
									"domains",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
										map[string]any{
											"name": "per_page",
											"orig": "per_page",
											"type": "`$INTEGER`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/mailbox/domains/{domain}",
								"segments": []any{
									map[string]any{
										"lit": "mailbox",
									},
									map[string]any{
										"lit": "domains",
									},
									map[string]any{
										"var": "domain",
									},
								},
								"parts": []any{
									"mailbox",
									"domains",
									"{domain}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "domain",
											"orig": "domain",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"domain",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.domain",
						},
					},
				},
			},
			"mailbox_forward": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "destinations",
						"title": "Destinations",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "message",
						"title": "Message",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "source",
						"title": "Source",
						"type": "`$STRING`",
						"req": true,
					},
				},
				"name": "mailbox_forward",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/mailbox/forwards",
								"segments": []any{
									map[string]any{
										"lit": "mailbox",
									},
									map[string]any{
										"lit": "forwards",
									},
								},
								"parts": []any{
									"mailbox",
									"forwards",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/mailbox/forwards",
								"segments": []any{
									map[string]any{
										"lit": "mailbox",
									},
									map[string]any{
										"lit": "forwards",
									},
								},
								"parts": []any{
									"mailbox",
									"forwards",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
										map[string]any{
											"name": "per_page",
											"orig": "per_page",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "search",
											"orig": "search",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "sharing_id",
											"orig": "sharing_id",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "sort_by",
											"orig": "sort_by",
											"type": "`$STRING`",
											"kind": "query",
											"example": "source",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/mailbox/forwards/{source}",
								"segments": []any{
									map[string]any{
										"lit": "mailbox",
									},
									map[string]any{
										"lit": "forwards",
									},
									map[string]any{
										"var": "source",
									},
								},
								"parts": []any{
									"mailbox",
									"forwards",
									"{source}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "source",
											"orig": "source",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"source",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PUT",
								"orig": "/mailbox/forwards/{source}",
								"segments": []any{
									map[string]any{
										"lit": "mailbox",
									},
									map[string]any{
										"lit": "forwards",
									},
									map[string]any{
										"var": "source",
									},
								},
								"parts": []any{
									"mailbox",
									"forwards",
									"{source}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "source",
											"orig": "source",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"source",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"mailbox_product": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "autorenew",
						"title": "Autorenew",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "config",
						"title": "Config",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "config_name",
						"title": "Config Name",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "duration_month",
						"title": "Duration Month",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "label",
						"title": "Label",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "message",
						"title": "Message",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "prices",
						"title": "Prices",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "quantity",
						"title": "Quantity",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "taxes",
						"title": "Taxes",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "uuid",
						"title": "Uuid",
						"type": "`$STRING`",
						"req": true,
					},
				},
				"name": "mailbox_product",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/mailbox/products",
								"segments": []any{
									map[string]any{
										"lit": "mailbox",
									},
									map[string]any{
										"lit": "products",
									},
								},
								"parts": []any{
									"mailbox",
									"products",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "sharing_id",
											"orig": "sharing_id",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/mailbox/products",
								"segments": []any{
									map[string]any{
										"lit": "mailbox",
									},
									map[string]any{
										"lit": "products",
									},
								},
								"parts": []any{
									"mailbox",
									"products",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "sharing_id",
											"orig": "sharing_id",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"mailbox_quota": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "annually",
						"title": "Annually",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "config_name",
						"title": "Config Name",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "label",
						"title": "Label",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "monthly",
						"title": "Monthly",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "quota",
						"title": "Quota",
						"type": "`$STRING`",
						"req": true,
					},
				},
				"name": "mailbox_quota",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/mailbox/quotas",
								"segments": []any{
									map[string]any{
										"lit": "mailbox",
									},
									map[string]any{
										"lit": "quotas",
									},
								},
								"parts": []any{
									"mailbox",
									"quotas",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "sharing_id",
											"orig": "sharing_id",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"mailbox_slot": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "autorenew",
						"title": "Autorenew",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "config",
						"title": "Config",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "expires_at",
						"title": "Expires At",
						"type": "`$STRING`",
						"format": "date-time",
					},
					map[string]any{
						"name": "last_paid_duration",
						"title": "Last Paid Duration",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "refund_info",
						"title": "Refund Info",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "refundable",
						"title": "Refundable",
						"type": "`$BOOLEAN`",
						"req": true,
					},
					map[string]any{
						"name": "uuid",
						"title": "Uuid",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "webhosting_pack",
						"title": "Webhosting Pack",
						"type": "`$BOOLEAN`",
						"req": true,
					},
				},
				"name": "mailbox_slot",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/mailbox/slots",
								"segments": []any{
									map[string]any{
										"lit": "mailbox",
									},
									map[string]any{
										"lit": "slots",
									},
								},
								"parts": []any{
									"mailbox",
									"slots",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "config_name",
											"orig": "config_name",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "expires_at_gte",
											"orig": "expires_at_gte",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "expires_at_lte",
											"orig": "expires_at_lte",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "last_paid_duration",
											"orig": "last_paid_duration",
											"type": "`$INTEGER`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
										map[string]any{
											"name": "per_page",
											"orig": "per_page",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "refundable",
											"orig": "refundable",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "sharing_id",
											"orig": "sharing_id",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "sort_by",
											"orig": "sort_by",
											"type": "`$STRING`",
											"kind": "query",
											"example": "refund_expires_at",
										},
										map[string]any{
											"name": "webhosting_pack",
											"orig": "webhosting_pack",
											"type": "`$BOOLEAN`",
											"kind": "query",
											"field": true,
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/mailbox/slots/{slot_id}",
								"segments": []any{
									map[string]any{
										"lit": "mailbox",
									},
									map[string]any{
										"lit": "slots",
									},
									map[string]any{
										"var": "uuid",
									},
								},
								"parts": []any{
									"mailbox",
									"slots",
									"{uuid}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"slot_id": "uuid",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "uuid",
											"orig": "slot_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"uuid",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"organization": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "city",
						"title": "City",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"update": map[string]any{
								"type": "`$STRING`",
							},
						},
					},
					map[string]any{
						"name": "corporate",
						"title": "Corporate",
						"type": "`$BOOLEAN`",
						"req": true,
						"op": map[string]any{
							"list": map[string]any{
								"type": "`$BOOLEAN`",
							},
						},
					},
					map[string]any{
						"name": "country",
						"title": "Country",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
							"update": map[string]any{
								"type": "`$STRING`",
							},
						},
					},
					map[string]any{
						"name": "email",
						"title": "Email",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"list": map[string]any{
								"type": "`$STRING`",
							},
							"update": map[string]any{
								"type": "`$STRING`",
							},
						},
					},
					map[string]any{
						"name": "fax",
						"title": "Fax",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "firstname",
						"title": "Firstname",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"list": map[string]any{
								"type": "`$STRING`",
							},
							"update": map[string]any{
								"type": "`$STRING`",
							},
						},
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "lang",
						"title": "Lang",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "lastname",
						"title": "Lastname",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"list": map[string]any{
								"type": "`$STRING`",
							},
							"update": map[string]any{
								"type": "`$STRING`",
							},
						},
					},
					map[string]any{
						"name": "message",
						"title": "Message",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"update": map[string]any{
								"type": "`$STRING`",
							},
						},
					},
					map[string]any{
						"name": "orgname",
						"title": "Orgname",
						"type": "`$STRING`",
						"op": map[string]any{
							"create": map[string]any{
								"req": true,
								"type": "`$STRING`",
							},
						},
					},
					map[string]any{
						"name": "phone",
						"title": "Phone",
						"type": "`$STRING`",
						"op": map[string]any{
							"create": map[string]any{
								"req": true,
								"type": "`$STRING`",
							},
						},
					},
					map[string]any{
						"name": "reference",
						"title": "Reference",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "reseller",
						"title": "Reseller",
						"type": "`$BOOLEAN`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$BOOLEAN`",
							},
							"list": map[string]any{
								"type": "`$BOOLEAN`",
							},
							"update": map[string]any{
								"type": "`$BOOLEAN`",
							},
						},
					},
					map[string]any{
						"name": "siren",
						"title": "Siren",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "state",
						"title": "State",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "streetaddr",
						"title": "Streetaddr",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"update": map[string]any{
								"type": "`$STRING`",
							},
						},
					},
					map[string]any{
						"name": "streetaddr2",
						"title": "Streetaddr2",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"list": map[string]any{
								"type": "`$STRING`",
							},
						},
					},
					map[string]any{
						"name": "vat_number",
						"title": "Vat Number",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "zip",
						"title": "Zip",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
							"update": map[string]any{
								"type": "`$STRING`",
							},
						},
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "organization",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/organization/organizations/{org_id}/action",
								"segments": []any{
									map[string]any{
										"lit": "organization",
									},
									map[string]any{
										"lit": "organizations",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "action",
									},
								},
								"parts": []any{
									"organization",
									"organizations",
									"{id}",
									"action",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"org_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "org_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "action",
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/organization/organizations",
								"segments": []any{
									map[string]any{
										"lit": "organization",
									},
									map[string]any{
										"lit": "organizations",
									},
								},
								"parts": []any{
									"organization",
									"organizations",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/organization/organizations",
								"segments": []any{
									map[string]any{
										"lit": "organization",
									},
									map[string]any{
										"lit": "organizations",
									},
								},
								"parts": []any{
									"organization",
									"organizations",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "name",
											"orig": "name",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "permission",
											"orig": "permission",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "sort_by",
											"orig": "sort_by",
											"type": "`$STRING`",
											"kind": "query",
											"example": "name",
										},
										map[string]any{
											"name": "type",
											"orig": "type",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "~name",
											"orig": "~name",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/organization/organizations/{org_id}",
								"segments": []any{
									map[string]any{
										"lit": "organization",
									},
									map[string]any{
										"lit": "organizations",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"organization",
									"organizations",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"org_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "org_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/organization/organizations/{org_id}",
								"segments": []any{
									map[string]any{
										"lit": "organization",
									},
									map[string]any{
										"lit": "organizations",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"organization",
									"organizations",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"org_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "org_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PATCH",
								"orig": "/organization/organizations/{org_id}",
								"segments": []any{
									map[string]any{
										"lit": "organization",
									},
									map[string]any{
										"lit": "organizations",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"organization",
									"organizations",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"org_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "org_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"organization_customer": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "city",
						"title": "City",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"update": map[string]any{
								"type": "`$STRING`",
							},
						},
					},
					map[string]any{
						"name": "country",
						"title": "Country",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"update": map[string]any{
								"type": "`$STRING`",
							},
						},
					},
					map[string]any{
						"name": "email",
						"title": "Email",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"update": map[string]any{
								"type": "`$STRING`",
							},
						},
					},
					map[string]any{
						"name": "fax",
						"title": "Fax",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "firstname",
						"title": "Firstname",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"update": map[string]any{
								"type": "`$STRING`",
							},
						},
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "lang",
						"title": "Lang",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "lastname",
						"title": "Lastname",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"update": map[string]any{
								"type": "`$STRING`",
							},
						},
					},
					map[string]any{
						"name": "message",
						"title": "Message",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "orgname",
						"title": "Orgname",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "phone",
						"title": "Phone",
						"type": "`$STRING`",
						"op": map[string]any{
							"create": map[string]any{
								"req": true,
								"type": "`$STRING`",
							},
						},
					},
					map[string]any{
						"name": "reference",
						"title": "Reference",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "siren",
						"title": "Siren",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "state",
						"title": "State",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "streetaddr",
						"title": "Streetaddr",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"update": map[string]any{
								"type": "`$STRING`",
							},
						},
					},
					map[string]any{
						"name": "streetaddr2",
						"title": "Streetaddr2",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "sync_contact_email",
						"title": "Sync Contact Email",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "vat_number",
						"title": "Vat Number",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "zip",
						"title": "Zip",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "organization_customer",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/organization/organizations/{org_id}/customers",
								"segments": []any{
									map[string]any{
										"lit": "organization",
									},
									map[string]any{
										"lit": "organizations",
									},
									map[string]any{
										"var": "org_id",
									},
									map[string]any{
										"lit": "customers",
									},
								},
								"parts": []any{
									"organization",
									"organizations",
									"{org_id}",
									"customers",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "org_id",
											"orig": "org_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"org_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/organization/organizations/{org_id}/customers",
								"segments": []any{
									map[string]any{
										"lit": "organization",
									},
									map[string]any{
										"lit": "organizations",
									},
									map[string]any{
										"var": "org_id",
									},
									map[string]any{
										"lit": "customers",
									},
								},
								"parts": []any{
									"organization",
									"organizations",
									"{org_id}",
									"customers",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "org_id",
											"orig": "org_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "name",
											"orig": "name",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
										map[string]any{
											"name": "per_page",
											"orig": "per_page",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "permission",
											"orig": "permission",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "sort_by",
											"orig": "sort_by",
											"type": "`$STRING`",
											"kind": "query",
											"example": "name",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"org_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/organization/organizations/{org_id}/customers/{id}",
								"segments": []any{
									map[string]any{
										"lit": "organization",
									},
									map[string]any{
										"lit": "organizations",
									},
									map[string]any{
										"var": "org_id",
									},
									map[string]any{
										"lit": "customers",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"organization",
									"organizations",
									"{org_id}",
									"customers",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "org_id",
											"orig": "org_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"org_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/organization/organizations/{org_id}/customers/{id}",
								"segments": []any{
									map[string]any{
										"lit": "organization",
									},
									map[string]any{
										"lit": "organizations",
									},
									map[string]any{
										"var": "org_id",
									},
									map[string]any{
										"lit": "customers",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"organization",
									"organizations",
									"{org_id}",
									"customers",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "org_id",
											"orig": "org_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"org_id",
									},
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PATCH",
								"orig": "/organization/organizations/{org_id}/customers/{id}",
								"segments": []any{
									map[string]any{
										"lit": "organization",
									},
									map[string]any{
										"lit": "organizations",
									},
									map[string]any{
										"var": "org_id",
									},
									map[string]any{
										"lit": "customers",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"organization",
									"organizations",
									"{org_id}",
									"customers",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "org_id",
											"orig": "org_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"org_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.organization",
						},
					},
				},
			},
			"template": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
							"update": map[string]any{
								"type": "`$STRING`",
							},
						},
					},
					map[string]any{
						"name": "editable",
						"title": "Editable",
						"type": "`$BOOLEAN`",
						"req": true,
					},
					map[string]any{
						"name": "href",
						"title": "Href",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"update": map[string]any{
								"type": "`$STRING`",
							},
						},
					},
					map[string]any{
						"name": "namespaces",
						"title": "Namespaces",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "orgname",
						"title": "Orgname",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "payload",
						"title": "Payload",
						"type": "`$OBJECT`",
						"req": true,
						"op": map[string]any{
							"update": map[string]any{
								"type": "`$OBJECT`",
							},
						},
					},
					map[string]any{
						"name": "sharing_space",
						"title": "Sharing Space",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "variables",
						"title": "Variables",
						"type": "`$ARRAY`",
						"req": true,
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "template",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/template/templates",
								"segments": []any{
									map[string]any{
										"lit": "template",
									},
									map[string]any{
										"lit": "templates",
									},
								},
								"parts": []any{
									"template",
									"templates",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "sharing_id",
											"orig": "sharing_id",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/template/templates",
								"segments": []any{
									map[string]any{
										"lit": "template",
									},
									map[string]any{
										"lit": "templates",
									},
								},
								"parts": []any{
									"template",
									"templates",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
										map[string]any{
											"name": "per_page",
											"orig": "per_page",
											"type": "`$INTEGER`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/template/templates/{id}",
								"segments": []any{
									map[string]any{
										"lit": "template",
									},
									map[string]any{
										"lit": "templates",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"template",
									"templates",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/template/templates/{id}",
								"segments": []any{
									map[string]any{
										"lit": "template",
									},
									map[string]any{
										"lit": "templates",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"template",
									"templates",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PATCH",
								"orig": "/template/templates/{id}",
								"segments": []any{
									map[string]any{
										"lit": "template",
									},
									map[string]any{
										"lit": "templates",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"template",
									"templates",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"template_dispatch": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "attempt",
						"title": "Attempt",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "created_at",
						"title": "Created At",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "dispatch_href",
						"title": "Dispatch Href",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "message",
						"title": "Message",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "object_id",
						"title": "Object Id",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "object_type",
						"title": "Object Type",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "payload",
						"title": "Payload",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "sharing_id",
						"title": "Sharing Id",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "state",
						"title": "State",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "state_msg",
						"title": "State Msg",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "target",
						"title": "Target",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "target_id",
						"title": "Target Id",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "target_type",
						"title": "Target Type",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "task_history",
						"title": "Task History",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "task_status",
						"title": "Task Status",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "task_updated_at",
						"title": "Task Updated At",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "template_id",
						"title": "Template Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "template_name",
						"title": "Template Name",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "template_dispatch",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/template/templates/{id}",
								"segments": []any{
									map[string]any{
										"lit": "template",
									},
									map[string]any{
										"lit": "templates",
									},
									map[string]any{
										"var": "template_id",
									},
								},
								"parts": []any{
									"template",
									"templates",
									"{template_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"id": "template_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "template_id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"template_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/template/dispatch/{id}",
								"segments": []any{
									map[string]any{
										"lit": "template",
									},
									map[string]any{
										"lit": "dispatch",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"template",
									"dispatch",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.template",
						},
					},
				},
			},
			"tld": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "authinfo_for_transfer",
						"title": "Authinfo For Transfer",
						"type": "`$BOOLEAN`",
						"req": true,
					},
					map[string]any{
						"name": "category",
						"title": "Category",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "change_owner",
						"title": "Change Owner",
						"type": "`$BOOLEAN`",
						"req": true,
					},
					map[string]any{
						"name": "corporate",
						"title": "Corporate",
						"type": "`$BOOLEAN`",
						"req": true,
					},
					map[string]any{
						"name": "ext_trade",
						"title": "Ext Trade",
						"type": "`$BOOLEAN`",
						"req": true,
					},
					map[string]any{
						"name": "full_tld",
						"title": "Full Tld",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "href",
						"title": "Href",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "lock",
						"title": "Lock",
						"type": "`$BOOLEAN`",
						"req": true,
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
					},
				},
				"name": "tld",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/domain/tlds",
								"segments": []any{
									map[string]any{
										"lit": "domain",
									},
									map[string]any{
										"lit": "tlds",
									},
								},
								"parts": []any{
									"domain",
									"tlds",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "category",
											"orig": "category",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
										map[string]any{
											"name": "per_page",
											"orig": "per_page",
											"type": "`$INTEGER`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/domain/tlds/{name}",
								"segments": []any{
									map[string]any{
										"lit": "domain",
									},
									map[string]any{
										"lit": "tlds",
									},
									map[string]any{
										"var": "name",
									},
								},
								"parts": []any{
									"domain",
									"tlds",
									"{name}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "name",
											"orig": "name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"name",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"user": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "city",
						"title": "City",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "country",
						"title": "Country",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "email",
						"title": "Email",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "fax",
						"title": "Fax",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "firstname",
						"title": "Firstname",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "lang",
						"title": "Lang",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "lastname",
						"title": "Lastname",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "phone",
						"title": "Phone",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "state",
						"title": "State",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "streetaddr",
						"title": "Streetaddr",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "streetaddr2",
						"title": "Streetaddr2",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "username",
						"title": "Username",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "zip",
						"title": "Zip",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "user",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/organization/user-info",
								"segments": []any{
									map[string]any{
										"lit": "organization",
									},
									map[string]any{
										"lit": "user-info",
									},
								},
								"parts": []any{
									"organization",
									"user-info",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "debug":
		if NewDebugFeatureFunc != nil {
			return NewDebugFeatureFunc()
		}
	case "idempotency":
		if NewIdempotencyFeatureFunc != nil {
			return NewIdempotencyFeatureFunc()
		}
	case "metrics":
		if NewMetricsFeatureFunc != nil {
			return NewMetricsFeatureFunc()
		}
	case "paging":
		if NewPagingFeatureFunc != nil {
			return NewPagingFeatureFunc()
		}
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "secrets":
		if NewSecretsFeatureFunc != nil {
			return NewSecretsFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
