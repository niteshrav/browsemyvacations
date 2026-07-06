import { expect, test } from "@playwright/test";
import { demoLead } from "./helpers";

test.describe("Lead capture", () => {
  test("TC-E2E-LEAD-01: contact form submits successfully", async ({ page }) => {
    await page.goto("/contact");
    await page.getByLabel("Full name *").fill(demoLead.fullName);
    await page.getByLabel("Email *").fill(demoLead.email);
    await page.getByLabel("Phone *").fill(demoLead.phone);
    await page.getByLabel("Message").fill(demoLead.message);
    await page.getByRole("button", { name: "Get Quote" }).click();

    await expect(page.getByText("Request received")).toBeVisible({ timeout: 15_000 });
    await expect(page.getByText("Thank you! Our team will")).toBeVisible();
  });
});
