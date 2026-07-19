"use client";

import { motion } from "framer-motion";
import { Droplet, ShoppingCart, Check, Zap } from "lucide-react";
import { useState } from "react";
import { useApp } from "@/context/AppContext";

const FLAVORS = [
  {
    id: "juul2-apple",
    name: "Ruby Sunset",
    note: "Crisp Red Apple",
    description: "Experience a refreshing burst of crisp, sweet red apples. This flavor perfectly balances a juicy fruitiness with a smooth, satisfying vapor draw on every puff.",
    strength: "18 mg/ml",
    pack: "2 Pods per Pack",
    color: "#EF4444",
    liquidColor: "rgba(239, 68, 68, 0.18)",
    price: 17.99,
  },
  {
    id: "juul2-mango",
    name: "Summer Gold",
    note: "Tropical Mango",
    description: "A vibrant and juicy tropical mango sweetness that transports you to summer. Enjoy a rich, full-bodied exotic taste with a clean and mellow finish.",
    strength: "18 mg/ml",
    pack: "2 Pods per Pack",
    color: "#F59E0B",
    liquidColor: "rgba(245, 158, 11, 0.18)",
    price: 17.99,
  },
  {
    id: "juul2-polar-mint",
    name: "Polar Mint",
    note: "Spearmint Ice",
    description: "An incredibly icy, cooling spearmint flavor designed for maximum freshness. It delivers a frosty throat hit leaving your senses invigorated all day.",
    strength: "18 mg/ml",
    pack: "2 Pods per Pack",
    color: "#10B981",
    liquidColor: "rgba(16, 185, 129, 0.15)",
    price: 17.99,
  },
  {
    id: "juul2-blackcurrant",
    name: "Blackcurrant",
    note: "Rich Wild Berry",
    description: "Indulge in deep, rich wild berry notes combined with a dark, sweet undertone. This robust flavor provides a uniquely smooth and lingering berry aftertaste.",
    strength: "18 mg/ml",
    pack: "2 Pods per Pack",
    color: "#EC4899",
    liquidColor: "rgba(236, 72, 153, 0.18)",
    price: 18.99,
  },
  {
    id: "juul2-crisp-menthol",
    name: "Crisp Menthol",
    note: "Arctic Ice Punch",
    description: "A brisk and intense arctic menthol blast for those who love pure, unadulterated ice. It hits sharp and clean, offering the ultimate freezing sensation.",
    strength: "18 mg/ml",
    pack: "2 Pods per Pack",
    color: "#06B6D4",
    liquidColor: "rgba(6, 182, 212, 0.15)",
    price: 17.99,
  },
  {
    id: "juul2-virginia-tobacco",
    name: "Virginia Tobacco",
    note: "Bold American Leaf",
    description: "The classic, rich, and bold taste of premium Virginia tobacco leaves. Carefully blended to emulate the authentic warmth of traditional smoking.",
    strength: "18 mg/ml",
    pack: "2 Pods per Pack",
    color: "#78716C",
    liquidColor: "rgba(120, 113, 108, 0.18)",
    price: 17.99,
  },
  {
    id: "juul2-autumn-gold",
    name: "Autumn Gold",
    note: "Spiced Apple Tobacco",
    description: "A masterfully smooth blend of earthy tobacco mixed with warm, spiced apple notes. Perfect for winding down with a comforting, slightly sweet aroma.",
    strength: "18 mg/ml",
    pack: "2 Pods per Pack",
    color: "#B45309",
    liquidColor: "rgba(180, 83, 9, 0.18)",
    price: 18.99,
  },
  {
    id: "juul2-blonde-tobacco",
    name: "Blonde Tobacco",
    note: "Mellow American Blend",
    description: "A remarkably smooth, light, and mellow tobacco taste. Ideal for vapers seeking a subtle, less intense tobacco flavor with a refined, airy finish.",
    strength: "18 mg/ml",
    pack: "2 Pods per Pack",
    color: "#D97706",
    liquidColor: "rgba(217, 119, 6, 0.18)",
    price: 17.99,
  }
];

