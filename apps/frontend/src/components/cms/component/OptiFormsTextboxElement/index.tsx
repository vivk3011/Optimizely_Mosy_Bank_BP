import { type CmsComponent } from "@remkoj/optimizely-cms-react";
import { CmsEditable } from "@remkoj/optimizely-cms-react/rsc";
import {
  OptiFormsTextboxElementDataFragmentDoc,
  type OptiFormsTextboxElementDataFragment,
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

function getPattern(validators: unknown): string | undefined {
  if (!validators) return undefined;
  const list = Array.isArray(validators) ? (validators as ValidatorRule[]) : [];
  const rule = list.find((v) => typeof v?.pattern === "string" && v.pattern);
  return rule?.pattern;
}

export const OptiFormsTextboxElement: CmsComponent<
  OptiFormsTextboxElementDataFragment
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
  const pattern = getPattern(Validators);
  const fieldId = `opti-forms-textbox-${contentLink.key}`;

  return (
    <CmsEditable
      as="div"
      cmsId={contentLink.key}
      ctx={ctx}
      className="opti-forms-textbox flex flex-col gap-1 w-full"
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
      <input
        id={fieldId}
        type="text"
        name={Label || fieldId}
        defaultValue={PredefinedValue ?? ""}
        placeholder={Placeholder ?? ""}
        autoComplete={AutoComplete || undefined}
        title={Tooltip || undefined}
        required={required}
        pattern={pattern}
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

OptiFormsTextboxElement.displayName =
  "Optimizely Forms - Textbox (Item/Component/OptiFormsTextboxElement)";
OptiFormsTextboxElement.getDataFragment = () => [
  "OptiFormsTextboxElementData",
  OptiFormsTextboxElementDataFragmentDoc,
];

export default OptiFormsTextboxElement;
