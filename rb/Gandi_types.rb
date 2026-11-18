# frozen_string_literal: true

# Typed models for the Gandi SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# AccessToken entity data model.
#
# @!attribute [rw] access_token
#   @return [String]
#
# @!attribute [rw] entities
#   @return [Array]
#
# @!attribute [rw] expires_at
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] scopes
#   @return [Array]
AccessToken = Struct.new(
  :access_token,
  :entities,
  :expires_at,
  :id,
  :name,
  :scopes,
  keyword_init: true
)

# Request payload for AccessToken#create.
#
# @!attribute [rw] expires_at
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
AccessTokenCreateData = Struct.new(
  :expires_at,
  :name,
  keyword_init: true
)

# AcmeAccount entity data model.
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] deleted_at
#   @return [String]
#
# @!attribute [rw] external_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] ip
#   @return [String]
#
# @!attribute [rw] last_activity
#   @return [String]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] subscription_id
#   @return [String]
AcmeAccount = Struct.new(
  :created_at,
  :deleted_at,
  :external_id,
  :id,
  :ip,
  :last_activity,
  :status,
  :subscription_id,
  keyword_init: true
)

# Request payload for AcmeAccount#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] subscription_id
#   @return [String]
#
# @!attribute [rw] sharing_id
#   @return [String]
AcmeAccountLoadMatch = Struct.new(
  :id,
  :subscription_id,
  :sharing_id,
  keyword_init: true
)

# Request payload for AcmeAccount#list.
#
# @!attribute [rw] subscription_id
#   @return [String]
#
# @!attribute [rw] sharing_id
#   @return [String]
AcmeAccountListMatch = Struct.new(
  :subscription_id,
  :sharing_id,
  keyword_init: true
)

# AcmeDomain entity data model.
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] deleted_at
#   @return [String]
#
# @!attribute [rw] hostname
#   @return [String]
#
# @!attribute [rw] hostname_ulabel
#   @return [String]
#
# @!attribute [rw] is_wildcard
#   @return [Boolean]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] subscription_id
#   @return [String]
AcmeDomain = Struct.new(
  :created_at,
  :deleted_at,
  :hostname,
  :hostname_ulabel,
  :is_wildcard,
  :status,
  :subscription_id,
  keyword_init: true
)

# Request payload for AcmeDomain#load.
#
# @!attribute [rw] domain_id
#   @return [Integer]
#
# @!attribute [rw] subscription_id
#   @return [String]
#
# @!attribute [rw] sharing_id
#   @return [String]
AcmeDomainLoadMatch = Struct.new(
  :domain_id,
  :subscription_id,
  :sharing_id,
  keyword_init: true
)

# Request payload for AcmeDomain#list.
#
# @!attribute [rw] subscription_id
#   @return [String]
#
# @!attribute [rw] domain
#   @return [String]
#
# @!attribute [rw] sharing_id
#   @return [String]
AcmeDomainListMatch = Struct.new(
  :subscription_id,
  :domain,
  :sharing_id,
  keyword_init: true
)

# AcmePrice entity data model.
#
# @!attribute [rw] country
#   @return [String]
#
# @!attribute [rw] currency
#   @return [String]
#
# @!attribute [rw] domains
#   @return [Array]
#
# @!attribute [rw] duration
#   @return [String]
#
# @!attribute [rw] duration_unit
#   @return [String]
#
# @!attribute [rw] grid
#   @return [String]
#
# @!attribute [rw] max_duration
#   @return [Integer]
#
# @!attribute [rw] min_duration
#   @return [Integer]
#
# @!attribute [rw] price_after_taxes
#   @return [String]
#
# @!attribute [rw] price_before_taxes
#   @return [String]
#
# @!attribute [rw] process
#   @return [String]
#
# @!attribute [rw] product
#   @return [Hash]
#
# @!attribute [rw] provider
#   @return [String]
#
# @!attribute [rw] tax_rate
#   @return [String]
#
# @!attribute [rw] taxes
#   @return [Array]
#
# @!attribute [rw] validation_type
#   @return [String]
AcmePrice = Struct.new(
  :country,
  :currency,
  :domains,
  :duration,
  :duration_unit,
  :grid,
  :max_duration,
  :min_duration,
  :price_after_taxes,
  :price_before_taxes,
  :process,
  :product,
  :provider,
  :tax_rate,
  :taxes,
  :validation_type,
  keyword_init: true
)

# Request payload for AcmePrice#list.
#
# @!attribute [rw] country
#   @return [String]
#
# @!attribute [rw] currency
#   @return [String]
#
# @!attribute [rw] duration
#   @return [String]
#
# @!attribute [rw] grid
#   @return [String]
#
# @!attribute [rw] process
#   @return [String]
#
# @!attribute [rw] provider
#   @return [String]
#
# @!attribute [rw] sharing_id
#   @return [String]
#
# @!attribute [rw] validation_type
#   @return [String]
AcmePriceListMatch = Struct.new(
  :country,
  :currency,
  :duration,
  :grid,
  :process,
  :provider,
  :sharing_id,
  :validation_type,
  keyword_init: true
)

# Request payload for AcmePrice#create.
#
# @!attribute [rw] sharing_id
#   @return [String]
#
# @!attribute [rw] country
#   @return [String]
#
# @!attribute [rw] currency
#   @return [String]
#
# @!attribute [rw] domains
#   @return [Array]
#
# @!attribute [rw] duration
#   @return [String]
#
# @!attribute [rw] grid
#   @return [String]
#
# @!attribute [rw] process
#   @return [String]
#
# @!attribute [rw] provider
#   @return [String]
#
# @!attribute [rw] validation_type
#   @return [String]
AcmePriceCreateData = Struct.new(
  :sharing_id,
  :country,
  :currency,
  :domains,
  :duration,
  :grid,
  :process,
  :provider,
  :validation_type,
  keyword_init: true
)

# AcmeSubscription entity data model.
#
# @!attribute [rw] country
#   @return [String]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] currency
#   @return [String]
#
# @!attribute [rw] domains
#   @return [Array]
#
# @!attribute [rw] duration
#   @return [Integer]
#
# @!attribute [rw] eab_hmac
#   @return [String]
#
# @!attribute [rw] eab_id
#   @return [String]
#
# @!attribute [rw] ends_at
#   @return [String]
#
# @!attribute [rw] grid
#   @return [String]
#
# @!attribute [rw] message
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] provider
#   @return [String]
#
# @!attribute [rw] server_url
#   @return [String]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] subscription_id
#   @return [String]
#
# @!attribute [rw] validation_type
#   @return [String]
#
# @!attribute [rw] years
#   @return [String]
AcmeSubscription = Struct.new(
  :country,
  :created_at,
  :currency,
  :domains,
  :duration,
  :eab_hmac,
  :eab_id,
  :ends_at,
  :grid,
  :message,
  :name,
  :provider,
  :server_url,
  :status,
  :subscription_id,
  :validation_type,
  :years,
  keyword_init: true
)

# Request payload for AcmeSubscription#load.
#
# @!attribute [rw] subscription_id
#   @return [String]
#
# @!attribute [rw] sharing_id
#   @return [String]
AcmeSubscriptionLoadMatch = Struct.new(
  :subscription_id,
  :sharing_id,
  keyword_init: true
)

# Request payload for AcmeSubscription#list.
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] ends_at
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] provider
#   @return [String]
#
# @!attribute [rw] sharing_id
#   @return [String]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] validation_type
#   @return [String]
#
# @!attribute [rw] year
#   @return [String]
AcmeSubscriptionListMatch = Struct.new(
  :created_at,
  :ends_at,
  :name,
  :provider,
  :sharing_id,
  :status,
  :validation_type,
  :year,
  keyword_init: true
)

# Request payload for AcmeSubscription#create.
#
# @!attribute [rw] sharing_id
#   @return [String]
#
# @!attribute [rw] country
#   @return [String]
#
# @!attribute [rw] currency
#   @return [String]
#
# @!attribute [rw] domains
#   @return [Array]
#
# @!attribute [rw] duration
#   @return [Integer]
#
# @!attribute [rw] grid
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] provider
#   @return [String]
#
# @!attribute [rw] validation_type
#   @return [String]
AcmeSubscriptionCreateData = Struct.new(
  :sharing_id,
  :country,
  :currency,
  :domains,
  :duration,
  :grid,
  :name,
  :provider,
  :validation_type,
  keyword_init: true
)

# Request payload for AcmeSubscription#update.
#
# @!attribute [rw] subscription_id
#   @return [String]
#
# @!attribute [rw] sharing_id
#   @return [String]
#
# @!attribute [rw] name
#   @return [String, nil]
AcmeSubscriptionUpdateData = Struct.new(
  :subscription_id,
  :sharing_id,
  :name,
  keyword_init: true
)

# Request payload for AcmeSubscription#remove.
#
# @!attribute [rw] subscription_id
#   @return [String]
#
# @!attribute [rw] sharing_id
#   @return [String]
AcmeSubscriptionRemoveMatch = Struct.new(
  :subscription_id,
  :sharing_id,
  keyword_init: true
)

# BillingInfo entity data model.
#
# @!attribute [rw] annual_balance
#   @return [Float]
#
# @!attribute [rw] grid
#   @return [String]
#
# @!attribute [rw] outstanding_amount
#   @return [Float]
#
# @!attribute [rw] prepaid
#   @return [Hash]
#
# @!attribute [rw] prepaid_monthly_invoice
#   @return [Boolean, nil]
BillingInfo = Struct.new(
  :annual_balance,
  :grid,
  :outstanding_amount,
  :prepaid,
  :prepaid_monthly_invoice,
  keyword_init: true
)

# Request payload for BillingInfo#load.
#
# @!attribute [rw] sharing_id
#   @return [String]
BillingInfoLoadMatch = Struct.new(
  :sharing_id,
  keyword_init: true
)

# BillingPrice entity data model.
#
# @!attribute [rw] currency
#   @return [String]
#
# @!attribute [rw] grid
#   @return [String]
#
# @!attribute [rw] products
#   @return [Array]
#
# @!attribute [rw] taxes
#   @return [Array]
BillingPrice = Struct.new(
  :currency,
  :grid,
  :products,
  :taxes,
  keyword_init: true
)

# Request payload for BillingPrice#load.
#
# @!attribute [rw] type
#   @return [String]
#
# @!attribute [rw] active_phase
#   @return [Boolean, nil]
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] currency
#   @return [String, nil]
#
# @!attribute [rw] discount
#   @return [Array, nil]
#
# @!attribute [rw] duration_unit
#   @return [String, nil]
#
# @!attribute [rw] extension
#   @return [String, nil]
#
# @!attribute [rw] feature
#   @return [Boolean, nil]
#
# @!attribute [rw] grid
#   @return [String, nil]
#
# @!attribute [rw] lang
#   @return [String, nil]
#
# @!attribute [rw] max_duration
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [Array]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] per_page
#   @return [Integer, nil]
#
# @!attribute [rw] prices_at
#   @return [String, nil]
#
# @!attribute [rw] process
#   @return [Array]
#
# @!attribute [rw] sharing_id
#   @return [String, nil]
BillingPriceLoadMatch = Struct.new(
  :type,
  :active_phase,
  :country,
  :currency,
  :discount,
  :duration_unit,
  :extension,
  :feature,
  :grid,
  :lang,
  :max_duration,
  :name,
  :page,
  :per_page,
  :prices_at,
  :process,
  :sharing_id,
  keyword_init: true
)

# CertificateDcv entity data model.
#
# @!attribute [rw] message
#   @return [String]
#
# @!attribute [rw] method
#   @return [String]
CertificateDcv = Struct.new(
  :message,
  :method,
  keyword_init: true
)

# Request payload for CertificateDcv#update.
#
# @!attribute [rw] certificate_id
#   @return [String]
#
# @!attribute [rw] sharing_id
#   @return [String, nil]
#
# @!attribute [rw] message
#   @return [String, nil]
#
# @!attribute [rw] method
#   @return [String, nil]
CertificateDcvUpdateData = Struct.new(
  :certificate_id,
  :sharing_id,
  :message,
  :method,
  keyword_init: true
)

# Request payload for CertificateDcv#patch.
#
# @!attribute [rw] certificate_id
#   @return [String]
#
# @!attribute [rw] sharing_id
#   @return [String, nil]
#
# @!attribute [rw] method
#   @return [String, nil]
CertificateDcvPatchData = Struct.new(
  :certificate_id,
  :sharing_id,
  :method,
  keyword_init: true
)

# CertificatePackage entity data model.
#
# @!attribute [rw] category
#   @return [Hash]
#
# @!attribute [rw] href
#   @return [String]
#
# @!attribute [rw] max_domains
#   @return [Integer]
#
# @!attribute [rw] min_domains
#   @return [Integer]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] provider
#   @return [String]
#
# @!attribute [rw] sgc
#   @return [Boolean]
#
# @!attribute [rw] trustlogo
#   @return [Boolean]
#
# @!attribute [rw] warranty
#   @return [Integer]
#
# @!attribute [rw] wildcard
#   @return [Boolean]
CertificatePackage = Struct.new(
  :category,
  :href,
  :max_domains,
  :min_domains,
  :name,
  :provider,
  :sgc,
  :trustlogo,
  :warranty,
  :wildcard,
  keyword_init: true
)

# Request payload for CertificatePackage#load.
#
# @!attribute [rw] name
#   @return [String]
CertificatePackageLoadMatch = Struct.new(
  :name,
  keyword_init: true
)

# Request payload for CertificatePackage#list.
#
# @!attribute [rw] category
#   @return [String, nil]
#
# @!attribute [rw] max_domain
#   @return [Integer, nil]
#
# @!attribute [rw] min_domain
#   @return [Integer, nil]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] per_page
#   @return [Integer, nil]
#
# @!attribute [rw] trustlogo
#   @return [Boolean, nil]
#
# @!attribute [rw] warranty
#   @return [Integer, nil]
#
# @!attribute [rw] wildcard
#   @return [Boolean, nil]
CertificatePackageListMatch = Struct.new(
  :category,
  :max_domain,
  :min_domain,
  :page,
  :per_page,
  :trustlogo,
  :warranty,
  :wildcard,
  keyword_init: true
)

# CertificatePem entity data model.
class CertificatePem
end

# Request payload for CertificatePem#load.
#
# @!attribute [rw] type
#   @return [String]
#
# @!attribute [rw] provider
#   @return [String, nil]
CertificatePemLoadMatch = Struct.new(
  :type,
  :provider,
  keyword_init: true
)

# CertificateRenewal entity data model.
#
# @!attribute [rw] csr
#   @return [String, nil]
#
# @!attribute [rw] dcv_method
#   @return [String, nil]
#
# @!attribute [rw] duration
#   @return [Integer, nil]
#
# @!attribute [rw] errors
#   @return [Array, nil]
#
# @!attribute [rw] status
#   @return [String]
CertificateRenewal = Struct.new(
  :csr,
  :dcv_method,
  :duration,
  :errors,
  :status,
  keyword_init: true
)

# Request payload for CertificateRenewal#create.
#
# @!attribute [rw] certificate_id
#   @return [String]
#
# @!attribute [rw] sharing_id
#   @return [String, nil]
#
# @!attribute [rw] csr
#   @return [String, nil]
#
# @!attribute [rw] dcv_method
#   @return [String, nil]
#
# @!attribute [rw] duration
#   @return [Integer, nil]
CertificateRenewalCreateData = Struct.new(
  :certificate_id,
  :sharing_id,
  :csr,
  :dcv_method,
  :duration,
  keyword_init: true
)

