import Link from "next/link";
import { entries } from "@/lib/content";
import { ProjectIcon, ProjectLinks } from "@/components/ui";
import { copy, localizedPath } from "@/lib/i18n";
import { getLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";
type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props) {
  const locale = getLocale((await params).locale);
  return pageMetadata(
    locale,
    "/projects",
    copy[locale].nav[1],
    copy[locale].projectsDescription,
  );
}
export default async function Projects({ params }: Props) {
  const locale = getLocale((await params).locale);
  const t = copy[locale];
  return (
    <>
      <div className="page-intro">
        <p className="eyebrow">{t.projectsEyebrow}</p>
        <h1>{t.nav[1]}</h1>
        <p>{t.projectsDescription}</p>
      </div>
      <div className="project-list">
        {entries("projects", locale).map((p) => (
          <article className="project-row" key={p.slug}>
            <ProjectIcon slug={p.slug} />
            <div>
              <Link href={localizedPath(locale, `/projects/${p.slug}`)}>
                <h2>
                  {p.title} <span className="text-link">↗</span>
                </h2>
              </Link>
              <p>
                {p.tagline}
                <br />
                {p.description}
              </p>
              <div className="tags">
                {p.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <Link
                className="text-link"
                href={localizedPath(locale, `/projects/${p.slug}`)}
              >
                {t.explore} →
              </Link>
            </div>
            <div className="project-aside">
              <p>
                {p.status} · {p.type}
              </p>
              <ProjectLinks project={p} />
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
