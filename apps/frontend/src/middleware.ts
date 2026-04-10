import { NextResponse, type NextRequest } from "next/server";
import { resolveSiteByHost, SITES } from "@/lib/site-config";
import { normalizeLocale, parseLocaleFromPath, localeToPathSegment } from "@/lib/locale";

const IGNORE = ["/_next", "/api", "/ui", "/favicon.ico", "/robots.txt", "/sitemap.xml"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const host = req.headers.get("host") || "";
  const protocol = req.headers.get("x-forwarded-proto") || req.nextUrl.protocol.replace(":", "") || "http";
  const incomingBaseUrl = host ? `${protocol}://${host}` : undefined;

  // Ignore internal & system routes (including /ui used for editing)
  if (IGNORE.some((p) => pathname === p || pathname.startsWith(p + "/"))) {
    return NextResponse.next();
  }

  // 1) Resolve site by Host header
  const site = resolveSiteByHost(host);
  const siteLocales = site.locales;
  const siteLocaleSet = new Set(siteLocales.map((x) => normalizeLocale(x)));
  const siteDefaultLocale = site.defaultLocale;
  const siteDefaultLocaleLower = normalizeLocale(siteDefaultLocale);
  const siteStartPagePath = site.startPagePath;
  const knownLocales = new Set(SITES.flatMap((s) => s.locales.map((l) => normalizeLocale(l))));

  // 2) Resolve locale from first URL segment
  const { locale, hasPrefix, prefix } = parseLocaleFromPath(
    pathname,
    siteLocales,
    siteDefaultLocale
  );
  const prefixLower = normalizeLocale(prefix);

  // Canonicalize default locale when this site does not use the default-locale URL prefix.
  if (!site.prefixDefaultLocale && hasPrefix && prefixLower === siteDefaultLocaleLower) {
    const parts = pathname.split("/").filter(Boolean);
    const rest = parts.slice(1).join("/");
    const url = req.nextUrl.clone();
    url.pathname = `/${rest}`.replaceAll("//", "/") || "/";
    return NextResponse.redirect(url);
  }

  // Enforce default-locale URL prefix when this site expects routes like /en/... for default language.
  // If first segment is locale-like but not supported on this site, remove it.
  if (prefixLower && knownLocales.has(prefixLower) && !siteLocaleSet.has(prefixLower)) {
    const parts = pathname.split("/").filter(Boolean);
    const rest = parts.slice(1).join("/");
    const url = req.nextUrl.clone();
    url.pathname = `/${rest}`.replaceAll("//", "/") || "/";
    return NextResponse.redirect(url);
  }

  // Enforce default-locale URL prefix when this site expects routes like /en/... for default language.
  if (site.prefixDefaultLocale && !hasPrefix) {
    const url = req.nextUrl.clone();
    url.pathname = `/${localeToPathSegment(siteDefaultLocale)}${pathname === "/" ? "" : pathname}`.replaceAll("//", "/");
    return NextResponse.redirect(url);
  }

  if (siteStartPagePath !== "/") {
    if (pathname === "/") {
      const url = req.nextUrl.clone();
      const localePrefix = site.prefixDefaultLocale ? `/${localeToPathSegment(siteDefaultLocale)}` : "";
      url.pathname = `${localePrefix}${siteStartPagePath}`.replaceAll("//", "/") || "/";
      return NextResponse.redirect(url);
    }

    if (hasPrefix && prefixLower === normalizeLocale(locale) && (pathname === `/${prefix}` || pathname === `/${prefix}/`)) {
      const url = req.nextUrl.clone();
      url.pathname = `/${prefix}${siteStartPagePath}`.replaceAll("//", "/") || `/${prefix}`;
      return NextResponse.redirect(url);
    }
  }

  // 3) Attach site + locale for server-only loaders via request headers
  const reqHeaders = new Headers(req.headers);
  reqHeaders.set("x-opti-siteid", site.siteId);
  reqHeaders.set("x-opti-locale", locale);
  reqHeaders.set("x-opti-site-default-locale", siteDefaultLocale);
  reqHeaders.set("x-opti-site-locales", siteLocales.join(","));
  reqHeaders.set("x-opti-site-prefix-default-locale", String(site.prefixDefaultLocale));
  reqHeaders.set("x-opti-site-start-page-path", siteStartPagePath);
  const resolverBaseUrl = site.resolverBaseUrl || incomingBaseUrl;
  if (resolverBaseUrl) reqHeaders.set("x-opti-site-base-url", resolverBaseUrl);

  const response = NextResponse.next({ request: { headers: reqHeaders } });
  response.cookies.set("x_site_locales", siteLocales.join(","), { path: "/" });
  response.cookies.set("x_site_default_locale", siteDefaultLocale, { path: "/" });
  response.cookies.set("x_site_prefix_default_locale", String(site.prefixDefaultLocale), { path: "/" });
  response.cookies.set("x_site_start_page_path", siteStartPagePath, { path: "/" });

  return response;
}

export const config = {
  matcher: ["/((?!_next|api|ui|.*\\..*).*)"],
};