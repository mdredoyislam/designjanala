// Renders every scene to a WebP in apps/web/public/images/illustrations.
//   node design/illustrations/render.mjs            # all scenes
//   node design/illustrations/render.mjs studio     # one scene
// Uses Playwright from tests/e2e (set PW_CHANNEL=chrome to use installed Chrome) and sharp from apps/web.
import { createRequire } from "node:module";
import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { scenes } from "./scenes.mjs";

const root = fileURLToPath(new URL("../../", import.meta.url));
const require = createRequire(import.meta.url);
const { chromium } = require(require.resolve("playwright", { paths: [`${root}tests/e2e`] }));
const sharp = require(require.resolve("sharp", { paths: [`${root}apps/web`] }));

const out = `${root}apps/web/public/images/illustrations`;
const only = process.argv.slice(2);
mkdirSync(out, { recursive: true });

const browser = await chromium.launch({ channel: process.env.PW_CHANNEL });
for (const scene of scenes.filter((s) => !only.length || only.includes(s.name))) {
  const page = await browser.newPage({ viewport: { width: scene.width, height: scene.height }, deviceScaleFactor: 2 });
  await page.setContent(scene.html, { waitUntil: "load" });
  const png = await page.screenshot({ type: "png" });
  if (process.env.KEEP_HTML) writeFileSync(`${out}/${scene.name}.html`, scene.html);
  const info = await sharp(png).webp({ quality: 82, effort: 6 }).toFile(`${out}/${scene.name}.webp`);
  console.log(`${scene.name}.webp  ${info.width}×${info.height}  ${Math.round(info.size / 1024)} KB`);
  await page.close();
}
await browser.close();
