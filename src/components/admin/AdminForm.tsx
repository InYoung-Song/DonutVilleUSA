"use client";

import { useActionState } from "react";
import { idleState, type ActionState } from "@/lib/admin";
import { SubmitButton } from "./SubmitButton";

type Action = (state: ActionState, form: FormData) => Promise<ActionState>;

/**
 * Wraps a server action with useActionState and renders a save button + status.
 * Fields are passed as children (server-rendered, uncontrolled), so the form
 * keeps its values on a failed save, with no data loss.
 */
export function AdminForm({
  action,
  children,
  submitLabel,
}: {
  action: Action;
  children: React.ReactNode;
  submitLabel?: string;
}) {
  const [state, formAction] = useActionState(action, idleState);
  return (
    <form action={formAction} className="space-y-5">
      {children}
      <div className="flex items-center gap-3 pt-1">
        <SubmitButton>{submitLabel}</SubmitButton>
        {state.message && (
          <span
            role="status"
            className={`text-sm font-semibold ${
              state.ok ? "text-cocoa-700" : "text-berry"
            }`}
          >
            {state.message}
          </span>
        )}
      </div>
    </form>
  );
}
