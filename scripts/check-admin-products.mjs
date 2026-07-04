import fs from 'fs';
import path from 'path';

async function main() {
  const envPath = path.resolve('.env.local');
  const envContent = fs.readFileSync(envPath, 'utf-8');
  const storeDomain = envContent.match(/NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=(.+)/)?.[1]?.trim();
  const accessToken = envContent.match(/SHOPIFY_ADMIN_API_ACCESS_TOKEN=(.+)/)?.[1]?.trim();

  const headers = {
    'X-Shopify-Access-Token': accessToken,
    'Content-Type': 'application/json',
  };

  const url = `https://${storeDomain}/admin/api/2024-01/products.json?limit=5`;
  const res = await fetch(url, { headers });
  const data = await res.json();
  
  console.log("Admin Products Status:");
  for (const p of data.products || []) {
    console.log(`Title: ${p.title}, Status: ${p.status}, Published At: ${p.published_at}`);
  }
}

main();
