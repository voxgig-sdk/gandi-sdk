# Typed models for the Gandi SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class AccessToken(TypedDict):
    access_token: str
    entities: list
    expires_at: str
    id: str
    name: str
    scopes: list


class AccessTokenCreateData(TypedDict, total=False):
    expires_at: str
    name: str


class AcmeAccount(TypedDict):
    created_at: str
    deleted_at: str
    external_id: str
    id: str
    ip: str
    last_activity: str
    status: str
    subscription_id: str


class AcmeAccountLoadMatch(TypedDict):
    id: str
    subscription_id: str
    sharing_id: str


class AcmeAccountListMatch(TypedDict):
    subscription_id: str
    sharing_id: str


class AcmeDomain(TypedDict):
    created_at: str
    deleted_at: str
    hostname: str
    hostname_ulabel: str
    is_wildcard: bool
    status: str
    subscription_id: str


class AcmeDomainLoadMatch(TypedDict):
    domain_id: int
    subscription_id: str
    sharing_id: str


class AcmeDomainListMatch(TypedDict):
    subscription_id: str
    domain: str
    sharing_id: str


class AcmePrice(TypedDict):
    country: str
    currency: str
    domains: list
    duration: str
    duration_unit: str
    grid: str
    max_duration: int
    min_duration: int
    price_after_taxes: str
    price_before_taxes: str
    process: str
    product: dict
    provider: str
    tax_rate: str
    taxes: list
    validation_type: str


class AcmePriceListMatch(TypedDict):
    country: str
    currency: str
    duration: str
    grid: str
    process: str
    provider: str
    sharing_id: str
    validation_type: str


class AcmePriceCreateData(TypedDict):
    sharing_id: str
    country: str
    currency: str
    domains: list
    duration: str
    grid: str
    process: str
    provider: str
    validation_type: str


class AcmeSubscription(TypedDict):
    country: str
    created_at: str
    currency: str
    domains: list
    duration: int
    eab_hmac: str
    eab_id: str
    ends_at: str
    grid: str
    message: str
    name: str
    provider: str
    server_url: str
    status: str
    subscription_id: str
    validation_type: str
    years: str


class AcmeSubscriptionLoadMatch(TypedDict):
    subscription_id: str
    sharing_id: str


class AcmeSubscriptionListMatch(TypedDict):
    created_at: str
    ends_at: str
    name: str
    provider: str
    sharing_id: str
    status: str
    validation_type: str
    year: str


class AcmeSubscriptionCreateData(TypedDict):
    sharing_id: str
    country: str
    currency: str
    domains: list
    duration: int
    grid: str
    name: str
    provider: str
    validation_type: str


class AcmeSubscriptionUpdateDataRequired(TypedDict):
    subscription_id: str
    sharing_id: str


class AcmeSubscriptionUpdateData(AcmeSubscriptionUpdateDataRequired, total=False):
    name: str


class AcmeSubscriptionRemoveMatch(TypedDict):
    subscription_id: str
    sharing_id: str


class BillingInfoRequired(TypedDict):
    annual_balance: float
    grid: str
    outstanding_amount: float
    prepaid: dict


class BillingInfo(BillingInfoRequired, total=False):
    prepaid_monthly_invoice: bool


class BillingInfoLoadMatch(TypedDict):
    sharing_id: str


class BillingPrice(TypedDict):
    currency: str
    grid: str
    products: list
    taxes: list


class BillingPriceLoadMatchRequired(TypedDict):
    type: str
    name: list
    process: list


class BillingPriceLoadMatch(BillingPriceLoadMatchRequired, total=False):
    active_phase: bool
    country: str
    currency: str
    discount: list
    duration_unit: str
    extension: str
    feature: bool
    grid: str
    lang: str
    max_duration: int
    page: int
    per_page: int
    prices_at: str
    sharing_id: str


class CertificateDcv(TypedDict):
    message: str
    method: str


class CertificateDcvUpdateDataRequired(TypedDict):
    certificate_id: str


class CertificateDcvUpdateData(CertificateDcvUpdateDataRequired, total=False):
    sharing_id: str
    message: str
    method: str


class CertificateDcvPatchDataRequired(TypedDict):
    certificate_id: str


class CertificateDcvPatchData(CertificateDcvPatchDataRequired, total=False):
    sharing_id: str
    method: str


class CertificatePackage(TypedDict):
    category: dict
    href: str
    max_domains: int
    min_domains: int
    name: str
    provider: str
    sgc: bool
    trustlogo: bool
    warranty: int
    wildcard: bool


class CertificatePackageLoadMatch(TypedDict):
    name: str


class CertificatePackageListMatch(TypedDict, total=False):
    category: str
    max_domain: int
    min_domain: int
    page: int
    per_page: int
    trustlogo: bool
    warranty: int
    wildcard: bool


class CertificatePem(TypedDict):
    pass


class CertificatePemLoadMatchRequired(TypedDict):
    type: str


class CertificatePemLoadMatch(CertificatePemLoadMatchRequired, total=False):
    provider: str


class CertificateRenewalRequired(TypedDict):
    status: str


class CertificateRenewal(CertificateRenewalRequired, total=False):
    csr: str
    dcv_method: str
    duration: int
    errors: list


class CertificateRenewalCreateDataRequired(TypedDict):
    certificate_id: str


class CertificateRenewalCreateData(CertificateRenewalCreateDataRequired, total=False):
    sharing_id: str
    csr: str
    dcv_method: str
    duration: int


class CertificateTag(TypedDict):
    add: list
    message: str
    remove: list
    tag: str
    tags: list


class CertificateTagListMatch(TypedDict):
    certificate_id: str


class CertificateTagCreateData(TypedDict):
    certificate_id: str
    tag: str


class CertificateTagUpdateDataRequired(TypedDict):
    certificate_id: str


class CertificateTagUpdateData(CertificateTagUpdateDataRequired, total=False):
    tags: list


