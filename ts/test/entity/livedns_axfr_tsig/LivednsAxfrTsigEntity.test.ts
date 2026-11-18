

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


describe('LivednsAxfrTsigEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when GANDI_TEST_LIVE=TRUE.
  afterEach(liveDelay('GANDI_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = GandiSDK.test()
    const ent = testsdk.LivednsAxfrTsig()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = GandiSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.LivednsAxfrTsig().list({"fqdn":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.GANDI_TEST_LIVE
    for (const op of ['list', 'update']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'livedns_axfr_tsig.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"href":{"a":true,"h":"Href","n":"href","r":true,"t":"`$STRING`","key$":"href","index$":0},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":1},"key_name":{"a":true,"h":"Key Name","n":"key_name","r":true,"t":"`$STRING`","key$":"key_name","index$":2},"message":{"a":true,"h":"Message","n":"message","r":true,"t":"`$STRING`","key$":"message","index$":3}},"id":{"field":"id","name":"id"},"name":"livedns_axfr_tsig","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /livedns/domains/{fqdn}/axfr/tsig","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"fqdn","or":"fqdn","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/livedns/domains/{fqdn}/axfr/tsig","q":{"exist":["fqdn"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"livedns"},{"lit":"domains"},{"var":"fqdn"},{"lit":"axfr"},{"lit":"tsig"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /livedns/domains/{fqdn}/axfr/tsig/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"fqdn","or":"fqdn","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"explode":true,"k":"query","n":"sharing_id","or":"sharing_id","r":false,"style":"form","t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/livedns/domains/{fqdn}/axfr/tsig/{id}","q":{"exist":["fqdn","id"]},"r":{},"s":[{"lit":"livedns"},{"lit":"domains"},{"var":"fqdn"},{"lit":"axfr"},{"lit":"tsig"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"co":{"id":"PUT /livedns/domains/{fqdn}/axfr/tsig/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"fqdn","or":"fqdn","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"explode":true,"k":"query","n":"sharing_id","or":"sharing_id","r":false,"style":"form","t":"`$STRING`","index$":0}]},"k":"http","m":"PUT","o":"/livedns/domains/{fqdn}/axfr/tsig/{id}","q":{"exist":["fqdn","id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"livedns"},{"lit":"domains"},{"var":"fqdn"},{"lit":"axfr"},{"lit":"tsig"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[["$.main.kit.entity.domain"]]},"key$":"livedns_axfr_tsig","name__orig":"livedns_axfr_tsig","Name":"LivednsAxfrTsig","name_":"livedns_axfr_tsig","name-":"livedns-axfr-tsig","NAME":"LIVEDNS_AXFR_TSIG","index$":40}, {"active":true,"entity":"livedns_axfr_tsig","key$":"BasicLivednsAxfrTsigFlow","kind":"basic","name":"BasicLivednsAxfrTsigFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"fqdn":"fqdn01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"livedns_axfr_tsig_ref01"}}],"index$":0},{"a":true,"d":{"fqdn":"fqdn01"},"i":{"ref":"livedns_axfr_tsig_ref01","srcdatavar":"livedns_axfr_tsig_ref01_data","suffix":"_up0","textfield":"href"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-livedns_axfr_tsig_ref01"}}],"v":[],"index$":1}]}, 'LivednsAxfrTsig', {"GET /livedns/domains/{fqdn}/axfr/tsig":{"protocol":"http","parameters":[{"name":"fqdn","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"DELETE /livedns/domains/{fqdn}/axfr/tsig/{id}":{"protocol":"http","parameters":[{"name":"fqdn","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"sharing_id","in":"query","schema":{"type":"string"},"index$":2}]},"PUT /livedns/domains/{fqdn}/axfr/tsig/{id}":{"protocol":"http","parameters":[{"name":"fqdn","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"sharing_id","in":"query","schema":{"type":"string"},"index$":2}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"livedns_axfr_tsig.update.1":"GET-only live run: needs PUT /livedns/domains/{fqdn}/axfr/tsig/{id}"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let livedns_axfr_tsig_ref01_data = Object.values(setup.data.existing.livedns_axfr_tsig)[0] as any

    // LIST
    const livedns_axfr_tsig_ref01_ent = client.LivednsAxfrTsig()
    const livedns_axfr_tsig_ref01_match: any = {}
    livedns_axfr_tsig_ref01_match['fqdn'] = setup.idmap['fqdn01']

    const livedns_axfr_tsig_ref01_list = (await livedns_axfr_tsig_ref01_ent.list(livedns_axfr_tsig_ref01_match)).map((e: any) => e.data())


    // UPDATE
    const livedns_axfr_tsig_ref01_data_up0: any = {}
    livedns_axfr_tsig_ref01_data_up0.id = livedns_axfr_tsig_ref01_data.id
    livedns_axfr_tsig_ref01_data_up0['fqdn'] = setup.idmap['fqdn'] ?? setup.idmap['fqdn01']

    const livedns_axfr_tsig_ref01_markdef_up0 = { name: 'href', value: 'Mark01-livedns_axfr_tsig_ref01_' + setup.now }
    ;(livedns_axfr_tsig_ref01_data_up0 as any)[livedns_axfr_tsig_ref01_markdef_up0.name] = livedns_axfr_tsig_ref01_markdef_up0.value

    const livedns_axfr_tsig_ref01_resdata_up0 = (await livedns_axfr_tsig_ref01_ent.update(livedns_axfr_tsig_ref01_data_up0)).data()
    assert(livedns_axfr_tsig_ref01_resdata_up0.id === livedns_axfr_tsig_ref01_data_up0.id)

    assert((livedns_axfr_tsig_ref01_resdata_up0 as any)[livedns_axfr_tsig_ref01_markdef_up0.name] === livedns_axfr_tsig_ref01_markdef_up0.value)


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
      '../../../../.sdk/test/entity/livedns_axfr_tsig/LivednsAxfrTsigTestData.json')

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
    ['livedns_axfr_tsig01','livedns_axfr_tsig02','livedns_axfr_tsig03','domain01','domain02','domain03','fqdn01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'GANDI_TEST_LIVEDNS_AXFR_TSIG_ENTID': idmap,
    'GANDI_TEST_LIVE': 'FALSE',
    'GANDI_TEST_EXPLAIN': 'FALSE',
    'GANDI_APIKEY': '',
  })

  idmap = env['GANDI_TEST_LIVEDNS_AXFR_TSIG_ENTID']

  const live = 'TRUE' === env.GANDI_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['GANDI_TEST_LIVEDNS_AXFR_TSIG_ENTID']
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
  
