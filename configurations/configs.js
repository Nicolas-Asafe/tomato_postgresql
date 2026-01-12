import MainConfig from "./tomato_postgresql_mainconfigs.js"
import { connect } from "../connect.js"
import EntityConfig from "./tomato_postgresql_entityconfigs.js"

export default class Config {
    constructor(manifest = {}) {
        this.mainconfigs = new MainConfig(manifest)
        this.entityconfigs = new EntityConfig(manifest)
        this.connectToPool()
    }
    async connectToPool() {
        try {
            await this.mainconfigs.verifyConfigFile()
            await this.entityconfigs.verifyEntitysFolder()
            await this.mainconfigs.loadConfigurations()
            await this.entityconfigs.loadEntitys()
            this.mainconfigs.verifyValidKeys()
            await connect(this.mainconfigs.tomato_postgresql_configs)
        }catch(err){
            console.error(`[TomatoPostgresqlConfigurations] ${err.message}`)
        }
    }
}