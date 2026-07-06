import { describe, expect, it } from "vitest";
import {
  BMV_DEV_API_PORT,
  BMV_DEV_API_V1_URL,
  BMV_DEV_SITE_URL,
  BMV_DEV_WEB_PORT,
  BMV_E2E_API_PORT,
  BMV_E2E_WEB_PORT,
  LEGACY_DEV_API_PORT,
  LEGACY_DEV_WEB_PORT,
} from "./dev-ports";

describe("dev ports", () => {
  it("uses non-conflicting local ports away from 3000/3001", () => {
    expect(BMV_DEV_WEB_PORT).not.toBe(LEGACY_DEV_WEB_PORT);
    expect(BMV_DEV_API_PORT).not.toBe(LEGACY_DEV_API_PORT);
    expect(BMV_DEV_WEB_PORT).toBe(3100);
    expect(BMV_DEV_API_PORT).toBe(3101);
  });

  it("builds default local URLs from the dev ports", () => {
    expect(BMV_DEV_SITE_URL).toBe("http://localhost:3100");
    expect(BMV_DEV_API_V1_URL).toBe("http://localhost:3101/api/v1");
  });

  it("keeps e2e ports aligned with dev defaults", () => {
    expect(BMV_E2E_WEB_PORT).toBe(BMV_DEV_WEB_PORT);
    expect(BMV_E2E_API_PORT).toBe(3102);
  });
});
