#!/usr/bin/env node
/**
 * Hostinger may leave native binaries non-executable (EACCES on esbuild).
 * Install uses ignore-scripts=true; this restores +x before build.
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const TARGET_RE = /(^|\/|\\)(esbuild|sharp)(\.exe)?$/i;

function walk(dir, depth = 0, found = []) {
  if (depth > 12 || !fs.existsSync(dir)) return found;
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return found;
  }

  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === ".git" || entry.name === ".next" || entry.name === "dist") continue;
      walk(full, depth + 1, found);
      continue;
    }
    if (!entry.isFile()) continue;
    const rel = full.split(path.sep).join("/");
    if (!TARGET_RE.test(rel)) continue;
    if (!rel.includes("/bin/") && !rel.includes("\\bin\\") && path.basename(path.dirname(full)) !== "bin") {
      continue;
    }
    found.push(full);
  }
  return found;
}

const bins = [
  ...walk(path.join(ROOT, "node_modules")),
  ...walk(path.join(ROOT, "frontend", "node_modules")),
];

const unique = [...new Set(bins)];
if (unique.length === 0) {
  console.warn("hostinger-fix-binaries: no esbuild/sharp binaries found yet");
} else {
  for (const file of unique) {
    try {
      fs.chmodSync(file, 0o755);
      console.log(`chmod +x ${path.relative(ROOT, file)}`);
    } catch (error) {
      console.warn(`chmod failed ${file}: ${error instanceof Error ? error.message : error}`);
    }
  }
}
