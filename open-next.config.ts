import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// Minimal config: works out of the box (SSR + on-demand revalidation).
// To enable persisted ISR caching at the edge, add an R2 incremental cache
// override here and bind `NEXT_INC_CACHE_R2_BUCKET` in wrangler.jsonc.
export default defineCloudflareConfig({});
