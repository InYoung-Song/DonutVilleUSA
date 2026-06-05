import Link from "next/link";
import { ExternalLink, LogOut } from "lucide-react";
import { Logo } from "@/components/Logo";
import { requireUser } from "@/lib/auth";
import { logoutAction } from "../actions";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const user = await requireUser();

  return (
    <div className="flex min-h-screen flex-col bg-cream-100">
      <header className="border-b border-cream-200 bg-cream">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
          <div className="flex items-center gap-3">
            <Link href="/admin" aria-label="Admin home">
              <Logo />
            </Link>
            <span className="rounded-full bg-cocoa px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-cream">
              Admin
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <Link
              href="/"
              target="_blank"
              className="hidden items-center gap-1.5 font-semibold text-cocoa-700 hover:text-berry sm:inline-flex"
            >
              <ExternalLink className="h-4 w-4" aria-hidden="true" /> View site
            </Link>
            <span className="hidden text-cocoa-500 md:inline">{user.email}</span>
            <form action={logoutAction}>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-full border border-cocoa/20 px-3 py-1.5 font-semibold text-cocoa hover:bg-cream-100"
              >
                <LogOut className="h-4 w-4" aria-hidden="true" /> Log out
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
        {children}
      </main>
    </div>
  );
}
