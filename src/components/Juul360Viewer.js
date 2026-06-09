"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { RotateCw, Play, Pause, Cpu, Zap, Shield, Sparkles } from "lucide-react";

export default function Juul360Viewer({ theme }) {
  const isLight = theme === "light";
  const [rotation, setRotation] = useState(0);
  const [isAutoSpin, setIsAutoSpin] = useState(true);
  const [activeColor, setActiveColor] = useState("#10B981"); // Default Mint Green
  const [zoom, setZoom] = useState(1.0); // Default is 1.0x
  const dragX = useMotionValue(0);

  // Auto spin loop
  useEffect(() => {
    let frameId;
    if (isAutoSpin) {
      const updateSpin = () => {
        setRotation((prev) => (prev + 1.2) % 360);
        frameId = requestAnimationFrame(updateSpin);
      };
      frameId = requestAnimationFrame(updateSpin);
    }
    return () => cancelAnimationFrame(frameId);
  }, [isAutoSpin]);

  // Handle manual slider rotation
  const handleSliderChange = (e) => {
    setIsAutoSpin(false);
    setRotation(Number(e.target.value));
  };

  // Drag interaction to rotate
  const onDrag = (event, info) => {
    setIsAutoSpin(false);
    // Convert drag delta to degrees of rotation
    const delta = info.delta.x * 0.8;
    setRotation((prev) => {
      const next = (prev - delta) % 360;
      return next < 0 ? 360 + next : next;
    });
  };

  // Active hot-spots depending on current rotation angle
  const getActiveSpec = () => {
    if (rotation >= 315 || rotation < 45) {
      return {
        title: "Intelligent LED Indicator",
        desc: "Precision green/amber LED pulses dynamically to reflect battery life and drawing state in real-time.",
        icon: <Cpu className="w-5 h-5 text-emerald-400" />
      };
    } else if (rotation >= 45 && rotation < 135) {
      return {
        title: "Ultra-Thin Side Profile",
        desc: "Engineered at just 7.2mm thin, the solid-core chassis fits perfectly in hand with lightweight pocketability.",
        icon: <Sparkles className="w-5 h-5 text-amber-400" />
      };
    } else if (rotation >= 135 && rotation < 225) {
      return {
        title: "Magnetic Charging Pins",
        desc: "Four custom gold-plated connector nodes on the base snap magnetically to the USB charger dock.",
        icon: <Zap className="w-5 h-5 text-blue-400" />
      };
    } else {
      return {
        title: "Microprocessor Chamber",
        desc: "Double-walled anodized containment safeguards the heating coil and prevents vapor leaks.",
        icon: <Shield className="w-5 h-5 text-pink-400" />
      };
    }
  };

  const currentSpec = getActiveSpec();
  const scaleX = Math.cos((rotation * Math.PI) / 180);
  const isFacingBack = scaleX < 0;

  return (
    <section className={`py-24 border-b transition-colors duration-500 relative overflow-hidden ${
      isLight ? "bg-white border-zinc-200/80" : "bg-[#09090A] border-white/5"
    }`}>
      {/* Decorative Technical Vector Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full ${isLight ? "bg-zinc-200" : "bg-white/5"}`} />
        <div className={`absolute top-1/2 left-0 -translate-y-1/2 w-full h-[1px] ${isLight ? "bg-zinc-200" : "bg-white/5"}`} />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Column: Interactive 3D Canvas Box */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center relative min-h-[500px]">
          
          {/* Header info */}
          <div className="absolute top-0 text-center space-y-1">
            <span className={`text-[10px] uppercase font-bold tracking-[0.2em] ${isLight ? "text-zinc-400" : "text-zinc-500"}`}>
              Interactive Lab
            </span>
            <p className={`text-xs font-mono font-bold ${isLight ? "text-zinc-950" : "text-zinc-400"}`}>
              ROTATION_Y: {Math.round(rotation)}°
            </p>
          </div>

          {/* Interactive Drag Rotating 3D Perspective Card */}
          <motion.div 
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0}
            onDrag={onDrag}
            className={`w-full max-w-sm h-[420px] sm:h-[460px] border rounded-[36px] flex items-center justify-center relative overflow-hidden cursor-grab active:cursor-grabbing transition-colors ${
              isLight ? "bg-zinc-50 border-zinc-200" : "bg-white/[0.01] border-white/5"
            }`}
            style={{ perspective: 1000 }}
          >
            {/* Holographic dynamic color glow in background */}
            <div 
              className="absolute w-56 h-56 rounded-full blur-3xl opacity-25 transition-all duration-500"
              style={{ backgroundColor: activeColor }}
            />

            {/* Drag helper hint */}
            <span className="absolute bottom-4 text-[9px] uppercase font-bold tracking-widest text-zinc-500 flex items-center gap-1.5 animate-pulse select-none">
              <RotateCw className="w-3 h-3" /> Click & Drag Left-Right to Spin
            </span>

            {/* The 3D Rotating Device Container (True CSS 3D Box Model matching Hero section) */}
            <div
              className="relative w-[44px] h-[340px] flex items-center justify-center pointer-events-none transition-all duration-75"
              style={{ 
                transformStyle: "preserve-3d", 
                perspective: 1200,
                transform: `scale(${zoom})`
              }}
            >
              {/* ----- BOTTOM SHADOW (FLOOR) ----- */}
              <div className="absolute top-[102%] left-1/2 -translate-x-1/2 w-[54px] h-[24px] rounded-[50%]" 
                   style={{ 
                     background: isLight ? "rgba(0,0,0,0.15)" : "rgba(0,0,0,0.7)",
                     boxShadow: isLight ? "0 0 15px 5px rgba(0,0,0,0.1)" : "0 0 20px 10px rgba(0,0,0,0.6)",
                     transform: "translateY(10px) rotateX(90deg)", 
                     filter: "blur(4px)" 
                   }} 
              />

              {/* The Inner Box that rotates via Y-axis */}
              <div
                className="absolute inset-0 w-full h-full"
                style={{ 
                  transformStyle: "preserve-3d",
                  transform: `rotateY(${rotation}deg)`
                }}
              >
                {/* ----- FRONT FACE ----- */}
                <div className="absolute inset-0 flex flex-col items-center shadow-2xl" style={{ transform: "translateZ(8px)", backfaceVisibility: "hidden" }}>
                  <div className="w-full h-[15%] bg-[#1a1a1c] relative rounded-t-[2px] border-b-[1.5px] border-black/60 shadow-[inset_0_2px_4px_rgba(255,255,255,0.05)]">
                    {/* Mouthpiece Curve */}
                    <div className="absolute -top-1 w-[45%] left-1/2 -translate-x-1/2 h-1.5 bg-[#1a1a1c] rounded-t-[4px]" />
                  </div>
                  <div className="w-full flex-1 relative rounded-b-[2px] overflow-hidden shadow-[inset_0_0_12px_rgba(0,0,0,0.3)]" 
                       style={{ background: isLight ? "linear-gradient(160deg, #d4d4d8, #71717a)" : "linear-gradient(160deg, #27272a, #09090b)" }}>
                     {/* Diamond Window */}
                     <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#1a1a1c] rotate-45 border-[1.5px] border-black/40 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]" />
                     {/* LED Indicator */}
                     <motion.div 
                       animate={{ opacity: [0.4, 1, 0.4] }} 
                       transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                       className="absolute top-[35%] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
                       style={{ backgroundColor: activeColor, boxShadow: `0 0 12px ${activeColor}, 0 0 20px ${activeColor}` }}
                     />
                  </div>
                </div>

                {/* ----- BACK FACE ----- */}
                <div className="absolute inset-0 flex flex-col items-center" style={{ transform: "rotateY(180deg) translateZ(8px)", backfaceVisibility: "hidden" }}>
                  <div className="w-full h-[15%] bg-[#111] relative rounded-t-[2px] border-b-[1.5px] border-black/60 shadow-[inset_0_2px_4px_rgba(255,255,255,0.02)]" />
                  <div className="w-full flex-1 relative rounded-b-[2px] shadow-[inset_0_0_12px_rgba(0,0,0,0.3)]" 
                       style={{ background: isLight ? "linear-gradient(160deg, #a1a1aa, #d4d4d8)" : "linear-gradient(160deg, #18181b, #27272a)" }}>
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
                        style={{ background: isLight ? "#71717a" : "#09090b" }} />
                </div>

                {/* ----- RIGHT FACE (SIDE PROFILE) ----- */}
                <div className="absolute h-full w-[16px] left-1/2 -translate-x-1/2 flex flex-col items-center shadow-2xl" 
                     style={{ transform: "rotateY(90deg) translateZ(22px)", filter: "brightness(0.4)" }}>
                   <div className="w-full h-[15%] bg-[#0a0a0a] relative rounded-t-[2px] border-l border-black/30 shadow-[inset_0_2px_4px_rgba(255,255,255,0.02)]">
                     <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-[2.5px] h-[10px] bg-amber-500/60 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]" />
                   </div>
                   <div className="w-full flex-1 rounded-b-[2px] shadow-[inset_0_0_8px_rgba(0,0,0,0.4)]" 
                        style={{ background: isLight ? "#71717a" : "#09090b" }} />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Interactive Dial Track Controls below the card */}
          <div className="w-full max-w-sm mt-6 flex flex-col gap-4">
            {/* Rotation Control Row */}
            <div className="flex items-center justify-between gap-4">
              <button
                onClick={() => setIsAutoSpin(!isAutoSpin)}
                className={`p-3 rounded-full border transition-all cursor-pointer ${
                  isLight 
                    ? "bg-white border-zinc-200 text-zinc-900 hover:bg-zinc-50" 
                    : "bg-white/5 border-white/10 text-white hover:bg-white/10"
                }`}
              >
                {isAutoSpin ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <div className="flex-1 flex items-center gap-2">
                <span className={`text-[9px] font-black uppercase tracking-widest min-w-[32px] text-right ${isLight ? "text-zinc-500" : "text-zinc-400"}`}>
                  Spin:
                </span>
                <input 
                  id="spin-control"
                  name="spin-control"
                  aria-label="Spin Control"
                  type="range"
                  min="0"
                  max="360"
                  value={rotation}
                  onChange={handleSliderChange}
                  className={`w-full h-1 rounded-full cursor-pointer appearance-none ${
                    isLight ? "bg-zinc-200" : "bg-white/10"
                  }`}
                  style={{
                    accentColor: activeColor
                  }}
                />
              </div>
            </div>

            {/* Dynamic Zoom Control Row */}
            <div className="flex items-center justify-between gap-4 pl-12">
              <div className="flex-1 flex items-center gap-2">
                <span className={`text-[9px] font-black uppercase tracking-widest min-w-[32px] text-right ${isLight ? "text-zinc-500" : "text-zinc-400"}`}>
                  Zoom:
                </span>
                <input 
                  id="zoom-control"
                  name="zoom-control"
                  aria-label="Zoom Control"
                  type="range"
                  min="1.0"
                  max="3.0"
                  step="0.1"
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className={`w-full h-1 rounded-full cursor-pointer appearance-none ${
                    isLight ? "bg-zinc-200" : "bg-white/10"
                  }`}
                  style={{
                    accentColor: activeColor
                  }}
                />
                <span className={`text-[10px] font-mono font-bold tracking-wider min-w-[30px] ${isLight ? "text-zinc-900" : "text-white"}`}>
                  {zoom.toFixed(1)}x
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Customizer & Tech Info Panel */}
        <div className="lg:col-span-5 space-y-8 text-left">
          <div className="space-y-3">
            <span className={`text-xs font-bold uppercase tracking-widest ${
              isLight ? "text-zinc-400" : "text-zinc-500"
            }`}>
              Chassis Customizer
            </span>
            <h2 className={`text-3xl sm:text-5xl font-black tracking-tight ${
              isLight ? "text-zinc-950" : "text-white"
            }`}>
              JUUL 3D Interactive Lab
            </h2>
            <p className={`text-sm font-light leading-relaxed ${
              isLight ? "text-zinc-550" : "text-zinc-400"
            }`}>
              Configure, spin, and dissect the architectural chassis of your JUUL. Click and drag the device directly to analyze micro-components in high fidelity.
            </p>
          </div>

          {/* Color Customization Selection */}
          <div className="space-y-3">
            <h3 className={`text-[10px] uppercase font-bold tracking-widest ${isLight ? "text-zinc-500" : "text-zinc-400"}`}>
              Select LED Aroma Signature
            </h3>
            <div className="flex gap-3">
              {[
                { label: "Mint", color: "#10B981" },
                { label: "Mango", color: "#F59E0B" },
                { label: "Tobacco", color: "#78716C" },
                { label: "Menthol", color: "#06B6D4" }
              ].map((colorItem) => (
                <button
                  key={colorItem.label}
                  onClick={() => setActiveColor(colorItem.color)}
                  className="w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all hover:scale-105 cursor-pointer"
                  style={{
                    borderColor: activeColor === colorItem.color ? colorItem.color : "transparent",
                    padding: "2px"
                  }}
                >
                  <span className="w-full h-full rounded-full block" style={{ backgroundColor: colorItem.color }} />
                </button>
              ))}
            </div>
          </div>

          {/* Angle Specific High-Fidelity Specs Panel */}
          <div className={`p-6 border rounded-3xl transition-all duration-300 ${
            isLight ? "bg-zinc-50 border-zinc-200" : "bg-white/[0.01] border-white/5"
          }`}>
            <div className="flex items-center gap-4 mb-4">
              <div className={`p-3 rounded-2xl border ${
                isLight ? "bg-white border-zinc-200" : "bg-white/5 border-white/10"
              }`}>
                {currentSpec.icon}
              </div>
              <h4 className={`text-base font-black ${isLight ? "text-zinc-950" : "text-white"}`}>
                {currentSpec.title}
              </h4>
            </div>
            <p className={`text-xs sm:text-sm font-light leading-relaxed ${
              isLight ? "text-zinc-500" : "text-zinc-400"
            }`}>
              {currentSpec.desc}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
