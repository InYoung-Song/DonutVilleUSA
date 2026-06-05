import { parseTime } from "./hours";
import { fullAddress } from "./format";
import type { SiteSettings, DayHours } from "./content-types";

export const SITE_URL = "https://donutvilleusa.com";

const SCHEMA_DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

/**
 * schema.org LocalBusiness (Bakery + Coffee Shop) structured data, built from
 * live settings + hours. Only valid open ranges become OpeningHoursSpecification
 * entries so search engines never see malformed hours.
 */
export function buildLocalBusinessJsonLd(
  settings: SiteSettings,
  weekly: DayHours[],
): Record<string, unknown> {
  const openingHoursSpecification = weekly
    .filter((d) => {
      if (d.isClosed) return false;
      const o = parseTime(d.openTime);
      const c = parseTime(d.closeTime);
      return o != null && c != null && c > o;
    })
    .map((d) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: `https://schema.org/${SCHEMA_DAYS[d.dayOfWeek]}`,
      opens: d.openTime,
      closes: d.closeTime,
    }));

  const sameAs = Object.values(settings.social).filter(Boolean) as string[];

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": ["Bakery", "CafeOrCoffeeShop"],
    name: settings.businessName,
    slogan: settings.tagline,
    url: SITE_URL,
    telephone: settings.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.addressLine1,
      addressLocality: settings.city,
      addressRegion: settings.state,
      postalCode: settings.zip,
      addressCountry: "US",
    },
    servesCuisine: ["Donuts", "Coffee"],
  };

  if (settings.email) data.email = settings.email;
  if (openingHoursSpecification.length) {
    data.openingHoursSpecification = openingHoursSpecification;
  }
  if (sameAs.length) data.sameAs = sameAs;
  if (settings.mapEmbedUrl) data.hasMap = settings.mapEmbedUrl;
  data.description = `${settings.businessName} — ${fullAddress(settings)}`;

  return data;
}
