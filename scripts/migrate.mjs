import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import sharp from "sharp";
const root = "~/code/github/me";
let count = 0;
for (const year of ["2025", "2026"])
  for (const file of fs
    .readdirSync(`${root}/src/data/blog/${year}`)
    .filter((f) => f.endsWith(".zh.md"))) {
    const oldPath = `${root}/src/data/blog/${year}/${file}`;
    const { data, content } = matter(fs.readFileSync(oldPath, "utf8"));
    if (data.draft) continue;
    const slug = file.replace(".zh.md", "");
    let body = content;
    for (const match of [...body.matchAll(/!\[([^\]]*)\]\((\.\.\/[^)]+)\)/g)]) {
      const input = path.resolve(path.dirname(oldPath), match[2]);
      const name =
        slug + "-" + path.basename(input, path.extname(input)) + ".webp";
      await sharp(input)
        .resize({ width: 1440, withoutEnlargement: true })
        .webp({ quality: 82 })
        .toFile(`public/images/${name}`);
      body = body.replace(match[0], `![${match[1]}](/images/${name})`);
    }
    const date = new Date(data.pubDatetime).toISOString().slice(0, 10);
    const updated = new Date(data.modDatetime || data.pubDatetime)
      .toISOString()
      .slice(0, 10);
    const front = {
      title: data.title,
      description: data.description,
      date,
      updated,
      category:
        slug === "why-i-developed-selectly" ? "Building" : "AI Engineering",
      tags: data.tags || [],
      canonical: `https://samanhappy.com/zh/writing/${slug}`,
      draft: false,
    };
    fs.writeFileSync(
      `content/writing/zh/${slug}.md`,
      matter.stringify(body, front),
    );
    count++;
  }
console.log(`Migrated ${count} published Chinese articles; drafts excluded.`);
