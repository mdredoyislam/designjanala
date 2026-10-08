"use server";

import { site } from "@/data/site";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<"name" | "email" | "details", string>>;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Honeypot: real users never fill this hidden field.
  if (formData.get("website")) return { status: "success", message: "Thanks! We'll be in touch soon." };

  const data = {
    name: String(formData.get("name") ?? "").trim(),
    company: String(formData.get("company") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    service: String(formData.get("service") ?? "").trim(),
    budget: String(formData.get("budget") ?? "").trim(),
    details: String(formData.get("details") ?? "").trim(),
  };

  const errors: ContactState["errors"] = {};
  if (data.name.length < 2) errors.name = "Please enter your name.";
  if (!EMAIL_RE.test(data.email)) errors.email = "Please enter a valid email.";
  if (data.details.length < 10) errors.details = "Tell us a little more about your project.";
  if (Object.keys(errors).length) return { status: "error", errors, message: "Please fix the highlighted fields." };

  // Delivery: API_URL stores the lead for the dashboard (apps/api); CONTACT_WEBHOOK_URL
  // (Slack/Zapier/Make/Formspree, etc.) notifies the team. Either or both may be set.
  const api = process.env.API_URL;
  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (api) {
    try {
      const res = await fetch(`${api}/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`API responded ${res.status}`);
    } catch (err) {
      console.error("Saving lead to API failed", err);
      return { status: "error", message: `Something went wrong. Please email us at ${site.emails.project}.` };
    }
  }
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source: "designjanala.com", submittedAt: new Date().toISOString() }),
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    } catch (err) {
      console.error("Contact webhook failed", err);
      return { status: "error", message: `Something went wrong. Please email us at ${site.emails.project}.` };
    }
  } else if (api) {
    // Stored by the API; no notification webhook configured.
  } else if (process.env.NODE_ENV === "production") {
    console.error("Neither API_URL nor CONTACT_WEBHOOK_URL is set; contact submission was not delivered.");
    return { status: "error", message: `The form isn't connected yet. Please email us at ${site.emails.project}.` };
  } else {
    console.info("[contact] (dev, not delivered)", data);
  }

  return { status: "success", message: "Thanks! We've received your brief and will reply within one business day." };
}

export type SubscribeState = { status: "idle" | "success" | "error"; message?: string };

/** Newsletter sign-up from the blog. Posts to the same webhook as the contact form, tagged as "newsletter". */
export async function subscribe(_prev: SubscribeState, formData: FormData): Promise<SubscribeState> {
  const email = String(formData.get("email") ?? "").trim();
  if (!EMAIL_RE.test(email)) return { status: "error", message: "Please enter a valid email." };

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "newsletter", email, source: "designjanala.com", submittedAt: new Date().toISOString() }),
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    } catch (err) {
      console.error("Newsletter webhook failed", err);
      return { status: "error", message: "Something went wrong. Please try again later." };
    }
  } else if (process.env.NODE_ENV === "production") {
    console.error("CONTACT_WEBHOOK_URL is not set; newsletter sign-up was not delivered.");
    return { status: "error", message: "Sign-ups aren't open yet. Please check back soon." };
  } else {
    console.info("[newsletter] (dev, not delivered)", email);
  }

  return { status: "success", message: "You're subscribed. Thanks for reading!" };
}
