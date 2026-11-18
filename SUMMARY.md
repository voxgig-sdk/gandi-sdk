# Gandi API

Gandi&#39;s v5 API manages domain names, LiveDNS zones, SSL certificates, ACME subscriptions, mailboxes, web hosting and organizations at Gandi, the domain registrar and host.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 61 entities and 221 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### [AccessToken](docs/api/access_token.html)

Renew the Personal Access Token the call is made with.

Results: OK; Created.

SDK operations: `create`.

### [AcmeAccount](docs/api/acme_account.html)

The ACME accounts of a subscription: list them or get one.

Results: OK.

SDK operations: `list`, `load`.

### [AcmeDomain](docs/api/acme_domain.html)

The domains of an ACME subscription: list them or get one.

Results: OK.

SDK operations: `list`, `load`.

### [AcmePrice](docs/api/acme_price.html)

ACME catalog prices, and a quote for a list of domains (create).

Results: OK.

SDK operations: `create`, `list`.

### [AcmeSubscription](docs/api/acme_subscription.html)

An ACME subscription: list, create, get, rename or delete one, or change its domains (`domains`).

Results: OK.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

### [BillingInfo](docs/api/billing_info.html)

Billing information: prepaid balance and price grid, for your account or an organization.

Results: OK.

SDK operations: `load`.

### [BillingPrice](docs/api/billing_price.html)

Catalog prices for one product type.

Results: OK.

SDK operations: `load`.

### [CertificateDcv](docs/api/certificate_dcv.html)

A certificate&#39;s domain control validation: resend it (update) or change its method (patch).

Results: Created; Accepted.

SDK operations: `patch`, `update`.

### [CertificatePackage](docs/api/certificate_package.html)

The certificate packages on offer: list them or get one.

Results: OK.

SDK operations: `list`, `load`.

### [CertificatePem](docs/api/certificate_pem.html)

An intermediate certificate, as PEM text, by type or by file name.

Results: OK.

SDK operations: `load`.

### [CertificateRenewal](docs/api/certificate_renewal.html)

Renew an issued certificate.

Results: OK; Accepted.

SDK operations: `create`.

### [CertificateTag](docs/api/certificate_tag.html)

A certificate&#39;s tags: list, add, replace, change or remove them.

Results: Created; OK.

SDK operations: `create`, `list`, `patch`, `remove`, `update`.

### [Comment](docs/api/comment.html)

The comment on a Gandi product, by the product id: get, set or delete it.

Results: OK; Accepted; No Content.

SDK operations: `create`, `load`, `remove`.

### [Domain](docs/api/domain.html)

A registered domain: list, register, get or delete one, and its actions authinfo, autorenew, status, reachability, createstatus, renew, restore and transferout.

Results: OK; Accepted; Created.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

### [DomainAvailability](docs/api/domain_availability.html)

Whether a domain name is available, with its products, prices and taxes.

Results: OK.

SDK operations: `load`.

### [DomainChangeOwner](docs/api/domain_change_owner.html)

A change of a domain&#39;s owner: start it, follow it, or resend its emails (`foa`).

Results: OK; Accepted.

SDK operations: `create`, `load`.

### [DomainClaim](docs/api/domain_claim.html)

Trademark claims on a domain name: get them, or accept them.

Results: Created; OK.

SDK operations: `create`, `load`.

### [DomainContact](docs/api/domain_contact.html)

A domain&#39;s contacts: get or update them, or change its owner (`owner`).

Results: OK; Accepted.

SDK operations: `load`, `update`.

### [DomainDnskey](docs/api/domain_dnskey.html)

A domain&#39;s DNSSEC keys at the registry: list, add or delete one, or replace them all (update).

Results: Accepted; OK.

SDK operations: `create`, `list`, `remove`, `update`.

### [DomainDnssec](docs/api/domain_dnssec.html)

DNSSEC for a domain on LiveDNS: get its status, turn it on or turn it off.

Results: Accepted; OK.

SDK operations: `create`, `load`, `remove`.

### [DomainHost](docs/api/domain_host.html)

A domain&#39;s glue records, by host name: list, create, get, update or delete one.

Results: OK; Accepted.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

### [DomainLivedns](docs/api/domain_livedns.html)

A domain&#39;s LiveDNS status, and switching the domain to LiveDNS (create).

Results: Accepted; OK.

SDK operations: `create`, `load`.

### [DomainNameserver](docs/api/domain_nameserver.html)

A domain&#39;s nameservers: list them or replace them.

Results: OK; Accepted.

SDK operations: `list`, `update`.

### [DomainTag](docs/api/domain_tag.html)

A domain&#39;s tags: list, add, replace, change or remove them.

Results: Created; OK.

SDK operations: `create`, `list`, `patch`, `remove`, `update`.

### [DomainTransfer](docs/api/domain_transfer.html)

A transfer of a domain to Gandi: start it, follow it, relaunch it, update its authorization code (`authinfo`), check it is possible (`available`) or resend its emails (`foa`).

Results: OK; Accepted.

SDK operations: `create`, `load`, `update`.

### [DomainWebredir](docs/api/domain_webredir.html)

A domain&#39;s web redirections, by host: list, create, get, update or delete one.

Results: OK; Created.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

### [EmailForward](docs/api/email_forward.html)

A forwarding address in the deprecated Email API, per domain: list, create, update or delete one.

Results: Created; OK; Accepted.

SDK operations: `create`, `list`, `remove`, `update`.

### [EmailMailbox](docs/api/email_mailbox.html)

A mailbox in the deprecated Email API, per domain: list, create, get, update or delete one, purge it (`purge`), renew it (`renew`) or renew them all (`renew_all`).

