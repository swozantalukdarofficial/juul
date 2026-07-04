import { NextResponse } from 'next/server';

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const accessToken = process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN;

// PUT: Update order fields (e.g., mark as paid, update notes)
export async function PUT(req, { params }) {
  if (!domain || !accessToken) {
    return NextResponse.json({ error: 'Shopify credentials not configured.' }, { status: 500 });
  }

  // Await params as required in Next.js 16 APIs
  const resolvedParams = await params;
  const orderId = resolvedParams.id;

  try {
    const body = await req.json();
    const { financial_status, note } = body;

    const payload = {
      order: {
        id: parseInt(orderId, 10),
      }
    };

    if (financial_status) {
      payload.order.financial_status = financial_status;
    }
    if (note) {
      payload.order.note = note;
    }

    const endpoint = `https://${domain}/admin/api/2024-01/orders/${orderId}.json`;

    const res = await fetch(endpoint, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': accessToken
      },
      body: JSON.stringify(payload)
    });

    const resBody = await res.json();

    if (!res.ok) {
      console.error(`Failed to update order ${orderId}:`, JSON.stringify(resBody));
      return NextResponse.json({ error: resBody.errors || 'Failed to update order' }, { status: res.status });
    }

    return NextResponse.json({ success: true, order: resBody.order });
  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE: Cancel/Void order in Shopify
export async function DELETE(req, { params }) {
  if (!domain || !accessToken) {
    return NextResponse.json({ error: 'Shopify credentials not configured.' }, { status: 500 });
  }

  const resolvedParams = await params;
  const orderId = resolvedParams.id;

  try {
    const endpoint = `https://${domain}/admin/api/2024-01/orders/${orderId}/cancel.json`;

    const res = await fetch(endpoint, {
      method: 'POST', // Shopify cancel is a POST request
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': accessToken
      },
      body: JSON.stringify({})
    });

    const resBody = await res.json();

    if (!res.ok) {
      console.error(`Failed to cancel order ${orderId}:`, JSON.stringify(resBody));
      return NextResponse.json({ error: resBody.errors || 'Failed to cancel order' }, { status: res.status });
    }

    return NextResponse.json({ success: true, order: resBody.order });
  } catch (error) {
    console.error('Error cancelling order:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
