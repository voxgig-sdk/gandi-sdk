# Gandi SDK exists test

require "minitest/autorun"
require_relative "../Gandi_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = GandiSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