# CertificateTag entity data model.
#
# @!attribute [rw] add
#   @return [Array]
#
# @!attribute [rw] message
#   @return [String]
#
# @!attribute [rw] remove
#   @return [Array]
#
# @!attribute [rw] tag
#   @return [String]
#
# @!attribute [rw] tags
#   @return [Array]
CertificateTag = Struct.new(
  :add,
  :message,
  :remove,
  :tag,
  :tags,
  keyword_init: true
)

# Request payload for CertificateTag#list.
#
# @!attribute [rw] certificate_id
#   @return [String]
CertificateTagListMatch = Struct.new(
  :certificate_id,
  keyword_init: true
)

# Request payload for CertificateTag#create.
#
# @!attribute [rw] certificate_id
#   @return [String]
#
# @!attribute [rw] tag
#   @return [String]
CertificateTagCreateData = Struct.new(
  :certificate_id,
  :tag,
  keyword_init: true
)

# Request payload for CertificateTag#update.
#
# @!attribute [rw] certificate_id
#   @return [String]
#
# @!attribute [rw] tags
#   @return [Array, nil]
CertificateTagUpdateData = Struct.new(
  :certificate_id,
  :tags,
  keyword_init: true
)

# Request payload for CertificateTag#patch.
#
# @!attribute [rw] certificate_id
#   @return [String]
#
# @!attribute [rw] add
#   @return [Array, nil]
#
# @!attribute [rw] remove
#   @return [Array, nil]
CertificateTagPatchData = Struct.new(
  :certificate_id,
  :add,
  :remove,
  keyword_init: true
)

# Request payload for CertificateTag#remove.
#
# @!attribute [rw] certificate_id
#   @return [String]
CertificateTagRemoveMatch = Struct.new(
  :certificate_id,
  keyword_init: true
)

# Comment entity data model.
#
# @!attribute [rw] content
#   @return [String]
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] errors
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] updated_at
#   @return [String, nil]
#
# @!attribute [rw] user
#   @return [Hash]
Comment = Struct.new(
  :content,
  :created_at,
  :errors,
  :id,
  :status,
  :updated_at,
  :user,
  keyword_init: true
)

# Request payload for Comment#load.
#
# @!attribute [rw] entity_id
#   @return [String]
CommentLoadMatch = Struct.new(
  :entity_id,
  keyword_init: true
)

# Request payload for Comment#create.
#
# @!attribute [rw] entity_id
#   @return [String]
#
# @!attribute [rw] content
#   @return [String]
CommentCreateData = Struct.new(
  :entity_id,
  :content,
  keyword_init: true
)

# Request payload for Comment#remove.
#
# @!attribute [rw] entity_id
#   @return [String]
CommentRemoveMatch = Struct.new(
  :entity_id,
  keyword_init: true
)

# Domain entity data model.
#
# @!attribute [rw] admin
#   @return [Hash]
#
# @!attribute [rw] authinfo
#   @return [String, nil]
#
# @!attribute [rw] autorenew
#   @return [Hash]
#
# @!attribute [rw] bill
#   @return [Hash]
#
# @!attribute [rw] can_tld_lock
#   @return [Boolean]
#
# @!attribute [rw] claims
#   @return [String, nil]
#
# @!attribute [rw] contacts
#   @return [Hash]
#
# @!attribute [rw] currency
#   @return [String, nil]
#
# @!attribute [rw] dates
#   @return [Hash]
#
# @!attribute [rw] domain_owner
#   @return [String]
#
# @!attribute [rw] duration
#   @return [Integer, nil]
#
# @!attribute [rw] enforce_premium
#   @return [Boolean, nil]
#
# @!attribute [rw] errors
#   @return [Array, nil]
#
# @!attribute [rw] extra_parameters
#   @return [Hash, nil]
#
# @!attribute [rw] fqdn
#   @return [String]
#
# @!attribute [rw] fqdn_unicode
#   @return [String]
#
# @!attribute [rw] href
#   @return [String]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] lang
#   @return [String, nil]
#
# @!attribute [rw] mailbox_optin
#   @return [Boolean, nil]
#
# @!attribute [rw] nameserver
#   @return [Hash]
#
# @!attribute [rw] nameservers
#   @return [Array]
#
# @!attribute [rw] nameservers_ips
#   @return [Hash, nil]
#
# @!attribute [rw] orga_owner
#   @return [String]
#
# @!attribute [rw] owner
#   @return [Hash]
#
# @!attribute [rw] price
#   @return [Float, nil]
#
# @!attribute [rw] reachability
#   @return [String]
#
# @!attribute [rw] resellee_id
#   @return [String, nil]
#
# @!attribute [rw] services
#   @return [Array]
#
# @!attribute [rw] sharing_id
#   @return [String, nil]
#
# @!attribute [rw] sharing_space
#   @return [Hash]
#
# @!attribute [rw] smd
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [Array]
#
# @!attribute [rw] tags
#   @return [Array, nil]
#
# @!attribute [rw] tech
#   @return [Hash]
#
# @!attribute [rw] template_id
#   @return [String, nil]
#
# @!attribute [rw] tld
#   @return [String]
#
# @!attribute [rw] tld_period
#   @return [String, nil]
#
# @!attribute [rw] trustee_roles
#   @return [Array, nil]
Domain = Struct.new(
  :admin,
  :authinfo,
  :autorenew,
  :bill,
  :can_tld_lock,
  :claims,
  :contacts,
  :currency,
  :dates,
  :domain_owner,
  :duration,
  :enforce_premium,
  :errors,
  :extra_parameters,
  :fqdn,
  :fqdn_unicode,
  :href,
  :id,
  :lang,
  :mailbox_optin,
  :nameserver,
  :nameservers,
  :nameservers_ips,
  :orga_owner,
  :owner,
  :price,
  :reachability,
  :resellee_id,
  :services,
  :sharing_id,
  :sharing_space,
  :smd,
  :status,
  :tags,
  :tech,
  :template_id,
  :tld,
  :tld_period,
  :trustee_roles,
  keyword_init: true
)

# Request payload for Domain#load.
#
# @!attribute [rw] fqdn
#   @return [String]
DomainLoadMatch = Struct.new(
  :fqdn,
  keyword_init: true
)

# Request payload for Domain#list.
#
# @!attribute [rw] fqdn
#   @return [String, nil]
#
# @!attribute [rw] nameserver
#   @return [String, nil]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] per_page
#   @return [Integer, nil]
#
# @!attribute [rw] resellee_id
#   @return [String, nil]
#
# @!attribute [rw] sharing_id
#   @return [String, nil]
#
# @!attribute [rw] sort_by
#   @return [String, nil]
#
# @!attribute [rw] tld
#   @return [String, nil]
DomainListMatch = Struct.new(
  :fqdn,
  :nameserver,
  :page,
  :per_page,
  :resellee_id,
  :sharing_id,
  :sort_by,
  :tld,
  keyword_init: true
)

# Request payload for Domain#create.
#
# @!attribute [rw] sharing_id
#   @return [String, nil]
#
# @!attribute [rw] admin
#   @return [Hash]
#
# @!attribute [rw] bill
#   @return [Hash]
#
# @!attribute [rw] claims
#   @return [String, nil]
#
# @!attribute [rw] currency
#   @return [String, nil]
#
# @!attribute [rw] duration
#   @return [Integer, nil]
#
# @!attribute [rw] enforce_premium
#   @return [Boolean, nil]
#
# @!attribute [rw] extra_parameters
#   @return [Hash, nil]
#
# @!attribute [rw] fqdn
#   @return [String]
#
# @!attribute [rw] lang
#   @return [String, nil]
#
# @!attribute [rw] mailbox_optin
#   @return [Boolean, nil]
#
# @!attribute [rw] nameservers
#   @return [Array, nil]
#
# @!attribute [rw] nameservers_ips
#   @return [Hash, nil]
#
# @!attribute [rw] owner
#   @return [Hash]
#
# @!attribute [rw] price
#   @return [Float, nil]
#
# @!attribute [rw] resellee_id
#   @return [String, nil]
#
# @!attribute [rw] smd
#   @return [String, nil]
#
# @!attribute [rw] tech
#   @return [Hash]
#
# @!attribute [rw] template_id
#   @return [String, nil]
#
# @!attribute [rw] tld_period
#   @return [String, nil]
DomainCreateData = Struct.new(
  :sharing_id,
  :admin,
  :bill,
  :claims,
  :currency,
  :duration,
  :enforce_premium,
  :extra_parameters,
  :fqdn,
  :lang,
  :mailbox_optin,
  :nameservers,
  :nameservers_ips,
  :owner,
  :price,
  :resellee_id,
  :smd,
  :tech,
  :template_id,
  :tld_period,
  keyword_init: true
)

# Request payload for Domain#update.
#
# @!attribute [rw] fqdn
#   @return [String]
#
# @!attribute [rw] admin
#   @return [Hash, nil]
#
# @!attribute [rw] authinfo
#   @return [String, nil]
#
# @!attribute [rw] autorenew
#   @return [Hash, nil]
#
# @!attribute [rw] bill
#   @return [Hash, nil]
#
# @!attribute [rw] can_tld_lock
#   @return [Boolean, nil]
#
# @!attribute [rw] claims
#   @return [String, nil]
#
# @!attribute [rw] contacts
#   @return [Hash, nil]
#
# @!attribute [rw] currency
#   @return [String, nil]
#
# @!attribute [rw] dates
#   @return [Hash, nil]
#
# @!attribute [rw] domain_owner
#   @return [String, nil]
#
# @!attribute [rw] duration
#   @return [Integer, nil]
#
# @!attribute [rw] enforce_premium
#   @return [Boolean, nil]
#
# @!attribute [rw] errors
#   @return [Array, nil]
#
# @!attribute [rw] extra_parameters
#   @return [Hash, nil]
#
# @!attribute [rw] fqdn_unicode
#   @return [String, nil]
#
# @!attribute [rw] href
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] lang
#   @return [String, nil]
#
# @!attribute [rw] mailbox_optin
#   @return [Boolean, nil]
#
# @!attribute [rw] nameserver
#   @return [Hash, nil]
#
# @!attribute [rw] nameservers
#   @return [Array, nil]
#
# @!attribute [rw] nameservers_ips
#   @return [Hash, nil]
#
# @!attribute [rw] orga_owner
#   @return [String, nil]
#
# @!attribute [rw] owner
#   @return [Hash, nil]
#
# @!attribute [rw] price
#   @return [Float, nil]
#
# @!attribute [rw] reachability
#   @return [String, nil]
#
# @!attribute [rw] resellee_id
#   @return [String, nil]
#
# @!attribute [rw] services
#   @return [Array, nil]
#
# @!attribute [rw] sharing_id
#   @return [String, nil]
#
# @!attribute [rw] sharing_space
#   @return [Hash, nil]
#
# @!attribute [rw] smd
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [Array, nil]
#
# @!attribute [rw] tags
#   @return [Array, nil]
#
# @!attribute [rw] tech
#   @return [Hash, nil]
#
# @!attribute [rw] template_id
#   @return [String, nil]
#
# @!attribute [rw] tld
#   @return [String, nil]
#
# @!attribute [rw] tld_period
#   @return [String, nil]
#
# @!attribute [rw] trustee_roles
#   @return [Array, nil]
#
# @!attribute [rw] action
#   @return [Object, nil]
#
# @!attribute [rw] clientTransferProhibited
#   @return [Object, nil]
#
# @!attribute [rw] enabled
#   @return [Object, nil]
#
# @!attribute [rw] org_id
#   @return [Object, nil]
DomainUpdateData = Struct.new(
  :fqdn,
  :admin,
  :authinfo,
  :autorenew,
  :bill,
  :can_tld_lock,
  :claims,
  :contacts,
  :currency,
  :dates,
  :domain_owner,
  :duration,
  :enforce_premium,
  :errors,
  :extra_parameters,
  :fqdn_unicode,
  :href,
  :id,
  :lang,
  :mailbox_optin,
  :nameserver,
  :nameservers,
  :nameservers_ips,
  :orga_owner,
  :owner,
  :price,
  :reachability,
  :resellee_id,
  :services,
  :sharing_id,
  :sharing_space,
  :smd,
  :status,
  :tags,
  :tech,
  :template_id,
  :tld,
  :tld_period,
  :trustee_roles,
  :action,
  :clientTransferProhibited,
  :enabled,
  :org_id,
  keyword_init: true
)

# Request payload for Domain#remove.
#
# @!attribute [rw] fqdn
#   @return [String]
DomainRemoveMatch = Struct.new(
  :fqdn,
  keyword_init: true
)

# DomainAvailability entity data model.
#
# @!attribute [rw] currency
#   @return [String]
#
# @!attribute [rw] grid
#   @return [String]
#
# @!attribute [rw] products
#   @return [Array]
#
# @!attribute [rw] taxes
#   @return [Array]
DomainAvailability = Struct.new(
  :currency,
  :grid,
  :products,
  :taxes,
  keyword_init: true
)

# Request payload for DomainAvailability#load.
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] currency
#   @return [String, nil]
#
# @!attribute [rw] duration_unit
#   @return [String, nil]
#
# @!attribute [rw] extension
#   @return [String, nil]
#
# @!attribute [rw] grid
#   @return [String, nil]
#
# @!attribute [rw] lang
#   @return [String, nil]
#
# @!attribute [rw] max_duration
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] period
#   @return [String, nil]
#
# @!attribute [rw] process
#   @return [Array, nil]
#
# @!attribute [rw] sharing_id
#   @return [String, nil]
DomainAvailabilityLoadMatch = Struct.new(
  :country,
  :currency,
  :duration_unit,
  :extension,
  :grid,
  :lang,
  :max_duration,
  :name,
  :period,
  :process,
  :sharing_id,
  keyword_init: true
)

# DomainChangeOwner entity data model.
#
# @!attribute [rw] admin
#   @return [Hash]
#
# @!attribute [rw] bill
#   @return [Hash]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] date_start
#   @return [String, nil]
#
# @!attribute [rw] errors
#   @return [Array, nil]
#
# @!attribute [rw] errortype
#   @return [String, nil]
#
# @!attribute [rw] errortype_label
#   @return [String, nil]
#
# @!attribute [rw] foa
#   @return [Array, nil]
#
# @!attribute [rw] inner_step
#   @return [String, nil]
#
# @!attribute [rw] owner
#   @return [Hash]
#
# @!attribute [rw] params
#   @return [Hash]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] step
#   @return [String]
#
# @!attribute [rw] step_nb
#   @return [Integer]
#
# @!attribute [rw] tech
#   @return [Hash]
#
# @!attribute [rw] updated_at
#   @return [String]
DomainChangeOwner = Struct.new(
  :admin,
  :bill,
  :created_at,
  :date_start,
  :errors,
  :errortype,
  :errortype_label,
  :foa,
  :inner_step,
  :owner,
  :params,
  :status,
  :step,
  :step_nb,
  :tech,
  :updated_at,
  keyword_init: true
)

# Request payload for DomainChangeOwner#load.
#
# @!attribute [rw] domain
#   @return [String]
#
# @!attribute [rw] sharing_id
#   @return [String, nil]
DomainChangeOwnerLoadMatch = Struct.new(
  :domain,
  :sharing_id,
  keyword_init: true
)

