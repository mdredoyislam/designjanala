import { defineConfig, devices } from "@playwright/test";

const API = "http://localhost:4000";
const WEB = "http://localhost:3000";
const DASHBOARD = "http://localhost:3001";
const root = "../..";
const reuse = !process.env.CI;

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
    { name: "dashboard", testMatch: /dashboard\.spec\.ts/, use: { ...devices["Desktop Chrome"], baseURL: DASHBOARD } },
  ],
  webServer: [
    {
      command: "npm run start -w @designjanala/api",
      cwd: root,
      url: `${API}/health`,
      reuseExistingServer: reuse,
      env: { PORT: "4000", NODE_ENV: "development" },
    },
    {
      command: "npm run start -w @designjanala/web",
      cwd: root,
      url: WEB,
      reuseExistingServer: reuse,
      env: { API_URL: API },
    },
    {
      command: "npm run start -w @designjanala/dashboard",
      cwd: root,
      url: DASHBOARD,
      reuseExistingServer: reuse,
      env: { API_URL: API },
    },
  ],
});
