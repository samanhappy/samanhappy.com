import { NextResponse } from "next/server";
import { defaultLocale, isLocale } from "../lib/i18n";

export function GET(request: Request) {
  const preferences = (request.headers.get("accept-language") || "")
    .split(",")
    .map((entry) => {
      const [tag, ...parameters] = entry.trim().toLowerCase().split(";");
      const quality = parameters.find((parameter) =>
        parameter.trim().startsWith("q="),
      );
      return {
        locale: tag.split("-")[0],
        quality: quality === undefined ? 1 : Number(quality.trim().slice(2)),
      };
    })
    .filter(
      ({ locale, quality }) => isLocale(locale) && quality > 0 && quality <= 1,
    )
    .sort((a, b) => b.quality - a.quality);
  const url = new URL(request.url);
  url.pathname = `/${preferences[0]?.locale || defaultLocale}`;
  return NextResponse.redirect(url, {
    status: 307,
    headers: { "Cache-Control": "private, no-store", Vary: "Accept-Language" },
  });
}
