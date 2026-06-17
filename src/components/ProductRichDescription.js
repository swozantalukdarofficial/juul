"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ShieldAlert, Sparkles, CheckSquare, Zap, Leaf, Truck, RefreshCcw } from "lucide-react";

export default function ProductRichDescription({ product, theme }) {
  const isLight = theme === "light";
  const [activeTab, setActiveTab] = useState("description");

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
    <div className={`mt-6 pt-10 border-t ${isLight ? "border-zinc-200" : "border-white/5"} overflow-hidden`}>
      
      {/* ═══ TAB NAVIGATION ═══ */}
      <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10">
        <button 
          onClick={() => setActiveTab("description")}
          className={`px-6 py-3 text-[11px] sm:text-xs font-black uppercase tracking-widest rounded-xl border transition-all duration-300 ${
            activeTab === "description"
              ? isLight 
                ? "bg-zinc-950 text-white border-zinc-950 shadow-md" 
                : "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.1)]"
              : isLight 
                ? "bg-zinc-50 text-zinc-500 border-zinc-200 hover:border-zinc-300" 
                : "bg-transparent text-zinc-400 border-zinc-800 hover:border-zinc-600 hover:text-white"
          }`}
        >
          Description
        </button>
        <button 
          onClick={() => setActiveTab("shipping")}
          className={`px-6 py-3 text-[11px] sm:text-xs font-black uppercase tracking-widest rounded-xl border transition-all duration-300 ${
            activeTab === "shipping"
              ? isLight 
                ? "bg-zinc-950 text-white border-zinc-950 shadow-md" 
                : "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.1)]"
              : isLight 
                ? "bg-zinc-50 text-zinc-500 border-zinc-200 hover:border-zinc-300" 
                : "bg-transparent text-zinc-400 border-zinc-800 hover:border-zinc-600 hover:text-white"
          }`}
        >
          Shipping & Return
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "description" ? (
          <motion.div 
            key="description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-8 lg:space-y-10"
          >
            {/* ═══ DYNAMIC TEXT SEO OVERVIEW ═══ */}
            <div className={`p-8 lg:p-12 rounded-[2rem] border ${isLight ? "bg-white border-zinc-200" : "bg-zinc-900/40 border-white/5"} space-y-10`}>
              {/* Text Section 1 */}
              <div className="space-y-4 text-center sm:text-left">
                <h2 className={`text-xl sm:text-2xl font-black ${isLight ? "text-blue-900" : "text-blue-400"}`}>
                  Buy {product.name} in UAE – Premium Vaping Experience
                </h2>
                <p className={`text-[13px] sm:text-sm leading-relaxed font-medium ${isLight ? "text-zinc-600" : "text-zinc-400"}`}>
                  If you are searching for a device that combines advanced technology and a premium experience, the {product.name} is made to meet this need. It features a sleek body, advanced coil technology, and an extraordinary battery life. This is a modern vape device that ensures smooth flavor delivery, dense vapor clouds, and a satisfying throat hit from the first to the last puff. It stands out in the Dubai vape market for its convenience and uncompromised performance.
                </p>
                <p className={`text-[13px] sm:text-sm leading-relaxed font-medium ${isLight ? "text-zinc-600" : "text-zinc-400"}`}>
                  You can buy the {product.name} in the UAE directly from our store. We offer competitive prices and fast express shipping. This device is an excellent choice if you are looking for a reliable, long-lasting device, or just want to enjoy rich, authentic flavors. It is a highly popular option for adult users across the Emirates.
                </p>
              </div>

              {/* Text Section 2 (Product Overview with Border) */}
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-1 h-6 sm:h-7 bg-orange-500 rounded-full mr-3"></div>
                  <h3 className={`text-lg sm:text-xl font-black ${isLight ? "text-blue-900" : "text-blue-400"}`}>
                    {product.name} – Product Overview
                  </h3>
                </div>
                <p className={`text-[13px] sm:text-sm leading-relaxed font-medium ${isLight ? "text-zinc-600" : "text-zinc-400"}`}>
                  This premium device is engineered for users who demand modern convenience, flavor consistency, and longevity. Its compact design makes it easy to carry as a daily portable device. It features advanced heating technology to enhance vapor density, ensuring every draw delivers full flavor. The optimized battery supports extended use, while the high-capacity setup guarantees long sessions without flavor fade. The balanced nicotine strength provides smooth throat hits, making it a strong smoking alternative for adult users. The inhale-activated system eliminates buttons and offers an easy, natural draw.
                </p>
                <p className={`text-[13px] sm:text-sm leading-relaxed font-medium ${isLight ? "text-zinc-600" : "text-zinc-400"}`}>
                  Safety and reliability are paramount. The design incorporates leak-proof engineering, short-circuit prevention, and overcharge safeguards, ensuring peace of mind across thousands of draws. It fully complies with ESMA standards in the UAE for electronic cigarette products and aligns perfectly with local regulations.
                </p>
                <p className={`text-[13px] sm:text-sm leading-relaxed font-medium ${isLight ? "text-zinc-600" : "text-zinc-400"}`}>
                  Whether you prefer classic tobacco, refreshing mint, or exotic fruity blends, this system offers a diverse flavor portfolio designed to satisfy every palate. Combined with its precision atomizer, every flavor profile is delivered with clarity, richness, and a smooth exhale. This makes it a highly dependable device in the growing UAE vaping culture.
                </p>
              </div>
            </div>

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
          </motion.div>
        ) : (
          <motion.div 
            key="shipping"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className={`p-8 lg:p-12 rounded-[2rem] border ${isLight ? "bg-white border-zinc-200" : "bg-zinc-900/40 border-white/5"} space-y-10`}
          >
            <div className="space-y-4">
              <h3 className={`text-2xl sm:text-3xl font-black ${isLight ? "text-zinc-900" : "text-white"}`}>
                Cool and Crisp: JUUL Menthol 3% Pod
              </h3>
              <p className={`text-[13px] sm:text-sm leading-relaxed font-medium ${isLight ? "text-zinc-600" : "text-zinc-400"}`}>
                Few flavors are as energizing and reviving in the vaping industry as menthol. The JUUL pods UAE Menthol 3% stands out among the variety of vaping options available because it provides a crisp and cold menthol experience with a moderate nicotine dosage. In this blog post, we’ll go into the world of this particular pod, explaining its menthol flavour profile, moderate nicotine level, and why menthol fans and those looking for a cooling vaping experience choose it.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className={`text-xl font-black ${isLight ? "text-zinc-900" : "text-white"}`}>
                Juul Pods UAE Menthol Magic:
              </h4>
              <p className={`text-[13px] sm:text-sm leading-relaxed font-medium ${isLight ? "text-zinc-600" : "text-zinc-400"}`}>
                Let’s begin by discussing the JUUL Menthol 3% pod’s menthol flavour profile. Describe how menthol gives out a chilly, refreshing feeling that makes it a favourite among people who like to get an icy blast with each puff.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className={`text-xl font-black ${isLight ? "text-zinc-900" : "text-white"}`}>
                Juul Pods UAE Menthol Nicotine Equilibrium:
              </h4>
              <p className={`text-[13px] sm:text-sm leading-relaxed font-medium ${isLight ? "text-zinc-600" : "text-zinc-400"}`}>
                Talk about the 3% nicotine content in e-liquid, which is 30 milligrammes of nicotine per millilitre. Describe how the balance of the moderate nicotine concentration provides a nice hit without being too strong. Mention that it is appropriate for both first-time vapers and seasoned vapers searching for a more comfortable experience.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className={`text-xl font-black ${isLight ? "text-zinc-900" : "text-white"}`}>
                Friendly User Interface:
              </h4>
              <p className={`text-[13px] sm:text-sm leading-relaxed font-medium ${isLight ? "text-zinc-600" : "text-zinc-400"}`}>
                Emphasise the JUUL pods’ user-friendly design by demonstrating how simple it is to insert the Menthol 3% pod into a JUUL device. Mention how the pre-filled format means there are no messy refills, making it a practical option for all vapers.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className={`text-xl font-black ${isLight ? "text-zinc-900" : "text-white"}`}>
                Nicotine Equilibrium:
              </h4>
              <p className={`text-[13px] sm:text-sm leading-relaxed font-medium ${isLight ? "text-zinc-600" : "text-zinc-400"}`}>
                Talk about the 3% nicotine content in e-liquid, which is 30 milligrams of nicotine per milliliter. Describe how the balance of the moderate nicotine concentration provides a nice hit without being too strong. Mention that it is appropriate for both first-time vapers and seasoned vapers searching for a more comfortable experience.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className={`text-xl font-black ${isLight ? "text-zinc-900" : "text-white"}`}>
                Friendly User Interface:
              </h4>
              <p className={`text-[13px] sm:text-sm leading-relaxed font-medium ${isLight ? "text-zinc-600" : "text-zinc-400"}`}>
                Emphasize the user-friendly design by demonstrating how simple it is to insert the Menthol 3% pod into a JUUL device. Mention how the pre-filled format means there are no messy refills, making it a practical option for all vapers.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
