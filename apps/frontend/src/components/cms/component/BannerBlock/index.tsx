import { type ComponentProps, type FunctionComponent } from "react";
import { type CmsComponent, type WithGqlFragment } from "@remkoj/optimizely-cms-react";
import {
  BannerDataFragmentDoc,
  type BannerDataFragment,
} from "@/gql/graphql";
import { Button } from "@/components/shared/button";

type BannerBlockProps = ComponentProps<CmsComponent<BannerDataFragment>>;

type BannerBlockComponentType =
  CmsComponent<BannerDataFragment> extends WithGqlFragment<any, BannerDataFragment>
    ? WithGqlFragment<
        FunctionComponent<
          BannerBlockProps &
            // Allow fragment to be spread directly on the component as props too (same idea as ButtonBlock)
            Omit<BannerDataFragment, "__typename">
        >,
        BannerDataFragment
      >
    : never;

/**
 * Banner
 * Simple banner with title, description and a CTA button text
 */
export const BannerBlockComponent: BannerBlockComponentType = ({
  // CMS component pattern: data is provided via Graph
  data: {
    bannerTitle: configuredTitle,
    bannerDescription: configuredDescription,
    bannerButtonText: configuredButtonText,
  } = {},

  // Allow fragment props to be spread on the component too
  bannerTitle: providedTitle,
  bannerDescription: providedDescription,
  bannerButtonText: providedButtonText,
}) => {
  const title = configuredTitle ?? providedTitle ?? "";
  const description = configuredDescription ?? providedDescription ?? "";
  const buttonText = configuredButtonText ?? providedButtonText ?? "";

  return (
    <section
      className={[
        "w-full rounded-[40px] px-6 py-10 md:px-10 md:py-14",
        "bg-[rgba(248,248,252,0.9)] dark:bg-[rgba(16,20,29,0.9)]",
        "shadow-sm",
      ].join(" ")}
    >
      <div className="mx-auto max-w-[1024px] flex flex-col gap-5 md:gap-6">
        {title ? (
          <h2 className="text-[28px] md:text-[36px] font-extrabold leading-tight">
            {title}
          </h2>
        ) : null}

        {description ? (
          <p className="text-[16px] md:text-[18px] leading-relaxed opacity-90">
            {description}
          </p>
        ) : null}

        {buttonText ? (
          <div className="pt-2">
            {/* No URL field requested, so render a non-navigating button by default */}
            <Button
              url="#"
              buttonColor="default"
              buttonType="primary"
              buttonVariant="cta"
              className="w-fit"
            >
              {buttonText}
            </Button>
          </div>
        ) : null}
      </div>
    </section>
  );
};

BannerBlockComponent.displayName = "Banner (Component/BannerBlock)";

// Same pattern as ButtonBlock: attach fragment getter so the factory can request data
BannerBlockComponent.getDataFragment = () => ["BannerData", BannerDataFragmentDoc];

export default BannerBlockComponent;