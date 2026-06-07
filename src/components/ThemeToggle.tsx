"use client";

import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
      onClick={() => {
        const nextTheme: Theme = document.documentElement.classList.contains(
          "dark",
        )
          ? "light"
          : "dark";
        window.localStorage.setItem("theme", nextTheme);
        applyTheme(nextTheme);
      }}
      className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cocoa/25 text-cocoa transition-colors hover:bg-cream-100 ${className}`}
    >
      <Moon className="h-4 w-4 dark:hidden" aria-hidden="true" />
      <Sun className="hidden h-4 w-4 dark:block" aria-hidden="true" />
    </button>
  );
}
