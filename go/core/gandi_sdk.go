package core

import (
	"encoding/json"
	"fmt"
	"strings"

	vs "github.com/voxgig-sdk/gandi-sdk/go/utility/struct"
)

type GandiSDK struct {
	Mode     string
	options  map[string]any
	utility  *Utility
	Features []Feature
	rootctx  *Context
}

func NewGandiSDK(options map[string]any) *GandiSDK {
	sdk := &GandiSDK{
		Mode:     "live",
		Features: []Feature{},
	}

	sdk.utility = NewUtility()

	config := SharedConfig()

	sdk.rootctx = sdk.utility.MakeContext(map[string]any{
		"client":  sdk,
		"utility": sdk.utility,
		"config":  config,
		"options": options,
		"shared":  map[string]any{},
	}, nil)

	sdk.options = sdk.utility.MakeOptions(sdk.rootctx)

	if vs.GetPath(sdk.options, []any{"feature", "test", "active"}) == true {
		sdk.Mode = "test"
	}

	sdk.rootctx.Options = sdk.options

	// Add features in the resolved order (MakeOptions puts an explicit array
	// order first, else defaults to test-first). Ordering matters: the `test`
	// feature installs the base mock transport and the transport features
	// (retry/cache/netsim/proxy/ratelimit) wrap whatever is current, so `test`
	// must be added before them to sit at the base of the chain.
	featureOpts := ToMapAny(vs.GetProp(sdk.options, "feature"))
	if featureOpts != nil {
		if fo, ok := vs.GetPath(sdk.options, []any{"__derived__", "featureorder"}).([]any); ok {
			for _, n := range fo {
				fname, _ := n.(string)
				fopts := ToMapAny(featureOpts[fname])
				if fopts != nil {
					if active, ok := fopts["active"]; ok {
						if ab, ok := active.(bool); ok && ab {
							sdk.utility.FeatureAdd(sdk.rootctx, makeFeature(fname))
						}
					}
				}
			}
		}
	}

	// Add extension features.
	if extend := vs.GetProp(sdk.options, "extend"); extend != nil {
		if extList, ok := extend.([]any); ok {
			for _, f := range extList {
				if feat, ok := f.(Feature); ok {
					sdk.utility.FeatureAdd(sdk.rootctx, feat)
				}
			}
		}
	}

	// Initialize features.
	for _, f := range sdk.Features {
		sdk.utility.FeatureInit(sdk.rootctx, f)
	}

	sdk.utility.FeatureHook(sdk.rootctx, "PostConstruct")

	return sdk
}

// The client holds the credential in its options, so a print or a JSON dump
// carries the name alone. Value receivers: a dereferenced client prints the
// same way.
func (sdk GandiSDK) String() string {
	return "Gandi " + vs.Jsonify(map[string]any{"name": "Gandi"},
		map[string]any{"indent": 0})
}

func (sdk GandiSDK) GoString() string {
	return sdk.String()
}

func (sdk GandiSDK) MarshalJSON() ([]byte, error) {
	return json.Marshal(map[string]any{"name": "Gandi"})
}

func (sdk *GandiSDK) OptionsMap() map[string]any {
	out := vs.Clone(sdk.options)
	if om, ok := out.(map[string]any); ok {
		return om
	}
	return map[string]any{}
}

func (sdk *GandiSDK) GetUtility() *Utility {
	return CopyUtility(sdk.utility)
}

func (sdk *GandiSDK) GetRootCtx() *Context {
	return sdk.rootctx
}

