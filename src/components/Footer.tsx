import Link from "next/link";
import { Phone, MapPin, Clock, ExternalLink } from "lucide-react";
import { Logo } from "./Logo";
import { AddressBlock } from "./AddressBlock";
import { PaymentBadges, AmenityBadges } from "./Badges";
import {
  YoutubeIcon,
  FacebookIcon,
  InstagramIcon,
  XIcon,
  TiktokIcon,
} from "./icons/brand";
import { NAV_LINKS } from "@/lib/nav";
import { telHref, directionsUrl } from "@/lib/format";
import { groupWeeklyHours } from "@/lib/hours";
import type { SiteSettings, DayHours, SocialLinks } from "@/lib/content-types";

type IconComp = React.ComponentType<{ className?: string }>;

const SOCIAL_ICONS: Record<keyof SocialLinks, IconComp> = {
  youtube: YoutubeIcon,
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  x: XIcon,
  tiktok: TiktokIcon,
  yelp: ExternalLink,
};

export function Footer({
  settings,
  weekly,
}: {
  settings: SiteSettings;
  weekly: DayHours[];
}) {
  const tel = telHref(settings.phone);
  const hoursLines = groupWeeklyHours(weekly);
  const year = new Date().getFullYear();

  const socials = (Object.entries(settings.social) as [keyof SocialLinks, string][])
    .filter(([, href]) => !!href)
    .map(([key, href]) => ({ key, href, Icon: SOCIAL_ICONS[key] ?? ExternalLink }));

  const hasBadges = settings.badges.length > 0;

  return (
    <footer className="mt-16 border-t border-cream-200 bg-cream-100 text-cocoa-700">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand + social */}
        <div className="space-y-4">
          <Logo />
          <p className="text-sm">{settings.tagline}</p>
          {socials.length > 0 && (
            <ul className="flex gap-3">
              {socials.map(({ key, href, Icon }) => (
                <li key={key}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Donutville on ${key}`}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-cream text-cocoa-700 transition-colors hover:bg-berry hover:text-cream"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Quick links */}
        <nav aria-label="Footer" className="space-y-3">
          <h2 className="font-display text-sm font-bold uppercase tracking-wide text-cocoa">
            Explore
          </h2>
          <ul className="space-y-2 text-sm">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-berry">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Hours */}
        <div className="space-y-3">
          <h2 className="flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wide text-cocoa">
            <Clock className="h-4 w-4" aria-hidden="true" /> Hours
          </h2>
          <ul className="space-y-1 text-sm">
            {hoursLines.map((line, i) => (
              <li key={i} className="flex justify-between gap-4">
                <span className="font-semibold">{line.days}</span>
                <span>{line.hours}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Visit */}
        <div className="space-y-3">
          <h2 className="flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wide text-cocoa">
            <MapPin className="h-4 w-4" aria-hidden="true" /> Visit
          </h2>
          <AddressBlock settings={settings} className="text-sm" />
          <a
            href={directionsUrl(settings)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm font-semibold text-berry hover:underline"
          >
            Get directions →
          </a>
          {tel && (
            <p className="text-sm">
              <a href={tel} className="inline-flex items-center gap-2 hover:text-berry">
                <Phone className="h-4 w-4" aria-hidden="true" /> {settings.phone}
              </a>
            </p>
          )}
        </div>
      </div>

      {/* Payment + amenity badges */}
      {hasBadges && (
        <div className="border-t border-cream-200">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-3 px-4 py-4">
            <PaymentBadges keys={settings.badges} />
            <AmenityBadges keys={settings.badges} />
          </div>
        </div>
      )}

      <div className="border-t border-cream-200">
        <p className="mx-auto max-w-6xl px-4 py-4 text-center text-xs text-cocoa-500">
          © {year} {settings.businessName}. Family owned &amp; operated since
          1966.
        </p>
      </div>
    </footer>
  );
}
