import EntityProperties from "./entity_properties.js"
export default class entity{
    constructor(entityobj={name_entity:null,entity_properties:null},file){
        this.entityobj = entityobj
        this.file = file
        this.valid_keys=[
            {name:"name_entity",type:"string"},
            {name:"entity_properties",type:"object"}
        ]
        this.verifyValidKeys()
        this.entity_properties = new EntityProperties(entityobj)
    }
    verifyValidKeys() {
        for (const validKey of this.valid_keys) {
            verifyFoundKey(validKey,this.entityobj,this.file);
            verifyType(validKey,this.entityobj)
        }
    }
}
function verifyType(validKey,entityobj) {
    if (typeof entityobj[validKey.name] !== validKey.type) {
        throw new Error(`[TomatoPostgresqlEntitysConfig] Configuration '${validKey.name}' must be an ${validKey.type}`)
    }
}

function verifyFoundKey(validKey,entityobj,file) {
    if (entityobj[validKey.name] == null) {
        throw new Error(`[TomatoPostgresqlEntitysConfig] Configuration '${validKey.name}' is required in ${file}`)
    }
}