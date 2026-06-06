import "server-only";
import { eq } from "drizzle-orm";
import { getDb } from "./client";
import * as schema from "./schema";

type SettingsInsert = typeof schema.settings.$inferInsert;

/** Upsert the single settings row (id = 1) with a partial set of fields. */
export async function updateSettings(
  values: Partial<SettingsInsert>,
): Promise<void> {
  const db = getDb();
  const updatedAt = new Date().toISOString();
  await db
    .insert(schema.settings)
    .values({ id: 1, ...values, updatedAt })
    .onConflictDoUpdate({
      target: schema.settings.id,
      set: { ...values, updatedAt },
    });
}

export interface WeeklyDayInput {
  dayOfWeek: number;
  isClosed: boolean;
  openTime: string;
  closeTime: string;
}

/** Replace the whole weekly schedule (7 rows). */
export async function replaceWeeklyHours(
  days: WeeklyDayInput[],
): Promise<void> {
  const db = getDb();
  await db.delete(schema.hours);
  if (days.length) await db.insert(schema.hours).values(days);
}

export interface SpecialHourInput {
  date: string;
  label: string;
  isClosed: boolean;
  openTime: string | null;
  closeTime: string | null;
  note: string | null;
}

export async function addSpecialHour(v: SpecialHourInput): Promise<void> {
  await getDb().insert(schema.specialHours).values(v);
}

export async function deleteSpecialHour(id: number): Promise<void> {
  await getDb().delete(schema.specialHours).where(eq(schema.specialHours.id, id));
}

// ── Menu categories ──────────────────────────────────────────────────────────
export interface CategoryInput {
  type: "donut" | "beverage";
  name: string;
  sortOrder: number;
  visible: boolean;
}

export async function addCategory(v: CategoryInput): Promise<void> {
  await getDb().insert(schema.menuCategories).values(v);
}

export async function updateCategory(
  id: number,
  v: CategoryInput,
): Promise<void> {
  await getDb()
    .update(schema.menuCategories)
    .set(v)
    .where(eq(schema.menuCategories.id, id));
}

export async function deleteCategory(id: number): Promise<void> {
  const db = getDb();
  await db.delete(schema.menuItems).where(eq(schema.menuItems.categoryId, id));
  await db.delete(schema.menuCategories).where(eq(schema.menuCategories.id, id));
}

// ── Menu items ───────────────────────────────────────────────────────────────
export interface ItemInput {
  categoryId: number;
  name: string;
  description: string | null;
  price: string | null;
  seasonal: boolean;
  sortOrder: number;
  visible: boolean;
}

export async function addItem(v: ItemInput): Promise<void> {
  await getDb().insert(schema.menuItems).values(v);
}

export async function updateItem(id: number, v: ItemInput): Promise<void> {
  await getDb()
    .update(schema.menuItems)
    .set(v)
    .where(eq(schema.menuItems.id, id));
}

export async function deleteItem(id: number): Promise<void> {
  await getDb().delete(schema.menuItems).where(eq(schema.menuItems.id, id));
}
