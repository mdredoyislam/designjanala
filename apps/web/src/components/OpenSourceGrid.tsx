"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { openSource, type OpenProject } from "@/data/site";

const ALL = "All";
const tabs = [ALL, ...Array.from(new Set(openSource.map((p) => p.category)))];
const isExternal = (href: string) => href.startsWith("http");

function CodeIcon() {
  return (
    <span className="flex h-8 w-8 items-center justify-center rounded-md border border-accent/40 bg-accent/10 text-accent" aria-hidden="true">
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
        <path d="m8 7-5 5 5 5M16 7l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function CardLink({ href, children }: { href: string; children: React.ReactNode }) {
  const cls = "font-mono text-[11px] font-semibold tracking-wider text-accent uppercase hover:underline";
  return isExternal(href) ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {children} ↗
    </a>
  ) : href.startsWith("mailto:") ? (
    <a href={href} className={cls}>
      {children} ↗
    </a>
  ) : (
    <Link href={href} className={cls}>
      {children} ↗
    </Link>
  );
}

function Card({ p, featured }: { p: OpenProject; featured: boolean }) {
  return (
    <article className={`card-dark flex flex-col p-6 ${featured ? "lg:col-span-2" : ""}`}>
      <div className="flex items-start justify-between">
        <span className="font-mono text-[10px] tracking-[0.14em] text-white/45 uppercase">{p.category}</span>
        <CodeIcon />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-white">{p.title}</h3>
      <p className="mt-2 max-w-lg text-sm leading-relaxed text-white/60">{p.body}</p>

      {featured && p.image && (
        <div className="mt-6 flex items-center justify-between gap-4 rounded-lg border border-night-line bg-night p-4">
          <div className="font-mono text-[10px] leading-relaxed tracking-wider text-white/45 uppercase">
            Free template
            <br /> Resume · Print ready
          </div>
          <div className="flex items-center gap-2">
            {["Aa", "#E8", "A4"].map((c) => (
              <span key={c} className="hidden h-10 w-10 items-center justify-center rounded border border-night-line font-mono text-xs text-white sm:flex">
                {c}
              </span>
            ))}
            <span className="relative h-14 w-20 overflow-hidden rounded border-2 border-accent">
              <Image src={p.image} alt={`${p.title} preview`} fill sizes="80px" className="object-cover" />
            </span>
          </div>
        </div>
      )}
      {!featured && p.image && (
        <div className="relative mt-5 aspect-[16/9] overflow-hidden rounded-lg border border-night-line">
          <Image src={p.image} alt={`${p.title} preview`} fill sizes="(min-width: 1024px) 30vw, 90vw" className="object-cover" />
        </div>
      )}

      <div className="mt-auto pt-6">
        <div className="flex items-center justify-between">
          <span className="rounded border border-night-line bg-night px-2 py-1 font-mono text-[10px] font-semibold text-white/70 uppercase">{p.format}</span>
          <CardLink href={p.href}>{p.cta}</CardLink>
        </div>
        {featured && p.secondary && (
          <div className="mt-4">
            <CardLink href={p.secondary.href}>{p.secondary.label}</CardLink>
          </div>
        )}
      </div>
    </article>
  );
}

/** Filterable open-source / free-resource directory. The first card in "All" is featured (spans two columns). */
export default function OpenSourceGrid() {
  const [active, setActive] = useState(ALL);
  const list = active === ALL ? openSource : openSource.filter((p) => p.category === active);

  return (
    <div>
      <div className="flex gap-1 overflow-x-auto border-b border-night-line [scrollbar-width:none]" role="tablist" aria-label="Filter projects">
        {tabs.map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={active === t}
            onClick={() => setActive(t)}
            className={`shrink-0 border-b-2 px-4 py-3 font-mono text-[11px] font-medium tracking-wider uppercase transition-colors ${
              active === t ? "border-accent text-white" : "border-transparent text-white/50 hover:text-white"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      <p className="mt-5 font-mono text-[10px] tracking-wider text-white/40 uppercase">
        Showing {list.length} project{list.length === 1 ? "" : "s"}
      </p>
      <div key={active} className="animate-fade-in mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p, i) => (
          <Card key={p.slug} p={p} featured={active === ALL && i === 0} />
        ))}
      </div>
    </div>
  );
}
