import {
  getSettings,
  getWeeklyHours,
  getSpecialHours,
  getMenu,
  getFeatured,
} from "@/db/queries";
import { Hero } from "@/components/home/Hero";
import { AwardsStrip } from "@/components/home/AwardsStrip";
import { MenuHighlights } from "@/components/home/MenuHighlights";
import { FeaturedStrip } from "@/components/home/FeaturedStrip";
import { VideoSection } from "@/components/home/VideoSection";
import { VisitSection } from "@/components/home/VisitSection";
import { ClosingCta } from "@/components/home/ClosingCta";

export default async function Home() {
  const [settings, weekly, special, menu, featured] = await Promise.all([
    getSettings(),
    getWeeklyHours(),
    getSpecialHours(),
    getMenu(),
    getFeatured(),
  ]);

  return (
    <main>
      <Hero settings={settings} weekly={weekly} special={special} />
      <AwardsStrip text={settings.awardsText} />
      <MenuHighlights menu={menu} />
      <FeaturedStrip items={featured} />
      <VideoSection urls={settings.videoUrls} youtube={settings.social.youtube} />
      <VisitSection settings={settings} weekly={weekly} special={special} />
      <ClosingCta settings={settings} />
    </main>
  );
}