class CertificateTagPatchDataRequired(TypedDict):
    certificate_id: str


class CertificateTagPatchData(CertificateTagPatchDataRequired, total=False):
    add: list
    remove: list


class CertificateTagRemoveMatch(TypedDict):
    certificate_id: str


class CommentRequired(TypedDict):
    content: str
    id: str
    status: str
    user: dict


class Comment(CommentRequired, total=False):
    created_at: str
    errors: list
    updated_at: str


class CommentLoadMatch(TypedDict):
    entity_id: str


class CommentCreateData(TypedDict):
    entity_id: str
    content: str


class CommentRemoveMatch(TypedDict):
    entity_id: str


class DomainRequired(TypedDict):
    admin: dict
    autorenew: dict
    bill: dict
    can_tld_lock: bool
    contacts: dict
    dates: dict
    domain_owner: str
    fqdn: str
    fqdn_unicode: str
    href: str
    nameserver: dict
    nameservers: list
    orga_owner: str
    owner: dict
    reachability: str
    services: list
    sharing_space: dict
    status: list
    tech: dict
    tld: str


class Domain(DomainRequired, total=False):
    authinfo: str
    claims: str
    currency: str
    duration: int
    enforce_premium: bool
    errors: list
    extra_parameters: dict
    id: str
    lang: str
    mailbox_optin: bool
    nameservers_ips: dict
    price: float
    resellee_id: str
    sharing_id: str
    smd: str
    tags: list
    template_id: str
    tld_period: str
    trustee_roles: list


class DomainLoadMatch(TypedDict):
    fqdn: str


class DomainListMatch(TypedDict, total=False):
    fqdn: str
    nameserver: str
    page: int
    per_page: int
    resellee_id: str
    sharing_id: str
    sort_by: str
    tld: str


class DomainCreateDataRequired(TypedDict):
    admin: dict
    bill: dict
    fqdn: str
    owner: dict
    tech: dict


class DomainCreateData(DomainCreateDataRequired, total=False):
    sharing_id: str
    claims: str
    currency: str
    duration: int
    enforce_premium: bool
    extra_parameters: dict
    lang: str
    mailbox_optin: bool
    nameservers: list
    nameservers_ips: dict
    price: float
    resellee_id: str
    smd: str
    template_id: str
    tld_period: str


class DomainUpdateDataRequired(TypedDict):
    fqdn: str


class DomainUpdateData(DomainUpdateDataRequired, total=False):
    admin: dict
    authinfo: str
    autorenew: dict
    bill: dict
    can_tld_lock: bool
    claims: str
    contacts: dict
    currency: str
    dates: dict
    domain_owner: str
    duration: int
    enforce_premium: bool
    errors: list
    extra_parameters: dict
    fqdn_unicode: str
    href: str
    id: str
    lang: str
    mailbox_optin: bool
    nameserver: dict
    nameservers: list
    nameservers_ips: dict
    orga_owner: str
    owner: dict
    price: float
    reachability: str
    resellee_id: str
    services: list
    sharing_id: str
    sharing_space: dict
    smd: str
    status: list
    tags: list
    tech: dict
    template_id: str
    tld: str
    tld_period: str
    trustee_roles: list
    action: Any
    clientTransferProhibited: Any
    enabled: Any
    org_id: Any


class DomainRemoveMatch(TypedDict):
    fqdn: str


class DomainAvailability(TypedDict):
    currency: str
    grid: str
    products: list
    taxes: list


class DomainAvailabilityLoadMatchRequired(TypedDict):
    name: str


class DomainAvailabilityLoadMatch(DomainAvailabilityLoadMatchRequired, total=False):
    country: str
    currency: str
    duration_unit: str
    extension: str
    grid: str
    lang: str
    max_duration: int
    period: str
    process: list
    sharing_id: str


class DomainChangeOwnerRequired(TypedDict):
    admin: dict
    bill: dict
    created_at: str
    owner: dict
    params: dict
    status: str
    step: str
    step_nb: int
    tech: dict
    updated_at: str


class DomainChangeOwner(DomainChangeOwnerRequired, total=False):
    date_start: str
    errors: list
    errortype: str
    errortype_label: str
    foa: list
    inner_step: str


class DomainChangeOwnerLoadMatchRequired(TypedDict):
    domain: str


class DomainChangeOwnerLoadMatch(DomainChangeOwnerLoadMatchRequired, total=False):
    sharing_id: str


class DomainChangeOwnerCreateDataRequired(TypedDict):
    domain: str
    admin: dict
    bill: dict
    owner: dict
    tech: dict


class DomainChangeOwnerCreateData(DomainChangeOwnerCreateDataRequired, total=False):
    sharing_id: str


class DomainClaim(TypedDict):
    claims: list
    created_at: str
    expires_at: str
    fqdn: str
    fqdn_alabel: str
    fqdn_ulabel: str
    notice_id: str
    status: str


class DomainClaimLoadMatch(TypedDict):
    domain: str


class DomainClaimCreateData(TypedDict):
    domain: str
    claims: list
    created_at: str
    expires_at: str
    fqdn: str
    fqdn_alabel: str
    fqdn_ulabel: str
    notice_id: str
    status: str


class DomainContact(TypedDict):
    admin: dict
    bill: dict
    message: str
    owner: dict
    tech: dict


class DomainContactLoadMatch(TypedDict):
    domain: str


class DomainContactUpdateDataRequired(TypedDict):
    domain: str


class DomainContactUpdateData(DomainContactUpdateDataRequired, total=False):
    admin: dict
    bill: dict
    tech: dict


class DomainDnskey(TypedDict):
    algorithm: int
    digest: str
    digest_type: int
    href: str
    id: int
    keys: list
    keytag: int
    message: str
    public_key: str
    type: str


class DomainDnskeyListMatchRequired(TypedDict):
    domain: str


class DomainDnskeyListMatch(DomainDnskeyListMatchRequired, total=False):
    page: int
    per_page: int


