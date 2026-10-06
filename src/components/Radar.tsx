"use client";

import { motion } from "framer-motion";
import { industries } from "@/data/site";

const SIZE = 640;
const C = SIZE / 2;
const R = 200;
// Relative depth of experience per industry, matching the exact shape
const values = [1, 0.875, 0.75, 0.5, 1, 0.75, 0.75, 0.875];

const point = (i: number, r: number) => {
  const a = (Math.PI * 2 * i) / industries.length - Math.PI / 2;
  return [C + Math.cos(a) * r, C + Math.sin(a) * r] as const;
};

/** Animated high-tech HUD radar chart */
export default function Radar() {
  return (
    <div className="relative mx-auto w-full max-w-[640px]">
      <motion.svg 
        viewBox={`0 0 ${SIZE} ${SIZE}`} 
        className="w-full h-auto drop-shadow-2xl" 
        role="img" 
        aria-label={`Industries: ${industries.map((i) => i.title).join(", ")}`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Rotating Dashed Ring */}
        <motion.circle
          cx={C}
          cy={C}
          r={R * 1.15}
          fill="none"
          stroke="var(--accent)"
          strokeWidth={1}
          strokeDasharray="4 8"
          strokeOpacity={0.4}
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          style={{ originX: "50%", originY: "50%" }}
        />

        {/* Concentric circles scaling in */}
        {[0.25, 0.5, 0.75, 1].map((f, index) => (
          <motion.circle 
            key={f} 
            cx={C} 
            cy={C} 
            r={R * f} 
            fill="none" 
            stroke="rgb(255 255 255 / 0.15)" 
            strokeWidth={1}
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: { opacity: 1, scale: 1, transition: { delay: index * 0.1, duration: 0.8, ease: "easeOut" } }
            }}
          />
        ))}
        
        {/* Radial lines extending slightly past the outer circle */}
        {industries.map((_, i) => {
          const [x, y] = point(i, R + 16);
          return (
            <motion.line 
              key={i} 
              x1={C} y1={C} x2={x} y2={y} 
              stroke="rgb(255 255 255 / 0.15)" 
              strokeWidth={1} 
              variants={{
                hidden: { pathLength: 0, opacity: 0 },
                visible: { pathLength: 1, opacity: 1, transition: { delay: 0.4 + i * 0.05, duration: 0.6 } }
              }}
            />
          );
        })}

        {/* Small white dots at the ends of the radial lines (pulsing) */}
        {industries.map((_, i) => {
          const [x, y] = point(i, R + 16);
          return (
            <motion.circle 
              key={i} 
              cx={x} cy={y} 
              r={2.5} 
              fill="#ffffff"
              variants={{
                hidden: { scale: 0, opacity: 0 },
                visible: { scale: 1, opacity: 1, transition: { delay: 0.8 + i * 0.05, duration: 0.4 } }
              }}
            />
          );
        })}
        
        {/* Data Polygon filled with glowing accent color */}
        <motion.polygon
          points={industries.map((_, i) => point(i, R * values[i]).join(",")).join(" ")}
          fill="var(--accent)"
          stroke="var(--accent)"
          strokeWidth={1}
          filter="url(#glow)"
          style={{ opacity: 0.85 }}
          variants={{
            hidden: { scale: 0.5, opacity: 0 },
            visible: { scale: 1, opacity: 0.85, transition: { delay: 0.6, duration: 1, type: "spring", bounce: 0.3 } }
          }}
          style={{ originX: "50%", originY: "50%" }}
        />
        
        {/* Data Vertices (pulsing core dots) */}
        {industries.map((_, i) => {
          const [x, y] = point(i, R * values[i]);
          return (
            <motion.circle 
              key={i} 
              cx={x} cy={y} 
              r={4.5} 
              fill="var(--night)" 
              stroke="#ffffff" 
              strokeWidth={1.5} 
              variants={{
                hidden: { scale: 0 },
                visible: { scale: 1, transition: { delay: 1.2 + i * 0.05, type: "spring", stiffness: 300 } }
              }}
            />
          );
        })}
        
        {/* Labels */}
        {industries.map((ind, i) => {
          const [x, y] = point(i, R + 42);
          const anchor = Math.abs(x - C) < 4 ? "middle" : x > C ? "start" : "end";
          return (
            <motion.text
              key={ind.title}
              x={x}
              y={y}
              textAnchor={anchor}
              dominantBaseline="middle"
              fill="rgb(255 255 255 / 0.9)"
              fontSize={13}
              style={{ fontFamily: "var(--font-jetbrains)", textTransform: "uppercase", letterSpacing: "0.08em" }}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0, transition: { delay: 1 + i * 0.05, duration: 0.5 } }
              }}
            >
              [ {ind.title} ]
            </motion.text>
          );
        })}
      </motion.svg>

      {/* Decorative scanning line effect overlay */}
      <motion.div 
        className="absolute inset-0 pointer-events-none rounded-full overflow-hidden mix-blend-screen"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        style={{ width: R * 2, height: R * 2, top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
      >
        <motion.div 
          className="w-full h-[2px] bg-accent/40 blur-[1px]"
          animate={{ y: [0, R * 2, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
    </div>
  );
}
