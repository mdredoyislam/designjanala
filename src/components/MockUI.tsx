/**
 * Small abstract product mock-ups used as card illustrations in place of screenshots.
 * Variants: 0 = AI chat, 1 = SaaS dashboard, 2 = mobile app, 3 = design canvas.
 */
export function MockUI({ variant, className = "" }: { variant: number; className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-t-lg border border-b-0 border-mist bg-white p-3 ${className}`} aria-hidden="true">
      <div className="mb-3 flex gap-1">
        <span className="h-1.5 w-1.5 rounded-full bg-[#ff5f57]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#febc2e]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#28c840]" />
      </div>
      {variant % 4 === 0 && (
        <div className="space-y-2">
          <div className="ml-auto h-6 w-2/3 rounded-md bg-accent/90" />
          <div className="flex gap-2">
            <span className="h-6 w-6 shrink-0 rounded-full bg-night" />
            <div className="flex-1 space-y-1.5">
              <div className="h-2 w-full rounded bg-surface" />
              <div className="h-2 w-5/6 rounded bg-surface" />
              <div className="h-2 w-2/3 rounded bg-surface" />
            </div>
          </div>
          <div className="ml-auto h-6 w-1/2 rounded-md bg-accent/90" />
          <div className="mt-3 flex items-center gap-2 rounded-md border border-line px-2 py-1.5">
            <div className="h-2 flex-1 rounded bg-surface" />
            <span className="h-4 w-4 rounded bg-accent" />
          </div>
        </div>
      )}
      {variant % 4 === 1 && (
        <div className="grid grid-cols-[28px_1fr] gap-2">
          <div className="space-y-1.5">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className={`h-4 rounded ${i === 0 ? "bg-accent" : "bg-surface"}`} />
            ))}
          </div>
          <div>
            <div className="grid grid-cols-3 gap-1.5">
              {[0, 1, 2].map((i) => (
                <div key={i} className="rounded border border-line p-1.5">
                  <div className="h-1.5 w-2/3 rounded bg-surface" />
                  <div className={`mt-1 h-3 w-1/2 rounded ${i === 0 ? "bg-accent" : "bg-night/80"}`} />
                </div>
              ))}
            </div>
            <div className="mt-2 flex h-14 items-end gap-1 rounded border border-line p-1.5">
              {[40, 65, 50, 80, 60, 95, 75].map((h, i) => (
                <span key={i} className={`flex-1 rounded-sm ${i === 5 ? "bg-accent" : "bg-surface"}`} style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
        </div>
      )}
      {variant % 4 === 2 && (
        <div className="flex justify-center gap-3">
          {[0, 1].map((p) => (
            <div key={p} className={`w-20 rounded-xl border-2 border-night p-1.5 ${p ? "translate-y-4" : ""}`}>
              <div className="mx-auto mb-1.5 h-1 w-6 rounded bg-night" />
              <div className={`h-10 rounded ${p ? "bg-night" : "bg-accent"}`} />
              <div className="mt-1.5 space-y-1">
                <div className="h-1.5 rounded bg-surface" />
                <div className="h-1.5 w-2/3 rounded bg-surface" />
              </div>
              <div className="mt-2 grid grid-cols-3 gap-1">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="h-3 rounded bg-surface" />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      {variant % 4 === 3 && (
        <div className="relative h-full">
          <div className="grid grid-cols-3 gap-2">
            <div className="col-span-2 flex h-16 items-center justify-center rounded bg-night">
              <span className="h-display text-lg text-night">Aa</span>
            </div>
            <div className="space-y-1.5">
              {["bg-accent", "bg-night", "bg-steel", "bg-surface"].map((c) => (
                <div key={c} className={`h-3 rounded ${c}`} />
              ))}
            </div>
          </div>
          <div className="mt-2 grid grid-cols-4 gap-1.5">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className={`h-8 rounded ${i === 1 ? "border-2 border-accent bg-accent/10" : "bg-surface"}`} />
            ))}
          </div>
          <span className="absolute top-12 right-6 rotate-[-8deg] rounded bg-accent px-1.5 py-0.5 text-[9px] font-semibold text-night">You</span>
        </div>
      )}
    </div>
  );
}
