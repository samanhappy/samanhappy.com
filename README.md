# samanhappy.com

青扬的中英文个人网站，使用 Next.js App Router、TypeScript、Markdown / MDX。内容保存在 Git 仓库，无数据库或 CMS。

## 本地运行

```bash
npm ci
npm run dev
```

- 中文：`http://localhost:3000/zh`
- English：`http://localhost:3000/en`

生产预览：

```bash
npm run build
npm run start
```

Node.js 22 或更高。部署到 Vercel 时选择 Next.js，保留默认构建命令，绑定 `samanhappy.com`。当前只完成实现与本地验证，未部署上线。

## 国际化约定

- `/zh` 与 `/en` 使用同一组页面组件，服务器直接输出正确的 `<html lang>`，不依赖浏览器翻译。
- `/` 永久重定向到 `/zh`。不根据浏览器语言自动跳转，链接始终对应明确、可分享的语言版本。
- 导航中的 `中文 / EN` 切换到同 slug 的对应页面；正常点击保留查询参数和锚点。关闭 JavaScript 也可以切换对应页面。
- `src/lib/i18n.ts` 集中维护界面文案、日期显示、语言与路径工具。中文界面的导航、按钮、状态、分类、页脚等使用中文，产品名和协议名保留原名。
- 正文按 `content/<kind>/<locale>/<slug>.md` 分开维护，不在请求时调用翻译服务。
- `AI Engineering`、`Building`、`Independent` 是稳定的分类值。界面分别显示对应语言标签，切换语言时保留筛选条件。
- 两版共享 slug、发布时间和分类。`npm run build` 会先检查公开内容是否成对、canonical 是否匹配语言以及图片是否存在；翻译未完成时将对应两版都保持为草稿。
- 不支持的语言或不存在的地址返回 404；全局兜底页提供中英文返回入口。

## 内容维护

- `src/lib/site.ts`：站点地址、公开联系方式、Now 更新日期。
- `src/lib/i18n.ts`：首页、About、Now 与公共界面的中英文文案。
- `content/projects/zh/`、`content/projects/en/`：三个产品的介绍、链接与状态。
- `content/writing/zh/`、`content/writing/en/`：文章，支持 `.md` 和 `.mdx`。MDX 只应包含仓库中的可信内容。

文章 frontmatter 示例（在 `zh` 和 `en` 下各创建一份相同文件名）：

```yaml
---
title: 文章标题
description: 用一两句话概括内容
date: "2026-09-15"
updated: "2026-09-15"
category: AI Engineering
tags: [MCP, AI Coding]
draft: false
---
```

`canonical` 默认根据语言和 slug 生成；只有需要覆盖时才填写完整 URL。本站 canonical 必须与语言匹配，例如 `https://samanhappy.com/en/writing/example`。

`draft: true` 与未来日期的文章不会进入网页、RSS、sitemap 或 llms 输出。文件名即 URL slug，不需要额外的翻译 ID。

可选 `author`、`authorUrl`、`translator` 用于署名。`editionNote` 和 `sourceUrl` 用于说明译稿或整理版本的来源，这些信息同时写入 HTML 和 Markdown。

图片放在 `public/images/`，优先使用 WebP / AVIF，在 `src/lib/image-dimensions.json` 中记录真实尺寸。文章中的 `/writing/...`、`/projects/...` 内链自动使用当前语言；图片资源路径不加语言前缀。

### 当前文章来源

- 中文：旧站的 8 篇已发布文章，保留日期与来源，未迁移草稿。
- 英文：复用旧站已有的 6 篇英文文章；补齐 Matt Pocock skills 与 Mitchell Hashimoto 两篇英文版本。
- Mitchell 的英文版本由本站中文译稿转写，显式注明不是原文逐字转载，并链接原文。
- `scripts/migrate.mjs` 是最初中文迁移的来源记录，不是构建步骤；重复运行会覆盖已完善的中文稿件，日常维护请直接编辑内容文件。

## SEO 与机器可读接口

两版页面分别提供 canonical、`zh-CN` / `en` / `x-default` hreflang、Open Graph 及本地化 JSON-LD。

- `/<locale>/projects/[slug]`、`/<locale>/writing/[slug]`：静态生成 HTML。
- 同路径加 `.md`：纯 Markdown，内部重写到 `/<locale>/raw/<kind>/<slug>`；标记 Content-Language、canonical 和 noindex。
- `/<locale>/feed.xml`：该语言的 RSS。
- `/<locale>/llms.txt`：该语言的网站与内容索引。
- `/<locale>/llms-full.txt`：该语言的完整公开内容。
- `/sitemap.xml`：两版全部规范页面与 hreflang 对应关系。
- `/robots.txt`：全站爬虫规则。

旧站无语言前缀的 `/projects`、`/writing`、`/about`、`/now` 及子路径永久重定向到中文版。`/posts/:slug`、`/zh/posts/:slug`、`/en/posts/:slug` 对应迁移到相同语言的 Writing。旧 RSS 与 llms 入口也保留跳转。

Writing 分类列表在服务端按请求渲染，其余主要内容页面静态生成。布局采用 Next.js [语言路由方案](https://nextjs.org/docs/app/guides/internationalization)；全局 404 使用 `globalNotFound` 配置，适配顶层动态语言布局。

## 可选配置

复制 `.env.example` 到 `.env.local`：

- `NEXT_PUBLIC_UMAMI_SCRIPT_URL`：Umami 脚本完整 URL。
- `NEXT_PUBLIC_UMAMI_WEBSITE_ID`：Umami website ID。
- `NEXT_PUBLIC_WECHAT_URL`：公开公众号主页或介绍页 URL。

未配置时，不加载统计脚本，也不显示公众号链接。两版共用统计站点，页面路径天然区分语言；产品官网链接使用 `project-<slug>` 事件。修改环境变量后重新构建。

## 验证

```bash
npm run typecheck
npm run format:check
npm run build
# 另一个终端启动生产预览
npm run start -- --hostname 127.0.0.1 --port 3100
npm run check:i18n
npm run check
npm run check:browser
```

浏览器检查默认使用 macOS Chrome，其他环境设置 `CHROME_PATH`。使用 `CHECK_BASE_URL` 指定其他预览地址。Lighthouse 的本地测量与部署边界见 `VALIDATION.md`。
