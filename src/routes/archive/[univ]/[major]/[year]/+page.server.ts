import fs from "node:fs";
import path from "node:path";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = ({ params }) => {
  const { univ, major, year } = params;

  // Resolve path directly to the selected academic year folder
  const targetPath = path.resolve("static/univs", univ, major, year);

  if (!fs.existsSync(targetPath)) {
    throw error(404, "The requested academic year folder does not exist.");
  }

  const items = fs.readdirSync(targetPath, { withFileTypes: true });

  return {
    univ,
    major,
    year,
    // Gather all academic level folders (e.g., 'l1', 'm1')
    levels: items
      .filter((item) => item.isDirectory() && !item.name.startsWith("."))
      .map((item) => item.name),
  };
};