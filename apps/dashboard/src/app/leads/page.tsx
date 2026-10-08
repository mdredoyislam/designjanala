import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { leadStatuses, type LeadStatus } from "@designjanala/shared";
import { StatusSelect } from "@/components/StatusSelect";
import { getLeads } from "@/lib/api";
import { formatDate, statusLabel } from "@/lib/format";

export const metadata: Metadata = { title: "Leads" };

export default async function LeadsPage({ searchParams }: PageProps<"/leads">) {
  await connection();
  const raw = (await searchParams).status;
  const status = leadStatuses.find((s) => s === raw) as LeadStatus | undefined;
  const leads = await getLeads(status);

  const filters: { label: string; href: string; active: boolean }[] = [
    { label: "All", href: "/leads", active: !status },
    ...leadStatuses.map((s) => ({ label: statusLabel[s], href: `/leads?status=${s}`, active: status === s })),
  ];

  return (
    <div className="space-y-8">
      <div>
        <p className="eyebrow">[ Leads ]</p>
        <h1 className="h-display mt-3 text-3xl sm:text-4xl">Contact form leads</h1>
      </div>

      <div className="flex flex-wrap gap-2" role="list" aria-label="Filter by status">
        {filters.map((f) => (
          <Link
            key={f.href}
            role="listitem"
            href={f.href}
            aria-current={f.active ? "page" : undefined}
            className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
              f.active ? "border-accent bg-accent text-accent-ink" : "border-line text-body hover:border-white/40 hover:text-ink"
            }`}
          >
            {f.label}
          </Link>
        ))}
      </div>

      <div className="panel overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-line font-mono text-[11px] tracking-wider text-muted uppercase">
            <tr>
              <th className="px-5 py-3 font-medium">Name</th>
              <th className="px-5 py-3 font-medium">Service</th>
              <th className="px-5 py-3 font-medium">Budget</th>
              <th className="px-5 py-3 font-medium">Received</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {leads.map((l) => (
              <tr key={l.id} className="align-top">
                <td className="px-5 py-4">
                  <p className="font-medium">{l.name}</p>
                  <a href={`mailto:${l.email}`} className="text-body hover:text-accent">
                    {l.email}
                  </a>
                  {l.company && <p className="text-muted">{l.company}</p>}
                  <p className="mt-2 max-w-sm text-body">{l.details}</p>
                </td>
                <td className="px-5 py-4 text-body">{l.service || "—"}</td>
                <td className="px-5 py-4 text-body">{l.budget || "—"}</td>
                <td className="px-5 py-4 font-mono text-xs text-muted">{formatDate(l.createdAt)}</td>
                <td className="px-5 py-4">
                  <StatusSelect id={l.id} status={l.status} name={l.name} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {leads.length === 0 && <p className="px-6 py-10 text-center text-sm text-muted">No leads with this status.</p>}
      </div>
    </div>
  );
}
