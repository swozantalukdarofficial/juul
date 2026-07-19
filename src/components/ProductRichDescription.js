"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ShieldAlert, Sparkles, CheckSquare, Zap, Leaf, Truck, RefreshCcw, Droplet } from "lucide-react";

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
              {product.id === "juul1-slate" ? (
                <>
                  <div className="space-y-4 text-center sm:text-left">
                    <h1 className={`text-2xl sm:text-3xl font-black ${isLight ? "text-zinc-950" : "text-white"}`}>
                      Buy Juul Device in UAE - Elevate Your Vaping Experience
                    </h1>
                    <p className={`text-[13px] sm:text-sm leading-relaxed font-medium ${isLight ? "text-zinc-600" : "text-zinc-400"}`}>
                      The JUUL 1 Kit stands as an icon of modern vaping innovation. This brand combines premium design philosophy with advanced technology . JUUL starter kit UAE is made for vapers who want a simple but elevated smoking experience. This device brings together modern design, reliable performance, and easy everyday use in one compact setup. Slate JUUL 1 Pod has redefined what an everyday user expects from a vape device. This is the best cigarette alternative pod. And a lifestyle product built for elegance, convenience and effortless performance. You can Buy Juul Device in UAE from Vape Pods . We are the trusted source of authentic Juul 1 pod.
                    </p>
                    <p className={`text-[13px] sm:text-sm leading-relaxed font-medium ${isLight ? "text-zinc-600" : "text-zinc-400"}`}>
                      Luxury is evident in every detail of Slate JUUL Device. This device has a metallic finish, slim and stylish shape. That can be a fit with your lifestyle. It is the perfect size to carry in your pocket, bag or briefcase. That makes it exceptionally ideal to always carry with you. Whether you are heading to work, meeting friends, or traveling across, this pod is designed to go with you, making it one of the best portable vape UAE choices available.
                    </p>
                    <p className={`text-[13px] sm:text-sm leading-relaxed font-medium ${isLight ? "text-zinc-600" : "text-zinc-400"}`}>
                      JUUL vape Dubai is not just for aesthetics. This Juul pod UAE delivers very reliable performance throughout its service life . The core design philosophy to make a lightweight but powerful device. As a result it offers effortless portability while ensuring consistent satisfaction.
                    </p>
                    <p className={`text-[13px] sm:text-sm leading-relaxed font-medium ${isLight ? "text-zinc-600" : "text-zinc-400"}`}>
                      One of the biggest strengths of JUUL 1 pod system vape is effortless usability. It has no settings to adjust and no buttons to press. Just insert a pod and inhale. The device activates automatically and gives the signature JUUL taste in every puff.
                    </p>
                    <p className={`text-[13px] sm:text-sm leading-relaxed font-medium ${isLight ? "text-zinc-600" : "text-zinc-400"}`}>
                      The JUUL 1 Kit stands out for premium metallic finish. The sleek body structure looks very modern and feels comfortable in hand. Every detail is carefully placed to create a smooth and enjoyable experience. JUUL device UAE offers uncompromising quality to the users.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-1 h-6 sm:h-7 bg-red-500 rounded-full mr-3"></div>
                      <h3 className={`text-lg sm:text-xl font-black ${isLight ? "text-zinc-950" : "text-white"}`}>
                        JUUL 1 Kit — Everything You Need to Know
                      </h3>
                    </div>
                    <p className={`text-[13px] sm:text-sm leading-relaxed font-medium ${isLight ? "text-zinc-600" : "text-zinc-400"}`}>
                      The JUUL 1 Kit is built for exclusive users, who want a simple and premium vaping experience. This pod combines modern technology with a clean and stylish design. Makes it a very popular closed pod system in the vaping world. This Juul 1 pods compatible kit in UAE is simple to use, easy to carry and made to last long. As a complete starter kit, it has everything new users need to begin.
                    </p>
                    <p className={`text-[13px] sm:text-sm leading-relaxed font-medium ${isLight ? "text-zinc-600" : "text-zinc-400"}`}>
                      JUUL 1 is a closed pod system MTL vape. The pod, or vape cartridge, comes prefilled. Users don't have to do any refills or complex maintenance. To start Juuling you have to just insert a pod and take a puff. Replace it with a new pod after finishing one. Each JUUL refill pod is prefilled with nicotine salt e-liquid. This premium 5% nicotine pod guarantees ideal throat hit and good nicotine absorption. Each Juul 1 pod flavors Dubai is ideal for ex-smokers and cigarette smokers. Or someone looking for nicotine pod system vape or the best tobacco alternative pod UAE has to offer. If you want to buy premium pod system vape in UAE, different Juul 1 flavors are available in Dubai. Virginia Tobacco and Menthol are well appreciated. Original Slate Juul pods UAE are made for clean flavor output and ideal nicotine delivery. Each pod can last for a full day. All our JUUL products and Juul 1 flavors Dubai comply with UAE vape regulations and ESMA regulations for safety standards. So you can Buy Juul Pod Kit in UAE with confidence.
                    </p>
                    <p className={`text-[13px] sm:text-sm leading-relaxed font-medium ${isLight ? "text-zinc-600" : "text-zinc-400"}`}>
                      Simplicity defines JUUL 1. This e-cigarette is inhale activated. There is no button or complicated settings to deal with. Just draw from the mouthpiece, and the vape activates automatically. This feature gives the vibes of natural smoking experience to the new vapers.
                    </p>
                    <p className={`text-[13px] sm:text-sm leading-relaxed font-medium ${isLight ? "text-zinc-600" : "text-zinc-400"}`}>
                      Juul 1 Tobacco pod has a compact but powerful battery setup inside. It can be enough to keep up with your day without constant recharging. When recharging needs, the magnetic USB charging dock makes the process quick and easy. The dock ensures secure connectivity and smart protection against overcharging or overheating. Juul 1 starter pack takes less than an hour to charge zero to full.
                    </p>
                    <p className={`text-[13px] sm:text-sm leading-relaxed font-medium ${isLight ? "text-zinc-600" : "text-zinc-400"}`}>
                      There is an LED indicator in this device. It shows real-time battery status. Just double tap the body and it indicates the battery level. This feature eliminates the guesswork. You can know exactly when to charge your JUUL.
                    </p>
                    <p className={`text-[13px] sm:text-sm leading-relaxed font-medium ${isLight ? "text-zinc-600" : "text-zinc-400"}`}>
                      Slate JUUL kit Dubai makes it easy to check your e-liquid level. A transparent hexagonal window is built into the pod. You see through how much e-liquid is left. This thoughtful detail lets you know when it is time to replace your pod. You can avoid unexpected interruptions during uses.
                    </p>
                    <p className={`text-[13px] sm:text-sm leading-relaxed font-medium ${isLight ? "text-zinc-600" : "text-zinc-400"}`}>
                      JUUL's luxury truly shows in its design and performance it offers. The slim metallic body feels solid and premium. The outlook, hand feel, size, fit and finish of each component are perfectly aligned. Juul 1 starter pack is a fantastic choice. The small size makes perfect for everyday carry. It can slip easily into your pocket, bag or jacket. It can go wherever you go. A sleek vape device ready when you need it.
                    </p>
                    <p className={`text-[13px] sm:text-sm leading-relaxed font-medium ${isLight ? "text-zinc-600" : "text-zinc-400"}`}>
                      For vapers looking for the best vape, it will be a smart and sophisticated choice to buy Juul 1 e-cigarette. Modern technology, premium design, and everyday simplicity brings it together in one compact package. If you value quality in the things you use, this original JUUL 1 device UAE is made for you. Vape Pods is a trusted Juul vape Shop in UAE and a JUUL vape store Dubai residents rely on. We make it easy to buy JUUL pods online UAE wide with confidence. We have a total collection of Juul 1 pod accessories. You can buy JUUL accessories UAE wide to complete your setup.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  {/* Text Section 1 */}
                  <div className="space-y-4 text-center sm:text-left">
                    <h2 className={`text-xl sm:text-2xl font-black ${isLight ? "text-zinc-950" : "text-white"}`}>
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
                      <div className="w-1 h-6 sm:h-7 bg-red-500 rounded-full mr-3"></div>
                      <h3 className={`text-lg sm:text-xl font-black ${isLight ? "text-zinc-950" : "text-white"}`}>
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
                </>
              )}
            </div>

            {product.id === "juul1-slate" || product.version === "juul1" ? (
              <>
                {/* ═══ JUUL 1 SECTION 1: MEET YOUR JUUL KIT ═══ */}
                <motion.div 
                  initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} 
                  variants={containerVariants}
                  className={`${cardClassName} grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center`}
                >
                  <div className="lg:col-span-7 space-y-6">
                    <motion.div variants={textItemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/5 border border-red-500/10">
                      <Sparkles className="w-4 h-4 text-red-500" />
                      <span className="text-[10px] font-black uppercase tracking-[0.15em] text-red-500">Get familiar with every part of JUUL 1 device</span>
                    </motion.div>
                    
                    <motion.h3 variants={textItemVariants} className={`text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.05] ${isLight ? "text-zinc-950" : "text-white"}`}>
                      Meet Your <br/><span className="text-red-500">JUUL Kit</span>
                    </motion.h3>
                    
                    <motion.p variants={textItemVariants} className={`text-base font-medium leading-relaxed ${isLight ? "text-zinc-600" : "text-zinc-400"}`}>
                      This image briefs you about each part of JUUL 1 Kit. The main pieces of the kit's are the pod, battery, LED indicator, pod connection area, and charging doc. Quick understanding of these key components will help you to use the device effortlessly with confidence.
                    </motion.p>
                  </div>
          
                  <motion.div variants={imageContainerVariants} className="lg:col-span-5 h-[350px] sm:h-[450px] lg:h-[550px] w-full relative">
                    <div className={`w-full h-full relative rounded-[2rem] overflow-hidden group ${imageBgClassName}`}>
                      <Image src="/deal-bundle.png" alt="Meet Your JUUL Kit" fill className="object-contain object-center group-hover:scale-105 transition-transform duration-700 ease-out" sizes="(max-width: 1024px) 100vw, 50vw" />
                    </div>
                  </motion.div>
                </motion.div>

                {/* ═══ JUUL 1 SECTION 2: INSIDE THE JUUL POD ═══ */}
                <motion.div 
                  initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} 
                  variants={containerVariants}
                  className={`${cardClassName} grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center lg:flex-row-reverse`}
                >
                  <motion.div variants={imageContainerVariants} className="lg:col-span-5 lg:order-last h-[350px] sm:h-[450px] lg:h-[550px] w-full relative">
                    <div className={`w-full h-full relative rounded-[2rem] overflow-hidden group ${imageBgClassName}`}>
                      <Image src="/cat-pods.png" alt="Inside the JUUL Pod" fill className="object-contain object-center group-hover:scale-105 transition-transform duration-700 ease-out" sizes="(max-width: 1024px) 100vw, 50vw" />
                    </div>
                  </motion.div>
          
                  <div className="lg:col-span-7 space-y-6">
                    <motion.div variants={textItemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/10">
                      <Droplet className="w-4 h-4 text-emerald-500" />
                      <span className="text-[10px] font-black uppercase tracking-[0.15em] text-emerald-500">Inside Your JUUL Pod</span>
                    </motion.div>
                    
                    <motion.h3 variants={textItemVariants} className={`text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.05] ${isLight ? "text-zinc-950" : "text-white"}`}>
                      Inside the <br/><span className="text-emerald-500">JUUL Pod</span>
                    </motion.h3>
                    
                    <motion.p variants={textItemVariants} className={`text-base font-medium leading-relaxed ${isLight ? "text-zinc-600" : "text-zinc-400"}`}>
                      The JUUL 1 pod is designed for smooth and consistent performance. From this image you get important information about the mouthpiece, e-liquid chamber, coil details, wick, and connector points. Each component works simultaneously to deliver a simple and reliable vaping experience with clean flavor delivery.
                    </motion.p>
                  </div>
                </motion.div>

                {/* ═══ JUUL 1 SECTION 3: CHECK BATTERY LEVEL ═══ */}
                <motion.div 
                  initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} 
                  variants={containerVariants}
                  className={`${cardClassName} grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center`}
                >
                  <div className="lg:col-span-7 space-y-6">
                    <motion.div variants={textItemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/5 border border-red-500/10">
                      <ShieldAlert className="w-4 h-4 text-red-500" />
                      <span className="text-[10px] font-black uppercase tracking-[0.15em] text-red-500">Check Your JUUL Battery Level</span>
                    </motion.div>
                    
                    <motion.h3 variants={textItemVariants} className={`text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.05] ${isLight ? "text-zinc-950" : "text-white"}`}>
                      How to Check <br/><span className="text-red-500">Battery Level</span>
                    </motion.h3>
                    
                    <motion.p variants={textItemVariants} className={`text-base font-medium leading-relaxed ${isLight ? "text-zinc-600" : "text-zinc-400"}`}>
                      Knowing your JUUL 1 battery status is quick and easy. Gently tap the device twice to activate the LED indicator. The light color shows the battery status. That helps you know when it is time to recharge.
                    </motion.p>
          
                    <motion.div variants={textItemVariants} className="grid grid-cols-2 gap-3 pt-2">
                      <div className={`p-3 rounded-xl border ${isLight ? "bg-green-50 border-green-200" : "bg-green-900/20 border-green-500/20"}`}>
                        <h5 className="text-xs font-black text-green-600 dark:text-green-400 mb-1">Green Light</h5>
                        <p className="text-[10px] font-medium text-zinc-500">High battery level</p>
                      </div>
                      <div className={`p-3 rounded-xl border ${isLight ? "bg-yellow-50 border-yellow-200" : "bg-yellow-900/20 border-yellow-500/20"}`}>
                        <h5 className="text-xs font-black text-yellow-600 dark:text-yellow-400 mb-1">Yellow Light</h5>
                        <p className="text-[10px] font-medium text-zinc-500">Medium battery level</p>
                      </div>
                      <div className={`p-3 rounded-xl border ${isLight ? "bg-red-50 border-red-200" : "bg-red-950/20 border-red-500/20"}`}>
                        <h5 className="text-xs font-black text-red-500 mb-1">Red Light</h5>
                        <p className="text-[10px] font-medium text-red-400">Low battery level</p>
                      </div>
                      <div className={`p-3 rounded-xl border ${isLight ? "bg-red-50 border-red-200" : "bg-red-950/20 border-red-500/20"}`}>
                        <h5 className="text-xs font-black text-red-500 mb-1 animate-pulse">Flashing Red</h5>
                        <p className="text-[10px] font-medium text-red-400">Charge your device soon</p>
                      </div>
                    </motion.div>
                  </div>
          
                  <motion.div variants={imageContainerVariants} className="lg:col-span-5 h-[350px] sm:h-[450px] lg:h-[550px] w-full relative">
                    <div className={`w-full h-full relative rounded-[2rem] overflow-hidden group ${imageBgClassName}`}>
                      <Image src="/battery-check.png" alt="Check Battery Level" fill className="object-contain object-center group-hover:scale-105 transition-transform duration-700 ease-out" sizes="(max-width: 1024px) 100vw, 50vw" />
                    </div>
                  </motion.div>
                </motion.div>

                {/* ═══ JUUL 1 SECTION 4: E-LIQUID LEVEL ═══ */}
                <motion.div 
                  initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} 
                  variants={containerVariants}
                  className={`${cardClassName} grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center lg:flex-row-reverse`}
                >
                  <motion.div variants={imageContainerVariants} className="lg:col-span-5 lg:order-last h-[350px] sm:h-[450px] lg:h-[550px] w-full relative">
                    <div className={`w-full h-full relative rounded-[2rem] overflow-hidden group ${imageBgClassName}`}>
                      <Image src="/e liquid level.jpeg" alt="Hexagonal Window" fill className="object-contain object-center group-hover:scale-105 transition-transform duration-700 ease-out" sizes="(max-width: 1024px) 100vw, 50vw" />
                    </div>
                  </motion.div>
          
                  <div className="lg:col-span-7 space-y-6">
                    <motion.div variants={textItemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/10">
                      <Droplet className="w-4 h-4 text-emerald-500" />
                      <span className="text-[10px] font-black uppercase tracking-[0.15em] text-emerald-500">Check Your JUUL E-Liquid Level</span>
                    </motion.div>
                    
                    <motion.h3 variants={textItemVariants} className={`text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.05] ${isLight ? "text-zinc-950" : "text-white"}`}>
                      How to Check Your <br/><span className="text-emerald-500">E-Liquid Level</span>
                    </motion.h3>
                    
                    <motion.p variants={textItemVariants} className={`text-base font-medium leading-relaxed ${isLight ? "text-zinc-600" : "text-zinc-400"}`}>
                      JUUL pods feature a transparent hexagonal viewing window. You can check the e-liquid level of the pod easily. A quick glance helps you know when to replace your pod.
                    </motion.p>
                  </div>
                </motion.div>

                {/* ═══ JUUL 1 SECTION 5: HOW TO CHARGE ═══ */}
                <motion.div 
                  initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} 
                  variants={containerVariants}
                  className={`${cardClassName} grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center`}
                >
                  <div className="lg:col-span-7 space-y-6">
                    <motion.div variants={textItemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/5 border border-red-500/10">
                      <Zap className="w-4 h-4 text-red-500" />
                      <span className="text-[10px] font-black uppercase tracking-[0.15em] text-red-500">Charging Your JUUL Device</span>
                    </motion.div>
                    
                    <motion.h3 variants={textItemVariants} className={`text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.05] ${isLight ? "text-zinc-950" : "text-white"}`}>
                      How To Charge <br/><span className="text-red-500">JUUL Device</span>
                    </motion.h3>
                    
                    <motion.p variants={textItemVariants} className={`text-base font-medium leading-relaxed ${isLight ? "text-zinc-600" : "text-zinc-400"}`}>
                      Charging JUUL 1 is simple. Align the golden contact points of the device onto the magnetic charging dock. Then ensure it connects securely. The LED indicator will light up during charging. Eventually it will turn solid green when charging is complete.
                    </motion.p>
                    
                    <motion.div variants={textItemVariants} className="space-y-3 pt-2">
                      <div className="flex items-center gap-3 text-sm font-bold">
                        <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center">
                          <CheckSquare className="w-3.5 h-3.5 text-red-500" />
                        </div>
                        <span className={isLight ? "text-zinc-800" : "text-zinc-200"}>White Light Pulsing: Charging in progress</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm font-bold">
                        <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center">
                          <CheckSquare className="w-3.5 h-3.5 text-red-500" />
                        </div>
                        <span className={isLight ? "text-zinc-800" : "text-zinc-200"}>Solid Green Light: Fully charged</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm font-bold">
                        <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center">
                          <CheckSquare className="w-3.5 h-3.5 text-red-500" />
                        </div>
                        <span className={isLight ? "text-zinc-800" : "text-zinc-200"}>No Light: Device is disconnected or charging is complete</span>
                      </div>
                    </motion.div>
                  </div>

                  <motion.div variants={imageContainerVariants} className="lg:col-span-5 h-[350px] sm:h-[450px] lg:h-[550px] w-full relative">
                    <div className={`w-full h-full relative rounded-[2rem] overflow-hidden group ${imageBgClassName}`}>
                      <Image src="/juul1-charger.png" alt="How to Charge JUUL 1" fill className="object-contain object-center group-hover:scale-105 transition-transform duration-700 ease-out" sizes="(max-width: 1024px) 100vw, 50vw" />
                    </div>
                  </motion.div>
                </motion.div>

                {/* ═══ JUUL 1 SECTION 6: BOTTOM TEXT ═══ */}
                <div className={`p-8 lg:p-12 rounded-[2rem] border ${isLight ? "bg-white border-zinc-200" : "bg-zinc-900/40 border-white/5"} space-y-4`}>
                  <h3 className={`text-2xl sm:text-3xl font-black ${isLight ? "text-zinc-950" : "text-white"}`}>
                    Buy from Vape Pods – Your Trusted JUUL Vape Shop
                  </h3>
                  <p className={`text-[13px] sm:text-sm leading-relaxed font-medium ${isLight ? "text-zinc-600" : "text-zinc-400"}`}>
                    At Vape Pods , a trusted Juul 1 Vape shop Dubai. You can Buy Juul Device in UAE effortlessly. This is assured that you will get an Original Juul 1 pod kit . The best JUUL 1 price in UAE is guaranteed. Order Juul 1 Dubai online. Fast delivery options are available across the UAE and cash on delivery in Dubai, Palm Jumeirah, Sharjah, Abu Dhabi, Ajman, Umm Al Quwain, Ras Al Khaimah, and Fujairah. JUUL is a premium vape brand UAE shoppers trust. A high-quality pod system is the perfect choice for ex-smokers and anyone seeking the best tobacco alternative. This pod kit ensures pleasant nicotine satisfaction, and reliable quality. We can give you the best Juul 1 vape dubai price and honest JUUL pods price Dubai make it easy to shop with confidence. If you follow our social media or website, can often grab a Juul discount UAE wide and on other select items. Whether you want to Buy Juul Pods in UAE, Buy Juul 1 Dubai wide, or simply restock your JUUL pods Dubai delivery, our authentic Juul Shop Dubai makes it easy. Shop online, enjoy JUUL UAE cash on delivery, and refine your vaping experience with the original JUUL 1 Kit, a full range of JUUL refill pods, and quality vape accessories. All our products are complies with UAE ECAS/ESMA regulation and standards
                  </p>
                </div>
              </>
            ) : (
              <>
                {/* ═══ SECTION 1: JUUL POD SPECIFICATION ═══ */}
      <motion.div 
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} 
        variants={containerVariants}
        className={`${cardClassName} grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center`}
      >
        <div className="lg:col-span-7 space-y-6">
          <motion.div variants={textItemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/5 border border-red-500/10">
            <Sparkles className="w-4 h-4 text-red-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.15em] text-red-500">Advanced Anatomy</span>
          </motion.div>
          
          <motion.h3 variants={textItemVariants} className={`text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.05] ${isLight ? "text-zinc-950" : "text-white"}`}>
            JUUL Pod <br/><span className="text-red-500">Specification</span>
          </motion.h3>
          
          <motion.p variants={textItemVariants} className={`text-base font-medium leading-relaxed ${isLight ? "text-zinc-600" : "text-zinc-400"}`}>
            Engineered with a high-grade polycarbonate shell, the JUUL pod features an internal heating coil with precision-woven wicks for consistent draws. The unique hexagonal e-liquid window lets you see exactly how much is left, while gold-plated contacts ensure a secure snap-fit connection.
          </motion.p>
          
          <motion.div variants={textItemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className={`p-4 rounded-2xl border ${isLight ? "bg-white border-zinc-200" : "bg-zinc-900/40 border-white/5"}`}>
              <h5 className={`text-sm font-black mb-1 ${isLight ? "text-zinc-950" : "text-white"}`}>0.7mL Capacity</h5>
              <p className={`text-[11px] font-medium ${isLight ? "text-zinc-500" : "text-zinc-400"}`}>With 5.0% Nicotine Concentration</p>
            </div>
            <div className={`p-4 rounded-2xl border ${isLight ? "bg-white border-zinc-200" : "bg-zinc-900/40 border-white/5"}`}>
              <h5 className={`text-sm font-black mb-1 ${isLight ? "text-zinc-950" : "text-white"}`}>1.5 Ohms Coil</h5>
              <p className={`text-[11px] font-medium ${isLight ? "text-zinc-500" : "text-zinc-400"}`}>Optimized vaporization chamber</p>
            </div>
          </motion.div>
        </div>

        <motion.div variants={imageContainerVariants} className="lg:col-span-5 h-[350px] sm:h-[450px] lg:h-[550px] w-full relative">
          <div className={`w-full h-full relative rounded-[2rem] overflow-hidden group ${imageBgClassName}`}>
            <Image src="/img-pod-spec.jpeg" alt="JUUL Pod Specification" fill className="object-contain object-center group-hover:scale-105 transition-transform duration-700 ease-out" sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
        </motion.div>
      </motion.div>

      {/* ═══ SECTION 2: HEXAGONAL WINDOW (E-LIQUID LEVEL) ═══ */}
      <motion.div 
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} 
        variants={containerVariants}
        className={`${cardClassName} grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center lg:flex-row-reverse`}
      >
        <motion.div variants={imageContainerVariants} className="lg:col-span-5 lg:order-last h-[350px] sm:h-[450px] lg:h-[550px] w-full relative">
          <div className={`w-full h-full relative rounded-[2rem] overflow-hidden group ${imageBgClassName}`}>
            <Image src="/E-Liquid Visibility (Hexagonal Liquid Window.jpeg" alt="Hexagonal Window" fill className="object-contain object-center group-hover:scale-105 transition-transform duration-700 ease-out" sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
        </motion.div>

        <div className="lg:col-span-7 space-y-6">
          <motion.div variants={textItemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/10">
            <Droplet className="w-4 h-4 text-emerald-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.15em] text-emerald-500">E-Liquid Visibility</span>
          </motion.div>
          
          <motion.h3 variants={textItemVariants} className={`text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.05] ${isLight ? "text-zinc-950" : "text-white"}`}>
            Hexagonal <br/><span className="text-emerald-500">Liquid Window</span>
          </motion.h3>
          
          <motion.p variants={textItemVariants} className={`text-base font-medium leading-relaxed ${isLight ? "text-zinc-600" : "text-zinc-400"}`}>
            Never run out unexpectedly. The perfectly crafted hexagonal viewing window provides clear, instant visibility of your remaining e-liquid level without having to remove the pod from the device. Keep track of your usage seamlessly.
          </motion.p>

          <motion.div variants={textItemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className={`p-5 rounded-2xl border transition-colors ${isLight ? "bg-white border-zinc-200 shadow-sm hover:border-zinc-300" : "bg-zinc-900/40 border-white/5 hover:border-white/10"}`}>
              <h5 className={`text-sm font-black mb-1.5 ${isLight ? "text-zinc-950" : "text-white"}`}>Instant Checking</h5>
              <p className={`text-xs font-medium leading-relaxed ${isLight ? "text-zinc-500" : "text-zinc-400"}`}>A quick glance is all it takes to see exactly how much liquid is left in your pod.</p>
            </div>
            <div className={`p-5 rounded-2xl border transition-colors ${isLight ? "bg-white border-zinc-200 shadow-sm hover:border-zinc-300" : "bg-zinc-900/40 border-white/5 hover:border-white/10"}`}>
              <h5 className={`text-sm font-black mb-1.5 ${isLight ? "text-zinc-950" : "text-white"}`}>Smart Design</h5>
              <p className={`text-xs font-medium leading-relaxed ${isLight ? "text-zinc-500" : "text-zinc-400"}`}>The geometric shape maximizes viewing area while maintaining structural strength.</p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* ═══ SECTION 3: HOW TO CHARGE YOUR JUUL2 ═══ */}
      <motion.div 
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} 
        variants={containerVariants}
        className={`${cardClassName} grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center lg:flex-row-reverse`}
      >
        <motion.div variants={imageContainerVariants} className="lg:col-span-5 lg:order-last h-[350px] sm:h-[450px] lg:h-[550px] w-full relative">
          <div className={`w-full h-full relative rounded-[2rem] overflow-hidden group ${imageBgClassName}`}>
            <Image src="/img-how-to-charge.jpeg" alt="How to Charge JUUL2" fill className="object-contain object-center group-hover:scale-105 transition-transform duration-700 ease-out" sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
        </motion.div>

        <div className="lg:col-span-7 space-y-6">
          <motion.div variants={textItemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/5 border border-red-500/10">
            <Zap className="w-4 h-4 text-red-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.15em] text-red-500">Magnetic Docking</span>
          </motion.div>
          
          <motion.h3 variants={textItemVariants} className={`text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.05] ${isLight ? "text-zinc-950" : "text-white"}`}>
            How To Charge <br/><span className="text-red-500">Your JUUL2</span>
          </motion.h3>
          
          <motion.p variants={textItemVariants} className={`text-base font-medium leading-relaxed ${isLight ? "text-zinc-600" : "text-zinc-400"}`}>
            Charging is intuitive and fast. Place the device flat on the magnetic dock—strong magnets will auto-align the gold and silver pins. A rainbow scroll flash confirms connection. From there, monitor the pulsing white lights as it charges from 25% to 100%.
          </motion.p>
          
          <motion.div variants={textItemVariants} className="space-y-3 pt-2">
            <div className="flex items-center gap-3 text-sm font-bold">
              <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center">
                <CheckSquare className="w-3.5 h-3.5 text-red-500" />
              </div>
              <span className={isLight ? "text-zinc-800" : "text-zinc-200"}>Sequential Cascade Flash Confirmation</span>
            </div>
            <div className="flex items-center gap-3 text-sm font-bold">
              <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center">
                <CheckSquare className="w-3.5 h-3.5 text-red-500" />
              </div>
              <span className={isLight ? "text-zinc-800" : "text-zinc-200"}>Estimated Charge Time: 60 Minutes</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* ═══ SECTION 3: DOUBLE TAP TO CHECK BATTERY ═══ */}
      <motion.div 
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} 
        variants={containerVariants}
        className={`${cardClassName} grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center`}
      >
        <div className="lg:col-span-7 space-y-6">
          <motion.div variants={textItemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/10">
            <ShieldAlert className="w-4 h-4 text-emerald-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.15em] text-emerald-500">Battery Status</span>
          </motion.div>
          
          <motion.h3 variants={textItemVariants} className={`text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.05] ${isLight ? "text-zinc-950" : "text-white"}`}>
            Double Tap To <br/><span className="text-emerald-500">Check Battery</span>
          </motion.h3>
          
          <motion.p variants={textItemVariants} className={`text-base font-medium leading-relaxed ${isLight ? "text-zinc-600" : "text-zinc-400"}`}>
            Never get caught off guard. Simply double-tap the side of the device to instantly reveal your current battery level. The smart LED indicator visually breaks down your charge status.
          </motion.p>

          <motion.div variants={textItemVariants} className="grid grid-cols-2 gap-3 pt-2">
            <div className={`p-3 rounded-xl border ${isLight ? "bg-white border-zinc-200" : "bg-zinc-900/40 border-white/5"}`}>
              <h5 className="text-xs font-black mb-1">4 Lights (White)</h5>
              <p className="text-[10px] font-medium text-zinc-500">75-100% Battery</p>
            </div>
            <div className={`p-3 rounded-xl border ${isLight ? "bg-white border-zinc-200" : "bg-zinc-900/40 border-white/5"}`}>
              <h5 className="text-xs font-black mb-1">3 Lights (White)</h5>
              <p className="text-[10px] font-medium text-zinc-500">50-74% Battery</p>
            </div>
            <div className={`p-3 rounded-xl border ${isLight ? "bg-white border-zinc-200" : "bg-zinc-900/40 border-white/5"}`}>
              <h5 className="text-xs font-black mb-1">2 Lights (White)</h5>
              <p className="text-[10px] font-medium text-zinc-500">25-49% Battery</p>
            </div>
            <div className={`p-3 rounded-xl border ${isLight ? "bg-red-50 border-red-200" : "bg-red-950/20 border-red-500/20"}`}>
              <h5 className="text-xs font-black text-red-500 mb-1">1 Light (Red)</h5>
              <p className="text-[10px] font-medium text-red-400">Critical Under 25%</p>
            </div>
          </motion.div>
        </div>

        <motion.div variants={imageContainerVariants} className="lg:col-span-5 h-[350px] sm:h-[450px] lg:h-[550px] w-full relative">
          <div className={`w-full h-full relative rounded-[2rem] overflow-hidden group ${imageBgClassName}`}>
            <Image src="/img-check-battery.jpeg" alt="Check Battery" fill className="object-contain object-center group-hover:scale-105 transition-transform duration-700 ease-out" sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
        </motion.div>
      </motion.div>

      {/* ═══ SECTION 4: BLUETOOTH PAIRING ═══ */}
      <motion.div 
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} 
        variants={containerVariants}
        className={`${cardClassName} grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center lg:flex-row-reverse`}
      >
        <motion.div variants={imageContainerVariants} className="lg:col-span-5 lg:order-last h-[350px] sm:h-[450px] lg:h-[550px] w-full relative">
          <div className={`w-full h-full relative rounded-[2rem] overflow-hidden group ${imageBgClassName}`}>
            <Image src="/img-bluetooth.jpeg" alt="Bluetooth Pairing" fill className="object-contain object-center group-hover:scale-105 transition-transform duration-700 ease-out" sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
        </motion.div>

        <div className="lg:col-span-7 space-y-6">
          <motion.div variants={textItemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/5 border border-red-500/10">
            <RefreshCcw className="w-4 h-4 text-red-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.15em] text-red-500">Position, Shake, Connect</span>
          </motion.div>
          
          <motion.h3 variants={textItemVariants} className={`text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.05] ${isLight ? "text-zinc-950" : "text-white"}`}>
            Seamless App <br/><span className="text-red-500">Pairing</span>
          </motion.h3>
          
          <motion.p variants={textItemVariants} className={`text-base font-medium leading-relaxed ${isLight ? "text-zinc-600" : "text-zinc-400"}`}>
            Connecting your JUUL2 to your smartphone is effortless. Keep devices within a 3-meter maximum range. Shake your JUUL2 and wait 10 seconds, then simply tap connect on your phone when prompted.
          </motion.p>

          <motion.div variants={textItemVariants} className="space-y-3 pt-2">
            <div className="flex items-center gap-3 text-sm font-bold">
              <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center">
                <span className="text-[10px] text-red-500">1</span>
              </div>
              <span className={isLight ? "text-zinc-800" : "text-zinc-200"}>Position Devices (3 Meters Max)</span>
            </div>
            <div className="flex items-center gap-3 text-sm font-bold">
              <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center">
                <span className="text-[10px] text-red-500">2</span>
              </div>
              <span className={isLight ? "text-zinc-800" : "text-zinc-200"}>Shake JUUL2 & Wait 10 Sec</span>
            </div>
            <div className="flex items-center gap-3 text-sm font-bold">
              <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center">
                <span className="text-[10px] text-red-500">3</span>
              </div>
              <span className={isLight ? "text-zinc-800" : "text-zinc-200"}>JUUL2 Connected Successfully</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* ═══ SECTION 5: JUUL2 APP FEATURES ═══ */}
      <motion.div 
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} 
        variants={containerVariants}
        className={`${cardClassName} grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center`}
      >
        <div className="lg:col-span-7 space-y-6">
          <motion.div variants={textItemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/10">
            <Sparkles className="w-4 h-4 text-emerald-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.15em] text-emerald-500">Complete Device Control</span>
          </motion.div>
          
          <motion.h3 variants={textItemVariants} className={`text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.05] ${isLight ? "text-zinc-950" : "text-white"}`}>
            JUUL2 App <br/><span className="text-emerald-500">Features</span>
          </motion.h3>
          
          <motion.p variants={textItemVariants} className={`text-base font-medium leading-relaxed ${isLight ? "text-zinc-600" : "text-zinc-400"}`}>
            The official companion app unlocks powerful capabilities. Get real-time tracking of battery and e-liquid levels. You can also locate your device via GPS, review usage insights, authenticate pods against counterfeits, and lock the device remotely for safety.
          </motion.p>
          
          <motion.div variants={textItemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className={`p-4 rounded-2xl border ${isLight ? "bg-white border-zinc-200" : "bg-zinc-900/40 border-white/5"}`}>
              <h5 className={`text-sm font-black mb-1 ${isLight ? "text-zinc-950" : "text-white"}`}>Real-Time Tracking</h5>
              <p className={`text-[11px] font-medium ${isLight ? "text-zinc-500" : "text-zinc-400"}`}>Live battery and e-liquid readout</p>
            </div>
            <div className={`p-4 rounded-2xl border ${isLight ? "bg-white border-zinc-200" : "bg-zinc-900/40 border-white/5"}`}>
              <h5 className={`text-sm font-black mb-1 ${isLight ? "text-zinc-950" : "text-white"}`}>Remote Device Lock</h5>
              <p className={`text-[11px] font-medium ${isLight ? "text-zinc-500" : "text-zinc-400"}`}>Instantly disable the heating element</p>
            </div>
            <div className={`p-4 rounded-2xl border ${isLight ? "bg-white border-zinc-200" : "bg-zinc-900/40 border-white/5"}`}>
              <h5 className={`text-sm font-black mb-1 ${isLight ? "text-zinc-950" : "text-white"}`}>Pod Authentication</h5>
              <p className={`text-[11px] font-medium ${isLight ? "text-zinc-500" : "text-zinc-400"}`}>Reads encrypted Pod ID microchip</p>
            </div>
            <div className={`p-4 rounded-2xl border ${isLight ? "bg-white border-zinc-200" : "bg-zinc-900/40 border-white/5"}`}>
              <h5 className={`text-sm font-black mb-1 ${isLight ? "text-zinc-950" : "text-white"}`}>Locate My JUUL2</h5>
                  <p className={`text-[11px] font-medium ${isLight ? "text-zinc-500" : "text-zinc-400"}`}>Ring device or view GPS location</p>
                </div>
              </motion.div>
            </div>

            <motion.div variants={imageContainerVariants} className="lg:col-span-5 h-[350px] sm:h-[450px] lg:h-[550px] w-full relative">
              <div className={`w-full h-full relative rounded-[2rem] overflow-hidden group ${imageBgClassName}`}>
                <Image src="/img-app-features.jpeg" alt="JUUL2 App Features" fill className="object-contain object-center group-hover:scale-105 transition-transform duration-700 ease-out" sizes="(max-width: 1024px) 100vw, 50vw" />
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
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
            <div className="space-y-6">
              <h3 className={`text-2xl sm:text-3xl font-black ${isLight ? "text-zinc-900" : "text-white"}`}>
                Shipping & Delivery Information
              </h3>
              <p className={`text-[13px] sm:text-sm leading-relaxed font-medium ${isLight ? "text-zinc-600" : "text-zinc-400"}`}>
                We want you to have a smooth vaping experience from the moment you place an order to the moment it arrives at your door. Here is everything you need to know about how we deliver across the UAE.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className={`text-xl font-black ${isLight ? "text-zinc-900" : "text-white"}`}>
                Service Area
              </h4>
              <p className={`text-[13px] sm:text-sm leading-relaxed font-medium ${isLight ? "text-zinc-600" : "text-zinc-400"}`}>
                We deliver anywhere across the UAE.<br/><br/>
                <span className="font-bold">Important note:</span> We are unable to ship internationally due to customs and international shipping regulations.<br/><br/>
                You just have to order a minimum amount of 85 AED to get your favorite vape in your doorstape.<br/>
                Free Delivery is available from 300 AED. Spend AED 300 or more and delivery is on us, completely free.<br/>
                Order below 300AED will be applied for a 30 AED flat delivery charge.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className={`text-xl font-black ${isLight ? "text-zinc-900" : "text-white"}`}>
                Dubai and Sharjah Delivery
              </h4>
              <p className={`text-[13px] sm:text-sm leading-relaxed font-medium ${isLight ? "text-zinc-600" : "text-zinc-400"}`}>
                We know how important it is to get your order quickly. That is why we have made our Dubai and Sharjah delivery as fast and convenient as possible.<br/><br/>
                <span className="font-bold">Free Delivery:</span> Free Delivery is available from 300 AED.<br/>
                <span className="font-bold">Delivery Charges:</span> Orders below 300AED will be applied for a 30 AED flat delivery fee.<br/>
                <span className="font-bold">Same Day Delivery:</span> Place your order before 9:00 PM and we will have it at your doorstep the very same day. No waiting around.<br/>
                <span className="font-bold">Next Day Delivery:</span> Ordered after 9:00 PM? No problem. Your order will be on its way the following morning.<br/><br/>
                We Deliver 7 Days a Week. That is right. Whether it is a weekday or the weekend, our delivery team is out there getting your order to you.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className={`text-xl font-black ${isLight ? "text-zinc-900" : "text-white"}`}>
                Outside Dubai and Sharjah
              </h4>
              <p className={`text-[13px] sm:text-sm leading-relaxed font-medium ${isLight ? "text-zinc-600" : "text-zinc-400"}`}>
                We also deliver to all other Emirates across the UAE. Here are our shipping and delivery policies outside of Dubai and Sharjah.<br/><br/>
                <span className="font-bold">Delivery time:</span><br/>
                • Service Days: Deliveries run 6 days a week. We are closed on Sundays.<br/>
                • Same Day Delivery: Orders placed before 2:00 PM will be delivered the same day.<br/>
                • Next Day Delivery: Orders placed after 2:00 PM will be delivered the following day.<br/>
                • Note: Orders placed after 2:00 PM on Saturday will be delivered on Monday.<br/><br/>
                <span className="font-bold">Delivery chargers and Payment:</span><br/>
                • Cash on delivery only: Card payment is not available for deliveries outside Dubai and Sharjah.<br/>
                • Free Delivery: Orders over AED 200 qualify for free delivery.<br/>
                • Delivery Charge: Orders under AED 200 carry a delivery charge of AED 30.<br/>
                • Minimum Order: A minimum order of AED 85 is required.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className={`text-xl font-black ${isLight ? "text-zinc-900" : "text-white"}`}>
                Outside City Areas
              </h4>
              <p className={`text-[13px] sm:text-sm leading-relaxed font-medium ${isLight ? "text-zinc-600" : "text-zinc-400"}`}>
                To get delivery areas that are further from the city, here is what to expect.<br/><br/>
                <span className="font-bold">Delivery Time:</span> Delivery within 2 working days. We are closed on Sundays.<br/>
                <span className="font-bold">Chargers:</span> Areas further from the city carry an additional charge of AED 35.<br/>
                <span className="font-bold">Note:</span> For orders over AED 300 heading to these areas, a delivery charge of AED 35 applies.
              </p>
            </div>

            <div className="space-y-4 overflow-x-auto">
              <h4 className={`text-xl font-black mb-4 ${isLight ? "text-zinc-900" : "text-white"}`}>
                Quick Delivery Summary
              </h4>
              <table className={`min-w-full text-left text-sm ${isLight ? "text-zinc-700" : "text-zinc-300"}`}>
                <thead className={`text-xs uppercase ${isLight ? "bg-zinc-100 text-zinc-600" : "bg-zinc-800 text-zinc-400"}`}>
                  <tr>
                    <th className="px-4 py-3 rounded-tl-lg">Area</th>
                    <th className="px-4 py-3">Delivery Time</th>
                    <th className="px-4 py-3">Minimum Order</th>
                    <th className="px-4 py-3">Free Delivery</th>
                    <th className="px-4 py-3 rounded-tr-lg">Delivery Charge</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200/20">
                  <tr>
                    <td className="px-4 py-3 font-medium">Dubai and Sharjah</td>
                    <td className="px-4 py-3">Same day or next morning</td>
                    <td className="px-4 py-3">AED 85</td>
                    <td className="px-4 py-3">AED 300 and above</td>
                    <td className="px-4 py-3">AED 30</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium">Outside Dubai and Sharjah</td>
                    <td className="px-4 py-3">Same day or next day</td>
                    <td className="px-4 py-3">AED 85</td>
                    <td className="px-4 py-3">AED 300 and above</td>
                    <td className="px-4 py-3">AED 30</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium">Outside city areas</td>
                    <td className="px-4 py-3">Within 2 working days</td>
                    <td className="px-4 py-3">AED 85</td>
                    <td className="px-4 py-3">AED 300+ get 30 AED Discount</td>
                    <td className="px-4 py-3">AED 65</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="space-y-4">
              <h4 className={`text-xl font-black ${isLight ? "text-zinc-900" : "text-white"}`}>
                Pre Order & Address Changes
              </h4>
              <p className={`text-[13px] sm:text-sm leading-relaxed font-medium ${isLight ? "text-zinc-600" : "text-zinc-400"}`}>
                <span className="font-bold">Pre Order:</span> Interested in an item that is currently not available or on pre-order? Simply reach out to us via WhatsApp or email. We will sort it out for you. You can also leave us a note when placing your order and we will get back to you with all the details.<br/><br/>
                <span className="font-bold">Changing Your Delivery Address:</span> After an order is placed, it will be sent to the address you provided. If you need to change delivery location, please contact us as soon as possible. You can contact us via WhatsApp or email. We will do our best to update it before dispatch. <br/>
                <span className="italic">Please note: If a refund becomes necessary, the original shipping fee will not be included.</span>
              </p>
            </div>

            <div className="space-y-4">
              <h4 className={`text-xl font-black ${isLight ? "text-zinc-900" : "text-white"}`}>
                Need Help?
              </h4>
              <p className={`text-[13px] sm:text-sm leading-relaxed font-medium ${isLight ? "text-zinc-600" : "text-zinc-400"}`}>
                Any questions about your order or delivery? Our team is always happy to help. Reach out to us on WhatsApp or email. We will get back to you as quickly as we can.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className={`text-xl font-black ${isLight ? "text-zinc-900" : "text-white"}`}>
                Terms And Conditions
              </h4>
              <ul className={`text-[13px] sm:text-sm leading-relaxed font-medium list-disc pl-5 space-y-2 ${isLight ? "text-zinc-600" : "text-zinc-400"}`}>
                <li>You must be 18 years or older to place and receive an order. Orders placed by minors will not be delivered or refunded.</li>
                <li>We dispatch every order via courier or private car. Sometimes things are outside our control. Like bad weather or heavy traffic may cause a small delay. We always do our best to deliver every order on time.</li>
                <li>We ship without requiring a signature. Just make sure someone is available at the delivery address to collect the parcel when it arrives.</li>
                <li>We take great care of your order from the moment it leaves us to the moment it reaches you. Your satisfaction matters to us. We make sure every order is packed and handled with care.</li>
                <li>When your order arrives, please have your Emirates ID or Passport ready. Payment can be made by cash or card at the time of delivery.</li>
                <li>Our products are strictly for adults. You must be 18 years or older to place and receive an order. Any order found to have been placed by a minor will not be handed over and will not be eligible for a refund.</li>
              </ul>
            </div>

            <div className={`p-6 rounded-2xl border ${isLight ? "bg-zinc-50 border-zinc-200" : "bg-zinc-900/40 border-zinc-800"}`}>
              <h4 className={`text-lg font-black mb-2 ${isLight ? "text-zinc-950" : "text-white"}`}>
                Our Promise to You
              </h4>
              <p className={`text-[13px] sm:text-sm leading-relaxed font-medium ${isLight ? "text-zinc-650" : "text-zinc-400"}`}>
                We take great care of your order from the moment it leaves us to the moment it reaches you. Your satisfaction is our top priority. We make sure every order is packed and handled with care. We do our best to deliver on time.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