func (sdk *GandiSDK) Prepare(fetchargs map[string]any) (map[string]any, error) {
	utility := sdk.utility

	if fetchargs == nil {
		fetchargs = map[string]any{}
	}

	var ctrl map[string]any
	if c := vs.GetProp(fetchargs, "ctrl"); c != nil {
		if cm, ok := c.(map[string]any); ok {
			ctrl = cm
		}
	}
	if ctrl == nil {
		ctrl = map[string]any{}
	}

	ctx := utility.MakeContext(map[string]any{
		"opname": "prepare",
		"ctrl":   ctrl,
	}, sdk.rootctx)

	options := sdk.options

	path, _ := vs.GetProp(fetchargs, "path").(string)
	method, _ := vs.GetProp(fetchargs, "method").(string)
	if method == "" {
		method = "GET"
	}
	method = strings.ToUpper(method)

	allowMethodVal := vs.GetPath(options, []any{"allow", "method"})
	if !Allowed(allowMethodVal, method) {
		allowMethod, _ := allowMethodVal.(string)
		return nil, ctx.MakeError("spec_method_allow",
			"Method \""+method+"\" not allowed by SDK option allow.method value: \""+allowMethod+"\"")
	}

	params := ToMapAny(vs.GetProp(fetchargs, "params"))
	if params == nil {
		params = map[string]any{}
	}
	query := ToMapAny(vs.GetProp(fetchargs, "query"))
	if query == nil {
		query = map[string]any{}
	}

	headers := utility.PrepareHeaders(ctx)

	base, _ := vs.GetProp(options, "base").(string)
	prefix, _ := vs.GetProp(options, "prefix").(string)
	suffix, _ := vs.GetProp(options, "suffix").(string)

	ctx.Spec = NewSpec(map[string]any{
		"base":    base,
		"prefix":  prefix,
		"suffix":  suffix,
		"path":    path,
		"method":  method,
		"params":  params,
		"query":   query,
		"headers": headers,
		"body":    vs.GetProp(fetchargs, "body"),
		"step":    "start",
	})

	// Merge user-provided headers.
	if uh := vs.GetProp(fetchargs, "headers"); uh != nil {
		if uhm, ok := uh.(map[string]any); ok {
			for k, v := range uhm {
				ctx.Spec.Headers[k] = v
			}
		}
	}

	// A raw request has no point to declare its response type, so it asks
	// for the JSON it reads: an API that negotiates on Accept otherwise
	// answers in its own default format. A caller's own accept wins.
	hasAccept := false
	for k := range ctx.Spec.Headers {
		if strings.ToLower(k) == "accept" {
			hasAccept = true
			break
		}
	}
	if !hasAccept {
		ctx.Spec.Headers["accept"] = "application/json"
	}

	_, err := utility.PrepareAuth(ctx)
	if err != nil {
		return nil, err
	}

	return utility.MakeFetchDef(ctx)
}

// Raw endpoint access is operator-controllable, like every entity op.
// Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
// either one reaches the same endpoint.
func (sdk *GandiSDK) Direct(fetchargs map[string]any) (map[string]any, error) {
	if !sdk.opAllowed("direct") {
		return sdk.opDenied("direct"), nil
	}

	return sdk.rawRequest(fetchargs)
}

// Is this raw-access op permitted by the SDK's allow.op option?
func (sdk *GandiSDK) opAllowed(op string) bool {
	return Allowed(vs.GetPath(sdk.options, []any{"allow", "op"}), op)
}

func (sdk *GandiSDK) opDenied(op string) map[string]any {
	allowOp, _ := vs.GetPath(sdk.options, []any{"allow", "op"}).(string)
	return map[string]any{
		"ok": false,
		"err": fmt.Errorf("GandiSDK: %s: operation not allowed by"+
			" SDK option allow.op value: \"%s\"", op, allowOp),
	}
}

