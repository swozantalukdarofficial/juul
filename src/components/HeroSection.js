"use client";

import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Shield, Truck, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const slides = [
  {
    id: "juul2", badge: "GEN 2 ARRIVAL",
    title: "JUUL 2", subtitle: "Next-Gen Vaping.",
    desc: "Intelligent puff-sensors, premium glowing indicators & robust vapor draw. Hand-delivered across Dubai in under 2 hours.",
    cta: "Shop JUUL 2", color: "#E11D48", version: "juul2",
    specs: [
      { label: "Battery", value: "250mAh+" },
      { label: "Draw", value: "Auto-Sensor" },
      { label: "Indicator", value: "Smart LED" },
      { label: "Charge", value: "Fast USB-C" }
    ]
  },
  {
    id: "juul1", badge: "SIGNATURE BLEND",
    title: "JUUL Classic", subtitle: "3 Signature Aromas.",
    desc: "The original compact masterpiece — perfectly engineered for Cool Mint, Virginia Tobacco & Crisp Menthol.",
    cta: "Shop Classic", color: "#10B981", version: "juul1",
    specs: [
      { label: "Design", value: "Ultra-Slim" },
      { label: "Pods", value: "Click & Play" },
      { label: "Temp", value: "Regulated" },
      { label: "Body", value: "Anodized" }
    ]
  },
  {
    id: "express", badge: "UAE DISPATCH",
    title: "2-Hour Express", subtitle: "100% Authentic.",
    desc: "Fast dispatch across Dubai, Abu Dhabi & Sharjah. Free shipping on orders over AED 150. Genuine products only.",
    cta: "Explore Catalog", color: "#F59E0B", version: "all",
    specs: [
      { label: "Delivery", value: "2 Hours" },
      { label: "Quality", value: "Authentic" },
      { label: "Shipping", value: "Free >150" },
      { label: "Coverage", value: "All UAE" }
    ]
  },
];

