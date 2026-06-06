import Link from "next/link";
import { Logo } from "@/components/Logo";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-cream px-6 text-center">
      <Logo />
      <p className="mt-8 text-sm font-bold uppercase tracking-widest text-berry">
        404
      </p>
      <h1 className="mt-2 text-3xl font-bold text-cocoa">
        We couldn’t find that page
      </h1>
      <p className="mt-3 max-w-md text-cocoa-700">
        The page may have moved. Let’s get you back to the good stuff.
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-full bg-berry px-5 py-2.5 text-sm font-semibold text-cream shadow-sm hover:bg-berry-600"
        >
          Back home
        </Link>
        <Link
          href="/menu"
          className="rounded-full border border-cocoa/20 px-5 py-2.5 text-sm font-semibold text-cocoa hover:bg-cream-100"
        >
          See the menu
        </Link>
      </div>
    </main>
  );
}
