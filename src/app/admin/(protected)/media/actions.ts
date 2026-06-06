"use server";

import {
  addGalleryImage,
  updateGalleryImage,
  deleteGalleryImage,
  getGalleryRow,
} from "@/db/mutations";
import { uploadMedia, deleteMedia, storageConfigured } from "@/lib/storage";
import { revalidatePublic } from "@/lib/revalidate";
import { type ActionState, ok, fail, str, bool, int } from "@/lib/admin";

const MAX_BYTES = 5 * 1024 * 1024; // 5 MB
const EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
  "image/gif": "gif",
};

export async function uploadImage(
  _prev: ActionState,
  form: FormData,
): Promise<ActionState> {
  if (!storageConfigured()) {
    return fail(
      "Image uploads aren’t set up yet — add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
    );
  }
  const file = form.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return fail("Choose an image to upload.");
  }
  if (!file.type.startsWith("image/") || !EXT[file.type]) {
    return fail("Please upload a JPG, PNG, WebP, AVIF, or GIF image.");
  }
  if (file.size > MAX_BYTES) {
    return fail("Image is too large (max 5 MB).");
  }

  const path = `gallery/${crypto.randomUUID()}.${EXT[file.type]}`;
  try {
    const url = await uploadMedia(path, await file.arrayBuffer(), file.type);
    await addGalleryImage({
      r2Key: url,
      altText: str(form, "altText") || "Donutville photo",
      caption: str(form, "caption") || null,
      sortOrder: int(form, "sortOrder", 0),
      visible: true,
    });
    revalidatePublic();
  } catch (err) {
    console.error("uploadImage failed:", err);
    return fail("Upload failed — please try again.");
  }
  return ok("Image uploaded.");
}

export async function editImage(form: FormData): Promise<void> {
  const id = int(form, "id");
  if (!id) return;
  await updateGalleryImage(id, {
    altText: str(form, "altText"),
    caption: str(form, "caption") || null,
    sortOrder: int(form, "sortOrder", 0),
    visible: bool(form, "visible"),
  });
  revalidatePublic();
}

export async function removeImage(form: FormData): Promise<void> {
  const id = int(form, "id");
  if (!id) return;
  const row = await getGalleryRow(id);
  if (row) {
    try {
      await deleteMedia(row.r2Key);
    } catch (err) {
      console.error("R2 delete failed (continuing):", err);
    }
    await deleteGalleryImage(id);
    revalidatePublic();
  }
}
