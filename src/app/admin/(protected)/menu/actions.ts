"use server";

import {
  addCategory,
  updateCategory,
  deleteCategory,
  addItem,
  updateItem,
  deleteItem,
} from "@/db/mutations";
import { revalidatePublic } from "@/lib/revalidate";
import { type ActionState, ok, fail, str, bool, int } from "@/lib/admin";

function menuType(form: FormData, key: string): "donut" | "beverage" {
  return str(form, key) === "beverage" ? "beverage" : "donut";
}

// ── Categories ───────────────────────────────────────────────────────────────
export async function createCategory(
  _prev: ActionState,
  form: FormData,
): Promise<ActionState> {
  const name = str(form, "name");
  if (!name) return fail("Category name is required.");
  try {
    await addCategory({
      type: menuType(form, "type"),
      name,
      sortOrder: int(form, "sortOrder", 0),
      visible: true,
    });
    revalidatePublic();
  } catch (err) {
    console.error("createCategory failed:", err);
    return fail("Couldn’t add the category.");
  }
  return ok("Category added.");
}

export async function editCategory(form: FormData): Promise<void> {
  const id = int(form, "id");
  const name = str(form, "name");
  if (!id || !name) return;
  await updateCategory(id, {
    type: menuType(form, "type"),
    name,
    sortOrder: int(form, "sortOrder", 0),
    visible: bool(form, "visible"),
  });
  revalidatePublic();
}

export async function removeCategory(form: FormData): Promise<void> {
  const id = int(form, "id");
  if (id) {
    await deleteCategory(id);
    revalidatePublic();
  }
}

// ── Items ────────────────────────────────────────────────────────────────────
export async function createItem(
  _prev: ActionState,
  form: FormData,
): Promise<ActionState> {
  const name = str(form, "name");
  const categoryId = int(form, "categoryId");
  if (!name) return fail("Item name is required.");
  if (!categoryId) return fail("Choose a category.");
  try {
    await addItem({
      categoryId,
      name,
      description: str(form, "description") || null,
      price: str(form, "price") || null,
      seasonal: bool(form, "seasonal"),
      sortOrder: int(form, "sortOrder", 0),
      visible: true,
    });
    revalidatePublic();
  } catch (err) {
    console.error("createItem failed:", err);
    return fail("Couldn’t add the item.");
  }
  return ok("Item added.");
}

export async function editItem(form: FormData): Promise<void> {
  const id = int(form, "id");
  const name = str(form, "name");
  const categoryId = int(form, "categoryId");
  if (!id || !name || !categoryId) return;
  await updateItem(id, {
    categoryId,
    name,
    description: str(form, "description") || null,
    price: str(form, "price") || null,
    seasonal: bool(form, "seasonal"),
    sortOrder: int(form, "sortOrder", 0),
    visible: bool(form, "visible"),
  });
  revalidatePublic();
}

export async function removeItem(form: FormData): Promise<void> {
  const id = int(form, "id");
  if (id) {
    await deleteItem(id);
    revalidatePublic();
  }
}
