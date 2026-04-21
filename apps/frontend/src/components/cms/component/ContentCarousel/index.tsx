import "server-only";
import { type CmsComponent } from "@remkoj/optimizely-cms-react";
import { type ContentCarouselDataFragment, ContentCarouselDataFragmentDoc } from "@/gql/graphql";
import ProductCarousel from "@/components/shared/product_placeholder/ProductCarousel";
import productsData from "@/data/hot-this-week.json";

export const ContentCarouselComponent: CmsComponent<ContentCarouselDataFragment> = ({ data }) => {
  const heading = data?.heading ?? undefined;

  return (
    <ProductCarousel
      products={productsData}
      heading={heading}
    />
  );
};

ContentCarouselComponent.displayName = "Content Carousel (Component/ContentCarousel)";
ContentCarouselComponent.getDataFragment = () => ["ContentCarouselData", ContentCarouselDataFragmentDoc];

export default ContentCarouselComponent;
