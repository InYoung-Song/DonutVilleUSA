"use server";

import { updateSettings } from "@/db/mutations";
import { revalidatePublic } from "@/lib/revalidate";
import { type ActionState, ok, fail, str } from "@/lib/admin";
import { isEmail } from "@/lib/validation";

export async function saveContact(
  _prev: ActionState,
  form: FormData,
): Promise<ActionState> {
  const email = str(form, "email");
  if (email && !isEmail(email)) return fail("That email address looks invalid.");

  try {
    await updateSettings({
      phone: str(form, "phone"),
      email,
      addressLine1: str(form, "addressLine1"),
      city: str(form, "city"),
      state: str(form, "state"),
      zip: str(form, "zip"),
      mapEmbedUrl: str(form, "mapEmbedUrl"),
      largeOrderPolicy: str(form, "largeOrderPolicy"),
    });
    revalidatePublic();
  } catch (err) {
    console.error("saveContact failed:", err);
    return fail("Couldn’t save. Please try again.");
  }
  return ok("Contact & location saved.");
}
