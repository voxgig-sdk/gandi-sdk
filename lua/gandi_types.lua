-- Typed models for the Gandi SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
-- params (op.<name>.points[].g.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class AccessToken
---@field access_token string
---@field entities table
---@field expires_at string
---@field id string
---@field name string
---@field scopes table

---@class AccessTokenCreateData
---@field expires_at? string
---@field name? string

---@class AcmeAccount
---@field created_at string
---@field deleted_at string
---@field external_id string
---@field id string
---@field ip string
---@field last_activity string
---@field status string
---@field subscription_id string

---@class AcmeAccountLoadMatch
---@field id string
---@field subscription_id string
---@field sharing_id string

---@class AcmeAccountListMatch
---@field subscription_id string
---@field sharing_id string

---@class AcmeDomain
---@field created_at string
---@field deleted_at string
---@field hostname string
---@field hostname_ulabel string
---@field is_wildcard boolean
---@field status string
---@field subscription_id string

---@class AcmeDomainLoadMatch
---@field domain_id number
---@field subscription_id string
---@field sharing_id string

---@class AcmeDomainListMatch
---@field subscription_id string
---@field domain string
---@field sharing_id string

---@class AcmePrice
---@field country string
---@field currency string
---@field domains table
---@field duration string
---@field duration_unit string
---@field grid string
---@field max_duration number
---@field min_duration number
---@field price_after_taxes string
---@field price_before_taxes string
---@field process string
---@field product table
---@field provider string
---@field tax_rate string
---@field taxes table
---@field validation_type string

---@class AcmePriceListMatch
---@field country string
---@field currency string
---@field duration string
---@field grid string
---@field process string
---@field provider string
---@field sharing_id string
---@field validation_type string

---@class AcmePriceCreateData
---@field sharing_id string
---@field country string
---@field currency string
---@field domains table
---@field duration string
---@field grid string
---@field process string
---@field provider string
---@field validation_type string

---@class AcmeSubscription
---@field country string
---@field created_at string
---@field currency string
---@field domains table
---@field duration number
---@field eab_hmac string
---@field eab_id string
---@field ends_at string
---@field grid string
---@field message string
---@field name string
---@field provider string
---@field server_url string
---@field status string
---@field subscription_id string
---@field validation_type string
---@field years string

---@class AcmeSubscriptionLoadMatch
---@field subscription_id string
---@field sharing_id string

---@class AcmeSubscriptionListMatch
---@field created_at string
---@field ends_at string
---@field name string
---@field provider string
---@field sharing_id string
---@field status string
---@field validation_type string
---@field year string

---@class AcmeSubscriptionCreateData
---@field sharing_id string
---@field country string
---@field currency string
---@field domains table
---@field duration number
---@field grid string
---@field name string
---@field provider string
---@field validation_type string

---@class AcmeSubscriptionUpdateData
---@field subscription_id string
---@field sharing_id string
---@field name? string

---@class AcmeSubscriptionRemoveMatch
---@field subscription_id string
---@field sharing_id string

---@class BillingInfo
---@field annual_balance number
---@field grid string
---@field outstanding_amount number
---@field prepaid table
---@field prepaid_monthly_invoice? boolean

---@class BillingInfoLoadMatch
---@field sharing_id string

---@class BillingPrice
---@field currency string
---@field grid string
---@field products table
---@field taxes table

---@class BillingPriceLoadMatch
---@field type string
---@field active_phase? boolean
---@field country? string
---@field currency? string
---@field discount? table
---@field duration_unit? string
---@field extension? string
---@field feature? boolean
---@field grid? string
---@field lang? string
---@field max_duration? number
---@field name table
---@field page? number
---@field per_page? number
---@field prices_at? string
---@field process table
---@field sharing_id? string

---@class CertificateDcv
---@field message string
---@field method string

---@class CertificateDcvUpdateData
---@field certificate_id string
---@field sharing_id? string
---@field message? string
---@field method? string

---@class CertificateDcvPatchData
---@field certificate_id string
---@field sharing_id? string
---@field method? string

---@class CertificatePackage
---@field category table
---@field href string
---@field max_domains number
---@field min_domains number
---@field name string
---@field provider string
---@field sgc boolean
---@field trustlogo boolean
---@field warranty number
---@field wildcard boolean

---@class CertificatePackageLoadMatch
---@field name string

---@class CertificatePackageListMatch
---@field category? string
---@field max_domain? number
---@field min_domain? number
---@field page? number
---@field per_page? number
---@field trustlogo? boolean
---@field warranty? number
---@field wildcard? boolean

---@class CertificatePem

---@class CertificatePemLoadMatch
---@field type string
---@field provider? string

---@class CertificateRenewal
---@field csr? string
---@field dcv_method? string
---@field duration? number
---@field errors? table
---@field status string

---@class CertificateRenewalCreateData
---@field certificate_id string
---@field sharing_id? string
---@field csr? string
---@field dcv_method? string
---@field duration? number

---@class CertificateTag
---@field add table
---@field message string
---@field remove table
---@field tag string
---@field tags table

---@class CertificateTagListMatch
---@field certificate_id string

---@class CertificateTagCreateData
---@field certificate_id string
---@field tag string

---@class CertificateTagUpdateData
---@field certificate_id string
---@field tags? table

---@class CertificateTagPatchData
---@field certificate_id string
---@field add? table
---@field remove? table

---@class CertificateTagRemoveMatch
---@field certificate_id string

---@class Comment
---@field content string
---@field created_at? string
---@field errors? table
---@field id string
---@field status string
---@field updated_at? string
---@field user table

---@class CommentLoadMatch
---@field entity_id string

---@class CommentCreateData
---@field entity_id string
---@field content string

---@class CommentRemoveMatch
---@field entity_id string

---@class Domain
---@field admin table
---@field authinfo? string
---@field autorenew table
---@field bill table
---@field can_tld_lock boolean
---@field claims? string
---@field contacts table
---@field currency? string
---@field dates table
---@field domain_owner string
---@field duration? number
---@field enforce_premium? boolean
---@field errors? table
---@field extra_parameters? table
---@field fqdn string
---@field fqdn_unicode string
---@field href string
---@field id? string
---@field lang? string
---@field mailbox_optin? boolean
---@field nameserver table
---@field nameservers table
---@field nameservers_ips? table
---@field orga_owner string
---@field owner table
---@field price? number
---@field reachability string
---@field resellee_id? string
---@field services table
---@field sharing_id? string
---@field sharing_space table
---@field smd? string
---@field status table
---@field tags? table
---@field tech table
---@field template_id? string
---@field tld string
---@field tld_period? string
---@field trustee_roles? table

---@class DomainLoadMatch
---@field fqdn string

---@class DomainListMatch
---@field fqdn? string
---@field nameserver? string
---@field page? number
---@field per_page? number
---@field resellee_id? string
---@field sharing_id? string
---@field sort_by? string
---@field tld? string

---@class DomainCreateData
---@field sharing_id? string
---@field admin table
---@field bill table
---@field claims? string
---@field currency? string
---@field duration? number
---@field enforce_premium? boolean
---@field extra_parameters? table
---@field fqdn string
---@field lang? string
---@field mailbox_optin? boolean
---@field nameservers? table
---@field nameservers_ips? table
---@field owner table
---@field price? number
---@field resellee_id? string
---@field smd? string
---@field tech table
---@field template_id? string
---@field tld_period? string

---@class DomainUpdateData
---@field fqdn string
---@field admin? table
---@field authinfo? string
---@field autorenew? table
---@field bill? table
---@field can_tld_lock? boolean
---@field claims? string
---@field contacts? table
---@field currency? string
---@field dates? table
---@field domain_owner? string
---@field duration? number
---@field enforce_premium? boolean
---@field errors? table
---@field extra_parameters? table
---@field fqdn_unicode? string
---@field href? string
---@field id? string
---@field lang? string
---@field mailbox_optin? boolean
---@field nameserver? table
---@field nameservers? table
---@field nameservers_ips? table
---@field orga_owner? string
---@field owner? table
---@field price? number
---@field reachability? string
---@field resellee_id? string
---@field services? table
---@field sharing_id? string
---@field sharing_space? table
---@field smd? string
---@field status? table
---@field tags? table
---@field tech? table
---@field template_id? string
---@field tld? string
---@field tld_period? string
---@field trustee_roles? table
---@field action? any
---@field clientTransferProhibited? any
---@field enabled? any
---@field org_id? any

---@class DomainRemoveMatch
---@field fqdn string

---@class DomainAvailability
---@field currency string
---@field grid string
---@field products table
---@field taxes table

---@class DomainAvailabilityLoadMatch
---@field country? string
---@field currency? string
---@field duration_unit? string
---@field extension? string
---@field grid? string
---@field lang? string
---@field max_duration? number
---@field name string
---@field period? string
---@field process? table
---@field sharing_id? string

---@class DomainChangeOwner
---@field admin table
---@field bill table
---@field created_at string
---@field date_start? string
---@field errors? table
---@field errortype? string
---@field errortype_label? string
---@field foa? table
---@field inner_step? string
---@field owner table
---@field params table
---@field status string
---@field step string
---@field step_nb number
---@field tech table
---@field updated_at string

---@class DomainChangeOwnerLoadMatch
---@field domain string
---@field sharing_id? string

---@class DomainChangeOwnerCreateData
---@field domain string
---@field sharing_id? string
---@field admin table
---@field bill table
---@field owner table
---@field tech table

---@class DomainClaim
---@field claims table
---@field created_at string
---@field expires_at string
---@field fqdn string
---@field fqdn_alabel string
---@field fqdn_ulabel string
---@field notice_id string
---@field status string

---@class DomainClaimLoadMatch
---@field domain string

---@class DomainClaimCreateData
---@field domain string
---@field claims table
---@field created_at string
---@field expires_at string
---@field fqdn string
---@field fqdn_alabel string
---@field fqdn_ulabel string
---@field notice_id string
---@field status string

---@class DomainContact
---@field admin table
---@field bill table
---@field message string
---@field owner table
---@field tech table

---@class DomainContactLoadMatch
---@field domain string

---@class DomainContactUpdateData
---@field domain string
---@field admin? table
---@field bill? table
---@field tech? table

---@class DomainDnskey
---@field algorithm number
---@field digest string
---@field digest_type number
---@field href string
---@field id number
---@field keys table
---@field keytag number
---@field message string
---@field public_key string
---@field type string

---@class DomainDnskeyListMatch
---@field domain string
---@field page? number
---@field per_page? number

---@class DomainDnskeyCreateData
---@field domain string
---@field algorithm number
---@field public_key string
---@field type string

---@class DomainDnskeyUpdateData
---@field domain string
---@field keys? table

---@class DomainDnskeyRemoveMatch
---@field domain string
---@field id string

---@class DomainDnssec
---@field error? string
---@field state string

---@class DomainDnssecLoadMatch
---@field domain string

---@class DomainDnssecCreateData
---@field domain string
---@field sharing_id? string
---@field error? string
---@field state string

---@class DomainDnssecRemoveMatch
---@field domain string
---@field sharing_id? string

---@class DomainHost
---@field fqdn string
---@field fqdn_unicode string
---@field href string
---@field ips table
---@field message string
---@field name string

---@class DomainHostLoadMatch
---@field domain string
---@field name string

---@class DomainHostListMatch
---@field domain string
---@field page? number
---@field per_page? number

---@class DomainHostCreateData
---@field domain string
---@field page? number
---@field per_page? number
---@field ips table
---@field name string

---@class DomainHostUpdateData
---@field domain string
---@field name string
---@field ips? table

---@class DomainHostRemoveMatch
---@field domain string
---@field name string

---@class DomainLivedns
---@field current string
---@field dnssec_available? boolean
---@field livednssec_available? boolean
---@field message string
---@field nameservers table

---@class DomainLivednsLoadMatch
---@field domain string

---@class DomainLivednsCreateData
---@field domain string
---@field current string
---@field dnssec_available? boolean
---@field livednssec_available? boolean
---@field message string
---@field nameservers table

---@class DomainNameserver
---@field message string
---@field nameservers table

---@class DomainNameserverListMatch
---@field domain string

---@class DomainNameserverUpdateData
---@field domain string
---@field nameservers? table

---@class DomainTag
---@field add table
---@field message string
---@field remove table
---@field tag string
---@field tags table

---@class DomainTagListMatch
---@field domain string

---@class DomainTagCreateData
---@field domain string
---@field tag string

---@class DomainTagUpdateData
---@field domain string
---@field tags? table

---@class DomainTagPatchData
---@field domain string
---@field add? table
---@field remove? table

---@class DomainTagRemoveMatch
---@field domain string

---@class DomainTransfer
---@field admin table
---@field authinfo? string
---@field bill table
---@field change_owner? boolean
---@field created_at string
---@field currency? string
---@field duration? number
---@field enforce_premium? boolean
---@field errors? table
---@field errortype? string
---@field errortype_label? string
---@field extra_parameters? table
---@field foa? table
---@field fqdn string
---@field inner_step? string
---@field mailbox_optin? boolean
---@field message string
---@field nameservers? table
---@field nameservers_ips? table
---@field owner table
---@field owner_contact string
---@field params table
---@field price? number
---@field regac_at? string
---@field resellee_id? string
---@field start_at? string
---@field status string
---@field step string
---@field step_nb number
---@field tech table
---@field template_id? string
---@field transfer_link? string
---@field transfer_procedure? string
---@field updated_at string

---@class DomainTransferLoadMatch
---@field domain string

---@class DomainTransferCreateData
---@field sharing_id? string
---@field admin table
---@field authinfo? string
---@field bill table
---@field change_owner? boolean
---@field currency? string
---@field duration? number
---@field enforce_premium? boolean
---@field extra_parameters? table
---@field fqdn string
---@field mailbox_optin? boolean
---@field nameservers? table
---@field nameservers_ips? table
---@field owner table
---@field price? number
---@field resellee_id? string
---@field tech table
---@field template_id? string

---@class DomainTransferUpdateData
---@field domain string
---@field admin? table
---@field authinfo? string
---@field bill? table
---@field change_owner? boolean
---@field created_at? string
---@field currency? string
---@field duration? number
---@field enforce_premium? boolean
---@field errors? table
---@field errortype? string
---@field errortype_label? string
---@field extra_parameters? table
---@field foa? table
---@field fqdn? string
---@field inner_step? string
---@field mailbox_optin? boolean
---@field message? string
---@field nameservers? table
---@field nameservers_ips? table
---@field owner? table
---@field owner_contact? string
---@field params? table
---@field price? number
---@field regac_at? string
---@field resellee_id? string
---@field start_at? string
---@field status? string
---@field step? string
---@field step_nb? number
---@field tech? table
---@field template_id? string
---@field transfer_link? string
---@field transfer_procedure? string
---@field updated_at? string

---@class DomainWebredir
---@field cert_status? string
---@field cert_uuid? string
---@field created_at? string
---@field host string
---@field message string
---@field override boolean
---@field protocol? string
---@field type string
---@field updated_at? string
---@field url string

---@class DomainWebredirLoadMatch
---@field domain string
---@field host string

---@class DomainWebredirListMatch
---@field domain string
---@field page? number
---@field per_page? number

---@class DomainWebredirCreateData
---@field domain string
---@field page? number
---@field per_page? number
---@field host string
---@field override boolean
---@field protocol string
---@field type string
---@field url string

---@class DomainWebredirUpdateData
---@field domain string
---@field host string
---@field override? boolean
---@field protocol? string
---@field type? string
---@field url? string

---@class DomainWebredirRemoveMatch
---@field domain string
---@field host string

---@class EmailForward
---@field destinations table
---@field href string
---@field id? string
---@field message string
---@field source string

---@class EmailForwardListMatch
---@field domain string
---@field destination? string
---@field page? number
---@field per_page? number
---@field sort_by? string
---@field source? string

---@class EmailForwardCreateData
---@field domain string
---@field destinations table
---@field source string

---@class EmailForwardUpdateData
---@field domain string
---@field source string
---@field destinations? table

---@class EmailForwardRemoveMatch
---@field domain string
---@field source string

---@class EmailMailbox
---@field address string
---@field alias_count? number
---@field aliases table
---@field antispam boolean
---@field autorenew table
---@field domain string
---@field errors? table
---@field expires_at string
---@field fallback_email? string
---@field href string
---@field id string
---@field login string
---@field mailbox_type string
---@field message string
---@field password string
---@field quota_used number
---@field responder? table
---@field status string
---@field to_convert boolean

---@class EmailMailboxLoadMatch
---@field domain string
---@field id string

---@class EmailMailboxListMatch
---@field domain string
---@field ["<created_at"]? string
---@field antispam? boolean
---@field login? string
---@field mailbox_type? string
---@field page? number
---@field per_page? number
---@field ["~login"]? string

---@class EmailMailboxCreateData
---@field domain string
---@field aliases? table
---@field antispam? boolean
---@field login string
---@field mailbox_type string
---@field password string

---@class EmailMailboxUpdateData
---@field domain string
---@field id string
---@field sharing_id? string
---@field aliases? table
---@field antispam? boolean
---@field autorenew? table
---@field login? string
---@field mailbox_type? string
---@field password? string
---@field responder? table

---@class EmailMailboxRemoveMatch
---@field domain string
---@field id string

---@class EmailMigration
---@field available boolean
---@field currency string
---@field forward_count number
---@field free_mailboxes number
---@field included_mailboxes number
---@field info table
---@field message string
---@field packmail boolean
---@field price_v1 number
---@field price_v2 number
---@field quota_v1 number
---@field token string
---@field usage_v1 number

---@class EmailMigrationLoadMatch
---@field domain string
---@field sharing_id? string

---@class EmailMigrationCreateData
---@field domain string
---@field sharing_id? string
---@field token string

---@class EmailOffer
---@field antispam string
---@field dkim string
---@field message string
---@field status string
---@field version number

---@class EmailOfferLoadMatch
---@field domain string

---@class EmailOfferUpdateData
---@field domain string
---@field antispam? string
---@field dkim? string

---@class EmailSlot
---@field autorenew? boolean
---@field capacity number
---@field created_at string
---@field duration number
---@field gandi_id number
---@field href string
---@field id string
---@field mailbox_type string
---@field refund_amount? number
---@field refund_currency? string
---@field refundable boolean
---@field status string

---@class EmailSlotLoadMatch
---@field domain string
---@field id number

---@class EmailSlotListMatch
---@field domain string
---@field display_not_expired_and_inactive? boolean

---@class EmailSlotCreateData
---@field domain string
---@field sharing_id? string
---@field autorenew? boolean
---@field duration number
---@field mailbox_type string

---@class EmailSlotRemoveMatch
---@field domain string
---@field id number

---@class HostingApplication
---@field name string
---@field name_label string
---@field requirements table

---@class HostingApplicationLoadMatch
---@field name string

---@class HostingApplicationListMatch
---@field database? string
---@field language? string
---@field name? string
---@field page? number
---@field per_page? number
---@field sharing_id? string
---@field sort_by? string

---@class HostingInstance
---@field access_information table
---@field authentication table
---@field autorenew table
---@field available_upgrade boolean
---@field booster? table
---@field booster_options? table
---@field compatible_applications? table
---@field console table
---@field cpu number
---@field created_at string
---@field database table
---@field datacenter table
---@field domain? string
---@field duration? number
---@field duration_unit? string
---@field errors? table
---@field expire_at string
---@field id string
---@field language table
---@field language_id? string
---@field location string
---@field message string
---@field name string
---@field password? string
---@field password_updated_at? string
---@field ram table
---@field sharing_space table
---@field size string
---@field snapshot_enabled boolean
---@field status string
---@field storage table
---@field storage_additional_size? number
---@field subscription_cancelled? boolean
---@field type table
---@field upgrade_to? table
---@field vhosts table

---@class HostingInstanceLoadMatch
---@field id string

---@class HostingInstanceListMatch
---@field fqdn? string
---@field name? string
---@field page? number
---@field per_page? number
---@field sharing_id? string
---@field size? string
---@field sort_by? string
---@field status? string

---@class HostingInstanceCreateData
---@field sharing_id? string
---@field authentication table
---@field autorenew? table
---@field domain string
---@field duration? number
---@field duration_unit? string
---@field location string
---@field name? string
---@field size string
---@field snapshot_enabled? boolean
---@field storage_additional_size? number
---@field type table
---@field vhosts? table

---@class HostingInstanceUpdateData
---@field id string
---@field booster? table
---@field booster_options? table
---@field language_id? string
---@field name? string
---@field password? string
---@field size? string
---@field snapshot_enabled? boolean
---@field storage_additional_size? number

---@class HostingInstanceRemoveMatch
---@field id string

---@class HostingVhost
---@field application table
---@field created_at string
---@field deployment table
---@field fqdn string
---@field https_strategy? string
---@field is_a_test_vhost boolean
---@field linked_dns_zone table
---@field status string
---@field tls_validated_at? string

---@class HostingVhostLoadMatch
---@field fqdn string
---@field instance_id string

---@class HostingVhostListMatch
---@field instance_id string
---@field fqdn? string
---@field page? number
---@field per_page? number
---@field sort_by? string
---@field status? string

---@class HostingVhostCreateData
---@field instance_id string
---@field application table
---@field fqdn string
---@field linked_dns_zone table

---@class HostingVhostUpdateData
---@field fqdn string
---@field instance_id string
---@field application? table
---@field https_strategy? string
---@field linked_dns_zone? table

---@class HostingVhostRemoveMatch
---@field fqdn string
---@field instance_id string

---@class IssuedCertificate
---@field altnames table
---@field altnames_unicode table
---@field apex_only? boolean
---@field assumed_name? string
---@field business_category? string
---@field card_pay_trustlogo? boolean
---@field cert? string
---@field cn string
---@field cn_unicode string
---@field contact table
---@field csr? string
---@field dates table
---@field dcv_method? string
---@field duration? number
---@field error_msg? string
---@field errors? table
---@field href? string
---@field id string
---@field ida? table
---@field intermediate? string
---@field joi? table
---@field middleman? table
---@field owner? string
---@field package table
---@field provider string
---@field reissuable? boolean
---@field renewable? boolean
---@field resellee_id? string
---@field sha_version? number
---@field sharing_id? string
---@field software number
---@field state? string
---@field state_detail? string
---@field status string
---@field step_nb? number
---@field stored? boolean
---@field tags? table
---@field trustlogo? boolean
---@field trustlogo_token? table

---@class IssuedCertificateLoadMatch
---@field id string

---@class IssuedCertificateListMatch
---@field cn? string
---@field cn_eq? string
---@field covered_cn? string
---@field package? string
---@field page? number
---@field per_page? number
---@field sharing_id? string
---@field sort_by? string
---@field status? string

---@class IssuedCertificateCreateData
---@field sharing_id? string
---@field altnames? table
---@field apex_only? boolean
---@field cn? string
---@field csr? string
---@field dcv_method? string
---@field duration? number
---@field package table
---@field resellee_id? string

---@class IssuedCertificateUpdateData
---@field id string
---@field sharing_id? string
---@field altnames? table
---@field csr? string
---@field dcv_method? string

---@class IssuedCertificateRemoveMatch
---@field id string
---@field sharing_id? string

---@class LinkedZone
---@field created_at string
---@field default_records boolean
---@field domain_count number
---@field domains? table
---@field id string
---@field message string
---@field name string
---@field record_list? table
---@field record_text? string
---@field records? table
---@field sharing_space table
---@field status string
---@field updated_at? string

---@class LinkedZoneLoadMatch
---@field id string
---@field sharing_id? string

---@class LinkedZoneListMatch
---@field page? number
---@field per_page? number
---@field sharing_id? string

---@class LinkedZoneCreateData
---@field default_records? boolean
---@field name string
---@field record_list? table
---@field record_text? string

---@class LinkedZoneUpdateData
---@field id string
---@field default_records? boolean
---@field name? string
---@field record_list? table
---@field record_text? string

---@class LinkedZoneRemoveMatch
---@field id string

---@class LinkedZoneDeployment
---@field deploy boolean
---@field message string

---@class LinkedZoneDeploymentCreateData
---@field zone_id string
---@field deploy boolean

---@class LinkedZoneDomain
---@field deployed boolean
---@field id string
---@field name string
---@field owner string
---@field zone table

---@class LinkedZoneDomainLoadMatch
---@field name string

---@class LinkedZoneDomainListMatch
---@field name? string
---@field page? number
---@field per_page? number
---@field sharing_id? string
---@field zone_id? string

---@class LinkedZoneDomainUpdateData
---@field domains? any

---@class LinkedZoneTask
---@field created_at string
---@field ending_at? string
---@field id string
---@field result table
---@field status string
---@field type string
---@field updated_at? string
---@field zone_id string

---@class LinkedZoneTaskLoadMatch
---@field id string

---@class LinkedZoneTaskListMatch
---@field page? number
---@field per_page? number

---@class LivednsAxfrSlave
---@field message string

---@class LivednsAxfrSlaveListMatch
---@field fqdn string

---@class LivednsAxfrSlaveUpdateData
---@field fqdn string
---@field ip string
---@field message? string

---@class LivednsAxfrSlaveRemoveMatch
---@field fqdn string
---@field ip string

---@class LivednsAxfrTsig
---@field href string
---@field id string
---@field key_name string
---@field message string

---@class LivednsAxfrTsigListMatch
---@field fqdn string

---@class LivednsAxfrTsigUpdateData
---@field fqdn string
---@field id string
---@field sharing_id? string
---@field href? string
---@field key_name? string
---@field message? string

---@class LivednsAxfrTsigRemoveMatch
---@field fqdn string
---@field id string
---@field sharing_id? string

---@class LivednsDomain
---@field automatic_snapshots boolean
---@field domain_href string
---@field domain_keys_href string
---@field domain_records_href string
---@field fqdn string
---@field message string
---@field zone? table

---@class LivednsDomainLoadMatch
---@field fqdn string

---@class LivednsDomainListMatch
---@field page? number
---@field per_page? number
---@field sharing_id? string

---@class LivednsDomainCreateData
---@field sharing_id? string
---@field fqdn string
---@field zone? table

---@class LivednsDomainUpdateData
---@field fqdn string
---@field automatic_snapshots? boolean

---@class LivednsKey
---@field algorithm number
---@field algorithm_name string
---@field deleted boolean
---@field ds string
---@field fingerprint string
---@field flags number
---@field fqdn string
---@field id string
---@field key_href string
---@field message string
---@field public_key string
---@field status string
---@field tag number

---@class LivednsKeyLoadMatch
---@field fqdn string
---@field id string

---@class LivednsKeyListMatch
---@field fqdn string

---@class LivednsKeyCreateData
---@field fqdn string
---@field flags number

---@class LivednsKeyUpdateData
---@field fqdn string
---@field id string
---@field deleted? boolean

---@class LivednsKeyRemoveMatch
---@field fqdn string
---@field id string

---@class LivednsNameserver

---@class LivednsNameserverListMatch
---@field fqdn string

---@class LivednsRecord
---@field add_rrset_values? table
---@field id? string
---@field message string
---@field remove_rrset_values? table
---@field rrset_href string
---@field rrset_name string
---@field rrset_ttl? number
---@field rrset_type string
---@field rrset_values table

---@class LivednsRecordLoadMatch
---@field fqdn string
---@field rrset_name string
---@field rrset_type string

---@class LivednsRecordListMatch
---@field fqdn string
---@field page? number
---@field per_page? number
---@field rrset_type? string
---@field sort_by? string

---@class LivednsRecordCreateData
---@field fqdn string
---@field rrset_name? string
---@field rrset_type? string
---@field rrset_ttl? number
---@field rrset_values table

---@class LivednsRecordUpdateData
---@field fqdn string
---@field rrset_name string
---@field rrset_type string
---@field rrset_ttl? number
---@field rrset_values? table

---@class LivednsRecordPatchData
---@field fqdn string
---@field rrset_name string
---@field rrset_type string
---@field add_rrset_values? table
---@field remove_rrset_values? table
---@field rrset_ttl? number

---@class LivednsRecordRemoveMatch
---@field fqdn string
---@field rrset_name string
---@field rrset_type string

---@class LivednsRrtype

---@class LivednsRrtypeListMatch

---@class LivednsSnapshot
---@field automatic boolean
---@field created_at string
---@field href string
---@field id string
---@field message string
---@field name string
---@field zone_data table

---@class LivednsSnapshotLoadMatch
---@field fqdn string
---@field id string

---@class LivednsSnapshotListMatch
---@field fqdn string
---@field automatic? boolean
---@field page? number
---@field per_page? number
---@field sort_by? string

---@class LivednsSnapshotCreateData
---@field fqdn string
---@field name? string

---@class LivednsSnapshotUpdateData
---@field fqdn string
---@field id string
---@field name? string

---@class LivednsSnapshotRemoveMatch
---@field fqdn string
---@field id string

---@class LivednsTsigKey
---@field config_samples table
---@field href string
---@field id string
---@field key_name string
---@field secret string

---@class LivednsTsigKeyLoadMatch
---@field id string
---@field sharing_id? string

---@class LivednsTsigKeyListMatch
---@field sharing_id? string

---@class LivednsTsigKeyCreateData
---@field sharing_id? string
---@field config_samples table
---@field href string
---@field id string
---@field key_name string
---@field secret string

---@class LivednsZone
---@field items table
---@field message string
---@field remove_apex_ns? boolean

---@class LivednsZoneUpdateData
---@field fqdn string
---@field items? table
---@field remove_apex_ns? boolean

---@class LivednsZoneRemoveMatch
---@field fqdn string

---@class Mailbox
---@field address string
---@field aliases? table
---@field antispam boolean
---@field autorenew table
---@field config table
---@field config_name string
---@field created_at string
---@field data_access boolean
---@field domain_part string
---@field duration_month? number
---@field email string
---@field expires_at string
---@field internal_domain boolean
---@field issues? table
---@field last_paid_duration number
---@field local_part string
---@field message string
---@field owner table
---@field password string
---@field quota number
---@field quota_used number
---@field responder table
---@field updated_at string
---@field uuid string

---@class MailboxLoadMatch
---@field address string
---@field sharing_id? string

---@class MailboxListMatch
---@field address? string
---@field domain_part? string
---@field local_part? string
---@field page? number
---@field per_page? number
---@field search? string
---@field sharing_id? string
---@field sort_by? string

---@class MailboxCreateData
---@field sharing_id? string
---@field aliases? table
---@field config_name string
---@field duration_month? number
---@field email string
---@field password string

---@class MailboxUpdateData
---@field address string
---@field aliases? table
---@field antispam? boolean
---@field autorenew? table
---@field config_name? string
---@field password? string
---@field responder? table

---@class MailboxRemoveMatch
---@field address string
---@field sharing_id? string

---@class MailboxDomain
---@field antispam boolean
---@field configuration table
---@field date_last_validation? string
---@field dkim boolean
---@field fqdns table
---@field internal boolean
---@field is_livedns boolean
---@field mx boolean
---@field owner table
---@field spf boolean
---@field txt boolean

---@class MailboxDomainLoadMatch
---@field domain string

---@class MailboxDomainListMatch
---@field page? number
---@field per_page? number

---@class MailboxDomainCreateData
---@field domain string
---@field records_to_validate? any

---@class MailboxForward
---@field destinations table
---@field message string
---@field source string

---@class MailboxForwardListMatch
---@field page? number
---@field per_page? number
---@field search? string
---@field sharing_id? string
---@field sort_by? string

---@class MailboxForwardCreateData
---@field destinations table
---@field source string

---@class MailboxForwardUpdateData
---@field source string
---@field destinations? table

---@class MailboxForwardRemoveMatch
---@field source string

---@class MailboxProduct
---@field autorenew? boolean
---@field config table
---@field config_name string
---@field description string
---@field duration_month number
---@field label string
---@field message string
---@field prices table
---@field quantity number
---@field taxes table
---@field uuid string

---@class MailboxProductListMatch
---@field sharing_id? string

---@class MailboxProductCreateData
---@field sharing_id? string
---@field autorenew? boolean
---@field config_name string
---@field duration_month number
---@field quantity number

---@class MailboxQuota
---@field annually table
---@field config_name string
---@field label string
---@field monthly table
---@field quota string

---@class MailboxQuotaListMatch
---@field sharing_id? string

---@class MailboxSlot
---@field autorenew table
---@field config table
---@field expires_at? string
---@field last_paid_duration? number
---@field refund_info table
---@field refundable boolean
---@field uuid string
---@field webhosting_pack boolean

---@class MailboxSlotLoadMatch
---@field uuid string

---@class MailboxSlotListMatch
---@field config_name? string
---@field expires_at_gte? string
---@field expires_at_lte? string
---@field last_paid_duration? number
---@field page? number
---@field per_page? number
---@field refundable? string
---@field sharing_id? string
---@field sort_by? string
---@field webhosting_pack? boolean

---@class Organization
---@field city string
---@field corporate boolean
---@field country string
---@field email string
---@field fax? string
---@field firstname string
---@field id string
---@field lang? string
---@field lastname string
---@field message string
---@field name string
---@field orgname? string
---@field phone? string
---@field reference? string
---@field reseller boolean
---@field siren? string
---@field state? string
---@field streetaddr string
---@field streetaddr2? string
---@field type string
---@field vat_number? string
---@field zip string

---@class OrganizationLoadMatch
---@field id string

---@class OrganizationListMatch
---@field name? string
---@field permission? string
---@field sort_by? string
---@field type? string
---@field ["~name"]? string

---@class OrganizationCreateData
---@field city string
---@field country? string
---@field email string
---@field fax? string
---@field firstname string
---@field lang? string
---@field lastname string
---@field name string
---@field orgname string
---@field phone string
---@field reference? string
---@field reseller? boolean
---@field siren? string
---@field state? string
---@field streetaddr string
---@field streetaddr2? string
---@field type string
---@field vat_number? string
---@field zip? string

---@class OrganizationUpdateData
---@field id string
---@field city? string
---@field country? string
---@field email? string
---@field fax? string
---@field firstname? string
---@field lang? string
---@field lastname? string
---@field name? string
---@field phone? string
---@field reference? string
---@field reseller? boolean
---@field siren? string
---@field state? string
---@field streetaddr? string
---@field streetaddr2? string
---@field vat_number? string
---@field zip? string

---@class OrganizationRemoveMatch
---@field id string

---@class OrganizationCustomer
---@field city string
---@field country string
---@field email string
---@field fax? string
---@field firstname string
---@field id string
---@field lang? string
---@field lastname string
---@field message string
---@field name string
---@field orgname? string
---@field phone? string
---@field reference? string
---@field siren? string
---@field state? string
---@field streetaddr string
---@field streetaddr2? string
---@field sync_contact_email? string
---@field type string
---@field vat_number? string
---@field zip? string

---@class OrganizationCustomerLoadMatch
---@field id string
---@field org_id string

---@class OrganizationCustomerListMatch
---@field org_id string
---@field name? string
---@field page? number
---@field per_page? number
---@field permission? string
---@field sort_by? string

---@class OrganizationCustomerCreateData
---@field org_id string
---@field city string
---@field country string
---@field email string
---@field fax? string
---@field firstname string
---@field lastname string
---@field orgname? string
---@field phone string
---@field reference? string
---@field state? string
---@field streetaddr string
---@field streetaddr2? string
---@field type string
---@field zip? string

---@class OrganizationCustomerUpdateData
---@field id string
---@field org_id string
---@field city? string
---@field country? string
---@field email? string
---@field fax? string
---@field firstname? string
---@field lang? string
---@field lastname? string
---@field phone? string
---@field reference? string
---@field siren? string
---@field state? string
---@field streetaddr? string
---@field streetaddr2? string
---@field sync_contact_email? string
---@field vat_number? string
---@field zip? string

---@class OrganizationCustomerRemoveMatch
---@field id string
---@field org_id string

---@class Template
---@field description string
---@field editable boolean
---@field href string
---@field id string
---@field name string
---@field namespaces table
---@field orgname string
---@field payload table
---@field sharing_space table
---@field variables table

---@class TemplateLoadMatch
---@field id string

---@class TemplateListMatch
---@field page? number
---@field per_page? number

---@class TemplateCreateData
---@field sharing_id? string
---@field description? string
---@field name string
---@field payload table

---@class TemplateUpdateData
---@field id string
---@field description? string
---@field name? string
---@field payload? table

---@class TemplateRemoveMatch
---@field id string

---@class TemplateDispatch
---@field attempt number
---@field created_at string
---@field dispatch_href string
---@field id string
---@field message string
---@field object_id string
---@field object_type string
---@field payload table
---@field sharing_id string
---@field state number
---@field state_msg? string
---@field target table
---@field target_id string
---@field target_type string
---@field task_history table
---@field task_status table
---@field task_updated_at? string
---@field template_id? string
---@field template_name? string

---@class TemplateDispatchLoadMatch
---@field id string

---@class TemplateDispatchCreateData
---@field template_id string
---@field object_id string
---@field object_type string

---@class Tld
---@field authinfo_for_transfer boolean
---@field category string
---@field change_owner boolean
---@field corporate boolean
---@field ext_trade boolean
---@field full_tld string
---@field href string
---@field lock boolean
---@field name string

---@class TldLoadMatch
---@field name string

---@class TldListMatch
---@field category? string
---@field page? number
---@field per_page? number

---@class User
---@field city string
---@field country? string
---@field email string
---@field fax? string
---@field firstname? string
---@field id string
---@field lang string
---@field lastname? string
---@field name string
---@field phone? string
---@field state? string
---@field streetaddr? string
---@field streetaddr2? string
---@field username string
---@field zip? string

---@class UserLoadMatch
---@field city? string
---@field country? string
---@field email? string
---@field fax? string
---@field firstname? string
---@field id string
---@field lang? string
---@field lastname? string
---@field name? string
---@field phone? string
---@field state? string
---@field streetaddr? string
---@field streetaddr2? string
---@field username? string
---@field zip? string

local M = {}

return M
