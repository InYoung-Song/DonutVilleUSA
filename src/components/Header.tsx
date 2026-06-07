"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { OpenNowBadge } from "./OpenNowBadge";
import { ThemeToggle } from "./ThemeToggle";
import { NAV_LINKS } from "@/lib/nav";
import { telHref } from "@/lib/format";
import type { DayHours, SpecialHour } from "@/lib/content-types";

export function Header({
  phone,
  weekly,
  special,
}: {
  phone: string;
  weekly: DayHours[];
  special: SpecialHour[];
}) {
  const [open, setOpen] = useState(false);
  const tel = telHref(phone);

  const callBtn = (full = false) =>
    tel ? (
      <a
        href={tel}
        className={`inline-flex items-center justify-center gap-2 rounded-full bg-berry px-4 py-2 text-sm font-semibold text-cream shadow-sm transition-colors hover:bg-berry-600 ${
          full ? "w-full" : ""
        }`}
      >
        <Phone className="h-4 w-4" aria-hidden="true" />
        Call us
      </a>
    ) : null;

  return (
    <header className="sticky top-0 z-40 border-b border-cream-200 bg-cream/95 backdrop-blur supports-[backdrop-filter]:bg-cream/80">
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3"
      >
        <Link href="/" className="shrink-0" aria-label="Donutville U.S.A. home">
          <Logo />
        </Link>

        <ul className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="font-semibold text-cocoa-700 transition-colors hover:text-berry"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-4 md:flex">
          <OpenNowBadge weekly={weekly} special={special} />
          <ThemeToggle />
          {callBtn()}
        </div>

        <div className="ml-auto md:hidden">
          <ThemeToggle />
        </div>

        <button
          type="button"
          className="rounded-md p-2 text-cocoa md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="border-t border-cream-200 bg-cream md:hidden"
        >
          <ul className="flex flex-col px-4 py-2">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 font-semibold text-cocoa-700 transition-colors hover:text-berry"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3 border-t border-cream-200 px-4 py-4">
            <OpenNowBadge weekly={weekly} special={special} />
            {callBtn(true)}
          </div>
        </div>
      )}
    </header>
  );
}
