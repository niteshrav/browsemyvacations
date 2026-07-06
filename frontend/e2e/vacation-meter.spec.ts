import { expect, test } from "@playwright/test";

test.describe("Vacation Meter", () => {
  test("TC-E2E-METER-01: feasibility radar calculates estimate", async ({ page }) => {
    await page.goto("/vacation-meter");
    await expect(page.getByRole("heading", { name: "Vacation Feasibility Radar" })).toBeVisible();
    await expect(page.getByText("YOUR VACATION RADAR")).toBeVisible();
    await expect(page.getByText("REAL-TIME FEASIBILITY ENGINE")).toBeVisible();

    await expect(page.getByText("FEASIBILITY:")).toBeVisible();
    await expect(page.getByText("Logistically Practical")).toBeVisible();

    await page.getByRole("button", { name: "Submit Custom Request & Check Feasibility" }).click();
    await expect(page.getByRole("heading", { name: "Your indicative estimate" })).toBeVisible({
      timeout: 30_000,
    });
  });

  test("TC-E2E-METER-02: multi-destination updates feasibility and route map", async ({ page }) => {
    await page.goto("/vacation-meter");
    await expect(page.getByLabel("Jaipur", { exact: true })).toBeVisible({ timeout: 10_000 });
    await page.getByLabel("Jaipur", { exact: true }).check();
    await expect(page.getByText(/Total: \d+ km/)).toBeVisible({ timeout: 10_000 });
    await expect(
      page.getByTestId(/vacation-google-map|vacation-route-map-fallback/),
    ).toBeVisible();
  });
});
