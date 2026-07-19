"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ShoppingBag, ChevronRight, Menu, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar({ cartCount, setIsCartOpen, theme, setTheme }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 50) {
      setIsHidden(true);
      setIsOpen(false);
    } else {
      setIsHidden(false);
    }
  });

  const navItems = [
    { id: "juul1", label: "Juul 1", href: "/juul1" },
    { id: "juul2", label: "Juul 2", href: "/juul2" },
    { id: "wholesale", label: "Wholesale", href: "/wholesale" },
    { id: "about", label: "About", href: "/about" },
    { id: "contact", label: "Contact", href: "/contact" },
  ];

  const isItemActive = (href) => pathname === href;
  const isLight = theme === "light";

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20, x: "-50%" }}
      animate={{
        opacity: 1,
        y: isHidden ? -150 : 0,
        x: "-50%",
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`fixed top-6 left-1/2 w-[92%] max-w-7xl z-50 rounded-2xl sm:rounded-full backdrop-blur-2xl border transition-colors py-3 px-4 sm:px-6 ${isLight
          ? "bg-white/75 border-zinc-200/80 shadow-[0_15px_40px_rgba(0,0,0,0.06)] text-zinc-950"
          : "bg-[#0A0A0B]/70 border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.8),0_0_20px_rgba(16,185,129,0.03)] text-white"
        }`}
    >
      <div className="flex items-center justify-between h-12 relative w-full min-w-0">

        {/* Left: Brand Logo */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="cursor-pointer flex items-center gap-1 group select-none"
          >
            <span className="text-lg sm:text-xl font-black tracking-wider transition-colors font-outfit">
              <span className={isLight ? "text-zinc-950 group-hover:text-red-500" : "text-white group-hover:text-red-400"}>VAPE</span>
              <span className={isLight ? "text-zinc-950 group-hover:text-red-500" : "text-white group-hover:text-red-400"}>POD</span>
              <span className="relative text-red-500 group-hover:text-red-400">
                S
                <svg
                  className="absolute -top-1.5 -right-3 w-3 h-5 text-red-500 overflow-visible"
                  viewBox="0 0 16 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 23C3 18 2 15 5 11C8 7 11 5 7 1"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    className="animate-pulse"
                  />
                </svg>
              </span>
            </span>
            <span className="w-1.5 h-1.5 rounded-full animate-ping bg-red-500 ml-3.5" />
          </Link>
        </div>

        {/* Center: Nav Items */}
        <div className="hidden md:flex items-center gap-0.5 min-w-0 overflow-hidden">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`relative text-[10px] font-bold tracking-wider uppercase transition-all py-2 px-3 lg:px-5 rounded-full cursor-pointer whitespace-nowrap ${isItemActive(item.href)
                  ? isLight ? "text-white font-semibold" : "text-zinc-950 font-semibold"
                  : isLight ? "text-zinc-650 hover:text-red-500" : "text-zinc-400 hover:text-red-400"
                }`}
            >
              <span className="relative z-10">{item.label}</span>
              {isItemActive(item.href) && (
                <motion.div
                  layoutId="activeNavBackground"
                  className={`absolute inset-0 rounded-full border shadow-sm ${isLight ? "bg-zinc-950 border-zinc-950" : "bg-white border-white"
                    }`}
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Right: Cart + CTA */}
        <div className="flex items-center gap-2 flex-shrink-0">

          {/* Cart Icon */}
          <button
            onClick={() => setIsCartOpen(true)}
            className={`relative p-2.5 rounded-full border transition-all cursor-pointer group ${isLight
                ? "bg-zinc-50 border-zinc-200 text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100"
                : "bg-white/[0.03] border-white/10 text-zinc-300 hover:text-white hover:bg-white/[0.08]"
              }`}
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                key={cartCount}
                className={`absolute -top-1 -right-1 text-[9px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-lg ${isLight
                    ? "bg-zinc-950 text-white shadow-zinc-950/20"
                    : "bg-white text-zinc-950 shadow-white/20"
                  }`}
              >
                {cartCount}
              </motion.span>
            )}
          </button>

          {/* Order Pod CTA */}
          <Link
            href="/juul2"
            className={`hidden lg:flex items-center gap-2 font-bold text-[10px] uppercase tracking-widest px-5 py-2.5 rounded-full cursor-pointer transition-all hover:scale-[1.03] shadow-sm whitespace-nowrap ${isLight
                ? "bg-zinc-950 hover:bg-zinc-900 text-white"
                : "bg-white hover:bg-zinc-100 text-zinc-950"
              }`}
          >
            Order Pod <ChevronRight className="w-3.5 h-3.5 stroke-[3px]" />
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2.5 rounded-full border transition-colors cursor-pointer ${isLight
                ? "bg-zinc-100 border-zinc-200 text-zinc-700 hover:text-zinc-950"
                : "bg-white/[0.02] border-white/5 text-zinc-400 hover:text-white"
              }`}
          >
            {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={`md:hidden mt-4 pt-4 border-t space-y-3 ${isLight ? "border-zinc-200" : "border-white/5"
            }`}
        >
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`block w-full text-left py-2 px-3 rounded-xl text-xs font-bold tracking-widest uppercase transition-all cursor-pointer ${isItemActive(item.href)
                  ? isLight
                    ? "bg-zinc-100 text-zinc-950 font-black border-l-2 border-zinc-950 pl-4"
                    : "bg-white/5 text-white font-bold border-l-2 border-white pl-4"
                  : isLight
                    ? "text-zinc-500 hover:text-red-500 pl-3"
                    : "text-zinc-400 hover:text-red-400 pl-3"
                }`}
            >
              {item.label}
            </Link>
          ))}

          <Link
            href="/juul2"
            onClick={() => setIsOpen(false)}
            className={`w-full text-center font-bold py-3 rounded-full text-[10px] uppercase tracking-widest block cursor-pointer transition-colors shadow-sm ${isLight
                ? "bg-zinc-950 hover:bg-zinc-900 text-white"
                : "bg-white hover:bg-zinc-100 text-zinc-950"
              }`}
          >
            Order Pod
          </Link>
        </motion.div>
      )}
    </motion.nav>
  );
}
