import type { Locale } from "@/lib/i18n";

// Ordered by hand: the homepage shows the first three favorites.
const favorites = [
  {
    id: "marie-antoinette",
    quote: {
      zh: "所有命运馈赠的礼物，早已在暗中标好了价格。",
      en: "She was still too young to know that life never gives anything for nothing, and that a price is always exacted for what fate bestows.",
    },
    author: { zh: "斯蒂芬·茨威格", en: "Stefan Zweig" },
    title: {
      zh: "《断头王后：玛丽·安托瓦内特传》",
      en: "Marie Antoinette: The Portrait of an Average Woman",
    },
  },
  {
    id: "walter-mitty",
    quote: {
      zh: "真正美好的事物，从不主动寻求关注。",
      en: "Beautiful things don't ask for attention.",
    },
    title: {
      zh: "《白日梦想家》",
      en: "The Secret Life of Walter Mitty",
    },
  },
];

export default function Favorites({
  locale,
  limit,
}: {
  locale: Locale;
  limit?: number;
}) {
  return (
    <div className="favorites-grid">
      {favorites.slice(0, limit).map((favorite) => (
        <figure className="favorite-quote" key={favorite.id}>
          <blockquote>
            <p>{favorite.quote[locale]}</p>
          </blockquote>
          <figcaption>
            {favorite.author && <span>{favorite.author[locale]}</span>}
            <cite>{favorite.title[locale]}</cite>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
