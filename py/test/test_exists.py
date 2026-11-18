# Gandi SDK exists test

import pytest
from gandi_sdk import GandiSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = GandiSDK.test(None, None)
        assert testsdk is not None
