import type { Metadata } from "next";
import { getPageContent } from "@/lib/content/public";
import { localizePage } from "@/lib/content/localize";
import { getRequestLocale } from "@/lib/i18n/server";

export async function pageMetadata(pageKey: string): Promise<Metadata> {
  const locale = await getRequestLocale();
  const page = await getPageContent(pageKey);
  const copy = localizePage(locale, page);

  return {
    title: copy.metaTitle || copy.title,
    description: copy.metaDescription || copy.subtitle || copy.body,
  };
}
