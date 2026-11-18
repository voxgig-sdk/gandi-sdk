

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { GandiSDK, BaseFeature, config, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('EmailMigrationEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when GANDI_TEST_LIVE=TRUE.
  afterEach(liveDelay('GANDI_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = GandiSDK.test()
    const ent = testsdk.EmailMigration()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = GandiSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.EmailMigration().load({"domain":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.GANDI_TEST_LIVE
    for (const op of ['create', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'email_migration.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"available":{"a":true,"h":"Available","n":"available","r":true,"t":"`$BOOLEAN`","key$":"available","index$":0},"currency":{"a":true,"h":"Currency","n":"currency","r":true,"t":"`$STRING`","key$":"currency","index$":1},"forward_count":{"a":true,"h":"Forward Count","n":"forward_count","r":true,"t":"`$INTEGER`","key$":"forward_count","index$":2},"free_mailboxes":{"a":true,"h":"Free Mailboxes","n":"free_mailboxes","r":true,"t":"`$INTEGER`","key$":"free_mailboxes","index$":3},"included_mailboxes":{"a":true,"h":"Included Mailboxes","n":"included_mailboxes","r":true,"t":"`$INTEGER`","key$":"included_mailboxes","index$":4},"info":{"a":true,"h":"Info","n":"info","r":true,"t":"`$ARRAY`","key$":"info","index$":5},"message":{"a":true,"h":"Message","n":"message","r":true,"t":"`$STRING`","key$":"message","index$":6},"packmail":{"a":true,"h":"Packmail","n":"packmail","r":true,"t":"`$BOOLEAN`","key$":"packmail","index$":7},"price_v1":{"a":true,"h":"Price V1","n":"price_v1","r":true,"t":"`$NUMBER`","key$":"price_v1","index$":8},"price_v2":{"a":true,"h":"Price V2","n":"price_v2","r":true,"t":"`$NUMBER`","key$":"price_v2","index$":9},"quota_v1":{"a":true,"h":"Quota V1","n":"quota_v1","r":true,"t":"`$NUMBER`","key$":"quota_v1","index$":10},"token":{"a":true,"h":"Token","n":"token","r":true,"t":"`$STRING`","key$":"token","index$":11},"usage_v1":{"a":true,"h":"Usage V1","n":"usage_v1","r":true,"t":"`$NUMBER`","key$":"usage_v1","index$":12}},"name":"email_migration","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["token"],"co":{"id":"POST /email/migration/{domain}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"domain","or":"domain","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"explode":true,"k":"query","n":"sharing_id","or":"sharing_id","r":false,"style":"form","t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/email/migration/{domain}","q":{"exist":["domain"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"email"},{"lit":"migration"},{"var":"domain"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /email/migration/{domain}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"domain","or":"domain","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"explode":true,"k":"query","n":"sharing_id","or":"sharing_id","r":false,"style":"form","t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/email/migration/{domain}","q":{"exist":["domain"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"email"},{"lit":"migration"},{"var":"domain"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"email_migration","name__orig":"email_migration","Name":"EmailMigration","name_":"email_migration","name-":"email-migration","NAME":"EMAIL_MIGRATION","index$":28}, {"active":true,"entity":"email_migration","key$":"BasicEmailMigrationFlow","kind":"basic","name":"BasicEmailMigrationFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"email_migration_ref01"},"m":{"domain":"domain01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{"ref":"email_migration_ref01","srcdatavar":"email_migration_ref01_data","suffix":"_dt0"},"m":{"id":"email_migration01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-email_migration_ref01"}}],"index$":1}]}, 'EmailMigration', {"POST /email/migration/{domain}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"token":{"type":"string","key$":"token"}},"required":["token"]}}}},"parameters":[{"name":"domain","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"sharing_id","in":"query","schema":{"type":"string"},"index$":1}]},"GET /email/migration/{domain}":{"protocol":"http","parameters":[{"name":"domain","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"sharing_id","in":"query","schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"email_migration.create.0":"GET-only live run: needs POST /email/migration/{domain}"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const email_migration_ref01_ent = client.EmailMigration()
    let email_migration_ref01_data = setup.data.new.email_migration['email_migration_ref01']
    email_migration_ref01_data['domain'] = setup.idmap['domain01']

    email_migration_ref01_data = (await email_migration_ref01_ent.create(email_migration_ref01_data)).data()
    assert(null != email_migration_ref01_data)



  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/email_migration/EmailMigrationTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = GandiSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['email_migration01','email_migration02','email_migration03','domain01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'GANDI_TEST_EMAIL_MIGRATION_ENTID': idmap,
    'GANDI_TEST_LIVE': 'FALSE',
    'GANDI_TEST_EXPLAIN': 'FALSE',
    'GANDI_APIKEY': '',
  })

  idmap = env['GANDI_TEST_EMAIL_MIGRATION_ENTID']

  const live = 'TRUE' === env.GANDI_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['GANDI_TEST_EMAIL_MIGRATION_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new GandiSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
        apikey: env.GANDI_APIKEY,
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.GANDI_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
