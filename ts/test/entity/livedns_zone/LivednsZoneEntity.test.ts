

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


describe('LivednsZoneEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when GANDI_TEST_LIVE=TRUE.
  afterEach(liveDelay('GANDI_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = GandiSDK.test()
    const ent = testsdk.LivednsZone()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = GandiSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.LivednsZone().update({"fqdn":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.GANDI_TEST_LIVE
    for (const op of []) {
      if (!live && maybeSkipControl(t, 'entityOp', 'livedns_zone.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"items":{"a":true,"h":"Items","n":"items","r":true,"t":"`$ARRAY`","key$":"items","index$":0},"message":{"a":true,"h":"Message","n":"message","r":true,"t":"`$STRING`","key$":"message","index$":1},"remove_apex_ns":{"a":true,"h":"Remove Apex Ns","n":"remove_apex_ns","r":false,"t":"`$BOOLEAN`","key$":"remove_apex_ns","index$":2}},"name":"livedns_zone","op":{"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /livedns/domains/{fqdn}/records","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"fqdn","or":"fqdn","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/livedns/domains/{fqdn}/records","q":{"exist":["fqdn"]},"r":{},"s":[{"lit":"livedns"},{"lit":"domains"},{"var":"fqdn"},{"lit":"records"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":["items","remove_apex_ns"],"co":{"id":"PUT /livedns/domains/{fqdn}/records","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"fqdn","or":"fqdn","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PUT","o":"/livedns/domains/{fqdn}/records","q":{"exist":["fqdn"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"livedns"},{"lit":"domains"},{"var":"fqdn"},{"lit":"records"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[["$.main.kit.entity.domain"]]},"key$":"livedns_zone","name__orig":"livedns_zone","Name":"LivednsZone","name_":"livedns_zone","name-":"livedns-zone","NAME":"LIVEDNS_ZONE","index$":48}, {"active":true,"entity":"livedns_zone","key$":"BasicLivednsZoneFlow","kind":"basic","name":"BasicLivednsZoneFlow","param":{},"step":[{"a":false,"d":{},"i":{"ref":"livedns_zone_ref01","srcdatavar":"livedns_zone_ref01_data","suffix":"_up0","textfield":"message"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-livedns_zone_ref01"}}],"v":[],"unreachable":true}]}, 'LivednsZone', {"DELETE /livedns/domains/{fqdn}/records":{"protocol":"http","parameters":[{"name":"fqdn","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"PUT /livedns/domains/{fqdn}/records":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"items":{"type":"array","items":{"type":"object","properties":{"rrset_name":{"type":"string"},"rrset_type":{"type":"string","enum":[]},"rrset_values":{"type":"array","items":{}},"rrset_ttl":{"type":"integer","minimum":300,"maximum":2592000}},"required":["rrset_name","rrset_type","rrset_values"]},"key$":"items"},"remove_apex_ns":{"type":"boolean","default":false,"key$":"remove_apex_ns"}},"required":["items"]}}}},"parameters":[{"name":"fqdn","in":"path","required":true,"schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"livedns_zone.update.0":"GET-only live run: needs PUT /livedns/domains/{fqdn}/records"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let livedns_zone_ref01_data = Object.values(setup.data.existing.livedns_zone)[0] as any

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
      '../../../../.sdk/test/entity/livedns_zone/LivednsZoneTestData.json')

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
    ['livedns_zone01','livedns_zone02','livedns_zone03','domain01','domain02','domain03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'GANDI_TEST_LIVEDNS_ZONE_ENTID': idmap,
    'GANDI_TEST_LIVE': 'FALSE',
    'GANDI_TEST_EXPLAIN': 'FALSE',
    'GANDI_APIKEY': '',
  })

  idmap = env['GANDI_TEST_LIVEDNS_ZONE_ENTID']

  const live = 'TRUE' === env.GANDI_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['GANDI_TEST_LIVEDNS_ZONE_ENTID']
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
  
