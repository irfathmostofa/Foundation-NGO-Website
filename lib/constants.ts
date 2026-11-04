export const CACHE_TAGS = {
  siteSettings: "site-settings",
  causes: "causes",
  blog: "blog",
  pages: "pages",
} as const;

export const REVALIDATE_SECONDS = {
  siteSettings: 3600,
  causes: 300,
  blog: 300,
  pages: 3600,
} as const;

export const USER_ROLES = ["super_admin", "admin", "editor"] as const;

export const CAUSE_STATUSES = [
  "draft",
  "active",
  "completed",
  "archived",
] as const;

export const DONATION_STATUSES = [
  "pending",
  "success",
  "failed",
  "cancelled",
] as const;

export const BLOG_STATUSES = ["draft", "published", "archived"] as const;

export const PAGE_KEYS = ["home", "about", "contact"] as const;

export const MEDIA_BUCKET = "media";
