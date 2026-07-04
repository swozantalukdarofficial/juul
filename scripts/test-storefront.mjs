import fs from 'fs';
import path from 'path';

async function test() {
  const envPath = path.resolve('.env.local');
  const envContent = fs.readFileSync(envPath, 'utf-8');
  const storeDomain = envContent.match(/NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=(.+)/)?.[1]?.trim();
  const storefrontAccessToken = envContent.match(/NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=(.+)/)?.[1]?.trim();

  console.log("Domain:", storeDomain);
  console.log("Token:", storefrontAccessToken);

  const query = `
    query getProducts {
      products(first: 100) {
        edges {
          node {
            id
            title
            handle
          }
        }
      }
    }
  `;

  const res = await fetch(`https://${storeDomain}/api/2024-01/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
    },
    body: JSON.stringify({ query }),
  });

  const data = await res.json();
  console.log("Products from storefront API:");
  console.log(JSON.stringify(data, null, 2));
}

test();
