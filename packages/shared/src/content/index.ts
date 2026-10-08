import { defaultContent } from "./defaults";
import { contentSectionKeys, contentSectionSchemas, type ContentOverrides, type SiteContent } from "./schema";

export * from "./schema";
export { art, defaultContent } from "./defaults";

/**
 * The live content: each stored section replaces its default. A stored section that no longer
 * matches the schema (e.g. after a model change) falls back to the default instead of breaking the site.
 */
export function mergeContent(overrides: ContentOverrides = {}, defaults: SiteContent = defaultContent): SiteContent {
  const out = { ...defaults } as Record<string, unknown>;
  for (const key of contentSectionKeys) {
    const stored = overrides[key];
    if (!stored) continue;
    const parsed = contentSectionSchemas[key].safeParse(stored.value);
    if (parsed.success) out[key] = parsed.data;
  }
  return out as SiteContent;
}

export type Service = SiteContent["services"][number];
export type ServiceCategory = SiteContent["serviceCategories"][number];
export type Project = SiteContent["projects"][number];
export type TeamMember = SiteContent["team"][number];
export type Post = SiteContent["posts"][number];
export type OpenProject = SiteContent["openSource"][number];
export type Faq = SiteContent["faqs"][number];

export const servicesIn = (content: Pick<SiteContent, "services">, category: string) => content.services.filter((s) => s.category === category);
export const toolCount = (content: Pick<SiteContent, "techStack">) => content.techStack.reduce((n, t) => n + t.items.length, 0);
