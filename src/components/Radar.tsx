import { industries } from "@/data/site";

const SIZE = 640;
const C = SIZE / 2;
const R = 200;
// Relative depth of experience per industry, purely decorative.
const values = [0.95, 0.7, 0.55, 0.85, 0.6, 0.65, 0.5, 0.9];

const point = (i: number, r: number) => {
  const a = (Math.PI * 2 * i) / industries.length - Math.PI / 2;
  return [C + Math.cos(a) * r, C + Math.sin(a) * r] as const;
};
const ring = (r: number) => industries.map((_, i) => point(i, r).join(",")).join(" ");

/** Octagonal radar chart of the industries we work in. */
export default function Radar() {
  return (
    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="mx-auto h-auto w-full max-w-[640px]" role="img" aria-label={`Industries: ${industries.map((i) => i.title).join(", ")}`}>
      {[0.25, 0.5, 0.75, 1].map((f) => (
        <polygon key={f} points={ring(R * f)} fill="none" stroke="rgb(255 255 255 / 0.12)" strokeWidth={1} />
      ))}
      {industries.map((_, i) => {
        const [x, y] = point(i, R);
        return <line key={i} x1={C} y1={C} x2={x} y2={y} stroke="rgb(255 255 255 / 0.12)" strokeWidth={1} />;
      })}
      <polygon
        points={industries.map((_, i) => point(i, R * values[i]).join(",")).join(" ")}
        fill="rgb(232 80 2 / 0.35)"
        stroke="#e85002"
        strokeWidth={2}
      />
      {industries.map((_, i) => {
        const [x, y] = point(i, R * values[i]);
        return <circle key={i} cx={x} cy={y} r={4} fill="#e85002" />;
      })}
      {industries.map((ind, i) => {
        const [x, y] = point(i, R + 34);
        const anchor = Math.abs(x - C) < 4 ? "middle" : x > C ? "start" : "end";
        return (
          <text
            key={ind.title}
            x={x}
            y={y}
            textAnchor={anchor}
            dominantBaseline="middle"
            fill="rgb(255 255 255 / 0.7)"
            fontSize={14}
            style={{ fontFamily: "var(--font-jetbrains)", textTransform: "uppercase", letterSpacing: "0.06em" }}
          >
            [ {ind.title} ]
          </text>
        );
      })}
    </svg>
  );
}
