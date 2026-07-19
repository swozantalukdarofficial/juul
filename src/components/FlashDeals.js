"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { ShoppingBag, Timer, Zap, Tag, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useApp } from "@/context/AppContext";

const DEALS = [
  {
    id: "juul2-device",
    name: "JUUL 2 Starter Bundle",
    desc: "Device + 2 Pod Packs of your choice",
    originalPrice: 89.99,
    salePrice: 64.99,
    discount: 28,
    badge: "🔥 Best Deal",
    accentColor: "#E11D48",
    image: "/deal-bundle.png",
    stock: null,
  },
  {
    id: "juul1-mint",
    name: "JUUL 1 Classic Triple Pack",
    desc: "Cool Mint + Virginia Tobacco + Menthol",
    originalPrice: 47.97,
    salePrice: 34.99,
    discount: 27,
    badge: "⚡ Flash Sale",
    accentColor: "#10B981",
    image: "/deal-triple.png",
    stock: null,
  },
  {
    id: "juul2-polar-mint",
    name: "JUUL 2 Polar Mint × 2 Packs",
    desc: "Double mint bundle at a special price",
    originalPrice: 31.98,
    salePrice: 24.99,
    discount: 22,
    badge: "🧊 Bundle Save",
    accentColor: "#06B6D4",
    image: "/deal-mint.png",
    stock: 5,
  },
  {
    id: "carry-case",
    name: "Tactical Leather Case",
    desc: "Premium leather carry case — fits JUUL 1 & 2",
    originalPrice: 29.99,
    salePrice: 19.99,
    discount: 33,
    badge: "🎁 Limited",
    accentColor: "#B45309",
    image: "/deal-case.png",
    stock: 4,
  },
];

function useCountdown() {
  const [time, setTime] = useState({ h: 11, m: 47, s: 23 });
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 23; m = 59; s = 59; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return time;
}

