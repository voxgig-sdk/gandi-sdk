<?php
declare(strict_types=1);

// Typed models for the Gandi SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** AccessToken entity data model. */
class AccessToken
{
    public string $access_token;
    public array $entities;
    public string $expires_at;
    public string $id;
    public string $name;
    public array $scopes;
}

/** Request payload for AccessToken#create. */
class AccessTokenCreateData
{
    public ?string $expires_at = null;
    public ?string $name = null;
}

/** AcmeAccount entity data model. */
class AcmeAccount
{
    public string $created_at;
    public string $deleted_at;
    public string $external_id;
    public string $id;
    public string $ip;
    public string $last_activity;
    public string $status;
    public string $subscription_id;
}

/** Request payload for AcmeAccount#load. */
class AcmeAccountLoadMatch
{
    public string $id;
    public string $subscription_id;
    public string $sharing_id;
}

/** Request payload for AcmeAccount#list. */
class AcmeAccountListMatch
{
    public string $subscription_id;
    public string $sharing_id;
}

/** AcmeDomain entity data model. */
class AcmeDomain
{
    public string $created_at;
    public string $deleted_at;
    public string $hostname;
    public string $hostname_ulabel;
    public bool $is_wildcard;
    public string $status;
    public string $subscription_id;
}

/** Request payload for AcmeDomain#load. */
class AcmeDomainLoadMatch
{
    public int $domain_id;
    public string $subscription_id;
    public string $sharing_id;
}

/** Request payload for AcmeDomain#list. */
class AcmeDomainListMatch
{
    public string $subscription_id;
    public string $domain;
    public string $sharing_id;
}

/** AcmePrice entity data model. */
class AcmePrice
{
    public string $country;
    public string $currency;
    public array $domains;
    public string $duration;
    public string $duration_unit;
    public string $grid;
    public int $max_duration;
    public int $min_duration;
    public string $price_after_taxes;
    public string $price_before_taxes;
    public string $process;
    public array $product;
    public string $provider;
    public string $tax_rate;
    public array $taxes;
    public string $validation_type;
}

/** Request payload for AcmePrice#list. */
class AcmePriceListMatch
{
    public string $country;
    public string $currency;
    public string $duration;
    public string $grid;
    public string $process;
    public string $provider;
    public string $sharing_id;
    public string $validation_type;
}

/** Request payload for AcmePrice#create. */
class AcmePriceCreateData
{
    public string $sharing_id;
    public string $country;
    public string $currency;
    public array $domains;
    public string $duration;
    public string $grid;
    public string $process;
    public string $provider;
    public string $validation_type;
}

/** AcmeSubscription entity data model. */
class AcmeSubscription
{
    public string $country;
    public string $created_at;
    public string $currency;
    public array $domains;
    public int $duration;
    public string $eab_hmac;
    public string $eab_id;
    public string $ends_at;
    public string $grid;
    public string $message;
    public string $name;
    public string $provider;
    public string $server_url;
    public string $status;
    public string $subscription_id;
    public string $validation_type;
    public string $years;
}

/** Request payload for AcmeSubscription#load. */
class AcmeSubscriptionLoadMatch
{
    public string $subscription_id;
    public string $sharing_id;
}

/** Request payload for AcmeSubscription#list. */
class AcmeSubscriptionListMatch
{
    public string $created_at;
    public string $ends_at;
    public string $name;
    public string $provider;
    public string $sharing_id;
    public string $status;
    public string $validation_type;
    public string $year;
}

/** Request payload for AcmeSubscription#create. */
class AcmeSubscriptionCreateData
{
    public string $sharing_id;
    public string $country;
    public string $currency;
    public array $domains;
    public int $duration;
    public string $grid;
    public string $name;
    public string $provider;
    public string $validation_type;
}

/** Request payload for AcmeSubscription#update. */
class AcmeSubscriptionUpdateData
{
    public string $subscription_id;
    public string $sharing_id;
    public ?string $name = null;
}

/** Request payload for AcmeSubscription#remove. */
class AcmeSubscriptionRemoveMatch
{
    public string $subscription_id;
    public string $sharing_id;
}

/** BillingInfo entity data model. */
class BillingInfo
{
    public float $annual_balance;
    public string $grid;
    public float $outstanding_amount;
    public array $prepaid;
    public ?bool $prepaid_monthly_invoice = null;
}

/** Request payload for BillingInfo#load. */
class BillingInfoLoadMatch
{
    public string $sharing_id;
}

/** BillingPrice entity data model. */
class BillingPrice
{
    public string $currency;
    public string $grid;
    public array $products;
    public array $taxes;
}

/** Request payload for BillingPrice#load. */
class BillingPriceLoadMatch
{
    public string $type;
    public ?bool $active_phase = null;
    public ?string $country = null;
    public ?string $currency = null;
    public ?array $discount = null;
    public ?string $duration_unit = null;
    public ?string $extension = null;
    public ?bool $feature = null;
    public ?string $grid = null;
    public ?string $lang = null;
    public ?int $max_duration = null;
    public array $name;
    public ?int $page = null;
    public ?int $per_page = null;
    public ?string $prices_at = null;
    public array $process;
    public ?string $sharing_id = null;
}

/** CertificateDcv entity data model. */
class CertificateDcv
{
    public string $message;
    public string $method;
}

/** Request payload for CertificateDcv#update. */
class CertificateDcvUpdateData
{
    public string $certificate_id;
    public ?string $sharing_id = null;
    public ?string $message = null;
    public ?string $method = null;
}

/** Request payload for CertificateDcv#patch. */
class CertificateDcvPatchData
{
    public string $certificate_id;
    public ?string $sharing_id = null;
    public ?string $method = null;
}

/** CertificatePackage entity data model. */
class CertificatePackage
{
    public array $category;
    public string $href;
    public int $max_domains;
    public int $min_domains;
    public string $name;
    public string $provider;
    public bool $sgc;
    public bool $trustlogo;
    public int $warranty;
    public bool $wildcard;
}

/** Request payload for CertificatePackage#load. */
class CertificatePackageLoadMatch
{
    public string $name;
}

/** Request payload for CertificatePackage#list. */
class CertificatePackageListMatch
{
    public ?string $category = null;
    public ?int $max_domain = null;
    public ?int $min_domain = null;
    public ?int $page = null;
    public ?int $per_page = null;
    public ?bool $trustlogo = null;
    public ?int $warranty = null;
    public ?bool $wildcard = null;
}

/** CertificatePem entity data model. */
class CertificatePem
{
}

/** Request payload for CertificatePem#load. */
class CertificatePemLoadMatch
{
    public string $type;
    public ?string $provider = null;
}

/** CertificateRenewal entity data model. */
class CertificateRenewal
{
    public ?string $csr = null;
    public ?string $dcv_method = null;
    public ?int $duration = null;
    public ?array $errors = null;
    public string $status;
}

/** Request payload for CertificateRenewal#create. */
class CertificateRenewalCreateData
{
    public string $certificate_id;
    public ?string $sharing_id = null;
    public ?string $csr = null;
    public ?string $dcv_method = null;
    public ?int $duration = null;
}

/** CertificateTag entity data model. */
class CertificateTag
{
    public array $add;
    public string $message;
    public array $remove;
    public string $tag;
    public array $tags;
}

