// Presentational, server-usable form fields (uncontrolled, defaultValue-based).

const inputCls =
  "mt-1 w-full rounded-lg border border-cream-200 bg-white px-3 py-2 text-cocoa placeholder:text-cocoa-500 focus:border-berry focus:outline-none";
const labelCls = "block text-sm font-semibold text-cocoa";
const hintCls = "mt-1 text-xs text-cocoa-500";

export function TextField({
  label,
  name,
  defaultValue,
  type = "text",
  placeholder,
  required,
  hint,
  autoComplete,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  hint?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className={labelCls}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        className={inputCls}
      />
      {hint && <p className={hintCls}>{hint}</p>}
    </div>
  );
}

export function TextAreaField({
  label,
  name,
  defaultValue,
  rows = 4,
  placeholder,
  hint,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  rows?: number;
  placeholder?: string;
  hint?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className={labelCls}>
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className={inputCls}
      />
      {hint && <p className={hintCls}>{hint}</p>}
    </div>
  );
}

export function CheckboxField({
  label,
  name,
  defaultChecked,
  hint,
}: {
  label: string;
  name: string;
  defaultChecked?: boolean;
  hint?: string;
}) {
  return (
    <div>
      <label className="flex items-center gap-2 text-sm font-semibold text-cocoa">
        <input
          type="checkbox"
          name={name}
          defaultChecked={defaultChecked}
          className="h-4 w-4 rounded border-cream-200 text-berry focus:ring-berry"
        />
        {label}
      </label>
      {hint && <p className={hintCls}>{hint}</p>}
    </div>
  );
}

export function SelectField({
  label,
  name,
  options,
  defaultValue,
  hint,
}: {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  defaultValue?: string;
  hint?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className={labelCls}>
        {label}
      </label>
      <select
        id={name}
        name={name}
        defaultValue={defaultValue}
        className={inputCls}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {hint && <p className={hintCls}>{hint}</p>}
    </div>
  );
}
