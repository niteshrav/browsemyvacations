import { BRAND_LOGO_ALT, BRAND_LOGO_SRC, PUBLIC_E2E_PAGES, SEO_E2E_ROUTES } from "@bmv/shared";
import { expect, test } from "@playwright/test";

test.describe("Public screens", () => {
  for (const route of PUBLIC_E2E_PAGES) {
    test(`TC-E2E-PUB-${route.id}: ${route.path} renders`, async ({ page }) => {
      const response = await page.goto(route.path);
      expect(response?.status()).toBe(200);
      await expect(page.getByRole("heading", { name: route.heading })).toBeVisible();
      const brandLink = page.getByRole("link", { name: BRAND_LOGO_ALT });
      await expect(brandLink).toBeVisible();
      const brandImage = brandLink.getByRole("img", { name: BRAND_LOGO_ALT });
      await expect(brandImage).toBeVisible();
      await expect(brandImage).toHaveAttribute("src", new RegExp(`${BRAND_LOGO_SRC.replace(/\./g, "\\.")}$`));
    });
  }
});

test.describe("Home feasibility radar popup", () => {
  test("TC-E2E-PUB-RADAR: home shows vacation feasibility radar at bottom right", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/");
    await page.evaluate(() => sessionStorage.removeItem("meter_popup_dismissed"));
    await page.reload();
    const popup = page.locator('[data-testid="vacation-feasibility-radar-popup"]:visible');
    await expect(popup).toBeVisible();
    await expect(popup).toHaveCSS("position", "fixed");
    await expect(popup.getByText("VACATION FEASIBILITY RADAR")).toBeVisible();
    const routeStrip = popup.getByTestId("feasibility-radar-route-strip");
    await expect(routeStrip).toBeVisible();
    await expect(routeStrip.getByText("Jaipur", { exact: true })).toBeVisible();
    await expect(routeStrip.getByText("Udaipur", { exact: true })).toBeVisible();
    await expect(popup.getByText("FEASIBILITY:")).toBeVisible();
    await expect(
      popup.getByRole("link", { name: "Submit Custom Request & Check Feasibility" }),
    ).toHaveAttribute("href", "/vacation-meter");

    // Radar must not sit on the hero half-background photo.
    const heroPhoto = page.getByTestId("hero-flank-right");
    await expect(heroPhoto).toBeVisible();
    await expect(heroPhoto.locator('[data-testid="vacation-feasibility-radar-popup"]')).toHaveCount(
      0,
    );
  });
});

test.describe("Home admin login", () => {
  test("TC-E2E-PUB-ADMIN: header admin popup signs in", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Admin" }).click();
    const dialog = page.getByTestId("admin-login-dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("heading", { name: "Admin login" })).toBeVisible();
    await expect(page.getByTestId("admin-seed-credentials")).toHaveCount(0);
    await dialog.getByLabel("Email").fill("admin@browsemyvacations.com");
    await dialog.getByLabel("Password").fill("changeme123");
    await dialog.getByRole("button", { name: "Sign in" }).click();
    await page.waitForURL(/\/admin\/destinations/, { timeout: 30_000 });
    await expect(page.getByRole("heading", { name: "Destinations", level: 1 })).toBeVisible();
  });
});

test.describe("SEO routes", () => {
  for (const route of SEO_E2E_ROUTES) {
    test(`TC-E2E-SEO-${route.id}: ${route.path} is reachable`, async ({ page }) => {
      const response = await page.goto(route.path);
      expect(response?.status()).toBe(200);
      const body = await page.content();
      if (route.id === "sitemap") {
        expect(body).toContain("<urlset");
      } else {
        expect(body.toLowerCase()).toContain("user-agent");
      }
    });
  }
});
