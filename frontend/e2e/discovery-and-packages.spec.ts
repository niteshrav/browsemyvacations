import { E2E_SEARCH_QUERY, E2E_SEED_PACKAGE_SLUG, E2E_SEED_PACKAGE_TITLE, HOME_QUICK_PICK_CITIES } from "@bmv/shared";
import { expect, test } from "@playwright/test";

test.describe("Discovery flow", () => {
  test("TC-E2E-DISC-01: home search navigates to search results", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("combobox", { name: /search by city or package/i }).fill(E2E_SEARCH_QUERY);
    await page.getByRole("button", { name: "Search" }).click();
    await expect(page).toHaveURL(/\/search\?q=Udaipur/i);
    await expect(page.getByRole("heading", { name: "Search results" })).toBeVisible();
    await expect(page.getByText(E2E_SEED_PACKAGE_TITLE)).toBeVisible({ timeout: 15_000 });
  });

  test("TC-E2E-DISC-02: quick pick navigates when present", async ({ page }) => {
    await page.goto("/");
    const quickPick = page.getByRole("link", { name: E2E_SEARCH_QUERY }).first();
    await expect(quickPick).toBeVisible();
    await quickPick.click();
    await expect(page).toHaveURL(/\/search\?q=/i);
  });

  test("TC-E2E-DISC-07: Udaipur quick pick shows only Udaipur-featured packages", async ({ page }) => {
    await page.goto("/search?q=udaipur");
    await expect(page.getByRole("heading", { name: "Search results" })).toBeVisible();
    await expect(page.getByText(E2E_SEED_PACKAGE_TITLE)).toBeVisible({ timeout: 15_000 });
    await expect(page.getByText("2D/1N Kumbhalgarh: The Great Wall of India Trek")).toHaveCount(0);
    await expect(page.getByText("2D/1N Nathdwara: Shrinathji Darshan Spiritual Break")).toHaveCount(0);
  });

  test("TC-E2E-DISC-06: quick picks show featured Rajasthan cities with photos", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByTestId("quick-picks-bar")).toBeVisible();
    for (const city of HOME_QUICK_PICK_CITIES) {
      const card = page.getByTestId(`quick-pick-${city.toLowerCase().replace(/\s+/g, "-")}`);
      await expect(card).toBeVisible();
      const image = card.getByRole("img");
      await expect(image).toBeVisible();
      await expect(image).toHaveAttribute("src", /images\.unsplash\.com/);
      const naturalWidth = await image.evaluate((node) => (node as HTMLImageElement).naturalWidth);
      expect(naturalWidth).toBeGreaterThan(0);
      await expect(card).toHaveAttribute("aria-label", city);
    }
  });

  test("TC-E2E-DISC-08: hero shows Rajasthan tourism photos on left and right flanks", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/");
    const leftFlank = page.getByTestId("hero-flank-left");
    const rightFlank = page.getByTestId("hero-flank-right");
    await expect(leftFlank).toBeVisible();
    await expect(rightFlank).toBeVisible();
    await expect(leftFlank.locator("img")).toHaveCount(3);
    await expect(rightFlank.locator("img")).toHaveCount(3);
    await expect(leftFlank.locator("img").first()).toHaveAttribute("src", /images\.unsplash\.com/);
    const naturalWidth = await leftFlank
      .locator("img")
      .first()
      .evaluate((node) => (node as HTMLImageElement).naturalWidth);
    expect(naturalWidth).toBeGreaterThan(0);
  });

  test("TC-E2E-DISC-09: hero flank images change on hover", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/");
    const leftFlank = page.getByTestId("hero-flank-left");
    const firstSrc = await leftFlank.locator("img").first().getAttribute("src");

    await leftFlank.locator("button").first().hover();
    await expect
      .poll(async () => leftFlank.locator("img").first().getAttribute("src"))
      .not.toBe(firstSrc);
  });

  test("TC-E2E-DISC-03: hero combobox lists Rajasthan cities on focus", async ({ page }) => {
    await page.goto("/");
    const combobox = page.getByRole("combobox", { name: /search by city or package/i });
    await combobox.focus();
    await expect(page.getByRole("option", { name: "Jaipur" })).toBeVisible();
    await expect(page.getByRole("option", { name: "Udaipur" })).toBeVisible();
  });

  test("TC-E2E-DISC-05: hero search dropdown overlays without stretching the button", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    const combobox = page.getByRole("combobox", { name: /search by city or package/i });
    const searchButton = page.getByRole("button", { name: "Search" });
    await combobox.focus();
    const listbox = page.locator("#q-listbox");
    await expect(listbox).toBeVisible();

    const inputHeight = await combobox.evaluate((el) => el.getBoundingClientRect().height);
    const buttonHeight = await searchButton.evaluate((el) => el.getBoundingClientRect().height);
    const listboxHeight = await listbox.evaluate((el) => el.getBoundingClientRect().height);

    expect(inputHeight).toBeLessThan(64);
    expect(buttonHeight).toBeLessThan(64);
    expect(Math.abs(inputHeight - buttonHeight)).toBeLessThan(8);
    expect(listboxHeight).toBeGreaterThan(inputHeight);
  });

  test("TC-E2E-DISC-04: home shows packages grouped by destination", async ({ page }) => {
    await page.goto("/");
    const udaipurSection = page.locator("#udaipur");
    await expect(udaipurSection.getByRole("heading", { name: "Udaipur", level: 2 })).toBeVisible({
      timeout: 8_000,
    });
    await expect(udaipurSection.getByText(E2E_SEED_PACKAGE_TITLE)).toBeVisible({
      timeout: 8_000,
    });
  });
});

test.describe("Packages flow", () => {
  test("TC-E2E-PKG-01: packages list loads", async ({ page }) => {
    await page.goto("/packages");
    await expect(page.getByRole("heading", { name: "Tour Packages" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Standalone Single-City Escapes" })).toBeVisible();
    await expect(page.getByText(E2E_SEED_PACKAGE_TITLE)).toBeVisible({ timeout: 15_000 });
  });

  test("TC-E2E-PKG-02: package detail shows quote action", async ({ page }) => {
    await page.goto(`/packages/${E2E_SEED_PACKAGE_SLUG}`);
    await expect(page.getByRole("heading", { name: E2E_SEED_PACKAGE_TITLE })).toBeVisible();
    await expect(page.getByRole("button", { name: "Customise & Quote" })).toBeVisible();
  });
});
