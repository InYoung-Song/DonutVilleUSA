import { getSettings } from "@/db/queries";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminForm } from "@/components/admin/AdminForm";
import { TextField, TextAreaField } from "@/components/admin/fields";
import { saveHome } from "./actions";

export const dynamic = "force-dynamic";

export default async function HomeEditor() {
  const s = await getSettings();
  return (
    <div>
      <AdminPageHeader
        title="Home & About"
        description="The headline, intro, and story shown on your home and about pages."
      />
      <AdminForm action={saveHome} submitLabel="Save text">
        <TextField label="Tagline" name="tagline" defaultValue={s.tagline} />
        <TextField
          label="Home headline"
          name="heroTitle"
          defaultValue={s.heroTitle}
        />
        <TextField
          label="Home sub-headline"
          name="heroSubtitle"
          defaultValue={s.heroSubtitle}
        />
        <TextAreaField
          label="Home intro paragraph"
          name="homeIntro"
          defaultValue={s.homeIntro}
          rows={3}
        />
        <TextAreaField
          label="About story"
          name="aboutBody"
          defaultValue={s.aboutBody}
          rows={6}
          hint="Line breaks are preserved on the About page."
        />
        <TextField
          label="Awards line"
          name="awardsText"
          defaultValue={s.awardsText}
          hint="Leave blank to hide the awards ribbon."
        />
      </AdminForm>
    </div>
  );
}
