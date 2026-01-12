// import GenericActions from "./actions/door.js"
// import GenericResponses from "./responses/door.js"
// import GenericCatchResponses from "./catchresponses/door.js"
// import GenericParams from "./params/door.js"
import TomatoPostgresqlConfig from "./configurations/configs.js"

export default class TomatoPostgresqlBaseDoor {
  constructor(manifest = null) {
    if (!TomatoPostgresqlBaseDoor.instance) {
      this.name = "tomato_postgresql"
      // this.actions = new GenericActions()
      // this.responses = new GenericResponses()
      // this.catchResponses = new GenericCatchResponses()
      // this.params = new GenericParams()
      new TomatoPostgresqlConfig(manifest)
      TomatoPostgresqlBaseDoor.instance = this
    }
    console.log("[TomatoPostgresqlBaseDoor] TomatoPostgresqlBaseDoor distro initialized")

    return TomatoPostgresqlBaseDoor.instance
  }

  hasAction(name) {
    if (!name || typeof name !== "string") {
      throw new Error("[TomatoPostgresqlBaseDoor] Action name must be a non-empty string")
    }
    return this.actions.has(name)
  }

  getAction(name) {
    if (!this.hasAction(name)) {
      throw new Error(`[TomatoPostgresqlBaseDoor] Action "${name}" not found in generic distro`)
    }
    return this.actions.get(name)
  }

  hasResponse(name) {
    if (!name || typeof name !== "string") {
      throw new Error("[TomatoPostgresqlBaseDoor] Response name must be a non-empty string")
    }
    return this.responses.has(name)
  }

  getResponse(name) {
    if (!this.hasResponse(name)) {
      throw new Error(`[TomatoPostgresqlBaseDoor] Response "${name}" not found in generic distro`)
    }
    return this.responses.get(name)
  }

  hasCatchResponse(name) {
    if (!name || typeof name !== "string") {
      throw new Error("[TomatoPostgresqlBaseDoor] Catch response name must be a non-empty string")
    }
    return this.catchResponses.has(name)
  }

  getCatchResponse(name) {
    if (!this.hasCatchResponse(name)) {
      throw new Error(`[TomatoPostgresqlBaseDoor] Catch response "${name}" not found in generic distro`)
    }
    return this.catchResponses.get(name)
  }

  hasParam(name) {
    if (!name || typeof name !== "string") {
      throw new Error("[TomatoPostgresqlBaseDoor] Param name must be a non-empty string")
    }
    return this.params.has(name)
  }

  getParam(name) {
    if (!this.hasParam(name)) {
      throw new Error(`[TomatoPostgresqlBaseDoor] Param "${name}" not found in generic distro`)
    }
    return this.params.get(name)
  }
}
