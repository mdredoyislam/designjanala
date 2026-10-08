import Link from "next/link";
import type { ReactNode } from "react";
import CodeWindow from "./CodeWindow";
import Reveal from "./Reveal";

/** Light, centered CTA with an orange glow: used at the bottom of the homepage. */
export function CtaGlow({ title, body, cta = "Book a strategy call" }: { title: ReactNode; body: ReactNode; cta?: string }) {
  return (
    <section className="relative overflow-hidden bg-background py-24 lg:py-32">
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-[360px] w-[900px] -translate-x-1/2 rounded-[50%] bg-accent/35 blur-[110px]" aria-hidden="true" />
      <div className="bg-dots pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,#000)]" aria-hidden="true" />
      <Reveal className="container-x relative text-center">
        <p className="eyebrow">[ Let&rsquo;s Talk ]</p>
        <h2 className="h-section mx-auto mt-4 max-w-3xl">{title}</h2>
        <p className="lead mx-auto mt-5 max-w-xl">{body}</p>
        <Link href="/contact" className="btn-primary mt-8">
          {cta}
        </Link>
      </Reveal>
    </section>
  );
}

/** Yellow band with a mock proposal card: services page. */
export function CtaPeach({ title, body }: { title: ReactNode; body: ReactNode }) {
  return (
    <section className="bg-accent text-accent-ink">
      <div className="container-x grid items-center gap-10 py-16 lg:grid-cols-2 lg:py-20">
        <Reveal>
          <h2 className="h-section">{title}</h2>
          <p className="lead mt-5 max-w-md text-accent-ink/70">{body}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact" className="btn-dark">
              Book a strategy call
            </Link>
            <Link href="/contact" className="btn-outline">
              Become our client
            </Link>
          </div>
        </Reveal>
        <Reveal delay={120} className="relative mx-auto w-full max-w-md">
          <div className="rounded-xl border border-line bg-card p-5 shadow-xl shadow-accent/10">
            <div className="flex gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
              <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
              <span className="h-2 w-2 rounded-full bg-[#28c840]" />
            </div>
            <p className="mt-4 font-mono text-[11px] tracking-wider text-muted uppercase">Project plan</p>
            {["Discovery & scope", "Design sprint", "Build & QA", "Launch"].map((s, i) => (
              <div key={s} className="mt-3 flex items-center gap-3">
                <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${i < 2 ? "bg-accent text-accent-ink" : "bg-steel text-white"}`}>
                  {i + 1}
                </span>
                <span className="flex-1 text-sm">{s}</span>
                <span className="h-1.5 w-20 overflow-hidden rounded-full bg-surface">
                  <span className="block h-full rounded-full bg-accent" style={{ width: `${[100, 60, 0, 0][i]}%` }} />
                </span>
              </div>
            ))}
          </div>
          <div className="absolute -right-3 -bottom-6 rounded-lg bg-night px-4 py-3 text-accent shadow-lg sm:-right-8">
            <p className="font-mono text-[10px] tracking-wider uppercase opacity-80">Reply time</p>
            <p className="h-display text-xl">&lt; 24 hrs</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** Dark rounded card with copy on the left and a code window on the right. */
export function CtaCode({
  title,
  body,
  file,
  code,
  cta = "Become our client",
  note = "30-min call · No obligation",
}: {
  title: ReactNode;
  body: ReactNode;
  file: string;
  code: string;
  cta?: string;
  note?: string;
}) {
  return (
    <section className="container-x py-20 lg:py-24">
      <Reveal className="relative overflow-hidden rounded-2xl bg-night px-6 py-12 text-white sm:px-12 lg:py-16">
        <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-[600px] rounded-full bg-accent/25 blur-[100px]" aria-hidden="true" />
        <div className="relative grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="h-section">{title}</h2>
            <p className="mt-4 max-w-md text-white/70">{body}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="/contact" className="btn-primary">
                {cta}
              </Link>
              <span className="font-mono text-[11px] tracking-wider text-white/50 uppercase">{note}</span>
            </div>
          </div>
          <CodeWindow file={file} code={code} cursor />
        </div>
      </Reveal>
    </section>
  );
}