Results: OK; Accepted.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

### [EmailMigration](docs/api/email_migration.html)

A domain&#39;s migration from the Email API to Mailbox: get its details or start it.

Results: Accepted; OK.

SDK operations: `create`, `load`.

### [EmailOffer](docs/api/email_offer.html)

A domain&#39;s email offer in the deprecated Email API: get or update it.

Results: OK; Accepted.

SDK operations: `load`, `update`.

### [EmailSlot](docs/api/email_slot.html)

A mailbox slot in the deprecated Email API, per domain: list, create, get or refund one.

Results: OK; Accepted.

SDK operations: `create`, `list`, `load`, `remove`.

### [HostingApplication](docs/api/hosting_application.html)

The applications Web Hosting can run: list them or get one.

Results: OK.

SDK operations: `list`, `load`.

### [HostingInstance](docs/api/hosting_instance.html)

A Web Hosting instance: list, create, get, update or delete one, act on it (`action`) or get its usage (`usage`).

Results: Accepted; No Content; OK.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

### [HostingVhost](docs/api/hosting_vhost.html)

A Web Hosting instance&#39;s virtual hosts, by fqdn: list, create, get, update or delete one, or purge its cache (`cache`).

Results: Accepted; OK; No Content.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

### [IssuedCertificate](docs/api/issued_certificate.html)

An SSL certificate: list, order, get, update or revoke one, retrieve it as PEM (`crt`), or get DCV parameters (`dcv_params`).

Results: OK; Accepted; No Content.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

### [LinkedZone](docs/api/linked_zone.html)

A linked zone: list, create, get, update or delete one.

Results: Created; OK; No Content.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

### [LinkedZoneDeployment](docs/api/linked_zone_deployment.html)

Deploy or undeploy a linked zone.

Results: Accepted.

SDK operations: `create`.

### [LinkedZoneDomain](docs/api/linked_zone_domain.html)

The domains using linked zones: list them, get one, link domains to a zone (`link`) or unlink them (`unlink`).

Results: OK.

SDK operations: `list`, `load`, `update`.

### [LinkedZoneTask](docs/api/linked_zone_task.html)

Linked zone tasks: list them or get one.

Results: OK.

SDK operations: `list`, `load`.

### [LivednsAxfrSlave](docs/api/livedns_axfr_slave.html)

A zone&#39;s secondary servers, by IP address: list, add or remove one.

Results: OK; Accepted; Created.

SDK operations: `list`, `remove`, `update`.

### [LivednsAxfrTsig](docs/api/livedns_axfr_tsig.html)

The TSIG keys a zone uses for transfers: list them, associate one or remove one.

Results: OK; Accepted; Created.

SDK operations: `list`, `remove`, `update`.

### [LivednsDomain](docs/api/livedns_domain.html)

A domain on LiveDNS, by fqdn: list, add, get or update one.

Results: Created; OK.

SDK operations: `create`, `list`, `load`, `update`.

### [LivednsKey](docs/api/livedns_key.html)

A zone&#39;s DNSSEC keys on LiveDNS: list, create, get, undelete (update) or delete one.

Results: Created; OK; No Content.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

### [LivednsNameserver](docs/api/livedns_nameserver.html)

A zone&#39;s nameservers, or the generic nameservers LiveDNS would give it (`generic`).

Results: OK.

SDK operations: `list`.

### [LivednsRecord](docs/api/livedns_record.html)

A DNS record set, by fqdn, `rrset_name` and `rrset_type`: list, create, get, replace, update or delete one; every record of one name (`name`); or a verification record (`verification`).

Results: OK; Created; No Content.

SDK operations: `create`, `list`, `load`, `patch`, `remove`, `update`.

### [LivednsRrtype](docs/api/livedns_rrtype.html)

The DNS record types LiveDNS supports.

Results: OK.

SDK operations: `list`.

### [LivednsSnapshot](docs/api/livedns_snapshot.html)

A zone&#39;s snapshots: list, take, get, rename or delete one.

Results: Created; OK; No Content; Accepted.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

### [LivednsTsigKey](docs/api/livedns_tsig_key.html)

A TSIG key for zone transfers: list, create or get one, or its configuration for a DNS server (`config`).

Results: Created; OK.

SDK operations: `create`, `list`, `load`.

### [LivednsZone](docs/api/livedns_zone.html)

A zone&#39;s whole record set, by fqdn: replace every record (update) or delete every record (remove).

Results: No Content; Created.

SDK operations: `remove`, `update`.

### [Mailbox](docs/api/mailbox.html)

A mailbox, by address: list, create, get, update or delete one, or renew it (`renew`).

Results: OK; Accepted; No Content.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

### [MailboxDomain](docs/api/mailbox_domain.html)

The domains used for mail: list them, get one&#39;s DNS configuration, or check it (`validate`).

Results: Accepted; OK.

SDK operations: `create`, `list`, `load`.

### [MailboxForward](docs/api/mailbox_forward.html)

A forwarding address: list, create, update or delete one.

Results: Created; OK.

SDK operations: `create`, `list`, `remove`, `update`.

### [MailboxProduct](docs/api/mailbox_product.html)

The mailbox products on offer, and buying one (create).

Results: Accepted; OK.

SDK operations: `create`, `list`.

### [MailboxQuota](docs/api/mailbox_quota.html)

Mailboxes available and in use, per offer.

Results: OK.

SDK operations: `list`.

### [MailboxSlot](docs/api/mailbox_slot.html)

A mailbox slot: list them or get one.

Results: OK.

SDK operations: `list`, `load`.

### [Organization](docs/api/organization.html)

An organization: list, create, get, update or delete one.

Results: Created; Accepted; OK; No Content.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

