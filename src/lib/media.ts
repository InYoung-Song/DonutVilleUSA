/**
 * Resolve a stored image key to a usable <img> src.
 * - Menu photos are committed under /public (keys like "/menu/coffee.webp").
 * - Owner gallery uploads are stored in Supabase Storage (full public URLs).
 * Both are already directly usable, so this is mostly an empty-guard.
 */
export function mediaSrc(key: string): string {
  return key || "";
}
