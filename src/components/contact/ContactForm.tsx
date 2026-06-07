"use client";

import { useActionState, useEffect, useRef } from "react";
import { Send } from "lucide-react";
import { useFormStatus } from "react-dom";
import { submitContact } from "@/app/(site)/contact/actions";
import { idleState } from "@/lib/admin";

const fieldClass =
  "mt-1 w-full rounded-lg border border-cream-200 bg-cream px-3 py-2 text-cocoa placeholder:text-cocoa-500 focus:border-berry focus:outline-none";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center gap-2 rounded-full bg-berry px-5 py-2.5 text-sm font-semibold text-cream shadow-sm transition-colors hover:bg-berry-600 disabled:opacity-60"
    >
      <Send className="h-4 w-4" aria-hidden="true" />
      {pending ? "Sending..." : "Send message"}
    </button>
  );
}

export function ContactForm({ className = "" }: { className?: string }) {
  const [state, formAction] = useActionState(submitContact, idleState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.ok) formRef.current?.reset();
  }, [state]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className={`motion-card rounded-2xl border border-cream-200 bg-cream/70 p-5 shadow-sm ${className}`}
    >
      <h2 className="font-display text-xl font-bold text-cocoa">
        Send a message
      </h2>

      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="text-sm font-semibold text-cocoa">
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="text-sm font-semibold text-cocoa">
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className={fieldClass}
          />
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-phone" className="text-sm font-semibold text-cocoa">
            Phone
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="contact-subject" className="text-sm font-semibold text-cocoa">
            Topic
          </label>
          <select
            id="contact-subject"
            name="subject"
            defaultValue="General question"
            className={fieldClass}
          >
            <option>General question</option>
            <option>Large order</option>
            <option>Menu question</option>
            <option>Event or media</option>
          </select>
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="contact-message" className="text-sm font-semibold text-cocoa">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          className={fieldClass}
        />
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <SubmitButton />
        {state.message && (
          <p
            role="status"
            aria-live="polite"
            className={`text-sm font-semibold ${
              state.ok ? "text-cocoa-700" : "text-berry"
            }`}
          >
            {state.message}
          </p>
        )}
      </div>
    </form>
  );
}
