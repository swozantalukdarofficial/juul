import fs from 'fs';
import path from 'path';

const filePath = path.resolve('public/Shopify upload/shopify_products (1).json');
const rawData = fs.readFileSync(filePath, 'utf-8');
const products = JSON.parse(rawData);

async function test() {
  const url = products[0].images[1]?.src;
  console.log(`Testing image URL: ${url}`);
  try {
    const res = await fetch(url, { method: 'HEAD' });
    console.log(`Status code: ${res.status}`);
  } catch (err) {
    console.error(`Failed to fetch image URL:`, err.message);
  }
}

test();