function TimeBlock({ value, label, isLight }) {
  const display = String(value).padStart(2, "0");
  return (
    <div className="flex flex-col items-center gap-1">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-black text-lg tabular-nums overflow-hidden relative ${
        isLight ? "bg-zinc-950 text-white" : "bg-white text-zinc-950"
      }`}>
        <AnimatePresence mode="wait">
          <motion.span
            key={display}
            initial={{ y: -12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 12, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {display}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className={`text-[8px] uppercase tracking-widest font-bold ${
        isLight ? "text-zinc-400" : "text-zinc-500"
      }`}>{label}</span>
    </div>
  );
}

function DealCard({ deal, isLight, onAddToCart, index, onProductClick }) {
  const [added, setAdded] = useState(false);
  const savings = (deal.originalPrice - deal.salePrice).toFixed(2);

  const handleProductClick = () => {
    if (onProductClick) {
      onProductClick({
        id: deal.id,
        name: deal.name,
        category: deal.id === "deal-4" ? "accessories" : "kits",
        price: deal.salePrice,
        originalPrice: deal.originalPrice,
        rating: 4.9,
        reviewsCount: 84,
        imgColor: deal.accentColor,
        image: deal.image,
        tag: deal.badge,
        desc: deal.desc
      });
    }
  };

  const handleAdd = (e) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart({
        id: deal.id,
        name: deal.name,
        price: deal.salePrice,
        image: deal.image,
        imgColor: deal.accentColor
      });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ delay: index * 0.09, duration: 0.45, ease: "easeOut" }}
      className={`group relative rounded-3xl border overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1.5 ${
        isLight
          ? "bg-white border-zinc-200/80 shadow-[0_2px_20px_rgba(0,0,0,0.05)] hover:border-red-500/40 hover:shadow-[0_10px_36px_rgba(239,68,68,0.04)]"
          : "bg-[#111112] border-white/[0.06] hover:border-red-500/30 hover:shadow-[0_10px_36px_rgba(239,68,68,0.06)]"
      }`}
    >
      {/* Discount pill */}
      <div
        className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full text-white text-[10px] font-black uppercase tracking-wider shadow-md bg-emerald-600"
      >
        -{deal.discount}% OFF
      </div>

      {/* Low stock warning */}
      {deal.stock && (
        <div className={`absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${
          isLight
            ? "bg-amber-50 text-amber-600 border border-amber-200"
            : "bg-amber-950/50 text-amber-400 border border-amber-800/30"
        }`}>
          Only {deal.stock} left!
        </div>
      )}

      {/* Product Image */}
      <Link
        href={`/product/${deal.id}`}
        className={`relative w-full h-48 overflow-hidden cursor-pointer block ${
          isLight ? "bg-zinc-50" : "bg-zinc-900/50"
        }`}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative w-full h-full"
        >
          <Image
            src={deal.image}
            alt={deal.name}
            fill
            className="object-contain p-5 drop-shadow-md"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </motion.div>
      </Link>

      {/* Content */}
      <div className="flex flex-col gap-3 p-5 flex-1 justify-between">
        <div className="space-y-1.5 text-left">
          {/* Badge */}
          <span className={`text-[9px] font-black uppercase tracking-widest`}>
            {deal.badge}
          </span>
          <Link
            href={`/product/${deal.id}`}
            className={`text-sm font-black leading-snug cursor-pointer hover:text-red-500 block ${isLight ? "text-zinc-950" : "text-white"}`}
          >
            {deal.name}
          </Link>
          <p className={`text-[11px] font-light leading-relaxed ${isLight ? "text-zinc-500" : "text-zinc-400"}`}>
            {deal.desc}
          </p>
        </div>

        {/* Pricing row */}
        <div className="space-y-3">
          <div className="flex items-end flex-wrap gap-x-2 gap-y-1">
            <span className={`text-2xl font-black ${isLight ? "text-black" : "text-white"}`}>
              AED {deal.salePrice}
            </span>
            <span className={`text-sm line-through mb-0.5 ${isLight ? "text-zinc-400" : "text-zinc-600"}`}>
              {deal.originalPrice}
            </span>
            <span className={`text-[10px] font-black mb-0.5 px-2 py-0.5 rounded-full ${
              isLight ? "bg-emerald-50 text-emerald-600" : "bg-emerald-950/50 text-emerald-400"
            }`}>
              Save AED {savings}
            </span>
          </div>

          {/* CTA Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleAdd}
            className={`w-full py-3 rounded-2xl flex items-center justify-center gap-2 text-[11px] font-black uppercase tracking-wider transition-all cursor-pointer border ${
              added
                ? "bg-emerald-500 border-emerald-500 text-white"
                : isLight
                ? "bg-zinc-950 border-zinc-950 text-white hover:bg-emerald-500 hover:border-emerald-500 shadow-md shadow-zinc-950/10"
                : "bg-white border-white text-zinc-950 hover:bg-emerald-500 hover:border-emerald-500 hover:text-white"
            }`}
          >
            {added ? (
              <><span>✓</span> Added!</>
            ) : (
              <><ShoppingBag className="w-3.5 h-3.5" /> Add to Cart</>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default function FlashDeals({ theme, onAddToCart, setSelectedProduct, setCurrentPage }) {
  const { products } = useApp();
  const { h, m, s } = useCountdown();
  const isLight = theme === "light";
  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  const specialOffers = products && products.length > 0 ? products.filter(p => p.tag === "Special Offer") : [];

  // Map static deals to live Shopify prices/details
  const activeDeals = specialOffers.length > 0
    ? specialOffers.map(matched => ({
        id: matched.id,
        name: matched.name,
        desc: matched.desc || "Limited time premium bundle offer.",
        salePrice: matched.price,
        originalPrice: matched.originalPrice || parseFloat((matched.price * 1.3).toFixed(2)),
        discount: matched.originalPrice ? Math.round(((matched.originalPrice - matched.price) / matched.originalPrice) * 100) : 25,
        badge: "🔥 Best Deal",
        accentColor: matched.imgColor || "#E11D48",
        image: matched.image,
        stock: 5
      }))
    : DEALS.map(deal => {
        const matched = products.find(p => p.id === deal.id || p.handle === deal.id);
        if (matched) {
          return {
            ...deal,
            name: matched.name,
            desc: matched.desc || deal.desc,
            salePrice: matched.price,
            originalPrice: matched.originalPrice || parseFloat((matched.price * 1.3).toFixed(2)),
            discount: matched.originalPrice ? Math.round(((matched.originalPrice - matched.price) / matched.originalPrice) * 100) : 25
          };
        }
        return deal;
      });

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
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
        scrollRef.current.scrollBy({ left: -320, behavior: 'smooth' });
      }
    }
  };

  const scrollRightNav = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      if (scrollLeft + clientWidth >= scrollWidth - 10) {
        scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
      }
    }
  };

  const handleProductClick = (prod) => {
    if (setSelectedProduct) {
      setSelectedProduct(prod);
    }
    if (setCurrentPage) {
      setCurrentPage("product");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const repeatedDeals = [...activeDeals, ...activeDeals, ...activeDeals, ...activeDeals];

  return (
    <section className={`py-20 transition-colors duration-500 relative overflow-hidden ${
      isLight ? "bg-white" : "bg-[#09090A]"
    }`}>
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* ── Header Row ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-red-500 flex items-center justify-center">
                <Zap className="w-3.5 h-3.5 text-white fill-white" />
              </div>
              <span className={`text-xs font-bold uppercase tracking-widest ${
                isLight ? "text-red-500" : "text-red-400"
              }`}>
                Limited Time Offers
              </span>
            </div>
            <h2 className={`text-3xl sm:text-5xl font-black tracking-tight ${
              isLight ? "text-zinc-950" : "text-white"
            }`}>
              Flash Deals <span>🔥</span>
            </h2>
            <p className={`text-sm font-light ${isLight ? "text-zinc-500" : "text-zinc-400"}`}>
              Exclusive discounts on premium JUUL bundles. Grab them before they're gone.
            </p>
          </div>

          {/* ── Countdown Timer ── */}
          <div className={`flex-shrink-0 px-5 py-4 rounded-3xl border flex flex-col items-center gap-3 ${
            isLight ? "bg-zinc-50 border-zinc-200" : "bg-white/[0.02] border-white/5"
          }`}>
            <div className="flex items-center gap-1.5">
              <Timer className="w-3.5 h-3.5 text-red-500 animate-pulse" />
              <span className={`text-[10px] font-black uppercase tracking-widest ${
                isLight ? "text-zinc-500" : "text-zinc-400"
              }`}>Ends In</span>
            </div>
            <div className="flex items-end gap-2">
              <TimeBlock value={h} label="Hrs" isLight={isLight} />
              <span className={`text-lg font-black mb-5 ${isLight ? "text-zinc-300" : "text-zinc-600"}`}>:</span>
              <TimeBlock value={m} label="Min" isLight={isLight} />
              <span className={`text-lg font-black mb-5 ${isLight ? "text-zinc-300" : "text-zinc-600"}`}>:</span>
              <TimeBlock value={s} label="Sec" isLight={isLight} />
            </div>
          </div>
        </div>
        {/* Auto Scrolling Deals Slider */}
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
            {repeatedDeals.map((deal, i) => (
              <div key={`${deal.id}-${i}`} className="w-[calc(100vw-48px)] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-center flex-shrink-0">
                <DealCard
                  deal={deal}
                  isLight={isLight}
                  onAddToCart={onAddToCart}
                  index={i}
                  onProductClick={handleProductClick}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-8 flex items-center justify-center gap-2">
          <Tag className={`w-3.5 h-3.5 ${isLight ? "text-zinc-400" : "text-zinc-500"}`} />
          <p className={`text-[11px] font-medium ${isLight ? "text-zinc-400" : "text-zinc-500"}`}>
            Prices in AED · Discounts applied at checkout · While stocks last
          </p>
        </div>
      </div>
    </section>
  );
}
