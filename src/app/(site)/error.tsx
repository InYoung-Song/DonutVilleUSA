"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function SiteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Public page error:", error);
  }, [error]);

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <h1 className="text-3xl font-bold text-cocoa">Something went wrong</h1>
      <p className="mt-3 max-w-md text-cocoa-700">
        Sorry about that — please try again. If it keeps happening, give us a
        call and we’ll help you out.
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-full bg-berry px-5 py-2.5 text-sm font-semibold text-cream shadow-sm hover:bg-berry-600"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-full border border-cocoa/20 px-5 py-2.5 text-sm font-semibold text-cocoa hover:bg-cream-100"
        >
          Back home
        </Link>
      </div>
    </main>
  );
}
