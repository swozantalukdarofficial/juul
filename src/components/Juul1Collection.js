"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Star, Filter, Heart, Eye, BookOpen, Award, Droplet, Layers, Shield, Search, Smartphone, Info, AlertCircle, ThumbsUp, CheckCircle, Zap, ChevronLeft, ChevronRight } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { allProducts as defaultProducts } from "@/data/products";
import Image from "next/image";
import FAQ from "./FAQ";

export default function Juul1Collection({ onAddToCart, setCurrentPage, setSelectedProduct, theme, activeCategory = "all", setActiveCategory, versionFilter = "all", setVersionFilter }) {
  const { products: contextProducts } = useApp();
  const [activeSlide, setActiveSlide] = useState("old");
  const flavorScrollRef = useRef(null);

  const scrollFlavorLeft = () => {
    if (flavorScrollRef.current) {
      flavorScrollRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollFlavorRight = () => {
    if (flavorScrollRef.current) {
      flavorScrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  const categories = [
    { id: "all", label: "All Products" },
    { id: "kits", label: "Starter Kits" },
    { id: "pods", label: "JUUL Pods" },
    { id: "accessories", label: "Accessories" },
    { id: "new-arrivals", label: "New JUUL Arrivals" }
  ];

  const products = (contextProducts && contextProducts.length > 0 ? contextProducts : defaultProducts).filter(p => p.version === "juul1");
  const dummyProducts = [
    {
      id: "juul1-slate",
      name: "JUUL 1 Device Kit - Slate Grey",
      category: "kits",
      version: "juul1",
      price: 24.99,
      rating: 4.8,
      reviewsCount: 142,
      imgColor: "#4B5563",
      flavor: "classic",
      tag: "Original Classic",
      desc: "The JUUL 1 Kit , Where premium design meets effortless performance"
    },
    {
      id: "juul1-silver",
      name: "JUUL 1 Device Kit - Silver",
      category: "kits",
      version: "juul1",
      price: 24.99,
      rating: 4.9,
      reviewsCount: 89,
      imgColor: "#9CA3AF",
      flavor: "classic",
      tag: "Limited Edition",
      desc: "Sleek silver finish with the classic JUUL 1 performance."
    },
    {
      id: "juul1-mint",
      name: "JUUL 1 Pod Pack - Cool Mint",
      category: "pods",
      version: "juul1",
      price: 15.99,
      rating: 4.9,
      reviewsCount: 310,
      imgColor: "#10B981",
      flavor: "mint",
      tag: "Signature Blend",
      desc: "Pack of 4 pre-filled pods containing crisp peppermint frost."
    },
    {
      id: "juul1-mango",
      name: "Mango JUUL 1 Pods",
      category: "pods",
      version: "juul1",
      price: 16.99,
      rating: 4.9,
      reviewsCount: 420,
      imgColor: "#F59E0B",
      flavor: "mango",
      tag: "Fan Favorite",
      desc: "Pack of 4 pre-filled pods with the legendary rich mango flavor."
    },
    {
      id: "juul1-tobacco",
      name: "Virginia Tobacco JUUL 1 Pods",
      category: "pods",
      version: "juul1",
      price: 15.99,
      rating: 4.8,
      reviewsCount: 188,
      imgColor: "#78716C",
      flavor: "classic",
      tag: "Rich Taste",
      desc: "Pack of 4 pre-filled pods with classic robust American tobacco."
    },
    {
      id: "juul1-menthol",
      name: "Classic Menthol JUUL 1 Pods",
      category: "pods",
      version: "juul1",
      price: 15.99,
      rating: 4.7,
      reviewsCount: 95,
      imgColor: "#06B6D4",
      flavor: "menthol",
      tag: "Traditional Ice",
      desc: "Pack of 4 pre-filled pods with crisp icy traditional menthol."
    },
    {
      id: "juul1-fruit",
      name: "Fruit Medley JUUL 1 Pods",
      category: "pods",
      version: "juul1",
      price: 15.99,
      rating: 4.6,
      reviewsCount: 135,
      imgColor: "#EF4444",
      flavor: "berry",
      tag: "Sweet Blend",
      desc: "Pack of 4 pre-filled pods featuring a mix of peaches, grapes, and berries."
    },
    {
      id: "usb-dock",
      name: "Magnetic USB Charging Dock",
      category: "accessories",
      version: "juul1",
      price: 9.99,
      rating: 4.6,
      reviewsCount: 64,
      imgColor: "#374151",
      flavor: "classic",
      tag: "Original Accessories",
      desc: "Compact wireless USB dock to charge your JUUL 1 anywhere."
    },
    {
      id: "juul1-blush-gold",
      name: "JUUL 1 Device Kit - Blush Gold",
      category: "new-arrivals",
      version: "juul1",
      price: 29.99,
      rating: 5.0,
      reviewsCount: 15,
      imgColor: "#F6E5D1",
      flavor: "classic",
      tag: "New Arrival",
      desc: "Brand new elegant blush gold finish with standard USB magnetic charging."
    }
  ];

  const isLight = theme === "light";

  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === "all" || p.category === activeCategory;
    return matchesCategory;
  });

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`pt-32 pb-20 min-h-screen text-left transition-colors duration-500 ${isLight ? "bg-zinc-50 text-zinc-900" : "bg-[#09090A] text-white"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-end relative z-10">
          <div className="text-center md:text-left">
            <span className={`text-xs font-bold uppercase tracking-widest ${isLight ? "text-blue-600" : "text-emerald-400"
              }`}>
              The Original Classic
            </span>
            <h1 className={`text-3xl sm:text-5xl font-extrabold tracking-tight mt-2 ${isLight ? "text-zinc-950" : "text-white"
              }`}>
              JUUL 1 Collections
            </h1>
          </div>

          {/* Decorative Floating JUUL 2 Device */}
          <div className="hidden md:flex justify-end items-end w-48 mr-32 -mb-6">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="relative pointer-events-none"
            >
              <div className="rotate-[20deg] scale-90 relative origin-bottom">
                {/* 100% Authentic Sticker Badge */}
                <motion.div
                  initial={{ scale: 0, rotate: -60 }}
                  animate={{ scale: 1, rotate: -15 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
                  className="absolute -top-6 -right-12 z-30 w-16 h-16 bg-gradient-to-br from-yellow-300 to-amber-500 rounded-full flex flex-col items-center justify-center border-2 border-white/80 shadow-[0_10px_20px_rgba(245,158,11,0.5)] text-zinc-950 font-black leading-none"
                >
                  <span className="text-lg tracking-tighter">100%</span>
                  <span className="text-[6px] uppercase tracking-widest mt-0.5 opacity-90">Authentic</span>
                </motion.div>

                {/* JUUL 1 Device CSS Model */}
                <div className="relative w-12 h-40 rounded bg-[#333] shadow-2xl border border-white/10 flex flex-col items-center">
                  {/* Pod with V-shape bottom */}
                  <div className="absolute -top-6 w-12 h-10 bg-zinc-900 border-x border-t border-zinc-700 flex flex-col overflow-hidden items-center">
                    <div className="w-full h-8 bg-gradient-to-b from-amber-500/20 to-transparent" />
                    <div className="w-0 h-0 border-l-[24px] border-l-transparent border-r-[24px] border-r-transparent border-t-[8px] border-t-zinc-900" />
                  </div>

                  {/* Body Details - Single LED Light */}
                  <div className="absolute top-10 w-full flex justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,1)]" />
                  </div>

                  {/* Logo */}
                  <div className="absolute bottom-6 font-black text-[8px] text-zinc-500 tracking-widest uppercase">JUUL</div>
                </div>

                {/* Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-emerald-500/20 blur-2xl -z-10 rounded-full" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Single Simplified Filter Row */}
        <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-8 border-b ${isLight ? "border-zinc-200" : "border-white/10"
          }`}>
          {/* Categories Tab selector */}
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`whitespace-nowrap text-xs uppercase tracking-widest font-bold px-6 py-3 rounded-full border transition-all duration-300 cursor-pointer ${activeCategory === cat.id
                    ? isLight
                      ? "bg-zinc-950 text-white border-zinc-950 shadow-md"
                      : "bg-white text-black border-white shadow-lg shadow-white/10"
                    : isLight
                      ? "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900 shadow-sm"
                      : "bg-zinc-900/50 text-zinc-400 border-white/5 hover:border-white/20 hover:bg-white/5 hover:text-white"
                  }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <p className={`whitespace-nowrap text-xs font-bold uppercase tracking-widest px-2 ${isLight ? "text-zinc-400" : "text-zinc-500"
            }`}>
            {filteredProducts.length} items
          </p>
        </div>

        {/* Product Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map(prod => (
              <motion.div
                key={prod.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className={`group relative flex flex-col justify-between rounded-3xl p-5 border transition-all duration-300 ${isLight
                    ? "bg-white border-zinc-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:border-red-500/40 hover:shadow-[0_20px_40px_rgba(239,68,68,0.04)]"
                    : "bg-white/[0.01] border-white/5 hover:border-red-500/30 hover:shadow-[0_20px_40px_rgba(239,68,68,0.06)] p-5 hover:bg-white/[0.02]"
                  }`}
              >
                {/* Image Showcase Box */}
                <div
                  onClick={() => handleProductClick(prod)}
                  className={`w-full h-56 rounded-2xl border relative overflow-hidden flex items-center justify-center cursor-pointer transition-colors ${isLight ? "bg-zinc-50 border-zinc-100" : "bg-zinc-950 border-white/5"
                    }`}
                >
                  {/* Floating Tag */}
                  {prod.tag && (
                    <span className={`absolute top-3 left-3 border backdrop-blur-md text-[9px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full ${isLight
                        ? "bg-zinc-900/10 border-zinc-900/5 text-zinc-800"
                        : "bg-white/10 border-white/20 text-white"
                      }`}>
                      {prod.tag}
                    </span>
                  )}
                  <button className={`absolute top-3 right-3 p-1.5 rounded-full border transition-all ${isLight
                      ? "bg-white hover:bg-zinc-100 border-zinc-200 text-zinc-400 hover:text-zinc-700"
                      : "bg-white/5 hover:bg-white/10 border-white/5 text-zinc-400 hover:text-white"
                    }`}>
                    <Heart className="w-3.5 h-3.5" />
                  </button>

                  {prod.image && !prod.image.includes("/cat-") && !prod.image.includes("placeholder") ? (
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-contain p-4 transition-transform duration-300"
                    />
                  ) : (
                    /* Aesthetic device mock representation */
                    <motion.div
                      whileHover={{ scale: 1.08, rotate: -5 }}
                      transition={{ duration: 0.3 }}
                      className={`w-10 h-36 rounded-md border flex flex-col items-center justify-between p-1 transition-all duration-500 shadow-xl ${isLight ? "border-zinc-200/50" : "border-white/10"
                        }`}
                      style={{
                        backgroundColor: "#18181A",
                        boxShadow: isLight ? `0 10px 30px rgba(0,0,0,0.05)` : `0 0 30px rgba(0,0,0,0.4)`
                      }}
                    >
                      <div
                        className="w-full h-10 rounded-sm border-b border-black/40 flex flex-col justify-end p-0.5"
                        style={{ backgroundColor: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.1)" }}
                      >
                        <div className="w-full h-3 bg-black/60 rounded-sm" />
                      </div>
                      {prod.version === "juul2" ? (
                        <div className="flex flex-col gap-0.5 justify-center items-center">
                          {[...Array(4)].map((_, i) => (
                            <div
                              key={i}
                              className="w-1.5 h-1.5 rounded-full shadow-lg"
                              style={{
                                backgroundColor: i === 0 ? "#10B981" : "rgba(255,255,255,0.2)",
                                boxShadow: i === 0 ? `0 0 5px #10B981` : "none"
                              }}
                            />
                          ))}
                        </div>
                      ) : (
                        <div
                          className="w-2.5 h-2.5 rounded-full shadow-lg"
                          style={{
                            backgroundColor: "#10B981",
                            boxShadow: `0 0 5px #10B981`
                          }}
                        />
                      )}
                      <div className="w-full h-1 bg-zinc-800 rounded-full" />
                    </motion.div>
                  )}

                  {/* Quick-view overlay */}
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                    <button
                      onClick={() => handleProductClick(prod)}
                      className="p-3 rounded-full bg-white text-black transition-colors shadow-lg cursor-pointer hover:bg-red-500 hover:text-white"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onAddToCart(prod)}
                      className="p-3 rounded-full bg-white text-black transition-colors shadow-lg cursor-pointer hover:bg-red-500 hover:text-white"
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="mt-5 space-y-2 text-left">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-400">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span className={`text-xs font-bold ${isLight ? "text-zinc-800" : "text-white"}`}>{prod.rating}</span>
                      <span className="text-[10px] text-zinc-500 font-semibold">({prod.reviewsCount})</span>
                    </div>
                    <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">
                      {prod.category}
                    </span>
                  </div>

                  <h3
                    onClick={() => handleProductClick(prod)}
                    className={`text-base font-bold transition-colors cursor-pointer line-clamp-1 ${isLight
                        ? "text-zinc-900 hover:text-red-500"
                        : "text-white hover:text-red-500"
                      }`}
                  >
                    {prod.name}
                  </h3>
                  <p className={`text-[11px] sm:text-xs font-light leading-relaxed line-clamp-2 ${isLight ? "text-zinc-500" : "text-zinc-400"
                    }`}>
                    {prod.desc}
                  </p>
                </div>

                {/* Footer Purchase Actions */}
                <div className={`flex items-center justify-between pt-4 mt-4 border-t ${isLight ? "border-zinc-100" : "border-white/5"
                  }`}>
                  <div className="flex flex-col text-left">
                    <div className="flex items-baseline gap-2">
                      <span className={`text-lg font-black ${isLight ? "text-black" : "text-white"}`}>AED {parseFloat(prod.price).toFixed(2)}</span>
                      {prod.originalPrice && prod.originalPrice > prod.price && (
                        <span className="text-xs line-through text-zinc-500 font-semibold">
                          AED {parseFloat(prod.originalPrice).toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => onAddToCart(prod)}
                    className={`flex items-center gap-1.5 font-bold text-[10px] uppercase tracking-wider px-4 py-2 rounded-full transition-all duration-300 cursor-pointer ${isLight
                        ? "bg-zinc-950 hover:bg-red-600 text-white shadow-md shadow-zinc-950/10"
                        : "bg-white/5 hover:bg-red-500 text-white hover:text-white border border-white/10 hover:border-transparent"
                      }`}
                  >
                    <ShoppingCart className="w-3.5 h-3.5" /> Buy
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ==================================================================================== */}
        {/* ============================ 7 ADDED SEO / INFO SECTIONS ============================ */}
        {/* ==================================================================================== */}

        <div className="mt-16 space-y-16">

          {/* SECTION 1: Collection Guide */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <div className={`p-8 md:p-12 rounded-[2.5rem] border ${isLight ? "bg-white border-zinc-200" : "bg-zinc-900/40 border-white/10"}`}>
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="w-8 h-8 text-red-500" />
                <h2 className="text-3xl font-black">1. Collection Guide</h2>
              </div>
              <div className={`space-y-6 text-lg leading-relaxed ${isLight ? "text-zinc-600" : "text-zinc-400"}`}>
                <p>
                  Welcome to our premium collection of vapes, pods, and starter kits. Navigating the world of vaping can be overwhelming, but we’ve structured our catalog to make your shopping experience seamless. Whether you're a beginner looking for a simple <strong className={isLight ? "text-zinc-900" : "text-white"}>Classic kit</strong> or an experienced user upgrading to the <strong className={isLight ? "text-zinc-900" : "text-white"}>Original Series</strong>, our collection guide ensures you find exactly what you need.
                </p>
                <p>
                  At VapePod UAE, we source only <strong className={isLight ? "text-zinc-900" : "text-white"}>100% genuine products</strong> directly from authorized manufacturers. Our hand-picked selection guarantees optimal vapor consistency, unmatched flavor profiles, and top-tier battery safety. Each product in our catalog undergoes strict quality checks before making it to our shelves.
                </p>
                <p>
                  Use our intuitive filters above to narrow down your search by device generation, flavor profiles (ranging from Classic Menthol to Tropical Mango), and essential accessories like fast-charging magnetic docks or tactical carrying cases. If you're unsure where to start, check out our best-sellers or use the Side-by-Side Comparison tool below to find the perfect match for your lifestyle.
                </p>
              </div>
            </div>
          </motion.section>

          {/* SECTION 2: What We Offer */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <div className={`p-8 md:p-12 rounded-[2.5rem] border ${isLight ? "bg-white border-zinc-200" : "bg-[#09090A] border-white/10 shadow-xl"}`}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <Award className="w-8 h-8 text-red-500" />
                    <h2 className="text-3xl font-black">2. What We Offer</h2>
                  </div>
                  <ul className="space-y-4">
                    {[
                      "Authentic Starter Kits designed for ease of use.",
                      "Pre-filled Replacement Pods in multiple nicotine strengths.",
                      "Advanced JUUL 2 Devices with smart LED indicators.",
                      "Premium accessories like carrying cases and magnetic chargers."
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-emerald-500 shrink-0" />
                        <span className={`text-lg ${isLight ? "text-zinc-700" : "text-zinc-300"}`}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`p-8 rounded-[2rem] border text-center ${isLight ? "bg-zinc-50 border-zinc-200" : "bg-zinc-800/50 border-white/10"}`}>
                  <Zap className="w-16 h-16 text-red-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Unmatched Variety</h3>
                  <p className={`${isLight ? "text-zinc-600" : "text-zinc-400"}`}>
                    We curate only the highest-rated devices and flavors verified by thousands of daily users across the UAE.
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* SECTION 3: Choosing the Right Flavor (Premium Flavor Cards) */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <div className={`p-8 md:p-12 rounded-[2.5rem] border ${isLight ? "bg-zinc-50 border-zinc-200" : "bg-zinc-900/40 border-white/10"}`}>
              <div className="flex items-center justify-center gap-3 mb-10">
                <Droplet className="w-8 h-8 text-red-500" />
                <h2 className="text-3xl md:text-5xl font-black text-center tracking-tight">3. Signature Flavors</h2>
              </div>

              <div className="relative w-full overflow-hidden py-4 group/slider">
                <button
                  onClick={scrollFlavorLeft}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-xl border border-zinc-200 dark:border-white/10 opacity-0 group-hover/slider:opacity-100 transition-opacity cursor-pointer hidden sm:flex"
                >
                  <ChevronLeft className="w-5 h-5 text-zinc-900 dark:text-white" />
                </button>
                <button
                  onClick={scrollFlavorRight}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-xl border border-zinc-200 dark:border-white/10 opacity-0 group-hover/slider:opacity-100 transition-opacity cursor-pointer hidden sm:flex"
                >
                  <ChevronRight className="w-5 h-5 text-zinc-900 dark:text-white" />
                </button>

                <div ref={flavorScrollRef} className="flex gap-6 w-full overflow-x-auto snap-x snap-mandatory pb-8 px-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                  {[
                    {
                      id: 1,
                      title: "Ruby Sunset",
                      subtitle: "Crisp Red Apple",
                      desc: "Experience a refreshing burst of crisp, sweet red apples. This flavor perfectly balances a juicy fruitiness with a smooth, satisfying vapor draw on every puff.",
                      color: "#EF4444", // Red
                      price: "$17.99"
                    },
                    {
                      id: 2,
                      title: "Summer Gold",
                      subtitle: "Tropical Mango",
                      desc: "A vibrant and juicy tropical mango sweetness that transports you to summer. Enjoy a rich, full-bodied exotic taste with a clean and mellow finish.",
                      color: "#F59E0B", // Amber/Gold
                      price: "$17.99"
                    },
                    {
                      id: 3,
                      title: "Polar Mint",
                      subtitle: "Spearmint Ice",
                      desc: "An incredibly icy, cooling spearmint flavor designed for maximum freshness. It delivers a frosty throat hit leaving your senses invigorated all day.",
                      color: "#10B981", // Emerald/Mint
                      price: "$17.99"
                    },
                    {
                      id: 4,
                      title: "Blackcurrant",
                      subtitle: "Rich Wild Berry",
                      desc: "Indulge in deep, rich wild berry notes combined with a dark, sweet undertone. This robust flavor provides a uniquely smooth and lingering berry aftertaste.",
                      color: "#EC4899", // Pink/Berry
                      price: "$18.99"
                    },
                    {
                      id: 5,
                      title: "Crisp Menthol",
                      subtitle: "Ice Punch",
                      desc: "Delivering an extra punch of clean arctic menthol. A robust freezing sensation that clears the senses with every draw.",
                      color: "#06B6D4", // Cyan
                      price: "$17.99"
                    },
                    {
                      id: 6,
                      title: "Virginia Tobacco",
                      subtitle: "Classic Bold",
                      desc: "Full-bodied toasted tobacco leaves flavor. Perfect for those seeking the familiar, rich taste of traditional smoking.",
                      color: "#78716C", // Warm Grey
                      price: "$17.99"
                    }
                  ].map((flavor, i) => (
                    <div key={i} className={`w-[calc(100vw-64px)] sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] snap-center flex-shrink-0 p-6 rounded-[2rem] border flex flex-col items-center text-center transition-all hover:-translate-y-2 ${isLight ? "bg-white border-zinc-200 shadow-xl shadow-zinc-200/50" : "bg-white/[0.02] border-white/10 shadow-xl shadow-black/50"
                      }`}>
                      <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-8">2 Pods Per Pack</p>

                      {/* CSS Pod Mockup */}
                      <div className="w-16 h-36 relative mb-8">
                        {/* Mouthpiece */}
                        <div className="absolute top-0 w-full h-10 bg-[#1A1A1A] rounded-t-xl z-20" />
                        {/* Colored Band */}
                        <div className="absolute top-10 w-full h-2 z-20" style={{ backgroundColor: flavor.color }} />
                        {/* Transparent Body */}
                        <div className={`absolute top-12 w-full h-20 rounded-b-sm border-x border-b overflow-hidden relative ${isLight ? "bg-zinc-100 border-zinc-300" : "bg-zinc-800/50 border-zinc-700"}`}>
                          {/* Fake liquid level & bubbles */}
                          <div className="absolute bottom-0 w-full h-[85%] bg-zinc-400/20" />
                          <div className="absolute bottom-3 left-3 w-1.5 h-1.5 rounded-full bg-white/40" />
                          <div className="absolute top-4 right-2 w-1 h-1 rounded-full bg-white/30" />
                          <div className="absolute bottom-6 left-5 w-2 h-2 rounded-full bg-white/30" />
                          {/* Internal metal chimney */}
                          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-2 bg-zinc-500/30" />
                        </div>
                        {/* Gold Contacts */}
                        <div className="absolute bottom-0 w-full flex justify-between px-2 pt-1">
                          <div className="w-3 h-2 bg-yellow-500 rounded-b-sm" />
                          <div className="w-3 h-2 bg-yellow-500 rounded-b-sm" />
                        </div>
                      </div>

                      <h3 className="text-xl font-black mb-1">{flavor.title}</h3>
                      <p className={`text-sm font-semibold mb-4 ${isLight ? "text-blue-600" : "text-blue-400"}`}>{flavor.subtitle}</p>

                      <p className={`text-[11px] leading-relaxed italic mb-6 flex-1 ${isLight ? "text-zinc-500" : "text-zinc-400"}`}>
                        "{flavor.desc}"
                      </p>

                      <div className="w-full pt-4 border-t border-zinc-200 dark:border-white/10">
                        <p className={`text-[10px] font-bold mb-2 uppercase ${isLight ? "text-zinc-400" : "text-zinc-500"}`}>Strength: 18 mg/ml</p>
                        <p className="text-2xl font-black">{flavor.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>

          {/* SECTION 4: Side-by-Side Comparison */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <div className={`p-8 md:p-12 rounded-[2.5rem] border ${isLight ? "bg-white border-zinc-200" : "bg-zinc-900/40 border-white/10"}`}>
              <div className="flex items-center gap-3 mb-8">
                <Layers className="w-8 h-8 text-red-500" />
                <h2 className="text-3xl font-black">4. Side-by-Side Comparison</h2>
              </div>
              <div className={`overflow-x-auto rounded-[2rem] border ${isLight ? "border-zinc-200 bg-white" : "border-white/10 bg-zinc-900/30"}`}>
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className={`border-b ${isLight ? "border-zinc-200 bg-zinc-50" : "border-white/10 bg-white/5"}`}>
                      <th className="p-6 font-bold">Feature</th>
                      <th className="p-6 font-bold">JUUL 1 Classic</th>
                      <th className="p-6 font-bold">Original Series</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { feature: "Battery Capacity", j1: "Standard (200mAh)", j2: "Enhanced (250mAh+)" },
                      { feature: "Draw Consistency", j1: "Good", j2: "Excellent (Smart Draw)" },
                      { feature: "Indicator", j1: "Single LED", j2: "Dynamic Smart LED Array" },
                      { feature: "Pod Capacity", j1: "0.7ml", j2: "1.2ml (70% more)" }
                    ].map((row, i) => (
                      <tr key={i} className={`border-b last:border-0 ${isLight ? "border-zinc-100" : "border-white/5"}`}>
                        <td className={`p-6 font-semibold ${isLight ? "text-zinc-900" : "text-white"}`}>{row.feature}</td>
                        <td className={`p-6 ${isLight ? "text-zinc-600" : "text-zinc-400"}`}>{row.j1}</td>
                        <td className={`p-6 ${isLight ? "text-zinc-600" : "text-zinc-400"}`}>{row.j2}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.section>

          {/* SECTION: Old vs New Packaging Comparison */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <div className={`p-8 md:p-12 rounded-[2.5rem] border ${
              isLight ? "bg-white border-zinc-200" : "bg-zinc-900/40 border-white/10"
            }`}>
              <div className="flex flex-col lg:flex-row gap-12 items-center">
                {/* Text & Specs Content */}
                <div className="w-full lg:w-1/2 space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-500">
                      <Layers className="w-8 h-8" />
                    </div>
                    <h2 className="text-3xl font-black">JUUL 1 Packaging: Old vs New</h2>
                  </div>
                  <p className={`text-lg leading-relaxed ${isLight ? "text-zinc-600" : "text-zinc-400"}`}>
                    To combat counterfeit products in the UAE market, JUUL has overhauled its product packaging. 
                    নিচের slider বা button ব্যবহার করে old এবং new packaging-এর মূল পার্থক্য দেখে নিন।
                  </p>

                  {/* Navigation Tabs */}
                  <div className="flex gap-2 p-1.5 bg-zinc-100 dark:bg-zinc-800/40 rounded-2xl w-fit">
                    <button
                      onClick={() => setActiveSlide("old")}
                      className={`px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider font-black transition-all cursor-pointer ${
                        activeSlide === "old"
                          ? "bg-red-500 text-white shadow-lg shadow-red-500/20"
                          : "text-zinc-500 hover:text-zinc-800 dark:hover:text-white"
                      }`}
                    >
                      Old Packaging
                    </button>
                    <button
                      onClick={() => setActiveSlide("new")}
                      className={`px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider font-black transition-all cursor-pointer ${
                        activeSlide === "new"
                          ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                          : "text-zinc-500 hover:text-zinc-800 dark:hover:text-white"
                      }`}
                    >
                      New Packaging
                    </button>
                  </div>

                  {/* Details Cards Container */}
                  <div className="relative overflow-hidden min-h-[260px]">
                    <AnimatePresence mode="wait">
                      {activeSlide === "old" ? (
                        <motion.div
                          key="old-details"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ duration: 0.3 }}
                          className={`p-6 rounded-3xl border transition-all duration-300 ${
                            isLight 
                              ? "bg-red-50/30 border-red-200/60 shadow-[0_10px_30px_rgba(239,68,68,0.05)]" 
                              : "bg-red-950/5 border-red-500/10 shadow-[0_10px_30px_rgba(239,68,68,0.02)]"
                          }`}
                        >
                          <h4 className="text-xl font-bold text-red-500 mb-4 flex items-center gap-2">
                            <AlertCircle className="w-5.5 h-5.5" /> Old Packaging Specifications
                          </h4>
                          <ul className="space-y-3 text-base leading-relaxed">
                            <li className="flex items-start gap-2.5 text-zinc-500 dark:text-zinc-400">
                              <span className="text-red-500 shrink-0 text-lg">•</span>
                              <span><strong>Cardboard Sleeve:</strong> Plain white matte paper sleeves. Subject to easy wear, tearing, and fading.</span>
                            </li>
                            <li className="flex items-start gap-2.5 text-zinc-500 dark:text-zinc-400">
                              <span className="text-red-500 shrink-0 text-lg">•</span>
                              <span><strong>Branding & Font:</strong> Basic minimalist typography without distinct generation indicators (doesn't explicitly say "JUUL 1").</span>
                            </li>
                            <li className="flex items-start gap-2.5 text-zinc-500 dark:text-zinc-400">
                              <span className="text-red-500 shrink-0 text-lg">•</span>
                              <span><strong>Security Tracking:</strong> Lacks 3D holographic authentication QR stickers on the top closure flap. High risk of counterfeit clones.</span>
                            </li>
                          </ul>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="new-details"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                          className={`p-6 rounded-3xl border transition-all duration-300 ${
                            isLight 
                              ? "bg-emerald-50/30 border-emerald-200/60 shadow-[0_10px_30px_rgba(16,185,129,0.05)]" 
                              : "bg-emerald-950/5 border-emerald-500/10 shadow-[0_10px_30px_rgba(16,185,129,0.02)]"
                          }`}
                        >
                          <h4 className="text-xl font-bold text-emerald-500 mb-4 flex items-center gap-2">
                            <CheckCircle className="w-5.5 h-5.5" /> New Packaging Specifications
                          </h4>
                          <ul className="space-y-3 text-base leading-relaxed">
                            <li className="flex items-start gap-2.5 text-zinc-700 dark:text-zinc-300 font-medium">
                              <span className="text-emerald-500 shrink-0 text-lg">•</span>
                              <span><strong>Premium Textured Box:</strong> Robust, thick dark/black cardboard box with structural protection.</span>
                            </li>
                            <li className="flex items-start gap-2.5 text-zinc-700 dark:text-zinc-300 font-medium">
                              <span className="text-emerald-500 shrink-0 text-lg">•</span>
                              <span><strong>Generation Badges:</strong> Bold typography clearly stating "JUUL 1 Device Kit" or "JUUL 1 Pods" for product identification.</span>
                            </li>
                            <li className="flex items-start gap-2.5 text-zinc-700 dark:text-zinc-300 font-medium">
                              <span className="text-emerald-500 shrink-0 text-lg">•</span>
                              <span><strong>Hologram Verification:</strong> Features a high-security holographic QR seal on the top flap. Scan to instantly check authenticity.</span>
                            </li>
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Slider Image Showcase */}
                <div className="w-full lg:w-1/2 flex justify-center">
                  <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-visible p-2">
                    
                    {/* Shadow backdrop dynamic based on active state */}
                    <div 
                      className={`absolute inset-2 rounded-3xl blur-3xl opacity-50 transition-all duration-700 ${
                        activeSlide === "old" 
                          ? "bg-red-500/30 shadow-[0_0_50px_20px_rgba(239,68,68,0.45)]" 
                          : "bg-emerald-500/30 shadow-[0_0_50px_20px_rgba(16,185,129,0.45)]"
                      }`} 
                    />

                    {/* Image Container with Custom Glow Border/Shadow */}
                    <div className={`relative w-full h-full rounded-[2.5rem] overflow-hidden border p-4 shadow-2xl transition-all duration-500 ${
                      activeSlide === "old"
                        ? "bg-white border-red-500/50 shadow-[0_0_35px_rgba(239,68,68,0.3)]"
                        : "bg-zinc-950 border-emerald-500/50 shadow-[0_0_35px_rgba(16,185,129,0.3)]"
                    }`}>
                      <AnimatePresence mode="wait">
                        {activeSlide === "old" ? (
                          <motion.div
                            key="old-img"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.4 }}
                            className="relative w-full h-full"
                          >
                            <Image
                              src="/juul_old_packaging.png"
                              alt="JUUL 1 Old Packaging"
                              fill
                              className="object-cover rounded-2xl"
                              sizes="(max-width: 1024px) 100vw, 50vw"
                              priority
                            />
                            <div className="absolute bottom-4 left-4 bg-red-600/80 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] text-white font-black uppercase tracking-wider">
                              Old Design
                            </div>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="new-img"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.4 }}
                            className="relative w-full h-full"
                          >
                            <Image
                              src="/juul_new_packaging.png"
                              alt="JUUL 1 New Packaging"
                              fill
                              className="object-cover rounded-2xl"
                              sizes="(max-width: 1024px) 100vw, 50vw"
                              priority
                            />
                            <div className="absolute bottom-4 left-4 bg-emerald-600/80 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] text-white font-black uppercase tracking-wider">
                              New Design
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Quick navigation arrows on the image sides */}
                    <button
                      onClick={() => setActiveSlide(activeSlide === "old" ? "new" : "old")}
                      className={`absolute top-1/2 -translate-y-1/2 -left-4 z-20 p-3 rounded-full shadow-lg border transition-all cursor-pointer ${
                        activeSlide === "old"
                          ? "bg-red-500 border-red-400 text-white hover:bg-red-650"
                          : "bg-emerald-500 border-emerald-400 text-white hover:bg-emerald-600"
                      }`}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setActiveSlide(activeSlide === "old" ? "new" : "old")}
                      className={`absolute top-1/2 -translate-y-1/2 -right-4 z-20 p-3 rounded-full shadow-lg border transition-all cursor-pointer ${
                        activeSlide === "old"
                          ? "bg-red-500 border-red-400 text-white hover:bg-red-650"
                          : "bg-emerald-500 border-emerald-400 text-white hover:bg-emerald-600"
                      }`}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* SECTION 5: Stay Protected */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <div className={`p-8 md:p-12 rounded-[2.5rem] border flex flex-col md:flex-row items-center gap-10 ${isLight ? "bg-red-50 border-red-100" : "bg-red-500/10 border-red-500/20"}`}>
              <Shield className="w-24 h-24 text-red-500 shrink-0" />
              <div>
                <h2 className="text-3xl font-black mb-4">5. Stay Protected</h2>
                <p className={`text-lg leading-relaxed ${isLight ? "text-zinc-700" : "text-red-100/80"}`}>
                  Your safety is our top priority. We implement strict age-verification protocols and guarantee that 100% of the products in our collection are sourced directly from authorized manufacturers. Avoid black-market clones that can pose severe health risks. When you shop with us, you are fully protected by our authenticity guarantee and secure SSL-encrypted checkout system.
                </p>
              </div>
            </div>
          </motion.section>

          {/* SECTION 6: How to Identify Genuine Disposable Vapes in UAE */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <div className={`p-8 md:p-12 rounded-[2.5rem] border ${isLight ? "bg-white border-zinc-200" : "bg-zinc-900/40 border-white/10"}`}>
              <div className="flex items-center gap-3 mb-8">
                <Search className="w-8 h-8 text-red-500" />
                <h2 className="text-3xl font-black">6. How to Identify Genuine Vapes</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { icon: <Info />, title: "Check the Packaging", desc: "Authentic vapes have high-quality printing, proper batch codes, and no spelling errors." },
                  { icon: <AlertCircle />, title: "Verify QR Codes", desc: "Always scratch and scan the authenticity QR code found on the back of the box." },
                  { icon: <ThumbsUp />, title: "Device Build Quality", desc: "Genuine products feel solid, have clean branding, and standard LED colors." },
                  { icon: <CheckCircle />, title: "Purchase from Trusted Sellers", desc: "Only buy from recognized, authorized retailers like VapePod in the UAE." }
                ].map((tip, i) => (
                  <div key={i} className={`p-6 rounded-2xl border flex gap-4 ${isLight ? "bg-zinc-50 border-zinc-200" : "bg-zinc-800/40 border-white/10"}`}>
                    <div className="text-red-500 shrink-0 mt-1">{tip.icon}</div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">{tip.title}</h4>
                      <p className={`text-sm ${isLight ? "text-zinc-600" : "text-zinc-400"}`}>{tip.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>



          {/* SECTION 7: Customer Reviews */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <div className={`py-8 md:py-12 rounded-[2.5rem] border overflow-hidden ${isLight ? "bg-white border-zinc-200" : "bg-zinc-900/40 border-white/10"}`}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4 px-8 md:px-12">
                <div className="flex items-center gap-3">
                  <Star className="w-8 h-8 text-yellow-500 fill-yellow-500" />
                  <h2 className="text-3xl font-black">7. Customer Reviews</h2>
                </div>
                <div className={`px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 ${isLight ? "bg-zinc-100 text-zinc-900" : "bg-white/10 text-white"}`}>
                  <span className="text-yellow-500">★</span> 4.9/5 Average Rating
                </div>
              </div>

              <div className="relative w-full flex overflow-hidden">
                {/* Gradient Masks for smooth fading edges */}
                <div className={`absolute left-0 top-0 bottom-0 w-16 md:w-32 z-10 pointer-events-none bg-gradient-to-r ${isLight ? "from-white to-transparent" : "from-[#09090A] to-transparent"}`} />
                <div className={`absolute right-0 top-0 bottom-0 w-16 md:w-32 z-10 pointer-events-none bg-gradient-to-l ${isLight ? "from-white to-transparent" : "from-[#09090A] to-transparent"}`} />

                <motion.div
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
                  className="flex w-max gap-6 px-4"
                >
                  {[
                    { name: "Ahmed R.", review: "Switched to the smart device and the difference is night and day. The Ruby Sunset flavor is my absolute favorite. Fast delivery in Dubai too!", rating: 5, date: "2 days ago" },
                    { name: "Sarah K.", review: "100% genuine products. I've bought from other places before and got fakes, but VapePod always delivers authentic pods with great packaging.", rating: 5, date: "1 week ago" },
                    { name: "Omar M.", review: "The smart app integration is actually super useful for tracking my usage. The battery lasts all day easily. Highly recommended starter kit.", rating: 5, date: "3 weeks ago" },
                    { name: "Fatima H.", review: "Best disposable alternative. The pods don't leak and it's super easy to change flavors. Customer service is also fantastic.", rating: 5, date: "1 month ago" },
                    { name: "Tariq B.", review: "Device is sleek and charges in no time. The Polar Mint flavor gives a great hit. Very satisfied with my purchase here.", rating: 5, date: "1 month ago" },
                    // Duplicate for seamless infinite scroll
                    { name: "Ahmed R.", review: "Switched to the smart device and the difference is night and day. The Ruby Sunset flavor is my absolute favorite. Fast delivery in Dubai too!", rating: 5, date: "2 days ago" },
                    { name: "Sarah K.", review: "100% genuine products. I've bought from other places before and got fakes, but VapePod always delivers authentic pods with great packaging.", rating: 5, date: "1 week ago" },
                    { name: "Omar M.", review: "The smart app integration is actually super useful for tracking my usage. The battery lasts all day easily. Highly recommended starter kit.", rating: 5, date: "3 weeks ago" },
                    { name: "Fatima H.", review: "Best disposable alternative. The pods don't leak and it's super easy to change flavors. Customer service is also fantastic.", rating: 5, date: "1 month ago" },
                    { name: "Tariq B.", review: "Device is sleek and charges in no time. The Polar Mint flavor gives a great hit. Very satisfied with my purchase here.", rating: 5, date: "1 month ago" }
                  ].map((review, i) => (
                    <div key={i} className={`w-[320px] shrink-0 p-6 rounded-2xl border flex flex-col justify-between ${isLight ? "bg-zinc-50 border-zinc-200" : "bg-zinc-800/40 border-white/10"}`}>
                      <div>
                        <div className="flex gap-1 mb-3">
                          {[...Array(5)].map((_, idx) => (
                            <Star key={idx} className={`w-4 h-4 ${idx < review.rating ? "text-yellow-500 fill-yellow-500" : "text-zinc-300 dark:text-zinc-600"}`} />
                          ))}
                        </div>
                        <p className={`text-sm leading-relaxed mb-6 italic ${isLight ? "text-zinc-600" : "text-zinc-400"}`}>"{review.review}"</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-xs">
                            {review.name.charAt(0)}
                          </div>
                          <p className={`font-bold ${isLight ? "text-zinc-900" : "text-white"}`}>{review.name}</p>
                        </div>
                        <p className={`text-xs ${isLight ? "text-zinc-500" : "text-zinc-500"}`}>{review.date}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.section>

        </div>
      </div>

      {/* ============================ FAQ SECTION ============================ */}
      <div className="mt-32">
        <FAQ theme={theme} />
      </div>

    </motion.section>
  );
}