/** Request payload for CertificateTag#list. */
class CertificateTagListMatch
{
    public string $certificate_id;
}

/** Request payload for CertificateTag#create. */
class CertificateTagCreateData
{
    public string $certificate_id;
    public string $tag;
}

/** Request payload for CertificateTag#update. */
class CertificateTagUpdateData
{
    public string $certificate_id;
    public ?array $tags = null;
}

/** Request payload for CertificateTag#patch. */
class CertificateTagPatchData
{
    public string $certificate_id;
    public ?array $add = null;
    public ?array $remove = null;
}

/** Request payload for CertificateTag#remove. */
class CertificateTagRemoveMatch
{
    public string $certificate_id;
}

/** Comment entity data model. */
class Comment
{
    public string $content;
    public ?string $created_at = null;
    public ?array $errors = null;
    public string $id;
    public string $status;
    public ?string $updated_at = null;
    public array $user;
}

/** Request payload for Comment#load. */
class CommentLoadMatch
{
    public string $entity_id;
}

/** Request payload for Comment#create. */
class CommentCreateData
{
    public string $entity_id;
    public string $content;
}

/** Request payload for Comment#remove. */
class CommentRemoveMatch
{
    public string $entity_id;
}

/** Domain entity data model. */
class Domain
{
    public array $admin;
    public ?string $authinfo = null;
    public array $autorenew;
    public array $bill;
    public bool $can_tld_lock;
    public ?string $claims = null;
    public array $contacts;
    public ?string $currency = null;
    public array $dates;
    public string $domain_owner;
    public ?int $duration = null;
    public ?bool $enforce_premium = null;
    public ?array $errors = null;
    public ?array $extra_parameters = null;
    public string $fqdn;
    public string $fqdn_unicode;
    public string $href;
    public ?string $id = null;
    public ?string $lang = null;
    public ?bool $mailbox_optin = null;
    public array $nameserver;
    public array $nameservers;
    public ?array $nameservers_ips = null;
    public string $orga_owner;
    public array $owner;
    public ?float $price = null;
    public string $reachability;
    public ?string $resellee_id = null;
    public array $services;
    public ?string $sharing_id = null;
    public array $sharing_space;
    public ?string $smd = null;
    public array $status;
    public ?array $tags = null;
    public array $tech;
    public ?string $template_id = null;
    public string $tld;
    public ?string $tld_period = null;
    public ?array $trustee_roles = null;
}

/** Request payload for Domain#load. */
class DomainLoadMatch
{
    public string $fqdn;
}

/** Request payload for Domain#list. */
class DomainListMatch
{
    public ?string $fqdn = null;
    public ?string $nameserver = null;
    public ?int $page = null;
    public ?int $per_page = null;
    public ?string $resellee_id = null;
    public ?string $sharing_id = null;
    public ?string $sort_by = null;
    public ?string $tld = null;
}

/** Request payload for Domain#create. */
class DomainCreateData
{
    public ?string $sharing_id = null;
    public array $admin;
    public array $bill;
    public ?string $claims = null;
    public ?string $currency = null;
    public ?int $duration = null;
    public ?bool $enforce_premium = null;
    public ?array $extra_parameters = null;
    public string $fqdn;
    public ?string $lang = null;
    public ?bool $mailbox_optin = null;
    public ?array $nameservers = null;
    public ?array $nameservers_ips = null;
    public array $owner;
    public ?float $price = null;
    public ?string $resellee_id = null;
    public ?string $smd = null;
    public array $tech;
    public ?string $template_id = null;
    public ?string $tld_period = null;
}

/** Request payload for Domain#update. */
class DomainUpdateData
{
    public string $fqdn;
    public ?array $admin = null;
    public ?string $authinfo = null;
    public ?array $autorenew = null;
    public ?array $bill = null;
    public ?bool $can_tld_lock = null;
    public ?string $claims = null;
    public ?array $contacts = null;
    public ?string $currency = null;
    public ?array $dates = null;
    public ?string $domain_owner = null;
    public ?int $duration = null;
    public ?bool $enforce_premium = null;
    public ?array $errors = null;
    public ?array $extra_parameters = null;
    public ?string $fqdn_unicode = null;
    public ?string $href = null;
    public ?string $id = null;
    public ?string $lang = null;
    public ?bool $mailbox_optin = null;
    public ?array $nameserver = null;
    public ?array $nameservers = null;
    public ?array $nameservers_ips = null;
    public ?string $orga_owner = null;
    public ?array $owner = null;
    public ?float $price = null;
    public ?string $reachability = null;
    public ?string $resellee_id = null;
    public ?array $services = null;
    public ?string $sharing_id = null;
    public ?array $sharing_space = null;
    public ?string $smd = null;
    public ?array $status = null;
    public ?array $tags = null;
    public ?array $tech = null;
    public ?string $template_id = null;
    public ?string $tld = null;
    public ?string $tld_period = null;
    public ?array $trustee_roles = null;
    public mixed $action = null;
    public mixed $clientTransferProhibited = null;
    public mixed $enabled = null;
    public mixed $org_id = null;
}

/** Request payload for Domain#remove. */
class DomainRemoveMatch
{
    public string $fqdn;
}

/** DomainAvailability entity data model. */
class DomainAvailability
{
    public string $currency;
    public string $grid;
    public array $products;
    public array $taxes;
}

/** Request payload for DomainAvailability#load. */
class DomainAvailabilityLoadMatch
{
    public ?string $country = null;
    public ?string $currency = null;
    public ?string $duration_unit = null;
    public ?string $extension = null;
    public ?string $grid = null;
    public ?string $lang = null;
    public ?int $max_duration = null;
    public string $name;
    public ?string $period = null;
    public ?array $process = null;
    public ?string $sharing_id = null;
}

/** DomainChangeOwner entity data model. */
class DomainChangeOwner
{
    public array $admin;
    public array $bill;
    public string $created_at;
    public ?string $date_start = null;
    public ?array $errors = null;
    public ?string $errortype = null;
    public ?string $errortype_label = null;
    public ?array $foa = null;
    public ?string $inner_step = null;
    public array $owner;
    public array $params;
    public string $status;
    public string $step;
    public int $step_nb;
    public array $tech;
    public string $updated_at;
}

/** Request payload for DomainChangeOwner#load. */
class DomainChangeOwnerLoadMatch
{
    public string $domain;
    public ?string $sharing_id = null;
}

/** Request payload for DomainChangeOwner#create. */
class DomainChangeOwnerCreateData
{
    public string $domain;
    public ?string $sharing_id = null;
    public array $admin;
    public array $bill;
    public array $owner;
    public array $tech;
}

/** DomainClaim entity data model. */
class DomainClaim
{
    public array $claims;
    public string $created_at;
    public string $expires_at;
    public string $fqdn;
    public string $fqdn_alabel;
    public string $fqdn_ulabel;
    public string $notice_id;
    public string $status;
}

/** Request payload for DomainClaim#load. */
class DomainClaimLoadMatch
{
    public string $domain;
}

/** Request payload for DomainClaim#create. */
class DomainClaimCreateData
{
    public string $domain;
    public array $claims;
    public string $created_at;
    public string $expires_at;
    public string $fqdn;
    public string $fqdn_alabel;
    public string $fqdn_ulabel;
    public string $notice_id;
    public string $status;
}

