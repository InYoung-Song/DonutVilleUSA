import { Trophy } from "lucide-react";
import { Container } from "../ui/Container";

/** Slim award ribbon. Hidden entirely if the owner clears the awards text. */
export function AwardsStrip({ text }: { text: string }) {
  if (!text.trim()) return null;
  return (
    <div className="bg-cocoa text-cream">
      <Container className="flex items-center justify-center gap-3 py-3 text-center text-sm font-semibold">
        <Trophy className="h-5 w-5 shrink-0 text-caramel" aria-hidden="true" />
        <span>{text}</span>
      </Container>
    </div>
  );
}
