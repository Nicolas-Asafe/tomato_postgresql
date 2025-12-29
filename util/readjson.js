import fs from "fs/promises"
export const readJSON = async (path) => {
    const content = await fs.readFile(path,"utf-8")
    return JSON.parse(content)
}