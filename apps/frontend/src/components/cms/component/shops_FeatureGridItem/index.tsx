import { type CmsComponent } from "@remkoj/optimizely-cms-react";
import {
  shops_FeatureGridItemDataFragmentDoc,
  type shops_FeatureGridItemDataFragment,
} from "@/gql/graphql";

const fallbackImage = "https://placehold.co/520x540";

export const ShopsFeatureGridItemComponent: CmsComponent<shops_FeatureGridItemDataFragment> = ({ data }) => {
  const {
    title = "GUIDED BY EXPERTS",
    description,
    variant = "text",
    imageAlt = "Feature image",
  } = data ?? {};

  const isImageTile = String(variant).toLowerCase() === "image";

  return (
    <article className="border border-black/30 bg-[#e5e8f7] min-h-[280px] lg:min-h-[420px] flex flex-col justify-between">
      {isImageTile ? (
        <img
          src={fallbackImage}
          alt={imageAlt || "Feature image"}
          className="h-full w-full object-cover min-h-[280px]"
          loading="lazy"
        />
      ) : (
        <>
          <h3 className="px-4 py-3 md:px-6 md:py-5 text-[34px] md:text-[50px] font-black uppercase leading-[0.95] tracking-[-0.02em]">
            {title}
          </h3>
          {description?.html ? (
            <div
              className="px-4 pb-5 md:px-6 md:pb-8 text-[18px] leading-[1.35]"
              dangerouslySetInnerHTML={{ __html: description.html }}
            />
          ) : null}
        </>
      )}
    </article>
  );
};

ShopsFeatureGridItemComponent.displayName = "shops Feature Grid Item (Component/shops_FeatureGridItem)";
ShopsFeatureGridItemComponent.getDataFragment = () => [
  "shops_FeatureGridItemData",
  shops_FeatureGridItemDataFragmentDoc,
];

export default ShopsFeatureGridItemComponent;
