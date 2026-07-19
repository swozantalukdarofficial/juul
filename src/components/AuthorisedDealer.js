"use client";

import { motion } from "framer-motion";
import { Award, ShieldCheck, Flame, Lock, Compass } from "lucide-react";

export default function AuthorisedDealer({ theme }) {
  const isLight = theme === "light";

  return (
    <section className={`py-28 transition-colors duration-500 border-b relative overflow-hidden ${
      isLight ? "bg-[#F9FAFB] border-zinc-200" : "bg-[#07090E] border-white/5"
    }`}>
      {/* CSS Animation for Rotating Dashed Rings */}
      <style>{`
        @keyframes rotateClockwise {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes rotateCounterClockwise {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .ring-clockwise {
          animation: rotateClockwise 25s linear infinite;
        }
        .ring-counter {
          animation: rotateCounterClockwise 18s linear infinite;
        }
      `}</style>

      {/* Futuristic Background Grids & Ambient Lights */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[400px] bg-emerald-500/[0.02] dark:bg-emerald-500/[0.012] blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Top Section: Split Layout (Title Left, Shield Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-10">
          
          {/* Top Left: Heading & Intro */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-8 space-y-4 text-left"
          >
            <span className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border text-[9px] font-black uppercase tracking-[0.25em] ${
              isLight ? "bg-emerald-50 border-emerald-200 text-emerald-600" : "bg-emerald-950/20 border-emerald-500/20 text-emerald-400"
            }`}>
              <Award className="w-3.5 h-3.5" />
              OFFICIAL VERIFICATION
            </span>
            
            <h2 className={`text-4xl sm:text-6xl font-black tracking-tight leading-none ${
              isLight ? "text-zinc-950" : "text-white"
            }`}>
              Official & Authorised <br />
              <span className={isLight ? "text-emerald-600" : "text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-500"}>JUUL Partner UAE</span>
            </h2>
            <p className={`text-sm max-w-2xl leading-relaxed ${isLight ? "text-zinc-500" : "text-zinc-400"}`}>
              We strictly enforce quality controls, import compliance, and anti-counterfeiting measures. Learn more about our direct import protocols and official status.
            </p>
          </motion.div>

          {/* Top Right: Green Shield Badge Centered Wrapper */}
          <div className="lg:col-span-4 flex items-center justify-center lg:justify-end min-h-[280px]">
            
            {/* Outer motion wrapper that floats the whole assembly together to prevent rings from drifting */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              animate={{
                y: [0, -6, 0],
              }}
              transition={{
                y: {
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                },
                default: { duration: 0.6 }
              }}
              className="relative w-[280px] h-[280px] flex items-center justify-center lg:justify-end"
            >
              {/* Concentric Rotating Green Dashed Rings in background */}
              <div className="absolute w-[240px] h-[240px] rounded-full border-2 border-dashed border-emerald-500/20 ring-clockwise pointer-events-none left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 lg:left-auto lg:translate-x-0 lg:right-[15px]" />
              <div className="absolute w-[210px] h-[210px] rounded-full border border-dashed border-emerald-500/10 ring-counter pointer-events-none left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 lg:left-auto lg:translate-x-0 lg:right-[30px]" />
              
              {/* Premium Green Shield Badge */}
              <motion.div 
                whileHover={{ scale: 1.05, rotate: 0.5 }}
                className="relative w-[150px] h-[176px] sm:w-[170px] sm:h-[200px] flex items-center justify-center filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.5)] z-10 cursor-pointer mr-0 lg:mr-[50px]"
              >
                {/* SVG Shield Path with Emerald Gradient and Dark Slate Fill */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 118" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="shieldBg" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#1C2333" />
                      <stop offset="100%" stopColor="#0B0F19" />
                    </linearGradient>
                    <linearGradient id="emeraldBorder" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#34D399" />
                      <stop offset="50%" stopColor="#10B981" />
                      <stop offset="100%" stopColor="#059669" />
                    </linearGradient>
                  </defs>
                  {/* Outer emerald border path */}
                  <path 
                    d="M50 3 L92 18 V55 C92 78.5 74 97.5 50 112 C26 97.5 8 78.5 8 55 V18 L50 3 Z" 
                    fill="url(#shieldBg)" 
                    stroke="url(#emeraldBorder)" 
                    strokeWidth="2.5"
                  />
                  {/* Inner emerald accent dashed path */}
                  <path 
                    d="M50 9 L86 22 V53 C86 73 71 89.5 50 102 C29 89.5 14 73 14 53 V22 L50 9 Z" 
                    stroke="url(#emeraldBorder)" 
                    strokeWidth="0.8" 
                    strokeOpacity="0.5" 
                    strokeDasharray="3 3"
                  />
                </svg>

                {/* Shield Content */}
                <div className="relative z-10 flex flex-col items-center text-center p-3">
                  <Award className="w-8 h-8 text-emerald-400 mb-1.5 filter drop-shadow-[0_2px_8px_rgba(16,185,129,0.4)] animate-pulse" />
                  
                  <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.22em] text-emerald-400 leading-none">
                    OFFICIAL
                  </span>
                  <span className="text-[10px] sm:text-[11.5px] font-black uppercase tracking-[0.12em] text-white mt-1 leading-none">
                    JUUL
                  </span>
                  <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.22em] text-emerald-400 mt-1 leading-none">
                    GUARANTEE
                  </span>
                  
                  <div className="w-7 h-px bg-emerald-500/35 my-1.5" />
                  
                  <span className="text-[6.5px] sm:text-[7.5px] font-mono tracking-widest text-zinc-400 uppercase">
                    ESTD 2021
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>

        </div>

        {/* Horizontal Divider Line */}
        <div className={`w-full h-px mb-16 ${
          isLight ? "bg-zinc-200" : "bg-white/10"
        }`} />

        {/* Bottom Section: Cards Presentation Container (Full Width Stack) */}
        <div className="w-full flex flex-col gap-6 text-left">
          
          {/* Top Single Full-Width Card (Sourcing Integrity) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            whileHover={{ y: -6 }}
            className={`p-6 sm:p-8 rounded-[24px] border transition-all duration-300 group cursor-default ${
              isLight 
                ? "bg-white border-zinc-200/80 shadow-md hover:shadow-lg hover:border-emerald-500/20" 
                : "bg-[#0C0F16] border-white/5 hover:border-emerald-500/10 shadow-2xl hover:shadow-[0_15px_40px_rgba(16,185,129,0.02)]"
            }`}
          >
            <div className="flex items-center gap-4 mb-5">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-300 ${
                isLight 
                  ? "bg-emerald-50 border-emerald-100 text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white group-hover:border-emerald-500" 
                  : "bg-white/[0.02] border-white/5 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-zinc-950 group-hover:border-emerald-500"
              }`}>
                <ShieldCheck className="w-5 h-5 transition-transform duration-300 group-hover:rotate-[360deg]" />
              </div>
              <div>
                <h3 className={`text-sm font-black tracking-tight transition-colors duration-300 ${
                  isLight ? "text-zinc-950 group-hover:text-emerald-600" : "text-white group-hover:text-emerald-400"
                }`}>
                  JUUL Sourcing Integrity & Supply Chain Standards
                </h3>
                <p className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-0.5">Verified Import Protocols</p>
              </div>
            </div>
            <p className={`text-xs leading-relaxed font-light ${
              isLight ? "text-zinc-500" : "text-zinc-400"
            }`}>
              When it comes to electronic nicotine delivery systems, quality and safety are of paramount importance. As a trusted premium supplier in the region, we are committed to providing only 100% authentic, factory-sealed JUUL devices and accessories. We have built an uncompromising supply network that sources products directly from official, authorized distribution hubs in the United States and the United Kingdom. This direct channel bypasses third-party middle-agents, ensuring that every product arrives in its original factory packaging. In an industry where counterfeits and clones are unfortunately common, our structured supply chain provides peace of mind for adult consumers who value consistency, purity, and safety. Every batch we import undergoes double-layer authentication checks. When shipments arrive at our warehouse facilities, batch numbers, holographic stamps, and security seals are systematically logged and checked against manufacturer databases. Furthermore, we recognize that nicotine-salt e-liquids are highly sensitive to environmental factors. Exposure to extreme heat, direct sunlight, or pressure fluctuations during transit can degrade flavor quality and cause leaking. To prevent this, our logistics network utilizes climate-controlled transit systems from departure to delivery, preserving the exact chemical balance and flavor integrity of the e-liquid. Authentic JUUL products feature advanced micro-engravings, unique batch serial cards, and precise connection pins designed to communicate with the device. Counterfeit products often bypass these standards, using sub-standard coils and untested chemical ingredients that can pose significant health risks. We actively encourage our community to inspect the security features of their purchases, including looking for official duty stamps and batch numbers. Since establishing our storefront in 2021, we have served hundreds of thousands of satisfied customers who trust us as their primary source of official JUUL hardware.
            </p>
          </motion.div>

          {/* Bottom 2 Columns Grid (JUUL 1 and JUUL 2 cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            
            {/* JUUL 1 Classic Series Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}
              whileHover={{ y: -6 }}
              className={`p-6 sm:p-8 rounded-[24px] border transition-all duration-300 group cursor-default ${
                isLight 
                  ? "bg-white border-zinc-200/80 shadow-md hover:shadow-lg hover:border-emerald-500/20" 
                  : "bg-[#0C0F16] border-white/5 hover:border-emerald-500/10 shadow-2xl hover:shadow-[0_15px_40px_rgba(16,185,129,0.02)]"
              }`}
            >
              <div className="flex items-center gap-4 mb-5">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-300 ${
                  isLight 
                    ? "bg-emerald-50 border-emerald-100 text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white group-hover:border-emerald-500" 
                    : "bg-white/[0.02] border-white/5 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-zinc-950 group-hover:border-emerald-500"
                }`}>
                  <Compass className="w-5 h-5 transition-transform duration-300 group-hover:rotate-45" />
                </div>
                <div>
                  <h3 className={`text-sm font-black tracking-tight transition-colors duration-300 ${
                    isLight ? "text-zinc-950 group-hover:text-emerald-600" : "text-white group-hover:text-emerald-400"
                  }`}>
                    JUUL 1 Classic Series (US Import)
                  </h3>
                  <p className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-0.5">3.0% / 5.0% Nicotine Salts</p>
                </div>
              </div>
              <p className={`text-xs leading-relaxed font-light ${
                isLight ? "text-zinc-500" : "text-zinc-400"
              }`}>
                Our JUUL 1 collection caters directly to adult smokers seeking traditional nicotine salt formulations under American manufacturing standards. Sourced from authorized US distributors, these classic devices and pods are celebrated for their simple click-and-play fitment, satisfying throat hit, and robust flavor delivery. JUUL 1 pods feature strengths of 3.0% and 5.0% nicotine by weight, utilizing a proprietary formulation designed to mimic the sensory experience of a traditional cigarette. We guarantee that all imported JUUL 1 starter kits, basic kits, and classic pod flavor packs (such as Virginia Tobacco and Cool Mint) are authentic imports in original packaging. We maintain strict stock control to ensure you receive fresh batches with optimal e-liquid quality, preventing the oxidation and leakage common in counterfeit alternatives. Since its global introduction, the JUUL 1 platform has remained the gold standard for simple, reliable, and portable nicotine delivery. Our supply chain ensures that these legacy systems remain fully stocked and accessible, providing a dependable bridge away from combustible tobacco with zero compromise on genuine performance.
              </p>
            </motion.div>

            {/* JUUL 2 Smart Series Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.15 }}
              whileHover={{ y: -6 }}
              className={`p-6 sm:p-8 rounded-[24px] border transition-all duration-300 group cursor-default ${
                isLight 
                  ? "bg-white border-zinc-200/80 shadow-md hover:shadow-lg hover:border-emerald-500/20" 
                  : "bg-[#0C0F16] border-white/5 hover:border-emerald-500/10 shadow-2xl hover:shadow-[0_15px_40px_rgba(16,185,129,0.02)]"
              }`}
            >
              <div className="flex items-center gap-4 mb-5">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-300 ${
                  isLight 
                    ? "bg-emerald-50 border-emerald-100 text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white group-hover:border-emerald-500" 
                    : "bg-white/[0.02] border-white/5 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-zinc-950 group-hover:border-emerald-500"
                }`}>
                  <Flame className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                </div>
                <div>
                  <h3 className={`text-sm font-black tracking-tight transition-colors duration-300 ${
                    isLight ? "text-zinc-950 group-hover:text-emerald-600" : "text-white group-hover:text-emerald-400"
                  }`}>
                    JUUL 2 Smart Series (UK Import)
                  </h3>
                  <p className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-0.5">1.8% Nicotine (TPD Compliant)</p>
                </div>
              </div>
              <p className={`text-xs leading-relaxed font-light ${
                isLight ? "text-zinc-500" : "text-zinc-400"
              }`}>
                The next-generation JUUL 2 system represents a significant leap forward in smart vaping technology, imported exclusively from certified channels in the United Kingdom. Designed to comply fully with the strict European Tobacco Products Directive (TPD) regulations, JUUL 2 pods feature a maximum nicotine strength of 20mg/ml (typically formatted as 18mg/ml or 1.8% nicotine by volume). These pods undergo rigorous testing overseen by the Medicines and Healthcare products Regulatory Agency (MHRA) to guarantee ingredient purity and compliance. The JUUL 2 device introduces intelligent features, including smart temperature control that prevents dry hits, bluetooth pairing with the official JUUL companion app, and secure child-lock features. Each pod is equipped with an integrated security chip that verifies authenticity instantly when connected to the device, preventing usage of counterfeit or clone pods. We ensure that our imported JUUL 2 stock is sourced directly from licensed UK wholesalers, ensuring you experience the enhanced vapor density, longer battery life, and advanced smart features exactly as engineered by JUUL Labs.
              </p>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}
