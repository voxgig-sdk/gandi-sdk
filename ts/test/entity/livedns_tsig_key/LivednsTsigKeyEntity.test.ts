

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


describe('LivednsTsigKeyEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when GANDI_TEST_LIVE=TRUE.
  afterEach(liveDelay('GANDI_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = GandiSDK.test()
    const ent = testsdk.LivednsTsigKey()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('livedns_tsig_key hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of GandiSDK.test(offline).LivednsTsigKey().stream('list')) { }
    }, /offline/)

    for await (const _item of GandiSDK.test(offline).LivednsTsigKey()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = GandiSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.LivednsTsigKey().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of GandiSDK.test().LivednsTsigKey().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new GandiSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.LivednsTsigKey().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.LivednsTsigKey().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = GandiSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.LivednsTsigKey().list({"sharing_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.GANDI_TEST_LIVE
    for (const op of ['create', 'list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'livedns_tsig_key.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"config_samples":{"a":true,"h":"Config Samples","n":"config_samples","r":true,"t":"`$OBJECT`","key$":"config_samples","index$":0},"href":{"a":true,"h":"Href","n":"href","r":true,"t":"`$STRING`","key$":"href","index$":1},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":2},"key_name":{"a":true,"h":"Key Name","n":"key_name","r":true,"t":"`$STRING`","key$":"key_name","index$":3},"secret":{"a":true,"h":"Secret","n":"secret","r":true,"t":"`$STRING`","key$":"secret","index$":4}},"id":{"field":"id","name":"id"},"name":"livedns_tsig_key","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /livedns/axfr/tsig","source":"openapi3","version":2},"g":{"query":[{"a":true,"explode":true,"k":"query","n":"sharing_id","or":"sharing_id","r":false,"style":"form","t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/livedns/axfr/tsig","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"livedns"},{"lit":"axfr"},{"lit":"tsig"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /livedns/axfr/tsig","source":"openapi3","version":2},"g":{"query":[{"a":true,"explode":true,"k":"query","n":"sharing_id","or":"sharing_id","r":false,"style":"form","t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/livedns/axfr/tsig","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"livedns"},{"lit":"axfr"},{"lit":"tsig"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /livedns/axfr/tsig/{id}/config/{software}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"software","or":"software","r":true,"t":"`$STRING`","index$":1,"ex":"bind"}],"query":[{"a":true,"explode":true,"k":"query","n":"sharing_id","or":"sharing_id","r":false,"style":"form","t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/livedns/axfr/tsig/{id}/config/{software}","q":{"$action":"config","exist":["id","software"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"livedns"},{"lit":"axfr"},{"lit":"tsig"},{"var":"id"},{"lit":"config"},{"var":"software"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /livedns/axfr/tsig/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"explode":true,"k":"query","n":"sharing_id","or":"sharing_id","r":false,"style":"form","t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/livedns/axfr/tsig/{id}","q":{"exist":["id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"livedns"},{"lit":"axfr"},{"lit":"tsig"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"livedns_tsig_key","name__orig":"livedns_tsig_key","Name":"LivednsTsigKey","name_":"livedns_tsig_key","name-":"livedns-tsig-key","NAME":"LIVEDNS_TSIG_KEY","index$":47}, {"active":true,"entity":"livedns_tsig_key","key$":"BasicLivednsTsigKeyFlow","kind":"basic","name":"BasicLivednsTsigKeyFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"livedns_tsig_key_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"livedns_tsig_key_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"livedns_tsig_key_ref01","srcdatavar":"livedns_tsig_key_ref01_data","suffix":"_dt0"},"m":{"id":"livedns_tsig_key01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-livedns_tsig_key_ref01"}}],"index$":2,"route":"GET /livedns/axfr/tsig/{id}","record":{}}]}, 'LivednsTsigKey', {"POST /livedns/axfr/tsig":{"protocol":"http","parameters":[{"name":"sharing_id","in":"query","schema":{"type":"string"},"index$":0}]},"GET /livedns/axfr/tsig":{"protocol":"http","parameters":[{"name":"sharing_id","in":"query","schema":{"type":"string"},"index$":0}]},"GET /livedns/axfr/tsig/{id}/config/{software}":{"protocol":"http","parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"software","in":"path","required":true,"schema":{"type":"string","enum":["bind","knot","nsd","powerdns"]},"index$":1},{"name":"sharing_id","in":"query","schema":{"type":"string"},"index$":2}]},"GET /livedns/axfr/tsig/{id}":{"protocol":"http","parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"sharing_id","in":"query","schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"livedns_tsig_key.create.0":"GET-only live run: needs POST /livedns/axfr/tsig"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const livedns_tsig_key_ref01_ent = client.LivednsTsigKey()
    let livedns_tsig_key_ref01_data = setup.data.new.livedns_tsig_key['livedns_tsig_key_ref01']

    livedns_tsig_key_ref01_data = (await livedns_tsig_key_ref01_ent.create(livedns_tsig_key_ref01_data)).data()
    assert(null != livedns_tsig_key_ref01_data.id)


    // LIST
    const livedns_tsig_key_ref01_match: any = {}

    const livedns_tsig_key_ref01_list = (await livedns_tsig_key_ref01_ent.list(livedns_tsig_key_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(livedns_tsig_key_ref01_list, { id: livedns_tsig_key_ref01_data.id })))


    // LOAD
    const livedns_tsig_key_ref01_match_dt0: any = {}
    livedns_tsig_key_ref01_match_dt0.id = livedns_tsig_key_ref01_data.id
    const livedns_tsig_key_ref01_data_dt0 = (await livedns_tsig_key_ref01_ent.load(livedns_tsig_key_ref01_match_dt0)).data()
    assert(livedns_tsig_key_ref01_data_dt0.id === livedns_tsig_key_ref01_data.id)


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
      '../../../../.sdk/test/entity/livedns_tsig_key/LivednsTsigKeyTestData.json')

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
    ['livedns_tsig_key01','livedns_tsig_key02','livedns_tsig_key03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'GANDI_TEST_LIVEDNS_TSIG_KEY_ENTID': idmap,
    'GANDI_TEST_LIVE': 'FALSE',
    'GANDI_TEST_EXPLAIN': 'FALSE',
    'GANDI_APIKEY': '',
  })

  idmap = env['GANDI_TEST_LIVEDNS_TSIG_KEY_ENTID']

  const live = 'TRUE' === env.GANDI_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['GANDI_TEST_LIVEDNS_TSIG_KEY_ENTID']
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
  
