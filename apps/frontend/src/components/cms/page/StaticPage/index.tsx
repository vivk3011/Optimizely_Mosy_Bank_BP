import "server-only";
import { type Metadata } from "next";

// Optimizely Graph
import { getSdk } from "@gql";
import { type Locales, type StaticPageDataFragment, StaticPageDataFragmentDoc } from "@gql/graphql";

// Optimizely SaaS CMS SDK
import { type OptimizelyNextPage } from "@remkoj/optimizely-cms-nextjs";
import { CmsContentArea } from "@remkoj/optimizely-cms-react/rsc";
import { localeToGraphLocale } from "@remkoj/optimizely-graph-client";

// Implementation Helpers
import { getLinkData, linkDataToUrl } from "@/lib/urls";
import { toValidOpenGraphType } from "@/lib/opengraph";

export const StaticPage: OptimizelyNextPage<StaticPageDataFragment> = ({
  data: { PageTitle, PageContent },
  ctx,
}) => {
  return (
    <div className="static-page">
      {PageTitle && (
        <div className="w-full bg-white px-6 py-10">
          <h1
            className="text-3xl font-bold text-gray-900"
            data-epi-edit="PageTitle"
          >
            {PageTitle}
          </h1>
        </div>
      )}
      <CmsContentArea
        fieldName="PageContent"
        items={PageContent}
        className="w-full"
        ctx={ctx}
      />
    </div>
  );
};

StaticPage.getDataFragment = () => ["StaticPageData", StaticPageDataFragmentDoc];

StaticPage.getMetaData = async (contentLink, locale, client) => {
  const sdk = getSdk(client);
  const result = await sdk.getStaticPageMetaData({
    ...contentLink,
    locale: locale ? (localeToGraphLocale(locale) as Locales) : null,
  });

  const pages = (result.StaticPage?.pages || []).filter(isNotNullOrUndefined);
  if (pages.length !== 1) return {};

  const page = pages[0];
  const meta: WithPropertySet<Metadata, "openGraph"> = {
    title:
      page.SeoSetting?.MetaTitle ??
      page.PageTitle ??
      page._metadata?.displayName,
    description: page.SeoSetting?.MetaDescription,
    metadataBase: tryToUrl(page._metadata?.url?.base),
    openGraph: {
      title:
        page.SeoSetting?.MetaTitle ??
        page.PageTitle ??
        page._metadata?.displayName ??
        undefined,
      description: page.SeoSetting?.MetaDescription ?? undefined,
    },
    other: {
      "idio:content-type": "Static Page",
    },
  };

  const pageImage = linkDataToUrl(getLinkData(page.SeoSetting?.SharingImage));
  if (pageImage) {
    meta.openGraph.images = [{ url: pageImage }];
  }

  const openGraphType = toValidOpenGraphType(page.SeoSetting?.GraphType);
  if (openGraphType) {
    // @ts-expect-error The Type is only available when setting directly
    meta.openGraph.type = openGraphType;
  }

  return meta;
};

export default StaticPage;

// ── helpers ──────────────────────────────────────────────────────────────────

type WithPropertySet<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<Required<T>[P]>;
};

function isNotNullOrUndefined<T>(
  toTest?: T | null | undefined
): toTest is T {
  return toTest != null;
}

function tryToUrl(toConvert: string | null | undefined): URL | undefined {
  if (!toConvert) return undefined;
  try {
    return new URL(toConvert);
  } catch {
    return undefined;
  }
}
