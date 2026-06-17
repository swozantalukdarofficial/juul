"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ShieldAlert, Sparkles, CheckSquare, Zap, Leaf } from "lucide-react";

export default function ProductRichDescription({ product, theme }) {
  const isLight = theme === "light";
  if (!product) return null;

  // ─── PREMIUM ANIMATION VARIANTS ───
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const textItemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const imageContainerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };

  // Card styles for text sections
  const cardClassName = `p-8 lg:p-12 rounded-[2rem] border ${
    isLight 
      ? "bg-white border-zinc-200 shadow-sm" 
      : "bg-zinc-900/50 border-white/5"
  }`;

  // Simple premium dark background for images without any weird overlays
  const imageBgClassName = "bg-[#0b1121] border border-zinc-800 shadow-xl";

  return (
    <div className={`mt-16 pt-16 border-t ${isLight ? "border-zinc-200" : "border-white/5"} space-y-16 lg:space-y-20 overflow-hidden`}>
      
      {/* ═══ SECTION 1: POD ALIGNMENT ═══ */}
      <motion.div 
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} 
        variants={containerVariants}
        className={`${cardClassName} grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center`}
      >
        <div className="lg:col-span-7 space-y-6">
          <motion.div variants={textItemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/20">
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.15em] text-blue-600 dark:text-blue-400">Seamless Connection</span>
          </motion.div>
          
          <motion.h3 variants={textItemVariants} className={`text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.05] ${isLight ? "text-zinc-950" : "text-white"}`}>
            Precision <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-400">Pod Alignment</span>
          </motion.h3>
          
          <motion.p variants={textItemVariants} className={`text-base font-medium leading-relaxed ${isLight ? "text-zinc-600" : "text-zinc-400"}`}>
            Line up the pod with the battery opening for a flawless fit every time. The device features an advanced e-liquid chamber and internal heating post, secured by a solid teal base cap. With gold-plated contacts and a precise internal connection pin system, you are guaranteed a consistent draw with zero power loss.
          </motion.p>
          
          <motion.div variants={textItemVariants} className="space-y-3 pt-2">
            <div className="flex items-center gap-3 text-sm font-bold">
              <div className="w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center">
                <CheckSquare className="w-3.5 h-3.5 text-blue-500" />
              </div>
              <span className={isLight ? "text-zinc-800" : "text-zinc-200"}>Ergonomic Black Mouthguard</span>
            </div>
            <div className="flex items-center gap-3 text-sm font-bold">
              <div className="w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center">
                <CheckSquare className="w-3.5 h-3.5 text-blue-500" />
              </div>
              <span className={isLight ? "text-zinc-800" : "text-zinc-200"}>Central Indicator Light System</span>
            </div>
          </motion.div>
        </div>

        <motion.div variants={imageContainerVariants} className="lg:col-span-5 h-[350px] sm:h-[450px] lg:h-[550px] w-full relative">
          <div className={`w-full h-full relative rounded-[2rem] overflow-hidden group ${imageBgClassName}`}>
            <Image src="/media__1781699602201.png" alt="Pod Alignment" fill className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out" sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
        </motion.div>
      </motion.div>

      {/* ═══ SECTION 2: POD COIL ═══ */}
      <motion.div 
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} 
        variants={containerVariants}
        className={`${cardClassName} grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center lg:flex-row-reverse`}
      >
        <motion.div variants={imageContainerVariants} className="lg:col-span-5 lg:order-last h-[350px] sm:h-[450px] lg:h-[550px] w-full relative">
          <div className={`w-full h-full relative rounded-[2rem] overflow-hidden group ${imageBgClassName}`}>
            <Image src="/media__1781699607043.png" alt="Pod Coil" fill className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out" sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
        </motion.div>

        <div className="lg:col-span-7 space-y-6">
          <motion.div variants={textItemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-orange-500/10 to-rose-500/10 border border-orange-500/20">
            <Zap className="w-4 h-4 text-orange-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.15em] text-orange-600 dark:text-orange-400">Heating Technology</span>
          </motion.div>
          
          <motion.h3 variants={textItemVariants} className={`text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.05] ${isLight ? "text-zinc-950" : "text-white"}`}>
            Internal Pod Coil <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500">Technical Demo</span>
          </motion.h3>
          
          <motion.p variants={textItemVariants} className={`text-base font-medium leading-relaxed ${isLight ? "text-zinc-600" : "text-zinc-400"}`}>
            The heart of the experience lies in the 1.6-OHM Nichrome Coil, engineered as a precision MTL heating element. It sits inside a crystal-clear pod casing, utilizing an organic cotton wick and an optimized MTL airflow channel. This setup guarantees rich vapor production straight from the e-liquid reservoir.
          </motion.p>
          
          <motion.div variants={textItemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className={`p-5 rounded-2xl border transition-colors ${isLight ? "bg-white border-zinc-200 shadow-sm hover:border-zinc-300" : "bg-zinc-900/40 border-white/5 hover:border-white/10"}`}>
              <h5 className={`text-sm font-black mb-1.5 ${isLight ? "text-zinc-950" : "text-white"}`}>Pure Flavor</h5>
              <p className={`text-xs font-medium leading-relaxed ${isLight ? "text-zinc-500" : "text-zinc-400"}`}>Organic cotton wick prevents dry hits and ensures pure flavor extraction.</p>
            </div>
            <div className={`p-5 rounded-2xl border transition-colors ${isLight ? "bg-white border-zinc-200 shadow-sm hover:border-zinc-300" : "bg-zinc-900/40 border-white/5 hover:border-white/10"}`}>
              <h5 className={`text-sm font-black mb-1.5 ${isLight ? "text-zinc-950" : "text-white"}`}>No Leakage</h5>
              <p className={`text-xs font-medium leading-relaxed ${isLight ? "text-zinc-500" : "text-zinc-400"}`}>Precision-sealed casing locks in e-liquid securely under pressure.</p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* ═══ SECTION 3: USB CHARGER ═══ */}
      <motion.div 
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} 
        variants={containerVariants}
        className={`${cardClassName} grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center`}
      >
        <div className="lg:col-span-7 space-y-6">
          <motion.div variants={textItemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20">
            <Sparkles className="w-4 h-4 text-emerald-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.15em] text-emerald-600 dark:text-emerald-400">Power Delivery</span>
          </motion.div>
          
          <motion.h3 variants={textItemVariants} className={`text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.05] ${isLight ? "text-zinc-950" : "text-white"}`}>
            Compact <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400">USB Charger</span>
          </motion.h3>
          
          <motion.p variants={textItemVariants} className={`text-base font-medium leading-relaxed ${isLight ? "text-zinc-600" : "text-zinc-400"}`}>
            Experience ultimate portability for life on the go. The USB charger features an impact-resistant polymer housing and a standard Type-A USB connector that fits anywhere. The gold-plated pogo-pin contacts ensure a rapid, uninterrupted charge, extending the lifespan of your battery.
          </motion.p>

          <motion.div variants={textItemVariants} className="space-y-3 pt-2">
            <div className="flex items-center gap-3 text-sm font-bold">
              <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <CheckSquare className="w-3.5 h-3.5 text-emerald-500" />
              </div>
              <span className={isLight ? "text-zinc-800" : "text-zinc-200"}>Magnetic Docking</span>
            </div>
            <div className="flex items-center gap-3 text-sm font-bold">
              <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <CheckSquare className="w-3.5 h-3.5 text-emerald-500" />
              </div>
              <span className={isLight ? "text-zinc-800" : "text-zinc-200"}>Fast Charge Support</span>
            </div>
          </motion.div>
        </div>

        <motion.div variants={imageContainerVariants} className="lg:col-span-5 h-[350px] sm:h-[450px] lg:h-[550px] w-full relative">
          <div className={`w-full h-full relative rounded-[2rem] overflow-hidden group ${imageBgClassName}`}>
            <Image src="/media__1781699609816.png" alt="USB Charger" fill className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out" sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
        </motion.div>
      </motion.div>

      {/* ═══ SECTION 4: MTL DRAW ═══ */}
      <motion.div 
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} 
        variants={containerVariants}
        className={`${cardClassName} grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center lg:flex-row-reverse`}
      >
        <motion.div variants={imageContainerVariants} className="lg:col-span-5 lg:order-last h-[350px] sm:h-[450px] lg:h-[550px] w-full relative">
          <div className={`w-full h-full relative rounded-[2rem] overflow-hidden group ${imageBgClassName}`}>
            <Image src="/media__1781699611995.png" alt="MTL Draw" fill className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out" sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
        </motion.div>

        <div className="lg:col-span-7 space-y-6">
          <motion.div variants={textItemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
            <Leaf className="w-4 h-4 text-purple-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.15em] text-purple-600 dark:text-purple-400">Authentic Feel</span>
          </motion.div>
          
          <motion.h3 variants={textItemVariants} className={`text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.05] ${isLight ? "text-zinc-950" : "text-white"}`}>
            Mouth-To-Lung <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">(MTL) Draw</span>
          </motion.h3>
          
          <motion.p variants={textItemVariants} className={`text-base font-medium leading-relaxed ${isLight ? "text-zinc-600" : "text-zinc-400"}`}>
            Designed specifically for the traditional smoker feel. The unique airflow inlet creates a two-stage process: a smooth mouth draw followed by satisfying lung inhalation. The vapor delivery tube channels the mist perfectly from the vaporization chamber right to the mouthpiece.
          </motion.p>

          <motion.div variants={textItemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className={`p-5 rounded-2xl border transition-colors ${isLight ? "bg-white border-zinc-200 shadow-sm hover:border-zinc-300" : "bg-zinc-900/40 border-white/5 hover:border-white/10"}`}>
              <h5 className={`text-sm font-black mb-1.5 ${isLight ? "text-zinc-950" : "text-white"}`}>Stage 1: Mouth Draw</h5>
              <p className={`text-xs font-medium leading-relaxed ${isLight ? "text-zinc-500" : "text-zinc-400"}`}>Gathers rich, concentrated flavor in the mouth first.</p>
            </div>
            <div className={`p-5 rounded-2xl border transition-colors ${isLight ? "bg-white border-zinc-200 shadow-sm hover:border-zinc-300" : "bg-zinc-900/40 border-white/5 hover:border-white/10"}`}>
              <h5 className={`text-sm font-black mb-1.5 ${isLight ? "text-zinc-950" : "text-white"}`}>Stage 2: Lung Inhale</h5>
              <p className={`text-xs font-medium leading-relaxed ${isLight ? "text-zinc-500" : "text-zinc-400"}`}>Delivers the expected nicotine hit smoothly and comfortably.</p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* ═══ SECTION 5: CHARGING STATUS ═══ */}
      <motion.div 
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} 
        variants={containerVariants}
        className={`${cardClassName} grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center`}
      >
        <div className="lg:col-span-7 space-y-6">
          <motion.div variants={textItemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20">
            <ShieldAlert className="w-4 h-4 text-amber-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.15em] text-amber-600 dark:text-amber-400">Smart Diagnostics</span>
          </motion.div>
          
          <motion.h3 variants={textItemVariants} className={`text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.05] ${isLight ? "text-zinc-950" : "text-white"}`}>
            Charging Blink <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Sequence</span>
          </motion.h3>
          
          <motion.p variants={textItemVariants} className={`text-base font-medium leading-relaxed ${isLight ? "text-zinc-600" : "text-zinc-400"}`}>
            Never guess your battery status again. A successful connection is confirmed by a Green-Yellow-Red (G-Y-R) flash, indicating clean pin contact. The internal battery indicator shows solid green when charging is fully complete, so you are always ready to go.
          </motion.p>
          
          <motion.div variants={textItemVariants} className="space-y-3 pt-2">
            <div className="flex items-center gap-3 text-sm font-bold">
              <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                <CheckSquare className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
              </div>
              <span className={isLight ? "text-zinc-800" : "text-zinc-200"}>Solid Green = Fully Charged</span>
            </div>
            <div className="flex items-center gap-3 text-sm font-bold">
              <div className="w-6 h-6 rounded-full bg-yellow-500/20 flex items-center justify-center">
                <CheckSquare className="w-3.5 h-3.5 text-yellow-600 dark:text-yellow-400" />
              </div>
              <span className={isLight ? "text-zinc-800" : "text-zinc-200"}>G-Y-R Blink = Connection Secured</span>
            </div>
          </motion.div>
        </div>

        <motion.div variants={imageContainerVariants} className="lg:col-span-5 h-[350px] sm:h-[450px] lg:h-[550px] w-full relative">
          <div className={`w-full h-full relative rounded-[2rem] overflow-hidden group ${imageBgClassName}`}>
            <Image src="/media__1781699614406.png" alt="Charging Blink Sequence" fill className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out" sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
        </motion.div>
      </motion.div>

    </div>
  );
}
