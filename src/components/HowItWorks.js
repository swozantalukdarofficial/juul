"use client";

import { Smartphone, Sparkles, Wind } from "lucide-react";
import { motion } from "framer-motion";

export default function HowItWorks({ theme }) {
  const isLight = theme === "light";

  const steps = [
    {
      icon: <Smartphone className="w-6 h-6 transition-colors duration-500" />,
      step: "01",
      title: "Pick Your Device",
      desc: "Select your preferred premium anodized metal finish (Slate or Matte Carbon Black) designed for sleek everyday carry."
    },
    {
      icon: <Sparkles className="w-6 h-6 transition-colors duration-500" />,
      step: "02",
      title: "Snap In Your Pod",
      desc: "Choose from our premium pre-filled flavor pods (Cool Mint, Royal Mango, Virginia Tobacco, Menthol) and snap it into place."
    },
    {
      icon: <Wind className="w-6 h-6 transition-colors duration-500" />,
      step: "03",
      title: "Inhale & Enjoy",
      desc: "Micro-sensors automatically activate upon draw, heating the flavor vapor to a perfectly stable temperature for pure satisfaction."
    }
  ];

  return (
    <section className={`py-24 border-b transition-colors duration-500 relative overflow-hidden ${
      isLight ? "bg-zinc-50 border-zinc-200/80" : "bg-[#070708] border-white/5"
    }`}>
      {/* Background Soft Glows (GPU Optimized) */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] pointer-events-none rounded-full" 
           style={{ background: isLight ? "radial-gradient(circle, rgba(16,185,129,0.03) 0%, transparent 70%)" : "radial-gradient(circle, rgba(16,185,129,0.02) 0%, transparent 70%)" }} />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] pointer-events-none rounded-full" 
           style={{ background: isLight ? "radial-gradient(circle, rgba(16,185,129,0.02) 0%, transparent 70%)" : "radial-gradient(circle, rgba(16,185,129,0.02) 0%, transparent 70%)" }} />

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="space-y-3.5 mb-20"
        >
          <span className={`text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full border ${
            isLight 
              ? "bg-white border-zinc-200 text-zinc-400" 
              : "bg-white/5 border-white/10 text-zinc-500"
          }`}>
            Getting Started
          </span>
          <h2 className={`text-3xl sm:text-5xl font-black tracking-tight pt-3 ${
            isLight ? "text-zinc-950" : "text-white"
          }`}>
            How It Works
          </h2>
          <p className={`text-sm max-w-md mx-auto font-medium leading-relaxed ${
            isLight ? "text-zinc-550" : "text-zinc-400"
          }`}>
            Experience premium nicotine delivery in three simple steps. No buttons, no complex settings.
          </p>
        </motion.div>

        {/* Steps Grid Container */}
        <div className="relative">
          
          {/* Connection Line (Desktop) */}
          <div className="hidden md:block absolute top-[52px] left-[16%] right-[16%] h-[2px] pointer-events-none z-0">
            <div className={`w-full h-full border-t-2 border-dashed transition-colors duration-500 ${
              isLight ? "border-zinc-200" : "border-white/10"
            }`} />
          </div>

          {/* Grid of Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: idx * 0.2, duration: 0.6, ease: "easeOut" }}
                className={`group rounded-3xl p-8 border text-left relative overflow-hidden transition-all duration-500 hover:-translate-y-2 ${
                  isLight 
                    ? "bg-white border-zinc-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.015)] hover:border-emerald-500/30 hover:shadow-[0_20px_45px_rgba(16,185,129,0.05)]" 
                    : "bg-white/[0.01] border-white/5 hover:border-emerald-500/30 hover:bg-white/[0.02] hover:shadow-[0_20px_45px_rgba(16,185,129,0.02)]"
                }`}
              >
                {/* Step number backdrop */}
                <span className={`absolute -right-4 -top-8 text-8xl font-black opacity-[0.03] select-none transition-all duration-500 ${
                  isLight 
                    ? "text-zinc-950 group-hover:text-emerald-600 group-hover:opacity-[0.07]" 
                    : "text-white group-hover:text-emerald-400 group-hover:opacity-[0.07]"
                }`}>
                  {step.step}
                </span>

                {/* Step badge */}
                <span className={`inline-block text-[9px] uppercase font-black tracking-[0.2em] px-3 py-1 rounded-full mb-6 border transition-all duration-500 ${
                  isLight 
                    ? "bg-emerald-50 text-emerald-600 border-emerald-100/50 group-hover:bg-emerald-100/50" 
                    : "bg-emerald-500/5 text-emerald-400 border-emerald-500/10 group-hover:bg-emerald-500/10"
                }`}>
                  Step {step.step}
                </span>

                {/* Icon wrapper */}
                <div className={`p-3.5 rounded-2xl border w-fit mb-6 transition-all duration-500 ${
                  isLight 
                    ? "bg-zinc-50 border-zinc-200 text-zinc-700 group-hover:bg-emerald-500 group-hover:border-emerald-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-emerald-500/20" 
                    : "bg-white/5 border-white/10 text-zinc-300 group-hover:bg-emerald-500 group-hover:border-emerald-500 group-hover:text-zinc-950 group-hover:shadow-lg group-hover:shadow-emerald-500/20"
                }`}>
                  {step.icon}
                </div>

                {/* Content */}
                <h3 className={`text-lg font-black mb-2.5 transition-colors duration-300 ${
                  isLight ? "text-zinc-950 group-hover:text-emerald-600" : "text-white group-hover:text-emerald-400"
                }`}>
                  {step.title}
                </h3>
                <p className={`text-xs sm:text-[13px] font-semibold leading-relaxed transition-colors duration-300 ${
                  isLight ? "text-zinc-500 group-hover:text-zinc-650" : "text-zinc-400 group-hover:text-zinc-300"
                }`}>
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
