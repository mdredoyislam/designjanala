import type { ReactNode } from "react";
import Reveal from "./Reveal";

/** Dark page hero with orange halftone. `aside` sits on the right (usually a CodeWindow). */
export default function PageHero({
  eyebrow,
  title,
  children,
  aside,
  footer,
}: {
  eyebrow?: string;
  title: ReactNode;
  children?: ReactNode;
  aside?: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-night text-white">
      <div className="bg-halftone pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="container-x relative py-16 sm:py-20 lg:py-24">
        <div className={`grid items-center gap-12 ${aside ? "lg:grid-cols-12" : ""}`}>
          <Reveal className={aside ? "lg:col-span-7" : "max-w-4xl"}>
            {eyebrow && <p className="eyebrow">[ {eyebrow} ]</p>}
            <h1 className="h-hero mt-5">{title}</h1>
            {children && <div className="mt-6 max-w-xl text-base leading-relaxed text-white/70 lg:text-lg">{children}</div>}
          </Reveal>
          {aside && (
            <Reveal delay={120} className="lg:col-span-5">
              {aside}
            </Reveal>
          )}
        </div>
        {footer && <div className="mt-12">{footer}</div>}
      </div>
    </section>
  );
}

/** Small rounded chips shown under hero copy: "60+ tools in rotation". */
export function HeroChips({ items }: { items: { value: string; label: string }[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((c) => (
        <span key={c.label} className="inline-flex items-center gap-1.5 rounded-md border border-night-line bg-night-2 px-3 py-1.5 text-xs text-white/70">
          <span className="font-semibold text-accent-fg">{c.value}</span> {c.label}
        </span>
      ))}
    </div>
  );
}
