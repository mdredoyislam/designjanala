import { z } from "zod";

/** Where a lead is in the sales pipeline. The dashboard moves leads through these in order. */
export const leadStatuses = ["new", "contacted", "proposal", "won", "lost"] as const;
export type LeadStatus = (typeof leadStatuses)[number];

/** What the website's contact form sends. Shared by the web form, the API and the dashboard. */
export const leadInputSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.string().trim().pipe(z.email("Please enter a valid email.")),
  company: z.string().trim().max(200).optional().default(""),
  service: z.string().trim().max(200).optional().default(""),
  budget: z.string().trim().max(100).optional().default(""),
  details: z.string().trim().min(10, "Tell us a little more about your project.").max(5000),
});
export type LeadInput = z.input<typeof leadInputSchema>;

export const leadSchema = leadInputSchema.extend({
  id: z.string(),
  status: z.enum(leadStatuses),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type Lead = z.infer<typeof leadSchema>;

export const leadUpdateSchema = z.object({ status: z.enum(leadStatuses) });
export type LeadUpdate = z.infer<typeof leadUpdateSchema>;

export type LeadStats = {
  total: number;
  byStatus: Record<LeadStatus, number>;
  last7Days: number;
};

/** Field-level error messages keyed by input name, for showing under form fields. */
export function fieldErrors(error: z.ZodError): Partial<Record<keyof LeadInput, string>> {
  const out: Partial<Record<keyof LeadInput, string>> = {};
  for (const issue of error.issues) {
    const key = issue.path[0] as keyof LeadInput;
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}
