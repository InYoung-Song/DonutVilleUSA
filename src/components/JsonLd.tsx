/** Renders a JSON-LD <script> for structured data. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Structured data is server-generated from trusted settings.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
