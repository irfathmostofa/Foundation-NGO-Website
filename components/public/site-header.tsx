import Link from "next/link";
import type { PublicSiteSettings } from "@/lib/types/database";

const NAV_ITEMS = [
  { href: "/about", label: "About" },
  { href: "/causes", label: "Causes" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteHeader({ settings }: { settings: PublicSiteSettings }) {
  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <Link href="/" className="text-sm font-semibold tracking-tight">
          {settings.foundation_name}
        </Link>
        <nav className="flex items-center gap-4 text-sm text-muted-foreground">
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
