# 验收记录

日期：2026-09-15。范围：本地生产构建，未发布到线上。

## 内容与功能

- 3 个独立项目页、8 篇旧站已发布中文文章。
- 草稿与未来文章过滤；译文作者和原始链接保留。
- 首页、Projects、Writing、About、Now、404。
- 文章分类与空状态、产品外链、联系方式。
- HTML / Markdown 双输出、RSS、llms、robots、sitemap、JSON-LD。
- 公众号和 Umami 保留环境变量配置入口。

## 验证结果

- `npm run build`：通过，生成 36 个静态页面/资源（包括框架路由）；Writing 分类列表按请求渲染。
- `npm run typecheck`：通过。
- `npm run format:check`：通过。
- `npm run check`：通过，11 个内容页的 HTML / Markdown 一致性、资源接口、图片存在性、草稿隔离、404。
- `npm run check:browser`：通过，390 / 768 / 1440px 三种宽度，共 21 项页面检查，无横向溢出或浏览器运行错误；分类筛选、空状态、项目导航正常。
- 本地生产首页 Lighthouse（移动设备模拟）：Performance **98** / Accessibility **100** / Best Practices **100** / SEO **100**。LCP 2.4s，CLS 0。

完整 Lighthouse JSON 与页面截图位于 `reports/`，该目录不纳入版本管理。

## 边界与说明

- Lighthouse 是本地单次生产测量，不代表部署后真实用户指标；部署后需要按实际域名再测。
- 公众号与 Umami 未配置真实凭证，未验证第三方采集服务。
- 外链使用 spec 提供的产品官网和旧站公开信息；GitHub 主页已只读核对。本机 gh 网络受限，未读取私有仓库信息。
- 首版为中文；保留 locale 配置，不声称已完成英文站。
- 山景使用内置 imagegen 生成并压缩至约 38KB WebP；素材与完整提示词见 `public/images/README.md`。
- 当前目录原本不是 Git 仓库，因此没有提交或推送。没有执行线上部署。
