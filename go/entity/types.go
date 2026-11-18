// Typed models for the Gandi SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/gandi-sdk/go/core"
)

// AccessToken is the typed data model for the access_token entity.
type AccessToken struct {
}

// AccessTokenCreateData is the typed request payload for AccessToken.CreateTyped.
type AccessTokenCreateData struct {
	ExpiresAt *string `json:"expires_at,omitempty"`
	Name *string `json:"name,omitempty"`
}

// AcmeAccount is the typed data model for the acme_account entity.
type AcmeAccount struct {
}

// AcmeAccountLoadMatch is the typed request payload for AcmeAccount.LoadTyped.
type AcmeAccountLoadMatch struct {
	Id string `json:"id"`
	SubscriptionId string `json:"subscription_id"`
	SharingId string `json:"sharing_id"`
}

// AcmeAccountListMatch is the typed request payload for AcmeAccount.ListTyped.
type AcmeAccountListMatch struct {
	SubscriptionId string `json:"subscription_id"`
	SharingId string `json:"sharing_id"`
}

// AcmeDomain is the typed data model for the acme_domain entity.
type AcmeDomain struct {
}

// AcmeDomainLoadMatch is the typed request payload for AcmeDomain.LoadTyped.
type AcmeDomainLoadMatch struct {
	DomainId int `json:"domain_id"`
	SubscriptionId string `json:"subscription_id"`
	SharingId string `json:"sharing_id"`
}

// AcmeDomainListMatch is the typed request payload for AcmeDomain.ListTyped.
type AcmeDomainListMatch struct {
	SubscriptionId string `json:"subscription_id"`
	Domain string `json:"domain"`
	SharingId string `json:"sharing_id"`
}

// AcmePrice is the typed data model for the acme_price entity.
type AcmePrice struct {
}

// AcmePriceListMatch is the typed request payload for AcmePrice.ListTyped.
type AcmePriceListMatch struct {
	Country string `json:"country"`
	Currency string `json:"currency"`
	Duration string `json:"duration"`
	Grid string `json:"grid"`
	Process string `json:"process"`
	Provider string `json:"provider"`
	SharingId string `json:"sharing_id"`
	ValidationType string `json:"validation_type"`
}

// AcmePriceCreateData is the typed request payload for AcmePrice.CreateTyped.
type AcmePriceCreateData struct {
	SharingId string `json:"sharing_id"`
	Country string `json:"country"`
	Currency string `json:"currency"`
	Domains []any `json:"domains"`
	Duration string `json:"duration"`
	Grid string `json:"grid"`
	Process string `json:"process"`
	Provider string `json:"provider"`
	ValidationType string `json:"validation_type"`
}

// AcmeSubscription is the typed data model for the acme_subscription entity.
type AcmeSubscription struct {
}

// AcmeSubscriptionLoadMatch is the typed request payload for AcmeSubscription.LoadTyped.
type AcmeSubscriptionLoadMatch struct {
	SubscriptionId string `json:"subscription_id"`
	SharingId string `json:"sharing_id"`
}

// AcmeSubscriptionListMatch is the typed request payload for AcmeSubscription.ListTyped.
type AcmeSubscriptionListMatch struct {
	CreatedAt string `json:"created_at"`
	EndsAt string `json:"ends_at"`
	Name string `json:"name"`
	Provider string `json:"provider"`
	SharingId string `json:"sharing_id"`
	Status string `json:"status"`
	ValidationType string `json:"validation_type"`
	Year string `json:"year"`
}

// AcmeSubscriptionCreateData is the typed request payload for AcmeSubscription.CreateTyped.
type AcmeSubscriptionCreateData struct {
	SharingId string `json:"sharing_id"`
	Country string `json:"country"`
	Currency string `json:"currency"`
	Domains []any `json:"domains"`
	Duration int `json:"duration"`
	Grid string `json:"grid"`
	Name string `json:"name"`
	Provider string `json:"provider"`
	ValidationType string `json:"validation_type"`
}

// AcmeSubscriptionUpdateData is the typed request payload for AcmeSubscription.UpdateTyped.
type AcmeSubscriptionUpdateData struct {
	SubscriptionId string `json:"subscription_id"`
	SharingId string `json:"sharing_id"`
	Name *string `json:"name,omitempty"`
}

// AcmeSubscriptionRemoveMatch is the typed request payload for AcmeSubscription.RemoveTyped.
type AcmeSubscriptionRemoveMatch struct {
	SubscriptionId string `json:"subscription_id"`
	SharingId string `json:"sharing_id"`
}

// BillingInfo is the typed data model for the billing_info entity.
type BillingInfo struct {
}

// BillingInfoLoadMatch is the typed request payload for BillingInfo.LoadTyped.
type BillingInfoLoadMatch struct {
	SharingId string `json:"sharing_id"`
}

// BillingPrice is the typed data model for the billing_price entity.
type BillingPrice struct {
}

// BillingPriceLoadMatch is the typed request payload for BillingPrice.LoadTyped.
type BillingPriceLoadMatch struct {
	Type string `json:"type"`
	ActivePhase *bool `json:"active_phase,omitempty"`
	Country *string `json:"country,omitempty"`
	Currency *string `json:"currency,omitempty"`
	Discount *[]any `json:"discount,omitempty"`
	DurationUnit *string `json:"duration_unit,omitempty"`
	Extension *string `json:"extension,omitempty"`
	Feature *bool `json:"feature,omitempty"`
	Grid *string `json:"grid,omitempty"`
	Lang *string `json:"lang,omitempty"`
	MaxDuration *int `json:"max_duration,omitempty"`
	Name []any `json:"name"`
	Page *int `json:"page,omitempty"`
	PerPage *int `json:"per_page,omitempty"`
	PricesAt *string `json:"prices_at,omitempty"`
	Process []any `json:"process"`
	SharingId *string `json:"sharing_id,omitempty"`
}

// CertificateDcv is the typed data model for the certificate_dcv entity.
type CertificateDcv struct {
}

// CertificateDcvUpdateData is the typed request payload for CertificateDcv.UpdateTyped.
type CertificateDcvUpdateData struct {
	CertificateId string `json:"certificate_id"`
	SharingId *string `json:"sharing_id,omitempty"`
	Message *string `json:"message,omitempty"`
	Method *string `json:"method,omitempty"`
}

// CertificateDcvPatchData is the typed request payload for CertificateDcv.PatchTyped.
type CertificateDcvPatchData struct {
	CertificateId string `json:"certificate_id"`
	SharingId *string `json:"sharing_id,omitempty"`
	Method *string `json:"method,omitempty"`
}

// CertificatePackage is the typed data model for the certificate_package entity.
type CertificatePackage struct {
}

// CertificatePackageLoadMatch is the typed request payload for CertificatePackage.LoadTyped.
type CertificatePackageLoadMatch struct {
	Name string `json:"name"`
}

// CertificatePackageListMatch is the typed request payload for CertificatePackage.ListTyped.
type CertificatePackageListMatch struct {
	Category *string `json:"category,omitempty"`
	MaxDomain *int `json:"max_domain,omitempty"`
	MinDomain *int `json:"min_domain,omitempty"`
	Page *int `json:"page,omitempty"`
	PerPage *int `json:"per_page,omitempty"`
	Trustlogo *bool `json:"trustlogo,omitempty"`
	Warranty *int `json:"warranty,omitempty"`
	Wildcard *bool `json:"wildcard,omitempty"`
}

// CertificatePem is the typed data model for the certificate_pem entity.
type CertificatePem struct {
}

// CertificatePemLoadMatch is the typed request payload for CertificatePem.LoadTyped.
type CertificatePemLoadMatch struct {
	Type string `json:"type"`
	Provider *string `json:"provider,omitempty"`
}

// CertificateRenewal is the typed data model for the certificate_renewal entity.
type CertificateRenewal struct {
}

// CertificateRenewalCreateData is the typed request payload for CertificateRenewal.CreateTyped.
type CertificateRenewalCreateData struct {
	CertificateId string `json:"certificate_id"`
	SharingId *string `json:"sharing_id,omitempty"`
	Csr *string `json:"csr,omitempty"`
	DcvMethod *string `json:"dcv_method,omitempty"`
	Duration *int `json:"duration,omitempty"`
}

// CertificateTag is the typed data model for the certificate_tag entity.
type CertificateTag struct {
}

// CertificateTagListMatch is the typed request payload for CertificateTag.ListTyped.
type CertificateTagListMatch struct {
	CertificateId string `json:"certificate_id"`
}

// CertificateTagCreateData is the typed request payload for CertificateTag.CreateTyped.
type CertificateTagCreateData struct {
	CertificateId string `json:"certificate_id"`
	Tag string `json:"tag"`
}

