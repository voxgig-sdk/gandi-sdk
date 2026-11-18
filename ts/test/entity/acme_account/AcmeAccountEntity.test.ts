

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


describe('AcmeAccountEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when GANDI_TEST_LIVE=TRUE.
  afterEach(liveDelay('GANDI_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = GandiSDK.test()
    const ent = testsdk.AcmeAccount()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = GandiSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.AcmeAccount().list({"subscription_id":1,"sharing_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.GANDI_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'acme_account.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"created_at":{"a":true,"h":"Created At","n":"created_at","r":true,"t":"`$STRING`","key$":"created_at","index$":0},"deleted_at":{"a":true,"h":"Deleted At","n":"deleted_at","r":true,"t":"`$STRING`","key$":"deleted_at","index$":1},"external_id":{"a":true,"h":"External Id","n":"external_id","r":true,"t":"`$STRING`","key$":"external_id","index$":2},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":3},"ip":{"a":true,"h":"Ip","n":"ip","r":true,"t":"`$STRING`","key$":"ip","index$":4},"last_activity":{"a":true,"h":"Last Activity","n":"last_activity","r":true,"t":"`$STRING`","key$":"last_activity","index$":5},"status":{"a":true,"h":"Status","n":"status","r":true,"t":"`$STRING`","key$":"status","index$":6},"subscription_id":{"a":true,"h":"Subscription Id","n":"subscription_id","r":true,"t":"`$STRING`","key$":"subscription_id","index$":7}},"id":{"field":"id","name":"id"},"name":"acme_account","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /acme/subscriptions/{subscription_id}/accounts","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"subscription_id","or":"subscription_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"explode":true,"k":"query","n":"sharing_id","or":"sharing_id","r":true,"style":"form","t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/acme/subscriptions/{subscription_id}/accounts","q":{"exist":["sharing_id","subscription_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"acme"},{"lit":"subscriptions"},{"var":"subscription_id"},{"lit":"accounts"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /acme/subscriptions/{subscription_id}/accounts/{account_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"account_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"subscription_id","or":"subscription_id","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"explode":true,"k":"query","n":"sharing_id","or":"sharing_id","r":true,"style":"form","t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/acme/subscriptions/{subscription_id}/accounts/{account_id}","q":{"exist":["id","sharing_id","subscription_id"]},"r":{"param":{"account_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"acme"},{"lit":"subscriptions"},{"var":"subscription_id"},{"lit":"accounts"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"acme_account","name__orig":"acme_account","Name":"AcmeAccount","name_":"acme_account","name-":"acme-account","NAME":"ACME_ACCOUNT","index$":1}, {"active":true,"entity":"acme_account","key$":"BasicAcmeAccountFlow","kind":"basic","name":"BasicAcmeAccountFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"subscription_id":"subscription01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"acme_account_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"acme_account_ref01","srcdatavar":"acme_account_ref01_data","suffix":"_dt0"},"m":{"id":"acme_account01","subscription_id":"subscription01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-acme_account_ref01"}}],"index$":1,"route":"GET /acme/subscriptions/{subscription_id}/accounts/{account_id}","record":{"subscription_id":"subscription_id"}}]}, 'AcmeAccount', {"GET /acme/subscriptions/{subscription_id}/accounts":{"protocol":"http","parameters":[{"name":"subscription_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"sharing_id","in":"query","required":true,"schema":{"type":"string"},"index$":1}]},"GET /acme/subscriptions/{subscription_id}/accounts/{account_id}":{"protocol":"http","parameters":[{"name":"subscription_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"account_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"sharing_id","in":"query","required":true,"schema":{"type":"string"},"index$":2}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let acme_account_ref01_data = Object.values(setup.data.existing.acme_account)[0] as any

    // LIST
    const acme_account_ref01_ent = client.AcmeAccount()
    const acme_account_ref01_match: any = {}
    acme_account_ref01_match['subscription_id'] = setup.idmap['subscription01']

    const acme_account_ref01_list = (await acme_account_ref01_ent.list(acme_account_ref01_match)).map((e: any) => e.data())


    // LOAD
    const acme_account_ref01_match_dt0: any = {}
    acme_account_ref01_match_dt0.id = acme_account_ref01_data.id
    acme_account_ref01_match_dt0['subscription_id'] = ['string', 'number', 'boolean'].includes(typeof acme_account_ref01_data['subscription_id']) ?
      acme_account_ref01_data['subscription_id'] : setup.idmap['subscription_id'] ?? setup.idmap['subscription01']
    const acme_account_ref01_data_dt0 = (await acme_account_ref01_ent.load(acme_account_ref01_match_dt0)).data()
    assert(acme_account_ref01_data_dt0.id === acme_account_ref01_data.id)


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
      '../../../../.sdk/test/entity/acme_account/AcmeAccountTestData.json')

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
    ['acme_account01','acme_account02','acme_account03','subscription01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'GANDI_TEST_ACME_ACCOUNT_ENTID': idmap,
    'GANDI_TEST_LIVE': 'FALSE',
    'GANDI_TEST_EXPLAIN': 'FALSE',
    'GANDI_APIKEY': '',
  })

  idmap = env['GANDI_TEST_ACME_ACCOUNT_ENTID']

  const live = 'TRUE' === env.GANDI_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['GANDI_TEST_ACME_ACCOUNT_ENTID']
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
  
