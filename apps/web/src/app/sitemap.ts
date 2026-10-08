import type { MetadataRoute } from "next";
import { getContent } from "@/lib/content";

// New services and articles from the dashboard appear here within five minutes.
export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { posts, services, site } = await getContent();
  const routes = ["", "/services", "/technology", "/blog", "/team", "/open-source", "/freebies", "/about", "/portfolio", "/career", "/contact"];
  return [
    ...routes.map((r) => ({ url: `${site.url}${r}`, changeFrequency: "monthly" as const, priority: r === "" ? 1 : 0.8 })),
    ...services.map((s) => ({ url: `${site.url}/services/${s.slug}`, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...posts.map((p) => ({ url: `${site.url}/blog/${p.slug}`, lastModified: p.date, changeFrequency: "yearly" as const, priority: 0.6 })),
  ];
}
