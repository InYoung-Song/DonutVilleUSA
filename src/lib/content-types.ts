/**
 * UI-facing content shapes. These are what components consume — JSON columns
 * are already parsed and every field is guaranteed present (the query layer
 * fills gaps from defaults), so components never have to null-check core data.
 */

export type BadgeKey =
  | "visa"
  | "mastercard"
  | "amex"
  | "discover"
  | "applepay"
  | "googlepay"
  | "cash"
  | "wifi"
  | "parking"
  | "wheelchair";

export interface SocialLinks {
  youtube?: string;
  facebook?: string;
  instagram?: string;
  tiktok?: string;
  x?: string;
  yelp?: string;
}

export interface SiteSettings {
  businessName: string;
  tagline: string;
  phone: string;
  email: string;
  addressLine1: string;
  city: string;
  state: string;
  zip: string;
  mapEmbedUrl: string;
  heroTitle: string;
  heroSubtitle: string;
  homeIntro: string;
  aboutBody: string;
  awardsText: string;
  largeOrderPolicy: string;
  bannerText: string;
  bannerEnabled: boolean;
  bannerStart: string | null;
  bannerEnd: string | null;
  social: SocialLinks;
  badges: BadgeKey[];
  videoUrls: string[];
}

export interface DayHours {
  dayOfWeek: number; // 0 = Sunday … 6 = Saturday
  isClosed: boolean;
  openTime: string; // "HH:MM" 24h
  closeTime: string; // "HH:MM" 24h
}

export interface SpecialHour {
  id: number;
  date: string; // YYYY-MM-DD
  label: string;
  isClosed: boolean;
  openTime: string | null;
  closeTime: string | null;
  note: string | null;
}

export interface MenuItem {
  id: number;
  name: string;
  description: string | null;
  price: string | null;
  seasonal: boolean;
  imageKey: string | null;
}

export interface MenuCategory {
  id: number;
  type: "donut" | "beverage";
  name: string;
  items: MenuItem[];
}

export interface GalleryImage {
  id: number;
  r2Key: string;
  altText: string;
  caption: string | null;
}

export interface FeaturedSection {
  id: number;
  title: string;
  body: string | null;
  imageKey: string | null;
  linkHref: string | null;
  linkLabel: string | null;
}

export const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

export const DAY_NAMES_SHORT = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
] as const;
