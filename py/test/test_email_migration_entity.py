# EmailMigration entity test

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


class TestEmailMigrationEntity:

    def test_should_create_instance(self):
        testsdk = GandiSDK.test(None, None)
        ent = testsdk.EmailMigration(None)
        assert ent is not None

    def test_should_refuse_an_invalid_request(self):
        if "validate" not in (shared_config().get("feature") or {}):
            pytest.skip("feature not present in this SDK: validate")
        client = GandiSDK.test(
            None, {"feature": {"validate": {"active": True}}})
        with pytest.raises(Exception) as err:
            client.EmailMigration(None).load({"domain": 1}, None)
        assert "validate_failed" == getattr(err.value, "code", None)

    def test_should_run_basic_flow(self):
        setup = _email_migration_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create", "load"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "email_migration." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        if setup["live"] and os.environ.get("VOXGIG_GETONLY_GUARD") == "TRUE":
            print("LIVE STEP {\"id\":\"email_migration.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /email/migration/{domain}\"}")
            return self._run_get_only_flow(setup)

        if setup["live"]:
            for _live_key in ["domain01"]:
                if setup.get("synthetic_only") or setup["idmap"].get(_live_key) is None:
                    runner.live_miss(LIVE_STRICT, f"Live entity test blocked: needs {_live_key} via GANDI_TEST_EMAIL_MIGRATION_ENTID")
        client = setup["client"]

        if setup["live"]:
            runner.live_pace()
        # CREATE
        email_migration_ref01_ent = client.EmailMigration(None)
        email_migration_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.email_migration"), "email_migration_ref01"))
        email_migration_ref01_data["domain"] = setup["idmap"]["domain01"]

        email_migration_ref01_data = helpers.to_map(runner.entity_data(email_migration_ref01_ent.create(email_migration_ref01_data, None)))
        assert email_migration_ref01_data is not None

        if setup["live"]:
            runner.live_pace()
        # LOAD
        email_migration_ref01_match_dt0 = {}
        email_migration_ref01_data_dt0_loaded = email_migration_ref01_ent.load(email_migration_ref01_match_dt0, None)
        assert email_migration_ref01_data_dt0_loaded is not None


    def _run_get_only_flow(self, setup):
        client = setup["client"]

        # Bootstrap entity data from existing test data.
        email_migration_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.email_migration")))
        email_migration_ref01_data = None
        if len(email_migration_ref01_data_raw) > 0:
            email_migration_ref01_data = helpers.to_map(email_migration_ref01_data_raw[0][1])

        if setup["live"]:
            runner.live_pace()
        # LOAD
        email_migration_ref01_ent = client.EmailMigration(None)
        email_migration_ref01_match_dt0 = {}
        email_migration_ref01_data_dt0_loaded = email_migration_ref01_ent.load(email_migration_ref01_match_dt0, None)
        assert email_migration_ref01_data_dt0_loaded is not None



def _email_migration_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/email_migration/EmailMigrationTestData.json")
    with open(entity_data_file, "r", encoding="utf-8") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = GandiSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["email_migration01", "email_migration02", "email_migration03", "domain01"],
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
        "GANDI_TEST_EMAIL_MIGRATION_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "GANDI_TEST_EMAIL_MIGRATION_ENTID": idmap,
        "GANDI_TEST_LIVE": "FALSE",
        "GANDI_TEST_EXPLAIN": "FALSE",
        "GANDI_APIKEY": "",
    })

    idmap_resolved = helpers.to_map(
        env.get("GANDI_TEST_EMAIL_MIGRATION_ENTID"))
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
