package main

import (
	"context"
	"encoding/json"
	"fmt"
	"strings"

	"github.com/google/jsonschema-go/jsonschema"
	"github.com/modelcontextprotocol/go-sdk/mcp"
	sdk "github.com/voxgig-sdk/gandi-sdk/go"
)

// ListArgs is what an agent sends to gandi_list.
type ListArgs struct {
	Entity string         `json:"entity" jsonschema:"one of: acme_account | acme_domain | acme_price | acme_subscription | certificate_package | certificate_tag | domain | domain_dnskey | domain_host | domain_nameserver | domain_tag | domain_webredir | email_forward | email_mailbox | email_slot | hosting_application | hosting_instance | hosting_vhost | issued_certificate | linked_zone | linked_zone_domain | linked_zone_task | livedns_axfr_slave | livedns_axfr_tsig | livedns_domain | livedns_key | livedns_nameserver | livedns_record | livedns_rrtype | livedns_snapshot | livedns_tsig_key | mailbox | mailbox_domain | mailbox_forward | mailbox_product | mailbox_quota | mailbox_slot | organization | organization_customer | template | tld"`
	Query  map[string]any `json:"query,omitempty" jsonschema:"optional filter map; omit it for the first page"`
}

// LoadArgs is what an agent sends to gandi_load.
type LoadArgs struct {
	Entity string         `json:"entity" jsonschema:"one of: acme_account | acme_domain | acme_subscription | billing_info | billing_price | certificate_package | certificate_pem | comment | domain | domain_availability | domain_change_owner | domain_claim | domain_contact | domain_dnssec | domain_host | domain_livedns | domain_transfer | domain_webredir | email_mailbox | email_migration | email_offer | email_slot | hosting_application | hosting_instance | hosting_vhost | issued_certificate | linked_zone | linked_zone_domain | linked_zone_task | livedns_domain | livedns_key | livedns_record | livedns_snapshot | livedns_tsig_key | mailbox | mailbox_domain | mailbox_slot | organization | organization_customer | template | template_dispatch | tld | user"`
	Query  map[string]any `json:"query" jsonschema:"match map naming the record, such as {\"id\":1}"`
}

func registerTools(server *mcp.Server, client *sdk.GandiSDK) {
	mcp.AddTool(server, &mcp.Tool{
		Name:        "gandi_list",
		Description: "List records from Gandi. Args: entity, query (optional filter map; omit it for the first page). Returns the first page of records as JSON.",
		Annotations: &mcp.ToolAnnotations{ReadOnlyHint: true},
		InputSchema: entitySchema[ListArgs]("acme_account", "acme_domain", "acme_price", "acme_subscription", "certificate_package", "certificate_tag", "domain", "domain_dnskey", "domain_host", "domain_nameserver", "domain_tag", "domain_webredir", "email_forward", "email_mailbox", "email_slot", "hosting_application", "hosting_instance", "hosting_vhost", "issued_certificate", "linked_zone", "linked_zone_domain", "linked_zone_task", "livedns_axfr_slave", "livedns_axfr_tsig", "livedns_domain", "livedns_key", "livedns_nameserver", "livedns_record", "livedns_rrtype", "livedns_snapshot", "livedns_tsig_key", "mailbox", "mailbox_domain", "mailbox_forward", "mailbox_product", "mailbox_quota", "mailbox_slot", "organization", "organization_customer", "template", "tld"),
	}, func(ctx context.Context, req *mcp.CallToolRequest, args ListArgs) (*mcp.CallToolResult, any, error) {
		return runOp(ctx, client, "list", args.Entity, args.Query)
	})
	mcp.AddTool(server, &mcp.Tool{
		Name:        "gandi_load",
		Description: "Load one record from Gandi. Args: entity, query (match map naming the record, such as {\"id\":1}). Returns the record as JSON.",
		Annotations: &mcp.ToolAnnotations{ReadOnlyHint: true},
		InputSchema: entitySchema[LoadArgs]("acme_account", "acme_domain", "acme_subscription", "billing_info", "billing_price", "certificate_package", "certificate_pem", "comment", "domain", "domain_availability", "domain_change_owner", "domain_claim", "domain_contact", "domain_dnssec", "domain_host", "domain_livedns", "domain_transfer", "domain_webredir", "email_mailbox", "email_migration", "email_offer", "email_slot", "hosting_application", "hosting_instance", "hosting_vhost", "issued_certificate", "linked_zone", "linked_zone_domain", "linked_zone_task", "livedns_domain", "livedns_key", "livedns_record", "livedns_snapshot", "livedns_tsig_key", "mailbox", "mailbox_domain", "mailbox_slot", "organization", "organization_customer", "template", "template_dispatch", "tld", "user"),
	}, func(ctx context.Context, req *mcp.CallToolRequest, args LoadArgs) (*mcp.CallToolResult, any, error) {
		return runOp(ctx, client, "load", args.Entity, args.Query)
	})
}

