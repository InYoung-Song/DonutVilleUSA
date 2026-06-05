import { Play } from "lucide-react";
import { Container } from "../ui/Container";

/**
 * Basic "watch our videos" card that links out to the playlist.
 * feat/09 replaces the inner card with a lazy, privacy-friendly embed.
 */
export function VideoSection({
  urls,
  youtube,
}: {
  urls: string[];
  youtube?: string;
}) {
  const link = urls.find(Boolean) || youtube;
  if (!link) return null;

  return (
    <section className="bg-cream-100 py-14 sm:py-16">
      <Container className="flex flex-col items-center text-center">
        <h2 className="text-3xl font-bold text-cocoa">See us in action</h2>
        <p className="mt-2 max-w-xl text-cocoa-700">
          A peek behind the counter at Donutville.
        </p>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-8 flex aspect-video w-full max-w-2xl items-center justify-center rounded-2xl border border-cream-200 bg-cocoa/90 text-cream transition-colors hover:bg-cocoa"
        >
          <span className="flex flex-col items-center gap-3">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-berry text-cream shadow-lg transition-transform group-hover:scale-105">
              <Play className="h-7 w-7 translate-x-0.5" aria-hidden="true" />
            </span>
            <span className="font-semibold">Watch on YouTube</span>
          </span>
        </a>
      </Container>
    </section>
  );
}
