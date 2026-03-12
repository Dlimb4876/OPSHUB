-- Create products table
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  product_name text not null,
  part_number text not null,
  product_family text not null,
  customer text not null,
  turnaround_time text,
  overhaul_time text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Create trigger to update updated_at timestamp
create or replace trigger update_products_updated_at
before update on public.products
for each row
execute function update_updated_at_column();

-- Enable RLS
alter table public.products enable row level security;

-- RLS Policy: Allow anonymous users to read products
create policy "Enable read access for anon users" on public.products
  as permissive for select
  to anon
  using (true);

-- RLS Policy: Allow anonymous users to insert products
create policy "Enable insert for anon users" on public.products
  as permissive for insert
  to anon
  with check (true);

-- RLS Policy: Allow anonymous users to update products
create policy "Enable update for anon users" on public.products
  as permissive for update
  to anon
  using (true)
  with check (true);

-- RLS Policy: Allow anonymous users to delete products
create policy "Enable delete for anon users" on public.products
  as permissive for delete
  to anon
  using (true);

-- RLS Policy: Allow authenticated users to read products
create policy "Enable read access for authenticated users" on public.products
  as permissive for select
  to authenticated
  using (true);

-- RLS Policy: Allow authenticated users to insert products
create policy "Enable insert for authenticated users" on public.products
  as permissive for insert
  to authenticated
  with check (true);

-- RLS Policy: Allow authenticated users to update products
create policy "Enable update for authenticated users" on public.products
  as permissive for update
  to authenticated
  using (true)
  with check (true);

-- RLS Policy: Allow authenticated users to delete products
create policy "Enable delete for authenticated users" on public.products
  as permissive for delete
  to authenticated
  using (true);
