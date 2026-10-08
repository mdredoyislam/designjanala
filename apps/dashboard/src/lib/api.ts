import "server-only";
import type { Lead, LeadStats, LeadStatus } from "@designjanala/shared";

const API_URL = process.env.API_URL ?? "http://localhost:4000";

export class ApiError extends Error {}

async function api<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers);
  if (process.env.API_TOKEN) headers.set("authorization", `Bearer ${process.env.API_TOKEN}`);
  if (init.body) headers.set("content-type", "application/json");
  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, { ...init, headers, cache: "no-store" });
  } catch {
    throw new ApiError(`Can't reach the API at ${API_URL}. Is it running (npm run dev:api)?`);
  }
  if (!res.ok) throw new ApiError(`API ${init.method ?? "GET"} ${path} failed with ${res.status}.`);
  return res.json() as Promise<T>;
}

export const getStats = () => api<LeadStats>("/stats");
export const getLeads = (status?: LeadStatus) => api<Lead[]>(status ? `/leads?status=${status}` : "/leads");
export const setLeadStatus = (id: string, status: LeadStatus) =>
  api<Lead>(`/leads/${encodeURIComponent(id)}`, { method: "PATCH", body: JSON.stringify({ status }) });
