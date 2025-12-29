export class manifest {
    constructor(port = null, author = "you", hello_route = false, running_message = null,rendered_directory=null) {
        this.port = port
        this.author = author
        this.hello_route = hello_route
        this.running_message = running_message
        this.rendered_directory = rendered_directory
    }

    validate() {
        if (this.port === null) {
            throw new Error("'port' not found in manifest")
        }
        if (this.rendered_directory === null){
            throw new Error ("'rendered_directory not found in manifest")
        }
        return true
    }
    logServerRunningMessage() {
        return (
            this.running_message ?
            this.author + "_messages:" + this.running_message: 
            "tomato_messages:server running in port." + this.port
        )
    }
}