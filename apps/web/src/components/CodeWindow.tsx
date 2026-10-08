/** Fake editor window with traffic lights. Quoted strings are tinted orange. */
export default function CodeWindow({
  file,
  code,
  footer,
  cursor = false,
  className = "",
}: {
  file: string;
  code: string;
  footer?: React.ReactNode;
  cursor?: boolean;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden rounded-xl border border-night-line bg-night-2/95 shadow-2xl shadow-black/50 backdrop-blur ${className}`}>
      <div className="flex items-center gap-2 border-b border-night-line px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 font-mono text-[11px] text-white/45">{file}</span>
      </div>
      <pre className="overflow-x-auto p-5 font-mono text-[12px] leading-relaxed text-white/70 sm:text-[13px]">
        <code>
          {code.split(/("[^"]*"|'[^']*'|\/\/.*)/g).map((part, i) =>
            /^["']/.test(part) ? (
              <span key={i} className="text-[#7ee787]">{part}</span>
            ) : part.startsWith("//") ? (
              <span key={i} className="text-white/35">{part}</span>
            ) : (
              <span key={i}>
                {part.split(/\b(const|let|export|return|true|false)\b/).map((w, j) =>
                  j % 2 ? (
                    <span key={j} className="text-accent-fg">{w}</span>
                  ) : (
                    w
                  ),
                )}
              </span>
            ),
          )}
          {cursor && <span className="animate-blink ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-accent" />}
        </code>
      </pre>
      {footer && <div className="flex items-center justify-between border-t border-night-line px-4 py-2.5 font-mono text-[11px] text-white/45">{footer}</div>}
    </div>
  );
}
