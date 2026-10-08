import Link from "next/link";
import type { Faq as FaqItem } from "@designjanala/shared";
import { getContent } from "@/lib/content";
import { ArrowDown } from "./icons";
import Reveal from "./Reveal";
import { TeamAvatar } from "./TeamPhoto";

/** Centered heading, then a dark "more questions?" card beside a beige accordion. */
export default async function Faq({
  title,
  items,
  more,
}: {
  title?: string;
  /** Defaults to the home FAQ. */
  items?: FaqItem[];
  more?: { label: string; href: string };
}) {
  const content = await getContent();
  const { site } = content;
  title ??= `Questions about building with ${site.name}`;
  items ??= content.faqs;
  const lead = content.team[0];
  return (
    <section className="container-x py-20 lg:py-28">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">[ FAQ ]</p>
        <h2 className="h-section mt-4">{title}</h2>
      </Reveal>
      <div className="mt-12 grid gap-5 lg:grid-cols-12">
        <Reveal className="relative flex min-h-[360px] flex-col justify-end overflow-hidden rounded-xl bg-night p-6 text-white sm:p-8 lg:col-span-5">
          <div className="bg-halftone-center pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
          <span className="h-display pointer-events-none absolute top-6 right-6 text-[7rem] leading-none text-white/[0.06] select-none" aria-hidden="true">
            ?
          </span>
          <div className="relative">
            <p className="h-display text-2xl normal-case sm:text-3xl">Do you have more questions?</p>
            {lead && (
              <div className="mt-5 flex items-center gap-3">
                <TeamAvatar member={lead} className="h-12 w-12" />
                <div>
                  <p className="font-semibold">{lead.name}</p>
                  <p className="text-sm text-white/60">
                    {lead.role} · {site.name}
                  </p>
                </div>
              </div>
            )}
            <Link href="/contact" className="btn-secondary mt-6 w-full">
              {lead ? "Reach me out" : "Contact us"}
            </Link>
          </div>
        </Reveal>
        <Reveal delay={100} className="card p-4 sm:p-6 lg:col-span-7">
          {items.map((f, i) => (
            <details key={f.q} open={i === 0} className="group border-b border-mist last:border-0 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 px-2 py-5 text-[15px] font-medium text-ink sm:text-base">
                {f.q}
                <ArrowDown className="mt-0.5 h-4 w-4 shrink-0 text-muted transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <p className="-mt-1 px-2 pb-5 text-sm leading-relaxed text-body">{f.a}</p>
            </details>
          ))}
          {more && (
            <Link href={more.href} className="mt-4 inline-block px-2 text-sm font-medium underline underline-offset-4 hover:text-accent-fg">
              {more.label}
            </Link>
          )}
        </Reveal>
      </div>
    </section>
  );
}
