import type { BadgeKey } from "./content-types";

export interface BadgeMeta {
  key: BadgeKey;
  label: string;
  kind: "payment" | "amenity";
}

/** Display metadata for every payment/amenity badge the owner can toggle. */
export const BADGE_META: Record<BadgeKey, BadgeMeta> = {
  visa: { key: "visa", label: "Visa", kind: "payment" },
  mastercard: { key: "mastercard", label: "Mastercard", kind: "payment" },
  amex: { key: "amex", label: "American Express", kind: "payment" },
  discover: { key: "discover", label: "Discover", kind: "payment" },
  applepay: { key: "applepay", label: "Apple Pay", kind: "payment" },
  googlepay: { key: "googlepay", label: "Google Pay", kind: "payment" },
  cash: { key: "cash", label: "Cash", kind: "payment" },
  wifi: { key: "wifi", label: "Free Wi-Fi", kind: "amenity" },
  parking: { key: "parking", label: "Parking", kind: "amenity" },
  wheelchair: {
    key: "wheelchair",
    label: "Wheelchair Accessible",
    kind: "amenity",
  },
};

export const ALL_BADGE_KEYS = Object.keys(BADGE_META) as BadgeKey[];

/** Keep only known keys, preserving the owner's order. */
export function normalizeBadges(keys: BadgeKey[]): BadgeMeta[] {
  return keys.filter((k) => k in BADGE_META).map((k) => BADGE_META[k]);
}
