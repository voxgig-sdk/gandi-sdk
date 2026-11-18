# Gandi SDK

from gandi_sdk.utility.voxgig_struct import voxgig_struct as vs
from gandi_sdk.core.utility_type import GandiUtility
from gandi_sdk.core.spec import GandiSpec
from gandi_sdk.core import helpers
from gandi_sdk.utility.prepare_method import allowed
from gandi_sdk.utility.result_body import unreadable_body

# Load utility registration (populates Utility._registrar)
from gandi_sdk.utility import register

# Load features
from gandi_sdk.feature.base_feature import GandiBaseFeature
from gandi_sdk.features import _has_feature, _make_feature


class GandiSDK:
    # The options hold the credential. A slot keeps them reachable as
    # `client.options` and out of `vars(client)` and every attribute dump;
    # the dict entry keeps the instance open for everything else.
    __slots__ = ("_options", "__dict__")

    def __init__(self, options=None):
        self.mode = "live"
        self.features = []
        self._options = None

        utility = GandiUtility()
        self._utility = utility

        from gandi_sdk.config import shared_config
        config = shared_config()

        self._rootctx = utility.make_context({
            "client": self,
            "utility": utility,
            "config": config,
            "options": options if options is not None else {},
            "shared": {},
        }, None)

        self.options = utility.make_options(self._rootctx)

        if vs.getpath(self.options, "feature.test.active") is True:
            self.mode = "test"

        self._rootctx.options = self.options

        # Add features in the resolved order (make_options puts an explicit
        # list order first, else defaults to test-first). Ordering matters: the
        # `test` feature installs the base mock transport and the transport
        # features (retry/cache/netsim/proxy/ratelimit) wrap whatever is
        # current, so `test` must be added before them to sit at the base.
        # Extension feature INSTANCES come from the RAW construction
        # options - extend is consumed exactly once, here. make_options
        # strips the key before cloning (vs.clone flattens arbitrary
        # objects), so self.options never carries the instances.
        feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
        extend = options.get("extend") if isinstance(options, dict) else None
        if not isinstance(extend, list):
            extend = []
        if feature_opts is not None:
            featureorder = vs.getpath(self.options, "__derived__.featureorder")
            if isinstance(featureorder, list):
                for fname in featureorder:
                    fopts = helpers.to_map(feature_opts.get(fname))
                    if fopts is not None and fopts.get("active") is True:
                        # An active name with no generated feature class is
                        # legal when an extend-supplied instance carries that
                        # name (station's adopt path): the instance is added
                        # below, positioned by its own __after__ entry, so
                        # skip it here rather than add a BaseFeature stray
                        # that would silently shift feature positions.
                        if not _has_feature(fname) and any(
                            fname == (f.get("name") if isinstance(f, dict)
                                      else getattr(f, "name", None))
                            for f in extend
                        ):
                            continue
                        utility.feature_add(self._rootctx, _make_feature(fname))

        # Add extension features.
        for f in extend:
            if isinstance(f, dict) or (hasattr(f, "get_name") and callable(f.get_name)):
                utility.feature_add(self._rootctx, f)

        # Initialize features.
        for f in self.features:
            utility.feature_init(self._rootctx, f)

        utility.feature_hook(self._rootctx, "PostConstruct")

        # #BuildFeatures

    @property
    def options(self):
        return self._options

    @options.setter
    def options(self, value):
        self._options = value

    def __repr__(self):
        return "GandiSDK(mode=" + repr(self.mode) + ")"

    def options_map(self):
        out = vs.clone(self.options)
        if isinstance(out, dict):
            return out
        return {}

    def get_utility(self):
        return GandiUtility.copy(self._utility)

    def get_root_ctx(self):
        return self._rootctx

    def secrets(self):
        _s = getattr(self, "_secrets", None)
        return None if _s is None else _s.sekreto()

    def prepare(self, fetchargs=None):
        utility = self._utility

        if fetchargs is None:
            fetchargs = {}

        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "prepare",
            "ctrl": ctrl,
        }, self._rootctx)

        if getattr(self, "_secrets", None) is not None:
            self._secrets.resolve()

        options = self.options

        path = vs.getprop(fetchargs, "path") or ""
        if not isinstance(path, str):
            path = ""

        method = vs.getprop(fetchargs, "method") or "GET"
        if not isinstance(method, str):
            method = "GET"
        method = method.upper()

        allow_method = vs.getpath(options, "allow.method")
        if not allowed(allow_method, method):
            raise ctx.make_error("spec_method_allow",
                'Method "' + method +
                '" not allowed by SDK option allow.method value: "' + str(allow_method) + '"')

        params = helpers.to_map(vs.getprop(fetchargs, "params"))
        if params is None:
            params = {}
        query = helpers.to_map(vs.getprop(fetchargs, "query"))
        if query is None:
            query = {}

        headers = utility.prepare_headers(ctx)

        base = vs.getprop(options, "base") or ""
        if not isinstance(base, str):
            base = ""
        prefix = vs.getprop(options, "prefix") or ""
        if not isinstance(prefix, str):
            prefix = ""
        suffix = vs.getprop(options, "suffix") or ""
        if not isinstance(suffix, str):
            suffix = ""

        ctx.spec = GandiSpec({
            "base": base,
            "prefix": prefix,
            "suffix": suffix,
            "path": path,
            "method": method,
            "params": params,
            "query": query,
            "headers": headers,
            "body": vs.getprop(fetchargs, "body"),
            "step": "start",
        })

        # Merge user-provided headers.
        uh = vs.getprop(fetchargs, "headers")
        if isinstance(uh, dict):
            for k, v in uh.items():
                ctx.spec.headers[k] = v

        # A raw request has no point to declare its response type, so it asks
        # for the JSON it reads: an API that negotiates on Accept otherwise
        # answers in its own default format. A caller's own accept wins.
        if not any(str(k).lower() == "accept" for k in ctx.spec.headers):
            ctx.spec.headers["accept"] = "application/json"

        _, err = utility.prepare_auth(ctx)
        if err is not None:
            raise err

        fetchdef, err = utility.make_fetch_def(ctx)
        if err is not None:
            raise err

        return fetchdef

    # Raw endpoint access is operator-controllable, like every entity op.
    # Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
    # either one reaches the same endpoint.
    def direct(self, fetchargs=None):
        if not self._op_allowed("direct"):
            return self._op_denied("direct")

        return self._raw_request(fetchargs)

    # Is this raw-access op permitted by the SDK's allow.op option?
    def _op_allowed(self, op):
        return allowed(vs.getpath(self.options, "allow.op"), op)

    def _op_denied(self, op):
        allow_op = vs.getpath(self.options, "allow.op")
        return {
            "ok": False,
            "err": Exception(
                "GandiSDK: " + op + ": operation not allowed by"
                ' SDK option allow.op value: "' + str(allow_op) + '"'),
        }

    # Ungated request path shared by direct and graphql, each of which checks
    # its own allow.op token first. Private, rather than a flag on fetchargs:
    # a caller-supplied marker would let anyone opt straight back out of the
    # gate by passing it.
    def _raw_request(self, fetchargs=None):
        utility = self._utility

        try:
            fetchdef = self.prepare(fetchargs)
        except Exception as err:
            # direct() is the raw-HTTP escape hatch: it never raises, it
            # returns a result object callers branch on via result["ok"].
            # That error never passes through make_error, so it is cleaned.
            return {"ok": False, "err": utility.clean(self._rootctx, err)}

        if fetchargs is None:
            fetchargs = {}
        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "direct",
            "ctrl": ctrl,
        }, self._rootctx)

        url = fetchdef.get("url", "")
        fetched, fetch_err = utility.fetcher(ctx, url, fetchdef)

        if fetch_err is not None:
            return {"ok": False, "err": utility.clean(ctx, fetch_err)}

        if fetched is None:
            return {
                "ok": False,
                "err": ctx.make_error("direct_no_response", "response: undefined"),
            }

        if isinstance(fetched, dict):
            status = helpers.to_int(vs.getprop(fetched, "status"))
            headers = vs.getprop(fetched, "headers") or {}

            # No-body responses (204, 304) and explicit zero content-length
            # must skip JSON parsing — calling json() on an empty body raises.
            content_length = None
            if isinstance(headers, dict):
                content_length = headers.get("content-length")
            no_body = status in (204, 304) or str(content_length) == "0"

            json_data = None
            body_err = None
            if not no_body:
                jf = vs.getprop(fetched, "json")
                if callable(jf):
                    try:
                        json_data = jf()
                    except Exception:
                        # Non-JSON body (e.g. text/plain, text/html). Surface
                        # status + headers but leave data as None.
                        json_data = None
                if vs.getprop(fetched, "unreadable") is True:
                    failed = None if 200 <= status < 300 else ctx.make_error(
                        "request_status",
                        "request: " + str(status) + ": " + str(vs.getprop(fetched, "statusText")))
                    body_err = unreadable_body(ctx, status, headers, vs.getprop(fetched, "body"),
                                               fetchdef.get("headers"), failed)

            out = {
                "ok": body_err is None and status >= 200 and status < 300,
                "status": status,
                "headers": headers,
                "data": json_data,
            }
            if body_err is not None:
                out["err"] = utility.clean(ctx, body_err)
            return out

        return {
            "ok": False,
            "err": ctx.make_error("direct_invalid", "invalid response type"),
        }

    # Raw GraphQL access: the pressure valve that makes the generated
    # surface's deliberate omissions (per-call selection sets, typed filter
    # builders, batching, subscriptions) livable — the whole schema stays
    # reachable.
    #
    # Thin wrapper over the same prepare/fetch path direct uses, with the one
    # thing raw direct cannot do for GraphQL: a GraphQL failure rides HTTP 200
    # as a top-level `errors` array, so status alone would report a failed
    # query as ok.
    #
    # NOTE: like direct, this bypasses the feature pipeline — no retry,
    # ratelimit or paging features apply.
    def graphql(self, query, variables=None, ctrl=None):
        if not self._op_allowed("graphql"):
            return self._op_denied("graphql")

        res = self._raw_request({
            "method": "POST",
            "headers": {"content-type": "application/json"},
            "body": {"query": query, "variables": variables or {}},
            "ctrl": ctrl or {},
        })

        # Errors are read BEFORE any status check: a GraphQL parse or
        # validation failure comes back as HTTP 400 carrying the standard
        # { errors: [...] } body, and the raw path represents a non-2xx as
        # ok:False with no err — so returning early on status would discard
        # the server's own diagnostics, which are the only useful part of
        # that response.
        errors = vs.getpath(res, "data.errors")

        if isinstance(errors, list) and 0 < len(errors):
            first = errors[0] if isinstance(errors[0], dict) else {}
            msg = first.get("message") or "graphql error"
            res["ok"] = False
            res["err"] = Exception("GandiSDK: graphql: " + str(msg))
            res["graphql"] = errors

        return res


    def AccessToken(self, data=None) -> "AccessTokenEntity":
        """Entity factory: client.AccessToken().list() / client.AccessToken().load({"id": ...})."""
        from gandi_sdk.entity.access_token_entity import AccessTokenEntity
        return AccessTokenEntity(self, data)


    def AcmeAccount(self, data=None) -> "AcmeAccountEntity":
        """Entity factory: client.AcmeAccount().list() / client.AcmeAccount().load({"id": ...})."""
        from gandi_sdk.entity.acme_account_entity import AcmeAccountEntity
        return AcmeAccountEntity(self, data)


    def AcmeDomain(self, data=None) -> "AcmeDomainEntity":
        """Entity factory: client.AcmeDomain().list() / client.AcmeDomain().load({"id": ...})."""
        from gandi_sdk.entity.acme_domain_entity import AcmeDomainEntity
        return AcmeDomainEntity(self, data)


    def AcmePrice(self, data=None) -> "AcmePriceEntity":
        """Entity factory: client.AcmePrice().list() / client.AcmePrice().load({"id": ...})."""
        from gandi_sdk.entity.acme_price_entity import AcmePriceEntity
        return AcmePriceEntity(self, data)


    def AcmeSubscription(self, data=None) -> "AcmeSubscriptionEntity":
        """Entity factory: client.AcmeSubscription().list() / client.AcmeSubscription().load({"id": ...})."""
        from gandi_sdk.entity.acme_subscription_entity import AcmeSubscriptionEntity
        return AcmeSubscriptionEntity(self, data)


    def BillingInfo(self, data=None) -> "BillingInfoEntity":
        """Entity factory: client.BillingInfo().list() / client.BillingInfo().load({"id": ...})."""
        from gandi_sdk.entity.billing_info_entity import BillingInfoEntity
        return BillingInfoEntity(self, data)


    def BillingPrice(self, data=None) -> "BillingPriceEntity":
        """Entity factory: client.BillingPrice().list() / client.BillingPrice().load({"id": ...})."""
        from gandi_sdk.entity.billing_price_entity import BillingPriceEntity
        return BillingPriceEntity(self, data)


    def CertificateDcv(self, data=None) -> "CertificateDcvEntity":
        """Entity factory: client.CertificateDcv().list() / client.CertificateDcv().load({"id": ...})."""
        from gandi_sdk.entity.certificate_dcv_entity import CertificateDcvEntity
        return CertificateDcvEntity(self, data)


    def CertificatePackage(self, data=None) -> "CertificatePackageEntity":
        """Entity factory: client.CertificatePackage().list() / client.CertificatePackage().load({"id": ...})."""
        from gandi_sdk.entity.certificate_package_entity import CertificatePackageEntity
        return CertificatePackageEntity(self, data)


    def CertificatePem(self, data=None) -> "CertificatePemEntity":
        """Entity factory: client.CertificatePem().list() / client.CertificatePem().load({"id": ...})."""
        from gandi_sdk.entity.certificate_pem_entity import CertificatePemEntity
        return CertificatePemEntity(self, data)


    def CertificateRenewal(self, data=None) -> "CertificateRenewalEntity":
        """Entity factory: client.CertificateRenewal().list() / client.CertificateRenewal().load({"id": ...})."""
        from gandi_sdk.entity.certificate_renewal_entity import CertificateRenewalEntity
        return CertificateRenewalEntity(self, data)


    def CertificateTag(self, data=None) -> "CertificateTagEntity":
        """Entity factory: client.CertificateTag().list() / client.CertificateTag().load({"id": ...})."""
        from gandi_sdk.entity.certificate_tag_entity import CertificateTagEntity
        return CertificateTagEntity(self, data)


    def Comment(self, data=None) -> "CommentEntity":
        """Entity factory: client.Comment().list() / client.Comment().load({"id": ...})."""
        from gandi_sdk.entity.comment_entity import CommentEntity
        return CommentEntity(self, data)


    def Domain(self, data=None) -> "DomainEntity":
        """Entity factory: client.Domain().list() / client.Domain().load({"id": ...})."""
        from gandi_sdk.entity.domain_entity import DomainEntity
        return DomainEntity(self, data)


    def DomainAvailability(self, data=None) -> "DomainAvailabilityEntity":
        """Entity factory: client.DomainAvailability().list() / client.DomainAvailability().load({"id": ...})."""
        from gandi_sdk.entity.domain_availability_entity import DomainAvailabilityEntity
        return DomainAvailabilityEntity(self, data)


    def DomainChangeOwner(self, data=None) -> "DomainChangeOwnerEntity":
        """Entity factory: client.DomainChangeOwner().list() / client.DomainChangeOwner().load({"id": ...})."""
        from gandi_sdk.entity.domain_change_owner_entity import DomainChangeOwnerEntity
        return DomainChangeOwnerEntity(self, data)


    def DomainClaim(self, data=None) -> "DomainClaimEntity":
        """Entity factory: client.DomainClaim().list() / client.DomainClaim().load({"id": ...})."""
        from gandi_sdk.entity.domain_claim_entity import DomainClaimEntity
        return DomainClaimEntity(self, data)


    def DomainContact(self, data=None) -> "DomainContactEntity":
        """Entity factory: client.DomainContact().list() / client.DomainContact().load({"id": ...})."""
        from gandi_sdk.entity.domain_contact_entity import DomainContactEntity
        return DomainContactEntity(self, data)


    def DomainDnskey(self, data=None) -> "DomainDnskeyEntity":
        """Entity factory: client.DomainDnskey().list() / client.DomainDnskey().load({"id": ...})."""
        from gandi_sdk.entity.domain_dnskey_entity import DomainDnskeyEntity
        return DomainDnskeyEntity(self, data)


    def DomainDnssec(self, data=None) -> "DomainDnssecEntity":
        """Entity factory: client.DomainDnssec().list() / client.DomainDnssec().load({"id": ...})."""
        from gandi_sdk.entity.domain_dnssec_entity import DomainDnssecEntity
        return DomainDnssecEntity(self, data)


    def DomainHost(self, data=None) -> "DomainHostEntity":
        """Entity factory: client.DomainHost().list() / client.DomainHost().load({"id": ...})."""
        from gandi_sdk.entity.domain_host_entity import DomainHostEntity
        return DomainHostEntity(self, data)


    def DomainLivedns(self, data=None) -> "DomainLivednsEntity":
        """Entity factory: client.DomainLivedns().list() / client.DomainLivedns().load({"id": ...})."""
        from gandi_sdk.entity.domain_livedns_entity import DomainLivednsEntity
        return DomainLivednsEntity(self, data)


    def DomainNameserver(self, data=None) -> "DomainNameserverEntity":
        """Entity factory: client.DomainNameserver().list() / client.DomainNameserver().load({"id": ...})."""
        from gandi_sdk.entity.domain_nameserver_entity import DomainNameserverEntity
        return DomainNameserverEntity(self, data)


    def DomainTag(self, data=None) -> "DomainTagEntity":
        """Entity factory: client.DomainTag().list() / client.DomainTag().load({"id": ...})."""
        from gandi_sdk.entity.domain_tag_entity import DomainTagEntity
        return DomainTagEntity(self, data)


    def DomainTransfer(self, data=None) -> "DomainTransferEntity":
        """Entity factory: client.DomainTransfer().list() / client.DomainTransfer().load({"id": ...})."""
        from gandi_sdk.entity.domain_transfer_entity import DomainTransferEntity
        return DomainTransferEntity(self, data)


    def DomainWebredir(self, data=None) -> "DomainWebredirEntity":
        """Entity factory: client.DomainWebredir().list() / client.DomainWebredir().load({"id": ...})."""
        from gandi_sdk.entity.domain_webredir_entity import DomainWebredirEntity
        return DomainWebredirEntity(self, data)


    def EmailForward(self, data=None) -> "EmailForwardEntity":
        """Entity factory: client.EmailForward().list() / client.EmailForward().load({"id": ...})."""
        from gandi_sdk.entity.email_forward_entity import EmailForwardEntity
        return EmailForwardEntity(self, data)


    def EmailMailbox(self, data=None) -> "EmailMailboxEntity":
        """Entity factory: client.EmailMailbox().list() / client.EmailMailbox().load({"id": ...})."""
        from gandi_sdk.entity.email_mailbox_entity import EmailMailboxEntity
        return EmailMailboxEntity(self, data)


    def EmailMigration(self, data=None) -> "EmailMigrationEntity":
        """Entity factory: client.EmailMigration().list() / client.EmailMigration().load({"id": ...})."""
        from gandi_sdk.entity.email_migration_entity import EmailMigrationEntity
        return EmailMigrationEntity(self, data)


    def EmailOffer(self, data=None) -> "EmailOfferEntity":
        """Entity factory: client.EmailOffer().list() / client.EmailOffer().load({"id": ...})."""
        from gandi_sdk.entity.email_offer_entity import EmailOfferEntity
        return EmailOfferEntity(self, data)


    def EmailSlot(self, data=None) -> "EmailSlotEntity":
        """Entity factory: client.EmailSlot().list() / client.EmailSlot().load({"id": ...})."""
        from gandi_sdk.entity.email_slot_entity import EmailSlotEntity
        return EmailSlotEntity(self, data)


    def HostingApplication(self, data=None) -> "HostingApplicationEntity":
        """Entity factory: client.HostingApplication().list() / client.HostingApplication().load({"id": ...})."""
        from gandi_sdk.entity.hosting_application_entity import HostingApplicationEntity
        return HostingApplicationEntity(self, data)


    def HostingInstance(self, data=None) -> "HostingInstanceEntity":
        """Entity factory: client.HostingInstance().list() / client.HostingInstance().load({"id": ...})."""
        from gandi_sdk.entity.hosting_instance_entity import HostingInstanceEntity
        return HostingInstanceEntity(self, data)


    def HostingVhost(self, data=None) -> "HostingVhostEntity":
        """Entity factory: client.HostingVhost().list() / client.HostingVhost().load({"id": ...})."""
        from gandi_sdk.entity.hosting_vhost_entity import HostingVhostEntity
        return HostingVhostEntity(self, data)


    def IssuedCertificate(self, data=None) -> "IssuedCertificateEntity":
        """Entity factory: client.IssuedCertificate().list() / client.IssuedCertificate().load({"id": ...})."""
        from gandi_sdk.entity.issued_certificate_entity import IssuedCertificateEntity
        return IssuedCertificateEntity(self, data)


    def LinkedZone(self, data=None) -> "LinkedZoneEntity":
        """Entity factory: client.LinkedZone().list() / client.LinkedZone().load({"id": ...})."""
        from gandi_sdk.entity.linked_zone_entity import LinkedZoneEntity
        return LinkedZoneEntity(self, data)


    def LinkedZoneDeployment(self, data=None) -> "LinkedZoneDeploymentEntity":
        """Entity factory: client.LinkedZoneDeployment().list() / client.LinkedZoneDeployment().load({"id": ...})."""
        from gandi_sdk.entity.linked_zone_deployment_entity import LinkedZoneDeploymentEntity
        return LinkedZoneDeploymentEntity(self, data)


    def LinkedZoneDomain(self, data=None) -> "LinkedZoneDomainEntity":
        """Entity factory: client.LinkedZoneDomain().list() / client.LinkedZoneDomain().load({"id": ...})."""
        from gandi_sdk.entity.linked_zone_domain_entity import LinkedZoneDomainEntity
        return LinkedZoneDomainEntity(self, data)


    def LinkedZoneTask(self, data=None) -> "LinkedZoneTaskEntity":
        """Entity factory: client.LinkedZoneTask().list() / client.LinkedZoneTask().load({"id": ...})."""
        from gandi_sdk.entity.linked_zone_task_entity import LinkedZoneTaskEntity
        return LinkedZoneTaskEntity(self, data)


    def LivednsAxfrSlave(self, data=None) -> "LivednsAxfrSlaveEntity":
        """Entity factory: client.LivednsAxfrSlave().list() / client.LivednsAxfrSlave().load({"id": ...})."""
        from gandi_sdk.entity.livedns_axfr_slave_entity import LivednsAxfrSlaveEntity
        return LivednsAxfrSlaveEntity(self, data)


    def LivednsAxfrTsig(self, data=None) -> "LivednsAxfrTsigEntity":
        """Entity factory: client.LivednsAxfrTsig().list() / client.LivednsAxfrTsig().load({"id": ...})."""
        from gandi_sdk.entity.livedns_axfr_tsig_entity import LivednsAxfrTsigEntity
        return LivednsAxfrTsigEntity(self, data)


    def LivednsDomain(self, data=None) -> "LivednsDomainEntity":
        """Entity factory: client.LivednsDomain().list() / client.LivednsDomain().load({"id": ...})."""
        from gandi_sdk.entity.livedns_domain_entity import LivednsDomainEntity
        return LivednsDomainEntity(self, data)


    def LivednsKey(self, data=None) -> "LivednsKeyEntity":
        """Entity factory: client.LivednsKey().list() / client.LivednsKey().load({"id": ...})."""
        from gandi_sdk.entity.livedns_key_entity import LivednsKeyEntity
        return LivednsKeyEntity(self, data)


    def LivednsNameserver(self, data=None) -> "LivednsNameserverEntity":
        """Entity factory: client.LivednsNameserver().list() / client.LivednsNameserver().load({"id": ...})."""
        from gandi_sdk.entity.livedns_nameserver_entity import LivednsNameserverEntity
        return LivednsNameserverEntity(self, data)


    def LivednsRecord(self, data=None) -> "LivednsRecordEntity":
        """Entity factory: client.LivednsRecord().list() / client.LivednsRecord().load({"id": ...})."""
        from gandi_sdk.entity.livedns_record_entity import LivednsRecordEntity
        return LivednsRecordEntity(self, data)


    def LivednsRrtype(self, data=None) -> "LivednsRrtypeEntity":
        """Entity factory: client.LivednsRrtype().list() / client.LivednsRrtype().load({"id": ...})."""
        from gandi_sdk.entity.livedns_rrtype_entity import LivednsRrtypeEntity
        return LivednsRrtypeEntity(self, data)


    def LivednsSnapshot(self, data=None) -> "LivednsSnapshotEntity":
        """Entity factory: client.LivednsSnapshot().list() / client.LivednsSnapshot().load({"id": ...})."""
        from gandi_sdk.entity.livedns_snapshot_entity import LivednsSnapshotEntity
        return LivednsSnapshotEntity(self, data)


    def LivednsTsigKey(self, data=None) -> "LivednsTsigKeyEntity":
        """Entity factory: client.LivednsTsigKey().list() / client.LivednsTsigKey().load({"id": ...})."""
        from gandi_sdk.entity.livedns_tsig_key_entity import LivednsTsigKeyEntity
        return LivednsTsigKeyEntity(self, data)


    def Mailbox(self, data=None) -> "MailboxEntity":
        """Entity factory: client.Mailbox().list() / client.Mailbox().load({"id": ...})."""
        from gandi_sdk.entity.mailbox_entity import MailboxEntity
        return MailboxEntity(self, data)


    def MailboxDomain(self, data=None) -> "MailboxDomainEntity":
        """Entity factory: client.MailboxDomain().list() / client.MailboxDomain().load({"id": ...})."""
        from gandi_sdk.entity.mailbox_domain_entity import MailboxDomainEntity
        return MailboxDomainEntity(self, data)


    def MailboxForward(self, data=None) -> "MailboxForwardEntity":
        """Entity factory: client.MailboxForward().list() / client.MailboxForward().load({"id": ...})."""
        from gandi_sdk.entity.mailbox_forward_entity import MailboxForwardEntity
        return MailboxForwardEntity(self, data)


    def MailboxProduct(self, data=None) -> "MailboxProductEntity":
        """Entity factory: client.MailboxProduct().list() / client.MailboxProduct().load({"id": ...})."""
        from gandi_sdk.entity.mailbox_product_entity import MailboxProductEntity
        return MailboxProductEntity(self, data)


    def MailboxQuota(self, data=None) -> "MailboxQuotaEntity":
        """Entity factory: client.MailboxQuota().list() / client.MailboxQuota().load({"id": ...})."""
        from gandi_sdk.entity.mailbox_quota_entity import MailboxQuotaEntity
        return MailboxQuotaEntity(self, data)


    def MailboxSlot(self, data=None) -> "MailboxSlotEntity":
        """Entity factory: client.MailboxSlot().list() / client.MailboxSlot().load({"id": ...})."""
        from gandi_sdk.entity.mailbox_slot_entity import MailboxSlotEntity
        return MailboxSlotEntity(self, data)


    def Organization(self, data=None) -> "OrganizationEntity":
        """Entity factory: client.Organization().list() / client.Organization().load({"id": ...})."""
        from gandi_sdk.entity.organization_entity import OrganizationEntity
        return OrganizationEntity(self, data)


    def OrganizationCustomer(self, data=None) -> "OrganizationCustomerEntity":
        """Entity factory: client.OrganizationCustomer().list() / client.OrganizationCustomer().load({"id": ...})."""
        from gandi_sdk.entity.organization_customer_entity import OrganizationCustomerEntity
        return OrganizationCustomerEntity(self, data)


    def Template(self, data=None) -> "TemplateEntity":
        """Entity factory: client.Template().list() / client.Template().load({"id": ...})."""
        from gandi_sdk.entity.template_entity import TemplateEntity
        return TemplateEntity(self, data)


    def TemplateDispatch(self, data=None) -> "TemplateDispatchEntity":
        """Entity factory: client.TemplateDispatch().list() / client.TemplateDispatch().load({"id": ...})."""
        from gandi_sdk.entity.template_dispatch_entity import TemplateDispatchEntity
        return TemplateDispatchEntity(self, data)


    def Tld(self, data=None) -> "TldEntity":
        """Entity factory: client.Tld().list() / client.Tld().load({"id": ...})."""
        from gandi_sdk.entity.tld_entity import TldEntity
        return TldEntity(self, data)


    def User(self, data=None) -> "UserEntity":
        """Entity factory: client.User().list() / client.User().load({"id": ...})."""
        from gandi_sdk.entity.user_entity import UserEntity
        return UserEntity(self, data)



    @classmethod
    def test(cls, testopts=None, sdkopts=None) -> "GandiSDK":
        if sdkopts is None:
            sdkopts = {}
        sdkopts = vs.clone(sdkopts)
        if not isinstance(sdkopts, dict):
            sdkopts = {}

        if testopts is None:
            testopts = {}
        testopts = vs.clone(testopts)
        if not isinstance(testopts, dict):
            testopts = {}
        testopts["active"] = True

        vs.setpath(sdkopts, "feature.test", testopts)

        sdk = cls(sdkopts)
        sdk.mode = "test"

        return sdk