// CertificateTagUpdateData is the typed request payload for CertificateTag.UpdateTyped.
type CertificateTagUpdateData struct {
	CertificateId string `json:"certificate_id"`
	Tags *[]any `json:"tags,omitempty"`
}

// CertificateTagPatchData is the typed request payload for CertificateTag.PatchTyped.
type CertificateTagPatchData struct {
	CertificateId string `json:"certificate_id"`
	Add *[]any `json:"add,omitempty"`
	Remove *[]any `json:"remove,omitempty"`
}

// CertificateTagRemoveMatch is the typed request payload for CertificateTag.RemoveTyped.
type CertificateTagRemoveMatch struct {
	CertificateId string `json:"certificate_id"`
}

// Comment is the typed data model for the comment entity.
type Comment struct {
}

// CommentLoadMatch is the typed request payload for Comment.LoadTyped.
type CommentLoadMatch struct {
	EntityId string `json:"entity_id"`
}

// CommentCreateData is the typed request payload for Comment.CreateTyped.
type CommentCreateData struct {
	EntityId string `json:"entity_id"`
	Content string `json:"content"`
}

// CommentRemoveMatch is the typed request payload for Comment.RemoveTyped.
type CommentRemoveMatch struct {
	EntityId string `json:"entity_id"`
}

// Domain is the typed data model for the domain entity.
type Domain struct {
}

// DomainLoadMatch is the typed request payload for Domain.LoadTyped.
type DomainLoadMatch struct {
	Fqdn string `json:"fqdn"`
}

// DomainListMatch is the typed request payload for Domain.ListTyped.
type DomainListMatch struct {
	Fqdn *string `json:"fqdn,omitempty"`
	Nameserver *string `json:"nameserver,omitempty"`
	Page *int `json:"page,omitempty"`
	PerPage *int `json:"per_page,omitempty"`
	ReselleeId *string `json:"resellee_id,omitempty"`
	SharingId *string `json:"sharing_id,omitempty"`
	SortBy *string `json:"sort_by,omitempty"`
	Tld *string `json:"tld,omitempty"`
}

// DomainCreateData is the typed request payload for Domain.CreateTyped.
type DomainCreateData struct {
	SharingId *string `json:"sharing_id,omitempty"`
	Admin map[string]any `json:"admin"`
	Bill map[string]any `json:"bill"`
	Claims *string `json:"claims,omitempty"`
	Currency *string `json:"currency,omitempty"`
	Duration *int `json:"duration,omitempty"`
	EnforcePremium *bool `json:"enforce_premium,omitempty"`
	ExtraParameters *map[string]any `json:"extra_parameters,omitempty"`
	Fqdn string `json:"fqdn"`
	Lang *string `json:"lang,omitempty"`
	MailboxOptin *bool `json:"mailbox_optin,omitempty"`
	Nameservers *[]any `json:"nameservers,omitempty"`
	NameserversIps *map[string]any `json:"nameservers_ips,omitempty"`
	Owner map[string]any `json:"owner"`
	Price *float64 `json:"price,omitempty"`
	ReselleeId *string `json:"resellee_id,omitempty"`
	Smd *string `json:"smd,omitempty"`
	Tech map[string]any `json:"tech"`
	TemplateId *string `json:"template_id,omitempty"`
	TldPeriod *string `json:"tld_period,omitempty"`
}

// DomainUpdateData is the typed request payload for Domain.UpdateTyped.
type DomainUpdateData struct {
	Fqdn string `json:"fqdn"`
	Admin *map[string]any `json:"admin,omitempty"`
	Authinfo *string `json:"authinfo,omitempty"`
	Autorenew *map[string]any `json:"autorenew,omitempty"`
	Bill *map[string]any `json:"bill,omitempty"`
	CanTldLock *bool `json:"can_tld_lock,omitempty"`
	Claims *string `json:"claims,omitempty"`
	Contacts *map[string]any `json:"contacts,omitempty"`
	Currency *string `json:"currency,omitempty"`
	Dates *map[string]any `json:"dates,omitempty"`
	DomainOwner *string `json:"domain_owner,omitempty"`
	Duration *int `json:"duration,omitempty"`
	EnforcePremium *bool `json:"enforce_premium,omitempty"`
	Errors *[]any `json:"errors,omitempty"`
	ExtraParameters *map[string]any `json:"extra_parameters,omitempty"`
	FqdnUnicode *string `json:"fqdn_unicode,omitempty"`
	Href *string `json:"href,omitempty"`
	Id *string `json:"id,omitempty"`
	Lang *string `json:"lang,omitempty"`
	MailboxOptin *bool `json:"mailbox_optin,omitempty"`
	Nameserver *map[string]any `json:"nameserver,omitempty"`
	Nameservers *[]any `json:"nameservers,omitempty"`
	NameserversIps *map[string]any `json:"nameservers_ips,omitempty"`
	OrgaOwner *string `json:"orga_owner,omitempty"`
	Owner *map[string]any `json:"owner,omitempty"`
	Price *float64 `json:"price,omitempty"`
	Reachability *string `json:"reachability,omitempty"`
	ReselleeId *string `json:"resellee_id,omitempty"`
	Services *[]any `json:"services,omitempty"`
	SharingId *string `json:"sharing_id,omitempty"`
	SharingSpace *map[string]any `json:"sharing_space,omitempty"`
	Smd *string `json:"smd,omitempty"`
	Status *[]any `json:"status,omitempty"`
	Tags *[]any `json:"tags,omitempty"`
	Tech *map[string]any `json:"tech,omitempty"`
	TemplateId *string `json:"template_id,omitempty"`
	Tld *string `json:"tld,omitempty"`
	TldPeriod *string `json:"tld_period,omitempty"`
	TrusteeRoles *[]any `json:"trustee_roles,omitempty"`
	Action *any `json:"action,omitempty"`
	ClientTransferProhibited *any `json:"clientTransferProhibited,omitempty"`
	Enabled *any `json:"enabled,omitempty"`
	OrgId *any `json:"org_id,omitempty"`
}

// DomainRemoveMatch is the typed request payload for Domain.RemoveTyped.
type DomainRemoveMatch struct {
	Fqdn string `json:"fqdn"`
}

// DomainAvailability is the typed data model for the domain_availability entity.
type DomainAvailability struct {
}

// DomainAvailabilityLoadMatch is the typed request payload for DomainAvailability.LoadTyped.
type DomainAvailabilityLoadMatch struct {
	Country *string `json:"country,omitempty"`
	Currency *string `json:"currency,omitempty"`
	DurationUnit *string `json:"duration_unit,omitempty"`
	Extension *string `json:"extension,omitempty"`
	Grid *string `json:"grid,omitempty"`
	Lang *string `json:"lang,omitempty"`
	MaxDuration *int `json:"max_duration,omitempty"`
	Name string `json:"name"`
	Period *string `json:"period,omitempty"`
	Process *[]any `json:"process,omitempty"`
	SharingId *string `json:"sharing_id,omitempty"`
}

// DomainChangeOwner is the typed data model for the domain_change_owner entity.
type DomainChangeOwner struct {
}

// DomainChangeOwnerLoadMatch is the typed request payload for DomainChangeOwner.LoadTyped.
type DomainChangeOwnerLoadMatch struct {
	Domain string `json:"domain"`
	SharingId *string `json:"sharing_id,omitempty"`
}

// DomainChangeOwnerCreateData is the typed request payload for DomainChangeOwner.CreateTyped.
type DomainChangeOwnerCreateData struct {
	Domain string `json:"domain"`
	SharingId *string `json:"sharing_id,omitempty"`
	Admin map[string]any `json:"admin"`
	Bill map[string]any `json:"bill"`
	Owner map[string]any `json:"owner"`
	Tech map[string]any `json:"tech"`
}

// DomainClaim is the typed data model for the domain_claim entity.
type DomainClaim struct {
}

// DomainClaimLoadMatch is the typed request payload for DomainClaim.LoadTyped.
type DomainClaimLoadMatch struct {
	Domain string `json:"domain"`
}

// DomainClaimCreateData is the typed request payload for DomainClaim.CreateTyped.
type DomainClaimCreateData struct {
	Domain string `json:"domain"`
	Claims []any `json:"claims"`
	CreatedAt string `json:"created_at"`
	ExpiresAt string `json:"expires_at"`
	Fqdn string `json:"fqdn"`
	FqdnAlabel string `json:"fqdn_alabel"`
	FqdnUlabel string `json:"fqdn_ulabel"`
	NoticeId string `json:"notice_id"`
	Status string `json:"status"`
}

// DomainContact is the typed data model for the domain_contact entity.
type DomainContact struct {
}

