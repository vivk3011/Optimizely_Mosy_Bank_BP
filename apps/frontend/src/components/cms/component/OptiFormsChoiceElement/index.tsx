import { type CmsComponent } from "@remkoj/optimizely-cms-react";
import { CmsEditable } from "@remkoj/optimizely-cms-react/rsc";
import {
  OptiFormsChoiceElementDataFragmentDoc,
  type OptiFormsChoiceElementDataFragment,
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

export const OptiFormsChoiceElement: CmsComponent<
  OptiFormsChoiceElementDataFragment
> = ({ data, contentLink, inEditMode, ctx }) => {
  const {
    Label = "",
    Tooltip = "",
    Options = null,
    AllowMultiSelect = false,
    Validators = null,
  } = data ?? {};

  const required = isRequired(Validators);
  const options = normalizeOptions(Options);
  const groupName = Label || `opti-forms-choice-${contentLink.key}`;
  const inputType = AllowMultiSelect ? "checkbox" : "radio";

  return (
    <CmsEditable
      as="fieldset"
      cmsId={contentLink.key}
      ctx={ctx}
      className="opti-forms-choice flex flex-col gap-2 w-full"
    >
      {Label && (
        <legend
          className="text-sm font-medium"
          data-epi-edit={inEditMode ? "Label" : undefined}
        >
          {Label}
          {required && <span className="text-red-600 ml-0.5">*</span>}
        </legend>
      )}
      <div className="flex flex-col gap-1">
        {options.map((opt, idx) => {
          const id = `opti-forms-choice-${contentLink.key}-${idx}`;
          return (
            <label key={id} htmlFor={id} className="inline-flex items-center gap-2 text-base">
              <input
                id={id}
                type={inputType}
                name={AllowMultiSelect ? `${groupName}[]` : groupName}
                value={opt.value}
                defaultChecked={opt.checked}
                required={required && !AllowMultiSelect}
              />
              <span>{opt.caption}</span>
            </label>
          );
        })}
      </div>
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

OptiFormsChoiceElement.displayName =
  "Optimizely Forms - Choice (Item/Component/OptiFormsChoiceElement)";
OptiFormsChoiceElement.getDataFragment = () => [
  "OptiFormsChoiceElementData",
  OptiFormsChoiceElementDataFragmentDoc,
];

export default OptiFormsChoiceElement;
