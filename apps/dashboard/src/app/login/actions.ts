"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, SESSION_MAX_AGE, authConfig, createSessionToken, credentialsMatch } from "@/lib/session";

export type LoginState = { error?: string };

/** Only same-site paths, so the login form can't be used to redirect elsewhere. */
const safeNext = (next: FormDataEntryValue | null) => {
  const path = typeof next === "string" ? next : "";
  return path.startsWith("/") && !path.startsWith("//") && !path.startsWith("/\\") ? path : "/";
};

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  if (!authConfig().password) return { error: "Sign-in isn't configured. Set DASHBOARD_PASSWORD for the dashboard and restart it." };
  if (!(await credentialsMatch(String(formData.get("email") ?? ""), String(formData.get("password") ?? "")))) {
    // A short pause makes guessing slower.
    await new Promise((r) => setTimeout(r, 600));
    return { error: "That email or password isn't right." };
  }
  (await cookies()).set(SESSION_COOKIE, await createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  redirect(safeNext(formData.get("next")));
}

export async function logout() {
  (await cookies()).delete(SESSION_COOKIE);
  redirect("/login");
}
