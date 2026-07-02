import Link from "next/link";
import { type CmsComponent } from "@remkoj/optimizely-cms-react/rsc";
import {
  shops_BenefitListSectionDataFragmentDoc,
  type shops_BenefitListSectionDataFragment,
} from "@/gql/graphql";

const fallbackImage = "https://placehold.co/1080x860";

export const ShopsBenefitListSectionComponent: CmsComponent<shops_BenefitListSectionDataFragment> = ({ data }) => {
  const {
    heading = "DISCOVER YOUR POTENTIAL",
    ctaLabel = "VIEW CLASSES",
    ctaHref,
    imageAlt = "Training class",
  } = data ?? {};

  const href = ctaHref?.default ?? "#";
  const fallbackBenefits = [
    {
      title: "EXPERT COACHING",
      body: "Trainers who are passionate about your progress.",
    },
    {
      title: "RESULTS-DRIVEN PROGRAMS",
      body: "Workouts that deliver tangible, measurable results.",
    },
    {
      title: "A SUPPORTIVE TRIBE",
      body: "A community that pushes you to be your best.",
    },
  ];

  return (
    <section className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] border-y border-black/30 bg-[#e5e8f7]">
      <div className="border-r border-black/30">
        <h3 className="px-4 py-5 md:px-6 md:py-7 text-[44px] md:text-[64px] font-black uppercase leading-[0.92] tracking-[-0.03em]">
          {heading}
        </h3>
        {fallbackBenefits.map((item) => (
          <article key={item.title} className="border-b border-black/35 px-4 py-4 md:px-6 md:py-5">
            <h4 className="text-[30px] md:text-[42px] font-black uppercase leading-[0.95] tracking-[-0.02em]">{item.title}</h4>
            <p className="mt-2 text-[17px] leading-[1.3]">{item.body}</p>
          </article>
        ))}
        <div className="px-4 py-5 md:px-6 md:py-7">
          <Link href={href} className="uppercase text-[14px] tracking-[0.1em] font-semibold hover:opacity-70 transition-opacity">
            {ctaLabel}
          </Link>
        </div>
      </div>
      <img src={fallbackImage} alt={imageAlt || "Training class"} className="h-full w-full object-cover min-h-[360px]" loading="lazy" />
    </section>
  );
};

ShopsBenefitListSectionComponent.displayName = "shops Benefit List Section (Component/shops_BenefitListSection)";
ShopsBenefitListSectionComponent.getDataFragment = () => [
  "shops_BenefitListSectionData",
  shops_BenefitListSectionDataFragmentDoc,
];

export default ShopsBenefitListSectionComponent;
