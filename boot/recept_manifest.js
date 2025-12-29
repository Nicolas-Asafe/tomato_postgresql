import path from "path";
import { fileURLToPath } from "url";
import { readJSON } from "../util/readjson.js";
import { manifest } from "../models/manifest.js";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const recept_manifest = async (projectname) => {
  if (!projectname) throw new Error("Project name is required")
  const manifestPath = path.join(__dirname, "../user/projects/"+projectname+"/manifest.json");
  const manifestobj = await readJSON(manifestPath);
  const manifestfinal = new manifest(manifestobj.port || null, manifestobj.author || null,   manifestobj.hello_route || null,manifestobj.running_message || null,manifestobj.rendered_directory ||null)
  return manifestfinal;
}
