"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "./actions";

const initial: LoginState = { error: "" };

export function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, initial);

  return (
    <form action={action} className="space-y-4">
      {state.error && (
        <p
          role="alert"
          className="rounded-lg bg-berry-100 px-3 py-2 text-sm font-semibold text-berry-600"
        >
          {state.error}
        </p>
      )}

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-semibold text-cocoa"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="username"
          className="mt-1 w-full rounded-lg border border-cream-200 bg-white px-3 py-2 text-cocoa focus:border-berry focus:outline-none"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-semibold text-cocoa"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="mt-1 w-full rounded-lg border border-cream-200 bg-white px-3 py-2 text-cocoa focus:border-berry focus:outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-berry px-5 py-2.5 font-semibold text-cream shadow-sm transition-colors hover:bg-berry-600 disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
