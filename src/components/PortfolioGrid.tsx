"use client";

import { useMemo, useState } from "react";
import { categories, type Project } from "@/data/site";
import ProjectCard from "./ProjectCard";

const PAGE = 12;

export default function PortfolioGrid({ projects, filters = true }: { projects: Project[]; filters?: boolean }) {
  const [active, setActive] = useState<string>("all");
  const [limit, setLimit] = useState(PAGE);

  const list = useMemo(
    () => (active === "all" ? projects : projects.filter((p) => p.categories.includes(active as Project["categories"][number]))),
    [active, projects],
  );

  return (
    <div>
      {filters && (
        <div className="mb-12 flex flex-wrap gap-2" role="tablist" aria-label="Filter projects">
          {categories.map((c) => {
            const count = c.slug === "all" ? projects.length : projects.filter((p) => p.categories.includes(c.slug as Project["categories"][number])).length;
            if (count === 0) return null;
            const selected = active === c.slug;
            return (
              <button
                key={c.slug}
                role="tab"
                aria-selected={selected}
                onClick={() => {
                  setActive(c.slug);
                  setLimit(PAGE);
                }}
                className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-colors ${
                  selected ? "border-accent bg-accent text-white" : "border-line text-ink/70 hover:border-steel hover:text-ink"
                }`}
              >
                {c.label} <span className={selected ? "text-white/70" : "text-muted"}>{count}</span>
              </button>
            );
          })}
        </div>
      )}

      <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {list.slice(0, limit).map((p, i) => (
          <ProjectCard key={p.image} project={p} priority={i < 3} />
        ))}
      </div>

      {list.length > limit && (
        <div className="mt-16 flex justify-center">
          <button onClick={() => setLimit((l) => l + PAGE)} className="btn-outline">
            Load more ({list.length - limit} remaining)
          </button>
        </div>
      )}
    </div>
  );
}
