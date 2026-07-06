import { describe, expect, it } from "vitest";
import { HOME_QUICK_PICK_CITIES } from "../seed/quick-picks";
import {
  ADMIN_AUTH_E2E_PAGES,
  ADMIN_PROTECTED_E2E_PAGES,
  BRAND_LOGO_ALT,
  BRAND_LOGO_SRC,
  E2E_SEARCH_QUERY,
  E2E_SEED_PACKAGE_SLUG,
  E2E_SEED_PACKAGE_TITLE,
  PUBLIC_E2E_PAGES,
  SEO_E2E_ROUTES,
  findPublicE2ePage,
  getAdminProtectedE2ePaths,
  getAllPublicE2ePaths,
} from "./e2e-catalog";

describe("e2e catalog", () => {
  it("lists all public screens for automated browser tests", () => {
    expect(PUBLIC_E2E_PAGES.length).toBeGreaterThanOrEqual(7);
    expect(getAllPublicE2ePaths()).toContain("/");
    expect(getAllPublicE2ePaths()).toContain("/vacation-meter");
  });

  it("lists admin auth and protected screens", () => {
    expect(ADMIN_AUTH_E2E_PAGES).toHaveLength(1);
    expect(ADMIN_AUTH_E2E_PAGES[0]?.path).toBe("/admin/login");
    expect(getAdminProtectedE2ePaths()).toEqual([
      "/admin/destinations",
      "/admin/packages",
      "/admin/leads",
      "/admin/meter",
    ]);
  });

  it("defines SEO routes and seeded demo data ids", () => {
    expect(SEO_E2E_ROUTES.map((route) => route.path)).toEqual(["/sitemap.xml", "/robots.txt"]);
    expect(E2E_SEED_PACKAGE_SLUG).toBe("standalone-single-city-udaipur-the-romantic-lake-escape");
    expect(E2E_SEED_PACKAGE_TITLE).toBe("2D/1N Udaipur: The Romantic Lake Escape");
    expect(E2E_SEARCH_QUERY).toBe("Udaipur");
    expect(HOME_QUICK_PICK_CITIES).toHaveLength(9);
    expect(HOME_QUICK_PICK_CITIES[0]).toBe("Udaipur");
    expect(HOME_QUICK_PICK_CITIES).toContain("Jaisalmer");
    expect(BRAND_LOGO_ALT).toBe("Browse My Vacations");
    expect(BRAND_LOGO_SRC).toBe("/brand/browsemyvacations-logo.png");
  });

  it("finds public page metadata by path", () => {
    expect(findPublicE2ePage("/contact")?.heading).toBe("Contact Us");
    expect(findPublicE2ePage("/missing")).toBeUndefined();
  });
});
