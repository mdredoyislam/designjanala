import type { LeadStatus } from "@designjanala/shared";
import { statusClass, statusLabel } from "@/lib/format";

export function StatusBadge({ status }: { status: LeadStatus }) {
  return (
    <span className={`inline-flex rounded px-2 py-1 font-mono text-[10px] font-semibold tracking-wider uppercase ${statusClass[status]}`}>
      {statusLabel[status]}
    </span>
  );
}
