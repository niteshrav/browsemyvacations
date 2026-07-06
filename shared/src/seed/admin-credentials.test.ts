import { describe, expect, it } from "vitest";
import { adminLoginSchema } from "../schemas/auth.schema";
import {
  DEFAULT_ADMIN_SEED_EMAIL,
  DEFAULT_ADMIN_SEED_PASSWORD,
  resolveAdminSeedCredentials,
} from "./admin-credentials";

describe("resolveAdminSeedCredentials", () => {
  it("returns default seeded admin login credentials", () => {
    expect(resolveAdminSeedCredentials({})).toEqual({
      email: DEFAULT_ADMIN_SEED_EMAIL,
      password: DEFAULT_ADMIN_SEED_PASSWORD,
    });
  });

  it("allows override via ADMIN_SEED_* env vars", () => {
    expect(
      resolveAdminSeedCredentials({
        ADMIN_SEED_EMAIL: " custom@example.com ",
        ADMIN_SEED_PASSWORD: "custom-secret",
      }),
    ).toEqual({
      email: "custom@example.com",
      password: "custom-secret",
    });
  });

  it("falls back to defaults when override values are empty", () => {
    expect(
      resolveAdminSeedCredentials({
        ADMIN_SEED_EMAIL: "   ",
        ADMIN_SEED_PASSWORD: "",
      }),
    ).toEqual({
      email: DEFAULT_ADMIN_SEED_EMAIL,
      password: DEFAULT_ADMIN_SEED_PASSWORD,
    });
  });

  it("default credentials satisfy admin login schema", () => {
    const credentials = resolveAdminSeedCredentials({});
    expect(adminLoginSchema.safeParse(credentials).success).toBe(true);
  });
});
