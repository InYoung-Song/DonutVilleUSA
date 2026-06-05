import { Phone, MapPin, Info } from "lucide-react";
import { Container } from "../ui/Container";
import { ButtonLink } from "../ui/ButtonLink";
import { OpenNowBadge } from "../OpenNowBadge";
import { HoursTable } from "../HoursTable";
import { AddressBlock } from "../AddressBlock";
import { MapEmbed } from "../MapEmbed";
import { telHref, directionsUrl } from "@/lib/format";
import { getShopNow, formatTime } from "@/lib/hours";
import type { SiteSettings, DayHours, SpecialHour } from "@/lib/content-types";

function upcomingSpecials(special: SpecialHour[]): SpecialHour[] {
  const today = getShopNow().dateStr;
  return special.filter((s) => s.date >= today).slice(0, 3);
}

function specialLine(s: SpecialHour): string {
  if (s.isClosed) return "Closed";
  const o = formatTime(s.openTime);
  const c = formatTime(s.closeTime);
  return o && c ? `${o} – ${c}` : "See hours";
}

export function VisitSection({
  settings,
  weekly,
  special,
}: {
  settings: SiteSettings;
  weekly: DayHours[];
  special: SpecialHour[];
}) {
  const tel = telHref(settings.phone);
  const specials = upcomingSpecials(special);

  return (
    <section id="visit" className="py-14 sm:py-16">
      <Container>
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold text-cocoa">Visit us</h2>
            <div className="mt-3">
              <OpenNowBadge weekly={weekly} special={special} />
            </div>

            <HoursTable weekly={weekly} className="mt-5 max-w-sm" />

            {specials.length > 0 && (
              <ul className="mt-4 space-y-1.5 text-sm">
                {specials.map((s) => (
                  <li key={s.id} className="flex items-start gap-2 text-cocoa-700">
                    <Info className="mt-0.5 h-4 w-4 shrink-0 text-berry" aria-hidden="true" />
                    <span>
                      <span className="font-semibold">{s.label || s.date}:</span>{" "}
                      {specialLine(s)}
                      {s.note ? ` — ${s.note}` : ""}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            {settings.largeOrderPolicy && (
              <p className="mt-5 max-w-md rounded-xl bg-cream-100 p-4 text-sm text-cocoa-700">
                {settings.largeOrderPolicy}
              </p>
            )}

            <AddressBlock settings={settings} className="mt-5 text-cocoa-700" />

            <div className="mt-5 flex flex-wrap gap-3">
              {tel && (
                <ButtonLink href={tel}>
                  <Phone className="h-4 w-4" aria-hidden="true" /> Call us
                </ButtonLink>
              )}
              <ButtonLink href={directionsUrl(settings)} variant="ghost">
                <MapPin className="h-4 w-4" aria-hidden="true" /> Get directions
              </ButtonLink>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-cream-200 shadow-sm">
            <MapEmbed
              src={settings.mapEmbedUrl}
              title={`Map to ${settings.businessName}`}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
