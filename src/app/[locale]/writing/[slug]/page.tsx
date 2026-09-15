import Link from "next/link";
import { notFound } from "next/navigation";
import { entries } from "@/lib/content";
import { site } from "@/lib/site";
import {
  copy,
  localizedPath,
  categoryLabel,
  languageTag,
  dateLabel,
  type Locale,
} from "@/lib/i18n";
import { getLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";
import { Markdown } from "@/components/markdown";
import { JsonLd } from "@/components/ui";
type Props = { params: Promise<{ locale: string; slug: string }> };
export const dynamicParams = false;
export function generateStaticParams({
  params,
}: {
  params: { locale: string };
}) {
  return entries("writing", getLocale(params.locale)).map((p) => ({
    slug: p.slug,
  }));
}
export async function generateMetadata({ params }: Props) {
  const { locale: value, slug } = await params;
  const locale = getLocale(value);
  const p = entries("writing", locale).find((p) => p.slug === slug);
  if (!p) notFound();
  const metadata = pageMetadata(
    locale,
    `/writing/${slug}`,
    p.title,
    p.description,
  );
  return {
    ...metadata,
    alternates: {
      ...metadata.alternates,
      canonical: p.canonical,
      types: {
        ...metadata.alternates?.types,
        "text/markdown": localizedPath(locale, `/writing/${slug}.md`),
      },
    },
    openGraph: {
      ...metadata.openGraph,
      type: "article",
      publishedTime: p.date,
      modifiedTime: p.updated,
      authors: [p.author || copy[locale].name],
    },
  };
}
export default async function Post({ params }: Props) {
  const { locale: value, slug } = await params;
  const locale = getLocale(value);
  const t = copy[locale];
  const p = entries("writing", locale).find((p) => p.slug === slug);
  if (!p) notFound();
  return (
    <article className="article-shell">
      <Link className="back-link" href={localizedPath(locale, "/writing")}>
        ← {t.allWriting}
      </Link>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: p.title,
          description: p.description,
          datePublished: p.date,
          dateModified: p.updated,
          mainEntityOfPage: p.canonical,
          inLanguage: languageTag(locale),
          articleSection: categoryLabel(p.category, locale),
          keywords: p.tags,
          author: {
            "@type": "Person",
            name: p.author || t.name,
            url: p.authorUrl || site.url,
          },
          publisher: { "@type": "Person", name: t.name, url: site.url },
        }}
      />
      <header className="article-header">
        <span className="badge">{categoryLabel(p.category, locale)}</span>
        <h1>{p.title}</h1>
        <p>{p.description}</p>
        <div className="post-meta">
          <span>
            {p.author || t.name}
            {p.translator ? ` · ${t.translatedBy}: ${p.translator}` : ""}
          </span>
          <span>·</span>
          <time dateTime={p.date}>{dateLabel(p.date, locale)}</time>
          <span>·</span>
          <span>
            {p.minutes} {t.readingTime}
          </span>
        </div>
        <a
          className="text-link"
          href={localizedPath(locale, `/writing/${slug}.md`)}
        >
          {t.markdown} ↗
        </a>
      </header>
      {p.editionNote && (
        <aside className="edition-note">
          {p.editionNote}{" "}
          {p.sourceUrl && <a href={p.sourceUrl}>{t.source} ↗</a>}
        </aside>
      )}
      <Markdown source={p.body} format={p.format} locale={locale} />
      <div className="article-end">
        <span>
          {t.updated}: {dateLabel(p.updated, locale)}
        </span>
        <Link href={localizedPath(locale, "/writing")}>{t.allWriting} →</Link>
      </div>
    </article>
  );
}
