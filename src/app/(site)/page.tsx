import {
  getSettings,
  getWeeklyHours,
  getSpecialHours,
  getMenu,
  getFeatured,
  getGallery,
} from "@/db/queries";
import { Hero } from "@/components/home/Hero";
import { AwardsStrip } from "@/components/home/AwardsStrip";
import { MenuHighlights } from "@/components/home/MenuHighlights";
import { GallerySection } from "@/components/home/GallerySection";
import { FeaturedStrip } from "@/components/home/FeaturedStrip";
import { VideoSection } from "@/components/home/VideoSection";
import { VisitSection } from "@/components/home/VisitSection";
import { ClosingCta } from "@/components/home/ClosingCta";

export default async function Home() {
  const [settings, weekly, special, menu, featured, gallery] =
    await Promise.all([
      getSettings(),
      getWeeklyHours(),
      getSpecialHours(),
      getMenu(),
      getFeatured(),
      getGallery(),
    ]);

  return (
    <main>
      <Hero settings={settings} weekly={weekly} special={special} />
      <AwardsStrip text={settings.awardsText} />
      <MenuHighlights menu={menu} />
      <GallerySection images={gallery} />
      <FeaturedStrip items={featured} />
      <VideoSection urls={settings.videoUrls} youtube={settings.social.youtube} />
      <VisitSection settings={settings} weekly={weekly} special={special} />
      <ClosingCta settings={settings} />
    </main>
  );
}
