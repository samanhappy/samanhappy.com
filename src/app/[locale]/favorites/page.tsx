import Favorites from "@/components/favorites";
import { copy } from "@/lib/i18n";
import { getLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const locale = getLocale((await params).locale);
  const t = copy[locale];
  return pageMetadata(
    locale,
    "/favorites",
    t.favorites,
    t.favoritesDescription,
  );
}

export default async function FavoritesPage({ params }: Props) {
  const locale = getLocale((await params).locale);
  const t = copy[locale];
  return (
    <div className="favorites-page">
      <div className="page-intro">
        <p className="eyebrow">{t.favoritesEyebrow}</p>
        <h1>{t.favorites}</h1>
        <p>{t.favoritesDescription}</p>
      </div>
      <Favorites locale={locale} />
    </div>
  );
}
