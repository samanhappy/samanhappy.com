import assert from "node:assert/strict";
import { GET } from "../src/app/route";
const base = process.env.CHECK_BASE_URL || "http://127.0.0.1:3100";
async function main() {
  const internalResponse = GET(
    new Request("http://0.0.0.0:3000/?ref=proxy-check", {
      headers: {
        "Accept-Language": "en",
        "X-Forwarded-Host": "samanhappy.com",
      },
    }),
  );
  assert.equal(internalResponse.headers.get("location"), "/en?ref=proxy-check");
  for (const [language, locale] of [
    ["zh-CN,zh;q=0.9,en;q=0.8", "zh"],
    ["zh-TW,en;q=0.8", "zh"],
    ["en-US,en;q=0.9,zh;q=0.8", "en"],
    ["zh;q=0.5,en;q=0.9", "en"],
    ["en;q=0.5,zh;q=0.9", "zh"],
    ["en,zh", "en"],
    ["fr-FR,en;q=0.8", "en"],
    ["en;q=0,zh;q=0.5", "zh"],
    ["en;q=invalid,zh", "zh"],
    ["fr-FR", "zh"],
    ["", "zh"],
  ]) {
    const response = await fetch(`${base}/?ref=language-check`, {
      headers: { "Accept-Language": language },
      redirect: "manual",
    });
    assert.equal(response.status, 307, language);
    const location = new URL(response.headers.get("location")!, base);
    assert.equal(
      location.origin,
      new URL(base).origin,
      "redirect stays on the public origin",
    );
    assert.equal(location.pathname, `/${locale}`, language);
    assert.equal(location.search, "?ref=language-check");
    assert.match(response.headers.get("cache-control") || "", /no-store/);
    assert.match(response.headers.get("vary") || "", /Accept-Language/i);
  }
  for (const locale of ["zh", "en"]) {
    const r = await fetch(`${base}/${locale}`, {
      headers: { "Accept-Language": locale === "zh" ? "en" : "zh" },
      redirect: "manual",
    });
    assert.equal(r.status, 200, `${locale} home`);
    const html = await r.text();
    assert.ok(
      html.includes(
        `<title>${locale === "zh" ? "青扬" : "Saman"} · samanhappy</title>`,
      ),
      "homepage title",
    );
    assert.match(
      html,
      new RegExp(`<html[^>]+lang="${locale === "zh" ? "zh-CN" : "en"}"`),
    );
    assert.ok(
      html.includes(`href="https://samanhappy.com/${locale}"`),
      "canonical",
    );
    for (const lang of ["zh-CN", "en", "x-default"])
      assert.ok(
        html.toLowerCase().includes(`hreflang="${lang.toLowerCase()}"`),
        `hreflang ${lang}`,
      );
    assert.ok(html.includes(locale === "zh" ? "查看项目" : "View projects"));
  }
  console.log(
    "PASS: bilingual home routing, server-rendered language, copy and hreflang.",
  );
}
main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
