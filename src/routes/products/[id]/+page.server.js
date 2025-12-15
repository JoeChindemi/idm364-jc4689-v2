import { error } from '@sveltejs/kit';
import { supabase } from '$lib/server/supabase_client.js';

export async function load({ params }) {
  const { id } = params;

  const { data, error: supabaseError } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (supabaseError) {
    console.error('Supabase error in /products/[id] load:', supabaseError);
    throw error(404, 'Product not found');
  }

  if (!data) {
    throw error(404, 'Product not found');
  }

  const product = {
    id: data.id,
    name: data.name,
    color: data.color,
    description: data.description,
    sizes: data.sizes ?? [],
    priceBySize: data.price_by_size ?? null,
    image: data.image_url ?? null
  };

  return { product };
}
