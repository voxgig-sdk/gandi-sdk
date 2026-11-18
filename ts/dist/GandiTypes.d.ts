export interface AccessToken {
    access_token: string;
    entities: any[];
    expires_at: string;
    id: string;
    name: string;
    scopes: any[];
}
export interface AccessTokenCreateData {
    expires_at?: string;
    name?: string;
}
export interface AcmeAccount {
    created_at: string;
    deleted_at: string;
    external_id: string;
    id: string;
    ip: string;
    last_activity: string;
    status: string;
    subscription_id: string;
}
export interface AcmeAccountLoadMatch {
    id: string;
    subscription_id: string;
    sharing_id: string;
}
export interface AcmeAccountListMatch {
    subscription_id: string;
    sharing_id: string;
}
export interface AcmeDomain {
    created_at: string;
    deleted_at: string;
    hostname: string;
    hostname_ulabel: string;
    is_wildcard: boolean;
    status: string;
    subscription_id: string;
}
export interface AcmeDomainLoadMatch {
    domain_id: number;
    subscription_id: string;
    sharing_id: string;
}
export interface AcmeDomainListMatch {
    subscription_id: string;
    domain: string;
    sharing_id: string;
}
export interface AcmePrice {
    country: string;
    currency: string;
    domains: any[];
    duration: string;
    duration_unit: string;
    grid: string;
    max_duration: number;
    min_duration: number;
    price_after_taxes: string;
    price_before_taxes: string;
    process: string;
    product: Record<string, any>;
    provider: string;
    tax_rate: string;
    taxes: any[];
    validation_type: string;
}
export interface AcmePriceListMatch {
    country: string;
    currency: string;
    duration: string;
    grid: string;
    process: string;
    provider: string;
    sharing_id: string;
    validation_type: string;
}
export interface AcmePriceCreateData {
    sharing_id: string;
    country: string;
    currency: string;
    domains: any[];
    duration: string;
    grid: string;
    process: string;
    provider: string;
    validation_type: string;
}
export interface AcmeSubscription {
    country: string;
    created_at: string;
    currency: string;
    domains: any[];
    duration: number;
    eab_hmac: string;
    eab_id: string;
    ends_at: string;
    grid: string;
    message: string;
    name: string;
    provider: string;
    server_url: string;
    status: string;
    subscription_id: string;
    validation_type: string;
    years: string;
}
export interface AcmeSubscriptionLoadMatch {
    subscription_id: string;
    sharing_id: string;
}
export interface AcmeSubscriptionListMatch {
    created_at: string;
    ends_at: string;
    name: string;
    provider: string;
    sharing_id: string;
    status: string;
    validation_type: string;
    year: string;
}
export interface AcmeSubscriptionCreateData {
    sharing_id: string;
    country: string;
    currency: string;
    domains: any[];
    duration: number;
    grid: string;
    name: string;
    provider: string;
    validation_type: string;
}
export interface AcmeSubscriptionUpdateData {
    subscription_id: string;
    sharing_id: string;
    name?: string;
    $action?: string;
    [action: string]: any;
}
export interface AcmeSubscriptionRemoveMatch {
    subscription_id: string;
    sharing_id: string;
}
export interface BillingInfo {
    annual_balance: number;
    grid: string;
    outstanding_amount: number;
    prepaid: Record<string, any>;
    prepaid_monthly_invoice?: boolean;
}
export interface BillingInfoLoadMatch {
    sharing_id: string;
}
export interface BillingPrice {
    currency: string;
    grid: string;
    products: any[];
    taxes: any[];
}
export interface BillingPriceLoadMatch {
    type: string;
    active_phase?: boolean;
    country?: string;
    currency?: string;
    discount?: any[];
    duration_unit?: string;
    extension?: string;
    feature?: boolean;
    grid?: string;
    lang?: string;
    max_duration?: number;
    name: any[];
    page?: number;
    per_page?: number;
    prices_at?: string;
    process: any[];
    sharing_id?: string;
}
export interface CertificateDcv {
    message: string;
    method: string;
}
export interface CertificateDcvUpdateData {
    certificate_id: string;
    sharing_id?: string;
    message?: string;
    method?: string;
}
export interface CertificateDcvPatchData {
    certificate_id: string;
    sharing_id?: string;
    method?: string;
}
export interface CertificatePackage {
    category: Record<string, any>;
    href: string;
    max_domains: number;
    min_domains: number;
    name: string;
    provider: string;
    sgc: boolean;
    trustlogo: boolean;
    warranty: number;
    wildcard: boolean;
}
export interface CertificatePackageLoadMatch {
    name: string;
}
export interface CertificatePackageListMatch {
    category?: string;
    max_domain?: number;
    min_domain?: number;
    page?: number;
    per_page?: number;
    trustlogo?: boolean;
    warranty?: number;
    wildcard?: boolean;
}
export interface CertificatePem {
}
export interface CertificatePemLoadMatch {
    type: string;
    provider?: string;
}
export interface CertificateRenewal {
    csr?: string;
    dcv_method?: string;
    duration?: number;
    errors?: any[];
    status: string;
}
export interface CertificateRenewalCreateData {
    certificate_id: string;
    sharing_id?: string;
    csr?: string;
    dcv_method?: string;
    duration?: number;
}
export interface CertificateTag {
    add: any[];
    message: string;
    remove: any[];
    tag: string;
    tags: any[];
}
export interface CertificateTagListMatch {
    certificate_id: string;
}
export interface CertificateTagCreateData {
    certificate_id: string;
    tag: string;
}
export interface CertificateTagUpdateData {
    certificate_id: string;
    tags?: any[];
}
export interface CertificateTagPatchData {
    certificate_id: string;
    add?: any[];
    remove?: any[];
}
export interface CertificateTagRemoveMatch {
    certificate_id: string;
}
export interface Comment {
    content: string;
    created_at?: string;
    errors?: any[];
    id: string;
    status: string;
    updated_at?: string;
    user: Record<string, any>;
}
export interface CommentLoadMatch {
    entity_id: string;
}
export interface CommentCreateData {
    entity_id: string;
    content: string;
}
export interface CommentRemoveMatch {
    entity_id: string;
}
export interface Domain {
    admin: Record<string, any>;
    authinfo?: string;
    autorenew: Record<string, any>;
    bill: Record<string, any>;
    can_tld_lock: boolean;
    claims?: string;
    contacts: Record<string, any>;
    currency?: string;
    dates: Record<string, any>;
    domain_owner: string;
    duration?: number;
    enforce_premium?: boolean;
    errors?: any[];
    extra_parameters?: Record<string, any>;
    fqdn: string;
    fqdn_unicode: string;
    href: string;
    id?: string;
    lang?: string;
    mailbox_optin?: boolean;
    nameserver: Record<string, any>;
    nameservers: any[];
    nameservers_ips?: Record<string, any>;
    orga_owner: string;
    owner: Record<string, any>;
    price?: number;
    reachability: string;
    resellee_id?: string;
    services: any[];
    sharing_id?: string;
    sharing_space: Record<string, any>;
    smd?: string;
    status: any[];
    tags?: any[];
    tech: Record<string, any>;
    template_id?: string;
    tld: string;
    tld_period?: string;
    trustee_roles?: any[];
}
export interface DomainLoadMatch {
    fqdn: string;
    $action?: string;
    [action: string]: any;
}
export interface DomainListMatch {
    fqdn?: string;
    nameserver?: string;
    page?: number;
    per_page?: number;
    resellee_id?: string;
    sharing_id?: string;
    sort_by?: string;
    tld?: string;
}
export interface DomainCreateData {
    sharing_id?: string;
    admin: Record<string, any>;
    bill: Record<string, any>;
    claims?: string;
    currency?: string;
    duration?: number;
    enforce_premium?: boolean;
    extra_parameters?: Record<string, any>;
    fqdn: string;
    lang?: string;
    mailbox_optin?: boolean;
    nameservers?: any[];
    nameservers_ips?: Record<string, any>;
    owner: Record<string, any>;
    price?: number;
    resellee_id?: string;
    smd?: string;
    tech: Record<string, any>;
    template_id?: string;
    tld_period?: string;
    $action?: string;
    [action: string]: any;
}
export interface DomainUpdateData {
    fqdn: string;
    admin?: Record<string, any>;
    authinfo?: string;
    autorenew?: Record<string, any>;
    bill?: Record<string, any>;
    can_tld_lock?: boolean;
    claims?: string;
    contacts?: Record<string, any>;
    currency?: string;
    dates?: Record<string, any>;
    domain_owner?: string;
    duration?: number;
    enforce_premium?: boolean;
    errors?: any[];
    extra_parameters?: Record<string, any>;
    fqdn_unicode?: string;
    href?: string;
    id?: string;
    lang?: string;
    mailbox_optin?: boolean;
    nameserver?: Record<string, any>;
    nameservers?: any[];
    nameservers_ips?: Record<string, any>;
    orga_owner?: string;
    owner?: Record<string, any>;
    price?: number;
    reachability?: string;
    resellee_id?: string;
    services?: any[];
    sharing_id?: string;
    sharing_space?: Record<string, any>;
    smd?: string;
    status?: any[];
    tags?: any[];
    tech?: Record<string, any>;
    template_id?: string;
    tld?: string;
    tld_period?: string;
    trustee_roles?: any[];
    action?: any;
    clientTransferProhibited?: any;
    enabled?: any;
    org_id?: any;
    $action?: string;
    [action: string]: any;
}
export interface DomainRemoveMatch {
    fqdn: string;
}
export interface DomainAvailability {
    currency: string;
    grid: string;
    products: any[];
    taxes: any[];
}
export interface DomainAvailabilityLoadMatch {
    country?: string;
    currency?: string;
    duration_unit?: string;
    extension?: string;
    grid?: string;
    lang?: string;
    max_duration?: number;
    name: string;
    period?: string;
    process?: any[];
    sharing_id?: string;
}
export interface DomainChangeOwner {
    admin: Record<string, any>;
    bill: Record<string, any>;
    created_at: string;
    date_start?: string;
    errors?: any[];
    errortype?: string;
    errortype_label?: string;
    foa?: any[];
    inner_step?: string;
    owner: Record<string, any>;
    params: Record<string, any>;
    status: string;
    step: string;
    step_nb: number;
    tech: Record<string, any>;
    updated_at: string;
}
export interface DomainChangeOwnerLoadMatch {
    domain: string;
    sharing_id?: string;
}
export interface DomainChangeOwnerCreateData {
    domain: string;
    sharing_id?: string;
    admin: Record<string, any>;
    bill: Record<string, any>;
    owner: Record<string, any>;
    tech: Record<string, any>;
    $action?: string;
    [action: string]: any;
}
export interface DomainClaim {
    claims: any[];
    created_at: string;
    expires_at: string;
    fqdn: string;
    fqdn_alabel: string;
    fqdn_ulabel: string;
    notice_id: string;
    status: string;
}
export interface DomainClaimLoadMatch {
    domain: string;
}
export interface DomainClaimCreateData {
    domain: string;
    claims: any[];
    created_at: string;
    expires_at: string;
    fqdn: string;
    fqdn_alabel: string;
    fqdn_ulabel: string;
    notice_id: string;
    status: string;
}
export interface DomainContact {
    admin: Record<string, any>;
    bill: Record<string, any>;
    message: string;
    owner: Record<string, any>;
    tech: Record<string, any>;
}
export interface DomainContactLoadMatch {
    domain: string;
}
export interface DomainContactUpdateData {
    domain: string;
    admin?: Record<string, any>;
    bill?: Record<string, any>;
    tech?: Record<string, any>;
    $action?: string;
    [action: string]: any;
}
export interface DomainDnskey {
    algorithm: number;
    digest: string;
    digest_type: number;
    href: string;
    id: number;
    keys: any[];
    keytag: number;
    message: string;
    public_key: string;
    type: string;
}
export interface DomainDnskeyListMatch {
    domain: string;
    page?: number;
    per_page?: number;
}
export interface DomainDnskeyCreateData {
    domain: string;
    algorithm: number;
    public_key: string;
    type: string;
}
export interface DomainDnskeyUpdateData {
    domain: string;
    keys?: any[];
}
export interface DomainDnskeyRemoveMatch {
    domain: string;
    id: string;
}
export interface DomainDnssec {
    error?: string;
    state: string;
}
export interface DomainDnssecLoadMatch {
    domain: string;
}
export interface DomainDnssecCreateData {
    domain: string;
    sharing_id?: string;
    error?: string;
    state: string;
}
export interface DomainDnssecRemoveMatch {
    domain: string;
    sharing_id?: string;
}
export interface DomainHost {
    fqdn: string;
    fqdn_unicode: string;
    href: string;
    ips: any[];
    message: string;
    name: string;
}
export interface DomainHostLoadMatch {
    domain: string;
    name: string;
}
export interface DomainHostListMatch {
    domain: string;
    page?: number;
    per_page?: number;
}
export interface DomainHostCreateData {
    domain: string;
    page?: number;
    per_page?: number;
    ips: any[];
    name: string;
}
export interface DomainHostUpdateData {
    domain: string;
    name: string;
    ips?: any[];
}
export interface DomainHostRemoveMatch {
    domain: string;
    name: string;
}
export interface DomainLivedns {
    current: string;
    dnssec_available?: boolean;
    livednssec_available?: boolean;
    message: string;
    nameservers: any[];
}
export interface DomainLivednsLoadMatch {
    domain: string;
}
export interface DomainLivednsCreateData {
    domain: string;
    current: string;
    dnssec_available?: boolean;
    livednssec_available?: boolean;
    message: string;
    nameservers: any[];
}
export interface DomainNameserver {
    message: string;
    nameservers: any[];
}
export interface DomainNameserverListMatch {
    domain: string;
}
export interface DomainNameserverUpdateData {
    domain: string;
    nameservers?: any[];
}
export interface DomainTag {
    add: any[];
    message: string;
    remove: any[];
    tag: string;
    tags: any[];
}
export interface DomainTagListMatch {
    domain: string;
}
export interface DomainTagCreateData {
    domain: string;
    tag: string;
}
export interface DomainTagUpdateData {
    domain: string;
    tags?: any[];
}
export interface DomainTagPatchData {
    domain: string;
    add?: any[];
    remove?: any[];
}
export interface DomainTagRemoveMatch {
    domain: string;
}
export interface DomainTransfer {
    admin: Record<string, any>;
    authinfo?: string;
    bill: Record<string, any>;
    change_owner?: boolean;
    created_at: string;
    currency?: string;
    duration?: number;
    enforce_premium?: boolean;
    errors?: any[];
    errortype?: string;
    errortype_label?: string;
    extra_parameters?: Record<string, any>;
    foa?: any[];
    fqdn: string;
    inner_step?: string;
    mailbox_optin?: boolean;
    message: string;
    nameservers?: any[];
    nameservers_ips?: Record<string, any>;
    owner: Record<string, any>;
    owner_contact: string;
    params: Record<string, any>;
    price?: number;
    regac_at?: string;
    resellee_id?: string;
    start_at?: string;
    status: string;
    step: string;
    step_nb: number;
    tech: Record<string, any>;
    template_id?: string;
    transfer_link?: string;
    transfer_procedure?: string;
    updated_at: string;
}
export interface DomainTransferLoadMatch {
    domain: string;
}
export interface DomainTransferCreateData {
    sharing_id?: string;
    admin: Record<string, any>;
    authinfo?: string;
    bill: Record<string, any>;
    change_owner?: boolean;
    currency?: string;
    duration?: number;
    enforce_premium?: boolean;
    extra_parameters?: Record<string, any>;
    fqdn: string;
    mailbox_optin?: boolean;
    nameservers?: any[];
    nameservers_ips?: Record<string, any>;
    owner: Record<string, any>;
    price?: number;
    resellee_id?: string;
    tech: Record<string, any>;
    template_id?: string;
    $action?: string;
    [action: string]: any;
}
export interface DomainTransferUpdateData {
    domain: string;
    admin?: Record<string, any>;
    authinfo?: string;
    bill?: Record<string, any>;
    change_owner?: boolean;
    created_at?: string;
    currency?: string;
    duration?: number;
    enforce_premium?: boolean;
    errors?: any[];
    errortype?: string;
    errortype_label?: string;
    extra_parameters?: Record<string, any>;
    foa?: any[];
    fqdn?: string;
    inner_step?: string;
    mailbox_optin?: boolean;
    message?: string;
    nameservers?: any[];
    nameservers_ips?: Record<string, any>;
    owner?: Record<string, any>;
    owner_contact?: string;
    params?: Record<string, any>;
    price?: number;
    regac_at?: string;
    resellee_id?: string;
    start_at?: string;
    status?: string;
    step?: string;
    step_nb?: number;
    tech?: Record<string, any>;
    template_id?: string;
    transfer_link?: string;
    transfer_procedure?: string;
    updated_at?: string;
    $action?: string;
    [action: string]: any;
}
export interface DomainWebredir {
    cert_status?: string;
    cert_uuid?: string;
    created_at?: string;
    host: string;
    message: string;
    override: boolean;
    protocol?: string;
    type: string;
    updated_at?: string;
    url: string;
}
export interface DomainWebredirLoadMatch {
    domain: string;
    host: string;
}
export interface DomainWebredirListMatch {
    domain: string;
    page?: number;
    per_page?: number;
}
export interface DomainWebredirCreateData {
    domain: string;
    page?: number;
    per_page?: number;
    host: string;
    override: boolean;
    protocol: string;
    type: string;
    url: string;
}
export interface DomainWebredirUpdateData {
    domain: string;
    host: string;
    override?: boolean;
    protocol?: string;
    type?: string;
    url?: string;
}
export interface DomainWebredirRemoveMatch {
    domain: string;
    host: string;
}
export interface EmailForward {
    destinations: any[];
    href: string;
    id?: string;
    message: string;
    source: string;
}
export interface EmailForwardListMatch {
    domain: string;
    destination?: string;
    page?: number;
    per_page?: number;
    sort_by?: string;
    source?: string;
}
export interface EmailForwardCreateData {
    domain: string;
    destinations: any[];
    source: string;
}
export interface EmailForwardUpdateData {
    domain: string;
    source: string;
    destinations?: any[];
}
export interface EmailForwardRemoveMatch {
    domain: string;
    source: string;
}
export interface EmailMailbox {
    address: string;
    alias_count?: number;
    aliases: any[];
    antispam: boolean;
    autorenew: Record<string, any>;
    domain: string;
    errors?: any[];
    expires_at: string;
    fallback_email?: string;
    href: string;
    id: string;
    login: string;
    mailbox_type: string;
    message: string;
    password: string;
    quota_used: number;
    responder?: Record<string, any>;
    status: string;
    to_convert: boolean;
}
export interface EmailMailboxLoadMatch {
    domain: string;
    id: string;
}
export interface EmailMailboxListMatch {
    domain: string;
    "<created_at"?: string;
    antispam?: boolean;
    login?: string;
    mailbox_type?: string;
    page?: number;
    per_page?: number;
    "~login"?: string;
}
export interface EmailMailboxCreateData {
    domain: string;
    aliases?: any[];
    antispam?: boolean;
    login: string;
    mailbox_type: string;
    password: string;
    $action?: string;
    [action: string]: any;
}
export interface EmailMailboxUpdateData {
    domain: string;
    id: string;
    sharing_id?: string;
    aliases?: any[];
    antispam?: boolean;
    autorenew?: Record<string, any>;
    login?: string;
    mailbox_type?: string;
    password?: string;
    responder?: Record<string, any>;
}
export interface EmailMailboxRemoveMatch {
    domain: string;
    id: string;
    $action?: string;
    [action: string]: any;
}
export interface EmailMigration {
    available: boolean;
    currency: string;
    forward_count: number;
    free_mailboxes: number;
    included_mailboxes: number;
    info: any[];
    message: string;
    packmail: boolean;
    price_v1: number;
    price_v2: number;
    quota_v1: number;
    token: string;
    usage_v1: number;
}
export interface EmailMigrationLoadMatch {
    domain: string;
    sharing_id?: string;
}
export interface EmailMigrationCreateData {
    domain: string;
    sharing_id?: string;
    token: string;
}
export interface EmailOffer {
    antispam: string;
    dkim: string;
    message: string;
    status: string;
    version: number;
}
export interface EmailOfferLoadMatch {
    domain: string;
}
export interface EmailOfferUpdateData {
    domain: string;
    antispam?: string;
    dkim?: string;
}
export interface EmailSlot {
    autorenew?: boolean;
    capacity: number;
    created_at: string;
    duration: number;
    gandi_id: number;
    href: string;
    id: string;
    mailbox_type: string;
    refund_amount?: number;
    refund_currency?: string;
    refundable: boolean;
    status: string;
}
export interface EmailSlotLoadMatch {
    domain: string;
    id: number;
}
export interface EmailSlotListMatch {
    domain: string;
    display_not_expired_and_inactive?: boolean;
}
export interface EmailSlotCreateData {
    domain: string;
    sharing_id?: string;
    autorenew?: boolean;
    duration: number;
    mailbox_type: string;
}
export interface EmailSlotRemoveMatch {
    domain: string;
    id: number;
}
export interface HostingApplication {
    name: string;
    name_label: string;
    requirements: any[];
}
export interface HostingApplicationLoadMatch {
    name: string;
}
export interface HostingApplicationListMatch {
    database?: string;
    language?: string;
    name?: string;
    page?: number;
    per_page?: number;
    sharing_id?: string;
    sort_by?: string;
}
export interface HostingInstance {
    access_information: Record<string, any>;
    authentication: Record<string, any>;
    autorenew: Record<string, any>;
    available_upgrade: boolean;
    booster?: Record<string, any>;
    booster_options?: Record<string, any>;
    compatible_applications?: any[];
    console: Record<string, any>;
    cpu: number;
    created_at: string;
    database: Record<string, any>;
    datacenter: Record<string, any>;
    domain?: string;
    duration?: number;
    duration_unit?: string;
    errors?: any[];
    expire_at: string;
    id: string;
    language: Record<string, any>;
    language_id?: string;
    location: string;
    message: string;
    name: string;
    password?: string;
    password_updated_at?: string;
    ram: Record<string, any>;
    sharing_space: Record<string, any>;
    size: string;
    snapshot_enabled: boolean;
    status: string;
    storage: Record<string, any>;
    storage_additional_size?: number;
    subscription_cancelled?: boolean;
    type: Record<string, any>;
    upgrade_to?: any[];
    vhosts: any[];
}
export interface HostingInstanceLoadMatch {
    id: string;
    $action?: string;
    [action: string]: any;
}
export interface HostingInstanceListMatch {
    fqdn?: string;
    name?: string;
    page?: number;
    per_page?: number;
    sharing_id?: string;
    size?: string;
    sort_by?: string;
    status?: string;
}
export interface HostingInstanceCreateData {
    sharing_id?: string;
    authentication: Record<string, any>;
    autorenew?: Record<string, any>;
    domain: string;
    duration?: number;
    duration_unit?: string;
    location: string;
    name?: string;
    size: string;
    snapshot_enabled?: boolean;
    storage_additional_size?: number;
    type: Record<string, any>;
    vhosts?: any[];
    $action?: string;
    [action: string]: any;
}
export interface HostingInstanceUpdateData {
    id: string;
    booster?: Record<string, any>;
    booster_options?: Record<string, any>;
    language_id?: string;
    name?: string;
    password?: string;
    size?: string;
    snapshot_enabled?: boolean;
    storage_additional_size?: number;
}
export interface HostingInstanceRemoveMatch {
    id: string;
}
export interface HostingVhost {
    application: Record<string, any>;
    created_at: string;
    deployment: Record<string, any>;
    fqdn: string;
    https_strategy?: string;
    is_a_test_vhost: boolean;
    linked_dns_zone: Record<string, any>;
    status: string;
    tls_validated_at?: string;
}
export interface HostingVhostLoadMatch {
    fqdn: string;
    instance_id: string;
}
export interface HostingVhostListMatch {
    instance_id: string;
    fqdn?: string;
    page?: number;
    per_page?: number;
    sort_by?: string;
    status?: string;
}
export interface HostingVhostCreateData {
    instance_id: string;
    application: Record<string, any>;
    fqdn: string;
    linked_dns_zone: Record<string, any>;
}
export interface HostingVhostUpdateData {
    fqdn: string;
    instance_id: string;
    application?: Record<string, any>;
    https_strategy?: string;
    linked_dns_zone?: Record<string, any>;
}
export interface HostingVhostRemoveMatch {
    fqdn: string;
    instance_id: string;
    $action?: string;
    [action: string]: any;
}
export interface IssuedCertificate {
    altnames: any[];
    altnames_unicode: any[];
    apex_only?: boolean;
    assumed_name?: string;
    business_category?: string;
    card_pay_trustlogo?: boolean;
    cert?: string;
    cn: string;
    cn_unicode: string;
    contact: Record<string, any>;
    csr?: string;
    dates: Record<string, any>;
    dcv_method?: string;
    duration?: number;
    error_msg?: string;
    errors?: any[];
    href?: string;
    id: string;
    ida?: Record<string, any>;
    intermediate?: string;
    joi?: Record<string, any>;
    middleman?: Record<string, any>;
    owner?: string;
    package: Record<string, any>;
    provider: string;
    reissuable?: boolean;
    renewable?: boolean;
    resellee_id?: string;
    sha_version?: number;
    sharing_id?: string;
    software: number;
    state?: string;
    state_detail?: string;
    status: string;
    step_nb?: number;
    stored?: boolean;
    tags?: any[];
    trustlogo?: boolean;
    trustlogo_token?: Record<string, any>;
}
export interface IssuedCertificateLoadMatch {
    id: string;
    $action?: string;
    [action: string]: any;
}
export interface IssuedCertificateListMatch {
    cn?: string;
    cn_eq?: string;
    covered_cn?: string;
    package?: string;
    page?: number;
    per_page?: number;
    sharing_id?: string;
    sort_by?: string;
    status?: string;
}
export interface IssuedCertificateCreateData {
    sharing_id?: string;
    altnames?: any[];
    apex_only?: boolean;
    cn?: string;
    csr?: string;
    dcv_method?: string;
    duration?: number;
    package: Record<string, any>;
    resellee_id?: string;
    $action?: string;
    [action: string]: any;
}
export interface IssuedCertificateUpdateData {
    id: string;
    sharing_id?: string;
    altnames?: any[];
    csr?: string;
    dcv_method?: string;
}
export interface IssuedCertificateRemoveMatch {
    id: string;
    sharing_id?: string;
}
export interface LinkedZone {
    created_at: string;
    default_records: boolean;
    domain_count: number;
    domains?: any[];
    id: string;
    message: string;
    name: string;
    record_list?: any[];
    record_text?: string;
    records?: any[];
    sharing_space: Record<string, any>;
    status: string;
    updated_at?: string;
}
export interface LinkedZoneLoadMatch {
    id: string;
    sharing_id?: string;
}
export interface LinkedZoneListMatch {
    page?: number;
    per_page?: number;
    sharing_id?: string;
}
export interface LinkedZoneCreateData {
    default_records?: boolean;
    name: string;
    record_list?: any[];
    record_text?: string;
}
export interface LinkedZoneUpdateData {
    id: string;
    default_records?: boolean;
    name?: string;
    record_list?: any[];
    record_text?: string;
}
export interface LinkedZoneRemoveMatch {
    id: string;
}
export interface LinkedZoneDeployment {
    deploy: boolean;
    message: string;
}
export interface LinkedZoneDeploymentCreateData {
    zone_id: string;
    deploy: boolean;
}
export interface LinkedZoneDomain {
    deployed: boolean;
    id: string;
    name: string;
    owner: string;
    zone: Record<string, any>;
}
export interface LinkedZoneDomainLoadMatch {
    name: string;
}
export interface LinkedZoneDomainListMatch {
    name?: string;
    page?: number;
    per_page?: number;
    sharing_id?: string;
    zone_id?: string;
}
export interface LinkedZoneDomainUpdateData {
    domains?: any;
    $action?: string;
    [action: string]: any;
}
export interface LinkedZoneTask {
    created_at: string;
    ending_at?: string;
    id: string;
    result: Record<string, any>;
    status: string;
    type: string;
    updated_at?: string;
    zone_id: string;
}
export interface LinkedZoneTaskLoadMatch {
    id: string;
}
export interface LinkedZoneTaskListMatch {
    page?: number;
    per_page?: number;
}
export interface LivednsAxfrSlave {
    message: string;
}
export interface LivednsAxfrSlaveListMatch {
    fqdn: string;
}
export interface LivednsAxfrSlaveUpdateData {
    fqdn: string;
    ip: string;
    message?: string;
}
export interface LivednsAxfrSlaveRemoveMatch {
    fqdn: string;
    ip: string;
}
export interface LivednsAxfrTsig {
    href: string;
    id: string;
    key_name: string;
    message: string;
}
export interface LivednsAxfrTsigListMatch {
    fqdn: string;
}
export interface LivednsAxfrTsigUpdateData {
    fqdn: string;
    id: string;
    sharing_id?: string;
    href?: string;
    key_name?: string;
    message?: string;
}
export interface LivednsAxfrTsigRemoveMatch {
    fqdn: string;
    id: string;
    sharing_id?: string;
}
export interface LivednsDomain {
    automatic_snapshots: boolean;
    domain_href: string;
    domain_keys_href: string;
    domain_records_href: string;
    fqdn: string;
    message: string;
    zone?: Record<string, any>;
}
export interface LivednsDomainLoadMatch {
    fqdn: string;
}
export interface LivednsDomainListMatch {
    page?: number;
    per_page?: number;
    sharing_id?: string;
}
export interface LivednsDomainCreateData {
    sharing_id?: string;
    fqdn: string;
    zone?: Record<string, any>;
}
export interface LivednsDomainUpdateData {
    fqdn: string;
    automatic_snapshots?: boolean;
}
export interface LivednsKey {
    algorithm: number;
    algorithm_name: string;
    deleted: boolean;
    ds: string;
    fingerprint: string;
    flags: number;
    fqdn: string;
    id: string;
    key_href: string;
    message: string;
    public_key: string;
    status: string;
    tag: number;
}
export interface LivednsKeyLoadMatch {
    fqdn: string;
    id: string;
}
export interface LivednsKeyListMatch {
    fqdn: string;
}
export interface LivednsKeyCreateData {
    fqdn: string;
    flags: number;
}
export interface LivednsKeyUpdateData {
    fqdn: string;
    id: string;
    deleted?: boolean;
}
export interface LivednsKeyRemoveMatch {
    fqdn: string;
    id: string;
}
export interface LivednsNameserver {
}
export interface LivednsNameserverListMatch {
    fqdn: string;
    $action?: string;
    [action: string]: any;
}
export interface LivednsRecord {
    add_rrset_values?: any[];
    id?: string;
    message: string;
    remove_rrset_values?: any[];
    rrset_href: string;
    rrset_name: string;
    rrset_ttl?: number;
    rrset_type: string;
    rrset_values: any[];
}
export interface LivednsRecordLoadMatch {
    fqdn: string;
    rrset_name: string;
    rrset_type: string;
}
export interface LivednsRecordListMatch {
    fqdn: string;
    page?: number;
    per_page?: number;
    rrset_type?: string;
    sort_by?: string;
    $action?: string;
    [action: string]: any;
}
export interface LivednsRecordCreateData {
    fqdn: string;
    rrset_name?: string;
    rrset_type?: string;
    rrset_ttl?: number;
    rrset_values: any[];
    $action?: string;
    [action: string]: any;
}
export interface LivednsRecordUpdateData {
    fqdn: string;
    rrset_name: string;
    rrset_type: string;
    rrset_ttl?: number;
    rrset_values?: any[];
    $action?: string;
    [action: string]: any;
}
export interface LivednsRecordPatchData {
    fqdn: string;
    rrset_name: string;
    rrset_type: string;
    add_rrset_values?: any[];
    remove_rrset_values?: any[];
    rrset_ttl?: number;
}
export interface LivednsRecordRemoveMatch {
    fqdn: string;
    rrset_name: string;
    rrset_type: string;
    $action?: string;
    [action: string]: any;
}
export interface LivednsRrtype {
}
export interface LivednsRrtypeListMatch {
}
export interface LivednsSnapshot {
    automatic: boolean;
    created_at: string;
    href: string;
    id: string;
    message: string;
    name: string;
    zone_data: any[];
}
export interface LivednsSnapshotLoadMatch {
    fqdn: string;
    id: string;
}
export interface LivednsSnapshotListMatch {
    fqdn: string;
    automatic?: boolean;
    page?: number;
    per_page?: number;
    sort_by?: string;
}
export interface LivednsSnapshotCreateData {
    fqdn: string;
    name?: string;
}
export interface LivednsSnapshotUpdateData {
    fqdn: string;
    id: string;
    name?: string;
}
export interface LivednsSnapshotRemoveMatch {
    fqdn: string;
    id: string;
}
export interface LivednsTsigKey {
    config_samples: Record<string, any>;
    href: string;
    id: string;
    key_name: string;
    secret: string;
}
export interface LivednsTsigKeyLoadMatch {
    id: string;
    sharing_id?: string;
    $action?: string;
    [action: string]: any;
}
export interface LivednsTsigKeyListMatch {
    sharing_id?: string;
}
export interface LivednsTsigKeyCreateData {
    sharing_id?: string;
    config_samples: Record<string, any>;
    href: string;
    id: string;
    key_name: string;
    secret: string;
}
export interface LivednsZone {
    items: any[];
    message: string;
    remove_apex_ns?: boolean;
}
export interface LivednsZoneUpdateData {
    fqdn: string;
    items?: any[];
    remove_apex_ns?: boolean;
}
export interface LivednsZoneRemoveMatch {
    fqdn: string;
}
export interface Mailbox {
    address: string;
    aliases?: any[];
    antispam: boolean;
    autorenew: Record<string, any>;
    config: Record<string, any>;
    config_name: string;
    created_at: string;
    data_access: boolean;
    domain_part: string;
    duration_month?: number;
    email: string;
    expires_at: string;
    internal_domain: boolean;
    issues?: any[];
    last_paid_duration: number;
    local_part: string;
    message: string;
    owner: Record<string, any>;
    password: string;
    quota: number;
    quota_used: number;
    responder: Record<string, any>;
    updated_at: string;
    uuid: string;
}
export interface MailboxLoadMatch {
    address: string;
    sharing_id?: string;
}
export interface MailboxListMatch {
    address?: string;
    domain_part?: string;
    local_part?: string;
    page?: number;
    per_page?: number;
    search?: string;
    sharing_id?: string;
    sort_by?: string;
}
export interface MailboxCreateData {
    sharing_id?: string;
    aliases?: any[];
    config_name: string;
    duration_month?: number;
    email: string;
    password: string;
    $action?: string;
    [action: string]: any;
}
export interface MailboxUpdateData {
    address: string;
    aliases?: any[];
    antispam?: boolean;
    autorenew?: Record<string, any>;
    config_name?: string;
    password?: string;
    responder?: Record<string, any>;
}
export interface MailboxRemoveMatch {
    address: string;
    sharing_id?: string;
}
export interface MailboxDomain {
    antispam: boolean;
    configuration: any[];
    date_last_validation?: string;
    dkim: boolean;
    fqdns: any[];
    internal: boolean;
    is_livedns: boolean;
    mx: boolean;
    owner: Record<string, any>;
    spf: boolean;
    txt: boolean;
}
export interface MailboxDomainLoadMatch {
    domain: string;
}
export interface MailboxDomainListMatch {
    page?: number;
    per_page?: number;
}
export interface MailboxDomainCreateData {
    domain: string;
    records_to_validate?: any;
    $action?: string;
    [action: string]: any;
}
export interface MailboxForward {
    destinations: any[];
    message: string;
    source: string;
}
export interface MailboxForwardListMatch {
    page?: number;
    per_page?: number;
    search?: string;
    sharing_id?: string;
    sort_by?: string;
}
export interface MailboxForwardCreateData {
    destinations: any[];
    source: string;
}
export interface MailboxForwardUpdateData {
    source: string;
    destinations?: any[];
}
export interface MailboxForwardRemoveMatch {
    source: string;
}
export interface MailboxProduct {
    autorenew?: boolean;
    config: any[];
    config_name: string;
    description: string;
    duration_month: number;
    label: string;
    message: string;
    prices: any[];
    quantity: number;
    taxes: any[];
    uuid: string;
}
export interface MailboxProductListMatch {
    sharing_id?: string;
}
export interface MailboxProductCreateData {
    sharing_id?: string;
    autorenew?: boolean;
    config_name: string;
    duration_month: number;
    quantity: number;
}
export interface MailboxQuota {
    annually: Record<string, any>;
    config_name: string;
    label: string;
    monthly: Record<string, any>;
    quota: string;
}
export interface MailboxQuotaListMatch {
    sharing_id?: string;
}
export interface MailboxSlot {
    autorenew: Record<string, any>;
    config: Record<string, any>;
    expires_at?: string;
    last_paid_duration?: number;
    refund_info: Record<string, any>;
    refundable: boolean;
    uuid: string;
    webhosting_pack: boolean;
}
export interface MailboxSlotLoadMatch {
    uuid: string;
}
export interface MailboxSlotListMatch {
    config_name?: string;
    expires_at_gte?: string;
    expires_at_lte?: string;
    last_paid_duration?: number;
    page?: number;
    per_page?: number;
    refundable?: string;
    sharing_id?: string;
    sort_by?: string;
    webhosting_pack?: boolean;
}
export interface Organization {
    city: string;
    corporate: boolean;
    country: string;
    email: string;
    fax?: string;
    firstname: string;
    id: string;
    lang?: string;
    lastname: string;
    message: string;
    name: string;
    orgname?: string;
    phone?: string;
    reference?: string;
    reseller: boolean;
    siren?: string;
    state?: string;
    streetaddr: string;
    streetaddr2?: string;
    type: string;
    vat_number?: string;
    zip: string;
}
export interface OrganizationLoadMatch {
    id: string;
}
export interface OrganizationListMatch {
    name?: string;
    permission?: string;
    sort_by?: string;
    type?: string;
    "~name"?: string;
}
export interface OrganizationCreateData {
    city: string;
    country?: string;
    email: string;
    fax?: string;
    firstname: string;
    lang?: string;
    lastname: string;
    name: string;
    orgname: string;
    phone: string;
    reference?: string;
    reseller?: boolean;
    siren?: string;
    state?: string;
    streetaddr: string;
    streetaddr2?: string;
    type: string;
    vat_number?: string;
    zip?: string;
    $action?: string;
    [action: string]: any;
}
export interface OrganizationUpdateData {
    id: string;
    city?: string;
    country?: string;
    email?: string;
    fax?: string;
    firstname?: string;
    lang?: string;
    lastname?: string;
    name?: string;
    phone?: string;
    reference?: string;
    reseller?: boolean;
    siren?: string;
    state?: string;
    streetaddr?: string;
    streetaddr2?: string;
    vat_number?: string;
    zip?: string;
}
export interface OrganizationRemoveMatch {
    id: string;
}
export interface OrganizationCustomer {
    city: string;
    country: string;
    email: string;
    fax?: string;
    firstname: string;
    id: string;
    lang?: string;
    lastname: string;
    message: string;
    name: string;
    orgname?: string;
    phone?: string;
    reference?: string;
    siren?: string;
    state?: string;
    streetaddr: string;
    streetaddr2?: string;
    sync_contact_email?: string;
    type: string;
    vat_number?: string;
    zip?: string;
}
export interface OrganizationCustomerLoadMatch {
    id: string;
    org_id: string;
}
export interface OrganizationCustomerListMatch {
    org_id: string;
    name?: string;
    page?: number;
    per_page?: number;
    permission?: string;
    sort_by?: string;
}
export interface OrganizationCustomerCreateData {
    org_id: string;
    city: string;
    country: string;
    email: string;
    fax?: string;
    firstname: string;
    lastname: string;
    orgname?: string;
    phone: string;
    reference?: string;
    state?: string;
    streetaddr: string;
    streetaddr2?: string;
    type: string;
    zip?: string;
}
export interface OrganizationCustomerUpdateData {
    id: string;
    org_id: string;
    city?: string;
    country?: string;
    email?: string;
    fax?: string;
    firstname?: string;
    lang?: string;
    lastname?: string;
    phone?: string;
    reference?: string;
    siren?: string;
    state?: string;
    streetaddr?: string;
    streetaddr2?: string;
    sync_contact_email?: string;
    vat_number?: string;
    zip?: string;
}
export interface OrganizationCustomerRemoveMatch {
    id: string;
    org_id: string;
}
export interface Template {
    description: string;
    editable: boolean;
    href: string;
    id: string;
    name: string;
    namespaces: any[];
    orgname: string;
    payload: Record<string, any>;
    sharing_space: Record<string, any>;
    variables: any[];
}
export interface TemplateLoadMatch {
    id: string;
}
export interface TemplateListMatch {
    page?: number;
    per_page?: number;
}
export interface TemplateCreateData {
    sharing_id?: string;
    description?: string;
    name: string;
    payload: Record<string, any>;
}
export interface TemplateUpdateData {
    id: string;
    description?: string;
    name?: string;
    payload?: Record<string, any>;
}
export interface TemplateRemoveMatch {
    id: string;
}
export interface TemplateDispatch {
    attempt: number;
    created_at: string;
    dispatch_href: string;
    id: string;
    message: string;
    object_id: string;
    object_type: string;
    payload: Record<string, any>;
    sharing_id: string;
    state: number;
    state_msg?: string;
    target: Record<string, any>;
    target_id: string;
    target_type: string;
    task_history: any[];
    task_status: Record<string, any>;
    task_updated_at?: string;
    template_id?: string;
    template_name?: string;
}
export interface TemplateDispatchLoadMatch {
    id: string;
}
export interface TemplateDispatchCreateData {
    template_id: string;
    object_id: string;
    object_type: string;
}
export interface Tld {
    authinfo_for_transfer: boolean;
    category: string;
    change_owner: boolean;
    corporate: boolean;
    ext_trade: boolean;
    full_tld: string;
    href: string;
    lock: boolean;
    name: string;
}
export interface TldLoadMatch {
    name: string;
}
export interface TldListMatch {
    category?: string;
    page?: number;
    per_page?: number;
}
export interface User {
    city: string;
    country?: string;
    email: string;
    fax?: string;
    firstname?: string;
    id: string;
    lang: string;
    lastname?: string;
    name: string;
    phone?: string;
    state?: string;
    streetaddr?: string;
    streetaddr2?: string;
    username: string;
    zip?: string;
}
export interface UserLoadMatch {
    city?: string;
    country?: string;
    email?: string;
    fax?: string;
    firstname?: string;
    id: string;
    lang?: string;
    lastname?: string;
    name?: string;
    phone?: string;
    state?: string;
    streetaddr?: string;
    streetaddr2?: string;
    username?: string;
    zip?: string;
}