# Request payload for DomainChangeOwner#create.
#
# @!attribute [rw] domain
#   @return [String]
#
# @!attribute [rw] sharing_id
#   @return [String, nil]
#
# @!attribute [rw] admin
#   @return [Hash]
#
# @!attribute [rw] bill
#   @return [Hash]
#
# @!attribute [rw] owner
#   @return [Hash]
#
# @!attribute [rw] tech
#   @return [Hash]
DomainChangeOwnerCreateData = Struct.new(
  :domain,
  :sharing_id,
  :admin,
  :bill,
  :owner,
  :tech,
  keyword_init: true
)

# DomainClaim entity data model.
#
# @!attribute [rw] claims
#   @return [Array]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] expires_at
#   @return [String]
#
# @!attribute [rw] fqdn
#   @return [String]
#
# @!attribute [rw] fqdn_alabel
#   @return [String]
#
# @!attribute [rw] fqdn_ulabel
#   @return [String]
#
# @!attribute [rw] notice_id
#   @return [String]
#
# @!attribute [rw] status
#   @return [String]
DomainClaim = Struct.new(
  :claims,
  :created_at,
  :expires_at,
  :fqdn,
  :fqdn_alabel,
  :fqdn_ulabel,
  :notice_id,
  :status,
  keyword_init: true
)

# Request payload for DomainClaim#load.
#
# @!attribute [rw] domain
#   @return [String]
DomainClaimLoadMatch = Struct.new(
  :domain,
  keyword_init: true
)

# Request payload for DomainClaim#create.
#
# @!attribute [rw] domain
#   @return [String]
#
# @!attribute [rw] claims
#   @return [Array]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] expires_at
#   @return [String]
#
# @!attribute [rw] fqdn
#   @return [String]
#
# @!attribute [rw] fqdn_alabel
#   @return [String]
#
# @!attribute [rw] fqdn_ulabel
#   @return [String]
#
# @!attribute [rw] notice_id
#   @return [String]
#
# @!attribute [rw] status
#   @return [String]
DomainClaimCreateData = Struct.new(
  :domain,
  :claims,
  :created_at,
  :expires_at,
  :fqdn,
  :fqdn_alabel,
  :fqdn_ulabel,
  :notice_id,
  :status,
  keyword_init: true
)

# DomainContact entity data model.
#
# @!attribute [rw] admin
#   @return [Hash]
#
# @!attribute [rw] bill
#   @return [Hash]
#
# @!attribute [rw] message
#   @return [String]
#
# @!attribute [rw] owner
#   @return [Hash]
#
# @!attribute [rw] tech
#   @return [Hash]
DomainContact = Struct.new(
  :admin,
  :bill,
  :message,
  :owner,
  :tech,
  keyword_init: true
)

# Request payload for DomainContact#load.
#
# @!attribute [rw] domain
#   @return [String]
DomainContactLoadMatch = Struct.new(
  :domain,
  keyword_init: true
)

# Request payload for DomainContact#update.
#
# @!attribute [rw] domain
#   @return [String]
#
# @!attribute [rw] admin
#   @return [Hash, nil]
#
# @!attribute [rw] bill
#   @return [Hash, nil]
#
# @!attribute [rw] tech
#   @return [Hash, nil]
DomainContactUpdateData = Struct.new(
  :domain,
  :admin,
  :bill,
  :tech,
  keyword_init: true
)

# DomainDnskey entity data model.
#
# @!attribute [rw] algorithm
#   @return [Integer]
#
# @!attribute [rw] digest
#   @return [String]
#
# @!attribute [rw] digest_type
#   @return [Integer]
#
# @!attribute [rw] href
#   @return [String]
#
# @!attribute [rw] id
#   @return [Integer]
#
# @!attribute [rw] keys
#   @return [Array]
#
# @!attribute [rw] keytag
#   @return [Integer]
#
# @!attribute [rw] message
#   @return [String]
#
# @!attribute [rw] public_key
#   @return [String]
#
# @!attribute [rw] type
#   @return [String]
DomainDnskey = Struct.new(
  :algorithm,
  :digest,
  :digest_type,
  :href,
  :id,
  :keys,
  :keytag,
  :message,
  :public_key,
  :type,
  keyword_init: true
)

# Request payload for DomainDnskey#list.
#
# @!attribute [rw] domain
#   @return [String]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] per_page
#   @return [Integer, nil]
DomainDnskeyListMatch = Struct.new(
  :domain,
  :page,
  :per_page,
  keyword_init: true
)

# Request payload for DomainDnskey#create.
#
# @!attribute [rw] domain
#   @return [String]
#
# @!attribute [rw] algorithm
#   @return [Integer]
#
# @!attribute [rw] public_key
#   @return [String]
#
# @!attribute [rw] type
#   @return [String]
DomainDnskeyCreateData = Struct.new(
  :domain,
  :algorithm,
  :public_key,
  :type,
  keyword_init: true
)

# Request payload for DomainDnskey#update.
#
# @!attribute [rw] domain
#   @return [String]
#
# @!attribute [rw] keys
#   @return [Array, nil]
DomainDnskeyUpdateData = Struct.new(
  :domain,
  :keys,
  keyword_init: true
)

# Request payload for DomainDnskey#remove.
#
# @!attribute [rw] domain
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
DomainDnskeyRemoveMatch = Struct.new(
  :domain,
  :id,
  keyword_init: true
)

# DomainDnssec entity data model.
#
# @!attribute [rw] error
#   @return [String, nil]
#
# @!attribute [rw] state
#   @return [String]
DomainDnssec = Struct.new(
  :error,
  :state,
  keyword_init: true
)

# Request payload for DomainDnssec#load.
#
# @!attribute [rw] domain
#   @return [String]
DomainDnssecLoadMatch = Struct.new(
  :domain,
  keyword_init: true
)

# Request payload for DomainDnssec#create.
#
# @!attribute [rw] domain
#   @return [String]
#
# @!attribute [rw] sharing_id
#   @return [String, nil]
#
# @!attribute [rw] error
#   @return [String, nil]
#
# @!attribute [rw] state
#   @return [String]
DomainDnssecCreateData = Struct.new(
  :domain,
  :sharing_id,
  :error,
  :state,
  keyword_init: true
)

# Request payload for DomainDnssec#remove.
#
# @!attribute [rw] domain
#   @return [String]
#
# @!attribute [rw] sharing_id
#   @return [String, nil]
DomainDnssecRemoveMatch = Struct.new(
  :domain,
  :sharing_id,
  keyword_init: true
)

# DomainHost entity data model.
#
# @!attribute [rw] fqdn
#   @return [String]
#
# @!attribute [rw] fqdn_unicode
#   @return [String]
#
# @!attribute [rw] href
#   @return [String]
#
# @!attribute [rw] ips
#   @return [Array]
#
# @!attribute [rw] message
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
DomainHost = Struct.new(
  :fqdn,
  :fqdn_unicode,
  :href,
  :ips,
  :message,
  :name,
  keyword_init: true
)

# Request payload for DomainHost#load.
#
# @!attribute [rw] domain
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
DomainHostLoadMatch = Struct.new(
  :domain,
  :name,
  keyword_init: true
)

# Request payload for DomainHost#list.
#
# @!attribute [rw] domain
#   @return [String]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] per_page
#   @return [Integer, nil]
DomainHostListMatch = Struct.new(
  :domain,
  :page,
  :per_page,
  keyword_init: true
)

# Request payload for DomainHost#create.
#
# @!attribute [rw] domain
#   @return [String]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] per_page
#   @return [Integer, nil]
#
# @!attribute [rw] ips
#   @return [Array]
#
# @!attribute [rw] name
#   @return [String]
DomainHostCreateData = Struct.new(
  :domain,
  :page,
  :per_page,
  :ips,
  :name,
  keyword_init: true
)

# Request payload for DomainHost#update.
#
# @!attribute [rw] domain
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] ips
#   @return [Array, nil]
DomainHostUpdateData = Struct.new(
  :domain,
  :name,
  :ips,
  keyword_init: true
)

# Request payload for DomainHost#remove.
#
# @!attribute [rw] domain
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
DomainHostRemoveMatch = Struct.new(
  :domain,
  :name,
  keyword_init: true
)

# DomainLivedns entity data model.
#
# @!attribute [rw] current
#   @return [String]
#
# @!attribute [rw] dnssec_available
#   @return [Boolean, nil]
#
# @!attribute [rw] livednssec_available
#   @return [Boolean, nil]
#
# @!attribute [rw] message
#   @return [String]
#
# @!attribute [rw] nameservers
#   @return [Array]
DomainLivedns = Struct.new(
  :current,
  :dnssec_available,
  :livednssec_available,
  :message,
  :nameservers,
  keyword_init: true
)

# Request payload for DomainLivedns#load.
#
# @!attribute [rw] domain
#   @return [String]
DomainLivednsLoadMatch = Struct.new(
  :domain,
  keyword_init: true
)

# Request payload for DomainLivedns#create.
#
# @!attribute [rw] domain
#   @return [String]
#
# @!attribute [rw] current
#   @return [String]
#
# @!attribute [rw] dnssec_available
#   @return [Boolean, nil]
#
# @!attribute [rw] livednssec_available
#   @return [Boolean, nil]
#
# @!attribute [rw] message
#   @return [String]
#
# @!attribute [rw] nameservers
#   @return [Array]
DomainLivednsCreateData = Struct.new(
  :domain,
  :current,
  :dnssec_available,
  :livednssec_available,
  :message,
  :nameservers,
  keyword_init: true
)

# DomainNameserver entity data model.
#
# @!attribute [rw] message
#   @return [String]
#
# @!attribute [rw] nameservers
#   @return [Array]
DomainNameserver = Struct.new(
  :message,
  :nameservers,
  keyword_init: true
)

# Request payload for DomainNameserver#list.
#
# @!attribute [rw] domain
#   @return [String]
DomainNameserverListMatch = Struct.new(
  :domain,
  keyword_init: true
)

# Request payload for DomainNameserver#update.
#
# @!attribute [rw] domain
#   @return [String]
#
# @!attribute [rw] nameservers
#   @return [Array, nil]
DomainNameserverUpdateData = Struct.new(
  :domain,
  :nameservers,
  keyword_init: true
)

# DomainTag entity data model.
#
# @!attribute [rw] add
#   @return [Array]
#
# @!attribute [rw] message
#   @return [String]
#
# @!attribute [rw] remove
#   @return [Array]
#
# @!attribute [rw] tag
#   @return [String]
#
# @!attribute [rw] tags
#   @return [Array]
DomainTag = Struct.new(
  :add,
  :message,
  :remove,
  :tag,
  :tags,
  keyword_init: true
)

# Request payload for DomainTag#list.
#
# @!attribute [rw] domain
#   @return [String]
DomainTagListMatch = Struct.new(
  :domain,
  keyword_init: true
)

# Request payload for DomainTag#create.
#
# @!attribute [rw] domain
#   @return [String]
#
# @!attribute [rw] tag
#   @return [String]
DomainTagCreateData = Struct.new(
  :domain,
  :tag,
  keyword_init: true
)

# Request payload for DomainTag#update.
#
# @!attribute [rw] domain
#   @return [String]
#
# @!attribute [rw] tags
#   @return [Array, nil]
DomainTagUpdateData = Struct.new(
  :domain,
  :tags,
  keyword_init: true
)

# Request payload for DomainTag#patch.
#
# @!attribute [rw] domain
#   @return [String]
#
# @!attribute [rw] add
#   @return [Array, nil]
#
# @!attribute [rw] remove
#   @return [Array, nil]
DomainTagPatchData = Struct.new(
  :domain,
  :add,
  :remove,
  keyword_init: true
)

# Request payload for DomainTag#remove.
#
# @!attribute [rw] domain
#   @return [String]
DomainTagRemoveMatch = Struct.new(
  :domain,
  keyword_init: true
)

# DomainTransfer entity data model.
#
# @!attribute [rw] admin
#   @return [Hash]
#
# @!attribute [rw] authinfo
#   @return [String, nil]
#
# @!attribute [rw] bill
#   @return [Hash]
#
# @!attribute [rw] change_owner
#   @return [Boolean, nil]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] currency
#   @return [String, nil]
#
# @!attribute [rw] duration
#   @return [Integer, nil]
#
# @!attribute [rw] enforce_premium
#   @return [Boolean, nil]
#
# @!attribute [rw] errors
#   @return [Array, nil]
#
# @!attribute [rw] errortype
#   @return [String, nil]
#
# @!attribute [rw] errortype_label
#   @return [String, nil]
#
# @!attribute [rw] extra_parameters
#   @return [Hash, nil]
#
# @!attribute [rw] foa
#   @return [Array, nil]
#
# @!attribute [rw] fqdn
#   @return [String]
#
# @!attribute [rw] inner_step
#   @return [String, nil]
#
# @!attribute [rw] mailbox_optin
#   @return [Boolean, nil]
#
# @!attribute [rw] message
#   @return [String]
#
# @!attribute [rw] nameservers
#   @return [Array, nil]
#
# @!attribute [rw] nameservers_ips
#   @return [Hash, nil]
#
# @!attribute [rw] owner
#   @return [Hash]
#
# @!attribute [rw] owner_contact
#   @return [String]
#
# @!attribute [rw] params
#   @return [Hash]
#
# @!attribute [rw] price
#   @return [Float, nil]
#
# @!attribute [rw] regac_at
#   @return [String, nil]
#
# @!attribute [rw] resellee_id
#   @return [String, nil]
#
# @!attribute [rw] start_at
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] step
#   @return [String]
#
# @!attribute [rw] step_nb
#   @return [Integer]
#
# @!attribute [rw] tech
#   @return [Hash]
#
# @!attribute [rw] template_id
#   @return [String, nil]
#
# @!attribute [rw] transfer_link
#   @return [String, nil]
#
# @!attribute [rw] transfer_procedure
#   @return [String, nil]
#
# @!attribute [rw] updated_at
#   @return [String]
DomainTransfer = Struct.new(
  :admin,
  :authinfo,
  :bill,
  :change_owner,
  :created_at,
  :currency,
  :duration,
  :enforce_premium,
  :errors,
  :errortype,
  :errortype_label,
  :extra_parameters,
  :foa,
  :fqdn,
  :inner_step,
  :mailbox_optin,
  :message,
  :nameservers,
  :nameservers_ips,
  :owner,
  :owner_contact,
  :params,
  :price,
  :regac_at,
  :resellee_id,
  :start_at,
  :status,
  :step,
  :step_nb,
  :tech,
  :template_id,
  :transfer_link,
  :transfer_procedure,
  :updated_at,
  keyword_init: true
)

# Request payload for DomainTransfer#load.
#
# @!attribute [rw] domain
#   @return [String]
DomainTransferLoadMatch = Struct.new(
  :domain,
  keyword_init: true
)

# Request payload for DomainTransfer#create.
#
# @!attribute [rw] sharing_id
#   @return [String, nil]
#
# @!attribute [rw] admin
#   @return [Hash]
#
# @!attribute [rw] authinfo
#   @return [String, nil]
#
# @!attribute [rw] bill
#   @return [Hash]
#
# @!attribute [rw] change_owner
#   @return [Boolean, nil]
#
# @!attribute [rw] currency
#   @return [String, nil]
#
# @!attribute [rw] duration
#   @return [Integer, nil]
#
# @!attribute [rw] enforce_premium
#   @return [Boolean, nil]
#
# @!attribute [rw] extra_parameters
#   @return [Hash, nil]
#
# @!attribute [rw] fqdn
#   @return [String]
#
# @!attribute [rw] mailbox_optin
#   @return [Boolean, nil]
#
# @!attribute [rw] nameservers
#   @return [Array, nil]
#
# @!attribute [rw] nameservers_ips
#   @return [Hash, nil]
#
# @!attribute [rw] owner
#   @return [Hash]
#
# @!attribute [rw] price
#   @return [Float, nil]
#
# @!attribute [rw] resellee_id
#   @return [String, nil]
#
# @!attribute [rw] tech
#   @return [Hash]
#
# @!attribute [rw] template_id
#   @return [String, nil]
DomainTransferCreateData = Struct.new(
  :sharing_id,
  :admin,
  :authinfo,
  :bill,
  :change_owner,
  :currency,
  :duration,
  :enforce_premium,
  :extra_parameters,
  :fqdn,
  :mailbox_optin,
  :nameservers,
  :nameservers_ips,
  :owner,
  :price,
  :resellee_id,
  :tech,
  :template_id,
  keyword_init: true
)