class DomainDnskeyCreateData(TypedDict):
    domain: str
    algorithm: int
    public_key: str
    type: str


class DomainDnskeyUpdateDataRequired(TypedDict):
    domain: str


class DomainDnskeyUpdateData(DomainDnskeyUpdateDataRequired, total=False):
    keys: list


class DomainDnskeyRemoveMatch(TypedDict):
    domain: str
    id: str


class DomainDnssecRequired(TypedDict):
    state: str


class DomainDnssec(DomainDnssecRequired, total=False):
    error: str


class DomainDnssecLoadMatch(TypedDict):
    domain: str


class DomainDnssecCreateDataRequired(TypedDict):
    domain: str
    state: str


class DomainDnssecCreateData(DomainDnssecCreateDataRequired, total=False):
    sharing_id: str
    error: str


class DomainDnssecRemoveMatchRequired(TypedDict):
    domain: str


class DomainDnssecRemoveMatch(DomainDnssecRemoveMatchRequired, total=False):
    sharing_id: str


class DomainHost(TypedDict):
    fqdn: str
    fqdn_unicode: str
    href: str
    ips: list
    message: str
    name: str


class DomainHostLoadMatch(TypedDict):
    domain: str
    name: str


class DomainHostListMatchRequired(TypedDict):
    domain: str


class DomainHostListMatch(DomainHostListMatchRequired, total=False):
    page: int
    per_page: int


class DomainHostCreateDataRequired(TypedDict):
    domain: str
    ips: list
    name: str


class DomainHostCreateData(DomainHostCreateDataRequired, total=False):
    page: int
    per_page: int


class DomainHostUpdateDataRequired(TypedDict):
    domain: str
    name: str


class DomainHostUpdateData(DomainHostUpdateDataRequired, total=False):
    ips: list


class DomainHostRemoveMatch(TypedDict):
    domain: str
    name: str


class DomainLivednsRequired(TypedDict):
    current: str
    message: str
    nameservers: list


class DomainLivedns(DomainLivednsRequired, total=False):
    dnssec_available: bool
    livednssec_available: bool


class DomainLivednsLoadMatch(TypedDict):
    domain: str


class DomainLivednsCreateDataRequired(TypedDict):
    domain: str
    current: str
    message: str
    nameservers: list


class DomainLivednsCreateData(DomainLivednsCreateDataRequired, total=False):
    dnssec_available: bool
    livednssec_available: bool


class DomainNameserver(TypedDict):
    message: str
    nameservers: list


class DomainNameserverListMatch(TypedDict):
    domain: str


class DomainNameserverUpdateDataRequired(TypedDict):
    domain: str


class DomainNameserverUpdateData(DomainNameserverUpdateDataRequired, total=False):
    nameservers: list


class DomainTag(TypedDict):
    add: list
    message: str
    remove: list
    tag: str
    tags: list


class DomainTagListMatch(TypedDict):
    domain: str


class DomainTagCreateData(TypedDict):
    domain: str
    tag: str


class DomainTagUpdateDataRequired(TypedDict):
    domain: str


class DomainTagUpdateData(DomainTagUpdateDataRequired, total=False):
    tags: list


class DomainTagPatchDataRequired(TypedDict):
    domain: str


class DomainTagPatchData(DomainTagPatchDataRequired, total=False):
    add: list
    remove: list


class DomainTagRemoveMatch(TypedDict):
    domain: str


class DomainTransferRequired(TypedDict):
    admin: dict
    bill: dict
    created_at: str
    fqdn: str
    message: str
    owner: dict
    owner_contact: str
    params: dict
    status: str
    step: str
    step_nb: int
    tech: dict
    updated_at: str


class DomainTransfer(DomainTransferRequired, total=False):
    authinfo: str
    change_owner: bool
    currency: str
    duration: int
    enforce_premium: bool
    errors: list
    errortype: str
    errortype_label: str
    extra_parameters: dict
    foa: list
    inner_step: str
    mailbox_optin: bool
    nameservers: list
    nameservers_ips: dict
    price: float
    regac_at: str
    resellee_id: str
    start_at: str
    template_id: str
    transfer_link: str
    transfer_procedure: str


class DomainTransferLoadMatch(TypedDict):
    domain: str


class DomainTransferCreateDataRequired(TypedDict):
    admin: dict
    bill: dict
    fqdn: str
    owner: dict
    tech: dict


class DomainTransferCreateData(DomainTransferCreateDataRequired, total=False):
    sharing_id: str
    authinfo: str
    change_owner: bool
    currency: str
    duration: int
    enforce_premium: bool
    extra_parameters: dict
    mailbox_optin: bool
    nameservers: list
    nameservers_ips: dict
    price: float
    resellee_id: str
    template_id: str


class DomainTransferUpdateDataRequired(TypedDict):
    domain: str


class DomainTransferUpdateData(DomainTransferUpdateDataRequired, total=False):
    admin: dict
    authinfo: str
    bill: dict
    change_owner: bool
    created_at: str
    currency: str
    duration: int
    enforce_premium: bool
    errors: list
    errortype: str
    errortype_label: str
    extra_parameters: dict
    foa: list
    fqdn: str
    inner_step: str
    mailbox_optin: bool
    message: str
    nameservers: list
    nameservers_ips: dict
    owner: dict
    owner_contact: str
    params: dict
    price: float
    regac_at: str
    resellee_id: str
    start_at: str
    status: str
    step: str
    step_nb: int
    tech: dict
    template_id: str
    transfer_link: str
    transfer_procedure: str
    updated_at: str


class DomainWebredirRequired(TypedDict):
    host: str
    message: str
    override: bool
    type: str
    url: str


class DomainWebredir(DomainWebredirRequired, total=False):
    cert_status: str
    cert_uuid: str
    created_at: str
    protocol: str
    updated_at: str


