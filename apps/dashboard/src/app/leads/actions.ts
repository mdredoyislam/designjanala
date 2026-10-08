"use server";

import { revalidatePath } from "next/cache";
import { leadUpdateSchema } from "@designjanala/shared";
import { setLeadStatus } from "@/lib/api";
import { assertSignedIn } from "@/lib/auth";

export async function updateStatus(formData: FormData) {
  await assertSignedIn();
  const id = String(formData.get("id") ?? "");
  const parsed = leadUpdateSchema.safeParse({ status: formData.get("status") });
  if (!id || !parsed.success) return;
  await setLeadStatus(id, parsed.data.status);
  revalidatePath("/leads");
  revalidatePath("/");
}
