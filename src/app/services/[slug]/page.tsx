import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CodeWindow from "@/components/CodeWindow";
import { CtaPeach } from "@/components/Cta";
import Faq from "@/components/Faq";
import PageHero from "@/components/PageHero";
import Process from "@/components/Process";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { ArrowUpRight } from "@/components/icons";
import { serviceCategories, services, servicesFaqs, servicesIn, site } from "@/data/site";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export const dynamicParams = false;

export async function generateMetadata(props: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const s = services.find((x) => x.slug === slug);
  return s ? { title: s.title, description: s.short } : {};
}

export default async function ServicePage(props: PageProps<"/services/[slug]">) {
  const { slug } = await props.params;
  const index = services.findIndex((x) => x.slug === slug);
  if (index === -1) notFound();
  const service = services[index];
  const next = services[(index + 1) % services.length];
  const category = serviceCategories.find((c) => c.slug === service.category)!;
  const related = servicesIn(service.category).filter((s) => s.slug !== service.slug);

  const code = `const project = {
  service: "${service.title}",
  deliverables: ${service.deliverables.length},
  team: "${site.name}",
  status: "ready to start",
};`;

  return (
    <>
      <PageHero
        eyebrow={category.title}
        title={service.title}
        aside={<CodeWindow file={`~/${site.name.toLowerCase()}/${service.slug}.ts`} code={code} />}
      >
        <p>{service.short}</p>
        <Link href="/contact" className="btn-secondary mt-8">
          Start your project
        </Link>
      </PageHero>

      <section className="container-x py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow">[ Overview ]</p>
            <h2 className="h-section mt-4">{service.tagline}</h2>
            <div className="lead mt-6 space-y-5">
              {service.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={100} className="card self-start p-6 sm:p-8 lg:col-span-4 lg:col-start-9">
            <h2 className="font-mono text-[11px] tracking-[0.14em] text-muted uppercase">[ What you get ]</h2>
            <ul className="mt-5 divide-y divide-mist">
              {service.deliverables.map((d, i) => (
                <li key={d} className="flex items-center gap-3 py-3 text-[15px] font-medium">
                  <span className="font-mono text-[11px] text-accent">0{i + 1}</span>
                  {d}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="bg-night py-20 text-white lg:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <SectionHeading eyebrow="Process" title="How We Work" dark />
          <Process dark />
        </div>
      </section>

      {related.length > 0 && (
        <section className="container-x py-20 lg:py-28">
          <SectionHeading eyebrow={category.title} title="Related Services" className="mb-10" />
          <div className="grid gap-5 md:grid-cols-3">
            {related.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="card group flex flex-col p-6 transition-colors hover:bg-mist">
                <h3 className="text-lg font-semibold group-hover:text-accent">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm text-body">{s.short}</p>
                <span className="mt-6 font-mono text-[11px] font-semibold tracking-wider text-accent uppercase">[ Explore ]</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <Link href={`/services/${next.slug}`} className="group block border-y border-line">
        <div className="container-x flex items-center justify-between gap-6 py-12 lg:py-16">
          <div>
            <p className="eyebrow">[ Next service ]</p>
            <p className="h-display mt-3 text-3xl transition-colors group-hover:text-accent sm:text-5xl">{next.title}</p>
          </div>
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md bg-accent text-accent-ink transition-transform duration-500 group-hover:rotate-45">
            <ArrowUpRight className="h-6 w-6" />
          </span>
        </div>
      </Link>

      <Faq title="Questions About Our Development Services" items={servicesFaqs} />

      <CtaPeach
        title="Bring the Idea. We'll Structure It."
        body="Reach out directly, no gatekeeping, no minimum project size. We'll ask the right questions and turn your idea into a real plan."
      />
    </>
  );
}
