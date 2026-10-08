import Link from "next/link";
import { connection } from "next/server";
import { leadStatuses } from "@designjanala/shared";
import { StatusBadge } from "@/components/StatusBadge";
import { getLeads, getStats } from "@/lib/api";
import { formatDate, statusLabel } from "@/lib/format";

export default async function OverviewPage() {
  await connection();
  const [stats, leads] = await Promise.all([getStats(), getLeads()]);
  const won = stats.byStatus.won;
  const closed = won + stats.byStatus.lost;

  const tiles = [
    { label: "Total leads", value: stats.total },
    { label: "Last 7 days", value: stats.last7Days },
    { label: "Open pipeline", value: stats.byStatus.new + stats.byStatus.contacted + stats.byStatus.proposal },
    { label: "Win rate", value: closed ? `${Math.round((won / closed) * 100)}%` : "—" },
  ];

  return (
    <div className="space-y-10">
      <div>
        <p className="eyebrow">[ Overview ]</p>
        <h1 className="h-display mt-3 text-3xl sm:text-4xl">Studio pipeline</h1>
      </div>

      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4" aria-label="Key numbers">
        {tiles.map((t) => (
          <div key={t.label} className="panel p-5">
            <p className="font-mono text-[11px] tracking-wider text-muted uppercase">{t.label}</p>
            <p className="h-display mt-3 text-4xl text-accent">{t.value}</p>
          </div>
        ))}
      </section>

      <section className="panel p-5 sm:p-6" aria-label="Leads by status">
        <h2 className="font-semibold">By status</h2>
        <div className="mt-5 space-y-3">
          {leadStatuses.map((s) => {
            const n = stats.byStatus[s];
            return (
              <Link key={s} href={`/leads?status=${s}`} className="group grid grid-cols-[6rem_1fr_2.5rem] items-center gap-4">
                <span className="text-sm text-body group-hover:text-ink">{statusLabel[s]}</span>
                <span className="h-2 overflow-hidden rounded-full bg-mist">
                  <span className="block h-full rounded-full bg-accent" style={{ width: `${stats.total ? (n / stats.total) * 100 : 0}%` }} />
                </span>
                <span className="text-right font-mono text-sm">{n}</span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="panel overflow-hidden" aria-label="Latest leads">
        <div className="flex items-center justify-between border-b border-line px-5 py-4 sm:px-6">
          <h2 className="font-semibold">Latest leads</h2>
          <Link href="/leads" className="font-mono text-xs text-accent uppercase hover:underline">
            View all
          </Link>
        </div>
        {leads.length === 0 ? (
          <p className="px-6 py-10 text-center text-sm text-muted">No leads yet. Submissions from the contact form show up here.</p>
        ) : (
          <ul className="divide-y divide-line">
            {leads.slice(0, 5).map((l) => (
              <li key={l.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 sm:px-6">
                <div className="min-w-0">
                  <p className="truncate font-medium">
                    {l.name} {l.company && <span className="text-muted">· {l.company}</span>}
                  </p>
                  <p className="mt-0.5 truncate text-sm text-body">{l.service || "General enquiry"}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs text-muted">{formatDate(l.createdAt)}</span>
                  <StatusBadge status={l.status} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
