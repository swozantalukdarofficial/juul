"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Truck, ShieldCheck, RotateCcw } from "lucide-react";

export default function ProductSpecs({ category, theme }) {
  const [activeTab, setActiveTab] = useState("specs");
  const isLight = theme === "light";

  const getSpecs = () => {
    switch (category) {
      case "pods":
        return [
          { title: "E-Liquid Capacity", desc: "0.7 mL per pod. Carefully formulated for consistent flavor and vapor production from the first puff to the last.", image: "/juul-bundle.png" },
          { title: "Nicotine Strengths", desc: "Available in 1.8%, 3.0% (30mg), and 5.0% (50mg) to satisfy your specific nicotine preference.", image: "/deal-bundle.png" },
          { title: "Coil Technology", desc: "1.6 ohm Nichrome coil provides the perfect temperature control for a smooth and satisfying hit every time.", image: "/juul2-device.png" },
          { title: "Puff Count", desc: "Delivers approximately 200 puffs per pod depending on your individual vaping habits and puff duration.", image: "/juul-bundle.png" },
          { title: "Premium Ingredients", desc: "Crafted using a precise blend of Propylene glycol, Glycerin, Nicotine, Benzoic acid, and high-quality Flavorings.", image: "/deal-bundle.png" }
        ];
      case "accessories":
        return [
          { title: "Universal Compatibility", desc: "Seamlessly works with JUUL 1 & JUUL 2 devices depending on the specific product variant you choose.", image: "/juul-bundle.png" },
          { title: "Premium Build", desc: "Crafted from high-grade silicone, aluminum, and braided nylon for maximum durability and a premium feel.", image: "/deal-bundle.png" },
          { title: "Rapid Charging", desc: "Get back to full battery quickly with optimized 45-60 minutes charging speeds for all dock accessories.", image: "/juul2-device.png" },
          { title: "Safety Certifications", desc: "Fully certified with CE, RoHS, and FCC standards to ensure maximum safety during everyday use.", image: "/juul-bundle.png" },
          { title: "Manufacturer Warranty", desc: "Includes a comprehensive 1-Year Manufacturer Warranty covering all defects and quality issues.", image: "/deal-bundle.png" },
        ];
      default: // kits
        return [
          { title: "Compact Dimensions", desc: "9.48 cm x 1.51 cm x 0.7 cm. Ultra-portable and sleek design that fits perfectly in your pocket or the palm of your hand.", image: "/juul-bundle.png" },
          { title: "Advanced Battery", desc: "280 mAh Rechargeable capacity. Built to last all day with optimal usage and features rapid magnetic charging via USB dock.", image: "/deal-bundle.png" },
          { title: "Temperature Control", desc: "Nichrome coil temperature control heating ensures smooth, consistent vapor without burnt hits or liquid leakage.", image: "/juul2-device.png" },
          { title: "Lightweight Design", desc: "Weighing only 14 grams, the device is incredibly light, making it comfortable to hold and unnoticeable in your pocket.", image: "/juul-bundle.png" },
          { title: "Smart Interface", desc: "Features an intuitive LED indicator for battery life and a secure magnetic USB dock connection for effortless charging.", image: "/deal-bundle.png" },
        ];
    }
  };

  const getBoxContents = () => {
    switch (category) {
      case "pods":
        return [
          "Genuine pre-filled JUUL Pods (Select pack size)",
          "Freshness-sealed blister packaging",
          "Flavor profile user guide",
          "Authenticity sticker with security QR code",
        ];
      case "accessories":
        return [
          "Authentic JUUL accessory item",
          "User guide & setup instructions",
          "Warranty information leaflet",
          "Premium retail packaging",
        ];
      default: // kits
        return [
          "Rechargeable JUUL Smart Device",
          "Magnetic wireless USB Charging Dock",
          "Starter Pod pack (Included in custom bundles)",
          "Full Instruction guide & 2-year warranty card",
        ];
    }
  };

  const specsList = getSpecs();
  const boxContents = getBoxContents();

  const renderContent = () => {
    switch (activeTab) {
      case "box":
        return (
          <ul className={`space-y-3 text-xs font-light ${isLight ? "text-zinc-650" : "text-zinc-400"}`}>
            {boxContents.map((item, idx) => (
              <motion.li 
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                key={idx} 
                className="flex items-center gap-2.5 py-1.5 border-b border-zinc-100 dark:border-white/5 last:border-none"
              >
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        );
      case "shipping":
        return (
          <div className={`space-y-4 text-xs font-light ${isLight ? "text-zinc-650" : "text-zinc-400"}`}>
            <div className="flex gap-3 items-start border-b border-zinc-100 dark:border-white/5 pb-3">
              <Truck className="w-5 h-5 text-emerald-500 flex-shrink-0" />
              <div>
                <h5 className={`font-bold mb-0.5 ${isLight ? "text-zinc-800" : "text-white"}`}>Same Day Delivery</h5>
                <p>Order within Dubai, Sharjah, & Ajman before 2:00 PM for same-day delivery. Abu Dhabi & others delivered in 24-48 hrs.</p>
              </div>
            </div>
            <div className="flex gap-3 items-start border-b border-zinc-100 dark:border-white/5 pb-3">
              <ShieldCheck className="w-5 h-5 text-emerald-500 flex-shrink-0" />
              <div>
                <h5 className={`font-bold mb-0.5 ${isLight ? "text-zinc-800" : "text-white"}`}>Age Verification</h5>
                <p>Strictly for adults 18+ (21+ depending on region). Valid ID check is mandatory at the time of delivery.</p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <RotateCcw className="w-5 h-5 text-emerald-500 flex-shrink-0" />
              <div>
                <h5 className={`font-bold mb-0.5 ${isLight ? "text-zinc-800" : "text-white"}`}>Return Policy</h5>
                <p>Hassle-free 7-day returns on unopened, sealed products. Defective devices covered under standard manufacturer warranty.</p>
              </div>
            </div>
          </div>
        );
      default: // specs
        return (
          <div className="space-y-4 mt-2">
            {specsList.map((item, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                key={idx}
                className={`flex flex-col sm:flex-row items-center gap-4 sm:gap-6 p-4 rounded-2xl border transition-all hover:scale-[1.01] ${
                  isLight ? "bg-white border-zinc-200 shadow-sm" : "bg-[#121214] border-white/5 hover:border-white/10 shadow-lg"
                }`}
              >
                {/* Left: Text Content */}
                <div className="flex-1 space-y-1.5 text-center sm:text-left">
                  <h4 className={`text-sm sm:text-[15px] font-extrabold uppercase tracking-wide ${isLight ? "text-zinc-900" : "text-white"}`}>
                    {item.title}
                  </h4>
                  <p className={`text-[11px] sm:text-xs leading-relaxed ${isLight ? "text-zinc-600" : "text-zinc-400"}`}>
                    {item.desc}
                  </p>
                </div>

                {/* Right: Image */}
                <div className={`w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center p-2 border ${
                  isLight ? "bg-zinc-50 border-zinc-100" : "bg-black/50 border-white/5"
                }`}>
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-contain hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        );
    }
  };

  return (
    <div className={`pt-6 border-t ${isLight ? "border-zinc-100" : "border-white/5"}`}>
      {/* Tabs list */}
      <div className={`flex gap-6 border-b pb-2 mb-5 ${isLight ? "border-zinc-100" : "border-white/5"}`}>
        {[
          { id: "specs", label: "Specifications" },
          { id: "box", label: "What's In The Box" },
          { id: "shipping", label: "Delivery & Returns" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`text-xs uppercase font-bold tracking-widest pb-1 transition-all cursor-pointer relative ${
              activeTab === tab.id
                ? isLight 
                  ? "text-blue-600 border-b-2 border-blue-600" 
                  : "text-emerald-400 border-b-2 border-emerald-400"
                : isLight
                ? "text-zinc-400 hover:text-zinc-900"
                : "text-zinc-500 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tabs Content */}
      <div className="min-h-[140px] pr-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
