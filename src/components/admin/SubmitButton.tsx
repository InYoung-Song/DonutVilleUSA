"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton({
  children = "Save changes",
  variant = "primary",
}: {
  children?: React.ReactNode;
  variant?: "primary" | "danger";
}) {
  const { pending } = useFormStatus();
  const cls =
    variant === "danger"
      ? "border border-berry/30 text-berry-600 hover:bg-berry-100"
      : "bg-berry text-cream shadow-sm hover:bg-berry-600";
  return (
    <button
      type="submit"
      disabled={pending}
      className={`inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition-colors disabled:opacity-60 ${cls}`}
    >
      {pending ? "Saving…" : children}
    </button>
  );
}