# Request payload for DomainTransfer#update.
#
# @!attribute [rw] domain
#   @return [String]
#
# @!attribute [rw] admin
#   @return [Hash, nil]
#
# @!attribute [rw] authinfo
#   @return [String, nil]
#
# @!attribute [rw] bill
#   @return [Hash, nil]
#
# @!attribute [rw] change_owner
#   @return [Boolean, nil]
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] currency
#   @return [String, nil]
#
# @!attribute [rw] duration
#   @return [Integer, nil]
#
# @!attribute [rw] enforce_premium
#   @return [Boolean, nil]
#
# @!attribute [rw] errors
#   @return [Array, nil]
#
# @!attribute [rw] errortype
#   @return [String, nil]
#
# @!attribute [rw] errortype_label
#   @return [String, nil]
#
# @!attribute [rw] extra_parameters
#   @return [Hash, nil]
#
# @!attribute [rw] foa
#   @return [Array, nil]
#
# @!attribute [rw] fqdn
#   @return [String, nil]
#
# @!attribute [rw] inner_step
#   @return [String, nil]
#
# @!attribute [rw] mailbox_optin
#   @return [Boolean, nil]
#
# @!attribute [rw] message
#   @return [String, nil]
#
# @!attribute [rw] nameservers
#   @return [Array, nil]
#
# @!attribute [rw] nameservers_ips
#   @return [Hash, nil]
#
# @!attribute [rw] owner
#   @return [Hash, nil]
#
# @!attribute [rw] owner_contact
#   @return [String, nil]
#
# @!attribute [rw] params
#   @return [Hash, nil]
#
# @!attribute [rw] price
#   @return [Float, nil]
#
# @!attribute [rw] regac_at
#   @return [String, nil]
#
# @!attribute [rw] resellee_id
#   @return [String, nil]
#
# @!attribute [rw] start_at
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] step
#   @return [String, nil]
#
# @!attribute [rw] step_nb
#   @return [Integer, nil]
#
# @!attribute [rw] tech
#   @return [Hash, nil]
#
# @!attribute [rw] template_id
#   @return [String, nil]
#
# @!attribute [rw] transfer_link
#   @return [String, nil]
#
# @!attribute [rw] transfer_procedure
#   @return [String, nil]
#
# @!attribute [rw] updated_at
#   @return [String, nil]
DomainTransferUpdateData = Struct.new(
  :domain,
  :admin,
  :authinfo,
  :bill,
  :change_owner,
  :created_at,
  :currency,
  :duration,
  :enforce_premium,
  :errors,
  :errortype,
  :errortype_label,
  :extra_parameters,
  :foa,
  :fqdn,
  :inner_step,
  :mailbox_optin,
  :message,
  :nameservers,
  :nameservers_ips,
  :owner,
  :owner_contact,
  :params,
  :price,
  :regac_at,
  :resellee_id,
  :start_at,
  :status,
  :step,
  :step_nb,
  :tech,
  :template_id,
  :transfer_link,
  :transfer_procedure,
  :updated_at,
  keyword_init: true
)

# DomainWebredir entity data model.
#
# @!attribute [rw] cert_status
#   @return [String, nil]
#
# @!attribute [rw] cert_uuid
#   @return [String, nil]
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] host
#   @return [String]
#
# @!attribute [rw] message
#   @return [String]
#
# @!attribute [rw] override
#   @return [Boolean]
#
# @!attribute [rw] protocol
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String]
#
# @!attribute [rw] updated_at
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String]
DomainWebredir = Struct.new(
  :cert_status,
  :cert_uuid,
  :created_at,
  :host,
  :message,
  :override,
  :protocol,
  :type,
  :updated_at,
  :url,
  keyword_init: true
)

# Request payload for DomainWebredir#load.
#
# @!attribute [rw] domain
#   @return [String]
#
# @!attribute [rw] host
#   @return [String]
DomainWebredirLoadMatch = Struct.new(
  :domain,
  :host,
  keyword_init: true
)

# Request payload for DomainWebredir#list.
#
# @!attribute [rw] domain
#   @return [String]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] per_page
#   @return [Integer, nil]
DomainWebredirListMatch = Struct.new(
  :domain,
  :page,
  :per_page,
  keyword_init: true
)

# Request payload for DomainWebredir#create.
#
# @!attribute [rw] domain
#   @return [String]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] per_page
#   @return [Integer, nil]
#
# @!attribute [rw] host
#   @return [String]
#
# @!attribute [rw] override
#   @return [Boolean]
#
# @!attribute [rw] protocol
#   @return [String]
#
# @!attribute [rw] type
#   @return [String]
#
# @!attribute [rw] url
#   @return [String]
DomainWebredirCreateData = Struct.new(
  :domain,
  :page,
  :per_page,
  :host,
  :override,
  :protocol,
  :type,
  :url,
  keyword_init: true
)

# Request payload for DomainWebredir#update.
#
# @!attribute [rw] domain
#   @return [String]
#
# @!attribute [rw] host
#   @return [String]
#
# @!attribute [rw] override
#   @return [Boolean, nil]
#
# @!attribute [rw] protocol
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
DomainWebredirUpdateData = Struct.new(
  :domain,
  :host,
  :override,
  :protocol,
  :type,
  :url,
  keyword_init: true
)

# Request payload for DomainWebredir#remove.
#
# @!attribute [rw] domain
#   @return [String]
#
# @!attribute [rw] host
#   @return [String]
DomainWebredirRemoveMatch = Struct.new(
  :domain,
  :host,
  keyword_init: true
)

# EmailForward entity data model.
#
# @!attribute [rw] destinations
#   @return [Array]
#
# @!attribute [rw] href
#   @return [String]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] message
#   @return [String]
#
# @!attribute [rw] source
#   @return [String]
EmailForward = Struct.new(
  :destinations,
  :href,
  :id,
  :message,
  :source,
  keyword_init: true
)

# Request payload for EmailForward#list.
#
# @!attribute [rw] domain
#   @return [String]
#
# @!attribute [rw] destination
#   @return [String, nil]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] per_page
#   @return [Integer, nil]
#
# @!attribute [rw] sort_by
#   @return [String, nil]
#
# @!attribute [rw] source
#   @return [String, nil]
EmailForwardListMatch = Struct.new(
  :domain,
  :destination,
  :page,
  :per_page,
  :sort_by,
  :source,
  keyword_init: true
)

# Request payload for EmailForward#create.
#
# @!attribute [rw] domain
#   @return [String]
#
# @!attribute [rw] destinations
#   @return [Array]
#
# @!attribute [rw] source
#   @return [String]
EmailForwardCreateData = Struct.new(
  :domain,
  :destinations,
  :source,
  keyword_init: true
)

# Request payload for EmailForward#update.
#
# @!attribute [rw] domain
#   @return [String]
#
# @!attribute [rw] source
#   @return [String]
#
# @!attribute [rw] destinations
#   @return [Array, nil]
EmailForwardUpdateData = Struct.new(
  :domain,
  :source,
  :destinations,
  keyword_init: true
)

# Request payload for EmailForward#remove.
#
# @!attribute [rw] domain
#   @return [String]
#
# @!attribute [rw] source
#   @return [String]
EmailForwardRemoveMatch = Struct.new(
  :domain,
  :source,
  keyword_init: true
)

# EmailMailbox entity data model.
#
# @!attribute [rw] address
#   @return [String]
#
# @!attribute [rw] alias_count
#   @return [Integer, nil]
#
# @!attribute [rw] aliases
#   @return [Array]
#
# @!attribute [rw] antispam
#   @return [Boolean]
#
# @!attribute [rw] autorenew
#   @return [Hash]
#
# @!attribute [rw] domain
#   @return [String]
#
# @!attribute [rw] errors
#   @return [Array, nil]
#
# @!attribute [rw] expires_at
#   @return [String]
#
# @!attribute [rw] fallback_email
#   @return [String, nil]
#
# @!attribute [rw] href
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] login
#   @return [String]
#
# @!attribute [rw] mailbox_type
#   @return [String]
#
# @!attribute [rw] message
#   @return [String]
#
# @!attribute [rw] password
#   @return [String]
#
# @!attribute [rw] quota_used
#   @return [Integer]
#
# @!attribute [rw] responder
#   @return [Hash, nil]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] to_convert
#   @return [Boolean]
EmailMailbox = Struct.new(
  :address,
  :alias_count,
  :aliases,
  :antispam,
  :autorenew,
  :domain,
  :errors,
  :expires_at,
  :fallback_email,
  :href,
  :id,
  :login,
  :mailbox_type,
  :message,
  :password,
  :quota_used,
  :responder,
  :status,
  :to_convert,
  keyword_init: true
)

# Request payload for EmailMailbox#load.
#
# @!attribute [rw] domain
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
EmailMailboxLoadMatch = Struct.new(
  :domain,
  :id,
  keyword_init: true
)

# Request payload for EmailMailbox#list.
#
# @!attribute [rw] domain
#   @return [String]
#
# @!attribute [rw] <created_at
#   @return [String, nil]
#
# @!attribute [rw] antispam
#   @return [Boolean, nil]
#
# @!attribute [rw] login
#   @return [String, nil]
#
# @!attribute [rw] mailbox_type
#   @return [String, nil]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] per_page
#   @return [Integer, nil]
#
# @!attribute [rw] ~login
#   @return [String, nil]
EmailMailboxListMatch = Struct.new(
  :domain,
  :"<created_at",
  :antispam,
  :login,
  :mailbox_type,
  :page,
  :per_page,
  :"~login",
  keyword_init: true
)

# Request payload for EmailMailbox#create.
#
# @!attribute [rw] domain
#   @return [String]
#
# @!attribute [rw] aliases
#   @return [Array, nil]
#
# @!attribute [rw] antispam
#   @return [Boolean, nil]
#
# @!attribute [rw] login
#   @return [String]
#
# @!attribute [rw] mailbox_type
#   @return [String]
#
# @!attribute [rw] password
#   @return [String]
EmailMailboxCreateData = Struct.new(
  :domain,
  :aliases,
  :antispam,
  :login,
  :mailbox_type,
  :password,
  keyword_init: true
)

# Request payload for EmailMailbox#update.
#
# @!attribute [rw] domain
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] sharing_id
#   @return [String, nil]
#
# @!attribute [rw] aliases
#   @return [Array, nil]
#
# @!attribute [rw] antispam
#   @return [Boolean, nil]
#
# @!attribute [rw] autorenew
#   @return [Hash, nil]
#
# @!attribute [rw] login
#   @return [String, nil]
#
# @!attribute [rw] mailbox_type
#   @return [String, nil]
#
# @!attribute [rw] password
#   @return [String, nil]
#
# @!attribute [rw] responder
#   @return [Hash, nil]
EmailMailboxUpdateData = Struct.new(
  :domain,
  :id,
  :sharing_id,
  :aliases,
  :antispam,
  :autorenew,
  :login,
  :mailbox_type,
  :password,
  :responder,
  keyword_init: true
)

# Request payload for EmailMailbox#remove.
#
# @!attribute [rw] domain
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
EmailMailboxRemoveMatch = Struct.new(
  :domain,
  :id,
  keyword_init: true
)

# EmailMigration entity data model.
#
# @!attribute [rw] available
#   @return [Boolean]
#
# @!attribute [rw] currency
#   @return [String]
#
# @!attribute [rw] forward_count
#   @return [Integer]
#
# @!attribute [rw] free_mailboxes
#   @return [Integer]
#
# @!attribute [rw] included_mailboxes
#   @return [Integer]
#
# @!attribute [rw] info
#   @return [Array]
#
# @!attribute [rw] message
#   @return [String]
#
# @!attribute [rw] packmail
#   @return [Boolean]
#
# @!attribute [rw] price_v1
#   @return [Float]
#
# @!attribute [rw] price_v2
#   @return [Float]
#
# @!attribute [rw] quota_v1
#   @return [Float]
#
# @!attribute [rw] token
#   @return [String]
#
# @!attribute [rw] usage_v1
#   @return [Float]
EmailMigration = Struct.new(
  :available,
  :currency,
  :forward_count,
  :free_mailboxes,
  :included_mailboxes,
  :info,
  :message,
  :packmail,
  :price_v1,
  :price_v2,
  :quota_v1,
  :token,
  :usage_v1,
  keyword_init: true
)

# Request payload for EmailMigration#load.
#
# @!attribute [rw] domain
#   @return [String]
#
# @!attribute [rw] sharing_id
#   @return [String, nil]
EmailMigrationLoadMatch = Struct.new(
  :domain,
  :sharing_id,
  keyword_init: true
)

# Request payload for EmailMigration#create.
#
# @!attribute [rw] domain
#   @return [String]
#
# @!attribute [rw] sharing_id
#   @return [String, nil]
#
# @!attribute [rw] token
#   @return [String]
EmailMigrationCreateData = Struct.new(
  :domain,
  :sharing_id,
  :token,
  keyword_init: true
)

# EmailOffer entity data model.
#
# @!attribute [rw] antispam
#   @return [String]
#
# @!attribute [rw] dkim
#   @return [String]
#
# @!attribute [rw] message
#   @return [String]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] version
#   @return [Integer]
EmailOffer = Struct.new(
  :antispam,
  :dkim,
  :message,
  :status,
  :version,
  keyword_init: true
)

# Request payload for EmailOffer#load.
#
# @!attribute [rw] domain
#   @return [String]
EmailOfferLoadMatch = Struct.new(
  :domain,
  keyword_init: true
)

# Request payload for EmailOffer#update.
#
# @!attribute [rw] domain
#   @return [String]
#
# @!attribute [rw] antispam
#   @return [String, nil]
#
# @!attribute [rw] dkim
#   @return [String, nil]
EmailOfferUpdateData = Struct.new(
  :domain,
  :antispam,
  :dkim,
  keyword_init: true
)

# EmailSlot entity data model.
#
# @!attribute [rw] autorenew
#   @return [Boolean, nil]
#
# @!attribute [rw] capacity
#   @return [Integer]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] duration
#   @return [Integer]
#
# @!attribute [rw] gandi_id
#   @return [Integer]
#
# @!attribute [rw] href
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] mailbox_type
#   @return [String]
#
# @!attribute [rw] refund_amount
#   @return [Float, nil]
#
# @!attribute [rw] refund_currency
#   @return [String, nil]
#
# @!attribute [rw] refundable
#   @return [Boolean]
#
# @!attribute [rw] status
#   @return [String]
EmailSlot = Struct.new(
  :autorenew,
  :capacity,
  :created_at,
  :duration,
  :gandi_id,
  :href,
  :id,
  :mailbox_type,
  :refund_amount,
  :refund_currency,
  :refundable,
  :status,
  keyword_init: true
)

