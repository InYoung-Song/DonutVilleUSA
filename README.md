# Donutville U.S.A.

A modern, fast, low-maintenance website for **Donutville U.S.A.** — a family-owned
donut & coffee shop in Dearborn, Michigan ("Your Neighborhood Fix Since July 4th,
1966!"). It replaces the old GoDaddy site with a mobile-first, accessible build and
a simple built-in admin console so the owner can update everything without a developer.

## What's inside

- **Public site** — Home, Menu (donuts + beverages with live search), About, Contact.
  Live "open now" status, lazy YouTube embed, owner photo gallery, Google Map,
  prominent Call / Directions CTAs, and `LocalBusiness` structured data.
- **Admin console** (`/admin`) — log in to edit hours & holiday hours, the
  announcement banner, home/about text, contact & location, the full menu (sections,
  items, prices), gallery photos, video links, social links, and payment/amenity
  badges. Every change publishes immediately.
- **Resilient by design** — if a field is blank or the database is unreachable, the
  public site falls back to sensible defaults and never visibly breaks.

## Tech stack

| Concern    | Choice |
| ---------- | ------ |
| Framework  | Next.js 16 (App Router) + TypeScript |
| Styling    | Tailwind CSS v4 (warm brand theme) |
| Data       | SQLite via **Cloudflare D1** + Drizzle ORM |
| Images     | **Cloudflare R2** (served via `/media/[...key]`) |
| Auth       | Single owner account — PBKDF2 (Web Crypto) + `jose` session cookie |
| Hosting    | Cloudflare Workers via `@opennextjs/cloudflare` |
| Icons      | lucide-react + custom inline SVGs (payment/amenity/brand) |

## Project layout

```
src/
  app/
    (site)/          public pages (own header/footer shell)
    admin/           login + protected editors
    media/[...key]/  serves R2 images
    sitemap.ts, robots.ts, not-found.tsx, global-error.tsx
  components/        UI, home sections, admin forms, icons
  db/                schema, client, queries (read), mutations (write)
  lib/               hours engine, validation, auth, seo, formatting, defaults
drizzle/             migrations + seed.sql
scripts/             set-admin-password.mjs
```

## Local development

Prereqs: Node 20+ and npm.

```bash
npm install

# 1. Create the local D1 database + tables, then seed real content
npm run db:migrate:local
npm run db:seed:local

# 2. Create the owner login (writes drizzle/admin-user.sql), then apply it
npm run db:create-admin -- owner@example.com "a-strong-password"
npx wrangler d1 execute donutville --local --file=drizzle/admin-user.sql

# 3. Set a local auth secret in .dev.vars (already has a dev placeholder)
#    AUTH_SECRET="<a long random string>"

# 4. Run it
npm run dev          # http://localhost:3000  (admin at /admin)
```

Useful scripts: `npm run lint`, `npm run build`, `npm run db:generate`
(regenerate migrations after editing `src/db/schema.ts`), `npm run db:studio`.

## Deploying to Cloudflare

```bash
# One-time: create the resources
npx wrangler d1 create donutville          # paste the id into wrangler.jsonc
npx wrangler r2 bucket create donutville-media

# Apply schema + seed to the remote D1
npm run db:migrate:remote
npm run db:seed:remote

# Create the production owner login
npm run db:create-admin -- owner@example.com "a-strong-password"
npx wrangler d1 execute donutville --remote --file=drizzle/admin-user.sql

# Set the session secret (production)
npx wrangler secret put AUTH_SECRET

# Build + deploy
npm run deploy
```

Then point the `donutvilleusa.com` domain at the Worker in the Cloudflare dashboard.
The data layer is plain SQLite via Drizzle, so it can also be moved to Turso/libSQL or
Postgres later if hosting changes.

## How content editing works

Public pages read from D1 at request time (rendered dynamically, fast on the edge).
The owner edits content in `/admin`; each save validates input, writes to D1, and
revalidates the public site so changes appear right away. Uploaded photos go to R2 and
are served through `/media/<key>` with long-lived caching.

## Notes

- Accessibility: semantic landmarks, keyboard-navigable menu/tabs, visible focus,
  alt text on every image, WCAG-AA-minded contrast.
- Performance: minimal client JS (open-now badge, menu search, mobile nav, video
  facade), AVIF/WebP, lazy media, a lazy privacy-friendly YouTube embed.
- The old `.html` URLs (`home-1`, `donuts`, `beverages`, `contact-1`) 301-redirect to
  their new homes.
