// Dashboard sign-in: a signed, expiring cookie. Uses Web Crypto so it runs in the proxy and in server code alike.

export const SESSION_COOKIE = "dj_session";
export const SESSION_MAX_AGE = 7 * 24 * 60 * 60; // seconds

const enc = new TextEncoder();

const toBase64Url = (buf: ArrayBuffer) => btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

async function sign(secret: string, data: string) {
  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return toBase64Url(await crypto.subtle.sign("HMAC", key, enc.encode(data)));
}

/** Compares in time that doesn't depend on where the strings differ. */
function safeEqual(a: string, b: string) {
  let diff = a.length ^ b.length;
  for (let i = 0; i < Math.max(a.length, b.length); i++) diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  return diff === 0;
}

/**
 * Sign-in is enabled by DASHBOARD_PASSWORD. Without it the dashboard is open in development
 * and locked in production (it edits the live website).
 */
export function authConfig() {
  const password = process.env.DASHBOARD_PASSWORD || undefined;
  return {
    password,
    secret: process.env.SESSION_SECRET || password,
    required: Boolean(password) || process.env.NODE_ENV === "production",
  };
}

export async function passwordMatches(given: string) {
  const { password } = authConfig();
  if (!password) return false;
  // Compare fixed-length digests so the comparison doesn't leak the password length.
  return safeEqual(await sign("password-check", given), await sign("password-check", password));
}

export async function createSessionToken(now = Date.now()) {
  const { secret } = authConfig();
  if (!secret) throw new Error("DASHBOARD_PASSWORD is not set.");
  const expires = String(now + SESSION_MAX_AGE * 1000);
  return `${expires}.${await sign(secret, expires)}`;
}

export async function isValidSession(token: string | undefined, now = Date.now()) {
  const { secret } = authConfig();
  if (!token || !secret) return false;
  const [expires, signature] = token.split(".");
  if (!expires || !signature || !(Number(expires) > now)) return false;
  return safeEqual(signature, await sign(secret, expires));
}
