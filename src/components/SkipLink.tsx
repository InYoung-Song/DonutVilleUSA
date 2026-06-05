/** Keyboard-only "skip to content" link; visible only when focused. */
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-cocoa focus:px-4 focus:py-2 focus:font-semibold focus:text-cream"
    >
      Skip to content
    </a>
  );
}
