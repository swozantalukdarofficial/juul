"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";

export default function FlavorTeaser({ setCurrentPage, theme }) {
  const [deviceFilter, setDeviceFilter] = useState("juul2");
  const [activeTab, setActiveTab] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % flavorsData[deviceFilter].length);
    }, 1300);
    return () => clearInterval(interval);
  }, [isPaused, deviceFilter]);

  const flavorsData = {
    juul1: [
      {
        id: "mint",
        title: "Cool Mint",
        slogan: "A crisp burst of natural peppermint.",
        desc: "Perfectly refreshing with a soothing exhale. Formulated using premium peppermint extracts and zero artificial coolants for a genuine crisp taste.",
        color: "from-emerald-600 to-teal-900",
        accent: "#10B981",
        badge: "Best Seller",
        strength: "3.0% / 5.0%",
        packSize: "4 Pods per Pack"
      },
      {
        id: "mango",
        title: "Royal Mango",
        slogan: "Sun-ripened tropical golden nectar.",
        desc: "Rich, luscious, and deeply satisfying. This flavor captures the sweet fragrance of orchard-fresh alphonso mangoes on hot summer nights.",
        color: "from-amber-600 to-orange-950",
        accent: "#F59E0B",
        badge: "Premium Collection",
        strength: "5.0%",
        packSize: "4 Pods per Pack"
      },
      {
        id: "classic",
        title: "Virginia Tobacco",
        slogan: "Rich American tobacco with toasted notes.",
        desc: "An earthy, full-bodied experience for traditionalists. Delivers smooth throat hits with classic Virginia leaf toasted leaf complexity.",
        color: "from-stone-600 to-zinc-950",
        accent: "#78716C",
        badge: "Signature Tobacco",
        strength: "3.0% / 5.0%",
        packSize: "4 Pods per Pack"
      }
    ],
    juul2: [
      {
        id: "polar-mint",
        title: "Polar Mint",
        slogan: "Intensely cooling icy peppermint.",
        desc: "The next-generation mint experience. Enhanced vapor production delivers a blast of pure freezing mint that lingers pleasantly.",
        color: "from-cyan-500 to-blue-900",
        accent: "#06B6D4",
        badge: "Most Intense",
        strength: "18 mg/ml",
        packSize: "2 Pods per Pack"
      },
      {
        id: "autumn-tobacco",
        title: "Autumn Tobacco",
        slogan: "Mellow tobacco with tangy apple notes.",
        desc: "A completely new take on tobacco. Rich roasted flavors perfectly balanced with a subtle hint of crisp autumn apples.",
        color: "from-amber-700 to-red-950",
        accent: "#B45309",
        badge: "New Release",
        strength: "18 mg/ml",
        packSize: "2 Pods per Pack"
      },
      {
        id: "ruby-berry",
        title: "Ruby Berry",
        slogan: "Wild red berries with a cool finish.",
        desc: "A vibrant fusion of freshly picked wild berries. Sweet on the inhale with a surprisingly refreshing cool finish.",
        color: "from-pink-600 to-rose-950",
        accent: "#DB2777",
        badge: "Fan Favorite",
        strength: "18 mg/ml",
        packSize: "2 Pods per Pack"
      }
    ]
  };

  const flavorList = flavorsData[deviceFilter];
  const current = flavorList[activeTab] || flavorList[0];
  const isLight = theme === "light";

  return (
    <section className={`py-24 border-y transition-colors duration-500 relative overflow-hidden ${
      isLight ? "bg-zinc-50 border-zinc-200/80" : "bg-[#0A0A0B] border-white/5"
    }`}>
      {/* Dynamic Background Glow (GPU Optimized) */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div 
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full transition-colors duration-1000" 
          style={{ background: `radial-gradient(circle, ${current.accent} 0%, transparent 60%)` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full">
        {/* Left Interactive Selection List */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="lg:col-span-5 space-y-6"
        >
          <div className="space-y-2">
            <span className={`text-xs font-bold uppercase tracking-widest ${
              isLight ? "text-zinc-400" : "text-zinc-500"
            }`}>
              Find Your Perfect Flavor
            </span>
            <h2 className={`text-3xl sm:text-5xl font-extrabold ${isLight ? "text-zinc-950" : "text-white"}`}>
              Explore Pods
            </h2>
            <p className={`text-sm pt-2 ${isLight ? "text-zinc-500" : "text-zinc-400"}`}>
              Authentic flavors crafted for the ultimate satisfaction. Select your device type to see available options.
            </p>
          </div>

          {/* Device Tabs */}
          <div className={`flex items-center gap-2 p-1.5 rounded-2xl border ${
            isLight ? "bg-zinc-200/50 border-zinc-200" : "bg-white/5 border-white/10"
          }`}>
            <button
              onClick={() => { setDeviceFilter("juul2"); setActiveTab(0); }}
              className={`flex-1 py-2.5 text-sm font-black uppercase tracking-widest rounded-xl transition-all ${
                deviceFilter === "juul2"
                  ? isLight ? "bg-white text-zinc-950 shadow-sm" : "bg-white/10 text-white shadow-sm"
                  : isLight ? "text-zinc-500 hover:text-zinc-800" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              JUUL 2 Pods
            </button>
            <button
              onClick={() => { setDeviceFilter("juul1"); setActiveTab(0); }}
              className={`flex-1 py-2.5 text-sm font-black uppercase tracking-widest rounded-xl transition-all ${
                deviceFilter === "juul1"
                  ? isLight ? "bg-white text-zinc-950 shadow-sm" : "bg-white/10 text-white shadow-sm"
                  : isLight ? "text-zinc-500 hover:text-zinc-800" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              JUUL 1 Pods
            </button>
          </div>

          <div 
            className="flex flex-col gap-3 pt-4 max-h-[280px] overflow-y-auto scrollbar-hide pr-2"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {flavorList.map((flavor, index) => (
              <button
                key={flavor.id}
                onClick={() => setActiveTab(index)}
                className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between cursor-pointer ${
                  activeTab === index 
                    ? isLight
                      ? "bg-white border-zinc-200 shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
                      : "bg-white/5 border-white/10 shadow-lg" 
                    : "bg-transparent border-transparent opacity-55 hover:opacity-90"
                }`}
              >
                <div>
                  <p className={`text-xs uppercase tracking-widest font-bold mb-1 ${
                    isLight ? "text-zinc-400" : "text-zinc-500"
                  }`}>0{index + 1}</p>
                  <p className={`text-lg font-black ${isLight ? "text-zinc-800" : "text-white"}`}>{flavor.title}</p>
                </div>
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: flavor.accent }}
                />
              </button>
            ))}
          </div>
        </motion.div>

        {/* Right Dynamic Flavor Info card */}
        <div className="lg:col-span-7 h-[420px] sm:h-[460px] flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className={`w-full h-full p-8 sm:p-12 rounded-3xl bg-gradient-to-br ${current.color} flex flex-col justify-between shadow-2xl relative overflow-hidden border ${
                isLight ? "border-zinc-200/10" : "border-white/10"
              }`}
            >
              {/* Abs grid inside card */}
              <div className="absolute inset-0 bg-black/10 pointer-events-none" />

              <div className="space-y-4 relative z-10 text-left">
                <span className="inline-block bg-white/10 border border-white/20 backdrop-blur-md text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full text-white">
                  {current.badge}
                </span>
                <h3 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-none">
                  {current.title}
                </h3>
                <p className="text-base sm:text-lg font-medium text-emerald-100/90 italic leading-snug">
                  "{current.slogan}"
                </p>
                <p className="text-xs sm:text-sm text-zinc-100/80 leading-relaxed font-light max-w-xl">
                  {current.desc}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-white/10 relative z-10 text-left">
                <div className="flex items-center gap-8">
                  <div>
                    <p className="text-[10px] text-zinc-300 uppercase tracking-widest font-bold">Nicotine</p>
                    <p className="text-sm font-black text-white">{current.strength}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-zinc-300 uppercase tracking-widest font-bold">Pack Size</p>
                    <p className="text-sm font-black text-white">{current.packSize}</p>
                  </div>
                </div>
                <button
                  onClick={() => setCurrentPage("product")}
                  className="bg-white text-black hover:bg-black hover:text-white transition-all duration-300 text-xs uppercase tracking-widest font-bold px-6 py-4 rounded-full flex items-center justify-center gap-2 cursor-pointer shadow-md w-full sm:w-auto"
                >
                  Shop Now <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