/** DomainContact entity data model. */
class DomainContact
{
    public array $admin;
    public array $bill;
    public string $message;
    public array $owner;
    public array $tech;
}

/** Request payload for DomainContact#load. */
class DomainContactLoadMatch
{
    public string $domain;
}

/** Request payload for DomainContact#update. */
class DomainContactUpdateData
{
    public string $domain;
    public ?array $admin = null;
    public ?array $bill = null;
    public ?array $tech = null;
}

/** DomainDnskey entity data model. */
class DomainDnskey
{
    public int $algorithm;
    public string $digest;
    public int $digest_type;
    public string $href;
    public int $id;
    public array $keys;
    public int $keytag;
    public string $message;
    public string $public_key;
    public string $type;
}

/** Request payload for DomainDnskey#list. */
class DomainDnskeyListMatch
{
    public string $domain;
    public ?int $page = null;
    public ?int $per_page = null;
}

/** Request payload for DomainDnskey#create. */
class DomainDnskeyCreateData
{
    public string $domain;
    public int $algorithm;
    public string $public_key;
    public string $type;
}

/** Request payload for DomainDnskey#update. */
class DomainDnskeyUpdateData
{
    public string $domain;
    public ?array $keys = null;
}

/** Request payload for DomainDnskey#remove. */
class DomainDnskeyRemoveMatch
{
    public string $domain;
    public string $id;
}

/** DomainDnssec entity data model. */
class DomainDnssec
{
    public ?string $error = null;
    public string $state;
}

/** Request payload for DomainDnssec#load. */
class DomainDnssecLoadMatch
{
    public string $domain;
}

/** Request payload for DomainDnssec#create. */
class DomainDnssecCreateData
{
    public string $domain;
    public ?string $sharing_id = null;
    public ?string $error = null;
    public string $state;
}

/** Request payload for DomainDnssec#remove. */
class DomainDnssecRemoveMatch
{
    public string $domain;
    public ?string $sharing_id = null;
}

/** DomainHost entity data model. */
class DomainHost
{
    public string $fqdn;
    public string $fqdn_unicode;
    public string $href;
    public array $ips;
    public string $message;
    public string $name;
}

/** Request payload for DomainHost#load. */
class DomainHostLoadMatch
{
    public string $domain;
    public string $name;
}

/** Request payload for DomainHost#list. */
class DomainHostListMatch
{
    public string $domain;
    public ?int $page = null;
    public ?int $per_page = null;
}

/** Request payload for DomainHost#create. */
class DomainHostCreateData
{
    public string $domain;
    public ?int $page = null;
    public ?int $per_page = null;
    public array $ips;
    public string $name;
}

/** Request payload for DomainHost#update. */
class DomainHostUpdateData
{
    public string $domain;
    public string $name;
    public ?array $ips = null;
}

/** Request payload for DomainHost#remove. */
class DomainHostRemoveMatch
{
    public string $domain;
    public string $name;
}

/** DomainLivedns entity data model. */
class DomainLivedns
{
    public string $current;
    public ?bool $dnssec_available = null;
    public ?bool $livednssec_available = null;
    public string $message;
    public array $nameservers;
}

/** Request payload for DomainLivedns#load. */
class DomainLivednsLoadMatch
{
    public string $domain;
}

/** Request payload for DomainLivedns#create. */
class DomainLivednsCreateData
{
    public string $domain;
    public string $current;
    public ?bool $dnssec_available = null;
    public ?bool $livednssec_available = null;
    public string $message;
    public array $nameservers;
}

/** DomainNameserver entity data model. */
class DomainNameserver
{
    public string $message;
    public array $nameservers;
}

/** Request payload for DomainNameserver#list. */
class DomainNameserverListMatch
{
    public string $domain;
}

/** Request payload for DomainNameserver#update. */
class DomainNameserverUpdateData
{
    public string $domain;
    public ?array $nameservers = null;
}

/** DomainTag entity data model. */
class DomainTag
{
    public array $add;
    public string $message;
    public array $remove;
    public string $tag;
    public array $tags;
}

/** Request payload for DomainTag#list. */
class DomainTagListMatch
{
    public string $domain;
}

/** Request payload for DomainTag#create. */
class DomainTagCreateData
{
    public string $domain;
    public string $tag;
}

/** Request payload for DomainTag#update. */
class DomainTagUpdateData
{
    public string $domain;
    public ?array $tags = null;
}

/** Request payload for DomainTag#patch. */
class DomainTagPatchData
{
    public string $domain;
    public ?array $add = null;
    public ?array $remove = null;
}

/** Request payload for DomainTag#remove. */
class DomainTagRemoveMatch
{
    public string $domain;
}

/** DomainTransfer entity data model. */
class DomainTransfer
{
    public array $admin;
    public ?string $authinfo = null;
    public array $bill;
    public ?bool $change_owner = null;
    public string $created_at;
    public ?string $currency = null;
    public ?int $duration = null;
    public ?bool $enforce_premium = null;
    public ?array $errors = null;
    public ?string $errortype = null;
    public ?string $errortype_label = null;
    public ?array $extra_parameters = null;
    public ?array $foa = null;
    public string $fqdn;
    public ?string $inner_step = null;
    public ?bool $mailbox_optin = null;
    public string $message;
    public ?array $nameservers = null;
    public ?array $nameservers_ips = null;
    public array $owner;
    public string $owner_contact;
    public array $params;
    public ?float $price = null;
    public ?string $regac_at = null;
    public ?string $resellee_id = null;
    public ?string $start_at = null;
    public string $status;
    public string $step;
    public int $step_nb;
    public array $tech;
    public ?string $template_id = null;
    public ?string $transfer_link = null;
    public ?string $transfer_procedure = null;
    public string $updated_at;
}

/** Request payload for DomainTransfer#load. */
class DomainTransferLoadMatch
{
    public string $domain;
}

/** Request payload for DomainTransfer#create. */
class DomainTransferCreateData
{
    public ?string $sharing_id = null;
    public array $admin;
    public ?string $authinfo = null;
    public array $bill;
    public ?bool $change_owner = null;
    public ?string $currency = null;
    public ?int $duration = null;
    public ?bool $enforce_premium = null;
    public ?array $extra_parameters = null;
    public string $fqdn;
    public ?bool $mailbox_optin = null;
    public ?array $nameservers = null;
    public ?array $nameservers_ips = null;
    public array $owner;
    public ?float $price = null;
    public ?string $resellee_id = null;
    public array $tech;
    public ?string $template_id = null;
}

/** Request payload for DomainTransfer#update. */
class DomainTransferUpdateData
{
    public string $domain;
    public ?array $admin = null;
    public ?string $authinfo = null;
    public ?array $bill = null;
    public ?bool $change_owner = null;
    public ?string $created_at = null;
    public ?string $currency = null;
    public ?int $duration = null;
    public ?bool $enforce_premium = null;
    public ?array $errors = null;
    public ?string $errortype = null;
    public ?string $errortype_label = null;
    public ?array $extra_parameters = null;
    public ?array $foa = null;
    public ?string $fqdn = null;
    public ?string $inner_step = null;
    public ?bool $mailbox_optin = null;
    public ?string $message = null;
    public ?array $nameservers = null;
    public ?array $nameservers_ips = null;
    public ?array $owner = null;
    public ?string $owner_contact = null;
    public ?array $params = null;
    public ?float $price = null;
    public ?string $regac_at = null;
    public ?string $resellee_id = null;
    public ?string $start_at = null;
    public ?string $status = null;
    public ?string $step = null;
    public ?int $step_nb = null;
    public ?array $tech = null;
    public ?string $template_id = null;
    public ?string $transfer_link = null;
    public ?string $transfer_procedure = null;
    public ?string $updated_at = null;
}

