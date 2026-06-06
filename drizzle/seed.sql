-- Donutville U.S.A. seed data (kept in sync with src/lib/defaults.ts).
-- Re-runnable: resets the content tables only. It does NOT touch admin_users,
-- gallery_images, or featured_sections so owner logins/uploads survive re-seeds.

DELETE FROM menu_items;
DELETE FROM menu_categories;
DELETE FROM hours;
DELETE FROM settings;

-- ── Site settings (single row) ───────────────────────────────────────────────
INSERT INTO settings (
  id, business_name, tagline, phone, email,
  address_line1, city, state, zip, map_embed_url,
  hero_title, hero_subtitle, home_intro, about_body, awards_text,
  large_order_policy, banner_text, banner_enabled, banner_start, banner_end,
  social, badges, video_urls, updated_at
) VALUES (
  1,
  'Donutville U.S.A.',
  'Your Neighborhood Fix Since July 4th, 1966!',
  '1-313-582-0350',
  '',
  '14829 Ford Rd.',
  'Dearborn',
  'MI',
  '48126',
  'https://www.google.com/maps?q=14829+Ford+Rd,+Dearborn,+MI+48126&output=embed',
  'Hand-cut donuts & real-deal coffee',
  'A Dearborn tradition since July 4th, 1966.',
  'Family owned & operated for over half a century. Our donuts are hand-cut the New England way, and our coffee is 100% Colombian Supremo — fresh every single day, 6 a.m. to 11 p.m.',
  'Donutville U.S.A. opened on July 4th, 1966, and we’ve been your neighborhood fix ever since. Three generations later, we’re still hand-cutting our donuts the old-fashioned, New England way and brewing 100% Colombian Supremo coffee from open to close. Stop in, say hi, and grab a dozen — we’ll have the coffee on.',
  'Voted Best Donut Shop 2014–2020 & Best Coffee 2016 — WDIV ‘4 the Best’',
  'Call ahead for orders of 6 dozen or more. Large or special orders need 48 hours’ advance notice.',
  '',
  0,
  NULL,
  NULL,
  '{"youtube":"https://youtube.com/playlist?list=PLh1eTk0GGfnki3_09CxQjHSG_0mWULLle"}',
  '["visa","mastercard","amex","discover","cash","wifi"]',
  '["https://youtube.com/playlist?list=PLh1eTk0GGfnki3_09CxQjHSG_0mWULLle"]',
  '2026-06-05'
);

-- ── Weekly hours: open 6 a.m.–11 p.m. daily ──────────────────────────────────
INSERT INTO hours (id, day_of_week, is_closed, open_time, close_time) VALUES
  (1, 0, 0, '06:00', '23:00'),
  (2, 1, 0, '06:00', '23:00'),
  (3, 2, 0, '06:00', '23:00'),
  (4, 3, 0, '06:00', '23:00'),
  (5, 4, 0, '06:00', '23:00'),
  (6, 5, 0, '06:00', '23:00'),
  (7, 6, 0, '06:00', '23:00');

-- ── Menu categories ──────────────────────────────────────────────────────────
INSERT INTO menu_categories (id, type, name, sort_order, visible) VALUES
  (1, 'donut',    'Raised & Glazed',          1, 1),
  (2, 'donut',    'Cake Donuts',              2, 1),
  (3, 'donut',    'Filled Donuts',            3, 1),
  (4, 'donut',    'Rolls, Twists & Pastries', 4, 1),
  (5, 'donut',    'Muffins & Cookies',        5, 1),
  (6, 'beverage', 'Coffee & Hot Drinks',      6, 1),
  (7, 'beverage', 'Cold Drinks & Juices',     7, 1);

