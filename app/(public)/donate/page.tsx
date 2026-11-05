import { DonationForm } from "@/components/public/donation-form";
import { PageHero } from "@/components/public/page-hero";
import { getPublishedCauses } from "@/lib/content/public";
import { getRequestDictionary } from "@/lib/i18n/server";

export async function generateMetadata() {
  const { dict } = await getRequestDictionary();
  return { title: dict.nav.donate };
}

export default async function DonatePage({
  searchParams,
}: {
  searchParams: Promise<{ cause?: string }>;
}) {
  const { locale, dict } = await getRequestDictionary();
  const [{ cause }, causes] = await Promise.all([
    searchParams,
    getPublishedCauses(),
  ]);
  const initialCauseId =
    causes.find((item) => item.id === cause || item.slug === cause)?.id ?? null;

  return (
    <>
      <PageHero
        eyebrow={dict.donate.eyebrow}
        title={dict.donate.title}
        subtitle={dict.donate.subtitle}
      />
      <section className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-16 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-4 leading-7 text-muted-foreground">
          <p>{dict.brand.conservation}</p>
          <p>{dict.donate.secureNote}</p>
        </div>
        <DonationForm
          causes={causes.filter((item) => item.status === "active")}
          locale={locale}
          dict={dict}
          initialCauseId={initialCauseId}
        />
      </section>
    </>
  );
}
