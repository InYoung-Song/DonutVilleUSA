import { cache } from "react";
import { asc, eq } from "drizzle-orm";
import { getDb } from "./client";
import * as schema from "./schema";
import {
  DEFAULT_SETTINGS,
  DEFAULT_HOURS,
  DEFAULT_MENU,
  DEFAULT_GALLERY,
} from "@/lib/defaults";
import type {
  SiteSettings,
  SocialLinks,
  BadgeKey,
  DayHours,
  SpecialHour,
  MenuCategory,
  GalleryImage,
  FeaturedSection,
} from "@/lib/content-types";

function safeJson<T>(value: string | null | undefined, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

/** Prefer a non-empty DB value, otherwise fall back to the default. */
function or(value: string | null | undefined, fallback: string): string {
  return value && value.trim() ? value : fallback;
}

/**
 * Site settings, merged over defaults so every field is always populated.
 * Returns DEFAULT_SETTINGS wholesale if the DB read fails. Cached per request.
 */
export const getSettings = cache(async (): Promise<SiteSettings> => {
  try {
    const db = getDb();
    const row = (
      await db.select().from(schema.settings).where(eq(schema.settings.id, 1))
    )[0];
    return mapSettings(row);
  } catch (err) {
    console.error("getSettings failed, using defaults:", err);
    return DEFAULT_SETTINGS;
  }
});

export const getWeeklyHours = cache(async (): Promise<DayHours[]> => {
  try {
    const db = getDb();
    const rows = await db.select().from(schema.hours);
    return DEFAULT_HOURS.map((fallback) => {
      const row = rows.find((r) => r.dayOfWeek === fallback.dayOfWeek);
      if (!row) return fallback;
      return {
        dayOfWeek: fallback.dayOfWeek,
        isClosed: !!row.isClosed,
        openTime: or(row.openTime, fallback.openTime),
        closeTime: or(row.closeTime, fallback.closeTime),
      };
    });
  } catch (err) {
    console.error("getWeeklyHours failed, using defaults:", err);
    return DEFAULT_HOURS;
  }
});

export const getSpecialHours = cache(async (): Promise<SpecialHour[]> => {
  try {
    const db = getDb();
    const rows = await db
      .select()
      .from(schema.specialHours)
      .orderBy(asc(schema.specialHours.date));
    return rows.map((r) => ({
      id: r.id,
      date: r.date,
      label: r.label,
      isClosed: !!r.isClosed,
      openTime: r.openTime ?? null,
      closeTime: r.closeTime ?? null,
      note: r.note ?? null,
    }));
  } catch (err) {
    console.error("getSpecialHours failed:", err);
    return [];
  }
});

export const getMenu = cache(async (): Promise<MenuCategory[]> => {
  try {
    const db = getDb();
    const cats = await db
      .select()
      .from(schema.menuCategories)
      .where(eq(schema.menuCategories.visible, true))
      .orderBy(asc(schema.menuCategories.sortOrder));

    if (cats.length === 0) return DEFAULT_MENU;

    const items = await db
      .select()
      .from(schema.menuItems)
      .where(eq(schema.menuItems.visible, true))
      .orderBy(asc(schema.menuItems.sortOrder));

    return cats.map((c) => ({
      id: c.id,
      type: c.type === "beverage" ? "beverage" : "donut",
      name: c.name,
      items: items
        .filter((i) => i.categoryId === c.id)
        .map((i) => ({
          id: i.id,
          name: i.name,
          description: i.description ?? null,
          price: i.price ?? null,
          seasonal: !!i.seasonal,
          imageKey: i.imageKey ?? null,
        })),
    }));
  } catch (err) {
    console.error("getMenu failed, using defaults:", err);
    return DEFAULT_MENU;
  }
});

/** Admin view: every category and item (including hidden), for editing. */
export const getMenuAdmin = cache(
  async (): Promise<{
    categories: schema.MenuCategoryRow[];
    items: schema.MenuItemRow[];
  }> => {
    try {
      const db = getDb();
      const categories = await db
        .select()
        .from(schema.menuCategories)
        .orderBy(asc(schema.menuCategories.sortOrder));
      const items = await db
        .select()
        .from(schema.menuItems)
        .orderBy(asc(schema.menuItems.sortOrder));
      return { categories, items };
    } catch (err) {
      console.error("getMenuAdmin failed:", err);
      return { categories: [], items: [] };
    }
  },
);

export const getGallery = cache(async (): Promise<GalleryImage[]> => {
  try {
    const db = getDb();
    const rows = await db
      .select()
      .from(schema.galleryImages)
      .where(eq(schema.galleryImages.visible, true))
      .orderBy(asc(schema.galleryImages.sortOrder));
    if (rows.length === 0) return DEFAULT_GALLERY;
    return rows.map((r) => ({
      id: r.id,
      r2Key: r.r2Key,
      altText: r.altText,
      caption: r.caption ?? null,
    }));
  } catch (err) {
    console.error("getGallery failed, using defaults:", err);
    return DEFAULT_GALLERY;
  }
});

/** Admin view: every gallery image (including hidden), for editing. */
export const getGalleryAdmin = cache(
  async (): Promise<schema.GalleryImageRow[]> => {
    try {
      const db = getDb();
      return await db
        .select()
        .from(schema.galleryImages)
        .orderBy(asc(schema.galleryImages.sortOrder));
    } catch (err) {
      console.error("getGalleryAdmin failed:", err);
      return [];
    }
  },
);

export const getFeatured = cache(async (): Promise<FeaturedSection[]> => {
  try {
    const db = getDb();
    const rows = await db
      .select()
      .from(schema.featuredSections)
      .where(eq(schema.featuredSections.visible, true))
      .orderBy(asc(schema.featuredSections.sortOrder));
    return rows.map((r) => ({
      id: r.id,
      title: r.title,
      body: r.body ?? null,
      imageKey: r.imageKey ?? null,
      linkHref: r.linkHref ?? null,
      linkLabel: r.linkLabel ?? null,
    }));
  } catch (err) {
    console.error("getFeatured failed:", err);
    return [];
  }
});

function mapSettings(row: schema.SettingsRow | undefined): SiteSettings {
  if (!row) return DEFAULT_SETTINGS;
  return {
    businessName: or(row.businessName, DEFAULT_SETTINGS.businessName),
    tagline: or(row.tagline, DEFAULT_SETTINGS.tagline),
    phone: or(row.phone, DEFAULT_SETTINGS.phone),
    email: row.email ?? "",
    addressLine1: or(row.addressLine1, DEFAULT_SETTINGS.addressLine1),
    city: or(row.city, DEFAULT_SETTINGS.city),
    state: or(row.state, DEFAULT_SETTINGS.state),
    zip: or(row.zip, DEFAULT_SETTINGS.zip),
    mapEmbedUrl: or(row.mapEmbedUrl, DEFAULT_SETTINGS.mapEmbedUrl),
    heroTitle: or(row.heroTitle, DEFAULT_SETTINGS.heroTitle),
    heroSubtitle: or(row.heroSubtitle, DEFAULT_SETTINGS.heroSubtitle),
    homeIntro: or(row.homeIntro, DEFAULT_SETTINGS.homeIntro),
    aboutBody: or(row.aboutBody, DEFAULT_SETTINGS.aboutBody),
    awardsText: or(row.awardsText, DEFAULT_SETTINGS.awardsText),
    largeOrderPolicy: or(
      row.largeOrderPolicy,
      DEFAULT_SETTINGS.largeOrderPolicy,
    ),
    bannerText: row.bannerText ?? "",
    bannerEnabled: !!row.bannerEnabled,
    bannerStart: row.bannerStart ?? null,
    bannerEnd: row.bannerEnd ?? null,
    social: safeJson<SocialLinks>(row.social, DEFAULT_SETTINGS.social),
    badges: safeJson<BadgeKey[]>(row.badges, DEFAULT_SETTINGS.badges),
    videoUrls: safeJson<string[]>(row.videoUrls, DEFAULT_SETTINGS.videoUrls),
  };
}
