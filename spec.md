# samanhappy.com 个人网站开发 Spec

## 1. 项目目标

建设个人网站 **samanhappy.com**，作为青扬的长期个人数字主页。

网站不是传统简历站，也不是纯博客，而是统一连接：

- 个人身份
- MCPHub
- Codex Reset
- Selectly
- 技术写作
- 独立开发探索

核心目标：

1. 让访客 5 秒内理解「我是谁、我在做什么」
2. 为三个产品建立统一的个人品牌背书
3. 沉淀 AI Engineering / Building / Independent 相关内容
4. 对 Google、ChatGPT、Claude 等搜索与 AI 系统友好
5. 设计简洁、克制，可长期维护

参考：

- https://tw93.fun/
- https://idoubi.ai/

设计气质更偏 tw93.fun，信息组织参考 idoubi.ai。

---

# 2. 品牌定位

## 中文定位

**做有用的产品，写真实的思考。**

## 英文定位

**Building useful tools for the AI-native world.**

## 身份标签

Software Engineer · AI Builder · Open Source

不要强调：

- Java 工程师
- 保险行业开发
- 大量技术栈
- 完整工作履历

这些内容可以在 About 中适度出现，但不作为首页核心定位。

---

# 3. 网站结构

```text
/
├── /projects
│   ├── /projects/mcphub
│   ├── /projects/codex-reset
│   └── /projects/selectly
├── /writing
│   └── /writing/[slug]
├── /about
├── /now
├── /llms.txt
├── /llms-full.txt
├── /robots.txt
├── /sitemap.xml
└── /feed.xml
```

主导航：

```text
Home
Projects
Writing
About
Now
```

右侧：

```text
GitHub
中文 / EN
```

第一版如果国际化成本较高，可以先只做中文，但页面结构必须预留 i18n。

---

# 4. 首页

首页保持在约 5 个主要区块。

## 4.1 Hero

内容：

```text
青扬

Software Engineer · AI Builder · Open Source

做有用的产品，写真实的思考。
Building useful tools for the AI-native world.

[Projects] [Writing] [GitHub]
```

附加一行较弱的状态文字：

```text
Currently building MCPHub and exploring independent products.
```

要求：

- 不使用超大字号营销式 Hero
- 不使用渐变背景
- 不使用 AI 紫
- 不放复杂插画
- 页面首屏保持大量留白

---

# 5. Selected Work

首页第二部分：

```text
Selected Work
```

展示三个项目。

## MCPHub

作为主项目，卡片面积最大。

```text
MCPHub

Open-source MCP Gateway for AI Agents.

Connect, manage and govern MCP servers through one unified gateway.

Open Source · MCP · Agent Infrastructure
```

操作：

```text
Website
GitHub
Docs
```

链接：

- https://mcphub.app
- https://github.com/samanhappy/mcphub
- https://docs.mcphub.app

---

## Codex Reset

```text
Codex Reset

Know when your Codex quota resets.

面向中文 Codex 用户的额度、重置预测与及时通知服务。

AI Coding · Developer Tool
```

链接：

https://codex-reset.cn

---

## Selectly

```text
Selectly

AI actions wherever you select text.

网页划词翻译、解释、润色和 AI 工作流。

Browser Extension · AI Tool
```

链接：

https://selectly.app

---

# 6. Writing

首页展示最近 3～5 篇文章。

一级分类固定为：

```text
AI Engineering
Building
Independent
```

分别对应：

### AI Engineering

- MCP
- Agent
- AI Coding
- AI Native Engineering
- Developer Tools
- Software Engineering

### Building

记录：

- MCPHub
- Codex Reset
- Selectly
- 产品设计
- 用户反馈
- 发布复盘
- 产品决策

### Independent

记录：

- 独立开发
- 自由职业探索
- 商业化
- 个人成长
- 产品思考

不要做过细分类。

---

# 7. Now

首页展示简短 Now Preview。

