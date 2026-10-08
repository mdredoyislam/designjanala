import { describe, expect, it } from "vitest";
import { fieldErrors, leadInputSchema } from "./leads";

describe("leadInputSchema", () => {
  it("accepts a valid lead and fills optional fields", () => {
    const lead = leadInputSchema.parse({ name: "Ada", email: "ada@example.com", details: "We need a new SaaS dashboard." });
    expect(lead.company).toBe("");
  });

  it("reports one message per invalid field", () => {
    const result = leadInputSchema.safeParse({ name: "A", email: "nope", details: "short" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(fieldErrors(result.error)).toEqual({
        name: "Please enter your name.",
        email: "Please enter a valid email.",
        details: "Tell us a little more about your project.",
      });
    }
  });
});