// DomainContactLoadMatch is the typed request payload for DomainContact.LoadTyped.
type DomainContactLoadMatch struct {
	Domain string `json:"domain"`
}

// DomainContactUpdateData is the typed request payload for DomainContact.UpdateTyped.
type DomainContactUpdateData struct {
	Domain string `json:"domain"`
	Admin *map[string]any `json:"admin,omitempty"`
	Bill *map[string]any `json:"bill,omitempty"`
	Tech *map[string]any `json:"tech,omitempty"`
}

// DomainDnskey is the typed data model for the domain_dnskey entity.
type DomainDnskey struct {
}

// DomainDnskeyListMatch is the typed request payload for DomainDnskey.ListTyped.
type DomainDnskeyListMatch struct {
	Domain string `json:"domain"`
	Page *int `json:"page,omitempty"`
	PerPage *int `json:"per_page,omitempty"`
}

// DomainDnskeyCreateData is the typed request payload for DomainDnskey.CreateTyped.
type DomainDnskeyCreateData struct {
	Domain string `json:"domain"`
	Algorithm int `json:"algorithm"`
	PublicKey string `json:"public_key"`
	Type string `json:"type"`
}

// DomainDnskeyUpdateData is the typed request payload for DomainDnskey.UpdateTyped.
type DomainDnskeyUpdateData struct {
	Domain string `json:"domain"`
	Keys *[]any `json:"keys,omitempty"`
}

// DomainDnskeyRemoveMatch is the typed request payload for DomainDnskey.RemoveTyped.
type DomainDnskeyRemoveMatch struct {
	Domain string `json:"domain"`
	Id string `json:"id"`
}

// DomainDnssec is the typed data model for the domain_dnssec entity.
type DomainDnssec struct {
}

// DomainDnssecLoadMatch is the typed request payload for DomainDnssec.LoadTyped.
type DomainDnssecLoadMatch struct {
	Domain string `json:"domain"`
}

// DomainDnssecCreateData is the typed request payload for DomainDnssec.CreateTyped.
type DomainDnssecCreateData struct {
	Domain string `json:"domain"`
	SharingId *string `json:"sharing_id,omitempty"`
	Error *string `json:"error,omitempty"`
	State string `json:"state"`
}

// DomainDnssecRemoveMatch is the typed request payload for DomainDnssec.RemoveTyped.
type DomainDnssecRemoveMatch struct {
	Domain string `json:"domain"`
	SharingId *string `json:"sharing_id,omitempty"`
}

// DomainHost is the typed data model for the domain_host entity.
type DomainHost struct {
}

// DomainHostLoadMatch is the typed request payload for DomainHost.LoadTyped.
type DomainHostLoadMatch struct {
	Domain string `json:"domain"`
	Name string `json:"name"`
}

// DomainHostListMatch is the typed request payload for DomainHost.ListTyped.
type DomainHostListMatch struct {
	Domain string `json:"domain"`
	Page *int `json:"page,omitempty"`
	PerPage *int `json:"per_page,omitempty"`
}

// DomainHostCreateData is the typed request payload for DomainHost.CreateTyped.
type DomainHostCreateData struct {
	Domain string `json:"domain"`
	Page *int `json:"page,omitempty"`
	PerPage *int `json:"per_page,omitempty"`
	Ips []any `json:"ips"`
	Name string `json:"name"`
}

// DomainHostUpdateData is the typed request payload for DomainHost.UpdateTyped.
type DomainHostUpdateData struct {
	Domain string `json:"domain"`
	Name string `json:"name"`
	Ips *[]any `json:"ips,omitempty"`
}

// DomainHostRemoveMatch is the typed request payload for DomainHost.RemoveTyped.
type DomainHostRemoveMatch struct {
	Domain string `json:"domain"`
	Name string `json:"name"`
}

// DomainLivedns is the typed data model for the domain_livedns entity.
type DomainLivedns struct {
}

// DomainLivednsLoadMatch is the typed request payload for DomainLivedns.LoadTyped.
type DomainLivednsLoadMatch struct {
	Domain string `json:"domain"`
}

// DomainLivednsCreateData is the typed request payload for DomainLivedns.CreateTyped.
type DomainLivednsCreateData struct {
	Domain string `json:"domain"`
	Current string `json:"current"`
	DnssecAvailable *bool `json:"dnssec_available,omitempty"`
	LivednssecAvailable *bool `json:"livednssec_available,omitempty"`
	Message string `json:"message"`
	Nameservers []any `json:"nameservers"`
}

// DomainNameserver is the typed data model for the domain_nameserver entity.
type DomainNameserver struct {
}

// DomainNameserverListMatch is the typed request payload for DomainNameserver.ListTyped.
type DomainNameserverListMatch struct {
	Domain string `json:"domain"`
}

// DomainNameserverUpdateData is the typed request payload for DomainNameserver.UpdateTyped.
type DomainNameserverUpdateData struct {
	Domain string `json:"domain"`
	Nameservers *[]any `json:"nameservers,omitempty"`
}

// DomainTag is the typed data model for the domain_tag entity.
type DomainTag struct {
}

// DomainTagListMatch is the typed request payload for DomainTag.ListTyped.
type DomainTagListMatch struct {
	Domain string `json:"domain"`
}

// DomainTagCreateData is the typed request payload for DomainTag.CreateTyped.
type DomainTagCreateData struct {
	Domain string `json:"domain"`
	Tag string `json:"tag"`
}

// DomainTagUpdateData is the typed request payload for DomainTag.UpdateTyped.
type DomainTagUpdateData struct {
	Domain string `json:"domain"`
	Tags *[]any `json:"tags,omitempty"`
}

// DomainTagPatchData is the typed request payload for DomainTag.PatchTyped.
type DomainTagPatchData struct {
	Domain string `json:"domain"`
	Add *[]any `json:"add,omitempty"`
	Remove *[]any `json:"remove,omitempty"`
}

// DomainTagRemoveMatch is the typed request payload for DomainTag.RemoveTyped.
type DomainTagRemoveMatch struct {
	Domain string `json:"domain"`
}

// DomainTransfer is the typed data model for the domain_transfer entity.
type DomainTransfer struct {
}

// DomainTransferLoadMatch is the typed request payload for DomainTransfer.LoadTyped.
type DomainTransferLoadMatch struct {
	Domain string `json:"domain"`
}

// DomainTransferCreateData is the typed request payload for DomainTransfer.CreateTyped.
type DomainTransferCreateData struct {
	SharingId *string `json:"sharing_id,omitempty"`
	Admin map[string]any `json:"admin"`
	Authinfo *string `json:"authinfo,omitempty"`
	Bill map[string]any `json:"bill"`
	ChangeOwner *bool `json:"change_owner,omitempty"`
	Currency *string `json:"currency,omitempty"`
	Duration *int `json:"duration,omitempty"`
	EnforcePremium *bool `json:"enforce_premium,omitempty"`
	ExtraParameters *map[string]any `json:"extra_parameters,omitempty"`
	Fqdn string `json:"fqdn"`
	MailboxOptin *bool `json:"mailbox_optin,omitempty"`
	Nameservers *[]any `json:"nameservers,omitempty"`
	NameserversIps *map[string]any `json:"nameservers_ips,omitempty"`
	Owner map[string]any `json:"owner"`
	Price *float64 `json:"price,omitempty"`
	ReselleeId *string `json:"resellee_id,omitempty"`
	Tech map[string]any `json:"tech"`
	TemplateId *string `json:"template_id,omitempty"`
}

// DomainTransferUpdateData is the typed request payload for DomainTransfer.UpdateTyped.
type DomainTransferUpdateData struct {
	Domain string `json:"domain"`
	Admin *map[string]any `json:"admin,omitempty"`
	Authinfo *string `json:"authinfo,omitempty"`
	Bill *map[string]any `json:"bill,omitempty"`
	ChangeOwner *bool `json:"change_owner,omitempty"`
	CreatedAt *string `json:"created_at,omitempty"`
	Currency *string `json:"currency,omitempty"`
	Duration *int `json:"duration,omitempty"`
	EnforcePremium *bool `json:"enforce_premium,omitempty"`
	Errors *[]any `json:"errors,omitempty"`
	Errortype *string `json:"errortype,omitempty"`
	ErrortypeLabel *string `json:"errortype_label,omitempty"`
	ExtraParameters *map[string]any `json:"extra_parameters,omitempty"`
	Foa *[]any `json:"foa,omitempty"`
	Fqdn *string `json:"fqdn,omitempty"`
	InnerStep *string `json:"inner_step,omitempty"`
	MailboxOptin *bool `json:"mailbox_optin,omitempty"`
	Message *string `json:"message,omitempty"`
	Nameservers *[]any `json:"nameservers,omitempty"`
	NameserversIps *map[string]any `json:"nameservers_ips,omitempty"`
	Owner *map[string]any `json:"owner,omitempty"`
	OwnerContact *string `json:"owner_contact,omitempty"`
	Params *map[string]any `json:"params,omitempty"`
	Price *float64 `json:"price,omitempty"`
	RegacAt *string `json:"regac_at,omitempty"`
	ReselleeId *string `json:"resellee_id,omitempty"`
	StartAt *string `json:"start_at,omitempty"`
	Status *string `json:"status,omitempty"`
	Step *string `json:"step,omitempty"`
	StepNb *int `json:"step_nb,omitempty"`
	Tech *map[string]any `json:"tech,omitempty"`
	TemplateId *string `json:"template_id,omitempty"`
	TransferLink *string `json:"transfer_link,omitempty"`
	TransferProcedure *string `json:"transfer_procedure,omitempty"`
	UpdatedAt *string `json:"updated_at,omitempty"`
}