// Ungated request path shared by Direct and Graphql, each of which checks
// its own allow.op token first. Unexported, rather than a flag on fetchargs:
// a caller-supplied marker would let anyone opt straight back out of the
// gate by passing it.
func (sdk *GandiSDK) rawRequest(fetchargs map[string]any) (map[string]any, error) {
	utility := sdk.utility

	fetchdef, err := sdk.Prepare(fetchargs)
	if err != nil {
		return map[string]any{"ok": false, "err": sdk.cleanErr(sdk.rootctx, err)}, nil
	}

	if fetchargs == nil {
		fetchargs = map[string]any{}
	}

	var ctrl map[string]any
	if c := vs.GetProp(fetchargs, "ctrl"); c != nil {
		if cm, ok := c.(map[string]any); ok {
			ctrl = cm
		}
	}
	if ctrl == nil {
		ctrl = map[string]any{}
	}

	ctx := utility.MakeContext(map[string]any{
		"opname": "direct",
		"ctrl":   ctrl,
	}, sdk.rootctx)

	url, _ := fetchdef["url"].(string)
	fetched, fetchErr := utility.Fetcher(ctx, url, fetchdef)

	if fetchErr != nil {
		return map[string]any{"ok": false, "err": sdk.cleanErr(ctx, fetchErr)}, nil
	}

	if fetched == nil {
		return map[string]any{
			"ok":  false,
			"err": ctx.MakeError("direct_no_response", "response: undefined"),
		}, nil
	}

	if fm, ok := fetched.(map[string]any); ok {
		status := ToInt(vs.GetProp(fm, "status"))
		headers := vs.GetProp(fm, "headers")

		// No-body responses (204, 304) and explicit zero content-length
		// must skip JSON parsing — calling json() on an empty body errors.
		var contentLength string
		if hm, ok := headers.(map[string]any); ok {
			if cl, ok := hm["content-length"]; ok {
				contentLength = fmt.Sprintf("%v", cl)
			}
		}
		noBody := status == 204 || status == 304 || contentLength == "0"

		var jsonData any
		var bodyErr error
		if !noBody {
			if jf := vs.GetProp(fm, "json"); jf != nil {
				if f, ok := jf.(func() any); ok {
					jsonData = f()
				}
			}
			if unreadable, _ := vs.GetProp(fm, "unreadable").(bool); unreadable {
				var failed error
				if status < 200 || status >= 300 {
					failed = ctx.MakeError("request_status",
						fmt.Sprintf("request: %d: %v", status, vs.GetProp(fm, "statusText")))
				}
				bodyErr = UnreadableBody(ctx, status, headers, vs.GetProp(fm, "body"),
					fetchdef["headers"], failed)
			}
		}

		out := map[string]any{
			"ok":      bodyErr == nil && status >= 200 && status < 300,
			"status":  status,
			"headers": headers,
			"data":    jsonData,
		}
		if bodyErr != nil {
			out["err"] = sdk.cleanErr(ctx, bodyErr)
		}
		return out, nil
	}

	return map[string]any{"ok": false, "err": ctx.MakeError("direct_invalid", "invalid response type")}, nil
}

// A raw request returns its error rather than passing it through MakeError.
func (sdk *GandiSDK) cleanErr(ctx *Context, err error) error {
	if cleaned, ok := sdk.utility.Clean(ctx, err).(error); ok {
		return cleaned
	}
	return err
}

func (sdk *GandiSDK) Graphql(
	query string, variables map[string]any, ctrl map[string]any,
) (map[string]any, error) {
	if !sdk.opAllowed("graphql") {
		return sdk.opDenied("graphql"), nil
	}

	if variables == nil {
		variables = map[string]any{}
	}
	if ctrl == nil {
		ctrl = map[string]any{}
	}

	res, err := sdk.rawRequest(map[string]any{
		"method":  "POST",
		"headers": map[string]any{"content-type": "application/json"},
		"body":    map[string]any{"query": query, "variables": variables},
		"ctrl":    ctrl,
	})

	if err != nil {
		return res, err
	}

	// Errors are read BEFORE any status check: a GraphQL parse or validation
	// failure comes back as HTTP 400 carrying the standard { errors: [...] }
	// body, and the raw path represents a non-2xx as ok:false with no err —
	// so returning early on status would discard the server's own
	// diagnostics, which are the only useful part of that response.
	errors, _ := vs.GetPath(res, []any{"data", "errors"}).([]any)

	if 0 < len(errors) {
		msg, _ := vs.GetProp(errors[0], "message").(string)
		if msg == "" {
			msg = "graphql error"
		}
		res["ok"] = false
		res["err"] = fmt.Errorf("GandiSDK: graphql: %s", msg)
		res["graphql"] = errors
	}

	return res, nil
}


