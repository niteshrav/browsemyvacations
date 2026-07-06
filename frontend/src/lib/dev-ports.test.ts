import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  BMV_DEV_API_PORT,
  BMV_DEV_API_V1_URL,
  BMV_DEV_SITE_URL,
  BMV_DEV_WEB_PORT,
} from "@bmv/shared";
import { DEFAULT_LOCAL_API_BASE } from "./api-config";

function readFrontendPackageJson(): { scripts?: Record<string, string> } {
  return JSON.parse(readFileSync(path.join(process.cwd(), "package.json"), "utf8")) as {
    scripts?: Record<string, string>;
  };
}

describe("local dev ports", () => {
  it("defaults the API client to the BMV dev API port", () => {
    expect(DEFAULT_LOCAL_API_BASE).toBe(BMV_DEV_API_V1_URL);
  });

  it("runs Next.js dev on the BMV web port", () => {
    const scripts = readFrontendPackageJson().scripts ?? {};
    expect(scripts.dev).toContain(`--port ${BMV_DEV_WEB_PORT}`);
    expect(scripts["dev:clean"]).toContain(`--port ${BMV_DEV_WEB_PORT}`);
    expect(BMV_DEV_WEB_PORT).toBe(3100);
    expect(BMV_DEV_API_PORT).toBe(3101);
    expect(BMV_DEV_SITE_URL).toBe("http://localhost:3100");
  });
});
