export type UserRole = "super_admin" | "admin" | "editor";
export type CauseStatus = "draft" | "active" | "completed" | "archived";
export type DonationStatus = "pending" | "success" | "failed" | "cancelled";
export type BlogStatus = "draft" | "published" | "archived";

export type SocialLinks = {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
};

export type User = {
  id: string;
  email: string;
  full_name: string | null;
  role: UserRole;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
};

export type CauseProject = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  short_description: string | null;
  goal_amount: number;
  raised_amount: number;
  image_url: string | null;
  status: CauseStatus;
  featured: boolean;
  created_at: string;
  updated_at: string;
};

export type Donation = {
  id: string;
  donor_name: string;
  donor_email: string;
  amount: number;
  transaction_id: string | null;
  cause_id: string | null;
  status: DonationStatus;
  payment_method: string | null;
  created_at: string;
  updated_at: string;
};

export type SiteSettings = {
  id: number;
  logo_url: string | null;
  foundation_name: string;
  contact_email: string | null;
  contact_phone: string | null;
  address: string | null;
  social_links: SocialLinks;
  sslcommerz_store_id: string | null;
  sslcommerz_store_password: string | null;
  sslcommerz_is_live: boolean;
  emailjs_service_id: string | null;
  emailjs_template_id: string | null;
  emailjs_public_key: string | null;
  emailjs_private_key: string | null;
  google_site_verification_code: string | null;
  meta_title: string | null;
  meta_description: string | null;
  updated_at: string;
};

export type PublicSiteSettings = Pick<
  SiteSettings,
  | "logo_url"
  | "foundation_name"
  | "contact_email"
  | "contact_phone"
  | "address"
  | "social_links"
  | "google_site_verification_code"
  | "meta_title"
  | "meta_description"
>;

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  cover_image_url: string | null;
  status: BlogStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type PageContent = {
  id: string;
  page_key: string;
  title: string;
  subtitle: string | null;
  body: string | null;
  hero_image_url: string | null;
  meta_title: string | null;
  meta_description: string | null;
  updated_at: string;
};

type Table<TRow, TInsert, TUpdate> = {
  Row: TRow;
  Insert: TInsert;
  Update: TUpdate;
  Relationships: [];
};

export type Database = {
  public: {
    Tables: {
      users: Table<User, Partial<User> & Pick<User, "id" | "email">, Partial<User>>;
      causes_projects: Table<
        CauseProject,
        Partial<CauseProject> & Pick<CauseProject, "title" | "slug">,
        Partial<CauseProject>
      >;
      donations: Table<
        Donation,
        Partial<Donation> & Pick<Donation, "donor_name" | "donor_email" | "amount">,
        Partial<Donation>
      >;
      site_settings: Table<SiteSettings, Partial<SiteSettings>, Partial<SiteSettings>>;
      blog_posts: Table<
        BlogPost,
        Partial<BlogPost> & Pick<BlogPost, "title" | "slug">,
        Partial<BlogPost>
      >;
      page_content: Table<
        PageContent,
        Partial<PageContent> & Pick<PageContent, "page_key" | "title">,
        Partial<PageContent>
      >;
    };
    Views: {
      site_settings_public: {
        Row: PublicSiteSettings;
        Relationships: [];
      };
    };
    Functions: Record<string, never>;
    Enums: {
      user_role: UserRole;
      cause_status: CauseStatus;
      donation_status: DonationStatus;
      blog_status: BlogStatus;
    };
    CompositeTypes: Record<string, never>;
  };
};
