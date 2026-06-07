import { Trash2 } from "lucide-react";
import { getWeeklyHours, getSpecialHours } from "@/db/queries";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminForm } from "@/components/admin/AdminForm";
import { TextField, TextAreaField, CheckboxField } from "@/components/admin/fields";
import { DAY_NAMES } from "@/lib/content-types";
import { formatTime } from "@/lib/hours";
import { saveWeeklyHours, createSpecialHour, removeSpecialHour } from "./actions";

export const dynamic = "force-dynamic";

export default async function HoursEditor() {
  const [weekly, special] = await Promise.all([
    getWeeklyHours(),
    getSpecialHours(),
  ]);

  return (
    <div className="space-y-12">
      <div>
        <AdminPageHeader
          title="Hours"
          description="Set your regular weekly hours and any holiday or special days."
        />

        <h2 className="font-display text-lg font-bold text-cocoa">
          Weekly hours
        </h2>
        <AdminForm action={saveWeeklyHours} submitLabel="Save weekly hours">
          <div className="mt-3 space-y-2">
            {DAY_NAMES.map((name, d) => {
              const day = weekly[d];
              return (
                <div
                  key={d}
                  className="grid grid-cols-[7rem_auto_1fr_1fr] items-center gap-3 rounded-lg border border-cream-200 bg-cream px-3 py-2"
                >
                  <span className="font-semibold text-cocoa">{name}</span>
                  <label className="flex items-center gap-2 text-sm text-cocoa-700">
                    <input
                      type="checkbox"
                      name={`closed_${d}`}
                      defaultChecked={day.isClosed}
                      className="h-4 w-4 rounded border-cream-200 text-berry focus:ring-berry"
                    />
                    Closed
                  </label>
                  <input
                    type="time"
                    name={`open_${d}`}
                    defaultValue={day.openTime}
                    aria-label={`${name} open time`}
                    className="rounded-lg border border-cream-200 bg-cream px-2 py-1.5 text-cocoa focus:border-berry focus:outline-none"
                  />
                  <input
                    type="time"
                    name={`close_${d}`}
                    defaultValue={day.closeTime}
                    aria-label={`${name} close time`}
                    className="rounded-lg border border-cream-200 bg-cream px-2 py-1.5 text-cocoa focus:border-berry focus:outline-none"
                  />
                </div>
              );
            })}
          </div>
        </AdminForm>
      </div>

      <div>
        <h2 className="font-display text-lg font-bold text-cocoa">
          Holiday & special days
        </h2>
        <p className="mt-1 text-sm text-cocoa-700">
          These override the weekly hours on a specific date.
        </p>

        {special.length > 0 && (
          <ul className="mt-4 space-y-2">
            {special.map((s) => (
              <li
                key={s.id}
                className="flex items-center justify-between gap-3 rounded-lg border border-cream-200 bg-cream px-3 py-2 text-sm"
              >
                <span className="text-cocoa-700">
                  <span className="font-semibold text-cocoa">{s.date}</span>
                  {s.label ? ` · ${s.label}` : ""}:{" "}
                  {s.isClosed
                    ? "Closed"
                    : `${formatTime(s.openTime)} – ${formatTime(s.closeTime)}`}
                  {s.note ? ` · ${s.note}` : ""}
                </span>
                <form action={removeSpecialHour}>
                  <input type="hidden" name="id" value={s.id} />
                  <button
                    type="submit"
                    aria-label={`Delete ${s.date} special hours`}
                    className="rounded-full p-1.5 text-berry-600 hover:bg-berry-100"
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                  </button>
                </form>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-6 rounded-2xl border border-cream-200 bg-cream p-5">
          <h3 className="font-semibold text-cocoa">Add a special day</h3>
          <div className="mt-3">
            <AdminForm action={createSpecialHour} submitLabel="Add special day">
              <div className="grid gap-4 sm:grid-cols-2">
                <TextField label="Date" name="date" type="date" required />
                <TextField
                  label="Label"
                  name="label"
                  placeholder="e.g. July 4th"
                />
              </div>
              <CheckboxField label="Closed all day" name="closed" />
              <div className="grid gap-4 sm:grid-cols-2">
                <TextField label="Open" name="open" type="time" />
                <TextField label="Close" name="close" type="time" />
              </div>
              <TextAreaField
                label="Note (optional)"
                name="note"
                rows={2}
                placeholder="e.g. Closing early for the holiday"
              />
            </AdminForm>
          </div>
        </div>
      </div>
    </div>
  );
}
