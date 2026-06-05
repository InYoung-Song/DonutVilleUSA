import { Container } from "../ui/Container";
import { ButtonLink } from "../ui/ButtonLink";
import { OpenNowBadge } from "../OpenNowBadge";
import { telHref } from "@/lib/format";
import type { SiteSettings, DayHours, SpecialHour } from "@/lib/content-types";

function HeroDonut({ fill, className }: { fill: string; className: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="#E8C9A0" />
      <circle cx="12" cy="12" r="11" fill={fill} fillOpacity="0.92" />
      <circle cx="12" cy="12" r="3.8" fill="#FFF8F0" />
      <g strokeWidth="1.3" strokeLinecap="round" opacity="0.9">
        <line x1="7" y1="8" x2="8.3" y2="9" stroke="#FFF8F0" />
        <line x1="15.4" y1="7.6" x2="16.2" y2="9" stroke="#4AA3DF" />
        <line x1="8" y1="15.4" x2="9" y2="16.3" stroke="#E8A33D" />
        <line x1="16" y1="15" x2="17" y2="16" stroke="#FFF8F0" />
        <line x1="12" y1="4.7" x2="12.6" y2="6" stroke="#1E3A5F" />
      </g>
    </svg>
  );
}

/** Decorative trio of frosted donuts for the hero — pure CSS/SVG, no assets. */
function HeroArt() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-sm" aria-hidden="true">
      <HeroDonut fill="#E23A5E" className="absolute left-2 top-0 w-40 rotate-[-8deg] drop-shadow-md sm:w-52" />
      <HeroDonut fill="#8A5A3C" className="absolute right-0 top-16 w-36 rotate-[10deg] drop-shadow-md sm:w-48" />
      <HeroDonut fill="#E8A33D" className="absolute bottom-0 left-10 w-32 rotate-[4deg] drop-shadow-md sm:w-40" />
    </div>
  );
}

export function Hero({
  settings,
  weekly,
  special,
}: {
  settings: SiteSettings;
  weekly: DayHours[];
  special: SpecialHour[];
}) {
  const tel = telHref(settings.phone);
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-cream to-cream-100">
      <Container className="grid items-center gap-10 py-14 lg:grid-cols-2 lg:py-20">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-berry">
            {settings.tagline}
          </p>
          <h1 className="mt-3 text-4xl font-bold leading-tight text-cocoa sm:text-5xl">
            {settings.heroTitle}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-cocoa-700">
            {settings.heroSubtitle}
          </p>
          {settings.homeIntro && (
            <p className="mt-3 max-w-xl text-cocoa-700">{settings.homeIntro}</p>
          )}
          <div className="mt-6">
            <OpenNowBadge weekly={weekly} special={special} />
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href="/menu">See the Menu</ButtonLink>
            {tel && (
              <ButtonLink href={tel} variant="ghost">
                Call {settings.phone}
              </ButtonLink>
            )}
          </div>
        </div>
        <HeroArt />
      </Container>
    </section>
  );
}
