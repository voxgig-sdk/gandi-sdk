<?php
declare(strict_types=1);

// Gandi SDK

require_once __DIR__ . '/utility/struct/Struct.php';
require_once __DIR__ . '/core/UtilityType.php';
require_once __DIR__ . '/core/Spec.php';
require_once __DIR__ . '/core/Helpers.php';

// Load utility registration
require_once __DIR__ . '/utility/Register.php';

// Load config and features
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/features.php';

use Voxgig\Struct\Struct;

// Features record diagnostic state on the client as dynamic properties
// (_retry, _cache, _metrics, ...); allow them explicitly (PHP 8.2+
// deprecates implicit dynamic properties).
#[\AllowDynamicProperties]
class GandiSDK implements \JsonSerializable
{
    public string $mode;
    public array $features;
    public ?array $options;

    private $_utility;
    private $_rootctx;

    public function __construct(array $options = [])
    {
        $this->mode = "live";
        $this->features = [];
        $this->options = null;

        $utility = new GandiUtility();
        $this->_utility = $utility;

        $config = GandiConfig::shared_config();

        $this->_rootctx = ($utility->make_context)([
            "client" => $this,
            "utility" => $utility,
            "config" => $config,
            "options" => $options ?? [],
            "shared" => [],
        ], null);

        $this->options = ($utility->make_options)($this->_rootctx);

        if (Struct::getpath($this->options, "feature.test.active") === true) {
            $this->mode = "test";
        }

        $this->_rootctx->options = $this->options;

        // Feature INSTANCES supplied at construction (the station adopt
        // path) are read from the RAW construction options - extend is
        // consumed exactly once, here; make_options strips it from the
        // processed map so options_map() stays clean data.
        $extend_val = is_array($options["extend"] ?? null) ? $options["extend"] : [];

        // Add features in the resolved order (make_options puts an explicit
        // list order first, else defaults to test-first). Ordering matters: the
        // `test` feature installs the base mock transport and the transport
        // features (retry/cache/netsim/proxy/ratelimit) wrap whatever is
        // current, so `test` must be added before them to sit at the base.
        $feature_opts = GandiHelpers::to_map(Struct::getprop($this->options, "feature"));
        if ($feature_opts) {
            $featureorder = Struct::getpath($this->options, "__derived__.featureorder");
            if (is_array($featureorder)) {
                foreach ($featureorder as $fname) {
                    $fopts = GandiHelpers::to_map($feature_opts[$fname] ?? null);
                    if ($fopts && isset($fopts["active"]) && $fopts["active"] === true) {
                        // An active name with no generated feature class is
                        // legal when an extend-supplied instance carries that
                        // name (station's adopt path): the instance is added
                        // below, positioned by its own __after__ entry, so
                        // skip it here rather than add a BaseFeature stray
                        // that would silently shift feature positions.
                        if (!GandiFeatures::has_feature($fname)) {
                            foreach ($extend_val as $ef) {
                                if (is_object($ef) && method_exists($ef, 'get_name')
                                    && $fname === $ef->get_name()) {
                                    continue 2;
                                }
                            }
                        }
                        ($utility->feature_add)($this->_rootctx, GandiFeatures::make_feature($fname));
                    }
                }
            }
        }

        // Add extension features.
        foreach ($extend_val as $f) {
            if (is_object($f) && method_exists($f, 'get_name')) {
                ($utility->feature_add)($this->_rootctx, $f);
            }
        }

        // Initialize features.
        foreach ($this->features as $f) {
            ($utility->feature_init)($this->_rootctx, $f);
        }

        ($utility->feature_hook)($this->_rootctx, "PostConstruct");
    }

    public function options_map(): array
    {
        $out = Struct::clone($this->options);
        return is_array($out) ? $out : [];
    }

    // The options hold the credential, so the default print and json form
    // name the client and nothing more; options_map() is the way to read
    // them back.
    public function jsonSerialize(): array
    {
        return ['name' => 'Gandi'];
    }

    public function __debugInfo(): array
    {
        return $this->jsonSerialize();
    }

    public function get_utility()
    {
        return GandiUtility::copy($this->_utility);
    }

    public function get_root_ctx()
    {
        return $this->_rootctx;
    }

