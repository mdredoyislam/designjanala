import { Hono } from "hono";
import { cors } from "hono/cors";
import { leadInputSchema, leadStatuses, leadUpdateSchema, fieldErrors, type LeadStatus } from "@designjanala/shared";
import type { LeadStore } from "./store";

export type AppOptions = {
  store: LeadStore;
  /** When set, reading and updating leads requires `Authorization: Bearer <token>`. */
  apiToken?: string;
  corsOrigins?: string[];
};

export function createApp({ store, apiToken, corsOrigins = [] }: AppOptions) {
  const app = new Hono();

  app.use("*", cors({ origin: corsOrigins, allowMethods: ["GET", "POST", "PATCH"] }));

  app.get("/health", (c) => c.json({ ok: true }));

  // Public: the website's contact form posts here.
  app.post("/leads", async (c) => {
    const body = await c.req.json().catch(() => null);
    const parsed = leadInputSchema.safeParse(body);
    if (!parsed.success) return c.json({ error: "Invalid lead", fields: fieldErrors(parsed.error) }, 400);
    return c.json(await store.create(parsed.data), 201);
  });

  // Everything below is for the dashboard.
  const admin = new Hono();
  admin.use("*", async (c, next) => {
    if (apiToken && c.req.header("authorization") !== `Bearer ${apiToken}`) return c.json({ error: "Unauthorized" }, 401);
    await next();
  });

  admin.get("/leads", async (c) => {
    const status = c.req.query("status");
    if (status && !leadStatuses.includes(status as LeadStatus)) return c.json({ error: "Unknown status" }, 400);
    return c.json(await store.list({ status: status as LeadStatus | undefined }));
  });

  admin.get("/leads/:id", async (c) => {
    const lead = await store.get(c.req.param("id"));
    return lead ? c.json(lead) : c.json({ error: "Not found" }, 404);
  });

  admin.patch("/leads/:id", async (c) => {
    const parsed = leadUpdateSchema.safeParse(await c.req.json().catch(() => null));
    if (!parsed.success) return c.json({ error: "Invalid status" }, 400);
    const lead = await store.updateStatus(c.req.param("id"), parsed.data.status);
    return lead ? c.json(lead) : c.json({ error: "Not found" }, 404);
  });

  admin.get("/stats", async (c) => c.json(await store.stats()));

  app.route("/", admin);
  return app;
}
