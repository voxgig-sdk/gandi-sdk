

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


describe('MailboxProductEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when GANDI_TEST_LIVE=TRUE.
  afterEach(liveDelay('GANDI_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = GandiSDK.test()
    const ent = testsdk.MailboxProduct()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('mailbox_product hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of GandiSDK.test(offline).MailboxProduct().stream('list')) { }
    }, /offline/)

    for await (const _item of GandiSDK.test(offline).MailboxProduct()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = GandiSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.MailboxProduct().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of GandiSDK.test().MailboxProduct().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new GandiSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.MailboxProduct().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.MailboxProduct().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = GandiSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.MailboxProduct().list({"sharing_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.GANDI_TEST_LIVE
    for (const op of ['create', 'list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'mailbox_product.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"autorenew":{"a":true,"h":"Autorenew","n":"autorenew","r":false,"t":"`$BOOLEAN`","key$":"autorenew","index$":0},"config":{"a":true,"h":"Config","n":"config","r":true,"t":"`$ARRAY`","key$":"config","index$":1},"config_name":{"a":true,"h":"Config Name","n":"config_name","r":true,"t":"`$STRING`","key$":"config_name","index$":2},"description":{"a":true,"h":"Description","n":"description","r":true,"t":"`$STRING`","key$":"description","index$":3},"duration_month":{"a":true,"h":"Duration Month","n":"duration_month","r":true,"t":"`$INTEGER`","key$":"duration_month","index$":4},"label":{"a":true,"h":"Label","n":"label","r":true,"t":"`$STRING`","key$":"label","index$":5},"message":{"a":true,"h":"Message","n":"message","r":true,"t":"`$STRING`","key$":"message","index$":6},"prices":{"a":true,"h":"Prices","n":"prices","r":true,"t":"`$ARRAY`","key$":"prices","index$":7},"quantity":{"a":true,"h":"Quantity","n":"quantity","r":true,"t":"`$INTEGER`","key$":"quantity","index$":8},"taxes":{"a":true,"h":"Taxes","n":"taxes","r":true,"t":"`$ARRAY`","key$":"taxes","index$":9},"uuid":{"a":true,"h":"Uuid","n":"uuid","r":true,"t":"`$STRING`","key$":"uuid","index$":10}},"name":"mailbox_product","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["autorenew","config_name","duration_month","quantity"],"co":{"id":"POST /mailbox/products","source":"openapi3","version":2},"g":{"query":[{"a":true,"explode":true,"k":"query","n":"sharing_id","or":"sharing_id","r":false,"style":"form","t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/mailbox/products","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"mailbox"},{"lit":"products"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /mailbox/products","source":"openapi3","version":2},"g":{"query":[{"a":true,"explode":true,"k":"query","n":"sharing_id","or":"sharing_id","r":false,"style":"form","t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/mailbox/products","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"mailbox"},{"lit":"products"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"mailbox_product","name__orig":"mailbox_product","Name":"MailboxProduct","name_":"mailbox_product","name-":"mailbox-product","NAME":"MAILBOX_PRODUCT","index$":52}, {"active":true,"entity":"mailbox_product","key$":"BasicMailboxProductFlow","kind":"basic","name":"BasicMailboxProductFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"mailbox_product_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"mailbox_product_ref01"}}],"index$":1}]}, 'MailboxProduct', {"POST /mailbox/products":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"config_name":{"type":"string","enum":["standard","premium"],"key$":"config_name"},"duration_month":{"type":"integer","enum":[1,12],"key$":"duration_month"},"quantity":{"type":"integer","key$":"quantity"},"autorenew":{"type":"boolean","default":false,"key$":"autorenew"}},"required":["config_name","duration_month","quantity"]}}}},"parameters":[{"name":"sharing_id","in":"query","schema":{"type":"string"},"index$":0}]},"GET /mailbox/products":{"protocol":"http","parameters":[{"name":"sharing_id","in":"query","schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"mailbox_product.create.0":"GET-only live run: needs POST /mailbox/products"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const mailbox_product_ref01_ent = client.MailboxProduct()
    let mailbox_product_ref01_data = setup.data.new.mailbox_product['mailbox_product_ref01']

    mailbox_product_ref01_data = (await mailbox_product_ref01_ent.create(mailbox_product_ref01_data)).data()
    assert(null != mailbox_product_ref01_data)


    // LIST
    const mailbox_product_ref01_match: any = {}

    const mailbox_product_ref01_list = (await mailbox_product_ref01_ent.list(mailbox_product_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/mailbox_product/MailboxProductTestData.json')

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
    ['mailbox_product01','mailbox_product02','mailbox_product03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'GANDI_TEST_MAILBOX_PRODUCT_ENTID': idmap,
    'GANDI_TEST_LIVE': 'FALSE',
    'GANDI_TEST_EXPLAIN': 'FALSE',
    'GANDI_APIKEY': '',
  })

  idmap = env['GANDI_TEST_MAILBOX_PRODUCT_ENTID']

  const live = 'TRUE' === env.GANDI_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['GANDI_TEST_MAILBOX_PRODUCT_ENTID']
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
  
