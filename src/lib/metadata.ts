import type { Metadata } from "next";
import { copy, languageTag, localizedPath, type Locale } from "./i18n";
import { site } from "./site";
export function pageMetadata(
  locale: Locale,
  pathname: string,
  title: string,
  description: string,
): Metadata {
  const url = site.url + localizedPath(locale, pathname);
  return {
    metadataBase: new URL(site.url),
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        "zh-CN": site.url + localizedPath("zh", pathname),
        en: site.url + localizedPath("en", pathname),
        "x-default": site.url + localizedPath("zh", pathname),
      },
      types: { "application/rss+xml": localizedPath(locale, "/feed.xml") },
    },
    openGraph: {
      type: "website",
      title,
      description,
      url,
      siteName: "samanhappy.com",
      locale: locale === "zh" ? "zh_CN" : "en_US",
      alternateLocale: locale === "zh" ? "en_US" : "zh_CN",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: copy[locale].subheading,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image"],
    },
  };
}
export { languageTag };
