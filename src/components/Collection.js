"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Star, Filter, Heart, Eye, BookOpen, Award, Droplet, Layers, Shield, Search, Smartphone, Info, AlertCircle, ThumbsUp, CheckCircle, Zap, ChevronLeft, ChevronRight } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { allProducts as defaultProducts } from "@/data/products";
import FAQ from "./FAQ";

export default function Collection({ onAddToCart, setCurrentPage, setSelectedProduct, theme, activeCategory = "all", setActiveCategory, versionFilter = "all", setVersionFilter }) {
  const { products: contextProducts } = useApp();
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
    { id: "pods", label: "JUUL Pods" }
  ];

  const products = (contextProducts && contextProducts.length > 0 ? contextProducts : defaultProducts).filter(p => p.version === "juul2");
  const dummyProducts = [
    // JUUL 2 Series (Enhanced smart device & many flavors!)
    {
      id: "juul2-device",
      name: "JUUL 2 Device Kit - Slate Grey",
      category: "kits",
      version: "juul2",
      price: 29.99,
      rating: 5.0,
      reviewsCount: 194,
      imgColor: "#1E1E20",
      flavor: "classic",
      tag: "Smart Gen 2",
      desc: "Enhanced vapor draw, massive battery, and dynamic smart LED indicators."
    },
    {
      id: "juul2-ruby-kit",
      name: "JUUL 2 Starter Kit - Ruby Edition",
      category: "kits",
      version: "juul2",
      price: 34.99,
      rating: 4.9,
      reviewsCount: 88,
      imgColor: "#E11D48",
      flavor: "berry",
      tag: "Premium Kit",
      desc: "Ruby Red anodized device with dual-pack dynamic starter pods."
    },
    {
      id: "juul2-apple",
      name: "JUUL 2 Pods - Ruby Sunset (Crisp Apple)",
      category: "pods",
      version: "juul2",
      price: 17.99,
      rating: 4.9,
      reviewsCount: 228,
      imgColor: "#EF4444",
      flavor: "berry",
      tag: "Many Flavors",
      desc: "Pack of 2 genuine pods with crisp red apple aroma and juicy finish."
    },
    {
      id: "juul2-mango",
      name: "JUUL 2 Pods - Summer Gold (Tropical Mango)",
      category: "pods",
      version: "juul2",
      price: 17.99,
      rating: 4.8,
      reviewsCount: 312,
      imgColor: "#F59E0B",
      flavor: "mango",
      tag: "Many Flavors",
      desc: "Pack of 2 genuine pods featuring rich tropical sun-ripened mango."
    },
    {
      id: "juul2-polar-mint",
      name: "JUUL 2 Pods - Polar Mint (Spearmint Ice)",
      category: "pods",
      version: "juul2",
      price: 17.99,
      rating: 4.9,
      reviewsCount: 295,
      imgColor: "#10B981",
      flavor: "mint",
      tag: "Many Flavors",
      desc: "Pack of 2 genuine pods with intense spearmint and arctic cooling frost."
    },
    {
      id: "juul2-blackcurrant",
      name: "JUUL 2 Pods - Blackcurrant (Rich Berry)",
      category: "pods",
      version: "juul2",
      price: 18.99,
      rating: 4.7,
      reviewsCount: 110,
      imgColor: "#EC4899",
      flavor: "berry",
      tag: "Many Flavors",
      desc: "Pack of 2 genuine pods with juicy blackcurrant and wild forest berries."
    },
    {
      id: "juul2-crisp-menthol",
      name: "JUUL 2 Pods - Crisp Menthol (Ice Punch)",
      category: "pods",
      version: "juul2",
      price: 17.99,
      rating: 4.8,
      reviewsCount: 156,
      imgColor: "#06B6D4",
      flavor: "menthol",
      tag: "Many Flavors",
      desc: "Pack of 2 genuine pods delivering an extra punch of clean arctic menthol."
    },
    {
      id: "juul2-virginia-tobacco",
      name: "JUUL 2 Pods - Virginia Tobacco (Bold)",
      category: "pods",
      version: "juul2",
      price: 17.99,
      rating: 4.7,
      reviewsCount: 178,
      imgColor: "#78716C",
      flavor: "classic",
      tag: "Many Flavors",
      desc: "Pack of 2 genuine pods with full-bodied toasted tobacco leaves flavor."
    },
    {
      id: "juul2-autumn-gold",
      name: "JUUL 2 Pods - Autumn Gold (Spiced)",
      category: "pods",
      version: "juul2",
      price: 18.99,
      rating: 4.6,
      reviewsCount: 75,
      imgColor: "#B45309",
      flavor: "classic",
      tag: "Many Flavors",
      desc: "Pack of 2 genuine pods with sweet spiced notes and rich tobacco finish."
    },
    {
      id: "juul2-ruby-menthol",
      name: "JUUL 2 Pods - Ruby Menthol (Berry Ice)",
      category: "pods",
      version: "juul2",
      price: 17.99,
      rating: 4.8,
      reviewsCount: 142,
      imgColor: "#BE123C",
      flavor: "menthol",
      tag: "Many Flavors",
      desc: "Pack of 2 genuine pods combining wild berry sweetness with an arctic menthol blast."
    },

    // Premium Accessories
    {
      id: "juul2-charging-dock",
      name: "JUUL 2 Fast Charging Dock",
      category: "accessories",
      version: "juul2",
      price: 12.99,
      rating: 4.8,
      reviewsCount: 115,
      imgColor: "#1E1E20",
      flavor: "classic",
      tag: "Original Accessories",
      desc: "Magnetic fast-charging USB dock specifically designed for the JUUL 2 device."
    },
    {
      id: "carry-case",
      name: "Tactical Leather Carrying Case",
      category: "accessories",
      version: "juul2",
      price: 19.99,
      rating: 4.9,
      reviewsCount: 52,
      imgColor: "#78350F",
      flavor: "classic",
      tag: "Bespoke Carry",
      desc: "Handcrafted, shockproof carrying case for device and pods."
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
              Curated Catalog
            </span>
            <h1 className={`text-3xl sm:text-5xl font-extrabold tracking-tight mt-2 ${isLight ? "text-zinc-950" : "text-white"
              }`}>
              Premium Collections
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

                {/* JUUL 2 Device CSS Model */}
                <div className="relative w-14 h-36 rounded-xl bg-gradient-to-b from-[#333] to-[#111] shadow-2xl border border-white/10 flex flex-col items-center">
                  {/* Pod */}
                  <div className="absolute -top-6 w-12 h-8 bg-zinc-900 rounded-t-lg border-x border-t border-zinc-700 flex justify-center overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-b from-red-500/20 to-transparent" />
                  </div>

                  {/* Body Details - LED Lights */}
                  <div className="absolute bottom-10 w-full px-2 flex justify-center">
                    <div className="w-3 h-12 rounded-full bg-black/60 flex flex-col justify-center items-center gap-1.5 py-1">
                      <div className="w-1 h-1 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,1)]" />
                      <div className="w-1 h-1 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,1)]" />
                      <div className="w-1 h-1 rounded-full bg-white/20" />
                      <div className="w-1 h-1 rounded-full bg-white/20" />
                    </div>
                  </div>

                  {/* Logo */}
                  <div className="absolute bottom-3 font-black text-[6px] text-zinc-500 tracking-widest uppercase">JUUL</div>
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
                  Welcome to our premium collection of vapes, pods, and starter kits. Navigating the world of vaping can be overwhelming, but we’ve structured our catalog to make your shopping experience seamless. Whether you're a beginner looking for a simple <strong className={isLight ? "text-zinc-900" : "text-white"}>Classic kit</strong> or an experienced user upgrading to the <strong className={isLight ? "text-zinc-900" : "text-white"}>Smart Device Series</strong>, our collection guide ensures you find exactly what you need.
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
                      <th className="p-6 font-bold">JUUL 2 Series</th>
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

          {/* SECTION 7: The Smart App Experience */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <div className={`p-8 md:p-12 rounded-[2.5rem] border flex flex-col lg:flex-row items-center gap-12 overflow-hidden relative ${isLight ? "bg-zinc-950 text-white" : "bg-[#09090A] border-white/10 text-white"}`}>
              {/* Left: Phone Mockup UI */}
              <div className="w-full lg:w-1/2 flex justify-center relative">
                {/* Glow effect */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-emerald-500/20 rounded-full blur-[80px]" />

                {/* Phone Frame */}
                <div className="w-[280px] h-[580px] bg-[#111113] rounded-[3rem] border-[8px] border-zinc-800 p-5 relative shadow-2xl z-10 flex flex-col">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-zinc-800 rounded-b-2xl" />

                  {/* Top Status Bar Fake */}
                  <div className="flex justify-between items-center text-[9px] text-zinc-400 mt-2 px-2 font-semibold">
                    <span>9:41</span>
                    <div className="flex gap-1">
                      <span>📶</span>
                      <span>🔋</span>
                    </div>
                  </div>

                  {/* App Header */}
                  <div className="mt-6 flex items-center justify-between px-1">
                    <span className="font-black text-2xl tracking-tighter">JUUL</span>
                    <span className="text-xs font-bold bg-white/10 px-3 py-1.5 rounded-full">Usage Stats</span>
                  </div>

                  <p className="text-[10px] text-zinc-500 mt-3 px-1">Hello, <span className="text-white font-bold">Sarah</span> | Battery: 68%</p>

                  {/* App Content */}
                  <div className="mt-4 flex-1 space-y-3">
                    {/* Bar chart - Daily Puff */}
                    <div className="bg-white/5 border border-white/5 p-4 rounded-2xl">
                      <div className="flex justify-between items-center mb-4">
                        <p className="text-[10px] text-zinc-300 font-bold">Daily Puff Count</p>
                        <span className="text-[8px] text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">+12 today</span>
                      </div>
                      <div className="flex items-end justify-between h-24 gap-1.5 px-1">
                        {[40, 60, 35, 85, 50, 70, 45].map((h, i) => (
                          <div key={i} className="w-full flex flex-col items-center gap-1">
                            <span className="text-[8px] text-zinc-500">{Math.floor(h * 1.2)}</span>
                            <div className="w-full bg-emerald-400 rounded-sm transition-all" style={{ height: `${h}%`, opacity: i === 3 ? 1 : 0.3 }} />
                            <span className="text-[8px] text-zinc-600 font-bold">{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Line graph - Weekly Trend */}
                    <div className="bg-white/5 border border-white/5 p-4 rounded-2xl">
                      <p className="text-[10px] text-zinc-300 font-bold mb-2">Weekly Usage Graph</p>
                      <div className="h-16 flex items-end relative mt-2">
                        <svg viewBox="0 0 100 30" className="w-full h-full stroke-emerald-400 fill-none overflow-visible" preserveAspectRatio="none">
                          <path d="M0,20 L16,10 L33,25 L50,5 L66,15 L83,10 L100,18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          {/* Dots */}
                          <circle cx="0" cy="20" r="2" className="fill-emerald-400" />
                          <circle cx="16" cy="10" r="2" className="fill-emerald-400" />
                          <circle cx="33" cy="25" r="2" className="fill-emerald-400" />
                          <circle cx="50" cy="5" r="2" className="fill-white stroke-emerald-400 stroke-[1.5]" />
                          <circle cx="66" cy="15" r="2" className="fill-emerald-400" />
                          <circle cx="83" cy="10" r="2" className="fill-emerald-400" />
                          <circle cx="100" cy="18" r="2" className="fill-emerald-400" />
                        </svg>
                      </div>
                    </div>

                    {/* Nicotine Tracker */}
                    <div className="bg-white/5 border border-white/5 p-4 rounded-2xl flex items-center justify-between">
                      <div>
                        <p className="text-[10px] text-zinc-300 font-bold flex items-center gap-1">
                          <Droplet className="w-3 h-3 text-emerald-400" />
                          Nicotine Intake
                        </p>
                        <p className="text-xl font-black mt-1 tracking-tight">1.9 <span className="text-[10px] font-normal text-zinc-500">mg</span></p>
                        <p className="text-[8px] text-zinc-600 mt-1">of Daily Max: 2.7 mg</p>
                      </div>
                      <div className="relative w-14 h-14 flex items-center justify-center">
                        <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                          <path
                            className="stroke-white/10"
                            strokeWidth="4"
                            fill="none"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                          <path
                            className="stroke-emerald-400"
                            strokeWidth="4"
                            strokeDasharray="70, 100"
                            strokeLinecap="round"
                            fill="none"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                        </svg>
                        <span className="absolute text-[10px] font-bold">70%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Features List */}
              <div className="w-full lg:w-1/2 relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <Smartphone className="w-8 h-8 text-emerald-400" />
                  <h2 className="text-3xl md:text-5xl font-black tracking-tight">Connect with the App</h2>
                </div>
                <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
                  Pair your smart device with our mobile app via Bluetooth to unlock powerful insights. Monitor your usage, find lost devices, and stay fully in control.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    "Detailed Usage Stats",
                    "Nicotine Intake Tracker",
                    "Live Puff Count Graph",
                    "Find My Device (Bluetooth)",
                    "Battery Level Monitoring",
                    "Auto-Lock Device Security",
                    "Over-The-Air Updates"
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
                      <span className="font-bold text-sm text-zinc-200">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>

          {/* SECTION 8: Customer Reviews */}
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
                  <h2 className="text-3xl font-black">8. Customer Reviews</h2>
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
