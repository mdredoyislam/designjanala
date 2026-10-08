import "server-only";
import type { ContentSectionKey, ContentSectionStatus, Lead, LeadStats, LeadStatus, SiteContent } from "@designjanala/shared";

const API_URL = process.env.API_URL ?? "http://localhost:4000";

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status?: number,
    readonly body?: unknown,
  ) {
    super(message);
  }
}

async function api<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers);
  if (process.env.API_TOKEN) headers.set("authorization", `Bearer ${process.env.API_TOKEN}`);
  if (typeof init.body === "string") headers.set("content-type", "application/json");
  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, { ...init, headers, cache: "no-store" });
  } catch {
    throw new ApiError(`Can't reach the API at ${API_URL}. Is it running (npm run dev:api)?`);
  }
  if (!res.ok) {
    const body = await res.json().catch(() => undefined);
    const message = (body as { error?: string } | undefined)?.error ?? `API ${init.method ?? "GET"} ${path} failed with ${res.status}.`;
    throw new ApiError(message, res.status, body);
  }
  return res.json() as Promise<T>;
}

export const getStats = () => api<LeadStats>("/stats");
export const getLeads = (status?: LeadStatus) => api<Lead[]>(status ? `/leads?status=${status}` : "/leads");
export const setLeadStatus = (id: string, status: LeadStatus) =>
  api<Lead>(`/leads/${encodeURIComponent(id)}`, { method: "PATCH", body: JSON.stringify({ status }) });

export const getContent = () => api<SiteContent>("/content");
export const getContentSections = () => api<ContentSectionStatus[]>("/content/sections");
export const saveContentSection = (key: ContentSectionKey, value: unknown) =>
  api<{ key: ContentSectionKey; value: unknown; updatedAt: string }>(`/content/${key}`, { method: "PUT", body: JSON.stringify({ value }) });
export const resetContentSection = (key: ContentSectionKey) => api<{ key: ContentSectionKey; value: unknown }>(`/content/${key}`, { method: "DELETE" });
export const uploadImage = (file: File) => {
  const form = new FormData();
  form.append("file", file);
  return api<{ url: string }>("/uploads", { method: "POST", body: form });
};
