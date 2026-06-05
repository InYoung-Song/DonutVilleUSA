import { defineConfig } from "drizzle-kit";

// We generate plain SQLite migrations and apply them to D1 with Wrangler
// (`npm run db:migrate:local` / `:remote`). Drizzle Kit only needs the schema.
export default defineConfig({
  dialect: "sqlite",
  schema: "./src/db/schema.ts",
  out: "./drizzle/migrations",
});
