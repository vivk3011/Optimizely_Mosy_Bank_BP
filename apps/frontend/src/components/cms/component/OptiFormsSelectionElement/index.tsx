import { type CmsComponent } from "@remkoj/optimizely-cms-react";
import { CmsEditable } from "@remkoj/optimizely-cms-react/rsc";
import {
  OptiFormsSelectionElementDataFragmentDoc,
  type OptiFormsSelectionElementDataFragment,
} from "@gql/graphql";

type ValidatorRule = {
  type?: string;
  pattern?: string;
  message?: string;
};

type OptionItem = {
  Value?: string;
  Caption?: string;
  Checked?: boolean;
  value?: string;
  caption?: string;
  checked?: boolean;
};

function isRequired(validators: unknown): boolean {
  if (!validators) return false;
  const list = Array.isArray(validators) ? (validators as ValidatorRule[]) : [];
  return list.some(
    (v) =>
      typeof v?.type === "string" &&
      v.type.toLowerCase().includes("required")
  );
}

function normalizeOptions(options: unknown): {
  value: string;
  caption: string;
  checked: boolean;
}[] {
  if (!Array.isArray(options)) return [];
  return (options as OptionItem[])
    .map((o) => {
      const value = o?.Value ?? o?.value ?? "";
      const caption = o?.Caption ?? o?.caption ?? value;
      const checked = Boolean(o?.Checked ?? o?.checked ?? false);
      return { value: String(value), caption: String(caption), checked };
    })
    .filter((o) => o.value !== "" || o.caption !== "");
}

export const OptiFormsSelectionElement: CmsComponent<
  OptiFormsSelectionElementDataFragment
> = ({ data, contentLink, inEditMode, ctx }) => {
  const {
    Label = "",
    Placeholder = "",
    Tooltip = "",
    Options = null,
    AllowMultiSelect = false,
    AutoComplete = "",
    Validators = null,
  } = data ?? {};

  const required = isRequired(Validators);
  const options = normalizeOptions(Options);
  const fieldId = `opti-forms-selection-${contentLink.key}`;
  const allowMultiSelect = Boolean(AllowMultiSelect);
  const defaultSelected = options.filter((o) => o.checked).map((o) => o.value);
  const singleDefault = defaultSelected[0] ?? "";

  return (
    <CmsEditable
      as="div"
      cmsId={contentLink.key}
      ctx={ctx}
      className="opti-forms-selection flex flex-col gap-1 w-full"
    >
      {Label && (
        <label
          htmlFor={fieldId}
          className="text-sm font-medium"
          data-epi-edit={inEditMode ? "Label" : undefined}
        >
          {Label}
          {required && <span className="text-red-600 ml-0.5">*</span>}
        </label>
      )}
      <select
        id={fieldId}
        name={allowMultiSelect ? `${Label || fieldId}[]` : (Label || fieldId)}
        multiple={allowMultiSelect}
        required={required}
        autoComplete={AutoComplete || undefined}
        title={Tooltip || undefined}
        defaultValue={allowMultiSelect ? defaultSelected : singleDefault}
        className="border rounded-md px-3 py-2 text-base dark:bg-transparent"
      >
        {!allowMultiSelect && Placeholder && (
          <option value="" disabled>
            {Placeholder}
          </option>
        )}
        {options.map((opt, idx) => (
          <option key={`${opt.value}-${idx}`} value={opt.value}>
            {opt.caption}
          </option>
        ))}
      </select>
      {Tooltip && (
        <span
          className="text-xs opacity-70"
          data-epi-edit={inEditMode ? "Tooltip" : undefined}
        >
          {Tooltip}
        </span>
      )}
    </CmsEditable>
  );
};

OptiFormsSelectionElement.displayName =
  "Optimizely Forms - Selection (Item/Component/OptiFormsSelectionElement)";
OptiFormsSelectionElement.getDataFragment = () => [
  "OptiFormsSelectionElementData",
  OptiFormsSelectionElementDataFragmentDoc,
];

export default OptiFormsSelectionElement;
