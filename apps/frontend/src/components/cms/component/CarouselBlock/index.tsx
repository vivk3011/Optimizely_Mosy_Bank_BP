import { type CmsComponent } from "@remkoj/optimizely-cms-react";
import { type CarouselBlockDataFragment, CarouselBlockDataFragmentDoc } from "@gql/graphql"
import dynamic from "next/dynamic";
import "server-only";
import { CmsContentArea, CmsEditable } from "@remkoj/optimizely-cms-react/rsc";
import type ProductsCarouselStylesJson from "./ProductsCarouselStyles.opti-style.json";
import type { LayoutProps } from "@remkoj/optimizely-cms-react";
import productsData from "@/data/hot-this-week.json";

const CarouselBlockComponent = dynamic(() => import("./_carousel-block"), { ssr: true });
const ProductCarousel = dynamic(() => import("@/components/shared/product_placeholder/ProductCarousel"), { ssr: true });

type ProductsCarouselLayoutProps = LayoutProps<typeof ProductsCarouselStylesJson>;

export const CarouselBlock: CmsComponent<CarouselBlockDataFragment> = async ({ data, contentLink, layoutProps, ctx }) => {
  // Render Hot This Week product carousel when the ProductsCarousel display template is selected
  if ((layoutProps as ProductsCarouselLayoutProps | undefined)?.template === "ProductsCarousel") {
    return <ProductCarousel products={productsData} />;
  }

  const items = data?.CarouselItemsContentArea || [];

  return (
    <CmsEditable as={CarouselBlockComponent}
      cmsId={ contentLink.key }
      data={{ ...data, itemCount: items.length }}
      inEditMode={ctx?.inEditMode}
      contentLink={ contentLink }
      ctx={ctx}
      forwardCtx={false}
    >
      <CmsContentArea
        noWrapper
        itemWrapper={{ 
          as: "div",
          style: {
            flex: `0 0 var(--item-width)`,
            width: `var(--item-width)`,
            display: "inline-block",
            paddingLeft: "15px",
            paddingRight: "15px"
          }
        }}
        items={items}
        ctx={ ctx }
      />
    </CmsEditable>
  );
};

CarouselBlock.displayName = "Carousel Block";
CarouselBlock.getDataFragment = () => ["CarouselBlockData", CarouselBlockDataFragmentDoc];
export default CarouselBlock;