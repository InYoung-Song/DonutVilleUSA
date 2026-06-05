import Link from "next/link";

type Variant = "primary" | "secondary" | "ghost" | "light";

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-berry text-cream shadow-sm hover:bg-berry-600",
  secondary: "bg-cocoa text-cream hover:bg-cocoa-700",
  ghost: "border border-cocoa/20 text-cocoa hover:bg-cream-100",
  light: "bg-cream text-cocoa shadow-sm hover:bg-cream-100",
};

/**
 * One button style for internal links, external links, and tel: links.
 * External/tel links render as <a>; internal paths use next/link.
 */
export function ButtonLink({
  href,
  variant = "primary",
  className = "",
  children,
}: {
  href: string;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}) {
  const cls = `${BASE} ${VARIANTS[variant]} ${className}`;
  const isExternal = href.startsWith("http");
  const isPlainAnchor = isExternal || href.startsWith("tel:") || href.startsWith("mailto:");

  if (isPlainAnchor) {
    return (
      <a
        href={href}
        className={cls}
        {...(isExternal
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