// AccessToken returns a AccessToken entity bound to this client.
// Idiomatic usage: client.AccessToken(nil).List(nil, nil) or
// client.AccessToken(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *GandiSDK) AccessToken(data map[string]any) GandiEntityBase {
	return NewAccessTokenEntityFunc(sdk, data)
}


// AcmeAccount returns a AcmeAccount entity bound to this client.
// Idiomatic usage: client.AcmeAccount(nil).List(nil, nil) or
// client.AcmeAccount(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *GandiSDK) AcmeAccount(data map[string]any) GandiEntityBase {
	return NewAcmeAccountEntityFunc(sdk, data)
}


// AcmeDomain returns a AcmeDomain entity bound to this client.
// Idiomatic usage: client.AcmeDomain(nil).List(nil, nil) or
// client.AcmeDomain(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *GandiSDK) AcmeDomain(data map[string]any) GandiEntityBase {
	return NewAcmeDomainEntityFunc(sdk, data)
}


// AcmePrice returns a AcmePrice entity bound to this client.
// Idiomatic usage: client.AcmePrice(nil).List(nil, nil) or
// client.AcmePrice(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *GandiSDK) AcmePrice(data map[string]any) GandiEntityBase {
	return NewAcmePriceEntityFunc(sdk, data)
}


// AcmeSubscription returns a AcmeSubscription entity bound to this client.
// Idiomatic usage: client.AcmeSubscription(nil).List(nil, nil) or
// client.AcmeSubscription(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *GandiSDK) AcmeSubscription(data map[string]any) GandiEntityBase {
	return NewAcmeSubscriptionEntityFunc(sdk, data)
}


// BillingInfo returns a BillingInfo entity bound to this client.
// Idiomatic usage: client.BillingInfo(nil).List(nil, nil) or
// client.BillingInfo(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *GandiSDK) BillingInfo(data map[string]any) GandiEntityBase {
	return NewBillingInfoEntityFunc(sdk, data)
}


// BillingPrice returns a BillingPrice entity bound to this client.
// Idiomatic usage: client.BillingPrice(nil).List(nil, nil) or
// client.BillingPrice(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *GandiSDK) BillingPrice(data map[string]any) GandiEntityBase {
	return NewBillingPriceEntityFunc(sdk, data)
}


// CertificateDcv returns a CertificateDcv entity bound to this client.
// Idiomatic usage: client.CertificateDcv(nil).List(nil, nil) or
// client.CertificateDcv(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *GandiSDK) CertificateDcv(data map[string]any) GandiEntityBase {
	return NewCertificateDcvEntityFunc(sdk, data)
}


// CertificatePackage returns a CertificatePackage entity bound to this client.
// Idiomatic usage: client.CertificatePackage(nil).List(nil, nil) or
// client.CertificatePackage(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *GandiSDK) CertificatePackage(data map[string]any) GandiEntityBase {
	return NewCertificatePackageEntityFunc(sdk, data)
}


// CertificatePem returns a CertificatePem entity bound to this client.
// Idiomatic usage: client.CertificatePem(nil).List(nil, nil) or
// client.CertificatePem(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *GandiSDK) CertificatePem(data map[string]any) GandiEntityBase {
	return NewCertificatePemEntityFunc(sdk, data)
}


// CertificateRenewal returns a CertificateRenewal entity bound to this client.
// Idiomatic usage: client.CertificateRenewal(nil).List(nil, nil) or
// client.CertificateRenewal(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *GandiSDK) CertificateRenewal(data map[string]any) GandiEntityBase {
	return NewCertificateRenewalEntityFunc(sdk, data)
}


// CertificateTag returns a CertificateTag entity bound to this client.
// Idiomatic usage: client.CertificateTag(nil).List(nil, nil) or
// client.CertificateTag(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *GandiSDK) CertificateTag(data map[string]any) GandiEntityBase {
	return NewCertificateTagEntityFunc(sdk, data)
}


// Comment returns a Comment entity bound to this client.
// Idiomatic usage: client.Comment(nil).List(nil, nil) or
// client.Comment(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *GandiSDK) Comment(data map[string]any) GandiEntityBase {
	return NewCommentEntityFunc(sdk, data)
}


