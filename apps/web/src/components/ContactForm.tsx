"use client";

import { useActionState } from "react";
import { submitContact, type ContactState } from "@/app/contact/actions";

const budgets = ["< $500", "$500 – $1,500", "$1,500 – $5,000", "$5,000+", "Not sure yet"];
const initial: ContactState = { status: "idle" };

const field =
  "w-full border-0 border-b border-steel bg-transparent px-0 py-3 text-lg outline-none transition-colors placeholder:text-ink/30 focus:border-accent focus:ring-0";

/** `services` fills the service dropdown (titles from the content). */
export default function ContactForm({ services }: { services: string[] }) {
  const [state, action, pending] = useActionState(submitContact, initial);

  if (state.status === "success") {
    return (
      <div className="p-4 sm:p-8" role="status">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-xl text-accent-ink">✓</span>
        <h3 className="h-display mt-6 text-3xl">Message sent</h3>
        <p className="mt-3 text-muted">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={action} className="grid gap-8 sm:grid-cols-2" noValidate>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <Field label="Full name *" error={state.errors?.name}>
        <input name="name" required autoComplete="name" placeholder="Jane Doe" className={field} />
      </Field>
      <Field label="Company">
        <input name="company" autoComplete="organization" placeholder="Acme Inc." className={field} />
      </Field>
      <Field label="Email *" error={state.errors?.email}>
        <input name="email" type="email" required autoComplete="email" placeholder="you@company.com" className={field} />
      </Field>
      <Field label="Service">
        <select name="service" defaultValue="" className={field}>
          <option value="" disabled className="bg-surface">Select a service</option>
          {services.map((s) => (
            <option key={s} className="bg-surface">{s}</option>
          ))}
          <option className="bg-surface">Other</option>
        </select>
      </Field>

      <fieldset className="sm:col-span-2">
        <legend className="text-base font-semibold text-ink">Budget</legend>
        <div className="mt-4 flex flex-wrap gap-2">
          {budgets.map((b) => (
            <label key={b} className="cursor-pointer">
              <input type="radio" name="budget" value={b} className="peer sr-only" />
              <span className="block rounded-full border border-line px-4 py-2 text-sm transition-colors peer-checked:border-accent peer-checked:bg-accent peer-checked:text-accent-ink peer-focus-visible:ring-2 peer-focus-visible:ring-accent hover:border-steel">
                {b}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <Field label="Project details *" error={state.errors?.details} className="sm:col-span-2">
        <textarea name="details" required rows={4} placeholder="Tell us about your project, goals and timeline…" className={`${field} resize-none`} />
      </Field>

      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center">
        <button type="submit" disabled={pending} className="btn-primary w-full disabled:opacity-60 sm:w-auto">
          {pending ? "Sending…" : "Submit"}
        </button>
        {state.status === "error" && state.message && (
          <p className="text-sm text-red-400" role="alert">{state.message}</p>
        )}
      </div>
    </form>
  );
}

function Field({ label, error, className = "", children }: { label: string; error?: string; className?: string; children: React.ReactNode }) {
  return (
    <label className={`block ${className}`}>
      <span className="text-base font-semibold text-ink">{label}</span>
      {children}
      {error && <span className="mt-2 block text-sm text-red-400">{error}</span>}
    </label>
  );
}
