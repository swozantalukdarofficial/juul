"use client";

import { motion } from "framer-motion";
import { Star, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { allProducts } from "@/data/products";
import { useApp } from "@/context/AppContext";

export default function ProductRecommendations({ category, currentProductId, onProductClick, onAddToCart, theme }) {
  const isLight = theme === "light";
  const { products } = useApp();
  const sourceProducts = products && products.length > 0 ? products : allProducts;

  // Filter out current product, prefer same category, fill with others
  const recommendations = (() => {
    const sameCat = sourceProducts.filter(p => p.id !== currentProductId && p.category === category);
    const others = sourceProducts.filter(p => p.id !== currentProductId && p.category !== category);
    return [...sameCat, ...others].slice(0, 4);
  })();

  return (
    <div className={`pt-16 border-t text-left ${isLight ? "border-zinc-200" : "border-white/5"}`}>
      <h3 className={`text-xl sm:text-2xl font-black mb-8 ${isLight ? "text-zinc-950" : "text-white"}`}>
        You May Also Like
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {recommendations.map((prod) => (
          <motion.div
            key={prod.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.4 }}
            className={`group relative flex flex-col justify-between rounded-3xl p-4 border transition-all duration-300 ${isLight
                ? "bg-white border-zinc-200 hover:border-red-500/40 shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_12px_30px_rgba(239,68,68,0.04)]"
                : "bg-[#111112] border-white/5 hover:border-red-500/30 hover:shadow-[0_12px_30px_rgba(239,68,68,0.06)]"
              }`}
          >
            {/* Image Box */}
            <Link
              href={`/product/${prod.id}`}
              className={`w-full h-40 rounded-2xl border relative overflow-hidden flex items-center justify-center cursor-pointer transition-colors block ${isLight ? "bg-zinc-50 border-zinc-100" : "bg-zinc-950 border-white/5"
                }`}
            >
              {prod.image ? (
                <Image
                  src={prod.image}
                  alt={prod.name}
                  fill
                  className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 25vw"
                />
              ) : (
                /* Fallback device block */
                <div
                  className="w-6 h-20 rounded border flex flex-col items-center justify-between p-0.5 shadow-lg"
                  style={{ backgroundColor: "#18181A", borderColor: "rgba(255,255,255,0.1)" }}
                >
                  <div className="w-full h-5 bg-zinc-800 rounded-sm" />
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#10B981", boxShadow: "0 0 5px #10B981" }} />
                  <div className="w-full h-1 bg-zinc-700 rounded-full" />
                </div>
              )}
            </Link>

            {/* Content info */}
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-0.5 text-amber-400">
                  <Star className="w-3 h-3 fill-amber-400" />
                  <span className={`text-[10px] font-bold ${isLight ? "text-zinc-800" : "text-white"}`}>{prod.rating}</span>
                </div>
                <span className="text-[9px] uppercase font-bold text-zinc-500 tracking-wider">
                  {prod.category}
                </span>
              </div>

              <Link
                href={`/product/${prod.id}`}
                className={`text-xs font-bold transition-colors cursor-pointer line-clamp-1 hover:text-red-500 block ${isLight ? "text-zinc-900" : "text-white"
                  }`}
              >
                {prod.name}
              </Link>
            </div>

            {/* Footer action */}
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-zinc-100 dark:border-white/5">
              <div className="flex flex-col text-left">
                <div className="flex items-baseline gap-1.5">
                  <span className={`text-sm font-black ${isLight ? "text-black" : "text-white"}`}>AED {parseFloat(prod.price).toFixed(2)}</span>
                  {prod.originalPrice && prod.originalPrice > prod.price && (
                    <span className="text-[10px] line-through text-zinc-500 font-semibold">
                      AED {parseFloat(prod.originalPrice).toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={() => onAddToCart(prod)}
                className={`p-2 rounded-full transition-all duration-300 cursor-pointer ${isLight
                    ? "bg-zinc-950 hover:bg-red-600 text-white shadow-md shadow-zinc-950/10"
                    : "bg-white/5 hover:bg-red-500 hover:text-white text-white border border-white/10 hover:border-transparent"
                  }`}
              >
                <ShoppingCart className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
