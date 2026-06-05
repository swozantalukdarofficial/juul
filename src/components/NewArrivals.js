"use client";

import { motion } from "framer-motion";
import { ShoppingCart, Star, Eye, ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function NewArrivals({ onAddToCart, setCurrentPage, setSelectedProduct, theme }) {
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
    }, 1300);
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

  const newProducts = [
    {
      id: "carbon-kit",
      name: "JUUL Device Kit - Carbon Black",
      category: "kits",
      price: 34.99,
      originalPrice: 44.99,
      salePrice: 34.99,
      discount: 22,
      rating: 5.0,
      reviewsCount: 88,
      imgColor: "#111827",
      flavor: "classic",
      tag: "Premium",
      desc: "Super sleek matte carbon finish designed for pure style.",
      image: "/deal-bundle.png"
    },
    {
      id: "berry-pods",
      name: "JUUL Pod Pack - Alpine Berry",
      category: "pods",
      price: 16.99,
      originalPrice: 20.99,
      salePrice: 16.99,
      discount: 19,
      rating: 4.7,
      reviewsCount: 95,
      imgColor: "#EC4899",
      flavor: "berry",
      tag: "New Drop",
      desc: "Pack of 4 pre-filled pods with cool wild berries flavor.",
      image: "/deal-triple.png"
    },
    {
      id: "usb-dock",
      name: "Magnetic USB Charging Dock",
      category: "accessories",
      price: 9.99,
      originalPrice: 14.99,
      salePrice: 9.99,
      discount: 33,
      rating: 4.6,
      reviewsCount: 64,
      imgColor: "#374151",
      flavor: "classic",
      tag: "Original",
      desc: "Compact wireless USB dock to charge your JUUL anywhere.",
      image: "/deal-case.png"
    }
  ];

  const handleProductClick = (prod) => {
    setSelectedProduct(prod);
  };

  const repeatedProducts = [...newProducts, ...newProducts, ...newProducts, ...newProducts];

  return (
    <section className={`py-24 border-b transition-colors duration-500 ${
      isLight ? "bg-white" : "bg-[#09090A]"
    }`}>
      <div className="max-w-7xl mx-auto px-6 text-left">
        {/* Section Header */}
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div className="space-y-3">
            <span className={`text-xs font-bold uppercase tracking-widest ${
              isLight ? "text-zinc-400" : "text-zinc-500"
            }`}>
              Featured Collection
            </span>
            <h2 className={`text-3xl sm:text-5xl font-black tracking-tight ${
              isLight ? "text-zinc-950" : "text-white"
            }`}>
              New Arrivals Dubai
            </h2>
          </div>
        </motion.div>

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
            {repeatedProducts.map((prod, i) => {
              const savings = prod.originalPrice ? (prod.originalPrice - prod.salePrice).toFixed(2) : null;
              
              return (
                <motion.div
                  key={`${prod.id}-${i}`}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.15, duration: 0.6, ease: "easeOut" }}
                  className={`group relative rounded-3xl border overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1.5 snap-center flex-shrink-0 w-[85vw] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] ${
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
                  <div 
                    onClick={() => handleProductClick(prod)}
                    className={`relative w-full h-48 overflow-hidden cursor-pointer ${
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
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-3 p-5 flex-1 justify-between">
                    <div className="space-y-1.5 text-left">
                      {/* Badge */}
                      <span className={`text-[9px] font-black uppercase tracking-widest`} style={{ color: prod.imgColor }}>
                        🔥 {prod.tag}
                      </span>
                      <h3 
                        onClick={() => handleProductClick(prod)}
                        className={`text-sm sm:text-base font-black leading-snug cursor-pointer hover:underline ${isLight ? "text-zinc-950" : "text-white"}`}
                      >
                        {prod.name}
                      </h3>
                      <p className={`text-[11px] font-light leading-relaxed line-clamp-2 ${isLight ? "text-zinc-500" : "text-zinc-400"}`}>
                        {prod.desc}
                      </p>
                    </div>

                    {/* Pricing row */}
                    <div className="space-y-3 text-left">
                      <div className="flex items-end flex-wrap gap-x-2 gap-y-1">
                        <span className="text-2xl font-black" style={{ color: prod.imgColor }}>
                          AED {prod.salePrice || prod.price}
                        </span>
                        {prod.originalPrice && (
                          <span className={`text-sm line-through mb-0.5 ${isLight ? "text-zinc-400" : "text-zinc-600"}`}>
                            {prod.originalPrice}
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
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
