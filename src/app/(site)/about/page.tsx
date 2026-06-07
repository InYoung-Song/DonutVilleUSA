import type { Metadata } from "next";
import { Coffee, Donut, Users, Trophy } from "lucide-react";
import { getSettings } from "@/db/queries";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story of Donutville U.S.A., a family-owned Dearborn donut & coffee shop, hand-cutting New England–style donuts since July 4th, 1966.",
};

const KNOWN_FOR = [
  {
    Icon: Donut,
    title: "Hand-cut donuts",
    body: "Made the old-fashioned, New England way, fresh every single morning.",
  },
  {
    Icon: Coffee,
    title: "Colombian Supremo",
    body: "100% Colombian Supremo coffee, brewed all day from open to close.",
  },
  {
    Icon: Users,
    title: "Family owned",
    body: "Run by the same family since 1966, your neighborhood fix for generations.",
  },
];

const STORY_BEATS = [
  {
    label: "1966",
    title: "Opened on July 4th",
    body: "Donutville U.S.A. started in Dearborn on July 4th, 1966, and the name has carried that neighborhood pride ever since.",
  },
  {
    label: "Every morning",
    title: "Cut by hand",
    body: "The donuts are still made the old-fashioned, New England way: raised, cake, filled, coated, and ready for the day's regulars.",
  },
  {
    label: "Open to close",
    title: "Coffee stays on",
    body: "100% Colombian Supremo coffee keeps pace with the shop, from early stops to late-night dozen runs.",
  },
];

export default async function AboutPage() {
  const settings = await getSettings();

  return (
    <main>
      <section className="border-b border-cream-200 bg-cream-100 py-12">
        <Container>
          <p className="text-sm font-bold uppercase tracking-widest text-berry">
            {settings.tagline}
          </p>
          <h1 className="mt-3 text-4xl font-bold text-cocoa">Our Story</h1>
        </Container>
      </section>

      <Container className="py-12">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <p className="whitespace-pre-line text-lg leading-relaxed text-cocoa-700">
              {settings.aboutBody}
            </p>

            {settings.awardsText && (
              <div className="mt-8 flex items-start gap-3 rounded-2xl bg-cocoa p-5 text-cream">
                <Trophy
                  className="mt-0.5 h-6 w-6 shrink-0 text-caramel"
                  aria-hidden="true"
                />
                <p className="font-semibold">{settings.awardsText}</p>
              </div>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/menu">See the menu</ButtonLink>
              <ButtonLink href="/contact" variant="ghost">
                Find &amp; visit us
              </ButtonLink>
            </div>

            <div className="mt-10 border-t border-cream-200 pt-8">
              <h2 className="font-display text-2xl font-bold text-cocoa">
                Built around the daily stop
              </h2>
              <div className="mt-4 space-y-4 text-cocoa-700">
                <p>
                  Donutville is the kind of place people work into their day:
                  a dozen for the office, coffee before the drive, something
                  sweet after dinner, or a quick hello at the counter.
                </p>
                <p>
                  The shop keeps its identity close to the basics that made it
                  last: familiar flavors, patient craft, and a family-run pace
                  that still feels personal.
                </p>
              </div>
            </div>
          </div>

          <ul className="space-y-5">
            {KNOWN_FOR.map(({ Icon, title, body }) => (
              <li
                key={title}
                className="motion-card rounded-2xl border border-cream-200 bg-cream/70 p-5"
              >
                <Icon className="h-8 w-8 text-berry" aria-hidden="true" />
                <h2 className="mt-3 font-display text-lg font-semibold text-cocoa">
                  {title}
                </h2>
                <p className="mt-1 text-sm text-cocoa-700">{body}</p>
              </li>
            ))}
          </ul>
        </div>

        <section className="mt-14 border-t border-cream-200 pt-10">
          <h2 className="font-display text-2xl font-bold text-cocoa">
            Story notes
          </h2>
          <ul className="mt-5 grid gap-4 md:grid-cols-3">
            {STORY_BEATS.map((beat) => (
              <li
                key={beat.title}
                className="motion-card rounded-2xl border border-cream-200 bg-cream/70 p-5"
              >
                <p className="text-sm font-bold uppercase tracking-wide text-berry">
                  {beat.label}
                </p>
                <h3 className="mt-2 font-display text-lg font-semibold text-cocoa">
                  {beat.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-cocoa-700">
                  {beat.body}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </main>
  );
}
