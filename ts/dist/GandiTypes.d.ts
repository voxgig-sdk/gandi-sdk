export interface Acme {
    country: string;
    created_at: string;
    currency: string;
    deleted_at: string;
    domains_to_add: any[];
    domains_to_delete: any[];
    eab_hmac: string;
    eab_id: string;
    ends_at: string;
    external_id: string;
    grid: string;
    hostname: string;
    hostname_ulabel: string;
    id: string;
    ip: string;
    is_wildcard: boolean;
    last_activity: string;
    message: string;
    name: string;
    provider: string;
    server_url: string;
    status: string;
    subscription_id: string;
    validation_type: string;
    years: string;
}
export interface AcmeLoadMatch {
    account_id?: string;
    subscription_id: string;
    sharing_id: string;
    domain_id?: number;
}
export interface AcmeListMatch {
    subscription_id: string;
    domain?: string;
    sharing_id: string;
    $action?: string;
    [action: string]: any;
}
export interface AcmeCreateData {
    sharing_id: string;
    country: string;
    currency: string;
    grid: string;
    name: string;
    provider: string;
    validation_type: string;
    domains?: any;
    duration?: any;
    process?: any;
    $action?: string;
    [action: string]: any;
}
export interface AcmeUpdateData {
    subscription_id: string;
    sharing_id: string;
    country?: string;
    currency?: string;
    domains_to_add?: any[];
    domains_to_delete?: any[];
    grid?: string;
    name?: string;
    provider?: string;
    validation_type?: string;
}
export interface AcmeRemoveMatch {
    subscription_id: string;
    sharing_id: string;
}
export interface Billing {
    annual_balance: number;
    currency: string;
    grid: string;
    outstanding_amount: number;
    prepaid: Record<string, any>;
    prepaid_monthly_invoice?: boolean;
    products: any[];
    taxes: any[];
}
export interface BillingLoadMatch {
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
    $action?: string;
    [action: string]: any;
}
export interface Certificate {
    add: any[];
    altnames: any[];
    altnames_unicode: any[];
    assumed_name?: string;
    business_category?: string;
    card_pay_trustlogo?: boolean;
    category: Record<string, any>;
    cert?: string;
    cn: string;
    cn_unicode: string;
    contact: Record<string, any>;
    csr?: string;
    dates: Record<string, any>;
    dcv_method?: string;
    dns_records?: any[];
    duration?: number;
    error_msg?: string;
    errors?: any[];
    fqdns: any[];
    href?: string;
    id: string;
    ida?: Record<string, any>;
    intermediate?: string;
    joi?: Record<string, any>;
    max_domains: number;
    md5: string;
    message: string;
    messages?: any[];
    middleman?: Record<string, any>;
    min_domains: number;
    name: string;
    owner?: string;
    package: Record<string, any>;
    provider: string;
    raw_messages?: any[];
    reissuable?: boolean;
    remove: any[];
    renewable?: boolean;
    sgc: boolean;
    sha256: string;
    sha_version?: number;
    sharing_id?: string;
    software: number;
    state?: string;
    state_detail?: string;
    status: string;
    step_nb?: number;
    stored?: boolean;
    tag: string;
    tags?: any[];
    trustlogo?: boolean;
    trustlogo_token?: Record<string, any>;
    unique_value?: string;
    warranty: number;
    wildcard: boolean;
}
export interface CertificateLoadMatch {
    id: string;
}
export interface CertificateListMatch {
    issued_cert_id: string;
    $action?: string;
    [action: string]: any;
}
export interface CertificateCreateData {
    id: string;
    sharing_id?: string;
    csr?: string;
    dcv_method?: string;
    duration?: number;
    package?: Record<string, any>;
    tag: string;
    $action?: string;
    [action: string]: any;
}
export interface CertificateUpdateData {
    issued_cert_id: string;
    tags?: any[];
    $action?: string;
    [action: string]: any;
}
export interface CertificatePatchData {
    id: string;
    sharing_id?: string;
    add?: any[];
    altnames?: any[];
    csr?: string;
    dcv_method?: string;
    remove?: any[];
    $action?: string;
    [action: string]: any;
}
export interface CertificateRemoveMatch {
    id: string;
    sharing_id?: string;
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
    id: string;
}
export interface CommentCreateData {
    id: string;
    content: string;
}
export interface CommentRemoveMatch {
    id: string;
}
export interface Domain {
    admin: Record<string, any>;
    authinfo?: string;
    authinfo_for_transfer: boolean;
    autorenew: Record<string, any>;
    bill: Record<string, any>;
    brand_number?: string;
    can_tld_lock: boolean;
    category: string;
    cert_status?: string;
    cert_uuid?: string;
    change_owner: boolean;
    city?: string;
    claims?: string;
    contacts: Record<string, any>;
    corporate: boolean;
    country: string;
    created_at?: string;
    currency?: string;
    data_obfuscated?: boolean;
    date_start?: string;
    dates: Record<string, any>;
    domain_owner: string;
    duration?: number;
    email: string;
    enforce_premium?: boolean;
    error?: string;
    errors?: any[];
    errortype?: string;
    errortype_label?: string;
    ext_trade: boolean;
    extra_parameters?: Record<string, any>;
    family?: string;
    fax?: string;
    foa?: any[];
    fqdn: string;
    fqdn_unicode: string;
    full_tld: string;
    given?: string;
    host: string;
    href: string;
    icann_contract_accept?: boolean;
    id?: string;
    inner_step?: string;
    ips: any[];
    jo_announce_number?: string;
    jo_announce_page?: string;
    jo_declaration_date?: string;
    jo_publication_date?: string;
    lang?: string;
    lock: boolean;
    mail_obfuscated?: boolean;
    mailbox_optin?: boolean;
    message: string;
    mobile?: string;
    name: string;
    nameserver: Record<string, any>;
    nameservers: any[];
    nameservers_ips?: Record<string, any>;
    orga_owner: string;
    override?: boolean;
    owner: Record<string, any>;
    owner_contact: string;
    params: Record<string, any>;
    phone?: string;
    price?: number;
    protocol?: string;
    reachability: string;
    regac_at?: string;
    resellee_id?: string;
    services: any[];
    sharing_id?: string;
    sharing_space: Record<string, any>;
    siren?: string;
    smd?: string;
    start_at?: string;
    state: string;
    status: any[];
    step: string;
    step_nb: number;
    streetaddr: string;
    tags?: any[];
    tech: Record<string, any>;
    template_id?: string;
    tld: string;
    tld_period?: string;
    transfer_link?: string;
    transfer_procedure?: string;
    trustee_roles?: any[];
    type: string;
    updated_at?: string;
    url: string;
    validation?: string;
    zip?: string;
}
export interface DomainLoadMatch {
    domain: string;
    sharing_id?: string;
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
    $action?: string;
    [action: string]: any;
}
export interface DomainCreateData {
    domain: string;
    sharing_id?: string;
    admin: Record<string, any>;
    authinfo?: string;
    authinfo_for_transfer: boolean;
    autorenew: Record<string, any>;
    bill: Record<string, any>;
    brand_number?: string;
    can_tld_lock: boolean;
    category: string;
    cert_status?: string;
    cert_uuid?: string;
    change_owner: boolean;
    city?: string;
    claims?: string;
    contacts: Record<string, any>;
    corporate: boolean;
    country: string;
    created_at?: string;
    currency?: string;
    data_obfuscated?: boolean;
    date_start?: string;
    dates: Record<string, any>;
    domain_owner: string;
    duration?: number;
    email: string;
    enforce_premium?: boolean;
    error?: string;
    errors?: any[];
    errortype?: string;
    errortype_label?: string;
    ext_trade: boolean;
    extra_parameters?: Record<string, any>;
    family?: string;
    fax?: string;
    foa?: any[];
    fqdn: string;
    fqdn_unicode: string;
    full_tld: string;
    given?: string;
    host: string;
    href: string;
    icann_contract_accept?: boolean;
    id?: string;
    inner_step?: string;
    ips: any[];
    jo_announce_number?: string;
    jo_announce_page?: string;
    jo_declaration_date?: string;
    jo_publication_date?: string;
    lang?: string;
    lock: boolean;
    mail_obfuscated?: boolean;
    mailbox_optin?: boolean;
    message: string;
    mobile?: string;
    name: string;
    nameserver: Record<string, any>;
    nameservers?: any[];
    nameservers_ips?: Record<string, any>;
    orga_owner: string;
    override?: boolean;
    owner: Record<string, any>;
    owner_contact: string;
    params: Record<string, any>;
    phone?: string;
    price?: number;
    protocol?: string;
    reachability: string;
    regac_at?: string;
    resellee_id?: string;
    services: any[];
    sharing_space: Record<string, any>;
    siren?: string;
    smd?: string;
    start_at?: string;
    state: string;
    status: any[];
    step: string;
    step_nb: number;
    streetaddr: string;
    tags?: any[];
    tech: Record<string, any>;
    template_id?: string;
    tld: string;
    tld_period?: string;
    transfer_link?: string;
    transfer_procedure?: string;
    trustee_roles?: any[];
    type: string;
    updated_at?: string;
    url: string;
    validation?: string;
    zip?: string;
    $action?: string;
    [action: string]: any;
}
export interface DomainUpdateData {
    domain: string;
    admin?: Record<string, any>;
    authinfo?: string;
    authinfo_for_transfer?: boolean;
    autorenew?: Record<string, any>;
    bill?: Record<string, any>;
    brand_number?: string;
    can_tld_lock?: boolean;
    category?: string;
    cert_status?: string;
    cert_uuid?: string;
    change_owner?: boolean;
    city?: string;
    claims?: string;
    contacts?: Record<string, any>;
    corporate?: boolean;
    country?: string;
    created_at?: string;
    currency?: string;
    data_obfuscated?: boolean;
    date_start?: string;
    dates?: Record<string, any>;
    domain_owner?: string;
    duration?: number;
    email?: string;
    enforce_premium?: boolean;
    error?: string;
    errors?: any[];
    errortype?: string;
    errortype_label?: string;
    ext_trade?: boolean;
    extra_parameters?: Record<string, any>;
    family?: string;
    fax?: string;
    foa?: any[];
    fqdn?: string;
    fqdn_unicode?: string;
    full_tld?: string;
    given?: string;
    host?: string;
    href?: string;
    icann_contract_accept?: boolean;
    id?: string;
    inner_step?: string;
    ips?: any[];
    jo_announce_number?: string;
    jo_announce_page?: string;
    jo_declaration_date?: string;
    jo_publication_date?: string;
    lang?: string;
    lock?: boolean;
    mail_obfuscated?: boolean;
    mailbox_optin?: boolean;
    message?: string;
    mobile?: string;
    name?: string;
    nameserver?: Record<string, any>;
    nameservers?: any[];
    nameservers_ips?: Record<string, any>;
    orga_owner?: string;
    override?: boolean;
    owner?: Record<string, any>;
    owner_contact?: string;
    params?: Record<string, any>;
    phone?: string;
    price?: number;
    protocol?: string;
    reachability?: string;
    regac_at?: string;
    resellee_id?: string;
    services?: any[];
    sharing_id?: string;
    sharing_space?: Record<string, any>;
    siren?: string;
    smd?: string;
    start_at?: string;
    state?: string;
    status?: any[];
    step?: string;
    step_nb?: number;
    streetaddr?: string;
    tags?: any[];
    tech?: Record<string, any>;
    template_id?: string;
    tld?: string;
    tld_period?: string;
    transfer_link?: string;
    transfer_procedure?: string;
    trustee_roles?: any[];
    type?: string;
    updated_at?: string;
    url?: string;
    validation?: string;
    zip?: string;
    $action?: string;
    [action: string]: any;
}
export interface DomainPatchData {
    host: string;
    id: string;
    override?: boolean;
    protocol?: string;
    type?: string;
    url?: string;
    $action?: string;
    [action: string]: any;
}
export interface DomainRemoveMatch {
    domain?: string;
    id: string;
    host?: string;
    name?: string;
    sharing_id?: string;
    $action?: string;
    [action: string]: any;
}
export interface Email {
    address: string;
    alias_count?: number;
    aliases: any[];
    antispam: boolean;
    autorenew: Record<string, any>;
    available: boolean;
    capacity: number;
    created_at: string;
    currency: string;
    destinations: any[];
    dkim: string;
    domain: string;
    duration: number;
    errors?: any[];
    expires_at: string;
    fallback_email?: string;
    forward_count: number;
    free_mailboxes: number;
    href: string;
    id: string;
    included_mailboxes: number;
    info: any[];
    login: string;
    mailbox_type: string;
    message: string;
    packmail: boolean;
    password: string;
    price_v1: number;
    price_v2: number;
    quota_used: number;
    quota_v1: number;
    refund_amount?: number;
    refund_currency?: string;
    refundable: boolean;
    responder?: Record<string, any>;
    source: string;
    status: string;
    to_convert: boolean;
    token: string;
    usage_v1: number;
    version: number;
}
export interface EmailLoadMatch {
    domain: string;
    mailbox_id?: string;
    slot_id?: number;
    sharing_id?: string;
}
export interface EmailListMatch {
    domain: string;
    destination?: string;
    page?: number;
    per_page?: number;
    sort_by?: string;
    source?: string;
    "<created_at"?: string;
    antispam?: boolean;
    login?: string;
    mailbox_type?: string;
    "~login"?: string;
    display_not_expired_and_inactive?: boolean;
}
export interface EmailCreateData {
    domain: string;
    sharing_id?: string;
    aliases?: any[];
    antispam?: boolean;
    autorenew?: Record<string, any>;
    destinations: any[];
    duration: number;
    login: string;
    mailbox_type: string;
    password: string;
    source: string;
    token: string;
    $action?: string;
    [action: string]: any;
}
export interface EmailUpdateData {
    domain: string;
    source: string;
    destinations?: any[];
}
export interface EmailPatchData {
    domain: string;
    mailbox_id?: string;
    sharing_id?: string;
    aliases?: any[];
    antispam?: boolean;
    autorenew?: Record<string, any>;
    dkim?: string;
    login?: string;
    mailbox_type?: string;
    password?: string;
    responder?: Record<string, any>;
}
export interface EmailRemoveMatch {
    domain: string;
    mailbox_id?: string;
    slot_id?: number;
    source?: string;
}
export interface LinkedZone {
    created_at: string;
    default_records: boolean;
    deploy: boolean;
    deployed: boolean;
    domain_count: number;
    domains?: any[];
    ending_at?: string;
    errored: any[];
    id: string;
    message: string;
    name: string;
    owner: string;
    record_list?: any[];
    record_text?: string;
    records?: any[];
    result: Record<string, any>;
    sharing_space: Record<string, any>;
    status: string;
    succeeded: any[];
    type: string;
    updated_at?: string;
    zone: Record<string, any>;
    zone_id: string;
}
export interface LinkedZoneLoadMatch {
    domain: string;
}
export interface LinkedZoneListMatch {
    name?: string;
    page?: number;
    per_page?: number;
    sharing_id?: string;
    zone_id?: string;
}
export interface LinkedZoneCreateData {
    id: string;
    default_records?: boolean;
    deploy: boolean;
    name: string;
    record_list?: any[];
    record_text?: string;
}
export interface LinkedZoneUpdateData {
    id: string;
    default_records?: boolean;
    domains?: any[];
    name?: string;
    record_list?: any[];
    record_text?: string;
}
export interface LinkedZoneRemoveMatch {
    id: string;
}
export interface LiveDn {
    add_rrset_values?: any[];
    algorithm: number;
    algorithm_name: string;
    automatic: boolean;
    automatic_snapshots: boolean;
    config_samples: Record<string, any>;
    created_at: string;
    deleted: boolean;
    domain_href: string;
    domain_keys_href: string;
    domain_records_href: string;
    ds: string;
    fingerprint: string;
    flags: number;
    fqdn: string;
    href: string;
    id: string;
    items: any[];
    key_href: string;
    key_name: string;
    message: string;
    name: string;
    public_key: string;
    remove_apex_ns?: boolean;
    remove_rrset_values?: any[];
    rrset_href: string;
    rrset_name: string;
    rrset_ttl?: number;
    rrset_type: string;
    rrset_values: any[];
    secret: string;
    status: string;
    tag: number;
    zone?: Record<string, any>;
    zone_data: any[];
}
export interface LiveDnLoadMatch {
    fqdn: string;
}
export interface LiveDnListMatch {
    fqdn: string;
    rrset_name: string;
}
export interface LiveDnCreateData {
    fqdn: string;
    rrset_name: string;
    add_rrset_values?: any[];
    algorithm: number;
    algorithm_name: string;
    automatic: boolean;
    automatic_snapshots: boolean;
    config_samples: Record<string, any>;
    created_at: string;
    deleted: boolean;
    domain_href: string;
    domain_keys_href: string;
    domain_records_href: string;
    ds: string;
    fingerprint: string;
    flags: number;
    href: string;
    id: string;
    items: any[];
    key_href: string;
    key_name: string;
    message: string;
    name?: string;
    public_key: string;
    remove_apex_ns?: boolean;
    remove_rrset_values?: any[];
    rrset_href: string;
    rrset_ttl: number;
    rrset_type: string;
    rrset_values: any[];
    secret: string;
    status: string;
    tag: number;
    zone?: Record<string, any>;
    zone_data: any[];
}
export interface LiveDnUpdateData {
    fqdn: string;
    rrset_name?: string;
    rrset_type?: string;
    id?: string;
    sharing_id?: string;
    ip?: string;
    add_rrset_values?: any[];
    algorithm?: number;
    algorithm_name?: string;
    automatic?: boolean;
    automatic_snapshots?: boolean;
    config_samples?: Record<string, any>;
    created_at?: string;
    deleted?: boolean;
    domain_href?: string;
    domain_keys_href?: string;
    domain_records_href?: string;
    ds?: string;
    fingerprint?: string;
    flags?: number;
    href?: string;
    items?: any[];
    key_href?: string;
    key_name?: string;
    message?: string;
    name?: string;
    public_key?: string;
    remove_apex_ns?: boolean;
    remove_rrset_values?: any[];
    rrset_href?: string;
    rrset_ttl?: number;
    rrset_values?: any[];
    secret?: string;
    status?: string;
    tag?: number;
    zone?: Record<string, any>;
    zone_data?: any[];
}
export interface LiveDnPatchData {
    fqdn: string;
    rrset_name?: string;
    rrset_type?: string;
    id?: string;
    add_rrset_values?: any[];
    automatic_snapshots?: boolean;
    deleted?: boolean;
    name?: string;
    remove_rrset_values?: any[];
    rrset_ttl?: number;
}
export interface LiveDnRemoveMatch {
    fqdn: string;
    rrset_name?: string;
    rrset_type?: string;
    id?: string;
    sharing_id?: string;
    ip?: string;
}
export interface Mailbox {
    address: string;
    aliases?: any[];
    antispam: boolean;
    autorenew: Record<string, any>;
    config: Record<string, any>;
    config_name: string;
    configuration: any[];
    created_at: string;
    data_access: boolean;
    date_last_validation?: string;
    destinations: any[];
    dkim: boolean;
    domain_part: string;
    duration_month?: number;
    email: string;
    expires_at: string;
    id?: string;
    internal: boolean;
    internal_domain: boolean;
    is_livedns: boolean;
    issues?: any[];
    last_paid_duration: number;
    local_part: string;
    message: string;
    mx: boolean;
    owner: Record<string, any>;
    password: string;
    quota: number;
    quota_used: number;
    refund_info: Record<string, any>;
    refundable: boolean;
    responder: Record<string, any>;
    spf: boolean;
    txt: boolean;
    updated_at: string;
    uuid: string;
    webhosting_pack: boolean;
}
export interface MailboxLoadMatch {
    domain: string;
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
    $action?: string;
    [action: string]: any;
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
    source: string;
    destinations?: any[];
}
export interface MailboxPatchData {
    id: string;
    aliases?: any[];
    antispam?: boolean;
    autorenew?: Record<string, any>;
    config_name?: string;
    password?: string;
    responder?: Record<string, any>;
}
export interface MailboxRemoveMatch {
    id: string;
    sharing_id?: string;
}
export interface Nt {
}
export interface NtLoadMatch {
    filename: string;
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
    sync_contact_email?: string;
    type: string;
    vat_number?: string;
    zip?: string;
}
export interface OrganizationLoadMatch {
    id: string;
    org_id?: string;
    $action?: string;
    [action: string]: any;
}
export interface OrganizationListMatch {
    name?: string;
    permission?: string;
    sort_by?: string;
    type?: string;
    "~name"?: string;
    $action?: string;
    [action: string]: any;
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
    org_id?: string;
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
    sync_contact_email?: string;
    vat_number?: string;
    zip?: string;
}
export interface OrganizationRemoveMatch {
    id: string;
    org_id?: string;
}
export interface Template {
    attempt: number;
    created_at: string;
    description: string;
    dispatch_href: string;
    editable: boolean;
    href: string;
    id: string;
    message: string;
    name: string;
    namespaces: any[];
    object_id: string;
    object_type: string;
    orgname: string;
    payload: Record<string, any>;
    sharing_id: string;
    sharing_space: Record<string, any>;
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
    id: string;
    description?: string;
    name: string;
    object_id: string;
    object_type: string;
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
export interface WebHosting {
    access_information: Record<string, any>;
    application: Record<string, any>;
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
    deployment: Record<string, any>;
    disk_size_bytes: number;
    disk_used_bytes?: number;
    domain?: string;
    duration?: number;
    duration_unit?: string;
    errors?: any[];
    expire_at: string;
    fqdn: string;
    https_strategy?: string;
    id: string;
    is_a_test_vhost: boolean;
    language: Record<string, any>;
    language_id?: string;
    linked_dns_zone: Record<string, any>;
    location: string;
    message: string;
    name: string;
    name_label: string;
    password?: string;
    password_updated_at?: string;
    ram: Record<string, any>;
    requirements: any[];
    sharing_space: Record<string, any>;
    size: string;
    snapshot_enabled: boolean;
    status: string;
    storage: Record<string, any>;
    storage_additional_size?: number;
    subscription_cancelled?: boolean;
    tls_validated_at?: string;
    type: Record<string, any>;
    upgrade_to?: any[];
    vhosts: any[];
}
export interface WebHostingLoadMatch {
    application_name: string;
}
export interface WebHostingListMatch {
    database?: string;
    language?: string;
    name?: string;
    page?: number;
    per_page?: number;
    sharing_id?: string;
    sort_by?: string;
}
export interface WebHostingCreateData {
    sharing_id?: string;
    application: Record<string, any>;
    authentication: Record<string, any>;
    autorenew?: Record<string, any>;
    domain: string;
    duration?: number;
    duration_unit?: string;
    fqdn: string;
    linked_dns_zone: Record<string, any>;
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
export interface WebHostingUpdateData {
    instance_id: string;
    vhost_fqdn?: string;
    application?: Record<string, any>;
    booster?: Record<string, any>;
    booster_options?: Record<string, any>;
    https_strategy?: string;
    language_id?: string;
    linked_dns_zone?: Record<string, any>;
    name?: string;
    password?: string;
    size?: string;
    snapshot_enabled?: boolean;
    storage_additional_size?: number;
}
export interface WebHostingRemoveMatch {
    instance_id: string;
    vhost_fqdn?: string;
    $action?: string;
    [action: string]: any;
}