/** DomainWebredir entity data model. */
class DomainWebredir
{
    public ?string $cert_status = null;
    public ?string $cert_uuid = null;
    public ?string $created_at = null;
    public string $host;
    public string $message;
    public bool $override;
    public ?string $protocol = null;
    public string $type;
    public ?string $updated_at = null;
    public string $url;
}

/** Request payload for DomainWebredir#load. */
class DomainWebredirLoadMatch
{
    public string $domain;
    public string $host;
}

/** Request payload for DomainWebredir#list. */
class DomainWebredirListMatch
{
    public string $domain;
    public ?int $page = null;
    public ?int $per_page = null;
}

/** Request payload for DomainWebredir#create. */
class DomainWebredirCreateData
{
    public string $domain;
    public ?int $page = null;
    public ?int $per_page = null;
    public string $host;
    public bool $override;
    public string $protocol;
    public string $type;
    public string $url;
}

/** Request payload for DomainWebredir#update. */
class DomainWebredirUpdateData
{
    public string $domain;
    public string $host;
    public ?bool $override = null;
    public ?string $protocol = null;
    public ?string $type = null;
    public ?string $url = null;
}

/** Request payload for DomainWebredir#remove. */
class DomainWebredirRemoveMatch
{
    public string $domain;
    public string $host;
}

/** EmailForward entity data model. */
class EmailForward
{
    public array $destinations;
    public string $href;
    public ?string $id = null;
    public string $message;
    public string $source;
}

/** Request payload for EmailForward#list. */
class EmailForwardListMatch
{
    public string $domain;
    public ?string $destination = null;
    public ?int $page = null;
    public ?int $per_page = null;
    public ?string $sort_by = null;
    public ?string $source = null;
}

/** Request payload for EmailForward#create. */
class EmailForwardCreateData
{
    public string $domain;
    public array $destinations;
    public string $source;
}

/** Request payload for EmailForward#update. */
class EmailForwardUpdateData
{
    public string $domain;
    public string $source;
    public ?array $destinations = null;
}

/** Request payload for EmailForward#remove. */
class EmailForwardRemoveMatch
{
    public string $domain;
    public string $source;
}

/** EmailMailbox entity data model. */
class EmailMailbox
{
    public string $address;
    public ?int $alias_count = null;
    public array $aliases;
    public bool $antispam;
    public array $autorenew;
    public string $domain;
    public ?array $errors = null;
    public string $expires_at;
    public ?string $fallback_email = null;
    public string $href;
    public string $id;
    public string $login;
    public string $mailbox_type;
    public string $message;
    public string $password;
    public int $quota_used;
    public ?array $responder = null;
    public string $status;
    public bool $to_convert;
}

/** Request payload for EmailMailbox#load. */
class EmailMailboxLoadMatch
{
    public string $domain;
    public string $id;
}

/** Request payload for EmailMailbox#list. */
class EmailMailboxListMatch
{
    public string $domain;
    public ?bool $antispam = null;
    public ?string $login = null;
    public ?string $mailbox_type = null;
    public ?int $page = null;
    public ?int $per_page = null;
}

/** Request payload for EmailMailbox#create. */
class EmailMailboxCreateData
{
    public string $domain;
    public ?array $aliases = null;
    public ?bool $antispam = null;
    public string $login;
    public string $mailbox_type;
    public string $password;
}

/** Request payload for EmailMailbox#update. */
class EmailMailboxUpdateData
{
    public string $domain;
    public string $id;
    public ?string $sharing_id = null;
    public ?array $aliases = null;
    public ?bool $antispam = null;
    public ?array $autorenew = null;
    public ?string $login = null;
    public ?string $mailbox_type = null;
    public ?string $password = null;
    public ?array $responder = null;
}

/** Request payload for EmailMailbox#remove. */
class EmailMailboxRemoveMatch
{
    public string $domain;
    public string $id;
}

/** EmailMigration entity data model. */
class EmailMigration
{
    public bool $available;
    public string $currency;
    public int $forward_count;
    public int $free_mailboxes;
    public int $included_mailboxes;
    public array $info;
    public string $message;
    public bool $packmail;
    public float $price_v1;
    public float $price_v2;
    public float $quota_v1;
    public string $token;
    public float $usage_v1;
}

/** Request payload for EmailMigration#load. */
class EmailMigrationLoadMatch
{
    public string $domain;
    public ?string $sharing_id = null;
}

/** Request payload for EmailMigration#create. */
class EmailMigrationCreateData
{
    public string $domain;
    public ?string $sharing_id = null;
    public string $token;
}

/** EmailOffer entity data model. */
class EmailOffer
{
    public string $antispam;
    public string $dkim;
    public string $message;
    public string $status;
    public int $version;
}

/** Request payload for EmailOffer#load. */
class EmailOfferLoadMatch
{
    public string $domain;
}

/** Request payload for EmailOffer#update. */
class EmailOfferUpdateData
{
    public string $domain;
    public ?string $antispam = null;
    public ?string $dkim = null;
}

/** EmailSlot entity data model. */
class EmailSlot
{
    public ?bool $autorenew = null;
    public int $capacity;
    public string $created_at;
    public int $duration;
    public int $gandi_id;
    public string $href;
    public string $id;
    public string $mailbox_type;
    public ?float $refund_amount = null;
    public ?string $refund_currency = null;
    public bool $refundable;
    public string $status;
}

/** Request payload for EmailSlot#load. */
class EmailSlotLoadMatch
{
    public string $domain;
    public int $id;
}

/** Request payload for EmailSlot#list. */
class EmailSlotListMatch
{
    public string $domain;
    public ?bool $display_not_expired_and_inactive = null;
}

/** Request payload for EmailSlot#create. */
class EmailSlotCreateData
{
    public string $domain;
    public ?string $sharing_id = null;
    public ?bool $autorenew = null;
    public int $duration;
    public string $mailbox_type;
}

/** Request payload for EmailSlot#remove. */
class EmailSlotRemoveMatch
{
    public string $domain;
    public int $id;
}

/** HostingApplication entity data model. */
class HostingApplication
{
    public string $name;
    public string $name_label;
    public array $requirements;
}

/** Request payload for HostingApplication#load. */
class HostingApplicationLoadMatch
{
    public string $name;
}

/** Request payload for HostingApplication#list. */
class HostingApplicationListMatch
{
    public ?string $database = null;
    public ?string $language = null;
    public ?string $name = null;
    public ?int $page = null;
    public ?int $per_page = null;
    public ?string $sharing_id = null;
    public ?string $sort_by = null;
}

