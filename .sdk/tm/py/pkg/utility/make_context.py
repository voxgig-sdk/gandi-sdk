# Gandi SDK utility: make_context

from projectname_sdk.core.context import GandiContext


def make_context_util(ctxmap, basectx):
    return GandiContext(ctxmap, basectx)
