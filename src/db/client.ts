import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

let db: PostgresJsDatabase<typeof schema> | undefined;

/**
 * Returns a Drizzle client bound to the Supabase/Postgres database.
 *
 * Uses a module-level singleton so warm serverless invocations reuse one
 * connection. `prepare: false` is required for the Supabase transaction pooler.
 * Throws if DATABASE_URL is unset, which the query layer catches and degrades
 * from (the public site falls back to built-in defaults).
 */
export function getDb(): PostgresJsDatabase<typeof schema> {
  if (!db) {
    const url = process.env.DATABASE_URL;
    if (!url) {
      throw new Error("DATABASE_URL is not set.");
    }
    const client = postgres(url, { prepare: false, ssl: "require" });
    db = drizzle(client, { schema });
  }
  return db;
}