/** HostingInstance entity data model. */
class HostingInstance
{
    public array $access_information;
    public array $authentication;
    public array $autorenew;
    public bool $available_upgrade;
    public ?array $booster = null;
    public ?array $booster_options = null;
    public ?array $compatible_applications = null;
    public array $console;
    public int $cpu;
    public string $created_at;
    public array $database;
    public array $datacenter;
    public ?string $domain = null;
    public ?int $duration = null;
    public ?string $duration_unit = null;
    public ?array $errors = null;
    public string $expire_at;
    public string $id;
    public array $language;
    public ?string $language_id = null;
    public string $location;
    public string $message;
    public string $name;
    public ?string $password = null;
    public ?string $password_updated_at = null;
    public array $ram;
    public array $sharing_space;
    public string $size;
    public bool $snapshot_enabled;
    public string $status;
    public array $storage;
    public ?int $storage_additional_size = null;
    public ?bool $subscription_cancelled = null;
    public array $type;
    public ?array $upgrade_to = null;
    public array $vhosts;
}

/** Request payload for HostingInstance#load. */
class HostingInstanceLoadMatch
{
    public string $id;
}

/** Request payload for HostingInstance#list. */
class HostingInstanceListMatch
{
    public ?string $fqdn = null;
    public ?string $name = null;
    public ?int $page = null;
    public ?int $per_page = null;
    public ?string $sharing_id = null;
    public ?string $size = null;
    public ?string $sort_by = null;
    public ?string $status = null;
}

/** Request payload for HostingInstance#create. */
class HostingInstanceCreateData
{
    public ?string $sharing_id = null;
    public array $authentication;
    public ?array $autorenew = null;
    public string $domain;
    public ?int $duration = null;
    public ?string $duration_unit = null;
    public string $location;
    public ?string $name = null;
    public string $size;
    public ?bool $snapshot_enabled = null;
    public ?int $storage_additional_size = null;
    public array $type;
    public ?array $vhosts = null;
}

/** Request payload for HostingInstance#update. */
class HostingInstanceUpdateData
{
    public string $id;
    public ?array $booster = null;
    public ?array $booster_options = null;
    public ?string $language_id = null;
    public ?string $name = null;
    public ?string $password = null;
    public ?string $size = null;
    public ?bool $snapshot_enabled = null;
    public ?int $storage_additional_size = null;
}

/** Request payload for HostingInstance#remove. */
class HostingInstanceRemoveMatch
{
    public string $id;
}

/** HostingVhost entity data model. */
class HostingVhost
{
    public array $application;
    public string $created_at;
    public array $deployment;
    public string $fqdn;
    public ?string $https_strategy = null;
    public bool $is_a_test_vhost;
    public array $linked_dns_zone;
    public string $status;
    public ?string $tls_validated_at = null;
}

/** Request payload for HostingVhost#load. */
class HostingVhostLoadMatch
{
    public string $fqdn;
    public string $instance_id;
}

/** Request payload for HostingVhost#list. */
class HostingVhostListMatch
{
    public string $instance_id;
    public ?string $fqdn = null;
    public ?int $page = null;
    public ?int $per_page = null;
    public ?string $sort_by = null;
    public ?string $status = null;
}

/** Request payload for HostingVhost#create. */
class HostingVhostCreateData
{
    public string $instance_id;
    public array $application;
    public string $fqdn;
    public array $linked_dns_zone;
}

/** Request payload for HostingVhost#update. */
class HostingVhostUpdateData
{
    public string $fqdn;
    public string $instance_id;
    public ?array $application = null;
    public ?string $https_strategy = null;
    public ?array $linked_dns_zone = null;
}

/** Request payload for HostingVhost#remove. */
class HostingVhostRemoveMatch
{
    public string $fqdn;
    public string $instance_id;
}

/** IssuedCertificate entity data model. */
class IssuedCertificate
{
    public array $altnames;
    public array $altnames_unicode;
    public ?bool $apex_only = null;
    public ?string $assumed_name = null;
    public ?string $business_category = null;
    public ?bool $card_pay_trustlogo = null;
    public ?string $cert = null;
    public string $cn;
    public string $cn_unicode;
    public array $contact;
    public ?string $csr = null;
    public array $dates;
    public ?string $dcv_method = null;
    public ?int $duration = null;
    public ?string $error_msg = null;
    public ?array $errors = null;
    public ?string $href = null;
    public string $id;
    public ?array $ida = null;
    public ?string $intermediate = null;
    public ?array $joi = null;
    public ?array $middleman = null;
    public ?string $owner = null;
    public array $package;
    public string $provider;
    public ?bool $reissuable = null;
    public ?bool $renewable = null;
    public ?string $resellee_id = null;
    public ?int $sha_version = null;
    public ?string $sharing_id = null;
    public int $software;
    public ?string $state = null;
    public ?string $state_detail = null;
    public string $status;
    public ?int $step_nb = null;
    public ?bool $stored = null;
    public ?array $tags = null;
    public ?bool $trustlogo = null;
    public ?array $trustlogo_token = null;
}

/** Request payload for IssuedCertificate#load. */
class IssuedCertificateLoadMatch
{
    public string $id;
}

/** Request payload for IssuedCertificate#list. */
class IssuedCertificateListMatch
{
    public ?string $cn = null;
    public ?string $cn_eq = null;
    public ?string $covered_cn = null;
    public ?string $package = null;
    public ?int $page = null;
    public ?int $per_page = null;
    public ?string $sharing_id = null;
    public ?string $sort_by = null;
    public ?string $status = null;
}

/** Request payload for IssuedCertificate#create. */
class IssuedCertificateCreateData
{
    public ?string $sharing_id = null;
    public ?array $altnames = null;
    public ?bool $apex_only = null;
    public ?string $cn = null;
    public ?string $csr = null;
    public ?string $dcv_method = null;
    public ?int $duration = null;
    public array $package;
    public ?string $resellee_id = null;
}

/** Request payload for IssuedCertificate#update. */
class IssuedCertificateUpdateData
{
    public string $id;
    public ?string $sharing_id = null;
    public ?array $altnames = null;
    public ?string $csr = null;
    public ?string $dcv_method = null;
}

/** Request payload for IssuedCertificate#remove. */
class IssuedCertificateRemoveMatch
{
    public string $id;
    public ?string $sharing_id = null;
}

/** LinkedZone entity data model. */
class LinkedZone
{
    public string $created_at;
    public bool $default_records;
    public int $domain_count;
    public ?array $domains = null;
    public string $id;
    public string $message;
    public string $name;
    public ?array $record_list = null;
    public ?string $record_text = null;
    public ?array $records = null;
    public array $sharing_space;
    public string $status;
    public ?string $updated_at = null;
}

/** Request payload for LinkedZone#load. */
class LinkedZoneLoadMatch
{
    public string $id;
    public ?string $sharing_id = null;
}

/** Request payload for LinkedZone#list. */
class LinkedZoneListMatch
{
    public ?int $page = null;
    public ?int $per_page = null;
    public ?string $sharing_id = null;
}

/** Request payload for LinkedZone#create. */
class LinkedZoneCreateData
{
    public ?bool $default_records = null;
    public string $name;
    public ?array $record_list = null;
    public ?string $record_text = null;
}

/** Request payload for LinkedZone#update. */
class LinkedZoneUpdateData
{
    public string $id;
    public ?bool $default_records = null;
    public ?string $name = null;
    public ?array $record_list = null;
    public ?string $record_text = null;
}

/** Request payload for LinkedZone#remove. */
class LinkedZoneRemoveMatch
{
    public string $id;
}