# Request payload for EmailSlot#load.
#
# @!attribute [rw] domain
#   @return [String]
#
# @!attribute [rw] id
#   @return [Integer]
EmailSlotLoadMatch = Struct.new(
  :domain,
  :id,
  keyword_init: true
)

# Request payload for EmailSlot#list.
#
# @!attribute [rw] domain
#   @return [String]
#
# @!attribute [rw] display_not_expired_and_inactive
#   @return [Boolean, nil]
EmailSlotListMatch = Struct.new(
  :domain,
  :display_not_expired_and_inactive,
  keyword_init: true
)

# Request payload for EmailSlot#create.
#
# @!attribute [rw] domain
#   @return [String]
#
# @!attribute [rw] sharing_id
#   @return [String, nil]
#
# @!attribute [rw] autorenew
#   @return [Boolean, nil]
#
# @!attribute [rw] duration
#   @return [Integer]
#
# @!attribute [rw] mailbox_type
#   @return [String]
EmailSlotCreateData = Struct.new(
  :domain,
  :sharing_id,
  :autorenew,
  :duration,
  :mailbox_type,
  keyword_init: true
)

# Request payload for EmailSlot#remove.
#
# @!attribute [rw] domain
#   @return [String]
#
# @!attribute [rw] id
#   @return [Integer]
EmailSlotRemoveMatch = Struct.new(
  :domain,
  :id,
  keyword_init: true
)

# HostingApplication entity data model.
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] name_label
#   @return [String]
#
# @!attribute [rw] requirements
#   @return [Array]
HostingApplication = Struct.new(
  :name,
  :name_label,
  :requirements,
  keyword_init: true
)

# Request payload for HostingApplication#load.
#
# @!attribute [rw] name
#   @return [String]
HostingApplicationLoadMatch = Struct.new(
  :name,
  keyword_init: true
)

# Request payload for HostingApplication#list.
#
# @!attribute [rw] database
#   @return [String, nil]
#
# @!attribute [rw] language
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] per_page
#   @return [Integer, nil]
#
# @!attribute [rw] sharing_id
#   @return [String, nil]
#
# @!attribute [rw] sort_by
#   @return [String, nil]
HostingApplicationListMatch = Struct.new(
  :database,
  :language,
  :name,
  :page,
  :per_page,
  :sharing_id,
  :sort_by,
  keyword_init: true
)

# HostingInstance entity data model.
#
# @!attribute [rw] access_information
#   @return [Hash]
#
# @!attribute [rw] authentication
#   @return [Hash]
#
# @!attribute [rw] autorenew
#   @return [Hash]
#
# @!attribute [rw] available_upgrade
#   @return [Boolean]
#
# @!attribute [rw] booster
#   @return [Hash, nil]
#
# @!attribute [rw] booster_options
#   @return [Hash, nil]
#
# @!attribute [rw] compatible_applications
#   @return [Array, nil]
#
# @!attribute [rw] console
#   @return [Hash]
#
# @!attribute [rw] cpu
#   @return [Integer]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] database
#   @return [Hash]
#
# @!attribute [rw] datacenter
#   @return [Hash]
#
# @!attribute [rw] domain
#   @return [String, nil]
#
# @!attribute [rw] duration
#   @return [Integer, nil]
#
# @!attribute [rw] duration_unit
#   @return [String, nil]
#
# @!attribute [rw] errors
#   @return [Array, nil]
#
# @!attribute [rw] expire_at
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] language
#   @return [Hash]
#
# @!attribute [rw] language_id
#   @return [String, nil]
#
# @!attribute [rw] location
#   @return [String]
#
# @!attribute [rw] message
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] password
#   @return [String, nil]
#
# @!attribute [rw] password_updated_at
#   @return [String, nil]
#
# @!attribute [rw] ram
#   @return [Hash]
#
# @!attribute [rw] sharing_space
#   @return [Hash]
#
# @!attribute [rw] size
#   @return [String]
#
# @!attribute [rw] snapshot_enabled
#   @return [Boolean]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] storage
#   @return [Hash]
#
# @!attribute [rw] storage_additional_size
#   @return [Integer, nil]
#
# @!attribute [rw] subscription_cancelled
#   @return [Boolean, nil]
#
# @!attribute [rw] type
#   @return [Hash]
#
# @!attribute [rw] upgrade_to
#   @return [Array, nil]
#
# @!attribute [rw] vhosts
#   @return [Array]
HostingInstance = Struct.new(
  :access_information,
  :authentication,
  :autorenew,
  :available_upgrade,
  :booster,
  :booster_options,
  :compatible_applications,
  :console,
  :cpu,
  :created_at,
  :database,
  :datacenter,
  :domain,
  :duration,
  :duration_unit,
  :errors,
  :expire_at,
  :id,
  :language,
  :language_id,
  :location,
  :message,
  :name,
  :password,
  :password_updated_at,
  :ram,
  :sharing_space,
  :size,
  :snapshot_enabled,
  :status,
  :storage,
  :storage_additional_size,
  :subscription_cancelled,
  :type,
  :upgrade_to,
  :vhosts,
  keyword_init: true
)

# Request payload for HostingInstance#load.
#
# @!attribute [rw] id
#   @return [String]
HostingInstanceLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for HostingInstance#list.
#
# @!attribute [rw] fqdn
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] per_page
#   @return [Integer, nil]
#
# @!attribute [rw] sharing_id
#   @return [String, nil]
#
# @!attribute [rw] size
#   @return [String, nil]
#
# @!attribute [rw] sort_by
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
HostingInstanceListMatch = Struct.new(
  :fqdn,
  :name,
  :page,
  :per_page,
  :sharing_id,
  :size,
  :sort_by,
  :status,
  keyword_init: true
)

# Request payload for HostingInstance#create.
#
# @!attribute [rw] sharing_id
#   @return [String, nil]
#
# @!attribute [rw] authentication
#   @return [Hash]
#
# @!attribute [rw] autorenew
#   @return [Hash, nil]
#
# @!attribute [rw] domain
#   @return [String]
#
# @!attribute [rw] duration
#   @return [Integer, nil]
#
# @!attribute [rw] duration_unit
#   @return [String, nil]
#
# @!attribute [rw] location
#   @return [String]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] size
#   @return [String]
#
# @!attribute [rw] snapshot_enabled
#   @return [Boolean, nil]
#
# @!attribute [rw] storage_additional_size
#   @return [Integer, nil]
#
# @!attribute [rw] type
#   @return [Hash]
#
# @!attribute [rw] vhosts
#   @return [Array, nil]
HostingInstanceCreateData = Struct.new(
  :sharing_id,
  :authentication,
  :autorenew,
  :domain,
  :duration,
  :duration_unit,
  :location,
  :name,
  :size,
  :snapshot_enabled,
  :storage_additional_size,
  :type,
  :vhosts,
  keyword_init: true
)

# Request payload for HostingInstance#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] booster
#   @return [Hash, nil]
#
# @!attribute [rw] booster_options
#   @return [Hash, nil]
#
# @!attribute [rw] language_id
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] password
#   @return [String, nil]
#
# @!attribute [rw] size
#   @return [String, nil]
#
# @!attribute [rw] snapshot_enabled
#   @return [Boolean, nil]
#
# @!attribute [rw] storage_additional_size
#   @return [Integer, nil]
HostingInstanceUpdateData = Struct.new(
  :id,
  :booster,
  :booster_options,
  :language_id,
  :name,
  :password,
  :size,
  :snapshot_enabled,
  :storage_additional_size,
  keyword_init: true
)

# Request payload for HostingInstance#remove.
#
# @!attribute [rw] id
#   @return [String]
HostingInstanceRemoveMatch = Struct.new(
  :id,
  keyword_init: true
)

# HostingVhost entity data model.
#
# @!attribute [rw] application
#   @return [Hash]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] deployment
#   @return [Hash]
#
# @!attribute [rw] fqdn
#   @return [String]
#
# @!attribute [rw] https_strategy
#   @return [String, nil]
#
# @!attribute [rw] is_a_test_vhost
#   @return [Boolean]
#
# @!attribute [rw] linked_dns_zone
#   @return [Hash]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] tls_validated_at
#   @return [String, nil]
HostingVhost = Struct.new(
  :application,
  :created_at,
  :deployment,
  :fqdn,
  :https_strategy,
  :is_a_test_vhost,
  :linked_dns_zone,
  :status,
  :tls_validated_at,
  keyword_init: true
)

# Request payload for HostingVhost#load.
#
# @!attribute [rw] fqdn
#   @return [String]
#
# @!attribute [rw] instance_id
#   @return [String]
HostingVhostLoadMatch = Struct.new(
  :fqdn,
  :instance_id,
  keyword_init: true
)

# Request payload for HostingVhost#list.
#
# @!attribute [rw] instance_id
#   @return [String]
#
# @!attribute [rw] fqdn
#   @return [String, nil]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] per_page
#   @return [Integer, nil]
#
# @!attribute [rw] sort_by
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
HostingVhostListMatch = Struct.new(
  :instance_id,
  :fqdn,
  :page,
  :per_page,
  :sort_by,
  :status,
  keyword_init: true
)

# Request payload for HostingVhost#create.
#
# @!attribute [rw] instance_id
#   @return [String]
#
# @!attribute [rw] application
#   @return [Hash]
#
# @!attribute [rw] fqdn
#   @return [String]
#
# @!attribute [rw] linked_dns_zone
#   @return [Hash]
HostingVhostCreateData = Struct.new(
  :instance_id,
  :application,
  :fqdn,
  :linked_dns_zone,
  keyword_init: true
)

# Request payload for HostingVhost#update.
#
# @!attribute [rw] fqdn
#   @return [String]
#
# @!attribute [rw] instance_id
#   @return [String]
#
# @!attribute [rw] application
#   @return [Hash, nil]
#
# @!attribute [rw] https_strategy
#   @return [String, nil]
#
# @!attribute [rw] linked_dns_zone
#   @return [Hash, nil]
HostingVhostUpdateData = Struct.new(
  :fqdn,
  :instance_id,
  :application,
  :https_strategy,
  :linked_dns_zone,
  keyword_init: true
)

# Request payload for HostingVhost#remove.
#
# @!attribute [rw] fqdn
#   @return [String]
#
# @!attribute [rw] instance_id
#   @return [String]
HostingVhostRemoveMatch = Struct.new(
  :fqdn,
  :instance_id,
  keyword_init: true
)

# IssuedCertificate entity data model.
#
# @!attribute [rw] altnames
#   @return [Array]
#
# @!attribute [rw] altnames_unicode
#   @return [Array]
#
# @!attribute [rw] apex_only
#   @return [Boolean, nil]
#
# @!attribute [rw] assumed_name
#   @return [String, nil]
#
# @!attribute [rw] business_category
#   @return [String, nil]
#
# @!attribute [rw] card_pay_trustlogo
#   @return [Boolean, nil]
#
# @!attribute [rw] cert
#   @return [String, nil]
#
# @!attribute [rw] cn
#   @return [String]
#
# @!attribute [rw] cn_unicode
#   @return [String]
#
# @!attribute [rw] contact
#   @return [Hash]
#
# @!attribute [rw] csr
#   @return [String, nil]
#
# @!attribute [rw] dates
#   @return [Hash]
#
# @!attribute [rw] dcv_method
#   @return [String, nil]
#
# @!attribute [rw] duration
#   @return [Integer, nil]
#
# @!attribute [rw] error_msg
#   @return [String, nil]
#
# @!attribute [rw] errors
#   @return [Array, nil]
#
# @!attribute [rw] href
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] ida
#   @return [Hash, nil]
#
# @!attribute [rw] intermediate
#   @return [String, nil]
#
# @!attribute [rw] joi
#   @return [Hash, nil]
#
# @!attribute [rw] middleman
#   @return [Hash, nil]
#
# @!attribute [rw] owner
#   @return [String, nil]
#
# @!attribute [rw] package
#   @return [Hash]
#
# @!attribute [rw] provider
#   @return [String]
#
# @!attribute [rw] reissuable
#   @return [Boolean, nil]
#
# @!attribute [rw] renewable
#   @return [Boolean, nil]
#
# @!attribute [rw] resellee_id
#   @return [String, nil]
#
# @!attribute [rw] sha_version
#   @return [Integer, nil]
#
# @!attribute [rw] sharing_id
#   @return [String, nil]
#
# @!attribute [rw] software
#   @return [Integer]
#
# @!attribute [rw] state
#   @return [String, nil]
#
# @!attribute [rw] state_detail
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] step_nb
#   @return [Integer, nil]
#
# @!attribute [rw] stored
#   @return [Boolean, nil]
#
# @!attribute [rw] tags
#   @return [Array, nil]
#
# @!attribute [rw] trustlogo
#   @return [Boolean, nil]
#
# @!attribute [rw] trustlogo_token
#   @return [Hash, nil]
IssuedCertificate = Struct.new(
  :altnames,
  :altnames_unicode,
  :apex_only,
  :assumed_name,
  :business_category,
  :card_pay_trustlogo,
  :cert,
  :cn,
  :cn_unicode,
  :contact,
  :csr,
  :dates,
  :dcv_method,
  :duration,
  :error_msg,
  :errors,
  :href,
  :id,
  :ida,
  :intermediate,
  :joi,
  :middleman,
  :owner,
  :package,
  :provider,
  :reissuable,
  :renewable,
  :resellee_id,
  :sha_version,
  :sharing_id,
  :software,
  :state,
  :state_detail,
  :status,
  :step_nb,
  :stored,
  :tags,
  :trustlogo,
  :trustlogo_token,
  keyword_init: true
)

# Request payload for IssuedCertificate#load.
#
# @!attribute [rw] id
#   @return [String]
IssuedCertificateLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for IssuedCertificate#list.
#
# @!attribute [rw] cn
#   @return [String, nil]
#
# @!attribute [rw] cn_eq
#   @return [String, nil]
#
# @!attribute [rw] covered_cn
#   @return [String, nil]
#
# @!attribute [rw] package
#   @return [String, nil]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] per_page
#   @return [Integer, nil]
#
# @!attribute [rw] sharing_id
#   @return [String, nil]
#
# @!attribute [rw] sort_by
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
IssuedCertificateListMatch = Struct.new(
  :cn,
  :cn_eq,
  :covered_cn,
  :package,
  :page,
  :per_page,
  :sharing_id,
  :sort_by,
  :status,
  keyword_init: true
)

# Request payload for IssuedCertificate#create.
#
# @!attribute [rw] sharing_id
#   @return [String, nil]
#
# @!attribute [rw] altnames
#   @return [Array, nil]
#
# @!attribute [rw] apex_only
#   @return [Boolean, nil]
#
# @!attribute [rw] cn
#   @return [String, nil]
#
# @!attribute [rw] csr
#   @return [String, nil]
#
# @!attribute [rw] dcv_method
#   @return [String, nil]
#
# @!attribute [rw] duration
#   @return [Integer, nil]
#
# @!attribute [rw] package
#   @return [Hash]
#
# @!attribute [rw] resellee_id
#   @return [String, nil]
IssuedCertificateCreateData = Struct.new(
  :sharing_id,
  :altnames,
  :apex_only,
  :cn,
  :csr,
  :dcv_method,
  :duration,
  :package,
  :resellee_id,
  keyword_init: true
)

# Request payload for IssuedCertificate#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] sharing_id
#   @return [String, nil]
#
# @!attribute [rw] altnames
#   @return [Array, nil]
#
# @!attribute [rw] csr
#   @return [String, nil]
#
# @!attribute [rw] dcv_method
#   @return [String, nil]
IssuedCertificateUpdateData = Struct.new(
  :id,
  :sharing_id,
  :altnames,
  :csr,
  :dcv_method,
  keyword_init: true
)

