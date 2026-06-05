import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

/**
 * Single-row table holding all the "one of each" site settings.
 * Always row id = 1. JSON-ish fields (social, badges, video_urls) are stored
 * as text and parsed in the query layer.
 */
export const settings = sqliteTable("settings", {
  id: integer("id").primaryKey(),
  businessName: text("business_name").notNull().default("Donutville U.S.A."),
  tagline: text("tagline").notNull().default(""),
  phone: text("phone").notNull().default(""),
  email: text("email").notNull().default(""),
  addressLine1: text("address_line1").notNull().default(""),
  city: text("city").notNull().default(""),
  state: text("state").notNull().default(""),
  zip: text("zip").notNull().default(""),
  mapEmbedUrl: text("map_embed_url").notNull().default(""),
  heroTitle: text("hero_title").notNull().default(""),
  heroSubtitle: text("hero_subtitle").notNull().default(""),
  homeIntro: text("home_intro").notNull().default(""),
  aboutBody: text("about_body").notNull().default(""),
  awardsText: text("awards_text").notNull().default(""),
  largeOrderPolicy: text("large_order_policy").notNull().default(""),
  bannerText: text("banner_text").notNull().default(""),
  bannerEnabled: integer("banner_enabled", { mode: "boolean" })
    .notNull()
    .default(false),
  bannerStart: text("banner_start"),
  bannerEnd: text("banner_end"),
  // JSON-encoded text columns
  social: text("social").notNull().default("{}"),
  badges: text("badges").notNull().default("[]"),
  videoUrls: text("video_urls").notNull().default("[]"),
  updatedAt: text("updated_at").notNull().default(""),
});

/** Regular weekly hours — one row per day (0 = Sunday … 6 = Saturday). */
export const hours = sqliteTable("hours", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  dayOfWeek: integer("day_of_week").notNull(),
  isClosed: integer("is_closed", { mode: "boolean" }).notNull().default(false),
  openTime: text("open_time").notNull().default("06:00"),
  closeTime: text("close_time").notNull().default("23:00"),
});

/** Holiday / special one-off hours that override the weekly schedule. */
export const specialHours = sqliteTable("special_hours", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  date: text("date").notNull(), // YYYY-MM-DD
  label: text("label").notNull().default(""),
  isClosed: integer("is_closed", { mode: "boolean" }).notNull().default(false),
  openTime: text("open_time"),
  closeTime: text("close_time"),
  note: text("note"),
});

/** Menu groupings. `type` separates the Donuts page from the Beverages page. */
export const menuCategories = sqliteTable("menu_categories", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  type: text("type").notNull().default("donut"), // 'donut' | 'beverage'
  name: text("name").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  visible: integer("visible", { mode: "boolean" }).notNull().default(true),
});

/** Individual menu/service items. Price is free-form text and optional. */
export const menuItems = sqliteTable("menu_items", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  categoryId: integer("category_id").notNull(),
  name: text("name").notNull(),
  description: text("description"),
  price: text("price"), // optional, free-form e.g. "1.25" or "6 for $5"
  seasonal: integer("seasonal", { mode: "boolean" }).notNull().default(false),
  sortOrder: integer("sort_order").notNull().default(0),
  visible: integer("visible", { mode: "boolean" }).notNull().default(true),
  imageKey: text("image_key"), // R2 object key, optional
});

/** Owner-uploaded gallery photos (stored in R2, referenced by key). */
export const galleryImages = sqliteTable("gallery_images", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  r2Key: text("r2_key").notNull(),
  altText: text("alt_text").notNull().default(""),
  caption: text("caption"),
  sortOrder: integer("sort_order").notNull().default(0),
  visible: integer("visible", { mode: "boolean" }).notNull().default(true),
});

/** Flexible "featured" promo blocks for the home page. */
export const featuredSections = sqliteTable("featured_sections", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  body: text("body"),
  imageKey: text("image_key"),
  linkHref: text("link_href"),
  linkLabel: text("link_label"),
  sortOrder: integer("sort_order").notNull().default(0),
  visible: integer("visible", { mode: "boolean" }).notNull().default(true),
});

/** Admin accounts (single owner expected). Password hashed with PBKDF2. */
export const adminUsers = sqliteTable("admin_users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: text("created_at").notNull().default(""),
  updatedAt: text("updated_at").notNull().default(""),
});

export type SettingsRow = typeof settings.$inferSelect;
export type HoursRow = typeof hours.$inferSelect;
export type SpecialHoursRow = typeof specialHours.$inferSelect;
export type MenuCategoryRow = typeof menuCategories.$inferSelect;
export type MenuItemRow = typeof menuItems.$inferSelect;
export type GalleryImageRow = typeof galleryImages.$inferSelect;
export type FeaturedSectionRow = typeof featuredSections.$inferSelect;
export type AdminUserRow = typeof adminUsers.$inferSelect;
