import { expect, type Page } from "@playwright/test";
import { DASHBOARD_EMAIL, DASHBOARD_PASSWORD } from "../playwright.config";

/** Signs in to the dashboard (production builds always require it). */
export async function signIn(page: Page, next = "/") {
  await page.goto(`/login?next=${encodeURIComponent(next)}`);
  await page.getByLabel("Email").fill(DASHBOARD_EMAIL);
  await page.getByLabel("Password").fill(DASHBOARD_PASSWORD);
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page).toHaveURL(next);
}
