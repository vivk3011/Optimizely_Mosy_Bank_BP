import { type CmsComponent } from "@remkoj/optimizely-cms-react/rsc";
import {
  shops_FeatureGridDataFragmentDoc,
  type shops_FeatureGridDataFragment,
} from "@/gql/graphql";

export const ShopsFeatureGridComponent: CmsComponent<shops_FeatureGridDataFragment> = ({ data }) => {
  const fallbackTiles = [
    {
      title: "GUIDED BY EXPERTS",
      body: "We believe in creating a positive environment where you can thrive. We are here to help you unlock your full potential.",
    },
    {
      title: "DYNAMIC OPEN GYM",
      body: "Our facility supports top-end performance with modern tools, open training areas, and functional movement focus.",
    },
  ];

  return (
    <section className="grid grid-cols-1 lg:grid-cols-3">
      {fallbackTiles.map((tile) => (
        <article key={tile.title} className="border border-black/30 bg-[#e5e8f7] min-h-[280px] lg:min-h-[420px] flex flex-col justify-between">
          <h3 className="px-4 py-3 md:px-6 md:py-5 text-[34px] md:text-[50px] font-black uppercase leading-[0.95] tracking-[-0.02em]">
            {tile.title}
          </h3>
          <p className="px-4 pb-5 md:px-6 md:pb-8 text-[18px] leading-[1.35]">{tile.body}</p>
        </article>
      ))}
      <article className="border border-black/30 bg-[#e5e8f7] min-h-[280px] lg:min-h-[420px]">
        <img src="https://placehold.co/520x540" alt="Feature tile" className="h-full w-full object-cover min-h-[280px]" loading="lazy" />
      </article>
    </section>
  );
};

ShopsFeatureGridComponent.displayName = "shops Feature Grid (Component/shops_FeatureGrid)";
ShopsFeatureGridComponent.getDataFragment = () => [
  "shops_FeatureGridData",
  shops_FeatureGridDataFragmentDoc,
];

export default ShopsFeatureGridComponent;
