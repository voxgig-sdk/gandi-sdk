

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


describe('CertificateRenewalEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when GANDI_TEST_LIVE=TRUE.
  afterEach(liveDelay('GANDI_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = GandiSDK.test()
    const ent = testsdk.CertificateRenewal()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = GandiSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.CertificateRenewal().create({"certificate_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.GANDI_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'certificate_renewal.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"csr":{"a":true,"h":"Csr","n":"csr","r":false,"t":"`$STRING`","key$":"csr","index$":0},"dcv_method":{"a":true,"h":"Dcv Method","n":"dcv_method","r":false,"t":"`$STRING`","key$":"dcv_method","index$":1},"duration":{"a":true,"h":"Duration","n":"duration","r":false,"t":"`$INTEGER`","key$":"duration","index$":2},"errors":{"a":true,"h":"Errors","n":"errors","r":false,"t":"`$ARRAY`","key$":"errors","index$":3},"status":{"a":true,"h":"Status","n":"status","r":true,"t":"`$STRING`","key$":"status","index$":4}},"name":"certificate_renewal","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["csr","dcv_method","duration"],"co":{"id":"POST /certificate/issued-certs/{id}","source":"openapi3","version":2},"g":{"header":[{"a":true,"explode":false,"k":"header","n":"dry_run","or":"Dry-Run","r":false,"style":"simple","t":"`$INTEGER`","index$":0}],"params":[{"a":true,"k":"param","n":"certificate_id","or":"id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"explode":true,"k":"query","n":"sharing_id","or":"sharing_id","r":false,"style":"form","t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/certificate/issued-certs/{id}","q":{"exist":["certificate_id"]},"r":{"param":{"id":"certificate_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"certificate"},{"lit":"issued-certs"},{"var":"certificate_id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"certificate_renewal","name__orig":"certificate_renewal","Name":"CertificateRenewal","name_":"certificate_renewal","name-":"certificate-renewal","NAME":"CERTIFICATE_RENEWAL","index$":10}, {"active":true,"entity":"certificate_renewal","key$":"BasicCertificateRenewalFlow","kind":"basic","name":"BasicCertificateRenewalFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"certificate_renewal_ref01"},"m":{"certificate_id":"certificate01"},"o":"create","s":[],"v":[],"index$":0}]}, 'CertificateRenewal', {"POST /certificate/issued-certs/{id}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"csr":{"type":"string","key$":"csr"},"dcv_method":{"type":"string","key$":"dcv_method"},"duration":{"type":"integer","key$":"duration"}}}}}},"parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"sharing_id","in":"query","schema":{"type":"string"},"index$":1},{"name":"Dry-Run","in":"header","schema":{"type":"integer"},"index$":2}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"certificate_renewal.create.0":"GET-only live run: needs POST /certificate/issued-certs/{id}"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const certificate_renewal_ref01_ent = client.CertificateRenewal()
    let certificate_renewal_ref01_data = setup.data.new.certificate_renewal['certificate_renewal_ref01']
    certificate_renewal_ref01_data['certificate_id'] = setup.idmap['certificate01']

    certificate_renewal_ref01_data = (await certificate_renewal_ref01_ent.create(certificate_renewal_ref01_data)).data()
    assert(null != certificate_renewal_ref01_data)


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
      '../../../../.sdk/test/entity/certificate_renewal/CertificateRenewalTestData.json')

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
    ['certificate_renewal01','certificate_renewal02','certificate_renewal03','certificate01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'GANDI_TEST_CERTIFICATE_RENEWAL_ENTID': idmap,
    'GANDI_TEST_LIVE': 'FALSE',
    'GANDI_TEST_EXPLAIN': 'FALSE',
    'GANDI_APIKEY': '',
  })

  idmap = env['GANDI_TEST_CERTIFICATE_RENEWAL_ENTID']

  const live = 'TRUE' === env.GANDI_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['GANDI_TEST_CERTIFICATE_RENEWAL_ENTID']
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
  
