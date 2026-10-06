"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { categories, marketplaces, site, type Project } from "@/data/site";

const PAGE = 9;
const creativeMarket = marketplaces.find((m) => m.name === "Creative Market")!.href;
const labelFor = (slug: string) => categories.find((c) => c.slug === slug)?.label ?? slug;

const tabs = [
  { slug: "all", label: "All" },
  { slug: "free", label: "Free" },
  ...categories.filter((c) => c.slug !== "all"),
];

/** Dark template directory: free templates first, filterable by category. */
export default function FreebieGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState("all");
  const [limit, setLimit] = useState(PAGE);

  const sorted = useMemo(() => [...projects].sort((a, b) => Number(!!b.free) - Number(!!a.free)), [projects]);
  const list = sorted.filter((p) =>
    active === "all" ? true : active === "free" ? p.free : p.categories.includes(active as Project["categories"][number]),
  );

  return (
    <div>
      <div className="flex gap-1 overflow-x-auto border-b border-night-line [scrollbar-width:none]" role="tablist" aria-label="Filter templates">
        {tabs.map((t) => (
          <button
            key={t.slug}
            role="tab"
            aria-selected={active === t.slug}
            onClick={() => {
              setActive(t.slug);
              setLimit(PAGE);
            }}
            className={`shrink-0 border-b-2 px-4 py-3 font-mono text-[11px] font-medium tracking-wider uppercase transition-colors ${
              active === t.slug ? "border-accent text-white" : "border-transparent text-white/50 hover:text-white"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <p className="mt-5 font-mono text-[10px] tracking-wider text-white/40 uppercase">Showing {Math.min(limit, list.length)} of {list.length} templates</p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.slice(0, limit).map((p, i) => (
          <article key={p.image} className="card-dark flex flex-col overflow-hidden">
            <div className="flex items-center justify-between px-5 pt-5">
              <span className="font-mono text-[10px] tracking-wider text-white/50 uppercase">Template</span>
              <span className={`rounded px-2 py-0.5 font-mono text-[10px] font-semibold tracking-wider uppercase ${p.free ? "bg-accent text-white" : "border border-night-line text-white/60"}`}>
                {p.free ? "Free" : "Premium"}
              </span>
            </div>
            <h3 className="px-5 pt-3 text-lg font-semibold text-white">{p.title}</h3>
            <p className="px-5 pt-1 text-sm text-white/55">{p.description}</p>
            <div className="relative mx-5 mt-5 aspect-[3/2] overflow-hidden rounded-lg bg-night">
              <Image src={p.image} alt={`${p.title} — ${p.description}`} fill priority={i < 3} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw" className="object-cover" />
            </div>
            <div className="mt-auto flex items-center justify-between px-5 py-4">
              <span className="truncate pr-3 font-mono text-[10px] text-white/45 uppercase">{p.categories.map(labelFor).join(" · ")}</span>
              {p.free ? (
                <a
                  href={`mailto:${site.emails.sample}?subject=${encodeURIComponent(`Free template: ${p.title}`)}`}
                  className="font-mono text-[11px] font-semibold tracking-wider text-accent uppercase hover:underline"
                >
                  Get template ↗
                </a>
              ) : (
                <a href={creativeMarket} target="_blank" rel="noopener noreferrer" className="font-mono text-[11px] font-semibold tracking-wider text-accent uppercase hover:underline">
                  View on market ↗
                </a>
              )}
            </div>
          </article>
        ))}
      </div>

      {list.length > limit && (
        <div className="mt-10 text-center">
          <button onClick={() => setLimit((l) => l + PAGE)} className="btn-secondary">
            Load more
          </button>
        </div>
      )}
    </div>
  );
}
