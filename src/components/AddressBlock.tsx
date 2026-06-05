import type { SiteSettings } from "@/lib/content-types";

/** Semantic address block, reused in the footer and contact page. */
export function AddressBlock({
  settings,
  className = "",
}: {
  settings: Pick<SiteSettings, "addressLine1" | "city" | "state" | "zip">;
  className?: string;
}) {
  const { addressLine1, city, state, zip } = settings;
  const cityLine = [`${city}, ${state}`.replace(/^, |, $/g, ""), zip]
    .filter(Boolean)
    .join(" ")
    .trim();

  if (!addressLine1 && !cityLine) return null;

  return (
    <address className={`not-italic leading-relaxed ${className}`}>
      {addressLine1 && <div>{addressLine1}</div>}
      {cityLine && <div>{cityLine}</div>}
    </address>
  );
}
