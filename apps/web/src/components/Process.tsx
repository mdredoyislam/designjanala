import { getContent } from "@/lib/content";
import Reveal from "./Reveal";

/** "The DesignJanala Development Journey": numbered stages with a connecting line. */
export default async function Process({ dark = false }: { dark?: boolean }) {
  const { process } = await getContent();
  return (
    <ol className="relative space-y-1">
      <span className={`absolute top-4 bottom-4 left-[15px] w-px ${dark ? "bg-night-line" : "bg-line"}`} aria-hidden="true" />
      {process.map((p, i) => (
        <Reveal as="li" key={p.title} delay={i * 80} className="relative flex gap-5 py-4">
          <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent font-mono text-[11px] font-semibold text-accent-ink">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div>
            <h3 className="text-lg font-semibold">{p.title}</h3>
            <p className={`mt-1 text-sm leading-relaxed ${dark ? "text-white/60" : "text-body"}`}>{p.body}</p>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