class DomainWebredirLoadMatch(TypedDict):
    domain: str
    host: str


class DomainWebredirListMatchRequired(TypedDict):
    domain: str


class DomainWebredirListMatch(DomainWebredirListMatchRequired, total=False):
    page: int
    per_page: int


class DomainWebredirCreateDataRequired(TypedDict):
    domain: str
    host: str
    override: bool
    protocol: str
    type: str
    url: str


class DomainWebredirCreateData(DomainWebredirCreateDataRequired, total=False):
    page: int
    per_page: int


class DomainWebredirUpdateDataRequired(TypedDict):
    domain: str
    host: str


class DomainWebredirUpdateData(DomainWebredirUpdateDataRequired, total=False):
    override: bool
    protocol: str
    type: str
    url: str


class DomainWebredirRemoveMatch(TypedDict):
    domain: str
    host: str


class EmailForwardRequired(TypedDict):
    destinations: list
    href: str
    message: str
    source: str


class EmailForward(EmailForwardRequired, total=False):
    id: str


class EmailForwardListMatchRequired(TypedDict):
    domain: str


class EmailForwardListMatch(EmailForwardListMatchRequired, total=False):
    destination: str
    page: int
    per_page: int
    sort_by: str
    source: str


class EmailForwardCreateData(TypedDict):
    domain: str
    destinations: list
    source: str


class EmailForwardUpdateDataRequired(TypedDict):
    domain: str
    source: str


class EmailForwardUpdateData(EmailForwardUpdateDataRequired, total=False):
    destinations: list


class EmailForwardRemoveMatch(TypedDict):
    domain: str
    source: str


class EmailMailboxRequired(TypedDict):
    address: str
    aliases: list
    antispam: bool
    autorenew: dict
    domain: str
    expires_at: str
    href: str
    id: str
    login: str
    mailbox_type: str
    message: str
    password: str
    quota_used: int
    status: str
    to_convert: bool


class EmailMailbox(EmailMailboxRequired, total=False):
    alias_count: int
    errors: list
    fallback_email: str
    responder: dict


class EmailMailboxLoadMatch(TypedDict):
    domain: str
    id: str


EmailMailboxListMatchRequired = TypedDict('EmailMailboxListMatchRequired', {
    "domain": str,
})

EmailMailboxListMatchOptional = TypedDict('EmailMailboxListMatchOptional', {
    "<created_at": str,
    "antispam": bool,
    "login": str,
    "mailbox_type": str,
    "page": int,
    "per_page": int,
    "~login": str,
}, total=False)


class EmailMailboxListMatch(EmailMailboxListMatchRequired, EmailMailboxListMatchOptional):
    pass


class EmailMailboxCreateDataRequired(TypedDict):
    domain: str
    login: str
    mailbox_type: str
    password: str


class EmailMailboxCreateData(EmailMailboxCreateDataRequired, total=False):
    aliases: list
    antispam: bool


class EmailMailboxUpdateDataRequired(TypedDict):
    domain: str
    id: str


class EmailMailboxUpdateData(EmailMailboxUpdateDataRequired, total=False):
    sharing_id: str
    aliases: list
    antispam: bool
    autorenew: dict
    login: str
    mailbox_type: str
    password: str
    responder: dict


class EmailMailboxRemoveMatch(TypedDict):
    domain: str
    id: str


class EmailMigration(TypedDict):
    available: bool
    currency: str
    forward_count: int
    free_mailboxes: int
    included_mailboxes: int
    info: list
    message: str
    packmail: bool
    price_v1: float
    price_v2: float
    quota_v1: float
    token: str
    usage_v1: float


class EmailMigrationLoadMatchRequired(TypedDict):
    domain: str


class EmailMigrationLoadMatch(EmailMigrationLoadMatchRequired, total=False):
    sharing_id: str


class EmailMigrationCreateDataRequired(TypedDict):
    domain: str
    token: str


class EmailMigrationCreateData(EmailMigrationCreateDataRequired, total=False):
    sharing_id: str


class EmailOffer(TypedDict):
    antispam: str
    dkim: str
    message: str
    status: str
    version: int


class EmailOfferLoadMatch(TypedDict):
    domain: str


class EmailOfferUpdateDataRequired(TypedDict):
    domain: str


class EmailOfferUpdateData(EmailOfferUpdateDataRequired, total=False):
    antispam: str
    dkim: str


class EmailSlotRequired(TypedDict):
    capacity: int
    created_at: str
    duration: int
    gandi_id: int
    href: str
    id: str
    mailbox_type: str
    refundable: bool
    status: str


class EmailSlot(EmailSlotRequired, total=False):
    autorenew: bool
    refund_amount: float
    refund_currency: str


class EmailSlotLoadMatch(TypedDict):
    domain: str
    id: int


class EmailSlotListMatchRequired(TypedDict):
    domain: str


class EmailSlotListMatch(EmailSlotListMatchRequired, total=False):
    display_not_expired_and_inactive: bool


class EmailSlotCreateDataRequired(TypedDict):
    domain: str
    duration: int
    mailbox_type: str


class EmailSlotCreateData(EmailSlotCreateDataRequired, total=False):
    sharing_id: str
    autorenew: bool


class EmailSlotRemoveMatch(TypedDict):
    domain: str
    id: int


class HostingApplication(TypedDict):
    name: str
    name_label: str
    requirements: list


class HostingApplicationLoadMatch(TypedDict):
    name: str


class HostingApplicationListMatch(TypedDict, total=False):
    database: str
    language: str
    name: str
    page: int
    per_page: int
    sharing_id: str
    sort_by: str


class HostingInstanceRequired(TypedDict):
    access_information: dict
    authentication: dict
    autorenew: dict
    available_upgrade: bool
    console: dict
    cpu: int
    created_at: str
    database: dict
    datacenter: dict
    expire_at: str
    id: str
    language: dict
    location: str
    message: str
    name: str
    ram: dict
    sharing_space: dict
    size: str
    snapshot_enabled: bool
    status: str
    storage: dict
    type: dict
    vhosts: list


