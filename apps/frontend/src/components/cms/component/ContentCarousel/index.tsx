import "server-only";
import { type CmsComponent } from "@remkoj/optimizely-cms-react";
import { extractSettings } from "@remkoj/optimizely-cms-react/rsc";
import { type ContentCarouselDataFragment, ContentCarouselDataFragmentDoc } from "@/gql/graphql";
import ProductCarousel from "@/components/shared/product_placeholder/ProductCarousel";
import productsData from "@/data/hot-this-week.json";
import type { ContentCarouselLayoutProps } from "./displayTemplates";

export const ContentCarouselComponent: CmsComponent<ContentCarouselDataFragment, ContentCarouselLayoutProps> = ({ data, layoutProps }) => {
  const heading = data?.heading ?? undefined;
  const {
    aspectRatio = "square",
    orientation = "landscape",
    roundedCorners = "medium",
    cardStyle = "default",
    itemsPerView = "four",
    maxItems = "all",
    appear = "none",
    duration = "medium",
    delay = "none",
    // Settings JSON uses lowercase `bgcolor`; alias to camelCase locally.
    bgcolor: bgColor = "transparent",
    textColor = "auto",
    showArrows = "yes",
    showDots = "yes",
    autoplay = "off",
    autoplayInterval = "medium",
    loop = "off",
    slideGap = "medium",
  } = extractSettings(layoutProps);

  return (
    <ProductCarousel
      products={productsData}
      heading={heading}
      aspectRatio={aspectRatio}
      orientation={orientation}
      roundedCorners={roundedCorners}
      cardStyle={cardStyle}
      itemsPerView={itemsPerView}
      maxItems={maxItems}
      appear={appear}
      duration={duration}
      delay={delay}
      bgColor={bgColor}
      textColor={textColor}
      showArrows={showArrows}
      showDots={showDots}
      autoplay={autoplay}
      autoplayInterval={autoplayInterval}
      loop={loop}
      slideGap={slideGap}
    />
  );
};

ContentCarouselComponent.displayName = "Content Carousel (Component/ContentCarousel)";
ContentCarouselComponent.getDataFragment = () => ["ContentCarouselData", ContentCarouselDataFragmentDoc];

export default ContentCarouselComponent;