// Domain returns a Domain entity bound to this client.
// Idiomatic usage: client.Domain(nil).List(nil, nil) or
// client.Domain(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *GandiSDK) Domain(data map[string]any) GandiEntityBase {
	return NewDomainEntityFunc(sdk, data)
}


// DomainAvailability returns a DomainAvailability entity bound to this client.
// Idiomatic usage: client.DomainAvailability(nil).List(nil, nil) or
// client.DomainAvailability(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *GandiSDK) DomainAvailability(data map[string]any) GandiEntityBase {
	return NewDomainAvailabilityEntityFunc(sdk, data)
}


// DomainChangeOwner returns a DomainChangeOwner entity bound to this client.
// Idiomatic usage: client.DomainChangeOwner(nil).List(nil, nil) or
// client.DomainChangeOwner(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *GandiSDK) DomainChangeOwner(data map[string]any) GandiEntityBase {
	return NewDomainChangeOwnerEntityFunc(sdk, data)
}


// DomainClaim returns a DomainClaim entity bound to this client.
// Idiomatic usage: client.DomainClaim(nil).List(nil, nil) or
// client.DomainClaim(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *GandiSDK) DomainClaim(data map[string]any) GandiEntityBase {
	return NewDomainClaimEntityFunc(sdk, data)
}


// DomainContact returns a DomainContact entity bound to this client.
// Idiomatic usage: client.DomainContact(nil).List(nil, nil) or
// client.DomainContact(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *GandiSDK) DomainContact(data map[string]any) GandiEntityBase {
	return NewDomainContactEntityFunc(sdk, data)
}


// DomainDnskey returns a DomainDnskey entity bound to this client.
// Idiomatic usage: client.DomainDnskey(nil).List(nil, nil) or
// client.DomainDnskey(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *GandiSDK) DomainDnskey(data map[string]any) GandiEntityBase {
	return NewDomainDnskeyEntityFunc(sdk, data)
}


// DomainDnssec returns a DomainDnssec entity bound to this client.
// Idiomatic usage: client.DomainDnssec(nil).List(nil, nil) or
// client.DomainDnssec(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *GandiSDK) DomainDnssec(data map[string]any) GandiEntityBase {
	return NewDomainDnssecEntityFunc(sdk, data)
}


// DomainHost returns a DomainHost entity bound to this client.
// Idiomatic usage: client.DomainHost(nil).List(nil, nil) or
// client.DomainHost(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *GandiSDK) DomainHost(data map[string]any) GandiEntityBase {
	return NewDomainHostEntityFunc(sdk, data)
}


// DomainLivedns returns a DomainLivedns entity bound to this client.
// Idiomatic usage: client.DomainLivedns(nil).List(nil, nil) or
// client.DomainLivedns(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *GandiSDK) DomainLivedns(data map[string]any) GandiEntityBase {
	return NewDomainLivednsEntityFunc(sdk, data)
}


// DomainNameserver returns a DomainNameserver entity bound to this client.
// Idiomatic usage: client.DomainNameserver(nil).List(nil, nil) or
// client.DomainNameserver(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *GandiSDK) DomainNameserver(data map[string]any) GandiEntityBase {
	return NewDomainNameserverEntityFunc(sdk, data)
}


// DomainTag returns a DomainTag entity bound to this client.
// Idiomatic usage: client.DomainTag(nil).List(nil, nil) or
// client.DomainTag(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *GandiSDK) DomainTag(data map[string]any) GandiEntityBase {
	return NewDomainTagEntityFunc(sdk, data)
}


// DomainTransfer returns a DomainTransfer entity bound to this client.
// Idiomatic usage: client.DomainTransfer(nil).List(nil, nil) or
// client.DomainTransfer(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *GandiSDK) DomainTransfer(data map[string]any) GandiEntityBase {
	return NewDomainTransferEntityFunc(sdk, data)
}


