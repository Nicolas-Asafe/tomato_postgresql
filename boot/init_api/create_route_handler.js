import { createContext } from "./create_context.js"
import { getCatchResponseFromDistro,getActionFromDistro,getResponseFromDistro } from "./distro_methods.js"
export function createRouteHandler(route, manifest) {
  return async (req, res) => {
    let ctx = createContext(req, res, route, manifest)

    try {
      const actionRef = route.base
      const actionModel = getActionFromDistro(manifest.distros_opened, actionRef)

      if (!actionModel) {
        throw new Error(`Action model not loaded for ${actionRef}`)
      }

      await actionModel.load()
      const actionResult = await actionModel.execute(ctx)

      if (actionResult && typeof actionResult === "object") {
        ctx.data = actionResult.data || actionResult
        if (actionResult.statusCode) {
          ctx.statusCode = actionResult.statusCode
        }
      }

      if (route.response) {
        const responseRef = route.response
        const responseModel = getResponseFromDistro(manifest.distros_opened, responseRef)

        if (!responseModel) {
          throw new Error(`Response model not loaded for ${responseRef}`)
        }

        await responseModel.load()
        await responseModel.execute(ctx)
      } else {
        res.status(ctx.statusCode).json({
          status: "success",
          data: ctx.data
        })
      }
    } catch (error) {
      ctx.error = error

      if (route.catch_response) {
        try {
          const catchResponseRef = route.catch_response
          const catchResponseModel = getCatchResponseFromDistro(manifest.distros_opened, catchResponseRef)

          if (!catchResponseModel) {
            throw new Error(`CatchResponse model not loaded for ${catchResponseRef}`)
          }

          await catchResponseModel.load()
          await catchResponseModel.execute(ctx)
        } catch (catchError) {
          console.error("[Init API] CatchResponse error:", catchError.message)
          res.status(500).json({
            status: "error",
            message: "Internal server error",
            code: "HANDLER_ERROR"
          })
        }
      } else {
        const statusCode = error.statusCode || 500
        res.status(statusCode).json({
          status: "error",
          message: error.message || "An error occurred",
          code: error.code || "UNKNOWN_ERROR"
        })
      }
    }
  }
}