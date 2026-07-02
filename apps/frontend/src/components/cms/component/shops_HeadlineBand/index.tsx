import { type CmsComponent } from "@remkoj/optimizely-cms-react";
import {
  shops_HeadlineBandDataFragmentDoc,
  type shops_HeadlineBandDataFragment,
} from "@/gql/graphql";

const backgroundClassByTone: Record<string, string> = {
  light: "bg-[#e5e8f7]",
  accent: "bg-[#7d87ee]",
  white: "bg-white",
};

const accentClassByTone: Record<string, string> = {
  accent: "text-[#7d87ee]",
  black: "text-black",
  white: "text-white",
};

export const ShopsHeadlineBandComponent: CmsComponent<shops_HeadlineBandDataFragment> = ({ data }) => {
  const {
    prefixText = "JOIN THE",
    accentText = "COMMUNITY",
    backgroundTone = "white",
    accentTone = "accent",
  } = data ?? {};

  const bgClass = backgroundClassByTone[String(backgroundTone).toLowerCase()] ?? backgroundClassByTone.white;
  const accentClass = accentClassByTone[String(accentTone).toLowerCase()] ?? accentClassByTone.accent;

  return (
    <section className={`w-full border-y border-black/30 px-4 md:px-8 py-3 md:py-5 ${bgClass}`}>
      <h2 className="text-[46px] md:text-[88px] font-black uppercase leading-[0.95] tracking-[-0.03em]">
        <span>{prefixText}</span>{" "}
        <span className={accentClass}>{accentText}</span>
      </h2>
    </section>
  );
};

ShopsHeadlineBandComponent.displayName = "shops Headline Band (Component/shops_HeadlineBand)";
ShopsHeadlineBandComponent.getDataFragment = () => [
  "shops_HeadlineBandData",
  shops_HeadlineBandDataFragmentDoc,
];

export default ShopsHeadlineBandComponent;
