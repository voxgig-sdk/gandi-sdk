# Gandi SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/debug_feature'
require_relative 'feature/idempotency_feature'
require_relative 'feature/metrics_feature'
require_relative 'feature/paging_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/secrets_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module GandiFeatures
  def self.make_feature(name)
    case name
    when "base"
      GandiBaseFeature.new
    when "debug"
      GandiDebugFeature.new
    when "idempotency"
      GandiIdempotencyFeature.new
    when "metrics"
      GandiMetricsFeature.new
    when "paging"
      GandiPagingFeature.new
    when "ratelimit"
      GandiRatelimitFeature.new
    when "retry"
      GandiRetryFeature.new
    when "secrets"
      GandiSecretsFeature.new
    when "test"
      GandiTestFeature.new
    when "timeout"
      GandiTimeoutFeature.new
    else
      GandiBaseFeature.new
    end
  end
end
