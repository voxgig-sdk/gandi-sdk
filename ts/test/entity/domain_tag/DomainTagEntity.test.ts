

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


describe('DomainTagEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when GANDI_TEST_LIVE=TRUE.
  afterEach(liveDelay('GANDI_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = GandiSDK.test()
    const ent = testsdk.DomainTag()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = GandiSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.DomainTag().list({"domain":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.GANDI_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'domain_tag.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"add":{"a":true,"h":"Add","n":"add","r":true,"t":"`$ARRAY`","key$":"add","index$":0},"message":{"a":true,"h":"Message","n":"message","r":true,"t":"`$STRING`","key$":"message","index$":1},"remove":{"a":true,"h":"Remove","n":"remove","r":true,"t":"`$ARRAY`","key$":"remove","index$":2},"tag":{"a":true,"h":"Tag","n":"tag","r":true,"t":"`$STRING`","key$":"tag","index$":3},"tags":{"a":true,"h":"Tags","n":"tags","r":true,"t":"`$ARRAY`","key$":"tags","index$":4}},"name":"domain_tag","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["tag"],"co":{"id":"POST /domain/domains/{domain}/tags","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"domain","or":"domain","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/domain/domains/{domain}/tags","q":{"exist":["domain"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"domain"},{"lit":"domains"},{"var":"domain"},{"lit":"tags"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /domain/domains/{domain}/tags","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"domain","or":"domain","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/domain/domains/{domain}/tags","q":{"exist":["domain"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"domain"},{"lit":"domains"},{"var":"domain"},{"lit":"tags"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"patch":{"input":"data","name":"patch","points":[{"a":true,"bf":["add","remove"],"co":{"id":"PATCH /domain/domains/{domain}/tags","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"domain","or":"domain","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PATCH","o":"/domain/domains/{domain}/tags","q":{"exist":["domain"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"domain"},{"lit":"domains"},{"var":"domain"},{"lit":"tags"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"patch"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /domain/domains/{domain}/tags","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"domain","or":"domain","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/domain/domains/{domain}/tags","q":{"exist":["domain"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"domain"},{"lit":"domains"},{"var":"domain"},{"lit":"tags"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":["tags"],"co":{"id":"PUT /domain/domains/{domain}/tags","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"domain","or":"domain","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PUT","o":"/domain/domains/{domain}/tags","q":{"exist":["domain"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"domain"},{"lit":"domains"},{"var":"domain"},{"lit":"tags"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[["$.main.kit.entity.domain"]]},"key$":"domain_tag","name__orig":"domain_tag","Name":"DomainTag","name_":"domain_tag","name-":"domain-tag","NAME":"DOMAIN_TAG","index$":23}, {"active":true,"entity":"domain_tag","key$":"BasicDomainTagFlow","kind":"basic","name":"BasicDomainTagFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"domain_tag_ref01"},"m":{"domain":"domain01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{"domain":"domain01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"domain_tag_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"domain_tag_ref01","srcdatavar":"domain_tag_ref01_data","suffix":"_up0","textfield":"message"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-domain_tag_ref01"}}],"v":[],"index$":2},{"a":true,"d":{},"i":{"ref":"domain_tag_ref01","suffix":"_rm0"},"m":{"id":"domain_tag01"},"o":"remove","s":[],"v":[],"index$":3},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{"domain":"domain01"},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"domain_tag_ref01"}}],"index$":4}]}, 'DomainTag', {"POST /domain/domains/{domain}/tags":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"tag":{"type":"string","key$":"tag"}},"required":["tag"]}}}},"parameters":[{"name":"domain","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"GET /domain/domains/{domain}/tags":{"protocol":"http","parameters":[{"name":"domain","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"PATCH /domain/domains/{domain}/tags":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"add":{"type":"array","items":{"type":"string"},"key$":"add"},"remove":{"type":"array","items":{"type":"string"},"key$":"remove"}},"required":["add","remove"]}}}},"parameters":[{"name":"domain","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"DELETE /domain/domains/{domain}/tags":{"protocol":"http","parameters":[{"name":"domain","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"PUT /domain/domains/{domain}/tags":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"tags":{"type":"array","items":{"type":"string"},"key$":"tags"}},"required":["tags"]}}}},"parameters":[{"name":"domain","in":"path","required":true,"schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"domain_tag.create.0":"GET-only live run: needs POST /domain/domains/{domain}/tags","domain_tag.update.2":"GET-only live run: needs PUT /domain/domains/{domain}/tags","domain_tag.remove.3":"GET-only live run: needs DELETE /domain/domains/{domain}/tags"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const domain_tag_ref01_ent = client.DomainTag()
    let domain_tag_ref01_data = setup.data.new.domain_tag['domain_tag_ref01']
    domain_tag_ref01_data['domain'] = setup.idmap['domain01']

    domain_tag_ref01_data = (await domain_tag_ref01_ent.create(domain_tag_ref01_data)).data()
    assert(null != domain_tag_ref01_data)


    // LIST
    const domain_tag_ref01_match: any = {}
    domain_tag_ref01_match['domain'] = setup.idmap['domain01']

    const domain_tag_ref01_list = (await domain_tag_ref01_ent.list(domain_tag_ref01_match)).map((e: any) => e.data())


    // UPDATE
    const domain_tag_ref01_data_up0: any = {}

    const domain_tag_ref01_markdef_up0 = { name: 'message', value: 'Mark01-domain_tag_ref01_' + setup.now }
    ;(domain_tag_ref01_data_up0 as any)[domain_tag_ref01_markdef_up0.name] = domain_tag_ref01_markdef_up0.value

    const domain_tag_ref01_resdata_up0 = (await domain_tag_ref01_ent.update(domain_tag_ref01_data_up0)).data()
    assert(null != domain_tag_ref01_resdata_up0)

    assert((domain_tag_ref01_resdata_up0 as any)[domain_tag_ref01_markdef_up0.name] === domain_tag_ref01_markdef_up0.value)



    // LIST
    const domain_tag_ref01_match_rt0: any = {}
    domain_tag_ref01_match_rt0['domain'] = setup.idmap['domain01']

    const domain_tag_ref01_list_rt0 = (await domain_tag_ref01_ent.list(domain_tag_ref01_match_rt0)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/domain_tag/DomainTagTestData.json')

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
    ['domain_tag01','domain_tag02','domain_tag03','domain01','domain02','domain03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'GANDI_TEST_DOMAIN_TAG_ENTID': idmap,
    'GANDI_TEST_LIVE': 'FALSE',
    'GANDI_TEST_EXPLAIN': 'FALSE',
    'GANDI_APIKEY': '',
  })

  idmap = env['GANDI_TEST_DOMAIN_TAG_ENTID']

  const live = 'TRUE' === env.GANDI_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['GANDI_TEST_DOMAIN_TAG_ENTID']
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
  
