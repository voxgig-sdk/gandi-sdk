

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


describe('MailboxDomainEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when GANDI_TEST_LIVE=TRUE.
  afterEach(liveDelay('GANDI_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = GandiSDK.test()
    const ent = testsdk.MailboxDomain()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('mailbox_domain hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of GandiSDK.test(offline).MailboxDomain().stream('list')) { }
    }, /offline/)

    for await (const _item of GandiSDK.test(offline).MailboxDomain()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = GandiSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.MailboxDomain().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of GandiSDK.test().MailboxDomain().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new GandiSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.MailboxDomain().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.MailboxDomain().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = GandiSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.MailboxDomain().list({"page":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.GANDI_TEST_LIVE
    for (const op of ['create', 'list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'mailbox_domain.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"antispam":{"a":true,"h":"Antispam","n":"antispam","r":true,"t":"`$BOOLEAN`","key$":"antispam","index$":0},"configuration":{"a":true,"h":"Configuration","n":"configuration","r":true,"t":"`$ARRAY`","key$":"configuration","index$":1},"date_last_validation":{"a":true,"fo":"date-time","h":"Date Last Validation","n":"date_last_validation","r":false,"t":"`$STRING`","key$":"date_last_validation","index$":2},"dkim":{"a":true,"h":"Dkim","n":"dkim","r":true,"t":"`$BOOLEAN`","key$":"dkim","index$":3},"fqdns":{"a":true,"h":"Fqdns","n":"fqdns","r":true,"t":"`$ARRAY`","key$":"fqdns","index$":4},"internal":{"a":true,"h":"Internal","n":"internal","r":true,"t":"`$BOOLEAN`","key$":"internal","index$":5},"is_livedns":{"a":true,"h":"Is Livedns","n":"is_livedns","r":true,"t":"`$BOOLEAN`","key$":"is_livedns","index$":6},"mx":{"a":true,"h":"Mx","n":"mx","r":true,"t":"`$BOOLEAN`","key$":"mx","index$":7},"owner":{"a":true,"h":"Owner","n":"owner","r":true,"t":"`$OBJECT`","key$":"owner","index$":8},"spf":{"a":true,"h":"Spf","n":"spf","r":true,"t":"`$BOOLEAN`","key$":"spf","index$":9},"txt":{"a":true,"h":"Txt","n":"txt","r":true,"t":"`$BOOLEAN`","key$":"txt","index$":10}},"name":"mailbox_domain","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["records_to_validate"],"co":{"id":"POST /mailbox/domains/{domain}/validate","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"domain","or":"domain","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/mailbox/domains/{domain}/validate","q":{"$action":"validate","exist":["domain"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"mailbox"},{"lit":"domains"},{"var":"domain"},{"lit":"validate"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /mailbox/domains","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":1,"explode":true,"k":"query","n":"page","or":"page","r":false,"style":"form","t":"`$INTEGER`","index$":0},{"a":true,"explode":true,"k":"query","n":"per_page","or":"per_page","r":false,"style":"form","t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/mailbox/domains","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"mailbox"},{"lit":"domains"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /mailbox/domains/{domain}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"domain","or":"domain","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/mailbox/domains/{domain}","q":{"exist":["domain"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"mailbox"},{"lit":"domains"},{"var":"domain"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.domain"]]},"key$":"mailbox_domain","name__orig":"mailbox_domain","Name":"MailboxDomain","name_":"mailbox_domain","name-":"mailbox-domain","NAME":"MAILBOX_DOMAIN","index$":49}, {"active":true,"entity":"mailbox_domain","key$":"BasicMailboxDomainFlow","kind":"basic","name":"BasicMailboxDomainFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"mailbox_domain_ref01"},"m":{"domain":"domain01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"mailbox_domain_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"mailbox_domain_ref01","srcdatavar":"mailbox_domain_ref01_data","suffix":"_dt0"},"m":{"id":"mailbox_domain01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-mailbox_domain_ref01"}}],"index$":2}]}, 'MailboxDomain', {"POST /mailbox/domains/{domain}/validate":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"records_to_validate":{"type":"array","items":{"type":"string"}}},"required":["records_to_validate"]}}}},"parameters":[{"name":"domain","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"GET /mailbox/domains":{"protocol":"http","parameters":[{"name":"page","in":"query","schema":{"type":"integer","default":1,"minimum":1},"index$":0},{"name":"per_page","in":"query","schema":{"type":"integer","minimum":1},"index$":1}]},"GET /mailbox/domains/{domain}":{"protocol":"http","parameters":[{"name":"domain","in":"path","required":true,"schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"mailbox_domain.create.0":"GET-only live run: needs POST /mailbox/domains/{domain}/validate"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const mailbox_domain_ref01_ent = client.MailboxDomain()
    let mailbox_domain_ref01_data = setup.data.new.mailbox_domain['mailbox_domain_ref01']
    mailbox_domain_ref01_data['domain'] = setup.idmap['domain01']

    mailbox_domain_ref01_data = (await mailbox_domain_ref01_ent.create(mailbox_domain_ref01_data)).data()
    assert(null != mailbox_domain_ref01_data)


    // LIST
    const mailbox_domain_ref01_match: any = {}

    const mailbox_domain_ref01_list = (await mailbox_domain_ref01_ent.list(mailbox_domain_ref01_match)).map((e: any) => e.data())



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
      '../../../../.sdk/test/entity/mailbox_domain/MailboxDomainTestData.json')

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
    ['mailbox_domain01','mailbox_domain02','mailbox_domain03','domain01','domain02','domain03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'GANDI_TEST_MAILBOX_DOMAIN_ENTID': idmap,
    'GANDI_TEST_LIVE': 'FALSE',
    'GANDI_TEST_EXPLAIN': 'FALSE',
    'GANDI_APIKEY': '',
  })

  idmap = env['GANDI_TEST_MAILBOX_DOMAIN_ENTID']

  const live = 'TRUE' === env.GANDI_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['GANDI_TEST_MAILBOX_DOMAIN_ENTID']
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
  
