import express from "express"
import { recept_routes } from "./recept_routes.js"
import path from "path"

export const init_api = async (manifest, projectname) => {
    manifest.validate()
    const basePath = path.join(process.cwd(), "user", "projects", projectname)
    const routes = recept_routes(basePath + "/" + manifest.rendered_directory)
    const app = express()
    if (manifest.hello_route) {app.get("/hello", (req, res) => res.json({ message: "hello!" }))};
    app.listen(manifest.port, () => {
        console.log(manifest.logServerRunningMessage())
    })
}