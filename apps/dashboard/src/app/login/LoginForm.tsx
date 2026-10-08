"use client";

import { useActionState } from "react";
import { login, type LoginState } from "./actions";

export function LoginForm({ next }: { next?: string }) {
  const [state, action, pending] = useActionState<LoginState, FormData>(login, {});
  return (
    <form action={action} className="mt-8 space-y-4">
      <input type="hidden" name="next" value={next ?? "/"} />
      <label className="block">
        <span className="text-sm text-body">Password</span>
        <input
          name="password"
          type="password"
          required
          autoFocus
          autoComplete="current-password"
          className="mt-1.5 w-full rounded-md border border-line bg-card px-3 py-2.5 outline-none focus:border-accent"
        />
      </label>
      {state.error && (
        <p role="alert" className="text-sm text-[#ff6b6b]">
          {state.error}
        </p>
      )}
      <button disabled={pending} className="btn-primary w-full">
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
