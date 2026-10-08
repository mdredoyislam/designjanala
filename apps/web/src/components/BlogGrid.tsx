"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Post } from "@designjanala/shared";
import PostCover from "./PostCover";

const PAGE = 6;
const fmt = (d: string) => new Date(d).toLocaleDateString("en-US", { month: "short", year: "numeric" });

/** Searchable, filterable, paginated post grid for the blog index. */
const ALL = "All Posts";

export default function BlogGrid({ posts, categories }: { posts: Post[]; categories: string[] }) {
  const postCategories = [ALL, ...categories];
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(ALL);
  const [page, setPage] = useState(0);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter(
      (p) =>
        (category === ALL || p.category === category) &&
        (!q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q)),
    );
  }, [query, category, posts]);

  const pages = Math.max(1, Math.ceil(list.length / PAGE));
  const current = Math.min(page, pages - 1);
  const shown = list.slice(current * PAGE, current * PAGE + PAGE);

  return (
    <div>
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <label className="flex items-center gap-2 border-b border-night-line pb-2 lg:w-72">
          <span className="sr-only">Search posts</span>
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(0);
            }}
            placeholder="Search Post"
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/40"
          />
          <svg className="h-4 w-4 text-white/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" strokeLinecap="round" />
          </svg>
        </label>
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0" role="tablist" aria-label="Post categories">
          {postCategories.map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={c === category}
              onClick={() => {
                setCategory(c);
                setPage(0);
              }}
              className={`shrink-0 rounded-full border px-4 py-2 font-mono text-[11px] font-medium tracking-wider uppercase transition-colors ${
                c === category ? "border-accent bg-accent text-accent-ink" : "border-night-line text-white/70 hover:border-white/40"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {shown.length === 0 ? (
        <p className="py-24 text-center text-white/60">No posts match your search.</p>
      ) : (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="group overflow-hidden rounded-xl bg-night-2 transition-colors hover:bg-[#1c1c1c]">
              <PostCover post={p} index={posts.indexOf(p)} />
              <div className="p-5">
                <h3 className="font-medium leading-snug text-white group-hover:text-accent-fg">{p.title}</h3>
                <div className="mt-5 flex items-center justify-between">
                  <span className="rounded bg-accent/15 px-2 py-1 font-mono text-[10px] tracking-wider text-accent-fg uppercase">{p.category}</span>
                  <time dateTime={p.date} className="font-mono text-[10px] tracking-wider text-white/45 uppercase">
                    {fmt(p.date)}
                  </time>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {pages > 1 && (
        <nav className="mt-10 flex justify-center gap-1.5" aria-label="Pagination">
          {Array.from({ length: pages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              aria-current={i === current ? "page" : undefined}
              className={`h-7 w-7 rounded font-mono text-xs ${i === current ? "bg-accent text-accent-ink" : "bg-night-2 text-white/60 hover:text-white"}`}
            >
              {i + 1}
            </button>
          ))}
        </nav>
      )}
    </div>
  );
}
