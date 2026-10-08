import type { Metadata } from "next";
import { toolCount as countTools } from "@designjanala/shared";
import CategoryIcon from "@/components/CategoryIcon";
import { CtaCode } from "@/components/Cta";
import Marquee from "@/components/Marquee";
import PageHero, { HeroChips } from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import ToolLogo from "@/components/ToolLogo";
import { getContent } from "@/lib/content";
import { toolIcon } from "@/lib/tool-icons";

export async function generateMetadata(): Promise<Metadata> {
  const { site } = await getContent();
  return {
    title: "Technology",
    description: `The design, frontend, backend, mobile, cloud, DevOps, AI and analytics tools ${site.name} uses to build reliable products.`,
  };
}

/** "Frontend" reads better as "Frontend Development" in a card heading. */
const heading = (category: string) =>
  category === "Design" ? "Design & Prototyping" : ["Frontend", "Backend"].includes(category) ? `${category} Development` : category;

export default async function TechnologyPage() {
  const content = await getContent();
  const { site, stackPrinciples, stackRecipes, techStack } = content;
  const slug = site.name.toLowerCase();
  const allTools = [...new Set(techStack.flatMap((t) => t.items))].map(toolIcon);
  // The hero shows the first tool of each category, then the second, until twelve: a spread across the stack.
  const seen = new Set<string>();
  const featured = Array.from({ length: 4 }, (_, i) => techStack.map((t) => t.items[i]).filter(Boolean))
    .flat()
    .map(toolIcon)
    // Skip repeats, including tools that share a logo (Figma / FigJam).
    .filter((t) => !seen.has(t.path ?? t.name) && seen.add(t.path ?? t.name))
    .slice(0, 12);
  const toolCount = countTools(content);

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
          <ul className="grid grid-cols-3 gap-2 sm:grid-cols-4" aria-label="Some of the tools we use">
            {featured.map((t) => (
              <li
                key={t.name}
                className="group flex aspect-square flex-col items-center justify-center gap-2.5 rounded-xl border border-night-line bg-night-2/80 p-2 text-white/80 backdrop-blur transition-colors hover:border-white/25"
              >
                <ToolLogo tool={t} className="h-7 w-7 text-[11px]" />
                <span className="truncate text-center font-mono text-[10px] tracking-wide text-white/50">{t.name}</span>
              </li>
            ))}
          </ul>
        }
        footer={
          <div className="grid gap-6 sm:grid-cols-2 sm:items-center">
            <HeroChips
              items={[
                { value: `${Math.floor(toolCount / 10) * 10}+`, label: "tools in rotation" },
                { value: String(techStack.length), label: "stack categories" },
                { value: String(stackRecipes.length), label: "starter stacks" },
              ]}
            />
            <p className="max-w-sm text-sm text-white/60 sm:justify-self-end">
              We balance modern tools with proven ones, so your product stays fast today and easy to maintain later.
            </p>
          </div>
        }
      />

      {/* Categories */}
      <section className="container-x py-20 lg:py-28">
        <SectionHeading
          eyebrow="Categories"
          title="The Right Technology for Every Kind of Project"
          aside={<p>Websites, mobile apps and backend systems all have different demands, so we choose frameworks and tools that fit each one specifically.</p>}
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {techStack.map((t, i) => (
            <Reveal key={t.category} delay={(i % 3) * 70} className="card group/card flex flex-col border border-line p-6 transition-colors hover:border-ink/20 sm:p-7">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-night text-accent">
                  <CategoryIcon category={t.category} />
                </span>
                <h3 className="text-lg font-semibold">{heading(t.category)}</h3>
                <span className="ml-auto font-mono text-[11px] text-muted">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-body">{t.body}</p>
              <ul className="mt-5 flex flex-wrap gap-1.5 pt-1">
                {t.items.map(toolIcon).map((tool) => (
                  <li key={tool.name} className="group flex items-center gap-1.5 rounded-md border border-line bg-card py-1 pr-2.5 pl-1.5 text-xs font-medium text-ink">
                    <ToolLogo tool={tool} className="h-4 w-4 text-[8px]" />
                    {tool.name}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 space-y-6" aria-hidden="true">
          {[0, 1].map((row) => (
            <Marquee key={row} duration={row ? 80 : 70} className="[mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
              {(row ? [...allTools].reverse() : allTools).map((tool) => (
                <span key={tool.name} className="group mx-7 flex items-center gap-2.5 font-display text-lg font-semibold whitespace-nowrap text-ink/40">
                  <ToolLogo tool={tool} className="h-6 w-6 text-[9px]" />
                  {tool.name}
                </span>
              ))}
            </Marquee>
          ))}
        </div>
      </section>

      {/* Starter stacks */}
      {stackRecipes.length > 0 && (
        <section className="relative overflow-hidden bg-night py-20 text-white lg:py-28">
          <div className="bg-halftone pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
          <div className="container-x relative">
            <SectionHeading
              eyebrow="Starter stacks"
              title="Where We Usually Start, by Product Type"
              aside={<p>Proven starting points we adapt to your team, budget and existing systems. Nothing here is fixed.</p>}
              dark
            />
            <div className="mt-12 grid gap-4 md:grid-cols-2">
              {stackRecipes.map((r, i) => (
                <Reveal key={r.title} delay={(i % 2) * 80} className="flex flex-col rounded-xl border border-night-line bg-night-2 p-6 sm:p-8">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="h-display text-2xl">{r.title}</h3>
                    <span className="font-mono text-[11px] text-white/35">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <p className="mt-2 font-mono text-[11px] tracking-wider text-accent-fg uppercase">{r.bestFor}</p>
                  <p className="mt-4 text-sm leading-relaxed text-white/65">{r.summary}</p>
                  <ul className="mt-6 flex flex-wrap gap-2 border-t border-night-line pt-6">
                    {r.tools.map(toolIcon).map((tool) => (
                      <li
                        key={tool.name}
                        className="group flex items-center gap-2 rounded-full border border-night-line bg-night py-1.5 pr-3.5 pl-2 text-xs font-medium text-white/80 transition-colors hover:border-white/25"
                      >
                        <ToolLogo tool={tool} className="h-4 w-4 text-[8px]" />
                        {tool.name}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Principles */}
      <section className="bg-surface py-20 lg:py-28">
        <div className="container-x">
          <SectionHeading
            title="Nothing in Our Stack Ever Gets Chosen by Accident or Old Habit"
            aside={<p>None of our recommendations are automatic, since every project brings its own mix of goals, constraints and long-term expectations.</p>}
          />
          <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {stackPrinciples.map((p, i) => (
              <Reveal key={p.title} delay={i * 80} className="bg-card p-6 sm:p-8">
                <span className="font-mono text-xs font-semibold text-accent-fg">{String(i + 1).padStart(2, "0")}</span>
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
