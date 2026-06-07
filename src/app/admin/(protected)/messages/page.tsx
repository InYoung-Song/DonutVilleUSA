import { CalendarDays, Mail, Phone } from "lucide-react";
import { getContactSubmissionsAdmin } from "@/db/queries";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { formatPhoneDisplay, telHref } from "@/lib/format";

export const dynamic = "force-dynamic";

function formatSubmittedAt(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Date unavailable";
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export default async function MessagesPage() {
  const messages = await getContactSubmissionsAdmin();

  return (
    <div>
      <AdminPageHeader
        title="Messages"
        description="Contact form submissions from the public site."
      />

      {messages.length === 0 ? (
        <p className="rounded-2xl border border-cream-200 bg-cream p-5 text-cocoa-700">
          No messages yet.
        </p>
      ) : (
        <ul className="space-y-4">
          {messages.map((m) => {
            const phoneHref = telHref(m.phone);
            const phoneLabel = formatPhoneDisplay(m.phone);
            return (
              <li key={m.id}>
                <article className="motion-card rounded-2xl border border-cream-200 bg-cream p-5 shadow-sm">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h2 className="font-display text-xl font-bold text-cocoa">
                        {m.name}
                      </h2>
                      <p className="mt-1 inline-flex rounded-full bg-berry-100 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-berry-600">
                        {m.subject}
                      </p>
                    </div>
                    <p className="inline-flex items-center gap-1.5 text-sm text-cocoa-500">
                      <CalendarDays className="h-4 w-4" aria-hidden="true" />
                      {formatSubmittedAt(m.createdAt)}
                    </p>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-cocoa-700">
                    <a
                      href={`mailto:${m.email}`}
                      className="inline-flex items-center gap-2 font-semibold hover:text-berry"
                    >
                      <Mail className="h-4 w-4" aria-hidden="true" />
                      {m.email}
                    </a>
                    {phoneHref && (
                      <a
                        href={phoneHref}
                        className="inline-flex items-center gap-2 font-semibold hover:text-berry"
                      >
                        <Phone className="h-4 w-4" aria-hidden="true" />
                        {phoneLabel}
                      </a>
                    )}
                  </div>

                  <p className="mt-4 whitespace-pre-line text-cocoa-700">
                    {m.message}
                  </p>
                </article>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
