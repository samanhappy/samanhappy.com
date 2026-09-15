import "./globals.css";
export const metadata = {
  metadataBase: new URL("https://samanhappy.com"),
  title: "404 · samanhappy",
  robots: { index: false, follow: false },
};
export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body>
        <main className="article-shell">
          <div className="page-intro">
            <p className="eyebrow">404</p>
            <h1>Page not found</h1>
            <p lang="zh-CN">链接可能已经变更，或内容尚未发布。</p>
            <p>
              The link may have changed, or the page has not been published.
            </p>
            <div className="hero-actions">
              <a className="button" href="/zh" lang="zh-CN">
                返回中文首页
              </a>
              <a className="button" href="/en">
                English home
              </a>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
