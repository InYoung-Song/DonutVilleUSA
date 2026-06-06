import "server-only";
import { createClient } from "@supabase/supabase-js";

const BUCKET = "media";

/** Whether Supabase Storage is configured (needed for gallery uploads). */
export function storageConfigured(): boolean {
  return !!(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

function admin() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

/** Upload bytes to the public `media` bucket; returns the public URL. */
export async function uploadMedia(
  path: string,
  data: ArrayBuffer,
  contentType: string,
): Promise<string> {
  const sb = admin();
  if (!sb) throw new Error("Supabase Storage is not configured.");
  const { error } = await sb.storage
    .from(BUCKET)
    .upload(path, data, { contentType, upsert: true });
  if (error) throw error;
  return sb.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
}

/** Delete a previously uploaded object, given its public URL. */
export async function deleteMedia(publicUrl: string): Promise<void> {
  const sb = admin();
  if (!sb) return;
  const m = publicUrl.match(/\/object\/public\/[^/]+\/(.+)$/);
  if (m) await sb.storage.from(BUCKET).remove([decodeURIComponent(m[1])]);
}