// DomainWebredir is the typed data model for the domain_webredir entity.
type DomainWebredir struct {
}

// DomainWebredirLoadMatch is the typed request payload for DomainWebredir.LoadTyped.
type DomainWebredirLoadMatch struct {
	Domain string `json:"domain"`
	Host string `json:"host"`
}

// DomainWebredirListMatch is the typed request payload for DomainWebredir.ListTyped.
type DomainWebredirListMatch struct {
	Domain string `json:"domain"`
	Page *int `json:"page,omitempty"`
	PerPage *int `json:"per_page,omitempty"`
}

// DomainWebredirCreateData is the typed request payload for DomainWebredir.CreateTyped.
type DomainWebredirCreateData struct {
	Domain string `json:"domain"`
	Page *int `json:"page,omitempty"`
	PerPage *int `json:"per_page,omitempty"`
	Host string `json:"host"`
	Override bool `json:"override"`
	Protocol string `json:"protocol"`
	Type string `json:"type"`
	Url string `json:"url"`
}

// DomainWebredirUpdateData is the typed request payload for DomainWebredir.UpdateTyped.
type DomainWebredirUpdateData struct {
	Domain string `json:"domain"`
	Host string `json:"host"`
	Override *bool `json:"override,omitempty"`
	Protocol *string `json:"protocol,omitempty"`
	Type *string `json:"type,omitempty"`
	Url *string `json:"url,omitempty"`
}

// DomainWebredirRemoveMatch is the typed request payload for DomainWebredir.RemoveTyped.
type DomainWebredirRemoveMatch struct {
	Domain string `json:"domain"`
	Host string `json:"host"`
}

// EmailForward is the typed data model for the email_forward entity.
type EmailForward struct {
}

// EmailForwardListMatch is the typed request payload for EmailForward.ListTyped.
type EmailForwardListMatch struct {
	Domain string `json:"domain"`
	Destination *string `json:"destination,omitempty"`
	Page *int `json:"page,omitempty"`
	PerPage *int `json:"per_page,omitempty"`
	SortBy *string `json:"sort_by,omitempty"`
	Source *string `json:"source,omitempty"`
}

// EmailForwardCreateData is the typed request payload for EmailForward.CreateTyped.
type EmailForwardCreateData struct {
	Domain string `json:"domain"`
	Destinations []any `json:"destinations"`
	Source string `json:"source"`
}

// EmailForwardUpdateData is the typed request payload for EmailForward.UpdateTyped.
type EmailForwardUpdateData struct {
	Domain string `json:"domain"`
	Source string `json:"source"`
	Destinations *[]any `json:"destinations,omitempty"`
}

// EmailForwardRemoveMatch is the typed request payload for EmailForward.RemoveTyped.
type EmailForwardRemoveMatch struct {
	Domain string `json:"domain"`
	Source string `json:"source"`
}

// EmailMailbox is the typed data model for the email_mailbox entity.
type EmailMailbox struct {
}

// EmailMailboxLoadMatch is the typed request payload for EmailMailbox.LoadTyped.
type EmailMailboxLoadMatch struct {
	Domain string `json:"domain"`
	Id string `json:"id"`
}

// EmailMailboxListMatch is the typed request payload for EmailMailbox.ListTyped.
type EmailMailboxListMatch struct {
	Domain string `json:"domain"`
	CreatedAt *string `json:"<created_at,omitempty"`
	Antispam *bool `json:"antispam,omitempty"`
	Login *string `json:"login,omitempty"`
	MailboxType *string `json:"mailbox_type,omitempty"`
	Page *int `json:"page,omitempty"`
	PerPage *int `json:"per_page,omitempty"`
	Login2 *string `json:"~login,omitempty"`
}

// EmailMailboxCreateData is the typed request payload for EmailMailbox.CreateTyped.
type EmailMailboxCreateData struct {
	Domain string `json:"domain"`
	Aliases *[]any `json:"aliases,omitempty"`
	Antispam *bool `json:"antispam,omitempty"`
	Login string `json:"login"`
	MailboxType string `json:"mailbox_type"`
	Password string `json:"password"`
}

// EmailMailboxUpdateData is the typed request payload for EmailMailbox.UpdateTyped.
type EmailMailboxUpdateData struct {
	Domain string `json:"domain"`
	Id string `json:"id"`
	SharingId *string `json:"sharing_id,omitempty"`
	Aliases *[]any `json:"aliases,omitempty"`
	Antispam *bool `json:"antispam,omitempty"`
	Autorenew *map[string]any `json:"autorenew,omitempty"`
	Login *string `json:"login,omitempty"`
	MailboxType *string `json:"mailbox_type,omitempty"`
	Password *string `json:"password,omitempty"`
	Responder *map[string]any `json:"responder,omitempty"`
}

// EmailMailboxRemoveMatch is the typed request payload for EmailMailbox.RemoveTyped.
type EmailMailboxRemoveMatch struct {
	Domain string `json:"domain"`
	Id string `json:"id"`
}

// EmailMigration is the typed data model for the email_migration entity.
type EmailMigration struct {
}

// EmailMigrationLoadMatch is the typed request payload for EmailMigration.LoadTyped.
type EmailMigrationLoadMatch struct {
	Domain string `json:"domain"`
	SharingId *string `json:"sharing_id,omitempty"`
}

// EmailMigrationCreateData is the typed request payload for EmailMigration.CreateTyped.
type EmailMigrationCreateData struct {
	Domain string `json:"domain"`
	SharingId *string `json:"sharing_id,omitempty"`
	Token string `json:"token"`
}

// EmailOffer is the typed data model for the email_offer entity.
type EmailOffer struct {
}

// EmailOfferLoadMatch is the typed request payload for EmailOffer.LoadTyped.
type EmailOfferLoadMatch struct {
	Domain string `json:"domain"`
}

// EmailOfferUpdateData is the typed request payload for EmailOffer.UpdateTyped.
type EmailOfferUpdateData struct {
	Domain string `json:"domain"`
	Antispam *string `json:"antispam,omitempty"`
	Dkim *string `json:"dkim,omitempty"`
}

// EmailSlot is the typed data model for the email_slot entity.
type EmailSlot struct {
}

// EmailSlotLoadMatch is the typed request payload for EmailSlot.LoadTyped.
type EmailSlotLoadMatch struct {
	Domain string `json:"domain"`
	Id int `json:"id"`
}

// EmailSlotListMatch is the typed request payload for EmailSlot.ListTyped.
type EmailSlotListMatch struct {
	Domain string `json:"domain"`
	DisplayNotExpiredAndInactive *bool `json:"display_not_expired_and_inactive,omitempty"`
}

// EmailSlotCreateData is the typed request payload for EmailSlot.CreateTyped.
type EmailSlotCreateData struct {
	Domain string `json:"domain"`
	SharingId *string `json:"sharing_id,omitempty"`
	Autorenew *bool `json:"autorenew,omitempty"`
	Duration int `json:"duration"`
	MailboxType string `json:"mailbox_type"`
}

// EmailSlotRemoveMatch is the typed request payload for EmailSlot.RemoveTyped.
type EmailSlotRemoveMatch struct {
	Domain string `json:"domain"`
	Id int `json:"id"`
}

// HostingApplication is the typed data model for the hosting_application entity.
type HostingApplication struct {
}

// HostingApplicationLoadMatch is the typed request payload for HostingApplication.LoadTyped.
type HostingApplicationLoadMatch struct {
	Name string `json:"name"`
}

// HostingApplicationListMatch is the typed request payload for HostingApplication.ListTyped.
type HostingApplicationListMatch struct {
	Database *string `json:"database,omitempty"`
	Language *string `json:"language,omitempty"`
	Name *string `json:"name,omitempty"`
	Page *int `json:"page,omitempty"`
	PerPage *int `json:"per_page,omitempty"`
	SharingId *string `json:"sharing_id,omitempty"`
	SortBy *string `json:"sort_by,omitempty"`
}

