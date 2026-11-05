import type { Metadata, Viewport } from "next";
import {
  Fraunces,
  Geist_Mono,
  Noto_Sans_Bengali,
  Noto_Serif_Bengali,
  Source_Sans_3,
} from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { getPublicSiteSettings } from "@/lib/cache";
import { getRequestLocale } from "@/lib/i18n/server";
import { pickLocalized } from "@/lib/i18n/dictionary";
import { getSiteUrl } from "@/lib/payments/site-url";
import { buildMetadata } from "@/lib/seo";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  display: "swap",
});

const notoSerifBengali = Noto_Serif_Bengali({
  variable: "--font-bangla-serif",
  subsets: ["bengali"],
  display: "swap",
  weight: ["400", "600", "700"],
});

const notoSansBengali = Noto_Sans_Bengali({
  variable: "--font-bangla-sans",
  subsets: ["bengali"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#2f5d3a",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getPublicSiteSettings();
  const locale = await getRequestLocale();
  const name = pickLocalized(
    locale,
    settings.foundation_name,
    settings.foundation_name_en,
  );
  const title =
    pickLocalized(locale, settings.meta_title, settings.meta_title_en) || name;
  const description = pickLocalized(
    locale,
    settings.meta_description,
    settings.meta_description_en,
  );
  const seo = await buildMetadata({
    title,
    description,
    path: "/",
    locale,
    image: settings.logo_url,
  });

  return {
    metadataBase: new URL(getSiteUrl()),
    title: {
      default: title,
      template: `%s | ${name}`,
    },
    description: seo.description,
    verification: settings.google_site_verification_code
      ? { google: settings.google_site_verification_code }
      : undefined,
    openGraph: {
      type: "website",
      locale: seo.openGraph?.locale,
      siteName: name,
      title,
      description: seo.description ?? undefined,
      images: seo.openGraph?.images,
    },
    twitter: seo.twitter,
    robots: { index: true, follow: true },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getRequestLocale();

  return (
    <html
      lang={locale}
      dir="ltr"
      className={`${fraunces.variable} ${sourceSans.variable} ${notoSerifBengali.variable} ${notoSansBengali.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
