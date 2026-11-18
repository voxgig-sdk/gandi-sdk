
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { GandiSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = GandiSDK.test()
    equal(testsdk instanceof GandiSDK, true,
      'GandiSDK.test() must return a client synchronously')
  })

})
