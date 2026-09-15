"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { copy, isLocale, localizedPath } from "@/lib/i18n";
export default function NotFound() {
  const params = useParams();
  const locale =
    typeof params.locale === "string" && isLocale(params.locale)
      ? params.locale
      : "zh";
  const t = copy[locale];
  return (
    <div className="article-shell">
      <div className="page-intro">
        <p className="eyebrow">404</p>
        <h1>{t.notFoundTitle}</h1>
        <p>{t.notFoundDescription}</p>
        <Link className="button primary" href={localizedPath(locale)}>
          {t.backHome} →
        </Link>
      </div>
    </div>
  );
}
