"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { parseYouTube, embedSrc, thumbUrl } from "@/lib/youtube";

/**
 * Lazy YouTube "facade": shows a lightweight poster + play button and only
 * loads the (no-cookie) iframe once the visitor clicks. If the URL can't be
 * parsed, it degrades to a plain watch link.
 */
export function LiteYouTube({
  url,
  title = "Video",
}: {
  url: string;
  title?: string;
}) {
  const ref = parseYouTube(url);
  const [activated, setActivated] = useState(false);
  const [thumbBroken, setThumbBroken] = useState(false);

  if (!ref) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 font-semibold text-berry hover:underline"
      >
        <Play className="h-5 w-5" aria-hidden="true" /> Watch on YouTube
      </a>
    );
  }

  if (activated) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-cocoa">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={embedSrc(ref)}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    );
  }

  const thumb = thumbUrl(ref);
  return (
    <button
      type="button"
      onClick={() => setActivated(true)}
      aria-label={`Play: ${title}`}
      className="group relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-2xl bg-cocoa"
    >
      {thumb && !thumbBroken && (
        // eslint-disable-next-line @next/next/no-img-element -- lightweight facade poster
        <img
          src={thumb}
          alt=""
          loading="lazy"
          onError={() => setThumbBroken(true)}
          className="absolute inset-0 h-full w-full object-cover opacity-90 transition group-hover:opacity-100"
        />
      )}
      <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-berry text-cream shadow-lg transition-transform group-hover:scale-105">
        <Play className="h-7 w-7 translate-x-0.5" aria-hidden="true" />
      </span>
    </button>
  );
}
