import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // Supabase Storage public URLs (owner-uploaded gallery images).
      { protocol: "https", hostname: "*.supabase.co" },
    ],
  },
  // Preserve SEO/inbound links from the old GoDaddy site.
  async redirects() {
    return [
      { source: "/home-1.html", destination: "/", permanent: true },
      { source: "/donuts.html", destination: "/menu", permanent: true },
      { source: "/beverages.html", destination: "/menu", permanent: true },
      { source: "/contact-1.html", destination: "/contact", permanent: true },
    ];
  },
};

export default nextConfig;
