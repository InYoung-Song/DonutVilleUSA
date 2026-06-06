// Lightweight, dependency-light validators shared by admin server actions.

export const TIME_RE = /^([01]?\d|2[0-3]):[0-5]\d$/; // 24h HH:MM
export const DATE_RE = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD
const URL_RE = /^https?:\/\/.+/i;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidTime(s: string): boolean {
  return TIME_RE.test(s.trim());
}

export function isValidDate(s: string): boolean {
  return DATE_RE.test(s.trim());
}

export function timeToMinutes(s: string): number {
  const [h, m] = s.split(":").map(Number);
  return h * 60 + m;
}

export function isUrl(s: string): boolean {
  return URL_RE.test(s.trim());
}

export function isEmail(s: string): boolean {
  return EMAIL_RE.test(s.trim());
}

/** Normalize "HH:MM" to a zero-padded form (e.g. "6:0" → "06:00"). */
export function normalizeTime(s: string): string {
  const m = /^(\d{1,2}):(\d{1,2})$/.exec(s.trim());
  if (!m) return s.trim();
  return `${m[1].padStart(2, "0")}:${m[2].padStart(2, "0")}`;
}