### [OrganizationCustomer](docs/api/organization_customer.html)

An organization&#39;s customers: list, create, get, update or delete one.

Results: Created; OK; No Content; Accepted.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

### [Template](docs/api/template.html)

A configuration template: list, create, get, update or delete one.

Results: Created; OK; No Content.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

### [TemplateDispatch](docs/api/template_dispatch.html)

Applying a template (create), and the dispatch that results.

Results: Accepted; OK.

SDK operations: `create`, `load`.

### [Tld](docs/api/tld.html)

The top-level domains on offer: list them or get one.

Results: OK.

SDK operations: `list`, `load`.

### [User](docs/api/user.html)

The user the token belongs to.

Results: OK.

SDK operations: `load`.

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| [AccessToken](docs/api/access_token.html) | `create` | `POST /organization/access-tokens` | Required |
| [AcmeAccount](docs/api/acme_account.html) | `list` | `GET /acme/subscriptions/{subscription_id}/accounts` | Required |
| [AcmeAccount](docs/api/acme_account.html) | `load` | `GET /acme/subscriptions/{subscription_id}/accounts/{account_id}` | Required |
| [AcmeDomain](docs/api/acme_domain.html) | `list` | `GET /acme/subscriptions/{subscription_id}/domains` | Required |
| [AcmeDomain](docs/api/acme_domain.html) | `load` | `GET /acme/subscriptions/{subscription_id}/domains/{domain_id}` | Required |
| [AcmePrice](docs/api/acme_price.html) | `create` | `POST /acme/quote` | Required |
| [AcmePrice](docs/api/acme_price.html) | `list` | `GET /acme/catalog` | Required |
| [AcmeSubscription](docs/api/acme_subscription.html) | `create` | `POST /acme/subscriptions` | Required |
| [AcmeSubscription](docs/api/acme_subscription.html) | `list` | `GET /acme/subscriptions` | Required |
| [AcmeSubscription](docs/api/acme_subscription.html) | `load` | `GET /acme/subscriptions/{subscription_id}` | Required |
| [AcmeSubscription](docs/api/acme_subscription.html) | `remove` | `DELETE /acme/subscriptions/{subscription_id}` | Required |
| [AcmeSubscription](docs/api/acme_subscription.html) | `update` | `PATCH /acme/subscriptions/{subscription_id}` | Required |
| [AcmeSubscription](docs/api/acme_subscription.html) | `update` | `PATCH /acme/subscriptions/{subscription_id}/domains` | Required |
| [BillingInfo](docs/api/billing_info.html) | `load` | `GET /billing/info/{sharing_id}` | Required |
| [BillingInfo](docs/api/billing_info.html) | `load` | `GET /billing/info` | Required |
| [BillingPrice](docs/api/billing_price.html) | `load` | `GET /billing/price/{type}` | Required |
| [CertificateDcv](docs/api/certificate_dcv.html) | `patch` | `PATCH /certificate/issued-certs/{id}/dcv` | Required |
| [CertificateDcv](docs/api/certificate_dcv.html) | `update` | `PUT /certificate/issued-certs/{id}/dcv` | Required |
| [CertificatePackage](docs/api/certificate_package.html) | `list` | `GET /certificate/packages` | Required |
| [CertificatePackage](docs/api/certificate_package.html) | `load` | `GET /certificate/packages/{name}` | Required |
| [CertificatePem](docs/api/certificate_pem.html) | `load` | `GET /certificate/pem/-/{filename}` | Required |
| [CertificatePem](docs/api/certificate_pem.html) | `load` | `GET /certificate/pem/{type}` | Required |
| [CertificateRenewal](docs/api/certificate_renewal.html) | `create` | `POST /certificate/issued-certs/{id}` | Required |
| [CertificateTag](docs/api/certificate_tag.html) | `create` | `POST /certificate/issued-certs/{id}/tags` | Required |
| [CertificateTag](docs/api/certificate_tag.html) | `list` | `GET /certificate/issued-certs/{id}/tags` | Required |
| [CertificateTag](docs/api/certificate_tag.html) | `patch` | `PATCH /certificate/issued-certs/{id}/tags` | Required |
| [CertificateTag](docs/api/certificate_tag.html) | `remove` | `DELETE /certificate/issued-certs/{id}/tags` | Required |
| [CertificateTag](docs/api/certificate_tag.html) | `update` | `PUT /certificate/issued-certs/{id}/tags` | Required |
| [Comment](docs/api/comment.html) | `create` | `POST /comment/comments/{id}` | Required |
| [Comment](docs/api/comment.html) | `load` | `GET /comment/comments/{id}` | Required |
| [Comment](docs/api/comment.html) | `remove` | `DELETE /comment/comments/{id}` | Required |
| [Domain](docs/api/domain.html) | `create` | `POST /domain/domains/{domain}/renew` | Required |
| [Domain](docs/api/domain.html) | `create` | `POST /domain/domains/{domain}/restore` | Required |
| [Domain](docs/api/domain.html) | `create` | `POST /domain/domains/{domain}/transferout` | Required |
| [Domain](docs/api/domain.html) | `create` | `POST /domain/domains` | Required |
| [Domain](docs/api/domain.html) | `list` | `GET /domain/domains` | Required |
| [Domain](docs/api/domain.html) | `load` | `GET /domain/domains/{domain}` | Required |
| [Domain](docs/api/domain.html) | `load` | `GET /domain/domains/{domain}/createstatus` | Required |
| [Domain](docs/api/domain.html) | `load` | `GET /domain/domains/{domain}/renew` | Required |
| [Domain](docs/api/domain.html) | `load` | `GET /domain/domains/{domain}/restore` | Required |
| [Domain](docs/api/domain.html) | `remove` | `DELETE /domain/domains/{domain}` | Required |
| [Domain](docs/api/domain.html) | `update` | `PUT /domain/domains/{domain}/authinfo` | Required |
| [Domain](docs/api/domain.html) | `update` | `PATCH /domain/domains/{domain}/autorenew` | Required |
| [Domain](docs/api/domain.html) | `update` | `PATCH /domain/domains/{domain}/reachability` | Required |
| [Domain](docs/api/domain.html) | `update` | `PATCH /domain/domains/{domain}/status` | Required |
| [DomainAvailability](docs/api/domain_availability.html) | `load` | `GET /domain/check` | Required |
| [DomainChangeOwner](docs/api/domain_change_owner.html) | `create` | `POST /domain/changeowner/{domain}` | Required |
| [DomainChangeOwner](docs/api/domain_change_owner.html) | `create` | `POST /domain/changeowner/{domain}/foa` | Required |
| [DomainChangeOwner](docs/api/domain_change_owner.html) | `load` | `GET /domain/changeowner/{domain}` | Required |
| [DomainClaim](docs/api/domain_claim.html) | `create` | `POST /domain/domains/{domain}/claims` | Required |
| [DomainClaim](docs/api/domain_claim.html) | `load` | `GET /domain/domains/{domain}/claims` | Required |
| [DomainContact](docs/api/domain_contact.html) | `load` | `GET /domain/domains/{domain}/contacts` | Required |
| [DomainContact](docs/api/domain_contact.html) | `update` | `PATCH /domain/domains/{domain}/contacts` | Required |
| [DomainContact](docs/api/domain_contact.html) | `update` | `PUT /domain/domains/{domain}/contacts/owner` | Required |
| [DomainDnskey](docs/api/domain_dnskey.html) | `create` | `POST /domain/domains/{domain}/dnskeys` | Required |
| [DomainDnskey](docs/api/domain_dnskey.html) | `list` | `GET /domain/domains/{domain}/dnskeys` | Required |
| [DomainDnskey](docs/api/domain_dnskey.html) | `remove` | `DELETE /domain/domains/{domain}/dnskeys/{id}` | Required |
| [DomainDnskey](docs/api/domain_dnskey.html) | `update` | `PUT /domain/domains/{domain}/dnskeys` | Required |
| [DomainDnssec](docs/api/domain_dnssec.html) | `create` | `POST /domain/domains/{domain}/livedns/dnssec` | Required |
| [DomainDnssec](docs/api/domain_dnssec.html) | `load` | `GET /domain/domains/{domain}/livedns/dnssec` | Required |
| [DomainDnssec](docs/api/domain_dnssec.html) | `remove` | `DELETE /domain/domains/{domain}/livedns/dnssec` | Required |
| [DomainHost](docs/api/domain_host.html) | `create` | `POST /domain/domains/{domain}/hosts` | Required |
| [DomainHost](docs/api/domain_host.html) | `list` | `GET /domain/domains/{domain}/hosts` | Required |
| [DomainHost](docs/api/domain_host.html) | `load` | `GET /domain/domains/{domain}/hosts/{name}` | Required |
| [DomainHost](docs/api/domain_host.html) | `remove` | `DELETE /domain/domains/{domain}/hosts/{name}` | Required |
| [DomainHost](docs/api/domain_host.html) | `update` | `PUT /domain/domains/{domain}/hosts/{name}` | Required |
| [DomainLivedns](docs/api/domain_livedns.html) | `create` | `POST /domain/domains/{domain}/livedns` | Required |
| [DomainLivedns](docs/api/domain_livedns.html) | `load` | `GET /domain/domains/{domain}/livedns` | Required |
| [DomainNameserver](docs/api/domain_nameserver.html) | `list` | `GET /domain/domains/{domain}/nameservers` | Required |
| [DomainNameserver](docs/api/domain_nameserver.html) | `update` | `PUT /domain/domains/{domain}/nameservers` | Required |
| [DomainTag](docs/api/domain_tag.html) | `create` | `POST /domain/domains/{domain}/tags` | Required |
| [DomainTag](docs/api/domain_tag.html) | `list` | `GET /domain/domains/{domain}/tags` | Required |
| [DomainTag](docs/api/domain_tag.html) | `patch` | `PATCH /domain/domains/{domain}/tags` | Required |
| [DomainTag](docs/api/domain_tag.html) | `remove` | `DELETE /domain/domains/{domain}/tags` | Required |
| [DomainTag](docs/api/domain_tag.html) | `update` | `PUT /domain/domains/{domain}/tags` | Required |
| [DomainTransfer](docs/api/domain_transfer.html) | `create` | `POST /domain/transferin/{domain}/available` | Required |
| [DomainTransfer](docs/api/domain_transfer.html) | `create` | `POST /domain/transferin/{domain}/foa` | Required |
| [DomainTransfer](docs/api/domain_transfer.html) | `create` | `POST /domain/transferin` | Required |
| [DomainTransfer](docs/api/domain_transfer.html) | `load` | `GET /domain/transferin/{domain}` | Required |
| [DomainTransfer](docs/api/domain_transfer.html) | `update` | `PUT /domain/transferin/{domain}` | Required |
| [DomainTransfer](docs/api/domain_transfer.html) | `update` | `PUT /domain/transferin/{domain}/authinfo` | Required |
| [DomainWebredir](docs/api/domain_webredir.html) | `create` | `POST /domain/domains/{domain}/webredirs` | Required |
| [DomainWebredir](docs/api/domain_webredir.html) | `list` | `GET /domain/domains/{domain}/webredirs` | Required |
| [DomainWebredir](docs/api/domain_webredir.html) | `load` | `GET /domain/domains/{domain}/webredirs/{host}` | Required |
| [DomainWebredir](docs/api/domain_webredir.html) | `remove` | `DELETE /domain/domains/{domain}/webredirs/{host}` | Required |
| [DomainWebredir](docs/api/domain_webredir.html) | `update` | `PATCH /domain/domains/{domain}/webredirs/{host}` | Required |
| [EmailForward](docs/api/email_forward.html) | `create` | `POST /email/forwards/{domain}` | Required |
| [EmailForward](docs/api/email_forward.html) | `list` | `GET /email/forwards/{domain}` | Required |
| [EmailForward](docs/api/email_forward.html) | `remove` | `DELETE /email/forwards/{domain}/{source}` | Required |
| [EmailForward](docs/api/email_forward.html) | `update` | `PUT /email/forwards/{domain}/{source}` | Required |
| [EmailMailbox](docs/api/email_mailbox.html) | `create` | `POST /email/mailboxes/{domain}/{email}/renew` | Required |
| [EmailMailbox](docs/api/email_mailbox.html) | `create` | `POST /email/mailboxes/{domain}` | Required |
| [EmailMailbox](docs/api/email_mailbox.html) | `create` | `POST /email/mailboxes/{domain}/renew` | Required |
| [EmailMailbox](docs/api/email_mailbox.html) | `list` | `GET /email/mailboxes/{domain}` | Required |
| [EmailMailbox](docs/api/email_mailbox.html) | `load` | `GET /email/mailboxes/{domain}/{mailbox_id}` | Required |
| [EmailMailbox](docs/api/email_mailbox.html) | `remove` | `DELETE /email/mailboxes/{domain}/{mailbox_id}` | Required |
| [EmailMailbox](docs/api/email_mailbox.html) | `remove` | `DELETE /email/mailboxes/{domain}/{mailbox_id}/contents` | Required |
| [EmailMailbox](docs/api/email_mailbox.html) | `update` | `PATCH /email/mailboxes/{domain}/{mailbox_id}` | Required |
| [EmailMigration](docs/api/email_migration.html) | `create` | `POST /email/migration/{domain}` | Required |
| [EmailMigration](docs/api/email_migration.html) | `load` | `GET /email/migration/{domain}` | Required |
| [EmailOffer](docs/api/email_offer.html) | `load` | `GET /email/offers/{domain}` | Required |
| [EmailOffer](docs/api/email_offer.html) | `update` | `PATCH /email/offers/{domain}` | Required |
| [EmailSlot](docs/api/email_slot.html) | `create` | `POST /email/slots/{domain}` | Required |
| [EmailSlot](docs/api/email_slot.html) | `list` | `GET /email/slots/{domain}` | Required |
| [EmailSlot](docs/api/email_slot.html) | `load` | `GET /email/slots/{domain}/{slot_id}` | Required |
| [EmailSlot](docs/api/email_slot.html) | `remove` | `DELETE /email/slots/{domain}/{slot_id}` | Required |
| [HostingApplication](docs/api/hosting_application.html) | `list` | `GET /simplehosting/applications` | Required |
| [HostingApplication](docs/api/hosting_application.html) | `load` | `GET /simplehosting/applications/{application_name}` | Required |
| [HostingInstance](docs/api/hosting_instance.html) | `create` | `POST /simplehosting/instances/{instance_id}/action` | Required |
| [HostingInstance](docs/api/hosting_instance.html) | `create` | `POST /simplehosting/instances` | Required |
| [HostingInstance](docs/api/hosting_instance.html) | `list` | `GET /simplehosting/instances` | Required |
| [HostingInstance](docs/api/hosting_instance.html) | `load` | `GET /simplehosting/instances/{instance_id}` | Required |
| [HostingInstance](docs/api/hosting_instance.html) | `load` | `GET /simplehosting/instances/{instance_id}/usage` | Required |
| [HostingInstance](docs/api/hosting_instance.html) | `remove` | `DELETE /simplehosting/instances/{instance_id}` | Required |
| [HostingInstance](docs/api/hosting_instance.html) | `update` | `PATCH /simplehosting/instances/{instance_id}` | Required |
| [HostingVhost](docs/api/hosting_vhost.html) | `create` | `POST /simplehosting/instances/{instance_id}/vhosts` | Required |
| [HostingVhost](docs/api/hosting_vhost.html) | `list` | `GET /simplehosting/instances/{instance_id}/vhosts` | Required |
| [HostingVhost](docs/api/hosting_vhost.html) | `load` | `GET /simplehosting/instances/{instance_id}/vhosts/{vhost_fqdn}` | Required |
| [HostingVhost](docs/api/hosting_vhost.html) | `remove` | `DELETE /simplehosting/instances/{instance_id}/vhosts/{vhost_fqdn}` | Required |
| [HostingVhost](docs/api/hosting_vhost.html) | `remove` | `DELETE /simplehosting/instances/{instance_id}/vhosts/{vhost_fqdn}/cache` | Required |
| [HostingVhost](docs/api/hosting_vhost.html) | `update` | `PATCH /simplehosting/instances/{instance_id}/vhosts/{vhost_fqdn}` | Required |
| [IssuedCertificate](docs/api/issued_certificate.html) | `create` | `POST /certificate/issued-certs/{id}/dcv_params` | Required |
| [IssuedCertificate](docs/api/issued_certificate.html) | `create` | `POST /certificate/dcv_params` | Required |
| [IssuedCertificate](docs/api/issued_certificate.html) | `create` | `POST /certificate/issued-certs` | Required |
| [IssuedCertificate](docs/api/issued_certificate.html) | `list` | `GET /certificate/issued-certs` | Required |
| [IssuedCertificate](docs/api/issued_certificate.html) | `load` | `GET /certificate/issued-certs/{id}` | Required |
| [IssuedCertificate](docs/api/issued_certificate.html) | `load` | `GET /certificate/issued-certs/{id}/crt` | Required |
| [IssuedCertificate](docs/api/issued_certificate.html) | `remove` | `DELETE /certificate/issued-certs/{id}` | Required |
| [IssuedCertificate](docs/api/issued_certificate.html) | `update` | `PATCH /certificate/issued-certs/{id}` | Required |
| [LinkedZone](docs/api/linked_zone.html) | `create` | `POST /linkedzone/zones` | Required |
| [LinkedZone](docs/api/linked_zone.html) | `list` | `GET /linkedzone/zones` | Required |
| [LinkedZone](docs/api/linked_zone.html) | `load` | `GET /linkedzone/zones/{zone_id}` | Required |
| [LinkedZone](docs/api/linked_zone.html) | `remove` | `DELETE /linkedzone/zones/{zone_id}` | Required |
| [LinkedZone](docs/api/linked_zone.html) | `update` | `PATCH /linkedzone/zones/{zone_id}` | Required |
| [LinkedZoneDeployment](docs/api/linked_zone_deployment.html) | `create` | `POST /linkedzone/zones/{zone_id}` | Required |
| [LinkedZoneDomain](docs/api/linked_zone_domain.html) | `list` | `GET /linkedzone/domains` | Required |
| [LinkedZoneDomain](docs/api/linked_zone_domain.html) | `load` | `GET /linkedzone/domains/{domain}` | Required |
| [LinkedZoneDomain](docs/api/linked_zone_domain.html) | `update` | `PATCH /linkedzone/zones/{zone_id}/link/domains` | Required |
| [LinkedZoneDomain](docs/api/linked_zone_domain.html) | `update` | `PATCH /linkedzone/unlink/domains` | Required |
| [LinkedZoneTask](docs/api/linked_zone_task.html) | `list` | `GET /linkedzone/tasks` | Required |
| [LinkedZoneTask](docs/api/linked_zone_task.html) | `load` | `GET /linkedzone/tasks/{task_id}` | Required |
| [LivednsAxfrSlave](docs/api/livedns_axfr_slave.html) | `list` | `GET /livedns/domains/{fqdn}/axfr/slaves` | Required |
| [LivednsAxfrSlave](docs/api/livedns_axfr_slave.html) | `remove` | `DELETE /livedns/domains/{fqdn}/axfr/slaves/{ip}` | Required |
| [LivednsAxfrSlave](docs/api/livedns_axfr_slave.html) | `update` | `PUT /livedns/domains/{fqdn}/axfr/slaves/{ip}` | Required |
| [LivednsAxfrTsig](docs/api/livedns_axfr_tsig.html) | `list` | `GET /livedns/domains/{fqdn}/axfr/tsig` | Required |
| [LivednsAxfrTsig](docs/api/livedns_axfr_tsig.html) | `remove` | `DELETE /livedns/domains/{fqdn}/axfr/tsig/{id}` | Required |
| [LivednsAxfrTsig](docs/api/livedns_axfr_tsig.html) | `update` | `PUT /livedns/domains/{fqdn}/axfr/tsig/{id}` | Required |
| [LivednsDomain](docs/api/livedns_domain.html) | `create` | `POST /livedns/domains` | Required |
| [LivednsDomain](docs/api/livedns_domain.html) | `list` | `GET /livedns/domains` | Required |
| [LivednsDomain](docs/api/livedns_domain.html) | `load` | `GET /livedns/domains/{fqdn}` | Required |
| [LivednsDomain](docs/api/livedns_domain.html) | `update` | `PATCH /livedns/domains/{fqdn}` | Required |
| [LivednsKey](docs/api/livedns_key.html) | `create` | `POST /livedns/domains/{fqdn}/keys` | Required |
| [LivednsKey](docs/api/livedns_key.html) | `list` | `GET /livedns/domains/{fqdn}/keys` | Required |
| [LivednsKey](docs/api/livedns_key.html) | `load` | `GET /livedns/domains/{fqdn}/keys/{id}` | Required |
| [LivednsKey](docs/api/livedns_key.html) | `remove` | `DELETE /livedns/domains/{fqdn}/keys/{id}` | Required |
| [LivednsKey](docs/api/livedns_key.html) | `update` | `PATCH /livedns/domains/{fqdn}/keys/{id}` | Required |
| [LivednsNameserver](docs/api/livedns_nameserver.html) | `list` | `GET /livedns/domains/{fqdn}/nameservers` | Required |
| [LivednsNameserver](docs/api/livedns_nameserver.html) | `list` | `GET /livedns/nameservers/{fqdn}` | Required |
| [LivednsRecord](docs/api/livedns_record.html) | `create` | `POST /livedns/domains/{fqdn}/records/{rrset_name}/{rrset_type}` | Required |
| [LivednsRecord](docs/api/livedns_record.html) | `create` | `POST /livedns/domains/{fqdn}/verification/{rrset_name}/{rrset_type}` | Required |
| [LivednsRecord](docs/api/livedns_record.html) | `create` | `POST /livedns/domains/{fqdn}/records/{rrset_name}` | Required |
| [LivednsRecord](docs/api/livedns_record.html) | `create` | `POST /livedns/domains/{fqdn}/records` | Required |
| [LivednsRecord](docs/api/livedns_record.html) | `list` | `GET /livedns/domains/{fqdn}/records/{rrset_name}` | Required |
| [LivednsRecord](docs/api/livedns_record.html) | `list` | `GET /livedns/domains/{fqdn}/records` | Required |
| [LivednsRecord](docs/api/livedns_record.html) | `load` | `GET /livedns/domains/{fqdn}/records/{rrset_name}/{rrset_type}` | Required |
| [LivednsRecord](docs/api/livedns_record.html) | `patch` | `PATCH /livedns/domains/{fqdn}/records/{rrset_name}/{rrset_type}` | Required |
| [LivednsRecord](docs/api/livedns_record.html) | `remove` | `DELETE /livedns/domains/{fqdn}/records/{rrset_name}/{rrset_type}` | Required |
| [LivednsRecord](docs/api/livedns_record.html) | `remove` | `DELETE /livedns/domains/{fqdn}/records/{rrset_name}` | Required |
| [LivednsRecord](docs/api/livedns_record.html) | `update` | `PUT /livedns/domains/{fqdn}/records/{rrset_name}/{rrset_type}` | Required |
| [LivednsRecord](docs/api/livedns_record.html) | `update` | `PUT /livedns/domains/{fqdn}/records/{rrset_name}` | Required |
| [LivednsRrtype](docs/api/livedns_rrtype.html) | `list` | `GET /livedns/dns/rrtypes` | Required |
| [LivednsSnapshot](docs/api/livedns_snapshot.html) | `create` | `POST /livedns/domains/{fqdn}/snapshots` | Required |
| [LivednsSnapshot](docs/api/livedns_snapshot.html) | `list` | `GET /livedns/domains/{fqdn}/snapshots` | Required |
| [LivednsSnapshot](docs/api/livedns_snapshot.html) | `load` | `GET /livedns/domains/{fqdn}/snapshots/{id}` | Required |
| [LivednsSnapshot](docs/api/livedns_snapshot.html) | `remove` | `DELETE /livedns/domains/{fqdn}/snapshots/{id}` | Required |
| [LivednsSnapshot](docs/api/livedns_snapshot.html) | `update` | `PATCH /livedns/domains/{fqdn}/snapshots/{id}` | Required |
| [LivednsTsigKey](docs/api/livedns_tsig_key.html) | `create` | `POST /livedns/axfr/tsig` | Required |
| [LivednsTsigKey](docs/api/livedns_tsig_key.html) | `list` | `GET /livedns/axfr/tsig` | Required |
| [LivednsTsigKey](docs/api/livedns_tsig_key.html) | `load` | `GET /livedns/axfr/tsig/{id}/config/{software}` | Required |
| [LivednsTsigKey](docs/api/livedns_tsig_key.html) | `load` | `GET /livedns/axfr/tsig/{id}` | Required |
| [LivednsZone](docs/api/livedns_zone.html) | `remove` | `DELETE /livedns/domains/{fqdn}/records` | Required |
| [LivednsZone](docs/api/livedns_zone.html) | `update` | `PUT /livedns/domains/{fqdn}/records` | Required |
| [Mailbox](docs/api/mailbox.html) | `create` | `POST /mailbox/mailboxes/{email}/renew` | Required |
| [Mailbox](docs/api/mailbox.html) | `create` | `POST /mailbox/mailboxes` | Required |
| [Mailbox](docs/api/mailbox.html) | `list` | `GET /mailbox/mailboxes` | Required |
| [Mailbox](docs/api/mailbox.html) | `load` | `GET /mailbox/mailboxes/{email}` | Required |
| [Mailbox](docs/api/mailbox.html) | `remove` | `DELETE /mailbox/mailboxes/{email}` | Required |
| [Mailbox](docs/api/mailbox.html) | `update` | `PATCH /mailbox/mailboxes/{email}` | Required |
| [MailboxDomain](docs/api/mailbox_domain.html) | `create` | `POST /mailbox/domains/{domain}/validate` | Required |
| [MailboxDomain](docs/api/mailbox_domain.html) | `list` | `GET /mailbox/domains` | Required |
| [MailboxDomain](docs/api/mailbox_domain.html) | `load` | `GET /mailbox/domains/{domain}` | Required |
| [MailboxForward](docs/api/mailbox_forward.html) | `create` | `POST /mailbox/forwards` | Required |
| [MailboxForward](docs/api/mailbox_forward.html) | `list` | `GET /mailbox/forwards` | Required |
| [MailboxForward](docs/api/mailbox_forward.html) | `remove` | `DELETE /mailbox/forwards/{source}` | Required |
| [MailboxForward](docs/api/mailbox_forward.html) | `update` | `PUT /mailbox/forwards/{source}` | Required |
| [MailboxProduct](docs/api/mailbox_product.html) | `create` | `POST /mailbox/products` | Required |
| [MailboxProduct](docs/api/mailbox_product.html) | `list` | `GET /mailbox/products` | Required |
| [MailboxQuota](docs/api/mailbox_quota.html) | `list` | `GET /mailbox/quotas` | Required |
| [MailboxSlot](docs/api/mailbox_slot.html) | `list` | `GET /mailbox/slots` | Required |
| [MailboxSlot](docs/api/mailbox_slot.html) | `load` | `GET /mailbox/slots/{slot_id}` | Required |
| [Organization](docs/api/organization.html) | `create` | `POST /organization/organizations/{org_id}/action` | Required |
| [Organization](docs/api/organization.html) | `create` | `POST /organization/organizations` | Required |
| [Organization](docs/api/organization.html) | `list` | `GET /organization/organizations` | Required |
| [Organization](docs/api/organization.html) | `load` | `GET /organization/organizations/{org_id}` | Required |
| [Organization](docs/api/organization.html) | `remove` | `DELETE /organization/organizations/{org_id}` | Required |
| [Organization](docs/api/organization.html) | `update` | `PATCH /organization/organizations/{org_id}` | Required |
| [OrganizationCustomer](docs/api/organization_customer.html) | `create` | `POST /organization/organizations/{org_id}/customers` | Required |
| [OrganizationCustomer](docs/api/organization_customer.html) | `list` | `GET /organization/organizations/{org_id}/customers` | Required |
| [OrganizationCustomer](docs/api/organization_customer.html) | `load` | `GET /organization/organizations/{org_id}/customers/{id}` | Required |
| [OrganizationCustomer](docs/api/organization_customer.html) | `remove` | `DELETE /organization/organizations/{org_id}/customers/{id}` | Required |
| [OrganizationCustomer](docs/api/organization_customer.html) | `update` | `PATCH /organization/organizations/{org_id}/customers/{id}` | Required |
| [Template](docs/api/template.html) | `create` | `POST /template/templates` | Required |
| [Template](docs/api/template.html) | `list` | `GET /template/templates` | Required |
| [Template](docs/api/template.html) | `load` | `GET /template/templates/{id}` | Required |
| [Template](docs/api/template.html) | `remove` | `DELETE /template/templates/{id}` | Required |
| [Template](docs/api/template.html) | `update` | `PATCH /template/templates/{id}` | Required |
| [TemplateDispatch](docs/api/template_dispatch.html) | `create` | `POST /template/templates/{id}` | Required |
| [TemplateDispatch](docs/api/template_dispatch.html) | `load` | `GET /template/dispatch/{id}` | Required |
| [Tld](docs/api/tld.html) | `list` | `GET /domain/tlds` | Required |
| [Tld](docs/api/tld.html) | `load` | `GET /domain/tlds/{name}` | Required |
| [User](docs/api/user.html) | `load` | `GET /organization/user-info` | Required |

