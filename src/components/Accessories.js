"use client";

import { motion } from "framer-motion";
import { ShoppingBag, ChevronLeft, ChevronRight, Star, Check } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useApp } from "@/context/AppContext";

export default function Accessories({ onAddToCart, setSelectedProduct, setCurrentPage, theme }) {
  const { products: contextProducts } = useApp();
  const isLight = theme === "light";
  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollRef.current.scrollBy({ left: 340, behavior: "smooth" });
        }
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const scrollLeftNav = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth } = scrollRef.current;
      if (scrollLeft <= 0) {
        scrollRef.current.scrollTo({ left: scrollWidth, behavior: "smooth" });
      } else {
        scrollRef.current.scrollBy({ left: -340, behavior: "smooth" });
      }
    }
  };

  const scrollRightNav = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      if (scrollLeft + clientWidth >= scrollWidth - 10) {
        scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollRef.current.scrollBy({ left: 340, behavior: "smooth" });
      }
    }
  };

  const accessoryProducts = contextProducts && contextProducts.length > 0 ? contextProducts.filter(p => p.category === "accessories") : [];

  if (accessoryProducts.length === 0) {
    return null;
  }

  const handleProductClick = (prod) => {
    if (setSelectedProduct) {
      setSelectedProduct(prod);
    }
    if (setCurrentPage) {
      setCurrentPage("product");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const chargerProduct = accessoryProducts.find(p => p.id === "juul-usb-dock") || accessoryProducts[0];

  return (
    <section className={`py-10 lg:py-16 border-y transition-colors duration-500 ${
      isLight ? "bg-zinc-100 border-zinc-200" : "bg-[#09090A] border-white/5"
    }`}>
      <div className="max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12 text-left">
        
        {/* Main Outer Card Wrapper */}
        <div className={`rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-8 lg:p-10 xl:p-12 transition-all duration-300 ${
          isLight 
            ? "bg-white border border-zinc-200 shadow-[0_8px_30px_rgb(0,0,0,0.06)]" 
            : "bg-[#111112] border border-white/10 shadow-2xl"
        }`}>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Side: Premium Text Block */}
            <div className="flex flex-col justify-center space-y-6 lg:pr-8">
              
              {/* Badge */}
              <div>
                <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full ${
                  isLight ? "bg-blue-50 text-blue-600 border border-blue-100" : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                }`}>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="text-[10px] font-black tracking-widest uppercase">
                    GENUINE GEAR
                  </span>
                </div>
              </div>
              
              {/* Title */}
              <h3 className={`text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] ${isLight ? "text-zinc-950" : "text-white"}`}>
                JUUL <br className="hidden sm:block" />
                <span className={`${isLight ? "text-blue-500" : "text-blue-400"}`}>
                  Accessories
                </span>
              </h3>
              
              {/* Description */}
              <p className={`text-[13px] sm:text-[15px] font-medium leading-relaxed max-w-lg ${isLight ? "text-zinc-500" : "text-zinc-400"}`}>
                Power up and protect your device with authentic JUUL accessories. Engineered exclusively for seamless compatibility and peak performance. With gold-plated contacts and a precise fit, you are guaranteed consistent charging.
              </p>

              {/* Bullet Points */}
              <ul className="grid gap-3 pt-4">
                <li className="flex items-center gap-3 group">
                  <div className={`flex-shrink-0 w-5 h-5 rounded flex items-center justify-center ${
                    isLight ? "bg-blue-50 text-blue-500" : "bg-blue-500/20 text-blue-400"
                  }`}>
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span className={`text-[13px] sm:text-sm font-bold tracking-wide ${isLight ? "text-zinc-800" : "text-zinc-200"}`}>
                    100% Authentic Products
                  </span>
                </li>
                <li className="flex items-center gap-3 group">
                  <div className={`flex-shrink-0 w-5 h-5 rounded flex items-center justify-center ${
                    isLight ? "bg-blue-50 text-blue-500" : "bg-blue-500/20 text-blue-400"
                  }`}>
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span className={`text-[13px] sm:text-sm font-bold tracking-wide ${isLight ? "text-zinc-800" : "text-zinc-200"}`}>
                    Perfect Device Compatibility
                  </span>
                </li>
                <li className="flex items-center gap-3 group">
                  <div className={`flex-shrink-0 w-5 h-5 rounded flex items-center justify-center ${
                    isLight ? "bg-blue-50 text-blue-500" : "bg-blue-500/20 text-blue-400"
                  }`}>
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span className={`text-[13px] sm:text-sm font-bold tracking-wide ${isLight ? "text-zinc-800" : "text-zinc-200"}`}>
                    Premium Build Quality
                  </span>
                </li>
              </ul>
            </div>

            {/* Right Side: Single Product Display */}
            <div className="w-full flex justify-center lg:justify-end">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={`w-full max-w-[380px] group relative flex flex-col justify-between rounded-3xl p-6 border transition-all duration-300 hover:-translate-y-1 ${
                  isLight
                    ? "bg-white border-zinc-200 shadow-xl hover:shadow-2xl hover:border-zinc-300"
                    : "bg-[#0A0A0B] border-white/10 shadow-2xl hover:border-white/20"
                }`}
              >
                {/* Top Badges */}
                <div className="flex justify-between items-start absolute top-5 left-5 right-5 z-10">
                  {chargerProduct.inStock === false ? (
                    <span className="px-3 py-1.5 text-[10px] font-black uppercase tracking-wider bg-rose-600 text-white rounded-md shadow-sm">
                      STOCK OUT
                    </span>
                  ) : chargerProduct.discount ? (
                    <span className="px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-white rounded-md shadow-sm" style={{ backgroundColor: chargerProduct.imgColor || "#2563EB" }}>
                      -{chargerProduct.discount}% OFF
                    </span>
                  ) : (
                    <div />
                  )}
                  <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-black shadow-sm ${isLight ? "bg-white" : "bg-black/80"}`}>
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{chargerProduct.rating}</span>
                  </div>
                </div>

                {/* Image Box */}
                <div 
                  onClick={() => handleProductClick(chargerProduct)}
                  className={`w-full h-64 rounded-2xl relative overflow-hidden flex items-center justify-center cursor-pointer transition-colors mb-5 mt-4 ${
                    isLight ? "bg-zinc-50" : "bg-zinc-950 border border-white/5"
                  }`}
                >
                  {chargerProduct.image ? (
                    <Image
                      src={chargerProduct.image}
                      alt={chargerProduct.name}
                      fill
                      className={`object-contain p-8 transition-transform duration-500 group-hover:scale-110 ${chargerProduct.inStock === false ? "grayscale opacity-50" : ""}`}
                      sizes="(max-width: 640px) 100vw, 400px"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-zinc-800 flex items-center justify-center">
                      <ShoppingBag className="text-white w-10 h-10" />
                    </div>
                  )}
                </div>

                {/* Content info */}
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: chargerProduct.inStock === false ? "#6B7280" : chargerProduct.imgColor }}></span>
                    <span className={chargerProduct.inStock === false ? "text-rose-500" : ""}>
                      {chargerProduct.inStock === false ? "OUT OF STOCK" : chargerProduct.tag}
                    </span>
                  </div>

                  <h4 
                    onClick={() => handleProductClick(chargerProduct)}
                    className={`text-lg font-black transition-colors cursor-pointer hover:underline ${
                      isLight ? "text-zinc-900" : "text-white"
                    }`}
                  >
                    {chargerProduct.name}
                  </h4>
                  
                  <p className={`text-xs font-medium leading-relaxed ${isLight ? "text-zinc-500" : "text-zinc-400"}`}>
                    {chargerProduct.desc}
                  </p>
                </div>

                {/* Footer action */}
                <div className="mt-6 pt-5 border-t border-zinc-100 dark:border-white/5 space-y-4">
                  <div className="flex items-baseline gap-3">
                    <span className={`text-2xl font-black tracking-tight ${isLight ? "text-zinc-900" : "text-white"}`}>AED {chargerProduct.salePrice || chargerProduct.price}</span>
                    {chargerProduct.originalPrice && (
                      <span className="text-sm font-bold text-zinc-400 line-through">AED {chargerProduct.originalPrice}</span>
                    )}
                  </div>
                  
                  {chargerProduct.inStock === false ? (
                    <button
                      disabled
                      className={`w-full py-3.5 rounded-xl text-xs font-black uppercase tracking-widest border flex items-center justify-center gap-2 ${
                        isLight 
                          ? "bg-zinc-50 text-zinc-400 border-zinc-200" 
                          : "bg-transparent text-zinc-500 border-white/5"
                      }`}
                    >
                      <ShoppingBag className="w-4 h-4 opacity-50" /> OUT OF STOCK
                    </button>
                  ) : (
                    <button
                      onClick={() => onAddToCart(chargerProduct)}
                      className={`w-full py-3.5 rounded-xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer ${
                        isLight 
                          ? "bg-zinc-950 hover:bg-zinc-800 text-white shadow-lg hover:shadow-xl hover:shadow-zinc-900/20" 
                          : "bg-white hover:bg-zinc-200 text-black shadow-lg hover:shadow-xl hover:shadow-white/20"
                      }`}
                    >
                      <ShoppingBag className="w-4 h-4" /> ADD TO CART
                    </button>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
