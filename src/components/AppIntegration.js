"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Bluetooth,
  BatteryFull,
  Lock,
  BarChart3,
  Bell,
  Shield,
  Smartphone,
  ChevronRight,
  Wifi,
  Signal,
  Sparkles
} from "lucide-react";

const APP_FEATURES = [
  {
    icon: <Bluetooth className="w-5 h-5" />,
    title: "Instant Bluetooth Connect",
    desc: "Pair with your JUUL 2 device in seconds. Auto-reconnects every time.",
    color: "#10b981",
    screen: 0,
  },
  {
    icon: <BarChart3 className="w-5 h-5" />,
    title: "Usage Analytics",
    desc: "Track daily puff count, weekly trends, and nicotine intake in real-time.",
    color: "#10b981",
    screen: 1,
  },
  {
    icon: <Lock className="w-5 h-5" />,
    title: "Device Lock & Find",
    desc: "Remotely lock your JUUL if lost and locate it via Bluetooth proximity scan.",
    color: "#ef4444",
    screen: 2,
  },
  {
    icon: <BatteryFull className="w-5 h-5" />,
    title: "Battery Monitoring",
    desc: "Live battery status with low-battery push alerts before you run out.",
    color: "#10b981",
    screen: 0,
  },
  {
    icon: <Bell className="w-5 h-5" />,
    title: "Smart Notifications",
    desc: "Get notified when your pod is running low or a firmware update is ready.",
    color: "#10b981",
    screen: 1,
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: "Age Verification Lock",
    desc: "Built-in age gate — only verified adults can operate the connected device.",
    color: "#ef4444",
    screen: 2,
  },
];

const SCREENS = [
  { src: "/app-screen1.png", label: "Dashboard" },
  { src: "/app-screen2.png", label: "Usage Stats" },
  { src: "/app-screen3.png", label: "Device Settings" },
];

