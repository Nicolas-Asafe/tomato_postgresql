/**
 * Parameter Validator: responsetxt - Validates and sanitizes response parameters.
 * This validator ensures that data and statusCode parameters conform to expected types
 * and constraints. Validates that data is an object and statusCode is a valid HTTP code.
 * Returns sanitized parameters ready for response formatting.
 */

export default async function validateResponseHtmlPageParams(params) {
  const validKeys = [{name:"site_name",type:"string"},{name:"title",type:"string"},{name:"description",type:"string"}]
  if (!params) {
    throw new Error("[Param responsehtmlpage] Parameters object is required")
  }
  if (typeof params !== "object") {
    throw new Error("[Param responsehtmlpage] Parameters must be an object")
  }
   for (const key of Object.keys(params.data)) {
    if (!validKeys.find(k=>k.name === key)) {
      throw new Error(`[Param responsehtmlpage] Invalid parameter: ${key}`);
    }
  }
  for (const validKey of validKeys){
    if (params.data[validKey.name] == null){
      throw new Error(`[Param responsehtmlpage] Parameter '${validKey.name}' is required in params`)
    }
    if (typeof params.data[validKey.name] !== validKey.type){
      throw new Error(`[Param responsehtmlpage] Parameter '${validKey.name}' must be an ${validKey.type}`)
    }
  }
  const validated = {}

  if (params.data !== undefined) {
    if (typeof params.data !== "object") {
      throw new Error("[Param responsetxt] Parameter 'data' must be an object")
    }
    validated.data = params.data
  }

  if (params.statusCode !== undefined) {
    if (!Number.isInteger(params.statusCode)) {
      throw new Error("[Param responsetxt] Parameter 'statusCode' must be an integer")
    }
    if (params.statusCode < 100 || params.statusCode > 599) {
      throw new Error("[Param responsetxt] Parameter 'statusCode' must be between 100-599")
    }
    validated.statusCode = params.statusCode
  }

  return validated
}