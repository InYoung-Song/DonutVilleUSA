-- Donutville U.S.A. seed data (kept in sync with src/lib/defaults.ts).
-- Re-runnable: resets the content tables. It does NOT touch admin_users so the
-- owner login survives re-seeds.

DELETE FROM menu_items;
DELETE FROM menu_categories;
DELETE FROM hours;
DELETE FROM settings;
DELETE FROM gallery_images;

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
  (3, 'donut',    'Filled & Cream',           3, 1),
  (4, 'donut',    'Twists, Rolls & Pastries', 4, 1),
  (5, 'donut',    'Coated Specials',          5, 1),
  (6, 'donut',    'Muffins & Cookies',        6, 1),
  (7, 'beverage', 'Coffee & Hot Drinks',      7, 1),
  (8, 'beverage', 'Cold Drinks & Juices',     8, 1);

-- ── Menu items (each with its original photo + a short description) ──────────
INSERT INTO menu_items (id, category_id, name, description, price, seasonal, sort_order, visible, image_key) VALUES
  (1,  1, 'Sugar Raised',         'Light, airy raised donuts rolled in sugar.',                          NULL, 0, 1, 1, '/menu/sugar-raised.webp'),
  (2,  1, 'Honey Dipped',         'Raised donuts in a sweet, glossy honey glaze.',                       NULL, 0, 2, 1, '/menu/honey-dipped.webp'),
  (3,  1, 'Chocolate Iced Rings', 'Ring donuts dipped in chocolate — plain or with sprinkles.',          NULL, 0, 3, 1, '/menu/chocolate-iced-rings.webp'),
  (4,  2, 'Chocolate',            'Rich, old-fashioned chocolate cake donuts.',                          NULL, 0, 1, 1, '/menu/chocolate.webp'),
  (5,  2, 'Red Velvet',           'Red velvet cake donuts with a tender crumb.',                         NULL, 0, 2, 1, '/menu/red-velvet.webp'),
  (6,  2, 'Buttermilk',           'Classic old-fashioned buttermilk cake donuts.',                       NULL, 0, 3, 1, '/menu/buttermilk.webp'),
  (7,  2, 'Sour Cream',           'Tender sour cream cake donuts with a sugar glaze.',                   NULL, 0, 4, 1, '/menu/sour-cream.webp'),
  (8,  2, 'Cherry Cake',          'Cherry-flavored cake donuts.',                                        NULL, 0, 5, 1, '/menu/cherry-cake.webp'),
  (9,  2, 'Blueberry Cake',       'Blueberry cake donuts, lightly glazed.',                              NULL, 0, 6, 1, '/menu/blueberry-cake.webp'),
  (10, 2, 'Pumpkin',              'Seasonal pumpkin spice donuts.',                                      NULL, 1, 7, 1, '/menu/pumpkin.webp'),
  (11, 3, 'Bavarian Cream',       'Filled with Bavarian cream and topped with chocolate.',               NULL, 0, 1, 1, '/menu/bavarian.webp'),
  (12, 3, 'Assorted Filled',      'Strawberry, apple, lemon, buttercream, raspberry, custard & cherry.', NULL, 0, 2, 1, '/menu/assorted-filled.webp'),
  (13, 3, 'Jelly & Ice',          'Iced raised donuts filled with sweet jelly.',                         NULL, 0, 3, 1, '/menu/jelly-ice.webp'),
  (14, 4, 'Bow Ties',             'Twisted, golden bow-tie donuts.',                                     NULL, 0, 1, 1, '/menu/bow-ties.webp'),
  (15, 4, 'Éclairs',              'Long donuts topped with rich chocolate.',                             NULL, 0, 2, 1, '/menu/eclairs.webp'),
  (16, 4, 'French Crullers',      'Light, airy crullers with a delicate ridged twist.',                  NULL, 0, 3, 1, '/menu/french-crullers.webp'),
  (17, 4, 'Cinnamon Rolls',       'Big, gooey, fresh-baked cinnamon rolls.',                             NULL, 0, 4, 1, '/menu/cinnamon-rolls.webp'),
  (18, 4, 'Donut Sticks',         'Hand-cut donut sticks — plain, sugared, or jelly-filled.',            NULL, 0, 5, 1, '/menu/sticks.webp'),
  (19, 5, 'Peanut',               'Glazed donuts rolled in crunchy chopped peanuts.',                    NULL, 0, 1, 1, '/menu/peanut.webp'),
  (20, 5, 'Dutch Crumb',          'Cake donuts in a cinnamon-sugar crumb coating.',                      NULL, 0, 2, 1, '/menu/dutch-crumb.webp'),
  (21, 5, 'Coconut',              'Cake donuts coated in sweet coconut.',                                NULL, 0, 3, 1, '/menu/coconut.webp'),
  (22, 6, 'Muffins',              'Blueberry, chocolate chip, and more — baked fresh daily.',            NULL, 0, 1, 1, '/menu/muffins.webp'),
  (23, 6, 'Cookies',              'Fresh-baked cookies, including chocolate chip.',                      NULL, 0, 2, 1, '/menu/cookies.webp'),
  (24, 7, 'Colombian Supremo Coffee', 'Our signature 100% Colombian Supremo, fresh all day.',           NULL, 0, 1, 1, '/menu/coffee.webp'),
  (25, 7, 'Cappuccino',           'Espresso topped with steamed, frothy milk.',                          NULL, 0, 2, 1, '/menu/cappuccino.webp'),
  (26, 7, 'Hot Chocolate',        'Rich, warming hot chocolate.',                                        NULL, 0, 3, 1, '/menu/hot-chocolate.webp'),
  (27, 7, 'Tea',                  'A hot, freshly steeped cup of tea.',                                  NULL, 0, 4, 1, '/menu/tea.webp'),
  (28, 8, 'Milk',                 'Ice-cold milk.',                                                      NULL, 0, 1, 1, '/menu/milk.webp'),
  (29, 8, 'Orange Juice',         'Refreshing orange juice.',                                            NULL, 0, 2, 1, '/menu/orange-juice.webp'),
  (30, 8, 'Apple Juice',          'Crisp, cold apple juice.',                                            NULL, 0, 3, 1, '/menu/apple-juice.webp'),
  (31, 8, 'Cranberry Juice',      'Tart and refreshing cranberry juice.',                                NULL, 0, 4, 1, '/menu/cranberry-juice.webp'),
  (32, 8, 'Pineapple Juice',      'Sweet, tropical pineapple juice.',                                    NULL, 0, 5, 1, NULL),
  (33, 8, 'Bottled Water',        'Cold bottled water.',                                                 NULL, 0, 6, 1, '/menu/bottled-water.webp');
