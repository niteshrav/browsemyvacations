# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: vacation-meter.spec.ts >> Vacation Meter >> TC-E2E-METER-01: feasibility radar calculates estimate
- Location: e2e/vacation-meter.spec.ts:4:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('Logistically Practical')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText('Logistically Practical')

```

```yaml
- banner:
  - link "Browse My Vacations":
    - /url: /
    - img "Browse My Vacations"
  - navigation "Main navigation":
    - link "Home":
      - /url: /
    - link "Packages":
      - /url: /packages
    - link "Vacation Meter":
      - /url: /vacation-meter
    - link "MICE":
      - /url: /mice
    - link "About Us":
      - /url: /about
    - link "Contact":
      - /url: /contact
    - button "Admin"
- main:
  - heading "Vacation Feasibility Radar" [level=1]
  - paragraph: Plan your Rajasthan route, see real-time feasibility, and request a custom quote with an indicative price estimate.
  - complementary:
    - heading "YOUR VACATION RADAR" [level=2]
    - heading "1. Select Destinations" [level=3]
    - heading "2. Passenger Config" [level=3]
    - text: Adults
    - spinbutton "Adults": "2"
    - text: Children
    - spinbutton "Children": "0"
    - heading "3. Date / Pacing" [level=3]
    - text: Travel date
    - textbox "Travel date": 2026-07-30
    - text: RELAXED BUSY
    - slider "Trip pacing": "50"
    - paragraph: MODERATE
    - text: Total night stay
    - spinbutton "Total night stay": "3"
    - text: Pick-up time
    - textbox "Pick-up time": 09:00
    - text: Drop-off time
    - textbox "Drop-off time": 18:00
    - text: Vehicle preference
    - combobox "Vehicle preference":
      - option "Sedan" [selected]
      - option "SUV"
      - option "Innova"
  - heading "REAL-TIME FEASIBILITY ENGINE" [level=2]
  - text: Select destinations to preview your route
  - img
  - paragraph: "FEASIBILITY: —"
  - paragraph: Select destinations to begin
  - paragraph: Travel statistics
  - paragraph: Route stats appear here
  - text: Distance 0 km Travel time 0 hrs
  - paragraph: Pro-Tip
  - paragraph: Choose cities and nights to get tailored routing advice.
  - button "Submit Custom Request & Check Feasibility" [disabled]
- contentinfo:
  - paragraph: Vacations You'll Love. Memories You'll Keep.
  - paragraph: © 2026 Browse My Vacations. All rights reserved.
  - link "About":
    - /url: /about
  - link "Contact":
    - /url: /contact
  - link "Vacation Meter":
    - /url: /vacation-meter
  - link "Privacy":
    - /url: /privacy
- alert
```

# Test source

```ts
  1  | import { expect, test } from "@playwright/test";
  2  | 
  3  | test.describe("Vacation Meter", () => {
  4  |   test("TC-E2E-METER-01: feasibility radar calculates estimate", async ({ page }) => {
  5  |     await page.goto("/vacation-meter");
  6  |     await expect(page.getByRole("heading", { name: "Vacation Feasibility Radar" })).toBeVisible();
  7  |     await expect(page.getByText("YOUR VACATION RADAR")).toBeVisible();
  8  |     await expect(page.getByText("REAL-TIME FEASIBILITY ENGINE")).toBeVisible();
  9  | 
  10 |     await expect(page.getByText("FEASIBILITY:")).toBeVisible();
> 11 |     await expect(page.getByText("Logistically Practical")).toBeVisible();
     |                                                            ^ Error: expect(locator).toBeVisible() failed
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