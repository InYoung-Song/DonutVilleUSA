import { drizzle } from "drizzle-orm/d1";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import * as schema from "./schema";

/**
 * Returns a Drizzle client bound to the Cloudflare D1 database.
 *
 * Works in `next dev` (Miniflare bindings via initOpenNextCloudflareForDev)
 * and in production on Cloudflare Workers. Throws if the binding is missing,
 * which callers in the query layer catch and degrade from.
 */
export function getDb() {
  const { env } = getCloudflareContext();
  if (!env?.DB) {
    throw new Error("D1 binding `DB` is not available in this context.");
  }
  return drizzle(env.DB, { schema });
}

/** Async variant for contexts outside the normal request scope. */
export async function getDbAsync() {
  const { env } = await getCloudflareContext({ async: true });
  if (!env?.DB) {
    throw new Error("D1 binding `DB` is not available in this context.");
  }
  return drizzle(env.DB, { schema });
}
