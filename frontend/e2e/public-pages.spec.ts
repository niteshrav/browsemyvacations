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
  test("TC-E2E-PUB-RADAR: home shows vacation feasibility radar popup", async ({ page }) => {
    await page.goto("/");
    const popup = page.getByTestId("vacation-feasibility-radar-popup");
    await expect(popup).toBeVisible();
    await expect(popup.getByText("VACATION FEASIBILITY RADAR")).toBeVisible();
    const routeStrip = popup.getByTestId("feasibility-radar-route-strip");
    await expect(routeStrip).toBeVisible();
    await expect(routeStrip.getByText("Jaipur", { exact: true })).toBeVisible();
    await expect(routeStrip.getByText("Udaipur", { exact: true })).toBeVisible();
    await expect(popup.getByText("FEASIBILITY:")).toBeVisible();
    await expect(
      popup.getByRole("link", { name: "Submit Custom Request & Check Feasibility" }),
    ).toHaveAttribute("href", "/vacation-meter");
  });
});

test.describe("Home admin login", () => {
  test("TC-E2E-PUB-ADMIN: header admin popup shows seeded credentials and signs in", async ({
    page,
  }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Admin" }).click();
    const dialog = page.getByTestId("admin-login-dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("heading", { name: "Admin login" })).toBeVisible();
    await expect(page.getByTestId("admin-seed-credentials")).toContainText(
      "admin@browsemyvacations.com",
    );
    await dialog.getByLabel("Email").fill("admin@browsemyvacations.com");
    await dialog.getByLabel("Password").fill("changeme123");
    await dialog.getByRole("button", { name: "Sign in" }).click();
    await expect(page.getByRole("heading", { name: "Destinations", level: 1 })).toBeVisible({
      timeout: 30_000,
    });
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
