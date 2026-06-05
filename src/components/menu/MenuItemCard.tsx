import { formatPrice } from "@/lib/format";
import type { MenuItem } from "@/lib/content-types";

export function MenuItemCard({ item }: { item: MenuItem }) {
  const price = formatPrice(item.price);
  return (
    <li className="flex items-start justify-between gap-3 rounded-xl border border-cream-200 bg-white/60 p-4">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-display font-semibold text-cocoa">{item.name}</h3>
          {item.seasonal && (
            <span className="rounded-full bg-caramel-100 px-2 py-0.5 text-xs font-semibold text-cocoa-700">
              Seasonal
            </span>
          )}
        </div>
        {item.description && (
          <p className="mt-1 text-sm text-cocoa-700">{item.description}</p>
        )}
      </div>
      {price && (
        <span className="shrink-0 font-semibold text-cocoa">{price}</span>
      )}
    </li>
  );
}
