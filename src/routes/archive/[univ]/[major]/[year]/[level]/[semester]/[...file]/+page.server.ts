import fs from "node:fs";
import path from "node:path";
import { error, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = ({ params }) => {
  // 1. Pull the catch-all "file" param alongside your explicit paths
  const { univ, major, year, level, semester, file } = params;

  const baseDir = path.resolve("static/univs");

  // 2. Safely break down the deep subfolder paths (e.g., "algo1/course" -> ["algo1", "course"])
  const fileSegments = file ? file.split("/") : [];

  // 3. Spread the segments at the end of your path resolution
  const targetPath = path.resolve(
    baseDir,
    univ,
    major,
    year,
    level,
    semester,
    ...fileSegments
  );

  // Security Guard
  if (!targetPath.startsWith(baseDir)) {
    throw error(403, "Unauthorized access");
  }

  if (!fs.existsSync(targetPath)) {
    throw error(404, "Requested folder or file path does not exist");
  }

  const stat = fs.statSync(targetPath);
  
  // If it's a physical file, skip rendering and send them straight to the asset
  if (!stat.isDirectory()) {
    throw redirect(307, `/reader/univs/${univ}/${major}/${year}/${level}/${semester}/${file}`);
  }
  // 4. Handle deep file downloads vs deep folder views
  if (!stat.isDirectory()) {
    return {
      isFile: true,
      name: path.basename(targetPath),
      downloadUrl: `/univs/${univ}/${major}/${year}/${level}/${semester}/${file}`
    };
  }

  const items = fs.readdirSync(targetPath, { withFileTypes: true });

  return {
    isFile: false,
    // Dynamically appends the deep folders to the web asset URL prefix
    webPathPrefix: `/univs/${univ}/${major}/${year}/${level}/${semester}/${file ? file + '/' : ''}`,
    meta: { univ, major, year, level, semester, file },
    items: items
      .filter((item) => !item.name.startsWith("."))
      .map((item) => ({
        name: item.name,
        type: item.isDirectory() ? ("folder" as const) : ("file" as const),
      })),
  };
};