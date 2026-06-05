import type { Metadata, Viewport } from "next";
import { Fredoka, Nunito } from "next/font/google";
import "./globals.css";

// Root layout is intentionally minimal (html/body/fonts only) so the public
// site and the admin console can each supply their own chrome.
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-cocoa">
        {children}
      </body>
    </html>
  );
}
