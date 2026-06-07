import { getSettings } from "@/db/queries";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminForm } from "@/components/admin/AdminForm";
import { TextField, TextAreaField } from "@/components/admin/fields";
import { saveContact } from "./actions";

export const dynamic = "force-dynamic";

export default async function ContactEditor() {
  const s = await getSettings();
  return (
    <div>
      <AdminPageHeader
        title="Contact & Location"
        description="Phone, email, address, and the map shown on your site."
      />
      <AdminForm action={saveContact} submitLabel="Save contact info">
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField label="Phone" name="phone" defaultValue={s.phone} />
          <TextField
            label="Email (optional)"
            name="email"
            type="email"
            defaultValue={s.email}
          />
        </div>
        <TextField
          label="Street address"
          name="addressLine1"
          defaultValue={s.addressLine1}
        />
        <div className="grid gap-4 sm:grid-cols-3">
          <TextField label="City" name="city" defaultValue={s.city} />
          <TextField label="State" name="state" defaultValue={s.state} />
          <TextField label="ZIP" name="zip" defaultValue={s.zip} />
        </div>
        <TextField
          label="Google Maps embed URL"
          name="mapEmbedUrl"
          defaultValue={s.mapEmbedUrl}
          hint="Tip: use a Google Maps embed URL, or paste the iframe src from Atlist, Felt, or a published Mapbox map."
        />
        <TextAreaField
          label="Large-order policy"
          name="largeOrderPolicy"
          defaultValue={s.largeOrderPolicy}
          rows={2}
        />
      </AdminForm>
    </div>
  );
}
