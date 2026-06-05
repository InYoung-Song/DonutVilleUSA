"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { getOpenStatus, type OpenStatus } from "@/lib/hours";
import type { DayHours, SpecialHour } from "@/lib/content-types";

/**
 * Live "Open now / Closed" pill, computed in the shop's timezone on the client
 * and refreshed every minute. Renders a neutral, no-JS-safe state until mounted
 * to avoid hydration mismatches.
 */
export function OpenNowBadge({
  weekly,
  special,
  className = "",
}: {
  weekly: DayHours[];
  special: SpecialHour[];
  className?: string;
}) {
  const [status, setStatus] = useState<OpenStatus | null>(null);

  useEffect(() => {
    const update = () => setStatus(getOpenStatus(weekly, special));
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, [weekly, special]);

  if (!status) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 text-sm text-cocoa-500 ${className}`}
      >
        <Clock className="h-4 w-4" aria-hidden="true" />
        See hours
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 text-sm ${className}`}
      role="status"
    >
      <span
        className={`h-2.5 w-2.5 rounded-full ${
          status.open ? "bg-green-600" : "bg-berry"
        }`}
        aria-hidden="true"
      />
      <span className="font-semibold text-cocoa">{status.label}</span>
      <span className="text-cocoa-500">· {status.detail}</span>
    </span>
  );
}