class HostingInstance(HostingInstanceRequired, total=False):
    booster: dict
    booster_options: dict
    compatible_applications: list
    domain: str
    duration: int
    duration_unit: str
    errors: list
    language_id: str
    password: str
    password_updated_at: str
    storage_additional_size: int
    subscription_cancelled: bool
    upgrade_to: list


class HostingInstanceLoadMatch(TypedDict):
    id: str


class HostingInstanceListMatch(TypedDict, total=False):
    fqdn: str
    name: str
    page: int
    per_page: int
    sharing_id: str
    size: str
    sort_by: str
    status: str


class HostingInstanceCreateDataRequired(TypedDict):
    authentication: dict
    domain: str
    location: str
    size: str
    type: dict


class HostingInstanceCreateData(HostingInstanceCreateDataRequired, total=False):
    sharing_id: str
    autorenew: dict
    duration: int
    duration_unit: str
    name: str
    snapshot_enabled: bool
    storage_additional_size: int
    vhosts: list


class HostingInstanceUpdateDataRequired(TypedDict):
    id: str


class HostingInstanceUpdateData(HostingInstanceUpdateDataRequired, total=False):
    booster: dict
    booster_options: dict
    language_id: str
    name: str
    password: str
    size: str
    snapshot_enabled: bool
    storage_additional_size: int


class HostingInstanceRemoveMatch(TypedDict):
    id: str


class HostingVhostRequired(TypedDict):
    application: dict
    created_at: str
    deployment: dict
    fqdn: str
    is_a_test_vhost: bool
    linked_dns_zone: dict
    status: str


class HostingVhost(HostingVhostRequired, total=False):
    https_strategy: str
    tls_validated_at: str


class HostingVhostLoadMatch(TypedDict):
    fqdn: str
    instance_id: str


class HostingVhostListMatchRequired(TypedDict):
    instance_id: str


class HostingVhostListMatch(HostingVhostListMatchRequired, total=False):
    fqdn: str
    page: int
    per_page: int
    sort_by: str
    status: str


class HostingVhostCreateData(TypedDict):
    instance_id: str
    application: dict
    fqdn: str
    linked_dns_zone: dict


class HostingVhostUpdateDataRequired(TypedDict):
    fqdn: str
    instance_id: str


class HostingVhostUpdateData(HostingVhostUpdateDataRequired, total=False):
    application: dict
    https_strategy: str
    linked_dns_zone: dict


class HostingVhostRemoveMatch(TypedDict):
    fqdn: str
    instance_id: str


class IssuedCertificateRequired(TypedDict):
    altnames: list
    altnames_unicode: list
    cn: str
    cn_unicode: str
    contact: dict
    dates: dict
    id: str
    package: dict
    provider: str
    software: int
    status: str


class IssuedCertificate(IssuedCertificateRequired, total=False):
    apex_only: bool
    assumed_name: str
    business_category: str
    card_pay_trustlogo: bool
    cert: str
    csr: str
    dcv_method: str
    duration: int
    error_msg: str
    errors: list
    href: str
    ida: dict
    intermediate: str
    joi: dict
    middleman: dict
    owner: str
    reissuable: bool
    renewable: bool
    resellee_id: str
    sha_version: int
    sharing_id: str
    state: str
    state_detail: str
    step_nb: int
    stored: bool
    tags: list
    trustlogo: bool
    trustlogo_token: dict


class IssuedCertificateLoadMatch(TypedDict):
    id: str


class IssuedCertificateListMatch(TypedDict, total=False):
    cn: str
    cn_eq: str
    covered_cn: str
    package: str
    page: int
    per_page: int
    sharing_id: str
    sort_by: str
    status: str


class IssuedCertificateCreateDataRequired(TypedDict):
    package: dict


class IssuedCertificateCreateData(IssuedCertificateCreateDataRequired, total=False):
    sharing_id: str
    altnames: list
    apex_only: bool
    cn: str
    csr: str
    dcv_method: str
    duration: int
    resellee_id: str


class IssuedCertificateUpdateDataRequired(TypedDict):
    id: str


class IssuedCertificateUpdateData(IssuedCertificateUpdateDataRequired, total=False):
    sharing_id: str
    altnames: list
    csr: str
    dcv_method: str


class IssuedCertificateRemoveMatchRequired(TypedDict):
    id: str


class IssuedCertificateRemoveMatch(IssuedCertificateRemoveMatchRequired, total=False):
    sharing_id: str


class LinkedZoneRequired(TypedDict):
    created_at: str
    default_records: bool
    domain_count: int
    id: str
    message: str
    name: str
    sharing_space: dict
    status: str


class LinkedZone(LinkedZoneRequired, total=False):
    domains: list
    record_list: list
    record_text: str
    records: list
    updated_at: str


class LinkedZoneLoadMatchRequired(TypedDict):
    id: str


class LinkedZoneLoadMatch(LinkedZoneLoadMatchRequired, total=False):
    sharing_id: str


class LinkedZoneListMatch(TypedDict, total=False):
    page: int
    per_page: int
    sharing_id: str


class LinkedZoneCreateDataRequired(TypedDict):
    name: str


class LinkedZoneCreateData(LinkedZoneCreateDataRequired, total=False):
    default_records: bool
    record_list: list
    record_text: str


class LinkedZoneUpdateDataRequired(TypedDict):
    id: str


class LinkedZoneUpdateData(LinkedZoneUpdateDataRequired, total=False):
    default_records: bool
    name: str
    record_list: list
    record_text: str


class LinkedZoneRemoveMatch(TypedDict):
    id: str


class LinkedZoneDeployment(TypedDict):
    deploy: bool
    message: str


class LinkedZoneDeploymentCreateData(TypedDict):
    zone_id: str
    deploy: bool


