import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Logo } from "@/components/Logo";
import { getCurrentUser } from "@/lib/auth";
import { LoginForm } from "./LoginForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Owner Sign In",
  robots: { index: false, follow: false },
};

export default async function LoginPage() {
  if (await getCurrentUser()) redirect("/admin");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-cream-100 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-cream-200 bg-cream p-8 shadow-sm">
        <div className="flex flex-col items-center text-center">
          <Logo />
          <h1 className="mt-5 text-2xl font-bold text-cocoa">Owner sign in</h1>
          <p className="mt-1 text-sm text-cocoa-500">
            Manage your site content.
          </p>
        </div>
        <div className="mt-6">
          <LoginForm />
        </div>
      </div>
      <Link
        href="/"
        className="mt-6 text-sm font-semibold text-cocoa-700 hover:text-berry"
      >
        ← Back to the site
      </Link>
    </main>
  );
}
