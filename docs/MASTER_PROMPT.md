# Master Prompt: Professional Foundation/NGO Website

Use this document as the source of truth for the full product scope. Build phase-by-phase. Do not proceed to the next phase until the current phase is confirmed working.

## Tech Stack

- Framework: Next.js (App Router, Server Components, Server Actions)
- UI/Styling: React, Tailwind CSS 4.3, shadcn/ui, Lucide Icons
- Animations: Framer Motion
- Backend & Auth: Supabase (Database, Auth, Row Level Security, Storage)
- Payment Gateway: SSL Commerz (for dynamic donations)
- Email Service: Email.js (for contact, receipts, membership, and career applications)
- SEO & Analytics: Google Search Console integration
- State & Optimization: Next.js native Cache, Cookies, dynamic imports
- Image Processing: Client/Server-side image compression (e.g. sharp or browser-image-compression) without quality loss before Supabase Storage upload
- Media Viewer: Accessible image lightbox (keyboard, swipe, captions, prev/next) for the public gallery

## Core Requirement

Everything must be controllable from a secure Admin Panel. This includes page content, media, SSL Commerz credentials, Email.js keys, Google Search Console verification codes, gallery albums, achievements, dynamic About sections, collection and expense history, membership applications, and career listings.

Public visitors must be able to:

- Browse a photo gallery with lightbox viewing
- See achievements and impact milestones
- Read a fully dynamic About page (mission, vision, values, story, team, timeline)
- Inspect transparent collection (income) and expense history
- Apply to become a member
- Browse open roles and apply for careers

## Phase 1: Project Setup & Architecture Initialization

- Initialize the Next.js project with Tailwind CSS 4.3 and configure shadcn/ui.
- Set up the folder structure for a clean separation of concerns (e.g. `app/(admin)`, `app/(public)`, `components`, `lib`, `actions`).
- Configure the Supabase client (Client and Server-side with Next.js Cookies for secure session management).
- Establish the foundational global layout and caching strategies.

## Phase 2: Database Schema & Supabase Configuration

Write the SQL schema, including Row Level Security (RLS) policies, for the following tables:

- `users`: Admin/Roles management.
- `causes_projects`: Title, slug, description, `goal_amount`, `raised_amount`, `image_url`, status.
- `donations`: Donor name, email, amount, `transaction_id`, `cause_id`, status, `created_at`.
- `site_settings`: CRUCIAL TABLE. Must store dynamic configurations securely:
  - General: `logo_url`, `foundation_name`, `contact_email`, `social_links`.
  - Payment: `sslcommerz_store_id`, `sslcommerz_store_password`.
  - Email: `emailjs_service_id`, `emailjs_template_id`, `emailjs_public_key`.
  - SEO: `google_site_verification_code`.
- `page_content`: CMS rows for public pages. Seed keys must include `home`, `about`, `contact`, `gallery`, `achievements`, `transparency`, `membership`, and `careers`.
- `about_sections`: Dynamic About building blocks. Fields: `title`, `slug`, `section_type` (`story` | `mission` | `vision` | `values` | `timeline` | `custom`), `body`, `image_url`, `sort_order`, `is_published`.
- `team_members`: About/team roster. Fields: `full_name`, `role_title`, `bio`, `photo_url`, `sort_order`, `is_published`.
- `gallery_albums`: Album title, slug, description, `cover_image_url`, `event_date`, `sort_order`, `is_published`.
- `gallery_images`: `album_id`, `image_url`, `caption`, `alt_text`, `sort_order`, `is_published`. Public gallery must open these in a lightbox.
- `achievements`: Title, slug, description, `metric_value`, `metric_label`, `achieved_on`, `image_url`, `sort_order`, `is_published`. Used for impact counters, awards, and milestone cards.
- `finance_categories`: Name, `kind` (`collection` | `expense`), `is_active`.
- `finance_entries`: Transparent ledger. Fields: `kind` (`collection` | `expense`), `category_id`, `title`, `description`, `amount`, `entry_date`, `source_or_payee`, `receipt_url`, `is_published`. Collections are income (donations, grants, fundraising). Expenses are outgoing spend. Public history must show published entries only; never expose unpublished drafts.
- `membership_plans`: Plan name, slug, description, `fee_amount`, `duration_label`, `benefits`, `is_active`, `sort_order`.
- `membership_applications`: Become-a-member submissions. Fields: `full_name`, `email`, `phone`, `address`, `plan_id`, `motivation`, `status` (`pending` | `approved` | `rejected`), `admin_notes`, `created_at`.
- `job_postings`: Career listings. Fields: `title`, `slug`, `department`, `location`, `employment_type` (`full_time` | `part_time` | `contract` | `volunteer`), `description`, `requirements`, `deadline`, `is_published`.
- `job_applications`: Career applications. Fields: `job_id`, `full_name`, `email`, `phone`, `cover_letter`, `resume_url`, `status` (`pending` | `reviewed` | `shortlisted` | `rejected`), `created_at`.

