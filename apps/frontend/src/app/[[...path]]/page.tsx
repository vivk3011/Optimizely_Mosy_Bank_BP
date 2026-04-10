import "server-only";

import { createClient } from "@remkoj/optimizely-cms-nextjs";

import { createPage } from "@remkoj/optimizely-cms-nextjs/page";
import { factory } from "@components/factory";
import { getContentByPath } from "@/lib/loaders";

const { generateMetadata, generateStaticParams, CmsPage: Page } = createPage(factory, {
  // Default locale: the [[...path]] route handles the site's default locale.
  // Actual locale is injected per-request by middleware via x-opti-locale header.
  paramsToLocale: () => "en",
  getContentByPath,

  client: () => createClient(),
});

// force-dynamic: locale and siteId come from request headers set by middleware
export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = false;

export { generateMetadata, generateStaticParams };
export default Page;