import { IResource } from 'aws-cdk-lib/aws-apigateway'

const composeApiGateway = (resource, api: IResource, fun) => {
    if (resource.handlers) {
      for (const handler of resource.handlers) {
        api.addMethod(handler.method, fun)
      }
    }
    if (resource.resources) {
      for (const res of resource.resources) {
        const path = res.path.replace(/^\/|\/$/g, '')
        const sub = api.addResource(path)
        composeApiGateway(res, sub, fun)
      }
  }
}

export default composeApiGateway
