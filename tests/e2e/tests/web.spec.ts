import { expect, test } from "@playwright/test";

test("home page renders the hero and main navigation", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(/AI-powered/i);
  const nav = page.getByRole("navigation", { name: "Main" });
  for (const label of ["Technology", "Blog", "Team"]) await expect(nav.getByRole("link", { name: label })).toBeVisible();
});

test("main pages load without errors", async ({ page }) => {
  for (const path of ["/services", "/portfolio", "/about", "/blog", "/team", "/contact"]) {
    const res = await page.goto(path);
    expect(res?.status(), path).toBe(200);
    await expect(page.locator("h1").first()).toBeVisible();
  }
});

test("unknown pages show the 404 page", async ({ page }) => {
  const res = await page.goto("/this-page-does-not-exist");
  expect(res?.status()).toBe(404);
});

test("contact form shows validation errors", async ({ page }) => {
  await page.goto("/contact");
  const form = page.locator("form").filter({ has: page.locator('textarea[name="details"]') });
  await form.locator('input[name="name"]').fill("A");
  // A well-formed email gets past the browser's own checks so the server validation runs.
  await form.locator('input[name="email"]').fill("a@example.com");
  await form.locator('textarea[name="details"]').fill("short");
  await form.locator('button[type="submit"]').click();
  await expect(page.getByText("Please enter your name.")).toBeVisible();
  await expect(page.getByText("Tell us a little more about your project.")).toBeVisible();
});
