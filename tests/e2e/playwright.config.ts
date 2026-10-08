import { fileURLToPath } from "node:url";
import { defineConfig, devices } from "@playwright/test";

const API = "http://localhost:4000";
const WEB = "http://localhost:3000";
const DASHBOARD = "http://localhost:3001";
const root = "../..";
const reuse = !process.env.CI;
// Test-only secrets shared by the three apps.
export const DASHBOARD_PASSWORD = "e2e-password";
const REVALIDATE_SECRET = "e2e-revalidate";
// Leads, content edits and uploads from test runs stay out of apps/api/data.
const DATA_DIR = fileURLToPath(new URL("./.data/", import.meta.url));

/**
 * Runs against production builds of all three apps (run `npm run build` first).
 * The website is pointed at the API so contact-form submissions show up in the dashboard.
 */
export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
  use: {
    trace: "on-first-retry",
    // Set PW_CHANNEL=chrome to use an installed Chrome instead of `npx playwright install chromium`.
    channel: process.env.PW_CHANNEL,
  },
  projects: [
    { name: "api", testMatch: /api\.spec\.ts/, use: { baseURL: API } },
    { name: "web", testMatch: /web\.spec\.ts/, use: { ...devices["Desktop Chrome"], baseURL: WEB } },
    { name: "dashboard", testMatch: /(dashboard|content)\.spec\.ts/, use: { ...devices["Desktop Chrome"], baseURL: DASHBOARD } },
  ],
  webServer: [
    {
      command: "npm run start -w @designjanala/api",
      cwd: root,
      url: `${API}/health`,
      reuseExistingServer: reuse,
      env: { PORT: "4000", NODE_ENV: "development", DATA_DIR },
    },
    {
      command: "npm run start -w @designjanala/web",
      cwd: root,
      url: WEB,
      reuseExistingServer: reuse,
      env: { API_URL: API, REVALIDATE_SECRET },
    },
    {
      command: "npm run start -w @designjanala/dashboard",
      cwd: root,
      url: `${DASHBOARD}/login`,
      reuseExistingServer: reuse,
      env: { API_URL: API, DASHBOARD_PASSWORD, WEB_URL: WEB, REVALIDATE_SECRET },
    },
  ],
});
