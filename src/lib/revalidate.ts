import { revalidatePath } from "next/cache";

/**
 * Refresh the public site after an admin edit. The site currently renders
 * dynamically (so edits show immediately), but calling this keeps things
 * correct if/when ISR caching is enabled later.
 */
export function revalidatePublic(): void {
  try {
    revalidatePath("/", "layout");
  } catch {
    // revalidation is best-effort; never fail a save because of it
  }
}
