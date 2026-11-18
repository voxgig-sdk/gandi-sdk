

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


describe('AcmePriceEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when GANDI_TEST_LIVE=TRUE.
  afterEach(liveDelay('GANDI_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = GandiSDK.test()
    const ent = testsdk.AcmePrice()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('acme_price hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of GandiSDK.test(offline).AcmePrice().stream('list')) { }
    }, /offline/)

    for await (const _item of GandiSDK.test(offline).AcmePrice()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = GandiSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.AcmePrice().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of GandiSDK.test().AcmePrice().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new GandiSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.AcmePrice().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.AcmePrice().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = GandiSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.AcmePrice().list({"country":1,"currency":"x","duration":"x","grid":"x","process":"x","provider":"x","sharing_id":"x","validation_type":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.GANDI_TEST_LIVE
    for (const op of ['create', 'list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'acme_price.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"country":{"a":true,"h":"Country","n":"country","r":true,"t":"`$STRING`","key$":"country","index$":0},"currency":{"a":true,"h":"Currency","n":"currency","r":true,"t":"`$STRING`","key$":"currency","index$":1},"domains":{"a":true,"h":"Domains","n":"domains","r":true,"t":"`$ARRAY`","key$":"domains","index$":2},"duration":{"a":true,"h":"Duration","n":"duration","r":true,"t":"`$STRING`","key$":"duration","index$":3},"duration_unit":{"a":true,"h":"Duration Unit","n":"duration_unit","r":true,"t":"`$STRING`","key$":"duration_unit","index$":4},"grid":{"a":true,"h":"Grid","n":"grid","r":true,"t":"`$STRING`","key$":"grid","index$":5},"max_duration":{"a":true,"h":"Max Duration","n":"max_duration","r":true,"t":"`$INTEGER`","key$":"max_duration","index$":6},"min_duration":{"a":true,"h":"Min Duration","n":"min_duration","r":true,"t":"`$INTEGER`","key$":"min_duration","index$":7},"price_after_taxes":{"a":true,"h":"Price After Taxes","n":"price_after_taxes","r":true,"t":"`$STRING`","key$":"price_after_taxes","index$":8},"price_before_taxes":{"a":true,"h":"Price Before Taxes","n":"price_before_taxes","r":true,"t":"`$STRING`","key$":"price_before_taxes","index$":9},"process":{"a":true,"h":"Process","n":"process","r":true,"t":"`$STRING`","key$":"process","index$":10},"product":{"a":true,"h":"Product","n":"product","r":true,"t":"`$OBJECT`","key$":"product","index$":11},"provider":{"a":true,"h":"Provider","n":"provider","r":true,"t":"`$STRING`","key$":"provider","index$":12},"tax_rate":{"a":true,"h":"Tax Rate","n":"tax_rate","r":true,"t":"`$STRING`","key$":"tax_rate","index$":13},"taxes":{"a":true,"h":"Taxes","n":"taxes","r":true,"t":"`$ARRAY`","key$":"taxes","index$":14},"validation_type":{"a":true,"h":"Validation Type","n":"validation_type","r":true,"t":"`$STRING`","key$":"validation_type","index$":15}},"name":"acme_price","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["country","currency","domains","duration","grid","process","provider","validation_type"],"co":{"id":"POST /acme/quote","source":"openapi3","version":2},"g":{"query":[{"a":true,"explode":true,"k":"query","n":"sharing_id","or":"sharing_id","r":true,"style":"form","t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/acme/quote","q":{"exist":["sharing_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"acme"},{"lit":"quote"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /acme/catalog","source":"openapi3","version":2},"g":{"query":[{"a":true,"explode":true,"k":"query","n":"country","or":"country","r":true,"style":"form","t":"`$STRING`","index$":0},{"a":true,"explode":true,"k":"query","n":"currency","or":"currency","r":true,"style":"form","t":"`$STRING`","index$":1},{"a":true,"explode":true,"k":"query","n":"duration","or":"duration","r":true,"style":"form","t":"`$STRING`","index$":2},{"a":true,"explode":true,"k":"query","n":"grid","or":"grid","r":true,"style":"form","t":"`$STRING`","index$":3},{"a":true,"explode":true,"k":"query","n":"process","or":"process","r":true,"style":"form","t":"`$STRING`","index$":4},{"a":true,"explode":true,"k":"query","n":"provider","or":"provider","r":true,"style":"form","t":"`$STRING`","index$":5},{"a":true,"explode":true,"k":"query","n":"sharing_id","or":"sharing_id","r":true,"style":"form","t":"`$STRING`","index$":6},{"a":true,"explode":true,"k":"query","n":"validation_type","or":"validation_type","r":true,"style":"form","t":"`$STRING`","index$":7}]},"k":"http","m":"GET","o":"/acme/catalog","q":{"exist":["country","currency","duration","grid","process","provider","sharing_id","validation_type"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"acme"},{"lit":"catalog"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"acme_price","name__orig":"acme_price","Name":"AcmePrice","name_":"acme_price","name-":"acme-price","NAME":"ACME_PRICE","index$":3}, {"active":true,"entity":"acme_price","key$":"BasicAcmePriceFlow","kind":"basic","name":"BasicAcmePriceFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"acme_price_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"acme_price_ref01"}}],"index$":1}]}, 'AcmePrice', {"POST /acme/quote":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"country":{"type":"string","key$":"country"},"currency":{"type":"string","key$":"currency"},"domains":{"type":"array","items":{"type":"string"},"minItems":1,"key$":"domains"},"duration":{"type":"string","key$":"duration"},"grid":{"type":"string","key$":"grid"},"process":{"type":"string","key$":"process"},"provider":{"type":"string","key$":"provider"},"validation_type":{"type":"string","key$":"validation_type"}},"required":["country","currency","domains","duration","grid","process","provider","validation_type"]}}}},"parameters":[{"name":"sharing_id","in":"query","required":true,"schema":{"type":"string"},"index$":0}]},"GET /acme/catalog":{"protocol":"http","parameters":[{"name":"country","in":"query","required":true,"schema":{"type":"string"},"index$":0},{"name":"currency","in":"query","required":true,"schema":{"type":"string"},"index$":1},{"name":"duration","in":"query","required":true,"schema":{"type":"string"},"index$":2},{"name":"grid","in":"query","required":true,"schema":{"type":"string"},"index$":3},{"name":"process","in":"query","required":true,"schema":{"type":"string"},"index$":4},{"name":"provider","in":"query","required":true,"schema":{"type":"string"},"index$":5},{"name":"sharing_id","in":"query","required":true,"schema":{"type":"string"},"index$":6},{"name":"validation_type","in":"query","required":true,"schema":{"type":"string"},"index$":7}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"acme_price.create.0":"GET-only live run: needs POST /acme/quote"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const acme_price_ref01_ent = client.AcmePrice()
    let acme_price_ref01_data = setup.data.new.acme_price['acme_price_ref01']

    acme_price_ref01_data = (await acme_price_ref01_ent.create(acme_price_ref01_data)).data()
    assert(null != acme_price_ref01_data)


    // LIST
    const acme_price_ref01_match: any = {}

    const acme_price_ref01_list = (await acme_price_ref01_ent.list(acme_price_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/acme_price/AcmePriceTestData.json')

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
    ['acme_price01','acme_price02','acme_price03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'GANDI_TEST_ACME_PRICE_ENTID': idmap,
    'GANDI_TEST_LIVE': 'FALSE',
    'GANDI_TEST_EXPLAIN': 'FALSE',
    'GANDI_APIKEY': '',
  })

  idmap = env['GANDI_TEST_ACME_PRICE_ENTID']

  const live = 'TRUE' === env.GANDI_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['GANDI_TEST_ACME_PRICE_ENTID']
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
  
