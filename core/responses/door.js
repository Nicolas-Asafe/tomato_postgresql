import Response from "../../../models/response.js"

export default class TomatoPostgresqlResponses {
    constructor() {
        this.map = {
            "tomato_postgresql:response_responsetxt": new Response(
                "responsetxt",
                "generic",
                () => import("./response_responsetxt.js")
            ),
        }
    }

    get(name) {
        return this.map[name]
    }

    has(name) {
        return !!this.map[name]
    }
}