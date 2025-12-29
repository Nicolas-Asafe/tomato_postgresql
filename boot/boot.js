import { init_api } from "./init_api.js"
import { recept_manifest } from "./recept_manifest.js"

export const boot = async (projectname) =>{
    init_api(await recept_manifest(projectname),projectname)
}