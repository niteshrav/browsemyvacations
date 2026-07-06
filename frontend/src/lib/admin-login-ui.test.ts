import {
  DEFAULT_ADMIN_SEED_EMAIL,
  DEFAULT_ADMIN_SEED_PASSWORD,
} from "@bmv/shared";
import { describe, expect, it } from "vitest";
import {
  ADMIN_LOGIN_DIALOG_TITLE,
  ADMIN_LOGIN_TRIGGER_LABEL,
  ADMIN_SEED_CREDENTIALS_LABEL,
  getAdminSeedCredentialsForDisplay,
  isDefaultAdminSeedCredentials,
} from "./admin-login-ui";

describe("admin-login-ui", () => {
  it("exposes admin login dialog copy", () => {
    expect(ADMIN_LOGIN_TRIGGER_LABEL).toBe("Admin");
    expect(ADMIN_LOGIN_DIALOG_TITLE).toBe("Admin login");
    expect(ADMIN_SEED_CREDENTIALS_LABEL).toBe("Seeded credentials");
  });

  it("returns seeded credentials for display", () => {
    expect(getAdminSeedCredentialsForDisplay()).toEqual({
      email: DEFAULT_ADMIN_SEED_EMAIL,
      password: DEFAULT_ADMIN_SEED_PASSWORD,
    });
  });

  it("detects default seeded credentials", () => {
    expect(
      isDefaultAdminSeedCredentials({
        email: DEFAULT_ADMIN_SEED_EMAIL,
        password: DEFAULT_ADMIN_SEED_PASSWORD,
      }),
    ).toBe(true);
    expect(
      isDefaultAdminSeedCredentials({
        email: "other@example.com",
        password: DEFAULT_ADMIN_SEED_PASSWORD,
      }),
    ).toBe(false);
  });
});
