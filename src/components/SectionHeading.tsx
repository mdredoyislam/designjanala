import type { ReactNode } from "react";
import Reveal from "./Reveal";

/**
 * "[ EYEBROW ]" + uppercase heading. With `aside`, the heading sits left and the aside
 * (usually a short paragraph) right, as on most DevMonks sections.
 */
export default function SectionHeading({
  eyebrow,
  title,
  aside,
  center = false,
  dark = false,
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  aside?: ReactNode;
  center?: boolean;
  dark?: boolean;
  className?: string;
}) {
  const heading = (
    <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}>
      {eyebrow && <p className="eyebrow">[ {eyebrow} ]</p>}
      <h2 className={`h-section ${eyebrow ? "mt-4" : ""}`}>{title}</h2>
    </div>
  );

  return (
    <Reveal className={className}>
      {aside ? (
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">{heading}</div>
          <div className={`text-[15px] leading-relaxed lg:col-span-4 lg:col-start-9 ${dark ? "text-white/65" : "text-body"}`}>{aside}</div>
        </div>
      ) : (
        heading
      )}
    </Reveal>
  );
}
