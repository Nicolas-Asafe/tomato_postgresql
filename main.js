import { boot } from "./boot/boot.js";
import createProject from "./user/actions/create_project.js";

try {
    await createProject("myapi")
    await boot("myapi")
} catch (err) {
    console.error("[ERROR] Initialization failed:", err.message)
    process.exit(1)
}