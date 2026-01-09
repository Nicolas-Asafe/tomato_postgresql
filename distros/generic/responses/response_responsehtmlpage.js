/**
 * Response Handler: response_responsetxt - Formats and sends successful response to client.
 * This handler receives processed data from the action and formats it with metadata
 * including timestamp, request path, and HTTP method. Validates HTTP status codes
 * and sends a JSON response with proper formatting. Serves as the final step
 * in successful request processing before client receives the response.
 */

export default async function responseHtmlPageHandler(ctx) {
  if (!ctx) {
    throw new Error("[Response responsehtmlpage] Context is required")
  }

  if (!ctx.req || !ctx.res) {
    throw new Error(
      "[Response responsehtmlpage] Request and response objects are required"
    )
  }

  try {
    const statusCode = ctx.statusCode || 200
    if (!Number.isInteger(statusCode) || statusCode < 100 || statusCode > 599) {
      throw new Error(
        `[Response responsehtmlpage] Invalid HTTP status code: ${statusCode}`
      )
    }

    const data = ctx.data 
    if (typeof data !== "object") {
      throw new Error("[Response responsehtmlpage] Data must be an object")
    }

    const response = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>${data.site_name}</title>
      </head>
      <body>
        <h1>${data.title}</h1>
        <p>${data.description}</p>
      </body>
    </html>
    `

    ctx.res.status(statusCode).send(response)
    return true
  } catch (error) {
    const err = new Error(
      `[Response responsehtmlpage] Failed to send response: ${error.message}`
    )
    err.statusCode = 500
    throw err
  }
}