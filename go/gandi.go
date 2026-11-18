package voxgiggandisdk

import (
	"github.com/voxgig-sdk/gandi-sdk/go/core"
	"github.com/voxgig-sdk/gandi-sdk/go/entity"
	"github.com/voxgig-sdk/gandi-sdk/go/feature"
	_ "github.com/voxgig-sdk/gandi-sdk/go/utility"
)

// Type aliases preserve external API.
type GandiSDK = core.GandiSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type GandiEntityBase = core.GandiEntityBase

// Deprecated: use GandiEntityBase.
type GandiEntity = core.GandiEntityBase

type StreamItem = core.StreamItem
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type GandiError = core.GandiError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewDebugFeatureFunc = func() core.Feature {
		return feature.NewDebugFeature()
	}
	core.NewIdempotencyFeatureFunc = func() core.Feature {
		return feature.NewIdempotencyFeature()
	}
	core.NewMetricsFeatureFunc = func() core.Feature {
		return feature.NewMetricsFeature()
	}
	core.NewPagingFeatureFunc = func() core.Feature {
		return feature.NewPagingFeature()
	}
	core.NewRatelimitFeatureFunc = func() core.Feature {
		return feature.NewRatelimitFeature()
	}
	core.NewRetryFeatureFunc = func() core.Feature {
		return feature.NewRetryFeature()
	}
	core.NewSecretsFeatureFunc = func() core.Feature {
		return feature.NewSecretsFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewTimeoutFeatureFunc = func() core.Feature {
		return feature.NewTimeoutFeature()
	}
	core.NewAccessTokenEntityFunc = func(client *core.GandiSDK, entopts map[string]any) core.GandiEntityBase {
		return entity.NewAccessTokenEntity(client, entopts)
	}
	core.NewAcmeAccountEntityFunc = func(client *core.GandiSDK, entopts map[string]any) core.GandiEntityBase {
		return entity.NewAcmeAccountEntity(client, entopts)
	}
	core.NewAcmeDomainEntityFunc = func(client *core.GandiSDK, entopts map[string]any) core.GandiEntityBase {
		return entity.NewAcmeDomainEntity(client, entopts)
	}
	core.NewAcmePriceEntityFunc = func(client *core.GandiSDK, entopts map[string]any) core.GandiEntityBase {
		return entity.NewAcmePriceEntity(client, entopts)
	}
	core.NewAcmeSubscriptionEntityFunc = func(client *core.GandiSDK, entopts map[string]any) core.GandiEntityBase {
		return entity.NewAcmeSubscriptionEntity(client, entopts)
	}
	core.NewBillingInfoEntityFunc = func(client *core.GandiSDK, entopts map[string]any) core.GandiEntityBase {
		return entity.NewBillingInfoEntity(client, entopts)
	}
	core.NewBillingPriceEntityFunc = func(client *core.GandiSDK, entopts map[string]any) core.GandiEntityBase {
		return entity.NewBillingPriceEntity(client, entopts)
	}
	core.NewCertificateDcvEntityFunc = func(client *core.GandiSDK, entopts map[string]any) core.GandiEntityBase {
		return entity.NewCertificateDcvEntity(client, entopts)
	}
	core.NewCertificatePackageEntityFunc = func(client *core.GandiSDK, entopts map[string]any) core.GandiEntityBase {
		return entity.NewCertificatePackageEntity(client, entopts)
	}
	core.NewCertificatePemEntityFunc = func(client *core.GandiSDK, entopts map[string]any) core.GandiEntityBase {
		return entity.NewCertificatePemEntity(client, entopts)
	}
	core.NewCertificateRenewalEntityFunc = func(client *core.GandiSDK, entopts map[string]any) core.GandiEntityBase {
		return entity.NewCertificateRenewalEntity(client, entopts)
	}
	core.NewCertificateTagEntityFunc = func(client *core.GandiSDK, entopts map[string]any) core.GandiEntityBase {
		return entity.NewCertificateTagEntity(client, entopts)
	}
	core.NewCommentEntityFunc = func(client *core.GandiSDK, entopts map[string]any) core.GandiEntityBase {
		return entity.NewCommentEntity(client, entopts)
	}
	core.NewDomainEntityFunc = func(client *core.GandiSDK, entopts map[string]any) core.GandiEntityBase {
		return entity.NewDomainEntity(client, entopts)
	}
	core.NewDomainAvailabilityEntityFunc = func(client *core.GandiSDK, entopts map[string]any) core.GandiEntityBase {
		return entity.NewDomainAvailabilityEntity(client, entopts)
	}
	core.NewDomainChangeOwnerEntityFunc = func(client *core.GandiSDK, entopts map[string]any) core.GandiEntityBase {
		return entity.NewDomainChangeOwnerEntity(client, entopts)
	}
	core.NewDomainClaimEntityFunc = func(client *core.GandiSDK, entopts map[string]any) core.GandiEntityBase {
		return entity.NewDomainClaimEntity(client, entopts)
	}
	core.NewDomainContactEntityFunc = func(client *core.GandiSDK, entopts map[string]any) core.GandiEntityBase {
		return entity.NewDomainContactEntity(client, entopts)
	}
	core.NewDomainDnskeyEntityFunc = func(client *core.GandiSDK, entopts map[string]any) core.GandiEntityBase {
		return entity.NewDomainDnskeyEntity(client, entopts)
	}
	core.NewDomainDnssecEntityFunc = func(client *core.GandiSDK, entopts map[string]any) core.GandiEntityBase {
		return entity.NewDomainDnssecEntity(client, entopts)
	}
	core.NewDomainHostEntityFunc = func(client *core.GandiSDK, entopts map[string]any) core.GandiEntityBase {
		return entity.NewDomainHostEntity(client, entopts)
	}
	core.NewDomainLivednsEntityFunc = func(client *core.GandiSDK, entopts map[string]any) core.GandiEntityBase {
		return entity.NewDomainLivednsEntity(client, entopts)
	}
	core.NewDomainNameserverEntityFunc = func(client *core.GandiSDK, entopts map[string]any) core.GandiEntityBase {
		return entity.NewDomainNameserverEntity(client, entopts)
	}
	core.NewDomainTagEntityFunc = func(client *core.GandiSDK, entopts map[string]any) core.GandiEntityBase {
		return entity.NewDomainTagEntity(client, entopts)
	}
	core.NewDomainTransferEntityFunc = func(client *core.GandiSDK, entopts map[string]any) core.GandiEntityBase {
		return entity.NewDomainTransferEntity(client, entopts)
	}
	core.NewDomainWebredirEntityFunc = func(client *core.GandiSDK, entopts map[string]any) core.GandiEntityBase {
		return entity.NewDomainWebredirEntity(client, entopts)
	}
	core.NewEmailForwardEntityFunc = func(client *core.GandiSDK, entopts map[string]any) core.GandiEntityBase {
		return entity.NewEmailForwardEntity(client, entopts)
	}
	core.NewEmailMailboxEntityFunc = func(client *core.GandiSDK, entopts map[string]any) core.GandiEntityBase {
		return entity.NewEmailMailboxEntity(client, entopts)
	}
	core.NewEmailMigrationEntityFunc = func(client *core.GandiSDK, entopts map[string]any) core.GandiEntityBase {
		return entity.NewEmailMigrationEntity(client, entopts)
	}
	core.NewEmailOfferEntityFunc = func(client *core.GandiSDK, entopts map[string]any) core.GandiEntityBase {
		return entity.NewEmailOfferEntity(client, entopts)
	}
	core.NewEmailSlotEntityFunc = func(client *core.GandiSDK, entopts map[string]any) core.GandiEntityBase {
		return entity.NewEmailSlotEntity(client, entopts)
	}
	core.NewHostingApplicationEntityFunc = func(client *core.GandiSDK, entopts map[string]any) core.GandiEntityBase {
		return entity.NewHostingApplicationEntity(client, entopts)
	}
	core.NewHostingInstanceEntityFunc = func(client *core.GandiSDK, entopts map[string]any) core.GandiEntityBase {
		return entity.NewHostingInstanceEntity(client, entopts)
	}
	core.NewHostingVhostEntityFunc = func(client *core.GandiSDK, entopts map[string]any) core.GandiEntityBase {
		return entity.NewHostingVhostEntity(client, entopts)
	}
	core.NewIssuedCertificateEntityFunc = func(client *core.GandiSDK, entopts map[string]any) core.GandiEntityBase {
		return entity.NewIssuedCertificateEntity(client, entopts)
	}
	core.NewLinkedZoneEntityFunc = func(client *core.GandiSDK, entopts map[string]any) core.GandiEntityBase {
		return entity.NewLinkedZoneEntity(client, entopts)
	}
	core.NewLinkedZoneDeploymentEntityFunc = func(client *core.GandiSDK, entopts map[string]any) core.GandiEntityBase {
		return entity.NewLinkedZoneDeploymentEntity(client, entopts)
	}
	core.NewLinkedZoneDomainEntityFunc = func(client *core.GandiSDK, entopts map[string]any) core.GandiEntityBase {
		return entity.NewLinkedZoneDomainEntity(client, entopts)
	}
	core.NewLinkedZoneTaskEntityFunc = func(client *core.GandiSDK, entopts map[string]any) core.GandiEntityBase {
		return entity.NewLinkedZoneTaskEntity(client, entopts)
	}
	core.NewLivednsAxfrSlaveEntityFunc = func(client *core.GandiSDK, entopts map[string]any) core.GandiEntityBase {
		return entity.NewLivednsAxfrSlaveEntity(client, entopts)
	}
	core.NewLivednsAxfrTsigEntityFunc = func(client *core.GandiSDK, entopts map[string]any) core.GandiEntityBase {
		return entity.NewLivednsAxfrTsigEntity(client, entopts)
	}
	core.NewLivednsDomainEntityFunc = func(client *core.GandiSDK, entopts map[string]any) core.GandiEntityBase {
		return entity.NewLivednsDomainEntity(client, entopts)
	}
	core.NewLivednsKeyEntityFunc = func(client *core.GandiSDK, entopts map[string]any) core.GandiEntityBase {
		return entity.NewLivednsKeyEntity(client, entopts)
	}
	core.NewLivednsNameserverEntityFunc = func(client *core.GandiSDK, entopts map[string]any) core.GandiEntityBase {
		return entity.NewLivednsNameserverEntity(client, entopts)
	}
	core.NewLivednsRecordEntityFunc = func(client *core.GandiSDK, entopts map[string]any) core.GandiEntityBase {
		return entity.NewLivednsRecordEntity(client, entopts)
	}
	core.NewLivednsRrtypeEntityFunc = func(client *core.GandiSDK, entopts map[string]any) core.GandiEntityBase {
		return entity.NewLivednsRrtypeEntity(client, entopts)
	}
	core.NewLivednsSnapshotEntityFunc = func(client *core.GandiSDK, entopts map[string]any) core.GandiEntityBase {
		return entity.NewLivednsSnapshotEntity(client, entopts)
	}
	core.NewLivednsTsigKeyEntityFunc = func(client *core.GandiSDK, entopts map[string]any) core.GandiEntityBase {
		return entity.NewLivednsTsigKeyEntity(client, entopts)
	}
	core.NewMailboxEntityFunc = func(client *core.GandiSDK, entopts map[string]any) core.GandiEntityBase {
		return entity.NewMailboxEntity(client, entopts)
	}
	core.NewMailboxDomainEntityFunc = func(client *core.GandiSDK, entopts map[string]any) core.GandiEntityBase {
		return entity.NewMailboxDomainEntity(client, entopts)
	}
	core.NewMailboxForwardEntityFunc = func(client *core.GandiSDK, entopts map[string]any) core.GandiEntityBase {
		return entity.NewMailboxForwardEntity(client, entopts)
	}
	core.NewMailboxProductEntityFunc = func(client *core.GandiSDK, entopts map[string]any) core.GandiEntityBase {
		return entity.NewMailboxProductEntity(client, entopts)
	}
	core.NewMailboxQuotaEntityFunc = func(client *core.GandiSDK, entopts map[string]any) core.GandiEntityBase {
		return entity.NewMailboxQuotaEntity(client, entopts)
	}
	core.NewMailboxSlotEntityFunc = func(client *core.GandiSDK, entopts map[string]any) core.GandiEntityBase {
		return entity.NewMailboxSlotEntity(client, entopts)
	}
	core.NewOrganizationEntityFunc = func(client *core.GandiSDK, entopts map[string]any) core.GandiEntityBase {
		return entity.NewOrganizationEntity(client, entopts)
	}
	core.NewOrganizationCustomerEntityFunc = func(client *core.GandiSDK, entopts map[string]any) core.GandiEntityBase {
		return entity.NewOrganizationCustomerEntity(client, entopts)
	}
	core.NewTemplateEntityFunc = func(client *core.GandiSDK, entopts map[string]any) core.GandiEntityBase {
		return entity.NewTemplateEntity(client, entopts)
	}
	core.NewTemplateDispatchEntityFunc = func(client *core.GandiSDK, entopts map[string]any) core.GandiEntityBase {
		return entity.NewTemplateDispatchEntity(client, entopts)
	}
	core.NewTldEntityFunc = func(client *core.GandiSDK, entopts map[string]any) core.GandiEntityBase {
		return entity.NewTldEntity(client, entopts)
	}
	core.NewUserEntityFunc = func(client *core.GandiSDK, entopts map[string]any) core.GandiEntityBase {
		return entity.NewUserEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewGandiSDK = core.NewGandiSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var SharedConfig = core.SharedConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewGandiSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *GandiSDK  { return NewGandiSDK(nil) }
func Test() *GandiSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewDebugFeature = feature.NewDebugFeature
var NewIdempotencyFeature = feature.NewIdempotencyFeature
var NewMetricsFeature = feature.NewMetricsFeature
var NewPagingFeature = feature.NewPagingFeature
var NewRatelimitFeature = feature.NewRatelimitFeature
var NewRetryFeature = feature.NewRetryFeature
var NewSecretsFeature = feature.NewSecretsFeature
var NewTestFeature = feature.NewTestFeature
var NewTimeoutFeature = feature.NewTimeoutFeature
