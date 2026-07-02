import Link from "next/link";
import { type CmsComponent } from "@remkoj/optimizely-cms-react";
import {
  shops_MediaSpotlightDataFragmentDoc,
  type shops_MediaSpotlightDataFragment,
} from "@/gql/graphql";

const fallbackImage = "https://placehold.co/1000x700";

export const ShopsMediaSpotlightComponent: CmsComponent<shops_MediaSpotlightDataFragment> = ({ data }) => {
  const {
    heading = "FOR THE COMMITTED",
    body,
    ctaLabel = "ABOUT US",
    ctaHref,
    mediaAlt = "Spotlight image",
    mediaAlignment = "left",
  } = data ?? {};

  const isRight = String(mediaAlignment).toLowerCase() === "right";
  const href = ctaHref?.default ?? "#";

  return (
    <section className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] min-h-[540px] bg-[#e5e8f7] border-y border-black/30">
      <div className={isRight ? "order-2" : "order-1"}>
        <img
          src={fallbackImage}
          alt={mediaAlt || "Spotlight image"}
          className="h-full min-h-[360px] w-full object-cover"
          loading="lazy"
        />
      </div>
      <div className={`${isRight ? "order-1" : "order-2"} p-6 md:p-10 flex flex-col justify-center gap-8`}>
        <h3 className="text-[42px] md:text-[56px] font-black uppercase leading-[0.95] tracking-[-0.02em] max-w-[12ch]">
          {heading}
        </h3>
        {body?.html ? (
          <div
            className="text-[18px] leading-[1.35] max-w-[40ch]"
            dangerouslySetInnerHTML={{ __html: body.html }}
          />
        ) : null}
        {ctaLabel ? (
          <Link href={href} className="uppercase text-[14px] tracking-[0.1em] font-semibold hover:opacity-70 transition-opacity">
            {ctaLabel}
          </Link>
        ) : null}
      </div>
    </section>
  );
};

ShopsMediaSpotlightComponent.displayName = "shops Media Spotlight (Component/shops_MediaSpotlight)";
ShopsMediaSpotlightComponent.getDataFragment = () => [
  "shops_MediaSpotlightData",
  shops_MediaSpotlightDataFragmentDoc,
];

export default ShopsMediaSpotlightComponent;