// DomainWebredir returns a DomainWebredir entity bound to this client.
// Idiomatic usage: client.DomainWebredir(nil).List(nil, nil) or
// client.DomainWebredir(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *GandiSDK) DomainWebredir(data map[string]any) GandiEntityBase {
	return NewDomainWebredirEntityFunc(sdk, data)
}


// EmailForward returns a EmailForward entity bound to this client.
// Idiomatic usage: client.EmailForward(nil).List(nil, nil) or
// client.EmailForward(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *GandiSDK) EmailForward(data map[string]any) GandiEntityBase {
	return NewEmailForwardEntityFunc(sdk, data)
}


// EmailMailbox returns a EmailMailbox entity bound to this client.
// Idiomatic usage: client.EmailMailbox(nil).List(nil, nil) or
// client.EmailMailbox(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *GandiSDK) EmailMailbox(data map[string]any) GandiEntityBase {
	return NewEmailMailboxEntityFunc(sdk, data)
}


// EmailMigration returns a EmailMigration entity bound to this client.
// Idiomatic usage: client.EmailMigration(nil).List(nil, nil) or
// client.EmailMigration(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *GandiSDK) EmailMigration(data map[string]any) GandiEntityBase {
	return NewEmailMigrationEntityFunc(sdk, data)
}


// EmailOffer returns a EmailOffer entity bound to this client.
// Idiomatic usage: client.EmailOffer(nil).List(nil, nil) or
// client.EmailOffer(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *GandiSDK) EmailOffer(data map[string]any) GandiEntityBase {
	return NewEmailOfferEntityFunc(sdk, data)
}


// EmailSlot returns a EmailSlot entity bound to this client.
// Idiomatic usage: client.EmailSlot(nil).List(nil, nil) or
// client.EmailSlot(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *GandiSDK) EmailSlot(data map[string]any) GandiEntityBase {
	return NewEmailSlotEntityFunc(sdk, data)
}


// HostingApplication returns a HostingApplication entity bound to this client.
// Idiomatic usage: client.HostingApplication(nil).List(nil, nil) or
// client.HostingApplication(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *GandiSDK) HostingApplication(data map[string]any) GandiEntityBase {
	return NewHostingApplicationEntityFunc(sdk, data)
}


// HostingInstance returns a HostingInstance entity bound to this client.
// Idiomatic usage: client.HostingInstance(nil).List(nil, nil) or
// client.HostingInstance(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *GandiSDK) HostingInstance(data map[string]any) GandiEntityBase {
	return NewHostingInstanceEntityFunc(sdk, data)
}


// HostingVhost returns a HostingVhost entity bound to this client.
// Idiomatic usage: client.HostingVhost(nil).List(nil, nil) or
// client.HostingVhost(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *GandiSDK) HostingVhost(data map[string]any) GandiEntityBase {
	return NewHostingVhostEntityFunc(sdk, data)
}


// IssuedCertificate returns a IssuedCertificate entity bound to this client.
// Idiomatic usage: client.IssuedCertificate(nil).List(nil, nil) or
// client.IssuedCertificate(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *GandiSDK) IssuedCertificate(data map[string]any) GandiEntityBase {
	return NewIssuedCertificateEntityFunc(sdk, data)
}


// LinkedZone returns a LinkedZone entity bound to this client.
// Idiomatic usage: client.LinkedZone(nil).List(nil, nil) or
// client.LinkedZone(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *GandiSDK) LinkedZone(data map[string]any) GandiEntityBase {
	return NewLinkedZoneEntityFunc(sdk, data)
}


// LinkedZoneDeployment returns a LinkedZoneDeployment entity bound to this client.
// Idiomatic usage: client.LinkedZoneDeployment(nil).List(nil, nil) or
// client.LinkedZoneDeployment(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *GandiSDK) LinkedZoneDeployment(data map[string]any) GandiEntityBase {
	return NewLinkedZoneDeploymentEntityFunc(sdk, data)
}


