"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { MenuItemCard } from "./MenuItemCard";
import type { MenuCategory } from "@/lib/content-types";

type MenuType = "donut" | "beverage";
const LABELS: Record<MenuType, string> = {
  donut: "Donuts",
  beverage: "Beverages",
};

const SEARCH_ALIASES: Record<string, string[]> = {
  classic: ["raised", "glazed", "honey", "sugar", "cake"],
  coffee: ["colombian", "supremo", "cappuccino"],
  cream: ["bavarian", "custard", "filled", "eclair"],
  drink: ["beverage", "coffee", "juice", "milk", "water", "tea"],
  filled: ["jelly", "bavarian", "custard", "cream"],
  fruit: ["apple", "blueberry", "cherry", "cranberry", "lemon", "orange", "pineapple", "raspberry", "strawberry"],
  old: ["buttermilk", "sour cream", "cake"],
  pastry: ["bow", "cinnamon", "cruller", "eclair", "roll", "stick"],
};

function expandedSearchTerms(query: string): string[] {
  const words = query.split(/\s+/).filter(Boolean);
  const terms = new Set([query, ...words]);

  for (const word of words) {
    for (const [key, aliases] of Object.entries(SEARCH_ALIASES)) {
      if (key.includes(word) || word.includes(key)) {
        terms.add(key);
        aliases.forEach((alias) => terms.add(alias));
      }
    }
  }

  return [...terms];
}

export function MenuBrowser({ menu }: { menu: MenuCategory[] }) {
  const types = useMemo<MenuType[]>(() => {
    const t: MenuType[] = [];
    if (menu.some((c) => c.type === "donut")) t.push("donut");
    if (menu.some((c) => c.type === "beverage")) t.push("beverage");
    return t;
  }, [menu]);

  const [activeType, setActiveType] = useState<MenuType>(types[0] ?? "donut");
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const searchTerms = useMemo(() => expandedSearchTerms(q), [q]);

  const visibleCats = useMemo(() => {
    return menu
      .filter((c) => c.type === activeType)
      .map((c) => ({
        ...c,
        items: q
          ? c.items.filter(
              (i) => {
                const haystack = [c.name, i.name, i.description]
                  .filter(Boolean)
                  .join(" ")
                  .toLowerCase();
                return searchTerms.some((term) => haystack.includes(term));
              },
            )
          : c.items,
      }))
      .filter((c) => c.items.length > 0);
  }, [menu, activeType, q, searchTerms]);

  const totalMatches = visibleCats.reduce((n, c) => n + c.items.length, 0);

  if (menu.length === 0) {
    return (
      <p className="rounded-xl bg-cream-100 p-6 text-center text-cocoa-700">
        Our menu is coming together. Please call us for today’s selection!
      </p>
    );
  }

  function onTabKey(e: React.KeyboardEvent, idx: number) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const dir = e.key === "ArrowRight" ? 1 : -1;
    const next = types[(idx + dir + types.length) % types.length];
    setActiveType(next);
    document.getElementById(`tab-${next}`)?.focus();
  }

  return (
    <div>
      {types.length > 1 && (
        <div
          role="tablist"
          aria-label="Menu sections"
          className="flex gap-2 border-b border-cream-200"
        >
          {types.map((t, idx) => {
            const selected = t === activeType;
            return (
              <button
                key={t}
                role="tab"
                id={`tab-${t}`}
                aria-selected={selected}
                aria-controls={`panel-${t}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveType(t)}
                onKeyDown={(e) => onTabKey(e, idx)}
                className={`-mb-px border-b-2 px-4 py-2.5 font-display font-semibold transition-colors ${
                  selected
                    ? "border-berry text-berry"
                    : "border-transparent text-cocoa-500 hover:text-cocoa"
                }`}
              >
                {LABELS[t]}
              </button>
            );
          })}
        </div>
      )}

      <div className="mt-5">
        <div className="relative max-w-sm">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cocoa-500"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search ${LABELS[activeType].toLowerCase()}…`}
            aria-label={`Search ${LABELS[activeType].toLowerCase()}`}
            className="w-full rounded-full border border-cream-200 bg-cream/70 py-2 pl-9 pr-9 text-cocoa placeholder:text-cocoa-500 focus:border-berry focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-cocoa-500 hover:bg-cream-100 hover:text-cocoa"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      <div
        role="tabpanel"
        id={`panel-${activeType}`}
        aria-labelledby={`tab-${activeType}`}
        className="mt-8"
      >
        {totalMatches === 0 ? (
          <p className="rounded-xl bg-cream-100 p-6 text-center text-cocoa-700">
            No items match “{query}”.{" "}
            <button
              type="button"
              onClick={() => setQuery("")}
              className="font-semibold text-berry hover:underline"
            >
              Clear search
            </button>
          </p>
        ) : (
          <div className="space-y-10">
            {visibleCats.map((c) => (
              <section key={c.id} aria-labelledby={`cat-${c.id}`}>
                <h2
                  id={`cat-${c.id}`}
                  className="font-display text-2xl font-bold text-cocoa"
                >
                  {c.name}
                </h2>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {c.items.map((item) => (
                    <MenuItemCard key={item.id} item={item} />
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
