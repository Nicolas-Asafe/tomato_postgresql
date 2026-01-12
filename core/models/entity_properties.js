import types from "../types.js"

export default class EntityProperties{
    constructor(entityobj={name_entity:null,entity_properties:null},file){
        this.entityobj = entityobj
        this.file = file
        this.properties = {}
        if(Object.values(this.entityobj.entity_properties).length ==0) throw new Error("[TomatoPostgresqlEntitysConfig] Entity properties need at least one property")
        this.loadBodyEntity()
    }
    loadBodyEntity(){
        let entity_properties_final = {}
        for(const [namepropertie,define] of Object.entries(this.entityobj.entity_properties)){
            const typeExists = types[define.type] || null
            if (typeExists == null) throw new Error(`[TomatoPostgresqlTypes] The type ${define.type} not exists`)
            if (define.required == null) throw new Error(`[TomatoPostgresql] 'required' is required in ${namepropertie}`)
            define.type = types[define.type]
            entity_properties_final[namepropertie] = {define}
        }
        this.properties = entity_properties_final
    }

}
