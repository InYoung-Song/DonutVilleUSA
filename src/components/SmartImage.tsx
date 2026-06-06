"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

/**
 * next/image wrapper that degrades gracefully: if the image 404s or fails to
 * load, it renders a branded placeholder instead of a broken-image icon.
 * Owner-uploaded photos (served from R2 via /media) pass `unoptimized`.
 */
export function SmartImage({
  alt,
  fallbackLabel = "Image unavailable",
  className,
  ...props
}: ImageProps & { fallbackLabel?: string }) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div
        role="img"
        aria-label={typeof alt === "string" ? alt : fallbackLabel}
        className={`flex items-center justify-center bg-cream-100 text-sm text-cocoa-500 ${className ?? ""}`}
      >
        {fallbackLabel}
      </div>
    );
  }

  return (
    <Image
      alt={alt}
      className={className}
      onError={() => setErrored(true)}
      {...props}
    />
  );
}
