import "server-only";
import { cache } from "react";
import { defaultContent, type SiteContent } from "@designjanala/shared";

/** Cache tag for everything that comes from the API's /content. The dashboard revalidates it after a save. */
export const CONTENT_TAG = "content";

/**
 * Website content, as edited in the dashboard. Falls back to the built-in defaults when API_URL
 * isn't set or the API can't be reached, so the site never goes down with the API.
 */
export const getContent = cache(async (): Promise<SiteContent> => {
  const api = process.env.API_URL;
  if (!api) return defaultContent;
  try {
    const res = await fetch(`${api}/content`, { next: { tags: [CONTENT_TAG], revalidate: 300 } });
    if (!res.ok) throw new Error(`API responded ${res.status}`);
    return (await res.json()) as SiteContent;
  } catch (err) {
    console.error(`Loading content from ${api} failed; showing the default content.`, err);
    return defaultContent;
  }
});
