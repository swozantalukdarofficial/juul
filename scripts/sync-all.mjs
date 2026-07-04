import fs from 'fs';
import path from 'path';

// Helper to delay execution (rate limiting)
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  console.log("=== STARTING SHOPIFY CLEAN & SYNC PROCESS ===");

  // 1. Read env variables
  const envPath = path.resolve('.env.local');
  if (!fs.existsSync(envPath)) {
    console.error("Error: .env.local file not found.");
    process.exit(1);
  }

  const envContent = fs.readFileSync(envPath, 'utf-8');
  const storeDomain = envContent.match(/NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=(.+)/)?.[1]?.trim();
  const accessToken = envContent.match(/SHOPIFY_ADMIN_API_ACCESS_TOKEN=(.+)/)?.[1]?.trim();

  if (!storeDomain || !accessToken) {
    console.error("Error: Missing credentials in .env.local.");
    process.exit(1);
  }

  console.log(`Store Domain: ${storeDomain}`);
  console.log(`Access Token: ${accessToken.substring(0, 10)}...`);

  const headers = {
    'X-Shopify-Access-Token': accessToken,
    'Content-Type': 'application/json',
  };

  // 2. Fetch all existing products from Shopify
  console.log("\n--- Fetching existing products from Shopify... ---");
  const listUrl = `https://${storeDomain}/admin/api/2024-01/products.json?limit=250`;
  let existingProducts = [];
  try {
    const res = await fetch(listUrl, { headers });
    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.status} ${await res.text()}`);
    }
    const data = await res.json();
    existingProducts = data.products || [];
    console.log(`Found ${existingProducts.length} existing products.`);
  } catch (err) {
    console.error("Error fetching existing products:", err);
    process.exit(1);
  }

  // 3. Delete existing products
  if (existingProducts.length > 0) {
    console.log("\n--- Deleting existing products... ---");
    for (const p of existingProducts) {
      console.log(`Deleting ${p.title} (ID: ${p.id})...`);
      const deleteUrl = `https://${storeDomain}/admin/api/2024-01/products/${p.id}.json`;
      try {
        const delRes = await fetch(deleteUrl, { method: 'DELETE', headers });
        if (!delRes.ok) {
          console.error(`Failed to delete ${p.title}: ${delRes.status}`);
        }
        await sleep(500); // 2 requests per second rate limit
      } catch (err) {
        console.error(`Error deleting product ${p.title}:`, err);
      }
    }
    console.log("All existing products deleted.");
  } else {
    console.log("No existing products to delete.");
  }

  // 4. Load products from JSON
  console.log("\n--- Loading new products from JSON... ---");
  const jsonPath = path.resolve('public/Shopify upload/shopify_products (1).json');
  if (!fs.existsSync(jsonPath)) {
    console.error(`Error: JSON file not found at ${jsonPath}`);
    process.exit(1);
  }

  const newProductsData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
  console.log(`Loaded ${newProductsData.length} products to upload.`);

  // Pricing helper
  const getProductPrice = (title) => {
    const t = title.toLowerCase();
    if (t.includes("free") || t.includes("get juul")) {
      return "350.00";
    }
    if (t.includes("device") || t.includes("compatible") || t.includes("kit")) {
      if (t.includes("2") || t.includes("ii")) return "120.00";
      return "100.00";
    }
    if (t.includes("pods") || t.includes("pod") || t.includes("pack")) {
      if (t.includes("2") || t.includes("ii")) return "75.00";
      return "65.00";
    }
    return "50.00";
  };

  // Color helper based on name
  const getFlavorColor = (title) => {
    const t = title.toLowerCase();
    if (t.includes("peach")) return "#F59E0B";
    if (t.includes("watermelon")) return "#EF4444";
    if (t.includes("apple")) return "#10B981";
    if (t.includes("mint") || t.includes("menthol") || t.includes("breeze")) return "#06B6D4";
    if (t.includes("tobacco") || t.includes("autumn")) return "#78716C";
    if (t.includes("lychee") || t.includes("berry") || t.includes("blackcurrant")) return "#EC4899";
    return "#3B82F6";
  };

  // Flavor type helper
  const getFlavorType = (title) => {
    const t = title.toLowerCase();
    if (t.includes("mint") || t.includes("menthol") || t.includes("breeze")) return "mint";
    if (t.includes("mango")) return "mango";
    if (t.includes("tobacco")) return "classic";
    if (t.includes("apple") || t.includes("peach") || t.includes("watermelon") || t.includes("lychee") || t.includes("berry") || t.includes("blackcurrant")) return "berry";
    return "classic";
  };

  const uploadedProducts = [];

  // 5. Upload new products to Shopify
  console.log("\n--- Uploading new products to Shopify... ---");
  for (let i = 0; i < newProductsData.length; i++) {
    const item = newProductsData[i];
    const price = getProductPrice(item.title);
    
    // Construct SKU
    const sku = item.title
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, '-')
      .substring(0, 15) + `-${i + 1}`;

    const payload = {
      product: {
        title: item.title,
        body_html: item.body_html || `<p>Experience premium flavor with ${item.title}.</p>`,
        vendor: item.vendor || 'Juul',
        product_type: item.product_type || 'Juul',
        tags: item.tags || 'Juul, Vape, Dubai',
        variants: [
          {
            price: price,
            sku: sku,
            inventory_management: 'shopify',
            inventory_policy: 'deny',
            fulfillment_service: 'manual',
            inventory_quantity: 100
          }
        ],
        images: (item.images || []).filter(img => {
          const src = (img.src || "").toLowerCase();
          return !src.includes("logo") && !src.includes("white_logo");
        })
      }
    };

    console.log(`Uploading [${i + 1}/${newProductsData.length}]: ${item.title} (Price: AED ${price})...`);
    
    const uploadUrl = `https://${storeDomain}/admin/api/2024-01/products.json`;
    try {
      const response = await fetch(uploadUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        console.error(`Failed to upload ${item.title}: ${response.status} ${await response.text()}`);
        continue;
      }

      const resData = await response.json();
      const createdProduct = resData.product;
      
      uploadedProducts.push({
        shopifyProduct: createdProduct,
        localPrice: parseFloat(price)
      });

      console.log(`Successfully uploaded: ${createdProduct.title} (Handle: ${createdProduct.handle})`);
      await sleep(500); // 2 requests per second rate limit
    } catch (err) {
      console.error(`Error uploading product ${item.title}:`, err);
    }
  }

  console.log(`\nSuccessfully uploaded ${uploadedProducts.length} of ${newProductsData.length} products.`);

  // 6. Generate products.js data file
  console.log("\n--- Generating new src/data/products.js... ---");
  
  const juul1ProductsList = [];
  const juul2ProductsList = [];

  for (const up of uploadedProducts) {
    const sp = up.shopifyProduct;
    const title = sp.title;
    const handle = sp.handle; // Unique handle from shopify
    const price = up.localPrice;
    
    const version = title.toLowerCase().includes("2") ? "juul2" : "juul1";
    
    let category = "pods";
    if (title.toLowerCase().includes("device") || title.toLowerCase().includes("kit")) {
      category = "kits";
    }

    const firstImage = sp.images?.[0]?.src || "/cat-pods.png";
    const tag = title.toLowerCase().includes("free") ? "Special Offer" : (version === "juul2" ? "UK Edition" : "USA Made");
    const imgColor = getFlavorColor(title);
    const flavor = getFlavorType(title);
    const desc = title.toLowerCase().includes("device") 
      ? `Original premium ${version === 'juul2' ? 'JUUL 2' : 'JUUL 1'} device kit. Sleek look, smart features.`
      : `High-quality pre-filled pods compatible with ${version === 'juul2' ? 'JUUL 2' : 'JUUL 1'} device.`;

    const productObj = {
      id: handle,
      name: title,
      category,
      version,
      price: price,
      rating: parseFloat((4.7 + Math.random() * 0.3).toFixed(1)),
      reviewsCount: Math.floor(40 + Math.random() * 200),
      imgColor,
      flavor,
      tag,
      desc,
      image: firstImage
    };

    if (version === "juul2") {
      juul2ProductsList.push(productObj);
    } else {
      juul1ProductsList.push(productObj);
    }
  }

  const productsJsContent = `// Shared product data for all pages
// Automatically generated from Shopify upload

export const juul1Products = ${JSON.stringify(juul1ProductsList, null, 2)};

export const juul2Products = ${JSON.stringify(juul2ProductsList, null, 2)};

// All products combined for lookup by ID
export const allProducts = [...juul1Products, ...juul2Products];

// Find a product by its ID
export function getProductById(id) {
  return allProducts.find((p) => p.id === id) || null;
}
`;

  const productsJsPath = path.resolve('src/data/products.js');
  fs.writeFileSync(productsJsPath, productsJsContent, 'utf-8');
  console.log(`New src/data/products.js successfully written to ${productsJsPath}`);

  console.log("\n=== SYNC COMPLETED SUCCESSFULLY ===");
}

main().catch(err => {
  console.error("Unhandled fatal error in sync script:", err);
});
