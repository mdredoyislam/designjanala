import type { Metadata } from "next";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = { title: "Sign in" };

export default async function LoginPage({ searchParams }: PageProps<"/login">) {
  const next = (await searchParams).next;
  return (
    <div className="mx-auto max-w-sm py-16">
      <div className="panel p-8">
        <p className="eyebrow">[ Admin ]</p>
        <h1 className="h-display mt-3 text-3xl">Sign in</h1>
        <p className="mt-2 text-sm text-body">Manage leads and the website content.</p>
        <LoginForm next={typeof next === "string" ? next : undefined} />
      </div>
    </div>
  );
}
