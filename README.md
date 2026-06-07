# Donutville U.S.A.

A modern, fast, low-maintenance website for **Donutville U.S.A.** - a family-owned
donut & coffee shop in Dearborn, Michigan ("Your Neighborhood Fix Since July 4th,
1966!"). It replaces the old GoDaddy site with a mobile-first, accessible build and
a simple built-in admin console so the owner can update everything without a developer.

> Deploys to **Vercel** with a **Supabase (Postgres)** database.

## What's inside

- **Public site** - Home, Menu (donuts + beverages, each item with its photo +
  description, plus live search), About, Contact. Live "open now" status, a lazy
  YouTube embed, a Google map, prominent Call / Directions CTAs, and
  `LocalBusiness` structured data.
- **Admin console** (`/admin`) - log in to edit hours & holiday hours, the
  announcement banner, home/about text, contact & location, the full menu
  (sections, items, prices), gallery photos, video links, social links, and
  payment/amenity badges. Changes publish immediately.
- **Resilient by design** - if a field is blank or the database is unreachable,
  the public site falls back to built-in defaults and never visibly breaks. (It
  even renders fully from defaults before the database is configured.)

## Tech stack

| Concern    | Choice |
| ---------- | ------ |
| Framework  | Next.js 16 (App Router) + TypeScript |
| Styling    | Tailwind CSS v4 (warm brand theme) |
| Data       | **Supabase Postgres** + Drizzle ORM |
| Images     | Menu photos in `/public`; owner uploads → **Supabase Storage** |
| Auth       | Single owner account - PBKDF2 (Web Crypto) + `jose` session cookie |
| Hosting    | **Vercel** |
| Icons      | lucide-react + custom inline SVGs (payment/amenity/brand) |

## Local development

Prereqs: Node 20+ and a Supabase project (free tier).

```bash
npm install

# 1. Configure environment
cp .env.example .env.local
#   then fill in DATABASE_URL (Supabase "Transaction pooler" string) and AUTH_SECRET

# 2. Create the tables + seed the content
npm run db:push      # creates tables from src/db/schema.ts
npm run db:seed      # loads the real Donutville content

# 3. Create your owner login
npm run db:create-admin -- owner@example.com "a-strong-password"

# 4. Run it
npm run dev          # http://localhost:3000  (admin at /admin)
```

Useful scripts: `npm run lint`, `npm run build`, `npm run db:studio`
(Drizzle Studio), `npm run db:generate` (SQL migrations, optional).

## Deploying to Vercel

1. Push this repo to GitHub and **import it into Vercel** (it auto-detects Next.js).
2. Create a **Supabase** project. In **Settings → Database**, copy the
   **Transaction pooler** connection string.
3. In Vercel → **Project → Settings → Environment Variables**, add:
   - `DATABASE_URL` - the Supabase pooler string
   - `AUTH_SECRET` - a long random string
   - `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` - *(optional)* for gallery uploads
4. Set the tables + content up once (from your machine, with `.env.local`
   pointing at the same Supabase project):
   ```bash
   npm run db:push
   npm run db:seed
   npm run db:create-admin -- owner@example.com "a-strong-password"
   ```
5. Deploy. Visit the site, and `/admin` to log in.

For gallery uploads, create a **public** Storage bucket named `media` in Supabase.

## How content editing works

Public pages read from Postgres at request time (fast SSR on Vercel). The owner
edits content in `/admin`; each save validates input, writes to the database, and
revalidates the public site so changes appear right away. Menu photos are bundled
static assets; owner-uploaded gallery photos go to Supabase Storage.

## Notes

- Accessibility: semantic landmarks, keyboard-navigable menu/tabs, visible focus,
  alt text on every image, WCAG-AA-minded contrast.
- Performance: minimal client JS, optimized WebP imagery, lazy media, a lazy
  privacy-friendly YouTube embed.
- The old `.html` URLs (`home-1`, `donuts`, `beverages`, `contact-1`) 301-redirect
  to their new homes.