class LinkedZoneDomain(TypedDict):
    deployed: bool
    id: str
    name: str
    owner: str
    zone: dict


class LinkedZoneDomainLoadMatch(TypedDict):
    name: str


class LinkedZoneDomainListMatch(TypedDict, total=False):
    name: str
    page: int
    per_page: int
    sharing_id: str
    zone_id: str


class LinkedZoneDomainUpdateData(TypedDict, total=False):
    domains: Any


class LinkedZoneTaskRequired(TypedDict):
    created_at: str
    id: str
    result: dict
    status: str
    type: str
    zone_id: str


class LinkedZoneTask(LinkedZoneTaskRequired, total=False):
    ending_at: str
    updated_at: str


class LinkedZoneTaskLoadMatch(TypedDict):
    id: str


class LinkedZoneTaskListMatch(TypedDict, total=False):
    page: int
    per_page: int


class LivednsAxfrSlave(TypedDict):
    message: str


class LivednsAxfrSlaveListMatch(TypedDict):
    fqdn: str


class LivednsAxfrSlaveUpdateDataRequired(TypedDict):
    fqdn: str
    ip: str


class LivednsAxfrSlaveUpdateData(LivednsAxfrSlaveUpdateDataRequired, total=False):
    message: str


class LivednsAxfrSlaveRemoveMatch(TypedDict):
    fqdn: str
    ip: str


class LivednsAxfrTsig(TypedDict):
    href: str
    id: str
    key_name: str
    message: str


class LivednsAxfrTsigListMatch(TypedDict):
    fqdn: str


class LivednsAxfrTsigUpdateDataRequired(TypedDict):
    fqdn: str
    id: str


class LivednsAxfrTsigUpdateData(LivednsAxfrTsigUpdateDataRequired, total=False):
    sharing_id: str
    href: str
    key_name: str
    message: str


class LivednsAxfrTsigRemoveMatchRequired(TypedDict):
    fqdn: str
    id: str


class LivednsAxfrTsigRemoveMatch(LivednsAxfrTsigRemoveMatchRequired, total=False):
    sharing_id: str


class LivednsDomainRequired(TypedDict):
    automatic_snapshots: bool
    domain_href: str
    domain_keys_href: str
    domain_records_href: str
    fqdn: str
    message: str


class LivednsDomain(LivednsDomainRequired, total=False):
    zone: dict


class LivednsDomainLoadMatch(TypedDict):
    fqdn: str


class LivednsDomainListMatch(TypedDict, total=False):
    page: int
    per_page: int
    sharing_id: str


class LivednsDomainCreateDataRequired(TypedDict):
    fqdn: str


class LivednsDomainCreateData(LivednsDomainCreateDataRequired, total=False):
    sharing_id: str
    zone: dict


class LivednsDomainUpdateDataRequired(TypedDict):
    fqdn: str


class LivednsDomainUpdateData(LivednsDomainUpdateDataRequired, total=False):
    automatic_snapshots: bool


class LivednsKey(TypedDict):
    algorithm: int
    algorithm_name: str
    deleted: bool
    ds: str
    fingerprint: str
    flags: int
    fqdn: str
    id: str
    key_href: str
    message: str
    public_key: str
    status: str
    tag: int


class LivednsKeyLoadMatch(TypedDict):
    fqdn: str
    id: str


class LivednsKeyListMatch(TypedDict):
    fqdn: str


class LivednsKeyCreateData(TypedDict):
    fqdn: str
    flags: int


class LivednsKeyUpdateDataRequired(TypedDict):
    fqdn: str
    id: str


class LivednsKeyUpdateData(LivednsKeyUpdateDataRequired, total=False):
    deleted: bool


class LivednsKeyRemoveMatch(TypedDict):
    fqdn: str
    id: str


class LivednsNameserver(TypedDict):
    pass


class LivednsNameserverListMatch(TypedDict):
    fqdn: str


class LivednsRecordRequired(TypedDict):
    message: str
    rrset_href: str
    rrset_name: str
    rrset_type: str
    rrset_values: list


class LivednsRecord(LivednsRecordRequired, total=False):
    add_rrset_values: list
    id: str
    remove_rrset_values: list
    rrset_ttl: int


class LivednsRecordLoadMatch(TypedDict):
    fqdn: str
    rrset_name: str
    rrset_type: str


class LivednsRecordListMatchRequired(TypedDict):
    fqdn: str


class LivednsRecordListMatch(LivednsRecordListMatchRequired, total=False):
    page: int
    per_page: int
    rrset_type: str
    sort_by: str


class LivednsRecordCreateDataRequired(TypedDict):
    fqdn: str
    rrset_values: list


class LivednsRecordCreateData(LivednsRecordCreateDataRequired, total=False):
    rrset_name: str
    rrset_type: str
    rrset_ttl: int


class LivednsRecordUpdateDataRequired(TypedDict):
    fqdn: str
    rrset_name: str
    rrset_type: str


class LivednsRecordUpdateData(LivednsRecordUpdateDataRequired, total=False):
    rrset_ttl: int
    rrset_values: list


class LivednsRecordPatchDataRequired(TypedDict):
    fqdn: str
    rrset_name: str
    rrset_type: str


class LivednsRecordPatchData(LivednsRecordPatchDataRequired, total=False):
    add_rrset_values: list
    remove_rrset_values: list
    rrset_ttl: int


class LivednsRecordRemoveMatch(TypedDict):
    fqdn: str
    rrset_name: str
    rrset_type: str


class LivednsRrtype(TypedDict):
    pass


class LivednsRrtypeListMatch(TypedDict):
    pass


class LivednsSnapshot(TypedDict):
    automatic: bool
    created_at: str
    href: str
    id: str
    message: str
    name: str
    zone_data: list


class LivednsSnapshotLoadMatch(TypedDict):
    fqdn: str
    id: str


class LivednsSnapshotListMatchRequired(TypedDict):
    fqdn: str


