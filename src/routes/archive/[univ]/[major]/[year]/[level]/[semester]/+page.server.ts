import fs from "node:fs";
import path from "node:path";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = ({ params }) => {
  // 1. Pull the catch-all "file" param alongside your explicit paths
  const { univ, major, year, level, semester } = params;

  const baseDir = path.resolve("static/univs");
  
  // 3. Spread the segments at the end of your path resolution
  const targetPath = path.resolve(
    baseDir,
    univ,
    major,
    year,
    level,
    semester
  );

  // Security Guard
  if (!targetPath.startsWith(baseDir)) {
    throw error(403, "Unauthorized access");
  }

  if (!fs.existsSync(targetPath)) {
    throw error(404, "Requested folder or file path does not exist");
  }

  const stat = fs.statSync(targetPath);

  // 4. Handle deep file downloads vs deep folder views
  if (!stat.isDirectory()) {
    return {
      isFile: true,
      name: path.basename(targetPath),
      downloadUrl: `/univs/${univ}/${major}/${year}/${level}/${semester}`
    };
  }

  const items = fs.readdirSync(targetPath, { withFileTypes: true });

  return {
    isFile: false,
    // Dynamically appends the deep folders to the web asset URL prefix
    webPathPrefix: `/univs/${univ}/${major}/${year}/${level}/${semester}}`,
    meta: { univ, major, year, level, semester },
    items: items
      .filter((item) => !item.name.startsWith("."))
      .map((item) => ({
        name: item.name,
        type: item.isDirectory() ? ("folder" as const) : ("file" as const),
      })),
  };
};