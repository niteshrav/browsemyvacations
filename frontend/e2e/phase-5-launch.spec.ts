import { BMV_CONTACT, ABOUT_PAGE } from "@bmv/shared";
import { expect, test } from "@playwright/test";

test.describe("Phase 5 launch polish", () => {
  test("TC-E2E-LAUNCH-01: About page shows story, trust signals, and contact path", async ({
    page,
  }) => {
    await page.goto("/about");
    await expect(page.getByRole("heading", { name: ABOUT_PAGE.heading, level: 1 })).toBeVisible();
    await expect(page.getByText(ABOUT_PAGE.intro)).toBeVisible();
    await expect(page.getByRole("heading", { name: "Why travelers trust us" })).toBeVisible();
    await expect(page.getByRole("link", { name: ABOUT_PAGE.contactCta.label })).toHaveAttribute(
      "href",
      "/contact",
    );
  });

  test("TC-E2E-LAUNCH-02: Contact page shows click-to-call and mailto details", async ({ page }) => {
    await page.goto("/contact");
    const details = page.getByTestId("contact-details");
    await expect(details).toBeVisible();
    await expect(details.getByRole("link", { name: BMV_CONTACT.phoneDisplay })).toHaveAttribute(
      "href",
      BMV_CONTACT.telHref,
    );
    await expect(details.getByRole("link", { name: BMV_CONTACT.email })).toHaveAttribute(
      "href",
      BMV_CONTACT.mailtoHref,
    );
    await expect(details.getByText(BMV_CONTACT.address)).toBeVisible();
    await expect(details.getByText(BMV_CONTACT.hours)).toBeVisible();
  });

  test("TC-E2E-LAUNCH-03: MICE page shows offerings and inquiry form", async ({ page }) => {
    await page.goto("/mice");
    await expect(page.getByRole("heading", { name: "MICE Travel", level: 1 })).toBeVisible();
    await expect(page.getByText("Corporate offerings")).toBeVisible();
    await expect(page.getByTestId("mice-inquiry-form")).toBeVisible();
    await expect(page.getByLabel("Company name *")).toBeVisible();
    await expect(page.getByLabel("Event type *")).toBeVisible();
  });
});
