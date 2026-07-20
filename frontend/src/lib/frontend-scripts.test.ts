import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

type FrontendPackageJson = {
  scripts?: Record<string, string>;
};

function readFrontendPackageJson(): FrontendPackageJson {
  const packagePath = path.join(process.cwd(), "package.json");
  return JSON.parse(readFileSync(packagePath, "utf8")) as FrontendPackageJson;
}

describe("frontend package scripts", () => {
  it("does not delete .next before lint (avoids corrupting a running dev server)", () => {
    const scripts = readFrontendPackageJson().scripts ?? {};
    expect(scripts.prelint).toBeUndefined();
  });

  it("cleans .next only before production builds", () => {
    const scripts = readFrontendPackageJson().scripts ?? {};
    expect(scripts.prebuild).toContain("rmSync('.next'");
  });

  it("exposes an explicit cache reset for local development", () => {
    const scripts = readFrontendPackageJson().scripts ?? {};
    expect(scripts["dev:clean"]).toContain("rm -rf .next");
    expect(scripts["dev:clean"]).toContain("next dev");
  });
});
