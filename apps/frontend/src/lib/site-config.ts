export type SiteConfig = {
  siteId: string;          // MUST equal CMS Application "API ID"
  hosts: string[];         // hostname(s) for this site
  locales: string[];       // supported locales
  defaultLocale: string;   // "no prefix" locale for this host (per CMS hostname locale)
  prefixDefaultLocale: boolean; // true when the CMS routes include /<defaultLocale>/ for default language
  resolverBaseUrl?: string; // optional explicit base URL used for route resolution in Content Graph
  startPagePath: string;
};

const normHost = (h: string) => h.toLowerCase().split(":")[0];
const normPath = (path: string | undefined, fallback = "/") => {
  const value = (path || fallback).trim();
  if (!value || value === "/") return "/";
  const withLeadingSlash = value.startsWith("/") ? value : `/${value}`;
  return withLeadingSlash.replace(/\/+$/, "") || "/";
};

const pathFromUrlOrPath = (value: string | undefined, fallback = "/") => {
  if (!value) return normPath(undefined, fallback);
  const trimmed = value.trim();
  if (!trimmed) return normPath(undefined, fallback);
  try {
    const url = new URL(trimmed);
    return normPath(url.pathname, fallback);
  } catch {
    return normPath(trimmed, fallback);
  }
};

const getEnv = (name: string): string | undefined =>
  ((globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env ?? {})[name];

const parseList = (value: string | undefined, fallback: string[]): string[] => {
  if (!value) return fallback;
  const parsed = value.split(",").map((x) => x.trim()).filter(Boolean);
  return parsed.length > 0 ? parsed : fallback;
};

type SiteConfigInput = {
  siteId?: string;
  hosts?: string[];
  locales?: string[];
  defaultLocale?: string;
  prefixDefaultLocale?: boolean;
  resolverBaseUrl?: string;
  startPagePath?: string;
};

const toSiteConfig = (input: SiteConfigInput, fallback: SiteConfig): SiteConfig => {
  const hosts = (input.hosts ?? fallback.hosts).map(normHost).filter(Boolean);
  const locales = (input.locales ?? fallback.locales).map((x) => x.trim()).filter(Boolean);
  const defaultLocale = (input.defaultLocale ?? fallback.defaultLocale).trim();

  return {
    siteId: (input.siteId ?? fallback.siteId).trim(),
    hosts: Array.from(new Set(hosts.length > 0 ? hosts : fallback.hosts.map(normHost))),
    locales: locales.length > 0 ? Array.from(new Set(locales)) : fallback.locales,
    defaultLocale: defaultLocale || fallback.defaultLocale,
    prefixDefaultLocale:
      typeof input.prefixDefaultLocale === "boolean"
        ? input.prefixDefaultLocale
        : fallback.prefixDefaultLocale,
    resolverBaseUrl: input.resolverBaseUrl ?? fallback.resolverBaseUrl,
    startPagePath: normPath(input.startPagePath, fallback.startPagePath),
  };
};

const parseSites = (value: string | undefined, fallback: SiteConfig[]): SiteConfig[] => {
  if (!value) return fallback;
  try {
    const parsed = JSON.parse(value) as SiteConfigInput[];
    if (!Array.isArray(parsed) || parsed.length === 0) return fallback;
    return parsed.map((item, index) => toSiteConfig(item, fallback[index] ?? fallback[0]));
  } catch {
    return fallback;
  }
};

const defaultSites: SiteConfig[] = [
  {
    // Application A – CMS Name: "Sitea", API ID: "sitea", Start Page: "Site2"
    siteId: getEnv("OPTIMIZELY_SITE_ID_A") || "sitea",
    hosts: [getEnv("NEXT_PUBLIC_SITE_HOST_A") || "site-a.localtest.me"],
    locales: parseList(getEnv("NEXT_PUBLIC_SITE_LOCALES_A") || getEnv("NEXT_PUBLIC_SITE_LOCALES"), ["en", "sv"]),
    defaultLocale: getEnv("NEXT_PUBLIC_DEFAULT_LOCALE_A") || getEnv("NEXT_PUBLIC_DEFAULT_LOCALE") || "en",
    prefixDefaultLocale: false,
    resolverBaseUrl: getEnv("OPTIMIZELY_RESOLVER_URL_SITE_A") || "http://site-a.localtest.me:3001",
    startPagePath: pathFromUrlOrPath(
      getEnv("OPTIMIZELY_START_PAGE_PATH_SITE_A")
      || getEnv("OPTIMIZELY_START_PAGE_URL_SITE_A")
      || getEnv("OPTIMIZELY_START_PAGE_PATH")
      || getEnv("OPTIMIZELY_START_PAGE_URL"),
      "/"
    ),
  },
  {
    // Application B – CMS Name: "Moseybank-site", API ID: "siteb", Start Page: "Siteb"
    siteId: getEnv("OPTIMIZELY_SITE_ID_B") || "siteb",
    hosts: [getEnv("NEXT_PUBLIC_SITE_HOST_B") || "site-b.localtest.me"],
    locales: parseList(getEnv("NEXT_PUBLIC_SITE_LOCALES_B") || getEnv("NEXT_PUBLIC_SITE_LOCALES"), ["en", "sv"]),
    defaultLocale: getEnv("NEXT_PUBLIC_DEFAULT_LOCALE_B") || getEnv("NEXT_PUBLIC_DEFAULT_LOCALE") || "en",
    prefixDefaultLocale: false,
    resolverBaseUrl: getEnv("OPTIMIZELY_RESOLVER_URL_SITE_B") || "http://site-b.localtest.me:3001",
    startPagePath: pathFromUrlOrPath(
      getEnv("OPTIMIZELY_START_PAGE_PATH_SITE_B")
      || getEnv("OPTIMIZELY_START_PAGE_URL_SITE_B")
      || getEnv("OPTIMIZELY_START_PAGE_PATH")
      || getEnv("OPTIMIZELY_START_PAGE_URL"),
      "/"
    ),
  },
  {
    // Application C – CMS Name: "Sitec", API ID: "sitec"
    siteId: getEnv("OPTIMIZELY_SITE_ID_C") || "sitec",
    hosts: [getEnv("NEXT_PUBLIC_SITE_HOST_C") || "site-c.localtest.me"],
    locales: parseList(getEnv("NEXT_PUBLIC_SITE_LOCALES_C") || getEnv("NEXT_PUBLIC_SITE_LOCALES"), ["en", "sv", "pl"]),
    defaultLocale: getEnv("NEXT_PUBLIC_DEFAULT_LOCALE_C") || getEnv("NEXT_PUBLIC_DEFAULT_LOCALE") || "en",
    prefixDefaultLocale: false,
    resolverBaseUrl: getEnv("OPTIMIZELY_RESOLVER_URL_SITE_C") || "http://site-c.localtest.me:3001",
    startPagePath: pathFromUrlOrPath(
      getEnv("OPTIMIZELY_START_PAGE_PATH_SITE_C")
      || getEnv("OPTIMIZELY_START_PAGE_URL_SITE_C")
      || getEnv("OPTIMIZELY_START_PAGE_PATH")
      || getEnv("OPTIMIZELY_START_PAGE_URL"),
      "/"
    ),
  },
];

export const SITES: SiteConfig[] = parseSites(getEnv("OPTIMIZELY_MULTISITE_CONFIG"), defaultSites);

export function resolveSiteByHost(hostHeader: string | null): SiteConfig {
  const host = normHost(hostHeader ?? "");
  return SITES.find(s => s.hosts.map(normHost).includes(host)) ?? SITES[0];
}
