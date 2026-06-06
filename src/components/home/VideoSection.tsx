import { Container } from "../ui/Container";
import { LiteYouTube } from "../LiteYouTube";
import { parseYouTube, watchUrl } from "@/lib/youtube";

/**
 * A single, intentional video section with a lazy, privacy-friendly embed.
 * Falls back to a plain watch link if the embed is blocked or fails.
 */
export function VideoSection({
  urls,
  youtube,
}: {
  urls: string[];
  youtube?: string;
}) {
  const url = urls.find(Boolean) || youtube;
  if (!url) return null;
  const ref = parseYouTube(url);

  return (
    <section className="bg-cream-100 py-14 sm:py-16">
      <Container className="flex flex-col items-center text-center">
        <h2 className="text-3xl font-bold text-cocoa">See us in action</h2>
        <p className="mt-2 max-w-xl text-cocoa-700">
          A peek behind the counter at Donutville.
        </p>
        <div className="mt-8 w-full max-w-2xl">
          <LiteYouTube url={url} title="Donutville U.S.A." />
          <a
            href={ref ? watchUrl(ref) : url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-sm font-semibold text-berry hover:underline"
          >
            Watch on YouTube →
          </a>
        </div>
      </Container>
    </section>
  );
}
