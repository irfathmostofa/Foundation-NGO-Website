import { cacheLife, cacheTag } from "next/cache";
import { CACHE_TAGS } from "@/lib/constants";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createPublicClient } from "@/lib/supabase/public";
import type { PublicSiteSettings } from "@/lib/types/database";

export const FALLBACK_SITE_SETTINGS: PublicSiteSettings = {
  logo_url: null,
  foundation_name: "Hope Foundation",
  contact_email: "hello@example.org",
  contact_phone: null,
  address: null,
  social_links: {},
  google_site_verification_code: null,
  meta_title: "Hope Foundation",
  meta_description:
    "A professional foundation website for causes, donations, and community impact.",
};

export async function getPublicSiteSettings(): Promise<PublicSiteSettings> {
  "use cache";
  cacheTag(CACHE_TAGS.siteSettings);
  cacheLife("hours");

  if (!isSupabaseConfigured()) {
    return FALLBACK_SITE_SETTINGS;
  }

  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("site_settings_public")
    .select(
      "logo_url, foundation_name, contact_email, contact_phone, address, social_links, google_site_verification_code, meta_title, meta_description",
    )
    .maybeSingle();

  if (error || !data) {
    return FALLBACK_SITE_SETTINGS;
  }

  return data;
}
