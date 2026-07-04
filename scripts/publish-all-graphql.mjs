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

  const endpoint = `https://${storeDomain}/admin/api/2024-01/graphql.json`;

  // 1. Fetch publications
  const pubQuery = `
    query {
      publications(first: 20) {
        edges {
          node {
            id
            name
          }
        }
      }
    }
  `;

  console.log("Fetching publications...");
  const pubRes = await fetch(endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query: pubQuery })
  });
  
  const pubData = await pubRes.json();
  const publications = pubData.data?.publications?.edges?.map(e => e.node) || [];
  console.log("Found Publications:", publications);

  if (publications.length === 0) {
    console.log("No publications found.");
    return;
  }

  // 2. Fetch all products
  const prodQuery = `
    query {
      products(first: 250) {
        edges {
          node {
            id
            title
          }
        }
      }
    }
  `;

  console.log("Fetching products...");
  const prodRes = await fetch(endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query: prodQuery })
  });
  const prodData = await prodRes.json();
  const products = prodData.data?.products?.edges?.map(e => e.node) || [];
  console.log(`Found ${products.length} products to publish.`);

  // 3. Publish each product to all publications
  const publishMutation = `
    mutation publishablePublish($id: ID!, $input: [PublicationInput!]!) {
      publishablePublish(id: $id, input: $input) {
        userErrors {
          field
          message
        }
      }
    }
  `;

  for (const p of products) {
    console.log(`Publishing ${p.title}...`);
    const input = publications.map(pub => ({ publicationId: pub.id }));
    
    const res = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: publishMutation,
        variables: {
          id: p.id,
          input
        }
      })
    });

    const result = await res.json();
    const errors = result.data?.publishablePublish?.userErrors || [];
    if (errors.length > 0) {
      console.error(`Errors publishing ${p.title}:`, errors);
    } else {
      console.log(`Successfully published ${p.title} to all publications.`);
    }
  }

  console.log("Publishing process completed.");
}

main().catch(console.error);
