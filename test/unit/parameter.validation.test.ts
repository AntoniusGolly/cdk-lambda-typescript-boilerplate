import resolveRoute from '../../src/resolveRoute'
import config from '../config'
import { getAllowedParameterForRoute, getInvalidParameters } from '../../src/validateParameter'

describe('Get allowed parameters for route', () => {

  it('should get an array of parameters', () => {
    const route = resolveRoute('/assets/list', 'GET', config)
    const arr = getAllowedParameterForRoute(route)

    expect(arr).toEqual(['some', 'fancy', 'params'])
  })

  it('should get an empty array', () => {
    const route = resolveRoute('/', 'GET', config)
    const arr = getAllowedParameterForRoute(route)

    expect(arr).toEqual([])
  })

})

describe('Check allowed parameters for route', () => {

  it('should pass validation on empty parameters', () => {
    const route = resolveRoute('/assets/list', 'GET', config)
    const searchParams = null

    const arr = getAllowedParameterForRoute(route)
    const res = getInvalidParameters(searchParams, arr)

    expect(res).toEqual('')
  })

  it('should pass validation with parameters', () => {
    const route = resolveRoute('/assets/list', 'GET', config)
    const searchParams = {
      some: "should be good",
      fancy: "this exists aswell"
    }
    const arr = getAllowedParameterForRoute(route)
    const res = getInvalidParameters(searchParams, arr)

    expect(res).toEqual('')
  })

  it('should fail with one error', () => {
    const route = resolveRoute('/assets/list', 'GET', config)
    const searchParams = {
      some: "should be good",
      notallowed: "this exists aswell"
    }
    const arr = getAllowedParameterForRoute(route)
    const res = getInvalidParameters(searchParams, arr)

    expect(res).toEqual('notallowed')
  })

  it('should fail with two errors', () => {
    const route = resolveRoute('/assets/list', 'GET', config)
    const searchParams = {
      notallowed: "this exists aswell",
      alsonot: "should be good"
    }
    const arr = getAllowedParameterForRoute(route)
    const res = getInvalidParameters(searchParams, arr)

    expect(res).toEqual('notallowed,alsonot')
  })
})

export {};
