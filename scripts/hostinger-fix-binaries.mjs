#!/usr/bin/env node
/**
 * Hostinger sometimes checks out deps without +x on native binaries (esbuild/sharp).
 * Fix executable bits before Next/esbuild runs during deploy.
 */
import fs from "node:fs";
import path from "node:path";

const roots = [process.cwd(), path.join(process.cwd(), "frontend"), path.join(process.cwd(), "node_modules")];
const names = new Set(["esbuild", "sharp"]);

function walk(dir, depth = 0) {
  if (depth > 8 || !fs.existsSync(dir)) return;
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }

  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === ".git" || entry.name === "dist" || entry.name === ".next") continue;
      walk(full, depth + 1);
      continue;
    }
    if (!entry.isFile()) continue;
    const parent = path.basename(path.dirname(full));
    const isBin = parent === "bin" || full.includes(`${path.sep}bin${path.sep}`);
    if (!isBin) continue;
    if (!names.has(entry.name) && !entry.name.startsWith("esbuild") && !entry.name.startsWith("sharp")) {
      continue;
    }
    try {
      fs.chmodSync(full, 0o755);
      console.log(`chmod +x ${path.relative(process.cwd(), full)}`);
    } catch (error) {
      console.warn(`chmod skipped ${full}: ${error instanceof Error ? error.message : error}`);
    }
  }
}

for (const root of roots) {
  walk(path.join(root, "node_modules"), 0);
}