export default function HeroSection({ setCurrentPage, setCategoryFilter, setVersionFilter, theme }) {
  const [cur, setCur] = useState(0);
  const timerRef = useRef(null);
  const isLight = theme === "light";
  const s = slides[cur];

  const go = (v) => {
    setCategoryFilter?.("all");
    setVersionFilter?.(v);
    setCurrentPage("collection");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    timerRef.current = setInterval(() => setCur((p) => (p + 1) % slides.length), 7000);
    return () => clearInterval(timerRef.current);
  }, [cur]);

  return (
    <section className={`relative min-h-[100svh] flex items-center overflow-hidden transition-colors duration-700 ${
      isLight ? "bg-zinc-50 text-zinc-900" : "bg-[#050506] text-white"
    }`}>      {/* ═══ CSS Keyframes for all custom animations ═══ */}
      <style>{`
        @keyframes vaporRise {
          0%   { transform: translateY(0) translateX(0) scale(0.8); opacity: 0; }
          12%  { opacity: var(--v-op); }
          75%  { opacity: calc(var(--v-op) * 0.3); }
          100% { transform: translateY(-520px) translateX(var(--v-drift)) scale(2.8); opacity: 0; }
        }
        @keyframes shimmerSweep {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        @keyframes deviceFloat {
          0%, 100% { transform: translateY(0px); }
          50%      { transform: translateY(-14px); }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50%      { opacity: 0.28; transform: scale(1.06); }
        }
        @keyframes spin3D {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(360deg); }
        }
        @keyframes accentLine {
          0%, 100% { opacity: 0.4; }
          50%      { opacity: 1; }
        }
        .shimmer-text {
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: shimmerSweep 3.5s linear infinite;
        }
      `}</style>

      {/* ═══ VAPOR ATMOSPHERE — Hidden on mobile to prevent lag ═══ */}
      <div className="hidden md:block absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${20 + i * 10}px`,
              height: `${20 + i * 10}px`,
              left: `${10 + i * 15}%`,
              bottom: "-5%",
              background: `radial-gradient(circle, ${isLight ? "#a1a1aa" : s.color} 0%, transparent 70%)`,
              animation: `vaporRise ${6 + i * 1.5}s ease-out infinite`,
              animationDelay: `${i * 1.2}s`,
              "--v-op": isLight ? "0.08" : "0.15",
              "--v-drift": `${(i % 2 === 0 ? 1 : -1) * (15 + i * 8)}px`,
              willChange: "transform, opacity",
            }}
          />
        ))}
      </div>

      {/* ═══ GHOST WATERMARK ═══ */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none font-black tracking-tighter hidden sm:block ${
          isLight ? "text-zinc-200/30" : "text-white/[0.015]"
        }`}
        style={{ fontSize: "clamp(160px, 22vw, 380px)", lineHeight: 1 }}
        aria-hidden="true"
      >
        JUUL
      </div>

      {/* ═══ Ambient glow orb (Optimized without blur filter) ═══ */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[400px] sm:w-[700px] sm:h-[700px] rounded-full pointer-events-none transition-colors duration-1000 will-change-transform"
        style={{
          background: `radial-gradient(circle, ${s.color}${isLight ? "10" : "15"} 0%, transparent 60%)`,
          animation: "glowPulse 6s ease-in-out infinite",
        }}
      />

      {/* ═══ Tech grid ═══ */}
      <div className={`absolute inset-0 pointer-events-none ${
        isLight
          ? "bg-[linear-gradient(to_right,#00000004_1px,transparent_1px),linear-gradient(to_bottom,#00000004_1px,transparent_1px)]"
          : "bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)]"
      } bg-[size:40px_40px] opacity-40`} />

      {/* ═══ MAIN CONTENT ═══ */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-5 sm:px-8 pt-28 sm:pt-32 pb-10 sm:pb-14">
        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-14">

          {/* ━━━ LEFT COLUMN: Copy ━━━ */}
          <div className="flex-1 text-center lg:text-left order-2 lg:order-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={cur}
                initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -16, filter: "blur(4px)" }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="space-y-5"
              >
                {/* Badge */}
                <div className="flex justify-center lg:justify-start">
                  <span
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black tracking-[0.2em] uppercase border backdrop-blur-sm"
                    style={{
                      borderColor: `${s.color}30`,
                      color: s.color,
                      backgroundColor: `${s.color}08`,
                    }}
                  >
                    <Sparkles className="w-3 h-3" />
                    {s.badge}
                  </span>
                </div>

                {/* Huge Title + Shimmer Subtitle */}
                <h1 className={`text-[2.8rem] leading-[1.02] sm:text-[3.8rem] lg:text-[4.8rem] font-black tracking-tight ${
                  isLight ? "text-zinc-950" : "text-white"
                }`}>
                  {s.title}
                  <span className="block mt-1">
                    <span
                      className="shimmer-text"
                      style={{
                        backgroundImage: `linear-gradient(90deg, ${s.color}, ${isLight ? "#18181b" : "#ffffff"}, ${s.color}, ${isLight ? "#18181b" : "#ffffff"})`,
                      }}
                    >
                      {s.subtitle}
                    </span>
                  </span>
                </h1>

                {/* Description */}
                <p className={`text-sm sm:text-[15px] leading-relaxed max-w-lg mx-auto lg:mx-0 ${
                  isLight ? "text-zinc-500" : "text-zinc-400"
                }`}>
                  {s.desc}
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-2">
                  <button
                    onClick={() => go(s.version)}
                    className={`group inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-full text-[11px] font-black uppercase tracking-widest transition-all active:scale-95 cursor-pointer relative overflow-hidden ${
                      isLight ? "bg-zinc-950 text-white" : "text-white"
                    }`}
                    style={!isLight ? {
                      background: `linear-gradient(135deg, ${s.color}cc, ${s.color}66)`,
                      boxShadow: `0 8px 32px ${s.color}30`,
                    } : undefined}
                  >
                    {/* Shine sweep on button */}
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    <span className="relative z-10 flex items-center gap-2">
                      {s.cta}
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </button>
                  <button
                    onClick={() => go("all")}
                    className={`inline-flex items-center justify-center px-9 py-4 rounded-full text-[11px] font-black uppercase tracking-widest border transition-all active:scale-95 cursor-pointer ${
                      isLight
                        ? "border-zinc-200 text-zinc-700 hover:bg-zinc-100 hover:border-zinc-300"
                        : "border-white/10 text-zinc-300 hover:bg-white/5 hover:border-white/20"
                    }`}
                  >
                    Full Collection
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slide Indicators & Manual Navigation */}
            <div className="flex items-center gap-3 sm:gap-4 justify-center lg:justify-start pt-8">
              <button 
                onClick={() => setCur((prev) => (prev - 1 + slides.length) % slides.length)}
                className={`p-1.5 sm:p-2 rounded-full transition-colors active:scale-95 ${isLight ? "hover:bg-zinc-100 text-zinc-400 hover:text-zinc-700" : "hover:bg-white/5 text-zinc-500 hover:text-zinc-300"}`}
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <div className="flex items-center gap-2">
                {slides.map((sl, i) => (
                  <button
                    key={sl.id}
                    onClick={() => setCur(i)}
                    className="relative py-2 cursor-pointer focus:outline-none group"
                    aria-label={`Slide ${i + 1}`}
                  >
                    <div className={`h-[3px] rounded-full transition-all duration-500 ${
                      i === cur ? "w-10 sm:w-12" : `w-4 sm:w-5 ${isLight ? "bg-zinc-300 group-hover:bg-zinc-400" : "bg-white/10 group-hover:bg-white/20"}`
                    }`}
                      style={i === cur ? { backgroundColor: sl.color, boxShadow: `0 0 8px ${sl.color}60` } : undefined}
                    />
                  </button>
                ))}
              </div>

              <span className={`text-[9px] sm:text-[10px] font-mono tracking-wider ${isLight ? "text-zinc-400" : "text-zinc-600"}`}>
                0{cur + 1}<span className="mx-1 opacity-40">/</span>0{slides.length}
              </span>

              <button 
                onClick={() => setCur((prev) => (prev + 1) % slides.length)}
                className={`p-1.5 sm:p-2 rounded-full transition-colors active:scale-95 ${isLight ? "hover:bg-zinc-100 text-zinc-400 hover:text-zinc-700" : "hover:bg-white/5 text-zinc-500 hover:text-zinc-300"}`}
                aria-label="Next slide"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          {/* ━━━ RIGHT COLUMN: 360 Floating Device Showcase & Specs Grid ━━━ */}
          <div className="flex-1 flex items-center justify-center order-1 lg:order-2 relative min-w-0 max-w-sm lg:max-w-none mx-auto w-full">

            {/* Concentric glow rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[220px] h-[220px] sm:w-[340px] sm:h-[340px] rounded-full border transition-all duration-700"
                style={{ borderColor: `${s.color}${isLight ? "15" : "0a"}` }} />
              <div className="absolute w-[160px] h-[160px] sm:w-[250px] sm:h-[250px] rounded-full border transition-all duration-700"
                style={{ borderColor: `${s.color}${isLight ? "0c" : "06"}` }} />
            </div>

            {/* Elegant Floating Specs Grid surrounding the device */}
            <div className="absolute inset-0 flex items-center justify-center w-full h-full pointer-events-none z-20">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={cur}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-2 gap-x-44 sm:gap-x-64 lg:gap-x-80 gap-y-48 lg:gap-y-60 w-full max-w-[340px] sm:max-w-[520px] lg:max-w-[700px] px-4"
                >
                  {s.specs?.map((spec, i) => (
                    <motion.div
                      key={`${s.id}-spec-${i}`}
                      initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40, filter: "blur(10px)", scale: 0.9 }}
                      animate={{ opacity: 1, x: 0, filter: "blur(0px)", scale: 1 }}
                      transition={{ delay: i * 0.15, duration: 0.6, ease: "easeOut" }}
                        className={`flex flex-col items-center justify-center text-center px-4 py-3 sm:py-3.5 rounded-2xl backdrop-blur-xl border transition-transform duration-500 will-change-transform ${
                          isLight 
                            ? "bg-white/70 border-white shadow-[0_8px_30px_rgba(0,0,0,0.06)]" 
                            : "bg-[#09090A]/70 border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
                        }`}
                      >
                         <span className={`text-[8px] sm:text-[9px] uppercase tracking-widest font-black flex items-center justify-center gap-1.5 mb-1 ${
                           isLight ? "text-zinc-500" : "text-zinc-400"
                         }`}>
                           <motion.span 
                             animate={{ opacity: [0.3, 1, 0.3] }}
                             transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                             className="w-1.5 h-1.5 rounded-full shadow-sm" 
                             style={{ backgroundColor: s.color, boxShadow: `0 0 6px ${s.color}` }}
                           />
                           {spec.label}
                         </span>
                         
                         <span className={`text-[11px] sm:text-xs lg:text-sm tracking-wide font-extrabold whitespace-nowrap ${
                           isLight ? "text-zinc-950" : "text-white"
                         }`}>
                           {spec.value}
                         </span>
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
            </div>

            {/* 360 Degree True CSS 3D Device Container */}
            <div
              className="relative z-10 w-[44px] h-[340px] flex items-center justify-center pointer-events-none will-change-transform scale-[0.85] sm:scale-[1.15] lg:scale-[1.35]"
              style={{ transformStyle: "preserve-3d", perspective: 1200 }}
            >
              {/* Glow halo (Perfect Circle) */}
              <div
                className="absolute left-1/2 top-1/2 w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] rounded-full transition-colors duration-700 pointer-events-none"
                style={{ 
                   background: `radial-gradient(circle, ${s.color} 0%, transparent 65%)`,
                   opacity: isLight ? 0.2 : 0.35,
                   transform: "translate(-50%, -50%) translateZ(-40px)",
                   filter: "blur(10px)"
                }}
              />

              {/* ----- BOTTOM SHADOW (FLOOR) ----- */}
              <div className="absolute top-[102%] left-1/2 -translate-x-1/2 w-[54px] h-[24px] rounded-[50%]" 
                   style={{ 
                     background: isLight ? "rgba(0,0,0,0.15)" : "rgba(0,0,0,0.7)",
                     boxShadow: isLight ? "0 0 15px 5px rgba(0,0,0,0.1)" : "0 0 20px 10px rgba(0,0,0,0.6)",
                     transform: "translateY(40px) rotateX(90deg)", 
                     filter: "blur(4px)" 
                   }} 
              />

              <div
                className="absolute inset-0 w-full h-full"
                style={{ transformStyle: "preserve-3d", animation: "spin3D 14s linear infinite" }}
              >
                {/* ----- FRONT FACE ----- */}
              <div className="absolute inset-0 flex flex-col items-center shadow-2xl" style={{ transform: "translateZ(8px)", backfaceVisibility: "hidden" }}>
                <div className="w-full h-[15%] bg-[#1a1a1c] relative rounded-t-[2px] border-b-[1.5px] border-black/60 shadow-[inset_0_2px_4px_rgba(255,255,255,0.05)]">
                  {/* Mouthpiece Curve */}
                  <div className="absolute -top-1 w-[45%] left-1/2 -translate-x-1/2 h-1.5 bg-[#1a1a1c] rounded-t-[4px]" />
                </div>
                <div className="w-full flex-1 relative rounded-b-[2px] overflow-hidden shadow-[inset_0_0_12px_rgba(0,0,0,0.3)]" 
                     style={{ background: s.id === "juul1" ? "linear-gradient(160deg, #d4d4d8, #71717a)" : s.id === "juul2" ? "linear-gradient(160deg, #27272a, #09090b)" : "linear-gradient(160deg, #fcd34d, #b45309)" }}>
                   {/* Diamond Window */}
                   <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#1a1a1c] rotate-45 border-[1.5px] border-black/40 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]" />
                   {/* LED Indicator */}
                   <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                     className="absolute top-[35%] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
                     style={{ backgroundColor: s.color, boxShadow: `0 0 12px ${s.color}, 0 0 20px ${s.color}` }}
                   />
                </div>
              </div>

              {/* ----- BACK FACE ----- */}
              <div className="absolute inset-0 flex flex-col items-center" style={{ transform: "rotateY(180deg) translateZ(8px)", backfaceVisibility: "hidden" }}>
                <div className="w-full h-[15%] bg-[#111] relative rounded-t-[2px] border-b-[1.5px] border-black/60 shadow-[inset_0_2px_4px_rgba(255,255,255,0.02)]" />
                <div className="w-full flex-1 relative rounded-b-[2px] shadow-[inset_0_0_12px_rgba(0,0,0,0.3)]" 
                     style={{ background: s.id === "juul1" ? "linear-gradient(160deg, #a1a1aa, #d4d4d8)" : s.id === "juul2" ? "linear-gradient(160deg, #18181b, #27272a)" : "linear-gradient(160deg, #d97706, #fbbf24)" }}>
                   <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#111] rotate-45 border-[1.5px] border-black/40 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]" />
                   <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[7px] tracking-widest opacity-40 rotate-90 font-black text-black select-none">JUUL</div>
                </div>
              </div>

              {/* ----- LEFT FACE (SIDE PROFILE) ----- */}
              <div className="absolute h-full w-[16px] left-1/2 -translate-x-1/2 flex flex-col items-center shadow-2xl" 
                   style={{ transform: "rotateY(-90deg) translateZ(22px)", filter: "brightness(0.65)" }}>
                 <div className="w-full h-[15%] bg-[#0a0a0a] relative rounded-t-[2px] border-r border-black/30 shadow-[inset_0_2px_4px_rgba(255,255,255,0.02)]">
                   {/* Liquid window side slit */}
                   <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-[2.5px] h-[10px] bg-amber-500/60 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]" />
                 </div>
                 <div className="w-full flex-1 rounded-b-[2px] shadow-[inset_0_0_8px_rgba(0,0,0,0.4)]" 
                      style={{ background: s.id === "juul1" ? "#71717a" : s.id === "juul2" ? "#09090b" : "#92400e" }} />
              </div>

              {/* ----- RIGHT FACE (SIDE PROFILE) ----- */}
              <div className="absolute h-full w-[16px] left-1/2 -translate-x-1/2 flex flex-col items-center shadow-2xl" 
                   style={{ transform: "rotateY(90deg) translateZ(22px)", filter: "brightness(0.4)" }}>
                 <div className="w-full h-[15%] bg-[#0a0a0a] relative rounded-t-[2px] border-l border-black/30 shadow-[inset_0_2px_4px_rgba(255,255,255,0.02)]">
                   <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-[2.5px] h-[10px] bg-amber-500/60 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]" />
                 </div>
                 <div className="w-full flex-1 rounded-b-[2px] shadow-[inset_0_0_8px_rgba(0,0,0,0.4)]" 
                      style={{ background: s.id === "juul1" ? "#71717a" : s.id === "juul2" ? "#09090b" : "#92400e" }} />
              </div>

              </div>
            </div>
          </div>
        </div>


      </div>
    </section>
  );
}
