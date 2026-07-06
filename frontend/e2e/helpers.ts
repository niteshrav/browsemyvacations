import {
  ADMIN_PROTECTED_E2E_PAGES,
  DEFAULT_ADMIN_SEED_EMAIL,
  DEFAULT_ADMIN_SEED_PASSWORD,
  resolveAdminSeedCredentials,
} from "@bmv/shared";
import { expect, type Page } from "@playwright/test";

export const adminCredentials = resolveAdminSeedCredentials({});

export async function loginAsAdmin(page: Page) {
  await page.goto("/admin/login");
  await page.getByLabel("Email").fill(adminCredentials.email);
  await page.getByLabel("Password").fill(adminCredentials.password);
  await page.getByRole("button", { name: "Sign in" }).click();
  await page.waitForURL(/\/admin\/destinations/, { timeout: 30_000 });
}

export async function assertAdminProtectedScreens(page: Page) {
  for (const route of ADMIN_PROTECTED_E2E_PAGES) {
    await page.goto(route.path);
    await expect(page.getByRole("heading", { name: route.heading, level: 1 })).toBeVisible();
  }
}

export const demoLead = {
  fullName: "E2E Demo Traveler",
  email: `e2e.demo.${Date.now()}@browsemyvacations.test`,
  phone: "9876543210",
  message: "Automated end-to-end test enquiry.",
};

export { DEFAULT_ADMIN_SEED_EMAIL, DEFAULT_ADMIN_SEED_PASSWORD };
