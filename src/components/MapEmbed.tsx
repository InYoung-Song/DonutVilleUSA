/**
 * Lazy Google Maps iframe with a graceful fallback: if there's no embed URL we
 * render nothing here and rely on the always-present "Get directions" link.
 */
export function MapEmbed({
  src,
  title,
  className = "",
}: {
  src: string;
  title: string;
  className?: string;
}) {
  if (!src) return null;
  return (
    <iframe
      src={src}
      title={title}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
      className={`h-full min-h-[300px] w-full border-0 ${className}`}
    />
  );
}
