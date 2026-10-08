import { expect, test } from "@playwright/test";

test("health check", async ({ request }) => {
  const res = await request.get("/health");
  expect(await res.json()).toEqual({ ok: true });
});

test("accepts a lead and rejects an invalid one", async ({ request }) => {
  const ok = await request.post("/leads", {
    data: { name: "E2E Api", email: "e2e-api@example.com", details: "Created by the API end-to-end test." },
  });
  expect(ok.status()).toBe(201);

  const bad = await request.post("/leads", { data: { name: "E", email: "nope", details: "x" } });
  expect(bad.status()).toBe(400);
});
