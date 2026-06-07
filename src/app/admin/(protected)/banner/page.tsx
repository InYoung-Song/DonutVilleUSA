import { getSettings } from "@/db/queries";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminForm } from "@/components/admin/AdminForm";
import { TextAreaField, CheckboxField, TextField } from "@/components/admin/fields";
import { saveBanner } from "./actions";

export const dynamic = "force-dynamic";

export default async function BannerEditor() {
  const s = await getSettings();
  return (
    <div>
      <AdminPageHeader
        title="Announcement banner"
        description="Show a short message across the top of every page."
      />
      <AdminForm action={saveBanner} submitLabel="Save banner">
        <TextAreaField
          label="Banner text"
          name="bannerText"
          defaultValue={s.bannerText}
          rows={2}
          placeholder="e.g. Closed July 4th. Happy Birthday, America!"
        />
        <CheckboxField
          label="Show the banner"
          name="bannerEnabled"
          defaultChecked={s.bannerEnabled}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField
            label="Start date (optional)"
            name="bannerStart"
            type="date"
            defaultValue={s.bannerStart ?? ""}
            hint="Leave blank to start showing right away."
          />
          <TextField
            label="End date (optional)"
            name="bannerEnd"
            type="date"
            defaultValue={s.bannerEnd ?? ""}
            hint="Leave blank to show until you turn it off."
          />
        </div>
      </AdminForm>
    </div>
  );
}
