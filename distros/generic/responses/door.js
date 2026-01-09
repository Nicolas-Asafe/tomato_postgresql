import Response from "../../../models/response.js"

export default class GenericResponses {
    constructor() {
        this.map = {
            "generic:response_responsetxt": new Response(
                "responsetxt",
                "generic",
                () => import("./response_responsetxt.js")
            ),
            "generic:response_responsehtmlpage": new Response(
                "responsehtmlpage",
                "generic",
                () => import("./response_responsehtmlpage.js")
            )
        }
    }

    get(name) {
        return this.map[name]
    }

    has(name) {
        return !!this.map[name]
    }
}