// HostingInstance is the typed data model for the hosting_instance entity.
type HostingInstance struct {
}

// HostingInstanceLoadMatch is the typed request payload for HostingInstance.LoadTyped.
type HostingInstanceLoadMatch struct {
	Id string `json:"id"`
}

// HostingInstanceListMatch is the typed request payload for HostingInstance.ListTyped.
type HostingInstanceListMatch struct {
	Fqdn *string `json:"fqdn,omitempty"`
	Name *string `json:"name,omitempty"`
	Page *int `json:"page,omitempty"`
	PerPage *int `json:"per_page,omitempty"`
	SharingId *string `json:"sharing_id,omitempty"`
	Size *string `json:"size,omitempty"`
	SortBy *string `json:"sort_by,omitempty"`
	Status *string `json:"status,omitempty"`
}

// HostingInstanceCreateData is the typed request payload for HostingInstance.CreateTyped.
type HostingInstanceCreateData struct {
	SharingId *string `json:"sharing_id,omitempty"`
	Authentication map[string]any `json:"authentication"`
	Autorenew *map[string]any `json:"autorenew,omitempty"`
	Domain string `json:"domain"`
	Duration *int `json:"duration,omitempty"`
	DurationUnit *string `json:"duration_unit,omitempty"`
	Location string `json:"location"`
	Name *string `json:"name,omitempty"`
	Size string `json:"size"`
	SnapshotEnabled *bool `json:"snapshot_enabled,omitempty"`
	StorageAdditionalSize *int `json:"storage_additional_size,omitempty"`
	Type map[string]any `json:"type"`
	Vhosts *[]any `json:"vhosts,omitempty"`
}

// HostingInstanceUpdateData is the typed request payload for HostingInstance.UpdateTyped.
type HostingInstanceUpdateData struct {
	Id string `json:"id"`
	Booster *map[string]any `json:"booster,omitempty"`
	BoosterOptions *map[string]any `json:"booster_options,omitempty"`
	LanguageId *string `json:"language_id,omitempty"`
	Name *string `json:"name,omitempty"`
	Password *string `json:"password,omitempty"`
	Size *string `json:"size,omitempty"`
	SnapshotEnabled *bool `json:"snapshot_enabled,omitempty"`
	StorageAdditionalSize *int `json:"storage_additional_size,omitempty"`
}

// HostingInstanceRemoveMatch is the typed request payload for HostingInstance.RemoveTyped.
type HostingInstanceRemoveMatch struct {
	Id string `json:"id"`
}

// HostingVhost is the typed data model for the hosting_vhost entity.
type HostingVhost struct {
}

// HostingVhostLoadMatch is the typed request payload for HostingVhost.LoadTyped.
type HostingVhostLoadMatch struct {
	Fqdn string `json:"fqdn"`
	InstanceId string `json:"instance_id"`
}

// HostingVhostListMatch is the typed request payload for HostingVhost.ListTyped.
type HostingVhostListMatch struct {
	InstanceId string `json:"instance_id"`
	Fqdn *string `json:"fqdn,omitempty"`
	Page *int `json:"page,omitempty"`
	PerPage *int `json:"per_page,omitempty"`
	SortBy *string `json:"sort_by,omitempty"`
	Status *string `json:"status,omitempty"`
}

// HostingVhostCreateData is the typed request payload for HostingVhost.CreateTyped.
type HostingVhostCreateData struct {
	InstanceId string `json:"instance_id"`
	Application map[string]any `json:"application"`
	Fqdn string `json:"fqdn"`
	LinkedDnsZone map[string]any `json:"linked_dns_zone"`
}

// HostingVhostUpdateData is the typed request payload for HostingVhost.UpdateTyped.
type HostingVhostUpdateData struct {
	Fqdn string `json:"fqdn"`
	InstanceId string `json:"instance_id"`
	Application *map[string]any `json:"application,omitempty"`
	HttpsStrategy *string `json:"https_strategy,omitempty"`
	LinkedDnsZone *map[string]any `json:"linked_dns_zone,omitempty"`
}

// HostingVhostRemoveMatch is the typed request payload for HostingVhost.RemoveTyped.
type HostingVhostRemoveMatch struct {
	Fqdn string `json:"fqdn"`
	InstanceId string `json:"instance_id"`
}

// IssuedCertificate is the typed data model for the issued_certificate entity.
type IssuedCertificate struct {
}

// IssuedCertificateLoadMatch is the typed request payload for IssuedCertificate.LoadTyped.
type IssuedCertificateLoadMatch struct {
	Id string `json:"id"`
}

// IssuedCertificateListMatch is the typed request payload for IssuedCertificate.ListTyped.
type IssuedCertificateListMatch struct {
	Cn *string `json:"cn,omitempty"`
	CnEq *string `json:"cn_eq,omitempty"`
	CoveredCn *string `json:"covered_cn,omitempty"`
	Package *string `json:"package,omitempty"`
	Page *int `json:"page,omitempty"`
	PerPage *int `json:"per_page,omitempty"`
	SharingId *string `json:"sharing_id,omitempty"`
	SortBy *string `json:"sort_by,omitempty"`
	Status *string `json:"status,omitempty"`
}

// IssuedCertificateCreateData is the typed request payload for IssuedCertificate.CreateTyped.
type IssuedCertificateCreateData struct {
	SharingId *string `json:"sharing_id,omitempty"`
	Altnames *[]any `json:"altnames,omitempty"`
	ApexOnly *bool `json:"apex_only,omitempty"`
	Cn *string `json:"cn,omitempty"`
	Csr *string `json:"csr,omitempty"`
	DcvMethod *string `json:"dcv_method,omitempty"`
	Duration *int `json:"duration,omitempty"`
	Package map[string]any `json:"package"`
	ReselleeId *string `json:"resellee_id,omitempty"`
}

// IssuedCertificateUpdateData is the typed request payload for IssuedCertificate.UpdateTyped.
type IssuedCertificateUpdateData struct {
	Id string `json:"id"`
	SharingId *string `json:"sharing_id,omitempty"`
	Altnames *[]any `json:"altnames,omitempty"`
	Csr *string `json:"csr,omitempty"`
	DcvMethod *string `json:"dcv_method,omitempty"`
}

// IssuedCertificateRemoveMatch is the typed request payload for IssuedCertificate.RemoveTyped.
type IssuedCertificateRemoveMatch struct {
	Id string `json:"id"`
	SharingId *string `json:"sharing_id,omitempty"`
}

// LinkedZone is the typed data model for the linked_zone entity.
type LinkedZone struct {
}

// LinkedZoneLoadMatch is the typed request payload for LinkedZone.LoadTyped.
type LinkedZoneLoadMatch struct {
	Id string `json:"id"`
	SharingId *string `json:"sharing_id,omitempty"`
}

// LinkedZoneListMatch is the typed request payload for LinkedZone.ListTyped.
type LinkedZoneListMatch struct {
	Page *int `json:"page,omitempty"`
	PerPage *int `json:"per_page,omitempty"`
	SharingId *string `json:"sharing_id,omitempty"`
}

// LinkedZoneCreateData is the typed request payload for LinkedZone.CreateTyped.
type LinkedZoneCreateData struct {
	DefaultRecords *bool `json:"default_records,omitempty"`
	Name string `json:"name"`
	RecordList *[]any `json:"record_list,omitempty"`
	RecordText *string `json:"record_text,omitempty"`
}

// LinkedZoneUpdateData is the typed request payload for LinkedZone.UpdateTyped.
type LinkedZoneUpdateData struct {
	Id string `json:"id"`
	DefaultRecords *bool `json:"default_records,omitempty"`
	Name *string `json:"name,omitempty"`
	RecordList *[]any `json:"record_list,omitempty"`
	RecordText *string `json:"record_text,omitempty"`
}

// LinkedZoneRemoveMatch is the typed request payload for LinkedZone.RemoveTyped.
type LinkedZoneRemoveMatch struct {
	Id string `json:"id"`
}

// LinkedZoneDeployment is the typed data model for the linked_zone_deployment entity.
type LinkedZoneDeployment struct {
}

// LinkedZoneDeploymentCreateData is the typed request payload for LinkedZoneDeployment.CreateTyped.
type LinkedZoneDeploymentCreateData struct {
	ZoneId string `json:"zone_id"`
	Deploy bool `json:"deploy"`
}

// LinkedZoneDomain is the typed data model for the linked_zone_domain entity.
type LinkedZoneDomain struct {
}

// LinkedZoneDomainLoadMatch is the typed request payload for LinkedZoneDomain.LoadTyped.
type LinkedZoneDomainLoadMatch struct {
	Name string `json:"name"`
}

