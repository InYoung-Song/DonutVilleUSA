"use server";

import {
  replaceWeeklyHours,
  addSpecialHour,
  deleteSpecialHour,
  type WeeklyDayInput,
} from "@/db/mutations";
import { revalidatePublic } from "@/lib/revalidate";
import { type ActionState, ok, fail, str, bool, int } from "@/lib/admin";
import {
  isValidTime,
  isValidDate,
  timeToMinutes,
  normalizeTime,
} from "@/lib/validation";
import { DAY_NAMES } from "@/lib/content-types";

export async function saveWeeklyHours(
  _prev: ActionState,
  form: FormData,
): Promise<ActionState> {
  const days: WeeklyDayInput[] = [];
  for (let d = 0; d < 7; d++) {
    const isClosed = bool(form, `closed_${d}`);
    let openTime = normalizeTime(str(form, `open_${d}`));
    let closeTime = normalizeTime(str(form, `close_${d}`));
    if (!isClosed) {
      if (!isValidTime(openTime) || !isValidTime(closeTime)) {
        return fail(`Enter valid open and close times for ${DAY_NAMES[d]}.`);
      }
      if (timeToMinutes(closeTime) <= timeToMinutes(openTime)) {
        return fail(`${DAY_NAMES[d]}: close time must be after open time.`);
      }
    } else {
      openTime = openTime || "06:00";
      closeTime = closeTime || "23:00";
    }
    days.push({ dayOfWeek: d, isClosed, openTime, closeTime });
  }

  try {
    await replaceWeeklyHours(days);
    revalidatePublic();
  } catch (err) {
    console.error("saveWeeklyHours failed:", err);
    return fail("Couldn’t save. Please try again.");
  }
  return ok("Weekly hours saved.");
}

export async function createSpecialHour(
  _prev: ActionState,
  form: FormData,
): Promise<ActionState> {
  const date = str(form, "date");
  if (!isValidDate(date)) return fail("Pick a valid date.");

  const isClosed = bool(form, "closed");
  let openTime: string | null = null;
  let closeTime: string | null = null;
  if (!isClosed) {
    const o = normalizeTime(str(form, "open"));
    const c = normalizeTime(str(form, "close"));
    if (!isValidTime(o) || !isValidTime(c)) {
      return fail("Enter valid open and close times, or mark the day closed.");
    }
    if (timeToMinutes(c) <= timeToMinutes(o)) {
      return fail("Close time must be after open time.");
    }
    openTime = o;
    closeTime = c;
  }

  try {
    await addSpecialHour({
      date,
      label: str(form, "label"),
      isClosed,
      openTime,
      closeTime,
      note: str(form, "note") || null,
    });
    revalidatePublic();
  } catch (err) {
    console.error("createSpecialHour failed:", err);
    return fail("Couldn’t add. Please try again.");
  }
  return ok("Special day added.");
}

export async function removeSpecialHour(form: FormData): Promise<void> {
  const id = int(form, "id", 0);
  if (id) {
    await deleteSpecialHour(id);
    revalidatePublic();
  }
}
