import "server-only";
import { cookies } from "next/headers";
import { SESSION_COOKIE, authConfig, isValidSession } from "./session";

/** Server actions are public POST endpoints, so each one checks the session itself, not just the proxy. */
export async function assertSignedIn() {
  if (!authConfig().required) return;
  if (!(await isValidSession((await cookies()).get(SESSION_COOKIE)?.value))) throw new Error("Your session has ended. Sign in again.");
}