-- ── Menu items (no prices — owner can add in admin) ──────────────────────────
INSERT INTO menu_items (id, category_id, name, description, price, seasonal, sort_order, visible, image_key) VALUES
  (1,  1, 'Sugar Raised',          NULL, NULL, 0, 1, 1, NULL),
  (2,  1, 'Honey Dipped',          NULL, NULL, 0, 2, 1, NULL),
  (3,  1, 'Chocolate Iced Rings',  NULL, NULL, 0, 3, 1, NULL),
  (4,  1, 'Chocolate',             NULL, NULL, 0, 4, 1, NULL),
  (5,  1, 'Bavarian Cream',        NULL, NULL, 0, 5, 1, NULL),
  (6,  1, 'Coconut',               NULL, NULL, 0, 6, 1, NULL),
  (7,  2, 'Buttermilk',            NULL, NULL, 0, 1, 1, NULL),
  (8,  2, 'Sour Cream',            NULL, NULL, 0, 2, 1, NULL),
  (9,  2, 'Red Velvet',            NULL, NULL, 0, 3, 1, NULL),
  (10, 2, 'Cherry Cake',           NULL, NULL, 0, 4, 1, NULL),
  (11, 2, 'Blueberry Cake',        NULL, NULL, 0, 5, 1, NULL),
  (12, 2, 'Pumpkin',               NULL, NULL, 1, 6, 1, NULL),
  (13, 3, 'Strawberry',            NULL, NULL, 0, 1, 1, NULL),
  (14, 3, 'Apple',                 NULL, NULL, 0, 2, 1, NULL),
  (15, 3, 'Lemon',                 NULL, NULL, 0, 3, 1, NULL),
  (16, 3, 'Buttercream',           NULL, NULL, 0, 4, 1, NULL),
  (17, 3, 'Raspberry',             NULL, NULL, 0, 5, 1, NULL),
  (18, 3, 'Custard',               NULL, NULL, 0, 6, 1, NULL),
  (19, 3, 'Cherry',                NULL, NULL, 0, 7, 1, NULL),
  (20, 4, 'Eclairs',               NULL, NULL, 0, 1, 1, NULL),
  (21, 4, 'Bow Ties',              NULL, NULL, 0, 2, 1, NULL),
  (22, 4, 'French Crullers',       NULL, NULL, 0, 3, 1, NULL),
  (23, 4, 'Cinnamon Rolls',        NULL, NULL, 0, 4, 1, NULL),
  (24, 4, 'Dutch Crumb',           NULL, NULL, 0, 5, 1, NULL),
  (25, 4, 'Peanut',                NULL, NULL, 0, 6, 1, NULL),
  (26, 4, 'Donut Sticks',          NULL, NULL, 0, 7, 1, NULL),
  (27, 4, 'Jelly & Ice',           NULL, NULL, 0, 8, 1, NULL),
  (28, 5, 'Fresh Muffins',         NULL, NULL, 0, 1, 1, NULL),
  (29, 5, 'Cookies',               NULL, NULL, 0, 2, 1, NULL),
  (30, 6, '100% Colombian Supremo Coffee', 'Our signature — fresh-brewed all day.', NULL, 0, 1, 1, NULL),
  (31, 6, 'Cappuccino',            NULL, NULL, 0, 2, 1, NULL),
  (32, 6, 'Hot Chocolate',         NULL, NULL, 0, 3, 1, NULL),
  (33, 6, 'Hot Tea',               NULL, NULL, 0, 4, 1, NULL),
  (34, 7, 'Bottled Water',         NULL, NULL, 0, 1, 1, NULL),
  (35, 7, 'Milk',                  NULL, NULL, 0, 2, 1, NULL),
  (36, 7, 'Orange Juice',          NULL, NULL, 0, 3, 1, NULL),
  (37, 7, 'Apple Juice',           NULL, NULL, 0, 4, 1, NULL),
  (38, 7, 'Cranberry Juice',       NULL, NULL, 0, 5, 1, NULL),
  (39, 7, 'Pineapple Juice',       NULL, NULL, 0, 6, 1, NULL);

-- ── Gallery: original shop photos (optimized, committed under /public/gallery) ─
-- INSERT OR REPLACE on fixed ids 1–10 keeps re-seeding safe and preserves any
-- owner uploads (which get higher ids).
INSERT OR REPLACE INTO gallery_images (id, r2_key, alt_text, caption, sort_order, visible) VALUES
  (1,  '/gallery/assorted-donuts.webp',          'An assortment of our hand-cut donuts',        NULL, 1,  1),
  (2,  '/gallery/chocolate-sprinkle-donut.webp', 'A chocolate-frosted donut with sprinkles',    NULL, 2,  1),
  (3,  '/gallery/cream-donuts.webp',             'Fresh cream-filled donuts',                   NULL, 3,  1),
  (4,  '/gallery/powdered-donuts.webp',          'Powdered, filled donuts',                     NULL, 4,  1),
  (5,  '/gallery/donut-case.webp',               'A case full of fresh donuts',                 NULL, 5,  1),
  (6,  '/gallery/long-johns.webp',               'Chocolate-topped long johns',                 NULL, 6,  1),
  (7,  '/gallery/chocolate-crullers.webp',       'Chocolate-dipped crullers',                   NULL, 7,  1),
  (8,  '/gallery/muffins.webp',                  'Fresh-baked muffins',                         NULL, 8,  1),
  (9,  '/gallery/coffee.webp',                   'A fresh cup of our Colombian Supremo coffee', NULL, 9,  1),
  (10, '/gallery/espresso.webp',                 'Freshly brewed coffee',                       NULL, 10, 1);
