# Gandi SDK utility: make_context
require_relative '../core/context'
module GandiUtilities
  MakeContext = ->(ctxmap, basectx) {
    GandiContext.new(ctxmap, basectx)
  }
end