from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from gandi_sdk.entity.access_token_entity import AccessTokenEntity
    from gandi_sdk.entity.acme_account_entity import AcmeAccountEntity
    from gandi_sdk.entity.acme_domain_entity import AcmeDomainEntity
    from gandi_sdk.entity.acme_price_entity import AcmePriceEntity
    from gandi_sdk.entity.acme_subscription_entity import AcmeSubscriptionEntity
    from gandi_sdk.entity.billing_info_entity import BillingInfoEntity
    from gandi_sdk.entity.billing_price_entity import BillingPriceEntity
    from gandi_sdk.entity.certificate_dcv_entity import CertificateDcvEntity
    from gandi_sdk.entity.certificate_package_entity import CertificatePackageEntity
    from gandi_sdk.entity.certificate_pem_entity import CertificatePemEntity
    from gandi_sdk.entity.certificate_renewal_entity import CertificateRenewalEntity
    from gandi_sdk.entity.certificate_tag_entity import CertificateTagEntity
    from gandi_sdk.entity.comment_entity import CommentEntity
    from gandi_sdk.entity.domain_entity import DomainEntity
    from gandi_sdk.entity.domain_availability_entity import DomainAvailabilityEntity
    from gandi_sdk.entity.domain_change_owner_entity import DomainChangeOwnerEntity
    from gandi_sdk.entity.domain_claim_entity import DomainClaimEntity
    from gandi_sdk.entity.domain_contact_entity import DomainContactEntity
    from gandi_sdk.entity.domain_dnskey_entity import DomainDnskeyEntity
    from gandi_sdk.entity.domain_dnssec_entity import DomainDnssecEntity
    from gandi_sdk.entity.domain_host_entity import DomainHostEntity
    from gandi_sdk.entity.domain_livedns_entity import DomainLivednsEntity
    from gandi_sdk.entity.domain_nameserver_entity import DomainNameserverEntity
    from gandi_sdk.entity.domain_tag_entity import DomainTagEntity
    from gandi_sdk.entity.domain_transfer_entity import DomainTransferEntity
    from gandi_sdk.entity.domain_webredir_entity import DomainWebredirEntity
    from gandi_sdk.entity.email_forward_entity import EmailForwardEntity
    from gandi_sdk.entity.email_mailbox_entity import EmailMailboxEntity
    from gandi_sdk.entity.email_migration_entity import EmailMigrationEntity
    from gandi_sdk.entity.email_offer_entity import EmailOfferEntity
    from gandi_sdk.entity.email_slot_entity import EmailSlotEntity
    from gandi_sdk.entity.hosting_application_entity import HostingApplicationEntity
    from gandi_sdk.entity.hosting_instance_entity import HostingInstanceEntity
    from gandi_sdk.entity.hosting_vhost_entity import HostingVhostEntity
    from gandi_sdk.entity.issued_certificate_entity import IssuedCertificateEntity
    from gandi_sdk.entity.linked_zone_entity import LinkedZoneEntity
    from gandi_sdk.entity.linked_zone_deployment_entity import LinkedZoneDeploymentEntity
    from gandi_sdk.entity.linked_zone_domain_entity import LinkedZoneDomainEntity
    from gandi_sdk.entity.linked_zone_task_entity import LinkedZoneTaskEntity
    from gandi_sdk.entity.livedns_axfr_slave_entity import LivednsAxfrSlaveEntity
    from gandi_sdk.entity.livedns_axfr_tsig_entity import LivednsAxfrTsigEntity
    from gandi_sdk.entity.livedns_domain_entity import LivednsDomainEntity
    from gandi_sdk.entity.livedns_key_entity import LivednsKeyEntity
    from gandi_sdk.entity.livedns_nameserver_entity import LivednsNameserverEntity
    from gandi_sdk.entity.livedns_record_entity import LivednsRecordEntity
    from gandi_sdk.entity.livedns_rrtype_entity import LivednsRrtypeEntity
    from gandi_sdk.entity.livedns_snapshot_entity import LivednsSnapshotEntity
    from gandi_sdk.entity.livedns_tsig_key_entity import LivednsTsigKeyEntity
    from gandi_sdk.entity.mailbox_entity import MailboxEntity
    from gandi_sdk.entity.mailbox_domain_entity import MailboxDomainEntity
    from gandi_sdk.entity.mailbox_forward_entity import MailboxForwardEntity
    from gandi_sdk.entity.mailbox_product_entity import MailboxProductEntity
    from gandi_sdk.entity.mailbox_quota_entity import MailboxQuotaEntity
    from gandi_sdk.entity.mailbox_slot_entity import MailboxSlotEntity
    from gandi_sdk.entity.organization_entity import OrganizationEntity
    from gandi_sdk.entity.organization_customer_entity import OrganizationCustomerEntity
    from gandi_sdk.entity.template_entity import TemplateEntity
    from gandi_sdk.entity.template_dispatch_entity import TemplateDispatchEntity
    from gandi_sdk.entity.tld_entity import TldEntity
    from gandi_sdk.entity.user_entity import UserEntity
