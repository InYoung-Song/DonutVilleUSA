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
 *  2. It is the runtime fallback: if the DB is empty/unreachable or a field
 *     is blank, the public site still shows correct, on-brand information.
 */

export const DEFAULT_SETTINGS: SiteSettings = {
  businessName: "Donutville U.S.A.",
  tagline: "Your Neighborhood Fix Since July 4th, 1966!",
  phone: "+1 (313) 582-0350",
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
    "Family owned & operated for over half a century. Our donuts are hand-cut the New England way, and our coffee is 100% Colombian Supremo, fresh every single day, 6 a.m. to 11 p.m.",
  aboutBody:
    "Donutville U.S.A. opened on July 4th, 1966, and we've been your neighborhood fix ever since.\n\nThree generations later, we're still hand-cutting our donuts the old-fashioned, New England way and brewing 100% Colombian Supremo coffee from open to close. The routine is simple on purpose: fresh donuts every morning, coffee all day, and a counter that feels like Dearborn.\n\nStop in, say hi, and grab a dozen. We'll have the coffee on.",
  awardsText:
    "Voted Best Donut Shop 2014–2020 & Best Coffee 2016, WDIV ‘4 the Best’",
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
 * The original Donutville menu: each item carries its real photo (migrated
 * from the old site) and a short description. Prices are optional and blank by
 * default (the original listed none); the owner can add them in the admin.
 */
export const DEFAULT_MENU: MenuCategory[] = [
  {
    id: 1,
    type: "donut",
    name: "Raised & Glazed",
    items: [
      m(1, "Sugar Raised", {
        image: "sugar-raised",
        description: "Light, airy raised donuts rolled in sugar.",
      }),
      m(2, "Honey Dipped", {
        image: "honey-dipped",
        description: "Raised donuts in a sweet, glossy honey glaze.",
      }),
      m(3, "Chocolate Iced Rings", {
        image: "chocolate-iced-rings",
        description: "Ring donuts dipped in chocolate, plain or with sprinkles.",
      }),
    ],
  },
  {
    id: 2,
    type: "donut",
    name: "Cake Donuts",
    items: [
      m(4, "Chocolate", {
        image: "chocolate",
        description: "Rich, old-fashioned chocolate cake donuts.",
      }),
      m(5, "Red Velvet", {
        image: "red-velvet",
        description: "Red velvet cake donuts with a tender crumb.",
      }),
      m(6, "Buttermilk", {
        image: "buttermilk",
        description: "Classic old-fashioned buttermilk cake donuts.",
      }),
      m(7, "Sour Cream", {
        image: "sour-cream",
        description: "Tender sour cream cake donuts with a sugar glaze.",
      }),
      m(8, "Cherry Cake", {
        image: "cherry-cake",
        description: "Cherry-flavored cake donuts.",
      }),
      m(9, "Blueberry Cake", {
        image: "blueberry-cake",
        description: "Blueberry cake donuts, lightly glazed.",
      }),
      m(10, "Pumpkin", {
        image: "pumpkin",
        seasonal: true,
        description: "Seasonal pumpkin spice donuts.",
      }),
    ],
  },
  {
    id: 3,
    type: "donut",
    name: "Filled & Cream",
    items: [
      m(11, "Bavarian Cream", {
        image: "bavarian",
        description: "Filled with Bavarian cream and topped with chocolate.",
      }),
      m(12, "Assorted Filled", {
        image: "assorted-filled",
        description: "Strawberry, apple, lemon, buttercream, raspberry, custard & cherry.",
      }),
      m(13, "Jelly & Ice", {
        image: "jelly-ice",
        description: "Iced raised donuts filled with sweet jelly.",
      }),
    ],
  },
  {
    id: 4,
    type: "donut",
    name: "Twists, Rolls & Pastries",
    items: [
      m(14, "Bow Ties", {
        image: "bow-ties",
        description: "Twisted, golden bow-tie donuts.",
      }),
      m(15, "Éclairs", {
        image: "eclairs",
        description: "Long donuts topped with rich chocolate.",
      }),
      m(16, "French Crullers", {
        image: "french-crullers",
        description: "Light, airy crullers with a delicate ridged twist.",
      }),
      m(17, "Cinnamon Rolls", {
        image: "cinnamon-rolls",
        description: "Big, gooey, fresh-baked cinnamon rolls.",
      }),
      m(18, "Donut Sticks", {
        image: "sticks",
        description: "Hand-cut donut sticks: plain, sugared, or jelly-filled.",
      }),
    ],
  },
  {
    id: 5,
    type: "donut",
    name: "Coated Specials",
    items: [
      m(19, "Peanut", {
        image: "peanut",
        description: "Glazed donuts rolled in crunchy chopped peanuts.",
      }),
      m(20, "Dutch Crumb", {
        image: "dutch-crumb",
        description: "Cake donuts in a cinnamon-sugar crumb coating.",
      }),
      m(21, "Coconut", {
        image: "coconut",
        description: "Cake donuts coated in sweet coconut.",
      }),
    ],
  },
  {
    id: 6,
    type: "donut",
    name: "Muffins & Cookies",
    items: [
      m(22, "Muffins", {
        image: "muffins",
        description: "Blueberry, chocolate chip, and more, baked fresh daily.",
      }),
      m(23, "Cookies", {
        image: "cookies",
        description: "Fresh-baked cookies, including chocolate chip.",
      }),
    ],
  },
  {
    id: 7,
    type: "beverage",
    name: "Coffee & Hot Drinks",
    items: [
      m(24, "Colombian Supremo Coffee", {
        image: "coffee",
        description: "Our signature 100% Colombian Supremo, fresh all day.",
      }),
      m(25, "Cappuccino", {
        image: "cappuccino",
        description: "Espresso topped with steamed, frothy milk.",
      }),
      m(26, "Hot Chocolate", {
        image: "hot-chocolate",
        description: "Rich, warming hot chocolate.",
      }),
      m(27, "Tea", { image: "tea", description: "A hot, freshly steeped cup of tea." }),
    ],
  },
  {
    id: 8,
    type: "beverage",
    name: "Cold Drinks & Juices",
    items: [
      m(28, "Milk", { image: "milk", description: "Ice-cold milk." }),
      m(29, "Orange Juice", {
        image: "orange-juice",
        description: "Refreshing orange juice.",
      }),
      m(30, "Apple Juice", {
        image: "apple-juice",
        description: "Crisp, cold apple juice.",
      }),
      m(31, "Cranberry Juice", {
        image: "cranberry-juice",
        description: "Tart and refreshing cranberry juice.",
      }),
      m(32, "Pineapple Juice", {
        image: "pineapple-juice",
        description: "Sweet, tropical pineapple juice.",
      }),
      m(33, "Bottled Water", {
        image: "bottled-water",
        description: "Cold bottled water.",
      }),
    ],
  },
];

export const DEFAULT_GALLERY: GalleryImage[] = [];
export const DEFAULT_FEATURED: FeaturedSection[] = [];

/** Tiny helper to keep the menu definition above readable. */
function m(
  id: number,
  name: string,
  opts: {
    description?: string;
    price?: string;
    seasonal?: boolean;
    image?: string;
  } = {},
) {
  return {
    id,
    name,
    description: opts.description ?? null,
    price: opts.price ?? null,
    seasonal: opts.seasonal ?? false,
    imageKey: opts.image ? `/menu/${opts.image}.webp` : null,
  };
}
