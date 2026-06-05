import { SkipLink } from "@/components/SkipLink";
import { AnnouncementBanner } from "@/components/AnnouncementBanner";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { getSettings, getWeeklyHours, getSpecialHours } from "@/db/queries";
import { isBannerActive } from "@/lib/hours";
import { buildLocalBusinessJsonLd } from "@/lib/seo";

// Public content is owner-editable (read from D1 per request), so render
// dynamically rather than baking a static snapshot at build time.
export const dynamic = "force-dynamic";

export default async function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [settings, weekly, special] = await Promise.all([
    getSettings(),
    getWeeklyHours(),
    getSpecialHours(),
  ]);

  return (
    <>
      <JsonLd data={buildLocalBusinessJsonLd(settings, weekly)} />
      <SkipLink />
      <AnnouncementBanner
        text={settings.bannerText}
        active={isBannerActive(settings)}
      />
      <Header phone={settings.phone} weekly={weekly} special={special} />
      <div id="main-content" className="flex flex-1 flex-col">
        {children}
      </div>
      <Footer settings={settings} weekly={weekly} />
    </>
  );
}
