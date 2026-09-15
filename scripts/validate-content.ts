import assert from "node:assert/strict";
import fs from "node:fs";
import { entries } from "../src/lib/content";
import { locales, localizedPath } from "../src/lib/i18n";
import { site } from "../src/lib/site";
for (const kind of ["projects", "writing"] as const) {
  const translated = locales.map((locale) => entries(kind, locale));
  assert.deepEqual(
    translated[0].map((p) => p.slug).sort(),
    translated[1].map((p) => p.slug).sort(),
    `${kind}: publish matching zh/en slugs; keep unfinished pairs as drafts`,
  );
  for (const p of translated[0]) {
    const other = translated[1].find((entry) => entry.slug === p.slug)!;
    assert.equal(
      other.category,
      p.category,
      `${kind}/${p.slug}: category mismatch`,
    );
    assert.equal(
      other.date,
      p.date,
      `${kind}/${p.slug}: publication date mismatch`,
    );
  }
  for (const posts of translated)
    for (const p of posts) {
      assert.ok(
        p.title && p.description && p.body.trim(),
        `${kind}/${p.locale}/${p.slug}: empty content`,
      );
      assert.ok(
        !Number.isNaN(Date.parse(p.date)) &&
          !Number.isNaN(Date.parse(p.updated)),
      );
      if (p.canonical.startsWith(site.url))
        assert.equal(
          p.canonical,
          site.url + localizedPath(p.locale, `/${kind}/${p.slug}`),
          "canonical locale mismatch",
        );
      for (const match of p.body.matchAll(/!\[[^\]]*\]\((\/images\/[^)]+)\)/g))
        assert.ok(fs.existsSync(`public${match[1]}`), match[1]);
    }
}
console.log("PASS: bilingual content pairs, metadata and local images.");
