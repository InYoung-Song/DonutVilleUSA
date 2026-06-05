"use server";

import { redirect } from "next/navigation";
import {
  findAdminByEmail,
  verifyPassword,
  createSession,
  setSessionCookie,
} from "@/lib/auth";

export interface LoginState {
  error: string;
}

export async function loginAction(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Enter your email and password." };
  }

  let ok = false;
  try {
    const user = await findAdminByEmail(email);
    // Always run verify against a found hash; generic error avoids user enumeration.
    if (user && (await verifyPassword(password, user.passwordHash))) {
      const token = await createSession(user.id, user.email);
      await setSessionCookie(token);
      ok = true;
    }
  } catch (err) {
    console.error("login failed:", err);
    return { error: "Something went wrong. Please try again." };
  }

  if (!ok) return { error: "Incorrect email or password." };
  redirect("/admin"); // throws NEXT_REDIRECT — kept outside the try/catch
}
