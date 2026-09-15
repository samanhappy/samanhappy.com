import assert from "node:assert/strict";
import { entries, markdown } from "../src/lib/content";
import { locales, languageTag, localizedPath } from "../src/lib/i18n";
const base = process.env.CHECK_BASE_URL || "http://127.0.0.1:3100";
async function main() {
  let total = 0;
  for (const locale of locales) {
    for (const kind of ["projects", "writing"] as const)
      for (const p of entries(kind, locale)) {
        const url = localizedPath(locale, `/${kind}/${p.slug}`);
        const r = await fetch(base + url);
        assert.equal(r.status, 200, url);
        const html = await r.text();
        const json = Array.from(
          html.matchAll(
            /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
          ),
          (m) => JSON.parse(m[1]),
        );
        assert.ok(json.length, url);
        assert.match(
          html,
          new RegExp(`<html[^>]+lang="${languageTag(locale)}"`),
        );
        assert.ok(html.includes(`href="${p.canonical}"`), `${url}: canonical`);
        for (const other of locales)
          assert.ok(
            html.includes(
              `href="https://samanhappy.com${localizedPath(other, `/${kind}/${p.slug}`)}"`,
            ),
            "alternate locale",
          );
        assert.ok(
          !html.includes("http://localhost:3000"),
          `${url}: localhost metadata`,
        );
        const raw = await fetch(base + url + ".md");
        assert.equal(raw.status, 200, url + ".md");
        assert.match(raw.headers.get("content-type") || "", /text\/markdown/);
        assert.equal(raw.headers.get("content-language"), languageTag(locale));
        assert.equal(await raw.text(), markdown(p));
        total++;
      }
    for (const path of [
      "",
      "/projects",
      "/writing",
      "/about",
      "/now",
      "/feed.xml",
      "/llms.txt",
      "/llms-full.txt",
    ])
      assert.equal(
        (await fetch(base + localizedPath(locale, path))).status,
        200,
        path,
      );
    const rss = await (
      await fetch(base + localizedPath(locale, "/feed.xml"))
    ).text();
    assert.ok(rss.includes(`<language>${languageTag(locale)}</language>`));
    assert.equal(
      (rss.match(/<item>/g) || []).length,
      entries("writing", locale).length,
    );
    const llms = await (
      await fetch(base + localizedPath(locale, "/llms-full.txt"))
    ).text();
    for (const p of [
      ...entries("projects", locale),
      ...entries("writing", locale),
    ])
      assert.ok(llms.includes(p.title));
    assert.ok(
      !llms.includes("MCPHub：从 0 到 2000 Star 的复盘"),
      "draft leaked",
    );
    for (const path of [
      "/missing",
      "/writing/unpublished",
      "/projects/missing.md",
    ])
      assert.equal(
        (await fetch(base + localizedPath(locale, path))).status,
        404,
        path,
      );
  }
  for (const route of ["/does-not-exist", "/fr/projects", "/fr/feed.xml"])
    assert.equal((await fetch(base + route)).status, 404, route);
  for (const [old, dest] of [
    ["/", "/zh"],
    ["/writing", "/zh/writing"],
    ["/projects/mcphub.md", "/zh/projects/mcphub.md"],
    [
      "/en/posts/why-i-developed-selectly",
      "/en/writing/why-i-developed-selectly",
    ],
    ["/feed.xml", "/zh/feed.xml"],
  ]) {
    const r = await fetch(base + old, { redirect: "manual" });
    assert.equal(r.status, 308);
    assert.equal(new URL(r.headers.get("location")!, base).pathname, dest);
  }
  const sitemap = await (await fetch(base + "/sitemap.xml")).text();
  for (const locale of locales)
    assert.ok(sitemap.includes(`https://samanhappy.com/${locale}/writing`));
  assert.ok(sitemap.includes('hreflang="en"'));
  assert.equal((await fetch(base + "/robots.txt")).status, 200);
  console.log(
    `PASS: ${total} localized content pages, Markdown parity, JSON-LD, hreflang, resources, redirects and 404s.`,
  );
}
main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
