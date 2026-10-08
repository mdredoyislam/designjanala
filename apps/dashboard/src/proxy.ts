import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, authConfig, isValidSession } from "@/lib/session";

/** Every dashboard page and server action requires sign-in (when DASHBOARD_PASSWORD is set). */
export async function proxy(request: NextRequest) {
  if (!authConfig().required) return NextResponse.next();
  if (await isValidSession(request.cookies.get(SESSION_COOKIE)?.value)) return NextResponse.next();

  const login = new URL("/login", request.url);
  const next = request.nextUrl.pathname + request.nextUrl.search;
  if (next !== "/") login.searchParams.set("next", next);
  return NextResponse.redirect(login);
}

export const config = {
  // Everything except the sign-in page, Next internals and public files.
  matcher: ["/((?!login|_next/static|_next/image|favicon.png|images/).*)"],
};
