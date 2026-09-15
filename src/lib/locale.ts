import { notFound } from "next/navigation";
import { isLocale } from "./i18n";
export function getLocale(value: string) {
  if (!isLocale(value)) notFound();
  return value;
}
