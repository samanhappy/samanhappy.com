import Image from "next/image";
import { localizedPath, type Locale } from "@/lib/i18n";
import dimensions from "@/lib/image-dimensions.json";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import type { ComponentPropsWithoutRef } from "react";
export function Markdown({
  source,
  locale,
  format = "md",
}: {
  source: string;
  locale: Locale;
  format?: "md" | "mdx";
}) {
  return (
    <div className="prose">
      <MDXRemote
        source={source}
        options={{ mdxOptions: { remarkPlugins: [remarkGfm], format } }}
        components={{
          img: ({ src, alt }: ComponentPropsWithoutRef<"img">) =>
            typeof src === "string" && src.startsWith("/images/") ? (
              <Image
                src={src}
                alt={alt || ""}
                width={
                  (
                    dimensions as Record<
                      string,
                      { width: number; height: number }
                    >
                  )[src]?.width || 1440
                }
                height={
                  (
                    dimensions as Record<
                      string,
                      { width: number; height: number }
                    >
                  )[src]?.height || 900
                }
                sizes="(max-width: 760px) 100vw, 720px"
                style={{ width: "100%", height: "auto" }}
              />
            ) : (
              <img src={src} alt={alt || ""} loading="lazy" />
            ),
          a: ({ href, children, ...props }: ComponentPropsWithoutRef<"a">) => (
            <a
              {...props}
              href={
                href && /^\/(projects|writing|about|now)(\/|$)/.test(href)
                  ? localizedPath(locale, href)
                  : href
              }
              {...(href?.startsWith("https://")
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {children}
            </a>
          ),
        }}
      />
    </div>
  );
}
