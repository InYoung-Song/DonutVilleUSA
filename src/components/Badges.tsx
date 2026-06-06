import { Wifi, SquareParking, Accessibility, type LucideIcon } from "lucide-react";
import { BADGE_META } from "@/lib/badges";
import type { BadgeKey } from "@/lib/content-types";

/** Iconic two-disc Mastercard mark. */
function MastercardMark() {
  return (
    <svg viewBox="0 0 32 20" className="h-4 w-6" aria-hidden="true">
      <circle cx="12" cy="10" r="8" fill="#EB001B" />
      <circle cx="20" cy="10" r="8" fill="#F79E1B" fillOpacity="0.9" />
    </svg>
  );
}

const PAYMENT_TEXT: Partial<Record<BadgeKey, string>> = {
  visa: "text-[#1A1F71] italic",
  amex: "text-[#1F72CD]",
  discover: "text-[#E76F00]",
  cash: "text-green-700",
  applepay: "text-cocoa",
  googlepay: "text-cocoa",
};

function PaymentChip({ k }: { k: BadgeKey }) {
  const meta = BADGE_META[k];
  return (
    <span
      className="inline-flex h-7 items-center gap-1.5 rounded-md border border-cream-200 bg-white px-2.5 text-xs font-bold"
      aria-label={meta.label}
      title={meta.label}
    >
      {k === "mastercard" && <MastercardMark />}
      <span className={PAYMENT_TEXT[k] ?? "text-cocoa"}>{meta.label}</span>
    </span>
  );
}

const AMENITY_ICONS: Partial<Record<BadgeKey, LucideIcon>> = {
  wifi: Wifi,
  parking: SquareParking,
  wheelchair: Accessibility,
};

function AmenityChip({ k }: { k: BadgeKey }) {
  const meta = BADGE_META[k];
  const Icon = AMENITY_ICONS[k];
  return (
    <span className="inline-flex h-7 items-center gap-1.5 rounded-md bg-cream px-2.5 text-xs font-semibold text-cocoa-700">
      {Icon && <Icon className="h-4 w-4" aria-hidden="true" />}
      {meta.label}
    </span>
  );
}

export function PaymentBadges({ keys }: { keys: BadgeKey[] }) {
  const payment = keys.filter((k) => BADGE_META[k]?.kind === "payment");
  if (payment.length === 0) return null;
  return (
    <ul className="flex flex-wrap items-center gap-2">
      {payment.map((k) => (
        <li key={k}>
          <PaymentChip k={k} />
        </li>
      ))}
    </ul>
  );
}

export function AmenityBadges({ keys }: { keys: BadgeKey[] }) {
  const amenity = keys.filter((k) => BADGE_META[k]?.kind === "amenity");
  if (amenity.length === 0) return null;
  return (
    <ul className="flex flex-wrap items-center gap-2">
      {amenity.map((k) => (
        <li key={k}>
          <AmenityChip k={k} />
        </li>
      ))}
    </ul>
  );
}
