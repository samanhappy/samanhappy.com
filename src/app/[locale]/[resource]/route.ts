import { entries, markdown, escapeXml as xml } from "@/lib/content";
import { site } from "@/lib/site";
import {
  locales,
  copy,
  localizedPath,
  languageTag,
  isLocale,
  type Locale,
} from "@/lib/i18n";
export const dynamic = "force-static";
export const dynamicParams = false;
export function generateStaticParams() {
  return locales.flatMap((locale) =>
    ["feed.xml", "llms.txt", "llms-full.txt"].map((resource) => ({
      locale,
      resource,
    })),
  );
}
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string; resource: string }> },
) {
  const { locale, resource } = await params;
  if (!isLocale(locale)) return new Response("Not found", { status: 404 });
  const projects = entries("projects", locale),
    posts = entries("writing", locale),
    t = copy[locale];
  let body: string;
  let type = "text/plain";
  if (resource === "feed.xml") {
    type = "application/rss+xml";
    body = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>${xml(t.name)} · ${t.writing}</title><link>${site.url}${localizedPath(locale, "/writing")}</link><description>${xml(t.description)}</description><language>${languageTag(locale)}</language><atom:link href="${site.url}${localizedPath(locale, "/feed.xml")}" rel="self" type="application/rss+xml"/>${posts.map((p) => `<item><title>${xml(p.title)}</title><link>${xml(p.canonical)}</link><guid isPermaLink="true">${xml(p.canonical)}</guid><description>${xml(p.description)}</description><pubDate>${new Date(p.date).toUTCString()}</pubDate><category>${xml(t.categories[p.category as keyof typeof t.categories] || p.category)}</category></item>`).join("")}</channel></rss>`;
  } else if (resource === "llms.txt" || resource === "llms-full.txt") {
    body = `# ${t.name}\n\n${t.description}\n\n${site.url}${localizedPath(locale)}\nGitHub: ${site.github}\n\n## ${t.nav[1]}\n\n${projects.map((p) => `### ${p.title}\n${p.tagline}\n${p.description}\n${p.website}\n${p.canonical}\nMarkdown: ${p.canonical}.md`).join("\n\n")}\n\n## ${t.writing}\n\n${posts.map((p) => `- [${p.title}](${p.canonical}.md): ${p.description}`).join("\n")}\n\n## ${t.about}\n\n${site.url}${localizedPath(locale, "/about")}\n\n## ${t.now}\n\n${site.url}${localizedPath(locale, "/now")}\n`;
    if (resource === "llms-full.txt")
      body +=
        "\n\n" + [...projects, ...posts].map(markdown).join("\n\n---\n\n");
  } else return new Response("Not found", { status: 404 });
  return new Response(body, {
    headers: {
      "Content-Type": `${type}; charset=utf-8`,
      "Content-Language": languageTag(locale),
    },
  });
}
