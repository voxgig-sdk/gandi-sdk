

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


describe('DomainClaimEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when GANDI_TEST_LIVE=TRUE.
  afterEach(liveDelay('GANDI_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = GandiSDK.test()
    const ent = testsdk.DomainClaim()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = GandiSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.DomainClaim().load({"domain":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.GANDI_TEST_LIVE
    for (const op of ['create', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'domain_claim.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"claims":{"a":true,"h":"Claims","n":"claims","r":true,"t":"`$ARRAY`","key$":"claims","index$":0},"created_at":{"a":true,"h":"Created At","n":"created_at","r":true,"t":"`$STRING`","key$":"created_at","index$":1},"expires_at":{"a":true,"h":"Expires At","n":"expires_at","r":true,"t":"`$STRING`","key$":"expires_at","index$":2},"fqdn":{"a":true,"h":"Fqdn","n":"fqdn","r":true,"t":"`$STRING`","key$":"fqdn","index$":3},"fqdn_alabel":{"a":true,"h":"Fqdn Alabel","n":"fqdn_alabel","r":true,"t":"`$STRING`","key$":"fqdn_alabel","index$":4},"fqdn_ulabel":{"a":true,"h":"Fqdn Ulabel","n":"fqdn_ulabel","r":true,"t":"`$STRING`","key$":"fqdn_ulabel","index$":5},"notice_id":{"a":true,"h":"Notice Id","n":"notice_id","r":true,"t":"`$STRING`","key$":"notice_id","index$":6},"status":{"a":true,"h":"Status","n":"status","r":true,"t":"`$STRING`","key$":"status","index$":7}},"name":"domain_claim","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /domain/domains/{domain}/claims","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"domain","or":"domain","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/domain/domains/{domain}/claims","q":{"exist":["domain"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"domain"},{"lit":"domains"},{"var":"domain"},{"lit":"claims"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /domain/domains/{domain}/claims","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"domain","or":"domain","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/domain/domains/{domain}/claims","q":{"exist":["domain"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"domain"},{"lit":"domains"},{"var":"domain"},{"lit":"claims"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.domain"]]},"key$":"domain_claim","name__orig":"domain_claim","Name":"DomainClaim","name_":"domain_claim","name-":"domain-claim","NAME":"DOMAIN_CLAIM","index$":16}, {"active":true,"entity":"domain_claim","key$":"BasicDomainClaimFlow","kind":"basic","name":"BasicDomainClaimFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"domain_claim_ref01"},"m":{"domain":"domain01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{"ref":"domain_claim_ref01","srcdatavar":"domain_claim_ref01_data","suffix":"_dt0"},"m":{"id":"domain_claim01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-domain_claim_ref01"}}],"index$":1}]}, 'DomainClaim', {"POST /domain/domains/{domain}/claims":{"protocol":"http","parameters":[{"name":"domain","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"GET /domain/domains/{domain}/claims":{"protocol":"http","parameters":[{"name":"domain","in":"path","required":true,"schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"domain_claim.create.0":"GET-only live run: needs POST /domain/domains/{domain}/claims"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const domain_claim_ref01_ent = client.DomainClaim()
    let domain_claim_ref01_data = setup.data.new.domain_claim['domain_claim_ref01']
    domain_claim_ref01_data['domain'] = setup.idmap['domain01']

    domain_claim_ref01_data = (await domain_claim_ref01_ent.create(domain_claim_ref01_data)).data()
    assert(null != domain_claim_ref01_data)



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
      '../../../../.sdk/test/entity/domain_claim/DomainClaimTestData.json')

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
    ['domain_claim01','domain_claim02','domain_claim03','domain01','domain02','domain03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'GANDI_TEST_DOMAIN_CLAIM_ENTID': idmap,
    'GANDI_TEST_LIVE': 'FALSE',
    'GANDI_TEST_EXPLAIN': 'FALSE',
    'GANDI_APIKEY': '',
  })

  idmap = env['GANDI_TEST_DOMAIN_CLAIM_ENTID']

  const live = 'TRUE' === env.GANDI_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['GANDI_TEST_DOMAIN_CLAIM_ENTID']
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
  
