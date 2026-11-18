

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


describe('LivednsRecordEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when GANDI_TEST_LIVE=TRUE.
  afterEach(liveDelay('GANDI_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = GandiSDK.test()
    const ent = testsdk.LivednsRecord()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = GandiSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.LivednsRecord().list({"fqdn":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.GANDI_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'livedns_record.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"add_rrset_values":{"a":true,"h":"Add Rrset Values","n":"add_rrset_values","r":false,"t":"`$ARRAY`","key$":"add_rrset_values","index$":0},"id":{"a":true,"h":"Id","n":"id","r":false,"syn":true,"t":"`$STRING`","key$":"id","index$":1},"message":{"a":true,"h":"Message","n":"message","r":true,"t":"`$STRING`","key$":"message","index$":2},"remove_rrset_values":{"a":true,"h":"Remove Rrset Values","n":"remove_rrset_values","r":false,"t":"`$ARRAY`","key$":"remove_rrset_values","index$":3},"rrset_href":{"a":true,"h":"Rrset Href","n":"rrset_href","r":true,"t":"`$STRING`","key$":"rrset_href","index$":4},"rrset_name":{"a":true,"h":"Rrset Name","n":"rrset_name","r":true,"t":"`$STRING`","key$":"rrset_name","index$":5},"rrset_ttl":{"a":true,"h":"Rrset Ttl","n":"rrset_ttl","r":false,"t":"`$INTEGER`","key$":"rrset_ttl","index$":6},"rrset_type":{"a":true,"h":"Rrset Type","n":"rrset_type","r":true,"t":"`$STRING`","key$":"rrset_type","index$":7},"rrset_values":{"a":true,"h":"Rrset Values","n":"rrset_values","r":true,"t":"`$ARRAY`","key$":"rrset_values","index$":8}},"id":{"field":"id","from":{"rrset_name":"rrset_name","rrset_type":"rrset_type"},"name":"id","parts":["rrset_name","rrset_type"],"sep":"/"},"name":"livedns_record","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["rrset_ttl","rrset_values"],"co":{"id":"POST /livedns/domains/{fqdn}/records/{rrset_name}/{rrset_type}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"fqdn","or":"fqdn","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"rrset_name","or":"rrset_name","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"rrset_type","or":"rrset_type","r":true,"t":"`$STRING`","index$":2,"ex":"A"}]},"k":"http","m":"POST","o":"/livedns/domains/{fqdn}/records/{rrset_name}/{rrset_type}","q":{"exist":["fqdn","rrset_name","rrset_type"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"livedns"},{"lit":"domains"},{"var":"fqdn"},{"lit":"records"},{"var":"rrset_name"},{"var":"rrset_type"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"bf":["rrset_values"],"co":{"id":"POST /livedns/domains/{fqdn}/verification/{rrset_name}/{rrset_type}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"fqdn","or":"fqdn","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"rrset_name","or":"rrset_name","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"rrset_type","or":"rrset_type","r":true,"t":"`$STRING`","index$":2,"ex":"TXT"}]},"k":"http","m":"POST","o":"/livedns/domains/{fqdn}/verification/{rrset_name}/{rrset_type}","q":{"$action":"verification","exist":["fqdn","rrset_name","rrset_type"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"livedns"},{"lit":"domains"},{"var":"fqdn"},{"lit":"verification"},{"var":"rrset_name"},{"var":"rrset_type"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"bf":["rrset_ttl","rrset_type","rrset_values"],"co":{"id":"POST /livedns/domains/{fqdn}/records/{rrset_name}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"fqdn","or":"fqdn","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"rrset_name","or":"rrset_name","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/livedns/domains/{fqdn}/records/{rrset_name}","q":{"$action":"name","exist":["fqdn","rrset_name"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"livedns"},{"lit":"domains"},{"var":"fqdn"},{"lit":"records"},{"var":"rrset_name"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2},{"a":true,"bf":["rrset_name","rrset_ttl","rrset_type","rrset_values"],"co":{"id":"POST /livedns/domains/{fqdn}/records","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"fqdn","or":"fqdn","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/livedns/domains/{fqdn}/records","q":{"exist":["fqdn"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"livedns"},{"lit":"domains"},{"var":"fqdn"},{"lit":"records"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":3}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /livedns/domains/{fqdn}/records/{rrset_name}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"fqdn","or":"fqdn","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"rrset_name","or":"rrset_name","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/livedns/domains/{fqdn}/records/{rrset_name}","q":{"$action":"name","exist":["fqdn","rrset_name"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"livedns"},{"lit":"domains"},{"var":"fqdn"},{"lit":"records"},{"var":"rrset_name"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /livedns/domains/{fqdn}/records","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"fqdn","or":"fqdn","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":1,"explode":true,"k":"query","n":"page","or":"page","r":false,"style":"form","t":"`$INTEGER`","index$":0},{"a":true,"explode":true,"k":"query","n":"per_page","or":"per_page","r":false,"style":"form","t":"`$INTEGER`","index$":1},{"a":true,"explode":true,"k":"query","n":"rrset_type","or":"rrset_type","r":false,"style":"form","t":"`$STRING`","index$":2},{"a":true,"ex":"rrset_name","explode":true,"k":"query","n":"sort_by","or":"sort_by","r":false,"style":"form","t":"`$STRING`","index$":3}]},"k":"http","m":"GET","o":"/livedns/domains/{fqdn}/records","q":{"exist":["fqdn"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"livedns"},{"lit":"domains"},{"var":"fqdn"},{"lit":"records"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /livedns/domains/{fqdn}/records/{rrset_name}/{rrset_type}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"fqdn","or":"fqdn","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"rrset_name","or":"rrset_name","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"rrset_type","or":"rrset_type","r":true,"t":"`$STRING`","index$":2,"ex":"A"}]},"k":"http","m":"GET","o":"/livedns/domains/{fqdn}/records/{rrset_name}/{rrset_type}","q":{"exist":["fqdn","rrset_name","rrset_type"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"livedns"},{"lit":"domains"},{"var":"fqdn"},{"lit":"records"},{"var":"rrset_name"},{"var":"rrset_type"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"patch":{"input":"data","name":"patch","points":[{"a":true,"bf":["add_rrset_values","remove_rrset_values","rrset_ttl"],"co":{"id":"PATCH /livedns/domains/{fqdn}/records/{rrset_name}/{rrset_type}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"fqdn","or":"fqdn","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"rrset_name","or":"rrset_name","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"rrset_type","or":"rrset_type","r":true,"t":"`$STRING`","index$":2,"ex":"A"}]},"k":"http","m":"PATCH","o":"/livedns/domains/{fqdn}/records/{rrset_name}/{rrset_type}","q":{"exist":["fqdn","rrset_name","rrset_type"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"livedns"},{"lit":"domains"},{"var":"fqdn"},{"lit":"records"},{"var":"rrset_name"},{"var":"rrset_type"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"patch"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /livedns/domains/{fqdn}/records/{rrset_name}/{rrset_type}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"fqdn","or":"fqdn","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"rrset_name","or":"rrset_name","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"rrset_type","or":"rrset_type","r":true,"t":"`$STRING`","index$":2,"ex":"A"}]},"k":"http","m":"DELETE","o":"/livedns/domains/{fqdn}/records/{rrset_name}/{rrset_type}","q":{"exist":["fqdn","rrset_name","rrset_type"]},"r":{},"s":[{"lit":"livedns"},{"lit":"domains"},{"var":"fqdn"},{"lit":"records"},{"var":"rrset_name"},{"var":"rrset_type"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"DELETE /livedns/domains/{fqdn}/records/{rrset_name}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"fqdn","or":"fqdn","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"rrset_name","or":"rrset_name","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"DELETE","o":"/livedns/domains/{fqdn}/records/{rrset_name}","q":{"$action":"name","exist":["fqdn","rrset_name"]},"r":{},"s":[{"lit":"livedns"},{"lit":"domains"},{"var":"fqdn"},{"lit":"records"},{"var":"rrset_name"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":["rrset_ttl","rrset_values"],"co":{"id":"PUT /livedns/domains/{fqdn}/records/{rrset_name}/{rrset_type}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"fqdn","or":"fqdn","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"rrset_name","or":"rrset_name","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"rrset_type","or":"rrset_type","r":true,"t":"`$STRING`","index$":2,"ex":"A"}]},"k":"http","m":"PUT","o":"/livedns/domains/{fqdn}/records/{rrset_name}/{rrset_type}","q":{"exist":["fqdn","rrset_name","rrset_type"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"livedns"},{"lit":"domains"},{"var":"fqdn"},{"lit":"records"},{"var":"rrset_name"},{"var":"rrset_type"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"bf":["items"],"co":{"id":"PUT /livedns/domains/{fqdn}/records/{rrset_name}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"fqdn","or":"fqdn","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"rrset_name","or":"rrset_name","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"PUT","o":"/livedns/domains/{fqdn}/records/{rrset_name}","q":{"$action":"name","exist":["fqdn","rrset_name"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"livedns"},{"lit":"domains"},{"var":"fqdn"},{"lit":"records"},{"var":"rrset_name"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"update"}},"relations":{"ancestors":[["$.main.kit.entity.domain"],["$.main.kit.entity.domain"],["$.main.kit.entity.domain"]]},"key$":"livedns_record","name__orig":"livedns_record","Name":"LivednsRecord","name_":"livedns_record","name-":"livedns-record","NAME":"LIVEDNS_RECORD","index$":44}, {"active":true,"entity":"livedns_record","key$":"BasicLivednsRecordFlow","kind":"basic","name":"BasicLivednsRecordFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"livedns_record_ref01"},"m":{"fqdn":"fqdn01","rrset_name":"rrset_name01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{"fqdn":"fqdn01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"livedns_record_ref01"}}],"index$":1},{"a":true,"d":{"fqdn":"fqdn01"},"i":{"ref":"livedns_record_ref01","srcdatavar":"livedns_record_ref01_data","suffix":"_up0","textfield":"message"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-livedns_record_ref01"}}],"v":[],"index$":2},{"a":true,"d":{},"i":{"ref":"livedns_record_ref01","srcdatavar":"livedns_record_ref01_data","suffix":"_dt0"},"m":{"fqdn":"fqdn01","id":"livedns_record01","rrset_name":"rrset_name01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-livedns_record_ref01"}}],"index$":3},{"a":true,"d":{},"i":{"ref":"livedns_record_ref01","suffix":"_rm0"},"m":{"fqdn":"fqdn01","id":"livedns_record01"},"o":"remove","s":[],"v":[],"index$":4},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{"fqdn":"fqdn01"},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"livedns_record_ref01"}}],"index$":5}]}, 'LivednsRecord', {"POST /livedns/domains/{fqdn}/records/{rrset_name}/{rrset_type}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"rrset_values":{"type":"array","items":{"type":"string"},"key$":"rrset_values"},"rrset_ttl":{"type":"integer","minimum":300,"maximum":2592000,"key$":"rrset_ttl"}},"required":["rrset_values"]}}}},"parameters":[{"name":"fqdn","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"rrset_name","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"rrset_type","in":"path","required":true,"schema":{"type":"string","enum":["A","AAAA","ALIAS","CAA","CDS","CNAME","DNAME","DS","HTTPS","KEY","LOC","MX","NAPTR","NS","OPENPGPKEY","PTR","RP","SOA","SPF","SRV","SSHFP","SVCB","TLSA","TXT","WKS"]},"index$":2}]},"POST /livedns/domains/{fqdn}/verification/{rrset_name}/{rrset_type}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"rrset_values":{"type":"array","items":{"type":"string"},"minItems":1}},"required":["rrset_values"]}}}},"parameters":[{"name":"fqdn","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"rrset_name","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"rrset_type","in":"path","required":true,"schema":{"type":"string","enum":["TXT","CNAME"]},"index$":2}]},"POST /livedns/domains/{fqdn}/records/{rrset_name}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"rrset_type":{"type":"string","enum":["A","AAAA","ALIAS","CAA","CDS","CNAME","DNAME","DS","HTTPS","KEY","LOC","MX","NAPTR","NS","OPENPGPKEY","PTR","RP","SOA","SPF","SRV","SSHFP","SVCB","TLSA","TXT","WKS"]},"rrset_values":{"type":"array","items":{"type":"string"}},"rrset_ttl":{"type":"integer","minimum":300,"maximum":2592000}},"required":["rrset_type","rrset_values"]}}}},"parameters":[{"name":"fqdn","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"rrset_name","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"POST /livedns/domains/{fqdn}/records":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"rrset_name":{"type":"string","key$":"rrset_name"},"rrset_type":{"type":"string","enum":["A","AAAA","ALIAS","CAA","CDS","CNAME","DNAME","DS","HTTPS","KEY","LOC","MX","NAPTR","NS","OPENPGPKEY","PTR","RP","SOA","SPF","SRV","SSHFP","SVCB","TLSA","TXT","WKS"],"key$":"rrset_type"},"rrset_values":{"type":"array","items":{"type":"string"},"key$":"rrset_values"},"rrset_ttl":{"type":"integer","minimum":300,"maximum":2592000,"key$":"rrset_ttl"}},"required":["rrset_name","rrset_type","rrset_values"]}}}},"parameters":[{"name":"fqdn","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"GET /livedns/domains/{fqdn}/records/{rrset_name}":{"protocol":"http","parameters":[{"name":"fqdn","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"rrset_name","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"GET /livedns/domains/{fqdn}/records":{"protocol":"http","parameters":[{"name":"fqdn","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"page","in":"query","schema":{"type":"integer","default":1,"minimum":1},"index$":1},{"name":"per_page","in":"query","schema":{"type":"integer","minimum":1},"index$":2},{"name":"rrset_type","in":"query","schema":{"type":"string","enum":["A","AAAA","ALIAS","CAA","CDS","CNAME","DNAME","DS","HTTPS","KEY","LOC","MX","NAPTR","NS","OPENPGPKEY","PTR","RP","SOA","SPF","SRV","SSHFP","SVCB","TLSA","TXT","WKS"]},"index$":3},{"name":"sort_by","in":"query","schema":{"type":"string","default":"rrset_name"},"index$":4}]},"GET /livedns/domains/{fqdn}/records/{rrset_name}/{rrset_type}":{"protocol":"http","parameters":[{"name":"fqdn","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"rrset_name","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"rrset_type","in":"path","required":true,"schema":{"type":"string","enum":["A","AAAA","ALIAS","CAA","CDS","CNAME","DNAME","DS","HTTPS","KEY","LOC","MX","NAPTR","NS","OPENPGPKEY","PTR","RP","SOA","SPF","SRV","SSHFP","SVCB","TLSA","TXT","WKS"]},"index$":2}]},"PATCH /livedns/domains/{fqdn}/records/{rrset_name}/{rrset_type}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"add_rrset_values":{"type":"array","default":[],"items":{"type":"string","maxLength":16384,"pattern":"^[\\x20-\\x7E]+$"},"key$":"add_rrset_values"},"remove_rrset_values":{"type":"array","default":[],"items":{"type":"string","maxLength":16384,"pattern":"^[\\x20-\\x7E]+$"},"key$":"remove_rrset_values"},"rrset_ttl":{"type":"integer","minimum":300,"maximum":2592000,"key$":"rrset_ttl"}}}}}},"parameters":[{"name":"fqdn","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"rrset_name","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"rrset_type","in":"path","required":true,"schema":{"type":"string","enum":["A","AAAA","ALIAS","CAA","CDS","CNAME","DNAME","DS","HTTPS","KEY","LOC","MX","NAPTR","NS","OPENPGPKEY","PTR","RP","SOA","SPF","SRV","SSHFP","SVCB","TLSA","TXT","WKS"]},"index$":2}]},"DELETE /livedns/domains/{fqdn}/records/{rrset_name}/{rrset_type}":{"protocol":"http","parameters":[{"name":"fqdn","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"rrset_name","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"rrset_type","in":"path","required":true,"schema":{"type":"string","enum":["A","AAAA","ALIAS","CAA","CDS","CNAME","DNAME","DS","HTTPS","KEY","LOC","MX","NAPTR","NS","OPENPGPKEY","PTR","RP","SOA","SPF","SRV","SSHFP","SVCB","TLSA","TXT","WKS"]},"index$":2}]},"DELETE /livedns/domains/{fqdn}/records/{rrset_name}":{"protocol":"http","parameters":[{"name":"fqdn","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"rrset_name","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"PUT /livedns/domains/{fqdn}/records/{rrset_name}/{rrset_type}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"rrset_values":{"type":"array","items":{"type":"string"},"key$":"rrset_values"},"rrset_ttl":{"type":"integer","minimum":300,"maximum":2592000,"key$":"rrset_ttl"}},"required":["rrset_values"]}}}},"parameters":[{"name":"fqdn","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"rrset_name","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"rrset_type","in":"path","required":true,"schema":{"type":"string","enum":["A","AAAA","ALIAS","CAA","CDS","CNAME","DNAME","DS","HTTPS","KEY","LOC","MX","NAPTR","NS","OPENPGPKEY","PTR","RP","SOA","SPF","SRV","SSHFP","SVCB","TLSA","TXT","WKS"]},"index$":2}]},"PUT /livedns/domains/{fqdn}/records/{rrset_name}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"items":{"type":"array","items":{"type":"object","properties":{"rrset_type":{"type":"string","enum":[]},"rrset_values":{"type":"array","items":{}},"rrset_ttl":{"type":"integer","minimum":300,"maximum":2592000}},"required":["rrset_type","rrset_values"]}}},"required":["items"]}}}},"parameters":[{"name":"fqdn","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"rrset_name","in":"path","required":true,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"livedns_record.create.0":"GET-only live run: needs POST /livedns/domains/{fqdn}/records/{rrset_name}/{rrset_type}","livedns_record.update.2":"GET-only live run: needs PUT /livedns/domains/{fqdn}/records/{rrset_name}/{rrset_type}","livedns_record.remove.4":"GET-only live run: needs DELETE /livedns/domains/{fqdn}/records/{rrset_name}/{rrset_type}","livedns_record.list.5":"GET-only live run: checks a removal this run does not make"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const livedns_record_ref01_ent = client.LivednsRecord()
    let livedns_record_ref01_data = setup.data.new.livedns_record['livedns_record_ref01']
    livedns_record_ref01_data['fqdn'] = setup.idmap['fqdn01']
    livedns_record_ref01_data['rrset_name'] = setup.idmap['rrset_name01']

    livedns_record_ref01_data = (await livedns_record_ref01_ent.create(livedns_record_ref01_data)).data()
    assert(null != livedns_record_ref01_data.id)


    // LIST
    const livedns_record_ref01_match: any = {}
    livedns_record_ref01_match['fqdn'] = setup.idmap['fqdn01']

    const livedns_record_ref01_list = (await livedns_record_ref01_ent.list(livedns_record_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(livedns_record_ref01_list, { id: livedns_record_ref01_data.id })))


    // UPDATE
    const livedns_record_ref01_data_up0: any = {}
    livedns_record_ref01_data_up0.id = livedns_record_ref01_data.id
    livedns_record_ref01_data_up0['fqdn'] = setup.idmap['fqdn'] ?? setup.idmap['fqdn01']

    const livedns_record_ref01_markdef_up0 = { name: 'message', value: 'Mark01-livedns_record_ref01_' + setup.now }
    ;(livedns_record_ref01_data_up0 as any)[livedns_record_ref01_markdef_up0.name] = livedns_record_ref01_markdef_up0.value

    const livedns_record_ref01_resdata_up0 = (await livedns_record_ref01_ent.update(livedns_record_ref01_data_up0)).data()
    assert(livedns_record_ref01_resdata_up0.id === livedns_record_ref01_data_up0.id)

    assert((livedns_record_ref01_resdata_up0 as any)[livedns_record_ref01_markdef_up0.name] === livedns_record_ref01_markdef_up0.value)


    // LOAD
    const livedns_record_ref01_match_dt0: any = {}
    livedns_record_ref01_match_dt0.id = livedns_record_ref01_data.id
    livedns_record_ref01_match_dt0['fqdn'] = setup.idmap['fqdn'] ?? setup.idmap['fqdn01']
    livedns_record_ref01_match_dt0['rrset_name'] = setup.idmap['rrset_name'] ?? setup.idmap['rrset_name01']
    const livedns_record_ref01_data_dt0 = (await livedns_record_ref01_ent.load(livedns_record_ref01_match_dt0)).data()
    assert(livedns_record_ref01_data_dt0.id === livedns_record_ref01_data.id)


    // REMOVE
    const livedns_record_ref01_match_rm0: any = { id: livedns_record_ref01_data.id }
    livedns_record_ref01_match_rm0['fqdn'] = setup.idmap['fqdn'] ?? setup.idmap['fqdn01']
    await livedns_record_ref01_ent.remove(livedns_record_ref01_match_rm0)
  

    // LIST
    const livedns_record_ref01_match_rt0: any = {}
    livedns_record_ref01_match_rt0['fqdn'] = setup.idmap['fqdn01']

    const livedns_record_ref01_list_rt0 = (await livedns_record_ref01_ent.list(livedns_record_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(livedns_record_ref01_list_rt0, { id: livedns_record_ref01_data.id })))


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
      '../../../../.sdk/test/entity/livedns_record/LivednsRecordTestData.json')

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
    ['livedns_record01','livedns_record02','livedns_record03','domain01','domain02','domain03','fqdn01','rrset_name01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'GANDI_TEST_LIVEDNS_RECORD_ENTID': idmap,
    'GANDI_TEST_LIVE': 'FALSE',
    'GANDI_TEST_EXPLAIN': 'FALSE',
    'GANDI_APIKEY': '',
  })

  idmap = env['GANDI_TEST_LIVEDNS_RECORD_ENTID']

  const live = 'TRUE' === env.GANDI_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['GANDI_TEST_LIVEDNS_RECORD_ENTID']
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
  
