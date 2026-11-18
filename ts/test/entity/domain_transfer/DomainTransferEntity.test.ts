

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


describe('DomainTransferEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when GANDI_TEST_LIVE=TRUE.
  afterEach(liveDelay('GANDI_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = GandiSDK.test()
    const ent = testsdk.DomainTransfer()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = GandiSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.DomainTransfer().load({"domain":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.GANDI_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'domain_transfer.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"admin":{"a":true,"h":"Admin","n":"admin","r":true,"t":"`$OBJECT`","key$":"admin","index$":0},"authinfo":{"a":true,"h":"Authinfo","n":"authinfo","r":false,"t":"`$STRING`","key$":"authinfo","index$":1},"bill":{"a":true,"h":"Bill","n":"bill","r":true,"t":"`$OBJECT`","key$":"bill","index$":2},"change_owner":{"a":true,"h":"Change Owner","n":"change_owner","r":false,"t":"`$BOOLEAN`","key$":"change_owner","index$":3},"created_at":{"a":true,"h":"Created At","n":"created_at","r":true,"t":"`$STRING`","key$":"created_at","index$":4},"currency":{"a":true,"h":"Currency","n":"currency","r":false,"t":"`$STRING`","key$":"currency","index$":5},"duration":{"a":true,"h":"Duration","n":"duration","r":false,"t":"`$INTEGER`","key$":"duration","index$":6},"enforce_premium":{"a":true,"h":"Enforce Premium","n":"enforce_premium","r":false,"t":"`$BOOLEAN`","key$":"enforce_premium","index$":7},"errors":{"a":true,"h":"Errors","n":"errors","r":false,"t":"`$ARRAY`","key$":"errors","index$":8},"errortype":{"a":true,"h":"Errortype","n":"errortype","r":false,"t":"`$STRING`","key$":"errortype","index$":9},"errortype_label":{"a":true,"h":"Errortype Label","n":"errortype_label","r":false,"t":"`$STRING`","key$":"errortype_label","index$":10},"extra_parameters":{"a":true,"h":"Extra Parameters","n":"extra_parameters","r":false,"t":"`$OBJECT`","key$":"extra_parameters","index$":11},"foa":{"a":true,"h":"Foa","n":"foa","r":false,"t":"`$ARRAY`","key$":"foa","index$":12},"fqdn":{"a":true,"h":"Fqdn","n":"fqdn","r":true,"t":"`$STRING`","key$":"fqdn","index$":13},"inner_step":{"a":true,"h":"Inner Step","n":"inner_step","r":false,"t":"`$STRING`","key$":"inner_step","index$":14},"mailbox_optin":{"a":true,"h":"Mailbox Optin","n":"mailbox_optin","r":false,"t":"`$BOOLEAN`","key$":"mailbox_optin","index$":15},"message":{"a":true,"h":"Message","n":"message","r":true,"t":"`$STRING`","key$":"message","index$":16},"nameservers":{"a":true,"h":"Nameservers","n":"nameservers","r":false,"t":"`$ARRAY`","key$":"nameservers","index$":17},"nameservers_ips":{"a":true,"h":"Nameservers Ips","n":"nameservers_ips","r":false,"t":"`$OBJECT`","key$":"nameservers_ips","index$":18},"owner":{"a":true,"h":"Owner","n":"owner","r":true,"t":"`$OBJECT`","key$":"owner","index$":19},"owner_contact":{"a":true,"h":"Owner Contact","n":"owner_contact","r":true,"t":"`$STRING`","key$":"owner_contact","index$":20},"params":{"a":true,"h":"Params","n":"params","r":true,"t":"`$OBJECT`","key$":"params","index$":21},"price":{"a":true,"h":"Price","n":"price","r":false,"t":"`$NUMBER`","key$":"price","index$":22},"regac_at":{"a":true,"h":"Regac At","n":"regac_at","r":false,"t":"`$STRING`","key$":"regac_at","index$":23},"resellee_id":{"a":true,"h":"Resellee Id","n":"resellee_id","r":false,"t":"`$STRING`","key$":"resellee_id","index$":24},"start_at":{"a":true,"h":"Start At","n":"start_at","r":false,"t":"`$STRING`","key$":"start_at","index$":25},"status":{"a":true,"h":"Status","n":"status","r":true,"t":"`$STRING`","key$":"status","index$":26},"step":{"a":true,"h":"Step","n":"step","r":true,"t":"`$STRING`","key$":"step","index$":27},"step_nb":{"a":true,"h":"Step Nb","n":"step_nb","r":true,"t":"`$INTEGER`","key$":"step_nb","index$":28},"tech":{"a":true,"h":"Tech","n":"tech","r":true,"t":"`$OBJECT`","key$":"tech","index$":29},"template_id":{"a":true,"h":"Template Id","n":"template_id","r":false,"t":"`$STRING`","key$":"template_id","index$":30},"transfer_link":{"a":true,"h":"Transfer Link","n":"transfer_link","r":false,"t":"`$STRING`","key$":"transfer_link","index$":31},"transfer_procedure":{"a":true,"h":"Transfer Procedure","n":"transfer_procedure","r":false,"t":"`$STRING`","key$":"transfer_procedure","index$":32},"updated_at":{"a":true,"h":"Updated At","n":"updated_at","r":true,"t":"`$STRING`","key$":"updated_at","index$":33}},"name":"domain_transfer","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["authinfo"],"co":{"id":"POST /domain/transferin/{domain}/available","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"domain","or":"domain","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/domain/transferin/{domain}/available","q":{"$action":"available","exist":["domain"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"domain"},{"lit":"transferin"},{"var":"domain"},{"lit":"available"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"bf":["email"],"co":{"id":"POST /domain/transferin/{domain}/foa","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"domain","or":"domain","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/domain/transferin/{domain}/foa","q":{"$action":"foa","exist":["domain"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"domain"},{"lit":"transferin"},{"var":"domain"},{"lit":"foa"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"bf":["admin","authinfo","bill","change_owner","currency","duration","enforce_premium","extra_parameters","fqdn","mailbox_optin","nameservers","nameservers_ips","owner","price","resellee_id","tech","template_id"],"co":{"id":"POST /domain/transferin","source":"openapi3","version":2},"g":{"header":[{"a":true,"explode":false,"k":"header","n":"dry_run","or":"Dry-Run","r":false,"style":"simple","t":"`$INTEGER`","index$":0}],"query":[{"a":true,"explode":true,"k":"query","n":"sharing_id","or":"sharing_id","r":false,"style":"form","t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/domain/transferin","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"domain"},{"lit":"transferin"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /domain/transferin/{domain}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"domain","or":"domain","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/domain/transferin/{domain}","q":{"exist":["domain"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"domain"},{"lit":"transferin"},{"var":"domain"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"update":{"input":"data","name":"update","points":[{"a":true,"co":{"id":"PUT /domain/transferin/{domain}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"domain","or":"domain","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PUT","o":"/domain/transferin/{domain}","q":{"exist":["domain"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"domain"},{"lit":"transferin"},{"var":"domain"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"bf":["authinfo"],"co":{"id":"PUT /domain/transferin/{domain}/authinfo","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"domain","or":"domain","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"explode":true,"k":"query","n":"sharing_id","or":"sharing_id","r":false,"style":"form","t":"`$STRING`","index$":0}]},"k":"http","m":"PUT","o":"/domain/transferin/{domain}/authinfo","q":{"$action":"authinfo","exist":["domain"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"domain"},{"lit":"transferin"},{"var":"domain"},{"lit":"authinfo"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"domain_transfer","name__orig":"domain_transfer","Name":"DomainTransfer","name_":"domain_transfer","name-":"domain-transfer","NAME":"DOMAIN_TRANSFER","index$":24}, {"active":true,"entity":"domain_transfer","key$":"BasicDomainTransferFlow","kind":"basic","name":"BasicDomainTransferFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"domain_transfer_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":false,"d":{},"i":{"ref":"domain_transfer_ref01","srcdatavar":"domain_transfer_ref01_data","suffix":"_up0","textfield":"authinfo"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-domain_transfer_ref01"}}],"v":[],"unreachable":true},{"a":false,"d":{},"i":{"ref":"domain_transfer_ref01","srcdatavar":"domain_transfer_ref01_data","suffix":"_dt0"},"m":{"id":"domain_transfer01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-domain_transfer_ref01"}}],"unreachable":true}]}, 'DomainTransfer', {"POST /domain/transferin/{domain}/available":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"authinfo":{"type":"string"}}}}}},"parameters":[{"name":"domain","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"POST /domain/transferin/{domain}/foa":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"email":{"type":"string"}},"required":["email"]}}}},"parameters":[{"name":"domain","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"POST /domain/transferin":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"fqdn":{"type":"string","key$":"fqdn"},"owner":{"type":"object","properties":{"country":{"type":"string"},"email":{"type":"string"},"family":{"type":"string"},"given":{"type":"string"},"streetaddr":{"type":"string"},"type":{"type":"string","enum":["individual","company","association","publicbody"]},"brand_number":{"type":"string"},"city":{"type":"string"},"data_obfuscated":{"type":"boolean","default":true},"extra_parameters":{"type":"object"},"fax":{"type":"string"},"jo_announce_number":{"type":"string"},"jo_announce_page":{"type":"string"},"jo_declaration_date":{"type":"string"},"jo_publication_date":{"type":"string"},"lang":{"type":"string","enum":["en","es","fr","ja","zh-hans","zh-hant"]},"mail_obfuscated":{"type":"boolean"},"mobile":{"type":"string"},"orgname":{"type":"string"},"phone":{"type":"string"},"siren":{"type":"string"},"state":{"type":"string"},"validation":{"type":"string","enum":["pending","done","failed","deleted","none"]},"zip":{"type":"string"}},"required":["country","email","family","given","streetaddr","type"],"key$":"owner"},"admin":{"type":"object","properties":{"country":{"type":"string"},"email":{"type":"string"},"family":{"type":"string"},"given":{"type":"string"},"streetaddr":{"type":"string"},"type":{"type":"string","enum":["individual","company","association","publicbody"]},"brand_number":{"type":"string"},"city":{"type":"string"},"data_obfuscated":{"type":"boolean","default":true},"extra_parameters":{"type":"object"},"fax":{"type":"string"},"jo_announce_number":{"type":"string"},"jo_announce_page":{"type":"string"},"jo_declaration_date":{"type":"string"},"jo_publication_date":{"type":"string"},"lang":{"type":"string","enum":["en","es","fr","ja","zh-hans","zh-hant"]},"mail_obfuscated":{"type":"boolean"},"mobile":{"type":"string"},"orgname":{"type":"string"},"phone":{"type":"string"},"siren":{"type":"string"},"state":{"type":"string"},"validation":{"type":"string","enum":["pending","done","failed","deleted","none"]},"zip":{"type":"string"}},"required":["country","email","family","given","streetaddr","type"],"key$":"admin"},"authinfo":{"type":"string","key$":"authinfo"},"bill":{"type":"object","properties":{"country":{"type":"string"},"email":{"type":"string"},"family":{"type":"string"},"given":{"type":"string"},"streetaddr":{"type":"string"},"type":{"type":"string","enum":["individual","company","association","publicbody"]},"brand_number":{"type":"string"},"city":{"type":"string"},"data_obfuscated":{"type":"boolean","default":true},"extra_parameters":{"type":"object"},"fax":{"type":"string"},"jo_announce_number":{"type":"string"},"jo_announce_page":{"type":"string"},"jo_declaration_date":{"type":"string"},"jo_publication_date":{"type":"string"},"lang":{"type":"string","enum":["en","es","fr","ja","zh-hans","zh-hant"]},"mail_obfuscated":{"type":"boolean"},"mobile":{"type":"string"},"orgname":{"type":"string"},"phone":{"type":"string"},"siren":{"type":"string"},"state":{"type":"string"},"validation":{"type":"string","enum":["pending","done","failed","deleted","none"]},"zip":{"type":"string"}},"required":["country","email","family","given","streetaddr","type"],"key$":"bill"},"change_owner":{"type":"boolean","key$":"change_owner"},"currency":{"type":"string","enum":["EUR","USD","GBP","TWD","CNY"],"key$":"currency"},"duration":{"type":"integer","minimum":1,"maximum":10,"key$":"duration"},"enforce_premium":{"type":"boolean","key$":"enforce_premium"},"extra_parameters":{"type":"object","key$":"extra_parameters"},"mailbox_optin":{"type":"boolean","default":true,"key$":"mailbox_optin"},"nameservers":{"type":"array","items":{"type":"string"},"key$":"nameservers"},"nameservers_ips":{"type":"object","key$":"nameservers_ips"},"price":{"type":"number","key$":"price"},"resellee_id":{"type":"string","key$":"resellee_id"},"tech":{"type":"object","properties":{"country":{"type":"string"},"email":{"type":"string"},"family":{"type":"string"},"given":{"type":"string"},"streetaddr":{"type":"string"},"type":{"type":"string","enum":["individual","company","association","publicbody"]},"brand_number":{"type":"string"},"city":{"type":"string"},"data_obfuscated":{"type":"boolean","default":true},"extra_parameters":{"type":"object"},"fax":{"type":"string"},"jo_announce_number":{"type":"string"},"jo_announce_page":{"type":"string"},"jo_declaration_date":{"type":"string"},"jo_publication_date":{"type":"string"},"lang":{"type":"string","enum":["en","es","fr","ja","zh-hans","zh-hant"]},"mail_obfuscated":{"type":"boolean"},"mobile":{"type":"string"},"orgname":{"type":"string"},"phone":{"type":"string"},"siren":{"type":"string"},"state":{"type":"string"},"validation":{"type":"string","enum":["pending","done","failed","deleted","none"]},"zip":{"type":"string"}},"required":["country","email","family","given","streetaddr","type"],"key$":"tech"},"template_id":{"type":"string","key$":"template_id"}},"required":["fqdn","owner"]}}}},"parameters":[{"name":"sharing_id","in":"query","schema":{"type":"string"},"index$":0},{"name":"Dry-Run","in":"header","schema":{"type":"integer"},"index$":1}]},"GET /domain/transferin/{domain}":{"protocol":"http","parameters":[{"name":"domain","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"PUT /domain/transferin/{domain}":{"protocol":"http","parameters":[{"name":"domain","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"PUT /domain/transferin/{domain}/authinfo":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"authinfo":{"type":"string"}},"required":["authinfo"]}}}},"parameters":[{"name":"domain","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"sharing_id","in":"query","schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"domain_transfer.create.0":"GET-only live run: needs POST /domain/transferin/{domain}/available","domain_transfer.update.1":"GET-only live run: needs PUT /domain/transferin/{domain}"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const domain_transfer_ref01_ent = client.DomainTransfer()
    let domain_transfer_ref01_data = setup.data.new.domain_transfer['domain_transfer_ref01']

    domain_transfer_ref01_data = (await domain_transfer_ref01_ent.create(domain_transfer_ref01_data)).data()
    assert(null != domain_transfer_ref01_data)


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
      '../../../../.sdk/test/entity/domain_transfer/DomainTransferTestData.json')

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
    ['domain_transfer01','domain_transfer02','domain_transfer03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'GANDI_TEST_DOMAIN_TRANSFER_ENTID': idmap,
    'GANDI_TEST_LIVE': 'FALSE',
    'GANDI_TEST_EXPLAIN': 'FALSE',
    'GANDI_APIKEY': '',
  })

  idmap = env['GANDI_TEST_DOMAIN_TRANSFER_ENTID']

  const live = 'TRUE' === env.GANDI_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['GANDI_TEST_DOMAIN_TRANSFER_ENTID']
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
  
