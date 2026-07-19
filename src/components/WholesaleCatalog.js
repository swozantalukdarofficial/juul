"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ShoppingCart, User } from "lucide-react";

export default function WholesaleCatalog({ theme }) {
  const isLight = theme === "light";
  const scrollRef = useRef(null);

  const catalogItems = [
    {
      title: "JUUL 2 Device Kit - Slate Grey",
      badge: "SMART GEN 2",
      desc: "Enhanced vapor draw, massive battery, and dynamic smart LED indicators.",
      type: "device-slate",
    },
    {
      title: "JUUL 2 Pods - Polar Mint (Spea...",
      badge: "BEST SELLER",
      desc: "Pack of 2 genuine pods with intense spearmint and arctic cooling frost.",
      type: "pod-green",
    },
    {
      title: "JUUL 2 Pods - Virginia Tobacco ...",
      badge: "CLASSIC CHOICE",
      desc: "Pack of 2 genuine pods with full-bodied toasted tobacco leaves flavor.",
      type: "pod-brown",
    },
    {
      title: "JUUL 1 Device Kit",
      badge: "ORIGINAL CLASSIC",
      desc: "The JUUL 1 Kit, where premium simplicity meets effortless performance.",
      type: "device-silver",
    }
  ];

  const [comingSoonIndex, setComingSoonIndex] = useState(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleLoginClick = (e, idx) => {
    e.preventDefault();
    setComingSoonIndex(idx);
    setTimeout(() => {
      setComingSoonIndex(null);
    }, 2000);
  };

  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    setIsDown(true);
    if (scrollRef.current) {
      scrollRef.current.style.scrollBehavior = "auto";
      setStartX(e.pageX - scrollRef.current.offsetLeft);
      setScrollLeft(scrollRef.current.scrollLeft);
    }
  };

  const handleMouseLeave = () => {
    setIsDown(false);
  };

  const handleMouseUp = () => {
    setIsDown(false);
    if (scrollRef.current) {
      scrollRef.current.style.scrollBehavior = "smooth";
    }
  };

  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    if (scrollRef.current) {
      const x = e.pageX - scrollRef.current.offsetLeft;
      const walk = (x - startX) * 1.5;
      scrollRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const scrollLeftNav = () => {
    if (scrollRef.current) {
      scrollRef.current.style.scrollBehavior = "smooth";
      scrollRef.current.scrollBy({ left: -340, behavior: "smooth" });
    }
  };

  const scrollRightNav = () => {
    if (scrollRef.current) {
      scrollRef.current.style.scrollBehavior = "smooth";
      scrollRef.current.scrollBy({ left: 340, behavior: "smooth" });
    }
  };

  return (
    <section id="catalog" className="py-24 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header with Navigation */}
        <div className="flex items-center justify-between mb-12">
          <div className="text-left">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight font-outfit text-zinc-950 dark:text-white">
              Product Catalog Preview
            </h2>
            {/* Small blue underline below the first word */}
            <div className="w-12 h-[2.5px] bg-blue-600 rounded mt-1.5" />
            <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 mt-4">
              PREMIUM INVENTORY AVAILABLE FOR WHOLESALE BULK ORDERS ACROSS THE UAE.
            </p>
          </div>
          
          {/* Slider controls */}
          <div className="flex gap-2">
            <button
              onClick={scrollLeftNav}
              className={`p-3 rounded-full border transition-all cursor-pointer ${
                isLight
                  ? "border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-800 shadow-sm"
                  : "border-white/10 bg-zinc-900/50 hover:bg-zinc-900 text-white"
              }`}
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={scrollRightNav}
              className={`p-3 rounded-full border transition-all cursor-pointer ${
                isLight
                  ? "border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-800 shadow-sm"
                  : "border-white/10 bg-zinc-900/50 hover:bg-zinc-900 text-white"
              }`}
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontally Scrollable Cards Container */}
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className={`flex gap-6 overflow-x-auto scrollbar-hide pb-8 px-1 select-none ${
            isDown ? "cursor-grabbing" : "cursor-grab"
          }`}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none", touchAction: "pan-y" }}
        >
          {catalogItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className={`snap-start flex-shrink-0 w-[285px] sm:w-[305px] p-5 rounded-[2rem] border transition-all duration-300 flex flex-col justify-between ${
                isLight
                  ? "bg-white border-zinc-205 shadow-sm hover:shadow-md"
                  : "bg-zinc-900/40 border-white/5 hover:border-emerald-500/20 hover:bg-zinc-900/80"
              }`}
            >
              <div>
                {/* Visual Product Box Render */}
                <div className="w-full h-60 rounded-2xl relative flex items-center justify-center mb-4 bg-[#f4f4f5] dark:bg-zinc-950/80">
                  {/* Badge */}
                  <span className="absolute top-4 left-4 text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 bg-white border border-zinc-200 text-zinc-500 rounded-full">
                    {item.badge}
                  </span>

                  {/* Clean rounded capsule drawing to match screenshot same-to-same */}
                  {item.type === "device-slate" && (
                    <div className="w-6 h-28 bg-[#1f1f22] rounded-md shadow-md" />
                  )}

                  {item.type === "pod-green" && (
                    <div className="w-6 h-28 bg-[#10b981] rounded-md shadow-md" />
                  )}

                  {item.type === "pod-brown" && (
                    <div className="w-6 h-28 bg-[#78716c] rounded-md shadow-md" />
                  )}

                  {item.type === "device-silver" && (
                    <div className="w-6 h-28 bg-[#4b5563] rounded-md shadow-md" />
                  )}
                </div>

                {/* Text details */}
                <h3 className="text-base font-black tracking-tight mb-1 font-outfit text-zinc-950 dark:text-white line-clamp-1 text-left">
                  {item.title}
                </h3>
                <p className="text-xs text-zinc-500 leading-relaxed mb-4 line-clamp-2 min-h-[36px] text-left">
                  {item.desc}
                </p>

                {/* Availability Row (Clean, borderless to match screenshot same-to-same) */}
                <div className="flex justify-between items-center text-[10px] font-bold tracking-wider uppercase text-zinc-400 mt-4 mb-4">
                  <span>Availability</span>
                  <span className="text-emerald-500 font-black flex items-center gap-1">
                    ✓ In Stock
                  </span>
                </div>
              </div>

              {/* Two CTA Buttons */}
              <div className="space-y-2.5">
                {/* Button 1: Inquire for Pricing */}
                <a
                  href="#apply"
                  className={`w-full py-3 rounded-xl font-bold text-center text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 ${
                    isLight
                      ? "bg-zinc-950 text-white hover:bg-emerald-500"
                      : "bg-white text-zinc-950 hover:bg-emerald-500 hover:text-white"
                  }`}
                >
                  <ShoppingCart className="w-3.5 h-3.5" /> Inquire for Pricing
                </a>
                
                {/* Button 2: Login for Prices */}
                <button
                  onClick={(e) => handleLoginClick(e, idx)}
                  className="w-full py-3 rounded-xl font-bold text-center text-[10px] uppercase tracking-widest border border-dashed border-blue-500 text-blue-500 bg-white dark:bg-zinc-900 hover:bg-blue-50 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {comingSoonIndex === idx ? (
                    <span className="text-emerald-500 font-extrabold animate-pulse">Coming Soon</span>
                  ) : (
                    <>
                      <User className="w-3.5 h-3.5" /> Login for Prices
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