    public function prepare(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;
        $fetchargs = $fetchargs ?? [];

        $ctrl = GandiHelpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "prepare",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $opts = $this->options;
        $path = Struct::getprop($fetchargs, "path") ?? "";
        $path = is_string($path) ? $path : "";
        $method_val = Struct::getprop($fetchargs, "method") ?? "GET";
        $method_val = strtoupper(is_string($method_val) && '' !== $method_val ? $method_val : "GET");
        $allow_method = Struct::getpath($opts, "allow.method");
        if (!GandiPrepareMethod::allowed($allow_method, $method_val)) {
            return ($utility->make_error)($ctx, $ctx->make_error("spec_method_allow",
                "Method \"" . $method_val . "\" not allowed by SDK option allow.method value: \"" .
                (is_string($allow_method) ? $allow_method : "") . "\""));
        }
        $params = GandiHelpers::to_map(Struct::getprop($fetchargs, "params")) ?? [];
        $query = GandiHelpers::to_map(Struct::getprop($fetchargs, "query")) ?? [];
        $headers = ($utility->prepare_headers)($ctx);

        $base = Struct::getprop($opts, "base") ?? "";
        $base = is_string($base) ? $base : "";
        $prefix = Struct::getprop($opts, "prefix") ?? "";
        $prefix = is_string($prefix) ? $prefix : "";
        $suffix = Struct::getprop($opts, "suffix") ?? "";
        $suffix = is_string($suffix) ? $suffix : "";

        $ctx->spec = new GandiSpec([
            "base" => $base, "prefix" => $prefix, "suffix" => $suffix,
            "path" => $path, "method" => $method_val,
            "params" => $params, "query" => $query, "headers" => $headers,
            "body" => Struct::getprop($fetchargs, "body"),
            "step" => "start",
        ]);

        // Merge user-provided headers.
        $uh = Struct::getprop($fetchargs, "headers");
        if (is_array($uh)) {
            foreach ($uh as $k => $v) {
                $ctx->spec->headers[$k] = $v;
            }
        }

        // A raw request has no point to declare its response type, so it asks
        // for the JSON it reads: an API that negotiates on Accept otherwise
        // answers in its own default format. A caller's own accept wins.
        $has_accept = false;
        foreach (array_keys($ctx->spec->headers) as $k) {
            if (strtolower((string)$k) === 'accept') {
                $has_accept = true;
                break;
            }
        }
        if (!$has_accept) {
            $ctx->spec->headers['accept'] = 'application/json';
        }

        [$_, $err] = ($utility->prepare_auth)($ctx);
        if ($err) {
            return ($utility->make_error)($ctx, $err);
        }

        [$fetchdef, $fd_err] = ($utility->make_fetch_def)($ctx);
        if ($fd_err) {
            return ($utility->make_error)($ctx, $fd_err);
        }
        return $fetchdef;
    }

    // Raw endpoint access is operator-controllable, like every entity op.
    // Blocking it means denying BOTH the 'direct' and 'graphql' tokens,
    // since either one reaches the same endpoint.
    public function direct(array $fetchargs = []): mixed
    {
        if (!$this->op_allowed("direct")) {
            return $this->op_denied("direct");
        }

        return $this->raw_request($fetchargs);
    }

    // Is this raw-access op permitted by the SDK's allow.op option?
    private function op_allowed(string $op): bool
    {
        return GandiPrepareMethod::allowed(Struct::getpath($this->options, "allow.op"), $op);
    }

    private function op_denied(string $op): array
    {
        $allow_op = Struct::getpath($this->options, "allow.op");
        return [
            "ok" => false,
            "err" => new GandiError($op . "_allow",
                "GandiSDK: " . $op . ": operation not allowed by" .
                " SDK option allow.op value: \"" . (string)$allow_op . "\""),
        ];
    }

    // Ungated request path shared by direct and graphql, each of which
    // checks its own allow.op token first. Private, rather than a flag on
    // fetchargs: a caller-supplied marker would let anyone opt straight back
    // out of the gate by passing it.
    private function raw_request(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;

        // direct() is the raw-HTTP escape hatch: it never throws, it returns
        // an {ok, err, ...} dict. prepare() now raises on error, so catch it
        // and surface the failure through the dict instead.
        try {
            $fetchdef = $this->prepare($fetchargs);
        } catch (\Throwable $err) {
            return ["ok" => false, "err" => $err];
        }

        $fetchargs = $fetchargs ?? [];
        $ctrl = GandiHelpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "direct",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $url = $fetchdef["url"] ?? "";
        [$fetched, $fetch_err] = ($utility->fetcher)($ctx, $url, $fetchdef);

        if ($fetch_err) {
            return ["ok" => false, "err" => ($utility->clean)($ctx, $fetch_err)];
        }

        if ($fetched === null) {
            return [
                "ok" => false,
                "err" => $ctx->make_error("direct_no_response", "response: undefined"),
            ];
        }

        if (is_array($fetched)) {
            $status = GandiHelpers::to_int(Struct::getprop($fetched, "status"));
            $headers = Struct::getprop($fetched, "headers") ?? [];

            // No-body responses (204, 304) and explicit zero content-length
            // must skip JSON parsing — calling json() on an empty body errors.
            $content_length = is_array($headers) ? ($headers["content-length"] ?? null) : null;
            $no_body = $status === 204 || $status === 304 || (string)$content_length === "0";

            $json_data = null;
            $body_err = null;
            if (!$no_body) {
                $jf = Struct::getprop($fetched, "json");
                if (is_callable($jf)) {
                    try {
                        $json_data = $jf();
                    } catch (\Throwable $e) {
                        // Non-JSON body — leave data null but keep status/ok.
                        $json_data = null;
                    }
                }
                if (true === Struct::getprop($fetched, "unreadable")) {
                    $failed = ($status >= 200 && $status < 300) ? null : $ctx->make_error(
                        "request_status",
                        "request: {$status}: " . (string)Struct::getprop($fetched, "statusText"));
                    $sent = $fetchdef["headers"] ?? [];
                    if (GandiFetcher::usesDefault($ctx)) {
                        $sent = GandiFetcher::sentHeaders($sent);
                    }
                    $body_err = GandiResultBody::unreadable($ctx, $status, $headers,
                        Struct::getprop($fetched, "body"), $sent, $failed);
                }
            }

            $out = [
                "ok" => null === $body_err && $status >= 200 && $status < 300,
                "status" => $status,
                "headers" => Struct::getprop($fetched, "headers"),
                "data" => $json_data,
            ];
            if (null !== $body_err) {
                $out["err"] = ($utility->clean)($ctx, $body_err);
            }
            return $out;
        }

        return [
            "ok" => false,
            "err" => $ctx->make_error("direct_invalid", "invalid response type"),
        ];
    }

