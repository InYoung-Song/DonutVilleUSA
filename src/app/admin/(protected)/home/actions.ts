"use server";

import { updateSettings } from "@/db/mutations";
import { revalidatePublic } from "@/lib/revalidate";
import { type ActionState, ok, fail, str } from "@/lib/admin";

export async function saveHome(
  _prev: ActionState,
  form: FormData,
): Promise<ActionState> {
  try {
    await updateSettings({
      tagline: str(form, "tagline"),
      heroTitle: str(form, "heroTitle"),
      heroSubtitle: str(form, "heroSubtitle"),
      homeIntro: str(form, "homeIntro"),
      aboutBody: str(form, "aboutBody"),
      awardsText: str(form, "awardsText"),
    });
    revalidatePublic();
  } catch (err) {
    console.error("saveHome failed:", err);
    return fail("Couldn’t save — please try again.");
  }
  return ok("Home & About saved.");
}
