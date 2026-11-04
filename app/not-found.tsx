import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { getRequestDictionary } from "@/lib/i18n/server";
import { localizeHref } from "@/lib/i18n/config";

export default async function NotFound() {
  const { locale, dict } = await getRequestDictionary();

  return (
    <section className="mx-auto flex min-h-[60vh] w-full max-w-3xl flex-col justify-center px-6 py-24">
      <p className="text-xs tracking-[0.22em] text-primary uppercase">404</p>
      <h1 className="mt-4 font-heading text-4xl">
        {locale === "bn" ? "পাতাটি খুঁজে পাইনি" : "This clearing is empty"}
      </h1>
      <p className="mt-4 max-w-lg text-muted-foreground">
        {locale === "bn"
          ? "লিংকটি হয়তো বদলেছে। হোমে ফিরে আবাস খুঁজে নিন।"
          : "The path may have moved. Return home and find the habitat again."}
      </p>
      <Link href={localizeHref(locale, "/")} className={`${buttonVariants()} mt-8 w-fit`}>
        {dict.nav.home}
      </Link>
    </section>
  );
}
