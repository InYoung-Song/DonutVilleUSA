"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

const STORAGE_KEY = "dv-banner-dismissed";

/**
 * Dismissible announcement bar. `active` (date-window + enabled) is computed on
 * the server; this component only handles per-visitor dismissal, keyed by the
 * message text so a new announcement reappears.
 */
export function AnnouncementBanner({
  text,
  active,
}: {
  text: string;
  active: boolean;
}) {
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === text) setDismissed(true);
    } catch {
      /* localStorage unavailable — show the banner */
    }
  }, [text]);

  if (!active || !text.trim() || dismissed) return null;

  return (
    <div role="region" aria-label="Announcement" className="bg-berry text-cream">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2">
        <p className="flex-1 text-center text-sm font-semibold">{text}</p>
        <button
          type="button"
          aria-label="Dismiss announcement"
          onClick={() => {
            setDismissed(true);
            try {
              localStorage.setItem(STORAGE_KEY, text);
            } catch {
              /* ignore */
            }
          }}
          className="-mr-1 rounded-full p-1 text-cream/90 transition-colors hover:bg-white/20 hover:text-cream"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
