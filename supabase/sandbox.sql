-- Demo defaults. Safe to run after supabase/schema.sql.
-- Seeds the official SSL Commerz sandbox store when credentials are empty.

update public.site_settings
set
  sslcommerz_store_id = coalesce(nullif(sslcommerz_store_id, ''), 'testbox'),
  sslcommerz_store_password = coalesce(nullif(sslcommerz_store_password, ''), 'qwerty'),
  sslcommerz_is_live = false
where id = 1;
