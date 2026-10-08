import ContactForm from "./ContactForm";
import { site } from "@/data/site";

export default function ContactSection({ as: Heading = "h2" }: { as?: "h1" | "h2" }) {
  return (
    <section id="contact" className="relative overflow-hidden bg-surface/60 py-20 lg:py-28">
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-[480px] w-[480px] rounded-full bg-accent/20 blur-[120px]" aria-hidden="true" />
      <div className="container-x relative grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <p className="eyebrow">[ Let&rsquo;s Talk ]</p>
          <Heading className="h-section mt-4">It&rsquo;s Time to Bring Your Idea Alive</Heading>
          <p className="lead mt-6 max-w-md">
            Connect with us to start your project, with full transparency and no hidden fees. Tell us what you&rsquo;re
            building and we&rsquo;ll plan the next steps together.
          </p>
          <div className="mt-10 space-y-1">
            <p className="font-mono text-xs tracking-[0.2em] text-muted uppercase">Prefer email?</p>
            <a href={`mailto:${site.emails.project}`} className="text-xl font-semibold underline decoration-accent/40 underline-offset-4 hover:decoration-accent">
              {site.emails.project}
            </a>
          </div>
          <p className="mt-10 max-w-md border-l-2 border-accent pl-5 text-body">
            Your ideas deserve more than prototypes. Partner with {site.name} and bring scalable, reliable and AI-enhanced
            products to life.
          </p>
        </div>
        <div className="rounded-xl border border-line bg-card p-7 shadow-sm sm:p-10 lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
