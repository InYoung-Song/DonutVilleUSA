// Creates/updates the single admin owner login (PBKDF2 hash) in Postgres.
// The hashing here MUST match src/lib/auth.ts (scheme/iterations/format).
//
// Usage: npm run db:create-admin -- <email> <password>
import postgres from "postgres";
import { webcrypto as crypto } from "node:crypto";
import { readFileSync, existsSync } from "node:fs";

for (const f of [".env.local", ".env"]) {
  if (!existsSync(f)) continue;
  for (const line of readFileSync(f, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

const [email, password] = process.argv.slice(2);
if (!email || !password) {
  console.error("Usage: npm run db:create-admin -- <email> <password>");
  process.exit(1);
}
const url = process.env.DATABASE_URL;
if (!url) {
  console.error("Set DATABASE_URL (your Supabase connection string).");
  process.exit(1);
}

const ITERATIONS = 100_000;
const SALT_BYTES = 16;
const KEY_BITS = 256;

async function pbkdf2(pw, salt) {
  const km = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(pw),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt, iterations: ITERATIONS, hash: "SHA-256" },
    km,
    KEY_BITS,
  );
  return new Uint8Array(bits);
}

const salt = crypto.getRandomValues(new Uint8Array(SALT_BYTES));
const hash = await pbkdf2(password, salt);
const b64 = (b) => Buffer.from(b).toString("base64");
const stored = `pbkdf2$${ITERATIONS}$${b64(salt)}$${b64(hash)}`;
const now = new Date().toISOString();
const safeEmail = email.toLowerCase();

const sql = postgres(url, { prepare: false, ssl: "require" });
try {
  await sql`
    INSERT INTO admin_users (email, password_hash, created_at, updated_at)
    VALUES (${safeEmail}, ${stored}, ${now}, ${now})
    ON CONFLICT (email) DO UPDATE
      SET password_hash = EXCLUDED.password_hash, updated_at = EXCLUDED.updated_at`;
  console.log(`Admin owner set: ${safeEmail} ✔`);
} catch (e) {
  console.error("Failed:", e.message);
  process.exitCode = 1;
} finally {
  await sql.end();
}