    // Raw GraphQL access: the pressure valve that makes the generated
    // surface's deliberate omissions (per-call selection sets, typed filter
    // builders, batching, subscriptions) livable — the whole schema stays
    // reachable.
    //
    // Thin wrapper over the same prepare/fetch path direct uses, with the
    // one thing raw direct cannot do for GraphQL: a GraphQL failure rides
    // HTTP 200 as a top-level `errors` array, so status alone would report
    // a failed query as ok.
    //
    // NOTE: like direct, this bypasses the feature pipeline — no retry,
    // ratelimit or paging features apply.
    public function graphql(string $query, ?array $variables = null, ?array $ctrl = null): mixed
    {
        if (!$this->op_allowed("graphql")) {
            return $this->op_denied("graphql");
        }

        $res = $this->raw_request([
            "method" => "POST",
            "headers" => ["content-type" => "application/json"],
            "body" => ["query" => $query, "variables" => $variables ?? []],
            "ctrl" => $ctrl ?? [],
        ]);

        if (!is_array($res)) {
            return $res;
        }

        // Errors are read BEFORE any status check: a GraphQL parse or
        // validation failure comes back as HTTP 400 carrying the standard
        // { errors: [...] } body, and the raw path represents a non-2xx as
        // ok:false with no err — so returning early on status would discard
        // the server's own diagnostics, which are the only useful part of
        // that response.
        $errors = Struct::getpath($res, "data.errors");

        if (is_array($errors) && 0 < count($errors)) {
            $first = is_array($errors[0]) ? $errors[0] : [];
            $msg = $first["message"] ?? "";
            if (!is_string($msg) || "" === $msg) {
                $msg = "graphql error";
            }
            $res["ok"] = false;
            $res["err"] = new GandiError("graphql_error",
                "GandiSDK: graphql: " . $msg);
            $res["graphql"] = $errors;
        }

        return $res;
    }


    private $_access_token = null;

    // Canonical facade: $client->AccessToken()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->access_token()
    // resolves here too.
    public function AccessToken($data = null)
    {
        require_once __DIR__ . '/entity/access_token_entity.php';
        if ($data === null) {
            if ($this->_access_token === null) {
                $this->_access_token = new AccessTokenEntity($this, null);
            }
            return $this->_access_token;
        }
        return new AccessTokenEntity($this, $data);
    }


    private $_acme_account = null;

    // Canonical facade: $client->AcmeAccount()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->acme_account()
    // resolves here too.
    public function AcmeAccount($data = null)
    {
        require_once __DIR__ . '/entity/acme_account_entity.php';
        if ($data === null) {
            if ($this->_acme_account === null) {
                $this->_acme_account = new AcmeAccountEntity($this, null);
            }
            return $this->_acme_account;
        }
        return new AcmeAccountEntity($this, $data);
    }


    private $_acme_domain = null;

    // Canonical facade: $client->AcmeDomain()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->acme_domain()
    // resolves here too.
    public function AcmeDomain($data = null)
    {
        require_once __DIR__ . '/entity/acme_domain_entity.php';
        if ($data === null) {
            if ($this->_acme_domain === null) {
                $this->_acme_domain = new AcmeDomainEntity($this, null);
            }
            return $this->_acme_domain;
        }
        return new AcmeDomainEntity($this, $data);
    }


    private $_acme_price = null;

    // Canonical facade: $client->AcmePrice()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->acme_price()
    // resolves here too.
    public function AcmePrice($data = null)
    {
        require_once __DIR__ . '/entity/acme_price_entity.php';
        if ($data === null) {
            if ($this->_acme_price === null) {
                $this->_acme_price = new AcmePriceEntity($this, null);
            }
            return $this->_acme_price;
        }
        return new AcmePriceEntity($this, $data);
    }


    private $_acme_subscription = null;

    // Canonical facade: $client->AcmeSubscription()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->acme_subscription()
    // resolves here too.
    public function AcmeSubscription($data = null)
    {
        require_once __DIR__ . '/entity/acme_subscription_entity.php';
        if ($data === null) {
            if ($this->_acme_subscription === null) {
                $this->_acme_subscription = new AcmeSubscriptionEntity($this, null);
            }
            return $this->_acme_subscription;
        }
        return new AcmeSubscriptionEntity($this, $data);
    }


    private $_billing_info = null;

    // Canonical facade: $client->BillingInfo()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->billing_info()
    // resolves here too.
    public function BillingInfo($data = null)
    {
        require_once __DIR__ . '/entity/billing_info_entity.php';
        if ($data === null) {
            if ($this->_billing_info === null) {
                $this->_billing_info = new BillingInfoEntity($this, null);
            }
            return $this->_billing_info;
        }
        return new BillingInfoEntity($this, $data);
    }


    private $_billing_price = null;

    // Canonical facade: $client->BillingPrice()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->billing_price()
    // resolves here too.
    public function BillingPrice($data = null)
    {
        require_once __DIR__ . '/entity/billing_price_entity.php';
        if ($data === null) {
            if ($this->_billing_price === null) {
                $this->_billing_price = new BillingPriceEntity($this, null);
            }
            return $this->_billing_price;
        }
        return new BillingPriceEntity($this, $data);
    }


    private $_certificate_dcv = null;

