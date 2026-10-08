import { expect, test } from "@playwright/test";
import { signIn } from "./login";

const WEB = "http://localhost:3000";

test("the dashboard requires sign-in", async ({ page }) => {
  await page.goto("/leads");
  await expect(page).toHaveURL(/\/login\?next=%2Fleads/);
  await page.getByLabel("Password").fill("not-the-password");
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page.getByText("That password isn't right.")).toBeVisible();
});

test("overview shows pipeline numbers", async ({ page }) => {
  await signIn(page);
  await expect(page.getByRole("heading", { name: "Studio pipeline" })).toBeVisible();
  await expect(page.getByText("Total leads")).toBeVisible();
});

test("a contact-form submission appears in the dashboard and its status can be changed", async ({ page }) => {
  const name = `E2E Lead ${Date.now()}`;

  await page.goto(`${WEB}/contact`);
  const form = page.locator("form").filter({ has: page.locator('textarea[name="details"]') });
  await form.locator('input[name="name"]').fill(name);
  await form.locator('input[name="email"]').fill("e2e@example.com");
  await form.locator('textarea[name="details"]').fill("We would like a new marketing site and an admin dashboard.");
  await form.locator('button[type="submit"]').click();
  await expect(page.getByText(/received your brief/i)).toBeVisible();

  await signIn(page, "/leads?status=new");
  const row = page.getByRole("row").filter({ hasText: name });
  await expect(row).toBeVisible();

  // Wait for the server action to finish before navigating away.
  await Promise.all([
    page.waitForResponse((r) => r.request().method() === "POST" && r.url().includes("/leads")),
    row.getByRole("combobox", { name: `Status for ${name}` }).selectOption("contacted"),
  ]);
  await page.goto("/leads?status=contacted");
  await expect(page.getByRole("row").filter({ hasText: name })).toBeVisible();
});
