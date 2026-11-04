import type { PublicSiteSettings } from "@/lib/types/database";

export function SiteFooter({ settings }: { settings: PublicSiteSettings }) {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-8 text-sm text-muted-foreground">
        <span>
          {new Date().getFullYear()} {settings.foundation_name}
        </span>
        <span>{settings.contact_email}</span>
      </div>
    </footer>
  );
}