/** LinkedZoneDeployment entity data model. */
class LinkedZoneDeployment
{
    public bool $deploy;
    public string $message;
}

/** Request payload for LinkedZoneDeployment#create. */
class LinkedZoneDeploymentCreateData
{
    public string $zone_id;
    public bool $deploy;
}

/** LinkedZoneDomain entity data model. */
class LinkedZoneDomain
{
    public bool $deployed;
    public string $id;
    public string $name;
    public string $owner;
    public array $zone;
}

/** Request payload for LinkedZoneDomain#load. */
class LinkedZoneDomainLoadMatch
{
    public string $name;
}

/** Request payload for LinkedZoneDomain#list. */
class LinkedZoneDomainListMatch
{
    public ?string $name = null;
    public ?int $page = null;
    public ?int $per_page = null;
    public ?string $sharing_id = null;
    public ?string $zone_id = null;
}

/** Request payload for LinkedZoneDomain#update. */
class LinkedZoneDomainUpdateData
{
    public mixed $domains = null;
}

/** LinkedZoneTask entity data model. */
class LinkedZoneTask
{
    public string $created_at;
    public ?string $ending_at = null;
    public string $id;
    public array $result;
    public string $status;
    public string $type;
    public ?string $updated_at = null;
    public string $zone_id;
}

/** Request payload for LinkedZoneTask#load. */
class LinkedZoneTaskLoadMatch
{
    public string $id;
}

/** Request payload for LinkedZoneTask#list. */
class LinkedZoneTaskListMatch
{
    public ?int $page = null;
    public ?int $per_page = null;
}

/** LivednsAxfrSlave entity data model. */
class LivednsAxfrSlave
{
    public string $message;
}

/** Request payload for LivednsAxfrSlave#list. */
class LivednsAxfrSlaveListMatch
{
    public string $fqdn;
}

/** Request payload for LivednsAxfrSlave#update. */
class LivednsAxfrSlaveUpdateData
{
    public string $fqdn;
    public string $ip;
    public ?string $message = null;
}

/** Request payload for LivednsAxfrSlave#remove. */
class LivednsAxfrSlaveRemoveMatch
{
    public string $fqdn;
    public string $ip;
}

/** LivednsAxfrTsig entity data model. */
class LivednsAxfrTsig
{
    public string $href;
    public string $id;
    public string $key_name;
    public string $message;
}

/** Request payload for LivednsAxfrTsig#list. */
class LivednsAxfrTsigListMatch
{
    public string $fqdn;
}

/** Request payload for LivednsAxfrTsig#update. */
class LivednsAxfrTsigUpdateData
{
    public string $fqdn;
    public string $id;
    public ?string $sharing_id = null;
    public ?string $href = null;
    public ?string $key_name = null;
    public ?string $message = null;
}

/** Request payload for LivednsAxfrTsig#remove. */
class LivednsAxfrTsigRemoveMatch
{
    public string $fqdn;
    public string $id;
    public ?string $sharing_id = null;
}

/** LivednsDomain entity data model. */
class LivednsDomain
{
    public bool $automatic_snapshots;
    public string $domain_href;
    public string $domain_keys_href;
    public string $domain_records_href;
    public string $fqdn;
    public string $message;
    public ?array $zone = null;
}

/** Request payload for LivednsDomain#load. */
class LivednsDomainLoadMatch
{
    public string $fqdn;
}

/** Request payload for LivednsDomain#list. */
class LivednsDomainListMatch
{
    public ?int $page = null;
    public ?int $per_page = null;
    public ?string $sharing_id = null;
}

/** Request payload for LivednsDomain#create. */
class LivednsDomainCreateData
{
    public ?string $sharing_id = null;
    public string $fqdn;
    public ?array $zone = null;
}

/** Request payload for LivednsDomain#update. */
class LivednsDomainUpdateData
{
    public string $fqdn;
    public ?bool $automatic_snapshots = null;
}

/** Request payload for LivednsDomain#remove. */
class LivednsDomainRemoveMatch
{
    public string $fqdn;
}

/** LivednsKey entity data model. */
class LivednsKey
{
    public int $algorithm;
    public string $algorithm_name;
    public bool $deleted;
    public string $ds;
    public string $fingerprint;
    public int $flags;
    public string $fqdn;
    public string $id;
    public string $key_href;
    public string $message;
    public string $public_key;
    public string $status;
    public int $tag;
}

/** Request payload for LivednsKey#load. */
class LivednsKeyLoadMatch
{
    public string $fqdn;
    public string $id;
}

/** Request payload for LivednsKey#list. */
class LivednsKeyListMatch
{
    public string $fqdn;
}

/** Request payload for LivednsKey#create. */
class LivednsKeyCreateData
{
    public string $fqdn;
    public int $flags;
}

/** Request payload for LivednsKey#update. */
class LivednsKeyUpdateData
{
    public string $fqdn;
    public string $id;
    public ?bool $deleted = null;
}

/** Request payload for LivednsKey#remove. */
class LivednsKeyRemoveMatch
{
    public string $fqdn;
    public string $id;
}

/** LivednsNameserver entity data model. */
class LivednsNameserver
{
}

/** Request payload for LivednsNameserver#list. */
class LivednsNameserverListMatch
{
    public string $fqdn;
}

/** LivednsRecord entity data model. */
class LivednsRecord
{
    public ?array $add_rrset_values = null;
    public ?string $id = null;
    public string $message;
    public ?array $remove_rrset_values = null;
    public string $rrset_href;
    public string $rrset_name;
    public ?int $rrset_ttl = null;
    public string $rrset_type;
    public array $rrset_values;
}

/** Request payload for LivednsRecord#load. */
class LivednsRecordLoadMatch
{
    public string $fqdn;
    public string $rrset_name;
    public string $rrset_type;
}

/** Request payload for LivednsRecord#list. */
class LivednsRecordListMatch
{
    public string $fqdn;
    public ?int $page = null;
    public ?int $per_page = null;
    public ?string $rrset_type = null;
    public ?string $sort_by = null;
}

/** Request payload for LivednsRecord#create. */
class LivednsRecordCreateData
{
    public string $fqdn;
    public ?string $rrset_name = null;
    public ?string $rrset_type = null;
    public ?int $rrset_ttl = null;
    public array $rrset_values;
}

/** Request payload for LivednsRecord#update. */
class LivednsRecordUpdateData
{
    public string $fqdn;
    public string $rrset_name;
    public string $rrset_type;
    public ?int $rrset_ttl = null;
    public ?array $rrset_values = null;
}

/** Request payload for LivednsRecord#patch. */
class LivednsRecordPatchData
{
    public string $fqdn;
    public string $rrset_name;
    public string $rrset_type;
    public ?array $add_rrset_values = null;
    public ?array $remove_rrset_values = null;
    public ?int $rrset_ttl = null;
}

/** Request payload for LivednsRecord#remove. */
class LivednsRecordRemoveMatch
{
    public string $fqdn;
    public string $rrset_name;
    public string $rrset_type;
}

/** LivednsRrtype entity data model. */
class LivednsRrtype
{
}

/** Request payload for LivednsRrtype#list. */
class LivednsRrtypeListMatch
{
}

/** LivednsSnapshot entity data model. */
class LivednsSnapshot
{
    public bool $automatic;
    public string $created_at;
    public string $href;
    public string $id;
    public string $message;
    public string $name;
    public array $zone_data;
}

