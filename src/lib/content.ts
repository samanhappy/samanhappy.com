import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { categories, site } from "./site";
import { type Locale, localizedPath, copy, languageTag } from "./i18n";
export type Entry = {
  locale: Locale;
  editionNote?: string;
  sourceUrl?: string;
  format: "md" | "mdx";
  author?: string;
  authorUrl?: string;
  translator?: string;
  slug: string;
  title: string;
  description: string;
  date: string;
  updated: string;
  category: string;
  tags: string[];
  canonical: string;
  body: string;
  minutes: number;
  tagline?: string;
  website?: string;
  github?: string;
  docs?: string;
  status?: string;
  type?: string;
  order?: number;
};
export function entries(
  kind: "writing" | "projects",
  locale: Locale = "zh",
): Entry[] {
  return fs
    .readdirSync(path.join(process.cwd(), "content", kind, locale))
    .filter((f) => /\.mdx?$/.test(f))
    .flatMap((file) => {
      const { data, content } = matter(
        fs.readFileSync(
          path.join(process.cwd(), "content", kind, locale, file),
          "utf8",
        ),
      );
      if (data.draft || (data.date && new Date(data.date) > new Date()))
        return [];
      const slug = file.replace(/\.mdx?$/, "");
      if (!data.title || !data.description)
        throw new Error(`Missing title/description: ${file}`);
      if (
        kind === "writing" &&
        (!data.date || !categories.includes(data.category))
      )
        throw new Error(`Invalid date/category: ${file}`);
      const date = data.date
        ? new Date(data.date).toISOString().slice(0, 10)
        : "2026-09-15";
      return [
        {
          ...data,
          locale,
          format: file.endsWith(".mdx") ? "mdx" : "md",
          slug,
          body: content,
          date,
          updated: data.updated
            ? new Date(data.updated).toISOString().slice(0, 10)
            : date,
          canonical:
            data.canonical ||
            `${site.url}${localizedPath(locale, `/${kind}/${slug}`)}`,
          tags: data.tags || [],
          minutes: Math.max(
            1,
            Math.ceil(
              (content.match(/[\u4e00-\u9fff]/g)?.length || 0) / 400 +
                content.replace(/[\u4e00-\u9fff]/g, "").split(/\s+/).length /
                  220,
            ),
          ),
        } as Entry,
      ];
    })
    .sort((a, b) =>
      kind === "projects"
        ? (a.order || 0) - (b.order || 0)
        : b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug),
    );
}
export function markdown(entry: Entry) {
  const t = copy[entry.locale];
  const body = entry.body.replace(
    /\]\(\/(projects|writing|about|now)([\/)#?])/g,
    `](/${entry.locale}/$1$2`,
  );
  return `# ${entry.title}\n\n${entry.description}\n\nCanonical: ${entry.canonical}\nLanguage: ${languageTag(entry.locale)}\n${t.builtBy}: ${entry.author || t.name}\n${entry.translator ? `${t.translatedBy}: ${entry.translator}\n` : ""}${t.updated}: ${entry.updated}\n\n${entry.editionNote ? `${entry.editionNote}\n${entry.sourceUrl || ""}\n\n` : ""}${body}`;
}
export function escapeXml(s: string) {
  return s.replace(
    /[<>&"']/g,
    (c) =>
      ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        '"': "&quot;",
        "'": "&apos;",
      })[c]!,
  );
}
