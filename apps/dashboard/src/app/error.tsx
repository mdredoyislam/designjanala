"use client";

export default function Error({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return (
    <div className="panel mx-auto max-w-lg p-8 text-center">
      <p className="eyebrow">[ Error ]</p>
      <h1 className="h-display mt-3 text-2xl">Couldn&apos;t load the dashboard</h1>
      {/* In production, server error messages are replaced by a digest; the full error is in the server logs. */}
      <p className="mt-3 text-sm text-body">
        {error.digest ? "The API may be down or misconfigured (check API_URL and API_TOKEN)." : error.message}
      </p>
      <button
        type="button"
        onClick={() => retry()}
        className="mt-6 rounded-md bg-accent px-4 py-2 font-mono text-xs font-semibold text-accent-ink uppercase hover:bg-accent-soft"
      >
        Try again
      </button>
    </div>
  );
}