例如：

```text
Now · September 2026

Building MCPHub into a trusted MCP gateway.

Launching Codex Reset for Chinese developers.

Exploring the path from software engineer to independent builder.

→ More
```

独立页面：

```text
/now
```

每月或有重大变化时更新。

页面注明：

```text
Last updated: YYYY-MM-DD
```

---

# 8. About

About 不写成长篇简历。

推荐结构：

```text
Hi, I'm Saman.

I'm a software engineer and independent product builder.

I focus on AI engineering, developer tools and agent infrastructure.

During the day, I work on real-world enterprise AI systems.
Outside work, I build open-source projects and independent products.

I believe in building useful things, sharing what I learn,
and letting good work compound over time.
```

然后展示：

```text
Currently building

MCPHub
Codex Reset
Selectly
```

最后：

```text
GitHub
X
微信公众号
Email
```

如果暂时不希望公开 Email，可不展示。

---

# 9. Projects 页面

`/projects`

不是普通卡片瀑布流。

顶部文字：

```text
Projects

Products and open-source tools I've built and continue to improve.
```

展示三个项目。

每个项目包含：

```text
名称
一句话介绍
状态
产品类型
核心标签
Website
GitHub（如有）
Docs（如有）
```

状态例如：

```text
Active
Open Source
Experimental
Maintained
```

---

# 10. 独立项目页面

每个项目必须有自己的结构化页面。

例如：

```text
/projects/mcphub
```

统一结构：

```text
Title
One-line description

Overview

Who it's for

Use it when

Key Features

Why I built it

Compared with

Status

Links

FAQ
```

MCPHub 示例：

```text
Who it's for

AI developers and teams managing multiple MCP servers.

Use MCPHub when you need to:

- manage multiple MCP servers
- expose a unified endpoint
- control access
- monitor server health
- introduce governance around agent tools
```

项目页的目的不仅是展示给人看，也要方便搜索引擎和 LLM 理解产品。

---

# 11. Writing 页面

路径：

```text
/writing
```

按时间倒序。

每篇显示：

```text
标题
摘要
日期
分类
阅读时间
```

文章页：

```text
/writing/[slug]
```

必须支持：

```text
title
description
date
updated
category
tags
canonical
```

正文排版优先于复杂视觉设计。

文章宽度控制在：

```text
680–760px
```

---

# 12. GEO / SEO

从第一版就实现。

必须提供：

```text
/robots.txt
/sitemap.xml
/feed.xml
/llms.txt
/llms-full.txt
```

## llms.txt

简洁介绍：

```text
# Saman

Saman is a software engineer, AI builder and open-source developer.

He builds tools for the AI-native world.

## Projects

### MCPHub
Open-source MCP gateway for AI agents.
https://mcphub.app

### Codex Reset
Codex quota reset tracking and notification service for Chinese developers.
https://codex-reset.cn

### Selectly
AI browser extension for selected text.
https://selectly.app

## Writing

https://samanhappy.com/writing
```

---

# 13. Markdown 输出

所有文章和项目页面同时提供纯 Markdown 版本。

例如：

```text
/projects/mcphub
/projects/mcphub.md

/writing/xxx
/writing/xxx.md
```

Markdown 页面不要包含导航、JS、页面装饰。

方便：

- ChatGPT
- Claude
- Perplexity
- 搜索爬虫
- AI Agent

读取。

---

# 14. Structured Data

加入 JSON-LD。

首页：

```text
Person
WebSite
```

项目页：

```text
SoftwareApplication
SoftwareSourceCode
```

文章：

```text
Article
```

Person 的 `sameAs` 至少包含：

```text
GitHub
MCPHub
Selectly
Codex Reset
X（如果公开）
```

用于建立实体关系。

---

# 15. 产品之间的关系

每个产品官网未来应该反向链接：

```text
Built by Saman
→ samanhappy.com
```

个人网站项目页链接：

```text
Official Website
GitHub
Documentation
```

