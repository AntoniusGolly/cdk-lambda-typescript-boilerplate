const resolveRoute = (path, method, config) => {
  // transforms  '/' to ['/'] or '/assets/list' to ['/', '/assets', '/list']
  const parts = path.replace(/^\/|\/$/g, '').split('/').filter(n => n).map(i => `/${i}`)
  parts.unshift('/') // add root to be consistent with API Gateway

  // find route recursively
  return findRouteRecursively(parts, method, config)
}

const findRouteRecursively = (parts, method, resources) => {
  const pointer = parts.shift()
  const resource = resources.find(resource => resource.path === pointer)

  if (undefined === resource) {
    throw new Error(`Resource '${pointer}' does not exist.`)
  }

  if (parts.length) {
    return findRouteRecursively(parts, method, resource.resources)
  } else {
    const handler = resource.handlers.find(handler => handler.method === method)

    if (undefined === handler) {
      throw new Error(`Handler for method '${method}' does not exist.`)
    }

    return handler
  }
}

export default resolveRoute
