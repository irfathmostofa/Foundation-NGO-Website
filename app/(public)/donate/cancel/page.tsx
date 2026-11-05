import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { localizeHref } from "@/lib/i18n/config";
import { getRequestDictionary } from "@/lib/i18n/server";

export default async function DonateCancelPage({
  searchParams,
}: {
  searchParams: Promise<{ tran_id?: string }>;
}) {
  const { locale, dict } = await getRequestDictionary();
  const { tran_id: transactionId } = await searchParams;

  return (
    <section className="mx-auto flex w-full max-w-2xl flex-col items-start gap-6 px-6 py-24">
      <h1 className="font-heading text-4xl leading-tight">{dict.donate.cancelTitle}</h1>
      <p className="text-lg leading-8 text-muted-foreground">{dict.donate.cancelBody}</p>
      {transactionId ? (
        <p className="font-mono text-sm text-muted-foreground">
          {dict.donate.transaction}: {transactionId}
        </p>
      ) : null}
      <Link href={localizeHref(locale, "/donate")} className={buttonVariants({ size: "lg" })}>
        {dict.donate.tryAgain}
      </Link>
    </section>
  );
}
