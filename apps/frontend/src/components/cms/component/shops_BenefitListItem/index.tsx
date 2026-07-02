import { type CmsComponent } from "@remkoj/optimizely-cms-react";
import {
  shops_BenefitListItemDataFragmentDoc,
  type shops_BenefitListItemDataFragment,
} from "@/gql/graphql";

export const ShopsBenefitListItemComponent: CmsComponent<shops_BenefitListItemDataFragment> = ({ data }) => {
  const { title = "EXPERT COACHING", description } = data ?? {};

  return (
    <article className="border-b border-black/35 px-4 py-4 md:px-6 md:py-5">
      <h4 className="text-[30px] md:text-[42px] font-black uppercase leading-[0.95] tracking-[-0.02em]">{title}</h4>
      {description?.html ? (
        <div className="mt-2 text-[17px] leading-[1.3]" dangerouslySetInnerHTML={{ __html: description.html }} />
      ) : null}
    </article>
  );
};

ShopsBenefitListItemComponent.displayName = "shops Benefit List Item (Component/shops_BenefitListItem)";
ShopsBenefitListItemComponent.getDataFragment = () => [
  "shops_BenefitListItemData",
  shops_BenefitListItemDataFragmentDoc,
];

export default ShopsBenefitListItemComponent;
