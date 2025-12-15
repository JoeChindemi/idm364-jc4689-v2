import { error } from '@sveltejs/kit';
import { supabase } from '$lib/server/supabase_client.js';

export async function load() {
  const { data, error: supabaseError } = await supabase
    .from('products')
    .select('*')
    .order('name', { ascending: true });

  if (supabaseError) {
    console.error('Supabase error in /products load:', supabaseError);
    throw error(500, 'Failed to load products');
  }

  if (!data) {
    return { products: [] };
  }

  const products = data.map((row) => ({
    id: row.id,
    name: row.name,
    color: row.color,
    description: row.description,
    sizes: row.sizes ?? [],
    priceBySize: row.price_by_size ?? null,
    image: row.image_url ?? null
  }));

  return { products };
}
