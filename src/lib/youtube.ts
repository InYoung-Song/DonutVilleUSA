export interface YouTubeRef {
  kind: "video" | "playlist";
  id: string;
}

/** Parse a YouTube watch/playlist/short/youtu.be URL into a video/playlist id. */
export function parseYouTube(url: string): YouTubeRef | null {
  if (!url) return null;
  try {
    const u = new URL(url);
    const v = u.searchParams.get("v");
    if (v) return { kind: "video", id: v };

    const list = u.searchParams.get("list");
    if (list) return { kind: "playlist", id: list };

    if (u.hostname.includes("youtu.be")) {
      const id = u.pathname.slice(1);
      if (id) return { kind: "video", id };
    }

    const m = u.pathname.match(/\/(?:embed|shorts)\/([\w-]+)/);
    if (m) return { kind: "video", id: m[1] };

    return null;
  } catch {
    return null;
  }
}

/** Privacy-friendly (no-cookie) embed URL with autoplay on click. */
export function embedSrc(ref: YouTubeRef): string {
  const base = "https://www.youtube-nocookie.com/embed";
  return ref.kind === "playlist"
    ? `${base}/videoseries?list=${ref.id}&autoplay=1&rel=0`
    : `${base}/${ref.id}?autoplay=1&rel=0`;
}

export function watchUrl(ref: YouTubeRef): string {
  return ref.kind === "playlist"
    ? `https://www.youtube.com/playlist?list=${ref.id}`
    : `https://www.youtube.com/watch?v=${ref.id}`;
}

/** Thumbnail for single videos; playlists have none, so we use a branded card. */
export function thumbUrl(ref: YouTubeRef): string | null {
  return ref.kind === "video"
    ? `https://i.ytimg.com/vi/${ref.id}/hqdefault.jpg`
    : null;
}
