-- Create product_families table
create table if not exists public.product_families (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Create trigger to update updated_at timestamp
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create or replace trigger update_product_families_updated_at
before update on public.product_families
for each row
execute function update_updated_at_column();

-- Enable RLS
alter table public.product_families enable row level security;

-- RLS Policy: Allow all authenticated users to read product families
create policy "Enable read access for all authenticated users" on public.product_families
  as permissive for select
  to authenticated
  using (true);

-- RLS Policy: Allow all authenticated users to insert product families
create policy "Enable insert for all authenticated users" on public.product_families
  as permissive for insert
  to authenticated
  with check (true);

-- RLS Policy: Allow all authenticated users to update product families
create policy "Enable update for all authenticated users" on public.product_families
  as permissive for update
  to authenticated
  using (true)
  with check (true);

-- RLS Policy: Allow all authenticated users to delete product families
create policy "Enable delete for all authenticated users" on public.product_families
  as permissive for delete
  to authenticated
  using (true);

-- Insert default product families
insert into public.product_families (name) values
  ('HVAC'),
  ('ROTATING MACHINES'),
  ('PNEUMATICS'),
  ('OTHER')
on conflict (name) do nothing;
