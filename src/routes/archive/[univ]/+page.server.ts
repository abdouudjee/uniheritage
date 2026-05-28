import fs from "node:fs";
import path from "node:path";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = ({ params }) => {
  const { univ } = params;

  // Resolve path directly to the selected university folder
  const targetPath = path.resolve("static/univs", univ);

  // Guard: If a user types a non-existent university in the URL
  if (!fs.existsSync(targetPath)) {
    throw error(404, `The university "${univ}" does not exist in the archive.`);
  }

  const items = fs.readdirSync(targetPath, { withFileTypes: true });

  return {
    univ,
    // Gather all directory names inside the university folder (these are the majors)
    majors: items
      .filter((item) => item.isDirectory() && !item.name.startsWith("."))
      .map((item) => item.name),
  };
};