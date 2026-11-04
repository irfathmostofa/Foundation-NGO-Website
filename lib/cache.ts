import { cacheLife, cacheTag } from "next/cache";
import { CACHE_TAGS } from "@/lib/constants";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createPublicClient } from "@/lib/supabase/public";
import type { PublicSiteSettings } from "@/lib/types/database";

export const FALLBACK_SITE_SETTINGS: PublicSiteSettings = {
  logo_url: null,
  foundation_name: "হোপ ফাউন্ডেশন",
  foundation_name_en: "Hope Foundation",
  contact_email: "hello@hopefoundation.org",
  contact_phone: "+880 1700-000000",
  address: "খুলনা, বাংলাদেশ",
  address_en: "Khulna, Bangladesh",
  social_links: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    youtube: "https://youtube.com",
  },
  google_site_verification_code: null,
  meta_title: "হোপ ফাউন্ডেশন",
  meta_title_en: "Hope Foundation",
  meta_description:
    "প্রকৃতি সংরক্ষণের জন্য একটি সবুজ ফাউন্ডেশন—স্বচ্ছ দান, মাঠের কাজ, জীবন্ত আবাস।",
  meta_description_en:
    "A nature conservation foundation for transparent giving, field work, and living habitat.",
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
      "logo_url, foundation_name, foundation_name_en, contact_email, contact_phone, address, address_en, social_links, google_site_verification_code, meta_title, meta_title_en, meta_description, meta_description_en",
    )
    .maybeSingle();

  if (error || !data) {
    return FALLBACK_SITE_SETTINGS;
  }

  return { ...FALLBACK_SITE_SETTINGS, ...data };
}
