import "server-only";
import { RouteResolver } from "@remkoj/optimizely-graph-client/router";
import { getContentByPath as baseGetContentByPath, getContentById } from "@gql/functions";
import { getOptiContext } from "@/lib/opti-context";

function normalizePath(path: string): string {
  if (!path) return "/";
  const v = path.startsWith("/") ? path : `/${path}`;
  return v === "/" ? "/" : v.replace(/\/+$/, "");
}

function pathVariants(path: string): string[] {
  const p = normalizePath(path);
  return p === "/" ? ["/"] : [p, `${p}/`];
}

function withLocaleFallbackPaths(path: string, locale?: string): string[] {
  const normalized = normalizePath(path);
  if (!locale) return [normalized];
  const localePrefix = `/${String(locale).toLowerCase()}`;
  const normalizedLower = normalized.toLowerCase();

  if (normalizedLower === localePrefix) return ["/"];
  if (normalizedLower.startsWith(`${localePrefix}/`)) {
    const withoutLocale = normalizePath(normalized.substring(localePrefix.length));
    return Array.from(new Set([normalized, withoutLocale]));
  }

  return [normalized];
}

function domainCandidates(baseUrl?: string, siteId?: string): string[] {
  const list: string[] = [];
  if (baseUrl) {
    list.push(baseUrl);
    try {
      const url = new URL(baseUrl);
      list.push(url.host);
      list.push(url.hostname);
      list.push(url.origin);
    } catch {
      // ignore malformed input
    }
  }
  if (siteId) list.push(siteId);
  return Array.from(new Set(list.filter(Boolean)));
}

export async function getContentByPath(
  client: Parameters<typeof baseGetContentByPath>[0],
  variables: Parameters<typeof baseGetContentByPath>[1]
) {
  const { siteId, locale, baseUrl, startPagePath } = getOptiContext();
  const incomingPath = normalizePath(((variables as any)?.path?.[0] as string | undefined) || "/");
  const routePath = incomingPath === "/" && startPagePath ? normalizePath(startPagePath) : incomingPath;
  const candidateRoutePaths = withLocaleFallbackPaths(routePath, locale);

  const resolver = new RouteResolver(client as any);
  const domains = domainCandidates(baseUrl, siteId);
  const paths = Array.from(new Set(candidateRoutePaths.flatMap(pathVariants)));

  let route: any;
  for (const domain of domains) {
    for (const path of paths) {
      try {
        route = await resolver.getContentInfoByPath(path, domain);
      } catch {
        route = undefined;
      }
      if (route) break;
    }
    if (route) break;
  }

  if (route) {
    const contentLink = resolver.routeToContentLink(route);
    const resolvedLocale = locale || contentLink.locale || route.locale;

    return getContentById(client as any, {
      key: contentLink.key,
      version: contentLink.version,
      ...(resolvedLocale ? { locale: [resolvedLocale as any] } : {}),
      ...(variables?.changeset ? { changeset: variables.changeset } : {}),
    } as any);
  }

  // The generated getContentByPath query matches $siteId against url.base,
  // which stores the full base URL (e.g. http://site-a.localtest.me:3001).
  // Use resolverBaseUrl first since that matches what CMS Applications register
  // as the hostname in Content Graph; fall back to siteId for compatibility.
  return baseGetContentByPath(client, {
    ...variables,
    siteId: baseUrl || siteId,
    path: paths,
    ...(locale ? { locale: [locale as any] } : {}),
  } as any);
}
