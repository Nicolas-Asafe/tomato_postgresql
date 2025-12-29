import fs from "fs/promises"
import { Route } from "../models/route.js";
import { readJSON } from "../util/readjson.js";

export const recept_routes = async (path) => {
    const routes = await fs.readdir(path, { withFileTypes: true })
    routes.forEach(f => {
        if (f.isDirectory()) {
            const directoryName = f.name
            const directory = fs.readdir(path, { withFileTypes: true }).then(directory => {
                directory.forEach(f => {
                    if (f.isDirectory) recept_routes(path + directoryName);
                    if (f.isFile && element.name === "index.json") {
                        const content_index = readJSON(path + "index.json").then(content_index => { return content_index })
                        const newRoute = new Route(directoryName, content_index.method,content_index.status,)
                    }
                })
            }).catch(err)
        }
    });
    return routes
}
