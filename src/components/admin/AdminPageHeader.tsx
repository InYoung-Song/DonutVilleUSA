import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function AdminPageHeader({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-6">
      <Link
        href="/admin"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-cocoa-700 hover:text-berry"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Dashboard
      </Link>
      <h1 className="mt-2 text-2xl font-bold text-cocoa">{title}</h1>
      {description && <p className="mt-1 text-cocoa-700">{description}</p>}
    </div>
  );
}
