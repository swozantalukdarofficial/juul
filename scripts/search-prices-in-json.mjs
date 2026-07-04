import fs from 'fs';
import path from 'path';

const filePath = path.resolve('public/Shopify upload/shopify_products (1).json');
const rawData = fs.readFileSync(filePath, 'utf-8');
const products = JSON.parse(rawData);

products.forEach((p, idx) => {
  console.log(`\nProduct ${idx + 1}: ${p.title}`);
  // search title
  const titleMatch = p.title.match(/\d+(\.\d+)?/g);
  if (titleMatch) {
    console.log(`  Numbers in title: ${titleMatch.join(', ')}`);
  }
  // search body_html
  const bodyMatch = p.body_html.match(/(?:AED|Dhs|Price|Price:)\s*(\d+(\.\d+)?)/gi);
  if (bodyMatch) {
    console.log(`  Price matches in body: ${bodyMatch.join(', ')}`);
  }
  // search tags
  console.log(`  Tags: ${p.tags}`);
  console.log(`  Product Type: ${p.product_type}`);
});
