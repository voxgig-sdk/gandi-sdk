

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


describe('MailboxForwardEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when GANDI_TEST_LIVE=TRUE.
  afterEach(liveDelay('GANDI_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = GandiSDK.test()
    const ent = testsdk.MailboxForward()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('mailbox_forward hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of GandiSDK.test(offline).MailboxForward().stream('list')) { }
    }, /offline/)

    for await (const _item of GandiSDK.test(offline).MailboxForward()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = GandiSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.MailboxForward().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of GandiSDK.test().MailboxForward().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new GandiSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.MailboxForward().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.MailboxForward().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = GandiSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.MailboxForward().list({"page":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.GANDI_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'mailbox_forward.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"destinations":{"a":true,"h":"Destinations","n":"destinations","r":true,"t":"`$ARRAY`","key$":"destinations","index$":0},"message":{"a":true,"h":"Message","n":"message","r":true,"t":"`$STRING`","key$":"message","index$":1},"source":{"a":true,"h":"Source","n":"source","r":true,"t":"`$STRING`","key$":"source","index$":2}},"name":"mailbox_forward","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["destinations","source"],"co":{"id":"POST /mailbox/forwards","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/mailbox/forwards","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"mailbox"},{"lit":"forwards"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /mailbox/forwards","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":1,"explode":true,"k":"query","n":"page","or":"page","r":false,"style":"form","t":"`$INTEGER`","index$":0},{"a":true,"explode":true,"k":"query","n":"per_page","or":"per_page","r":false,"style":"form","t":"`$INTEGER`","index$":1},{"a":true,"explode":true,"k":"query","n":"search","or":"search","r":false,"style":"form","t":"`$STRING`","index$":2},{"a":true,"explode":true,"k":"query","n":"sharing_id","or":"sharing_id","r":false,"style":"form","t":"`$STRING`","index$":3},{"a":true,"ex":"source","explode":true,"k":"query","n":"sort_by","or":"sort_by","r":false,"style":"form","t":"`$STRING`","index$":4}]},"k":"http","m":"GET","o":"/mailbox/forwards","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"mailbox"},{"lit":"forwards"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /mailbox/forwards/{source}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"source","or":"source","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/mailbox/forwards/{source}","q":{"exist":["source"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"mailbox"},{"lit":"forwards"},{"var":"source"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":["destinations"],"co":{"id":"PUT /mailbox/forwards/{source}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"source","or":"source","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PUT","o":"/mailbox/forwards/{source}","q":{"exist":["source"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"mailbox"},{"lit":"forwards"},{"var":"source"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"mailbox_forward","name__orig":"mailbox_forward","Name":"MailboxForward","name_":"mailbox_forward","name-":"mailbox-forward","NAME":"MAILBOX_FORWARD","index$":50}, {"active":true,"entity":"mailbox_forward","key$":"BasicMailboxForwardFlow","kind":"basic","name":"BasicMailboxForwardFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"mailbox_forward_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"mailbox_forward_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"mailbox_forward_ref01","srcdatavar":"mailbox_forward_ref01_data","suffix":"_up0","textfield":"message"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-mailbox_forward_ref01"}}],"v":[],"index$":2},{"a":true,"d":{},"i":{"ref":"mailbox_forward_ref01","suffix":"_rm0"},"m":{"id":"mailbox_forward01"},"o":"remove","s":[],"v":[],"index$":3},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"mailbox_forward_ref01"}}],"index$":4}]}, 'MailboxForward', {"POST /mailbox/forwards":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"destinations":{"type":"array","items":{"type":"string"},"key$":"destinations"},"source":{"type":"string","key$":"source"}},"required":["destinations","source"]}}}},"parameters":[]},"GET /mailbox/forwards":{"protocol":"http","parameters":[{"name":"page","in":"query","schema":{"type":"integer","default":1,"minimum":1},"index$":0},{"name":"per_page","in":"query","schema":{"type":"integer","minimum":1},"index$":1},{"name":"search","in":"query","schema":{"type":"string"},"index$":2},{"name":"sharing_id","in":"query","schema":{"type":"string"},"index$":3},{"name":"sort_by","in":"query","schema":{"type":"string","enum":["source","-source"],"default":"source"},"index$":4}]},"DELETE /mailbox/forwards/{source}":{"protocol":"http","parameters":[{"name":"source","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"PUT /mailbox/forwards/{source}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"destinations":{"type":"array","items":{"type":"string"},"key$":"destinations"}},"required":["destinations"]}}}},"parameters":[{"name":"source","in":"path","required":true,"schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"mailbox_forward.create.0":"GET-only live run: needs POST /mailbox/forwards","mailbox_forward.update.2":"GET-only live run: needs PUT /mailbox/forwards/{source}","mailbox_forward.remove.3":"GET-only live run: needs DELETE /mailbox/forwards/{source}"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const mailbox_forward_ref01_ent = client.MailboxForward()
    let mailbox_forward_ref01_data = setup.data.new.mailbox_forward['mailbox_forward_ref01']

    mailbox_forward_ref01_data = (await mailbox_forward_ref01_ent.create(mailbox_forward_ref01_data)).data()
    assert(null != mailbox_forward_ref01_data)


    // LIST
    const mailbox_forward_ref01_match: any = {}

    const mailbox_forward_ref01_list = (await mailbox_forward_ref01_ent.list(mailbox_forward_ref01_match)).map((e: any) => e.data())


    // UPDATE
    const mailbox_forward_ref01_data_up0: any = {}

    const mailbox_forward_ref01_markdef_up0 = { name: 'message', value: 'Mark01-mailbox_forward_ref01_' + setup.now }
    ;(mailbox_forward_ref01_data_up0 as any)[mailbox_forward_ref01_markdef_up0.name] = mailbox_forward_ref01_markdef_up0.value

    const mailbox_forward_ref01_resdata_up0 = (await mailbox_forward_ref01_ent.update(mailbox_forward_ref01_data_up0)).data()
    assert(null != mailbox_forward_ref01_resdata_up0)

    assert((mailbox_forward_ref01_resdata_up0 as any)[mailbox_forward_ref01_markdef_up0.name] === mailbox_forward_ref01_markdef_up0.value)



    // LIST
    const mailbox_forward_ref01_match_rt0: any = {}

    const mailbox_forward_ref01_list_rt0 = (await mailbox_forward_ref01_ent.list(mailbox_forward_ref01_match_rt0)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/mailbox_forward/MailboxForwardTestData.json')

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
    ['mailbox_forward01','mailbox_forward02','mailbox_forward03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'GANDI_TEST_MAILBOX_FORWARD_ENTID': idmap,
    'GANDI_TEST_LIVE': 'FALSE',
    'GANDI_TEST_EXPLAIN': 'FALSE',
    'GANDI_APIKEY': '',
  })

  idmap = env['GANDI_TEST_MAILBOX_FORWARD_ENTID']

  const live = 'TRUE' === env.GANDI_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['GANDI_TEST_MAILBOX_FORWARD_ENTID']
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
  
