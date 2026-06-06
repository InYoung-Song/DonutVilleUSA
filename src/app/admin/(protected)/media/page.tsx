import { Trash2 } from "lucide-react";
import { getGalleryAdmin } from "@/db/queries";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminForm } from "@/components/admin/AdminForm";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { TextField } from "@/components/admin/fields";
import { SmartImage } from "@/components/SmartImage";
import { mediaSrc } from "@/lib/media";
import type { GalleryImageRow } from "@/db/schema";
import { uploadImage, editImage, removeImage } from "./actions";

export const dynamic = "force-dynamic";

const inputCls =
  "w-full rounded-lg border border-cream-200 bg-white px-2 py-1.5 text-sm text-cocoa focus:border-berry focus:outline-none";

function ImageCard({ img }: { img: GalleryImageRow }) {
  return (
    <form
      action={editImage}
      className="flex gap-4 rounded-xl border border-cream-200 bg-white p-3"
    >
      <SmartImage
        src={mediaSrc(img.r2Key)}
        alt={img.altText}
        width={96}
        height={96}
        unoptimized
        className="h-24 w-24 shrink-0 rounded-lg object-cover"
        fallbackLabel="No image"
      />
      <div className="flex-1 space-y-2">
        <input type="hidden" name="id" value={img.id} />
        <input
          name="altText"
          defaultValue={img.altText}
          placeholder="Describe the photo (alt text)"
          aria-label="Alt text"
          className={inputCls}
        />
        <input
          name="caption"
          defaultValue={img.caption ?? ""}
          placeholder="Caption (optional)"
          aria-label="Caption"
          className={inputCls}
        />
        <div className="flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-1.5 text-xs text-cocoa-700">
            <input
              type="checkbox"
              name="visible"
              defaultChecked={img.visible}
              className="h-4 w-4 rounded border-cream-200 text-berry"
            />
            Show on site
          </label>
          <label className="flex items-center gap-1.5 text-xs text-cocoa-700">
            Order
            <input
              name="sortOrder"
              type="number"
              defaultValue={img.sortOrder}
              className="w-16 rounded border border-cream-200 px-1.5 py-1"
            />
          </label>
          <SubmitButton>Save</SubmitButton>
          <button
            type="submit"
            formAction={removeImage}
            aria-label="Delete image"
            className="rounded-full p-1.5 text-berry-600 hover:bg-berry-100"
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </form>
  );
}

export default async function MediaEditor() {
  const images = await getGalleryAdmin();

  return (
    <div className="space-y-10">
      <div>
        <AdminPageHeader
          title="Gallery"
          description="Upload photos of your donuts, coffee, and shop. They appear on the home page."
        />
        <div className="rounded-2xl border border-cream-200 bg-cream p-5">
          <h2 className="font-semibold text-cocoa">Upload a photo</h2>
          <div className="mt-3">
            <AdminForm action={uploadImage} submitLabel="Upload">
              <input
                type="file"
                name="file"
                accept="image/*"
                required
                className="block w-full text-sm text-cocoa-700 file:mr-3 file:rounded-full file:border-0 file:bg-cocoa file:px-4 file:py-2 file:font-semibold file:text-cream hover:file:bg-cocoa-700"
              />
              <TextField
                label="Alt text (what's in the photo)"
                name="altText"
                hint="Helps screen readers and search engines. e.g. “Tray of glazed donuts.”"
              />
              <TextField label="Caption (optional)" name="caption" />
            </AdminForm>
          </div>
        </div>
      </div>

      <div>
        <h2 className="font-display text-lg font-bold text-cocoa">
          Your photos
        </h2>
        {images.length === 0 ? (
          <p className="mt-2 text-cocoa-700">
            No photos yet — upload your first one above.
          </p>
        ) : (
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {images.map((img) => (
              <ImageCard key={img.id} img={img} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
