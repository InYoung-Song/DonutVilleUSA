import type { Metadata } from "next";
import { Phone } from "lucide-react";
import { getMenu, getSettings } from "@/db/queries";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { MenuBrowser } from "@/components/menu/MenuBrowser";
import { telHref } from "@/lib/format";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Browse Donutville U.S.A.'s hand-cut, New England–style donuts and fresh beverages, including our 100% Colombian Supremo coffee.",
};

export default async function MenuPage() {
  const [menu, settings] = await Promise.all([getMenu(), getSettings()]);
  const tel = telHref(settings.phone);

  return (
    <main>
      <section className="border-b border-cream-200 bg-cream-100 py-12">
        <Container>
          <h1 className="text-4xl font-bold text-cocoa">Our Menu</h1>
          <p className="mt-3 max-w-2xl text-lg text-cocoa-700">
            Hand-cut every morning the New England way, with fresh coffee on all
            day. Selection rotates — call ahead if you’re after something
            specific.
          </p>
          {settings.largeOrderPolicy && (
            <p className="mt-5 max-w-2xl rounded-xl bg-white/70 p-4 text-sm text-cocoa-700">
              {settings.largeOrderPolicy}
            </p>
          )}
          {tel && (
            <div className="mt-5">
              <ButtonLink href={tel}>
                <Phone className="h-4 w-4" aria-hidden="true" /> Call to order
              </ButtonLink>
            </div>
          )}
        </Container>
      </section>

      <Container className="py-12">
        <MenuBrowser menu={menu} />
      </Container>
    </main>
  );
}