// LinkedZoneDomainListMatch is the typed request payload for LinkedZoneDomain.ListTyped.
type LinkedZoneDomainListMatch struct {
	Name *string `json:"name,omitempty"`
	Page *int `json:"page,omitempty"`
	PerPage *int `json:"per_page,omitempty"`
	SharingId *string `json:"sharing_id,omitempty"`
	ZoneId *string `json:"zone_id,omitempty"`
}

// LinkedZoneDomainUpdateData is the typed request payload for LinkedZoneDomain.UpdateTyped.
type LinkedZoneDomainUpdateData struct {
	Domains *any `json:"domains,omitempty"`
}

// LinkedZoneTask is the typed data model for the linked_zone_task entity.
type LinkedZoneTask struct {
}

// LinkedZoneTaskLoadMatch is the typed request payload for LinkedZoneTask.LoadTyped.
type LinkedZoneTaskLoadMatch struct {
	Id string `json:"id"`
}

// LinkedZoneTaskListMatch is the typed request payload for LinkedZoneTask.ListTyped.
type LinkedZoneTaskListMatch struct {
	Page *int `json:"page,omitempty"`
	PerPage *int `json:"per_page,omitempty"`
}

// LivednsAxfrSlave is the typed data model for the livedns_axfr_slave entity.
type LivednsAxfrSlave struct {
}

// LivednsAxfrSlaveListMatch is the typed request payload for LivednsAxfrSlave.ListTyped.
type LivednsAxfrSlaveListMatch struct {
	Fqdn string `json:"fqdn"`
}

// LivednsAxfrSlaveUpdateData is the typed request payload for LivednsAxfrSlave.UpdateTyped.
type LivednsAxfrSlaveUpdateData struct {
	Fqdn string `json:"fqdn"`
	Ip string `json:"ip"`
	Message *string `json:"message,omitempty"`
}

// LivednsAxfrSlaveRemoveMatch is the typed request payload for LivednsAxfrSlave.RemoveTyped.
type LivednsAxfrSlaveRemoveMatch struct {
	Fqdn string `json:"fqdn"`
	Ip string `json:"ip"`
}

// LivednsAxfrTsig is the typed data model for the livedns_axfr_tsig entity.
type LivednsAxfrTsig struct {
}

// LivednsAxfrTsigListMatch is the typed request payload for LivednsAxfrTsig.ListTyped.
type LivednsAxfrTsigListMatch struct {
	Fqdn string `json:"fqdn"`
}

// LivednsAxfrTsigUpdateData is the typed request payload for LivednsAxfrTsig.UpdateTyped.
type LivednsAxfrTsigUpdateData struct {
	Fqdn string `json:"fqdn"`
	Id string `json:"id"`
	SharingId *string `json:"sharing_id,omitempty"`
	Href *string `json:"href,omitempty"`
	KeyName *string `json:"key_name,omitempty"`
	Message *string `json:"message,omitempty"`
}

// LivednsAxfrTsigRemoveMatch is the typed request payload for LivednsAxfrTsig.RemoveTyped.
type LivednsAxfrTsigRemoveMatch struct {
	Fqdn string `json:"fqdn"`
	Id string `json:"id"`
	SharingId *string `json:"sharing_id,omitempty"`
}

// LivednsDomain is the typed data model for the livedns_domain entity.
type LivednsDomain struct {
}

// LivednsDomainLoadMatch is the typed request payload for LivednsDomain.LoadTyped.
type LivednsDomainLoadMatch struct {
	Fqdn string `json:"fqdn"`
}

// LivednsDomainListMatch is the typed request payload for LivednsDomain.ListTyped.
type LivednsDomainListMatch struct {
	Page *int `json:"page,omitempty"`
	PerPage *int `json:"per_page,omitempty"`
	SharingId *string `json:"sharing_id,omitempty"`
}

// LivednsDomainCreateData is the typed request payload for LivednsDomain.CreateTyped.
type LivednsDomainCreateData struct {
	SharingId *string `json:"sharing_id,omitempty"`
	Fqdn string `json:"fqdn"`
	Zone *map[string]any `json:"zone,omitempty"`
}

// LivednsDomainUpdateData is the typed request payload for LivednsDomain.UpdateTyped.
type LivednsDomainUpdateData struct {
	Fqdn string `json:"fqdn"`
	AutomaticSnapshots *bool `json:"automatic_snapshots,omitempty"`
}

// LivednsKey is the typed data model for the livedns_key entity.
type LivednsKey struct {
}

// LivednsKeyLoadMatch is the typed request payload for LivednsKey.LoadTyped.
type LivednsKeyLoadMatch struct {
	Fqdn string `json:"fqdn"`
	Id string `json:"id"`
}

// LivednsKeyListMatch is the typed request payload for LivednsKey.ListTyped.
type LivednsKeyListMatch struct {
	Fqdn string `json:"fqdn"`
}

// LivednsKeyCreateData is the typed request payload for LivednsKey.CreateTyped.
type LivednsKeyCreateData struct {
	Fqdn string `json:"fqdn"`
	Flags int `json:"flags"`
}

// LivednsKeyUpdateData is the typed request payload for LivednsKey.UpdateTyped.
type LivednsKeyUpdateData struct {
	Fqdn string `json:"fqdn"`
	Id string `json:"id"`
	Deleted *bool `json:"deleted,omitempty"`
}

// LivednsKeyRemoveMatch is the typed request payload for LivednsKey.RemoveTyped.
type LivednsKeyRemoveMatch struct {
	Fqdn string `json:"fqdn"`
	Id string `json:"id"`
}

// LivednsNameserver is the typed data model for the livedns_nameserver entity.
type LivednsNameserver struct {
}

// LivednsNameserverListMatch is the typed request payload for LivednsNameserver.ListTyped.
type LivednsNameserverListMatch struct {
	Fqdn string `json:"fqdn"`
}

// LivednsRecord is the typed data model for the livedns_record entity.
type LivednsRecord struct {
}

// LivednsRecordLoadMatch is the typed request payload for LivednsRecord.LoadTyped.
type LivednsRecordLoadMatch struct {
	Fqdn string `json:"fqdn"`
	RrsetName string `json:"rrset_name"`
	RrsetType string `json:"rrset_type"`
}

// LivednsRecordListMatch is the typed request payload for LivednsRecord.ListTyped.
type LivednsRecordListMatch struct {
	Fqdn string `json:"fqdn"`
	Page *int `json:"page,omitempty"`
	PerPage *int `json:"per_page,omitempty"`
	RrsetType *string `json:"rrset_type,omitempty"`
	SortBy *string `json:"sort_by,omitempty"`
}

// LivednsRecordCreateData is the typed request payload for LivednsRecord.CreateTyped.
type LivednsRecordCreateData struct {
	Fqdn string `json:"fqdn"`
	RrsetName *string `json:"rrset_name,omitempty"`
	RrsetType *string `json:"rrset_type,omitempty"`
	RrsetTtl *int `json:"rrset_ttl,omitempty"`
	RrsetValues []any `json:"rrset_values"`
}

// LivednsRecordUpdateData is the typed request payload for LivednsRecord.UpdateTyped.
type LivednsRecordUpdateData struct {
	Fqdn string `json:"fqdn"`
	RrsetName string `json:"rrset_name"`
	RrsetType string `json:"rrset_type"`
	RrsetTtl *int `json:"rrset_ttl,omitempty"`
	RrsetValues *[]any `json:"rrset_values,omitempty"`
}

// LivednsRecordPatchData is the typed request payload for LivednsRecord.PatchTyped.
type LivednsRecordPatchData struct {
	Fqdn string `json:"fqdn"`
	RrsetName string `json:"rrset_name"`
	RrsetType string `json:"rrset_type"`
	AddRrsetValues *[]any `json:"add_rrset_values,omitempty"`
	RemoveRrsetValues *[]any `json:"remove_rrset_values,omitempty"`
	RrsetTtl *int `json:"rrset_ttl,omitempty"`
}

// LivednsRecordRemoveMatch is the typed request payload for LivednsRecord.RemoveTyped.
type LivednsRecordRemoveMatch struct {
	Fqdn string `json:"fqdn"`
	RrsetName string `json:"rrset_name"`
	RrsetType string `json:"rrset_type"`
}

// LivednsRrtype is the typed data model for the livedns_rrtype entity.
type LivednsRrtype struct {
}

// LivednsRrtypeListMatch is the typed request payload for LivednsRrtype.ListTyped.
type LivednsRrtypeListMatch struct {
}

// LivednsSnapshot is the typed data model for the livedns_snapshot entity.
type LivednsSnapshot struct {
}

