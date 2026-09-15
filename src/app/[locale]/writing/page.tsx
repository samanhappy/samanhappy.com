import Link from "next/link";
import { entries } from "@/lib/content";
import { categories } from "@/lib/site";
import { copy, localizedPath, categoryLabel, dateLabel } from "@/lib/i18n";
import { getLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";
type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string }>;
};
export async function generateMetadata({ params }: Props) {
  const locale = getLocale((await params).locale);
  return pageMetadata(
    locale,
    "/writing",
    copy[locale].writing,
    copy[locale].writingDescription,
  );
}
export default async function Writing({ params, searchParams }: Props) {
  const locale = getLocale((await params).locale);
  const t = copy[locale];
  const { category } = await searchParams;
  const selected = categories.find((c) => c === category);
  const posts = entries("writing", locale).filter(
    (p) => !selected || p.category === selected,
  );
  return (
    <>
      <div className="page-intro">
        <p className="eyebrow">{t.writingEyebrow}</p>
        <h1>{t.writing}</h1>
        <p>{t.writingDescription}</p>
      </div>
      <nav className="category-nav" aria-label={t.categoryLabel}>
        <Link
          href={localizedPath(locale, "/writing")}
          aria-current={!selected ? "page" : undefined}
        >
          {t.allWriting}
        </Link>
        {categories.map((c) => (
          <Link
            key={c}
            href={`${localizedPath(locale, "/writing")}?category=${encodeURIComponent(c)}`}
            aria-current={selected === c ? "page" : undefined}
          >
            {categoryLabel(c, locale)}
          </Link>
        ))}
      </nav>
      <div className="writing-list">
        {posts.length ? (
          posts.map((p) => (
            <article className="writing-row" key={p.slug}>
              <time dateTime={p.date}>{dateLabel(p.date, locale)}</time>
              <div>
                <Link href={localizedPath(locale, `/writing/${p.slug}`)}>
                  <h2>{p.title}</h2>
                </Link>
                <p>{p.description}</p>
                <span className="post-meta">
                  {p.minutes} {t.readingTime}
                </span>
              </div>
              <span className="badge">{categoryLabel(p.category, locale)}</span>
            </article>
          ))
        ) : (
          <div className="empty">
            <h2>{t.emptyTitle}</h2>
            <p>{t.emptyDescription}</p>
            <Link
              className="text-link"
              href={localizedPath(locale, "/writing")}
            >
              {t.allWriting} →
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
