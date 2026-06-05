import type { SiteSettings } from "./content-types";

type AddressParts = Pick<
  SiteSettings,
  "addressLine1" | "city" | "state" | "zip"
>;

/** "14829 Ford Rd., Dearborn, MI 48126" — skips blank parts. */
export function fullAddress(s: AddressParts): string {
  const cityState = [s.city, s.state].filter(Boolean).join(", ");
  const line2 = [cityState, s.zip].filter(Boolean).join(" ").trim();
  return [s.addressLine1, line2].filter(Boolean).join(", ");
}

/** Sanitized tel: href, or "" if there is no usable number. */
export function telHref(phone: string): string {
  const digits = (phone || "").replace(/[^\d+]/g, "");
  return digits ? `tel:${digits}` : "";
}

/** Google Maps directions link to the shop. */
export function directionsUrl(s: AddressParts): string {
  const dest = encodeURIComponent(fullAddress(s));
  return `https://www.google.com/maps/dir/?api=1&destination=${dest}`;
}

/**
 * Display an owner-entered price. Bare numbers get a "$"; anything with its own
 * formatting ("$6/dozen", "6 for $5") is shown as-is.
 */
export function formatPrice(price: string | null | undefined): string {
  const t = (price ?? "").trim();
  if (!t) return "";
  return /^[\d.]+$/.test(t) ? `$${t}` : t;
}
