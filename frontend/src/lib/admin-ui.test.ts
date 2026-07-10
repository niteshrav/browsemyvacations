import { describe, expect, it } from "vitest";
import { adminNavLinkClassName, adminStatusBadgeClassName, isAdminNavActive } from "./admin-ui";

describe("admin-ui", () => {
  it("marks active admin nav links", () => {
    expect(isAdminNavActive("/admin/leads/abc", "/admin/leads")).toBe(true);
    expect(isAdminNavActive("/admin/packages", "/admin/leads")).toBe(false);
  });

  it("styles active and inactive nav links", () => {
    expect(adminNavLinkClassName(true)).toContain("bg-teal-700");
    expect(adminNavLinkClassName(false)).toContain("text-stone-600");
  });

  it("styles lead status badges", () => {
    expect(adminStatusBadgeClassName("new")).toContain("sky");
    expect(adminStatusBadgeClassName("won")).toContain("emerald");
  });
});
