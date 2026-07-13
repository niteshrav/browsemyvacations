import { ADMIN_AUTH_E2E_PAGES } from "@bmv/shared";
import { expect, test } from "@playwright/test";
import { assertAdminProtectedScreens, loginAsAdmin } from "./helpers";

test.describe("Admin auth", () => {
  for (const route of ADMIN_AUTH_E2E_PAGES) {
    test(`TC-E2E-ADM-AUTH: ${route.path} renders login`, async ({ page }) => {
      await page.goto(route.path);
      await expect(page.getByRole("heading", { name: route.heading })).toBeVisible();
      await expect(page.getByLabel("Email")).toBeVisible();
      await expect(page.getByLabel("Password")).toBeVisible();
    });
  }

  test("TC-E2E-ADM-01: seeded admin can sign in", async ({ page }) => {
    await loginAsAdmin(page);
    await expect(page.getByRole("heading", { name: "Destinations", level: 1 })).toBeVisible();
  });

  test("TC-E2E-ADM-02: unauthenticated user is redirected from protected admin", async ({ page }) => {
    await page.goto("/admin/packages");
    await page.waitForURL("**/admin/login");
    await expect(page.getByRole("heading", { name: "Sign in" })).toBeVisible();
  });

  test("TC-E2E-ADM-03: authenticated admin can open all protected screens", async ({ page }) => {
    await loginAsAdmin(page);
    await assertAdminProtectedScreens(page);
  });
});
