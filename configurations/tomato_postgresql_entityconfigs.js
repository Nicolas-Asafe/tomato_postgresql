import fs from "fs"
import { readJSON } from "../../../util/readjson.js"
import Entity from "../core/models/entity.js"
import path from "path"

export default class EntityConfig {
    constructor(manifest = {}) {
        this.tomato_postgresql_entitys_dir = `./user/projects/${manifest.projectname}/entitys/`
        this.tomato_postgresql_entitys = {}
    }
    async verifyEntitysFolder() {
        try { fs.statSync(this.tomato_postgresql_entitys_dir) }
        catch { throw new Error("[TomatoPostgresqlEntitysConfig] the folder './entitys/...' not found on root project") }
    }
    async loadEntitys() {
        const entitys_files = fs
            .readdirSync(this.tomato_postgresql_entitys_dir)
            .filter(file => file.endsWith(".json"))
            .map(file => path.join(this.tomato_postgresql_entitys_dir, file));
        const entitys_in_jsons = []
        for (const entity_file of entitys_files){
            const entity_in_json = await readJSON(entity_file)
            const entity = !entity_in_json ? undefined : new Entity(entity_in_json,entity_file)
            if (entity != undefined){
                entitys_in_jsons.push(entity)
            }
        }
        console.log(`[TomatoPostgresqlEntitysConfig] ${entitys_in_jsons.length} entitys(s) registered`)
        if (entitys_in_jsons.length == 0 ) console.warn("[TomatoPostgresqlEntitysConfig] No entitys found")
        
    }
}

