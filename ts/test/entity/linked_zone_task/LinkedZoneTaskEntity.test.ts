

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


describe('LinkedZoneTaskEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when GANDI_TEST_LIVE=TRUE.
  afterEach(liveDelay('GANDI_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = GandiSDK.test()
    const ent = testsdk.LinkedZoneTask()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('linked_zone_task hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of GandiSDK.test(offline).LinkedZoneTask().stream('list')) { }
    }, /offline/)

    for await (const _item of GandiSDK.test(offline).LinkedZoneTask()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = GandiSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.LinkedZoneTask().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of GandiSDK.test().LinkedZoneTask().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new GandiSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.LinkedZoneTask().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.LinkedZoneTask().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = GandiSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.LinkedZoneTask().list({"page":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.GANDI_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'linked_zone_task.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":true,"t":"`$STRING`","key$":"created_at","index$":0},"ending_at":{"a":true,"fo":"date-time","h":"Ending At","n":"ending_at","r":false,"t":"`$STRING`","key$":"ending_at","index$":1},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":2},"result":{"a":true,"h":"Result","n":"result","r":true,"t":"`$OBJECT`","key$":"result","index$":3},"status":{"a":true,"h":"Status","n":"status","r":true,"t":"`$STRING`","key$":"status","index$":4},"type":{"a":true,"h":"Type","n":"type","r":true,"t":"`$STRING`","key$":"type","index$":5},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":false,"t":"`$STRING`","key$":"updated_at","index$":6},"zone_id":{"a":true,"h":"Zone Id","n":"zone_id","r":true,"t":"`$STRING`","key$":"zone_id","index$":7}},"id":{"field":"id","name":"id"},"name":"linked_zone_task","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /linkedzone/tasks","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":1,"explode":true,"k":"query","n":"page","or":"page","r":false,"style":"form","t":"`$INTEGER`","index$":0},{"a":true,"explode":true,"k":"query","n":"per_page","or":"per_page","r":false,"style":"form","t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/linkedzone/tasks","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"linkedzone"},{"lit":"tasks"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /linkedzone/tasks/{task_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"task_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/linkedzone/tasks/{task_id}","q":{"exist":["id"]},"r":{"param":{"task_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"linkedzone"},{"lit":"tasks"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"linked_zone_task","name__orig":"linked_zone_task","Name":"LinkedZoneTask","name_":"linked_zone_task","name-":"linked-zone-task","NAME":"LINKED_ZONE_TASK","index$":38}, {"active":true,"entity":"linked_zone_task","key$":"BasicLinkedZoneTaskFlow","kind":"basic","name":"BasicLinkedZoneTaskFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"linked_zone_task_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"linked_zone_task_ref01","srcdatavar":"linked_zone_task_ref01_data","suffix":"_dt0"},"m":{"id":"linked_zone_task01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-linked_zone_task_ref01"}}],"index$":1,"route":"GET /linkedzone/tasks/{task_id}","record":{}}]}, 'LinkedZoneTask', {"GET /linkedzone/tasks":{"protocol":"http","parameters":[{"name":"page","in":"query","schema":{"type":"integer","default":1,"minimum":1},"index$":0},{"name":"per_page","in":"query","schema":{"type":"integer","minimum":1},"index$":1}]},"GET /linkedzone/tasks/{task_id}":{"protocol":"http","parameters":[{"name":"task_id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let linked_zone_task_ref01_data = Object.values(setup.data.existing.linked_zone_task)[0] as any

    // LIST
    const linked_zone_task_ref01_ent = client.LinkedZoneTask()
    const linked_zone_task_ref01_match: any = {}

    const linked_zone_task_ref01_list = (await linked_zone_task_ref01_ent.list(linked_zone_task_ref01_match)).map((e: any) => e.data())


    // LOAD
    const linked_zone_task_ref01_match_dt0: any = {}
    linked_zone_task_ref01_match_dt0.id = linked_zone_task_ref01_data.id
    const linked_zone_task_ref01_data_dt0 = (await linked_zone_task_ref01_ent.load(linked_zone_task_ref01_match_dt0)).data()
    assert(linked_zone_task_ref01_data_dt0.id === linked_zone_task_ref01_data.id)


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
      '../../../../.sdk/test/entity/linked_zone_task/LinkedZoneTaskTestData.json')

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
    ['linked_zone_task01','linked_zone_task02','linked_zone_task03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'GANDI_TEST_LINKED_ZONE_TASK_ENTID': idmap,
    'GANDI_TEST_LIVE': 'FALSE',
    'GANDI_TEST_EXPLAIN': 'FALSE',
    'GANDI_APIKEY': '',
  })

  idmap = env['GANDI_TEST_LINKED_ZONE_TASK_ENTID']

  const live = 'TRUE' === env.GANDI_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['GANDI_TEST_LINKED_ZONE_TASK_ENTID']
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
  
