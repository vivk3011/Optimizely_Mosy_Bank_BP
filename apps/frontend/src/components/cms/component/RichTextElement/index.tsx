import {
  RichText,
  extractSettings,
  type CmsComponent,
} from "@remkoj/optimizely-cms-react/rsc";
import {
  RichTextElementDataFragmentDoc,
  type RichTextElementDataFragment,
} from "@/gql/graphql";
import { type RichTextElementLayoutProps } from "./displayTemplates";

const variantClass: Record<string, string> = {
  default: "prose max-w-none",
  promo:   "prose max-w-none bg-yellow-50 border border-yellow-200 rounded-2xl p-4",
  inverse: "prose prose-invert max-w-none bg-slate-900 text-white rounded-2xl p-4",
};

const alignClass: Record<string, string> = {
  left:   "text-left",
  center: "text-center",
  right:  "text-right",
};

const spacingClass: Record<string, string> = {
  none: "",
  sm:   "my-2",
  md:   "my-4",
  lg:   "my-8",
};

const bgColorClass: Record<string, string> = {
  none:   "",
  white:  "bg-white",
  gray:   "bg-gray-100",
  blue:   "bg-blue-50",
  yellow: "bg-yellow-50",
  dark:   "bg-slate-900 text-white",
};

/**
 * Rich Text
 * Add a text to your experience
 */
export const RichTextElementElement: CmsComponent<
  RichTextElementDataFragment,
  RichTextElementLayoutProps
> = ({ data, layoutProps, contentLink, ctx }) => {
  const {
    width           = "full",
    variant         = "default",
    alignment       = "left",
    spacing         = "md",
    backgroundColor = "none",
  } = extractSettings(layoutProps);

  // width overrides alignment when set to non-full values (legacy setting)
  const widthClass: Record<string, string> = {
    full:         "",
    default:      "max-w-prose mx-auto",
    defaultLeft:  "max-w-prose mr-auto",
    defaultRight: "max-w-prose ml-auto",
  };

  const className = [
    "cms-richtext",
    variantClass[variant]         ?? variantClass.default,
    width !== "full" ? (widthClass[width] ?? "") : (alignClass[alignment] ?? alignClass.left),
    spacingClass[spacing]         ?? spacingClass.md,
    bgColorClass[backgroundColor] ?? "",
  ].join(" ");

  const styleId = `rte-${contentLink.key}`;

  return (
    <div id={styleId} className={className}>
      {data?.csstext && (
        <style dangerouslySetInnerHTML={{ __html: `#${styleId} { ${data.csstext} }` }} />
      )}
      <RichText
        cmsId={contentLink.key}
        cmsFieldName="text"
        ctx={ctx}
        text={data?.text?.json}
        data-component="RichTextElement"
      />
    </div>
  );
};
RichTextElementElement.displayName = "Rich Text (Element/RichTextElement)";
RichTextElementElement.getDataFragment = () => [
  "RichTextElementData",
  RichTextElementDataFragmentDoc,
];

export default RichTextElementElement;
