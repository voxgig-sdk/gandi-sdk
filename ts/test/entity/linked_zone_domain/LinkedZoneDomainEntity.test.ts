

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


describe('LinkedZoneDomainEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when GANDI_TEST_LIVE=TRUE.
  afterEach(liveDelay('GANDI_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = GandiSDK.test()
    const ent = testsdk.LinkedZoneDomain()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('linked_zone_domain hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of GandiSDK.test(offline).LinkedZoneDomain().stream('list')) { }
    }, /offline/)

    for await (const _item of GandiSDK.test(offline).LinkedZoneDomain()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = GandiSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.LinkedZoneDomain().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of GandiSDK.test().LinkedZoneDomain().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new GandiSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.LinkedZoneDomain().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.LinkedZoneDomain().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = GandiSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.LinkedZoneDomain().list({"name":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.GANDI_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'linked_zone_domain.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"deployed":{"a":true,"h":"Deployed","n":"deployed","r":true,"t":"`$BOOLEAN`","key$":"deployed","index$":0},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":1},"name":{"a":true,"h":"Name","n":"name","r":true,"t":"`$STRING`","key$":"name","index$":2},"owner":{"a":true,"h":"Owner","n":"owner","r":true,"t":"`$STRING`","key$":"owner","index$":3},"zone":{"a":true,"h":"Zone","n":"zone","r":true,"t":"`$OBJECT`","key$":"zone","index$":4}},"id":{"field":"id","name":"id"},"name":"linked_zone_domain","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /linkedzone/domains","source":"openapi3","version":2},"g":{"query":[{"a":true,"explode":true,"k":"query","n":"name","or":"name","r":false,"style":"form","t":"`$STRING`","index$":0},{"a":true,"ex":1,"explode":true,"k":"query","n":"page","or":"page","r":false,"style":"form","t":"`$INTEGER`","index$":1},{"a":true,"explode":true,"k":"query","n":"per_page","or":"per_page","r":false,"style":"form","t":"`$INTEGER`","index$":2},{"a":true,"explode":true,"k":"query","n":"sharing_id","or":"sharing_id","r":false,"style":"form","t":"`$STRING`","index$":3},{"a":true,"explode":true,"k":"query","n":"zone_id","or":"zone_id","r":false,"style":"form","t":"`$STRING`","index$":4}]},"k":"http","m":"GET","o":"/linkedzone/domains","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"linkedzone"},{"lit":"domains"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /linkedzone/domains/{domain}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"name","or":"domain","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/linkedzone/domains/{domain}","q":{"exist":["name"]},"r":{"param":{"domain":"name"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"linkedzone"},{"lit":"domains"},{"var":"name"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":["domains"],"co":{"id":"PATCH /linkedzone/zones/{zone_id}/link/domains","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"zone_id","or":"zone_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PATCH","o":"/linkedzone/zones/{zone_id}/link/domains","q":{"$action":"link","exist":["zone_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"linkedzone"},{"lit":"zones"},{"var":"zone_id"},{"lit":"link"},{"lit":"domains"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"bf":["domains"],"co":{"id":"PATCH /linkedzone/unlink/domains","source":"openapi3","version":2},"g":{},"k":"http","m":"PATCH","o":"/linkedzone/unlink/domains","q":{"$action":"unlink"},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"linkedzone"},{"lit":"unlink"},{"lit":"domains"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"update"}},"relations":{"ancestors":[["$.main.kit.entity.domain"]]},"key$":"linked_zone_domain","name__orig":"linked_zone_domain","Name":"LinkedZoneDomain","name_":"linked_zone_domain","name-":"linked-zone-domain","NAME":"LINKED_ZONE_DOMAIN","index$":37}, {"active":true,"entity":"linked_zone_domain","key$":"BasicLinkedZoneDomainFlow","kind":"basic","name":"BasicLinkedZoneDomainFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"linked_zone_domain_ref01"}}],"index$":0},{"a":false,"d":{},"i":{"ref":"linked_zone_domain_ref01","srcdatavar":"linked_zone_domain_ref01_data","suffix":"_up0","textfield":"name"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-linked_zone_domain_ref01"}}],"v":[],"unreachable":true},{"a":false,"d":{},"i":{"ref":"linked_zone_domain_ref01","srcdatavar":"linked_zone_domain_ref01_data","suffix":"_dt0"},"m":{"id":"linked_zone_domain01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-linked_zone_domain_ref01"}}],"unreachable":true}]}, 'LinkedZoneDomain', {"GET /linkedzone/domains":{"protocol":"http","parameters":[{"name":"name","in":"query","schema":{"type":"string"},"index$":0},{"name":"page","in":"query","schema":{"type":"integer","default":1,"minimum":1},"index$":1},{"name":"per_page","in":"query","schema":{"type":"integer","minimum":1},"index$":2},{"name":"sharing_id","in":"query","schema":{"type":"string"},"index$":3},{"name":"zone_id","in":"query","schema":{"type":"string"},"index$":4}]},"GET /linkedzone/domains/{domain}":{"protocol":"http","parameters":[{"name":"domain","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"PATCH /linkedzone/zones/{zone_id}/link/domains":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"domains":{"type":"array","items":{"type":"string"}}},"required":["domains"]}}}},"parameters":[{"name":"zone_id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"PATCH /linkedzone/unlink/domains":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"domains":{"type":"array","items":{"type":"string"}}},"required":["domains"]}}}},"parameters":[]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"linked_zone_domain.update.1":"GET-only live run: needs PATCH /linkedzone/zones/{zone_id}/link/domains"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let linked_zone_domain_ref01_data = Object.values(setup.data.existing.linked_zone_domain)[0] as any

    // LIST
    const linked_zone_domain_ref01_ent = client.LinkedZoneDomain()
    const linked_zone_domain_ref01_match: any = {}

    const linked_zone_domain_ref01_list = (await linked_zone_domain_ref01_ent.list(linked_zone_domain_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/linked_zone_domain/LinkedZoneDomainTestData.json')

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
    ['linked_zone_domain01','linked_zone_domain02','linked_zone_domain03','domain01','domain02','domain03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'GANDI_TEST_LINKED_ZONE_DOMAIN_ENTID': idmap,
    'GANDI_TEST_LIVE': 'FALSE',
    'GANDI_TEST_EXPLAIN': 'FALSE',
    'GANDI_APIKEY': '',
  })

  idmap = env['GANDI_TEST_LINKED_ZONE_DOMAIN_ENTID']

  const live = 'TRUE' === env.GANDI_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['GANDI_TEST_LINKED_ZONE_DOMAIN_ENTID']
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
  
