

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


describe('LinkedZoneEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when GANDI_TEST_LIVE=TRUE.
  afterEach(liveDelay('GANDI_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = GandiSDK.test()
    const ent = testsdk.LinkedZone()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('linked_zone hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of GandiSDK.test(offline).LinkedZone().stream('list')) { }
    }, /offline/)

    for await (const _item of GandiSDK.test(offline).LinkedZone()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = GandiSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.LinkedZone().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of GandiSDK.test().LinkedZone().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new GandiSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.LinkedZone().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.LinkedZone().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = GandiSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.LinkedZone().list({"page":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.GANDI_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'linked_zone.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":true,"t":"`$STRING`","key$":"created_at","index$":0},"default_records":{"a":true,"h":"Default Records","n":"default_records","op":{"create":{"req":false,"type":"`$BOOLEAN`"},"update":{"req":false,"type":"`$BOOLEAN`"}},"r":true,"t":"`$BOOLEAN`","key$":"default_records","index$":1},"domain_count":{"a":true,"h":"Domain Count","n":"domain_count","r":true,"t":"`$INTEGER`","key$":"domain_count","index$":2},"domains":{"a":true,"h":"Domains","n":"domains","r":false,"t":"`$ARRAY`","key$":"domains","index$":3},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":4},"message":{"a":true,"h":"Message","n":"message","r":true,"t":"`$STRING`","key$":"message","index$":5},"name":{"a":true,"h":"Name","n":"name","op":{"update":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$STRING`","key$":"name","index$":6},"record_list":{"a":true,"h":"Record List","n":"record_list","r":false,"t":"`$ARRAY`","key$":"record_list","index$":7},"record_text":{"a":true,"h":"Record Text","n":"record_text","r":false,"t":"`$STRING`","key$":"record_text","index$":8},"records":{"a":true,"h":"Records","n":"records","r":false,"t":"`$ARRAY`","key$":"records","index$":9},"sharing_space":{"a":true,"h":"Sharing Space","n":"sharing_space","r":true,"t":"`$OBJECT`","key$":"sharing_space","index$":10},"status":{"a":true,"h":"Status","n":"status","r":true,"t":"`$STRING`","key$":"status","index$":11},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":false,"t":"`$STRING`","key$":"updated_at","index$":12}},"id":{"field":"id","name":"id"},"name":"linked_zone","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["default_records","name","record_list","record_text"],"co":{"id":"POST /linkedzone/zones","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/linkedzone/zones","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"linkedzone"},{"lit":"zones"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /linkedzone/zones","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":1,"explode":true,"k":"query","n":"page","or":"page","r":false,"style":"form","t":"`$INTEGER`","index$":0},{"a":true,"explode":true,"k":"query","n":"per_page","or":"per_page","r":false,"style":"form","t":"`$INTEGER`","index$":1},{"a":true,"explode":true,"k":"query","n":"sharing_id","or":"sharing_id","r":false,"style":"form","t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/linkedzone/zones","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"linkedzone"},{"lit":"zones"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /linkedzone/zones/{zone_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"zone_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"explode":true,"k":"query","n":"sharing_id","or":"sharing_id","r":false,"style":"form","t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/linkedzone/zones/{zone_id}","q":{"exist":["id"]},"r":{"param":{"zone_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"linkedzone"},{"lit":"zones"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /linkedzone/zones/{zone_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"zone_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/linkedzone/zones/{zone_id}","q":{"exist":["id"]},"r":{"param":{"zone_id":"id"}},"s":[{"lit":"linkedzone"},{"lit":"zones"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":["default_records","name","record_list","record_text"],"co":{"id":"PATCH /linkedzone/zones/{zone_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"zone_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PATCH","o":"/linkedzone/zones/{zone_id}","q":{"exist":["id"]},"r":{"param":{"zone_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"linkedzone"},{"lit":"zones"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"linked_zone","name__orig":"linked_zone","Name":"LinkedZone","name_":"linked_zone","name-":"linked-zone","NAME":"LINKED_ZONE","index$":35}, {"active":true,"entity":"linked_zone","key$":"BasicLinkedZoneFlow","kind":"basic","name":"BasicLinkedZoneFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"linked_zone_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"linked_zone_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"linked_zone_ref01","srcdatavar":"linked_zone_ref01_data","suffix":"_up0","textfield":"created_at"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-linked_zone_ref01"}}],"v":[],"index$":2},{"a":true,"d":{},"i":{"ref":"linked_zone_ref01","srcdatavar":"linked_zone_ref01_data","suffix":"_dt0"},"m":{"id":"linked_zone01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-linked_zone_ref01"}}],"index$":3,"route":"GET /linkedzone/zones/{zone_id}","record":{}},{"a":true,"d":{},"i":{"ref":"linked_zone_ref01","suffix":"_rm0"},"m":{"id":"linked_zone01"},"o":"remove","s":[],"v":[],"index$":4},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"linked_zone_ref01"}}],"index$":5}]}, 'LinkedZone', {"POST /linkedzone/zones":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"name":{"type":"string","key$":"name"},"default_records":{"type":"boolean","default":false,"key$":"default_records"},"record_list":{"type":"array","items":{"type":"object","properties":{"name":{"type":"string"},"ttl":{"type":"integer","minimum":300,"maximum":2592000},"type":{"type":"string","enum":[]},"values":{"type":"array","items":{}}},"required":["name","ttl","type","values"]},"key$":"record_list"},"record_text":{"type":"string","key$":"record_text"}},"required":["name"]}}}},"parameters":[]},"GET /linkedzone/zones":{"protocol":"http","parameters":[{"name":"page","in":"query","schema":{"type":"integer","default":1,"minimum":1},"index$":0},{"name":"per_page","in":"query","schema":{"type":"integer","minimum":1},"index$":1},{"name":"sharing_id","in":"query","schema":{"type":"string"},"index$":2}]},"GET /linkedzone/zones/{zone_id}":{"protocol":"http","parameters":[{"name":"zone_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"sharing_id","in":"query","schema":{"type":"string"},"index$":1}]},"DELETE /linkedzone/zones/{zone_id}":{"protocol":"http","parameters":[{"name":"zone_id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"PATCH /linkedzone/zones/{zone_id}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"default_records":{"type":"boolean","key$":"default_records"},"name":{"type":"string","key$":"name"},"record_list":{"type":"array","items":{"type":"object","properties":{"name":{"type":"string"},"ttl":{"type":"integer","minimum":300,"maximum":2592000},"type":{"type":"string","enum":[]},"values":{"type":"array","items":{}}},"required":["name","ttl","type","values"]},"key$":"record_list"},"record_text":{"type":"string","key$":"record_text"}}}}}},"parameters":[{"name":"zone_id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"linked_zone.create.0":"GET-only live run: needs POST /linkedzone/zones","linked_zone.update.2":"GET-only live run: needs PATCH /linkedzone/zones/{zone_id}","linked_zone.remove.4":"GET-only live run: needs DELETE /linkedzone/zones/{zone_id}","linked_zone.list.5":"GET-only live run: checks a removal this run does not make"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const linked_zone_ref01_ent = client.LinkedZone()
    let linked_zone_ref01_data = setup.data.new.linked_zone['linked_zone_ref01']

    linked_zone_ref01_data = (await linked_zone_ref01_ent.create(linked_zone_ref01_data)).data()
    assert(null != linked_zone_ref01_data.id)


    // LIST
    const linked_zone_ref01_match: any = {}

    const linked_zone_ref01_list = (await linked_zone_ref01_ent.list(linked_zone_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(linked_zone_ref01_list, { id: linked_zone_ref01_data.id })))


    // UPDATE
    const linked_zone_ref01_data_up0: any = {}
    linked_zone_ref01_data_up0.id = linked_zone_ref01_data.id

    const linked_zone_ref01_markdef_up0 = { name: 'created_at', value: 'Mark01-linked_zone_ref01_' + setup.now }
    ;(linked_zone_ref01_data_up0 as any)[linked_zone_ref01_markdef_up0.name] = linked_zone_ref01_markdef_up0.value

    const linked_zone_ref01_resdata_up0 = (await linked_zone_ref01_ent.update(linked_zone_ref01_data_up0)).data()
    assert(linked_zone_ref01_resdata_up0.id === linked_zone_ref01_data_up0.id)

    assert((linked_zone_ref01_resdata_up0 as any)[linked_zone_ref01_markdef_up0.name] === linked_zone_ref01_markdef_up0.value)


    // LOAD
    const linked_zone_ref01_match_dt0: any = {}
    linked_zone_ref01_match_dt0.id = linked_zone_ref01_data.id
    const linked_zone_ref01_data_dt0 = (await linked_zone_ref01_ent.load(linked_zone_ref01_match_dt0)).data()
    assert(linked_zone_ref01_data_dt0.id === linked_zone_ref01_data.id)


    // REMOVE
    const linked_zone_ref01_match_rm0: any = { id: linked_zone_ref01_data.id }
    await linked_zone_ref01_ent.remove(linked_zone_ref01_match_rm0)
  

    // LIST
    const linked_zone_ref01_match_rt0: any = {}

    const linked_zone_ref01_list_rt0 = (await linked_zone_ref01_ent.list(linked_zone_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(linked_zone_ref01_list_rt0, { id: linked_zone_ref01_data.id })))


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
      '../../../../.sdk/test/entity/linked_zone/LinkedZoneTestData.json')

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
    ['linked_zone01','linked_zone02','linked_zone03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'GANDI_TEST_LINKED_ZONE_ENTID': idmap,
    'GANDI_TEST_LIVE': 'FALSE',
    'GANDI_TEST_EXPLAIN': 'FALSE',
    'GANDI_APIKEY': '',
  })

  idmap = env['GANDI_TEST_LINKED_ZONE_ENTID']

  const live = 'TRUE' === env.GANDI_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['GANDI_TEST_LINKED_ZONE_ENTID']
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
  
