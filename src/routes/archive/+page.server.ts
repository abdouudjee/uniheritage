import fs from "node:fs";
import path from "node:path";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = () => {
  const targetPath = path.resolve("static/univs");

  // Verify the root folder exists on the server disk
  if (!fs.existsSync(targetPath)) {
    return { univs: [] };
  }

  const items = fs.readdirSync(targetPath, { withFileTypes: true });

  return {
    // Only return directories (universities), filtering out loose files or hidden items
    univs: items
      .filter((item) => item.isDirectory() && !item.name.startsWith("."))
      .map((item) => item.name),
  };
};