    // Canonical facade: $client->CertificateDcv()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->certificate_dcv()
    // resolves here too.
    public function CertificateDcv($data = null)
    {
        require_once __DIR__ . '/entity/certificate_dcv_entity.php';
        if ($data === null) {
            if ($this->_certificate_dcv === null) {
                $this->_certificate_dcv = new CertificateDcvEntity($this, null);
            }
            return $this->_certificate_dcv;
        }
        return new CertificateDcvEntity($this, $data);
    }


    private $_certificate_package = null;

    // Canonical facade: $client->CertificatePackage()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->certificate_package()
    // resolves here too.
    public function CertificatePackage($data = null)
    {
        require_once __DIR__ . '/entity/certificate_package_entity.php';
        if ($data === null) {
            if ($this->_certificate_package === null) {
                $this->_certificate_package = new CertificatePackageEntity($this, null);
            }
            return $this->_certificate_package;
        }
        return new CertificatePackageEntity($this, $data);
    }


    private $_certificate_pem = null;

    // Canonical facade: $client->CertificatePem()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->certificate_pem()
    // resolves here too.
    public function CertificatePem($data = null)
    {
        require_once __DIR__ . '/entity/certificate_pem_entity.php';
        if ($data === null) {
            if ($this->_certificate_pem === null) {
                $this->_certificate_pem = new CertificatePemEntity($this, null);
            }
            return $this->_certificate_pem;
        }
        return new CertificatePemEntity($this, $data);
    }


    private $_certificate_renewal = null;

    // Canonical facade: $client->CertificateRenewal()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->certificate_renewal()
    // resolves here too.
    public function CertificateRenewal($data = null)
    {
        require_once __DIR__ . '/entity/certificate_renewal_entity.php';
        if ($data === null) {
            if ($this->_certificate_renewal === null) {
                $this->_certificate_renewal = new CertificateRenewalEntity($this, null);
            }
            return $this->_certificate_renewal;
        }
        return new CertificateRenewalEntity($this, $data);
    }


    private $_certificate_tag = null;

    // Canonical facade: $client->CertificateTag()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->certificate_tag()
    // resolves here too.
    public function CertificateTag($data = null)
    {
        require_once __DIR__ . '/entity/certificate_tag_entity.php';
        if ($data === null) {
            if ($this->_certificate_tag === null) {
                $this->_certificate_tag = new CertificateTagEntity($this, null);
            }
            return $this->_certificate_tag;
        }
        return new CertificateTagEntity($this, $data);
    }


    private $_comment = null;

    // Canonical facade: $client->Comment()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->comment()
    // resolves here too.
    public function Comment($data = null)
    {
        require_once __DIR__ . '/entity/comment_entity.php';
        if ($data === null) {
            if ($this->_comment === null) {
                $this->_comment = new CommentEntity($this, null);
            }
            return $this->_comment;
        }
        return new CommentEntity($this, $data);
    }


    private $_domain = null;

    // Canonical facade: $client->Domain()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->domain()
    // resolves here too.
    public function Domain($data = null)
    {
        require_once __DIR__ . '/entity/domain_entity.php';
        if ($data === null) {
            if ($this->_domain === null) {
                $this->_domain = new DomainEntity($this, null);
            }
            return $this->_domain;
        }
        return new DomainEntity($this, $data);
    }


    private $_domain_availability = null;

    // Canonical facade: $client->DomainAvailability()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->domain_availability()
    // resolves here too.
    public function DomainAvailability($data = null)
    {
        require_once __DIR__ . '/entity/domain_availability_entity.php';
        if ($data === null) {
            if ($this->_domain_availability === null) {
                $this->_domain_availability = new DomainAvailabilityEntity($this, null);
            }
            return $this->_domain_availability;
        }
        return new DomainAvailabilityEntity($this, $data);
    }


    private $_domain_change_owner = null;

    // Canonical facade: $client->DomainChangeOwner()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->domain_change_owner()
    // resolves here too.
    public function DomainChangeOwner($data = null)
    {
        require_once __DIR__ . '/entity/domain_change_owner_entity.php';
        if ($data === null) {
            if ($this->_domain_change_owner === null) {
                $this->_domain_change_owner = new DomainChangeOwnerEntity($this, null);
            }
            return $this->_domain_change_owner;
        }
        return new DomainChangeOwnerEntity($this, $data);
    }


    private $_domain_claim = null;

    // Canonical facade: $client->DomainClaim()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->domain_claim()
    // resolves here too.
    public function DomainClaim($data = null)
    {
        require_once __DIR__ . '/entity/domain_claim_entity.php';
        if ($data === null) {
            if ($this->_domain_claim === null) {
                $this->_domain_claim = new DomainClaimEntity($this, null);
            }
            return $this->_domain_claim;
        }
        return new DomainClaimEntity($this, $data);
    }


    private $_domain_contact = null;

    // Canonical facade: $client->DomainContact()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->domain_contact()
    // resolves here too.
    public function DomainContact($data = null)
    {
        require_once __DIR__ . '/entity/domain_contact_entity.php';
        if ($data === null) {
            if ($this->_domain_contact === null) {
                $this->_domain_contact = new DomainContactEntity($this, null);
            }
            return $this->_domain_contact;
        }
        return new DomainContactEntity($this, $data);
    }


    private $_domain_dnskey = null;

    // Canonical facade: $client->DomainDnskey()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->domain_dnskey()
    // resolves here too.
    public function DomainDnskey($data = null)
    {
        require_once __DIR__ . '/entity/domain_dnskey_entity.php';
        if ($data === null) {
            if ($this->_domain_dnskey === null) {
                $this->_domain_dnskey = new DomainDnskeyEntity($this, null);
            }
            return $this->_domain_dnskey;
        }
        return new DomainDnskeyEntity($this, $data);
    }


