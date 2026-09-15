import { notFound } from "next/navigation";
import Link from "next/link";
import { entries } from "@/lib/content";
import { site } from "@/lib/site";
import { copy, localizedPath, languageTag, type Locale } from "@/lib/i18n";
import { getLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";
import { Markdown } from "@/components/markdown";
import { JsonLd, ProjectLinks, ProjectIcon } from "@/components/ui";
type Props = { params: Promise<{ locale: string; slug: string }> };
export const dynamicParams = false;
export function generateStaticParams({
  params,
}: {
  params: { locale: string };
}) {
  return entries("projects", getLocale(params.locale)).map((p) => ({
    slug: p.slug,
  }));
}
export async function generateMetadata({ params }: Props) {
  const { locale: value, slug } = await params;
  const locale = getLocale(value);
  const p = entries("projects", locale).find((p) => p.slug === slug);
  if (!p) notFound();
  const metadata = pageMetadata(
    locale,
    `/projects/${slug}`,
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
        "text/markdown": localizedPath(locale, `/projects/${slug}.md`),
      },
    },
  };
}
export default async function Project({ params }: Props) {
  const { locale: value, slug } = await params;
  const locale = getLocale(value);
  const t = copy[locale];
  const p = entries("projects", locale).find((p) => p.slug === slug);
  if (!p) notFound();
  return (
    <article className="article-shell">
      <Link className="back-link" href={localizedPath(locale, "/projects")}>
        ← {t.allProjects}
      </Link>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "SoftwareApplication",
              name: p.title,
              description: p.description,
              url: p.website,
              applicationCategory: p.type,
              operatingSystem: p.slug === "selectly" ? "Web browser" : "Web",
              inLanguage: languageTag(locale),
              creator: { "@id": `${site.url}/#person` },
            },
            ...(p.github
              ? [
                  {
                    "@type": "SoftwareSourceCode",
                    name: p.title,
                    codeRepository: p.github,
                    url: p.canonical,
                    author: { "@id": `${site.url}/#person` },
                  },
                ]
              : []),
          ],
        }}
      />
      <header className="article-header">
        <ProjectIcon slug={p.slug} />
        <h1>{p.title}</h1>
        <p>{p.tagline}</p>
        <span className="badge">{p.status}</span>
        <ProjectLinks project={p} />
      </header>
      <Markdown source={p.body} format={p.format} locale={locale} />
      <div className="article-end">
        <span>
          {t.builtBy}{" "}
          <Link href={localizedPath(locale, "/about")}>{t.name}</Link>
        </span>
        <a href={localizedPath(locale, `/projects/${slug}.md`)}>
          {t.markdown} ↗
        </a>
      </div>
    </article>
  );
}
