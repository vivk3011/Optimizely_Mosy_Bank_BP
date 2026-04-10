import { headers } from "next/headers";
import { resolveSiteByHost } from "@/lib/site-config";

export function getOptiContext() {
  const h = headers();
  const site = resolveSiteByHost(h.get("host"));
  return {
    siteId: h.get("x-opti-siteid") ?? site.siteId,
    locale: h.get("x-opti-locale") ?? undefined,
    baseUrl: h.get("x-opti-site-base-url") ?? undefined,
    startPagePath: h.get("x-opti-site-start-page-path") ?? site.startPagePath,
  };
}