/** Request payload for LivednsSnapshot#load. */
class LivednsSnapshotLoadMatch
{
    public string $fqdn;
    public string $id;
}

/** Request payload for LivednsSnapshot#list. */
class LivednsSnapshotListMatch
{
    public string $fqdn;
    public ?bool $automatic = null;
    public ?int $page = null;
    public ?int $per_page = null;
    public ?string $sort_by = null;
}

/** Request payload for LivednsSnapshot#create. */
class LivednsSnapshotCreateData
{
    public string $fqdn;
    public ?string $name = null;
}

/** Request payload for LivednsSnapshot#update. */
class LivednsSnapshotUpdateData
{
    public string $fqdn;
    public string $id;
    public ?string $name = null;
}

/** Request payload for LivednsSnapshot#remove. */
class LivednsSnapshotRemoveMatch
{
    public string $fqdn;
    public string $id;
}

/** LivednsTsigKey entity data model. */
class LivednsTsigKey
{
    public array $config_samples;
    public string $href;
    public string $id;
    public string $key_name;
    public string $secret;
}

/** Request payload for LivednsTsigKey#load. */
class LivednsTsigKeyLoadMatch
{
    public string $id;
    public ?string $sharing_id = null;
}

/** Request payload for LivednsTsigKey#list. */
class LivednsTsigKeyListMatch
{
    public ?string $sharing_id = null;
}

/** Request payload for LivednsTsigKey#create. */
class LivednsTsigKeyCreateData
{
    public ?string $sharing_id = null;
    public array $config_samples;
    public string $href;
    public string $id;
    public string $key_name;
    public string $secret;
}

/** Mailbox entity data model. */
class Mailbox
{
    public string $address;
    public ?array $aliases = null;
    public bool $antispam;
    public array $autorenew;
    public array $config;
    public string $config_name;
    public string $created_at;
    public bool $data_access;
    public string $domain_part;
    public ?int $duration_month = null;
    public string $email;
    public string $expires_at;
    public bool $internal_domain;
    public ?array $issues = null;
    public int $last_paid_duration;
    public string $local_part;
    public string $message;
    public array $owner;
    public string $password;
    public int $quota;
    public int $quota_used;
    public array $responder;
    public string $updated_at;
    public string $uuid;
}

/** Request payload for Mailbox#load. */
class MailboxLoadMatch
{
    public string $address;
    public ?string $sharing_id = null;
}

/** Request payload for Mailbox#list. */
class MailboxListMatch
{
    public ?string $address = null;
    public ?string $domain_part = null;
    public ?string $local_part = null;
    public ?int $page = null;
    public ?int $per_page = null;
    public ?string $search = null;
    public ?string $sharing_id = null;
    public ?string $sort_by = null;
}

/** Request payload for Mailbox#create. */
class MailboxCreateData
{
    public ?string $sharing_id = null;
    public ?array $aliases = null;
    public string $config_name;
    public ?int $duration_month = null;
    public string $email;
    public string $password;
}

/** Request payload for Mailbox#update. */
class MailboxUpdateData
{
    public string $address;
    public ?array $aliases = null;
    public ?bool $antispam = null;
    public ?array $autorenew = null;
    public ?string $config_name = null;
    public ?string $password = null;
    public ?array $responder = null;
}

/** Request payload for Mailbox#remove. */
class MailboxRemoveMatch
{
    public string $address;
    public ?string $sharing_id = null;
}

/** MailboxDomain entity data model. */
class MailboxDomain
{
    public bool $antispam;
    public array $configuration;
    public ?string $date_last_validation = null;
    public bool $dkim;
    public array $fqdns;
    public bool $internal;
    public bool $is_livedns;
    public bool $mx;
    public array $owner;
    public bool $spf;
    public bool $txt;
}

/** Request payload for MailboxDomain#load. */
class MailboxDomainLoadMatch
{
    public string $domain;
}

/** Request payload for MailboxDomain#list. */
class MailboxDomainListMatch
{
    public ?int $page = null;
    public ?int $per_page = null;
}

/** Request payload for MailboxDomain#create. */
class MailboxDomainCreateData
{
    public string $domain;
    public mixed $records_to_validate = null;
}

/** MailboxForward entity data model. */
class MailboxForward
{
    public array $destinations;
    public string $message;
    public string $source;
}

/** Request payload for MailboxForward#list. */
class MailboxForwardListMatch
{
    public ?int $page = null;
    public ?int $per_page = null;
    public ?string $search = null;
    public ?string $sharing_id = null;
    public ?string $sort_by = null;
}

/** Request payload for MailboxForward#create. */
class MailboxForwardCreateData
{
    public array $destinations;
    public string $source;
}

/** Request payload for MailboxForward#update. */
class MailboxForwardUpdateData
{
    public string $source;
    public ?array $destinations = null;
}

/** Request payload for MailboxForward#remove. */
class MailboxForwardRemoveMatch
{
    public string $source;
}

/** MailboxProduct entity data model. */
class MailboxProduct
{
    public ?bool $autorenew = null;
    public array $config;
    public string $config_name;
    public string $description;
    public int $duration_month;
    public string $label;
    public string $message;
    public array $prices;
    public int $quantity;
    public array $taxes;
    public string $uuid;
}

/** Request payload for MailboxProduct#list. */
class MailboxProductListMatch
{
    public ?string $sharing_id = null;
}

/** Request payload for MailboxProduct#create. */
class MailboxProductCreateData
{
    public ?string $sharing_id = null;
    public ?bool $autorenew = null;
    public string $config_name;
    public int $duration_month;
    public int $quantity;
}

/** MailboxQuota entity data model. */
class MailboxQuota
{
    public array $annually;
    public string $config_name;
    public string $label;
    public array $monthly;
    public string $quota;
}

/** Request payload for MailboxQuota#list. */
class MailboxQuotaListMatch
{
    public ?string $sharing_id = null;
}

/** MailboxSlot entity data model. */
class MailboxSlot
{
    public array $autorenew;
    public array $config;
    public ?string $expires_at = null;
    public ?int $last_paid_duration = null;
    public array $refund_info;
    public bool $refundable;
    public string $uuid;
    public bool $webhosting_pack;
}

/** Request payload for MailboxSlot#load. */
class MailboxSlotLoadMatch
{
    public string $uuid;
}

/** Request payload for MailboxSlot#list. */
class MailboxSlotListMatch
{
    public ?string $config_name = null;
    public ?string $expires_at_gte = null;
    public ?string $expires_at_lte = null;
    public ?int $last_paid_duration = null;
    public ?int $page = null;
    public ?int $per_page = null;
    public ?string $refundable = null;
    public ?string $sharing_id = null;
    public ?string $sort_by = null;
    public ?bool $webhosting_pack = null;
}

/** Organization entity data model. */
class Organization
{
    public string $city;
    public bool $corporate;
    public string $country;
    public string $email;
    public ?string $fax = null;
    public string $firstname;
    public string $id;
    public ?string $lang = null;
    public string $lastname;
    public string $message;
    public string $name;
    public ?string $orgname = null;
    public ?string $phone = null;
    public ?string $reference = null;
    public bool $reseller;
    public ?string $siren = null;
    public ?string $state = null;
    public string $streetaddr;
    public ?string $streetaddr2 = null;
    public string $type;
    public ?string $vat_number = null;
    public string $zip;
}

