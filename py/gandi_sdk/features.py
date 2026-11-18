# Gandi SDK feature factory

from gandi_sdk.feature.base_feature import GandiBaseFeature
from gandi_sdk.feature.debug_feature import GandiDebugFeature
from gandi_sdk.feature.idempotency_feature import GandiIdempotencyFeature
from gandi_sdk.feature.metrics_feature import GandiMetricsFeature
from gandi_sdk.feature.paging_feature import GandiPagingFeature
from gandi_sdk.feature.ratelimit_feature import GandiRatelimitFeature
from gandi_sdk.feature.retry_feature import GandiRetryFeature
from gandi_sdk.feature.secrets_feature import GandiSecretsFeature
from gandi_sdk.feature.test_feature import GandiTestFeature
from gandi_sdk.feature.timeout_feature import GandiTimeoutFeature


_FEATURES = {
    "base": lambda: GandiBaseFeature(),
    "debug": lambda: GandiDebugFeature(),
    "idempotency": lambda: GandiIdempotencyFeature(),
    "metrics": lambda: GandiMetricsFeature(),
    "paging": lambda: GandiPagingFeature(),
    "ratelimit": lambda: GandiRatelimitFeature(),
    "retry": lambda: GandiRetryFeature(),
    "secrets": lambda: GandiSecretsFeature(),
    "test": lambda: GandiTestFeature(),
    "timeout": lambda: GandiTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
