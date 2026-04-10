
export function normalizeLocale(input: string | undefined | null): string {
  return (input ?? "").trim().toLowerCase().replace(/-/g, "_");
}

export function localeToPathSegment(input: string | undefined | null): string {
  return normalizeLocale(input).replace(/_/g, "-");
}

export function parseLocaleFromPath(
  pathname: string,
  allowed: string[],
  defaultLocale: string
): { locale: string; hasPrefix: boolean; prefix: string | null } {
  const segRaw = pathname.split("/").filter(Boolean)[0] ?? "";
  const seg = normalizeLocale(segRaw);
  const allowedMap = new Map(allowed.map((x) => [normalizeLocale(x), x]));

  if (seg && allowedMap.has(seg)) {
    return { locale: allowedMap.get(seg) ?? defaultLocale, hasPrefix: true, prefix: segRaw };
  }

  return {
    locale: defaultLocale || "en",
    hasPrefix: false,
    prefix: segRaw || null,
  };
}