class LivednsSnapshotListMatch(LivednsSnapshotListMatchRequired, total=False):
    automatic: bool
    page: int
    per_page: int
    sort_by: str


class LivednsSnapshotCreateDataRequired(TypedDict):
    fqdn: str


class LivednsSnapshotCreateData(LivednsSnapshotCreateDataRequired, total=False):
    name: str


class LivednsSnapshotUpdateDataRequired(TypedDict):
    fqdn: str
    id: str


class LivednsSnapshotUpdateData(LivednsSnapshotUpdateDataRequired, total=False):
    name: str


class LivednsSnapshotRemoveMatch(TypedDict):
    fqdn: str
    id: str


class LivednsTsigKey(TypedDict):
    config_samples: dict
    href: str
    id: str
    key_name: str
    secret: str


class LivednsTsigKeyLoadMatchRequired(TypedDict):
    id: str


class LivednsTsigKeyLoadMatch(LivednsTsigKeyLoadMatchRequired, total=False):
    sharing_id: str


class LivednsTsigKeyListMatch(TypedDict, total=False):
    sharing_id: str


class LivednsTsigKeyCreateDataRequired(TypedDict):
    config_samples: dict
    href: str
    id: str
    key_name: str
    secret: str


class LivednsTsigKeyCreateData(LivednsTsigKeyCreateDataRequired, total=False):
    sharing_id: str


class LivednsZoneRequired(TypedDict):
    items: list
    message: str


class LivednsZone(LivednsZoneRequired, total=False):
    remove_apex_ns: bool


class LivednsZoneUpdateDataRequired(TypedDict):
    fqdn: str


class LivednsZoneUpdateData(LivednsZoneUpdateDataRequired, total=False):
    items: list
    remove_apex_ns: bool


class LivednsZoneRemoveMatch(TypedDict):
    fqdn: str


class MailboxRequired(TypedDict):
    address: str
    antispam: bool
    autorenew: dict
    config: dict
    config_name: str
    created_at: str
    data_access: bool
    domain_part: str
    email: str
    expires_at: str
    internal_domain: bool
    last_paid_duration: int
    local_part: str
    message: str
    owner: dict
    password: str
    quota: int
    quota_used: int
    responder: dict
    updated_at: str
    uuid: str


class Mailbox(MailboxRequired, total=False):
    aliases: list
    duration_month: int
    issues: list


class MailboxLoadMatchRequired(TypedDict):
    address: str


class MailboxLoadMatch(MailboxLoadMatchRequired, total=False):
    sharing_id: str


class MailboxListMatch(TypedDict, total=False):
    address: str
    domain_part: str
    local_part: str
    page: int
    per_page: int
    search: str
    sharing_id: str
    sort_by: str


class MailboxCreateDataRequired(TypedDict):
    config_name: str
    email: str
    password: str


class MailboxCreateData(MailboxCreateDataRequired, total=False):
    sharing_id: str
    aliases: list
    duration_month: int


class MailboxUpdateDataRequired(TypedDict):
    address: str


class MailboxUpdateData(MailboxUpdateDataRequired, total=False):
    aliases: list
    antispam: bool
    autorenew: dict
    config_name: str
    password: str
    responder: dict


class MailboxRemoveMatchRequired(TypedDict):
    address: str


class MailboxRemoveMatch(MailboxRemoveMatchRequired, total=False):
    sharing_id: str


class MailboxDomainRequired(TypedDict):
    antispam: bool
    configuration: list
    dkim: bool
    fqdns: list
    internal: bool
    is_livedns: bool
    mx: bool
    owner: dict
    spf: bool
    txt: bool


class MailboxDomain(MailboxDomainRequired, total=False):
    date_last_validation: str


class MailboxDomainLoadMatch(TypedDict):
    domain: str


class MailboxDomainListMatch(TypedDict, total=False):
    page: int
    per_page: int


class MailboxDomainCreateDataRequired(TypedDict):
    domain: str


class MailboxDomainCreateData(MailboxDomainCreateDataRequired, total=False):
    records_to_validate: Any


class MailboxForward(TypedDict):
    destinations: list
    message: str
    source: str


class MailboxForwardListMatch(TypedDict, total=False):
    page: int
    per_page: int
    search: str
    sharing_id: str
    sort_by: str


class MailboxForwardCreateData(TypedDict):
    destinations: list
    source: str


class MailboxForwardUpdateDataRequired(TypedDict):
    source: str


class MailboxForwardUpdateData(MailboxForwardUpdateDataRequired, total=False):
    destinations: list


class MailboxForwardRemoveMatch(TypedDict):
    source: str


class MailboxProductRequired(TypedDict):
    config: list
    config_name: str
    description: str
    duration_month: int
    label: str
    message: str
    prices: list
    quantity: int
    taxes: list
    uuid: str


class MailboxProduct(MailboxProductRequired, total=False):
    autorenew: bool


class MailboxProductListMatch(TypedDict, total=False):
    sharing_id: str


class MailboxProductCreateDataRequired(TypedDict):
    config_name: str
    duration_month: int
    quantity: int


class MailboxProductCreateData(MailboxProductCreateDataRequired, total=False):
    sharing_id: str
    autorenew: bool


class MailboxQuota(TypedDict):
    annually: dict
    config_name: str
    label: str
    monthly: dict
    quota: str


class MailboxQuotaListMatch(TypedDict, total=False):
    sharing_id: str


class MailboxSlotRequired(TypedDict):
    autorenew: dict
    config: dict
    refund_info: dict
    refundable: bool
    uuid: str
    webhosting_pack: bool


class MailboxSlot(MailboxSlotRequired, total=False):
    expires_at: str
    last_paid_duration: int


class MailboxSlotLoadMatch(TypedDict):
    uuid: str


class MailboxSlotListMatch(TypedDict, total=False):
    config_name: str
    expires_at_gte: str
    expires_at_lte: str
    last_paid_duration: int
    page: int
    per_page: int
    refundable: str
    sharing_id: str
    sort_by: str
    webhosting_pack: bool