/** Request payload for Organization#load. */
class OrganizationLoadMatch
{
    public string $id;
}

/** Request payload for Organization#list. */
class OrganizationListMatch
{
    public ?string $name = null;
    public ?string $permission = null;
    public ?string $sort_by = null;
    public ?string $type = null;
}

/** Request payload for Organization#create. */
class OrganizationCreateData
{
    public string $city;
    public ?string $country = null;
    public string $email;
    public ?string $fax = null;
    public string $firstname;
    public ?string $lang = null;
    public string $lastname;
    public string $name;
    public string $orgname;
    public string $phone;
    public ?string $reference = null;
    public ?bool $reseller = null;
    public ?string $siren = null;
    public ?string $state = null;
    public string $streetaddr;
    public ?string $streetaddr2 = null;
    public string $type;
    public ?string $vat_number = null;
    public ?string $zip = null;
}

/** Request payload for Organization#update. */
class OrganizationUpdateData
{
    public string $id;
    public ?string $city = null;
    public ?string $country = null;
    public ?string $email = null;
    public ?string $fax = null;
    public ?string $firstname = null;
    public ?string $lang = null;
    public ?string $lastname = null;
    public ?string $name = null;
    public ?string $phone = null;
    public ?string $reference = null;
    public ?bool $reseller = null;
    public ?string $siren = null;
    public ?string $state = null;
    public ?string $streetaddr = null;
    public ?string $streetaddr2 = null;
    public ?string $vat_number = null;
    public ?string $zip = null;
}

/** Request payload for Organization#remove. */
class OrganizationRemoveMatch
{
    public string $id;
}

/** OrganizationCustomer entity data model. */
class OrganizationCustomer
{
    public string $city;
    public string $country;
    public string $email;
    public ?string $fax = null;
    public string $firstname;
    public string $id;
    public ?string $lang = null;
    public string $lastname;
    public string $message;
    public string $name;
    public ?string $orgname = null;
    public ?string $phone = null;
    public ?string $reference = null;
    public ?string $siren = null;
    public ?string $state = null;
    public string $streetaddr;
    public ?string $streetaddr2 = null;
    public ?string $sync_contact_email = null;
    public string $type;
    public ?string $vat_number = null;
    public ?string $zip = null;
}

/** Request payload for OrganizationCustomer#load. */
class OrganizationCustomerLoadMatch
{
    public string $id;
    public string $org_id;
}

/** Request payload for OrganizationCustomer#list. */
class OrganizationCustomerListMatch
{
    public string $org_id;
    public ?string $name = null;
    public ?int $page = null;
    public ?int $per_page = null;
    public ?string $permission = null;
    public ?string $sort_by = null;
}

/** Request payload for OrganizationCustomer#create. */
class OrganizationCustomerCreateData
{
    public string $org_id;
    public string $city;
    public string $country;
    public string $email;
    public ?string $fax = null;
    public string $firstname;
    public string $lastname;
    public ?string $orgname = null;
    public string $phone;
    public ?string $reference = null;
    public ?string $state = null;
    public string $streetaddr;
    public ?string $streetaddr2 = null;
    public string $type;
    public ?string $zip = null;
}

/** Request payload for OrganizationCustomer#update. */
class OrganizationCustomerUpdateData
{
    public string $id;
    public string $org_id;
    public ?string $city = null;
    public ?string $country = null;
    public ?string $email = null;
    public ?string $fax = null;
    public ?string $firstname = null;
    public ?string $lang = null;
    public ?string $lastname = null;
    public ?string $phone = null;
    public ?string $reference = null;
    public ?string $siren = null;
    public ?string $state = null;
    public ?string $streetaddr = null;
    public ?string $streetaddr2 = null;
    public ?string $sync_contact_email = null;
    public ?string $vat_number = null;
    public ?string $zip = null;
}

/** Request payload for OrganizationCustomer#remove. */
class OrganizationCustomerRemoveMatch
{
    public string $id;
    public string $org_id;
}

/** Template entity data model. */
class Template
{
    public string $description;
    public bool $editable;
    public string $href;
    public string $id;
    public string $name;
    public array $namespaces;
    public string $orgname;
    public array $payload;
    public array $sharing_space;
    public array $variables;
}

/** Request payload for Template#load. */
class TemplateLoadMatch
{
    public string $id;
}

/** Request payload for Template#list. */
class TemplateListMatch
{
    public ?int $page = null;
    public ?int $per_page = null;
}

/** Request payload for Template#create. */
class TemplateCreateData
{
    public ?string $sharing_id = null;
    public ?string $description = null;
    public string $name;
    public array $payload;
}

/** Request payload for Template#update. */
class TemplateUpdateData
{
    public string $id;
    public ?string $description = null;
    public ?string $name = null;
    public ?array $payload = null;
}

/** Request payload for Template#remove. */
class TemplateRemoveMatch
{
    public string $id;
}

/** TemplateDispatch entity data model. */
class TemplateDispatch
{
    public int $attempt;
    public string $created_at;
    public string $dispatch_href;
    public string $id;
    public string $message;
    public string $object_id;
    public string $object_type;
    public array $payload;
    public string $sharing_id;
    public int $state;
    public ?string $state_msg = null;
    public array $target;
    public string $target_id;
    public string $target_type;
    public array $task_history;
    public array $task_status;
    public ?string $task_updated_at = null;
    public ?string $template_id = null;
    public ?string $template_name = null;
}

/** Request payload for TemplateDispatch#load. */
class TemplateDispatchLoadMatch
{
    public string $id;
}

/** Request payload for TemplateDispatch#create. */
class TemplateDispatchCreateData
{
    public string $template_id;
    public string $object_id;
    public string $object_type;
}

/** Tld entity data model. */
class Tld
{
    public bool $authinfo_for_transfer;
    public string $category;
    public bool $change_owner;
    public bool $corporate;
    public bool $ext_trade;
    public string $full_tld;
    public string $href;
    public bool $lock;
    public string $name;
}

/** Request payload for Tld#load. */
class TldLoadMatch
{
    public string $name;
}

/** Request payload for Tld#list. */
class TldListMatch
{
    public ?string $category = null;
    public ?int $page = null;
    public ?int $per_page = null;
}

/** User entity data model. */
class User
{
    public string $city;
    public ?string $country = null;
    public string $email;
    public ?string $fax = null;
    public ?string $firstname = null;
    public string $id;
    public string $lang;
    public ?string $lastname = null;
    public string $name;
    public ?string $phone = null;
    public ?string $state = null;
    public ?string $streetaddr = null;
    public ?string $streetaddr2 = null;
    public string $username;
    public ?string $zip = null;
}

/** Request payload for User#load. */
class UserLoadMatch
{
    public ?string $city = null;
    public ?string $country = null;
    public ?string $email = null;
    public ?string $fax = null;
    public ?string $firstname = null;
    public string $id;
    public ?string $lang = null;
    public ?string $lastname = null;
    public ?string $name = null;
    public ?string $phone = null;
    public ?string $state = null;
    public ?string $streetaddr = null;
    public ?string $streetaddr2 = null;
    public ?string $username = null;
    public ?string $zip = null;
}

