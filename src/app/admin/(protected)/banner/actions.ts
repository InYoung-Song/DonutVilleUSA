"use server";

import { updateSettings } from "@/db/mutations";
import { revalidatePublic } from "@/lib/revalidate";
import { type ActionState, ok, fail, str, bool } from "@/lib/admin";
import { isValidDate } from "@/lib/validation";

export async function saveBanner(
  _prev: ActionState,
  form: FormData,
): Promise<ActionState> {
  const bannerText = str(form, "bannerText");
  const bannerEnabled = bool(form, "bannerEnabled");
  const start = str(form, "bannerStart");
  const end = str(form, "bannerEnd");

  if (start && !isValidDate(start)) return fail("Start date is invalid.");
  if (end && !isValidDate(end)) return fail("End date is invalid.");
  if (start && end && start > end)
    return fail("Start date must be on or before the end date.");
  if (bannerEnabled && !bannerText)
    return fail("Add banner text before turning it on.");

  try {
    await updateSettings({
      bannerText,
      bannerEnabled,
      bannerStart: start || null,
      bannerEnd: end || null,
    });
    revalidatePublic();
  } catch (err) {
    console.error("saveBanner failed:", err);
    return fail("Couldn’t save — please try again.");
  }
  return ok("Banner saved.");
}
