import { describe, expect, it } from "vitest";
import {
  ADMIN_DEFAULT_REDIRECT,
  ADMIN_LOGIN_PATH,
  isAdminLoginPath,
  shouldProtectAdminPath,
} from "./admin-routes";

describe("admin routes", () => {
  it("defines login and default redirect paths", () => {
    expect(ADMIN_LOGIN_PATH).toBe("/admin/login");
    expect(ADMIN_DEFAULT_REDIRECT).toBe("/admin/destinations");
  });

  it("treats login as public admin route", () => {
    expect(isAdminLoginPath("/admin/login")).toBe(true);
    expect(shouldProtectAdminPath("/admin/login")).toBe(false);
  });

  it("protects other admin routes", () => {
    expect(shouldProtectAdminPath("/admin/packages")).toBe(true);
    expect(shouldProtectAdminPath("/admin/leads/abc")).toBe(true);
  });
});
