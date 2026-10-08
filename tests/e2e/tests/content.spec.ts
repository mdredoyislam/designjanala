import { expect, test } from "@playwright/test";
import { signIn } from "./login";

const WEB = "http://localhost:3000";

test("a content edit in the dashboard shows on the website, and reset restores it", async ({ page, request }) => {
  const client = `E2E Client ${Date.now()}`;
  await signIn(page, "/content/clients");
  await expect(page.getByRole("heading", { name: "Clients" })).toBeVisible();

  await page.getByRole("button", { name: "+ Add client" }).click();
  await page.getByRole("textbox", { name: "client 4", exact: true }).fill(client);
  await page.getByRole("button", { name: "Save changes" }).click();
  await expect(page.getByRole("status")).toContainText("Saved. The website is showing the change now.");
  expect(await (await request.get(WEB)).text()).toContain(client);

  page.once("dialog", (d) => d.accept());
  await page.getByRole("button", { name: "Reset to original" }).click();
  await expect(page.getByRole("status")).toContainText("Reset to the original content.");
  expect(await (await request.get(WEB)).text()).not.toContain(client);
});

test("invalid content is rejected with the field highlighted", async ({ page }) => {
  await signIn(page, "/content/services");
  await page.getByRole("button", { name: /Agentic AI Solutions/ }).first().click();
  await page.getByLabel("Slug").first().fill("Not A Slug");
  await page.getByRole("button", { name: "Save changes" }).click();
  await expect(page.getByRole("status")).toContainText("Some fields need attention.");
  await expect(page.getByText("Use lowercase letters, numbers and dashes")).toBeVisible();
});
