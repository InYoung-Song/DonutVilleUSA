import type { Metadata } from "next";
import { Coffee, Donut, Users, Trophy } from "lucide-react";
import { getSettings } from "@/db/queries";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story of Donutville U.S.A. — a family-owned Dearborn donut & coffee shop, hand-cutting New England–style donuts since July 4th, 1966.",
};

const KNOWN_FOR = [
  {
    Icon: Donut,
    title: "Hand-cut donuts",
    body: "Made the old-fashioned, New England way — fresh every single morning.",
  },
  {
    Icon: Coffee,
    title: "Colombian Supremo",
    body: "100% Colombian Supremo coffee, brewed all day from open to close.",
  },
  {
    Icon: Users,
    title: "Family owned",
    body: "Run by the same family since 1966 — your neighborhood fix for generations.",
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
          </div>

          <ul className="space-y-5">
            {KNOWN_FOR.map(({ Icon, title, body }) => (
              <li
                key={title}
                className="rounded-2xl border border-cream-200 bg-white/60 p-5"
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
      </Container>
    </main>
  );
}
