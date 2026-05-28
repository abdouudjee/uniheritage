import fs from "node:fs";
import path from "node:path";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = ({ params }) => {
  const { univ, major } = params;

  // Resolve path directly to the selected major folder
  const targetPath = path.resolve("static/univs", univ, major);

  if (!fs.existsSync(targetPath)) {
    throw error(404, `The department archive for ${major.toUpperCase()} does not exist.`);
  }

  const items = fs.readdirSync(targetPath, { withFileTypes: true });

  return {
    univ,
    major,
    // Gather all calendar year directory folders (e.g., '25-26')
    years: items
      .filter((item) => item.isDirectory() && !item.name.startsWith("."))
      .map((item) => item.name),
  };
};