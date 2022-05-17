import composeApiGateway from '../../lib/functions/composeApiGateway'
import { IResource } from 'aws-cdk-lib/aws-apigateway'

import config from '../config'
const logSpy = jest.spyOn(console, 'log');

class apiMock {
  private path;

  addMethod(method) {
    console.log(`addMethod ${method}`)
  }

  addResource(path) {
    console.log(`addResource -> ${path}`)
    this.path = path
    return new apiMock
  }
}

function funMock() {
}

describe('AWS API Gateway composition', () => {
    it('checks the configuration', () => {
      const api = new apiMock() as unknown as IResource
      composeApiGateway(config[0], api, funMock)

      expect(console.log).toBeCalledTimes(9)
      expect(logSpy.mock.calls[0][0]).toBe('addMethod GET')
      expect(logSpy.mock.calls[1][0]).toBe('addMethod POST')
      expect(logSpy.mock.calls[2][0]).toBe('addResource -> oauth2')
      expect(logSpy.mock.calls[3][0]).toBe('addResource -> token')
      expect(logSpy.mock.calls[4][0]).toBe('addMethod POST')
      expect(logSpy.mock.calls[5][0]).toBe('addResource -> assets')
      expect(logSpy.mock.calls[6][0]).toBe('addMethod POST')
      expect(logSpy.mock.calls[7][0]).toBe('addResource -> list')
      expect(logSpy.mock.calls[8][0]).toBe('addMethod GET')
    })
  }
)





