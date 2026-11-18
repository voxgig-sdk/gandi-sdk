# Gandi SDK

require_relative 'utility/struct/voxgig_struct'
require_relative 'core/utility_type'
require_relative 'core/spec'
require_relative 'core/helpers'

# Load utility registration
require_relative 'utility/register'

# Load config and features
require_relative 'config'
require_relative 'feature/base_feature'
require_relative 'features'

# Load typed models (Struct value objects).
require_relative 'Gandi_types'


class GandiSDK
  attr_accessor :mode, :features, :options

  def initialize(options = {})
    @mode = "live"
    @features = []
    @options = nil

    utility = GandiUtility.new
    @_utility = utility

    config = GandiConfig.shared_config

    @_rootctx = utility.make_context.call({
      "client" => self,
      "utility" => utility,
      "config" => config,
      "options" => options || {},
      "shared" => {},
    }, nil)

    @options = utility.make_options.call(@_rootctx)

    if VoxgigStruct.getpath(@options, "feature.test.active") == true
      @mode = "test"
    end

    @_rootctx.options = @options

    # Add features in the resolved order (make_options puts an explicit array
    # order first, else defaults to test-first). Ordering matters: the `test`
    # feature installs the base mock transport and the transport features
    # (retry/cache/netsim/proxy/ratelimit) wrap whatever is current, so `test`
    # must be added before them to sit at the base of the chain.
    feature_opts = GandiHelpers.to_map(VoxgigStruct.getprop(@options, "feature"))
    if feature_opts
      featureorder = VoxgigStruct.getpath(@options, "__derived__.featureorder")
      if featureorder.is_a?(Array)
        featureorder.each do |fname|
          fopts = GandiHelpers.to_map(feature_opts[fname])
          if fopts && fopts["active"] == true
            utility.feature_add.call(@_rootctx, GandiFeatures.make_feature(fname))
          end
        end
      end
    end

    # Add extension features.
    extend_val = VoxgigStruct.getprop(@options, "extend")
    if extend_val.is_a?(Array)
      extend_val.each do |f|
        if f.respond_to?(:get_name)
          utility.feature_add.call(@_rootctx, f)
        end
      end
    end

    # Initialize features.
    @features.each do |f|
      utility.feature_init.call(@_rootctx, f)
    end

    utility.feature_hook.call(@_rootctx, "PostConstruct")
  end

  def options_map
    out = VoxgigStruct.clone(@options)
    out.is_a?(Hash) ? out : {}
  end

  def get_utility
    GandiUtility.copy(@_utility)
  end

  def get_root_ctx
    @_rootctx
  end

  # The options and the root context both hold the credential, so the
  # client's printed form is its name alone; `options_map` is the
  # documented way to read them back.
  def to_s
    "Gandi " + VoxgigStruct.jsonify({ "name" => "Gandi" })
  end

  def inspect
    to_s
  end

  def prepare(fetchargs = {})
    utility = @_utility
    fetchargs ||= {}

    ctrl = GandiHelpers.to_map(VoxgigStruct.getprop(fetchargs, "ctrl")) || {}

    ctx = utility.make_context.call({
      "opname" => "prepare",
      "ctrl" => ctrl,
    }, @_rootctx)

    opts = @options
    path = VoxgigStruct.getprop(fetchargs, "path") || ""
    path = "" unless path.is_a?(String)
    method_val = VoxgigStruct.getprop(fetchargs, "method") || "GET"
    method_val = "GET" unless method_val.is_a?(String) && "" != method_val
    method_val = method_val.upcase
    allow_method = VoxgigStruct.getpath(opts, "allow.method")
    unless GandiUtilities.allowed(allow_method, method_val)
      raise ctx.make_error("spec_method_allow",
        "Method \"#{method_val}\" not allowed by SDK option allow.method value: \"#{allow_method}\"")
    end
    params = GandiHelpers.to_map(VoxgigStruct.getprop(fetchargs, "params")) || {}
    query = GandiHelpers.to_map(VoxgigStruct.getprop(fetchargs, "query")) || {}
    headers = utility.prepare_headers.call(ctx)

    base = VoxgigStruct.getprop(opts, "base") || ""
    base = "" unless base.is_a?(String)
    prefix = VoxgigStruct.getprop(opts, "prefix") || ""
    prefix = "" unless prefix.is_a?(String)
    suffix = VoxgigStruct.getprop(opts, "suffix") || ""
    suffix = "" unless suffix.is_a?(String)

    ctx.spec = GandiSpec.new({
      "base" => base, "prefix" => prefix, "suffix" => suffix,
      "path" => path, "method" => method_val,
      "params" => params, "query" => query, "headers" => headers,
      "body" => VoxgigStruct.getprop(fetchargs, "body"),
      "step" => "start",
    })

    # Merge user-provided headers.
    uh = VoxgigStruct.getprop(fetchargs, "headers")
    if uh.is_a?(Hash)
      uh.each { |k, v| ctx.spec.headers[k] = v }
    end

    # A raw request has no point to declare its response type, so it asks
    # for the JSON it reads: an API that negotiates on Accept otherwise
    # answers in its own default format. A caller's own accept wins.
    unless ctx.spec.headers.keys.any? { |k| k.to_s.downcase == "accept" }
      ctx.spec.headers["accept"] = "application/json"
    end

    _, err = utility.prepare_auth.call(ctx)
    raise err if err

    # make_fetch_def returns a (fetchdef, err) tuple; destructure it and
    # return just the fetchdef Hash (raising on error) so callers — including
    # direct(), which indexes fetchdef["url"] — receive a Hash, mirroring the
    # ts/py prepare().
    fetchdef, fd_err = utility.make_fetch_def.call(ctx)
    raise fd_err if fd_err

    fetchdef
  end

  # Raw endpoint access is operator-controllable, like every entity op.
  # Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
  # either one reaches the same endpoint.
  def direct(fetchargs = {})
    return op_denied("direct") unless op_allowed?("direct")

    raw_request(fetchargs)
  end

  # Is this raw-access op permitted by the SDK's allow.op option?
  def op_allowed?(op)
    GandiUtilities.allowed(VoxgigStruct.getpath(@options, "allow.op"), op)
  end

  def op_denied(op)
    allow_op = VoxgigStruct.getpath(@options, "allow.op")
    {
      "ok" => false,
      "err" => GandiError.new(
        "GandiSDK: #{op}: operation not allowed by" \
        " SDK option allow.op value: \"#{allow_op}\"",
        code: "#{op}_allow"),
    }
  end

  # Ungated request path shared by direct and graphql, each of which checks
  # its own allow.op token first. Separate, rather than a flag on fetchargs:
  # a caller-supplied marker would let anyone opt straight back out of the
  # gate by passing it.
  def raw_request(fetchargs = {})
    utility = @_utility

    # direct() is the raw-HTTP escape hatch: it always returns a result hash
    # ({ "ok" => ..., ... }) and never raises. prepare() raises on error, so
    # trap that and surface it in the hash.
    begin
      fetchdef = prepare(fetchargs)
    rescue GandiError => err
      return { "ok" => false, "err" => err }
    end

    fetchargs ||= {}
    ctrl = GandiHelpers.to_map(VoxgigStruct.getprop(fetchargs, "ctrl")) || {}

    ctx = utility.make_context.call({
      "opname" => "direct",
      "ctrl" => ctrl,
    }, @_rootctx)

    url = fetchdef["url"] || ""
    fetched, fetch_err = utility.fetcher.call(ctx, url, fetchdef)

    return { "ok" => false, "err" => utility.clean.call(ctx, fetch_err) } if fetch_err

    if fetched.nil?
      return {
        "ok" => false,
        "err" => ctx.make_error("direct_no_response", "response: undefined"),
      }
    end

    if fetched.is_a?(Hash)
      status = GandiHelpers.to_int(VoxgigStruct.getprop(fetched, "status"))
      headers = VoxgigStruct.getprop(fetched, "headers") || {}

      # No-body responses (204, 304) and explicit zero content-length must
      # skip JSON parsing — calling json() on an empty body errors.
      content_length = headers.is_a?(Hash) ? headers["content-length"] : nil
      no_body = status == 204 || status == 304 || content_length.to_s == "0"

      json_data = nil
      body_err = nil
      unless no_body
        jf = VoxgigStruct.getprop(fetched, "json")
        if jf.is_a?(Proc)
          begin
            json_data = jf.call
          rescue StandardError
            # Non-JSON body — leave data nil, keep status/headers.
            json_data = nil
          end
        end
        if true == VoxgigStruct.getprop(fetched, "unreadable")
          failed = status >= 200 && status < 300 ? nil : ctx.make_error("request_status",
            "request: #{status}: #{VoxgigStruct.getprop(fetched, 'statusText')}")
          body_err = GandiUtilities::UnreadableBody.call(ctx, status, headers,
            VoxgigStruct.getprop(fetched, "body"), fetchdef["headers"], failed)
        end
      end

      out = {
        "ok" => body_err.nil? && status >= 200 && status < 300,
        "status" => status,
        "headers" => headers,
        "data" => json_data,
      }
      out["err"] = utility.clean.call(ctx, body_err) unless body_err.nil?
      return out
    end

    return {
      "ok" => false,
      "err" => ctx.make_error("direct_invalid", "invalid response type"),
    }
  end

  # Raw GraphQL access: the pressure valve that makes the generated surface's
  # deliberate omissions (per-call selection sets, typed filter builders,
  # batching, subscriptions) livable — the whole schema stays reachable.
  #
  # Thin wrapper over the same prepare/fetch path direct uses, with the one
  # thing raw direct cannot do for GraphQL: a GraphQL failure rides HTTP 200
  # as a top-level `errors` array, so status alone would report a failed
  # query as ok.
  #
  # NOTE: like direct, this bypasses the feature pipeline — no retry,
  # ratelimit or paging features apply.
  def graphql(query, variables = nil, ctrl = nil)
    return op_denied("graphql") unless op_allowed?("graphql")

    res = raw_request({
      "method" => "POST",
      "headers" => { "content-type" => "application/json" },
      "body" => { "query" => query, "variables" => variables || {} },
      "ctrl" => ctrl || {},
    })

    # Errors are read BEFORE any status check: a GraphQL parse or validation
    # failure comes back as HTTP 400 carrying the standard { errors: [...] }
    # body, and the raw path represents a non-2xx as ok:false with no err —
    # so returning early on status would discard the server's own
    # diagnostics, which are the only useful part of that response.
    errors = VoxgigStruct.getpath(res, "data.errors")

    if errors.is_a?(Array) && !errors.empty?
      first = errors[0].is_a?(Hash) ? errors[0] : {}
      msg = first["message"]
      msg = "graphql error" if msg.nil? || msg.to_s.empty?
      res["ok"] = false
      res["err"] = GandiError.new(
        "GandiSDK: graphql: #{msg}", code: "graphql_error")
      res["graphql"] = errors
    end

    res
  end


  # Canonical facade: client.AccessToken.list / client.AccessToken.load({ "id" => ... })
  def AccessToken(data = nil)
    require_relative 'entity/access_token_entity'
    AccessTokenEntity.new(self, data)
  end


  # Canonical facade: client.AcmeAccount.list / client.AcmeAccount.load({ "id" => ... })
  def AcmeAccount(data = nil)
    require_relative 'entity/acme_account_entity'
    AcmeAccountEntity.new(self, data)
  end


  # Canonical facade: client.AcmeDomain.list / client.AcmeDomain.load({ "id" => ... })
  def AcmeDomain(data = nil)
    require_relative 'entity/acme_domain_entity'
    AcmeDomainEntity.new(self, data)
  end


  # Canonical facade: client.AcmePrice.list / client.AcmePrice.load({ "id" => ... })
  def AcmePrice(data = nil)
    require_relative 'entity/acme_price_entity'
    AcmePriceEntity.new(self, data)
  end


  # Canonical facade: client.AcmeSubscription.list / client.AcmeSubscription.load({ "id" => ... })
  def AcmeSubscription(data = nil)
    require_relative 'entity/acme_subscription_entity'
    AcmeSubscriptionEntity.new(self, data)
  end


  # Canonical facade: client.BillingInfo.list / client.BillingInfo.load({ "id" => ... })
  def BillingInfo(data = nil)
    require_relative 'entity/billing_info_entity'
    BillingInfoEntity.new(self, data)
  end


  # Canonical facade: client.BillingPrice.list / client.BillingPrice.load({ "id" => ... })
  def BillingPrice(data = nil)
    require_relative 'entity/billing_price_entity'
    BillingPriceEntity.new(self, data)
  end


  # Canonical facade: client.CertificateDcv.list / client.CertificateDcv.load({ "id" => ... })
  def CertificateDcv(data = nil)
    require_relative 'entity/certificate_dcv_entity'
    CertificateDcvEntity.new(self, data)
  end


  # Canonical facade: client.CertificatePackage.list / client.CertificatePackage.load({ "id" => ... })
  def CertificatePackage(data = nil)
    require_relative 'entity/certificate_package_entity'
    CertificatePackageEntity.new(self, data)
  end


  # Canonical facade: client.CertificatePem.list / client.CertificatePem.load({ "id" => ... })
  def CertificatePem(data = nil)
    require_relative 'entity/certificate_pem_entity'
    CertificatePemEntity.new(self, data)
  end


  # Canonical facade: client.CertificateRenewal.list / client.CertificateRenewal.load({ "id" => ... })
  def CertificateRenewal(data = nil)
    require_relative 'entity/certificate_renewal_entity'
    CertificateRenewalEntity.new(self, data)
  end


  # Canonical facade: client.CertificateTag.list / client.CertificateTag.load({ "id" => ... })
  def CertificateTag(data = nil)
    require_relative 'entity/certificate_tag_entity'
    CertificateTagEntity.new(self, data)
  end


  # Canonical facade: client.Comment.list / client.Comment.load({ "id" => ... })
  def Comment(data = nil)
    require_relative 'entity/comment_entity'
    CommentEntity.new(self, data)
  end


  # Canonical facade: client.Domain.list / client.Domain.load({ "id" => ... })
  def Domain(data = nil)
    require_relative 'entity/domain_entity'
    DomainEntity.new(self, data)
  end


  # Canonical facade: client.DomainAvailability.list / client.DomainAvailability.load({ "id" => ... })
  def DomainAvailability(data = nil)
    require_relative 'entity/domain_availability_entity'
    DomainAvailabilityEntity.new(self, data)
  end


  # Canonical facade: client.DomainChangeOwner.list / client.DomainChangeOwner.load({ "id" => ... })
  def DomainChangeOwner(data = nil)
    require_relative 'entity/domain_change_owner_entity'
    DomainChangeOwnerEntity.new(self, data)
  end


  # Canonical facade: client.DomainClaim.list / client.DomainClaim.load({ "id" => ... })
  def DomainClaim(data = nil)
    require_relative 'entity/domain_claim_entity'
    DomainClaimEntity.new(self, data)
  end


  # Canonical facade: client.DomainContact.list / client.DomainContact.load({ "id" => ... })
  def DomainContact(data = nil)
    require_relative 'entity/domain_contact_entity'
    DomainContactEntity.new(self, data)
  end


  # Canonical facade: client.DomainDnskey.list / client.DomainDnskey.load({ "id" => ... })
  def DomainDnskey(data = nil)
    require_relative 'entity/domain_dnskey_entity'
    DomainDnskeyEntity.new(self, data)
  end


  # Canonical facade: client.DomainDnssec.list / client.DomainDnssec.load({ "id" => ... })
  def DomainDnssec(data = nil)
    require_relative 'entity/domain_dnssec_entity'
    DomainDnssecEntity.new(self, data)
  end


  # Canonical facade: client.DomainHost.list / client.DomainHost.load({ "id" => ... })
  def DomainHost(data = nil)
    require_relative 'entity/domain_host_entity'
    DomainHostEntity.new(self, data)
  end


  # Canonical facade: client.DomainLivedns.list / client.DomainLivedns.load({ "id" => ... })
  def DomainLivedns(data = nil)
    require_relative 'entity/domain_livedns_entity'
    DomainLivednsEntity.new(self, data)
  end


  # Canonical facade: client.DomainNameserver.list / client.DomainNameserver.load({ "id" => ... })
  def DomainNameserver(data = nil)
    require_relative 'entity/domain_nameserver_entity'
    DomainNameserverEntity.new(self, data)
  end


  # Canonical facade: client.DomainTag.list / client.DomainTag.load({ "id" => ... })
  def DomainTag(data = nil)
    require_relative 'entity/domain_tag_entity'
    DomainTagEntity.new(self, data)
  end


  # Canonical facade: client.DomainTransfer.list / client.DomainTransfer.load({ "id" => ... })
  def DomainTransfer(data = nil)
    require_relative 'entity/domain_transfer_entity'
    DomainTransferEntity.new(self, data)
  end


  # Canonical facade: client.DomainWebredir.list / client.DomainWebredir.load({ "id" => ... })
  def DomainWebredir(data = nil)
    require_relative 'entity/domain_webredir_entity'
    DomainWebredirEntity.new(self, data)
  end


  # Canonical facade: client.EmailForward.list / client.EmailForward.load({ "id" => ... })
  def EmailForward(data = nil)
    require_relative 'entity/email_forward_entity'
    EmailForwardEntity.new(self, data)
  end


  # Canonical facade: client.EmailMailbox.list / client.EmailMailbox.load({ "id" => ... })
  def EmailMailbox(data = nil)
    require_relative 'entity/email_mailbox_entity'
    EmailMailboxEntity.new(self, data)
  end


  # Canonical facade: client.EmailMigration.list / client.EmailMigration.load({ "id" => ... })
  def EmailMigration(data = nil)
    require_relative 'entity/email_migration_entity'
    EmailMigrationEntity.new(self, data)
  end


  # Canonical facade: client.EmailOffer.list / client.EmailOffer.load({ "id" => ... })
  def EmailOffer(data = nil)
    require_relative 'entity/email_offer_entity'
    EmailOfferEntity.new(self, data)
  end


  # Canonical facade: client.EmailSlot.list / client.EmailSlot.load({ "id" => ... })
  def EmailSlot(data = nil)
    require_relative 'entity/email_slot_entity'
    EmailSlotEntity.new(self, data)
  end


  # Canonical facade: client.HostingApplication.list / client.HostingApplication.load({ "id" => ... })
  def HostingApplication(data = nil)
    require_relative 'entity/hosting_application_entity'
    HostingApplicationEntity.new(self, data)
  end


  # Canonical facade: client.HostingInstance.list / client.HostingInstance.load({ "id" => ... })
  def HostingInstance(data = nil)
    require_relative 'entity/hosting_instance_entity'
    HostingInstanceEntity.new(self, data)
  end


  # Canonical facade: client.HostingVhost.list / client.HostingVhost.load({ "id" => ... })
  def HostingVhost(data = nil)
    require_relative 'entity/hosting_vhost_entity'
    HostingVhostEntity.new(self, data)
  end


  # Canonical facade: client.IssuedCertificate.list / client.IssuedCertificate.load({ "id" => ... })
  def IssuedCertificate(data = nil)
    require_relative 'entity/issued_certificate_entity'
    IssuedCertificateEntity.new(self, data)
  end


  # Canonical facade: client.LinkedZone.list / client.LinkedZone.load({ "id" => ... })
  def LinkedZone(data = nil)
    require_relative 'entity/linked_zone_entity'
    LinkedZoneEntity.new(self, data)
  end


  # Canonical facade: client.LinkedZoneDeployment.list / client.LinkedZoneDeployment.load({ "id" => ... })
  def LinkedZoneDeployment(data = nil)
    require_relative 'entity/linked_zone_deployment_entity'
    LinkedZoneDeploymentEntity.new(self, data)
  end


  # Canonical facade: client.LinkedZoneDomain.list / client.LinkedZoneDomain.load({ "id" => ... })
  def LinkedZoneDomain(data = nil)
    require_relative 'entity/linked_zone_domain_entity'
    LinkedZoneDomainEntity.new(self, data)
  end


  # Canonical facade: client.LinkedZoneTask.list / client.LinkedZoneTask.load({ "id" => ... })
  def LinkedZoneTask(data = nil)
    require_relative 'entity/linked_zone_task_entity'
    LinkedZoneTaskEntity.new(self, data)
  end


  # Canonical facade: client.LivednsAxfrSlave.list / client.LivednsAxfrSlave.load({ "id" => ... })
  def LivednsAxfrSlave(data = nil)
    require_relative 'entity/livedns_axfr_slave_entity'
    LivednsAxfrSlaveEntity.new(self, data)
  end


  # Canonical facade: client.LivednsAxfrTsig.list / client.LivednsAxfrTsig.load({ "id" => ... })
  def LivednsAxfrTsig(data = nil)
    require_relative 'entity/livedns_axfr_tsig_entity'
    LivednsAxfrTsigEntity.new(self, data)
  end


  # Canonical facade: client.LivednsDomain.list / client.LivednsDomain.load({ "id" => ... })
  def LivednsDomain(data = nil)
    require_relative 'entity/livedns_domain_entity'
    LivednsDomainEntity.new(self, data)
  end


  # Canonical facade: client.LivednsKey.list / client.LivednsKey.load({ "id" => ... })
  def LivednsKey(data = nil)
    require_relative 'entity/livedns_key_entity'
    LivednsKeyEntity.new(self, data)
  end


  # Canonical facade: client.LivednsNameserver.list / client.LivednsNameserver.load({ "id" => ... })
  def LivednsNameserver(data = nil)
    require_relative 'entity/livedns_nameserver_entity'
    LivednsNameserverEntity.new(self, data)
  end


  # Canonical facade: client.LivednsRecord.list / client.LivednsRecord.load({ "id" => ... })
  def LivednsRecord(data = nil)
    require_relative 'entity/livedns_record_entity'
    LivednsRecordEntity.new(self, data)
  end


  # Canonical facade: client.LivednsRrtype.list / client.LivednsRrtype.load({ "id" => ... })
  def LivednsRrtype(data = nil)
    require_relative 'entity/livedns_rrtype_entity'
    LivednsRrtypeEntity.new(self, data)
  end


  # Canonical facade: client.LivednsSnapshot.list / client.LivednsSnapshot.load({ "id" => ... })
  def LivednsSnapshot(data = nil)
    require_relative 'entity/livedns_snapshot_entity'
    LivednsSnapshotEntity.new(self, data)
  end


  # Canonical facade: client.LivednsTsigKey.list / client.LivednsTsigKey.load({ "id" => ... })
  def LivednsTsigKey(data = nil)
    require_relative 'entity/livedns_tsig_key_entity'
    LivednsTsigKeyEntity.new(self, data)
  end


  # Canonical facade: client.Mailbox.list / client.Mailbox.load({ "id" => ... })
  def Mailbox(data = nil)
    require_relative 'entity/mailbox_entity'
    MailboxEntity.new(self, data)
  end


  # Canonical facade: client.MailboxDomain.list / client.MailboxDomain.load({ "id" => ... })
  def MailboxDomain(data = nil)
    require_relative 'entity/mailbox_domain_entity'
    MailboxDomainEntity.new(self, data)
  end


  # Canonical facade: client.MailboxForward.list / client.MailboxForward.load({ "id" => ... })
  def MailboxForward(data = nil)
    require_relative 'entity/mailbox_forward_entity'
    MailboxForwardEntity.new(self, data)
  end


  # Canonical facade: client.MailboxProduct.list / client.MailboxProduct.load({ "id" => ... })
  def MailboxProduct(data = nil)
    require_relative 'entity/mailbox_product_entity'
    MailboxProductEntity.new(self, data)
  end


  # Canonical facade: client.MailboxQuota.list / client.MailboxQuota.load({ "id" => ... })
  def MailboxQuota(data = nil)
    require_relative 'entity/mailbox_quota_entity'
    MailboxQuotaEntity.new(self, data)
  end


  # Canonical facade: client.MailboxSlot.list / client.MailboxSlot.load({ "id" => ... })
  def MailboxSlot(data = nil)
    require_relative 'entity/mailbox_slot_entity'
    MailboxSlotEntity.new(self, data)
  end


  # Canonical facade: client.Organization.list / client.Organization.load({ "id" => ... })
  def Organization(data = nil)
    require_relative 'entity/organization_entity'
    OrganizationEntity.new(self, data)
  end


  # Canonical facade: client.OrganizationCustomer.list / client.OrganizationCustomer.load({ "id" => ... })
  def OrganizationCustomer(data = nil)
    require_relative 'entity/organization_customer_entity'
    OrganizationCustomerEntity.new(self, data)
  end


  # Canonical facade: client.Template.list / client.Template.load({ "id" => ... })
  def Template(data = nil)
    require_relative 'entity/template_entity'
    TemplateEntity.new(self, data)
  end


  # Canonical facade: client.TemplateDispatch.list / client.TemplateDispatch.load({ "id" => ... })
  def TemplateDispatch(data = nil)
    require_relative 'entity/template_dispatch_entity'
    TemplateDispatchEntity.new(self, data)
  end


  # Canonical facade: client.Tld.list / client.Tld.load({ "id" => ... })
  def Tld(data = nil)
    require_relative 'entity/tld_entity'
    TldEntity.new(self, data)
  end


  # Canonical facade: client.User.list / client.User.load({ "id" => ... })
  def User(data = nil)
    require_relative 'entity/user_entity'
    UserEntity.new(self, data)
  end



  def self.test(testopts = nil, sdkopts = nil)
    sdkopts = sdkopts || {}
    sdkopts = VoxgigStruct.clone(sdkopts)
    sdkopts = {} unless sdkopts.is_a?(Hash)

    testopts = testopts || {}
    testopts = VoxgigStruct.clone(testopts)
    testopts = {} unless testopts.is_a?(Hash)
    testopts["active"] = true

    VoxgigStruct.setpath(sdkopts, "feature.test", testopts)

    sdk = GandiSDK.new(sdkopts)
    sdk.mode = "test"
    sdk
  end
end
