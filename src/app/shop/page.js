"use client";

import { useApp } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import ShopCollection from "@/components/ShopCollection";

export default function ShopPage() {
  const { theme, handleAddToCart } = useApp();
  const router = useRouter();

  return (
    <ShopCollection
      onAddToCart={handleAddToCart}
      setCurrentPage={(page) => router.push(`/${page === "home" ? "" : page}`)}
      setSelectedProduct={(p) => router.push(`/product/${p.id}`)}
      theme={theme}
    />
  );
}
