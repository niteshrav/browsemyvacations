import { describe, expect, it } from "vitest";
import { BMV_DEV_API_V1_URL, BMV_E2E_API_PORT } from "@bmv/shared";
import {
  DEFAULT_LOCAL_API_BASE,
  ensureApiV1Base,
  resolveApiBaseUrl,
  resolveClientApiBaseUrl,
  resolveServerApiBaseUrl,
} from "./api-config";

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

  it("appends /api/v1 when domain root is configured", () => {
    expect(ensureApiV1Base("http://browsemyvacations.com")).toBe(
      "http://browsemyvacations.com/api/v1",
    );
    expect(ensureApiV1Base("https://browsemyvacations.com/")).toBe(
      "https://browsemyvacations.com/api/v1",
    );
  });

  it("keeps relative /api/v1", () => {
    expect(resolveApiBaseUrl("/api/v1")).toBe("/api/v1");
    expect(resolveApiBaseUrl("/api/v1/")).toBe("/api/v1");
  });
});

describe("resolveClientApiBaseUrl", () => {
  it("keeps loopback absolute URLs for local/e2e", () => {
    expect(resolveClientApiBaseUrl("http://localhost:3101/api/v1")).toBe(
      "http://localhost:3101/api/v1",
    );
    expect(resolveClientApiBaseUrl(`http://127.0.0.1:${BMV_E2E_API_PORT}/api/v1`)).toBe(
      `http://127.0.0.1:${BMV_E2E_API_PORT}/api/v1`,
    );
  });

  it("forces same-origin /api/v1 for public hosts (avoids mixed content)", () => {
    expect(resolveClientApiBaseUrl("http://browsemyvacations.com")).toBe("/api/v1");
    expect(resolveClientApiBaseUrl("https://browsemyvacations.com/api/v1")).toBe("/api/v1");
  });
});

describe("resolveServerApiBaseUrl", () => {
  it("upgrades same-host http API to https when site is https", () => {
    const prev = process.env.NEXT_PUBLIC_SITE_URL;
    process.env.NEXT_PUBLIC_SITE_URL = "https://browsemyvacations.com";
    expect(resolveServerApiBaseUrl("http://browsemyvacations.com")).toBe(
      "https://browsemyvacations.com/api/v1",
    );
    process.env.NEXT_PUBLIC_SITE_URL = prev;
  });

  it("expands relative API using site URL", () => {
    const prev = process.env.NEXT_PUBLIC_SITE_URL;
    process.env.NEXT_PUBLIC_SITE_URL = "https://browsemyvacations.com";
    expect(resolveServerApiBaseUrl("/api/v1")).toBe("https://browsemyvacations.com/api/v1");
    process.env.NEXT_PUBLIC_SITE_URL = prev;
  });
});
