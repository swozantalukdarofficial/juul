"use client";

import { motion } from "framer-motion";
import { Battery, Zap, Droplet, Smartphone, ShieldCheck, Box, Activity, Bluetooth } from "lucide-react";

export default function ProductTechSpecs({ product, theme }) {
  const isLight = theme === "light";

  // Dynamic specs based on product type
  const getSpecs = () => {
    if (product?.category === "kits") {
      return [
        { icon: Battery, label: "Battery Capacity", value: product.version === "juul2" ? "350 mAh (Extended Life)" : "200 mAh (Classic)" },
        { icon: Zap, label: "Charging Type", value: "Magnetic USB Fast Dock" },
        { icon: Droplet, label: "Pod Capacity", value: product.version === "juul2" ? "1.2 mL" : "0.7 mL" },
        { icon: Bluetooth, label: "Connectivity", value: product.version === "juul2" ? "Bluetooth App Enabled" : "None" },
        { icon: Activity, label: "Draw Type", value: "MTL (Mouth to Lung)" },
        { icon: Box, label: "Material", value: "Premium Anodized Aluminum" },
      ];
    } else if (product?.category === "pods") {
      return [
        { icon: Droplet, label: "Liquid Capacity", value: product.version === "juul2" ? "1.2 mL per pod" : "0.7 mL per pod" },
        { icon: Activity, label: "Nicotine Strength", value: "3.0% (30mg) / 5.0% (50mg)" },
        { icon: ShieldCheck, label: "Ingredients", value: "Propylene Glycol, Glycerol, Nicotine, Flavorings" },
        { icon: Box, label: "Pack Size", value: "2-Pack / 4-Pack Available" },
        { icon: Zap, label: "Coil Technology", value: "Cotton Wick / NiChrome" },
        { icon: Activity, label: "Estimated Puffs", value: product.version === "juul2" ? "Approx. 350 puffs" : "Approx. 200 puffs" },
      ];
    } else {
      return [
        { icon: Box, label: "Material", value: "Premium Grade Materials" },
        { icon: Smartphone, label: "Compatibility", value: product?.version === "juul2" ? "JUUL 2 Devices Only" : "JUUL 1 Devices Only" },
        { icon: ShieldCheck, label: "Quality Assurance", value: "100% Authentic Original" },
        { icon: Activity, label: "Warranty", value: "1-Year Manufacturer Warranty" }
      ];
    }
  };

  const specs = getSpecs();

  return (
    <section className={`py-16 md:py-28 border-y transition-colors duration-700 relative overflow-hidden ${
      isLight ? "bg-zinc-50/50 border-zinc-200" : "bg-[#09090A] border-white/5"
    }`}>
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className={`absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full blur-[120px] opacity-20 ${isLight ? "bg-red-200" : "bg-red-950/40"}`}></div>
        <div className={`absolute bottom-[10%] -left-[10%] w-[40%] h-[40%] rounded-full blur-[100px] opacity-20 ${isLight ? "bg-red-200" : "bg-red-950/40"}`}></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center lg:items-start">
          
          {/* Left Text Side */}
          <div className="lg:w-1/3 space-y-6 text-center lg:text-left">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${
                isLight ? "bg-white border-zinc-200 shadow-sm" : "bg-white/5 border-white/10"
              }`}
            >
              <Zap className={`w-4 h-4 ${isLight ? "text-red-500" : "text-red-400"}`} />
              <span className={`text-[10px] sm:text-xs font-black uppercase tracking-widest ${isLight ? "text-zinc-700" : "text-zinc-300"}`}>
                Technical Specifications
              </span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className={`text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.1] ${
              isLight ? "text-zinc-950" : "text-white"
            }`}>
              Engineered for <br className="hidden lg:block" /> 
              <span className="text-red-500">Excellence</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className={`text-sm sm:text-base leading-relaxed ${isLight ? "text-zinc-600" : "text-zinc-400"}`}
            >
              Precision crafted components ensure a consistent, satisfying experience. 
              Review the detailed specifications of the <strong className={isLight ? "text-zinc-900" : "text-white"}>{product?.name}</strong> below.
            </motion.p>
          </div>

          {/* Right Grid Side */}
          <div className="lg:w-2/3 w-full grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {specs.map((spec, index) => {
              const Icon = spec.icon;
              
              // Red theme classes
              const hoverBorderClass = isLight 
                ? "hover:border-red-300 hover:shadow-red-500/10" 
                : "hover:border-red-500/30 hover:shadow-[0_8px_30px_rgba(239,68,68,0.15)]";
                  
              const iconContainerClass = isLight
                ? "bg-gradient-to-br from-red-50 to-orange-50 text-red-500 shadow-inner"
                : "bg-gradient-to-br from-red-500/10 to-orange-500/10 text-red-400";
                  
              const labelHoverClass = isLight ? "group-hover:text-red-500" : "group-hover:text-red-400";

              return (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  key={index} 
                  className={`group flex items-center gap-5 p-5 sm:p-6 rounded-3xl border transition-all duration-500 cursor-default hover:-translate-y-1 ${
                    isLight 
                      ? `bg-white/80 backdrop-blur-xl border-zinc-200/80 hover:shadow-xl ${hoverBorderClass}` 
                      : `bg-[#121214]/80 backdrop-blur-xl border-white/5 ${hoverBorderClass}`
                  }`}
                >
                  <div className={`p-3.5 sm:p-4 rounded-2xl flex-shrink-0 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 ${iconContainerClass}`}>
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className={`text-[10px] sm:text-xs font-black uppercase tracking-widest mb-1 truncate text-zinc-500 transition-colors ${labelHoverClass}`}>
                      {spec.label}
                    </h4>
                    <p className={`text-sm sm:text-base font-bold truncate ${
                      isLight ? "text-zinc-900" : "text-zinc-100"
                    }`}>
                      {spec.value}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
