import Link from "next/link";
import { serviceCategories, servicesIn } from "@/data/site";
import { MockUI } from "./MockUI";
import Reveal from "./Reveal";

/** Homepage "AI-Powered Development Services We Offer": a beige card per service group. */
export default function ServiceCategories() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {serviceCategories.map((c, i) => (
        <Reveal key={c.slug} delay={i * 80} className="card group flex flex-col overflow-hidden">
          <div className="p-4 pb-0">
            <MockUI variant={i} className="h-44 transition-transform duration-700 group-hover:-translate-y-1" />
          </div>
          <div className="flex flex-1 flex-col p-6">
            <h3 className="text-lg font-semibold text-ink">{c.title}</h3>
            <ul className="mt-4 grid gap-2 text-sm">
              {servicesIn(c.slug).map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="text-body transition-colors hover:text-accent">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
