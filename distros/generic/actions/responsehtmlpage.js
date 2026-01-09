/**
 * Action Handler: responsetxt - Processes requests and returns formatted JSON response.
 * This action receives HTTP request data (body, query, headers) and route parameters,
 * validates them against type specifications, merges parameters with request data,
 * and returns a formatted response object. The output feeds into the response handler.
 * Supports parameter injection from route configuration and request body data.
 */

import validateResponseParams from "../params/params_responsehtmlpage.js"

export default async function responsehtmlpageAction(ctx) {
  if (!ctx) {
    const err = new Error("[Action responsehtmlpage] Context is required")
    err.code = "INVALID_CONTEXT"
    throw err
  }

  if (!ctx.req || !ctx.res) {
    const err = new Error("[Action responsehtmlpage] Request and response objects required")
    err.code = "INVALID_REQUEST"
    throw err
  }

  try {
    //it has to be like this
    let html_data = {
      site_name: "string",
      title: "string",
      description: "string"
    }


    if (ctx.routeParams) {
      if (typeof ctx.routeParams === "object" && !Array.isArray(ctx.routeParams)) {
        html_data = ctx.routeParams
      }
    }

    const params = await validateResponseParams({
      data: html_data,
    })

    return {
      success: true,
      data: params.data,
      statusCode: params.statusCode
    }
  } catch (error) {
    const err = new Error(
      `[Action responsehtmlpage] Failed to process: ${error.message}`
    )
    err.code = error.code || "ACTION_ERROR"
    err.statusCode = 400
    throw err
  }
}