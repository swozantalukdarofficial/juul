"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, ShieldCheck, Zap, Layers, RefreshCw, Eye } from "lucide-react";

export default function SamsungShowcase({ theme }) {
  const [isExploded, setIsExploded] = useState(true);
  const [viewMode, setViewMode] = useState("real"); // 'real' | 'blueprint' | 'tech'
  const [selectedColor, setSelectedColor] = useState("gray");

  const colors = {
    gray: { name: "Titanium Gray", hex: "#7E8085", bg: "bg-zinc-500", border: "border-zinc-400" },
    red: { name: "Titanium Red", hex: "#EF4444", bg: "bg-red-600", border: "border-red-400" },
    black: { name: "Titanium Black", hex: "#18181B", bg: "bg-zinc-900", border: "border-zinc-800" },
    silver: { name: "Titanium Silver", hex: "#E3E4E6", bg: "bg-zinc-200", border: "border-white" },
  };

  const layers = [
    {
      id: "pod",
      name: "Smart Aerosol Pod",
      tech: "Dual-chamber leakproof pod containing signature handcrafted pod flavors with precision intake channels.",
      specs: "2.0ml Capacity // Leak-Proof Seal",
      icon: <Layers className="w-4 h-4 text-cyan-500" />,
      component: (
        <div className="w-16 h-20 bg-cyan-500/10 border border-cyan-500/30 rounded-t-lg flex flex-col justify-between p-1.5 backdrop-blur-sm relative">
          <div className="w-10 h-3 bg-black/80 rounded-sm mx-auto flex items-center justify-center">
            <div className="w-5 h-[1px] bg-white/20" />
          </div>
          <div className="w-full h-8 bg-cyan-500/20 rounded-sm border border-cyan-500/10 flex items-end relative overflow-hidden">
            <motion.div 
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="w-full h-2/3 bg-cyan-500/30"
            />
          </div>
          <span className="text-[7px] text-cyan-500 font-mono tracking-widest text-center">POD_V3</span>
        </div>
      ),
    },
    {
      id: "coil",
      name: "Aero-Core Atomizer",
      tech: "Sleek spiral micro-coil engineered with gold-plated connector nodes. Regulates combustion 100 times per second.",
      specs: "1.2Ω Impedance // Gold-Plated Node",
      icon: <RefreshCw className="w-4 h-4 text-zinc-400" />,
      component: (
        <div className="w-16 h-10 flex flex-col items-center justify-center relative">
          <div className="w-1 h-8 bg-zinc-400 border border-zinc-500/30 rounded-full flex flex-col justify-around py-1">
            <div className="w-2 h-0.5 bg-amber-500 self-center" />
            <div className="w-2 h-0.5 bg-amber-500 self-center" />
            <div className="w-2 h-0.5 bg-amber-500 self-center" />
          </div>
          <div className="w-8 h-2 bg-zinc-550/20 border border-zinc-700/40 rounded-full mt-1" />
        </div>
      ),
    },
    {
      id: "casing",
      name: "Anodized Titanium Casing",
      tech: "Crafted with aerospace-grade Titanium alloy, offering unparalleled structural integrity with an ultra-premium satin touch.",
      specs: "0.8mm Thickness // Grade 5 Titanium",
      icon: <Layers className="w-4 h-4 text-zinc-500" />,
      component: (
        <div 
          className="w-16 h-28 rounded-md border flex items-center justify-center relative overflow-hidden transition-all duration-700 shadow-lg"
          style={{ 
            backgroundColor: viewMode === "blueprint" ? "rgba(6,182,212,0.05)" : colors[selectedColor].hex,
            borderColor: viewMode === "blueprint" ? "rgba(6,182,212,0.4)" : "#ffffff30"
          }}
        >
          {viewMode === "blueprint" && (
            <div className="absolute inset-0 border border-dashed border-cyan-500/30 bg-cyan-950/20" />
          )}
          <span className={`text-[8px] font-black tracking-widest rotate-90 uppercase ${viewMode === "blueprint" ? "text-cyan-400" : "text-black/30"}`}>
            SAMSUNG
          </span>
          <div 
            className="absolute bottom-2 w-1.5 h-1.5 rounded-full transition-colors duration-500" 
            style={{ backgroundColor: viewMode === "blueprint" ? "#06b6d4" : "#ffffff" }}
          />
        </div>
      ),
    },
    {
      id: "chip",
      name: "Samsung Exynos-V Core",
      tech: "State-of-the-art microprocessor driving advanced aerosol physics, real-time safety, and precise heat flow analytics.",
      specs: "V-Core Chip // 100Hz Dynamic Mod",
      icon: <Cpu className="w-4 h-4 text-cyan-500" />,
      component: (
        <div className="w-16 h-12 bg-zinc-900 border border-cyan-500/40 rounded-md flex flex-col justify-around p-1 font-mono text-[6px] relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.1),transparent)] pointer-events-none" />
          <div className="flex justify-between items-center px-1">
            <Cpu className="w-2 h-2 text-cyan-400 animate-pulse" />
            <span className="text-cyan-400 scale-[0.8] origin-right font-black">EXYNOS_V</span>
          </div>
          <div className="h-0.5 bg-cyan-950 rounded-full w-full overflow-hidden relative">
            <motion.div 
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="absolute h-full w-1/3 bg-cyan-500"
            />
          </div>
          <span className="text-zinc-500 text-center scale-[0.7] tracking-tighter">TEMP_STABLE // 195C</span>
        </div>
      ),
    },
    {
      id: "battery",
      name: "Solid-State Power Cell",
      tech: "Safe solid-state battery technology offering efficient power output, rapid charging rates, and extensive longevity.",
      specs: "500mAh Solid Cell // 15-Min 80%",
      icon: <Zap className="w-4 h-4 text-emerald-500" />,
      component: (
        <div className="w-14 h-24 bg-zinc-950 border border-zinc-800 rounded-lg flex flex-col justify-between p-1.5 font-mono text-[7px] text-zinc-500 relative">
          <div className="absolute inset-x-0 top-0 h-1 bg-emerald-500/20 border-b border-emerald-500/20" />
          <span className="rotate-90 origin-left translate-x-2 translate-y-3 font-bold tracking-wider text-emerald-500">SOLID_STATE</span>
          <span className="text-[6px] text-zinc-650 text-right self-end mt-auto">500MAH</span>
        </div>
      ),
    },
    {
      id: "base",
      name: "Magnetic Charging Dock",
      tech: "Solid titanium magnetic snap base with triple-point safety connectivity. Seamlessly locks and guides the docking process.",
      specs: "Magnetic Snap // Brass Node Sync",
      icon: <ShieldCheck className="w-4 h-4 text-zinc-400" />,
      component: (
        <div className="w-16 h-8 bg-zinc-900 border border-zinc-700/50 rounded-b-lg flex flex-col justify-end items-center p-1">
          <div className="flex gap-1.5 mb-1">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          </div>
          <div className="w-10 h-0.5 bg-zinc-600 rounded-full" />
        </div>
      ),
    },
  ];

  const isLight = theme === "light";

  return (
    <section className={`py-24 transition-colors duration-500 ${isLight ? "bg-white text-zinc-900" : "bg-[#070708] text-white"} relative overflow-hidden`}>
      {/* Background patterns */}
      {isLight ? (
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none opacity-40" />
      ) : (
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808006_1px,transparent_1px),linear-gradient(to_bottom,#80808006_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-60" />
      )}

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10 w-full">
        
        {/* Left Column: Interactive Settings and Samsung Tech Typography */}
        <div className="lg:col-span-6 space-y-8 text-center lg:text-left">
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest font-mono ${
                isLight ? "bg-zinc-100 text-zinc-800 border border-zinc-200" : "bg-white/[0.02] border border-white/10 text-zinc-300"
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-red-500" /> SAMSUNG LABS // SMART_AEROSOL
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05]"
            >
              Galaxy Vape Pro <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800 dark:from-red-400 dark:to-red-600">
                Precision Assembly.
              </span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={`text-sm sm:text-base font-light leading-relaxed max-w-xl mx-auto lg:mx-0 ${isLight ? "text-zinc-600" : "text-zinc-400"}`}
          >
            Explore our state-of-the-art modular architecture. Equipped with Samsung Exynos-V chipset for micro-temperature stabilization, grade 5 Titanium metal finish, and solid-state safety battery.
          </motion.p>

          {/* Interactive controls */}
          <div className="space-y-6 max-w-lg mx-auto lg:mx-0 text-left pt-4">
            {/* View Mode Controls */}
            <div className="space-y-2">
              <span className={`text-[10px] font-black uppercase tracking-widest font-mono block ${isLight ? "text-zinc-500" : "text-zinc-400"}`}>
                [01] CHOOSE LAB ENGINE VIEW MODE
              </span>
              <div className={`grid grid-cols-3 gap-2 p-1 rounded-xl ${isLight ? "bg-zinc-100" : "bg-white/5 border border-white/10"}`}>
                {["real", "blueprint", "tech"].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className={`py-2.5 rounded-lg text-[10px] font-black tracking-widest uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      viewMode === mode
                        ? isLight
                          ? "bg-white text-red-600 shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
                          : "bg-white/10 text-red-400 border border-white/10"
                        : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                    }`}
                  >
                    <Eye className="w-3 h-3" /> {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* Colors Grid */}
            <div className="space-y-2">
              <span className={`text-[10px] font-black uppercase tracking-widest font-mono block ${isLight ? "text-zinc-500" : "text-zinc-400"}`}>
                [02] CHOOSE PREMIUM TITANIUM SHELL
              </span>
              <div className="flex gap-3">
                {Object.keys(colors).map((key) => (
                  <button
                    key={key}
                    onClick={() => setSelectedColor(key)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all text-xs font-bold cursor-pointer ${
                      selectedColor === key
                        ? isLight
                          ? "bg-zinc-100 border-zinc-400 shadow-sm"
                          : "bg-white/10 border-white/30"
                        : isLight
                        ? "border-zinc-200 opacity-60 hover:opacity-100 bg-transparent"
                        : "border-white/5 opacity-50 hover:opacity-90 bg-transparent"
                    }`}
                  >
                    <span className={`w-3.5 h-3.5 rounded-full ${colors[key].bg} border ${colors[key].border}`} />
                    <span className={isLight ? "text-zinc-800" : "text-white"}>{colors[key].name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Exploded Slider / Assemble Action */}
            <div className="pt-4 flex items-center justify-between gap-4">
              <div>
                <p className={`text-xs font-bold ${isLight ? "text-zinc-700" : "text-zinc-300"}`}>Modular Separation View</p>
                <p className="text-[10px] text-zinc-500 font-mono">Control assembly depth instantly</p>
              </div>
              <button
                onClick={() => setIsExploded(!isExploded)}
                className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest cursor-pointer transition-all shadow-md ${
                  isExploded
                    ? "bg-red-600 text-white hover:bg-red-700"
                    : isLight
                    ? "bg-zinc-900 text-white hover:bg-black"
                    : "bg-white text-zinc-950 hover:bg-zinc-200"
                }`}
              >
                {isExploded ? "Assemble Core" : "Explode Core"}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Samsung Exploded / Blueprint Canvas */}
        <div className="lg:col-span-6 flex items-center justify-center min-h-[600px] relative select-none">
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] dark:opacity-[0.04] pointer-events-none">
            <div className="w-[500px] h-[500px] rounded-full border-[8px] border-dashed border-current animate-[spin_60s_linear_infinite]" />
          </div>

          {/* Staggered Vertical Exploded Layers */}
          <div className="flex flex-col items-center justify-center relative py-12 w-full max-w-[280px]">
            {layers.map((layer, index) => {
              // Calculate custom vertical spacing based on state
              const offsetValue = isExploded ? (index - 2.5) * 85 : 0;
              const isHoveredLayer = false; // We can handle custom hover descriptions

              return (
                <motion.div
                  key={layer.id}
                  animate={{ 
                    y: offsetValue,
                    scale: isExploded ? 0.95 : 1,
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 140, 
                    damping: 24, 
                    delay: index * 0.04 
                  }}
                  className="absolute z-10 group/layer cursor-pointer flex items-center justify-center w-full"
                >
                  {/* Exploded Tech Callout panel (Pristine Samsung-style minimalist pointer) */}
                  <AnimatePresence>
                    {isExploded && (
                      <motion.div
                        initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className={`absolute hidden lg:flex flex-col w-[200px] p-4.5 rounded-2xl border backdrop-blur-md text-left z-20 pointer-events-none transition-all ${
                          index % 2 === 0 
                            ? "left-full ml-10 origin-left" 
                            : "right-full mr-10 origin-right"
                        } ${
                          isLight 
                            ? "bg-white/95 border-zinc-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.05)]" 
                            : "bg-zinc-950/90 border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.7)]"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1.5">
                          {layer.icon}
                          <span className={`text-[10px] font-black uppercase tracking-wider ${isLight ? "text-zinc-800" : "text-white"}`}>{layer.name}</span>
                        </div>
                        <p className={`text-[9px] font-light leading-relaxed mb-2.5 ${isLight ? "text-zinc-500" : "text-zinc-400"}`}>{layer.tech}</p>
                        <div className={`text-[8px] font-mono font-bold border-t pt-2 ${isLight ? "border-zinc-100 text-red-600" : "border-white/5 text-red-400"}`}>
                          {layer.specs}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Component design vector */}
                  <div className="relative group-hover/layer:scale-105 transition-transform duration-300">
                    {layer.component}
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
