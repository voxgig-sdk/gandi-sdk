package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewDebugFeatureFunc func() Feature

var NewIdempotencyFeatureFunc func() Feature

var NewMetricsFeatureFunc func() Feature

var NewPagingFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewSecretsFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewAccessTokenEntityFunc func(client *GandiSDK, entopts map[string]any) GandiEntityBase

var NewAcmeAccountEntityFunc func(client *GandiSDK, entopts map[string]any) GandiEntityBase

var NewAcmeDomainEntityFunc func(client *GandiSDK, entopts map[string]any) GandiEntityBase

var NewAcmePriceEntityFunc func(client *GandiSDK, entopts map[string]any) GandiEntityBase

var NewAcmeSubscriptionEntityFunc func(client *GandiSDK, entopts map[string]any) GandiEntityBase

var NewBillingInfoEntityFunc func(client *GandiSDK, entopts map[string]any) GandiEntityBase

var NewBillingPriceEntityFunc func(client *GandiSDK, entopts map[string]any) GandiEntityBase

var NewCertificateDcvEntityFunc func(client *GandiSDK, entopts map[string]any) GandiEntityBase

var NewCertificatePackageEntityFunc func(client *GandiSDK, entopts map[string]any) GandiEntityBase

var NewCertificatePemEntityFunc func(client *GandiSDK, entopts map[string]any) GandiEntityBase

var NewCertificateRenewalEntityFunc func(client *GandiSDK, entopts map[string]any) GandiEntityBase

var NewCertificateTagEntityFunc func(client *GandiSDK, entopts map[string]any) GandiEntityBase

var NewCommentEntityFunc func(client *GandiSDK, entopts map[string]any) GandiEntityBase

var NewDomainEntityFunc func(client *GandiSDK, entopts map[string]any) GandiEntityBase

var NewDomainAvailabilityEntityFunc func(client *GandiSDK, entopts map[string]any) GandiEntityBase

var NewDomainChangeOwnerEntityFunc func(client *GandiSDK, entopts map[string]any) GandiEntityBase

var NewDomainClaimEntityFunc func(client *GandiSDK, entopts map[string]any) GandiEntityBase

var NewDomainContactEntityFunc func(client *GandiSDK, entopts map[string]any) GandiEntityBase

var NewDomainDnskeyEntityFunc func(client *GandiSDK, entopts map[string]any) GandiEntityBase

var NewDomainDnssecEntityFunc func(client *GandiSDK, entopts map[string]any) GandiEntityBase

var NewDomainHostEntityFunc func(client *GandiSDK, entopts map[string]any) GandiEntityBase

var NewDomainLivednsEntityFunc func(client *GandiSDK, entopts map[string]any) GandiEntityBase

var NewDomainNameserverEntityFunc func(client *GandiSDK, entopts map[string]any) GandiEntityBase

var NewDomainTagEntityFunc func(client *GandiSDK, entopts map[string]any) GandiEntityBase

var NewDomainTransferEntityFunc func(client *GandiSDK, entopts map[string]any) GandiEntityBase

var NewDomainWebredirEntityFunc func(client *GandiSDK, entopts map[string]any) GandiEntityBase

var NewEmailForwardEntityFunc func(client *GandiSDK, entopts map[string]any) GandiEntityBase

var NewEmailMailboxEntityFunc func(client *GandiSDK, entopts map[string]any) GandiEntityBase

var NewEmailMigrationEntityFunc func(client *GandiSDK, entopts map[string]any) GandiEntityBase

var NewEmailOfferEntityFunc func(client *GandiSDK, entopts map[string]any) GandiEntityBase

var NewEmailSlotEntityFunc func(client *GandiSDK, entopts map[string]any) GandiEntityBase

var NewHostingApplicationEntityFunc func(client *GandiSDK, entopts map[string]any) GandiEntityBase

var NewHostingInstanceEntityFunc func(client *GandiSDK, entopts map[string]any) GandiEntityBase

var NewHostingVhostEntityFunc func(client *GandiSDK, entopts map[string]any) GandiEntityBase

var NewIssuedCertificateEntityFunc func(client *GandiSDK, entopts map[string]any) GandiEntityBase

var NewLinkedZoneEntityFunc func(client *GandiSDK, entopts map[string]any) GandiEntityBase

var NewLinkedZoneDeploymentEntityFunc func(client *GandiSDK, entopts map[string]any) GandiEntityBase

var NewLinkedZoneDomainEntityFunc func(client *GandiSDK, entopts map[string]any) GandiEntityBase

var NewLinkedZoneTaskEntityFunc func(client *GandiSDK, entopts map[string]any) GandiEntityBase

var NewLivednsAxfrSlaveEntityFunc func(client *GandiSDK, entopts map[string]any) GandiEntityBase

var NewLivednsAxfrTsigEntityFunc func(client *GandiSDK, entopts map[string]any) GandiEntityBase

var NewLivednsDomainEntityFunc func(client *GandiSDK, entopts map[string]any) GandiEntityBase

var NewLivednsKeyEntityFunc func(client *GandiSDK, entopts map[string]any) GandiEntityBase

var NewLivednsNameserverEntityFunc func(client *GandiSDK, entopts map[string]any) GandiEntityBase

var NewLivednsRecordEntityFunc func(client *GandiSDK, entopts map[string]any) GandiEntityBase

var NewLivednsRrtypeEntityFunc func(client *GandiSDK, entopts map[string]any) GandiEntityBase

var NewLivednsSnapshotEntityFunc func(client *GandiSDK, entopts map[string]any) GandiEntityBase

var NewLivednsTsigKeyEntityFunc func(client *GandiSDK, entopts map[string]any) GandiEntityBase

var NewMailboxEntityFunc func(client *GandiSDK, entopts map[string]any) GandiEntityBase

var NewMailboxDomainEntityFunc func(client *GandiSDK, entopts map[string]any) GandiEntityBase

var NewMailboxForwardEntityFunc func(client *GandiSDK, entopts map[string]any) GandiEntityBase

var NewMailboxProductEntityFunc func(client *GandiSDK, entopts map[string]any) GandiEntityBase

var NewMailboxQuotaEntityFunc func(client *GandiSDK, entopts map[string]any) GandiEntityBase

var NewMailboxSlotEntityFunc func(client *GandiSDK, entopts map[string]any) GandiEntityBase

var NewOrganizationEntityFunc func(client *GandiSDK, entopts map[string]any) GandiEntityBase

var NewOrganizationCustomerEntityFunc func(client *GandiSDK, entopts map[string]any) GandiEntityBase

var NewTemplateEntityFunc func(client *GandiSDK, entopts map[string]any) GandiEntityBase

var NewTemplateDispatchEntityFunc func(client *GandiSDK, entopts map[string]any) GandiEntityBase

var NewTldEntityFunc func(client *GandiSDK, entopts map[string]any) GandiEntityBase

var NewUserEntityFunc func(client *GandiSDK, entopts map[string]any) GandiEntityBase

