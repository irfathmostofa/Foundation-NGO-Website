# Master Prompt: Professional Foundation/NGO Website

Use this document as the source of truth for the full product scope. Build phase-by-phase. Do not proceed to the next phase until the current phase is confirmed working.

## Tech Stack

- Framework: Next.js (App Router, Server Components, Server Actions)
- UI/Styling: React, Tailwind CSS 4.3, shadcn/ui, Lucide Icons
- Animations: Framer Motion
- Backend & Auth: Supabase (Database, Auth, Row Level Security, Storage)
- Payment Gateway: SSL Commerz (for dynamic donations)
- Email Service: Email.js (for contact and receipts)
- SEO & Analytics: Google Search Console integration
- State & Optimization: Next.js native Cache, Cookies, dynamic imports
- Image Processing: Client/Server-side image compression (e.g. sharp or browser-image-compression) without quality loss before Supabase Storage upload

## Core Requirement

Everything must be controllable from a secure Admin Panel. This includes page content, media, SSL Commerz credentials, Email.js keys, and Google Search Console verification codes.

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

## Phase 3: Secure Admin Panel & Global Settings

- Implement Supabase Auth (Email/Password) and middleware to protect `/admin` routes.
- Build the Admin Dashboard UI using shadcn/ui (Sidebar, Stat cards, Data tables).
- Settings Module: Create a secure form to input and save all configuration variables (SSL Commerz, Email.js, Google Site Verification) into the `site_settings` table.
- Media Manager: Implement an image upload utility using a compression library. It must compress images without visible quality loss before uploading to Supabase Storage.
- Build CRUD interfaces for Causes, Blog Posts, and global site content.

## Phase 4: Public Frontend & Interactive UI

- Build the public-facing pages: Home, About, Causes, Blog, and Contact.
- Implement Framer Motion for scroll reveals, interactive buttons, and smooth page transitions.
- Ensure absolute responsiveness across all device sizes using Tailwind CSS 4.3.
- Implement Next.js image optimization (`next/image`) for blazing-fast load times.
- Fetch global settings (like the logo and social links) dynamically, utilizing Next.js caching to prevent unnecessary database reads.

## Phase 5: SSL Commerz Donation Gateway Integration

- Build a highly optimized, multi-step Donation Form UI using React Hook Form and shadcn/ui.
- Create a Next.js Server Action to initiate the SSL Commerz payment. Crucial: Dynamically fetch the `sslcommerz_store_id` and `sslcommerz_store_password` from the `site_settings` table securely.
- Set up the Next.js API routes for SSL Commerz webhooks (`/api/payment/success`, `/api/payment/fail`, `/api/payment/cancel`).
- Update the `donations` table and the respective cause's `raised_amount` securely upon a successful webhook response.

## Phase 6: Email.js Integration & Notifications

- Create a utility to handle Email.js triggered via Next.js Server Actions.
- Fetch the Email.js API credentials dynamically from the `site_settings` table.
- Automated Trigger: Send a "Thank You & Receipt" email automatically when a donation is marked successful via the SSL Commerz webhook.
- Contact Form: Connect the public Contact Form to Email.js to send user inquiries directly to the foundation's admin email.

## Phase 7: Professional SEO & Google Search Console

- Google Verification: Inject the `google_site_verification_code` (fetched from `site_settings`) into the root `layout.tsx` metadata (using Next.js `generateMetadata` verification object) so the site can be verified in Google Search Console.
- Dynamic Sitemap: Create `app/sitemap.ts` to dynamically generate a `sitemap.xml` that maps all static pages, active causes, and blog posts.
- Robots.txt: Create `app/robots.ts` to generate a `robots.txt` that allows crawling of the public site but blocks the `/admin` routes.
- Metadata: Implement dynamic Open Graph tags and meta descriptions for all Causes and Blog posts to ensure rich sharing on social media.
- Perform a final Lighthouse audit to ensure top scores in Performance, Accessibility, Best Practices, and SEO.

## Build Rules

- Acknowledge these comprehensive instructions.
- Start only by providing the terminal setup commands and the initial code/SQL schema for Phase 1 and Phase 2.
- Wait for approval before moving to Phase 3.
