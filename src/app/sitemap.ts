import type { MetadataRoute } from "next";
import { entries } from "@/lib/content";
import { site, now } from "@/lib/site";
import { locales, localizedPath } from "@/lib/i18n";
export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) => [
    ...["", "/projects", "/writing", "/about", "/now"].map((path) => ({
      url: site.url + localizedPath(locale, path),
      lastModified: now.updated,
      alternates: {
        languages: {
          "zh-CN": site.url + localizedPath("zh", path),
          en: site.url + localizedPath("en", path),
          "x-default": site.url + localizedPath("zh", path),
        },
      },
    })),
    ...(["projects", "writing"] as const).flatMap((kind) =>
      entries(kind, locale).map((p) => ({
        url: p.canonical,
        lastModified: p.updated,
        alternates: {
          languages: {
            "zh-CN": site.url + localizedPath("zh", `/${kind}/${p.slug}`),
            en: site.url + localizedPath("en", `/${kind}/${p.slug}`),
            "x-default": site.url + localizedPath("zh", `/${kind}/${p.slug}`),
          },
        },
      })),
    ),
  ]);
}
