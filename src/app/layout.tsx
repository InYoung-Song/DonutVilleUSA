import type { Metadata, Viewport } from "next";
import { Fredoka, Nunito } from "next/font/google";
import "./globals.css";
import { SkipLink } from "@/components/SkipLink";
import { AnnouncementBanner } from "@/components/AnnouncementBanner";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { getSettings, getWeeklyHours, getSpecialHours } from "@/db/queries";
import { isBannerActive } from "@/lib/hours";
import { buildLocalBusinessJsonLd } from "@/lib/seo";

// Content is owner-editable (read from D1 at request time), so render dynamically
// rather than baking a static snapshot at build. SSR on Workers + D1 is fast/cheap.
export const dynamic = "force-dynamic";

const display = Fredoka({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = Nunito({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Donutville U.S.A. — Your Neighborhood Fix Since 1966",
    template: "%s · Donutville U.S.A.",
  },
  description:
    "Family-owned donut & coffee shop in Dearborn, Michigan. Hand-cut, New England–style donuts and 100% Colombian Supremo coffee. Open daily.",
  metadataBase: new URL("https://donutvilleusa.com"),
};

export const viewport: Viewport = {
  themeColor: "#fff8f0",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [settings, weekly, special] = await Promise.all([
    getSettings(),
    getWeeklyHours(),
    getSpecialHours(),
  ]);

  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-cocoa">
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
      </body>
    </html>
  );
}
