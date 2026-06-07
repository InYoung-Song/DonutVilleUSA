/** Decorative frosted-donut mark used in the logo wordmark and menu cards. */
export function DonutMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="12" cy="12" r="10" fill="#E23A5E" />
      <circle cx="12" cy="12" r="3.6" fill="#FFF8F0" />
      <g strokeWidth="1.4" strokeLinecap="round">
        <line x1="7" y1="8" x2="8.4" y2="9" stroke="#FBE6C9" />
        <line x1="15.2" y1="7.6" x2="16.1" y2="9" stroke="#4AA3DF" />
        <line x1="8" y1="15.4" x2="9" y2="16.4" stroke="#E8A33D" />
        <line x1="16" y1="15" x2="17" y2="16" stroke="#FFF8F0" />
        <line x1="12" y1="4.6" x2="12.6" y2="6" stroke="#4AA3DF" />
      </g>
    </svg>
  );
}

/** Brand wordmark: fixed identity, not data-driven. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <DonutMark className="h-8 w-8 shrink-0" />
      <span className="font-display text-xl font-bold leading-none text-cocoa">
        Donutville <span className="text-berry">U.S.A.</span>
      </span>
    </span>
  );
}
