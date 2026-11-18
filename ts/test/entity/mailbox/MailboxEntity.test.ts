

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


describe('MailboxEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when GANDI_TEST_LIVE=TRUE.
  afterEach(liveDelay('GANDI_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = GandiSDK.test()
    const ent = testsdk.Mailbox()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('mailbox hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of GandiSDK.test(offline).Mailbox().stream('list')) { }
    }, /offline/)

    for await (const _item of GandiSDK.test(offline).Mailbox()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = GandiSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Mailbox().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of GandiSDK.test().Mailbox().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new GandiSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Mailbox().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Mailbox().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = GandiSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Mailbox().list({"address":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.GANDI_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'mailbox.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"address":{"a":true,"h":"Address","n":"address","r":true,"t":"`$STRING`","key$":"address","index$":0},"aliases":{"a":true,"h":"Aliases","n":"aliases","r":false,"t":"`$ARRAY`","key$":"aliases","index$":1},"antispam":{"a":true,"h":"Antispam","n":"antispam","op":{"update":{"req":false,"type":"`$BOOLEAN`"}},"r":true,"t":"`$BOOLEAN`","key$":"antispam","index$":2},"autorenew":{"a":true,"h":"Autorenew","n":"autorenew","r":true,"t":"`$OBJECT`","key$":"autorenew","index$":3},"config":{"a":true,"h":"Config","n":"config","r":true,"t":"`$OBJECT`","key$":"config","index$":4},"config_name":{"a":true,"h":"Config Name","n":"config_name","op":{"update":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$STRING`","key$":"config_name","index$":5},"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":true,"t":"`$STRING`","key$":"created_at","index$":6},"data_access":{"a":true,"h":"Data Access","n":"data_access","r":true,"t":"`$BOOLEAN`","key$":"data_access","index$":7},"domain_part":{"a":true,"h":"Domain Part","n":"domain_part","r":true,"t":"`$STRING`","key$":"domain_part","index$":8},"duration_month":{"a":true,"h":"Duration Month","n":"duration_month","r":false,"t":"`$INTEGER`","key$":"duration_month","index$":9},"email":{"a":true,"h":"Email","n":"email","r":true,"t":"`$STRING`","key$":"email","index$":10},"expires_at":{"a":true,"fo":"date-time","h":"Expires At","n":"expires_at","r":true,"t":"`$STRING`","key$":"expires_at","index$":11},"internal_domain":{"a":true,"h":"Internal Domain","n":"internal_domain","r":true,"t":"`$BOOLEAN`","key$":"internal_domain","index$":12},"issues":{"a":true,"h":"Issues","n":"issues","r":false,"t":"`$ARRAY`","key$":"issues","index$":13},"last_paid_duration":{"a":true,"h":"Last Paid Duration","n":"last_paid_duration","r":true,"t":"`$INTEGER`","key$":"last_paid_duration","index$":14},"local_part":{"a":true,"h":"Local Part","n":"local_part","r":true,"t":"`$STRING`","key$":"local_part","index$":15},"message":{"a":true,"h":"Message","n":"message","r":true,"t":"`$STRING`","key$":"message","index$":16},"owner":{"a":true,"h":"Owner","n":"owner","r":true,"t":"`$OBJECT`","key$":"owner","index$":17},"password":{"a":true,"h":"Password","n":"password","op":{"update":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$STRING`","key$":"password","index$":18},"quota":{"a":true,"h":"Quota","n":"quota","r":true,"t":"`$INTEGER`","key$":"quota","index$":19},"quota_used":{"a":true,"h":"Quota Used","n":"quota_used","r":true,"t":"`$INTEGER`","key$":"quota_used","index$":20},"responder":{"a":true,"h":"Responder","n":"responder","r":true,"t":"`$OBJECT`","key$":"responder","index$":21},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":true,"t":"`$STRING`","key$":"updated_at","index$":22},"uuid":{"a":true,"h":"Uuid","n":"uuid","r":true,"t":"`$STRING`","key$":"uuid","index$":23}},"name":"mailbox","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["duration"],"co":{"id":"POST /mailbox/mailboxes/{email}/renew","source":"openapi3","version":2},"g":{"header":[{"a":true,"explode":false,"k":"header","n":"dry_run","or":"Dry-Run","r":false,"style":"simple","t":"`$INTEGER`","index$":0}],"params":[{"a":true,"k":"param","n":"address","or":"email","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"explode":true,"k":"query","n":"sharing_id","or":"sharing_id","r":false,"style":"form","t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/mailbox/mailboxes/{email}/renew","q":{"$action":"renew","exist":["address"]},"r":{"param":{"email":"address"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"mailbox"},{"lit":"mailboxes"},{"var":"address"},{"lit":"renew"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"bf":["aliases","config_name","duration_month","email","password"],"co":{"id":"POST /mailbox/mailboxes","source":"openapi3","version":2},"g":{"query":[{"a":true,"explode":true,"k":"query","n":"sharing_id","or":"sharing_id","r":false,"style":"form","t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/mailbox/mailboxes","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"mailbox"},{"lit":"mailboxes"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /mailbox/mailboxes","source":"openapi3","version":2},"g":{"query":[{"a":true,"explode":true,"k":"query","n":"address","or":"address","r":false,"style":"form","t":"`$STRING`","index$":0},{"a":true,"explode":true,"k":"query","n":"domain_part","or":"domain_part","r":false,"style":"form","t":"`$STRING`","index$":1},{"a":true,"explode":true,"k":"query","n":"local_part","or":"local_part","r":false,"style":"form","t":"`$STRING`","index$":2},{"a":true,"ex":1,"explode":true,"k":"query","n":"page","or":"page","r":false,"style":"form","t":"`$INTEGER`","index$":3},{"a":true,"explode":true,"k":"query","n":"per_page","or":"per_page","r":false,"style":"form","t":"`$INTEGER`","index$":4},{"a":true,"explode":true,"k":"query","n":"search","or":"search","r":false,"style":"form","t":"`$STRING`","index$":5},{"a":true,"explode":true,"k":"query","n":"sharing_id","or":"sharing_id","r":false,"style":"form","t":"`$STRING`","index$":6},{"a":true,"ex":"id","explode":true,"k":"query","n":"sort_by","or":"sort_by","r":false,"style":"form","t":"`$STRING`","index$":7}]},"k":"http","m":"GET","o":"/mailbox/mailboxes","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"mailbox"},{"lit":"mailboxes"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /mailbox/mailboxes/{email}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"address","or":"email","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"explode":true,"k":"query","n":"sharing_id","or":"sharing_id","r":false,"style":"form","t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/mailbox/mailboxes/{email}","q":{"exist":["address"]},"r":{"param":{"email":"address"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"mailbox"},{"lit":"mailboxes"},{"var":"address"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /mailbox/mailboxes/{email}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"address","or":"email","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"explode":true,"k":"query","n":"sharing_id","or":"sharing_id","r":false,"style":"form","t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/mailbox/mailboxes/{email}","q":{"exist":["address"]},"r":{"param":{"email":"address"}},"s":[{"lit":"mailbox"},{"lit":"mailboxes"},{"var":"address"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":["aliases","antispam","autorenew","config_name","password","responder"],"co":{"id":"PATCH /mailbox/mailboxes/{email}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"address","or":"email","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PATCH","o":"/mailbox/mailboxes/{email}","q":{"exist":["address"]},"r":{"param":{"email":"address"}},"s":[{"lit":"mailbox"},{"lit":"mailboxes"},{"var":"address"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"mailbox","name__orig":"mailbox","Name":"Mailbox","name_":"mailbox","name-":"mailbox","NAME":"MAILBOX","index$":49}, {"active":true,"entity":"mailbox","key$":"BasicMailboxFlow","kind":"basic","name":"BasicMailboxFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"mailbox_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"mailbox_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"mailbox_ref01","srcdatavar":"mailbox_ref01_data","suffix":"_up0","textfield":"config_name"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-mailbox_ref01"}}],"v":[],"index$":2},{"a":true,"d":{},"i":{"ref":"mailbox_ref01","srcdatavar":"mailbox_ref01_data","suffix":"_dt0"},"m":{"id":"mailbox01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-mailbox_ref01"}}],"index$":3},{"a":true,"d":{},"i":{"ref":"mailbox_ref01","suffix":"_rm0"},"m":{"id":"mailbox01"},"o":"remove","s":[],"v":[],"index$":4},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"mailbox_ref01"}}],"index$":5}]}, 'Mailbox', {"POST /mailbox/mailboxes/{email}/renew":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"duration":{"type":"integer"}},"required":["duration"]}}}},"parameters":[{"name":"email","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"sharing_id","in":"query","schema":{"type":"string"},"index$":1},{"name":"Dry-Run","in":"header","schema":{"type":"integer"},"index$":2}]},"POST /mailbox/mailboxes":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"config_name":{"type":"string","key$":"config_name"},"email":{"type":"string","key$":"email"},"password":{"type":"string","minLength":8,"maxLength":200,"key$":"password"},"aliases":{"type":"array","items":{"type":"string"},"key$":"aliases"},"duration_month":{"type":"integer","enum":[1,12],"key$":"duration_month"}},"required":["config_name","email","password"]}}}},"parameters":[{"name":"sharing_id","in":"query","schema":{"type":"string"},"index$":0}]},"GET /mailbox/mailboxes":{"protocol":"http","parameters":[{"name":"address","in":"query","schema":{"type":"string"},"index$":0},{"name":"domain_part","in":"query","schema":{"type":"string"},"index$":1},{"name":"local_part","in":"query","schema":{"type":"string"},"index$":2},{"name":"page","in":"query","schema":{"type":"integer","default":1,"minimum":1},"index$":3},{"name":"per_page","in":"query","schema":{"type":"integer","minimum":1},"index$":4},{"name":"search","in":"query","schema":{"type":"string"},"index$":5},{"name":"sharing_id","in":"query","schema":{"type":"string"},"index$":6},{"name":"sort_by","in":"query","schema":{"type":"string","enum":["id","-id","local_part","-local_part","config_name","-config_name","expire_at","-expire_at","quota","-quota","autorenew","-autorenew"],"default":"id"},"index$":7}]},"GET /mailbox/mailboxes/{email}":{"protocol":"http","parameters":[{"name":"email","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"sharing_id","in":"query","schema":{"type":"string"},"index$":1}]},"DELETE /mailbox/mailboxes/{email}":{"protocol":"http","parameters":[{"name":"email","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"sharing_id","in":"query","schema":{"type":"string"},"index$":1}]},"PATCH /mailbox/mailboxes/{email}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"aliases":{"type":"array","items":{"type":"string"},"key$":"aliases"},"antispam":{"type":"boolean","default":true,"key$":"antispam"},"autorenew":{"type":"object","properties":{"activated":{"type":"boolean"},"duration":{"type":"integer","enum":[1,12]}},"required":["activated","duration"],"key$":"autorenew"},"config_name":{"type":"string","enum":["standard","premium"],"key$":"config_name"},"password":{"type":"string","minLength":8,"maxLength":200,"key$":"password"},"responder":{"type":"object","properties":{"activated":{"type":"boolean","default":false},"ends_at":{"type":"string","format":"date-time"},"message":{"type":"string"},"starts_at":{"type":"string","format":"date-time"}},"required":["activated"],"key$":"responder"}}}}}},"parameters":[{"name":"email","in":"path","required":true,"schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"mailbox.create.0":"GET-only live run: needs POST /mailbox/mailboxes/{email}/renew","mailbox.update.2":"GET-only live run: needs PATCH /mailbox/mailboxes/{email}","mailbox.remove.4":"GET-only live run: needs DELETE /mailbox/mailboxes/{email}"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const mailbox_ref01_ent = client.Mailbox()
    let mailbox_ref01_data = setup.data.new.mailbox['mailbox_ref01']

    mailbox_ref01_data = (await mailbox_ref01_ent.create(mailbox_ref01_data)).data()
    assert(null != mailbox_ref01_data)


    // LIST
    const mailbox_ref01_match: any = {}

    const mailbox_ref01_list = (await mailbox_ref01_ent.list(mailbox_ref01_match)).map((e: any) => e.data())


    // UPDATE
    const mailbox_ref01_data_up0: any = {}

    const mailbox_ref01_markdef_up0 = { name: 'config_name', value: 'Mark01-mailbox_ref01_' + setup.now }
    ;(mailbox_ref01_data_up0 as any)[mailbox_ref01_markdef_up0.name] = mailbox_ref01_markdef_up0.value

    const mailbox_ref01_resdata_up0 = (await mailbox_ref01_ent.update(mailbox_ref01_data_up0)).data()
    assert(null != mailbox_ref01_resdata_up0)

    assert((mailbox_ref01_resdata_up0 as any)[mailbox_ref01_markdef_up0.name] === mailbox_ref01_markdef_up0.value)




    // LIST
    const mailbox_ref01_match_rt0: any = {}

    const mailbox_ref01_list_rt0 = (await mailbox_ref01_ent.list(mailbox_ref01_match_rt0)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/mailbox/MailboxTestData.json')

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
    ['mailbox01','mailbox02','mailbox03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'GANDI_TEST_MAILBOX_ENTID': idmap,
    'GANDI_TEST_LIVE': 'FALSE',
    'GANDI_TEST_EXPLAIN': 'FALSE',
    'GANDI_APIKEY': '',
  })

  idmap = env['GANDI_TEST_MAILBOX_ENTID']

  const live = 'TRUE' === env.GANDI_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['GANDI_TEST_MAILBOX_ENTID']
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
  
