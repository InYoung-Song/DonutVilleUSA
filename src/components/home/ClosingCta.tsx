import { Container } from "../ui/Container";
import { ButtonLink } from "../ui/ButtonLink";
import { telHref, directionsUrl, formatPhoneDisplay } from "@/lib/format";
import type { SiteSettings } from "@/lib/content-types";

export function ClosingCta({ settings }: { settings: SiteSettings }) {
  const tel = telHref(settings.phone);
  const phoneLabel = formatPhoneDisplay(settings.phone);
  return (
    <section className="bg-berry py-16 text-cream">
      <Container className="flex flex-col items-center text-center">
        <h2 className="text-3xl font-bold sm:text-4xl">Come get your fix</h2>
        <p className="mt-3 max-w-lg text-cream/90">
          Fresh donuts and real coffee, open early and late, just like since
          1966.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/menu" variant="light">
            View the menu
          </ButtonLink>
          {tel && (
            <ButtonLink href={tel} variant="light">
              Call {phoneLabel}
            </ButtonLink>
          )}
          <ButtonLink href={directionsUrl(settings)} variant="light">
            Get directions
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
