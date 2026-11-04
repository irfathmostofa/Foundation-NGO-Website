# Hope Foundation

Production-ready Foundation/NGO website built with Next.js App Router, Tailwind CSS 4, shadcn/ui, and Supabase.

The full product specification lives in `docs/MASTER_PROMPT.md`.

## Phase status

- Phase 1: Project setup and architecture — complete
- Phase 2: Database schema and Supabase configuration — complete
- Phase 3: Secure admin panel and global settings — complete
- Phase 4: Public frontend and interactive UI — complete
- Phase 5+: waiting for approval
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
```

```bash
# Start the development server
npm run dev
```

## Database

Run `supabase/schema.sql` in the Supabase SQL Editor after creating the project. Then promote the first authenticated user to `super_admin` in `public.users`.
#
