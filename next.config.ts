import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  // Modern, responsive image formats. Owner-uploaded photos are served from R2
  // (via the /media route) and remote-pattern allowed here.
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // R2 public bucket / custom domain (filled in when hosting is finalized).
      { protocol: "https", hostname: "**.r2.dev" },
      { protocol: "https", hostname: "**.r2.cloudflarestorage.com" },
    ],
  },
};

export default nextConfig;

// Makes Cloudflare bindings (D1, R2, vars) available during `next dev`
// by reading wrangler.jsonc through Miniflare.
initOpenNextCloudflareForDev();
