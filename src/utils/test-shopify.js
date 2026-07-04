const domain = "talukdardev.myshopify.com";
const storefrontAccessToken = "44588390aae53732c92d032bda6a8cc4";

async function shopifyFetch({ query, variables }) {
  const endpoint = `https://${domain}/api/2024-01/graphql.json`;

  try {
    const result = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      },
      body: JSON.stringify({ query, variables }),
    });

    return {
      status: result.status,
      body: await result.json(),
    };
  } catch (error) {
    console.error('Error in Shopify Fetch:', error);
    return {
      status: 500,
      error: error.message,
    };
  }
}

async function run() {
  const query = `
    query getProducts {
      products(first: 100) {
        edges {
          node {
            id
            title
            handle
            description
            productType
            tags
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  price {
                    amount
                  }
                  compareAtPrice {
                    amount
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  console.log("Fetching products from", domain);
  const response = await shopifyFetch({ query });
  console.log("Status:", response.status);
  if (response.body && response.body.data) {
    const products = response.body.data.products.edges.map(e => e.node);
    console.log(`Fetched ${products.length} products:`);
    products.forEach(p => {
      console.log(`- Title: ${p.title}`);
      console.log(`  Handle: ${p.handle}`);
      console.log(`  Variants count: ${p.variants.edges.length}`);
      p.variants.edges.forEach(v => {
        console.log(`    * Variant: ${v.node.title}, Price: ${v.node.price.amount}, CompareAtPrice: ${v.node.compareAtPrice?.amount}`);
      });
    });
  } else {
    console.log("Error body:", JSON.stringify(response.body, null, 2));
  }
}

run();
