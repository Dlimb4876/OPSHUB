import { supabase } from '../supabaseClient';

const mapFromDb = (row) => ({
  id: row.id,
  name: row.name,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

const mapToDb = (family) => ({
  name: family.name,
});

export const fetchProductFamilies = async () => {
  const { data, error } = await supabase
    .from('product_families')
    .select('*')
    .order('name', { ascending: true });

  if (error) throw new Error(error.message);
  return data.map(mapFromDb);
};

export const addProductFamily = async (family) => {
  const { data, error } = await supabase
    .from('product_families')
    .insert([mapToDb(family)])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return mapFromDb(data);
};

export const updateProductFamily = async (id, family) => {
  const { data, error } = await supabase
    .from('product_families')
    .update({ ...mapToDb(family), updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return mapFromDb(data);
};

export const deleteProductFamily = async (id) => {
  const { error } = await supabase
    .from('product_families')
    .delete()
    .eq('id', id);

  if (error) throw new Error(error.message);
};
