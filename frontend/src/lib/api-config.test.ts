import { describe, expect, it } from "vitest";
import { BMV_DEV_API_V1_URL, BMV_E2E_API_PORT } from "@bmv/shared";
import { DEFAULT_LOCAL_API_BASE, resolveApiBaseUrl } from "./api-config";

describe("resolveApiBaseUrl", () => {
  it("defaults to backend dev port 3101 when unset", () => {
    expect(resolveApiBaseUrl(undefined)).toBe(DEFAULT_LOCAL_API_BASE);
    expect(DEFAULT_LOCAL_API_BASE).toBe(BMV_DEV_API_V1_URL);
    expect(DEFAULT_LOCAL_API_BASE).toBe("http://localhost:3101/api/v1");
  });

  it("uses explicit env value", () => {
    expect(resolveApiBaseUrl(`http://127.0.0.1:${BMV_E2E_API_PORT}/api/v1`)).toBe(
      `http://127.0.0.1:${BMV_E2E_API_PORT}/api/v1`,
    );
  });

  it("strips trailing slash", () => {
    expect(resolveApiBaseUrl("http://localhost:3101/api/v1/")).toBe(
      "http://localhost:3101/api/v1",
    );
  });
});
