/**
 * Resolve a gallery image's stored key to a usable src.
 * - Keys starting with "/" are committed assets in /public (the originals).
 * - Other keys are R2 objects served via the /media route (owner uploads).
 */
export function mediaSrc(key: string): string {
  if (!key) return "";
  return key.startsWith("/") ? key : `/media/${key}`;
}
