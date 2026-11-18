

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


describe('EmailForwardEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when GANDI_TEST_LIVE=TRUE.
  afterEach(liveDelay('GANDI_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = GandiSDK.test()
    const ent = testsdk.EmailForward()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = GandiSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.EmailForward().list({"domain":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.GANDI_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'email_forward.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"destinations":{"a":true,"h":"Destinations","n":"destinations","r":true,"t":"`$ARRAY`","key$":"destinations","index$":0},"href":{"a":true,"h":"Href","n":"href","r":true,"t":"`$STRING`","key$":"href","index$":1},"id":{"a":true,"h":"Id","n":"id","r":false,"syn":true,"t":"`$STRING`","key$":"id","index$":2},"message":{"a":true,"h":"Message","n":"message","r":true,"t":"`$STRING`","key$":"message","index$":3},"source":{"a":true,"h":"Source","n":"source","r":true,"t":"`$STRING`","key$":"source","index$":4}},"id":{"field":"id","from":{"source":"source"},"name":"id","parts":["domain","source"],"sep":"/"},"name":"email_forward","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["destinations","source"],"co":{"id":"POST /email/forwards/{domain}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"domain","or":"domain","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/email/forwards/{domain}","q":{"exist":["domain"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"email"},{"lit":"forwards"},{"var":"domain"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /email/forwards/{domain}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"domain","or":"domain","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"explode":true,"k":"query","n":"destination","or":"destination","r":false,"style":"form","t":"`$STRING`","index$":0},{"a":true,"ex":1,"explode":true,"k":"query","n":"page","or":"page","r":false,"style":"form","t":"`$INTEGER`","index$":1},{"a":true,"explode":true,"k":"query","n":"per_page","or":"per_page","r":false,"style":"form","t":"`$INTEGER`","index$":2},{"a":true,"ex":"source","explode":true,"k":"query","n":"sort_by","or":"sort_by","r":false,"style":"form","t":"`$STRING`","index$":3},{"a":true,"explode":true,"k":"query","n":"source","or":"source","r":false,"style":"form","t":"`$STRING`","index$":4}]},"k":"http","m":"GET","o":"/email/forwards/{domain}","q":{"exist":["domain"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"email"},{"lit":"forwards"},{"var":"domain"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /email/forwards/{domain}/{source}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"domain","or":"domain","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"source","or":"source","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"DELETE","o":"/email/forwards/{domain}/{source}","q":{"exist":["domain","source"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"email"},{"lit":"forwards"},{"var":"domain"},{"var":"source"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":["destinations"],"co":{"id":"PUT /email/forwards/{domain}/{source}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"domain","or":"domain","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"source","or":"source","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"PUT","o":"/email/forwards/{domain}/{source}","q":{"exist":["domain","source"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"email"},{"lit":"forwards"},{"var":"domain"},{"var":"source"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"email_forward","name__orig":"email_forward","Name":"EmailForward","name_":"email_forward","name-":"email-forward","NAME":"EMAIL_FORWARD","index$":26}, {"active":true,"entity":"email_forward","key$":"BasicEmailForwardFlow","kind":"basic","name":"BasicEmailForwardFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"email_forward_ref01"},"m":{"domain":"domain01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{"domain":"domain01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"email_forward_ref01"}}],"index$":1},{"a":true,"d":{"domain":"domain01"},"i":{"ref":"email_forward_ref01","srcdatavar":"email_forward_ref01_data","suffix":"_up0","textfield":"href"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-email_forward_ref01"}}],"v":[],"index$":2},{"a":true,"d":{},"i":{"ref":"email_forward_ref01","suffix":"_rm0"},"m":{"domain":"domain01","id":"email_forward01"},"o":"remove","s":[],"v":[],"index$":3},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{"domain":"domain01"},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"email_forward_ref01"}}],"index$":4}]}, 'EmailForward', {"POST /email/forwards/{domain}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"destinations":{"type":"array","items":{"type":"string"},"key$":"destinations"},"source":{"type":"string","key$":"source"}},"required":["destinations","source"]}}}},"parameters":[{"name":"domain","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"GET /email/forwards/{domain}":{"protocol":"http","parameters":[{"name":"domain","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"destination","in":"query","schema":{"type":"string"},"index$":1},{"name":"page","in":"query","schema":{"type":"integer","default":1,"minimum":1},"index$":2},{"name":"per_page","in":"query","schema":{"type":"integer","minimum":1},"index$":3},{"name":"sort_by","in":"query","schema":{"type":"string","enum":["source","-source","destination","-destination"],"default":"source"},"index$":4},{"name":"source","in":"query","schema":{"type":"string"},"index$":5}]},"DELETE /email/forwards/{domain}/{source}":{"protocol":"http","parameters":[{"name":"domain","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"source","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"PUT /email/forwards/{domain}/{source}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"destinations":{"type":"array","items":{"type":"string"},"key$":"destinations"}},"required":["destinations"]}}}},"parameters":[{"name":"domain","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"source","in":"path","required":true,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"email_forward.create.0":"GET-only live run: needs POST /email/forwards/{domain}","email_forward.update.2":"GET-only live run: needs PUT /email/forwards/{domain}/{source}","email_forward.remove.3":"GET-only live run: needs DELETE /email/forwards/{domain}/{source}","email_forward.list.4":"GET-only live run: checks a removal this run does not make"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const email_forward_ref01_ent = client.EmailForward()
    let email_forward_ref01_data = setup.data.new.email_forward['email_forward_ref01']
    email_forward_ref01_data['domain'] = setup.idmap['domain01']

    email_forward_ref01_data = (await email_forward_ref01_ent.create(email_forward_ref01_data)).data()
    assert(null != email_forward_ref01_data.id)


    // LIST
    const email_forward_ref01_match: any = {}
    email_forward_ref01_match['domain'] = setup.idmap['domain01']

    const email_forward_ref01_list = (await email_forward_ref01_ent.list(email_forward_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(email_forward_ref01_list, { id: email_forward_ref01_data.id })))


    // UPDATE
    const email_forward_ref01_data_up0: any = {}
    email_forward_ref01_data_up0.id = email_forward_ref01_data.id
    email_forward_ref01_data_up0['domain'] = setup.idmap['domain'] ?? setup.idmap['domain01']

    const email_forward_ref01_markdef_up0 = { name: 'href', value: 'Mark01-email_forward_ref01_' + setup.now }
    ;(email_forward_ref01_data_up0 as any)[email_forward_ref01_markdef_up0.name] = email_forward_ref01_markdef_up0.value

    const email_forward_ref01_resdata_up0 = (await email_forward_ref01_ent.update(email_forward_ref01_data_up0)).data()
    assert(email_forward_ref01_resdata_up0.id === email_forward_ref01_data_up0.id)

    assert((email_forward_ref01_resdata_up0 as any)[email_forward_ref01_markdef_up0.name] === email_forward_ref01_markdef_up0.value)


    // REMOVE
    const email_forward_ref01_match_rm0: any = { id: email_forward_ref01_data.id }
    email_forward_ref01_match_rm0['domain'] = setup.idmap['domain'] ?? setup.idmap['domain01']
    await email_forward_ref01_ent.remove(email_forward_ref01_match_rm0)
  

    // LIST
    const email_forward_ref01_match_rt0: any = {}
    email_forward_ref01_match_rt0['domain'] = setup.idmap['domain01']

    const email_forward_ref01_list_rt0 = (await email_forward_ref01_ent.list(email_forward_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(email_forward_ref01_list_rt0, { id: email_forward_ref01_data.id })))


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
      '../../../../.sdk/test/entity/email_forward/EmailForwardTestData.json')

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
    ['email_forward01','email_forward02','email_forward03','domain01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'GANDI_TEST_EMAIL_FORWARD_ENTID': idmap,
    'GANDI_TEST_LIVE': 'FALSE',
    'GANDI_TEST_EXPLAIN': 'FALSE',
    'GANDI_APIKEY': '',
  })

  idmap = env['GANDI_TEST_EMAIL_FORWARD_ENTID']

  const live = 'TRUE' === env.GANDI_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['GANDI_TEST_EMAIL_FORWARD_ENTID']
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
  
