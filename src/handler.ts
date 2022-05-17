import config from './config'
import resolveRoute from './resolveRoute'
import { getAllowedParameterForRoute, getInvalidParameters } from './validateParameter'
import fetch from 'node-fetch'

exports.handler = async (event) => {
  let res
  try {
    const method = event.httpMethod
    const route = resolveRoute(event.path, method, config)
    const handlerService = route.handler
    const queryParameters = event.queryStringParameters

    console.log(`RoutesHandler invoked.`)
    console.log(`${method} ${event.path} handled by ${handlerService}`)
    console.log(queryParameters)

    // parameter validation
    const allowedParams = getAllowedParameterForRoute(route)
    const invalidParams = getInvalidParameters(queryParameters, allowedParams)
    if ("" !== invalidParams) {
      throw new Error(`Invalid url parameter(s) '${invalidParams}' provided.`)
    }

    if (handlerService) {
      const response = await fetch('https://api.predic8.de/shop/products/62');
      const res = await response.json();

      return {
        statusCode: 200,
        headers: {},
        body: JSON.stringify(res)
      };
    }

    // We only accept GET for now
    return {
      statusCode: 400,
      headers: {},
      body: `Path ${event.path} could not be resolved by and handler.`
    };
  } catch (error) {
    res = {
      message: error.message,
      stack: error.stack
    }

    return {
      statusCode: 400,
      headers: {},
      body: JSON.stringify(res)
    }
  }
}
