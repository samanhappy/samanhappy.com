import Link from "next/link";
import { Connect } from "@/components/ui";
import { entries } from "@/lib/content";
import { copy, localizedPath } from "@/lib/i18n";
import { getLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";
type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props) {
  const locale = getLocale((await params).locale);
  return pageMetadata(
    locale,
    "/about",
    copy[locale].about,
    copy[locale].aboutSubtitle,
  );
}
export default async function About({ params }: Props) {
  const locale = getLocale((await params).locale);
  const t = copy[locale];
  return (
    <article className="article-shell">
      <div className="page-intro">
        <p className="eyebrow">{t.aboutEyebrow}</p>
        <h1>{t.aboutTitle}</h1>
        <p>{t.aboutSubtitle}</p>
      </div>
      <div className="prose">
        {t.aboutIntro.map((p) => (
          <p key={p}>{p}</p>
        ))}
        <h2>{t.currentlyBuilding}</h2>
        <ul>
          {entries("projects", locale).map((p) => (
            <li key={p.slug}>
              <Link href={localizedPath(locale, `/projects/${p.slug}`)}>
                {p.title}
              </Link>{" "}
              — {p.description}
            </li>
          ))}
        </ul>
        <h2>{t.background}</h2>
        <p>
          {t.backgroundBefore}
          <a href="https://github.com/megaease/easeprobe">EaseProbe</a>
          {t.backgroundAfter}
        </p>
        <p>{t.backgroundText}</p>
        <h2>{t.howIWork}</h2>
        <p>{t.howIWorkText}</p>
        <h2>{t.favorites}</h2>
        <p>{t.favoritesDescription}</p>
        <p>
          <Link href={localizedPath(locale, "/favorites")}>
            {t.allFavorites} →
          </Link>
        </p>
        <h2>{t.connect}</h2>
      </div>
      <Connect locale={locale} />
    </article>
  );
}
