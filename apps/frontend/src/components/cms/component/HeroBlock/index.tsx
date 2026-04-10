import { CmsEditable, type CmsComponent } from "@remkoj/optimizely-cms-react/rsc";
import { HeroBlockDataFragmentDoc, type HeroBlockDataFragment } from "@/gql/graphql";

/**
 * Hero
 * Hero
 * Schema-aligned hero block rendering for title/subtitle based models.
 */
export const HeroBlockComponent: CmsComponent<HeroBlockDataFragment> = ({
  data: {
    title = "",
    subtitle = "",
    showDecoration = false,
    decorationColorsPrimary,
    decorationColorsSecondary,
  },
  inEditMode,
  contentLink,
  ctx,
}) => {
  return (
    <CmsEditable
      as="section"
      className="py-10 lg:py-16"
      cmsId={contentLink.key}
      ctx={ctx}
    >
      <div className="container mx-auto px-8">
        <div className="mx-auto max-w-[900px] text-center">
          {(inEditMode || title) && (
            <CmsEditable as="h1" cmsFieldName="title" className="text-4xl font-bold lg:text-6xl" ctx={ctx}>
              {title || "+ Add Title"}
            </CmsEditable>
          )}
          {(inEditMode || subtitle) && (
            <CmsEditable as="p" cmsFieldName="subtitle" className="mt-4 text-lg opacity-80 lg:text-2xl" ctx={ctx}>
              {subtitle || "+ Add Subtitle"}
            </CmsEditable>
          )}
          {showDecoration && (
            <div
              className="mx-auto mt-8 h-2 w-40 rounded-full"
              style={{
                background: `linear-gradient(90deg, ${decorationColorsPrimary || "#0ea5e9"}, ${decorationColorsSecondary || "#22c55e"})`,
              }}
            />
          )}
        </div>
      </div>
    </CmsEditable>
  );
};
HeroBlockComponent.displayName = "Hero (Component/HeroBlock)";
HeroBlockComponent.getDataFragment = () => ["HeroBlockData", HeroBlockDataFragmentDoc];

export default HeroBlockComponent;
