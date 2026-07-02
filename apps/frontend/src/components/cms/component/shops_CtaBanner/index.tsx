import Link from "next/link";
import { type CmsComponent } from "@remkoj/optimizely-cms-react";
import {
  shops_CtaBannerDataFragmentDoc,
  type shops_CtaBannerDataFragment,
} from "@/gql/graphql";

const backgroundClassByTone: Record<string, string> = {
  accent: "bg-[#7d87ee]",
  light: "bg-[#e5e8f7]",
  dark: "bg-[#111827] text-white",
};

export const ShopsCtaBannerComponent: CmsComponent<shops_CtaBannerDataFragment> = ({ data }) => {
  const {
    eyebrow = "WHAT WE BELIEVE IN",
    heading = "JOIN THE PRIMAL TRIBE TODAY!",
    buttonLabel = "RESERVE YOUR SPOT",
    buttonHref,
    backgroundTone = "accent",
  } = data ?? {};

  const href = buttonHref?.default ?? "#";
  const bgClass = backgroundClassByTone[String(backgroundTone).toLowerCase()] ?? backgroundClassByTone.accent;

  return (
    <section className={`w-full py-20 md:py-28 px-6 text-center ${bgClass}`}>
      <div className="mx-auto max-w-[900px] flex flex-col items-center gap-5 md:gap-6">
        <p className="uppercase text-[13px] tracking-[0.08em] font-semibold">{eyebrow}</p>
        <h3 className="text-[46px] md:text-[74px] font-black uppercase leading-[0.95] tracking-[-0.03em]">
          {heading}
        </h3>
        <Link
          href={href}
          className="inline-flex items-center justify-center rounded-md border border-black/20 bg-white px-5 py-2 uppercase text-[12px] tracking-[0.1em] font-semibold text-black hover:opacity-80 transition-opacity"
        >
          {buttonLabel}
        </Link>
      </div>
    </section>
  );
};

ShopsCtaBannerComponent.displayName = "shops CTA Banner (Component/shops_CtaBanner)";
ShopsCtaBannerComponent.getDataFragment = () => ["shops_CtaBannerData", shops_CtaBannerDataFragmentDoc];

export default ShopsCtaBannerComponent;
