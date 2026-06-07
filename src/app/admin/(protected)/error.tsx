"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Admin error:", error);
  }, [error]);

  return (
    <div className="rounded-2xl border border-berry/20 bg-berry-100 p-6">
      <h1 className="text-xl font-bold text-cocoa">Something went wrong</h1>
      <p className="mt-2 text-cocoa-700">
        That action didn’t go through. Your changes weren’t lost. Please try
        again.
      </p>
      <div className="mt-4 flex gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-full bg-berry px-4 py-2 text-sm font-semibold text-cream hover:bg-berry-600"
        >
          Try again
        </button>
        <Link
          href="/admin"
          className="rounded-full border border-cocoa/20 px-4 py-2 text-sm font-semibold text-cocoa hover:bg-cream-100"
        >
          Dashboard
        </Link>
      </div>
    </div>
  );
}