# Request payload for IssuedCertificate#remove.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] sharing_id
#   @return [String, nil]
IssuedCertificateRemoveMatch = Struct.new(
  :id,
  :sharing_id,
  keyword_init: true
)

# LinkedZone entity data model.
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] default_records
#   @return [Boolean]
#
# @!attribute [rw] domain_count
#   @return [Integer]
#
# @!attribute [rw] domains
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] message
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] record_list
#   @return [Array, nil]
#
# @!attribute [rw] record_text
#   @return [String, nil]
#
# @!attribute [rw] records
#   @return [Array, nil]
#
# @!attribute [rw] sharing_space
#   @return [Hash]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] updated_at
#   @return [String, nil]
LinkedZone = Struct.new(
  :created_at,
  :default_records,
  :domain_count,
  :domains,
  :id,
  :message,
  :name,
  :record_list,
  :record_text,
  :records,
  :sharing_space,
  :status,
  :updated_at,
  keyword_init: true
)

# Request payload for LinkedZone#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] sharing_id
#   @return [String, nil]
LinkedZoneLoadMatch = Struct.new(
  :id,
  :sharing_id,
  keyword_init: true
)

# Request payload for LinkedZone#list.
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] per_page
#   @return [Integer, nil]
#
# @!attribute [rw] sharing_id
#   @return [String, nil]
LinkedZoneListMatch = Struct.new(
  :page,
  :per_page,
  :sharing_id,
  keyword_init: true
)

# Request payload for LinkedZone#create.
#
# @!attribute [rw] default_records
#   @return [Boolean, nil]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] record_list
#   @return [Array, nil]
#
# @!attribute [rw] record_text
#   @return [String, nil]
LinkedZoneCreateData = Struct.new(
  :default_records,
  :name,
  :record_list,
  :record_text,
  keyword_init: true
)

# Request payload for LinkedZone#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] default_records
#   @return [Boolean, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] record_list
#   @return [Array, nil]
#
# @!attribute [rw] record_text
#   @return [String, nil]
LinkedZoneUpdateData = Struct.new(
  :id,
  :default_records,
  :name,
  :record_list,
  :record_text,
  keyword_init: true
)

# Request payload for LinkedZone#remove.
#
# @!attribute [rw] id
#   @return [String]
LinkedZoneRemoveMatch = Struct.new(
  :id,
  keyword_init: true
)

# LinkedZoneDeployment entity data model.
#
# @!attribute [rw] deploy
#   @return [Boolean]
#
# @!attribute [rw] message
#   @return [String]
LinkedZoneDeployment = Struct.new(
  :deploy,
  :message,
  keyword_init: true
)

# Request payload for LinkedZoneDeployment#create.
#
# @!attribute [rw] zone_id
#   @return [String]
#
# @!attribute [rw] deploy
#   @return [Boolean]
LinkedZoneDeploymentCreateData = Struct.new(
  :zone_id,
  :deploy,
  keyword_init: true
)

# LinkedZoneDomain entity data model.
#
# @!attribute [rw] deployed
#   @return [Boolean]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] owner
#   @return [String]
#
# @!attribute [rw] zone
#   @return [Hash]
LinkedZoneDomain = Struct.new(
  :deployed,
  :id,
  :name,
  :owner,
  :zone,
  keyword_init: true
)

# Request payload for LinkedZoneDomain#load.
#
# @!attribute [rw] name
#   @return [String]
LinkedZoneDomainLoadMatch = Struct.new(
  :name,
  keyword_init: true
)

# Request payload for LinkedZoneDomain#list.
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] per_page
#   @return [Integer, nil]
#
# @!attribute [rw] sharing_id
#   @return [String, nil]
#
# @!attribute [rw] zone_id
#   @return [String, nil]
LinkedZoneDomainListMatch = Struct.new(
  :name,
  :page,
  :per_page,
  :sharing_id,
  :zone_id,
  keyword_init: true
)

# Request payload for LinkedZoneDomain#update.
#
# @!attribute [rw] domains
#   @return [Object, nil]
LinkedZoneDomainUpdateData = Struct.new(
  :domains,
  keyword_init: true
)

# LinkedZoneTask entity data model.
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] ending_at
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] result
#   @return [Hash]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] type
#   @return [String]
#
# @!attribute [rw] updated_at
#   @return [String, nil]
#
# @!attribute [rw] zone_id
#   @return [String]
LinkedZoneTask = Struct.new(
  :created_at,
  :ending_at,
  :id,
  :result,
  :status,
  :type,
  :updated_at,
  :zone_id,
  keyword_init: true
)

# Request payload for LinkedZoneTask#load.
#
# @!attribute [rw] id
#   @return [String]
LinkedZoneTaskLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for LinkedZoneTask#list.
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] per_page
#   @return [Integer, nil]
LinkedZoneTaskListMatch = Struct.new(
  :page,
  :per_page,
  keyword_init: true
)

# LivednsAxfrSlave entity data model.
#
# @!attribute [rw] message
#   @return [String]
LivednsAxfrSlave = Struct.new(
  :message,
  keyword_init: true
)

# Request payload for LivednsAxfrSlave#list.
#
# @!attribute [rw] fqdn
#   @return [String]
LivednsAxfrSlaveListMatch = Struct.new(
  :fqdn,
  keyword_init: true
)

# Request payload for LivednsAxfrSlave#update.
#
# @!attribute [rw] fqdn
#   @return [String]
#
# @!attribute [rw] ip
#   @return [String]
#
# @!attribute [rw] message
#   @return [String, nil]
LivednsAxfrSlaveUpdateData = Struct.new(
  :fqdn,
  :ip,
  :message,
  keyword_init: true
)

# Request payload for LivednsAxfrSlave#remove.
#
# @!attribute [rw] fqdn
#   @return [String]
#
# @!attribute [rw] ip
#   @return [String]
LivednsAxfrSlaveRemoveMatch = Struct.new(
  :fqdn,
  :ip,
  keyword_init: true
)

# LivednsAxfrTsig entity data model.
#
# @!attribute [rw] href
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] key_name
#   @return [String]
#
# @!attribute [rw] message
#   @return [String]
LivednsAxfrTsig = Struct.new(
  :href,
  :id,
  :key_name,
  :message,
  keyword_init: true
)

# Request payload for LivednsAxfrTsig#list.
#
# @!attribute [rw] fqdn
#   @return [String]
LivednsAxfrTsigListMatch = Struct.new(
  :fqdn,
  keyword_init: true
)

# Request payload for LivednsAxfrTsig#update.
#
# @!attribute [rw] fqdn
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] sharing_id
#   @return [String, nil]
#
# @!attribute [rw] href
#   @return [String, nil]
#
# @!attribute [rw] key_name
#   @return [String, nil]
#
# @!attribute [rw] message
#   @return [String, nil]
LivednsAxfrTsigUpdateData = Struct.new(
  :fqdn,
  :id,
  :sharing_id,
  :href,
  :key_name,
  :message,
  keyword_init: true
)

# Request payload for LivednsAxfrTsig#remove.
#
# @!attribute [rw] fqdn
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] sharing_id
#   @return [String, nil]
LivednsAxfrTsigRemoveMatch = Struct.new(
  :fqdn,
  :id,
  :sharing_id,
  keyword_init: true
)

# LivednsDomain entity data model.
#
# @!attribute [rw] automatic_snapshots
#   @return [Boolean]
#
# @!attribute [rw] domain_href
#   @return [String]
#
# @!attribute [rw] domain_keys_href
#   @return [String]
#
# @!attribute [rw] domain_records_href
#   @return [String]
#
# @!attribute [rw] fqdn
#   @return [String]
#
# @!attribute [rw] message
#   @return [String]
#
# @!attribute [rw] zone
#   @return [Hash, nil]
LivednsDomain = Struct.new(
  :automatic_snapshots,
  :domain_href,
  :domain_keys_href,
  :domain_records_href,
  :fqdn,
  :message,
  :zone,
  keyword_init: true
)

# Request payload for LivednsDomain#load.
#
# @!attribute [rw] fqdn
#   @return [String]
LivednsDomainLoadMatch = Struct.new(
  :fqdn,
  keyword_init: true
)

# Request payload for LivednsDomain#list.
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] per_page
#   @return [Integer, nil]
#
# @!attribute [rw] sharing_id
#   @return [String, nil]
LivednsDomainListMatch = Struct.new(
  :page,
  :per_page,
  :sharing_id,
  keyword_init: true
)

# Request payload for LivednsDomain#create.
#
# @!attribute [rw] sharing_id
#   @return [String, nil]
#
# @!attribute [rw] fqdn
#   @return [String]
#
# @!attribute [rw] zone
#   @return [Hash, nil]
LivednsDomainCreateData = Struct.new(
  :sharing_id,
  :fqdn,
  :zone,
  keyword_init: true
)

# Request payload for LivednsDomain#update.
#
# @!attribute [rw] fqdn
#   @return [String]
#
# @!attribute [rw] automatic_snapshots
#   @return [Boolean, nil]
LivednsDomainUpdateData = Struct.new(
  :fqdn,
  :automatic_snapshots,
  keyword_init: true
)

# Request payload for LivednsDomain#remove.
#
# @!attribute [rw] fqdn
#   @return [String]
LivednsDomainRemoveMatch = Struct.new(
  :fqdn,
  keyword_init: true
)

# LivednsKey entity data model.
#
# @!attribute [rw] algorithm
#   @return [Integer]
#
# @!attribute [rw] algorithm_name
#   @return [String]
#
# @!attribute [rw] deleted
#   @return [Boolean]
#
# @!attribute [rw] ds
#   @return [String]
#
# @!attribute [rw] fingerprint
#   @return [String]
#
# @!attribute [rw] flags
#   @return [Integer]
#
# @!attribute [rw] fqdn
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] key_href
#   @return [String]
#
# @!attribute [rw] message
#   @return [String]
#
# @!attribute [rw] public_key
#   @return [String]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] tag
#   @return [Integer]
LivednsKey = Struct.new(
  :algorithm,
  :algorithm_name,
  :deleted,
  :ds,
  :fingerprint,
  :flags,
  :fqdn,
  :id,
  :key_href,
  :message,
  :public_key,
  :status,
  :tag,
  keyword_init: true
)

# Request payload for LivednsKey#load.
#
# @!attribute [rw] fqdn
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
LivednsKeyLoadMatch = Struct.new(
  :fqdn,
  :id,
  keyword_init: true
)

# Request payload for LivednsKey#list.
#
# @!attribute [rw] fqdn
#   @return [String]
LivednsKeyListMatch = Struct.new(
  :fqdn,
  keyword_init: true
)

# Request payload for LivednsKey#create.
#
# @!attribute [rw] fqdn
#   @return [String]
#
# @!attribute [rw] flags
#   @return [Integer]
LivednsKeyCreateData = Struct.new(
  :fqdn,
  :flags,
  keyword_init: true
)

# Request payload for LivednsKey#update.
#
# @!attribute [rw] fqdn
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] deleted
#   @return [Boolean, nil]
LivednsKeyUpdateData = Struct.new(
  :fqdn,
  :id,
  :deleted,
  keyword_init: true
)

# Request payload for LivednsKey#remove.
#
# @!attribute [rw] fqdn
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
LivednsKeyRemoveMatch = Struct.new(
  :fqdn,
  :id,
  keyword_init: true
)

# LivednsNameserver entity data model.
class LivednsNameserver
end

# Request payload for LivednsNameserver#list.
#
# @!attribute [rw] fqdn
#   @return [String]
LivednsNameserverListMatch = Struct.new(
  :fqdn,
  keyword_init: true
)

# LivednsRecord entity data model.
#
# @!attribute [rw] add_rrset_values
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] message
#   @return [String]
#
# @!attribute [rw] remove_rrset_values
#   @return [Array, nil]
#
# @!attribute [rw] rrset_href
#   @return [String]
#
# @!attribute [rw] rrset_name
#   @return [String]
#
# @!attribute [rw] rrset_ttl
#   @return [Integer, nil]
#
# @!attribute [rw] rrset_type
#   @return [String]
#
# @!attribute [rw] rrset_values
#   @return [Array]
LivednsRecord = Struct.new(
  :add_rrset_values,
  :id,
  :message,
  :remove_rrset_values,
  :rrset_href,
  :rrset_name,
  :rrset_ttl,
  :rrset_type,
  :rrset_values,
  keyword_init: true
)

# Request payload for LivednsRecord#load.
#
# @!attribute [rw] fqdn
#   @return [String]
#
# @!attribute [rw] rrset_name
#   @return [String]
#
# @!attribute [rw] rrset_type
#   @return [String]
LivednsRecordLoadMatch = Struct.new(
  :fqdn,
  :rrset_name,
  :rrset_type,
  keyword_init: true
)

# Request payload for LivednsRecord#list.
#
# @!attribute [rw] fqdn
#   @return [String]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] per_page
#   @return [Integer, nil]
#
# @!attribute [rw] rrset_type
#   @return [String, nil]
#
# @!attribute [rw] sort_by
#   @return [String, nil]
LivednsRecordListMatch = Struct.new(
  :fqdn,
  :page,
  :per_page,
  :rrset_type,
  :sort_by,
  keyword_init: true
)

# Request payload for LivednsRecord#create.
#
# @!attribute [rw] fqdn
#   @return [String]
#
# @!attribute [rw] rrset_name
#   @return [String, nil]
#
# @!attribute [rw] rrset_type
#   @return [String, nil]
#
# @!attribute [rw] rrset_ttl
#   @return [Integer, nil]
#
# @!attribute [rw] rrset_values
#   @return [Array]
LivednsRecordCreateData = Struct.new(
  :fqdn,
  :rrset_name,
  :rrset_type,
  :rrset_ttl,
  :rrset_values,
  keyword_init: true
)

# Request payload for LivednsRecord#update.
#
# @!attribute [rw] fqdn
#   @return [String]
#
# @!attribute [rw] rrset_name
#   @return [String]
#
# @!attribute [rw] rrset_type
#   @return [String]
#
# @!attribute [rw] rrset_ttl
#   @return [Integer, nil]
#
# @!attribute [rw] rrset_values
#   @return [Array, nil]
LivednsRecordUpdateData = Struct.new(
  :fqdn,
  :rrset_name,
  :rrset_type,
  :rrset_ttl,
  :rrset_values,
  keyword_init: true
)

# Request payload for LivednsRecord#patch.
#
# @!attribute [rw] fqdn
#   @return [String]
#
# @!attribute [rw] rrset_name
#   @return [String]
#
# @!attribute [rw] rrset_type
#   @return [String]
#
# @!attribute [rw] add_rrset_values
#   @return [Array, nil]
#
# @!attribute [rw] remove_rrset_values
#   @return [Array, nil]
#
# @!attribute [rw] rrset_ttl
#   @return [Integer, nil]
LivednsRecordPatchData = Struct.new(
  :fqdn,
  :rrset_name,
  :rrset_type,
  :add_rrset_values,
  :remove_rrset_values,
  :rrset_ttl,
  keyword_init: true
)

# Request payload for LivednsRecord#remove.
#
# @!attribute [rw] fqdn
#   @return [String]
#
# @!attribute [rw] rrset_name
#   @return [String]
#
# @!attribute [rw] rrset_type
#   @return [String]
LivednsRecordRemoveMatch = Struct.new(
  :fqdn,
  :rrset_name,
  :rrset_type,
  keyword_init: true
)