    private $_domain_dnssec = null;

    // Canonical facade: $client->DomainDnssec()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->domain_dnssec()
    // resolves here too.
    public function DomainDnssec($data = null)
    {
        require_once __DIR__ . '/entity/domain_dnssec_entity.php';
        if ($data === null) {
            if ($this->_domain_dnssec === null) {
                $this->_domain_dnssec = new DomainDnssecEntity($this, null);
            }
            return $this->_domain_dnssec;
        }
        return new DomainDnssecEntity($this, $data);
    }


    private $_domain_host = null;

    // Canonical facade: $client->DomainHost()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->domain_host()
    // resolves here too.
    public function DomainHost($data = null)
    {
        require_once __DIR__ . '/entity/domain_host_entity.php';
        if ($data === null) {
            if ($this->_domain_host === null) {
                $this->_domain_host = new DomainHostEntity($this, null);
            }
            return $this->_domain_host;
        }
        return new DomainHostEntity($this, $data);
    }


    private $_domain_livedns = null;

    // Canonical facade: $client->DomainLivedns()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->domain_livedns()
    // resolves here too.
    public function DomainLivedns($data = null)
    {
        require_once __DIR__ . '/entity/domain_livedns_entity.php';
        if ($data === null) {
            if ($this->_domain_livedns === null) {
                $this->_domain_livedns = new DomainLivednsEntity($this, null);
            }
            return $this->_domain_livedns;
        }
        return new DomainLivednsEntity($this, $data);
    }


    private $_domain_nameserver = null;

    // Canonical facade: $client->DomainNameserver()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->domain_nameserver()
    // resolves here too.
    public function DomainNameserver($data = null)
    {
        require_once __DIR__ . '/entity/domain_nameserver_entity.php';
        if ($data === null) {
            if ($this->_domain_nameserver === null) {
                $this->_domain_nameserver = new DomainNameserverEntity($this, null);
            }
            return $this->_domain_nameserver;
        }
        return new DomainNameserverEntity($this, $data);
    }


    private $_domain_tag = null;

    // Canonical facade: $client->DomainTag()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->domain_tag()
    // resolves here too.
    public function DomainTag($data = null)
    {
        require_once __DIR__ . '/entity/domain_tag_entity.php';
        if ($data === null) {
            if ($this->_domain_tag === null) {
                $this->_domain_tag = new DomainTagEntity($this, null);
            }
            return $this->_domain_tag;
        }
        return new DomainTagEntity($this, $data);
    }


    private $_domain_transfer = null;

    // Canonical facade: $client->DomainTransfer()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->domain_transfer()
    // resolves here too.
    public function DomainTransfer($data = null)
    {
        require_once __DIR__ . '/entity/domain_transfer_entity.php';
        if ($data === null) {
            if ($this->_domain_transfer === null) {
                $this->_domain_transfer = new DomainTransferEntity($this, null);
            }
            return $this->_domain_transfer;
        }
        return new DomainTransferEntity($this, $data);
    }


    private $_domain_webredir = null;

    // Canonical facade: $client->DomainWebredir()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->domain_webredir()
    // resolves here too.
    public function DomainWebredir($data = null)
    {
        require_once __DIR__ . '/entity/domain_webredir_entity.php';
        if ($data === null) {
            if ($this->_domain_webredir === null) {
                $this->_domain_webredir = new DomainWebredirEntity($this, null);
            }
            return $this->_domain_webredir;
        }
        return new DomainWebredirEntity($this, $data);
    }


    private $_email_forward = null;

    // Canonical facade: $client->EmailForward()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->email_forward()
    // resolves here too.
    public function EmailForward($data = null)
    {
        require_once __DIR__ . '/entity/email_forward_entity.php';
        if ($data === null) {
            if ($this->_email_forward === null) {
                $this->_email_forward = new EmailForwardEntity($this, null);
            }
            return $this->_email_forward;
        }
        return new EmailForwardEntity($this, $data);
    }


    private $_email_mailbox = null;

    // Canonical facade: $client->EmailMailbox()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->email_mailbox()
    // resolves here too.
    public function EmailMailbox($data = null)
    {
        require_once __DIR__ . '/entity/email_mailbox_entity.php';
        if ($data === null) {
            if ($this->_email_mailbox === null) {
                $this->_email_mailbox = new EmailMailboxEntity($this, null);
            }
            return $this->_email_mailbox;
        }
        return new EmailMailboxEntity($this, $data);
    }


    private $_email_migration = null;

    // Canonical facade: $client->EmailMigration()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->email_migration()
    // resolves here too.
    public function EmailMigration($data = null)
    {
        require_once __DIR__ . '/entity/email_migration_entity.php';
        if ($data === null) {
            if ($this->_email_migration === null) {
                $this->_email_migration = new EmailMigrationEntity($this, null);
            }
            return $this->_email_migration;
        }
        return new EmailMigrationEntity($this, $data);
    }


    private $_email_offer = null;

    // Canonical facade: $client->EmailOffer()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->email_offer()
    // resolves here too.
    public function EmailOffer($data = null)
    {
        require_once __DIR__ . '/entity/email_offer_entity.php';
        if ($data === null) {
            if ($this->_email_offer === null) {
                $this->_email_offer = new EmailOfferEntity($this, null);
            }
            return $this->_email_offer;
        }
        return new EmailOfferEntity($this, $data);
    }


