import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import Header from "@/components/header";
import { site } from "@/lib/site";
import {
  copy,
  isLocale,
  locales,
  languageTag,
  localizedPath,
} from "@/lib/i18n";
import "../globals.css";
export const dynamicParams = false;
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = copy[locale];
  return {
    metadataBase: new URL(site.url),
    title: { default: `${t.name} · samanhappy`, template: `%s · ${t.name}` },
    description: t.description,
    twitter: { card: "summary_large_image", creator: "@samanhappy" },
    robots: { index: true, follow: true },
    icons: { icon: "/icon.svg" },
  };
}
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = copy[locale];
  return (
    <html lang={languageTag(locale)}>
      <body>
        <a className="skip-link" href="#main">
          {t.skip}
        </a>
        <Header locale={locale} />
        <main id="main">{children}</main>
        <footer className="site-footer">
          <div>
            <p>© 2026 {t.name}</p>
            <p>{t.subheading}</p>
          </div>
          <div className="footer-links">
            <a href={site.github}>GitHub</a>
            <a href={localizedPath(locale, "/feed.xml")}>RSS</a>
            <a href={localizedPath(locale, "/llms.txt")}>llms.txt</a>
          </div>
        </footer>
        {process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL &&
          process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID && (
            <Script
              defer
              src={process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL}
              data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
              strategy="afterInteractive"
            />
          )}
      </body>
    </html>
  );
}
