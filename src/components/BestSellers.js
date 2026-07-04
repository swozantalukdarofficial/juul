"use client";

import { motion } from "framer-motion";
import { ShoppingCart, Star, Eye, ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useApp } from "@/context/AppContext";
import { allProducts as defaultProducts } from "@/data/products";

export default function BestSellers({ onAddToCart, setCurrentPage, setSelectedProduct, theme }) {
  const isLight = theme === "light";
  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: 324, behavior: 'smooth' });
        }
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const scrollLeftNav = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth } = scrollRef.current;
      if (scrollLeft <= 0) {
        scrollRef.current.scrollTo({ left: scrollWidth, behavior: 'smooth' });
      } else {
        scrollRef.current.scrollBy({ left: -324, behavior: 'smooth' });
      }
    }
  };

  const scrollRightNav = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      if (scrollLeft + clientWidth >= scrollWidth - 10) {
        scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        scrollRef.current.scrollBy({ left: 324, behavior: 'smooth' });
      }
    }
  };

  const bestProducts = [
    {
      id: "juul2-device",
      name: "JUUL Device Kit - Slate",
      category: "kits",
      price: 29.99,
      originalPrice: 39.99,
      salePrice: 29.99,
      discount: 25,
      rating: 4.9,
      reviewsCount: 142,
      imgColor: "#4B5563",
      flavor: "mint",
      tag: "Best Seller",
      desc: "Anodized metal body with rapid USB magnetic charging.",
      image: "/deal-bundle.png"
    },
    {
      id: "juul2-polar-mint",
      name: "JUUL Pod Pack - Cool Mint",
      category: "pods",
      price: 15.99,
      originalPrice: 19.99,
      salePrice: 15.99,
      discount: 20,
      rating: 4.8,
      reviewsCount: 310,
      imgColor: "#10B981",
      flavor: "mint",
      tag: "Best Seller",
      desc: "Pack of 4 pre-filled pods containing crisp peppermint.",
      image: "/deal-mint.png"
    },
    {
      id: "juul2-mango",
      name: "JUUL Pod Pack - Royal Mango",
      category: "pods",
      price: 15.99,
      originalPrice: 21.99,
      salePrice: 15.99,
      discount: 27,
      rating: 4.9,
      reviewsCount: 228,
      imgColor: "#F59E0B",
      flavor: "mango",
      tag: "Best Seller",
      desc: "Pack of 4 pre-filled pods with sweet tropical nectar.",
      image: "/deal-triple.png"
    },
    {
      id: "carry-case",
      name: "Tactical Leather Carrying Case",
      category: "accessories",
      price: 19.99,
      originalPrice: 29.99,
      salePrice: 19.99,
      discount: 33,
      rating: 4.9,
      reviewsCount: 52,
      imgColor: "#78350F",
      flavor: "classic",
      tag: "Best Seller",
      desc: "Handcrafted, shockproof carrying case for device and pods.",
      image: "/deal-case.png"
    }
  ];

  const { products: contextProducts } = useApp();
  const activeBestProducts = (contextProducts && contextProducts.length > 0 ? contextProducts : defaultProducts)
    .filter(p => p.rating >= 4.8 || p.tag === "Best Seller")
    .slice(0, 4);
  const dummyBestProducts = [];

  const repeatedProducts = [...activeBestProducts, ...activeBestProducts, ...activeBestProducts];


  return (
    <section className={`py-24 border-y transition-colors duration-500 ${
      isLight ? "bg-zinc-50 border-zinc-200/80" : "bg-[#080809] border-white/5"
    }`}>
      <div className="max-w-7xl mx-auto px-6 text-left">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <span className={`text-xs font-bold uppercase tracking-widest ${
              isLight ? "text-zinc-400" : "text-zinc-500"
            }`}>
              Featured Collection
            </span>
            <h2 className={`text-3xl sm:text-5xl font-black tracking-tight ${
              isLight ? "text-zinc-950" : "text-white"
            }`}>
              Best Sellers UAE
            </h2>
          </div>
          <Link
            href="/juul2"
            className={`text-xs uppercase tracking-widest font-black py-3 px-6 rounded-full border transition-all duration-350 cursor-pointer ${
              isLight 
                ? "border-zinc-300 hover:border-zinc-950 hover:bg-zinc-950 hover:text-white" 
                : "border-white/10 hover:border-white hover:bg-white hover:text-zinc-950"
            }`}
          >
            View All Collection
          </Link>
        </div>

        {/* Auto Scrolling Product Slider */}
        <div 
          className="relative w-full overflow-hidden py-4 group/slider"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Navigation Arrows */}
          <button 
            onClick={scrollLeftNav} 
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-xl border border-zinc-200 dark:border-white/10 opacity-0 group-hover/slider:opacity-100 transition-opacity cursor-pointer hidden sm:flex"
          >
            <ChevronLeft className="w-5 h-5 text-zinc-900 dark:text-white" />
          </button>
          <button 
            onClick={scrollRightNav} 
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-xl border border-zinc-200 dark:border-white/10 opacity-0 group-hover/slider:opacity-100 transition-opacity cursor-pointer hidden sm:flex"
          >
            <ChevronRight className="w-5 h-5 text-zinc-900 dark:text-white" />
          </button>

          <div 
            ref={scrollRef}
            className="flex gap-6 w-full overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8 px-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {repeatedProducts.map((prod, idx) => {
              const currentPrice = parseFloat(prod.salePrice || prod.price || 0);
              const originalPrice = parseFloat(prod.originalPrice || 0);
              const savings = (originalPrice > currentPrice && !isNaN(originalPrice) && !isNaN(currentPrice)) 
                ? (originalPrice - currentPrice).toFixed(2) 
                : null;
              
              return (
                <div
                  key={`${prod.id}-${idx}`}
                  className={`group relative rounded-3xl border overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1.5 snap-center flex-shrink-0 w-[calc(100vw-48px)] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] ${
                    isLight
                      ? "bg-white border-zinc-200/80 shadow-[0_2px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_36px_rgba(0,0,0,0.09)]"
                      : "bg-[#111112] border-white/[0.06] hover:border-white/10"
                  }`}
                >
                  {/* Discount pill */}
                  {prod.discount && (
                    <div
                      className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full text-white text-[10px] font-black uppercase tracking-wider shadow-md"
                      style={{ backgroundColor: prod.imgColor }}
                    >
                      -{prod.discount}% OFF
                    </div>
                  )}

                  {/* Low stock warning */}
                  {prod.stock && (
                    <div className={`absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${
                      isLight
                        ? "bg-amber-50 text-amber-600 border border-amber-200"
                        : "bg-amber-950/50 text-amber-400 border border-amber-800/30"
                    }`}>
                      Only {prod.stock} left!
                    </div>
                  )}

                  {/* Product Image */}
                  <Link
                    href={`/product/${prod.id}`}
                    className={`relative w-full h-48 overflow-hidden cursor-pointer block ${
                      isLight ? "bg-zinc-50" : "bg-zinc-900/50"
                    }`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="relative w-full h-full flex items-center justify-center p-5"
                    >
                      {prod.image ? (
                        <Image
                          src={prod.image}
                          alt={prod.name}
                          fill
                          className="object-contain p-5 drop-shadow-md"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                      ) : (
                        /* Fallback Mockup */
                        <div
                          className="w-8 h-28 rounded-md border flex flex-col items-center justify-between p-1 transition-all shadow-lg"
                          style={{ backgroundColor: "#18181A", boxShadow: `0 10px 30px ${prod.imgColor}15` }}
                        >
                           <div className="w-full h-8 rounded-sm border-b border-black/40" style={{ backgroundColor: `${prod.imgColor}20` }} />
                           <div className="w-2 h-2 rounded-full" style={{ backgroundColor: prod.imgColor }} />
                        </div>
                      )}
                    </motion.div>
                  </Link>

                  {/* Content */}
                  <div className="flex flex-col gap-3 p-5 flex-1 justify-between">
                    <div className="space-y-1.5 text-left">
                      {/* Badge */}
                      <span className={`text-[9px] font-black uppercase tracking-widest`} style={{ color: prod.imgColor }}>
                        🔥 {prod.tag}
                      </span>
                      <Link
                        href={`/product/${prod.id}`}
                        className={`text-sm sm:text-base font-black leading-snug cursor-pointer hover:underline block ${isLight ? "text-zinc-950" : "text-white"}`}
                      >
                        {prod.name}
                      </Link>
                      <p className={`text-[11px] font-light leading-relaxed line-clamp-2 ${isLight ? "text-zinc-500" : "text-zinc-400"}`}>
                        {prod.desc}
                      </p>
                    </div>

                    {/* Pricing row */}
                    <div className="space-y-3 text-left">
                      <div className="flex items-end flex-wrap gap-x-2 gap-y-1">
                        <span className="text-2xl font-black" style={{ color: prod.imgColor }}>
                          AED {parseFloat(prod.salePrice || prod.price).toFixed(2)}
                        </span>
                        {prod.originalPrice && (
                          <span className={`text-sm line-through mb-0.5 ${isLight ? "text-zinc-400" : "text-zinc-655"}`}>
                            AED {parseFloat(prod.originalPrice).toFixed(2)}
                          </span>
                        )}
                        {savings && (
                          <span className={`text-[10px] font-black mb-0.5 px-2 py-0.5 rounded-full ${
                            isLight ? "bg-emerald-50 text-emerald-600" : "bg-emerald-950/50 text-emerald-400"
                          }`}>
                            Save AED {savings}
                          </span>
                        )}
                      </div>

                      {/* CTA Button */}
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onAddToCart(prod)}
                        className={`w-full py-3 rounded-2xl flex items-center justify-center gap-2 text-[11px] font-black uppercase tracking-wider transition-all cursor-pointer border ${
                          isLight
                            ? "bg-zinc-950 border-zinc-950 text-white hover:bg-zinc-800"
                            : "bg-white border-white text-zinc-950 hover:bg-zinc-100"
                        }`}
                      >
                        <ShoppingBag className="w-3.5 h-3.5" /> ADD TO CART
                      </motion.button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
