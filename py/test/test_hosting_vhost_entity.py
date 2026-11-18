# HostingVhost entity test

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



# main.kit.test.live.strict is true (the default is true): a live
# request that fails, or a live test missing an input it needs,
# fails the test.
# An account with no record for a test to read skips it either way.
LIVE_STRICT = True


class TestHostingVhostEntity:

    def test_should_create_instance(self):
        testsdk = GandiSDK.test(None, None)
        ent = testsdk.HostingVhost(None)
        assert ent is not None

    def test_should_refuse_an_invalid_request(self):
        if "validate" not in (shared_config().get("feature") or {}):
            pytest.skip("feature not present in this SDK: validate")
        client = GandiSDK.test(
            None, {"feature": {"validate": {"active": True}}})
        with pytest.raises(Exception) as err:
            client.HostingVhost(None).list({"instance_id": 1}, None)
        assert "validate_failed" == getattr(err.value, "code", None)

    def test_should_run_basic_flow(self):
        setup = _hosting_vhost_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create", "list", "update", "load", "remove"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "hosting_vhost." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        if setup["live"] and os.environ.get("VOXGIG_GETONLY_GUARD") == "TRUE":
            print("LIVE STEP {\"id\":\"hosting_vhost.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /simplehosting/instances/{instance_id}/vhosts\"}")
            print("LIVE STEP {\"id\":\"hosting_vhost.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PATCH /simplehosting/instances/{instance_id}/vhosts/{vhost_fqdn}\"}")
            print("LIVE STEP {\"id\":\"hosting_vhost.remove.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /simplehosting/instances/{instance_id}/vhosts/{vhost_fqdn}\"}")
            return self._run_get_only_flow(setup)

        if setup["live"]:
            for _live_key in ["instance01"]:
                if setup.get("synthetic_only") or setup["idmap"].get(_live_key) is None:
                    runner.live_miss(LIVE_STRICT, f"Live entity test blocked: needs {_live_key} via GANDI_TEST_HOSTING_VHOST_ENTID")
        client = setup["client"]

        if setup["live"]:
            runner.live_pace()
        # CREATE
        hosting_vhost_ref01_ent = client.HostingVhost(None)
        hosting_vhost_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.hosting_vhost"), "hosting_vhost_ref01"))
        hosting_vhost_ref01_data["instance_id"] = setup["idmap"]["instance01"]

        hosting_vhost_ref01_data = helpers.to_map(runner.entity_data(hosting_vhost_ref01_ent.create(hosting_vhost_ref01_data, None)))
        assert hosting_vhost_ref01_data is not None

        if setup["live"]:
            runner.live_pace()
        # LIST
        hosting_vhost_ref01_match = {
            "instance_id": setup["idmap"]["instance01"],
        }

        hosting_vhost_ref01_list_result = hosting_vhost_ref01_ent.list(hosting_vhost_ref01_match, None)
        assert isinstance(hosting_vhost_ref01_list_result, list)

        if setup["live"]:
            runner.live_pace()
        # UPDATE
        hosting_vhost_ref01_data_up0_up = {
            "instance_id": setup["idmap"]["instance_id"],
        }

        hosting_vhost_ref01_markdef_up0_name = "created_at"
        hosting_vhost_ref01_markdef_up0_value = "Mark01-hosting_vhost_ref01_" + str(setup["now"])
        hosting_vhost_ref01_data_up0_up[hosting_vhost_ref01_markdef_up0_name] = hosting_vhost_ref01_markdef_up0_value

        hosting_vhost_ref01_resdata_up0 = helpers.to_map(runner.entity_data(hosting_vhost_ref01_ent.update(hosting_vhost_ref01_data_up0_up, None)))
        assert hosting_vhost_ref01_resdata_up0 is not None
        assert hosting_vhost_ref01_resdata_up0[hosting_vhost_ref01_markdef_up0_name] == hosting_vhost_ref01_markdef_up0_value

        if setup["live"]:
            runner.live_pace()
        # LOAD
        hosting_vhost_ref01_match_dt0 = {}
        hosting_vhost_ref01_match_dt0["instance_id"] = setup["idmap"].get("instance_id") or setup["idmap"].get("instance01")
        hosting_vhost_ref01_data_dt0_loaded = hosting_vhost_ref01_ent.load(hosting_vhost_ref01_match_dt0, None)
        assert hosting_vhost_ref01_data_dt0_loaded is not None

        if setup["live"]:
            runner.live_pace()

        if setup["live"]:
            runner.live_pace()
        # LIST
        hosting_vhost_ref01_match_rt0 = {
            "instance_id": setup["idmap"]["instance01"],
        }

        hosting_vhost_ref01_list_rt0_result = hosting_vhost_ref01_ent.list(hosting_vhost_ref01_match_rt0, None)
        assert isinstance(hosting_vhost_ref01_list_rt0_result, list)


    def _run_get_only_flow(self, setup):
        if setup["live"]:
            for _live_key in ["instance01"]:
                if setup.get("synthetic_only") or setup["idmap"].get(_live_key) is None:
                    runner.live_miss(LIVE_STRICT, f"Live entity test blocked: needs {_live_key} via GANDI_TEST_HOSTING_VHOST_ENTID")
        client = setup["client"]

        # Bootstrap entity data from existing test data.
        hosting_vhost_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.hosting_vhost")))
        hosting_vhost_ref01_data = None
        if len(hosting_vhost_ref01_data_raw) > 0:
            hosting_vhost_ref01_data = helpers.to_map(hosting_vhost_ref01_data_raw[0][1])

        if setup["live"]:
            runner.live_pace()
        # LIST
        hosting_vhost_ref01_ent = client.HostingVhost(None)
        hosting_vhost_ref01_match = {
            "instance_id": setup["idmap"]["instance01"],
        }

        hosting_vhost_ref01_list_result = hosting_vhost_ref01_ent.list(hosting_vhost_ref01_match, None)
        assert isinstance(hosting_vhost_ref01_list_result, list)

        if setup["live"]:
            runner.live_pace()
        # LOAD
        hosting_vhost_ref01_match_dt0 = {}
        hosting_vhost_ref01_match_dt0["instance_id"] = setup["idmap"].get("instance_id") or setup["idmap"].get("instance01")
        hosting_vhost_ref01_data_dt0_loaded = hosting_vhost_ref01_ent.load(hosting_vhost_ref01_match_dt0, None)
        assert hosting_vhost_ref01_data_dt0_loaded is not None



def _hosting_vhost_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/hosting_vhost/HostingVhostTestData.json")
    with open(entity_data_file, "r", encoding="utf-8") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = GandiSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["hosting_vhost01", "hosting_vhost02", "hosting_vhost03", "instance01"],
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
        "GANDI_TEST_HOSTING_VHOST_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "GANDI_TEST_HOSTING_VHOST_ENTID": idmap,
        "GANDI_TEST_LIVE": "FALSE",
        "GANDI_TEST_EXPLAIN": "FALSE",
        "GANDI_APIKEY": "",
    })

    idmap_resolved = helpers.to_map(
        env.get("GANDI_TEST_HOSTING_VHOST_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)
    if idmap_resolved.get("instance_id") is None:
        idmap_resolved["instance_id"] = idmap_resolved.get("instance01")

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
