import Link from "next/link";
import { Sprout } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { localizeHref } from "@/lib/i18n/config";
import { getRequestDictionary } from "@/lib/i18n/server";
import { noIndexMetadata } from "@/lib/seo";

export const metadata = noIndexMetadata("Donation received");

export default async function DonateSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ tran_id?: string }>;
}) {
  const { locale, dict } = await getRequestDictionary();
  const { tran_id: transactionId } = await searchParams;

  return (
    <section className="mx-auto flex w-full max-w-2xl flex-col items-start gap-6 px-6 py-24">
      <span className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
        <Sprout className="size-5" />
      </span>
      <h1 className="font-heading text-4xl leading-tight">{dict.donate.successTitle}</h1>
      <p className="text-lg leading-8 text-muted-foreground">{dict.donate.successBody}</p>
      {transactionId ? (
        <p className="font-mono text-sm text-muted-foreground">
          {dict.donate.transaction}: {transactionId}
        </p>
      ) : null}
      <div className="flex flex-wrap gap-3">
        <Link href={localizeHref(locale, "/transparency")} className={buttonVariants()}>
          {dict.actions.seeTransparency}
        </Link>
        <Link
          href={localizeHref(locale, "/")}
          className={buttonVariants({ variant: "outline" })}
        >
          {dict.nav.home}
        </Link>
      </div>
    </section>
  );
}
