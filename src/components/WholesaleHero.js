import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, ShieldCheck, Truck, Check } from "lucide-react";

function AnimatedNumber({ value, prefix = "", suffix = "" }) {
  const [displayValue, setDisplayValue] = useState(0);
  const elementRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentEl = elementRef.current;
    if (currentEl) {
      observer.observe(currentEl);
    }

    return () => {
      if (currentEl) {
        observer.unobserve(currentEl);
      }
    };
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    const end = value;
    const duration = 1200; // 1.2 seconds duration
    const startTime = performance.now();

    const updateNumber = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      if (elapsedTime < duration) {
        const progress = elapsedTime / duration;
        const currentCount = Math.floor(progress * end);
        setDisplayValue(currentCount);
        requestAnimationFrame(updateNumber);
      } else {
        setDisplayValue(end);
      }
    };

    requestAnimationFrame(updateNumber);
  }, [hasAnimated, value]);

  return (
    <span ref={elementRef}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}

export default function WholesaleHero({ theme }) {
  const isLight = theme === "light";

  return (
    <section className="relative pt-32 pb-20 overflow-hidden w-full">
      {/* Ambient backgrounds */}
      <div
        className="absolute top-10 left-10 w-[350px] h-[350px] rounded-full pointer-events-none transition-colors duration-1000 z-0"
        style={{
          background: isLight 
            ? `radial-gradient(circle, rgba(16, 185, 129, 0.05) 0%, transparent 70%)`
            : `radial-gradient(circle, rgba(16, 185, 129, 0.02) 0%, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* LEFT COLUMN: Texts & Metrics */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-left flex flex-col items-start"
          >
            {/* Pill Badge */}
            <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border ${
              isLight 
                ? "bg-emerald-50 text-emerald-600 border-emerald-200" 
                : "bg-emerald-950/30 text-emerald-400 border-emerald-500/30"
            }`}>
              <Sparkles className="w-4 h-4 shrink-0 text-emerald-500" /> UAE's Official Wholesale B2B
            </span>

            {/* Main Heading */}
            <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6 leading-tight font-outfit ${
              isLight ? "text-zinc-950" : "text-white"
            }`}>
              UAE's Premium <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">
                JUUL & Vape
              </span> <br />
              Supplier
            </h1>

            {/* Subtext */}
            <p className={`text-base sm:text-lg leading-relaxed mb-8 max-w-xl ${
              isLight ? "text-zinc-650" : "text-zinc-400"
            }`}>
              Secure, guaranteed authentic B2B supply chains for retail businesses. Access special volume-tiered rates on JUUL 2 Devices, pods, and essential vape inventory with official TRA/ESMA compliance.
            </p>

            {/* Metrics Row */}
            <div className="flex flex-wrap gap-4 mb-8 w-full">
              {[
                { target: 100, prefix: "", suffix: "%", desc: "Authentic" },
                { target: 24, prefix: "", suffix: "h", desc: "Verification" },
                { target: 5, prefix: "AED ", suffix: "K", desc: "Min Order" }
              ].map((m, i) => (
                <div
                  key={i}
                  className={`px-6 py-4 rounded-2xl flex flex-col items-center justify-center text-center min-w-[110px] border ${
                    isLight 
                      ? "bg-white border-zinc-150 shadow-sm shadow-zinc-100" 
                      : "bg-zinc-900/50 border-white/5"
                  }`}
                >
                  <span className="text-xl sm:text-2xl font-black text-red-500 font-outfit leading-none mb-1">
                    <AnimatedNumber value={m.target} prefix={m.prefix} suffix={m.suffix} />
                  </span>
                  <span className={`text-[9px] font-bold uppercase tracking-widest leading-none ${
                    isLight ? "text-zinc-450" : "text-zinc-500"
                  }`}>
                    {m.desc}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <a
                href="#apply"
                className={`inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest transition-all active:scale-95 shadow-lg ${
                  isLight
                    ? "bg-zinc-950 text-white hover:bg-emerald-500 shadow-zinc-950/20 hover:shadow-emerald-500/25"
                    : "bg-white text-zinc-950 hover:bg-emerald-500 hover:text-white shadow-white/5 hover:shadow-emerald-500/25"
                }`}
              >
                Apply for Wholesale Account <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#catalog"
                className={`inline-flex items-center px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest border transition-all active:scale-95 ${
                  isLight
                    ? "border-zinc-200 text-zinc-700 bg-white hover:border-emerald-500 hover:text-emerald-500 hover:bg-emerald-50/30"
                    : "border-white/10 text-zinc-350 bg-transparent hover:border-emerald-500 hover:text-emerald-400 hover:bg-emerald-500/5"
                }`}
              >
                Compliance Policy
              </a>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Interactive CSS Device Render */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative w-full aspect-square max-w-[450px] mx-auto flex items-center justify-center z-10"
          >
            {/* Dashed Orbit Ring */}
            <div className={`absolute w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] rounded-full border border-dashed pointer-events-none z-0 ${
              isLight ? "border-zinc-200" : "border-white/10"
            }`} />

            {/* Soft Ambient Inner Glow */}
            <div className="absolute w-[220px] h-[220px] rounded-full bg-emerald-500/5 blur-3xl pointer-events-none z-0" />

            {/* JUUL Device Mockup */}
            <div className={`relative w-10 h-60 sm:w-11 sm:h-64 rounded-md shadow-xl flex flex-col items-center justify-between py-6 z-10 ${
              isLight 
                ? "bg-gradient-to-b from-zinc-200 via-zinc-300 to-zinc-400 border border-zinc-300"
                : "bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-900 border border-zinc-800"
            }`}>
              {/* Inserted Pod */}
              <div className={`absolute -top-7 w-[34px] sm:w-[38px] h-9 rounded-t-sm flex flex-col items-center justify-end pb-1.5 shadow-inner ${
                isLight ? "bg-zinc-850" : "bg-black"
              }`}>
                {/* Juice window */}
                <div className="w-[18px] h-2.5 rounded-sm bg-amber-500/80 shadow-md border border-amber-600/30" />
              </div>

              {/* Top indicator light */}
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10B981] animate-pulse mt-4" />

              {/* Fine horizontal charging contact split line at bottom */}
              <div className={`w-full h-[1px] ${isLight ? "bg-zinc-400/40" : "bg-zinc-650/40"} mb-12`} />

              {/* Embossed Logo text (vertical orientation) */}
              <span className={`text-[7px] font-black tracking-[0.2em] select-none uppercase rotate-180 ${
                isLight ? "text-zinc-500/30" : "text-zinc-600/30"
              }`}>
                JUUL
              </span>
            </div>

            {/* Tag 1: TRA Certified (Top Right) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className={`absolute top-[28%] left-[58%] sm:left-[60%] z-20 flex items-center gap-3 px-4 py-2.5 rounded-2xl border shadow-lg backdrop-blur-md ${
                isLight 
                  ? "bg-white/95 border-zinc-150 shadow-zinc-200/45 text-zinc-950" 
                  : "bg-zinc-900/90 border-white/10 shadow-black/40 text-white"
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="text-left leading-tight">
                <div className="text-xs font-black uppercase tracking-wider font-outfit">TRA Certified</div>
                <div className={`text-[10px] ${isLight ? "text-zinc-500" : "text-zinc-400"}`}>ESMA Standard</div>
              </div>
            </motion.div>

            {/* Tag 2: Express B2B (Bottom Left) */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className={`absolute bottom-[28%] right-[58%] sm:right-[60%] z-20 flex items-center gap-3 px-4 py-2.5 rounded-2xl border shadow-lg backdrop-blur-md ${
                isLight 
                  ? "bg-white/95 border-zinc-150 shadow-zinc-200/45 text-zinc-950" 
                  : "bg-zinc-900/90 border-white/10 shadow-black/40 text-white"
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                <Truck className="w-4 h-4" />
              </div>
              <div className="text-left leading-tight">
                <div className="text-xs font-black uppercase tracking-wider font-outfit">Express B2B</div>
                <div className={`text-[10px] ${isLight ? "text-zinc-500" : "text-zinc-400"}`}>Dubai & UAE wide</div>
              </div>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
