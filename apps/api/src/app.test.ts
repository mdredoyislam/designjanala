import { beforeEach, describe, expect, it } from "vitest";
import type { Lead, LeadStats } from "@designjanala/shared";
import { createApp } from "./app";
import { MemoryLeadStore, demoLeads } from "./store";

const valid = { name: "Ada Lovelace", email: "ada@example.com", details: "We need an AI-powered analytics dashboard." };

describe("API", () => {
  let app: ReturnType<typeof createApp>;
  beforeEach(() => {
    app = createApp({ store: new MemoryLeadStore(demoLeads(Date.parse("2026-10-08T00:00:00Z"))) });
  });

  const json = (method: string, body: unknown) => ({ method, headers: { "content-type": "application/json" }, body: JSON.stringify(body) });

  it("reports health", async () => {
    const res = await app.request("/health");
    expect(await res.json()).toEqual({ ok: true });
  });

  it("creates a lead with status new", async () => {
    const res = await app.request("/leads", json("POST", valid));
    expect(res.status).toBe(201);
    const lead = (await res.json()) as Lead;
    expect(lead).toMatchObject({ ...valid, status: "new", company: "" });
    const fetched = await app.request(`/leads/${lead.id}`);
    expect(((await fetched.json()) as Lead).email).toBe(valid.email);
  });

  it("rejects an invalid lead with field errors", async () => {
    const res = await app.request("/leads", json("POST", { ...valid, email: "nope" }));
    expect(res.status).toBe(400);
    expect(((await res.json()) as { fields: unknown }).fields).toEqual({ email: "Please enter a valid email." });
  });

  it("rejects a non-JSON body", async () => {
    const res = await app.request("/leads", { method: "POST", body: "hello" });
    expect(res.status).toBe(400);
  });

  it("lists leads newest first and filters by status", async () => {
    const all = (await (await app.request("/leads")).json()) as Lead[];
    expect(all.map((l) => l.id)).toEqual(["demo-1", "demo-2", "demo-3", "demo-4", "demo-5"]);
    const won = (await (await app.request("/leads?status=won")).json()) as Lead[];
    expect(won).toHaveLength(1);
    expect((await app.request("/leads?status=bogus")).status).toBe(400);
  });

  it("updates a lead's status", async () => {
    const res = await app.request("/leads/demo-1", json("PATCH", { status: "contacted" }));
    expect(((await res.json()) as Lead).status).toBe("contacted");
    expect((await app.request("/leads/demo-1", json("PATCH", { status: "archived" }))).status).toBe(400);
    expect((await app.request("/leads/missing", json("PATCH", { status: "won" }))).status).toBe(404);
  });

  it("counts leads by status", async () => {
    const stats = (await (await app.request("/stats")).json()) as LeadStats;
    expect(stats.total).toBe(5);
    expect(stats.byStatus).toEqual({ new: 1, contacted: 1, proposal: 1, won: 1, lost: 1 });
  });

  it("requires the token for dashboard routes but not for submitting", async () => {
    const secured = createApp({ store: new MemoryLeadStore(), apiToken: "s3cret" });
    expect((await secured.request("/leads")).status).toBe(401);
    expect((await secured.request("/leads", { headers: { authorization: "Bearer s3cret" } })).status).toBe(200);
    expect((await secured.request("/leads", json("POST", valid))).status).toBe(201);
  });
});