// LinkedZoneDomain returns a LinkedZoneDomain entity bound to this client.
// Idiomatic usage: client.LinkedZoneDomain(nil).List(nil, nil) or
// client.LinkedZoneDomain(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *GandiSDK) LinkedZoneDomain(data map[string]any) GandiEntityBase {
	return NewLinkedZoneDomainEntityFunc(sdk, data)
}


// LinkedZoneTask returns a LinkedZoneTask entity bound to this client.
// Idiomatic usage: client.LinkedZoneTask(nil).List(nil, nil) or
// client.LinkedZoneTask(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *GandiSDK) LinkedZoneTask(data map[string]any) GandiEntityBase {
	return NewLinkedZoneTaskEntityFunc(sdk, data)
}


// LivednsAxfrSlave returns a LivednsAxfrSlave entity bound to this client.
// Idiomatic usage: client.LivednsAxfrSlave(nil).List(nil, nil) or
// client.LivednsAxfrSlave(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *GandiSDK) LivednsAxfrSlave(data map[string]any) GandiEntityBase {
	return NewLivednsAxfrSlaveEntityFunc(sdk, data)
}


// LivednsAxfrTsig returns a LivednsAxfrTsig entity bound to this client.
// Idiomatic usage: client.LivednsAxfrTsig(nil).List(nil, nil) or
// client.LivednsAxfrTsig(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *GandiSDK) LivednsAxfrTsig(data map[string]any) GandiEntityBase {
	return NewLivednsAxfrTsigEntityFunc(sdk, data)
}


// LivednsDomain returns a LivednsDomain entity bound to this client.
// Idiomatic usage: client.LivednsDomain(nil).List(nil, nil) or
// client.LivednsDomain(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *GandiSDK) LivednsDomain(data map[string]any) GandiEntityBase {
	return NewLivednsDomainEntityFunc(sdk, data)
}


// LivednsKey returns a LivednsKey entity bound to this client.
// Idiomatic usage: client.LivednsKey(nil).List(nil, nil) or
// client.LivednsKey(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *GandiSDK) LivednsKey(data map[string]any) GandiEntityBase {
	return NewLivednsKeyEntityFunc(sdk, data)
}


// LivednsNameserver returns a LivednsNameserver entity bound to this client.
// Idiomatic usage: client.LivednsNameserver(nil).List(nil, nil) or
// client.LivednsNameserver(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *GandiSDK) LivednsNameserver(data map[string]any) GandiEntityBase {
	return NewLivednsNameserverEntityFunc(sdk, data)
}


// LivednsRecord returns a LivednsRecord entity bound to this client.
// Idiomatic usage: client.LivednsRecord(nil).List(nil, nil) or
// client.LivednsRecord(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *GandiSDK) LivednsRecord(data map[string]any) GandiEntityBase {
	return NewLivednsRecordEntityFunc(sdk, data)
}


// LivednsRrtype returns a LivednsRrtype entity bound to this client.
// Idiomatic usage: client.LivednsRrtype(nil).List(nil, nil) or
// client.LivednsRrtype(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *GandiSDK) LivednsRrtype(data map[string]any) GandiEntityBase {
	return NewLivednsRrtypeEntityFunc(sdk, data)
}


// LivednsSnapshot returns a LivednsSnapshot entity bound to this client.
// Idiomatic usage: client.LivednsSnapshot(nil).List(nil, nil) or
// client.LivednsSnapshot(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *GandiSDK) LivednsSnapshot(data map[string]any) GandiEntityBase {
	return NewLivednsSnapshotEntityFunc(sdk, data)
}


// LivednsTsigKey returns a LivednsTsigKey entity bound to this client.
// Idiomatic usage: client.LivednsTsigKey(nil).List(nil, nil) or
// client.LivednsTsigKey(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *GandiSDK) LivednsTsigKey(data map[string]any) GandiEntityBase {
	return NewLivednsTsigKeyEntityFunc(sdk, data)
}


// Mailbox returns a Mailbox entity bound to this client.
// Idiomatic usage: client.Mailbox(nil).List(nil, nil) or
// client.Mailbox(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *GandiSDK) Mailbox(data map[string]any) GandiEntityBase {
	return NewMailboxEntityFunc(sdk, data)
}