export default function Juul2Flavors({ theme, onAddToCart }) {
  const { products } = useApp();
  const isLight = theme === "light";
  const [addedId, setAddedId] = useState(null);

  const activeFlavors = FLAVORS.map(flavor => {
    const matched = products.find(p => {
      if (p.version !== "juul2") return false;
      const t = p.name.toLowerCase();
      if (flavor.id === "juul2-apple" && t.includes("apple")) return true;
      if (flavor.id === "juul2-mango" && t.includes("mango")) return true;
      if (flavor.id === "juul2-polar-mint" && t.includes("polar")) return true;
      if (flavor.id === "juul2-blackcurrant" && t.includes("blackcurrant")) return true;
      if (flavor.id === "juul2-autumn-gold" && t.includes("autumn")) return true;
      if (flavor.id === "juul2-summer-gold" && t.includes("summer")) return true;
      if (flavor.id === "juul2-virginia" && t.includes("virginia")) return true;
      if (flavor.id === "juul2-crisp-menthol" && t.includes("crisp")) return true;
      return false;
    });

    if (matched) {
      return {
        ...flavor,
        id: matched.id, // Use the real Shopify handle!
        price: matched.price
      };
    }
    return flavor;
  });

  const handleBuy = (flavor) => {
    const productAdapter = {
      id: flavor.id,
      name: `JUUL 2 Pods - ${flavor.name} (${flavor.note})`,
      price: flavor.price,
      image: "/cat-pods.png",
      category: "pods",
      version: "juul2"
    };
    onAddToCart(productAdapter);
    setAddedId(flavor.id);
    setTimeout(() => setAddedId(null), 2000);
  };

  return (
    <section className={`py-20 border-y transition-colors duration-500 relative overflow-hidden ${
      isLight ? "bg-zinc-150/40 border-zinc-200" : "bg-[#080809] border-white/5"
    }`}>
      {/* Background Ornaments */}
      <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
        <div className={`absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[130px] ${isLight ? "bg-blue-200" : "bg-blue-900/10"}`}></div>
        <div className={`absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[100px] ${isLight ? "bg-emerald-100" : "bg-emerald-950/10"}`}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* ── Heading ── */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-zinc-200 dark:border-white/10 bg-white/50 dark:bg-white/[0.02] backdrop-blur-sm">
            <Droplet className="w-3.5 h-3.5 text-blue-500" />
            <span className={`text-[10px] font-black uppercase tracking-widest ${isLight ? "text-zinc-600" : "text-zinc-400"}`}>
              Compatibility Specs
            </span>
          </div>
          <h2 className={`text-3xl sm:text-5xl font-black tracking-tight leading-tight ${isLight ? "text-zinc-950" : "text-white"}`}>
            Fully Compatible With <br className="hidden xs:block" />
            <span className="text-red-500">
              JUUL 2 PODS
            </span>
          </h2>
          <p className={`text-xs sm:text-sm max-w-2xl mx-auto font-light leading-relaxed ${isLight ? "text-zinc-650" : "text-zinc-450"}`}>
            All JUUL 2 devices are engineered to connect exclusively with genuine JUUL 2 pods. 
            Enjoy a smoother throat hit, child-safety locking, and automatic nicotine tracking technology.
          </p>
        </div>

        {/* ── Pods Grid Layout (Inspired by XROS grid) ── */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {activeFlavors.map((flavor, index) => {
            const isAdded = addedId === flavor.id;
            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                key={flavor.id}
                className={`group flex flex-col justify-between rounded-3xl p-4 sm:p-6 border transition-all duration-300 relative overflow-hidden ${
                  isLight 
                    ? "bg-white border-zinc-200 hover:border-red-500/40 hover:shadow-lg hover:shadow-zinc-200/50" 
                    : "bg-[#121214] border-white/5 hover:border-red-500/30 hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)]"
                }`}
              >
                {/* Top spec tag */}
                <div className="text-center mb-6">
                  <span className={`text-[9px] font-black uppercase tracking-wider ${isLight ? "text-zinc-400" : "text-zinc-500"}`}>
                    {flavor.pack}
                  </span>
                  <div className={`h-[1px] w-8 mx-auto mt-2 bg-gradient-to-r ${isLight ? "from-zinc-200 to-zinc-300" : "from-white/5 to-white/10"}`} />
                </div>

                {/* ── High-Fidelity CSS JUUL 2 Pod ── */}
                <div className="h-44 flex items-center justify-center relative mb-6">
                  <div className="relative w-16 h-36 flex flex-col items-center group-hover:scale-105 transition-transform duration-500">
                    {/* Pod Mouthpiece */}
                    <div className="w-12 h-10 bg-[#161618] rounded-t-lg relative flex items-center justify-center shadow-md">
                      {/* Air hole cutout */}
                      <div className="w-4 h-1 rounded-full bg-black" />
                      {/* Color-coded flavor stripe at bottom of mouthpiece */}
                      <div 
                        className="absolute bottom-0 left-0 right-0 h-1.5 shadow-inner" 
                        style={{ backgroundColor: flavor.color }}
                      />
                    </div>

                    {/* Transparent E-Liquid Pod Tank */}
                    <div className="w-11 h-20 bg-zinc-900/40 dark:bg-zinc-800/20 border-x border-b border-white/10 relative backdrop-blur-xs flex flex-col justify-end overflow-hidden">
                      {/* Liquid representation inside */}
                      <div 
                        className="w-full h-[80%] rounded-b-sm transition-all duration-500 relative"
                        style={{ 
                          backgroundColor: flavor.liquidColor,
                          boxShadow: `inset 0 -15px 30px ${flavor.color}10`
                        }}
                      >
                        {/* Tiny bubbles inside juice */}
                        <div className="absolute bottom-2 left-2 w-1 h-1 rounded-full bg-white/20" />
                        <div className="absolute top-4 right-3 w-1.5 h-1.5 rounded-full bg-white/10 animate-pulse" />
                      </div>

                      {/* Silver metal center air tube */}
                      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-2 bg-gradient-to-r from-zinc-400 via-zinc-200 to-zinc-500 opacity-60" />

                      {/* Small Heating Coil representation */}
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-4 h-3 bg-zinc-650 rounded-xs flex flex-col justify-center items-center opacity-70">
                        <div className="w-2.5 h-[1px] bg-zinc-400" />
                        <div className="w-2.5 h-[1px] bg-zinc-400 mt-0.5" />
                      </div>
                    </div>

                    {/* Metallic Gold Connector Base */}
                    <div className="w-9 h-2 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 rounded-b-xs flex justify-around px-2 py-0.5 shadow-sm">
                      <div className="w-1.5 h-full bg-zinc-900/60 rounded-full" />
                      <div className="w-1.5 h-full bg-zinc-900/60 rounded-full" />
                    </div>
                  </div>
                </div>

                {/* ── Title, Flavor and Price ── */}
                <div className="text-center space-y-1.5 flex-grow flex flex-col justify-end">
                  <h3 className={`text-base font-black ${isLight ? "text-zinc-950" : "text-white"}`}>
                    {flavor.name}
                  </h3>
                  <p className="text-xs font-bold text-red-500 dark:text-red-400">
                    {flavor.note}
                  </p>
                  <p className={`text-[11px] font-medium italic leading-relaxed py-1.5 px-2 ${isLight ? "text-zinc-600" : "text-zinc-400"}`}>
                    "{flavor.description}"
                  </p>
                  <p className={`text-[10px] font-bold ${isLight ? "text-zinc-500" : "text-zinc-400"}`}>
                    Strength: {flavor.strength}
                  </p>
                  <p className={`text-sm font-black pt-1 ${isLight ? "text-black" : "text-white"}`}>
                    AED {flavor.price}
                  </p>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
