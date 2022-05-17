import resolveRoute from '../../src/resolveRoute'
import config from '../config'

describe('Successful resource resolution', () => {
    it('should resolve the route GET /', () => {
      const path = '/'
      const method = 'GET'
      const route = resolveRoute(path, method, config)

      expect(route.method).toEqual('GET')
      expect(route.handler).toEqual('baseHandlerGET')
    })

    it('should resolve the route GET /assets/list', () => {
      const path = '/assets/list'
      const method = 'GET'
      const route = resolveRoute(path, method, config)

      expect(route.method).toEqual('GET')
      expect(route.handler).toEqual('assetListHandlerGET')
    })

    it('should resolve the route POST /assets', () => {
      const path = '/assets'
      const method = 'POST'
      const route = resolveRoute(path, method, config)

      expect(route.method).toEqual('POST')
      expect(route.handler).toEqual('assetHandlerPost')
    })

    it('should resolve the route POST /', () => {
      const path = '/'
      const method = 'POST'
      const route = resolveRoute(path, method, config)

      expect(route.method).toEqual('POST')
      expect(route.handler).toEqual('baseHandlerPOST')
    })
  }
)

describe('Unsuccessful resource resolution', () => {
    it('should resolve the route GET /unknown', () => {
      const path = '/unknown'
      const method = 'GET'

      const e = () => {
        resolveRoute(path, method, config)
      }
      expect(e).toThrow(Error)

      try {
        resolveRoute(path, method, config)
      } catch (e) {
        expect(e.message).toBe("Resource '/unknown' does not exist.")
      }
    })

    it('should resolve the route GET /assets', () => {
      const path = '/assets'
      const method = 'GET'

      const e = () => {
        resolveRoute(path, method, config)
      }
      expect(e).toThrow(Error)

      try {
        resolveRoute(path, method, config)
      } catch (e) {
        expect(e.message).toBe("Handler for method 'GET' does not exist.")
      }
    })
  }
)

export {};
