import { DAY_NAMES_SHORT } from "./content-types";
import type { DayHours, SpecialHour, SiteSettings } from "./content-types";

/** The shop is in Dearborn, MI — compute "open now" in its timezone. */
export const SHOP_TIME_ZONE = "America/Detroit";

export interface ShopNow {
  dayOfWeek: number; // 0 = Sunday … 6 = Saturday
  minutes: number; // minutes since midnight, shop-local
  dateStr: string; // YYYY-MM-DD, shop-local
}

/** Current date/time expressed in the shop's timezone, robust to viewer TZ. */
export function getShopNow(
  date: Date = new Date(),
  timeZone: string = SHOP_TIME_ZONE,
): ShopNow {
  try {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      weekday: "short",
    }).formatToParts(date);
    const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
    let hour = parseInt(get("hour"), 10);
    if (hour === 24) hour = 0; // some runtimes emit "24" at midnight
    const minute = parseInt(get("minute"), 10);
    const wk: Record<string, number> = {
      Sun: 0,
      Mon: 1,
      Tue: 2,
      Wed: 3,
      Thu: 4,
      Fri: 5,
      Sat: 6,
    };
    return {
      dayOfWeek: wk[get("weekday")] ?? date.getDay(),
      minutes: (Number.isFinite(hour) ? hour : 0) * 60 + (minute || 0),
      dateStr: `${get("year")}-${get("month")}-${get("day")}`,
    };
  } catch {
    // Fallback to local time if Intl/timezone data is unavailable.
    return {
      dayOfWeek: date.getDay(),
      minutes: date.getHours() * 60 + date.getMinutes(),
      dateStr: date.toISOString().slice(0, 10),
    };
  }
}

/** Parse "HH:MM" → minutes since midnight, or null if malformed/invalid. */
export function parseTime(hhmm: string | null | undefined): number | null {
  if (!hhmm) return null;
  const m = /^(\d{1,2}):(\d{2})$/.exec(hhmm.trim());
  if (!m) return null;
  const h = Number(m[1]);
  const min = Number(m[2]);
  if (h < 0 || h > 23 || min < 0 || min > 59) return null;
  return h * 60 + min;
}

/** Minutes since midnight → friendly label, e.g. 1380 → "11 PM". */
export function minutesToLabel(mins: number): string {
  const h24 = Math.floor(mins / 60);
  const m = mins % 60;
  const ampm = h24 >= 12 ? "PM" : "AM";
  let h = h24 % 12;
  if (h === 0) h = 12;
  return m === 0
    ? `${h} ${ampm}`
    : `${h}:${String(m).padStart(2, "0")} ${ampm}`;
}

/** "HH:MM" → friendly label, or "" if invalid. */
export function formatTime(hhmm: string | null | undefined): string {
  const mins = parseTime(hhmm);
  return mins == null ? "" : minutesToLabel(mins);
}

export interface EffectiveHours {
  isClosed: boolean;
  open: number | null; // minutes
  close: number | null; // minutes
  label?: string; // special-day label, if any
}

/** Add N days to a YYYY-MM-DD string (calendar math, timezone-agnostic). */
function addDays(dateStr: string, n: number): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  const dt = new Date(Date.UTC(y, (m || 1) - 1, d || 1));
  dt.setUTCDate(dt.getUTCDate() + n);
  return dt.toISOString().slice(0, 10);
}

/**
 * Resolve the effective hours for a specific date: special hours win over the
 * weekly schedule. Invalid ranges (close ≤ open, bad format) are treated as
 * closed so downstream logic never sees a malformed window.
 */
export function getEffectiveHoursForDate(
  weekly: DayHours[],
  special: SpecialHour[],
  dateStr: string,
  dayOfWeek: number,
): EffectiveHours {
  const sp = special.find((s) => s.date === dateStr);
  if (sp) {
    if (sp.isClosed) {
      return { isClosed: true, open: null, close: null, label: sp.label };
    }
    const o = parseTime(sp.openTime);
    const c = parseTime(sp.closeTime);
    if (o != null && c != null && c > o) {
      return { isClosed: false, open: o, close: c, label: sp.label };
    }
    // malformed special → fall through to weekly
  }

  const d = weekly.find((w) => w.dayOfWeek === dayOfWeek);
  if (!d || d.isClosed) return { isClosed: true, open: null, close: null };
  const o = parseTime(d.openTime);
  const c = parseTime(d.closeTime);
  if (o == null || c == null || c <= o) {
    return { isClosed: true, open: null, close: null };
  }
  return { isClosed: false, open: o, close: c };
}

