import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

type RootPackageJson = {
  scripts?: Record<string, string>;
};

function readRootPackageJson(): RootPackageJson {
  const packagePath = path.join(process.cwd(), "..", "package.json");
  return JSON.parse(readFileSync(packagePath, "utf8")) as RootPackageJson;
}

describe("dev workflow", () => {
  it("prepares docker, schema, and seed data before local dev servers start", () => {
    const scripts = readRootPackageJson().scripts ?? {};
    expect(scripts["dev:prepare"]).toContain("scripts/dev-prepare.mjs");
    expect(scripts.dev).toMatch(/dev:prepare/);
    expect(scripts.dev).toContain("dev:backend");
    expect(scripts.dev).toContain("dev:frontend");
  });

  it("keeps frontend-only dev separate from the full stack bootstrap", () => {
    const scripts = readRootPackageJson().scripts ?? {};
    expect(scripts["dev:frontend"]).toContain("frontend dev");
    expect(scripts["dev:frontend"]).not.toContain("dev:prepare");
  });
});
