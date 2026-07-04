import fs from 'fs';
import path from 'path';

async function test() {
  const envPath = path.resolve('.env.local');
  const envContent = fs.readFileSync(envPath, 'utf-8');
  const domain = envContent.match(/NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=(.+)/)?.[1]?.trim();
  const accessToken = envContent.match(/SHOPIFY_ADMIN_API_ACCESS_TOKEN=(.+)/)?.[1]?.trim();

  console.log("Domain:", domain);
  console.log("Token:", accessToken);

  const orderPayload = {
    order: {
      line_items: [
        {
          title: "Test Product",
          quantity: 1,
          price: "10.00"
        }
      ],
      customer: {
        first_name: "Test User",
        phone: "+971501234567"
      },
      shipping_address: {
        first_name: "Test User",
        address1: "Test Address",
        city: "Dubai",
        phone: "+971501234567",
        country: 'United Arab Emirates',
        country_code: 'AE'
      },
      financial_status: 'pending',
      fulfillment_status: null,
      note: "Test Order"
    }
  };

  const endpoint = `https://${domain}/admin/api/2024-01/orders.json`;

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': accessToken
      },
      body: JSON.stringify(orderPayload)
    });

    console.log("Response status:", res.status);
    const body = await res.json();
    console.log("Response body:", JSON.stringify(body, null, 2));
  } catch (err) {
    console.error("Error creating order:", err);
  }
}

test();
