"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { SiteContent } from "@designjanala/shared";
import { ArrowUpRight, Check } from "./icons";

/** How long each industry stays selected before the explorer moves on by itself. */
const STEP_MS = 6000;

/** Line icon picked from words in the industry name; a generic one for anything new. */
const icons: [RegExp, string][] = [
  [/saas|startup/i, "M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2M9 12l3 3M14.5 4.5C17 3.5 20 3.5 20 3.5s0 3-1 5.5L13 15l-4-4z"],
  [/fin|bank|pay/i, "M3 6h18v12H3zM3 10h18M7 15h4"],
  [/health|medic|care/i, "M3 12h4l2-4 3 8 2-4h7"],
  [/commerce|retail|shop/i, "M5 8h14l-1 12H6zM9 8V6a3 3 0 016 0v2"],
  [/estate|property/i, "M3 11l9-7 9 7M5 10v10h14V10M10 20v-6h4v6"],
  [/ed-?tech|educat|learn/i, "M2 9l10-5 10 5-10 5zM6 11v5c3 2 9 2 12 0v-5"],
  [/logistic|delivery|fleet/i, "M2 6h11v10H2zM13 10h5l3 3v3h-8M6 19a2 2 0 100-4 2 2 0 000 4zM17 19a2 2 0 100-4 2 2 0 000 4z"],
  [/media|publish|news/i, "M4 5h13v14H6a2 2 0 01-2-2zM17 9h3v8a2 2 0 01-2 2M8 9h5M8 13h5M8 16h3"],
];
const fallback = "M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5";

function IndustryIcon({ title, className }: { title: string; className?: string }) {
  const d = icons.find(([re]) => re.test(title))?.[1] ?? fallback;
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

/**
 * Home page "Building Software for Diverse Industry Needs": a numbered list of industries beside a
 * detail panel. It advances on its own until someone hovers, focuses or picks an industry.
 */
export default function IndustryExplorer({ industries }: { industries: SiteContent["industries"] }) {
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [chosen, setChosen] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const auto = !hovering && !chosen && !reducedMotion && industries.length > 1;

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(media.matches);
    const frame = requestAnimationFrame(sync);
    media.addEventListener("change", sync);
    return () => {
      cancelAnimationFrame(frame);
      media.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (!auto) return;
    const timer = setTimeout(() => setActive((i) => (i + 1) % industries.length), STEP_MS);
    return () => clearTimeout(timer);
  }, [auto, active, industries.length]);

  const current = industries[Math.min(active, industries.length - 1)];
  if (!current) return null;
  const pick = (i: number) => {
    setActive(i);
    setChosen(true);
  };
  const number = (i: number) => String(i + 1).padStart(2, "0");

  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:gap-10" onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
      {/* Desktop: numbered list */}
      <ul className="hidden lg:col-span-5 lg:block" role="tablist" aria-label="Industries" aria-orientation="vertical">
        {industries.map((ind, i) => {
          const on = i === active;
          return (
            <li key={ind.title} className="border-b border-night-line first:border-t">
              <button
                type="button"
                role="tab"
                id={`industry-tab-${i}`}
                aria-selected={on}
                aria-controls="industry-panel"
                onClick={() => pick(i)}
                onFocus={() => pick(i)}
                className="group relative flex w-full items-center gap-5 py-4 text-left"
              >
                <span className={`font-mono text-xs tabular-nums transition-colors ${on ? "text-accent-fg" : "text-white/30"}`}>{number(i)}</span>
                <span className={`h-display text-2xl transition-colors xl:text-[1.7rem] ${on ? "text-white" : "text-white/35 group-hover:text-white/70"}`}>{ind.title}</span>
                <ArrowUpRight className={`ml-auto h-5 w-5 transition-all ${on ? "rotate-45 text-accent-fg opacity-100" : "opacity-0 group-hover:opacity-60"}`} />
                {/* Time left before the next industry */}
                {on && auto && (
                  <span
                    key={active}
                    className="absolute bottom-[-1px] left-0 h-px bg-accent"
                    style={{ animation: `industry-progress ${STEP_MS}ms linear forwards` }}
                    aria-hidden="true"
                  />
                )}
              </button>
            </li>
          );
        })}
      </ul>

      {/* Mobile and tablet: scrollable chips */}
      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] lg:hidden [&::-webkit-scrollbar]:hidden" role="tablist" aria-label="Industries">
        {industries.map((ind, i) => (
          <button
            key={ind.title}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-controls="industry-panel"
            onClick={() => pick(i)}
            className={`shrink-0 rounded-full border px-4 py-2 text-sm whitespace-nowrap transition-colors ${
              i === active ? "border-accent bg-accent text-accent-ink" : "border-night-line text-white/70"
            }`}
          >
            {ind.title}
          </button>
        ))}
      </div>

      {/* Detail panel */}
      <div
        id="industry-panel"
        role="tabpanel"
        aria-labelledby={`industry-tab-${active}`}
        className="relative overflow-hidden rounded-2xl border border-night-line bg-night-2 p-6 sm:p-10 lg:col-span-7"
      >
        <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-accent/15 blur-[90px]" aria-hidden="true" />
        <div key={active} className="animate-fade-in relative">
          <div className="flex items-start justify-between gap-6">
            <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent text-accent-ink">
              <IndustryIcon title={current.title} className="h-7 w-7" />
            </span>
            <span className="font-mono text-xs text-white/40 tabular-nums">
              {number(active)} / {number(industries.length - 1)}
            </span>
          </div>
          <h3 className="h-display mt-8 text-3xl sm:text-4xl">{current.title}</h3>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/70">{current.body}</p>

          {current.builds.length > 0 && (
            <>
              <p className="mt-10 font-mono text-[11px] tracking-[0.14em] text-white/40 uppercase">What we build here</p>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {current.builds.map((b) => (
                  <li key={b} className="flex items-start gap-3 rounded-lg border border-night-line bg-night/60 px-4 py-3 text-sm text-white/85">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-fg" />
                    {b}
                  </li>
                ))}
              </ul>
            </>
          )}

          <Link href="/contact" className="btn-primary mt-10">
            Discuss a {current.title.split(" & ")[0]} project
          </Link>
        </div>
      </div>
    </div>
  );
}
