import { getCloudflareContext } from "@opennextjs/cloudflare";

export const dynamic = "force-dynamic";

/** Serves owner-uploaded images from the R2 `MEDIA` bucket with long caching. */
export async function GET(
  _req: Request,
  ctx: { params: Promise<{ key: string[] }> },
): Promise<Response> {
  const { key } = await ctx.params;
  const objectKey = key.join("/");
  try {
    const { env } = getCloudflareContext();
    const obj = await env.MEDIA.get(objectKey);
    if (!obj) return new Response("Not found", { status: 404 });

    const headers = new Headers();
    obj.writeHttpMetadata(headers);
    headers.set("Cache-Control", "public, max-age=31536000, immutable");
    if (obj.httpEtag) headers.set("ETag", obj.httpEtag);
    return new Response(obj.body, { headers });
  } catch (err) {
    console.error("media serve failed:", err);
    return new Response("Error", { status: 500 });
  }
}
