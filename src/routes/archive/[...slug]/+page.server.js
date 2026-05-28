import fs from "node:fs";
import path from "node:path";

export function load({ params }) {
  const base = "static/years";

  const segments = params.slug ? params.slug.split("/") : [];

  const folderPath = path.join(base, ...segments);

  if (!fs.existsSync(folderPath)) {
    return {
      items: [],
      error: "Folder not found",
    };
  }
  const items = fs.readdirSync(folderPath, { withFileTypes: true });

  return {
    items: items.map((i) => ({
      name: i.name,
      type: i.isDirectory() ? "folder" : "file",
    })),
    error: null,
  };
}