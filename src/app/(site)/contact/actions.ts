"use server";

import { revalidatePath } from "next/cache";
import { addContactSubmission } from "@/db/mutations";
import { fail, ok, str, type ActionState } from "@/lib/admin";
import { isEmail } from "@/lib/validation";

const MAX_NAME = 120;
const MAX_CONTACT = 160;
const MAX_SUBJECT = 120;
const MAX_MESSAGE = 2000;

export async function submitContact(
  _prev: ActionState,
  form: FormData,
): Promise<ActionState> {
  const website = str(form, "website");
  if (website) return ok("Thanks, message received.");

  const name = str(form, "name");
  const email = str(form, "email");
  const phone = str(form, "phone");
  const subject = str(form, "subject") || "General question";
  const message = str(form, "message");

  if (!name) return fail("Please enter your name.");
  if (name.length > MAX_NAME) return fail("Please shorten your name.");
  if (!email || !isEmail(email)) return fail("Please enter a valid email.");
  if (email.length > MAX_CONTACT) return fail("Please shorten your email.");
  if (phone.length > MAX_CONTACT) return fail("Please shorten your phone number.");
  if (subject.length > MAX_SUBJECT) return fail("Please shorten the subject.");
  if (message.length < 10) return fail("Please add a little more detail.");
  if (message.length > MAX_MESSAGE) return fail("Please shorten your message.");

  try {
    await addContactSubmission({ name, email, phone, subject, message });
    revalidatePath("/admin/messages");
  } catch (err) {
    console.error("submitContact failed:", err);
    return fail("Could not save your message yet. Please call the shop.");
  }

  return ok("Thanks, message received.");
}