// MailboxDomain returns a MailboxDomain entity bound to this client.
// Idiomatic usage: client.MailboxDomain(nil).List(nil, nil) or
// client.MailboxDomain(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *GandiSDK) MailboxDomain(data map[string]any) GandiEntityBase {
	return NewMailboxDomainEntityFunc(sdk, data)
}


// MailboxForward returns a MailboxForward entity bound to this client.
// Idiomatic usage: client.MailboxForward(nil).List(nil, nil) or
// client.MailboxForward(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *GandiSDK) MailboxForward(data map[string]any) GandiEntityBase {
	return NewMailboxForwardEntityFunc(sdk, data)
}


// MailboxProduct returns a MailboxProduct entity bound to this client.
// Idiomatic usage: client.MailboxProduct(nil).List(nil, nil) or
// client.MailboxProduct(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *GandiSDK) MailboxProduct(data map[string]any) GandiEntityBase {
	return NewMailboxProductEntityFunc(sdk, data)
}


// MailboxQuota returns a MailboxQuota entity bound to this client.
// Idiomatic usage: client.MailboxQuota(nil).List(nil, nil) or
// client.MailboxQuota(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *GandiSDK) MailboxQuota(data map[string]any) GandiEntityBase {
	return NewMailboxQuotaEntityFunc(sdk, data)
}


// MailboxSlot returns a MailboxSlot entity bound to this client.
// Idiomatic usage: client.MailboxSlot(nil).List(nil, nil) or
// client.MailboxSlot(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *GandiSDK) MailboxSlot(data map[string]any) GandiEntityBase {
	return NewMailboxSlotEntityFunc(sdk, data)
}


// Organization returns a Organization entity bound to this client.
// Idiomatic usage: client.Organization(nil).List(nil, nil) or
// client.Organization(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *GandiSDK) Organization(data map[string]any) GandiEntityBase {
	return NewOrganizationEntityFunc(sdk, data)
}


// OrganizationCustomer returns a OrganizationCustomer entity bound to this client.
// Idiomatic usage: client.OrganizationCustomer(nil).List(nil, nil) or
// client.OrganizationCustomer(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *GandiSDK) OrganizationCustomer(data map[string]any) GandiEntityBase {
	return NewOrganizationCustomerEntityFunc(sdk, data)
}


// Template returns a Template entity bound to this client.
// Idiomatic usage: client.Template(nil).List(nil, nil) or
// client.Template(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *GandiSDK) Template(data map[string]any) GandiEntityBase {
	return NewTemplateEntityFunc(sdk, data)
}


// TemplateDispatch returns a TemplateDispatch entity bound to this client.
// Idiomatic usage: client.TemplateDispatch(nil).List(nil, nil) or
// client.TemplateDispatch(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *GandiSDK) TemplateDispatch(data map[string]any) GandiEntityBase {
	return NewTemplateDispatchEntityFunc(sdk, data)
}


// Tld returns a Tld entity bound to this client.
// Idiomatic usage: client.Tld(nil).List(nil, nil) or
// client.Tld(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *GandiSDK) Tld(data map[string]any) GandiEntityBase {
	return NewTldEntityFunc(sdk, data)
}


// User returns a User entity bound to this client.
// Idiomatic usage: client.User(nil).List(nil, nil) or
// client.User(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *GandiSDK) User(data map[string]any) GandiEntityBase {
	return NewUserEntityFunc(sdk, data)
}



func TestSDK(testopts map[string]any, sdkopts map[string]any) *GandiSDK {
	if sdkopts == nil {
		sdkopts = map[string]any{}
	}
	sdkopts = vs.Clone(sdkopts).(map[string]any)

	if testopts == nil {
		testopts = map[string]any{}
	}
	testopts = vs.Clone(testopts).(map[string]any)
	testopts["active"] = true

	vs.SetPath(sdkopts, []any{"feature", "test"}, testopts)

	sdk := NewGandiSDK(sdkopts)
	sdk.Mode = "test"

	return sdk
}
