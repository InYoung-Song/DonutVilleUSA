import { getSettings } from "@/db/queries";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminForm } from "@/components/admin/AdminForm";
import { TextField, TextAreaField, CheckboxField } from "@/components/admin/fields";
import { ALL_BADGE_KEYS, BADGE_META } from "@/lib/badges";
import { saveExtras } from "./actions";

export const dynamic = "force-dynamic";

const SOCIAL_FIELDS = [
  { key: "youtube", label: "YouTube" },
  { key: "facebook", label: "Facebook" },
  { key: "instagram", label: "Instagram" },
  { key: "x", label: "X (Twitter)" },
  { key: "tiktok", label: "TikTok" },
  { key: "yelp", label: "Yelp" },
] as const;

export default async function ExtrasEditor() {
  const s = await getSettings();
  const payment = ALL_BADGE_KEYS.filter((k) => BADGE_META[k].kind === "payment");
  const amenity = ALL_BADGE_KEYS.filter((k) => BADGE_META[k].kind === "amenity");

  return (
    <div>
      <AdminPageHeader
        title="Video, Social & Badges"
        description="Your video links, social profiles, and the payment/amenity badges shown in the footer."
      />
      <AdminForm action={saveExtras} submitLabel="Save extras">
        <TextAreaField
          label="Video links"
          name="videoUrls"
          defaultValue={s.videoUrls.join("\n")}
          rows={3}
          hint="One YouTube link per line. The first one is featured on the home page."
        />

        <fieldset className="space-y-3">
          <legend className="text-sm font-bold uppercase tracking-wide text-cocoa-500">
            Social links
          </legend>
          <div className="grid gap-4 sm:grid-cols-2">
            {SOCIAL_FIELDS.map((f) => (
              <TextField
                key={f.key}
                label={f.label}
                name={`social_${f.key}`}
                type="url"
                defaultValue={s.social[f.key] ?? ""}
                placeholder="https://…"
              />
            ))}
          </div>
        </fieldset>

        <fieldset className="space-y-3">
          <legend className="text-sm font-bold uppercase tracking-wide text-cocoa-500">
            We accept
          </legend>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {payment.map((k) => (
              <CheckboxField
                key={k}
                label={BADGE_META[k].label}
                name={`badge_${k}`}
                defaultChecked={s.badges.includes(k)}
              />
            ))}
          </div>
        </fieldset>

        <fieldset className="space-y-3">
          <legend className="text-sm font-bold uppercase tracking-wide text-cocoa-500">
            Amenities
          </legend>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {amenity.map((k) => (
              <CheckboxField
                key={k}
                label={BADGE_META[k].label}
                name={`badge_${k}`}
                defaultChecked={s.badges.includes(k)}
              />
            ))}
          </div>
        </fieldset>
      </AdminForm>
    </div>
  );
}
