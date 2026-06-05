"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
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
} from "lucide-react";

const APP_FEATURES = [
  {
    icon: <Bluetooth className="w-5 h-5" />,
    title: "Instant Bluetooth Connect",
    desc: "Pair with your JUUL 2 device in seconds. Auto-reconnects every time.",
    color: "#3B82F6",
    screen: 0,
  },
  {
    icon: <BarChart3 className="w-5 h-5" />,
    title: "Usage Analytics",
    desc: "Track daily puff count, weekly trends, and nicotine intake in real-time.",
    color: "#10B981",
    screen: 1,
  },
  {
    icon: <Lock className="w-5 h-5" />,
    title: "Device Lock & Find",
    desc: "Remotely lock your JUUL if lost and locate it via Bluetooth proximity scan.",
    color: "#E11D48",
    screen: 2,
  },
  {
    icon: <BatteryFull className="w-5 h-5" />,
    title: "Battery Monitoring",
    desc: "Live battery status with low-battery push alerts before you run out.",
    color: "#F59E0B",
    screen: 0,
  },
  {
    icon: <Bell className="w-5 h-5" />,
    title: "Smart Notifications",
    desc: "Get notified when your pod is running low or a firmware update is ready.",
    color: "#8B5CF6",
    screen: 1,
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: "Age Verification Lock",
    desc: "Built-in age gate — only verified adults can operate the connected device.",
    color: "#06B6D4",
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
  const [isPaused, setIsPaused] = useState(false);
  const isLight = theme === "light";

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveScreen((prev) => (prev + 1) % SCREENS.length);
    }, 1300);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section className={`py-24 transition-colors duration-500 overflow-hidden relative ${
      isLight ? "bg-zinc-50/70" : "bg-[#080809]"
    }`}>
      {/* Background glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none opacity-[0.05]"
        style={{ background: "linear-gradient(135deg,#3B82F6,#8B5CF6)" }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* ── Section Header ── */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16 space-y-4"
        >
          <div className="flex items-center justify-center gap-2">
            <div className={`w-6 h-6 rounded-xl flex items-center justify-center ${
              isLight ? "bg-zinc-950" : "bg-white"
            }`}>
              <Smartphone className={`w-3.5 h-3.5 ${isLight ? "text-white" : "text-zinc-950"}`} />
            </div>
            <span className={`text-xs font-bold uppercase tracking-widest ${
              isLight ? "text-zinc-500" : "text-zinc-400"
            }`}>
              JUUL App · Android
            </span>
          </div>
          <h2 className={`text-3xl sm:text-5xl font-black tracking-tight ${
            isLight ? "text-zinc-950" : "text-white"
          }`}>
            Control Your JUUL <br />
            <span className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(to right, #3B82F6, #8B5CF6)" }}>
              From Your Phone.
            </span>
          </h2>
          <p className={`text-sm font-light leading-relaxed ${
            isLight ? "text-zinc-500" : "text-zinc-400"
          }`}>
            The official JUUL companion app connects to your device via Bluetooth,
            giving you full control over usage, battery, and security — right from your pocket.
          </p>
        </motion.div>

        {/* ── Main Content: Phone Mockups + Features ── */}
        <div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >

          {/* LEFT: Phone mockup carousel */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-center gap-6"
          >

            {/* Screen tabs */}
            <div className={`flex gap-1.5 p-1 rounded-2xl ${
              isLight ? "bg-zinc-100 border border-zinc-200" : "bg-white/5 border border-white/5"
            }`}>
              {SCREENS.map((scr, i) => (
                <button
                  key={i}
                  onClick={() => setActiveScreen(i)}
                  className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer ${
                    activeScreen === i
                      ? isLight
                        ? "bg-zinc-950 text-white shadow-sm"
                        : "bg-white text-zinc-950 shadow-sm"
                      : isLight
                      ? "text-zinc-400 hover:text-zinc-700"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {scr.label}
                </button>
              ))}
            </div>

            {/* Phone frame */}
            <div className="relative flex justify-center">
              {/* Glow behind phone */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-48 h-48 rounded-full blur-3xl opacity-20"
                  style={{ background: "linear-gradient(135deg,#3B82F6,#8B5CF6)" }}
                />
              </div>

              {/* Phone border frame */}
              <div className={`relative w-[240px] sm:w-[260px] rounded-[42px] p-2.5 shadow-2xl border ${
                isLight
                  ? "bg-zinc-950 border-zinc-800 shadow-zinc-950/20"
                  : "bg-zinc-900 border-white/10 shadow-black/60"
              }`}>
                {/* Notch */}
                <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-16 h-4 bg-zinc-950 rounded-full z-10" />
                {/* Screen area */}
                <div className="w-full rounded-[34px] overflow-hidden aspect-[9/19] relative bg-zinc-950">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeScreen}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="relative w-full h-full"
                    >
                      <Image
                        src={SCREENS[activeScreen].src}
                        alt={SCREENS[activeScreen].label}
                        fill
                        className="object-cover"
                        sizes="280px"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Download buttons */}
            <div className="flex gap-3 flex-wrap justify-center">
              <a
                href="https://play.google.com/store/search?q=juul&c=apps"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl border transition-all hover:scale-[1.03] cursor-pointer ${
                  isLight
                    ? "bg-zinc-950 border-zinc-900 text-white hover:bg-zinc-800"
                    : "bg-white border-zinc-100 text-zinc-950 hover:bg-zinc-100"
                }`}
              >
                {/* Google Play icon */}
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.18 23.76c.32.18.68.24 1.06.14l12.65-7.31-2.75-2.75-10.96 9.92zM.5 1.4C.19 1.76 0 2.28 0 2.96v18.08c0 .68.19 1.2.5 1.56l.08.08 10.13-10.13v-.24L.58 1.32.5 1.4zM20.1 10.23l-2.62-1.51-3.08 3.08 3.08 3.08 2.64-1.53c.75-.43.75-1.13-.02-1.56v-.06zM4.24.1L16.88 7.41l-2.75 2.75L4.16.24c.02 0 .05-.09.08-.14z" />
                </svg>
                <div className="text-left">
                  <p className="text-[8px] uppercase tracking-widest opacity-70 leading-none">Get it on</p>
                  <p className="text-[12px] font-black leading-tight">Google Play</p>
                </div>
              </a>
            </div>
          </motion.div>

          {/* RIGHT: Feature list */}
          <div className="space-y-4">
            {APP_FEATURES.map((feat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ delay: i * 0.07, duration: 0.4, ease: "easeOut" }}
                onClick={() => setActiveScreen(feat.screen)}
                className={`flex items-start gap-4 p-4 rounded-2xl border cursor-pointer transition-all duration-200 group ${
                  activeScreen === feat.screen
                    ? isLight
                      ? "bg-white border-zinc-200 shadow-sm"
                      : "bg-white/[0.04] border-white/10"
                    : isLight
                    ? "border-transparent hover:border-zinc-100 hover:bg-white/60"
                    : "border-transparent hover:border-white/5 hover:bg-white/[0.02]"
                }`}
              >
                {/* Icon */}
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all"
                  style={{ backgroundColor: `${feat.color}18`, color: feat.color }}
                >
                  {feat.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className={`text-sm font-black mb-0.5 ${isLight ? "text-zinc-950" : "text-white"}`}>
                    {feat.title}
                  </h3>
                  <p className={`text-xs font-light leading-relaxed ${isLight ? "text-zinc-500" : "text-zinc-400"}`}>
                    {feat.desc}
                  </p>
                </div>

                <ChevronRight className={`w-4 h-4 flex-shrink-0 mt-1 transition-all ${
                  activeScreen === feat.screen
                    ? "opacity-80 translate-x-0.5"
                    : "opacity-0 group-hover:opacity-40"
                }`}
                  style={{ color: feat.color }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
