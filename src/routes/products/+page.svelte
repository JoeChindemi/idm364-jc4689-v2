<script lang="js">
  import Header from '$lib/components/Header.svelte';
  let { data } = $props();
  const products = data.products;

  function getFromPrice(product) {
    if (!product.sizes || !product.priceBySize) return null;
    const prices = product.sizes.map((size) => product.priceBySize[size]);
    return Math.min(...prices);
  }
</script>

<Header />

<h1>All Products</h1>

<div class="products-grid">
{#each products as product (product.id)}
  <article class="product-card">
    {#if product.image}
      <img
        src={product.image}
        alt={product.name}
        class="product-image"
      />
    {/if}

    <h2>{product.name}</h2>
    {#if getFromPrice(product) !== null}
      <p class="price">From ${getFromPrice(product)}</p>
    {/if}
    <p class="description">{product.description}</p>

    <a class="details-link" href={`/products/${product.id}`}>
      View details
    </a>
  </article>
{/each}


</div>



<style>
  
  .products-grid {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  }

  .product-card {
    border-radius: 16px;
    border: 1px solid #ddd;
    padding: 1rem;
    background-color: white;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
  }

  .product-image {
    width: 100%;
    height: auto;
    border-radius: 12px;
    margin-bottom: 0.5rem;
    object-fit: cover;
  }

  .details-link {
    align-self: flex-start;
    margin-top: 0.5rem;
    font-size: 0.9rem;
    text-decoration: none;
    padding: 0.4rem 0.8rem;
    border-radius: 999px;
    border: 1px solid #000;
    background: #ffffff;
    color: #000;
  }

  .details-link:hover {
    background: #a2ccff;
  }

</style>


