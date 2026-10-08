import "server-only";
import * as simpleIcons from "simple-icons";

/** A technology with its brand mark from Simple Icons (CC0), when one exists. */
export type ToolIcon = { name: string; path?: string; color?: string; monogram: string };

type SimpleIcon = { title: string; slug: string; path: string; hex: string };

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
const byTitle = new Map<string, SimpleIcon>();
for (const icon of Object.values(simpleIcons) as unknown[]) {
  const i = icon as SimpleIcon;
  if (i?.title && i.path) byTitle.set(norm(i.title), i);
}

/** Tool names that use another product's mark. */
const aliases: Record<string, string> = {
  html: "html5",
  figjam: "figma",
  framermotion: "framer",
  reactnative: "react",
  gemini: "googlegemini",
  metapixel: "meta",
  claude: "anthropic",
};

/** Brands without a Simple Icons mark get a short monogram instead. */
const monograms: Record<string, string> = {
  adobeillustrator: "Ai",
  adobephotoshop: "Ps",
  adobeindesign: "Id",
  aftereffects: "Ae",
  aws: "aws",
  azure: "Az",
  openai: "AI",
  restapi: "{}",
  pinecone: "Pc",
  amplitude: "Am",
};

/** Near-black brand colours would vanish on dark sections, so those keep the text colour on hover. */
const visible = (hex: string) => {
  const n = parseInt(hex, 16);
  const [r, g, b] = [n >> 16, (n >> 8) & 255, n & 255].map((c) => c / 255);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.12;
};

export function toolIcon(name: string): ToolIcon {
  const key = norm(name);
  const icon = byTitle.get(aliases[key] ?? key);
  const monogram = monograms[key] ?? name.split(/[\s./-]+/).filter(Boolean).map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  if (!icon) return { name, monogram };
  return { name, path: icon.path, color: visible(icon.hex) ? `#${icon.hex}` : undefined, monogram };
}