class OrganizationRequired(TypedDict):
    city: str
    corporate: bool
    country: str
    email: str
    firstname: str
    id: str
    lastname: str
    message: str
    name: str
    reseller: bool
    streetaddr: str
    type: str
    zip: str


class Organization(OrganizationRequired, total=False):
    fax: str
    lang: str
    orgname: str
    phone: str
    reference: str
    siren: str
    state: str
    streetaddr2: str
    vat_number: str


class OrganizationLoadMatch(TypedDict):
    id: str


OrganizationListMatch = TypedDict('OrganizationListMatch', {
    "name": str,
    "permission": str,
    "sort_by": str,
    "type": str,
    "~name": str,
}, total=False)


class OrganizationCreateDataRequired(TypedDict):
    city: str
    email: str
    firstname: str
    lastname: str
    name: str
    orgname: str
    phone: str
    streetaddr: str
    type: str


class OrganizationCreateData(OrganizationCreateDataRequired, total=False):
    country: str
    fax: str
    lang: str
    reference: str
    reseller: bool
    siren: str
    state: str
    streetaddr2: str
    vat_number: str
    zip: str


class OrganizationUpdateDataRequired(TypedDict):
    id: str


class OrganizationUpdateData(OrganizationUpdateDataRequired, total=False):
    city: str
    country: str
    email: str
    fax: str
    firstname: str
    lang: str
    lastname: str
    name: str
    phone: str
    reference: str
    reseller: bool
    siren: str
    state: str
    streetaddr: str
    streetaddr2: str
    vat_number: str
    zip: str


class OrganizationRemoveMatch(TypedDict):
    id: str


class OrganizationCustomerRequired(TypedDict):
    city: str
    country: str
    email: str
    firstname: str
    id: str
    lastname: str
    message: str
    name: str
    streetaddr: str
    type: str


class OrganizationCustomer(OrganizationCustomerRequired, total=False):
    fax: str
    lang: str
    orgname: str
    phone: str
    reference: str
    siren: str
    state: str
    streetaddr2: str
    sync_contact_email: str
    vat_number: str
    zip: str


class OrganizationCustomerLoadMatch(TypedDict):
    id: str
    org_id: str


class OrganizationCustomerListMatchRequired(TypedDict):
    org_id: str


class OrganizationCustomerListMatch(OrganizationCustomerListMatchRequired, total=False):
    name: str
    page: int
    per_page: int
    permission: str
    sort_by: str


class OrganizationCustomerCreateDataRequired(TypedDict):
    org_id: str
    city: str
    country: str
    email: str
    firstname: str
    lastname: str
    phone: str
    streetaddr: str
    type: str


class OrganizationCustomerCreateData(OrganizationCustomerCreateDataRequired, total=False):
    fax: str
    orgname: str
    reference: str
    state: str
    streetaddr2: str
    zip: str


class OrganizationCustomerUpdateDataRequired(TypedDict):
    id: str
    org_id: str


class OrganizationCustomerUpdateData(OrganizationCustomerUpdateDataRequired, total=False):
    city: str
    country: str
    email: str
    fax: str
    firstname: str
    lang: str
    lastname: str
    phone: str
    reference: str
    siren: str
    state: str
    streetaddr: str
    streetaddr2: str
    sync_contact_email: str
    vat_number: str
    zip: str


class OrganizationCustomerRemoveMatch(TypedDict):
    id: str
    org_id: str


class Template(TypedDict):
    description: str
    editable: bool
    href: str
    id: str
    name: str
    namespaces: list
    orgname: str
    payload: dict
    sharing_space: dict
    variables: list


class TemplateLoadMatch(TypedDict):
    id: str


class TemplateListMatch(TypedDict, total=False):
    page: int
    per_page: int


class TemplateCreateDataRequired(TypedDict):
    name: str
    payload: dict


class TemplateCreateData(TemplateCreateDataRequired, total=False):
    sharing_id: str
    description: str


class TemplateUpdateDataRequired(TypedDict):
    id: str


class TemplateUpdateData(TemplateUpdateDataRequired, total=False):
    description: str
    name: str
    payload: dict


class TemplateRemoveMatch(TypedDict):
    id: str


class TemplateDispatchRequired(TypedDict):
    attempt: int
    created_at: str
    dispatch_href: str
    id: str
    message: str
    object_id: str
    object_type: str
    payload: dict
    sharing_id: str
    state: int
    target: dict
    target_id: str
    target_type: str
    task_history: list
    task_status: dict


class TemplateDispatch(TemplateDispatchRequired, total=False):
    state_msg: str
    task_updated_at: str
    template_id: str
    template_name: str


class TemplateDispatchLoadMatch(TypedDict):
    id: str


class TemplateDispatchCreateData(TypedDict):
    template_id: str
    object_id: str
    object_type: str


class Tld(TypedDict):
    authinfo_for_transfer: bool
    category: str
    change_owner: bool
    corporate: bool
    ext_trade: bool
    full_tld: str
    href: str
    lock: bool
    name: str


class TldLoadMatch(TypedDict):
    name: str


class TldListMatch(TypedDict, total=False):
    category: str
    page: int
    per_page: int


class UserRequired(TypedDict):
    city: str
    email: str
    id: str
    lang: str
    name: str
    username: str


class User(UserRequired, total=False):
    country: str
    fax: str
    firstname: str
    lastname: str
    phone: str
    state: str
    streetaddr: str
    streetaddr2: str
    zip: str


class UserLoadMatchRequired(TypedDict):
    id: str


class UserLoadMatch(UserLoadMatchRequired, total=False):
    city: str
    country: str
    email: str
    fax: str
    firstname: str
    lang: str
    lastname: str
    name: str
    phone: str
    state: str
    streetaddr: str
    streetaddr2: str
    username: str
    zip: str
