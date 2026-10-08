import type { Metadata } from "next";
import CodeWindow from "@/components/CodeWindow";
import { CtaCode } from "@/components/Cta";
import Marquee from "@/components/Marquee";
import PageHero, { HeroChips } from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { site, stackPrinciples, techStack, toolCount } from "@/data/site";

export const metadata: Metadata = {
  title: "Technology",
  description: `The design, frontend, backend, mobile, cloud, DevOps, AI and analytics tools ${site.name} uses to build reliable products.`,
};

const slug = site.name.toLowerCase();
const allTools = techStack.flatMap((t) => t.items);

export default function TechnologyPage() {
  return (
    <>
      <PageHero
        eyebrow="Stacks"
        title={
          <>
            Stacks Chosen
            <br /> for Speed and Stability
          </>
        }
        aside={
          <CodeWindow
            file={`~/${slug}/stack.ts`}
            code={`const stack = {
  design: ["Figma", "Framer"],
  frontend: ["React", "Next"],
  backend: ["Node", "Python"],
  ai: ["Claude", "LangChain"],
};`}
          />
        }
        footer={
          <div className="grid gap-6 sm:grid-cols-2 sm:items-center">
            <HeroChips
              items={[
                { value: `${Math.floor(toolCount / 10) * 10}+`, label: "tools in rotation" },
                { value: String(techStack.length), label: "stack categories" },
              ]}
            />
            <p className="max-w-sm text-sm text-white/60 sm:justify-self-end">
              We balance modern tools with proven ones, so your product stays fast today and easy to maintain later.
            </p>
          </div>
        }
      />

      <section className="container-x py-20 lg:py-28">
        <SectionHeading
          eyebrow="Categories"
          title="The Right Technology for Every Kind of Project"
          aside={<p>Websites, mobile apps and backend systems all have different demands, so we choose frameworks and tools that fit each one specifically.</p>}
        />
        <div className="card mt-12 grid gap-px overflow-hidden bg-mist sm:grid-cols-2 lg:grid-cols-3">
          {techStack.map((t, i) => (
            <Reveal key={t.category} delay={(i % 3) * 70} className="bg-surface p-6 sm:p-8">
              <div className="flex items-start justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 font-mono text-sm font-bold text-accent">
                  {t.category[0]}
                </span>
                <span className="font-mono text-xs text-accent">0{i + 1}</span>
              </div>
              <h3 className="mt-6 text-lg font-semibold">{t.category === "Design" ? "Design & Prototyping" : `${t.category}${["Frontend", "Backend"].includes(t.category) ? " Development" : ""}`}</h3>
              <p className="mt-2 text-sm text-body">{t.body}</p>
              <ul className="mt-5 flex flex-wrap gap-1.5">
                {t.items.map((item) => (
                  <li key={item} className="rounded bg-accent/10 px-2 py-1 text-[11px] font-medium text-accent">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 space-y-5" aria-hidden="true">
          {[0, 1].map((row) => (
            <Marquee key={row} duration={row ? 70 : 60} className="[mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
              {(row ? [...allTools].reverse() : allTools).map((tool) => (
                <span key={tool} className="mx-6 font-display text-lg font-semibold whitespace-nowrap text-ink/35">
                  {tool}
                </span>
              ))}
            </Marquee>
          ))}
        </div>
      </section>

      <section className="bg-surface/60 py-20 lg:py-28">
        <div className="container-x">
          <SectionHeading
            title="Nothing in Our Stack Ever Gets Chosen by Accident or Old Habit"
            aside={<p>None of our recommendations are automatic, since every project brings its own mix of goals, constraints and long-term expectations.</p>}
          />
          <div className="mt-12 grid gap-px overflow-hidden rounded-xl bg-line sm:grid-cols-2 lg:grid-cols-4">
            {stackPrinciples.map((p, i) => (
              <Reveal key={p.title} delay={i * 80} className="bg-card p-6 sm:p-8">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 font-mono text-xs font-semibold text-accent">
                  0{i + 1}
                </span>
                <h3 className="mt-10 text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-body">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaCode
        title="Bring Us Your Stack Decision"
        body="You know your business better than anyone, so if you already have a technology preference, we will work within it."
        file={`~/${slug}/stack.ts`}
        code={`// tell us what you're building
const yourStack = `}
      />
    </>
  );
}