RLS rules:

- Public (`anon` / `authenticated`) may SELECT only published/active rows for about sections, team, gallery, achievements, finance entries, membership plans, and job postings.
- Public may INSERT membership applications and job applications with status `pending` only.
- Staff may full CRUD all CMS tables. Admins may update application statuses.
- Finance unpublished drafts and applicant PII must never leak through public SELECT policies.

## Phase 3: Secure Admin Panel & Global Settings

- Implement Supabase Auth (Email/Password) and middleware to protect `/admin` routes.
- Build the Admin Dashboard UI using shadcn/ui (Sidebar, Stat cards, Data tables). Dashboard stats must include published gallery items, achievements, pending membership applications, open jobs, and latest collection vs expense totals.
- Settings Module: Create a secure form to input and save all configuration variables (SSL Commerz, Email.js, Google Site Verification) into the `site_settings` table.
- Media Manager: Implement an image upload utility using a compression library. It must compress images without visible quality loss before uploading to Supabase Storage. Reuse this uploader for gallery images, about/team photos, achievement images, expense receipts, and resumes.
- Build CRUD interfaces for:
  - Causes, Blog Posts, and global site content (`page_content`)
  - Dynamic About sections and team members
  - Gallery albums and images (drag/sort order, captions, album cover)
  - Achievements / impact milestones
  - Finance categories and collection/expense entries (with publish toggle)
  - Membership plans and application review (approve/reject + notes)
  - Job postings and career application review (status workflow)
- Admin sidebar must expose: Dashboard, Causes, Blog, Pages, About, Gallery, Achievements, Finance, Membership, Careers, Media, Settings.

## Phase 4: Public Frontend & Interactive UI

- Build the public-facing pages:
  - Home
  - About (fully dynamic)
  - Causes
  - Blog
  - Contact
  - Gallery
  - Achievements
  - Transparency (collection and expense history)
  - Become a Member
  - Careers
- Implement Framer Motion for scroll reveals, interactive buttons, and smooth page transitions.
- Ensure absolute responsiveness across all device sizes using Tailwind CSS 4.3.
- Implement Next.js image optimization (`next/image`) for blazing-fast load times.
- Fetch global settings (like the logo and social links) dynamically, utilizing Next.js caching to prevent unnecessary database reads.
- Public header/footer nav must include About, Causes, Gallery, Achievements, Transparency, Membership, Careers, Blog, and Contact.

### Gallery and Lightbox

- `/gallery` lists published albums with cover, date, and image count.
- `/gallery/[slug]` shows an album grid. Clicking any image opens a lightbox with:
  - Full-size image, caption, and alt text
  - Previous / next navigation
  - Keyboard support (Esc close, arrow keys)
  - Touch/swipe on mobile
  - Focus trap and accessible dialog semantics
- Home may feature a compact recent-album strip that also uses the same lightbox.

### Achievements

- `/achievements` shows published milestones as metric counters, award cards, and dated timeline items.
- Home and About must reuse featured achievements (e.g. lives reached, projects completed, funds deployed).

### Dynamic About

- `/about` is assembled only from CMS data: `page_content` (about), `about_sections` in `sort_order`, `team_members`, and featured achievements.
- Admins can add, reorder, hide, or rewrite About blocks without code changes.
- Render mission, vision, values, story, timeline, and team from `section_type`. Do not hardcode About copy.

### Collection and Expense History