# LivednsRrtype entity data model.
class LivednsRrtype
end

# Request payload for LivednsRrtype#list.
class LivednsRrtypeListMatch
end

# LivednsSnapshot entity data model.
#
# @!attribute [rw] automatic
#   @return [Boolean]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] href
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] message
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] zone_data
#   @return [Array]
LivednsSnapshot = Struct.new(
  :automatic,
  :created_at,
  :href,
  :id,
  :message,
  :name,
  :zone_data,
  keyword_init: true
)

# Request payload for LivednsSnapshot#load.
#
# @!attribute [rw] fqdn
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
LivednsSnapshotLoadMatch = Struct.new(
  :fqdn,
  :id,
  keyword_init: true
)

# Request payload for LivednsSnapshot#list.
#
# @!attribute [rw] fqdn
#   @return [String]
#
# @!attribute [rw] automatic
#   @return [Boolean, nil]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] per_page
#   @return [Integer, nil]
#
# @!attribute [rw] sort_by
#   @return [String, nil]
LivednsSnapshotListMatch = Struct.new(
  :fqdn,
  :automatic,
  :page,
  :per_page,
  :sort_by,
  keyword_init: true
)

# Request payload for LivednsSnapshot#create.
#
# @!attribute [rw] fqdn
#   @return [String]
#
# @!attribute [rw] name
#   @return [String, nil]
LivednsSnapshotCreateData = Struct.new(
  :fqdn,
  :name,
  keyword_init: true
)

# Request payload for LivednsSnapshot#update.
#
# @!attribute [rw] fqdn
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] name
#   @return [String, nil]
LivednsSnapshotUpdateData = Struct.new(
  :fqdn,
  :id,
  :name,
  keyword_init: true
)

# Request payload for LivednsSnapshot#remove.
#
# @!attribute [rw] fqdn
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
LivednsSnapshotRemoveMatch = Struct.new(
  :fqdn,
  :id,
  keyword_init: true
)

# LivednsTsigKey entity data model.
#
# @!attribute [rw] config_samples
#   @return [Hash]
#
# @!attribute [rw] href
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] key_name
#   @return [String]
#
# @!attribute [rw] secret
#   @return [String]
LivednsTsigKey = Struct.new(
  :config_samples,
  :href,
  :id,
  :key_name,
  :secret,
  keyword_init: true
)

# Request payload for LivednsTsigKey#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] sharing_id
#   @return [String, nil]
LivednsTsigKeyLoadMatch = Struct.new(
  :id,
  :sharing_id,
  keyword_init: true
)

# Request payload for LivednsTsigKey#list.
#
# @!attribute [rw] sharing_id
#   @return [String, nil]
LivednsTsigKeyListMatch = Struct.new(
  :sharing_id,
  keyword_init: true
)

# Request payload for LivednsTsigKey#create.
#
# @!attribute [rw] sharing_id
#   @return [String, nil]
#
# @!attribute [rw] config_samples
#   @return [Hash]
#
# @!attribute [rw] href
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] key_name
#   @return [String]
#
# @!attribute [rw] secret
#   @return [String]
LivednsTsigKeyCreateData = Struct.new(
  :sharing_id,
  :config_samples,
  :href,
  :id,
  :key_name,
  :secret,
  keyword_init: true
)

# Mailbox entity data model.
#
# @!attribute [rw] address
#   @return [String]
#
# @!attribute [rw] aliases
#   @return [Array, nil]
#
# @!attribute [rw] antispam
#   @return [Boolean]
#
# @!attribute [rw] autorenew
#   @return [Hash]
#
# @!attribute [rw] config
#   @return [Hash]
#
# @!attribute [rw] config_name
#   @return [String]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] data_access
#   @return [Boolean]
#
# @!attribute [rw] domain_part
#   @return [String]
#
# @!attribute [rw] duration_month
#   @return [Integer, nil]
#
# @!attribute [rw] email
#   @return [String]
#
# @!attribute [rw] expires_at
#   @return [String]
#
# @!attribute [rw] internal_domain
#   @return [Boolean]
#
# @!attribute [rw] issues
#   @return [Array, nil]
#
# @!attribute [rw] last_paid_duration
#   @return [Integer]
#
# @!attribute [rw] local_part
#   @return [String]
#
# @!attribute [rw] message
#   @return [String]
#
# @!attribute [rw] owner
#   @return [Hash]
#
# @!attribute [rw] password
#   @return [String]
#
# @!attribute [rw] quota
#   @return [Integer]
#
# @!attribute [rw] quota_used
#   @return [Integer]
#
# @!attribute [rw] responder
#   @return [Hash]
#
# @!attribute [rw] updated_at
#   @return [String]
#
# @!attribute [rw] uuid
#   @return [String]
Mailbox = Struct.new(
  :address,
  :aliases,
  :antispam,
  :autorenew,
  :config,
  :config_name,
  :created_at,
  :data_access,
  :domain_part,
  :duration_month,
  :email,
  :expires_at,
  :internal_domain,
  :issues,
  :last_paid_duration,
  :local_part,
  :message,
  :owner,
  :password,
  :quota,
  :quota_used,
  :responder,
  :updated_at,
  :uuid,
  keyword_init: true
)

# Request payload for Mailbox#load.
#
# @!attribute [rw] address
#   @return [String]
#
# @!attribute [rw] sharing_id
#   @return [String, nil]
MailboxLoadMatch = Struct.new(
  :address,
  :sharing_id,
  keyword_init: true
)

# Request payload for Mailbox#list.
#
# @!attribute [rw] address
#   @return [String, nil]
#
# @!attribute [rw] domain_part
#   @return [String, nil]
#
# @!attribute [rw] local_part
#   @return [String, nil]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] per_page
#   @return [Integer, nil]
#
# @!attribute [rw] search
#   @return [String, nil]
#
# @!attribute [rw] sharing_id
#   @return [String, nil]
#
# @!attribute [rw] sort_by
#   @return [String, nil]
MailboxListMatch = Struct.new(
  :address,
  :domain_part,
  :local_part,
  :page,
  :per_page,
  :search,
  :sharing_id,
  :sort_by,
  keyword_init: true
)

# Request payload for Mailbox#create.
#
# @!attribute [rw] sharing_id
#   @return [String, nil]
#
# @!attribute [rw] aliases
#   @return [Array, nil]
#
# @!attribute [rw] config_name
#   @return [String]
#
# @!attribute [rw] duration_month
#   @return [Integer, nil]
#
# @!attribute [rw] email
#   @return [String]
#
# @!attribute [rw] password
#   @return [String]
MailboxCreateData = Struct.new(
  :sharing_id,
  :aliases,
  :config_name,
  :duration_month,
  :email,
  :password,
  keyword_init: true
)

# Request payload for Mailbox#update.
#
# @!attribute [rw] address
#   @return [String]
#
# @!attribute [rw] aliases
#   @return [Array, nil]
#
# @!attribute [rw] antispam
#   @return [Boolean, nil]
#
# @!attribute [rw] autorenew
#   @return [Hash, nil]
#
# @!attribute [rw] config_name
#   @return [String, nil]
#
# @!attribute [rw] password
#   @return [String, nil]
#
# @!attribute [rw] responder
#   @return [Hash, nil]
MailboxUpdateData = Struct.new(
  :address,
  :aliases,
  :antispam,
  :autorenew,
  :config_name,
  :password,
  :responder,
  keyword_init: true
)

# Request payload for Mailbox#remove.
#
# @!attribute [rw] address
#   @return [String]
#
# @!attribute [rw] sharing_id
#   @return [String, nil]
MailboxRemoveMatch = Struct.new(
  :address,
  :sharing_id,
  keyword_init: true
)

# MailboxDomain entity data model.
#
# @!attribute [rw] antispam
#   @return [Boolean]
#
# @!attribute [rw] configuration
#   @return [Array]
#
# @!attribute [rw] date_last_validation
#   @return [String, nil]
#
# @!attribute [rw] dkim
#   @return [Boolean]
#
# @!attribute [rw] fqdns
#   @return [Array]
#
# @!attribute [rw] internal
#   @return [Boolean]
#
# @!attribute [rw] is_livedns
#   @return [Boolean]
#
# @!attribute [rw] mx
#   @return [Boolean]
#
# @!attribute [rw] owner
#   @return [Hash]
#
# @!attribute [rw] spf
#   @return [Boolean]
#
# @!attribute [rw] txt
#   @return [Boolean]
MailboxDomain = Struct.new(
  :antispam,
  :configuration,
  :date_last_validation,
  :dkim,
  :fqdns,
  :internal,
  :is_livedns,
  :mx,
  :owner,
  :spf,
  :txt,
  keyword_init: true
)

# Request payload for MailboxDomain#load.
#
# @!attribute [rw] domain
#   @return [String]
MailboxDomainLoadMatch = Struct.new(
  :domain,
  keyword_init: true
)

# Request payload for MailboxDomain#list.
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] per_page
#   @return [Integer, nil]
MailboxDomainListMatch = Struct.new(
  :page,
  :per_page,
  keyword_init: true
)

# Request payload for MailboxDomain#create.
#
# @!attribute [rw] domain
#   @return [String]
#
# @!attribute [rw] records_to_validate
#   @return [Object, nil]
MailboxDomainCreateData = Struct.new(
  :domain,
  :records_to_validate,
  keyword_init: true
)

# MailboxForward entity data model.
#
# @!attribute [rw] destinations
#   @return [Array]
#
# @!attribute [rw] message
#   @return [String]
#
# @!attribute [rw] source
#   @return [String]
MailboxForward = Struct.new(
  :destinations,
  :message,
  :source,
  keyword_init: true
)

# Request payload for MailboxForward#list.
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] per_page
#   @return [Integer, nil]
#
# @!attribute [rw] search
#   @return [String, nil]
#
# @!attribute [rw] sharing_id
#   @return [String, nil]
#
# @!attribute [rw] sort_by
#   @return [String, nil]
MailboxForwardListMatch = Struct.new(
  :page,
  :per_page,
  :search,
  :sharing_id,
  :sort_by,
  keyword_init: true
)

# Request payload for MailboxForward#create.
#
# @!attribute [rw] destinations
#   @return [Array]
#
# @!attribute [rw] source
#   @return [String]
MailboxForwardCreateData = Struct.new(
  :destinations,
  :source,
  keyword_init: true
)

# Request payload for MailboxForward#update.
#
# @!attribute [rw] source
#   @return [String]
#
# @!attribute [rw] destinations
#   @return [Array, nil]
MailboxForwardUpdateData = Struct.new(
  :source,
  :destinations,
  keyword_init: true
)

# Request payload for MailboxForward#remove.
#
# @!attribute [rw] source
#   @return [String]
MailboxForwardRemoveMatch = Struct.new(
  :source,
  keyword_init: true
)

# MailboxProduct entity data model.
#
# @!attribute [rw] autorenew
#   @return [Boolean, nil]
#
# @!attribute [rw] config
#   @return [Array]
#
# @!attribute [rw] config_name
#   @return [String]
#
# @!attribute [rw] description
#   @return [String]
#
# @!attribute [rw] duration_month
#   @return [Integer]
#
# @!attribute [rw] label
#   @return [String]
#
# @!attribute [rw] message
#   @return [String]
#
# @!attribute [rw] prices
#   @return [Array]
#
# @!attribute [rw] quantity
#   @return [Integer]
#
# @!attribute [rw] taxes
#   @return [Array]
#
# @!attribute [rw] uuid
#   @return [String]
MailboxProduct = Struct.new(
  :autorenew,
  :config,
  :config_name,
  :description,
  :duration_month,
  :label,
  :message,
  :prices,
  :quantity,
  :taxes,
  :uuid,
  keyword_init: true
)

# Request payload for MailboxProduct#list.
#
# @!attribute [rw] sharing_id
#   @return [String, nil]
MailboxProductListMatch = Struct.new(
  :sharing_id,
  keyword_init: true
)

# Request payload for MailboxProduct#create.
#
# @!attribute [rw] sharing_id
#   @return [String, nil]
#
# @!attribute [rw] autorenew
#   @return [Boolean, nil]
#
# @!attribute [rw] config_name
#   @return [String]
#
# @!attribute [rw] duration_month
#   @return [Integer]
#
# @!attribute [rw] quantity
#   @return [Integer]
MailboxProductCreateData = Struct.new(
  :sharing_id,
  :autorenew,
  :config_name,
  :duration_month,
  :quantity,
  keyword_init: true
)

# MailboxQuota entity data model.
#
# @!attribute [rw] annually
#   @return [Hash]
#
# @!attribute [rw] config_name
#   @return [String]
#
# @!attribute [rw] label
#   @return [String]
#
# @!attribute [rw] monthly
#   @return [Hash]
#
# @!attribute [rw] quota
#   @return [String]
MailboxQuota = Struct.new(
  :annually,
  :config_name,
  :label,
  :monthly,
  :quota,
  keyword_init: true
)

# Request payload for MailboxQuota#list.
#
# @!attribute [rw] sharing_id
#   @return [String, nil]
MailboxQuotaListMatch = Struct.new(
  :sharing_id,
  keyword_init: true
)

# MailboxSlot entity data model.
#
# @!attribute [rw] autorenew
#   @return [Hash]
#
# @!attribute [rw] config
#   @return [Hash]
#
# @!attribute [rw] expires_at
#   @return [String, nil]
#
# @!attribute [rw] last_paid_duration
#   @return [Integer, nil]
#
# @!attribute [rw] refund_info
#   @return [Hash]
#
# @!attribute [rw] refundable
#   @return [Boolean]
#
# @!attribute [rw] uuid
#   @return [String]
#
# @!attribute [rw] webhosting_pack
#   @return [Boolean]
MailboxSlot = Struct.new(
  :autorenew,
  :config,
  :expires_at,
  :last_paid_duration,
  :refund_info,
  :refundable,
  :uuid,
  :webhosting_pack,
  keyword_init: true
)

# Request payload for MailboxSlot#load.
#
# @!attribute [rw] uuid
#   @return [String]
MailboxSlotLoadMatch = Struct.new(
  :uuid,
  keyword_init: true
)

# Request payload for MailboxSlot#list.
#
# @!attribute [rw] config_name
#   @return [String, nil]
#
# @!attribute [rw] expires_at_gte
#   @return [String, nil]
#
# @!attribute [rw] expires_at_lte
#   @return [String, nil]
#
# @!attribute [rw] last_paid_duration
#   @return [Integer, nil]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] per_page
#   @return [Integer, nil]
#
# @!attribute [rw] refundable
#   @return [String, nil]
#
# @!attribute [rw] sharing_id
#   @return [String, nil]
#
# @!attribute [rw] sort_by
#   @return [String, nil]
#
# @!attribute [rw] webhosting_pack
#   @return [Boolean, nil]
MailboxSlotListMatch = Struct.new(
  :config_name,
  :expires_at_gte,
  :expires_at_lte,
  :last_paid_duration,
  :page,
  :per_page,
  :refundable,
  :sharing_id,
  :sort_by,
  :webhosting_pack,
  keyword_init: true
)

