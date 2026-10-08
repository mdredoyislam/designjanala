import type { LeadStatus } from "@designjanala/shared";

export const statusLabel: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  proposal: "Proposal",
  won: "Won",
  lost: "Lost",
};

export const statusClass: Record<LeadStatus, string> = {
  new: "bg-accent text-accent-ink",
  contacted: "border border-accent/60 text-accent",
  proposal: "border border-line text-ink",
  won: "bg-ink text-night",
  lost: "border border-line text-muted",
};

export const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("en", { day: "numeric", month: "short", year: "numeric" }).format(new Date(iso));

export const formatDateTime = (iso: string) =>
  new Intl.DateTimeFormat("en", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }).format(new Date(iso));
