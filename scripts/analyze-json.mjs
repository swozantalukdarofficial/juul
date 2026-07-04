import fs from 'fs';
import path from 'path';

const filePath = path.resolve('public/Shopify upload/shopify_products (1).json');
const rawData = fs.readFileSync(filePath, 'utf-8');
const products = JSON.parse(rawData);

console.log(`Total products in JSON: ${products.length}`);
console.log("Sample product fields:", Object.keys(products[0]));
console.log("Sample product variants:", products[0].variants);
console.log("Checking if any products have prices:");
let priceCount = 0;
let emptyPriceCount = 0;
products.forEach((p, index) => {
  const firstVariant = p.variants?.[0];
  if (firstVariant) {
    if (firstVariant.price && firstVariant.price !== "") {
      priceCount++;
      if (index < 5) console.log(`- ${p.title}: Price = ${firstVariant.price}`);
    } else {
      emptyPriceCount++;
    }
  }
});
console.log(`Products with non-empty prices: ${priceCount}`);
console.log(`Products with empty prices: ${emptyPriceCount}`);
