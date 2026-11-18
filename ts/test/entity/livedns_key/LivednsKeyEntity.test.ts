

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


describe('LivednsKeyEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when GANDI_TEST_LIVE=TRUE.
  afterEach(liveDelay('GANDI_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = GandiSDK.test()
    const ent = testsdk.LivednsKey()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = GandiSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.LivednsKey().list({"fqdn":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.GANDI_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'livedns_key.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"algorithm":{"a":true,"h":"Algorithm","n":"algorithm","r":true,"t":"`$INTEGER`","key$":"algorithm","index$":0},"algorithm_name":{"a":true,"h":"Algorithm Name","n":"algorithm_name","r":true,"t":"`$STRING`","key$":"algorithm_name","index$":1},"deleted":{"a":true,"h":"Deleted","n":"deleted","r":true,"t":"`$BOOLEAN`","key$":"deleted","index$":2},"ds":{"a":true,"h":"Ds","n":"ds","r":true,"t":"`$STRING`","key$":"ds","index$":3},"fingerprint":{"a":true,"h":"Fingerprint","n":"fingerprint","r":true,"t":"`$STRING`","key$":"fingerprint","index$":4},"flags":{"a":true,"h":"Flags","n":"flags","r":true,"t":"`$INTEGER`","key$":"flags","index$":5},"fqdn":{"a":true,"h":"Fqdn","n":"fqdn","r":true,"t":"`$STRING`","key$":"fqdn","index$":6},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":7},"key_href":{"a":true,"h":"Key Href","n":"key_href","r":true,"t":"`$STRING`","key$":"key_href","index$":8},"message":{"a":true,"h":"Message","n":"message","r":true,"t":"`$STRING`","key$":"message","index$":9},"public_key":{"a":true,"h":"Public Key","n":"public_key","r":true,"t":"`$STRING`","key$":"public_key","index$":10},"status":{"a":true,"h":"Status","n":"status","r":true,"t":"`$STRING`","key$":"status","index$":11},"tag":{"a":true,"h":"Tag","n":"tag","r":true,"t":"`$INTEGER`","key$":"tag","index$":12}},"id":{"field":"id","name":"id"},"name":"livedns_key","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["flags"],"co":{"id":"POST /livedns/domains/{fqdn}/keys","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"fqdn","or":"fqdn","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/livedns/domains/{fqdn}/keys","q":{"exist":["fqdn"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"livedns"},{"lit":"domains"},{"var":"fqdn"},{"lit":"keys"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /livedns/domains/{fqdn}/keys","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"fqdn","or":"fqdn","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/livedns/domains/{fqdn}/keys","q":{"exist":["fqdn"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"livedns"},{"lit":"domains"},{"var":"fqdn"},{"lit":"keys"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /livedns/domains/{fqdn}/keys/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"fqdn","or":"fqdn","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/livedns/domains/{fqdn}/keys/{id}","q":{"exist":["fqdn","id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"livedns"},{"lit":"domains"},{"var":"fqdn"},{"lit":"keys"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /livedns/domains/{fqdn}/keys/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"fqdn","or":"fqdn","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"DELETE","o":"/livedns/domains/{fqdn}/keys/{id}","q":{"exist":["fqdn","id"]},"r":{},"s":[{"lit":"livedns"},{"lit":"domains"},{"var":"fqdn"},{"lit":"keys"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":["deleted"],"co":{"id":"PATCH /livedns/domains/{fqdn}/keys/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"fqdn","or":"fqdn","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"PATCH","o":"/livedns/domains/{fqdn}/keys/{id}","q":{"exist":["fqdn","id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"livedns"},{"lit":"domains"},{"var":"fqdn"},{"lit":"keys"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[["$.main.kit.entity.domain"]]},"key$":"livedns_key","name__orig":"livedns_key","Name":"LivednsKey","name_":"livedns_key","name-":"livedns-key","NAME":"LIVEDNS_KEY","index$":42}, {"active":true,"entity":"livedns_key","key$":"BasicLivednsKeyFlow","kind":"basic","name":"BasicLivednsKeyFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"livedns_key_ref01"},"m":{"fqdn":"fqdn01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{"fqdn":"fqdn01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"livedns_key_ref01"}}],"index$":1},{"a":true,"d":{"fqdn":"fqdn01"},"i":{"ref":"livedns_key_ref01","srcdatavar":"livedns_key_ref01_data","suffix":"_up0","textfield":"algorithm_name"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-livedns_key_ref01"}}],"v":[],"index$":2},{"a":true,"d":{},"i":{"ref":"livedns_key_ref01","srcdatavar":"livedns_key_ref01_data","suffix":"_dt0"},"m":{"fqdn":"fqdn01","id":"livedns_key01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-livedns_key_ref01"}}],"index$":3,"route":"GET /livedns/domains/{fqdn}/keys/{id}","record":{"fqdn":"fqdn"}},{"a":true,"d":{},"i":{"ref":"livedns_key_ref01","suffix":"_rm0"},"m":{"fqdn":"fqdn01","id":"livedns_key01"},"o":"remove","s":[],"v":[],"index$":4},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{"fqdn":"fqdn01"},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"livedns_key_ref01"}}],"index$":5}]}, 'LivednsKey', {"POST /livedns/domains/{fqdn}/keys":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"flags":{"type":"integer","enum":[256,257],"key$":"flags"}},"required":["flags"]}}}},"parameters":[{"name":"fqdn","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"GET /livedns/domains/{fqdn}/keys":{"protocol":"http","parameters":[{"name":"fqdn","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"GET /livedns/domains/{fqdn}/keys/{id}":{"protocol":"http","parameters":[{"name":"fqdn","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"DELETE /livedns/domains/{fqdn}/keys/{id}":{"protocol":"http","parameters":[{"name":"fqdn","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"PATCH /livedns/domains/{fqdn}/keys/{id}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"deleted":{"type":"boolean","enum":[false],"key$":"deleted"}},"required":["deleted"]}}}},"parameters":[{"name":"fqdn","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"livedns_key.create.0":"GET-only live run: needs POST /livedns/domains/{fqdn}/keys","livedns_key.update.2":"GET-only live run: needs PATCH /livedns/domains/{fqdn}/keys/{id}","livedns_key.remove.4":"GET-only live run: needs DELETE /livedns/domains/{fqdn}/keys/{id}","livedns_key.list.5":"GET-only live run: checks a removal this run does not make"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const livedns_key_ref01_ent = client.LivednsKey()
    let livedns_key_ref01_data = setup.data.new.livedns_key['livedns_key_ref01']
    livedns_key_ref01_data['fqdn'] = setup.idmap['fqdn01']

    livedns_key_ref01_data = (await livedns_key_ref01_ent.create(livedns_key_ref01_data)).data()
    assert(null != livedns_key_ref01_data.id)


    // LIST
    const livedns_key_ref01_match: any = {}
    livedns_key_ref01_match['fqdn'] = setup.idmap['fqdn01']

    const livedns_key_ref01_list = (await livedns_key_ref01_ent.list(livedns_key_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(livedns_key_ref01_list, { id: livedns_key_ref01_data.id })))


    // UPDATE
    const livedns_key_ref01_data_up0: any = {}
    livedns_key_ref01_data_up0.id = livedns_key_ref01_data.id
    livedns_key_ref01_data_up0['fqdn'] = setup.idmap['fqdn'] ?? setup.idmap['fqdn01']

    const livedns_key_ref01_markdef_up0 = { name: 'algorithm_name', value: 'Mark01-livedns_key_ref01_' + setup.now }
    ;(livedns_key_ref01_data_up0 as any)[livedns_key_ref01_markdef_up0.name] = livedns_key_ref01_markdef_up0.value

    const livedns_key_ref01_resdata_up0 = (await livedns_key_ref01_ent.update(livedns_key_ref01_data_up0)).data()
    assert(livedns_key_ref01_resdata_up0.id === livedns_key_ref01_data_up0.id)

    assert((livedns_key_ref01_resdata_up0 as any)[livedns_key_ref01_markdef_up0.name] === livedns_key_ref01_markdef_up0.value)


    // LOAD
    const livedns_key_ref01_match_dt0: any = {}
    livedns_key_ref01_match_dt0.id = livedns_key_ref01_data.id
    livedns_key_ref01_match_dt0['fqdn'] = ['string', 'number', 'boolean'].includes(typeof livedns_key_ref01_data['fqdn']) ?
      livedns_key_ref01_data['fqdn'] : setup.idmap['fqdn'] ?? setup.idmap['fqdn01']
    const livedns_key_ref01_data_dt0 = (await livedns_key_ref01_ent.load(livedns_key_ref01_match_dt0)).data()
    assert(livedns_key_ref01_data_dt0.id === livedns_key_ref01_data.id)


    // REMOVE
    const livedns_key_ref01_match_rm0: any = { id: livedns_key_ref01_data.id }
    livedns_key_ref01_match_rm0['fqdn'] = setup.idmap['fqdn'] ?? setup.idmap['fqdn01']
    await livedns_key_ref01_ent.remove(livedns_key_ref01_match_rm0)
  

    // LIST
    const livedns_key_ref01_match_rt0: any = {}
    livedns_key_ref01_match_rt0['fqdn'] = setup.idmap['fqdn01']

    const livedns_key_ref01_list_rt0 = (await livedns_key_ref01_ent.list(livedns_key_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(livedns_key_ref01_list_rt0, { id: livedns_key_ref01_data.id })))


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
      '../../../../.sdk/test/entity/livedns_key/LivednsKeyTestData.json')

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
    ['livedns_key01','livedns_key02','livedns_key03','domain01','domain02','domain03','fqdn01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'GANDI_TEST_LIVEDNS_KEY_ENTID': idmap,
    'GANDI_TEST_LIVE': 'FALSE',
    'GANDI_TEST_EXPLAIN': 'FALSE',
    'GANDI_APIKEY': '',
  })

  idmap = env['GANDI_TEST_LIVEDNS_KEY_ENTID']

  const live = 'TRUE' === env.GANDI_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['GANDI_TEST_LIVEDNS_KEY_ENTID']
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
  
