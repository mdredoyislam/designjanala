import { Hono } from "hono";
import { bodyLimit } from "hono/body-limit";
import { cors } from "hono/cors";
import {
  contentSectionKeys,
  contentSectionSchemas,
  defaultContent,
  fieldErrors,
  isContentSectionKey,
  leadInputSchema,
  leadStatuses,
  leadUpdateSchema,
  mergeContent,
  type ContentSectionStatus,
  type LeadStatus,
} from "@designjanala/shared";
import { MemoryContentStore, type ContentStore } from "./content-store";
import type { LeadStore } from "./store";
import { MAX_UPLOAD_BYTES, MemoryUploadStore, contentTypeFor, detectImage, isUploadName, type UploadStore } from "./upload-store";

export type AppOptions = {
  store: LeadStore;
  content?: ContentStore;
  uploads?: UploadStore;
  /** When set, admin routes (leads, content edits, uploads) require `Authorization: Bearer <token>`. */
  apiToken?: string;
  corsOrigins?: string[];
};

export function createApp({
  store,
  content = new MemoryContentStore(),
  uploads = new MemoryUploadStore(),
  apiToken,
  corsOrigins = [],
}: AppOptions) {
  const app = new Hono();

  app.use("*", cors({ origin: corsOrigins, allowMethods: ["GET", "POST", "PATCH", "PUT", "DELETE"] }));

  app.get("/health", (c) => c.json({ ok: true }));

  // Public: the website reads its content here. Sections never edited in the dashboard use the defaults.
  app.get("/content", async (c) => c.json(mergeContent(await content.overrides())));

  // Public: images uploaded from the dashboard.
  app.get("/uploads/:name", async (c) => {
    const name = c.req.param("name");
    const bytes = isUploadName(name) ? await uploads.read(name) : undefined;
    if (!bytes) return c.json({ error: "Not found" }, 404);
    return c.body(new Uint8Array(bytes), 200, {
      "content-type": contentTypeFor(name) ?? "application/octet-stream",
      "cache-control": "public, max-age=31536000, immutable",
      "x-content-type-options": "nosniff",
    });
  });

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

  // Which sections have been edited, and when.
  admin.get("/content/sections", async (c) => {
    const overrides = await content.overrides();
    const sections: ContentSectionStatus[] = contentSectionKeys.map((key) => ({
      key,
      customized: Boolean(overrides[key]),
      updatedAt: overrides[key]?.updatedAt,
    }));
    return c.json(sections);
  });

  admin.put("/content/:section", bodyLimit({ maxSize: 2 * 1024 * 1024, onError: (c) => c.json({ error: "Content is too large" }, 413) }), async (c) => {
    const key = c.req.param("section");
    if (!isContentSectionKey(key)) return c.json({ error: "Unknown section" }, 404);
    const body = (await c.req.json().catch(() => null)) as { value?: unknown } | null;
    const parsed = contentSectionSchemas[key].safeParse(body?.value);
    if (!parsed.success) {
      const issues = parsed.error.issues.map((i) => ({ path: i.path.map(String), message: i.message }));
      return c.json({ error: "Invalid content", issues }, 400);
    }
    const { updatedAt } = await content.save(key, parsed.data as never);
    return c.json({ key, value: parsed.data, updatedAt });
  });

  admin.delete("/content/:section", async (c) => {
    const key = c.req.param("section");
    if (!isContentSectionKey(key)) return c.json({ error: "Unknown section" }, 404);
    await content.reset(key);
    return c.json({ key, value: defaultContent[key] });
  });

  admin.post(
    "/uploads",
    bodyLimit({ maxSize: MAX_UPLOAD_BYTES + 64 * 1024, onError: (c) => c.json({ error: "Images must be 5 MB or smaller." }, 413) }),
    async (c) => {
      const body = await c.req.parseBody().catch(() => null);
      const file = body?.file;
      if (!(file instanceof File)) return c.json({ error: "Send the image as a `file` form field." }, 400);
      if (file.size > MAX_UPLOAD_BYTES) return c.json({ error: "Images must be 5 MB or smaller." }, 413);
      const bytes = new Uint8Array(await file.arrayBuffer());
      const kind = detectImage(bytes);
      if (!kind) return c.json({ error: "Use a PNG, JPG, WebP, GIF or AVIF image." }, 415);
      const name = await uploads.save(bytes, kind.ext);
      return c.json({ url: `/uploads/${name}` }, 201);
    },
  );

  app.route("/", admin);
  return app;
}
