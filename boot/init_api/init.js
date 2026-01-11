/**
 * Initialize API: Sets up Express server and orchestrates the request pipeline.
 * This module loads routes from the project manifest, initializes distros,
 * and creates request handlers that execute the action → response → catch_response pipeline.
 * Each request is processed through these stages with a standardized context object
 * that flows through the entire pipeline, allowing each stage to read and modify state.
 */

import express from "express"
import { recept_routes } from "../recepts/recept_routes.js"
import { recept_manifest } from "../recepts/recept_manifest.js"
import path from "path"
import { place_distros } from "./place_distros.js"
import { createRouteHandler } from "./create_route_handler.js"

export const init = async (projectname) => {
  try {
    const manifest = await recept_manifest(projectname)
    manifest.validate()
    manifest.projectname = projectname
    const distros = await place_distros(manifest)
    manifest.distros_opened = distros

    const basePath = path.join(process.cwd(), "user", "projects", projectname)
    const basePathForRoutes = basePath + "/" + manifest.rendered_directory
    const routes = await recept_routes(basePathForRoutes, distros)

    const app = express()

    app.use(express.json())

    if (manifest.hello_route) {
      app.get("/hello", (req, res) => res.json({ message: "hello!" }))
    }

    routes.forEach(route => {
      const method = route.method.toLowerCase()
      const handler = createRouteHandler(route, manifest)

      app[method](route.path, handler)

      console.log(`[Route] ${method.toUpperCase()} ${route.path} → ${route.base}`)
    })

    app.listen(manifest.port, () => {
      console.log(manifest.logServerRunningMessage())
      console.log(`[Init API] ${routes.length} route(s) registered`)
    })
  } catch (error) {
    console.error("[Init API] Fatal error:", error.message)
    process.exit(1)
  }
}