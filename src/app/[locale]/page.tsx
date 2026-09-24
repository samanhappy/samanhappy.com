import Link from "next/link";
import Favorites from "@/components/favorites";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { entries } from "@/lib/content";
import { site, now } from "@/lib/site";
import { copy, localizedPath, languageTag, dateLabel } from "@/lib/i18n";
import { getLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";
import {
  SectionHeading,
  ProjectCard,
  WritingCard,
  Connect,
  JsonLd,
} from "@/components/ui";
type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props) {
  const locale = getLocale((await params).locale);
  return {
    ...pageMetadata(locale, "", copy[locale].name, copy[locale].description),
    title: { absolute: `${copy[locale].name} · samanhappy` },
  };
}
export default async function Home({ params }: Props) {
  const locale = getLocale((await params).locale);
  const t = copy[locale];
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Person",
              "@id": `${site.url}/#person`,
              name: t.name,
              alternateName: ["青扬", "Saman"],
              url: site.url,
              jobTitle: locale === "zh" ? "软件工程师" : "Software Engineer",
              sameAs: [
                site.github,
                site.x,
                "https://mcphub.app",
                "https://selectly.app",
              ],
            },
            {
              "@type": "WebSite",
              "@id": `${site.url}/#website`,
              name: "samanhappy.com",
              url: site.url,
              inLanguage: ["zh-CN", "en"],
              author: { "@id": `${site.url}/#person` },
            },
            {
              "@type": "WebPage",
              url: site.url + localizedPath(locale),
              inLanguage: languageTag(locale),
              isPartOf: { "@id": `${site.url}/#website` },
            },
          ],
        }}
      />
      <section className={`hero hero-${locale}`}>
        <div className="hero-copy">
          <p className="eyebrow">{t.identity}</p>
          <h1>
            {t.name}
            <span className="name-dot">.</span>
          </h1>
          <h2>{t.headline}</h2>
          <p className="hero-english">{t.subheading}</p>
          <p className="hero-status">{t.current}</p>
          <div className="hero-actions">
            <Link
              className="button primary"
              href={localizedPath(locale, "/projects")}
            >
              {t.viewProjects}
              <ArrowRight size={16} />
            </Link>
            <Link className="button" href={localizedPath(locale, "/writing")}>
              {t.readWriting}
            </Link>
          </div>
        </div>
        <aside className="hero-note">
          <p>
            {t.note[0]}
            <br />
            {t.note[1]}
          </p>
          <p className={locale === "zh" ? "chinese-note" : ""}>
            {t.motto[0]}
            <br />
            {t.motto[1]}
          </p>
        </aside>
        <div className="landscape" aria-hidden="true">
          <Image
            src="/images/quiet-mountains.webp"
            alt=""
            width={1050}
            height={700}
            sizes="(max-width: 520px) 300px, 560px"
            priority
          />
        </div>
      </section>
      <section className="home-section">
        <SectionHeading
          title={t.selectedWork}
          href={localizedPath(locale, "/projects")}
          label={t.allProjects}
        />
        <div className="project-grid">
          {entries("projects", locale).map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>
      <section className="home-section">
        <SectionHeading
          title={t.writing}
          href={localizedPath(locale, "/writing")}
          label={t.allWriting}
        />
        <div className="writing-grid">
          {entries("writing", locale)
            .slice(0, 4)
            .map((p) => (
              <WritingCard key={p.slug} post={p} />
            ))}
        </div>
      </section>
      <section className="home-section">
        <SectionHeading
          title={t.favorites}
          href={localizedPath(locale, "/favorites")}
          label={t.allFavorites}
        />
        <p className="favorites-description">{t.favoritesDescription}</p>
        <Favorites locale={locale} limit={3} />
      </section>
      <section className="home-section bottom-grid">
        <div>
          <h2>
            {t.now}{" "}
            <span className="heading-light">
              · {dateLabel(now.updated, locale, true)}
            </span>
          </h2>
          <ul className="now-list">
            {t.nowItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <Link className="text-link" href={localizedPath(locale, "/now")}>
            {t.more}
            <ArrowRight size={14} />
          </Link>
        </div>
        <div className="about-preview">
          <h2>{t.about}</h2>
          <p>{t.aboutPreview}</p>
          <Connect locale={locale} />
        </div>
      </section>
    </>
  );
}