    private $_email_slot = null;

    // Canonical facade: $client->EmailSlot()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->email_slot()
    // resolves here too.
    public function EmailSlot($data = null)
    {
        require_once __DIR__ . '/entity/email_slot_entity.php';
        if ($data === null) {
            if ($this->_email_slot === null) {
                $this->_email_slot = new EmailSlotEntity($this, null);
            }
            return $this->_email_slot;
        }
        return new EmailSlotEntity($this, $data);
    }


    private $_hosting_application = null;

    // Canonical facade: $client->HostingApplication()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->hosting_application()
    // resolves here too.
    public function HostingApplication($data = null)
    {
        require_once __DIR__ . '/entity/hosting_application_entity.php';
        if ($data === null) {
            if ($this->_hosting_application === null) {
                $this->_hosting_application = new HostingApplicationEntity($this, null);
            }
            return $this->_hosting_application;
        }
        return new HostingApplicationEntity($this, $data);
    }


    private $_hosting_instance = null;

    // Canonical facade: $client->HostingInstance()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->hosting_instance()
    // resolves here too.
    public function HostingInstance($data = null)
    {
        require_once __DIR__ . '/entity/hosting_instance_entity.php';
        if ($data === null) {
            if ($this->_hosting_instance === null) {
                $this->_hosting_instance = new HostingInstanceEntity($this, null);
            }
            return $this->_hosting_instance;
        }
        return new HostingInstanceEntity($this, $data);
    }


    private $_hosting_vhost = null;

    // Canonical facade: $client->HostingVhost()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->hosting_vhost()
    // resolves here too.
    public function HostingVhost($data = null)
    {
        require_once __DIR__ . '/entity/hosting_vhost_entity.php';
        if ($data === null) {
            if ($this->_hosting_vhost === null) {
                $this->_hosting_vhost = new HostingVhostEntity($this, null);
            }
            return $this->_hosting_vhost;
        }
        return new HostingVhostEntity($this, $data);
    }


    private $_issued_certificate = null;

    // Canonical facade: $client->IssuedCertificate()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->issued_certificate()
    // resolves here too.
    public function IssuedCertificate($data = null)
    {
        require_once __DIR__ . '/entity/issued_certificate_entity.php';
        if ($data === null) {
            if ($this->_issued_certificate === null) {
                $this->_issued_certificate = new IssuedCertificateEntity($this, null);
            }
            return $this->_issued_certificate;
        }
        return new IssuedCertificateEntity($this, $data);
    }


    private $_linked_zone = null;

    // Canonical facade: $client->LinkedZone()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->linked_zone()
    // resolves here too.
    public function LinkedZone($data = null)
    {
        require_once __DIR__ . '/entity/linked_zone_entity.php';
        if ($data === null) {
            if ($this->_linked_zone === null) {
                $this->_linked_zone = new LinkedZoneEntity($this, null);
            }
            return $this->_linked_zone;
        }
        return new LinkedZoneEntity($this, $data);
    }


    private $_linked_zone_deployment = null;

    // Canonical facade: $client->LinkedZoneDeployment()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->linked_zone_deployment()
    // resolves here too.
    public function LinkedZoneDeployment($data = null)
    {
        require_once __DIR__ . '/entity/linked_zone_deployment_entity.php';
        if ($data === null) {
            if ($this->_linked_zone_deployment === null) {
                $this->_linked_zone_deployment = new LinkedZoneDeploymentEntity($this, null);
            }
            return $this->_linked_zone_deployment;
        }
        return new LinkedZoneDeploymentEntity($this, $data);
    }


    private $_linked_zone_domain = null;

    // Canonical facade: $client->LinkedZoneDomain()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->linked_zone_domain()
    // resolves here too.
    public function LinkedZoneDomain($data = null)
    {
        require_once __DIR__ . '/entity/linked_zone_domain_entity.php';
        if ($data === null) {
            if ($this->_linked_zone_domain === null) {
                $this->_linked_zone_domain = new LinkedZoneDomainEntity($this, null);
            }
            return $this->_linked_zone_domain;
        }
        return new LinkedZoneDomainEntity($this, $data);
    }


    private $_linked_zone_task = null;

    // Canonical facade: $client->LinkedZoneTask()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->linked_zone_task()
    // resolves here too.
    public function LinkedZoneTask($data = null)
    {
        require_once __DIR__ . '/entity/linked_zone_task_entity.php';
        if ($data === null) {
            if ($this->_linked_zone_task === null) {
                $this->_linked_zone_task = new LinkedZoneTaskEntity($this, null);
            }
            return $this->_linked_zone_task;
        }
        return new LinkedZoneTaskEntity($this, $data);
    }


    private $_livedns_axfr_slave = null;

    // Canonical facade: $client->LivednsAxfrSlave()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->livedns_axfr_slave()
    // resolves here too.
    public function LivednsAxfrSlave($data = null)
    {
        require_once __DIR__ . '/entity/livedns_axfr_slave_entity.php';
        if ($data === null) {
            if ($this->_livedns_axfr_slave === null) {
                $this->_livedns_axfr_slave = new LivednsAxfrSlaveEntity($this, null);
            }
            return $this->_livedns_axfr_slave;
        }
        return new LivednsAxfrSlaveEntity($this, $data);
    }


    private $_livedns_axfr_tsig = null;

