

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


describe('BillingInfoEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when GANDI_TEST_LIVE=TRUE.
  afterEach(liveDelay('GANDI_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = GandiSDK.test()
    const ent = testsdk.BillingInfo()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = GandiSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.BillingInfo().load({"sharing_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.GANDI_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'billing_info.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"annual_balance":{"a":true,"h":"Annual Balance","n":"annual_balance","r":true,"t":"`$NUMBER`","key$":"annual_balance","index$":0},"grid":{"a":true,"h":"Grid","n":"grid","r":true,"t":"`$STRING`","key$":"grid","index$":1},"outstanding_amount":{"a":true,"h":"Outstanding Amount","n":"outstanding_amount","r":true,"t":"`$NUMBER`","key$":"outstanding_amount","index$":2},"prepaid":{"a":true,"h":"Prepaid","n":"prepaid","r":true,"t":"`$OBJECT`","key$":"prepaid","index$":3},"prepaid_monthly_invoice":{"a":true,"h":"Prepaid Monthly Invoice","n":"prepaid_monthly_invoice","r":false,"t":"`$BOOLEAN`","key$":"prepaid_monthly_invoice","index$":4}},"name":"billing_info","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /billing/info/{sharing_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"sharing_id","or":"sharing_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/billing/info/{sharing_id}","q":{"exist":["sharing_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"billing"},{"lit":"info"},{"var":"sharing_id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /billing/info","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/billing/info","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"billing"},{"lit":"info"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"billing_info","name__orig":"billing_info","Name":"BillingInfo","name_":"billing_info","name-":"billing-info","NAME":"BILLING_INFO","index$":5}, {"active":true,"entity":"billing_info","key$":"BasicBillingInfoFlow","kind":"basic","name":"BasicBillingInfoFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"billing_info_ref01","srcdatavar":"billing_info_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-billing_info_ref01"}}],"index$":0}]}, 'BillingInfo', {"GET /billing/info/{sharing_id}":{"protocol":"http","parameters":[{"name":"sharing_id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"GET /billing/info":{"protocol":"http","parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let billing_info_ref01_data = Object.values(setup.data.existing.billing_info)[0] as any

    // LOAD
    const billing_info_ref01_ent = client.BillingInfo()
    const billing_info_ref01_match_dt0: any = {}
    const billing_info_ref01_data_dt0 = (await billing_info_ref01_ent.load(billing_info_ref01_match_dt0)).data()
    assert(null != billing_info_ref01_data_dt0)


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
      '../../../../.sdk/test/entity/billing_info/BillingInfoTestData.json')

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
    ['billing_info01','billing_info02','billing_info03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'GANDI_TEST_BILLING_INFO_ENTID': idmap,
    'GANDI_TEST_LIVE': 'FALSE',
    'GANDI_TEST_EXPLAIN': 'FALSE',
    'GANDI_APIKEY': '',
  })

  idmap = env['GANDI_TEST_BILLING_INFO_ENTID']

  const live = 'TRUE' === env.GANDI_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['GANDI_TEST_BILLING_INFO_ENTID']
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
  
