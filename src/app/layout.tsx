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
    default: "Donutville U.S.A. - Your Neighborhood Fix Since 1966",
    template: "%s · Donutville U.S.A.",
  },
  description:
    "Family-owned donut & coffee shop in Dearborn, Michigan. Hand-cut, New England–style donuts and 100% Colombian Supremo coffee. Open daily.",
  metadataBase: new URL("https://donutvilleusa.com"),
  keywords: [
    "Donutville",
    "donuts Dearborn",
    "coffee Dearborn Michigan",
    "donut shop near me",
    "Colombian Supremo coffee",
  ],
  openGraph: {
    type: "website",
    siteName: "Donutville U.S.A.",
    locale: "en_US",
    url: "https://donutvilleusa.com",
    title: "Donutville U.S.A. - Your Neighborhood Fix Since 1966",
    description:
      "Hand-cut, New England–style donuts and 100% Colombian Supremo coffee in Dearborn, Michigan. Open daily.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fff8f0" },
    { media: "(prefers-color-scheme: dark)", color: "#11100f" },
  ],
  width: "device-width",
  initialScale: 1,
};

const themeBootstrap = `
try {
  var stored = localStorage.getItem("theme");
  var theme = stored === "light" || stored === "dark"
    ? stored
    : (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
} catch (_) {}
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-cocoa">
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
        {children}
      </body>
    </html>
  );
}