export default function AppIntegration({ theme }) {
  const [activeScreen, setActiveScreen] = useState(0);
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const isLight = theme === "light";

  // Auto-switch screens and highlight corresponding features
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveFeatureIndex((prev) => {
        const nextIdx = (prev + 1) % APP_FEATURES.length;
        setActiveScreen(APP_FEATURES[nextIdx].screen);
        return nextIdx;
      });
    }, 3500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handleFeatureClick = (index, screenIdx) => {
    setIsPaused(true);
    setActiveFeatureIndex(index);
    setActiveScreen(screenIdx);
  };

  return (
    <section className={`py-20 sm:py-28 transition-colors duration-500 overflow-hidden relative ${
      isLight ? "bg-zinc-50" : "bg-[#09090B]"
    }`}>
      {/* Dynamic Glowing Mesh in background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none opacity-[0.04]"
        style={{
          background: `radial-gradient(circle, ${APP_FEATURES[activeFeatureIndex].color} 0%, transparent 70%)`,
          transition: "background 0.8s ease"
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">

        {/* ── Section Header ── */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
        >
          <div className="inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-full border border-zinc-200 dark:border-white/10 bg-white/50 dark:bg-white/[0.02] backdrop-blur-sm shadow-sm">
            <Smartphone className={`w-3.5 h-3.5 text-blue-500`} />
            <span className={`text-[10px] font-black uppercase tracking-widest ${
              isLight ? "text-zinc-650" : "text-zinc-350"
            }`}>
              Official Companion App · Smart Connectivity
            </span>
          </div>
          <h2 className={`text-3xl sm:text-5xl font-black tracking-tight leading-tight ${
            isLight ? "text-zinc-950" : "text-white"
          }`}>
            Control Your JUUL 2 <br className="xs:block hidden" />
            <span className={`text-transparent bg-clip-text bg-gradient-to-r ${isLight ? "from-zinc-900 to-zinc-600" : "from-white to-zinc-400"}`}>
              Directly From Your Phone
            </span>
          </h2>
          <p className={`text-xs sm:text-sm max-w-2xl mx-auto font-light leading-relaxed ${
            isLight ? "text-zinc-550" : "text-zinc-400"
          }`}>
            Discover the smart vaping era. Pair your JUUL 2 via Bluetooth to monitor your battery health, track puff counts, lock your device remotely, and secure age verification in one tap.
          </p>
        </motion.div>

        {/* ── Grid Container ── */}
        <div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >

          {/* LEFT: Premium Phone Mockup (Col 5) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-5 flex flex-col items-center gap-6"
          >
            {/* Phone Bezel Container */}
            <div className="relative">
              {/* Dynamic Aura Glow Behind Phone */}
              <div 
                className="absolute inset-0 w-full h-full rounded-full blur-[60px] opacity-15 transition-all duration-700 pointer-events-none"
                style={{ backgroundColor: APP_FEATURES[activeFeatureIndex].color }}
              />

              {/* iPhone Style Bezel */}
              <div className={`relative w-[250px] sm:w-[270px] aspect-[9/19] rounded-[48px] p-2.5 shadow-2xl border transition-colors duration-500 ${
                isLight 
                  ? "bg-zinc-950 border-zinc-800 shadow-zinc-950/20" 
                  : "bg-zinc-900 border-white/10 shadow-black/80"
              }`}>
                {/* Dynamic Island / Notch */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-5 bg-zinc-950 rounded-full z-30 flex items-center justify-between px-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-900/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-900/80 border border-zinc-800" />
                </div>

                {/* Status Bar */}
                <div className="absolute top-10 left-6 right-6 z-20 flex justify-between items-center text-[9px] font-bold text-white/95 px-1 font-sans">
                  <span>9:41</span>
                  <div className="flex items-center gap-1">
                    <Signal className="w-2.5 h-2.5" />
                    <Wifi className="w-2.5 h-2.5" />
                    <div className="w-4 h-2 border border-white/70 rounded-sm p-0.5 flex items-center">
                      <div className="w-full h-full bg-white rounded-2xs" />
                    </div>
                  </div>
                </div>

                {/* Screen Content Wrapper */}
                <div className="w-full h-full rounded-[38px] overflow-hidden relative bg-zinc-950 border border-black/40">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeScreen}
                      initial={{ opacity: 0, x: 25 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -25 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="relative w-full h-full"
                    >
                      <Image
                        src={SCREENS[activeScreen].src}
                        alt={SCREENS[activeScreen].label}
                        fill
                        className="object-cover"
                        sizes="270px"
                        priority
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Carousel Navigation Indicators */}
            <div className="flex gap-2 p-1.5 rounded-full border border-zinc-200 dark:border-white/5 bg-white/50 dark:bg-white/[0.02]">
              {SCREENS.map((scr, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setIsPaused(true);
                    setActiveScreen(idx);
                    // Find first feature index that uses this screen
                    const matchingFeat = APP_FEATURES.findIndex(f => f.screen === idx);
                    if (matchingFeat !== -1) setActiveFeatureIndex(matchingFeat);
                  }}
                  className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                    activeScreen === idx
                      ? isLight
                        ? "bg-zinc-950 text-white"
                        : "bg-white text-zinc-950"
                      : isLight
                      ? "text-zinc-550 hover:text-zinc-900"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {scr.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: Bento Grid Features (Col 7) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {APP_FEATURES.map((feat, index) => {
              const isActive = activeFeatureIndex === index;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  onClick={() => handleFeatureClick(index, feat.screen)}
                  className={`p-5 rounded-2xl border cursor-pointer text-left transition-all duration-300 relative group overflow-hidden ${
                    isActive
                      ? isLight
                        ? "bg-white border-zinc-300 shadow-md shadow-zinc-100 scale-[1.02]"
                        : "bg-white/[0.02] border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.15)] scale-[1.02]"
                      : isLight
                      ? "bg-transparent border-zinc-200/60 hover:bg-white/40 hover:border-zinc-250"
                      : "bg-transparent border-white/5 hover:bg-white/[0.01] hover:border-white/10"
                  }`}
                  style={{
                    borderColor: isActive ? feat.color : ""
                  }}
                >
                  {/* Subtle color overlay for active feature */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-[0.01] transition-opacity duration-300 pointer-events-none"
                    style={{ backgroundColor: feat.color }}
                  />
                  {isActive && (
                    <div 
                      className="absolute inset-0 opacity-[0.03] pointer-events-none"
                      style={{ backgroundColor: feat.color }}
                    />
                  )}

                  {/* Top Bar inside card */}
                  <div className="flex items-center justify-between mb-3">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
                      style={{
                        backgroundColor: isActive ? `${feat.color}15` : isLight ? "#f4f4f5" : "#18181b",
                        color: feat.color
                      }}
                    >
                      {feat.icon}
                    </div>
                    {isActive && (
                      <span 
                        className="text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: `${feat.color}15`,
                          color: feat.color
                        }}
                      >
                        Active Screen
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <h3 className={`text-sm font-black mb-1.5 transition-colors ${
                    isLight 
                      ? isActive ? "text-zinc-950" : "text-zinc-800" 
                      : isActive ? "text-white" : "text-zinc-200"
                  }`}>
                    {feat.title}
                  </h3>
                  <p className={`text-xs font-light leading-relaxed min-h-[48px] ${
                    isLight ? "text-zinc-550" : "text-zinc-400"
                  }`}>
                    {feat.desc}
                  </p>

                  {/* Bottom Indicator Line */}
                  <div 
                    className={`h-[1px] absolute bottom-0 left-5 right-5 transition-transform duration-500 scale-x-0 ${
                      isActive ? "scale-x-100" : "group-hover:scale-x-50"
                    }`}
                    style={{
                      background: `linear-gradient(to right, transparent, ${feat.color}, transparent)`
                    }}
                  />
                </motion.div>
              );
            })}
          </div>

        </div>

        {/* ── Downloads / Badge Row ── */}
        <div className="mt-16 pt-10 border-t border-zinc-200 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h4 className={`text-xs font-black uppercase tracking-wider ${isLight ? "text-zinc-950" : "text-white"}`}>
                Sync in Real-time
              </h4>
              <p className={`text-[10px] sm:text-xs font-light ${isLight ? "text-zinc-550" : "text-zinc-450"}`}>
                Download the official JUUL App to unlock advanced metrics & security.
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-4">
            {/* Google Play Button */}
            <a
              href="https://play.google.com/store/search?q=juul&c=apps"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-3 px-5 py-3 rounded-2xl border transition-all duration-300 hover:scale-[1.03] cursor-pointer shadow-sm ${
                isLight
                  ? "bg-zinc-950 border-zinc-900 text-white hover:bg-zinc-800 shadow-zinc-950/10"
                  : "bg-white border-zinc-100 text-zinc-950 hover:bg-zinc-100"
              }`}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.18 23.76c.32.18.68.24 1.06.14l12.65-7.31-2.75-2.75-10.96 9.92zM.5 1.4C.19 1.76 0 2.28 0 2.96v18.08c0 .68.19 1.2.5 1.56l.08.08 10.13-10.13v-.24L.58 1.32.5 1.4zM20.1 10.23l-2.62-1.51-3.08 3.08 3.08 3.08 2.64-1.53c.75-.43.75-1.13-.02-1.56v-.06zM4.24.1L16.88 7.41l-2.75 2.75L4.16.24c.02 0 .05-.09.08-.14z" />
              </svg>
              <div className="text-left leading-none">
                <p className="text-[7px] uppercase tracking-widest opacity-70 mb-0.5">Get it on</p>
                <p className="text-xs font-black">Google Play</p>
              </div>
            </a>

            {/* Apple Web App */}
            <a
              href="https://web-app.juul.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-3 px-5 py-3 rounded-2xl border transition-all duration-300 hover:scale-[1.03] cursor-pointer shadow-sm ${
                isLight
                  ? "bg-white border-zinc-200 text-zinc-950 hover:bg-zinc-50"
                  : "bg-white/5 border-white/5 text-white hover:bg-white/10"
              }`}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.17.67-2.88 1.49-.62.71-1.16 1.85-1.01 2.96 1.07.08 2.21-.57 2.9-1.39z" />
              </svg>
              <div className="text-left leading-none">
                <p className="text-[7px] uppercase tracking-widest opacity-70 mb-0.5">Access on iPhone</p>
                <p className="text-xs font-black">Launch Web App</p>
              </div>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
