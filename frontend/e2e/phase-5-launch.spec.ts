import { ABOUT_PAGE, BMV_CONTACT, CONTACT_PAGE, MICE_PAGE } from "@bmv/shared";
import { expect, test } from "@playwright/test";

test.describe("Phase 5 launch polish", () => {
  test("TC-E2E-LAUNCH-01: About page shows story, trust signals, and contact path", async ({
    page,
  }) => {
    await page.goto("/about");
    await expect(
      page.getByRole("heading", { name: ABOUT_PAGE.hero.heading, level: 1 }),
    ).toBeVisible();
    await expect(page.getByText(ABOUT_PAGE.hero.intro.slice(0, 60), { exact: false })).toBeVisible();
    await expect(page.getByRole("heading", { name: ABOUT_PAGE.curate.heading })).toBeVisible();
    await expect(page.getByRole("link", { name: ABOUT_PAGE.footerCta.secondaryCta.label })).toHaveAttribute(
      "href",
      "/contact",
    );
  });

  test("TC-E2E-LAUNCH-02: Contact page shows click-to-call and mailto details", async ({ page }) => {
    await page.goto("/contact");
    await expect(
      page.getByRole("heading", { name: CONTACT_PAGE.hero.heading, level: 1 }),
    ).toBeVisible();
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
    await expect(
      page.getByRole("heading", { name: MICE_PAGE.hero.heading, level: 1 }),
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: MICE_PAGE.services.heading })).toBeVisible();
    await expect(page.getByTestId("mice-inquiry-form")).toBeVisible();
    await expect(page.getByLabel("Company Name *")).toBeVisible();
    await expect(page.getByLabel("Requirement Type *")).toBeVisible();
  });
});