// LivednsSnapshotLoadMatch is the typed request payload for LivednsSnapshot.LoadTyped.
type LivednsSnapshotLoadMatch struct {
	Fqdn string `json:"fqdn"`
	Id string `json:"id"`
}

// LivednsSnapshotListMatch is the typed request payload for LivednsSnapshot.ListTyped.
type LivednsSnapshotListMatch struct {
	Fqdn string `json:"fqdn"`
	Automatic *bool `json:"automatic,omitempty"`
	Page *int `json:"page,omitempty"`
	PerPage *int `json:"per_page,omitempty"`
	SortBy *string `json:"sort_by,omitempty"`
}

// LivednsSnapshotCreateData is the typed request payload for LivednsSnapshot.CreateTyped.
type LivednsSnapshotCreateData struct {
	Fqdn string `json:"fqdn"`
	Name *string `json:"name,omitempty"`
}

// LivednsSnapshotUpdateData is the typed request payload for LivednsSnapshot.UpdateTyped.
type LivednsSnapshotUpdateData struct {
	Fqdn string `json:"fqdn"`
	Id string `json:"id"`
	Name *string `json:"name,omitempty"`
}

// LivednsSnapshotRemoveMatch is the typed request payload for LivednsSnapshot.RemoveTyped.
type LivednsSnapshotRemoveMatch struct {
	Fqdn string `json:"fqdn"`
	Id string `json:"id"`
}

// LivednsTsigKey is the typed data model for the livedns_tsig_key entity.
type LivednsTsigKey struct {
}

// LivednsTsigKeyLoadMatch is the typed request payload for LivednsTsigKey.LoadTyped.
type LivednsTsigKeyLoadMatch struct {
	Id string `json:"id"`
	SharingId *string `json:"sharing_id,omitempty"`
}

// LivednsTsigKeyListMatch is the typed request payload for LivednsTsigKey.ListTyped.
type LivednsTsigKeyListMatch struct {
	SharingId *string `json:"sharing_id,omitempty"`
}

// LivednsTsigKeyCreateData is the typed request payload for LivednsTsigKey.CreateTyped.
type LivednsTsigKeyCreateData struct {
	SharingId *string `json:"sharing_id,omitempty"`
	ConfigSamples map[string]any `json:"config_samples"`
	Href string `json:"href"`
	Id string `json:"id"`
	KeyName string `json:"key_name"`
	Secret string `json:"secret"`
}

// LivednsZone is the typed data model for the livedns_zone entity.
type LivednsZone struct {
}

// LivednsZoneUpdateData is the typed request payload for LivednsZone.UpdateTyped.
type LivednsZoneUpdateData struct {
	Fqdn string `json:"fqdn"`
	Items *[]any `json:"items,omitempty"`
	RemoveApexNs *bool `json:"remove_apex_ns,omitempty"`
}

// LivednsZoneRemoveMatch is the typed request payload for LivednsZone.RemoveTyped.
type LivednsZoneRemoveMatch struct {
	Fqdn string `json:"fqdn"`
}

// Mailbox is the typed data model for the mailbox entity.
type Mailbox struct {
}

// MailboxLoadMatch is the typed request payload for Mailbox.LoadTyped.
type MailboxLoadMatch struct {
	Address string `json:"address"`
	SharingId *string `json:"sharing_id,omitempty"`
}

// MailboxListMatch is the typed request payload for Mailbox.ListTyped.
type MailboxListMatch struct {
	Address *string `json:"address,omitempty"`
	DomainPart *string `json:"domain_part,omitempty"`
	LocalPart *string `json:"local_part,omitempty"`
	Page *int `json:"page,omitempty"`
	PerPage *int `json:"per_page,omitempty"`
	Search *string `json:"search,omitempty"`
	SharingId *string `json:"sharing_id,omitempty"`
	SortBy *string `json:"sort_by,omitempty"`
}

// MailboxCreateData is the typed request payload for Mailbox.CreateTyped.
type MailboxCreateData struct {
	SharingId *string `json:"sharing_id,omitempty"`
	Aliases *[]any `json:"aliases,omitempty"`
	ConfigName string `json:"config_name"`
	DurationMonth *int `json:"duration_month,omitempty"`
	Email string `json:"email"`
	Password string `json:"password"`
}

// MailboxUpdateData is the typed request payload for Mailbox.UpdateTyped.
type MailboxUpdateData struct {
	Address string `json:"address"`
	Aliases *[]any `json:"aliases,omitempty"`
	Antispam *bool `json:"antispam,omitempty"`
	Autorenew *map[string]any `json:"autorenew,omitempty"`
	ConfigName *string `json:"config_name,omitempty"`
	Password *string `json:"password,omitempty"`
	Responder *map[string]any `json:"responder,omitempty"`
}

// MailboxRemoveMatch is the typed request payload for Mailbox.RemoveTyped.
type MailboxRemoveMatch struct {
	Address string `json:"address"`
	SharingId *string `json:"sharing_id,omitempty"`
}

// MailboxDomain is the typed data model for the mailbox_domain entity.
type MailboxDomain struct {
}

// MailboxDomainLoadMatch is the typed request payload for MailboxDomain.LoadTyped.
type MailboxDomainLoadMatch struct {
	Domain string `json:"domain"`
}

// MailboxDomainListMatch is the typed request payload for MailboxDomain.ListTyped.
type MailboxDomainListMatch struct {
	Page *int `json:"page,omitempty"`
	PerPage *int `json:"per_page,omitempty"`
}

// MailboxDomainCreateData is the typed request payload for MailboxDomain.CreateTyped.
type MailboxDomainCreateData struct {
	Domain string `json:"domain"`
	RecordsToValidate *any `json:"records_to_validate,omitempty"`
}

// MailboxForward is the typed data model for the mailbox_forward entity.
type MailboxForward struct {
}

// MailboxForwardListMatch is the typed request payload for MailboxForward.ListTyped.
type MailboxForwardListMatch struct {
	Page *int `json:"page,omitempty"`
	PerPage *int `json:"per_page,omitempty"`
	Search *string `json:"search,omitempty"`
	SharingId *string `json:"sharing_id,omitempty"`
	SortBy *string `json:"sort_by,omitempty"`
}

// MailboxForwardCreateData is the typed request payload for MailboxForward.CreateTyped.
type MailboxForwardCreateData struct {
	Destinations []any `json:"destinations"`
	Source string `json:"source"`
}

// MailboxForwardUpdateData is the typed request payload for MailboxForward.UpdateTyped.
type MailboxForwardUpdateData struct {
	Source string `json:"source"`
	Destinations *[]any `json:"destinations,omitempty"`
}

// MailboxForwardRemoveMatch is the typed request payload for MailboxForward.RemoveTyped.
type MailboxForwardRemoveMatch struct {
	Source string `json:"source"`
}

// MailboxProduct is the typed data model for the mailbox_product entity.
type MailboxProduct struct {
}

// MailboxProductListMatch is the typed request payload for MailboxProduct.ListTyped.
type MailboxProductListMatch struct {
	SharingId *string `json:"sharing_id,omitempty"`
}

// MailboxProductCreateData is the typed request payload for MailboxProduct.CreateTyped.
type MailboxProductCreateData struct {
	SharingId *string `json:"sharing_id,omitempty"`
	Autorenew *bool `json:"autorenew,omitempty"`
	ConfigName string `json:"config_name"`
	DurationMonth int `json:"duration_month"`
	Quantity int `json:"quantity"`
}

// MailboxQuota is the typed data model for the mailbox_quota entity.
type MailboxQuota struct {
}

// MailboxQuotaListMatch is the typed request payload for MailboxQuota.ListTyped.
type MailboxQuotaListMatch struct {
	SharingId *string `json:"sharing_id,omitempty"`
}

// MailboxSlot is the typed data model for the mailbox_slot entity.
type MailboxSlot struct {
}

// MailboxSlotLoadMatch is the typed request payload for MailboxSlot.LoadTyped.
type MailboxSlotLoadMatch struct {
	Uuid string `json:"uuid"`
}

// MailboxSlotListMatch is the typed request payload for MailboxSlot.ListTyped.
type MailboxSlotListMatch struct {
	ConfigName *string `json:"config_name,omitempty"`
	ExpiresAtGte *string `json:"expires_at_gte,omitempty"`
	ExpiresAtLte *string `json:"expires_at_lte,omitempty"`
	LastPaidDuration *int `json:"last_paid_duration,omitempty"`
	Page *int `json:"page,omitempty"`
	PerPage *int `json:"per_page,omitempty"`
	Refundable *string `json:"refundable,omitempty"`
	SharingId *string `json:"sharing_id,omitempty"`
	SortBy *string `json:"sort_by,omitempty"`
	WebhostingPack *bool `json:"webhosting_pack,omitempty"`
}

