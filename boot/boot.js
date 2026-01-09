import { init } from "./init_api/init.js"

export const boot = async (projectname) =>{
    if (!projectname) throw new Error("Project name is required")
    await init(projectname)
}