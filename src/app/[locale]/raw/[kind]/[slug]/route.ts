import { entries, markdown } from "@/lib/content";
import { isLocale, languageTag, locales } from "@/lib/i18n";
export const dynamic = "force-static";
export const dynamicParams = false;
export function generateStaticParams() {
  return locales.flatMap((locale) =>
    (["projects", "writing"] as const).flatMap((kind) =>
      entries(kind, locale).map((p) => ({ locale, kind, slug: p.slug })),
    ),
  );
}
export async function GET(
  _request: Request,
  {
    params,
  }: { params: Promise<{ locale: string; kind: string; slug: string }> },
) {
  const { locale, kind, slug } = await params;
  if (!isLocale(locale) || (kind !== "projects" && kind !== "writing"))
    return new Response("Not found", { status: 404 });
  const entry = entries(kind, locale).find((p) => p.slug === slug);
  return entry
    ? new Response(markdown(entry), {
        headers: {
          "Content-Type": "text/markdown; charset=utf-8",
          "Content-Language": languageTag(locale),
          "X-Robots-Tag": "noindex",
          Link: `<${entry.canonical}>; rel="canonical"`,
        },
      })
    : new Response("Not found", { status: 404 });
}
