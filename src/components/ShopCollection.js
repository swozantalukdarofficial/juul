"use client";

import { useState, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Star, Heart, Eye, BookOpen, Award, Droplet, Layers, Search, CheckCircle, Zap, ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { allProducts as defaultProducts } from "@/data/products";
import FAQ from "./FAQ";
import ProductReviews from "./ProductReviews";

export default function ShopCollection({ onAddToCart, setCurrentPage, setSelectedProduct, theme }) {
  const { products: contextProducts } = useApp();
  const flavorScrollRef = useRef(null);
  
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeVersion, setActiveVersion] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

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
    { id: "accessories", label: "Accessories" }
  ];

  const versions = [
    { id: "all", label: "All Generations" },
    { id: "juul1", label: "JUUL 1 Series" },
    { id: "juul2", label: "JUUL 2 Series" }
  ];

  const products = contextProducts && contextProducts.length > 0 ? contextProducts : defaultProducts;

  // Filter products based on version, category, and search query
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesVersion = activeVersion === "all" || p.version === activeVersion;
      const matchesCategory = activeCategory === "all" || p.category === activeCategory;
      const matchesSearch = searchQuery === "" || 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (p.desc && p.desc.toLowerCase().includes(searchQuery.toLowerCase())) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesVersion && matchesCategory && matchesSearch;
    });
  }, [products, activeVersion, activeCategory, searchQuery]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const isLight = theme === "light";

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`pt-32 pb-20 min-h-screen text-left transition-colors duration-500 ${
        isLight ? "bg-zinc-50 text-zinc-900" : "bg-[#09090A] text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="mb-12 flex flex-col md:flex-row justify-between items-center md:items-end gap-6 relative z-10">
          <div className="text-center md:text-left">
            <span className={`text-xs font-bold uppercase tracking-widest ${
              isLight ? "text-red-600" : "text-red-400"
            }`}>
              Full Vape Catalog
            </span>
            <h1 className={`text-4xl sm:text-6xl font-extrabold tracking-tight mt-2 ${
              isLight ? "text-zinc-950" : "text-white"
            }`}>
              Shop All Products
            </h1>
            <p className={`text-sm sm:text-base mt-2 max-w-xl ${isLight ? "text-zinc-500" : "text-zinc-400"}`}>
              Explore our complete selection of authentic JUUL 1 & JUUL 2 devices, starter kits, pods, and premium accessories.
            </p>
          </div>

          {/* Floating Sticker Badge (Authentic) */}
          <div className="hidden md:flex justify-end items-center mr-8">
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="relative pointer-events-none"
            >
              <div className="rotate-[12deg] scale-90 relative origin-bottom">
                <div
                  className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex flex-col items-center justify-center border-2 border-white/80 shadow-[0_10px_20px_rgba(239,68,68,0.3)] text-white font-black leading-none"
                >
                  <span className="text-sm tracking-tighter uppercase font-black">100%</span>
                  <span className="text-[7px] uppercase tracking-widest mt-1 opacity-90">Genuine</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Filter Controls Dashboard */}
        <div className={`p-6 rounded-3xl border mb-12 flex flex-col gap-6 transition-all duration-300 ${
          isLight ? "bg-white border-zinc-200 shadow-sm" : "bg-[#121214]/60 border-white/5"
        }`}>
          {/* Top Row: Search and Version Selection */}
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${
                isLight ? "text-zinc-400" : "text-zinc-500"
              }`} />
              <input
                type="text"
                placeholder="Search flavors, kits, pods..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-11 pr-4 py-3 rounded-full text-xs font-bold transition-all border outline-none ${
                  isLight 
                    ? "bg-zinc-50 hover:bg-zinc-100/50 focus:bg-white border-zinc-200 text-zinc-900 focus:border-red-500"
                    : "bg-white/[0.02] hover:bg-white/[0.04] focus:bg-white/[0.06] border-white/5 text-white focus:border-red-500"
                }`}
              />
            </div>

            {/* Version Filters */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0 scrollbar-none" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <span className={`text-[10px] uppercase font-bold tracking-wider mr-2 hidden sm:inline ${
                isLight ? "text-zinc-400" : "text-zinc-500"
              }`}>
                Generation:
              </span>
              {versions.map(v => (
                <button
                  key={v.id}
                  onClick={() => setActiveVersion(v.id)}
                  className={`whitespace-nowrap text-[10px] uppercase tracking-widest font-bold px-4 py-2.5 rounded-full border transition-all duration-300 cursor-pointer ${
                    activeVersion === v.id
                      ? isLight
                        ? "bg-zinc-950 text-white border-zinc-950 shadow-sm"
                        : "bg-white text-black border-white"
                      : isLight
                        ? "bg-white text-zinc-500 border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50"
                        : "bg-zinc-900/40 text-zinc-400 border-white/5 hover:border-white/25 hover:text-white"
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>

          </div>

          {/* Bottom Row: Category Selection and Results Count */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-dashed border-zinc-200 dark:border-white/5">
            {/* Category Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`whitespace-nowrap text-[10px] uppercase tracking-widest font-bold px-5 py-2.5 rounded-full border transition-all duration-300 cursor-pointer ${
                    activeCategory === cat.id
                      ? isLight
                        ? "bg-red-500 text-white border-red-500 shadow-sm"
                        : "bg-red-500 text-white border-red-500 shadow-lg shadow-red-500/10"
                      : isLight
                        ? "bg-white text-zinc-650 border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50"
                        : "bg-zinc-900/40 text-zinc-400 border-white/5 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <span className={`text-[10px] font-black uppercase tracking-widest ${
              isLight ? "text-zinc-400" : "text-zinc-500"
            }`}>
              Showing {filteredProducts.length} Product{filteredProducts.length !== 1 ? "s" : ""}
            </span>
          </div>

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
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className={`group relative flex flex-col justify-between rounded-3xl p-5 border transition-all duration-300 ${
                  isLight
                    ? "bg-white border-zinc-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:border-red-500/40 hover:shadow-[0_20px_40px_rgba(239,68,68,0.04)]"
                    : "bg-white/[0.01] border-white/5 hover:border-red-500/30 hover:shadow-[0_20px_40px_rgba(239,68,68,0.06)] hover:bg-white/[0.02]"
                }`}
              >
                {/* Image Showcase Box */}
                <div
                  onClick={() => handleProductClick(prod)}
                  className={`w-full h-56 rounded-2xl border relative overflow-hidden flex items-center justify-center cursor-pointer transition-colors ${
                    isLight ? "bg-zinc-50 border-zinc-100" : "bg-zinc-950 border-white/5"
                  }`}
                >
                  {/* Floating Version Tag */}
                  <span className={`absolute top-3 left-3 border backdrop-blur-md text-[8px] uppercase font-black tracking-widest px-2 py-0.5 rounded-full ${
                    prod.version === "juul2"
                      ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                      : "bg-red-500/10 border-red-500/20 text-red-400"
                  }`}>
                    {prod.version === "juul2" ? "JUUL 2" : "JUUL 1"}
                  </span>

                  {prod.tag && (
                    <span className={`absolute bottom-3 left-3 border backdrop-blur-md text-[9px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full ${
                      isLight
                        ? "bg-zinc-900/10 border-zinc-900/5 text-zinc-800"
                        : "bg-white/10 border-white/20 text-white"
                    }`}>
                      {prod.tag}
                    </span>
                  )}
                  
                  <button className={`absolute top-3 right-3 p-1.5 rounded-full border transition-all ${
                    isLight
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
                    /* Fallback device representation */
                    <motion.div
                      whileHover={{ scale: 1.08, rotate: -5 }}
                      transition={{ duration: 0.3 }}
                      className={`w-10 h-36 rounded-md border flex flex-col items-center justify-between p-1 transition-all duration-500 shadow-xl ${
                        isLight ? "border-zinc-200/50" : "border-white/10"
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
                      <div
                        className="w-2.5 h-2.5 rounded-full shadow-lg"
                        style={{
                          backgroundColor: "#ef4444",
                          boxShadow: `0 0 5px #ef4444`
                        }}
                      />
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

                {/* Content Details */}
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
                    className={`text-base font-bold transition-colors cursor-pointer line-clamp-1 ${
                      isLight ? "text-zinc-900 hover:text-red-500" : "text-white hover:text-red-500"
                    }`}
                  >
                    {prod.name}
                  </h3>
                  <p className={`text-[11px] sm:text-xs font-light leading-relaxed line-clamp-2 ${
                    isLight ? "text-zinc-500" : "text-zinc-400"
                  }`}>
                    {prod.desc}
                  </p>
                </div>

                {/* Footer Actions */}
                <div className={`flex items-center justify-between pt-4 mt-4 border-t ${
                  isLight ? "border-zinc-100" : "border-white/5"
                }`}>
                  <div className="flex flex-col text-left">
                    <div className="flex items-baseline gap-2">
                      <span className={`text-lg font-black ${isLight ? "text-black" : "text-white"}`}>
                        AED {parseFloat(prod.price).toFixed(2)}
                      </span>
                      {prod.originalPrice && prod.originalPrice > prod.price && (
                        <span className="text-xs line-through text-zinc-500 font-semibold">
                          AED {parseFloat(prod.originalPrice).toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => onAddToCart(prod)}
                    className={`flex items-center gap-1.5 font-bold text-[10px] uppercase tracking-wider px-4 py-2 rounded-full transition-all duration-300 cursor-pointer ${
                      isLight
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

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`text-center py-20 rounded-3xl border border-dashed mt-6 ${
              isLight ? "bg-white border-zinc-200" : "bg-[#121214]/30 border-white/10"
            }`}
          >
            <Zap className={`w-12 h-12 mx-auto mb-4 stroke-1 ${isLight ? "text-zinc-350" : "text-zinc-650"}`} />
            <h3 className="text-lg font-bold mb-1">No products found</h3>
            <p className={`text-xs ${isLight ? "text-zinc-500" : "text-zinc-400"}`}>
              Try resetting your filters or adjusting your search query.
            </p>
            <button
              onClick={() => {
                setActiveCategory("all");
                setActiveVersion("all");
                setSearchQuery("");
              }}
              className="mt-4 px-5 py-2.5 rounded-full text-[10px] uppercase tracking-widest font-black bg-red-500 text-white hover:bg-red-600 transition-colors shadow-md"
            >
              Reset Filters
            </button>
          </motion.div>
        )}

        {/* Info & Guides */}
        <div className="mt-24 space-y-16">

          {/* Guide Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className={`p-8 md:p-12 rounded-[2.5rem] border ${
              isLight ? "bg-white border-zinc-200" : "bg-zinc-900/40 border-white/10"
            }`}>
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="w-8 h-8 text-red-500" />
                <h2 className="text-3xl font-black">Vape Shop Buying Guide</h2>
              </div>
              <div className={`space-y-6 text-base sm:text-lg leading-relaxed ${
                isLight ? "text-zinc-600" : "text-zinc-400"
              }`}>
                <p>
                  Welcome to VapePod UAE's official shop page. We stock a comprehensive selection of premium devices, replacement pods, and custom accessories tailored to fit your lifestyle. Navigating our catalog is easy: filter by <strong>JUUL 1</strong> for classic flavor versatility or upgrade to <strong>JUUL 2</strong> for smart connected vaping with enhanced vapor output.
                </p>
                <p>
                  All our products are 100% authentic, sourced directly to ensure you get genuine products with optimal flavor quality, puff count consistency, and battery life safety. Use the filters above to browse our starter kits, flavors, and chargers.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Feature Badges */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className={`p-8 md:p-12 rounded-[2.5rem] border ${
              isLight ? "bg-[#ffffff] border-zinc-200" : "bg-[#09090A] border-white/10"
            }`}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <Award className="w-8 h-8 text-red-500" />
                    <h2 className="text-3xl font-black">Why Shop With Us?</h2>
                  </div>
                  <ul className="space-y-4">
                    {[
                      "Fast delivery across all UAE emirates.",
                      "100% authentic devices & pods guaranteed.",
                      "Best prices on genuine JUUL products.",
                      "Dedicated 24/7 customer support team."
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-emerald-500 shrink-0" />
                        <span className={`text-sm sm:text-base ${isLight ? "text-zinc-700" : "text-zinc-300"}`}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`p-8 rounded-[2rem] border text-center ${
                  isLight ? "bg-zinc-50 border-zinc-200" : "bg-zinc-800/50 border-white/10"
                }`}>
                  <Zap className="w-12 h-12 text-red-500 mx-auto mb-4 animate-bounce" />
                  <h3 className="text-xl font-bold mb-2">Instant Authentication</h3>
                  <p className={`text-xs sm:text-sm ${isLight ? "text-zinc-600" : "text-zinc-400"}`}>
                    Every box contains unique batch codes. Purchase with absolute confidence knowing all items are verified.
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Customer Reviews Section */}
          <ProductReviews productName="VapePod Shop" theme={theme} />

        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-32">
        <FAQ theme={theme} />
      </div>

    </motion.section>
  );
}
