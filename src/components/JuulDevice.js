"use client";

import { motion } from "framer-motion";

export default function JuulDevice({ flavorColor = "#10B981", activeFlavor = "mint", theme }) {
  // Map flavors to gradient shadows and details
  const flavorThemes = {
    mint: {
      glow: "shadow-[0_0_50px_rgba(16,185,129,0.35)]",
      ledColor: "bg-emerald-500 shadow-[0_0_15px_#a7f3d0,0_0_30px_#10b981]",
    },
    mango: {
      glow: "shadow-[0_0_50px_rgba(245,158,11,0.35)]",
      ledColor: "bg-amber-500 shadow-[0_0_15px_#fde68a,0_0_30px_#f59e0b]",
    },
    classic: {
      glow: "shadow-[0_0_50px_rgba(120,113,108,0.35)]",
      ledColor: "bg-zinc-400 shadow-[0_0_15px_#a1a1aa,0_0_30px_#78716C]",
    },
    menthol: {
      glow: "shadow-[0_0_50px_rgba(5,150,105,0.35)]",
      ledColor: "bg-emerald-600 shadow-[0_0_15px_#6ee7b7,0_0_30px_#059669]",
    }
  };

  const isLight = theme === "light";
  const activeTheme = flavorThemes[activeFlavor] || flavorThemes.mint;
  return (
    <div className={`relative w-[400px] h-[560px] flex items-center justify-center select-none ${
      isLight ? "mix-blend-multiply" : ""
    }`}>
      {/* Dynamic Vapor Clouds (Floating bubbles of smoke) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: 350, x: 50 + i * 20, opacity: 0, scale: 0.5 }}
            animate={{ 
              y: -100, 
              x: [50 + i * 20, (30 + i * 30), 80 + i * 15], 
              opacity: isLight ? [0, 0.25, 0] : [0, 0.4, 0], 
              scale: [0.5, 2.2, 3.2] 
            }}
            transition={{
              duration: 4 + i * 0.8,
              repeat: Infinity,
              delay: i * 0.7,
              ease: "easeOut"
            }}
            className={`absolute bottom-40 w-20 h-20 rounded-full blur-2xl ${
              isLight ? "bg-zinc-300/20" : "bg-white/10"
            }`}
          />
        ))}
      </div>



      {/* The Physical Device Container (Now showcasing the real image!) */}
      <motion.div 
        initial={{ rotate: -15, y: 20, opacity: 0 }}
        animate={{ rotate: 5, y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        whileHover={{ rotate: -2, scale: 1.03 }}
        className={`relative w-36 h-[480px] flex items-center justify-center ${
          isLight ? "mix-blend-multiply" : "filter drop-shadow-[0_20px_45px_rgba(0,0,0,0.3)]"
        }`}
      >
        <img 
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsRxpaQKJx-yaAxeceU9D0KKUvvPi4A7GjRg&s"
          alt="JUUL Premium Device"
          className={`w-full h-full object-contain select-none pointer-events-none transition-all scale-[2.8] ${
            isLight ? "mix-blend-multiply" : "invert-[0.93] hue-rotate-180 brightness-[1.1] contrast-[1.05]"
          }`}
        />


        {/* Pulsing LED indicator positioned perfectly on the device light indicator hole */}
        <motion.div 
          animate={{ scale: [1, 1.25, 1], opacity: [0.9, 1, 0.9] }}
          transition={{ duration: 2, repeat: Infinity }}
          className={`absolute w-1.5 h-1.5 rounded-full transition-all duration-500 z-10 shadow-lg ${activeTheme.ledColor}`}
          style={{ 
            top: "55.8%", // Align precisely with the LED light spot on a standard JUUL device
            left: "48.5%"
          }}
        />
      </motion.div>
    </div>
  );
}