- `/transparency` (label in nav: Transparency or Financials) shows:
  - Summary cards: total collected, total spent, remaining/balance for published entries
  - Filterable tables or year-grouped lists for collections and expenses
  - Category, date, amount, title, and optional receipt link
- Never show unpublished finance rows or internal admin notes on the public site.
- Home may show a short transparency snapshot linking to the full history.

### Become a Member

- `/membership` explains why to join, lists active `membership_plans`, and hosts a Become a Member form.
- Form fields: full name, email, phone, address, selected plan, motivation.
- Submit via Server Action into `membership_applications` with status `pending`.
- Show a success state; do not auto-approve.

### Careers

- `/careers` lists published `job_postings` (title, department, location, type, deadline).
- `/careers/[slug]` shows the full role and an application form (name, email, phone, cover letter, resume upload).
- Submit via Server Action into `job_applications` with status `pending`.
- Hide or mark expired roles after `deadline` unless the admin keeps them published.

## Phase 5: SSL Commerz Donation Gateway Integration

- Build a highly optimized, multi-step Donation Form UI using React Hook Form and shadcn/ui.
- Create a Next.js Server Action to initiate the SSL Commerz payment. Crucial: Dynamically fetch the `sslcommerz_store_id` and `sslcommerz_store_password` from the `site_settings` table securely.
- Set up the Next.js API routes for SSL Commerz webhooks (`/api/payment/success`, `/api/payment/fail`, `/api/payment/cancel`).
- Update the `donations` table and the respective cause's `raised_amount` securely upon a successful webhook response.
- Optionally record a published `finance_entries` collection row for each successful donation so Transparency stays in sync. If enabled, this must be idempotent on `transaction_id`.

## Phase 6: Email.js Integration & Notifications

- Create a utility to handle Email.js triggered via Next.js Server Actions.
- Fetch the Email.js API credentials dynamically from the `site_settings` table.
- Automated Trigger: Send a "Thank You & Receipt" email automatically when a donation is marked successful via the SSL Commerz webhook.
- Contact Form: Connect the public Contact Form to Email.js to send user inquiries directly to the foundation's admin email.
- Membership: Email the applicant a confirmation and notify the admin of a new Become a Member request.
- Careers: Email the applicant a confirmation and notify the admin of a new job application.

## Phase 7: Professional SEO & Google Search Console

- Google Verification: Inject the `google_site_verification_code` (fetched from `site_settings`) into the root `layout.tsx` metadata (using Next.js `generateMetadata` verification object) so the site can be verified in Google Search Console.
- Dynamic Sitemap: Create `app/sitemap.ts` to dynamically generate a `sitemap.xml` that maps all static pages, active causes, blog posts, gallery albums, achievements, membership, and published job postings.
- Robots.txt: Create `app/robots.ts` to generate a `robots.txt` that allows crawling of the public site but blocks the `/admin` routes.
- Metadata: Implement dynamic Open Graph tags and meta descriptions for Causes, Blog posts, Gallery albums, About, Achievements, Transparency, Membership, and Careers.
- Perform a final Lighthouse audit to ensure top scores in Performance, Accessibility, Best Practices, and SEO.

## Public Information Architecture

| Route | Source | Notes |
| --- | --- | --- |
| `/` | `page_content.home` + featured causes, achievements, gallery, transparency snapshot | |
| `/about` | `page_content.about` + `about_sections` + `team_members` + achievements | Fully CMS-driven |
| `/gallery` | `gallery_albums` | Album index |
| `/gallery/[slug]` | `gallery_images` | Grid + lightbox |
| `/achievements` | `achievements` | Metrics, awards, timeline |
| `/transparency` | `finance_entries` + `finance_categories` | Collection and expense history |
| `/membership` | `membership_plans` + application form | Become a member |
| `/careers` | `job_postings` | Open roles |
| `/careers/[slug]` | `job_postings` + application form | Role detail |
| `/causes`, `/blog`, `/contact` | Existing modules | Unchanged purpose |

## Build Rules

- Acknowledge these comprehensive instructions.
- Start only by providing the terminal setup commands and the initial code/SQL schema for Phase 1 and Phase 2.
- Wait for approval before moving to Phase 3.
- New public pages and admin modules listed above are in scope; do not ship hardcoded About, gallery, achievement, finance, membership, or career copy.
