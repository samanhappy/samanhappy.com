"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Github } from "lucide-react";
import { copy, localizedPath, switchLanguage, type Locale } from "@/lib/i18n";
const paths = ["", "/projects", "/writing", "/about", "/now"];
export default function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const t = copy[locale];
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="wordmark" href={localizedPath(locale)}>
          samanhappy<span>.com</span>
        </Link>
        <nav aria-label={t.navLabel}>
          {paths.map((path, index) => (
            <Link
              key={path}
              href={localizedPath(locale, path)}
              aria-current={
                (
                  path
                    ? pathname.startsWith(localizedPath(locale, path))
                    : pathname === localizedPath(locale)
                )
                  ? "page"
                  : undefined
              }
            >
              {t.nav[index]}
            </Link>
          ))}
        </nav>
        <div className="header-extra">
          <a href="https://github.com/samanhappy" aria-label="GitHub">
            <Github size={17} />
            <span>GitHub</span>
          </a>
          <div className="locale" role="group" aria-label={t.languageLabel}>
            {(["zh", "en"] as const).map((lang, index) => (
              <span key={lang}>
                {index === 1 && (
                  <span aria-hidden="true" className="locale-divider">
                    /
                  </span>
                )}
                {lang === locale ? (
                  <span
                    aria-current="true"
                    lang={lang === "zh" ? "zh-CN" : "en"}
                  >
                    {lang === "zh" ? "中文" : "EN"}
                  </span>
                ) : (
                  <a
                    href={switchLanguage(pathname, lang)}
                    hrefLang={lang === "zh" ? "zh-CN" : "en"}
                    lang={lang === "zh" ? "zh-CN" : "en"}
                    aria-label={
                      lang === "zh" ? "切换到中文" : "Switch to English"
                    }
                    onClick={(e) => {
                      const url = new URL(e.currentTarget.href);
                      url.search = window.location.search;
                      url.hash = window.location.hash;
                      e.currentTarget.href = url.toString();
                    }}
                  >
                    {lang === "zh" ? "中文" : "EN"}
                  </a>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
