import { boot } from "./boot/boot.js";
import createProject from "./user/actions/create_project.js";

try {
    await createProject("notes_api")
    await boot("notes_api")
}catch(err){
    console.error(err)
}