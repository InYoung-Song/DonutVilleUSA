"use server";

import { updateSettings } from "@/db/mutations";
import { revalidatePublic } from "@/lib/revalidate";
import { type ActionState, ok, fail, str, bool } from "@/lib/admin";
import { isUrl } from "@/lib/validation";
import { ALL_BADGE_KEYS } from "@/lib/badges";
import type { SocialLinks, BadgeKey } from "@/lib/content-types";

const SOCIAL_KEYS: (keyof SocialLinks)[] = [
  "youtube",
  "facebook",
  "instagram",
  "x",
  "tiktok",
  "yelp",
];

export async function saveExtras(
  _prev: ActionState,
  form: FormData,
): Promise<ActionState> {
  // Video links (one per line)
  const videoUrls = str(form, "videoUrls")
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);
  const badVideo = videoUrls.find((u) => !isUrl(u));
  if (badVideo) return fail(`Video link must start with http(s): ${badVideo}`);

  // Social links
  const social: SocialLinks = {};
  for (const key of SOCIAL_KEYS) {
    const value = str(form, `social_${key}`);
    if (!value) continue;
    if (!isUrl(value)) return fail(`${key} link must start with http(s).`);
    social[key] = value;
  }

  // Payment / amenity badges
  const badges: BadgeKey[] = ALL_BADGE_KEYS.filter((k) =>
    bool(form, `badge_${k}`),
  );

  try {
    await updateSettings({
      videoUrls: JSON.stringify(videoUrls),
      social: JSON.stringify(social),
      badges: JSON.stringify(badges),
    });
    revalidatePublic();
  } catch (err) {
    console.error("saveExtras failed:", err);
    return fail("Couldn’t save. Please try again.");
  }
  return ok("Video, social & badges saved.");
}
