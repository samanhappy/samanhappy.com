import Link from "next/link";
import {
  ArrowUpRight,
  ArrowRight,
  Github,
  Rss,
  Mail,
  Box,
  Terminal,
  Compass,
  BookOpen,
} from "lucide-react";
import type { Entry } from "@/lib/content";
import { site } from "@/lib/site";
import {
  copy,
  localizedPath,
  categoryLabel,
  dateLabel,
  type Locale,
} from "@/lib/i18n";
export function External({
  href,
  children,
  event,
  locale,
}: {
  href: string;
  children: React.ReactNode;
  event?: string;
  locale: Locale;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-umami-event={event}
    >
      {children}
      <ArrowUpRight size={13} />
      <span className="sr-only">{copy[locale].newWindow}</span>
    </a>
  );
}
export function SectionHeading({
  title,
  href,
  label,
}: {
  title: string;
  href: string;
  label: string;
}) {
  return (
    <div className="section-heading">
      <h2>{title}</h2>
      <Link className="text-link" href={href}>
        {label}
        <ArrowRight size={15} />
      </Link>
    </div>
  );
}
export function ProjectIcon({ slug }: { slug: string }) {
  const Icon =
    slug === "mcphub" ? Box : slug === "codex-reset" ? Terminal : Compass;
  return (
    <span className={`project-icon ${slug}`}>
      <Icon size={24} strokeWidth={1.4} />
    </span>
  );
}
export function ProjectLinks({ project: p }: { project: Entry }) {
  return (
    <div className="project-links">
      {p.website && (
        <External
          locale={p.locale}
          href={p.website}
          event={`project-${p.slug}`}
        >
          {copy[p.locale].website}
        </External>
      )}
      {p.github && (
        <External locale={p.locale} href={p.github}>
          <Github size={14} />
          GitHub
        </External>
      )}
      {p.docs && (
        <External locale={p.locale} href={p.docs}>
          <BookOpen size={14} />
          {copy[p.locale].docs}
        </External>
      )}
    </div>
  );
}
export function ProjectCard({ project: p }: { project: Entry }) {
  return (
    <article
      className={`project-card ${p.slug === "mcphub" ? "featured" : ""}`}
    >
      <div className="card-top">
        <ProjectIcon slug={p.slug} />
        {p.slug === "mcphub" && (
          <span className="badge">{copy[p.locale].featured}</span>
        )}
      </div>
      <Link
        className="project-title"
        href={localizedPath(p.locale, `/projects/${p.slug}`)}
      >
        <h3>{p.title}</h3>
      </Link>
      <p className="tagline">{p.tagline}</p>
      <p className="project-description">{p.description}</p>
      <div className="tags">
        {p.tags.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
      <ProjectLinks project={p} />
    </article>
  );
}
export function WritingCard({ post: p }: { post: Entry }) {
  return (
    <Link
      className="writing-card"
      href={localizedPath(p.locale, `/writing/${p.slug}`)}
    >
      <span className="badge">{categoryLabel(p.category, p.locale)}</span>
      <h3>{p.title}</h3>
      <p>{p.description}</p>
      <div className="post-meta">
        <time dateTime={p.date}>{dateLabel(p.date, p.locale)}</time>
        <span>·</span>
        <span>
          {p.minutes} {copy[p.locale].readingTime}
        </span>
      </div>
    </Link>
  );
}
export function Connect({ locale }: { locale: Locale }) {
  return (
    <div className="connect">
      <External locale={locale} href={site.github}>
        <Github size={18} />
        GitHub
      </External>
      <External locale={locale} href={site.x}>
        <span aria-hidden="true">𝕏</span>
      </External>
      <a href={localizedPath(locale, "/feed.xml")}>
        <Rss size={17} />
        RSS
      </a>
      <a href={`mailto:${site.email}`}>
        <Mail size={17} />
        {copy[locale].email}
      </a>
      {process.env.NEXT_PUBLIC_WECHAT_URL && (
        <External locale={locale} href={process.env.NEXT_PUBLIC_WECHAT_URL}>
          {copy[locale].wechat}
        </External>
      )}
    </div>
  );
}
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
