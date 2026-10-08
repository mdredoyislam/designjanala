"use client";

import { useState } from "react";
import { techStack } from "@/data/site";

const ALL = "All";
/** Tools shown before "Load more", and how many each click adds. */
const STEP = 16;
const tabs = [
  { name: ALL, count: techStack.reduce((n, t) => n + t.items.length, 0) },
  ...techStack.map((t) => ({ name: t.category, count: t.items.length })),
];

/** Homepage stack: a segmented pill bar of categories over a cloud of tool pills. */
export default function TechStack() {
  const [active, setActive] = useState(ALL);
  const [limit, setLimit] = useState(STEP);
  const items =
    active === ALL
      ? techStack.flatMap((t) => t.items.map((name) => ({ name, category: t.category })))
      : techStack.find((t) => t.category === active)!.items.map((name) => ({ name, category: active }));

  return (
    <div>
      {/* Category pills: one scrollable row inside a rounded track */}
      <div className="-mx-4 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
        <div
          className="mx-auto flex w-max gap-1 rounded-full border border-line bg-surface p-1.5"
          role="tablist"
          aria-label="Technology categories"
        >
          {tabs.map((t) => {
            const selected = t.name === active;
            return (
              <button
                key={t.name}
                role="tab"
                aria-selected={selected}
                onClick={() => {
                  setActive(t.name);
                  setLimit(STEP);
                }}
                className={`flex items-center gap-2 rounded-full px-4 py-2 font-mono text-[11px] font-medium tracking-[0.08em] whitespace-nowrap uppercase transition-all duration-300 ${
                  selected ? "bg-accent text-accent-ink shadow-[0_6px_20px_-6px_var(--accent)]" : "text-body hover:bg-card hover:text-ink"
                }`}
              >
                {t.name}
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] leading-none tabular-nums ${
                    selected ? "bg-black/15 text-accent-ink" : "bg-card text-muted"
                  }`}
                >
                  {t.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tool pills */}
      <ul key={active} className="animate-fade-in mx-auto mt-10 flex max-w-5xl flex-wrap justify-center gap-2.5" aria-live="polite">
        {items.slice(0, limit).map(({ name, category }) => (
          <li
            key={`${category}-${name}`}
            className="group flex items-center gap-2 rounded-full border border-line bg-card py-1.5 pr-4 pl-1.5 text-sm font-medium text-ink transition-colors hover:border-accent"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/10 font-mono text-[11px] font-bold text-accent transition-colors group-hover:bg-accent group-hover:text-accent-ink">
              {name[0]}
            </span>
            {name}
            {active === ALL && <span className="hidden font-mono text-[10px] text-muted uppercase sm:inline">· {category}</span>}
          </li>
        ))}
      </ul>

      {items.length > limit && (
        <div className="mt-8 text-center">
          <button type="button" onClick={() => setLimit((l) => l + STEP)} className="btn-outline text-ink">
            Load more ({items.length - limit})
          </button>
        </div>
      )}
    </div>
  );
}