形成：

```text
samanhappy.com
      ↓
MCPHub / Codex Reset / Selectly
      ↓
GitHub / Docs / Articles
      ↑
samanhappy.com
```

不要简单做友情链接。

目标是建立明确的品牌实体网络。

---

# 16. UI 风格

关键词：

```text
Quiet
Precise
Technical
Warm
```

参考 tw93.fun 的克制感。

## 配色

背景：

```css
#FAFAF8
```

主文字：

```css
#202020
```

次级文字：

```css
#737373
```

边框：

```css
#E7E5E1
```

Accent：

采用克制的墨绿色 / 青灰色。

例如：

```css
#3F6654
```

Accent 只用于：

- Link hover
- Tag
- 小面积状态
- Active navigation

不要大面积使用。

---

# 17. 字体

英文：

```text
Geist
Inter
```

中文：

优先系统字体：

```css
-apple-system,
BlinkMacSystemFont,
"PingFang SC",
"Microsoft YaHei",
sans-serif
```

不要为了视觉效果额外加载大体积中文字体。

---

# 18. Layout

最大内容宽度：

```css
max-width: 1080px;
```

文章：

```css
max-width: 720px;
```

桌面左右留白充足。

移动端：

```css
padding-inline: 20px;
```

卡片：

- 少圆角
- 少阴影
- 主要依赖 border 和 whitespace
- 圆角建议 8～12px

---

# 19. 动效

只保留轻微：

```text
hover
opacity
translateY 1–2px
```

duration：

```text
150–200ms
```

不要：

- 页面入场动画
- 大规模 scroll animation
- 粒子效果
- 光标跟随
- 3D
- 强烈 parallax

---

# 20. 技术方案

推荐：

```text
Next.js
TypeScript
Tailwind CSS
MDX
```

部署：

```text
Vercel
```

内容第一版直接保存在 Git Repo 中。

结构：

```text
/content/writing
/content/projects
```

不要第一版引入：

- CMS
- Database
- Admin
- 用户系统
- 评论系统

保持静态优先。

---

# 21. 性能

目标：

```text
Lighthouse Performance > 95
SEO > 95
Accessibility > 95
Best Practices > 95
```

要求：

- 静态生成优先
- 最小客户端 JS
- 图片使用 next/image
- 图片统一 WebP / AVIF
- 首页避免大型图片
- 不加载不必要第三方脚本

---

# 22. Analytics

第一版建议接入：

```text
Umami
```

只统计：

```text
PV
UV
入口页
来源
热门文章
项目点击
```

不要做复杂埋点。

---

# 23. 第一版不要做

明确不要实现：

```text
搜索
评论
Newsletter
登录
会员
CMS
复杂标签系统
项目点赞
访问量展示
动态时间线
服务报价
咨询预约
商业服务页面
```

以后有真实需求再加。

---

# 24. 首页最终顺序

```text
Header

Hero

Selected Work
├── MCPHub
├── Codex Reset
└── Selectly

Writing

Now

About / Connect

Footer
```

Footer：

```text
© 2026 Saman

GitHub · RSS · llms.txt

Building useful tools for the AI-native world.
```

---

# 25. 验收标准

第一版完成后应满足：

1. 5 秒内能理解作者是谁、在做什么
2. MCPHub 明显是主项目
3. 三个项目属于同一个个人品牌体系
4. 首页无明显营销感
5. 手机和桌面体验完整
6. 每个项目拥有独立结构化页面
7. 支持 Writing / MDX
8. 提供 `/llms.txt`
9. 提供 HTML 与 Markdown 内容
10. JSON-LD 正确
11. Sitemap / RSS / robots.txt 正常
12. Lighthouse 各核心指标 > 95
13. 整体代码保持简单，方便一个人长期维护

最终效果应该让人感觉：

> 这是一个长期做产品和技术的人留下的数字空间，而不是一个精心包装的个人简历。