import { comparison, site } from "@/data/site";

const columns = [site.name, "Freelancers", "Traditional Agencies"];

/** "Where Others Stop, We Continue": the DesignJanala column is highlighted in orange. */
export default function Comparison() {
  return (
    <div className="relative -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
      <table className="w-full min-w-[720px] border-separate border-spacing-0 text-left text-sm">
        <thead>
          <tr>
            <th className="w-[22%] rounded-tl-xl bg-surface px-5 py-4 font-mono text-[11px] font-medium tracking-[0.14em] text-muted uppercase">
              Features
            </th>
            {columns.map((c, i) => (
              <th
                key={c}
                className={`px-5 py-4 font-mono text-[11px] font-medium tracking-[0.14em] uppercase ${
                  i === 0 ? "rounded-t-xl bg-accent text-white" : `bg-surface text-muted ${i === 2 ? "rounded-tr-xl" : ""}`
                }`}
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {comparison.map((row, r) => {
            const last = r === comparison.length - 1;
            return (
              <tr key={row.label}>
                <td className={`border-t border-mist bg-surface px-5 py-4 font-medium text-ink ${last ? "rounded-bl-xl" : ""}`}>{row.label}</td>
                {row.values.map((v, i) => (
                  <td
                    key={i}
                    className={`border-t px-5 py-4 ${
                      i === 0
                        ? `border-white/20 bg-accent font-medium text-white ${last ? "rounded-b-xl" : ""}`
                        : `border-mist bg-surface text-body ${last && i === 2 ? "rounded-br-xl" : ""}`
                    }`}
                  >
                    {v}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
