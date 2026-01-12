import fs from "fs"
import {readJSON} from "../../../util/readjson.js"

export default class MainConfig {
    constructor(manifest = {}) {
        this.validKeysToMainConfigs = [
            { name: "user", type: "string" },
            { name: "password", type: "string" },
            { name: "port", type: "number" },
            { name: "ssl", type: "boolean" },
            { name: "host", type: "string" },
            { name: "database", type: "string" },
        ];
        this.tomato_postgresql_config_file = `./user/projects/${manifest.projectname}/tomato_postgresql_configs/tomato_postgresql.json`

        this.tomato_postgresql_configs = {}
    }
    async verifyConfigFile() {
        try { fs.statSync(this.tomato_postgresql_config_file) }
        catch { 
            throw new Error("[TomatoPostgresqlConfig] the file './tomato_postgresql_configs/tomato_postgresql.json' not found on root project") 
        }
    }
    async verifyValidKeys() {
        for (const validKey of this.validKeysToMainConfigs) {
            verifyFoundKey(validKey,this.tomato_postgresql_configs);
            verifyType(validKey,this.tomato_postgresql_configs)
        }
    }
    async loadConfigurations() {
        this.tomato_postgresql_configs = await readJSON(this.tomato_postgresql_config_file)
    }
}

function verifyType(validKey,tomato_postgresql_configs) {
    if (typeof tomato_postgresql_configs[validKey.name] !== validKey.type) {
        throw new Error(`[TomatoPostgresqlConfig] Configuration '${validKey.name}' must be an ${validKey.type}`)
    }
}

function verifyFoundKey(validKey,tomato_postgresql_configs) {
    if (tomato_postgresql_configs[validKey.name] == null) {
        throw new Error(`[TomatoPostgresqlConfig] Configuration '${validKey.name}' is required in tomato_postgresql.json`)
    }
}