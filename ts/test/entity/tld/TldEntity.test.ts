

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


describe('TldEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when GANDI_TEST_LIVE=TRUE.
  afterEach(liveDelay('GANDI_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = GandiSDK.test()
    const ent = testsdk.Tld()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('tld hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of GandiSDK.test(offline).Tld().stream('list')) { }
    }, /offline/)

    for await (const _item of GandiSDK.test(offline).Tld()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = GandiSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Tld().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of GandiSDK.test().Tld().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new GandiSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Tld().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Tld().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = GandiSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Tld().list({"category":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.GANDI_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'tld.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"authinfo_for_transfer":{"a":true,"h":"Authinfo For Transfer","n":"authinfo_for_transfer","r":true,"t":"`$BOOLEAN`","key$":"authinfo_for_transfer","index$":0},"category":{"a":true,"h":"Category","n":"category","r":true,"t":"`$STRING`","key$":"category","index$":1},"change_owner":{"a":true,"h":"Change Owner","n":"change_owner","r":true,"t":"`$BOOLEAN`","key$":"change_owner","index$":2},"corporate":{"a":true,"h":"Corporate","n":"corporate","r":true,"t":"`$BOOLEAN`","key$":"corporate","index$":3},"ext_trade":{"a":true,"h":"Ext Trade","n":"ext_trade","r":true,"t":"`$BOOLEAN`","key$":"ext_trade","index$":4},"full_tld":{"a":true,"h":"Full Tld","n":"full_tld","r":true,"t":"`$STRING`","key$":"full_tld","index$":5},"href":{"a":true,"h":"Href","n":"href","r":true,"t":"`$STRING`","key$":"href","index$":6},"lock":{"a":true,"h":"Lock","n":"lock","r":true,"t":"`$BOOLEAN`","key$":"lock","index$":7},"name":{"a":true,"h":"Name","n":"name","r":true,"t":"`$STRING`","key$":"name","index$":8}},"name":"tld","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /domain/tlds","source":"openapi3","version":2},"g":{"query":[{"a":true,"explode":true,"k":"query","n":"category","or":"category","r":false,"style":"form","t":"`$STRING`","index$":0},{"a":true,"ex":1,"explode":true,"k":"query","n":"page","or":"page","r":false,"style":"form","t":"`$INTEGER`","index$":1},{"a":true,"explode":true,"k":"query","n":"per_page","or":"per_page","r":false,"style":"form","t":"`$INTEGER`","index$":2}]},"k":"http","m":"GET","o":"/domain/tlds","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"domain"},{"lit":"tlds"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /domain/tlds/{name}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"name","or":"name","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/domain/tlds/{name}","q":{"exist":["name"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"domain"},{"lit":"tlds"},{"var":"name"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"tld","name__orig":"tld","Name":"Tld","name_":"tld","name-":"tld","NAME":"TLD","index$":59}, {"active":true,"entity":"tld","key$":"BasicTldFlow","kind":"basic","name":"BasicTldFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"tld_ref01"}}],"index$":0},{"a":false,"d":{},"i":{"ref":"tld_ref01","srcdatavar":"tld_ref01_data","suffix":"_dt0"},"m":{"id":"tld01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-tld_ref01"}}],"unreachable":true}]}, 'Tld', {"GET /domain/tlds":{"protocol":"http","parameters":[{"name":"category","in":"query","schema":{"type":"string","enum":["ccTLD","gTLD"]},"index$":0},{"name":"page","in":"query","schema":{"type":"integer","default":1,"minimum":1},"index$":1},{"name":"per_page","in":"query","schema":{"type":"integer","minimum":1},"index$":2}]},"GET /domain/tlds/{name}":{"protocol":"http","parameters":[{"name":"name","in":"path","required":true,"schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let tld_ref01_data = Object.values(setup.data.existing.tld)[0] as any

    // LIST
    const tld_ref01_ent = client.Tld()
    const tld_ref01_match: any = {}

    const tld_ref01_list = (await tld_ref01_ent.list(tld_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/tld/TldTestData.json')

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
    ['tld01','tld02','tld03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'GANDI_TEST_TLD_ENTID': idmap,
    'GANDI_TEST_LIVE': 'FALSE',
    'GANDI_TEST_EXPLAIN': 'FALSE',
    'GANDI_APIKEY': '',
  })

  idmap = env['GANDI_TEST_TLD_ENTID']

  const live = 'TRUE' === env.GANDI_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['GANDI_TEST_TLD_ENTID']
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
  
