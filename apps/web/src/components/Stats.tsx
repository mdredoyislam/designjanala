import { getContent } from "@/lib/content";
import CountUp from "./CountUp";

/** `compact` keeps a 2×2 grid on desktop, for use in a half-width column. */
export default async function Stats({ compact = false }: { compact?: boolean }) {
  const { stats } = await getContent();
  return (
    <dl className={`grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line ${compact ? "" : "lg:grid-cols-4"}`}>
      {stats.map((s) => (
        <div key={s.label} className="bg-surface p-6 sm:p-8">
          <dd className="h-display text-4xl text-ink sm:text-5xl">
            <CountUp value={s.value} suffix={s.suffix} />
          </dd>
          <dt className="mt-2 text-sm text-body sm:text-base">{s.label}</dt>
        </div>
      ))}
    </dl>
  );
}
