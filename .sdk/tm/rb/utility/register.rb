# Gandi SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

GandiUtility.registrar = ->(u) {
  u.clean = GandiUtilities::Clean
  u.clean_add = GandiUtilities::CleanAdd
  u.clean_explain = GandiUtilities::CleanExplain
  u.done = GandiUtilities::Done
  u.make_error = GandiUtilities::MakeError
  u.feature_add = GandiUtilities::FeatureAdd
  u.feature_hook = GandiUtilities::FeatureHook
  u.feature_init = GandiUtilities::FeatureInit
  u.fetcher = GandiUtilities::Fetcher
  u.make_fetch_def = GandiUtilities::MakeFetchDef
  u.make_context = GandiUtilities::MakeContext
  u.make_options = GandiUtilities::MakeOptions
  u.make_request = GandiUtilities::MakeRequest
  u.make_response = GandiUtilities::MakeResponse
  u.make_result = GandiUtilities::MakeResult
  u.make_point = GandiUtilities::MakePoint
  u.make_spec = GandiUtilities::MakeSpec
  u.make_url = GandiUtilities::MakeUrl
  u.param = GandiUtilities::Param
  u.prepare_auth = GandiUtilities::PrepareAuth
  u.prepare_body = GandiUtilities::PrepareBody
  u.prepare_headers = GandiUtilities::PrepareHeaders
  u.prepare_method = GandiUtilities::PrepareMethod
  u.prepare_params = GandiUtilities::PrepareParams
  u.prepare_path = GandiUtilities::PreparePath
  u.prepare_query = GandiUtilities::PrepareQuery
  u.graphql_body = GandiUtilities::GraphqlBody
  u.graphql_errors = GandiUtilities::GraphqlErrors
  u.result_basic = GandiUtilities::ResultBasic
  u.result_body = GandiUtilities::ResultBody
  u.result_headers = GandiUtilities::ResultHeaders
  u.transform_request = GandiUtilities::TransformRequest
  u.transform_response = GandiUtilities::TransformResponse
}
