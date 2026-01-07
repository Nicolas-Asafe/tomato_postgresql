/**
 * Parameter Validator: responsetxt - Validates and sanitizes response parameters.
 * This validator ensures that data and statusCode parameters conform to expected types
 * and constraints. Validates that data is an object and statusCode is a valid HTTP code.
 * Returns sanitized parameters ready for response formatting.
 */

export default async function validateResponseParams(params) {
  const validKeys = ["text"]
  if (!params) {
    throw new Error("[Param responsetxt] Parameters object is required")
  }
  if (typeof params !== "object") {
    throw new Error("[Param responsetxt] Parameters must be an object")
  }
  if (!params.data.text){
    throw new Error("[Param responsetxt] Parameter 'text' is required")
  }
  if (typeof params.data.text !== "string") {
    throw new Error("[Param responsetxt] Parameter 'text' must be a string")
  }
   for (const key of Object.keys(params.data)) {
    if (!validKeys.includes(key)) {
      throw new Error(`[Param responsetxt] Invalid parameter: ${key}`);
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