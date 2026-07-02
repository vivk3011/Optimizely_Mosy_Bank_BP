import "server-only";
import { draftMode } from "next/headers";
import { createClient, AuthMode } from "@remkoj/optimizely-graph-client";
import { createPage } from "@remkoj/optimizely-cms-nextjs/page";
import { factory } from "@components/factory";
import { getContentByPath } from "@/lib/loaders";
import { SITES } from "@/lib/site-config";
import { normalizeLocale, localeToPathSegment } from "@/lib/locale";

const supportedLocales = Array.from(new Set(SITES.flatMap((s) => s.locales)));
const supportedLocaleMap = new Map(supportedLocales.map((l) => [normalizeLocale(l), l]));
const defaultLocales = Array.from(new Set(SITES.map((s) => s.defaultLocale)));
const fallbackLocale = defaultLocales[0] ?? "en";

const {
  generateMetadata,
  generateStaticParams: baseGenerateStaticParams,
  CmsPage: Page,
} = createPage(factory, {
  // Actual locale is also overridden per-request by middleware via x-opti-locale header in loaders.
  getContentByPath,

  // locale is the URL segment: /pl/... or /sv/...
  paramsToLocale: (params) => {
    const requested = normalizeLocale(((params as Record<string, unknown> | undefined)?.lang as string) ?? "");
    return supportedLocaleMap.get(requested) ?? fallbackLocale;
  },

  client: () => {
    let isDraft = false;
    try { isDraft = draftMode().isEnabled; } catch { /* no request scope (e.g. generateStaticParams) */ }
    const client = createClient(undefined, undefined, {
      nextJsFetchDirectives: true,
      cache: !isDraft,
      queryCache: !isDraft,
    });
    if (isDraft) {
      client.updateAuthentication(AuthMode.HMAC);
      client.enablePreview();
    }
    return client;
  },
});

// force-dynamic: locale and siteId come from request headers set by middleware
export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = false;

export async function generateStaticParams() {
  const base = (await baseGenerateStaticParams?.()) ?? [];
  const defaultLocaleSet = new Set(SITES.map((s) => normalizeLocale(s.defaultLocale)));
  const supported = Array.from(new Set(SITES.flatMap((s) => s.locales)));
  const nonDefault = supported.filter((l) => !defaultLocaleSet.has(normalizeLocale(l)));

  return nonDefault.flatMap((lang) =>
    base.map((p: any) => ({ ...p, lang: localeToPathSegment(lang) }))
  );
}

export { generateMetadata };
export default Page;