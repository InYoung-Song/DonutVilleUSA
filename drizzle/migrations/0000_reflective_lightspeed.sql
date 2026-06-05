CREATE TABLE `admin_users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text NOT NULL,
	`password_hash` text NOT NULL,
	`created_at` text DEFAULT '' NOT NULL,
	`updated_at` text DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `admin_users_email_unique` ON `admin_users` (`email`);--> statement-breakpoint
CREATE TABLE `featured_sections` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`body` text,
	`image_key` text,
	`link_href` text,
	`link_label` text,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`visible` integer DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE `gallery_images` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`r2_key` text NOT NULL,
	`alt_text` text DEFAULT '' NOT NULL,
	`caption` text,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`visible` integer DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE `hours` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`day_of_week` integer NOT NULL,
	`is_closed` integer DEFAULT false NOT NULL,
	`open_time` text DEFAULT '06:00' NOT NULL,
	`close_time` text DEFAULT '23:00' NOT NULL
);
--> statement-breakpoint
CREATE TABLE `menu_categories` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`type` text DEFAULT 'donut' NOT NULL,
	`name` text NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`visible` integer DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE `menu_items` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`category_id` integer NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`price` text,
	`seasonal` integer DEFAULT false NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`visible` integer DEFAULT true NOT NULL,
	`image_key` text
);
--> statement-breakpoint
CREATE TABLE `settings` (
	`id` integer PRIMARY KEY NOT NULL,
	`business_name` text DEFAULT 'Donutville U.S.A.' NOT NULL,
	`tagline` text DEFAULT '' NOT NULL,
	`phone` text DEFAULT '' NOT NULL,
	`email` text DEFAULT '' NOT NULL,
	`address_line1` text DEFAULT '' NOT NULL,
	`city` text DEFAULT '' NOT NULL,
	`state` text DEFAULT '' NOT NULL,
	`zip` text DEFAULT '' NOT NULL,
	`map_embed_url` text DEFAULT '' NOT NULL,
	`hero_title` text DEFAULT '' NOT NULL,
	`hero_subtitle` text DEFAULT '' NOT NULL,
	`home_intro` text DEFAULT '' NOT NULL,
	`about_body` text DEFAULT '' NOT NULL,
	`awards_text` text DEFAULT '' NOT NULL,
	`large_order_policy` text DEFAULT '' NOT NULL,
	`banner_text` text DEFAULT '' NOT NULL,
	`banner_enabled` integer DEFAULT false NOT NULL,
	`banner_start` text,
	`banner_end` text,
	`social` text DEFAULT '{}' NOT NULL,
	`badges` text DEFAULT '[]' NOT NULL,
	`video_urls` text DEFAULT '[]' NOT NULL,
	`updated_at` text DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE TABLE `special_hours` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`date` text NOT NULL,
	`label` text DEFAULT '' NOT NULL,
	`is_closed` integer DEFAULT false NOT NULL,
	`open_time` text,
	`close_time` text,
	`note` text
);
