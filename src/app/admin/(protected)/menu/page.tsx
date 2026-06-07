import { Trash2 } from "lucide-react";
import { getMenuAdmin } from "@/db/queries";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminForm } from "@/components/admin/AdminForm";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { TextField, SelectField } from "@/components/admin/fields";
import type { MenuCategoryRow, MenuItemRow } from "@/db/schema";
import {
  createCategory,
  editCategory,
  removeCategory,
  createItem,
  editItem,
  removeItem,
} from "./actions";

export const dynamic = "force-dynamic";

const TYPE_OPTIONS = [
  { value: "donut", label: "Donuts" },
  { value: "beverage", label: "Beverages" },
];

const inputCls =
  "rounded-lg border border-cream-200 bg-cream px-2 py-1.5 text-sm text-cocoa focus:border-berry focus:outline-none";

type CatOption = { value: string; label: string };

function ItemRow({
  item,
  categoryOptions,
}: {
  item: MenuItemRow;
  categoryOptions: CatOption[];
}) {
  return (
    <form
      action={editItem}
      className="flex flex-wrap items-center gap-2 rounded-lg border border-cream-200 bg-cream p-2"
    >
      <input type="hidden" name="id" value={item.id} />
      <input type="hidden" name="sortOrder" value={item.sortOrder} />
      <input
        name="name"
        defaultValue={item.name}
        aria-label="Item name"
        className={`${inputCls} min-w-40 flex-1`}
      />
      <input
        name="price"
        defaultValue={item.price ?? ""}
        placeholder="price"
        aria-label="Price"
        className={`${inputCls} w-24`}
      />
      <select
        name="categoryId"
        defaultValue={String(item.categoryId)}
        aria-label="Category"
        className={inputCls}
      >
        {categoryOptions.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <label className="flex items-center gap-1 text-xs text-cocoa-700">
        <input
          type="checkbox"
          name="seasonal"
          defaultChecked={item.seasonal}
          className="h-4 w-4 rounded border-cream-200 text-berry"
        />
        Seasonal
      </label>
      <label className="flex items-center gap-1 text-xs text-cocoa-700">
        <input
          type="checkbox"
          name="visible"
          defaultChecked={item.visible}
          className="h-4 w-4 rounded border-cream-200 text-berry"
        />
        Show
      </label>
      <SubmitButton>Save</SubmitButton>
      <button
        type="submit"
        formAction={removeItem}
        aria-label={`Delete ${item.name}`}
        className="rounded-full p-1.5 text-berry-600 hover:bg-berry-100"
      >
        <Trash2 className="h-4 w-4" aria-hidden="true" />
      </button>
    </form>
  );
}

function CategoryCard({
  category,
  items,
  categoryOptions,
}: {
  category: MenuCategoryRow;
  items: MenuItemRow[];
  categoryOptions: CatOption[];
}) {
  return (
    <section className="rounded-2xl border border-cream-200 bg-cream p-5">
      {/* Category header / edit */}
      <form
        action={editCategory}
        className="flex flex-wrap items-end gap-3 border-b border-cream-200 pb-4"
      >
        <input type="hidden" name="id" value={category.id} />
        <div className="flex-1">
          <label className="block text-xs font-semibold text-cocoa-500">
            Category name
          </label>
          <input
            name="name"
            defaultValue={category.name}
            className={`${inputCls} mt-1 w-full`}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-cocoa-500">
            Section
          </label>
          <select
            name="type"
            defaultValue={category.type}
            className={`${inputCls} mt-1`}
          >
            {TYPE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-cocoa-500">
            Order
          </label>
          <input
            name="sortOrder"
            type="number"
            defaultValue={category.sortOrder}
            className={`${inputCls} mt-1 w-20`}
          />
        </div>
        <label className="flex items-center gap-1 pb-2 text-xs text-cocoa-700">
          <input
            type="checkbox"
            name="visible"
            defaultChecked={category.visible}
            className="h-4 w-4 rounded border-cream-200 text-berry"
          />
          Show
        </label>
        <SubmitButton>Save</SubmitButton>
        <button
          type="submit"
          formAction={removeCategory}
          className="pb-1 text-sm font-semibold text-berry-600 hover:underline"
        >
          Delete section
        </button>
      </form>

      {/* Items */}
      <div className="mt-4 space-y-2">
        {items.length === 0 ? (
          <p className="text-sm text-cocoa-500">No items yet.</p>
        ) : (
          items.map((item) => (
            <ItemRow
              key={item.id}
              item={item}
              categoryOptions={categoryOptions}
            />
          ))
        )}
      </div>

      {/* Add item to this category */}
      <details className="mt-4">
        <summary className="cursor-pointer text-sm font-semibold text-berry">
          + Add an item
        </summary>
        <div className="mt-3">
          <AdminForm action={createItem} submitLabel="Add item">
            <input type="hidden" name="categoryId" value={category.id} />
            <div className="grid gap-3 sm:grid-cols-2">
              <TextField label="Name" name="name" />
              <TextField label="Price (optional)" name="price" />
            </div>
            <TextField label="Description (optional)" name="description" />
            <label className="flex items-center gap-2 text-sm text-cocoa-700">
              <input
                type="checkbox"
                name="seasonal"
                className="h-4 w-4 rounded border-cream-200 text-berry"
              />
              Seasonal item
            </label>
          </AdminForm>
        </div>
      </details>
    </section>
  );
}

export default async function MenuEditor() {
  const { categories, items } = await getMenuAdmin();
  const categoryOptions: CatOption[] = categories.map((c) => ({
    value: String(c.id),
    label: c.name,
  }));

  return (
    <div className="space-y-10">
      <div>
        <AdminPageHeader
          title="Menu"
          description="Organize your donuts and beverages into sections, and edit items and prices."
        />
        <div className="rounded-2xl border border-cream-200 bg-cream p-5">
          <h2 className="font-semibold text-cocoa">Add a section</h2>
          <div className="mt-3">
            <AdminForm action={createCategory} submitLabel="Add section">
              <div className="grid gap-3 sm:grid-cols-3">
                <TextField label="Name" name="name" />
                <SelectField label="Section" name="type" options={TYPE_OPTIONS} />
                <TextField label="Order" name="sortOrder" type="number" />
              </div>
            </AdminForm>
          </div>
        </div>
      </div>

      {categories.length === 0 ? (
        <p className="text-cocoa-700">
          No sections yet. Add one above to get started.
        </p>
      ) : (
        <div className="space-y-6">
          {categories.map((c) => (
            <CategoryCard
              key={c.id}
              category={c}
              items={items.filter((i) => i.categoryId === c.id)}
              categoryOptions={categoryOptions}
            />
          ))}
        </div>
      )}
    </div>
  );
}
