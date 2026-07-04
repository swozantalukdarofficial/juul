import { getShopifyProducts } from '../src/utils/shopify.js';

async function list() {
  try {
    const products = await getShopifyProducts();
    console.log(`Total products on Shopify: ${products?.length || 0}`);
    products.forEach((p, idx) => {
      console.log(`${idx + 1}. ${p.name} (handle: ${p.handle}) -> Price: ${p.price}`);
    });
  } catch (error) {
    console.error("Error listing products:", error);
  }
}

list();
