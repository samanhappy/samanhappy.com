import Link from "next/link";
import { now } from "@/lib/site";
import { copy, localizedPath, dateLabel } from "@/lib/i18n";
import { getLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";
type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props) {
  const locale = getLocale((await params).locale);
  return pageMetadata(
    locale,
    "/now",
    copy[locale].now,
    copy[locale].nowDescription,
  );
}
export default async function Now({ params }: Props) {
  const locale = getLocale((await params).locale);
  const t = copy[locale];
  return (
    <article className="article-shell">
      <div className="page-intro">
        <p className="eyebrow">{t.nowEyebrow}</p>
        <h1>
          {t.now}{" "}
          <span className="heading-light">
            · {dateLabel(now.updated, locale, true)}
          </span>
        </h1>
        <p>{t.nowDescription}</p>
        <span className="post-meta">
          {t.updated}: {dateLabel(now.updated, locale)}
        </span>
      </div>
      <div className="prose">
        {t.nowSections.map((section) => (
          <section key={section.title}>
            <h2>{section.title}</h2>
            <p>{section.body}</p>
            <p>
              <Link href={localizedPath(locale, section.link)}>
                {section.label} →
              </Link>
            </p>
          </section>
        ))}
        <hr />
        <p>
          {t.nowFooter} <a href="https://nownownow.com/about">{t.nowLearn}</a>
        </p>
      </div>
    </article>
  );
}
