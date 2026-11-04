import { SiteFooter } from "@/components/public/site-footer";
import { SiteHeader } from "@/components/public/site-header";
import { getPublicSiteSettings } from "@/lib/cache";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getPublicSiteSettings();

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <SiteHeader settings={settings} />
      <main className="flex flex-1 flex-col">{children}</main>
      <SiteFooter settings={settings} />
    </div>
  );
}
