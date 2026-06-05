import { Coffee } from "lucide-react";
import { Container } from "../ui/Container";
import { ButtonLink } from "../ui/ButtonLink";
import { DonutMark } from "../Logo";
import type { MenuCategory, MenuItem } from "@/lib/content-types";

/** Pick a small, on-brand set of highlights from whatever menu data exists. */
function pickHighlights(menu: MenuCategory[]): { item: MenuItem; isBeverage: boolean }[] {
  const all = menu.flatMap((c) =>
    c.items.map((item) => ({ item, isBeverage: c.type === "beverage" })),
  );
  const coffee = all.find((x) => /coffee/i.test(x.item.name));
  const donutCats = menu.filter((c) => c.type === "donut");
  const donutPicks = donutCats
    .map((c) => c.items[0])
    .filter((i): i is MenuItem => !!i)
    .slice(0, 4)
    .map((item) => ({ item, isBeverage: false }));
  const picks = [...(coffee ? [coffee] : []), ...donutPicks];
  // de-dupe by id, cap at 5
  const seen = new Set<number>();
  const unique: { item: MenuItem; isBeverage: boolean }[] = [];
  for (const p of picks) {
    if (seen.has(p.item.id)) continue;
    seen.add(p.item.id);
    unique.push(p);
  }
  return unique.slice(0, 5);
}

export function MenuHighlights({ menu }: { menu: MenuCategory[] }) {
  const highlights = pickHighlights(menu);
  if (highlights.length === 0) return null;

  return (
    <section className="py-14 sm:py-16">
      <Container>
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold text-cocoa">Fresh from the case</h2>
          <p className="mt-2 max-w-xl text-cocoa-700">
            Hand-cut every morning the New England way — plus our signature
            100% Colombian Supremo coffee.
          </p>
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {highlights.map(({ item, isBeverage }) => (
            <li
              key={item.id}
              className="flex flex-col items-center gap-3 rounded-2xl border border-cream-200 bg-white/60 p-5 text-center"
            >
              {isBeverage ? (
                <Coffee className="h-10 w-10 text-cocoa-500" aria-hidden="true" />
              ) : (
                <DonutMark className="h-10 w-10" />
              )}
              <span className="font-display font-semibold text-cocoa">
                {item.name}
              </span>
              {item.price && (
                <span className="text-sm text-cocoa-500">{item.price}</span>
              )}
            </li>
          ))}
        </ul>

        <div className="mt-10 flex justify-center">
          <ButtonLink href="/menu" variant="secondary">
            See the full menu
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
