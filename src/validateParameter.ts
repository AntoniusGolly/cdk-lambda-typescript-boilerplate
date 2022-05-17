export const getInvalidParameters = (searchParams, allowedParams) => {
  let invalidParams: string[] = []

  if(null === searchParams) {
    searchParams = {}
  }

  for (const searchParam of Object.keys(searchParams)) {
    if (!allowedParams.includes(searchParam)) {
      invalidParams.push(searchParam)
    }
  }
  return invalidParams.join(",")
}

export const getAllowedParameterForRoute = (route) => {
  if (!route.params) {
    return []
  }

  return route.params.replace(/\s/g, '').split(',').filter(n => n)
}