# Organization entity data model.
#
# @!attribute [rw] city
#   @return [String]
#
# @!attribute [rw] corporate
#   @return [Boolean]
#
# @!attribute [rw] country
#   @return [String]
#
# @!attribute [rw] email
#   @return [String]
#
# @!attribute [rw] fax
#   @return [String, nil]
#
# @!attribute [rw] firstname
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] lang
#   @return [String, nil]
#
# @!attribute [rw] lastname
#   @return [String]
#
# @!attribute [rw] message
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] orgname
#   @return [String, nil]
#
# @!attribute [rw] phone
#   @return [String, nil]
#
# @!attribute [rw] reference
#   @return [String, nil]
#
# @!attribute [rw] reseller
#   @return [Boolean]
#
# @!attribute [rw] siren
#   @return [String, nil]
#
# @!attribute [rw] state
#   @return [String, nil]
#
# @!attribute [rw] streetaddr
#   @return [String]
#
# @!attribute [rw] streetaddr2
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String]
#
# @!attribute [rw] vat_number
#   @return [String, nil]
#
# @!attribute [rw] zip
#   @return [String]
Organization = Struct.new(
  :city,
  :corporate,
  :country,
  :email,
  :fax,
  :firstname,
  :id,
  :lang,
  :lastname,
  :message,
  :name,
  :orgname,
  :phone,
  :reference,
  :reseller,
  :siren,
  :state,
  :streetaddr,
  :streetaddr2,
  :type,
  :vat_number,
  :zip,
  keyword_init: true
)

# Request payload for Organization#load.
#
# @!attribute [rw] id
#   @return [String]
OrganizationLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Organization#list.
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] permission
#   @return [String, nil]
#
# @!attribute [rw] sort_by
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] ~name
#   @return [String, nil]
OrganizationListMatch = Struct.new(
  :name,
  :permission,
  :sort_by,
  :type,
  :"~name",
  keyword_init: true
)

# Request payload for Organization#create.
#
# @!attribute [rw] city
#   @return [String]
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] email
#   @return [String]
#
# @!attribute [rw] fax
#   @return [String, nil]
#
# @!attribute [rw] firstname
#   @return [String]
#
# @!attribute [rw] lang
#   @return [String, nil]
#
# @!attribute [rw] lastname
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] orgname
#   @return [String]
#
# @!attribute [rw] phone
#   @return [String]
#
# @!attribute [rw] reference
#   @return [String, nil]
#
# @!attribute [rw] reseller
#   @return [Boolean, nil]
#
# @!attribute [rw] siren
#   @return [String, nil]
#
# @!attribute [rw] state
#   @return [String, nil]
#
# @!attribute [rw] streetaddr
#   @return [String]
#
# @!attribute [rw] streetaddr2
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String]
#
# @!attribute [rw] vat_number
#   @return [String, nil]
#
# @!attribute [rw] zip
#   @return [String, nil]
OrganizationCreateData = Struct.new(
  :city,
  :country,
  :email,
  :fax,
  :firstname,
  :lang,
  :lastname,
  :name,
  :orgname,
  :phone,
  :reference,
  :reseller,
  :siren,
  :state,
  :streetaddr,
  :streetaddr2,
  :type,
  :vat_number,
  :zip,
  keyword_init: true
)

# Request payload for Organization#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] city
#   @return [String, nil]
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] email
#   @return [String, nil]
#
# @!attribute [rw] fax
#   @return [String, nil]
#
# @!attribute [rw] firstname
#   @return [String, nil]
#
# @!attribute [rw] lang
#   @return [String, nil]
#
# @!attribute [rw] lastname
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] phone
#   @return [String, nil]
#
# @!attribute [rw] reference
#   @return [String, nil]
#
# @!attribute [rw] reseller
#   @return [Boolean, nil]
#
# @!attribute [rw] siren
#   @return [String, nil]
#
# @!attribute [rw] state
#   @return [String, nil]
#
# @!attribute [rw] streetaddr
#   @return [String, nil]
#
# @!attribute [rw] streetaddr2
#   @return [String, nil]
#
# @!attribute [rw] vat_number
#   @return [String, nil]
#
# @!attribute [rw] zip
#   @return [String, nil]
OrganizationUpdateData = Struct.new(
  :id,
  :city,
  :country,
  :email,
  :fax,
  :firstname,
  :lang,
  :lastname,
  :name,
  :phone,
  :reference,
  :reseller,
  :siren,
  :state,
  :streetaddr,
  :streetaddr2,
  :vat_number,
  :zip,
  keyword_init: true
)

# Request payload for Organization#remove.
#
# @!attribute [rw] id
#   @return [String]
OrganizationRemoveMatch = Struct.new(
  :id,
  keyword_init: true
)

# OrganizationCustomer entity data model.
#
# @!attribute [rw] city
#   @return [String]
#
# @!attribute [rw] country
#   @return [String]
#
# @!attribute [rw] email
#   @return [String]
#
# @!attribute [rw] fax
#   @return [String, nil]
#
# @!attribute [rw] firstname
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] lang
#   @return [String, nil]
#
# @!attribute [rw] lastname
#   @return [String]
#
# @!attribute [rw] message
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] orgname
#   @return [String, nil]
#
# @!attribute [rw] phone
#   @return [String, nil]
#
# @!attribute [rw] reference
#   @return [String, nil]
#
# @!attribute [rw] siren
#   @return [String, nil]
#
# @!attribute [rw] state
#   @return [String, nil]
#
# @!attribute [rw] streetaddr
#   @return [String]
#
# @!attribute [rw] streetaddr2
#   @return [String, nil]
#
# @!attribute [rw] sync_contact_email
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String]
#
# @!attribute [rw] vat_number
#   @return [String, nil]
#
# @!attribute [rw] zip
#   @return [String, nil]
OrganizationCustomer = Struct.new(
  :city,
  :country,
  :email,
  :fax,
  :firstname,
  :id,
  :lang,
  :lastname,
  :message,
  :name,
  :orgname,
  :phone,
  :reference,
  :siren,
  :state,
  :streetaddr,
  :streetaddr2,
  :sync_contact_email,
  :type,
  :vat_number,
  :zip,
  keyword_init: true
)

# Request payload for OrganizationCustomer#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] org_id
#   @return [String]
OrganizationCustomerLoadMatch = Struct.new(
  :id,
  :org_id,
  keyword_init: true
)

# Request payload for OrganizationCustomer#list.
#
# @!attribute [rw] org_id
#   @return [String]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] per_page
#   @return [Integer, nil]
#
# @!attribute [rw] permission
#   @return [String, nil]
#
# @!attribute [rw] sort_by
#   @return [String, nil]
OrganizationCustomerListMatch = Struct.new(
  :org_id,
  :name,
  :page,
  :per_page,
  :permission,
  :sort_by,
  keyword_init: true
)

# Request payload for OrganizationCustomer#create.
#
# @!attribute [rw] org_id
#   @return [String]
#
# @!attribute [rw] city
#   @return [String]
#
# @!attribute [rw] country
#   @return [String]
#
# @!attribute [rw] email
#   @return [String]
#
# @!attribute [rw] fax
#   @return [String, nil]
#
# @!attribute [rw] firstname
#   @return [String]
#
# @!attribute [rw] lastname
#   @return [String]
#
# @!attribute [rw] orgname
#   @return [String, nil]
#
# @!attribute [rw] phone
#   @return [String]
#
# @!attribute [rw] reference
#   @return [String, nil]
#
# @!attribute [rw] state
#   @return [String, nil]
#
# @!attribute [rw] streetaddr
#   @return [String]
#
# @!attribute [rw] streetaddr2
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String]
#
# @!attribute [rw] zip
#   @return [String, nil]
OrganizationCustomerCreateData = Struct.new(
  :org_id,
  :city,
  :country,
  :email,
  :fax,
  :firstname,
  :lastname,
  :orgname,
  :phone,
  :reference,
  :state,
  :streetaddr,
  :streetaddr2,
  :type,
  :zip,
  keyword_init: true
)

# Request payload for OrganizationCustomer#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] org_id
#   @return [String]
#
# @!attribute [rw] city
#   @return [String, nil]
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] email
#   @return [String, nil]
#
# @!attribute [rw] fax
#   @return [String, nil]
#
# @!attribute [rw] firstname
#   @return [String, nil]
#
# @!attribute [rw] lang
#   @return [String, nil]
#
# @!attribute [rw] lastname
#   @return [String, nil]
#
# @!attribute [rw] phone
#   @return [String, nil]
#
# @!attribute [rw] reference
#   @return [String, nil]
#
# @!attribute [rw] siren
#   @return [String, nil]
#
# @!attribute [rw] state
#   @return [String, nil]
#
# @!attribute [rw] streetaddr
#   @return [String, nil]
#
# @!attribute [rw] streetaddr2
#   @return [String, nil]
#
# @!attribute [rw] sync_contact_email
#   @return [String, nil]
#
# @!attribute [rw] vat_number
#   @return [String, nil]
#
# @!attribute [rw] zip
#   @return [String, nil]
OrganizationCustomerUpdateData = Struct.new(
  :id,
  :org_id,
  :city,
  :country,
  :email,
  :fax,
  :firstname,
  :lang,
  :lastname,
  :phone,
  :reference,
  :siren,
  :state,
  :streetaddr,
  :streetaddr2,
  :sync_contact_email,
  :vat_number,
  :zip,
  keyword_init: true
)

# Request payload for OrganizationCustomer#remove.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] org_id
#   @return [String]
OrganizationCustomerRemoveMatch = Struct.new(
  :id,
  :org_id,
  keyword_init: true
)

# Template entity data model.
#
# @!attribute [rw] description
#   @return [String]
#
# @!attribute [rw] editable
#   @return [Boolean]
#
# @!attribute [rw] href
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] namespaces
#   @return [Array]
#
# @!attribute [rw] orgname
#   @return [String]
#
# @!attribute [rw] payload
#   @return [Hash]
#
# @!attribute [rw] sharing_space
#   @return [Hash]
#
# @!attribute [rw] variables
#   @return [Array]
Template = Struct.new(
  :description,
  :editable,
  :href,
  :id,
  :name,
  :namespaces,
  :orgname,
  :payload,
  :sharing_space,
  :variables,
  keyword_init: true
)

# Request payload for Template#load.
#
# @!attribute [rw] id
#   @return [String]
TemplateLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Template#list.
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] per_page
#   @return [Integer, nil]
TemplateListMatch = Struct.new(
  :page,
  :per_page,
  keyword_init: true
)

# Request payload for Template#create.
#
# @!attribute [rw] sharing_id
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] payload
#   @return [Hash]
TemplateCreateData = Struct.new(
  :sharing_id,
  :description,
  :name,
  :payload,
  keyword_init: true
)

# Request payload for Template#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] payload
#   @return [Hash, nil]
TemplateUpdateData = Struct.new(
  :id,
  :description,
  :name,
  :payload,
  keyword_init: true
)

# Request payload for Template#remove.
#
# @!attribute [rw] id
#   @return [String]
TemplateRemoveMatch = Struct.new(
  :id,
  keyword_init: true
)

# TemplateDispatch entity data model.
#
# @!attribute [rw] attempt
#   @return [Integer]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] dispatch_href
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] message
#   @return [String]
#
# @!attribute [rw] object_id
#   @return [String]
#
# @!attribute [rw] object_type
#   @return [String]
#
# @!attribute [rw] payload
#   @return [Hash]
#
# @!attribute [rw] sharing_id
#   @return [String]
#
# @!attribute [rw] state
#   @return [Integer]
#
# @!attribute [rw] state_msg
#   @return [String, nil]
#
# @!attribute [rw] target
#   @return [Hash]
#
# @!attribute [rw] target_id
#   @return [String]
#
# @!attribute [rw] target_type
#   @return [String]
#
# @!attribute [rw] task_history
#   @return [Array]
#
# @!attribute [rw] task_status
#   @return [Hash]
#
# @!attribute [rw] task_updated_at
#   @return [String, nil]
#
# @!attribute [rw] template_id
#   @return [String, nil]
#
# @!attribute [rw] template_name
#   @return [String, nil]
TemplateDispatch = Struct.new(
  :attempt,
  :created_at,
  :dispatch_href,
  :id,
  :message,
  :object_id,
  :object_type,
  :payload,
  :sharing_id,
  :state,
  :state_msg,
  :target,
  :target_id,
  :target_type,
  :task_history,
  :task_status,
  :task_updated_at,
  :template_id,
  :template_name,
  keyword_init: true
)

# Request payload for TemplateDispatch#load.
#
# @!attribute [rw] id
#   @return [String]
TemplateDispatchLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for TemplateDispatch#create.
#
# @!attribute [rw] template_id
#   @return [String]
#
# @!attribute [rw] object_id
#   @return [String]
#
# @!attribute [rw] object_type
#   @return [String]
TemplateDispatchCreateData = Struct.new(
  :template_id,
  :object_id,
  :object_type,
  keyword_init: true
)

# Tld entity data model.
#
# @!attribute [rw] authinfo_for_transfer
#   @return [Boolean]
#
# @!attribute [rw] category
#   @return [String]
#
# @!attribute [rw] change_owner
#   @return [Boolean]
#
# @!attribute [rw] corporate
#   @return [Boolean]
#
# @!attribute [rw] ext_trade
#   @return [Boolean]
#
# @!attribute [rw] full_tld
#   @return [String]
#
# @!attribute [rw] href
#   @return [String]
#
# @!attribute [rw] lock
#   @return [Boolean]
#
# @!attribute [rw] name
#   @return [String]
Tld = Struct.new(
  :authinfo_for_transfer,
  :category,
  :change_owner,
  :corporate,
  :ext_trade,
  :full_tld,
  :href,
  :lock,
  :name,
  keyword_init: true
)

# Request payload for Tld#load.
#
# @!attribute [rw] name
#   @return [String]
TldLoadMatch = Struct.new(
  :name,
  keyword_init: true
)

# Request payload for Tld#list.
#
# @!attribute [rw] category
#   @return [String, nil]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] per_page
#   @return [Integer, nil]
TldListMatch = Struct.new(
  :category,
  :page,
  :per_page,
  keyword_init: true
)

# User entity data model.
#
# @!attribute [rw] city
#   @return [String]
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] email
#   @return [String]
#
# @!attribute [rw] fax
#   @return [String, nil]
#
# @!attribute [rw] firstname
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] lang
#   @return [String]
#
# @!attribute [rw] lastname
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] phone
#   @return [String, nil]
#
# @!attribute [rw] state
#   @return [String, nil]
#
# @!attribute [rw] streetaddr
#   @return [String, nil]
#
# @!attribute [rw] streetaddr2
#   @return [String, nil]
#
# @!attribute [rw] username
#   @return [String]
#
# @!attribute [rw] zip
#   @return [String, nil]
User = Struct.new(
  :city,
  :country,
  :email,
  :fax,
  :firstname,
  :id,
  :lang,
  :lastname,
  :name,
  :phone,
  :state,
  :streetaddr,
  :streetaddr2,
  :username,
  :zip,
  keyword_init: true
)

# Request payload for User#load.
#
# @!attribute [rw] city
#   @return [String, nil]
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] email
#   @return [String, nil]
#
# @!attribute [rw] fax
#   @return [String, nil]
#
# @!attribute [rw] firstname
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] lang
#   @return [String, nil]
#
# @!attribute [rw] lastname
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] phone
#   @return [String, nil]
#
# @!attribute [rw] state
#   @return [String, nil]
#
# @!attribute [rw] streetaddr
#   @return [String, nil]
#
# @!attribute [rw] streetaddr2
#   @return [String, nil]
#
# @!attribute [rw] username
#   @return [String, nil]
#
# @!attribute [rw] zip
#   @return [String, nil]
UserLoadMatch = Struct.new(
  :city,
  :country,
  :email,
  :fax,
  :firstname,
  :id,
  :lang,
  :lastname,
  :name,
  :phone,
  :state,
  :streetaddr,
  :streetaddr2,
  :username,
  :zip,
  keyword_init: true
)

