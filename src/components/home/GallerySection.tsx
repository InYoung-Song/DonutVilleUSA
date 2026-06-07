import { Container } from "../ui/Container";
import { SmartImage } from "../SmartImage";
import { mediaSrc } from "@/lib/media";
import type { GalleryImage } from "@/lib/content-types";

/** Owner photo gallery. Renders nothing when there are no images. */
export function GallerySection({ images }: { images: GalleryImage[] }) {
  if (images.length === 0) return null;
  return (
    <section className="py-14 sm:py-16">
      <Container>
        <h2 className="text-center text-3xl font-bold text-cocoa">
          From the shop
        </h2>
        <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {images.map((img) => (
            <li
              key={img.id}
              className="motion-card overflow-hidden rounded-2xl border border-cream-200 bg-cream"
            >
              <div className="relative aspect-square">
                <SmartImage
                  src={mediaSrc(img.r2Key)}
                  alt={img.altText}
                  fill
                  unoptimized
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover"
                />
              </div>
              {img.caption && (
                <p className="px-3 py-2 text-sm text-cocoa-700">{img.caption}</p>
              )}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