// entitySchema is the schema inferred from In, its entity limited to the
// entities the tool serves.
func entitySchema[In any](names ...string) *jsonschema.Schema {
	schema, err := jsonschema.For[In](nil)
	if err != nil {
		panic(err)
	}
	enum := make([]any, len(names))
	for i, name := range names {
		enum[i] = name
	}
	schema.Properties["entity"].Enum = enum
	return schema
}

func runOp(_ context.Context, client *sdk.GandiSDK, op string, entity string, input map[string]any) (*mcp.CallToolResult, any, error) {
	ent, err := entityFor(client, entity)
	if err != nil {
		return toolError(err.Error())
	}

	var result any
	switch op {
	case "list":
		result, err = ent.List(input, nil)
	case "load":
		result, err = ent.Load(input, nil)
	case "create":
		result, err = ent.Create(input, nil)
	case "update":
		result, err = ent.Update(input, nil)
	case "patch":
		result, err = ent.Patch(input, nil)
	case "remove":
		result, err = ent.Remove(input, nil)
	default:
		return toolError(fmt.Sprintf("unknown op %q", op))
	}
	if err != nil {
		return toolError(err.Error())
	}

	// SDK returns *Entity wrappers; unwrap each via .Data() to get a
	// plain map[string]any (or []any of maps for list) suitable for
	// JSON marshalling.
	data := extractData(result)
	body, err := json.MarshalIndent(data, "", "  ")
	if err != nil {
		return toolError(fmt.Sprintf("marshal: %v", err))
	}
	return &mcp.CallToolResult{
		Content: []mcp.Content{
			&mcp.TextContent{Text: string(body)},
		},
	}, data, nil
}

