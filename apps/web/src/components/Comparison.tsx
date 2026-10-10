import Image from "next/image";
import Link from "next/link";
import { getContent } from "@/lib/content";
import { ArrowUpRight, Check, Cross } from "./icons";

/**
 * "Where Others Stop, We Continue". From md up, a table whose DesignJanala column is a raised
 * black card; on phones, one card per feature so nothing scrolls sideways.
 */
export default async function Comparison() {
  const { comparison, site } = await getContent();
  const others = ["Freelancers", "Traditional Agencies"];

  return (
    <>
      <table className="hidden w-full border-separate border-spacing-0 text-left text-sm md:table">
        <thead>
          <tr>
            <th className="w-[26%] px-5 pb-5 align-bottom font-mono text-[11px] font-medium tracking-[0.14em] text-muted uppercase">Features</th>
            <th className="w-[28%] rounded-t-2xl bg-night px-6 pt-7 pb-5 align-bottom text-white">
              <span className="flex items-center gap-2.5">
                <Image src="/images/brand/favicon.png" alt="" width={28} height={28} className="h-7 w-7 rounded-md" />
                <span className="font-display text-lg font-semibold">{site.name}</span>
              </span>
            </th>
            {others.map((c) => (
              <th key={c} className="px-6 pb-5 align-bottom font-mono text-[11px] font-medium tracking-[0.14em] text-muted uppercase">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {comparison.map((row, r) => (
            <tr key={row.label} className="group">
              <th scope="row" className="border-t border-line px-5 py-5 font-medium text-ink transition-colors group-hover:bg-surface">
                <span className="mr-3 font-mono text-[11px] text-muted">{String(r + 1).padStart(2, "0")}</span>
                {row.label}
              </th>
              <td className="border-t border-night-line bg-night px-6 py-5 text-white">
                <span className="flex items-start gap-3">
                  <span className="mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-accent-ink">
                    <Check className="h-3 w-3" />
                  </span>
                  <span className="font-medium">{row.us}</span>
                </span>
              </td>
              {[row.freelancers, row.agencies].map((v, i) => (
                <td key={i} className="border-t border-line px-6 py-5 text-body transition-colors group-hover:bg-surface">
                  <span className="flex items-start gap-3">
                    <span className="mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-mist text-muted">
                      <Cross className="h-3 w-3" />
                    </span>
                    {v}
                  </span>
                </td>
              ))}
            </tr>
          ))}
          <tr>
            <td className="border-t border-line" />
            <td className="rounded-b-2xl border-t border-night-line bg-night px-6 pt-5 pb-7">
              <Link href="/contact" className="btn-primary w-full">
                Start a project
              </Link>
            </td>
            <td className="border-t border-line" colSpan={2} />
          </tr>
        </tbody>
      </table>

      {/* Phones: one card per feature. */}
      <ul className="grid gap-4 md:hidden" role="list">
        {comparison.map((row, r) => (
          <li key={row.label} className="card overflow-hidden">
            <p className="flex items-center gap-3 px-5 pt-5 font-medium text-ink">
              <span className="font-mono text-[11px] text-muted">{String(r + 1).padStart(2, "0")}</span>
              {row.label}
            </p>
            <div className="mx-3 mt-4 flex items-start gap-3 rounded-lg bg-night px-4 py-3.5 text-sm text-white">
              <span className="mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-accent-ink">
                <Check className="h-3 w-3" />
              </span>
              <span>
                <span className="block font-mono text-[10px] tracking-[0.14em] text-accent-fg uppercase">{site.name}</span>
                <span className="font-medium">{row.us}</span>
              </span>
            </div>
            <dl className="grid grid-cols-2 gap-3 px-5 pt-4 pb-5 text-sm">
              {[
                [others[0], row.freelancers],
                [others[1], row.agencies],
              ].map(([who, v]) => (
                <div key={who}>
                  <dt className="font-mono text-[10px] tracking-[0.14em] text-muted uppercase">{who}</dt>
                  <dd className="mt-1 text-body">{v}</dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
        <li>
          <Link href="/contact" className="btn-dark w-full">
            Start a project <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </li>
      </ul>
    </>
  );
}
