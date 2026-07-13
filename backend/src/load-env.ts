import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const backendRoot = resolve(__dirname, "..");

function loadEnvFile(relativePath: string) {
  const filePath = resolve(backendRoot, relativePath);
  if (!existsSync(filePath)) return;

  for (const rawLine of readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const separator = line.indexOf("=");
    if (separator === -1) continue;
    const key = line.slice(0, separator).trim();
    if (!key || process.env[key] !== undefined) continue;
    let value = line.slice(separator + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    process.env[key] = value;
  }
}

// Local overrides first — existing process.env keys are never overwritten.
loadEnvFile(".env.local");
loadEnvFile("../database/.env.local");
loadEnvFile(".env");
loadEnvFile("../database/.env");
