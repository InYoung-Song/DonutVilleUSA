import { Container } from "../ui/Container";
import type { FeaturedSection } from "@/lib/content-types";

/** Optional owner-curated promo blocks. Renders nothing when empty. */
export function FeaturedStrip({ items }: { items: FeaturedSection[] }) {
  if (items.length === 0) return null;
  return (
    <section className="py-14 sm:py-16">
      <Container>
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((f) => (
            <li
              key={f.id}
              className="rounded-2xl border border-cream-200 bg-white/60 p-6"
            >
              <h3 className="font-display text-xl font-semibold text-cocoa">
                {f.title}
              </h3>
              {f.body && <p className="mt-2 text-cocoa-700">{f.body}</p>}
              {f.linkHref && (
                <a
                  href={f.linkHref}
                  className="mt-3 inline-block font-semibold text-berry hover:underline"
                  {...(f.linkHref.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {f.linkLabel || "Learn more"} →
                </a>
              )}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
