# HostingInstance entity test

import json
import os
import time

import pytest

from gandi_sdk.utility.voxgig_struct import voxgig_struct as vs
from gandi_sdk import GandiSDK
from gandi_sdk.core import helpers
from gandi_sdk.config import shared_config
from gandi_sdk.feature.base_feature import GandiBaseFeature

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class _FailHook(GandiBaseFeature):
    def __init__(self):
        super().__init__()
        self.name = "failhook"
        self.unexpected = 0

    def init(self, ctx, options):
        pass

    def PreSpec(self, ctx):
        raise RuntimeError("hosting_instance hook failed")

    def PreUnexpected(self, ctx):
        self.unexpected += 1



# main.kit.test.live.strict is true (the default is true): a live
# request that fails, or a live test missing an input it needs,
# fails the test.
# An account with no record for a test to read skips it either way.
LIVE_STRICT = True


class TestHostingInstanceEntity:

    def test_should_create_instance(self):
        testsdk = GandiSDK.test(None, None)
        ent = testsdk.HostingInstance(None)
        assert ent is not None

    def test_should_stream(self):
        # Feature #4: the entity stream(action, ...) method runs the op
        # pipeline and yields result items. With the streaming feature active
        # it yields the feature's incremental output; otherwise it falls back
        # to the materialised list so stream always yields.
        seed = {
            "entity": {
                "hosting_instance": {
                    "s1": {"id": "s1"},
                    "s2": {"id": "s2"},
                    "s3": {"id": "s3"},
                }
            }
        }

        # Fallback: streaming inactive -> yields the materialised list items.
        base = GandiSDK.test(seed, None)
        seen = list(base.HostingInstance(None).stream("list", None, None))
        assert len(seen) == 3

        # Inbound: streaming active -> yields each item from the feature.
        from gandi_sdk.config import shared_config
        cfg = shared_config()
        if isinstance(cfg.get("feature"), dict) and "streaming" in cfg["feature"]:
            sdk = GandiSDK.test(
                seed, {"feature": {"streaming": {"active": True}}})
            got = []
            for item in sdk.HostingInstance(None).stream("list", None, None):
                if isinstance(item, list):
                    got.extend(item)
                else:
                    got.append(item)
            assert len(got) == 3

    def test_should_report_a_failed_stream(self):
        offline = {"net": {"offline": True}}
        with pytest.raises(Exception, match="offline"):
            list(GandiSDK.test(offline, None).HostingInstance(None).stream("list", None, None))

        quiet = {"ctrl": {"throw": False}}
        list(GandiSDK.test(offline, None).HostingInstance(None).stream("list", None, quiet))

        if "rbac" in (shared_config().get("feature") or {}):
            denied = GandiSDK.test(
                None, {"feature": {"rbac": {"active": True, "deny": True}}})
            with pytest.raises(Exception) as err:
                list(denied.HostingInstance(None).stream("list", None, None))
            assert "rbac_denied" == getattr(err.value, "code", None)

    def test_should_leave_the_callers_ctrl(self):
        explain = {}
        ctrl = {"explain": explain}
        list(GandiSDK.test(None, None).HostingInstance(None).stream("list", None, {"ctrl": ctrl}))
        assert ["explain"] == list(ctrl.keys())
        assert explain is ctrl["explain"] and 0 < len(explain)

    def test_should_fire_pre_unexpected(self):
        hook = _FailHook()
        client = GandiSDK({"feature": {"test": {"active": True}}, "extend": [hook]})
        with pytest.raises(Exception, match="hook failed"):
            client.HostingInstance(None).list(None, None)
        assert 0 < hook.unexpected

        fired = hook.unexpected
        assert client.HostingInstance(None).list(None, {"throw": False}) is None
        assert fired < hook.unexpected

    def test_should_refuse_an_invalid_request(self):
        if "validate" not in (shared_config().get("feature") or {}):
            pytest.skip("feature not present in this SDK: validate")
        client = GandiSDK.test(
            None, {"feature": {"validate": {"active": True}}})
        with pytest.raises(Exception) as err:
            client.HostingInstance(None).list({"fqdn": 1}, None)
        assert "validate_failed" == getattr(err.value, "code", None)

    def test_should_run_basic_flow(self):
        setup = _hosting_instance_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create", "list", "update", "load", "remove"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "hosting_instance." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        if setup["live"] and os.environ.get("VOXGIG_GETONLY_GUARD") == "TRUE":
            print("LIVE STEP {\"id\":\"hosting_instance.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /simplehosting/instances/{instance_id}/action\"}")
            print("LIVE STEP {\"id\":\"hosting_instance.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PATCH /simplehosting/instances/{instance_id}\"}")
            print("LIVE STEP {\"id\":\"hosting_instance.remove.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /simplehosting/instances/{instance_id}\"}")
            print("LIVE STEP {\"id\":\"hosting_instance.list.5\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}")
            return self._run_get_only_flow(setup)

        client = setup["client"]

        if setup["live"]:
            runner.live_pace()
        # CREATE
        hosting_instance_ref01_ent = client.HostingInstance(None)
        hosting_instance_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.hosting_instance"), "hosting_instance_ref01"))

        hosting_instance_ref01_data = helpers.to_map(runner.entity_data(hosting_instance_ref01_ent.create(hosting_instance_ref01_data, None)))
        assert hosting_instance_ref01_data is not None
        assert hosting_instance_ref01_data["id"] is not None

        if setup["live"]:
            runner.live_pace()
        # LIST
        hosting_instance_ref01_match = {}

        hosting_instance_ref01_list_result = hosting_instance_ref01_ent.list(hosting_instance_ref01_match, None)
        assert isinstance(hosting_instance_ref01_list_result, list)

        found_item = vs.select(
            runner.entity_list_to_data(hosting_instance_ref01_list_result),
            {"id": hosting_instance_ref01_data["id"]})
        assert not vs.isempty(found_item)

        if setup["live"]:
            runner.live_pace()
        # UPDATE
        hosting_instance_ref01_data_up0_up = {
            "id": hosting_instance_ref01_data["id"],
        }

        hosting_instance_ref01_markdef_up0_name = "created_at"
        hosting_instance_ref01_markdef_up0_value = "Mark01-hosting_instance_ref01_" + str(setup["now"])
        hosting_instance_ref01_data_up0_up[hosting_instance_ref01_markdef_up0_name] = hosting_instance_ref01_markdef_up0_value

        hosting_instance_ref01_resdata_up0 = helpers.to_map(runner.entity_data(hosting_instance_ref01_ent.update(hosting_instance_ref01_data_up0_up, None)))
        assert hosting_instance_ref01_resdata_up0 is not None
        assert runner.live_same_id(hosting_instance_ref01_resdata_up0.get("id"), hosting_instance_ref01_data_up0_up["id"])
        assert hosting_instance_ref01_resdata_up0[hosting_instance_ref01_markdef_up0_name] == hosting_instance_ref01_markdef_up0_value

        if setup["live"]:
            runner.live_pace()
        # LOAD
        hosting_instance_ref01_match_dt0 = {
            "id": hosting_instance_ref01_data["id"],
        }
        hosting_instance_ref01_data_dt0_loaded = hosting_instance_ref01_ent.load(hosting_instance_ref01_match_dt0, None)
        hosting_instance_ref01_data_dt0_load_result = helpers.to_map(runner.entity_data(hosting_instance_ref01_data_dt0_loaded))
        assert hosting_instance_ref01_data_dt0_load_result is not None
        assert runner.live_same_id(hosting_instance_ref01_data_dt0_load_result.get("id"), hosting_instance_ref01_data["id"])

        if setup["live"]:
            runner.live_pace()
        # REMOVE
        hosting_instance_ref01_match_rm0 = {
            "id": hosting_instance_ref01_data["id"],
        }
        hosting_instance_ref01_ent.remove(hosting_instance_ref01_match_rm0, None)

        if setup["live"]:
            runner.live_pace()
        # LIST
        hosting_instance_ref01_match_rt0 = {}

        hosting_instance_ref01_list_rt0_result = hosting_instance_ref01_ent.list(hosting_instance_ref01_match_rt0, None)
        assert isinstance(hosting_instance_ref01_list_rt0_result, list)

        not_found_item = vs.select(
            runner.entity_list_to_data(hosting_instance_ref01_list_rt0_result),
            {"id": hosting_instance_ref01_data["id"]})
        assert vs.isempty(not_found_item)


    def _run_get_only_flow(self, setup):
        client = setup["client"]
        if setup["live"]:
            _live_id = None if setup.get("synthetic_only") else setup["idmap"].get("hosting_instance01")
            runner.live_pace()
            runner.live_existing(setup, LIVE_STRICT, "hosting_instance",
                                 lambda: client.HostingInstance(None).list({}, None),
                                 "id", _live_id)

        # Bootstrap entity data from existing test data.
        hosting_instance_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.hosting_instance")))
        hosting_instance_ref01_data = None
        if len(hosting_instance_ref01_data_raw) > 0:
            hosting_instance_ref01_data = helpers.to_map(hosting_instance_ref01_data_raw[0][1])

        if setup["live"]:
            runner.live_pace()
        # LIST
        hosting_instance_ref01_ent = client.HostingInstance(None)
        hosting_instance_ref01_match = {}

        hosting_instance_ref01_list_result = hosting_instance_ref01_ent.list(hosting_instance_ref01_match, None)
        assert isinstance(hosting_instance_ref01_list_result, list)

        if setup["live"]:
            runner.live_pace()
        # LOAD
        hosting_instance_ref01_match_dt0 = {
            "id": hosting_instance_ref01_data["id"],
        }
        hosting_instance_ref01_data_dt0_loaded = hosting_instance_ref01_ent.load(hosting_instance_ref01_match_dt0, None)
        hosting_instance_ref01_data_dt0_load_result = helpers.to_map(runner.entity_data(hosting_instance_ref01_data_dt0_loaded))
        assert hosting_instance_ref01_data_dt0_load_result is not None
        assert runner.live_same_id(hosting_instance_ref01_data_dt0_load_result.get("id"), hosting_instance_ref01_data["id"])



def _hosting_instance_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/hosting_instance/HostingInstanceTestData.json")
    with open(entity_data_file, "r", encoding="utf-8") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = GandiSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["hosting_instance01", "hosting_instance02", "hosting_instance03"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Whether *_ENTID supplied the idmap, read before env_override consumes
    # it: without it, the ids a live flow binds are the fixture's synthetic ones.
    _entid_env_raw = os.environ.get(
        "GANDI_TEST_HOSTING_INSTANCE_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "GANDI_TEST_HOSTING_INSTANCE_ENTID": idmap,
        "GANDI_TEST_LIVE": "FALSE",
        "GANDI_TEST_EXPLAIN": "FALSE",
        "GANDI_APIKEY": "",
    })

    idmap_resolved = helpers.to_map(
        env.get("GANDI_TEST_HOSTING_INSTANCE_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("GANDI_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            # FIRST, so the generated fields below win: sdk-test-control.json's
            # test.client.options adds to the live client, it does not
            # redirect it.
            runner.live_client_options(),
            {
                "apikey": env.get("GANDI_APIKEY"),
            },
            extra or {},
        ])
        client = GandiSDK(helpers.to_map(merged_opts))

    _live = env.get("GANDI_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("GANDI_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
