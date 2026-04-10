"use client";

import { useMemo, type FunctionComponent } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import DropDown, { type DropDownOption, type DropDownParameters } from "@shared/drop_down";
import { normalizeLocale, localeToPathSegment } from "@/lib/locale";

type LanguageSwitcherClientProps = Pick<DropDownParameters, "options" | "value" | "label" | "compact">;

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const target = `${encodeURIComponent(name)}=`;
  const hit = document.cookie
    .split(";")
    .map((x) => x.trim())
    .find((x) => x.startsWith(target));
  if (!hit) return null;
  return decodeURIComponent(hit.slice(target.length));
}

function splitLocale(pathname: string, allowed: string[], fallback: string) {
  const allowedMap = new Map(allowed.map((x) => [normalizeLocale(x), x]));
  const parts = pathname.split("/").filter(Boolean);
  const firstRaw = parts[0] ?? "";
  const first = normalizeLocale(firstRaw);

  if (first && allowedMap.has(first)) {
    const rest = "/" + parts.slice(1).join("/");
    return {
      currentLocale: allowedMap.get(first) ?? fallback,
      restPath: rest === "/" ? "/" : rest,
    };
  }

  return {
    currentLocale: fallback,
    restPath: pathname || "/",
  };
}

function buildLocalizedPath(
  nextLocale: string,
  restPath: string,
  defaultLocale: string,
  prefixDefaultLocale: boolean
) {
  const rest = restPath.startsWith("/") ? restPath : `/${restPath}`;
  const localeIsDefault = normalizeLocale(nextLocale) === normalizeLocale(defaultLocale);

  if (localeIsDefault && !prefixDefaultLocale) {
    return rest.replaceAll("//", "/") || "/";
  }

  return `/${localeToPathSegment(nextLocale)}${rest}`.replaceAll("//", "/");
}

const LanguageSwitcherClient: FunctionComponent<LanguageSwitcherClientProps> = ({
  options,
  value,
  label,
  compact,
}) => {
  const router = useRouter();
  const pathname = usePathname() || "/";
  const searchParams = useSearchParams();

  const locales = useMemo(() => options.map((x) => normalizeLocale(x.value)).filter(Boolean), [options]);
  const defaultLocale = readCookie("x_site_default_locale") || value?.value || "en";
  const prefixDefaultLocale = (readCookie("x_site_prefix_default_locale") || "false") === "true";

  const { currentLocale, restPath } = useMemo(
    () => splitLocale(pathname, locales, defaultLocale),
    [pathname, locales, defaultLocale]
  );

  const selected = options.find((x) => normalizeLocale(x.value) === normalizeLocale(currentLocale)) || value;

  return (
    <DropDown
      options={options}
      value={selected}
      label={label}
      compact={compact}
      onChange={(next: DropDownOption) => {
        const nextPath = buildLocalizedPath(next.value, restPath, defaultLocale, prefixDefaultLocale);
        const qs = searchParams?.toString();
        const url = qs ? `${nextPath}?${qs}` : nextPath;
        router.push(url);
      }}
    />
  );
};

export default LanguageSwitcherClient;