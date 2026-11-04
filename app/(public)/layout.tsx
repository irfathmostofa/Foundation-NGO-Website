import { SiteFooter } from "@/components/public/site-footer";
import { SiteHeader } from "@/components/public/site-header";
import { getPublicSiteSettings } from "@/lib/cache";
import { getRequestDictionary } from "@/lib/i18n/server";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getPublicSiteSettings();
  const { locale, dict } = await getRequestDictionary();

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <SiteHeader settings={settings} locale={locale} dict={dict} />
      <main className="flex flex-1 flex-col">{children}</main>
      <SiteFooter settings={settings} locale={locale} dict={dict} />
    </div>
  );
}