    // Canonical facade: $client->LivednsAxfrTsig()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->livedns_axfr_tsig()
    // resolves here too.
    public function LivednsAxfrTsig($data = null)
    {
        require_once __DIR__ . '/entity/livedns_axfr_tsig_entity.php';
        if ($data === null) {
            if ($this->_livedns_axfr_tsig === null) {
                $this->_livedns_axfr_tsig = new LivednsAxfrTsigEntity($this, null);
            }
            return $this->_livedns_axfr_tsig;
        }
        return new LivednsAxfrTsigEntity($this, $data);
    }


    private $_livedns_domain = null;

    // Canonical facade: $client->LivednsDomain()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->livedns_domain()
    // resolves here too.
    public function LivednsDomain($data = null)
    {
        require_once __DIR__ . '/entity/livedns_domain_entity.php';
        if ($data === null) {
            if ($this->_livedns_domain === null) {
                $this->_livedns_domain = new LivednsDomainEntity($this, null);
            }
            return $this->_livedns_domain;
        }
        return new LivednsDomainEntity($this, $data);
    }


    private $_livedns_key = null;

    // Canonical facade: $client->LivednsKey()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->livedns_key()
    // resolves here too.
    public function LivednsKey($data = null)
    {
        require_once __DIR__ . '/entity/livedns_key_entity.php';
        if ($data === null) {
            if ($this->_livedns_key === null) {
                $this->_livedns_key = new LivednsKeyEntity($this, null);
            }
            return $this->_livedns_key;
        }
        return new LivednsKeyEntity($this, $data);
    }


    private $_livedns_nameserver = null;

    // Canonical facade: $client->LivednsNameserver()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->livedns_nameserver()
    // resolves here too.
    public function LivednsNameserver($data = null)
    {
        require_once __DIR__ . '/entity/livedns_nameserver_entity.php';
        if ($data === null) {
            if ($this->_livedns_nameserver === null) {
                $this->_livedns_nameserver = new LivednsNameserverEntity($this, null);
            }
            return $this->_livedns_nameserver;
        }
        return new LivednsNameserverEntity($this, $data);
    }


    private $_livedns_record = null;

    // Canonical facade: $client->LivednsRecord()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->livedns_record()
    // resolves here too.
    public function LivednsRecord($data = null)
    {
        require_once __DIR__ . '/entity/livedns_record_entity.php';
        if ($data === null) {
            if ($this->_livedns_record === null) {
                $this->_livedns_record = new LivednsRecordEntity($this, null);
            }
            return $this->_livedns_record;
        }
        return new LivednsRecordEntity($this, $data);
    }


    private $_livedns_rrtype = null;

    // Canonical facade: $client->LivednsRrtype()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->livedns_rrtype()
    // resolves here too.
    public function LivednsRrtype($data = null)
    {
        require_once __DIR__ . '/entity/livedns_rrtype_entity.php';
        if ($data === null) {
            if ($this->_livedns_rrtype === null) {
                $this->_livedns_rrtype = new LivednsRrtypeEntity($this, null);
            }
            return $this->_livedns_rrtype;
        }
        return new LivednsRrtypeEntity($this, $data);
    }


    private $_livedns_snapshot = null;

    // Canonical facade: $client->LivednsSnapshot()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->livedns_snapshot()
    // resolves here too.
    public function LivednsSnapshot($data = null)
    {
        require_once __DIR__ . '/entity/livedns_snapshot_entity.php';
        if ($data === null) {
            if ($this->_livedns_snapshot === null) {
                $this->_livedns_snapshot = new LivednsSnapshotEntity($this, null);
            }
            return $this->_livedns_snapshot;
        }
        return new LivednsSnapshotEntity($this, $data);
    }


    private $_livedns_tsig_key = null;

    // Canonical facade: $client->LivednsTsigKey()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->livedns_tsig_key()
    // resolves here too.
    public function LivednsTsigKey($data = null)
    {
        require_once __DIR__ . '/entity/livedns_tsig_key_entity.php';
        if ($data === null) {
            if ($this->_livedns_tsig_key === null) {
                $this->_livedns_tsig_key = new LivednsTsigKeyEntity($this, null);
            }
            return $this->_livedns_tsig_key;
        }
        return new LivednsTsigKeyEntity($this, $data);
    }


    private $_livedns_zone = null;

    // Canonical facade: $client->LivednsZone()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->livedns_zone()
    // resolves here too.
    public function LivednsZone($data = null)
    {
        require_once __DIR__ . '/entity/livedns_zone_entity.php';
        if ($data === null) {
            if ($this->_livedns_zone === null) {
                $this->_livedns_zone = new LivednsZoneEntity($this, null);
            }
            return $this->_livedns_zone;
        }
        return new LivednsZoneEntity($this, $data);
    }


    private $_mailbox = null;

    // Canonical facade: $client->Mailbox()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->mailbox()
    // resolves here too.
    public function Mailbox($data = null)
    {
        require_once __DIR__ . '/entity/mailbox_entity.php';
        if ($data === null) {
            if ($this->_mailbox === null) {
                $this->_mailbox = new MailboxEntity($this, null);
            }
            return $this->_mailbox;
        }
        return new MailboxEntity($this, $data);
    }


    private $_mailbox_domain = null;

    // Canonical facade: $client->MailboxDomain()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->mailbox_domain()
    // resolves here too.
    public function MailboxDomain($data = null)
    {
        require_once __DIR__ . '/entity/mailbox_domain_entity.php';
        if ($data === null) {
            if ($this->_mailbox_domain === null) {
                $this->_mailbox_domain = new MailboxDomainEntity($this, null);
            }
            return $this->_mailbox_domain;
        }
        return new MailboxDomainEntity($this, $data);
    }


