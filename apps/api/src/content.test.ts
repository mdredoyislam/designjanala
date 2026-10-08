import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { defaultContent, type ContentSectionStatus, type SiteContent } from "@designjanala/shared";
import { createApp } from "./app";
import { FileContentStore } from "./content-store";
import { FileLeadStore, MemoryLeadStore } from "./store";

const TOKEN = "secret";
const auth = { authorization: `Bearer ${TOKEN}` };
const put = (value: unknown) => ({ method: "PUT", headers: { ...auth, "content-type": "application/json" }, body: JSON.stringify({ value }) });
const makeApp = () => createApp({ store: new MemoryLeadStore(), apiToken: TOKEN });

describe("content API", () => {
  it("serves the defaults until a section is edited", async () => {
    const res = await makeApp().request("/content");
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual(defaultContent);
  });

  it("saves, serves and resets a section", async () => {
    const app = makeApp();
    const principles = ["Ship it right.", "Keep learning."];
    const saved = await app.request("/content/teamPrinciples", put(principles));
    expect(saved.status).toBe(200);

    const live = (await (await app.request("/content")).json()) as SiteContent;
    expect(live.teamPrinciples).toEqual(principles);
    expect(live.services).toEqual(defaultContent.services);

    const sections = (await (await app.request("/content/sections", { headers: auth })).json()) as ContentSectionStatus[];
    expect(sections.find((s) => s.key === "teamPrinciples")).toMatchObject({ customized: true });
    expect(sections.find((s) => s.key === "services")).toMatchObject({ customized: false });

    const reset = await app.request("/content/teamPrinciples", { method: "DELETE", headers: auth });
    expect(((await reset.json()) as { value: string[] }).value).toEqual(defaultContent.teamPrinciples);
    expect(((await (await app.request("/content")).json()) as SiteContent).teamPrinciples).toEqual(defaultContent.teamPrinciples);
  });

  it("rejects invalid content with the failing paths", async () => {
    const res = await makeApp().request("/content/stats", put([{ value: "lots", suffix: "", label: "Clients" }]));
    expect(res.status).toBe(400);
    const body = (await res.json()) as { issues: { path: string[] }[] };
    expect(body.issues[0].path).toEqual(["0", "value"]);
  });

  it("requires the token to edit and 404s unknown sections", async () => {
    const app = makeApp();
    expect((await app.request("/content/teamPrinciples", { method: "PUT", body: "{}" })).status).toBe(401);
    expect((await app.request("/content/nope", put([]))).status).toBe(404);
  });
});

describe("uploads API", () => {
  const png = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0, 0, 0, 0]);
  const upload = (bytes: Uint8Array, name = "photo.png") => {
    const form = new FormData();
    form.append("file", new File([bytes], name));
    return { method: "POST", headers: auth, body: form };
  };

  it("stores an image and serves it publicly", async () => {
    const app = makeApp();
    const res = await app.request("/uploads", upload(png));
    expect(res.status).toBe(201);
    const { url } = (await res.json()) as { url: string };
    expect(url).toMatch(/^\/uploads\/[a-z0-9]+-[a-f0-9]{8}\.png$/);
    const file = await app.request(url);
    expect(file.headers.get("content-type")).toBe("image/png");
    expect(new Uint8Array(await file.arrayBuffer())).toEqual(png);
  });

  it("rejects files that aren't images, whatever their name", async () => {
    const res = await makeApp().request("/uploads", upload(new TextEncoder().encode("<svg onload=alert(1)>"), "x.png"));
    expect(res.status).toBe(415);
  });

  it("requires the token and never serves arbitrary paths", async () => {
    const app = makeApp();
    expect((await app.request("/uploads", { method: "POST", body: new FormData() })).status).toBe(401);
    expect((await app.request("/uploads/..%2Fleads.json")).status).toBe(404);
  });
});

describe("file stores", () => {
  const dirs: string[] = [];
  const tempDir = () => {
    const dir = mkdtempSync(join(tmpdir(), "dj-api-"));
    dirs.push(dir);
    return dir;
  };
  afterEach(() => dirs.splice(0).forEach((d) => rmSync(d, { recursive: true, force: true })));

  it("keeps content edits and leads across restarts", async () => {
    const dir = tempDir();
    const first = new FileContentStore(join(dir, "content.json"));
    await first.save("teamPrinciples", ["Persisted"]);
    expect((await new FileContentStore(join(dir, "content.json")).overrides()).teamPrinciples?.value).toEqual(["Persisted"]);

    const leads = new FileLeadStore(join(dir, "leads.json"));
    await leads.create({ name: "Ada Lovelace", email: "ada@example.com", details: "Persist this lead please." });
    expect(await new FileLeadStore(join(dir, "leads.json")).list()).toHaveLength(1);
  });
});
