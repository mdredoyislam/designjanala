import { serve } from "@hono/node-server";
import { createApp } from "./app";
import { MemoryLeadStore, demoLeads } from "./store";

const port = Number(process.env.PORT ?? 4000);
const isProd = process.env.NODE_ENV === "production";

const app = createApp({
  // In-memory for now: data resets on restart. Replace with a database-backed LeadStore before launch.
  store: new MemoryLeadStore(isProd ? [] : demoLeads()),
  apiToken: process.env.API_TOKEN || undefined,
  corsOrigins: (process.env.CORS_ORIGINS ?? "http://localhost:3000,http://localhost:3001").split(",").map((s) => s.trim()),
});

if (isProd && !process.env.API_TOKEN) console.warn("API_TOKEN is not set; lead data is readable without auth.");

serve({ fetch: app.fetch, port }, (info) => console.log(`API listening on http://localhost:${info.port}`));
