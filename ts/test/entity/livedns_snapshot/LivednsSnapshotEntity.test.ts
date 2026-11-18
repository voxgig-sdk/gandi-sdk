

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


describe('LivednsSnapshotEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when GANDI_TEST_LIVE=TRUE.
  afterEach(liveDelay('GANDI_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = GandiSDK.test()
    const ent = testsdk.LivednsSnapshot()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = GandiSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.LivednsSnapshot().list({"fqdn":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.GANDI_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'livedns_snapshot.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"automatic":{"a":true,"h":"Automatic","n":"automatic","r":true,"t":"`$BOOLEAN`","key$":"automatic","index$":0},"created_at":{"a":true,"h":"Created At","n":"created_at","r":true,"t":"`$STRING`","key$":"created_at","index$":1},"href":{"a":true,"h":"Href","n":"href","r":true,"t":"`$STRING`","key$":"href","index$":2},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":3},"message":{"a":true,"h":"Message","n":"message","r":true,"t":"`$STRING`","key$":"message","index$":4},"name":{"a":true,"h":"Name","n":"name","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$STRING`","key$":"name","index$":5},"zone_data":{"a":true,"h":"Zone Data","n":"zone_data","r":true,"t":"`$ARRAY`","key$":"zone_data","index$":6}},"id":{"field":"id","name":"id"},"name":"livedns_snapshot","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["name"],"co":{"id":"POST /livedns/domains/{fqdn}/snapshots","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"fqdn","or":"fqdn","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/livedns/domains/{fqdn}/snapshots","q":{"exist":["fqdn"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"livedns"},{"lit":"domains"},{"var":"fqdn"},{"lit":"snapshots"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /livedns/domains/{fqdn}/snapshots","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"fqdn","or":"fqdn","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"explode":true,"k":"query","n":"automatic","or":"automatic","r":false,"style":"form","t":"`$BOOLEAN`","index$":0},{"a":true,"ex":1,"explode":true,"k":"query","n":"page","or":"page","r":false,"style":"form","t":"`$INTEGER`","index$":1},{"a":true,"explode":true,"k":"query","n":"per_page","or":"per_page","r":false,"style":"form","t":"`$INTEGER`","index$":2},{"a":true,"ex":"date_created","explode":true,"k":"query","n":"sort_by","or":"sort_by","r":false,"style":"form","t":"`$STRING`","index$":3}]},"k":"http","m":"GET","o":"/livedns/domains/{fqdn}/snapshots","q":{"exist":["fqdn"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"livedns"},{"lit":"domains"},{"var":"fqdn"},{"lit":"snapshots"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /livedns/domains/{fqdn}/snapshots/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"fqdn","or":"fqdn","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/livedns/domains/{fqdn}/snapshots/{id}","q":{"exist":["fqdn","id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"livedns"},{"lit":"domains"},{"var":"fqdn"},{"lit":"snapshots"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /livedns/domains/{fqdn}/snapshots/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"fqdn","or":"fqdn","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"DELETE","o":"/livedns/domains/{fqdn}/snapshots/{id}","q":{"exist":["fqdn","id"]},"r":{},"s":[{"lit":"livedns"},{"lit":"domains"},{"var":"fqdn"},{"lit":"snapshots"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":["name"],"co":{"id":"PATCH /livedns/domains/{fqdn}/snapshots/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"fqdn","or":"fqdn","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"PATCH","o":"/livedns/domains/{fqdn}/snapshots/{id}","q":{"exist":["fqdn","id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"livedns"},{"lit":"domains"},{"var":"fqdn"},{"lit":"snapshots"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[["$.main.kit.entity.domain"]]},"key$":"livedns_snapshot","name__orig":"livedns_snapshot","Name":"LivednsSnapshot","name_":"livedns_snapshot","name-":"livedns-snapshot","NAME":"LIVEDNS_SNAPSHOT","index$":46}, {"active":true,"entity":"livedns_snapshot","key$":"BasicLivednsSnapshotFlow","kind":"basic","name":"BasicLivednsSnapshotFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"livedns_snapshot_ref01"},"m":{"fqdn":"fqdn01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{"fqdn":"fqdn01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"livedns_snapshot_ref01"}}],"index$":1},{"a":true,"d":{"fqdn":"fqdn01"},"i":{"ref":"livedns_snapshot_ref01","srcdatavar":"livedns_snapshot_ref01_data","suffix":"_up0","textfield":"created_at"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-livedns_snapshot_ref01"}}],"v":[],"index$":2},{"a":true,"d":{},"i":{"ref":"livedns_snapshot_ref01","srcdatavar":"livedns_snapshot_ref01_data","suffix":"_dt0"},"m":{"fqdn":"fqdn01","id":"livedns_snapshot01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-livedns_snapshot_ref01"}}],"index$":3,"route":"GET /livedns/domains/{fqdn}/snapshots/{id}","record":{}},{"a":true,"d":{},"i":{"ref":"livedns_snapshot_ref01","suffix":"_rm0"},"m":{"fqdn":"fqdn01","id":"livedns_snapshot01"},"o":"remove","s":[],"v":[],"index$":4},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{"fqdn":"fqdn01"},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"livedns_snapshot_ref01"}}],"index$":5}]}, 'LivednsSnapshot', {"POST /livedns/domains/{fqdn}/snapshots":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"name":{"type":"string","key$":"name"}}}}}},"parameters":[{"name":"fqdn","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"GET /livedns/domains/{fqdn}/snapshots":{"protocol":"http","parameters":[{"name":"fqdn","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"automatic","in":"query","schema":{"type":"boolean"},"index$":1},{"name":"page","in":"query","schema":{"type":"integer","default":1,"minimum":1},"index$":2},{"name":"per_page","in":"query","schema":{"type":"integer","minimum":1},"index$":3},{"name":"sort_by","in":"query","schema":{"type":"string","enum":["date_created","-date_created"],"default":"date_created"},"index$":4}]},"GET /livedns/domains/{fqdn}/snapshots/{id}":{"protocol":"http","parameters":[{"name":"fqdn","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"DELETE /livedns/domains/{fqdn}/snapshots/{id}":{"protocol":"http","parameters":[{"name":"fqdn","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"PATCH /livedns/domains/{fqdn}/snapshots/{id}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"name":{"type":"string","key$":"name"}},"required":["name"]}}}},"parameters":[{"name":"fqdn","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"livedns_snapshot.create.0":"GET-only live run: needs POST /livedns/domains/{fqdn}/snapshots","livedns_snapshot.update.2":"GET-only live run: needs PATCH /livedns/domains/{fqdn}/snapshots/{id}","livedns_snapshot.remove.4":"GET-only live run: needs DELETE /livedns/domains/{fqdn}/snapshots/{id}","livedns_snapshot.list.5":"GET-only live run: checks a removal this run does not make"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const livedns_snapshot_ref01_ent = client.LivednsSnapshot()
    let livedns_snapshot_ref01_data = setup.data.new.livedns_snapshot['livedns_snapshot_ref01']
    livedns_snapshot_ref01_data['fqdn'] = setup.idmap['fqdn01']

    livedns_snapshot_ref01_data = (await livedns_snapshot_ref01_ent.create(livedns_snapshot_ref01_data)).data()
    assert(null != livedns_snapshot_ref01_data.id)


    // LIST
    const livedns_snapshot_ref01_match: any = {}
    livedns_snapshot_ref01_match['fqdn'] = setup.idmap['fqdn01']

    const livedns_snapshot_ref01_list = (await livedns_snapshot_ref01_ent.list(livedns_snapshot_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(livedns_snapshot_ref01_list, { id: livedns_snapshot_ref01_data.id })))


    // UPDATE
    const livedns_snapshot_ref01_data_up0: any = {}
    livedns_snapshot_ref01_data_up0.id = livedns_snapshot_ref01_data.id
    livedns_snapshot_ref01_data_up0['fqdn'] = setup.idmap['fqdn'] ?? setup.idmap['fqdn01']

    const livedns_snapshot_ref01_markdef_up0 = { name: 'created_at', value: 'Mark01-livedns_snapshot_ref01_' + setup.now }
    ;(livedns_snapshot_ref01_data_up0 as any)[livedns_snapshot_ref01_markdef_up0.name] = livedns_snapshot_ref01_markdef_up0.value

    const livedns_snapshot_ref01_resdata_up0 = (await livedns_snapshot_ref01_ent.update(livedns_snapshot_ref01_data_up0)).data()
    assert(livedns_snapshot_ref01_resdata_up0.id === livedns_snapshot_ref01_data_up0.id)

    assert((livedns_snapshot_ref01_resdata_up0 as any)[livedns_snapshot_ref01_markdef_up0.name] === livedns_snapshot_ref01_markdef_up0.value)


    // LOAD
    const livedns_snapshot_ref01_match_dt0: any = {}
    livedns_snapshot_ref01_match_dt0.id = livedns_snapshot_ref01_data.id
    livedns_snapshot_ref01_match_dt0['fqdn'] = setup.idmap['fqdn'] ?? setup.idmap['fqdn01']
    const livedns_snapshot_ref01_data_dt0 = (await livedns_snapshot_ref01_ent.load(livedns_snapshot_ref01_match_dt0)).data()
    assert(livedns_snapshot_ref01_data_dt0.id === livedns_snapshot_ref01_data.id)


    // REMOVE
    const livedns_snapshot_ref01_match_rm0: any = { id: livedns_snapshot_ref01_data.id }
    livedns_snapshot_ref01_match_rm0['fqdn'] = setup.idmap['fqdn'] ?? setup.idmap['fqdn01']
    await livedns_snapshot_ref01_ent.remove(livedns_snapshot_ref01_match_rm0)
  

    // LIST
    const livedns_snapshot_ref01_match_rt0: any = {}
    livedns_snapshot_ref01_match_rt0['fqdn'] = setup.idmap['fqdn01']

    const livedns_snapshot_ref01_list_rt0 = (await livedns_snapshot_ref01_ent.list(livedns_snapshot_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(livedns_snapshot_ref01_list_rt0, { id: livedns_snapshot_ref01_data.id })))


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
      '../../../../.sdk/test/entity/livedns_snapshot/LivednsSnapshotTestData.json')

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
    ['livedns_snapshot01','livedns_snapshot02','livedns_snapshot03','domain01','domain02','domain03','fqdn01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'GANDI_TEST_LIVEDNS_SNAPSHOT_ENTID': idmap,
    'GANDI_TEST_LIVE': 'FALSE',
    'GANDI_TEST_EXPLAIN': 'FALSE',
    'GANDI_APIKEY': '',
  })

  idmap = env['GANDI_TEST_LIVEDNS_SNAPSHOT_ENTID']

  const live = 'TRUE' === env.GANDI_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['GANDI_TEST_LIVEDNS_SNAPSHOT_ENTID']
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
  