    private $_mailbox_forward = null;

    // Canonical facade: $client->MailboxForward()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->mailbox_forward()
    // resolves here too.
    public function MailboxForward($data = null)
    {
        require_once __DIR__ . '/entity/mailbox_forward_entity.php';
        if ($data === null) {
            if ($this->_mailbox_forward === null) {
                $this->_mailbox_forward = new MailboxForwardEntity($this, null);
            }
            return $this->_mailbox_forward;
        }
        return new MailboxForwardEntity($this, $data);
    }


    private $_mailbox_product = null;

    // Canonical facade: $client->MailboxProduct()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->mailbox_product()
    // resolves here too.
    public function MailboxProduct($data = null)
    {
        require_once __DIR__ . '/entity/mailbox_product_entity.php';
        if ($data === null) {
            if ($this->_mailbox_product === null) {
                $this->_mailbox_product = new MailboxProductEntity($this, null);
            }
            return $this->_mailbox_product;
        }
        return new MailboxProductEntity($this, $data);
    }


    private $_mailbox_quota = null;

    // Canonical facade: $client->MailboxQuota()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->mailbox_quota()
    // resolves here too.
    public function MailboxQuota($data = null)
    {
        require_once __DIR__ . '/entity/mailbox_quota_entity.php';
        if ($data === null) {
            if ($this->_mailbox_quota === null) {
                $this->_mailbox_quota = new MailboxQuotaEntity($this, null);
            }
            return $this->_mailbox_quota;
        }
        return new MailboxQuotaEntity($this, $data);
    }


    private $_mailbox_slot = null;

    // Canonical facade: $client->MailboxSlot()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->mailbox_slot()
    // resolves here too.
    public function MailboxSlot($data = null)
    {
        require_once __DIR__ . '/entity/mailbox_slot_entity.php';
        if ($data === null) {
            if ($this->_mailbox_slot === null) {
                $this->_mailbox_slot = new MailboxSlotEntity($this, null);
            }
            return $this->_mailbox_slot;
        }
        return new MailboxSlotEntity($this, $data);
    }


    private $_organization = null;

    // Canonical facade: $client->Organization()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->organization()
    // resolves here too.
    public function Organization($data = null)
    {
        require_once __DIR__ . '/entity/organization_entity.php';
        if ($data === null) {
            if ($this->_organization === null) {
                $this->_organization = new OrganizationEntity($this, null);
            }
            return $this->_organization;
        }
        return new OrganizationEntity($this, $data);
    }


    private $_organization_customer = null;

    // Canonical facade: $client->OrganizationCustomer()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->organization_customer()
    // resolves here too.
    public function OrganizationCustomer($data = null)
    {
        require_once __DIR__ . '/entity/organization_customer_entity.php';
        if ($data === null) {
            if ($this->_organization_customer === null) {
                $this->_organization_customer = new OrganizationCustomerEntity($this, null);
            }
            return $this->_organization_customer;
        }
        return new OrganizationCustomerEntity($this, $data);
    }


    private $_template = null;

    // Canonical facade: $client->Template()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->template()
    // resolves here too.
    public function Template($data = null)
    {
        require_once __DIR__ . '/entity/template_entity.php';
        if ($data === null) {
            if ($this->_template === null) {
                $this->_template = new TemplateEntity($this, null);
            }
            return $this->_template;
        }
        return new TemplateEntity($this, $data);
    }


    private $_template_dispatch = null;

    // Canonical facade: $client->TemplateDispatch()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->template_dispatch()
    // resolves here too.
    public function TemplateDispatch($data = null)
    {
        require_once __DIR__ . '/entity/template_dispatch_entity.php';
        if ($data === null) {
            if ($this->_template_dispatch === null) {
                $this->_template_dispatch = new TemplateDispatchEntity($this, null);
            }
            return $this->_template_dispatch;
        }
        return new TemplateDispatchEntity($this, $data);
    }


    private $_tld = null;

    // Canonical facade: $client->Tld()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->tld()
    // resolves here too.
    public function Tld($data = null)
    {
        require_once __DIR__ . '/entity/tld_entity.php';
        if ($data === null) {
            if ($this->_tld === null) {
                $this->_tld = new TldEntity($this, null);
            }
            return $this->_tld;
        }
        return new TldEntity($this, $data);
    }


    private $_user = null;

    // Canonical facade: $client->User()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->user()
    // resolves here too.
    public function User($data = null)
    {
        require_once __DIR__ . '/entity/user_entity.php';
        if ($data === null) {
            if ($this->_user === null) {
                $this->_user = new UserEntity($this, null);
            }
            return $this->_user;
        }
        return new UserEntity($this, $data);
    }



    public static function test(?array $testopts = null, ?array $sdkopts = null): self
    {
        $sdkopts = $sdkopts ?? [];
        $sdkopts = Struct::clone($sdkopts);
        $sdkopts = is_array($sdkopts) ? $sdkopts : [];

        $testopts = $testopts ?? [];
        $testopts = Struct::clone($testopts);
        $testopts = is_array($testopts) ? $testopts : [];
        $testopts["active"] = true;

        if (!isset($sdkopts["feature"])) {
            $sdkopts["feature"] = [];
        }
        $sdkopts["feature"]["test"] = $testopts;

        $sdk = new GandiSDK($sdkopts);
        $sdk->mode = "test";
        return $sdk;
    }
}
