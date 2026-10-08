"use client";

import Link from "next/link";
import { useRef } from "react";
import type { SiteContent } from "@designjanala/shared";
import { ArrowLeft, ArrowRight } from "./icons";

/** Two-up testimonial slider. `dark` renders the "Proof, not promises" variant. */
export default function Testimonials({
  testimonials,
  title = "What Our Clients Think of Us",
  dark = false,
}: {
  testimonials: SiteContent["testimonials"];
  title?: string;
  dark?: boolean;
}) {
  const track = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("figure");
    el.scrollBy({ left: dir * ((card?.clientWidth ?? 400) + 20), behavior: "smooth" });
  };

  return (
    <section className={dark ? "bg-night py-20 text-white lg:py-28" : "py-20 lg:py-28"}>
      <div className="container-x">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">[ Testimonials ]</p>
            <h2 className="h-section mt-4">{title}</h2>
            {dark && (
              <Link href="/portfolio" className="btn-secondary mt-6">
                Explore our work
              </Link>
            )}
          </div>
          <div className="flex gap-2">
            {[
              { dir: -1, label: "Previous testimonials", Icon: ArrowLeft },
              { dir: 1, label: "Next testimonials", Icon: ArrowRight },
            ].map(({ dir, label, Icon }) => (
              <button
                key={dir}
                onClick={() => scroll(dir)}
                aria-label={label}
                className={`flex h-11 w-11 items-center justify-center rounded-md border transition-colors hover:border-accent hover:bg-accent hover:text-accent-ink ${
                  dark ? "border-night-line" : "border-line"
                }`}
              >
                <Icon className="h-4 w-4" />
              </button>
            ))}
          </div>
        </div>

        <div
          ref={track}
          className="mt-12 -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className={`flex w-[85vw] shrink-0 snap-start flex-col justify-between rounded-xl p-7 sm:w-[calc(50%-10px)] sm:p-9 ${
                dark ? "border border-night-line bg-night-2" : "bg-surface"
              }`}
            >
              <div>
                <span className="h-display text-5xl leading-none text-accent-fg" aria-hidden="true">&ldquo;</span>
                <blockquote className="h-display mt-2 text-xl normal-case leading-snug sm:text-2xl">{t.quote}</blockquote>
              </div>
              <figcaption className={`mt-10 border-t pt-6 ${dark ? "border-night-line" : "border-mist"}`}>
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-sm font-semibold text-accent-ink">
                    {t.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                  </span>
                  <span>
                    <span className="block font-semibold">{t.name}</span>
                    <span className={`block text-sm ${dark ? "text-white/55" : "text-body"}`}>{t.role}</span>
                  </span>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
