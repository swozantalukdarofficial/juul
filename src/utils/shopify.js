async function shopifyFetch({ query, variables }) {
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || "talukdardev.myshopify.com";
  const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || "44588390aae53732c92d032bda6a8cc4";
  const endpoint = `https://${domain}/api/2024-01/graphql.json`;

  try {
    const result = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      },
      body: JSON.stringify({ query, variables }),
      cache: 'no-store',
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

export async function getShopifyProducts() {
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
            images(first: 10) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 100) {
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
                  image {
                    url
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const response = await shopifyFetch({ query });
  
  if (!response || response.status !== 200 || !response.body?.data) {
    console.error('Failed to fetch products from Shopify storefront:', response);
    return [];
  }

  // Transform products from Shopify structure to local structure
  const rawProducts = response.body.data.products.edges.map(edge => edge.node);

  return rawProducts.map(prod => {
    // Get the first variant
    const firstVariant = prod.variants.edges[0]?.node;
    const price = firstVariant ? parseFloat(firstVariant.price.amount) : 0;
    const originalPrice = firstVariant?.compareAtPrice ? parseFloat(firstVariant.compareAtPrice.amount) : null;
    
    // Determine category based on productType or tags
    let category = "pods";
    const type = (prod.productType || "").toLowerCase();
    const tags = prod.tags.map(t => t.toLowerCase());

    if (type.includes("kit") || type.includes("device") || tags.includes("kit") || tags.includes("device")) {
      category = "kits";
    } else if (type.includes("accessory") || type.includes("charger") || type.includes("case") || tags.includes("accessory")) {
      category = "accessories";
    }

    // Determine version based on tags or title
    let version = "juul2";
    if (prod.title.toLowerCase().includes("juul 1") || prod.title.toLowerCase().includes("juul1") || tags.includes("juul1")) {
      version = "juul1";
    }

    // Find the first image that is not a logo
    const imagesList = prod.images.edges.map(e => e.node?.url || "").filter(Boolean);
    const firstImage = imagesList.find(url => {
      const u = url.toLowerCase();
      return !u.includes("logo") && !u.includes("white_logo");
    }) || imagesList[0] || "";

    // Determine rating/reviewsCount from tags or default (since Shopify storefront doesn't have default rating unless Metafields)
    // We can parse tags like "rating-4.9" or "reviews-120"
    let rating = 4.8;
    let reviewsCount = 98;
    let tagBadge = "New Arrival";
    let imgColor = "#4B5563"; // Default color theme

    tags.forEach(tag => {
      if (tag.startsWith("rating-")) {
        const parsed = parseFloat(tag.replace("rating-", ""));
        if (!isNaN(parsed)) rating = parsed;
      }
      if (tag.startsWith("reviews-")) {
        const parsed = parseInt(tag.replace("reviews-", ""), 10);
        if (!isNaN(parsed)) reviewsCount = parsed;
      }
      if (tag.startsWith("badge-")) {
        tagBadge = tag.replace("badge-", "").replace("-", " ").toUpperCase();
      }
      if (tag.startsWith("color-")) {
        imgColor = tag.replace("color-", "");
        if (!imgColor.startsWith("#")) {
          imgColor = "#" + imgColor;
        }
      }
    });

    if (tags.includes("best-seller") || tags.includes("bestseller")) {
      tagBadge = "Best Seller";
    } else if (originalPrice && originalPrice > price) {
      tagBadge = "Sale";
    }

    return {
      id: prod.id, // Keep the base64 variant/product ID from Shopify
      shopifyId: prod.id,
      handle: prod.handle,
      name: prod.title,
      category: category,
      version: version,
      price: price,
      originalPrice: originalPrice,
      salePrice: price,
      discount: originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : null,
      rating: rating,
      reviewsCount: reviewsCount,
      imgColor: imgColor,
      tag: tagBadge,
      desc: prod.description || "Authentic JUUL products directly sourced from authorized distributors.",
      image: firstImage,
      images: imagesList,
      variants: prod.variants.edges.map(v => ({
        id: v.node.id,
        title: v.node.title,
        price: parseFloat(v.node.price.amount),
        image: v.node.image?.url || firstImage
      }))
    };
  });
}

export async function createShopifyCheckout(lineItems) {
  const query = `
    mutation checkoutCreate($input: CheckoutCreateInput!) {
      checkoutCreate(input: $input) {
        checkout {
          id
          webUrl
        }
        checkoutUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  // Line items need to be in the format: { variantId: ID!, quantity: Int! }
  const formattedLineItems = lineItems.map(item => ({
    variantId: item.variantId,
    quantity: item.quantity || 1
  }));

  const response = await shopifyFetch({
    query,
    variables: {
      input: {
        lineItems: formattedLineItems
      }
    }
  });

  if (!response || response.status !== 200 || !response.body?.data) {
    console.error('Failed to create Shopify checkout session:', response);
    return null;
  }

  const errors = response.body.data.checkoutCreate.checkoutUserErrors;
  if (errors && errors.length > 0) {
    console.error('Shopify Checkout Creation Errors:', errors);
    return null;
  }

  return response.body.data.checkoutCreate.checkout.webUrl;
}

export async function getShopifyPage(handle) {
  const query = `
    query getPage($handle: String!) {
      page(handle: $handle) {
        id
        title
        body
      }
    }
  `;

  const response = await shopifyFetch({
    query,
    variables: { handle }
  });

  if (!response || response.status !== 200 || !response.body?.data?.page) {
    return null;
  }

  return response.body.data.page;
}
