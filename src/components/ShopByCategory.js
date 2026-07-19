"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ShopByCategory({ setCurrentPage, setCategoryFilter, setVersionFilter, theme }) {
  const isLight = theme === "light";

  const categories = [
    {
      id: "juul1",
      title: "Juul 1 Series",
      desc: "Classic compact devices & signature pods",
      itemsCount: "4 Products",
      image: "/cat-devices.png",
      cardBg: "bg-[#1C1C1E] border-zinc-200/50 hover:border-zinc-500/40",
      btnBgClass: "hover:bg-zinc-900",
      btnTextClass: "text-zinc-900 group-hover/btn:text-white",
      iconClass: "bg-zinc-900 group-hover/btn:bg-white text-white group-hover/btn:text-zinc-900",
    },
    {
      id: "juul2",
      title: "Juul 2 Series",
      desc: "Smart next-gen technology & enhanced flavors",
      itemsCount: "8 Products",
      image: "/cat-pods.png",
      cardBg: "bg-[#1C1C1E] border-zinc-200/30 hover:border-emerald-500/40",
      btnBgClass: "hover:bg-emerald-600",
      btnTextClass: "text-emerald-600 group-hover/btn:text-white",
      iconClass: "bg-emerald-600 group-hover/btn:bg-white text-white group-hover/btn:text-emerald-600",
    },
  ];

  const handleCategoryClick = (catId) => {
    if (catId === "juul1" || catId === "juul2") {
      setVersionFilter?.(catId);
      setCategoryFilter?.("all");
    } else {
      setCategoryFilter?.(catId);
    }
    setCurrentPage("collection");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className={`py-24 transition-colors duration-500 ${
      isLight ? "bg-white" : "bg-[#09090A]"
    }`}>
      <div className="max-w-7xl mx-auto px-6 text-left">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="space-y-3 mb-12"
        >
          <span className={`text-xs font-bold uppercase tracking-widest ${
            isLight ? "text-zinc-400" : "text-zinc-500"
          }`}>
            Shop by Category
          </span>
          <h2 className={`text-3xl sm:text-5xl font-black tracking-tight ${
            isLight ? "text-zinc-950" : "text-white"
          }`}>
            Official UAE Collections
          </h2>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((cat, i) => (
            <Link
              key={cat.id}
              href={cat.id === "juul1" ? "/juul1" : "/juul2"}
              className={`group relative h-[480px] rounded-[32px] border cursor-pointer transition-all duration-300 overflow-hidden flex flex-col justify-between p-8 ${cat.cardBg} hover:-translate-y-1.5 block shadow-lg`}
            >
              {/* Top Badge */}
              <div className="absolute top-6 left-6 z-20">
                <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full bg-black/40 border border-white/10 text-white/90 backdrop-blur-sm">
                  {cat.itemsCount}
                </span>
              </div>

              {/* Concentric rings decoration */}
              <div className="absolute -bottom-28 -left-28 w-96 h-96 pointer-events-none opacity-20 z-10">
                <div className="absolute inset-0 rounded-full border border-white/5 flex items-center justify-center">
                  <div className="w-[82%] h-[82%] rounded-full border border-white/10 flex items-center justify-center">
                    <div className="w-[78%] h-[78%] rounded-full border border-white/15 flex items-center justify-center">
                      <div className="w-[74%] h-[74%] rounded-full border border-white/20 flex items-center justify-center">
                        <div className="w-[65%] h-[65%] rounded-full border border-white/25" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Image Area */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="relative w-full h-full transition-transform duration-500 ease-out group-hover:scale-[1.04]">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
              </div>

              {/* Vapor/Smoke Rising Animation */}
              <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden opacity-40 group-hover:opacity-75 transition-opacity duration-700">
                {/* Smoke Wisp 1 */}
                <motion.div
                  className="absolute bottom-[-10%] left-[15%] w-48 h-48 rounded-full bg-white/[0.06] blur-3xl"
                  animate={{
                    y: [0, -360],
                    x: [0, -50, 30, -20],
                    scale: [0.8, 1.8, 2.6],
                    opacity: [0, 0.5, 0.2, 0],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeOut",
                    delay: 0,
                  }}
                />
                {/* Smoke Wisp 2 */}
                <motion.div
                  className="absolute bottom-[-10%] left-[45%] w-56 h-56 rounded-full bg-white/[0.04] blur-[80px]"
                  animate={{
                    y: [0, -400],
                    x: [0, 40, -30, 20],
                    scale: [0.7, 1.6, 2.4],
                    opacity: [0, 0.4, 0.15, 0],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeOut",
                    delay: 2,
                  }}
                />
                {/* Smoke Wisp 3 */}
                <motion.div
                  className="absolute bottom-[-10%] left-[30%] w-40 h-40 rounded-full bg-white/[0.08] blur-2xl"
                  animate={{
                    y: [0, -320],
                    x: [0, -30, 50, -10],
                    scale: [0.9, 2.0, 3.0],
                    opacity: [0, 0.6, 0.25, 0],
                  }}
                  transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeOut",
                    delay: 4.5,
                  }}
                />
              </div>

              {/* Dark Bottom Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10 pointer-events-none" />

              {/* Card Content - Overlaid at the bottom */}
              <div className="relative z-20 mt-auto w-full flex flex-col gap-4">
                <div className="space-y-1">
                  <h3 className="text-2xl font-black text-white">
                    {cat.title}
                  </h3>
                  <p className="text-sm font-light text-zinc-300 leading-relaxed">
                    {cat.desc}
                  </p>
                </div>

                {/* White Pill CTA Button */}
                <div className={`w-full flex items-center justify-between pl-6 pr-2 py-2 rounded-full bg-white transition-all duration-300 group/btn shadow-md border border-zinc-200/30 ${cat.btnBgClass}`}>
                  <span className={`text-[11px] font-black uppercase tracking-widest transition-colors duration-300 ${cat.btnTextClass}`}>
                    Explore Category
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm transition-all duration-300 group-hover/btn:scale-105 ${cat.iconClass}`}>
                    <ChevronRight className="w-4 h-4 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
