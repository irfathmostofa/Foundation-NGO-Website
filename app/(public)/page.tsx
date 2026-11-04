import { getPublicSiteSettings } from "@/lib/cache";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export default async function HomePage() {
  const settings = await getPublicSiteSettings();
  const configured = isSupabaseConfigured();

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center gap-6 px-6 py-24">
      <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
        Phase 1 foundation
      </p>
      <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
        {settings.foundation_name}
      </h1>
      <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
        {settings.meta_description}
      </p>
      <p className="text-sm text-muted-foreground">
        Supabase: {configured ? "environment detected" : "waiting for .env.local"}
      </p>
    </section>
  );
}
