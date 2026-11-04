"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  localeCookieName,
  localeNames,
  localizeHref,
  stripLocalePrefix,
  type Locale,
} from "@/lib/i18n/config";

function persistLocale(locale: Locale) {
  document.cookie = `${localeCookieName}=${locale}; path=/; max-age=31536000; samesite=lax`;
}

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname() || "/";
  const path = stripLocalePrefix(pathname);

  return (
    <div
      className="inline-flex items-center gap-1 rounded-full border border-border/80 bg-card/80 px-1.5 py-1 text-xs"
      role="group"
      aria-label="Language"
    >
      {(["bn", "en"] as const).map((item) => {
        const href = localizeHref(item, path);
        const active = item === locale;
        return (
          <Link
            key={item}
            href={href}
            onClick={() => persistLocale(item)}
            className={`rounded-full px-2.5 py-1 font-medium transition-colors ${
              active
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
            hrefLang={item}
            lang={item}
          >
            {localeNames[item]}
          </Link>
        );
      })}
    </div>
  );
}
