"use client";

import { useActionState } from "react";
import { subscribe, type SubscribeState } from "@/app/contact/actions";
import Reveal from "./Reveal";

const initial: SubscribeState = { status: "idle" };

/** "Stay in the loop" newsletter band with decorative circuit lines. */
export default function Newsletter() {
  const [state, action, pending] = useActionState(subscribe, initial);

  return (
    <section className="relative overflow-hidden bg-surface py-20 lg:py-28">
      <svg className="pointer-events-none absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 1200 400" aria-hidden="true">
        {[
          "M0 80 H300 L360 160 H520",
          "M0 320 H260 L320 240 H500",
          "M1200 60 H900 L840 150 H690",
          "M1200 340 H940 L880 250 H700",
        ].map((d, i) => (
          <path key={d} d={d} fill="none" stroke={i % 2 ? "#ffd000" : "#3a3a3a"} strokeWidth={1.5} />
        ))}
        {[
          [520, 160],
          [500, 240],
          [690, 150],
          [700, 250],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={5} fill="#ffd000" />
        ))}
      </svg>
      <Reveal className="container-x relative text-center">
        <h2 className="h-section">Stay in the Loop</h2>
        <p className="mx-auto mt-4 max-w-md text-body">
          Be the first to hear about our latest projects, design insights and studio updates.
        </p>
        {state.status === "success" ? (
          <p className="mt-8 font-medium text-accent-fg" role="status">
            {state.message}
          </p>
        ) : (
          <form action={action} className="mx-auto mt-8 flex max-w-md flex-col gap-2 sm:flex-row">
            <label className="sr-only" htmlFor="newsletter-email">
              Email
            </label>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              required
              placeholder="Your mail here"
              className="flex-1 rounded-md border border-line bg-card px-4 py-3 text-sm outline-none focus:border-accent"
            />
            <button type="submit" disabled={pending} className="btn-primary disabled:opacity-60">
              {pending ? "Sending" : "Subscribe"}
            </button>
          </form>
        )}
        {state.status === "error" && (
          <p className="mt-3 text-sm text-red-600" role="alert">
            {state.message}
          </p>
        )}
      </Reveal>
    </section>
  );
}
