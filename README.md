# Hope Foundation

Production-ready Foundation/NGO website built with Next.js App Router, Tailwind CSS 4, shadcn/ui, and Supabase.

The full product specification lives in `docs/MASTER_PROMPT.md`.

## Phase status

- Phase 1: Project setup and architecture — complete
- Phase 2: Database schema and Supabase configuration — complete
- Phase 3: Secure admin panel and global settings — complete
- Phase 4: Public frontend and interactive UI — complete
- Phase 5: SSL Commerz donation gateway — complete
- Phase 6: Email.js notifications — complete
- Phase 7: Professional SEO and Google Search Console — complete
## Setup

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
```

Fill `.env.local` with your Supabase project values:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
EMAILJS_SERVICE_ID=service_xxxxxxx
EMAILJS_TEMPLATE_ID=template_xxxxxxx
EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxxxxxx
EMAILJS_PRIVATE_KEY=xxxxxxxxxxxxxxxxxxxx
EMAILJS_CONTACT_EMAIL=ektakaybrikkhoropon@gmail.com
```

```bash
# Start the development server
npm run dev
```

## Database

Run these in the Supabase SQL Editor after creating the project, in order:

```bash
# Core schema
supabase/schema.sql

# Public CMS tables
supabase/phase4.sql

# Donation extra fields and finance transaction index
supabase/phase5.sql

# Official SSL Commerz sandbox credentials for demo
supabase/sandbox.sql
```

Then promote the first authenticated user to `super_admin` in `public.users`.

SSL Commerz uses the official sandbox store (`testbox` / `qwerty`) until production credentials are saved and `sslcommerz_is_live` is enabled. Test cards and OTP are listed in Admin → Settings and on the donate page.

Email.js service ID, template ID, public key, and private key are saved in Admin → Settings, with optional `EMAILJS_*` env fallbacks. Copy the HTML from `docs/EMAILJS_TEMPLATE.md` into one EmailJS template. The template must accept `to_email`, `to_name`, `subject`, `title`, `message`, `html_message`, `reply_to`, `from_name`, `foundation_name`, `site_url`, and `year`. Public emails follow the applicant locale (Bangla default); admin alerts stay in English.

Google Search Console verification uses `google_site_verification_code` from Admin → Settings. Public SEO files:

```bash
# Dynamic sitemap with bn/en locale alternates
/sitemap.xml

# Allows public routes, blocks /admin and payment result pages
/robots.txt
```
#
