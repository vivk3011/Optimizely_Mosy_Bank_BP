import "server-only";
import { type CmsComponent } from "@remkoj/optimizely-cms-react";
import { type ContentCarouselElementDataFragment, ContentCarouselElementDataFragmentDoc } from "@/gql/graphql";
import ProductCarousel from "@/components/shared/product_placeholder/ProductCarousel";
import productsData from "@/data/hot-this-week.json";

/**
 * Content Carousel Element
 * Renders the Hot This Week product carousel.
 * The CMS `heading` field overrides the default section heading when provided.
 * The CMS `Type` field (array) can be used for future variant control.
 */
export const ContentCarouselElementElement: CmsComponent<ContentCarouselElementDataFragment> = ({ data }) => {
  const heading = data?.heading ?? undefined;
  return (
    <ProductCarousel
      products={productsData}
      heading={heading}
    />
  );
};

ContentCarouselElementElement.displayName = "Content Carousel Element (Element/ContentCarouselElement)";
ContentCarouselElementElement.getDataFragment = () => ["ContentCarouselElementData", ContentCarouselElementDataFragmentDoc];

export default ContentCarouselElementElement;
