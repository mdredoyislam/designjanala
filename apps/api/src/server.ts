import { resolve } from "node:path";
import { serve } from "@hono/node-server";
import { createApp } from "./app";
import { FileContentStore } from "./content-store";
import { FileLeadStore, demoLeads } from "./store";
import { FileUploadStore } from "./upload-store";

const port = Number(process.env.PORT ?? 4000);
const isProd = process.env.NODE_ENV === "production";
// Leads, content edits and uploaded images live here. Back this folder up; on a server, put it on a persistent disk.
const dataDir = resolve(process.env.DATA_DIR ?? "data");

if (isProd && !process.env.API_TOKEN) {
  console.error("API_TOKEN must be set in production: it protects leads, content edits and uploads.");
  process.exit(1);
}

const app = createApp({
  store: new FileLeadStore(resolve(dataDir, "leads.json"), isProd ? [] : demoLeads()),
  content: new FileContentStore(resolve(dataDir, "content.json")),
  uploads: new FileUploadStore(resolve(dataDir, "uploads")),
  apiToken: process.env.API_TOKEN || undefined,
  corsOrigins: (process.env.CORS_ORIGINS ?? "http://localhost:3000,http://localhost:3001").split(",").map((s) => s.trim()),
});

serve({ fetch: app.fetch, port }, (info) => console.log(`API listening on http://localhost:${info.port} (data in ${dataDir})`));
