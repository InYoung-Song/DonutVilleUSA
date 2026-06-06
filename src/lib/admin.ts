/** Shared result shape for admin server actions (used with useActionState). */
export interface ActionState {
  ok: boolean;
  message: string;
}

export const idleState: ActionState = { ok: false, message: "" };

export function ok(message = "Saved!"): ActionState {
  return { ok: true, message };
}

export function fail(message: string): ActionState {
  return { ok: false, message };
}

/** Read a trimmed string from FormData. */
export function str(form: FormData, key: string): string {
  return String(form.get(key) ?? "").trim();
}

/** Read a checkbox ("on" when checked) from FormData. */
export function bool(form: FormData, key: string): boolean {
  return form.get(key) != null;
}

/** Read an integer, falling back to `dflt`. */
export function int(form: FormData, key: string, dflt = 0): number {
  const n = parseInt(String(form.get(key) ?? ""), 10);
  return Number.isFinite(n) ? n : dflt;
}
