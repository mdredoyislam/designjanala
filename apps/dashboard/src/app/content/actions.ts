"use server";

import { revalidatePath } from "next/cache";
import { isContentSectionKey } from "@designjanala/shared";
import { ApiError, resetContentSection, saveContentSection, uploadImage } from "@/lib/api";
import { assertSignedIn } from "@/lib/auth";

export type Issue = { path: string[]; message: string };
/** "updated": the website shows the change now. "scheduled": it will within 5 minutes. */
export type WebsiteRefresh = "updated" | "scheduled" | "failed";
export type SaveResult =
  | { ok: true; value: unknown; updatedAt?: string; website: WebsiteRefresh }
  | { ok: false; error: string; issues?: Issue[] };

/** Ask the website to drop its cached content so the edit is visible on the next page view. */
async function refreshWebsite(): Promise<WebsiteRefresh> {
  const url = process.env.WEB_URL;
  const secret = process.env.REVALIDATE_SECRET;
  if (!url || !secret) return "scheduled";
  try {
    const res = await fetch(`${url}/api/revalidate`, { method: "POST", headers: { "x-revalidate-secret": secret } });
    return res.ok ? "updated" : "failed";
  } catch {
    return "failed";
  }
}

const failure = (err: unknown): SaveResult => {
  if (err instanceof ApiError) {
    const issues = (err.body as { issues?: Issue[] } | undefined)?.issues;
    return { ok: false, error: issues?.length ? "Some fields need attention." : err.message, issues };
  }
  return { ok: false, error: err instanceof Error ? err.message : "Something went wrong." };
};

export async function saveSection(key: string, value: unknown): Promise<SaveResult> {
  try {
    await assertSignedIn();
    if (!isContentSectionKey(key)) return { ok: false, error: "Unknown section." };
    const saved = await saveContentSection(key, value);
    revalidatePath("/content", "layout");
    return { ok: true, value: saved.value, updatedAt: saved.updatedAt, website: await refreshWebsite() };
  } catch (err) {
    return failure(err);
  }
}

export async function resetSection(key: string): Promise<SaveResult> {
  try {
    await assertSignedIn();
    if (!isContentSectionKey(key)) return { ok: false, error: "Unknown section." };
    const reset = await resetContentSection(key);
    revalidatePath("/content", "layout");
    return { ok: true, value: reset.value, website: await refreshWebsite() };
  } catch (err) {
    return failure(err);
  }
}

export async function uploadImageAction(formData: FormData): Promise<{ url: string } | { error: string }> {
  try {
    await assertSignedIn();
    const file = formData.get("file");
    if (!(file instanceof File) || file.size === 0) return { error: "Choose an image to upload." };
    return await uploadImage(file);
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Upload failed." };
  }
}
