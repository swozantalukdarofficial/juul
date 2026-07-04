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
      
      // Bangladesh formatting (starts with 01 or 1, length 11 or 10)
      if (digits.startsWith('01') && digits.length === 11) return '+880' + digits.slice(1);
      if (digits.startsWith('1') && digits.length === 10) return '+880' + digits;
      if (digits.startsWith('880')) return '+' + digits;
      
      // UAE formatting (starts with 05 or 5, length 10 or 9)
      if (digits.startsWith('05') && digits.length === 10) return '+971' + digits.slice(1);
      if (digits.startsWith('5') && digits.length === 9) return '+971' + digits;
      if (digits.startsWith('971')) return '+' + digits;

      // If it looks like it already has some country code
      if (digits.length >= 9 && !digits.startsWith('0')) {
        return '+' + digits;
      }
      
      // Fallback
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
          { name: 'Transaction ID', value: transactionId || 'N/A' },
          { name: 'Customer Phone', value: phone }
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

    let finalResBody = await res.json();
    let finalRes = res;

    if (!finalRes.ok) {
      const errorStr = JSON.stringify(finalResBody.errors || {}).toLowerCase();
      if (errorStr.includes('phone')) {
        console.warn('Shopify rejected order phone formatting. Retrying order creation without phone field...');
        
        // Strip phone from customer and shipping address to ensure Shopify API acceptance
        const retryPayload = {
          order: {
            ...orderPayload.order,
            customer: customerId ? { id: customerId } : { first_name: name },
            shipping_address: {
              ...orderPayload.order.shipping_address
            }
          }
        };
        
        delete retryPayload.order.shipping_address.phone;

        const retryRes = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': accessToken
          },
          body: JSON.stringify(retryPayload)
        });

        finalRes = retryRes;
        finalResBody = await retryRes.json();
      }
    }

    if (!finalRes.ok) {
      console.error('Failed to create order in Shopify:', JSON.stringify(finalResBody));
      // Shopify errors can be an object like {"base":["msg"]}, stringify it for the client
      let errorMsg = 'Failed to create order';
      if (finalResBody.errors) {
        if (typeof finalResBody.errors === 'string') {
          errorMsg = finalResBody.errors;
        } else {
          // Flatten object errors into a readable string
          errorMsg = Object.entries(finalResBody.errors)
            .map(([key, val]) => `${key}: ${Array.isArray(val) ? val.join(', ') : val}`)
            .join('; ');
        }
      }
      return NextResponse.json({ error: errorMsg }, { status: finalRes.status });
    }

    return NextResponse.json({ success: true, order: finalResBody.order });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
