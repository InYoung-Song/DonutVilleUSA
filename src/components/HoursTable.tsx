import { groupWeeklyHours } from "@/lib/hours";
import type { DayHours } from "@/lib/content-types";

/** Compact weekly hours list (grouped consecutive same-hours days). */
export function HoursTable({
  weekly,
  className = "",
}: {
  weekly: DayHours[];
  className?: string;
}) {
  const lines = groupWeeklyHours(weekly);
  if (lines.length === 0) {
    return <p className={className}>Call us for today’s hours.</p>;
  }
  return (
    <ul className={className}>
      {lines.map((line, i) => (
        <li
          key={i}
          className="flex justify-between gap-6 border-b border-cream-200 py-2 last:border-0"
        >
          <span className="font-semibold text-cocoa">{line.days}</span>
          <span className="text-cocoa-700">{line.hours}</span>
        </li>
      ))}
    </ul>
  );
}
