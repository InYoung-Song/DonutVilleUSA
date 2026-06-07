import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, Info } from "lucide-react";
import { getSettings, getWeeklyHours, getSpecialHours } from "@/db/queries";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { AddressBlock } from "@/components/AddressBlock";
import { HoursTable } from "@/components/HoursTable";
import { MapEmbed } from "@/components/MapEmbed";
import { OpenNowBadge } from "@/components/OpenNowBadge";
import { ContactForm } from "@/components/contact/ContactForm";
import { telHref, directionsUrl, formatPhoneDisplay } from "@/lib/format";
import { getShopNow, formatTime } from "@/lib/hours";

export const metadata: Metadata = {
  title: "Contact & Hours",
  description:
    "Find Donutville U.S.A. in Dearborn, Michigan: address, phone, hours, and directions. Open daily.",
};

export default async function ContactPage() {
  const [settings, weekly, special] = await Promise.all([
    getSettings(),
    getWeeklyHours(),
    getSpecialHours(),
  ]);

  const tel = telHref(settings.phone);
  const phoneLabel = formatPhoneDisplay(settings.phone);
  const today = getShopNow().dateStr;
  const upcoming = special.filter((s) => s.date >= today).slice(0, 4);

  return (
    <main>
      <section className="border-b border-cream-200 bg-cream-100 py-12">
        <Container>
          <h1 className="text-4xl font-bold text-cocoa">Find us</h1>
          <p className="mt-3 max-w-2xl text-lg text-cocoa-700">
            Stop in, call ahead, or get directions. We’re easy to find on Ford
            Road in Dearborn.
          </p>
        </Container>
      </section>

      <Container className="py-12">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-8">
            {/* Address + contact */}
            <div>
              <h2 className="flex items-center gap-2 font-display text-xl font-bold text-cocoa">
                <MapPin className="h-5 w-5 text-berry" aria-hidden="true" />
                Address
              </h2>
              <AddressBlock settings={settings} className="mt-2 text-cocoa-700" />
              <div className="mt-4 flex flex-wrap gap-3">
                {tel && (
                  <ButtonLink href={tel}>
                    <Phone className="h-4 w-4" aria-hidden="true" /> Call us
                  </ButtonLink>
                )}
                <ButtonLink href={directionsUrl(settings)} variant="ghost">
                  <MapPin className="h-4 w-4" aria-hidden="true" /> Directions
                </ButtonLink>
              </div>
              <ul className="mt-4 space-y-2 text-cocoa-700">
                {tel && (
                  <li>
                    <a
                      href={tel}
                      className="inline-flex items-center gap-2 hover:text-berry"
                    >
                      <Phone className="h-4 w-4" aria-hidden="true" />
                      {phoneLabel}
                    </a>
                  </li>
                )}
                {settings.email && (
                  <li>
                    <a
                      href={`mailto:${settings.email}`}
                      className="inline-flex items-center gap-2 hover:text-berry"
                    >
                      <Mail className="h-4 w-4" aria-hidden="true" />
                      {settings.email}
                    </a>
                  </li>
                )}
              </ul>
            </div>

            <ContactForm />

            {/* Hours */}
            <div>
              <h2 className="flex items-center gap-2 font-display text-xl font-bold text-cocoa">
                <Clock className="h-5 w-5 text-berry" aria-hidden="true" />
                Hours
              </h2>
              <div className="mt-2">
                <OpenNowBadge weekly={weekly} special={special} />
              </div>
              <HoursTable weekly={weekly} className="mt-3 max-w-sm" />

              {upcoming.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-cocoa-500">
                    Holiday &amp; special hours
                  </h3>
                  <ul className="mt-2 space-y-1.5 text-sm">
                    {upcoming.map((s) => (
                      <li
                        key={s.id}
                        className="flex items-start gap-2 text-cocoa-700"
                      >
                        <Info
                          className="mt-0.5 h-4 w-4 shrink-0 text-berry"
                          aria-hidden="true"
                        />
                        <span>
                          <span className="font-semibold">
                            {s.label || s.date}:
                          </span>{" "}
                          {s.isClosed
                            ? "Closed"
                            : `${formatTime(s.openTime)} – ${formatTime(s.closeTime)}`}
                          {s.note ? `, ${s.note}` : ""}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {settings.largeOrderPolicy && (
              <p className="rounded-xl bg-cream-100 p-4 text-sm text-cocoa-700">
                {settings.largeOrderPolicy}
              </p>
            )}
          </div>

          {/* Map */}
          <div className="motion-card min-h-[360px] overflow-hidden rounded-2xl border border-cream-200 shadow-sm">
            <MapEmbed
              src={settings.mapEmbedUrl}
              title={`Map to ${settings.businessName}`}
            />
          </div>
        </div>
      </Container>
    </main>
  );
}