## Connect to the API

- API server: `https://api.gandi.net/v5`
- API server: `https://api.sandbox.gandi.net/v5`

The default credential is sent in the `Authorization` header with the `Bearer` prefix.

A Personal Access Token (`pat_...`), created in the Organization tab of the Gandi Admin application (https://admin.gandi.net/organizations/), sent as `Authorization: Bearer &lt;token&gt;`. The legacy `Apikey &lt;key&gt;` scheme is deprecated.

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| [Golang](docs/sdks/go.html) | `go/` | Build from source |
| [Lua](docs/sdks/lua.html) | `lua/` | Build from source |
| [PHP](docs/sdks/php.html) | `php/` | Build from source |
| [Python](docs/sdks/py.html) | `py/` | Build from source |
| [Ruby](docs/sdks/rb.html) | `rb/` | Build from source |
| [TypeScript](docs/sdks/ts.html) | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### [Go CLI](docs/tools/go-cli.html)

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### [Go MCP server](docs/tools/go-mcp.html)

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `gandi_list`: List records for an entity. Supported entities: `acme_account`, `acme_domain`, `acme_price`, `acme_subscription`, `certificate_package`, `certificate_tag`, `domain`, `domain_dnskey`, `domain_host`, `domain_nameserver`, `domain_tag`, `domain_webredir`, `email_forward`, `email_mailbox`, `email_slot`, `hosting_application`, `hosting_instance`, `hosting_vhost`, `issued_certificate`, `linked_zone`, `linked_zone_domain`, `linked_zone_task`, `livedns_axfr_slave`, `livedns_axfr_tsig`, `livedns_domain`, `livedns_key`, `livedns_nameserver`, `livedns_record`, `livedns_rrtype`, `livedns_snapshot`, `livedns_tsig_key`, `mailbox`, `mailbox_domain`, `mailbox_forward`, `mailbox_product`, `mailbox_quota`, `mailbox_slot`, `organization`, `organization_customer`, `template`, `tld`.
- `gandi_load`: Load one record for an entity. Supported entities: `acme_account`, `acme_domain`, `acme_subscription`, `billing_info`, `billing_price`, `certificate_package`, `certificate_pem`, `comment`, `domain`, `domain_availability`, `domain_change_owner`, `domain_claim`, `domain_contact`, `domain_dnssec`, `domain_host`, `domain_livedns`, `domain_transfer`, `domain_webredir`, `email_mailbox`, `email_migration`, `email_offer`, `email_slot`, `hosting_application`, `hosting_instance`, `hosting_vhost`, `issued_certificate`, `linked_zone`, `linked_zone_domain`, `linked_zone_task`, `livedns_domain`, `livedns_key`, `livedns_record`, `livedns_snapshot`, `livedns_tsig_key`, `mailbox`, `mailbox_domain`, `mailbox_slot`, `organization`, `organization_customer`, `template`, `template_dispatch`, `tld`, `user`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- [`debug`](docs/features/debug.html): Request/response capture ring buffer for debugging
- [`idempotency`](docs/features/idempotency.html): Idempotency keys for safe retries of mutating operations
- [`metrics`](docs/features/metrics.html): Statistics capture: per-operation counters and latency
- [`paging`](docs/features/paging.html): Pagination signals for list operations
- [`ratelimit`](docs/features/ratelimit.html): Client-side rate limiting via a token bucket
- [`retry`](docs/features/retry.html): Automatic retry of transient failures with exponential backoff
- [`secrets`](docs/features/secrets.html): Secret access: resolve the API credential through a provider chain, and exchange a refresh token for short-lived access tokens
- [`test`](docs/features/test.html): In-memory mock transport for testing without a live server
- [`timeout`](docs/features/timeout.html): Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the [first-call guide](docs/guides/first-call.html) for the setup sequence.
- Read the [authentication guide](docs/guides/authentication.html) before using protected routes.
- Use the [API reference](docs/api/index.html) for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

