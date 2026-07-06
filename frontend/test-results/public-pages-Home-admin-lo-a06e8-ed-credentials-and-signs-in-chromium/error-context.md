# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: public-pages.spec.ts >> Home admin login >> TC-E2E-PUB-ADMIN: header admin popup shows seeded credentials and signs in
- Location: e2e/public-pages.spec.ts:37:7

# Error details

```
TimeoutError: page.waitForURL: Timeout 30000ms exceeded.
=========================== logs ===========================
waiting for navigation until "load"
============================================================
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner [ref=e2]:
    - generic [ref=e3]:
      - link "Browse My Vacations" [ref=e4] [cursor=pointer]:
        - /url: /
        - img "Browse My Vacations" [ref=e5]
      - navigation "Main navigation" [ref=e6]:
        - link "Home" [ref=e7] [cursor=pointer]:
          - /url: /
        - link "Packages" [ref=e8] [cursor=pointer]:
          - /url: /packages
        - link "Vacation Meter" [ref=e9] [cursor=pointer]:
          - /url: /vacation-meter
        - link "MICE" [ref=e10] [cursor=pointer]:
          - /url: /mice
        - link "About Us" [ref=e11] [cursor=pointer]:
          - /url: /about
        - link "Contact" [ref=e12] [cursor=pointer]:
          - /url: /contact
        - button "Admin" [ref=e13]
  - main [ref=e14]:
    - generic [ref=e15]:
      - generic [ref=e16]:
        - navigation "Admin navigation" [ref=e17]:
          - link "Destinations" [ref=e18] [cursor=pointer]:
            - /url: /admin/destinations
          - link "Packages" [ref=e19] [cursor=pointer]:
            - /url: /admin/packages
          - link "Leads" [ref=e20] [cursor=pointer]:
            - /url: /admin/leads
          - link "Meter" [ref=e21] [cursor=pointer]:
            - /url: /admin/meter
          - link "View site" [ref=e22] [cursor=pointer]:
            - /url: /
        - button "Sign out" [ref=e23]
      - generic [ref=e24]:
        - heading "Destinations" [level=1] [ref=e25]
        - generic [ref=e26]:
          - heading "Add destination" [level=2] [ref=e27]
          - textbox "Name" [ref=e28]
          - textbox "slug" [ref=e29]
          - spinbutton [ref=e30]: "0"
          - button "Create" [ref=e31]
        - list [ref=e32]
  - contentinfo [ref=e33]:
    - generic [ref=e34]:
      - paragraph [ref=e35]: Vacations You'll Love. Memories You'll Keep.
      - paragraph [ref=e36]: © 2026 Browse My Vacations. All rights reserved.
      - generic [ref=e37]:
        - link "About" [ref=e38] [cursor=pointer]:
          - /url: /about
        - link "Contact" [ref=e39] [cursor=pointer]:
          - /url: /contact
        - link "Vacation Meter" [ref=e40] [cursor=pointer]:
          - /url: /vacation-meter
        - link "Privacy" [ref=e41] [cursor=pointer]:
          - /url: /privacy
  - button "Open Next.js Dev Tools" [ref=e47] [cursor=pointer]:
    - img [ref=e48]
  - alert [ref=e51]
```

# Test source

```ts
  1  | import { BRAND_LOGO_ALT, BRAND_LOGO_SRC, PUBLIC_E2E_PAGES, SEO_E2E_ROUTES } from "@bmv/shared";
  2  | import { expect, test } from "@playwright/test";
  3  | 
  4  | test.describe("Public screens", () => {
  5  |   for (const route of PUBLIC_E2E_PAGES) {
  6  |     test(`TC-E2E-PUB-${route.id}: ${route.path} renders`, async ({ page }) => {
  7  |       const response = await page.goto(route.path);
  8  |       expect(response?.status()).toBe(200);
  9  |       await expect(page.getByRole("heading", { name: route.heading })).toBeVisible();
  10 |       const brandLink = page.getByRole("link", { name: BRAND_LOGO_ALT });
  11 |       await expect(brandLink).toBeVisible();
  12 |       const brandImage = brandLink.getByRole("img", { name: BRAND_LOGO_ALT });
  13 |       await expect(brandImage).toBeVisible();
  14 |       await expect(brandImage).toHaveAttribute("src", new RegExp(`${BRAND_LOGO_SRC.replace(/\./g, "\\.")}$`));
  15 |     });
  16 |   }
  17 | });
  18 | 
  19 | test.describe("Home feasibility radar popup", () => {
  20 |   test("TC-E2E-PUB-RADAR: home shows vacation feasibility radar popup", async ({ page }) => {
  21 |     await page.goto("/");
  22 |     const popup = page.getByTestId("vacation-feasibility-radar-popup");
  23 |     await expect(popup).toBeVisible();
  24 |     await expect(popup.getByText("VACATION FEASIBILITY RADAR")).toBeVisible();
  25 |     const routeStrip = popup.getByTestId("feasibility-radar-route-strip");
  26 |     await expect(routeStrip).toBeVisible();
  27 |     await expect(routeStrip.getByText("Jaipur", { exact: true })).toBeVisible();
  28 |     await expect(routeStrip.getByText("Udaipur", { exact: true })).toBeVisible();
  29 |     await expect(popup.getByText("FEASIBILITY:")).toBeVisible();
  30 |     await expect(
  31 |       popup.getByRole("link", { name: "Submit Custom Request & Check Feasibility" }),
  32 |     ).toHaveAttribute("href", "/vacation-meter");
  33 |   });
  34 | });
  35 | 
  36 | test.describe("Home admin login", () => {
  37 |   test("TC-E2E-PUB-ADMIN: header admin popup shows seeded credentials and signs in", async ({
  38 |     page,
  39 |   }) => {
  40 |     await page.goto("/");
  41 |     await page.getByRole("button", { name: "Admin" }).click();
  42 |     const dialog = page.getByTestId("admin-login-dialog");
  43 |     await expect(dialog).toBeVisible();
  44 |     await expect(dialog.getByRole("heading", { name: "Admin login" })).toBeVisible();
  45 |     await expect(page.getByTestId("admin-seed-credentials")).toContainText(
  46 |       "admin@browsemyvacations.com",
  47 |     );
  48 |     await dialog.getByLabel("Email").fill("admin@browsemyvacations.com");
  49 |     await dialog.getByLabel("Password").fill("changeme123");
  50 |     await dialog.getByRole("button", { name: "Sign in" }).click();
> 51 |     await page.waitForURL(/\/admin\/destinations/, { timeout: 30_000 });
     |                ^ TimeoutError: page.waitForURL: Timeout 30000ms exceeded.
  52 |     await expect(page.getByRole("heading", { name: "Destinations", level: 1 })).toBeVisible();
  53 |   });
  54 | });
  55 | 
  56 | test.describe("SEO routes", () => {
  57 |   for (const route of SEO_E2E_ROUTES) {
  58 |     test(`TC-E2E-SEO-${route.id}: ${route.path} is reachable`, async ({ page }) => {
  59 |       const response = await page.goto(route.path);
  60 |       expect(response?.status()).toBe(200);
  61 |       const body = await page.content();
  62 |       if (route.id === "sitemap") {
  63 |         expect(body).toContain("<urlset");
  64 |       } else {
  65 |         expect(body.toLowerCase()).toContain("user-agent");
  66 |       }
  67 |     });
  68 |   }
  69 | });
  70 | 
```