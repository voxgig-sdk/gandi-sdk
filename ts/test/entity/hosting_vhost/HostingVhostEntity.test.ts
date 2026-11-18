

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


describe('HostingVhostEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when GANDI_TEST_LIVE=TRUE.
  afterEach(liveDelay('GANDI_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = GandiSDK.test()
    const ent = testsdk.HostingVhost()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = GandiSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.HostingVhost().list({"instance_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.GANDI_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'hosting_vhost.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"application":{"a":true,"h":"Application","n":"application","r":true,"t":"`$OBJECT`","key$":"application","index$":0},"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":true,"t":"`$STRING`","key$":"created_at","index$":1},"deployment":{"a":true,"h":"Deployment","n":"deployment","r":true,"t":"`$OBJECT`","key$":"deployment","index$":2},"fqdn":{"a":true,"h":"Fqdn","n":"fqdn","r":true,"t":"`$STRING`","key$":"fqdn","index$":3},"https_strategy":{"a":true,"h":"Https Strategy","n":"https_strategy","op":{"create":{"req":true,"type":"`$STRING`"}},"r":false,"t":"`$STRING`","key$":"https_strategy","index$":4},"is_a_test_vhost":{"a":true,"h":"Is A Test Vhost","n":"is_a_test_vhost","r":true,"t":"`$BOOLEAN`","key$":"is_a_test_vhost","index$":5},"linked_dns_zone":{"a":true,"h":"Linked Dns Zone","n":"linked_dns_zone","r":true,"t":"`$OBJECT`","key$":"linked_dns_zone","index$":6},"status":{"a":true,"h":"Status","n":"status","r":true,"t":"`$STRING`","key$":"status","index$":7},"tls_validated_at":{"a":true,"fo":"date-time","h":"Tls Validated At","n":"tls_validated_at","r":false,"t":"`$STRING`","key$":"tls_validated_at","index$":8}},"name":"hosting_vhost","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["application","fqdn","linked_dns_zone"],"co":{"id":"POST /simplehosting/instances/{instance_id}/vhosts","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"instance_id","or":"instance_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/simplehosting/instances/{instance_id}/vhosts","q":{"exist":["instance_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"simplehosting"},{"lit":"instances"},{"var":"instance_id"},{"lit":"vhosts"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /simplehosting/instances/{instance_id}/vhosts","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"instance_id","or":"instance_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"explode":true,"k":"query","n":"fqdn","or":"fqdn","r":false,"style":"form","t":"`$STRING`","index$":0},{"a":true,"ex":1,"explode":true,"k":"query","n":"page","or":"page","r":false,"style":"form","t":"`$INTEGER`","index$":1},{"a":true,"explode":true,"k":"query","n":"per_page","or":"per_page","r":false,"style":"form","t":"`$INTEGER`","index$":2},{"a":true,"ex":"-created_at","explode":true,"k":"query","n":"sort_by","or":"sort_by","r":false,"style":"form","t":"`$STRING`","index$":3},{"a":true,"explode":true,"k":"query","n":"status","or":"status","r":false,"style":"form","t":"`$STRING`","index$":4}]},"k":"http","m":"GET","o":"/simplehosting/instances/{instance_id}/vhosts","q":{"exist":["instance_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"simplehosting"},{"lit":"instances"},{"var":"instance_id"},{"lit":"vhosts"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /simplehosting/instances/{instance_id}/vhosts/{vhost_fqdn}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"fqdn","or":"vhost_fqdn","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"instance_id","or":"instance_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/simplehosting/instances/{instance_id}/vhosts/{vhost_fqdn}","q":{"exist":["fqdn","instance_id"]},"r":{"param":{"vhost_fqdn":"fqdn"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"simplehosting"},{"lit":"instances"},{"var":"instance_id"},{"lit":"vhosts"},{"var":"fqdn"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /simplehosting/instances/{instance_id}/vhosts/{vhost_fqdn}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"fqdn","or":"vhost_fqdn","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"instance_id","or":"instance_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"DELETE","o":"/simplehosting/instances/{instance_id}/vhosts/{vhost_fqdn}","q":{"exist":["fqdn","instance_id"]},"r":{"param":{"vhost_fqdn":"fqdn"}},"s":[{"lit":"simplehosting"},{"lit":"instances"},{"var":"instance_id"},{"lit":"vhosts"},{"var":"fqdn"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"DELETE /simplehosting/instances/{instance_id}/vhosts/{vhost_fqdn}/cache","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"fqdn","or":"vhost_fqdn","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"instance_id","or":"instance_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"DELETE","o":"/simplehosting/instances/{instance_id}/vhosts/{vhost_fqdn}/cache","q":{"$action":"cache","exist":["fqdn","instance_id"]},"r":{"param":{"vhost_fqdn":"fqdn"}},"s":[{"lit":"simplehosting"},{"lit":"instances"},{"var":"instance_id"},{"lit":"vhosts"},{"var":"fqdn"},{"lit":"cache"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":["application","https_strategy","linked_dns_zone"],"co":{"id":"PATCH /simplehosting/instances/{instance_id}/vhosts/{vhost_fqdn}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"fqdn","or":"vhost_fqdn","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"instance_id","or":"instance_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"PATCH","o":"/simplehosting/instances/{instance_id}/vhosts/{vhost_fqdn}","q":{"exist":["fqdn","instance_id"]},"r":{"param":{"vhost_fqdn":"fqdn"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"simplehosting"},{"lit":"instances"},{"var":"instance_id"},{"lit":"vhosts"},{"var":"fqdn"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"hosting_vhost","name__orig":"hosting_vhost","Name":"HostingVhost","name_":"hosting_vhost","name-":"hosting-vhost","NAME":"HOSTING_VHOST","index$":33}, {"active":true,"entity":"hosting_vhost","key$":"BasicHostingVhostFlow","kind":"basic","name":"BasicHostingVhostFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"hosting_vhost_ref01"},"m":{"instance_id":"instance01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{"instance_id":"instance01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"hosting_vhost_ref01"}}],"index$":1},{"a":true,"d":{"instance_id":"instance01"},"i":{"ref":"hosting_vhost_ref01","srcdatavar":"hosting_vhost_ref01_data","suffix":"_up0","textfield":"created_at"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-hosting_vhost_ref01"}}],"v":[],"index$":2},{"a":true,"d":{},"i":{"ref":"hosting_vhost_ref01","srcdatavar":"hosting_vhost_ref01_data","suffix":"_dt0"},"m":{"id":"hosting_vhost01","instance_id":"instance01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-hosting_vhost_ref01"}}],"index$":3},{"a":true,"d":{},"i":{"ref":"hosting_vhost_ref01","suffix":"_rm0"},"m":{"id":"hosting_vhost01","instance_id":"instance01"},"o":"remove","s":[],"v":[],"index$":4},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{"instance_id":"instance01"},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"hosting_vhost_ref01"}}],"index$":5}]}, 'HostingVhost', {"POST /simplehosting/instances/{instance_id}/vhosts":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"fqdn":{"type":"string","key$":"fqdn"},"application":{"type":"object","properties":{"name":{"type":"string"},"parameters":{"type":"object"}},"required":["name"],"key$":"application"},"linked_dns_zone":{"type":"object","properties":{"allow_alteration":{"type":"boolean"},"allow_alteration_override":{"type":"boolean","default":false}},"required":["allow_alteration"],"key$":"linked_dns_zone"}},"required":["fqdn"]}}}},"parameters":[{"name":"instance_id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"GET /simplehosting/instances/{instance_id}/vhosts":{"protocol":"http","parameters":[{"name":"instance_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"fqdn","in":"query","schema":{"type":"string"},"index$":1},{"name":"page","in":"query","schema":{"type":"integer","default":1,"minimum":1},"index$":2},{"name":"per_page","in":"query","schema":{"type":"integer","minimum":1},"index$":3},{"name":"sort_by","in":"query","schema":{"type":"string","default":"-created_at"},"index$":4},{"name":"status","in":"query","schema":{"type":"string","enum":["being_created","running","being_deleted","locked","waiting_ownership","ownership_validated","validation_failed"]},"index$":5}]},"GET /simplehosting/instances/{instance_id}/vhosts/{vhost_fqdn}":{"protocol":"http","parameters":[{"name":"instance_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"vhost_fqdn","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"DELETE /simplehosting/instances/{instance_id}/vhosts/{vhost_fqdn}":{"protocol":"http","parameters":[{"name":"instance_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"vhost_fqdn","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"DELETE /simplehosting/instances/{instance_id}/vhosts/{vhost_fqdn}/cache":{"protocol":"http","parameters":[{"name":"instance_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"vhost_fqdn","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"PATCH /simplehosting/instances/{instance_id}/vhosts/{vhost_fqdn}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"application":{"type":"object","properties":{"name":{"type":"string"},"parameters":{"type":"object"}},"required":["name"],"key$":"application"},"https_strategy":{"type":"string","enum":["HTTP_only","allow_HTTP_and_HTTPS","redirect_HTTP_to_HTTPS"],"key$":"https_strategy"},"linked_dns_zone":{"type":"object","properties":{"allow_alteration":{"type":"boolean"},"allow_alteration_override":{"type":"boolean","default":false}},"required":["allow_alteration"],"key$":"linked_dns_zone"}}}}}},"parameters":[{"name":"instance_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"vhost_fqdn","in":"path","required":true,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"hosting_vhost.create.0":"GET-only live run: needs POST /simplehosting/instances/{instance_id}/vhosts","hosting_vhost.update.2":"GET-only live run: needs PATCH /simplehosting/instances/{instance_id}/vhosts/{vhost_fqdn}","hosting_vhost.remove.4":"GET-only live run: needs DELETE /simplehosting/instances/{instance_id}/vhosts/{vhost_fqdn}"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const hosting_vhost_ref01_ent = client.HostingVhost()
    let hosting_vhost_ref01_data = setup.data.new.hosting_vhost['hosting_vhost_ref01']
    hosting_vhost_ref01_data['instance_id'] = setup.idmap['instance01']

    hosting_vhost_ref01_data = (await hosting_vhost_ref01_ent.create(hosting_vhost_ref01_data)).data()
    assert(null != hosting_vhost_ref01_data)


    // LIST
    const hosting_vhost_ref01_match: any = {}
    hosting_vhost_ref01_match['instance_id'] = setup.idmap['instance01']

    const hosting_vhost_ref01_list = (await hosting_vhost_ref01_ent.list(hosting_vhost_ref01_match)).map((e: any) => e.data())


    // UPDATE
    const hosting_vhost_ref01_data_up0: any = {}
    hosting_vhost_ref01_data_up0['instance_id'] = setup.idmap['instance_id'] ?? setup.idmap['instance01']

    const hosting_vhost_ref01_markdef_up0 = { name: 'created_at', value: 'Mark01-hosting_vhost_ref01_' + setup.now }
    ;(hosting_vhost_ref01_data_up0 as any)[hosting_vhost_ref01_markdef_up0.name] = hosting_vhost_ref01_markdef_up0.value

    const hosting_vhost_ref01_resdata_up0 = (await hosting_vhost_ref01_ent.update(hosting_vhost_ref01_data_up0)).data()
    assert(null != hosting_vhost_ref01_resdata_up0)

    assert((hosting_vhost_ref01_resdata_up0 as any)[hosting_vhost_ref01_markdef_up0.name] === hosting_vhost_ref01_markdef_up0.value)




    // LIST
    const hosting_vhost_ref01_match_rt0: any = {}
    hosting_vhost_ref01_match_rt0['instance_id'] = setup.idmap['instance01']

    const hosting_vhost_ref01_list_rt0 = (await hosting_vhost_ref01_ent.list(hosting_vhost_ref01_match_rt0)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/hosting_vhost/HostingVhostTestData.json')

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
    ['hosting_vhost01','hosting_vhost02','hosting_vhost03','instance01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'GANDI_TEST_HOSTING_VHOST_ENTID': idmap,
    'GANDI_TEST_LIVE': 'FALSE',
    'GANDI_TEST_EXPLAIN': 'FALSE',
    'GANDI_APIKEY': '',
  })

  idmap = env['GANDI_TEST_HOSTING_VHOST_ENTID']

  const live = 'TRUE' === env.GANDI_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['GANDI_TEST_HOSTING_VHOST_ENTID']
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
  
