# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: vacation-meter.spec.ts >> Vacation Meter >> TC-E2E-METER-01: feasibility radar calculates estimate
- Location: e2e/vacation-meter.spec.ts:4:7

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
Call log:
  - navigating to "http://localhost:3100/vacation-meter", waiting until "load"

```

# Test source

```ts
  1  | import { expect, test } from "@playwright/test";
  2  | 
  3  | test.describe("Vacation Meter", () => {
  4  |   test("TC-E2E-METER-01: feasibility radar calculates estimate", async ({ page }) => {
> 5  |     await page.goto("/vacation-meter");
     |                ^ Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
  6  |     await expect(page.getByRole("heading", { name: "Vacation Feasibility Radar" })).toBeVisible();
  7  |     await expect(page.getByText("YOUR VACATION RADAR")).toBeVisible();
  8  |     await expect(page.getByText("REAL-TIME FEASIBILITY ENGINE")).toBeVisible();
  9  | 
  10 |     await expect(page.getByText("FEASIBILITY:")).toBeVisible();
  11 |     await expect(page.getByText("Logistically Practical")).toBeVisible();
  12 | 
  13 |     await page.getByRole("button", { name: "Submit Custom Request & Check Feasibility" }).click();
  14 |     await expect(page.getByRole("heading", { name: "Your indicative estimate" })).toBeVisible({
  15 |       timeout: 30_000,
  16 |     });
  17 |   });
  18 | 
  19 |   test("TC-E2E-METER-02: multi-destination updates feasibility and route map", async ({ page }) => {
  20 |     await page.goto("/vacation-meter");
  21 |     await expect(page.getByLabel("Jaipur", { exact: true })).toBeVisible({ timeout: 10_000 });
  22 |     await page.getByLabel("Jaipur", { exact: true }).check();
  23 |     await expect(page.getByText(/Total: \d+ km/)).toBeVisible({ timeout: 10_000 });
  24 |     await expect(
  25 |       page.getByTestId(/vacation-google-map|vacation-route-map-fallback/),
  26 |     ).toBeVisible();
  27 |   });
  28 | });
  29 | 
```