// entityFor dispatches on the lowercase entity name. The generator
// emits one `case "<name>":` per entity defined in the SDK model.
func entityFor(client *sdk.GandiSDK, name string) (sdk.GandiEntityBase, error) {
	switch strings.ToLower(name) {
	case "access_token":
		return client.AccessToken(nil), nil
	case "acme_account":
		return client.AcmeAccount(nil), nil
	case "acme_domain":
		return client.AcmeDomain(nil), nil
	case "acme_price":
		return client.AcmePrice(nil), nil
	case "acme_subscription":
		return client.AcmeSubscription(nil), nil
	case "billing_info":
		return client.BillingInfo(nil), nil
	case "billing_price":
		return client.BillingPrice(nil), nil
	case "certificate_dcv":
		return client.CertificateDcv(nil), nil
	case "certificate_package":
		return client.CertificatePackage(nil), nil
	case "certificate_pem":
		return client.CertificatePem(nil), nil
	case "certificate_renewal":
		return client.CertificateRenewal(nil), nil
	case "certificate_tag":
		return client.CertificateTag(nil), nil
	case "comment":
		return client.Comment(nil), nil
	case "domain":
		return client.Domain(nil), nil
	case "domain_availability":
		return client.DomainAvailability(nil), nil
	case "domain_change_owner":
		return client.DomainChangeOwner(nil), nil
	case "domain_claim":
		return client.DomainClaim(nil), nil
	case "domain_contact":
		return client.DomainContact(nil), nil
	case "domain_dnskey":
		return client.DomainDnskey(nil), nil
	case "domain_dnssec":
		return client.DomainDnssec(nil), nil
	case "domain_host":
		return client.DomainHost(nil), nil
	case "domain_livedns":
		return client.DomainLivedns(nil), nil
	case "domain_nameserver":
		return client.DomainNameserver(nil), nil
	case "domain_tag":
		return client.DomainTag(nil), nil
	case "domain_transfer":
		return client.DomainTransfer(nil), nil
	case "domain_webredir":
		return client.DomainWebredir(nil), nil
	case "email_forward":
		return client.EmailForward(nil), nil
	case "email_mailbox":
		return client.EmailMailbox(nil), nil
	case "email_migration":
		return client.EmailMigration(nil), nil
	case "email_offer":
		return client.EmailOffer(nil), nil
	case "email_slot":
		return client.EmailSlot(nil), nil
	case "hosting_application":
		return client.HostingApplication(nil), nil
	case "hosting_instance":
		return client.HostingInstance(nil), nil
	case "hosting_vhost":
		return client.HostingVhost(nil), nil
	case "issued_certificate":
		return client.IssuedCertificate(nil), nil
	case "linked_zone":
		return client.LinkedZone(nil), nil
	case "linked_zone_deployment":
		return client.LinkedZoneDeployment(nil), nil
	case "linked_zone_domain":
		return client.LinkedZoneDomain(nil), nil
	case "linked_zone_task":
		return client.LinkedZoneTask(nil), nil
	case "livedns_axfr_slave":
		return client.LivednsAxfrSlave(nil), nil
	case "livedns_axfr_tsig":
		return client.LivednsAxfrTsig(nil), nil
	case "livedns_domain":
		return client.LivednsDomain(nil), nil
	case "livedns_key":
		return client.LivednsKey(nil), nil
	case "livedns_nameserver":
		return client.LivednsNameserver(nil), nil
	case "livedns_record":
		return client.LivednsRecord(nil), nil
	case "livedns_rrtype":
		return client.LivednsRrtype(nil), nil
	case "livedns_snapshot":
		return client.LivednsSnapshot(nil), nil
	case "livedns_tsig_key":
		return client.LivednsTsigKey(nil), nil
	case "livedns_zone":
		return client.LivednsZone(nil), nil
	case "mailbox":
		return client.Mailbox(nil), nil
	case "mailbox_domain":
		return client.MailboxDomain(nil), nil
	case "mailbox_forward":
		return client.MailboxForward(nil), nil
	case "mailbox_product":
		return client.MailboxProduct(nil), nil
	case "mailbox_quota":
		return client.MailboxQuota(nil), nil
	case "mailbox_slot":
		return client.MailboxSlot(nil), nil
	case "organization":
		return client.Organization(nil), nil
	case "organization_customer":
		return client.OrganizationCustomer(nil), nil
	case "template":
		return client.Template(nil), nil
	case "template_dispatch":
		return client.TemplateDispatch(nil), nil
	case "tld":
		return client.Tld(nil), nil
	case "user":
		return client.User(nil), nil
	}
	return nil, fmt.Errorf("unknown entity %q", name)
}

func extractData(x any) any {
	switch v := x.(type) {
	case sdk.Entity:
		return extractData(v.Data())
	case []any:
		out := make([]any, len(v))
		for i, e := range v {
			out[i] = extractData(e)
		}
		return out
	case map[string]any:
		out := make(map[string]any, len(v))
		for k, vv := range v {
			out[k] = extractData(vv)
		}
		return out
	}
	return x
}

func toolError(msg string) (*mcp.CallToolResult, any, error) {
	return &mcp.CallToolResult{
		IsError: true,
		Content: []mcp.Content{
			&mcp.TextContent{Text: msg},
		},
	}, nil, nil
}

// hint is an MCP annotation that defaults to true unless stated.
func hint(b bool) *bool {
	return &b
}
