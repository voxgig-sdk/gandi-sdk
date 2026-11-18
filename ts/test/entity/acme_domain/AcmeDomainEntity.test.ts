

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


describe('AcmeDomainEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when GANDI_TEST_LIVE=TRUE.
  afterEach(liveDelay('GANDI_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = GandiSDK.test()
    const ent = testsdk.AcmeDomain()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = GandiSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.AcmeDomain().list({"subscription_id":1,"domain":"x","sharing_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.GANDI_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'acme_domain.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"created_at":{"a":true,"h":"Created At","n":"created_at","r":true,"t":"`$STRING`","key$":"created_at","index$":0},"deleted_at":{"a":true,"h":"Deleted At","n":"deleted_at","r":true,"t":"`$STRING`","key$":"deleted_at","index$":1},"hostname":{"a":true,"h":"Hostname","n":"hostname","r":true,"t":"`$STRING`","key$":"hostname","index$":2},"hostname_ulabel":{"a":true,"h":"Hostname Ulabel","n":"hostname_ulabel","r":true,"t":"`$STRING`","key$":"hostname_ulabel","index$":3},"is_wildcard":{"a":true,"h":"Is Wildcard","n":"is_wildcard","r":true,"t":"`$BOOLEAN`","key$":"is_wildcard","index$":4},"status":{"a":true,"h":"Status","n":"status","r":true,"t":"`$STRING`","key$":"status","index$":5},"subscription_id":{"a":true,"h":"Subscription Id","n":"subscription_id","r":true,"t":"`$STRING`","key$":"subscription_id","index$":6}},"name":"acme_domain","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /acme/subscriptions/{subscription_id}/domains","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"subscription_id","or":"subscription_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"explode":true,"k":"query","n":"domain","or":"domain","r":true,"style":"form","t":"`$STRING`","index$":0},{"a":true,"explode":true,"k":"query","n":"sharing_id","or":"sharing_id","r":true,"style":"form","t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/acme/subscriptions/{subscription_id}/domains","q":{"exist":["domain","sharing_id","subscription_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"acme"},{"lit":"subscriptions"},{"var":"subscription_id"},{"lit":"domains"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /acme/subscriptions/{subscription_id}/domains/{domain_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"domain_id","or":"domain_id","r":true,"t":"`$INTEGER`","index$":0},{"a":true,"k":"param","n":"subscription_id","or":"subscription_id","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"explode":true,"k":"query","n":"sharing_id","or":"sharing_id","r":true,"style":"form","t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/acme/subscriptions/{subscription_id}/domains/{domain_id}","q":{"exist":["domain_id","sharing_id","subscription_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"acme"},{"lit":"subscriptions"},{"var":"subscription_id"},{"lit":"domains"},{"var":"domain_id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.domain"]]},"key$":"acme_domain","name__orig":"acme_domain","Name":"AcmeDomain","name_":"acme_domain","name-":"acme-domain","NAME":"ACME_DOMAIN","index$":2}, {"active":true,"entity":"acme_domain","key$":"BasicAcmeDomainFlow","kind":"basic","name":"BasicAcmeDomainFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"subscription_id":"subscription01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"acme_domain_ref01"}}],"index$":0},{"a":false,"d":{},"i":{"ref":"acme_domain_ref01","srcdatavar":"acme_domain_ref01_data","suffix":"_dt0"},"m":{"id":"acme_domain01","subscription_id":"subscription01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-acme_domain_ref01"}}],"unreachable":true}]}, 'AcmeDomain', {"GET /acme/subscriptions/{subscription_id}/domains":{"protocol":"http","parameters":[{"name":"subscription_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"domain","in":"query","required":true,"schema":{"type":"string"},"index$":1},{"name":"sharing_id","in":"query","required":true,"schema":{"type":"string"},"index$":2}]},"GET /acme/subscriptions/{subscription_id}/domains/{domain_id}":{"protocol":"http","parameters":[{"name":"subscription_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"domain_id","in":"path","required":true,"schema":{"type":"integer"},"index$":1},{"name":"sharing_id","in":"query","required":true,"schema":{"type":"string"},"index$":2}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let acme_domain_ref01_data = Object.values(setup.data.existing.acme_domain)[0] as any

    // LIST
    const acme_domain_ref01_ent = client.AcmeDomain()
    const acme_domain_ref01_match: any = {}
    acme_domain_ref01_match['subscription_id'] = setup.idmap['subscription01']

    const acme_domain_ref01_list = (await acme_domain_ref01_ent.list(acme_domain_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/acme_domain/AcmeDomainTestData.json')

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
    ['acme_domain01','acme_domain02','acme_domain03','domain01','domain02','domain03','subscription01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'GANDI_TEST_ACME_DOMAIN_ENTID': idmap,
    'GANDI_TEST_LIVE': 'FALSE',
    'GANDI_TEST_EXPLAIN': 'FALSE',
    'GANDI_APIKEY': '',
  })

  idmap = env['GANDI_TEST_ACME_DOMAIN_ENTID']

  const live = 'TRUE' === env.GANDI_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['GANDI_TEST_ACME_DOMAIN_ENTID']
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
  
