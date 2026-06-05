import type {
  SiteSettings,
  DayHours,
  MenuCategory,
  SpecialHour,
  GalleryImage,
  FeaturedSection,
} from "./content-types";

/**
 * Canonical Donutville U.S.A. content, sourced from the original site.
 *
 * This serves two jobs:
 *  1. It seeds the database (see drizzle/seed.sql, kept in sync with this).
 *  2. It is the runtime fallback — if the DB is empty/unreachable or a field
 *     is blank, the public site still shows correct, on-brand information.
 */

export const DEFAULT_SETTINGS: SiteSettings = {
  businessName: "Donutville U.S.A.",
  tagline: "Your Neighborhood Fix Since July 4th, 1966!",
  phone: "1-313-582-0350",
  email: "",
  addressLine1: "14829 Ford Rd.",
  city: "Dearborn",
  state: "MI",
  zip: "48126",
  mapEmbedUrl:
    "https://www.google.com/maps?q=14829+Ford+Rd,+Dearborn,+MI+48126&output=embed",
  heroTitle: "Hand-cut donuts & real-deal coffee",
  heroSubtitle: "A Dearborn tradition since July 4th, 1966.",
  homeIntro:
    "Family owned & operated for over half a century. Our donuts are hand-cut the New England way, and our coffee is 100% Colombian Supremo — fresh every single day, 6 a.m. to 11 p.m.",
  aboutBody:
    "Donutville U.S.A. opened on July 4th, 1966, and we've been your neighborhood fix ever since. Three generations later, we're still hand-cutting our donuts the old-fashioned, New England way and brewing 100% Colombian Supremo coffee from open to close. Stop in, say hi, and grab a dozen — we'll have the coffee on.",
  awardsText:
    "Voted Best Donut Shop 2014–2020 & Best Coffee 2016 — WDIV ‘4 the Best’",
  largeOrderPolicy:
    "Call ahead for orders of 6 dozen or more. Large or special orders need 48 hours’ advance notice.",
  bannerText: "",
  bannerEnabled: false,
  bannerStart: null,
  bannerEnd: null,
  social: {
    youtube:
      "https://youtube.com/playlist?list=PLh1eTk0GGfnki3_09CxQjHSG_0mWULLle",
  },
  badges: ["visa", "mastercard", "amex", "discover", "cash", "wifi"],
  videoUrls: [
    "https://youtube.com/playlist?list=PLh1eTk0GGfnki3_09CxQjHSG_0mWULLle",
  ],
};

/** Open 6 a.m.–11 p.m. daily. */
export const DEFAULT_HOURS: DayHours[] = Array.from({ length: 7 }, (_, day) => ({
  dayOfWeek: day,
  isClosed: false,
  openTime: "06:00",
  closeTime: "23:00",
}));

export const DEFAULT_SPECIAL_HOURS: SpecialHour[] = [];

/**
 * Menu organized from the original flat lists into friendlier categories.
 * Prices intentionally omitted (the original site listed none); the owner can
 * add them per item in the admin console.
 */
export const DEFAULT_MENU: MenuCategory[] = [
  {
    id: 1,
    type: "donut",
    name: "Raised & Glazed",
    items: [
      m(1, "Sugar Raised"),
      m(2, "Honey Dipped"),
      m(3, "Chocolate Iced Rings"),
      m(4, "Chocolate"),
      m(5, "Bavarian Cream"),
      m(6, "Coconut"),
    ],
  },
  {
    id: 2,
    type: "donut",
    name: "Cake Donuts",
    items: [
      m(7, "Buttermilk"),
      m(8, "Sour Cream"),
      m(9, "Red Velvet"),
      m(10, "Cherry Cake"),
      m(11, "Blueberry Cake"),
      m(12, "Pumpkin", { seasonal: true }),
    ],
  },
  {
    id: 3,
    type: "donut",
    name: "Filled Donuts",
    items: [
      m(13, "Strawberry"),
      m(14, "Apple"),
      m(15, "Lemon"),
      m(16, "Buttercream"),
      m(17, "Raspberry"),
      m(18, "Custard"),
      m(19, "Cherry"),
    ],
  },
  {
    id: 4,
    type: "donut",
    name: "Rolls, Twists & Pastries",
    items: [
      m(20, "Eclairs"),
      m(21, "Bow Ties"),
      m(22, "French Crullers"),
      m(23, "Cinnamon Rolls"),
      m(24, "Dutch Crumb"),
      m(25, "Peanut"),
      m(26, "Donut Sticks"),
      m(27, "Jelly & Ice"),
    ],
  },
  {
    id: 5,
    type: "donut",
    name: "Muffins & Cookies",
    items: [m(28, "Fresh Muffins"), m(29, "Cookies")],
  },
  {
    id: 6,
    type: "beverage",
    name: "Coffee & Hot Drinks",
    items: [
      m(30, "100% Colombian Supremo Coffee", {
        description: "Our signature — fresh-brewed all day.",
      }),
      m(31, "Cappuccino"),
      m(32, "Hot Chocolate"),
      m(33, "Hot Tea"),
    ],
  },
  {
    id: 7,
    type: "beverage",
    name: "Cold Drinks & Juices",
    items: [
      m(34, "Bottled Water"),
      m(35, "Milk"),
      m(36, "Orange Juice"),
      m(37, "Apple Juice"),
      m(38, "Cranberry Juice"),
      m(39, "Pineapple Juice"),
    ],
  },
];

export const DEFAULT_GALLERY: GalleryImage[] = [];
export const DEFAULT_FEATURED: FeaturedSection[] = [];

/** Tiny helper to keep the menu definition above readable. */
function m(
  id: number,
  name: string,
  opts: { description?: string; price?: string; seasonal?: boolean } = {},
) {
  return {
    id,
    name,
    description: opts.description ?? null,
    price: opts.price ?? null,
    seasonal: opts.seasonal ?? false,
    imageKey: null,
  };
}
