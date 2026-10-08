import type { Metadata } from "next";
import Link from "next/link";
import { contentGroups } from "@designjanala/shared";
import { getContentSections } from "@/lib/api";
import { formatDateTime } from "@/lib/format";

export const metadata: Metadata = { title: "Content" };

export default async function ContentPage() {
  const sections = await getContentSections();
  const status = new Map(sections.map((s) => [s.key, s]));
  const edited = sections.filter((s) => s.customized).length;

  return (
    <div className="space-y-10">
      <div>
        <p className="eyebrow">[ Content ]</p>
        <h1 className="h-display mt-3 text-3xl sm:text-4xl">Website content</h1>
        <p className="mt-3 max-w-2xl text-body">
          Everything the website shows: services, articles, team, portfolio, FAQs and more. Sections you haven&apos;t edited show the
          original content. {edited > 0 && `${edited} of ${sections.length} sections edited.`}
        </p>
      </div>

      {contentGroups.map((g) => (
        <section key={g.label} aria-labelledby={`group-${g.label}`}>
          <h2 id={`group-${g.label}`} className="font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
            {g.label}
          </h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {g.sections.map((s) => {
              const st = status.get(s.key);
              return (
                <Link key={s.key} href={`/content/${s.key}`} className="panel group flex flex-col p-5 transition-colors hover:border-white/30">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-semibold group-hover:text-accent">{s.label}</h3>
                    {st?.customized ? (
                      <span className="shrink-0 rounded bg-accent px-1.5 py-0.5 font-mono text-[10px] font-semibold text-accent-ink uppercase">Edited</span>
                    ) : (
                      <span className="shrink-0 rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-muted uppercase">Original</span>
                    )}
                  </div>
                  <p className="mt-2 flex-1 text-sm text-body">{s.description}</p>
                  {st?.updatedAt && <p className="mt-3 font-mono text-[11px] text-muted">Updated {formatDateTime(st.updatedAt)}</p>}
                </Link>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
