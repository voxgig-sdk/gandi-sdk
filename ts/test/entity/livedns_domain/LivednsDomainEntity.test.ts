

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


describe('LivednsDomainEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when GANDI_TEST_LIVE=TRUE.
  afterEach(liveDelay('GANDI_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = GandiSDK.test()
    const ent = testsdk.LivednsDomain()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('livedns_domain hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of GandiSDK.test(offline).LivednsDomain().stream('list')) { }
    }, /offline/)

    for await (const _item of GandiSDK.test(offline).LivednsDomain()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = GandiSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.LivednsDomain().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of GandiSDK.test().LivednsDomain().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new GandiSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.LivednsDomain().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.LivednsDomain().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = GandiSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.LivednsDomain().list({"page":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.GANDI_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'livedns_domain.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"automatic_snapshots":{"a":true,"h":"Automatic Snapshots","n":"automatic_snapshots","op":{"update":{"req":false,"type":"`$BOOLEAN`"}},"r":true,"t":"`$BOOLEAN`","key$":"automatic_snapshots","index$":0},"domain_href":{"a":true,"h":"Domain Href","n":"domain_href","r":true,"t":"`$STRING`","key$":"domain_href","index$":1},"domain_keys_href":{"a":true,"h":"Domain Keys Href","n":"domain_keys_href","r":true,"t":"`$STRING`","key$":"domain_keys_href","index$":2},"domain_records_href":{"a":true,"h":"Domain Records Href","n":"domain_records_href","r":true,"t":"`$STRING`","key$":"domain_records_href","index$":3},"fqdn":{"a":true,"h":"Fqdn","n":"fqdn","r":true,"t":"`$STRING`","key$":"fqdn","index$":4},"message":{"a":true,"h":"Message","n":"message","r":true,"t":"`$STRING`","key$":"message","index$":5},"zone":{"a":true,"h":"Zone","n":"zone","r":false,"t":"`$OBJECT`","key$":"zone","index$":6}},"name":"livedns_domain","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["fqdn","zone"],"co":{"id":"POST /livedns/domains","source":"openapi3","version":2},"g":{"query":[{"a":true,"explode":true,"k":"query","n":"sharing_id","or":"sharing_id","r":false,"style":"form","t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/livedns/domains","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"livedns"},{"lit":"domains"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /livedns/domains","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":1,"explode":true,"k":"query","n":"page","or":"page","r":false,"style":"form","t":"`$INTEGER`","index$":0},{"a":true,"explode":true,"k":"query","n":"per_page","or":"per_page","r":false,"style":"form","t":"`$INTEGER`","index$":1},{"a":true,"explode":true,"k":"query","n":"sharing_id","or":"sharing_id","r":false,"style":"form","t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/livedns/domains","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"livedns"},{"lit":"domains"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /livedns/domains/{fqdn}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"fqdn","or":"fqdn","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/livedns/domains/{fqdn}","q":{"exist":["fqdn"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"livedns"},{"lit":"domains"},{"var":"fqdn"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":["automatic_snapshots"],"co":{"id":"PATCH /livedns/domains/{fqdn}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"fqdn","or":"fqdn","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PATCH","o":"/livedns/domains/{fqdn}","q":{"exist":["fqdn"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"livedns"},{"lit":"domains"},{"var":"fqdn"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[["$.main.kit.entity.domain"]]},"key$":"livedns_domain","name__orig":"livedns_domain","Name":"LivednsDomain","name_":"livedns_domain","name-":"livedns-domain","NAME":"LIVEDNS_DOMAIN","index$":41}, {"active":true,"entity":"livedns_domain","key$":"BasicLivednsDomainFlow","kind":"basic","name":"BasicLivednsDomainFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"livedns_domain_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"livedns_domain_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"livedns_domain_ref01","srcdatavar":"livedns_domain_ref01_data","suffix":"_up0","textfield":"domain_href"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-livedns_domain_ref01"}}],"v":[],"index$":2},{"a":true,"d":{},"i":{"ref":"livedns_domain_ref01","srcdatavar":"livedns_domain_ref01_data","suffix":"_dt0"},"m":{"id":"livedns_domain01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-livedns_domain_ref01"}}],"index$":3}]}, 'LivednsDomain', {"POST /livedns/domains":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"fqdn":{"type":"string","key$":"fqdn"},"zone":{"type":"object","properties":{"items":{"type":"array","items":{"type":"object","properties":{},"required":[]}},"ttl":{"type":"integer","minimum":300,"maximum":2592000}},"key$":"zone"}},"required":["fqdn"]}}}},"parameters":[{"name":"sharing_id","in":"query","schema":{"type":"string"},"index$":0}]},"GET /livedns/domains":{"protocol":"http","parameters":[{"name":"page","in":"query","schema":{"type":"integer","default":1,"minimum":1},"index$":0},{"name":"per_page","in":"query","schema":{"type":"integer","minimum":1},"index$":1},{"name":"sharing_id","in":"query","schema":{"type":"string"},"index$":2}]},"GET /livedns/domains/{fqdn}":{"protocol":"http","parameters":[{"name":"fqdn","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"PATCH /livedns/domains/{fqdn}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"automatic_snapshots":{"type":"boolean","key$":"automatic_snapshots"}}}}}},"parameters":[{"name":"fqdn","in":"path","required":true,"schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"livedns_domain.create.0":"GET-only live run: needs POST /livedns/domains","livedns_domain.update.2":"GET-only live run: needs PATCH /livedns/domains/{fqdn}"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const livedns_domain_ref01_ent = client.LivednsDomain()
    let livedns_domain_ref01_data = setup.data.new.livedns_domain['livedns_domain_ref01']

    livedns_domain_ref01_data = (await livedns_domain_ref01_ent.create(livedns_domain_ref01_data)).data()
    assert(null != livedns_domain_ref01_data)


    // LIST
    const livedns_domain_ref01_match: any = {}

    const livedns_domain_ref01_list = (await livedns_domain_ref01_ent.list(livedns_domain_ref01_match)).map((e: any) => e.data())


    // UPDATE
    const livedns_domain_ref01_data_up0: any = {}

    const livedns_domain_ref01_markdef_up0 = { name: 'domain_href', value: 'Mark01-livedns_domain_ref01_' + setup.now }
    ;(livedns_domain_ref01_data_up0 as any)[livedns_domain_ref01_markdef_up0.name] = livedns_domain_ref01_markdef_up0.value

    const livedns_domain_ref01_resdata_up0 = (await livedns_domain_ref01_ent.update(livedns_domain_ref01_data_up0)).data()
    assert(null != livedns_domain_ref01_resdata_up0)

    assert((livedns_domain_ref01_resdata_up0 as any)[livedns_domain_ref01_markdef_up0.name] === livedns_domain_ref01_markdef_up0.value)



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
      '../../../../.sdk/test/entity/livedns_domain/LivednsDomainTestData.json')

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
    ['livedns_domain01','livedns_domain02','livedns_domain03','domain01','domain02','domain03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'GANDI_TEST_LIVEDNS_DOMAIN_ENTID': idmap,
    'GANDI_TEST_LIVE': 'FALSE',
    'GANDI_TEST_EXPLAIN': 'FALSE',
    'GANDI_APIKEY': '',
  })

  idmap = env['GANDI_TEST_LIVEDNS_DOMAIN_ENTID']

  const live = 'TRUE' === env.GANDI_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['GANDI_TEST_LIVEDNS_DOMAIN_ENTID']
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
  
