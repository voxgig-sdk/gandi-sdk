# Gandi SDK utility: prepare_body
require_relative 'media'
module GandiUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return GandiUtilities.raw_body(ctx.reqdata) if GandiUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
