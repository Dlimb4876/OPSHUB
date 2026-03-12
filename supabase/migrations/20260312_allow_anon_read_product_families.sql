-- Allow anonymous users to read product families
-- This is necessary until a login screen is added

create policy "Enable read access for anonymous users" on public.product_families
  as permissive for select
  to anon
  using (true);
