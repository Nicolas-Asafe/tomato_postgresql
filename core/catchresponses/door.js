import Response from "../../../models/response.js"

export default class GenericCatchResponses {
    constructor() {
        this.map = {
            "generic:catch_responsetxt": new Response(
                "responsetxt",
                "generic",
                () => import("./CR_responsetxt.js")
            ),
            "generic:catch_responsehtmlpage": new Response(
                "responsehtmlpage",
                "generic",
                () => import("./CR_responsehtmlpage.js")
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