export interface OpenStatus {
  open: boolean;
  label: string; // "Open now" | "Closed"
  detail: string; // "Closes 11 PM" | "Opens 6 AM tomorrow" | …
}

function findNextOpening(
  weekly: DayHours[],
  special: SpecialHour[],
  now: ShopNow,
): string {
  for (let offset = 0; offset <= 7; offset++) {
    const dateStr = offset === 0 ? now.dateStr : addDays(now.dateStr, offset);
    const dow = (now.dayOfWeek + offset) % 7;
    const eff = getEffectiveHoursForDate(weekly, special, dateStr, dow);
    if (!eff.isClosed && eff.open != null) {
      if (offset === 0) {
        if (now.minutes < eff.open) return `Opens ${minutesToLabel(eff.open)}`;
        continue; // already past today's close
      }
      if (offset === 1) return `Opens ${minutesToLabel(eff.open)} tomorrow`;
      return `Opens ${DAY_NAMES_SHORT[dow]} ${minutesToLabel(eff.open)}`;
    }
  }
  return "Call for hours";
}

/** Whether the shop is open right now, with a short human label + detail. */
export function getOpenStatus(
  weekly: DayHours[],
  special: SpecialHour[],
  now: ShopNow = getShopNow(),
): OpenStatus {
  const today = getEffectiveHoursForDate(
    weekly,
    special,
    now.dateStr,
    now.dayOfWeek,
  );
  if (!today.isClosed && today.open != null && today.close != null) {
    if (now.minutes >= today.open && now.minutes < today.close) {
      return {
        open: true,
        label: "Open now",
        detail: `Closes ${minutesToLabel(today.close)}`,
      };
    }
  }
  return {
    open: false,
    label: "Closed",
    detail: findNextOpening(weekly, special, now),
  };
}

export interface HoursLine {
  days: string; // "Mon–Fri" or "Sat"
  hours: string; // "6 AM – 11 PM" or "Closed"
}

/** Collapse the week into compact lines, grouping consecutive equal days. */
export function groupWeeklyHours(weekly: DayHours[]): HoursLine[] {
  const order = [1, 2, 3, 4, 5, 6, 0]; // Mon … Sun
  const label = (dow: number): string => {
    const d = weekly.find((w) => w.dayOfWeek === dow);
    if (!d || d.isClosed) return "Closed";
    const o = parseTime(d.openTime);
    const c = parseTime(d.closeTime);
    if (o == null || c == null || c <= o) return "Closed";
    return `${minutesToLabel(o)} – ${minutesToLabel(c)}`;
  };

  const lines: HoursLine[] = [];
  let start = 0;
  for (let i = 0; i < order.length; i++) {
    const cur = label(order[i]);
    const next = i + 1 < order.length ? label(order[i + 1]) : null;
    if (cur !== next) {
      const a = order[start];
      const b = order[i];
      const days =
        start === i
          ? DAY_NAMES_SHORT[a]
          : `${DAY_NAMES_SHORT[a]}–${DAY_NAMES_SHORT[b]}`;
      lines.push({ days, hours: cur });
      start = i + 1;
    }
  }
  return lines;
}

/** Should the announcement banner show right now? Respects the date window. */
export function isBannerActive(
  settings: Pick<
    SiteSettings,
    "bannerEnabled" | "bannerText" | "bannerStart" | "bannerEnd"
  >,
  now: ShopNow = getShopNow(),
): boolean {
  if (!settings.bannerEnabled || !settings.bannerText.trim()) return false;
  if (settings.bannerStart && now.dateStr < settings.bannerStart) return false;
  if (settings.bannerEnd && now.dateStr > settings.bannerEnd) return false;
  return true;
}
