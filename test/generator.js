const fs = require('fs')

/**
 * @Date: 2024-04-08 11:39:23
 * @Desc: this template is used for generating test.spec files
 */
const template = `
import { beforeAll, describe, expect, expectTypeOf, test } from 'vitest'
import { _VAR_1_ } from '_VAR_2_'

const BEFORE_ALL_TIMEOUT = 30000 // 30 sec

describe('Request Earth Polychromatic Imaging Camera', () => {
  let response
  let body

  beforeAll(async () => {
    response = await fetch('_VAR_3_')
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
    const result = new _VAR_1_(body.data)
    expect(result.isValidData(body.data)).toBe(true)
  })

  test('Check Model Structure', () => {
    const result = new _VAR_1_(body.data)
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
    const result = new _VAR_1_(body.data)
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
`
/**
 * @Date: 2024-04-08 11:40:19
 * @Desc: list of models & urls to generate test.spec files based on
 */
const tests = [
  { name: 'auto_sets', model_name: 'Set', model_url: 'src/models/Set', url: 'https://alaatv.com/alaa/api/v2/set/1013' },
  { name: 'auto_contents', model_name: 'Content', model_url: 'src/models/Content', url: 'https://alaatv.com/alaa/api/v2/c/199476' },
  { name: 'auto_product', model_name: 'Product', model_url: 'src/models/Product', url: 'https://alaatv.com/alaa/api/v2/product/1919' }
]

/**
 * @Date: 2024-04-08 11:40:46
 * @Desc: replace variables in template and write/replace test.spec files
 */
tests.forEach(element => {
  const d1 = template.replaceAll('_VAR_1_', element.model_name)
  const d2 = d1.replaceAll('_VAR_2_', element.model_url)
  const d3 = d2.replaceAll('_VAR_3_', element.url)
  fs.writeFileSync('./vitest/__tests__/' + element.name + '.spec.js', d3)
})
