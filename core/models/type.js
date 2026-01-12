export default class Type{
    constructor(name,distro,function_verify=(value)=>{}){
        this.name = name 
        this.distro = distro 
        this.complet_name = `${distro}:types_${name}`
        this.function_verify = function_verify;
    }
    execute_type(name_propertie=null,value_for_verify=null){
        this.function_verify(name_propertie,value_for_verify)
    }
}