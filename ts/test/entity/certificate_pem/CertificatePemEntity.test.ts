

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


describe('CertificatePemEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when GANDI_TEST_LIVE=TRUE.
  afterEach(liveDelay('GANDI_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = GandiSDK.test()
    const ent = testsdk.CertificatePem()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = GandiSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.CertificatePem().load({"type":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.GANDI_TEST_LIVE
    for (const op of []) {
      if (!live && maybeSkipControl(t, 'entityOp', 'certificate_pem.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"certificate_pem","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /certificate/pem/-/{filename}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"filename","or":"filename","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/certificate/pem/-/{filename}","q":{"exist":["filename"]},"r":{},"rs":{"kind":"raw","media":"text/plain"},"s":[{"lit":"certificate"},{"lit":"pem"},{"lit":"-"},{"var":"filename"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /certificate/pem/{type}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"type","or":"type","r":true,"t":"`$STRING`","index$":0,"ex":"cert_std"}],"query":[{"a":true,"explode":true,"k":"query","n":"provider","or":"provider","r":false,"style":"form","t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/certificate/pem/{type}","q":{"exist":["type"]},"r":{},"rs":{"kind":"raw","media":"text/plain"},"s":[{"lit":"certificate"},{"lit":"pem"},{"var":"type"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"certificate_pem","name__orig":"certificate_pem","Name":"CertificatePem","name_":"certificate_pem","name-":"certificate-pem","NAME":"CERTIFICATE_PEM","index$":9}, {"active":true,"entity":"certificate_pem","key$":"BasicCertificatePemFlow","kind":"basic","name":"BasicCertificatePemFlow","param":{},"step":[{"a":false,"d":{},"i":{"ref":"certificate_pem_ref01","srcdatavar":"certificate_pem_ref01_data","suffix":"_dt0"},"m":{"id":"certificate_pem01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-certificate_pem_ref01"}}],"unreachable":true}]}, 'CertificatePem', {"GET /certificate/pem/-/{filename}":{"protocol":"http","parameters":[{"name":"filename","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"GET /certificate/pem/{type}":{"protocol":"http","parameters":[{"name":"type","in":"path","required":true,"schema":{"type":"string","enum":["cert_std","cert_pro"]},"index$":0},{"name":"provider","in":"query","schema":{"type":"string","enum":["Sectigo","Digicert"]},"index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let certificate_pem_ref01_data = Object.values(setup.data.existing.certificate_pem)[0] as any

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
      '../../../../.sdk/test/entity/certificate_pem/CertificatePemTestData.json')

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
    ['certificate_pem01','certificate_pem02','certificate_pem03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'GANDI_TEST_CERTIFICATE_PEM_ENTID': idmap,
    'GANDI_TEST_LIVE': 'FALSE',
    'GANDI_TEST_EXPLAIN': 'FALSE',
    'GANDI_APIKEY': '',
  })

  idmap = env['GANDI_TEST_CERTIFICATE_PEM_ENTID']

  const live = 'TRUE' === env.GANDI_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['GANDI_TEST_CERTIFICATE_PEM_ENTID']
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
  
