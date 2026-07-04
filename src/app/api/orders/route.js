import { NextResponse } from 'next/server';

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const accessToken = process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN;

// Helper to extract numeric ID from gid://shopify/...
function getNumericId(gid) {
  if (!gid) return null;
  if (typeof gid === 'number' || !isNaN(gid)) return parseInt(gid, 10);
  // If base64 encoded
  if (!gid.startsWith('gid://')) {
    try {
      gid = Buffer.from(gid, 'base64').toString('ascii');
    } catch (e) {
      // not base64
    }
  }
  const match = gid.match(/\/(\d+)(\?|$)/);
  return match ? match[1] : gid;
}

// GET: Fetch recent orders for Admin Dashboard
export async function GET() {
  if (!domain || !accessToken) {
    return NextResponse.json({ error: 'Shopify credentials not configured.' }, { status: 500 });
  }

  const endpoint = `https://${domain}/admin/api/2024-01/orders.json?status=any&limit=50`;

  try {
    const res = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': accessToken
      }
    });

    if (!res.ok) {
      const errBody = await res.text();
      console.error('Failed to fetch orders from Shopify:', errBody);
      return NextResponse.json({ error: 'Failed to fetch orders from Shopify' }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data.orders || []);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST: Create custom order on checkout submission
export async function POST(req) {
  if (!domain || !accessToken) {
    return NextResponse.json({ error: 'Shopify credentials not configured.' }, { status: 500 });
  }

  try {
    const body = await req.json();
    const { name, phone, address, city, paymentMethod, transactionId, cartItems } = body;

    if (!name || !phone || !address || !city || !cartItems || cartItems.length === 0) {
      return NextResponse.json({ error: 'Missing required order details.' }, { status: 400 });
    }

    // Format line items - use variant_id for real Shopify products, title+price for custom/local items
    const lineItems = cartItems.map(item => {
      const rawVariantId = item.variantId || item.shopifyVariantId;
      const numericVariantId = rawVariantId ? getNumericId(rawVariantId) : null;
      const isValidVariant = numericVariantId && !isNaN(parseInt(numericVariantId, 10));

      if (isValidVariant) {
        return {
          variant_id: parseInt(numericVariantId, 10),
          quantity: item.quantity || 1
        };
      }
      // Fallback: custom line item with title + price (no variant_id)
      return {
        title: item.name || 'Custom Item',
        quantity: item.quantity || 1,
        price: item.price ? parseFloat(item.price).toFixed(2) : '0.00'
      };
    });

    // Smart phone number formatting (E.164)
    const formatPhone = (raw) => {
      const digits = raw.replace(/[^0-9+]/g, '');
      if (digits.startsWith('+')) return digits; // Already has country code
      if (digits.startsWith('00')) return '+' + digits.slice(2); // International dialing
      if (digits.startsWith('05') && digits.length >= 9) return '+971' + digits.slice(1); // UAE mobile (05x)
      if (digits.startsWith('971')) return '+' + digits; // UAE without +
      if (digits.startsWith('01') && digits.length >= 10) return '+880' + digits.slice(1); // BD mobile (01x)
      if (digits.startsWith('880')) return '+' + digits; // BD without +
      return '+971' + digits; // Default: treat as UAE local
    };

    const formattedPhone = formatPhone(phone);

    // Try to find existing customer by phone to avoid "phone already taken" error
    let customerId = null;
    try {
      const searchRes = await fetch(
        `https://${domain}/admin/api/2024-01/customers/search.json?query=phone:${encodeURIComponent(formattedPhone)}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': accessToken
          }
        }
      );
      if (searchRes.ok) {
        const searchData = await searchRes.json();
        if (searchData.customers && searchData.customers.length > 0) {
          customerId = searchData.customers[0].id;
        }
      }
    } catch (e) {
      console.log('Customer search failed, will create new:', e.message);
    }

    const customerData = customerId
      ? { id: customerId }
      : { first_name: name, phone: formattedPhone };

    const orderPayload = {
      order: {
        line_items: lineItems,
        customer: customerData,
        shipping_address: {
          first_name: name,
          address1: address,
          city: city,
          phone: formattedPhone,
          country: 'United Arab Emirates',
          country_code: 'AE'
        },
        financial_status: 'pending',
        fulfillment_status: null,
        note: `Payment Method: ${paymentMethod}.${transactionId ? ` Transaction ID: ${transactionId}` : ''} | Phone: ${phone}`,
        note_attributes: [
          { name: 'Payment Method', value: paymentMethod },
          { name: 'Transaction ID', value: transactionId || 'N/A' }
        ]
      }
    };

    const endpoint = `https://${domain}/admin/api/2024-01/orders.json`;

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': accessToken
      },
      body: JSON.stringify(orderPayload)
    });

    const resBody = await res.json();

    if (!res.ok) {
      console.error('Failed to create order in Shopify:', JSON.stringify(resBody));
      // Shopify errors can be an object like {"base":["msg"]}, stringify it for the client
      let errorMsg = 'Failed to create order';
      if (resBody.errors) {
        if (typeof resBody.errors === 'string') {
          errorMsg = resBody.errors;
        } else {
          // Flatten object errors into a readable string
          errorMsg = Object.entries(resBody.errors)
            .map(([key, val]) => `${key}: ${Array.isArray(val) ? val.join(', ') : val}`)
            .join('; ');
        }
      }
      return NextResponse.json({ error: errorMsg }, { status: res.status });
    }

    return NextResponse.json({ success: true, order: resBody.order });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
