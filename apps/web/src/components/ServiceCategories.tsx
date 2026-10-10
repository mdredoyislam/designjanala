import Link from "next/link";
import { servicesIn } from "@designjanala/shared";
import { getContent } from "@/lib/content";
import { ArrowUpRight } from "./icons";
import { MockUI } from "./MockUI";
import Reveal from "./Reveal";

/** Homepage "AI-Powered Development Services We Offer": a card per service group. */
export default async function ServiceCategories() {
  const content = await getContent();
  const { serviceCategories } = content;
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {serviceCategories.map((c, i) => (
        <Reveal
          key={c.slug}
          delay={i * 80}
          className="card corners group relative flex flex-col overflow-hidden border border-transparent transition-colors duration-300 hover:border-line hover:bg-card"
        >
          <div className="relative p-4 pb-0">
            <span className="absolute top-6 right-6 z-10 font-mono text-[11px] text-muted">0{i + 1}</span>
            <MockUI variant={i} className="h-44 transition-transform duration-700 group-hover:-translate-y-1" />
          </div>
          <div className="flex flex-1 flex-col p-6">
            <h3 className="text-lg font-semibold text-ink">{c.title}</h3>
            <ul className="mt-4 grid gap-2 text-sm">
              {servicesIn(content, c.slug).map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="text-body transition-colors hover:text-accent-fg">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href={`/services#${c.slug}`}
              className="mt-auto inline-flex items-center gap-1.5 pt-6 font-mono text-[11px] font-semibold tracking-[0.08em] text-ink uppercase transition-colors hover:text-accent-fg"
            >
              Explore <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:rotate-45" />
            </Link>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
