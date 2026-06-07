"use client";

import { useState, useSyncExternalStore } from "react";
import { X } from "lucide-react";

const STORAGE_KEY = "dv-banner-dismissed";

/** Read the persisted dismissal without an effect (SSR-safe, no hydration jank). */
function usePersistedDismissal(text: string): boolean {
  return useSyncExternalStore(
    () => () => {}, // no live subscription needed
    () => {
      try {
        return localStorage.getItem(STORAGE_KEY) === text;
      } catch {
        return false;
      }
    },
    () => false, // server snapshot: assume not dismissed
  );
}

/**
 * Dismissible announcement bar. `active` (enabled + within date window) is
 * computed on the server; dismissal is per-visitor, keyed by message text so a
 * new announcement reappears.
 */
export function AnnouncementBanner({
  text,
  active,
}: {
  text: string;
  active: boolean;
}) {
  const persistedDismissed = usePersistedDismissal(text);
  const [clickedDismissed, setClickedDismissed] = useState(false);

  if (!active || !text.trim() || persistedDismissed || clickedDismissed) {
    return null;
  }

  return (
    <div role="region" aria-label="Announcement" className="bg-berry text-cream">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2">
        <p className="flex-1 text-center text-sm font-semibold">{text}</p>
        <button
          type="button"
          aria-label="Dismiss announcement"
          onClick={() => {
            setClickedDismissed(true);
            try {
              localStorage.setItem(STORAGE_KEY, text);
            } catch {
              /* ignore */
            }
          }}
          className="-mr-1 rounded-full p-1 text-cream transition-colors hover:bg-white/20"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
