import { SmartImage } from "../SmartImage";
import { DonutMark } from "../Logo";
import { formatPrice } from "@/lib/format";
import { mediaSrc } from "@/lib/media";
import type { MenuItem } from "@/lib/content-types";

export function MenuItemCard({ item }: { item: MenuItem }) {
  const price = formatPrice(item.price);
  return (
    <li className="motion-card overflow-hidden rounded-xl border border-cream-200 bg-cream/70">
      <div className="relative aspect-[4/3] bg-cream-100">
        {item.imageKey ? (
          <SmartImage
            src={mediaSrc(item.imageKey)}
            alt={item.name}
            fill
            unoptimized
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <DonutMark className="h-12 w-12 opacity-60" />
          </div>
        )}
        {item.seasonal && (
          <span className="absolute left-2 top-2 rounded-full bg-caramel-100 px-2 py-0.5 text-xs font-semibold text-cocoa-700 shadow-sm">
            Seasonal
          </span>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display font-semibold text-cocoa">{item.name}</h3>
          {price && (
            <span className="shrink-0 font-semibold text-cocoa">{price}</span>
          )}
        </div>
        {item.description && (
          <p className="mt-1 text-sm text-cocoa-700">{item.description}</p>
        )}
      </div>
    </li>
  );
}
