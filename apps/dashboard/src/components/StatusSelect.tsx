"use client";

import { leadStatuses, type LeadStatus } from "@designjanala/shared";
import { statusLabel } from "@/lib/format";
import { updateStatus } from "@/app/leads/actions";

/** Changing the select submits the form, so updating a lead is one interaction. */
export function StatusSelect({ id, status, name }: { id: string; status: LeadStatus; name: string }) {
  return (
    <form action={updateStatus}>
      <input type="hidden" name="id" value={id} />
      <select
        name="status"
        defaultValue={status}
        aria-label={`Status for ${name}`}
        onChange={(e) => e.currentTarget.form?.requestSubmit()}
        className="rounded-md border border-line bg-card px-2 py-1.5 text-sm outline-none focus:border-accent"
      >
        {leadStatuses.map((s) => (
          <option key={s} value={s}>
            {statusLabel[s]}
          </option>
        ))}
      </select>
    </form>
  );
}
