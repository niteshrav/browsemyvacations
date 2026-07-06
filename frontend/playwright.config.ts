import { defineConfig, devices } from "@playwright/test";
import { BMV_E2E_API_PORT, BMV_E2E_WEB_PORT } from "@bmv/shared";

const API_PORT = process.env.E2E_API_PORT ?? String(BMV_E2E_API_PORT);
const WEB_PORT = process.env.E2E_WEB_PORT ?? String(BMV_E2E_WEB_PORT);
const DATABASE_URL =
  process.env.DATABASE_URL ??
  "postgresql://bmv:bmv@localhost:5433/browsemyvacations?schema=public";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  timeout: 60_000,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: `http://localhost:${WEB_PORT}`,
    trace: "on-first-retry",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: [
    {
      command: "pnpm --filter backend start:prod",
      cwd: "..",
      url: `http://127.0.0.1:${API_PORT}/api/v1/health`,
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
      env: {
        ...process.env,
        PORT: API_PORT,
        DATABASE_URL,
        CORS_ORIGIN: `http://127.0.0.1:${WEB_PORT},http://localhost:${WEB_PORT}`,
      },
    },
    {
      command: `pnpm exec next dev -p ${WEB_PORT}`,
      url: `http://127.0.0.1:${WEB_PORT}`,
      reuseExistingServer: !process.env.CI,
      timeout: 180_000,
      env: {
        ...process.env,
        NEXT_PUBLIC_API_URL: `http://127.0.0.1:${API_PORT}/api/v1`,
        NEXT_PUBLIC_SITE_URL: `http://127.0.0.1:${WEB_PORT}`,
      },
    },
  ],
});
