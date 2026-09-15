export const locales = ["zh", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "zh";
export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
export function localizedPath(locale: Locale, pathname = "") {
  return `/${locale}${pathname === "/" ? "" : pathname}`;
}
export function languageTag(locale: Locale) {
  return locale === "zh" ? "zh-CN" : "en";
}
export function switchLanguage(pathname: string, locale: Locale) {
  return localizedPath(locale, pathname.replace(/^\/(zh|en)(?=\/|$)/, ""));
}
export function dateLabel(date: string, locale: Locale, monthOnly = false) {
  return new Intl.DateTimeFormat(languageTag(locale), {
    year: "numeric",
    month: monthOnly ? "long" : "short",
    ...(monthOnly ? {} : { day: "numeric" }),
    timeZone: "UTC",
  }).format(new Date(date));
}
export const copy = {
  zh: {
    name: "孙青扬",
    description:
      "做有用的产品，写真实的思考。这里记录孙青扬在 AI 工程、开源工具和独立产品上的实践。",
    nav: ["首页", "项目", "文章", "关于", "近况"],
    navLabel: "主导航",
    languageLabel: "选择语言",
    skip: "跳至正文",
    identity: "软件工程师 · AI 产品构建者 · 开源开发者",
    headline: "做有用的产品，写真实的思考。",
    subheading: "为 AI 原生时代，做实用、耐用的工具。",
    current: "正在打磨 MCPHub，也在探索独立产品。",
    note: ["让互联网安静一点，", "让工具更有用一点。"],
    motto: ["长期主义，", "做有用的事。"],
    viewProjects: "查看项目",
    readWriting: "阅读文章",
    selectedWork: "精选项目",
    allProjects: "全部项目",
    writing: "文章",
    allWriting: "全部文章",
    more: "看看最近在做什么",
    about: "关于我",
    now: "近况",
    aboutPreview:
      "我是孙青扬（Meng），一名关注 AI 工程、开发者工具和 Agent 基础设施的软件工程师。工作中，我参与企业 AI 系统建设；工作之外，我维护开源项目，探索独立产品，希望把真实需求做成能长期使用的工具。",
    nowItems: [
      "将 MCPHub 打磨成值得信任的 MCP 网关。",
      "为中文开发者推出 Codex Reset。",
      "探索从软件工程师到独立产品构建者的路径。",
    ],
    featured: "主项目",
    website: "官网",
    docs: "文档",
    email: "邮箱",
    wechat: "微信公众号",
    newWindow: "（在新窗口打开）",
    readingTime: "分钟阅读",
    markdown: "阅读 Markdown 版本",
    updated: "最后更新",
    builtBy: "作者",
    translatedBy: "译者",
    source: "原文",
    projectsEyebrow: "持续构建，公开分享",
    projectsDescription: "我正在构建和持续改进的产品与开源工具。",
    explore: "了解项目",
    writingEyebrow: "记录实践中的发现",
    writingDescription:
      "写下实践中的发现，也留下尚未解决的问题。关于 AI 工程、产品构建，以及独立开发这条路。",
    categoryLabel: "文章分类",
    categories: {
      "AI Engineering": "AI 工程",
      Building: "产品构建",
      Independent: "独立开发",
    },
    emptyTitle: "还在实践，慢慢记录。",
    emptyDescription: "这个分类暂时没有已发布文章。",
    aboutEyebrow: "关于这个网站背后的人",
    aboutTitle: "你好，我是孙青扬 / Meng。",
    aboutSubtitle: "软件工程师，也是独立产品构建者。长期主义，做有用的事。",
    aboutIntro: [
      "我是一名软件工程师，关注 AI 工程、开发者工具与 Agent 基础设施。白天，我参与真实业务中的企业 AI 系统建设；工作之外，我维护开源项目，也探索独立产品。",
      "比起头衔，我更在意手艺：靠谱地交付，审慎地做决定，做经得起时间的东西。",
    ],
    currentlyBuilding: "正在做的项目",
    background: "一些背景",
    backgroundBefore:
      "我生活在南京，有多年后端开发与架构经验。曾与陈皓（左耳朵耗子）共同维护开源项目 ",
    backgroundAfter: "。这段经历影响了我对工程质量与开源协作的理解。",
    backgroundText:
      "现在，我把更多时间放在 AI 原生工程实践上：用工具解决真实问题，公开分享学到的东西，让持续的积累产生价值。",
    howIWork: "我的工作方式",
    howIWorkText:
      "从一个真实需求开始，做尽可能简单的实现，再通过使用和反馈继续打磨。代码之外，我也在意产品决策、使用体验，以及一个人长期维护产品的节奏。",
    connect: "在其他地方找到我",
    nowEyebrow: "记录当下的一个小窗口",
    nowDescription: "最近在做什么，以及把注意力放在哪里。",
    nowSections: [
      {
        title: "把 MCPHub 做得更好",
        body: "继续建设 MCPHub，围绕 MCP 服务的连接、管理和实际使用体验迭代，让它成为值得信任的 MCP 网关。",
        link: "/projects/mcphub",
        label: "了解 MCPHub",
      },
      {
        title: "探索独立产品",
        body: "为中文开发者推出 Codex Reset，也继续打磨 Selectly。从具体的小问题出发，理解什么样的工具会被长期使用。",
        link: "/projects",
        label: "看看这些产品",
      },
      {
        title: "从工程师到独立构建者",
        body: "在日常工程工作与个人产品之间寻找可持续的节奏。边做边学，把值得留下的实践写下来。",
        link: "/writing",
        label: "阅读实践记录",
      },
    ],
    nowFooter: "这是一页记录当下的近况，会在每月或有重要变化时更新。",
    nowLearn: "什么是 Now page？",
    notFoundTitle: "这一页还没有留下足迹。",
    notFoundDescription: "链接可能已经变更，或内容尚未发布。",
    backHome: "回到首页",
  },
  en: {
    name: "Sun Qingyang",
    description:
      "Useful products. Honest reflections. Notes from Sun Qingyang on AI engineering, open source, and building independent products.",
    nav: ["Home", "Projects", "Writing", "About", "Now"],
    navLabel: "Main navigation",
    languageLabel: "Choose language",
    skip: "Skip to content",
    identity: "Software Engineer · AI Builder · Open Source",
    headline: "Useful products. Honest reflections.",
    subheading: "Building useful tools for the AI-native world.",
    current: "Currently building MCPHub and exploring independent products.",
    note: ["A quieter internet,", "with more useful tools."],
    motto: ["Think long term.", "Build useful things."],
    viewProjects: "View projects",
    readWriting: "Read writing",
    selectedWork: "Selected work",
    allProjects: "All projects",
    writing: "Writing",
    allWriting: "All writing",
    more: "What I’m doing now",
    about: "About",
    now: "Now",
    aboutPreview:
      "I'm Sun Qingyang (Meng), a software engineer focused on AI engineering, developer tools, and agent infrastructure. At work, I build enterprise AI systems. Outside work, I maintain open-source projects and explore independent products—useful tools built around real needs.",
    nowItems: [
      "Building MCPHub into a trusted MCP gateway.",
      "Launching Codex Reset for Chinese developers.",
      "Exploring the path from software engineer to independent builder.",
    ],
    featured: "Featured",
    website: "Website",
    docs: "Docs",
    email: "Email",
    wechat: "WeChat",
    newWindow: " (opens in a new tab)",
    readingTime: "min read",
    markdown: "Read as Markdown",
    updated: "Last updated",
    builtBy: "Built by",
    translatedBy: "Translated by",
    source: "Original article",
    projectsEyebrow: "BUILDING IN PUBLIC",
    projectsDescription:
      "Products and open-source tools I build and keep improving.",
    explore: "Explore project",
    writingEyebrow: "NOTES FROM THE WORKBENCH",
    writingDescription:
      "What I learn by building, and the questions I am still working through. Notes on AI engineering, product decisions, and finding an independent path.",
    categoryLabel: "Writing categories",
    categories: {
      "AI Engineering": "AI Engineering",
      Building: "Building",
      Independent: "Independent",
    },
    emptyTitle: "Still exploring. Notes to come.",
    emptyDescription: "There are no published articles in this category yet.",
    aboutEyebrow: "A LITTLE ABOUT ME",
    aboutTitle: "Hi, I'm Meng / Sun Qingyang.",
    aboutSubtitle:
      "Software engineer. Independent product builder. Thinking long term and making useful things.",
    aboutIntro: [
      "I am a software engineer working on AI engineering, developer tools, and agent infrastructure. During the day, I help build enterprise AI systems for real-world use. Outside work, I maintain open-source projects and explore independent products.",
      "I care more about craft than titles: delivering reliably, making thoughtful decisions, and building things that hold up over time.",
    ],
    currentlyBuilding: "Currently building",
    background: "A little background",
    backgroundBefore:
      "I live in Nanjing and have years of experience in backend development and software architecture. I helped maintain ",
    backgroundAfter:
      " alongside Chen Hao, known as Left Ear Mouse. That experience shaped how I think about engineering quality and open-source collaboration.",
    backgroundText:
      "These days, I spend more time on AI-native engineering: solving real problems with tools, sharing what I learn, and letting steady work add up.",
    howIWork: "How I work",
    howIWorkText:
      "Start with a real need, build the simplest useful version, and improve it through use and feedback. Beyond the code, I care about product decisions, the experience of using a tool, and a pace one person can sustain.",
    connect: "Find me elsewhere",
    nowEyebrow: "A SMALL WINDOW INTO THE PRESENT",
    nowDescription: "What I am working on, and where my attention is going.",
    nowSections: [
      {
        title: "Making MCPHub better",
        body: "Continuing to build MCPHub around the everyday work of connecting, managing, and using MCP servers, with the aim of making it a gateway people can trust.",
        link: "/projects/mcphub",
        label: "Explore MCPHub",
      },
      {
        title: "Exploring independent products",
        body: "Launching Codex Reset for Chinese developers and continuing to improve Selectly. Starting with small, concrete problems and learning which tools people return to.",
        link: "/projects",
        label: "See the projects",
      },
      {
        title: "From engineer to independent builder",
        body: "Finding a sustainable balance between day-to-day engineering and personal products. Learning through practice and writing down what is worth keeping.",
        link: "/writing",
        label: "Read the notes",
      },
    ],
    nowFooter:
      "This page is a snapshot of the present. I update it each month or when something meaningful changes.",
    nowLearn: "What is a Now page?",
    notFoundTitle: "No footprints on this page yet.",
    notFoundDescription:
      "The link may have changed, or the page has not been published.",
    backHome: "Back to home",
  },
} as const;
export function categoryLabel(category: string, locale: Locale) {
  return (
    copy[locale].categories[category as keyof typeof copy.en.categories] ||
    category
  );
}
