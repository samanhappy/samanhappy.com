import assert from "node:assert/strict";
const base = process.env.CHECK_BASE_URL || "http://127.0.0.1:3100";
async function main() {
  for (const locale of ["zh", "en"]) {
    const r = await fetch(`${base}/${locale}`);
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
