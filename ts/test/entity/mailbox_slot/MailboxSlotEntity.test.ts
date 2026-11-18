

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


describe('MailboxSlotEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when GANDI_TEST_LIVE=TRUE.
  afterEach(liveDelay('GANDI_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = GandiSDK.test()
    const ent = testsdk.MailboxSlot()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('mailbox_slot hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of GandiSDK.test(offline).MailboxSlot().stream('list')) { }
    }, /offline/)

    for await (const _item of GandiSDK.test(offline).MailboxSlot()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = GandiSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.MailboxSlot().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of GandiSDK.test().MailboxSlot().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new GandiSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.MailboxSlot().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.MailboxSlot().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = GandiSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.MailboxSlot().list({"config_name":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.GANDI_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'mailbox_slot.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"autorenew":{"a":true,"h":"Autorenew","n":"autorenew","r":true,"t":"`$OBJECT`","key$":"autorenew","index$":0},"config":{"a":true,"h":"Config","n":"config","r":true,"t":"`$OBJECT`","key$":"config","index$":1},"expires_at":{"a":true,"fo":"date-time","h":"Expires At","n":"expires_at","r":false,"t":"`$STRING`","key$":"expires_at","index$":2},"last_paid_duration":{"a":true,"h":"Last Paid Duration","n":"last_paid_duration","r":false,"t":"`$INTEGER`","key$":"last_paid_duration","index$":3},"refund_info":{"a":true,"h":"Refund Info","n":"refund_info","r":true,"t":"`$OBJECT`","key$":"refund_info","index$":4},"refundable":{"a":true,"h":"Refundable","n":"refundable","r":true,"t":"`$BOOLEAN`","key$":"refundable","index$":5},"uuid":{"a":true,"h":"Uuid","n":"uuid","r":true,"t":"`$STRING`","key$":"uuid","index$":6},"webhosting_pack":{"a":true,"h":"Webhosting Pack","n":"webhosting_pack","r":true,"t":"`$BOOLEAN`","key$":"webhosting_pack","index$":7}},"name":"mailbox_slot","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /mailbox/slots","source":"openapi3","version":2},"g":{"query":[{"a":true,"explode":true,"k":"query","n":"config_name","or":"config_name","r":false,"style":"form","t":"`$STRING`","index$":0},{"a":true,"explode":true,"k":"query","n":"expires_at_gte","or":"expires_at_gte","r":false,"style":"form","t":"`$STRING`","index$":1},{"a":true,"explode":true,"k":"query","n":"expires_at_lte","or":"expires_at_lte","r":false,"style":"form","t":"`$STRING`","index$":2},{"a":true,"explode":true,"k":"query","n":"last_paid_duration","or":"last_paid_duration","r":false,"style":"form","t":"`$INTEGER`","index$":3},{"a":true,"ex":1,"explode":true,"k":"query","n":"page","or":"page","r":false,"style":"form","t":"`$INTEGER`","index$":4},{"a":true,"explode":true,"k":"query","n":"per_page","or":"per_page","r":false,"style":"form","t":"`$INTEGER`","index$":5},{"a":true,"explode":true,"k":"query","n":"refundable","or":"refundable","r":false,"style":"form","t":"`$STRING`","index$":6},{"a":true,"explode":true,"k":"query","n":"sharing_id","or":"sharing_id","r":false,"style":"form","t":"`$STRING`","index$":7},{"a":true,"ex":"refund_expires_at","explode":true,"k":"query","n":"sort_by","or":"sort_by","r":false,"style":"form","t":"`$STRING`","index$":8},{"a":true,"explode":true,"k":"query","n":"webhosting_pack","or":"webhosting_pack","r":false,"style":"form","t":"`$BOOLEAN`","index$":9}]},"k":"http","m":"GET","o":"/mailbox/slots","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"mailbox"},{"lit":"slots"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /mailbox/slots/{slot_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"uuid","or":"slot_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/mailbox/slots/{slot_id}","q":{"exist":["uuid"]},"r":{"param":{"slot_id":"uuid"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"mailbox"},{"lit":"slots"},{"var":"uuid"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"mailbox_slot","name__orig":"mailbox_slot","Name":"MailboxSlot","name_":"mailbox_slot","name-":"mailbox-slot","NAME":"MAILBOX_SLOT","index$":53}, {"active":true,"entity":"mailbox_slot","key$":"BasicMailboxSlotFlow","kind":"basic","name":"BasicMailboxSlotFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"mailbox_slot_ref01"}}],"index$":0},{"a":false,"d":{},"i":{"ref":"mailbox_slot_ref01","srcdatavar":"mailbox_slot_ref01_data","suffix":"_dt0"},"m":{"id":"mailbox_slot01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-mailbox_slot_ref01"}}],"unreachable":true}]}, 'MailboxSlot', {"GET /mailbox/slots":{"protocol":"http","parameters":[{"name":"config_name","in":"query","schema":{"type":"string"},"index$":0},{"name":"expires_at_gte","in":"query","schema":{"type":"string","format":"date-time"},"index$":1},{"name":"expires_at_lte","in":"query","schema":{"type":"string","format":"date-time"},"index$":2},{"name":"last_paid_duration","in":"query","schema":{"type":"integer","enum":[1,12]},"index$":3},{"name":"page","in":"query","schema":{"type":"integer","default":1,"minimum":1},"index$":4},{"name":"per_page","in":"query","schema":{"type":"integer","minimum":1},"index$":5},{"name":"refundable","in":"query","schema":{"type":"string","enum":["true","false"]},"index$":6},{"name":"sharing_id","in":"query","schema":{"type":"string"},"index$":7},{"name":"sort_by","in":"query","schema":{"type":"string","enum":["refund_expires_at","-refund_expires_at"],"default":"refund_expires_at"},"index$":8},{"name":"webhosting_pack","in":"query","schema":{"type":"boolean"},"index$":9}]},"GET /mailbox/slots/{slot_id}":{"protocol":"http","parameters":[{"name":"slot_id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let mailbox_slot_ref01_data = Object.values(setup.data.existing.mailbox_slot)[0] as any

    // LIST
    const mailbox_slot_ref01_ent = client.MailboxSlot()
    const mailbox_slot_ref01_match: any = {}

    const mailbox_slot_ref01_list = (await mailbox_slot_ref01_ent.list(mailbox_slot_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/mailbox_slot/MailboxSlotTestData.json')

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
    ['mailbox_slot01','mailbox_slot02','mailbox_slot03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'GANDI_TEST_MAILBOX_SLOT_ENTID': idmap,
    'GANDI_TEST_LIVE': 'FALSE',
    'GANDI_TEST_EXPLAIN': 'FALSE',
    'GANDI_APIKEY': '',
  })

  idmap = env['GANDI_TEST_MAILBOX_SLOT_ENTID']

  const live = 'TRUE' === env.GANDI_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['GANDI_TEST_MAILBOX_SLOT_ENTID']
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
  
