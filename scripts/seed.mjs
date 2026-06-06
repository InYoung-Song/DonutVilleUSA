// Seeds Donutville content into the Supabase/Postgres database.
// Usage: npm run db:seed   (reads DATABASE_URL from .env.local / .env / env)
import postgres from "postgres";
import { readFileSync, existsSync } from "node:fs";

for (const f of [".env.local", ".env"]) {
  if (!existsSync(f)) continue;
  for (const line of readFileSync(f, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("Set DATABASE_URL (your Supabase connection string).");
  process.exit(1);
}

const sql = postgres(url, { prepare: false, ssl: "require" });
try {
  await sql.unsafe(readFileSync("drizzle/seed.sql", "utf8"));
  console.log("Seeded Donutville content ✔");
} catch (e) {
  console.error("Seed failed:", e.message);
  process.exitCode = 1;
} finally {
  await sql.end();
}
