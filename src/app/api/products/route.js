import { getShopifyProducts } from "@/utils/shopify";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const products = await getShopifyProducts();
    return NextResponse.json({ success: true, products });
  } catch (error) {
    console.error("Error in GET /api/products:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
