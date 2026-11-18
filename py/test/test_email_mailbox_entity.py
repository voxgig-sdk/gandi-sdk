# EmailMailbox entity test

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


class TestEmailMailboxEntity:

    def test_should_create_instance(self):
        testsdk = GandiSDK.test(None, None)
        ent = testsdk.EmailMailbox(None)
        assert ent is not None

    def test_should_refuse_an_invalid_request(self):
        if "validate" not in (shared_config().get("feature") or {}):
            pytest.skip("feature not present in this SDK: validate")
        client = GandiSDK.test(
            None, {"feature": {"validate": {"active": True}}})
        with pytest.raises(Exception) as err:
            client.EmailMailbox(None).list({"domain": 1}, None)
        assert "validate_failed" == getattr(err.value, "code", None)

    def test_should_run_basic_flow(self):
        setup = _email_mailbox_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create", "list", "update", "load", "remove"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "email_mailbox." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        if setup["live"] and os.environ.get("VOXGIG_GETONLY_GUARD") == "TRUE":
            print("LIVE STEP {\"id\":\"email_mailbox.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /email/mailboxes/{domain}/{email}/renew\"}")
            print("LIVE STEP {\"id\":\"email_mailbox.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PATCH /email/mailboxes/{domain}/{mailbox_id}\"}")
            print("LIVE STEP {\"id\":\"email_mailbox.remove.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /email/mailboxes/{domain}/{mailbox_id}\"}")
            print("LIVE STEP {\"id\":\"email_mailbox.list.5\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}")
            return self._run_get_only_flow(setup)

        if setup["live"]:
            for _live_key in ["domain01"]:
                if setup.get("synthetic_only") or setup["idmap"].get(_live_key) is None:
                    runner.live_miss(LIVE_STRICT, f"Live entity test blocked: needs {_live_key} via GANDI_TEST_EMAIL_MAILBOX_ENTID")
        client = setup["client"]

        if setup["live"]:
            runner.live_pace()
        # CREATE
        email_mailbox_ref01_ent = client.EmailMailbox(None)
        email_mailbox_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.email_mailbox"), "email_mailbox_ref01"))
        email_mailbox_ref01_data["domain"] = setup["idmap"]["domain01"]

        email_mailbox_ref01_data = helpers.to_map(runner.entity_data(email_mailbox_ref01_ent.create(email_mailbox_ref01_data, None)))
        assert email_mailbox_ref01_data is not None
        assert email_mailbox_ref01_data["id"] is not None

        if setup["live"]:
            runner.live_pace()
        # LIST
        email_mailbox_ref01_match = {
            "domain": setup["idmap"]["domain01"],
        }

        email_mailbox_ref01_list_result = email_mailbox_ref01_ent.list(email_mailbox_ref01_match, None)
        assert isinstance(email_mailbox_ref01_list_result, list)

        found_item = vs.select(
            runner.entity_list_to_data(email_mailbox_ref01_list_result),
            {"id": email_mailbox_ref01_data["id"]})
        assert not vs.isempty(found_item)

        if setup["live"]:
            runner.live_pace()
        # UPDATE
        email_mailbox_ref01_data_up0_up = {
            "id": email_mailbox_ref01_data["id"],
            "domain": setup["idmap"]["domain"],
        }

        email_mailbox_ref01_markdef_up0_name = "address"
        email_mailbox_ref01_markdef_up0_value = "Mark01-email_mailbox_ref01_" + str(setup["now"])
        email_mailbox_ref01_data_up0_up[email_mailbox_ref01_markdef_up0_name] = email_mailbox_ref01_markdef_up0_value

        email_mailbox_ref01_resdata_up0 = helpers.to_map(runner.entity_data(email_mailbox_ref01_ent.update(email_mailbox_ref01_data_up0_up, None)))
        assert email_mailbox_ref01_resdata_up0 is not None
        assert runner.live_same_id(email_mailbox_ref01_resdata_up0.get("id"), email_mailbox_ref01_data_up0_up["id"])
        assert email_mailbox_ref01_resdata_up0[email_mailbox_ref01_markdef_up0_name] == email_mailbox_ref01_markdef_up0_value

        if setup["live"]:
            runner.live_pace()
        # LOAD
        email_mailbox_ref01_match_dt0 = {
            "id": email_mailbox_ref01_data["id"],
        }
        email_mailbox_ref01_match_dt0["domain"] = email_mailbox_ref01_data.get("domain") if isinstance(email_mailbox_ref01_data.get("domain"), (str, int, float)) else setup["idmap"].get("domain") or setup["idmap"].get("domain01")
        email_mailbox_ref01_data_dt0_loaded = email_mailbox_ref01_ent.load(email_mailbox_ref01_match_dt0, None)
        email_mailbox_ref01_data_dt0_load_result = helpers.to_map(runner.entity_data(email_mailbox_ref01_data_dt0_loaded))
        assert email_mailbox_ref01_data_dt0_load_result is not None
        assert runner.live_same_id(email_mailbox_ref01_data_dt0_load_result.get("id"), email_mailbox_ref01_data["id"])

        if setup["live"]:
            runner.live_pace()
        # REMOVE
        email_mailbox_ref01_match_rm0 = {
            "id": email_mailbox_ref01_data["id"],
        }
        email_mailbox_ref01_match_rm0["domain"] = setup["idmap"].get("domain") or setup["idmap"].get("domain01")
        email_mailbox_ref01_ent.remove(email_mailbox_ref01_match_rm0, None)

        if setup["live"]:
            runner.live_pace()
        # LIST
        email_mailbox_ref01_match_rt0 = {
            "domain": setup["idmap"]["domain01"],
        }

        email_mailbox_ref01_list_rt0_result = email_mailbox_ref01_ent.list(email_mailbox_ref01_match_rt0, None)
        assert isinstance(email_mailbox_ref01_list_rt0_result, list)

        not_found_item = vs.select(
            runner.entity_list_to_data(email_mailbox_ref01_list_rt0_result),
            {"id": email_mailbox_ref01_data["id"]})
        assert vs.isempty(not_found_item)


    def _run_get_only_flow(self, setup):
        if setup["live"]:
            for _live_key in ["domain01"]:
                if setup.get("synthetic_only") or setup["idmap"].get(_live_key) is None:
                    runner.live_miss(LIVE_STRICT, f"Live entity test blocked: needs {_live_key} via GANDI_TEST_EMAIL_MAILBOX_ENTID")
        client = setup["client"]
        if setup["live"]:
            _live_id = None if setup.get("synthetic_only") else setup["idmap"].get("email_mailbox01")
            runner.live_pace()
            runner.live_existing(setup, LIVE_STRICT, "email_mailbox",
                                 lambda: client.EmailMailbox(None).list({"domain": setup["idmap"].get("domain01")}, None),
                                 "id", _live_id)

        # Bootstrap entity data from existing test data.
        email_mailbox_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.email_mailbox")))
        email_mailbox_ref01_data = None
        if len(email_mailbox_ref01_data_raw) > 0:
            email_mailbox_ref01_data = helpers.to_map(email_mailbox_ref01_data_raw[0][1])

        if setup["live"]:
            runner.live_pace()
        # LIST
        email_mailbox_ref01_ent = client.EmailMailbox(None)
        email_mailbox_ref01_match = {
            "domain": setup["idmap"]["domain01"],
        }

        email_mailbox_ref01_list_result = email_mailbox_ref01_ent.list(email_mailbox_ref01_match, None)
        assert isinstance(email_mailbox_ref01_list_result, list)

        if setup["live"]:
            runner.live_pace()
        # LOAD
        email_mailbox_ref01_match_dt0 = {
            "id": email_mailbox_ref01_data["id"],
        }
        email_mailbox_ref01_match_dt0["domain"] = email_mailbox_ref01_data.get("domain") if isinstance(email_mailbox_ref01_data.get("domain"), (str, int, float)) else setup["idmap"].get("domain") or setup["idmap"].get("domain01")
        email_mailbox_ref01_data_dt0_loaded = email_mailbox_ref01_ent.load(email_mailbox_ref01_match_dt0, None)
        email_mailbox_ref01_data_dt0_load_result = helpers.to_map(runner.entity_data(email_mailbox_ref01_data_dt0_loaded))
        assert email_mailbox_ref01_data_dt0_load_result is not None
        assert runner.live_same_id(email_mailbox_ref01_data_dt0_load_result.get("id"), email_mailbox_ref01_data["id"])



def _email_mailbox_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/email_mailbox/EmailMailboxTestData.json")
    with open(entity_data_file, "r", encoding="utf-8") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = GandiSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["email_mailbox01", "email_mailbox02", "email_mailbox03", "mailbox01", "mailbox02", "mailbox03", "domain01"],
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
        "GANDI_TEST_EMAIL_MAILBOX_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "GANDI_TEST_EMAIL_MAILBOX_ENTID": idmap,
        "GANDI_TEST_LIVE": "FALSE",
        "GANDI_TEST_EXPLAIN": "FALSE",
        "GANDI_APIKEY": "",
    })

    idmap_resolved = helpers.to_map(
        env.get("GANDI_TEST_EMAIL_MAILBOX_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)
    if idmap_resolved.get("domain") is None:
        idmap_resolved["domain"] = idmap_resolved.get("domain01")

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
