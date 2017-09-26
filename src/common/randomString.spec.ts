import { test } from 'ava'
import {
  MathRandomStringService
} from 'typedeck'

test('generates several unique strings', async t => {
  const service = new MathRandomStringService()
  const strSize = 4
  const randomString1 = service.get(strSize)
  const randomString2 = service.get(strSize)
  const randomString3 = service.get(strSize)
  t.not(randomString1, randomString2)
  t.not(randomString2, randomString3)
})

test('generates strings at requested size', async t => {
  const service = new MathRandomStringService()
  const randomString1 = service.get(3)
  const randomString2 = service.get(6)
  const randomString3 = service.get(20)
  t.is(randomString1.length, 3)
  t.is(randomString2.length, 6)
  t.is(randomString3.length, 20)
})

test('generates strings from charset', async t => {
  const service = new MathRandomStringService()
  let isValid: boolean
  isValid = /^[ABC]+$/.test(service.get(10, 'ABC'))
  t.true(isValid, 'Generated string contained invalid characters')
  isValid = /^[ABC]+$/.test(service.get(10, 'ABC'))
  t.true(isValid, 'Generated string contained invalid characters')
  isValid = /^[ABC]+$/.test(service.get(10, 'ABC'))
  t.true(isValid, 'Generated string contained invalid characters')
})