// Organization is the typed data model for the organization entity.
type Organization struct {
}

// OrganizationLoadMatch is the typed request payload for Organization.LoadTyped.
type OrganizationLoadMatch struct {
	Id string `json:"id"`
}

// OrganizationListMatch is the typed request payload for Organization.ListTyped.
type OrganizationListMatch struct {
	Name *string `json:"name,omitempty"`
	Permission *string `json:"permission,omitempty"`
	SortBy *string `json:"sort_by,omitempty"`
	Type *string `json:"type,omitempty"`
	Name2 *string `json:"~name,omitempty"`
}

// OrganizationCreateData is the typed request payload for Organization.CreateTyped.
type OrganizationCreateData struct {
	City string `json:"city"`
	Country *string `json:"country,omitempty"`
	Email string `json:"email"`
	Fax *string `json:"fax,omitempty"`
	Firstname string `json:"firstname"`
	Lang *string `json:"lang,omitempty"`
	Lastname string `json:"lastname"`
	Name string `json:"name"`
	Orgname string `json:"orgname"`
	Phone string `json:"phone"`
	Reference *string `json:"reference,omitempty"`
	Reseller *bool `json:"reseller,omitempty"`
	Siren *string `json:"siren,omitempty"`
	State *string `json:"state,omitempty"`
	Streetaddr string `json:"streetaddr"`
	Streetaddr2 *string `json:"streetaddr2,omitempty"`
	Type string `json:"type"`
	VatNumber *string `json:"vat_number,omitempty"`
	Zip *string `json:"zip,omitempty"`
}

// OrganizationUpdateData is the typed request payload for Organization.UpdateTyped.
type OrganizationUpdateData struct {
	Id string `json:"id"`
	City *string `json:"city,omitempty"`
	Country *string `json:"country,omitempty"`
	Email *string `json:"email,omitempty"`
	Fax *string `json:"fax,omitempty"`
	Firstname *string `json:"firstname,omitempty"`
	Lang *string `json:"lang,omitempty"`
	Lastname *string `json:"lastname,omitempty"`
	Name *string `json:"name,omitempty"`
	Phone *string `json:"phone,omitempty"`
	Reference *string `json:"reference,omitempty"`
	Reseller *bool `json:"reseller,omitempty"`
	Siren *string `json:"siren,omitempty"`
	State *string `json:"state,omitempty"`
	Streetaddr *string `json:"streetaddr,omitempty"`
	Streetaddr2 *string `json:"streetaddr2,omitempty"`
	VatNumber *string `json:"vat_number,omitempty"`
	Zip *string `json:"zip,omitempty"`
}

// OrganizationRemoveMatch is the typed request payload for Organization.RemoveTyped.
type OrganizationRemoveMatch struct {
	Id string `json:"id"`
}

// OrganizationCustomer is the typed data model for the organization_customer entity.
type OrganizationCustomer struct {
}

// OrganizationCustomerLoadMatch is the typed request payload for OrganizationCustomer.LoadTyped.
type OrganizationCustomerLoadMatch struct {
	Id string `json:"id"`
	OrgId string `json:"org_id"`
}

// OrganizationCustomerListMatch is the typed request payload for OrganizationCustomer.ListTyped.
type OrganizationCustomerListMatch struct {
	OrgId string `json:"org_id"`
	Name *string `json:"name,omitempty"`
	Page *int `json:"page,omitempty"`
	PerPage *int `json:"per_page,omitempty"`
	Permission *string `json:"permission,omitempty"`
	SortBy *string `json:"sort_by,omitempty"`
}

// OrganizationCustomerCreateData is the typed request payload for OrganizationCustomer.CreateTyped.
type OrganizationCustomerCreateData struct {
	OrgId string `json:"org_id"`
	City string `json:"city"`
	Country string `json:"country"`
	Email string `json:"email"`
	Fax *string `json:"fax,omitempty"`
	Firstname string `json:"firstname"`
	Lastname string `json:"lastname"`
	Orgname *string `json:"orgname,omitempty"`
	Phone string `json:"phone"`
	Reference *string `json:"reference,omitempty"`
	State *string `json:"state,omitempty"`
	Streetaddr string `json:"streetaddr"`
	Streetaddr2 *string `json:"streetaddr2,omitempty"`
	Type string `json:"type"`
	Zip *string `json:"zip,omitempty"`
}

// OrganizationCustomerUpdateData is the typed request payload for OrganizationCustomer.UpdateTyped.
type OrganizationCustomerUpdateData struct {
	Id string `json:"id"`
	OrgId string `json:"org_id"`
	City *string `json:"city,omitempty"`
	Country *string `json:"country,omitempty"`
	Email *string `json:"email,omitempty"`
	Fax *string `json:"fax,omitempty"`
	Firstname *string `json:"firstname,omitempty"`
	Lang *string `json:"lang,omitempty"`
	Lastname *string `json:"lastname,omitempty"`
	Phone *string `json:"phone,omitempty"`
	Reference *string `json:"reference,omitempty"`
	Siren *string `json:"siren,omitempty"`
	State *string `json:"state,omitempty"`
	Streetaddr *string `json:"streetaddr,omitempty"`
	Streetaddr2 *string `json:"streetaddr2,omitempty"`
	SyncContactEmail *string `json:"sync_contact_email,omitempty"`
	VatNumber *string `json:"vat_number,omitempty"`
	Zip *string `json:"zip,omitempty"`
}

// OrganizationCustomerRemoveMatch is the typed request payload for OrganizationCustomer.RemoveTyped.
type OrganizationCustomerRemoveMatch struct {
	Id string `json:"id"`
	OrgId string `json:"org_id"`
}

// Template is the typed data model for the template entity.
type Template struct {
}

// TemplateLoadMatch is the typed request payload for Template.LoadTyped.
type TemplateLoadMatch struct {
	Id string `json:"id"`
}

// TemplateListMatch is the typed request payload for Template.ListTyped.
type TemplateListMatch struct {
	Page *int `json:"page,omitempty"`
	PerPage *int `json:"per_page,omitempty"`
}

// TemplateCreateData is the typed request payload for Template.CreateTyped.
type TemplateCreateData struct {
	SharingId *string `json:"sharing_id,omitempty"`
	Description *string `json:"description,omitempty"`
	Name string `json:"name"`
	Payload map[string]any `json:"payload"`
}

// TemplateUpdateData is the typed request payload for Template.UpdateTyped.
type TemplateUpdateData struct {
	Id string `json:"id"`
	Description *string `json:"description,omitempty"`
	Name *string `json:"name,omitempty"`
	Payload *map[string]any `json:"payload,omitempty"`
}

// TemplateRemoveMatch is the typed request payload for Template.RemoveTyped.
type TemplateRemoveMatch struct {
	Id string `json:"id"`
}

// TemplateDispatch is the typed data model for the template_dispatch entity.
type TemplateDispatch struct {
}

// TemplateDispatchLoadMatch is the typed request payload for TemplateDispatch.LoadTyped.
type TemplateDispatchLoadMatch struct {
	Id string `json:"id"`
}

// TemplateDispatchCreateData is the typed request payload for TemplateDispatch.CreateTyped.
type TemplateDispatchCreateData struct {
	TemplateId string `json:"template_id"`
	ObjectId string `json:"object_id"`
	ObjectType string `json:"object_type"`
}

// Tld is the typed data model for the tld entity.
type Tld struct {
}

// TldLoadMatch is the typed request payload for Tld.LoadTyped.
type TldLoadMatch struct {
	Name string `json:"name"`
}

// TldListMatch is the typed request payload for Tld.ListTyped.
type TldListMatch struct {
	Category *string `json:"category,omitempty"`
	Page *int `json:"page,omitempty"`
	PerPage *int `json:"per_page,omitempty"`
}

// User is the typed data model for the user entity.
type User struct {
}

// UserLoadMatch is the typed request payload for User.LoadTyped.
type UserLoadMatch struct {
	City *string `json:"city,omitempty"`
	Country *string `json:"country,omitempty"`
	Email *string `json:"email,omitempty"`
	Fax *string `json:"fax,omitempty"`
	Firstname *string `json:"firstname,omitempty"`
	Id string `json:"id"`
	Lang *string `json:"lang,omitempty"`
	Lastname *string `json:"lastname,omitempty"`
	Name *string `json:"name,omitempty"`
	Phone *string `json:"phone,omitempty"`
	State *string `json:"state,omitempty"`
	Streetaddr *string `json:"streetaddr,omitempty"`
	Streetaddr2 *string `json:"streetaddr2,omitempty"`
	Username *string `json:"username,omitempty"`
	Zip *string `json:"zip,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
