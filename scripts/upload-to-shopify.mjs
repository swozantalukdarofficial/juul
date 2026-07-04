import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Parse .env.local manually
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const envPath = path.resolve(rootDir, '.env.local');

if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, 'utf8').split('\n');
  lines.forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const parts = trimmed.split('=');
      const key = parts[0].trim();
      const val = parts.slice(1).join('=').trim();
      process.env[key] = val;
    }
  });
}

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const accessToken = process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN;

if (!domain || domain.includes('your-store-name') || !accessToken || accessToken.includes('your_admin_api')) {
  console.error('❌ Error: Please configure NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN and SHOPIFY_ADMIN_API_ACCESS_TOKEN in .env.local first.');
  process.exit(1);
}

console.log(`Starting migration to Shopify Store: ${domain}...`);

// Read products.js and parse allProducts
const productsFilePath = path.resolve(rootDir, 'src/data/products.js');
if (!fs.existsSync(productsFilePath)) {
  console.error('❌ Error: Could not find src/data/products.js');
  process.exit(1);
}

let content = fs.readFileSync(productsFilePath, 'utf8');
content = content.replace(/export\s+const\s+(\w+)\s*=/g, 'const $1 =');
content = content.replace(/export\s+function\s+getProductById[\s\S]*$/g, '');
content += '\nreturn allProducts;';

let allProducts = [];
try {
  allProducts = new Function(content)();
} catch (err) {
  console.error('❌ Error evaluating products.js content:', err);
  process.exit(1);
}

console.log(`Loaded ${allProducts.length} products from products.js.`);

// Helper function to sleep (to comply with Shopify API rate limits: 2 requests per second)
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function uploadProduct(prod) {
  console.log(`\n⏳ Uploading "${prod.name}"...`);

  // Build Tags
  const tagList = [
    prod.version || 'juul2',
    `category-${prod.category || 'pods'}`,
    `color-${(prod.imgColor || '#4B5563').replace('#', '')}`,
    `rating-${prod.rating || '4.8'}`,
    `reviews-${prod.reviewsCount || '98'}`,
  ];
  if (prod.tag) {
    tagList.push(`badge-${prod.tag.replace(/\s+/g, '-')}`);
  }
  if (prod.flavor) {
    tagList.push(`flavor-${prod.flavor}`);
  }

  // Handle local image attachment
  const images = [];
  if (prod.image) {
    // Strip leading slash
    const relativeImgPath = prod.image.startsWith('/') ? prod.image.substring(1) : prod.image;
    const imgFullPath = path.resolve(rootDir, 'public', relativeImgPath);
    if (fs.existsSync(imgFullPath)) {
      try {
        const base64Data = fs.readFileSync(imgFullPath, 'base64');
        images.push({
          attachment: base64Data,
          filename: path.basename(imgFullPath)
        });
      } catch (err) {
        console.warn(`⚠️ Warning: Could not read image file ${imgFullPath}:`, err.message);
      }
    } else {
      console.warn(`⚠️ Warning: Local image file not found at ${imgFullPath}`);
    }
  }

  const payload = {
    product: {
      title: prod.name,
      body_html: prod.desc || '',
      vendor: 'JUUL',
      product_type: prod.category || 'pods',
      status: 'active',
      tags: tagList.join(', '),
      variants: [
        {
          price: prod.price.toString(),
          compare_at_price: prod.originalPrice ? prod.originalPrice.toString() : null,
          sku: prod.id,
          inventory_policy: 'deny',
          fulfillment_service: 'manual',
          option1: 'Default Title'
        }
      ],
      images: images
    }
  };

  const endpoint = `https://${domain}/admin/api/2024-01/products.json`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': accessToken
      },
      body: JSON.stringify(payload)
    });

    const resBody = await response.json();

    if (response.status === 201 && resBody.product) {
      console.log(`✅ Success: Created "${prod.name}" (ID: ${resBody.product.id})`);
    } else {
      console.error(`❌ Failed: "${prod.name}". Status: ${response.status}`, JSON.stringify(resBody.errors || resBody));
    }
  } catch (error) {
    console.error(`❌ Error uploading "${prod.name}":`, error.message);
  }
}

async function startMigration() {
  for (let i = 0; i < allProducts.length; i++) {
    await uploadProduct(allProducts[i]);
    // Sleep 1.5 seconds between requests to respect rate limits
    await sleep(1500);
  }
  console.log('\n🎉 Migration run finished!');
}

startMigration();
