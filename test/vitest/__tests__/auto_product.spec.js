import { beforeAll, describe, expect, expectTypeOf, test } from 'vitest'
import { Product } from 'src/models/Product'

const BEFORE_ALL_TIMEOUT = 30000 // 30 sec

describe('Request Earth Polychromatic Imaging Camera', () => {
  let response
  let body

  beforeAll(async () => {
    response = await fetch('https://alaatv.com/alaa/api/v2/product/1919')
    body = await response.json()
  }, BEFORE_ALL_TIMEOUT)

  test('Should have response status 200', () => {
    expect(response.status).toBe(200)
  })

  test('Should have content-type', () => {
    expect(response.headers.get('Content-Type')).toBe('application/json')
  })

  test('Should have array in the body', () => {
    expectTypeOf(body).toBeObject()
  })

  test('Check Model Data', () => {
    const result = new Product(body.data)
    expect(result.isValidData(body.data)).toBe(true)
  })

  test('Check Model Structure', () => {
    const result = new Product(body.data)
    const data = body.data
    const props = result.props
    props.forEach(prop => {
      const key = prop.key
      const val = data[key]
      if (!prop.value) {
        expect(val, key + ' is expected but not found in api result').not.toBe(undefined)
      }
    })
  })

  test('Check Model Validation', () => {
    const result = new Product(body.data)
    const data = body.data
    const props = result.props
    props.forEach(prop => {
      const key = prop.key
      const val = data[key]
      const condition = prop.validate ? prop.validate : false
      if (condition) {
        if (condition.canBeNull === false) { expect(val).not.toBe(null) }
        if (val && condition.canBeEmpty === false) { expect(val).not.toBe('') }
        if (val && condition.type) { expect(typeof val).toBe(condition.type) }
      }
    })
  })
})
