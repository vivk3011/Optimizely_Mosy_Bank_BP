import { type CmsComponent } from "@remkoj/optimizely-cms-react";
import { CmsEditable } from "@remkoj/optimizely-cms-react/rsc";
import {
  OptiFormsTextareaElementDataFragmentDoc,
  type OptiFormsTextareaElementDataFragment,
} from "@gql/graphql";

type ValidatorRule = {
  type?: string;
  pattern?: string;
  message?: string;
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

export const OptiFormsTextareaElement: CmsComponent<
  OptiFormsTextareaElementDataFragment
> = ({ data, contentLink, inEditMode, ctx }) => {
  const {
    Label = "",
    Placeholder = "",
    PredefinedValue = "",
    Tooltip = "",
    AutoComplete = "",
    Validators = null,
  } = data ?? {};

  const required = isRequired(Validators);
  const fieldId = `opti-forms-textarea-${contentLink.key}`;

  return (
    <CmsEditable
      as="div"
      cmsId={contentLink.key}
      ctx={ctx}
      className="opti-forms-textarea flex flex-col gap-1 w-full"
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
      <textarea
        id={fieldId}
        name={Label || fieldId}
        defaultValue={PredefinedValue ?? ""}
        placeholder={Placeholder ?? ""}
        autoComplete={AutoComplete || undefined}
        title={Tooltip || undefined}
        required={required}
        rows={4}
        className="border rounded-md px-3 py-2 text-base dark:bg-transparent"
      />
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

OptiFormsTextareaElement.displayName =
  "Optimizely Forms - Textarea (Item/Component/OptiFormsTextareaElement)";
OptiFormsTextareaElement.getDataFragment = () => [
  "OptiFormsTextareaElementData",
  OptiFormsTextareaElementDataFragmentDoc,
];

export default OptiFormsTextareaElement;
