import Image from "next/image";
import Link from "next/link";
import { CountUp } from "@/components/public/count-up";
import { NatureImage } from "@/components/public/nature-image";
import { Reveal } from "@/components/public/reveal";
import { buttonVariants } from "@/components/ui/button";
import { NATURE_IMAGES } from "@/lib/content/images";
import { getPublicSiteSettings } from "@/lib/cache";
import {
  getAchievements,
  getFinanceEntries,
  getGalleryAlbums,
  getPageContent,
  getPublishedCauses,
} from "@/lib/content/public";
import { localizePage } from "@/lib/content/localize";
import { localizeHref } from "@/lib/i18n/config";
import { pickLocalized } from "@/lib/i18n/dictionary";
import { formatCurrency } from "@/lib/i18n/format";
import { getRequestDictionary } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/content/metadata";

export async function generateMetadata() {
  return pageMetadata("home");
}

export default async function HomePage() {
  const { locale, dict } = await getRequestDictionary();
  const [settings, page, achievements, causes, albums, finance] = await Promise.all([
    getPublicSiteSettings(),
    getPageContent("home"),
    getAchievements(),
    getPublishedCauses(),
    getGalleryAlbums(),
    getFinanceEntries(),
  ]);
  const copy = localizePage(locale, page);
  const name = pickLocalized(
    locale,
    settings.foundation_name,
    settings.foundation_name_en,
  );
  const featured = causes.filter((item) => item.featured).slice(0, 3);
  const recentAlbums = albums.slice(0, 3);
  const collected = finance
    .filter((item) => item.kind === "collection")
    .reduce((sum, item) => sum + Number(item.amount), 0);
  const spent = finance
    .filter((item) => item.kind === "expense")
    .reduce((sum, item) => sum + Number(item.amount), 0);

  return (
    <>
      <section className="relative isolate min-h-[78vh] overflow-hidden">
        <Image
          src={copy.heroImage || NATURE_IMAGES.canopy}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-canopy via-canopy/55 to-canopy/20" />
        <div className="relative mx-auto flex min-h-[78vh] w-full max-w-6xl flex-col justify-end px-6 pb-20 pt-28">
          <Reveal>
            <p className="text-xs font-medium tracking-[0.24em] text-accent uppercase">
              {dict.home.eyebrow}
            </p>
            <h1 className="mt-4 max-w-3xl font-heading text-4xl leading-tight text-canopy-foreground text-balance md:text-6xl">
              {copy.title}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-canopy-foreground/85">
              {copy.subtitle}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={localizeHref(locale, "/donate")}
                className={buttonVariants({ size: "lg" })}
              >
                {dict.nav.donate}
              </Link>
              <Link
                href={localizeHref(locale, "/membership")}
                className={`${buttonVariants({ variant: "outline", size: "lg" })} border-white/30 bg-white/10 text-canopy-foreground hover:bg-white/20`}
              >
                {dict.nav.becomeMember}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-mist/80 py-20">
        <div className="mx-auto w-full max-w-6xl px-6">
          <Reveal>
            <p className="text-xs font-medium tracking-[0.22em] text-primary uppercase">
              {dict.home.impact}
            </p>
            <h2 className="mt-3 font-heading text-3xl md:text-4xl">{name}</h2>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {achievements.slice(0, 4).map((item, index) => (
              <Reveal key={item.id} delay={index * 0.08}>
                <article className="rounded-2xl border border-border bg-card px-5 py-6">
                  <p className="font-heading text-4xl text-primary">
                    {item.metric_value != null ? (
                      <CountUp value={item.metric_value} locale={locale} />
                    ) : (
                      "—"
                    )}
                  </p>
                  <p className="mt-2 text-sm text-soil">
                    {pickLocalized(locale, item.metric_label, item.metric_label_en)}
                  </p>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {pickLocalized(locale, item.title, item.title_en)}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-medium tracking-[0.22em] text-primary uppercase">
                {dict.home.featuredCauses}
              </p>
              <h2 className="mt-3 font-heading text-3xl">{copy.body}</h2>
            </div>
            <Link href={localizeHref(locale, "/causes")} className="text-sm text-primary">
              {dict.actions.viewAll}
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {featured.map((cause, index) => (
              <Reveal key={cause.id} delay={index * 0.08}>
                <Link
                  href={localizeHref(locale, `/causes/${cause.slug}`)}
                  className="group block overflow-hidden rounded-2xl border border-border bg-card"
                >
                  <NatureImage
                    src={cause.image_url}
                    alt={pickLocalized(locale, cause.title, cause.title_en)}
                  />
                  <div className="space-y-2 p-5">
                    <h3 className="font-heading text-xl group-hover:text-primary">
                      {pickLocalized(locale, cause.title, cause.title_en)}
                    </h3>
                    <p className="text-sm leading-6 text-muted-foreground">
                      {pickLocalized(
                        locale,
                        cause.short_description,
                        cause.short_description_en,
                      )}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mist/70 py-20">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="flex items-end justify-between">
            <h2 className="font-heading text-3xl">{dict.home.recentGallery}</h2>
            <Link href={localizeHref(locale, "/gallery")} className="text-sm text-primary">
              {dict.actions.viewAll}
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {recentAlbums.map((album) => (
              <Link
                key={album.id}
                href={localizeHref(locale, `/gallery/${album.slug}`)}
                className="group"
              >
                <NatureImage
                  src={album.cover_image_url}
                  alt={pickLocalized(locale, album.title, album.title_en)}
                />
                <p className="mt-3 font-heading text-lg group-hover:text-primary">
                  {pickLocalized(locale, album.title, album.title_en)}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 md:grid-cols-3">
          <article className="rounded-2xl border border-border bg-card p-6">
            <p className="text-sm text-muted-foreground">{dict.transparency.collected}</p>
            <p className="mt-2 font-heading text-3xl text-primary">
              {formatCurrency(locale, collected)}
            </p>
          </article>
          <article className="rounded-2xl border border-border bg-card p-6">
            <p className="text-sm text-muted-foreground">{dict.transparency.spent}</p>
            <p className="mt-2 font-heading text-3xl text-earth">
              {formatCurrency(locale, spent)}
            </p>
          </article>
          <article className="rounded-2xl border border-border bg-card p-6">
            <p className="text-sm text-muted-foreground">{dict.home.transparency}</p>
            <Link
              href={localizeHref(locale, "/transparency")}
              className="mt-4 inline-block text-sm text-primary"
            >
              {dict.actions.seeTransparency}
            </Link>
          </article>
        </div>
      </section>

      <section className="bg-secondary py-16">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-6 px-6 md:flex-row md:items-center">
          <div>
            <h2 className="font-heading text-3xl">{dict.home.membershipBand}</h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              {dict.home.membershipBody}
            </p>
          </div>
          <Link
            href={localizeHref(locale, "/membership")}
            className={buttonVariants({ size: "lg" })}
          >
            {dict.nav.becomeMember}
          </Link>
        </div>
      </section>
    </>
  );
}
